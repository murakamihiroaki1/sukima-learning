// AWS DevOps Engineer Professional Practice Questions
const awsDOPQuestions = [
  {
    id: 1,
    question: "A company stores an application in AWS CodeCommit and uses AWS CodePipeline for deployments. The company wants the pipeline to start automatically whenever code is merged into the main branch. The solution must react as quickly as possible without relying on scheduled polling.\n\nWhat should a DevOps engineer do to meet these requirements?",
    options: [
      "Configure CodePipeline to poll the repository every 5 minutes for changes to the main branch.",
      "Create an Amazon EventBridge rule that matches CodeCommit repository state changes for the main branch and starts the pipeline.",
      "Configure an AWS Lambda function to run on a schedule and call the CodePipeline StartPipelineExecution API when it detects changes.",
      "Configure an Amazon SNS topic for the repository and subscribe CodePipeline directly to the topic."
    ],
    correctAnswer: 1,
    category: "SDLC Automation",
    explanation: "Amazon EventBridge can respond immediately to CodeCommit events and start CodePipeline without polling. This approach is more responsive and operationally efficient than scheduled checks or custom polling code.",
    optionExplanations: [
      "Polling introduces delay and is less responsive than an event-driven approach.",
      "✓ Correct: EventBridge can detect CodeCommit branch updates and trigger CodePipeline immediately, which provides the fastest and simplest solution.",
      "A scheduled Lambda poller adds unnecessary custom code and still introduces delay.",
      "CodePipeline cannot be subscribed directly to an SNS topic as the pipeline trigger mechanism in this scenario."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-trigger-source-repo-changes-cfn.html", title: "Create a pipeline that responds to source code changes" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event.html", title: "AWS service events in EventBridge" }
    ]
  },
  {
    id: 2,
    question: "A company needs to patch Amazon EC2 instances within 7 days of security patch releases. The company must apply patches during a defined maintenance window and must give the security team a way to verify compliance across the fleet.\n\nWhich solution will meet these requirements with the LEAST operational effort?",
    options: [
      "Use AWS CodeBuild to connect to the instances over SSH and apply patches on a schedule.",
      "Create a cron job on each instance to download and install updates during off-hours.",
      "Use AWS Systems Manager Patch Manager with a patch baseline, patch groups, and a maintenance window.",
      "Create an AWS Lambda function that calls the EC2 RunInstances API to replace every instance weekly."
    ],
    correctAnswer: 2,
    category: "Configuration Management and IaC",
    explanation: "AWS Systems Manager Patch Manager is designed for centralized patching, maintenance windows, and compliance reporting. It provides the most operationally efficient way to automate patching and verify compliance.",
    optionExplanations: [
      "CodeBuild is not the right service for fleet patch management and would require custom SSH-based logic.",
      "Per-instance cron jobs create operational overhead and do not provide centralized compliance visibility.",
      "✓ Correct: Patch Manager supports patch baselines, maintenance windows, and patch compliance reporting for managed instances.",
      "Replacing all instances weekly is unnecessary and does not directly address patch compliance reporting."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-patch.html", title: "AWS Systems Manager Patch Manager" },
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-maintenance-whatis.html", title: "AWS Systems Manager Maintenance Windows" }
    ]
  },
  {
    id: 3,
    question: "A company uses AWS CodeBuild to produce deployment artifacts that are stored in Amazon S3. Company policy requires all artifacts to be encrypted at rest. Only members of the operations team who assume a specific IAM role can access the artifacts.\n\nWhich solution will meet these requirements?",
    options: [
      "Store artifacts in an S3 bucket with default encryption enabled and a bucket policy that denies access unless the request uses the operations IAM role.",
      "Store artifacts in an S3 bucket and use an AWS Lambda function to encrypt each object after upload.",
      "Call the AWS KMS Encrypt API on each artifact file before uploading it to Amazon S3.",
      "Upload artifacts to an unencrypted S3 bucket and deny access to all IAM users except the operations IAM group."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Amazon S3 default encryption ensures artifacts are encrypted at rest automatically. A bucket policy that limits access to the operations IAM role satisfies the access-control requirement without adding unnecessary custom code.",
    optionExplanations: [
      "✓ Correct: S3 default encryption provides encryption at rest, and the bucket policy can restrict access to the designated IAM role.",
      "This adds unnecessary complexity and allows objects to exist briefly without guaranteed encryption handling by native S3 controls.",
      "The KMS Encrypt API is not the typical solution for large build artifacts stored in S3.",
      "The requirement is to allow access through an assumed IAM role, not directly through an IAM group, and the bucket would remain unencrypted."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html", title: "Setting default server-side encryption behavior for Amazon S3 buckets" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html", title: "Bucket policy examples for Amazon S3" }
    ]
  },
  {
    id: 4,
    question: "A DevOps engineer must implement a blue/green deployment for an application that runs on Amazon EC2 instances behind Application Load Balancers. Traffic must shift gradually from the current environment to the new environment. The application uses an Amazon RDS Multi-AZ DB instance.\n\nWhich combination of actions should the DevOps engineer take? (Choose THREE.)",
    options: [
      "Create a second Auto Scaling group behind the existing Application Load Balancer.",
      "Create a second Auto Scaling group behind a second Application Load Balancer.",
      "Create a second Amazon Route 53 alias record that points to the new load balancer and use a failover routing policy.",
      "Create a second Amazon Route 53 alias record that points to the new load balancer and use a weighted routing policy.",
      "Configure the new EC2 instances to use the same primary RDS DB instance.",
      "Configure the new EC2 instances to use the standby RDS DB instance."
    ],
    correctAnswer: [1, 3, 4],
    category: "SDLC Automation",
    explanation: "Blue/green deployments require two separate environments. Two load balancers allow Route 53 weighted routing to gradually shift traffic. Both environments should use the primary RDS instance because the standby instance in a Multi-AZ deployment is not used for application traffic.",
    optionExplanations: [
      "A separate Auto Scaling group alone is not enough because gradual traffic shifting requires distinct endpoints.",
      "✓ Correct: The green environment should have its own Auto Scaling group and its own load balancer.",
      "Failover routing switches all traffic after a health failure and does not support gradual traffic shifting.",
      "✓ Correct: Weighted Route 53 routing allows controlled, gradual traffic shifting between blue and green environments.",
      "✓ Correct: Both environments should use the same primary RDS instance unless a schema or data strategy requires a different approach.",
      "The standby instance in RDS Multi-AZ is not available for normal read/write application traffic."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/whitepapers/latest/blue-green-deployments/welcome.html", title: "Blue/green deployments on AWS" },
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-weighted.html", title: "Weighted routing" }
    ]
  },
  {
    id: 5,
    question: "A company sends AWS CloudTrail logs from all AWS accounts to a centralized Amazon S3 bucket. An existing S3 event notification invokes an AWS Lambda function that forwards selected events to a third-party logging tool. A new security provider now needs to receive every delivered CloudTrail object through an Amazon SQS queue.\n\nThe current Lambda integration must continue to work. What is the MOST operationally efficient solution?",
    options: [
      "Add another S3 event notification on the same bucket to send all object creation events directly to the SQS queue.",
      "Replace the S3 event notification destination with an Amazon SNS topic, and subscribe both the Lambda function and the SQS queue to the topic.",
      "Replace the S3 event notification with an Amazon Kinesis Data Streams stream, and create consumers for Lambda and SQS.",
      "Configure CloudTrail to send logs to CloudWatch Logs, and subscribe the SQS queue directly to the log group."
    ],
    correctAnswer: 1,
    category: "Incident and Event Response",
    explanation: "Amazon SNS is the standard fanout solution for one event source that must notify multiple consumers. It preserves the existing Lambda integration pattern and adds SQS delivery with minimal operational effort.",
    optionExplanations: [
      "Overlapping S3 event notifications can create configuration issues and are less suitable than a fanout topic for this requirement.",
      "✓ Correct: SNS provides native fanout so both Lambda and SQS can receive notifications from the same S3 event source.",
      "Kinesis Data Streams is not a valid direct destination for S3 event notifications in this scenario and adds unnecessary complexity.",
      "You cannot directly subscribe an SQS queue to a CloudWatch Logs log group to solve this workflow."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html", title: "Amazon S3 Event Notifications" },
      { url: "https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html", title: "Subscribing an Amazon SQS queue to an Amazon SNS topic" }
    ]
  },
  {
    id: 6,
    question: "A company runs workloads in multiple AWS accounts under AWS Organizations. The security team wants to detect unusual behavior associated with IAM identities across all accounts and automatically notify the affected employee and that employee's manager through an external messaging platform. The company already has an API that maps IAM user names to messaging platform user IDs.\n\nWhich solution will meet these requirements?",
    options: [
      "Use Amazon GuardDuty delegated administrator support across the organization, create an Amazon EventBridge rule for IAM anomalous behavior findings, and invoke an AWS Lambda function that looks up user IDs and sends notifications.",
      "Use Amazon Detective delegated administrator support, create an Amazon SNS topic for IAM anomalous behavior events, and invoke an AWS Lambda function from the topic.",
      "Use AWS CloudTrail Insights across all accounts, export logs to Amazon S3, and run a scheduled AWS Glue job to send notifications once per day.",
      "Use AWS IAM Access Analyzer across all accounts, create an AWS Config rule for unusual IAM activity, and publish notifications to Amazon SNS."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Amazon GuardDuty detects IAM anomalous behavior findings and publishes them to EventBridge. A delegated administrator model centralizes management across the organization, and Lambda can enrich the event with user IDs before sending notifications to the messaging platform.",
    optionExplanations: [
      "✓ Correct: GuardDuty detects anomalous IAM behavior, EventBridge can match those findings, and Lambda can perform the lookup and notification workflow.",
      "Amazon Detective helps investigate findings but does not generate the anomalous behavior detections itself.",
      "CloudTrail Insights is not the most direct solution for IAM anomalous behavior notifications and scheduled daily processing is not timely.",
      "IAM Access Analyzer focuses on access analysis, not anomalous identity behavior detection."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings-summary.html", title: "Amazon GuardDuty findings types" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html", title: "Creating event patterns in EventBridge" }
    ]
  },
  {
    id: 7,
    question: "A global application uses an Amazon DynamoDB table and must provide low-latency read and write access in three AWS Regions. Updates made in any Region must automatically replicate to the others. The company wants the solution with the LEAST operational overhead.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Create one DynamoDB table in each Region and write a custom synchronization service by using AWS Lambda.",
      "Create one DynamoDB table in one Region and use read replicas in the other Regions.",
      "Create a multi-Region, multi-active DynamoDB global table that includes the three Regions.",
      "Export the table to Amazon S3 every minute and import the data into regional tables."
    ],
    correctAnswer: 2,
    category: "Resilient Cloud Solutions",
    explanation: "DynamoDB global tables are designed for multi-Region, multi-active workloads with native replication and low operational overhead. They provide local read and write access in each selected Region.",
    optionExplanations: [
      "Custom synchronization adds unnecessary development and operational overhead.",
      "DynamoDB does not use the traditional read replica model for this multi-active requirement.",
      "✓ Correct: DynamoDB global tables provide native multi-Region, multi-active replication with the least operational overhead.",
      "Periodic export and import would not provide seamless replication and would introduce high latency."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html", title: "Global tables" }
    ]
  },
  {
    id: 8,
    question: "A legacy Windows application runs on a single Amazon EC2 instance. The application cannot be modified and begins to malfunction when memory utilization exceeds 90%. The unified Amazon CloudWatch agent is already configured to publish memory metrics. A DevOps engineer needs an automated solution that prevents the application from reaching the failure point with the LEAST operational overhead.\n\nWhich combination of actions should the DevOps engineer take? (Choose TWO.)",
    options: [
      "Create an Amazon EventBridge rule that checks memory usage every minute and publishes to Amazon SNS when memory utilization exceeds 80%.",
      "Create a CloudWatch metric filter on CloudWatch Logs for memory utilization and alarm on that filter.",
      "Create a CloudWatch alarm on the published memory utilization metric and publish to an Amazon SNS topic when utilization exceeds 80%.",
      "Subscribe an AWS Lambda function to the SNS topic and use AWS Systems Manager Run Command to restart the application.",
      "Subscribe the EC2 instance directly to the Amazon SNS topic and run a local restart script."
    ],
    correctAnswer: [2, 3],
    category: "Monitoring and Logging",
    explanation: "The CloudWatch agent already publishes the required memory metric, so a CloudWatch alarm can act on it directly. An SNS notification can invoke Lambda, and Lambda can use Systems Manager Run Command to restart the application before memory reaches the failure threshold.",
    optionExplanations: [
      "An EventBridge polling rule is unnecessary because CloudWatch alarms already evaluate metrics directly.",
      "A metric filter is unnecessary because the metric already exists in CloudWatch.",
      "✓ Correct: A CloudWatch alarm on the existing metric is the simplest and most direct monitoring mechanism.",
      "✓ Correct: Lambda can respond to the SNS notification and use Systems Manager Run Command to automate the remediation action.",
      "An EC2 instance cannot subscribe directly to an SNS topic in this way for automated local execution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html", title: "Collect metrics with the CloudWatch agent" },
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/execute-remote-commands.html", title: "Working with Run Command" }
    ]
  },
  {
    id: 9,
    question: "A company uses AWS CloudFormation to provision infrastructure in a multi-account AWS environment. The company needs to deploy a standard IAM role and baseline security resources to dozens of accounts across multiple AWS Regions. The solution must be centrally managed and repeatable.\n\nWhich solution should a DevOps engineer use?",
    options: [
      "Create a CloudFormation template and deploy it separately in each account and Region by using the AWS Management Console.",
      "Use AWS CloudFormation StackSets to deploy the template across the required accounts and Regions.",
      "Store the template in Amazon S3 and ask each account administrator to launch the stack manually.",
      "Create a single stack in the management account and share the resources to all other accounts by using AWS Resource Access Manager."
    ],
    correctAnswer: 1,
    category: "Configuration Management and IaC",
    explanation: "AWS CloudFormation StackSets is specifically designed to deploy and manage stacks centrally across multiple AWS accounts and Regions. It is the standard solution for repeatable, organization-wide infrastructure deployment.",
    optionExplanations: [
      "Manual per-account deployment is not centrally managed and does not scale well.",
      "✓ Correct: StackSets provides centralized, repeatable deployment of CloudFormation stacks across multiple accounts and Regions.",
      "This still relies on manual actions by each account administrator and is not operationally efficient.",
      "A single stack in one account cannot directly create separate IAM roles and regional resources in all other accounts through RAM alone."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html", title: "Working with AWS CloudFormation StackSets" }
    ]
  },
  {
    id: 10,
    question: "A company has a critical application deployed in one AWS Region. The company requires a disaster recovery strategy with an RTO of less than 15 minutes and an RPO of less than 5 minutes. The company wants to minimize cost while still meeting these targets.\n\nWhich disaster recovery strategy should a DevOps engineer recommend?",
    options: [
      "Use a multi-site active-active deployment with full production capacity in two Regions.",
      "Use a warm standby deployment with a scaled-down but fully functional environment in a second Region.",
      "Use a pilot light deployment with only backups stored in the second Region.",
      "Use a backup-and-restore strategy with daily snapshots copied to the second Region."
    ],
    correctAnswer: 1,
    category: "Resilient Cloud Solutions",
    explanation: "Warm standby provides a running, scaled-down environment in the secondary Region that can be scaled up quickly during a disaster. This approach typically meets aggressive RTO and RPO targets at lower cost than active-active deployments.",
    optionExplanations: [
      "Active-active can meet the targets but is usually the most expensive option.",
      "✓ Correct: Warm standby balances recovery objectives and cost by keeping a reduced-capacity environment running and ready to scale.",
      "Pilot light is often cheaper but may not consistently meet an RTO of less than 15 minutes for full application recovery.",
      "Backup and restore usually has the highest recovery time and cannot reliably meet the stated RTO and RPO targets."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html", title: "Disaster recovery options in the cloud" }
    ]
  },
  {
    id: 11,
    question: "A company uses AWS CodePipeline to deploy an application to Amazon ECS. The company wants to add automated testing so that integration tests run after the build stage but before deployment to production. If the tests fail, the pipeline must stop automatically.\n\nWhich solution will meet these requirements with the LEAST operational overhead?",
    options: [
      "Add an AWS CodeBuild action to the pipeline after the build stage and configure the test commands in the buildspec file.",
      "Create an Amazon EC2 instance that polls CodePipeline for artifacts and runs the tests manually.",
      "Configure an AWS Lambda function to download the build artifacts and run the tests on every deployment.",
      "Deploy directly to production and run the integration tests as a post-deployment validation step."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "AWS CodeBuild integrates directly with CodePipeline and can run integration tests as a pipeline action. If the tests fail, the pipeline execution fails automatically and does not continue to production.",
    optionExplanations: [
      "✓ Correct: CodeBuild is the native service for running automated tests in CodePipeline and will stop the pipeline on failure.",
      "This adds unnecessary infrastructure and operational overhead compared to a managed CodeBuild action.",
      "Lambda is not the right service for general integration test execution for this pipeline workflow.",
      "This approach allows untested code to reach production, which does not meet the requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html", title: "CodeBuild action reference for CodePipeline" },
      { url: "https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html", title: "Build specification reference for CodeBuild" }
    ]
  },
  {
    id: 12,
    question: "A company wants to deploy a standard set of preventive guardrails to every new AWS account that is created in its AWS Organizations environment. The company also wants a centralized log archive account and an audit account. The solution should minimize custom implementation work.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS Control Tower to set up a landing zone and enable the required guardrails.",
      "Create a custom AWS Lambda function that provisions accounts and applies IAM policies manually.",
      "Use AWS CloudFormation in the management account to create resources in every future member account automatically.",
      "Use AWS Trusted Advisor to create the accounts and configure preventive controls."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "AWS Control Tower is designed to set up and govern multi-account AWS environments with a landing zone, centralized logging, audit accounts, and built-in guardrails. It minimizes custom implementation work.",
    optionExplanations: [
      "✓ Correct: Control Tower provides a managed landing zone, centralized governance, and built-in guardrails for new accounts.",
      "This would require significant custom code and ongoing maintenance.",
      "CloudFormation alone does not provide the same full landing-zone governance workflow for future accounts.",
      "Trusted Advisor does not create AWS accounts or enforce organization-wide preventive guardrails in this way."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html", title: "What is AWS Control Tower?" },
      { url: "https://docs.aws.amazon.com/controltower/latest/userguide/about-landing-zones.html", title: "AWS Control Tower landing zones" }
    ]
  },
  {
    id: 13,
    question: "A company runs containerized workloads on Amazon ECS with AWS Fargate. The company wants to collect application logs from all tasks, retain the logs for 30 days, and run ad hoc searches against the logs during incidents. The company wants a solution with minimal operational overhead.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Configure the awslogs log driver to send task logs to Amazon CloudWatch Logs and set the log group retention to 30 days.",
      "Write the logs to local files in the containers and copy them to Amazon S3 every hour by using a cron job.",
      "Stream the logs to Amazon Kinesis Data Streams and build a custom search application on Amazon EC2.",
      "Store the logs in Amazon EFS and connect to the file system when incident analysis is required."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "For ECS on Fargate, the awslogs log driver is the simplest managed option to centralize logs in CloudWatch Logs. CloudWatch Logs also supports retention settings and Logs Insights for ad hoc search.",
    optionExplanations: [
      "✓ Correct: CloudWatch Logs with the awslogs log driver provides managed ingestion, retention control, and Logs Insights query support.",
      "Local file collection with cron jobs creates unnecessary operational complexity and is not suitable for Fargate tasks.",
      "This is more complex than necessary for centralized log storage and ad hoc search.",
      "EFS is not the best managed logging and search solution for container task logs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html", title: "Send Amazon ECS logs to CloudWatch" },
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html", title: "Analyzing log data with CloudWatch Logs Insights" }
    ]
  },
  {
    id: 14,
    question: "A company deploys an application by using AWS CloudFormation. During one deployment, stack creation fails because a resource quota was exceeded. The company wants future failed stack deployments to automatically roll back resources to the last stable state whenever possible.\n\nWhat should a DevOps engineer do?",
    options: [
      "Disable rollback so the failed resources remain for inspection.",
      "Use change sets only, because change sets automatically restore the previous stack state on failure.",
      "Enable automatic rollback for the stack operation so CloudFormation reverts failed updates.",
      "Create an Amazon EventBridge rule that manually deletes failed resources after every stack error."
    ],
    correctAnswer: 2,
    category: "Configuration Management and IaC",
    explanation: "AWS CloudFormation supports rollback behavior so that failed create or update operations revert changes automatically. This is the native mechanism for returning to the last stable state when a deployment fails.",
    optionExplanations: [
      "Disabling rollback is useful for troubleshooting but does not meet the requirement to revert automatically.",
      "Change sets preview changes but do not by themselves provide automatic rollback to the previous stable state.",
      "✓ Correct: CloudFormation rollback is the native feature for automatically reverting failed stack operations.",
      "Manual cleanup through EventBridge is unnecessary compared to CloudFormation's built-in rollback capability."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-continueupdaterollback.html", title: "Continue rolling back an update" },
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stack-failure-options.html", title: "Choose how to handle failures when provisioning stacks" }
    ]
  },
  {
    id: 15,
    question: "A company needs to ensure that secrets used by an application running on Amazon EC2 are rotated automatically. The application retrieves database credentials at runtime. The solution must minimize code changes and operational overhead.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Store the credentials in AWS Secrets Manager and configure automatic rotation.",
      "Store the credentials in an encrypted Amazon S3 object and update the object manually each month.",
      "Store the credentials in an EC2 user data script and redeploy the instances after each password change.",
      "Store the credentials in AWS Systems Manager Parameter Store without rotation and restart the instances weekly."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Secrets Manager is purpose-built for storing, retrieving, and automatically rotating secrets such as database credentials. Applications can retrieve the current secret value at runtime with minimal code change.",
    optionExplanations: [
      "✓ Correct: Secrets Manager supports managed secret storage and automatic rotation, making it the best fit for this requirement.",
      "Manual S3 updates do not provide automated rotation and increase operational risk.",
      "User data is not an appropriate place for rotating secrets and would require repeated instance replacement.",
      "Parameter Store can store secrets, but this option does not satisfy the automatic rotation requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html", title: "What is AWS Secrets Manager?" },
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html", title: "Rotate AWS Secrets Manager secrets" }
    ]
  },
  {
    id: 16,
    question: "A company runs an application on Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer. The application occasionally becomes unhealthy because of a memory leak. The company wants the instances to be replaced automatically when they fail health checks, with no manual intervention.\n\nWhich solution meets these requirements?",
    options: [
      "Enable Elastic Load Balancing health checks for the Auto Scaling group and configure the group to replace unhealthy instances.",
      "Create an Amazon SNS topic and ask an operator to terminate unhealthy instances when a notification is received.",
      "Configure an Amazon EventBridge scheduled rule to reboot every instance every night.",
      "Use a CloudWatch dashboard to monitor the unhealthy instances and replace them manually."
    ],
    correctAnswer: 0,
    category: "Resilient Cloud Solutions",
    explanation: "Amazon EC2 Auto Scaling can use Application Load Balancer health checks to detect unhealthy instances and automatically terminate and replace them. This provides self-healing behavior with no manual intervention.",
    optionExplanations: [
      "✓ Correct: Auto Scaling with ELB health checks is the native self-healing mechanism for replacing unhealthy instances.",
      "This requires manual action and does not meet the no-manual-intervention requirement.",
      "Rebooting all instances on a schedule does not target only unhealthy instances and may disrupt healthy capacity.",
      "Dashboards provide visibility but do not automate remediation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-checks-overview.html", title: "Health checks for Auto Scaling instances" },
      { url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-add-elb-healthcheck.html", title: "Add Elastic Load Balancing health checks to an Auto Scaling group" }
    ]
  },
  {
    id: 17,
    question: "A company wants to centralize visibility into configuration compliance for resources across all AWS accounts in its organization. The company also wants to evaluate managed rules and aggregate results in one place for the security team.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Enable AWS Config in each account and Region, then configure an organization aggregator in a central account.",
      "Export AWS CloudTrail logs from each account to Amazon S3 and query them by using Amazon Athena.",
      "Create a custom AWS Lambda function in each account to scan resources and send results to Amazon SNS.",
      "Use Amazon GuardDuty to evaluate configuration compliance rules across all accounts."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Config provides managed rules for configuration compliance and supports aggregating results across accounts and Regions in an AWS Organization. This gives the security team centralized visibility with minimal custom work.",
    optionExplanations: [
      "✓ Correct: AWS Config aggregators centralize compliance results across accounts and Regions.",
      "CloudTrail focuses on API activity, not ongoing resource configuration compliance evaluation.",
      "Custom Lambda scanners add unnecessary operational overhead compared to AWS Config managed capabilities.",
      "GuardDuty detects threats and anomalies, not general resource configuration compliance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html", title: "Multi-account multi-region data aggregation" },
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html", title: "Evaluating resources with AWS Config rules" }
    ]
  },
  {
    id: 18,
    question: "A company wants to run a deployment to AWS Lambda with minimal risk. During the deployment, only a small percentage of production traffic should go to the new version at first. If errors increase, the deployment must be rolled back automatically.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Use AWS CodeDeploy with a Lambda deployment configuration that performs a canary deployment and rolls back on CloudWatch alarm failure.",
      "Publish a new Lambda version and immediately update the alias to point 100% of traffic to the new version.",
      "Create two separate Lambda functions and ask users to test the new function by using a different URL.",
      "Run the deployment during off-hours because lower traffic reduces the deployment risk."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "AWS CodeDeploy supports canary and linear traffic shifting for Lambda deployments. Combined with CloudWatch alarms, CodeDeploy can automatically stop and roll back a deployment if error rates rise.",
    optionExplanations: [
      "✓ Correct: CodeDeploy provides managed canary deployment and automatic rollback for Lambda with CloudWatch alarms.",
      "A full cutover does not satisfy the requirement to shift only a small percentage of traffic first.",
      "This is a manual and less integrated testing approach, not an automated production canary deployment.",
      "Timing alone does not provide controlled traffic shifting or automatic rollback."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html", title: "Working with deployment configurations in CodeDeploy" },
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html", title: "Automatic rollbacks in CodeDeploy" }
    ]
  },
  {
    id: 19,
    question: "A company wants to be notified whenever an AWS Health event affects any account in its AWS Organizations environment. The notification should trigger an automated remediation workflow implemented in AWS Step Functions.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Create an Amazon EventBridge rule that matches AWS Health events and starts the Step Functions state machine.",
      "Configure Amazon CloudWatch Logs subscription filters on all log groups and invoke Step Functions from the filters.",
      "Use Amazon Inspector findings as the trigger source for the Step Functions workflow.",
      "Use AWS Trusted Advisor notifications to invoke the Step Functions workflow directly."
    ],
    correctAnswer: 0,
    category: "Incident and Event Response",
    explanation: "AWS Health events can be delivered to Amazon EventBridge, which can directly invoke AWS Step Functions as a target. This provides an event-driven remediation workflow with minimal operational complexity.",
    optionExplanations: [
      "✓ Correct: EventBridge is the native routing service for AWS Health events and can directly target Step Functions.",
      "CloudWatch Logs subscription filters are unrelated to AWS Health event routing for this use case.",
      "Amazon Inspector findings are for vulnerability assessment, not general AWS Health events.",
      "Trusted Advisor is not the native event source for account-impacting AWS Health notifications in this workflow."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html", title: "Monitoring AWS Health events with Amazon EventBridge" },
      { url: "https://docs.aws.amazon.com/step-functions/latest/dg/tutorial-cloudwatch-events-s3.html", title: "Invoking Step Functions with EventBridge" }
    ]
  },
  {
    id: 20,
    question: "A company stores container images in Amazon ECR and deploys them to Amazon ECS. The security team wants every pushed image to be scanned automatically for software vulnerabilities before deployment decisions are made. The company wants to use native AWS capabilities with minimal custom code.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Enable Amazon ECR image scan on push for the repository and evaluate the scan findings before deployment.",
      "Deploy a custom Amazon EC2 instance that pulls every image and runs open-source scanners manually.",
      "Store images in Amazon S3 first, and run an AWS Lambda function to inspect the image files.",
      "Use Amazon CloudWatch Logs Insights to scan the container image layers for vulnerabilities."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Amazon ECR supports native vulnerability scanning for pushed images. Enabling scan on push is the simplest AWS-managed way to identify image vulnerabilities before promotion or deployment.",
    optionExplanations: [
      "✓ Correct: ECR scan on push provides native image vulnerability scanning with minimal operational overhead.",
      "A custom scanner fleet adds infrastructure and maintenance that are unnecessary for this requirement.",
      "Container images are natively stored in ECR for this workflow; S3 staging and Lambda inspection are unnecessary.",
      "CloudWatch Logs Insights analyzes logs, not container image layers."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html", title: "Amazon ECR image scanning" }
    ]
  },
  {
    id: 21,
    question: "A company uses AWS CodeArtifact as a private package repository for multiple development teams. The company needs to ensure that build jobs in AWS CodeBuild can download packages, but developers should not store long-lived repository credentials in source code or on build servers.\n\nWhich solution will meet these requirements with the LEAST operational overhead?",
    options: [
      "Configure the CodeBuild service role to request a CodeArtifact authorization token at build time and use the token for package manager authentication.",
      "Create a shared IAM user for all build jobs, store the access keys in the repository, and use the keys to log in to CodeArtifact.",
      "Download all required packages manually and store them in Amazon S3 before every build.",
      "Create a static username and password in AWS Secrets Manager and reuse them across all CodeBuild projects."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "AWS CodeArtifact supports temporary authorization tokens that can be requested during the build process. Using the CodeBuild service role avoids hardcoded or long-lived credentials and minimizes operational overhead.",
    optionExplanations: [
      "✓ Correct: CodeBuild can use its IAM role to request a temporary CodeArtifact authorization token at build time, which avoids storing long-lived credentials.",
      "Shared IAM user credentials in source control are insecure and violate best practices.",
      "Manual package staging in Amazon S3 adds unnecessary work and loses the benefits of CodeArtifact.",
      "Static credentials reintroduce credential management overhead and do not use the native temporary token model."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html", title: "AWS CodeArtifact authentication and tokens" },
      { url: "https://docs.aws.amazon.com/codebuild/latest/userguide/setting-up-service-role.html", title: "Allow CodeBuild to interact with other AWS services" }
    ]
  },
  {
    id: 22,
    question: "A company runs applications in multiple AWS accounts. The security team wants to automatically detect when an Amazon S3 bucket becomes publicly accessible and remediate the issue immediately by blocking public access. The solution must use managed AWS services where possible.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Create an AWS Config rule to detect publicly accessible S3 buckets and configure automatic remediation to apply S3 Block Public Access settings.",
      "Schedule a weekly AWS Lambda function that scans all S3 buckets and emails a report to the security team.",
      "Enable Amazon GuardDuty and wait for GuardDuty to remove public access from the bucket automatically.",
      "Use Amazon Macie to classify data in the bucket and manually disable public access if sensitive data is found."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Config can continuously evaluate S3 bucket configuration against managed or custom rules, and Systems Manager Automation can perform automatic remediation. This is the most direct managed approach for detecting and fixing public bucket exposure.",
    optionExplanations: [
      "✓ Correct: AWS Config with automatic remediation can detect public access quickly and apply the required S3 controls automatically.",
      "A weekly scan is not immediate and relies on manual review.",
      "GuardDuty can detect threats, but it does not automatically remediate S3 public access in this workflow.",
      "Macie focuses on data classification and discovery, not immediate bucket access remediation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/remediation.html", title: "Remediation to correct noncompliant AWS resources" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html", title: "Blocking public access to your Amazon S3 storage" }
    ]
  },
  {
    id: 23,
    question: "A company has an application running on Amazon EC2 instances in an Auto Scaling group. CPU utilization can change quickly during business hours. The company wants scaling actions to happen automatically based on average CPU utilization across the group, while minimizing the need to manage scaling policies manually.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Configure target tracking scaling on the Auto Scaling group for average CPU utilization.",
      "Create a cron schedule that adds two instances every morning and removes two instances every evening.",
      "Create a simple scaling policy and manually tune CloudWatch alarms every week.",
      "Use AWS Systems Manager Automation to launch instances whenever CPU utilization increases."
    ],
    correctAnswer: 0,
    category: "Resilient Cloud Solutions",
    explanation: "Target tracking scaling is the most automated scaling policy type for maintaining a specified metric target such as average CPU utilization. It reduces the operational effort required to manage CloudWatch thresholds and step sizes manually.",
    optionExplanations: [
      "✓ Correct: Target tracking automatically adjusts capacity to maintain a desired metric target with minimal tuning.",
      "Scheduled scaling does not respond to unpredictable load changes during the day.",
      "Manual alarm tuning increases operational overhead.",
      "Systems Manager Automation is not the native or simplest scaling mechanism for this use case."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html", title: "Target tracking scaling policies for Amazon EC2 Auto Scaling" }
    ]
  },
  {
    id: 24,
    question: "A company wants to search application logs from Amazon CloudWatch Logs to identify all requests that returned HTTP 5xx status codes in the last hour. The operations team needs an interactive way to query the logs without exporting them to another service.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use CloudWatch Logs Insights to run a query against the relevant log groups.",
      "Create an Amazon Athena table over the CloudWatch Logs log groups.",
      "Export the logs to Amazon S3 and search them manually with a text editor.",
      "Create a new Amazon Kinesis Data Streams stream and replay the last hour of logs into it."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "CloudWatch Logs Insights is designed for interactive analysis of CloudWatch Logs data. It allows operators to query recent logs directly without building an export pipeline first.",
    optionExplanations: [
      "✓ Correct: Logs Insights provides interactive log queries directly on CloudWatch Logs with minimal setup.",
      "Athena is useful for S3-based log analysis, not direct querying of CloudWatch log groups.",
      "Manual export and text search are slow and operationally inefficient.",
      "Replaying logs through Kinesis is unnecessary for a direct query requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html", title: "Analyzing log data with CloudWatch Logs Insights" }
    ]
  },
  {
    id: 25,
    question: "A company runs a microservices application on Amazon EKS. The operations team wants a centralized way to visualize application and infrastructure metrics, and the company wants to minimize management of the monitoring backend.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Use Amazon Managed Service for Prometheus to collect metrics and Amazon Managed Grafana to visualize them.",
      "Deploy Prometheus and Grafana manually on Amazon EC2 instances in a separate monitoring VPC.",
      "Send all metrics to Amazon S3 and build dashboards in a custom web application.",
      "Write the metrics to Amazon DynamoDB and query them from a Lambda-based reporting tool."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "Amazon Managed Service for Prometheus and Amazon Managed Grafana provide managed metric collection and visualization with lower operational overhead than self-hosting monitoring tools. This is especially suitable for EKS environments.",
    optionExplanations: [
      "✓ Correct: These managed services provide Prometheus-compatible monitoring and Grafana dashboards without the burden of self-managing the backend.",
      "Self-hosting Prometheus and Grafana requires more operational effort.",
      "Amazon S3 is not a direct metrics backend for near-real-time visualization in this scenario.",
      "DynamoDB and custom reporting add unnecessary complexity compared to native managed observability services."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/prometheus/latest/userguide/what-is-Amazon-Managed-Service-Prometheus.html", title: "What is Amazon Managed Service for Prometheus?" },
      { url: "https://docs.aws.amazon.com/grafana/latest/userguide/what-is-Amazon-Managed-Service-Grafana.html", title: "What is Amazon Managed Grafana?" }
    ]
  },
  {
    id: 26,
    question: "A company wants to ensure that infrastructure changes are reviewed before deployment, but still deployed through an automated pipeline after approval. The company uses AWS CloudFormation for infrastructure management.\n\nWhich solution best meets these requirements?",
    options: [
      "Configure the pipeline to create a CloudFormation change set, add a manual approval action, and execute the change set after approval.",
      "Allow developers to deploy stacks directly from their laptops after peer review in chat.",
      "Export the CloudFormation template to PDF for approval and deploy it manually after sign-off.",
      "Disable automated deployments and require the operations team to deploy every infrastructure change from the console."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "CloudFormation change sets allow teams to preview infrastructure changes before execution. Combining a change set with a manual approval stage in CodePipeline preserves review requirements while maintaining an automated deployment workflow.",
    optionExplanations: [
      "✓ Correct: This approach supports change review and approval before automated execution of the infrastructure update.",
      "Direct local deployments reduce control and auditability.",
      "PDF-based approval and manual deployment are operationally inefficient.",
      "Fully manual deployment removes the benefits of automated pipelines."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html", title: "Update stacks using change sets" },
      { url: "https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html", title: "Add a manual approval action to a stage" }
    ]
  },
  {
    id: 27,
    question: "A company uses Amazon Route 53 to direct traffic to a production API endpoint. The company is releasing a new version of the API in a separate environment and wants to shift 10% of client traffic to the new environment first, then gradually increase traffic if no issues are detected.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Use two Route 53 records with a weighted routing policy and assign 90% to the current endpoint and 10% to the new endpoint.",
      "Use a failover routing policy and point the primary record to the new endpoint.",
      "Use a geolocation routing policy so 10% of users are randomly selected for the new endpoint.",
      "Use a multivalue answer routing policy and rely on clients to choose the correct target."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "Route 53 weighted routing is designed for gradual traffic shifting between endpoints. This makes it appropriate for canary releases and phased cutovers.",
    optionExplanations: [
      "✓ Correct: Weighted routing explicitly controls the proportion of DNS traffic that goes to each environment.",
      "Failover routing is intended for disaster recovery, not gradual traffic distribution.",
      "Geolocation routing is based on user location, not percentage-based traffic shifting.",
      "Multivalue answer routing does not provide controlled weighted rollout behavior."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-weighted.html", title: "Weighted routing" }
    ]
  },
  {
    id: 28,
    question: "A company wants all API activity across its AWS Organization to be recorded centrally for security auditing. The logs must automatically include newly created accounts.\n\nWhich solution should a DevOps engineer use?",
    options: [
      "Create an organization trail in AWS CloudTrail from the management account and store logs in a central S3 bucket.",
      "Create a separate CloudTrail trail manually in each member account after account creation.",
      "Install the CloudWatch agent on every EC2 instance and send audit logs to CloudWatch Logs.",
      "Use Amazon GuardDuty to replace the need for API activity logging."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "An organization trail in AWS CloudTrail automatically applies across the AWS Organization and includes new accounts. This is the native solution for centralized API activity logging at scale.",
    optionExplanations: [
      "✓ Correct: Organization trails provide centralized audit logging across all current and future accounts.",
      "Manual per-account trail creation does not scale and may miss newly created accounts.",
      "The CloudWatch agent on EC2 instances does not capture all AWS API activity across accounts.",
      "GuardDuty analyzes threat data but does not replace CloudTrail audit logging."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html", title: "Creating a trail for an organization" }
    ]
  },
  {
    id: 29,
    question: "A company needs to run a multi-step remediation workflow whenever an Amazon EventBridge rule detects a noncompliant resource. The workflow includes approval, conditional branching, and multiple AWS API calls. The company wants a managed orchestration service.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Use AWS Step Functions as the EventBridge target to orchestrate the remediation workflow.",
      "Use an Amazon SNS topic and place all remediation logic in email notifications.",
      "Use a single AWS Lambda function with hardcoded branching for all future remediation workflows.",
      "Use Amazon SQS as the only target and require operators to process messages manually."
    ],
    correctAnswer: 0,
    category: "Incident and Event Response",
    explanation: "AWS Step Functions is the managed orchestration service designed for multi-step workflows, branching logic, approvals, and service integrations. EventBridge can invoke it directly when matching events occur.",
    optionExplanations: [
      "✓ Correct: Step Functions is the appropriate managed service for orchestrating multi-step remediation flows triggered by events.",
      "SNS provides notification, not workflow orchestration.",
      "A single Lambda function can work for simple logic, but it becomes harder to manage for complex, branching workflows.",
      "SQS alone does not orchestrate the remediation process."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html", title: "What is AWS Step Functions?" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html", title: "Amazon EventBridge targets" }
    ]
  },
  {
    id: 30,
    question: "A company wants to standardize approved infrastructure products for development teams. Teams should be able to provision only preapproved patterns such as VPCs and application stacks, while the platform team maintains the underlying templates centrally.\n\nWhich solution best meets these requirements?",
    options: [
      "Use AWS Service Catalog portfolios and products backed by approved AWS CloudFormation templates.",
      "Share a folder of CloudFormation templates and ask teams to choose the correct template manually.",
      "Create IAM users for the platform team only and prevent all developers from provisioning infrastructure.",
      "Send infrastructure requests by email to the platform team and deploy the stacks manually."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "AWS Service Catalog is built to publish approved infrastructure products that teams can provision in a controlled way, while central teams manage the underlying CloudFormation templates and governance.",
    optionExplanations: [
      "✓ Correct: Service Catalog provides controlled self-service access to approved infrastructure patterns backed by centrally managed templates.",
      "A shared template folder does not enforce standardized provisioning or governance.",
      "Blocking all developer provisioning does not meet the self-service requirement.",
      "Manual ticket or email workflows are slow and operationally inefficient."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html", title: "What is AWS Service Catalog?" }
    ]
  },
  {
    id: 31,
    question: "A company runs a serverless application on AWS Lambda behind Amazon API Gateway. The operations team wants end-to-end tracing to identify latency bottlenecks across the API layer and Lambda functions with minimal code changes.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Enable AWS X-Ray tracing on API Gateway and the Lambda functions.",
      "Send API Gateway access logs to Amazon S3 and review them manually every day.",
      "Create Amazon CloudWatch dashboards only, because dashboards provide distributed tracing automatically.",
      "Use Amazon Inspector to trace each incoming request through the application."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "AWS X-Ray provides distributed tracing across supported AWS services including API Gateway and Lambda. Enabling tracing on both services gives end-to-end visibility into latency and errors with minimal code changes.",
    optionExplanations: [
      "✓ Correct: X-Ray is the native distributed tracing solution for API Gateway and Lambda integrations.",
      "S3 log review does not provide request-level distributed tracing.",
      "CloudWatch dashboards visualize metrics but do not provide tracing by themselves.",
      "Amazon Inspector is for vulnerability assessment, not request tracing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html", title: "What is AWS X-Ray?" },
      { url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-enabling-xray.html", title: "Set up X-Ray tracing for API Gateway" }
    ]
  },
  {
    id: 32,
    question: "A company wants every Amazon EC2 instance launched in a specific Auto Scaling group to automatically register as a managed node in AWS Systems Manager. The solution must avoid manual per-instance setup and should work for newly launched replacement instances.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Attach an IAM instance profile with Systems Manager permissions and ensure the SSM Agent is installed in the launch template AMI.",
      "Create an Amazon SNS topic and ask administrators to register each new instance in Systems Manager manually.",
      "Use a bootstrap script that emails the instance ID to the operations team for manual registration.",
      "Create a CloudWatch alarm that triggers when an instance launches and stores the instance ID in Amazon S3."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "Instances become managed nodes in Systems Manager when they have network access to Systems Manager endpoints, the SSM Agent installed, and an IAM role with the required permissions. Baking the SSM Agent into the AMI and using an instance profile in the launch template ensures this works automatically for all new instances.",
    optionExplanations: [
      "✓ Correct: The instance profile and SSM Agent are the native requirements for automatic Systems Manager registration.",
      "Manual registration does not meet the automation requirement.",
      "Email-based workflows add unnecessary manual work.",
      "Storing instance IDs in S3 does not register the instances with Systems Manager."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html", title: "Create an IAM instance profile for Systems Manager" },
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html", title: "Working with SSM Agent" }
    ]
  },
  {
    id: 33,
    question: "A company deploys applications to Amazon EC2 instances by using AWS CodeDeploy. The company wants failed deployments to automatically revert to the last known good version without operator intervention.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Enable automatic rollback in CodeDeploy for deployment failures.",
      "Store the old application revision on each instance and ask operators to restore it manually when needed.",
      "Create a scheduled AWS Lambda function that redeploys the previous version every night.",
      "Disable deployment health checks so CodeDeploy completes all deployments successfully."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "AWS CodeDeploy provides built-in automatic rollback for failed deployments and alarm-triggered failures. This is the native and simplest way to return to the previous working revision automatically.",
    optionExplanations: [
      "✓ Correct: CodeDeploy automatic rollback reverts to the previous application revision when a deployment fails.",
      "Manual restoration requires operator action and does not meet the requirement.",
      "A scheduled redeployment is not tied to actual deployment failures and is operationally inefficient.",
      "Disabling health checks hides failures instead of resolving them."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html", title: "Automatic rollbacks in CodeDeploy" }
    ]
  },
  {
    id: 34,
    question: "A company stores large log archives in Amazon S3 for audit purposes. The logs must be retained for 7 years, but the company wants to minimize storage cost because the logs are rarely accessed after the first 90 days.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Create an S3 Lifecycle policy that transitions the objects to S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive after 90 days.",
      "Keep all log archives in S3 Standard for the full 7 years to ensure they are always immediately available.",
      "Copy the logs to Amazon EFS after 90 days and delete them from S3.",
      "Export the logs to Amazon EC2 instance store volumes every quarter for cheaper retention."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "Amazon S3 Lifecycle policies are the native way to reduce storage cost for long-term retention workloads. Transitioning rarely accessed logs to a Glacier storage class after 90 days lowers cost while preserving retention requirements.",
    optionExplanations: [
      "✓ Correct: Lifecycle transitions to Glacier storage classes provide lower-cost long-term archival storage.",
      "S3 Standard is more expensive than necessary for rarely accessed long-term data.",
      "Amazon EFS is not an archival storage solution for long-term log retention.",
      "EC2 instance store is ephemeral and not appropriate for durable archival retention."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html", title: "Managing your storage lifecycle" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html", title: "Using Amazon S3 storage classes" }
    ]
  },
  {
    id: 35,
    question: "A company wants to detect a sudden and unexpected increase in the 5xx error count on an Application Load Balancer without manually defining a fixed threshold.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Create a CloudWatch anomaly detection alarm on the ALB 5xx error metric.",
      "Create a static CloudWatch alarm threshold and manually adjust it every week.",
      "Export the ALB logs to Amazon S3 and run monthly analysis reports.",
      "Use AWS Trusted Advisor to alert on ALB 5xx errors automatically."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "CloudWatch anomaly detection can learn a normal metric pattern and alert when the observed metric deviates unexpectedly. This fits the requirement to avoid manually defining and maintaining a fixed threshold.",
    optionExplanations: [
      "✓ Correct: Anomaly detection alarms identify unexpected deviations without a fixed manually chosen threshold.",
      "Static thresholds require ongoing manual tuning and may not fit varying traffic patterns.",
      "Monthly reporting is not timely enough for operational detection.",
      "Trusted Advisor does not provide this ALB metric anomaly detection capability."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html", title: "Using CloudWatch outlier detection" }
    ]
  },
  {
    id: 36,
    question: "A company wants to distribute incoming tasks from an application to multiple downstream systems for independent processing. Each system must receive a copy of every task message. The company wants a fully managed fanout pattern.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Publish each task to an Amazon SNS topic and subscribe multiple endpoints such as SQS queues or Lambda functions.",
      "Store each task in a single Amazon SQS queue and let all consumers compete for the same message.",
      "Write each task to an Amazon EC2 instance and let downstream systems poll the instance.",
      "Use one AWS Lambda function to process the task and send an email summary to the other systems."
    ],
    correctAnswer: 0,
    category: "Incident and Event Response",
    explanation: "Amazon SNS is the native managed pub/sub service for fanout messaging. Each subscribed endpoint receives a copy of every published message, which matches the requirement exactly.",
    optionExplanations: [
      "✓ Correct: SNS supports managed fanout to multiple subscribers including SQS and Lambda.",
      "A single SQS queue delivers each message to only one consumer, not all consumers.",
      "An EC2-based custom polling solution adds unnecessary operational overhead.",
      "An email summary is not a reliable fanout processing architecture."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sns/latest/dg/welcome.html", title: "What is Amazon SNS?" },
      { url: "https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html", title: "Subscribing an Amazon SQS queue to an Amazon SNS topic" }
    ]
  },
  {
    id: 37,
    question: "A company wants to manage application configuration values separately from application code. The company needs the ability to deploy configuration changes gradually and validate them before full rollout to all application instances.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS AppConfig to manage configuration profiles and deployment strategies.",
      "Store the configuration in the application source repository and redeploy the entire application for every configuration change.",
      "Store the configuration in a text file on each Amazon EC2 instance and update it manually over SSH.",
      "Store the configuration in an Amazon S3 bucket and ask instances to download it once at startup only."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "AWS AppConfig is designed for application configuration management, controlled rollout strategies, validators, and safe deployment of configuration changes separately from application code.",
    optionExplanations: [
      "✓ Correct: AppConfig supports validators and gradual deployments of configuration changes.",
      "Bundling config with code increases deployment risk and slows simple config updates.",
      "Manual SSH changes do not scale and are error-prone.",
      "A startup-only download does not provide managed rollout or validation features."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html", title: "What is AWS AppConfig?" }
    ]
  },
  {
    id: 38,
    question: "A company wants to ensure that developers can deploy AWS resources only in approved Regions across all accounts in an AWS Organization. The company needs a centralized preventive control.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Create a service control policy (SCP) that denies actions outside the approved Regions and attach it to the relevant organizational units.",
      "Create IAM policies in each account separately and ask each team to maintain them.",
      "Use AWS Config rules to detect resources created in unapproved Regions after they are deployed.",
      "Use Amazon GuardDuty to block API calls in unapproved Regions."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Service control policies in AWS Organizations define preventive permission boundaries across accounts. An SCP that denies actions outside approved Regions is the centralized way to enforce this requirement.",
    optionExplanations: [
      "✓ Correct: SCPs provide organization-wide preventive controls and are the right centralized mechanism.",
      "Per-account IAM management is less centralized and more error-prone.",
      "AWS Config is detective rather than preventive for this use case.",
      "GuardDuty does not enforce Region restrictions on API calls."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" }
    ]
  },
  {
    id: 39,
    question: "A company runs a critical database on Amazon RDS. The operations team wants an automated backup policy that can be applied consistently across multiple AWS accounts and Regions from a central place.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS Backup with backup plans and AWS Organizations integration.",
      "Create manual DB snapshots in each account by using the console.",
      "Install the CloudWatch agent on the database instances and store backups in CloudWatch Logs.",
      "Use AWS Lambda to email database administrators every day so they remember to create snapshots."
    ],
    correctAnswer: 0,
    category: "Resilient Cloud Solutions",
    explanation: "AWS Backup provides centralized backup plans and policy-based backup management across supported services, accounts, and Regions. With AWS Organizations integration, it is the managed solution for consistent backup governance.",
    optionExplanations: [
      "✓ Correct: AWS Backup centralizes and automates backup policy management across accounts and Regions.",
      "Manual snapshot creation is not scalable or centrally governed.",
      "CloudWatch Logs is not a database backup solution.",
      "Reminder emails do not automate the backup process."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html", title: "What is AWS Backup?" },
      { url: "https://docs.aws.amazon.com/aws-backup/latest/devguide/manage-cross-account.html", title: "Managing backups across AWS accounts" }
    ]
  },
  {
    id: 40,
    question: "A company wants to run chaos experiments against an Amazon EC2 Auto Scaling workload to verify that the application can tolerate instance termination events. The company wants a managed AWS service for controlled fault injection experiments.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Use AWS Fault Injection Service to create and run the experiment.",
      "Terminate instances manually in production without advance planning.",
      "Create a cron job that randomly stops instances every hour on all workloads.",
      "Use Amazon Inspector to terminate instances and measure application resilience."
    ],
    correctAnswer: 0,
    category: "Resilient Cloud Solutions",
    explanation: "AWS Fault Injection Service is the managed chaos engineering service for defining and running controlled fault injection experiments on AWS workloads. It is the native choice for resilience testing in this scenario.",
    optionExplanations: [
      "✓ Correct: AWS Fault Injection Service is purpose-built for controlled resilience experiments on AWS resources.",
      "Ad hoc manual termination is risky and not a controlled experiment framework.",
      "A random cron job is unsafe and lacks governance or experiment controls.",
      "Amazon Inspector is for vulnerability assessment, not chaos engineering."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/fis/latest/userguide/what-is.html", title: "What is AWS Fault Injection Service?" }
    ]
  },
  {
    id: 41,
    question: "A company uses AWS Lambda functions that are invoked asynchronously to process uploaded files. The operations team notices that some events fail repeatedly because of malformed input. The team wants to preserve failed events for later analysis without losing them permanently.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Configure a dead-letter queue or on-failure destination for the Lambda function.",
      "Increase the Lambda timeout so malformed events have more time to succeed.",
      "Disable retries for asynchronous invocations and ignore all failed events.",
      "Store the files in Amazon EFS before invoking the function."
    ],
    correctAnswer: 0,
    category: "Incident and Event Response",
    explanation: "For asynchronous Lambda invocations, dead-letter queues and destinations provide a managed way to capture failed events after retry attempts. This allows later inspection and replay without losing the event data.",
    optionExplanations: [
      "✓ Correct: A dead-letter queue or on-failure destination captures failed asynchronous events for analysis and recovery.",
      "Malformed input will not be fixed by increasing the timeout.",
      "Disabling retries and ignoring failures loses important operational data.",
      "Amazon EFS does not address the need to preserve failed invocation events."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html", title: "Capturing records of Lambda asynchronous invocations" }
    ]
  },
  {
    id: 42,
    question: "A company wants to package and distribute reusable AWS Lambda layers for multiple teams. The company needs versioned, centrally managed artifacts that can be consumed consistently by build and deployment pipelines.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Store the build dependencies in AWS CodeArtifact and publish Lambda layer versions through the deployment pipeline.",
      "Email ZIP files of shared libraries to each development team when updates are available.",
      "Store the libraries on an Amazon EC2 instance and allow teams to SCP the files manually.",
      "Upload the shared libraries to Amazon EBS snapshots and ask teams to mount them during builds."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "AWS CodeArtifact is the managed artifact repository for package dependencies, and Lambda layer versions can be published through automated pipelines. This combination supports centralized, versioned dependency management and repeatable releases.",
    optionExplanations: [
      "✓ Correct: CodeArtifact provides managed package storage, and the pipeline can publish versioned Lambda layers in a controlled way.",
      "Emailing ZIP files is not scalable or centrally governed.",
      "Manual file transfer from EC2 adds operational overhead and weakens traceability.",
      "EBS snapshots are not an appropriate artifact distribution mechanism for shared build dependencies."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html", title: "What is AWS CodeArtifact?" },
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html", title: "Managing Lambda dependencies with layers" }
    ]
  },
  {
    id: 43,
    question: "A company wants to run security checks against infrastructure as code templates before deployment. The company uses AWS CloudFormation templates in a CI/CD pipeline and wants the checks to block noncompliant changes automatically.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Add a validation stage in the pipeline that runs static checks against the CloudFormation templates before deployment.",
      "Deploy the stack first and ask the security team to inspect the resulting resources afterward.",
      "Convert the CloudFormation templates to PDF and attach them to a ticket for manual review only.",
      "Run the pipeline only during weekends so security teams have more time to review failures."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Static validation of infrastructure as code within the CI/CD pipeline is the most direct way to detect and block noncompliant template changes before deployment. This preserves automation while enforcing preventive controls.",
    optionExplanations: [
      "✓ Correct: Pipeline-based static validation blocks noncompliant infrastructure changes before deployment.",
      "Post-deployment review is reactive and allows noncompliant resources to be created first.",
      "PDF review is manual and does not integrate directly with automated enforcement.",
      "Changing the schedule does not solve the need for automated predeployment checks."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/best-practices.html", title: "Best practices for AWS CloudFormation" },
      { url: "https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html", title: "What is AWS CodePipeline?" }
    ]
  },
  {
    id: 44,
    question: "A company has application logs in Amazon CloudWatch Logs and wants to stream those logs continuously to a downstream analytics platform in Amazon S3 with minimal custom code.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Create a CloudWatch Logs subscription that sends the logs to Amazon Kinesis Data Firehose, and configure Firehose to deliver the data to Amazon S3.",
      "Run a cron job on Amazon EC2 that downloads CloudWatch Logs every minute and uploads them to Amazon S3.",
      "Use CloudWatch dashboards to export the logs directly to Amazon S3.",
      "Create an Amazon SNS topic and subscribe Amazon S3 to the topic."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "CloudWatch Logs subscriptions can stream log events to Kinesis Data Firehose, which can deliver the data directly to Amazon S3. This provides a managed, near-real-time export path with minimal custom code.",
    optionExplanations: [
      "✓ Correct: CloudWatch Logs + Firehose + S3 is the managed streaming pipeline for this use case.",
      "An EC2-based cron job adds unnecessary infrastructure and operational overhead.",
      "Dashboards visualize data but do not provide this log export mechanism.",
      "Amazon S3 cannot subscribe directly to an SNS topic in this way for log delivery."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html", title: "Real-time processing of log data with subscriptions" },
      { url: "https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html", title: "What is Amazon Data Firehose?" }
    ]
  },
  {
    id: 45,
    question: "A company wants to test a new version of an application on Amazon ECS by sending a small portion of production traffic to a replacement task set before shifting all traffic. The company uses an Application Load Balancer and wants automated rollback if alarms are triggered.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Use AWS CodeDeploy blue/green deployments for Amazon ECS with CloudWatch alarms.",
      "Update the ECS service in place and deploy all new tasks at once.",
      "Create a second ECS cluster and ask users to switch to it manually if they want to test the new version.",
      "Deploy the new version only to a development environment and assume production will behave the same way."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "AWS CodeDeploy supports blue/green deployments for Amazon ECS, including shifting production traffic between task sets and rolling back automatically when CloudWatch alarms indicate a problem.",
    optionExplanations: [
      "✓ Correct: CodeDeploy blue/green deployments for ECS support controlled traffic shifting and rollback.",
      "An in-place deployment does not provide canary-style traffic shifting to a replacement task set.",
      "Manual user switching is not an automated production deployment strategy.",
      "Testing only in development does not validate production behavior under real traffic."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html", title: "Deploy Amazon ECS services with CodeDeploy" },
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html", title: "Amazon ECS blue/green deployments" }
    ]
  },
  {
    id: 46,
    question: "A company wants all newly created Amazon EBS volumes to be encrypted automatically without requiring developers to remember to select encryption during provisioning.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Enable EBS encryption by default in each required AWS Region.",
      "Create a monthly audit script that reports unencrypted EBS volumes.",
      "Ask developers to store a checklist in each repository that reminds them to enable encryption.",
      "Use Amazon Inspector to encrypt EBS volumes after they are created."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Amazon EBS encryption by default automatically encrypts newly created volumes and snapshots in a Region. This is the native preventive control for the requirement.",
    optionExplanations: [
      "✓ Correct: EBS encryption by default enforces encryption automatically for new volumes.",
      "A monthly audit is detective and too late to prevent unencrypted volume creation.",
      "Developer reminders are not an enforceable preventive control.",
      "Amazon Inspector does not perform this type of storage encryption action."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ebs/latest/userguide/encryption-by-default.html", title: "Amazon EBS encryption by default" }
    ]
  },
  {
    id: 47,
    question: "A company wants to standardize Amazon Machine Image (AMI) creation for application servers, including patching, package installation, and validation tests. The process must be repeatable and automated.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Use EC2 Image Builder to define and run the AMI build pipeline.",
      "Create one manually configured EC2 instance and ask teams to create AMIs from it whenever needed.",
      "Use AWS CloudTrail to record AMI creation steps and replay them later.",
      "Use Amazon Inspector to generate AMIs from existing instances."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "EC2 Image Builder is the managed service for automating the creation, maintenance, validation, and testing of updated machine images. It is the native repeatable solution for standardized AMI pipelines.",
    optionExplanations: [
      "✓ Correct: EC2 Image Builder automates image creation, patching, and validation.",
      "Manual image creation is error-prone and not consistently repeatable.",
      "CloudTrail records API activity but does not provide an AMI build pipeline.",
      "Amazon Inspector is for vulnerability assessment, not image generation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html", title: "What is EC2 Image Builder?" }
    ]
  },
  {
    id: 48,
    question: "A company wants to ensure that an operations team is notified immediately when an RDS DB instance fails over. The team also wants to trigger an automated runbook to collect diagnostic information.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Create an Amazon EventBridge rule that matches the RDS failover event, send a notification, and invoke an AWS Systems Manager Automation runbook.",
      "Ask the database team to check the RDS console every hour for failover events.",
      "Create a weekly AWS Lambda report of all RDS events and email it to the operations team.",
      "Use Amazon Athena to query CloudTrail logs once a day for RDS failover activity."
    ],
    correctAnswer: 0,
    category: "Incident and Event Response",
    explanation: "Amazon EventBridge can react to Amazon RDS events in near real time. Sending notifications and invoking a Systems Manager Automation runbook creates an event-driven operational response with minimal manual effort.",
    optionExplanations: [
      "✓ Correct: EventBridge can match RDS failover events and trigger both notification and automated runbook execution.",
      "Hourly console checks are manual and not immediate.",
      "A weekly report is too delayed for operational response.",
      "Daily log analysis is not suitable for immediate incident response."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eventbridge/latest/ref/events-ref-rds.html", title: "Amazon RDS events" },
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-documents.html", title: "AWS Systems Manager Automation runbooks" }
    ]
  },
  {
    id: 49,
    question: "A company wants to allow developers to access temporary credentials for an AWS account through centralized workforce authentication, without creating long-lived IAM users in each account.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS IAM Identity Center to provide federated access and permission sets across accounts.",
      "Create IAM users in every account and rotate their access keys manually every 90 days.",
      "Create one shared root user password for each account and store it in AWS Secrets Manager.",
      "Use Amazon Cognito user pools to sign developers directly into the AWS Management Console."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS IAM Identity Center is the managed AWS service for centralized workforce access, federation, and permission management across multiple AWS accounts. It issues temporary credentials rather than relying on long-lived IAM users.",
    optionExplanations: [
      "✓ Correct: IAM Identity Center provides centralized sign-in and temporary access across accounts using permission sets.",
      "Per-account IAM users increase credential sprawl and operational overhead.",
      "Shared root credentials are insecure and violate AWS best practices.",
      "Amazon Cognito is primarily for application user authentication, not workforce access to AWS accounts."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html", title: "What is IAM Identity Center?" }
    ]
  },
  {
    id: 50,
    question: "A company wants to detect drift between deployed AWS CloudFormation stacks and the expected template-defined state. The company needs a native AWS capability for identifying when stack resources no longer match the template.\n\nWhich solution should a DevOps engineer use?",
    options: [
      "Use CloudFormation drift detection on the deployed stacks.",
      "Use Amazon GuardDuty to compare the deployed resources with the CloudFormation template.",
      "Use Amazon Athena to query CloudTrail and infer drift from historical API events only.",
      "Use AWS CodeCommit to compare stack templates stored in source control with deployed resources automatically."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "CloudFormation drift detection is the native feature for identifying whether deployed stack resources differ from the expected template configuration. It directly addresses the requirement without building a custom comparison workflow.",
    optionExplanations: [
      "✓ Correct: Drift detection is the built-in CloudFormation capability for comparing actual resource state to the template-defined state.",
      "GuardDuty is for threat detection, not CloudFormation configuration drift analysis.",
      "CloudTrail history does not directly provide native stack drift analysis.",
      "Source control comparison alone does not evaluate the actual deployed resource state."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html", title: "Detect unmanaged configuration changes to stacks and resources with drift detection" }
    ]
  },
  {
    id: 51,
    question: "A company uses AWS Step Functions to orchestrate a deployment workflow. The company wants to pause the workflow for an approval decision from an operator before the production deployment step continues.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use a Step Functions task that waits for a callback token and resume the workflow after the approval system returns the token.",
      "Add a fixed 1-hour Wait state and assume an operator will make a decision during that time.",
      "Replace the workflow with an Amazon SNS email and ask the operator to deploy manually.",
      "Use AWS CloudTrail to detect the operator decision and continue the workflow automatically."
    ],
    correctAnswer: 0,
    category: "Incident and Event Response",
    explanation: "Step Functions supports task tokens for human approval and external system callbacks. This is the managed way to pause workflow execution until an explicit approval decision is returned.",
    optionExplanations: [
      "✓ Correct: Callback tokens are the native mechanism to pause and resume Step Functions workflows based on an external approval response.",
      "A fixed wait does not guarantee that approval occurred before continuing.",
      "Replacing orchestration with manual email breaks the automated workflow requirement.",
      "CloudTrail is not the right control-plane approval callback mechanism for this workflow step."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token", title: "Wait for a callback with task token" }
    ]
  },
  {
    id: 52,
    question: "A company wants to track the average duration and failure rate of AWS CodeBuild builds over time and create dashboards for the engineering team. The company wants to use native AWS observability features.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Use Amazon CloudWatch metrics published by CodeBuild and build dashboards from those metrics.",
      "Export every build log to Amazon S3 and calculate build duration manually in spreadsheets.",
      "Create an Amazon EC2 instance to scrape the CodeBuild console periodically.",
      "Send CodeBuild notifications to email and ask engineers to summarize failures weekly."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "AWS CodeBuild publishes metrics to Amazon CloudWatch, which can be used directly for alarms and dashboards. This is the native and simplest approach for build observability.",
    optionExplanations: [
      "✓ Correct: CloudWatch metrics from CodeBuild can be visualized in dashboards and monitored over time with no custom scraping.",
      "Manual spreadsheet analysis is inefficient and not real time.",
      "Console scraping is fragile and unnecessary when native metrics already exist.",
      "Email summaries do not provide the requested observability dashboard."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codebuild/latest/userguide/cloudwatch_metrics-codebuild.html", title: "Amazon CloudWatch metrics for AWS CodeBuild" },
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html", title: "Use CloudWatch dashboards" }
    ]
  },
  {
    id: 53,
    question: "A company stores application secrets in AWS Secrets Manager. The security team wants to detect any secret that has not been rotated within the company's required rotation interval across multiple accounts.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Use AWS Config rules to evaluate Secrets Manager rotation compliance and aggregate the results centrally.",
      "Ask each account owner to review the Secrets Manager console manually every month.",
      "Export all secrets to Amazon S3 and inspect them with Athena.",
      "Use Amazon GuardDuty to report secret rotation age automatically."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Config can evaluate configuration compliance, including managed rules related to Secrets Manager rotation. Aggregating the results centrally gives the security team a scalable compliance view across accounts.",
    optionExplanations: [
      "✓ Correct: AWS Config provides managed compliance evaluation and centralized aggregation for this kind of requirement.",
      "Manual monthly review does not scale well across multiple accounts.",
      "Exporting secrets is unnecessary and introduces additional security risk.",
      "GuardDuty focuses on threat detection, not secret rotation compliance evaluation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html", title: "List of AWS Config Managed Rules" },
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html", title: "Rotate AWS Secrets Manager secrets" }
    ]
  },
  {
    id: 54,
    question: "A company runs a web application on Amazon EC2 instances behind an Application Load Balancer. The company wants to protect the application from common web exploits such as SQL injection and cross-site scripting with minimal changes to the application.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Associate AWS WAF with the Application Load Balancer and use managed rule groups.",
      "Install antivirus software on each EC2 instance and schedule daily scans.",
      "Use Amazon GuardDuty to block malicious HTTP requests before they reach the load balancer.",
      "Store ALB access logs in Amazon S3 and review them weekly for attack patterns."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS WAF with managed rule groups provides application-layer protection against common web exploits and can be associated directly with an Application Load Balancer without code changes.",
    optionExplanations: [
      "✓ Correct: AWS WAF on the ALB is the native service for protecting web applications against common HTTP attacks.",
      "Antivirus does not provide Layer 7 web request filtering against SQL injection or XSS.",
      "GuardDuty detects threats but does not directly block web requests in this scenario.",
      "Weekly log review is detective and delayed, not preventive."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html", title: "What is AWS WAF?" },
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-list.html", title: "AWS Managed Rules rule groups list" }
    ]
  },
  {
    id: 55,
    question: "A company wants to deploy a standard VPC architecture to multiple AWS accounts and Regions. The architecture will evolve over time, and the company wants to update every deployment consistently from a central location.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Use AWS CloudFormation StackSets to deploy and update the VPC stack across accounts and Regions.",
      "Export a VPC template as a PDF and send it to each account owner for manual implementation.",
      "Use a separate local script on each administrator laptop to build the VPC manually in each account.",
      "Deploy the VPC once in the management account and share the exact same VPC across all Regions."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "CloudFormation StackSets is designed for centrally managed deployments and updates across multiple AWS accounts and Regions. This makes it the correct native tool for standardizing VPC infrastructure at scale.",
    optionExplanations: [
      "✓ Correct: StackSets provides centralized deployment and lifecycle management across many accounts and Regions.",
      "A PDF is not an infrastructure deployment or update mechanism.",
      "Manual scripts on individual laptops reduce consistency and governance.",
      "A VPC is regional and cannot be shared as one VPC across all Regions in this way."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html", title: "Working with AWS CloudFormation StackSets" }
    ]
  },
  {
    id: 56,
    question: "A company wants to capture all changes to IAM policies and roles in an AWS account and be able to investigate who made the changes and when the changes occurred.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS CloudTrail to record IAM API activity and review the relevant events.",
      "Use Amazon CloudWatch dashboards because dashboards automatically store every IAM change event.",
      "Install the CloudWatch agent on developer laptops to capture IAM role changes.",
      "Use Amazon Inspector to track IAM modification history."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS CloudTrail records management events, including IAM API activity, with details about the principal, time, and API action. This is the native audit trail for investigating IAM changes.",
    optionExplanations: [
      "✓ Correct: CloudTrail provides the required audit history for IAM changes and identifies who made each change.",
      "Dashboards visualize metrics but do not provide a management event audit trail.",
      "Developer laptops are not the right source of authoritative IAM API audit records.",
      "Amazon Inspector is not an IAM audit history service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html", title: "What is AWS CloudTrail?" }
    ]
  },
  {
    id: 57,
    question: "A company wants to reduce the time required to recover application servers in a second Region after a disaster. The company already replicates application data, but rebuilding the EC2 instances and installing software takes too long.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Create and maintain prebuilt AMIs in the recovery Region so instances can launch quickly during failover.",
      "Store the installation steps in a wiki page and ask operators to rebuild servers manually when needed.",
      "Use Amazon Athena to query the current server inventory before starting recovery.",
      "Install the CloudWatch agent on every server to reduce launch time during recovery."
    ],
    correctAnswer: 0,
    category: "Resilient Cloud Solutions",
    explanation: "Prebuilt AMIs in the recovery Region shorten recovery time by avoiding the need to install and configure software during a disaster. This directly supports faster EC2 workload restoration.",
    optionExplanations: [
      "✓ Correct: Prebuilt AMIs reduce recovery time by allowing rapid launch of already configured servers in the secondary Region.",
      "Wiki instructions are manual and slow under disaster conditions.",
      "Inventory queries do not solve the time needed to rebuild instances.",
      "The CloudWatch agent does not reduce server provisioning time for recovery."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html", title: "Disaster recovery options in the cloud" },
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html", title: "Amazon Machine Images (AMI)" }
    ]
  },
  {
    id: 58,
    question: "A company uses Amazon SQS to decouple workloads. The company wants to ensure that a failed message does not block progress for the rest of the queue and that messages which exceed the maximum retry count are isolated for later investigation.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Configure a dead-letter queue for the Amazon SQS queue with an appropriate maxReceiveCount.",
      "Increase the visibility timeout indefinitely so failed messages stay hidden forever.",
      "Create a second producer that republishes every failed message back to the original queue immediately.",
      "Use Amazon SNS instead of Amazon SQS because SNS automatically stores poisoned messages."
    ],
    correctAnswer: 0,
    category: "Incident and Event Response",
    explanation: "An SQS dead-letter queue isolates messages that fail processing repeatedly after a specified number of receives. This prevents poisoned messages from blocking the main queue and supports later analysis.",
    optionExplanations: [
      "✓ Correct: A dead-letter queue is the native pattern for isolating repeatedly failing SQS messages.",
      "An infinite visibility timeout would hide the problem rather than isolate and investigate it.",
      "Immediately republishing failed messages can create endless retry loops.",
      "SNS is a pub/sub service and does not replace SQS dead-letter queue behavior."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html", title: "Using dead-letter queues in Amazon SQS" }
    ]
  },
  {
    id: 59,
    question: "A company runs applications in multiple AWS accounts and wants a central security service to aggregate findings from services such as GuardDuty, Inspector, and AWS Config. The security team wants one place to review and prioritize findings.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS Security Hub with delegated administrator configuration across the organization.",
      "Create a separate Amazon S3 bucket for each account and ask the security team to review exported findings manually.",
      "Use Amazon CloudFront to aggregate findings from all security services.",
      "Use AWS Directory Service to consolidate security findings in one dashboard."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Security Hub aggregates, normalizes, and prioritizes findings from multiple AWS security services and partner products. Organization integration and delegated administration make it the right centralized solution.",
    optionExplanations: [
      "✓ Correct: Security Hub is the managed AWS service for centralized security findings aggregation and prioritization.",
      "Manual S3 export review is operationally inefficient and not centralized in a purpose-built findings service.",
      "CloudFront is a content delivery service, not a security findings aggregation platform.",
      "Directory Service is unrelated to security findings aggregation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html", title: "What is AWS Security Hub?" },
      { url: "https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-accounts-orgs.html", title: "Managing administrator and member accounts in Security Hub" }
    ]
  },
  {
    id: 60,
    question: "A company wants to enforce a standard set of tags on new AWS resources and automatically notify the operations team if noncompliant resources are created. The company wants an AWS-native compliance monitoring approach.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Use AWS Config rules to evaluate required tags and trigger notifications for noncompliant resources.",
      "Create a wiki page that lists the required tags and ask developers to follow it manually.",
      "Use Amazon CloudWatch dashboards to block resource creation if tags are missing.",
      "Use Amazon S3 object tagging on deployment artifacts and assume the deployed resources inherit the same tags automatically."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Config can evaluate whether resources comply with required tagging policies and can be combined with notifications or remediation workflows. This is the native compliance-monitoring approach for tag governance.",
    optionExplanations: [
      "✓ Correct: AWS Config rules provide centralized, automated detection of missing required tags.",
      "Documentation alone does not provide enforcement or monitoring.",
      "CloudWatch dashboards do not block or evaluate tag compliance on their own.",
      "Artifact tags do not automatically propagate to deployed AWS resources in this general way."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_use-managed-rules.html", title: "Evaluating resources with AWS Config rules" },
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/required-tags.html", title: "required-tags" }
    ]
  },
  {
    id: 61,
    question: "A company wants to standardize how Amazon EC2 instances are configured after launch. The company needs to continuously enforce that required packages and services remain installed and running on all instances.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Use AWS Systems Manager State Manager to apply and maintain the desired configuration on the instances.",
      "Run a bootstrap script only once in user data and assume the configuration never changes afterward.",
      "Ask administrators to connect over SSH every week and verify that each instance is configured correctly.",
      "Use Amazon CloudWatch dashboards to ensure the packages remain installed."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "AWS Systems Manager State Manager is designed to maintain instances in a desired state over time. It can continuously apply configuration and enforce required settings, which is more reliable than one-time bootstrap scripts or manual checks.",
    optionExplanations: [
      "✓ Correct: State Manager is the native Systems Manager capability for ongoing desired-state configuration enforcement.",
      "User data is primarily for one-time bootstrapping and does not continuously enforce state.",
      "Manual SSH verification is not scalable or reliable for continuous enforcement.",
      "Dashboards provide visibility, not ongoing configuration management."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html", title: "AWS Systems Manager State Manager" }
    ]
  },
  {
    id: 62,
    question: "A company wants to trigger a CI/CD pipeline whenever a container image is pushed to an Amazon ECR repository. The solution should be event driven and should not rely on periodic polling.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Create an Amazon EventBridge rule for ECR image push events and use it to start the pipeline.",
      "Schedule an AWS Lambda function to poll the ECR repository every 10 minutes for new images.",
      "Use an Amazon SNS topic that the repository publishes to directly for every push and subscribe the pipeline to it.",
      "Configure AWS CloudTrail to scan the repository every hour and launch the pipeline if a change is found."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "Amazon ECR emits events to Amazon EventBridge for image actions such as image pushes. EventBridge is the native event-driven way to start downstream automation such as a CI/CD pipeline without polling.",
    optionExplanations: [
      "✓ Correct: EventBridge can react to ECR push events immediately and trigger the pipeline without scheduled polling.",
      "Polling introduces delay and unnecessary custom logic.",
      "Direct SNS-based repository publishing is not the standard native trigger model for this workflow.",
      "CloudTrail is not the correct mechanism for hourly repository polling."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eventbridge/latest/ref/events-ref-ecr.html", title: "Amazon ECR events" },
      { url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/ecr-eventbridge.html", title: "Amazon ECR events and EventBridge" }
    ]
  },
  {
    id: 63,
    question: "A company wants to analyze VPC network traffic patterns for troubleshooting and security investigations. The company needs logs of accepted and rejected traffic metadata without installing agents on instances.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Enable VPC Flow Logs for the required VPCs or subnets and deliver the logs to CloudWatch Logs or Amazon S3.",
      "Install the CloudWatch agent on each EC2 instance to capture every packet traversing the VPC.",
      "Use Amazon Inspector to record all accepted and rejected network packets in the VPC.",
      "Enable Route 53 query logging because it captures all VPC network traffic."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "VPC Flow Logs provide metadata about IP traffic to and from network interfaces in a VPC, including accepted and rejected traffic. This is the native, agentless AWS solution for the requirement.",
    optionExplanations: [
      "✓ Correct: VPC Flow Logs provide network traffic metadata without requiring agents on instances.",
      "The CloudWatch agent is not the native solution for VPC-level flow logging.",
      "Amazon Inspector is for vulnerability and exposure assessment, not VPC network flow logging.",
      "Route 53 query logging captures DNS queries, not all VPC traffic."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html", title: "VPC Flow Logs" }
    ]
  },
  {
    id: 64,
    question: "A company wants to enforce that only approved container images are deployed to Amazon ECS. The company maintains the approved images in Amazon ECR and wants deployment checks to happen automatically in the pipeline.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Add a pipeline validation step that verifies the image URI and tag or digest against the approved ECR repository before deployment.",
      "Allow any image to be deployed and rely on developers to remember which repositories are approved.",
      "Review ECS service definitions manually in the console after every production deployment.",
      "Store a list of approved image names in a spreadsheet that release managers consult before each launch."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Automated validation in the pipeline is the preventive control that stops unapproved images before deployment. Verifying the ECR repository and the image tag or digest ensures only approved images progress to production.",
    optionExplanations: [
      "✓ Correct: Pipeline validation is the most direct automated control to prevent unapproved images from being deployed.",
      "Relying on memory or documentation is not an enforceable control.",
      "Manual post-deployment review is reactive and too late.",
      "A spreadsheet is not an automated deployment control."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/security-tasks-containers.html", title: "Security best practices for Amazon ECS" },
      { url: "https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html", title: "What is AWS CodePipeline?" }
    ]
  },
  {
    id: 65,
    question: "A company wants to ensure that Amazon RDS snapshots are copied automatically to a second AWS Region for disaster recovery. The company wants to minimize custom scripting and centralize backup governance.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Use AWS Backup with cross-Region copy rules in a backup plan.",
      "Ask database administrators to copy each RDS snapshot manually after it is created.",
      "Export the snapshots to Amazon S3 and reimport them into RDS in the second Region once a month.",
      "Use Amazon CloudWatch Logs to replicate database snapshots across Regions automatically."
    ],
    correctAnswer: 0,
    category: "Resilient Cloud Solutions",
    explanation: "AWS Backup supports centralized backup plans and cross-Region copy rules for supported services such as Amazon RDS. This provides managed, policy-based disaster recovery backup governance with minimal custom automation.",
    optionExplanations: [
      "✓ Correct: AWS Backup can automate cross-Region backup copies under a centrally managed plan.",
      "Manual copying is operationally inefficient and not centrally governed.",
      "S3 export and reimport adds unnecessary complexity and delay.",
      "CloudWatch Logs is unrelated to snapshot replication."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html", title: "Creating backup copies across AWS Regions" }
    ]
  },
  {
    id: 66,
    question: "A company wants to know whenever the estimated monthly AWS bill exceeds a defined threshold. The company needs an automated alerting mechanism with minimal setup.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Create an Amazon CloudWatch billing alarm and send notifications through Amazon SNS.",
      "Run a weekly AWS Lambda function that emails a Cost Explorer screenshot to the finance team.",
      "Enable AWS Trusted Advisor and wait for a cost event to appear.",
      "Query AWS CloudTrail for billing API calls and send an alert if any are detected."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "CloudWatch billing alarms provide the native AWS mechanism for notifying teams when estimated charges exceed a threshold. Combined with Amazon SNS, this creates a simple and effective alerting workflow.",
    optionExplanations: [
      "✓ Correct: CloudWatch billing alarms are purpose-built for cost threshold alerting.",
      "A weekly screenshot workflow is delayed and manual.",
      "Trusted Advisor is not the direct native alerting mechanism for estimated bill thresholds.",
      "CloudTrail does not provide the estimated billing alarm function required here."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html", title: "Creating a billing alarm to monitor your estimated AWS charges" }
    ]
  },
  {
    id: 67,
    question: "A company wants to route events from multiple AWS services to a central event bus in a dedicated operations account for analysis and remediation. The company wants a managed, event-driven integration approach.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Use Amazon EventBridge with cross-account event bus permissions and rules.",
      "Send all service events to Amazon S3 and ask operators to review them manually.",
      "Create a shared Amazon EC2 server that every AWS service writes events to by using SSH.",
      "Use Amazon Route 53 to forward service events to the operations account."
    ],
    correctAnswer: 0,
    category: "Incident and Event Response",
    explanation: "Amazon EventBridge supports custom and cross-account event buses, making it the native event-driven service for routing events between AWS accounts for centralized operations workflows.",
    optionExplanations: [
      "✓ Correct: EventBridge supports cross-account event routing and centralized event buses.",
      "Manual S3 review is not an event-driven integration approach.",
      "An EC2 server receiving events by SSH is not a managed or scalable event architecture.",
      "Route 53 handles DNS, not cross-account service event routing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html", title: "Sending and receiving events between AWS accounts" }
    ]
  },
  {
    id: 68,
    question: "A company wants to ensure that every API call made in an AWS account can be linked to the IAM principal or assumed role that made the call. The company also wants to retain this audit information for long-term analysis.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Enable AWS CloudTrail and store the logs in Amazon S3 for long-term retention and analysis.",
      "Enable Amazon GuardDuty because it stores every API call and principal relationship permanently.",
      "Use CloudWatch dashboards to record the full details of each API call.",
      "Install the CloudWatch agent on developer laptops to collect every API request they initiate."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS CloudTrail records API activity, including identity details about the principal or assumed role that invoked the API call. Storing the logs in Amazon S3 supports durable retention and later analysis.",
    optionExplanations: [
      "✓ Correct: CloudTrail provides the authoritative audit history of API activity and caller identity details.",
      "GuardDuty analyzes security findings, not long-term complete API audit logs.",
      "Dashboards visualize metrics but do not store full management event histories.",
      "Laptop agents do not provide a complete authoritative record of all account API activity."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-user-identity.html", title: "AWS CloudTrail userIdentity element" },
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html", title: "What is AWS CloudTrail?" }
    ]
  },
  {
    id: 69,
    question: "A company wants to run recurring operational tasks such as restarting services and clearing temporary files on a fleet of Amazon EC2 instances without opening inbound SSH access. The company wants a managed solution that can target instances by tag.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS Systems Manager Run Command to execute commands on tagged instances.",
      "Open port 22 on every instance and run shell scripts remotely from an administrator laptop.",
      "Create a CloudWatch dashboard listing all instance IDs and ask operators to log in manually.",
      "Use Amazon SNS to send each instance an email containing the command to run."
    ],
    correctAnswer: 0,
    category: "Incident and Event Response",
    explanation: "AWS Systems Manager Run Command is the native managed service for executing commands on fleets of instances without requiring inbound SSH access. It supports targeting by tags and integrates with Systems Manager-managed nodes.",
    optionExplanations: [
      "✓ Correct: Run Command supports secure remote execution on managed instances and can target instances by tags.",
      "Opening SSH access increases operational risk and management overhead.",
      "Dashboards do not execute operational tasks.",
      "Email is not a command execution mechanism for EC2 instances."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/execute-remote-commands.html", title: "Working with Run Command" }
    ]
  },
  {
    id: 70,
    question: "A company wants to identify potentially unintended public or cross-account access granted by resource-based policies across multiple AWS accounts. The security team wants a managed analyzer service for this purpose.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use IAM Access Analyzer across the organization to identify external access findings.",
      "Use AWS X-Ray to trace cross-account policy evaluations at runtime.",
      "Use Amazon CloudFront reports to identify public IAM policies.",
      "Use AWS CodeBuild to parse every policy file manually on a nightly schedule."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "IAM Access Analyzer is the AWS-managed service that identifies resources shared with external principals through resource-based policies. It is the native solution for discovering unintended public or cross-account access.",
    optionExplanations: [
      "✓ Correct: IAM Access Analyzer analyzes resource policies and reports findings for external access.",
      "AWS X-Ray is for application tracing, not IAM policy access analysis.",
      "CloudFront reports do not analyze cross-account resource policy exposure.",
      "Nightly manual parsing is more complex and less reliable than the managed service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html", title: "What is IAM Access Analyzer?" }
    ]
  },
  {
    id: 71,
    question: "A company uses AWS CodePipeline for application deployments. The company wants to prevent deployments to production unless a designated operations team explicitly approves the release in the pipeline.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Add a manual approval action to the production stage in CodePipeline.",
      "Send an email after every deployment and ask the operations team whether the release was acceptable.",
      "Pause the deployment by adding a fixed 2-hour delay before the production stage.",
      "Require developers to message the operations team in chat before they start the pipeline."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "CodePipeline provides a native manual approval action that pauses pipeline execution until an authorized approver explicitly approves the release. This is the managed and auditable way to enforce approval gates.",
    optionExplanations: [
      "✓ Correct: Manual approval actions in CodePipeline create an explicit approval gate before production deployment.",
      "An email after deployment does not prevent the production deployment from already occurring.",
      "A fixed delay is not an approval control.",
      "Chat messages are informal and not an auditable pipeline gate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html", title: "Add a manual approval action to a stage" }
    ]
  },
  {
    id: 72,
    question: "A company wants to collect custom application metrics from Amazon EC2 instances and visualize them in Amazon CloudWatch. The metrics are not available by default from AWS services.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Use the CloudWatch agent or PutMetricData API to publish custom metrics to CloudWatch.",
      "Store the metrics in Amazon S3 and expect CloudWatch to discover them automatically.",
      "Write the metrics to a local text file on the instance and create a CloudWatch dashboard from the file.",
      "Use Amazon Route 53 health checks to publish the custom application metrics to CloudWatch."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "Custom metrics can be published to Amazon CloudWatch either through the CloudWatch agent or by calling the PutMetricData API. This is the native way to bring application-specific metrics into CloudWatch.",
    optionExplanations: [
      "✓ Correct: The CloudWatch agent and PutMetricData are the supported ways to publish custom metrics.",
      "CloudWatch does not automatically discover arbitrary metric files in Amazon S3.",
      "A local text file is not a CloudWatch metrics source.",
      "Route 53 health checks are not a general-purpose mechanism for publishing arbitrary application metrics."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html", title: "Publish custom metrics" },
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html", title: "Collect metrics with the CloudWatch agent" }
    ]
  },
  {
    id: 73,
    question: "A company wants to ensure that an Amazon S3 bucket used for log storage cannot be deleted accidentally. The company wants a simple protection mechanism that applies directly to the CloudFormation-managed bucket.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Apply a CloudFormation stack policy or a DeletionPolicy retention setting for the bucket resource.",
      "Store the bucket name in a wiki page and remind administrators not to delete it.",
      "Create a CloudWatch dashboard that shows the bucket and assume this prevents deletion.",
      "Export the bucket contents to Amazon EFS every day so deletion is not a concern."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "CloudFormation supports protections such as DeletionPolicy for resources so that important resources like log buckets are retained instead of deleted during stack operations. This is the native mechanism for protecting stack-managed resources.",
    optionExplanations: [
      "✓ Correct: CloudFormation resource retention settings help prevent accidental deletion of important resources.",
      "Documentation is not an enforceable protection mechanism.",
      "Dashboards provide visibility only and do not block deletion.",
      "Daily exports do not prevent deletion of the original bucket."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html", title: "DeletionPolicy attribute" },
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html", title: "Prevent updates to stack resources" }
    ]
  },
  {
    id: 74,
    question: "A company wants to receive an alert whenever an Amazon EC2 instance in a production Auto Scaling group becomes impaired at the instance status check level. The alert should be generated automatically.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Create an Amazon CloudWatch alarm on the EC2 StatusCheckFailed metric and send notifications through Amazon SNS.",
      "Review the EC2 console health page manually every morning.",
      "Create a Route 53 health check for the instance's private IP address and wait for an email from the DNS team.",
      "Use AWS Trusted Advisor because it continuously sends instance status check alerts by default."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "Amazon EC2 publishes status check metrics such as StatusCheckFailed to CloudWatch. A CloudWatch alarm on this metric is the native way to generate automated notifications when an instance becomes impaired.",
    optionExplanations: [
      "✓ Correct: CloudWatch alarms on EC2 status check metrics provide immediate, automated alerting.",
      "Manual console review is delayed and operationally inefficient.",
      "Route 53 health checks are not the primary solution for EC2 status check metrics.",
      "Trusted Advisor does not provide this specific metric alarming workflow by default."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-system-instance-status-check.html", title: "Status checks for your instances" },
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html", title: "Instance metrics" }
    ]
  },
  {
    id: 75,
    question: "A company wants to detect whether IAM users have console sign-in without multi-factor authentication enabled. The security team wants an automated compliance view.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS Config rules to evaluate IAM users for MFA compliance.",
      "Ask each IAM user to confirm by email whether MFA is enabled.",
      "Use Amazon CloudFront standard logs to determine whether MFA is enabled on IAM users.",
      "Store IAM usernames in Amazon S3 and compare them manually with the console settings each month."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Config provides managed rules to evaluate IAM MFA compliance and gives a centralized compliance view. This is the native automated method for detecting whether users have MFA enabled.",
    optionExplanations: [
      "✓ Correct: AWS Config can automatically evaluate MFA-related IAM compliance requirements.",
      "Email-based attestation is manual and unreliable.",
      "CloudFront logs have no relation to IAM MFA configuration.",
      "Manual monthly comparison does not provide automated compliance monitoring."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html", title: "List of AWS Config Managed Rules" },
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html", title: "AWS multi-factor authentication in IAM" }
    ]
  },
  {
    id: 76,
    question: "A company wants to run a workflow whenever a deployment alarm enters the ALARM state. The workflow should gather logs, open an incident record, and invoke remediation steps automatically.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Configure the CloudWatch alarm to publish to an Amazon SNS topic or trigger Amazon EventBridge, and start an automated remediation workflow.",
      "Create a weekly report of alarm state transitions and review it manually.",
      "Log in to the CloudWatch console every day to see whether any alarms changed state.",
      "Store alarm names in a text file and ask operators to update it whenever an alarm fires."
    ],
    correctAnswer: 0,
    category: "Incident and Event Response",
    explanation: "CloudWatch alarms can trigger automated workflows through SNS and EventBridge. This enables incident response actions such as notifications, ticket creation, and remediation with minimal delay and no manual polling.",
    optionExplanations: [
      "✓ Correct: Alarm state changes can trigger automated workflows immediately through SNS or EventBridge integrations.",
      "A weekly report is far too delayed for incident response.",
      "Manual console checks are not an automated response.",
      "A text file does not provide an event-driven remediation workflow."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html", title: "Using Amazon CloudWatch alarms" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudwatch.html", title: "Amazon CloudWatch events" }
    ]
  },
  {
    id: 77,
    question: "A company wants a reproducible way to build application environments for developers by using infrastructure as code in Python and TypeScript rather than writing raw AWS CloudFormation templates.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS Cloud Development Kit (AWS CDK) to define infrastructure in code and synthesize CloudFormation templates.",
      "Use Amazon EC2 user data scripts only and avoid infrastructure as code frameworks.",
      "Store architecture diagrams in a wiki and ask developers to build environments manually.",
      "Use Amazon Route 53 records as the primary infrastructure as code definition for the environment."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "AWS CDK allows teams to define infrastructure using general-purpose programming languages such as Python and TypeScript, and it synthesizes CloudFormation templates for deployment. This directly fits the requirement.",
    optionExplanations: [
      "✓ Correct: AWS CDK is designed for defining cloud infrastructure in familiar programming languages.",
      "User data alone is not a full infrastructure as code framework.",
      "Manual environment creation from documentation is not reproducible infrastructure as code.",
      "Route 53 records are only one resource type and cannot define full environments."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cdk/v2/guide/home.html", title: "AWS CDK Developer Guide" }
    ]
  },
  {
    id: 78,
    question: "A company wants to monitor AWS account activity for signs that long-term access keys might have been exposed publicly. The company wants an AWS-managed threat detection service.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Enable Amazon GuardDuty and review findings related to exposed credentials or suspicious activity.",
      "Use Amazon CloudFront to inspect all IAM access keys for public exposure.",
      "Store access keys in Amazon S3 and compare them against public code repositories manually.",
      "Use AWS CodeArtifact to scan IAM credentials for exposure."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Amazon GuardDuty can detect findings related to exposed AWS credentials and suspicious account activity. This is the native AWS-managed threat detection service for the requirement.",
    optionExplanations: [
      "✓ Correct: GuardDuty is the AWS-managed threat detection service that identifies suspicious activity, including findings related to compromised credentials.",
      "CloudFront is not a credential exposure detection service.",
      "Manual comparison against public repositories is operationally intensive and incomplete.",
      "CodeArtifact manages packages, not credential exposure detection."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html", title: "Amazon GuardDuty finding types" }
    ]
  },
  {
    id: 79,
    question: "A company wants to create a single, centralized catalog of approved machine images, software stacks, and deployment templates for internal teams to launch in a controlled way. The company wants to apply versioning and access control to these approved offerings.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Use AWS Service Catalog portfolios and products to publish and manage the approved offerings.",
      "Store all templates in a shared network drive and ask teams to copy them when needed.",
      "Create one Amazon S3 bucket per team and let each team decide which templates are approved.",
      "Use Amazon Inspector to publish internal deployment templates."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "AWS Service Catalog is the managed AWS service for publishing approved IT services and infrastructure products with access control and version management. This directly matches the requirement for a centralized internal catalog.",
    optionExplanations: [
      "✓ Correct: Service Catalog provides centralized product publishing, access control, and versioned approved offerings.",
      "A shared drive does not provide governance or controlled provisioning.",
      "Decentralizing approvals per team conflicts with the goal of a centralized approved catalog.",
      "Amazon Inspector is unrelated to cataloging deployment templates."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html", title: "What is AWS Service Catalog?" }
    ]
  },
  {
    id: 80,
    question: "A company wants to query years of archived AWS CloudTrail logs stored in Amazon S3 without building a custom log ingestion platform. The company wants an interactive SQL-based analysis option.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use Amazon Athena to query the CloudTrail logs in Amazon S3.",
      "Use Amazon Route 53 query logging because it provides SQL analysis of CloudTrail logs.",
      "Use Amazon EC2 instance store to copy the CloudTrail logs locally before searching them with grep.",
      "Use Amazon SNS to subscribe directly to the CloudTrail log files and run SQL queries on the topic."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "Amazon Athena is designed for interactive SQL querying of data stored in Amazon S3, including CloudTrail logs. This provides the requested SQL-based analysis without a custom ingestion platform.",
    optionExplanations: [
      "✓ Correct: Athena is the native SQL query service for S3-based log analysis, including CloudTrail data.",
      "Route 53 query logging is unrelated to CloudTrail log analytics.",
      "Local copying to EC2 adds unnecessary infrastructure and is not an interactive SQL solution.",
      "SNS is not a SQL query engine for log files."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html", title: "Query AWS CloudTrail logs" },
      { url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html", title: "What is Amazon Athena?" }
    ]
  },
  {
    id: 81,
    question: "A company runs a large fleet of Amazon EC2 instances and wants to collect inventory information such as installed applications, operating system details, and network configuration on an ongoing basis. The company wants a managed solution with centralized visibility.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS Systems Manager Inventory to collect and view the instance metadata.",
      "Ask administrators to log in to each instance monthly and record the inventory in a spreadsheet.",
      "Use Amazon CloudFront standard logs to infer the installed packages on the instances.",
      "Store the inventory information manually in Amazon S3 text files after each patch cycle."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "AWS Systems Manager Inventory is the native managed capability for collecting metadata about managed instances such as software, OS details, and configuration. It provides centralized visibility without manual collection.",
    optionExplanations: [
      "✓ Correct: Systems Manager Inventory is designed specifically for centralized collection of instance inventory data.",
      "Manual spreadsheet collection is inefficient and error-prone.",
      "CloudFront logs do not provide instance software inventory details.",
      "Manual text files in S3 do not offer a managed inventory solution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html", title: "AWS Systems Manager Inventory" }
    ]
  },
  {
    id: 82,
    question: "A company wants to trigger automated remediation whenever an AWS Config rule marks a resource as noncompliant. The remediation should be standardized and reusable across multiple accounts.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Configure AWS Config automatic remediation by using an AWS Systems Manager Automation runbook.",
      "Ask the security team to review the AWS Config console daily and remediate resources manually.",
      "Create a weekly report of noncompliant resources and email it to resource owners.",
      "Use Amazon Athena to query the noncompliant resources from CloudTrail logs and fix them manually."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Config integrates with Systems Manager Automation for automatic remediation of noncompliant resources. This provides a standardized and reusable workflow across accounts without manual intervention.",
    optionExplanations: [
      "✓ Correct: AWS Config automatic remediation with Systems Manager Automation is the native pattern for standardized compliance remediation.",
      "Manual daily review is slower and less reliable than automated remediation.",
      "A weekly report delays remediation and does not standardize enforcement.",
      "CloudTrail analysis is not the direct native remediation workflow for AWS Config findings."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/remediation.html", title: "Remediation to correct noncompliant AWS resources" },
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-documents.html", title: "AWS Systems Manager Automation runbooks" }
    ]
  },
  {
    id: 83,
    question: "A company uses Amazon ECS on AWS Fargate and wants task scaling to respond automatically to the number of messages waiting in an Amazon SQS queue. The company wants a managed autoscaling solution.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Configure Application Auto Scaling for the ECS service based on a CloudWatch metric that represents the queue depth.",
      "Ask operators to watch the SQS console and change the desired task count manually when the queue grows.",
      "Create a cron job that increases the task count every morning regardless of queue size.",
      "Use Route 53 weighted routing to send fewer requests to the service when the queue is large."
    ],
    correctAnswer: 0,
    category: "Resilient Cloud Solutions",
    explanation: "Amazon ECS services can use Application Auto Scaling with CloudWatch metrics to scale task count dynamically. Queue depth is a common scaling signal for asynchronous worker services.",
    optionExplanations: [
      "✓ Correct: Application Auto Scaling can adjust the ECS desired task count using queue depth metrics.",
      "Manual scaling does not meet the automation requirement.",
      "A cron schedule does not react to real workload conditions.",
      "Route 53 weighted routing is unrelated to ECS worker scaling based on queue backlog."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html", title: "Automatically scale your Amazon ECS service" },
      { url: "https://docs.aws.amazon.com/autoscaling/application/userguide/what-is-application-auto-scaling.html", title: "What is Application Auto Scaling?" }
    ]
  },
  {
    id: 84,
    question: "A company needs to enforce HTTPS for all content served from an Amazon CloudFront distribution in front of an application. The company wants requests that arrive over HTTP to be redirected automatically.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Configure the CloudFront viewer protocol policy to redirect HTTP to HTTPS.",
      "Store a banner on the website asking users to switch to HTTPS manually.",
      "Use Amazon GuardDuty to convert HTTP requests to HTTPS before they reach CloudFront.",
      "Create an Amazon S3 lifecycle rule to move HTTP requests to HTTPS storage."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "CloudFront viewer protocol policies provide native request handling behavior such as redirecting HTTP viewers to HTTPS. This is the direct AWS control for enforcing HTTPS access through the distribution.",
    optionExplanations: [
      "✓ Correct: The viewer protocol policy can automatically redirect incoming HTTP requests to HTTPS.",
      "A banner does not enforce transport security.",
      "GuardDuty is not a traffic rewriting service.",
      "S3 lifecycle rules have nothing to do with HTTP-to-HTTPS redirects."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html", title: "Require HTTPS for communication between viewers and CloudFront" }
    ]
  },
  {
    id: 85,
    question: "A company uses AWS Lambda to process items from an Amazon SQS queue. The company notices that one very large batch can cause long processing times and makes it harder to isolate failed messages.\n\nWhich change should a DevOps engineer make to improve failure isolation and reduce the amount of reprocessing when a batch contains a bad message?",
    options: [
      "Reduce the Lambda batch size for the SQS event source mapping.",
      "Increase the Lambda timeout to the maximum value.",
      "Increase the SQS message retention period to 14 days.",
      "Use Amazon Route 53 health checks for the Lambda function."
    ],
    correctAnswer: 0,
    category: "Incident and Event Response",
    explanation: "Smaller batch sizes reduce the number of messages retried together when a failure occurs, which improves failure isolation and lowers the amount of duplicate reprocessing. This is a native tuning control for Lambda-SQS integrations.",
    optionExplanations: [
      "✓ Correct: Lowering the batch size limits how many messages are affected by a single batch failure.",
      "A longer timeout does not isolate bad messages within a batch.",
      "Message retention controls how long messages remain in the queue, not batch failure granularity.",
      "Route 53 health checks are unrelated to Lambda batch processing behavior."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html", title: "Using Lambda with Amazon SQS" }
    ]
  },
  {
    id: 86,
    question: "A company wants to scan code in pull requests for quality issues and recommendations before merging into the main branch. The company prefers an AWS-native service integrated with development workflows.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use Amazon CodeGuru Reviewer to analyze pull requests and provide recommendations.",
      "Use Amazon Athena to query the source repository for common code patterns.",
      "Use CloudWatch Logs Insights to inspect the source files before merge.",
      "Use Amazon GuardDuty to review the pull requests for code quality issues."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "Amazon CodeGuru Reviewer is designed to analyze source code and pull requests for quality issues, security concerns, and best-practice recommendations. It is the AWS-native service for this use case.",
    optionExplanations: [
      "✓ Correct: CodeGuru Reviewer is purpose-built for automated code review and recommendations in development workflows.",
      "Athena is not a code review service.",
      "CloudWatch Logs Insights analyzes logs, not source code pull requests.",
      "GuardDuty is a threat detection service, not a code quality analysis tool."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/welcome.html", title: "What is Amazon CodeGuru Reviewer?" }
    ]
  },
  {
    id: 87,
    question: "A company wants to receive alerts when a service quota is approaching a level that could affect deployments, such as the number of running On-Demand EC2 instances. The company wants a native AWS monitoring approach.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Use Amazon CloudWatch alarms on usage metrics published for supported service quotas and monitor the relevant quota levels.",
      "Wait until deployment failures occur and then request quota increases manually.",
      "Create a monthly spreadsheet listing the current quota values from the console.",
      "Use Amazon Route 53 health checks to detect whether service quotas are close to their limits."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "Service Quotas integrates with CloudWatch for supported quotas, allowing teams to monitor usage against limits and trigger alarms before deployments fail. This is the native monitoring approach for quota exhaustion risk.",
    optionExplanations: [
      "✓ Correct: CloudWatch alarms on supported service quota usage metrics provide proactive alerting before limits are reached.",
      "Waiting for failures is reactive and risky.",
      "A monthly spreadsheet is not timely enough for operational response.",
      "Route 53 health checks do not measure AWS service quota utilization."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/servicequotas/latest/userguide/monitoring-cloudwatch.html", title: "Monitor service quotas with Amazon CloudWatch alarms" }
    ]
  },
  {
    id: 88,
    question: "A company wants to maintain a central, immutable history of management API activity in an AWS account, including who changed security groups and when. The company also wants to detect if logging is accidentally disabled.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Enable AWS CloudTrail and use an AWS Config rule or equivalent control to monitor whether CloudTrail remains enabled.",
      "Store screenshots of the VPC console every day and compare them manually.",
      "Use Amazon Inspector to create a permanent history of management API activity.",
      "Send security group changes to an Amazon SNS topic only and rely on email retention for the audit trail."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS CloudTrail provides the authoritative API activity history, while AWS Config can evaluate whether logging controls such as CloudTrail remain enabled. Together they satisfy both audit and control-monitoring requirements.",
    optionExplanations: [
      "✓ Correct: CloudTrail records the API history, and AWS Config can monitor the logging configuration state.",
      "Screenshots are not an authoritative or scalable audit trail.",
      "Inspector is not a management API history service.",
      "Email notifications are not a robust immutable audit store."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html", title: "What is AWS CloudTrail?" },
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html", title: "Evaluating resources with AWS Config rules" }
    ]
  },
  {
    id: 89,
    question: "A company wants to distribute software packages to thousands of Amazon EC2 instances across multiple environments. The company needs a secure, centrally managed package repository that integrates with common package managers.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS CodeArtifact as the central package repository.",
      "Store all packages on a shared EC2 file server and mount it from every instance.",
      "Email package files to each environment administrator before every release.",
      "Use Amazon Route 53 to direct package manager requests to the nearest administrator laptop."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "AWS CodeArtifact is the managed artifact repository service for software packages and integrates with common package managers. It provides centralized, secure distribution without managing custom repository infrastructure.",
    optionExplanations: [
      "✓ Correct: CodeArtifact is the AWS-native managed package repository for distributing software artifacts securely.",
      "A shared EC2 file server increases infrastructure management overhead and scales poorly.",
      "Email-based package distribution is operationally inefficient and insecure.",
      "Route 53 is not a package repository or artifact distribution service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html", title: "What is AWS CodeArtifact?" }
    ]
  },
  {
    id: 90,
    question: "A company wants to test changes to an AWS Lambda-based production API by gradually shifting traffic from the current version to a new version while preserving the same function name and endpoint. The company wants rollback capability if errors increase.\n\nWhich solution should a DevOps engineer choose?",
    options: [
      "Use Lambda versions and an alias with traffic shifting, orchestrated by AWS CodeDeploy.",
      "Rename the production function and ask clients to switch endpoints manually.",
      "Deploy the new version as a completely separate API and decommission the old one immediately.",
      "Use Amazon S3 versioning because it automatically shifts API traffic between Lambda versions."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "Lambda versions and aliases support traffic shifting between function versions, and AWS CodeDeploy can automate canary or linear deployments with rollback based on alarms. This preserves the function name and endpoint while minimizing deployment risk.",
    optionExplanations: [
      "✓ Correct: Lambda aliases and CodeDeploy provide managed traffic shifting and rollback while preserving the logical endpoint.",
      "Manual client endpoint switching is operationally risky and defeats the purpose of managed deployment control.",
      "Immediate cutover removes the gradual rollout and rollback capability.",
      "Amazon S3 versioning is unrelated to Lambda traffic shifting."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html", title: "Lambda aliases" },
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-lambda.html", title: "Deploy AWS Lambda functions with CodeDeploy" }
    ]
  },
  {
    id: 91,
    question: "A company wants to deploy Amazon EC2 instances with a consistent baseline of operating system patches and approved software, and then ensure newly launched instances use the latest approved image automatically.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use EC2 Image Builder to create and maintain the AMI, and update the launch template used by the Auto Scaling group.",
      "Create one EC2 instance manually, patch it every month, and clone it by hand whenever more instances are needed.",
      "Store patch instructions in a wiki and ask the operations team to rebuild instances manually after every update.",
      "Use Amazon GuardDuty to create updated AMIs from running instances automatically."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "EC2 Image Builder is the managed AWS service for creating and maintaining standardized machine images. Updating the Auto Scaling group's launch template to use the latest approved AMI ensures newly launched instances inherit the patched baseline automatically.",
    optionExplanations: [
      "✓ Correct: Image Builder plus launch template updates is the native repeatable pattern for maintaining standardized AMIs at scale.",
      "Manual cloning is error-prone and does not scale well.",
      "A wiki-based rebuild process is slow and not automated.",
      "GuardDuty is not an image creation service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html", title: "What is EC2 Image Builder?" },
      { url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-templates.html", title: "Use a launch template" }
    ]
  },
  {
    id: 92,
    question: "A company wants to monitor the health of an application endpoint from multiple geographic locations and receive an alert if the endpoint becomes unreachable.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Create Amazon Route 53 health checks for the endpoint and configure CloudWatch alarms on the health check metrics.",
      "Use Amazon EBS volume metrics to determine whether the endpoint is reachable from the internet.",
      "Create a CloudTrail trail and wait for it to log endpoint health changes automatically.",
      "Use AWS Config to poll the endpoint every minute and send alerts if it fails."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "Route 53 health checks are designed to monitor endpoint availability from AWS health checkers in multiple locations. CloudWatch alarms on those health checks provide automated alerting when an endpoint becomes unhealthy.",
    optionExplanations: [
      "✓ Correct: Route 53 health checks and CloudWatch alarms are the native solution for multi-location endpoint monitoring.",
      "EBS metrics are unrelated to internet endpoint availability.",
      "CloudTrail does not monitor URL health.",
      "AWS Config evaluates AWS resource configuration, not general public endpoint availability."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/monitoring-health-checks.html", title: "Monitoring health checks using CloudWatch" },
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html", title: "Configuring DNS failover" }
    ]
  },
  {
    id: 93,
    question: "A company wants to analyze application latency and error patterns across microservices running on Amazon EKS. The company already emits Prometheus-compatible metrics and wants managed visualization.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use Amazon Managed Service for Prometheus for metrics ingestion and Amazon Managed Grafana for dashboards.",
      "Store all metrics in Amazon S3 and visualize them by opening the raw files in a browser.",
      "Write all metrics to Amazon DynamoDB and build a custom charting application from scratch.",
      "Use Amazon Route 53 query logging as the primary latency visualization solution."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "Amazon Managed Service for Prometheus and Amazon Managed Grafana are the managed AWS services built for Prometheus-compatible observability and visualization. They reduce operational overhead while supporting common EKS monitoring patterns.",
    optionExplanations: [
      "✓ Correct: Managed Prometheus and Managed Grafana provide the AWS-native observability stack for Prometheus-compatible metrics.",
      "Raw metric files in S3 do not provide managed monitoring or interactive dashboards.",
      "A custom DynamoDB-based charting platform adds unnecessary complexity.",
      "Route 53 query logging is not a microservice latency visualization system."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/prometheus/latest/userguide/what-is-Amazon-Managed-Service-Prometheus.html", title: "What is Amazon Managed Service for Prometheus?" },
      { url: "https://docs.aws.amazon.com/grafana/latest/userguide/what-is-Amazon-Managed-Service-Grafana.html", title: "What is Amazon Managed Grafana?" }
    ]
  },
  {
    id: 94,
    question: "A company wants to automatically quarantine Amazon EC2 instances that are found to be noncompliant with a critical security configuration. The quarantine action should remove the instance's ability to communicate broadly on the network.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Use AWS Config with automatic remediation to attach or replace the instance's security group with a restrictive quarantine security group.",
      "Ask the security team to email the operations team whenever a noncompliant instance is found.",
      "Take a screenshot of the instance and archive it for investigation.",
      "Store the noncompliant instance IDs in Amazon S3 and review them at the end of the month."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Config automatic remediation with Systems Manager Automation can apply standardized security responses such as moving an instance into a quarantine security group. This is a managed and repeatable containment approach.",
    optionExplanations: [
      "✓ Correct: AWS Config remediation can automatically apply quarantine controls through a restrictive security group.",
      "Email-based response is manual and slower than automated containment.",
      "Screenshots do not quarantine the instance.",
      "Monthly review is far too slow for critical security findings."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/remediation.html", title: "Remediation to correct noncompliant AWS resources" },
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-documents.html", title: "AWS Systems Manager Automation runbooks" }
    ]
  },
  {
    id: 95,
    question: "A company wants to capture and retain Amazon RDS database logs for troubleshooting and auditing. The company also wants to search the logs interactively when incidents occur.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Publish the RDS logs to Amazon CloudWatch Logs and use CloudWatch Logs Insights for searching.",
      "Download the logs manually from the RDS console only after an incident occurs.",
      "Write the logs to local files on an EC2 instance and search them there.",
      "Use Amazon Route 53 query logging because it includes database logs."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "Amazon RDS can export supported database logs to CloudWatch Logs, where they can be retained centrally and queried interactively by using CloudWatch Logs Insights. This is the native AWS approach for searchable RDS log analysis.",
    optionExplanations: [
      "✓ Correct: CloudWatch Logs and Logs Insights provide centralized retention and interactive query capabilities for supported RDS logs.",
      "Manual download after an incident delays analysis and reduces operational readiness.",
      "Copying logs to an EC2 instance introduces unnecessary infrastructure.",
      "Route 53 query logging is unrelated to RDS database logs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.html", title: "Monitoring Amazon RDS log files" },
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html", title: "Analyzing log data with CloudWatch Logs Insights" }
    ]
  },
  {
    id: 96,
    question: "A company wants to automatically deploy a baseline set of IAM roles, Config rules, and logging resources whenever a new AWS account is created in the organization. The company wants minimal custom code.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS Control Tower account provisioning and guardrails, supplemented by CloudFormation StackSets for baseline resources.",
      "Wait for new accounts to be created and then configure them manually in the console.",
      "Store setup instructions in a document and ask each account owner to implement them independently.",
      "Create one shared IAM user in the management account and use it to manage all member accounts manually."
    ],
    correctAnswer: 0,
    category: "Configuration Management and IaC",
    explanation: "AWS Control Tower provides a managed multi-account landing zone with account provisioning and guardrails. CloudFormation StackSets complements it by deploying repeatable baseline resources to new accounts with minimal custom implementation.",
    optionExplanations: [
      "✓ Correct: Control Tower and StackSets together provide automated multi-account setup with low operational overhead.",
      "Manual configuration does not scale as the organization grows.",
      "Independent manual implementation leads to inconsistency and weak governance.",
      "A shared IAM user is insecure and operationally poor practice."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html", title: "What is AWS Control Tower?" },
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html", title: "Working with AWS CloudFormation StackSets" }
    ]
  },
  {
    id: 97,
    question: "A company wants to centralize application logs from multiple Amazon EC2 instances and automatically alert if the phrase 'OutOfMemoryError' appears in the logs.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Send the logs to Amazon CloudWatch Logs and create a metric filter and CloudWatch alarm for the pattern.",
      "Store the logs on each instance and ask operators to search them manually once a week.",
      "Send all logs to Amazon Route 53 and use DNS health checks on the error string.",
      "Export the logs to Amazon S3 and inspect them with a spreadsheet application."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "CloudWatch Logs metric filters can turn matching log events into CloudWatch metrics, which can then trigger alarms. This is the native AWS pattern for alerting on specific log content.",
    optionExplanations: [
      "✓ Correct: Metric filters and CloudWatch alarms provide automated detection and alerting for target log patterns.",
      "Weekly manual searches delay detection significantly.",
      "Route 53 is unrelated to application log pattern detection.",
      "Spreadsheet inspection is manual and not suitable for operational alerting."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html", title: "Creating metrics from log events using filters" },
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html", title: "Using Amazon CloudWatch alarms" }
    ]
  },
  {
    id: 98,
    question: "A company wants to ensure that only encrypted Amazon S3 buckets are considered compliant. The company needs a continuous compliance check across all accounts.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS Config managed rules to evaluate S3 bucket encryption compliance and aggregate the results centrally.",
      "Ask application owners to certify once a year that their buckets are encrypted.",
      "Use Amazon CloudFront to verify whether S3 buckets are encrypted at rest.",
      "Download the list of buckets from each account and inspect encryption settings manually in a spreadsheet."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Config managed rules can continuously evaluate whether S3 buckets meet encryption requirements. Aggregating results across accounts provides centralized compliance visibility at scale.",
    optionExplanations: [
      "✓ Correct: AWS Config managed rules provide continuous bucket encryption compliance monitoring across accounts.",
      "Annual certification is not continuous compliance monitoring.",
      "CloudFront does not evaluate S3 at-rest encryption settings.",
      "Manual spreadsheet audits are slow and error-prone."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html", title: "List of AWS Config Managed Rules" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html", title: "Setting default server-side encryption behavior for Amazon S3 buckets" }
    ]
  },
  {
    id: 99,
    question: "A company wants to automate the deployment of serverless applications that use AWS SAM templates as part of a CI/CD pipeline. The company wants a repeatable packaging and deployment process.\n\nWhich solution should a DevOps engineer recommend?",
    options: [
      "Use AWS SAM CLI commands in the pipeline to build, package, and deploy the application.",
      "Convert the AWS SAM template to a PDF and email it to the operations team for deployment.",
      "Deploy the serverless resources manually in the console after each source code change.",
      "Use Amazon Athena to compile the AWS SAM template and publish the application."
    ],
    correctAnswer: 0,
    category: "SDLC Automation",
    explanation: "The AWS SAM CLI supports building, packaging, and deploying serverless applications defined in SAM templates. Running these steps in a pipeline creates a repeatable and automation-friendly deployment workflow.",
    optionExplanations: [
      "✓ Correct: SAM CLI commands are the native tooling for repeatable serverless application build and deployment workflows.",
      "PDF-based handoff is manual and not CI/CD automation.",
      "Manual console deployment is not repeatable or scalable.",
      "Athena is not a build or deployment service for SAM applications."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli.html", title: "What is the AWS SAM CLI?" },
      { url: "https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/deploying-serverless-applications.html", title: "Deploying serverless applications" }
    ]
  },
  {
    id: 100,
    question: "A company wants to maintain a centralized operational dashboard that shows key CloudWatch metrics, alarms, and log query widgets for multiple production services in one place.\n\nWhich solution should a DevOps engineer implement?",
    options: [
      "Create an Amazon CloudWatch dashboard that combines the required widgets from the different services.",
      "Ask each service team to send screenshots of their metrics once a day and assemble them into a slide deck.",
      "Store all metrics in Amazon S3 and review them by opening the files manually.",
      "Use Amazon Route 53 hosted zones as the central dashboard for service metrics."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "Amazon CloudWatch dashboards are designed to consolidate metrics, alarms, and log visualizations into centralized operational views. This is the native AWS dashboarding capability for cross-service observability.",
    optionExplanations: [
      "✓ Correct: CloudWatch dashboards provide a centralized, near-real-time operational view across multiple AWS services.",
      "Slide decks are static and manual, not operational dashboards.",
      "Raw metric files in S3 are not an interactive dashboard solution.",
      "Route 53 hosted zones do not provide observability dashboards."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html", title: "Use CloudWatch dashboards" }
    ]
  },
  {
    id: 101,
    question: "A company uses AWS CodePipeline with AWS CodeDeploy to deploy a web application to Amazon EC2 instances in an Auto Scaling group. During a recent deployment, a bug was introduced and the company wants to automatically roll back to the previous version if the Amazon CloudWatch alarm for the error rate exceeds a threshold within 10 minutes of deployment.\n\nHow should the DevOps engineer configure this?",
    options: [
      "Add a manual approval action after the deploy stage in CodePipeline. Assign the on-call engineer to monitor the error rate and manually approve or reject.",
      "Configure the CodeDeploy deployment group to use an automatic rollback triggered by the CloudWatch alarm. Set the alarm period to 10 minutes.",
      "Create an AWS Lambda function that monitors the CloudWatch alarm and calls CodePipeline's RetryStageExecution API to roll back.",
      "Use AWS CodeBuild to run a post-deployment smoke test and, if it fails, delete the deployment stack."
    ],
    correctAnswer: 1,
    category: "SDLC Automation",
    explanation: "AWS CodeDeploy natively supports automatic rollback based on CloudWatch alarms configured on the deployment group. When the specified alarm transitions to ALARM state, CodeDeploy automatically rolls back to the last successful revision without manual intervention.",
    optionExplanations: [
      "Manual approval relies on human response time and cannot guarantee rollback within 10 minutes. It introduces operational toil and is error-prone under pressure.",
      "✓ Correct: CodeDeploy deployment groups support automatic rollback triggers based on CloudWatch alarms. When the error rate alarm fires within the observation period, CodeDeploy immediately redeploys the last successful application revision.",
      "A custom Lambda rollback function adds unnecessary complexity when CodeDeploy's built-in alarm-based rollback already solves this problem natively.",
      "CodeBuild smoke tests can detect failures but redeploying via stack deletion is not a standard or efficient rollback mechanism for CodeDeploy deployments."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html", title: "Redeploy and roll back a deployment with CodeDeploy" },
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html", title: "Configure advanced options for a deployment group" }
    ]
  },
  {
    id: 102,
    question: "A DevOps team manages multiple AWS CloudFormation stacks across dozens of AWS accounts. The team recently discovered that engineers are manually modifying resources created by CloudFormation, causing configuration drift. The team wants to detect drift across all stacks in near-real time and receive notifications when drift is detected.\n\nWhich solution meets these requirements with the LEAST operational overhead?",
    options: [
      "Schedule an AWS Lambda function to call cloudformation:DetectStackDrift for all stacks every hour. Publish results to an Amazon SNS topic.",
      "Enable AWS Config with the cloudformation-stack-drift-detection-check managed rule. Configure an Amazon EventBridge rule to route non-compliant findings to an SNS topic.",
      "Enable AWS CloudTrail to log all CloudFormation API calls. Create a CloudWatch Logs metric filter for UpdateStack events and trigger an SNS notification.",
      "Use AWS Trusted Advisor to monitor CloudFormation stack configurations and send weekly summary reports by email."
    ],
    correctAnswer: 1,
    category: "Configuration Management and IaC",
    explanation: "AWS Config's cloudformation-stack-drift-detection-check managed rule continuously evaluates stacks for drift and flags non-compliant resources. EventBridge can route Config compliance change events to SNS for immediate notifications. This is fully managed with no custom code required.",
    optionExplanations: [
      "A scheduled Lambda function can detect drift but requires custom code, IAM permissions, and error handling. AWS Config provides the same capability as a managed rule with less operational overhead.",
      "✓ Correct: The AWS Config managed rule for CloudFormation drift detection evaluates stacks continuously. An EventBridge rule listening for Config NON_COMPLIANT events triggers SNS notifications automatically, requiring no custom code.",
      "CloudTrail logging captures API calls but UpdateStack events represent intentional stack updates, not out-of-band drift. This approach generates false positives and does not detect direct resource modifications.",
      "AWS Trusted Advisor does not provide CloudFormation drift detection. Its weekly reports are not near-real-time and do not integrate with CloudFormation drift detection APIs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/cloudformation-stack-drift-detection-check.html", title: "cloudformation-stack-drift-detection-check" },
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/detect-drift-stack.html", title: "Detecting unmanaged configuration changes to stacks and resources" }
    ]
  },
  {
    id: 103,
    question: "A company runs a microservices application on Amazon ECS. The DevOps team wants to implement distributed tracing to identify latency bottlenecks across service-to-service calls. The solution must require minimal code changes to existing services and must visualize end-to-end request flows.\n\nWhich solution should the DevOps engineer implement?",
    options: [
      "Enable VPC Flow Logs and query them with Amazon Athena to reconstruct service call chains.",
      "Instrument each service with the AWS X-Ray SDK and enable X-Ray tracing on the ECS task definition. Use the X-Ray console to visualize service maps.",
      "Add custom logging to each service to write trace IDs to CloudWatch Logs. Use CloudWatch Logs Insights to reconstruct traces.",
      "Deploy a third-party APM tool on separate EC2 instances and configure each ECS task to forward metrics to it."
    ],
    correctAnswer: 1,
    category: "Monitoring and Logging",
    explanation: "AWS X-Ray provides native distributed tracing for ECS applications. Enabling X-Ray on the ECS task definition and using the X-Ray SDK (or AWS Distro for OpenTelemetry) adds tracing with minimal code changes. The X-Ray console generates service maps that visualize end-to-end request flows and latency across services.",
    optionExplanations: [
      "VPC Flow Logs capture network-level traffic metadata but cannot reconstruct application-level call chains or measure service-to-service latency at the request level.",
      "✓ Correct: AWS X-Ray is the native AWS distributed tracing service. The X-Ray SDK requires minimal code changes (typically adding an SDK dependency and a middleware), and the service map in the X-Ray console provides end-to-end request flow visualization.",
      "Custom trace logging to CloudWatch Logs requires significant custom code to propagate trace IDs across service boundaries and reconstruct call chains. It cannot automatically generate service maps.",
      "Running a third-party APM on separate EC2 instances introduces additional operational overhead (patching, scaling, availability) and requires each ECS task to be configured to forward data externally."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/xray/latest/devguide/xray-services-ecs.html", title: "Running the X-Ray daemon on Amazon ECS" },
      { url: "https://docs.aws.amazon.com/xray/latest/devguide/xray-console-servicemap.html", title: "Viewing the service map" }
    ]
  },
  {
    id: 104,
    question: "A company's application experiences traffic spikes that cause the Amazon RDS database to become a bottleneck. The DevOps team wants to automatically scale the read capacity during high-traffic periods. The team also wants the scaling policy to be defined as code and version-controlled.\n\nWhich approach should the DevOps engineer take?",
    options: [
      "Enable Aurora Auto Scaling for read replicas and define the scaling policy in an AWS CloudFormation template. Store the template in AWS CodeCommit.",
      "Write a script that polls Amazon CloudWatch metrics every minute and manually adds read replicas when CPU utilization exceeds 70%.",
      "Enable Amazon RDS Multi-AZ and configure a standby replica to handle read traffic during peak periods.",
      "Use Amazon ElastiCache in front of the RDS database and configure ElastiCache to scale automatically."
    ],
    correctAnswer: 0,
    category: "Resilient Cloud Solutions",
    explanation: "Aurora Auto Scaling automatically adds or removes Aurora Replicas in response to CloudWatch metrics. Defining the scaling policy in CloudFormation enables infrastructure-as-code practices and version control via CodeCommit. This provides both automated scaling and code-based policy management.",
    optionExplanations: [
      "✓ Correct: Aurora Auto Scaling with a CloudFormation-defined scaling policy automates read replica scaling based on metrics. Storing the CloudFormation template in CodeCommit satisfies the version-control requirement.",
      "A custom polling script requires operational maintenance, introduces latency in scale-out decisions, and is not a version-controlled infrastructure definition.",
      "RDS Multi-AZ provides high availability through automatic failover but does not scale read capacity. The standby instance does not serve read traffic under normal operations.",
      "ElastiCache reduces database load for cached reads but does not scale the RDS read capacity itself. It also requires application-level changes to implement caching logic."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html", title: "Using Amazon Aurora Auto Scaling with Aurora replicas" },
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-applicationautoscaling-scalingpolicy.html", title: "AWS::ApplicationAutoScaling::ScalingPolicy" }
    ]
  },
  {
    id: 105,
    question: "A DevOps engineer needs to enforce that all AWS Lambda functions deployed through AWS CodePipeline have AWS X-Ray tracing enabled and use a specific runtime version. Non-compliant deployments must be blocked before reaching the production account.\n\nWhich approach should the DevOps engineer take?",
    options: [
      "Add a CodeBuild stage that scans the CloudFormation template using cfn-lint and fails the build if required properties are missing.",
      "Enable AWS Config rules in the production account to detect non-compliant Lambda functions after deployment.",
      "Add a pre-deployment approval gate in CodePipeline and require manual review of the Lambda configuration before each deployment.",
      "Use AWS CloudFormation Guard (cfn-guard) rules to validate the template in a CodeBuild action before deployment. Fail the pipeline if validation fails."
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "AWS CloudFormation Guard (cfn-guard) allows writing policy-as-code rules that validate CloudFormation templates against organizational requirements. Running cfn-guard in a CodeBuild action before deployment blocks non-compliant templates from being deployed, enforcing controls at the pipeline level rather than after the fact.",
    optionExplanations: [
      "cfn-lint checks CloudFormation syntax and resource property validity but does not enforce custom organizational policies such as required X-Ray tracing or specific runtime versions without custom plugins.",
      "AWS Config rules detect non-compliant resources after deployment. This is a detective control, not a preventive one, and does not block the deployment from completing.",
      "Manual approval gates require human review and do not scale with automated pipelines. They cannot consistently enforce technical compliance requirements.",
      "✓ Correct: cfn-guard rules can express policies such as 'Lambda functions must have TracingConfig.Mode set to Active' and 'Runtime must equal python3.12'. Running cfn-guard in a CodeBuild stage before the deploy stage blocks non-compliant templates from being deployed."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cfn-guard/latest/ug/what-is-guard.html", title: "What is AWS CloudFormation Guard?" },
      { url: "https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-cloudformation-action.html", title: "Use CodePipeline with CloudFormation" }
    ]
  },
  {
    id: 106,
    question: "A company has an application deployed across three AWS Regions. Each Region has an Amazon Route 53 health check monitoring the regional endpoint. During a recent incident, a regional failure was detected but the Route 53 failover did not redirect traffic away from the failing Region for 4 minutes.\n\nWhat should the DevOps engineer do to reduce the failover time?",
    options: [
      "Decrease the Route 53 health check failure threshold from 3 to 1 and reduce the health check interval from 30 seconds to 10 seconds.",
      "Replace Route 53 with Amazon CloudFront with origin failover to reduce the failover time to under 1 minute.",
      "Configure AWS Global Accelerator instead of Route 53 for traffic routing and use its built-in health checking.",
      "Use an AWS Lambda function to monitor the regional endpoints every 30 seconds and update Route 53 records programmatically."
    ],
    correctAnswer: 0,
    category: "Incident and Event Response",
    explanation: "Route 53 health check failover time is determined by: (health check interval) × (failure threshold). The default is 30 seconds × 3 = 90 seconds to detect failure, plus propagation time. Reducing the interval to 10 seconds (fast health checks) and threshold to 1 reduces detection time to ~10 seconds, significantly cutting overall failover time.",
    optionExplanations: [
      "✓ Correct: Route 53 fast health checks run every 10 seconds. With a failure threshold of 1, a failing endpoint is detected in approximately 10 seconds. This is the most direct way to reduce Route 53 failover time with the least architectural change.",
      "CloudFront origin failover can reduce latency but typically has similar or slower failover times compared to optimized Route 53 health checks. It also introduces architectural changes beyond what is needed.",
      "AWS Global Accelerator uses a proprietary health checking system and can achieve sub-minute failover, but adopting Global Accelerator requires replacing Route 53 routing entirely, which is a larger architectural change.",
      "A Lambda-based poller with 30-second intervals would not improve the current 4-minute failover time and adds operational complexity compared to simply tuning the Route 53 health check settings."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types.html", title: "How Amazon Route 53 determines whether a health check is healthy" },
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html", title: "Failover types" }
    ]
  },
  {
    id: 107,
    question: "A DevOps engineer is setting up a multi-account AWS environment using AWS Organizations. The engineer needs to ensure that all new accounts automatically have AWS CloudTrail, AWS Config, and Amazon GuardDuty enabled in every Region without requiring any manual action from account administrators.\n\nWhich combination of approaches should the engineer use? (Choose TWO.)",
    options: [
      "Use AWS Control Tower to provision new accounts through Account Factory. Control Tower automatically enables CloudTrail, Config, and GuardDuty via its built-in managed controls.",
      "Create a Service Control Policy (SCP) that requires CloudTrail, Config, and GuardDuty to be enabled. Attach it to the organization root.",
      "Create an AWS CloudFormation StackSet with the necessary resources and configure it to deploy automatically to all new accounts using service-managed permissions.",
      "Send an email to each new account's administrator with instructions for enabling CloudTrail, Config, and GuardDuty manually.",
      "Configure an AWS Lambda function to run daily and enable CloudTrail, Config, and GuardDuty in any account where they are not found."
    ],
    correctAnswer: [0, 2],
    category: "Configuration Management and IaC",
    explanation: "AWS Control Tower's Account Factory automatically applies managed controls (including enabling CloudTrail, Config, and GuardDuty) to every new account. For organizations not using Control Tower, CloudFormation StackSets with service-managed permissions can deploy resources to all new accounts automatically via Organizations integration. Both approaches eliminate manual action.",
    optionExplanations: [
      "✓ Correct: AWS Control Tower Account Factory applies preventive and detective controls to newly provisioned accounts automatically. Built-in mandatory controls enable CloudTrail organization trail and Config recording across Regions.",
      "SCPs can prevent disabling these services but cannot enable them in accounts where they are not already running. SCPs are preventive, not provisioning mechanisms.",
      "✓ Correct: CloudFormation StackSets with Organizations integration (service-managed permissions) can be configured to automatically deploy to new accounts in targeted OUs. This provisions CloudTrail, Config, and GuardDuty resources when accounts are created.",
      "Manual email instructions require human action and do not meet the 'automatically without manual action' requirement.",
      "A daily Lambda poller can remediate gaps but introduces delay (up to 24 hours) before services are enabled. It also requires ongoing maintenance compared to native account vending solutions."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html", title: "AWS Control Tower Account Factory" },
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-manage-auto-deployment.html", title: "Enable automatic deployment for AWS Organizations" }
    ]
  },
  {
    id: 108,
    question: "A company's DevOps team uses Amazon CloudWatch Container Insights to monitor an Amazon EKS cluster. The team wants to create an alarm that triggers when the average memory utilization of any single pod exceeds 85% for 5 consecutive minutes and automatically sends a notification to a Slack channel.\n\nWhich solution meets these requirements?",
    options: [
      "Create a CloudWatch alarm on the pod_memory_utilization metric from Container Insights. Set the evaluation period to 5 minutes with a threshold of 85%. Configure the alarm to publish to an Amazon SNS topic. Subscribe an AWS Lambda function to the SNS topic to forward the notification to Slack.",
      "Write a custom script that queries the Kubernetes metrics API every minute and posts to Slack when memory exceeds 85%.",
      "Enable Amazon Managed Prometheus and configure Grafana alerting to notify Slack directly.",
      "Create an Amazon EventBridge Scheduler rule that runs every 5 minutes and invokes a Lambda function to check pod memory."
    ],
    correctAnswer: 0,
    category: "Monitoring and Logging",
    explanation: "CloudWatch Container Insights collects pod_memory_utilization metrics. A CloudWatch alarm evaluating this metric for 5 consecutive 1-minute periods triggers when the threshold is breached. The alarm publishes to SNS, and a subscribed Lambda function transforms and forwards the notification to Slack. This uses native AWS services with minimal operational overhead.",
    optionExplanations: [
      "✓ Correct: CloudWatch Container Insights pod_memory_utilization metrics can be used in CloudWatch alarms with a 5-minute evaluation window. SNS + Lambda is the standard AWS pattern for routing alarm notifications to external chat platforms like Slack.",
      "A custom script adds operational overhead (hosting, scheduling, error handling) and duplicates functionality already provided by CloudWatch Container Insights and CloudWatch alarms.",
      "Amazon Managed Prometheus with Grafana is a valid observability solution but requires additional infrastructure setup (Prometheus scraping, Grafana workspace) and more configuration than using Container Insights alarms directly.",
      "EventBridge Scheduler triggers on a fixed schedule, not based on metric threshold breaches. It would require the Lambda function to query metrics and implement threshold logic itself, duplicating CloudWatch alarm functionality."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-metrics-EKS.html", title: "Amazon EKS and Kubernetes Container Insights metrics" },
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html", title: "Create a CloudWatch alarm" }
    ]
  },
  {
    id: 109,
    question: "A DevOps engineer needs to implement a blue/green deployment strategy for an AWS Lambda function that is invoked via Amazon API Gateway. The deployment must shift 10% of traffic to the new version initially, gradually increase to 100% over 10 minutes, and automatically roll back if the error rate on the new version exceeds 5%.\n\nWhich solution meets all of these requirements?",
    options: [
      "Create two API Gateway stages pointing to the old and new Lambda versions. Manually adjust the stage weights over 10 minutes.",
      "Use AWS CodeDeploy with a Lambda deployment configuration (LambdaLinear10PercentEvery1Minute). Configure a CloudWatch alarm on the new version's error rate to trigger an automatic rollback.",
      "Use Lambda weighted aliases. Configure the alias to send 10% traffic to the new version. Update the weight manually every minute.",
      "Deploy the new Lambda version alongside the old one. Create an Application Load Balancer with weighted target groups pointing to each version."
    ],
    correctAnswer: 1,
    category: "SDLC Automation",
    explanation: "AWS CodeDeploy supports Lambda deployment with pre-built linear and canary traffic shifting configurations. LambdaLinear10PercentEvery1Minute shifts 10% of traffic per minute (reaching 100% in 10 minutes). CloudWatch alarm-based automatic rollback reverts to the previous version if error rate exceeds the threshold, meeting all stated requirements.",
    optionExplanations: [
      "Manually adjusting API Gateway stage weights requires human intervention every minute for 10 minutes. It cannot automate traffic shifting or rollback based on error rate metrics.",
      "✓ Correct: CodeDeploy's LambdaLinear10PercentEvery1Minute deployment configuration automates the traffic shift (10% per minute over 10 minutes). Configuring a CloudWatch alarm on the new Lambda version's error rate enables automatic rollback if the error rate threshold is breached.",
      "Lambda weighted aliases support traffic shifting but require manual updates to change weights incrementally. This approach cannot automate the gradual shift or trigger rollback based on error rate.",
      "Application Load Balancers do not invoke Lambda functions directly in a standard blue/green Lambda deployment pattern. This architectural change is overly complex compared to the native CodeDeploy Lambda integration."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configuration-lambda", title: "Deployment configurations for Lambda" },
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html", title: "Automatic rollback with CodeDeploy" }
    ]
  },
  {
    id: 110,
    question: "A company stores secrets such as database passwords and API keys in AWS Secrets Manager. The DevOps team needs to ensure that all secrets are rotated automatically every 30 days, and that any secret that has not been rotated within 35 days is flagged as non-compliant. The team also wants a weekly report of all non-compliant secrets sent to a security email distribution list.\n\nWhich combination of services should the DevOps engineer use? (Choose TWO.)",
    options: [
      "Configure automatic rotation in Secrets Manager with a rotation schedule of 30 days. Use an AWS Lambda rotation function for each secret.",
      "Create an AWS Config managed rule (secretsmanager-scheduled-rotation-success-check) to evaluate whether secrets have been rotated within the defined period.",
      "Use Amazon Inspector to scan for secrets that have not been rotated.",
      "Create an Amazon EventBridge rule that runs weekly and invokes a Lambda function to query AWS Config compliance results. The Lambda function sends a summary to Amazon SNS, which emails the security distribution list.",
      "Use Amazon Macie to detect unrotated secrets across all AWS accounts."
    ],
    correctAnswer: [0, 3],
    category: "Security and Compliance",
    explanation: "Configuring Secrets Manager rotation with a 30-day schedule automates secret rotation. An EventBridge weekly rule invoking a Lambda function that queries Config compliance results (or Secrets Manager metadata directly) and publishes to SNS provides the weekly non-compliance report. The secretsmanager-scheduled-rotation-success-check Config rule detects non-compliance but the notification mechanism requires EventBridge + Lambda + SNS.",
    optionExplanations: [
      "✓ Correct: Secrets Manager's built-in rotation scheduling with a Lambda rotation function automates rotation every 30 days. This directly meets the automatic rotation requirement.",
      "The secretsmanager-scheduled-rotation-success-check Config rule evaluates whether rotation has succeeded within the defined period, which is useful for compliance detection. However, it requires EventBridge + Lambda + SNS to generate and send a weekly report.",
      "Amazon Inspector is a vulnerability assessment service for EC2 instances and container images. It does not evaluate Secrets Manager rotation status.",
      "✓ Correct: A weekly EventBridge Scheduler rule triggering a Lambda function that queries Secrets Manager (or Config compliance results) for non-rotated secrets, then publishes findings to SNS for email delivery, completes the reporting requirement.",
      "Amazon Macie identifies sensitive data stored in S3. It does not evaluate Secrets Manager rotation compliance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html", title: "Rotate AWS Secrets Manager secrets" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html", title: "Creating an EventBridge scheduled rule" }
    ]
  }
];