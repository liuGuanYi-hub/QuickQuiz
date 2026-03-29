import React, { useState } from 'react';
import { UploadCloud, FileText, Camera, BrainCircuit, Download, CheckCircle2, Database } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

const BATCH_MAX = 200;
const CHUNK_DELAY_MS = 120;

const SmartImportPage = () => {
  const [importText, setImportText] = useState('');
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState({ done: 0, total: 0 });
  const [importMessage, setImportMessage] = useState(null);

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
          status: 'success'
        };
      }
      return {
        id: index + 1,
        raw: line,
        status: 'error',
        errorMsg: '格式不匹配，需：题目#选项A#选项B#选项C#选项D#答案'
      };
    });
    setParsedQuestions(results);
    setImportMessage(null);
  };

  const handleExportJSON = () => {
    const validQuestions = parsedQuestions.filter(q => q.status === 'success');
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(validQuestions, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "questions_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const toApiPayload = (validQuestions) =>
    validQuestions.map((q) => ({
      content: q.content,
      type: 'SINGLE_CHOICE',
      options: q.options,
      answer: q.answer,
      difficulty: 3,
    }));

  const handleImportToServer = async () => {
    const validQuestions = parsedQuestions.filter(q => q.status === 'success');
    if (validQuestions.length === 0) {
      setImportMessage({ type: 'error', text: '没有可导入的题目，请先解析成功至少一行。' });
      return;
    }

    setImporting(true);
    setImportMessage(null);
    const payloads = toApiPayload(validQuestions);
    const total = payloads.length;
    let done = 0;
    setImportProgress({ done: 0, total });

    try {
      for (let i = 0; i < payloads.length; i += BATCH_MAX) {
        const chunk = payloads.slice(i, i + BATCH_MAX);
        await axiosInstance.post('/questions/batch', { questions: chunk });
        done += chunk.length;
        setImportProgress({ done, total });
        if (i + BATCH_MAX < payloads.length) {
          await new Promise((r) => setTimeout(r, CHUNK_DELAY_MS));
        }
      }
      setImportMessage({
        type: 'ok',
        text: `已成功导入 ${total} 道题到服务器题库。`,
      });
    } catch (err) {
      const msg =
        err.response?.data?.fields &&
        Object.values(err.response.data.fields).join(' ')
        || err.response?.data?.message
        || err.message
        || '导入失败';
      setImportMessage({ type: 'error', text: msg });
    } finally {
      setImporting(false);
      setImportProgress({ done: 0, total: 0 });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
          <UploadCloud className="w-8 h-8 text-indigo-600" />
          智能录入与解析
        </h1>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleImportToServer}
            disabled={importing}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
          >
            <Database className="w-4 h-4" />
            {importing ? '导入中…' : '导入到题库'}
          </button>
          <button
            type="button"
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-gray-700 font-medium"
          >
            <Download className="w-4 h-4" />
            导出 JSON
          </button>
        </div>
      </div>

      {importMessage && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            importMessage.type === 'ok'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {importMessage.text}
        </div>
      )}

      {importing && importProgress.total > 0 && (
        <p className="text-sm text-gray-600">
          进度：{importProgress.done} / {importProgress.total}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              文本/Markdown 批量导入
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              支持特定格式的快速解析。格式示例：<code className="bg-gray-100 px-1 py-0.5 rounded text-pink-600">地球是什么形状的？#方形#平的#球体#三角形#球体</code>
            </p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="在此粘贴题目文本，每行一题..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm font-mono resize-y"
            />
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleParse}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors font-medium"
              >
                立即解析
              </button>
            </div>
          </div>

          {parsedQuestions.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-medium text-gray-800 mb-3">解析概览 ({parsedQuestions.filter(q => q.status === 'success').length}/{parsedQuestions.length} 成功)</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {parsedQuestions.map((q) => (
                  <div key={q.id} className={`p-4 rounded-lg border ${q.status === 'success' ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50'}`}>
                    {q.status === 'success' ? (
                      <div>
                        <div className="font-medium flex items-start gap-2 text-gray-800">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span>{q.content}</span>
                        </div>
                        <div className="mt-2 ml-7 pl-3 border-l-2 border-green-200 grid grid-cols-2 gap-2 text-sm text-gray-600">
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

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-sm border border-indigo-100 p-5 transition-transform hover:-translate-y-1 duration-300">
            <h2 className="text-lg font-semibold text-indigo-900 mb-2 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-indigo-600" />
              AI 辅助出题
            </h2>
            <p className="text-sm text-indigo-700/80 mb-4 leading-relaxed">
              给定一段学习资料（PDF 或长文本），利用大语言模型自动生成单选、多选或判断题。
            </p>
            <button type="button" className="w-full py-2 bg-indigo-600/10 text-indigo-700 font-medium rounded-lg border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all">
              上传资料 / 粘贴文本
            </button>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-sm border border-emerald-100 p-5 transition-transform hover:-translate-y-1 duration-300">
            <h2 className="text-lg font-semibold text-emerald-900 mb-2 flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-600" />
              OCR 拍照识题
            </h2>
            <p className="text-sm text-emerald-700/80 mb-4 leading-relaxed">
              集成通用文字识别 API，截屏或拍照上传图片，自动提取题目内容和选项。
            </p>
            <button type="button" className="w-full py-2 bg-emerald-600/10 text-emerald-700 font-medium rounded-lg border border-emerald-200 hover:bg-emerald-600 hover:text-white transition-all">
              提取图片文本
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartImportPage;
