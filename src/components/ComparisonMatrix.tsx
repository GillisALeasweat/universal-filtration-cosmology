import React from 'react';
import { ALTERNATIVE_MODELS_DATA } from '../data/evaluationData';
import { DimensionalMitosisSimulator } from './DimensionalMitosisSimulator';
import { Check, X, ArrowRight, GitCompare } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* 1. Dynamic Dimensional Mitosis Simulator */}
      <DimensionalMitosisSimulator />

      {/* 2. Alternative Models Comparative Matrix Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-indigo-400" />
              <h3 className="text-xl font-semibold text-slate-100">
                代替宇宙論モデルとの対照マトリクス
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              計算主義、離散ネットワーク、多世界解釈、および標準宇宙論（ΛCDM）の構造的限界と本モデルの優位性
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-md border border-cyan-800/40 self-start sm:self-auto">
            存在論的閉包の比較
          </span>
        </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs font-mono uppercase text-slate-400">
              <th className="py-3 px-4 min-w-[180px]">モデル名＆提唱者</th>
              <th className="py-3 px-4 min-w-[200px]">コア原則（根本仮定）</th>
              <th className="py-3 px-4 min-w-[220px]">構造的限界・理論的袋小路</th>
              <th className="py-3 px-4 min-w-[260px] bg-slate-950/50">ミルフィーユ代謝モデルによる解決</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {ALTERNATIVE_MODELS_DATA.map((model, idx) => (
              <tr key={idx} className="hover:bg-slate-850/40 transition-colors">
                <td className="py-4 px-4 align-top">
                  <div className="font-semibold text-slate-200">{model.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{model.proponents}</div>
                </td>
                <td className="py-4 px-4 align-top text-slate-300 leading-relaxed">
                  {model.corePrinciple}
                </td>
                <td className="py-4 px-4 align-top leading-relaxed">
                  <div className="flex items-start gap-1.5 text-rose-300/90 bg-rose-950/20 p-2.5 rounded-lg border border-rose-900/30">
                    <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{model.deadEnd}</span>
                  </div>
                </td>
                <td className="py-4 px-4 align-top leading-relaxed bg-slate-950/40">
                  <div className="flex items-start gap-1.5 text-emerald-300/90 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/30">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{model.milleFeuilleAdvantage}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-2">
        <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <span>
          <strong>結論：</strong> 他のモデルがいずれも「外部ハードウェアの要請（計算主義）」「因果律の粗視化破綻（ネットワーク）」「初期宇宙の観測者不在問題（意識説）」という決定的な無限後退やアポリアを抱えるのに対し、本モデルは「最外層の動的フィルター膜による自己限定（Self-Limitation）」と「ブラックホール代謝による局所再循環」によって数学的・存在論的な自己完結性を獲得している。
        </span>
      </div>
    </div>
  </div>
  );
};
