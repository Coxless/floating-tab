# FloatingTab

全画面モード(F11)でタブ切り替えと検索を快適にするChrome拡張機能

## 開発環境セットアップ

1. 依存関係のインストール
```bash
pnpm install
```

2. 開発モード起動
```bash
pnpm run dev
```

3. Chromeで拡張機能を読み込む
   - `chrome://extensions/` を開く
   - 「デベロッパーモード」を有効化
   - 「パッケージ化されていない拡張機能を読み込む」
   - `dist/` フォルダを選択

## ビルド
```bash
pnpm run build
```
