// AWS Certified Data Engineer - Associate (DEA-C01) Practice Questions
const awsDEAQuestions = [
  {
    id: 1,
    question: "A data engineer needs to ingest streaming clickstream data from a website into Amazon S3 for analysis. The data volume is unpredictable and can spike significantly. Which AWS service is MOST appropriate for this use case?",
    options: [
      "Amazon Kinesis Data Firehose",
      "AWS Database Migration Service (AWS DMS)",
      "Amazon SQS",
      "AWS Batch"
    ],
    correctAnswer: 0,
    category: "Data Ingestion and Transformation",
    explanation: "Amazon Kinesis Data Firehose is the easiest way to reliably load streaming data into data stores and analytics tools. It can capture, transform, and load streaming data into Amazon S3, Amazon Redshift, and other destinations automatically, handling variable throughput without requiring manual scaling.",
    optionExplanations: [
      "Amazon Kinesis Data Firehose: ✓ Correct. Kinesis Data Firehose is purpose-built for streaming data delivery to S3. It automatically scales to match data throughput, buffers records, and can optionally transform data with Lambda before delivery — no capacity management required.",
      "AWS Database Migration Service (AWS DMS): Incorrect. AWS DMS is designed for migrating databases from one engine to another. It is not suited for real-time streaming ingestion of clickstream events.",
      "Amazon SQS: Incorrect. SQS is a message queue for decoupling components. While it can buffer messages, it does not natively deliver data directly to S3 and requires additional processing infrastructure.",
      "AWS Batch: Incorrect. AWS Batch is designed for batch computing workloads. It runs jobs at scale but is not appropriate for continuous streaming ingestion scenarios."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html", title: "Amazon Kinesis Data Firehose Developer Guide" }
    ]
  },
  {
    id: 2,
    question: "A company stores raw data in Amazon S3 in CSV format. A data engineer must convert this data to Apache Parquet format to reduce storage costs and improve query performance in Amazon Athena. Which AWS service should the engineer use to perform this transformation with the LEAST operational overhead?",
    options: [
      "Amazon EC2 with a custom Python script",
      "AWS Glue ETL job",
      "Amazon EMR with Apache Spark",
      "AWS Lambda"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "AWS Glue is a serverless ETL service that can natively read CSV files from S3, convert them to Parquet, and write the results back to S3. It requires no infrastructure management and provides built-in support for format conversion, making it the lowest-overhead option.",
    optionExplanations: [
      "Amazon EC2 with a custom Python script: Incorrect. This approach requires provisioning, managing, and patching EC2 instances, which introduces significant operational overhead compared to serverless alternatives.",
      "AWS Glue ETL job: ✓ Correct. AWS Glue is a fully managed, serverless ETL service. It natively supports reading CSV from S3 and writing Parquet back to S3 with minimal configuration. No server management is needed.",
      "Amazon EMR with Apache Spark: Incorrect. While EMR with Spark can perform this transformation, it involves spinning up and managing a cluster, resulting in higher operational overhead compared to AWS Glue.",
      "AWS Lambda: Incorrect. Lambda has a 15-minute execution limit and limited memory, making it unsuitable for large-scale format conversion of bulk data stored in S3."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-parquet-home.html", title: "AWS Glue: Reading and Writing Parquet Files" }
    ]
  },
  {
    id: 3,
    question: "A data engineer needs to schedule an ETL pipeline to run every day at 2:00 AM and also trigger it immediately whenever new files are uploaded to a specific Amazon S3 bucket. Which combination of AWS services satisfies BOTH requirements?",
    options: [
      "AWS Glue Trigger (scheduled) and Amazon S3 Event Notifications with AWS Lambda",
      "Amazon CloudWatch Events only",
      "AWS Step Functions with a wait state",
      "Amazon Kinesis Data Streams with AWS Glue"
    ],
    correctAnswer: 0,
    category: "Data Ingestion and Transformation",
    explanation: "AWS Glue supports scheduled triggers for time-based execution. Amazon S3 Event Notifications can invoke Lambda when a new object is uploaded, and Lambda can then trigger the Glue job. This combination satisfies both the scheduled requirement and the event-driven requirement.",
    optionExplanations: [
      "AWS Glue Trigger (scheduled) and Amazon S3 Event Notifications with AWS Lambda: ✓ Correct. A scheduled Glue trigger handles the nightly 2 AM run. S3 Event Notifications deliver object-creation events to Lambda, which can then start the Glue ETL job on demand — covering both scenarios with minimal custom code.",
      "Amazon CloudWatch Events only: Incorrect. CloudWatch Events (EventBridge) supports scheduled rules but does not natively trigger on individual S3 object uploads without additional configuration (e.g., EventBridge + S3 event bridge integration or Lambda).",
      "AWS Step Functions with a wait state: Incorrect. A wait state pauses a workflow for a fixed time but does not provide event-driven triggering based on S3 uploads.",
      "Amazon Kinesis Data Streams with AWS Glue: Incorrect. Kinesis Data Streams is for real-time streaming ingestion, not for scheduling ETL jobs or reacting to S3 file uploads."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/trigger-job.html", title: "AWS Glue Triggers" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html", title: "Amazon S3 Event Notifications" }
    ]
  },
  {
    id: 4,
    question: "A company maintains a data lake in Amazon S3. Analysts frequently query the data using Amazon Athena, but query performance is poor because data is stored in many small files. Which approach will MOST effectively improve Athena query performance?",
    options: [
      "Enable S3 Transfer Acceleration on the bucket",
      "Convert data to Parquet format and apply Hive-style partitioning",
      "Enable S3 Requester Pays on the bucket",
      "Increase the Athena query concurrency limit"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "Athena performance improves significantly when data is stored in a columnar format like Parquet (which enables predicate pushdown and reduces scanned data) and when data is organized using Hive-style partitioning (which allows Athena to skip irrelevant partitions). Merging small files into larger ones also reduces overhead.",
    optionExplanations: [
      "Enable S3 Transfer Acceleration on the bucket: Incorrect. S3 Transfer Acceleration speeds up data uploads to S3 from distant clients using CloudFront edge locations. It does not affect Athena query performance.",
      "Convert data to Parquet format and apply Hive-style partitioning: ✓ Correct. Parquet's columnar storage allows Athena to read only the columns needed, and Hive partitioning (e.g., year=2024/month=01/) lets Athena skip entire partitions, dramatically reducing data scanned and query time.",
      "Enable S3 Requester Pays on the bucket: Incorrect. Requester Pays is a billing option that shifts data transfer costs to the requester. It has no effect on query performance.",
      "Increase the Athena query concurrency limit: Incorrect. Raising concurrency allows more simultaneous queries but does not improve the performance of a single slow query caused by small files and unpartitioned data."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/partitions.html", title: "Partitioning Data in Athena" },
      { url: "https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html", title: "Columnar Storage Formats" }
    ]
  },
  {
    id: 5,
    question: "A data engineering team needs to catalog metadata for all datasets stored in Amazon S3 and make them queryable via Amazon Athena. The team wants automatic schema discovery whenever new data is added. Which AWS service should they use?",
    options: [
      "AWS Glue Data Catalog with Glue Crawlers",
      "Amazon DynamoDB Streams",
      "Amazon CloudWatch Logs",
      "AWS Config"
    ],
    correctAnswer: 0,
    category: "Data Store Management",
    explanation: "AWS Glue Data Catalog is a fully managed metadata repository. Glue Crawlers automatically scan data stores such as S3, infer schemas, and populate the Data Catalog. Athena uses the Glue Data Catalog as its metastore, enabling SQL queries immediately after crawling.",
    optionExplanations: [
      "AWS Glue Data Catalog with Glue Crawlers: ✓ Correct. Glue Crawlers automatically discover schemas from S3 data sources and register them in the Glue Data Catalog. Athena natively integrates with this catalog, so new datasets become queryable with no manual DDL creation.",
      "Amazon DynamoDB Streams: Incorrect. DynamoDB Streams captures item-level changes in DynamoDB tables. It is not related to S3 schema discovery or metadata cataloging.",
      "Amazon CloudWatch Logs: Incorrect. CloudWatch Logs is a log monitoring and storage service. It does not catalog S3 data schemas or integrate with Athena for analytical queries.",
      "AWS Config: Incorrect. AWS Config records AWS resource configuration changes for compliance and auditing. It does not perform data schema discovery or populate a data catalog."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html", title: "AWS Glue Data Catalog and Crawlers" }
    ]
  },
  {
    id: 6,
    question: "A company stores customer transaction data in Amazon S3. The data must be retained for 7 years for regulatory compliance, but after 90 days it is rarely accessed. The company wants to minimize storage costs while meeting the retention requirement. Which solution achieves this at the LOWEST cost?",
    options: [
      "Store all data in S3 Standard indefinitely",
      "Use an S3 Lifecycle policy to transition objects to S3 Glacier Deep Archive after 90 days",
      "Manually copy data to Amazon EBS after 90 days",
      "Use S3 Intelligent-Tiering for all objects"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "S3 Glacier Deep Archive is the lowest-cost S3 storage class, designed for data accessed once or twice per year. An S3 Lifecycle policy automates the transition from S3 Standard to Glacier Deep Archive after 90 days, reducing storage costs significantly while retaining the data for the required 7-year period.",
    optionExplanations: [
      "Store all data in S3 Standard indefinitely: Incorrect. S3 Standard is the most expensive S3 storage class for infrequently accessed data. Keeping 7 years of data in Standard generates unnecessarily high storage costs.",
      "Use an S3 Lifecycle policy to transition objects to S3 Glacier Deep Archive after 90 days: ✓ Correct. S3 Glacier Deep Archive offers the lowest storage price in S3 (approximately $0.00099 per GB/month). An automated Lifecycle policy moves objects after 90 days without manual intervention, satisfying both cost and compliance requirements.",
      "Manually copy data to Amazon EBS after 90 days: Incorrect. EBS is block storage designed for EC2 workloads. It is significantly more expensive than S3 Glacier for archival storage and requires manual operational effort.",
      "Use S3 Intelligent-Tiering for all objects: Incorrect. S3 Intelligent-Tiering automatically moves data between access tiers. However, its lowest tier (Deep Archive Access) has higher retrieval latency and a monthly monitoring fee per object, making it more expensive than a targeted Lifecycle policy to Glacier Deep Archive for predictably infrequent access."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html", title: "Managing Your Storage Lifecycle" },
      { url: "https://aws.amazon.com/s3/storage-classes/", title: "Amazon S3 Storage Classes" }
    ]
  },
  {
    id: 7,
    question: "A data pipeline writes processed results to Amazon Redshift every hour. A data engineer notices that COPY commands are failing intermittently with permission errors. Which combination of actions should the engineer take to resolve the issue? (Select TWO)",
    options: [
      "Assign an IAM role with s3:GetObject permission to the Redshift cluster",
      "Enable Multi-AZ on the Redshift cluster",
      "Grant the Redshift cluster the sts:AssumeRole permission and associate the IAM role with the cluster",
      "Enable enhanced VPC routing on the Redshift cluster"
    ],
    correctAnswer: [0, 2],
    category: "Data Security and Governance",
    explanation: "For Redshift COPY commands to read from S3, the cluster must have an IAM role attached that has the necessary S3 read permissions. The role must also be associated (attached) to the Redshift cluster, and the cluster's trust policy must allow Redshift to assume the role.",
    optionExplanations: [
      "Assign an IAM role with s3:GetObject permission to the Redshift cluster: ✓ Correct. The IAM role must have at least s3:GetObject (and s3:ListBucket) permissions on the source S3 bucket for the COPY command to succeed.",
      "Enable Multi-AZ on the Redshift cluster: Incorrect. Multi-AZ improves availability and fault tolerance but has no effect on IAM permission errors during COPY operations.",
      "Grant the Redshift cluster the sts:AssumeRole permission and associate the IAM role with the cluster: ✓ Correct. The IAM role must be associated with the Redshift cluster, and the role's trust policy must allow the Redshift service (redshift.amazonaws.com) to assume it. Without this association, the COPY command cannot use the role.",
      "Enable enhanced VPC routing on the Redshift cluster: Incorrect. Enhanced VPC routing forces COPY and UNLOAD traffic through the VPC instead of the internet. While it improves network security, it does not resolve IAM permission errors."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/copy-usage_notes-access-permissions.html", title: "Amazon Redshift COPY: IAM Permissions" }
    ]
  },
  {
    id: 8,
    question: "A company needs to ensure that all personally identifiable information (PII) stored in Amazon S3 is automatically discovered and protected. The security team also wants to receive alerts when PII is found in unexpected buckets. Which AWS service should the data engineer configure?",
    options: [
      "AWS Shield",
      "Amazon Macie",
      "Amazon Inspector",
      "AWS WAF"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "Amazon Macie is a fully managed data security service that uses machine learning to automatically discover, classify, and protect sensitive data in Amazon S3. It can detect PII and other sensitive data types and generate findings that integrate with Amazon EventBridge for automated alerting.",
    optionExplanations: [
      "AWS Shield: Incorrect. AWS Shield is a DDoS protection service. It protects AWS resources from distributed denial-of-service attacks and does not perform data classification or PII detection.",
      "Amazon Macie: ✓ Correct. Macie uses machine learning and pattern matching to automatically discover sensitive data, including PII, in S3 buckets. It generates detailed findings and integrates with EventBridge and SNS to trigger alerts when sensitive data is found in unexpected locations.",
      "Amazon Inspector: Incorrect. Amazon Inspector is a vulnerability assessment service for EC2 instances and container images. It scans for software vulnerabilities and network exposures, not for PII in data stored in S3.",
      "AWS WAF: Incorrect. AWS WAF is a web application firewall that protects web applications from common exploits. It operates at the HTTP layer and does not inspect or classify data stored in S3."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html", title: "What Is Amazon Macie?" }
    ]
  },
  {
    id: 9,
    question: "A data engineer must monitor an AWS Glue ETL job and automatically notify the operations team when the job fails. Which combination of services should the engineer use?",
    options: [
      "Amazon CloudWatch Events (EventBridge) and Amazon SNS",
      "AWS CloudTrail and Amazon SQS",
      "Amazon Kinesis Data Streams and Amazon SES",
      "AWS Config and Amazon CloudWatch Logs"
    ],
    correctAnswer: 0,
    category: "Data Operations and Support",
    explanation: "Amazon EventBridge (formerly CloudWatch Events) can capture AWS Glue job state-change events (such as FAILED or STOPPED). An EventBridge rule can then trigger an SNS topic to send email or SMS notifications to the operations team automatically.",
    optionExplanations: [
      "Amazon CloudWatch Events (EventBridge) and Amazon SNS: ✓ Correct. AWS Glue publishes job run state-change events to EventBridge. An EventBridge rule matching the FAILED state can target an SNS topic, which delivers notifications to subscribed email addresses or SMS endpoints immediately when the job fails.",
      "AWS CloudTrail and Amazon SQS: Incorrect. CloudTrail records API calls for auditing but is not designed for real-time job state monitoring. SQS is a message queue that would require a consumer to poll for messages; it does not send push notifications to an operations team.",
      "Amazon Kinesis Data Streams and Amazon SES: Incorrect. Kinesis Data Streams is for streaming data ingestion, not job monitoring. SES is an email sending service but lacks native integration with Glue job events for automated alerting.",
      "AWS Config and Amazon CloudWatch Logs: Incorrect. AWS Config tracks resource configuration changes for compliance. CloudWatch Logs stores log output but does not natively send alerts based on Glue job failure states without additional custom configuration."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/monitoring-awsglue-with-cloudwatch-events.html", title: "Automating AWS Glue with EventBridge" }
    ]
  },
  {
    id: 10,
    question: "A data engineer is designing a data pipeline that ingests IoT sensor readings into Amazon DynamoDB. Downstream analytics applications must read the same records in near real-time without impacting the write performance of DynamoDB. Which approach should the engineer use?",
    options: [
      "Configure DynamoDB read replicas for the analytics applications",
      "Use DynamoDB Streams to capture change events and process them with AWS Lambda",
      "Schedule periodic Amazon Athena queries against DynamoDB",
      "Export DynamoDB data to Amazon S3 every minute using AWS DataSync"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "DynamoDB Streams captures a time-ordered sequence of item-level modifications in a DynamoDB table. Lambda can be configured as a stream consumer to process these events in near real-time, decoupling the analytics workload from the primary write path and avoiding additional read capacity consumption on the table.",
    optionExplanations: [
      "Configure DynamoDB read replicas for the analytics applications: Incorrect. DynamoDB does not support traditional read replicas like Amazon RDS. DynamoDB global tables provide multi-region replication, but they are not designed as a read-replica pattern for analytics isolation.",
      "Use DynamoDB Streams to capture change events and process them with AWS Lambda: ✓ Correct. DynamoDB Streams records every write operation (INSERT, MODIFY, REMOVE) as a stream record. Lambda polls the stream and processes records in near real-time. This pattern keeps analytics processing completely separate from the DynamoDB table's provisioned capacity.",
      "Schedule periodic Amazon Athena queries against DynamoDB: Incorrect. Athena cannot query DynamoDB directly. It queries data in S3, the Glue Data Catalog, and other supported sources, not live DynamoDB tables.",
      "Export DynamoDB data to Amazon S3 every minute using AWS DataSync: Incorrect. AWS DataSync is for transferring files between storage systems (on-premises NFS/SMB to S3, EFS, FSx). It does not export DynamoDB table data. The DynamoDB Point-in-Time Recovery (PITR) export feature can export to S3, but only at hourly or longer intervals, not every minute."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html", title: "Change Data Capture for DynamoDB Streams" },
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.html", title: "Using AWS Lambda Triggers with DynamoDB Streams" }
    ]
  },
  {
    id: 11,
    question: "A company is running an Amazon EMR cluster to process large datasets stored in Amazon S3. The cluster is idle for 16 hours per day (nights and weekends) but must remain available for ad-hoc jobs at any time. Which cost optimization strategy should the data engineer apply?",
    options: [
      "Replace all On-Demand core nodes with Spot Instances",
      "Use EMR managed scaling with On-Demand master/core nodes and Spot Instance task nodes",
      "Terminate the cluster every night and recreate it manually each morning",
      "Migrate the workload to Amazon Redshift to avoid EMR costs"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "EMR managed scaling automatically adjusts the number of task nodes based on workload demand. Using Spot Instances only for task nodes (which process data but do not store HDFS metadata) minimizes cost without risking data loss, while On-Demand instances ensure the cluster remains stable and available at all times.",
    optionExplanations: [
      "Replace all On-Demand core nodes with Spot Instances: Incorrect. Core nodes store HDFS data. If a Spot Instance is reclaimed, data stored on that node can be lost, potentially causing job failures and data corruption.",
      "Use EMR managed scaling with On-Demand master/core nodes and Spot Instance task nodes: ✓ Correct. This is the AWS-recommended cost optimization pattern for EMR. Task nodes do not host HDFS data, so Spot interruptions do not cause data loss. Managed scaling adds and removes task nodes automatically based on YARN metrics, reducing costs during idle periods.",
      "Terminate the cluster every night and recreate it manually each morning: Incorrect. Manual cluster recreation is operationally burdensome and error-prone. It also does not address weekend availability and introduces delays when ad-hoc jobs are needed.",
      "Migrate the workload to Amazon Redshift to avoid EMR costs: Incorrect. Redshift and EMR serve different use cases. Redshift is optimized for structured SQL analytics, while EMR is designed for distributed processing frameworks like Spark and Hive. Migrating solely for cost reasons ignores architectural fit."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-managed-scaling.html", title: "Using EMR Managed Scaling" },
      { url: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-instances-guidelines.html", title: "Guidelines for Instance Fleets and Instance Groups" }
    ]
  },
  {
    id: 12,
    question: "A data engineer must build a serverless pipeline that reads records from an Amazon Kinesis Data Stream, enriches each record by looking up data in Amazon DynamoDB, and writes results to Amazon S3. Which AWS service should orchestrate the per-record processing logic?",
    options: [
      "AWS Glue Streaming ETL",
      "AWS Lambda with a Kinesis trigger",
      "Amazon Kinesis Data Firehose alone",
      "AWS Step Functions"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Lambda can be configured to poll a Kinesis Data Stream as an event source. For each batch of records, Lambda invokes a function that can query DynamoDB for enrichment data and write the result to S3. This is a fully serverless, per-record processing pattern with no infrastructure to manage.",
    optionExplanations: [
      "AWS Glue Streaming ETL: Incorrect. Glue Streaming ETL can read from Kinesis, but it operates on micro-batches in a Spark Streaming job and is better suited for larger transformation workloads. It also requires a Glue Data Catalog table definition for the stream, adding overhead for a simple per-record enrichment use case.",
      "AWS Lambda with a Kinesis trigger: ✓ Correct. Lambda natively supports Kinesis Data Streams as an event source. It processes batches of records serverlessly, allowing per-record DynamoDB lookups and direct S3 writes. It scales automatically with shard count and requires zero server management.",
      "Amazon Kinesis Data Firehose alone: Incorrect. Kinesis Data Firehose can deliver records to S3 and optionally invoke a Lambda for transformation, but Firehose itself cannot perform DynamoDB lookups natively. Using Firehose alone does not fulfill the enrichment requirement.",
      "AWS Step Functions: Incorrect. Step Functions orchestrates multi-step workflows and is not designed to act as a per-record stream consumer. It would require external triggers for each record, making it impractical for high-throughput Kinesis stream processing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html", title: "Using AWS Lambda with Amazon Kinesis" }
    ]
  },
  {
    id: 13,
    question: "An analytics team runs ad-hoc SQL queries against data stored in Amazon S3 using Amazon Athena. The queries are slow because they scan entire datasets on every run. The data is partitioned by date but the Glue Data Catalog partition metadata is not being updated automatically when new data arrives. Which solution fixes this with the LEAST effort?",
    options: [
      "Run MSCK REPAIR TABLE in Athena after each data load",
      "Configure an AWS Glue Crawler to run on a schedule after each data load and update the catalog partitions automatically",
      "Recreate the Athena table with a CTAS (Create Table As Select) statement daily",
      "Switch to Amazon Redshift Spectrum to avoid partition management"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "An AWS Glue Crawler automatically scans new S3 prefixes, detects new partitions, and updates the Glue Data Catalog. Scheduling the crawler to run shortly after each data load ensures Athena always has up-to-date partition metadata without manual intervention.",
    optionExplanations: [
      "Run MSCK REPAIR TABLE in Athena after each data load: Incorrect. While MSCK REPAIR TABLE does update Hive-style partitions, it requires manual execution after each load and can be slow on large datasets with many partitions. It introduces manual operational steps rather than automating the process.",
      "Configure an AWS Glue Crawler to run on a schedule after each data load and update the catalog partitions automatically: ✓ Correct. A scheduled Glue Crawler automatically discovers new S3 prefixes that correspond to new partitions and updates the Data Catalog accordingly. Athena then uses the updated metadata to prune partitions, improving query performance without any manual intervention.",
      "Recreate the Athena table with a CTAS statement daily: Incorrect. CTAS creates a new table from query results. Running it daily to refresh metadata is operationally complex, wastes S3 storage by writing duplicate data, and does not solve the root cause of missing partition metadata.",
      "Switch to Amazon Redshift Spectrum to avoid partition management: Incorrect. Redshift Spectrum also reads from S3 and also relies on the Glue Data Catalog or an external Hive metastore. Switching does not eliminate partition management and introduces Redshift cluster costs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html", title: "Defining Crawlers in AWS Glue" },
      { url: "https://docs.aws.amazon.com/athena/latest/ug/partitions.html", title: "Partitioning Data in Athena" }
    ]
  },
  {
    id: 14,
    question: "A company needs to replicate data from an on-premises Oracle database to Amazon Redshift in near real-time to support business intelligence dashboards. Which AWS service is BEST suited for this continuous replication?",
    options: [
      "AWS Snowball Edge",
      "AWS Database Migration Service (AWS DMS) with ongoing replication",
      "Amazon AppFlow",
      "AWS DataSync"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "AWS DMS supports continuous data replication using Change Data Capture (CDC). After an initial full load, DMS captures ongoing changes from the Oracle source and applies them to Amazon Redshift, keeping the target in sync with the source in near real-time with minimal latency.",
    optionExplanations: [
      "AWS Snowball Edge: Incorrect. AWS Snowball Edge is a physical edge computing and data transfer device used for large-scale offline data migration. It is not suitable for continuous near-real-time replication.",
      "AWS Database Migration Service (AWS DMS) with ongoing replication: ✓ Correct. AWS DMS is specifically designed for heterogeneous and homogeneous database migration and ongoing replication. Using CDC mode, it captures insert, update, and delete operations from Oracle and continuously applies them to Redshift, enabling near-real-time synchronization.",
      "Amazon AppFlow: Incorrect. Amazon AppFlow is designed to transfer data between SaaS applications (Salesforce, ServiceNow, etc.) and AWS services. It does not support Oracle databases as a source for continuous CDC replication.",
      "AWS DataSync: Incorrect. AWS DataSync transfers files and objects between storage systems (NFS, SMB, S3, EFS). It is not designed for relational database replication or CDC from an Oracle source."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html", title: "Using Change Data Capture (CDC) in AWS DMS" }
    ]
  },
  {
    id: 15,
    question: "A data engineer is designing a data model in Amazon DynamoDB for an application that needs to retrieve all orders for a specific customer sorted by order date. The table uses customer_id as the partition key and order_id as the sort key. Which approach allows efficient retrieval of orders by customer sorted by date?",
    options: [
      "Perform a full table Scan and filter by customer_id in the application",
      "Add a Local Secondary Index (LSI) using order_date as the sort key",
      "Create a Global Secondary Index (GSI) with customer_id as the partition key and order_date as the sort key",
      "Store all orders in a single item with a list attribute and parse dates in the application"
    ],
    correctAnswer: 2,
    category: "Data Store Management",
    explanation: "A Global Secondary Index (GSI) with customer_id as the partition key and order_date as the sort key allows efficient Query operations that return all orders for a specific customer in date order. Because the base table already uses order_id as the sort key, a GSI is needed rather than an LSI (which would require the same partition key as the base table and be limited to 10 GB per partition key value).",
    optionExplanations: [
      "Perform a full table Scan and filter by customer_id in the application: Incorrect. A Scan reads every item in the table, consuming all provisioned read capacity and becoming progressively slower as the table grows. This is the least efficient DynamoDB access pattern.",
      "Add a Local Secondary Index (LSI) using order_date as the sort key: Incorrect. An LSI shares the same partition key (customer_id) as the base table and uses order_date as an alternate sort key. This would work structurally, but LSIs must be created at table creation time and are limited to 10 GB of data per partition key value. A GSI is more flexible for this access pattern.",
      "Create a Global Secondary Index (GSI) with customer_id as the partition key and order_date as the sort key: ✓ Correct. A GSI with customer_id as partition key and order_date as sort key allows a Query operation to retrieve all orders for a given customer sorted by date. GSIs can be added to existing tables and have no per-partition size limit.",
      "Store all orders in a single item with a list attribute and parse dates in the application: Incorrect. DynamoDB items have a maximum size of 400 KB. Storing all orders in a single item will hit this limit as data grows and requires full item reads for every query, which is inefficient and does not scale."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html", title: "Global Secondary Indexes in DynamoDB" }
    ]
  },
  {
    id: 16,
    question: "A data pipeline stores sensitive financial records encrypted at rest in Amazon S3 using AWS KMS customer-managed keys (CMKs). A compliance requirement mandates that all encryption key usage must be auditable. Which AWS service provides a complete audit trail of all KMS key usage?",
    options: [
      "AWS Config",
      "Amazon CloudWatch Metrics",
      "AWS CloudTrail",
      "Amazon Macie"
    ],
    correctAnswer: 2,
    category: "Data Security and Governance",
    explanation: "AWS CloudTrail records all API calls made to AWS services, including every Encrypt, Decrypt, GenerateDataKey, and other KMS API operations. These logs provide a complete, tamper-evident audit trail of who used which KMS key, when, and from where, satisfying compliance mandates.",
    optionExplanations: [
      "AWS Config: Incorrect. AWS Config records the configuration state and changes of AWS resources (e.g., whether a CMK is enabled or its key policy changed). It does not log individual encrypt/decrypt operations or key usage events.",
      "Amazon CloudWatch Metrics: Incorrect. CloudWatch Metrics for KMS provides aggregate counts of API requests but does not record per-call details such as the IAM principal, source IP, or specific data key that was generated.",
      "AWS CloudTrail: ✓ Correct. CloudTrail captures every KMS API call — including the caller's identity, timestamp, source IP, request parameters, and response — in log files stored in S3. These logs are the standard mechanism for auditing KMS key usage and satisfying regulatory requirements.",
      "Amazon Macie: Incorrect. Amazon Macie discovers and classifies sensitive data in S3. It does not monitor or log KMS key usage operations."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/logging-using-cloudtrail.html", title: "Logging AWS KMS API Calls with AWS CloudTrail" }
    ]
  },
  {
    id: 17,
    question: "A company wants to implement column-level security in Amazon Redshift so that analysts can query a table but cannot see a column containing salary data. Which feature should the data engineer use?",
    options: [
      "Create a separate S3 bucket for salary data and restrict bucket access with an S3 bucket policy",
      "Use Amazon Redshift column-level access control to REVOKE SELECT on the salary column from the analyst role",
      "Encrypt the salary column with a different KMS key and share only the other key with analysts",
      "Use Amazon Macie to mask the salary column in query results"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "Amazon Redshift supports column-level access control, allowing administrators to GRANT or REVOKE SELECT privileges on individual columns. By revoking SELECT on the salary column from the analyst role or user group, the column is hidden from their queries while the rest of the table remains accessible.",
    optionExplanations: [
      "Create a separate S3 bucket for salary data and restrict bucket access with an S3 bucket policy: Incorrect. Splitting a single Redshift table into S3 buckets based on column sensitivity fundamentally changes the data architecture and would require rebuilding the table. This is not column-level security — it is a data restructuring workaround.",
      "Use Amazon Redshift column-level access control to REVOKE SELECT on the salary column from the analyst role: ✓ Correct. Redshift supports fine-grained column-level access control via standard SQL GRANT/REVOKE statements. Revoking SELECT on a specific column prevents users from including that column in any SELECT query while leaving the rest of the table accessible.",
      "Encrypt the salary column with a different KMS key and share only the other key with analysts: Incorrect. Redshift data-at-rest encryption applies to the entire database, not individual columns. You cannot encrypt individual columns with separate KMS keys in Redshift.",
      "Use Amazon Macie to mask the salary column in query results: Incorrect. Amazon Macie is a data security service that detects sensitive data in S3. It does not integrate with Redshift query execution to dynamically mask column values in query results."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/r_GRANT-examples.html", title: "GRANT Examples in Amazon Redshift" },
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/t_column-level-security.html", title: "Column-Level Access Control in Redshift" }
    ]
  },
  {
    id: 18,
    question: "A data engineer needs to validate data quality in an AWS Glue ETL job. Specifically, they must check that no NULL values exist in a required column and that all values in a numeric column fall within an expected range. Which AWS service or feature provides built-in, configurable data quality rules for this purpose?",
    options: [
      "Amazon CloudWatch Alarms",
      "AWS Glue Data Quality",
      "Amazon Inspector",
      "AWS Config Rules"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "AWS Glue Data Quality allows data engineers to define and evaluate data quality rules using the Data Quality Definition Language (DQDL). Rules such as IsComplete (no NULLs) and ColumnValues within a range can be applied directly within a Glue ETL job, with results published to CloudWatch and optional job failure on rule violations.",
    optionExplanations: [
      "Amazon CloudWatch Alarms: Incorrect. CloudWatch Alarms monitor metric thresholds (e.g., CPU utilization, error counts). They can alert on infrastructure metrics but do not evaluate data content rules such as NULL checks or value range validations within a dataset.",
      "AWS Glue Data Quality: ✓ Correct. AWS Glue Data Quality is a native Glue feature that lets engineers define DQDL rules (e.g., IsComplete, ColumnValues between X and Y) and evaluate them within ETL jobs. Failing rules can halt the job or publish findings to CloudWatch, enabling automated data quality enforcement.",
      "Amazon Inspector: Incorrect. Amazon Inspector is a vulnerability assessment service for EC2 instances and container images. It has no capability to evaluate data content quality within ETL pipelines.",
      "AWS Config Rules: Incorrect. AWS Config Rules evaluate AWS resource configurations for compliance (e.g., whether S3 versioning is enabled). They do not inspect data values within datasets stored in data stores."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html", title: "AWS Glue Data Quality" }
    ]
  },
  {
    id: 19,
    question: "A company's data lake in Amazon S3 is used by multiple teams across different AWS accounts. A central data governance team wants to manage fine-grained table and column-level permissions across all accounts from a single place. Which AWS service enables this centralized permission management?",
    options: [
      "Amazon S3 bucket policies applied per account",
      "AWS Lake Formation",
      "Amazon Cognito",
      "AWS Organizations Service Control Policies (SCPs)"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "AWS Lake Formation provides a centralized permissions model for data lakes. It allows administrators to grant table-level and column-level access to IAM principals and across AWS accounts using Lake Formation cross-account sharing, replacing the need to manage complex S3 bucket policies and IAM policies for every team.",
    optionExplanations: [
      "Amazon S3 bucket policies applied per account: Incorrect. S3 bucket policies operate at the object/prefix level and do not understand table or column semantics. Managing per-account bucket policies for many teams and datasets becomes complex, error-prone, and does not enforce column-level access control.",
      "AWS Lake Formation: ✓ Correct. Lake Formation sits on top of S3 and the Glue Data Catalog to provide database-, table-, column-, and row-level access control for data lakes. Cross-account data sharing lets the central governance team grant permissions to principals in other AWS accounts through the Lake Formation console or API, from a single location.",
      "Amazon Cognito: Incorrect. Amazon Cognito is an identity service for web and mobile applications that handles user sign-up, sign-in, and access control. It is not designed for managing data lake table or column permissions.",
      "AWS Organizations Service Control Policies (SCPs): Incorrect. SCPs set permission guardrails at the AWS account or organizational unit level. They restrict what IAM actions are allowed but do not provide the granular table- or column-level data access control needed for data lake governance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html", title: "What Is AWS Lake Formation?" },
      { url: "https://docs.aws.amazon.com/lake-formation/latest/dg/cross-account-permissions.html", title: "Lake Formation Cross-Account Data Sharing" }
    ]
  },
  {
    id: 20,
    question: "A data engineer must set up a pipeline to process Apache server access logs stored in Amazon S3. The logs need to be parsed, aggregated by response code per hour, and stored in Amazon Redshift for dashboarding. The pipeline must run automatically whenever new log files arrive. Which architecture achieves this with MINIMAL operational overhead?",
    options: [
      "Amazon S3 Event Notification → AWS Lambda → Amazon Redshift COPY",
      "Amazon S3 Event Notification → Amazon EventBridge → AWS Glue ETL job → Amazon Redshift",
      "Scheduled Amazon EC2 cron job that polls S3 and runs a Python ETL script",
      "Amazon Kinesis Data Streams → AWS Lambda → Amazon RDS"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "Amazon EventBridge can receive S3 Event Notifications when new objects are created and trigger an AWS Glue ETL job. Glue serverlessly parses and aggregates the log data and loads the results into Redshift. This fully serverless, event-driven architecture requires no infrastructure management and scales automatically.",
    optionExplanations: [
      "Amazon S3 Event Notification → AWS Lambda → Amazon Redshift COPY: Incorrect. Lambda has a 15-minute execution timeout and 10 GB memory limit. For large log files or many files arriving simultaneously, Lambda cannot reliably handle the full ETL (parse, aggregate, load) within these constraints. A dedicated ETL service is more appropriate.",
      "Amazon S3 Event Notification → Amazon EventBridge → AWS Glue ETL job → Amazon Redshift: ✓ Correct. S3 Event Notifications publish object-creation events to EventBridge. An EventBridge rule triggers a Glue job that serverlessly parses the logs, performs hour-based aggregation, and loads results into Redshift using the COPY command. The entire pipeline is serverless and event-driven with no servers to manage.",
      "Scheduled Amazon EC2 cron job that polls S3 and runs a Python ETL script: Incorrect. Running EC2 instances continuously to poll S3 incurs unnecessary compute costs even when no new files arrive. This approach requires OS patching, instance management, and manual scaling — the highest operational overhead of all options.",
      "Amazon Kinesis Data Streams → AWS Lambda → Amazon RDS: Incorrect. This architecture uses Kinesis for streaming ingestion, which is not appropriate for batch log files already at rest in S3. Additionally, Amazon RDS is a transactional database not optimized for the columnar analytics and dashboarding use case described."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-s3-object-created-tutorial.html", title: "Tutorial: Using EventBridge with Amazon S3" },
      { url: "https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-glue-arguments.html", title: "AWS Glue ETL Jobs" }
    ]
  },
  {
    id: 21,
    question: "A company uses AWS Glue to run nightly ETL jobs that transform raw data in Amazon S3. A data engineer notices that a Glue job is consistently failing after 2 hours with an out-of-memory error when processing a large partition. Which TWO actions should the engineer take to resolve this issue? (Select TWO)",
    options: [
      "Increase the number of Glue DPUs (Data Processing Units) allocated to the job",
      "Enable Glue job bookmarks to skip already-processed data",
      "Enable Spark UI monitoring and use the Glue job profiling feature to identify data skew",
      "Switch the Glue job from Spark to Python Shell"
    ],
    correctAnswer: [0, 2],
    category: "Data Operations and Support",
    explanation: "Out-of-memory errors in Glue Spark jobs are typically caused by insufficient DPUs or data skew where one partition is disproportionately large. Increasing DPUs adds more executors and memory, and identifying data skew through Spark UI lets the engineer re-partition data evenly to prevent a single executor from being overloaded.",
    optionExplanations: [
      "Increase the number of Glue DPUs (Data Processing Units) allocated to the job: ✓ Correct. Each DPU provides 4 vCPUs and 16 GB of memory for Spark executors. Increasing DPUs distributes the workload across more executors, reducing the memory pressure on any single node.",
      "Enable Glue job bookmarks to skip already-processed data: Incorrect. Glue job bookmarks track which data has been processed to avoid reprocessing on re-runs. While useful for incremental loads, bookmarks do not address memory errors caused by large partitions currently being processed.",
      "Enable Spark UI monitoring and use the Glue job profiling feature to identify data skew: ✓ Correct. Data skew occurs when one partition is far larger than others, overwhelming a single executor. The Glue Spark UI shows stage-level metrics and task durations that reveal skewed partitions. Once identified, the engineer can apply repartitioning (e.g., repartition() or salting) to distribute the load evenly.",
      "Switch the Glue job from Spark to Python Shell: Incorrect. Python Shell jobs run on a single node with limited memory (up to 1 DPU = 16 GB). Switching from Spark to Python Shell makes the memory problem worse, as all data would be processed on a single machine rather than distributed across a cluster."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/monitor-profile-glue-job-cloudwatch-metrics.html", title: "Monitoring AWS Glue Jobs with CloudWatch" },
      { url: "https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-glue-data-types.html", title: "AWS Glue DPU Capacity" }
    ]
  },
  {
    id: 22,
    question: "A retail company wants to analyze customer purchase history stored in Amazon Redshift alongside product catalog data stored in Amazon S3. Queries should JOIN data across both stores without moving S3 data into Redshift. Which feature enables this?",
    options: [
      "Amazon Redshift Spectrum",
      "Amazon Athena Federated Query",
      "AWS Glue DataBrew",
      "Amazon EMR with HDFS"
    ],
    correctAnswer: 0,
    category: "Data Store Management",
    explanation: "Amazon Redshift Spectrum allows Redshift to query data stored in Amazon S3 directly using external tables, without loading that data into Redshift. SQL JOIN queries can reference both native Redshift tables and Spectrum external tables in the same query, making it ideal for this hybrid scenario.",
    optionExplanations: [
      "Amazon Redshift Spectrum: ✓ Correct. Redshift Spectrum extends Redshift queries to S3 by using the Glue Data Catalog as its metastore. External tables point to S3 data, and Redshift's query planner pushes predicate and projection processing down to Spectrum nodes, enabling JOIN operations between Redshift native tables and S3 data in a single SQL query.",
      "Amazon Athena Federated Query: Incorrect. Athena Federated Query allows Athena to query external data sources (RDS, DynamoDB, etc.) using Lambda-based connectors. It does not support federated JOINs between Redshift and S3 in the way Redshift Spectrum does natively within Redshift.",
      "AWS Glue DataBrew: Incorrect. AWS Glue DataBrew is a visual data preparation tool for cleaning and normalizing data. It does not execute SQL JOIN queries across Redshift and S3 in a single query.",
      "Amazon EMR with HDFS: Incorrect. EMR with HDFS would require copying data from both Redshift and S3 into HDFS, adding data movement overhead and operational complexity — the opposite of the requirement to avoid moving S3 data."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html", title: "Using Amazon Redshift Spectrum to Query External Data" }
    ]
  },
  {
    id: 23,
    question: "A data engineer is implementing an ETL pipeline using AWS Step Functions to coordinate multiple Lambda functions and an AWS Glue job. The pipeline must retry failed Glue jobs up to 3 times with a 5-minute wait between each retry, and then send an SNS alert if all retries are exhausted. Which Step Functions feature handles the retry and error notification logic?",
    options: [
      "Step Functions Activity Tasks with a heartbeat timeout",
      "Retry and Catch fields in the State Machine task definition",
      "A separate Lambda function that polls the Glue job status in a loop",
      "Step Functions Express Workflows with synchronous execution"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Step Functions natively supports Retry and Catch configurations on each task state. The Retry field specifies the maximum number of attempts and the interval between retries. The Catch field defines a fallback state (such as invoking SNS) that is executed when all retries are exhausted, without any custom polling logic.",
    optionExplanations: [
      "Step Functions Activity Tasks with a heartbeat timeout: Incorrect. Activity Tasks allow workers external to Step Functions to pull and process tasks. Heartbeat timeouts detect stalled workers but are not related to retry-on-failure logic for Glue jobs managed by Step Functions.",
      "Retry and Catch fields in the State Machine task definition: ✓ Correct. The Retry field on a Task state accepts an array of retry configurations specifying ErrorEquals, IntervalSeconds, MaxAttempts, and BackoffRate. After all retries are exhausted, the Catch field routes execution to a fallback state — in this case, an SNS publish task — making this a native, zero-code solution.",
      "A separate Lambda function that polls the Glue job status in a loop: Incorrect. Polling via Lambda is a manual anti-pattern when using Step Functions. It adds latency, consumes Lambda execution time unnecessarily, and duplicates functionality that Step Functions provides natively through its Retry/Catch mechanism.",
      "Step Functions Express Workflows with synchronous execution: Incorrect. Express Workflows are optimized for high-volume, short-duration workloads (up to 5 minutes). A Glue job that may need up to 3 retries with 5-minute waits could exceed 15 minutes total, requiring Standard Workflows. Additionally, Express Workflows do not change how Retry/Catch works."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html", title: "Error Handling in Step Functions" }
    ]
  },
  {
    id: 24,
    question: "A company stores application logs in Amazon CloudWatch Logs and needs to run ad-hoc SQL-like queries against them for operational analysis without exporting the data. Which AWS service should the data engineer use?",
    options: [
      "Amazon Athena with an S3 export of CloudWatch Logs",
      "Amazon CloudWatch Logs Insights",
      "AWS Glue DataBrew",
      "Amazon OpenSearch Service"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "Amazon CloudWatch Logs Insights is an interactive query service built directly into CloudWatch Logs. It supports a SQL-like query language to filter, aggregate, and visualize log data without any data export or ETL. Queries run in seconds against any log group.",
    optionExplanations: [
      "Amazon Athena with an S3 export of CloudWatch Logs: Incorrect. While Athena can query CloudWatch Logs data exported to S3, this requires setting up a log export task, waiting for the export to complete, and then running Athena queries — adding latency and operational steps that are unnecessary for ad-hoc analysis.",
      "Amazon CloudWatch Logs Insights: ✓ Correct. CloudWatch Logs Insights is natively integrated with CloudWatch Logs and requires no infrastructure setup or data movement. Its query language supports filter, fields, stats, sort, and limit commands, enabling powerful ad-hoc operational analysis directly on live log groups in seconds.",
      "AWS Glue DataBrew: Incorrect. Glue DataBrew is a visual data preparation tool for cleaning and transforming datasets loaded from S3 or data stores. It does not query CloudWatch Logs directly.",
      "Amazon OpenSearch Service: Incorrect. OpenSearch Service provides full-text search and analytics for log data, but setting it up requires ingesting logs into an OpenSearch domain (typically via a Kinesis Firehose or Lambda pipeline). It is not an ad-hoc, no-setup solution for existing CloudWatch Logs data."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html", title: "CloudWatch Logs Insights Query Syntax" }
    ]
  },
  {
    id: 25,
    question: "A data engineer must ensure that data written to an Amazon S3 bucket used as a data lake cannot be deleted or overwritten for a minimum of 7 years to comply with financial regulations. Which S3 feature enforces this requirement?",
    options: [
      "S3 Versioning with MFA Delete",
      "S3 Object Lock in Compliance mode with a 7-year retention period",
      "An S3 bucket policy that denies the s3:DeleteObject action for all users",
      "Amazon S3 Glacier Vault Lock"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "S3 Object Lock in Compliance mode prevents any user — including the root account — from deleting or overwriting objects before the retention period expires. Once set, the retention period cannot be shortened or removed, making it the appropriate mechanism for meeting strict regulatory immutability requirements.",
    optionExplanations: [
      "S3 Versioning with MFA Delete: Incorrect. MFA Delete requires multi-factor authentication to permanently delete object versions, but a sufficiently privileged user who has the MFA device can still delete objects. It does not enforce a time-based retention period and does not meet strict regulatory immutability requirements.",
      "S3 Object Lock in Compliance mode with a 7-year retention period: ✓ Correct. S3 Object Lock Compliance mode locks objects for the specified retention period and cannot be overridden by any user, including the AWS account root. Objects cannot be deleted or modified until the retention period expires, directly satisfying WORM (Write Once Read Many) financial compliance mandates.",
      "An S3 bucket policy that denies the s3:DeleteObject action for all users: Incorrect. An IAM bucket policy can be modified or overridden by a sufficiently privileged administrator or the root account. It does not provide the tamper-proof, time-locked retention enforcement that Object Lock Compliance mode provides.",
      "Amazon S3 Glacier Vault Lock: Incorrect. Glacier Vault Lock enforces WORM policies for Amazon S3 Glacier vaults (not S3 buckets). For data stored in S3, S3 Object Lock is the correct mechanism. Glacier Vault Lock applies to archives stored via the Glacier API, not to S3 objects."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html", title: "Using S3 Object Lock" }
    ]
  },
  {
    id: 26,
    question: "A data engineer is optimizing an Amazon Redshift cluster that runs complex analytical queries. The team reports that queries involving large table JOINs are slow due to data redistribution across nodes. The two tables being joined are both large. Which distribution style should the engineer apply to minimize data movement during the JOIN?",
    options: [
      "Set both tables to DISTSTYLE ALL",
      "Set both tables to DISTSTYLE EVEN",
      "Set both tables to DISTSTYLE KEY using the JOIN column as the distribution key",
      "Set one table to DISTSTYLE AUTO and the other to DISTSTYLE ALL"
    ],
    correctAnswer: 2,
    category: "Data Store Management",
    explanation: "When two large tables are joined on the same column, setting both tables to DISTSTYLE KEY with the JOIN column as the distribution key ensures that matching rows are co-located on the same Redshift node. This eliminates inter-node data redistribution during the JOIN, resulting in significant performance improvement.",
    optionExplanations: [
      "Set both tables to DISTSTYLE ALL: Incorrect. DISTSTYLE ALL copies the entire table to every node. This is suitable for small dimension tables, but for two large tables it would consume enormous storage on every node and slow down write operations — not appropriate for large table JOINs.",
      "Set both tables to DISTSTYLE EVEN: Incorrect. DISTSTYLE EVEN distributes rows round-robin across all nodes regardless of values. While it balances storage, rows that need to be joined are unlikely to reside on the same node, causing network-intensive redistribution during JOIN execution.",
      "Set both tables to DISTSTYLE KEY using the JOIN column as the distribution key: ✓ Correct. DISTSTYLE KEY hashes rows by the distribution key value, ensuring all rows with the same key land on the same node. When both tables share the same distribution key (the JOIN column), Redshift can perform a collocated JOIN with no data redistribution across the network.",
      "Set one table to DISTSTYLE AUTO and the other to DISTSTYLE ALL: Incorrect. DISTSTYLE AUTO lets Redshift choose the distribution style based on table size. Mixing AUTO on one table and ALL on the other does not guarantee key-based co-location of JOIN rows. For two known large tables joined on a specific column, explicit KEY distribution on both is the best approach."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/c_choosing_dist_sort.html", title: "Choosing a Data Distribution Style in Amazon Redshift" }
    ]
  },
  {
    id: 27,
    question: "A company must transfer 500 TB of historical data from an on-premises data center to Amazon S3. The on-premises network bandwidth is limited to 100 Mbps and is shared with production traffic. The migration must complete within 2 weeks. Which AWS service should the data engineer use?",
    options: [
      "AWS DataSync over the existing internet connection",
      "AWS Snowball Edge Storage Optimized device",
      "Amazon S3 Transfer Acceleration",
      "AWS Direct Connect with a 1 Gbps dedicated connection"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "At 100 Mbps shared bandwidth, transferring 500 TB over the network would take approximately 46 days — far exceeding the 2-week deadline. AWS Snowball Edge Storage Optimized devices hold up to 80 TB each, so 7 devices would cover 500 TB. Physical shipment and ingestion into S3 typically completes within days, well within the 2-week window.",
    optionExplanations: [
      "AWS DataSync over the existing internet connection: Incorrect. DataSync optimizes data transfers over the network but is still constrained by available bandwidth. At 100 Mbps (shared with production), the effective throughput for migration may be far lower, making it impossible to transfer 500 TB within 2 weeks.",
      "AWS Snowball Edge Storage Optimized device: ✓ Correct. Snowball Edge Storage Optimized devices are purpose-built for large offline data migrations. Each device stores up to 80 TB. Ordering multiple devices, loading data locally at full local network speed, and shipping them to AWS bypasses internet bandwidth constraints entirely, completing the migration within the required timeframe.",
      "Amazon S3 Transfer Acceleration: Incorrect. S3 Transfer Acceleration routes uploads through AWS CloudFront edge locations to improve upload speeds from distant clients. However, it still uses the same 100 Mbps internet connection as the bottleneck and cannot transfer 500 TB within 2 weeks given the bandwidth limitation.",
      "AWS Direct Connect with a 1 Gbps dedicated connection: Incorrect. Provisioning a Direct Connect circuit typically takes weeks to months for physical installation. Even if available, a 1 Gbps connection shared with production traffic may not provide enough bandwidth to transfer 500 TB within the 2-week window."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html", title: "What Is AWS Snowball Edge?" }
    ]
  },
  {
    id: 28,
    question: "A data pipeline stores database credentials (username and password) needed to connect to an Amazon RDS instance. A data engineer must ensure these credentials are stored securely, automatically rotated every 30 days, and accessible to an AWS Lambda function without hardcoding values. Which AWS service should be used?",
    options: [
      "AWS Systems Manager Parameter Store (Standard tier)",
      "An encrypted environment variable in the Lambda function configuration",
      "AWS Secrets Manager with automatic rotation enabled",
      "Amazon S3 with server-side encryption"
    ],
    correctAnswer: 2,
    category: "Data Security and Governance",
    explanation: "AWS Secrets Manager is designed specifically for managing application secrets such as database credentials. It supports native automatic rotation for RDS, Redshift, and DocumentDB using built-in Lambda rotation functions. Lambda functions can retrieve the current secret value at runtime via the Secrets Manager API, eliminating hardcoded credentials.",
    optionExplanations: [
      "AWS Systems Manager Parameter Store (Standard tier): Incorrect. Parameter Store can store secrets as SecureString parameters with KMS encryption, but it does not natively support automatic credential rotation. Manual rotation would require custom Lambda functions and scheduled EventBridge rules, adding operational overhead compared to Secrets Manager.",
      "An encrypted environment variable in the Lambda function configuration: Incorrect. Lambda environment variables can be encrypted with KMS, but the credential value is static and embedded in the function configuration. Rotating credentials requires manually updating the environment variable and redeploying the function — not automatic rotation.",
      "AWS Secrets Manager with automatic rotation enabled: ✓ Correct. Secrets Manager stores the credentials encrypted with KMS, provides an API for Lambda to retrieve the current secret at runtime, and natively supports automatic rotation for RDS databases using built-in rotation Lambda functions on a configurable schedule (e.g., every 30 days). This fully addresses all three requirements.",
      "Amazon S3 with server-side encryption: Incorrect. Storing credentials in an S3 object — even with SSE-KMS — provides no automatic rotation capability and requires managing access policies for Lambda to read the object. It is not purpose-built for secrets management and introduces unnecessary operational complexity."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html", title: "Rotating AWS Secrets Manager Secrets" }
    ]
  },
  {
    id: 29,
    question: "A data engineer needs to implement schema evolution for a data pipeline that reads Avro-formatted messages from Amazon MSK (Managed Streaming for Apache Kafka) and writes them to Amazon S3. New fields may be added to the Avro schema over time without breaking downstream consumers. Which approach handles schema evolution with the LEAST custom code?",
    options: [
      "Store schema definitions in Amazon DynamoDB and validate each message in Lambda before writing to S3",
      "Use AWS Glue Schema Registry to register and enforce Avro schemas with backward compatibility",
      "Convert all messages to JSON before writing to S3 to avoid schema constraints",
      "Re-create the MSK topic with the updated schema whenever fields are added"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "AWS Glue Schema Registry is a fully managed schema management service that integrates natively with Amazon MSK and Kinesis. It supports Avro, JSON, and Protobuf schemas with configurable compatibility modes (BACKWARD, FORWARD, FULL). Producers register schemas and consumers auto-resolve the correct schema at deserialization time, enabling seamless schema evolution with no custom code.",
    optionExplanations: [
      "Store schema definitions in Amazon DynamoDB and validate each message in Lambda before writing to S3: Incorrect. This approach requires significant custom code to retrieve schemas from DynamoDB, perform Avro validation, handle compatibility checks, and manage schema versions — all tasks that AWS Glue Schema Registry handles natively.",
      "Use AWS Glue Schema Registry to register and enforce Avro schemas with backward compatibility: ✓ Correct. Glue Schema Registry integrates with MSK through the Kafka SerDe (serializer/deserializer) libraries. Setting the compatibility mode to BACKWARD allows consumers using an older schema to read data produced with a newer schema (which adds optional fields). Schema IDs are embedded in the message, so consumers automatically resolve the correct version at runtime.",
      "Convert all messages to JSON before writing to S3 to avoid schema constraints: Incorrect. Converting to JSON avoids schema enforcement but loses the benefits of Avro (compact binary encoding, built-in schema). It also shifts the schema evolution problem downstream, as JSON consumers still need to handle new fields. This adds a conversion step without solving the root problem.",
      "Re-create the MSK topic with the updated schema whenever fields are added: Incorrect. Re-creating a Kafka topic deletes all existing messages in the topic (unless retention is configured to retain all messages and a migration is performed). This is operationally disruptive, causes data loss risk, and is not a scalable approach to schema evolution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/schema-registry.html", title: "AWS Glue Schema Registry" }
    ]
  },
  {
    id: 30,
    question: "A company wants to implement a data mesh architecture where individual business domains own their data as products in Amazon S3, and other domains can discover and access approved datasets. Which combination of AWS services BEST supports this decentralized data ownership with centralized governance?",
    options: [
      "Amazon S3 with individual bucket policies per domain and manual access request emails",
      "AWS Lake Formation with cross-account data sharing and AWS Glue Data Catalog as the central metadata registry",
      "Amazon Redshift with separate schemas per domain and row-level security",
      "AWS DataSync to replicate datasets between domain accounts and a central S3 bucket"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "AWS Lake Formation enables domain teams to register their S3 data in the central Glue Data Catalog and grant fine-grained access to consumers across AWS accounts through cross-account permissions. This supports data mesh principles: domain ownership, data as a product (discoverable catalog), self-serve access, and federated governance — all without centralizing the underlying data storage.",
    optionExplanations: [
      "Amazon S3 with individual bucket policies per domain and manual access request emails: Incorrect. Manual email-based access requests and per-bucket policies do not scale to a data mesh with many domains and consumers. There is no central discoverability, governance is inconsistent, and access management becomes unmanageable as the number of datasets grows.",
      "AWS Lake Formation with cross-account data sharing and AWS Glue Data Catalog as the central metadata registry: ✓ Correct. Each domain team registers its S3 data as a database/table in the Glue Data Catalog (the central discovery layer). Lake Formation's cross-account sharing lets domain teams grant table- and column-level access to consumers in other accounts self-serviçely. A central governance team can set guardrails via Lake Formation without owning the data itself — aligning precisely with data mesh principles.",
      "Amazon Redshift with separate schemas per domain and row-level security: Incorrect. Consolidating all domain data into a single Redshift cluster contradicts data mesh's principle of decentralized domain ownership. It also creates tight coupling between domains and limits the ability to use heterogeneous storage formats appropriate for each domain.",
      "AWS DataSync to replicate datasets between domain accounts and a central S3 bucket: Incorrect. Replicating all domain data into a central S3 bucket re-centralizes data ownership — the opposite of data mesh. DataSync is a file transfer service and does not provide discoverability, catalog, or governance features."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lake-formation/latest/dg/cross-account-permissions.html", title: "Lake Formation Cross-Account Data Sharing" },
      { url: "https://docs.aws.amazon.com/glue/latest/dg/populate-data-catalog.html", title: "Populating the AWS Glue Data Catalog" }
    ]
  },
  {
    id: 31,
    question: "A data engineer needs to build a pipeline that ingests records from Amazon Kinesis Data Streams and writes aggregated results to Amazon Redshift every 5 minutes. The engineer wants to avoid managing servers. Which AWS service should be used for the aggregation and loading step?",
    options: [
      "Amazon EC2 Auto Scaling group with a Kinesis consumer application",
      "Amazon Managed Service for Apache Flink (formerly Kinesis Data Analytics)",
      "AWS Glue Streaming ETL job",
      "Amazon EMR with Apache Kafka"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Amazon Managed Service for Apache Flink is a fully managed, serverless service that can read from Kinesis Data Streams, perform windowed aggregations in real time, and write results to Amazon Redshift — all without provisioning or managing servers. It supports tumbling and sliding time windows natively in Apache Flink SQL or the Table API.",
    optionExplanations: [
      "Amazon EC2 Auto Scaling group with a Kinesis consumer application: Incorrect. Running a Kinesis consumer on EC2 requires provisioning instances, configuring Auto Scaling, managing OS patches, and handling failover — significant operational overhead for a use case that serverless services handle natively.",
      "Amazon Managed Service for Apache Flink (formerly Kinesis Data Analytics): ✓ Correct. Managed Service for Apache Flink is serverless and purpose-built for stream processing. It reads from Kinesis Data Streams, performs stateful aggregations over configurable time windows, and writes results to Redshift via JDBC connectors — with no infrastructure to manage.",
      "AWS Glue Streaming ETL job: Incorrect. AWS Glue Streaming ETL runs a Spark Structured Streaming job that can read from Kinesis. However, it is better suited for transformation and delivery to S3 or the Glue Data Catalog. Writing directly to Redshift in 5-minute micro-batches with Glue Streaming requires additional JDBC configuration and introduces higher latency than Managed Flink.",
      "Amazon EMR with Apache Kafka: Incorrect. Amazon MSK (not EMR) hosts Apache Kafka, and EMR can run Spark Streaming against Kafka. However, this option requires cluster management, is not serverless, and introduces Amazon MSK as an unnecessary hop when the source is already Kinesis Data Streams."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/managed-flink/latest/java/what-is.html", title: "What Is Amazon Managed Service for Apache Flink?" }
    ]
  },
  {
    id: 32,
    question: "An AWS Glue ETL job processes new files from Amazon S3 daily. The job is re-reading and reprocessing all files every run, including those already processed, causing duplicate records in the target. Which Glue feature should the engineer enable to process only new or changed files?",
    options: [
      "Glue job concurrency limit",
      "Glue job bookmarks",
      "Glue Data Quality rules",
      "Glue dynamic frames with pushdown predicates"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "AWS Glue job bookmarks track which data has already been processed by recording the state of a job's inputs after each successful run. On subsequent runs, Glue reads only the new or modified files since the last bookmark, preventing reprocessing of already-ingested data and eliminating duplicate records.",
    optionExplanations: [
      "Glue job concurrency limit: Incorrect. The concurrency limit controls how many instances of a Glue job can run simultaneously. It does not track or filter previously processed data.",
      "Glue job bookmarks: ✓ Correct. Job bookmarks are a built-in Glue feature that persists state information about previously processed data. When enabled, Glue compares the current input against the bookmarked state and processes only incremental data — new files added since the last successful run — without any custom deduplication logic.",
      "Glue Data Quality rules: Incorrect. Glue Data Quality evaluates data against user-defined rules (e.g., completeness, value ranges). It validates data correctness but has no mechanism to track which input files have already been processed.",
      "Glue dynamic frames with pushdown predicates: Incorrect. Pushdown predicates filter data at the source level during a read operation based on partition criteria. They reduce the amount of data scanned but do not track job execution history or prevent reprocessing files from previous runs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/monitor-continuations.html", title: "Tracking Processed Data Using Job Bookmarks" }
    ]
  },
  {
    id: 33,
    question: "A company ingests financial transaction data into Amazon S3 in near real-time using Amazon Kinesis Data Firehose. Analysts require the ability to query individual transactions by transaction_id with single-digit millisecond latency. Which data store is MOST appropriate for serving these low-latency lookups?",
    options: [
      "Amazon Athena querying S3 directly",
      "Amazon Redshift with a sort key on transaction_id",
      "Amazon DynamoDB with transaction_id as the partition key",
      "Amazon OpenSearch Service with a transaction_id index"
    ],
    correctAnswer: 2,
    category: "Data Store Management",
    explanation: "Amazon DynamoDB is a fully managed NoSQL database designed for single-digit millisecond read and write latency at any scale. Using transaction_id as the partition key allows direct key-value lookups via GetItem, providing the fastest possible response for point queries on a specific transaction.",
    optionExplanations: [
      "Amazon Athena querying S3 directly: Incorrect. Athena executes SQL queries by scanning S3 objects. Even with partitioning and Parquet format, Athena query latency is measured in seconds, not milliseconds. It is designed for analytical bulk queries, not individual record lookups.",
      "Amazon Redshift with a sort key on transaction_id: Incorrect. Redshift is a columnar data warehouse optimized for complex analytical queries across large datasets. It provides second-level query latency and is not designed for single-digit millisecond point lookups on individual records.",
      "Amazon DynamoDB with transaction_id as the partition key: ✓ Correct. DynamoDB delivers consistent single-digit millisecond latency for GetItem requests using the partition key. With transaction_id as the partition key, each lookup is a direct hash table access that returns the item instantly, regardless of table size.",
      "Amazon OpenSearch Service with a transaction_id index: Incorrect. OpenSearch provides near-real-time search with low latency (typically tens to hundreds of milliseconds), but it is primarily optimized for full-text search and log analytics. For simple key-based point lookups, DynamoDB provides lower and more consistent latency."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html", title: "DynamoDB Core Components" }
    ]
  },
  {
    id: 34,
    question: "A data engineer is building a CI/CD pipeline for AWS Glue ETL scripts stored in AWS CodeCommit. The pipeline must automatically run unit tests on each code commit and deploy the updated scripts to an S3 bucket used by the Glue jobs. Which combination of AWS services implements this CI/CD workflow?",
    options: [
      "AWS CodePipeline with AWS CodeBuild for testing and Amazon S3 deployment",
      "AWS CloudFormation with inline Lambda functions for testing",
      "Amazon EventBridge rule that triggers a Glue job on each CodeCommit push",
      "AWS Batch with a Docker container that runs tests and copies scripts to S3"
    ],
    correctAnswer: 0,
    category: "Data Ingestion and Transformation",
    explanation: "AWS CodePipeline orchestrates the CI/CD workflow end to end. When a commit is pushed to CodeCommit, CodePipeline triggers a CodeBuild project that runs unit tests against the Glue scripts. On success, CodePipeline deploys the validated scripts to the target S3 bucket, making them available to the Glue jobs — all without managing build servers.",
    optionExplanations: [
      "AWS CodePipeline with AWS CodeBuild for testing and Amazon S3 deployment: ✓ Correct. CodePipeline natively integrates with CodeCommit as a source provider. CodeBuild executes the test stage using a managed build environment (no servers to provision). A deploy stage copies the artifact to S3 using S3 deployment actions. This is the standard AWS-native CI/CD pattern for data engineering scripts.",
      "AWS CloudFormation with inline Lambda functions for testing: Incorrect. CloudFormation provisions infrastructure declaratively but is not designed to run automated unit tests as part of a code commit workflow. Inline Lambda functions have a 4 KB size limit and cannot host a full test suite.",
      "Amazon EventBridge rule that triggers a Glue job on each CodeCommit push: Incorrect. Triggering a Glue ETL job directly on a code push would run the production job with potentially broken code. There is no test stage, no validation, and no deployment of the script artifact to S3.",
      "AWS Batch with a Docker container that runs tests and copies scripts to S3: Incorrect. While AWS Batch can execute containerized test workloads, it does not integrate natively with CodeCommit push events and requires additional orchestration (EventBridge + Lambda) to trigger. CodePipeline + CodeBuild is the purpose-built, lower-overhead solution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-simple-codecommit.html", title: "AWS CodePipeline with CodeCommit" },
      { url: "https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html", title: "What Is AWS CodeBuild?" }
    ]
  },
  {
    id: 35,
    question: "A company stores user activity data in Amazon S3 partitioned by date. A compliance team requires that all data older than 1 year be permanently deleted automatically. Additionally, objects must transition to S3 Standard-IA after 30 days and to S3 Glacier Flexible Retrieval after 90 days. Which S3 feature implements all three requirements with no operational effort after initial setup?",
    options: [
      "S3 Replication rules with destination bucket deletion",
      "An S3 Lifecycle configuration with Transition and Expiration actions",
      "A scheduled AWS Lambda function that lists and deletes old S3 objects",
      "AWS Backup with a daily backup plan and 1-year retention"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "An S3 Lifecycle configuration supports both Transition actions (to move objects to cheaper storage classes after specified days) and Expiration actions (to permanently delete objects after a specified age). A single Lifecycle rule with three actions covers all three requirements automatically with no ongoing operational effort.",
    optionExplanations: [
      "S3 Replication rules with destination bucket deletion: Incorrect. S3 Replication copies objects to another bucket (same or cross-region). It does not transition storage classes or delete objects based on age. Deletion of the source object is not replicated by default.",
      "An S3 Lifecycle configuration with Transition and Expiration actions: ✓ Correct. A single S3 Lifecycle rule can define: (1) a Transition to S3 Standard-IA after 30 days, (2) a Transition to S3 Glacier Flexible Retrieval after 90 days, and (3) an Expiration after 365 days that permanently deletes the objects. Once configured, S3 applies all actions automatically with no further intervention.",
      "A scheduled AWS Lambda function that lists and deletes old S3 objects: Incorrect. A Lambda-based solution requires writing and maintaining code, handling S3 pagination for large buckets, managing IAM permissions, and paying for Lambda execution. S3 Lifecycle policies accomplish the same outcome natively without any code.",
      "AWS Backup with a daily backup plan and 1-year retention: Incorrect. AWS Backup creates and retains backup copies of resources. It does not delete source S3 objects after a retention period or transition objects between storage classes. It serves a data protection purpose, not a lifecycle management purpose."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html", title: "Managing Your Storage Lifecycle" }
    ]
  },
  {
    id: 36,
    question: "A data engineer must grant an external partner company read-only access to specific tables in the company's AWS Glue Data Catalog and the underlying S3 data, without sharing AWS credentials or creating IAM users in the company's account. Which approach should the engineer use?",
    options: [
      "Create an IAM user in the company account and share the access key with the partner",
      "Use AWS Lake Formation cross-account table sharing to grant the partner's AWS account access to specific tables",
      "Copy the relevant S3 data to a publicly accessible S3 bucket",
      "Create a pre-signed S3 URL for each object and send it to the partner daily"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "AWS Lake Formation supports cross-account data sharing, where the data owner grants table-level or column-level permissions to a specific external AWS account. The partner assumes an IAM role in their own account to access the shared tables via Athena or Redshift Spectrum — no credential sharing and no IAM user creation in the owner's account.",
    optionExplanations: [
      "Create an IAM user in the company account and share the access key with the partner: Incorrect. Creating IAM users for external parties is a security anti-pattern. Sharing long-term access keys violates the principle of least privilege and makes key rotation and revocation difficult. AWS recommends cross-account IAM roles or Lake Formation sharing for partner access.",
      "Use AWS Lake Formation cross-account table sharing to grant the partner's AWS account access to specific tables: ✓ Correct. Lake Formation's cross-account sharing allows the data owner to grant SELECT permission on specific tables to the partner's AWS account ID. The partner uses their own IAM role to assume access and query the data through Athena or Redshift Spectrum. No credentials are shared and access can be revoked at any time from the Lake Formation console.",
      "Copy the relevant S3 data to a publicly accessible S3 bucket: Incorrect. Making S3 data publicly accessible removes all access controls and exposes data to anyone on the internet, violating data security and compliance requirements. This is never an acceptable approach for sharing business data.",
      "Create a pre-signed S3 URL for each object and send it to the partner daily: Incorrect. Pre-signed URLs provide temporary access to individual S3 objects and expire after a set period. They do not provide structured table-level access, cannot enforce column-level restrictions, and sending URLs daily is operationally unsustainable for large datasets."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lake-formation/latest/dg/cross-account-permissions.html", title: "Lake Formation Cross-Account Data Sharing" }
    ]
  },
  {
    id: 37,
    question: "A company runs an Apache Airflow workflow to orchestrate a multi-step data pipeline on AWS. The team wants to eliminate the operational overhead of managing Airflow infrastructure (patching, scaling, high availability). Which AWS service should they migrate to?",
    options: [
      "AWS Step Functions",
      "Amazon Managed Workflows for Apache Airflow (Amazon MWAA)",
      "Amazon EventBridge Scheduler",
      "AWS Glue Workflows"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Amazon MWAA is a fully managed Apache Airflow service. It runs the same Airflow DAGs without changes, while AWS handles provisioning, patching, scaling, and high availability of the Airflow environment. This eliminates all infrastructure management overhead while preserving the existing Airflow codebase.",
    optionExplanations: [
      "AWS Step Functions: Incorrect. Step Functions is a serverless workflow orchestration service using state machines defined in Amazon States Language. While powerful, migrating from Airflow to Step Functions requires rewriting all existing DAGs into a completely different syntax and workflow model — not a lift-and-shift migration.",
      "Amazon Managed Workflows for Apache Airflow (Amazon MWAA): ✓ Correct. MWAA runs the Apache Airflow scheduler, workers, and web server on managed infrastructure. Existing DAGs written in Python can be uploaded to an S3 bucket and deployed to MWAA without code changes. AWS automatically handles scaling, patching, and availability.",
      "Amazon EventBridge Scheduler: Incorrect. EventBridge Scheduler triggers AWS service targets (Lambda, Step Functions, ECS tasks, etc.) on a schedule. It does not support DAG-based multi-step workflows with complex dependencies, branching, retries, or the rich operator ecosystem that Airflow provides.",
      "AWS Glue Workflows: Incorrect. AWS Glue Workflows orchestrate sequences of Glue crawlers, jobs, and triggers. They are purpose-built for Glue ETL pipelines and do not support the general-purpose multi-service orchestration or DAG flexibility that Apache Airflow offers."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/mwaa/latest/userguide/what-is-mwaa.html", title: "What Is Amazon Managed Workflows for Apache Airflow?" }
    ]
  },
  {
    id: 38,
    question: "A data engineer is designing a data warehouse in Amazon Redshift. A fact table with 500 billion rows is frequently joined with a dimension table that has only 500 rows. Which distribution style should be applied to the dimension table to maximize JOIN performance?",
    options: [
      "DISTSTYLE KEY on the join column",
      "DISTSTYLE EVEN",
      "DISTSTYLE ALL",
      "DISTSTYLE AUTO"
    ],
    correctAnswer: 2,
    category: "Data Store Management",
    explanation: "For small dimension tables, DISTSTYLE ALL copies a full replica of the table to every compute node. This means every node already has the complete dimension table locally, so JOINs with the large fact table require no data redistribution across nodes, maximizing query performance.",
    optionExplanations: [
      "DISTSTYLE KEY on the join column: Incorrect. KEY distribution places rows with the same join key value on the same node. For a 500-row dimension table, this provides no benefit — only a fraction of nodes would receive any rows from the tiny table, causing the fact table to still redistribute data during the JOIN.",
      "DISTSTYLE EVEN: Incorrect. EVEN distributes rows round-robin across all nodes. With only 500 rows, most nodes would receive only a few rows of the dimension table. The fact table would still need to redistribute data during the JOIN to match dimension rows on different nodes.",
      "DISTSTYLE ALL: ✓ Correct. ALL distribution places a complete copy of the table on every compute node. For a 500-row table, the storage overhead is negligible. Every node performing a slice of the fact table scan already has the entire dimension table locally, enabling a fully collocated JOIN with zero network redistribution.",
      "DISTSTYLE AUTO: Incorrect. AUTO lets Redshift choose the distribution style. For very small tables, Redshift may eventually choose ALL, but this is not guaranteed at table creation time. For a table known to be small and frequently joined with a massive fact table, explicitly setting ALL is the recommended best practice."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/c_choosing_dist_sort.html", title: "Choosing a Data Distribution Style in Amazon Redshift" }
    ]
  },
  {
    id: 39,
    question: "A data engineer must implement row-level security in Amazon Redshift so that each sales representative can only see rows in the orders table that belong to their own region. The region is stored in a separate user_region mapping table. Which Redshift feature should be used?",
    options: [
      "Create a separate Redshift cluster per region",
      "Use Amazon Redshift row-level security (RLS) policies",
      "Create a separate view per region and grant each user access to their view",
      "Apply a WHERE clause filter in the application layer before sending queries to Redshift"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "Amazon Redshift natively supports row-level security (RLS) policies that filter rows returned by a query based on the identity of the querying user. An RLS policy can reference a lookup table (such as user_region) to dynamically restrict rows, enforcing access control at the database layer without application-level changes.",
    optionExplanations: [
      "Create a separate Redshift cluster per region: Incorrect. Provisioning a separate cluster per region multiplies infrastructure costs dramatically and makes cross-region analytics impossible. This is an extreme over-engineering approach that does not scale as the number of regions grows.",
      "Use Amazon Redshift row-level security (RLS) policies: ✓ Correct. Redshift RLS policies use CREATE RLS POLICY and ATTACH RLS POLICY statements to define filter expressions. The policy can JOIN the orders table with the user_region mapping to dynamically filter rows based on the current user's session identity. Once attached, the policy is enforced transparently for all queries against the table.",
      "Create a separate view per region and grant each user access to their view: Incorrect. Creating a view per region is a static, hard-coded workaround. Adding a new region requires creating a new view and updating permissions. It does not scale and relies on users querying the correct view rather than enforcing access at the row level.",
      "Apply a WHERE clause filter in the application layer before sending queries to Redshift: Incorrect. Application-layer filtering is not a security control — it can be bypassed if a user queries Redshift directly using a BI tool, CLI, or JDBC client. Security must be enforced at the data layer, not only at the application layer."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/t_rls.html", title: "Row-Level Security in Amazon Redshift" }
    ]
  },
  {
    id: 40,
    question: "A company wants to profile a dataset stored in Amazon S3 to understand its statistical distribution, detect missing values, and identify outliers before building an ETL pipeline. The data team prefers a visual, no-code interface. Which AWS service is MOST appropriate?",
    options: [
      "Amazon QuickSight",
      "AWS Glue DataBrew",
      "Amazon SageMaker Data Wrangler",
      "Amazon Athena"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "AWS Glue DataBrew is a visual data preparation service that allows users to profile datasets from S3 (and other sources) without writing code. It automatically computes over 40 data quality statistics — including missing value counts, cardinality, min/max, quantiles, and correlation — and provides an interactive visualization of the profile results.",
    optionExplanations: [
      "Amazon QuickSight: Incorrect. QuickSight is a business intelligence and data visualization service for creating dashboards and reports. While it can display data distributions via charts, it is not designed to perform automated data profiling (missing value detection, outlier analysis, statistical summaries) as a data preparation step.",
      "AWS Glue DataBrew: ✓ Correct. Glue DataBrew provides a dedicated data profiling feature that scans a dataset and generates a comprehensive profile report including value distributions, missing values, duplicate rows, outlier detection, and column-level statistics — all through a no-code visual interface. The profile report directly informs the design of data quality rules and transformation steps.",
      "Amazon SageMaker Data Wrangler: Incorrect. SageMaker Data Wrangler is a data preparation tool integrated into SageMaker Studio, primarily designed for preparing data for machine learning model training. While it offers some profiling capabilities, it is oriented toward ML feature engineering workflows, not general-purpose ETL pipeline design.",
      "Amazon Athena: Incorrect. Athena is an interactive SQL query service for S3 data. A data engineer can write SQL queries to compute statistics manually, but Athena has no built-in visual profiling interface and requires writing custom queries for each statistical check — not a no-code solution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/databrew/latest/dg/profile-jobs.html", title: "Creating Profile Jobs in AWS Glue DataBrew" }
    ]
  },
  {
    id: 41,
    question: "A data engineer configures an AWS Lambda function as a Kinesis Data Streams consumer. During peak hours, the function is throttled because it reaches the concurrency limit. Records are not processed within the retention window and are lost. Which TWO actions should the engineer take to resolve this? (Select TWO)",
    options: [
      "Increase the number of Kinesis shards to raise the parallelism of Lambda invocations",
      "Enable Lambda reserved concurrency for the function",
      "Request a Lambda concurrency limit increase and configure Enhanced Fan-Out on the stream",
      "Switch the Kinesis stream to provisioned mode"
    ],
    correctAnswer: [0, 2],
    category: "Data Ingestion and Transformation",
    explanation: "Lambda scales one concurrent invocation per Kinesis shard. Increasing the shard count raises the maximum parallelism. Requesting a higher concurrency limit removes the account-level throttling ceiling. Enhanced Fan-Out gives each consumer its own 2 MB/s dedicated throughput per shard, preventing read throttling from competing consumers.",
    optionExplanations: [
      "Increase the number of Kinesis shards to raise the parallelism of Lambda invocations: ✓ Correct. Lambda creates one concurrent execution per shard (or per parallelization factor). Resharding (splitting shards) increases the number of parallel Lambda invocations, distributing the record processing load and reducing per-invocation batch sizes.",
      "Enable Lambda reserved concurrency for the function: Incorrect. Reserved concurrency sets a hard ceiling on the number of concurrent executions for a specific function. Setting reserved concurrency does not increase the total available concurrency — it actually reduces the pool available to other functions. Throttling can worsen if the reserved limit is lower than the burst demand.",
      "Request a Lambda concurrency limit increase and configure Enhanced Fan-Out on the stream: ✓ Correct. Requesting a service quota increase for Lambda concurrent executions removes the account-level throttle. Enhanced Fan-Out registers the Lambda consumer for a dedicated 2 MB/s read throughput per shard via HTTP/2 push, eliminating read-side throttling that occurs when multiple consumers share the standard 2 MB/s shard limit.",
      "Switch the Kinesis stream to provisioned mode: Incorrect. Kinesis Data Streams already runs in provisioned mode by default (with explicit shard counts). There is no 'provisioned mode' toggle analogous to DynamoDB. On-Demand mode adjusts capacity automatically but does not directly resolve Lambda concurrency throttling."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html", title: "Using AWS Lambda with Amazon Kinesis" },
      { url: "https://docs.aws.amazon.com/streams/latest/dev/enhanced-consumers.html", title: "Developing Enhanced Fan-Out Consumers" }
    ]
  },
  {
    id: 42,
    question: "An analytics team needs to run SQL queries in Amazon Athena that JOIN data stored in Amazon S3 with live data in Amazon RDS MySQL — without copying the RDS data to S3. Which Athena feature enables this?",
    options: [
      "Athena workgroups with cross-account access",
      "Athena Federated Query with a Lambda data source connector",
      "AWS Glue Crawlers running against RDS",
      "Amazon Redshift Spectrum pointed at RDS"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "Athena Federated Query uses AWS Lambda-based data source connectors to query external data stores — including Amazon RDS, DynamoDB, Redshift, and others — directly from Athena. A single SQL query can JOIN Athena tables (S3-backed) with federated sources (RDS) in one statement, with no data movement required.",
    optionExplanations: [
      "Athena workgroups with cross-account access: Incorrect. Athena workgroups isolate query execution settings and cost controls across teams or accounts. They do not enable querying non-S3 data sources such as RDS.",
      "Athena Federated Query with a Lambda data source connector: ✓ Correct. Athena Federated Query deploys a pre-built or custom Lambda connector (e.g., the Amazon Athena RDS/MySQL connector) that translates Athena SQL into native RDS queries at runtime. The result sets are returned to Athena and can be joined with S3-backed tables in a single SQL statement — zero data movement required.",
      "AWS Glue Crawlers running against RDS: Incorrect. Glue Crawlers can catalog RDS tables in the Glue Data Catalog, but the cataloged tables still point to RDS as a JDBC source. Athena cannot query JDBC-backed Glue catalog tables directly without a Federated Query connector.",
      "Amazon Redshift Spectrum pointed at RDS: Incorrect. Redshift Spectrum queries data stored in Amazon S3 via external tables. It does not connect to Amazon RDS MySQL databases. Redshift federated queries (a separate feature) can query RDS/Aurora, but the question asks specifically about Athena."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/connect-to-a-data-source.html", title: "Using Amazon Athena Federated Query" }
    ]
  },
  {
    id: 43,
    question: "A company's Amazon Redshift cluster runs a recurring report query that aggregates 2 years of sales data. The query takes 10 minutes to complete and is executed by 50 users every morning. A data engineer wants to reduce query latency for these users without changing the underlying data or query logic. Which Redshift feature should be used?",
    options: [
      "Redshift Concurrency Scaling",
      "Redshift Materialized Views",
      "Redshift VACUUM and ANALYZE",
      "Redshift Workload Management (WLM) priority queues"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "A Materialized View precomputes and stores the result of the expensive aggregation query. When users run the report, Redshift serves the result from the materialized view instead of re-executing the full 2-year aggregation. Query latency drops from minutes to seconds, and the view can be refreshed on a schedule to keep results current.",
    optionExplanations: [
      "Redshift Concurrency Scaling: Incorrect. Concurrency Scaling adds transient read capacity when queue wait times increase, allowing more queries to run simultaneously. It reduces queue wait time but does not reduce the 10-minute execution time of each individual query — all 50 users still wait 10 minutes each.",
      "Redshift Materialized Views: ✓ Correct. A Materialized View executes the expensive aggregation once and stores the result as a physical table. Subsequent queries against the materialized view are simple scans of the pre-aggregated result, reducing 10-minute query times to sub-second reads. AUTO REFRESH keeps the view current as underlying data changes.",
      "Redshift VACUUM and ANALYZE: Incorrect. VACUUM reclaims storage from deleted rows and re-sorts data, and ANALYZE updates table statistics for the query planner. These are maintenance operations that improve query plans over time but do not eliminate the need to re-aggregate 2 years of data on every query execution.",
      "Redshift Workload Management (WLM) priority queues: Incorrect. WLM controls how queries are queued and how memory/CPU resources are allocated among concurrent queries. Prioritizing the report query ensures it starts sooner, but the underlying 10-minute computation time remains unchanged."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-overview.html", title: "Creating Materialized Views in Amazon Redshift" }
    ]
  },
  {
    id: 44,
    question: "A data engineer stores session records in Amazon DynamoDB. Each session expires after 24 hours and the expired records must be automatically removed to reduce storage costs. Which DynamoDB feature should be used?",
    options: [
      "DynamoDB Streams with a Lambda function that deletes expired items",
      "DynamoDB Time to Live (TTL)",
      "A scheduled AWS Glue job that scans and deletes old items",
      "DynamoDB On-Demand backups with automatic pruning"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "DynamoDB TTL allows a data engineer to designate a specific attribute as the TTL attribute. When the Unix epoch timestamp stored in that attribute is in the past, DynamoDB automatically deletes the item within 48 hours at no additional cost — no Lambda, no Glue job, and no write capacity consumed for the deletion.",
    optionExplanations: [
      "DynamoDB Streams with a Lambda function that deletes expired items: Incorrect. This approach requires writing and maintaining Lambda code, handling pagination, paying for Lambda invocations and DynamoDB write capacity for each deletion. TTL provides the same outcome natively with zero operational overhead and no write capacity cost.",
      "DynamoDB Time to Live (TTL): ✓ Correct. TTL is a built-in DynamoDB feature. The engineer adds a numeric attribute (e.g., expiresAt) containing the Unix timestamp for expiry (current time + 86400 seconds). DynamoDB evaluates TTL attributes continuously and removes expired items automatically in the background, at no charge for the delete operations.",
      "A scheduled AWS Glue job that scans and deletes old items: Incorrect. Running a Glue job to scan and delete DynamoDB items is operationally heavy, consumes DynamoDB read and write capacity, incurs Glue DPU costs, and requires custom code for pagination over large tables — all unnecessary when TTL handles this natively.",
      "DynamoDB On-Demand backups with automatic pruning: Incorrect. DynamoDB On-Demand backups create point-in-time snapshots of the table for disaster recovery. They do not delete or prune live table items based on expiry timestamps."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html", title: "Expiring Items Using DynamoDB Time to Live (TTL)" }
    ]
  },
  {
    id: 45,
    question: "A data engineer is building a pipeline where an AWS Lambda function reads data from Amazon S3, transforms it, and writes results to an Amazon RDS PostgreSQL instance inside a private VPC. The Lambda function cannot connect to RDS. The RDS instance has no public endpoint. Which configuration resolves the connectivity issue?",
    options: [
      "Assign a public IP address to the RDS instance",
      "Configure the Lambda function to run inside the same VPC as RDS, in the same or peered subnet, with a security group that permits the connection",
      "Enable AWS Direct Connect between Lambda and the VPC",
      "Deploy an API Gateway REST API in front of RDS to allow Lambda to connect via HTTPS"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "By default, Lambda runs outside a VPC and cannot reach private VPC resources. Configuring Lambda's VPC settings to attach it to the same VPC (or a peered VPC) and placing it in a subnet with a route to the RDS subnet, then updating RDS security groups to allow inbound traffic from the Lambda security group, establishes private network connectivity without exposing RDS to the internet.",
    optionExplanations: [
      "Assign a public IP address to the RDS instance: Incorrect. Enabling a public endpoint on RDS exposes the database to the internet, violating the security requirement to keep it private. It also bypasses VPC network controls and is considered a security anti-pattern for production databases.",
      "Configure the Lambda function to run inside the same VPC as RDS, in the same or peered subnet, with a security group that permits the connection: ✓ Correct. Lambda VPC configuration attaches the function to specified subnets and security groups inside a VPC. The RDS security group must have an inbound rule allowing the PostgreSQL port (5432) from the Lambda security group. This creates private, secure connectivity without any internet exposure.",
      "Enable AWS Direct Connect between Lambda and the VPC: Incorrect. AWS Direct Connect provides a dedicated network connection between an on-premises data center and AWS. Lambda functions already run within AWS infrastructure and do not use Direct Connect for VPC access. VPC configuration is the correct mechanism.",
      "Deploy an API Gateway REST API in front of RDS to allow Lambda to connect via HTTPS: Incorrect. Amazon API Gateway cannot act as a proxy directly in front of an RDS database. RDS is not an HTTP service — it uses database protocols (PostgreSQL wire protocol). Placing API Gateway in front of a database would require a Lambda or RDS Proxy layer anyway, adding complexity without solving the root connectivity issue."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html", title: "Configuring a Lambda Function to Access Resources in a VPC" }
    ]
  },
  {
    id: 46,
    question: "A company processes sensitive healthcare data in an AWS Glue ETL job that reads from and writes to Amazon S3. A security audit requires that all data in transit between AWS Glue and Amazon S3 be encrypted. Which configuration ensures encryption in transit?",
    options: [
      "Enable S3 default encryption (SSE-S3) on the bucket",
      "Configure a Glue Security Configuration with SSL enforcement for S3 connections",
      "Enable S3 Versioning on the source and destination buckets",
      "Attach an IAM policy that denies s3:PutObject without encryption headers"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "AWS Glue Security Configurations allow a data engineer to enforce SSL/TLS for data in transit. When the security configuration is attached to a Glue job, Glue enforces HTTPS (TLS) for all S3 API calls made by the job, ensuring data is encrypted during transmission between the Glue executor and S3.",
    optionExplanations: [
      "Enable S3 default encryption (SSE-S3) on the bucket: Incorrect. S3 default encryption (SSE-S3, SSE-KMS, or DSSE-KMS) controls encryption at rest — data stored on S3 disks. It does not affect whether data is transmitted over an encrypted channel between Glue and S3.",
      "Configure a Glue Security Configuration with SSL enforcement for S3 connections: ✓ Correct. A Glue Security Configuration has a dedicated setting to enable SSL for S3 connections (and for the job bookmark encryption and CloudWatch log encryption). Attaching this configuration to a Glue job enforces TLS for all S3 read and write operations, satisfying the encryption-in-transit requirement.",
      "Enable S3 Versioning on the source and destination buckets: Incorrect. S3 Versioning retains multiple versions of objects to protect against accidental deletion or overwrite. It has no effect on the encryption of data during transit between services.",
      "Attach an IAM policy that denies s3:PutObject without encryption headers: Incorrect. An IAM or S3 bucket policy with a condition key like s3:x-amz-server-side-encryption enforces at-rest encryption by rejecting unencrypted PutObject requests. It does not enforce TLS for the network transport layer — a request could still be sent over unencrypted HTTP (though AWS SDKs use HTTPS by default)."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/console-security-configurations.html", title: "AWS Glue Security Configurations" }
    ]
  },
  {
    id: 47,
    question: "A data engineer needs to query Amazon S3 data from within an Amazon VPC without routing traffic over the public internet, to satisfy a compliance requirement that prohibits data leaving the AWS network backbone. Which AWS feature should be configured?",
    options: [
      "S3 Transfer Acceleration",
      "A VPC Gateway Endpoint for Amazon S3",
      "Amazon CloudFront with an S3 origin",
      "AWS PrivateLink for Amazon S3 (Interface Endpoint)"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "A VPC Gateway Endpoint for Amazon S3 allows resources inside a VPC (such as EC2, EMR, or Glue with VPC configuration) to communicate with S3 using private AWS network paths, without requiring an internet gateway, NAT device, VPN, or Direct Connect. All S3 traffic stays on the AWS network backbone and never traverses the public internet.",
    optionExplanations: [
      "S3 Transfer Acceleration: Incorrect. S3 Transfer Acceleration uses CloudFront edge locations to speed up uploads from geographically distant clients over the public internet. It does not route traffic through a private network path inside a VPC.",
      "A VPC Gateway Endpoint for Amazon S3: ✓ Correct. A Gateway Endpoint is a VPC routing construct that directs S3-bound traffic from within the VPC through AWS-internal network paths. No internet gateway or NAT is required. The endpoint policy can also restrict which S3 buckets the VPC resources may access, adding an extra governance layer.",
      "Amazon CloudFront with an S3 origin: Incorrect. CloudFront is a global CDN that caches and serves content over the public internet. Requests from a VPC to CloudFront still traverse the public internet, which violates the stated compliance requirement.",
      "AWS PrivateLink for Amazon S3 (Interface Endpoint): Incorrect. AWS PrivateLink for S3 creates an Interface Endpoint (using an ENI with a private IP) which also keeps traffic on the AWS backbone. However, for most standard S3 workloads, a Gateway Endpoint is the recommended, zero-cost option. Interface Endpoints add per-hour and per-GB data processing charges, making Gateway Endpoints the preferred choice when both are applicable."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html", title: "Gateway Endpoints for Amazon S3" }
    ]
  },
  {
    id: 48,
    question: "A data engineer is designing an incremental data ingestion pipeline from Amazon RDS MySQL to Amazon S3. The pipeline must capture only rows that were inserted or updated since the last pipeline run. The RDS table does not have a reliable updated_at timestamp column. Which approach is MOST reliable for capturing changes?",
    options: [
      "Run a full table export to S3 every run and compare with the previous export in Athena",
      "Use AWS DMS with CDC (Change Data Capture) mode reading MySQL binary logs",
      "Schedule a Glue job that queries all rows with a LIMIT clause and deduplicates in S3",
      "Use Amazon AppFlow to sync the RDS table to S3 on a schedule"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "AWS DMS CDC mode uses the MySQL binary log (binlog) to capture every INSERT, UPDATE, and DELETE at the row level as they occur, regardless of whether the table has a timestamp column. This provides reliable, low-latency change capture without scanning the entire table on every run.",
    optionExplanations: [
      "Run a full table export to S3 every run and compare with the previous export in Athena: Incorrect. A full export reads the entire table every pipeline run, consuming significant RDS read capacity and S3 storage. Comparing exports in Athena adds additional compute cost and complexity. For large tables this approach does not scale and misses deletes entirely.",
      "Use AWS DMS with CDC (Change Data Capture) mode reading MySQL binary logs: ✓ Correct. DMS CDC taps into the MySQL binlog, which records every committed transaction. DMS reads the binlog stream and converts row-level changes into insert/update/delete events delivered to S3 (or other targets) continuously. It captures all changes reliably without requiring a timestamp column and without scanning the full table.",
      "Schedule a Glue job that queries all rows with a LIMIT clause and deduplicates in S3: Incorrect. Using LIMIT without an ORDER BY or filter produces non-deterministic results and does not isolate changed rows. This approach does not reliably capture incremental changes and can produce incorrect or incomplete data.",
      "Use Amazon AppFlow to sync the RDS table to S3 on a schedule: Incorrect. Amazon AppFlow is designed for SaaS application integrations (Salesforce, ServiceNow, etc.). It does not support Amazon RDS as a source connector and cannot read MySQL binary logs for CDC."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html", title: "Using Change Data Capture with AWS DMS" }
    ]
  },
  {
    id: 49,
    question: "A company wants to use Amazon QuickSight to build dashboards from data stored in Amazon Redshift. Multiple dashboard users will run queries simultaneously during business hours, and the team is concerned about Redshift query queue wait times degrading dashboard performance. Which Redshift feature directly addresses this concern?",
    options: [
      "Redshift Spectrum for S3 offload",
      "Redshift Concurrency Scaling",
      "Redshift Materialized Views with AUTO REFRESH",
      "Redshift AQUA (Advanced Query Accelerator)"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "Redshift Concurrency Scaling automatically adds transient read capacity when the main cluster's query queue becomes congested. Additional cluster capacity spins up in seconds and handles the overflow queries, eliminating queue wait times for dashboard users during peak hours. Charges apply only when the burst capacity is actually used.",
    optionExplanations: [
      "Redshift Spectrum for S3 offload: Incorrect. Redshift Spectrum queries data stored in S3 via external tables. It offloads query processing for S3 data to the Spectrum layer but does not reduce queue contention on the main Redshift cluster for queries against native Redshift tables.",
      "Redshift Concurrency Scaling: ✓ Correct. Concurrency Scaling monitors the main cluster's WLM query queues. When wait times exceed a threshold, it automatically provisions additional read capacity clusters. Incoming queries are transparently routed to these scaling clusters, providing consistent dashboard performance regardless of the number of concurrent users.",
      "Redshift Materialized Views with AUTO REFRESH: Incorrect. Materialized Views reduce individual query execution time by pre-computing aggregations. While this helps performance, it does not address the queue wait time problem when many users submit queries simultaneously — all users still compete for the same cluster slots.",
      "Redshift AQUA (Advanced Query Accelerator): Incorrect. AQUA is a distributed hardware-accelerated query cache available for ra3 node clusters. It accelerates certain filter-heavy scans by pushing computation to storage-side hardware. It does not add parallel query capacity to handle concurrent user load spikes."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/concurrency-scaling.html", title: "Concurrency Scaling in Amazon Redshift" }
    ]
  },
  {
    id: 50,
    question: "A data engineer must ensure that an AWS Glue job can access an Amazon S3 bucket in a different AWS account. The S3 bucket owner has already added a bucket policy allowing the Glue job's IAM role. The Glue job still receives an Access Denied error when reading from the bucket. What is the MOST likely missing configuration?",
    options: [
      "The Glue job's IAM role does not have s3:GetObject permission in its identity-based policy",
      "The S3 bucket does not have versioning enabled",
      "The Glue job needs to be configured to use a VPC endpoint for S3",
      "The Glue job's AWS account must enable S3 Block Public Access settings"
    ],
    correctAnswer: 0,
    category: "Data Security and Governance",
    explanation: "For cross-account S3 access, both the resource-based policy (S3 bucket policy on the target account) AND the identity-based policy (IAM role policy on the requester account) must grant the required permissions. The bucket policy alone is not sufficient — the Glue job's IAM role must also explicitly allow s3:GetObject (and s3:ListBucket) for the cross-account bucket ARN in its own policy.",
    optionExplanations: [
      "The Glue job's IAM role does not have s3:GetObject permission in its identity-based policy: ✓ Correct. Cross-account S3 access requires permission from both sides: the S3 bucket policy (resource-based, in the bucket owner's account) must allow the requester's IAM role, AND the IAM role (identity-based, in the requester's account) must also have an explicit allow for the s3:GetObject action on the cross-account bucket ARN. If either side is missing, AWS denies the request.",
      "The S3 bucket does not have versioning enabled: Incorrect. S3 Versioning controls whether multiple versions of an object are retained. It has no relationship to cross-account access permissions or IAM authorization decisions.",
      "The Glue job needs to be configured to use a VPC endpoint for S3: Incorrect. A VPC endpoint for S3 is a network routing configuration that keeps S3 traffic on the AWS backbone. It is not an authorization mechanism and does not resolve IAM permission errors. A VPC endpoint policy could further restrict access, but the question describes an access denied error on a job that presumably has network connectivity.",
      "The Glue job's AWS account must enable S3 Block Public Access settings: Incorrect. S3 Block Public Access settings restrict publicly accessible S3 configurations — they apply to public (anonymous) access, not to authenticated cross-account IAM role access. Enabling or disabling Block Public Access does not affect IAM-authenticated cross-account requests."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html#example-bucket-policies-use-case-8", title: "Cross-Account S3 Bucket Access" },
      { url: "https://repost.aws/knowledge-center/cross-account-access-s3", title: "How do I provide cross-account access to objects in my S3 bucket?" }
    ]
  },
  {
    id: 51,
    question: "A data engineer is building a data pipeline that reads from multiple Amazon S3 source buckets owned by different AWS accounts. The pipeline AWS Glue job runs in Account A. Each source bucket is in a different account and has a bucket policy granting Account A's Glue IAM role access. Despite this, the job fails with Access Denied on two of the buckets. Which TWO additional configurations are required? (Select TWO)",
    options: [
      "Add an explicit s3:GetObject allow for each cross-account bucket ARN in the Glue IAM role's identity-based policy in Account A",
      "Enable S3 Cross-Region Replication on each source bucket to Account A",
      "Ensure the source bucket owner has not enabled S3 Object Ownership set to 'Bucket owner enforced' in a way that blocks the role",
      "Create a VPC peering connection between Account A and each source account"
    ],
    correctAnswer: [0, 2],
    category: "Data Security and Governance",
    explanation: "Cross-account S3 access requires both the IAM identity policy (in Account A) and the bucket policy (in the source account) to allow access. Additionally, S3 Object Ownership settings can block cross-account access even when both policies appear correct — if 'Bucket owner enforced' ACL mode is active, cross-account ACL grants are disabled and policy-based grants must cover all required permissions explicitly.",
    optionExplanations: [
      "Add an explicit s3:GetObject allow for each cross-account bucket ARN in the Glue IAM role's identity-based policy in Account A: ✓ Correct. For cross-account access, both sides must allow: the bucket policy in the source account grants access to Account A's role, AND Account A's IAM role policy must also grant s3:GetObject on the external bucket ARN. Missing either side results in Access Denied.",
      "Enable S3 Cross-Region Replication on each source bucket to Account A: Incorrect. Cross-Region Replication copies objects to a destination bucket asynchronously. It does not grant read access to the source bucket and introduces data duplication with additional storage costs — it is not a solution for live cross-account reads.",
      "Ensure the source bucket owner has not enabled S3 Object Ownership set to 'Bucket owner enforced' in a way that blocks the role: ✓ Correct. When 'Bucket owner enforced' is set, ACL-based cross-account grants are disabled. If the bucket policy was written assuming ACL grants, those grants no longer apply. The data engineer must verify that the bucket policy explicitly grants the required permissions for the cross-account role and is not relying on ACLs.",
      "Create a VPC peering connection between Account A and each source account: Incorrect. VPC peering enables private network connectivity between VPCs. It is a network-level configuration and has no effect on S3 IAM authorization decisions. S3 is a global service accessed over HTTPS, not through VPC peering."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html", title: "Controlling Object Ownership in S3" },
      { url: "https://repost.aws/knowledge-center/cross-account-access-s3", title: "Cross-Account Access to Amazon S3" }
    ]
  },
  {
    id: 52,
    question: "A company needs to identify and deduplicate customer records across two large datasets stored in Amazon S3. Records from the same customer may have slightly different spellings of names or addresses due to data entry errors. Which AWS Glue feature handles fuzzy matching and record deduplication?",
    options: [
      "AWS Glue job bookmarks",
      "AWS Glue FindMatches ML transform",
      "AWS Glue Data Quality DQDL rules",
      "AWS Glue dynamic frames with resolveChoice()"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "AWS Glue FindMatches is a machine learning transform that learns to identify duplicate or matching records across datasets, even when the records differ due to typographical errors, abbreviations, or formatting differences. It generates a label training file, learns from human-labeled examples, and applies the learned model to flag or deduplicate records at scale.",
    optionExplanations: [
      "AWS Glue job bookmarks: Incorrect. Glue job bookmarks track which input data has already been processed across job runs. They prevent reprocessing of old data but have no capability to perform record-level matching or fuzzy deduplication.",
      "AWS Glue FindMatches ML transform: ✓ Correct. FindMatches is specifically designed for entity resolution and record deduplication. The data engineer labels a sample of matching and non-matching record pairs to train the model. FindMatches then applies the trained ML model to the full dataset, identifying likely duplicates even when fields contain typographical variations — without requiring exact string matches.",
      "AWS Glue Data Quality DQDL rules: Incorrect. Glue Data Quality evaluates data against deterministic rules (e.g., IsComplete, ColumnValues in range). It enforces data standards but cannot perform probabilistic fuzzy matching between records from two separate datasets.",
      "AWS Glue dynamic frames with resolveChoice(): Incorrect. resolveChoice() handles schema ambiguity in dynamic frames — for example, when a column contains mixed data types. It resolves type conflicts but does not compare records across datasets or perform any form of record matching."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/machine-learning.html", title: "AWS Glue FindMatches ML Transform" }
    ]
  },
  {
    id: 53,
    question: "A startup wants to run ad-hoc and periodic analytical queries on Amazon Redshift without managing cluster provisioning, sizing, or capacity planning. Query workloads are sporadic and unpredictable. Which Redshift deployment option is MOST cost-effective for this use case?",
    options: [
      "Amazon Redshift provisioned cluster with Reserved Instances",
      "Amazon Redshift Serverless",
      "Amazon Redshift provisioned cluster with On-Demand pricing",
      "Amazon Athena with Redshift Spectrum"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "Amazon Redshift Serverless automatically provisions and scales data warehouse capacity based on workload demand. You pay only for the compute used per query (measured in Redshift Processing Units per second), with no cluster to manage. It is ideal for sporadic, unpredictable workloads where a provisioned cluster would be idle most of the time.",
    optionExplanations: [
      "Amazon Redshift provisioned cluster with Reserved Instances: Incorrect. Reserved Instances require a 1- or 3-year upfront commitment and charge for the full cluster capacity regardless of utilization. For sporadic workloads, paying for idle capacity makes this the least cost-effective option.",
      "Amazon Redshift Serverless: ✓ Correct. Redshift Serverless eliminates cluster management entirely. It automatically starts when queries arrive, scales capacity to match the workload, and pauses during inactivity. Billing is based on RPU-seconds consumed per query, making it highly cost-effective for unpredictable, sporadic workloads.",
      "Amazon Redshift provisioned cluster with On-Demand pricing: Incorrect. On-Demand provisioned clusters charge by the hour for the full node capacity regardless of whether queries are running. A cluster that sits idle between sporadic workloads still incurs hourly costs, making it more expensive than Serverless for this pattern.",
      "Amazon Athena with Redshift Spectrum: Incorrect. Athena is a serverless SQL engine for S3 data, not a Redshift deployment option. Redshift Spectrum is a Redshift feature that queries S3 data from within a provisioned Redshift cluster. Neither replaces Amazon Redshift Serverless for running Redshift SQL queries without cluster management."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-whatis.html", title: "What Is Amazon Redshift Serverless?" }
    ]
  },
  {
    id: 54,
    question: "A data engineer is designing a graph data model to store social network relationships where queries frequently traverse connections between users (e.g., 'find all friends of friends within 3 hops'). Which AWS database service is MOST appropriate for this workload?",
    options: [
      "Amazon RDS PostgreSQL",
      "Amazon DynamoDB with adjacency list pattern",
      "Amazon Neptune",
      "Amazon Redshift with recursive CTEs"
    ],
    correctAnswer: 2,
    category: "Data Store Management",
    explanation: "Amazon Neptune is a fully managed graph database service that natively supports property graph (Gremlin) and RDF (SPARQL) query languages. Multi-hop traversal queries — such as finding friends of friends within N hops — are graph-native operations that Neptune executes efficiently using its purpose-built graph storage engine.",
    optionExplanations: [
      "Amazon RDS PostgreSQL: Incorrect. PostgreSQL supports recursive CTEs and can model graph relationships using adjacency tables, but multi-hop traversal queries become progressively slower as the depth increases because relational joins at each hop are expensive. PostgreSQL is not purpose-built for graph traversal workloads.",
      "Amazon DynamoDB with adjacency list pattern: Incorrect. DynamoDB can model graph relationships using a single-table adjacency list design, but traversing N hops requires N sequential GetItem or Query calls. Deep traversals generate high read latency and consume significant RCUs, making it unsuitable for complex graph traversal patterns.",
      "Amazon Neptune: ✓ Correct. Neptune is AWS's purpose-built managed graph database. Its storage engine is optimized for storing vertices and edges and executing traversal queries at depth. A Gremlin query like g.V(userId).repeat(out('FRIEND')).times(3).dedup() efficiently finds all friends within 3 hops using Neptune's native index structures.",
      "Amazon Redshift with recursive CTEs: Incorrect. Redshift is a columnar data warehouse optimized for bulk analytical queries over large datasets. While it supports recursive CTEs (WITH RECURSIVE), recursive graph traversals in Redshift require full table scans at each recursion level and are orders of magnitude slower than Neptune for deep graph traversals."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/neptune/latest/userguide/intro.html", title: "What Is Amazon Neptune?" }
    ]
  },
  {
    id: 55,
    question: "A company uses AWS CloudTrail to log all API activity across its AWS accounts. The security team wants to run SQL queries across CloudTrail logs from the last 90 days spanning multiple accounts and regions from a single place, without setting up Athena tables manually. Which AWS service provides this capability?",
    options: [
      "Amazon CloudWatch Logs Insights",
      "AWS CloudTrail Lake",
      "Amazon OpenSearch Service with CloudTrail log delivery",
      "Amazon Athena with manually created CloudTrail tables"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "AWS CloudTrail Lake is a managed audit and security lake that aggregates CloudTrail events from multiple accounts and regions into an immutable event data store. It provides a built-in SQL query interface (based on Apache ORC) that allows the security team to query events directly without creating Athena tables, configuring S3 paths, or managing ETL pipelines.",
    optionExplanations: [
      "Amazon CloudWatch Logs Insights: Incorrect. CloudWatch Logs Insights queries application and system logs stored in CloudWatch Log Groups. It does not ingest CloudTrail API events or support cross-account, cross-region consolidation of audit trails in the way CloudTrail Lake does.",
      "AWS CloudTrail Lake: ✓ Correct. CloudTrail Lake ingests CloudTrail events from multiple accounts and AWS Organizations into a centralized, immutable event data store. The built-in query editor uses SQL to search events across accounts and regions for up to 7 years (configurable retention). No S3 bucket configuration, Glue crawlers, or Athena table DDL is required.",
      "Amazon OpenSearch Service with CloudTrail log delivery: Incorrect. While OpenSearch can ingest and search CloudTrail logs (via Kinesis or Lambda), it requires setting up an OpenSearch domain, configuring ingestion pipelines, and defining index mappings. This introduces significant operational overhead compared to the zero-setup CloudTrail Lake approach.",
      "Amazon Athena with manually created CloudTrail tables: Incorrect. Athena can query CloudTrail logs stored in S3 and AWS provides a CloudTrail table creation wizard. However, this requires configuring separate tables per account/region, managing S3 paths, running MSCK REPAIR TABLE for new partitions, and coordinating cross-account S3 access — all manual steps that CloudTrail Lake handles automatically."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html", title: "AWS CloudTrail Lake" }
    ]
  },
  {
    id: 56,
    question: "A data engineer is deploying an Amazon MSK (Managed Streaming for Apache Kafka) cluster to ingest IoT sensor data. The pipeline must deliver records from MSK to Amazon OpenSearch Service for real-time search and alerting. The team wants to avoid writing custom consumer code. Which approach requires the LEAST custom development?",
    options: [
      "Write a Java Kafka consumer application deployed on Amazon ECS that reads from MSK and writes to OpenSearch",
      "Use Amazon MSK Connect with the OpenSearch Kafka connector plugin",
      "Configure Kinesis Data Firehose to read from MSK and deliver to OpenSearch",
      "Use an AWS Lambda function triggered by MSK events to write to OpenSearch"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Amazon MSK Connect is a fully managed Kafka Connect service that runs connector plugins without custom code. The community-maintained OpenSearch Kafka Sink Connector can be deployed as a worker on MSK Connect, reading records from MSK topics and indexing them into OpenSearch automatically — no consumer code required.",
    optionExplanations: [
      "Write a Java Kafka consumer application deployed on Amazon ECS that requires custom Kafka consumer code, ECS task definition, container image build, and deployment pipeline management — the highest development and operational overhead of all options.",
      "Use Amazon MSK Connect with the OpenSearch Kafka connector plugin: ✓ Correct. MSK Connect is AWS's managed Kafka Connect service. The engineer uploads the OpenSearch Kafka Sink Connector JAR (available from the OpenSearch project) as a custom plugin, creates a connector configuration specifying the MSK bootstrap servers, topic names, and OpenSearch endpoint, and MSK Connect manages worker scaling, fault tolerance, and offset tracking — zero consumer code needed.",
      "Configure Kinesis Data Firehose to read from MSK and deliver to OpenSearch: Incorrect. Amazon Kinesis Data Firehose can deliver to Amazon OpenSearch Service, but Firehose reads from Kinesis Data Streams, not from Amazon MSK/Kafka topics. There is no native Firehose source connector for MSK.",
      "Use an AWS Lambda function triggered by MSK events to write to OpenSearch: Incorrect. Lambda does support MSK as an event source trigger (via the MSK event source mapping). However, this requires writing Lambda code to format and index records into OpenSearch, implementing error handling and retry logic, and managing batch size tuning — more custom development than MSK Connect."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/msk/latest/developerguide/msk-connect.html", title: "Amazon MSK Connect" }
    ]
  },
  {
    id: 57,
    question: "A company wants to enforce a governance policy that prevents any Amazon S3 bucket in its AWS Organization from being made publicly accessible. The policy must be applied automatically to all existing and future accounts in the organization. Which AWS service and feature implement this control?",
    options: [
      "Amazon Macie with an automated finding action",
      "AWS Config with a conformance pack that includes the s3-bucket-public-access-prohibited rule and automatic remediation",
      "An S3 bucket policy applied via AWS CloudFormation StackSets",
      "Amazon GuardDuty with S3 protection enabled"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "AWS Config managed rules continuously evaluate resource configurations against desired policies. The s3-bucket-public-access-prohibited rule flags any S3 bucket where Block Public Access settings are disabled. Deploying this rule via a conformance pack with automatic remediation (using Systems Manager Automation) across an AWS Organization ensures consistent enforcement on all current and future accounts.",
    optionExplanations: [
      "Amazon Macie with an automated finding action: Incorrect. Macie discovers and classifies sensitive data in S3 buckets. While Macie can detect publicly accessible buckets as a finding, it does not enforce configuration compliance or automatically remediate bucket settings. It is a data discovery tool, not a configuration governance tool.",
      "AWS Config with a conformance pack that includes the s3-bucket-public-access-prohibited rule and automatic remediation: ✓ Correct. AWS Config conformance packs bundle multiple Config rules and optional remediation actions into a single deployable package. Deploying the conformance pack via AWS Organizations to all accounts in the org continuously monitors and can automatically remediate (via SSM Automation) any bucket where public access is not blocked — covering both existing and new accounts.",
      "An S3 bucket policy applied via AWS CloudFormation StackSets: Incorrect. CloudFormation StackSets can deploy S3 bucket policies to specific named buckets across accounts. However, bucket policies cannot prevent the bucket's Block Public Access settings from being disabled, and StackSets do not continuously monitor new buckets created after deployment.",
      "Amazon GuardDuty with S3 protection enabled: Incorrect. GuardDuty S3 Protection monitors S3 data access patterns for malicious activity (e.g., unusual API calls, suspicious access patterns). It detects threats but does not evaluate or enforce S3 configuration settings such as Block Public Access."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/conformance-packs.html", title: "AWS Config Conformance Packs" },
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-public-access-prohibited.html", title: "s3-bucket-public-access-prohibited Config Rule" }
    ]
  },
  {
    id: 58,
    question: "A machine learning team trains models using features derived from a data pipeline. The team must track exactly which datasets and transformations produced each model version to satisfy audit requirements. Which AWS service provides end-to-end data lineage tracking for ML pipelines?",
    options: [
      "AWS Glue Data Catalog with table versioning",
      "Amazon SageMaker ML Lineage Tracking",
      "AWS CloudTrail with S3 data event logging",
      "Amazon CloudWatch Container Insights"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "Amazon SageMaker ML Lineage Tracking automatically records the relationships between datasets, processing jobs, training jobs, models, and model deployments within SageMaker. It builds a lineage graph that allows data engineers and auditors to trace exactly which input data and code version produced a specific model, satisfying audit and reproducibility requirements.",
    optionExplanations: [
      "AWS Glue Data Catalog with table versioning: Incorrect. Glue Data Catalog tracks schema versions of tables (DDL changes over time). It does not record the lineage of transformations, training jobs, or the datasets used to produce ML model artifacts.",
      "Amazon SageMaker ML Lineage Tracking: ✓ Correct. SageMaker ML Lineage Tracking creates Lineage entities (Artifact, Execution, Context, Association) that form a directed acyclic graph (DAG) linking datasets → processing jobs → feature stores → training jobs → models → endpoints. The lineage graph is queryable via the SageMaker SDK, enabling full audit traceability of each model version back to its source data.",
      "AWS CloudTrail with S3 data event logging: Incorrect. CloudTrail records API calls, including S3 GetObject and PutObject events. While useful for access auditing, it captures raw API activity and does not create semantic relationships between ML pipeline components or build a lineage graph linking datasets to model versions.",
      "Amazon CloudWatch Container Insights: Incorrect. CloudWatch Container Insights collects performance metrics and logs from containerized applications (EKS, ECS). It provides operational observability for infrastructure but has no capability for ML pipeline lineage tracking."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/lineage-tracking.html", title: "Amazon SageMaker ML Lineage Tracking" }
    ]
  },
  {
    id: 59,
    question: "A data engineer needs to load a 500 GB CSV file from Amazon S3 into Amazon Redshift as fast as possible. The target table is empty. Which loading strategy minimizes load time?",
    options: [
      "Use a single COPY command with the file as-is",
      "Split the file into multiple equal-sized parts, upload them to S3, and run a COPY command referencing a manifest file or S3 prefix",
      "Use an INSERT INTO ... SELECT statement via a Redshift Spectrum external table",
      "Load the data with a single AWS Glue job using a JDBC connection to Redshift"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Redshift's COPY command achieves maximum throughput when the source data is split into multiple files equal to (or a multiple of) the number of Redshift slices. Each node slice processes one file in parallel, saturating all available I/O and CPU. A single large file is loaded by only one slice, leaving most cluster capacity idle.",
    optionExplanations: [
      "Use a single COPY command with the file as-is: Incorrect. Redshift's COPY command is parallelized across all node slices, but it can only parallelize a single file within the constraints of the file format. A single 500 GB CSV file is loaded by one slice at a time, grossly under-utilizing the cluster's parallel loading capacity.",
      "Split the file into multiple equal-sized parts, upload them to S3, and run a COPY command referencing a manifest file or S3 prefix: ✓ Correct. Splitting the file into N parts — where N equals the number of Redshift slices (or a multiple thereof) — allows each slice to load its own file concurrently. This fully utilizes the cluster's parallel I/O capacity and provides the fastest possible load time. AWS explicitly recommends splitting input files for COPY performance.",
      "Use an INSERT INTO ... SELECT statement via a Redshift Spectrum external table: Incorrect. INSERT INTO ... SELECT reads data through a Redshift Spectrum layer (which adds query planning and Spectrum compute overhead) and inserts rows one batch at a time. The COPY command is significantly faster because it uses a dedicated, highly optimized parallel load path that bypasses the query executor.",
      "Load the data with a single AWS Glue job using a JDBC connection to Redshift: Incorrect. Loading via JDBC inserts rows in batches through a single Redshift connection. JDBC throughput is orders of magnitude lower than COPY, which uses Redshift's internal parallel load infrastructure. For bulk loads, COPY via S3 is always preferred over JDBC."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/t_splitting-data-files.html", title: "Splitting Your Data into Multiple Files for COPY" },
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/r_COPY.html", title: "Amazon Redshift COPY Command" }
    ]
  },
  {
    id: 60,
    question: "A data engineer has deployed an AWS Glue ETL job that transforms data and writes output to Amazon S3. A downstream data quality check occasionally finds that the output contains stale records from a previous failed run mixed with the current run's output. Which approach prevents this data inconsistency?",
    options: [
      "Enable Glue job bookmarks to skip previously processed inputs",
      "Write output to a temporary S3 prefix and perform an atomic rename to the final prefix only after the job succeeds",
      "Increase the Glue job timeout setting",
      "Enable S3 Versioning on the output bucket"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "Writing to a staging prefix and atomically moving (renaming by copy+delete at S3 prefix level) output to the final destination only after job success ensures that downstream consumers never see partial or mixed output. If the job fails mid-run, the staging prefix contains incomplete data while the final prefix retains the last successful complete output.",
    optionExplanations: [
      "Enable Glue job bookmarks to skip previously processed inputs: Incorrect. Glue job bookmarks track which input data has been read, preventing re-reading of already-processed source files. They do not address the problem of mixed output in the destination — a failed job may have written partial output to the target prefix before failing, regardless of bookmarks.",
      "Write output to a temporary S3 prefix and perform an atomic rename to the final prefix only after the job succeeds: ✓ Correct. This staging pattern implements transactional semantics for S3 writes. The Glue job writes all output to a temp prefix (e.g., s3://bucket/output-staging/run-id/). After the job completes successfully, an atomic promotion step copies the staged files to the final prefix and deletes the staging files. If the job fails, the final prefix is untouched, preventing stale data contamination.",
      "Increase the Glue job timeout setting: Incorrect. Extending the timeout gives the job more time to complete before being forcibly terminated, but it does not prevent partial output from a job that fails partway through. The root cause — partial writes reaching the final destination — is not addressed by the timeout setting.",
      "Enable S3 Versioning on the output bucket: Incorrect. S3 Versioning retains multiple versions of objects and allows recovery of previous states. However, it does not prevent new objects from being written by a failed job. The final prefix would still contain a mix of current and stale objects after a partial run, and versioning adds storage costs without solving the consistency problem."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-partitions.html", title: "Managing Partitions in AWS Glue" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html", title: "Amazon S3 Object Keys and Prefixes" }
    ]
  },
  {
    id: 61,
    question: "A data engineer needs to export the results of a large Amazon Redshift query (approximately 200 GB) to Amazon S3 for downstream processing. The engineer runs a SELECT query and tries to save the results using a client-side tool, but the export times out. Which Redshift feature should be used instead?",
    options: [
      "Amazon Redshift Spectrum external table INSERT",
      "The Redshift UNLOAD command",
      "AWS DMS full-load task from Redshift to S3",
      "Amazon Kinesis Data Firehose with a Redshift source"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "The Redshift UNLOAD command exports query results directly from Redshift to Amazon S3 in parallel using all node slices. It bypasses client-side limitations, supports compressed and columnar output formats (Parquet, CSV), and can handle hundreds of GB in minutes — all without passing data through a client application.",
    optionExplanations: [
      "Amazon Redshift Spectrum external table INSERT: Incorrect. Redshift Spectrum reads from S3 via external tables; it does not write query results back to S3. There is no INSERT INTO an external Spectrum table that writes to S3 in Redshift.",
      "The Redshift UNLOAD command: ✓ Correct. UNLOAD executes a SELECT query and writes the result set in parallel to one or more S3 objects, one per node slice. It supports CSV, JSON, and Parquet output with optional gzip/Zstandard compression. Because writing is parallelized across all slices, even very large result sets complete quickly without any client-side memory or timeout constraints.",
      "AWS DMS full-load task from Redshift to S3: Incorrect. AWS DMS can use Redshift as a source for migration tasks, but it is designed for database replication, not for exporting specific query results. DMS reads entire tables row by row, is not optimized for large analytical exports, and adds significant operational overhead compared to a single UNLOAD statement.",
      "Amazon Kinesis Data Firehose with a Redshift source: Incorrect. Kinesis Data Firehose does not support Amazon Redshift as a data source. Firehose can deliver data TO Redshift (via COPY), but cannot read FROM Redshift and stream results to S3."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/r_UNLOAD.html", title: "Amazon Redshift UNLOAD Command" }
    ]
  },
  {
    id: 62,
    question: "A company manages a data lake with hundreds of databases and thousands of tables in AWS Lake Formation. The data governance team wants to grant access based on business tags (e.g., domain=finance, sensitivity=confidential) rather than managing individual table permissions. Which Lake Formation feature enables tag-based access control?",
    options: [
      "Lake Formation row-level security filters",
      "Lake Formation LF-Tags (tag-based access control)",
      "AWS IAM resource tags with condition keys",
      "Lake Formation data cell filters"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "Lake Formation LF-Tags allow administrators to attach key-value tags (e.g., domain=finance) to databases, tables, and columns. IAM principals are then granted permissions on LF-Tag expressions rather than specific resources. When a new table is tagged, all principals with permissions on that tag automatically gain access — eliminating the need to update individual resource permissions each time new datasets are added.",
    optionExplanations: [
      "Lake Formation row-level security filters: Incorrect. Lake Formation data filters can implement row-level and cell-level security by filtering which rows or columns a principal can see. However, they are applied to specific tables individually and do not provide a tag-based policy model that applies automatically to all resources sharing the same tag.",
      "Lake Formation LF-Tags (tag-based access control): ✓ Correct. LF-Tags (also called LF-TBAC, Tag-Based Access Control) decouple permission management from individual resource names. Administrators define tags (e.g., sensitivity=confidential), attach them to resources, and grant IAM roles permission on tag expressions. New resources tagged appropriately are automatically covered by existing grants — highly scalable for large data lake environments.",
      "AWS IAM resource tags with condition keys: Incorrect. IAM supports resource-based condition keys (e.g., aws:ResourceTag) for some services, but Lake Formation's fine-grained table and column permissions are managed through Lake Formation's own permission model, not through standard IAM resource tag conditions. IAM tags alone cannot enforce Lake Formation-level table/column access control.",
      "Lake Formation data cell filters: Incorrect. Data cell filters define row-level and column-level security on a specific table (e.g., WHERE region = 'US'). They are assigned per table per principal and do not scale to hundreds of tables through a single tag-based policy expression."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lake-formation/latest/dg/tag-based-access-control.html", title: "Lake Formation Tag-Based Access Control (LF-Tags)" }
    ]
  },
  {
    id: 63,
    question: "A data engineer has several AWS Glue jobs that must run in a specific sequence: a crawler must complete before a transformation job starts, and the transformation job must succeed before a data quality job runs. The pipeline should be triggered on a schedule. Which AWS Glue feature orchestrates this dependency-based sequence?",
    options: [
      "AWS Glue job bookmarks with chained triggers",
      "AWS Glue Workflows with scheduled and conditional triggers",
      "Amazon EventBridge rules with multiple targets",
      "AWS Step Functions with Glue StartJobRun tasks"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "AWS Glue Workflows let a data engineer define a directed acyclic graph (DAG) of Glue crawlers, jobs, and triggers within a single workflow. A scheduled trigger starts the workflow, and conditional triggers within the workflow fire each subsequent node only when the preceding node completes successfully — natively implementing dependency-based sequencing without external orchestrators.",
    optionExplanations: [
      "AWS Glue job bookmarks with chained triggers: Incorrect. Glue job bookmarks track incremental data processing state. While Glue triggers can be chained (one job's completion triggers the next), job bookmarks themselves do not manage execution dependencies. Chained triggers also lack a visual DAG view and are harder to manage than a Glue Workflow.",
      "AWS Glue Workflows with scheduled and conditional triggers: ✓ Correct. A Glue Workflow groups all crawlers and jobs into one managed unit. A scheduled trigger starts the workflow at the defined time. Conditional (ON_DEMAND or event-based) triggers within the workflow monitor each node's completion status and start the next node only when the predecessor succeeds — exactly matching the described three-step dependency chain.",
      "Amazon EventBridge rules with multiple targets: Incorrect. EventBridge can invoke multiple Lambda functions or Glue jobs in response to events, but it does not natively enforce sequential dependencies between jobs. Implementing conditional execution (run job B only if job A succeeded) requires additional Lambda functions to check job status, adding custom code complexity.",
      "AWS Step Functions with Glue StartJobRun tasks: Incorrect. Step Functions can orchestrate Glue jobs using the Glue StartJobRun API action and is a valid general-purpose approach. However, the question asks for a Glue-native feature, and AWS Glue Workflows provide the same dependency management within the Glue console without requiring a separate Step Functions state machine definition."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/workflows_overview.html", title: "AWS Glue Workflows Overview" }
    ]
  },
  {
    id: 64,
    question: "A company is migrating an Apache Cassandra application to AWS. The application runs time-series workloads with high write throughput and queries data using compound primary keys. The team wants a fully managed service with Cassandra-compatible CQL (Cassandra Query Language) APIs to minimize application code changes. Which AWS service should they use?",
    options: [
      "Amazon DynamoDB",
      "Amazon Keyspaces (for Apache Cassandra)",
      "Amazon RDS for PostgreSQL with the pg_partman extension",
      "Amazon Redshift with time-series sort keys"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "Amazon Keyspaces is a fully managed, serverless Cassandra-compatible database service. It supports the Apache Cassandra Query Language (CQL) API, allowing applications to connect using existing Cassandra drivers with minimal code changes. It scales automatically for high write throughput and supports compound primary keys natively.",
    optionExplanations: [
      "Amazon DynamoDB: Incorrect. DynamoDB is a fully managed NoSQL key-value and document database. While it offers similar scalability, it uses its own SDK and API (not CQL). Migrating a Cassandra application to DynamoDB requires rewriting all data access code to use DynamoDB's APIs, defeating the goal of minimizing code changes.",
      "Amazon Keyspaces (for Apache Cassandra): ✓ Correct. Amazon Keyspaces is wire-compatible with Apache Cassandra's CQL v3. Existing Cassandra applications can connect to Keyspaces using standard Cassandra drivers simply by updating the connection endpoint. Keyspaces handles capacity management, replication, patching, and backup automatically — requiring only minimal configuration changes from the current Cassandra setup.",
      "Amazon RDS for PostgreSQL with the pg_partman extension: Incorrect. PostgreSQL is a relational database. While pg_partman handles table partitioning for time-series data, it does not provide Cassandra CQL compatibility. Migrating a Cassandra application to PostgreSQL requires a complete rewrite of data access logic.",
      "Amazon Redshift with time-series sort keys: Incorrect. Redshift is a columnar data warehouse optimized for analytical queries. It is not appropriate for high-throughput transactional write workloads, does not support CQL, and does not serve as an OLTP database for application data access patterns."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/keyspaces/latest/devguide/what-is-keyspaces.html", title: "What Is Amazon Keyspaces?" }
    ]
  },
  {
    id: 65,
    question: "A data pipeline uses AWS Lambda functions that connect to an Amazon RDS MySQL database to perform lookups during record enrichment. Under peak load, Lambda opens thousands of concurrent connections and the RDS database runs out of available connections, causing errors. Which AWS service resolves this connection exhaustion problem?",
    options: [
      "Amazon ElastiCache for Redis as a connection cache layer",
      "Amazon RDS Proxy",
      "Increasing the max_connections parameter in the RDS parameter group",
      "Switching Lambda to use DynamoDB instead of RDS"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Amazon RDS Proxy is a fully managed database proxy that sits between application clients (Lambda functions) and RDS. It pools and reuses database connections, so thousands of concurrent Lambda invocations share a much smaller set of actual connections to RDS. This eliminates connection exhaustion without changing the Lambda or RDS configuration significantly.",
    optionExplanations: [
      "Amazon ElastiCache for Redis as a connection cache layer: Incorrect. ElastiCache Redis is an in-memory caching service used to cache query results or session data. It does not act as a connection pool for RDS and would require significant application changes to implement a caching layer, which may not be appropriate for real-time enrichment lookups that must always return current data.",
      "Amazon RDS Proxy: ✓ Correct. RDS Proxy maintains a pool of established database connections. Lambda functions connect to the Proxy endpoint instead of directly to RDS. The Proxy multiplexes thousands of Lambda connections onto a small number of persistent database connections. This is the AWS-recommended solution for Lambda-to-RDS connection management and requires only a connection string change in Lambda.",
      "Increasing the max_connections parameter in the RDS parameter group: Incorrect. Raising max_connections allows more simultaneous connections but increases RDS memory consumption proportionally (each connection consumes RAM). For serverless Lambda at high concurrency, the number of connections can grow unboundedly, exhausting both connection limits and memory regardless of parameter tuning. This is a workaround, not a solution.",
      "Switching Lambda to use DynamoDB instead of RDS: Incorrect. DynamoDB and RDS serve different use cases and have different data models. Switching databases entirely would require redesigning the data model, rewriting queries, and migrating data — a major architectural change that is disproportionate to the problem of connection pooling."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html", title: "Using Amazon RDS Proxy" }
    ]
  },
  {
    id: 66,
    question: "A data engineer needs to run large-scale parallel batch jobs that process thousands of genomics files stored in Amazon S3. Each file requires a separate containerized processing job that may run for several hours. The engineer wants a managed service that handles job scheduling, dependency management, and retries without managing a cluster. Which AWS service is MOST appropriate?",
    options: [
      "AWS Lambda with S3 event triggers",
      "AWS Batch with a managed compute environment",
      "Amazon EMR with Apache Spark",
      "Amazon ECS with a manually configured task scheduler"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "AWS Batch is a fully managed batch computing service that dynamically provisions the optimal compute resources (EC2 or Fargate) based on job volume and resource requirements. It handles job queuing, scheduling, dependency chains, automatic retries, and scales compute capacity to zero when no jobs are running — ideal for large-scale, long-running containerized batch workloads.",
    optionExplanations: [
      "AWS Lambda with S3 event triggers: Incorrect. Lambda has a maximum execution timeout of 15 minutes. Genomics processing jobs that run for several hours cannot be completed within a single Lambda invocation. Lambda is designed for event-driven, short-duration functions, not long-running batch jobs.",
      "AWS Batch with a managed compute environment: ✓ Correct. AWS Batch manages the full lifecycle of batch jobs. The engineer defines a job definition (Docker image, CPU, memory requirements), submits jobs to a queue, and Batch provisions EC2 Spot or On-Demand instances (or Fargate tasks) automatically. It supports job dependencies (run job B only after job A succeeds), configurable retry strategies, and scales the compute environment to zero during idle periods — all without cluster management.",
      "Amazon EMR with Apache Spark: Incorrect. EMR with Spark is optimized for distributed data processing workloads using the Spark programming model. It is not designed to run thousands of independent containerized jobs in parallel. Setting up an EMR cluster for independent per-file containerized jobs would be architecturally complex and cost-inefficient.",
      "Amazon ECS with a manually configured task scheduler: Incorrect. ECS can run containerized tasks, but manually configuring job scheduling, dependency management, retry logic, and compute scaling for thousands of parallel jobs requires significant custom infrastructure code. AWS Batch provides all of these capabilities as managed features."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html", title: "What Is AWS Batch?" }
    ]
  },
  {
    id: 67,
    question: "A data engineer wants to build an event-driven pipeline where records published to an Amazon SQS queue are transformed by a Lambda function and then loaded into Amazon Kinesis Data Firehose — all without writing custom polling or integration code. Which AWS service connects these sources and targets through a managed pipe?",
    options: [
      "AWS Step Functions Express Workflow",
      "Amazon EventBridge Pipes",
      "Amazon SNS with a Lambda subscriber and Firehose subscription",
      "AWS Glue Streaming ETL with an SQS source"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Amazon EventBridge Pipes provides a point-to-point integration between a supported source (SQS, Kinesis, DynamoDB Streams, MSK, etc.) and a target (Lambda, Firehose, Step Functions, etc.) with an optional enrichment step (Lambda, API Gateway, etc.) in the middle — all configured declaratively with no custom polling or glue code.",
    optionExplanations: [
      "AWS Step Functions Express Workflow: Incorrect. Step Functions can orchestrate Lambda and other services in a workflow, but it does not natively poll SQS as an event source or deliver records to Kinesis Data Firehose without custom state machine logic. Step Functions requires an external trigger to start an execution.",
      "Amazon EventBridge Pipes: ✓ Correct. EventBridge Pipes connects an event source (SQS queue) directly to a target (Kinesis Data Firehose) with an optional enrichment Lambda in between. The Pipe continuously polls SQS, passes batches to the enrichment Lambda for transformation, and forwards the transformed records to Firehose — all managed by EventBridge with no custom integration code required.",
      "Amazon SNS with a Lambda subscriber and Firehose subscription: Incorrect. SNS can fan out messages to Lambda and Firehose simultaneously, but it does not process SQS messages — SNS is a pub/sub notification service, not an SQS consumer. This option also does not provide the sequential source → enrichment → target pipe pattern described.",
      "AWS Glue Streaming ETL with an SQS source: Incorrect. AWS Glue Streaming ETL supports Kinesis Data Streams and MSK as streaming sources, but does not natively consume from Amazon SQS. Using Glue for this simple point-to-point pipe pattern would also require a full Spark Streaming job setup — far more complex than a declarative EventBridge Pipe."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html", title: "Amazon EventBridge Pipes" }
    ]
  },
  {
    id: 68,
    question: "A company's DynamoDB table serves millions of reads per second for a leaderboard application. Read latency must be in the microsecond range, but the current DynamoDB table delivers single-digit millisecond latency, which is too slow for the use case. Which AWS service provides microsecond-latency caching for DynamoDB?",
    options: [
      "Amazon ElastiCache for Redis",
      "Amazon DynamoDB Accelerator (DAX)",
      "Amazon CloudFront with DynamoDB as an origin",
      "Amazon MemoryDB for Redis"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "Amazon DynamoDB Accelerator (DAX) is a fully managed, in-memory cache specifically designed for DynamoDB. It is API-compatible with DynamoDB, requiring minimal code changes (only the endpoint changes from DynamoDB to DAX). DAX reduces read latency from single-digit milliseconds to microseconds for eventually consistent reads, making it ideal for high-read leaderboard workloads.",
    optionExplanations: [
      "Amazon ElastiCache for Redis: Incorrect. ElastiCache Redis is a general-purpose in-memory cache. While it can cache DynamoDB results, it requires custom application code to implement a cache-aside pattern (read from cache, miss → read from DynamoDB → populate cache). It is not API-compatible with DynamoDB and involves significant development effort compared to DAX.",
      "Amazon DynamoDB Accelerator (DAX): ✓ Correct. DAX is a purpose-built, fully managed in-memory cache for DynamoDB. It intercepts DynamoDB API calls transparently using a cluster endpoint, caches item and query results, and returns cached responses in microseconds without application-layer cache management code. It handles cache invalidation automatically on writes.",
      "Amazon CloudFront with DynamoDB as an origin: Incorrect. CloudFront is a content delivery network (CDN) designed to cache and serve HTTP responses from web origins. It cannot directly query DynamoDB — there is no native CloudFront-to-DynamoDB integration. CloudFront requires an HTTP API (API Gateway or Lambda URL) in front of DynamoDB, adding latency rather than reducing it.",
      "Amazon MemoryDB for Redis: Incorrect. MemoryDB for Redis is a durable, Redis-compatible in-memory database designed to replace Redis as a primary database (not as a DynamoDB cache). Like ElastiCache Redis, it is not DynamoDB API-compatible and requires a custom cache-aside implementation to front DynamoDB."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html", title: "In-Memory Acceleration with DynamoDB Accelerator (DAX)" }
    ]
  },
  {
    id: 69,
    question: "A large organization has multiple teams sharing an Amazon Athena environment. The finance team's long-running queries are consuming all available query capacity, causing the engineering team's queries to queue for hours. A data engineer must isolate query resources between teams and apply per-team data usage limits. Which Athena feature should be configured?",
    options: [
      "Athena Federated Query with separate Lambda connectors per team",
      "Athena workgroups with per-workgroup data usage controls and IAM-enforced workgroup assignment",
      "Separate AWS accounts for each team with individual Athena quotas",
      "Athena query result caching to reduce repeated query load"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "Athena workgroups isolate query execution and resource usage between groups of users. Each team is assigned to a separate workgroup. Per-workgroup data usage controls enforce limits on the amount of data scanned per query or per workgroup, preventing one team from starving others. IAM policies can restrict users to their assigned workgroup.",
    optionExplanations: [
      "Athena Federated Query with separate Lambda connectors per team: Incorrect. Federated Query connectors enable Athena to query external data sources. They are a data access mechanism, not a resource isolation or quota enforcement mechanism. Separate connectors per team do not prevent one team's queries from consuming shared Athena capacity.",
      "Athena workgroups with per-workgroup data usage controls and IAM-enforced workgroup assignment: ✓ Correct. Workgroups are the native Athena mechanism for multi-tenancy. Each workgroup has independent query history, result locations, and — critically — configurable data usage controls (e.g., per-query data scanned limit, per-workgroup aggregate limit with optional query cancellation). IAM policies using the athena:workgroup condition key enforce that finance team users submit queries only to the finance workgroup, preventing resource contention.",
      "Separate AWS accounts for each team with individual Athena quotas: Incorrect. Using separate AWS accounts provides complete isolation but introduces significant operational overhead (cross-account data access, billing consolidation, separate Glue Data Catalog management). It is an over-engineered solution when Athena workgroups provide the required isolation within a single account.",
      "Athena query result caching to reduce repeated query load: Incorrect. Query result reuse returns cached results for identical queries within a workgroup, reducing redundant S3 scans. It improves efficiency but does not provide resource isolation between teams — one team's unique queries still compete with another team's queries for the same capacity."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/user-created-workgroups.html", title: "Using Workgroups to Control Query Access and Costs in Athena" }
    ]
  },
  {
    id: 70,
    question: "A company runs machine learning training jobs on Amazon EMR using Apache Spark. The cluster is provisioned with On-Demand instances and sits idle for 70% of the day. A data engineer wants to reduce cost while maintaining the ability to process urgent jobs without delay. Which configuration change achieves this?",
    options: [
      "Convert the persistent EMR cluster to a transient cluster that terminates after each job and stores data in Amazon S3",
      "Replace all On-Demand core nodes with Spot Instances",
      "Enable EMR auto-termination policy with a 1-hour idle timeout and store all data in Amazon S3 instead of HDFS",
      "Attach an EBS volume to the master node to reduce S3 data transfer costs"
    ],
    correctAnswer: 2,
    category: "Data Operations and Support",
    explanation: "Enabling EMR's auto-termination policy with an idle timeout automatically terminates the cluster after it has been idle for the configured period, stopping all EC2 charges. Since all data is stored in S3 (not HDFS), the cluster can be re-launched on demand in minutes with no data loss. This eliminates idle cluster costs while retaining on-demand processing capability.",
    optionExplanations: [
      "Convert the persistent EMR cluster to a transient cluster that terminates after each job and stores data in Amazon S3: Incorrect. A transient cluster terminates after a single job completes. If an urgent job arrives while no cluster is running, it must wait for a new cluster to bootstrap (5–10 minutes). This approach also requires external orchestration (Step Functions or EventBridge) to submit and track each job, adding complexity. Auto-termination with idle timeout is simpler and more flexible.",
      "Replace all On-Demand core nodes with Spot Instances: Incorrect. Core nodes store HDFS data. If a Spot Instance running a core node is reclaimed, in-flight job data and HDFS blocks can be lost, causing job failures and data corruption. Spot Instances should only be used for task nodes (which do not store HDFS data).",
      "Enable EMR auto-termination policy with a 1-hour idle timeout and store all data in Amazon S3 instead of HDFS: ✓ Correct. The auto-termination policy monitors cluster activity and terminates the cluster after the specified idle period, stopping all node charges. Storing data in S3 (the EMR decoupled storage pattern) means the cluster is stateless — it can be terminated and re-launched quickly without data loss, balancing cost savings with responsiveness.",
      "Attach an EBS volume to the master node to reduce S3 data transfer costs: Incorrect. EBS volumes on the master node provide local disk storage for EMR logs and small temporary files. They do not reduce S3 data transfer costs significantly, do not address the idle cluster cost problem, and add a fixed EBS cost regardless of cluster utilization."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-auto-termination-policy.html", title: "EMR Auto-Termination Policy" },
      { url: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-storage.html", title: "Using EMRFS to Access S3 from EMR" }
    ]
  },
  {
    id: 71,
    question: "A company operates two separate Amazon Redshift clusters — one for the data engineering team (producer) and one for the analytics team (consumer). The analytics team needs to query the latest data from the engineering cluster's tables without copying or replicating data between clusters. Both clusters are in the same AWS account and region. Which Redshift feature enables this?",
    options: [
      "Redshift Spectrum with a shared S3 data lake",
      "Amazon Redshift data sharing",
      "AWS DMS ongoing replication between clusters",
      "Redshift federated query to the engineering cluster"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "Amazon Redshift data sharing allows a producer cluster to share live, transactionally consistent data with one or more consumer clusters without copying or moving data. The consumer cluster can query shared tables as if they were local, while all data remains on the producer cluster — eliminating ETL pipelines for cross-cluster data access.",
    optionExplanations: [
      "Redshift Spectrum with a shared S3 data lake: Incorrect. Redshift Spectrum queries data stored in Amazon S3 via external tables. This approach would require the engineering team to UNLOAD their tables to S3 regularly, introducing latency and a separate ETL step — the opposite of the zero-copy, live access requirement.",
      "Amazon Redshift data sharing: ✓ Correct. Redshift data sharing enables the producer cluster to create a datashare and grant the consumer cluster access to specific databases, schemas, or tables. The consumer queries the shared objects live via the producer's managed storage layer. No data movement, no replication jobs, and no ETL pipelines are required.",
      "AWS DMS ongoing replication between clusters: Incorrect. DMS CDC replication would continuously copy rows from the producer to the consumer cluster, creating a duplicate dataset with replication lag. This requires DMS infrastructure management, adds latency, and incurs additional storage costs on the consumer cluster.",
      "Redshift federated query to the engineering cluster: Incorrect. Redshift federated queries connect to external RDS or Aurora PostgreSQL/MySQL databases — not to other Redshift clusters. There is no native Redshift federated query connector for a remote Redshift cluster."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/datashare-overview.html", title: "Amazon Redshift Data Sharing" }
    ]
  },
  {
    id: 72,
    question: "A data engineer runs non-urgent AWS Glue ETL jobs overnight to process large datasets. The jobs are flexible on start time and can tolerate delays of up to 3 hours. The engineer wants to reduce Glue DPU costs without changing the job logic. Which Glue feature should be used?",
    options: [
      "Glue job bookmarks to skip previously processed data",
      "Glue Flex execution class",
      "Glue Auto Scaling to dynamically adjust DPUs",
      "Glue streaming ETL to replace batch jobs"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "AWS Glue Flex execution class runs Glue ETL jobs on spare, pre-emptible compute capacity, offering up to 34% cost savings compared to the Standard execution class. It is designed for non-urgent, time-flexible workloads. Jobs may take longer to start and could be interrupted, but the reduced DPU-hour rate significantly lowers cost for overnight batch processing.",
    optionExplanations: [
      "Glue job bookmarks to skip previously processed data: Incorrect. Job bookmarks reduce the volume of data processed by tracking which input files have already been handled. They reduce the number of DPU-hours consumed by processing less data, but they do not reduce the per-DPU-hour cost rate itself.",
      "Glue Flex execution class: ✓ Correct. Glue Flex uses AWS surplus compute capacity similarly to EC2 Spot Instances. By selecting the Flex execution class on the job definition, the engineer accepts that job start time may be delayed (up to the configured timeout) and the job may be retried if capacity is reclaimed. In exchange, the DPU-hour rate is reduced by up to 34% — directly lowering cost for overnight, time-flexible batch jobs.",
      "Glue Auto Scaling to dynamically adjust DPUs: Incorrect. Glue Auto Scaling adjusts the number of running workers during job execution based on actual workload demand, avoiding over-provisioning. It reduces wasted DPUs but does not change the per-DPU-hour billing rate. Cost savings from Auto Scaling are orthogonal to, and can be combined with, the Flex execution class.",
      "Glue streaming ETL to replace batch jobs: Incorrect. Converting batch jobs to streaming ETL changes the processing paradigm and architecture entirely. Streaming jobs run continuously and typically cost more than equivalent batch jobs for the same total data volume. This does not reduce cost for non-urgent overnight batch workloads."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/add-job.html#create-job-execution-class", title: "AWS Glue Flex Execution Class" }
    ]
  },
  {
    id: 73,
    question: "A company stores billions of objects in Amazon S3. Access patterns are unpredictable — some objects are accessed frequently for weeks and then become cold for months. The team wants to automatically optimize storage costs without building custom lifecycle rules and without paying retrieval fees for objects that are accessed. Which S3 storage class achieves this?",
    options: [
      "S3 Standard-IA",
      "S3 Intelligent-Tiering",
      "S3 Glacier Instant Retrieval",
      "S3 One Zone-IA"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "S3 Intelligent-Tiering automatically monitors access patterns and moves objects between multiple tiers (Frequent Access, Infrequent Access, Archive Instant Access) at no retrieval fee and no operational overhead. Objects that are not accessed for 30 days move to Infrequent Access automatically, saving up to 40% over S3 Standard — without any lifecycle rule configuration.",
    optionExplanations: [
      "S3 Standard-IA: Incorrect. S3 Standard-IA is designed for infrequently accessed data but charges a per-GB retrieval fee on every read. For objects with unpredictable access patterns that may be read frequently, these retrieval fees can make Standard-IA more expensive than S3 Standard. Manual lifecycle rules would still be needed to move objects to Standard-IA.",
      "S3 Intelligent-Tiering: ✓ Correct. S3 Intelligent-Tiering charges a small per-object monitoring fee and automatically moves objects between tiers based on observed access patterns — with no retrieval fees for objects in the Frequent or Infrequent Access tiers. This is the only S3 storage class that optimizes costs automatically for unpredictable access patterns without configuration or cost-on-retrieval penalties.",
      "S3 Glacier Instant Retrieval: Incorrect. Glacier Instant Retrieval offers millisecond retrieval but is optimized for data accessed once per quarter. It charges a retrieval fee and requires objects to remain for a minimum 90-day storage duration. For objects that may be accessed frequently for weeks at a time, retrieval fees would be significant.",
      "S3 One Zone-IA: Incorrect. S3 One Zone-IA stores data in a single Availability Zone, reducing durability (99.5% instead of 99.999999999%) and charging retrieval fees. It saves cost for reproducible data but is not appropriate as a general-purpose solution for unpredictable access patterns and provides no automatic tiering."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html", title: "Amazon S3 Intelligent-Tiering" }
    ]
  },
  {
    id: 74,
    question: "A company is migrating a heterogeneous database from Oracle to Amazon Aurora PostgreSQL. The schema contains Oracle-specific syntax (e.g., sequences, packages, PL/SQL procedures) that must be converted to PostgreSQL-compatible syntax. Which AWS tool automates this schema conversion?",
    options: [
      "AWS Database Migration Service (DMS) full-load task",
      "AWS Schema Conversion Tool (AWS SCT)",
      "AWS Glue DataBrew with schema mapping",
      "Amazon Athena CTAS to convert Oracle DDL"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "AWS Schema Conversion Tool (AWS SCT) analyzes the source Oracle schema and automatically converts database objects (tables, views, stored procedures, functions, triggers, packages) to Aurora PostgreSQL-compatible syntax. It flags objects that cannot be converted automatically and provides a migration assessment report to guide manual remediation.",
    optionExplanations: [
      "AWS Database Migration Service (DMS) full-load task: Incorrect. AWS DMS migrates data (rows) between databases and can perform heterogeneous data type mapping during migration. However, DMS does not convert schema objects such as stored procedures, PL/SQL packages, or Oracle-specific functions. Schema conversion must be performed separately using AWS SCT before running DMS.",
      "AWS Schema Conversion Tool (AWS SCT): ✓ Correct. AWS SCT is specifically designed for heterogeneous schema migration. It connects to the source Oracle database, scans all schema objects, and generates equivalent Aurora PostgreSQL DDL and procedural code. The tool provides a conversion assessment showing the percentage automatically converted and lists objects requiring manual intervention with recommended fixes.",
      "AWS Glue DataBrew with schema mapping: Incorrect. Glue DataBrew is a visual data preparation tool for cleaning and transforming datasets. It operates on data values (rows and columns), not database schema definitions. It cannot convert Oracle PL/SQL objects or DDL statements to PostgreSQL syntax.",
      "Amazon Athena CTAS to convert Oracle DDL: Incorrect. Athena CTAS (Create Table As Select) creates new tables in the Glue Data Catalog from Athena query results stored in S3. It is an S3-based analytics tool and has no capability to connect to Oracle or convert Oracle schema objects to PostgreSQL syntax."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html", title: "What Is the AWS Schema Conversion Tool?" }
    ]
  },
  {
    id: 75,
    question: "A data engineering team manages AWS Glue jobs, IAM roles, S3 bucket configurations, and CloudWatch alarms as infrastructure. The team wants to define all these resources in code so that the entire environment can be reproduced consistently across development, staging, and production accounts with a single deployment command. Which approach should they use?",
    options: [
      "Document all configurations in a runbook and execute manually per environment",
      "Use AWS CloudFormation or AWS CDK to define all resources as Infrastructure as Code (IaC)",
      "Use AWS Glue job parameters to switch between environment configurations",
      "Copy IAM roles and bucket policies using the AWS Console between accounts"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "AWS CloudFormation and AWS CDK (Cloud Development Kit) allow all AWS resources to be defined declaratively or programmatically in code. The same template or CDK app can be deployed to any account or region, guaranteeing consistent, repeatable infrastructure across environments. Version-controlled IaC enables code review, rollback, and CI/CD integration for infrastructure changes.",
    optionExplanations: [
      "Document all configurations in a runbook and execute manually per environment: Incorrect. Manual runbook execution is error-prone, time-consuming, and produces inconsistent environments. It cannot be version-controlled or automated, and drift between environments is inevitable as teams make ad-hoc changes without updating the runbook.",
      "Use AWS CloudFormation or AWS CDK to define all resources as Infrastructure as Code (IaC): ✓ Correct. CloudFormation templates (YAML/JSON) or CDK apps (Python, TypeScript, Java, etc.) define every resource — Glue jobs, IAM roles, S3 buckets, CloudWatch alarms — in a single deployable artifact. Deploying the same code to dev, staging, and prod accounts guarantees identical configurations, and changes are tracked in version control with full audit history.",
      "Use AWS Glue job parameters to switch between environment configurations: Incorrect. Glue job parameters allow runtime configuration of a specific Glue job (e.g., passing a different S3 path per environment). They address per-job configuration but cannot create or configure IAM roles, S3 buckets, CloudWatch alarms, or other AWS resources — only IaC tools can manage the full infrastructure stack.",
      "Copy IAM roles and bucket policies using the AWS Console between accounts: Incorrect. Manual copying via the console is slow, error-prone, and untraceable. IAM role trust policies reference account IDs that differ between environments, requiring manual edits. Console actions produce no version history and cannot be reproduced automatically."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cdk/v2/guide/home.html", title: "What Is the AWS CDK?" },
      { url: "https://docs.aws.amazon.com/cloudformation/index.html", title: "AWS CloudFormation Documentation" }
    ]
  },
  {
    id: 76,
    question: "A data engineer is designing an Amazon Redshift table for a fact table that stores 5 years of e-commerce orders. The most common query pattern filters by order_date (e.g., WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31'). Which Redshift table property maximizes query performance for this access pattern?",
    options: [
      "Set DISTKEY on order_date",
      "Set SORTKEY on order_date",
      "Set DISTSTYLE ALL on the fact table",
      "Set ENCODE RAW on order_date to prevent compression overhead"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "A SORTKEY on order_date physically sorts the data blocks on disk in date order. When a query filters on order_date, Redshift's zone maps (per-block min/max metadata) allow the query engine to skip entire blocks outside the date range, dramatically reducing the amount of data scanned and improving query performance.",
    optionExplanations: [
      "Set DISTKEY on order_date: Incorrect. DISTKEY controls how rows are distributed across compute nodes. Setting DISTKEY on order_date would place all rows with the same date on the same node, causing data skew (e.g., busy holiday periods may concentrate millions of rows on one node) and uneven workload distribution. DISTKEY does not enable block-level skipping for range queries.",
      "Set SORTKEY on order_date: ✓ Correct. A SORTKEY physically stores rows in sorted order by the key column. Redshift maintains zone maps (min/max values) for each 1 MB block. A range filter on order_date allows Redshift to skip all blocks whose max value is before the filter start date or whose min value is after the filter end date — potentially scanning only a small fraction of the table for narrow date ranges.",
      "Set DISTSTYLE ALL on the fact table: Incorrect. DISTSTYLE ALL replicates the entire table to every node, which is only practical for small dimension tables. A 5-year fact table would consume enormous storage on every node if replicated, and ALL distribution does not improve range query performance — it only eliminates redistribution during JOINs.",
      "Set ENCODE RAW on order_date to prevent compression overhead: Incorrect. ENCODE RAW disables compression on a column, storing values uncompressed. This increases storage consumption and I/O, which typically degrades query performance. Redshift's AZ64 or BYTEDICT encoding on date columns reduces storage and speeds up scans — the opposite of what RAW encoding achieves."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/c_best-practices-sort-key.html", title: "Choose the Best Sort Key in Amazon Redshift" }
    ]
  },
  {
    id: 77,
    question: "A company needs to transfer data from Salesforce (a SaaS application) to Amazon S3 on a daily schedule without writing custom integration code. The data must be filtered to include only records updated in the last 24 hours. Which AWS service provides a no-code, scheduled, filtered data transfer from SaaS applications to S3?",
    options: [
      "AWS Glue with a JDBC connector to Salesforce",
      "Amazon AppFlow",
      "Amazon Kinesis Data Firehose with a Salesforce source",
      "AWS DataSync with a Salesforce agent"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Amazon AppFlow is a fully managed integration service that transfers data between SaaS applications (Salesforce, ServiceNow, Marketo, etc.) and AWS services (S3, Redshift, etc.) with no code. It supports scheduled flows, field-level filtering (e.g., LastModifiedDate in the last 24 hours), field mapping, and data transformation — all configured through the AWS console.",
    optionExplanations: [
      "AWS Glue with a JDBC connector to Salesforce: Incorrect. Salesforce does not expose a standard JDBC interface. Connecting Glue to Salesforce requires a custom Spark connector or marketplace connector, configuration of Salesforce OAuth credentials, and custom ETL code — significantly more development effort than AppFlow.",
      "Amazon AppFlow: ✓ Correct. AppFlow natively supports Salesforce as a source connector. The engineer configures a scheduled flow with a filter condition on the LastModifiedDate field to include only records from the last 24 hours. AppFlow delivers the filtered, optionally transformed data directly to the target S3 bucket — no code required, fully managed.",
      "Amazon Kinesis Data Firehose with a Salesforce source: Incorrect. Amazon Kinesis Data Firehose does not support Salesforce as a native source connector. Firehose receives streaming data from sources such as Kinesis Data Streams, MSK, direct PUT API calls, or a few specific sources — Salesforce is not among them.",
      "AWS DataSync with a Salesforce agent: Incorrect. AWS DataSync transfers files and objects between storage systems (NFS/SMB shares, S3, EFS, FSx, HDFS). It does not support SaaS applications like Salesforce as data sources. DataSync has no Salesforce agent or connector."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/appflow/latest/userguide/what-is-appflow.html", title: "What Is Amazon AppFlow?" }
    ]
  },
  {
    id: 78,
    question: "A data engineer must deploy a serverless data pipeline consisting of an AWS Lambda function (triggered by S3 events), a DynamoDB table for state management, and an SNS topic for alerts. The engineer wants to define and deploy all components together as a single deployable unit using a simplified template syntax built on top of CloudFormation. Which AWS tool is designed for this purpose?",
    options: [
      "AWS CloudFormation with nested stacks",
      "AWS Serverless Application Model (AWS SAM)",
      "AWS Elastic Beanstalk",
      "AWS CodeDeploy with an AppSpec file"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "AWS SAM is an open-source framework that extends CloudFormation with simplified resource types (AWS::Serverless::Function, AWS::Serverless::SimpleTable, etc.) specifically designed for serverless applications. A single SAM template defines Lambda functions, DynamoDB tables, S3 event sources, and SNS topics together, and the SAM CLI transforms and deploys the stack to CloudFormation with a single command.",
    optionExplanations: [
      "AWS CloudFormation with nested stacks: Incorrect. Standard CloudFormation can deploy all these resources, but defining Lambda event source mappings, IAM execution roles, and DynamoDB tables requires verbose YAML. Nested stacks add complexity for a simple serverless pipeline. AWS SAM provides higher-level abstractions (shorthand syntax) that reduce the template size and complexity for serverless use cases specifically.",
      "AWS Serverless Application Model (AWS SAM): ✓ Correct. SAM transforms a concise template (where a Lambda function can be defined in ~10 lines including its S3 event trigger and IAM role) into full CloudFormation. The SAM CLI (sam build, sam deploy) packages Lambda code, uploads artifacts to S3, and deploys the full stack atomically. It is the AWS-recommended IaC tool for serverless data pipelines.",
      "AWS Elastic Beanstalk: Incorrect. Elastic Beanstalk is a PaaS for deploying web applications and services on managed infrastructure (EC2, Load Balancers, Auto Scaling). It is not designed for serverless Lambda functions, DynamoDB tables, or event-driven data pipelines.",
      "AWS CodeDeploy with an AppSpec file: Incorrect. AWS CodeDeploy automates application deployments to EC2 instances, Lambda functions (traffic shifting for blue/green deployments), or ECS services. An AppSpec file defines deployment hooks for a single application component, not the full infrastructure stack including DynamoDB tables and SNS topics."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html", title: "What Is the AWS Serverless Application Model (AWS SAM)?" }
    ]
  },
  {
    id: 79,
    question: "A data engineer needs to allow specific analysts to query an Amazon Athena table but must prevent them from seeing rows where the column sensitivity = 'HIGH'. All other rows should be accessible. The underlying data is registered in AWS Lake Formation. Which Lake Formation feature implements this row-level restriction?",
    options: [
      "Lake Formation LF-Tags with a sensitivity key",
      "Lake Formation data filters (row filter expressions)",
      "An S3 bucket policy that denies access to objects containing sensitive rows",
      "A Glue Data Catalog table with a WHERE clause in the table definition"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "AWS Lake Formation data filters allow administrators to define row-level (and column-level) filter expressions on Glue Data Catalog tables. A row filter expression such as `sensitivity <> 'HIGH'` is attached to a GRANT permission for specific IAM principals. When those principals query the table via Athena, Lake Formation enforces the filter and returns only matching rows.",
    optionExplanations: [
      "Lake Formation LF-Tags with a sensitivity key: Incorrect. LF-Tags control which principals can access entire databases, tables, or columns based on tag values. They define access/no-access at the resource level but cannot filter individual rows within a table based on a column value. To hide rows where sensitivity='HIGH', a row-level filter is required.",
      "Lake Formation data filters (row filter expressions): ✓ Correct. Lake Formation data filters (previously called cell-level security) support row filter expressions written in SQL WHERE clause syntax. The filter `sensitivity <> 'HIGH'` is associated with a GRANT to the analyst IAM role. When the analyst queries the table in Athena, Lake Formation enforces the predicate server-side, returning only rows that match the expression — rows with sensitivity='HIGH' are invisible to the analyst.",
      "An S3 bucket policy that denies access to objects containing sensitive rows: Incorrect. S3 bucket policies operate at the object (file) level — they can restrict access to entire S3 objects (files) but cannot filter individual rows within a file. Since a single Parquet or CSV file typically contains a mix of sensitive and non-sensitive rows, object-level policies cannot achieve row-level filtering.",
      "A Glue Data Catalog table with a WHERE clause in the table definition: Incorrect. AWS Glue Data Catalog table definitions specify the schema, location, and SerDe properties of a table. They do not support embedding a WHERE clause that filters rows at query time. Row-level access control must be implemented through Lake Formation data filters, not through table metadata."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lake-formation/latest/dg/data-filters-about.html", title: "Lake Formation Data Filters for Row and Cell-Level Security" }
    ]
  },
  {
    id: 80,
    question: "A data engineer is iteratively developing and testing an AWS Glue ETL script. Each time a code change is made, the engineer must wait 10 minutes for a new Glue job run to start and finish before seeing results. The engineer wants an interactive environment to run Spark code cell by cell and see output immediately, similar to a Jupyter notebook. Which AWS Glue feature provides this?",
    options: [
      "AWS Glue Studio visual editor",
      "AWS Glue Interactive Sessions",
      "Amazon EMR Notebooks with a Glue catalog connection",
      "AWS Cloud9 with the Glue local development library"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "AWS Glue Interactive Sessions provide an on-demand, serverless Spark environment accessible from Jupyter notebooks or the Glue Studio notebook interface. The engineer can run PySpark or Scala code cells interactively against a live Spark session, inspect intermediate DataFrames, and iterate on transformations without submitting a full Glue job — reducing development cycle time from minutes to seconds per cell.",
    optionExplanations: [
      "AWS Glue Studio visual editor: Incorrect. Glue Studio's visual editor provides a drag-and-drop interface for building ETL pipelines. While it generates and previews Glue scripts, it still submits full Glue job runs to execute code. It does not provide a cell-by-cell interactive execution environment for iterative development.",
      "AWS Glue Interactive Sessions: ✓ Correct. Glue Interactive Sessions start a managed Spark kernel that persists between cell executions. In a Jupyter or Glue Studio notebook, the engineer writes PySpark code in cells and runs them one at a time. The session maintains state (DataFrames, variables) between cells, enabling rapid iterative development and debugging — exactly the Jupyter notebook-style workflow described.",
      "Amazon EMR Notebooks with a Glue catalog connection: Incorrect. EMR Notebooks (now Amazon EMR Studio) provide a Jupyter-compatible notebook environment backed by an EMR cluster. While they can use the Glue Data Catalog as a Hive metastore, they require a running EMR cluster. Starting and connecting to an EMR cluster takes several minutes, and the engineer must manage cluster lifecycle — more overhead than Glue Interactive Sessions.",
      "AWS Cloud9 with the Glue local development library: Incorrect. AWS Glue provides a local development library (aws-glue-libs) that allows running Glue jobs locally in a Docker container via Cloud9 or any IDE. However, local execution does not scale to production data volumes, requires Docker configuration, and is not the interactive notebook-style environment described in the question."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/interactive-sessions-overview.html", title: "AWS Glue Interactive Sessions" }
    ]
  },
  {
    id: 81,
    question: "A data engineer's Kinesis Data Streams shard count is frequently insufficient during traffic spikes, causing WriteProvisionedThroughputExceeded errors, yet the stream is idle most of the day. The engineer wants capacity to scale automatically with traffic without manual resharding. Which Kinesis capacity mode should be configured?",
    options: [
      "Provisioned mode with a high fixed shard count",
      "On-Demand mode",
      "Enhanced Fan-Out with reserved throughput",
      "Kinesis Data Firehose to replace Kinesis Data Streams"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Kinesis Data Streams On-Demand mode automatically scales shard capacity up and down in response to actual traffic, handling up to double the previous peak throughput without manual intervention. There is no need to pre-provision shards or monitor utilization — capacity adjusts within minutes, eliminating both throttling during spikes and wasted cost during idle periods.",
    optionExplanations: [
      "Provisioned mode with a high fixed shard count: Incorrect. Over-provisioning shards eliminates throttling but incurs the full per-shard-hour cost regardless of utilization. The stream is idle most of the day, so a high fixed shard count would waste significant cost without addressing the root scaling problem.",
      "On-Demand mode: ✓ Correct. On-Demand mode removes the need to specify or manage shard counts. Kinesis automatically observes write and read throughput and scales capacity within minutes. You pay per GB ingested and retrieved rather than per shard-hour, making it cost-efficient for variable workloads with unpredictable spikes.",
      "Enhanced Fan-Out with reserved throughput: Incorrect. Enhanced Fan-Out provides each registered consumer with a dedicated 2 MB/s read throughput per shard via HTTP/2 push. It addresses read-side consumer throughput, not write-side throttling caused by insufficient shard capacity. It does not scale shard count automatically.",
      "Kinesis Data Firehose to replace Kinesis Data Streams: Incorrect. Kinesis Data Firehose is a delivery service that loads streaming data into destinations like S3 or Redshift. It does not replace Kinesis Data Streams for use cases that require multiple independent consumers, custom processing, or sub-second retention. Switching entirely changes the architecture and does not solve the auto-scaling requirement for the existing stream."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/streams/latest/dev/introduction.html#on-demand-mode", title: "Kinesis Data Streams On-Demand Mode" }
    ]
  },
  {
    id: 82,
    question: "A data engineer notices that an AWS Glue ETL job is consistently over-provisioned — it finishes in 20 minutes but has 50 workers allocated for a full hour, and worker utilization averages only 15% after the first 5 minutes. The engineer wants Glue to automatically release unused workers during execution to reduce cost without changing the job logic. Which Glue feature achieves this?",
    options: [
      "Glue Flex execution class",
      "Glue Auto Scaling",
      "Glue job bookmarks",
      "Reducing the MaxRetries setting to 0"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "AWS Glue Auto Scaling monitors worker utilization during job execution and dynamically removes idle workers that are no longer needed. Workers are released back to the pool as soon as the job no longer requires them, so the engineer is billed only for the DPU-minutes actually used — directly addressing the over-provisioning problem without any job logic changes.",
    optionExplanations: [
      "Glue Flex execution class: Incorrect. Glue Flex reduces the per-DPU-hour billing rate by running jobs on spare capacity. It does not dynamically adjust the number of workers during execution — the configured number of workers remains allocated for the job's duration regardless of utilization.",
      "Glue Auto Scaling: ✓ Correct. When Auto Scaling is enabled, Glue monitors the active tasks and shuffle data per executor. Workers with no active tasks are terminated and removed from the job's billing. In the described scenario, the 50 workers used in the first 5 minutes would be gradually released as work completes, so the engineer pays for ~5 minutes of 50 DPUs plus ~15 minutes of a few remaining DPUs — not 50 DPUs for a full hour.",
      "Glue job bookmarks: Incorrect. Glue job bookmarks track which input data has been processed across runs to avoid reprocessing. They reduce the volume of data read in subsequent runs but have no effect on worker scaling or DPU utilization during the current job execution.",
      "Reducing the MaxRetries setting to 0: Incorrect. MaxRetries controls how many times Glue retries a failed job. Setting it to 0 prevents retries but has no effect on worker allocation or cost for a job that completes successfully."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/auto-scaling.html", title: "AWS Glue Auto Scaling" }
    ]
  },
  {
    id: 83,
    question: "A data warehouse team stores operational data in Amazon RDS PostgreSQL and analytical data in Amazon Redshift. A new report requires joining live RDS tables with historical Redshift tables in a single SQL query without copying RDS data into Redshift. Which Redshift feature enables this?",
    options: [
      "Redshift Spectrum external tables pointing to RDS",
      "Amazon Redshift federated query",
      "AWS DMS ongoing replication from RDS to Redshift",
      "Amazon Athena Federated Query with a Redshift connector"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "Amazon Redshift federated query allows Redshift to query live data in Amazon RDS PostgreSQL (and Aurora PostgreSQL/MySQL) directly using an external schema backed by a Secrets Manager secret and a VPC connection. The live RDS data can be joined with native Redshift tables in a single SQL statement with no data movement.",
    optionExplanations: [
      "Redshift Spectrum external tables pointing to RDS: Incorrect. Redshift Spectrum queries data stored in Amazon S3 via the Glue Data Catalog. It cannot point directly to an Amazon RDS database. Spectrum is an S3-backed external table feature, not a live relational database connector.",
      "Amazon Redshift federated query: ✓ Correct. Redshift federated query uses CREATE EXTERNAL SCHEMA with a secret ARN (from Secrets Manager) containing RDS credentials. Redshift pushes predicates down to the RDS source and streams results back, enabling JOIN operations between live RDS rows and historical Redshift data in a single query — zero data copying required.",
      "AWS DMS ongoing replication from RDS to Redshift: Incorrect. DMS CDC would replicate RDS data into Redshift tables, eventually enabling the JOIN. However, this requires managing a DMS replication instance, introduces replication lag, and duplicates data — the opposite of the zero-copy live query requirement.",
      "Amazon Athena Federated Query with a Redshift connector: Incorrect. Athena Federated Query can query RDS and Redshift via Lambda connectors. However, the question asks for a Redshift-native feature that joins live RDS data with Redshift tables within the Redshift query engine — not an Athena-centric approach."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/federated-overview.html", title: "Querying Data with Federated Query in Amazon Redshift" }
    ]
  },
  {
    id: 84,
    question: "Multiple data scientists in a team need to run interactive Apache Spark and PySpark notebooks against data stored in Amazon S3, collaborate on notebooks, and debug EMR jobs — all without individually managing EMR clusters. Which AWS service provides a shared, managed notebook environment backed by Amazon EMR?",
    options: [
      "AWS Glue Interactive Sessions",
      "Amazon EMR Studio",
      "Amazon SageMaker Studio with an EMR kernel",
      "AWS Cloud9 with an EMR SSH tunnel"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "Amazon EMR Studio is a fully managed integrated development environment (IDE) for EMR that provides Jupyter-compatible notebooks, collaborative workspace, Git integration, and direct attachment to existing or new EMR clusters. Multiple data scientists can share workspaces and notebooks, run Spark jobs interactively, and debug EMR steps — all through a web browser without SSH or local cluster management.",
    optionExplanations: [
      "AWS Glue Interactive Sessions: Incorrect. Glue Interactive Sessions provide a serverless Spark kernel for developing Glue ETL scripts cell by cell. While useful for Glue job development, they are not designed as a shared collaborative environment for multiple data scientists working on EMR clusters with full Spark tuning and debugging capabilities.",
      "Amazon EMR Studio: ✓ Correct. EMR Studio is purpose-built for data science and engineering teams working with EMR. It provides a web-based workspace with Jupyter notebooks, supports attaching to multiple EMR clusters (including EMR on EC2 and EMR Serverless), enables real-time collaboration on notebooks, integrates with Git repositories for version control, and requires no local setup — the team connects via browser.",
      "Amazon SageMaker Studio with an EMR kernel: Incorrect. SageMaker Studio can connect to EMR clusters using the Studio EMR integration feature, enabling Spark notebooks in SageMaker. However, SageMaker Studio is primarily an ML development environment. EMR Studio is the purpose-built product for teams focused on data engineering and analytics workloads on EMR.",
      "AWS Cloud9 with an EMR SSH tunnel: Incorrect. Cloud9 is a cloud-based code editor. Using it with an EMR SSH tunnel requires configuring security groups, SSH keys, and port forwarding manually. It provides no collaborative notebook experience, no native EMR cluster management, and no integrated debugging for Spark jobs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-studio.html", title: "What Is Amazon EMR Studio?" }
    ]
  },
  {
    id: 85,
    question: "A data engineer is building a pipeline that writes product inventory records to Amazon DynamoDB. A business rule requires that the quantity field must never be decremented below zero. The application must enforce this constraint atomically at the database layer to prevent race conditions when multiple Lambda functions update the same item simultaneously. Which DynamoDB feature enforces this?",
    options: [
      "DynamoDB Transactions (TransactWriteItems)",
      "A DynamoDB conditional expression on the UpdateItem request",
      "DynamoDB Streams with a Lambda validator function",
      "DynamoDB On-Demand capacity mode"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "A DynamoDB conditional expression on an UpdateItem request allows the update to proceed only if a specified condition is true at the time of the write. Using a condition like `quantity >= :decrement_amount` ensures the update is rejected with a ConditionalCheckFailedException if it would result in a negative quantity — atomically enforced at the database layer with no race condition.",
    optionExplanations: [
      "DynamoDB Transactions (TransactWriteItems): Incorrect. DynamoDB Transactions provide ACID guarantees across multiple items or tables in a single all-or-nothing operation. For a single-item conditional update (enforce quantity >= 0), a conditional expression on UpdateItem is simpler, cheaper (uses standard write capacity, not 2x for transactions), and sufficient. Transactions are more appropriate when atomically updating multiple items.",
      "A DynamoDB conditional expression on the UpdateItem request: ✓ Correct. The UpdateItem API accepts a ConditionExpression (e.g., attribute_exists(quantity) AND quantity >= :amount). DynamoDB evaluates the condition atomically before applying the update. If the condition fails, the update is rejected and the item remains unchanged — preventing negative quantities even under concurrent writes from multiple Lambda functions.",
      "DynamoDB Streams with a Lambda validator function: Incorrect. DynamoDB Streams captures changes after they are committed to the table. A Lambda validator reading the stream would detect invalid quantities only after the incorrect update has already been applied, making it a reactive check rather than a preventive one. It cannot prevent the race condition.",
      "DynamoDB On-Demand capacity mode: Incorrect. On-Demand capacity mode automatically scales read and write throughput based on traffic. It is a billing and capacity model and has no effect on data validation, conditional logic, or concurrency control."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html", title: "DynamoDB Condition Expressions" }
    ]
  },
  {
    id: 86,
    question: "A company hosts a shared Amazon S3 bucket containing datasets for hundreds of different applications. Each application should only be able to access its own dataset prefix (e.g., app-123/ prefix). Managing hundreds of individual bucket policies is operationally impractical. Which S3 feature provides per-application access boundaries without modifying the bucket policy?",
    options: [
      "S3 bucket versioning with application-specific prefixes",
      "Amazon S3 Access Points",
      "S3 Replication rules with application-specific filters",
      "AWS IAM permission boundaries applied to each application role"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "Amazon S3 Access Points are named network endpoints attached to a bucket, each with its own access policy scoped to a specific prefix or set of operations. Each application gets its own Access Point endpoint and policy that restricts access to only its designated prefix — eliminating the need to embed hundreds of application-specific policies into a single bucket policy.",
    optionExplanations: [
      "S3 bucket versioning with application-specific prefixes: Incorrect. S3 Versioning retains multiple object versions to protect against overwrites and deletions. Using prefixes organizes data but does not enforce per-application access boundaries — any application with bucket-level permissions could still access other prefixes.",
      "Amazon S3 Access Points: ✓ Correct. Each S3 Access Point has its own DNS hostname and access policy. An Access Point policy for app-123 can restrict all requests to the s3:prefix condition matching app-123/*, ensuring the application can only read and write within its designated prefix. The bucket owner creates one Access Point per application without modifying the shared bucket policy, scaling to hundreds of applications cleanly.",
      "S3 Replication rules with application-specific filters: Incorrect. S3 Replication copies objects to another bucket based on prefix or tag filters. It is a data movement feature and does not restrict or manage application access to specific prefixes within a shared bucket.",
      "AWS IAM permission boundaries applied to each application role: Incorrect. IAM permission boundaries set the maximum permissions a role can have, but the effective policy also depends on the identity policy. Adding a permission boundary to each application role requires creating and maintaining hundreds of separate boundary policies per role, which is nearly as operationally complex as managing bucket policies directly. S3 Access Points scale better."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html", title: "Managing Data Access with Amazon S3 Access Points" }
    ]
  },
  {
    id: 87,
    question: "A company stores customer data across multiple Amazon S3 buckets in different regions. The compliance team needs to automatically discover which buckets contain personally identifiable information (PII) such as names, addresses, and credit card numbers, and generate a report of findings. Which AWS service performs this automated PII discovery?",
    options: [
      "AWS Config with a custom rule for PII detection",
      "Amazon Macie",
      "AWS Trusted Advisor",
      "Amazon Inspector"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "Amazon Macie uses machine learning and pattern matching to automatically discover and classify sensitive data stored in Amazon S3, including PII such as names, addresses, social security numbers, and payment card information. Macie generates detailed findings that identify which buckets and objects contain sensitive data, enabling compliance reporting without writing any custom detection code.",
    optionExplanations: [
      "AWS Config with a custom rule for PII detection: Incorrect. AWS Config evaluates AWS resource configurations for compliance (e.g., whether encryption is enabled). Config rules inspect resource metadata and configuration properties, not the content of data stored inside S3 objects. Detecting PII within file contents requires a data classification service like Macie, not a configuration compliance tool.",
      "Amazon Macie: ✓ Correct. Macie runs sensitive data discovery jobs that scan S3 objects using managed data identifiers (covering dozens of PII and sensitive data types) and custom data identifiers (user-defined regex patterns). It generates findings at the S3 object level, identifies the type of sensitive data found, and integrates with EventBridge for automated workflows and with Security Hub for centralized security reporting.",
      "AWS Trusted Advisor: Incorrect. AWS Trusted Advisor provides recommendations across cost optimization, security, fault tolerance, performance, and service limits. Its security checks flag issues like publicly accessible S3 buckets but do not scan the content of S3 objects for PII or sensitive data.",
      "Amazon Inspector: Incorrect. Amazon Inspector is a vulnerability assessment service for EC2 instances, Lambda functions, and container images. It detects software vulnerabilities and unintended network exposure in compute resources — it does not scan S3 object contents for PII or perform data classification."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/macie/latest/user/findings-sensitive-data.html", title: "Sensitive Data Findings in Amazon Macie" }
    ]
  },
  {
    id: 88,
    question: "A data engineer needs to publish custom operational metrics from an AWS Lambda function (e.g., records_processed, validation_errors) to Amazon CloudWatch without making individual PutMetricData API calls for each metric — to avoid throttling and reduce API overhead at high invocation rates. Which approach should be used?",
    options: [
      "Write metrics to CloudWatch Logs using the Embedded Metric Format (EMF)",
      "Send metrics synchronously using the AWS SDK PutMetricData API in each invocation",
      "Store metrics in Amazon DynamoDB and aggregate with a daily Lambda job",
      "Publish metrics to Amazon Kinesis Data Firehose and deliver to CloudWatch"
    ],
    correctAnswer: 0,
    category: "Data Operations and Support",
    explanation: "The CloudWatch Embedded Metric Format (EMF) allows Lambda functions to emit custom metrics by writing specially structured JSON log lines to standard output. CloudWatch Logs asynchronously extracts the metrics and publishes them to CloudWatch Metrics — with no synchronous API calls, no throttling risk, and no additional per-metric API cost. Multiple metrics can be embedded in a single log entry.",
    optionExplanations: [
      "Write metrics to CloudWatch Logs using the Embedded Metric Format (EMF): ✓ Correct. EMF is a CloudWatch feature where metric values are embedded in structured JSON within CloudWatch Logs entries. Lambda already sends stdout to CloudWatch Logs, so EMF adds zero network overhead. CloudWatch automatically extracts and indexes the metrics asynchronously. This eliminates PutMetricData API calls entirely, avoiding the 40 transactions-per-second (TPS) PutMetricData throttle limit that affects high-concurrency Lambda environments.",
      "Send metrics synchronously using the AWS SDK PutMetricData API in each invocation: Incorrect. Making a synchronous PutMetricData call in each Lambda invocation adds latency to every function execution, increases Lambda duration costs, and can trigger PutMetricData throttling at high concurrency. The standard PutMetricData API has a service quota of 40 TPS per account, which is easily exceeded by thousands of concurrent Lambda invocations.",
      "Store metrics in Amazon DynamoDB and aggregate with a daily Lambda job: Incorrect. Writing raw metric data to DynamoDB and aggregating daily introduces 24-hour latency before metrics are visible in CloudWatch. Operational metrics for monitoring and alerting must be near-real-time, making daily aggregation unsuitable for detecting issues quickly.",
      "Publish metrics to Amazon Kinesis Data Firehose and deliver to CloudWatch: Incorrect. Kinesis Data Firehose supports delivering data to CloudWatch Logs as a destination, but it does not deliver to CloudWatch Metrics directly. This approach adds Kinesis infrastructure complexity and cost, and does not produce the real-time metric dimensions needed for CloudWatch Alarms."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format_Specification.html", title: "CloudWatch Embedded Metric Format Specification" }
    ]
  },
  {
    id: 89,
    question: "A company is migrating a MongoDB-based application to AWS. The application stores semi-structured JSON documents with variable schemas and performs complex document queries including nested field lookups, aggregation pipelines, and full-text search within documents. The team wants a fully managed service that is MongoDB-compatible to minimize code changes. Which AWS service should be used?",
    options: [
      "Amazon DynamoDB with document model",
      "Amazon DocumentDB (with MongoDB compatibility)",
      "Amazon RDS for PostgreSQL with JSONB columns",
      "Amazon OpenSearch Service"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "Amazon DocumentDB is a fully managed, MongoDB-compatible document database service. It supports MongoDB 3.6, 4.0, and 5.0 API compatibility, allowing existing MongoDB applications to connect using standard MongoDB drivers with minimal code changes. It natively supports nested document queries, aggregation pipelines, and indexing on nested fields.",
    optionExplanations: [
      "Amazon DynamoDB with document model: Incorrect. DynamoDB supports JSON documents as items but uses its own SDK and API — not MongoDB's query language or aggregation pipeline syntax. Migrating a MongoDB application to DynamoDB requires rewriting all data access code to use DynamoDB's API, defeating the goal of minimizing code changes.",
      "Amazon DocumentDB (with MongoDB compatibility): ✓ Correct. DocumentDB implements a subset of the MongoDB 3.6/4.0/5.0 API, allowing applications to connect using existing MongoDB drivers simply by changing the connection string. Nested document queries (dot notation), the aggregation pipeline ($match, $group, $lookup, etc.), and indexes on array and sub-document fields are natively supported — enabling a lift-and-shift migration with minimal application changes.",
      "Amazon RDS for PostgreSQL with JSONB columns: Incorrect. PostgreSQL JSONB supports storing and querying JSON documents with GIN indexes and JSON path expressions. However, it is a relational database with PostgreSQL syntax — not MongoDB-compatible. Applications must be rewritten to use PostgreSQL's SQL/JSON syntax instead of MongoDB's query language.",
      "Amazon OpenSearch Service: Incorrect. OpenSearch is a search and analytics engine that stores documents as JSON and supports full-text search and aggregations. However, it is not MongoDB-compatible, is not designed as a primary operational document database (it is eventually consistent and not suited for transactional workloads), and cannot replace MongoDB for application data access patterns."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html", title: "What Is Amazon DocumentDB?" }
    ]
  },
  {
    id: 90,
    question: "A data engineer maintains an Amazon Athena table backed by Parquet files in S3. The data is frequently updated — rows are both inserted and deleted daily. Currently, reading the table requires scanning all historical files, and the engineer must run VACUUM operations to compact delete markers. The engineer wants full ACID transactions, time travel queries, and automatic compaction on the Athena table. Which table format should be adopted?",
    options: [
      "Hive-partitioned Parquet with MSCK REPAIR TABLE",
      "Apache Iceberg table format",
      "Apache ORC with predicate pushdown",
      "Delta Lake format with a separate Databricks cluster"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "Apache Iceberg is an open table format supported natively by Amazon Athena (v3) that provides ACID transactions, row-level deletes and updates, snapshot-based time travel queries, and automatic background compaction. Iceberg manages its own metadata layer, eliminating the need for MSCK REPAIR TABLE and enabling efficient upserts and deletes without full file rewrites.",
    optionExplanations: [
      "Hive-partitioned Parquet with MSCK REPAIR TABLE: Incorrect. Standard Hive-partitioned Parquet files do not support ACID transactions or row-level updates. Deletes require rewriting entire Parquet files. MSCK REPAIR TABLE is a manual maintenance command for updating partition metadata — it does not provide transactions, time travel, or compaction.",
      "Apache Iceberg table format: ✓ Correct. Athena natively supports creating and querying Apache Iceberg tables. Iceberg provides: (1) ACID transactions — concurrent reads and writes are consistent; (2) row-level DELETE and UPDATE — only affected data files are rewritten via copy-on-write or merge-on-read; (3) time travel — snapshot history allows querying the table as of any prior timestamp; (4) automatic compaction — Athena's OPTIMIZE command compacts small files in the background.",
      "Apache ORC with predicate pushdown: Incorrect. Apache ORC is a columnar file format that supports predicate pushdown for query optimization, similar to Parquet. Like Parquet, ORC alone does not provide ACID transaction semantics, row-level updates, or time travel capabilities. An open table format (Iceberg, Hudi, or Delta Lake) is required on top of the file format.",
      "Delta Lake format with a separate Databricks cluster: Incorrect. Delta Lake is an open table format developed by Databricks that provides ACID transactions and time travel, similar to Iceberg. However, Amazon Athena does not natively support Delta Lake tables. Querying Delta Lake from Athena requires a separate Databricks cluster or a custom Lambda connector — adding significant operational complexity compared to the natively supported Iceberg format."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/querying-iceberg.html", title: "Using Apache Iceberg Tables with Amazon Athena" }
    ]
  },
  {
    id: 91,
    question: "A data engineer is building a producer application that sends millions of records per second to Amazon Kinesis Data Streams. The application runs on Amazon EC2 and must aggregate small records into larger batches before sending, automatically retry failed puts, and manage shard-level routing to maximize throughput. Which library is MOST appropriate for building this high-throughput Kinesis producer?",
    options: [
      "AWS SDK for Python (boto3) with manual PutRecords calls",
      "Amazon Kinesis Producer Library (KPL)",
      "Amazon Kinesis Data Firehose SDK",
      "AWS Glue Streaming ETL with a Kinesis sink"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "The Amazon Kinesis Producer Library (KPL) is a purpose-built Java library for high-throughput Kinesis producers. It automatically aggregates multiple small records into a single Kinesis record (reducing API calls), performs automatic retries with backoff, collects metrics, and distributes records across shards to maximize throughput — none of which the raw SDK provides out of the box.",
    optionExplanations: [
      "AWS SDK for Python (boto3) with manual PutRecords calls: Incorrect. Using boto3 PutRecords directly requires the engineer to implement record batching, retry logic, shard routing, and error handling manually. PutRecords accepts up to 500 records per call but does not aggregate sub-record payloads. For millions of records per second, manual SDK calls result in inefficient per-record overhead and significant development effort.",
      "Amazon Kinesis Producer Library (KPL): ✓ Correct. KPL transparently aggregates multiple logical user records into a single Kinesis record using protobuf encoding, allowing each 1 MB shard record to carry hundreds of small user records. It retries failed puts automatically, collects per-shard throughput metrics via CloudWatch, and batches API calls — reducing cost and maximizing throughput without producer-side custom retry logic.",
      "Amazon Kinesis Data Firehose SDK: Incorrect. Kinesis Data Firehose is a delivery service that loads data into S3, Redshift, or OpenSearch. It is not a Kinesis Data Streams producer library. Sending records to Firehose writes to a Firehose delivery stream, not to a Kinesis Data Streams shard for multi-consumer processing.",
      "AWS Glue Streaming ETL with a Kinesis sink: Incorrect. Glue Streaming ETL is a consumer-side processing framework that reads from Kinesis (or other sources) and writes to destinations. It is not a producer library for sending application records into a Kinesis stream at high throughput."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/streams/latest/dev/developing-producers-with-kpl.html", title: "Developing Producers Using the Kinesis Producer Library" }
    ]
  },
  {
    id: 92,
    question: "A data engineer stores large CSV files (each 500 MB) in Amazon S3 and needs to retrieve only 3 specific columns out of 50 columns from each file. Downloading entire files wastes bandwidth and increases Lambda processing costs. Which S3 feature allows the engineer to filter data server-side before downloading?",
    options: [
      "S3 Intelligent-Tiering with retrieval optimization",
      "Amazon S3 Select",
      "S3 Object Lambda to transform on download",
      "Athena CTAS to extract the columns to a new table"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Amazon S3 Select executes SQL expressions server-side against CSV, JSON, or Parquet objects stored in S3, returning only the rows and columns that match the query. The filtered result is returned over the network instead of the full object, reducing data transfer by up to 400x and decreasing processing costs proportionally.",
    optionExplanations: [
      "S3 Intelligent-Tiering with retrieval optimization: Incorrect. S3 Intelligent-Tiering automatically moves objects between storage tiers based on access patterns to optimize storage cost. It is a storage class feature and has no capability to filter or project specific columns from a file before returning data to the client.",
      "Amazon S3 Select: ✓ Correct. S3 Select accepts a SQL expression (e.g., SELECT col1, col2, col3 FROM S3Object) and applies it to the specified S3 object server-side. Only the matching data is returned, drastically reducing the bytes transferred over the network. It supports CSV, JSON, and Parquet formats and can be invoked directly from Lambda, EMR, or any AWS SDK.",
      "S3 Object Lambda to transform on download: Incorrect. S3 Object Lambda invokes a Lambda function to transform S3 objects as they are retrieved. While it could perform column filtering, it still downloads the full object to Lambda first before transforming — not filtering server-side within S3's storage layer like S3 Select does. It also requires configuring an Object Lambda Access Point.",
      "Athena CTAS to extract the columns to a new table: Incorrect. Athena CTAS (Create Table As Select) runs a query and writes the result as a new set of S3 files. It is a batch table-creation operation, not a lightweight per-file server-side retrieval filter. Running CTAS to pre-filter columns adds storage costs and ETL overhead rather than providing on-demand column projection during individual file reads."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html", title: "Filtering and Retrieving Data Using Amazon S3 Select" }
    ]
  },
  {
    id: 93,
    question: "A data engineer is optimizing an Amazon Redshift cluster and wants actionable, automated recommendations for improving query performance — such as adding sort keys, changing distribution styles, or running VACUUM on unsorted tables — without manually analyzing query plans. Which Redshift feature provides these recommendations?",
    options: [
      "Amazon Redshift Query Editor v2",
      "Amazon Redshift Advisor",
      "Amazon CloudWatch Container Insights for Redshift",
      "AWS Trusted Advisor with a Business Support plan"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "Amazon Redshift Advisor analyzes workload patterns, table design, and query execution history within a Redshift cluster and generates prioritized, actionable recommendations — such as changing a table's distribution style, adding a sort key, running VACUUM, or compressing a column. Recommendations include the expected impact and the SQL statements to implement them.",
    optionExplanations: [
      "Amazon Redshift Query Editor v2: Incorrect. Query Editor v2 is a web-based SQL IDE for running queries against Redshift clusters and Serverless endpoints. It provides syntax highlighting, query history, and result visualization but does not analyze cluster performance or generate table design recommendations.",
      "Amazon Redshift Advisor: ✓ Correct. Redshift Advisor monitors cluster activity continuously and surfaces specific, prioritized recommendations in the Redshift console. Each recommendation includes the affected table or query, the expected performance or cost benefit, and the exact SQL command (e.g., ALTER TABLE ... ALTER DISTKEY) to implement the change. No manual query plan analysis is required.",
      "Amazon CloudWatch Container Insights for Redshift: Incorrect. CloudWatch Container Insights collects performance metrics from containerized workloads (EKS, ECS). It has no integration with Amazon Redshift for cluster-level query optimization recommendations.",
      "AWS Trusted Advisor with a Business Support plan: Incorrect. AWS Trusted Advisor checks for general AWS best practices across cost, security, performance, and fault tolerance. It does not perform deep Redshift-specific analysis such as examining sort key effectiveness, table skew, or query execution plans within the data warehouse."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/dg/advisor.html", title: "Amazon Redshift Advisor Recommendations" }
    ]
  },
  {
    id: 94,
    question: "A company uses AWS Lake Formation to govern a data lake. The data governance team wants to automatically crawl and catalog data from an Amazon S3 bucket, apply default Lake Formation permissions to the discovered tables, and repeat the process on a daily schedule — without manually creating Glue Crawlers and configuring permissions each time a new data source is onboarded. Which Lake Formation feature automates this workflow?",
    options: [
      "Lake Formation LF-Tag policies applied to all crawlers",
      "Lake Formation Blueprints",
      "AWS Glue Workflows with a scheduled trigger",
      "Amazon EventBridge rules that invoke Glue Crawlers daily"
    ],
    correctAnswer: 1,
    category: "Data Security and Governance",
    explanation: "AWS Lake Formation Blueprints are pre-built workflow templates that automate ingesting data from sources (S3, databases) into the data lake, crawling and cataloging the data, and applying Lake Formation permissions — all configured through a wizard. Blueprints create the underlying Glue Crawlers, jobs, and triggers automatically, eliminating manual setup for each new data source.",
    optionExplanations: [
      "Lake Formation LF-Tag policies applied to all crawlers: Incorrect. LF-Tags are a permission model that attaches tags to data lake resources and grants access based on tag values. They manage authorization but do not automate the crawling, cataloging, or data ingestion workflow.",
      "Lake Formation Blueprints: ✓ Correct. Lake Formation Blueprints provide a step-by-step wizard to define an incremental or full data load workflow. The engineer specifies the source (S3 path, database table, etc.), target location, crawl schedule, and Lake Formation permissions. Lake Formation automatically creates the Glue Crawler, Glue ETL job, and workflow triggers — the entire pipeline is provisioned and scheduled with no manual resource creation.",
      "AWS Glue Workflows with a scheduled trigger: Incorrect. Glue Workflows orchestrate existing crawlers and jobs with dependency-based scheduling. However, the engineer must still manually create each crawler and configure Lake Formation permissions separately before adding them to a workflow. Glue Workflows do not automate the end-to-end data source onboarding process that Blueprints provide.",
      "Amazon EventBridge rules that invoke Glue Crawlers daily: Incorrect. EventBridge can trigger Glue Crawlers on a cron schedule, but this only handles the crawler invocation. It does not create crawlers, configure Lake Formation permissions, or set up the data ingestion pipeline for new sources — all of which require manual setup."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lake-formation/latest/dg/workflows-about.html", title: "AWS Lake Formation Blueprints and Workflows" }
    ]
  },
  {
    id: 95,
    question: "A data engineering team operates multiple AWS Glue jobs, EMR clusters, and Lambda functions that run continuously throughout the month. The team has no visibility into AWS spending until the monthly invoice arrives. A data engineer wants to receive an automated email alert when the projected monthly cost for data services is forecast to exceed $5,000. Which AWS service and feature should be configured?",
    options: [
      "AWS Cost Explorer with a custom cost report emailed monthly",
      "AWS Budgets with a forecasted cost alert at the $5,000 threshold",
      "Amazon CloudWatch billing alarms on EstimatedCharges",
      "AWS Trusted Advisor cost optimization checks"
    ],
    correctAnswer: 1,
    category: "Data Operations and Support",
    explanation: "AWS Budgets allows engineers to define cost and usage thresholds. A forecasted cost budget sends an SNS notification (triggering email) when AWS's cost forecast for the period is projected to exceed the configured threshold — providing proactive advance warning before the actual spend reaches the limit.",
    optionExplanations: [
      "AWS Cost Explorer with a custom cost report emailed monthly: Incorrect. Cost Explorer provides historical cost analysis and forecasting visualizations in the console. It can schedule reports to be delivered to S3, but it does not send real-time proactive alerts when costs are forecasted to exceed a threshold. It is an analysis tool, not a proactive alerting service.",
      "AWS Budgets with a forecasted cost alert at the $5,000 threshold: ✓ Correct. An AWS Budget configured with a 'Forecasted' alert type sends an SNS notification (which can trigger an email subscription) when AWS's machine learning cost forecast predicts that the actual spend for the current period will exceed the $5,000 threshold — potentially days before the overage actually occurs. This enables the team to take corrective action proactively.",
      "Amazon CloudWatch billing alarms on EstimatedCharges: Incorrect. CloudWatch billing alarms monitor the EstimatedCharges metric, which reflects actual accrued costs (not forecasted costs). The alarm triggers only after spending has already exceeded the threshold — a reactive alert rather than a proactive forecast-based warning.",
      "AWS Trusted Advisor cost optimization checks: Incorrect. Trusted Advisor provides cost optimization recommendations (e.g., idle EC2 instances, unused Elastic IPs). It does not monitor budget thresholds or send alerts based on cost forecasts. Its checks are periodic, not real-time threshold alerts."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-create.html", title: "Creating a Cost Budget in AWS Budgets" }
    ]
  },
  {
    id: 96,
    question: "A data engineer needs to run large-scale Apache Spark and Hive jobs against data in Amazon S3 without provisioning or managing an EMR cluster. The team wants a serverless experience where they submit jobs, pay only for resources used during execution, and have AWS handle all capacity provisioning automatically. Which service should be used?",
    options: [
      "AWS Glue ETL with Spark engine",
      "Amazon EMR Serverless",
      "Amazon Athena with Apache Spark notebooks",
      "AWS Batch with a Spark Docker container"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Amazon EMR Serverless is a serverless deployment option for Amazon EMR that runs Apache Spark and Hive jobs without requiring the user to provision, configure, or manage EMR clusters. Resources are automatically provisioned when a job is submitted and released when the job completes. Billing is per vCPU-second and GB-second of memory used during execution.",
    optionExplanations: [
      "AWS Glue ETL with Spark engine: Incorrect. AWS Glue uses Apache Spark as its underlying engine and is serverless. However, Glue imposes its own abstractions (DynamicFrames, Glue Data Catalog table requirement, Glue-specific Spark configuration). For teams with existing Spark or Hive scripts (PySpark, SparkSQL, HiveQL), EMR Serverless runs them as-is without rewriting code to use Glue's APIs.",
      "Amazon EMR Serverless: ✓ Correct. EMR Serverless accepts Spark application JAR/Python files and Hive scripts, then automatically provisions the required worker capacity from AWS's compute pool. Pre-initialized capacity can be configured to reduce cold-start times. The team pays only for the vCPU and memory consumed during job execution — zero cluster management required.",
      "Amazon Athena with Apache Spark notebooks: Incorrect. Athena Spark provides an interactive notebook environment for exploratory Spark analysis with auto-scaling. It is optimized for short-running, interactive notebooks rather than long-running, large-scale batch ETL jobs. It also uses Athena's per-DPU-hour billing model and has different performance characteristics than EMR for production-scale Spark workloads.",
      "AWS Batch with a Spark Docker container: Incorrect. Running Spark in a Docker container on AWS Batch requires packaging a Spark cluster inside a container (e.g., a standalone Spark master and worker in a single container) — which does not achieve true distributed Spark processing. Managing Spark's distributed execution within Batch containers is complex and does not scale to large datasets the way EMR Serverless does natively."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/emr/latest/EMR-Serverless-UserGuide/emr-serverless.html", title: "What Is Amazon EMR Serverless?" }
    ]
  },
  {
    id: 97,
    question: "A global e-commerce company maintains a DynamoDB table for shopping cart data that must be readable and writable from application servers in us-east-1, eu-west-1, and ap-northeast-1 simultaneously. Any write in any region must be replicated to all other regions within seconds. Which DynamoDB feature provides this multi-region active-active replication?",
    options: [
      "DynamoDB Streams with Lambda replication functions in each region",
      "DynamoDB Global Tables",
      "AWS DMS multi-region replication task for DynamoDB",
      "Amazon S3 Cross-Region Replication with a DynamoDB S3 export"
    ],
    correctAnswer: 1,
    category: "Data Store Management",
    explanation: "Amazon DynamoDB Global Tables provide fully managed, multi-region, multi-active replication. Each participating region hosts a full replica of the table. Writes to any replica are replicated asynchronously to all other replicas within seconds. Applications in each region read and write to their local replica at low latency, and DynamoDB handles conflict resolution automatically.",
    optionExplanations: [
      "DynamoDB Streams with Lambda replication functions in each region: Incorrect. DynamoDB Streams captures item-level changes that Lambda can forward to tables in other regions. However, building bidirectional multi-region replication with Lambda requires complex conflict resolution logic, careful handling of replication loops, and significant custom code. Global Tables provide the same capability natively with no custom code and AWS-managed conflict resolution.",
      "DynamoDB Global Tables: ✓ Correct. Global Tables are DynamoDB's native multi-region active-active replication feature. Adding a replica to a new region requires a single API call or console configuration. DynamoDB automatically replicates all writes across all regional replicas using last-writer-wins conflict resolution. Reads and writes in each region hit the local replica, minimizing latency for globally distributed applications.",
      "AWS DMS multi-region replication task for DynamoDB: Incorrect. AWS DMS supports DynamoDB as a target for migration tasks but is not designed for continuous, bidirectional multi-region replication of a live DynamoDB table. DMS replication introduces lag and operational overhead, and bidirectional DMS replication between DynamoDB tables is not a supported or recommended pattern.",
      "Amazon S3 Cross-Region Replication with a DynamoDB S3 export: Incorrect. DynamoDB can export table data to S3 (via Point-in-Time Recovery export), and S3 Cross-Region Replication can then copy those S3 files to other regions. However, this creates S3-based snapshots of the table at a point in time — not a live, writable DynamoDB table replica in the remote region. Applications cannot write to an S3 export as a DynamoDB table."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html", title: "Amazon DynamoDB Global Tables" }
    ]
  },
  {
    id: 98,
    question: "A company's on-premises SFTP server transfers financial data files to AWS every night. The data engineering team wants to replace the on-premises SFTP server with a fully managed AWS service that accepts SFTP connections from the same external partners using their existing SFTP clients and credentials, and deposits files directly into Amazon S3. Which AWS service provides this?",
    options: [
      "AWS DataSync with an SFTP agent on EC2",
      "AWS Transfer Family (SFTP endpoint)",
      "Amazon S3 with a custom Lambda SFTP handler",
      "Amazon Kinesis Data Firehose with an SFTP source connector"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "AWS Transfer Family provides fully managed SFTP (and FTPS/FTP) endpoints that are directly backed by Amazon S3 (or Amazon EFS). External partners connect to the Transfer Family endpoint using standard SFTP clients and their existing credentials. Files uploaded by partners land directly in the designated S3 bucket — no on-premises server required and no application changes for the external partners.",
    optionExplanations: [
      "AWS DataSync with an SFTP agent on EC2: Incorrect. AWS DataSync transfers data between storage systems (NFS, SMB, S3, EFS). It does not accept inbound SFTP connections from external partners. An SFTP agent on EC2 would require managing the EC2 instance, SSH key distribution, and a custom SFTP server application — the opposite of a managed service.",
      "AWS Transfer Family (SFTP endpoint): ✓ Correct. AWS Transfer Family creates a managed SFTP server endpoint with a public hostname. Partners connect using any standard SFTP client. Authentication can use SSH key pairs or username/password (via Lambda custom identity providers). Files are deposited directly to specified S3 prefixes or EFS directories. AWS manages all server infrastructure, availability, and scaling.",
      "Amazon S3 with a custom Lambda SFTP handler: Incorrect. S3 does not natively accept SFTP connections. Implementing an SFTP handler in Lambda would require a custom TCP server (SFTP runs over SSH on port 22), which is not supported by Lambda's invocation model. This approach is architecturally infeasible without significant custom infrastructure.",
      "Amazon Kinesis Data Firehose with an SFTP source connector: Incorrect. Kinesis Data Firehose does not support SFTP as a source connector. Firehose receives data via HTTP PUT API calls, Kinesis Data Streams, MSK, or a few other specific sources — it cannot accept SFTP file uploads from external partners."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-for-sftp.html", title: "What Is AWS Transfer Family?" }
    ]
  },
  {
    id: 99,
    question: "A data engineer needs to run a one-time transformation of a 10 TB dataset in Amazon Athena and store the transformed result as a new optimized Parquet dataset in S3, partitioned by year and month, so it can be queried efficiently by downstream Athena users. Which Athena feature creates the new dataset and registers it in the Glue Data Catalog in a single SQL statement?",
    options: [
      "Athena INSERT INTO an existing table",
      "Athena CREATE TABLE AS SELECT (CTAS)",
      "Athena Federated Query to write to S3",
      "Athena workgroup result location setting"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "Athena CTAS (CREATE TABLE AS SELECT) executes a SELECT query, writes the results to S3 in the specified format (Parquet, ORC, etc.) with optional partitioning, and simultaneously registers the new table and its partitions in the Glue Data Catalog — all in one SQL statement without any additional ETL tooling.",
    optionExplanations: [
      "Athena INSERT INTO an existing table: Incorrect. INSERT INTO appends query results to an existing Athena table. It does not create a new table, does not register a new Glue Data Catalog entry, and requires the target table to already exist with the correct schema and S3 location configured. CTAS is the correct statement for creating a new table from a query.",
      "Athena CREATE TABLE AS SELECT (CTAS): ✓ Correct. CTAS combines table creation, data writing, and catalog registration in one atomic statement. The engineer specifies WITH (format='PARQUET', partitioned_by=ARRAY['year','month'], external_location='s3://bucket/output/') in the CTAS clause. Athena executes the SELECT, writes Parquet files to the S3 prefix organized by partition, and registers the table and all partitions in the Glue Data Catalog — ready for downstream queries immediately.",
      "Athena Federated Query to write to S3: Incorrect. Athena Federated Query enables reading from external data sources via Lambda connectors. It is a read-side feature for querying non-S3 sources — it does not write query results to S3 or create new catalog tables.",
      "Athena workgroup result location setting: Incorrect. Workgroup result location specifies where Athena saves query result CSV files (the standard query output). These are raw result files for end-user download, not optimized Parquet datasets partitioned for downstream analytical queries. They are not registered as Glue Data Catalog tables."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/ctas.html", title: "CREATE TABLE AS in Amazon Athena" }
    ]
  },
  {
    id: 100,
    question: "A data engineer must implement a data pipeline that satisfies the following requirements: (1) ingest streaming records from Amazon Kinesis Data Streams, (2) apply a Python-based transformation using a user-defined function (UDF), (3) detect and flag records with NULL values in required fields, and (4) write clean records to Amazon S3 in Parquet format while routing flagged records to a separate S3 error prefix. Which combination of AWS services BEST fulfills all four requirements?",
    options: [
      "Kinesis Data Firehose with a Lambda transformation function and two S3 destinations",
      "AWS Glue Streaming ETL job (Spark Structured Streaming) with Glue Data Quality rules and two S3 output paths",
      "Amazon Managed Service for Apache Flink with a custom SQL query and Kinesis Data Firehose delivery",
      "AWS Lambda with a Kinesis trigger writing directly to S3 using the AWS SDK"
    ],
    correctAnswer: 1,
    category: "Data Ingestion and Transformation",
    explanation: "An AWS Glue Streaming ETL job running on Spark Structured Streaming natively consumes Kinesis Data Streams, supports Python UDFs for custom transformations, integrates with Glue Data Quality to flag records with NULL values in required fields, and can route clean and flagged records to separate S3 Parquet output paths — all within a single managed Spark job.",
    optionExplanations: [
      "Kinesis Data Firehose with a Lambda transformation function and two S3 destinations: Incorrect. Kinesis Data Firehose supports a Lambda transformation function and can deliver to S3 in Parquet format (via Glue schema conversion). However, Firehose's error routing sends only delivery failures to an S3 error prefix — it cannot route records that fail a business logic check (NULL field detection) to a separate path. Firehose also does not support Python UDFs natively within the transformation.",
      "AWS Glue Streaming ETL job (Spark Structured Streaming) with Glue Data Quality rules and two S3 output paths: ✓ Correct. A Glue Streaming ETL job reads from Kinesis Data Streams continuously. Python UDFs can be registered in the PySpark script for custom transformations. Glue Data Quality rules (or explicit DataFrame filter operations) identify records with NULL values in required columns. The job uses a conditional split — clean records are written to the main S3 Parquet prefix and flagged records to the error prefix — all within a single Glue streaming job.",
      "Amazon Managed Service for Apache Flink with a custom SQL query and Kinesis Data Firehose delivery: Incorrect. Managed Flink excels at stateful stream processing and complex event processing with Flink SQL or Java/Python APIs. However, combining Flink SQL with Python UDFs requires the PyFlink API (more complex), and routing to two separate S3 paths via Firehose requires two Firehose delivery streams with additional configuration. This is a valid but more complex architecture than Glue Streaming for this use case.",
      "AWS Lambda with a Kinesis trigger writing directly to S3 using the AWS SDK: Incorrect. Lambda can process Kinesis records and write to S3 using the SDK, but writing Parquet format from Lambda requires bundling a Parquet library (e.g., pyarrow) in the deployment package, managing multi-record batching, handling file open/close for Parquet columnar writes, and managing partial failures. For a structured streaming pipeline with data quality routing, Lambda introduces significant custom code complexity compared to a managed Spark solution."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/glue/latest/dg/add-job-streaming.html", title: "AWS Glue Streaming ETL Jobs" },
      { url: "https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html", title: "AWS Glue Data Quality" }
    ]
  }
];
