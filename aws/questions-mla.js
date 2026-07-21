// AWS Certified Machine Learning Engineer - Associate (MLA-C01) Practice Questions
const awsMLAQuestions = [
  {
    id: 1,
    question: "A machine learning engineer needs to prepare a tabular dataset stored in Amazon S3 for model training. The team wants a visual, low-code tool to clean missing values, normalize numeric columns, and export the transformed dataset back to S3. Which AWS service is the BEST fit?",
    options: [
      "AWS Glue DataBrew",
      "Amazon EMR",
      "Amazon Kinesis Data Streams",
      "AWS Step Functions"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "AWS Glue DataBrew provides a visual, low-code interface for data cleaning and transformation tasks such as handling missing values, normalization, and exporting prepared data to Amazon S3.",
    optionExplanations: [
      "AWS Glue DataBrew: ✓ Correct. DataBrew is designed for visual data preparation and transformation with minimal coding, making it ideal for preparing tabular ML datasets stored in S3.",
      "Amazon EMR: Incorrect. EMR can process large datasets with frameworks such as Spark, but it requires more operational effort and is not a low-code visual tool.",
      "Amazon Kinesis Data Streams: Incorrect. Kinesis Data Streams is for real-time streaming ingestion, not batch data preparation for ML training datasets.",
      "AWS Step Functions: Incorrect. Step Functions orchestrates workflows, but it does not provide built-in data cleansing and transformation features."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/databrew/latest/dg/what-is.html", title: "What Is AWS Glue DataBrew?" }
    ]
  },
  {
    id: 2,
    question: "A team needs a centralized repository to store, share, and serve ML features for both training and real-time inference workloads. Which AWS service should the team use?",
    options: [
      "Amazon SageMaker Feature Store",
      "Amazon Athena",
      "AWS Secrets Manager",
      "Amazon SQS"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon SageMaker Feature Store is designed to store, manage, and serve ML features consistently for training and inference use cases.",
    optionExplanations: [
      "Amazon SageMaker Feature Store: ✓ Correct. Feature Store provides an offline store for training and an online store for low-latency inference access to features.",
      "Amazon Athena: Incorrect. Athena is a query service for data in S3, not a dedicated managed feature repository for ML workflows.",
      "AWS Secrets Manager: Incorrect. Secrets Manager stores secrets such as API keys and passwords, not ML features.",
      "Amazon SQS: Incorrect. SQS is a message queue and does not provide feature storage or serving capabilities."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html", title: "Amazon SageMaker Feature Store" }
    ]
  },
  {
    id: 3,
    question: "A machine learning engineer must identify potential bias in a training dataset before model training. The engineer wants to calculate pre-training bias metrics such as class imbalance and label distribution differences. Which SageMaker capability should be used?",
    options: [
      "SageMaker Clarify",
      "SageMaker Neo",
      "Amazon Rekognition",
      "Amazon CloudFront"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "SageMaker Clarify helps detect bias in datasets and models by generating pre-training and post-training bias metrics, including class imbalance and label distribution analysis.",
    optionExplanations: [
      "SageMaker Clarify: ✓ Correct. Clarify provides built-in bias detection and explainability features for ML datasets and model outputs.",
      "SageMaker Neo: Incorrect. Neo optimizes trained models for deployment on different hardware targets; it does not analyze dataset bias.",
      "Amazon Rekognition: Incorrect. Rekognition provides image and video analysis APIs, not bias analysis for general ML datasets.",
      "Amazon CloudFront: Incorrect. CloudFront is a content delivery network and has no ML bias analysis capability."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-detect-data-bias.html", title: "Detect Bias in Data with SageMaker Clarify" }
    ]
  },
  {
    id: 4,
    question: "A company wants to train a custom image classification model and needs human workers to create high-quality labels for thousands of images. Which AWS service is MOST appropriate?",
    options: [
      "Amazon SageMaker Ground Truth",
      "Amazon Macie",
      "AWS CodeBuild",
      "Amazon EventBridge"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon SageMaker Ground Truth is a data labeling service that helps create high-quality labeled datasets using human annotators and built-in workflows.",
    optionExplanations: [
      "Amazon SageMaker Ground Truth: ✓ Correct. Ground Truth is purpose-built for labeling data such as images, text, and video for ML training.",
      "Amazon Macie: Incorrect. Macie identifies sensitive data in S3; it is not a data labeling service.",
      "AWS CodeBuild: Incorrect. CodeBuild runs build jobs for software pipelines and does not support dataset labeling workflows.",
      "Amazon EventBridge: Incorrect. EventBridge routes events between services but does not perform human annotation or labeling."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/sms.html", title: "Amazon SageMaker Ground Truth" }
    ]
  },
  {
    id: 5,
    question: "A team is solving a binary classification problem and wants to automatically search for the best hyperparameter values for a SageMaker training job. Which SageMaker feature should the team use?",
    options: [
      "SageMaker Automatic Model Tuning",
      "SageMaker Model Monitor",
      "AWS CloudFormation",
      "Amazon S3 Transfer Acceleration"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "SageMaker Automatic Model Tuning runs multiple training jobs with different hyperparameter combinations and finds the best values based on a chosen objective metric.",
    optionExplanations: [
      "SageMaker Automatic Model Tuning: ✓ Correct. Automatic Model Tuning performs hyperparameter optimization such as Bayesian optimization or random search for SageMaker training jobs.",
      "SageMaker Model Monitor: Incorrect. Model Monitor is used after deployment to detect data and model quality drift, not to tune training hyperparameters.",
      "AWS CloudFormation: Incorrect. CloudFormation provisions infrastructure but does not optimize model hyperparameters.",
      "Amazon S3 Transfer Acceleration: Incorrect. This service speeds uploads to S3 and has no role in model tuning."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning.html", title: "Tune Hyperparameters Automatically in Amazon SageMaker" }
    ]
  },
  {
    id: 6,
    question: "A machine learning engineer has a pretrained model available in SageMaker JumpStart and wants to adapt it to a company-specific dataset with the LEAST development effort. Which approach should the engineer choose?",
    options: [
      "Fine-tune the pretrained model in SageMaker JumpStart",
      "Rewrite the algorithm from scratch in C++",
      "Export the model to Amazon S3 and query it with Athena",
      "Use Amazon Macie to modify the model weights"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "SageMaker JumpStart provides pretrained models and solution templates that can be fine-tuned on custom datasets with minimal setup and development effort.",
    optionExplanations: [
      "Fine-tune the pretrained model in SageMaker JumpStart: ✓ Correct. JumpStart supports adapting pretrained models to custom datasets quickly and with less engineering effort than building from scratch.",
      "Rewrite the algorithm from scratch in C++: Incorrect. Rebuilding a model from scratch increases effort and is unnecessary when a suitable pretrained model already exists.",
      "Export the model to Amazon S3 and query it with Athena: Incorrect. Athena queries data in S3 and cannot fine-tune ML models.",
      "Use Amazon Macie to modify the model weights: Incorrect. Macie is used for sensitive data discovery in S3, not model training or fine-tuning."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/studio-jumpstart.html", title: "Amazon SageMaker JumpStart" }
    ]
  },
  {
    id: 7,
    question: "A model training job in Amazon SageMaker is taking too long to complete. The model can be trained in parallel across multiple instances. Which approach should the engineer use to reduce training time?",
    options: [
      "Use distributed training in SageMaker",
      "Store the model artifact in Amazon SQS",
      "Disable metrics collection in Amazon CloudWatch",
      "Move the training script to AWS CloudTrail"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Distributed training in SageMaker allows training workloads to run across multiple instances, reducing overall training time for models that can be parallelized.",
    optionExplanations: [
      "Use distributed training in SageMaker: ✓ Correct. Distributed training can reduce training time by splitting work across multiple compute instances.",
      "Store the model artifact in Amazon SQS: Incorrect. SQS is a queue service and cannot store trained model artifacts for training acceleration.",
      "Disable metrics collection in Amazon CloudWatch: Incorrect. Disabling metrics collection does not materially reduce model training time.",
      "Move the training script to AWS CloudTrail: Incorrect. CloudTrail logs API activity and does not execute or accelerate training jobs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/data-parallel.html", title: "Distributed Training in Amazon SageMaker" }
    ]
  },
  {
    id: 8,
    question: "A company needs to deploy an ML model for online inference with unpredictable traffic spikes. The company wants to minimize cost by paying only for actual inference usage and avoiding always-on instances. Which deployment option is BEST?",
    options: [
      "SageMaker Serverless Inference",
      "SageMaker batch transform",
      "Amazon EMR",
      "AWS DataSync"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "SageMaker Serverless Inference is well suited for online inference with intermittent or unpredictable traffic because it removes the need to manage or pay for continuously running instances.",
    optionExplanations: [
      "SageMaker Serverless Inference: ✓ Correct. It automatically provisions compute for requests and charges based on usage duration and memory allocation.",
      "SageMaker batch transform: Incorrect. Batch transform is intended for offline batch predictions, not low-latency online inference.",
      "Amazon EMR: Incorrect. EMR is a big data processing service, not a managed real-time inference deployment target.",
      "AWS DataSync: Incorrect. DataSync transfers data between storage systems and is unrelated to model hosting."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html", title: "Deploy Models with Amazon SageMaker Serverless Inference" }
    ]
  },
  {
    id: 9,
    question: "A machine learning team wants to define, automate, and version the steps of its training and deployment workflow directly in Amazon SageMaker. Which AWS service or feature should the team use?",
    options: [
      "SageMaker Pipelines",
      "Amazon Route 53",
      "AWS Shield",
      "Amazon Inspector"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "SageMaker Pipelines is a native workflow orchestration feature for building, automating, and managing ML workflows such as preprocessing, training, evaluation, and deployment.",
    optionExplanations: [
      "SageMaker Pipelines: ✓ Correct. It supports repeatable, versioned ML workflows and integrates directly with SageMaker jobs and artifacts.",
      "Amazon Route 53: Incorrect. Route 53 is a DNS service and does not orchestrate ML pipelines.",
      "AWS Shield: Incorrect. Shield provides DDoS protection and is unrelated to ML workflow automation.",
      "Amazon Inspector: Incorrect. Inspector performs vulnerability scanning and does not manage ML workflow stages."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines-sdk.html", title: "Amazon SageMaker Pipelines" }
    ]
  },
  {
    id: 10,
    question: "A deployed SageMaker model must be monitored for changes in incoming data distribution and prediction quality over time. Which SageMaker feature should be configured?",
    options: [
      "SageMaker Model Monitor",
      "SageMaker Neo",
      "AWS CodeArtifact",
      "Amazon S3 Glacier Deep Archive"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "SageMaker Model Monitor can detect data quality issues, model quality degradation, bias drift, and feature attribution drift in production ML endpoints.",
    optionExplanations: [
      "SageMaker Model Monitor: ✓ Correct. Model Monitor continuously checks production inference data and model outputs against baselines to detect drift and quality issues.",
      "SageMaker Neo: Incorrect. Neo optimizes models for deployment targets but does not monitor live inference behavior.",
      "AWS CodeArtifact: Incorrect. CodeArtifact is a package repository service and has no role in model monitoring.",
      "Amazon S3 Glacier Deep Archive: Incorrect. Glacier Deep Archive is a low-cost archival storage class and not a monitoring feature."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html", title: "Monitor Amazon SageMaker Models in Production" }
    ]
  },
  {
    id: 11,
    question: "A machine learning engineer needs to train a custom PyTorch model in Amazon SageMaker by providing a training script that uses the SageMaker-managed training infrastructure. Which SageMaker capability should the engineer use?",
    options: [
      "SageMaker script mode",
      "Amazon QuickSight",
      "AWS Batch",
      "Amazon CloudFront"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "SageMaker script mode allows engineers to bring their own training script while SageMaker manages the underlying training infrastructure, dependencies, and integration with supported frameworks such as PyTorch and TensorFlow.",
    optionExplanations: [
      "SageMaker script mode: ✓ Correct. Script mode is designed for running custom training code with supported ML frameworks on SageMaker-managed infrastructure.",
      "Amazon QuickSight: Incorrect. QuickSight is a business intelligence and visualization service, not a model training capability.",
      "AWS Batch: Incorrect. AWS Batch can run containerized jobs, but it is not the native SageMaker feature for managed framework-based model training.",
      "Amazon CloudFront: Incorrect. CloudFront is a content delivery network and is unrelated to model training."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/train-remote-decorator-container.html", title: "Run Custom Training Code in Amazon SageMaker" }
    ]
  },
  {
    id: 12,
    question: "A team wants to keep track of approved, rejected, and pending versions of trained ML models for auditability and reproducibility before deployment. Which SageMaker feature should the team use?",
    options: [
      "SageMaker Model Registry",
      "Amazon S3 Glacier",
      "AWS Secrets Manager",
      "Amazon SNS"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "SageMaker Model Registry is used to catalog, version, and manage the approval status of ML models, which supports governance, auditability, and repeatable deployment processes.",
    optionExplanations: [
      "SageMaker Model Registry: ✓ Correct. It tracks model versions and approval states in a centralized registry for controlled promotion to production.",
      "Amazon S3 Glacier: Incorrect. Glacier is archival storage and does not provide model lifecycle governance or approval workflows.",
      "AWS Secrets Manager: Incorrect. Secrets Manager stores secrets, not model package versions and approval states.",
      "Amazon SNS: Incorrect. SNS delivers notifications and does not act as a model registry."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html", title: "Register and Deploy Models with Model Registry" }
    ]
  },
  {
    id: 13,
    question: "A company needs to run predictions on millions of records stored in Amazon S3 once each night. Low-latency responses are not required. Which SageMaker inference option is the MOST cost-effective choice?",
    options: [
      "SageMaker Batch Transform",
      "SageMaker real-time endpoint",
      "SageMaker Serverless Inference",
      "Amazon API Gateway"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "SageMaker Batch Transform is designed for offline batch inference on large datasets in S3 and avoids the cost of maintaining always-on endpoints for workloads that do not require real-time responses.",
    optionExplanations: [
      "SageMaker Batch Transform: ✓ Correct. It processes large datasets offline and is generally the most cost-effective option for scheduled batch predictions.",
      "SageMaker real-time endpoint: Incorrect. Real-time endpoints are intended for low-latency online inference and can cost more because compute remains provisioned.",
      "SageMaker Serverless Inference: Incorrect. Serverless inference is optimized for intermittent online requests, not large nightly batch scoring jobs.",
      "Amazon API Gateway: Incorrect. API Gateway can front APIs, but it is not a batch inference service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/batch-transform.html", title: "Use Batch Transform" }
    ]
  },
  {
    id: 14,
    question: "A machine learning application requires a hosted model endpoint that can queue requests for large payloads and process them when compute capacity becomes available. Which SageMaker deployment option should be selected?",
    options: [
      "SageMaker Asynchronous Inference",
      "SageMaker batch transform",
      "Amazon Kinesis Data Firehose",
      "AWS Glue crawler"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "SageMaker Asynchronous Inference is designed for requests with large payload sizes, long processing times, or bursty traffic patterns by queueing requests and returning results asynchronously.",
    optionExplanations: [
      "SageMaker Asynchronous Inference: ✓ Correct. It handles queued requests and is appropriate for large payloads and longer-running inference workloads.",
      "SageMaker batch transform: Incorrect. Batch transform is for offline processing of datasets, not request-response inference with queued jobs.",
      "Amazon Kinesis Data Firehose: Incorrect. Firehose delivers streaming data to destinations such as S3; it does not host ML models.",
      "AWS Glue crawler: Incorrect. Glue crawlers discover schema metadata and do not perform inference."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html", title: "Deploy Models with Asynchronous Inference" }
    ]
  },
  {
    id: 15,
    question: "A team wants to reduce the cost of long-running SageMaker training jobs and can tolerate interruptions because checkpoints are saved periodically to Amazon S3. Which pricing option should the team choose?",
    options: [
      "Managed Spot Training in SageMaker",
      "Provisioned Concurrency",
      "Reserved capacity in Amazon Route 53",
      "S3 Standard-Infrequent Access"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Managed Spot Training in SageMaker uses spare EC2 capacity to lower training costs. When training jobs can resume from checkpoints, this option offers significant savings with acceptable interruption risk.",
    optionExplanations: [
      "Managed Spot Training in SageMaker: ✓ Correct. It reduces training costs substantially when the workload can handle interruptions and resume from checkpoints.",
      "Provisioned Concurrency: Incorrect. Provisioned Concurrency is a Lambda feature and does not apply to SageMaker training jobs.",
      "Reserved capacity in Amazon Route 53: Incorrect. Route 53 is a DNS service and has nothing to do with training cost optimization.",
      "S3 Standard-Infrequent Access: Incorrect. This is an S3 storage class, not a SageMaker training pricing model."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-managed-spot-training.html", title: "Managed Spot Training in Amazon SageMaker" }
    ]
  },
  {
    id: 16,
    question: "A deployed ML model is experiencing sudden increases in latency during peak traffic. The team wants SageMaker to add or remove endpoint instances automatically based on demand. What should the team configure?",
    options: [
      "SageMaker endpoint auto scaling",
      "Amazon S3 Lifecycle rules",
      "AWS Glue job bookmarks",
      "Amazon Athena workgroups"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "SageMaker endpoint auto scaling adjusts the number of instances behind an endpoint based on metrics such as invocations per instance or model latency, helping maintain performance during traffic changes.",
    optionExplanations: [
      "SageMaker endpoint auto scaling: ✓ Correct. Auto scaling is the native way to adjust inference capacity in response to changing traffic patterns.",
      "Amazon S3 Lifecycle rules: Incorrect. Lifecycle rules manage object transitions and expiration in S3, not endpoint capacity.",
      "AWS Glue job bookmarks: Incorrect. Job bookmarks track processed data in Glue ETL jobs and are unrelated to online inference scaling.",
      "Amazon Athena workgroups: Incorrect. Athena workgroups organize query execution settings and do not scale SageMaker endpoints."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling.html", title: "Automatically Scale Amazon SageMaker Models" }
    ]
  },
  {
    id: 17,
    question: "A company must deploy a SageMaker inference endpoint that is accessible only from resources inside a private network and not from the public internet. Which approach should the engineer use?",
    options: [
      "Configure the SageMaker endpoint inside a VPC with appropriate subnets and security groups",
      "Store the model artifact in Amazon S3 Glacier",
      "Use Amazon Route 53 public hosted zones only",
      "Enable S3 Transfer Acceleration"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "Placing SageMaker resources in a VPC with controlled subnets and security groups helps isolate ML systems and restrict network access to private resources only.",
    optionExplanations: [
      "Configure the SageMaker endpoint inside a VPC with appropriate subnets and security groups: ✓ Correct. VPC configuration is the standard method for private network isolation of SageMaker endpoints.",
      "Store the model artifact in Amazon S3 Glacier: Incorrect. Archiving model files does not control endpoint network access.",
      "Use Amazon Route 53 public hosted zones only: Incorrect. Public hosted zones expose DNS names publicly and do not provide private network isolation.",
      "Enable S3 Transfer Acceleration: Incorrect. Transfer Acceleration improves S3 upload performance and is unrelated to endpoint isolation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/interface-vpc-endpoint.html", title: "Connect to SageMaker AI Within Your VPC" }
    ]
  },
  {
    id: 18,
    question: "A data science team wants automated alerts whenever a SageMaker processing job or training job changes state to Failed. Which combination of AWS services provides this functionality with minimal effort?",
    options: [
      "Amazon EventBridge and Amazon SNS",
      "Amazon Kinesis Data Streams and AWS Glue",
      "Amazon Route 53 and AWS WAF",
      "Amazon EFS and AWS DataSync"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "Amazon EventBridge can capture SageMaker job state change events, and Amazon SNS can send notifications to email or other subscribers when failures occur.",
    optionExplanations: [
      "Amazon EventBridge and Amazon SNS: ✓ Correct. EventBridge captures SageMaker job events and SNS delivers notifications with minimal custom implementation.",
      "Amazon Kinesis Data Streams and AWS Glue: Incorrect. These services are for streaming ingestion and ETL, not native alerting on SageMaker job state changes.",
      "Amazon Route 53 and AWS WAF: Incorrect. Route 53 and WAF are networking and web protection services, not job monitoring and notification tools.",
      "Amazon EFS and AWS DataSync: Incorrect. These services provide storage and data transfer capabilities and do not monitor SageMaker job failures."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/automating-sagemaker-with-eventbridge.html", title: "Automate Amazon SageMaker with Amazon EventBridge" }
    ]
  },
  {
    id: 19,
    question: "A company needs an audit trail of API activity related to SageMaker training jobs, endpoint creation, and other ML resource changes for compliance purposes. Which AWS service should be enabled?",
    options: [
      "AWS CloudTrail",
      "Amazon Rekognition",
      "AWS Lake Formation",
      "Amazon Polly"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS CloudTrail records API activity across AWS services, including SageMaker operations such as training job creation, endpoint updates, and other control-plane actions needed for auditing.",
    optionExplanations: [
      "AWS CloudTrail: ✓ Correct. CloudTrail provides the audit logs required for compliance and traceability of SageMaker API operations.",
      "Amazon Rekognition: Incorrect. Rekognition is a computer vision service and does not capture API audit trails for SageMaker resources.",
      "AWS Lake Formation: Incorrect. Lake Formation governs data lake permissions and is unrelated to auditing SageMaker API activity.",
      "Amazon Polly: Incorrect. Polly is a text-to-speech service and has no auditing role here."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/logging-using-cloudtrail.html", title: "Log Amazon SageMaker API Calls Using AWS CloudTrail" }
    ]
  },
  {
    id: 20,
    question: "A company wants to enforce least-privilege access for users and applications that interact with ML artifacts, training jobs, and deployment resources in AWS. Which security best practice should be applied?",
    options: [
      "Create IAM roles and policies that grant only the minimum required permissions",
      "Assign full AdministratorAccess to all ML users",
      "Store credentials in plaintext in the training script",
      "Use one shared root account for all deployments"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "Least privilege in AWS is implemented by creating IAM roles and policies that allow only the actions and resources needed for each user, service, or application.",
    optionExplanations: [
      "Create IAM roles and policies that grant only the minimum required permissions: ✓ Correct. This is the core AWS security best practice for protecting ML resources and artifacts.",
      "Assign full AdministratorAccess to all ML users: Incorrect. Broad administrative permissions violate least privilege and increase security risk.",
      "Store credentials in plaintext in the training script: Incorrect. Plaintext credentials are insecure and should never be embedded in code.",
      "Use one shared root account for all deployments: Incorrect. The root account should not be used for routine operations, and sharing it creates severe security and auditability issues."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html", title: "Security Best Practices in IAM" }
    ]
  },
  {
    id: 21,
    question: "A machine learning engineer wants to compare the performance of two production model variants by sending a portion of live traffic to each model and analyzing the results. Which SageMaker capability supports this use case?",
    options: [
      "SageMaker endpoint production variants for A/B testing",
      "SageMaker Ground Truth",
      "AWS CloudFormation drift detection",
      "Amazon S3 Object Lock"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "SageMaker endpoints support multiple production variants, allowing teams to route portions of traffic to different models and compare latency, errors, and business metrics as part of A/B testing.",
    optionExplanations: [
      "SageMaker endpoint production variants for A/B testing: ✓ Correct. Production variants allow controlled traffic splitting across models so teams can compare model behavior in production.",
      "SageMaker Ground Truth: Incorrect. Ground Truth is used for data labeling, not online traffic splitting between deployed models.",
      "AWS CloudFormation drift detection: Incorrect. Drift detection identifies configuration differences in infrastructure stacks and does not compare live model variants.",
      "Amazon S3 Object Lock: Incorrect. Object Lock protects S3 objects from deletion or modification and is unrelated to model variant testing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-ab-testing.html", title: "Test Models in Production" }
    ]
  },
  {
    id: 22,
    question: "A team needs to understand which input features most influenced a model's prediction after deployment. Which SageMaker capability should they use?",
    options: [
      "SageMaker Clarify explainability",
      "Amazon Textract",
      "AWS Cost Explorer",
      "Amazon ECR"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "SageMaker Clarify provides model explainability features that help teams understand feature importance and the impact of input attributes on model predictions.",
    optionExplanations: [
      "SageMaker Clarify explainability: ✓ Correct. Clarify can generate feature attribution reports to explain model predictions.",
      "Amazon Textract: Incorrect. Textract extracts text and data from documents but does not explain ML predictions.",
      "AWS Cost Explorer: Incorrect. Cost Explorer analyzes AWS spending, not feature attribution in ML models.",
      "Amazon ECR: Incorrect. ECR stores container images and has no model explainability capability."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-explainability.html", title: "Explainability with SageMaker Clarify" }
    ]
  },
  {
    id: 23,
    question: "A machine learning engineer needs to troubleshoot model convergence problems during training and inspect tensors, gradients, and other internal states. Which SageMaker feature is designed for this task?",
    options: [
      "SageMaker Debugger",
      "Amazon Macie",
      "AWS CodeDeploy",
      "Amazon SQS"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "SageMaker Debugger captures training data such as tensors and gradients and applies rules to detect issues like overfitting, vanishing gradients, and poor convergence during training.",
    optionExplanations: [
      "SageMaker Debugger: ✓ Correct. Debugger is built to inspect internal training behavior and identify convergence-related issues.",
      "Amazon Macie: Incorrect. Macie discovers sensitive data in S3 and does not inspect model training internals.",
      "AWS CodeDeploy: Incorrect. CodeDeploy automates software deployments and is not a training diagnostics tool.",
      "Amazon SQS: Incorrect. SQS is a queueing service and has no role in debugging model convergence."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/train-debugger.html", title: "Debug Amazon SageMaker Training Jobs with Debugger" }
    ]
  },
  {
    id: 24,
    question: "A team is building an ML deployment pipeline and wants to provision the required AWS infrastructure in a repeatable, version-controlled way. Which approach is MOST appropriate?",
    options: [
      "Use Infrastructure as Code with AWS CloudFormation or AWS CDK",
      "Manually create all resources in the console each time",
      "Store infrastructure screenshots in Amazon S3",
      "Use Amazon QuickSight dashboards to deploy resources"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Infrastructure as Code using AWS CloudFormation or AWS CDK enables repeatable, version-controlled provisioning of ML infrastructure and aligns with CI/CD best practices.",
    optionExplanations: [
      "Use Infrastructure as Code with AWS CloudFormation or AWS CDK: ✓ Correct. IaC provides consistent, automated, and auditable infrastructure deployment.",
      "Manually create all resources in the console each time: Incorrect. Manual provisioning is error-prone and does not support repeatability or version control.",
      "Store infrastructure screenshots in Amazon S3: Incorrect. Screenshots do not provision or manage infrastructure.",
      "Use Amazon QuickSight dashboards to deploy resources: Incorrect. QuickSight is an analytics service, not an infrastructure provisioning tool."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/infrastructure-as-code.html", title: "Infrastructure as Code on AWS" }
    ]
  },
  {
    id: 25,
    question: "A company wants to automate model build, test, and deployment stages whenever code changes are pushed to its repository. Which AWS service is designed to orchestrate these CI/CD stages?",
    options: [
      "AWS CodePipeline",
      "Amazon Athena",
      "AWS Storage Gateway",
      "Amazon Polly"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "AWS CodePipeline is a continuous integration and continuous delivery service that orchestrates source, build, test, and deployment stages for software and ML workflows.",
    optionExplanations: [
      "AWS CodePipeline: ✓ Correct. CodePipeline coordinates automated CI/CD stages and integrates with services such as CodeBuild and deployment targets.",
      "Amazon Athena: Incorrect. Athena is a query service for S3 data and does not orchestrate CI/CD pipelines.",
      "AWS Storage Gateway: Incorrect. Storage Gateway connects on-premises environments to AWS storage and is unrelated to CI/CD orchestration.",
      "Amazon Polly: Incorrect. Polly is a text-to-speech service and has no CI/CD orchestration role."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html", title: "What Is AWS CodePipeline?" }
    ]
  },
  {
    id: 26,
    question: "A machine learning team needs to build and publish a custom Docker image for SageMaker training and inference. Which AWS service should be used to store and manage the container image?",
    options: [
      "Amazon Elastic Container Registry (Amazon ECR)",
      "Amazon DynamoDB",
      "Amazon Redshift",
      "AWS Organizations"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon ECR is the managed AWS container registry service used to store, version, and manage Docker images for services such as SageMaker, ECS, and EKS.",
    optionExplanations: [
      "Amazon Elastic Container Registry (Amazon ECR): ✓ Correct. ECR is purpose-built for storing and managing container images used in SageMaker workflows.",
      "Amazon DynamoDB: Incorrect. DynamoDB is a NoSQL database and does not act as a container image registry.",
      "Amazon Redshift: Incorrect. Redshift is a data warehouse, not a container registry.",
      "AWS Organizations: Incorrect. Organizations manages multi-account governance and does not store container images."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html", title: "What Is Amazon Elastic Container Registry?" }
    ]
  },
  {
    id: 27,
    question: "A team wants to create a dashboard to visualize endpoint latency, invocation counts, and related operational metrics for ML workloads. Which AWS service is BEST suited for building this dashboard?",
    options: [
      "Amazon CloudWatch",
      "AWS Secrets Manager",
      "Amazon Mechanical Turk",
      "AWS CodeCommit"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "Amazon CloudWatch provides metrics, dashboards, alarms, and logs that can be used to monitor ML endpoints and infrastructure performance.",
    optionExplanations: [
      "Amazon CloudWatch: ✓ Correct. CloudWatch dashboards are the standard AWS-native way to visualize metrics such as latency and invocation counts.",
      "AWS Secrets Manager: Incorrect. Secrets Manager stores secrets and does not provide operational dashboards.",
      "Amazon Mechanical Turk: Incorrect. Mechanical Turk is a crowdsourcing service and is not used for infrastructure monitoring.",
      "AWS CodeCommit: Incorrect. CodeCommit is a source control service and not a monitoring dashboard solution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html", title: "Use CloudWatch Dashboards" }
    ]
  },
  {
    id: 28,
    question: "A machine learning engineer wants to find the most cost-effective SageMaker instance type for an inference workload while still meeting performance requirements. Which SageMaker capability can help with this recommendation?",
    options: [
      "SageMaker Inference Recommender",
      "Amazon Inspector",
      "AWS Config Rules",
      "Amazon S3 Object Lambda"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "SageMaker Inference Recommender helps identify suitable instance types and configurations for inference workloads based on performance and cost considerations.",
    optionExplanations: [
      "SageMaker Inference Recommender: ✓ Correct. It evaluates inference performance and helps recommend instance types that balance latency, throughput, and cost.",
      "Amazon Inspector: Incorrect. Inspector scans for software vulnerabilities and does not recommend inference instance sizes.",
      "AWS Config Rules: Incorrect. Config Rules evaluate resource compliance, not ML inference sizing.",
      "Amazon S3 Object Lambda: Incorrect. S3 Object Lambda transforms S3 objects during retrieval and is unrelated to endpoint sizing recommendations."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/inference-recommender.html", title: "Amazon SageMaker Inference Recommender" }
    ]
  },
  {
    id: 29,
    question: "A company wants to track ML infrastructure costs by project, team, and environment for chargeback reporting. Which practice should the engineering team implement?",
    options: [
      "Apply a consistent resource tagging strategy",
      "Disable CloudWatch metrics",
      "Use a single shared IAM user for all teams",
      "Store all reports only in local spreadsheets"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "Consistent tagging of AWS resources enables cost allocation, filtering, and reporting by dimensions such as project, team, and environment in AWS cost management tools.",
    optionExplanations: [
      "Apply a consistent resource tagging strategy: ✓ Correct. Tags enable cost allocation and make it possible to analyze infrastructure spending by business-relevant categories.",
      "Disable CloudWatch metrics: Incorrect. Disabling metrics does not improve cost allocation visibility.",
      "Use a single shared IAM user for all teams: Incorrect. Shared users reduce accountability and do not support cost tracking by team.",
      "Store all reports only in local spreadsheets: Incorrect. Local spreadsheets do not provide automated AWS-native cost allocation or tracking."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/building-a-cost-allocation-strategy.html", title: "Building a Cost Allocation Strategy" }
    ]
  },
  {
    id: 30,
    question: "A machine learning team wants to set spending thresholds and receive notifications before monthly ML infrastructure costs exceed the budget. Which AWS service should the team use?",
    options: [
      "AWS Budgets",
      "Amazon Bedrock",
      "AWS X-Ray",
      "Amazon Neptune"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS Budgets allows teams to define cost or usage budgets and receive alerts when actual or forecasted spending approaches or exceeds defined thresholds.",
    optionExplanations: [
      "AWS Budgets: ✓ Correct. AWS Budgets is designed to set spending limits and send alerts based on actual or forecasted cost and usage.",
      "Amazon Bedrock: Incorrect. Bedrock provides foundation model capabilities and is not a budgeting or alerting service for AWS costs.",
      "AWS X-Ray: Incorrect. X-Ray traces distributed applications and does not provide budget notifications.",
      "Amazon Neptune: Incorrect. Neptune is a graph database and has no cost budget alerting function."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html", title: "Managing Your Costs with AWS Budgets" }
    ]
  },
  {
    id: 31,
    question: "A machine learning engineer needs to merge data from multiple sources in Amazon S3 and apply large-scale transformations using Apache Spark before training a model. Which AWS service is the MOST appropriate choice?",
    options: [
      "Amazon EMR",
      "Amazon SNS",
      "AWS Secrets Manager",
      "Amazon Route 53"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon EMR is a managed big data platform that can run Apache Spark for large-scale data processing, transformation, and merging tasks commonly needed in ML data preparation.",
    optionExplanations: [
      "Amazon EMR: ✓ Correct. EMR is ideal for distributed Spark processing of large datasets stored in Amazon S3.",
      "Amazon SNS: Incorrect. SNS is a notification service and does not perform distributed data transformations.",
      "AWS Secrets Manager: Incorrect. Secrets Manager stores secrets and has no data processing capability.",
      "Amazon Route 53: Incorrect. Route 53 is a DNS service and is unrelated to Spark-based data preparation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-gs.html", title: "Amazon EMR Getting Started" }
    ]
  },
  {
    id: 32,
    question: "A team needs to store training data in a format that reduces storage size and improves analytics query performance compared with CSV. Which format is the BEST choice?",
    options: [
      "Apache Parquet",
      "Plain text",
      "BMP",
      "XML"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Apache Parquet is a columnar storage format that typically provides better compression and query performance than row-based text formats such as CSV.",
    optionExplanations: [
      "Apache Parquet: ✓ Correct. Parquet is optimized for analytical workloads and often reduces storage and scan costs.",
      "Plain text: Incorrect. Plain text lacks efficient compression and columnar access benefits for analytics workloads.",
      "BMP: Incorrect. BMP is an image file format and is not appropriate for structured training data storage.",
      "XML: Incorrect. XML is verbose and generally less efficient than Parquet for analytical data storage."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html", title: "Use Columnar Storage Formats" }
    ]
  },
  {
    id: 33,
    question: "A company receives streaming clickstream events that must be ingested continuously for feature generation and near real-time ML applications. Which AWS service is BEST suited for this ingestion layer?",
    options: [
      "Amazon Kinesis",
      "Amazon S3 Glacier Deep Archive",
      "AWS Artifact",
      "Amazon WorkSpaces"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon Kinesis services are designed for ingesting and processing streaming data such as clickstream events for real-time analytics and ML pipelines.",
    optionExplanations: [
      "Amazon Kinesis: ✓ Correct. Kinesis provides managed streaming ingestion for near real-time data processing and ML use cases.",
      "Amazon S3 Glacier Deep Archive: Incorrect. Glacier Deep Archive is archival storage and is not suitable for streaming ingestion.",
      "AWS Artifact: Incorrect. Artifact provides access to compliance reports and agreements, not data streaming capabilities.",
      "Amazon WorkSpaces: Incorrect. WorkSpaces is a virtual desktop service and is unrelated to event ingestion."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/streams/latest/dev/introduction.html", title: "What Is Amazon Kinesis Data Streams?" }
    ]
  },
  {
    id: 34,
    question: "A machine learning engineer needs to validate dataset quality rules such as completeness and value ranges before model training. Which AWS feature provides built-in data quality checks for this purpose?",
    options: [
      "AWS Glue Data Quality",
      "Amazon Inspector",
      "AWS WAF",
      "Amazon CloudFront"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "AWS Glue Data Quality provides built-in rule-based checks to validate datasets for issues such as missing values, invalid ranges, and other quality concerns before downstream ML use.",
    optionExplanations: [
      "AWS Glue Data Quality: ✓ Correct. It lets teams define and evaluate dataset quality rules before training or analytics tasks.",
      "Amazon Inspector: Incorrect. Inspector scans workloads for software vulnerabilities, not dataset quality rules.",
      "AWS WAF: Incorrect. WAF protects web applications and does not validate training datasets.",
      "Amazon CloudFront: Incorrect. CloudFront is a CDN and has no data quality rule engine."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html", title: "AWS Glue Data Quality" }
    ]
  },
  {
    id: 35,
    question: "A company must detect and protect personally identifiable information (PII) stored in Amazon S3 training datasets before those datasets are used in ML workflows. Which AWS service should be used?",
    options: [
      "Amazon Macie",
      "Amazon Polly",
      "AWS Batch",
      "Amazon MQ"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon Macie uses machine learning and pattern matching to discover and classify sensitive data such as PII in Amazon S3.",
    optionExplanations: [
      "Amazon Macie: ✓ Correct. Macie is the AWS service for identifying and classifying sensitive data in S3 buckets.",
      "Amazon Polly: Incorrect. Polly converts text to speech and does not scan datasets for PII.",
      "AWS Batch: Incorrect. Batch runs compute jobs but does not provide managed PII discovery features.",
      "Amazon MQ: Incorrect. Amazon MQ is a managed message broker service and is unrelated to S3 data classification."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html", title: "What Is Amazon Macie?" }
    ]
  },
  {
    id: 36,
    question: "A team wants to solve a common business language translation use case without building and training a custom machine learning model. Which AWS service is the BEST fit?",
    options: [
      "Amazon Translate",
      "Amazon EMR",
      "AWS CloudTrail",
      "Amazon EFS"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Translate is a prebuilt AI service for language translation and is often the most appropriate choice when a business problem can be solved without custom model development.",
    optionExplanations: [
      "Amazon Translate: ✓ Correct. Translate is a managed AI service that solves language translation problems without requiring custom ML training.",
      "Amazon EMR: Incorrect. EMR is a big data processing platform and does not provide a managed translation API.",
      "AWS CloudTrail: Incorrect. CloudTrail records API activity and does not perform translation.",
      "Amazon EFS: Incorrect. EFS is a file storage service and not a language translation solution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/translate/latest/dg/what-is.html", title: "What Is Amazon Translate?" }
    ]
  },
  {
    id: 37,
    question: "A machine learning engineer wants to use a fully managed speech-to-text AI service instead of building a custom transcription model. Which AWS service should the engineer choose?",
    options: [
      "Amazon Transcribe",
      "Amazon SQS",
      "AWS Direct Connect",
      "Amazon ElastiCache"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Transcribe is a fully managed automatic speech recognition service that converts audio to text without requiring custom model development.",
    optionExplanations: [
      "Amazon Transcribe: ✓ Correct. Transcribe is the AWS managed service for speech-to-text workloads.",
      "Amazon SQS: Incorrect. SQS is a message queue and does not perform transcription.",
      "AWS Direct Connect: Incorrect. Direct Connect provides dedicated network connectivity and is unrelated to speech recognition.",
      "Amazon ElastiCache: Incorrect. ElastiCache provides in-memory caching and does not transcribe audio."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html", title: "What Is Amazon Transcribe?" }
    ]
  },
  {
    id: 38,
    question: "A company needs to analyze images and detect objects without creating a custom computer vision model. Which AWS service is MOST appropriate?",
    options: [
      "Amazon Rekognition",
      "AWS CodeArtifact",
      "Amazon RDS",
      "AWS Budgets"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Rekognition is a managed AI service for image and video analysis, including object and scene detection, without requiring custom model training for common use cases.",
    optionExplanations: [
      "Amazon Rekognition: ✓ Correct. Rekognition provides prebuilt computer vision capabilities such as object detection and image analysis.",
      "AWS CodeArtifact: Incorrect. CodeArtifact is a package repository and does not analyze images.",
      "Amazon RDS: Incorrect. RDS is a relational database service and is unrelated to computer vision inference.",
      "AWS Budgets: Incorrect. Budgets manages spending alerts and does not process images."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html", title: "What Is Amazon Rekognition?" }
    ]
  },
  {
    id: 39,
    question: "A team wants to orchestrate complex multi-step ML workflows outside SageMaker-native pipelines using a managed Apache Airflow service. Which AWS service should they use?",
    options: [
      "Amazon Managed Workflows for Apache Airflow (Amazon MWAA)",
      "Amazon Route 53 Resolver",
      "AWS Organizations",
      "Amazon Cognito"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon MWAA is the managed AWS service for Apache Airflow and can orchestrate complex multi-step ML and data workflows.",
    optionExplanations: [
      "Amazon Managed Workflows for Apache Airflow (Amazon MWAA): ✓ Correct. MWAA provides managed Apache Airflow for orchestrating workflows without managing the Airflow control plane yourself.",
      "Amazon Route 53 Resolver: Incorrect. Route 53 Resolver handles DNS resolution and does not orchestrate ML pipelines.",
      "AWS Organizations: Incorrect. Organizations manages AWS accounts and governance, not workflow orchestration.",
      "Amazon Cognito: Incorrect. Cognito handles application identity and authentication, not ML workflow orchestration."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/mwaa/latest/userguide/what-is-mwaa.html", title: "What Is Amazon MWAA?" }
    ]
  },
  {
    id: 40,
    question: "A machine learning pipeline needs to trigger retraining automatically on a schedule without manual intervention. Which AWS service can provide the scheduled event trigger?",
    options: [
      "Amazon EventBridge",
      "Amazon WorkMail",
      "AWS Artifact",
      "Amazon Connect"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon EventBridge supports scheduled rules that can trigger retraining jobs, workflows, or downstream automation at defined intervals.",
    optionExplanations: [
      "Amazon EventBridge: ✓ Correct. EventBridge can create scheduled triggers for retraining workflows and other automation tasks.",
      "Amazon WorkMail: Incorrect. WorkMail is an email and calendaring service and is unrelated to ML retraining triggers.",
      "AWS Artifact: Incorrect. Artifact provides compliance documents and agreements, not scheduled events.",
      "Amazon Connect: Incorrect. Connect is a contact center service and does not schedule ML retraining jobs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html", title: "Create a Rule That Runs on a Schedule" }
    ]
  },
  {
    id: 41,
    question: "A machine learning engineer needs shared file storage for training workloads running across multiple compute instances. Which AWS storage service is MOST appropriate for this use case?",
    options: [
      "Amazon EFS",
      "Amazon SQS",
      "AWS Shield",
      "Amazon API Gateway"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon EFS provides scalable shared file storage that can be mounted concurrently by multiple compute instances, making it suitable for distributed ML training workloads that need shared access to data or artifacts.",
    optionExplanations: [
      "Amazon EFS: ✓ Correct. EFS is a managed network file system that supports concurrent access from multiple instances.",
      "Amazon SQS: Incorrect. SQS is a message queue and does not provide shared file storage.",
      "AWS Shield: Incorrect. Shield provides DDoS protection and is unrelated to training data storage.",
      "Amazon API Gateway: Incorrect. API Gateway manages APIs and does not provide a shared file system."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html", title: "What Is Amazon Elastic File System?" }
    ]
  },
  {
    id: 42,
    question: "A team needs a high-performance shared file system for demanding ML training workloads that require high throughput and low latency. Which AWS storage service is the BEST fit?",
    options: [
      "Amazon FSx",
      "Amazon SNS",
      "AWS Budgets",
      "Amazon CloudFront"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon FSx provides high-performance file storage options suitable for demanding workloads, including ML training jobs that need fast, shared access to datasets.",
    optionExplanations: [
      "Amazon FSx: ✓ Correct. FSx offers high-performance shared file systems for demanding compute workloads.",
      "Amazon SNS: Incorrect. SNS is a notification service and not a file system.",
      "AWS Budgets: Incorrect. Budgets tracks spending and does not provide storage.",
      "Amazon CloudFront: Incorrect. CloudFront is a CDN and not shared training storage."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/fsx/latest/WhatIsFSx.html", title: "What Is Amazon FSx?" }
    ]
  },
  {
    id: 43,
    question: "A machine learning team wants to manage fine-grained permissions on data lake tables and columns used for ML analytics across multiple AWS accounts. Which AWS service should the team use?",
    options: [
      "AWS Lake Formation",
      "Amazon Route 53",
      "AWS CloudShell",
      "Amazon Lightsail"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS Lake Formation provides centralized governance and fine-grained access control for data lakes, including database, table, column, and cross-account permissions.",
    optionExplanations: [
      "AWS Lake Formation: ✓ Correct. Lake Formation is designed for centralized data lake governance with fine-grained access controls.",
      "Amazon Route 53: Incorrect. Route 53 is a DNS service and does not govern data lake permissions.",
      "AWS CloudShell: Incorrect. CloudShell provides browser-based shell access and is unrelated to data lake permission management.",
      "Amazon Lightsail: Incorrect. Lightsail is a simplified VPS service and not a data governance platform."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html", title: "What Is AWS Lake Formation?" }
    ]
  },
  {
    id: 44,
    question: "A company needs to store secrets such as database passwords and API keys used by ML pipelines securely instead of hardcoding them in scripts. Which AWS service is the BEST choice?",
    options: [
      "AWS Secrets Manager",
      "Amazon Inspector",
      "AWS Trusted Advisor",
      "Amazon Athena"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS Secrets Manager is designed to securely store, manage, and rotate secrets such as API keys, tokens, and database credentials used by applications and pipelines.",
    optionExplanations: [
      "AWS Secrets Manager: ✓ Correct. Secrets Manager securely stores and manages secrets without embedding them in code.",
      "Amazon Inspector: Incorrect. Inspector scans for vulnerabilities and does not function as a secret store.",
      "AWS Trusted Advisor: Incorrect. Trusted Advisor provides recommendations and checks, not secret storage.",
      "Amazon Athena: Incorrect. Athena is a query service and does not manage secrets."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html", title: "What Is AWS Secrets Manager?" }
    ]
  },
  {
    id: 45,
    question: "A machine learning engineer needs to encrypt training data and model artifacts at rest using customer-managed encryption keys. Which AWS service should be used to manage those keys?",
    options: [
      "AWS Key Management Service (AWS KMS)",
      "Amazon QuickSight",
      "AWS X-Ray",
      "Amazon SQS"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS KMS is the AWS service for creating and managing encryption keys used to protect data at rest across AWS services, including ML datasets and artifacts.",
    optionExplanations: [
      "AWS Key Management Service (AWS KMS): ✓ Correct. KMS manages encryption keys for secure data protection across AWS workloads.",
      "Amazon QuickSight: Incorrect. QuickSight is a BI service and does not manage encryption keys.",
      "AWS X-Ray: Incorrect. X-Ray traces application requests and is unrelated to key management.",
      "Amazon SQS: Incorrect. SQS is a queue service and not a KMS replacement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/overview.html", title: "What Is AWS Key Management Service?" }
    ]
  },
  {
    id: 46,
    question: "A company wants to evaluate where its AWS spend is going for ML resources and analyze historical usage patterns to identify optimization opportunities. Which AWS service is BEST suited for this analysis?",
    options: [
      "AWS Cost Explorer",
      "Amazon Lex",
      "AWS WAF",
      "Amazon MQ"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS Cost Explorer provides cost and usage analysis, trend visualization, and filtering capabilities to help teams understand historical spending and identify optimization opportunities.",
    optionExplanations: [
      "AWS Cost Explorer: ✓ Correct. Cost Explorer is the primary AWS service for visualizing and analyzing historical cost and usage data.",
      "Amazon Lex: Incorrect. Lex is a conversational AI service and does not analyze AWS spend.",
      "AWS WAF: Incorrect. WAF protects web applications and has no cost analysis role.",
      "Amazon MQ: Incorrect. Amazon MQ is a managed message broker and is unrelated to spend analysis."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html", title: "What Is Cost Explorer?" }
    ]
  },
  {
    id: 47,
    question: "A machine learning team wants architectural recommendations to improve cost efficiency, performance, security, and fault tolerance for its AWS environment. Which AWS service can provide these best-practice checks?",
    options: [
      "AWS Trusted Advisor",
      "Amazon Polly",
      "AWS DataSync",
      "Amazon ElastiCache"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS Trusted Advisor provides best-practice recommendations across categories such as cost optimization, performance, security, fault tolerance, and service limits.",
    optionExplanations: [
      "AWS Trusted Advisor: ✓ Correct. Trusted Advisor reviews AWS environments and recommends improvements based on AWS best practices.",
      "Amazon Polly: Incorrect. Polly is a text-to-speech service and does not perform architecture reviews.",
      "AWS DataSync: Incorrect. DataSync transfers data between storage systems and does not provide best-practice checks.",
      "Amazon ElastiCache: Incorrect. ElastiCache is a caching service and not an advisory tool."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html", title: "AWS Trusted Advisor" }
    ]
  },
  {
    id: 48,
    question: "A team wants to trace requests through components of an ML-backed application to diagnose latency bottlenecks and performance issues. Which AWS service should the team use?",
    options: [
      "AWS X-Ray",
      "Amazon Mechanical Turk",
      "Amazon Glacier",
      "AWS Artifact"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS X-Ray provides distributed tracing that helps teams analyze request flows, latency, and bottlenecks across application components.",
    optionExplanations: [
      "AWS X-Ray: ✓ Correct. X-Ray traces requests across services to help troubleshoot latency and performance issues.",
      "Amazon Mechanical Turk: Incorrect. Mechanical Turk is a human task marketplace and does not trace application requests.",
      "Amazon Glacier: Incorrect. Glacier is archival storage and has no tracing capability.",
      "AWS Artifact: Incorrect. Artifact provides compliance documents and agreements, not distributed tracing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html", title: "What Is AWS X-Ray?" }
    ]
  },
  {
    id: 49,
    question: "A machine learning team wants a fully managed service to build conversational chatbots without training a custom natural language understanding model from scratch. Which AWS service should the team choose?",
    options: [
      "Amazon Lex",
      "AWS CloudTrail",
      "Amazon S3 Glacier",
      "AWS Backup"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Lex is a managed conversational AI service for building chatbots and voice assistants using automatic speech recognition and natural language understanding.",
    optionExplanations: [
      "Amazon Lex: ✓ Correct. Lex provides built-in conversational AI capabilities for chatbot use cases.",
      "AWS CloudTrail: Incorrect. CloudTrail logs API activity and does not build chatbots.",
      "Amazon S3 Glacier: Incorrect. Glacier is archival storage and is unrelated to conversational AI.",
      "AWS Backup: Incorrect. AWS Backup manages backups and does not provide chatbot functionality."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lex/latest/dg/what-is.html", title: "What Is Amazon Lex?" }
    ]
  },
  {
    id: 50,
    question: "A team wants to extract text and structured fields from scanned documents as part of an ML document-processing workflow. Which AWS service is the MOST appropriate choice?",
    options: [
      "Amazon Textract",
      "Amazon Route 53",
      "AWS Organizations",
      "Amazon EBS"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Textract is a managed AI service that automatically extracts printed text, handwriting, and structured data such as forms and tables from documents.",
    optionExplanations: [
      "Amazon Textract: ✓ Correct. Textract is purpose-built for extracting text and structured content from scanned documents.",
      "Amazon Route 53: Incorrect. Route 53 is a DNS service and does not analyze document content.",
      "AWS Organizations: Incorrect. Organizations manages account governance and is unrelated to document extraction.",
      "Amazon EBS: Incorrect. EBS is block storage and does not perform OCR or document analysis."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/textract/latest/dg/what-is.html", title: "What Is Amazon Textract?" }
    ]
  },
  {
    id: 51,
    question: "A machine learning engineer needs to orchestrate several serverless workflow steps, including data validation, model training, and notification logic, using conditional branching and retries. Which AWS service is the BEST fit?",
    options: [
      "AWS Step Functions",
      "Amazon S3",
      "AWS KMS",
      "Amazon CloudFront"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "AWS Step Functions is designed to orchestrate multi-step workflows with branching, retries, and error handling across AWS services, making it a strong fit for ML workflow automation.",
    optionExplanations: [
      "AWS Step Functions: ✓ Correct. Step Functions natively supports stateful orchestration, branching, retries, and service integrations for ML workflows.",
      "Amazon S3: Incorrect. S3 stores objects but does not orchestrate workflow steps.",
      "AWS KMS: Incorrect. KMS manages encryption keys and does not run multi-step workflows.",
      "Amazon CloudFront: Incorrect. CloudFront is a CDN and is unrelated to workflow orchestration."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html", title: "What Is AWS Step Functions?" }
    ]
  },
  {
    id: 52,
    question: "A team needs to decouple components in an ML pipeline by storing messages until downstream consumers are ready to process them. Which AWS service should the team use?",
    options: [
      "Amazon SQS",
      "Amazon EFS",
      "AWS CloudTrail",
      "Amazon Redshift"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon SQS is a managed message queue service that decouples components and buffers messages until consuming systems are ready to process them.",
    optionExplanations: [
      "Amazon SQS: ✓ Correct. SQS is purpose-built for decoupling distributed systems through reliable message queues.",
      "Amazon EFS: Incorrect. EFS is shared file storage and not a message queue.",
      "AWS CloudTrail: Incorrect. CloudTrail logs API activity and does not buffer messages for processing.",
      "Amazon Redshift: Incorrect. Redshift is a data warehouse and not a queueing service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html", title: "What Is Amazon SQS?" }
    ]
  },
  {
    id: 53,
    question: "An ML platform team wants to send email notifications whenever a model training pipeline completes successfully or fails. Which AWS service is the MOST appropriate for the notification layer?",
    options: [
      "Amazon SNS",
      "Amazon DynamoDB",
      "AWS Config",
      "Amazon EBS"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon SNS is a managed pub/sub messaging service that can deliver notifications to email subscribers and other endpoints when ML workflow events occur.",
    optionExplanations: [
      "Amazon SNS: ✓ Correct. SNS is the standard AWS service for push notifications to email, SMS, and other subscribers.",
      "Amazon DynamoDB: Incorrect. DynamoDB is a NoSQL database and does not serve as a notification delivery service.",
      "AWS Config: Incorrect. Config tracks resource configuration changes and does not provide workflow email notifications.",
      "Amazon EBS: Incorrect. EBS is block storage and unrelated to notification delivery."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sns/latest/dg/welcome.html", title: "What Is Amazon SNS?" }
    ]
  },
  {
    id: 54,
    question: "A machine learning engineer needs a scalable NoSQL database to store feature lookup data for low-latency inference requests. Which AWS service is the BEST fit?",
    options: [
      "Amazon DynamoDB",
      "Amazon WorkDocs",
      "AWS Artifact",
      "Amazon Simple Email Service"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon DynamoDB is a fully managed NoSQL database that provides single-digit millisecond performance at scale, making it suitable for low-latency feature lookups.",
    optionExplanations: [
      "Amazon DynamoDB: ✓ Correct. DynamoDB is well suited for high-scale, low-latency key-value or document lookups used by inference services.",
      "Amazon WorkDocs: Incorrect. WorkDocs is a content collaboration service and not a low-latency NoSQL database.",
      "AWS Artifact: Incorrect. Artifact provides compliance reports and agreements, not application data storage.",
      "Amazon Simple Email Service: Incorrect. SES sends email and does not store feature lookup data."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html", title: "What Is Amazon DynamoDB?" }
    ]
  },
  {
    id: 55,
    question: "A team needs a managed relational database to store metadata for ML experiments and application configuration data that requires SQL queries. Which AWS service should they choose?",
    options: [
      "Amazon RDS",
      "Amazon Kinesis Video Streams",
      "AWS Shield",
      "Amazon Polly"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon RDS is a managed relational database service that supports SQL-based workloads and is suitable for structured application or experiment metadata.",
    optionExplanations: [
      "Amazon RDS: ✓ Correct. RDS is the AWS managed service for relational databases that require SQL querying and structured schemas.",
      "Amazon Kinesis Video Streams: Incorrect. Kinesis Video Streams is for video ingestion and streaming, not relational metadata storage.",
      "AWS Shield: Incorrect. Shield provides DDoS protection and does not store relational data.",
      "Amazon Polly: Incorrect. Polly is a text-to-speech service and unrelated to relational databases."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html", title: "What Is Amazon RDS?" }
    ]
  },
  {
    id: 56,
    question: "A company wants to query large amounts of data in Amazon S3 with standard SQL without provisioning or managing infrastructure. Which AWS service is MOST appropriate?",
    options: [
      "Amazon Athena",
      "Amazon Route 53",
      "AWS Secrets Manager",
      "Amazon MQ"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon Athena is a serverless interactive query service that allows teams to run SQL queries directly against data stored in Amazon S3.",
    optionExplanations: [
      "Amazon Athena: ✓ Correct. Athena enables serverless SQL queries over S3 data with no infrastructure to manage.",
      "Amazon Route 53: Incorrect. Route 53 is a DNS service and does not query data in S3.",
      "AWS Secrets Manager: Incorrect. Secrets Manager stores secrets and does not execute SQL queries over data lakes.",
      "Amazon MQ: Incorrect. Amazon MQ is a message broker and is unrelated to serverless SQL analytics."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html", title: "What Is Amazon Athena?" }
    ]
  },
  {
    id: 57,
    question: "A machine learning team needs a fully managed data warehouse to store curated analytical data for reporting and downstream ML feature analysis. Which AWS service should the team use?",
    options: [
      "Amazon Redshift",
      "Amazon EventBridge",
      "AWS WAF",
      "Amazon Elastic File System"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon Redshift is a fully managed cloud data warehouse optimized for analytical queries on structured and semi-structured datasets.",
    optionExplanations: [
      "Amazon Redshift: ✓ Correct. Redshift is built for analytical warehousing and reporting workloads.",
      "Amazon EventBridge: Incorrect. EventBridge is an event bus and does not function as a data warehouse.",
      "AWS WAF: Incorrect. WAF is a web application firewall and unrelated to analytical storage.",
      "Amazon Elastic File System: Incorrect. EFS is file storage and not a warehouse optimized for SQL analytics."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html", title: "What Is Amazon Redshift?" }
    ]
  },
  {
    id: 58,
    question: "A machine learning engineer wants to deploy a custom containerized inference application on Kubernetes instead of using SageMaker hosting. Which AWS service is the BEST fit?",
    options: [
      "Amazon EKS",
      "Amazon S3 Glacier",
      "AWS Budgets",
      "Amazon Translate"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon EKS is the managed Kubernetes service on AWS and is suitable for deploying containerized inference applications that require Kubernetes orchestration.",
    optionExplanations: [
      "Amazon EKS: ✓ Correct. EKS provides managed Kubernetes for deploying and scaling custom containerized applications.",
      "Amazon S3 Glacier: Incorrect. Glacier is archival storage and cannot host containerized inference services.",
      "AWS Budgets: Incorrect. Budgets tracks costs and does not run containers.",
      "Amazon Translate: Incorrect. Translate is an AI service and not a container orchestration platform."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html", title: "What Is Amazon EKS?" }
    ]
  },
  {
    id: 59,
    question: "A team wants to deploy containerized ML services without managing Kubernetes but still use a fully managed container orchestration service. Which AWS service should they choose?",
    options: [
      "Amazon ECS",
      "Amazon Macie",
      "AWS CloudTrail",
      "Amazon EFS"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon ECS is a fully managed container orchestration service that simplifies running containerized applications without requiring Kubernetes management.",
    optionExplanations: [
      "Amazon ECS: ✓ Correct. ECS is ideal for running containerized ML services without managing Kubernetes control planes.",
      "Amazon Macie: Incorrect. Macie classifies sensitive data in S3 and does not run containers.",
      "AWS CloudTrail: Incorrect. CloudTrail logs API activity and does not host services.",
      "Amazon EFS: Incorrect. EFS is shared file storage and not a container orchestration platform."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html", title: "What Is Amazon Elastic Container Service?" }
    ]
  },
  {
    id: 60,
    question: "A machine learning engineer needs to build a lightweight event-driven inference API with minimal infrastructure management using a function-as-a-service model. Which AWS service is MOST appropriate?",
    options: [
      "AWS Lambda",
      "Amazon Redshift",
      "AWS Direct Connect",
      "Amazon FSx"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "AWS Lambda is a serverless compute service that is well suited for lightweight event-driven inference or preprocessing APIs without managing servers.",
    optionExplanations: [
      "AWS Lambda: ✓ Correct. Lambda enables event-driven serverless execution with minimal operational overhead.",
      "Amazon Redshift: Incorrect. Redshift is a data warehouse and not a function-as-a-service platform.",
      "AWS Direct Connect: Incorrect. Direct Connect provides dedicated network connectivity and cannot run inference code.",
      "Amazon FSx: Incorrect. FSx is shared file storage and does not provide serverless compute."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html", title: "What Is AWS Lambda?" }
    ]
  },
  {
    id: 61,
    question: "A machine learning engineer needs to move large datasets from an on-premises NFS file server into Amazon S3 for model training. Which AWS service is the BEST fit for this transfer?",
    options: [
      "AWS DataSync",
      "Amazon Lex",
      "AWS WAF",
      "Amazon SNS"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "AWS DataSync is a managed data transfer service designed to move large amounts of data between on-premises storage systems and AWS storage services such as Amazon S3.",
    optionExplanations: [
      "AWS DataSync: ✓ Correct. DataSync is purpose-built for efficient large-scale file transfer from on-premises storage to AWS.",
      "Amazon Lex: Incorrect. Lex is a conversational AI service and does not perform bulk data transfer.",
      "AWS WAF: Incorrect. WAF is a web application firewall and is unrelated to data migration.",
      "Amazon SNS: Incorrect. SNS provides notifications and does not transfer file datasets."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html", title: "What Is AWS DataSync?" }
    ]
  },
  {
    id: 62,
    question: "A company needs a dedicated private network connection from its data center to AWS to support high-throughput transfer of ML training data. Which AWS service should be used?",
    options: [
      "AWS Direct Connect",
      "Amazon CloudFront",
      "Amazon WorkSpaces",
      "AWS Trusted Advisor"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "AWS Direct Connect provides a dedicated network connection from an on-premises environment to AWS, which can improve throughput consistency and reduce internet-based network variability.",
    optionExplanations: [
      "AWS Direct Connect: ✓ Correct. Direct Connect is designed for private, dedicated connectivity between on-premises infrastructure and AWS.",
      "Amazon CloudFront: Incorrect. CloudFront is a CDN for content delivery, not dedicated private network connectivity.",
      "Amazon WorkSpaces: Incorrect. WorkSpaces is a virtual desktop service and not a networking solution.",
      "AWS Trusted Advisor: Incorrect. Trusted Advisor provides recommendations, not network connectivity."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html", title: "What Is AWS Direct Connect?" }
    ]
  },
  {
    id: 63,
    question: "A team needs to expose a custom ML inference service through a managed API layer with request routing, throttling, and authentication support. Which AWS service is the BEST fit?",
    options: [
      "Amazon API Gateway",
      "Amazon EFS",
      "AWS Config",
      "Amazon S3 Glacier"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon API Gateway provides a managed front door for APIs with features such as request routing, throttling, authorization, and integration with backend services including Lambda and HTTP endpoints.",
    optionExplanations: [
      "Amazon API Gateway: ✓ Correct. API Gateway is purpose-built for publishing and managing APIs for backend inference services.",
      "Amazon EFS: Incorrect. EFS is shared file storage and cannot act as an API management layer.",
      "AWS Config: Incorrect. Config tracks resource compliance and does not expose APIs.",
      "Amazon S3 Glacier: Incorrect. Glacier is archival storage and unrelated to API publishing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html", title: "What Is Amazon API Gateway?" }
    ]
  },
  {
    id: 64,
    question: "A company wants to cache frequently requested inference responses in memory to reduce latency for repeat requests. Which AWS service is MOST appropriate?",
    options: [
      "Amazon ElastiCache",
      "AWS Artifact",
      "Amazon WorkMail",
      "AWS Organizations"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon ElastiCache provides managed in-memory caching services such as Redis and Memcached, which can reduce latency for repeated inference requests or feature lookups.",
    optionExplanations: [
      "Amazon ElastiCache: ✓ Correct. ElastiCache is the AWS managed service for in-memory caching to improve response times.",
      "AWS Artifact: Incorrect. Artifact provides compliance documentation and does not cache application data.",
      "Amazon WorkMail: Incorrect. WorkMail is an email service and unrelated to low-latency caching.",
      "AWS Organizations: Incorrect. Organizations manages accounts and does not provide in-memory caches."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html", title: "What Is Amazon ElastiCache?" }
    ]
  },
  {
    id: 65,
    question: "A machine learning team needs object storage for raw datasets, training artifacts, and model outputs with high durability and broad integration across AWS analytics and ML services. Which AWS service is the BEST choice?",
    options: [
      "Amazon S3",
      "Amazon Route 53",
      "AWS X-Ray",
      "Amazon MQ"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon S3 is the primary AWS object storage service for datasets and ML artifacts and integrates broadly with services such as SageMaker, Athena, Glue, and EMR.",
    optionExplanations: [
      "Amazon S3: ✓ Correct. S3 is the standard durable object storage service for ML datasets and artifacts on AWS.",
      "Amazon Route 53: Incorrect. Route 53 is a DNS service and does not store ML artifacts.",
      "AWS X-Ray: Incorrect. X-Ray traces application requests and does not provide object storage.",
      "Amazon MQ: Incorrect. Amazon MQ is a message broker and not object storage."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html", title: "What Is Amazon S3?" }
    ]
  },
  {
    id: 66,
    question: "A team wants to distribute static web assets for an ML application globally with low latency. Which AWS service is MOST appropriate?",
    options: [
      "Amazon CloudFront",
      "Amazon Athena",
      "AWS Secrets Manager",
      "Amazon DynamoDB"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon CloudFront is AWS's content delivery network service, designed to distribute static and dynamic content with low latency through a global edge network.",
    optionExplanations: [
      "Amazon CloudFront: ✓ Correct. CloudFront accelerates delivery of static web assets to users around the world.",
      "Amazon Athena: Incorrect. Athena queries S3 data and is not a content delivery network.",
      "AWS Secrets Manager: Incorrect. Secrets Manager stores secrets and does not serve static content globally.",
      "Amazon DynamoDB: Incorrect. DynamoDB is a NoSQL database and not a CDN."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html", title: "What Is Amazon CloudFront?" }
    ]
  },
  {
    id: 67,
    question: "A company wants to organize multiple AWS accounts used for separate ML environments such as development, testing, and production under centralized governance. Which AWS service should be used?",
    options: [
      "AWS Organizations",
      "Amazon Textract",
      "Amazon SQS",
      "AWS Batch"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS Organizations helps centrally manage and govern multiple AWS accounts, including applying policies and account structure for separate environments.",
    optionExplanations: [
      "AWS Organizations: ✓ Correct. Organizations is the AWS service for multi-account governance and centralized policy management.",
      "Amazon Textract: Incorrect. Textract extracts text from documents and does not manage AWS accounts.",
      "Amazon SQS: Incorrect. SQS is a message queue and is unrelated to account governance.",
      "AWS Batch: Incorrect. Batch runs jobs and does not organize AWS accounts."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html", title: "What Is AWS Organizations?" }
    ]
  },
  {
    id: 68,
    question: "A machine learning team needs to run large-scale batch compute jobs for preprocessing or model evaluation outside of SageMaker. Which AWS service is the BEST fit?",
    options: [
      "AWS Batch",
      "Amazon Route 53",
      "AWS Artifact",
      "Amazon Polly"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "AWS Batch is a managed service for running batch computing workloads at scale, making it suitable for preprocessing, evaluation, and other offline ML compute jobs.",
    optionExplanations: [
      "AWS Batch: ✓ Correct. Batch is designed for scalable execution of batch-oriented compute workloads.",
      "Amazon Route 53: Incorrect. Route 53 is a DNS service and cannot run batch compute jobs.",
      "AWS Artifact: Incorrect. Artifact provides compliance reports and does not execute compute workloads.",
      "Amazon Polly: Incorrect. Polly is a text-to-speech service and not a batch compute platform."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html", title: "What Is AWS Batch?" }
    ]
  },
  {
    id: 69,
    question: "A team wants to stream and process video input for computer vision ML use cases on AWS. Which AWS service is MOST appropriate for ingesting the video streams?",
    options: [
      "Amazon Kinesis Video Streams",
      "Amazon Simple Queue Service",
      "AWS Budgets",
      "Amazon RDS"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon Kinesis Video Streams is designed to securely stream video from devices into AWS for analytics, storage, and ML computer vision use cases.",
    optionExplanations: [
      "Amazon Kinesis Video Streams: ✓ Correct. It is the AWS service purpose-built for ingesting and managing streaming video data.",
      "Amazon Simple Queue Service: Incorrect. SQS queues messages, not live video streams.",
      "AWS Budgets: Incorrect. Budgets manages cost thresholds and does not ingest media streams.",
      "Amazon RDS: Incorrect. RDS is a relational database and not a streaming video ingestion service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/what-is-kinesis-video.html", title: "What Is Amazon Kinesis Video Streams?" }
    ]
  },
  {
    id: 70,
    question: "A company wants a managed message broker that supports traditional messaging protocols for integrating legacy systems into an ML workflow. Which AWS service should be used?",
    options: [
      "Amazon MQ",
      "AWS Glue DataBrew",
      "Amazon ECR",
      "AWS CloudFormation"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon MQ is a managed message broker service that supports common messaging protocols and is suitable for integrating legacy applications into event-driven architectures.",
    optionExplanations: [
      "Amazon MQ: ✓ Correct. Amazon MQ provides managed message brokers for applications that rely on traditional messaging protocols.",
      "AWS Glue DataBrew: Incorrect. DataBrew prepares data visually and is not a message broker.",
      "Amazon ECR: Incorrect. ECR stores container images and does not broker messages.",
      "AWS CloudFormation: Incorrect. CloudFormation provisions infrastructure and is not a messaging service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html", title: "What Is Amazon MQ?" }
    ]
  },
  {
    id: 71,
    question: "A machine learning engineer wants to improve code quality and detect potential performance issues in Python code used by ML applications. Which AWS service is designed to provide these automated recommendations?",
    options: [
      "Amazon CodeGuru",
      "Amazon Polly",
      "AWS Lake Formation",
      "Amazon Route 53"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon CodeGuru provides automated code reviews and performance recommendations for supported programming languages, helping teams improve code quality in ML applications and pipelines.",
    optionExplanations: [
      "Amazon CodeGuru: ✓ Correct. CodeGuru analyzes code and runtime behavior to surface quality and performance recommendations.",
      "Amazon Polly: Incorrect. Polly is a text-to-speech service and does not review source code.",
      "AWS Lake Formation: Incorrect. Lake Formation governs data lakes and is unrelated to code analysis.",
      "Amazon Route 53: Incorrect. Route 53 is a DNS service and does not inspect application code."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codeguru/latest/profiler-ug/what-is-codeguru-profiler.html", title: "What Is Amazon CodeGuru?" }
    ]
  },
  {
    id: 72,
    question: "A team needs a managed source code repository service to store ML pipeline definitions and infrastructure code in Git repositories on AWS. Which AWS service should the team use?",
    options: [
      "AWS CodeCommit",
      "Amazon Kinesis",
      "Amazon Textract",
      "AWS Budgets"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "AWS CodeCommit is a managed source control service that hosts secure Git repositories for application code, ML pipeline definitions, and infrastructure as code.",
    optionExplanations: [
      "AWS CodeCommit: ✓ Correct. CodeCommit provides managed Git repositories on AWS for version-controlled source code.",
      "Amazon Kinesis: Incorrect. Kinesis handles streaming data and does not host Git repositories.",
      "Amazon Textract: Incorrect. Textract extracts text from documents and is unrelated to source control.",
      "AWS Budgets: Incorrect. Budgets tracks spending and does not store code repositories."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html", title: "What Is AWS CodeCommit?" }
    ]
  },
  {
    id: 73,
    question: "A machine learning team needs to compile code, run tests, and package artifacts automatically as part of its CI workflow. Which AWS service should be used for this build stage?",
    options: [
      "AWS CodeBuild",
      "Amazon Macie",
      "AWS Organizations",
      "Amazon EFS"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "AWS CodeBuild is a fully managed build service that compiles source code, runs tests, and produces deployment artifacts for CI/CD pipelines.",
    optionExplanations: [
      "AWS CodeBuild: ✓ Correct. CodeBuild is purpose-built for automated builds and tests in CI workflows.",
      "Amazon Macie: Incorrect. Macie classifies sensitive data in S3 and does not run builds.",
      "AWS Organizations: Incorrect. Organizations manages accounts and does not execute build jobs.",
      "Amazon EFS: Incorrect. EFS is shared file storage and not a build service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html", title: "What Is AWS CodeBuild?" }
    ]
  },
  {
    id: 74,
    question: "A company wants to automate application or service deployment steps for an ML platform after artifacts are built and tested. Which AWS service is designed for deployment automation?",
    options: [
      "AWS CodeDeploy",
      "Amazon Athena",
      "AWS Artifact",
      "Amazon Translate"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "AWS CodeDeploy automates software deployments to various compute services and is designed to manage deployment steps after build and test stages complete.",
    optionExplanations: [
      "AWS CodeDeploy: ✓ Correct. CodeDeploy automates deployment workflows for supported compute targets.",
      "Amazon Athena: Incorrect. Athena is a query service and does not deploy applications.",
      "AWS Artifact: Incorrect. Artifact provides compliance reports and is unrelated to application deployment.",
      "Amazon Translate: Incorrect. Translate is an AI service and does not perform deployment automation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html", title: "What Is AWS CodeDeploy?" }
    ]
  },
  {
    id: 75,
    question: "A machine learning engineer wants to store and manage private Python package dependencies used by ML projects in a managed artifact repository. Which AWS service should be used?",
    options: [
      "AWS CodeArtifact",
      "Amazon Comprehend",
      "AWS Config",
      "Amazon WorkMail"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "AWS CodeArtifact is a managed artifact repository service for storing, publishing, and sharing software packages and dependencies, including Python packages.",
    optionExplanations: [
      "AWS CodeArtifact: ✓ Correct. CodeArtifact provides managed package storage and distribution for software dependencies.",
      "Amazon Comprehend: Incorrect. Comprehend is an NLP service and does not host package repositories.",
      "AWS Config: Incorrect. Config tracks resource configurations and is not an artifact repository.",
      "Amazon WorkMail: Incorrect. WorkMail is an email service and does not manage software packages."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html", title: "What Is AWS CodeArtifact?" }
    ]
  },
  {
    id: 76,
    question: "A company wants to analyze text documents to identify key phrases, entities, and sentiment without building a custom NLP model. Which AWS service is the MOST appropriate?",
    options: [
      "Amazon Comprehend",
      "AWS DataSync",
      "Amazon FSx",
      "AWS Direct Connect"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Comprehend is a managed natural language processing service that can detect entities, key phrases, sentiment, and other insights in text without custom model development.",
    optionExplanations: [
      "Amazon Comprehend: ✓ Correct. Comprehend provides prebuilt NLP capabilities for text analytics use cases.",
      "AWS DataSync: Incorrect. DataSync transfers files and does not analyze text content.",
      "Amazon FSx: Incorrect. FSx is shared file storage and does not perform NLP analysis.",
      "AWS Direct Connect: Incorrect. Direct Connect is a networking service and does not process text."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html", title: "What Is Amazon Comprehend?" }
    ]
  },
  {
    id: 77,
    question: "A healthcare organization needs to extract medical entities and insights from unstructured clinical text without building a custom NLP model. Which AWS service should be used?",
    options: [
      "Amazon Comprehend Medical",
      "Amazon SNS",
      "AWS Lambda",
      "Amazon Redshift"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Comprehend Medical is a managed NLP service specialized for extracting medical information from unstructured clinical text.",
    optionExplanations: [
      "Amazon Comprehend Medical: ✓ Correct. It is purpose-built for healthcare NLP tasks such as entity extraction from clinical text.",
      "Amazon SNS: Incorrect. SNS delivers notifications and does not analyze medical text.",
      "AWS Lambda: Incorrect. Lambda runs code but does not itself provide managed clinical NLP capabilities.",
      "Amazon Redshift: Incorrect. Redshift is a data warehouse and not a healthcare NLP service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/comprehend-medical/latest/dev/what-is.html", title: "What Is Amazon Comprehend Medical?" }
    ]
  },
  {
    id: 78,
    question: "A retail company wants to provide personalized product recommendations to users without building a recommendation engine from scratch. Which AWS service is the BEST fit?",
    options: [
      "Amazon Personalize",
      "AWS CloudTrail",
      "Amazon EFS",
      "AWS Artifact"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Personalize is a managed ML service that provides personalized recommendations and user personalization without requiring teams to build recommendation models from scratch.",
    optionExplanations: [
      "Amazon Personalize: ✓ Correct. Personalize is designed for recommendation and personalization use cases.",
      "AWS CloudTrail: Incorrect. CloudTrail logs API activity and does not generate recommendations.",
      "Amazon EFS: Incorrect. EFS is shared storage and does not provide personalization models.",
      "AWS Artifact: Incorrect. Artifact provides compliance reports and is unrelated to recommendations."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html", title: "What Is Amazon Personalize?" }
    ]
  },
  {
    id: 79,
    question: "A business wants to detect potentially fraudulent online transactions using a managed AWS AI service instead of building its own fraud model. Which AWS service should be used?",
    options: [
      "Amazon Fraud Detector",
      "Amazon Kinesis Video Streams",
      "AWS CodeDeploy",
      "Amazon CloudFront"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Fraud Detector is a managed service that helps identify potentially fraudulent activity using ML and prebuilt fraud detection capabilities.",
    optionExplanations: [
      "Amazon Fraud Detector: ✓ Correct. Fraud Detector is purpose-built for online fraud detection use cases.",
      "Amazon Kinesis Video Streams: Incorrect. Kinesis Video Streams ingests video and does not detect transaction fraud.",
      "AWS CodeDeploy: Incorrect. CodeDeploy automates application deployment and is unrelated to fraud modeling.",
      "Amazon CloudFront: Incorrect. CloudFront is a CDN and does not score transactions for fraud."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/frauddetector/latest/ug/what-is-frauddetector.html", title: "What Is Amazon Fraud Detector?" }
    ]
  },
  {
    id: 80,
    question: "A manufacturing company wants to detect anomalies in equipment behavior using a managed ML service designed for industrial sensor data. Which AWS service is the BEST fit?",
    options: [
      "Amazon Lookout for Equipment",
      "Amazon S3",
      "AWS Budgets",
      "Amazon ECS"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Lookout for Equipment is a managed service that uses ML to detect abnormal equipment behavior from sensor data in industrial settings.",
    optionExplanations: [
      "Amazon Lookout for Equipment: ✓ Correct. It is specifically built for predictive maintenance and anomaly detection on industrial equipment data.",
      "Amazon S3: Incorrect. S3 stores data but does not perform anomaly detection itself.",
      "AWS Budgets: Incorrect. Budgets tracks cost thresholds and is unrelated to equipment analytics.",
      "Amazon ECS: Incorrect. ECS orchestrates containers and does not provide managed industrial anomaly detection."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lookout-for-equipment/latest/ug/what-is.html", title: "What Is Amazon Lookout for Equipment?" }
    ]
  },
  {
    id: 81,
    question: "A business wants to detect unusual changes in KPIs such as sales, sign-ups, or web traffic without building a custom anomaly detection model. Which AWS service is the BEST fit?",
    options: [
      "Amazon Lookout for Metrics",
      "Amazon SQS",
      "AWS CodeArtifact",
      "Amazon ECR"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Lookout for Metrics is a managed service that uses machine learning to detect anomalies in business and operational metrics automatically.",
    optionExplanations: [
      "Amazon Lookout for Metrics: ✓ Correct. It is purpose-built for detecting anomalies in metrics such as revenue, traffic, and conversion rates.",
      "Amazon SQS: Incorrect. SQS is a queue service and does not analyze KPI anomalies.",
      "AWS CodeArtifact: Incorrect. CodeArtifact stores software packages and is unrelated to metric anomaly detection.",
      "Amazon ECR: Incorrect. ECR stores container images and does not analyze metrics."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lookoutmetrics/latest/dev/what-is.html", title: "What Is Amazon Lookout for Metrics?" }
    ]
  },
  {
    id: 82,
    question: "A manufacturer wants to inspect product images on an assembly line to detect visual defects without building a computer vision system from scratch. Which AWS service should be used?",
    options: [
      "Amazon Lookout for Vision",
      "Amazon RDS",
      "AWS Budgets",
      "AWS Step Functions"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Lookout for Vision is a managed computer vision service for detecting visual anomalies and defects in industrial products and processes.",
    optionExplanations: [
      "Amazon Lookout for Vision: ✓ Correct. It is specifically designed for visual inspection and defect detection use cases.",
      "Amazon RDS: Incorrect. RDS stores relational data and does not perform image inspection.",
      "AWS Budgets: Incorrect. Budgets manages spending thresholds and has no computer vision capability.",
      "AWS Step Functions: Incorrect. Step Functions orchestrates workflows but does not analyze images itself."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lookout-for-vision/latest/developer-guide/what-is.html", title: "What Is Amazon Lookout for Vision?" }
    ]
  },
  {
    id: 83,
    question: "A healthcare organization wants to analyze and search clinical data at scale using a service built for health information workloads. Which AWS service is the BEST fit?",
    options: [
      "AWS HealthLake",
      "Amazon SNS",
      "AWS CloudFormation",
      "Amazon ECS"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "AWS HealthLake is a service for storing, transforming, and analyzing health data at scale using standardized healthcare data formats.",
    optionExplanations: [
      "AWS HealthLake: ✓ Correct. HealthLake is purpose-built for healthcare data management and analytics workloads.",
      "Amazon SNS: Incorrect. SNS provides notifications and does not manage healthcare data stores.",
      "AWS CloudFormation: Incorrect. CloudFormation provisions infrastructure and is not a healthcare analytics data service.",
      "Amazon ECS: Incorrect. ECS runs containers and is not a health data platform."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/healthlake/latest/devguide/what-is.html", title: "What Is AWS HealthLake?" }
    ]
  },
  {
    id: 84,
    question: "A company wants to build an intelligent search experience over enterprise documents, FAQs, and knowledge bases without creating its own search ranking model. Which AWS service should it use?",
    options: [
      "Amazon Kendra",
      "Amazon EBS",
      "AWS WAF",
      "Amazon EFS"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Kendra is an intelligent search service that uses machine learning to provide accurate search results across enterprise content sources.",
    optionExplanations: [
      "Amazon Kendra: ✓ Correct. Kendra provides managed intelligent search capabilities for enterprise content.",
      "Amazon EBS: Incorrect. EBS is block storage and does not provide search ranking or retrieval features.",
      "AWS WAF: Incorrect. WAF protects web applications and is unrelated to enterprise search.",
      "Amazon EFS: Incorrect. EFS is file storage and not an intelligent search engine."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html", title: "What Is Amazon Kendra?" }
    ]
  },
  {
    id: 85,
    question: "A company wants to access foundation models through a managed AWS service for generative AI use cases without managing model infrastructure. Which AWS service is the BEST fit?",
    options: [
      "Amazon Bedrock",
      "Amazon Redshift",
      "AWS CodeCommit",
      "Amazon MQ"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Bedrock provides access to foundation models through a managed API, allowing teams to build generative AI applications without managing the underlying infrastructure.",
    optionExplanations: [
      "Amazon Bedrock: ✓ Correct. Bedrock is AWS's managed service for working with foundation models and generative AI capabilities.",
      "Amazon Redshift: Incorrect. Redshift is a data warehouse and not a generative AI model hosting service.",
      "AWS CodeCommit: Incorrect. CodeCommit is a source control service and does not expose foundation models.",
      "Amazon MQ: Incorrect. Amazon MQ is a message broker and not a generative AI service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html", title: "What Is Amazon Bedrock?" }
    ]
  },
  {
    id: 86,
    question: "A team needs a managed service to ask questions, generate content, and assist developers or business users with AI-powered capabilities in AWS environments. Which AWS service is the BEST fit?",
    options: [
      "Amazon Q",
      "Amazon FSx",
      "AWS Direct Connect",
      "Amazon CloudFront"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Q is AWS's generative AI assistant service for business and developer productivity use cases.",
    optionExplanations: [
      "Amazon Q: ✓ Correct. Amazon Q provides AI-powered assistance for users and developers across supported AWS and business contexts.",
      "Amazon FSx: Incorrect. FSx is shared file storage and does not provide generative AI assistance.",
      "AWS Direct Connect: Incorrect. Direct Connect is a networking service and not an AI assistant.",
      "Amazon CloudFront: Incorrect. CloudFront is a CDN and does not answer questions or generate content."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/what-is.html", title: "What Is Amazon Q?" }
    ]
  },
  {
    id: 87,
    question: "A business wants to convert written text into lifelike speech for a customer-facing ML application. Which AWS service should be used?",
    options: [
      "Amazon Polly",
      "AWS CodeBuild",
      "Amazon Athena",
      "AWS Artifact"
    ],
    correctAnswer: 0,
    category: "ML Model Development",
    explanation: "Amazon Polly is a managed text-to-speech service that converts text into lifelike spoken audio.",
    optionExplanations: [
      "Amazon Polly: ✓ Correct. Polly is designed for text-to-speech generation with natural-sounding voices.",
      "AWS CodeBuild: Incorrect. CodeBuild runs build jobs and does not synthesize speech.",
      "Amazon Athena: Incorrect. Athena is a query service and does not generate audio from text.",
      "AWS Artifact: Incorrect. Artifact provides compliance documents and does not provide speech synthesis."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/polly/latest/dg/what-is.html", title: "What Is Amazon Polly?" }
    ]
  },
  {
    id: 88,
    question: "A company wants to provision and manage AWS infrastructure for ML environments using TypeScript or Python instead of writing raw JSON or YAML templates. Which AWS service or framework is the BEST fit?",
    options: [
      "AWS Cloud Development Kit (AWS CDK)",
      "Amazon Macie",
      "AWS Budgets",
      "Amazon Comprehend Medical"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "AWS CDK is an infrastructure as code framework that allows teams to define AWS resources using familiar programming languages such as TypeScript and Python.",
    optionExplanations: [
      "AWS Cloud Development Kit (AWS CDK): ✓ Correct. CDK lets developers define infrastructure with general-purpose languages rather than raw templates.",
      "Amazon Macie: Incorrect. Macie discovers sensitive data in S3 and does not provision infrastructure.",
      "AWS Budgets: Incorrect. Budgets manages spending alerts and does not define infrastructure.",
      "Amazon Comprehend Medical: Incorrect. Comprehend Medical analyzes clinical text and is unrelated to IaC frameworks."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cdk/v2/guide/home.html", title: "What Is the AWS CDK?" }
    ]
  },
  {
    id: 89,
    question: "A machine learning team wants to use a simple service catalog to govern which approved infrastructure products and templates can be launched for ML environments. Which AWS service should be used?",
    options: [
      "AWS Service Catalog",
      "Amazon Textract",
      "AWS X-Ray",
      "Amazon Kendra"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "AWS Service Catalog allows organizations to define and govern approved products and templates that users can provision in a controlled way.",
    optionExplanations: [
      "AWS Service Catalog: ✓ Correct. Service Catalog is designed for governing approved infrastructure products and templates.",
      "Amazon Textract: Incorrect. Textract extracts text from documents and is unrelated to infrastructure product governance.",
      "AWS X-Ray: Incorrect. X-Ray traces application requests and does not manage approved infrastructure products.",
      "Amazon Kendra: Incorrect. Kendra provides intelligent search and is unrelated to cataloging infrastructure templates."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html", title: "What Is AWS Service Catalog?" }
    ]
  },
  {
    id: 90,
    question: "A team wants to centrally manage operational tasks such as patching, automation, and instance management for the infrastructure supporting ML workloads. Which AWS service is the BEST fit?",
    options: [
      "AWS Systems Manager",
      "Amazon Personalize",
      "Amazon EventBridge",
      "AWS Lake Formation"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS Systems Manager provides operational management capabilities such as patching, automation, parameter storage, and instance management across AWS resources.",
    optionExplanations: [
      "AWS Systems Manager: ✓ Correct. Systems Manager is the AWS service for centralized operational management and automation.",
      "Amazon Personalize: Incorrect. Personalize provides recommendation capabilities and does not manage infrastructure operations.",
      "Amazon EventBridge: Incorrect. EventBridge routes events but does not provide end-to-end operational management features such as patching.",
      "AWS Lake Formation: Incorrect. Lake Formation governs data lakes and is unrelated to patching or instance operations."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html", title: "What Is AWS Systems Manager?" }
    ]
  },
  {
    id: 91,
    question: "A team wants to define approved AWS infrastructure for ML environments using reusable templates with native support from the AWS management plane. Which AWS service is the BEST fit?",
    options: [
      "AWS CloudFormation",
      "Amazon Lex",
      "AWS Budgets",
      "Amazon Kendra"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "AWS CloudFormation is the native infrastructure as code service for defining and provisioning AWS resources through declarative templates.",
    optionExplanations: [
      "AWS CloudFormation: ✓ Correct. CloudFormation provides declarative templates for repeatable infrastructure provisioning on AWS.",
      "Amazon Lex: Incorrect. Lex is a conversational AI service and does not provision infrastructure.",
      "AWS Budgets: Incorrect. Budgets manages spending thresholds and does not define resources.",
      "Amazon Kendra: Incorrect. Kendra is an intelligent search service and is unrelated to infrastructure templating."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html", title: "What Is AWS CloudFormation?" }
    ]
  },
  {
    id: 92,
    question: "A machine learning engineer wants to monitor resource configurations continuously and evaluate whether ML-related AWS resources comply with internal rules. Which AWS service should be used?",
    options: [
      "AWS Config",
      "Amazon Polly",
      "Amazon SNS",
      "AWS DataSync"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS Config records resource configurations and evaluates them against rules so teams can assess compliance of AWS resources over time.",
    optionExplanations: [
      "AWS Config: ✓ Correct. Config tracks configuration changes and evaluates compliance rules for AWS resources.",
      "Amazon Polly: Incorrect. Polly generates speech and does not evaluate infrastructure compliance.",
      "Amazon SNS: Incorrect. SNS sends notifications but does not maintain resource configuration history.",
      "AWS DataSync: Incorrect. DataSync transfers data and is unrelated to resource compliance tracking."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html", title: "What Is AWS Config?" }
    ]
  },
  {
    id: 93,
    question: "A company wants an AWS service that helps recommend optimal instance types and right-size compute resources for ML infrastructure based on utilization patterns. Which AWS service should be used?",
    options: [
      "AWS Compute Optimizer",
      "Amazon SQS",
      "Amazon Route 53",
      "AWS Artifact"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS Compute Optimizer analyzes utilization metrics and recommends optimal AWS compute resources, helping teams right-size infrastructure for cost and performance.",
    optionExplanations: [
      "AWS Compute Optimizer: ✓ Correct. Compute Optimizer recommends better-sized compute resources based on observed usage patterns.",
      "Amazon SQS: Incorrect. SQS is a queueing service and does not recommend instance types.",
      "Amazon Route 53: Incorrect. Route 53 is a DNS service and has no compute sizing function.",
      "AWS Artifact: Incorrect. Artifact provides compliance reports and does not analyze resource utilization."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html", title: "What Is AWS Compute Optimizer?" }
    ]
  },
  {
    id: 94,
    question: "A company wants to protect a custom web application that exposes ML inference endpoints from common web exploits such as SQL injection and cross-site scripting. Which AWS service is the BEST fit?",
    options: [
      "AWS WAF",
      "Amazon FSx",
      "Amazon Textract",
      "AWS DataSync"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS WAF is a web application firewall that helps protect web applications and APIs from common attacks such as SQL injection and cross-site scripting.",
    optionExplanations: [
      "AWS WAF: ✓ Correct. WAF is purpose-built to filter and block malicious web requests to protected applications and APIs.",
      "Amazon FSx: Incorrect. FSx is shared file storage and does not inspect or filter web traffic.",
      "Amazon Textract: Incorrect. Textract extracts data from documents and is unrelated to web application protection.",
      "AWS DataSync: Incorrect. DataSync moves data and does not defend applications from web exploits."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html", title: "What Is AWS WAF?" }
    ]
  },
  {
    id: 95,
    question: "A company needs managed DDoS protection for internet-facing endpoints used by its ML application. Which AWS service should be used?",
    options: [
      "AWS Shield",
      "Amazon Athena",
      "AWS CodeBuild",
      "Amazon EFS"
    ],
    correctAnswer: 0,
    category: "Monitoring, Maintenance, and Security of ML Solutions",
    explanation: "AWS Shield provides managed distributed denial-of-service protection for AWS resources and applications exposed to the internet.",
    optionExplanations: [
      "AWS Shield: ✓ Correct. Shield is the AWS managed service for DDoS protection.",
      "Amazon Athena: Incorrect. Athena queries S3 data and does not mitigate network attacks.",
      "AWS CodeBuild: Incorrect. CodeBuild runs build jobs and does not protect endpoints from DDoS attacks.",
      "Amazon EFS: Incorrect. EFS is file storage and does not provide DDoS defense."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html", title: "AWS Shield Overview" }
    ]
  },
  {
    id: 96,
    question: "A team wants to run model inference at the edge by optimizing trained models for different hardware targets. Which AWS service or feature is the BEST fit?",
    options: [
      "Amazon SageMaker Neo",
      "AWS CodeCommit",
      "Amazon WorkMail",
      "AWS Trusted Advisor"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon SageMaker Neo compiles and optimizes trained models to run efficiently on diverse hardware targets, including edge devices.",
    optionExplanations: [
      "Amazon SageMaker Neo: ✓ Correct. Neo is designed to optimize trained models for deployment on multiple hardware platforms, including edge devices.",
      "AWS CodeCommit: Incorrect. CodeCommit hosts source code repositories and does not optimize trained models.",
      "Amazon WorkMail: Incorrect. WorkMail is an email service and unrelated to edge inference optimization.",
      "AWS Trusted Advisor: Incorrect. Trusted Advisor provides best-practice checks and does not compile models."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/neo.html", title: "Amazon SageMaker Neo" }
    ]
  },
  {
    id: 97,
    question: "A machine learning engineer wants to present low-confidence predictions from a model to human reviewers before final decisions are made. Which AWS service is the BEST fit?",
    options: [
      "Amazon Augmented AI (Amazon A2I)",
      "Amazon Redshift",
      "AWS Organizations",
      "Amazon ECR"
    ],
    correctAnswer: 0,
    category: "ML Workflow Deployment and Orchestration",
    explanation: "Amazon A2I provides human review workflows for machine learning predictions, enabling human-in-the-loop processing when model confidence is low or when review is required for compliance.",
    optionExplanations: [
      "Amazon Augmented AI (Amazon A2I): ✓ Correct. A2I is designed for human review workflows in ML systems.",
      "Amazon Redshift: Incorrect. Redshift is a data warehouse and does not route predictions to human reviewers.",
      "AWS Organizations: Incorrect. Organizations manages AWS accounts and is unrelated to human review workflows.",
      "Amazon ECR: Incorrect. ECR stores container images and does not manage approval workflows for predictions."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/a2i-faq.html", title: "Amazon Augmented AI" }
    ]
  },
  {
    id: 98,
    question: "A team needs a scalable graph database to model and query complex relationships in an ML knowledge graph. Which AWS service should be used?",
    options: [
      "Amazon Neptune",
      "AWS Batch",
      "Amazon Polly",
      "AWS Budgets"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon Neptune is a managed graph database service designed for storing and querying highly connected data using graph models.",
    optionExplanations: [
      "Amazon Neptune: ✓ Correct. Neptune is AWS's managed graph database for highly connected datasets and relationship queries.",
      "AWS Batch: Incorrect. Batch executes compute jobs and does not provide graph storage or query capabilities.",
      "Amazon Polly: Incorrect. Polly synthesizes speech and is unrelated to graph databases.",
      "AWS Budgets: Incorrect. Budgets manages spending alerts and does not store graph data."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/neptune/latest/userguide/intro.html", title: "What Is Amazon Neptune?" }
    ]
  },
  {
    id: 99,
    question: "A team needs a managed document database compatible with MongoDB APIs to store semi-structured application data used by an ML system. Which AWS service is the BEST fit?",
    options: [
      "Amazon DocumentDB (MongoDB compatibility)",
      "Amazon CloudFront",
      "AWS CodeDeploy",
      "Amazon Personalize"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon DocumentDB is a managed document database service with MongoDB compatibility, making it suitable for semi-structured application data.",
    optionExplanations: [
      "Amazon DocumentDB (MongoDB compatibility): ✓ Correct. DocumentDB is AWS's managed document database service compatible with MongoDB applications.",
      "Amazon CloudFront: Incorrect. CloudFront is a CDN and not a document database.",
      "AWS CodeDeploy: Incorrect. CodeDeploy automates deployments and does not store semi-structured documents.",
      "Amazon Personalize: Incorrect. Personalize is a recommendation service and not a database engine."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html", title: "What Is Amazon DocumentDB?" }
    ]
  },
  {
    id: 100,
    question: "A machine learning team wants an in-memory key-value store to accelerate feature access or session-like state in front of downstream applications. Which AWS service is the BEST fit?",
    options: [
      "Amazon ElastiCache",
      "Amazon Translate",
      "AWS CloudFormation",
      "Amazon Rekognition"
    ],
    correctAnswer: 0,
    category: "Data Preparation for ML",
    explanation: "Amazon ElastiCache provides managed in-memory key-value caching engines such as Redis and Memcached, which are useful for accelerating access to frequently used data.",
    optionExplanations: [
      "Amazon ElastiCache: ✓ Correct. ElastiCache is the managed AWS service for low-latency in-memory data access.",
      "Amazon Translate: Incorrect. Translate is a language translation service and not a data cache.",
      "AWS CloudFormation: Incorrect. CloudFormation provisions infrastructure and does not serve as a runtime data store.",
      "Amazon Rekognition: Incorrect. Rekognition analyzes images and videos and is unrelated to key-value caching."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html", title: "What Is Amazon ElastiCache?" }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = awsMLAQuestions;
}
