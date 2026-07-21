// AWS Cloud Practitioner Practice Questions
const awsCLFQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT one of the six advantages of AWS Cloud?",
    options: [
      "Increase speed and agility",
      "Operating and maintaining data centers",
      "Go global in minutes",
      "Benefit from massive economies of scale"
    ],
    correctAnswer: 1,
    category: "Cloud Concepts",
    explanation: "The six advantages of AWS Cloud are: ① Trade fixed expense for variable expense, ② Benefit from massive economies of scale, ③ Stop guessing capacity, ④ Increase speed and agility, ⑤ Stop spending money running and maintaining data centers, ⑥ Go global in minutes. Running and maintaining data centers is an advantage because AWS eliminates that need — it is not an advantage itself.",
    optionExplanations: [
      "Increase speed and agility: This is one of the six advantages of AWS Cloud. New resources can be provisioned in minutes, making experimentation and innovation easier.",
      "Operating and maintaining data centers: ✓ Correct. This is something that becomes unnecessary — not an advantage in itself. Because AWS manages the infrastructure, customers no longer need to invest in running and maintaining data centers.",
      "Go global in minutes: This is one of the six advantages of AWS Cloud. Using AWS global infrastructure, you can rapidly deploy applications to multiple regions around the world.",
      "Benefit from massive economies of scale: This is one of the six advantages of AWS Cloud. The aggregated usage of hundreds of thousands of customers allows AWS to achieve lower pay-as-you-go prices."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html", title: "Six Advantages of Cloud Computing" }
    ]
  },
  {
    id: 2,
    question: "Which of the following is NOT one of the five pillars of the AWS Well-Architected Framework?",
    options: [
      "Cost Reduction",
      "Security",
      "Operational Excellence",
      "Performance Efficiency"
    ],
    correctAnswer: 0,
    category: "Cloud Concepts",
    explanation: "The five pillars of the AWS Well-Architected Framework are: ① Operational Excellence, ② Security, ③ Reliability, ④ Performance Efficiency, ⑤ Cost Optimization. The correct term is 'Cost Optimization,' not 'Cost Reduction.'",
    optionExplanations: [
      "Cost Reduction: ✓ Correct. The correct pillar is 'Cost Optimization.' It is not simply about cutting costs, but about running systems at the lowest cost while maximizing business value.",
      "Security: This is one of the five pillars of the Well-Architected Framework. It focuses on security best practices such as data protection, system protection, and privilege management.",
      "Operational Excellence: This is one of the five pillars of the Well-Architected Framework. It focuses on running and monitoring systems and continuously improving processes and procedures.",
      "Performance Efficiency: This is one of the five pillars of the Well-Architected Framework. It focuses on using computing resources efficiently and adapting to changes in demand and technology evolution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html", title: "AWS Well-Architected Framework" }
    ]
  },
  {
    id: 3,
    question: "Under the AWS Shared Responsibility Model, which of the following is AWS responsible for?",
    options: [
      "Physical security of data centers",
      "Encryption of customer data",
      "Management of IAM users",
      "Security patching of applications"
    ],
    correctAnswer: 0,
    category: "Cloud Concepts",
    explanation: "Under the Shared Responsibility Model, AWS is responsible for 'Security OF the Cloud' (physical infrastructure, hardware, network), while customers are responsible for 'Security IN the Cloud' (data, applications, IAM).",
    optionExplanations: [
      "Physical security of data centers: ✓ Correct. This is AWS's responsibility. Physical security of data centers, hardware, and network infrastructure — collectively 'Security OF the Cloud' — is managed by AWS.",
      "Encryption of customer data: This is the customer's responsibility. Protecting data through encryption, access control, and backups is managed by the customer.",
      "Management of IAM users: This is the customer's responsibility. Creating and managing IAM users, groups, roles, and policies is performed by the customer.",
      "Security patching of applications: This is the customer's responsibility. Applying OS and application patches on EC2 instances is managed by the customer (AWS manages this for managed services)."
    ],
    references: [
      { url: "https://aws.amazon.com/compliance/shared-responsibility-model/", title: "Shared Responsibility Model" }
    ]
  },
  {
    id: 4,
    question: "Which of the following services are available free for 12 months under the AWS Free Tier?",
    options: [
      "Amazon S3 (5 GB)",
      "All of the above",
      "Amazon RDS (750 hours/month)",
      "Amazon EC2 (t2.micro, 750 hours/month)"
    ],
    correctAnswer: 1,
    category: "Billing, Pricing, and Support",
    explanation: "The AWS Free Tier includes services free for 12 months (EC2 t2.micro, RDS, S3, etc.), always-free services (Lambda, DynamoDB), and short-term free trials.",
    optionExplanations: [
      "Amazon S3 (5 GB): This is one of the services available free for 12 months under the AWS Free Tier.",
      "All of the above: ✓ Correct. Amazon S3 (5 GB), Amazon RDS (750 hours/month), and Amazon EC2 t2.micro (750 hours/month) are all available free for 12 months under the AWS Free Tier.",
      "Amazon RDS (750 hours/month): This is one of the services available free for 12 months under the AWS Free Tier.",
      "Amazon EC2 (t2.micro, 750 hours/month): This is one of the services available free for 12 months under the AWS Free Tier."
    ],
    references: [
      { url: "https://aws.amazon.com/free/", title: "AWS Free Tier" }
    ]
  },
  {
    id: 5,
    question: "Which is the least expensive AWS Support plan that includes 24/7 phone, chat, and email support?",
    options: [
      "Business",
      "Developer",
      "Basic",
      "Enterprise"
    ],
    correctAnswer: 0,
    category: "Billing, Pricing, and Support",
    explanation: "The Business support plan is the least expensive plan that provides 24/7 phone, chat, and email support. The Basic plan is free but support is limited, and the Developer plan only offers email support during business hours.",
    optionExplanations: [
      "Business: ✓ Correct. The Business plan provides 24/7 phone, chat, and email support and is suited for production workloads. It is the least expensive plan with 24/7 support.",
      "Developer: Offers email support only during business hours (local time) and does not include phone support. Intended for development and test environments.",
      "Basic: The free plan that provides access to documentation, whitepapers, and support forums, but does not include technical support.",
      "Enterprise: In addition to 24/7 support, includes a dedicated Technical Account Manager (TAM). More expensive than Business, but intended for mission-critical workloads."
    ],
    references: [
      { url: "https://aws.amazon.com/premiumsupport/plans/", title: "AWS Support Plans" }
    ]
  },
  {
    id: 6,
    question: "What is the primary benefit of AWS Organizations?",
    options: [
      "Centralized management of multiple AWS accounts",
      "Automatic scaling of EC2 instances",
      "Database backup",
      "Monitoring network traffic"
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Organizations enables centralized management of multiple AWS accounts, providing consolidated billing, policy-based governance, and automated account creation.",
    optionExplanations: [
      "Centralized management of multiple AWS accounts: ✓ Correct. This is the primary function of AWS Organizations. It provides hierarchical management of multiple accounts, consolidated billing, and governance through Service Control Policies (SCPs).",
      "Automatic scaling of EC2 instances: This is a feature of Auto Scaling. AWS Organizations is an account management service and does not handle resource scaling.",
      "Database backup: This is a feature of database services such as RDS and DynamoDB. AWS Organizations does not provide backup functionality.",
      "Monitoring network traffic: This is a feature of VPC Flow Logs and CloudWatch. AWS Organizations is not a network monitoring service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html", title: "What is AWS Organizations" }
    ]
  },
  {
    id: 7,
    question: "What is the primary use of Amazon CloudWatch?",
    options: [
      "Cost management",
      "User authentication",
      "Database backup",
      "Resource monitoring and log management"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "CloudWatch is a monitoring service for AWS resources and applications that collects metrics, manages logs, and allows you to set alarms.",
    optionExplanations: [
      "Cost management: This is a feature of AWS Cost Explorer and Budgets. CloudWatch is a monitoring service.",
      "User authentication: This is a feature of IAM and Cognito. CloudWatch is a resource monitoring service.",
      "Database backup: This is a feature of RDS and DynamoDB. CloudWatch is dedicated to monitoring and log management.",
      "Resource monitoring and log management: ✓ Correct. CloudWatch is a comprehensive monitoring service that collects metrics from EC2, RDS, Lambda, and other services, centrally manages logs, and allows you to configure alarms."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html", title: "What is Amazon CloudWatch" }
    ]
  },
  {
    id: 8,
    question: "Which of the following is NOT a recommendation category provided by AWS Trusted Advisor?",
    options: [
      "Cost Optimization",
      "Security",
      "Fault Tolerance",
      "Data Migration"
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "Trusted Advisor provides recommendations across five categories: ① Cost Optimization, ② Performance, ③ Security, ④ Fault Tolerance, and ⑤ Service Limits.",
    optionExplanations: [
      "Cost Optimization: This is one of the five categories of Trusted Advisor. It identifies unused resources and optimization opportunities.",
      "Security: This is one of the five categories of Trusted Advisor. It identifies security gaps and provides recommendations.",
      "Fault Tolerance: This is one of the five categories of Trusted Advisor. It provides recommendations to improve system availability and redundancy.",
      "Data Migration: ✓ Correct. This is NOT one of the Trusted Advisor categories. Data migration is handled by separate services such as AWS Database Migration Service and the AWS Snow Family."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html", title: "AWS Trusted Advisor" }
    ]
  },
  {
    id: 9,
    question: "Which Amazon S3 storage class offers the lowest cost?",
    options: [
      "S3 Standard",
      "S3 Intelligent-Tiering",
      "S3 One Zone-IA",
      "S3 Glacier Deep Archive"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "S3 Glacier Deep Archive is the lowest-cost storage class, designed for long-term archiving. Data retrieval can take 12 hours or more.",
    optionExplanations: [
      "S3 Standard: The default storage class for frequently accessed data. It offers high durability and availability but is more expensive than archival tiers.",
      "S3 Intelligent-Tiering: Automatically moves objects between access tiers based on changing access patterns. Suitable when access patterns are unpredictable.",
      "S3 One Zone-IA: Lower-cost option for infrequently accessed data stored in a single Availability Zone. Less durable than Standard-IA.",
      "S3 Glacier Deep Archive: ✓ Correct. This is the lowest-cost storage class in Amazon S3, designed for long-term data archiving with retrieval times of 12 hours or more."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html", title: "Amazon S3 Storage Classes" }
    ]
  },
  {
    id: 10,
    question: "What is the primary function of AWS Cost Explorer?",
    options: [
      "Resource monitoring",
      "Visualizing and analyzing costs and usage",
      "Scanning for security vulnerabilities",
      "Optimizing database performance"
    ],
    correctAnswer: 1,
    category: "Billing, Pricing, and Support",
    explanation: "AWS Cost Explorer is a tool for visualizing and analyzing AWS spending and costs. You can review historical costs and forecast future costs.",
    optionExplanations: [
      "Resource monitoring: This is a feature of CloudWatch. Cost Explorer is dedicated to cost management.",
      "Visualizing and analyzing costs and usage: ✓ Correct. Cost Explorer provides an interactive interface to view, understand, and manage AWS costs and usage over time. It also offers cost forecasting.",
      "Scanning for security vulnerabilities: This is a feature of Amazon Inspector or AWS Security Hub. Cost Explorer is a cost management tool.",
      "Optimizing database performance: This is a feature of RDS Performance Insights or DynamoDB Accelerator (DAX). Cost Explorer is focused on cost analysis."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html", title: "What is AWS Cost Explorer" }
    ]
  },
  {
    id: 11,
    question: "Which Amazon EC2 instance type is best suited for general-purpose workloads?",
    options: [
      "R6i (Memory Optimized)",
      "C6i (Compute Optimized)",
      "T3/T4g (Burstable)",
      "P4 (Accelerated Computing)"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "T3/T4g instances provide burstable performance and are well-suited for general-purpose workloads such as web servers, development environments, and small databases.",
    optionExplanations: [
      "R6i (Memory Optimized): Optimized for workloads that require large amounts of memory, such as in-memory databases and big data processing.",
      "C6i (Compute Optimized): Optimized for compute-intensive workloads such as batch processing and scientific computing.",
      "T3/T4g (Burstable): ✓ Correct. Provides a balance of compute, memory, and network resources. Best suited for general-purpose workloads and offers high cost efficiency.",
      "P4 (Accelerated Computing): Equipped with GPUs and optimized for specialized workloads such as machine learning, HPC, and graphics processing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html", title: "Amazon EC2 Instance Types" }
    ]
  },
  {
    id: 12,
    question: "Which of the following management tasks is automatically performed by Amazon RDS?",
    options: [
      "Applying software patches",
      "Designing database schemas",
      "Optimizing SQL queries",
      "Debugging application code"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "Amazon RDS automates management tasks such as applying software patches, taking backups, detecting failures, and performing recovery.",
    optionExplanations: [
      "Applying software patches: ✓ Correct. RDS automatically applies patches to the database engine during a maintenance window.",
      "Designing database schemas: This is the customer's responsibility. Designing table structures, indexes, and relationships is performed by the customer.",
      "Optimizing SQL queries: This is the customer's responsibility. Query performance tuning is performed by application developers.",
      "Debugging application code: This is the customer's responsibility. RDS is a database management service and does not manage application code."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html", title: "What is Amazon RDS" }
    ]
  },
  {
    id: 13,
    question: "How is AWS Lambda priced?",
    options: [
      "Instance running time",
      "Data transfer volume only",
      "Storage capacity",
      "Number of requests and execution duration"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "AWS Lambda is charged based on the number of requests and execution duration (in GB-seconds). There is no charge when your code is not running.",
    optionExplanations: [
      "Instance running time: This is the EC2 pricing model. Lambda is serverless and has no concept of instances.",
      "Data transfer volume only: Data transfer charges apply separately, but this is not the only cost. The primary billing dimensions are the number of requests and execution duration.",
      "Storage capacity: This is the pricing model for S3 and EBS. Lambda code storage is free within certain limits.",
      "Number of requests and execution duration: ✓ Correct. Lambda charges are based on the number of times a function is invoked and the execution duration (measured in milliseconds, scaled by the memory allocation)."
    ],
    references: [
      { url: "https://aws.amazon.com/lambda/pricing/", title: "AWS Lambda Pricing" }
    ]
  },
  {
    id: 14,
    question: "In Amazon VPC, which option enables secure access from the internet to instances in a private subnet?",
    options: [
      "Internet Gateway",
      "NAT Gateway",
      "VPC Peering",
      "Bastion Host"
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "A Bastion Host (jump server) is placed in a public subnet and provides secure access to instances in a private subnet.",
    optionExplanations: [
      "Internet Gateway: Enables communication between a VPC and the internet, but does not provide direct access to resources in a private subnet.",
      "NAT Gateway: Allows outbound internet traffic from instances in a private subnet, but does not permit inbound access from the internet.",
      "VPC Peering: Enables private communication between two VPCs, but is not used for internet access.",
      "Bastion Host: ✓ Correct. A jump server placed in a public subnet that allows secure SSH/RDP access to instances in a private subnet."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html", title: "What is Amazon VPC" }
    ]
  },
  {
    id: 15,
    question: "Which of the following is NOT an AWS IAM best practice?",
    options: [
      "Using the root user for everyday tasks",
      "Enabling multi-factor authentication (MFA)",
      "Applying the principle of least privilege",
      "Using IAM roles"
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "Because the root user has the most powerful permissions, it should not be used for everyday tasks. It should only be used for initial setup and account management.",
    optionExplanations: [
      "Using the root user for everyday tasks: ✓ Correct. This is AGAINST best practices. The root user should only be used during initial setup; IAM users should be used for day-to-day operations.",
      "Enabling multi-factor authentication (MFA): This is an IAM best practice. MFA should always be enabled, especially for the root user and privileged users.",
      "Applying the principle of least privilege: This is an IAM best practice. Users should be granted only the minimum permissions necessary to perform their tasks.",
      "Using IAM roles: This is an IAM best practice. IAM roles should be used for EC2 instances and Lambda functions instead of access keys."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html", title: "IAM Best Practices" }
    ]
  },
  {
    id: 16,
    question: "Which of the following is NOT a data protection feature of Amazon S3?",
    options: [
      "Versioning",
      "Automatic data compression",
      "Cross-Region Replication",
      "Object Lock"
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "Amazon S3 provides data protection features such as versioning, replication, and Object Lock, but it does not offer automatic data compression.",
    optionExplanations: [
      "Versioning: This is an S3 data protection feature. It retains multiple versions of an object, protecting against accidental deletion or overwrite.",
      "Automatic data compression: ✓ Correct. S3 does not provide automatic data compression. If compression is needed, it must be performed client-side before uploading.",
      "Cross-Region Replication: This is an S3 data protection feature. It automatically replicates data to another region, strengthening disaster recovery.",
      "Object Lock: This is an S3 data protection feature. It protects objects using a WORM (Write Once Read Many) model, preventing deletion or modification."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html", title: "What is Amazon S3" }
    ]
  },
  {
    id: 17,
    question: "What is the primary benefit of AWS CloudFormation?",
    options: [
      "Automated cost reduction",
      "Database backup",
      "Monitoring network traffic",
      "Infrastructure as Code"
    ],
    correctAnswer: 3,
    category: "Cloud Concepts",
    explanation: "CloudFormation enables Infrastructure as Code (IaC), allowing you to define and manage AWS resources using templates.",
    optionExplanations: [
      "Automated cost reduction: This is a feature of Cost Explorer and Budgets. CloudFormation is not a cost management tool (though efficient resource management can contribute to cost savings).",
      "Database backup: This is a feature of RDS and DynamoDB. CloudFormation is an infrastructure provisioning service.",
      "Monitoring network traffic: This is a feature of VPC Flow Logs and CloudWatch. CloudFormation is not a monitoring service.",
      "Infrastructure as Code: ✓ Correct. CloudFormation lets you define infrastructure in JSON or YAML templates, enabling version control, reuse, and automation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html", title: "What is AWS CloudFormation" }
    ]
  },
  {
    id: 18,
    question: "What is the primary use of Amazon CloudFront?",
    options: [
      "Database replication",
      "Accelerating content delivery",
      "Server backup",
      "User authentication"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "CloudFront is a CDN (Content Delivery Network) service that delivers content using a global network of edge locations.",
    optionExplanations: [
      "Database replication: This is a feature of RDS and DynamoDB Global Tables. CloudFront is a CDN service.",
      "Accelerating content delivery: ✓ Correct. CloudFront caches content at edge locations around the world and delivers it to users with low latency.",
      "Server backup: This is a feature of AWS Backup and EBS Snapshots. CloudFront is not a backup service.",
      "User authentication: This is a feature of IAM and Cognito. CloudFront is dedicated to content delivery."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html", title: "What is Amazon CloudFront" }
    ]
  },
  {
    id: 19,
    question: "What is the primary benefit of AWS Elastic Beanstalk?",
    options: [
      "Automated cost reduction",
      "Database performance optimization",
      "Enhanced network security",
      "Simplified application deployment and management"
    ],
    correctAnswer: 3,
    category: "Cloud Concepts",
    explanation: "Elastic Beanstalk automates application deployment, scaling, and monitoring, reducing the complexity of infrastructure management.",
    optionExplanations: [
      "Automated cost reduction: This is a feature of Cost Explorer and Savings Plans. Elastic Beanstalk simplifies operations (which can indirectly contribute to cost savings).",
      "Database performance optimization: This is a feature of RDS Performance Insights and DynamoDB Accelerator (DAX). Elastic Beanstalk is an application deployment service.",
      "Enhanced network security: This is a feature of Security Groups and Network ACLs. Elastic Beanstalk focuses on simplifying deployment.",
      "Simplified application deployment and management: ✓ Correct. With Elastic Beanstalk, you simply upload your code and it automatically handles capacity provisioning, load balancing, auto-scaling, and health monitoring."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html", title: "What is AWS Elastic Beanstalk" }
    ]
  },
  {
    id: 20,
    question: "What is the primary characteristic of Amazon DynamoDB?",
    options: [
      "NoSQL database",
      "Relational database",
      "Data warehouse",
      "In-memory cache"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "DynamoDB is a fully managed NoSQL database service that delivers fast, predictable performance with seamless scalability.",
    optionExplanations: [
      "NoSQL database: ✓ Correct. DynamoDB is a NoSQL database that supports key-value and document data models, delivering single-digit millisecond latency at any scale.",
      "Relational database: This describes RDS and Aurora. DynamoDB is a NoSQL database.",
      "Data warehouse: This describes Amazon Redshift. DynamoDB is optimized for transactional workloads.",
      "In-memory cache: This describes ElastiCache. DynamoDB is a persistent data store (caching can be added with DAX)."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html", title: "What is Amazon DynamoDB" }
    ]
  },
  {
    id: 21,
    question: "What type of protection does AWS Shield provide?",
    options: [
      "Database encryption",
      "Protection against DDoS attacks",
      "Virus scanning",
      "Data backup"
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "AWS Shield is a managed service that protects applications running on AWS from DDoS (Distributed Denial of Service) attacks.",
    optionExplanations: [
      "Database encryption: This is an encryption feature of RDS and DynamoDB. Shield is a network-layer protection service.",
      "Protection against DDoS attacks: ✓ Correct. AWS Shield detects and automatically mitigates DDoS attacks. It is available in two tiers: Standard and Advanced.",
      "Virus scanning: This is a feature of third-party security software. Shield is dedicated to DDoS protection.",
      "Data backup: This is a feature of AWS Backup and EBS Snapshots. Shield provides protection against network-based attacks."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html", title: "AWS Shield" }
    ]
  },
  {
    id: 22,
    question: "What is the primary function of Amazon Route 53?",
    options: [
      "Content delivery",
      "DNS service",
      "Load balancing",
      "Database management"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "Route 53 is a highly available and scalable DNS (Domain Name System) web service that translates domain names into IP addresses.",
    optionExplanations: [
      "Content delivery: This is a feature of CloudFront. Route 53 is a DNS service.",
      "DNS service: ✓ Correct. Route 53 is a highly available DNS service providing domain registration, DNS routing, and health checking.",
      "Load balancing: This is a feature of ELB (Elastic Load Balancing). Route 53 provides DNS-level traffic management.",
      "Database management: This is a feature of RDS and DynamoDB. Route 53 is a DNS service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html", title: "What is Amazon Route 53" }
    ]
  },
  {
    id: 23,
    question: "What is the primary use of AWS Systems Manager?",
    options: [
      "Database backup",
      "Cost analysis",
      "Operational management of EC2 instances",
      "Network design"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "Systems Manager provides visibility and control of AWS resources, simplifying operational tasks such as patch management, configuration management, and automation.",
    optionExplanations: [
      "Database backup: This is a feature of RDS and AWS Backup. Systems Manager is an operational management tool.",
      "Cost analysis: This is a feature of Cost Explorer and Budgets. Systems Manager focuses on operational management.",
      "Operational management of EC2 instances: ✓ Correct. Systems Manager integrates patch management, configuration management, remote command execution, and Parameter Store to centrally manage EC2 and on-premises servers.",
      "Network design: This is a feature of VPC and Transit Gateway. Systems Manager is a resource management tool."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html", title: "What is AWS Systems Manager" }
    ]
  },
  {
    id: 24,
    question: "Where are Amazon EBS snapshots stored?",
    options: [
      "EC2 instance local storage",
      "Amazon S3",
      "Amazon Glacier",
      "Amazon EFS"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "EBS snapshots are automatically stored in Amazon S3, providing high durability and redundancy within the region.",
    optionExplanations: [
      "EC2 instance local storage: Instance store is temporary storage. Snapshots are stored in the persistent S3 service.",
      "Amazon S3: ✓ Correct. EBS snapshots are automatically stored in S3, providing 99.999999999% (eleven nines) durability. Users do not need to manage S3 buckets directly.",
      "Amazon Glacier: This is a long-term archival storage service. Snapshots are stored in S3 (they can be transitioned to Glacier via lifecycle policies).",
      "Amazon EFS: This is a file storage service. EBS snapshots are stored in S3."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSSnapshots.html", title: "Amazon EBS Snapshots" }
    ]
  },
  {
    id: 25,
    question: "What is the primary use of AWS Key Management Service (KMS)?",
    options: [
      "User authentication",
      "Managing encryption keys",
      "Monitoring network traffic",
      "Cost optimization"
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "AWS KMS simplifies the creation and management of encryption keys, enabling you to control data encryption across AWS services and applications.",
    optionExplanations: [
      "User authentication: This is a feature of IAM and Cognito. KMS is an encryption key management service.",
      "Managing encryption keys: ✓ Correct. KMS manages the creation, rotation, disabling, and deletion of encryption keys, and provides audit logs of key usage. It uses FIPS 140-2 validated hardware security modules (HSMs).",
      "Monitoring network traffic: This is a feature of VPC Flow Logs and CloudWatch. KMS is dedicated to encryption.",
      "Cost optimization: This is a feature of Cost Explorer and Trusted Advisor. KMS is a security service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/overview.html", title: "What is AWS Key Management Service" }
    ]
  },
  {
    id: 26,
    question: "What is the primary use of Amazon SNS (Simple Notification Service)?",
    options: [
      "Database replication",
      "Managing computing resources",
      "File storage",
      "Message delivery"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "Amazon SNS is a pub/sub (publish/subscribe) messaging service that enables communication between applications, and between applications and users.",
    optionExplanations: [
      "Database replication: This is a feature of RDS and DynamoDB Global Tables. SNS is a messaging service.",
      "Managing computing resources: This is a feature of EC2 and Auto Scaling. SNS is a notification service.",
      "File storage: This is a feature of S3 and EFS. SNS is dedicated to message delivery.",
      "Message delivery: ✓ Correct. SNS publishes messages to a topic and delivers them to multiple subscribers (Lambda, SQS, HTTP, Email, SMS, etc.)."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sns/latest/dg/welcome.html", title: "What is Amazon SNS" }
    ]
  },
  {
    id: 27,
    question: "What is the primary characteristic of Amazon SQS (Simple Queue Service)?",
    options: [
      "Message queuing",
      "Real-time streaming",
      "Data warehouse",
      "Content delivery"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "Amazon SQS is a fully managed message queuing service that enables sending and receiving messages between components of distributed systems.",
    optionExplanations: [
      "Message queuing: ✓ Correct. SQS temporarily stores messages and enables asynchronous processing. It offers two queue types: Standard and FIFO.",
      "Real-time streaming: This is a feature of Amazon Kinesis. SQS is a message queuing service.",
      "Data warehouse: This is a feature of Amazon Redshift. SQS is a messaging service.",
      "Content delivery: This is a feature of CloudFront. SQS is used for inter-application communication."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html", title: "What is Amazon SQS" }
    ]
  },
  {
    id: 28,
    question: "What is the primary benefit of AWS Direct Connect?",
    options: [
      "Encrypted communication over the internet",
      "Stable communication via a dedicated network connection",
      "Serverless architecture",
      "Automatic scaling"
    ],
    correctAnswer: 1,
    category: "Cloud Concepts",
    explanation: "AWS Direct Connect establishes a dedicated network connection between an on-premises environment and AWS, providing more consistent network performance.",
    optionExplanations: [
      "Encrypted communication over the internet: This describes VPN. Direct Connect provides a dedicated line connection.",
      "Stable communication via a dedicated network connection: ✓ Correct. Direct Connect connects to AWS over a dedicated physical connection without going through the internet, delivering consistent bandwidth, low latency, and improved security.",
      "Serverless architecture: This describes Lambda and Fargate. Direct Connect is a network connectivity service.",
      "Automatic scaling: This describes Auto Scaling and Lambda. Direct Connect provides a fixed-bandwidth dedicated connection."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html", title: "What is AWS Direct Connect" }
    ]
  },
  {
    id: 29,
    question: "Which cache engines does Amazon ElastiCache support?",
    options: [
      "Redis and Memcached",
      "MySQL and PostgreSQL",
      "MongoDB and Cassandra",
      "Oracle and SQL Server"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "Amazon ElastiCache supports two open-source in-memory cache engines: Redis and Memcached.",
    optionExplanations: [
      "Redis and Memcached: ✓ Correct. ElastiCache provides Redis and Memcached as fully managed services, improving the performance of databases and applications.",
      "MySQL and PostgreSQL: These are relational database engines supported by RDS. ElastiCache is a cache engine service.",
      "MongoDB and Cassandra: These are NoSQL databases. ElastiCache is dedicated to in-memory caching.",
      "Oracle and SQL Server: These are commercial database engines supported by RDS. ElastiCache is a caching service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html", title: "What is Amazon ElastiCache" }
    ]
  },
  {
    id: 30,
    question: "What is the primary use of AWS Config?",
    options: [
      "Cost management",
      "Database backup",
      "Recording and evaluating resource configurations",
      "Monitoring network traffic"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "AWS Config is a service that continuously records AWS resource configurations and evaluates them against compliance rules.",
    optionExplanations: [
      "Cost management: This is a feature of Cost Explorer and Budgets. Config is a configuration management service.",
      "Database backup: This is a feature of RDS and AWS Backup. Config focuses on configuration auditing and compliance.",
      "Recording and evaluating resource configurations: ✓ Correct. AWS Config records configuration changes to resources, tracks configuration history, and automatically evaluates configurations against compliance rules.",
      "Monitoring network traffic: This is a feature of VPC Flow Logs and CloudWatch. Config tracks changes to resource configurations."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html", title: "What is AWS Config" }
    ]
  },
  {
    id: 31,
    question: "What is the primary use of Amazon Redshift?",
    options: [
      "Data warehouse",
      "NoSQL database",
      "In-memory cache",
      "Object storage"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "Amazon Redshift is a petabyte-scale data warehouse service optimized for large-scale data analytics.",
    optionExplanations: [
      "Data warehouse: ✓ Correct. Redshift uses columnar storage and parallel processing to run complex queries against large datasets at high speed.",
      "NoSQL database: This describes DynamoDB and DocumentDB. Redshift is a relational data warehouse.",
      "In-memory cache: This describes ElastiCache. Redshift is an analytics data warehouse.",
      "Object storage: This describes S3. Redshift is specialized for analyzing structured data."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html", title: "What is Amazon Redshift" }
    ]
  },
  {
    id: 32,
    question: "What is the primary use of AWS Artifact?",
    options: [
      "Network monitoring",
      "Application deployment",
      "Database management",
      "Access to compliance reports"
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "AWS Artifact provides on-demand access to AWS security and compliance reports and select online agreements.",
    optionExplanations: [
      "Network monitoring: This is a feature of CloudWatch and VPC Flow Logs. Artifact is a compliance document service.",
      "Application deployment: This is a feature of Elastic Beanstalk and CodeDeploy. Artifact is a compliance document delivery service.",
      "Database management: This is a feature of RDS and DynamoDB. Artifact provides access to audit reports.",
      "Access to compliance reports: ✓ Correct. AWS Artifact allows you to download compliance reports such as SOC, PCI, and ISO certifications, supporting audits and regulatory requirements."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html", title: "What is AWS Artifact" }
    ]
  },
  {
    id: 33,
    question: "What is the primary characteristic of Amazon Athena?",
    options: [
      "NoSQL database",
      "Data warehouse",
      "Real-time streaming",
      "Serverless query service for data in S3"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "Amazon Athena is a serverless interactive query service that lets you analyze data stored directly in Amazon S3 using standard SQL.",
    optionExplanations: [
      "NoSQL database: This describes DynamoDB. Athena is an SQL query service for data in S3.",
      "Data warehouse: This describes Redshift. Athena queries data directly in S3.",
      "Real-time streaming: This describes Kinesis. Athena is suited for batch queries.",
      "Serverless query service for data in S3: ✓ Correct. Athena requires no infrastructure management and lets you run standard SQL queries against data stored in S3. You are charged only for the queries you run."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html", title: "What is Amazon Athena" }
    ]
  },
  {
    id: 34,
    question: "What is the primary function of AWS Budgets?",
    options: [
      "Resource monitoring",
      "Analyzing network traffic",
      "Database backup",
      "Setting cost budgets and alerts"
    ],
    correctAnswer: 3,
    category: "Billing, Pricing, and Support",
    explanation: "AWS Budgets lets you set custom cost and usage budgets and receive alerts when your spending exceeds the budget threshold.",
    optionExplanations: [
      "Resource monitoring: This is a feature of CloudWatch. Budgets is dedicated to cost management.",
      "Analyzing network traffic: This is a feature of VPC Flow Logs and CloudWatch. Budgets is a cost management service.",
      "Database backup: This is a feature of RDS and AWS Backup. Budgets is a budget management tool.",
      "Setting cost budgets and alerts: ✓ Correct. Budgets lets you set monthly, quarterly, or annual budgets and sends alerts via SNS when actual or forecasted costs exceed the threshold."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html", title: "AWS Budgets" }
    ]
  },
  {
    id: 35,
    question: "What is the primary use of Amazon Cognito?",
    options: [
      "Database management",
      "Content delivery",
      "User authentication and access control",
      "Network monitoring"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "Amazon Cognito is a service that adds user sign-up, sign-in, and access control capabilities to web and mobile applications.",
    optionExplanations: [
      "Database management: This is a feature of RDS and DynamoDB. Cognito is an authentication service.",
      "Content delivery: This is a feature of CloudFront. Cognito is a user management service.",
      "User authentication and access control: ✓ Correct. Cognito provides user pools (authentication) and identity pools (authorization), and supports integration with social identity providers such as Google and Facebook.",
      "Network monitoring: This is a feature of CloudWatch and VPC Flow Logs. Cognito is an authentication and authorization service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html", title: "What is Amazon Cognito" }
    ]
  },
  {
    id: 36,
    question: "What is the primary benefit of AWS Global Accelerator?",
    options: [
      "Improved application availability and performance using the global network",
      "Database replication",
      "Serverless computing",
      "Data archiving"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "AWS Global Accelerator uses the AWS global network to improve the availability and performance of applications.",
    optionExplanations: [
      "Improved application availability and performance using the global network: ✓ Correct. Global Accelerator provides static IP addresses and routes traffic through the AWS global network, reducing latency.",
      "Database replication: This is a feature of RDS and DynamoDB Global Tables. Global Accelerator is a network optimization service.",
      "Serverless computing: This describes AWS Lambda. Global Accelerator is a network service.",
      "Data archiving: This is a feature of S3 Glacier and S3 Glacier Deep Archive. Global Accelerator is a traffic management service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html", title: "What is AWS Global Accelerator" }
    ]
  },
  {
    id: 37,
    question: "What is the primary use of Amazon Kinesis Data Streams?",
    options: [
      "Batch data processing",
      "Object storage",
      "Data warehouse",
      "Real-time data streaming"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "Amazon Kinesis Data Streams is a service for collecting, processing, and analyzing streaming data in real time.",
    optionExplanations: [
      "Batch data processing: This is a feature of EMR and Glue. Kinesis is dedicated to real-time streaming.",
      "Object storage: This is a feature of S3. Kinesis is a service for processing real-time data streams.",
      "Data warehouse: This is a feature of Redshift. Kinesis is used for processing streaming data.",
      "Real-time data streaming: ✓ Correct. Kinesis Data Streams can ingest and process streaming data such as logs, IoT data, and clickstreams in real time."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/streams/latest/dev/introduction.html", title: "What is Amazon Kinesis Data Streams" }
    ]
  },
  {
    id: 38,
    question: "What is the primary function of AWS Personal Health Dashboard?",
    options: [
      "Notifications about AWS service health and events",
      "Cost analysis",
      "Database performance monitoring",
      "Network traffic analysis"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "AWS Personal Health Dashboard provides personalized information and alerts about AWS service events and planned maintenance activities.",
    optionExplanations: [
      "Notifications about AWS service health and events: ✓ Correct. Personal Health Dashboard provides proactive notifications about events (outages, maintenance, etc.) that may affect your AWS resources.",
      "Cost analysis: This is a feature of Cost Explorer and Budgets. Personal Health Dashboard is a service health notification service.",
      "Database performance monitoring: This is a feature of RDS Performance Insights and CloudWatch. Personal Health Dashboard is dedicated to service event notifications.",
      "Network traffic analysis: This is a feature of VPC Flow Logs and CloudWatch. Personal Health Dashboard is a service health visibility tool."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html", title: "What is AWS Health" }
    ]
  },
  {
    id: 39,
    question: "What is the primary characteristic of Amazon EFS?",
    options: [
      "Block storage",
      "File storage",
      "Object storage",
      "Data warehouse"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "Amazon EFS (Elastic File System) is a fully managed file storage service that can be accessed simultaneously by multiple EC2 instances.",
    optionExplanations: [
      "Block storage: This describes EBS. EFS provides a file system.",
      "File storage: ✓ Correct. EFS uses the NFSv4 protocol and provides a shared file system that can be mounted concurrently by multiple EC2 instances. It scales automatically.",
      "Object storage: This describes S3. EFS is file storage using the NFS protocol.",
      "Data warehouse: This describes Redshift. EFS is a file sharing service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html", title: "What is Amazon EFS" }
    ]
  },
  {
    id: 40,
    question: "What is the primary use of AWS Service Catalog?",
    options: [
      "Cost management",
      "Network monitoring",
      "Database backup",
      "Managing a catalog of approved IT services"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "AWS Service Catalog allows organizations to create and manage catalogs of approved IT services, enabling self-service while maintaining governance and compliance.",
    optionExplanations: [
      "Cost management: This is a feature of Cost Explorer and Budgets. Service Catalog is a service catalog management tool.",
      "Network monitoring: This is a feature of CloudWatch and VPC Flow Logs. Service Catalog is a governance tool.",
      "Database backup: This is a feature of RDS and AWS Backup. Service Catalog is a service provisioning management tool.",
      "Managing a catalog of approved IT services: ✓ Correct. Service Catalog publishes CloudFormation templates as products, allowing end users to deploy only approved resources."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html", title: "What is AWS Service Catalog" }
    ]
  },
  {
    id: 41,
    question: "What is the primary use of Amazon CloudFront?",
    options: [
      "Database replication",
      "Serverless computing",
      "Content Delivery Network (CDN)",
      "Block storage"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "Amazon CloudFront is a CDN service that delivers content with low latency using AWS's global network of edge locations.",
    optionExplanations: [
      "Database replication: This is a feature of RDS and DynamoDB Global Tables. CloudFront is a content delivery service.",
      "Serverless computing: This is a feature of AWS Lambda. CloudFront is dedicated to content delivery.",
      "Content Delivery Network (CDN): ✓ Correct. CloudFront delivers static and dynamic content at high speed through edge locations around the world.",
      "Block storage: This is a feature of Amazon EBS. CloudFront performs content caching and delivery."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html", title: "What is Amazon CloudFront" }
    ]
  },
  {
    id: 42,
    question: "What is the primary benefit of AWS Organizations?",
    options: [
      "Automated database backup",
      "Centralized management of multiple AWS accounts",
      "Application deployment",
      "Monitoring network traffic"
    ],
    correctAnswer: 1,
    category: "Security and Compliance",
    explanation: "AWS Organizations provides centralized management of multiple AWS accounts by organizational unit, enabling consolidated billing, policy enforcement, and resource sharing.",
    optionExplanations: [
      "Automated database backup: This is a feature of AWS Backup and RDS. Organizations is an account management tool.",
      "Centralized management of multiple AWS accounts: ✓ Correct. Organizations provides hierarchical management of multiple accounts, consolidated billing, and governance through Service Control Policies (SCPs).",
      "Application deployment: This is a feature of CodeDeploy and Elastic Beanstalk. Organizations focuses on managing account structure.",
      "Monitoring network traffic: This is a feature of VPC Flow Logs and CloudWatch. Organizations is an organization-level governance tool."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html", title: "What is AWS Organizations" }
    ]
  },
  {
    id: 43,
    question: "What is the primary function of Amazon Route 53?",
    options: [
      "Content delivery",
      "Database management",
      "DNS web service",
      "File storage"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "Amazon Route 53 is a highly available and scalable DNS web service that translates domain names into IP addresses and manages traffic routing.",
    optionExplanations: [
      "Content delivery: This is a feature of CloudFront. Route 53 is a DNS service, though it can work with CloudFront.",
      "Database management: This is a feature of RDS and DynamoDB. Route 53 is dedicated to DNS and traffic routing.",
      "DNS web service: ✓ Correct. Route 53 provides domain registration, DNS routing, and health checking, enabling highly available traffic management.",
      "File storage: This is a feature of S3 and EFS. Route 53 is a network routing service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html", title: "What is Amazon Route 53" }
    ]
  },
  {
    id: 44,
    question: "Which of the following is NOT a recommendation category provided by AWS Trusted Advisor?",
    options: [
      "Cost Optimization",
      "Security",
      "Application Development",
      "Performance"
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "AWS Trusted Advisor provides recommendations across five categories: Cost Optimization, Security, Fault Tolerance, Performance, and Service Limits.",
    optionExplanations: [
      "Cost Optimization: This is one of the main Trusted Advisor categories. It identifies unused resources and optimization opportunities.",
      "Security: This is one of the main Trusted Advisor categories. It detects security gaps and configuration issues.",
      "Application Development: ✓ Correct. This is NOT a Trusted Advisor category. Trusted Advisor focuses on infrastructure optimization.",
      "Performance: This is one of the main Trusted Advisor categories. It suggests opportunities to improve resource performance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html", title: "AWS Trusted Advisor" }
    ]
  },
  {
    id: 45,
    question: "What is the primary use of Amazon Glacier?",
    options: [
      "Real-time data processing",
      "Content delivery",
      "High-speed database",
      "Long-term archival storage"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "Amazon Glacier (now S3 Glacier) is a low-cost storage service optimized for long-term data archiving and backup.",
    optionExplanations: [
      "Real-time data processing: This describes Kinesis and Lambda. Glacier is designed for infrequently accessed archives.",
      "Content delivery: This describes CloudFront. Glacier is dedicated to archival storage.",
      "High-speed database: This describes DynamoDB and RDS. Glacier is for data that does not require immediate access.",
      "Long-term archival storage: ✓ Correct. S3 Glacier is ideal for long-term retention of rarely accessed data. Retrieval takes minutes to hours, but costs are very low."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazonglacier/latest/dev/introduction.html", title: "What is Amazon S3 Glacier" }
    ]
  },
  {
    id: 46,
    question: "What is the primary function of AWS CloudTrail?",
    options: [
      "Recording and auditing API calls",
      "Cost management",
      "Database backup",
      "Load balancing"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "AWS CloudTrail records all API calls made within an AWS account, supporting governance, compliance, operational auditing, and risk auditing.",
    optionExplanations: [
      "Recording and auditing API calls: ✓ Correct. CloudTrail records who made an API call, when, and on which AWS resource, enabling security analysis and troubleshooting.",
      "Cost management: This is a feature of Cost Explorer and Budgets. CloudTrail is an activity logging service.",
      "Database backup: This is a feature of RDS and AWS Backup. CloudTrail is dedicated to activity tracking.",
      "Load balancing: This is a feature of ELB. CloudTrail is an audit log service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html", title: "What is AWS CloudTrail" }
    ]
  },
  {
    id: 47,
    question: "In Amazon VPC subnets, where should you place resources that need to be accessible from the internet?",
    options: [
      "Private subnet",
      "Public subnet",
      "Database subnet",
      "Management subnet"
    ],
    correctAnswer: 1,
    category: "Cloud Concepts",
    explanation: "A public subnet has a route to an Internet Gateway and is where you place resources (such as web servers) that need to be directly accessible from the internet.",
    optionExplanations: [
      "Private subnet: Has no direct route to an Internet Gateway; outbound internet communication is only possible via a NAT Gateway. Suitable for databases and application servers.",
      "Public subnet: ✓ Correct. Has a route to an Internet Gateway, allowing resources with public IP addresses to communicate directly with the internet.",
      "Database subnet: Databases are typically placed in private subnets and should not be directly accessible from the internet.",
      "Management subnet: For security reasons, management resources are typically placed in private subnets and accessed via VPN or Direct Connect."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html", title: "Subnets for your VPC" }
    ]
  },
  {
    id: 48,
    question: "What is the primary use of AWS Config?",
    options: [
      "Application deployment",
      "Database management",
      "Recording and evaluating resource configurations",
      "Network load balancing"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "AWS Config continuously records and evaluates AWS resource configurations, supporting compliance auditing, security analysis, and change management.",
    optionExplanations: [
      "Application deployment: This is a feature of CodeDeploy and Elastic Beanstalk. Config is a configuration management tool.",
      "Database management: This is a feature of RDS and DynamoDB. Config is dedicated to tracking resource configurations.",
      "Recording and evaluating resource configurations: ✓ Correct. Config records the configuration history of resources and uses Config Rules to evaluate conformance against desired configurations.",
      "Network load balancing: This is a feature of ELB. Config is a compliance and configuration management service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html", title: "What is AWS Config" }
    ]
  },
  {
    id: 49,
    question: "What is the primary function of Amazon SNS (Simple Notification Service)?",
    options: [
      "Database replication",
      "Pub/Sub messaging",
      "File storage",
      "Content delivery"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "Amazon SNS is a fully managed Pub/Sub messaging service for application-to-application (A2A) and application-to-person (A2P) communication.",
    optionExplanations: [
      "Database replication: This is a feature of RDS and DynamoDB. SNS is a message delivery service.",
      "Pub/Sub messaging: ✓ Correct. SNS delivers messages through topics to multiple subscribers (Lambda, SQS, HTTP, Email, SMS, etc.).",
      "File storage: This is a feature of S3 and EFS. SNS is dedicated to notifications and message delivery.",
      "Content delivery: This is a feature of CloudFront. SNS is an event-driven notification service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sns/latest/dg/welcome.html", title: "What is Amazon SNS" }
    ]
  },
  {
    id: 50,
    question: "Which of the following is NOT a primary feature of AWS Systems Manager?",
    options: [
      "Patch management",
      "Parameter Store",
      "Database query optimization",
      "Run Command"
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "AWS Systems Manager automates operational management of AWS resources, providing features such as patch management, configuration management, and command execution.",
    optionExplanations: [
      "Patch management: This is one of the main features of Systems Manager. Patch Manager automates the patching of EC2 instances and on-premises servers.",
      "Parameter Store: This is one of the main features of Systems Manager. It provides secure storage and management of configuration data and secrets.",
      "Database query optimization: ✓ Correct. This is a feature of RDS Performance Insights and Database Migration Service. Systems Manager focuses on infrastructure management.",
      "Run Command: This is one of the main features of Systems Manager. It allows remote execution of commands across multiple instances."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html", title: "What is AWS Systems Manager" }
    ]
  },
  {
    id: 51,
    question: "What is the primary benefit of AWS Direct Connect?",
    options: [
      "Encrypted communication over the internet",
      "Database backup",
      "Running serverless applications",
      "Stable bandwidth via a dedicated network connection"
    ],
    correctAnswer: 3,
    category: "Cloud Concepts",
    explanation: "AWS Direct Connect links an on-premises environment to AWS over a dedicated network connection, delivering stable bandwidth and low latency without going through the internet.",
    optionExplanations: [
      "Encrypted communication over the internet: This describes VPN. Direct Connect provides a dedicated line connection.",
      "Database backup: This is a feature of AWS Backup and RDS. Direct Connect provides a dedicated network connection.",
      "Running serverless applications: This is a feature of Lambda. Direct Connect is a network connectivity service.",
      "Stable bandwidth via a dedicated network connection: ✓ Correct. Direct Connect connects your data center to AWS over a dedicated line, providing consistent network performance and security."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html", title: "What is AWS Direct Connect" }
    ]
  },
  {
    id: 52,
    question: "What is the primary use of Amazon Kinesis Data Streams?",
    options: [
      "Static website hosting",
      "Long-term data archiving",
      "Processing real-time streaming data",
      "DNS routing"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "Amazon Kinesis Data Streams is a fully managed service for collecting and processing streaming data in real time.",
    optionExplanations: [
      "Static website hosting: This is a feature of S3 and Amplify. Kinesis is dedicated to streaming data processing.",
      "Long-term data archiving: This describes S3 Glacier and S3 Glacier Deep Archive. Kinesis is designed for real-time processing.",
      "Processing real-time streaming data: ✓ Correct. Kinesis Data Streams can ingest and process large volumes of streaming data such as logs, IoT data, and clickstreams in real time.",
      "DNS routing: This is a feature of Route 53. Kinesis is a data streaming service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/streams/latest/dev/introduction.html", title: "What is Amazon Kinesis Data Streams" }
    ]
  },
  {
    id: 53,
    question: "What is the primary function of AWS Certificate Manager (ACM)?",
    options: [
      "Database encryption",
      "IAM user authentication",
      "Managing SSL/TLS certificates",
      "File compression"
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "AWS Certificate Manager is a managed service that simplifies the provisioning, management, and deployment of SSL/TLS certificates.",
    optionExplanations: [
      "Database encryption: This is a feature of RDS and KMS. ACM is dedicated to certificate management.",
      "IAM user authentication: This is a feature of IAM and Cognito. ACM handles the certificate lifecycle.",
      "Managing SSL/TLS certificates: ✓ Correct. ACM lets you create and manage public and private certificates at no cost, and integrates with ELB, CloudFront, API Gateway, and more.",
      "File compression: This is an application-level feature. ACM is an SSL/TLS certificate service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html", title: "What is AWS Certificate Manager" }
    ]
  },
  {
    id: 54,
    question: "What is the default message retention period for Amazon SQS (Simple Queue Service)?",
    options: [
      "4 days",
      "1 hour",
      "7 days",
      "14 days"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "The default message retention period for Amazon SQS is 4 days. It can be configured from a minimum of 1 minute to a maximum of 14 days.",
    optionExplanations: [
      "4 days: ✓ Correct. The default SQS message retention period is 4 days (96 hours). It can be adjusted anywhere from 1 minute to 14 days as needed.",
      "1 hour: This is shorter than the default. While SQS can be set as low as 1 minute, the default is 4 days.",
      "7 days: This is longer than the default. Setting 7 days is possible, but it is not the default.",
      "14 days: This is the maximum retention period, but not the default. It is set when long-term message retention is required."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html", title: "What is Amazon SQS" }
    ]
  },
  {
    id: 55,
    question: "What type of attack does AWS Shield primarily protect against?",
    options: [
      "SQL injection",
      "Brute-force password attacks",
      "Cross-site scripting",
      "DDoS attacks"
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "AWS Shield is a managed service that protects AWS resources from DDoS (Distributed Denial of Service) attacks. It is available in two tiers: Standard and Advanced.",
    optionExplanations: [
      "SQL injection: This is a type of attack mitigated by AWS WAF. Shield primarily addresses DDoS attacks.",
      "Brute-force password attacks: These can be mitigated with WAF and Cognito. Shield specializes in DDoS attack mitigation.",
      "Cross-site scripting: This is a type of attack mitigated by AWS WAF. Shield focuses on network-layer attacks.",
      "DDoS attacks: ✓ Correct. Shield Standard is provided free to all customers, and Shield Advanced offers enhanced DDoS protection and 24/7 support."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html", title: "AWS Shield" }
    ]
  },
  {
    id: 56,
    question: "What is the primary characteristic of Amazon Athena?",
    options: [
      "Serverless query service for data in S3",
      "NoSQL database",
      "Relational database",
      "Message queue service"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "Amazon Athena is a serverless interactive query service that lets you analyze data stored directly in S3 using standard SQL.",
    optionExplanations: [
      "Serverless query service for data in S3: ✓ Correct. Athena requires no infrastructure management and lets you run SQL queries against data stored in S3. You are charged only for the queries you run.",
      "NoSQL database: This describes DynamoDB. Athena is an SQL query service for data in S3.",
      "Relational database: This describes RDS and Aurora. Athena is a query engine.",
      "Message queue service: This describes SQS. Athena is a data analytics service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html", title: "What is Amazon Athena" }
    ]
  },
  {
    id: 57,
    question: "What is the primary use of AWS Batch?",
    options: [
      "Real-time streaming",
      "Running batch computing jobs",
      "Static website hosting",
      "DNS routing"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "AWS Batch is a fully managed service that can efficiently run hundreds of thousands of batch computing jobs.",
    optionExplanations: [
      "Real-time streaming: This describes Kinesis. Batch is dedicated to batch processing.",
      "Running batch computing jobs: ✓ Correct. AWS Batch dynamically provisions compute resources and automates job scheduling and execution.",
      "Static website hosting: This describes S3 and Amplify. Batch is for batch processing workloads.",
      "DNS routing: This is a feature of Route 53. Batch is used for running large-scale batch jobs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html", title: "What is AWS Batch" }
    ]
  },
  {
    id: 58,
    question: "What is the primary function of Amazon Cognito?",
    options: [
      "Database management",
      "Network monitoring",
      "File storage",
      "User authentication and access control"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "Amazon Cognito is a service that provides user authentication, authorization, and user management for web and mobile applications.",
    optionExplanations: [
      "Database management: This is a feature of RDS and DynamoDB. Cognito is an authentication service.",
      "Network monitoring: This is a feature of CloudWatch and VPC Flow Logs. Cognito is an authentication and authorization service.",
      "File storage: This is a feature of S3 and EFS. Cognito is dedicated to user management and authentication.",
      "User authentication and access control: ✓ Correct. Cognito provides user pools (authentication) and identity pools (authorization), and supports integration with social identity providers and SAML 2.0."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html", title: "What is Amazon Cognito" }
    ]
  },
  {
    id: 59,
    question: "What is the primary use of AWS Secrets Manager?",
    options: [
      "Secure storage and rotation of secrets",
      "Database backup",
      "Network traffic analysis",
      "Content delivery"
    ],
    correctAnswer: 0,
    category: "Security and Compliance",
    explanation: "AWS Secrets Manager is a service that securely stores database credentials, API keys, and other secrets, with the ability to automatically rotate them.",
    optionExplanations: [
      "Secure storage and rotation of secrets: ✓ Correct. Secrets Manager encrypts and stores passwords, API keys, and tokens, and enhances security through automatic rotation.",
      "Database backup: This is a feature of AWS Backup and RDS. Secrets Manager is a secrets management service.",
      "Network traffic analysis: This is a feature of VPC Flow Logs and CloudWatch. Secrets Manager is dedicated to secrets management.",
      "Content delivery: This is a feature of CloudFront. Secrets Manager provides secure management of credentials."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html", title: "What is AWS Secrets Manager" }
    ]
  },
  {
    id: 60,
    question: "What is the primary function of Amazon EventBridge?",
    options: [
      "Database replication",
      "File compression",
      "Event bus for event-driven architectures",
      "Load balancing"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "Amazon EventBridge is a serverless event bus service that makes it easy to connect events between AWS services, SaaS applications, and custom applications.",
    optionExplanations: [
      "Database replication: This is a feature of RDS and DynamoDB. EventBridge is an event routing service.",
      "File compression: This is an application-level feature. EventBridge is an event management service.",
      "Event bus for event-driven architectures: ✓ Correct. EventBridge can filter events and route them to multiple targets (Lambda, SNS, SQS, etc.).",
      "Load balancing: This is a feature of ELB. EventBridge enables event-driven integration."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html", title: "What is Amazon EventBridge" }
    ]
  },
  {
    id: 61,
    question: "Which IP address is used to access EC2 instance metadata?",
    options: [
      "169.254.169.254",
      "127.0.0.1",
      "192.168.1.1",
      "10.0.0.1"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "The EC2 instance metadata service is accessed using the special link-local address 169.254.169.254.",
    optionExplanations: [
      "169.254.169.254: ✓ Correct. This link-local address is used from within an instance to access metadata such as the instance ID, AMI ID, and IAM role.",
      "127.0.0.1: This is the localhost IP address. It is not used for the EC2 metadata service.",
      "192.168.1.1: This is a commonly used gateway address in private networks but has no relation to the EC2 metadata service.",
      "10.0.0.1: This is an example of a private IP address within a VPC, but it is not the metadata service address."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html", title: "Instance metadata and user data" }
    ]
  },
  {
    id: 62,
    question: "What is the default access permission for an S3 bucket?",
    options: [
      "Publicly readable",
      "Accessible to all AWS accounts",
      "Accessible to all authenticated users",
      "Private (accessible only by the owner)"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "S3 buckets are private by default when created — only the bucket owner can access them. No other user can access the bucket unless explicit permissions are granted.",
    optionExplanations: [
      "Publicly readable: This is not the default. Explicit configuration is required to allow public access.",
      "Accessible to all AWS accounts: This is not the default. Explicit permission configuration is required for cross-account access.",
      "Accessible to all authenticated users: This is not the default. This must be explicitly configured.",
      "Private (accessible only by the owner): ✓ Correct. As a security best practice, S3 buckets are configured as private by default."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-overview.html", title: "Overview of access control in Amazon S3" }
    ]
  },
  {
    id: 63,
    question: "In an RDS Multi-AZ deployment, how long does a failover typically take when the primary instance fails?",
    options: [
      "A few seconds",
      "1–2 minutes",
      "5–10 minutes",
      "More than 30 minutes"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "RDS Multi-AZ failover typically completes automatically within 1–2 minutes with no manual intervention required.",
    optionExplanations: [
      "A few seconds: While ideal, DNS propagation and re-establishment of database connections mean it typically takes 1–2 minutes.",
      "1–2 minutes: ✓ Correct. In a Multi-AZ deployment, when a failure is detected on the primary instance, it automatically fails over to the standby instance.",
      "5–10 minutes: This is longer than a typical failover. Multi-AZ is optimized for high availability.",
      "More than 30 minutes: Multi-AZ failover does not take this long. This duration is more characteristic of manual recovery."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html", title: "Multi-AZ deployments for Amazon RDS" }
    ]
  },
  {
    id: 64,
    question: "Which statement is used in an IAM policy to explicitly deny a specific action?",
    options: [
      "Allow",
      "Reject",
      "Deny",
      "Block"
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "In IAM policies, the 'Deny' statement is used to explicitly deny an action. Deny always takes precedence over Allow.",
    optionExplanations: [
      "Allow: Used to permit an action. It has the opposite effect of Deny.",
      "Reject: This is not a valid statement in IAM policies.",
      "Deny: ✓ Correct. An explicit deny overrides all Allow statements. It is essential for enforcing security controls.",
      "Block: This is not a valid statement in IAM policies."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html", title: "Policy evaluation logic" }
    ]
  },
  {
    id: 65,
    question: "How long does CloudWatch retain 1-minute interval data points by default?",
    options: [
      "3 days",
      "15 days",
      "63 days",
      "455 days"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "CloudWatch retains 1-minute interval data points for 15 days. If longer retention is needed, data can be exported to S3.",
    optionExplanations: [
      "3 days: This is shorter than the retention period for 1-minute data. It applies to high-frequency data in its initial retention phase.",
      "15 days: ✓ Correct. 1-minute interval metrics are retained for 15 days. 5-minute interval data is retained for 63 days, and 1-hour interval data is retained for 455 days.",
      "63 days: This is the retention period for 5-minute interval data points, not 1-minute data.",
      "455 days: This is the retention period for 1-hour interval data points, not 1-minute data."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html", title: "Amazon CloudWatch concepts" }
    ]
  },
  {
    id: 66,
    question: "How many IP addresses does AWS reserve in each VPC subnet?",
    options: [
      "2",
      "3",
      "5",
      "10"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "AWS reserves 5 IP addresses in each subnet: the network address, VPC router, DNS, future use, and broadcast address.",
    optionExplanations: [
      "2: Fewer than the number of reserved addresses. It is not just the network and broadcast addresses.",
      "3: Fewer than the number of reserved addresses. AWS also reserves additional addresses.",
      "5: ✓ Correct. For example, in a 10.0.0.0/24 subnet: .0 (network), .1 (VPC router), .2 (DNS), .3 (future use), and .255 (broadcast) are reserved.",
      "10: More than the actual number of reserved addresses. AWS reserves only 5."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html", title: "Subnets for your VPC" }
    ]
  },
  {
    id: 67,
    question: "What is the default timeout for a Lambda function?",
    options: [
      "1 second",
      "15 minutes",
      "3 seconds",
      "30 seconds"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "The default timeout for AWS Lambda is 3 seconds. It can be configured up to a maximum of 15 minutes.",
    optionExplanations: [
      "1 second: This is shorter than the default. The minimum timeout is 1 second, but it is not the default.",
      "15 minutes: This is the maximum timeout, but not the default. It is set for long-running functions.",
      "3 seconds: ✓ Correct. The default timeout for a Lambda function is 3 seconds. It can be adjusted from 1 second to 15 minutes (900 seconds) as needed.",
      "30 seconds: This is not the default, but it is an appropriate value for many use cases."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-common.html", title: "Lambda function configuration" }
    ]
  },
  {
    id: 68,
    question: "Where are EBS volume snapshots stored?",
    options: [
      "Amazon S3",
      "Within the same Availability Zone",
      "Amazon Glacier",
      "EC2 instance local storage"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "EBS snapshots are automatically stored in Amazon S3 and are redundantly stored within the region. Users do not need to manage S3 buckets directly.",
    optionExplanations: [
      "Amazon S3: ✓ Correct. EBS snapshots are stored in S3 and automatically replicated within the region, providing high durability.",
      "Within the same Availability Zone: The EBS volume itself resides within an AZ, but snapshots are stored at the region level.",
      "Amazon Glacier: This is not the default destination. For long-term archiving, snapshots can be transitioned using Data Lifecycle Manager.",
      "EC2 instance local storage: Snapshots are stored independently from the instance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSSnapshots.html", title: "Amazon EBS snapshots" }
    ]
  },
  {
    id: 69,
    question: "What is the default cooldown period for an Auto Scaling group?",
    options: [
      "60 seconds",
      "300 seconds",
      "600 seconds",
      "No cooldown is applied"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "The default cooldown period for an Auto Scaling group is 300 seconds (5 minutes). During this period, additional scaling activities are paused.",
    optionExplanations: [
      "60 seconds: This is shorter than the default. The cooldown period is configurable, but the default is 300 seconds.",
      "300 seconds: ✓ Correct. The default cooldown period is 300 seconds (5 minutes), providing time for metrics to stabilize after a scaling activity.",
      "600 seconds: This is longer than the default. It can be configured as needed, but it is not the default.",
      "No cooldown is applied: Incorrect. Auto Scaling uses a cooldown period by default."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-cooldown.html", title: "Scaling cooldowns for Amazon EC2 Auto Scaling" }
    ]
  },
  {
    id: 70,
    question: "In DynamoDB provisioned capacity mode, what is the maximum item size that one Read Capacity Unit (RCU) can read per second with strongly consistent reads?",
    options: [
      "4 KB",
      "1 KB",
      "8 KB",
      "16 KB"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "One RCU can perform one strongly consistent read per second for items up to 4 KB in size. For eventually consistent reads, it can perform two reads per second.",
    optionExplanations: [
      "4 KB: ✓ Correct. One RCU supports one strongly consistent read per second (or two eventually consistent reads per second) for items up to 4 KB.",
      "1 KB: This is smaller than the data size one RCU can read. One RCU handles more data.",
      "8 KB: This exceeds what one RCU can read. An 8 KB item requires 2 RCUs.",
      "16 KB: This exceeds what one RCU can read. A 16 KB item requires 4 RCUs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ProvisionedThroughput.html", title: "DynamoDB provisioned capacity mode" }
    ]
  },
  {
    id: 71,
    question: "Which of the following is an AWS global service?",
    options: [
      "Amazon EC2",
      "Amazon S3",
      "AWS IAM",
      "Amazon RDS"
    ],
    correctAnswer: 2,
    category: "Cloud Concepts",
    explanation: "IAM is a global service that does not require region selection. Users, groups, roles, and policies are available across all regions.",
    optionExplanations: [
      "Amazon EC2: This is a regional service. Instances are launched in a specific region and Availability Zone.",
      "Amazon S3: Buckets are created in a region, though the S3 console provides a global view. Strictly speaking, it is a regional service.",
      "AWS IAM: ✓ Correct. IAM is a global service; users and roles created in IAM are automatically available in all regions.",
      "Amazon RDS: This is a regional service. Database instances are created in a specific region and Availability Zone."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html", title: "What is IAM" }
    ]
  },
  {
    id: 72,
    question: "Which of the following does NOT change when an EC2 instance is stopped and started?",
    options: [
      "Public IP address",
      "Instance ID",
      "Instance store data",
      "Private IP address"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "The instance ID and private IP address do not change after a stop/start cycle. The public IP address changes, and instance store data is lost.",
    optionExplanations: [
      "Public IP address: This changes when an instance is stopped and started. Use an Elastic IP if a fixed IP is required.",
      "Instance ID: ✓ Correct. The instance ID does not change until the instance is terminated. It persists through stop/start cycles.",
      "Instance store data: This is lost when the instance is stopped. Use EBS for persistent storage.",
      "Private IP address: This does not change as long as the instance exists. It is used for communication within the VPC."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html", title: "EC2 instance lifecycle" }
    ]
  },
  {
    id: 73,
    question: "Which S3 storage class offers the lowest cost?",
    options: [
      "S3 Standard",
      "S3 Intelligent-Tiering",
      "S3 Glacier Deep Archive",
      "S3 One Zone-IA"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "S3 Glacier Deep Archive is the lowest-cost storage class, designed for data accessed once or twice a year.",
    optionExplanations: [
      "S3 Standard: Designed for frequently accessed data; it is the highest-cost storage class.",
      "S3 Intelligent-Tiering: Automatically moves objects between tiers based on access patterns, but costs more than Deep Archive.",
      "S3 Glacier Deep Archive: ✓ Correct. The lowest-cost class; retrieval takes 12 hours or more, but it is ideal for long-term archiving.",
      "S3 One Zone-IA: Designed for infrequent access, but costs more than Deep Archive. Stored in a single AZ."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html", title: "Amazon S3 storage classes" }
    ]
  },
  {
    id: 74,
    question: "Which of the following CANNOT be viewed in AWS Cost Explorer?",
    options: [
      "Historical cost trends",
      "Cost breakdown by service",
      "Future cost forecasts",
      "Real-time resource utilization"
    ],
    correctAnswer: 3,
    category: "Billing, Pricing, and Support",
    explanation: "Cost Explorer provides historical and forecasted cost data, but real-time resource utilization is monitored using CloudWatch.",
    optionExplanations: [
      "Historical cost trends: Viewable in Cost Explorer. You can analyze up to 12 months of historical data.",
      "Cost breakdown by service: Viewable in Cost Explorer. Costs per service such as EC2, S3, and RDS are displayed.",
      "Future cost forecasts: Viewable in Cost Explorer. Machine learning is used to forecast costs up to 12 months ahead.",
      "Real-time resource utilization: ✓ Correct. This is a CloudWatch feature. Cost Explorer focuses on cost data and typically has a one-day delay."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html", title: "What is AWS Cost Explorer" }
    ]
  },
  {
    id: 75,
    question: "What is the recommended approach when performing a major version upgrade of an Amazon RDS database engine?",
    options: [
      "Take a snapshot before upgrading",
      "Upgrade directly in the production environment",
      "Disable Multi-AZ before upgrading",
      "Disable backups before upgrading"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "Before a major version upgrade, it is recommended to always take a snapshot to secure a backup that can be used to roll back if issues arise.",
    optionExplanations: [
      "Take a snapshot before upgrading: ✓ Correct. Always take a snapshot before upgrading so you can roll back if a problem occurs.",
      "Upgrade directly in the production environment: This is high risk. Always take a snapshot first, and validate in a test environment if possible.",
      "Disable Multi-AZ before upgrading: Not recommended. Multi-AZ provides high availability and should remain enabled during upgrades.",
      "Disable backups before upgrading: Dangerous. Backups should always be enabled, especially during upgrades."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html", title: "Upgrading a DB instance engine version" }
    ]
  },
  {
    id: 76,
    question: "Which of the following correctly describes VPC peering connections?",
    options: [
      "One-to-one connections with no support for transitive routing",
      "Cannot be used between different regions",
      "Can connect VPCs with overlapping CIDR blocks",
      "Transitive routing is supported"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "VPC peering is a one-to-one connection and does not support transitive routing. Even if peering exists between A–B and B–C, a separate peering connection is required for A–C communication.",
    optionExplanations: [
      "One-to-one connections with no support for transitive routing: ✓ Correct. A separate peering connection is required for each VPC pair, and transitive routing does not work.",
      "Cannot be used between different regions: Incorrect. Cross-region VPC peering is supported.",
      "Can connect VPCs with overlapping CIDR blocks: Incorrect. VPCs with overlapping CIDR blocks cannot be peered.",
      "Transitive routing is supported: Incorrect. VPC peering does not support transitive routing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html", title: "What is VPC peering" }
    ]
  },
  {
    id: 77,
    question: "Which of the following alert types CANNOT be configured in AWS Budgets?",
    options: [
      "When a specific IAM user logs in",
      "When forecasted costs are expected to exceed the budget",
      "When usage of a specific service exceeds a threshold",
      "When actual costs exceed the budget"
    ],
    correctAnswer: 0,
    category: "Billing, Pricing, and Support",
    explanation: "AWS Budgets is dedicated to monitoring costs and usage. It does not monitor IAM user login events — that is the role of CloudTrail and EventBridge.",
    optionExplanations: [
      "When a specific IAM user logs in: ✓ Correct. This is not a Budgets feature. Use CloudTrail and EventBridge to monitor IAM events.",
      "When forecasted costs are expected to exceed the budget: This can be configured in Budgets. It uses machine learning to forecast future costs and alerts when a budget overrun is expected.",
      "When usage of a specific service exceeds a threshold: This can be configured in Budgets. Usage-based alerts such as EC2 hours and S3 storage are available.",
      "When actual costs exceed the budget: This can be configured in Budgets. Alerts are sent when actual costs exceed a threshold (e.g., 80%, 100%)."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html", title: "Managing your costs with AWS Budgets" }
    ]
  },
  {
    id: 78,
    question: "What is the highest resolution (shortest interval) for Amazon CloudWatch custom metrics?",
    options: [
      "1 second",
      "5 seconds",
      "10 seconds",
      "1 minute"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "CloudWatch custom metrics can be published as high-resolution metrics at 1-second intervals.",
    optionExplanations: [
      "1 second: ✓ Correct. High-resolution custom metrics can send data points at 1-second intervals, enabling near-real-time monitoring.",
      "5 seconds: This is a supported interval for high-resolution metrics, but it is not the shortest.",
      "10 seconds: This is a supported interval for high-resolution metrics, but it is not the shortest.",
      "1 minute: This is the interval for standard-resolution metrics. Custom metrics support higher resolution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html", title: "Publishing custom metrics" }
    ]
  },
  {
    id: 79,
    question: "What is the primary reason to use AWS Snowball?",
    options: [
      "Physical transfer of large volumes of data",
      "Real-time data analysis",
      "Database replication",
      "Application deployment"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "AWS Snowball is a device for physically transferring petabyte-scale data to AWS, used when network transfer is inefficient.",
    optionExplanations: [
      "Physical transfer of large volumes of data: ✓ Correct. Snowball is used to efficiently migrate large amounts of data (TB to PB scale) to AWS when network bandwidth is limited.",
      "Real-time data analysis: This describes Kinesis and Athena. Snowball is used for bulk data transfer.",
      "Database replication: This is a feature of DMS and RDS. Snowball is a bulk data transfer device.",
      "Application deployment: This describes CodeDeploy and Elastic Beanstalk. Snowball is dedicated to data transfer."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/snowball/latest/ug/whatissnowball.html", title: "What is AWS Snowball" }
    ]
  },
  {
    id: 80,
    question: "What is the primary difference between Amazon EFS and Amazon EBS?",
    options: [
      "EFS is block storage; EBS is file storage",
      "EFS can be accessed simultaneously by multiple EC2 instances; EBS is limited to a single instance",
      "EFS is regional; EBS is global",
      "EFS is object storage; EBS is block storage"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "EFS is file storage that can be mounted simultaneously by multiple EC2 instances, while EBS is block storage that is typically attached to a single EC2 instance.",
    optionExplanations: [
      "EFS is block storage; EBS is file storage: This is reversed. EFS is file storage and EBS is block storage.",
      "EFS can be accessed simultaneously by multiple EC2 instances; EBS is limited to a single instance: ✓ Correct. EFS is a shared file system accessible by multiple instances simultaneously, while EBS is typically attached to one instance.",
      "EFS is regional; EBS is global: Both are regional services. Neither is global.",
      "EFS is object storage; EBS is block storage: EFS is file storage. Object storage is S3."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html", title: "What is Amazon EFS" }
    ]
  },
  {
    id: 81,
    question: "Which of the following is NOT automatically managed by AWS Elastic Beanstalk?",
    options: [
      "Capacity provisioning",
      "Application code development",
      "Load balancing",
      "Auto scaling"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "Elastic Beanstalk automates infrastructure management, but developing application code remains the developer's responsibility.",
    optionExplanations: [
      "Capacity provisioning: Automatically managed by Elastic Beanstalk. It automatically provisions the required EC2 instances.",
      "Application code development: ✓ Correct. This is the developer's responsibility. Elastic Beanstalk provides an environment to deploy and run code, but the code itself must be written by the developer.",
      "Load balancing: Automatically managed by Elastic Beanstalk. It automatically configures load balancing using ELB.",
      "Auto scaling: Automatically managed by Elastic Beanstalk. It automatically adjusts the number of instances based on traffic."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html", title: "What is AWS Elastic Beanstalk" }
    ]
  },
  {
    id: 82,
    question: "What is the primary use of Amazon Redshift?",
    options: [
      "NoSQL database",
      "Real-time transaction processing",
      "Data warehouse and analytics",
      "Object storage"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "Amazon Redshift is a petabyte-scale data warehouse service optimized for large-scale data analytics.",
    optionExplanations: [
      "NoSQL database: This describes DynamoDB. Redshift is a SQL-based data warehouse.",
      "Real-time transaction processing: This describes RDS and Aurora. Redshift is optimized for analytical workloads.",
      "Data warehouse and analytics: ✓ Correct. Redshift is a data warehouse service that can rapidly run complex analytical queries against large volumes of structured data.",
      "Object storage: This describes S3. Redshift is a data warehouse service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html", title: "What is Amazon Redshift" }
    ]
  },
  {
    id: 83,
    question: "What is the primary purpose of AWS X-Ray?",
    options: [
      "Cost optimization",
      "Tracing and analyzing distributed applications",
      "Database backup",
      "Network security"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "AWS X-Ray is a service for tracing requests through distributed applications and identifying performance bottlenecks and errors.",
    optionExplanations: [
      "Cost optimization: This is the purpose of Cost Explorer and Trusted Advisor. X-Ray is an application analysis tool.",
      "Tracing and analyzing distributed applications: ✓ Correct. X-Ray visualizes the flow of requests and diagnoses performance issues in distributed systems such as microservices architectures.",
      "Database backup: This is a feature of AWS Backup and RDS. X-Ray is a tracing service.",
      "Network security: This is the purpose of Security Groups and NACLs. X-Ray is an application observability tool."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html", title: "What is AWS X-Ray" }
    ]
  },
  {
    id: 84,
    question: "What information does AWS Personal Health Dashboard provide?",
    options: [
      "General availability status of AWS services only",
      "Security vulnerability scan results",
      "Cost optimization recommendations",
      "Notifications about events affecting your own AWS resources"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "Personal Health Dashboard provides personalized notifications about events that may affect the resources in your AWS account.",
    optionExplanations: [
      "General availability status of AWS services only: This is a feature of the Service Health Dashboard. Personal Health Dashboard provides more personalized information.",
      "Security vulnerability scan results: This is a feature of Inspector and Security Hub. Personal Health Dashboard sends notifications about service events.",
      "Cost optimization recommendations: This is a feature of Trusted Advisor and Cost Explorer. Personal Health Dashboard focuses on health events.",
      "Notifications about events affecting your own AWS resources: ✓ Correct. It notifies you about events such as maintenance, outages, and security incidents that may affect your resources."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html", title: "What is AWS Health" }
    ]
  },
  {
    id: 85,
    question: "What is the primary benefit of Amazon Aurora Serverless?",
    options: [
      "Fixed capacity with predictable costs",
      "Automatic scaling based on usage with pay-per-use pricing",
      "NoSQL database capabilities",
      "Running on-premises"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "Aurora Serverless is a serverless database that automatically scales capacity up and down and charges only for what you actually use.",
    optionExplanations: [
      "Fixed capacity with predictable costs: This describes standard provisioned Aurora. Serverless features variable capacity and pay-per-use pricing.",
      "Automatic scaling based on usage with pay-per-use pricing: ✓ Correct. Aurora Serverless automatically scales with the workload, pauses when not in use, and charges only for what is consumed.",
      "NoSQL database capabilities: Aurora is a relational database. NoSQL capabilities are provided by DynamoDB.",
      "Running on-premises: Aurora is a cloud-native service and cannot run on-premises."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless.html", title: "Using Amazon Aurora Serverless" }
    ]
  },
  {
    id: 86,
    question: "Which types of attacks can AWS WAF (Web Application Firewall) protect against?",
    options: [
      "DDoS attacks only",
      "Physical intrusion into data centers",
      "SQL injection and cross-site scripting",
      "Unauthorized IAM user logins"
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "AWS WAF protects against common web application attacks such as SQL injection and cross-site scripting (XSS).",
    optionExplanations: [
      "DDoS attacks only: DDoS protection is the primary function of AWS Shield. WAF focuses on application-layer attacks.",
      "Physical intrusion into data centers: This is within AWS's physical security responsibility. WAF is a web application protection tool.",
      "SQL injection and cross-site scripting: ✓ Correct. WAF uses custom and managed rules to protect against SQL injection, XSS, and other OWASP Top 10 threats.",
      "Unauthorized IAM user logins: These are addressed using IAM policies and MFA. WAF is dedicated to filtering web traffic."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html", title: "What is AWS WAF" }
    ]
  },
  {
    id: 87,
    question: "When S3 versioning is enabled and an object is deleted, what happens?",
    options: [
      "The object is permanently deleted",
      "Only the latest version is deleted",
      "A delete marker is added and all previous versions are retained",
      "All versions are deleted"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "When S3 versioning is enabled and an object is deleted, a delete marker is added, but all previous versions are retained.",
    optionExplanations: [
      "The object is permanently deleted: This is the behavior when versioning is disabled. With versioning enabled, a delete marker is added instead.",
      "Only the latest version is deleted: Incorrect. A delete marker is added, and all versions are retained.",
      "A delete marker is added and all previous versions are retained: ✓ Correct. The delete operation creates a new delete marker, and all previous versions are preserved, protecting against accidental deletion.",
      "All versions are deleted: Incorrect. To permanently delete all versions, each version must be deleted individually."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html", title: "Using versioning in S3 buckets" }
    ]
  },
  {
    id: 88,
    question: "What is the primary reason to use a Change Set when updating an AWS CloudFormation stack?",
    options: [
      "To speed up the update",
      "To reduce costs",
      "To review changes before applying them",
      "To automatically roll back"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "Using a Change Set lets you preview the changes that will be made to a stack before actually applying them, preventing unintended modifications.",
    optionExplanations: [
      "To speed up the update: Change Sets are not for improving speed; they are a safety feature.",
      "To reduce costs: Change Sets are not a cost-reduction feature. They are a tool for safe change management.",
      "To review changes before applying them: ✓ Correct. A Change Set lets you preview additions, deletions, and modifications to resources and evaluate the impact on the production environment in advance.",
      "To automatically roll back: Rollback is a separate feature. Change Sets are used to preview changes."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html", title: "Updating stacks using change sets" }
    ]
  },
  {
    id: 89,
    question: "What is the primary difference between a Global Secondary Index (GSI) and a Local Secondary Index (LSI) in Amazon DynamoDB?",
    options: [
      "LSI can be added after table creation; GSI can only be defined at table creation",
      "GSI can be added after table creation; LSI can only be defined at table creation",
      "There is no difference between GSI and LSI",
      "GSI supports queries only; LSI supports scans only"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "GSIs can be added or removed after a table is created, but LSIs can only be defined at table creation time and cannot be changed later.",
    optionExplanations: [
      "LSI can be added after table creation; GSI can only be defined at table creation: This is reversed. GSI is flexible and LSI is restricted.",
      "GSI can be added after table creation; LSI can only be defined at table creation: ✓ Correct. GSIs are flexible and can be added or removed at any time, but LSIs must be defined when the table is created.",
      "There is no difference between GSI and LSI: Incorrect. There are many differences including creation timing, partition key, and consistency model.",
      "GSI supports queries only; LSI supports scans only: Incorrect. Both support queries and scans."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html", title: "Improving data access with secondary indexes in DynamoDB" }
    ]
  },
  {
    id: 90,
    question: "What is the primary benefit of AWS Systems Manager Session Manager?",
    options: [
      "Reduces costs",
      "Automates database backups",
      "No need to open SSH ports to EC2 instances",
      "Deploys applications"
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "Session Manager allows you to securely access EC2 instances via a browser or CLI without opening SSH port 22 or RDP port 3389.",
    optionExplanations: [
      "Reduces costs: Session Manager itself has no additional cost, but cost reduction is not its primary purpose — improved security is.",
      "Automates database backups: This is a feature of AWS Backup and RDS. Session Manager is an instance access management tool.",
      "No need to open SSH ports to EC2 instances: ✓ Correct. Session Manager connects to instances without opening inbound ports, improving security and automatically recording audit logs.",
      "Deploys applications: This is a feature of CodeDeploy and Elastic Beanstalk. Session Manager is a remote access tool."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html", title: "AWS Systems Manager Session Manager" }
    ]
  },
  {
    id: 91,
    question: "What is the primary use of AWS Transit Gateway?",
    options: [
      "Replacement for an Internet Gateway",
      "A hub for connecting multiple VPCs and on-premises networks",
      "Database replication",
      "Accelerating content delivery"
    ],
    correctAnswer: 1,
    category: "Cloud Technology and Services",
    explanation: "Transit Gateway is a network hub that can connect multiple VPCs, VPN connections, and Direct Connect connections through a single gateway.",
    optionExplanations: [
      "Replacement for an Internet Gateway: Incorrect. Transit Gateway is for private network connectivity and serves a different purpose than an Internet Gateway.",
      "A hub for connecting multiple VPCs and on-premises networks: ✓ Correct. Transit Gateway connects thousands of VPCs and on-premises networks through a central hub, simplifying network management.",
      "Database replication: This is a feature of RDS and DynamoDB. Transit Gateway is a network connectivity service.",
      "Accelerating content delivery: This is a feature of CloudFront. Transit Gateway is dedicated to network routing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html", title: "What is a transit gateway" }
    ]
  },
  {
    id: 92,
    question: "Which cache engines does Amazon ElastiCache support?",
    options: [
      "Oracle and SQL Server",
      "MySQL and PostgreSQL",
      "MongoDB and Cassandra",
      "Redis and Memcached only"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "Amazon ElastiCache supports two open-source in-memory cache engines: Redis and Memcached.",
    optionExplanations: [
      "Oracle and SQL Server: These are commercial database engines supported by RDS.",
      "MySQL and PostgreSQL: These are relational database engines supported by RDS and Aurora.",
      "MongoDB and Cassandra: These are NoSQL databases supported by DocumentDB and Keyspaces.",
      "Redis and Memcached only: ✓ Correct. ElastiCache provides Redis and Memcached as fully managed services, improving application performance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html", title: "What is Amazon ElastiCache" }
    ]
  },
  {
    id: 93,
    question: "What does AWS Artifact provide?",
    options: [
      "Database backups",
      "Application build artifacts",
      "Machine learning models",
      "Compliance reports and security documents"
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "AWS Artifact is a service that provides on-demand access to AWS compliance reports, security documents, and agreements.",
    optionExplanations: [
      "Database backups: These are managed by AWS Backup and RDS. Artifact is a document delivery service.",
      "Application build artifacts: These are managed by CodeArtifact and S3. AWS Artifact is dedicated to compliance documents.",
      "Machine learning models: These are managed by SageMaker. Artifact is dedicated to providing compliance information.",
      "Compliance reports and security documents: ✓ Correct. Artifact provides AWS compliance-related documents such as SOC, PCI, and ISO certification reports."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html", title: "What is AWS Artifact" }
    ]
  },
  {
    id: 94,
    question: "What is the default throttling limit for Amazon API Gateway?",
    options: [
      "1,000 requests per second",
      "5,000 requests per second",
      "10,000 requests per second",
      "No limit"
    ],
    correctAnswer: 2,
    category: "Cloud Technology and Services",
    explanation: "The default throttling limit for API Gateway is 10,000 requests per second for steady-state traffic and a burst of 5,000 requests.",
    optionExplanations: [
      "1,000 requests per second: This is below the default limit. The limit can be reduced if needed.",
      "5,000 requests per second: This is the burst capacity value. The steady-state limit is higher.",
      "10,000 requests per second: ✓ Correct. API Gateway provides a default steady-state limit of 10,000 requests per second and a burst capacity of 5,000 requests.",
      "No limit: Incorrect. API Gateway has a default throttling limit, which can be increased by submitting a request."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html", title: "Throttling requests to your API" }
    ]
  },
  {
    id: 95,
    question: "What is the primary function of AWS Glue?",
    options: [
      "Quantum computing",
      "Container orchestration",
      "Blockchain management",
      "Serverless ETL (Extract, Transform, Load) service"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "AWS Glue is a serverless data integration service that simplifies data discovery, preparation, and integration, optimized for ETL processing.",
    optionExplanations: [
      "Quantum computing: This is the domain of Amazon Braket. Glue is an ETL and data catalog service.",
      "Container orchestration: This is a feature of ECS and EKS. Glue is a data integration service.",
      "Blockchain management: This is a feature of Amazon Managed Blockchain. Glue is dedicated to data processing.",
      "Serverless ETL (Extract, Transform, Load) service: ✓ Correct. Glue automates ETL jobs that extract data from sources, transform it, and load it into data warehouses or data lakes."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html", title: "What is AWS Glue" }
    ]
  },
  {
    id: 96,
    question: "Which network does Amazon S3 Transfer Acceleration use?",
    options: [
      "The internet",
      "AWS Direct Connect",
      "VPN",
      "CloudFront edge locations"
    ],
    correctAnswer: 3,
    category: "Cloud Technology and Services",
    explanation: "S3 Transfer Acceleration leverages CloudFront's global edge location network to accelerate long-distance file transfers to and from Amazon S3.",
    optionExplanations: [
      "The internet: This is used for standard S3 transfers. Transfer Acceleration uses a more optimized network path.",
      "AWS Direct Connect: This is a dedicated connection service and represents a different approach from Transfer Acceleration.",
      "VPN: This provides an encrypted connection but is not the underlying infrastructure for Transfer Acceleration.",
      "✓ Correct: Transfer Acceleration routes uploads through CloudFront edge locations and then uses the AWS backbone network to maximize transfer speed over long distances."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html", title: "Amazon S3 Transfer Acceleration" }
    ]
  },
  {
    id: 97,
    question: "Which resource CANNOT be shared using AWS Resource Access Manager (RAM)?",
    options: [
      "Transit Gateway",
      "Subnets",
      "Route 53 Resolver Rules",
      "IAM users"
    ],
    correctAnswer: 3,
    category: "Security and Compliance",
    explanation: "AWS RAM can share resources such as VPC subnets, Transit Gateways, and Route 53 resources, but IAM users and roles cannot be shared through RAM.",
    optionExplanations: [
      "Transit Gateway: This can be shared via RAM. Sharing a Transit Gateway across multiple accounts simplifies network connectivity.",
      "Subnets: These can be shared via RAM. VPC subnets can be shared with other accounts so resources can be deployed in the same subnet.",
      "Route 53 Resolver Rules: These can be shared via RAM, allowing DNS resolution rules to be shared across multiple accounts.",
      "✓ Correct: IAM users, groups, and roles are account-specific and cannot be shared through RAM. For cross-account access, use IAM roles."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ram/latest/userguide/what-is.html", title: "What is AWS Resource Access Manager?" }
    ]
  },
  {
    id: 98,
    question: "What is the primary characteristic of Amazon FSx for Windows File Server?",
    options: [
      "A fully managed file storage built on Windows Server",
      "A Linux-based file system",
      "Object storage",
      "Block storage"
    ],
    correctAnswer: 0,
    category: "Cloud Technology and Services",
    explanation: "Amazon FSx for Windows File Server is a fully managed file storage built on Windows Server that supports the SMB protocol.",
    optionExplanations: [
      "✓ Correct: FSx for Windows supports Active Directory integration, the SMB protocol, and the Windows NTFS file system, making it a native Windows-compatible managed file storage service.",
      "A Linux-based file system: This describes FSx for Lustre. FSx for Windows is Windows Server-based.",
      "Object storage: This describes Amazon S3. FSx is a file storage service.",
      "Block storage: This describes Amazon EBS. FSx provides file-level storage."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html", title: "What is Amazon FSx for Windows File Server?" }
    ]
  },
  {
    id: 99,
    question: "What is the primary purpose of AWS Control Tower?",
    options: [
      "Cost management",
      "Database migration",
      "Setting up and governing a multi-account AWS environment",
      "Training machine learning models"
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "AWS Control Tower is a service that automatically sets up and governs a secure, multi-account AWS environment based on best practices.",
    optionExplanations: [
      "Cost management: This is the purpose of AWS Cost Explorer and AWS Budgets. Control Tower focuses on governance and compliance.",
      "Database migration: This is the purpose of AWS Database Migration Service. Control Tower is an account management tool.",
      "✓ Correct: Control Tower builds on AWS Organizations to provide guardrails, an Account Factory, and a dashboard for managing a multi-account AWS environment following best practices.",
      "Training machine learning models: This is the purpose of Amazon SageMaker. Control Tower is a governance service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html", title: "What is AWS Control Tower?" }
    ]
  },
  {
    id: 100,
    question: "What is the primary function of Amazon Macie?",
    options: [
      "Monitoring network traffic",
      "Deploying applications",
      "Detecting and protecting sensitive data",
      "Backing up databases"
    ],
    correctAnswer: 2,
    category: "Security and Compliance",
    explanation: "Amazon Macie is a security service that uses machine learning to automatically discover, classify, and protect sensitive data (such as personally identifiable information and credit card numbers) stored in Amazon S3.",
    optionExplanations: [
      "Monitoring network traffic: This is the function of VPC Flow Logs and Amazon CloudWatch. Macie specializes in data security.",
      "Deploying applications: This is the function of AWS CodeDeploy and AWS Elastic Beanstalk. Macie is a data privacy tool.",
      "✓ Correct: Macie automatically scans S3 buckets for sensitive data, classifies it, identifies security risks, and sends alerts to help you protect your data.",
      "Backing up databases: This is the function of AWS Backup and Amazon RDS. Macie focuses on sensitive data discovery and classification."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html", title: "What is Amazon Macie?" }
    ]
  }
];
