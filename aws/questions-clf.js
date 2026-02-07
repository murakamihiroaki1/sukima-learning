// AWS Cloud Practitioner 予想問題データ
const awsCLFQuestions = [
  {
    id: 1,
    question: "AWSクラウドの6つの利点に含まれないものはどれですか?",
    options: [
      "俊敏性の向上",
      "データセンターの運用と保守",
      "数分で世界中にデプロイ",
      "スケールによるコスト削減"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWSクラウドの6つの利点は、①固定費を変動費に、②スケールによるコスト削減、③キャパシティ予測が不要、④速度と俊敏性の向上、⑤データセンターの運用と保守への投資が不要、⑥数分で世界中にデプロイ、です。データセンターの運用と保守は不要になることが利点です。",
    optionExplanations: [
      "俊敏性の向上: AWSクラウドの利点の1つです。新しいリソースを数分で利用でき、実験やイノベーションが容易になります。",
      "データセンターの運用と保守: ✓ 正解。これは「不要になる」ことが利点であり、利点そのものではありません。AWSがインフラを管理するため、顧客はデータセンターの運用と保守に投資する必要がなくなります。",
      "数分で世界中にデプロイ: AWSクラウドの利点の1つです。グローバルインフラを活用して、世界中の複数のリージョンに迅速にアプリケーションをデプロイできます。",
      "スケールによるコスト削減: AWSクラウドの利点の1つです。数十万の顧客の使用量が集約されることで、従量課金制の料金が低くなります。"
    ],
        references: [
      { url: "https://docs.aws.amazon.com/ja_jp/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html", title: "クラウドコンピューティングの 6 つの利点" }
    ]
  },
  {
    id: 2,
    question: "AWS Well-Architected Frameworkの5つの柱に含まれないものはどれですか?",
    options: [
      "運用上の優秀性",
      "セキュリティ",
      "コスト削減",
      "パフォーマンス効率"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "AWS Well-Architected Frameworkの5つの柱は、①運用上の優秀性、②セキュリティ、③信頼性、④パフォーマンス効率、⑤コスト最適化です。「コスト削減」ではなく「コスト最適化」が正しい表現です。",
    optionExplanations: [
      "運用上の優秀性: Well-Architected Frameworkの5つの柱の1つです。システムの実行と監視、プロセスと手順の継続的な改善に焦点を当てています。",
      "セキュリティ: Well-Architected Frameworkの5つの柱の1つです。データ保護、システム保護、特権管理などのセキュリティのベストプラクティスに焦点を当てています。",
      "コスト削減: ✓ 正解。正しくは「コスト最適化」です。単なるコスト削減ではなく、ビジネス価値を最大化しながら最小のコストでシステムを実行することを目指します。",
      "パフォーマンス効率: Well-Architected Frameworkの5つの柱の1つです。コンピューティングリソースを効率的に使用し、需要の変化やテクノロジーの進化に対応することに焦点を当てています。"
    ],
        references: [
      { url: "https://docs.aws.amazon.com/ja_jp/wellarchitected/latest/framework/welcome.html", title: "AWS Well-Architected Framework" }
    ]
  },
  {
    id: 3,
    question: "AWSの責任共有モデルにおいて、AWSが責任を持つのはどれですか?",
    options: [
      "顧客データの暗号化",
      "物理的なデータセンターのセキュリティ",
      "IAMユーザーの管理",
      "アプリケーションのセキュリティパッチ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "責任共有モデルでは、AWSは「クラウドのセキュリティ」（物理インフラ、ハードウェア、ネットワーク）に責任を持ち、顧客は「クラウド内のセキュリティ」（データ、アプリケーション、IAM）に責任を持ちます。",
    optionExplanations: [
      "顧客データの暗号化: 顧客の責任です。データの暗号化、アクセス制御、バックアップなど、データの保護は顧客が管理します。",
      "物理的なデータセンターのセキュリティ: ✓ 正解。AWSの責任です。データセンターの物理的なセキュリティ、ハードウェア、ネットワークインフラなど「クラウドのセキュリティ」はAWSが管理します。",
      "IAMユーザーの管理: 顧客の責任です。IAMユーザー、グループ、ロール、ポリシーの作成と管理は顧客が行います。",
      "アプリケーションのセキュリティパッチ: 顧客の責任です。EC2インスタンス上のOS、アプリケーションのパッチ適用は顧客が管理します（マネージドサービスの場合はAWSが管理）。"
    ],
        references: [
      { url: "https://aws.amazon.com/jp/compliance/shared-responsibility-model/", title: "責任共有モデル" }
    ]
  },
  {
    id: 4,
    question: "AWS無料利用枠で12ヶ月間無料で使用できるサービスはどれですか?",
    options: [
      "Amazon S3 (5GB)",
      "Amazon EC2 (t2.micro 750時間/月)",
      "Amazon RDS (750時間/月)",
      "上記すべて"
    ],
    correctAnswer: 3,
    category: "データベース",
    explanation: "AWS無料利用枠には、12ヶ月間無料のサービス（EC2 t2.micro、RDS、S3など）、常に無料のサービス（Lambda、DynamoDB）、短期間の無料トライアルがあります。",
        references: [
      { url: "https://aws.amazon.com/jp/free/", title: "AWS 無料利用枠" }
    ]
  },
  {
    id: 5,
    question: "AWSのサポートプランで、24時間365日の電話、チャット、メールサポートが含まれる最も安価なプランはどれですか?",
    options: [
      "Basic",
      "Developer",
      "Business",
      "Enterprise"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "Businessサポートプランから、24時間365日の電話、チャット、メールサポートが利用できます。Basicは無料ですがサポートが限定的、Developerは営業時間内のみです。",
    optionExplanations: [
      "Basic: 無料プランで、ドキュメント、ホワイトペーパー、サポートフォーラムへのアクセスが可能ですが、技術サポートは含まれません。",
      "Developer: 営業時間内（現地時間）のメールサポートのみで、電話サポートはありません。開発・テスト環境向けです。",
      "Business: ✓ 正解。24時間365日の電話、チャット、メールサポートが利用でき、本番環境のワークロードに適しています。最も安価な24/7サポートプランです。",
      "Enterprise: 24時間365日のサポートに加え、専任のTechnical Account Manager（TAM）が付きます。Businessより高額ですが、ミッションクリティカルなワークロード向けです。"
    ],
        references: [
      { url: "https://aws.amazon.com/jp/premiumsupport/plans/", title: "AWS サポートプラン" }
    ]
  },
  {
    id: 6,
    question: "AWS Organizationsの主な利点はどれですか?",
    options: [
      "複数のAWSアカウントを一元管理",
      "EC2インスタンスの自動スケーリング",
      "データベースのバックアップ",
      "ネットワークトラフィックの監視"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "AWS Organizationsは、複数のAWSアカウントを一元的に管理し、請求の統合、ポリシーベースの管理、アカウント作成の自動化などを提供します。",
    optionExplanations: [
      "複数のAWSアカウントを一元管理: ✓ 正解。AWS Organizationsの主な機能です。複数アカウントの階層的な管理、一括請求、Service Control Policies（SCP）によるガバナンスを提供します。",
      "EC2インスタンスの自動スケーリング: Auto Scalingの機能です。AWS Organizationsはアカウント管理サービスで、リソースのスケーリングは行いません。",
      "データベースのバックアップ: RDSやDynamoDBなどのデータベースサービスの機能です。AWS Organizationsはバックアップ機能を提供しません。",
      "ネットワークトラフィックの監視: VPC Flow LogsやCloudWatchの機能です。AWS Organizationsはネットワーク監視サービスではありません。"
    ],
        references: [
      { url: "https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_introduction.html", title: "AWS Organizations とは" }
    ]
  },
  {
    id: 7,
    question: "Amazon CloudWatchの主な用途は何ですか?",
    options: [
      "コスト管理",
      "リソースの監視とログ管理",
      "データベースのバックアップ",
      "ユーザー認証"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "CloudWatchは、AWSリソースとアプリケーションの監視サービスで、メトリクスの収集、ログの管理、アラームの設定などができます。",
    optionExplanations: [
      "コスト管理: これはAWS Cost ExplorerやBudgetsの機能です。CloudWatchは監視サービスです。",
      "リソースの監視とログ管理: ✓ 正解。CloudWatchは、EC2、RDS、Lambdaなどのメトリクスを収集し、ログを一元管理し、アラームを設定できる総合監視サービスです。",
      "データベースのバックアップ: これはRDSやDynamoDBの機能です。CloudWatchは監視とログ管理に特化しています。",
      "ユーザー認証: これはIAMやCognitoの機能です。CloudWatchはリソース監視サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html", title: "Amazon CloudWatch とは" }
    ]
  },
  {
    id: 8,
    question: "AWS Trusted Advisorが提供する推奨事項のカテゴリに含まれないものはどれですか?",
    options: [
      "コスト最適化",
      "セキュリティ",
      "データ移行",
      "耐障害性"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "Trusted Advisorは、①コスト最適化、②パフォーマンス、③セキュリティ、④耐障害性、⑤サービス制限の5つのカテゴリで推奨事項を提供します。",
    optionExplanations: [
      "コスト最適化: Trusted Advisorの5つのカテゴリの1つです。未使用のリソースや最適化の機会を特定します。",
      "セキュリティ: Trusted Advisorの5つのカテゴリの1つです。セキュリティギャップを特定し、推奨事項を提供します。",
      "データ移行: ✓ 正解。これはTrusted Advisorのカテゴリには含まれません。データ移行はAWS Database Migration ServiceやSnowfamilyなどの別サービスで対応します。",
      "耐障害性: Trusted Advisorの5つのカテゴリの1つです。システムの可用性と冗長性を向上させる推奨事項を提供します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/awssupport/latest/user/trusted-advisor.html", title: "AWS Trusted Advisor" }
    ]
  },
  {
    id: 9,
    question: "Amazon S3のストレージクラスで、最も低コストなのはどれですか?",
    options: [
      "S3 Standard",
      "S3 Intelligent-Tiering",
      "S3 Glacier Deep Archive",
      "S3 One Zone-IA"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "S3 Glacier Deep Archiveは、長期アーカイブ用の最も低コストなストレージクラスです。データの取り出しには12時間以上かかる場合があります。",
        references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/storage-class-intro.html", title: "Amazon S3 ストレージクラス" }
    ]
  },
  {
    id: 10,
    question: "AWS Cost Explorerの主な機能は何ですか?",
    options: [
      "リソースの監視",
      "コストと使用状況の可視化と分析",
      "セキュリティの脆弱性スキャン",
      "データベースのパフォーマンス最適化"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Cost Explorerは、AWSの支出とコストを可視化し、分析するためのツールです。過去のコストを確認し、将来のコストを予測できます。",
        references: [
      { url: "https://docs.aws.amazon.com/ja_jp/cost-management/latest/userguide/ce-what-is.html", title: "AWS Cost Explorer とは" }
    ]
  },
  {
    id: 11,
    question: "Amazon EC2のインスタンスタイプで、汎用的なワークロードに最適なのはどれですか?",
    options: [
      "T3/T4g (バースト可能)",
      "C6i (コンピューティング最適化)",
      "R6i (メモリ最適化)",
      "P4 (アクセラレーテッドコンピューティング)"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "T3/T4gインスタンスは、バースト可能なパフォーマンスを提供し、Webサーバー、開発環境、小規模データベースなど、汎用的なワークロードに適しています。",
    optionExplanations: [
      "T3/T4g (バースト可能): ✓ 正解。バランスの取れたコンピューティング、メモリ、ネットワークリソースを提供し、汎用的なワークロードに最適です。コスト効率も高いです。",
      "C6i (コンピューティング最適化): 高いコンピューティング性能が必要なワークロード（バッチ処理、科学計算など）に最適化されています。",
      "R6i (メモリ最適化): 大量のメモリが必要なワークロード（インメモリデータベース、ビッグデータ処理など）に最適化されています。",
      "P4 (アクセラレーテッドコンピューティング): GPU搭載で、機械学習、HPC、グラフィックス処理などの特殊なワークロードに最適化されています。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/instance-types.html", title: "Amazon EC2 インスタンスタイプ" }
    ]
  },
  {
    id: 12,
    question: "Amazon RDSで自動的に実行される管理タスクはどれですか?",
    options: [
      "データベーススキーマの設計",
      "ソフトウェアパッチの適用",
      "SQLクエリの最適化",
      "アプリケーションコードのデバッグ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon RDSは、ソフトウェアパッチの適用、バックアップ、障害検出、リカバリなどの管理タスクを自動化します。",
    optionExplanations: [
      "データベーススキーマの設計: 顧客の責任です。テーブル構造、インデックス、リレーションシップなどの設計は顧客が行います。",
      "ソフトウェアパッチの適用: ✓ 正解。RDSはデータベースエンジンのパッチを自動的に適用します。メンテナンスウィンドウで実行されます。",
      "SQLクエリの最適化: 顧客の責任です。クエリのパフォーマンスチューニングはアプリケーション開発者が行います。",
      "アプリケーションコードのデバッグ: 顧客の責任です。RDSはデータベース管理サービスで、アプリケーションコードは管理しません。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/Welcome.html", title: "Amazon RDS とは" }
    ]
  },
  {
    id: 13,
    question: "AWS Lambdaの課金方法はどれですか?",
    options: [
      "インスタンスの実行時間",
      "リクエスト数と実行時間",
      "ストレージ容量",
      "データ転送量のみ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Lambdaは、リクエスト数と実行時間（GB-秒）に基づいて課金されます。コードが実行されていない時間は課金されません。",
    optionExplanations: [
      "インスタンスの実行時間: EC2の課金モデルです。Lambdaはサーバーレスで、インスタンスの概念がありません。",
      "リクエスト数と実行時間: ✓ 正解。Lambdaは、関数が呼び出された回数と、実行時間（ミリ秒単位、メモリ割り当てに応じて計算）で課金されます。",
      "ストレージ容量: S3やEBSの課金モデルです。Lambdaのコードストレージは無料です（一定の制限内）。",
      "データ転送量のみ: データ転送料金は別途かかりますが、これだけではありません。リクエスト数と実行時間が主な課金要素です。"
    ],
    references: [
      { url: "https://aws.amazon.com/jp/lambda/pricing/", title: "AWS Lambda 料金" }
    ]
  },
  {
    id: 14,
    question: "Amazon VPCで、インターネットからプライベートサブネット内のインスタンスへのアクセスを可能にするサービスはどれですか?",
    options: [
      "Internet Gateway",
      "NAT Gateway",
      "Bastion Host",
      "VPC Peering"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "Bastion Host（踏み台サーバー）は、パブリックサブネットに配置され、プライベートサブネット内のインスタンスへの安全なアクセスを提供します。",
    optionExplanations: [
      "Internet Gateway: VPCとインターネット間の通信を可能にしますが、プライベートサブネットへの直接アクセスは提供しません。",
      "NAT Gateway: プライベートサブネットからインターネットへの「アウトバウンド」通信を可能にしますが、インターネットからの「インバウンド」アクセスは許可しません。",
      "Bastion Host: ✓ 正解。パブリックサブネットに配置された踏み台サーバーで、SSH/RDP経由でプライベートサブネット内のインスタンスに安全にアクセスできます。",
      "VPC Peering: 2つのVPC間のプライベート通信を可能にしますが、インターネットからのアクセスには使用しません。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/what-is-amazon-vpc.html", title: "Amazon VPC とは" }
    ]
  },
  {
    id: 15,
    question: "AWS IAMのベストプラクティスに含まれないものはどれですか?",
    options: [
      "ルートユーザーの日常的な使用",
      "多要素認証(MFA)の有効化",
      "最小権限の原則の適用",
      "IAMロールの使用"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "ルートユーザーは最も強力な権限を持つため、日常的な使用は避け、初期設定やアカウント管理のみに使用すべきです。",
    optionExplanations: [
      "ルートユーザーの日常的な使用: ✓ 正解。これはベストプラクティスに「反します」。ルートユーザーは初期設定時のみ使用し、日常業務にはIAMユーザーを使用すべきです。",
      "多要素認証(MFA)の有効化: IAMのベストプラクティスです。特にルートユーザーと特権ユーザーにはMFAを必ず有効化すべきです。",
      "最小権限の原則の適用: IAMのベストプラクティスです。ユーザーには必要最小限の権限のみを付与します。",
      "IAMロールの使用: IAMのベストプラクティスです。EC2インスタンスやLambda関数には、アクセスキーではなくIAMロールを使用します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/best-practices.html", title: "IAM のベストプラクティス" }
    ]
  },
  {
    id: 16,
    question: "Amazon S3のデータ保護機能に含まれないものはどれですか?",
    options: [
      "バージョニング",
      "クロスリージョンレプリケーション",
      "自動的なデータ圧縮",
      "オブジェクトロック"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "S3は、バージョニング、レプリケーション、オブジェクトロックなどのデータ保護機能を提供しますが、自動的なデータ圧縮機能はありません。",
    optionExplanations: [
      "バージョニング: S3のデータ保護機能です。オブジェクトの複数バージョンを保持し、誤削除や上書きから保護します。",
      "クロスリージョンレプリケーション: S3のデータ保護機能です。別のリージョンにデータを自動的にレプリケートし、災害対策を強化します。",
      "自動的なデータ圧縮: ✓ 正解。S3は自動的なデータ圧縮機能を提供しません。圧縮が必要な場合は、アップロード前にクライアント側で行います。",
      "オブジェクトロック: S3のデータ保護機能です。WORM（Write Once Read Many）モデルでオブジェクトを保護し、削除や変更を防ぎます。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/Welcome.html", title: "Amazon S3 とは" }
    ]
  },
  {
    id: 17,
    question: "AWS CloudFormationの主な利点はどれですか?",
    options: [
      "インフラストラクチャのコード化",
      "データベースのバックアップ",
      "ネットワークトラフィックの監視",
      "コスト削減の自動化"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "CloudFormationは、Infrastructure as Code (IaC)を実現し、AWSリソースをテンプレートで定義・管理できます。",
    optionExplanations: [
      "インフラストラクチャのコード化: ✓ 正解。CloudFormationは、JSON/YAMLテンプレートでインフラを定義し、バージョン管理、再利用、自動化を可能にします。",
      "データベースのバックアップ: RDSやDynamoDBの機能です。CloudFormationはインフラのプロビジョニングサービスです。",
      "ネットワークトラフィックの監視: VPC Flow LogsやCloudWatchの機能です。CloudFormationは監視サービスではありません。",
      "コスト削減の自動化: Cost ExplorerやBudgetsの機能です。CloudFormationはコスト管理ツールではありません（ただし、効率的なリソース管理でコスト削減に貢献できます）。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/Welcome.html", title: "AWS CloudFormation とは" }
    ]
  },
  {
    id: 18,
    question: "Amazon CloudFrontの主な用途は何ですか?",
    options: [
      "データベースのレプリケーション",
      "コンテンツ配信の高速化",
      "サーバーのバックアップ",
      "ユーザー認証"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "CloudFrontは、グローバルなエッジロケーションを使用してコンテンツを配信するCDN（Content Delivery Network）サービスです。",
    optionExplanations: [
      "データベースのレプリケーション: RDSやDynamoDB Global Tablesの機能です。CloudFrontはCDNサービスです。",
      "コンテンツ配信の高速化: ✓ 正解。CloudFrontは、世界中のエッジロケーションにコンテンツをキャッシュし、ユーザーに低レイテンシーで配信します。",
      "サーバーのバックアップ: AWS BackupやEBS Snapshotsの機能です。CloudFrontはバックアップサービスではありません。",
      "ユーザー認証: IAMやCognitoの機能です。CloudFrontはコンテンツ配信に特化しています。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/Introduction.html", title: "Amazon CloudFront とは" }
    ]
  },
  {
    id: 19,
    question: "AWS Elastic Beanstalkの主な利点はどれですか?",
    options: [
      "アプリケーションのデプロイと管理の簡素化",
      "データベースのパフォーマンス最適化",
      "ネットワークセキュリティの強化",
      "コストの自動削減"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "Elastic Beanstalkは、アプリケーションのデプロイ、スケーリング、監視を自動化し、インフラ管理の複雑さを軽減します。",
    optionExplanations: [
      "アプリケーションのデプロイと管理の簡素化: ✓ 正解。Elastic Beanstalkは、コードをアップロードするだけで、キャパシティプロビジョニング、ロードバランシング、自動スケーリング、ヘルスモニタリングを自動的に処理します。",
      "データベースのパフォーマンス最適化: RDS Performance InsightsやDynamoDB Acceleratorの機能です。Elastic Beanstalkはアプリケーションデプロイサービスです。",
      "ネットワークセキュリティの強化: Security GroupsやNetwork ACLsの機能です。Elastic Beanstalkはデプロイの簡素化に焦点を当てています。",
      "コストの自動削減: Cost ExplorerやSavings Plansの機能です。Elastic Beanstalkは運用の簡素化を提供します（結果的にコスト削減に貢献できます）。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/elasticbeanstalk/latest/dg/Welcome.html", title: "AWS Elastic Beanstalk とは" }
    ]
  },
  {
    id: 20,
    question: "Amazon DynamoDBの主な特徴はどれですか?",
    options: [
      "リレーショナルデータベース",
      "NoSQLデータベース",
      "データウェアハウス",
      "インメモリキャッシュ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "DynamoDBは、フルマネージドなNoSQLデータベースサービスで、高速で予測可能なパフォーマンスとシームレスなスケーラビリティを提供します。",
    optionExplanations: [
      "リレーショナルデータベース: RDSやAuroraの特徴です。DynamoDBはNoSQLデータベースです。",
      "NoSQLデータベース: ✓ 正解。DynamoDBは、キー・バリュー型とドキュメント型のデータモデルをサポートするNoSQLデータベースで、ミリ秒単位のレイテンシーを実現します。",
      "データウェアハウス: Amazon Redshiftの特徴です。DynamoDBはトランザクション処理に最適化されています。",
      "インメモリキャッシュ: ElastiCacheの特徴です。DynamoDBは永続的なデータストアです（DAXでキャッシュ機能を追加可能）。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/Introduction.html", title: "Amazon DynamoDB とは" }
    ]
  },
  {
    id: 21,
    question: "AWS Shieldが提供する保護はどれですか?",
    options: [
      "データベースの暗号化",
      "DDoS攻撃からの保護",
      "ウイルススキャン",
      "データバックアップ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Shieldは、DDoS（分散型サービス拒否）攻撃からAWSで実行されるアプリケーションを保護するマネージドサービスです。",
    optionExplanations: [
      "データベースの暗号化: RDSやDynamoDBの暗号化機能です。Shieldはネットワーク層の保護サービスです。",
      "DDoS攻撃からの保護: ✓ 正解。AWS Shieldは、DDoS攻撃を検出し、自動的に緩和します。StandardとAdvancedの2つのティアがあります。",
      "ウイルススキャン: サードパーティのセキュリティソフトウェアの機能です。ShieldはDDoS保護に特化しています。",
      "データバックアップ: AWS BackupやEBS Snapshotsの機能です。Shieldはネットワーク攻撃からの保護を提供します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/waf/latest/developerguide/shield-chapter.html", title: "AWS Shield" }
    ]
  },
  {
    id: 22,
    question: "Amazon Route 53の主な機能はどれですか?",
    options: [
      "コンテンツ配信",
      "DNSサービス",
      "ロードバランシング",
      "データベース管理"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Route 53は、可用性と拡張性に優れたDNS（Domain Name System）Webサービスで、ドメイン名をIPアドレスに変換します。",
    optionExplanations: [
      "コンテンツ配信: CloudFrontの機能です。Route 53はDNSサービスです。",
      "DNSサービス: ✓ 正解。Route 53は、ドメイン登録、DNSルーティング、ヘルスチェックを提供する高可用性DNSサービスです。",
      "ロードバランシング: ELB（Elastic Load Balancing）の機能です。Route 53はDNSレベルでのトラフィック管理を提供します。",
      "データベース管理: RDSやDynamoDBの機能です。Route 53はDNSサービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/Route53/latest/DeveloperGuide/Welcome.html", title: "Amazon Route 53 とは" }
    ]
  },
  {
    id: 23,
    question: "AWS Systems Managerの主な用途は何ですか?",
    options: [
      "データベースのバックアップ",
      "EC2インスタンスの運用管理",
      "コスト分析",
      "ネットワーク設計"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Systems Managerは、AWSリソースの可視化と制御を提供し、パッチ適用、設定管理、自動化などの運用タスクを簡素化します。",
    optionExplanations: [
      "データベースのバックアップ: RDSやAWS Backupの機能です。Systems Managerは運用管理ツールです。",
      "EC2インスタンスの運用管理: ✓ 正解。Systems Managerは、パッチ管理、設定管理、リモートコマンド実行、パラメータストアなど、EC2やオンプレミスサーバーの運用を統合管理します。",
      "コスト分析: Cost ExplorerやBudgetsの機能です。Systems Managerは運用管理に焦点を当てています。",
      "ネットワーク設計: VPCやTransit Gatewayの機能です。Systems Managerはリソース管理ツールです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/what-is-systems-manager.html", title: "AWS Systems Manager とは" }
    ]
  },
  {
    id: 24,
    question: "Amazon EBSのスナップショットはどこに保存されますか?",
    options: [
      "EC2インスタンスのローカルストレージ",
      "Amazon S3",
      "Amazon Glacier",
      "Amazon EFS"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "EBSスナップショットは、自動的にAmazon S3に保存され、高い耐久性とリージョン内での冗長性が確保されます。",
    optionExplanations: [
      "EC2インスタンスのローカルストレージ: インスタンスストアは一時的なストレージです。スナップショットは永続的なS3に保存されます。",
      "Amazon S3: ✓ 正解。EBSスナップショットはS3に自動的に保存され、99.999999999%（イレブンナイン）の耐久性を持ちます。ユーザーはS3バケットを直接管理する必要はありません。",
      "Amazon Glacier: 長期アーカイブストレージです。スナップショットはS3に保存されます（ライフサイクルポリシーでGlacierに移行可能）。",
      "Amazon EFS: ファイルストレージサービスです。EBSスナップショットはS3に保存されます。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/EBSSnapshots.html", title: "Amazon EBS スナップショット" }
    ]
  },
  {
    id: 25,
    question: "AWS Key Management Service (KMS)の主な用途は何ですか?",
    options: [
      "ユーザー認証",
      "暗号化キーの管理",
      "ネットワークトラフィックの監視",
      "コスト最適化"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS KMSは、暗号化キーの作成と管理を簡素化し、AWSサービスやアプリケーションでのデータ暗号化を制御します。",
    optionExplanations: [
      "ユーザー認証: IAMやCognitoの機能です。KMSは暗号化キー管理サービスです。",
      "暗号化キーの管理: ✓ 正解。KMSは、暗号化キーの作成、ローテーション、無効化、削除を管理し、キーの使用状況を監査できます。FIPS 140-2検証済みのハードウェアセキュリティモジュール（HSM）を使用します。",
      "ネットワークトラフィックの監視: VPC Flow LogsやCloudWatchの機能です。KMSは暗号化に特化しています。",
      "コスト最適化: Cost ExplorerやTrusted Advisorの機能です。KMSはセキュリティサービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/kms/latest/developerguide/overview.html", title: "AWS Key Management Service とは" }
    ]
  },
  {
    id: 26,
    question: "Amazon SNS (Simple Notification Service)の主な用途は何ですか?",
    options: [
      "データベースのレプリケーション",
      "メッセージの配信",
      "ファイルストレージ",
      "コンピューティングリソースの管理"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon SNSは、pub/sub（パブリッシュ/サブスクライブ）メッセージングサービスで、アプリケーション間やアプリケーションとユーザー間の通信を可能にします。",
    optionExplanations: [
      "データベースのレプリケーション: RDSやDynamoDB Global Tablesの機能です。SNSはメッセージングサービスです。",
      "メッセージの配信: ✓ 正解。SNSは、トピックにメッセージをパブリッシュし、複数のサブスクライバー（Lambda、SQS、HTTP、Email、SMSなど）に配信します。",
      "ファイルストレージ: S3やEFSの機能です。SNSはメッセージ配信に特化しています。",
      "コンピューティングリソースの管理: EC2やAuto Scalingの機能です。SNSは通知サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sns/latest/dg/welcome.html", title: "Amazon SNS とは" }
    ]
  },
  {
    id: 27,
    question: "Amazon SQS (Simple Queue Service)の主な特徴はどれですか?",
    options: [
      "リアルタイムストリーミング",
      "メッセージキューイング",
      "データウェアハウス",
      "コンテンツ配信"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon SQSは、フルマネージドなメッセージキューイングサービスで、分散システムのコンポーネント間でメッセージを送受信できます。",
    optionExplanations: [
      "リアルタイムストリーミング: Amazon Kinesisの機能です。SQSはメッセージキューイングサービスです。",
      "メッセージキューイング: ✓ 正解。SQSは、メッセージを一時的に保存し、非同期処理を可能にします。StandardキューとFIFOキューの2種類があります。",
      "データウェアハウス: Amazon Redshiftの機能です。SQSはメッセージングサービスです。",
      "コンテンツ配信: CloudFrontの機能です。SQSはアプリケーション間通信に使用されます。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html", title: "Amazon SQS とは" }
    ]
  },
  {
    id: 28,
    question: "AWS Direct Connectの主な利点はどれですか?",
    options: [
      "インターネット経由の暗号化通信",
      "専用ネットワーク接続による安定した通信",
      "サーバーレスアーキテクチャ",
      "自動スケーリング"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Direct Connectは、オンプレミス環境とAWS間に専用のネットワーク接続を確立し、より一貫したネットワークパフォーマンスを提供します。",
    optionExplanations: [
      "インターネット経由の暗号化通信: VPNの特徴です。Direct Connectは専用線接続を提供します。",
      "専用ネットワーク接続による安定した通信: ✓ 正解。Direct Connectは、インターネットを経由せず、専用の物理接続でAWSに接続するため、帯域幅の安定性、低レイテンシー、セキュリティの向上が期待できます。",
      "サーバーレスアーキテクチャ: LambdaやFargateの特徴です。Direct Connectはネットワーク接続サービスです。",
      "自動スケーリング: Auto ScalingやLambdaの特徴です。Direct Connectは固定帯域幅の専用接続を提供します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/directconnect/latest/UserGuide/Welcome.html", title: "AWS Direct Connect とは" }
    ]
  },
  {
    id: 29,
    question: "Amazon ElastiCacheがサポートするキャッシュエンジンはどれですか?",
    options: [
      "MySQLとPostgreSQL",
      "RedisとMemcached",
      "MongoDBとCassandra",
      "OracleとSQL Server"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon ElastiCacheは、RedisとMemcachedの2つのオープンソースインメモリキャッシュエンジンをサポートしています。",
    optionExplanations: [
      "MySQLとPostgreSQL: RDSでサポートされるリレーショナルデータベースエンジンです。ElastiCacheはキャッシュエンジンです。",
      "RedisとMemcached: ✓ 正解。ElastiCacheは、RedisとMemcachedをフルマネージドサービスとして提供し、データベースやアプリケーションのパフォーマンスを向上させます。",
      "MongoDBとCassandra: NoSQLデータベースです。ElastiCacheはインメモリキャッシュに特化しています。",
      "OracleとSQL Server: RDSでサポートされる商用データベースエンジンです。ElastiCacheはキャッシュサービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/red-ug/WhatIs.html", title: "Amazon ElastiCache とは" }
    ]
  },
  {
    id: 30,
    question: "AWS Configの主な用途は何ですか?",
    options: [
      "コスト管理",
      "リソース設定の記録と評価",
      "データベースのバックアップ",
      "ネットワークトラフィックの監視"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Configは、AWSリソースの設定を継続的に記録し、コンプライアンスルールに対して評価するサービスです。",
    optionExplanations: [
      "コスト管理: Cost ExplorerやBudgetsの機能です。Configは設定管理サービスです。",
      "リソース設定の記録と評価: ✓ 正解。AWS Configは、リソースの設定変更を記録し、設定履歴を追跡し、コンプライアンスルールに対して自動的に評価します。",
      "データベースのバックアップ: RDSやAWS Backupの機能です。Configは設定の監査とコンプライアンスに焦点を当てています。",
      "ネットワークトラフィックの監視: VPC Flow LogsやCloudWatchの機能です。Configはリソース設定の変更追跡を行います。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/config/latest/developerguide/WhatIsConfig.html", title: "AWS Config とは" }
    ]
  },
  {
    id: 31,
    question: "Amazon Redshiftの主な用途は何ですか?",
    options: [
      "NoSQLデータベース",
      "データウェアハウス",
      "インメモリキャッシュ",
      "オブジェクトストレージ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon Redshiftは、ペタバイト規模のデータウェアハウスサービスで、大規模なデータ分析に最適化されています。",
    optionExplanations: [
      "NoSQLデータベース: DynamoDBやDocumentDBの特徴です。Redshiftはリレーショナルデータウェアハウスです。",
      "データウェアハウス: ✓ 正解。Redshiftは、列指向ストレージと並列処理を使用して、大規模なデータセットに対する複雑なクエリを高速に実行します。",
      "インメモリキャッシュ: ElastiCacheの特徴です。Redshiftは分析用データウェアハウスです。",
      "オブジェクトストレージ: S3の特徴です。Redshiftは構造化データの分析に特化しています。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/redshift/latest/mgmt/welcome.html", title: "Amazon Redshift とは" }
    ]
  },
  {
    id: 32,
    question: "AWS Artifactの主な用途は何ですか?",
    options: [
      "コンプライアンスレポートへのアクセス",
      "アプリケーションのデプロイ",
      "データベースの管理",
      "ネットワークの監視"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "AWS Artifactは、AWSのセキュリティおよびコンプライアンスレポート、および特定のオンライン契約へのオンデマンドアクセスを提供します。",
    optionExplanations: [
      "コンプライアンスレポートへのアクセス: ✓ 正解。AWS Artifactは、SOC、PCI、ISO認証などのコンプライアンスレポートをダウンロードでき、監査や規制要件への対応を支援します。",
      "アプリケーションのデプロイ: Elastic BeanstalkやCodeDeployの機能です。Artifactはコンプライアンス文書の提供サービスです。",
      "データベースの管理: RDSやDynamoDBの機能です。Artifactは監査レポートへのアクセスを提供します。",
      "ネットワークの監視: CloudWatchやVPC Flow Logsの機能です。Artifactはコンプライアンス文書サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/artifact/latest/ug/what-is-aws-artifact.html", title: "AWS Artifact とは" }
    ]
  },
  {
    id: 33,
    question: "Amazon Athenaの主な特徴はどれですか?",
    options: [
      "NoSQLデータベース",
      "S3データに対するサーバーレスクエリサービス",
      "リアルタイムストリーミング",
      "データウェアハウス"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon Athenaは、標準SQLを使用してAmazon S3内のデータを直接分析できるサーバーレスのインタラクティブクエリサービスです。",
    optionExplanations: [
      "NoSQLデータベース: DynamoDBの特徴です。AthenaはS3データに対するSQLクエリサービスです。",
      "S3データに対するサーバーレスクエリサービス: ✓ 正解。Athenaは、インフラの管理不要で、S3に保存されたデータに対して標準SQLクエリを実行できます。使用したクエリに対してのみ課金されます。",
      "リアルタイムストリーミング: Kinesisの特徴です。Athenaはバッチクエリに適しています。",
      "データウェアハウス: Redshiftの特徴です。AthenaはS3上のデータを直接クエリします。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/athena/latest/ug/what-is.html", title: "Amazon Athena とは" }
    ]
  },
  {
    id: 34,
    question: "AWS Budgetsの主な機能は何ですか?",
    options: [
      "リソースの監視",
      "コスト予算の設定とアラート",
      "データベースのバックアップ",
      "ネットワークトラフィックの分析"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Budgetsは、カスタムコスト予算と使用量予算を設定し、予算を超えた場合にアラートを受け取ることができます。",
    optionExplanations: [
      "リソースの監視: CloudWatchの機能です。Budgetsはコスト管理に特化しています。",
      "コスト予算の設定とアラート: ✓ 正解。Budgetsは、月次、四半期、年次の予算を設定し、実際のコストや予測コストが予算を超えた場合にSNS経由でアラートを送信します。",
      "データベースのバックアップ: RDSやAWS Backupの機能です。Budgetsは予算管理ツールです。",
      "ネットワークトラフィックの分析: VPC Flow LogsやCloudWatchの機能です。Budgetsはコスト管理サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/cost-management/latest/userguide/budgets-managing-costs.html", title: "AWS Budgets" }
    ]
  },
  {
    id: 35,
    question: "Amazon Cognitoの主な用途は何ですか?",
    options: [
      "データベース管理",
      "ユーザー認証とアクセス制御",
      "コンテンツ配信",
      "ネットワーク監視"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon Cognitoは、Webおよびモバイルアプリケーションにユーザーサインアップ、サインイン、アクセス制御機能を追加できるサービスです。",
    optionExplanations: [
      "データベース管理: RDSやDynamoDBの機能です。Cognitoは認証サービスです。",
      "ユーザー認証とアクセス制御: ✓ 正解。Cognitoは、ユーザープール（認証）とIDプール（認可）を提供し、ソーシャルIDプロバイダー（Google、Facebookなど）との統合も可能です。",
      "コンテンツ配信: CloudFrontの機能です。Cognitoはユーザー管理サービスです。",
      "ネットワーク監視: CloudWatchやVPC Flow Logsの機能です。Cognitoは認証・認可サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/what-is-amazon-cognito.html", title: "Amazon Cognito とは" }
    ]
  },
  {
    id: 36,
    question: "AWS Global Acceleratorの主な利点はどれですか?",
    options: [
      "データベースのレプリケーション",
      "グローバルネットワークを使用したアプリケーションの可用性とパフォーマンス向上",
      "サーバーレスコンピューティング",
      "データのアーカイブ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Global Acceleratorは、AWSのグローバルネットワークを使用して、アプリケーションの可用性とパフォーマンスを向上させます。",
    optionExplanations: [
      "データベースのレプリケーション: RDSやDynamoDB Global Tablesの機能です。Global Acceleratorはネットワーク最適化サービスです。",
      "グローバルネットワークを使用したアプリケーションの可用性とパフォーマンス向上: ✓ 正解。Global Acceleratorは、静的なIPアドレスを提供し、AWSのグローバルネットワークを経由してトラフィックをルーティングし、レイテンシーを削減します。",
      "サーバーレスコンピューティング: Lambdaの特徴です。Global Acceleratorはネットワークサービスです。",
      "データのアーカイブ: S3 GlacierやS3 Glacier Deep Archiveの機能です。Global Acceleratorはトラフィック管理サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/global-accelerator/latest/dg/what-is-global-accelerator.html", title: "AWS Global Accelerator とは" }
    ]
  },
  {
    id: 37,
    question: "Amazon Kinesis Data Streamsの主な用途は何ですか?",
    options: [
      "バッチデータ処理",
      "リアルタイムデータストリーミング",
      "データウェアハウス",
      "オブジェクトストレージ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon Kinesis Data Streamsは、リアルタイムでストリーミングデータを収集、処理、分析するためのサービスです。",
    optionExplanations: [
      "バッチデータ処理: EMRやGlueの機能です。Kinesisはリアルタイムストリーミングに特化しています。",
      "リアルタイムデータストリーミング: ✓ 正解。Kinesis Data Streamsは、ログ、IoTデータ、クリックストリームなどのストリーミングデータをリアルタイムで取り込み、処理できます。",
      "データウェアハウス: Redshiftの機能です。Kinesisはストリーミングデータの処理に使用されます。",
      "オブジェクトストレージ: S3の機能です。Kinesisはリアルタイムデータストリームの処理サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/streams/latest/dev/introduction.html", title: "Amazon Kinesis Data Streams とは" }
    ]
  },
  {
    id: 38,
    question: "AWS Personal Health Dashboardの主な機能は何ですか?",
    options: [
      "コスト分析",
      "AWSサービスの健全性とイベントの通知",
      "データベースのパフォーマンス監視",
      "ネットワークトラフィックの分析"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Personal Health Dashboardは、AWSサービスのイベントや計画的なメンテナンスについて、パーソナライズされた情報とアラートを提供します。",
    optionExplanations: [
      "コスト分析: Cost ExplorerやBudgetsの機能です。Personal Health Dashboardはサービス健全性の通知サービスです。",
      "AWSサービスの健全性とイベントの通知: ✓ 正解。Personal Health Dashboardは、使用しているAWSリソースに影響を与える可能性のあるイベント（障害、メンテナンスなど）について、プロアクティブな通知を提供します。",
      "データベースのパフォーマンス監視: RDS Performance InsightsやCloudWatchの機能です。Personal Health Dashboardはサービスイベントの通知に特化しています。",
      "ネットワークトラフィックの分析: VPC Flow LogsやCloudWatchの機能です。Personal Health Dashboardはサービス健全性の可視化ツールです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/health/latest/ug/what-is-aws-health.html", title: "AWS Health とは" }
    ]
  },
  {
    id: 39,
    question: "Amazon EFSの主な特徴はどれですか?",
    options: [
      "ブロックストレージ",
      "オブジェクトストレージ",
      "ファイルストレージ",
      "データウェアハウス"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "Amazon EFS（Elastic File System）は、複数のEC2インスタンスから同時にアクセスできる、フルマネージドなファイルストレージサービスです。",
    optionExplanations: [
      "ブロックストレージ: EBSの特徴です。EFSはファイルシステムを提供します。",
      "オブジェクトストレージ: S3の特徴です。EFSはNFSプロトコルを使用するファイルストレージです。",
      "ファイルストレージ: ✓ 正解。EFSは、NFSv4プロトコルを使用し、複数のEC2インスタンスから同時にマウントできる共有ファイルシステムを提供します。自動的にスケールします。",
      "データウェアハウス: Redshiftの特徴です。EFSはファイル共有サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/efs/latest/ug/whatisefs.html", title: "Amazon EFS とは" }
    ]
  },
  {
    id: 40,
    question: "AWS Service Catalogの主な用途は何ですか?",
    options: [
      "コスト管理",
      "承認されたITサービスのカタログ管理",
      "データベースのバックアップ",
      "ネットワーク監視"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Service Catalogは、組織が承認したITサービスのカタログを作成および管理し、ガバナンスとコンプライアンスを維持しながらセルフサービスを実現します。",
    optionExplanations: [
      "コスト管理: Cost ExplorerやBudgetsの機能です。Service Catalogはサービスカタログ管理ツールです。",
      "承認されたITサービスのカタログ管理: ✓ 正解。Service Catalogは、CloudFormationテンプレートを製品として公開し、エンドユーザーが承認されたリソースのみをデプロイできるようにします。",
      "データベースのバックアップ: RDSやAWS Backupの機能です。Service Catalogはサービスプロビジョニングの管理ツールです。",
      "ネットワーク監視: CloudWatchやVPC Flow Logsの機能です。Service Catalogはガバナンスツールです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/servicecatalog/latest/adminguide/introduction.html", title: "AWS Service Catalog とは" }
    ]
  },
  {
    id: 41,
    question: "Amazon CloudFrontの主な用途は何ですか?",
    options: [
      "データベースのレプリケーション",
      "コンテンツ配信ネットワーク(CDN)",
      "サーバーレスコンピューティング",
      "ブロックストレージ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon CloudFrontは、AWSのグローバルなエッジロケーションネットワークを使用して、低レイテンシーでコンテンツを配信するCDNサービスです。",
    optionExplanations: [
      "データベースのレプリケーション: RDSやDynamoDB Global Tablesの機能です。CloudFrontはコンテンツ配信サービスです。",
      "コンテンツ配信ネットワーク(CDN): ✓ 正解。CloudFrontは、世界中のエッジロケーションを通じて、静的・動的コンテンツを高速に配信します。",
      "サーバーレスコンピューティング: AWS Lambdaの機能です。CloudFrontはコンテンツ配信に特化しています。",
      "ブロックストレージ: Amazon EBSの機能です。CloudFrontはコンテンツキャッシングと配信を行います。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/Introduction.html", title: "Amazon CloudFront とは" }
    ]
  },
  {
    id: 42,
    question: "AWS Organizationsの主な利点はどれですか?",
    options: [
      "複数のAWSアカウントを一元管理",
      "データベースのバックアップ自動化",
      "アプリケーションのデプロイ",
      "ネットワークトラフィックの監視"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "AWS Organizationsは、複数のAWSアカウントを組織単位で一元管理し、請求の統合、ポリシーの適用、リソースの共有を可能にします。",
    optionExplanations: [
      "複数のAWSアカウントを一元管理: ✓ 正解。Organizationsは、複数アカウントの階層的な管理、統合請求、Service Control Policies(SCP)によるガバナンスを提供します。",
      "データベースのバックアップ自動化: AWS BackupやRDSの機能です。Organizationsはアカウント管理ツールです。",
      "アプリケーションのデプロイ: CodeDeployやElastic Beanstalkの機能です。Organizationsはアカウント構造の管理に焦点を当てています。",
      "ネットワークトラフィックの監視: VPC Flow LogsやCloudWatchの機能です。Organizationsは組織レベルのガバナンスツールです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_introduction.html", title: "AWS Organizations とは" }
    ]
  },
  {
    id: 43,
    question: "Amazon Route 53の主な機能はどれですか?",
    options: [
      "コンテンツ配信",
      "DNSウェブサービス",
      "データベース管理",
      "ファイルストレージ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon Route 53は、可用性と拡張性に優れたDNSウェブサービスで、ドメイン名をIPアドレスに変換し、トラフィックルーティングを管理します。",
    optionExplanations: [
      "コンテンツ配信: CloudFrontの機能です。Route 53はDNSサービスですが、CloudFrontと連携できます。",
      "DNSウェブサービス: ✓ 正解。Route 53は、ドメイン登録、DNSルーティング、ヘルスチェック機能を提供し、高可用性のトラフィック管理を実現します。",
      "データベース管理: RDSやDynamoDBの機能です。Route 53はDNSとトラフィックルーティングに特化しています。",
      "ファイルストレージ: S3やEFSの機能です。Route 53はネットワークルーティングサービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/Route53/latest/DeveloperGuide/Welcome.html", title: "Amazon Route 53 とは" }
    ]
  },
  {
    id: 44,
    question: "AWS Trusted Advisorが提供する推奨事項のカテゴリに含まれないものはどれですか?",
    options: [
      "コスト最適化",
      "セキュリティ",
      "アプリケーション開発",
      "パフォーマンス"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "AWS Trusted Advisorは、コスト最適化、セキュリティ、耐障害性、パフォーマンス、サービス制限の5つのカテゴリで推奨事項を提供します。",
    optionExplanations: [
      "コスト最適化: Trusted Advisorの主要カテゴリの1つです。未使用リソースや最適化の機会を特定します。",
      "セキュリティ: Trusted Advisorの主要カテゴリの1つです。セキュリティギャップや設定の問題を検出します。",
      "アプリケーション開発: ✓ 正解。これはTrusted Advisorのカテゴリではありません。Trusted Advisorは、インフラストラクチャの最適化に焦点を当てています。",
      "パフォーマンス: Trusted Advisorの主要カテゴリの1つです。リソースのパフォーマンス改善の機会を提案します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/awssupport/latest/user/trusted-advisor.html", title: "AWS Trusted Advisor" }
    ]
  },
  {
    id: 45,
    question: "Amazon Glacierの主な用途は何ですか?",
    options: [
      "リアルタイムデータ処理",
      "長期アーカイブストレージ",
      "高速データベース",
      "コンテンツ配信"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon Glacier(現在はS3 Glacier)は、低コストで長期的なデータアーカイブとバックアップに最適化されたストレージサービスです。",
    optionExplanations: [
      "リアルタイムデータ処理: KinesisやLambdaの用途です。Glacierは低頻度アクセスのアーカイブ向けです。",
      "長期アーカイブストレージ: ✓ 正解。S3 Glacierは、めったにアクセスしないデータの長期保存に最適で、取り出しに数分から数時間かかりますが、非常に低コストです。",
      "高速データベース: DynamoDBやRDSの用途です。Glacierは即座のアクセスを必要としないデータ向けです。",
      "コンテンツ配信: CloudFrontの用途です。Glacierはアーカイブストレージに特化しています。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/amazonglacier/latest/dev/introduction.html", title: "Amazon S3 Glacier とは" }
    ]
  },
  {
    id: 46,
    question: "AWS CloudTrailの主な機能は何ですか?",
    options: [
      "コスト管理",
      "APIコールの記録と監査",
      "データベースのバックアップ",
      "負荷分散"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS CloudTrailは、AWSアカウント内のすべてのAPI呼び出しを記録し、ガバナンス、コンプライアンス、運用監査、リスク監査を支援します。",
    optionExplanations: [
      "コスト管理: Cost ExplorerやBudgetsの機能です。CloudTrailはアクティビティログサービスです。",
      "APIコールの記録と監査: ✓ 正解。CloudTrailは、誰が、いつ、どのAWSリソースに対して何を行ったかを記録し、セキュリティ分析やトラブルシューティングに使用できます。",
      "データベースのバックアップ: RDSやAWS Backupの機能です。CloudTrailはアクティビティの追跡に特化しています。",
      "負荷分散: ELBの機能です。CloudTrailは監査ログサービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/awscloudtrail/latest/userguide/cloudtrail-user-guide.html", title: "AWS CloudTrail とは" }
    ]
  },
  {
    id: 47,
    question: "Amazon VPCのサブネットで、インターネットからアクセス可能なリソースを配置すべきなのはどれですか?",
    options: [
      "プライベートサブネット",
      "パブリックサブネット",
      "データベースサブネット",
      "管理サブネット"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "パブリックサブネットは、インターネットゲートウェイへのルートを持ち、インターネットから直接アクセス可能なリソース(Webサーバーなど)を配置します。",
    optionExplanations: [
      "プライベートサブネット: インターネットゲートウェイへの直接ルートがなく、NATゲートウェイ経由でのみ外部通信が可能です。データベースやアプリケーションサーバーに適しています。",
      "パブリックサブネット: ✓ 正解。インターネットゲートウェイへのルートを持ち、パブリックIPアドレスを持つリソースがインターネットと直接通信できます。",
      "データベースサブネット: 一般的にプライベートサブネットに配置され、直接インターネットアクセスは避けるべきです。",
      "管理サブネット: セキュリティのため、通常はプライベートサブネットに配置し、VPNやDirect Connect経由でアクセスします。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/configure-subnets.html", title: "VPC のサブネット" }
    ]
  },
  {
    id: 48,
    question: "AWS Configの主な用途は何ですか?",
    options: [
      "アプリケーションのデプロイ",
      "リソース設定の記録と評価",
      "データベースの管理",
      "ネットワークの負荷分散"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Configは、AWSリソースの設定を継続的に記録・評価し、コンプライアンス監査、セキュリティ分析、変更管理を支援します。",
    optionExplanations: [
      "アプリケーションのデプロイ: CodeDeployやElastic Beanstalkの機能です。Configは設定管理ツールです。",
      "リソース設定の記録と評価: ✓ 正解。Configは、リソースの設定履歴を記録し、Config Rulesを使用して望ましい設定との適合性を評価します。",
      "データベースの管理: RDSやDynamoDBの機能です。Configはリソース設定の追跡に特化しています。",
      "ネットワークの負荷分散: ELBの機能です。Configはコンプライアンスと設定管理のサービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/config/latest/developerguide/WhatIsConfig.html", title: "AWS Config とは" }
    ]
  },
  {
    id: 49,
    question: "Amazon SNS(Simple Notification Service)の主な機能は何ですか?",
    options: [
      "データベースのレプリケーション",
      "Pub/Subメッセージング",
      "ファイルストレージ",
      "コンテンツ配信"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon SNSは、アプリケーション間(A2A)およびアプリケーションとユーザー間(A2P)の通信のための、フルマネージド型のPub/Subメッセージングサービスです。",
    optionExplanations: [
      "データベースのレプリケーション: RDSやDynamoDBの機能です。SNSはメッセージング配信サービスです。",
      "Pub/Subメッセージング: ✓ 正解。SNSは、トピックを通じて複数のサブスクライバー(Lambda、SQS、HTTP、Email、SMSなど)にメッセージを配信します。",
      "ファイルストレージ: S3やEFSの機能です。SNSは通知とメッセージ配信に特化しています。",
      "コンテンツ配信: CloudFrontの機能です。SNSはイベント駆動型の通知サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/sns/latest/dg/welcome.html", title: "Amazon SNS とは" }
    ]
  },
  {
    id: 50,
    question: "AWS Systems Managerの主な機能に含まれないものはどれですか?",
    options: [
      "パッチ管理",
      "パラメータストア",
      "データベースのクエリ最適化",
      "Run Command"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "AWS Systems Managerは、AWSリソースの運用管理を自動化するサービスで、パッチ管理、設定管理、コマンド実行などの機能を提供します。",
    optionExplanations: [
      "パッチ管理: Systems Managerの主要機能の1つです。Patch Managerを使用して、EC2インスタンスやオンプレミスサーバーのパッチ適用を自動化できます。",
      "パラメータストア: Systems Managerの主要機能の1つです。設定データや機密情報を安全に保存・管理できます。",
      "データベースのクエリ最適化: ✓ 正解。これはRDS Performance InsightsやDatabase Migration Serviceの機能です。Systems Managerはインフラストラクチャ管理に焦点を当てています。",
      "Run Command: Systems Managerの主要機能の1つです。複数のインスタンスに対してコマンドをリモート実行できます。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/what-is-systems-manager.html", title: "AWS Systems Manager とは" }
    ]
  },
  {
    id: 51,
    question: "AWS Direct Connectの主な利点は何ですか?",
    options: [
      "インターネット経由の暗号化通信",
      "専用ネットワーク接続による安定した帯域幅",
      "サーバーレスアプリケーションの実行",
      "データベースのバックアップ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Direct Connectは、オンプレミス環境とAWSを専用ネットワーク接続で結び、インターネットを経由せずに安定した帯域幅と低レイテンシーを実現します。",
    optionExplanations: [
      "インターネット経由の暗号化通信: VPNの特徴です。Direct Connectは専用線接続を提供します。",
      "専用ネットワーク接続による安定した帯域幅: ✓ 正解。Direct Connectは、データセンターとAWSを専用線で接続し、一貫したネットワークパフォーマンスとセキュリティを提供します。",
      "サーバーレスアプリケーションの実行: Lambdaの機能です。Direct Connectはネットワーク接続サービスです。",
      "データベースのバックアップ: AWS BackupやRDSの機能です。Direct Connectは専用ネットワーク接続を提供します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/directconnect/latest/UserGuide/Welcome.html", title: "AWS Direct Connect とは" }
    ]
  },
  {
    id: 52,
    question: "Amazon Kinesis Data Streamsの主な用途は何ですか?",
    options: [
      "静的ウェブサイトのホスティング",
      "リアルタイムストリーミングデータの処理",
      "長期データアーカイブ",
      "DNSルーティング"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon Kinesis Data Streamsは、リアルタイムでストリーミングデータを収集・処理するためのフルマネージドサービスです。",
    optionExplanations: [
      "静的ウェブサイトのホスティング: S3やAmplifyの機能です。Kinesisはストリーミングデータ処理に特化しています。",
      "リアルタイムストリーミングデータの処理: ✓ 正解。Kinesis Data Streamsは、ログ、IoTデータ、クリックストリームなどの大量のストリーミングデータをリアルタイムで取り込み、処理できます。",
      "長期データアーカイブ: S3 GlacierやS3 Glacier Deep Archiveの用途です。Kinesisはリアルタイム処理向けです。",
      "DNSルーティング: Route 53の機能です。Kinesisはデータストリーミングサービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/streams/latest/dev/introduction.html", title: "Amazon Kinesis Data Streams とは" }
    ]
  },
  {
    id: 53,
    question: "AWS Certificate Manager (ACM)の主な機能は何ですか?",
    options: [
      "データベースの暗号化",
      "SSL/TLS証明書の管理",
      "IAMユーザーの認証",
      "ファイルの圧縮"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Certificate Managerは、SSL/TLS証明書のプロビジョニング、管理、デプロイを簡素化するマネージドサービスです。",
    optionExplanations: [
      "データベースの暗号化: RDSやKMSの機能です。ACMは証明書管理に特化しています。",
      "SSL/TLS証明書の管理: ✓ 正解。ACMは、パブリックおよびプライベート証明書を無料で作成・管理し、ELB、CloudFront、API Gatewayなどと統合できます。",
      "IAMユーザーの認証: IAMやCognitoの機能です。ACMは証明書のライフサイクル管理を行います。",
      "ファイルの圧縮: アプリケーションレベルの機能です。ACMはSSL/TLS証明書サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/acm/latest/userguide/acm-overview.html", title: "AWS Certificate Manager とは" }
    ]
  },
  {
    id: 54,
    question: "Amazon SQS(Simple Queue Service)のメッセージ保持期間のデフォルト値はどれですか?",
    options: [
      "1時間",
      "4日間",
      "7日間",
      "14日間"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon SQSのメッセージ保持期間のデフォルトは4日間で、最小1分から最大14日間まで設定可能です。",
    optionExplanations: [
      "1時間: デフォルトより短い期間です。SQSは最小1分から設定できますが、デフォルトは4日間です。",
      "4日間: ✓ 正解。SQSのメッセージ保持期間のデフォルトは4日間(96時間)で、必要に応じて1分から14日間の範囲で調整できます。",
      "7日間: デフォルトより長い期間です。7日間に設定することは可能ですが、デフォルトではありません。",
      "14日間: 最大保持期間ですが、デフォルトではありません。長期保存が必要な場合に設定します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html", title: "Amazon SQS とは" }
    ]
  },
  {
    id: 55,
    question: "AWS Shieldが保護するのは主にどの種類の攻撃ですか?",
    options: [
      "SQLインジェクション",
      "DDoS攻撃",
      "クロスサイトスクリプティング",
      "パスワード総当たり攻撃"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Shieldは、DDoS(分散型サービス拒否)攻撃からAWSリソースを保護するマネージドサービスです。StandardとAdvancedの2つのティアがあります。",
    optionExplanations: [
      "SQLインジェクション: AWS WAFで保護できる攻撃です。Shieldは主にDDoS攻撃に対応します。",
      "DDoS攻撃: ✓ 正解。Shield Standardはすべての顧客に無料で提供され、Shield Advancedは高度なDDoS保護と24/7サポートを提供します。",
      "クロスサイトスクリプティング: AWS WAFで保護できる攻撃です。Shieldはネットワーク層の攻撃に焦点を当てています。",
      "パスワード総当たり攻撃: WAFやCognitoで対策できます。ShieldはDDoS攻撃の緩和に特化しています。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/waf/latest/developerguide/shield-chapter.html", title: "AWS Shield" }
    ]
  },
  {
    id: 56,
    question: "Amazon Athenaの主な特徴は何ですか?",
    options: [
      "NoSQLデータベース",
      "S3データに対するサーバーレスクエリサービス",
      "リレーショナルデータベース",
      "メッセージキューサービス"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon Athenaは、標準SQLを使用してS3内のデータを直接分析できるサーバーレスのインタラクティブクエリサービスです。",
    optionExplanations: [
      "NoSQLデータベース: DynamoDBの特徴です。AthenaはS3データのクエリサービスです。",
      "S3データに対するサーバーレスクエリサービス: ✓ 正解。Athenaは、インフラストラクチャの管理不要で、S3に保存されたデータに対してSQLクエリを実行できます。使用したクエリ分のみ課金されます。",
      "リレーショナルデータベース: RDSやAuroraの特徴です。Athenaはクエリエンジンです。",
      "メッセージキューサービス: SQSの特徴です。Athenaはデータ分析サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/athena/latest/ug/what-is.html", title: "Amazon Athena とは" }
    ]
  },
  {
    id: 57,
    question: "AWS Batchの主な用途は何ですか?",
    options: [
      "リアルタイムストリーミング",
      "バッチコンピューティングジョブの実行",
      "静的ウェブサイトのホスティング",
      "DNSルーティング"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Batchは、数十万のバッチコンピューティングジョブを効率的に実行できるフルマネージドサービスです。",
    optionExplanations: [
      "リアルタイムストリーミング: Kinesisの用途です。Batchはバッチ処理に特化しています。",
      "バッチコンピューティングジョブの実行: ✓ 正解。AWS Batchは、コンピューティングリソースを動的にプロビジョニングし、ジョブのスケジューリングと実行を自動化します。",
      "静的ウェブサイトのホスティング: S3やAmplifyの用途です。Batchはバッチ処理ワークロード向けです。",
      "DNSルーティング: Route 53の機能です。Batchは大規模なバッチジョブの実行に使用されます。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/batch/latest/userguide/what-is-batch.html", title: "AWS Batch とは" }
    ]
  },
  {
    id: 58,
    question: "Amazon Cognitoの主な機能は何ですか?",
    options: [
      "データベース管理",
      "ユーザー認証とアクセス制御",
      "ファイルストレージ",
      "ネットワーク監視"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon Cognitoは、ウェブおよびモバイルアプリケーションにユーザー認証、承認、ユーザー管理機能を提供するサービスです。",
    optionExplanations: [
      "データベース管理: RDSやDynamoDBの機能です。Cognitoは認証サービスです。",
      "ユーザー認証とアクセス制御: ✓ 正解。Cognitoは、ユーザープール(認証)とIDプール(認可)を提供し、ソーシャルIDプロバイダーやSAML 2.0との統合も可能です。",
      "ファイルストレージ: S3やEFSの機能です。Cognitoはユーザー管理と認証に特化しています。",
      "ネットワーク監視: CloudWatchやVPC Flow Logsの機能です。Cognitoは認証・認可サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/what-is-amazon-cognito.html", title: "Amazon Cognito とは" }
    ]
  },
  {
    id: 59,
    question: "AWS Secrets Managerの主な用途は何ですか?",
    options: [
      "データベースのバックアップ",
      "機密情報の安全な保管とローテーション",
      "ネットワークトラフィックの分析",
      "コンテンツ配信"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Secrets Managerは、データベース認証情報、APIキー、その他の機密情報を安全に保管し、自動的にローテーションできるサービスです。",
    optionExplanations: [
      "データベースのバックアップ: AWS BackupやRDSの機能です。Secrets Managerは機密情報管理サービスです。",
      "機密情報の安全な保管とローテーション: ✓ 正解。Secrets Managerは、パスワード、APIキー、トークンなどを暗号化して保存し、自動ローテーション機能でセキュリティを強化します。",
      "ネットワークトラフィックの分析: VPC Flow LogsやCloudWatchの機能です。Secrets Managerはシークレット管理に特化しています。",
      "コンテンツ配信: CloudFrontの機能です。Secrets Managerは認証情報の安全な管理を提供します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/secretsmanager/latest/userguide/intro.html", title: "AWS Secrets Manager とは" }
    ]
  },
  {
    id: 60,
    question: "Amazon EventBridgeの主な機能は何ですか?",
    options: [
      "データベースのレプリケーション",
      "イベント駆動型アーキテクチャのためのイベントバス",
      "ファイルの圧縮",
      "負荷分散"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon EventBridgeは、AWSサービス、SaaSアプリケーション、カスタムアプリケーション間でイベントを簡単に接続できるサーバーレスイベントバスサービスです。",
    optionExplanations: [
      "データベースのレプリケーション: RDSやDynamoDBの機能です。EventBridgeはイベントルーティングサービスです。",
      "イベント駆動型アーキテクチャのためのイベントバス: ✓ 正解。EventBridgeは、イベントをフィルタリングし、複数のターゲット(Lambda、SNS、SQSなど)にルーティングできます。",
      "ファイルの圧縮: アプリケーションレベルの機能です。EventBridgeはイベント管理サービスです。",
      "負荷分散: ELBの機能です。EventBridgeはイベント駆動型の統合を実現します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/eventbridge/latest/userguide/eb-what-is.html", title: "Amazon EventBridge とは" }
    ]
  },
  {
    id: 61,
    question: "EC2インスタンスのメタデータにアクセスするために使用するIPアドレスはどれですか?",
    options: [
      "127.0.0.1",
      "169.254.169.254",
      "192.168.1.1",
      "10.0.0.1"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "EC2インスタンスメタデータサービスには、特別なリンクローカルアドレス169.254.169.254を使用してアクセスします。",
    optionExplanations: [
      "127.0.0.1: ローカルホスト(localhost)のIPアドレスです。EC2メタデータサービスには使用されません。",
      "169.254.169.254: ✓ 正解。このリンクローカルアドレスを使用して、インスタンス内からメタデータ(インスタンスID、AMI ID、IAMロールなど)にアクセスできます。",
      "192.168.1.1: プライベートネットワークでよく使用されるゲートウェイアドレスですが、EC2メタデータサービスには関係ありません。",
      "10.0.0.1: VPC内のプライベートIPアドレスの例ですが、メタデータサービスのアドレスではありません。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ec2-instance-metadata.html", title: "インスタンスメタデータとユーザーデータ" }
    ]
  },
  {
    id: 62,
    question: "S3バケットのデフォルトのアクセス権限はどれですか?",
    options: [
      "パブリック読み取り可能",
      "プライベート(所有者のみアクセス可能)",
      "認証されたユーザー全員がアクセス可能",
      "すべてのAWSアカウントがアクセス可能"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "S3バケットは作成時にデフォルトでプライベートに設定され、バケット所有者のみがアクセスできます。明示的に権限を付与しない限り、他のユーザーはアクセスできません。",
    optionExplanations: [
      "パブリック読み取り可能: デフォルトではありません。パブリックアクセスを許可するには、明示的な設定が必要です。",
      "プライベート(所有者のみアクセス可能): ✓ 正解。セキュリティのベストプラクティスとして、S3バケットはデフォルトでプライベートに設定されます。",
      "認証されたユーザー全員がアクセス可能: デフォルトではありません。これは明示的に設定する必要があります。",
      "すべてのAWSアカウントがアクセス可能: デフォルトではありません。クロスアカウントアクセスには明示的な権限設定が必要です。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/access-control-overview.html", title: "Amazon S3 のアクセス管理の概要" }
    ]
  },
  {
    id: 63,
    question: "RDSのMulti-AZ配置で、プライマリインスタンスに障害が発生した場合、どのくらいの時間でフェイルオーバーが完了しますか?",
    options: [
      "数秒",
      "1〜2分",
      "5〜10分",
      "30分以上"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "RDS Multi-AZのフェイルオーバーは通常1〜2分以内に自動的に完了し、手動介入は不要です。",
    optionExplanations: [
      "数秒: 理想的ですが、DNS伝播とデータベース接続の再確立に時間がかかるため、通常は1〜2分かかります。",
      "1〜2分: ✓ 正解。Multi-AZ配置では、プライマリインスタンスの障害を検出すると、自動的にスタンバイインスタンスにフェイルオーバーします。",
      "5〜10分: 通常のフェイルオーバー時間より長いです。Multi-AZは高可用性のために最適化されています。",
      "30分以上: Multi-AZのフェイルオーバーはこれほど長くかかりません。手動復旧が必要な場合の時間です。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html", title: "Amazon RDS のマルチ AZ 配置" }
    ]
  },
  {
    id: 64,
    question: "IAMポリシーで、特定のアクションを明示的に拒否する場合に使用するステートメントはどれですか?",
    options: [
      "Allow",
      "Deny",
      "Reject",
      "Block"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "IAMポリシーでは、'Deny'ステートメントを使用してアクションを明示的に拒否します。Denyは常にAllowより優先されます。",
    optionExplanations: [
      "Allow: アクションを許可するために使用されます。Denyとは逆の効果を持ちます。",
      "Deny: ✓ 正解。明示的な拒否を設定し、他のすべてのAllowステートメントより優先されます。セキュリティの強化に重要です。",
      "Reject: IAMポリシーで使用される有効なステートメントではありません。",
      "Block: IAMポリシーで使用される有効なステートメントではありません。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_policies_evaluation-logic.html", title: "ポリシーの評価論理" }
    ]
  },
  {
    id: 65,
    question: "CloudWatchのデフォルトメトリクス保持期間で、1分間隔のデータポイントは何日間保持されますか?",
    options: [
      "3日間",
      "15日間",
      "63日間",
      "455日間"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "CloudWatchは、1分間隔のデータポイントを15日間保持します。より長期間のデータが必要な場合は、S3にエクスポートできます。",
    optionExplanations: [
      "3日間: 1分間隔のデータの保持期間より短いです。これは高頻度データの初期保持期間です。",
      "15日間: ✓ 正解。1分間隔のメトリクスは15日間保持されます。5分間隔は63日間、1時間間隔は455日間保持されます。",
      "63日間: 5分間隔のデータポイントの保持期間です。1分間隔のデータはこれより短い期間です。",
      "455日間: 1時間間隔のデータポイントの保持期間です。1分間隔のデータはこれより短い期間です。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html", title: "Amazon CloudWatch の概念" }
    ]
  },
  {
    id: 66,
    question: "VPC内のサブネットで使用できないIPアドレスの数はいくつですか?(AWSが予約)",
    options: [
      "2個",
      "3個",
      "5個",
      "10個"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "AWSは各サブネットで5個のIPアドレスを予約します:ネットワークアドレス、VPCルーター、DNS、将来の使用、ブロードキャストアドレスです。",
    optionExplanations: [
      "2個: 予約されるIPアドレスの数より少ないです。ネットワークアドレスとブロードキャストアドレスだけではありません。",
      "3個: 予約されるIPアドレスの数より少ないです。AWSは追加のアドレスも予約します。",
      "5個: ✓ 正解。例えば10.0.0.0/24サブネットでは、.0(ネットワーク)、.1(VPCルーター)、.2(DNS)、.3(将来の使用)、.255(ブロードキャスト)が予約されます。",
      "10個: 実際に予約されるIPアドレスの数より多いです。AWSは5個のみ予約します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/configure-subnets.html", title: "VPC のサブネット" }
    ]
  },
  {
    id: 67,
    question: "Lambdaファンクションのデフォルトのタイムアウト時間はどれですか?",
    options: [
      "1秒",
      "3秒",
      "15分",
      "30秒"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Lambdaのデフォルトタイムアウトは3秒で、最大15分まで設定可能です。",
    optionExplanations: [
      "1秒: デフォルトより短い時間です。最小タイムアウトは1秒ですが、デフォルトではありません。",
      "3秒: ✓ 正解。Lambdaファンクションのデフォルトタイムアウトは3秒です。必要に応じて1秒から15分(900秒)の範囲で調整できます。",
      "15分: 最大タイムアウト時間ですが、デフォルトではありません。長時間実行するファンクションに設定します。",
      "30秒: デフォルトではありませんが、多くのユースケースで適切な設定値です。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/configuration-function-common.html", title: "Lambda 関数の設定" }
    ]
  },
  {
    id: 68,
    question: "EBSボリュームのスナップショットはどこに保存されますか?",
    options: [
      "同じアベイラビリティーゾーン内",
      "Amazon S3",
      "Amazon Glacier",
      "EC2インスタンスのローカルストレージ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "EBSスナップショットは自動的にAmazon S3に保存され、リージョン内で冗長化されます。ユーザーがS3バケットを管理する必要はありません。",
    optionExplanations: [
      "同じアベイラビリティーゾーン内: EBSボリューム自体はAZ内に存在しますが、スナップショットはリージョンレベルで保存されます。",
      "Amazon S3: ✓ 正解。EBSスナップショットはS3に保存され、リージョン内で自動的に複製されます。これにより高い耐久性が確保されます。",
      "Amazon Glacier: デフォルトの保存先ではありません。長期アーカイブが必要な場合は、Data Lifecycle Managerで移行できます。",
      "EC2インスタンスのローカルストレージ: スナップショットはインスタンスから独立して保存されます。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/EBSSnapshots.html", title: "Amazon EBS スナップショット" }
    ]
  },
  {
    id: 69,
    question: "Auto Scalingグループで、インスタンスの起動に失敗した場合のデフォルトのクールダウン期間はどれですか?",
    options: [
      "60秒",
      "300秒",
      "600秒",
      "クールダウンは適用されない"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Auto Scalingグループのデフォルトクールダウン期間は300秒(5分)です。この期間中、追加のスケーリングアクティビティは一時停止されます。",
    optionExplanations: [
      "60秒: デフォルトより短い期間です。クールダウン期間は調整可能ですが、デフォルトは300秒です。",
      "300秒: ✓ 正解。デフォルトのクールダウン期間は300秒(5分)で、スケーリングアクティビティ後にメトリクスが安定するまでの時間を確保します。",
      "600秒: デフォルトより長い期間です。必要に応じて設定できますが、デフォルトではありません。",
      "クールダウンは適用されない: 誤りです。Auto Scalingはデフォルトでクールダウン期間を使用します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/autoscaling/ec2/userguide/ec2-auto-scaling-cooldown.html", title: "Auto Scaling のクールダウン期間" }
    ]
  },
  {
    id: 70,
    question: "DynamoDBのプロビジョニングされたキャパシティモードで、1つの読み込みキャパシティユニット(RCU)で読み取れる最大データサイズはどれですか?(強力な整合性のある読み込みの場合)",
    options: [
      "1KB",
      "4KB",
      "8KB",
      "16KB"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "1つのRCUは、強力な整合性のある読み込みで最大4KBのアイテムを1秒あたり1回読み取ることができます。結果整合性のある読み込みでは2回読み取れます。",
    optionExplanations: [
      "1KB: RCUで読み取れるデータサイズより小さいです。1つのRCUはより多くのデータを処理できます。",
      "4KB: ✓ 正解。1 RCUは、強力な整合性のある読み込みで最大4KBのアイテムを1秒あたり1回、または結果整合性のある読み込みで2回読み取れます。",
      "8KB: 1つのRCUで読み取れるサイズより大きいです。8KBのアイテムには2 RCUが必要です。",
      "16KB: 1つのRCUで読み取れるサイズより大きいです。16KBのアイテムには4 RCUが必要です。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/ProvisionedThroughput.html", title: "DynamoDB のプロビジョニングされたキャパシティモード" }
    ]
  },
  {
    id: 71,
    question: "次のうち、AWSのグローバルサービスはどれですか?",
    options: [
      "Amazon EC2",
      "Amazon S3",
      "AWS IAM",
      "Amazon RDS"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "IAMはグローバルサービスで、リージョンを選択する必要がありません。ユーザー、グループ、ロール、ポリシーはすべてのリージョンで利用できます。",
    optionExplanations: [
      "Amazon EC2: リージョナルサービスです。特定のリージョンとアベイラビリティーゾーンでインスタンスを起動します。",
      "Amazon S3: バケットはリージョンに作成されますが、S3コンソールはグローバルビューを提供します。厳密にはリージョナルサービスです。",
      "AWS IAM: ✓ 正解。IAMはグローバルサービスで、作成したユーザーやロールはすべてのリージョンで自動的に利用可能です。",
      "Amazon RDS: リージョナルサービスです。データベースインスタンスは特定のリージョンとアベイラビリティーゾーンに作成されます。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/introduction.html", title: "AWS IAM とは" }
    ]
  },
  {
    id: 72,
    question: "EC2インスタンスで、停止と起動を繰り返した場合、変わらないものはどれですか?",
    options: [
      "パブリックIPアドレス",
      "プライベートIPアドレス",
      "インスタンスストアのデータ",
      "インスタンスID"
    ],
    correctAnswer: 3,
    category: "データベース",
    explanation: "インスタンスIDとプライベートIPアドレスは停止・起動後も変わりません。パブリックIPアドレスは変わり、インスタンスストアのデータは失われます。",
    optionExplanations: [
      "パブリックIPアドレス: 停止・起動すると変わります。固定IPが必要な場合はElastic IPを使用します。",
      "プライベートIPアドレス: インスタンスが存在する限り変わりません。VPC内での通信に使用されます。",
      "インスタンスストアのデータ: 停止すると失われます。永続的なストレージにはEBSを使用します。",
      "インスタンスID: ✓ 正解。インスタンスIDは、インスタンスが削除されるまで変わりません。停止・起動では変わりません。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html", title: "インスタンスのライフサイクル" }
    ]
  },
  {
    id: 73,
    question: "S3のストレージクラスで、最も低コストなのはどれですか?",
    options: [
      "S3 Standard",
      "S3 Intelligent-Tiering",
      "S3 Glacier Deep Archive",
      "S3 One Zone-IA"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "S3 Glacier Deep Archiveは、年に1〜2回程度しかアクセスしないデータ向けの最も低コストなストレージクラスです。",
    optionExplanations: [
      "S3 Standard: 頻繁にアクセスするデータ向けで、最も高コストなストレージクラスです。",
      "S3 Intelligent-Tiering: アクセスパターンに基づいて自動的に階層を移動しますが、Deep Archiveより高コストです。",
      "S3 Glacier Deep Archive: ✓ 正解。最も低コストで、取り出しに12時間以上かかりますが、長期アーカイブに最適です。",
      "S3 One Zone-IA: 低頻度アクセス向けですが、Deep Archiveより高コストです。単一AZに保存されます。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/storage-class-intro.html", title: "Amazon S3 ストレージクラス" }
    ]
  },
  {
    id: 74,
    question: "AWS Cost Explorerで確認できないものはどれですか?",
    options: [
      "過去のコスト傾向",
      "サービス別のコスト内訳",
      "将来のコスト予測",
      "リアルタイムのリソース使用状況"
    ],
    correctAnswer: 3,
    category: "データベース",
    explanation: "Cost Explorerは過去と予測のコストデータを提供しますが、リアルタイムのリソース使用状況はCloudWatchで確認します。",
    optionExplanations: [
      "過去のコスト傾向: Cost Explorerで確認できます。最大12ヶ月の履歴データを分析できます。",
      "サービス別のコスト内訳: Cost Explorerで確認できます。EC2、S3、RDSなどサービスごとのコストを表示します。",
      "将来のコスト予測: Cost Explorerで確認できます。機械学習を使用して最大12ヶ月先のコストを予測します。",
      "リアルタイムのリソース使用状況: ✓ 正解。これはCloudWatchの機能です。Cost Explorerはコストデータに焦点を当てており、通常1日の遅延があります。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/cost-management/latest/userguide/ce-what-is.html", title: "AWS Cost Explorer とは" }
    ]
  },
  {
    id: 75,
    question: "Amazon RDSで、データベースエンジンのメジャーバージョンアップグレードを実行する際、推奨される手順はどれですか?",
    options: [
      "本番環境で直接アップグレードする",
      "スナップショットを取得してからアップグレードする",
      "Multi-AZを無効にしてからアップグレードする",
      "バックアップを無効にしてからアップグレードする"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "メジャーバージョンアップグレード前には、必ずスナップショットを取得してバックアップを確保することが推奨されます。",
    optionExplanations: [
      "本番環境で直接アップグレードする: リスクが高いです。まずスナップショットを取得し、可能であればテスト環境で検証すべきです。",
      "スナップショットを取得してからアップグレードする: ✓ 正解。問題が発生した場合にロールバックできるよう、アップグレード前に必ずスナップショットを取得します。",
      "Multi-AZを無効にしてからアップグレードする: 推奨されません。Multi-AZは高可用性を提供し、アップグレード中も有効にしておくべきです。",
      "バックアップを無効にしてからアップグレードする: 危険です。バックアップは常に有効にしておくべきで、特にアップグレード時は重要です。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html", title: "DB インスタンスのアップグレード" }
    ]
  },
  {
    id: 76,
    question: "VPCピアリング接続について正しい説明はどれですか?",
    options: [
      "推移的なルーティングがサポートされる",
      "異なるリージョン間では使用できない",
      "重複するCIDRブロックを持つVPC間でも接続できる",
      "1対1の接続で、推移的なルーティングはサポートされない"
    ],
    correctAnswer: 3,
    category: "データベース",
    explanation: "VPCピアリングは1対1の接続で、推移的なルーティングはサポートされません。A-B、B-C間にピアリングがあっても、A-C間の通信には別途ピアリングが必要です。",
    optionExplanations: [
      "推移的なルーティングがサポートされる: 誤りです。VPCピアリングは推移的ルーティングをサポートしません。",
      "異なるリージョン間では使用できない: 誤りです。クロスリージョンVPCピアリングは可能です。",
      "重複するCIDRブロックを持つVPC間でも接続できる: 誤りです。CIDRブロックが重複するVPC間ではピアリングできません。",
      "1対1の接続で、推移的なルーティングはサポートされない: ✓ 正解。各VPCペア間に個別のピアリング接続が必要で、推移的なルーティングは機能しません。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/vpc/latest/peering/what-is-vpc-peering.html", title: "VPC ピアリングとは" }
    ]
  },
  {
    id: 77,
    question: "AWS Budgetsで設定できないアラートタイプはどれですか?",
    options: [
      "実際のコストが予算を超えた場合",
      "予測コストが予算を超える見込みの場合",
      "特定のサービスの使用量が閾値を超えた場合",
      "特定のIAMユーザーがログインした場合"
    ],
    correctAnswer: 3,
    category: "データベース",
    explanation: "AWS Budgetsはコストと使用量の監視に特化しており、IAMユーザーのログインイベントは監視しません。それはCloudTrailとEventBridgeの役割です。",
    optionExplanations: [
      "実際のコストが予算を超えた場合: Budgetsで設定できます。実際のコストが閾値(例:80%、100%)を超えたときにアラートを送信します。",
      "予測コストが予算を超える見込みの場合: Budgetsで設定できます。機械学習を使用して将来のコストを予測し、予算超過が見込まれる場合にアラートします。",
      "特定のサービスの使用量が閾値を超えた場合: Budgetsで設定できます。EC2時間数、S3ストレージ量などの使用量ベースのアラートが可能です。",
      "特定のIAMユーザーがログインした場合: ✓ 正解。これはBudgetsの機能ではありません。IAMイベントの監視にはCloudTrailとEventBridgeを使用します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/cost-management/latest/userguide/budgets-managing-costs.html", title: "AWS Budgets でコストを管理する" }
    ]
  },
  {
    id: 78,
    question: "Amazon CloudWatchのカスタムメトリクスで、最も高い解像度(最短の間隔)はどれですか?",
    options: [
      "1秒",
      "5秒",
      "10秒",
      "1分"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "CloudWatchのカスタムメトリクスは、高解像度メトリクスとして1秒間隔でデータを送信できます。",
    optionExplanations: [
      "1秒: ✓ 正解。高解像度カスタムメトリクスは1秒間隔でデータポイントを送信でき、リアルタイムに近い監視が可能です。",
      "5秒: 高解像度メトリクスでサポートされる間隔ですが、最短ではありません。",
      "10秒: 高解像度メトリクスでサポートされる間隔ですが、最短ではありません。",
      "1分: 標準解像度のメトリクスの間隔です。カスタムメトリクスはより高い解像度をサポートします。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/monitoring/publishingMetrics.html", title: "カスタムメトリクスの発行" }
    ]
  },
  {
    id: 79,
    question: "AWS Snowballを使用する主な理由はどれですか?",
    options: [
      "リアルタイムデータ分析",
      "大量データの物理的な転送",
      "データベースのレプリケーション",
      "アプリケーションのデプロイ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Snowballは、ペタバイト規模の大量データをAWSに物理的に転送するためのデバイスで、ネットワーク転送が非効率な場合に使用します。",
    optionExplanations: [
      "リアルタイムデータ分析: KinesisやAthenaの用途です。Snowballは大量データの一括転送に使用されます。",
      "大量データの物理的な転送: ✓ 正解。Snowballは、ネットワーク帯域幅が限られている場合や、大量データ(TB〜PB規模)を効率的にAWSに移行するために使用します。",
      "データベースのレプリケーション: DMSやRDSの機能です。Snowballは一括データ転送デバイスです。",
      "アプリケーションのデプロイ: CodeDeployやElastic Beanstalkの用途です。Snowballはデータ転送専用です。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/snowball/latest/ug/whatissnowball.html", title: "AWS Snowball とは" }
    ]
  },
  {
    id: 80,
    question: "Amazon EFSとAmazon EBSの主な違いはどれですか?",
    options: [
      "EFSはブロックストレージ、EBSはファイルストレージ",
      "EFSは複数のEC2インスタンスから同時アクセス可能、EBSは単一インスタンスのみ",
      "EFSはリージョナル、EBSはグローバル",
      "EFSはオブジェクトストレージ、EBSはブロックストレージ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "EFSは複数のEC2インスタンスから同時にマウントできるファイルストレージで、EBSは基本的に単一のEC2インスタンスにアタッチされるブロックストレージです。",
    optionExplanations: [
      "EFSはブロックストレージ、EBSはファイルストレージ: 逆です。EFSがファイルストレージ、EBSがブロックストレージです。",
      "EFSは複数のEC2インスタンスから同時アクセス可能、EBSは単一インスタンスのみ: ✓ 正解。EFSは共有ファイルシステムとして複数インスタンスから同時アクセスでき、EBSは通常1つのインスタンスにアタッチされます。",
      "EFSはリージョナル、EBSはグローバル: 両方ともリージョナルサービスです。グローバルではありません。",
      "EFSはオブジェクトストレージ、EBSはブロックストレージ: EFSはファイルストレージです。オブジェクトストレージはS3です。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/efs/latest/ug/whatisefs.html", title: "Amazon EFS とは" }
    ]
  },
  {
    id: 81,
    question: "AWS Elastic Beanstalkで自動的に管理されないものはどれですか?",
    options: [
      "キャパシティのプロビジョニング",
      "負荷分散",
      "アプリケーションコードの開発",
      "自動スケーリング"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "Elastic Beanstalkはインフラストラクチャの管理を自動化しますが、アプリケーションコードの開発は開発者の責任です。",
    optionExplanations: [
      "キャパシティのプロビジョニング: Elastic Beanstalkが自動的に管理します。必要なEC2インスタンスを自動的にプロビジョニングします。",
      "負荷分散: Elastic Beanstalkが自動的に管理します。ELBを使用して自動的に負荷分散を設定します。",
      "アプリケーションコードの開発: ✓ 正解。これは開発者の責任です。Elastic Beanstalkはコードをデプロイして実行する環境を提供しますが、コード自体は開発者が作成します。",
      "自動スケーリング: Elastic Beanstalkが自動的に管理します。トラフィックに応じてインスタンス数を自動調整します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/elasticbeanstalk/latest/dg/Welcome.html", title: "AWS Elastic Beanstalk とは" }
    ]
  },
  {
    id: 82,
    question: "Amazon Redshiftの主な用途はどれですか?",
    options: [
      "NoSQLデータベース",
      "データウェアハウスと分析",
      "リアルタイムトランザクション処理",
      "オブジェクトストレージ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon Redshiftは、ペタバイト規模のデータウェアハウスサービスで、大規模なデータ分析に最適化されています。",
    optionExplanations: [
      "NoSQLデータベース: DynamoDBの用途です。RedshiftはSQLベースのデータウェアハウスです。",
      "データウェアハウスと分析: ✓ 正解。Redshiftは、大量の構造化データに対する複雑な分析クエリを高速に実行できるデータウェアハウスサービスです。",
      "リアルタイムトランザクション処理: RDSやAuroraの用途です。Redshiftは分析ワークロードに最適化されています。",
      "オブジェクトストレージ: S3の用途です。Redshiftはデータウェアハウスサービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/redshift/latest/mgmt/welcome.html", title: "Amazon Redshift とは" }
    ]
  },
  {
    id: 83,
    question: "AWS X-Rayの主な目的は何ですか?",
    options: [
      "コスト最適化",
      "分散アプリケーションのトレースと分析",
      "データベースのバックアップ",
      "ネットワークセキュリティ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS X-Rayは、分散アプリケーションのリクエストをトレースし、パフォーマンスのボトルネックやエラーを特定するためのサービスです。",
    optionExplanations: [
      "コスト最適化: Cost ExplorerやTrusted Advisorの目的です。X-Rayはアプリケーション分析ツールです。",
      "分散アプリケーションのトレースと分析: ✓ 正解。X-Rayは、マイクロサービスアーキテクチャなどの分散システムで、リクエストの流れを可視化し、パフォーマンス問題を診断します。",
      "データベースのバックアップ: AWS BackupやRDSの機能です。X-Rayはトレーシングサービスです。",
      "ネットワークセキュリティ: Security GroupやNACLの目的です。X-Rayはアプリケーションの可観測性ツールです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/xray/latest/devguide/aws-xray.html", title: "AWS X-Ray とは" }
    ]
  },
  {
    id: 84,
    question: "AWS Personal Health Dashboardが提供する情報はどれですか?",
    options: [
      "AWSサービスの一般的な稼働状況のみ",
      "自分のAWSリソースに影響を与えるイベントの通知",
      "コスト最適化の推奨事項",
      "セキュリティ脆弱性のスキャン結果"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Personal Health Dashboardは、自分のAWSアカウントのリソースに影響を与える可能性のあるイベントについて、パーソナライズされた通知を提供します。",
    optionExplanations: [
      "AWSサービスの一般的な稼働状況のみ: これはService Health Dashboardの機能です。Personal Health Dashboardはよりパーソナライズされた情報を提供します。",
      "自分のAWSリソースに影響を与えるイベントの通知: ✓ 正解。メンテナンス、障害、セキュリティイベントなど、自分のリソースに影響する可能性のあるイベントについて通知します。",
      "コスト最適化の推奨事項: Trusted AdvisorやCost Explorerの機能です。Personal Health Dashboardは健全性イベントに焦点を当てています。",
      "セキュリティ脆弱性のスキャン結果: Inspectorや Security Hubの機能です。Personal Health Dashboardはサービスイベントを通知します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/health/latest/ug/what-is-aws-health.html", title: "AWS Health とは" }
    ]
  },
  {
    id: 85,
    question: "Amazon Aurora Serverlessの主な利点はどれですか?",
    options: [
      "固定容量で予測可能なコスト",
      "使用量に応じた自動スケーリングと従量課金",
      "NoSQLデータベース機能",
      "オンプレミスでの実行"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Aurora Serverlessは、データベースの容量を自動的にスケールアップ・ダウンし、実際に使用した分だけ課金されるサーバーレスデータベースです。",
    optionExplanations: [
      "固定容量で予測可能なコスト: 通常のプロビジョニングされたAuroraの特徴です。Serverlessは変動する容量と従量課金が特徴です。",
      "使用量に応じた自動スケーリングと従量課金: ✓ 正解。Aurora Serverlessは、ワークロードに応じて自動的にスケールし、データベースが使用されていない時は停止して、使用した分だけ課金されます。",
      "NoSQLデータベース機能: Auroraはリレーショナルデータベースです。NoSQL機能はDynamoDBが提供します。",
      "オンプレミスでの実行: Auroraはクラウドネイティブサービスで、オンプレミスでは実行できません。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/AuroraUserGuide/aurora-serverless.html", title: "Amazon Aurora Serverless の使用" }
    ]
  },
  {
    id: 86,
    question: "AWS WAF(Web Application Firewall)で保護できる攻撃はどれですか?",
    options: [
      "DDoS攻撃のみ",
      "SQLインジェクションとクロスサイトスクリプティング",
      "物理的なデータセンターへの侵入",
      "IAMユーザーの不正ログイン"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS WAFは、SQLインジェクション、クロスサイトスクリプティング(XSS)などの一般的なWebアプリケーション攻撃から保護します。",
    optionExplanations: [
      "DDoS攻撃のみ: DDoS攻撃の保護はAWS Shieldの主な機能です。WAFはアプリケーション層の攻撃に焦点を当てています。",
      "SQLインジェクションとクロスサイトスクリプティング: ✓ 正解。WAFは、カスタムルールやマネージドルールを使用して、SQLインジェクション、XSS、その他のOWASP Top 10の脅威から保護します。",
      "物理的なデータセンターへの侵入: これはAWSの物理セキュリティの責任範囲です。WAFはWebアプリケーション保護ツールです。",
      "IAMユーザーの不正ログイン: IAMポリシーやMFAで対策します。WAFはWebトラフィックのフィルタリングに特化しています。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/waf/latest/developerguide/what-is-aws-waf.html", title: "AWS WAF とは" }
    ]
  },
  {
    id: 87,
    question: "Amazon S3のバージョニング機能を有効にした場合、オブジェクトを削除するとどうなりますか?",
    options: [
      "オブジェクトは完全に削除される",
      "削除マーカーが追加され、以前のバージョンは保持される",
      "最新バージョンのみが削除される",
      "すべてのバージョンが削除される"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "S3バージョニングが有効な場合、オブジェクトを削除すると削除マーカーが追加されますが、以前のバージョンはすべて保持されます。",
    optionExplanations: [
      "オブジェクトは完全に削除される: バージョニングが無効の場合の動作です。バージョニング有効時は削除マーカーが追加されます。",
      "削除マーカーが追加され、以前のバージョンは保持される: ✓ 正解。削除操作は新しい削除マーカーを作成し、すべての以前のバージョンは保持されるため、誤削除から保護できます。",
      "最新バージョンのみが削除される: 誤りです。削除マーカーが追加され、すべてのバージョンが保持されます。",
      "すべてのバージョンが削除される: 誤りです。バージョンを完全に削除するには、各バージョンを個別に削除する必要があります。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/Versioning.html", title: "S3 バケットでのバージョニングの使用" }
    ]
  },
  {
    id: 88,
    question: "AWS CloudFormationスタックの更新時に、変更セット(Change Set)を使用する主な理由はどれですか?",
    options: [
      "更新を高速化するため",
      "変更内容を事前に確認してから適用するため",
      "コストを削減するため",
      "自動的にロールバックするため"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "変更セットを使用すると、スタックに加えられる変更を実際に適用する前にプレビューでき、意図しない変更を防ぐことができます。",
    optionExplanations: [
      "更新を高速化するため: 変更セットは速度向上のためではなく、安全性向上のための機能です。",
      "変更内容を事前に確認してから適用するため: ✓ 正解。変更セットは、リソースの追加、削除、変更をプレビューし、本番環境への影響を事前に評価できます。",
      "コストを削減するため: 変更セット自体はコスト削減機能ではありません。安全な変更管理のためのツールです。",
      "自動的にロールバックするため: ロールバックは別の機能です。変更セットは変更のプレビューに使用されます。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html", title: "変更セットを使用したスタックの更新" }
    ]
  },
  {
    id: 89,
    question: "Amazon DynamoDBのグローバルセカンダリインデックス(GSI)とローカルセカンダリインデックス(LSI)の主な違いはどれですか?",
    options: [
      "GSIは作成後に追加可能、LSIはテーブル作成時のみ",
      "LSIは作成後に追加可能、GSIはテーブル作成時のみ",
      "GSIとLSIに違いはない",
      "GSIはクエリのみ、LSIはスキャンのみ"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "GSIはテーブル作成後でも追加・削除できますが、LSIはテーブル作成時にのみ定義でき、後から変更できません。",
    optionExplanations: [
      "GSIは作成後に追加可能、LSIはテーブル作成時のみ: ✓ 正解。GSIは柔軟性が高く、いつでも追加・削除できますが、LSIはテーブル作成時に定義する必要があります。",
      "LSIは作成後に追加可能、GSIはテーブル作成時のみ: 逆です。GSIが柔軟で、LSIが制限されています。",
      "GSIとLSIに違いはない: 誤りです。作成タイミング、パーティションキー、整合性モデルなど、多くの違いがあります。",
      "GSIはクエリのみ、LSIはスキャンのみ: 誤りです。両方ともクエリとスキャンをサポートします。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/SecondaryIndexes.html", title: "DynamoDB のセカンダリインデックス" }
    ]
  },
  {
    id: 90,
    question: "AWS Systems Manager Session Managerの主な利点はどれですか?",
    options: [
      "EC2インスタンスへのSSHポートを開く必要がない",
      "データベースのバックアップを自動化できる",
      "コストを削減できる",
      "アプリケーションをデプロイできる"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "Session Managerを使用すると、SSHポート(22)やRDPポート(3389)を開かずに、ブラウザベースまたはCLIでEC2インスタンスに安全にアクセスできます。",
    optionExplanations: [
      "EC2インスタンスへのSSHポートを開く必要がない: ✓ 正解。Session Managerは、インバウンドポートを開かずにインスタンスに接続でき、セキュリティが向上し、監査ログも自動的に記録されます。",
      "データベースのバックアップを自動化できる: AWS BackupやRDSの機能です。Session Managerはインスタンスアクセス管理ツールです。",
      "コストを削減できる: Session Manager自体は追加コストなしで使用できますが、主な目的はコスト削減ではなくセキュリティ向上です。",
      "アプリケーションをデプロイできる: CodeDeployやElastic Beanstalkの機能です。Session Managerはリモートアクセスツールです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/session-manager.html", title: "AWS Systems Manager Session Manager" }
    ]
  },
  {
    id: 91,
    question: "AWS Transit Gatewayの主な用途は何ですか?",
    options: [
      "複数のVPCとオンプレミスネットワークを接続するハブ",
      "インターネットゲートウェイの代替",
      "データベースのレプリケーション",
      "コンテンツ配信の高速化"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "Transit Gatewayは、複数のVPC、VPN接続、Direct Connect接続を単一のゲートウェイで接続できるネットワークハブです。",
    optionExplanations: [
      "複数のVPCとオンプレミスネットワークを接続するハブ: ✓ 正解。Transit Gatewayは、数千のVPCとオンプレミスネットワークを中央ハブで接続し、ネットワーク管理を簡素化します。",
      "インターネットゲートウェイの代替: 誤りです。Transit Gatewayはプライベートネットワーク接続用で、インターネットゲートウェイとは異なる目的です。",
      "データベースのレプリケーション: RDSやDynamoDBの機能です。Transit Gatewayはネットワーク接続サービスです。",
      "コンテンツ配信の高速化: CloudFrontの機能です。Transit Gatewayはネットワークルーティングに特化しています。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/vpc/latest/tgw/what-is-transit-gateway.html", title: "Transit Gateway とは" }
    ]
  },
  {
    id: 92,
    question: "Amazon ElastiCacheでサポートされているキャッシュエンジンはどれですか?",
    options: [
      "RedisとMemcachedのみ",
      "MySQLとPostgreSQL",
      "MongoDBとCassandra",
      "OracleとSQL Server"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "Amazon ElastiCacheは、RedisとMemcachedの2つのオープンソースインメモリキャッシュエンジンをサポートしています。",
    optionExplanations: [
      "RedisとMemcachedのみ: ✓ 正解。ElastiCacheは、RedisとMemcachedをフルマネージドサービスとして提供し、アプリケーションのパフォーマンスを向上させます。",
      "MySQLとPostgreSQL: これらはRDSやAuroraでサポートされるリレーショナルデータベースエンジンです。",
      "MongoDBとCassandra: これらはNoSQLデータベースで、DocumentDBやKeyspacesでサポートされます。",
      "OracleとSQL Server: これらはRDSでサポートされる商用データベースエンジンです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/red-ug/WhatIs.html", title: "Amazon ElastiCache とは" }
    ]
  },
  {
    id: 93,
    question: "AWS Artifactで提供されるものはどれですか?",
    options: [
      "コンプライアンスレポートとセキュリティドキュメント",
      "アプリケーションのビルド成果物",
      "機械学習モデル",
      "データベースのバックアップ"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "AWS Artifactは、AWSのコンプライアンスレポート、セキュリティドキュメント、契約書にオンデマンドでアクセスできるサービスです。",
    optionExplanations: [
      "コンプライアンスレポートとセキュリティドキュメント: ✓ 正解。Artifactは、SOC、PCI、ISO認証レポートなど、AWSのコンプライアンス関連ドキュメントを提供します。",
      "アプリケーションのビルド成果物: CodeArtifactやS3で管理します。AWS Artifactはコンプライアンスドキュメント専用です。",
      "機械学習モデル: SageMakerで管理します。Artifactはコンプライアンス情報の提供に特化しています。",
      "データベースのバックアップ: AWS BackupやRDSで管理します。Artifactはドキュメント提供サービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/artifact/latest/ug/what-is-aws-artifact.html", title: "AWS Artifact とは" }
    ]
  },
  {
    id: 94,
    question: "Amazon API Gatewayのスロットリング(調整)のデフォルト制限はどれですか?",
    options: [
      "1秒あたり1,000リクエスト",
      "1秒あたり5,000リクエスト",
      "1秒あたり10,000リクエスト",
      "制限なし"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "API Gatewayのデフォルトのスロットリング制限は、1秒あたり10,000リクエスト、バーストで5,000リクエストです。",
    optionExplanations: [
      "1秒あたり1,000リクエスト: デフォルト制限より低いです。必要に応じて制限を引き下げることは可能です。",
      "1秒あたり5,000リクエスト: バースト容量の値です。定常状態の制限はこれより高いです。",
      "1秒あたり10,000リクエスト: ✓ 正解。API Gatewayは、デフォルトで1秒あたり10,000リクエストの定常状態制限と、5,000リクエストのバースト容量を提供します。",
      "制限なし: 誤りです。API Gatewayにはデフォルトのスロットリング制限があり、必要に応じて引き上げをリクエストできます。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/api-gateway-request-throttling.html", title: "API Gateway のスロットリング" }
    ]
  },
  {
    id: 95,
    question: "AWS Glueの主な機能はどれですか?",
    options: [
      "サーバーレスETL(抽出、変換、ロード)サービス",
      "コンテナオーケストレーション",
      "ブロックチェーン管理",
      "量子コンピューティング"
    ],
    correctAnswer: 0,
    category: "セキュリティ",
    explanation: "AWS Glueは、データの検出、準備、統合を簡素化するサーバーレスデータ統合サービスで、ETL処理に最適化されています。",
    optionExplanations: [
      "サーバーレスETL(抽出、変換、ロード)サービス: ✓ 正解。Glueは、データソースからデータを抽出し、変換して、データウェアハウスやデータレイクにロードするETLジョブを自動化します。",
      "コンテナオーケストレーション: ECSやEKSの機能です。Glueはデータ統合サービスです。",
      "ブロックチェーン管理: Amazon Managed Blockchainの機能です。Glueはデータ処理に特化しています。",
      "量子コンピューティング: Amazon Braketの領域です。GlueはETLとデータカタログサービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/glue/latest/dg/what-is-glue.html", title: "AWS Glue とは" }
    ]
  },
  {
    id: 96,
    question: "Amazon S3 Transfer Accelerationが使用するネットワークはどれですか?",
    options: [
      "インターネット",
      "AWS Direct Connect",
      "CloudFrontのエッジロケーション",
      "VPN"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "S3 Transfer Accelerationは、CloudFrontのグローバルエッジロケーションネットワークを活用して、長距離のファイル転送を高速化します。",
    optionExplanations: [
      "インターネット: 通常のS3転送で使用されます。Transfer Accelerationはより最適化されたネットワークを使用します。",
      "AWS Direct Connect: 専用線接続サービスです。Transfer Accelerationとは異なるアプローチです。",
      "CloudFrontのエッジロケーション: ✓ 正解。Transfer Accelerationは、CloudFrontのエッジロケーションを経由してAWSバックボーンネットワークを使用し、転送速度を最大化します。",
      "VPN: 暗号化された接続ですが、Transfer Accelerationの基盤ではありません。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/transfer-acceleration.html", title: "Amazon S3 Transfer Acceleration" }
    ]
  },
  {
    id: 97,
    question: "AWS Resource Access Manager (RAM)で共有できないリソースはどれですか?",
    options: [
      "Transit Gateway",
      "Subnets",
      "IAMユーザー",
      "Route 53 Resolver Rules"
    ],
    correctAnswer: 2,
    category: "セキュリティ",
    explanation: "AWS RAMは、VPCサブネット、Transit Gateway、Route 53リソースなどを共有できますが、IAMユーザーやロールは共有できません。",
    optionExplanations: [
      "Transit Gateway: RAMで共有できます。複数のアカウント間でTransit Gatewayを共有し、ネットワーク接続を簡素化できます。",
      "Subnets: RAMで共有できます。VPCサブネットを他のアカウントと共有し、リソースを同じサブネットに配置できます。",
      "IAMユーザー: ✓ 正解。IAMユーザー、グループ、ロールはアカウント固有で、RAMでは共有できません。クロスアカウントアクセスにはIAMロールを使用します。",
      "Route 53 Resolver Rules: RAMで共有できます。DNS解決ルールを複数のアカウント間で共有できます。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/ram/latest/userguide/what-is.html", title: "AWS Resource Access Manager とは" }
    ]
  },
  {
    id: 98,
    question: "Amazon FSx for Windowsファイルサーバーの主な特徴はどれですか?",
    options: [
      "Linuxベースのファイルシステム",
      "Windows Server上に構築されたフルマネージドファイルストレージ",
      "オブジェクトストレージ",
      "ブロックストレージ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon FSx for Windows File Serverは、Windows Server上に構築されたフルマネージドファイルストレージで、SMBプロトコルをサポートします。",
    optionExplanations: [
      "Linuxベースのファイルシステム: FSx for Lustreの特徴です。FSx for WindowsはWindows Serverベースです。",
      "Windows Server上に構築されたフルマネージドファイルストレージ: ✓ 正解。FSx for Windowsは、Active Directory統合、SMBプロトコル、Windows NTFSファイルシステムをサポートします。",
      "オブジェクトストレージ: S3の特徴です。FSxはファイルストレージサービスです。",
      "ブロックストレージ: EBSの特徴です。FSxはファイルレベルのストレージを提供します。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/fsx/latest/WindowsGuide/what-is.html", title: "Amazon FSx for Windows File Server とは" }
    ]
  },
  {
    id: 99,
    question: "AWS Control Towerの主な目的は何ですか?",
    options: [
      "コスト管理",
      "マルチアカウント環境のセットアップと管理",
      "データベースの移行",
      "機械学習モデルのトレーニング"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "AWS Control Towerは、ベストプラクティスに基づいた安全なマルチアカウントAWS環境を自動的にセットアップし、管理するサービスです。",
    optionExplanations: [
      "コスト管理: Cost ExplorerやBudgetsの目的です。Control Towerはガバナンスとコンプライアンスに焦点を当てています。",
      "マルチアカウント環境のセットアップと管理: ✓ 正解。Control Towerは、AWS Organizationsを基盤として、ガードレール、アカウントファクトリー、ダッシュボードを提供し、マルチアカウント環境を管理します。",
      "データベースの移行: Database Migration Serviceの目的です。Control Towerはアカウント管理ツールです。",
      "機械学習モデルのトレーニング: SageMakerの目的です。Control Towerはガバナンスサービスです。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/controltower/latest/userguide/what-is-control-tower.html", title: "AWS Control Tower とは" }
    ]
  },
  {
    id: 100,
    question: "Amazon Macie の主な機能は何ですか?",
    options: [
      "ネットワークトラフィックの監視",
      "機密データの検出と保護",
      "アプリケーションのデプロイ",
      "データベースのバックアップ"
    ],
    correctAnswer: 1,
    category: "管理・デプロイ",
    explanation: "Amazon Macieは、機械学習を使用してS3内の機密データ(個人情報、クレジットカード番号など)を自動的に検出し、保護するセキュリティサービスです。",
    optionExplanations: [
      "ネットワークトラフィックの監視: VPC Flow LogsやCloudWatchの機能です。Macieはデータセキュリティに特化しています。",
      "機密データの検出と保護: ✓ 正解。Macieは、S3バケット内の機密データを自動的にスキャンし、分類し、セキュリティリスクを特定してアラートを送信します。",
      "アプリケーションのデプロイ: CodeDeployやElastic Beanstalkの機能です。Macieはデータプライバシーツールです。",
      "データベースのバックアップ: AWS BackupやRDSの機能です。Macieは機密データの検出と分類に焦点を当てています。"
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ja_jp/macie/latest/user/what-is-macie.html", title: "Amazon Macie とは" }
    ]
  }
];

// エクスポート(ブラウザ環境用)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = awsCLFQuestions;
}

// Made with Bob
