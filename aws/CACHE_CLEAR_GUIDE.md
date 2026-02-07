# ブラウザキャッシュクリア手順

修正が反映されない場合は、ブラウザのキャッシュをクリアしてください。

## 🔄 方法1: ハードリロード（推奨）

### Windows
```
Ctrl + F5
```
または
```
Ctrl + Shift + R
```

### Mac
```
Cmd + Shift + R
```

## 🗑️ 方法2: キャッシュとCookieを完全削除

### Chrome / Edge
1. `Ctrl + Shift + Delete`を押す
2. 「キャッシュされた画像とファイル」にチェック
3. 「Cookieと他のサイトデータ」にチェック
4. 「データを削除」をクリック

### Firefox
1. `Ctrl + Shift + Delete`を押す
2. 「キャッシュ」にチェック
3. 「Cookieとサイトデータ」にチェック
4. 「今すぐ消去」をクリック

## 🔍 方法3: 開発者ツールで確認

### 1. 開発者ツールを開く
```
F12 または Ctrl + Shift + I
```

### 2. Networkタブを開く
- 「Disable cache」にチェックを入れる
- ページをリロード

### 3. Consoleタブでエラー確認
- JavaScriptエラーがないか確認
- `updatePremiumFeatureAccess is not defined`などのエラーがある場合は報告

### 4. Sourcesタブでコード確認
1. `clf.html`を開く
2. `selectMode`関数を検索（Ctrl+F）
3. 以下のコードが存在するか確認：
```javascript
// 会員情報を取得してボタンの状態を再設定
const membership = await getMembershipInfo();
const membershipLevel = membership ? membership.level : 'Free';
updatePremiumFeatureAccess(membershipLevel);
```

## ✅ 確認手順

1. **完全にキャッシュをクリア**
   - 上記の方法2を実行

2. **ブラウザを再起動**
   - すべてのタブを閉じる
   - ブラウザを完全に終了
   - 再度起動

3. **ページにアクセス**
   - `http://localhost:8080/clf.html`にアクセス
   - Freeアカウントでログイン

4. **動作確認**
   - ページ読み込み時に「ランダム (10問) 🔒」と「模擬試験 (65問) 🔒」がグレーアウト表示
   - 「番号順」をクリック
   - グレーアウトが維持されることを確認

## 🐛 それでも反映されない場合

### デバッグ手順

1. **開発者ツールのConsoleで実行**
```javascript
// 会員情報を確認
getMembershipInfo().then(m => console.log('Membership:', m));

// ボタンの状態を確認
console.log('Random button:', document.getElementById('random-mode-btn'));
console.log('Mock exam button:', document.getElementById('mock-exam-mode-btn'));

// 手動でボタンの状態を更新
updatePremiumFeatureAccess('Free');
```

2. **結果を確認**
- `Membership: {level: "Free", ...}`が表示されるか
- ボタンのopacityが0.4になるか
- エラーメッセージが表示されないか

## 📝 報告事項

もし上記の手順でも解決しない場合、以下の情報を報告してください：

1. ブラウザの種類とバージョン
2. 開発者ツールのConsoleに表示されるエラーメッセージ
3. `getMembershipInfo()`の実行結果
4. ボタンの`style`属性の値