# FloatingTab

全画面モード(F11)でタブ切り替えと検索を快適にするChrome拡張機能

## Tech Stack

- **Runtime**: Chrome Extension (Manifest V3)
- **Frontend**: React 19, TypeScript 5
- **Styling**: Tailwind CSS 4
- **Build**: Vite 7 + @crxjs/vite-plugin

## Commands

```bash
pnpm install    # 依存関係インストール
pnpm run dev    # 開発サーバー起動（HMR対応）
pnpm run build  # プロダクションビルド
```

## Project Structure

```
src/
├── manifest.json      # Chrome拡張マニフェスト (Manifest V3)
├── background/        # Service Worker
├── content/           # Content Script (各ページに注入)
├── popup/             # React UI コンポーネント
└── types/             # 共通型定義
public/
└── icons/             # 拡張機能アイコン
dist/                  # ビルド出力 (chrome://extensions で読み込む)
```

## Architecture

- **background.ts**: Service Worker。ショートカットキー検知、タブ操作API
- **content.ts**: ページ内でポップアップUIを表示するDOM操作
- **popup/**: フローティングUIのReactコンポーネント

## Chrome Extension Notes

- Manifest V3ではService Workerは非永続的（必要時のみ起動）
- Content ScriptとBackground間はchrome.runtime.sendMessageで通信
- `<all_urls>`権限で全ページにContent Script注入
