# AWS 認定試験 予想問題クイズアプリ

AWS Solutions Architect Associate (SAA) と Cloud Practitioner (CLF) 試験対策用の予想問題クイズWebアプリケーションです。

## 📋 概要

このアプリケーションは、AWS認定試験の予想問題を出題し、学習をサポートします。

### 主な機能

- ✅ **2つの試験対応**: SAA（20問）とCLF（20問）を別ページで提供
- 🔀 **ランダム出題**: 毎回異なる順序で問題が出題されます
- 📊 **進捗表示**: 現在の問題番号と正解数をリアルタイム表示
- 💡 **詳細な解説**: 各問題に対する詳しい解説付き
- 🎨 **レスポンシブデザイン**: PC、タブレット、スマートフォンに対応
- 📈 **結果表示**: クイズ終了後に詳細な結果を表示

## 🚀 使い方

### 1. ファイル構成

```
aws-saa-quiz-app/
├── index.html          # トップページ（試験選択）
├── saa.html            # SAAクイズページ
├── clf.html            # CLFクイズページ
├── questions-saa.js    # SAA問題データファイル
├── questions-clf.js    # CLF問題データファイル
└── README.md           # このファイル
```

### 2. 起動方法

#### 方法1: ブラウザで直接開く

1. `index.html` をダブルクリック
2. デフォルトのブラウザで開きます
3. トップページから「SAA」または「CLF」を選択

#### 方法2: ローカルサーバーを使用（推奨）

**Python 3を使用する場合:**
```bash
cd aws-saa-quiz-app
python -m http.server 8000
```

**Node.jsを使用する場合:**
```bash
cd aws-saa-quiz-app
npx http-server -p 8000
```

その後、ブラウザで `http://localhost:8000` にアクセスします。

### 3. クイズの進め方

1. **試験を選択**: トップページで「SAA」または「CLF」のカードをクリック
2. **問題を読む**: 各問題を注意深く読みます
3. **選択肢を選ぶ**: A、B、C、Dの中から正解だと思うものをクリック
4. **解説を確認**: 回答後、すぐに正解と解説が表示されます
5. **次の問題へ**: 「次の問題」ボタンで進みます
6. **結果を確認**: 全問回答後、「結果を見る」ボタンで総合結果を表示
7. **再挑戦または戻る**: 「もう一度挑戦」または「トップページへ」を選択

## 📚 出題範囲

### SAA (Solutions Architect Associate)

以下のAWSサービスとトピックをカバーしています:

- **コンピューティング**: EC2, Lambda, Auto Scaling, ECS/Fargate
- **ストレージ**: S3, EBS, Glacier
- **データベース**: RDS, DynamoDB, DAX
- **ネットワーク**: VPC, ELB, Route 53, CloudFront
- **セキュリティ**: IAM, Security Groups, 暗号化
- **管理ツール**: CloudWatch, CloudFormation

### CLF (Cloud Practitioner)

以下の基礎的なトピックをカバーしています:

- **クラウドの概念**: AWSクラウドの利点、Well-Architected Framework
- **セキュリティとコンプライアンス**: 責任共有モデル、IAM、AWS Shield
- **テクノロジー**: 主要なAWSサービスの概要
- **請求と料金**: 料金モデル、無料利用枠、Cost Explorer
- **サポートプラン**: Basic、Developer、Business、Enterprise

## 🎯 学習のヒント

1. **繰り返し学習**: 何度も挑戦して知識を定着させましょう
2. **解説を熟読**: 正解だけでなく、解説をしっかり読んで理解を深めましょう
3. **弱点を把握**: 間違えた問題は特に復習しましょう
4. **実践的な学習**: AWSコンソールで実際にサービスを触ってみましょう
5. **両方の試験を学習**: CLFで基礎を固めてからSAAに挑戦するのがおすすめ

## 🔧 カスタマイズ

### 問題を追加する

#### SAA問題を追加
`questions-saa.js` ファイルの `awsSAAQuestions` 配列に追加:

```javascript
{
  id: 21,
  question: "問題文をここに記載",
  options: [
    "選択肢A",
    "選択肢B",
    "選択肢C",
    "選択肢D"
  ],
  correctAnswer: 0, // 正解のインデックス (0-3)
  explanation: "解説をここに記載"
}
```

#### CLF問題を追加
`questions-clf.js` ファイルの `awsCLFQuestions` 配列に追加（形式は同じ）

### スタイルを変更する

各HTMLファイル内の `<style>` タグ内でCSSを編集できます。

## 📱 対応ブラウザ

- Google Chrome (推奨)
- Mozilla Firefox
- Microsoft Edge
- Safari

## 🎓 試験について

### AWS Certified Solutions Architect - Associate (SAA)

- **対象者**: AWSでのシステム設計経験が1年以上ある方
- **試験時間**: 130分
- **問題数**: 65問
- **合格ライン**: 720点/1000点
- **試験料**: 15,000円（税別）

### AWS Certified Cloud Practitioner (CLF)

- **対象者**: AWSクラウドの基礎知識を持つ方
- **試験時間**: 90分
- **問題数**: 65問
- **合格ライン**: 700点/1000点
- **試験料**: 11,000円（税別）

## 📝 注意事項

- このアプリケーションは学習支援ツールです
- 実際の試験問題とは異なる場合があります
- 公式のAWS認定試験ガイドも併せて学習してください
- 問題数は実際の試験より少なく設定されています

## 🔗 参考リンク

### 公式リソース
- [AWS認定](https://aws.amazon.com/jp/certification/)
- [AWS Certified Solutions Architect - Associate](https://aws.amazon.com/jp/certification/certified-solutions-architect-associate/)
- [AWS Certified Cloud Practitioner](https://aws.amazon.com/jp/certification/certified-cloud-practitioner/)
- [AWS公式ドキュメント](https://docs.aws.amazon.com/)
- [AWS Well-Architected Framework](https://aws.amazon.com/jp/architecture/well-architected/)

### 学習リソース
- [AWS Skill Builder](https://skillbuilder.aws/)
- [AWS トレーニングと認定](https://aws.amazon.com/jp/training/)

## 📄 ライセンス

このプロジェクトは学習目的で作成されています。

## 🤝 貢献

問題の追加や改善の提案は歓迎します!

---

**Good luck with your AWS certification! 🎓✨**