// AWS Solutions Architect Professional Practice Questions
const awsSAPQuestions = [
  {
    id: 1,
    question: "A company has multiple AWS accounts managed through AWS Organizations. One account was recently compromised, and an attacker launched numerous instances, resulting in a high bill. The company has addressed the security breach but needs a solution to prevent excessive spending across all accounts. Each business group wants to maintain full control of its own AWS account.\n\nWhat solution should a solutions architect recommend to meet these requirements?",
    options: [
      "Use AWS Organizations. Add each AWS account to the management account. Create an SCP that uses the ec2:InstanceType condition key to prevent high-cost instance types from being launched in each account.",
      "Create a new customer-managed IAM policy and attach it to IAM groups in each account. Configure the policy to use the ec2:InstanceType condition key to prevent high-cost instance types from being launched. Place all existing IAM users into each group.",
      "Enable billing alerts for each AWS account. Create Amazon CloudWatch alarms that send Amazon SNS notifications to the account administrator whenever an account exceeds a specified spending threshold.",
      "Enable AWS Cost Explorer in each account. Periodically review the Cost Explorer report for each account to verify that spending does not exceed the desired amount."
    ],
    correctAnswer: 2,
    category: "Cost Optimization",
    explanation: "Billing alarms provide alerts about excessive spending without taking control away from any business group. Options A and B are incorrect because they would restrict instance launches and interfere with each business group's control. Option D is a manual process and does not provide immediate alerts about excessive spending.",
    optionExplanations: [
      "SCPs would restrict which instance types can be launched, which interferes with each business group's desire to maintain full control of their accounts.",
      "Attaching IAM policies to groups can limit instance launches, but this also restricts each group's autonomy and requires modifications to every account. It does not address the current over-spend in real time.",
      "✓ Correct: CloudWatch billing alarms send SNS notifications when a spending threshold is exceeded, providing timely alerts without removing control from each business group. Each group retains full autonomy while the company still receives overspend alerts.",
      "Manually reviewing Cost Explorer does not provide timely alerts and relies on periodic human checks, which may miss rapid spending spikes."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html", title: "Creating a billing alarm to monitor your estimated AWS charges" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" }
    ]
  },
  {
    id: 2,
    question: "A solutions architect must integrate a third-party monitoring solution that requires read-only access across all AWS accounts in an AWS Organizations organization. The monitoring solution runs in its own AWS account. The company currently integrates on-premises Active Directory with AWS IAM Identity Center and grants users least-privilege permissions to manage infrastructure across all accounts.\n\nWhat should the solutions architect do to grant the monitoring solution the required permissions?",
    options: [
      "Create a user in the IAM Identity Center directory. Assign a read-only permission set to the user. Assign all AWS accounts that require monitoring to the user. Provide the username and password to the third-party monitoring solution.",
      "Create an IAM role in the organization's management account. Allow the third-party monitoring solution's AWS account to assume the role.",
      "Invite the third-party monitoring solution's AWS account to join the organization. Enable all features.",
      "Create an AWS CloudFormation template that defines a new IAM role for the third-party monitoring solution. Specify the third-party monitoring solution's AWS account in the trust policy. Use StackSets to create the IAM role in all linked AWS accounts."
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "AWS CloudFormation StackSets can deploy IAM roles across multiple accounts in a single operation. Credentials provided by IAM Identity Center are temporary, so Option A would cause the application to lose access and require re-login. Option B grants access only to the management account. Option C does not grant permissions to other accounts when an account joins an organization.",
    optionExplanations: [
      "IAM Identity Center credentials are temporary. The monitoring solution would lose access and need to re-authenticate periodically, which is not suitable for an automated monitoring application.",
      "Creating a role only in the management account grants access to that account alone, not to all linked accounts in the organization.",
      "Inviting an account to the organization does not automatically grant it permissions to access resources in other organization member accounts.",
      "✓ Correct: CloudFormation StackSets deploys IAM roles to all specified accounts in a single operation. The trust policy specifies the monitoring account, enabling cross-account role assumption. This is the standard pattern for granting a third-party tool cross-account read access."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html", title: "Working with AWS CloudFormation StackSets" },
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html", title: "IAM tutorial: Delegate access across AWS accounts using IAM roles" }
    ]
  },
  {
    id: 3,
    question: "A company runs an e-commerce application on Amazon EC2 instances behind an Application Load Balancer. The instances run in an Amazon EC2 Auto Scaling group across multiple Availability Zones. When an order is successfully processed, the application immediately posts order data to a third-party affiliate's external tracking system, which pays a sales commission for order referrals.\n\nDuring a successful marketing promotion, the number of EC2 instances increased from 2 to 20. During this period, the application continued to function correctly. However, the increased request rate overloaded the third-party affiliate, causing requests to fail.\n\nWhich combination of architecture changes should a solutions architect make to ensure the entire process functions correctly under load? (Choose TWO.)",
    options: [
      "Move the code that calls the affiliate into a new AWS Lambda function. Modify the application to invoke the Lambda function asynchronously.",
      "Move the code that calls the affiliate into a new AWS Lambda function. Modify the application to place order data into an Amazon SQS queue. Invoke the Lambda function from the queue.",
      "Increase the timeout of the new AWS Lambda function.",
      "Reduce the reserved concurrency of the new AWS Lambda function.",
      "Increase the memory of the new AWS Lambda function."
    ],
    correctAnswer: [1, 3],
    category: "Application Integration",
    explanation: "Using an SQS queue decouples the main application from the affiliate call, protecting the main application from the affiliate's capacity issues. Reducing the reserved concurrency of the Lambda function limits the number of concurrent calls to the affiliate, preventing it from being overloaded.",
    optionExplanations: [
      "Invoking Lambda asynchronously reduces load on the EC2 instances but does not control the rate at which the affiliate is called. The affiliate could still be overloaded.",
      "✓ Correct: Placing order data in an SQS queue decouples the application from the affiliate call. Failed requests can automatically return to the queue, providing resilience against affiliate capacity issues.",
      "Increasing the Lambda timeout only extends how long Lambda waits for the external call to return. It does not reduce the load on the affiliate application.",
      "✓ Correct: Reducing the reserved concurrency limits the number of simultaneous Lambda invocations, which controls the call rate to the affiliate and prevents it from being overwhelmed.",
      "Increasing Lambda memory improves Lambda's own compute performance but has no effect on the interaction between Lambda and the affiliate tracking system."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html", title: "Using Lambda with Amazon SQS" },
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html", title: "Managing Lambda reserved concurrency" }
    ]
  },
  {
    id: 4,
    question: "A company built an online ticket-issuing web application on AWS. The application is hosted on AWS App Runner and uses an image stored in an Amazon ECR repository. Application data is stored in an Amazon Aurora MySQL DB cluster. The company has configured a domain name in Amazon Route 53.\n\nThe application needs to be deployed to two AWS Regions in an Active-Active configuration.\n\nWhich combination of steps meets these requirements with the LEAST amount of architectural change? (Choose THREE.)",
    options: [
      "Configure cross-Region replication of the ECR image to the second Region.",
      "Create a VPC endpoint from the ECR repository in the second Region.",
      "Edit the App Runner configuration to add a second deployment target in the second Region.",
      "Deploy App Runner to the second Region. Configure a Route 53 latency routing policy.",
      "Change the database to use Amazon DynamoDB global tables for the desired two Regions.",
      "Use an Aurora global database with write forwarding enabled in the second Region."
    ],
    correctAnswer: [0, 3, 5],
    category: "High Availability and Disaster Recovery",
    explanation: "Cross-Region ECR replication copies the image to the second Region. Route 53 latency routing distributes traffic to both regions. Aurora global database supports multi-Region replication with write forwarding, which requires less architectural change than migrating to DynamoDB.",
    optionExplanations: [
      "✓ Correct: Cross-Region replication creates a copy of the ECR repository in the second Region, so App Runner in that Region can pull the image locally.",
      "VPC endpoints for ECR do not enable access to images stored in a different Region. This option would not solve the cross-Region image access problem.",
      "App Runner does not have a configuration option to add a second deployment target in another Region. Each App Runner service is regional.",
      "✓ Correct: Deploying App Runner to the second Region creates an Active-Active setup, and a Route 53 latency routing policy routes users to the nearest healthy endpoint.",
      "Migrating from Aurora MySQL to DynamoDB requires significant application and data model changes, which violates the requirement for minimal architectural change.",
      "✓ Correct: An Aurora global database replicates data across Regions with low latency. Write forwarding allows the secondary Region to forward writes to the primary Region, supporting an Active-Active pattern with minimal changes to the existing Aurora architecture."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html", title: "Private image replication in Amazon ECR" },
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html", title: "Using Amazon Aurora global databases" },
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html", title: "Latency-based routing" }
    ]
  },
  {
    id: 5,
    question: "A solutions architect is designing a network architecture for a new application that will be deployed across three AWS Regions. The company requires all inter-Region traffic to be encrypted in transit and routed through a central network inspection point in the primary Region. The company also needs to minimize the number of VPCs and Transit Gateways.\n\nWhich solution meets these requirements?",
    options: [
      "Create a VPC in each Region. Deploy a Transit Gateway in each Region. Establish Transit Gateway peering between all Regions. Deploy a network inspection appliance in the primary Region's Transit Gateway.",
      "Create a VPC in each Region. Use VPC peering to connect all VPCs across Regions. Configure route tables to send all inter-Region traffic through an inspection VPC in the primary Region.",
      "Create a VPC in each Region. Deploy a Transit Gateway only in the primary Region. Use AWS Site-to-Site VPN connections to connect the secondary Region VPCs to the primary Transit Gateway.",
      "Create a single VPC in the primary Region. Use AWS Direct Connect to connect the secondary Region workloads to the primary VPC. Deploy a network inspection appliance in the primary VPC."
    ],
    correctAnswer: 0,
    category: "Network Design",
    explanation: "Transit Gateway inter-Region peering provides encrypted connectivity between Regions. Centralizing inspection in the primary Region's Transit Gateway allows all inter-Region traffic to pass through a single inspection point. This architecture minimizes the number of components while meeting encryption and centralized inspection requirements.",
    optionExplanations: [
      "✓ Correct: Transit Gateway inter-Region peering encrypts traffic in transit between Regions. By deploying one Transit Gateway per Region and peering them, all inter-Region traffic can be routed through a centralized network inspection appliance in the primary Region's Transit Gateway attachment.",
      "VPC peering connections are not transitive, meaning you cannot route traffic from one VPC through another peered VPC to a third VPC. This makes centralized inspection difficult to implement with VPC peering alone.",
      "Site-to-Site VPN connections can encrypt traffic, but routing secondary Region VPCs through a Transit Gateway in a different Region using VPN adds latency and complexity compared to Transit Gateway peering.",
      "Using Direct Connect to connect secondary Regions is typically used for on-premises connectivity, not for connecting AWS Regions. This approach also introduces unnecessary complexity."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/tgw/tgw-peering.html", title: "Transit Gateway peering attachments" },
      { url: "https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-appliance-scenario.html", title: "Appliance in a shared services VPC" }
    ]
  },
  {
    id: 6,
    question: "A company runs a serverless mobile application using Amazon API Gateway, AWS Lambda, Amazon Cognito, and Amazon DynamoDB. Users report intermittent system failures during traffic spikes. The API Gateway endpoint is returning HTTP 502 (Bad Gateway) errors for valid requests during these periods.\n\nWhat is the MOST likely cause of this issue, and what should the solutions architect do to fix it?",
    options: [
      "The Lambda function's concurrency limit has been reached. Increase the Lambda function's reserved concurrency quota and configure an Amazon CloudWatch alarm to alert when the ConcurrentExecutions metric approaches the quota.",
      "The API Gateway throttling quota for requests per second has been reached. Configure a CloudWatch alarm on the API Gateway quota. Create a Lambda function that increases the quota when the alarm triggers.",
      "Multiple Amazon Cognito user pools across AWS Regions are causing high latency in user authentication. Shard users across Cognito user pools in multiple Regions to reduce authentication latency.",
      "DynamoDB strongly consistent reads are overloading the database. Switch to eventually consistent reads in the client application to improve throughput."
    ],
    correctAnswer: 0,
    category: "Serverless Architecture",
    explanation: "API Gateway returns HTTP 502 (Bad Gateway) errors when the integrated Lambda function exceeds its concurrency limit and cannot process the request. Increasing the reserved concurrency quota directly resolves the issue. A CloudWatch alarm on ConcurrentExecutions provides proactive monitoring.",
    optionExplanations: [
      "✓ Correct: When a Lambda function hits its concurrency limit, API Gateway receives an error from Lambda and returns a 502 Bad Gateway to the client. Increasing the concurrency quota resolves the root cause. The CloudWatch alarm provides early warning before users are impacted.",
      "When API Gateway's throttling quota is exceeded, it returns HTTP 429 (Too Many Requests), not 502. This option misidentifies the error type.",
      "Authentication latency would cause slow responses or timeouts, not 502 errors. The error occurs during the API Gateway-to-Lambda integration, not during Cognito authentication.",
      "DynamoDB eventually consistent reads improve read throughput but have no effect on the API Gateway-to-Lambda integration, which is the source of the 502 error."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html", title: "Managing Lambda reserved concurrency" },
      { url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/handle-errors-in-lambda-integration.html", title: "Handle Lambda errors in API Gateway" }
    ]
  },
  {
    id: 7,
    question: "A company needs to migrate a large on-premises Oracle database to Amazon Aurora PostgreSQL. The migration must minimize downtime. The database is 20 TB in size and is currently in active use. The company also needs to validate that the migrated data is complete and accurate before cutting over to the new database.\n\nWhich migration strategy should a solutions architect recommend?",
    options: [
      "Use AWS DataSync to replicate the Oracle database files directly to an Amazon S3 bucket. Then import the files into Aurora PostgreSQL using the Aurora import feature.",
      "Use AWS Database Migration Service (AWS DMS) with AWS Schema Conversion Tool (AWS SCT) to perform a full load migration followed by ongoing change data capture (CDC) replication to keep the target database in sync until cutover.",
      "Create an AWS Snowball Edge device order. Export the Oracle database to the Snowball Edge device. Ship the device to AWS. Import the data into Aurora PostgreSQL.",
      "Use Amazon RDS Multi-AZ to create an Oracle read replica. Promote the read replica and then migrate it to Aurora PostgreSQL using a database dump and restore."
    ],
    correctAnswer: 1,
    category: "Migration and Modernization",
    explanation: "AWS DMS with AWS SCT is the recommended approach for heterogeneous database migrations. SCT converts the Oracle schema to PostgreSQL-compatible format, and DMS performs the initial full load followed by CDC to replicate ongoing changes. This approach minimizes downtime because the source database continues to serve production traffic during migration.",
    optionExplanations: [
      "AWS DataSync is designed for file and object storage transfers, not for structured database migrations. It cannot replicate Oracle database transactions or convert schema objects.",
      "✓ Correct: AWS SCT converts the Oracle schema and code objects to PostgreSQL-compatible equivalents. AWS DMS performs the full load to migrate existing data and then uses CDC to continuously replicate changes made during the migration period. This minimizes downtime and enables data validation before cutover.",
      "Snowball Edge is optimized for large-scale offline data transfer to S3, not for live database migrations requiring schema conversion. It also cannot replicate ongoing transactions, resulting in significant downtime.",
      "Amazon RDS does not support cross-engine read replicas (Oracle to Aurora PostgreSQL). This approach is not technically feasible."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.html", title: "What is AWS Database Migration Service?" },
      { url: "https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html", title: "What is the AWS Schema Conversion Tool?" }
    ]
  },
  {
    id: 8,
    question: "A company wants to move to a multi-account strategy using AWS Organizations. The company has a single AWS account that contains all resources for multiple business units. The company requires a solution that:\n- Provides a centralized location for consolidated billing\n- Enforces security guardrails across all accounts\n- Allows each business unit to provision its own resources\n- Enables centralized logging of all API activity\n\nWhich combination of actions should a solutions architect take to meet these requirements? (Choose THREE.)",
    options: [
      "Use AWS Control Tower to set up a landing zone with a management account, a log archive account, and an audit account.",
      "Create service control policies (SCPs) in AWS Organizations to enforce security guardrails and attach them to the appropriate organizational units (OUs).",
      "Configure AWS CloudTrail as an organization trail in the management account to centralize logging of all API activity across all accounts.",
      "Deploy AWS Config in each individual account and manually aggregate the results in the management account.",
      "Create a new AWS account for each business unit and send an invitation through AWS Organizations to add them as member accounts.",
      "Use AWS IAM Identity Center to grant each business unit's users access to only their own account's resources."
    ],
    correctAnswer: [0, 1, 2],
    category: "Governance and Multi-Account Strategy",
    explanation: "AWS Control Tower provides a pre-built landing zone with consolidated billing, a log archive account, and an audit account. SCPs enforce security guardrails while allowing business units to operate within defined limits. An organization-level CloudTrail trail automatically captures API activity across all current and future member accounts.",
    optionExplanations: [
      "✓ Correct: AWS Control Tower automates the setup of a well-architected multi-account environment (landing zone) with built-in guardrails, centralized logging, and consolidated billing through AWS Organizations.",
      "✓ Correct: SCPs define the maximum permissions for accounts and OUs without requiring changes to individual account IAM policies. They enforce company-wide security guardrails while allowing business units to self-provision within the allowed boundaries.",
      "✓ Correct: An organization trail in the management account automatically logs API activity from all member accounts to a central S3 bucket in the log archive account. New accounts added to the organization are automatically included.",
      "Manually aggregating AWS Config data is operationally inefficient. AWS Config supports organization-level aggregation natively, making per-account manual setup unnecessary.",
      "Creating separate accounts and manually inviting them is less efficient than using AWS Control Tower's account vending capabilities, which automate account creation and configuration.",
      "IAM Identity Center is valuable for federated access but does not by itself enforce security guardrails or centralize logging."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html", title: "What is AWS Control Tower?" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" },
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html", title: "Creating a trail for an organization" }
    ]
  },
  {
    id: 9,
    question: "A solutions architect is designing a disaster recovery (DR) solution for a mission-critical application. The application consists of a multi-tier web application running on Amazon EC2 instances and an Amazon Aurora MySQL database. The business requires a Recovery Time Objective (RTO) of less than 15 minutes and a Recovery Point Objective (RPO) of less than 5 minutes.\n\nWhich DR strategy meets these requirements with the LOWEST cost?",
    options: [
      "Implement a multi-site active-active architecture by deploying the full application stack in two AWS Regions and using Amazon Route 53 with a failover routing policy.",
      "Implement a warm standby architecture by running a scaled-down version of the full application in a secondary Region with Aurora cross-Region read replicas.",
      "Implement a pilot light architecture by replicating only the Aurora database to a secondary Region using Aurora global databases and storing AMIs in the secondary Region.",
      "Implement a backup and restore strategy using AWS Backup to back up EC2 instances and Aurora snapshots to a secondary Region every 5 minutes."
    ],
    correctAnswer: 1,
    category: "High Availability and Disaster Recovery",
    explanation: "A warm standby keeps a scaled-down but functional copy of the application running in the secondary Region, enabling rapid scale-up and failover within the 15-minute RTO. Aurora cross-Region read replicas can be promoted within minutes, meeting the 5-minute RPO. This is less expensive than a full active-active deployment while still meeting the RTO/RPO requirements.",
    optionExplanations: [
      "A multi-site active-active architecture meets the RTO and RPO requirements but runs a full duplicate infrastructure continuously, making it the most expensive option.",
      "✓ Correct: A warm standby maintains a scaled-down functional environment in the secondary Region. During a disaster, the standby is scaled up to full capacity. Aurora cross-Region read replicas have replication lag typically under 1 second, meeting the 5-minute RPO. Failover can be completed in minutes, meeting the 15-minute RTO at a lower cost than active-active.",
      "A pilot light keeps only the core database infrastructure running. EC2 instances must be launched from AMIs during a failover, which typically takes more than 15 minutes and would not meet the RTO requirement.",
      "Backup and restore typically results in RTOs of hours, not minutes, because EC2 instances must be restored from backups after a failure. This approach cannot meet the 15-minute RTO requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html", title: "Disaster recovery options in the cloud" },
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html", title: "Using Amazon Aurora global databases" }
    ]
  },
  {
    id: 10,
    question: "A company is running a data analytics pipeline that ingests events from hundreds of IoT devices. Each device sends between 50 KB and 450 KB of data per second. Device IDs are used as partition keys in Amazon Kinesis Data Streams, so each device gets its own shard. AWS Lambda functions poll the shards and store results in Amazon S3. Another Lambda function queries the results hourly using Amazon Athena to identify outliers and places them in an Amazon SQS queue. An Amazon EC2 Auto Scaling group with two instances processes each outlier in 30 seconds, with an average of 10 outliers per hour.\n\nWhich combination of changes would MOST reduce the cost of this application? (Choose TWO.)",
    options: [
      "Change the Auto Scaling group launch configuration to use a smaller instance type within the same instance family.",
      "Replace the Auto Scaling group with a Lambda function that is invoked when messages arrive in the SQS queue.",
      "Reconfigure the devices and data stream to use a ratio of 10 devices per shard.",
      "Reconfigure the devices and data stream to use a ratio of 2 devices per shard.",
      "Change the Auto Scaling group's target capacity to one EC2 instance."
    ],
    correctAnswer: [1, 3],
    category: "Cost Optimization",
    explanation: "Replacing the Auto Scaling group with Lambda eliminates the cost of EC2 instances that are idle for most of the hour (3,300 out of 3,600 seconds). Using 2 devices per shard reduces the number of shards by half, cutting Kinesis Data Streams shard-hour costs while staying within the 1 MB/s per shard capacity limit (2 devices × 450 KB max = 900 KB/s < 1 MB/s).",
    optionExplanations: [
      "Using a smaller instance type reduces per-hour cost but still charges for idle EC2 instances. With only 300 seconds of active processing per hour, you would still pay for approximately 3,300 seconds of idle time per instance.",
      "✓ Correct: Lambda charges only for actual compute time used. With 10 outliers × 30 seconds each = 300 seconds of processing per hour, Lambda costs are far lower than running two EC2 instances continuously for an hour.",
      "Consolidating 10 devices per shard would exceed the 1 MB/s shard capacity limit (10 devices × 450 KB max = 4,500 KB/s >> 1,024 KB/s limit). This is not technically feasible.",
      "✓ Correct: Using 2 devices per shard reduces the total shard count by half, cutting Kinesis Data Streams costs. With a maximum of 2 × 450 KB = 900 KB/s per shard, this remains within the 1 MB/s shard capacity limit.",
      "Reducing to one EC2 instance still incurs continuous EC2 charges with only 300 seconds of actual processing per hour. Lambda would be significantly cheaper."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html", title: "Amazon Kinesis Data Streams key concepts" },
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html", title: "Using Lambda with Amazon SQS" }
    ]
  }
,
  {
    id: 11,
    question: "A company runs a critical inventory management system on premises. The system uses an Oracle database and must remain operational 24/7. The company wants to migrate the system to AWS with minimal changes to the application code. The system must continue to support Oracle-specific stored procedures and functions. The company wants to reduce database administration overhead after migration.\n\nWhich solution meets these requirements?",
    options: [
      "Migrate the Oracle database to Amazon Aurora PostgreSQL using AWS Database Migration Service (AWS DMS) and AWS Schema Conversion Tool (AWS SCT).",
      "Migrate the Oracle database to Amazon RDS for Oracle using AWS Database Migration Service (AWS DMS) with Multi-AZ deployment enabled.",
      "Migrate the Oracle database to Amazon DynamoDB using AWS DMS for the initial load and AWS Glue for ongoing replication.",
      "Migrate the Oracle database to Amazon Redshift using AWS DMS for the full load and configure Redshift Spectrum for query access."
    ],
    correctAnswer: 1,
    category: "Migration and Modernization",
    explanation: "Amazon RDS for Oracle supports Oracle-specific features including stored procedures and functions, allowing the application to migrate without code changes. Multi-AZ deployment provides high availability. RDS reduces database administration overhead by managing patching, backups, and failover automatically.",
    optionExplanations: [
      "Migrating to Aurora PostgreSQL requires schema conversion and rewriting Oracle-specific stored procedures and functions into PostgreSQL syntax. This contradicts the requirement of minimal application code changes.",
      "✓ Correct: Amazon RDS for Oracle preserves full Oracle compatibility, including stored procedures, functions, and Oracle-specific SQL features. AWS DMS handles the data migration. Multi-AZ deployment provides automatic failover. RDS eliminates hardware provisioning, OS patching, and database installation tasks.",
      "DynamoDB is a NoSQL key-value and document database. It does not support SQL, stored procedures, or relational data models, making it incompatible with Oracle applications.",
      "Amazon Redshift is an OLAP data warehouse optimized for analytical queries, not OLTP workloads like inventory management. It does not support Oracle stored procedures."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Oracle.html", title: "Oracle on Amazon RDS" },
      { url: "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.Oracle.html", title: "Using Oracle as a source for AWS DMS" }
    ]
  },
  {
    id: 12,
    question: "A company has a web application running on Amazon EC2 instances behind an Application Load Balancer (ALB). The application serves users across multiple countries. The security team has identified that the application is receiving a large volume of malicious HTTP requests from specific IP ranges and is being targeted by SQL injection attacks in query string parameters.\n\nWhich solution should a solutions architect implement to protect the application with the LEAST operational overhead?",
    options: [
      "Deploy the application behind Amazon CloudFront. Associate an AWS WAF web ACL with the CloudFront distribution. Configure IP match conditions to block the malicious IP ranges and add AWS managed rule groups for SQL injection protection.",
      "Configure security groups on the EC2 instances to deny inbound traffic from the malicious IP ranges. Install a web application firewall software on each EC2 instance to inspect HTTP requests for SQL injection patterns.",
      "Create AWS Lambda functions triggered by ALB access logs in Amazon S3 to detect and block malicious IP addresses by updating security group rules.",
      "Configure network ACLs on the VPC subnets to block the malicious IP ranges. Deploy Amazon Inspector on all EC2 instances to scan for SQL injection vulnerabilities."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS WAF integrated with CloudFront provides centralized protection at the edge. Managed rule groups for SQL injection detection are maintained by AWS, requiring no rule authoring. IP match conditions block known malicious IP ranges. This approach has the least operational overhead compared to per-instance solutions.",
    optionExplanations: [
      "✓ Correct: CloudFront with AWS WAF blocks malicious traffic at the edge before it reaches the origin. AWS managed rule groups for SQL injection are pre-built and automatically updated by AWS, minimizing operational overhead. IP match conditions handle the IP-based blocking requirement in a single centralized configuration.",
      "Updating security groups per instance does not scale and requires manual updates as malicious IPs change. Installing WAF software on each instance adds significant management overhead and does not benefit from centralized management.",
      "This approach introduces significant latency between log delivery and rule updates, leaving the application exposed during the delay. Updating security groups via Lambda is operationally complex and does not address SQL injection.",
      "Network ACLs can block IP ranges but do not inspect HTTP payload for SQL injection patterns. Amazon Inspector assesses vulnerabilities in the application code and OS, not real-time HTTP traffic filtering."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html", title: "What is AWS WAF?" },
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-use-case.html", title: "AWS managed rule groups" }
    ]
  },
  {
    id: 13,
    question: "A company operates a multi-tier application in AWS. The application tier runs on Amazon EC2 instances in a private subnet and needs to call several AWS service APIs (Amazon S3, Amazon DynamoDB, and AWS Secrets Manager). The security team requires that no traffic from the application tier should traverse the public internet.\n\nWhich solution meets these requirements with the LEAST cost?",
    options: [
      "Deploy a NAT gateway in a public subnet. Update the route table for the private subnet to route all outbound traffic through the NAT gateway.",
      "Create VPC endpoints for Amazon S3 and Amazon DynamoDB as gateway endpoints, and create an interface endpoint for AWS Secrets Manager.",
      "Use AWS Direct Connect to establish a dedicated connection from the VPC to all required AWS services.",
      "Deploy AWS PrivateLink for all three services and configure private hosted zones in Amazon Route 53 to resolve service DNS names to the PrivateLink endpoints."
    ],
    correctAnswer: 1,
    category: "Network Design",
    explanation: "Gateway endpoints for S3 and DynamoDB are free and route traffic through the AWS network without internet traversal. An interface endpoint (AWS PrivateLink) for Secrets Manager incurs a small hourly charge but keeps traffic off the internet. This combination meets the security requirement at the lowest possible cost.",
    optionExplanations: [
      "A NAT gateway routes traffic to AWS service public endpoints through AWS-managed infrastructure, but the traffic still exits the VPC toward public endpoints. NAT gateways also incur data processing and hourly charges, making this more expensive than VPC endpoints for AWS services.",
      "✓ Correct: S3 and DynamoDB gateway endpoints are free and route traffic within the AWS network. The Secrets Manager interface endpoint uses AWS PrivateLink with a small hourly charge but keeps traffic private. This is the most cost-effective approach that satisfies the no-public-internet requirement.",
      "AWS Direct Connect is used to connect on-premises networks to AWS, not to route VPC-to-AWS-service traffic. It does not apply to this use case and would be extremely costly.",
      "S3 and DynamoDB support free gateway endpoints; using interface endpoints (PrivateLink) for them instead would incur unnecessary hourly charges. This option is not the lowest cost solution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html", title: "Gateway endpoints" },
      { url: "https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html", title: "Access AWS services through AWS PrivateLink" }
    ]
  },
  {
    id: 14,
    question: "A company uses AWS CloudFormation to manage its infrastructure. The company has multiple environments (development, staging, and production) with slightly different configurations. The infrastructure team wants to deploy the same CloudFormation template across all environments while customizing specific settings such as instance types, VPC CIDR blocks, and database passwords for each environment. The team also wants to store sensitive values securely.\n\nWhich approach should a solutions architect recommend?",
    options: [
      "Create a separate CloudFormation template for each environment. Use a CI/CD pipeline to deploy each template to the corresponding environment.",
      "Use CloudFormation parameters for instance types and VPC CIDR blocks. Store database passwords in AWS Secrets Manager and reference them in the template using dynamic references.",
      "Hardcode environment-specific values directly into the CloudFormation template and use stack tags to identify which environment each stack belongs to.",
      "Use AWS OpsWorks to manage environment-specific configurations and deploy the CloudFormation stacks using OpsWorks lifecycle events."
    ],
    correctAnswer: 1,
    category: "Deployment and Infrastructure as Code",
    explanation: "CloudFormation parameters allow a single template to be reused across environments with different values passed at deployment time. Dynamic references (ssm-secure or secretsmanager) allow sensitive values like database passwords to be retrieved securely from AWS Secrets Manager without exposing them in the template or parameter files.",
    optionExplanations: [
      "Maintaining separate templates per environment creates duplicated code and increases the risk of configuration drift between environments. Any update must be applied to all templates separately.",
      "✓ Correct: Parameters make the template reusable across environments by accepting different values at deployment time. Dynamic references ({{resolve:secretsmanager:...}}) retrieve sensitive values directly from Secrets Manager at stack creation/update, keeping passwords out of template files and CloudFormation parameter files.",
      "Hardcoding environment-specific values prevents template reuse and exposes sensitive data such as passwords in the template, which may be stored in version control.",
      "AWS OpsWorks is a configuration management service that uses Chef or Puppet. It adds unnecessary complexity for this use case, which is well-served by native CloudFormation capabilities."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html", title: "Parameters in CloudFormation templates" },
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html", title: "Using dynamic references to specify template values" }
    ]
  },
  {
    id: 15,
    question: "A financial services company runs a transaction processing application on AWS. The application writes every transaction to an Amazon RDS for MySQL Multi-AZ database. The company's compliance team requires all database activity including SELECT, INSERT, UPDATE, and DELETE statements to be logged and stored for audit purposes for at least 7 years. The logs must be tamper-proof.\n\nWhich solution meets these requirements?",
    options: [
      "Enable RDS Enhanced Monitoring. Send monitoring logs to Amazon CloudWatch Logs. Create a CloudWatch Logs subscription filter to forward logs to Amazon S3 with Object Lock enabled.",
      "Enable the RDS general log and slow query log. Publish database logs to Amazon CloudWatch Logs. Export logs to an Amazon S3 bucket with S3 Object Lock in Compliance mode configured with a 7-year retention period.",
      "Enable AWS CloudTrail data events for the RDS database. Configure CloudTrail to deliver logs to an Amazon S3 bucket with versioning enabled.",
      "Create an AWS Lambda function triggered by RDS events to capture and store all database queries in Amazon DynamoDB with TTL set to 7 years."
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "The RDS general log captures all SQL statements including SELECT, INSERT, UPDATE, and DELETE. Publishing to CloudWatch Logs and exporting to S3 with Object Lock in Compliance mode prevents anyone, including AWS, from deleting or modifying the logs before the retention period expires, providing tamper-proof storage for the required 7 years.",
    optionExplanations: [
      "RDS Enhanced Monitoring captures OS-level metrics (CPU, memory, disk I/O) for the DB instance, not SQL query activity. This option does not fulfill the requirement to log SQL statements.",
      "✓ Correct: The RDS general log records all SQL statements executed on the database. Publishing logs to CloudWatch Logs and exporting to S3 with Object Lock in Compliance mode ensures the logs cannot be deleted or modified by any user, including the root account, until the retention period expires.",
      "AWS CloudTrail records AWS API calls (RDS management plane operations like CreateDBInstance, ModifyDBInstance) but does not capture individual SQL statements executed inside the database.",
      "RDS events are instance-level operational events (failover, storage full, etc.), not SQL query events. Lambda cannot intercept and log individual SQL statements at the database engine level."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.MySQL.GeneralLog.html", title: "MySQL general log" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html", title: "Using S3 Object Lock" }
    ]
  },
  {
    id: 16,
    question: "A company wants to implement a hybrid cloud architecture. The company has an on-premises data center and multiple AWS accounts managed through AWS Organizations. The company requires:\n- Consistent network connectivity between on-premises and all AWS accounts\n- Centralized management of network routing\n- Ability to add new AWS accounts without reconfiguring on-premises network equipment\n\nWhich solution meets these requirements?",
    options: [
      "Create an AWS Site-to-Site VPN connection from the on-premises data center to each AWS account's VPC. Configure static routing on all VPN connections.",
      "Use AWS Transit Gateway with AWS Transit Gateway Network Manager. Connect the on-premises data center to the Transit Gateway using AWS Direct Connect with a transit virtual interface. Share the Transit Gateway with all AWS accounts using AWS Resource Access Manager (AWS RAM).",
      "Deploy AWS Direct Connect connections from the on-premises data center to each AWS account individually. Configure BGP routing on each connection.",
      "Create a hub-and-spoke VPC architecture. Deploy a central hub VPC with an internet gateway and VPN connection to on-premises. Peer all spoke VPCs to the hub VPC using VPC peering."
    ],
    correctAnswer: 1,
    category: "Network Design",
    explanation: "AWS Transit Gateway with Direct Connect transit VIF provides high-bandwidth, consistent connectivity to all accounts through a single on-premises connection. Sharing the Transit Gateway via AWS RAM allows new accounts to attach their VPCs without modifying on-premises equipment. Transit Gateway Network Manager provides centralized routing visibility and management.",
    optionExplanations: [
      "Creating a VPN connection per account requires on-premises VPN equipment to maintain a tunnel to every AWS account. Adding a new account requires on-premises reconfiguration, violating the third requirement.",
      "✓ Correct: A single Direct Connect transit VIF connects on-premises to the Transit Gateway. All AWS accounts attach their VPCs to the shared Transit Gateway via AWS RAM. New accounts only need to attach their VPC to the Transit Gateway — no on-premises reconfiguration required. Transit Gateway Network Manager provides centralized routing management.",
      "Deploying a separate Direct Connect connection per account is expensive and does not support centralized routing management. Each new account would require a new physical connection to the data center.",
      "VPC peering is not transitive. A hub-and-spoke model with VPC peering requires all inter-spoke traffic to route through the hub VPC, which does not provide centralized routing management and requires changes for each new account."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/tgw/tgw-transit-gateways.html", title: "What is a transit gateway?" },
      { url: "https://docs.aws.amazon.com/ram/latest/userguide/shareable.html", title: "Shareable AWS resources" }
    ]
  },
  {
    id: 17,
    question: "A company has a microservices application deployed on Amazon ECS using AWS Fargate. Each service writes logs to Amazon CloudWatch Logs. The operations team needs to aggregate logs from all services, apply transformations to filter sensitive data (credit card numbers and social security numbers), and deliver the processed logs to both Amazon OpenSearch Service for real-time analysis and Amazon S3 for long-term retention.\n\nWhich solution should a solutions architect recommend?",
    options: [
      "Create a CloudWatch Logs subscription filter for each log group that delivers logs directly to Amazon OpenSearch Service. Create a separate subscription filter that delivers logs to Amazon S3 via Amazon Kinesis Data Firehose.",
      "Use Amazon Kinesis Data Firehose as the single destination for all CloudWatch Logs subscription filters. Configure a Lambda function for data transformation within Firehose to remove sensitive data. Configure Firehose to deliver to both OpenSearch Service and S3.",
      "Create a CloudWatch Logs subscription filter for each log group pointing to an Amazon Kinesis Data Stream. Configure a Lambda function to consume from Kinesis, transform the data, and write to both OpenSearch Service and S3.",
      "Use AWS Glue ETL jobs to read CloudWatch Logs from S3, apply transformations to mask sensitive data, and load the processed data into OpenSearch Service."
    ],
    correctAnswer: 2,
    category: "Application Integration",
    explanation: "Kinesis Data Streams can aggregate logs from multiple CloudWatch Logs subscription filters. A Lambda consumer can transform the data (mask sensitive fields) and fan out to multiple destinations (OpenSearch and S3) in a single processing step. This provides flexible, real-time processing with fan-out capability.",
    optionExplanations: [
      "CloudWatch Logs subscription filters can deliver directly to OpenSearch Service, but this does not include transformation for sensitive data removal. Creating separate filters per service per destination is also operationally complex.",
      "Amazon Kinesis Data Firehose supports a single destination per delivery stream. You cannot configure one Firehose stream to deliver to both OpenSearch Service and S3 simultaneously. Two separate streams would be needed, duplicating costs and complexity.",
      "✓ Correct: Kinesis Data Streams aggregates logs from multiple subscription filters into a single stream. A Lambda function processes records in real time, applies masking transformations, and writes to both OpenSearch Service and S3 independently. This is the most flexible and scalable fan-out pattern.",
      "AWS Glue ETL runs on a batch schedule and is not suitable for real-time log processing. This approach cannot provide the real-time analysis capability required for OpenSearch Service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html", title: "Real-time processing of log data with subscriptions" },
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html", title: "Using Lambda with Amazon Kinesis" }
    ]
  },
  {
    id: 18,
    question: "A company recently completed a lift-and-shift migration of a monolithic application to AWS. The application runs on a single large EC2 instance (r6i.8xlarge) and experiences unpredictable traffic spikes. During spikes, the instance's CPU and memory are fully utilized, causing the application to become unresponsive. The company wants to modernize the architecture to improve scalability without a full application rewrite.\n\nWhich approach should a solutions architect recommend as the FIRST step toward modernization with the LEAST risk?",
    options: [
      "Immediately refactor the entire application into individual AWS Lambda functions and use Amazon API Gateway for all API endpoints.",
      "Place the existing EC2 instance behind an Application Load Balancer (ALB) and configure an Auto Scaling group to add identical instances during traffic spikes.",
      "Migrate the application database to Amazon DynamoDB and use Amazon ElastiCache to cache all database queries.",
      "Rewrite the application using a microservices architecture on Amazon ECS with AWS Fargate and implement service mesh using AWS App Mesh."
    ],
    correctAnswer: 1,
    category: "Migration and Modernization",
    explanation: "The lowest-risk first step for scaling a monolithic application is horizontal scaling behind a load balancer. An ALB distributes traffic across multiple identical instances, and Auto Scaling adds capacity during spikes and removes it when traffic decreases. This approach requires no application changes and immediately addresses the scalability problem.",
    optionExplanations: [
      "Refactoring an entire monolithic application into Lambda functions is a high-risk, high-effort full rewrite. This is not an appropriate first step and carries significant risk of introducing bugs and instability.",
      "✓ Correct: Adding an ALB and Auto Scaling group is a zero-code-change approach to achieving horizontal scalability. The application runs on multiple identical instances, distributing load and eliminating the single instance as a bottleneck. This is a proven, low-risk first modernization step that immediately addresses the spike problem.",
      "Migrating a relational database to DynamoDB requires significant application code changes to replace SQL queries with DynamoDB API calls. This is a high-risk change that does not directly address the CPU/memory saturation issue.",
      "Rewriting to microservices on ECS is the highest-effort option and is not appropriate as the first step. It carries substantial risk and should be considered after the application is stable and horizontally scaled."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html", title: "Use Elastic Load Balancing to distribute traffic across instances in your Auto Scaling group" },
      { url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html", title: "What is Amazon EC2 Auto Scaling?" }
    ]
  },
  {
    id: 19,
    question: "A company needs to share a proprietary machine learning model as a service with multiple external customers. Each customer requires network isolation — their traffic must not share network paths with other customers. The company wants to avoid managing separate deployments for each customer. Customers should be able to access the service using their existing VPC infrastructure.\n\nWhich solution meets these requirements?",
    options: [
      "Deploy the ML model service on EC2 instances behind an Application Load Balancer. Share the ALB's DNS name with each customer and configure security groups to restrict access by customer IP ranges.",
      "Deploy the ML model service behind a Network Load Balancer (NLB). Create an AWS PrivateLink endpoint service using the NLB. Each customer creates a VPC interface endpoint in their VPC to connect to the service.",
      "Create a separate VPC for each customer and deploy a dedicated instance of the ML model service in each VPC. Use VPC peering to connect each customer VPC to the service VPC.",
      "Deploy the ML model service on AWS Lambda with a function URL. Distribute the function URL to customers and use resource-based policies to restrict access per customer."
    ],
    correctAnswer: 1,
    category: "Network Design",
    explanation: "AWS PrivateLink endpoint services allow a service provider to expose a service to multiple consumers without the traffic traversing the internet or sharing network paths between consumers. Each consumer creates their own VPC interface endpoint, providing complete network isolation. The provider manages a single deployment behind an NLB.",
    optionExplanations: [
      "Sharing a public ALB DNS name exposes the service over the internet. Traffic from different customers shares the same network path through the ALB, which does not provide network isolation between customers.",
      "✓ Correct: AWS PrivateLink creates a private endpoint service backed by an NLB. Each customer creates an interface endpoint in their own VPC. Traffic flows entirely within the AWS network, never traversing the internet. Each customer's traffic is isolated because interface endpoints create separate elastic network interfaces per customer, providing full network isolation without requiring separate deployments.",
      "Creating separate VPCs and deployments per customer negates the benefit of a single shared service and requires significant ongoing management effort as the customer base grows.",
      "Lambda function URLs expose the function over HTTPS through the internet. This does not provide network isolation and does not allow customers to use their existing VPC infrastructure for connectivity."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html", title: "Create an endpoint service" },
      { url: "https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html", title: "Share your services through AWS PrivateLink" }
    ]
  },
  {
    id: 20,
    question: "A solutions architect is designing a data lake on AWS. The company ingests data from multiple sources: real-time streaming from IoT devices via Amazon Kinesis Data Streams, batch files uploaded to Amazon S3 daily, and database change data capture (CDC) events from on-premises databases via AWS DMS. The data must be cataloged and made queryable by the data science team using standard SQL within 15 minutes of ingestion. The solution must minimize infrastructure management.\n\nWhich architecture should the solutions architect recommend?",
    options: [
      "Use AWS Glue ETL jobs to process all three data sources on a scheduled basis every 15 minutes. Store processed data in Amazon Redshift. Use Amazon Redshift Spectrum for SQL queries against the processed data.",
      "Use Amazon Kinesis Data Firehose to buffer and deliver streaming data to S3. Use AWS Glue crawlers to automatically catalog all S3 data from all three sources. Use Amazon Athena for serverless SQL queries directly against S3.",
      "Use Amazon EMR clusters to process streaming and batch data. Store results in Amazon S3. Use AWS Glue Data Catalog to catalog the data and Amazon Athena for queries.",
      "Deliver all data to Amazon DynamoDB. Use DynamoDB Streams to trigger AWS Lambda functions that transform and move data to S3. Use Amazon Athena to query S3 data."
    ],
    correctAnswer: 1,
    category: "Data Analytics and Architecture",
    explanation: "Kinesis Data Firehose automatically buffers and delivers streaming data to S3 with no server management. AWS Glue crawlers automatically discover schema and update the Data Catalog for all S3 data regardless of source. Amazon Athena is serverless and queries S3 data using standard SQL. This end-to-end serverless pipeline requires no infrastructure management and can make data queryable within minutes of ingestion.",
    optionExplanations: [
      "AWS Glue ETL jobs run on a schedule and require provisioning Glue workers. Loading data into Redshift adds latency and requires managing a Redshift cluster. The 15-minute query availability SLA may not be reliably met with scheduled jobs.",
      "✓ Correct: Kinesis Data Firehose is fully managed and delivers streaming data to S3 with configurable buffer settings (up to 5 minutes). AWS Glue crawlers run automatically to catalog new data. Amazon Athena requires no cluster management and supports standard SQL. Together, this fully serverless architecture delivers data for querying well within 15 minutes with minimal operations overhead.",
      "Amazon EMR requires cluster management (provisioning, scaling, patching). EMR clusters have startup times that can exceed 15 minutes, making it difficult to meet the query availability requirement reliably.",
      "DynamoDB is not designed for data lake workloads or large-scale analytics. CDC and batch data in DynamoDB's NoSQL model would require extensive transformation before becoming queryable with standard SQL. This approach adds unnecessary complexity."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html", title: "What is Amazon Data Firehose?" },
      { url: "https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html", title: "Defining crawlers in AWS Glue" },
      { url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html", title: "What is Amazon Athena?" }
    ]
  }
,
  {
    id: 21,
    question: "A company uses Amazon S3 to store sensitive financial documents. The security team requires that all objects uploaded to the bucket must be encrypted using customer-managed keys. The team also needs to be alerted immediately if any object is uploaded without server-side encryption, and any unencrypted object must be automatically deleted.\n\nWhich combination of actions should a solutions architect take to meet these requirements? (Choose TWO.)",
    options: [
      "Attach an S3 bucket policy that denies any PutObject request that does not include the x-amz-server-side-encryption header with the value aws:kms.",
      "Enable S3 default encryption on the bucket using an AWS KMS customer-managed key (CMK) and configure S3 Block Public Access.",
      "Create an AWS Config rule that checks for unencrypted S3 objects. Configure an automatic remediation action using AWS Systems Manager Automation to delete non-compliant objects.",
      "Enable Amazon Macie on the S3 bucket to detect unencrypted objects and configure Macie to automatically delete any unencrypted objects it discovers.",
      "Create an Amazon EventBridge rule that triggers on S3 PutObject events. Configure a Lambda function to check encryption status and delete unencrypted objects."
    ],
    correctAnswer: [0, 4],
    category: "Security and Compliance",
    explanation: "A bucket policy with a Deny condition on missing encryption header prevents unencrypted uploads at the API level — objects are rejected before they are stored. An EventBridge rule with a Lambda function provides real-time detection and automated deletion for any objects that bypass the policy, and enables immediate alerting.",
    optionExplanations: [
      "✓ Correct: A bucket policy that denies PutObject requests without the x-amz-server-side-encryption: aws:kms header enforces encryption at upload time. No unencrypted object can be stored in the bucket, satisfying the encryption requirement proactively.",
      "S3 default encryption automatically encrypts objects that arrive without an encryption specification, but it does not deny or alert on unencrypted upload attempts. It uses the default key, not necessarily a customer-managed key.",
      "AWS Config evaluates resource configurations periodically or on change, but there is inherent latency before a rule fires. Objects may remain in the bucket for minutes before detection. Config remediation also cannot provide truly immediate deletion.",
      "Amazon Macie is a data security service that classifies and discovers sensitive data. It does not monitor encryption status in real time and cannot automatically delete objects.",
      "✓ Correct: EventBridge S3 event notifications fire in near real time when objects are uploaded. A Lambda function can immediately check whether the object is encrypted with a CMK, send an alert notification via SNS, and delete the object if it is unencrypted, satisfying the immediate alert and automatic deletion requirements."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html", title: "Protecting data using server-side encryption" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html#example-bucket-policies-encryption", title: "Bucket policy examples — requiring SSE" }
    ]
  },
  {
    id: 22,
    question: "A company runs a high-throughput batch processing workload on AWS. The workload processes terabytes of data stored in Amazon S3 using a fleet of Amazon EC2 instances. Each job takes 2 to 6 hours to complete. The company wants to reduce compute costs significantly while maintaining the ability to complete jobs reliably.\n\nWhich solution should a solutions architect recommend?",
    options: [
      "Purchase Reserved Instances for the entire EC2 fleet to receive a discount over On-Demand pricing.",
      "Use a mix of On-Demand Instances for a baseline capacity and Spot Instances for the majority of the fleet. Implement checkpointing to Amazon S3 so that jobs can resume from the last checkpoint if a Spot Instance is interrupted.",
      "Replace the EC2 fleet with AWS Lambda functions. Configure Lambda to process S3 objects in parallel using S3 event notifications.",
      "Use AWS Batch with managed compute environments. Configure Spot Instances as the compute resource and set the bid percentage to 100% of the On-Demand price."
    ],
    correctAnswer: 1,
    category: "Cost Optimization",
    explanation: "Spot Instances can reduce EC2 costs by up to 90% compared to On-Demand pricing. For batch workloads with flexible timing, Spot Instances are ideal. Implementing S3 checkpointing ensures that if a Spot Instance is reclaimed, the job can resume from the last saved state rather than restarting from the beginning, maintaining reliability.",
    optionExplanations: [
      "Reserved Instances provide up to 72% discount compared to On-Demand but require a 1- or 3-year commitment and are cost-effective only for steady-state workloads. Batch workloads with variable demand are better served by Spot Instances, which offer deeper discounts with no commitment.",
      "✓ Correct: Spot Instances provide the largest cost reduction (up to 90%) for flexible batch workloads. Using a small On-Demand baseline ensures progress can continue during Spot interruptions. S3 checkpointing means only the work since the last checkpoint is lost, making the solution both cost-effective and reliable.",
      "AWS Lambda has a maximum execution timeout of 15 minutes. Batch jobs running 2 to 6 hours cannot be completed within a single Lambda invocation, making Lambda unsuitable for this workload.",
      "AWS Batch with Spot Instances is a valid approach, but the question asks for the solution with a focus on the combination of cost reduction AND reliability. The on-demand baseline + Spot + checkpointing described in option B is a more explicit and complete answer for the full reliability requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html", title: "Spot Instances" },
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-interruptions.html", title: "Spot Instance interruptions" }
    ]
  },
  {
    id: 23,
    question: "A company is building a real-time fraud detection system. The system must process hundreds of thousands of financial transactions per second with sub-millisecond latency for read and write operations. Transaction records must be durable and available across multiple AWS Regions. The data access pattern is simple key-value lookups by transaction ID.\n\nWhich database solution meets these requirements?",
    options: [
      "Amazon Aurora Global Database with read replicas in each Region.",
      "Amazon DynamoDB global tables with provisioned capacity and DynamoDB Accelerator (DAX) for caching.",
      "Amazon ElastiCache for Redis with cross-Region replication enabled.",
      "Amazon RDS for PostgreSQL with Multi-AZ deployment and cross-Region read replicas."
    ],
    correctAnswer: 1,
    category: "Database and Storage",
    explanation: "DynamoDB global tables provide single-digit millisecond latency at any scale with automatic multi-Region replication. DAX adds an in-memory cache layer for sub-millisecond read performance. DynamoDB is purpose-built for high-throughput key-value workloads and scales horizontally to handle hundreds of thousands of requests per second without performance degradation.",
    optionExplanations: [
      "Amazon Aurora Global Database replicates data across Regions with low latency (typically under 1 second), but Aurora is a relational database with write latency measured in single-digit milliseconds rather than sub-millisecond. It is also not designed for hundreds of thousands of write TPS without significant vertical scaling.",
      "✓ Correct: DynamoDB global tables replicate data across multiple Regions with millisecond-level replication. DAX provides sub-millisecond read caching. DynamoDB scales horizontally to millions of requests per second without performance degradation. Key-value lookups by transaction ID are the exact access pattern DynamoDB is optimized for.",
      "ElastiCache for Redis provides sub-millisecond performance but is a cache, not a durable primary database. It does not provide the durability guarantees required for financial transaction records, and cross-Region replication is asynchronous with no strong consistency guarantees.",
      "Amazon RDS for PostgreSQL with Multi-AZ provides high availability within a single Region. Cross-Region read replicas provide eventual consistency for reads but write operations only go to the primary instance, which cannot scale to hundreds of thousands of write transactions per second."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html", title: "Global tables - multi-Region replication with DynamoDB" },
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html", title: "In-memory acceleration with DynamoDB Accelerator (DAX)" }
    ]
  },
  {
    id: 24,
    question: "A company wants to use AWS to process sensitive healthcare data (PHI) that is subject to HIPAA regulations. The company needs to ensure that all AWS services used are HIPAA-eligible, that data is encrypted at rest and in transit, and that a Business Associate Agreement (BAA) is in place with AWS. The company also needs to ensure that no PHI is accidentally stored in non-compliant services.\n\nWhich combination of actions should a solutions architect take? (Choose TWO.)",
    options: [
      "Sign a Business Associate Agreement (BAA) with AWS through the AWS Artifact console. Only use HIPAA-eligible services listed in the AWS HIPAA eligibility documentation for processing or storing PHI.",
      "Enable AWS Shield Advanced on all AWS accounts to protect PHI from unauthorized access.",
      "Create AWS Config rules to detect and alert when PHI data is stored in non-HIPAA-eligible services such as Amazon SES or Amazon Rekognition.",
      "Use AWS CloudHSM for all encryption key management to ensure keys are stored in dedicated hardware security modules.",
      "Enable Amazon Macie on all S3 buckets that store PHI to automatically detect and alert when sensitive health information is stored in non-approved locations."
    ],
    correctAnswer: [0, 4],
    category: "Security and Compliance",
    explanation: "A BAA with AWS is a legal requirement for HIPAA compliance. Restricting usage to HIPAA-eligible services is the foundational compliance control. Amazon Macie can detect PHI patterns in S3 buckets and alert the security team if sensitive data is found in unexpected locations, helping prevent accidental storage of PHI in non-compliant configurations.",
    optionExplanations: [
      "✓ Correct: The BAA is a contractual prerequisite for HIPAA compliance on AWS. AWS Artifact provides the BAA electronically. Using only HIPAA-eligible services listed in AWS documentation ensures that the infrastructure meets HIPAA requirements. This is the primary compliance control.",
      "AWS Shield Advanced protects against DDoS attacks. While security is important for HIPAA, Shield Advanced does not directly address the encryption, BAA, or service eligibility requirements of HIPAA.",
      "AWS Config can evaluate resource configurations but cannot detect what type of data is stored within a service's data plane. It cannot inspect S3 object contents for PHI.",
      "AWS CloudHSM provides dedicated HSMs and is suitable for strict key management requirements, but AWS KMS with customer-managed keys is also HIPAA-eligible and sufficient for most HIPAA use cases. CloudHSM is not specifically required for HIPAA compliance.",
      "✓ Correct: Amazon Macie uses machine learning to automatically discover and protect sensitive data, including PHI patterns. Enabling Macie on S3 buckets provides continuous monitoring for accidental PHI storage and alerts the security team when findings are detected, directly addressing the requirement to prevent PHI from being stored in non-compliant locations."
    ],
    references: [
      { url: "https://aws.amazon.com/compliance/hipaa-compliance/", title: "AWS HIPAA Compliance" },
      { url: "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html", title: "What is Amazon Macie?" }
    ]
  },
  {
    id: 25,
    question: "A company runs a global e-commerce platform. Static assets (images, CSS, JavaScript) are stored in Amazon S3 and served through Amazon CloudFront. The engineering team notices that some users in certain countries are reporting that they see outdated product images even after the marketing team updates them in S3.\n\nWhat is the MOST likely cause of this issue, and what is the recommended solution?",
    options: [
      "S3 Cross-Region Replication is not configured. Enable S3 Cross-Region Replication to ensure updated objects are available in all AWS Regions.",
      "CloudFront edge locations are caching the old objects based on the TTL configured in the cache behavior. Invalidate the affected objects in CloudFront or implement cache versioning by appending a version string to object URLs.",
      "The S3 bucket has S3 Versioning enabled, causing CloudFront to serve old versions of objects. Disable S3 Versioning on the bucket.",
      "CloudFront is using HTTP instead of HTTPS to fetch objects from the S3 origin. Enable HTTPS for the origin protocol policy to ensure CloudFront fetches the latest objects."
    ],
    correctAnswer: 1,
    category: "Content Delivery and Performance",
    explanation: "CloudFront caches objects at edge locations based on the cache-control TTL. When an object in S3 is updated, edge locations that have already cached the previous version continue to serve it until the TTL expires. Issuing a CloudFront invalidation removes cached objects from all edge locations immediately, forcing CloudFront to fetch the updated version from S3 on the next request.",
    optionExplanations: [
      "S3 Cross-Region Replication copies objects between S3 buckets in different Regions. CloudFront serves content from edge caches, not directly from regional S3 buckets. Replication does not affect what CloudFront caches at its edge locations.",
      "✓ Correct: CloudFront edge caches hold objects for the duration of the TTL configured in the cache behavior. When product images are updated in S3, edge locations that cached the old version continue to serve it. A CloudFront invalidation (CreateInvalidation API call) purges the old cached objects. Alternatively, appending a version query string or changing the object key forces a cache miss and serves the new content without needing an invalidation.",
      "S3 Versioning maintains multiple versions of an object but does not affect which version CloudFront fetches. CloudFront fetches the current (latest) version of an object from S3. Versioning is unrelated to the caching behavior described.",
      "The origin protocol policy controls whether CloudFront uses HTTP or HTTPS to communicate with S3. It does not affect whether CloudFront serves stale cached content. Stale content is caused by TTL configuration, not the protocol."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html", title: "Invalidating files to remove content" },
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html", title: "Managing how long content stays in the cache (expiration)" }
    ]
  },
  {
    id: 26,
    question: "A company has a multi-tier web application. The web tier is deployed in a public subnet behind an Application Load Balancer. The application tier is deployed in a private subnet. The application tier needs to make outbound API calls to a third-party service over the internet. The company's security policy requires that all outbound internet traffic from private subnets must pass through a centralized security appliance for inspection before leaving the VPC.\n\nWhich network architecture meets these requirements?",
    options: [
      "Create a NAT gateway in a public subnet. Update the private subnet route table to route 0.0.0.0/0 traffic to the NAT gateway.",
      "Deploy a third-party security appliance on an EC2 instance in a public subnet. Configure the appliance as a proxy. Update the private subnet route table to route 0.0.0.0/0 traffic to the appliance instance.",
      "Deploy AWS Network Firewall in a dedicated inspection VPC. Use AWS Transit Gateway to route all outbound traffic from the application VPC through the inspection VPC before reaching the internet gateway.",
      "Attach an internet gateway directly to the private subnet and configure security groups on the application tier instances to allow only HTTPS outbound traffic to the third-party service IP range."
    ],
    correctAnswer: 2,
    category: "Network Design",
    explanation: "Routing traffic through an inspection VPC using Transit Gateway and AWS Network Firewall provides centralized, scalable traffic inspection. All outbound internet traffic from the private application tier passes through the firewall before egressing, satisfying the centralized inspection requirement without adding per-instance appliances.",
    optionExplanations: [
      "A NAT gateway provides internet access for private subnets but has no traffic inspection capability. Traffic passes through the NAT gateway directly to the internet without any security inspection.",
      "Deploying an appliance on a single EC2 instance creates a single point of failure and requires managing the appliance's scaling and availability. It is not the recommended approach for centralized inspection at scale. AWS Network Firewall is the managed, scalable alternative.",
      "✓ Correct: AWS Network Firewall in a dedicated inspection VPC provides stateful and stateless packet inspection. Using Transit Gateway to hairpin outbound traffic from the application VPC through the inspection VPC before reaching the internet gateway enforces centralized inspection for all egress traffic. This is a well-architectured pattern for centralized egress security.",
      "Internet gateways are attached to VPCs, not individual subnets. Even if this were possible, allowing private subnet instances to route directly to an internet gateway without inspection contradicts the centralized inspection requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html", title: "What is AWS Network Firewall?" },
      { url: "https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-appliance-scenario.html", title: "Appliance in a shared services VPC" }
    ]
  },
  {
    id: 27,
    question: "A company's DevOps team deploys application updates using an AWS CodePipeline pipeline. The pipeline currently uses a blue/green deployment strategy with AWS CodeDeploy to Amazon EC2. After recent deployments, some users experienced errors for several minutes before traffic was shifted back to the stable blue environment. The team wants to automatically detect these errors and trigger an automatic rollback without manual intervention.\n\nWhich solution should a solutions architect recommend?",
    options: [
      "Configure the CodeDeploy deployment group to monitor Amazon CloudWatch alarms. Create a CloudWatch alarm based on application error rate metrics published to CloudWatch. Set the alarm threshold to trigger automatic rollback when the error rate exceeds an acceptable threshold.",
      "Add a manual approval step in the CodePipeline pipeline after the deployment stage. Require the operations team to verify the deployment before approving promotion to production.",
      "Configure the CodeDeploy deployment to use a canary deployment configuration instead of blue/green. Route 10% of traffic to the green environment for 30 minutes before full traffic shift.",
      "Use AWS Config to monitor the deployment and create an AWS Lambda function that detects errors in application logs and triggers a rollback via the CodeDeploy API."
    ],
    correctAnswer: 0,
    category: "Deployment and Infrastructure as Code",
    explanation: "CodeDeploy supports automatic rollback triggered by CloudWatch alarms. By defining a CloudWatch alarm on an error rate metric (e.g., HTTP 5xx errors from the load balancer or application-specific error metrics) and associating it with the deployment group, CodeDeploy automatically rolls back to the previous revision when the alarm fires — without manual intervention.",
    optionExplanations: [
      "✓ Correct: CodeDeploy deployment groups can be configured with CloudWatch alarm monitoring. When the alarm threshold is breached (e.g., error rate exceeds 1%), CodeDeploy automatically initiates a rollback to the previous application revision. This fully automated approach eliminates the manual intervention required by the current process.",
      "A manual approval step prevents unauthorized changes but still requires human intervention. This does not satisfy the requirement for automatic rollback without manual action.",
      "A canary deployment reduces blast radius by limiting initial exposure to 10% of users, but it does not automatically detect errors and trigger rollback. Automatic rollback requires integration with CloudWatch alarms, as described in option A.",
      "AWS Config monitors resource configurations, not application runtime errors or error rates. While a Lambda function could poll for errors and call the CodeDeploy API, this approach adds unnecessary complexity compared to the native CodeDeploy + CloudWatch alarm integration."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html", title: "Redeploy and roll back a deployment with CodeDeploy" },
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html", title: "Configure advanced options for a deployment group" }
    ]
  },
  {
    id: 28,
    question: "A company is running a financial application on AWS that processes high-value transactions. The application stores transaction data in Amazon DynamoDB. A recent audit identified that some transactions were processed more than once due to retry logic in the application during periods of high latency.\n\nWhich solution should a solutions architect implement to prevent duplicate transaction processing with the LEAST application code change?",
    options: [
      "Enable DynamoDB Streams on the transactions table. Use an AWS Lambda function to detect and remove duplicate items after they are written.",
      "Use DynamoDB conditional writes with a condition expression that checks whether a transaction ID already exists before writing the item. Return an error to the application if the transaction already exists.",
      "Replace DynamoDB with Amazon RDS for PostgreSQL and use database-level unique constraints on the transaction ID column to prevent duplicate inserts.",
      "Implement a distributed locking mechanism using Amazon ElastiCache for Redis. Acquire a lock before processing each transaction and release it after the transaction is committed."
    ],
    correctAnswer: 1,
    category: "Database and Storage",
    explanation: "DynamoDB conditional writes allow an application to write an item only if a specified condition is true. Using attribute_not_exists(transactionId) as the condition ensures that the write succeeds only if an item with that transaction ID does not already exist. If a retry submits the same transaction ID, the conditional write fails with a ConditionalCheckFailedException, preventing the duplicate — with minimal code change (adding a ConditionExpression parameter).",
    optionExplanations: [
      "Using DynamoDB Streams with a Lambda function to remove duplicates after the fact means duplicates are temporarily stored and may be processed by downstream consumers before removal. This approach does not prevent duplicate processing.",
      "✓ Correct: DynamoDB conditional writes with attribute_not_exists(transactionId) implement idempotent writes at the database layer. The write succeeds only on the first attempt for a given transaction ID. Retries with the same ID return a ConditionalCheckFailedException without creating a duplicate. This requires adding only a ConditionExpression parameter to the PutItem or UpdateItem call.",
      "Migrating from DynamoDB to RDS is a major architectural change that involves data migration, schema redesign, and application rewrite. This violates the requirement of least application code change.",
      "A distributed lock with ElastiCache prevents concurrent processing of the same transaction but requires implementing lock acquisition, release, and timeout logic, which is significantly more code than a single ConditionExpression parameter addition."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html", title: "Condition expressions" },
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html#WorkingWithItems.ConditionalUpdate", title: "Putting items — conditional writes" }
    ]
  },
  {
    id: 29,
    question: "A media company stores petabytes of video content in Amazon S3. Videos are frequently accessed for the first 30 days after upload, occasionally accessed for the next 60 days, and rarely accessed after 90 days. Videos older than 7 years must be deleted. The company wants to minimize storage costs without impacting video availability.\n\nWhich solution should a solutions architect implement?",
    options: [
      "Manually review video access patterns monthly. Move videos to S3 Glacier manually when they are no longer frequently accessed. Delete videos older than 7 years.",
      "Configure an S3 Lifecycle policy to transition objects to S3 Standard-IA after 30 days, to S3 Glacier Flexible Retrieval after 90 days, and to expire (delete) objects after 7 years.",
      "Enable S3 Intelligent-Tiering on the bucket. Configure an S3 Lifecycle expiration rule to delete objects after 7 years.",
      "Configure an S3 Lifecycle policy to transition objects to S3 Glacier Deep Archive after 30 days and expire objects after 7 years."
    ],
    correctAnswer: 1,
    category: "Cost Optimization",
    explanation: "An S3 Lifecycle policy automates cost optimization by transitioning objects through appropriate storage classes based on age. S3 Standard-IA is cost-effective for infrequent access after 30 days. S3 Glacier Flexible Retrieval significantly reduces storage costs for rarely accessed archives. Lifecycle expiration automatically deletes objects at 7 years. This fully automated approach matches the described access pattern precisely.",
    optionExplanations: [
      "Manual review and migration is operationally burdensome at petabyte scale and prone to human error. It does not meet the requirement for automated cost optimization.",
      "✓ Correct: The Lifecycle policy transitions objects through S3 Standard (0-30 days, highest availability for frequent access) → S3 Standard-IA (30-90 days, lower cost for occasional access) → S3 Glacier Flexible Retrieval (90 days+, lowest cost for rare access) → expiration at 7 years. This fully automated policy matches the described access pattern and minimizes storage costs.",
      "S3 Intelligent-Tiering automatically moves objects between access tiers but incurs a per-object monitoring fee. For predictable access patterns like the one described, a Lifecycle policy is more cost-effective because it does not charge per-object monitoring fees. Intelligent-Tiering is better for unpredictable access patterns.",
      "Transitioning objects to Glacier Deep Archive after only 30 days makes occasionally accessed videos (30-90 days) extremely expensive to retrieve, as Glacier Deep Archive has retrieval times of 12 hours and incurs retrieval fees. This is not appropriate for the 30-90 day window where videos are occasionally accessed."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html", title: "Managing your storage lifecycle" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html", title: "Amazon S3 storage classes" }
    ]
  },
  {
    id: 30,
    question: "A company is designing a new SaaS application that will serve thousands of enterprise customers. Each customer requires complete data isolation — no customer should be able to access another customer's data. The application uses a shared Amazon RDS Aurora PostgreSQL cluster for cost efficiency. The development team wants to implement the isolation at the database level while keeping the application architecture as simple as possible.\n\nWhich approach should a solutions architect recommend for implementing data isolation?",
    options: [
      "Create a separate RDS Aurora PostgreSQL cluster for each customer. Use Amazon Route 53 to route each customer's traffic to their dedicated cluster.",
      "Use a single Aurora PostgreSQL cluster with a separate database (schema) per customer. Configure Row-Level Security (RLS) policies on all tables to restrict each application user to their own customer's rows.",
      "Deploy a separate AWS account per customer. Use AWS Organizations to manage all customer accounts. Deploy a dedicated Aurora cluster in each customer's account.",
      "Use a single Aurora PostgreSQL cluster with a single shared database. Add a customer_id column to every table. Use Row-Level Security (RLS) policies with application-enforced predicates to restrict query results to the authenticated customer's data."
    ],
    correctAnswer: 3,
    category: "Database and Storage",
    explanation: "Using a single shared Aurora cluster with a customer_id column and PostgreSQL Row-Level Security (RLS) policies provides strong, database-enforced data isolation within a shared schema. RLS policies automatically filter query results based on the current user context, ensuring tenants never see each other's data without requiring separate clusters or schemas. This is the simplest architecture for multi-tenant SaaS applications with a shared database.",
    optionExplanations: [
      "Creating a separate cluster per customer provides perfect isolation but is prohibitively expensive for thousands of customers and eliminates the cost benefit of shared infrastructure.",
      "A separate schema per customer provides good isolation and is a common multi-tenancy pattern. However, maintaining thousands of schemas increases DDL complexity and operational overhead, as schema migrations must be applied to every customer schema.",
      "Deploying separate AWS accounts per customer provides maximum isolation but is operationally complex and costly at scale. It is appropriate for large enterprise customers with strict isolation requirements, not for a cost-efficient shared SaaS architecture.",
      "✓ Correct: A shared database with a customer_id column and PostgreSQL RLS policies is the simplest and most scalable multi-tenancy pattern. RLS is enforced at the database engine level — even if the application has a bug, the database will not return rows belonging to a different customer. Setting the application user's customer_id as a session variable enables the RLS policy to automatically filter all queries, providing strong isolation with minimal application complexity."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.AuroraPostgreSQL.html", title: "Working with Aurora PostgreSQL" },
      { url: "https://www.postgresql.org/docs/current/ddl-rowsecurity.html", title: "PostgreSQL Row Security Policies" }
    ]
  }
,
  {
    id: 31,
    question: "A company runs a customer-facing REST API on Amazon API Gateway backed by AWS Lambda. The API is experiencing a significant increase in traffic. The operations team observes that a large portion of API requests are identical GET requests for the same resource data, which changes only once every 10 minutes. These redundant invocations are increasing Lambda costs and adding unnecessary latency.\n\nWhich solution addresses this issue with the LEAST operational overhead?",
    options: [
      "Enable API Gateway caching for the GET method. Set the cache TTL to 600 seconds (10 minutes). Configure the cache capacity appropriate for the expected traffic volume.",
      "Deploy an Amazon CloudFront distribution in front of API Gateway. Configure a cache behavior with a TTL of 600 seconds for the GET endpoints.",
      "Implement an Amazon ElastiCache for Redis cluster within the Lambda function to cache responses. Update the Lambda function code to check the cache before querying the backend.",
      "Configure API Gateway usage plans and throttling to limit the number of GET requests per second, preventing excessive Lambda invocations."
    ],
    correctAnswer: 0,
    category: "Serverless Architecture",
    explanation: "API Gateway's built-in caching feature stores responses from the integration backend (Lambda) and serves cached responses for subsequent identical requests during the TTL period. Enabling caching on the GET method with a 600-second TTL means Lambda is invoked only once per 10 minutes for identical requests, directly reducing invocation count and latency with no code changes.",
    optionExplanations: [
      "✓ Correct: API Gateway caching is a native, fully managed feature that requires no code changes. When caching is enabled for a method, API Gateway returns the cached response for subsequent requests with the same parameters until the TTL expires. This eliminates redundant Lambda invocations and reduces response latency for cached responses, with minimal operational overhead.",
      "CloudFront can cache API responses and provides global edge caching, but it adds another service layer and requires additional configuration (cache key policies, origin settings). API Gateway's native caching is simpler for this use case.",
      "Implementing Redis caching inside the Lambda function reduces downstream data source calls but does not reduce the number of Lambda invocations themselves. Lambda is still invoked for every API request, so Lambda costs are not reduced.",
      "Throttling limits request rates to protect the backend but does not cache responses. Throttled requests are rejected or queued, not served from cache. This would degrade user experience rather than optimize costs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html", title: "Enabling API caching to enhance responsiveness" },
      { url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html", title: "Throttle API requests for better throughput" }
    ]
  },
  {
    id: 32,
    question: "A company needs to run a containerized application on AWS. The application consists of multiple microservices that communicate with each other over HTTP. The operations team has limited container orchestration expertise and wants to minimize infrastructure management. The workload is variable, with near-zero traffic overnight and high traffic during business hours.\n\nWhich compute option meets these requirements?",
    options: [
      "Deploy the application on Amazon EKS with self-managed node groups. Use Kubernetes Horizontal Pod Autoscaler (HPA) to scale pods based on CPU utilization.",
      "Deploy the application on Amazon ECS with AWS Fargate launch type. Configure ECS Service Auto Scaling to scale tasks based on CPU and memory metrics.",
      "Deploy the application on Amazon EC2 instances. Install Docker and run containers directly. Configure an Auto Scaling group to scale instances based on CPU utilization.",
      "Package each microservice as an AWS Lambda function using container image support. Configure Lambda to scale based on request volume."
    ],
    correctAnswer: 1,
    category: "Compute and Containers",
    explanation: "Amazon ECS with AWS Fargate removes the need to provision, manage, or scale EC2 instances or Kubernetes control planes. Fargate charges only for the vCPU and memory consumed by running tasks, making it cost-effective for variable workloads with near-zero overnight traffic. ECS Service Auto Scaling adjusts the number of tasks automatically based on demand.",
    optionExplanations: [
      "Amazon EKS with self-managed node groups requires managing EC2 nodes (patching, scaling, availability). Kubernetes expertise is needed for cluster administration. This does not minimize infrastructure management for a team with limited container orchestration experience.",
      "✓ Correct: ECS with Fargate is a fully managed, serverless container platform. The team does not manage any underlying infrastructure — AWS manages the compute layer. Fargate scales to zero when there are no tasks running and scales up as demand increases, which is ideal for the variable workload described. ECS requires less orchestration expertise than Kubernetes.",
      "Running containers directly on EC2 requires managing the instances, Docker runtime, and scaling logic manually. This adds significant operational overhead compared to ECS with Fargate.",
      "AWS Lambda with container images has a maximum execution timeout of 15 minutes and is designed for stateless, short-lived request processing. Long-running microservices that need persistent HTTP endpoints and service-to-service communication are better suited to ECS."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html", title: "Amazon ECS on AWS Fargate" },
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html", title: "Automatically scale your Amazon ECS service" }
    ]
  },
  {
    id: 33,
    question: "A large retail company uses AWS Organizations to manage 50 AWS accounts across multiple business units. The company's security team needs to ensure that no IAM user or role in any member account can disable AWS CloudTrail logging or delete CloudTrail log files in Amazon S3. The security team must be able to enforce this policy centrally without modifying IAM policies in each individual account.\n\nWhich solution meets these requirements?",
    options: [
      "Create an IAM permission boundary in each member account that restricts CloudTrail actions. Attach the permission boundary to all IAM users and roles in each account.",
      "Create a Service Control Policy (SCP) in AWS Organizations that denies cloudtrail:StopLogging, cloudtrail:DeleteTrail, and s3:DeleteObject actions on the CloudTrail log bucket. Attach the SCP to the root of the organization or the relevant organizational units.",
      "Enable AWS Config in the management account with organization-level aggregation. Create a Config rule that detects when CloudTrail is disabled and triggers an SNS notification to the security team.",
      "Use AWS CloudFormation StackSets to deploy a Lambda function to each member account. Configure the Lambda function to re-enable CloudTrail whenever it is disabled."
    ],
    correctAnswer: 1,
    category: "Governance and Multi-Account Strategy",
    explanation: "SCPs are the only AWS mechanism that can centrally restrict permissions across all member accounts in an organization without touching individual account IAM policies. An SCP with Deny statements for CloudTrail and S3 deletion actions overrides any IAM policies that might allow those actions, providing a guardrail that cannot be bypassed by account administrators.",
    optionExplanations: [
      "IAM permission boundaries restrict the maximum permissions of IAM entities but must be applied individually to each user and role in each account. This is not a centrally enforceable mechanism and requires changes in all 50 accounts.",
      "✓ Correct: SCPs applied at the organization root or OUs override IAM policies in all member accounts. A Deny SCP for cloudtrail:StopLogging, cloudtrail:DeleteTrail, and s3:DeleteObject on the log bucket means no principal in any member account — including account administrators — can disable CloudTrail logging or delete log files, regardless of their IAM permissions.",
      "AWS Config detects non-compliance and can alert the security team, but detection is reactive and there is latency before the rule fires. CloudTrail could be disabled for several minutes before Config detects it. This does not prevent the action — it only detects it after the fact.",
      "Re-enabling CloudTrail via Lambda is also reactive. Between the time CloudTrail is disabled and Lambda re-enables it, a log gap exists. Additionally, deploying Lambda to 50 accounts with StackSets adds significant operational overhead compared to a single SCP."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples_cloudtrail.html", title: "SCP examples — AWS CloudTrail" }
    ]
  },
  {
    id: 34,
    question: "A company has a web application hosted on Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer. The application stores user session state in the memory of each EC2 instance. Users occasionally report being unexpectedly logged out when the application is under load and Auto Scaling events occur.\n\nWhat is the root cause, and which solution should a solutions architect implement?",
    options: [
      "The ALB is not configured with sticky sessions. Enable sticky sessions (session affinity) on the ALB target group to ensure each user's requests always route to the same instance.",
      "User session state is stored in EC2 instance memory, which is lost when an instance is terminated during a scale-in event. Move session state to an external shared store such as Amazon ElastiCache for Redis.",
      "The Auto Scaling group's health check grace period is too short, causing healthy instances to be terminated before they complete session initialization. Increase the health check grace period.",
      "The ALB is using round-robin routing, which distributes requests across instances. Switch to least-outstanding-requests routing to keep users on the same instance longer."
    ],
    correctAnswer: 1,
    category: "High Availability and Disaster Recovery",
    explanation: "Storing session state in EC2 instance memory means the session data is permanently lost when that instance is terminated. During Auto Scaling scale-in events, instances are terminated to reduce capacity, and any in-memory session data is destroyed. Moving session state to an external, persistent store like ElastiCache for Redis ensures sessions survive instance terminations and allows any instance to serve any user's subsequent requests.",
    optionExplanations: [
      "ALB sticky sessions bind a user's requests to a specific instance, but if that instance is terminated (during scale-in), the session is still lost. Sticky sessions mask the root problem temporarily but do not solve it and add complexity.",
      "✓ Correct: The root cause is in-memory session storage on ephemeral EC2 instances. When Auto Scaling terminates an instance during scale-in, the session data is lost. Externalizing session state to ElastiCache for Redis decouples session persistence from instance lifecycle. Any instance in the Auto Scaling group can retrieve and update any user's session, enabling true stateless application instances.",
      "The health check grace period allows a newly launched instance time to become ready before health checks begin. It does not affect whether a healthy instance is terminated during scale-in events. This is unrelated to session loss.",
      "Load balancing algorithms affect request distribution but do not prevent session loss when instances are terminated. Even with least-outstanding-requests routing, a terminated instance loses all its in-memory session data."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/elasticache/latest/red-ug/WhatIs.html", title: "What is Amazon ElastiCache for Redis?" },
      { url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-lifecycle.html", title: "Amazon EC2 Auto Scaling lifecycle hooks" }
    ]
  },
  {
    id: 35,
    question: "A global media company uses Amazon CloudFront to distribute video content. The company needs to ensure that only authenticated users who have purchased a subscription can access video files stored in Amazon S3. The company also wants to prevent users from sharing download URLs with non-subscribers.\n\nWhich solution meets these requirements?",
    options: [
      "Configure the S3 bucket as a public bucket and use S3 presigned URLs with a short expiration time. Provide the presigned URL to authenticated users upon login.",
      "Use CloudFront signed URLs or signed cookies. Configure CloudFront to use an Origin Access Control (OAC) to restrict S3 access to CloudFront only. Generate signed URLs or cookies with a short expiration time for authenticated subscribers.",
      "Configure the S3 bucket policy to allow access only from specific user IP addresses. Distribute the S3 object URL directly to authenticated users.",
      "Enable S3 Block Public Access on the bucket. Share the S3 object URL with a time-limited session token appended as a query parameter."
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "CloudFront signed URLs or signed cookies restrict content access to users with a valid signature. Origin Access Control (OAC) ensures the S3 bucket is not directly accessible — only CloudFront can retrieve objects from S3. Together, these controls ensure that only authenticated subscribers with a valid signed URL or cookie can access video content, and the short expiration prevents URL sharing.",
    optionExplanations: [
      "Making the S3 bucket public exposes all content to anyone who discovers the URL. Even with short-expiry presigned URLs, the content can be downloaded and redistributed, and S3 presigned URLs bypass the CDN layer, increasing data transfer costs.",
      "✓ Correct: CloudFront signed URLs embed a cryptographic signature that expires after a specified time. OAC locks the S3 bucket so that only CloudFront can fetch objects — direct S3 URL access is denied. Subscribers receive a signed URL that expires shortly, preventing sharing. Signed cookies are useful when multiple files need to be accessed without generating a URL per file.",
      "Restricting by IP address is unreliable because subscriber IP addresses change (mobile networks, VPNs). IP-based restrictions cannot verify subscription status and would block legitimate subscribers behind shared IPs.",
      "S3 Block Public Access prevents public bucket policies but does not create time-limited access tokens. Appending custom query parameters to S3 URLs does not provide authentication or expiry enforcement at the S3 or CDN level."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html", title: "Serving private content with signed URLs and signed cookies" },
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html", title: "Restricting access to an Amazon S3 origin" }
    ]
  },
  {
    id: 36,
    question: "A company runs a critical order processing system on AWS. Order messages are placed in an Amazon SQS standard queue and processed by a fleet of Amazon EC2 workers. Occasionally, a message causes a processing error and the worker crashes. The same message is then redelivered, causing the worker to crash again, creating an infinite loop that prevents other messages from being processed.\n\nWhich solution should a solutions architect implement to address this issue?",
    options: [
      "Increase the SQS message visibility timeout to a value longer than the maximum processing time, preventing messages from being redelivered while they are being processed.",
      "Configure a dead-letter queue (DLQ) on the SQS standard queue with a maxReceiveCount of 3. Failed messages that exceed the receive count are moved to the DLQ for investigation, stopping the infinite retry loop.",
      "Enable SQS FIFO queue ordering to ensure messages are processed in the correct sequence, preventing out-of-order processing that causes crashes.",
      "Increase the number of EC2 worker instances in the Auto Scaling group so that other workers can continue processing while one worker is stuck on the problematic message."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "A dead-letter queue (DLQ) is the standard SQS solution for handling messages that repeatedly fail processing. The maxReceiveCount setting specifies how many times a message can be received before it is moved to the DLQ. Once in the DLQ, the problematic message no longer blocks other message processing and can be inspected separately to diagnose the root cause.",
    optionExplanations: [
      "Increasing the visibility timeout prevents redelivery during processing but does not address what happens when the worker crashes and returns the message to the queue. After the visibility timeout expires, the problematic message is redelivered, perpetuating the crash loop.",
      "✓ Correct: A DLQ with maxReceiveCount (e.g., 3) means after a message is received and fails 3 times, SQS automatically moves it to the DLQ instead of continuing to redeliver it. The main queue is cleared of the problematic message, and other messages continue to be processed normally. The DLQ allows engineers to inspect and debug the failed message separately.",
      "SQS FIFO queues ensure ordering and exactly-once processing, but they do not prevent a poison-pill message from causing repeated failures. A poison-pill message in a FIFO queue would still block the message group it belongs to.",
      "Adding more EC2 workers means more instances will attempt to process the problematic message, each crashing in turn. The root problem — an unhandled message causing crashes — is not resolved by adding more workers."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html", title: "Amazon SQS dead-letter queues" },
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html", title: "Amazon SQS visibility timeout" }
    ]
  },
  {
    id: 37,
    question: "A company is migrating its on-premises application to AWS. The application requires shared file storage that multiple Linux EC2 instances in different Availability Zones must mount simultaneously using NFS. The storage must automatically scale as data grows, and the company wants a fully managed solution with no capacity planning required.\n\nWhich AWS storage service should a solutions architect recommend?",
    options: [
      "Amazon Elastic Block Store (Amazon EBS) with Multi-Attach enabled on a Provisioned IOPS SSD (io2) volume.",
      "Amazon Elastic File System (Amazon EFS) with the default General Purpose performance mode.",
      "Amazon FSx for Windows File Server configured with a Multi-AZ deployment.",
      "An Amazon S3 bucket mounted on each EC2 instance using the S3 File Gateway."
    ],
    correctAnswer: 1,
    category: "Database and Storage",
    explanation: "Amazon EFS is a fully managed, elastic NFS file system that multiple Linux EC2 instances in different Availability Zones can mount simultaneously. EFS automatically scales storage capacity up and down as files are added and removed, with no pre-provisioning required. It natively supports NFS v4.0 and v4.1 protocols.",
    optionExplanations: [
      "EBS Multi-Attach allows an io2 volume to be attached to up to 16 EC2 instances, but only within a single Availability Zone. The question requires access from instances in different AZs, which EBS Multi-Attach does not support. EBS also does not automatically scale capacity.",
      "✓ Correct: Amazon EFS provides a fully managed, elastic NFS file system. Instances in multiple AZs can mount the same EFS file system simultaneously using NFS. EFS scales automatically from gigabytes to petabytes without provisioning or capacity management. It is the purpose-built AWS solution for shared NFS access across Linux instances.",
      "Amazon FSx for Windows File Server uses the SMB protocol, not NFS. Linux instances can mount SMB shares, but NFS is the standard protocol for Linux shared file access and is natively supported by EFS.",
      "S3 File Gateway provides NFS and SMB access to S3 through a gateway appliance running on-premises or on EC2. It introduces caching latency and requires managing gateway instances. It is not equivalent to a native NFS mount for performance-sensitive shared storage."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html", title: "What is Amazon Elastic File System?" },
      { url: "https://docs.aws.amazon.com/efs/latest/ug/how-it-works.html", title: "How Amazon EFS works" }
    ]
  },
  {
    id: 38,
    question: "A company wants to build an event-driven architecture on AWS. When an object is uploaded to an Amazon S3 bucket, multiple downstream systems must be notified: a Lambda function should process the object, an Amazon SQS queue should receive a message for auditing, and an Amazon SNS topic should notify an operations team via email. The solution must be loosely coupled and easily extensible to add more consumers in the future.\n\nWhich solution meets these requirements?",
    options: [
      "Configure separate S3 event notifications for each destination: one notification to Lambda, one to SQS, and one to SNS.",
      "Configure an S3 event notification to publish to an Amazon SNS topic. Subscribe the Lambda function, the SQS queue, and the operations team email address to the SNS topic as separate subscriptions.",
      "Configure an S3 event notification to publish to an Amazon EventBridge event bus. Create EventBridge rules that route S3 object-created events to Lambda, SQS, and SNS as separate targets.",
      "Configure an S3 event notification to an AWS Lambda function. Within the Lambda function code, invoke the second Lambda function, put a message to the SQS queue, and publish to the SNS topic."
    ],
    correctAnswer: 2,
    category: "Application Integration",
    explanation: "Amazon EventBridge provides a fully managed, serverless event bus with flexible routing rules. S3 can publish events to EventBridge, and EventBridge rules can fan out to multiple targets (Lambda, SQS, SNS) simultaneously. Adding new consumers only requires creating a new EventBridge rule — no changes to S3 configuration or existing consumers are needed, making the architecture highly extensible.",
    optionExplanations: [
      "S3 supports multiple event notification destinations, but S3 event notifications to Lambda, SQS, and SNS are configured individually. Adding more consumers requires modifying S3 bucket configuration for each new destination. This approach is not as flexible or extensible as EventBridge.",
      "SNS fan-out is a valid pattern. SNS can deliver the same event to Lambda, SQS, and email subscriptions. However, adding new consumer types may require additional SNS configuration, and SNS does not provide the rich filtering and routing capabilities of EventBridge.",
      "✓ Correct: EventBridge is the purpose-built service for event-driven architectures. S3 natively integrates with EventBridge. EventBridge rules provide content-based filtering and can route events to multiple targets simultaneously. Adding a new consumer only requires creating a new rule targeting the new service — no changes to the S3 bucket or existing rules required. This is the most extensible and loosely coupled architecture.",
      "Orchestrating downstream calls from within a Lambda function creates tight coupling — the Lambda function must know about all consumers and handle failures for each. Adding a new consumer requires modifying the Lambda function code and redeployment."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventBridge.html", title: "Using EventBridge with Amazon S3" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html", title: "What is Amazon EventBridge?" }
    ]
  },
  {
    id: 39,
    question: "A company's application team deploys new features to production every week using AWS CodePipeline. A recent deployment introduced a critical bug that impacted all users for 45 minutes before the team identified and resolved the issue. The team wants to reduce the blast radius of future deployments so that critical bugs affect a small percentage of users before a full rollout.\n\nWhich deployment strategy should a solutions architect recommend?",
    options: [
      "Use an AWS CodeDeploy blue/green deployment. Deploy the new version to a new target group and immediately shift 100% of traffic from the old target group to the new one.",
      "Use AWS CodeDeploy with a linear or canary deployment configuration. Route a small percentage of production traffic (e.g., 10%) to the new version initially, monitor error metrics, and gradually increase traffic if no issues are detected.",
      "Use AWS CloudFormation with a rolling update deployment policy. Update EC2 instances in batches of 25% at a time, ensuring the majority of instances always run the previous version.",
      "Use AWS Elastic Beanstalk with the immutable update deployment policy. Deploy the new version to a separate set of instances and swap the environment URLs after verification."
    ],
    correctAnswer: 1,
    category: "Deployment and Infrastructure as Code",
    explanation: "Canary or linear deployment configurations in CodeDeploy allow a small percentage of traffic to be routed to the new version first. If CloudWatch alarms detect errors or performance degradation, CodeDeploy automatically rolls back before the full traffic shift. This directly limits the blast radius to the percentage of users on the canary, addressing the requirement.",
    optionExplanations: [
      "A blue/green deployment with immediate 100% traffic shift provides the ability to roll back quickly, but if a bug exists, 100% of users are affected immediately — the same blast radius as the original problem. This does not reduce the blast radius.",
      "✓ Correct: A canary deployment routes a defined percentage (e.g., 10%) of production traffic to the new version. If the new version has a critical bug, only 10% of users are affected during the monitoring window. CodeDeploy integrates with CloudWatch alarms for automatic rollback. Linear deployments increase traffic in equal increments over time with continuous monitoring.",
      "CloudFormation rolling updates replace instances in batches, but all traffic continues to be routed across all instances — including the updated ones — as each batch completes. There is no traffic percentage control. If the new version has a bug, all users who reach updated instances are affected.",
      "Elastic Beanstalk immutable updates deploy to a separate set of instances, which is safer than in-place updates but still involves a full swap when verified. It does not natively route a small percentage of traffic to the new version for canary testing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html", title: "Deployment configurations on an AWS Lambda or an Amazon ECS compute platform" },
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html", title: "Configure advanced options for a deployment group" }
    ]
  },
  {
    id: 40,
    question: "A company operates a multi-tier web application in AWS. The application tier instances in private subnets need to download software patches from the internet during the maintenance window. The security team requires that the instances must not have inbound internet connectivity at any time. The company wants to minimize the cost of this solution.\n\nWhich solution meets these requirements?",
    options: [
      "Assign Elastic IP addresses to the application tier instances to enable direct outbound internet connectivity while keeping inbound security group rules restricted.",
      "Deploy a NAT gateway in a public subnet. Update the private subnet route table to route 0.0.0.0/0 to the NAT gateway. Remove the NAT gateway after the maintenance window to reduce costs.",
      "Use AWS Systems Manager Patch Manager with a maintenance window. Configure instances to use the VPC endpoint for Systems Manager so patch metadata and commands are retrieved privately, and download patches through a NAT gateway only during the maintenance window.",
      "Create an internet gateway attachment for the private subnet temporarily during the maintenance window. Remove the internet gateway attachment after patching is complete."
    ],
    correctAnswer: 1,
    category: "Network Design",
    explanation: "A NAT gateway in a public subnet allows instances in private subnets to initiate outbound connections to the internet while blocking all inbound connections from the internet. This satisfies both the outbound access requirement (patch downloads) and the security requirement (no inbound internet connectivity). Deleting the NAT gateway after the maintenance window eliminates the hourly charge when it is not needed, minimizing cost.",
    optionExplanations: [
      "Elastic IP addresses on private subnet instances would require the instances to be moved to a public subnet or for route table changes that make the instances publicly reachable. Instances in private subnets with EIPs still cannot route to the internet without an internet gateway route, and an internet gateway would allow inbound connections.",
      "✓ Correct: A NAT gateway provides outbound-only internet access for private subnet instances. The instances can download patches from the internet through the NAT gateway, but no inbound connections from the internet are possible because the instances have only private IP addresses. Provisioning the NAT gateway only for the maintenance window duration and deleting it afterward minimizes the hourly NAT gateway charge.",
      "Using Systems Manager Patch Manager with VPC endpoints reduces internet dependency for SSM communication but the instances still need internet access to download the actual patch files from vendor repositories (e.g., Windows Update, yum/apt mirrors) unless a custom S3 patch repository is configured. This option does not eliminate the need for a NAT gateway for patch downloads.",
      "Internet gateways cannot be attached to specific subnets — they are attached to the entire VPC. Adding an internet gateway to the VPC and adding a route in the private subnet route table would also expose the instances to potential inbound traffic depending on security group configuration."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html", title: "NAT gateways" },
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html", title: "Connect to the internet using an internet gateway" }
    ]
  }
,
  {
    id: 41,
    question: "A company runs a popular mobile game that stores player profiles and game state in Amazon DynamoDB. During a major in-game event, write traffic increased by 10x, causing DynamoDB to throttle requests and degrade the player experience. The DynamoDB table uses on-demand capacity mode. A solutions architect needs to investigate the root cause and recommend a long-term solution to prevent throttling during future events.\n\nAfter investigation, the architect discovers that a small number of player IDs (top 100 players) receive the vast majority of write traffic because their leaderboard entries are updated on every player action. This creates hot partitions in DynamoDB.\n\nWhich solution should the solutions architect recommend?",
    options: [
      "Switch the DynamoDB table from on-demand capacity to provisioned capacity with Auto Scaling. Set the minimum capacity to handle baseline traffic and maximum capacity to handle peak event traffic.",
      "Add a DynamoDB Accelerator (DAX) cluster in front of the DynamoDB table to cache write requests for the hot player IDs.",
      "Redesign the write pattern by using write sharding. Append a random suffix (1-N) to the hot player partition keys, and aggregate the sharded values when reading leaderboard data.",
      "Enable DynamoDB global tables to distribute write traffic across multiple AWS Regions, reducing the per-region write load on the hot partitions."
    ],
    correctAnswer: 2,
    category: "Database and Storage",
    explanation: "Hot partitions occur when a small number of partition keys receive a disproportionately large share of traffic. Write sharding distributes the writes for a hot key across multiple physical partitions by appending a random suffix to the key. Reads aggregate across all shards. This is the recommended DynamoDB pattern for eliminating hot partitions caused by a small number of frequently updated items.",
    optionExplanations: [
      "Switching to provisioned capacity with Auto Scaling can help absorb traffic spikes by pre-provisioning capacity, but it does not resolve the root cause — hot partitions. DynamoDB distributes throughput across partitions, and a single hot partition is limited to a fraction of the total table throughput regardless of the total provisioned capacity.",
      "DAX is an in-memory read cache and does not cache write operations. Write requests still pass through DAX to DynamoDB. DAX would not reduce the write pressure on the hot partitions.",
      "✓ Correct: Write sharding distributes writes for a hot key (e.g., top player ID) across multiple DynamoDB partitions by appending a random suffix (e.g., playerID#1, playerID#2, ..., playerID#N). This spreads the write load across N partitions. When reading the leaderboard, the application queries all N shards and aggregates the results. This directly eliminates the hot partition problem.",
      "DynamoDB global tables replicate writes across Regions for high availability and low-latency global reads. However, all writes for a given item are still concentrated on the same partition key within each Region. Global tables do not distribute the write load for hot keys within a Region."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-sharding.html", title: "Using write sharding to distribute workloads evenly" },
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.Partitions.html", title: "Partitions and data distribution" }
    ]
  },
  {
    id: 42,
    question: "A company wants to implement a centralized logging solution for all AWS accounts in its organization. Application logs from Amazon EC2 instances across multiple accounts and Regions must be delivered to a central S3 bucket in the security account. Log delivery must be reliable and the central S3 bucket must be protected against accidental or malicious deletion of log data by any account including the security account itself.\n\nWhich combination of actions should a solutions architect take? (Choose TWO.)",
    options: [
      "Create an Amazon Kinesis Data Firehose delivery stream in each member account. Configure each stream to deliver logs directly to the central S3 bucket in the security account.",
      "Install the Amazon CloudWatch agent on all EC2 instances. Configure the agent to publish logs to a CloudWatch Logs log group in each account. Create a CloudWatch Logs subscription filter in each account that delivers logs to the central S3 bucket via Amazon Data Firehose.",
      "Enable S3 Object Lock on the central S3 bucket in Governance mode or Compliance mode with an appropriate retention period to prevent log deletion.",
      "Configure S3 Cross-Region Replication from the central S3 bucket to a replica bucket in a separate AWS account to protect against deletion.",
      "Create an S3 bucket policy on the central bucket that allows PutObject from all member account log delivery roles but explicitly denies DeleteObject and DeleteBucket for all principals including the bucket owner."
    ],
    correctAnswer: [1, 2],
    category: "Governance and Multi-Account Strategy",
    explanation: "CloudWatch agent → CloudWatch Logs → subscription filter → Firehose → central S3 is the standard AWS pattern for centralizing EC2 logs across accounts. S3 Object Lock in Compliance mode prevents any user, including the root account of the security account, from deleting or modifying objects before the retention period expires, meeting the tamper-proof requirement.",
    optionExplanations: [
      "Kinesis Data Firehose can deliver to S3 in another account, but the question specifies EC2 application logs. EC2 instances write logs to files, not natively to Firehose. A CloudWatch agent is needed to collect and forward logs from EC2 instances first.",
      "✓ Correct: The CloudWatch agent collects application logs from EC2 instances and publishes them to CloudWatch Logs. A subscription filter in each account delivers logs in real time to Firehose, which buffers and delivers to the central S3 bucket. This is the recommended multi-account log centralization pattern.",
      "✓ Correct: S3 Object Lock in Compliance mode prevents any user — including the root account of the security account — from overwriting or deleting objects before the retention period expires. This provides the strongest tamper-proof guarantee for audit log data.",
      "Cross-Region Replication creates a copy of logs but does not prevent deletion of the original objects. Replication is a backup strategy, not a deletion prevention mechanism.",
      "An S3 bucket policy that denies DeleteObject for all principals including the bucket owner can prevent deletion. However, this approach can be modified by a sufficiently privileged administrator with permission to change bucket policies, making it less robust than S3 Object Lock in Compliance mode."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions.html", title: "Cross-account log data sharing with subscriptions" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html", title: "Using S3 Object Lock" }
    ]
  },
  {
    id: 43,
    question: "A company needs to process large volumes of image files uploaded to Amazon S3. Each image must go through a multi-step processing pipeline: thumbnail generation, metadata extraction, content moderation, and final storage in a different S3 bucket. Each step can take between 5 and 60 seconds. If any step fails, the entire pipeline for that image must be retried from the failed step, and the operations team must be notified of repeated failures.\n\nWhich solution should a solutions architect recommend?",
    options: [
      "Chain multiple AWS Lambda functions using Lambda destinations. Configure each Lambda to invoke the next Lambda upon success, and an SNS topic on failure.",
      "Use AWS Step Functions to define the pipeline as a state machine with separate states for each processing step. Configure retry logic and a Catch block to send failure notifications to SNS when maximum retries are exceeded.",
      "Create an Amazon SQS queue for each pipeline step. Configure a Lambda function for each step that reads from its input queue and writes to the next queue on success.",
      "Use Amazon EventBridge Pipes to connect S3 event notifications to a series of Lambda functions in sequence, with built-in error handling between each step."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "AWS Step Functions is purpose-built for orchestrating multi-step workflows with built-in state management, error handling, and retry logic. Each processing step is a state in the state machine. Step Functions natively supports configurable retry policies per state and Catch blocks that route failures to notification services like SNS after maximum retries are exceeded.",
    optionExplanations: [
      "Lambda destinations can trigger another function on success or route to SNS/SQS on failure, but this creates a tightly coupled chain that is difficult to monitor, debug, and manage. There is no built-in state management, retry-from-failure-step capability, or visual execution history.",
      "✓ Correct: Step Functions provides a fully managed workflow orchestration service. Each image processing step is modeled as a state. The Retry field configures per-state retry logic (number of attempts, backoff rate). The Catch field routes the execution to an SNS notification state when retries are exhausted. Step Functions provides execution history and visual debugging for every image processing run.",
      "Using separate SQS queues for each step is loosely coupled and durable, but managing the state of which step failed, retrying from the failed step, and correlating failures across queues for notifications requires significant custom logic and adds operational complexity.",
      "EventBridge Pipes connects a source to a target with optional enrichment, but it is designed for simple point-to-point integrations, not for multi-step sequential workflows with per-step retry and error handling logic."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/step-functions/latest/dg/what-is-step-functions.html", title: "What is AWS Step Functions?" },
      { url: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html", title: "Error handling in Step Functions" }
    ]
  },
  {
    id: 44,
    question: "A company is planning to migrate a large on-premises data warehouse (50 TB) to AWS. The data warehouse currently runs on a proprietary MPP system with complex SQL queries and BI tool integrations. The company wants to minimize the need to rewrite SQL queries and maintain compatibility with existing BI tools. Query performance must be comparable to or better than the on-premises system.\n\nWhich AWS service should a solutions architect recommend for the target data warehouse?",
    options: [
      "Amazon RDS for PostgreSQL with read replicas to distribute query load.",
      "Amazon Redshift with RA3 nodes. Use Redshift Spectrum to query data directly in Amazon S3 without loading all data into Redshift.",
      "Amazon DynamoDB with DynamoDB Accelerator (DAX) for caching frequently accessed analytical data.",
      "Amazon Aurora PostgreSQL with the Parallel Query feature enabled for analytical workloads."
    ],
    correctAnswer: 1,
    category: "Data Analytics and Architecture",
    explanation: "Amazon Redshift is AWS's purpose-built cloud data warehouse that supports standard SQL and is compatible with most BI tools (Tableau, Power BI, Looker) through JDBC/ODBC. RA3 nodes separate compute and storage, allowing independent scaling. Redshift Spectrum enables querying data in S3 without loading it, reducing storage costs. Redshift's MPP architecture provides query performance comparable to or exceeding on-premises MPP systems at petabyte scale.",
    optionExplanations: [
      "Amazon RDS for PostgreSQL is an OLTP database optimized for transactional workloads. It does not have a columnar storage format, MPP query execution, or the query optimization features needed for complex analytical queries on 50 TB of data.",
      "✓ Correct: Amazon Redshift is designed as an MPP analytical data warehouse with columnar storage, automatic query optimization, and SQL compatibility. RA3 nodes use managed storage backed by S3 for cost-effective scaling. Redshift integrates natively with BI tools via JDBC/ODBC. Existing SQL queries can typically be migrated with minimal changes, and query performance at 50 TB scale is well within Redshift's operational range.",
      "DynamoDB is a NoSQL key-value and document database optimized for high-throughput, low-latency transactional workloads. It does not support complex SQL joins, aggregations, or the BI tool integrations required for a data warehouse workload.",
      "Aurora PostgreSQL Parallel Query optimizes certain analytical queries on OLTP databases, but Aurora is not designed as a data warehouse. It lacks columnar storage, materialized views optimized for OLAP, and the query optimization features of Redshift for complex multi-join analytical queries on tens of terabytes."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html", title: "What is Amazon Redshift?" },
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html", title: "Querying external data using Amazon Redshift Spectrum" }
    ]
  },
  {
    id: 45,
    question: "A company has a web application that is experiencing performance issues. An analysis reveals that the Amazon RDS for MySQL database is the bottleneck. Approximately 80% of database queries are read operations retrieving the same product catalog data that changes only a few times per day. The development team wants to implement a caching solution to reduce database load with minimal application code changes.\n\nWhich solution meets these requirements?",
    options: [
      "Add Amazon RDS read replicas. Update the application to send all read queries to the read replica endpoint and all write queries to the primary endpoint.",
      "Deploy Amazon ElastiCache for Redis with lazy loading (cache-aside). Update the application to check the cache before querying RDS, and populate the cache on cache misses.",
      "Enable Amazon Aurora Read Replicas and configure the application to use the Aurora reader endpoint for read queries.",
      "Deploy Amazon ElastiCache for Memcached in front of RDS. Use the ElastiCache Auto Discovery feature so the application automatically connects to the cache cluster."
    ],
    correctAnswer: 1,
    category: "Database and Storage",
    explanation: "ElastiCache for Redis with a lazy loading pattern reduces database read load by caching query results in memory. The application checks the cache first; on a cache hit it returns the cached data without querying RDS; on a cache miss it queries RDS and stores the result in the cache. This is the standard caching pattern for read-heavy workloads with infrequently changing data.",
    optionExplanations: [
      "RDS read replicas distribute read load to replica instances but still execute SQL queries against a database engine. Each read request still incurs database processing overhead. Replication also has a cost per replica instance. Application code must be updated to use different endpoints.",
      "✓ Correct: ElastiCache for Redis provides sub-millisecond response times for cached data. Lazy loading (cache-aside) is simple to implement: check cache → on hit, return cached value; on miss, query RDS, store in cache, return value. For product catalog data that changes a few times per day, a long TTL means the vast majority of read requests are served from cache, dramatically reducing RDS load.",
      "Aurora Read Replicas provide low-latency replicated reads but still execute SQL against Aurora's storage engine. They reduce load on the primary instance but do not provide the in-memory caching performance of ElastiCache. Aurora is also a different service from RDS for MySQL.",
      "ElastiCache for Memcached is a valid caching option, but Memcached is simpler than Redis and lacks features like persistence, replication, and richer data structures. For most caching scenarios, Redis is preferred. The core approach is the same as option B, but Redis is generally the recommended choice."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Strategies.html", title: "Caching strategies and best practices" },
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html", title: "What is Amazon ElastiCache for Redis?" }
    ]
  },
  {
    id: 46,
    question: "A company runs a multi-region active-passive application. The primary Region is us-east-1 and the passive Region is eu-west-1. Amazon Route 53 is configured with a failover routing policy. During a recent incident, the automatic failover to eu-west-1 did not occur even though the primary application in us-east-1 was unresponsive. The operations team needs to understand why and ensure automatic failover works correctly in the future.\n\nWhich action should a solutions architect take to ensure automatic failover works as expected?",
    options: [
      "Change the Route 53 routing policy from failover to latency-based routing. Latency-based routing automatically routes traffic away from unhealthy endpoints.",
      "Configure a Route 53 health check that monitors the primary application endpoint in us-east-1. Associate the health check with the primary failover record. Ensure the health check is configured to evaluate the application's actual health, not just TCP connectivity.",
      "Enable Route 53 Resolver DNS Firewall in both Regions to block DNS queries to unhealthy endpoints automatically.",
      "Configure AWS Global Accelerator with endpoint groups in both Regions. Global Accelerator automatically detects unhealthy endpoints and reroutes traffic."
    ],
    correctAnswer: 1,
    category: "High Availability and Disaster Recovery",
    explanation: "Route 53 failover routing only redirects traffic when the health check associated with the primary record reports the endpoint as unhealthy. If no health check is configured, or if the health check only tests TCP connectivity (not application health), Route 53 will not detect an application-level failure and will continue routing to the primary record. Configuring a comprehensive health check is the prerequisite for automatic failover.",
    optionExplanations: [
      "Latency-based routing routes traffic to the endpoint with the lowest network latency, not based on health. It does not perform automatic failover to a passive endpoint when the primary becomes unhealthy in the same way a failover policy does.",
      "✓ Correct: Route 53 failover routing requires a health check to be associated with the primary record. The health check must accurately reflect the application's health — for example, checking an HTTP endpoint that returns 200 only when the application is fully operational. Without a properly configured health check, Route 53 cannot determine that the primary is unhealthy and will not failover. An HTTP health check against the application's health endpoint is more reliable than a TCP check.",
      "Route 53 Resolver DNS Firewall filters DNS queries based on domain names to block access to malicious or unwanted domains. It does not monitor endpoint health or control failover behavior.",
      "AWS Global Accelerator does provide automatic failover based on health checks and is a valid solution. However, the question is about diagnosing and fixing the existing Route 53 failover configuration, making option B the most direct answer."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html", title: "Configuring DNS failover" },
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating.html", title: "Creating and updating health checks" }
    ]
  },
  {
    id: 47,
    question: "A company uses AWS Lambda for multiple workloads across different teams. The security team has mandated that all Lambda functions must use environment variable encryption with AWS KMS customer-managed keys (CMKs). Additionally, Lambda function code packages stored in Amazon S3 must be encrypted with a separate CMK. A central cloud governance team needs to verify compliance across hundreds of Lambda functions with minimal ongoing effort.\n\nWhich solution provides continuous compliance monitoring with the LEAST operational overhead?",
    options: [
      "Write a script that uses the AWS CLI to list all Lambda functions and check their KMS key configuration. Run the script weekly and email the results to the governance team.",
      "Create an AWS Config managed rule (or custom rule) that checks whether Lambda functions use the required KMS CMK for environment variable encryption. Create a second rule for S3 bucket encryption. Configure both rules to run continuously and send non-compliant notifications to an SNS topic.",
      "Enable AWS Security Hub and activate the AWS Foundational Security Best Practices standard. Security Hub will automatically detect Lambda functions without KMS encryption.",
      "Use AWS CloudTrail to log all CreateFunction and UpdateFunctionConfiguration API calls. Create a CloudWatch Logs metric filter to detect calls without KMS key parameters and trigger an SNS alarm."
    ],
    correctAnswer: 1,
    category: "Governance and Multi-Account Strategy",
    explanation: "AWS Config provides continuous, automated compliance monitoring of resource configurations. Config rules evaluate resources against defined compliance criteria whenever a configuration change occurs. SNS notifications alert the governance team immediately when a non-compliant resource is detected. This fully automated approach requires no scripting, no scheduled jobs, and scales across hundreds of functions without additional effort.",
    optionExplanations: [
      "A weekly script provides point-in-time compliance snapshots with up to one week of detection lag. Non-compliant resources can exist for days without the governance team being aware. Manual scripting also requires maintenance as Lambda and AWS CLI APIs evolve.",
      "✓ Correct: AWS Config rules evaluate resource configurations continuously and trigger on configuration changes. A rule checking for lambda:KMSKeyArn on all Lambda functions provides real-time compliance detection. When a function is created or updated without the required CMK, Config immediately marks it non-compliant and can trigger an SNS notification. This scales automatically to hundreds of functions with no ongoing operational effort.",
      "AWS Security Hub aggregates security findings from multiple services but its Foundational Security Best Practices standard does not include Lambda KMS CMK requirements as a built-in control. Custom insights or additional integrations would be required.",
      "CloudTrail logging detects API calls when functions are created or updated, but it cannot retroactively check existing functions and cannot detect gradual drift from compliance in functions that were never updated after the policy was introduced."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html", title: "Evaluating your AWS resource configurations with AWS Config" },
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/lambda-function-settings-check.html", title: "lambda-function-settings-check" }
    ]
  },
  {
    id: 48,
    question: "A solutions architect is designing the network architecture for a new application that will run in an Amazon VPC. The application requires the following:\n- Outbound internet access from private subnets\n- Inbound access from the internet on port 443 only\n- No inbound SSH or RDP access from the internet\n- Internal communication between application tiers on port 8080\n\nWhich combination of resources should the solutions architect deploy? (Choose THREE.)",
    options: [
      "An internet gateway attached to the VPC.",
      "A NAT gateway in a public subnet.",
      "An Application Load Balancer in a public subnet with a listener on port 443.",
      "A bastion host EC2 instance in a public subnet with SSH access from a corporate IP range.",
      "Security groups on the application tier instances that allow inbound port 8080 from the web tier security group and deny all other inbound traffic.",
      "A network ACL that blocks all inbound traffic on ports 22 and 3389 from the internet."
    ],
    correctAnswer: [0, 1, 2],
    category: "Network Design",
    explanation: "An internet gateway enables the VPC to communicate with the internet. A NAT gateway in a public subnet enables outbound internet access from private subnets. An ALB in a public subnet terminates inbound HTTPS (port 443) connections and forwards traffic to private application instances, providing the only internet-accessible entry point. Together, these three components satisfy all stated requirements.",
    optionExplanations: [
      "✓ Correct: An internet gateway is required for any VPC resource to communicate with the internet, whether for the ALB to receive inbound connections or for the NAT gateway to route outbound traffic from private subnets.",
      "✓ Correct: A NAT gateway allows EC2 instances in private subnets to initiate outbound connections to the internet (for software updates, API calls, etc.) while preventing inbound internet-initiated connections to those instances.",
      "✓ Correct: An ALB in the public subnet listens on port 443 and forwards requests to the application instances in private subnets. The ALB's security group allows inbound 443 from the internet. Application instances are in private subnets with no public IPs, so they have no direct inbound internet exposure.",
      "A bastion host provides SSH access to private instances, but the requirements explicitly state no inbound SSH access from the internet. A bastion host is unnecessary and contradicts the requirements.",
      "Security groups on the application tier should allow port 8080 from the web tier. However, security groups are stateful and implicitly deny all traffic not explicitly allowed — there is no need to explicitly deny other traffic. The correct security group configuration is to allow inbound 8080 from the web tier security group.",
      "Network ACLs are stateless and can block specific ports, but security groups (with implicit deny) are the primary mechanism for controlling instance-level traffic in this architecture. An explicit NACL deny for SSH/RDP is a defense-in-depth measure but not one of the three primary required components."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html", title: "Connect to the internet using an internet gateway" },
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html", title: "NAT gateways" },
      { url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html", title: "What is an Application Load Balancer?" }
    ]
  },
  {
    id: 49,
    question: "A startup is building a new mobile application on AWS. The team expects unpredictable traffic patterns, potentially ranging from zero users to millions of concurrent users. The backend must scale to zero when there is no traffic to minimize costs. The team has limited operational experience and wants to avoid managing servers. The application requires user authentication, a REST API, a NoSQL database, and the ability to push notifications to mobile devices.\n\nWhich combination of AWS services should a solutions architect recommend?",
    options: [
      "Amazon EC2 Auto Scaling with a minimum of 1 instance, Amazon API Gateway, Amazon RDS Aurora, and Amazon SNS.",
      "Amazon Cognito for authentication, Amazon API Gateway with Lambda integration, Amazon DynamoDB, and Amazon SNS for push notifications.",
      "AWS Elastic Beanstalk with auto scaling, Amazon API Gateway, Amazon DocumentDB, and Amazon SES for notifications.",
      "Amazon ECS with Fargate and minimum tasks set to 0, Amazon API Gateway, Amazon DynamoDB, and Amazon Pinpoint."
    ],
    correctAnswer: 1,
    category: "Serverless Architecture",
    explanation: "Amazon Cognito provides fully managed user authentication for mobile apps. API Gateway with Lambda scales to zero when there is no traffic, with no idle costs. DynamoDB is a serverless NoSQL database with on-demand capacity that also scales to zero cost at zero traffic. Amazon SNS supports mobile push notifications to iOS, Android, and other platforms. This stack is entirely serverless, requires no server management, and has near-zero cost at zero traffic.",
    optionExplanations: [
      "EC2 Auto Scaling with a minimum of 1 instance incurs continuous EC2 charges even with zero traffic. Amazon RDS Aurora is a relational database requiring an always-on instance, adding further baseline cost. This does not meet the scale-to-zero requirement.",
      "✓ Correct: Cognito handles user pools, sign-in, and token management with no server management. API Gateway + Lambda invocations are billed per request with no idle cost. DynamoDB on-demand mode charges only for actual read/write operations. SNS delivers push notifications to mobile platforms with per-notification pricing. The entire stack scales to zero cost at zero traffic and requires no infrastructure management.",
      "Elastic Beanstalk manages application deployment on EC2 instances, which incur charges even at zero traffic. DocumentDB requires an always-on cluster. Neither meets the scale-to-zero cost requirement. SES is for email, not mobile push notifications.",
      "ECS with Fargate and minimum tasks set to 0 can scale to zero but has cold-start latency when scaling from zero. Pinpoint supports push notifications but also sends SMS and email. However, Fargate cold starts from 0 add latency for users, and this stack has more management overhead than the fully serverless option B."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html", title: "What is Amazon Cognito?" },
      { url: "https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-application-as-subscriber.html", title: "Mobile push notifications" }
    ]
  },
  {
    id: 50,
    question: "A company operates a high-frequency trading platform on AWS that requires ultra-low latency communication between EC2 instances processing market data. The instances are in the same AWS Region and must exchange data with latencies measured in microseconds. The workload requires dedicated, consistent network performance without contention from other workloads.\n\nWhich combination of EC2 features should a solutions architect recommend to achieve the lowest possible latency? (Choose TWO.)",
    options: [
      "Deploy the EC2 instances in a cluster placement group.",
      "Deploy the EC2 instances in a spread placement group across multiple Availability Zones.",
      "Enable Enhanced Networking with Elastic Fabric Adapter (EFA) on the EC2 instances.",
      "Attach multiple Elastic Network Interfaces (ENIs) to each EC2 instance and bond them for increased throughput.",
      "Enable EC2 Instance Connect for all instances to ensure direct network connectivity."
    ],
    correctAnswer: [0, 2],
    category: "Compute and Containers",
    explanation: "A cluster placement group packs EC2 instances physically close together within a single Availability Zone, minimizing network hop distance and achieving the lowest possible network latency between instances. Elastic Fabric Adapter (EFA) provides a network interface with OS-bypass capabilities that allows the application to communicate directly with the EFA hardware, bypassing the OS kernel network stack to achieve microsecond-level latency.",
    optionExplanations: [
      "✓ Correct: A cluster placement group places instances on the same underlying hardware or in close physical proximity within an AZ. This minimizes the physical network path between instances, providing the lowest latency and highest bandwidth available for EC2 instance-to-instance communication.",
      "A spread placement group distributes instances across distinct underlying hardware to reduce correlated failures. Spreading instances across multiple AZs increases the physical distance between them, which increases network latency. This is the opposite of what is needed for ultra-low latency.",
      "✓ Correct: EFA (Elastic Fabric Adapter) provides a high-performance network interface that supports OS-bypass networking. Applications can communicate directly with the EFA hardware using libfabric, bypassing the Linux kernel network stack entirely. This removes OS processing overhead and achieves microsecond-scale latencies for inter-instance communication, which is essential for HPC and high-frequency trading workloads.",
      "Bonding multiple ENIs increases aggregate throughput but does not reduce per-packet latency. Latency is determined by the network path and processing overhead, not by the number of network interfaces.",
      "EC2 Instance Connect is a browser-based SSH connection tool for managing EC2 instances. It is an administrative tool and has no effect on application network performance or latency."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html", title: "Placement groups" },
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html", title: "Elastic Fabric Adapter" }
    ]
  }
,
  {
    id: 51,
    question: "A company processes financial transactions using an event-driven architecture. Transaction events are published to an Amazon SNS topic. Multiple downstream services subscribe to the topic: a fraud detection service, an accounting service, and an audit logging service. The fraud detection service requires that every transaction event be delivered exactly once, in order, and that unprocessed events are retained for up to 14 days if the service is unavailable.\n\nWhich subscription configuration meets the fraud detection service's requirements?",
    options: [
      "Subscribe the fraud detection service directly to the SNS topic using an HTTPS endpoint. Configure the SNS topic to retry failed deliveries.",
      "Create an Amazon SQS standard queue. Subscribe the SQS queue to the SNS topic. Configure the fraud detection service to poll the SQS queue.",
      "Create an Amazon SQS FIFO queue. Subscribe the SQS FIFO queue to the SNS topic. Configure the fraud detection service to poll the SQS FIFO queue.",
      "Create an Amazon Kinesis Data Stream with a single shard. Subscribe the Kinesis stream to the SNS topic. Configure the fraud detection service to consume from the Kinesis stream."
    ],
    correctAnswer: 2,
    category: "Application Integration",
    explanation: "SQS FIFO queues provide exactly-once processing and strict message ordering within a message group. Messages are retained for up to 14 days. SNS supports delivery to SQS FIFO queues as subscribers. This combination satisfies all three requirements: exactly-once delivery, ordered processing, and 14-day retention for offline periods.",
    optionExplanations: [
      "HTTPS endpoint subscriptions deliver SNS messages directly to the service. If the service is unavailable, SNS retries for a limited time but does not retain messages for 14 days. There is also no exactly-once or ordering guarantee with direct HTTPS delivery.",
      "SQS standard queues provide at-least-once delivery (not exactly-once) and do not guarantee message ordering. While retention up to 14 days is supported, the lack of exactly-once and ordering guarantees means this option does not fully meet the requirements.",
      "✓ Correct: SQS FIFO queues guarantee exactly-once processing (deduplication) and strict first-in, first-out ordering within a message group. Messages can be retained for up to 14 days. SNS can deliver to SQS FIFO queues as a subscriber. The fraud detection service polls the FIFO queue at its own pace, and unprocessed messages wait in the queue during downtime.",
      "Kinesis Data Streams preserve message order per shard and retain records for up to 7 days by default (extendable to 365 days). However, Kinesis does not natively subscribe to SNS, and connecting SNS to Kinesis requires additional components. Kinesis also does not provide native exactly-once semantics."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html", title: "Amazon SQS FIFO queues" },
      { url: "https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html", title: "Fanout to Amazon SQS queues" }
    ]
  },
  {
    id: 52,
    question: "A company is designing a solution to ingest and analyze streaming clickstream data from its website. The data volume is approximately 5 GB per hour. The analytics team needs to run SQL queries on the data within 60 seconds of ingestion and store raw data in Amazon S3 for long-term retention. The solution must be fully managed with no cluster provisioning.\n\nWhich architecture meets these requirements?",
    options: [
      "Send clickstream data to Amazon Kinesis Data Streams. Use an Amazon EMR cluster to process records from the stream and load results into Amazon Redshift for SQL queries.",
      "Send clickstream data to Amazon Kinesis Data Firehose. Configure Firehose to deliver records to Amazon S3. Use Amazon Athena to query the data in S3.",
      "Send clickstream data to Amazon Kinesis Data Firehose with Amazon Data Firehose's dynamic partitioning. Deliver records to Amazon S3. Use Amazon Kinesis Data Analytics (Apache Flink) to run SQL on the stream in real time.",
      "Send clickstream data to Amazon Managed Streaming for Apache Kafka (Amazon MSK). Use Apache Spark Structured Streaming on EMR to process records. Load aggregated results into Amazon Redshift."
    ],
    correctAnswer: 1,
    category: "Data Analytics and Architecture",
    explanation: "Kinesis Data Firehose is a fully managed service that buffers and delivers streaming data to S3 with no provisioning. Athena is a serverless query service that runs SQL directly against data in S3 with no cluster management. Firehose buffers data and delivers it to S3 within 60 seconds (or less with the smallest buffer size), satisfying the near-real-time query requirement. Both services are fully managed.",
    optionExplanations: [
      "Amazon EMR requires cluster provisioning and management. EMR is not a fully managed, serverless service. This option does not meet the no-cluster-provisioning requirement.",
      "✓ Correct: Kinesis Data Firehose is fully managed — no provisioning, patching, or scaling is required. It delivers data to S3 within the configured buffer interval (minimum 60 seconds). Athena is serverless and queries data in S3 using standard SQL with no infrastructure management. Together, they provide a fully managed, cost-effective pipeline that satisfies all requirements.",
      "Kinesis Data Analytics (Managed Service for Apache Flink) can process streams in real time and is fully managed. However, the question asks about SQL queries within 60 seconds — Athena querying S3 data delivered by Firehose is simpler and cheaper. The Flink option adds complexity and cost for use cases that Athena + Firehose can address.",
      "Amazon MSK requires cluster provisioning and management. EMR is also not serverless. This option contradicts the no-cluster-provisioning requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html", title: "What is Amazon Data Firehose?" },
      { url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html", title: "What is Amazon Athena?" }
    ]
  },
  {
    id: 53,
    question: "A company wants to allow its developers to securely access EC2 instances in private subnets without opening inbound SSH ports or managing SSH key pairs. The solution must integrate with the company's existing AWS IAM identity management and provide an audit trail of all session activity.\n\nWhich solution meets these requirements?",
    options: [
      "Deploy a bastion host EC2 instance in a public subnet. Grant developers SSH access to the bastion host, then SSH from the bastion to private instances. Log all bastion sessions to Amazon CloudWatch Logs.",
      "Use AWS Systems Manager Session Manager. Attach an IAM instance profile with the AmazonSSMManagedInstanceCore policy to each EC2 instance. Grant developer IAM users or roles the ssm:StartSession permission.",
      "Configure AWS Client VPN with certificate-based authentication. Provision client certificates for each developer. Connect developers to the VPC via VPN, then use SSH to access private instances.",
      "Use Amazon EC2 Instance Connect to push temporary SSH public keys to instances. Grant developers ec2-instance-connect:SendSSHPublicKey permission."
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "AWS Systems Manager Session Manager provides browser-based and CLI-based interactive shell access to EC2 instances without opening inbound ports, managing SSH keys, or deploying bastion hosts. Access is controlled entirely through IAM policies. Session activity is logged to AWS CloudTrail and can be streamed to CloudWatch Logs and S3 for audit purposes.",
    optionExplanations: [
      "A bastion host requires opening inbound SSH (port 22) from developer IP addresses, which the requirement explicitly avoids. It also requires SSH key management and adds infrastructure to maintain.",
      "✓ Correct: Session Manager uses the SSM agent (installed by default on Amazon Linux 2, Windows Server, and other managed AMIs) to establish a secure, encrypted session without any inbound port rules. IAM controls who can start sessions. All session activity, commands, and output are logged to CloudTrail, and optionally to CloudWatch Logs and S3, providing a complete audit trail.",
      "AWS Client VPN provides network-level access to the VPC but still requires SSH key management and open SSH ports on the instances. It does not eliminate the need for inbound SSH access from within the VPN network.",
      "EC2 Instance Connect pushes a temporary SSH public key to the instance and allows SSH access. However, it still requires the SSH port (22) to be open in the security group for inbound connections, which does not satisfy the no-inbound-SSH-port requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html", title: "AWS Systems Manager Session Manager" },
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-logging.html", title: "Logging session activity" }
    ]
  },
  {
    id: 54,
    question: "A company runs a microservices application on Amazon EKS. The application processes sensitive customer data and must meet the following security requirements:\n- Container images must be scanned for vulnerabilities before deployment\n- Only images from approved repositories may be deployed to the cluster\n- Critical vulnerabilities must block deployment automatically\n\nWhich combination of AWS services and Kubernetes features should a solutions architect use? (Choose TWO.)",
    options: [
      "Enable Amazon ECR image scanning (enhanced scanning with Amazon Inspector). Configure ECR lifecycle policies to automatically delete images with critical findings.",
      "Use Amazon ECR as the container image registry. Enable Amazon ECR image scanning on push. Integrate with a Kubernetes admission controller (such as OPA Gatekeeper or Kyverno) to block deployment of images with critical vulnerabilities or from unapproved repositories.",
      "Use AWS Security Hub to aggregate ECR vulnerability findings and create a Lambda function that automatically deletes vulnerable images from ECR.",
      "Configure IAM roles for service accounts (IRSA) on all EKS pods to restrict container registry access to ECR only.",
      "Enable Amazon GuardDuty EKS Protection to detect and block containers with critical vulnerabilities at runtime."
    ],
    correctAnswer: [0, 1],
    category: "Security and Compliance",
    explanation: "ECR enhanced scanning (powered by Amazon Inspector) automatically scans images on push and provides CVE findings. A Kubernetes admission controller (OPA Gatekeeper or Kyverno) enforces policies at deployment time — blocking images with critical vulnerabilities and restricting deployments to approved ECR repositories. These two components together enforce all three security requirements.",
    optionExplanations: [
      "✓ Correct: Amazon ECR enhanced scanning with Amazon Inspector provides continuous vulnerability scanning of container images. Inspector identifies CVEs and assigns severity levels. Scanning on push ensures images are evaluated before they are available for deployment. This satisfies the 'scan before deployment' requirement.",
      "✓ Correct: A Kubernetes admission controller (OPA Gatekeeper or Kyverno) evaluates pod/deployment manifests against defined policies at admission time. Policies can require that all images come from approved ECR repositories and that images do not have critical-severity Inspector findings. If an image fails any policy, the admission controller rejects the deployment automatically.",
      "AWS Security Hub aggregates findings but cannot directly block Kubernetes deployments. A Lambda function that deletes vulnerable images is reactive and creates a race condition where vulnerable images could be deployed before deletion.",
      "IRSA restricts what AWS APIs pods can call, not which container registries they can pull images from. Image pull access is controlled through Kubernetes image pull secrets or node instance profiles, not IRSA.",
      "Amazon GuardDuty EKS Protection detects suspicious runtime behaviors (privilege escalation, cryptomining, etc.) but does not scan images for CVEs and cannot block deployments based on vulnerability findings."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html", title: "Image scanning in Amazon ECR" },
      { url: "https://docs.aws.amazon.com/eks/latest/userguide/cluster-auth.html", title: "Managing users or IAM roles for your cluster" }
    ]
  },
  {
    id: 55,
    question: "A company runs a global SaaS application with customers in North America, Europe, and Asia Pacific. The application serves dynamic API responses generated by Lambda functions behind API Gateway. Users in Asia Pacific report significantly higher API response latency (800-1200 ms) compared to users in North America (80-120 ms). The company wants to reduce Asia Pacific latency to under 200 ms without changing the application architecture.\n\nWhich solution should a solutions architect recommend?",
    options: [
      "Enable API Gateway edge-optimized endpoints. CloudFront will cache API responses at edge locations closest to Asia Pacific users.",
      "Deploy a duplicate API Gateway and Lambda stack in an Asia Pacific Region. Use Amazon Route 53 latency-based routing to direct Asia Pacific users to the regional deployment.",
      "Use AWS Global Accelerator with the API Gateway endpoint as an origin. Global Accelerator will route traffic over the AWS global backbone network to reduce latency.",
      "Enable API Gateway response caching with a 300-second TTL. Cached responses will be returned from the AWS Region without executing Lambda functions."
    ],
    correctAnswer: 1,
    category: "Content Delivery and Performance",
    explanation: "Deploying the application stack in an AWS Region close to Asia Pacific users (e.g., ap-northeast-1 or ap-southeast-1) eliminates the need for requests to traverse the internet from Asia Pacific to us-east-1. Route 53 latency-based routing automatically directs each user to the nearest healthy regional endpoint. This is the most effective approach for reducing latency for dynamic API responses.",
    optionExplanations: [
      "API Gateway edge-optimized endpoints use CloudFront to route requests to the nearest AWS edge location, which reduces the TLS handshake latency. However, the API request still travels from the edge location to the API Gateway Region (us-east-1) for Lambda execution. Dynamic responses cannot be cached, so this does not significantly reduce end-to-end latency for dynamic API calls.",
      "✓ Correct: Deploying a full regional stack (API Gateway + Lambda) in an Asia Pacific Region means API requests are processed locally, typically within 20-50 ms, rather than traversing the internet to North America. Route 53 latency-based routing automatically sends each user to the lowest-latency regional endpoint. This is the definitive solution for reducing dynamic API latency for geographically distributed users.",
      "AWS Global Accelerator routes traffic over the AWS private backbone network from the nearest edge location to the origin Region. This reduces internet routing variability but the request still travels to the origin Region for Lambda execution. For dynamic responses, the round-trip to us-east-1 from Asia Pacific is still approximately 200-400 ms, which may not meet the under-200ms requirement.",
      "API Gateway response caching caches responses in the same Region where the API is deployed (us-east-1). Asia Pacific users still receive cached responses from us-east-1 over the public internet, so latency remains high. Additionally, dynamic API responses are typically not suitable for long-TTL caching."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html", title: "Latency-based routing" },
      { url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html", title: "API Gateway endpoint types" }
    ]
  },
  {
    id: 56,
    question: "A company needs to implement a solution to automatically respond to AWS account root user login events. When a root user login is detected, the company requires that: (1) all IAM user access keys are immediately disabled, (2) the security team is notified via email within 5 minutes, and (3) the event is recorded for forensic analysis.\n\nWhich architecture meets all three requirements?",
    options: [
      "Enable AWS CloudTrail in all Regions. Create an Amazon CloudWatch Events (EventBridge) rule that matches ConsoleLogin events where the userIdentity type is Root. Configure the rule to trigger an AWS Lambda function that disables IAM access keys and sends an SNS email notification.",
      "Enable Amazon GuardDuty. Configure GuardDuty to send findings to Amazon SNS when a root user login is detected. Create a Lambda function triggered by SNS to disable IAM access keys.",
      "Enable AWS Config with the root-account-mfa-enabled managed rule. Create an SNS notification for non-compliant resources. Configure a Lambda function triggered by SNS to disable IAM access keys.",
      "Create an IAM policy that denies all actions for the root user. Use AWS Organizations SCPs to prevent root user login across all member accounts."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "CloudTrail logs all API calls including ConsoleLogin events. EventBridge can match on root user login events in near real time. A Lambda function can programmatically disable all IAM user access keys using the IAM API and publish to an SNS topic for email notification. CloudTrail provides the forensic event record. This single architecture satisfies all three requirements.",
    optionExplanations: [
      "✓ Correct: CloudTrail records the root user ConsoleLogin event. EventBridge matches the event pattern (userIdentity.type = Root, eventName = ConsoleLogin) and triggers Lambda in near real time. Lambda calls iam:UpdateAccessKey to disable all access keys and publishes to SNS for email notification. CloudTrail retains the event for forensic analysis. This architecture satisfies all three requirements.",
      "Amazon GuardDuty can detect suspicious root activity and generate findings, but GuardDuty findings may have a detection delay of minutes to hours depending on the threat intelligence used. The 5-minute notification requirement and immediate key disablement are better served by direct EventBridge matching on CloudTrail events.",
      "AWS Config with the root-account-mfa-enabled rule checks whether MFA is enabled for the root account — it does not detect real-time root login events. Config rules evaluate configuration state, not API call events.",
      "IAM policies cannot deny access for the root user — the root user bypasses IAM policies. SCPs in Organizations can restrict root user actions in member accounts but cannot prevent root user login to the management account. This approach cannot satisfy the notification and forensic requirements."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html", title: "CloudTrail concepts" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-use-cases.html", title: "Amazon EventBridge use cases" }
    ]
  },
  {
    id: 57,
    question: "A company uses AWS CodePipeline to deploy a three-tier web application. The pipeline builds a Docker image, pushes it to Amazon ECR, and deploys it to Amazon ECS on Fargate. After a recent deployment, the new task definition was deployed successfully, but the application started returning errors. The operations team wants the pipeline to automatically verify application health after deployment and roll back to the previous task definition if the health check fails.\n\nWhich solution should a solutions architect add to the pipeline?",
    options: [
      "Add a manual approval step after the deployment stage in CodePipeline. Require the operations team to verify application health before approving the pipeline to continue.",
      "Configure the ECS service to use a deployment circuit breaker with rollback enabled. Add a post-deployment CodePipeline action that waits for the ECS service to reach a steady state and fails the pipeline if the circuit breaker triggers a rollback.",
      "Create a CloudWatch alarm on the ECS service's HealthyHostCount metric. Configure CodeDeploy to monitor the alarm and roll back if it triggers.",
      "Add an AWS Lambda invoke action after the deployment stage that runs an integration test against the new deployment and calls the CodePipeline PutJobFailureResult API if the test fails."
    ],
    correctAnswer: 1,
    category: "Deployment and Infrastructure as Code",
    explanation: "The ECS deployment circuit breaker automatically detects failed deployments (tasks that fail to start or fail health checks) and rolls back to the previous task definition without manual intervention. The CodePipeline stage can wait for the ECS deployment to reach a steady state — if the circuit breaker triggers a rollback, the wait action reports failure, propagating the failure status through the pipeline.",
    optionExplanations: [
      "A manual approval step requires human intervention and does not provide automatic rollback. The requirement specifies automatic verification and rollback.",
      "✓ Correct: The ECS deployment circuit breaker monitors task health during deployment. If a configurable number of tasks fail to reach a running and healthy state, the circuit breaker automatically rolls back to the previous task definition. Configuring the CodePipeline deployment action to wait for service steady state means the pipeline fails if the circuit breaker rolls back, providing visibility into the failure. This is a native ECS capability requiring minimal additional configuration.",
      "CodeDeploy monitors alarms for EC2 and Lambda deployments, but ECS Fargate deployments managed directly through ECS (not CodeDeploy) use the circuit breaker mechanism. The HealthyHostCount metric applies to EC2 instances behind a load balancer, not directly to ECS tasks.",
      "A Lambda integration test provides application-level verification and is a valid approach, but it requires writing and maintaining test code, and the PutJobFailureResult call does not automatically trigger ECS rollback — it only fails the pipeline. The circuit breaker natively handles ECS-level rollback."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html", title: "Rolling update deployment circuit breaker" },
      { url: "https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECS.html", title: "Amazon ECS deploy action" }
    ]
  },
  {
    id: 58,
    question: "A company is running a batch analytics job on Amazon EMR that reads data from Amazon S3 and writes results back to S3. The job currently uses On-Demand EC2 instances for both the master node and core nodes. The job runs for 4 hours every night and does not require high availability for the master node. The company wants to reduce costs by up to 70% without significantly impacting job completion time.\n\nWhich combination of changes should a solutions architect recommend? (Choose TWO.)",
    options: [
      "Replace On-Demand instances on the core nodes with Spot Instances. Configure instance fleets with multiple instance types to maximize Spot availability.",
      "Replace the On-Demand master node with a Spot Instance.",
      "Use EMR Serverless instead of a managed EMR cluster to eliminate EC2 instance costs entirely.",
      "Add EMR task nodes using Spot Instances to increase processing parallelism and reduce job completion time.",
      "Enable EMR auto-scaling on the core node instance group to scale down to zero after the job completes."
    ],
    correctAnswer: [0, 3],
    category: "Cost Optimization",
    explanation: "Replacing core nodes with Spot Instances can reduce per-instance costs by up to 90%. Using instance fleets with diverse instance types maximizes Spot capacity availability. Adding Spot task nodes increases parallelism, which can reduce job duration and offset any time lost to occasional Spot interruptions, while further reducing per-unit compute cost.",
    optionExplanations: [
      "✓ Correct: Core nodes process data and run YARN containers. Using Spot Instances for core nodes dramatically reduces costs. Configuring instance fleets with multiple instance types (e.g., m5.xlarge, m5a.xlarge, m4.xlarge) increases the probability of obtaining Spot capacity and reduces interruption risk. EMRFS (S3-backed storage) means HDFS data loss from Spot interruptions is managed.",
      "The EMR master node manages the cluster and coordinates jobs. If the master node is interrupted by Spot reclamation, the entire job fails. Even when high availability is not required, using a Spot master node introduces unacceptable job failure risk for a nightly batch process.",
      "EMR Serverless can eliminate EC2 management overhead, but for 4-hour nightly batch jobs with predictable resource needs, managed EMR with Spot Instances typically provides better cost-performance than EMR Serverless for large-scale workloads.",
      "✓ Correct: EMR task nodes are worker nodes that only run YARN containers — they do not store HDFS data. Using Spot task nodes adds compute capacity at low cost with no data loss risk if interrupted. More task nodes increase parallelism, potentially reducing the 4-hour job duration while significantly reducing compute cost.",
      "Auto-scaling can reduce capacity after a job completes, but the core nodes cannot scale to zero while the cluster is running (at least one core node must remain active). This provides minimal cost savings compared to Spot Instances."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-instance-fleet.html", title: "Configure instance fleets" },
      { url: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-master-core-task-nodes.html", title: "Understanding master, core, and task nodes" }
    ]
  },
  {
    id: 59,
    question: "A company is designing a multi-tenant SaaS platform on AWS. The platform serves thousands of enterprise customers, each of which requires:\n- Complete isolation of their data from other customers\n- The ability to use their own AWS KMS keys for data encryption (Bring Your Own Key)\n- Separate AWS CloudTrail logs for their tenant's activity\n- The ability to enforce their own IAM policies within their tenant environment\n\nWhich tenancy model should a solutions architect recommend?",
    options: [
      "Single AWS account with resource-based policies and customer-managed KMS keys per tenant.",
      "Single AWS account with separate VPCs per tenant, using AWS KMS key policies to restrict key usage to each tenant's resources.",
      "Separate AWS account per tenant managed through AWS Organizations. Each customer account uses their own KMS keys and CloudTrail configuration.",
      "Single AWS account with tenant-specific IAM roles and separate DynamoDB tables per tenant, using envelope encryption with per-tenant KMS keys."
    ],
    correctAnswer: 2,
    category: "Governance and Multi-Account Strategy",
    explanation: "Separate AWS accounts provide the strongest isolation model. Each account has its own KMS key namespace, its own CloudTrail configuration, its own IAM policy space, and complete resource isolation. AWS Organizations enables centralized management while each tenant account operates independently. This is the recommended model for enterprise SaaS requirements with strict compliance and isolation needs.",
    optionExplanations: [
      "A single account with resource-based policies provides logical isolation, but all tenants share the same IAM namespace, the same CloudTrail log stream (unless filtered per tenant), and the same account-level service limits. Enterprise customers requiring separate audit trails and custom IAM policies cannot be fully satisfied in a shared account.",
      "Separate VPCs provide network isolation, but VPCs share the same IAM namespace and the same CloudTrail trail. Tenants cannot enforce their own IAM policies independently, and CloudTrail logs cannot be cleanly separated per tenant without custom filtering.",
      "✓ Correct: Separate AWS accounts provide hard boundaries between tenants. Each tenant account has its own KMS key store, its own CloudTrail configuration (enabling tenant-specific audit logs), its own IAM namespace for custom policies, and complete resource isolation enforced by AWS. AWS Organizations enables centralized billing, governance (SCPs), and account provisioning through account vending automation.",
      "A single-account model with tenant-specific roles and per-tenant DynamoDB tables provides data-level isolation but shares IAM, CloudTrail, and KMS namespaces. Tenants cannot enforce their own IAM policies within a shared account, and CloudTrail logs cannot be cleanly separated per tenant."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/tenant-isolation.html", title: "SaaS Architecture Fundamentals — Tenant isolation" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html", title: "What is AWS Organizations?" }
    ]
  },
  {
    id: 60,
    question: "A company's application generates thousands of small files (average 50 KB each) per hour and stores them in Amazon S3. A daily analytics job reads all files from the previous day to generate reports. The analytics team reports that Athena queries against these S3 files are slow and expensive because Athena reads a large number of small files, leading to high overhead per file. The company wants to improve query performance and reduce Athena costs without changing the file ingestion pipeline.\n\nWhich solution should a solutions architect recommend?",
    options: [
      "Enable S3 Transfer Acceleration on the bucket to speed up file uploads and improve the throughput available to Athena queries.",
      "Use AWS Glue ETL jobs to compact the small files into larger Parquet files partitioned by date. Store the compacted files in a separate S3 prefix and point the Athena table at the compacted data.",
      "Increase the Athena query execution concurrency limit to allow more parallel file reads.",
      "Enable S3 Intelligent-Tiering on the bucket so that frequently accessed files are stored in a faster storage tier, improving Athena read performance."
    ],
    correctAnswer: 1,
    category: "Data Analytics and Architecture",
    explanation: "Athena performance and cost scale with the volume of data scanned and the number of files opened. Many small files create high per-file overhead. Compacting small files into fewer, larger columnar files (Parquet) with date-based partitioning dramatically reduces the number of files Athena must open and, with columnar format, reduces the amount of data scanned per query. This directly reduces both query time and cost.",
    optionExplanations: [
      "S3 Transfer Acceleration improves upload performance from clients to S3 over long distances using CloudFront edge locations. It does not affect Athena's read performance or the small-file problem.",
      "✓ Correct: AWS Glue ETL jobs can read thousands of small files, combine them, and write the output as a small number of large Parquet files partitioned by date (e.g., s3://bucket/compacted/date=2025-01-15/). Parquet's columnar format allows Athena to skip columns not referenced in the query. Fewer, larger files dramatically reduce the number of S3 API calls Athena makes, improving performance and reducing per-query data scan costs.",
      "Increasing Athena concurrency allows more queries to run in parallel but does not address the root cause — the large number of small files that each query must open. More concurrency on a high-overhead workload does not reduce per-query latency.",
      "S3 Intelligent-Tiering moves objects between access tiers (Standard, Infrequent Access, Archive) based on access patterns. All tiers provide the same S3 read API performance. S3 storage tiers affect storage cost, not Athena read throughput or query latency."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-parquet-home.html", title: "Reading and writing Parquet files in AWS Glue" },
      { url: "https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html", title: "Performance tuning in Athena" }
    ]
  }
,
  {
    id: 61,
    question: "A company runs a critical e-commerce application on AWS. The application uses Amazon Aurora MySQL as the primary database. The database team has identified that certain long-running analytical queries from the BI team are consuming significant CPU on the primary Aurora instance and degrading transaction performance for end users.\n\nWhich solution should a solutions architect recommend to isolate analytical query load from transactional load with the LEAST architectural change?",
    options: [
      "Create an Aurora Read Replica. Update the BI tool connection string to point to the Aurora Reader Endpoint, directing analytical queries to the read replica while transactional queries continue to use the primary instance.",
      "Migrate the BI queries to Amazon Redshift. Use AWS Database Migration Service (AWS DMS) with ongoing replication to keep Redshift in sync with Aurora.",
      "Enable Aurora Parallel Query on the primary Aurora instance to accelerate analytical queries without impacting transactional performance.",
      "Deploy a second Aurora cluster as a clone. Direct BI queries to the cloned cluster."
    ],
    correctAnswer: 0,
    category: "Database and Storage",
    explanation: "Aurora Read Replicas share the same underlying distributed storage as the primary instance, providing low-latency replication with minimal lag. The Aurora Reader Endpoint automatically load-balances connections across all available replicas. Redirecting BI queries to the Reader Endpoint requires only a connection string change in the BI tool — no application code changes and no new data pipelines.",
    optionExplanations: [
      "✓ Correct: Aurora Read Replicas are the purpose-built solution for isolating read workloads from the primary writer. The Reader Endpoint provides a single DNS name that automatically routes connections to available replicas. Changing the BI tool's connection string to use the Reader Endpoint is the minimal change required. The primary instance is relieved of analytical query CPU load, restoring transaction performance.",
      "Migrating to Redshift with DMS replication requires setting up and managing a replication pipeline, schema mapping, and an additional service. This is significantly more complex than using a read replica and introduces replication latency.",
      "Aurora Parallel Query accelerates analytical queries by pushing query processing down to the storage layer. However, it still executes on the primary instance and competes with transactional workloads for buffer pool and CPU resources. It does not isolate the workloads.",
      "An Aurora database clone shares storage with the source cluster at the time of cloning. Over time, the clone diverges and storage costs increase. Clones are useful for testing but are not a recommended solution for ongoing production read isolation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html", title: "Replication with Amazon Aurora" },
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-endpoints.html", title: "Amazon Aurora connection management" }
    ]
  },
  {
    id: 62,
    question: "A company stores petabytes of research data in Amazon S3. The data consists of large scientific datasets that are accessed frequently for 6 months after creation, then rarely accessed for the remaining 5-year retention period. After 5 years, data must be permanently deleted. The data retrieval time for rarely accessed data can be up to 12 hours. The company wants to minimize storage costs while meeting these requirements.\n\nWhich S3 Lifecycle configuration meets these requirements?",
    options: [
      "Transition objects to S3 Standard-IA after 180 days. Transition to S3 Glacier Deep Archive after 180 days. Expire objects after 5 years (1,825 days).",
      "Transition objects to S3 Glacier Flexible Retrieval after 180 days. Expire objects after 5 years (1,825 days).",
      "Transition objects to S3 Intelligent-Tiering after 180 days. Expire objects after 5 years (1,825 days).",
      "Transition objects to S3 One Zone-IA after 180 days. Transition to S3 Glacier Instant Retrieval after 1 year. Expire objects after 5 years (1,825 days)."
    ],
    correctAnswer: 0,
    category: "Cost Optimization",
    explanation: "S3 Glacier Deep Archive is the lowest-cost S3 storage class, designed for data that is rarely accessed and can tolerate retrieval times of up to 12 hours. Transitioning to Standard-IA first after 6 months covers any occasional access during the transition period, then moving to Glacier Deep Archive minimizes long-term storage costs. The expiration rule deletes objects at 5 years.",
    optionExplanations: [
      "✓ Correct: S3 Standard-IA provides lower-cost storage than S3 Standard for infrequently accessed data while supporting immediate retrieval. After the 6-month active period, Standard-IA covers occasional access. S3 Glacier Deep Archive offers the lowest storage cost (~$0.00099/GB/month) for data with up to 12-hour retrieval time — matching the requirement. The expiration rule at 1,825 days (5 years) automatically deletes objects.",
      "S3 Glacier Flexible Retrieval (formerly S3 Glacier) provides retrieval in minutes to 12 hours and costs more per GB than Glacier Deep Archive. Since the requirement allows up to 12-hour retrieval, Glacier Deep Archive is the more cost-effective choice.",
      "S3 Intelligent-Tiering monitors access patterns and moves objects between tiers automatically, but it charges a per-object monitoring fee. For data with a predictable access pattern (frequent for 6 months, then rare), a Lifecycle policy is more cost-effective as it avoids the monitoring fee.",
      "S3 One Zone-IA stores data in a single Availability Zone, reducing availability. For petabytes of critical research data, the durability reduction is unacceptable. S3 Glacier Instant Retrieval is costlier than Deep Archive for rarely accessed data with a 12-hour tolerance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html", title: "Amazon S3 storage classes" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html", title: "Transitioning objects using lifecycle configuration" }
    ]
  },
  {
    id: 63,
    question: "A company uses AWS CloudFormation to provision infrastructure. A developer accidentally deleted a production CloudFormation stack, which terminated all associated EC2 instances and deleted the RDS database. The company wants to prevent accidental stack deletion in production while still allowing developers to update stacks for deployments.\n\nWhich combination of controls should a solutions architect implement? (Choose TWO.)",
    options: [
      "Enable CloudFormation stack termination protection on all production stacks.",
      "Create an IAM policy that denies cloudformation:DeleteStack for all users. Attach the policy to all developer IAM roles.",
      "Use AWS Config to detect when a CloudFormation stack is deleted and trigger an SNS alert to the operations team.",
      "Add a DeletionPolicy: Retain attribute to critical resources (EC2 instances, RDS databases) in the CloudFormation template.",
      "Enable AWS CloudTrail with log file validation and store logs in a separate S3 bucket to audit all CloudFormation API calls."
    ],
    correctAnswer: [0, 3],
    category: "Deployment and Infrastructure as Code",
    explanation: "Stack termination protection prevents the stack itself from being deleted via the CloudFormation console or API until termination protection is explicitly disabled. DeletionPolicy: Retain on individual resources ensures that even if the stack is somehow deleted, the underlying resources (EC2 instances, RDS database) are not terminated — they are detached from the stack and retained.",
    optionExplanations: [
      "✓ Correct: CloudFormation stack termination protection is a single-click setting that prevents the stack from being deleted. Any attempt to delete a protected stack returns an error. To delete a protected stack, a user must first explicitly disable termination protection, adding a deliberate step that prevents accidental deletion.",
      "Denying cloudformation:DeleteStack for all developer IAM roles would also prevent authorized stack cleanup activities (e.g., tearing down feature branches, removing old stacks). A blanket deny for all users is too restrictive and would create operational issues.",
      "AWS Config can detect deletion events after the fact and send alerts, but this is reactive. The stack and resources are already deleted before Config detects and notifies. This does not prevent the accidental deletion.",
      "✓ Correct: Adding DeletionPolicy: Retain to critical resources (EC2, RDS) in the template ensures that even if the stack is deleted, those resources are not terminated. They are simply removed from CloudFormation management, and the data is preserved. This provides a safety net for the underlying resources even if termination protection is bypassed.",
      "CloudTrail provides an audit record of API calls, which is useful for forensic analysis after an incident. However, it does not prevent deletion — it only records that a deletion occurred."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-protect-stacks.html", title: "Protecting a stack from being deleted" },
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html", title: "DeletionPolicy attribute" }
    ]
  },
  {
    id: 64,
    question: "A company is running a web application behind an Application Load Balancer. The security team has detected that the application is receiving requests from known malicious IP addresses and is being targeted by a distributed denial-of-service (DDoS) attack with a volumetric component. The attack is causing significant degradation in application performance for legitimate users.\n\nWhich combination of AWS services provides the MOST comprehensive protection against this attack? (Choose TWO.)",
    options: [
      "Subscribe to AWS Shield Advanced. Associate the protection with the Application Load Balancer. Engage the AWS Shield Response Team (SRT) for assisted attack mitigation.",
      "Associate an AWS WAF web ACL with the ALB. Create an IP match rule to block the known malicious IP ranges.",
      "Enable Amazon GuardDuty on the AWS account. Configure GuardDuty to automatically block IP addresses that it identifies as malicious.",
      "Create a VPC Network ACL that explicitly denies inbound traffic from the known malicious IP ranges.",
      "Deploy an Amazon CloudFront distribution in front of the ALB. Enable AWS Shield Standard on CloudFront."
    ],
    correctAnswer: [0, 1],
    category: "Security and Compliance",
    explanation: "AWS Shield Advanced provides DDoS protection with automatic inline mitigation for volumetric attacks, cost protection for scaling charges, and access to the Shield Response Team (SRT) for complex attacks. AWS WAF with IP match rules blocks known malicious IPs at the application layer before requests reach the ALB. Together, they address both the volumetric DDoS component and IP-based application layer attacks.",
    optionExplanations: [
      "✓ Correct: AWS Shield Advanced provides Layer 3/4 DDoS protection with automatic attack detection and mitigation, near real-time attack notifications, and 24/7 access to the AWS Shield Response Team. For volumetric DDoS attacks, Shield Advanced can automatically provision additional AWS capacity to absorb attack traffic, protecting ALB performance.",
      "✓ Correct: AWS WAF allows creating rules that inspect HTTP/HTTPS requests and block traffic based on IP addresses, headers, query strings, and other criteria. An IP match rule blocking the known malicious IP ranges stops those requests at the WAF layer, preventing them from consuming ALB and backend capacity.",
      "Amazon GuardDuty detects threats using VPC flow logs, CloudTrail, and DNS logs, but it does not automatically block traffic. GuardDuty generates findings that require manual or automated remediation — it is not a real-time traffic filtering mechanism.",
      "Network ACLs are stateless and operate at the subnet level. They can block specific IP ranges, but NACLs have a limit of 20 rules per ACL by default. For a DDoS attack from many IP addresses, managing individual IP blocks in NACLs is impractical. WAF is a more scalable solution for IP-based blocking.",
      "AWS Shield Standard is automatically enabled for all AWS customers at no charge and provides protection against common, frequently occurring network and transport layer DDoS attacks. It does not provide the advanced protections, SRT access, or cost protection of Shield Advanced."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html", title: "AWS Shield Advanced overview" },
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html", title: "What is AWS WAF?" }
    ]
  },
  {
    id: 65,
    question: "A company is planning a large-scale migration of 200 on-premises servers to AWS over the next 12 months. The infrastructure team needs to discover all on-premises servers, assess their dependencies, and estimate the total cost of running the equivalent workloads on AWS before committing to the migration. The team also wants to track migration progress across all servers throughout the project.\n\nWhich combination of AWS services should a solutions architect recommend for the assessment and tracking phases? (Choose TWO.)",
    options: [
      "Deploy AWS Application Discovery Service agents on all on-premises servers to collect server configuration, performance metrics, and network dependency data.",
      "Use AWS DataSync to transfer server configuration data from on-premises to Amazon S3 for analysis.",
      "Use AWS Migration Hub to centralize migration tracking and view the status of all servers across different migration tools.",
      "Deploy Amazon Inspector agents on all on-premises servers to scan for vulnerabilities and dependencies.",
      "Use AWS Cost Explorer to estimate migration costs by analyzing current AWS spend patterns."
    ],
    correctAnswer: [0, 2],
    category: "Migration and Modernization",
    explanation: "AWS Application Discovery Service collects on-premises server data (CPU, memory, disk, network connections) needed for migration assessment and dependency mapping. AWS Migration Hub provides a single dashboard to track migration progress across all 200 servers, integrating with migration tools like AWS Server Migration Service and AWS Application Migration Service. Together they cover the full assessment and tracking lifecycle.",
    optionExplanations: [
      "✓ Correct: Application Discovery Service agents installed on on-premises servers collect detailed data including OS configuration, installed software, CPU/memory utilization, running processes, and network connections. This data feeds into AWS Migration Evaluator for cost estimates and is automatically integrated into AWS Migration Hub for tracking. Dependency mapping identifies which servers must be migrated together.",
      "AWS DataSync is a data transfer service optimized for moving files between on-premises and AWS storage. It does not collect server configuration, performance metrics, or dependency data needed for migration assessment.",
      "✓ Correct: AWS Migration Hub is the central tracking service for AWS migrations. It aggregates status data from Application Discovery Service, AWS Server Migration Service, AWS Application Migration Service, and third-party tools into a single dashboard. Teams can track each server's migration phase (discovered, assessed, migrating, migrated) from a single view throughout the 12-month project.",
      "Amazon Inspector is a vulnerability assessment service for resources running on AWS. It does not support on-premises servers and is not designed for migration discovery or dependency mapping.",
      "AWS Cost Explorer analyzes existing AWS spending and usage patterns. It cannot estimate migration costs for on-premises workloads that have not yet been migrated to AWS. AWS Migration Evaluator (formerly TSO Logic) is the appropriate tool for on-premises to AWS cost estimation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html", title: "What is AWS Application Discovery Service?" },
      { url: "https://docs.aws.amazon.com/migrationhub/latest/ug/what-is-mighub.html", title: "What is AWS Migration Hub?" }
    ]
  },
  {
    id: 66,
    question: "A company wants to enable fine-grained access control for its Amazon S3 data lake. Different teams should be able to query the same S3 data using Amazon Athena with row-level and column-level security based on their IAM identity. For example, the finance team should see all columns but only rows for their region, while the HR team should see only non-sensitive columns.\n\nWhich AWS service should a solutions architect use to implement this access control?",
    options: [
      "Amazon S3 bucket policies with condition keys that filter based on IAM principal tags.",
      "AWS Lake Formation with data filters for row-level security and column-level security. Grant permissions to IAM roles using Lake Formation data permissions.",
      "AWS Glue Data Catalog resource policies that restrict table-level access per IAM role.",
      "Amazon Athena workgroup configurations that restrict query output locations per team."
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "AWS Lake Formation is the purpose-built AWS service for implementing fine-grained access control on data lake data. Lake Formation supports row-level filtering (row filters based on column values) and column-level security (restricting which columns an IAM role can see). These permissions are enforced when teams query data through Athena, integrating seamlessly with IAM identity.",
    optionExplanations: [
      "S3 bucket policies can restrict access to entire objects or prefixes based on IAM principal tags, but they cannot implement row-level or column-level filtering within a data file. S3 policies operate at the object level, not the data record level.",
      "✓ Correct: AWS Lake Formation provides a centralized permission model for S3-based data lakes. Data filters allow defining row-level expressions (e.g., WHERE region = 'APAC') and column-level permissions (e.g., exclude salary column). These filters are applied transparently when the IAM role queries the data through Athena — the team only sees the rows and columns they are authorized to access.",
      "AWS Glue Data Catalog resource policies can restrict access to databases, tables, and columns at the table-definition level, but they do not support row-level filtering based on data values. Full row-level security requires Lake Formation.",
      "Athena workgroups control query execution settings (output location, query limits, encryption) and can restrict which teams can run queries, but they do not implement row-level or column-level data filtering."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html", title: "What is AWS Lake Formation?" },
      { url: "https://docs.aws.amazon.com/lake-formation/latest/dg/data-filtering.html", title: "Data filtering and cell-level security in Lake Formation" }
    ]
  },
  {
    id: 67,
    question: "A company is designing a solution to send personalized marketing emails to 10 million customers daily. Each email is customized with the customer's name, purchase history, and product recommendations generated by a machine learning model. The solution must handle email bounces and complaints, maintain sender reputation, and ensure deliverability. The company does not want to manage its own email infrastructure.\n\nWhich AWS service and configuration should a solutions architect recommend?",
    options: [
      "Use Amazon SNS with email subscriptions. Configure SNS to send personalized messages by including dynamic content in the message body.",
      "Use Amazon Simple Email Service (Amazon SES). Configure a dedicated IP address for sending. Set up SNS notifications for bounces and complaints. Implement a suppression list to stop sending to addresses that have bounced or complained.",
      "Use Amazon Pinpoint to send emails. Configure Pinpoint campaigns with customer segments. Use Pinpoint's built-in journey orchestration for personalization.",
      "Use Amazon WorkMail to send bulk emails. Configure WorkMail with multiple mailboxes for different customer segments."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "Amazon SES is purpose-built for high-volume transactional and marketing email sending. Dedicated IP addresses maintain sender reputation. SNS notifications for bounces (hard and soft) and complaints enable automated suppression list management, which is required to maintain deliverability and comply with email sending best practices. SES handles the email infrastructure, including delivery, retry logic, and DKIM/SPF signing.",
    optionExplanations: [
      "Amazon SNS is a pub/sub messaging service. While it can send email notifications, it is not designed for personalized bulk marketing email campaigns. SNS does not support dedicated IPs, bounce/complaint handling, suppression lists, or HTML email templates needed for marketing campaigns.",
      "✓ Correct: Amazon SES provides the infrastructure for sending high-volume email (10 million/day). Dedicated IP addresses isolate your sender reputation from other SES customers. SNS notifications for bounce and complaint events enable real-time suppression list updates. SES also supports DKIM, SPF, and DMARC for sender authentication, which is critical for deliverability at scale.",
      "Amazon Pinpoint is designed for multi-channel customer engagement (email, SMS, push, voice) with journey orchestration and analytics. For pure high-volume transactional email sending at 10 million/day with custom ML-generated content per email, SES is the more appropriate service. Pinpoint uses SES as its email sending infrastructure.",
      "Amazon WorkMail is a managed business email service (like Microsoft Exchange or Google Workspace) for individual mailboxes. It is not designed for bulk marketing email sending and does not support the volumes or deliverability features required."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ses/latest/dg/Welcome.html", title: "What is Amazon SES?" },
      { url: "https://docs.aws.amazon.com/ses/latest/dg/send-email-concepts-deliverability.html", title: "Email deliverability in Amazon SES" }
    ]
  },
  {
    id: 68,
    question: "A company runs a web application on Amazon EC2 instances in an Auto Scaling group. The application uses Amazon RDS for PostgreSQL as the database. During peak hours, the application experiences increased latency because the Auto Scaling group frequently adds and removes instances. A solutions architect notices that each new EC2 instance takes 8 minutes to become ready after launch because of the time required to install dependencies, configure the application, and perform health checks.\n\nWhich solution reduces the instance warm-up time with the LEAST ongoing maintenance?",
    options: [
      "Increase the Auto Scaling group's desired capacity to maintain more standby instances at all times, reducing the need to launch new instances during spikes.",
      "Create a custom AMI that includes the application dependencies and configuration pre-installed. Update the Auto Scaling group launch template to use the custom AMI.",
      "Use EC2 user data scripts to install dependencies at launch. Optimize the user data script to run all installations in parallel.",
      "Use AWS Lambda to pre-provision instances before traffic spikes. Configure Lambda to call the Auto Scaling API to increase desired capacity 30 minutes before predicted peak hours."
    ],
    correctAnswer: 1,
    category: "Compute and Containers",
    explanation: "A custom AMI bakes all dependencies, configurations, and application files directly into the image. When Auto Scaling launches a new instance from the custom AMI, the instance is ready almost immediately (typically within 1-2 minutes for instance initialization) without needing to download and install any packages. The AMI is created once and updated only when dependencies change, requiring minimal ongoing maintenance.",
    optionExplanations: [
      "Maintaining more standby instances reduces the frequency of scale-out events and provides available capacity, but it does not reduce the warm-up time for new instances when they are eventually needed. It also increases baseline EC2 costs by running unnecessary instances.",
      "✓ Correct: A custom AMI pre-installs all dependencies, application code, and configurations at AMI creation time. Instances launched from the custom AMI are immediately ready after the standard instance initialization (1-2 minutes), eliminating the 6-8 minutes currently spent installing dependencies. The AMI only needs to be updated when dependencies change, which requires less ongoing maintenance than user data scripts that run on every launch.",
      "Optimizing user data scripts to run installations in parallel reduces warm-up time but still requires downloading and installing packages on every new instance launch. This is sensitive to network conditions, package repository availability, and package version changes. It requires ongoing maintenance as dependencies evolve.",
      "Pre-provisioning instances based on predicted peak hours is an improvement, but it requires accurate prediction and Lambda maintenance. If traffic spikes occur outside predicted windows, instances still take 8 minutes to become ready. This approach also increases costs for pre-provisioned capacity."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/creating-an-ami-ebs.html", title: "Create a custom AMI from an instance" },
      { url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-templates.html", title: "Launch templates" }
    ]
  },
  {
    id: 69,
    question: "A company has an application that generates 100 GB of log data daily. The logs are stored in Amazon S3. The security team needs to search the logs for specific patterns (e.g., failed authentication attempts, access from specific IP addresses) within 1 hour of log generation. The searches must be ad hoc SQL queries run by the security team. The solution must minimize ongoing infrastructure management.\n\nWhich solution meets these requirements?",
    options: [
      "Load log data into Amazon OpenSearch Service. Use OpenSearch Dashboards to search and visualize log data in near real time.",
      "Use Amazon Athena to query log data directly in S3 using SQL. Partition log data in S3 by date and hour to minimize the data scanned per query.",
      "Use Amazon Kinesis Data Streams to ingest logs in real time. Use an AWS Lambda consumer to index logs in Amazon DynamoDB. Run queries against DynamoDB using the DynamoDB PartiQL interface.",
      "Load logs into an Amazon RDS for MySQL database using AWS Glue ETL jobs. Run SQL queries against the RDS database for log analysis."
    ],
    correctAnswer: 1,
    category: "Data Analytics and Architecture",
    explanation: "Amazon Athena is a serverless, interactive query service that runs standard SQL queries directly against data in S3 with no infrastructure to manage. S3 partitioning by date/hour limits data scans to the relevant time range, reducing query latency and cost. Log data lands in S3 and is immediately queryable via Athena. This combination fully satisfies the ad hoc SQL query requirement within 1 hour of log generation.",
    optionExplanations: [
      "Amazon OpenSearch Service provides powerful full-text search and real-time analytics with low query latency. However, it requires cluster management (node types, storage, scaling) and is more complex to set up and maintain than a serverless Athena solution. OpenSearch is better suited for continuous, sub-second search rather than periodic ad hoc SQL queries.",
      "✓ Correct: Amazon Athena is fully serverless — no clusters, no provisioning, no scaling required. Logs written to S3 are immediately queryable. Date/hour partitioning in S3 means a query for the last hour of logs only scans the relevant partition, not the entire 100 GB daily volume. The security team writes standard SQL queries in the Athena console without any ETL or data movement.",
      "Kinesis Data Streams with Lambda indexing into DynamoDB requires significant development effort (Lambda consumer, DynamoDB schema design, PartiQL query interface). DynamoDB is not designed for ad hoc analytical SQL queries on 100 GB of log data and does not provide the flexible SQL capabilities needed for security log analysis.",
      "Loading 100 GB of daily logs into RDS requires managing an RDS instance (instance size, storage), running daily ETL jobs, and handling database maintenance. RDS MySQL has finite storage and compute capacity that must be provisioned upfront. This approach is significantly more operationally complex than Athena."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html", title: "What is Amazon Athena?" },
      { url: "https://docs.aws.amazon.com/athena/latest/ug/partitions.html", title: "Partitioning data in Athena" }
    ]
  },
  {
    id: 70,
    question: "A company is designing a new application on AWS following the Well-Architected Framework. The application processes customer orders and must meet the following reliability requirements:\n- The application must continue to function if a single Availability Zone becomes unavailable\n- Database writes must not be lost during an AZ failure\n- Recovery must be automatic with no manual intervention\n- RPO must be near zero (seconds)\n\nWhich architecture meets all reliability requirements?",
    options: [
      "Deploy the application on EC2 instances in a single AZ with daily EBS snapshots to Amazon S3 for backup. If the AZ fails, restore from the latest snapshot in a different AZ.",
      "Deploy the application on EC2 instances in an Auto Scaling group spanning multiple AZs behind an ALB. Use Amazon Aurora MySQL with Multi-AZ enabled (Aurora provides synchronous replication across AZs).",
      "Deploy the application on EC2 instances in two AZs. Use Amazon RDS for MySQL with automated backups. If an AZ fails, manually restore the RDS database from the most recent automated backup in the surviving AZ.",
      "Deploy the application on EC2 instances in a single AZ. Use Amazon RDS for MySQL with a cross-Region read replica. In case of AZ failure, manually promote the cross-Region read replica."
    ],
    correctAnswer: 1,
    category: "High Availability and Disaster Recovery",
    explanation: "An Auto Scaling group across multiple AZs with an ALB ensures the application continues serving traffic automatically if one AZ fails — the ASG replaces failed instances in healthy AZs without manual intervention. Aurora Multi-AZ uses synchronous replication across multiple AZs, ensuring no data loss (near-zero RPO). Aurora automatically fails over to a read replica in another AZ within typically 30 seconds, with no manual steps required.",
    optionExplanations: [
      "Daily EBS snapshots to S3 and manual restoration does not meet the near-zero RPO requirement (up to 24 hours of data could be lost) and requires manual intervention for recovery. This does not satisfy any of the stated requirements.",
      "✓ Correct: An ALB with a multi-AZ Auto Scaling group handles EC2-layer AZ failures automatically. Aurora Multi-AZ maintains synchronous replicas in multiple AZs — writes are committed to the primary and at least one replica before acknowledging success, ensuring zero data loss (RPO ≈ 0). Aurora automatic failover promotes a replica to primary automatically within seconds, requiring no manual intervention. All four reliability requirements are satisfied.",
      "RDS automated backups create daily snapshots with transaction log backups every 5 minutes. Restoring from an automated backup requires manual steps and takes minutes to hours. RPO is up to 5 minutes (not near zero). Manual intervention is required. This does not meet the requirements.",
      "A cross-Region read replica uses asynchronous replication, which means some data may not yet be replicated at the time of failure (RPO is not near zero). Promoting a cross-Region replica is a manual process. This fails both the RPO and no-manual-intervention requirements."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html", title: "High availability for Amazon Aurora" },
      { url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-benefits.html", title: "Benefits of EC2 Auto Scaling" }
    ]
  }
,
  {
    id: 71,
    question: "A company uses AWS Organizations with more than 30 AWS member accounts. The security team wants to enforce that all new Amazon S3 buckets created in any member account must have Block Public Access enabled at the bucket level and must deny any bucket policy that grants public access. The enforcement must be automatic and must not require changes in individual account IAM policies.\n\nWhich solution meets these requirements?",
    options: [
      "Create an AWS Config organization conformance pack that includes the s3-bucket-public-read-prohibited and s3-bucket-public-write-prohibited managed rules. Apply the conformance pack to all accounts in the organization.",
      "Create a Service Control Policy (SCP) that denies s3:PutBucketPublicAccessBlock with a condition that allows it only when the BlockPublicAcls, IgnorePublicAcls, BlockPublicPolicy, and RestrictPublicBuckets parameters are all set to true. Attach the SCP to the organization root.",
      "Create an AWS CloudFormation StackSet that deploys an S3 bucket policy denying public access to all existing buckets in every member account.",
      "Enable Amazon Macie in all member accounts using an Organizations-level activation. Configure Macie to automatically remediate public access findings on S3 buckets."
    ],
    correctAnswer: 1,
    category: "Governance and Multi-Account Strategy",
    explanation: "An SCP attached to the organization root applies to all member accounts without modifying individual account IAM policies. A Deny SCP on s3:PutBucketPublicAccessBlock unless all four Block Public Access parameters are set to true means account-level principals cannot disable Block Public Access. Similarly, denying s3:PutBucketPolicy with public-granting conditions prevents policies that open buckets publicly. SCPs enforce the guardrail proactively for all new and existing buckets.",
    optionExplanations: [
      "AWS Config conformance packs detect non-compliant S3 buckets but are reactive — they report compliance status after the fact. Config rules do not prevent bucket creation with public access enabled. Remediation actions can be triggered, but there is a detection lag before the bucket is remediated.",
      "✓ Correct: SCPs provide a proactive enforcement mechanism that prevents actions before they happen. By denying PutBucketPublicAccessBlock unless Block Public Access is fully enabled, no principal in any member account can disable the Block Public Access setting. Additional SCP conditions can deny PutBucketPolicy for policies that grant public access. SCPs apply automatically to all current and future member accounts in the organization.",
      "CloudFormation StackSets can deploy S3 bucket policies to existing buckets, but they operate on resources that already exist and require a template listing specific bucket names or using Lambda-backed custom resources. StackSets do not automatically apply policies to new buckets created after deployment.",
      "Amazon Macie discovers sensitive data and detects public access configurations, but it is a detection service, not an enforcement mechanism. Macie does not have the ability to automatically remediate S3 bucket public access settings."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html", title: "Blocking public access to your Amazon S3 storage" }
    ]
  },
  {
    id: 72,
    question: "A company is building a data processing application that receives messages from an Amazon SQS queue. The processing logic is implemented in AWS Lambda functions. During peak hours, the Lambda function's processing time increases from 2 seconds to 45 seconds per message due to intensive computation. The SQS visibility timeout is set to 30 seconds. The operations team reports that messages are being processed multiple times during peak periods.\n\nWhat is the root cause of this issue, and what is the correct fix?",
    options: [
      "Lambda is hitting its concurrency limit during peak hours. Increase the Lambda reserved concurrency to allow more parallel invocations.",
      "The SQS visibility timeout (30 seconds) is shorter than the Lambda processing time (45 seconds) during peak hours. Increase the SQS visibility timeout to be longer than the maximum expected processing time, or have the Lambda function extend the visibility timeout dynamically using the ChangeMessageVisibility API.",
      "The SQS queue is configured as a standard queue which delivers messages at least once. Migrate to an SQS FIFO queue to ensure exactly-once delivery.",
      "Lambda's event source mapping is configured to process too many messages in a single batch. Reduce the batch size to 1 to process messages one at a time and avoid timeouts."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "When a Lambda function takes longer to process a message than the SQS visibility timeout, the message becomes visible again in the queue before Lambda acknowledges it with a successful deletion. SQS redelivers the message to another Lambda invocation, causing duplicate processing. The fix is to set the visibility timeout to at least 6 times the Lambda function timeout (AWS recommendation), or to call ChangeMessageVisibility to extend the timeout dynamically.",
    optionExplanations: [
      "Concurrency limits can cause Lambda throttling (messages not processed), but throttling does not cause messages to be processed multiple times. Duplicate processing is caused by the visibility timeout expiring, not by concurrency limits.",
      "✓ Correct: The SQS visibility timeout determines how long a message is hidden from the queue after being received. If Lambda processing takes longer than the timeout, the message reappears in the queue and is delivered again. Setting the visibility timeout to at least 6× the Lambda function timeout (or using ChangeMessageVisibility to extend it dynamically) prevents the message from becoming visible before Lambda completes processing.",
      "Migrating to an SQS FIFO queue provides exactly-once processing deduplication within a 5-minute deduplication window. However, the root cause here is the visibility timeout mismatch, which affects both standard and FIFO queues equally. Changing the queue type does not fix the underlying problem.",
      "Reducing the batch size to 1 ensures Lambda processes one message at a time, but it does not address the visibility timeout issue. Even with a batch size of 1, if processing takes 45 seconds and the visibility timeout is 30 seconds, the message will still be redelivered."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html", title: "Amazon SQS visibility timeout" },
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html#events-sqs-queueconfig", title: "Configuring a queue to trigger a Lambda function" }
    ]
  },
  {
    id: 73,
    question: "A company runs a microservices application on Amazon ECS. Multiple services communicate with each other through REST APIs over HTTPS. The security team requires mutual TLS (mTLS) authentication between all services to ensure that only authorized services can communicate with each other. The solution must not require changes to the application code.\n\nWhich solution meets these requirements?",
    options: [
      "Use Amazon API Gateway with client certificate validation for each service endpoint. Configure each service to present a client certificate when calling other services.",
      "Deploy AWS App Mesh as a service mesh. Configure Envoy proxies as sidecars on each ECS task. Enable mTLS in App Mesh with AWS Certificate Manager Private CA issuing certificates to each service.",
      "Configure security groups on each ECS task to allow inbound HTTPS only from the security groups of authorized services.",
      "Use AWS PrivateLink to create VPC endpoint services for each microservice. Restrict access to each endpoint service using AWS RAM."
    ],
    correctAnswer: 1,
    category: "Compute and Containers",
    explanation: "AWS App Mesh with Envoy sidecar proxies implements mTLS transparent to the application. The Envoy proxy handles certificate presentation and validation automatically, intercepting all service-to-service traffic. AWS Certificate Manager Private CA issues and rotates certificates for each service. Application code does not need to implement TLS or certificate logic — the sidecar handles it entirely.",
    optionExplanations: [
      "API Gateway with client certificate validation requires the application code to present certificates when making outbound calls and to validate client certificates on inbound calls. This requires application code changes, violating the requirement.",
      "✓ Correct: AWS App Mesh injects an Envoy proxy sidecar alongside each ECS task. The Envoy proxy intercepts all inbound and outbound traffic and handles mTLS negotiation, certificate presentation, and peer certificate validation automatically. The application communicates with the local Envoy proxy over plain HTTP — mTLS is implemented by the proxy layer without any application code changes. ACM Private CA provides certificate issuance and rotation.",
      "Security groups control network access at the IP/port level based on security group membership. They provide network-layer isolation but do not implement mTLS authentication — there is no certificate exchange or verification.",
      "AWS PrivateLink creates private network connectivity between VPCs and services. It does not implement mTLS between services and does not provide mutual certificate-based authentication between microservices."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/app-mesh/latest/userguide/mutual-tls.html", title: "Mutual TLS authentication in AWS App Mesh" },
      { url: "https://docs.aws.amazon.com/app-mesh/latest/userguide/what-is-app-mesh.html", title: "What is AWS App Mesh?" }
    ]
  },
  {
    id: 74,
    question: "A company has an AWS Lambda function that processes records from an Amazon DynamoDB stream. The Lambda function occasionally fails when processing certain records due to malformed data. When a failure occurs, Lambda retries the record indefinitely because the DynamoDB stream trigger keeps the batch position at the failed record, blocking all subsequent records in the shard from being processed.\n\nWhich solution resolves this issue while ensuring that failed records are not permanently lost?",
    options: [
      "Increase the Lambda function timeout to give the function more time to process malformed records without failing.",
      "Configure the Lambda event source mapping for the DynamoDB stream with a bisect-on-error option and a destination for failed records pointing to an Amazon SQS queue. Set the maximum retry attempts to a finite number.",
      "Enable DynamoDB Streams enhanced fan-out to distribute stream records across multiple Lambda functions, reducing the impact of failed records on processing throughput.",
      "Add a try-catch block in the Lambda function code to catch exceptions and log malformed records to Amazon CloudWatch Logs before returning a success response."
    ],
    correctAnswer: 1,
    category: "Serverless Architecture",
    explanation: "The bisect-on-error option splits a failed batch into two smaller batches and retries them separately, helping isolate the specific malformed record. Setting maximum retry attempts prevents infinite retries. Configuring an on-failure destination (SQS queue) preserves failed records for investigation without losing them. Together, these settings prevent a single bad record from blocking the entire shard.",
    optionExplanations: [
      "Increasing the Lambda timeout gives the function more execution time but does not address malformed data that causes failures regardless of execution time. The record will still fail and block the shard.",
      "✓ Correct: The bisect-on-error option progressively halves the batch when errors occur, ultimately isolating the individual malformed record. Setting a maximum retry attempts (e.g., 3-5) prevents the Lambda function from retrying indefinitely. The on-failure destination sends the failed record(s) to an SQS queue, ensuring they are preserved for investigation while allowing processing to continue with subsequent records in the shard.",
      "DynamoDB Streams enhanced fan-out does not exist as a feature — this is a Kinesis Data Streams concept. DynamoDB Streams does not have an enhanced fan-out equivalent.",
      "Catching exceptions and returning success prevents the retry loop and allows shard processing to continue, but the malformed record is silently dropped after logging. If the record represents a critical business event, losing it permanently is unacceptable. The on-failure destination approach in option B preserves the record."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html", title: "Using Lambda with Amazon DynamoDB" },
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventfiltering.html", title: "Lambda event source mapping" }
    ]
  },
  {
    id: 75,
    question: "A company operates a large fleet of IoT sensors that send telemetry data to AWS every second. There are 50,000 sensors, each sending a 1 KB payload per second. The data must be stored durably in Amazon S3 and made available for real-time dashboard queries showing the latest sensor readings. The solution must scale to accommodate the ingestion volume without provisioning or managing servers.\n\nWhich architecture should a solutions architect recommend?",
    options: [
      "Configure IoT sensors to publish data to an Amazon SQS queue. Use AWS Lambda to consume messages from the queue and write records to Amazon S3 and an Amazon ElastiCache for Redis cluster for the real-time dashboard.",
      "Configure IoT sensors to publish data to AWS IoT Core. Create IoT Core rules to route data to Amazon Kinesis Data Firehose for S3 delivery and to Amazon DynamoDB for real-time dashboard queries.",
      "Configure IoT sensors to publish data directly to Amazon S3 using the S3 PutObject API. Use Amazon Athena with a cache layer for real-time dashboard queries.",
      "Configure IoT sensors to publish data to Amazon Kinesis Data Streams. Use AWS Lambda to consume from the stream, write to S3, and update an Amazon RDS for PostgreSQL database for the real-time dashboard."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "AWS IoT Core is the purpose-built, fully managed service for connecting IoT devices to AWS at scale. IoT Core handles device connections, authentication, and message routing without server management. IoT rules route data to Kinesis Data Firehose for buffered S3 delivery (fully managed). DynamoDB stores the latest sensor reading per device (key: sensor ID, value: latest telemetry) for sub-millisecond real-time dashboard queries. All components are serverless.",
    optionExplanations: [
      "SQS has a maximum message size of 256 KB and is suitable for decoupled processing, but it does not natively handle 50,000 concurrent device connections or the device authentication and protocol handling that IoT Core provides. Lambda with SQS also does not natively support the real-time per-device latest-value query pattern as efficiently as DynamoDB.",
      "✓ Correct: AWS IoT Core manages device connections using MQTT, HTTPS, and WebSocket protocols at scale without provisioning brokers. IoT rules are serverless routing logic. Firehose is a fully managed S3 delivery service. DynamoDB stores the latest reading per sensor ID with single-digit millisecond reads, which is ideal for real-time dashboards showing current sensor state. The entire architecture is serverless.",
      "S3 PutObject from 50,000 sensors per second generates 50,000 API calls/second, creating enormous S3 request costs and concurrency challenges. S3 is not optimized for per-key latest-value queries needed by a real-time dashboard.",
      "Amazon Kinesis Data Streams requires shard provisioning/management. Amazon RDS requires instance provisioning and management. Neither is serverless. RDS also does not provide the sub-millisecond read performance needed for real-time dashboard queries at this scale."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html", title: "What is AWS IoT Core?" },
      { url: "https://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html", title: "Rules for AWS IoT" }
    ]
  },
  {
    id: 76,
    question: "A company's application uses Amazon Cognito user pools for authentication. The application needs to allow users to sign in with their existing corporate identity provider (IdP) using SAML 2.0 federation, as well as with social identity providers (Google, Facebook). After authentication, the application must access AWS services on behalf of the signed-in user with permissions based on their corporate group membership.\n\nWhich architecture should a solutions architect implement?",
    options: [
      "Configure Amazon Cognito user pools with a SAML IdP and social identity providers as federated identity sources. Configure Amazon Cognito identity pools (federated identities) to exchange Cognito tokens for temporary AWS credentials. Map Cognito user pool groups to IAM roles in the identity pool.",
      "Create IAM identity providers for the corporate SAML IdP and for Google and Facebook. Create IAM roles with trust policies for each IdP. Configure the application to call AssumeRoleWithSAML or AssumeRoleWithWebIdentity directly.",
      "Use AWS IAM Identity Center (SSO) to configure the corporate SAML IdP as an external identity source. Create permission sets for each corporate group. Configure the application to use IAM Identity Center for both corporate and social logins.",
      "Create a Lambda authorizer for API Gateway that validates the SAML assertion from the corporate IdP and the OAuth token from social providers. Map validated identities to IAM roles within the Lambda function."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Amazon Cognito user pools support multiple federated identity sources (SAML, OIDC, social) through a single user pool, normalizing all identities into Cognito tokens. Cognito identity pools exchange these tokens for temporary AWS credentials via AssumeRoleWithWebIdentity. Role mapping rules in the identity pool assign different IAM roles based on Cognito group membership (which can be populated from SAML attributes like corporate group membership).",
    optionExplanations: [
      "✓ Correct: Cognito user pools act as a broker supporting multiple identity sources (corporate SAML IdP + social providers) through a unified API. After authentication, the application receives Cognito tokens. Cognito identity pools exchange these tokens for temporary AWS credentials by calling STS. Role selection in the identity pool is based on Cognito group membership, which can be mapped from SAML group attributes provided by the corporate IdP. This architecture handles all requirements in a managed way.",
      "Using IAM identity providers and calling AssumeRoleWithSAML or AssumeRoleWithWebIdentity directly requires the application to handle multiple IdP protocols, token validation, and role selection logic. This adds significant complexity and is the lower-level approach that Cognito abstracts.",
      "AWS IAM Identity Center is designed for workforce identity management (employees accessing the AWS Console and CLI). It is not designed for customer-facing application authentication or for integrating social identity providers like Google and Facebook.",
      "A Lambda authorizer validates tokens and returns IAM policies for API Gateway access control. It does not provide a standard mechanism for issuing temporary AWS credentials to end users for direct AWS service access based on group membership."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-identity-federation.html", title: "Adding user pool sign-in through a third party" },
      { url: "https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html", title: "Amazon Cognito identity pools" }
    ]
  },
  {
    id: 77,
    question: "A company needs to build a solution to detect personally identifiable information (PII) in documents uploaded to Amazon S3. When PII is detected in a document, the file must be automatically quarantined by moving it to a separate S3 bucket, and the security team must be notified. The solution must process documents within 5 minutes of upload and must be fully serverless.\n\nWhich architecture should a solutions architect recommend?",
    options: [
      "Enable Amazon Macie on the source S3 bucket. Configure Macie to automatically move files with PII findings to a quarantine bucket and send SNS notifications.",
      "Configure an S3 event notification on the source bucket to trigger an AWS Lambda function on ObjectCreated events. The Lambda function calls Amazon Comprehend DetectPiiEntities to analyze the document. If PII is detected, Lambda copies the file to the quarantine bucket, deletes the original, and publishes a notification to an SNS topic.",
      "Use Amazon Textract to extract text from uploaded documents. Store extracted text in Amazon DynamoDB. Use DynamoDB Streams to trigger a Lambda function that searches for PII patterns using regular expressions.",
      "Configure AWS Glue to crawl the S3 bucket every 5 minutes. Use a Glue ETL job to analyze documents for PII using the Glue built-in PII detection transform. Move detected files to the quarantine bucket."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "S3 event notification → Lambda → Amazon Comprehend is a fully serverless, event-driven pipeline. Lambda is triggered immediately when a file is uploaded (within seconds, well within the 5-minute requirement). Amazon Comprehend's DetectPiiEntities API detects PII in text content. Lambda orchestrates the quarantine (copy to quarantine bucket, delete from source) and SNS notification in a single invocation.",
    optionExplanations: [
      "Amazon Macie is excellent for discovering PII at scale, but Macie is not a real-time event-driven service. Macie runs scheduled sensitive data discovery jobs that typically complete within hours, not within 5 minutes of upload. Macie also cannot automatically move files — it generates findings that require manual or custom automation for remediation.",
      "✓ Correct: S3 ObjectCreated events trigger Lambda in near real time (seconds after upload). Lambda calls Amazon Comprehend DetectPiiEntities to identify PII entities in the document text. If PII is found, Lambda copies the file to the quarantine bucket using S3 CopyObject, deletes the original using S3 DeleteObject, and publishes a message to SNS for security team notification. The entire pipeline is serverless and processes documents within seconds.",
      "Amazon Textract extracts structured text from documents (especially scanned PDFs and images), which is valuable for documents with complex layouts. However, adding Textract, DynamoDB, and regex pattern matching introduces unnecessary complexity when Amazon Comprehend provides a managed PII detection API directly.",
      "AWS Glue crawlers and ETL jobs run on a schedule with minimum intervals that may not reliably meet the 5-minute requirement. Glue also provisions Spark-based compute workers (DPUs), which adds startup latency and is not truly serverless in the same way as Lambda."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html", title: "Detect PII entities in Amazon Comprehend" },
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html", title: "Using Lambda with Amazon S3" }
    ]
  },
  {
    id: 78,
    question: "A company's application runs on Amazon EC2 instances that require access to confidential API keys stored as secrets. Currently, the API keys are hardcoded in the application's configuration files stored on the EC2 instances. The security team requires that secrets must never be stored in configuration files, must be rotated automatically every 30 days, and must have all access audited.\n\nWhich solution meets all three requirements with the LEAST application code change?",
    options: [
      "Store API keys as encrypted Amazon S3 objects using SSE-KMS. Grant EC2 instance IAM roles read access to the S3 objects. Update the application to read secrets from S3 at startup.",
      "Store API keys in AWS Systems Manager Parameter Store as SecureString parameters. Grant EC2 instance IAM roles ssm:GetParameter access. Update the application to call the SSM API at startup.",
      "Store API keys in AWS Secrets Manager. Attach an IAM role to the EC2 instances with secretsmanager:GetSecretValue permission. Enable automatic rotation in Secrets Manager using a Lambda rotation function. Update the application to retrieve secrets from Secrets Manager at runtime.",
      "Store API keys as AWS KMS encrypted environment variables in an AWS Lambda function. The EC2 instances call the Lambda function to retrieve secrets."
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "AWS Secrets Manager is purpose-built for managing application secrets with automatic rotation, fine-grained access control, and full audit logging through AWS CloudTrail. It natively supports automatic rotation with Lambda functions for common secret types. The application retrieves secrets using the Secrets Manager API at runtime — secrets are never stored on disk. All GetSecretValue calls are logged to CloudTrail, satisfying the audit requirement.",
    optionExplanations: [
      "Storing secrets as S3 objects provides encryption at rest but S3 does not support automatic secret rotation natively. Implementing rotation requires custom Lambda functions and additional infrastructure. S3 GetObject calls are logged to CloudTrail or S3 server access logs, but this adds more complexity than Secrets Manager.",
      "AWS Systems Manager Parameter Store SecureString parameters provide encryption and IAM access control. CloudTrail logs GetParameter calls for audit. However, Parameter Store does not natively support automatic secret rotation — rotation must be implemented manually with custom automation. Secrets Manager is the purpose-built service for this use case.",
      "✓ Correct: AWS Secrets Manager natively supports automatic rotation with pre-built Lambda rotation functions for common secret types (RDS passwords, API keys via custom Lambda). CloudTrail automatically logs every GetSecretValue API call, satisfying the audit requirement. The application replaces hardcoded configuration values with a single API call to retrieve secrets at runtime. Secrets Manager handles rotation, versioning, and replication.",
      "EC2 instances calling Lambda to retrieve secrets adds an unnecessary intermediary layer and additional network hops. Lambda environment variables are also not designed as a secrets distribution mechanism. This approach adds complexity without providing the rotation and audit capabilities of Secrets Manager."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html", title: "What is AWS Secrets Manager?" },
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html", title: "Rotating your AWS Secrets Manager secrets" }
    ]
  },
  {
    id: 79,
    question: "A company is evaluating AWS costs and wants to optimize spending for a production workload. The workload runs continuously 24/7 on a fleet of 20 c5.2xlarge On-Demand EC2 instances. The workload is stable and predictable with no expected changes in size for the next 3 years. The company wants to maximize savings while committing to usage.\n\nWhich purchasing option provides the MAXIMUM cost savings for this workload?",
    options: [
      "Purchase 20 Standard Reserved Instances for c5.2xlarge with a 1-year term and a partial upfront payment.",
      "Purchase 20 Convertible Reserved Instances for c5.2xlarge with a 3-year term and an all-upfront payment.",
      "Purchase 20 Standard Reserved Instances for c5.2xlarge with a 3-year term and an all-upfront payment.",
      "Purchase 20 Savings Plans (Compute Savings Plans) with a 3-year term and an all-upfront payment."
    ],
    correctAnswer: 2,
    category: "Cost Optimization",
    explanation: "Standard Reserved Instances with a 3-year term and all-upfront payment provide the maximum discount (up to 72%) compared to On-Demand pricing. The all-upfront payment eliminates any hourly charges, maximizing savings over the 3-year term. Standard RIs provide deeper discounts than Convertible RIs because they cannot be exchanged for different instance types. Since the workload is stable and the instance type is known, the flexibility of Convertible RIs is unnecessary.",
    optionExplanations: [
      "A 1-year term Standard RI provides a lower discount (approximately 40%) than a 3-year term. Partial upfront further reduces savings compared to all-upfront. This option does not maximize savings.",
      "Convertible Reserved Instances allow exchanging for different instance types or regions, but this flexibility comes at a cost — Convertible RIs provide lower discounts than Standard RIs (approximately 54% vs. 72% for 3-year all-upfront). Since the workload is stable with no expected changes, Convertible flexibility is not needed and reduces maximum savings.",
      "✓ Correct: Standard Reserved Instances with a 3-year all-upfront payment provide the highest available discount on EC2 (up to 72% compared to On-Demand). All-upfront eliminates hourly RI charges. For a stable, known workload running 24/7 for 3 years with a specific instance type, this option maximizes savings by committing fully.",
      "Compute Savings Plans provide flexibility across instance families, Regions, and compute services (EC2, Fargate, Lambda), but they typically provide slightly lower discounts (up to 66%) than Standard RIs (up to 72%). For a known, stable EC2 workload, Standard RIs provide higher savings."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html", title: "Reserved Instances" },
      { url: "https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html", title: "What are Savings Plans?" }
    ]
  },
  {
    id: 80,
    question: "A company runs a financial reporting application that generates complex SQL reports against an Amazon RDS for PostgreSQL database. Report generation queries take 20-45 minutes and run twice daily (end-of-day and end-of-month). During report generation, the primary database experiences high CPU utilization, causing transaction processing for the main application to degrade significantly.\n\nA solutions architect must recommend a solution that:\n- Eliminates the impact of reports on transaction processing\n- Requires no changes to the SQL report queries\n- Minimizes cost\n\nWhich solution meets all three requirements?",
    options: [
      "Create an Amazon RDS for PostgreSQL read replica in the same Region. Connect the reporting application to the read replica endpoint. No changes to SQL queries are required since the replica uses the same schema.",
      "Migrate the reporting database to Amazon Redshift. Rewrite the SQL report queries to use Redshift-compatible syntax.",
      "Create an Amazon Aurora PostgreSQL database as a separate instance. Use AWS DMS to replicate data from RDS to Aurora. Run reports against Aurora.",
      "Upgrade the primary RDS instance to a larger instance type with more CPU and memory to handle both transactional and reporting workloads concurrently."
    ],
    correctAnswer: 0,
    category: "Database and Storage",
    explanation: "An RDS read replica is a fully managed, automatically synchronized replica of the primary database. Reports run against the replica, completely isolating them from the primary instance's transactional workload. Because the replica uses identical PostgreSQL schema and syntax, no SQL query changes are required. Read replicas have lower cost than a separate full RDS instance or Aurora, and there is no DMS setup required.",
    optionExplanations: [
      "✓ Correct: An RDS read replica is the minimal-change, cost-effective solution for read isolation. The replica uses PostgreSQL asynchronous replication from the primary. Reporting queries run against the replica endpoint — all existing SQL syntax works without modification because the replica is a standard PostgreSQL instance. The primary is completely relieved of report CPU load. The replica costs approximately the same as a primary instance, but no DMS, no migration, and no schema changes are needed.",
      "Migrating to Amazon Redshift requires rewriting SQL queries for Redshift compatibility (different SQL dialect, functions, and data types than PostgreSQL). This violates the no-SQL-changes requirement.",
      "Setting up a separate Aurora PostgreSQL instance with DMS replication introduces DMS costs, replication lag management, schema conversion considerations, and ongoing operational overhead. This is more complex and expensive than a native RDS read replica.",
      "Upgrading to a larger instance increases the primary's capacity but does not eliminate the workload contention — reports and transactions still compete for the same CPU resources on the same instance. This is a more expensive approach that does not fully solve the isolation requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html", title: "Working with read replicas" },
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.PostgreSQL.html", title: "Working with PostgreSQL read replicas in Amazon RDS" }
    ]
  }
,
  {
    id: 81,
    question: "A company is designing a disaster recovery solution for its primary application running in us-east-1. The application uses Amazon EC2, Amazon RDS for MySQL, and Amazon S3. The company has established the following requirements:\n- RTO: 4 hours\n- RPO: 1 hour\n- The DR environment should incur minimal cost when not in use\n\nWhich DR strategy meets these requirements at the LOWEST cost?",
    options: [
      "Pilot light: Replicate the RDS database to a standby instance in us-west-2 using cross-Region read replicas. Store EC2 AMIs and application code in S3 in us-west-2. In a disaster, launch EC2 instances from AMIs and promote the RDS read replica.",
      "Warm standby: Run a scaled-down version of the full application stack in us-west-2 at all times. Scale up to full capacity during a disaster.",
      "Multi-site active-active: Deploy the full application stack in both us-east-1 and us-west-2. Use Route 53 weighted routing to distribute 50% of traffic to each Region.",
      "Backup and restore: Enable automated backups for RDS with a 1-hour retention window. Store EC2 AMIs in S3. In a disaster, restore from the latest RDS backup and launch EC2 instances from AMIs."
    ],
    correctAnswer: 0,
    category: "High Availability and Disaster Recovery",
    explanation: "The pilot light strategy keeps only the core data layer (RDS read replica) running continuously in the DR region, with no EC2 instances running. AMIs and configuration are pre-staged in S3. During a disaster, EC2 instances are launched from AMIs (typically 30-60 minutes) and the RDS read replica is promoted (typically under 5 minutes). Cross-Region RDS replication provides near-continuous data replication, achieving RPO of minutes. Total recovery time comfortably fits within the 4-hour RTO. Cost is minimal since only the read replica runs continuously.",
    optionExplanations: [
      "✓ Correct: Pilot light keeps only the minimum essential infrastructure running (RDS cross-Region read replica) continuously. EC2 instances are not running, minimizing cost. At disaster time, the architect launches EC2 instances from pre-staged AMIs and promotes the replica. Cross-Region RDS replication typically lags by seconds to minutes, meeting the 1-hour RPO. Recovery within 4 hours is achievable. This is the lowest-cost approach that meets both RTO and RPO requirements.",
      "Warm standby runs a scaled-down but functional copy of the application continuously, including EC2 instances. This incurs significantly higher ongoing cost than pilot light (which has zero EC2 cost in the DR region).",
      "Multi-site active-active runs full infrastructure in two Regions at all times, which is the most expensive option. It exceeds the RTO/RPO requirements but at unnecessary cost.",
      "Backup and restore relies on RDS automated backups with a minimum backup frequency. RDS automated backups have a maximum transaction log backup interval of 5 minutes, but point-in-time recovery requires restoring the full snapshot plus transaction logs. Total recovery time can exceed 4 hours for large databases, and the RPO depends on backup frequency. Launching EC2 instances from AMIs is fine, but RDS restore time is a significant risk."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html", title: "Disaster recovery options in the cloud" },
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html", title: "Creating a read replica in a different AWS Region" }
    ]
  },
  {
    id: 82,
    question: "A company wants to automate security responses in their AWS environment. When Amazon GuardDuty detects a finding that an EC2 instance is communicating with a known command-and-control (C2) server, the company requires:\n1. The EC2 instance's security group must be immediately changed to deny all outbound traffic\n2. A forensic snapshot of the instance's EBS volumes must be taken\n3. The security team must be notified via email\n\nAll three actions must happen automatically without manual intervention.\n\nWhich architecture implements all three requirements?",
    options: [
      "Create an Amazon CloudWatch alarm that monitors GuardDuty findings. Configure the alarm to invoke an AWS Lambda function that performs all three actions.",
      "Configure Amazon EventBridge to match GuardDuty findings of type CryptoCurrency:EC2/BitcoinTool.B!DNS or UnauthorizedAccess:EC2/MaliciousIPCaller. Set the target to an AWS Lambda function that modifies the security group, creates EBS snapshots, and publishes to an SNS topic.",
      "Enable AWS Security Hub and create a custom action. Configure the action to trigger a Lambda function for the three remediation steps.",
      "Configure Amazon GuardDuty to automatically publish findings to an Amazon SQS queue. Use a Lambda function to consume from the queue and perform the three remediation actions."
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "Amazon EventBridge natively integrates with GuardDuty and can match specific finding types in near real time. A Lambda function target performs all three remediation steps programmatically: updating the security group (EC2 ModifyNetworkInterfaceAttribute or AuthorizeSecurityGroupEgress/RevokeSecurityGroupEgress), creating EBS snapshots (EC2 CreateSnapshot), and publishing to SNS for email notification. This is the standard automated security response pattern.",
    optionExplanations: [
      "CloudWatch alarms are used for metric-based thresholds, not for event pattern matching on GuardDuty finding types. GuardDuty findings are events, not CloudWatch metrics. EventBridge is the correct service for event-driven pattern matching on GuardDuty findings.",
      "✓ Correct: EventBridge receives GuardDuty findings as events and matches them against event patterns (finding type, severity, resource type). A Lambda function is invoked automatically within seconds. Lambda uses the AWS SDK to: (1) modify the EC2 security group to deny all outbound traffic, (2) create EBS snapshots of all attached volumes, and (3) publish a notification to SNS which sends email to the security team. All three steps happen automatically without manual intervention.",
      "AWS Security Hub custom actions require a user to manually select the finding in the Security Hub console and click the custom action button. This is not fully automatic — it requires manual triggering, which does not meet the requirement.",
      "GuardDuty does not natively publish findings to SQS directly. GuardDuty publishes findings as events to EventBridge (CloudWatch Events). An EventBridge rule with an SQS target could route findings to SQS, but adding an SQS queue as an intermediate step adds latency and complexity without benefit. Direct EventBridge → Lambda is simpler and faster."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_cloudwatch.html", title: "Creating custom responses to GuardDuty findings" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event.html", title: "Events from AWS services" }
    ]
  },
  {
    id: 83,
    question: "A company operates a multi-tier application with a web tier, application tier, and database tier. Each tier runs on Amazon EC2 instances in separate VPCs (web-vpc, app-vpc, db-vpc) in the same AWS Region. The web tier must communicate with the application tier, and the application tier must communicate with the database tier, but the web tier must not be able to communicate directly with the database tier.\n\nWhich networking solution meets these requirements with the LEAST complexity?",
    options: [
      "Create VPC peering connections between web-vpc and app-vpc, and between app-vpc and db-vpc. Do not create a peering connection between web-vpc and db-vpc. Configure route tables accordingly.",
      "Deploy an AWS Transit Gateway. Attach all three VPCs to the Transit Gateway. Configure Transit Gateway route tables to allow web-vpc to app-vpc and app-vpc to db-vpc routes only, with no direct route from web-vpc to db-vpc.",
      "Use VPC peering between all three VPCs (web-app, app-db, web-db). Use security groups on the database tier to deny inbound traffic from web tier IP ranges.",
      "Merge all three tiers into a single VPC. Use subnet-level network ACLs to enforce the communication restrictions between tiers."
    ],
    correctAnswer: 0,
    category: "Network Design",
    explanation: "VPC peering connections are non-transitive — web-vpc cannot communicate with db-vpc through app-vpc, even if both peering connections (web-vpc↔app-vpc and app-vpc↔db-vpc) exist. This means the isolation requirement (web tier cannot reach db tier) is enforced by VPC architecture itself, without requiring additional security controls. This is the simplest and most architecturally sound solution.",
    optionExplanations: [
      "✓ Correct: VPC peering is non-transitive. A packet from web-vpc cannot traverse app-vpc to reach db-vpc — each VPC only routes traffic to its directly peered VPC. Without a peering connection between web-vpc and db-vpc, there is no network path from web tier to database tier regardless of route table configuration. This architectural enforcement requires the fewest components and least ongoing management.",
      "Transit Gateway supports routing policies, but configuring route tables to block web-vpc → db-vpc while allowing app-vpc → db-vpc requires careful Transit Gateway route table management (separate route tables per VPC attachment). This is more complex than VPC peering for this straightforward isolation requirement.",
      "Creating a peering connection between web-vpc and db-vpc defeats the purpose, as the connection provides a network path. Relying on security groups for isolation is a weaker control — it can be misconfigured. Architectural isolation (no peering) is more robust.",
      "Merging tiers into a single VPC eliminates the architectural isolation between tiers. Network ACLs can enforce isolation but are stateless and complex to manage. Architectural VPC-level separation provides stronger isolation with less operational risk."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html", title: "VPC peering basics" },
      { url: "https://docs.aws.amazon.com/vpc/latest/peering/invalid-peering-configurations.html", title: "Invalid VPC peering configurations" }
    ]
  },
  {
    id: 84,
    question: "A company wants to enforce a policy that all Amazon EC2 instances launched in any AWS account within their AWS Organization must be tagged with a specific set of tags: Environment, Owner, and CostCenter. If an instance is launched without these tags, it must be automatically stopped and the instance owner must be notified. The company wants to enforce this across all current and future member accounts.\n\nWhich solution meets these requirements?",
    options: [
      "Create an SCP that denies ec2:RunInstances unless the request includes the required tags using the aws:RequestTag condition key. Apply the SCP to the organization root.",
      "Create an AWS Config organization conformance pack with the required-tags managed rule. Configure automatic remediation using Systems Manager Automation to stop non-tagged instances and send SNS notifications.",
      "Use AWS Service Catalog to create a portfolio of pre-approved EC2 launch configurations with mandatory tag parameters. Restrict all users to launching EC2 instances only through Service Catalog.",
      "Create an IAM permission boundary that denies ec2:RunInstances without required tags. Apply the permission boundary to all IAM roles in each member account using CloudFormation StackSets."
    ],
    correctAnswer: 0,
    category: "Governance and Multi-Account Strategy",
    explanation: "An SCP with a Deny on ec2:RunInstances combined with a condition that requires specific tags using aws:RequestTag prevents any EC2 instance from being launched without the required tags. This is a proactive, preventive control that applies to all principals in all member accounts simultaneously. The SCP is applied at the organization root, so it automatically covers all current and future member accounts.",
    optionExplanations: [
      "✓ Correct: An SCP using Deny with the condition StringNotEqualsIfExists: aws:RequestTag/Environment, aws:RequestTag/Owner, aws:RequestTag/CostCenter blocks RunInstances calls that omit any required tag. This prevents non-tagged instances from ever being launched — no instances are created, so no remediation is needed. The SCP at the root applies to all member accounts automatically, including accounts added in the future. This is a preventive control, which is stronger than a detective-and-remediate approach.",
      "AWS Config conformance packs detect non-compliant resources after they are created. There is a detection lag, meaning non-tagged instances run for some time before being stopped. Stopping an already-running instance can disrupt workloads. The SCP approach prevents non-tagged instances from ever starting.",
      "AWS Service Catalog constrains EC2 launches through catalog products but does not prevent users with EC2 permissions from launching instances directly via the console or CLI outside of Service Catalog. It does not prevent non-catalog EC2 launches unless EC2 console access is also restricted.",
      "IAM permission boundaries must be manually applied to each role in each account. Using StackSets to apply permission boundaries requires deploying to all accounts and updating boundaries when new roles are created. This is operationally complex and does not automatically apply to new roles created after the StackSet deployment."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples_tagging.html", title: "SCP examples — require tags" },
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_tags.html", title: "Controlling access to AWS resources using tags" }
    ]
  },
  {
    id: 85,
    question: "A company runs a global content platform on AWS. The platform stores user-generated content (videos, images, documents) in Amazon S3. The company needs to deliver this content to users worldwide with low latency. Additionally, the company wants to protect against hotlinking (other websites embedding their content without permission) and wants to restrict content access to authenticated users only.\n\nWhich solution addresses all three requirements?",
    options: [
      "Use Amazon S3 Transfer Acceleration to speed up content delivery globally. Configure S3 bucket policies to restrict access to authenticated IAM users.",
      "Deploy Amazon CloudFront with the S3 bucket as the origin. Use Origin Access Control (OAC) to restrict S3 access to CloudFront only. Use CloudFront signed URLs with short expiration times and include the Referer header validation using a Lambda@Edge function.",
      "Use AWS Global Accelerator with the S3 bucket as an endpoint. Configure S3 bucket policies to allow access only from Global Accelerator IP ranges.",
      "Deploy multiple S3 buckets in different AWS Regions. Use Amazon Route 53 geolocation routing to direct users to the nearest regional bucket."
    ],
    correctAnswer: 1,
    category: "Content Delivery and Performance",
    explanation: "CloudFront delivers content from edge locations worldwide, providing low latency. OAC ensures the S3 bucket is not directly accessible — all requests must go through CloudFront. Signed URLs enforce authentication (only users with a valid signed URL can access content). A Lambda@Edge function can inspect the Referer header on incoming requests and block requests with missing or unauthorized Referer values, preventing hotlinking.",
    optionExplanations: [
      "S3 Transfer Acceleration improves upload performance to S3 from remote locations using CloudFront edge infrastructure, but it is optimized for uploads, not downloads to end users. It also does not provide signed URL authentication or hotlink protection.",
      "✓ Correct: CloudFront provides global edge caching for low-latency delivery. OAC restricts S3 access so only CloudFront can retrieve objects directly from S3, preventing direct URL access. CloudFront signed URLs with short expiration require user authentication before generating a URL. Lambda@Edge at the Viewer Request event can inspect the Referer header and return a 403 for requests from unauthorized domains, blocking hotlinking. All three requirements are addressed.",
      "AWS Global Accelerator improves network routing to AWS endpoints using the AWS global backbone, but it does not cache content at edge locations like CloudFront. S3 is not a standard Global Accelerator endpoint type, and Global Accelerator does not provide signed URL authentication or hotlink protection.",
      "Multi-Region S3 with Route 53 geolocation routing reduces latency for users in specific regions, but it does not provide content caching (each request hits S3 directly), does not enforce authentication without additional components, and does not protect against hotlinking."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html", title: "Serving private content with signed URLs and signed cookies" },
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html", title: "Customizing at the edge with Lambda@Edge" }
    ]
  },
  {
    id: 86,
    question: "A company has a monolithic Java application deployed on a single large Amazon EC2 instance (m5.4xlarge). The application's architecture makes horizontal scaling difficult, and the application must stay on a single instance. The application experiences memory pressure and OutOfMemoryErrors during peak traffic periods. The development team cannot modify the application code in the short term.\n\nWhat is the MOST cost-effective immediate solution to resolve the memory issue?",
    options: [
      "Migrate the application to AWS Lambda. Lambda automatically manages memory and scales without the need for manual memory tuning.",
      "Change the EC2 instance type to a memory-optimized instance (r5.4xlarge) with more RAM. The application will have more memory available without any code or configuration changes.",
      "Add an Amazon ElastiCache for Memcached cluster in front of the application to cache responses and reduce memory pressure on the JVM.",
      "Attach additional EBS volumes to the EC2 instance and configure the operating system to use the additional storage as swap space."
    ],
    correctAnswer: 1,
    category: "Compute and Containers",
    explanation: "Changing to a memory-optimized instance type (r5 family) provides significantly more RAM than the general-purpose m5 family at the same vCPU count. The r5.4xlarge provides 128 GB RAM compared to the m5.4xlarge's 64 GB RAM. This requires no code changes, no configuration changes, and no additional service setup — only a stop, instance type change, and start, which takes a few minutes.",
    optionExplanations: [
      "Migrating a monolithic Java application to AWS Lambda requires significant refactoring — Lambda has a maximum execution timeout of 15 minutes and a maximum memory of 10 GB. A monolithic application requiring more than 10 GB RAM cannot run on Lambda, and refactoring a monolith to Lambda is a major architectural change, not a quick fix.",
      "✓ Correct: Changing the instance type to r5.4xlarge doubles the available RAM (128 GB vs 64 GB) at comparable cost to the m5.4xlarge. Memory-optimized instances are purpose-built for memory-intensive workloads. The change requires only stopping the instance, modifying the instance type, and restarting. No application code changes, configuration changes, or additional services are needed.",
      "ElastiCache can reduce database query load and cache computed results, but it does not reduce JVM heap pressure for in-memory application data. If the application is experiencing OutOfMemoryErrors due to application-level memory consumption (object allocation, heap growth), caching external data does not address the root cause.",
      "Configuring swap space allows the OS to extend virtual memory using disk storage, but JVM applications that spill to swap space will experience severely degraded performance due to disk I/O latency. Swap is not an appropriate solution for a production Java application with memory pressure — it masks the problem while causing significant performance degradation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#instance-type-summary-table", title: "EC2 instance types" },
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-resize.html", title: "Change the instance type" }
    ]
  },
  {
    id: 87,
    question: "A company operates a data pipeline that processes sensitive customer data. The pipeline consists of multiple AWS Lambda functions that pass data between each other. The security team requires that all data exchanged between Lambda functions must be encrypted using a customer-managed KMS key and must never be stored in plaintext, even temporarily. The pipeline currently passes data as JSON payloads in Lambda function invocation events.\n\nWhich solution meets the security requirements with the LEAST architectural change?",
    options: [
      "Store intermediate data in Amazon S3 with SSE-KMS encryption using a customer-managed key. Pass only the S3 object key between Lambda functions. Each Lambda retrieves and decrypts data from S3 when processing.",
      "Enable Lambda function encryption at rest using a customer-managed KMS key. Lambda will automatically encrypt all data in function invocation payloads.",
      "Use Amazon SQS with SSE enabled using a customer-managed KMS key to pass messages between Lambda functions. Each Lambda reads from and writes to SQS.",
      "Implement application-level encryption in each Lambda function using the AWS Encryption SDK. Encrypt data with a customer-managed KMS key before passing it to the next Lambda, and decrypt at the start of each function."
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Storing intermediate data in S3 with SSE-KMS (customer-managed key) ensures data is always encrypted at rest. Lambda invocation payloads are limited to 6 MB (synchronous) or 256 KB (asynchronous) and are not encrypted with customer-managed keys — passing only the S3 object key keeps the payload minimal and sensitive data out of invocation events. Each Lambda retrieves, processes, and re-encrypts data using S3 SSE-KMS, ensuring data is never in plaintext storage.",
    optionExplanations: [
      "✓ Correct: S3 SSE-KMS with a customer-managed key encrypts data before writing to disk and decrypts on authorized reads. Passing only the S3 key reference (e.g., s3://bucket/data/job-123.json) in Lambda invocation events keeps sensitive data out of event payloads entirely. This is the minimal change that ensures data is encrypted at rest with a CMK and never stored in plaintext. The pipeline flow (Lambda A writes to S3 → passes key to Lambda B → Lambda B reads from S3) requires minimal restructuring.",
      "AWS Lambda's encryption at rest setting encrypts Lambda function code and environment variables stored by AWS — it does not encrypt invocation event payloads in transit between functions. Lambda invocation data passes through AWS-managed infrastructure and is not encrypted with customer-managed keys at the event level.",
      "SQS with SSE-KMS encrypts messages at rest in the queue. This is a valid approach for asynchronous pipelines but requires restructuring the invocation model from direct Lambda-to-Lambda calls to a queue-based architecture, which is a larger architectural change than using S3.",
      "Application-level encryption with the AWS Encryption SDK is technically valid and provides strong security, but it requires modifying the code of every Lambda function in the pipeline to add encryption/decryption logic — the most invasive approach in terms of code changes."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html", title: "Using server-side encryption with AWS KMS keys" },
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/invocation-sync.html", title: "Synchronous invocation" }
    ]
  },
  {
    id: 88,
    question: "A solutions architect is reviewing a company's existing AWS architecture for operational excellence improvements. The architecture uses Amazon EC2 instances with user data scripts to configure instances at launch. Application deployments are performed by manually SSH-ing into each instance and running deployment scripts. There is no centralized logging or change tracking.\n\nWhich combination of improvements should the solutions architect recommend to align with the AWS Well-Architected Operational Excellence pillar? (Choose TWO.)",
    options: [
      "Replace manual SSH-based deployments with AWS CodeDeploy. Define deployment configurations in appspec.yml files stored in version control. Use CodeDeploy deployment groups to automate application rollouts across instance fleets.",
      "Migrate all EC2 instances to AWS Lambda to eliminate the need for server management entirely.",
      "Install the Amazon CloudWatch agent on all EC2 instances. Configure the agent to stream application logs and OS metrics to Amazon CloudWatch Logs and CloudWatch Metrics for centralized monitoring and alerting.",
      "Enable Amazon EC2 Auto Scaling with a minimum capacity of 1 to ensure instances are automatically replaced if they become unhealthy.",
      "Encrypt all EBS volumes attached to EC2 instances using AWS KMS to protect data at rest."
    ],
    correctAnswer: [0, 2],
    category: "Deployment and Infrastructure as Code",
    explanation: "The Operational Excellence pillar emphasizes automating operations, performing operations as code, and using centralized logging and monitoring. Replacing manual SSH deployments with CodeDeploy provides automation, rollback capability, and deployment tracking. Installing the CloudWatch agent provides centralized log aggregation and metrics visibility, enabling monitoring and alerting aligned with the Operational Excellence principle of understanding workload health.",
    optionExplanations: [
      "✓ Correct: AWS CodeDeploy automates application deployments, eliminating manual SSH steps. Deployments are defined as code (appspec.yml), tracked in deployment history, and can be automatically rolled back on failure. This directly addresses the operational excellence improvement areas of performing operations as code and automating deployment processes.",
      "Migrating to Lambda is a significant architectural change that may not be feasible for all EC2 workloads (long-running processes, stateful applications, specific OS requirements). This is not an operational excellence improvement for the existing EC2-based architecture.",
      "✓ Correct: The CloudWatch agent enables centralized collection of application logs and OS-level metrics from all EC2 instances. CloudWatch Logs provides searchable, centralized log storage. CloudWatch Metrics enable dashboards and alarms for operational visibility. This directly addresses the absence of centralized logging and change tracking identified in the review.",
      "EC2 Auto Scaling with minimum capacity provides instance replacement on health check failure, which is a reliability improvement rather than an operational excellence improvement. The question specifically asks about Operational Excellence pillar alignment.",
      "EBS encryption is a security improvement (Security pillar), not an Operational Excellence improvement. While encryption is important, it does not address the identified issues of manual deployments and absence of centralized logging."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html", title: "What is CodeDeploy?" },
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html", title: "Installing the CloudWatch agent" }
    ]
  },
  {
    id: 89,
    question: "A company processes medical imaging files uploaded to Amazon S3 from hospital partners around the world. Each image file is typically 200-500 MB. Hospital partners frequently report that uploads from remote locations are slow and sometimes fail due to network instability over long distances. The company wants to improve upload reliability and speed without requiring the partners to install new software.\n\nWhich solution should a solutions architect recommend?",
    options: [
      "Use Amazon S3 Transfer Acceleration. Provide partners with the S3 Transfer Acceleration endpoint (bucket.s3-accelerate.amazonaws.com). Partners upload files using the standard S3 API — no software changes are needed, just the endpoint URL.",
      "Use AWS DataSync to transfer files from hospital partner locations to Amazon S3. Install the DataSync agent at each hospital.",
      "Use AWS Snow Family (Snowball Edge) to collect files from hospital partners and ship the devices to AWS for data ingestion.",
      "Use Amazon S3 multipart upload with retry logic. Require partners to update their upload clients to split files into 100 MB parts and retry failed parts."
    ],
    correctAnswer: 0,
    category: "Migration and Modernization",
    explanation: "Amazon S3 Transfer Acceleration uses CloudFront's globally distributed edge locations to accelerate uploads to S3 over long distances. Instead of uploading directly to an S3 Regional endpoint over the public internet, the data travels to the nearest CloudFront edge location over a highly optimized, low-latency path, then travels to S3 over the AWS private backbone network. Partners only need to change the endpoint URL — no software installation is required.",
    optionExplanations: [
      "✓ Correct: S3 Transfer Acceleration routes uploads through CloudFront edge locations to Amazon S3. The upload goes from the hospital to the nearest edge location (minimizing public internet distance) and then over the AWS private network to S3 in us-east-1 (or wherever the bucket is). This can improve upload speed by 50-500% for uploads originating far from the bucket's Region. Partners only change the endpoint URL in their existing S3 upload code — no new software or agents are needed.",
      "AWS DataSync accelerates data transfers and handles retries automatically, but it requires installing a DataSync agent at each hospital partner location. The requirement explicitly states no new software installation.",
      "AWS Snowball Edge requires ordering, shipping, and returning physical devices. This introduces days to weeks of latency for each transfer and is suitable for bulk data migration, not continuous operational uploads of individual medical images.",
      "S3 multipart upload improves upload efficiency and allows retry of individual parts, but it requires partners to modify their upload clients. The requirement states no new software installation. Additionally, multipart upload alone does not address the underlying issue of slow internet paths over long distances."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html", title: "Amazon S3 Transfer Acceleration" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration-speed-comparison.html", title: "Speed Comparison tool" }
    ]
  },
  {
    id: 90,
    question: "A company runs a mission-critical order management system. The system processes orders through a series of steps: validation, payment processing, inventory reservation, and fulfillment notification. Each step is handled by a separate microservice. If any step fails, the entire order must be rolled back — inventory reservations must be released, payments must be refunded, and the order must be marked as failed. The business requires that partial order states never persist.\n\nWhich pattern should a solutions architect recommend to manage the distributed transaction across microservices?",
    options: [
      "Use AWS Step Functions to orchestrate the order processing workflow. Define each microservice call as a state in the state machine. Use Step Functions' built-in error handling and Catch blocks to trigger compensating transactions on failure.",
      "Use Amazon SQS FIFO queues to pass order data between microservices in sequence. If a microservice fails, it publishes a rollback message to a dead-letter queue for manual review.",
      "Use two-phase commit (2PC) protocol with a central coordinator Lambda function that manages distributed locks across all microservice databases.",
      "Use Amazon EventBridge to publish events between microservices. If any microservice fails, it publishes a failure event that other microservices subscribe to for rollback."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "This scenario describes the Saga pattern for distributed transactions. AWS Step Functions with the Saga orchestration pattern is the recommended AWS implementation. Each microservice call is a state; on failure, Catch blocks trigger compensating transaction states (refund payment, release inventory) in reverse order. Step Functions maintains the execution state, retries, and compensation logic without requiring distributed locks or complex event choreography.",
    optionExplanations: [
      "✓ Correct: AWS Step Functions implements the Saga orchestration pattern for distributed transactions. Each step (validate, charge, reserve, notify) is a Task state. If the inventory reservation fails after payment succeeds, the Catch block triggers a compensating 'refund payment' Task state before marking the workflow as failed. Step Functions guarantees that compensation logic executes and provides complete execution history for every order, ensuring no partial states persist.",
      "SQS FIFO queues enable ordered message delivery, but routing rollback logic through a dead-letter queue for manual review means partial states can persist until a human reviews and processes the DLQ. This does not satisfy the 'partial states never persist' requirement automatically.",
      "Two-phase commit requires distributed locks across microservice databases, which introduces tight coupling, deadlock risk, and reduced availability. 2PC is a known anti-pattern for microservices architectures. The Saga pattern (implemented via Step Functions) is the recommended alternative.",
      "EventBridge choreography (each service publishes failure events that others subscribe to) can implement the Saga pattern, but choreography becomes difficult to track and debug as the number of services and failure scenarios grows. Orchestration via Step Functions provides better observability and explicit control flow for compensating transactions."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html", title: "Error handling in Step Functions" },
      { url: "https://aws.amazon.com/blogs/compute/implementing-the-saga-pattern-in-aws-step-functions/", title: "Implementing the Saga pattern in AWS Step Functions" }
    ]
  }
,
  {
    id: 91,
    question: "A company uses Amazon Kinesis Data Streams to ingest clickstream events from its website. A downstream AWS Lambda function processes each event, enriches it with user profile data from Amazon DynamoDB, and writes the enriched event to Amazon S3. During peak traffic, the Lambda function is throttled and events are being lost. The operations team observes that the Lambda function's iterator age is growing continuously.\n\nWhat does a growing iterator age indicate, and which solution resolves the issue?",
    options: [
      "Growing iterator age indicates that Lambda is processing records faster than they are being produced. Decrease the batch size to reduce Lambda invocation frequency.",
      "Growing iterator age indicates that Lambda cannot keep up with the rate of records in the Kinesis stream. Add more shards to the Kinesis stream and increase the Lambda function's reserved concurrency to match the number of shards.",
      "Growing iterator age indicates that DynamoDB is throttling enrichment lookups. Enable DynamoDB Auto Scaling or switch to on-demand capacity mode to handle the increased read traffic.",
      "Growing iterator age indicates that the Lambda function's timeout is too short. Increase the Lambda timeout to 15 minutes to allow more records to be processed per invocation."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "Iterator age measures the age of the last record processed in a Kinesis shard — specifically, the difference between the current time and when the last processed record was written to the stream. A growing iterator age means Lambda is falling behind: records are arriving faster than Lambda can process them. Adding shards increases parallelism (Lambda invokes one function per shard), and increasing reserved concurrency ensures Lambda can invoke one concurrent execution per shard.",
    optionExplanations: [
      "Growing iterator age means Lambda is falling behind — processing records more slowly than they are produced, not faster. Decreasing batch size reduces the work per invocation but increases invocation frequency, which could worsen throttling if Lambda concurrency is the bottleneck.",
      "✓ Correct: Iterator age grows when Lambda cannot consume records from the stream fast enough. The primary solutions are: (1) increase the number of Kinesis shards — each shard is processed by one Lambda invocation, so more shards means more parallelism; and (2) increase Lambda's reserved concurrency to at least match the shard count so Lambda can invoke one function per shard simultaneously. These changes increase the overall throughput of the Lambda-Kinesis consumer.",
      "If DynamoDB were throttling, Lambda would experience errors but would still be invoked at the same rate. DynamoDB throttling causes Lambda function failures (which may cause retries and further slowdown), but the primary diagnosis for growing iterator age is Lambda concurrency being insufficient relative to shard count.",
      "Increasing Lambda timeout allows each invocation to run longer but does not increase the number of parallel invocations. Since Lambda processes one shard per invocation, more time per invocation does not help when the bottleneck is insufficient parallel invocations relative to shard count."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html", title: "Using Lambda with Amazon Kinesis" },
      { url: "https://docs.aws.amazon.com/streams/latest/dev/monitoring-with-cloudwatch.html", title: "Monitoring Kinesis Data Streams with CloudWatch" }
    ]
  },
  {
    id: 92,
    question: "A company is building a new application on AWS and wants to follow a security best practice of least privilege for all AWS resources. The application uses an Amazon ECS task running on AWS Fargate. The task needs to read from an Amazon SQS queue and write results to an Amazon DynamoDB table. No other permissions should be granted.\n\nWhich approach should a solutions architect use to grant permissions to the ECS task?",
    options: [
      "Create an IAM user with an access key and secret key. Attach a policy granting SQS read and DynamoDB write permissions. Store the credentials in the ECS task definition as environment variables.",
      "Create an IAM role with a policy granting sqs:ReceiveMessage, sqs:DeleteMessage, and dynamodb:PutItem permissions. Assign the role as the ECS task role in the task definition.",
      "Create an IAM role with AdministratorAccess. Assign it as the ECS task role to ensure the task has all required permissions without needing to determine the exact permissions required.",
      "Attach an IAM policy granting SQS and DynamoDB access to the ECS task's execution role."
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "The ECS task role is the IAM role assumed by the application code running inside the container. It provides temporary credentials through the ECS metadata endpoint without storing credentials in the environment or code. Granting only the specific actions required (sqs:ReceiveMessage, sqs:DeleteMessage, dynamodb:PutItem) follows least privilege. The task role is separate from the task execution role (used by ECS to pull images and write logs).",
    optionExplanations: [
      "Storing long-term IAM user credentials (access keys) in task definition environment variables is a security anti-pattern. Environment variables can be exposed through logging, environment dumps, or container inspection. Long-term credentials also require manual rotation. Task roles provide automatically rotated temporary credentials.",
      "✓ Correct: The ECS task role provides the application running in the Fargate container with temporary AWS credentials. The role is assumed automatically — no credentials need to be stored or managed. Granting only the specific API actions required (receive/delete from SQS, put items to DynamoDB) follows the principle of least privilege. The ECS metadata endpoint delivers credentials without exposing them in the task definition.",
      "Granting AdministratorAccess violates the principle of least privilege. An ECS task with admin access could be exploited to modify any AWS resource in the account if the container is compromised.",
      "The ECS task execution role controls permissions for ECS infrastructure operations (pulling container images from ECR, writing container logs to CloudWatch). It does not grant permissions to the application code running inside the container. The task role is separate and is what the application code uses."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html", title: "IAM roles for tasks" },
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html", title: "Amazon ECS task execution IAM role" }
    ]
  },
  {
    id: 93,
    question: "A company migrated its on-premises data warehouse to Amazon Redshift. Since migration, query performance on large tables (billions of rows) has been significantly slower than expected. After investigation, a solutions architect discovers that most of the large tables use the default distribution style (AUTO) and do not have sort keys defined. The most common query pattern joins a large fact table with several smaller dimension tables on a date column, and most queries filter on a date range.\n\nWhich changes should the solutions architect make to improve query performance? (Choose TWO.)",
    options: [
      "Change the distribution style of the large fact table to KEY distribution on the most frequently joined column. Change the distribution style of the small dimension tables to ALL distribution.",
      "Change the distribution style of all tables to EVEN distribution to ensure uniform data spread across all compute nodes.",
      "Define a compound sort key on the date column for the large fact table to optimize range queries and reduce the number of blocks scanned.",
      "Enable Redshift concurrency scaling to automatically add cluster capacity during peak query periods.",
      "Convert all large tables to columnar ORC format by exporting to S3 and re-importing."
    ],
    correctAnswer: [0, 2],
    category: "Data Analytics and Architecture",
    explanation: "KEY distribution on the fact table's join column co-locates matching rows from the fact and dimension tables on the same compute node, eliminating network data redistribution during joins. ALL distribution for small dimension tables replicates them to every node, enabling local joins. A compound sort key on the date column allows Redshift to skip blocks outside the query's date range, dramatically reducing I/O for range-filtered queries on billions of rows.",
    optionExplanations: [
      "✓ Correct: KEY distribution on the fact table's join column ensures that rows with the same join key are on the same node, eliminating broadcast or redistribution during join execution. ALL distribution for dimension tables (which are small) replicates the full table to every node, enabling local joins from any fact table row. Together, these eliminate the expensive data movement operations that slow large-table joins in Redshift.",
      "EVEN distribution spreads rows uniformly across nodes but does not co-locate related rows for joins. Queries that join EVEN-distributed tables require redistribution of one or both tables during join execution, which is the expensive operation that causes slow query performance.",
      "✓ Correct: A sort key on the date column causes Redshift to physically store rows in date order on disk. Zone maps record the minimum and maximum date value in each 1 MB disk block. When a query filters on a date range, Redshift uses zone maps to skip all blocks whose range falls entirely outside the filter, scanning only the relevant blocks. For billions of rows filtered on date ranges, this can reduce I/O by orders of magnitude.",
      "Redshift concurrency scaling adds cluster capacity to handle more concurrent queries but does not improve the performance of individual queries. The root cause here is data distribution and missing sort keys, not insufficient cluster capacity.",
      "Amazon Redshift uses its own columnar storage format internally. Data loaded into Redshift tables is automatically stored in Redshift's columnar format regardless of the source format. Converting to ORC in S3 is relevant for Redshift Spectrum queries against S3, not for data stored in Redshift tables."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/c_best-practices-best-dist-key.html", title: "Choose the best distribution style" },
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/c_best-practices-sort-key.html", title: "Choose the best sort key" }
    ]
  },
  {
    id: 94,
    question: "A company is planning to decommission an on-premises data center over the next 18 months. The data center hosts 150 virtual machines running a mix of Windows and Linux workloads. The company wants to migrate these VMs to AWS with minimal downtime and minimal changes to the operating systems or applications. The migration team has limited AWS experience and wants tooling that simplifies the migration process.\n\nWhich AWS service should a solutions architect recommend as the primary migration tool?",
    options: [
      "AWS Database Migration Service (AWS DMS) — use DMS to replicate the VM workloads to Amazon EC2 instances.",
      "AWS Application Migration Service (AWS MGN) — install the MGN replication agent on each source server to continuously replicate the server to AWS. Perform a cutover with minimal downtime.",
      "AWS DataSync — use DataSync to transfer files from on-premises VMs to Amazon S3. Launch new EC2 instances from Amazon Machine Images (AMIs) in AWS.",
      "AWS Server Migration Service (AWS SMS) — use SMS to create incremental snapshots of VMware virtual machines and import them as AMIs."
    ],
    correctAnswer: 1,
    category: "Migration and Modernization",
    explanation: "AWS Application Migration Service (MGN) is the primary AWS service for lift-and-shift server migrations. The MGN agent performs block-level continuous replication from source servers to AWS, keeping the staging area up to date with minimal lag. During cutover, the lag between source and target is typically seconds to minutes, resulting in near-zero downtime. MGN supports any OS and any application without modification, making it ideal for mixed Windows/Linux environments.",
    optionExplanations: [
      "AWS DMS is designed for database migrations between different database engines (e.g., Oracle to Aurora PostgreSQL). It is not suitable for migrating virtual machines or application servers to EC2.",
      "✓ Correct: AWS Application Migration Service is the successor to AWS Server Migration Service and is the recommended tool for lift-and-shift migrations. The replication agent performs continuous block-level replication. The application runs on the source server throughout the migration with no changes. Test launches validate the migrated server in AWS before cutover. Cutover shifts traffic to the AWS instance with minimal downtime. MGN supports any OS and application stack.",
      "AWS DataSync copies file-system data but does not replicate operating system state, installed applications, services, or registry settings. Launching EC2 from generic AMIs and then manually configuring 150 servers is not a practical lift-and-shift approach.",
      "AWS Server Migration Service is the predecessor to AWS MGN and is now in maintenance mode — AWS recommends migrating to AWS MGN for new migrations. SMS also only supports VMware, Hyper-V, and Azure VMs, which may not cover the entire on-premises environment."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html", title: "What is AWS Application Migration Service?" },
      { url: "https://docs.aws.amazon.com/mgn/latest/ug/replication-server-overview.html", title: "Replication overview" }
    ]
  },
  {
    id: 95,
    question: "A company runs a web application using Amazon CloudFront in front of an Amazon S3 static website and an Amazon API Gateway for dynamic content. The security team reports that the application is being scraped by bots that are generating large volumes of requests. The team wants to rate limit requests per IP address, block known bot user agents, and implement a CAPTCHA challenge for suspicious IPs — all without modifying the application code.\n\nWhich solution meets all three requirements?",
    options: [
      "Configure CloudFront geographic restrictions to block requests from regions with high bot activity.",
      "Associate an AWS WAF web ACL with the CloudFront distribution. Create WAF rules for rate limiting (rate-based rule), bot user agent blocking (string match rule on User-Agent header), and CAPTCHA challenge (CAPTCHA action on suspicious IP rules).",
      "Enable Amazon Shield Advanced on the CloudFront distribution to detect and mitigate bot traffic automatically.",
      "Create a Lambda@Edge function at the Viewer Request event to inspect requests, enforce rate limits using Amazon ElastiCache, and return 429 responses for rate-limited IPs."
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "AWS WAF provides all three required controls natively: rate-based rules enforce per-IP request limits; string match rules on the User-Agent header block known bot user agents; and the CAPTCHA action can be applied to rules targeting suspicious IPs. All controls are configured in the WAF web ACL and applied at the CloudFront layer without any application code changes.",
    optionExplanations: [
      "CloudFront geographic restrictions block entire countries or regions but cannot rate limit per IP, block specific user agents, or implement CAPTCHA challenges. Geographic blocking would also block legitimate users in those regions.",
      "✓ Correct: AWS WAF web ACLs support all three required controls as native WAF rule actions. Rate-based rules aggregate requests per IP and block or challenge when a threshold is exceeded. Regular rules with string match conditions on the User-Agent header block specific bot signatures. The CAPTCHA rule action presents a JavaScript CAPTCHA challenge to suspicious IPs. All rules are applied transparently at the CloudFront distribution without application changes.",
      "AWS Shield Advanced protects against DDoS attacks (volumetric, protocol, and application layer). It detects attack traffic patterns but does not provide per-IP rate limiting, user agent-based filtering, or CAPTCHA challenges for bot traffic management.",
      "Lambda@Edge can implement custom request filtering and rate limiting, but it requires writing and maintaining custom code, integrating ElastiCache for state management, and handling all edge cases. This is significantly more complex than using native WAF rules, and it requires managing additional infrastructure."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based.html", title: "Rate-based rule statement" },
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-captcha-and-challenge.html", title: "CAPTCHA and Challenge actions in AWS WAF" }
    ]
  },
  {
    id: 96,
    question: "A company wants to implement a zero-trust network architecture for its AWS workloads. Service A (running on EC2) needs to call Service B's REST API (running on EC2 in a different VPC). The security team requires that:\n- All communication must be encrypted in transit\n- Service A must authenticate itself to Service B using a cryptographically verifiable identity\n- No VPC peering or Transit Gateway should be used\n- Service B must not be directly accessible from the internet\n\nWhich solution meets all requirements?",
    options: [
      "Create a VPC peering connection between the two VPCs. Use HTTPS for all communication. Configure security groups to allow only Service A's IP range to access Service B.",
      "Expose Service B's API through an internal Application Load Balancer. Use AWS PrivateLink to create a VPC endpoint service. Service A connects to Service B through the VPC interface endpoint using HTTPS with mutual TLS (mTLS), presenting an IAM role-based client certificate.",
      "Expose Service B through a public-facing API Gateway endpoint with IAM authorization. Service A uses SigV4 request signing to authenticate calls. All communication uses HTTPS.",
      "Use AWS App Mesh with Envoy sidecars on both services. Configure App Mesh to enforce mTLS between services using ACM Private CA certificates. Use AWS PrivateLink to connect the VPCs for App Mesh control plane communication."
    ],
    correctAnswer: 1,
    category: "Network Design",
    explanation: "AWS PrivateLink with an internal ALB creates a private network path between VPCs without VPC peering or Transit Gateway. Service B is accessible only through the PrivateLink endpoint — not from the internet. mTLS over HTTPS provides encryption in transit and mutual certificate-based authentication between Service A and Service B, satisfying the cryptographic identity verification requirement.",
    optionExplanations: [
      "VPC peering is explicitly prohibited by the requirements. This option does not meet the constraints.",
      "✓ Correct: An internal ALB in Service B's VPC exposes the API internally. A PrivateLink endpoint service backed by the ALB allows Service A's VPC to connect via a VPC interface endpoint without VPC peering or Transit Gateway. Communication uses HTTPS (encrypted in transit). mTLS enables Service A to present a client certificate (issued by ACM Private CA) that Service B verifies — providing cryptographically verifiable identity. Service B's ALB has no public IP, satisfying the no-internet-access requirement.",
      "Exposing Service B through a public-facing API Gateway violates the requirement that Service B must not be directly accessible from the internet. Even with IAM authorization, the endpoint is reachable from the public internet.",
      "AWS App Mesh with PrivateLink is a valid zero-trust approach and provides mTLS between services. However, this option describes using PrivateLink for App Mesh control plane communication, not for the data plane between Service A and Service B. App Mesh requires both services to be reachable to the Envoy proxies, which typically requires VPC connectivity — potentially via peering or Transit Gateway. Option B is more directly aligned with the stated constraints."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html", title: "Create an endpoint service" },
      { url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/mutual-authentication.html", title: "Mutual authentication with TLS in Application Load Balancer" }
    ]
  },
  {
    id: 97,
    question: "A company has thousands of AWS accounts managed through AWS Organizations. The company wants to provide its security operations center (SOC) with a consolidated view of all security findings (GuardDuty findings, Security Hub findings, AWS Config compliance status) across all accounts and Regions in a single dashboard. New member accounts must be automatically included when they are added to the organization.\n\nWhich architecture should a solutions architect recommend?",
    options: [
      "Enable Amazon GuardDuty, AWS Security Hub, and AWS Config in the management account only. All findings from member accounts will automatically be visible in the management account.",
      "Enable Amazon GuardDuty with organization-level delegated administrator. Enable AWS Security Hub with organization-level delegated administrator. Enable AWS Config with an organization-level aggregator. Configure all three services to send findings to a dedicated security account as the delegated administrator.",
      "Create an AWS Lambda function that polls GuardDuty, Security Hub, and Config APIs in each member account every hour. Aggregate findings in an Amazon RDS database. Build a dashboard using Amazon QuickSight.",
      "Use AWS CloudTrail with organization-level trail. Query CloudTrail logs in Amazon Athena from the management account to identify security incidents across all accounts."
    ],
    correctAnswer: 1,
    category: "Governance and Multi-Account Strategy",
    explanation: "All three services (GuardDuty, Security Hub, AWS Config) support organization-level management with a delegated administrator account. Using a dedicated security account as the delegated administrator centralizes findings from all member accounts. New accounts added to the organization are automatically enrolled in all three services. The security account provides a single-pane-of-glass view without requiring access to each individual member account.",
    optionExplanations: [
      "Enabling services only in the management account does not aggregate findings from member accounts automatically. Each service requires explicit organization-level configuration with a delegated administrator to collect findings from all accounts.",
      "✓ Correct: GuardDuty organization management automatically sends findings from all member accounts to the delegated administrator account. Security Hub organization management aggregates Security Hub findings from all member accounts. AWS Config organization-level aggregator collects compliance data from all accounts and Regions. Using a dedicated security account (not the management account) as the delegated administrator follows AWS best practices. New accounts are automatically enrolled when they join the organization.",
      "Polling APIs hourly introduces up to 60 minutes of detection lag. Building and maintaining a custom aggregation pipeline with Lambda, RDS, and QuickSight requires significant development and operational effort. This does not meet the near-real-time visibility requirement for a SOC.",
      "AWS CloudTrail logs API activity, which is useful for forensic investigation of specific events. However, CloudTrail does not directly surface GuardDuty threat findings, Security Hub consolidated findings, or Config compliance status. Querying Athena for security incidents is an investigative tool, not a real-time SOC dashboard."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html", title: "Managing GuardDuty accounts with AWS Organizations" },
      { url: "https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-accounts-orgs.html", title: "Managing Security Hub with AWS Organizations" }
    ]
  },
  {
    id: 98,
    question: "A company's development team uses AWS CodePipeline with AWS CodeBuild for CI/CD. Each developer pushes code to an AWS CodeCommit repository, which triggers a pipeline that builds, tests, and deploys to a shared staging environment. The team is growing rapidly, and multiple developers frequently break the shared staging environment by pushing untested code, blocking the entire team.\n\nWhich solution should a solutions architect recommend to improve the development workflow?",
    options: [
      "Add a manual approval step in the pipeline before the staging deployment stage. Require a senior developer to review and approve each build before it is deployed to staging.",
      "Implement a feature branch strategy with per-branch pipeline triggers. Create an isolated environment for each feature branch. Merge to the main branch only after tests pass in the branch environment. Deploy to the shared staging environment only from the main branch.",
      "Increase the CodeBuild compute type to improve build speed, reducing the time branches are blocked waiting for builds.",
      "Configure the CodeCommit repository to require signed commits and GPG key verification before accepting pushes."
    ],
    correctAnswer: 1,
    category: "Deployment and Infrastructure as Code",
    explanation: "A feature branch strategy with per-branch isolated environments prevents untested code from reaching the shared staging environment. Each developer works in their own branch with their own ephemeral environment. Only code that has passed all tests in the branch environment is merged to main. The shared staging environment is only updated from the stable main branch, protecting team productivity.",
    optionExplanations: [
      "A manual approval step slows down the deployment pipeline and creates a bottleneck at the senior developer. It does not prevent broken code from being pushed or provide isolated testing environments. The root cause is shared environment contamination, not missing human approval.",
      "✓ Correct: Per-branch pipelines with isolated environments (e.g., separate CloudFormation stacks or namespaces per feature branch) allow each developer to test independently without affecting others. Feature flags or branch-based routing ensure only stable main branch code reaches shared staging. CodePipeline supports branch-based triggers. This is the standard GitFlow or trunk-based development pattern that prevents shared environment contamination.",
      "Faster builds reduce wait time but do not address the root cause — broken code reaching the shared staging environment. Even fast builds do not prevent a developer from pushing code that fails tests and deploying it to staging.",
      "GPG-signed commits verify developer identity but do not enforce code quality or test passage. A developer can still push broken code with a valid signature."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-trigger-source-repo-changes-console.html", title: "Create a pipeline in CodePipeline" },
      { url: "https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html", title: "Build specification reference for CodeBuild" }
    ]
  },
  {
    id: 99,
    question: "A company runs a web application that serves both static content (HTML, CSS, JS, images) and dynamic API responses. Currently, all traffic is handled by a fleet of EC2 instances behind an Application Load Balancer. The company wants to reduce costs and improve performance by offloading static content delivery from EC2 instances while keeping the dynamic API calls on EC2. The company does not want to change the domain name or URLs that users access.\n\nWhich architecture achieves these goals?",
    options: [
      "Migrate all content to Amazon S3 and configure S3 static website hosting. Update DNS to point the domain to the S3 website endpoint.",
      "Place Amazon CloudFront in front of the existing ALB. Configure two cache behaviors: one for the static content path patterns (e.g., /static/*, *.js, *.css) pointing to an S3 origin, and one for the API path patterns (e.g., /api/*) pointing to the ALB as the origin with caching disabled.",
      "Create a separate subdomain for static content (static.example.com) pointing to an S3 bucket. Update application code to reference the new subdomain for static assets.",
      "Deploy an additional ALB specifically for static content. Use Route 53 weighted routing to distribute 80% of traffic to the static ALB and 20% to the original ALB."
    ],
    correctAnswer: 1,
    category: "Content Delivery and Performance",
    explanation: "CloudFront with multiple cache behaviors allows path-based routing to different origins behind a single domain name and URL structure. Static content is served from S3 (low cost, high performance, cached at edge locations globally), while dynamic API requests are forwarded to the ALB (caching disabled) without any URL or domain changes. Users continue using the same domain name transparently.",
    optionExplanations: [
      "Migrating to S3 static website hosting removes the dynamic API capability. The EC2-based API layer cannot be served from S3. This would require splitting the domain or changing URLs, which violates the constraint.",
      "✓ Correct: CloudFront supports multiple cache behaviors on the same distribution, each with different path patterns and origins. The default behavior forwards all requests to the ALB. A specific behavior for /static/* or file extension patterns routes those requests to S3, serving content from CloudFront edge caches. API requests match the /api/* behavior and are forwarded to the ALB with caching disabled and appropriate headers passed through. The CloudFront distribution uses the existing domain name via a CNAME record, preserving all URLs.",
      "Creating a separate subdomain requires updating application code to reference the new domain for static assets and changes all static asset URLs. This violates the no-URL-change constraint.",
      "Weighted routing distributes entire requests to different ALBs — it cannot distinguish between static and dynamic requests based on path. This does not offload static content to S3 and still serves all content from EC2."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesCacheBehavior", title: "Cache behavior settings" },
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/add-origin-multiple.html", title: "Using multiple origins in CloudFront" }
    ]
  },
  {
    id: 100,
    question: "A company is conducting a Well-Architected Review of its production workload. The review identifies the following issues:\n1. There is no runbook or playbook for responding to operational incidents\n2. Manual processes are used to track and respond to CloudWatch alarms\n3. Post-incident analysis is not systematically performed\n4. Operational metrics are not consistently collected or reviewed\n\nWhich set of improvements most directly aligns with the AWS Well-Architected Operational Excellence pillar principles?",
    options: [
      "Enable AWS Shield Advanced, deploy AWS WAF rules, and activate Amazon GuardDuty to improve security posture across the workload.",
      "Create runbooks and playbooks in AWS Systems Manager as Automation documents. Configure CloudWatch alarms to automatically trigger SSM Automation runbooks for common incidents. Establish a post-incident review process using AWS CloudTrail and CloudWatch Logs Insights for root cause analysis.",
      "Migrate the workload to AWS Lambda and Amazon ECS to reduce operational overhead. Serverless architectures require less manual operational intervention.",
      "Implement multi-AZ deployments for all workload components and configure Auto Scaling to automatically respond to traffic increases, reducing the need for manual operational responses."
    ],
    correctAnswer: 1,
    category: "Deployment and Infrastructure as Code",
    explanation: "The Operational Excellence pillar's design principles include: performing operations as code, making frequent small reversible changes, refining operations procedures frequently, anticipating failure, and learning from operational events. Creating SSM Automation documents (operations as code), automating alarm responses (reducing manual processes), and establishing post-incident review processes (learning from events) directly address all four identified issues.",
    optionExplanations: [
      "AWS Shield Advanced, WAF, and GuardDuty address the Security pillar of the Well-Architected Framework, not the Operational Excellence pillar. The identified issues are about operational processes, not security controls.",
      "✓ Correct: SSM Automation documents implement 'operations as code' — runbooks and playbooks are version-controlled, automated procedures. CloudWatch alarm → SSM Automation integration automates responses to common incidents, eliminating manual processes. Post-incident review using CloudTrail and CloudWatch Logs Insights supports the principle of 'learning from operational events and failures.' This directly addresses all four identified issues under the Operational Excellence pillar.",
      "Migrating to serverless architectures reduces infrastructure management overhead (Reliability pillar benefit) but does not directly address the absence of runbooks, manual alarm handling, lack of post-incident review, or inconsistent metrics collection — all Operational Excellence concerns.",
      "Multi-AZ deployments and Auto Scaling improve reliability (Reliability pillar) by reducing single points of failure and handling traffic automatically. These are excellent reliability improvements but do not address the Operational Excellence issues of missing runbooks, manual processes, and absent post-incident review."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html", title: "Operational Excellence Pillar — AWS Well-Architected Framework" },
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html", title: "AWS Systems Manager Automation" }
    ]
  }
];
