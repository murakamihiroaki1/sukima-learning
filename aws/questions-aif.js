// AWS AI Practitioner 予想問題データ
const awsAIFQuestions = [
  {
    id: 1,
    question: "ある企業は、カスタマーサポートチャットボットを構築したいと考えています。自然言語を理解し、適切な応答を生成する必要があります。どのAWSサービスを使用すべきですか。",
    options: [
      "Amazon Lex",
      "Amazon Polly",
      "Amazon Transcribe",
      "Amazon Translate"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "Amazon Lexは、音声とテキストを使用した会話型インターフェースを構築するためのサービスです。自然言語理解(NLU)と自動音声認識(ASR)の機能を提供し、チャットボットの構築に最適です。Amazon Alexaと同じ技術を使用しています。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/lex/latest/dg/what-is.html", title: "Amazon Lex とは" }
    ],
    optionExplanations: [
      "✓ 正解: Amazon Lexは会話型インターフェース構築に特化したサービスで、自然言語理解と対話管理機能を提供します。",
      "Amazon Pollyはテキストを音声に変換するサービスで、チャットボットの応答生成には適していません。",
      "Amazon Transcribeは音声をテキストに変換するサービスで、チャットボットの理解機能の一部として使用できますが、単独では不十分です。",
      "Amazon Translateは言語翻訳サービスで、多言語対応には有用ですが、チャットボットの主要機能ではありません。"
    ]
  },
  {
    id: 2,
    question: "機械学習モデルの学習データに個人情報が含まれている場合、責任あるAIの観点から最も重要な対策はどれですか。",
    options: [
      "データの匿名化と暗号化を実施する",
      "モデルの精度を最大化する",
      "学習速度を向上させる",
      "モデルのサイズを削減する"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "責任あるAIの実践において、個人情報の保護は最優先事項です。データの匿名化により個人を特定できないようにし、暗号化により不正アクセスから保護することが重要です。これにより、プライバシーを保護しながらモデルの学習が可能になります。",
    category: "責任あるAI",
    difficulty: "中級",
    references: [
      { url: "https://aws.amazon.com/jp/machine-learning/responsible-ai/", title: "責任ある AI" }
    ],
    optionExplanations: [
      "✓ 正解: データの匿名化と暗号化は、個人情報保護の基本的な対策です。GDPRなどの規制にも準拠するために必須です。",
      "モデルの精度向上は重要ですが、個人情報保護よりも優先度は低くなります。",
      "学習速度の向上は技術的な最適化であり、責任あるAIの観点からは二次的な要素です。",
      "モデルサイズの削減は効率化には有用ですが、個人情報保護とは直接関係ありません。"
    ]
  },
  {
    id: 3,
    question: "Amazon SageMakerで機械学習モデルを学習させる際、どのコンポーネントが学習ジョブを実行しますか。",
    options: [
      "Training Job",
      "Endpoint",
      "Notebook Instance",
      "Model Registry"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "Amazon SageMakerのTraining Jobは、指定されたアルゴリズムとデータを使用してモデルを学習させるコンポーネントです。学習が完了すると、モデルアーティファクトがS3に保存されます。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/how-it-works-training.html", title: "Amazon SageMaker でのモデルのトレーニング" }
    ],
    optionExplanations: [
      "✓ 正解: Training Jobは、SageMakerでモデル学習を実行する専用のコンポーネントです。",
      "Endpointは学習済みモデルをデプロイして推論を実行するためのコンポーネントです。",
      "Notebook Instanceは開発環境であり、学習ジョブの実行環境ではありません。",
      "Model Registryはモデルのバージョン管理を行うコンポーネントで、学習自体は行いません。"
    ]
  },
  {
    id: 4,
    question: "生成AIモデルを使用する際、モデルが不適切または有害なコンテンツを生成するリスクを軽減するために、どの対策が最も効果的ですか。",
    options: [
      "コンテンツフィルタリングとガードレールの実装",
      "モデルのパラメータ数を増やす",
      "学習データのサイズを拡大する",
      "推論速度を向上させる"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "生成AIの責任ある使用において、コンテンツフィルタリングとガードレールの実装は不可欠です。Amazon Bedrockなどのサービスでは、有害なコンテンツの検出とブロック機能が提供されており、安全なAIアプリケーションの構築を支援します。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/guardrails.html", title: "Amazon Bedrock のガードレール" }
    ],
    optionExplanations: [
      "✓ 正解: コンテンツフィルタリングとガードレールにより、不適切な出力を防ぎ、安全なAI利用を実現できます。",
      "パラメータ数の増加は性能向上には寄与しますが、有害コンテンツの生成リスクを直接軽減するものではありません。",
      "学習データの拡大は有用ですが、適切なフィルタリングがなければ有害コンテンツのリスクは残ります。",
      "推論速度の向上は効率化には有用ですが、コンテンツの安全性とは無関係です。"
    ]
  },
  {
    id: 5,
    question: "教師あり学習と教師なし学習の主な違いは何ですか。",
    options: [
      "教師あり学習はラベル付きデータを使用し、教師なし学習はラベルなしデータを使用する",
      "教師あり学習は高速で、教師なし学習は低速である",
      "教師あり学習はクラウドで実行し、教師なし学習はオンプレミスで実行する",
      "教師あり学習は安価で、教師なし学習は高価である"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "教師あり学習は、入力データとそれに対応する正解ラベル（教師データ）を使用してモデルを学習させます。一方、教師なし学習は正解ラベルのないデータからパターンや構造を発見します。分類や回帰は教師あり学習、クラスタリングや次元削減は教師なし学習の代表例です。",
    category: "AI/ML基礎",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/machine-learning/latest/dg/types-of-ml-models.html", title: "機械学習モデルのタイプ" }
    ],
    optionExplanations: [
      "✓ 正解: ラベルの有無が教師あり学習と教師なし学習の本質的な違いです。",
      "速度は学習方法ではなく、データサイズやアルゴリズムに依存します。",
      "実行環境は学習方法の種類とは無関係です。",
      "コストは学習方法ではなく、使用するリソースに依存します。"
    ]
  },
  {
    id: 6,
    question: "Amazon Rekognitionを使用して画像内の顔を検出し、感情分析を行いたい場合、どの機能を使用すべきですか。",
    options: [
      "DetectFaces API",
      "DetectText API",
      "DetectLabels API",
      "SearchFaces API"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "Amazon RekognitionのDetectFaces APIは、画像内の顔を検出し、年齢範囲、性別、感情（喜び、悲しみ、怒りなど）、顔の向き、眼鏡の有無などの属性を分析します。感情分析を含む包括的な顔分析に最適です。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/rekognition/latest/dg/faces.html", title: "Amazon Rekognition での顔の検出と分析" }
    ],
    optionExplanations: [
      "✓ 正解: DetectFaces APIは顔検出と感情分析を含む包括的な顔属性分析を提供します。",
      "DetectText APIは画像内のテキストを検出するためのもので、顔分析には使用できません。",
      "DetectLabels APIは画像内のオブジェクト、シーン、アクティビティを検出しますが、詳細な顔分析は行いません。",
      "SearchFaces APIは顔コレクション内で類似した顔を検索するためのもので、感情分析は行いません。"
    ]
  },
  {
    id: 7,
    question: "大規模言語モデル(LLM)を使用する際、プロンプトエンジニアリングで最も重要な原則は何ですか。",
    options: [
      "明確で具体的な指示を提供する",
      "プロンプトを可能な限り短くする",
      "専門用語を避ける",
      "常に同じフォーマットを使用する"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "プロンプトエンジニアリングにおいて、明確で具体的な指示を提供することが最も重要です。タスクの目的、期待される出力形式、制約条件などを明確に指定することで、LLMはより正確で有用な応答を生成できます。曖昧な指示は予期しない結果につながる可能性があります。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/prompt-engineering-guidelines.html", title: "プロンプトエンジニアリングのガイドライン" }
    ],
    optionExplanations: [
      "✓ 正解: 明確で具体的な指示により、LLMは意図を正確に理解し、期待される出力を生成できます。",
      "プロンプトの長さよりも明確さが重要です。必要な情報は省略すべきではありません。",
      "専門用語は文脈に応じて適切に使用すべきで、一律に避ける必要はありません。",
      "タスクに応じて最適なフォーマットは異なるため、柔軟性が重要です。"
    ]
  },
  {
    id: 8,
    question: "機械学習モデルの公平性を評価する際、どの指標が最も重要ですか。",
    options: [
      "異なるグループ間でのモデル性能の一貫性",
      "モデルの全体的な精度",
      "学習時間の短さ",
      "モデルのサイズ"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "責任あるAIの実践において、モデルの公平性は重要な要素です。異なる人口統計グループ（年齢、性別、人種など）間でモデルの性能が一貫しているかを評価することで、バイアスや差別的な結果を防ぐことができます。Amazon SageMaker Clarifyなどのツールがこの評価を支援します。",
    category: "責任あるAI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/clarify-fairness-and-explainability.html", title: "Amazon SageMaker Clarify による公平性と説明可能性" }
    ],
    optionExplanations: [
      "✓ 正解: グループ間での性能の一貫性は、モデルの公平性を評価する上で最も重要な指標です。",
      "全体的な精度が高くても、特定のグループで性能が低い場合、公平性の問題があります。",
      "学習時間は効率性の指標であり、公平性とは直接関係ありません。",
      "モデルサイズは実装の考慮事項であり、公平性の評価には関係ありません。"
    ]
  },
  {
    id: 9,
    question: "Amazon Bedrockで基盤モデル(Foundation Model)を使用する主な利点は何ですか。",
    options: [
      "事前学習済みモデルを簡単にカスタマイズして使用できる",
      "モデルを完全にゼロから学習させる必要がある",
      "オンプレミスでのみ実行できる",
      "プログラミング知識が不要である"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "Amazon Bedrockは、Anthropic、AI21 Labs、Stability AIなどの主要なAI企業が提供する事前学習済みの基盤モデルへのアクセスを提供します。これらのモデルは、ファインチューニングやプロンプトエンジニアリングを通じて、特定のユースケースに合わせてカスタマイズできます。ゼロから学習させる必要がないため、開発時間とコストを大幅に削減できます。",
    category: "生成AI",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/what-is-bedrock.html", title: "Amazon Bedrock とは" }
    ],
    optionExplanations: [
      "✓ 正解: Bedrockの主な利点は、高品質な事前学習済みモデルを簡単にカスタマイズして使用できることです。",
      "Bedrockの目的は、ゼロからの学習を避け、既存のモデルを活用することです。",
      "BedrockはAWSのマネージドサービスであり、クラウドで実行されます。",
      "APIの使用には基本的なプログラミング知識が必要です。"
    ]
  },
  {
    id: 10,
    question: "機械学習モデルの過学習(Overfitting)を防ぐための最も効果的な手法は何ですか。",
    options: [
      "正則化とクロスバリデーションの使用",
      "学習データを増やすだけ",
      "モデルの複雑さを最大化する",
      "学習率を上げる"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "過学習は、モデルが学習データに過度に適合し、新しいデータに対する汎化性能が低下する現象です。正則化（L1/L2正則化、ドロップアウトなど）はモデルの複雑さを制御し、クロスバリデーションは異なるデータセットでモデルの性能を評価することで、過学習を効果的に防ぎます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/machine-learning/latest/dg/model-fit-underfitting-vs-overfitting.html", title: "モデルの適合: 過小適合と過学習" }
    ],
    optionExplanations: [
      "✓ 正解: 正則化とクロスバリデーションは、過学習を防ぐための標準的で効果的な手法です。",
      "データを増やすことは有用ですが、正則化などの技術と組み合わせる必要があります。",
      "モデルの複雑さを最大化すると、過学習のリスクが高まります。",
      "学習率の調整は収束速度に影響しますが、過学習の直接的な対策ではありません。"
    ]
  },
  {
    id: 11,
    question: "Amazon Rekognitionで実行できないタスクはどれですか。",
    options: [
      "画像内の物体検出",
      "顔認識と感情分析",
      "テキストから音声への変換",
      "不適切なコンテンツの検出"
    ],
    correctAnswer: 2,
    category: "分析",
    explanation: "Amazon Rekognitionは画像・動画分析サービスで、物体検出、顔認識、感情分析、不適切なコンテンツ検出などを実行できます。テキストから音声への変換はAmazon Pollyの機能です。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/rekognition/latest/dg/what-is.html", title: "Amazon Rekognition とは" }
    ],
    optionExplanations: [
      "画像内の物体検出: Rekognitionの主要機能の1つです。数千種類の物体やシーンを検出できます。",
      "顔認識と感情分析: Rekognitionの主要機能の1つです。顔の検出、比較、感情の分析が可能です。",
      "✓ 正解: テキストから音声への変換はAmazon Pollyの機能です。Rekognitionは画像・動画分析に特化しています。",
      "不適切なコンテンツの検出: Rekognitionの主要機能の1つです。暴力的、成人向けコンテンツなどを検出できます。"
    ]
  },
  {
    id: 12,
    question: "プロンプトエンジニアリングにおいて、Few-shot learningとは何ですか。",
    options: [
      "モデルに例を全く与えずにタスクを実行させる",
      "モデルに少数の例を与えてタスクを実行させる",
      "モデルを完全に再学習させる",
      "モデルのパラメータを削減する"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Few-shot learningは、プロンプトに少数の例（通常2〜5個）を含めることで、モデルにタスクのパターンを理解させる手法です。Zero-shot（例なし）よりも精度が高く、Fine-tuning（完全な再学習）よりも簡単に実装できます。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/prompt-engineering-guidelines.html", title: "プロンプトエンジニアリングのガイドライン" }
    ],
    optionExplanations: [
      "例を全く与えないのはZero-shot learningです。Few-shotは少数の例を使用します。",
      "✓ 正解: Few-shot learningは、プロンプトに2〜5個程度の例を含めて、モデルにタスクを理解させる効果的な手法です。",
      "完全な再学習はFine-tuningです。Few-shotはプロンプトのみで対応します。",
      "パラメータ削減はモデル圧縮の技術で、Few-shot learningとは異なります。"
    ]
  },
  {
    id: 13,
    question: "Amazon Comprehendの主な機能はどれですか。",
    options: [
      "画像認識",
      "自然言語処理とテキスト分析",
      "音声合成",
      "動画編集"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Comprehendは、自然言語処理（NLP）を使用してテキストから洞察を抽出するサービスです。感情分析、エンティティ認識、キーフレーズ抽出、言語検出などの機能を提供します。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/comprehend/latest/dg/what-is.html", title: "Amazon Comprehend とは" }
    ],
    optionExplanations: [
      "画像認識はAmazon Rekognitionの機能です。Comprehendはテキスト分析に特化しています。",
      "✓ 正解: Comprehendは、感情分析、エンティティ認識、トピックモデリングなどのNLP機能を提供します。",
      "音声合成はAmazon Pollyの機能です。Comprehendはテキスト理解に焦点を当てています。",
      "動画編集はメディア処理サービスの領域で、Comprehendの機能ではありません。"
    ]
  },
  {
    id: 14,
    question: "RAG（Retrieval-Augmented Generation）アーキテクチャの主な利点は何ですか。",
    options: [
      "モデルの学習コストを削減できる",
      "外部知識ベースを活用して最新情報を提供できる",
      "モデルのサイズを大幅に削減できる",
      "推論速度を10倍に向上できる"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "RAGは、生成AIモデルと外部の知識ベース（ベクトルデータベースなど）を組み合わせるアーキテクチャです。モデルの再学習なしに最新情報や専門知識を活用でき、ハルシネーション（幻覚）を減らし、より正確で信頼性の高い回答を生成できます。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/jumpstart-foundation-models-customize-rag.html", title: "RAG を使用した基盤モデルのカスタマイズ" }
    ],
    optionExplanations: [
      "RAGは推論時のコストは増加する可能性がありますが、再学習コストは削減できます。",
      "✓ 正解: RAGは外部知識ベースから関連情報を取得し、それを基に回答を生成するため、最新情報や専門知識を活用できます。",
      "RAGはモデルサイズ自体を削減するものではなく、外部知識を活用する仕組みです。",
      "RAGは知識検索のステップが追加されるため、推論速度は通常低下します。"
    ]
  },
  {
    id: 15,
    question: "Amazon SageMaker Autopilotの主な機能は何ですか。",
    options: [
      "手動でハイパーパラメータを調整する",
      "機械学習モデルを自動的に構築、学習、調整する",
      "データベースのバックアップを自動化する",
      "ネットワーク設定を自動化する"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker Autopilotは、AutoML（自動機械学習）サービスで、データを提供するだけで、最適なアルゴリズムの選択、特徴量エンジニアリング、ハイパーパラメータチューニングを自動的に実行し、最良のモデルを生成します。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/autopilot-automate-model-development.html", title: "SageMaker Autopilot でモデル開発を自動化" }
    ],
    optionExplanations: [
      "Autopilotは自動化が目的で、手動調整を不要にします。",
      "✓ 正解: Autopilotは、データサイエンスの専門知識がなくても、高品質な機械学習モデルを自動的に構築できます。",
      "データベースバックアップはAWS Backupの機能で、Autopilotとは無関係です。",
      "ネットワーク設定はVPCやネットワーキングサービスの領域です。"
    ]
  },
  {
    id: 16,
    question: "機械学習モデルのバイアスを検出・軽減するために、Amazon SageMakerで使用できる機能はどれですか。",
    options: [
      "SageMaker Clarify",
      "SageMaker Neo",
      "SageMaker Edge Manager",
      "SageMaker Pipelines"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "SageMaker Clarifyは、機械学習モデルのバイアス検出と説明可能性を提供するツールです。学習データやモデル予測におけるバイアスを特定し、公平性を向上させるための洞察を提供します。",
    category: "責任あるAI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/clarify-fairness-and-explainability.html", title: "SageMaker Clarify による公平性と説明可能性" }
    ],
    optionExplanations: [
      "✓ 正解: SageMaker Clarifyは、バイアス検出、モデルの説明可能性、特徴量の重要度分析を提供します。",
      "SageMaker Neoはモデルの最適化とコンパイルを行うサービスです。",
      "SageMaker Edge Managerはエッジデバイス上のモデル管理サービスです。",
      "SageMaker PipelinesはMLワークフローの自動化ツールです。"
    ]
  },
  {
    id: 17,
    question: "Amazon Textractの主な用途は何ですか。",
    options: [
      "テキストの翻訳",
      "ドキュメントからのテキストとデータの抽出",
      "テキストの音声読み上げ",
      "テキストの感情分析"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Textractは、スキャンされたドキュメント、PDF、画像からテキスト、手書き文字、表、フォームデータを自動的に抽出する機械学習サービスです。OCR（光学文字認識）を超えて、ドキュメントの構造も理解します。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/textract/latest/dg/what-is.html", title: "Amazon Textract とは" }
    ],
    optionExplanations: [
      "テキストの翻訳はAmazon Translateの機能です。",
      "✓ 正解: Textractは、請求書、領収書、フォームなどからテキストとデータを自動抽出し、構造化データとして出力します。",
      "テキストの音声読み上げはAmazon Pollyの機能です。",
      "テキストの感情分析はAmazon Comprehendの機能です。"
    ]
  },
  {
    id: 18,
    question: "生成AIモデルの「温度（Temperature）」パラメータを高く設定すると、どのような影響がありますか。",
    options: [
      "より決定論的で予測可能な出力になる",
      "よりランダムで創造的な出力になる",
      "推論速度が向上する",
      "モデルのサイズが削減される"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "温度パラメータは、生成AIモデルの出力の多様性を制御します。温度を高く設定すると、モデルはより多様でランダムな出力を生成し、創造性が増します。温度を低く設定すると、より決定論的で予測可能な出力になります。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/model-parameters.html", title: "モデルパラメータ" }
    ],
    optionExplanations: [
      "温度を低く設定すると決定論的になります。高く設定すると逆の効果があります。",
      "✓ 正解: 温度を高く設定すると、モデルはより多様で創造的な出力を生成しますが、一貫性は低下する可能性があります。",
      "温度パラメータは推論速度には影響しません。出力の多様性のみを制御します。",
      "温度パラメータはモデルサイズには影響しません。"
    ]
  },
  {
    id: 19,
    question: "Amazon Forecastの主な用途は何ですか。",
    options: [
      "画像分類",
      "時系列予測",
      "テキスト生成",
      "音声認識"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Forecastは、機械学習を使用して高精度な時系列予測を行うフルマネージドサービスです。需要予測、在庫計画、リソース計画などのビジネスユースケースに最適化されています。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/forecast/latest/dg/what-is-forecast.html", title: "Amazon Forecast とは" }
    ],
    optionExplanations: [
      "画像分類はAmazon Rekognitionの機能です。",
      "✓ 正解: Forecastは、売上予測、需要予測、リソース計画などの時系列データの予測に特化しています。",
      "テキスト生成は生成AIモデル（BedrockやSageMaker）の機能です。",
      "音声認識はAmazon Transcribeの機能です。"
    ]
  },
  {
    id: 20,
    question: "ファインチューニング（Fine-tuning）と比較した場合の、プロンプトエンジニアリングの主な利点は何ですか。",
    options: [
      "モデルの精度が常に高い",
      "実装が迅速で、モデルの再学習が不要",
      "計算コストが常に低い",
      "すべてのタスクで最適"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "プロンプトエンジニアリングは、モデルの再学習なしに、プロンプトの設計だけでタスクを実行できるため、迅速に実装でき、コストも抑えられます。ファインチューニングは高精度が必要な場合に有効ですが、時間とコストがかかります。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/prompt-engineering.html", title: "プロンプトエンジニアリング" }
    ],
    optionExplanations: [
      "プロンプトエンジニアリングは迅速ですが、精度はファインチューニングより低い場合があります。",
      "✓ 正解: プロンプトエンジニアリングは、モデルの再学習が不要で、迅速にタスクを実装できる点が大きな利点です。",
      "複雑なプロンプトや大量の推論では、コストが高くなる場合もあります。",
      "タスクによってはファインチューニングの方が適している場合もあります。"
    ]
  },
  {
    id: 21,
    question: "Amazon Personalizeの主な用途は何ですか。",
    options: [
      "画像認識",
      "パーソナライズされた推薦システムの構築",
      "音声合成",
      "データベース管理"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Personalizeは、機械学習を使用してパーソナライズされた推薦を提供するフルマネージドサービスです。Amazon.comで使用されているのと同じ技術を活用し、商品推薦、コンテンツ推薦、マーケティングパーソナライゼーションなどに使用できます。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/personalize/latest/dg/what-is-personalize.html", title: "Amazon Personalize とは" }
    ],
    optionExplanations: [
      "画像認識はAmazon Rekognitionの機能です。",
      "✓ 正解: Personalizeは、ユーザーの行動履歴に基づいて、パーソナライズされた商品やコンテンツの推薦を提供します。",
      "音声合成はAmazon Pollyの機能です。",
      "データベース管理はRDSやDynamoDBの領域です。"
    ]
  },
  {
    id: 22,
    question: "機械学習モデルの「ハルシネーション（幻覚）」とは何を指しますか。",
    options: [
      "モデルが過学習している状態",
      "モデルが事実ではない情報を生成する現象",
      "モデルの学習速度が遅い状態",
      "モデルのサイズが大きすぎる状態"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "ハルシネーションは、生成AIモデルが事実に基づかない、または誤った情報を自信を持って生成する現象です。RAG（Retrieval-Augmented Generation）やファクトチェック機能を使用することで、ハルシネーションを軽減できます。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/knowledge-base.html", title: "Amazon Bedrock のナレッジベース" }
    ],
    optionExplanations: [
      "過学習は、モデルが学習データに過度に適合する別の問題です。",
      "✓ 正解: ハルシネーションは、モデルが存在しない事実や誤った情報を生成する現象で、生成AIの重要な課題の1つです。",
      "学習速度の遅さは、ハルシネーションとは無関係な技術的な問題です。",
      "モデルサイズは、ハルシネーションの直接的な原因ではありません。"
    ]
  },
  {
    id: 23,
    question: "Amazon Kendraの主な機能は何ですか。",
    options: [
      "画像検索",
      "インテリジェントな企業向け検索サービス",
      "動画編集",
      "データベースクエリ"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Kendraは、機械学習を活用したインテリジェントな企業向け検索サービスです。自然言語クエリを理解し、ドキュメント、FAQ、ナレッジベースから関連性の高い回答を提供します。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/kendra/latest/dg/what-is-kendra.html", title: "Amazon Kendra とは" }
    ],
    optionExplanations: [
      "画像検索はAmazon Rekognitionの機能です。",
      "✓ 正解: Kendraは、自然言語処理を使用して、企業のドキュメントやデータから正確な回答を見つけ出します。",
      "動画編集はメディア処理サービスの領域です。",
      "データベースクエリはRDSやAthenaの機能です。"
    ]
  },
  {
    id: 24,
    question: "Amazon SageMaker Data Wranglerの主な目的は何ですか。",
    options: [
      "モデルのデプロイ",
      "データの準備と特徴量エンジニアリング",
      "モデルの監視",
      "コスト最適化"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker Data Wranglerは、機械学習のためのデータ準備を簡素化するビジュアルツールです。データのインポート、変換、特徴量エンジニアリング、データ品質の分析を、コードを書かずに実行できます。",
    category: "AWSのAI/MLサービス",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/data-wrangler.html", title: "SageMaker Data Wrangler でデータを準備" }
    ],
    optionExplanations: [
      "モデルのデプロイはSageMaker Endpointsの機能です。",
      "✓ 正解: Data Wranglerは、データクリーニング、変換、特徴量エンジニアリングを視覚的に実行できるツールです。",
      "モデルの監視はSageMaker Model Monitorの機能です。",
      "コスト最適化はCost ExplorerやTrusted Advisorの領域です。"
    ]
  },
  {
    id: 25,
    question: "トークン（Token）とは、生成AIモデルのコンテキストで何を指しますか。",
    options: [
      "セキュリティ認証キー",
      "テキストの最小単位（単語や文字の一部）",
      "モデルのバージョン番号",
      "データベースのレコード"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "トークンは、生成AIモデルがテキストを処理する際の基本単位です。単語、単語の一部、または文字として表現されます。モデルの入力と出力はトークン数で測定され、コストや制限もトークン数に基づいて計算されます。",
    category: "生成AI",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/model-parameters.html", title: "モデルパラメータ" }
    ],
    optionExplanations: [
      "セキュリティ認証キーは別の概念で、APIアクセスに使用されます。",
      "✓ 正解: トークンは、モデルがテキストを理解・生成する際の基本単位で、通常1トークンは約4文字（英語）または1〜2文字（日本語）に相当します。",
      "モデルのバージョン番号は、トークンとは無関係です。",
      "データベースのレコードは、トークンとは異なる概念です。"
    ]
  },
  {
    id: 26,
    question: "Amazon SageMaker Feature Storeの主な目的は何ですか。",
    options: [
      "モデルのトレーニング",
      "特徴量の保存、共有、管理",
      "データの可視化",
      "コスト分析"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker Feature Storeは、機械学習の特徴量を一元管理するリポジトリです。特徴量の保存、バージョン管理、共有、再利用を可能にし、学習と推論の両方で一貫した特徴量を使用できます。",
    category: "AWSのAI/MLサービス",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/feature-store.html", title: "SageMaker Feature Store" }
    ],
    optionExplanations: [
      "モデルのトレーニングはSageMaker Training Jobの機能です。",
      "✓ 正解: Feature Storeは、特徴量の一元管理により、チーム間での特徴量の再利用と一貫性を実現します。",
      "データの可視化はQuickSightやSageMaker Studioの機能です。",
      "コスト分析はCost Explorerの機能です。"
    ]
  },
  {
    id: 27,
    question: "エンベディング（Embedding）とは、機械学習のコンテキストで何を指しますか。",
    options: [
      "モデルをアプリケーションに組み込むこと",
      "データを低次元のベクトル表現に変換すること",
      "モデルを圧縮すること",
      "データを暗号化すること"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "エンベディングは、テキスト、画像、音声などの高次元データを、意味的な関係を保持した低次元のベクトル表現に変換する技術です。類似性検索、推薦システム、RAGなどで広く使用されます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/embeddings.html", title: "エンベディングモデル" }
    ],
    optionExplanations: [
      "モデルの組み込みは、デプロイメントの概念です。",
      "✓ 正解: エンベディングは、データを数値ベクトルに変換し、機械学習モデルが処理しやすい形式にします。",
      "モデル圧縮は、モデルサイズを削減する別の技術です。",
      "データ暗号化は、セキュリティの概念です。"
    ]
  },
  {
    id: 28,
    question: "Amazon Fraud Detectorの主な用途は何ですか。",
    options: [
      "画像の不正検出",
      "オンライン詐欺とアカウント乗っ取りの検出",
      "ネットワーク侵入の検出",
      "コードの脆弱性検出"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Fraud Detectorは、機械学習を使用してオンライン詐欺を検出するフルマネージドサービスです。不正なアカウント作成、支払い詐欺、偽レビューなどを自動的に識別します。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/frauddetector/latest/ug/what-is-frauddetector.html", title: "Amazon Fraud Detector とは" }
    ],
    optionExplanations: [
      "画像の不正検出はAmazon Rekognitionの機能です。",
      "✓ 正解: Fraud Detectorは、オンライン取引、アカウント登録、ゲストチェックアウトなどでの詐欺行為を検出します。",
      "ネットワーク侵入の検出はGuardDutyの機能です。",
      "コードの脆弱性検出はCodeGuruの機能です。"
    ]
  },
  {
    id: 29,
    question: "コンテキストウィンドウ（Context Window）とは、生成AIモデルにおいて何を指しますか。",
    options: [
      "モデルが一度に処理できるトークンの最大数",
      "モデルの学習時間",
      "モデルのメモリサイズ",
      "モデルの精度"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "コンテキストウィンドウは、生成AIモデルが一度に処理できる入力と出力の合計トークン数の上限です。モデルによって異なり、例えばClaude 3は200Kトークン、GPT-4は128Kトークンのコンテキストウィンドウを持ちます。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/model-parameters.html", title: "モデルパラメータ" }
    ],
    optionExplanations: [
      "✓ 正解: コンテキストウィンドウは、モデルが一度に「記憶」できる情報量を決定し、長い文書の処理能力に影響します。",
      "学習時間は、モデルのトレーニングにかかる時間で、コンテキストウィンドウとは異なります。",
      "メモリサイズは、モデルのパラメータ数に関連しますが、コンテキストウィンドウとは別の概念です。",
      "精度は、モデルの性能指標で、コンテキストウィンドウとは異なります。"
    ]
  },
  {
    id: 30,
    question: "Amazon CodeWhispererの主な機能は何ですか。",
    options: [
      "コードレビューの自動化",
      "AIによるコード補完と生成",
      "コードのデプロイ",
      "コードのバージョン管理"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon CodeWhispererは、AIを活用したコーディング支援ツールで、コメントや既存のコードに基づいてコードの提案と生成を行います。セキュリティスキャン機能も提供し、安全なコーディングを支援します。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/codewhisperer/latest/userguide/what-is-cwspr.html", title: "Amazon CodeWhisperer とは" }
    ],
    optionExplanations: [
      "コードレビューはCodeGuruの機能です。",
      "✓ 正解: CodeWhispererは、開発者の生産性を向上させるため、リアルタイムでコードの提案と補完を提供します。",
      "コードのデプロイはCodeDeployの機能です。",
      "バージョン管理はCodeCommitやGitの機能です。"
    ]
  },
  {
    id: 31,
    question: "Amazon SageMaker Model Monitorの主な目的は何ですか。",
    options: [
      "モデルのトレーニング",
      "本番環境でのモデルのパフォーマンスとデータ品質の監視",
      "モデルのデプロイ",
      "データの収集"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker Model Monitorは、本番環境にデプロイされたモデルを継続的に監視し、データ品質の問題やモデルドリフト（性能劣化）を検出します。問題が検出されると、自動的にアラートを送信します。",
    category: "AWSのAI/MLサービス",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/model-monitor.html", title: "Amazon SageMaker Model Monitor" }
    ],
    optionExplanations: [
      "モデルのトレーニングはSageMaker Training Jobの機能です。",
      "✓ 正解: Model Monitorは、データドリフト、モデルドリフト、バイアスドリフト、特徴量の異常を検出し、モデルの品質を維持します。",
      "モデルのデプロイはSageMaker Endpointsの機能です。",
      "データの収集は、データパイプラインやETLツールの役割です。"
    ]
  },
  {
    id: 32,
    question: "Chain-of-Thought（CoT）プロンプティングとは何ですか。",
    options: [
      "複数のモデルを連鎖させる手法",
      "モデルに段階的な推論プロセスを示させる手法",
      "モデルを高速化する手法",
      "モデルを圧縮する手法"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Chain-of-Thought（思考の連鎖）プロンプティングは、モデルに中間的な推論ステップを生成させることで、複雑な問題解決能力を向上させる手法です。「ステップバイステップで考えてください」などの指示を含めます。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/prompt-engineering-guidelines.html", title: "プロンプトエンジニアリングのガイドライン" }
    ],
    optionExplanations: [
      "複数のモデルを連鎖させるのは、モデルチェーニングやアンサンブル学習です。",
      "✓ 正解: CoTプロンプティングは、モデルに推論の過程を明示的に示させることで、数学的問題や論理的推論の精度を向上させます。",
      "モデルの高速化は、量子化やプルーニングなどの最適化技術です。",
      "モデルの圧縮は、蒸留やプルーニングなどの技術です。"
    ]
  },
  {
    id: 33,
    question: "Amazon Augmented AI (A2I)の主な用途は何ですか。",
    options: [
      "モデルの自動学習",
      "機械学習予測に人間のレビューを組み込む",
      "データの自動収集",
      "モデルの自動デプロイ"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon A2Iは、機械学習の予測に人間のレビューを簡単に組み込むことができるサービスです。低信頼度の予測や重要な判断に対して、人間の確認を要求するワークフローを構築できます。",
    category: "AWSのAI/MLサービス",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/a2i-use-augmented-ai-a2i-human-review-loops.html", title: "Amazon Augmented AI" }
    ],
    optionExplanations: [
      "モデルの自動学習はSageMaker Autopilotの機能です。",
      "✓ 正解: A2Iは、Human-in-the-Loop（HITL）機械学習を実現し、重要な判断に人間の専門知識を活用します。",
      "データの自動収集は、データパイプラインの役割です。",
      "モデルの自動デプロイはSageMaker Pipelinesの機能です。"
    ]
  },
  {
    id: 34,
    question: "ベクトルデータベースの主な用途は何ですか。",
    options: [
      "リレーショナルデータの保存",
      "エンベディングの保存と類似性検索",
      "トランザクション処理",
      "ログの保存"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "ベクトルデータベースは、エンベディング（ベクトル表現）を効率的に保存し、類似性検索を高速に実行するために最適化されたデータベースです。RAG、推薦システム、セマンティック検索などで使用されます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/knowledge-base.html", title: "Amazon Bedrock のナレッジベース" }
    ],
    optionExplanations: [
      "リレーショナルデータの保存はRDSやAuroraの用途です。",
      "✓ 正解: ベクトルデータベースは、高次元ベクトルの類似性検索を高速に実行し、意味的に関連するコンテンツを見つけます。",
      "トランザクション処理は、RDBMSの主要機能です。",
      "ログの保存は、CloudWatch LogsやS3の用途です。"
    ]
  },
  {
    id: 35,
    question: "Amazon DevOps Guruの主な機能は何ですか。",
    options: [
      "コードの自動生成",
      "機械学習を使用した運用上の異常検出",
      "データベースの管理",
      "ネットワークの設定"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon DevOps Guruは、機械学習を使用してアプリケーションの運用上の問題を自動的に検出し、推奨される修正アクションを提供するサービスです。異常なメトリクスやログパターンを識別します。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/devops-guru/latest/userguide/welcome.html", title: "Amazon DevOps Guru とは" }
    ],
    optionExplanations: [
      "コードの自動生成はCodeWhispererの機能です。",
      "✓ 正解: DevOps Guruは、CloudWatchメトリクス、AWS X-Ray、CloudFormationスタックを分析し、運用上の問題を予測的に検出します。",
      "データベースの管理はRDSやDynamoDBの領域です。",
      "ネットワークの設定はVPCやネットワーキングサービスの領域です。"
    ]
  },
  {
    id: 36,
    question: "モデルの「推論（Inference）」とは何を指しますか。",
    options: [
      "モデルのトレーニングプロセス",
      "学習済みモデルを使用して予測を行うこと",
      "モデルの評価",
      "データの前処理"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "推論は、学習済みの機械学習モデルを使用して、新しいデータに対して予測や分類を行うプロセスです。トレーニングとは異なり、モデルのパラメータは更新されません。",
    category: "AI/ML基礎",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/deploy-model.html", title: "モデルをデプロイして推論を実行" }
    ],
    optionExplanations: [
      "モデルのトレーニングは、データからパターンを学習するプロセスです。",
      "✓ 正解: 推論は、学習済みモデルを本番環境で使用し、リアルタイムまたはバッチで予測を生成するプロセスです。",
      "モデルの評価は、テストデータでモデルの性能を測定するプロセスです。",
      "データの前処理は、モデルに入力する前にデータを準備するステップです。"
    ]
  },
  {
    id: 37,
    question: "Amazon Lookout for Metricsの主な用途は何ですか。",
    options: [
      "画像認識",
      "時系列データの異常検出",
      "テキスト分析",
      "音声認識"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Lookout for Metricsは、機械学習を使用してビジネスメトリクスの異常を自動的に検出し、根本原因を特定するサービスです。売上、ウェブトラフィック、KPIなどの監視に使用されます。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/lookoutmetrics/latest/dev/what-is-lookout-for-metrics.html", title: "Amazon Lookout for Metrics とは" }
    ],
    optionExplanations: [
      "画像認識はAmazon Rekognitionの機能です。",
      "✓ 正解: Lookout for Metricsは、ビジネスメトリクスの異常パターンを検出し、影響を受けた次元を特定します。",
      "テキスト分析はAmazon Comprehendの機能です。",
      "音声認識はAmazon Transcribeの機能です。"
    ]
  },
  {
    id: 38,
    question: "プロンプトインジェクション攻撃とは何ですか。",
    options: [
      "モデルのトレーニングデータを改ざんする攻撃",
      "悪意のある指示をプロンプトに挿入してモデルの動作を操作する攻撃",
      "モデルのパラメータを盗む攻撃",
      "ネットワークトラフィックを傍受する攻撃"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "プロンプトインジェクションは、生成AIモデルに対する攻撃手法で、悪意のある指示をプロンプトに挿入することで、モデルに意図しない動作をさせます。ガードレールやコンテンツフィルタリングで対策できます。",
    category: "責任あるAI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/guardrails.html", title: "Amazon Bedrock のガードレール" }
    ],
    optionExplanations: [
      "トレーニングデータの改ざんは、データポイズニング攻撃です。",
      "✓ 正解: プロンプトインジェクションは、ユーザー入力を通じてモデルの動作を不正に操作する攻撃で、セキュリティ上の重要な懸念事項です。",
      "モデルのパラメータを盗むのは、モデル抽出攻撃です。",
      "ネットワークトラフィックの傍受は、中間者攻撃です。"
    ]
  },
  {
    id: 39,
    question: "Amazon SageMaker Pipelinesの主な目的は何ですか。",
    options: [
      "データの可視化",
      "機械学習ワークフローの自動化とオーケストレーション",
      "モデルの監視",
      "コスト分析"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker Pipelinesは、機械学習ワークフロー（データ準備、トレーニング、評価、デプロイ）を自動化し、再現可能なMLパイプラインを構築するためのCI/CDサービスです。",
    category: "AWSのAI/MLサービス",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/pipelines.html", title: "SageMaker Pipelines" }
    ],
    optionExplanations: [
      "データの可視化はQuickSightやSageMaker Studioの機能です。",
      "✓ 正解: Pipelinesは、MLワークフローの各ステップを定義し、自動実行することで、モデル開発のスピードと品質を向上させます。",
      "モデルの監視はSageMaker Model Monitorの機能です。",
      "コスト分析はCost Explorerの機能です。"
    ]
  },
  {
    id: 40,
    question: "ゼロショット学習（Zero-shot Learning）とは何ですか。",
    options: [
      "モデルに例を全く与えずにタスクを実行させる手法",
      "モデルを完全に再学習させる手法",
      "モデルのパラメータをゼロにする手法",
      "データを使用しない学習手法"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "ゼロショット学習は、タスクの具体的な例を提供せずに、指示のみでモデルにタスクを実行させる手法です。大規模言語モデルは、事前学習により多様なタスクをゼロショットで実行できます。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/prompt-engineering-guidelines.html", title: "プロンプトエンジニアリングのガイドライン" }
    ],
    optionExplanations: [
      "✓ 正解: ゼロショット学習は、例を提供せずに指示だけでタスクを実行させる手法で、Few-shot（少数例）やFine-tuning（再学習）よりも迅速です。",
      "完全な再学習はFine-tuningです。ゼロショットは再学習を必要としません。",
      "パラメータをゼロにするのは、モデルの初期化やプルーニングの概念です。",
      "ゼロショットでも、モデルは事前学習データを使用しています。"
    ]
  },
  {
    id: 41,
    question: "Amazon Translateの主な機能は何ですか。",
    options: [
      "画像認識",
      "ニューラル機械翻訳",
      "音声合成",
      "テキスト分析"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Translateは、ニューラル機械翻訳を使用して、高品質で自然な翻訳を提供するサービスです。75以上の言語をサポートし、リアルタイム翻訳とバッチ翻訳の両方が可能です。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/translate/latest/dg/what-is.html", title: "Amazon Translate とは" }
    ],
    optionExplanations: [
      "画像認識はAmazon Rekognitionの機能です。",
      "✓ 正解: Translateは、ニューラルネットワークベースの機械翻訳により、文脈を理解した自然な翻訳を提供します。",
      "音声合成はAmazon Pollyの機能です。",
      "テキスト分析はAmazon Comprehendの機能です。"
    ]
  },
  {
    id: 42,
    question: "モデルの「量子化（Quantization）」の主な目的は何ですか。",
    options: [
      "モデルの精度を向上させる",
      "モデルのサイズと推論速度を最適化する",
      "モデルの学習速度を向上させる",
      "モデルのバイアスを削減する"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "量子化は、モデルのパラメータを低精度の数値表現（例：32ビットから8ビット）に変換することで、モデルサイズを削減し、推論速度を向上させる技術です。精度の低下は最小限に抑えられます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/neo.html", title: "SageMaker Neo でモデルを最適化" }
    ],
    optionExplanations: [
      "量子化は通常、精度をわずかに犠牲にしますが、効率を大幅に向上させます。",
      "✓ 正解: 量子化により、モデルのメモリ使用量が削減され、推論速度が向上し、エッジデバイスでの実行が可能になります。",
      "量子化は推論の最適化であり、学習速度には直接影響しません。",
      "バイアス削減は、データやアルゴリズムの改善によって達成されます。"
    ]
  },
  {
    id: 43,
    question: "Amazon Pollyの主な機能は何ですか。",
    options: [
      "音声認識",
      "テキストから音声への変換",
      "画像認識",
      "言語翻訳"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Pollyは、テキストを自然な音声に変換するテキスト読み上げ（TTS）サービスです。ニューラルTTS技術により、人間のような自然な音声を生成し、60以上の言語と音声をサポートします。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/polly/latest/dg/what-is.html", title: "Amazon Polly とは" }
    ],
    optionExplanations: [
      "音声認識はAmazon Transcribeの機能です。",
      "✓ 正解: Pollyは、テキストを自然で表現力豊かな音声に変換し、アプリケーションに音声機能を追加できます。",
      "画像認識はAmazon Rekognitionの機能です。",
      "言語翻訳はAmazon Translateの機能です。"
    ]
  },
  {
    id: 44,
    question: "機械学習における「データ拡張（Data Augmentation）」の主な目的は何ですか。",
    options: [
      "データのサイズを物理的に増やす",
      "既存データから新しいトレーニングサンプルを生成して過学習を防ぐ",
      "データを削除する",
      "データを暗号化する"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "データ拡張は、既存のトレーニングデータに変換（回転、反転、ノイズ追加など）を適用して、新しいサンプルを生成する技術です。これにより、モデルの汎化性能が向上し、過学習を防ぎます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/data-wrangler-data-insights.html", title: "データインサイト" }
    ],
    optionExplanations: [
      "データ拡張は、物理的なデータ量ではなく、トレーニングサンプルの多様性を増やします。",
      "✓ 正解: データ拡張により、限られたデータから多様なトレーニングサンプルを生成し、モデルのロバスト性を向上させます。",
      "データの削除は、データクリーニングの一部ですが、拡張ではありません。",
      "データの暗号化は、セキュリティ対策であり、拡張ではありません。"
    ]
  },
  {
    id: 45,
    question: "Amazon SageMaker Ground Truthの主な用途は何ですか。",
    options: [
      "モデルのトレーニング",
      "高品質なトレーニングデータのラベリング",
      "モデルのデプロイ",
      "データの可視化"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker Ground Truthは、機械学習のための高品質なトレーニングデータセットを構築するためのデータラベリングサービスです。人間のラベラーと機械学習を組み合わせて、効率的にデータをラベリングします。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/sms.html", title: "SageMaker Ground Truth" }
    ],
    optionExplanations: [
      "モデルのトレーニングはSageMaker Training Jobの機能です。",
      "✓ 正解: Ground Truthは、画像分類、物体検出、セマンティックセグメンテーション、テキスト分類などのラベリングタスクをサポートします。",
      "モデルのデプロイはSageMaker Endpointsの機能です。",
      "データの可視化はQuickSightやSageMaker Studioの機能です。"
    ]
  },
  {
    id: 46,
    question: "「トランスファー学習（Transfer Learning）」の主な利点は何ですか。",
    options: [
      "データ転送速度の向上",
      "事前学習済みモデルを活用して学習時間とデータ量を削減",
      "モデルのサイズを削減",
      "推論速度の向上"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "トランスファー学習は、大規模データセットで事前学習されたモデルを、新しいタスクに適用する手法です。少量のデータと短い学習時間で高精度なモデルを構築できます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/transfer-learning.html", title: "転移学習" }
    ],
    optionExplanations: [
      "データ転送速度は、ネットワークやストレージの問題です。",
      "✓ 正解: トランスファー学習により、ImageNetなどで学習済みのモデルを活用し、少量のデータで高精度なモデルを構築できます。",
      "モデルサイズの削減は、量子化やプルーニングの目的です。",
      "推論速度の向上は、最適化技術の目的です。"
    ]
  },
  {
    id: 47,
    question: "Amazon Transcribeの主な機能は何ですか。",
    options: [
      "テキストから音声への変換",
      "音声からテキストへの自動変換",
      "画像認識",
      "言語翻訳"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Transcribeは、音声をテキストに自動変換する音声認識サービスです。リアルタイム変換とバッチ変換をサポートし、話者識別、カスタム語彙、自動句読点などの機能を提供します。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/transcribe/latest/dg/what-is.html", title: "Amazon Transcribe とは" }
    ],
    optionExplanations: [
      "テキストから音声への変換はAmazon Pollyの機能です。",
      "✓ 正解: Transcribeは、会議の文字起こし、字幕生成、コールセンターの分析などに使用されます。",
      "画像認識はAmazon Rekognitionの機能です。",
      "言語翻訳はAmazon Translateの機能です。"
    ]
  },
  {
    id: 48,
    question: "「アンサンブル学習（Ensemble Learning）」とは何ですか。",
    options: [
      "複数のモデルを組み合わせて予測精度を向上させる手法",
      "モデルを高速化する手法",
      "データを圧縮する手法",
      "モデルを暗号化する手法"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "アンサンブル学習は、複数の機械学習モデルの予測を組み合わせることで、単一モデルよりも高い精度と安定性を実現する手法です。バギング、ブースティング、スタッキングなどの手法があります。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/autopilot-model-support.html", title: "Autopilot のモデルサポート" }
    ],
    optionExplanations: [
      "✓ 正解: アンサンブル学習は、ランダムフォレスト、XGBoost、投票分類器などで使用され、個々のモデルの弱点を補完します。",
      "モデルの高速化は、量子化や最適化の目的です。",
      "データの圧縮は、ストレージやネットワークの最適化です。",
      "モデルの暗号化は、セキュリティ対策です。"
    ]
  },
  {
    id: 49,
    question: "Amazon SageMaker JumpStartの主な機能は何ですか。",
    options: [
      "データベース管理",
      "事前学習済みモデルとソリューションテンプレートへのアクセス",
      "ネットワーク設定",
      "コスト分析"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker JumpStartは、事前学習済みの機械学習モデル、ソリューションテンプレート、サンプルノートブックを提供するハブです。数クリックでモデルをデプロイし、カスタマイズできます。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/studio-jumpstart.html", title: "SageMaker JumpStart" }
    ],
    optionExplanations: [
      "データベース管理はRDSやDynamoDBの領域です。",
      "✓ 正解: JumpStartは、画像分類、物体検出、テキスト生成などの一般的なユースケース向けに、すぐに使えるモデルとソリューションを提供します。",
      "ネットワーク設定はVPCやネットワーキングサービスの領域です。",
      "コスト分析はCost Explorerの機能です。"
    ]
  },
  {
    id: 50,
    question: "「モデルドリフト（Model Drift）」とは何を指しますか。",
    options: [
      "モデルのサイズが増加すること",
      "時間経過とともにモデルの予測精度が低下する現象",
      "モデルの学習速度が低下すること",
      "モデルのコストが増加すること"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "モデルドリフトは、本番環境のデータ分布が学習時のデータと異なってくることで、モデルの予測精度が時間とともに低下する現象です。SageMaker Model Monitorで検出・対処できます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/model-monitor-model-quality.html", title: "モデル品質の監視" }
    ],
    optionExplanations: [
      "モデルサイズの増加は、ドリフトとは異なる問題です。",
      "✓ 正解: モデルドリフトは、データドリフト（入力データの変化）やコンセプトドリフト（ターゲット変数の関係性の変化）によって発生します。",
      "学習速度の低下は、ドリフトとは異なる技術的な問題です。",
      "コストの増加は、ドリフトの直接的な結果ではありません。"
    ]
  },
  {
    id: 51,
    question: "Amazon Bedrockで利用できる基盤モデル（Foundation Model）に含まれないものはどれですか。",
    options: [
      "Anthropic Claude",
      "Amazon Titan",
      "Meta Llama",
      "Amazon RDS"
    ],
    correctAnswer: 3,
    category: "データベース",
    explanation: "Amazon Bedrockは、Anthropic Claude、Amazon Titan、Meta Llama、Cohere、AI21 Labsなどの基盤モデルへのアクセスを提供します。Amazon RDSはデータベースサービスで、基盤モデルではありません。",
    category: "生成AI",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/models-supported.html", title: "サポートされている基盤モデル" }
    ],
    optionExplanations: [
      "Anthropic Claudeは、Bedrockで利用できる高性能な会話型AIモデルです。",
      "Amazon Titanは、AWSが開発した基盤モデルで、テキスト生成とエンベディングをサポートします。",
      "Meta Llamaは、Metaが開発したオープンソースの大規模言語モデルで、Bedrockで利用できます。",
      "✓ 正解: Amazon RDSはリレーショナルデータベースサービスで、生成AIの基盤モデルではありません。"
    ]
  },
  {
    id: 52,
    question: "機械学習における「バッチ推論」と「リアルタイム推論」の主な違いは何ですか。",
    options: [
      "バッチ推論は大量データを一度に処理、リアルタイム推論は個別リクエストに即座に応答",
      "バッチ推論は高速、リアルタイム推論は低速",
      "バッチ推論は安価、リアルタイム推論は高価（常に）",
      "違いはない"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "バッチ推論は、大量のデータを一括処理し、結果を後で取得します。リアルタイム推論は、個別のリクエストに対して即座に予測を返します。ユースケースに応じて使い分けます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/how-it-works-deployment.html", title: "モデルのデプロイ" }
    ],
    optionExplanations: [
      "✓ 正解: バッチ推論は夜間処理や定期レポートに適し、リアルタイム推論はWebアプリケーションやチャットボットに適しています。",
      "速度は処理方法の違いであり、バッチが常に高速とは限りません。",
      "コストはデータ量や頻度によって異なり、一概には言えません。",
      "明確な違いがあり、ユースケースに応じて選択します。"
    ]
  },
  {
    id: 53,
    question: "Amazon SageMaker Neoの主な目的は何ですか。",
    options: [
      "データの収集",
      "機械学習モデルの最適化とコンパイル",
      "モデルのトレーニング",
      "データの可視化"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker Neoは、機械学習モデルを特定のハードウェアプラットフォーム向けに最適化し、推論パフォーマンスを最大2倍向上させるコンパイラです。エッジデバイスやクラウドでの効率的な推論を実現します。",
    category: "AWSのAI/MLサービス",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/neo.html", title: "SageMaker Neo" }
    ],
    optionExplanations: [
      "データの収集は、データパイプラインやETLツールの役割です。",
      "✓ 正解: Neoは、TensorFlow、PyTorch、MXNetなどのフレームワークで学習したモデルを、ARM、Intel、NVIDIAなどのプロセッサ向けに最適化します。",
      "モデルのトレーニングはSageMaker Training Jobの機能です。",
      "データの可視化はQuickSightやSageMaker Studioの機能です。"
    ]
  },
  {
    id: 54,
    question: "「プルーニング（Pruning）」とは、機械学習モデルの最適化において何を指しますか。",
    options: [
      "データのクリーニング",
      "重要度の低いパラメータを削除してモデルを軽量化",
      "モデルの学習速度を向上",
      "データの暗号化"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "プルーニングは、モデルの重要度の低いパラメータ（重みやニューロン）を削除することで、モデルサイズを削減し、推論速度を向上させる技術です。精度の低下を最小限に抑えながら効率化を実現します。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/neo.html", title: "モデルの最適化" }
    ],
    optionExplanations: [
      "データのクリーニングは、前処理の一部で、プルーニングとは異なります。",
      "✓ 正解: プルーニングにより、モデルのメモリ使用量が削減され、エッジデバイスでの実行が可能になります。",
      "学習速度の向上は、プルーニングの直接的な目的ではありません。",
      "データの暗号化は、セキュリティ対策で、プルーニングとは無関係です。"
    ]
  },
  {
    id: 55,
    question: "Amazon Lookout for Visionの主な用途は何ですか。",
    options: [
      "テキスト分析",
      "コンピュータビジョンを使用した製造上の欠陥検出",
      "音声認識",
      "言語翻訳"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Lookout for Visionは、コンピュータビジョンを使用して、製造ラインの製品や部品の欠陥や異常を自動的に検出するサービスです。わずか30枚の画像から高精度なモデルを構築できます。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/lookout-for-vision/latest/developer-guide/what-is.html", title: "Amazon Lookout for Vision とは" }
    ],
    optionExplanations: [
      "テキスト分析はAmazon Comprehendの機能です。",
      "✓ 正解: Lookout for Visionは、製造業の品質管理を自動化し、欠陥品の検出精度を向上させます。",
      "音声認識はAmazon Transcribeの機能です。",
      "言語翻訳はAmazon Translateの機能です。"
    ]
  },
  {
    id: 56,
    question: "「知識蒸留（Knowledge Distillation）」とは何ですか。",
    options: [
      "データベースからデータを抽出すること",
      "大きなモデルの知識を小さなモデルに転移させる技術",
      "データを圧縮すること",
      "モデルを暗号化すること"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "知識蒸留は、大規模で高精度な「教師モデル」の知識を、小型で高速な「生徒モデル」に転移させる技術です。生徒モデルは、教師モデルの出力を学習することで、少ないパラメータで高い性能を実現します。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/model-compression.html", title: "モデル圧縮" }
    ],
    optionExplanations: [
      "データベースからのデータ抽出は、ETLプロセスです。",
      "✓ 正解: 知識蒸留により、大規模モデルの性能を維持しながら、エッジデバイスで実行可能な小型モデルを作成できます。",
      "データの圧縮は、ストレージ最適化の技術です。",
      "モデルの暗号化は、セキュリティ対策です。"
    ]
  },
  {
    id: 57,
    question: "Amazon SageMaker Canvasの主な特徴は何ですか。",
    options: [
      "コードを書かずに機械学習モデルを構築できるノーコードツール",
      "高度なプログラミングが必要なツール",
      "データベース管理ツール",
      "ネットワーク設定ツール"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "SageMaker Canvasは、ビジネスアナリストやデータサイエンティスト以外のユーザーが、コードを書かずに機械学習モデルを構築、トレーニング、デプロイできるノーコードツールです。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/canvas.html", title: "SageMaker Canvas" }
    ],
    optionExplanations: [
      "✓ 正解: Canvasは、ビジュアルインターフェースを使用して、データのインポート、モデルの構築、予測の生成を簡単に実行できます。",
      "Canvasの目的は、プログラミング不要でMLを利用できるようにすることです。",
      "データベース管理はRDSやDynamoDBの領域です。",
      "ネットワーク設定はVPCやネットワーキングサービスの領域です。"
    ]
  },
  {
    id: 58,
    question: "「マルチモーダルAI」とは何を指しますか。",
    options: [
      "複数のモデルを同時に実行すること",
      "テキスト、画像、音声など複数の種類のデータを処理できるAI",
      "複数のデータセンターで実行されるAI",
      "複数の言語をサポートするAI"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "マルチモーダルAIは、テキスト、画像、音声、動画など、異なる種類（モダリティ）のデータを統合的に理解・生成できるAIシステムです。例えば、画像を見て説明文を生成したり、テキストから画像を生成したりできます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/models-supported.html", title: "マルチモーダルモデル" }
    ],
    optionExplanations: [
      "複数のモデルの同時実行は、アンサンブル学習やモデルチェーニングです。",
      "✓ 正解: マルチモーダルAIは、異なる種類のデータ間の関係を学習し、より豊かな理解と生成を実現します。",
      "複数のデータセンターでの実行は、分散コンピューティングです。",
      "多言語サポートは、マルチリンガルAIです。"
    ]
  },
  {
    id: 59,
    question: "Amazon HealthLakeの主な用途は何ですか。",
    options: [
      "一般的なデータ分析",
      "医療データの保存、変換、分析",
      "画像認識",
      "音声合成"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon HealthLakeは、医療データをFHIR（Fast Healthcare Interoperability Resources）形式で保存、変換、クエリ、分析するためのHIPAA準拠のサービスです。機械学習を使用して医療データから洞察を抽出します。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/healthlake/latest/devguide/what-is-amazon-health-lake.html", title: "Amazon HealthLake とは" }
    ],
    optionExplanations: [
      "一般的なデータ分析は、AthenaやQuickSightの用途です。",
      "✓ 正解: HealthLakeは、電子医療記録、臨床メモ、医療画像などの非構造化データを構造化し、分析可能にします。",
      "画像認識はAmazon Rekognitionの機能です。",
      "音声合成はAmazon Pollyの機能です。"
    ]
  },
  {
    id: 60,
    question: "「エッジAI」とは何を指しますか。",
    options: [
      "クラウドでのみ実行されるAI",
      "デバイス上でローカルに実行される機械学習",
      "高速なAI",
      "安価なAI"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "エッジAIは、スマートフォン、IoTデバイス、産業機器などのエッジデバイス上で、クラウドに接続せずにローカルで機械学習の推論を実行することを指します。低レイテンシー、プライバシー保護、オフライン動作が可能です。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/edge.html", title: "SageMaker Edge Manager" }
    ],
    optionExplanations: [
      "クラウドでのみ実行されるのは、従来のクラウドAIです。",
      "✓ 正解: エッジAIは、SageMaker NeoやEdge Managerを使用して、最適化されたモデルをエッジデバイスにデプロイし、リアルタイム推論を実現します。",
      "速度は利点の1つですが、エッジAIの定義ではありません。",
      "コストは状況によって異なり、エッジAIの定義ではありません。"
    ]
  },
  {
    id: 61,
    question: "Amazon SageMaker Debuggerの主な機能は何ですか。",
    options: [
      "コードのデバッグ",
      "モデルトレーニング中の問題を自動検出・診断",
      "ネットワークのデバッグ",
      "データベースのデバッグ"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker Debuggerは、機械学習モデルのトレーニング中に、勾配消失、過学習、収束の問題などを自動的に検出し、診断するツールです。トレーニングメトリクスとテンソルをリアルタイムで監視します。",
    category: "AWSのAI/MLサービス",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/train-debugger.html", title: "SageMaker Debugger" }
    ],
    optionExplanations: [
      "コードのデバッグは、IDEやデバッガーの機能です。",
      "✓ 正解: Debuggerは、トレーニングジョブの問題を早期に発見し、時間とコストを節約します。",
      "ネットワークのデバッグは、VPC Flow LogsやCloudWatchの領域です。",
      "データベースのデバッグは、RDS Performance InsightsやCloudWatchの領域です。"
    ]
  },
  {
    id: 62,
    question: "「強化学習（Reinforcement Learning）」の主な特徴は何ですか。",
    options: [
      "ラベル付きデータから学習する",
      "エージェントが環境と相互作用し、報酬を最大化するように学習する",
      "データのクラスタリングを行う",
      "データの次元削減を行う"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "強化学習は、エージェントが環境内で行動し、その結果得られる報酬（または罰）に基づいて、最適な行動戦略を学習する機械学習の手法です。ゲームAI、ロボット制御、自動運転などに使用されます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/reinforcement-learning.html", title: "強化学習" }
    ],
    optionExplanations: [
      "ラベル付きデータから学習するのは、教師あり学習です。",
      "✓ 正解: 強化学習は、試行錯誤を通じて最適な行動を学習し、AlphaGoなどの成功例があります。",
      "データのクラスタリングは、教師なし学習の一種です。",
      "データの次元削減は、PCAなどの手法で行われます。"
    ]
  },
  {
    id: 63,
    question: "Amazon CodeGuruの主な機能は何ですか。",
    options: [
      "コードの自動生成",
      "機械学習を使用したコードレビューとパフォーマンス推奨",
      "コードのデプロイ",
      "コードのバージョン管理"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon CodeGuruは、機械学習を使用してコードの品質問題、セキュリティ脆弱性、パフォーマンスのボトルネックを自動的に検出し、改善の推奨事項を提供するサービスです。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/codeguru/latest/reviewer-ug/welcome.html", title: "Amazon CodeGuru Reviewer" }
    ],
    optionExplanations: [
      "コードの自動生成はCodeWhispererの機能です。",
      "✓ 正解: CodeGuruは、Reviewer（コードレビュー）とProfiler（パフォーマンス分析）の2つのコンポーネントを提供します。",
      "コードのデプロイはCodeDeployの機能です。",
      "バージョン管理はCodeCommitやGitの機能です。"
    ]
  },
  {
    id: 64,
    question: "「ハイパーパラメータチューニング」の主な目的は何ですか。",
    options: [
      "データを増やすこと",
      "モデルの最適なハイパーパラメータを見つけてパフォーマンスを向上させること",
      "モデルのサイズを削減すること",
      "データを暗号化すること"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "ハイパーパラメータチューニングは、学習率、バッチサイズ、層の数などのハイパーパラメータの最適な組み合わせを探索し、モデルの性能を最大化するプロセスです。SageMaker Automatic Model Tuningで自動化できます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/automatic-model-tuning.html", title: "自動モデルチューニング" }
    ],
    optionExplanations: [
      "データを増やすのは、データ拡張やデータ収集の目的です。",
      "✓ 正解: ハイパーパラメータチューニングは、グリッドサーチ、ランダムサーチ、ベイズ最適化などの手法で実行されます。",
      "モデルサイズの削減は、量子化やプルーニングの目的です。",
      "データの暗号化は、セキュリティ対策です。"
    ]
  },
  {
    id: 65,
    question: "Amazon Monitronの主な用途は何ですか。",
    options: [
      "ネットワーク監視",
      "産業機器の予知保全",
      "データベース監視",
      "アプリケーション監視"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Monitronは、産業機器の振動や温度を監視し、機械学習を使用して異常を検出し、故障を予測する予知保全サービスです。センサー、ゲートウェイ、クラウド分析を統合したエンドツーエンドソリューションです。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/Monitron/latest/admin-guide/what-is-monitron.html", title: "Amazon Monitron とは" }
    ],
    optionExplanations: [
      "ネットワーク監視はCloudWatchやVPC Flow Logsの領域です。",
      "✓ 正解: Monitronは、製造業の設備保全を最適化し、予期しないダウンタイムを削減します。",
      "データベース監視はRDS Performance InsightsやCloudWatchの領域です。",
      "アプリケーション監視はCloudWatchやX-Rayの領域です。"
    ]
  },
  {
    id: 66,
    question: "「クロスバリデーション（Cross-Validation）」の主な目的は何ですか。",
    options: [
      "データを暗号化すること",
      "モデルの汎化性能を評価し、過学習を検出すること",
      "データを増やすこと",
      "モデルを高速化すること"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "クロスバリデーションは、データを複数の分割（フォールド）に分け、各分割を順番にテストセットとして使用することで、モデルの汎化性能を信頼性高く評価する手法です。k分割交差検証が一般的です。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/machine-learning/latest/dg/cross-validation.html", title: "交差検証" }
    ],
    optionExplanations: [
      "データの暗号化は、セキュリティ対策です。",
      "✓ 正解: クロスバリデーションにより、限られたデータでもモデルの性能を正確に評価でき、過学習を防ぎます。",
      "データを増やすのは、データ拡張の目的です。",
      "モデルの高速化は、最適化技術の目的です。"
    ]
  },
  {
    id: 67,
    question: "Amazon Panoramaの主な用途は何ですか。",
    options: [
      "音声認識",
      "エッジでのコンピュータビジョンアプリケーション",
      "テキスト分析",
      "データベース管理"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Panoramaは、既存のIPカメラにコンピュータビジョン機能を追加し、エッジでリアルタイムに画像分析を実行するサービスです。製造、小売、建設などの業界で使用されます。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/panorama/latest/dev/panorama-welcome.html", title: "AWS Panorama とは" }
    ],
    optionExplanations: [
      "音声認識はAmazon Transcribeの機能です。",
      "✓ 正解: Panoramaは、物体検出、人数カウント、安全装備の検証などのコンピュータビジョンタスクをエッジで実行します。",
      "テキスト分析はAmazon Comprehendの機能です。",
      "データベース管理はRDSやDynamoDBの領域です。"
    ]
  },
  {
    id: 68,
    question: "「特徴量エンジニアリング（Feature Engineering）」とは何ですか。",
    options: [
      "モデルのデプロイ",
      "生データから機械学習に有用な特徴量を作成・選択するプロセス",
      "モデルの監視",
      "データの暗号化"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "特徴量エンジニアリングは、生データを変換、結合、選択して、機械学習モデルの性能を向上させる特徴量を作成するプロセスです。モデルの精度に大きな影響を与える重要なステップです。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/data-wrangler.html", title: "特徴量エンジニアリング" }
    ],
    optionExplanations: [
      "モデルのデプロイは、学習済みモデルを本番環境に配置するプロセスです。",
      "✓ 正解: 特徴量エンジニアリングには、正規化、エンコーディング、特徴量の組み合わせ、次元削減などが含まれます。",
      "モデルの監視は、本番環境でのモデルのパフォーマンス追跡です。",
      "データの暗号化は、セキュリティ対策です。"
    ]
  },
  {
    id: 69,
    question: "Amazon Neptuneで機械学習を使用する場合の主なユースケースは何ですか。",
    options: [
      "画像分類",
      "グラフデータに対する予測（リンク予測、ノード分類など）",
      "音声認識",
      "テキスト生成"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Neptune MLは、グラフデータベース上で機械学習を実行し、リンク予測、ノード分類、グラフ分類などのタスクを実行します。ソーシャルネットワーク分析、推薦システム、不正検出などに使用されます。",
    category: "AWSのAI/MLサービス",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/neptune/latest/userguide/machine-learning.html", title: "Neptune ML" }
    ],
    optionExplanations: [
      "画像分類はRekognitionやSageMakerの用途です。",
      "✓ 正解: Neptune MLは、グラフニューラルネットワーク（GNN）を使用して、グラフ構造データから洞察を抽出します。",
      "音声認識はAmazon Transcribeの機能です。",
      "テキスト生成は生成AIモデルの機能です。"
    ]
  },
  {
    id: 70,
    question: "「混同行列（Confusion Matrix）」は、機械学習モデルの何を評価するために使用されますか。",
    options: [
      "モデルのサイズ",
      "分類モデルの予測精度（真陽性、偽陽性、真陰性、偽陰性）",
      "モデルの学習速度",
      "モデルのコスト"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "混同行列は、分類モデルの性能を評価するためのツールで、真陽性（TP）、偽陽性（FP）、真陰性（TN）、偽陰性（FN）の4つのカテゴリで予測結果を表示します。精度、再現率、F1スコアなどの指標を計算できます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/machine-learning/latest/dg/evaluating-model-accuracy.html", title: "モデルの精度の評価" }
    ],
    optionExplanations: [
      "モデルのサイズは、パラメータ数やメモリ使用量で測定されます。",
      "✓ 正解: 混同行列は、モデルがどのクラスをどのように予測したかを詳細に示し、バイアスや弱点を特定するのに役立ちます。",
      "学習速度は、エポックあたりの時間やイテレーション数で測定されます。",
      "モデルのコストは、トレーニングや推論にかかる費用です。"
    ]
  },
  {
    id: 71,
    question: "「精度（Accuracy）」と「再現率（Recall）」の違いは何ですか。",
    options: [
      "精度は全予測のうち正解の割合、再現率は実際の陽性のうち正しく検出した割合",
      "精度と再現率は同じ意味",
      "精度は学習速度、再現率はモデルサイズ",
      "精度はコスト、再現率は速度"
    ],
    correctAnswer: 0,
    category: "その他",
    explanation: "精度（Accuracy）は全予測のうち正解の割合を示し、再現率（Recall）は実際の陽性サンプルのうち、モデルが正しく陽性と予測した割合を示します。不均衡データでは精度だけでは不十分で、再現率やF1スコアも重要です。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/machine-learning/latest/dg/evaluating-model-accuracy.html", title: "モデルの精度の評価" }
    ],
    optionExplanations: [
      "✓ 正解: 精度は(TP+TN)/(TP+TN+FP+FN)、再現率はTP/(TP+FN)で計算されます。医療診断など、見逃しが重大な場合は再現率が重要です。",
      "精度と再現率は異なる指標で、それぞれ異なる側面を評価します。",
      "これらは性能指標であり、学習速度やモデルサイズとは無関係です。",
      "これらは予測性能の指標であり、コストや速度とは異なります。"
    ]
  },
  {
    id: 72,
    question: "Amazon Omicsの主な用途は何ですか。",
    options: [
      "画像認識",
      "ゲノミクスデータの保存、分析、共有",
      "音声認識",
      "テキスト生成"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Omicsは、ゲノミクス、トランスクリプトミクス、その他のオミクスデータを大規模に保存、クエリ、分析するためのフルマネージドサービスです。研究機関や医療機関での精密医療に使用されます。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/omics/latest/dev/what-is-service.html", title: "Amazon Omics とは" }
    ],
    optionExplanations: [
      "画像認識はAmazon Rekognitionの機能です。",
      "✓ 正解: Omicsは、ペタバイト規模のゲノムデータを効率的に処理し、バイオインフォマティクスワークフローを実行します。",
      "音声認識はAmazon Transcribeの機能です。",
      "テキスト生成は生成AIモデルの機能です。"
    ]
  },
  {
    id: 73,
    question: "「勾配降下法（Gradient Descent）」とは何ですか。",
    options: [
      "データを削除する手法",
      "損失関数を最小化するためにモデルのパラメータを更新する最適化アルゴリズム",
      "データを暗号化する手法",
      "モデルを圧縮する手法"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "勾配降下法は、損失関数の勾配（微分）を計算し、その勾配の逆方向にパラメータを更新することで、損失を最小化する最適化アルゴリズムです。機械学習モデルの学習の基本的な手法です。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/how-it-works-training.html", title: "モデルのトレーニング" }
    ],
    optionExplanations: [
      "データの削除は、データクリーニングの一部です。",
      "✓ 正解: 勾配降下法には、バッチ勾配降下法、確率的勾配降下法（SGD）、ミニバッチ勾配降下法などのバリエーションがあります。",
      "データの暗号化は、セキュリティ対策です。",
      "モデルの圧縮は、量子化やプルーニングの技術です。"
    ]
  },
  {
    id: 74,
    question: "Amazon Bedrockのナレッジベース機能の主な目的は何ですか。",
    options: [
      "データベース管理",
      "RAGアーキテクチャを簡単に実装し、独自データで基盤モデルを拡張",
      "ネットワーク設定",
      "コスト分析"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Bedrockのナレッジベースは、独自のデータソース（S3、SharePointなど）を基盤モデルに接続し、RAG（Retrieval-Augmented Generation）を簡単に実装できる機能です。ベクトルデータベースとの統合も自動化されます。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/knowledge-base.html", title: "Amazon Bedrock のナレッジベース" }
    ],
    optionExplanations: [
      "データベース管理はRDSやDynamoDBの領域です。",
      "✓ 正解: ナレッジベースにより、企業の内部文書や専門知識を基盤モデルに統合し、より正確で関連性の高い回答を生成できます。",
      "ネットワーク設定はVPCやネットワーキングサービスの領域です。",
      "コスト分析はCost Explorerの機能です。"
    ]
  },
  {
    id: 75,
    question: "「バッチ正規化（Batch Normalization）」の主な目的は何ですか。",
    options: [
      "データを削除すること",
      "学習を安定化させ、収束を高速化すること",
      "モデルを圧縮すること",
      "データを暗号化すること"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "バッチ正規化は、各層の入力を正規化することで、学習を安定化させ、収束を高速化する技術です。内部共変量シフトを軽減し、より高い学習率を使用できるようになります。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/deep-learning.html", title: "ディープラーニング" }
    ],
    optionExplanations: [
      "データの削除は、データクリーニングの一部です。",
      "✓ 正解: バッチ正規化により、深いニューラルネットワークの学習が容易になり、過学習も軽減されます。",
      "モデルの圧縮は、量子化やプルーニングの技術です。",
      "データの暗号化は、セキュリティ対策です。"
    ]
  },
  {
    id: 76,
    question: "Amazon Q Developerの主な機能は何ですか。",
    options: [
      "データベース管理",
      "AIアシスタントによるコーディング支援とトラブルシューティング",
      "ネットワーク監視",
      "コスト最適化"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Q Developerは、生成AIを活用した開発者向けアシスタントで、コード生成、コードの説明、バグ修正、テストケース作成、AWSサービスに関する質問への回答などを提供します。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/amazonq/latest/qdeveloper-ug/what-is.html", title: "Amazon Q Developer とは" }
    ],
    optionExplanations: [
      "データベース管理はRDSやDynamoDBの領域です。",
      "✓ 正解: Q Developerは、IDE内で直接動作し、開発者の生産性を向上させます。CodeWhispererの後継サービスです。",
      "ネットワーク監視はCloudWatchやVPC Flow Logsの領域です。",
      "コスト最適化はCost ExplorerやTrusted Advisorの機能です。"
    ]
  },
  {
    id: 77,
    question: "「ドロップアウト（Dropout）」とは、ニューラルネットワークにおいて何を指しますか。",
    options: [
      "データを削除すること",
      "過学習を防ぐために、学習中にランダムにニューロンを無効化する正則化技術",
      "モデルを圧縮すること",
      "学習を中断すること"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "ドロップアウトは、学習中にランダムに選択されたニューロンを一時的に無効化することで、ニューロン間の共適応を防ぎ、過学習を軽減する正則化技術です。推論時にはすべてのニューロンを使用します。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/deep-learning.html", title: "ディープラーニング" }
    ],
    optionExplanations: [
      "データの削除は、データクリーニングの一部です。",
      "✓ 正解: ドロップアウトにより、モデルはより汎化性能の高い特徴を学習し、テストデータでの性能が向上します。",
      "モデルの圧縮は、量子化やプルーニングの技術です。",
      "学習の中断は、早期停止（Early Stopping）などの別の技術です。"
    ]
  },
  {
    id: 78,
    question: "Amazon Bedrockのエージェント機能の主な目的は何ですか。",
    options: [
      "データベースのバックアップ",
      "複数のステップを実行し、APIを呼び出して複雑なタスクを自動化",
      "ネットワークの設定",
      "コストの削減"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Bedrockのエージェントは、基盤モデルを使用して、ユーザーの要求を理解し、タスクを分解し、APIを呼び出し、複数のステップを実行して複雑なタスクを自動的に完了します。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/agents.html", title: "Amazon Bedrock のエージェント" }
    ],
    optionExplanations: [
      "データベースのバックアップはAWS BackupやRDSの機能です。",
      "✓ 正解: エージェントは、予約システム、在庫管理、カスタマーサポートなど、複数のステップを必要とするタスクを自動化できます。",
      "ネットワークの設定はVPCやネットワーキングサービスの領域です。",
      "コストの削減は、Cost ExplorerやTrusted Advisorの機能です。"
    ]
  },
  {
    id: 79,
    question: "「活性化関数（Activation Function）」の主な役割は何ですか。",
    options: [
      "データを削除すること",
      "ニューラルネットワークに非線形性を導入し、複雑なパターンを学習可能にすること",
      "モデルを圧縮すること",
      "データを暗号化すること"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "活性化関数は、ニューラルネットワークの各ニューロンの出力に非線形変換を適用し、ネットワークが複雑な非線形パターンを学習できるようにします。ReLU、Sigmoid、Tanhなどが一般的です。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/deep-learning.html", title: "ディープラーニング" }
    ],
    optionExplanations: [
      "データの削除は、データクリーニングの一部です。",
      "✓ 正解: 活性化関数がなければ、ニューラルネットワークは単なる線形変換の組み合わせとなり、複雑なパターンを学習できません。",
      "モデルの圧縮は、量子化やプルーニングの技術です。",
      "データの暗号化は、セキュリティ対策です。"
    ]
  },
  {
    id: 80,
    question: "Amazon Bedrockのモデル評価機能の主な目的は何ですか。",
    options: [
      "コストの計算",
      "異なる基盤モデルのパフォーマンスを比較し、最適なモデルを選択",
      "ネットワークの監視",
      "データベースの管理"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Bedrockのモデル評価機能は、複数の基盤モデルを同じデータセットで評価し、精度、レイテンシー、コストなどの指標を比較して、ユースケースに最適なモデルを選択できます。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/model-evaluation.html", title: "モデル評価" }
    ],
    optionExplanations: [
      "コストの計算はCost Explorerの機能です。",
      "✓ 正解: モデル評価により、カスタムデータセットでモデルをテストし、品質、パフォーマンス、コストのバランスを考慮して最適なモデルを選択できます。",
      "ネットワークの監視はCloudWatchやVPC Flow Logsの領域です。",
      "データベースの管理はRDSやDynamoDBの領域です。"
    ]
  },
  {
    id: 81,
    question: "「F1スコア」とは何を測定する指標ですか。",
    options: [
      "モデルの学習速度",
      "精度と再現率の調和平均",
      "モデルのサイズ",
      "推論速度"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "F1スコアは、精度（Precision）と再現率（Recall）の調和平均で、両方のバランスを考慮した評価指標です。不均衡データセットでモデルを評価する際に特に有用です。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/machine-learning/latest/dg/evaluating-model-accuracy.html", title: "モデルの精度の評価" }
    ],
    optionExplanations: [
      "学習速度は、エポックあたりの時間で測定されます。",
      "✓ 正解: F1スコアは2 * (Precision * Recall) / (Precision + Recall)で計算され、0から1の値を取ります。1に近いほど良好です。",
      "モデルのサイズは、パラメータ数やメモリ使用量で測定されます。",
      "推論速度は、予測にかかる時間で測定されます。"
    ]
  },
  {
    id: 82,
    question: "Amazon SageMaker Studioの主な機能は何ですか。",
    options: [
      "データベース管理",
      "機械学習のための統合開発環境（IDE）",
      "ネットワーク設定",
      "コスト分析"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker Studioは、機械学習のライフサイクル全体（データ準備、モデル構築、トレーニング、デプロイ、監視）を1つのWebベースのIDEで管理できる統合開発環境です。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/studio.html", title: "Amazon SageMaker Studio" }
    ],
    optionExplanations: [
      "データベース管理はRDSやDynamoDBの領域です。",
      "✓ 正解: SageMaker Studioは、Jupyter Notebook、実験管理、モデルレジストリ、パイプライン、デバッガーなどを統合したIDEです。",
      "ネットワーク設定はVPCやネットワーキングサービスの領域です。",
      "コスト分析はCost Explorerの機能です。"
    ]
  },
  {
    id: 83,
    question: "「学習率（Learning Rate）」とは、機械学習において何を制御するパラメータですか。",
    options: [
      "データの読み込み速度",
      "パラメータ更新のステップサイズ",
      "モデルのサイズ",
      "バッチサイズ"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "学習率は、勾配降下法でパラメータを更新する際のステップサイズを制御するハイパーパラメータです。大きすぎると収束しない、小さすぎると学習が遅くなります。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/automatic-model-tuning.html", title: "ハイパーパラメータチューニング" }
    ],
    optionExplanations: [
      "データの読み込み速度は、I/Oパフォーマンスに関連します。",
      "✓ 正解: 学習率は、モデルの収束速度と最終的な性能に大きく影響する重要なハイパーパラメータです。適応的学習率（Adam、RMSpropなど）も広く使用されます。",
      "モデルのサイズは、層の数やニューロン数で決まります。",
      "バッチサイズは、一度に処理するサンプル数です。"
    ]
  },
  {
    id: 84,
    question: "Amazon Bedrockのカスタムモデルインポート機能の主な目的は何ですか。",
    options: [
      "データベースのインポート",
      "独自にファインチューニングしたモデルをBedrockで使用",
      "ネットワーク設定のインポート",
      "コスト設定のインポート"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Bedrockのカスタムモデルインポート機能により、SageMakerなどで独自にファインチューニングしたモデルをBedrockにインポートし、Bedrockの推論APIやガードレールなどの機能を活用できます。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/model-customization.html", title: "モデルのカスタマイズ" }
    ],
    optionExplanations: [
      "データベースのインポートはDMSやRDSの機能です。",
      "✓ 正解: カスタムモデルインポートにより、独自のデータでファインチューニングしたモデルを、Bedrockのマネージドインフラストラクチャで実行できます。",
      "ネットワーク設定のインポートはVPCやネットワーキングサービスの領域です。",
      "コスト設定のインポートは、Cost Explorerの機能です。"
    ]
  },
  {
    id: 85,
    question: "「エポック（Epoch）」とは、機械学習のトレーニングにおいて何を指しますか。",
    options: [
      "モデルのバージョン",
      "トレーニングデータ全体を1回通過すること",
      "バッチの数",
      "学習率の値"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "エポックは、トレーニングデータセット全体をモデルが1回学習することを指します。通常、複数のエポックを実行してモデルを学習させます。",
    category: "AI/ML基礎",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/how-it-works-training.html", title: "モデルのトレーニング" }
    ],
    optionExplanations: [
      "モデルのバージョンは、Model Registryで管理されます。",
      "✓ 正解: 例えば、10エポックのトレーニングは、データセット全体を10回繰り返し学習することを意味します。",
      "バッチの数は、データセットサイズとバッチサイズによって決まります。",
      "学習率は、パラメータ更新のステップサイズを制御するハイパーパラメータです。"
    ]
  },
  {
    id: 86,
    question: "Amazon Lookout for Equipmentの主な用途は何ですか。",
    options: [
      "ネットワーク機器の監視",
      "産業機器の異常検出と予知保全",
      "データベース機器の管理",
      "ストレージ機器の最適化"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Amazon Lookout for Equipmentは、センサーデータを分析して産業機器の異常を検出し、故障を予測する機械学習サービスです。製造業やエネルギー産業での予知保全に使用されます。",
    category: "AWSのAI/MLサービス",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/lookout-for-equipment/latest/ug/what-is.html", title: "Amazon Lookout for Equipment とは" }
    ],
    optionExplanations: [
      "ネットワーク機器の監視はCloudWatchやVPC Flow Logsの領域です。",
      "✓ 正解: Lookout for Equipmentは、温度、圧力、振動などのセンサーデータから異常パターンを学習し、故障を事前に予測します。",
      "データベース機器の管理はRDS Performance Insightsの領域です。",
      "ストレージ機器の最適化は、S3やEBSの機能です。"
    ]
  },
  {
    id: 87,
    question: "「オーバーサンプリング」と「アンダーサンプリング」は、どのような問題に対処するための手法ですか。",
    options: [
      "モデルのサイズが大きすぎる問題",
      "クラス不均衡（Imbalanced Data）の問題",
      "学習速度が遅い問題",
      "推論速度が遅い問題"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "オーバーサンプリングとアンダーサンプリングは、クラス不均衡データセット（少数クラスと多数クラスのサンプル数が大きく異なる）に対処する手法です。オーバーサンプリングは少数クラスを増やし、アンダーサンプリングは多数クラスを減らします。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/data-wrangler-data-insights.html", title: "データインサイト" }
    ],
    optionExplanations: [
      "モデルサイズの問題は、量子化やプルーニングで対処します。",
      "✓ 正解: クラス不均衡は、詐欺検出や医療診断など、陽性サンプルが少ないタスクでよく発生します。SMOTE（Synthetic Minority Over-sampling Technique）などの手法も使用されます。",
      "学習速度の問題は、ハードウェアの最適化や分散学習で対処します。",
      "推論速度の問題は、モデルの最適化やハードウェアの選択で対処します。"
    ]
  },
  {
    id: 88,
    question: "Amazon Bedrockのプロビジョンドスループット（Provisioned Throughput）の主な利点は何ですか。",
    options: [
      "コストが常に安い",
      "予測可能なパフォーマンスと専用キャパシティ",
      "モデルの精度が向上する",
      "データの暗号化が強化される"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "プロビジョンドスループットは、専用のモデルキャパシティを確保し、予測可能なパフォーマンスと一貫したレイテンシーを提供します。高トラフィックのアプリケーションに適しています。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/prov-throughput.html", title: "プロビジョンドスループット" }
    ],
    optionExplanations: [
      "コストは使用量によって異なり、オンデマンドより高い場合もあります。",
      "✓ 正解: プロビジョンドスループットは、ピーク時のパフォーマンスを保証し、他のユーザーの影響を受けません。",
      "モデルの精度は、プロビジョンドスループットでは変わりません。",
      "データの暗号化は、プロビジョンドスループットとは無関係です。"
    ]
  },
  {
    id: 89,
    question: "「バニシング勾配問題（Vanishing Gradient Problem）」とは何ですか。",
    options: [
      "データが消失する問題",
      "深いニューラルネットワークで勾配が極めて小さくなり学習が進まない問題",
      "モデルのサイズが大きくなる問題",
      "推論速度が遅くなる問題"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "バニシング勾配問題は、深いニューラルネットワークで逆伝播時に勾配が層を遡るにつれて指数関数的に小さくなり、初期層のパラメータが更新されなくなる問題です。ReLU活性化関数やバッチ正規化で軽減できます。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/deep-learning.html", title: "ディープラーニング" }
    ],
    optionExplanations: [
      "データの消失は、データ管理の問題です。",
      "✓ 正解: バニシング勾配問題は、特にRNN（再帰型ニューラルネットワーク）で顕著で、LSTM（Long Short-Term Memory）やGRUで対処されます。",
      "モデルサイズの増加は、別の問題です。",
      "推論速度の低下は、別の問題です。"
    ]
  },
  {
    id: 90,
    question: "Amazon SageMaker Experimentsの主な目的は何ですか。",
    options: [
      "データベースの実験",
      "機械学習の実験を追跡、比較、管理",
      "ネットワークの実験",
      "コストの実験"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker Experimentsは、機械学習の実験（異なるハイパーパラメータ、アルゴリズム、データセットでのトレーニング）を自動的に追跡し、結果を比較して最適なモデルを見つけるためのツールです。",
    category: "AWSのAI/MLサービス",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/experiments.html", title: "SageMaker Experiments" }
    ],
    optionExplanations: [
      "データベースの実験は、RDSやDynamoDBの領域です。",
      "✓ 正解: Experimentsは、トレーニングジョブのパラメータ、メトリクス、アーティファクトを自動的に記録し、可視化して比較できます。",
      "ネットワークの実験は、VPCやネットワーキングサービスの領域です。",
      "コストの実験は、Cost Explorerの機能です。"
    ]
  },
  {
    id: 91,
    question: "「ROC曲線（Receiver Operating Characteristic Curve）」とAUC（Area Under the Curve）は、何を評価するために使用されますか。",
    options: [
      "モデルの学習速度",
      "二値分類モデルの性能と閾値の関係",
      "モデルのサイズ",
      "推論速度"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "ROC曲線は、異なる閾値での真陽性率（TPR）と偽陽性率（FPR）の関係を示し、AUCはROC曲線の下の面積で、モデルの総合的な分類性能を表します。AUCが1に近いほど優れたモデルです。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/machine-learning/latest/dg/evaluating-model-accuracy.html", title: "モデルの精度の評価" }
    ],
    optionExplanations: [
      "学習速度は、エポックあたりの時間で測定されます。",
      "✓ 正解: ROC曲線とAUCは、特に不均衡データセットでの二値分類モデルの評価に有用で、閾値に依存しない性能指標を提供します。",
      "モデルのサイズは、パラメータ数やメモリ使用量で測定されます。",
      "推論速度は、予測にかかる時間で測定されます。"
    ]
  },
  {
    id: 92,
    question: "Amazon SageMaker Model Registryの主な目的は何ですか。",
    options: [
      "データベースの登録",
      "機械学習モデルのバージョン管理とデプロイメント管理",
      "ネットワークの登録",
      "ユーザーの登録"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker Model Registryは、機械学習モデルのバージョンを管理し、承認ワークフローを通じてモデルのデプロイメントを制御するサービスです。モデルのメタデータ、メトリクス、承認ステータスを追跡します。",
    category: "AWSのAI/MLサービス",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/model-registry.html", title: "SageMaker Model Registry" }
    ],
    optionExplanations: [
      "データベースの登録は、RDSやDynamoDBの領域です。",
      "✓ 正解: Model Registryは、モデルのライフサイクル管理を簡素化し、本番環境へのデプロイ前の承認プロセスを自動化します。",
      "ネットワークの登録は、VPCやネットワーキングサービスの領域です。",
      "ユーザーの登録は、IAMやCognitoの機能です。"
    ]
  },
  {
    id: 93,
    question: "「逆伝播（Backpropagation）」とは、ニューラルネットワークにおいて何を行うアルゴリズムですか。",
    options: [
      "データを逆順に処理する",
      "損失関数の勾配を計算し、パラメータを更新する",
      "モデルを圧縮する",
      "データを暗号化する"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "逆伝播は、ニューラルネットワークの出力層から入力層に向かって損失関数の勾配を計算し、各層のパラメータを更新するアルゴリズムです。ディープラーニングの学習の基礎となる技術です。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/deep-learning.html", title: "ディープラーニング" }
    ],
    optionExplanations: [
      "データの逆順処理は、逆伝播とは異なります。",
      "✓ 正解: 逆伝播は、連鎖律を使用して効率的に勾配を計算し、勾配降下法と組み合わせてパラメータを最適化します。",
      "モデルの圧縮は、量子化やプルーニングの技術です。",
      "データの暗号化は、セキュリティ対策です。"
    ]
  },
  {
    id: 94,
    question: "Amazon Bedrockのファインチューニング機能の主な利点は何ですか。",
    options: [
      "コストが常に安い",
      "独自のデータでモデルをカスタマイズし、特定タスクの性能を向上",
      "推論速度が常に速い",
      "モデルのサイズが小さくなる"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "Bedrockのファインチューニングにより、基盤モデルを独自のデータで追加学習させ、特定のドメインやタスクに特化した性能を実現できます。プロンプトエンジニアリングよりも高精度な結果が得られます。",
    category: "生成AI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/custom-models.html", title: "カスタムモデル" }
    ],
    optionExplanations: [
      "ファインチューニングには追加コストがかかります。",
      "✓ 正解: ファインチューニングは、企業固有の用語、スタイル、知識をモデルに組み込み、より正確で関連性の高い出力を生成します。",
      "推論速度は、ファインチューニングでは変わりません。",
      "モデルのサイズは、ファインチューニングでは変わりません。"
    ]
  },
  {
    id: 95,
    question: "「正則化（Regularization）」の主な目的は何ですか。",
    options: [
      "学習速度を向上させる",
      "過学習を防ぎ、モデルの汎化性能を向上させる",
      "モデルのサイズを増やす",
      "データを増やす"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "正則化は、モデルの複雑さにペナルティを課すことで過学習を防ぎ、未知のデータに対する汎化性能を向上させる技術です。L1正則化、L2正則化、ドロップアウトなどがあります。",
    category: "AI/ML基礎",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/machine-learning/latest/dg/model-fit-underfitting-vs-overfitting.html", title: "過学習と過小適合" }
    ],
    optionExplanations: [
      "学習速度の向上は、正則化の主な目的ではありません。",
      "✓ 正解: 正則化により、モデルは学習データに過度に適合せず、テストデータでも良好な性能を発揮します。",
      "モデルのサイズを増やすのは、正則化の目的ではありません。",
      "データを増やすのは、データ拡張の目的です。"
    ]
  },
  {
    id: 96,
    question: "Amazon SageMaker Processing Jobsの主な用途は何ですか。",
    options: [
      "モデルのトレーニング",
      "データの前処理と後処理",
      "モデルのデプロイ",
      "コスト分析"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "SageMaker Processing Jobsは、機械学習ワークフローのデータ前処理（特徴量エンジニアリング、データクリーニング）や後処理（モデル評価、バッチ変換）を実行するためのフルマネージドサービスです。",
    category: "AWSのAI/MLサービス",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/processing-job.html", title: "Processing Jobs" }
    ],
    optionExplanations: [
      "モデルのトレーニングはSageMaker Training Jobの機能です。",
      "✓ 正解: Processing Jobsは、Spark、scikit-learn、カスタムコンテナを使用して、大規模なデータ処理タスクを実行できます。",
      "モデルのデプロイはSageMaker Endpointsの機能です。",
      "コスト分析はCost Explorerの機能です。"
    ]
  },
  {
    id: 97,
    question: "「畳み込みニューラルネットワーク（CNN）」が特に得意とするタスクはどれですか。",
    options: [
      "時系列予測",
      "画像認識と処理",
      "テキスト生成",
      "音声合成"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "CNNは、画像の空間的な特徴を効率的に抽出する畳み込み層を持ち、画像分類、物体検出、セマンティックセグメンテーションなどの画像処理タスクに特に優れています。",
    category: "AI/ML基礎",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/image-classification.html", title: "画像分類" }
    ],
    optionExplanations: [
      "時系列予測は、RNNやLSTMが得意とするタスクです。",
      "✓ 正解: CNNは、画像の局所的なパターンを階層的に学習し、位置不変性を持つため、画像認識に最適です。",
      "テキスト生成は、Transformerや大規模言語モデルが得意とするタスクです。",
      "音声合成は、WaveNetなどの専用モデルが使用されます。"
    ]
  },
  {
    id: 98,
    question: "Amazon Bedrockのストリーミングレスポンス機能の主な利点は何ですか。",
    options: [
      "コストが削減される",
      "生成されたテキストをリアルタイムで段階的に受信できる",
      "モデルの精度が向上する",
      "データが暗号化される"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "ストリーミングレスポンスにより、生成AIモデルの出力を完全に生成される前に段階的に受信できます。これにより、ユーザーエクスペリエンスが向上し、応答性の高いアプリケーションを構築できます。",
    category: "生成AI",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/inference-invoke.html", title: "推論の呼び出し" }
    ],
    optionExplanations: [
      "コストは、ストリーミングでも非ストリーミングでも同じです。",
      "✓ 正解: ストリーミングレスポンスは、チャットボットや対話型アプリケーションで、ユーザーが待ち時間を感じにくくします。",
      "モデルの精度は、ストリーミングでは変わりません。",
      "データの暗号化は、ストリーミングとは無関係です。"
    ]
  },
  {
    id: 99,
    question: "「再帰型ニューラルネットワーク（RNN）」が特に得意とするタスクはどれですか。",
    options: [
      "画像分類",
      "時系列データや自然言語処理",
      "データベース管理",
      "ネットワーク設定"
    ],
    correctAnswer: 1,
    category: "その他",
    explanation: "RNNは、前の時刻の情報を保持する再帰的な構造を持ち、時系列データ（株価予測、音声認識）や自然言語処理（機械翻訳、テキスト生成）などのシーケンシャルなデータの処理に優れています。",
    category: "AI/ML基礎",
    difficulty: "初級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/seq-2-seq.html", title: "シーケンス to シーケンス" }
    ],
    optionExplanations: [
      "画像分類は、CNNが得意とするタスクです。",
      "✓ 正解: RNNは、LSTM（Long Short-Term Memory）やGRU（Gated Recurrent Unit）などの改良版が広く使用され、長期依存関係を学習できます。",
      "データベース管理は、RDSやDynamoDBの領域です。",
      "ネットワーク設定は、VPCやネットワーキングサービスの領域です。"
    ]
  },
  {
    id: 100,
    question: "Amazon Bedrockのガードレールで設定できるフィルタに含まれないものはどれですか。",
    options: [
      "有害コンテンツフィルタ",
      "個人情報（PII）フィルタ",
      "データベースクエリフィルタ",
      "トピックフィルタ"
    ],
    correctAnswer: 2,
    category: "分析",
    explanation: "Bedrockのガードレールは、有害コンテンツ、個人情報、拒否トピック、機密情報、単語フィルタなどを設定できますが、データベースクエリのフィルタリングは含まれません。",
    category: "責任あるAI",
    difficulty: "中級",
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/guardrails.html", title: "Amazon Bedrock のガードレール" }
    ],
    optionExplanations: [
      "有害コンテンツフィルタは、ガードレールの主要機能の1つです。暴力、ヘイトスピーチ、性的コンテンツなどを検出します。",
      "個人情報（PII）フィルタは、ガードレールの主要機能の1つです。名前、住所、クレジットカード番号などを検出・マスクします。",
      "✓ 正解: データベースクエリのフィルタリングは、Bedrockのガードレールの機能ではありません。これはアプリケーションレベルで実装します。",
      "トピックフィルタは、ガードレールの主要機能の1つです。特定のトピックに関する質問や応答を拒否できます。"
    ]
  }
];

// Made with Bob
