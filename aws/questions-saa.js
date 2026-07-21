// AWS Solutions Architect Associate Practice Questions
const awsSAAQuestions = [
  {
    id: 1,
    question: "A company runs a web application in a VPC that spans multiple Availability Zones. The application runs on multiple Amazon EC2 instances behind an Application Load Balancer (ALB). The company wants to implement a solution that automatically scales out when traffic to the application increases and scales in when traffic decreases.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Create an AWS Lambda function and use CloudWatch Events to periodically start and terminate EC2 instances.",
      "Create an Amazon EC2 Auto Scaling group and configure a target tracking scaling policy.",
      "Create Amazon CloudWatch alarms and manually add or remove EC2 instances.",
      "Use AWS Elastic Beanstalk to deploy the application and configure manual scaling."
    ],
    correctAnswer: 1,
    category: "High Availability and Scalability",
    explanation: "Using an Amazon EC2 Auto Scaling group with a target tracking scaling policy allows the instance count to be automatically adjusted based on metrics such as CPU utilization or request count. This enables automatic scale-out and scale-in in response to traffic fluctuations, achieving both cost efficiency and high availability.",
    optionExplanations: [
      "Periodically starting and terminating instances with a Lambda function and CloudWatch Events is suitable for predictable, schedule-based scaling, but is not appropriate for dynamic scaling in response to sudden traffic spikes.",
      "✓ Correct: Using an Auto Scaling group with a target tracking scaling policy automatically adjusts instance count based on the specified metric (e.g., CPU utilization, ALB request count). It scales automatically with traffic changes, reducing operational overhead while optimizing cost efficiency.",
      "Manual scaling using CloudWatch alarms places a high operational burden and cannot respond quickly to sudden traffic spikes. An automated solution is required.",
      "Elastic Beanstalk is a convenient deployment service, but manual scaling cannot satisfy the requirement for automatic scale-out and scale-in."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html", title: "What is Amazon EC2 Auto Scaling" },
      { url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html", title: "Target tracking scaling policies" }
    ]
  },
  {
    id: 2,
    question: "A company needs to protect sensitive data stored in an Amazon S3 bucket. The data must be encrypted both at rest and in transit. The company also wants full control over encryption keys and the ability to automate key rotation.\n\nWhich solution meets these requirements?",
    options: [
      "Use Amazon S3 default encryption (SSE-S3) and transfer data over HTTPS.",
      "Use client-side encryption and transfer the encrypted data over HTTP.",
      "Use customer-provided encryption keys (SSE-C) and transfer data over HTTP.",
      "Use AWS KMS (SSE-KMS) with a customer managed key and transfer data over HTTPS."
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "Using AWS KMS (SSE-KMS) with a customer managed key provides full control over encryption keys and the ability to configure automatic key rotation. Using HTTPS ensures encryption in transit. KMS also provides audit logs of key usage.",
    optionExplanations: [
      "SSE-S3 has AWS manage the encryption keys, so it does not satisfy the requirement of 'full control over keys.' Key rotation is handled automatically by AWS but cannot be controlled by the customer.",
      "Client-side encryption can achieve encryption at rest, but HTTP is insufficient for encryption in transit. Key management automation also becomes more complex.",
      "SSE-C allows the customer to provide the encryption key, but there is no automatic key rotation feature. HTTP is also insufficient for encryption in transit.",
      "✓ Correct: Using a customer managed key in AWS KMS enables full control over encryption keys. You can enable automatic key rotation, configure key policies, and obtain audit logs of key usage. HTTPS ensures encryption in transit."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html", title: "Server-Side Encryption with AWS KMS (SSE-KMS)" },
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html", title: "Rotating AWS KMS keys" }
    ]
  },
  {
    id: 3,
    question: "A company uses an Amazon RDS for MySQL database. The database currently runs in a single Availability Zone. The company wants to improve database availability and minimize downtime during planned maintenance windows.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Create a read replica of the RDS database in a different Availability Zone.",
      "Enable automated backups on the RDS database and set the backup retention period to 7 days.",
      "Enable Multi-AZ deployment for the RDS database.",
      "Migrate to Amazon Aurora Serverless."
    ],
    correctAnswer: 2,
    category: "High Availability and Scalability",
    explanation: "Enabling Multi-AZ deployment for RDS automatically creates a synchronous replica of the primary database instance in a different Availability Zone. In the event of a failure or during maintenance, the system automatically fails over to the standby instance, minimizing downtime.",
    optionExplanations: [
      "A read replica improves read scalability but does not provide automatic failover. If the primary instance fails, the read replica must be manually promoted.",
      "Automated backups are important for data protection but are not a direct solution for reducing downtime during planned maintenance windows.",
      "✓ Correct: Multi-AZ deployment provides high availability and data durability. When the primary instance fails or undergoes maintenance, it automatically fails over to the standby instance. Failover typically completes within 1–2 minutes, minimizing downtime.",
      "Aurora Serverless provides automatic scaling capabilities, but migration takes time and cost. Enabling Multi-AZ on the existing RDS instance is a faster and simpler solution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html", title: "Multi-AZ deployments for high availability" }
    ]
  },
  {
    id: 4,
    question: "A company needs to analyze large volumes of log files stored in Amazon S3. The log files are generated daily, and analysis is run once a month. The company wants to implement a solution that minimizes storage costs while still allowing access to the log files when needed.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use the S3 Intelligent-Tiering storage class.",
      "Use the S3 Standard storage class and configure a lifecycle policy to transition objects to S3 Glacier Deep Archive after 30 days.",
      "Use the S3 One Zone-Infrequent Access storage class.",
      "Use the S3 Standard storage class with no lifecycle policy."
    ],
    correctAnswer: 1,
    category: "Monitoring and Cost Optimization",
    explanation: "Because log files are accessed only once a month, storing them in S3 Standard and configuring a lifecycle policy to transition them to S3 Glacier Deep Archive after 30 days significantly reduces storage costs. Glacier Deep Archive is the lowest-cost storage class and is ideal for long-term retention.",
    optionExplanations: [
      "S3 Intelligent-Tiering is suitable when access patterns are unknown or variable. When the access pattern is clearly once a month, a lifecycle policy is more cost-efficient.",
      "✓ Correct: Storing new log files in S3 Standard and automatically transitioning them to Glacier Deep Archive after 30 days allows rapid access during the first 30 days, then moves files to the lowest-cost storage tier. During monthly analysis, files can be retrieved as needed (retrieval may take approximately 12 hours).",
      "S3 One Zone-IA is suitable for infrequently accessed data, but it stores data in only a single Availability Zone, reducing durability. It is also not as cost-effective as Glacier Deep Archive.",
      "Using S3 Standard alone incurs unnecessarily high storage costs for infrequently accessed data."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html", title: "Transitioning objects using Amazon S3 Lifecycle" },
      { url: "https://aws.amazon.com/s3/storage-classes/", title: "Amazon S3 Storage Classes" }
    ]
  },
  {
    id: 5,
    question: "A company is planning to migrate from an on-premises data center to AWS. The company wants to migrate its existing VMware environment to AWS and continue using its existing management tools and processes. It also wants to continue managing workloads with VMware vSphere after the migration.\n\nWhich AWS service meets these requirements?",
    options: [
      "AWS Application Migration Service",
      "AWS Server Migration Service",
      "Amazon EC2",
      "VMware Cloud on AWS"
    ],
    correctAnswer: 3,
    category: "Application Integration",
    explanation: "VMware Cloud on AWS is a service that allows VMware vSphere-based environments to run on the AWS Cloud. You can continue using existing VMware management tools (vCenter, vSphere, NSX, etc.) and migrate seamlessly from on-premises VMware environments.",
    optionExplanations: [
      "AWS Application Migration Service is designed to migrate applications to AWS, but it does not support continued use of VMware management tools.",
      "AWS Server Migration Service migrates on-premises workloads to AWS, but after migration the workloads run as EC2 instances and cannot be managed with VMware vSphere.",
      "Amazon EC2 provides virtual servers but does not support management with VMware vSphere. EC2 instances must be managed using AWS management tools.",
      "✓ Correct: VMware Cloud on AWS is an integrated service that runs VMware vSphere-based environments on AWS. You can continue using existing VMware management tools (vCenter, vSphere, NSX, vSAN, etc.) and move workloads between the on-premises VMware environment and AWS. You can leverage VMware skills and tools while taking advantage of AWS scalability and flexibility."
    ],
    references: [
      { url: "https://aws.amazon.com/vmware/", title: "VMware Cloud on AWS" }
    ]
  },
  {
    id: 6,
    question: "A company uses an Amazon DynamoDB table to store user session data. The application must handle 10,000 read requests per second at peak. Each item is 4 KB in size. The company wants to implement a cost-efficient solution.\n\nWhich DynamoDB configuration should a solutions architect recommend to meet these requirements?",
    options: [
      "Use provisioned capacity mode and set 10,000 read capacity units (RCUs).",
      "Use provisioned capacity mode and enable Auto Scaling.",
      "Use on-demand capacity mode.",
      "Use provisioned capacity mode, set 5,000 RCUs, and use DynamoDB Accelerator (DAX)."
    ],
    correctAnswer: 1,
    category: "Compute",
    explanation: "Enabling Auto Scaling in provisioned capacity mode automatically adjusts capacity in response to traffic fluctuations. This ensures performance at peak load while reducing costs during low-traffic periods.",
    optionExplanations: [
      "Permanently provisioning 10,000 RCUs incurs unnecessary costs during off-peak hours. Fixed capacity is inefficient when traffic varies.",
      "✓ Correct: Enabling Auto Scaling in provisioned capacity mode automatically adjusts RCUs as traffic increases or decreases. It ensures the necessary capacity at peak while scaling down to minimize costs at low traffic. This is the most cost-efficient solution when traffic patterns are predictable.",
      "On-demand mode is suitable for unpredictable workloads, but may be more expensive than provisioned capacity mode when traffic is consistently high.",
      "DAX provides a caching layer and improves read performance, but adds additional cost. Auto Scaling should be evaluated first, with DAX considered only if further optimization is needed."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html", title: "Read/write capacity mode" },
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html", title: "Managing throughput capacity with DynamoDB Auto Scaling" }
    ]
  },
  {
    id: 7,
    question: "A company uses an AWS Lambda function to process data. The Lambda function is triggered when a new file is uploaded to an Amazon S3 bucket. Processing typically takes 5 minutes, and the Lambda function timeout is set to 15 minutes. The company wants a solution that automatically retries when processing fails and allows failed jobs to be tracked.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Send S3 event notifications directly to the Lambda function and implement error handling within the function.",
      "Use AWS Step Functions to invoke the Lambda function and implement error handling and retry logic.",
      "Send S3 event notifications to an Amazon SNS topic and trigger the Lambda function from the SNS topic.",
      "Send S3 event notifications to an Amazon SQS queue and trigger the Lambda function from the SQS queue."
    ],
    correctAnswer: 3,
    category: "Application Integration",
    explanation: "Sending S3 event notifications to an SQS queue and triggering the Lambda function from the queue enables automatic retry mechanisms and a dead-letter queue. When processing fails, the message is automatically retried; if it ultimately fails, it is sent to the dead-letter queue for tracking.",
    optionExplanations: [
      "When S3 event notifications are sent directly to a Lambda function, automatic retries on failure are limited (maximum 2 retries). Tracking failed jobs is also difficult.",
      "Step Functions is well-suited for orchestrating complex workflows, but it is overkill for this straightforward use case. SQS provides a simpler and more cost-efficient solution.",
      "Using an SNS topic offers limited retry mechanisms and makes it difficult to track failed messages. SNS is primarily suited for notification delivery.",
      "✓ Correct: Using an SQS queue enables automatic message retries, configurable visibility timeouts, and a dead-letter queue (DLQ) to track failed messages. When a Lambda function fails, the message is automatically returned to the queue and reprocessed. Once the maximum receive count is exceeded, the message is moved to the DLQ where failed jobs can be analyzed."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html", title: "Using Lambda with Amazon SQS" },
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html", title: "Amazon SQS dead-letter queues" }
    ]
  },
  {
    id: 8,
    question: "A company has a web application running on Amazon EC2 instances that processes sensitive customer data. The company wants to restrict SSH access to the EC2 instances, log all access, and avoid distributing SSH keys to EC2 instances.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Set up a bastion host and use it to SSH into EC2 instances.",
      "Use EC2 Instance Connect to access EC2 instances.",
      "Use AWS Systems Manager Session Manager to access EC2 instances.",
      "Create an SSH key pair for each IAM user and distribute them to EC2 instances."
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "AWS Systems Manager Session Manager provides secure access to EC2 instances without managing SSH keys. All sessions are logged to CloudTrail and CloudWatch Logs, and access is controlled using IAM policies.",
    optionExplanations: [
      "A bastion host requires additional infrastructure and increases management and security complexity. SSH key management is still required.",
      "EC2 Instance Connect is convenient but uses temporary SSH keys, so SSH keys are not fully eliminated. It also offers less comprehensive logging than Session Manager.",
      "✓ Correct: Session Manager provides secure access to EC2 instances without requiring SSH keys or a bastion host. All session activity is logged to CloudTrail, and session logs can be stored in an S3 bucket or CloudWatch Logs. IAM policies provide fine-grained control over who can access which instances.",
      "Creating and distributing SSH key pairs per IAM user increases key management complexity and security risk. Key rotation and revocation management are also difficult."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html", title: "AWS Systems Manager Session Manager" }
    ]
  },
  {
    id: 9,
    question: "A company uses Amazon CloudFront to serve a static website. The website content is stored in an Amazon S3 bucket. The company wants to restrict access from specific geographic regions.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use an S3 bucket policy to deny access from specific IP address ranges.",
      "Use AWS WAF to block requests from specific countries.",
      "Use the CloudFront geographic restriction (Geo Restriction) feature.",
      "Use a Network ACL to block traffic from specific IP address ranges."
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "The CloudFront geographic restriction feature allows you to easily restrict access from specific countries or regions. It determines the geographic location of users based on their IP addresses and controls access using an allowlist or blocklist.",
    optionExplanations: [
      "Restricting IP address ranges in an S3 bucket policy is possible, but maintaining IP ranges per geographic region is complex and ineffective because IP addresses change frequently.",
      "Implementing geographic restrictions with AWS WAF is also possible, but the built-in CloudFront Geo Restriction feature is simpler and sufficient for this requirement. WAF is more appropriate when complex rules are needed.",
      "✓ Correct: The CloudFront Geo Restriction feature is the simplest and most effective way to restrict access from specific countries or regions. You can control access using an allowlist (whitelist) or blocklist (blacklist). This feature is available at no additional cost and is easy to configure.",
      "Network ACLs are VPC-level security controls and cannot be applied to a CloudFront distribution. They are also not suitable for geographic-based restrictions."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/georestrictions.html", title: "Restricting the geographic distribution of your content" }
    ]
  },
  {
    id: 10,
    question: "A company runs a containerized application on Amazon ECS. The application needs to connect to an Amazon RDS database using sensitive database credentials. The company wants to manage the credentials securely without hardcoding them into the container image.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Store the credentials as environment variables in the ECS task definition.",
      "Store the credentials in plaintext in AWS Systems Manager Parameter Store and reference them in the ECS task definition.",
      "Store the credentials in an S3 bucket and download them when the ECS task starts.",
      "Store the credentials in AWS Secrets Manager and reference them in the ECS task definition."
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "Using AWS Secrets Manager allows database credentials to be stored securely and rotated automatically. By referencing Secrets Manager secrets in the ECS task definition, containers can retrieve credentials at runtime without hardcoding them in the code or image.",
    optionExplanations: [
      "Storing credentials directly as environment variables in the ECS task definition saves them in plaintext, increasing security risk. Rotating credentials is also difficult.",
      "Systems Manager Parameter Store can store credentials, but storing them in plaintext is a security risk. While the SecureString type should be used, Secrets Manager is more specialized for managing database credentials and provides automatic rotation.",
      "Storing credentials in an S3 bucket is possible but is less secure than Secrets Manager, offers no automatic rotation, and requires additional code.",
      "✓ Correct: AWS Secrets Manager is a service for securely storing, managing, and retrieving database credentials, API keys, and other sensitive information. It provides automatic credential rotation, fine-grained access control, and audit logs. By referencing Secrets Manager secrets in the ECS task definition, containers can securely retrieve credentials at runtime."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-secrets.html", title: "Specifying sensitive data using Secrets Manager" },
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html", title: "What is AWS Secrets Manager?" }
    ]
  },
  {
    id: 11,
    question: "A company manages DNS using Amazon Route 53. The company wants to distribute web application traffic across multiple AWS Regions, routing each user to the nearest Region. It also needs automatic failover to another Region if a Region becomes unavailable.\n\nWhich Route 53 routing policy should a solutions architect recommend to meet these requirements?",
    options: [
      "Simple routing policy",
      "Weighted routing policy",
      "Failover routing policy",
      "Geoproximity routing policy with health checks"
    ],
    correctAnswer: 3,
    category: "High Availability and Scalability",
    explanation: "The geoproximity routing policy routes traffic to the nearest Region based on the geographic location of the user. Combined with health checks, it automatically fails over to a healthy Region when a Region becomes unavailable.",
    optionExplanations: [
      "The simple routing policy routes traffic to a single resource or randomly to multiple resources. It does not support geoproximity-based routing or health check-based failover.",
      "The weighted routing policy distributes traffic according to specified ratios but does not support routing based on the user's geographic location.",
      "The failover routing policy is suitable for failover between primary and secondary resources, but is not designed for geoproximity-based routing across multiple Regions.",
      "✓ Correct: The geoproximity routing policy routes traffic based on the geographic location of users and resources. Configuring health checks enables monitoring of each Region's health, and traffic is automatically rerouted to a healthy Region when a failure is detected. Bias values can also be adjusted to fine-tune the volume of traffic directed to specific Regions."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html", title: "Choosing a routing policy" }
    ]
  },
  {
    id: 12,
    question: "A company uses an Amazon Redshift data warehouse to perform large-scale data analytics. Analytical queries typically run during nightly batch processing and the cluster is rarely used during the day. The company wants to reduce costs during idle hours.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Delete the Redshift cluster and recreate it when needed.",
      "Create a snapshot of the Redshift cluster, delete the cluster, and restore from the snapshot when needed.",
      "Convert the Redshift cluster to Reserved Instances.",
      "Schedule pause and resume for the Redshift cluster."
    ],
    correctAnswer: 3,
    category: "Monitoring and Cost Optimization",
    explanation: "Using the Redshift cluster pause and resume feature reduces compute costs during idle hours. While the cluster is paused, compute node charges stop and only storage charges are incurred.",
    optionExplanations: [
      "Deleting the cluster causes all data to be lost unless a snapshot is first created.",
      "Restoring from a snapshot is possible, but recreating the cluster takes time and increases operational complexity. Pause/resume is faster and simpler.",
      "Reserved Instances are effective for long-term cost reduction but cannot eliminate costs during idle periods. Charges continue throughout the 1- or 3-year commitment.",
      "✓ Correct: The Redshift cluster pause feature eliminates compute node charges during idle hours; only storage charges continue while the cluster is paused. Pause and resume can be automated using the AWS CLI, AWS Lambda, or EventBridge. Resume completes in a few minutes and all data is retained."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/mgmt/managing-cluster-operations.html#rs-mgmt-pause-resume-cluster", title: "Pausing and resuming a cluster" }
    ]
  },
  {
    id: 13,
    question: "A company wants to monitor the performance of a web application running on AWS. The company needs to track response times and error rates for each application component (ALB, EC2, RDS, Lambda) and quickly identify the source of issues when they occur.\n\nWhich AWS service should a solutions architect recommend to meet these requirements?",
    options: [
      "Amazon CloudWatch Logs",
      "AWS X-Ray",
      "AWS CloudTrail",
      "Amazon Inspector"
    ],
    correctAnswer: 1,
    category: "Monitoring and Cost Optimization",
    explanation: "AWS X-Ray is a service for tracing and analyzing distributed applications. It visualizes response times, errors, and throttling for each application component and identifies performance bottlenecks.",
    optionExplanations: [
      "CloudWatch Logs is well-suited for collecting and analyzing log data, but it is not specialized for distributed tracing or end-to-end request flow visualization.",
      "✓ Correct: AWS X-Ray provides end-to-end tracing for distributed applications. It visualizes response times, errors, and throttling as requests pass through components such as ALB, EC2, RDS, and Lambda. Service maps help you visually understand the application architecture and dependencies between components, enabling rapid identification of performance bottlenecks.",
      "CloudTrail records audit logs of AWS API calls and is used for security and compliance auditing. It is not suitable for monitoring application performance.",
      "Amazon Inspector is a security service that performs vulnerability scanning on EC2 instances and container images. It is not used for monitoring application performance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html", title: "What is AWS X-Ray?" }
    ]
  },
  {
    id: 14,
    question: "A company is planning to migrate from an on-premises file server to AWS. The company wants to continue accessing files using the existing SMB protocol. It also wants a solution where frequently accessed files are available with low latency and infrequently accessed files are automatically tiered to lower-cost storage.\n\nWhich AWS service meets these requirements?",
    options: [
      "Amazon EFS",
      "AWS Storage Gateway - File Gateway",
      "Amazon FSx for Windows File Server",
      "Amazon S3"
    ],
    correctAnswer: 1,
    category: "Storage",
    explanation: "AWS Storage Gateway - File Gateway allows on-premises applications to access S3 using the SMB or NFS protocol. Frequently accessed data is cached locally, and all data is stored in S3. S3 lifecycle policies can automatically transition infrequently accessed data to lower-cost storage classes.",
    optionExplanations: [
      "Amazon EFS supports the NFS protocol but does not support SMB. Its lifecycle management capabilities are also limited.",
      "✓ Correct: AWS Storage Gateway - File Gateway is a hybrid storage solution that provides access to S3 via the SMB or NFS protocol. Frequently accessed files are stored in a local cache for low-latency access. All files are backed by S3, and S3 lifecycle policies can automatically transition infrequently accessed files to lower-cost storage classes such as S3 Glacier Deep Archive.",
      "FSx for Windows File Server supports the SMB protocol and provides Windows file server functionality, but it does not offer automatic tiering to low-cost storage classes like S3.",
      "Amazon S3 does not natively support the SMB protocol. Accessing S3 requires the AWS CLI, an SDK, or a gateway service such as Storage Gateway."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html", title: "What is AWS Storage Gateway?" }
    ]
  },
  {
    id: 15,
    question: "A company exposes a RESTful API using Amazon API Gateway. The API invokes a backend AWS Lambda function. The company wants to throttle the request rate to prevent the Lambda function from being overwhelmed when the number of API requests spikes.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Configure a reserved concurrency limit on the Lambda function.",
      "Configure API Gateway usage plans and API keys.",
      "Use AWS WAF to configure rate-limiting rules.",
      "Use an Application Load Balancer to control traffic."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "Using API Gateway usage plans allows you to throttle the request rate and quota for an API. Combined with API keys, different limits can be configured for each client.",
    optionExplanations: [
      "Configuring a reserved concurrency limit on a Lambda function provides control at the Lambda level, but throttling at the API Gateway level is more appropriate for protecting the API.",
      "✓ Correct: API Gateway usage plans allow you to set the request rate (requests per second), burst rate, and quota (total requests within a specified period) for an API. Combined with API keys, different limits can be assigned to different clients or tiers. Requests that exceed the limit receive a 429 Too Many Requests error.",
      "AWS WAF is a web application firewall that protects against attacks such as SQL injection and XSS. API Gateway usage plans are more specialized for API-level rate limiting.",
      "An Application Load Balancer is used for load balancing HTTP/HTTPS traffic and is not a suitable replacement for API Gateway. API Gateway provides API management, authentication, rate limiting, and other capabilities."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html", title: "Throttle API requests for better throughput" }
    ]
  },
  {
    id: 16,
    question: "A company uses an Amazon Aurora database. The company wants to provide a testing environment where the development team can use the latest data without impacting the production database. The company also wants to minimize the cost of the test environment.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Create a snapshot of the Aurora database and restore it to a new cluster.",
      "Create a read replica of the Aurora database and provide it to the development team.",
      "Use AWS Database Migration Service to copy data to a new Aurora cluster.",
      "Use the Aurora Clone feature to create a database clone."
    ],
    correctAnswer: 3,
    category: "Database",
    explanation: "Using the Aurora Clone feature allows a fast, cost-efficient copy of the production database to be created. Because cloning uses a copy-on-write technique, there is almost no additional storage cost in the initial state; only changed data consumes additional storage.",
    optionExplanations: [
      "Creating a new cluster from a snapshot is possible, but a full copy of the data is created, resulting in higher storage costs. Restoration also takes time.",
      "A read replica is read-only and stays in sync with the production database. It is not suitable when the development team needs to modify data.",
      "AWS DMS is used for migrating data between databases, but Aurora Clone is faster, more cost-efficient, and better suited for this requirement.",
      "✓ Correct: The Aurora Clone feature uses copy-on-write technology to create a fast, low-cost copy of the production database. Clones can be created in minutes. In the initial state they share storage with the source database, so almost no additional storage cost is incurred. Only data blocks changed in the clone are written to new storage. The development team can test with the latest data without affecting the production environment."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.html", title: "Cloning a volume for an Amazon Aurora DB cluster" }
    ]
  },
  {
    id: 17,
    question: "A company has a legacy application running on Amazon EC2 instances. The application communicates with other systems using a fixed private IP address. The company wants to quickly reassign the same IP address to a new instance if the current instance fails.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use an Elastic IP address.",
      "Use an Elastic Network Interface (ENI) with a secondary private IP address.",
      "Use a Route 53 private hosted zone.",
      "Use a Network Load Balancer."
    ],
    correctAnswer: 1,
    category: "Networking",
    explanation: "By assigning a secondary private IP address to an Elastic Network Interface (ENI) and moving the ENI to a new instance, the fixed private IP address can be preserved. ENIs can be moved between instances and retain attributes such as IP addresses, security groups, and MAC addresses.",
    optionExplanations: [
      "Elastic IP addresses are public IP addresses and do not satisfy the requirement for a private IP address.",
      "✓ Correct: Using an Elastic Network Interface (ENI) allows a fixed private IP address to be maintained. Assign a secondary private IP address to the ENI and attach it to the primary instance. If the instance fails, move the ENI to a new instance to preserve the same private IP address. Because the ENI retains attributes such as IP addresses, security groups, and MAC addresses, no network reconfiguration is required.",
      "A Route 53 private hosted zone is used for DNS name resolution within a VPC and is not a direct solution for preserving a fixed private IP address.",
      "A Network Load Balancer is used for load balancing traffic and is not suitable for the requirement of assigning a fixed private IP address to a single instance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html", title: "Elastic network interfaces" }
    ]
  },
  {
    id: 18,
    question: "A company needs to process a large number of image files stored in an Amazon S3 bucket. After upload, each image must have a thumbnail generated and metadata extracted. Processing is asynchronous and the time varies by image size (from 1 second to 5 minutes). The company wants to implement a cost-efficient and scalable solution.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Send S3 event notifications to an Amazon SQS queue and trigger an AWS Lambda function from the SQS queue.",
      "Send S3 event notifications to an Amazon SQS queue and poll the queue from EC2 instances for processing.",
      "Use S3 event notifications to trigger an AWS Lambda function directly.",
      "Use Amazon EventBridge to capture S3 events and launch AWS Batch jobs."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "Sending S3 event notifications to an SQS queue and triggering a Lambda function from the queue improves processing reliability and scalability. The SQS queue provides automatic retries on failure and a dead-letter queue, while Lambda scales automatically.",
    optionExplanations: [
      "✓ Correct: Sending S3 event notifications to an SQS queue and triggering a Lambda function from the queue improves reliability and scalability. The SQS queue provides message buffering, automatic retries on processing failure, and dead-letter queue tracking of failed messages. Lambda functions retrieve messages from the SQS queue in batches and process them in parallel, enabling efficient handling of large volumes of images. Even when processing time is long, setting the Lambda timeout appropriately ensures all images are processed.",
      "Using EC2 instances is possible, but Lambda is more cost-efficient and scales automatically. EC2 instances run continuously, incurring costs during idle periods.",
      "Triggering a Lambda function directly from S3 event notifications is possible, but when processing can take up to 5 minutes, the Lambda timeout limit (maximum 15 minutes) may be approached. Lambda throttling may also occur when a large number of concurrent requests arrive.",
      "AWS Batch is suited for large-scale batch processing jobs but is overkill for this use case. The combination of Lambda and SQS is a simpler and more cost-efficient solution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html", title: "Using Lambda with Amazon SQS" }
    ]
  },
  {
    id: 19,
    question: "A company runs a containerized application on Amazon EKS (Elastic Kubernetes Service). The company wants to control access to AWS services (such as S3 and DynamoDB) for Kubernetes pods using AWS IAM roles.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use EC2 instance profiles to assign an IAM role to worker nodes.",
      "Use Kubernetes Secrets to store AWS credentials.",
      "Use AWS Secrets Manager to store AWS credentials and retrieve them from pods.",
      "Use IAM Roles for Service Accounts (IRSA)."
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "Using IAM Roles for Service Accounts (IRSA) allows IAM roles to be assigned to Kubernetes service accounts. This enables fine-grained access control at the pod level and allows the principle of least privilege to be followed.",
    optionExplanations: [
      "Using EC2 instance profiles causes all pods on a worker node to share the same IAM role, which violates the principle of least privilege. Different access permissions cannot be set per pod.",
      "Storing credentials in Kubernetes Secrets is possible, but credential management and rotation become complex. Using IAM roles also aligns with AWS best practices.",
      "Storing credentials in AWS Secrets Manager is possible, but using IAM roles eliminates the need to manage credentials at all and is more secure.",
      "✓ Correct: IAM Roles for Service Accounts (IRSA) is a feature that associates Kubernetes service accounts with IAM roles. Each pod can obtain the permissions of a specific IAM role through its associated service account. This enables fine-grained access control at the pod level and allows the principle of least privilege to be followed. No credential management is required, and IAM role permissions are automatically applied to pods."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html", title: "IAM roles for service accounts" }
    ]
  },
  {
    id: 20,
    question: "A company processes real-time streaming data using Amazon Kinesis Data Streams. Data is sent from multiple sources and processed by multiple consumer applications. The company wants a solution where each consumer processes data independently and can track its processing progress.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Create a separate Kinesis Data Stream for each consumer.",
      "Use the Kinesis Client Library (KCL) to implement each consumer application.",
      "Use an Amazon SQS queue to deliver data to consumers.",
      "Use AWS Lambda functions to forward data to each consumer."
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "Using the Kinesis Client Library (KCL) allows each consumer application to process data independently and automatically track processing progress (checkpoints). KCL handles shard load balancing, failover, and checkpoint management automatically.",
    optionExplanations: [
      "Creating a separate stream for each consumer increases data duplication and cost. Sharing a single stream across multiple consumers is more efficient.",
      "✓ Correct: The Kinesis Client Library (KCL) is a library that simplifies developing applications that read from Kinesis Data Streams. KCL manages independent checkpoints for each consumer application and tracks processing progress. Multiple consumers can read from the same stream, and each consumer can proceed independently. KCL automatically handles shard load balancing, failover, and checkpoint management.",
      "Amazon SQS is a message queuing service, but it is not suited for the ordering guarantees of streaming data or independent processing by multiple consumers as provided by Kinesis Data Streams.",
      "Using Lambda functions to forward data is possible, but using KCL is more efficient because checkpoint management and failover are built in."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/streams/latest/dev/shared-throughput-kcl-consumers.html", title: "Developing consumers using the Kinesis Client Library" }
    ]
  },
  {
    id: 21,
    question: "A company wants to improve application performance using Amazon ElastiCache. The application needs to cache data that is read frequently but rarely modified. The company wants to minimize data loss if a cache node fails.\n\nWhich ElastiCache engine and configuration should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Memcached and create a cluster with multiple nodes.",
      "Use Redis and create a replication group with cluster mode disabled.",
      "Use Redis and create a replication group with cluster mode enabled.",
      "Use Memcached and enable Auto Discovery."
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "Using a Redis replication group with cluster mode disabled creates a configuration with a primary node and read replicas. If the primary node fails, a read replica is automatically promoted to primary, minimizing data loss.",
    optionExplanations: [
      "Memcached does not support data persistence or replication. If a node fails, all data on that node is lost.",
      "✓ Correct: A Redis replication group with cluster mode disabled provides a configuration with a primary node and up to five read replicas. If the primary node fails, automatic failover promotes a read replica to primary, minimizing data loss. Redis also supports data persistence; snapshots and AOF (Append Only File) can be used to back up data.",
      "Redis cluster mode enabled distributes data across shards and provides higher scalability, but it is overkill for this requirement. Cluster mode disabled is simpler and easier to manage.",
      "Memcached Auto Discovery is a feature that allows clients to automatically discover nodes in a cluster, but it does not provide data persistence or replication."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Replication.html", title: "Replication: Redis (Cluster Mode Disabled) vs. Redis (Cluster Mode Enabled)" }
    ]
  },
  {
    id: 22,
    question: "A company uses AWS Organizations to manage multiple AWS accounts. The company wants to automatically enable specific AWS services (such as Amazon GuardDuty and AWS Config) across all accounts and manage them centrally.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS Control Tower to configure guardrails.",
      "Use AWS CloudFormation StackSets to deploy resources to each account.",
      "Use AWS Systems Manager Automation to enable services in each account.",
      "Use AWS Lambda to enable services when new accounts are created."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Control Tower is a service that automates the setup and management of multi-account environments. Guardrails can be used to enforce consistent security and compliance policies across all accounts. Services such as GuardDuty and Config can be automatically enabled.",
    optionExplanations: [
      "✓ Correct: AWS Control Tower automatically sets up a landing zone based on multi-account best practices. Guardrails (preventive and detective) enforce consistent policies across all accounts. Services such as GuardDuty, Config, and CloudTrail can be automatically enabled and centrally managed. When a new account is created, guardrails are automatically applied.",
      "CloudFormation StackSets can deploy resources to multiple accounts, but Control Tower is more specialized for multi-account environment management and provides more comprehensive capabilities.",
      "Systems Manager Automation can automate operational tasks, but Control Tower is more specialized for multi-account management and is better suited for this use case.",
      "Building a custom solution with Lambda functions is possible, but Control Tower provides ready-made capabilities and is easier to manage."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html", title: "What is AWS Control Tower?" }
    ]
  },
  {
    id: 23,
    question: "A company uses Amazon Athena to analyze large volumes of log files stored in Amazon S3. The company wants to improve query performance and reduce costs. The log files are organized into folders by date (for example, s3://bucket/logs/2024/01/15/).\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use S3 Select on the S3 bucket.",
      "Create partitions on the Athena table and use partition pruning in queries.",
      "Convert the log files to Parquet format.",
      "Use Amazon Redshift Spectrum."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "Creating partitions on an Athena table ensures that queries scan only the required data, improving performance and reducing costs. Creating partitions by date allows queries to target only the data for a specific date.",
    optionExplanations: [
      "S3 Select retrieves specific data from S3 objects, but Athena partitioning is more effective for improving query performance and reducing costs on large datasets.",
      "✓ Correct: Creating partitions on an Athena table ensures queries scan only the required partitions (folders). For example, creating partitions by year, month, and day lets you query only the data for a specific date, dramatically reducing the amount of data scanned. This improves query performance and lowers Athena costs (which are based on the amount of data scanned). Using partition pruning, you can specify partition keys in the WHERE clause to skip unnecessary partitions.",
      "Converting to Parquet format is effective for improving query performance and reducing costs, but combining it with partitioning yields even greater benefits. Partitioning is recommended as the first step.",
      "Redshift Spectrum can query data in S3, but Athena is serverless and simpler to set up. Athena is sufficient for this requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/partitions.html", title: "Partitioning data in Athena" }
    ]
  },
  {
    id: 24,
    question: "A company wants to protect a web application running on AWS against DDoS attacks. The application runs on EC2 instances behind an Application Load Balancer (ALB). The company wants comprehensive DDoS protection and 24/7 support during attacks.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS WAF to configure rate-limiting rules.",
      "Use AWS Shield Advanced.",
      "Use AWS Shield Standard.",
      "Use Amazon CloudFront with AWS WAF."
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "AWS Shield Advanced provides enhanced DDoS protection and protects resources such as ALB, CloudFront, and Route 53. It also provides 24/7 support from the DDoS Response Team (DRT), cost protection, and real-time attack notifications.",
    optionExplanations: [
      "AWS WAF is a web application firewall that protects against attacks such as SQL injection and XSS, but it does not provide comprehensive DDoS protection or 24/7 support during attacks.",
      "✓ Correct: AWS Shield Advanced provides enhanced DDoS protection. It protects resources including ALB, CloudFront, Route 53, and Elastic IPs, and defends against Layer 3, 4, and 7 attacks. It provides 24/7 support from the DDoS Response Team (DRT), cost protection during attacks (reimbursement for scaling costs caused by DDoS attacks), real-time attack notifications, and detailed attack diagnostics. It also integrates with AWS WAF to apply advanced protection rules.",
      "AWS Shield Standard is basic DDoS protection provided free to all AWS users, but it does not include advanced protection features or 24/7 support.",
      "The combination of CloudFront and WAF can enhance DDoS protection, but Shield Advanced provides more comprehensive protection and 24/7 support."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html", title: "AWS Shield Advanced" }
    ]
  },
  {
    id: 25,
    question: "A company sends application logs from Amazon EC2 instances to Amazon CloudWatch Logs. The company wants to automatically send a notification to an Amazon SNS topic whenever a specific error pattern appears in the logs.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Create a CloudWatch Logs metric filter and configure a CloudWatch alarm to send a notification to SNS.",
      "Use a CloudWatch Logs subscription filter to trigger a Lambda function that sends a notification to SNS.",
      "Create an AWS EventBridge rule to capture CloudWatch Logs events and send a notification to SNS.",
      "Use CloudWatch Logs Insights to periodically query logs and detect error patterns."
    ],
    correctAnswer: 0,
    category: "Monitoring and Cost Optimization",
    explanation: "Using a CloudWatch Logs metric filter to convert specific log patterns into a metric and configuring a CloudWatch alarm allows an SNS topic notification to be sent automatically when an error pattern is detected.",
    optionExplanations: [
      "✓ Correct: A CloudWatch Logs metric filter converts specific log patterns (for example, 'ERROR' or 'Exception') into a metric. The filter scans the log stream and counts log entries matching the pattern. A CloudWatch alarm can then be configured so that when the metric exceeds a specified threshold (for example, more than 10 errors in 5 minutes), a notification is sent to the SNS topic. This approach is simple and requires no additional code.",
      "Using a subscription filter with a Lambda function is possible, but using a metric filter and CloudWatch alarm is simpler and requires no additional code.",
      "EventBridge cannot directly capture CloudWatch Logs events; a subscription filter must be used.",
      "CloudWatch Logs Insights is used for querying and analyzing logs, but it is not suitable for real-time alerting. A metric filter and alarm are better suited for automatic notifications."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html", title: "Creating metrics from log events using filters" }
    ]
  },
  {
    id: 26,
    question: "A company wants to audit access to sensitive data stored in an Amazon S3 bucket. The company wants to record who accessed which objects and when, and detect unauthorized access.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Enable S3 server access logging on the bucket.",
      "Use Amazon Macie.",
      "Enable AWS CloudTrail data event logging.",
      "Use an S3 bucket policy to restrict access."
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "Enabling AWS CloudTrail data event logging records S3 object-level API operations (GetObject, PutObject, DeleteObject, etc.), allowing detailed tracking of who accessed which objects and when.",
    optionExplanations: [
      "S3 server access logs record requests to the bucket, but CloudTrail data event logs provide more detailed information (IAM user, role, access time, etc.) and are better suited for auditing.",
      "Amazon Macie automatically detects and classifies sensitive data (PII, credit card numbers, etc.) in S3 buckets. CloudTrail is more appropriate for access auditing.",
      "✓ Correct: Enabling AWS CloudTrail data event logging records S3 object-level API operations. For each operation, it captures who (IAM user or role), when (timestamp), which object (bucket name and key), and what action (GetObject, PutObject, DeleteObject, etc.) was performed. CloudTrail Insights can automatically detect anomalous access patterns. Logs are stored in S3 and can be queried with Amazon Athena.",
      "S3 bucket policies are used for access control but do not provide audit logs of access. They must be used in conjunction with CloudTrail."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/cloudtrail-logging.html", title: "Logging Amazon S3 API calls using AWS CloudTrail" }
    ]
  },
  {
    id: 27,
    question: "A company has an application running on Amazon EC2 instances that regularly uploads large amounts of data to Amazon S3. The data transfer costs via the internet are high. The company wants to reduce data transfer costs and improve security.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Create a VPC Gateway Endpoint for S3.",
      "Use AWS Direct Connect.",
      "Create a VPC Interface Endpoint for S3.",
      "Use AWS PrivateLink."
    ],
    correctAnswer: 0,
    category: "Networking",
    explanation: "Creating a VPC Gateway Endpoint for S3 routes traffic from EC2 instances to S3 through the AWS network, eliminating the need for an internet gateway or NAT gateway. This reduces data transfer costs and improves security.",
    optionExplanations: [
      "✓ Correct: Creating a VPC Gateway Endpoint for S3 routes EC2-to-S3 traffic through the AWS private network without requiring an internet gateway, NAT device, VPN connection, or Direct Connect. This eliminates NAT gateway data processing fees and reduces costs. Traffic never traverses the internet, improving security. Gateway Endpoints for S3 are available at no charge.",
      "AWS Direct Connect provides a dedicated network connection between on-premises and AWS, but it is not necessary for EC2-to-S3 traffic within a VPC. A VPC Endpoint is more appropriate.",
      "S3 supports Gateway Endpoints, which are more cost-efficient than Interface Endpoints. Interface Endpoints incur hourly charges and data processing fees.",
      "AWS PrivateLink uses Interface VPC Endpoints to access AWS services, but for S3, a Gateway Endpoint is the recommended and more cost-effective option."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html", title: "Access Amazon S3 using an interface VPC endpoint" }
    ]
  },
  {
    id: 28,
    question: "A company uses an Amazon RDS for PostgreSQL database. The company wants to monitor database performance, identify slow queries, and optimize them.\n\nWhich AWS service should a solutions architect recommend to meet these requirements?",
    options: [
      "Amazon CloudWatch Logs",
      "Amazon RDS Performance Insights",
      "AWS CloudTrail",
      "AWS X-Ray"
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "Amazon RDS Performance Insights is a tool for monitoring database performance and identifying slow queries and resource bottlenecks. It visualizes database load and makes it easy to see which queries consume the most resources.",
    optionExplanations: [
      "CloudWatch Logs is used for collecting and analyzing log data, but Performance Insights is specialized for database performance monitoring and provides more detailed information.",
      "✓ Correct: Amazon RDS Performance Insights monitors and optimizes database performance. It visualizes database load over time and identifies which queries consume the most CPU, I/O, and memory. You can analyze slow query SQL statements, execution times, and wait events in detail to quickly pinpoint performance bottlenecks. The dashboard is intuitive and retains performance data for up to 7 days (free) or up to 2 years (paid).",
      "CloudTrail records audit logs of AWS API calls and is not used for database performance monitoring.",
      "AWS X-Ray is used for tracing distributed applications, but Performance Insights is more appropriate for database performance monitoring."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.html", title: "Monitoring DB load with Performance Insights on Amazon RDS" }
    ]
  },
  {
    id: 29,
    question: "A company has a microservices architecture application running on AWS. Each microservice runs on Amazon ECS and communicates with other services over HTTP/HTTPS. The company wants to encrypt inter-service communication and implement mutual authentication.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS App Mesh to implement a service mesh.",
      "Use an Application Load Balancer to enable HTTPS communication.",
      "Use AWS Certificate Manager to issue TLS certificates to each service.",
      "Use Amazon API Gateway to manage inter-service communication."
    ],
    correctAnswer: 0,
    category: "Compute",
    explanation: "AWS App Mesh is a service mesh that manages communication between microservices. It encrypts service-to-service communication and implements mutual TLS authentication. It also centralizes traffic routing, observability, and security management.",
    optionExplanations: [
      "✓ Correct: AWS App Mesh is a service mesh that manages communication between microservices. It deploys an Envoy proxy as a sidecar for each service, enabling TLS encryption and mutual TLS authentication between services. App Mesh also provides traffic routing, retry, timeout, and circuit breaker features, improving the observability and security of microservices. It supports services running on ECS, EKS, and EC2.",
      "An ALB can enable HTTPS communication between clients and services, but App Mesh is more suitable for implementing mutual TLS authentication between services.",
      "Issuing TLS certificates with ACM is possible, but App Mesh provides a comprehensive set of service mesh features (mutual TLS authentication, traffic management, observability).",
      "API Gateway is well-suited for managing communication between external clients and services, but App Mesh is more appropriate for internal service-to-service communication."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/app-mesh/latest/userguide/what-is-app-mesh.html", title: "What is AWS App Mesh?" }
    ]
  },
  {
    id: 30,
    question: "A company displays a large number of image files stored in an Amazon S3 bucket on its website. The images are frequently accessed, but their large original size is causing slow page load times. The company wants to automatically resize and optimize images to reduce page load times.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Amazon CloudFront with Lambda@Edge to resize images.",
      "Use an AWS Lambda function to resize images and store them in a separate S3 bucket.",
      "Run an image processing server on Amazon EC2 instances.",
      "Deploy an image processing application using AWS Elastic Beanstalk."
    ],
    correctAnswer: 0,
    category: "Networking",
    explanation: "Using Amazon CloudFront with Lambda@Edge allows images to be resized and optimized at edge locations. Processing images at the edge location closest to the user minimizes latency and reduces page load times.",
    optionExplanations: [
      "✓ Correct: Using Amazon CloudFront with Lambda@Edge allows images to be resized on demand at edge locations. Based on the requested image size (specified via query parameters), the Lambda@Edge function resizes the image, which CloudFront then caches. This delivers optimized images from the edge location closest to the user, minimizing latency and reducing page load times. Only the original image needs to be stored in S3, reducing storage costs.",
      "Using a Lambda function to resize images is possible, but all sizes must be pre-generated, increasing storage costs. Lambda@Edge is more efficient because it resizes images on demand.",
      "Running an image processing server on EC2 is possible, but Lambda@Edge is serverless, scales automatically, and is more cost-efficient.",
      "Using Elastic Beanstalk is possible, but Lambda@Edge processes at edge locations, providing lower latency and better efficiency for global users."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html", title: "Customizing at the edge with Lambda@Edge" }
    ]
  },
  {
    id: 31,
    question: "A company has a web application running on Amazon EC2 instances. The application uses configuration files containing sensitive information, and the company wants to manage this information securely. The configuration files are loaded at application startup and need to be updated periodically.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS Secrets Manager to store the sensitive information.",
      "Use AWS Systems Manager Parameter Store to store the configuration.",
      "Include the configuration files in the EC2 instance user data.",
      "Store configuration files in an Amazon S3 bucket and restrict access with a bucket policy."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Secrets Manager is a service for securely storing, managing, and retrieving database credentials, API keys, and other sensitive information. It supports automatic secret rotation and provides fine-grained access control.",
    optionExplanations: [
      "✓ Correct: AWS Secrets Manager securely stores, manages, and retrieves database credentials, API keys, and other sensitive information. It stores secrets encrypted using IAM policies for fine-grained access control. It supports automatic secret rotation, enabling periodic updates of database credentials. It also integrates with CloudTrail for auditing access to secrets. Applications can retrieve secrets from Secrets Manager using the AWS SDK.",
      "Parameter Store is suitable for storing configuration data, but Secrets Manager is more specialized for managing sensitive information and provides automatic rotation.",
      "Including sensitive information in user data is a security risk. User data is viewable from the EC2 console and API, and is not appropriate for storing sensitive information.",
      "Storing configuration files in an S3 bucket is possible, but Secrets Manager is more specialized for sensitive information management and provides automatic rotation, audit logs, and fine-grained access control."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html", title: "What is AWS Secrets Manager?" }
    ]
  },
  {
    id: 32,
    question: "A company uses an Amazon RDS for MySQL database. The company wants to improve its backup strategy and achieve a disaster recovery recovery point objective (RPO) of within one hour. The company also wants to store backups in a different AWS Region.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Enable RDS automated backups and set the backup retention period to 35 days.",
      "Manually create RDS snapshots and copy them to another Region.",
      "Create an RDS read replica in another Region.",
      "Use AWS Backup to copy RDS database backups to another Region."
    ],
    correctAnswer: 3,
    category: "High Availability and Scalability",
    explanation: "Using AWS Backup, you can automatically create RDS database backups and copy them to another Region. Setting a backup schedule allows you to meet RPO requirements.",
    optionExplanations: [
      "RDS automated backups are stored only within the same Region. Additional steps are required to store backups in a different Region.",
      "Creating manual snapshots and copying them to another Region is possible, but AWS Backup is automated and easier to manage.",
      "Read replicas can be used for read scaling and disaster recovery, but they are not a substitute for backups. Read replicas reflect primary database changes in near real time but do not protect against accidental deletion or corruption.",
      "✓ Correct: AWS Backup is a centralized backup management service across AWS services. It can automatically create RDS database backups and copy them to another Region based on a backup policy. Setting a backup schedule (e.g., hourly) allows the RPO requirement to be met. It also centrally manages backup retention, lifecycle management, and encryption. AWS Backup supports multiple AWS services including RDS, EBS, EFS, DynamoDB, and Storage Gateway."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html", title: "What is AWS Backup?" }
    ]
  },
  {
    id: 33,
    question: "A company has a microservices application running on an Amazon EKS (Elastic Kubernetes Service) cluster. Each microservice needs to access different AWS resources (S3, DynamoDB, SQS, etc.). The company wants to grant each microservice access permissions based on the principle of least privilege.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Pass AWS access keys and secret keys to each microservice as environment variables.",
      "Attach an IAM role to EKS nodes so all Pods use the same role.",
      "Use IAM Roles for Service Accounts (IRSA) to assign individual IAM roles to each Pod.",
      "Use Kubernetes Secrets to store AWS credentials."
    ],
    correctAnswer: 2,
    category: "Compute",
    explanation: "Using IAM Roles for Service Accounts (IRSA) allows fine-grained IAM roles to be assigned to each Kubernetes Pod. This enables access control based on the principle of least privilege.",
    optionExplanations: [
      "Passing AWS access keys and secret keys as environment variables is a security risk. Credentials may be exposed and are difficult to rotate.",
      "Attaching an IAM role to EKS nodes means all Pods on that node share the same permissions, which violates the principle of least privilege.",
      "✓ Correct: IAM Roles for Service Accounts (IRSA) associates Kubernetes Service Accounts with IAM roles. By assigning a Service Account to each Pod and associating that Service Account with a specific IAM role, fine-grained access control is achieved per Pod. When Pods access AWS resources via the AWS SDK, they automatically obtain temporary credentials for the associated IAM role. This enables least-privilege access control and improves security, eliminating the need to embed credentials in code or environment variables.",
      "Storing credentials in Kubernetes Secrets is possible, but IRSA is more secure and easier to manage. IRSA automatically obtains and rotates temporary credentials."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html", title: "IAM roles for service accounts" }
    ]
  },
  {
    id: 34,
    question: "A company wants to archive a large number of log files stored in an Amazon S3 bucket for long-term retention. The log files are frequently accessed for the first 30 days and rarely accessed after that. The company wants to minimize storage costs.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use the S3 Intelligent-Tiering storage class.",
      "Use an S3 lifecycle policy to transition to S3 Standard-IA after 30 days and to S3 Glacier Deep Archive after 90 days.",
      "Use an S3 lifecycle policy to transition to S3 Glacier Flexible Retrieval after 30 days.",
      "Store all log files in S3 One Zone-IA."
    ],
    correctAnswer: 1,
    category: "Storage",
    explanation: "Using an S3 lifecycle policy to transition log files in stages optimizes storage costs. Files are stored in S3 Standard for the first 30 days, then transitioned to S3 Standard-IA, and finally to S3 Glacier Deep Archive for long-term retention.",
    optionExplanations: [
      "S3 Intelligent-Tiering automatically transitions between storage classes based on access patterns, but moving to archive tiers requires additional configuration. A lifecycle policy provides a clearer transition schedule and makes cost forecasting easier.",
      "✓ Correct: Using an S3 lifecycle policy to transition log files in stages optimizes storage costs. For the first 30 days, files are stored in S3 Standard (for frequent access). After 30 days, they transition to S3 Standard-IA (for infrequent access), reducing storage costs. After 90 days, they transition to S3 Glacier Deep Archive (for long-term archiving), achieving the lowest storage cost. This staged transition uses the optimal storage class based on the access pattern, minimizing overall costs.",
      "S3 Glacier Flexible Retrieval is suitable as archive storage, but transitioning through S3 Standard-IA first enables staged cost reduction. Transitioning to Glacier Deep Archive after 90 days reduces costs further.",
      "S3 One Zone-IA stores data in only a single Availability Zone, resulting in lower durability. For long-term retention, Glacier Deep Archive is more appropriate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html", title: "Transitioning objects using Amazon S3 Lifecycle" }
    ]
  },
  {
    id: 35,
    question: "A company has a web application running on Amazon EC2 instances. The application stores user session information locally, but when it scales out using an Auto Scaling group, session information is lost.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Amazon EFS to store session information in a shared file system.",
      "Enable sticky sessions on the Elastic Load Balancer.",
      "Use Amazon RDS to store session information in a database.",
      "Use Amazon ElastiCache for Redis to store session information."
    ],
    correctAnswer: 3,
    category: "Application Integration",
    explanation: "Using Amazon ElastiCache for Redis allows session information to be stored and retrieved quickly, and session data can be shared across multiple EC2 instances. Redis is an in-memory data store ideal for low-latency session management.",
    optionExplanations: [
      "Using EFS to store session information is possible, but ElastiCache provides lower latency and is optimized for session management.",
      "Sticky sessions pin users to a specific instance, but if that instance is terminated, session information is lost. Using ElastiCache provides a more robust solution.",
      "Using RDS to store session information is possible, but ElastiCache provides lower latency and is better suited for session management. Databases are appropriate for persistent data, but in-memory stores are more efficient for temporary data such as session information.",
      "✓ Correct: Amazon ElastiCache for Redis is an in-memory data store ideal for storing session information. It stores and retrieves session data quickly with low latency and allows session information to be shared across multiple EC2 instances. When the Auto Scaling group scales out, all instances access the same ElastiCache cluster, so session information is never lost. Redis also supports data persistence and replication, enabling high availability."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/elasticache-use-cases.html", title: "Common ElastiCache use cases and how ElastiCache can help" }
    ]
  },
  {
    id: 36,
    question: "A company is planning a migration from its on-premises data center to AWS. The company needs to transfer a large amount of data (hundreds of TB) to Amazon S3. Transferring the data over the internet would take too long, so the company is looking for a faster method.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS Direct Connect to establish a dedicated network connection.",
      "Use AWS DataSync to transfer the data.",
      "Use AWS Snowball devices to physically transfer the data.",
      "Use Amazon S3 Transfer Acceleration to transfer the data."
    ],
    correctAnswer: 2,
    category: "Application Integration",
    explanation: "AWS Snowball is a device for physically transferring large amounts of data. When transferring hundreds of TB, Snowball is faster and more cost-effective than transferring over the internet.",
    optionExplanations: [
      "Direct Connect provides a dedicated network connection between on-premises and AWS, but setup takes time and Snowball is more cost-effective for a one-time transfer of hundreds of TB.",
      "DataSync automates data transfer between on-premises and AWS, but it transfers data over the network. For hundreds of TB, Snowball is faster.",
      "✓ Correct: AWS Snowball is a petabyte-scale data transfer device for physically moving large amounts of data. A Snowball device is shipped to the on-premises data center, data is copied to the device, and the device is shipped back to AWS. AWS then imports the data from the device into an S3 bucket. For hundreds of TB, this is faster and more cost-effective than internet transfer. Data is encrypted in transit for security. Snowball Edge also provides compute capabilities for edge data processing.",
      "S3 Transfer Acceleration speeds up uploads to S3 using CloudFront edge locations, but for hundreds of TB, Snowball is more cost-effective."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/snowball/latest/ug/whatissnowball.html", title: "What is AWS Snowball?" }
    ]
  },
  {
    id: 37,
    question: "A company has an application running on Amazon EC2 instances that regularly reads large amounts of data from an Amazon DynamoDB table. The frequent read operations are driving up DynamoDB costs. The company wants to reduce costs while maintaining performance.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Switch DynamoDB from provisioned capacity mode to on-demand mode.",
      "Create a DynamoDB Global Secondary Index (GSI).",
      "Use DynamoDB Accelerator (DAX) to cache read operations.",
      "Use Amazon ElastiCache for Redis to cache DynamoDB data."
    ],
    correctAnswer: 2,
    category: "Database",
    explanation: "DynamoDB Accelerator (DAX) is an in-memory cache purpose-built for DynamoDB. Caching frequently read data dramatically reduces read latency and decreases the number of read requests to DynamoDB.",
    optionExplanations: [
      "On-demand mode is suitable for unpredictable workloads, but for frequent reads, provisioned capacity mode is more cost-effective. Using DAX achieves both cost reduction and performance improvement.",
      "A GSI is used to query with different keys but does not directly reduce read costs. DAX is more effective for improving read performance and reducing costs.",
      "✓ Correct: DynamoDB Accelerator (DAX) is a fully managed, in-memory cache purpose-built for DynamoDB. Caching frequently read data reduces read latency to microseconds and dramatically decreases the number of read requests to DynamoDB. This reduces consumption of provisioned read capacity units (RCUs) and lowers costs. DAX is fully compatible with DynamoDB and requires minimal application code changes.",
      "Using ElastiCache for Redis to cache DynamoDB data is possible, but DAX is purpose-built for DynamoDB, easier to integrate, and simpler to manage."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html", title: "In-memory acceleration with DynamoDB Accelerator (DAX)" }
    ]
  },
  {
    id: 38,
    question: "A company has a web application running on Amazon EC2 instances. The application processes images uploaded by users and stores them in Amazon S3. Image processing takes a long time, requiring users to wait until processing is complete. The company wants to perform image processing asynchronously to improve user experience.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use an Amazon SQS queue to enqueue image processing tasks and process them on separate EC2 instances.",
      "Use AWS Step Functions to manage the image processing workflow.",
      "Use Amazon Kinesis to stream image processing tasks.",
      "Use AWS Batch to run image processing jobs."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "Using an Amazon SQS queue allows image processing tasks to be handled asynchronously. The web application enqueues processing tasks and immediately returns a response to the user. Separate EC2 worker instances pick up tasks from the queue and process the images.",
    optionExplanations: [
      "✓ Correct: Amazon SQS is a fully managed message queuing service. When a user uploads an image, the web application adds the processing task to an SQS queue and immediately returns a response. Separate EC2 worker instances retrieve tasks from the queue, process the images, and save them to S3. This makes image processing asynchronous so users no longer need to wait. SQS guarantees message delivery, is scalable, and is cost-efficient. Auto Scaling can automatically adjust the number of worker instances based on queue length.",
      "Step Functions is well-suited for managing complex workflows, but SQS is more appropriate for simple asynchronous processing.",
      "Kinesis is used for real-time streaming data processing, but SQS is more appropriate for asynchronous tasks such as image processing.",
      "AWS Batch is suited for large-scale batch processing jobs, but SQS is more appropriate for simple asynchronous processing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html", title: "What is Amazon Simple Queue Service?" }
    ]
  },
  {
    id: 39,
    question: "A company has an application running on Amazon EC2 instances. The application periodically calls an external API to retrieve data, but requests sometimes fail due to API rate limiting. The company wants to reduce request failures and improve application reliability.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use an AWS Lambda function to call the API.",
      "Use Amazon API Gateway to proxy API requests.",
      "Implement exponential backoff with jitter to improve the retry logic.",
      "Use an Amazon SQS queue to buffer API requests."
    ],
    correctAnswer: 2,
    category: "Application Integration",
    explanation: "Implementing exponential backoff with jitter gradually increases retry intervals and adds random delays to reduce request collisions, addressing API rate limiting.",
    optionExplanations: [
      "Using a Lambda function is possible, but implementing exponential backoff with jitter is easier to apply to an existing application and is more effective.",
      "API Gateway can be used to manage API requests, but exponential backoff with jitter is more appropriate for dealing with external API rate limiting.",
      "✓ Correct: Exponential backoff with jitter is a best practice for improving retry logic. Exponential backoff gradually increases retry intervals (e.g., 1s, 2s, 4s, 8s) to reduce load on the API. Jitter adds random delays to retry intervals to reduce collisions when multiple clients retry simultaneously. This handles API rate limiting and improves request success rates. The AWS SDK implements exponential backoff and jitter by default.",
      "Using an SQS queue to buffer API requests is possible, but exponential backoff with jitter is simpler and easier to apply to an existing application."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/general/latest/gr/api-retries.html", title: "Error retries and exponential backoff in AWS" }
    ]
  },
  {
    id: 40,
    question: "A company has a web application running on Amazon EC2 instances behind an Application Load Balancer (ALB), deployed across multiple Availability Zones. The company wants to improve security by blocking traffic from specific countries.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS WAF to configure geographic restriction rules.",
      "Use the ALB security group to block specific IP address ranges.",
      "Use Amazon CloudFront to configure geographic restrictions.",
      "Use Network ACLs to block specific IP address ranges."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Using AWS WAF to configure geographic restriction rules allows traffic from specific countries to be blocked. WAF integrates with the ALB and can filter traffic based on the country of origin of the request.",
    optionExplanations: [
      "✓ Correct: AWS WAF is a web application firewall that can be integrated with ALB, CloudFront, and API Gateway. Geographic match rules (Geo Match) can block or allow traffic from specific countries. WAF determines the country from the request's source IP address and filters traffic according to the rules. Geographic rules are easy to configure and can specify multiple countries. WAF also provides other security rules such as SQL injection protection, XSS protection, and rate limiting.",
      "Security groups provide IP address-based access control, but manually managing IP address ranges for each country is difficult. WAF is more appropriate for geographic restrictions.",
      "CloudFront can configure geographic restrictions, but it must be placed in front of the ALB. For an existing ALB-based architecture, using WAF directly is simpler.",
      "Network ACLs provide subnet-level access control, but manually managing country IP ranges is difficult. WAF is more appropriate for geographic restrictions."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-geo-match.html", title: "Geographic match rule statement" }
    ]
  },
  {
    id: 41,
    question: "A company uses an Amazon Aurora MySQL database. The company wants to distribute read-only queries to improve database performance. It also wants to ensure high availability in case the primary instance fails.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Create Aurora Replicas and route read-only queries to the replicas.",
      "Create an Amazon RDS Read Replica.",
      "Use Amazon ElastiCache for Redis to cache query results.",
      "Increase the database instance type."
    ],
    correctAnswer: 0,
    category: "Database",
    explanation: "Creating Aurora Replicas distributes read-only queries and reduces the load on the primary instance. If the primary instance fails, an Aurora Replica automatically promotes to primary, ensuring high availability.",
    optionExplanations: [
      "✓ Correct: Aurora Replicas are read-only instances within an Aurora cluster. Routing read-only queries to replicas reduces the load on the primary instance and improves performance. Aurora supports up to 15 replicas and automatically distributes read traffic. If the primary instance fails, an Aurora Replica automatically promotes to primary (typically within 30 seconds), ensuring high availability. Aurora Replicas share the same storage volume as the primary instance, resulting in very low replication latency.",
      "RDS Read Replicas are used with standard RDS, but for Aurora, Aurora Replicas are faster and support automatic failover.",
      "Caching query results with ElastiCache is possible, but Aurora Replicas provide read scaling and high availability at the database level.",
      "Increasing the instance type is vertical scaling, but using Aurora Replicas achieves performance improvement more efficiently through horizontal scaling."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html", title: "Replication with Amazon Aurora" }
    ]
  },
  {
    id: 42,
    question: "A company has a static website stored in an Amazon S3 bucket. The company wants to improve website performance, deliver content to global users with low latency, and enable HTTPS.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Enable S3 Transfer Acceleration.",
      "Use Amazon Route 53 latency-based routing.",
      "Create an Amazon CloudFront distribution with the S3 bucket as the origin.",
      "Create S3 buckets in multiple Regions and configure cross-region replication."
    ],
    correctAnswer: 2,
    category: "Networking",
    explanation: "Creating an Amazon CloudFront distribution with the S3 bucket as the origin delivers content from global edge locations, achieving low latency. CloudFront also integrates with AWS Certificate Manager (ACM), making it easy to enable HTTPS.",
    optionExplanations: [
      "S3 Transfer Acceleration speeds up uploads to S3 but CloudFront is more appropriate for downloads (content delivery).",
      "Route 53 latency-based routing is used for DNS-level routing, but CloudFront achieves better performance through content caching at edge locations.",
      "✓ Correct: Amazon CloudFront is a global content delivery network (CDN) service. Creating a CloudFront distribution with the S3 bucket as the origin delivers content from edge locations around the world. Content is served from the edge location closest to the user, significantly reducing latency. CloudFront integrates with AWS Certificate Manager (ACM) to easily enable HTTPS with free SSL/TLS certificates. CloudFront caches content and reduces direct access to S3, also lowering costs.",
      "Cross-region replication copies data to multiple Regions, but CloudFront is more efficient through content delivery from global edge locations."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html", title: "What is Amazon CloudFront?" }
    ]
  },
  {
    id: 43,
    question: "A company has an application running on Amazon EC2 instances that regularly uploads large amounts of data to Amazon S3. Network errors sometimes occur during uploads. The company wants to improve upload reliability.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS DataSync.",
      "Use S3 multipart upload.",
      "Use AWS Storage Gateway.",
      "Use Amazon EFS to temporarily store data."
    ],
    correctAnswer: 1,
    category: "Storage",
    explanation: "Using S3 multipart upload allows large files to be split into multiple parts and uploaded individually. If a network error occurs, only the failed parts need to be re-uploaded, improving reliability.",
    optionExplanations: [
      "DataSync automates data transfer between on-premises and AWS, but S3 multipart upload is more appropriate for EC2-to-S3 uploads.",
      "✓ Correct: S3 multipart upload splits large files (100 MB or more recommended) into multiple parts for independent upload. Each part is uploaded independently, and parallel uploads improve performance. If a network error occurs, only the failed parts need to be re-uploaded, dramatically improving reliability. If the network is disconnected during upload, already-uploaded parts are retained and the upload can be resumed later. The AWS SDK handles multipart uploads automatically.",
      "Storage Gateway is a hybrid storage solution between on-premises and AWS and is not needed for EC2-to-S3 uploads.",
      "Temporarily storing data in EFS is possible, but multipart upload is simpler and more efficient because it uploads directly to S3."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html", title: "Uploading and copying objects using multipart upload" }
    ]
  },
  {
    id: 44,
    question: "A company has an application running on Amazon EC2 instances that processes sensitive data. Compliance requirements mandate that all network traffic must be encrypted. The company wants to encrypt communication between EC2 instances within the VPC.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Implement TLS/SSL encryption at the application level.",
      "Use AWS PrivateLink.",
      "Use VPC Endpoints.",
      "Use a VPN connection."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Implementing TLS/SSL encryption at the application level encrypts communication between EC2 instances within the VPC, providing end-to-end encryption and satisfying compliance requirements.",
    optionExplanations: [
      "✓ Correct: Implementing TLS/SSL encryption at the application level encrypts communication between EC2 instances within the VPC. Applications communicate using HTTPS, TLS, or SSL to achieve end-to-end encryption. This protects sensitive data even if it is intercepted at the network level, and satisfies compliance requirements. AWS Certificate Manager (ACM) can be used to manage TLS/SSL certificates.",
      "AWS PrivateLink provides private connectivity between a VPC and AWS services or other VPCs, but is not used to encrypt communication between EC2 instances within the same VPC.",
      "VPC Endpoints provide private connectivity between a VPC and AWS services, but are not used to encrypt communication between EC2 instances.",
      "VPN connections provide encrypted connectivity between on-premises and a VPC, but are not used for communication between EC2 instances within the VPC."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/whitepapers/latest/logical-separation/encrypting-data-at-rest-and-in-transit.html", title: "Encrypting data at rest and in transit" }
    ]
  },
  {
    id: 45,
    question: "A company uses an Amazon RDS for PostgreSQL database. The company wants to minimize downtime during maintenance windows and improve database performance.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Enable RDS Multi-AZ deployment.",
      "Create an RDS read replica.",
      "Migrate to Amazon Aurora.",
      "Increase the RDS instance type."
    ],
    correctAnswer: 2,
    category: "Database",
    explanation: "Migrating to Amazon Aurora minimizes downtime during maintenance windows and improves performance. Aurora is a database engine optimized for high availability and performance.",
    optionExplanations: [
      "Multi-AZ deployment provides high availability, but during maintenance windows the primary instance fails over to the standby, causing brief downtime. Aurora minimizes this downtime.",
      "Read replicas provide read scaling, but have limited effect on reducing downtime during maintenance windows.",
      "✓ Correct: Amazon Aurora is a cloud-native relational database engine compatible with MySQL and PostgreSQL. Aurora is up to 5x faster (MySQL) or 3x faster (PostgreSQL) than standard RDS and is optimized for high availability and performance. During maintenance windows, Aurora uses rolling updates to sequentially update Aurora Replicas, minimizing downtime (typically seconds). Aurora also supports automated backups, point-in-time recovery, and automatic failover.",
      "Increasing the instance type can improve performance but has no effect on reducing downtime during maintenance windows."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html", title: "What is Amazon Aurora?" }
    ]
  },
  {
    id: 46,
    question: "A company has a web application running on Amazon EC2 instances. The application stores files uploaded by users in Amazon S3. The company wants to automatically run a virus scan after files are uploaded.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use an Amazon SQS queue to enqueue virus scan tasks.",
      "Use Amazon EventBridge to capture S3 events and trigger a Lambda function.",
      "Use AWS Step Functions to manage the virus scanning workflow.",
      "Use S3 event notifications to trigger a Lambda function to run the virus scan."
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "Using S3 event notifications to automatically trigger a Lambda function when a file is uploaded allows virus scans to run in real time, ensuring security.",
    optionExplanations: [
      "Using an SQS queue is possible, but S3 event notifications with Lambda are simpler and can run scans automatically in real time.",
      "Using EventBridge to capture S3 events is possible, but S3 event notifications are directly integrated with S3 and are simpler.",
      "Step Functions is well-suited for complex workflow management, but S3 event notifications with Lambda are more appropriate for simple virus scanning.",
      "✓ Correct: S3 event notifications automatically send notifications when objects are created, deleted, or modified in an S3 bucket. You can configure them to trigger a Lambda function when a file is uploaded (s3:ObjectCreated:* event). The Lambda function can scan the file using virus scanning software (e.g., ClamAV) and delete or quarantine the file if an infection is detected. This approach runs virus scans automatically in real time and is simple and efficient."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html", title: "Amazon S3 Event Notifications" }
    ]
  },
  {
    id: 47,
    question: "A company has an application running on Amazon EC2 instances that periodically writes data to an Amazon DynamoDB table, but write throughput is sometimes insufficient. The company wants to improve write throughput while minimizing costs.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Increase the write capacity units (WCU) in DynamoDB provisioned capacity mode.",
      "Enable DynamoDB Auto Scaling.",
      "Switch to DynamoDB on-demand mode.",
      "Create a DynamoDB Global Table."
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "Enabling DynamoDB Auto Scaling automatically adjusts capacity in response to traffic fluctuations, improving write throughput while minimizing costs.",
    optionExplanations: [
      "Manually increasing WCU is possible, but Auto Scaling automatically adjusts capacity based on traffic variations and is more cost-efficient.",
      "✓ Correct: DynamoDB Auto Scaling automatically adjusts read capacity units (RCU) and write capacity units (WCU) in response to traffic fluctuations. Setting a target utilization (e.g., 70%) causes Auto Scaling to automatically increase or decrease capacity to keep actual utilization near the target. When write throughput is insufficient, Auto Scaling automatically increases WCU; when traffic decreases, it reduces WCU to lower costs. This maintains performance while minimizing costs.",
      "On-demand mode is suitable for unpredictable workloads, but for regular writes, provisioned capacity mode with Auto Scaling is more cost-efficient.",
      "Global Tables replicate data across multiple Regions but do not directly contribute to improving write throughput."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html", title: "Managing throughput capacity automatically with DynamoDB auto scaling" }
    ]
  },
  {
    id: 48,
    question: "A company has an application running on Amazon EC2 instances that periodically runs batch processing jobs. The jobs take a long time and costs are high. The company wants to reduce costs while running jobs efficiently.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use EC2 Spot Instances.",
      "Use EC2 Reserved Instances.",
      "Use an AWS Lambda function to run the jobs.",
      "Use AWS Batch to run jobs on Spot Instances."
    ],
    correctAnswer: 3,
    category: "Compute",
    explanation: "Using AWS Batch to run jobs on Spot Instances can significantly reduce costs. AWS Batch automates batch job execution and efficiently manages Spot Instances.",
    optionExplanations: [
      "Using Spot Instances directly is possible, but AWS Batch automates job management and efficient use of Spot Instances.",
      "Reserved Instances provide cost savings for long-term use, but Spot Instances are more appropriate for intermittent workloads such as batch processing jobs.",
      "Lambda functions are suitable for short-duration processing, but AWS Batch is more appropriate for long-running batch jobs (Lambda has a maximum execution time of 15 minutes).",
      "✓ Correct: AWS Batch is a fully managed service that automates batch job execution. It automatically manages job scheduling, resource provisioning, and job execution. Configuring it to use Spot Instances can reduce costs by up to 90% compared to On-Demand Instances. AWS Batch automatically retries jobs if Spot Instances are interrupted, ensuring reliability. Job priorities, dependencies, and retry logic can also be configured."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html", title: "What is AWS Batch?" }
    ]
  },
  {
    id: 49,
    question: "A company has a web application running on Amazon EC2 instances. The application processes users' personal information and must comply with regulations such as GDPR. The company wants to store users' personal information encrypted.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Amazon S3 server-side encryption (SSE-S3).",
      "Implement encryption at the application level.",
      "Use AWS Key Management Service (KMS) with a customer managed key for encryption.",
      "Enable Amazon EBS encryption."
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "Using AWS KMS with a customer managed key provides full control over encryption key management and satisfies compliance requirements. KMS provides key rotation, access control, and audit logging.",
    optionExplanations: [
      "SSE-S3 provides encryption with AWS-managed keys, but customer managed keys provide full control over key management and are easier to meet compliance requirements.",
      "Implementing encryption at the application level is possible, but KMS automates key management, is integrated with AWS services, and is easier to manage.",
      "✓ Correct: AWS Key Management Service (KMS) is a fully managed service for creating and managing encryption keys. Using a customer managed key (CMK) provides full control over encryption key management. KMS provides key rotation, fine-grained access control (IAM policies and key policies), and audit logging (CloudTrail). Many AWS services including S3, EBS, RDS, and DynamoDB integrate with KMS for data encryption. Key management and auditing are critical for meeting compliance requirements such as GDPR.",
      "EBS encryption provides disk-level encryption, but if data in other storage services such as S3 and RDS also needs to be encrypted, KMS allows centralized key management."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/overview.html", title: "What is AWS Key Management Service?" }
    ]
  },
  {
    id: 50,
    question: "A company has an application running on Amazon EC2 instances that periodically reads data from Amazon S3. The high number of S3 requests is driving up costs. The company wants to reduce costs while maintaining performance.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Amazon CloudFront to cache S3 content.",
      "Use the S3 Intelligent-Tiering storage class.",
      "Use Amazon ElastiCache for Redis to cache S3 data.",
      "Increase the S3 request rate limit."
    ],
    correctAnswer: 2,
    category: "Database",
    explanation: "Using Amazon ElastiCache for Redis to cache S3 data reduces the number of requests to S3 and lowers costs. Reading data from the cache also reduces latency and improves performance.",
    optionExplanations: [
      "CloudFront is suitable for caching static content, but if the application reads data dynamically from S3, ElastiCache provides more flexible cache management.",
      "S3 Intelligent-Tiering automatically transitions storage classes based on access patterns but does not directly contribute to reducing the number of requests.",
      "✓ Correct: Amazon ElastiCache for Redis is an in-memory data store ideal for caching frequently accessed data. The application first attempts to read data from ElastiCache, and only reads from S3 if the data is not in the cache. This significantly reduces the number of S3 requests and lowers S3 request fees. Reading from ElastiCache also dramatically reduces latency (from milliseconds to microseconds), improving performance. Setting a TTL (Time To Live) on the cache manages data freshness.",
      "Increasing the S3 request rate limit can improve throughput but does not reduce costs. Using ElastiCache achieves both cost reduction and performance improvement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/elasticache-use-cases.html", title: "Common ElastiCache use cases and how ElastiCache can help" }
    ]
  },
  {
    id: 51,
    question: "A company has a legacy application running on Amazon EC2 instances. Due to licensing constraints, the application must run on a specific physical server. The company wants to run this application on AWS.\n\nWhich EC2 instance tenancy option should a solutions architect recommend to meet these requirements?",
    options: [
      "Default tenancy",
      "Dedicated Host",
      "Dedicated Tenancy",
      "Spot Instance"
    ],
    correctAnswer: 1,
    category: "Compute",
    explanation: "Using a Dedicated Host allows instances to run on a specific physical server, satisfying licensing constraints. Dedicated Hosts provide visibility into sockets, cores, and host IDs, and allow existing server-bound software licenses to be used.",
    optionExplanations: [
      "Default tenancy shares physical hardware with other customers, so it cannot satisfy licensing constraints.",
      "✓ Correct: A Dedicated Host is a physical server dedicated to a customer, with full control over EC2 instance placement. It provides visibility into sockets, cores, and host IDs, allowing existing server-bound software licenses (Windows Server, SQL Server, SUSE, etc.) to be used. It satisfies license requirements that mandate running instances on a specific physical server, and can also be used to meet compliance and regulatory requirements.",
      "Dedicated Tenancy runs instances on a dedicated physical server, but a specific server cannot be designated. Dedicated Hosts are more appropriate for license management.",
      "Spot Instances are suitable for cost reduction, but cannot satisfy licensing constraints or the requirement to run on a specific physical server."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html", title: "Dedicated Hosts" }
    ]
  },
  {
    id: 52,
    question: "A company uses Amazon Athena to analyze large amounts of log data stored in an Amazon S3 bucket. The company wants to convert data to an optimal format to improve query performance and reduce costs.\n\nWhich data format should a solutions architect recommend to meet these requirements?",
    options: [
      "CSV",
      "Apache Parquet",
      "JSON",
      "XML"
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "Apache Parquet is a columnar data format that dramatically improves Athena query performance and reduces costs by minimizing the amount of data scanned. It also has high compression efficiency, reducing storage costs.",
    optionExplanations: [
      "CSV is a simple, readable format, but it is not columnar, resulting in lower Athena query performance and more data scanned.",
      "✓ Correct: Apache Parquet is a columnar data format that dramatically improves Athena query performance. The columnar format means only the columns needed by a query are scanned, significantly reducing the amount of data scanned and lowering query time and costs. Parquet also has high compression efficiency, reducing storage costs. Athena is optimized for Parquet format data and can execute queries up to 10x faster than with CSV or JSON.",
      "JSON is a flexible format, but it is not columnar, resulting in lower Athena query performance and lower compression efficiency.",
      "XML is a verbose format that results in lower Athena query performance and higher storage costs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html", title: "Columnar storage formats" }
    ]
  },
  {
    id: 53,
    question: "A company has a web application running on Amazon EC2 instances. The application periodically writes data to an Amazon DynamoDB table, but write throughput is sometimes insufficient. The company wants to automatically adjust DynamoDB capacity.\n\nWhich DynamoDB feature should a solutions architect recommend to meet these requirements?",
    options: [
      "DynamoDB Auto Scaling",
      "On-demand capacity mode",
      "Provisioned capacity mode",
      "DynamoDB Accelerator (DAX)"
    ],
    correctAnswer: 0,
    category: "Database",
    explanation: "Using DynamoDB Auto Scaling automatically adjusts read capacity units (RCU) and write capacity units (WCU) in response to traffic fluctuations, maintaining performance while optimizing costs.",
    optionExplanations: [
      "✓ Correct: DynamoDB Auto Scaling automatically adjusts RCU and WCU in response to traffic fluctuations. Setting a target utilization (e.g., 70%) causes Auto Scaling to automatically increase or decrease capacity to keep actual utilization near the target. When write throughput is insufficient, Auto Scaling automatically increases WCU; when traffic decreases, it reduces WCU to lower costs. This maintains performance while optimizing costs.",
      "On-demand capacity mode scales automatically, but for predictable workloads, provisioned capacity mode with Auto Scaling is more cost-efficient.",
      "Provisioned capacity mode requires manually setting capacity and does not support automatic adjustment.",
      "DAX is an in-memory cache purpose-built for DynamoDB that improves read performance, but is not used for automatic adjustment of write throughput."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html", title: "Managing throughput capacity automatically with DynamoDB auto scaling" }
    ]
  },
  {
    id: 54,
    question: "A company has an application running on Amazon EC2 instances. The application needs to access sensitive files stored in an Amazon S3 bucket. The company wants to manage access using an IAM role, but restrict access to only a specific S3 bucket.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Attach an IAM role to the EC2 instances and grant full access to S3.",
      "Store AWS access keys and secret keys on the EC2 instances.",
      "Use an S3 bucket policy to allow access from all EC2 instances.",
      "Attach an IAM role to the EC2 instances and configure a policy that allows access only to the specific S3 bucket."
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "Attaching an IAM role to EC2 instances and configuring a policy that allows access only to a specific S3 bucket implements secure access control based on the principle of least privilege.",
    optionExplanations: [
      "Granting full access to S3 violates the principle of least privilege and increases security risk. Access should be restricted to only the specific bucket.",
      "Storing AWS access keys and secret keys on EC2 instances is a high security risk. Using an IAM role is more secure.",
      "Using an S3 bucket policy to allow access from all EC2 instances is a high security risk. Access should be restricted to specific instances only.",
      "✓ Correct: Attaching an IAM role to EC2 instances and configuring a policy that allows access only to a specific S3 bucket implements secure access control based on the principle of least privilege. Use the Resource element in the IAM policy to specify the specific bucket (e.g., arn:aws:s3:::my-bucket/*) and the Action element to allow only necessary operations (e.g., s3:GetObject, s3:PutObject). Using an IAM role eliminates the need to manage access keys, improving security."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html", title: "Using an IAM role to grant permissions to applications running on Amazon EC2 instances" }
    ]
  },
  {
    id: 55,
    question: "A company uses an Amazon RDS for PostgreSQL database. The company wants to monitor database performance, identify slow queries, and optimize them. The company also wants to visualize database load.\n\nWhich AWS service should a solutions architect recommend to meet these requirements?",
    options: [
      "Amazon RDS Performance Insights",
      "AWS CloudTrail",
      "Amazon CloudWatch Logs",
      "Amazon QuickSight"
    ],
    correctAnswer: 0,
    category: "Database",
    explanation: "Amazon RDS Performance Insights is a tool for monitoring database performance and identifying slow queries and resource bottlenecks. It visualizes database load and makes it easy to see which queries consume the most resources.",
    optionExplanations: [
      "✓ Correct: Amazon RDS Performance Insights monitors and optimizes database performance. It visualizes database load over time and identifies which queries consume the most CPU, I/O, and memory. Slow query SQL statements, execution times, and wait events can be analyzed in detail to quickly pinpoint performance bottlenecks. The intuitive dashboard retains performance data for up to 7 days (free) or up to 2 years (paid).",
      "CloudTrail records audit logs of AWS API calls and is not used for database performance monitoring.",
      "CloudWatch Logs is used for collecting and analyzing log data, but Performance Insights is specialized for database performance monitoring and provides more detailed information.",
      "QuickSight is a business intelligence and data visualization service, but Performance Insights is more appropriate for database performance monitoring."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.html", title: "Monitoring DB load with Performance Insights on Amazon RDS" }
    ]
  },
  {
    id: 56,
    question: "A company has a web application running on Amazon EC2 instances. The application processes images uploaded by users and stores them in Amazon S3. Image processing takes a long time, requiring users to wait until processing is complete. The company wants to perform image processing asynchronously to improve user experience.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS Step Functions to manage the image processing workflow.",
      "Use an Amazon SQS queue to enqueue image processing tasks and process them on separate EC2 instances.",
      "Use Amazon Kinesis to stream image processing tasks.",
      "Use AWS Batch to run image processing jobs."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "Using an Amazon SQS queue allows image processing tasks to be handled asynchronously. The web application enqueues tasks and immediately returns a response to the user. Separate EC2 worker instances pick up tasks from the queue and process the images.",
    optionExplanations: [
      "Step Functions is well-suited for managing complex workflows, but SQS is more appropriate for simple asynchronous processing.",
      "✓ Correct: Amazon SQS is a fully managed message queuing service. When a user uploads an image, the web application adds the processing task to an SQS queue and immediately returns a response. Separate EC2 worker instances retrieve tasks from the queue, process the images, and save them to S3. This makes image processing asynchronous so users no longer need to wait. SQS guarantees message delivery, is scalable, and is cost-efficient. Auto Scaling can automatically adjust the number of worker instances based on queue length.",
      "Kinesis is used for real-time streaming data processing, but SQS is more appropriate for asynchronous tasks such as image processing.",
      "AWS Batch is suited for large-scale batch processing jobs, but SQS is more appropriate for simple asynchronous processing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html", title: "What is Amazon Simple Queue Service?" }
    ]
  },
  {
    id: 57,
    question: "A company has an application running in an Amazon VPC. The application needs to receive traffic from the internet, but the application servers are in private subnets. The company wants to receive internet traffic without directly exposing the application servers to the internet.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Move the application servers to a public subnet.",
      "Use a NAT gateway to route internet traffic to the application servers.",
      "Place an Application Load Balancer (ALB) in a public subnet and register the application servers as targets.",
      "Attach an internet gateway to the private subnet."
    ],
    correctAnswer: 2,
    category: "Networking",
    explanation: "Placing an Application Load Balancer (ALB) in a public subnet and registering the private subnet application servers as targets allows internet traffic to be received without directly exposing the application servers to the internet.",
    optionExplanations: [
      "Moving the application servers to a public subnet increases security risk. Keeping them in a private subnet and using an ALB is more secure.",
      "A NAT gateway allows outbound internet traffic from instances in private subnets, but is not used for inbound traffic from the internet.",
      "✓ Correct: Placing an ALB in a public subnet and registering the private subnet application servers as targets allows internet traffic to be received without directly exposing the application servers. The ALB receives traffic from the internet and forwards it to the application servers in the private subnet. This improves application server security and protects against threats such as DDoS attacks. The ALB also provides advanced features such as SSL/TLS termination, path-based routing, and health checks.",
      "An internet gateway is attached at the VPC level and cannot be attached to a specific subnet. Attaching an internet gateway to a private subnet also violates security best practices."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html", title: "What is an Application Load Balancer?" }
    ]
  },
  {
    id: 58,
    question: "A company wants to load large amounts of data stored in an Amazon S3 bucket into an Amazon Redshift data warehouse. Data is added incrementally every day. The company wants to automate and run data loading efficiently.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS Glue ETL jobs to load data from S3 to Redshift.",
      "Use Amazon Kinesis Data Firehose to stream data from S3 to Redshift.",
      "Use an AWS Lambda function to load data from S3 to Redshift.",
      "Run Redshift COPY commands manually."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "Using AWS Glue ETL jobs automates and efficiently executes data loading from S3 to Redshift. Glue can also perform data transformation, cleansing, and enrichment, and can automatically run jobs on a schedule.",
    optionExplanations: [
      "✓ Correct: AWS Glue ETL jobs automate and efficiently execute data loading from S3 to Redshift. Glue is a serverless ETL (Extract, Transform, Load) service that automates data extraction, transformation, and loading. It uses the Data Catalog to automatically discover data schemas and makes it easy to create ETL jobs. Jobs can run automatically on a schedule, and incremental data loading is supported. It also performs data transformation, cleansing, and enrichment, optimizing loading into Redshift.",
      "Kinesis Data Firehose is well-suited for loading real-time streaming data into Redshift, but Glue is more appropriate for loading batch data already stored in S3.",
      "Using a Lambda function to load data is possible, but Glue is more specialized for ETL processing and easier to scale and manage.",
      "Running Redshift COPY commands manually is possible, but it is not automated and increases operational burden. Using Glue achieves automation and efficiency."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html", title: "What is AWS Glue?" }
    ]
  },
  {
    id: 59,
    question: "A company has an application running on Amazon EC2 instances. The application periodically calls an external API to retrieve data, but requests sometimes fail due to API rate limiting. The company wants to reduce request failures and improve application reliability.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use an AWS Lambda function to call the API.",
      "Implement exponential backoff with jitter to improve the retry logic.",
      "Use Amazon API Gateway to proxy API requests.",
      "Use an Amazon SQS queue to buffer API requests."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "Implementing exponential backoff with jitter gradually increases retry intervals and adds random delays to reduce request collisions, addressing API rate limiting.",
    optionExplanations: [
      "Using a Lambda function is possible, but implementing exponential backoff with jitter is easier to apply to an existing application and is more effective.",
      "✓ Correct: Exponential backoff with jitter is a best practice for improving retry logic. Exponential backoff gradually increases retry intervals (e.g., 1s, 2s, 4s, 8s) to reduce load on the API. Jitter adds random delays to retry intervals to reduce collisions when multiple clients retry simultaneously. This handles API rate limiting and improves request success rates. The AWS SDK implements exponential backoff and jitter by default.",
      "API Gateway can be used to manage API requests, but exponential backoff with jitter is more appropriate for dealing with external API rate limiting.",
      "Using an SQS queue to buffer API requests is possible, but exponential backoff with jitter is simpler and easier to apply to an existing application."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/general/latest/gr/api-retries.html", title: "Error retries and exponential backoff in AWS" }
    ]
  },
  {
    id: 60,
    question: "A company has a web application running on Amazon EC2 instances behind an Application Load Balancer (ALB), deployed across multiple Availability Zones. The company wants to improve security by blocking traffic from specific countries.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use the ALB security group to block specific IP address ranges.",
      "Use AWS WAF to configure geographic restriction rules.",
      "Use Amazon CloudFront to configure geographic restrictions.",
      "Use Network ACLs to block specific IP address ranges."
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "Using AWS WAF to configure geographic restriction rules allows traffic from specific countries to be blocked. WAF integrates with the ALB and can filter traffic based on the country of origin of the request.",
    optionExplanations: [
      "Security groups provide IP address-based access control, but manually managing IP address ranges for each country is difficult. WAF is more appropriate for geographic restrictions.",
      "✓ Correct: AWS WAF is a web application firewall that can be integrated with ALB, CloudFront, and API Gateway. Geographic match rules (Geo Match) can block or allow traffic from specific countries. WAF determines the country from the request's source IP address and filters traffic according to the rules. Geographic rules are easy to configure and can specify multiple countries. WAF also provides other security rules such as SQL injection protection, XSS protection, and rate limiting.",
      "CloudFront can configure geographic restrictions, but it must be placed in front of the ALB. For an existing ALB-based architecture, using WAF directly is simpler.",
      "Network ACLs provide subnet-level access control, but manually managing country IP ranges is difficult. WAF is more appropriate for geographic restrictions."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-geo-match.html", title: "Geographic match rule statement" }
    ]
  },
  {
    id: 61,
    question: "A company runs a containerized application on Amazon ECS on Fargate. The application uses environment variables that contain sensitive information. The company wants to manage environment variables securely and avoid embedding them directly in container definitions.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Write environment variables directly in the ECS task definition.",
      "Embed environment variables in the Docker image.",
      "Store environment variables in an S3 bucket and retrieve them at container startup.",
      "Use AWS Systems Manager Parameter Store to store environment variables and reference them from the ECS task definition."
    ],
    correctAnswer: 3,
    category: "Compute",
    explanation: "Using AWS Systems Manager Parameter Store allows environment variables to be stored securely and referenced from ECS task definitions. Parameter Store supports encryption and access control via IAM policies.",
    optionExplanations: [
      "Writing environment variables directly in the task definition is a security risk and can expose sensitive information.",
      "Embedding environment variables in a Docker image is a very high security risk — if the image is leaked, sensitive information is also exposed.",
      "Storing environment variables in an S3 bucket is possible, but Parameter Store is more specialized for managing sensitive information and easier to integrate with ECS.",
      "✓ Correct: AWS Systems Manager Parameter Store is a service for securely storing configuration data and sensitive information. Environment variables can be stored in Parameter Store and referenced from ECS task definitions using the valueFrom field. Parameter Store supports encryption using AWS KMS and access control via IAM policies. It also provides parameter versioning and change history. ECS automatically retrieves parameters from Parameter Store at task startup and sets them as environment variables. AWS Secrets Manager provides similar functionality, but Parameter Store has a free tier and is more cost-efficient."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-parameters.html", title: "Specifying sensitive data using Systems Manager Parameter Store" }
    ]
  },
  {
    id: 62,
    question: "A company uses an Amazon RDS for MySQL database. The company has enabled Multi-AZ deployment to improve database availability. During a database maintenance window, the primary instance fails over to the standby instance.\n\nHow does the application behave during the failover?",
    options: [
      "The application must manually change its connection to the standby instance endpoint.",
      "The application operates in read-only mode and write operations fail.",
      "All database operations fail until the failover is complete.",
      "The application automatically reconnects to the standby instance with minimal downtime."
    ],
    correctAnswer: 3,
    category: "Database",
    explanation: "In RDS Multi-AZ deployment, the DNS record is automatically updated during failover so the application can reconnect to the standby instance using the same endpoint. Downtime is typically 1-2 minutes.",
    optionExplanations: [
      "In Multi-AZ deployment, the DNS record is automatically updated so the application does not need to manually change the endpoint.",
      "After failover, the standby instance becomes primary and both read and write operations are available.",
      "The connection is temporarily interrupted during failover, but with proper retry logic implemented, not all operations will fail.",
      "✓ Correct: In RDS Multi-AZ deployment, the DNS record is automatically updated during failover so the application can reconnect to the standby instance using the same endpoint (e.g., mydb.abc123.us-east-1.rds.amazonaws.com). Failover is automatic and typically completes in 1-2 minutes. The application needs to detect the disconnection and attempt to reconnect, but the endpoint does not change. Implementing proper retry logic minimizes downtime."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html", title: "Multi-AZ DB instance deployments" }
    ]
  },
  {
    id: 63,
    question: "A company has a large number of image files stored in an Amazon S3 bucket. The images are displayed on a website, but loading them at their original size is slow. The company wants to automatically resize images and optimize them for different devices.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Trigger an AWS Lambda function with S3 event notifications to resize images.",
      "Run an image processing server on Amazon EC2 instances.",
      "Use Amazon CloudFront with Lambda@Edge to resize images at request time.",
      "Use AWS Batch to process images in batches."
    ],
    correctAnswer: 2,
    category: "Compute",
    explanation: "Using Amazon CloudFront with Lambda@Edge allows images to be dynamically resized at request time and optimized for different devices. Resized images are cached in CloudFront, improving performance.",
    optionExplanations: [
      "Triggering a Lambda function with S3 event notifications is possible, but all sizes must be pre-generated, increasing storage costs. Lambda@Edge is more efficient because it resizes images on demand.",
      "Running an image processing server on EC2 is possible, but it has high operational burden and low scalability. Lambda@Edge is serverless and scales automatically.",
      "✓ Correct: Using Amazon CloudFront with Lambda@Edge allows images to be dynamically resized at request time and optimized for different devices. Lambda@Edge functions run at CloudFront edge locations and can intercept and process viewer requests and origin responses. Based on the request's User-Agent header or query parameters, appropriately sized images can be generated and cached in CloudFront. This means only the original image needs to be stored in S3, reducing storage costs. Processing at edge locations also lowers latency and improves performance.",
      "AWS Batch is suited for large-scale batch processing, but Lambda@Edge is more appropriate for real-time image resizing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html", title: "Customizing at the edge with Lambda@Edge" }
    ]
  },
  {
    id: 64,
    question: "A company has an application running on Amazon EC2 instances that periodically reads data from an Amazon DynamoDB table, but read throughput is sometimes insufficient. The company wants to improve read performance and reduce the load on DynamoDB.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Increase the provisioned read capacity units (RCU) for DynamoDB.",
      "Use Amazon ElastiCache for Redis.",
      "Use Amazon DynamoDB Accelerator (DAX).",
      "Create a DynamoDB Global Secondary Index (GSI)."
    ],
    correctAnswer: 2,
    category: "Database",
    explanation: "Amazon DynamoDB Accelerator (DAX) is an in-memory cache purpose-built for DynamoDB that dramatically improves read performance and reduces the load on DynamoDB.",
    optionExplanations: [
      "Increasing RCU can improve read throughput, but costs increase. Using DAX optimizes both performance and cost.",
      "ElastiCache for Redis is also an effective caching solution, but DAX is purpose-built for DynamoDB, easier to integrate, and has higher compatibility with the DynamoDB API.",
      "✓ Correct: Amazon DynamoDB Accelerator (DAX) is a fully managed, in-memory cache purpose-built for DynamoDB. DAX sits in front of DynamoDB tables and caches frequently accessed data. On a cache hit, response times are reduced to microseconds, improving read performance by up to 10x. Read requests to DynamoDB are also reduced, decreasing RCU consumption and lowering costs. DAX is compatible with the DynamoDB API and requires minimal application code changes. The cluster automatically scales and provides high availability.",
      "A GSI is used to support different query patterns, but DAX is more effective for improving read performance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html", title: "In-memory acceleration with DynamoDB Accelerator (DAX)" }
    ]
  },
  {
    id: 65,
    question: "A company has an application running in an Amazon VPC. The application needs to access a database in an on-premises data center. The company wants to establish a secure, low-latency connection without traversing the internet.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use a VPN gateway to connect the VPC and the on-premises data center.",
      "Use VPC peering to connect the VPC and the on-premises data center.",
      "Use an internet gateway to connect over the public internet.",
      "Use AWS Direct Connect to establish a dedicated network connection."
    ],
    correctAnswer: 3,
    category: "Networking",
    explanation: "AWS Direct Connect establishes a dedicated network connection between an on-premises data center and AWS, providing a secure, low-latency connection without traversing the internet.",
    optionExplanations: [
      "A VPN gateway provides an encrypted connection over the internet, but Direct Connect offers lower latency and more stable bandwidth.",
      "VPC peering is used for connections between two VPCs within AWS and cannot be used to connect to an on-premises data center.",
      "Connecting over the public internet using an internet gateway presents security risks and results in higher latency.",
      "✓ Correct: AWS Direct Connect is a service that establishes a dedicated network connection between an on-premises data center and AWS. Direct Connect provides a private connection without traversing the internet, offering low network latency and stable bandwidth. You can choose a dedicated connection of 1 Gbps or 10 Gbps, or a hosted connection of 50 Mbps to 10 Gbps. Compared to VPN connections, Direct Connect provides higher bandwidth, lower latency, and more stable network performance. Data transfer costs can also be reduced. A Direct Connect Gateway can be used to connect to multiple VPCs and AWS accounts."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html", title: "What is AWS Direct Connect?" }
    ]
  },
  {
    id: 66,
    question: "A company uses Amazon Athena to analyze log files stored in an Amazon S3 bucket. Log files grow daily and query performance is degrading. The company wants to improve query performance and reduce costs.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Partition the data in the S3 bucket.",
      "Change the S3 bucket storage class to S3 Glacier.",
      "Cache Athena query results.",
      "Enable S3 bucket replication."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "Partitioning data in the S3 bucket reduces the amount of data Athena scans, improving query performance and reducing costs.",
    optionExplanations: [
      "✓ Correct: Partitioning data in the S3 bucket reduces the amount of data Athena scans, improving query performance and reducing costs. Partitions logically divide data into segments, typically based on columns such as date (year, month, day) or region. For example, log files are stored in a directory structure like s3://bucket/logs/year=2023/month=01/day=15/. Using a WHERE clause to specify a partition in a query (e.g., WHERE year='2023' AND month='01') causes Athena to scan only the relevant partitions, dramatically reducing query time and costs.",
      "S3 Glacier is archive storage and is not suitable for frequently accessed data. It does not affect Athena query performance.",
      "Athena automatically caches query results to S3, but partitioning is more effective for improving query performance.",
      "S3 replication improves data redundancy and availability but does not directly affect query performance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/partitions.html", title: "Partitioning data in Athena" }
    ]
  },
  {
    id: 67,
    question: "A company has a web application running on Amazon EC2 instances. The application stores files uploaded by users in an Amazon S3 bucket. The company wants to allow users to upload files directly to S3 to reduce the load on EC2 instances.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Make the S3 bucket publicly accessible.",
      "Distribute IAM user access keys to clients.",
      "Use S3 pre-signed URLs to grant temporary upload permissions.",
      "Use an S3 bucket policy to grant all users upload permissions."
    ],
    correctAnswer: 2,
    category: "Storage",
    explanation: "Using S3 pre-signed URLs grants users temporary upload permissions, allowing them to upload files directly to S3. This reduces the load on EC2 instances while maintaining security.",
    optionExplanations: [
      "Making the S3 bucket publicly accessible presents a very high security risk and allows anyone to upload files.",
      "Distributing IAM user access keys to clients presents a very high security risk and can result in the keys being exposed.",
      "✓ Correct: S3 pre-signed URLs are a secure way to grant temporary upload permissions. The application generates a pre-signed URL using the AWS SDK and returns it to the client. The client uses this URL to upload files directly to S3. The URL has an expiration time (e.g., 15 minutes) and becomes unusable after it expires. This allows users to upload files directly to S3 without going through EC2 instances, reducing EC2 load. IAM credentials do not need to be exposed to clients, maintaining security.",
      "Using an S3 bucket policy to grant all users upload permissions presents a high security risk and can allow unauthorized files to be uploaded."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html", title: "Uploading objects using presigned URLs" }
    ]
  },
  {
    id: 68,
    question: "A company has an application running on Amazon EC2 instances that regularly uploads large amounts of data to an Amazon S3 bucket. Internet data transfer costs are high. The company wants to reduce data transfer costs.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use S3 Transfer Acceleration.",
      "Use AWS Direct Connect.",
      "Use a VPC Gateway Endpoint for private connectivity to S3.",
      "Use Amazon CloudFront."
    ],
    correctAnswer: 2,
    category: "Networking",
    explanation: "Using a VPC Gateway Endpoint enables private connectivity from within the VPC to S3 without traversing the internet, reducing data transfer costs.",
    optionExplanations: [
      "S3 Transfer Acceleration speeds up long-distance data transfers but does not reduce data transfer costs — it actually incurs additional charges.",
      "Direct Connect is used for on-premises to AWS connectivity. A VPC Endpoint is more appropriate for reducing data transfer costs from EC2 to S3 within a VPC.",
      "✓ Correct: Using a VPC Gateway Endpoint enables private connectivity from within the VPC to S3 without traversing the internet. The Gateway Endpoint is added to the VPC route table and routes S3 traffic through the private network. This eliminates the need for a NAT gateway or internet gateway, reducing data transfer costs. Security is also improved as traffic is not exposed to the internet. Gateway Endpoints are free to use with no additional charges. Gateway Endpoints are available for S3 and DynamoDB.",
      "CloudFront is a content delivery network and is not used to reduce data upload costs to S3."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html", title: "Access Amazon S3 using an interface VPC endpoint" }
    ]
  },
  {
    id: 69,
    question: "A company uses an Amazon RDS for PostgreSQL database. The company wants to store database backups for a long period to meet compliance requirements. The maximum RDS automated backup retention period is 35 days, but the company needs to retain backups for one year.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Set the RDS automated backup retention period to one year.",
      "Use AWS Backup to manage backups.",
      "Manually create RDS snapshots and retain them for the required period.",
      "Export the database to Amazon S3."
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "Using AWS Backup enables centralized management of RDS database backups and long-term retention. Backup policies can be configured to automatically create backups and specify the retention period.",
    optionExplanations: [
      "The maximum RDS automated backup retention period is 35 days and cannot be set to one year.",
      "✓ Correct: AWS Backup is a fully managed service that centralizes backup management across AWS services. It automates backups for RDS, EBS, EFS, DynamoDB, Storage Gateway, and more, with flexible retention period settings. Backup policies (backup plans) can specify backup frequency (e.g., daily), retention period (e.g., one year), and backup windows. AWS Backup also supports backup lifecycle management, automatically deleting old backups or transitioning them to cold storage. Cross-region and cross-account backups are also supported, meeting disaster recovery and compliance requirements.",
      "Manually creating snapshots is possible, but AWS Backup makes backup management and automation easier.",
      "Exporting the database to S3 is possible, but AWS Backup is easier to manage for backup and restore and is optimized for RDS."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html", title: "What is AWS Backup?" }
    ]
  },
  {
    id: 70,
    question: "A company has a web application running on Amazon EC2 instances behind an Application Load Balancer (ALB), managed by an Auto Scaling group. The company wants to automate application deployments and minimize downtime.\n\nWhich deployment strategy should a solutions architect recommend to meet these requirements?",
    options: [
      "Update all instances to the new version simultaneously (all-at-once).",
      "Use a rolling deployment to update instances gradually.",
      "Use a canary deployment to deliver the new version to a subset of users.",
      "Use a blue/green deployment to create a new environment and switch traffic."
    ],
    correctAnswer: 3,
    category: "Compute",
    explanation: "Using a blue/green deployment creates a new environment (green), tests it, then switches the ALB target group to route traffic to the new environment. If issues arise, you can immediately revert to the original environment (blue), minimizing downtime.",
    optionExplanations: [
      "All-at-once deployment updates all instances simultaneously, causing downtime and making rollback difficult if issues arise.",
      "Rolling deployment updates instances gradually, reducing downtime, but blue/green deployment is easier to roll back and lower risk.",
      "Canary deployment delivers the new version to a subset of users and rolls out gradually, but blue/green deployment makes full rollback easier.",
      "✓ Correct: Blue/green deployment creates a new environment (green) and runs it in parallel with the existing environment (blue). After testing the new environment and confirming there are no issues, the ALB target group is switched to route traffic to the new environment. The switch is instantaneous with virtually zero downtime. If issues arise, you can immediately revert to the original environment, making rollback easy. AWS CodeDeploy supports blue/green deployments and can be integrated with Auto Scaling groups and ALBs. This strategy is low risk and ideal for production deployments."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/bluegreen-deployments.html", title: "Blue/green deployments" }
    ]
  },
  {
    id: 71,
    question: "A company has a static website stored in an Amazon S3 bucket. The website is accessed by users worldwide, but high latency is degrading user experience. The company wants to reduce latency and improve website performance.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Replicate the S3 bucket to multiple Regions.",
      "Enable S3 Transfer Acceleration.",
      "Create an Amazon CloudFront distribution with the S3 bucket as the origin.",
      "Use Amazon Route 53 latency-based routing."
    ],
    correctAnswer: 2,
    category: "Networking",
    explanation: "Creating an Amazon CloudFront distribution with the S3 bucket as the origin caches content at edge locations and delivers it to global users with low latency.",
    optionExplanations: [
      "Replicating the S3 bucket to multiple Regions is possible, but CloudFront achieves lower latency by leveraging global edge locations.",
      "S3 Transfer Acceleration speeds up uploads to S3. CloudFront is more appropriate for improving download speed.",
      "✓ Correct: Amazon CloudFront is a global content delivery network (CDN) service. Creating a CloudFront distribution with the S3 bucket as the origin caches content at more than 400 edge locations worldwide. Users retrieve content from the edge location closest to them, dramatically reducing latency. Direct requests to S3 are also reduced, lowering S3 costs. CloudFront also provides advanced features such as SSL/TLS, custom domains, access restrictions, and compression.",
      "Route 53 latency-based routing is effective when resources are in multiple Regions, but for a single S3 bucket, CloudFront is more effective."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html", title: "What is Amazon CloudFront?" }
    ]
  },
  {
    id: 72,
    question: "A company has an application running on Amazon EC2 instances. The application periodically retrieves and processes messages from an Amazon SQS queue. Processing takes time, and the message visibility timeout sometimes expires before processing is complete.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use the ChangeMessageVisibility API during processing to extend the visibility timeout.",
      "Increase the default visibility timeout for the SQS queue.",
      "Increase the SQS queue's receive wait time.",
      "Increase the SQS queue's message retention period."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "Using the ChangeMessageVisibility API during processing to extend the visibility timeout prevents the message from being delivered to other consumers, allowing processing to complete.",
    optionExplanations: [
      "✓ Correct: The visibility timeout is the period after a message is retrieved during which it is not visible to other consumers. If processing takes a long time, the ChangeMessageVisibility API can be used to extend the timeout before it expires. This prevents the message from being delivered to other consumers, allowing processing to complete. The timeout can be extended multiple times as processing progresses, up to a maximum of 12 hours. After processing is complete, the message is deleted using the DeleteMessage API.",
      "Increasing the default visibility timeout is possible, but it applies to all messages, reducing flexibility. Using ChangeMessageVisibility allows adjustment per individual message.",
      "Receive wait time is a long polling setting that improves message retrieval efficiency, but does not address the visibility timeout issue.",
      "Message retention period is how long a message is kept in the queue and is different from the visibility timeout."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html", title: "Amazon SQS visibility timeout" }
    ]
  },
  {
    id: 73,
    question: "A company uses an Amazon Aurora MySQL database cluster. The company has high read load and the primary instance performance is degrading. The company wants to distribute the read load and reduce the burden on the primary instance.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Increase the primary instance type.",
      "Use Amazon ElastiCache for Redis.",
      "Use DynamoDB Accelerator (DAX).",
      "Add Aurora Read Replicas and use the reader endpoint."
    ],
    correctAnswer: 3,
    category: "Database",
    explanation: "Adding Aurora Read Replicas and using the reader endpoint distributes read load across multiple replicas and reduces the burden on the primary instance.",
    optionExplanations: [
      "Increasing the primary instance type can improve performance, but using Read Replicas distributes read load more efficiently and is more cost-effective.",
      "ElastiCache for Redis is an effective caching solution, but Read Replicas are easier to integrate with Aurora and simpler to manage.",
      "DAX is a cache purpose-built for DynamoDB and cannot be used with Aurora.",
      "✓ Correct: Aurora Read Replicas are read-only instances that asynchronously replicate data from the primary instance. Up to 15 Read Replicas can be added to distribute read load. Aurora provides a reader endpoint that automatically load-balances to available Read Replicas when connected. This reduces the load on the primary instance and improves write performance. Read Replicas share the same storage as the primary instance, resulting in very low replication latency (typically less than 10 ms) and high data consistency."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html", title: "Replication with Amazon Aurora" }
    ]
  },
  {
    id: 74,
    question: "A company has an application running on Amazon EC2 instances that processes sensitive data. Compliance requirements mandate that all network traffic must be encrypted. The company wants to encrypt communication between EC2 instances.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Enable VPC flow logs.",
      "Configure TLS termination on a Network Load Balancer (NLB).",
      "Implement TLS/SSL at the application level.",
      "Use AWS PrivateLink."
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "Implementing TLS/SSL at the application level encrypts communication between EC2 instances end-to-end and satisfies compliance requirements.",
    optionExplanations: [
      "VPC flow logs record network traffic logs and are not used for encryption.",
      "Configuring TLS termination on an NLB is possible, but application-level implementation is required to encrypt direct communication between EC2 instances.",
      "✓ Correct: Implementing TLS/SSL at the application level encrypts communication between EC2 instances end-to-end. The application uses TLS/SSL protocols to encrypt data before sending and decrypt it on receipt, preventing the content from being read even if intercepted on the network. AWS Certificate Manager (ACM) can be used to manage SSL/TLS certificates. The application can also implement mutual TLS authentication to authenticate communicating parties. This satisfies compliance requirements and protects data confidentiality.",
      "AWS PrivateLink provides private connectivity between VPCs, but application-level implementation is required to encrypt communication between EC2 instances."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/data-protection.html", title: "Data protection in Amazon EC2" }
    ]
  },
  {
    id: 75,
    question: "A company has a large amount of data stored in Amazon S3. Data is stored in S3 Standard for the first 30 days when it is frequently accessed, but access frequency decreases after that. The company wants to reduce storage costs.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use the S3 Intelligent-Tiering storage class.",
      "Configure an S3 lifecycle policy to transition to S3 Glacier Flexible Retrieval after 30 days.",
      "Store all data in S3 One Zone-IA.",
      "Configure an S3 lifecycle policy to transition to S3 Standard-IA after 30 days."
    ],
    correctAnswer: 3,
    category: "Storage",
    explanation: "Configuring an S3 lifecycle policy to transition to S3 Standard-IA after 30 days reduces storage costs for infrequently accessed data.",
    optionExplanations: [
      "S3 Intelligent-Tiering automatically changes storage classes based on access patterns, but the minimum storage period is 30 days so it does not reduce costs for the first 30 days. It also incurs monitoring fees.",
      "S3 Glacier Flexible Retrieval is archive storage with slow retrieval times (minutes to hours). If data may still be accessed occasionally, S3 Standard-IA is more appropriate.",
      "S3 One Zone-IA stores data in a single Availability Zone, resulting in lower durability and is not suitable for important data. It also does not reduce costs for the first 30 days.",
      "✓ Correct: Configuring an S3 lifecycle policy to transition to S3 Standard-IA (Infrequent Access) after 30 days reduces storage costs for infrequently accessed data. S3 Standard-IA provides the same durability and availability as S3 Standard but costs approximately 45% less for storage. Data is immediately accessible, with a retrieval fee, but overall costs are reduced for infrequently accessed data. The lifecycle policy automatically transitions storage classes based on object creation or last access date."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html", title: "Transitioning objects using Amazon S3 Lifecycle" }
    ]
  },
  {
    id: 76,
    question: "A company has a web application running on Amazon EC2 instances. The application needs to store user session information. The company wants to share session information across multiple EC2 instances and ensure that session data is not lost when an instance is terminated.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Store session information in local storage on EC2 instances.",
      "Store session information in an Amazon EBS volume.",
      "Store session information in an Amazon S3 bucket.",
      "Use Amazon ElastiCache for Redis to store session information."
    ],
    correctAnswer: 3,
    category: "Database",
    explanation: "Using Amazon ElastiCache for Redis to store session information allows session data to be shared across multiple EC2 instances and accessed quickly.",
    optionExplanations: [
      "Storing session information in local storage on EC2 instances means session data is lost if the instance is terminated, and it cannot be shared across multiple instances.",
      "EBS volumes are attached to a single EC2 instance and cannot be shared across multiple instances.",
      "S3 is object storage and is not suitable for frequently accessed data such as session information. It has high latency and can be costly.",
      "✓ Correct: Amazon ElastiCache for Redis is an in-memory data store ideal for storing session information. Redis provides fast read/write performance and allows simultaneous access from multiple EC2 instances. Session data is stored in the Redis cluster and persists even when an instance is terminated. Redis supports TTL (time-to-live) settings to automatically expire old session data, and it supports replication and failover for high availability. ElastiCache is a fully managed service with automated patching, backups, and monitoring."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/elasticache-use-cases.html", title: "Amazon ElastiCache Use Cases" }
    ]
  },
  {
    id: 77,
    question: "A company has an application running on Amazon EC2 instances. The application periodically invokes AWS Lambda functions to perform data processing. The company wants to invoke Lambda functions asynchronously to reduce application response time.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Invoke the Lambda function synchronously and wait for the result.",
      "Invoke the Lambda function asynchronously and continue processing without waiting for the result.",
      "Use an Amazon SQS queue to trigger the Lambda function.",
      "Use AWS Step Functions to execute the Lambda function."
    ],
    correctAnswer: 1,
    category: "Compute",
    explanation: "Invoking Lambda functions asynchronously allows the application to continue processing without waiting for results, reducing response time.",
    optionExplanations: [
      "Invoking Lambda functions synchronously requires the application to wait for results, increasing response time.",
      "✓ Correct: Invoking Lambda functions asynchronously allows the application to continue processing without waiting for results, reducing response time. For asynchronous invocation, set the InvocationType parameter in the AWS SDK to Event. Lambda adds the request to a queue and immediately returns a 202 status code. The Lambda function runs in the background and results are not returned to the application. If an error occurs, Lambda automatically retries (up to 2 times). If you need to handle the result of an asynchronous invocation, Lambda Destinations can send the result to SQS, SNS, EventBridge, or another Lambda function on success or failure.",
      "Using an SQS queue to trigger a Lambda function is also a valid approach, but for simple asynchronous invocation, invoking directly is simpler.",
      "Step Functions is well-suited for managing complex workflows, but for simple asynchronous invocation, invoking directly is more appropriate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html", title: "Asynchronous invocation" }
    ]
  },
  {
    id: 78,
    question: "A company uses an Amazon RDS for PostgreSQL database. The company wants to cache read queries to improve database performance. When changes occur in the database, the cache should be automatically invalidated.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use an RDS Read Replica.",
      "Use Amazon RDS Proxy.",
      "Use Amazon ElastiCache for Redis and implement cache invalidation logic in the application.",
      "Use Amazon DynamoDB Accelerator (DAX)."
    ],
    correctAnswer: 2,
    category: "Database",
    explanation: "Using Amazon ElastiCache for Redis and implementing cache invalidation logic in the application allows read queries to be cached and the cache to be invalidated when changes occur in the database.",
    optionExplanations: [
      "An RDS Read Replica distributes read load but does not provide query caching.",
      "RDS Proxy provides connection pooling and management for databases but does not provide query caching.",
      "✓ Correct: Using Amazon ElastiCache for Redis and implementing cache invalidation logic in the application allows read queries to be cached and performance to be improved. Common caching strategies include Cache-Aside (Lazy Loading) and Write-Through. With Cache-Aside, the application first checks the cache and, if the data is not there, retrieves it from the database and stores it in the cache. With Write-Through, the cache is also updated at the same time as database writes. When changes occur in the database, the application deletes or updates the relevant cache key to invalidate the cache. Redis can also use Pub/Sub to notify multiple application instances of cache invalidation.",
      "DAX is a cache purpose-built for DynamoDB and cannot be used with RDS."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Strategies.html", title: "Caching strategies" }
    ]
  },
  {
    id: 79,
    question: "A company has an application running on Amazon EC2 instances that periodically generates large amounts of log data and stores it in an Amazon S3 bucket. The company needs to retain log data for a long time, but access frequency is very low. The company wants to minimize storage costs.\n\nWhich S3 storage class should a solutions architect recommend to meet these requirements?",
    options: [
      "S3 Standard",
      "S3 Glacier Deep Archive",
      "S3 Standard-IA",
      "S3 Intelligent-Tiering"
    ],
    correctAnswer: 1,
    category: "Storage",
    explanation: "S3 Glacier Deep Archive is the lowest-cost storage class, ideal for data that is retained for long periods and accessed very infrequently.",
    optionExplanations: [
      "S3 Standard is designed for frequently accessed data and has the highest storage cost.",
      "✓ Correct: S3 Glacier Deep Archive is the lowest-cost storage class, ideal for data that is retained for long periods and accessed very infrequently. Storage costs are approximately 1/25 of S3 Standard, making it suitable for data accessed only 1-2 times per year. Data retrieval takes 12 hours for standard retrieval or 48 hours for bulk retrieval. The minimum storage period is 180 days; deleting before that incurs a fee for the remaining period. It is ideal when compliance requirements mandate long-term retention of log data. An S3 lifecycle policy can be used to automatically transition to Glacier Deep Archive.",
      "S3 Standard-IA is designed for infrequently accessed data, but Glacier Deep Archive has lower storage costs.",
      "S3 Intelligent-Tiering automatically changes storage classes based on access patterns, but if it is known that access frequency is very low, using Glacier Deep Archive directly is more cost-efficient."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html", title: "Using Amazon S3 storage classes" }
    ]
  },
  {
    id: 80,
    question: "A company has an application running in an Amazon VPC. The company wants to allow only traffic from a specific IP address range and block all other traffic. The company wants to control traffic at the VPC level.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use a Network ACL (NACL) to specify allowed IP address ranges and deny all other traffic.",
      "Use security groups to specify allowed IP address ranges.",
      "Use AWS WAF to configure IP address-based rules.",
      "Use VPC flow logs to monitor traffic."
    ],
    correctAnswer: 0,
    category: "Networking",
    explanation: "Using a Network ACL (NACL) to specify allowed IP address ranges and deny all other traffic controls traffic at the VPC level.",
    optionExplanations: [
      "✓ Correct: Network ACLs (NACLs) are subnet-level firewalls that control inbound and outbound traffic. NACLs can configure both allow and deny rules, evaluated in numerical order. Setting rules to allow specific IP address ranges and a final rule to deny all traffic satisfies the requirements. NACLs are stateless and require separate inbound and outbound rules. They can be combined with security groups to implement defense in depth.",
      "Security groups are instance-level firewalls that can only configure allow rules. Explicit deny rules cannot be set. By default, all traffic is denied, and only allowed traffic is specified.",
      "AWS WAF is a web application firewall that integrates with ALB, CloudFront, and API Gateway. NACLs are more appropriate for VPC-level traffic control.",
      "VPC flow logs record traffic logs and are not used for traffic control."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html", title: "Control subnet traffic with network access control lists" }
    ]
  },
  {
    id: 81,
    question: "A company is planning a migration from its on-premises data center to AWS. The company needs to transfer hundreds of TB of data to Amazon S3. The internet connection bandwidth is limited, potentially taking months to transfer the data.\n\nWhich solution should a solutions architect recommend as the most cost-effective?",
    options: [
      "Use AWS Snowball devices to physically transfer the data.",
      "Use AWS Direct Connect to establish a dedicated network connection and transfer the data.",
      "Use Amazon S3 Transfer Acceleration to speed up data transfer.",
      "Use AWS DataSync to transfer data over the internet."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "AWS Snowball is the most cost-effective solution for physically transferring tens to hundreds of TB of data, especially when internet bandwidth is limited.",
    optionExplanations: [
      "✓ Correct: AWS Snowball is a dedicated device for physically transferring large amounts of data. It has storage capacity of 80 TB or 50 TB and transfers data securely with encryption. It is the most cost-effective solution when internet bandwidth is limited or when transferring tens to hundreds of TB. A device is shipped to your on-premises location, data is copied to it, and it is shipped back to AWS. When AWS receives the device, the data is imported into an S3 bucket.",
      "AWS Direct Connect provides a dedicated network connection, but initial setup takes time and costs money. Snowball is more cost-effective for a one-time transfer of hundreds of TB.",
      "S3 Transfer Acceleration speeds up internet-based data transfers, but is limited in effect when bandwidth is constrained and can be expensive for large data volumes.",
      "AWS DataSync automates data transfer between on-premises and AWS, but transfers over the internet, which takes a long time when bandwidth is limited."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/snowball/latest/ug/whatissnowball.html", title: "What is AWS Snowball?" }
    ]
  },
  {
    id: 82,
    question: "A company uses an Amazon RDS for MySQL database. The company wants to scale out read traffic to improve database performance. The company also wants to ensure high availability if the primary database fails.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Enable Amazon RDS Multi-AZ deployment.",
      "Create an Amazon RDS Read Replica.",
      "Enable Amazon RDS Multi-AZ deployment and create a Read Replica.",
      "Use Amazon ElastiCache to cache database queries."
    ],
    correctAnswer: 2,
    category: "Database",
    explanation: "Multi-AZ deployment ensures high availability, and Read Replicas scale out read traffic. Combining both satisfies all requirements.",
    optionExplanations: [
      "Multi-AZ deployment provides high availability but cannot scale out read traffic. The standby replica is used only for failover.",
      "Read Replicas can scale out read traffic but do not provide automatic failover. They do not fully satisfy the high availability requirement.",
      "✓ Correct: Combining Multi-AZ deployment and Read Replicas satisfies both requirements. Multi-AZ deployment automatically fails over to the standby replica if the primary database fails, ensuring high availability. Read Replicas distribute read traffic across multiple replicas to improve performance. Up to 15 Read Replicas can be created and can be placed in different Regions.",
      "ElastiCache is effective for caching database queries but does not directly satisfy the high availability requirement. It also requires implementing a caching strategy."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html", title: "Multi-AZ DB instance deployments" },
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html", title: "Working with DB instance read replicas" }
    ]
  },
  {
    id: 83,
    question: "A company has a web application running on Amazon EC2 instances. The application processes images uploaded by users and generates thumbnails. Image processing can take several minutes, requiring users to wait until processing is complete. The company wants to run image processing asynchronously to improve user experience.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Increase the EC2 instance size to improve processing speed.",
      "Use an AWS Lambda function to run image processing synchronously.",
      "Use an Amazon SQS queue to enqueue image processing tasks and process them on separate EC2 instances.",
      "Use Amazon CloudFront to speed up image delivery."
    ],
    correctAnswer: 2,
    category: "Application Integration",
    explanation: "Using an Amazon SQS queue allows image processing tasks to run asynchronously, so users no longer need to wait for processing to complete.",
    optionExplanations: [
      "Increasing the EC2 instance size will not help as long as processing runs synchronously — users still need to wait. Asynchronous processing is needed.",
      "Running Lambda functions synchronously still requires users to wait for processing to complete and does not satisfy the requirements. Lambda functions can be run asynchronously in combination with SQS.",
      "✓ Correct: Using an Amazon SQS queue allows image processing tasks to run asynchronously. When a user uploads an image, the web application adds the processing task to the SQS queue and immediately returns a response. Separate EC2 worker instances retrieve messages from the queue and run image processing. This means users no longer need to wait for processing to complete, improving user experience. SQS guarantees message delivery and is a scalable, reliable queuing service.",
      "CloudFront speeds up image delivery but does not satisfy the requirement to run image processing asynchronously."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html", title: "What is Amazon Simple Queue Service?" }
    ]
  },
  {
    id: 84,
    question: "A company needs to analyze log files stored in an Amazon S3 bucket. Several GB of data are added daily, and both current and historical data need to be analyzed. The company wants to analyze log data using SQL queries.\n\nWhich solution should a solutions architect recommend as the most cost-effective?",
    options: [
      "Create an Amazon EMR cluster and use Spark to analyze log data.",
      "Create an Amazon RDS database, import log data, and query it.",
      "Create an Amazon Redshift cluster, load log data, and query it.",
      "Use Amazon Athena to directly query log files in the S3 bucket."
    ],
    correctAnswer: 3,
    category: "Application Integration",
    explanation: "Amazon Athena is a serverless service that can directly query data in S3 using SQL. It requires no infrastructure management and charges only for queries executed, making it the most cost-effective solution.",
    optionExplanations: [
      "EMR is suitable for large-scale data processing but requires cluster management and is more complex than SQL queries. Athena is more appropriate for log file analysis.",
      "An RDS database requires effort to import and manage log data and incurs ongoing infrastructure costs. Athena is more cost-effective for analyzing large amounts of log data.",
      "Redshift is suitable for large data warehouses but requires cluster management and costs. Athena is simpler and more cost-effective for log file analysis.",
      "✓ Correct: Amazon Athena is a serverless interactive query service that can directly query data in S3 using SQL. It requires no infrastructure management and charges only per query executed. Standard SQL can be used, and it supports CSV, JSON, Parquet, ORC, and other formats. It is ideal for log file analysis and integrates with AWS Glue Data Catalog to manage table definitions. Partitioning can be used to optimize query performance and costs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html", title: "What is Amazon Athena?" }
    ]
  },
  {
    id: 85,
    question: "A company has an application running on Amazon EC2 instances. The application uses database connection strings and API keys that contain sensitive information. The company wants to store this sensitive information securely and make it easily accessible from the application.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Store sensitive information in environment variables on EC2 instances.",
      "Store sensitive information in an Amazon S3 bucket and access it using an IAM role.",
      "Hard-code sensitive information in the application source code.",
      "Use AWS Secrets Manager to store sensitive information and access it using an IAM role."
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "AWS Secrets Manager is a managed service that securely stores sensitive information and can automatically rotate it. Access is controlled using IAM roles and audit logs are provided.",
    optionExplanations: [
      "Storing sensitive information in environment variables can expose it in process lists or logs, presenting a security risk. Automatic rotation is also difficult.",
      "Storing sensitive information in an S3 bucket is possible, but Secrets Manager is more specialized for managing sensitive information and provides automatic rotation, versioning, and audit logging.",
      "Hard-coding sensitive information in source code is a serious security risk. If the source code is stored in a version control system, sensitive information may be exposed.",
      "✓ Correct: AWS Secrets Manager is a managed service for securely storing, managing, and retrieving database credentials, API keys, and other sensitive information. It stores secrets encrypted and controls access using IAM policies. It provides automatic secret rotation and integrates with databases such as RDS, Redshift, and DocumentDB. Version management allows tracking of secret change history, and CloudTrail integration records audit logs. Applications can retrieve secrets from Secrets Manager using the AWS SDK."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html", title: "What is AWS Secrets Manager?" }
    ]
  },
  {
    id: 86,
    question: "A company operates a web application with a global user base. The company wants to deliver content to users worldwide with low latency. It also wants to protect against DDoS attacks and manage SSL/TLS certificates.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS Global Accelerator to optimize traffic.",
      "Deploy EC2 instances in multiple regions and use Route 53 latency-based routing.",
      "Create an Amazon CloudFront distribution and integrate AWS Shield and AWS Certificate Manager.",
      "Deploy Elastic Load Balancers in multiple regions."
    ],
    correctAnswer: 2,
    category: "Networking",
    explanation: "Amazon CloudFront is a global content delivery network (CDN) that delivers content with low latency from edge locations worldwide. It integrates automatically with AWS Shield for DDoS protection and AWS Certificate Manager for free SSL/TLS certificate management.",
    optionExplanations: [
      "AWS Global Accelerator is well-suited for optimizing TCP and UDP traffic, but for HTTPS content delivery, CloudFront is more appropriate.",
      "Deploying to multiple regions with Route 53 latency-based routing can achieve low latency, but CloudFront has more edge locations and lower latency. It also makes DDoS protection and SSL/TLS certificate management integration easier.",
      "✓ Correct: Amazon CloudFront is a global CDN that delivers content with low latency from over 400 edge locations worldwide. It can cache both static and dynamic content, reducing load on origin servers. AWS Shield Standard is automatically integrated to protect against DDoS attacks. Integration with AWS Certificate Manager (ACM) allows free SSL/TLS certificates to be managed easily. AWS WAF can also be integrated to add web application firewall capabilities.",
      "Deploying ELBs in multiple regions is possible, but CloudFront has more edge locations and can deliver content with lower latency."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html", title: "What is Amazon CloudFront?" },
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html", title: "AWS Shield" }
    ]
  },
  {
    id: 87,
    question: "A company runs containerized applications using Amazon ECS (Elastic Container Service). The company wants to centrally collect and analyze container logs. It also wants to retain logs for a long period and make them searchable.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Amazon CloudWatch Logs to collect container logs and analyze them with CloudWatch Logs Insights.",
      "Write logs directly to an Amazon S3 bucket and analyze them with Amazon Athena.",
      "Use Amazon Elasticsearch Service to collect logs and analyze them with Kibana.",
      "Store logs on EC2 instances and analyze them manually."
    ],
    correctAnswer: 0,
    category: "Monitoring and Cost Optimization",
    explanation: "Amazon CloudWatch Logs automatically collects ECS container logs and allows SQL-like query analysis using CloudWatch Logs Insights. Long-term retention can be configured, making it the most integrated solution.",
    optionExplanations: [
      "✓ Correct: Amazon CloudWatch Logs is the most integrated solution for automatically collecting ECS container logs. Simply specify awslogs as the log driver in the ECS task definition to send container stdout and stderr to CloudWatch Logs. CloudWatch Logs Insights enables SQL-like queries to analyze logs and search in real time. Retention periods can be set for long-term storage, and logs can be exported to S3 for even longer retention. CloudWatch Alarms can be integrated to set alerts based on specific log patterns.",
      "Writing logs directly to an S3 bucket requires application changes, whereas CloudWatch Logs integration is simpler. Analysis with Athena is possible but lacks real-time capability.",
      "Amazon Elasticsearch Service (now Amazon OpenSearch Service) is suitable for advanced log analysis, but setup and management are complex and costly. CloudWatch Logs is simpler and more cost-effective.",
      "Storing logs on EC2 instances has scalability and availability issues, and manual analysis is inefficient."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_cloudwatch_logs.html", title: "Using CloudWatch Logs with Amazon ECS" },
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html", title: "Analyzing log data with CloudWatch Logs Insights" }
    ]
  },
  {
    id: 88,
    question: "A company hosts a static website stored in an Amazon S3 bucket. The company wants to block access from specific countries and allow access only from other countries.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Create an Amazon CloudFront distribution and configure geographic restrictions (Geo Restriction).",
      "Use an S3 bucket policy to restrict access based on IP address ranges.",
      "Use AWS WAF to configure geographic rules.",
      "Use a Network ACL to block traffic from specific countries."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Using Amazon CloudFront's geographic restriction feature allows access from specific countries to be easily blocked or permitted.",
    optionExplanations: [
      "✓ Correct: Amazon CloudFront's geographic restriction (Geo Restriction) feature allows access from specific countries to be easily blocked or permitted. Create a CloudFront distribution with the S3 bucket as the origin. In the geographic restriction settings, specify an allowlist (list of permitted countries) or a blocklist (list of blocked countries). CloudFront determines the country from the user's IP address and controls access based on the configuration. This feature is available at no additional cost and is easy to configure.",
      "Specifying IP address ranges in an S3 bucket policy is possible, but managing IP ranges per country is complex and IP addresses can change. CloudFront geographic restriction is simpler.",
      "Using AWS WAF to configure geographic rules is also possible, but CloudFront's geographic restriction feature is simpler and sufficient for this requirement. WAF is used when more complex rules are needed.",
      "Network ACLs are subnet-level firewalls within a VPC and cannot be used to control access to an S3 bucket."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/georestrictions.html", title: "Restricting the geographic distribution of your content" }
    ]
  },
  {
    id: 89,
    question: "A company has an application running on Amazon EC2 instances. The application periodically calls AWS APIs to interact with other AWS services. The company wants to call AWS APIs securely without storing access keys and secret keys on EC2 instances.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Attach an IAM role to the EC2 instance and grant the required permissions.",
      "Store IAM user access keys and secret keys in environment variables.",
      "Store access keys and secret keys in AWS Secrets Manager and retrieve them from the application.",
      "Hard-code access keys and secret keys in the application source code."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Attaching an IAM role to an EC2 instance allows AWS APIs to be called securely using temporary credentials without storing access keys and secret keys. This is the most secure and recommended approach.",
    optionExplanations: [
      "✓ Correct: Attaching an IAM role to an EC2 instance allows AWS APIs to be called securely without storing access keys and secret keys. The EC2 instance automatically retrieves temporary credentials from the instance metadata service, and the AWS SDK uses these credentials to call APIs. Temporary credentials are automatically rotated periodically, improving security. Grant only the required permissions to the IAM role, following the principle of least privilege. This approach is recommended as an AWS best practice.",
      "Storing access keys and secret keys in environment variables presents a security risk. They may be exposed in process lists or logs, and key rotation must be performed manually.",
      "Storing access keys and secret keys in Secrets Manager is possible, but using an IAM role is simpler and more secure because it uses temporary credentials.",
      "Hard-coding access keys and secret keys in source code is a serious security risk. If the source code is stored in a version control system, credentials may be exposed."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html", title: "IAM roles for Amazon EC2" }
    ]
  },
  {
    id: 90,
    question: "A company uses an Amazon RDS for PostgreSQL database. The company wants to automatically back up the database and copy backups to a different region for disaster recovery.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Create an RDS Read Replica in a different region.",
      "Manually create RDS snapshots and copy them to a different region.",
      "Create an AWS Lambda function to periodically export the database and store it in an S3 bucket.",
      "Enable RDS automated backups and use AWS Backup to configure cross-region backups."
    ],
    correctAnswer: 3,
    category: "Database",
    explanation: "Using RDS automated backups and AWS Backup allows backups to be taken automatically and cross-region backups to be configured easily.",
    optionExplanations: [
      "A Read Replica can be used for read scale-out and disaster recovery, but it is not a replacement for backups. A Read Replica is synchronized with the primary database, so accidental data deletion is also reflected in the Read Replica. Backups are required to restore data to a specific point in time.",
      "Manually creating snapshots and copying them to a different region is possible, but it is not automated, leading to high operational overhead and a risk of human error.",
      "Using a Lambda function to export the database is possible, but using RDS automated backups and AWS Backup is simpler and optimized for RDS.",
      "✓ Correct: Enabling RDS automated backups automatically takes daily database backups. The backup retention period can be configured from 1 to 35 days. Using AWS Backup makes it easy to configure cross-region backups and centrally manage backup policies. AWS Backup automatically copies RDS snapshots to another region to prepare for disaster recovery. Backup lifecycle management can also be automated to automatically delete old backups."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html", title: "Working with automated backups" },
      { url: "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html", title: "What is AWS Backup?" }
    ]
  },
  {
    id: 91,
    question: "A company exposes a RESTful API using Amazon API Gateway. The company wants to restrict API access to authenticated users only and simplify user management. It also wants to support sign-in using social identity providers (Google, Facebook).\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Create a custom authorizer (Lambda function) in API Gateway and implement custom authentication logic.",
      "Create AWS IAM users and authenticate using access keys in API Gateway.",
      "Create an Amazon Cognito user pool and configure it as an API Gateway authorizer.",
      "Store user credentials in AWS Secrets Manager and validate them in API Gateway."
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "Amazon Cognito user pools are a managed service that provides user management, authentication, and integration with social identity providers. They integrate easily with API Gateway and satisfy all requirements.",
    optionExplanations: [
      "Using a custom authorizer is possible, but it requires implementing and maintaining custom authentication logic. Using Cognito is simpler and makes integration with social identity providers easier.",
      "IAM users are suitable for managing access to AWS resources but are not appropriate for end-user authentication. They also do not support integration with social identity providers.",
      "✓ Correct: Amazon Cognito user pools are a managed service that provides user sign-up, sign-in, and access control. They support integration with social identity providers (Google, Facebook, Amazon) and SAML 2.0-based identity providers. Configuring them as an API Gateway authorizer allows API access to be authenticated using JWT tokens. Features such as multi-factor authentication (MFA), password policies, and account recovery are also provided. There is no need to build or operate user management infrastructure, making it a scalable and secure solution.",
      "Secrets Manager is suitable for storing sensitive information, but for user authentication and integration with social identity providers, Cognito is more appropriate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html", title: "Using Amazon Cognito user pools as authorizer" },
      { url: "https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html", title: "Amazon Cognito user pools" }
    ]
  },
  {
    id: 92,
    question: "A company has a legacy application running on Amazon EC2 instances. The application stores large amounts of data on the local file system. The company wants to share data across multiple EC2 instances and ensure high availability.\n\nWhich storage solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Amazon EBS (Elastic Block Store) volumes and attach them to multiple instances.",
      "Use instance store volumes.",
      "Use an Amazon S3 bucket and access data using the S3 API.",
      "Use Amazon EFS (Elastic File System) and mount it from multiple instances."
    ],
    correctAnswer: 3,
    category: "Storage",
    explanation: "Amazon EFS is a shared file system that can be accessed simultaneously from multiple EC2 instances, providing high availability and durability. It uses the NFS protocol and can be used without modifying existing applications.",
    optionExplanations: [
      "EBS volumes can typically only be attached to one EC2 instance at a time (the Multi-Attach feature is limited to specific use cases). EFS is more suitable for sharing data across multiple instances.",
      "Instance store volumes are temporary storage; data is lost when the instance is stopped or terminated. They do not satisfy the high availability requirement.",
      "S3 is object storage, not a file system. Accessing data via the S3 API requires application changes. If the legacy application uses a local file system, EFS is more appropriate.",
      "✓ Correct: Amazon EFS is a fully managed shared file system that can be accessed simultaneously from multiple EC2 instances. It uses the NFSv4 protocol and can be used without modifying existing applications. It automatically replicates across multiple Availability Zones, providing high availability and durability. Storage capacity scales automatically and you are charged only for what you use. Performance mode (General Purpose, Max I/O) and throughput mode (Bursting, Provisioned) can be selected to optimize for the workload."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html", title: "What is Amazon Elastic File System?" }
    ]
  },
  {
    id: 93,
    question: "A company uses an Amazon DynamoDB table. The company wants to replicate the table's data to a different region to achieve disaster recovery and improve global read performance.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use DynamoDB Streams and a Lambda function to copy data to a table in a different region.",
      "Use DynamoDB global tables.",
      "Use AWS Database Migration Service (DMS) to replicate data.",
      "Periodically create DynamoDB backups and restore them in a different region."
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "DynamoDB global tables automatically replicate data across multiple regions and provide multi-region read and write. Both disaster recovery and global performance improvement can be achieved.",
    optionExplanations: [
      "Implementing replication using DynamoDB Streams and Lambda functions is possible, but using global tables is simpler and a managed solution.",
      "✓ Correct: DynamoDB global tables are a fully managed, multi-region, multi-active database that automatically replicates data across multiple AWS Regions. Each region's table supports both read and write operations, and changes are automatically replicated to other regions. Replication typically completes in under one second, guaranteeing eventual consistency. Failover to another region is possible for disaster recovery, and data can be served to global users with low latency. Conflict resolution is automatically handled using a last-writer-wins policy.",
      "DMS is used for database migration and replication, but for DynamoDB multi-region replication, global tables are more appropriate.",
      "Periodic backups and restores can be used for disaster recovery, but they are not real-time replication and are not suitable for improving global read performance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html", title: "Global tables - multi-Region replication for DynamoDB" }
    ]
  },
  {
    id: 94,
    question: "A company has a web application running on Amazon EC2 instances. The application stores session information locally. The company wants to deploy multiple instances behind an Application Load Balancer (ALB) for high availability while maintaining user session information.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Enable ALB sticky sessions (session affinity).",
      "Use Amazon ElastiCache to store session information.",
      "Use Amazon DynamoDB to store session information.",
      "Use Amazon EFS to share session information."
    ],
    correctAnswer: 1,
    category: "High Availability and Scalability",
    explanation: "Using Amazon ElastiCache to store session information allows sessions to be shared across multiple instances, achieving high availability and performance. This is a session management best practice.",
    optionExplanations: [
      "ALB sticky sessions route users to the same instance, but if that instance is stopped, session information is lost. They do not fully satisfy the high availability requirement.",
      "✓ Correct: Using Amazon ElastiCache to store session information allows sessions to be shared across multiple EC2 instances, achieving high availability and performance. ElastiCache supports Redis or Memcached and provides fast access as an in-memory cache. When using Redis, multi-AZ deployment and replication ensure high availability. Externalizing session information means sessions are maintained even if an instance is stopped, improving user experience. This is a best practice for stateless application design.",
      "Using DynamoDB to store session information is also possible, but ElastiCache has lower latency and is optimized for session management.",
      "Using EFS to share session information is possible, but ElastiCache has lower latency and is better suited for session management."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/mem-ug/elasticache-use-cases.html", title: "Amazon ElastiCache use cases" }
    ]
  },
  {
    id: 95,
    question: "A company has a large number of image files stored in an Amazon S3 bucket. The company wants to automatically generate thumbnails when images are uploaded and store them in a separate S3 bucket.\n\nWhich solution should a solutions architect recommend as the most cost-effective?",
    options: [
      "Create an AWS Lambda function and configure S3 event notifications as the trigger.",
      "Run an Amazon EC2 instance continuously and poll the S3 bucket to detect new images.",
      "Use an Amazon SQS queue to add image processing tasks and process them on EC2 instances.",
      "Use AWS Batch to run image processing jobs."
    ],
    correctAnswer: 0,
    category: "Compute",
    explanation: "Using an AWS Lambda function with S3 event notifications allows thumbnails to be generated automatically when images are uploaded. It is serverless, charges only for execution time, and is the most cost-effective solution.",
    optionExplanations: [
      "✓ Correct: Using an AWS Lambda function with S3 event notifications allows thumbnails to be generated automatically when images are uploaded. When an object is created in the S3 bucket, the S3 event notification triggers the Lambda function, which processes the image and generates a thumbnail. It is serverless, requires no infrastructure management, and charges only for execution time, making it the most cost-effective solution. Lambda functions scale automatically and can process multiple images simultaneously. Image processing libraries (such as Pillow or ImageMagick) can be added as Lambda Layers.",
      "Running an EC2 instance continuously is costly, and polling the S3 bucket is inefficient. An event-driven approach is more appropriate.",
      "Using an SQS queue and EC2 instances is possible, but using a Lambda function is simpler, serverless, and more cost-effective.",
      "AWS Batch is suitable for large-scale batch processing jobs, but for event-driven image processing, a Lambda function is more appropriate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html", title: "Using AWS Lambda with Amazon S3" }
    ]
  },
  {
    id: 96,
    question: "A company has an application running in an Amazon VPC. The application must be accessible from the internet, but the company wants to place EC2 instances in private subnets.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Assign an Elastic IP address to the EC2 instances.",
      "Place a NAT Gateway in the private subnet.",
      "Place an Application Load Balancer (ALB) in the public subnet and route traffic to EC2 instances in the private subnet.",
      "Attach an internet gateway to the private subnet."
    ],
    correctAnswer: 2,
    category: "Networking",
    explanation: "Placing an Application Load Balancer (ALB) in the public subnet and routing traffic to EC2 instances in the private subnet allows internet access while keeping the EC2 instances private.",
    optionExplanations: [
      "Assigning an Elastic IP address to EC2 instances requires the instances to be in a public subnet. Elastic IPs cannot be directly assigned to instances in private subnets.",
      "A NAT Gateway is used to allow instances in private subnets to access the internet, but it does not provide inbound internet access to private subnet instances.",
      "✓ Correct: Placing an Application Load Balancer (ALB) in the public subnet and routing traffic to EC2 instances in the private subnet allows internet access while keeping the EC2 instances private. The ALB can be placed across multiple Availability Zones for high availability. The ALB has a public IP address, receives traffic from the internet, and routes it to EC2 instances with private IP addresses. This prevents EC2 instances from being directly accessible from the internet, improving security.",
      "An internet gateway is attached at the VPC level and is used by instances in public subnets to access the internet. It cannot be directly attached to a private subnet."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html", title: "What is an Application Load Balancer?" }
    ]
  },
  {
    id: 97,
    question: "A company operates a data warehouse using an Amazon Redshift cluster. The company wants to cache frequently accessed data to improve query performance.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use the Redshift result caching feature.",
      "Use Amazon ElastiCache to cache query results.",
      "Export query results to Amazon S3 and read from S3.",
      "Upgrade the Redshift cluster node type."
    ],
    correctAnswer: 0,
    category: "Database",
    explanation: "The Redshift result caching feature automatically returns previous results when the same query is executed, significantly improving query performance. No additional infrastructure is required.",
    optionExplanations: [
      "✓ Correct: The Redshift result caching feature automatically returns previous results when the same query is executed, significantly improving query performance. The result cache is stored on the cluster's leader node; if the underlying data has not changed, the cached result is used. This can reduce query execution time from seconds to milliseconds. Result caching is enabled by default and requires no additional infrastructure or configuration. Cache size is automatically managed based on the cluster's node type.",
      "Using ElastiCache to cache query results is possible, but it requires application changes. Using Redshift's result caching feature is simpler.",
      "Exporting query results to S3 is possible, but it requires manual data management. Redshift's result caching feature is more automatic and efficient.",
      "Upgrading the node type can improve query performance, but it increases costs. Using the result caching feature is more cost-effective."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/c-result-caching.html", title: "Result caching" }
    ]
  },
  {
    id: 98,
    question: "A company has an application running on Amazon EC2 instances. The application periodically reads data from an Amazon S3 bucket. The company wants to speed up access to S3 and reduce data transfer costs.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Create an Amazon CloudFront distribution and configure the S3 bucket as the origin.",
      "Enable S3 Transfer Acceleration.",
      "Place the EC2 instances and S3 bucket in the same region.",
      "Create a VPC endpoint (Gateway Endpoint) for S3."
    ],
    correctAnswer: 3,
    category: "Networking",
    explanation: "Creating a VPC endpoint (Gateway Endpoint) for S3 routes traffic from EC2 instances in the VPC to S3 through the AWS network, bypassing the internet gateway and NAT Gateway. This reduces data transfer costs and improves performance.",
    optionExplanations: [
      "CloudFront is suitable for global content delivery, but for access from EC2 instances within a VPC to S3, a VPC endpoint is more appropriate.",
      "S3 Transfer Acceleration is suitable for speeding up data uploads to S3 over the internet, but for access from EC2 instances within a VPC, a VPC endpoint is more appropriate.",
      "Placing EC2 instances and the S3 bucket in the same region reduces latency, but using a VPC endpoint further optimizes costs and performance.",
      "✓ Correct: Creating a VPC endpoint (Gateway Endpoint) for S3 routes traffic from EC2 instances in the VPC to S3 through the AWS network, bypassing the internet gateway and NAT Gateway. This reduces data transfer costs and improves performance. VPC endpoints are free and can be configured by simply adding them to the route table. For instances in private subnets accessing S3, this reduces NAT Gateway data transfer charges. Security is also improved as S3 traffic does not traverse the internet."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html", title: "Gateway endpoints for Amazon S3" }
    ]
  },
  {
    id: 99,
    question: "A company uses an Amazon RDS for MySQL database. The company wants to monitor database performance, identify slow queries, and optimize them.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Amazon CloudWatch Logs to collect database logs.",
      "Use Amazon Athena to analyze database logs.",
      "Use AWS X-Ray to trace database queries.",
      "Enable RDS Performance Insights."
    ],
    correctAnswer: 3,
    category: "Monitoring and Cost Optimization",
    explanation: "RDS Performance Insights is a dedicated tool for monitoring database performance and identifying slow queries. A visual dashboard makes it easy to analyze database load and query performance.",
    optionExplanations: [
      "Using CloudWatch Logs to collect database logs is possible, but Performance Insights is more specialized for database performance monitoring and provides a visual dashboard.",
      "Athena is a tool for analyzing data in S3 and can be used for database log analysis, but Performance Insights provides a real-time visual dashboard.",
      "X-Ray is suitable for tracing distributed applications, but for identifying database slow queries, Performance Insights is more appropriate.",
      "✓ Correct: RDS Performance Insights is a dedicated tool for monitoring database performance and identifying slow queries. A visual dashboard displays database load (DB Load) as a time series, making it easy to identify which queries consume the most resources. Filtering by top SQL statements, wait events, hosts, and users enables rapid diagnosis of performance bottlenecks. Historical performance data is retained for trend analysis. It can be easily enabled from the RDS console with no additional infrastructure required."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.html", title: "Monitoring DB load with Performance Insights" }
    ]
  },
  {
    id: 100,
    question: "A company needs to protect data stored in an Amazon S3 bucket from deletion or modification due to compliance requirements. The company wants to prevent objects from being deleted or overwritten for a specified period.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use an S3 bucket policy to deny deletion and overwrite.",
      "Use an AWS IAM policy to deny deletion and overwrite.",
      "Enable S3 Versioning.",
      "Use S3 Object Lock to set a retention period."
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "S3 Object Lock uses a WORM (Write Once Read Many) model to prevent objects from being deleted or overwritten for a specified period. It is the optimal solution for meeting compliance requirements.",
    optionExplanations: [
      "Using an S3 bucket policy to deny deletion and overwrite is possible, but an administrator can modify the policy, so it does not fully satisfy compliance requirements. Object Lock provides stronger protection.",
      "Using an IAM policy to deny deletion and overwrite is possible, but an administrator can modify the policy, so it does not fully satisfy compliance requirements. Object Lock provides stronger protection.",
      "S3 Versioning retains previous versions of objects but does not prevent deletion or overwrite. Using it together with Object Lock provides stronger protection.",
      "✓ Correct: S3 Object Lock uses a WORM (Write Once Read Many) model to prevent objects from being deleted or overwritten for a specified period. Two modes are available: Governance mode (users with special permissions can modify retention settings) and Compliance mode (no one can delete or modify objects during the retention period). Compliance mode provides the strongest protection for meeting regulatory requirements. The retention period can be specified in days or years, and objects are protected until the period ends. The Legal Hold feature can also be used to protect objects indefinitely, regardless of the retention period."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html", title: "Using S3 Object Lock" }
    ]
  },
  {
    id: 81,
    question: "A company has a web application running on Amazon EC2 instances. The application processes files uploaded by users and stores the results in Amazon S3. File processing can take several minutes, and the company wants to notify users of processing progress.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use an Amazon SQS queue to add processing tasks and periodically poll for progress.",
      "Use AWS Step Functions to manage the processing workflow and send notifications via Amazon SNS.",
      "Use Amazon EventBridge to capture processing events and send notifications via AWS Lambda.",
      "Use Amazon Kinesis Data Streams to stream processing events."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "Using AWS Step Functions to manage the processing workflow and sending notifications via Amazon SNS at each step's completion allows users to be notified of processing progress.",
    optionExplanations: [
      "Using an SQS queue is possible, but Step Functions is more appropriate for progress tracking and notifications.",
      "✓ Correct: AWS Step Functions is a serverless orchestration service for visually designing and executing workflows combining multiple AWS services. The file processing workflow can be divided into multiple steps (upload, validation, processing, storage), and Amazon SNS can be used to send notifications to users upon each step's completion. Step Functions tracks workflow state and automatically manages error handling, retries, and timeouts. Workflow execution history is visualized, making debugging easy. Long-running workflows are also supported, with a maximum execution time of one year.",
      "EventBridge is suitable for event-driven architectures, but for multi-step workflow management, Step Functions is more appropriate.",
      "Kinesis Data Streams is used for real-time streaming data processing, but for workflow management, Step Functions is more appropriate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html", title: "What is AWS Step Functions?" }
    ]
  },
  {
    id: 82,
    question: "A company has an application running on Amazon EC2 instances. The application periodically retrieves sensitive information from AWS Secrets Manager. The company wants to reduce the cost of accessing Secrets Manager.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Migrate sensitive information to AWS Systems Manager Parameter Store.",
      "Cache sensitive information retrieved from Secrets Manager in application memory.",
      "Store sensitive information in an Amazon S3 bucket.",
      "Store sensitive information in an Amazon DynamoDB table."
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "Caching sensitive information retrieved from Secrets Manager in application memory reduces the number of API calls and lowers costs.",
    optionExplanations: [
      "Migrating to Parameter Store is also a valid approach, but Secrets Manager provides automatic rotation, making it suitable for managing sensitive information. Using caching maintains Secrets Manager's features while reducing costs.",
      "✓ Correct: Caching sensitive information retrieved from Secrets Manager in application memory reduces the number of API calls and lowers costs. Secrets Manager charges per API call, so frequent access can be expensive. Caching the sensitive information and refreshing it periodically (e.g., every hour) can significantly reduce API calls. Using the AWS Secrets Manager Caching Client library simplifies cache implementation. Set an appropriate TTL (Time To Live) for the cache so that it is automatically updated when secrets are rotated.",
      "Storing sensitive information in an S3 bucket carries a high security risk and loses Secrets Manager's automatic rotation feature.",
      "Storing sensitive information in DynamoDB is possible, but it loses Secrets Manager's automatic rotation feature and complicates security management."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/retrieving-secrets.html", title: "Retrieve secrets from AWS Secrets Manager" }
    ]
  },
  {
    id: 83,
    question: "A company has an application running on Amazon EC2 instances. The application periodically loads large amounts of data into an Amazon Redshift data warehouse. The company wants to improve data load performance.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Upload data in CSV format to S3 and load it using the Redshift COPY command.",
      "Load data directly into Redshift using INSERT statements.",
      "Compress data, upload it to S3, and load it using the Redshift COPY command.",
      "Use AWS Database Migration Service (DMS) to load data."
    ],
    correctAnswer: 2,
    category: "Application Integration",
    explanation: "Compressing data, uploading it to S3, and loading it using the Redshift COPY command can significantly reduce data transfer time and load time.",
    optionExplanations: [
      "Loading in CSV format is possible, but compressing the data can significantly reduce data transfer time and load time.",
      "Loading directly using INSERT statements has poor performance and is not suitable for large amounts of data. The COPY command is faster because it uses parallel processing.",
      "✓ Correct: Compressing data, uploading it to S3, and loading it using the Redshift COPY command can significantly reduce data transfer time and load time. Redshift supports compression formats such as gzip, bzip2, and lzop. Compression reduces the time to upload to S3 and decreases network bandwidth usage. The Redshift COPY command uses parallel processing to load multiple files simultaneously, improving performance. Splitting data into multiple smaller files, compressing them, and uploading to S3 achieves maximum performance.",
      "DMS is used for migration between databases, but for periodic data loading, the COPY command is more appropriate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/c_best-practices-loading-data.html", title: "Best practices for loading data" }
    ]
  },
  {
    id: 84,
    question: "A company has an application running on Amazon EC2 instances. The application connects to an Amazon RDS for MySQL database. The company wants to improve database connection management and optimize connection pooling.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use a connection pooling library in the application.",
      "Add an RDS Read Replica.",
      "Use Amazon RDS Proxy.",
      "Increase the max_connections parameter on the RDS instance."
    ],
    correctAnswer: 2,
    category: "Database",
    explanation: "Using Amazon RDS Proxy improves database connection management and optimizes connection pooling. RDS Proxy supports connection pooling, failover, and IAM authentication.",
    optionExplanations: [
      "Using a connection pooling library in the application is effective, but RDS Proxy centralizes connection management and provides advanced features such as failover and IAM authentication.",
      "A Read Replica distributes read load but is not appropriate for improving connection management. RDS Proxy is more suitable.",
      "✓ Correct: Amazon RDS Proxy is a fully managed database proxy placed in front of RDS databases. RDS Proxy pools connections from applications and reduces the number of connections to the database. This reduces database memory and CPU usage and improves performance. RDS Proxy also automatically routes connections to the new instance during a database failover, reducing failover time by up to 66%. It supports IAM authentication and can store database credentials in Secrets Manager. It is particularly effective for integration with serverless applications (Lambda).",
      "Increasing the max_connections parameter is possible, but it increases database memory and CPU usage. Using RDS Proxy is more efficient."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html", title: "Using Amazon RDS Proxy" }
    ]
  },
  {
    id: 85,
    question: "A company has a large number of image files stored in an Amazon S3 bucket. The images are used for training machine learning models. The company wants to speed up access to image files and reduce training time.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Amazon FSx for Lustre to cache S3 data.",
      "Enable S3 Transfer Acceleration.",
      "Use Amazon EFS to store image files.",
      "Copy image files to Amazon EBS volumes."
    ],
    correctAnswer: 0,
    category: "Storage",
    explanation: "Using Amazon FSx for Lustre to cache S3 data enables fast file access and improves machine learning training performance.",
    optionExplanations: [
      "✓ Correct: Amazon FSx for Lustre is a high-performance parallel file system optimized for machine learning, high-performance computing (HPC), and video processing workloads. FSx for Lustre integrates with S3 buckets and automatically caches S3 data. The file system provides hundreds of GB/s of throughput and millions of IOPS, significantly faster than direct S3 access. Machine learning training frequently accesses large numbers of image files, so FSx for Lustre caching significantly reduces training time. It also allows simultaneous access from multiple EC2 instances, making it suitable for distributed training.",
      "S3 Transfer Acceleration speeds up uploads to S3, but for improving download speeds, FSx for Lustre is more appropriate.",
      "EFS is a shared file system, but FSx for Lustre is optimized for machine learning workloads and offers higher performance.",
      "Copying image files to EBS volumes is possible, but they can only be attached to a single EC2 instance and are not suitable for distributed training."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/fsx/latest/LustreGuide/what-is.html", title: "What is Amazon FSx for Lustre?" }
    ]
  },
  {
    id: 86,
    question: "A company has a web application running on Amazon EC2 instances. The application wants to route traffic to the nearest region based on user location.\n\nWhich Amazon Route 53 routing policy should a solutions architect recommend to meet these requirements?",
    options: [
      "Simple routing policy",
      "Geoproximity routing policy",
      "Latency-based routing policy",
      "Weighted routing policy"
    ],
    correctAnswer: 1,
    category: "Networking",
    explanation: "Using the geoproximity routing policy allows traffic to be routed to the nearest region based on user location.",
    optionExplanations: [
      "Simple routing policy routes traffic to a single resource and is not suitable for routing to multiple regions.",
      "✓ Correct: The geoproximity routing policy routes traffic based on the geographic location of users and resources. Geographic coordinates (latitude and longitude) or AWS regions are specified for each resource, and traffic is routed to the nearest resource from the user's location. Bias values can be set to increase or decrease traffic to specific resources. For example, if a particular region has high capacity, the bias value can be increased to route more traffic to that region. Route 53 Traffic Flow can be used to visually design routing policies.",
      "Latency-based routing routes traffic to the region with the lowest latency from the user, but geoproximity routing is more appropriate for location-based routing.",
      "Weighted routing distributes traffic across multiple resources at specified percentages but is not suitable for location-based routing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geo-proximity.html", title: "Geoproximity routing" }
    ]
  },
  {
    id: 87,
    question: "A company has an application running on Amazon EC2 instances. The application periodically invokes AWS Lambda functions, but Lambda function cold start times are long, causing performance degradation.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Lambda Provisioned Concurrency.",
      "Increase the Lambda function memory size.",
      "Increase the Lambda function timeout.",
      "Deploy the Lambda function in multiple regions."
    ],
    correctAnswer: 0,
    category: "Compute",
    explanation: "Using Lambda Provisioned Concurrency pre-initializes Lambda functions and avoids cold starts.",
    optionExplanations: [
      "✓ Correct: Lambda Provisioned Concurrency pre-initializes Lambda functions and keeps a specified number of execution environments ready at all times. This avoids cold starts and achieves consistent low latency. With Provisioned Concurrency configured, Lambda functions are always in an initialized state and execute immediately when requests arrive. It is ideal for production environments that require predictable performance. It can be integrated with Application Auto Scaling to automatically adjust Provisioned Concurrency based on traffic.",
      "Increasing the Lambda function memory size improves execution speed, but does not have a significant effect on cold start time. Provisioned Concurrency is better for avoiding cold starts.",
      "Increasing the timeout is useful for long-running functions but does not affect cold start time.",
      "Deploying Lambda functions in multiple regions improves availability but does not affect cold start time."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html", title: "Managing Lambda provisioned concurrency" }
    ]
  },
  {
    id: 88,
    question: "A company has an application running on Amazon EC2 instances. The application writes large amounts of data to an Amazon DynamoDB table, but write throughput is insufficient and throttling is occurring. The company wants to avoid throttling while minimizing costs.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Implement exponential backoff with jitter to improve retry logic.",
      "Switch to DynamoDB on-demand capacity mode.",
      "Increase the DynamoDB provisioned write capacity units (WCUs).",
      "Create a DynamoDB Global Secondary Index (GSI)."
    ],
    correctAnswer: 0,
    category: "Database",
    explanation: "Implementing exponential backoff with jitter to improve retry logic allows throttling errors to be handled appropriately while minimizing costs.",
    optionExplanations: [
      "✓ Correct: Implementing exponential backoff with jitter to improve retry logic allows throttling errors to be handled appropriately while minimizing costs. DynamoDB returns a ProvisionedThroughputExceededException when throttling occurs. Exponential backoff gradually increases the retry interval (e.g., 100ms, 200ms, 400ms, 800ms), reducing load on DynamoDB. Jitter adds a random delay to the retry interval, reducing collisions when multiple clients retry simultaneously. The AWS SDK implements exponential backoff with jitter by default. DynamoDB Auto Scaling can also be considered to automatically adjust WCUs based on traffic.",
      "Switching to on-demand capacity mode avoids throttling, but for predictable workloads, provisioned capacity mode is more cost-efficient.",
      "Increasing WCUs avoids throttling but increases costs. Implementing exponential backoff with jitter is more cost-efficient.",
      "GSIs are used to support different query patterns but do not directly help avoid write throttling."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.Errors.html", title: "Error handling with DynamoDB" }
    ]
  },
  {
    id: 89,
    question: "A company has an application running on Amazon EC2 instances. The application periodically downloads large numbers of files from an Amazon S3 bucket. The company wants to reduce data transfer costs from S3.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use a VPC endpoint (Gateway Endpoint).",
      "Use Amazon CloudFront to cache S3 content.",
      "Use S3 Transfer Acceleration.",
      "Place the S3 bucket in the same region as the EC2 instances."
    ],
    correctAnswer: 3,
    category: "Storage",
    explanation: "Placing the S3 bucket in the same region as the EC2 instances avoids inter-region data transfer costs. Data transfer within the same region is free.",
    optionExplanations: [
      "A VPC endpoint allows access to S3 without going through an internet gateway or NAT gateway, but data transfer within the same region is already free.",
      "CloudFront is suitable for delivering content to end users, but placing resources in the same region is more effective for reducing data transfer costs from EC2 to S3.",
      "S3 Transfer Acceleration speeds up long-distance data transfers but incurs additional charges and does not reduce costs.",
      "✓ Correct: Placing the S3 bucket in the same region as the EC2 instances avoids inter-region data transfer costs. AWS does not charge for data transfer between EC2 and S3 within the same region. Inter-region data transfers incur data transfer charges (e.g., data transfer from us-east-1 to us-west-2). Placing the application and S3 bucket in the same region completely eliminates data transfer costs. Latency is also lower, improving performance."
    ],
    references: [
      { url: "https://aws.amazon.com/s3/pricing/", title: "Amazon S3 pricing" }
    ]
  },
  {
    id: 90,
    question: "A company has an application running on Amazon EC2 instances. The application periodically retrieves configuration information from AWS Systems Manager Parameter Store. The company wants to audit access to Parameter Store and track who accessed parameters and when.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS CloudTrail to record Parameter Store API calls.",
      "Use Amazon CloudWatch Logs to record Parameter Store access logs.",
      "Use AWS Config to track Parameter Store configuration changes.",
      "Use VPC flow logs to record network traffic to Parameter Store."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Using AWS CloudTrail to record Parameter Store API calls allows tracking of who accessed parameters and when.",
    optionExplanations: [
      "✓ Correct: AWS CloudTrail is an auditing service that records API calls in the AWS account. CloudTrail can record Parameter Store API calls (GetParameter, PutParameter, DeleteParameter, etc.). CloudTrail logs record who (IAM user or role), when (timestamp), which parameter (parameter name), and what operation (API call) was performed. CloudTrail logs are stored in an S3 bucket and can also be sent to CloudWatch Logs for real-time monitoring. AWS Athena can also be used to query and analyze CloudTrail logs. It is essential for meeting compliance and audit requirements.",
      "CloudWatch Logs is used for recording application logs, but for auditing Parameter Store API calls, CloudTrail is more appropriate.",
      "AWS Config tracks configuration changes to AWS resources, but for auditing Parameter Store API calls, CloudTrail is more appropriate.",
      "VPC flow logs record network traffic, but for auditing Parameter Store API calls, CloudTrail is more appropriate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-cloudtrail-logs.html", title: "Logging AWS Systems Manager API calls with AWS CloudTrail" }
    ]
  },
  {
    id: 91,
    question: "A company has a web application running on Amazon EC2 instances. The application is behind an Application Load Balancer (ALB) and uses HTTPS connections. The company wants to simplify SSL/TLS certificate management and enable automatic renewal.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Obtain a certificate from Let's Encrypt and install it on EC2 instances.",
      "Use AWS Certificate Manager (ACM) to issue a certificate and attach it to the ALB.",
      "Create a self-signed certificate and attach it to the ALB.",
      "Purchase a certificate from a third-party certificate authority and attach it to the ALB."
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "Using AWS Certificate Manager (ACM) to issue a certificate and attach it to the ALB simplifies certificate management and enables automatic renewal.",
    optionExplanations: [
      "Obtaining a certificate from Let's Encrypt is possible, but manual renewal is required. ACM is easier to manage.",
      "✓ Correct: AWS Certificate Manager (ACM) is a service that simplifies the issuance, management, and deployment of SSL/TLS certificates. ACM can be used to issue public certificates for free and attach them to services such as ALB, CloudFront, and API Gateway. ACM supports automatic certificate renewal and automatically issues and deploys new certificates as they approach expiration. This prevents service outages caused by expired certificates. ACM also supports wildcard certificates for multiple subdomains. Certificate management is fully automated, significantly reducing operational overhead.",
      "Self-signed certificates display warnings in browsers and are not suitable for production environments.",
      "Purchasing a certificate from a third-party certificate authority is possible, but it incurs costs and requires manual renewal. ACM is free and automatically renewed."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html", title: "What is AWS Certificate Manager?" }
    ]
  },
  {
    id: 92,
    question: "A company has an application running on Amazon EC2 instances. The application periodically writes log files to an Amazon S3 bucket. The company wants to automatically trigger an AWS Lambda function when log files are written to analyze the logs.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Amazon CloudWatch Events to periodically trigger the Lambda function.",
      "Use AWS Step Functions to manage the log analysis workflow.",
      "Use an Amazon SQS queue to add log file paths and have the Lambda function poll the queue.",
      "Configure S3 event notifications to trigger the Lambda function when objects are created."
    ],
    correctAnswer: 3,
    category: "Application Integration",
    explanation: "Configuring S3 event notifications to trigger a Lambda function when objects are created allows logs to be automatically analyzed when log files are written.",
    optionExplanations: [
      "Using CloudWatch Events to trigger periodically is possible, but S3 event notifications are more appropriate for triggering in real time when log files are written.",
      "Step Functions is suitable for managing complex workflows, but S3 event notifications are more appropriate for simple log analysis.",
      "Using an SQS queue is possible, but using S3 event notifications is simpler and allows direct Lambda function triggering.",
      "✓ Correct: S3 event notifications send notifications to Lambda functions, SNS topics, or SQS queues when events (object creation, deletion, restoration, etc.) occur in an S3 bucket. Configuring object creation events (s3:ObjectCreated:*) causes the Lambda function to be automatically triggered when log files are written to S3. The Lambda function receives event information (bucket name, object key, etc.) and can retrieve and analyze log files. Processing is performed in real time with minimal delay. Prefix and suffix filters can also be used to filter specific log files."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html", title: "Amazon S3 Event Notifications" }
    ]
  },
  {
    id: 93,
    question: "A company has an application running on Amazon EC2 instances. The application periodically reads data from an Amazon DynamoDB table, and read consistency is important. The company wants to ensure it always retrieves the latest data.\n\nWhich DynamoDB read option should a solutions architect recommend to meet these requirements?",
    options: [
      "Strongly Consistent Read",
      "Eventually Consistent Read",
      "Transactional Read",
      "Batch Read"
    ],
    correctAnswer: 0,
    category: "Database",
    explanation: "Using Strongly Consistent Read guarantees that the latest data is always retrieved.",
    optionExplanations: [
      "✓ Correct: Strongly Consistent Read guarantees that data reflecting the most recent writes is returned. DynamoDB uses Eventually Consistent Read by default, but setting the ConsistentRead parameter to true in GetItem or Query enables Strongly Consistent Read. Strongly Consistent Read waits for responses from all replicas, so it has higher latency than Eventually Consistent Read and consumes twice as many RCUs (Read Capacity Units). However, it is essential when the latest data must be reliably retrieved.",
      "Eventually Consistent Read may not return the latest data. Strongly Consistent Read is more reliable for retrieving the latest data.",
      "Transactional Read is used when multiple items need to be read atomically, but Strongly Consistent Read is more appropriate for retrieving the latest data for a single item.",
      "Batch Read is an efficient method for reading multiple items at once, but it is a separate concept from read consistency."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html", title: "Read consistency" }
    ]
  },
  {
    id: 94,
    question: "A company has an application running on Amazon EC2 instances. The application periodically sends large amounts of data to an Amazon Kinesis data stream. The company wants to improve the throughput of the Kinesis data stream.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Amazon Kinesis Data Firehose.",
      "Increase the retention period of the Kinesis data stream.",
      "Increase the number of shards in the Kinesis data stream.",
      "Use an Amazon SQS queue."
    ],
    correctAnswer: 2,
    category: "Application Integration",
    explanation: "Increasing the number of shards in the Kinesis data stream improves throughput. Each shard supports 1 MB/s write and 2 MB/s read.",
    optionExplanations: [
      "Kinesis Data Firehose is a service that delivers data to S3, Redshift, Elasticsearch, and other destinations. For real-time streaming processing, Kinesis Data Streams is more appropriate.",
      "Increasing the retention period extends how long data is stored but does not affect throughput.",
      "✓ Correct: Increasing the number of shards in the Kinesis data stream improves throughput. Each shard supports 1 MB/s write throughput, 1,000 records/s write rate, and 2 MB/s read throughput. The data stream's throughput is proportional to the number of shards. For example, a stream with 10 shards supports 10 MB/s write throughput. The shard count can be dynamically scaled up or down using the UpdateShardCount API. Application Auto Scaling can also be used to automatically adjust the shard count based on traffic.",
      "SQS is a message queuing service. For real-time streaming data processing, Kinesis is more appropriate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html", title: "Amazon Kinesis Data Streams Terminology and Concepts" }
    ]
  },
  {
    id: 95,
    question: "A company has an application running on Amazon EC2 instances. The application connects to an Amazon RDS for MySQL database. The company wants to periodically rotate the database password to improve security.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS Systems Manager Parameter Store to store the password and rotate it manually.",
      "Store the password in an Amazon S3 bucket and update it periodically.",
      "Use AWS Secrets Manager to store the password and configure automatic rotation.",
      "Use an IAM role to connect to the database."
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "Using AWS Secrets Manager to store the password and configure automatic rotation improves security.",
    optionExplanations: [
      "Using Parameter Store is possible, but it does not support automatic rotation. Secrets Manager supports automatic rotation.",
      "Storing the password in an S3 bucket carries a high security risk and does not provide automatic rotation.",
      "✓ Correct: AWS Secrets Manager is a service for securely storing and managing database credentials, API keys, and other sensitive information. Secrets Manager supports automatic rotation of passwords for databases such as RDS, Redshift, and DocumentDB. Setting a rotation schedule (e.g., every 30 days) causes Secrets Manager to automatically invoke a Lambda function to generate a new password and update both the database and Secrets Manager. Applications can use the Secrets Manager API to always retrieve the latest password. This automates periodic password rotation and improves security.",
      "Using an IAM role to connect to the database is possible in combination with RDS Proxy, but it is not supported for all database engines. Secrets Manager is more versatile."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html", title: "Rotating your AWS Secrets Manager secrets" }
    ]
  },
  {
    id: 96,
    question: "A company has a web application running on Amazon EC2 instances. The application stores files uploaded by users in an Amazon S3 bucket. The company wants to protect files in the S3 bucket from accidental deletion.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use an S3 bucket policy to deny delete operations.",
      "Use an IAM policy to restrict delete permissions.",
      "Use S3 Object Lock.",
      "Enable S3 Versioning and configure MFA Delete."
    ],
    correctAnswer: 3,
    category: "Storage",
    explanation: "Enabling S3 Versioning and configuring MFA Delete protects files from accidental deletion.",
    optionExplanations: [
      "Using an S3 bucket policy to deny delete operations is possible, but an administrator can modify the policy, so it does not provide complete protection.",
      "Using an IAM policy to restrict delete permissions is effective, but an administrator can modify the policy. MFA Delete provides stronger protection.",
      "S3 Object Lock uses a WORM (Write Once Read Many) model to prevent objects from being deleted for a specified period, but versioning and MFA Delete are more flexible for protecting against accidental deletion.",
      "✓ Correct: Enabling S3 Versioning retains previous versions of objects, allowing recovery even if they are accidentally deleted. Additionally, configuring MFA Delete (Multi-Factor Authentication Delete) requires authentication with an MFA device when permanently deleting an object version or disabling versioning. This protects against accidental or malicious deletion. MFA Delete can only be configured by the root account of the bucket owner, providing a high level of security. A delete marker is added, but the actual data is retained."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html", title: "Using versioning in S3 buckets" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html", title: "Configuring MFA delete" }
    ]
  },
  {
    id: 97,
    question: "A company has an application running on Amazon EC2 instances. The application periodically invokes AWS Lambda functions to perform data processing. Lambda function execution time is long and timeouts sometimes occur.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use Amazon ECS on Fargate to run long-running tasks.",
      "Split Lambda functions into multiple smaller functions and chain them with AWS Step Functions.",
      "Increase the Lambda function memory size.",
      "Set the Lambda function timeout to the maximum value (15 minutes)."
    ],
    correctAnswer: 0,
    category: "Compute",
    explanation: "Using Amazon ECS on Fargate to run long-running tasks avoids the Lambda function timeout limit.",
    optionExplanations: [
      "✓ Correct: Amazon ECS on Fargate is a serverless container execution environment suitable for long-running tasks. Lambda functions have a maximum execution time of 15 minutes, but ECS on Fargate has no execution time limit. Long-running data processing tasks (e.g., video encoding, large-scale data analysis) are better suited to run on ECS on Fargate. Fargate requires no server management; you simply specify the required CPU and memory to run containers. It also supports Auto Scaling, automatically scaling based on traffic.",
      "Splitting Lambda functions into multiple smaller functions and chaining them with Step Functions is a valid approach, but if processing is inherently long-running, ECS on Fargate is more appropriate.",
      "Increasing Lambda function memory size improves execution speed, but for inherently long-running processing, ECS on Fargate is more appropriate.",
      "Setting the Lambda function timeout to the maximum value (15 minutes) is possible, but if timeouts still occur, another solution is needed."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html", title: "Lambda quotas" }
    ]
  },
  {
    id: 98,
    question: "A company has an application running on Amazon EC2 instances. The application connects to an Amazon ElastiCache for Redis cluster. The company wants to improve Redis cluster availability and minimize downtime during failover.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Increase the number of nodes in the Redis cluster.",
      "Enable Multi-AZ deployment for the Redis cluster.",
      "Upgrade the Redis cluster instance type.",
      "Create multiple Redis clusters and load balance with the application."
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "Enabling Multi-AZ deployment for the Redis cluster improves availability and minimizes downtime during failover.",
    optionExplanations: [
      "Increasing the number of nodes in the Redis cluster improves read performance, but Multi-AZ deployment is more effective for improving availability.",
      "✓ Correct: Enabling Multi-AZ deployment for the Redis cluster improves availability and minimizes downtime during failover. In Multi-AZ deployment, the primary node and one or more replica nodes are placed in different Availability Zones. If the primary node fails, ElastiCache automatically promotes a replica node to primary and performs failover. Failover typically completes within a few minutes, and applications can continue connecting using the same endpoint. Automatic backups and point-in-time recovery are also supported.",
      "Upgrading the instance type improves performance, but Multi-AZ deployment is more effective for improving availability.",
      "Creating multiple Redis clusters and load balancing with the application is possible, but Multi-AZ deployment is easier to manage and supports automatic failover."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/AutoFailover.html", title: "Minimizing downtime in ElastiCache for Redis with Multi-AZ" }
    ]
  },
  {
    id: 99,
    question: "A company has an application running on Amazon EC2 instances. The application periodically reads large numbers of files from an Amazon S3 bucket. The company wants to improve read performance from S3.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Enable S3 Transfer Acceleration.",
      "Use Amazon CloudFront to cache S3 content.",
      "Use appropriate prefixes for files in the S3 bucket to distribute requests.",
      "Place the S3 bucket in the same Availability Zone as the EC2 instances."
    ],
    correctAnswer: 2,
    category: "Storage",
    explanation: "Using appropriate prefixes for files in the S3 bucket to distribute requests improves read performance from S3.",
    optionExplanations: [
      "S3 Transfer Acceleration speeds up long-distance data transfers, but distributing prefixes is more effective for improving read performance within the same region.",
      "CloudFront is suitable for delivering content to end users, but distributing prefixes is more effective for improving read performance from EC2 to S3.",
      "✓ Correct: Using appropriate prefixes for files in the S3 bucket to distribute requests improves read performance from S3. S3 supports 3,500 PUT requests/s and 5,500 GET requests/s per prefix. Distributing files across multiple prefixes (e.g., bucket/prefix1/, bucket/prefix2/, bucket/prefix3/) increases total throughput. For example, using 10 prefixes supports 55,000 GET requests/s. Using parallel requests to download multiple files simultaneously is also effective.",
      "S3 is a region-level service and cannot be placed in a specific Availability Zone."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html", title: "Best practices design patterns: optimizing Amazon S3 performance" }
    ]
  },
  {
    id: 100,
    question: "A company has an application running on Amazon EC2 instances. The application periodically invokes AWS Lambda functions to perform data processing. The company wants to reduce Lambda function execution costs.\n\nWhich solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Optimize Lambda function code to reduce execution time.",
      "Reduce the Lambda function memory size.",
      "Reduce the Lambda function timeout.",
      "Purchase Lambda Savings Plans."
    ],
    correctAnswer: 0,
    category: "Compute",
    explanation: "Optimizing Lambda function code to reduce execution time lowers execution costs. Lambda pricing is calculated based on execution time and memory size.",
    optionExplanations: [
      "✓ Correct: Optimizing Lambda function code to reduce execution time lowers execution costs. Lambda pricing is calculated based on the product of execution time (in milliseconds) and memory size (in GB) (GB-seconds). Optimizing code reduces execution time and costs. Optimization methods include removing unnecessary library imports, using efficient algorithms, minimizing calls to external APIs, using connection pooling, and using Lambda Layers to share common code. Selecting an appropriate memory size is also important. Increasing memory size also increases CPU power, which may reduce execution time.",
      "Reducing Lambda function memory size lowers costs, but may increase execution time. Optimizing code is more effective for overall cost reduction.",
      "Reducing the timeout only forcibly terminates functions with long execution times and does not reduce costs.",
      "Purchasing Lambda Savings Plans enables long-term cost reduction, but optimizing code first is more immediately effective."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html", title: "Best practices for working with AWS Lambda functions" }
    ]
  }
];
