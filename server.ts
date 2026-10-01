import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API endpoint for dynamic peer reviews and stress-testing
app.post('/api/evaluate-hypothesis', async (req, res) => {
  try {
    const { hypothesis, perspective } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    let systemPrompt = '';
    if (perspective === 'physicist') {
      systemPrompt = `あなたは厳格な現代理論物理学者（素粒子物理学・一般相対性理論・現代宇宙論の専門家）です。
ユーザーから提示された「ミルフィーユ代謝モデル / 高次元不完全物質としてのダークマター / ブラックホール次元反転バルブ」に関する仮説や疑問について、現代物理学（一般相対性理論、量子場理論、ホログラフィック原理、熱力学第二法則、ハッブルテンション、ΛCDMモデル、宇宙マイクロ波背景放射CMB）の観点から、数理的・実証的・理論的整合性を詳細に査読・論評してください。
強み、未解決の矛盾（エントロピー散逸、因果律、エルゴード性、高次元場のゲージ不変性など）、および実験的・観測的検証シナリオを具体的に示してください。口調は知性的かつ建設的で明晰な日本語で回答してください。`;
    } else if (perspective === 'philosopher') {
      systemPrompt = `あなたは科学哲学および存在論・形而上学の碩学です。
「絶対的無（有たる無）」「揺動型翻訳フィルター膜」「集合知性によるエネルギー精製」「無限後退の解消」という存在論的構造について、仏教哲学（空論・縁起）、西田幾多郎の「絶対無の場所的論理」、ハイデガーの存在論、ホワイトヘッドの過程哲学、および現代の様相実在論（デイヴィッド・ルイス）等の視点から深く分析してください。
このフレームワークが回避しようとしている「無限後退パラドックス（誰が計算機を作ったのか問題）」の成否と、形而上学的美学を批評してください。知性的で深遠な日本語で回答してください。`;
    } else {
      systemPrompt = `あなたはハードSF作家兼ハイパーワールドビルダー（グレッグ・イーガンや特異点SFのスタイル）です。
この「ミルフィーユ代謝宇宙」において、高次元の集合知性やブラックホールの次元反転ジェット、ダークマターの歴史的枯渇、特異点近傍での次元跳躍を可能とするテクノロジーや知的生命体の生存戦略、文明の興亡シナリオをハードSF的な設定考証を交えて創造的かつ論理的に描写してください。説得力と圧倒的なセンス・オブ・ワンダーに満ちた日本語で回答してください。`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${systemPrompt}\n\n【検討対象のテーマ・仮説・質問】:\n${hypothesis || 'この「究極のメタ・宇宙論的フレームワーク（ミルフィーユ代謝モデル）」全体の妥当性と最大の科学的・哲学的論点を評価してください。'}`
            }
          ]
        }
      ],
      config: {
        temperature: 0.7,
      }
    });

    const reply = response.text || '解析を完了できませんでした。';
    return res.json({ result: reply });
  } catch (error: any) {
    console.error('Error generating evaluation:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error while evaluating.',
    });
  }
});

// Vite middleware for development, static serve for production
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
