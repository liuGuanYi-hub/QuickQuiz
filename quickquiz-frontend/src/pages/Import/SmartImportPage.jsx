import React, { useState, useRef, useCallback } from 'react';
import {
  UploadCloud, FileText, Camera, BrainCircuit, Download, CheckCircle2,
  Database, Loader2, Sparkles, X, Image, AlertCircle, RefreshCw, ChevronDown
} from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

const BATCH_MAX = 200;
const CHUNK_DELAY_MS = 120;

const QUESTION_TYPES = [
  { value: 'SINGLE_CHOICE', label: '单选题' },
  { value: 'MULTIPLE_CHOICE', label: '多选题' },
  { value: 'TRUE_FALSE', label: '判断题' },
];

const SmartImportPage = () => {
  // ===== 文本解析状态 =====
  const [importText, setImportText] = useState('');
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState({ done: 0, total: 0 });
  const [importMessage, setImportMessage] = useState(null);

  // ===== AI 出题状态 =====
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMaterial, setAiMaterial] = useState('');
  const [aiType, setAiType] = useState('SINGLE_CHOICE');
  const [aiCount, setAiCount] = useState(5);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [aiResults, setAiResults] = useState([]); // { content, options, answer, difficulty }

  // ===== OCR 状态 =====
  const [ocrOpen, setOcrOpen] = useState(false);
  const [ocrImage, setOcrImage] = useState(null);
  const [ocrImagePreview, setOcrImagePreview] = useState(null);
  const [ocrRecognizing, setOcrRecognizing] = useState(false);
  const [ocrError, setOcrError] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [ocrImporting, setOcrImporting] = useState(false);
  const fileInputRef = useRef(null);
  const ocrFileRef = useRef(null);

  // ===== 文本解析 =====
  const handleParse = () => {
    if (!importText.trim()) return;
    const lines = importText.split('\n').filter(line => line.trim() !== '');
    const results = lines.map((line, index) => {
      const parts = line.split('#');
      if (parts.length >= 6) {
        return {
          id: index + 1,
          content: parts[0].trim(),
          options: parts.slice(1, -1).map(opt => opt.trim()),
          answer: parts[parts.length - 1].trim(),
          difficulty: 3,
          status: 'success'
        };
      }
      return {
        id: index + 1, raw: line, status: 'error',
        errorMsg: '格式不匹配，需：题目#选项A#选项B#选项C#选项D#答案'
      };
    });
    setParsedQuestions(results);
    setImportMessage(null);
  };

  const handleExportJSON = () => {
    const validQuestions = parsedQuestions.filter(q => q.status === 'success');
    if (validQuestions.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(validQuestions, null, 2));
    const a = document.createElement('a');
    a.href = dataStr; a.download = "questions_export.json"; document.body.appendChild(a); a.click(); a.remove();
  };

  const toApiPayload = (questions) =>
    questions.map((q) => ({
      content: q.content,
      type: q.type || 'SINGLE_CHOICE',
      options: q.options,
      answer: q.answer,
      difficulty: q.difficulty || 3,
    }));

  const handleImportToServer = async (questionsToImport) => {
    const validQuestions = questionsToImport || parsedQuestions.filter(q => q.status === 'success');
    if (validQuestions.length === 0) {
      setImportMessage({ type: 'error', text: '没有可导入的题目，请先生成有效题目。' });
      return;
    }

    setImporting(true);
    setImportMessage(null);
    const payloads = toApiPayload(validQuestions);
    const total = payloads.length;
    let done = 0;

    try {
      for (let i = 0; i < payloads.length; i += BATCH_MAX) {
        const chunk = payloads.slice(i, i + BATCH_MAX);
        await axiosInstance.post('/questions/batch', { questions: chunk });
        done += chunk.length;
        setImportProgress({ done, total });
        if (i + BATCH_MAX < payloads.length) await new Promise(r => setTimeout(r, CHUNK_DELAY_MS));
      }
      setImportMessage({ type: 'ok', text: `已成功导入 ${total} 道题到服务器题库。` });
    } catch (err) {
      const msg = (err.response?.data?.fields && Object.values(err.response.data.fields).join(' '))
        || err.response?.data?.message || err.message || '导入失败';
      setImportMessage({ type: 'error', text: msg });
    } finally {
      setImporting(false);
      setImportProgress({ done: 0, total: 0 });
    }
  };

  // ===== AI 出题 =====
  const handleAiGenerate = async () => {
    if (!aiMaterial.trim()) { setAiError('请输入学习材料内容'); return; }
    setAiGenerating(true);
    setAiError(null);
    try {
      const { data } = await axiosInstance.post('/ai/generate', {
        material: aiMaterial,
        count: aiCount,
        type: aiType,
      });
      if (data.error) {
        setAiError(data.message || 'AI 生成失败');
      } else {
        setAiResults(data.questions || []);
      }
    } catch (err) {
      setAiError(err.response?.data?.message || err.message || 'AI 生成失败，请检查网络或配置。');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAiImport = () => handleImportToServer(aiResults.map(q => ({ ...q, status: 'success' })));

  const handleAiUseText = (q) => {
    // 把 AI 生成的题目追加到文本解析区
    const newLine = `${q.content}#${q.options.join('#')}#${q.answer}`;
    setImportText(prev => prev + (prev ? '\n' : '') + newLine);
    handleParse();
  };

  // ===== OCR =====
  const handleOcrFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setOcrImage(file);
    const reader = new FileReader();
    reader.onload = (ev) => setOcrImagePreview(ev.target.result);
    reader.readAsDataURL(file);
    setOcrError(null);
    setOcrText('');
  };

  const handleOcrRecognize = async () => {
    if (!ocrImage) { setOcrError('请先选择图片'); return; }
    setOcrRecognizing(true);
    setOcrError(null);
    setOcrText('');
    try {
      const formData = new FormData();
      formData.append('image', ocrImage);
      const { data } = await axiosInstance.post('/ocr/recognize', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (data.error) {
        setOcrError(data.message || '识别失败');
      } else {
        setOcrText(data.text || '(未识别到文字)');
      }
    } catch (err) {
      setOcrError(err.response?.data?.message || err.message || 'OCR 识别失败，请检查网络或配置。');
    } finally {
      setOcrRecognizing(false);
    }
  };

  const handleOcrImportText = () => {
    if (!ocrText.trim()) return;
    setImportText(prev => prev + (prev ? '\n' : '') + ocrText);
    setAiOpen(false);
    setOcrOpen(false);
    handleParse();
  };

  const handleDrop = useCallback((e, target) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    if (target === 'ocr') {
      setOcrImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setOcrImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const allParsed = parsedQuestions.filter(q => q.status === 'success');
  const hasQuestions = allParsed.length > 0 || aiResults.length > 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* ===== 顶部标题 ===== */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
          <UploadCloud className="w-8 h-8 text-indigo-600" />
          智能录入与解析
        </h1>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => handleImportToServer()} disabled={importing || allParsed.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50">
            <Database className="w-4 h-4" />
            {importing ? `导入中 ${importProgress.done}/${importProgress.total}…` : '导入到题库'}
          </button>
          <button type="button" onClick={handleExportJSON} disabled={allParsed.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-gray-700 font-medium disabled:opacity-50">
            <Download className="w-4 h-4" /> 导出 JSON
          </button>
        </div>
      </div>

      {/* 消息提示 */}
      {importMessage && (
        <div className={`rounded-lg px-4 py-3 text-sm ${importMessage.type === 'ok' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {importMessage.text}
        </div>
      )}
      {importing && importProgress.total > 0 && (
        <p className="text-sm text-gray-600">进度：{importProgress.done} / {importProgress.total}</p>
      )}

      {/* ===== 主内容区 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ===== 左侧主面板 ===== */}
        <div className="lg:col-span-2 space-y-4">

          {/* 文本解析卡片 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              文本 / Markdown 批量导入
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              格式：<code className="bg-gray-100 px-1 py-0.5 rounded text-pink-600 text-xs">题目#选项A#选项B#选项C#选项D#答案</code>
            </p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="在此粘贴题目文本，每行一题，支持多选、判断题..."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm font-mono resize-y"
            />
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={handleParse}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors font-medium">
                解析文本
              </button>
              {importText && (
                <button type="button" onClick={() => { setImportText(''); setParsedQuestions([]); }}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  清空
                </button>
              )}
            </div>
          </div>

          {/* AI + OCR 快速入口（在文本区下方） */}
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => { setAiOpen(true); setOcrOpen(false); }}
              className="flex flex-col items-center gap-2 p-5 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all text-indigo-700 group">
              <BrainCircuit className="w-8 h-8 text-indigo-500 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">AI 辅助出题</span>
              <span className="text-xs text-indigo-500/70">输入材料，AI 生成题目</span>
            </button>
            <button onClick={() => { setOcrOpen(true); setAiOpen(false); }}
              className="flex flex-col items-center gap-2 p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all text-emerald-700 group">
              <Camera className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">OCR 拍照识题</span>
              <span className="text-xs text-emerald-500/70">截图 / 拍照，自动提取文字</span>
            </button>
          </div>

          {/* 解析结果 */}
          {(parsedQuestions.length > 0 || aiResults.length > 0) && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">
                  预览 ({allParsed.length}{aiResults.length > 0 ? ` + ${aiResults.length} AI` : ''} 共 {(allParsed.length + aiResults.length)} 道)
                </h3>
                <button onClick={() => { setParsedQuestions([]); setAiResults([]); }}
                  className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                  <X className="w-3 h-3" /> 清空
                </button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {/* AI 生成结果 */}
                {aiResults.map((q, idx) => (
                  <div key={`ai-${idx}`} className="p-4 rounded-lg border border-indigo-200 bg-indigo-50/50">
                    <div className="flex items-start gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                      <span className="font-medium text-gray-800 text-sm">{q.content}</span>
                    </div>
                    <div className="ml-6 grid grid-cols-2 gap-1 text-sm text-gray-600 mb-2">
                      {q.options?.map((opt, i) => (
                        <div key={i} className={opt === q.answer ? "font-bold text-indigo-700" : ""}>
                          {String.fromCharCode(65 + i)}. {opt}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 ml-6">
                      <button onClick={() => handleAiImport()} disabled={importing}
                        className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                        导入此题
                      </button>
                      <button onClick={() => handleAiUseText(q)}
                        className="px-3 py-1 bg-white border border-indigo-200 text-indigo-600 text-xs rounded-lg hover:bg-indigo-50">
                        追加到文本解析
                      </button>
                    </div>
                  </div>
                ))}
                {/* 文本解析结果 */}
                {parsedQuestions.map((q) => (
                  <div key={q.id} className={`p-4 rounded-lg border ${q.status === 'success' ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50'}`}>
                    {q.status === 'success' ? (
                      <div>
                        <div className="font-medium flex items-start gap-2 text-gray-800">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span>{q.content}</span>
                        </div>
                        <div className="mt-2 ml-7 pl-3 border-l-2 border-green-200 grid grid-cols-2 gap-1 text-sm text-gray-600">
                          {q.options.map((opt, i) => (
                            <div key={i} className={opt === q.answer ? "font-bold text-green-700" : ""}>
                              {String.fromCharCode(65 + i)}. {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-red-600 flex flex-col gap-1">
                        <span className="font-medium">解析失败 (行 {q.id}):</span>
                        <code className="text-xs bg-red-100/50 p-1 rounded break-all">{q.raw}</code>
                        <span>{q.errorMsg}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===== 右侧 AI 面板 ===== */}
        {aiOpen && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-indigo-900 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-indigo-600" />
                  AI 辅助出题
                </h2>
                <button onClick={() => setAiOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">题型</label>
                  <div className="flex gap-2">
                    {QUESTION_TYPES.map(t => (
                      <button key={t.value} onClick={() => setAiType(t.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${aiType === t.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">生成数量</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min={1} max={20} value={aiCount}
                      onChange={(e) => setAiCount(Number(e.target.value))}
                      className="flex-1 accent-indigo-600" />
                    <span className="text-sm font-mono text-indigo-600 w-6 text-center">{aiCount}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    学习材料 <span className="text-gray-400 font-normal">(粘贴文本内容)</span>
                  </label>
                  <textarea
                    value={aiMaterial}
                    onChange={(e) => setAiMaterial(e.target.value)}
                    rows={8}
                    placeholder="请粘贴学习资料、教材内容、笔记等..."
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm font-mono resize-y focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {aiError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    {aiError}
                  </div>
                )}

                <button
                  onClick={handleAiGenerate}
                  disabled={aiGenerating || !aiMaterial.trim()}
                  className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {aiGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> 生成中…</> : <><Sparkles className="w-4 h-4" /> 生成 {aiCount} 道 {QUESTION_TYPES.find(t => t.value === aiType)?.label}</>}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  使用硅基流动 Qwen 模型 · 需配置 API Key
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===== 右侧 OCR 面板 ===== */}
        {ocrOpen && !aiOpen && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-emerald-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-emerald-600" />
                  OCR 拍照识题
                </h2>
                <button onClick={() => setOcrOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div
                className="border-2 border-dashed border-emerald-200 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-400 transition-colors"
                onDrop={(e) => handleDrop(e, 'ocr')} onDragOver={(e) => e.preventDefault()}
                onClick={() => ocrFileRef.current?.click()}
              >
                {ocrImagePreview ? (
                  <img src={ocrImagePreview} alt="预览" className="max-h-48 mx-auto rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-emerald-500">
                    <Image className="w-10 h-10" />
                    <p className="text-sm font-medium">点击或拖拽上传图片</p>
                    <p className="text-xs text-gray-400">支持 JPG / PNG / WEBP，最大 5MB</p>
                  </div>
                )}
                <input ref={ocrFileRef} type="file" accept="image/*" className="hidden" onChange={handleOcrFileChange} />
              </div>

              {ocrImagePreview && (
                <button onClick={() => { setOcrImage(null); setOcrImagePreview(null); setOcrText(''); }}
                  className="mt-2 w-full text-xs text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1">
                  <X className="w-3 h-3" /> 移除图片
                </button>
              )}

              {ocrError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  {ocrError}
                </div>
              )}

              <button
                onClick={handleOcrRecognize}
                disabled={!ocrImage || ocrRecognizing}
                className="mt-4 w-full py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {ocrRecognizing ? <><Loader2 className="w-4 h-4 animate-spin" /> 识别中…</> : '识别文字'}
              </button>

              {ocrText && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">识别结果</label>
                    <button onClick={() => { setOcrText(''); }}
                      className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                      <X className="w-3 h-3" /> 清空
                    </button>
                  </div>
                  <textarea
                    value={ocrText}
                    onChange={(e) => setOcrText(e.target.value)}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm font-mono resize-y focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="识别结果可编辑..."
                  />
                  <button
                    onClick={handleOcrImportText}
                    className="mt-2 w-full py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    追加到文本解析区
                  </button>
                </div>
              )}

              <p className="text-xs text-gray-400 text-center mt-3">
                使用百度 OCR · 需配置 API Key
              </p>
            </div>
          </div>
        )}

        {/* ===== 右侧空白占位 ===== */}
        {!aiOpen && !ocrOpen && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-sm border border-indigo-100 p-5">
              <h2 className="text-lg font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-600" />
                AI 辅助出题
              </h2>
              <p className="text-sm text-indigo-700/80 mb-4 leading-relaxed">
                输入教材或学习笔记，AI 自动生成单选/多选/判断题。
              </p>
              <button onClick={() => setAiOpen(true)}
                className="w-full py-2 bg-indigo-600/10 text-indigo-700 font-medium rounded-lg border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" /> 开始 AI 出题
              </button>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-sm border border-emerald-100 p-5">
              <h2 className="text-lg font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                OCR 拍照识题
              </h2>
              <p className="text-sm text-emerald-700/80 mb-4 leading-relaxed">
                截图或拍照上传，自动识别图片中的文字，导入题库。
              </p>
              <button onClick={() => setOcrOpen(true)}
                className="w-full py-2 bg-emerald-600/10 text-emerald-700 font-medium rounded-lg border border-emerald-200 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2">
                <Image className="w-4 h-4" /> 上传图片
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartImportPage;
