# MySQL セットアップガイド

このアプリケーションはMySQLデータベースを使用するように変更されました。

## 📋 前提条件

- **MySQL**: 5.7以上（推奨: 8.0以上）
- **Node.js**: 14.0以上

---

## 🚀 MySQLのインストール

### Windowsの場合

1. **MySQL Community Serverをダウンロード**
   - https://dev.mysql.com/downloads/mysql/
   - Windows版をダウンロード

2. **インストール**
   - インストーラーを実行
   - "Developer Default"を選択
   - rootパスワードを設定（例: `zaq12wsx`）
   - ポート: `3306`（デフォルト）

3. **環境変数の設定**
   - システム環境変数のPathに追加:
     ```
     C:\Program Files\MySQL\MySQL Server 8.0\bin
     ```

4. **インストール確認**
   ```bash
   mysql --version
   ```

### macOSの場合

```bash
# Homebrewを使用
brew install mysql

# MySQLサービスを起動
brew services start mysql

# rootパスワードを設定
mysql_secure_installation
```

### Linuxの場合

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server

# MySQLサービスを起動
sudo systemctl start mysql
sudo systemctl enable mysql

# セキュリティ設定
sudo mysql_secure_installation
```

---

## 🔧 データベースのセットアップ

### ステップ1: MySQLに接続

```bash
mysql -u root -p
# パスワードを入力: zaq12wsx
```

### ステップ2: データベースを作成

```sql
CREATE DATABASE aws_quiz_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ユーザーを作成（オプション）
CREATE USER 'aws_quiz_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON aws_quiz_db.* TO 'aws_quiz_user'@'localhost';
FLUSH PRIVILEGES;

-- 確認
SHOW DATABASES;
USE aws_quiz_db;

-- 終了
EXIT;
```

---

## ⚙️ アプリケーションの設定

### ステップ1: 依存パッケージのインストール

```bash
cd aws/server
npm install
```

これにより、`mysql2`パッケージがインストールされます。

### ステップ2: 環境変数の設定

`.env`ファイルを編集:

```env
# Database Configuration (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=aws_quiz_db
DB_USER=root
DB_PASSWORD=zaq12wsx
DB_POOL_MAX=20
DB_POOL_MIN=2
DB_POOL_IDLE=10000

# その他の設定は変更不要
```

### ステップ3: データベースの初期化

```bash
npm run db:init
```

**期待される出力:**
```
🔧 Creating database tables...
✅ Users table created
✅ Password reset tokens table created
✅ Sessions table created
✅ Refresh tokens table created
✅ Indexes created
🎉 Database initialization completed!
```

### ステップ4: サーバーの起動

```bash
npm start
```

**期待される出力:**
```
✅ MySQL connected
🚀 Server is running on http://localhost:3000
```

---

## 🔄 PostgreSQLからの移行

### 変更されたファイル

1. **`database/db.js`**
   - `pg` → `mysql2`に変更
   - PostgreSQLのプレースホルダー($1, $2)をMySQLの?に自動変換

2. **`database/init.js`**
   - `SERIAL` → `INT AUTO_INCREMENT`
   - `TIMESTAMP DEFAULT CURRENT_TIMESTAMP` → MySQL構文
   - トリガー → `ON UPDATE CURRENT_TIMESTAMP`

3. **`package.json`**
   - `pg` → `mysql2`
   - `connect-pg-simple` → `express-mysql-session`

4. **`.env`**
   - `DATABASE_URL` → 個別の接続パラメータ
   - ポート: `5432` → `3306`

### 既存のコードへの影響

- **users.js**: 変更不要（プレースホルダーは自動変換される）
- **その他のクエリ**: PostgreSQL固有の構文を使用していなければ変更不要

---

## 🔧 トラブルシューティング

### エラー: "Access denied for user 'root'@'localhost'"

**原因**: パスワードが間違っている

**解決方法**:
```bash
# MySQLのrootパスワードをリセット
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'zaq12wsx';
FLUSH PRIVILEGES;
EXIT;
```

### エラー: "Can't connect to MySQL server"

**原因**: MySQLサービスが起動していない

**解決方法**:
```bash
# Windows
net start MySQL80

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

### エラー: "Unknown database 'aws_quiz_db'"

**原因**: データベースが作成されていない

**解決方法**:
```bash
mysql -u root -p -e "CREATE DATABASE aws_quiz_db;"
```

### エラー: "ER_NOT_SUPPORTED_AUTH_MODE"

**原因**: MySQL 8.0の認証方式の問題

**解決方法**:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'zaq12wsx';
FLUSH PRIVILEGES;
```

---

## 📊 PostgreSQLとMySQLの主な違い

| 機能 | PostgreSQL | MySQL |
|------|-----------|-------|
| **自動増分** | `SERIAL` | `INT AUTO_INCREMENT` |
| **プレースホルダー** | `$1, $2, ...` | `?, ?, ...` |
| **JSON型** | `JSON`, `JSONB` | `JSON` |
| **配列** | サポート | 非サポート |
| **トリガー** | 関数ベース | 直接定義 |
| **大文字小文字** | 区別する | 区別しない（デフォルト） |

---

## 💰 ホスティングオプション

### 無料・低コスト

1. **PlanetScale** (無料枠あり)
   - https://planetscale.com/
   - 5GB無料

2. **Railway** (MySQL対応)
   - https://railway.app/
   - $5/月〜

3. **AWS RDS MySQL** (無料枠)
   - db.t2.micro: 750時間/月無料（12ヶ月）

### 本番環境

1. **AWS RDS MySQL**
   - マネージドサービス
   - 自動バックアップ
   - $15/月〜

2. **Google Cloud SQL**
   - マネージドサービス
   - $10/月〜

3. **Azure Database for MySQL**
   - マネージドサービス
   - $15/月〜

---

## ✅ 完了チェックリスト

- [ ] MySQLがインストールされている
- [ ] `mysql --version`が動作する
- [ ] データベース`aws_quiz_db`が作成されている
- [ ] `.env`ファイルが正しく設定されている
- [ ] `npm install`が成功している
- [ ] `npm run db:init`が成功している
- [ ] `npm start`でサーバーが起動する
- [ ] ブラウザでアプリが動作する

---

## 📞 サポート

問題が解決しない場合は、以下の情報を含めて報告してください:

1. エラーメッセージの全文
2. 実行したコマンド
3. MySQL バージョン (`mysql --version`)
4. Node.js バージョン (`node --version`)
5. OS情報

---

**作成日**: 2026-01-30  
**対象**: aws-quiz-app  
**データベース**: MySQL 5.7+