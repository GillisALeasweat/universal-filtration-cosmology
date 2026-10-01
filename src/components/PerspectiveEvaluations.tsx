import React, { useState } from 'react';
import { PERSPECTIVE_CRITIQUES } from '../data/evaluationData';
import { CritiquePerspective } from '../types/cosmology';
import { Award, CheckCircle, AlertTriangle, Lightbulb, Compass, Telescope, BookOpen } from 'lucide-react';

export const PerspectiveEvaluations: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(PERSPECTIVE_CRITIQUES[0].id);
  const activeCritique = PERSPECTIVE_CRITIQUES.find((c) => c.id === selectedId) || PERSPECTIVE_CRITIQUES[0];

  const getPerspectiveIcon = (id: string) => {
    switch (id) {
      case 'physics': return <Telescope className="w-4 h-4" />;
      case 'philosophy': return <BookOpen className="w-4 h-4" />;
      case 'falsifiability': return <Compass className="w-4 h-4" />;
      case 'scifi': return <Lightbulb className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800">
        {PERSPECTIVE_CRITIQUES.map((critique) => {
          const isActive = critique.id === selectedId;
          return (
            <button
              key={critique.id}
              onClick={() => setSelectedId(critique.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-slate-800 text-cyan-300 shadow-md border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {getPerspectiveIcon(critique.id)}
              <span>{critique.title}</span>
              <span className="font-mono text-[11px] opacity-75">[{critique.rating}点]</span>
            </button>
          );
        })}
      </div>

      {/* Selected Perspective Details Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
              {activeCritique.badge}
            </div>
            <h3 className="text-2xl font-bold text-slate-100">{activeCritique.title}</h3>
            <p className="text-sm font-medium text-amber-300/90 mt-2 bg-amber-950/20 px-3.5 py-2 rounded-lg border border-amber-800/30">
              評決（Verdict）: {activeCritique.verdict}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 self-start md:self-auto min-w-[160px] justify-center">
            <div className="text-center">
              <div className="text-3xl font-extrabold font-mono text-cyan-400">
                {activeCritique.rating}
                <span className="text-sm text-slate-500 font-normal">/100</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">総合適正スコア</div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            総論（Executive Review）
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
            {activeCritique.summary}
          </p>
        </div>

        {/* Strengths & Vulnerabilities 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-emerald-950/15 border border-emerald-900/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
              <CheckCircle className="w-4 h-4" />
              理論的強み・卓越した洞察
            </div>
            <ul className="space-y-2.5">
              {activeCritique.strengths.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-500 mt-0.5 font-mono text-sm leading-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vulnerabilities */}
          <div className="bg-rose-950/15 border border-rose-900/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold">
              <AlertTriangle className="w-4 h-4" />
              直面する理論的アキレス腱・脆弱性
            </div>
            <ul className="space-y-2.5">
              {activeCritique.vulnerabilities.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                  <span className="text-rose-500 mt-0.5 font-mono text-sm leading-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Falsifiable Predictions & Formalization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Falsifiable Predictions */}
          <div className="bg-cyan-950/15 border border-cyan-900/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 text-sm font-semibold">
              <Compass className="w-4 h-4" />
              観測可能・反証可能なテスト予測シナリオ
            </div>
            <ul className="space-y-2">
              {activeCritique.falsifiablePredictions.map((pred, idx) => (
                <li key={idx} className="text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
                  <span className="text-cyan-400 font-mono font-bold mr-1">[{idx + 1}]</span>
                  {pred}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations for Formalization */}
          <div className="bg-indigo-950/15 border border-indigo-900/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 text-sm font-semibold">
              <Lightbulb className="w-4 h-4" />
              数理的厳密化・理論深化への提言
            </div>
            <ul className="space-y-2">
              {activeCritique.recommendations.map((rec, idx) => (
                <li key={idx} className="text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
                  <span className="text-indigo-400 font-mono font-bold mr-1">[{idx + 1}]</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
