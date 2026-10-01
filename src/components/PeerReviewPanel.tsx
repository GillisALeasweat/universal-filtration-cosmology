import React, { useState } from 'react';
import { PerspectiveType } from '../types/cosmology';
import { SAMPLE_QUERIES } from '../data/evaluationData';
import { Send, Sparkles, UserCheck, RefreshCw, MessageSquare, AlertCircle } from 'lucide-react';

export const PeerReviewPanel: React.FC = () => {
  const [perspective, setPerspective] = useState<PerspectiveType>('physicist');
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (textToSubmit?: string) => {
    const query = textToSubmit !== undefined ? textToSubmit : inputText;
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/evaluate-hypothesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hypothesis: query,
          perspective: perspective,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '評価の生成中にエラーが発生しました。');
      }
      setResponse(data.result);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || '通信エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  const handlePresetClick = (q: string) => {
    setInputText(q);
    handleSubmit(q);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-semibold text-slate-100">
              インタラクティブ・ピアレビュー ＆ 仮説ストレステスト
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gemini AIによる多角査読エンジン：特定の専門家ペルソナを選択し、追加疑問や反論、未解明アノマリーの整合性をリアルタイム検証
          </p>
        </div>

        {/* Perspective Switcher */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setPerspective('physicist')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              perspective === 'physicist'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            現代理論物理学者
          </button>
          <button
            onClick={() => setPerspective('philosopher')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              perspective === 'philosopher'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            科学哲学者・形而上学
          </button>
          <button
            onClick={() => setPerspective('scifi')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              perspective === 'scifi'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ハードSF作家
          </button>
        </div>
      </div>

      {/* Preset Topics */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
          主要論点クイック査読クエリ
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {SAMPLE_QUERIES.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetClick(item.query)}
              disabled={loading}
              className="text-left p-2.5 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-xs text-slate-300 transition-all disabled:opacity-50"
            >
              <div className="font-semibold text-cyan-300 truncate">{item.label}</div>
              <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.query}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="space-y-3">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="検証したい仮説、反論、または物理的疑問を入力してください（例：エントロピー散逸、暗黒エネルギー、多世界解釈との境界など）..."
            rows={3}
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            選択ペルソナ：
            {perspective === 'physicist' && ' 弦理論・宇宙論物理学者'}
            {perspective === 'philosopher' && ' 存在論・西田哲学・過程哲学'}
            {perspective === 'scifi' && ' ハードSF・超知性エンジニアリング'}
          </span>

          <button
            onClick={() => handleSubmit()}
            disabled={loading || !inputText.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-cyan-900/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                査読解析中...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                査読リクエスト送信
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 bg-rose-950/30 border border-rose-800/50 rounded-xl text-xs text-rose-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Response Box */}
      {response && (
        <div className="bg-slate-950/80 border border-cyan-800/40 rounded-xl p-5 sm:p-6 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
              <UserCheck className="w-4 h-4" />
              <span>専門家ピアレビュー回答</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">査読モデル: Gemini 2.5 Flash</span>
          </div>

          <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};
