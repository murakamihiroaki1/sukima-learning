# トラブルシューティングガイド

## 🔴 「サーバーとの通信に失敗しました」エラー

新規登録やログイン時にこのエラーが出る場合の対処法です。

---

## ステップ1: サーバーが起動しているか確認

### 1-1. サーバーのコンソールを確認

サーバーを起動したコマンドプロンプトで以下が表示されているか確認：

```
🚀 HTTP Server is running on port 3000
📝 Environment: development
🔗 HTTP URL: http://localhost:3000
🔒 CORS Origin: http://localhost:8000
```

### 1-2. サーバーが起動していない場合

```bash
cd aws\server
npm run dev
```

---

## ステップ2: ブラウザのコンソールエラーを確認

### 2-1. ブラウザの開発者ツールを開く

- **Chrome/Edge**: `F12` または `Ctrl+Shift+I`
- **Firefox**: `F12` または `Ctrl+Shift+K`

### 2-2. Consoleタブを確認

以下のようなエラーが表示されていないか確認：

#### エラー1: CORSエラー

```
Access to fetch at 'http://localhost:3000/api/auth/register' from origin 'http://localhost:8000' 
has been blocked by CORS policy
```

**原因**: サーバーのCORS設定が正しくない

**解決方法**:

1. `aws/server/.env`を開く
2. `CORS_ORIGIN`を確認：
   ```env
   CORS_ORIGIN=http://localhost:8000
   ```
3. フロントエンドのポート番号と一致しているか確認
4. サーバーを再起動

#### エラー2: ネットワークエラー

```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```

**原因**: サーバーが起動していない、またはポート番号が違う

**解決方法**:

1. サーバーが起動しているか確認
2. ポート番号が3000か確認
3. `http://localhost:3000/health` にアクセスして確認

#### エラー3: データベースエラー

```
Could not find the table 'public.users'
```

**原因**: Supabaseのテーブルが作成されていない

**解決方法**:

1. `SUPABASE_SETUP_GUIDE.md`の手順でテーブルを作成
2. サーバーを再起動

---

## ステップ3: APIエンドポイントを直接テスト

### 3-1. ヘルスチェック

ブラウザで以下にアクセス：

```
http://localhost:3000/health
```

**期待される結果**:
```json
{"status":"OK","timestamp":"2026-02-04T15:00:00.000Z","protocol":"http","secure":false}
```

### 3-2. 登録APIをテスト

コマンドプロンプトで：

```bash
cd aws\server
test_api.bat
```

または手動で：

```bash
curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

**期待される結果**:
```json
{"message":"User registered successfully","userId":"..."}
```

---

## ステップ4: フロントエンドのポート番号を確認

### 4-1. フロントエンドサーバーのポート確認

フロントエンドを起動したコマンドプロンプトで確認：

```
Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```

### 4-2. ポート番号が8000でない場合

#### オプション1: サーバーのCORS設定を変更

`aws/server/.env`:
```env
CORS_ORIGIN=http://localhost:実際のポート番号
```

#### オプション2: フロントエンドのポートを8000に変更

```bash
cd aws
python -m http.server 8000
```

---

## ステップ5: 環境変数を確認

### 5-1. .envファイルの存在確認

```bash
cd aws\server
dir .env
```

`.env`ファイルが存在しない場合：

```bash
copy .env.example .env
```

### 5-2. 必須の環境変数を確認

`aws/server/.env`に以下が設定されているか確認：

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SECRET_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here

# CORS
CORS_ORIGIN=http://localhost:8000
```

### 5-3. Supabase認証情報の確認

1. Supabase Dashboard → **Settings** → **API**
2. **Project URL**をコピー → `SUPABASE_URL`に設定
3. **Project API keys**:
   - **anon public** → `SUPABASE_PUBLISHABLE_KEY`
   - **service_role** → `SUPABASE_SECRET_KEY`

---

## ステップ6: ファイアウォール・セキュリティソフトの確認

### 6-1. Windowsファイアウォール

Node.jsがブロックされていないか確認：

1. **Windowsセキュリティ** → **ファイアウォールとネットワーク保護**
2. **ファイアウォールによるアプリケーションの許可**
3. **Node.js**が許可されているか確認

### 6-2. ウイルス対策ソフト

一時的に無効化してテスト（問題が解決したら再度有効化）

---

## ステップ7: ポート競合の確認

### 7-1. ポート3000が使用中か確認

```bash
netstat -ano | findstr :3000
```

### 7-2. 使用中の場合

#### オプション1: プロセスを終了

```bash
taskkill /PID プロセスID /F
```

#### オプション2: 別のポートを使用

`aws/server/.env`:
```env
PORT=3001
```

`aws/signup.html`と`aws/login.html`:
```javascript
const API_URL = 'http://localhost:3001/api/auth';
```

---

## ステップ8: ブラウザキャッシュのクリア

### 8-1. キャッシュとCookieをクリア

- **Chrome**: `Ctrl+Shift+Delete`
- **Firefox**: `Ctrl+Shift+Delete`
- **Edge**: `Ctrl+Shift+Delete`

### 8-2. ハードリロード

- **Windows**: `Ctrl+F5`
- **Mac**: `Cmd+Shift+R`

---

## ステップ9: Node.jsとnpmのバージョン確認

### 9-1. バージョン確認

```bash
node --version
npm --version
```

### 9-2. 推奨バージョン

- **Node.js**: v16.x 以上
- **npm**: v8.x 以上

### 9-3. 古い場合はアップデート

https://nodejs.org/ から最新のLTS版をダウンロード

---

## ステップ10: 依存関係の再インストール

### 10-1. node_modulesを削除

```bash
cd aws\server
rmdir /s /q node_modules
del package-lock.json
```

### 10-2. 再インストール

```bash
npm install
```

### 10-3. サーバー再起動

```bash
npm run dev
```

---

## 📋 チェックリスト

問題が解決しない場合、以下を順番に確認：

- [ ] サーバーが起動している（ポート3000）
- [ ] フロントエンドが起動している（ポート8000）
- [ ] `.env`ファイルが存在し、正しく設定されている
- [ ] Supabaseのテーブルが作成されている
- [ ] CORS設定が正しい（`CORS_ORIGIN=http://localhost:8000`）
- [ ] ブラウザのコンソールにエラーがない
- [ ] `http://localhost:3000/health`にアクセスできる
- [ ] `test_api.bat`が成功する
- [ ] ファイアウォールがNode.jsをブロックしていない
- [ ] ポート3000が他のプロセスに使用されていない

---

## 🆘 それでも解決しない場合

### デバッグ情報の収集

以下の情報を確認：

1. **サーバーのコンソール出力**（全文）
2. **ブラウザのコンソールエラー**（全文）
3. **Networkタブ**（失敗したリクエストの詳細）
4. **環境情報**:
   ```bash
   node --version
   npm --version
   echo %OS%
   ```

### よくある原因

1. **Supabaseのテーブル未作成** → `SUPABASE_SETUP_GUIDE.md`を実行
2. **CORS設定ミス** → `.env`の`CORS_ORIGIN`を確認
3. **ポート番号の不一致** → フロントエンドとバックエンドのポートを確認
4. **環境変数の未設定** → `.env`ファイルを確認
5. **依存関係の問題** → `npm install`を再実行

---

## 📚 関連ドキュメント

- `SUPABASE_SETUP_GUIDE.md` - データベースセットアップ
- `AFTER_SUPABASE_SETUP.md` - 次のステップ
- `test_api.bat` - APIテストスクリプト