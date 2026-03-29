import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const PAGE_SIZE = 10;

const QUESTION_TYPES = [
    { value: 'SINGLE_CHOICE', label: '单选题' },
    { value: 'MULTIPLE_CHOICE', label: '多选题' },
    { value: 'TRUE_FALSE', label: '判断题' },
];

const emptyForm = () => ({
    content: '',
    type: 'SINGLE_CHOICE',
    optionsText: '',
    answer: '',
    difficulty: 3,
});

const QuestionBank = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosInstance.get('/questions', {
                params: {
                    page,
                    size: PAGE_SIZE,
                    sort: 'id,desc',
                    ...(search.trim() ? { search: search.trim() } : {}),
                },
            });
            setItems(data.content ?? []);
            setTotalPages(data.totalPages ?? 0);
            setTotalElements(data.totalElements ?? 0);
        } catch (e) {
            setError(e.response?.data?.message || e.message || '加载失败');
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(0);
        setSearch(searchInput);
    };

    const parseOptions = (text, type) => {
        const lines = text
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean);
        if (type === 'TRUE_FALSE') return null;
        return lines;
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const { content, type, optionsText, answer, difficulty } = form;
        const options = parseOptions(optionsText, type);
        const body = {
            content,
            type,
            answer,
            difficulty: Number(difficulty),
        };
        if (type !== 'TRUE_FALSE') {
            body.options = options;
        }
        setSaving(true);
        try {
            await axiosInstance.post('/questions', body);
            setModalOpen(false);
            setForm(emptyForm());
            await fetchQuestions();
        } catch (err) {
            const msg =
                err.response?.data?.fields &&
                Object.values(err.response.data.fields).join(' ')
                || err.response?.data?.message
                || '保存失败';
            alert(msg);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('确定删除该题目？')) return;
        try {
            await axiosInstance.delete(`/questions/${id}`);
            await fetchQuestions();
        } catch (err) {
            alert(err.response?.data?.message || '删除失败');
        }
    };

    const typeLabel = (t) => QUESTION_TYPES.find((x) => x.value === t)?.label || t;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">题库管理</h1>

            <div className="flex flex-wrap gap-4 items-end justify-between mb-6">
                <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[240px]">
                    <input
                        type="search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="按题干关键词搜索…"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                    >
                        搜索
                    </button>
                </form>
                <button
                    type="button"
                    onClick={() => {
                        setForm(emptyForm());
                        setModalOpen(true);
                    }}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                >
                    新建题目
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>
            )}

            <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                            <tr>
                                <th className="px-4 py-3 w-16">ID</th>
                                <th className="px-4 py-3">题干</th>
                                <th className="px-4 py-3 w-28">类型</th>
                                <th className="px-4 py-3 w-20">难度</th>
                                <th className="px-4 py-3 w-24">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                                        加载中…
                                    </td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                                        暂无题目
                                    </td>
                                </tr>
                            ) : (
                                items.map((q) => (
                                    <tr key={q.id} className="border-b border-gray-100 hover:bg-gray-50/80">
                                        <td className="px-4 py-3 text-gray-600">{q.id}</td>
                                        <td className="px-4 py-3 text-gray-900 max-w-md truncate" title={q.content}>
                                            {q.content}
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{typeLabel(q.type)}</td>
                                        <td className="px-4 py-3">{q.difficulty ?? '—'}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(q.id)}
                                                className="text-red-600 hover:text-red-800 font-medium"
                                            >
                                                删除
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t text-sm text-gray-600">
                    <span>
                        共 {totalElements} 条，第 {page + 1} / {Math.max(totalPages, 1)} 页
                    </span>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={page <= 0 || loading}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-3 py-1 rounded border border-gray-300 bg-white disabled:opacity-50"
                        >
                            上一页
                        </button>
                        <button
                            type="button"
                            disabled={page >= totalPages - 1 || loading || totalPages === 0}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-3 py-1 rounded border border-gray-300 bg-white disabled:opacity-50"
                        >
                            下一页
                        </button>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
                        <h2 className="text-xl font-semibold mb-4">新建题目</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">类型</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                >
                                    {QUESTION_TYPES.map((t) => (
                                        <option key={t.value} value={t.value}>
                                            {t.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">题干</label>
                                <textarea
                                    required
                                    value={form.content}
                                    onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            </div>
                            {form.type !== 'TRUE_FALSE' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        选项（每行一项）
                                    </label>
                                    <textarea
                                        required={form.type !== 'TRUE_FALSE'}
                                        value={form.optionsText}
                                        onChange={(e) => setForm((f) => ({ ...f, optionsText: e.target.value }))}
                                        rows={4}
                                        placeholder="选项 A&#10;选项 B"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {form.type === 'MULTIPLE_CHOICE' ? '答案（多选以英文逗号分隔）' : '正确答案'}
                                </label>
                                {form.type === 'TRUE_FALSE' ? (
                                    <select
                                        value={form.answer}
                                        onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                        required
                                    >
                                        <option value="">请选择</option>
                                        <option value="True">True</option>
                                        <option value="False">False</option>
                                    </select>
                                ) : (
                                    <input
                                        required
                                        value={form.answer}
                                        onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    />
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">难度 1–5</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={5}
                                    required
                                    value={form.difficulty}
                                    onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {saving ? '保存中…' : '保存'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionBank;
