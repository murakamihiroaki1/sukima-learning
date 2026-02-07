# 問題アクセス制限実装ガイド

## 📋 概要

会員レベルに応じた問題アクセス制限の実装ガイドです。

## 🎯 アクセス制限ルール

### 会員レベル別アクセス権限

| 会員レベル | アクセス可能な問題 | 対象試験 |
|-----------|------------------|---------|
| **Free** | 問題1-20のみ | すべての試験 |
| **Standard** | 全問題 | CLF, AIF, SAA (Foundational/Associate) |
| **Advanced** | 全問題 | すべての試験 (Professional含む) |

### 試験タイプ

- **CLF** (Cloud Practitioner) - Foundational
- **AIF** (AI Practitioner) - Foundational
- **SAA** (Solutions Architect Associate) - Associate
- **Professional認定** - Advanced会員のみ（今後追加予定）

## 🔧 実装ファイル

### バックエンド

1. **`server/middleware/membershipAccess.js`**
   - アクセス制御ロジック
   - 問題フィルタリング
   - アクセス範囲計算

### フロントエンド

2. **`membership-access.js`**
   - クライアント側アクセス制御
   - 会員情報取得
   - UIコンポーネント（バッジ、モーダル）

## 📝 使用方法

### HTMLページへの組み込み

各クイズページ（clf.html, aif.html, saa.html）に以下を追加：

```html
<!-- 会員アクセス制御スクリプト -->
<script src="membership-access.js"></script>

<script>
// 問題データをロード
const allQuestions = awsCLFQuestions; // または awsAIFQuestions, awsSAAQuestions

// 会員レベルに応じてフィルタリング
loadQuestionsWithAccessControl(allQuestions, 'clf', '.container')
    .then(accessibleQuestions => {
        // フィルタリングされた問題を使用
        questions = accessibleQuestions;
        
        // クイズを初期化
        initQuiz();
    });
</script>
```

### 問題ロード時のフィルタリング

```javascript
// 自動的にアクセス可能な問題のみを取得
const accessibleQuestions = await loadQuestionsWithAccessControl(
    allQuestions,  // 全問題
    'clf',         // 試験タイプ
    '.container'   // メッセージ表示先
);
```

### 手動でのアクセスチェック

```javascript
// 会員情報を取得
const membership = await getMembershipInfo();

// 特定の問題へのアクセスをチェック
const hasAccess = checkQuestionAccess(membership, 25, 'clf');

if (!hasAccess) {
    showUpgradeModal(25);
}
```

## 🎨 UIコンポーネント

### 1. 会員バッジ

画面右上に会員レベルを表示：

```javascript
displayMembershipBadge(membership);
```

表示例：
- Free会員: グレーのバッジ
- Standard会員: 青いバッジ + 残り日数
- Advanced会員: 緑のバッジ + 残り日数

### 2. アクセス制限メッセージ

問題リストの上部に表示：

```javascript
showAccessLimitMessage(membership, container);
```

### 3. アップグレードモーダル

ロックされた問題をクリックした時に表示：

```javascript
showUpgradeModal(questionId);
```

## 📊 実装例

### CLF (Cloud Practitioner) ページ

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>CLF - AWS 認定試験 対策</title>
    <script src="questions-clf.js"></script>
    <script src="membership-access.js"></script>
</head>
<body>
    <div class="container">
        <h1>CLF 問題集</h1>
        <div id="quiz-container"></div>
    </div>

    <script>
        let questions = [];
        let currentQuestionIndex = 0;

        // ページロード時に実行
        async function init() {
            // 会員レベルに応じて問題をフィルタリング
            questions = await loadQuestionsWithAccessControl(
                awsCLFQuestions,
                'clf',
                '.container'
            );

            // 問題をシャッフル
            questions = shuffleArray(questions);

            // クイズを開始
            displayQuestion();
        }

        function displayQuestion() {
            if (currentQuestionIndex >= questions.length) {
                showResults();
                return;
            }

            const question = questions[currentQuestionIndex];
            // 問題を表示...
        }

        // ページロード時に初期化
        window.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>
```

### 問題番号にロックアイコンを追加

```javascript
// 問題リストを表示する際
questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.textContent = `問題${question.id}: ${question.question}`;
    
    // アクセス権限をチェックしてロックアイコンを追加
    addLockIconToQuestion(questionElement, question.id, membership, 'clf');
    
    container.appendChild(questionElement);
});
```

## 🔐 セキュリティ

### クライアント側の制限

- JavaScriptでの制限は**表示制御のみ**
- 技術的には回避可能
- ユーザー体験の向上が目的

### サーバー側の制限（推奨）

将来的にAPIを実装する場合：

```javascript
// server/routes/questions.js
router.get('/questions/:examType', authenticateToken, async (req, res) => {
    const { examType } = req.params;
    const user = await getUserById(req.user.id);
    
    // 会員レベルをチェック
    const hasAccess = checkExamAccess(
        user.membership_level,
        user.membership_expiry,
        examType
    );
    
    if (!hasAccess) {
        return res.status(403).json({
            error: 'このコンテンツにアクセスする権限がありません'
        });
    }
    
    // 問題を取得してフィルタリング
    const questions = await getQuestions(examType);
    const accessibleQuestions = filterQuestionsByAccess(
        questions,
        user.membership_level,
        user.membership_expiry,
        examType
    );
    
    res.json({ questions: accessibleQuestions });
});
```

## 🧪 テスト

### 手動テスト手順

1. **Free会員としてテスト**
   ```javascript
   // ブラウザのコンソールで
   localStorage.removeItem('accessToken');
   location.reload();
   ```
   - 問題1-20のみ表示されることを確認
   - 問題21以降にロックアイコンが表示されることを確認

2. **Standard会員としてテスト**
   ```javascript
   // Standardプランに申し込み
   // または、データベースで直接更新
   UPDATE users SET membership_level = 'standard', 
                    membership_expiry = NOW() + INTERVAL '30 days'
   WHERE email = 'test@example.com';
   ```
   - CLF/AIF/SAAの全問題が表示されることを確認

3. **有効期限切れのテスト**
   ```javascript
   // データベースで有効期限を過去に設定
   UPDATE users SET membership_expiry = NOW() - INTERVAL '1 day'
   WHERE email = 'test@example.com';
   ```
   - Free会員と同じ制限が適用されることを確認

## 📱 レスポンシブ対応

会員バッジのスマホ表示：

```css
@media (max-width: 768px) {
    #membership-badge {
        top: 60px;
        right: 10px;
        font-size: 0.8em;
        padding: 6px 12px;
    }
}
```

## 🎯 今後の拡張

- [ ] サーバー側APIでの問題配信
- [ ] 問題ごとの詳細なアクセス制御
- [ ] 学習進捗の保存（会員限定）
- [ ] カスタム学習プラン（Advanced会員限定）
- [ ] オフライン学習機能（Advanced会員限定）

## 📞 トラブルシューティング

### 問題が表示されない

```javascript
// コンソールで確認
const membership = await getMembershipInfo();
console.log('Membership:', membership);

const range = getAccessibleQuestionRange(membership, 'clf');
console.log('Accessible range:', range);
```

### 会員バッジが表示されない

```javascript
// 会員情報の取得を確認
getMembershipInfo().then(m => console.log(m));
```

### アクセストークンが無効

```javascript
// トークンを確認
console.log('Token:', localStorage.getItem('accessToken'));

// 再ログインが必要
window.location.href = 'login.html';
```

## 📄 関連ドキュメント

- [MEMBERSHIP_SYSTEM.md](./MEMBERSHIP_SYSTEM.md) - 会員システム全体
- [STRIPE_WEBHOOK_SETUP.md](./STRIPE_WEBHOOK_SETUP.md) - Stripe連携

---

**作成日**: 2026-01-23  
**対象**: aws-quiz-app アクセス制御  
**バージョン**: 1.0.0