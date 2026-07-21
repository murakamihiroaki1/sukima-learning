const questionsData = [
  {
    id: "dva-001",
    question: "A company is migrating a legacy application to Amazon EC2 instances. The application connects to a MySQL database using a username and password stored in the source code. The company is migrating the database to an Amazon RDS for MySQL DB instance. As part of the migration, the company must implement a secure way to store and automatically rotate the database credentials.\n\nWhich solution meets these requirements?",
    options: [
      "Store the database credentials in environment variables of an Amazon Machine Image (AMI). Replace the AMI to rotate the credentials.",
      "Store the database credentials in AWS Secrets Manager. Configure Secrets Manager to automatically rotate the credentials.",
      "Store the database credentials in environment variables on the EC2 instances. Restart the EC2 instances to rotate the credentials.",
      "Store the database credentials in AWS Systems Manager Parameter Store. Configure Parameter Store to automatically rotate the credentials."
    ],
    correctAnswer: 1,
    category: "Security",
    explanation: "AWS Secrets Manager helps protect credentials needed to access your databases, applications, services, and other IT resources. With Secrets Manager, you can rotate, manage, and retrieve database credentials, API keys, and other secrets throughout their lifecycle. Users and applications retrieve secrets with a call to Secrets Manager APIs, eliminating the need to hardcode sensitive information in plain text. Secrets Manager offers built-in integrations for rotating secrets for Amazon RDS, Amazon Redshift, and Amazon DocumentDB (with MongoDB compatibility).",
    optionExplanations: [
      "Incorrect: Storing credentials in AMI environment variables is not a security best practice, and replacing AMIs to rotate credentials is inefficient. There is also no automatic rotation capability.",
      "Correct: Secrets Manager provides secure credential storage and automatic rotation capability, with built-in RDS integration that fully satisfies the requirements.",
      "Incorrect: Storing credentials in EC2 instance environment variables poses a security risk, and restarting instances to rotate them is inefficient and not automated.",
      "Incorrect: Parameter Store can store credentials, but does not have built-in automatic rotation. You would need to implement the rotation logic manually."
    ]
  },
  {
    id: "dva-002",
    question: "A developer is creating a web application that needs to allow users to post comments and receive feedback in near-real time.\n\nWhich solutions meet these requirements? (Choose TWO.)",
    options: [
      "Create an AWS AppSync schema and corresponding API. Use an Amazon DynamoDB table as the data store.",
      "Create a WebSocket API in Amazon API Gateway. Use an AWS Lambda function as the backend. Use an Amazon DynamoDB table as the data store.",
      "Create an AWS Elastic Beanstalk application backed by an Amazon RDS database. Configure the application to allow long-lived TCP/IP sockets.",
      undefined,
      "Establish a WebSocket connection to Amazon CloudFront. Use an AWS Lambda function as the origin for the CloudFront distribution. Use an Amazon Aurora DB cluster as the data store."
    ],
    correctAnswer: 3,
    category: "Application Integration",
    explanation: "AWS AppSync is a managed service that uses GraphQL to make it easy for applications to get exactly the data they need. With AWS AppSync, you can build scalable applications that require real-time updates with a variety of data sources including Amazon DynamoDB.\n\nWith Amazon API Gateway you can create WebSocket APIs as a stateful frontend for an AWS service (such as Lambda or DynamoDB) or for an HTTP endpoint. The WebSocket API invokes your backend based on the content of the messages it receives from client apps. Unlike a REST API, which receives and responds to requests, a WebSocket API supports two-way communication between client apps and your backend.",
    optionExplanations: [
      "Correct: AWS AppSync supports GraphQL and real-time subscriptions, and integrates with DynamoDB to enable real-time communication.",
      "Correct: API Gateway WebSocket APIs support bidirectional communication and, combined with Lambda, can implement real-time functionality.",
      "Incorrect: The combination of Elastic Beanstalk and RDS is suitable for traditional applications but is not optimized for real-time communication.",
      undefined,
      "Incorrect: CloudFront does not support WebSocket connections. API Gateway should be used for WebSocket."
    ]
  },
  {
    id: "dva-003",
    question: "A developer is adding sign-up and sign-in functionality to an application. The application must make API calls to a custom analytics solution to log user sign-in events.\n\nWhich combination of actions should the developer take to meet these requirements? (Choose TWO.)",
    options: [
      undefined,
      "Use AWS Identity and Access Management (IAM) to provide the sign-up and sign-in functionality.",
      "Configure an AWS Config rule to make API calls when a user is authenticated.",
      "Invoke an Amazon API Gateway method to make API calls when a user is authenticated.",
      "Invoke an AWS Lambda function to make API calls when a user is authenticated."
    ],
    correctAnswer: 0,
    category: "Security",
    explanation: "Amazon Cognito adds user sign-up, sign-in, and access control to web and mobile applications. You can also create an AWS Lambda function to make API calls to a custom analytics solution, and use an Amazon Cognito post-authentication trigger to invoke that function.",
    optionExplanations: [
      undefined,
      "Incorrect: IAM is used for managing access to AWS resources, and is not suitable for application user sign-up and sign-in functionality.",
      "Incorrect: AWS Config is a service for tracking configuration changes to resources, and is not used to handle user authentication events.",
      "Incorrect: API Gateway does not directly handle authentication events. Using Cognito triggers is more appropriate.",
      "Correct: A Cognito post-authentication trigger can invoke a Lambda function to make API calls to the custom analytics solution."
    ]
  },
  {
    id: "dva-004",
    question: "A company uses Amazon API Gateway for a REST API in one AWS account. A developer wants to grant access to the API only to IAM users from a different AWS account.\n\nWhich combination of steps should the developer take to meet these requirements? (Choose TWO.)",
    options: [
      "Create an IAM permission policy. Attach the policy to each IAM user. Set the API method authorization type to AWS_IAM. Sign the API requests using Signature Version 4.",
      "Create an Amazon Cognito user pool. Add each IAM user to the user pool. Set the API method authorization type to COGNITO_USER_POOLS. Authenticate using IAM credentials in Amazon Cognito. Add the ID token to the request header.",
      "Create an Amazon Cognito identity pool. Add each IAM user to the identity pool. Set the API method authorization type to COGNITO_USER_POOLS. Authenticate using IAM credentials in Amazon Cognito. Add the access token to the request header.",
      undefined,
      "Create an Amazon Cognito authorizer for the API to grant access only to each IAM user. Set the API method authorization type to COGNITO_USER_POOLS."
    ],
    correctAnswer: 3,
    category: "Security",
    explanation: "A resource policy can grant API access in one AWS account to users in a different AWS account using the Signature Version 4 (SigV4) protocol. By combining IAM permission policies with a resource policy, you can securely implement cross-account access.",
    optionExplanations: [
      "Correct: Using IAM policies with the AWS_IAM authorization type and SigV4 signing implements IAM-based authentication.",
      "Incorrect: Cognito user pools are for application users and are different from IAM users. IAM users cannot be added to a user pool.",
      "Incorrect: Identity pools are for federated identities and are not a method for directly adding IAM users.",
      undefined,
      "Incorrect: Cognito authorizers are for application users and are not suitable for authenticating IAM users."
    ]
  },
  {
    id: "dva-005",
    question: "A developer is building a new application that converts text files to .pdf files. A separate application writes text files to a source Amazon S3 bucket. The new application must read files as they arrive in Amazon S3 and use an AWS Lambda function to convert the files to .pdf files. The developer has created an IAM policy that grants access to Amazon S3 and Amazon CloudWatch Logs.\n\nWhat should the developer do to ensure that the Lambda function has the correct permissions?",
    options: [
      "Use AWS Identity and Access Management (IAM) to create a Lambda execution role. Attach the IAM policy to the role. Store the IAM role as an environment variable on the Lambda function.",
      "Use AWS Identity and Access Management (IAM) to create a Lambda execution user. Attach the IAM policy to the user. Assign the Lambda execution user to the Lambda function.",
      "Use AWS Identity and Access Management (IAM) to create a Lambda execution role. Attach the IAM policy to the role. Assign the Lambda execution role to the Lambda function.",
      "Use AWS Identity and Access Management (IAM) to create a Lambda execution user. Attach the IAM policy to the user. Store the IAM user credentials as environment variables on the Lambda function."
    ],
    correctAnswer: 2,
    category: "Security",
    explanation: "An execution role for an AWS Lambda function grants the function the permissions it needs to access AWS services and resources. You specify this role when you create the function, and Lambda assumes the role when the function is invoked. Using an execution role allows secure access to AWS resources without hardcoding credentials.",
    optionExplanations: [
      "Incorrect: An IAM role cannot be stored as an environment variable. The role is assigned directly in the Lambda function's configuration.",
      "Incorrect: Lambda uses roles, not IAM users. IAM users are for humans or applications, not for Lambda functions.",
      "Correct: Creating a Lambda execution role, attaching the required policy, and assigning it to the function is the Lambda best practice.",
      "Incorrect: Storing credentials as environment variables is not a security best practice. Lambda should use an execution role."
    ]
  },
  {
    id: "dva-006",
    question: "A developer is working on an application that stores highly sensitive data in a database. The developer must use AWS Key Management Service (AWS KMS) with envelope encryption to protect the data.\n\nHow should the developer configure the data encryption to meet these requirements?",
    options: [
      "Use a KMS key to encrypt the data. Store the encrypted data in the database.",
      "Use a generated data key to encrypt the data. Store the encrypted data in the database.",
      "Use a generated data key to encrypt the data. Store both the encrypted data and the encrypted data key in the database.",
      "Use a generated data key to encrypt the data. Store the encrypted data and the data key ID in the database."
    ],
    correctAnswer: 2,
    category: "Security",
    explanation: "Envelope encryption is the practice of encrypting plaintext data with a data key, and then encrypting the data key under another key. You must store the encrypted form of the data key so that you can later decrypt the encrypted data in the database. Use the KMS GenerateDataKey API to generate a data key and obtain both the plaintext and encrypted versions. After encrypting the data with the plaintext data key, delete the plaintext key from memory and store only the encrypted data key.",
    optionExplanations: [
      "Incorrect: Using a KMS key to directly encrypt data is inefficient for large amounts of data. Envelope encryption uses a data key for this purpose.",
      "Incorrect: Without storing the encrypted data key, you cannot decrypt the data later.",
      "Correct: The correct implementation of envelope encryption stores both the encrypted data and the encrypted data key. At decryption time, use KMS to decrypt the data key, then use that key to decrypt the data.",
      "Incorrect: The data key ID alone is not sufficient to decrypt. You must store the encrypted data key itself."
    ]
  },
  {
    id: "dva-007",
    question: "A developer is adding Amazon ElastiCache for Memcached to a company's existing record storage application. The developer has decided to use lazy loading based on an analysis of common record access patterns.\n\nWhich pseudocode example correctly implements lazy loading?",
    options: [
      "record_value = cache.get(record_key)\nif (record_value == NULL)\n    record_value = db.query(\"SELECT Details FROM Records WHERE ID == {0}\", record_key)\n    cache.set(record_key, record_value)",
      "record_value = db.query(\"UPDATE Records SET Details = {1} WHERE ID == {0}\", record_key, record_value)\ncache.set(record_key, record_value)",
      "record_value = cache.get(record_key)\ndb.query(\"UPDATE Records SET Details = {1} WHERE ID == {0}\", record_key, record_value)",
      "record_value = db.query(\"SELECT Details FROM Records WHERE ID == {0}\", record_key)\nif (record_value != NULL)\n    cache.set(record_key, record_value)"
    ],
    correctAnswer: 0,
    category: "Database",
    explanation: "Lazy loading is a caching strategy in which records are not loaded until they are needed. When lazy loading is implemented, the application first checks the cache for the record. If the record does not exist, the application retrieves the record from the database and stores it in the cache. This strategy ensures that only frequently accessed data is cached, making efficient use of cache memory.",
    optionExplanations: [
      "Correct: This checks the cache first and only retrieves from the database when data is absent, then stores it in the cache. This is the correct implementation of lazy loading.",
      "Incorrect: This is an UPDATE operation, not a read operation. Lazy loading is a read caching strategy.",
      "Incorrect: This retrieves from the cache and then performs an UPDATE operation; it does not include read logic.",
      "Incorrect: This always reads from the database and does not check the cache first, so the benefits of caching are not realized."
    ]
  },
  {
    id: "dva-008",
    question: "A developer is building a web application that uses Amazon API Gateway. The developer wants to maintain separate environments for development (dev) and production (prod) workloads. The API is backed by an AWS Lambda function that has two aliases: one for dev and one for prod.\n\nHow can the developer maintain these environments with the least amount of configuration?",
    options: [
      "Create a REST API for each environment. Integrate the APIs with the corresponding dev and prod aliases of the Lambda function. Deploy each API to its respective stage. Access the APIs using the stage URLs.",
      "Create one REST API. Integrate the API with the dev alias of the Lambda function. Deploy the API to the dev environment. Configure a canary release deployment for the prod environment where the canary integrates with the Lambda prod alias.",
      "Create one REST API. Use a stage variable instead of an alias to integrate the API with the Lambda function. Deploy the API to two different stages for dev and prod. Create a stage variable in each stage with a different alias as the value. Access the APIs using different stage URLs.",
      "Create one REST API. Integrate the API with the prod alias of the Lambda function. Deploy the API to the prod environment. Configure a canary release deployment for the dev environment where the canary integrates with the Lambda dev alias."
    ],
    correctAnswer: 2,
    category: "Deployment",
    explanation: "Amazon API Gateway deployment stages let you manage multiple release stages for each API. You can configure stage variables so that the API deployment stage can interact with different backend endpoints. Using API Gateway stage variables, you can reference a single AWS Lambda function that has multiple versions and aliases. This approach lets you manage multiple environments with one API, minimizing configuration.",
    optionExplanations: [
      "Incorrect: Creating a separate API for each environment increases management complexity and configuration. This does not meet the least-configuration requirement.",
      "Incorrect: Canary deployments are for traffic splitting and are not suited for managing fully isolated dev/prod environments.",
      "Correct: Using one API with stage variables allows multiple environments to be managed with minimal configuration. Each stage can reference a different Lambda alias.",
      "Incorrect: This misuses canary deployments, and using a canary for the dev environment is not a common or recommended approach."
    ]
  },
  {
    id: "dva-009",
    question: "A developer wants to track the performance of an application running on a fleet of Amazon EC2 instances. The developer wants to view and track statistics such as average request latency and maximum request latency across the fleet. The developer wants to receive an immediate notification when the average response time exceeds a threshold.\n\nWhich solution meets these requirements?",
    options: [
      "Configure a cron job on each EC2 instance to measure response times and update a log file stored in an Amazon S3 bucket every minute. Use Amazon S3 event notifications to invoke an AWS Lambda function that reads the log file and writes new entries to an Amazon OpenSearch Service cluster. Visualize the results in an OpenSearch dashboard. Configure OpenSearch Service to send an alert to an Amazon Simple Notification Service (Amazon SNS) topic when response time exceeds the threshold.",
      "Configure the application to write response times to a log file. Install and configure the Amazon CloudWatch agent on the EC2 instances to stream the application logs to CloudWatch Logs. Create a metric filter for response time from the logs. View a graph of the metrics in the CloudWatch console. Create a CloudWatch alarm to send an Amazon Simple Notification Service (Amazon SNS) notification when the average of the response time metric exceeds the threshold.",
      "Configure the application to write response times to a system log. Install and configure the Amazon Inspector agent on the EC2 instances to continuously read the logs and send response times to Amazon EventBridge (Amazon CloudWatch Events). View a graph of the metrics in the EventBridge (CloudWatch Events) console. Configure a custom EventBridge (CloudWatch Events) rule to send an Amazon Simple Notification Service (Amazon SNS) notification when the average of the response time metric exceeds the threshold.",
      "Install and configure the AWS Systems Manager Agent (SSM Agent) on the EC2 instances to monitor response times and send them to Amazon CloudWatch as a custom metric. View a graph of the metrics in Amazon QuickSight. Create a CloudWatch alarm to send an Amazon Simple Notification Service (Amazon SNS) notification when the average of the response time metric exceeds the threshold."
    ],
    correctAnswer: 1,
    category: "Monitoring",
    explanation: "You can configure the Amazon CloudWatch agent to stream logs and metrics to CloudWatch. You can also create metric filters from logs stored in CloudWatch Logs. Metric filters let you extract numerical metrics from log data and store them as CloudWatch metrics. You can then use CloudWatch alarms to monitor thresholds and send SNS notifications. This solution is the simplest and most effective way to meet the requirements.",
    optionExplanations: [
      "Incorrect: Using S3 and OpenSearch Service is overly complex and not well suited for real-time alerting. It also increases cost.",
      "Correct: Using the CloudWatch agent, logs, metric filters, and alarms efficiently satisfies all the requirements.",
      "Incorrect: Amazon Inspector is a security assessment service and is not used for collecting application performance metrics.",
      "Incorrect: SSM Agent is primarily for system management and is not suitable for collecting custom application metrics. QuickSight is a business intelligence tool and is not appropriate for real-time monitoring."
    ]
  },
  {
    id: "dva-010",
    question: "A developer tested an application locally and deployed it to an AWS Lambda function. To avoid exceeding the deployment package size quota, the developer did not include dependencies in the deployment file. When the developer tests the application remotely, the Lambda function does not run because of missing dependencies.\n\nWhich solution resolves this issue?",
    options: [
      "Use the Lambda console editor to update the code and include the missing dependencies.",
      "Create an additional .zip file that contains the missing dependencies. Include the .zip file in the original Lambda deployment package.",
      "Create a layer that contains the missing dependencies. Attach the layer to the Lambda function.",
      "Add a reference to the missing dependencies in the Lambda function's environment variables."
    ],
    correctAnswer: 2,
    category: "Deployment",
    explanation: "You can configure an AWS Lambda function to pull in additional code and content in the form of layers. A layer is a .zip file archive that can contain libraries, a custom runtime, or other dependencies. Using layers allows Lambda functions to use libraries without including them in the deployment package. Layers can be shared across multiple functions and help keep deployment packages small.",
    optionExplanations: [
      "Incorrect: The Lambda console editor has a 3 MB size limit, making it unsuitable for adding large dependencies.",
      "Incorrect: Including dependencies in the deployment package increases its size and may cause it to exceed the quota. This does not solve the original problem.",
      "Correct: Using a Lambda layer allows dependencies to be managed separately, keeping the deployment package small while still making the required libraries available.",
      "Incorrect: Environment variables are for storing configuration values and cannot contain dependency code."
    ]
  },
  {
    id: "dva-011",
    question: "A developer is building a CI/CD pipeline using AWS CodePipeline. The pipeline must detect source code changes and automatically run build, test, and deploy stages. The developer wants to add a manual approval step before deployment.\n\nWhat action should the developer take to meet these requirements?",
    options: [
      "Add a manual approval action to CodePipeline. Configure it to send an Amazon SNS notification to the approver.",
      "Create an AWS Lambda function to implement the approval logic. Add the Lambda function as a custom action in CodePipeline.",
      "Use AWS Step Functions to create an approval workflow. Integrate Step Functions with CodePipeline.",
      "Create an Amazon SQS queue to manage approval requests. Send messages from CodePipeline to SQS."
    ],
    correctAnswer: 0,
    category: "Deployment",
    explanation: "AWS CodePipeline natively supports manual approval actions. When a manual approval action is added to a pipeline, the pipeline execution pauses and waits until the designated approver approves or rejects it. You can configure Amazon SNS notifications to alert the approver. This is the simplest and most effective approach.",
    optionExplanations: [
      "Correct: A CodePipeline manual approval action is the standard way to implement a pre-deployment approval process. SNS notifications allow immediate notification to approvers.",
      "Incorrect: Implementing approval logic in a Lambda function is possible but more complex. CodePipeline's built-in manual approval action is simpler and more efficient.",
      "Incorrect: Step Functions is suitable for complex workflows, but CodePipeline's built-in functionality is sufficient for a simple manual approval.",
      "Incorrect: Using an SQS queue is possible but unnecessary. CodePipeline's manual approval action is easier to integrate and manage."
    ]
  },
  {
    id: "dva-012",
    question: "A developer is building an application that writes large amounts of data to an Amazon DynamoDB table. The application must maximize write throughput and minimize cost. The table's partition key is a user ID.\n\nWhich approach should the developer take to meet these requirements?",
    options: [
      "Use the same partition key value for all writes to concentrate data in one partition.",
      "Use the batch write API for all write operations.",
      "Set the DynamoDB provisioned throughput to the maximum value.",
      "Add a random suffix to the partition key to distribute writes across multiple partitions."
    ],
    correctAnswer: 3,
    category: "Database",
    explanation: "To maximize DynamoDB performance, it is important to distribute writes evenly across multiple partitions. Adding a random suffix to the partition key (for example, user ID + random number) avoids hot partitions and improves write throughput. This makes full use of DynamoDB's distributed architecture.",
    optionExplanations: [
      "Incorrect: Concentrating all writes on a single partition creates a hot partition, which throttles throughput. This is an anti-pattern.",
      "Incorrect: Batch writes are efficient, but they do not resolve the hot partition problem. Partition key design is what matters.",
      "Incorrect: Simply increasing provisioned throughput does not solve hot partition issues and also increases cost.",
      "Correct: Adding a random suffix to the partition key distributes writes across multiple partitions and maximizes write throughput."
    ]
  },
  {
    id: "dva-013",
    question: "A developer is using AWS X-Ray to analyze the performance of a microservices application. The application consists of multiple AWS Lambda functions and Amazon DynamoDB tables. The developer wants to track in detail the execution time of each Lambda function and the query time to DynamoDB.\n\nWhat should the developer do to meet these requirements?",
    options: [
      "Enable X-Ray tracing in the Lambda function's environment variables. No additional code changes are needed.",
      "Add the X-Ray SDK to the Lambda function code and create custom subsegments.",
      "Use CloudWatch Logs to record the execution time of the Lambda functions.",
      "Use AWS CloudTrail to track Lambda function and DynamoDB invocations."
    ],
    correctAnswer: 1,
    category: "Monitoring",
    explanation: "To obtain detailed trace information with AWS X-Ray, you must integrate the X-Ray SDK into your application code and create custom subsegments. This allows you to individually track the execution time of specific code blocks within Lambda functions and DynamoDB query times. The X-Ray SDK automatically instruments calls to AWS services such as DynamoDB.",
    optionExplanations: [
      "Incorrect: Enabling X-Ray through environment variables alone provides only basic trace information. SDK integration is required for detailed analysis.",
      "Correct: Using the X-Ray SDK to create custom subsegments enables detailed performance analysis of the application.",
      "Incorrect: CloudWatch Logs is suitable for logging but does not provide distributed tracing capabilities like X-Ray.",
      "Incorrect: CloudTrail provides audit logs for API calls but is not suitable for performance analysis."
    ]
  },
  {
    id: "dva-014",
    question: "A developer is building a serverless application that automatically generates thumbnails for image files stored in an Amazon S3 bucket. When an image is uploaded to S3, an AWS Lambda function must be triggered, generate a thumbnail, and store it in a different S3 bucket.\n\nHow should the developer configure this to meet these requirements?",
    options: [
      "Configure event notifications on the S3 bucket to invoke the Lambda function directly.",
      "Use Amazon CloudWatch Events to monitor S3 events and invoke the Lambda function.",
      "Create an Amazon SQS queue and send S3 event notifications to the queue. Have the Lambda function poll the queue for messages.",
      "Use AWS Step Functions to process S3 events and invoke the Lambda function."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "Amazon S3 can send notifications when events such as object creation, deletion, or restoration occur. Using S3 event notifications to invoke a Lambda function directly is the simplest and most efficient approach. You only need to enable event notifications in the S3 bucket configuration and specify the Lambda function as the target.",
    optionExplanations: [
      "Correct: Using S3 event notifications to directly invoke the Lambda function is the simplest and most efficient implementation.",
      "Incorrect: Using CloudWatch Events (now EventBridge) is possible but more complex than using S3 event notifications directly.",
      "Incorrect: Placing an SQS queue as an intermediary is possible but adds unnecessary complexity for this requirement. It would be appropriate if retry behavior on processing failure is needed.",
      "Incorrect: Step Functions is suitable for complex workflows, but S3 event notifications are sufficient for simple event-driven processing."
    ]
  },
  {
    id: "dva-015",
    question: "A developer is deploying a web application using AWS Elastic Beanstalk. The application must use different configuration values (such as database connection strings and API keys) for each environment. The developer wants to manage these configuration values securely and keep them separate from the application code.\n\nWhich approach should the developer take to meet these requirements?",
    options: [
      "Hardcode the configuration values in the application code and use different branches for each environment.",
      "Use Elastic Beanstalk environment properties to define the configuration values and read them as environment variables from the application.",
      "Store the configuration values in an S3 bucket and download them at application startup.",
      "Store the configuration values in an Amazon RDS database and read them from the application."
    ],
    correctAnswer: 1,
    category: "Deployment",
    explanation: "Using AWS Elastic Beanstalk environment properties is the recommended approach for managing configuration values. Environment properties can be defined using the Elastic Beanstalk console, CLI, or configuration files and can be read from the application as environment variables. This separates configuration values from code and makes it easy to manage different values per environment. For sensitive information, you can also use AWS Secrets Manager in combination.",
    optionExplanations: [
      "Incorrect: Hardcoding configuration values poses a security risk and is difficult to manage. This is not a best practice.",
      "Correct: Using Elastic Beanstalk environment properties allows configuration values to be managed securely and different values to be set per environment easily.",
      "Incorrect: Using an S3 bucket is possible but more complex. Using Elastic Beanstalk environment properties is simpler and already integrated.",
      "Incorrect: Storing configuration values in a database is uncommon and adds unnecessary complexity."
    ]
  },
  {
    id: "dva-016",
    question: "A developer is building a REST API using Amazon API Gateway. The API must handle thousands of requests per second and must prevent the backend AWS Lambda function from becoming overloaded.\n\nWhich feature should the developer implement to meet these requirements?",
    options: [
      "Enable API Gateway caching to cache responses for frequently accessed requests.",
      "Configure a concurrency limit on the Lambda function.",
      "Configure the API Gateway throttling settings to limit the request rate.",
      "Place Amazon CloudFront in front of API Gateway to distribute requests."
    ],
    correctAnswer: 2,
    category: "Application Integration",
    explanation: "Using API Gateway throttling settings allows you to limit the rate of requests to the API and protect the backend Lambda function. Throttling can be configured at the stage level or the method level, and you can specify a burst limit and a steady-state rate limit. This ensures predictable performance while preventing the Lambda function from being overloaded.",
    optionExplanations: [
      "Incorrect: Caching improves performance but does not directly prevent the Lambda function from being overloaded. On a cache miss, the Lambda function is still invoked.",
      "Incorrect: A Lambda concurrency limit is effective, but configuring throttling at the API Gateway level provides finer-grained control.",
      "Correct: Configuring API Gateway throttling settings limits the request rate and protects the backend.",
      "Incorrect: CloudFront is suitable for content delivery but does not replace API Gateway's throttling capability."
    ]
  },
  {
    id: "dva-017",
    question: "A developer is building an application using source code stored in an AWS CodeCommit repository. The developer wants to automatically start a build process whenever a push to a specific branch occurs.\n\nWhich service should the developer use to meet these requirements?",
    options: [
      "Use AWS CodeBuild and configure the CodeCommit repository as the source.",
      "Use Amazon EventBridge (CloudWatch Events) to monitor CodeCommit events and invoke AWS CodeBuild.",
      "Create an AWS Lambda function to process CodeCommit events and invoke CodeBuild.",
      "Use AWS CodePipeline with CodeCommit as the source stage and CodeBuild as the build stage."
    ],
    correctAnswer: 3,
    category: "Deployment",
    explanation: "AWS CodePipeline is a CI/CD service that automatically detects source code changes and runs build, test, and deploy processes. By configuring CodeCommit as the source stage and CodeBuild as the build stage, the build process starts automatically whenever a push to a specific branch occurs. This is the most integrated approach and requires minimal additional configuration or code.",
    optionExplanations: [
      "Incorrect: CodeBuild must be started manually or invoked by another service. It does not have native capability to monitor CodeCommit events directly.",
      "Incorrect: Using EventBridge is possible but more involved. CodePipeline is simpler and manages the entire CI/CD workflow.",
      "Incorrect: Using a Lambda function is possible but CodePipeline is more integrated and easier to manage.",
      "Correct: Using CodePipeline automatically detects changes in CodeCommit and starts the build process. This is the most recommended approach."
    ]
  },
  {
    id: "dva-018",
    question: "A developer is building an application that processes messages from an Amazon SQS queue. Processing a message can take up to 5 minutes. The developer must prevent messages from being retrieved by other consumers while they are being processed.\n\nHow should the developer configure this to meet these requirements?",
    options: [
      "Set the message retention period of the SQS queue to more than 5 minutes.",
      "Set the visibility timeout of the SQS queue to more than 5 minutes.",
      "Set the delivery delay of the SQS queue to 5 minutes.",
      "Enable long polling on the SQS queue."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "The Amazon SQS visibility timeout controls how long a message remains invisible to other consumers after it has been retrieved by a consumer. If processing a message can take up to 5 minutes, the visibility timeout must be set to more than 5 minutes (for example, 6 minutes). This prevents other consumers from retrieving the message while it is being processed. After processing is complete, the message must be deleted.",
    optionExplanations: [
      "Incorrect: The message retention period controls the maximum time a message is kept in the queue, but it does not affect visibility during processing.",
      "Correct: Setting the visibility timeout appropriately prevents messages from being retrieved by other consumers while they are being processed.",
      "Incorrect: The delivery delay controls how long after a message is added to the queue before it becomes available for the first time, but it does not affect visibility during processing.",
      "Incorrect: Long polling reduces the number of empty responses but does not affect message visibility."
    ]
  },
  {
    id: "dva-019",
    question: "A developer is deploying a serverless application using AWS SAM (Serverless Application Model). The application consists of multiple AWS Lambda functions and Amazon DynamoDB tables. The developer wants to test the application in a local environment.\n\nWhich tool should the developer use to meet these requirements?",
    options: [
      "Use the sam local start-api command of the AWS SAM CLI to test the API locally.",
      "Use the test feature in the AWS Lambda console to test each Lambda function individually.",
      "Use Docker Compose to build a local environment for the Lambda functions and DynamoDB.",
      "Use AWS CloudFormation ChangeSets to deploy to a test environment."
    ],
    correctAnswer: 0,
    category: "Deployment",
    explanation: "The AWS SAM CLI provides the ability to run and test serverless applications locally. The sam local start-api command emulates API Gateway locally and invokes Lambda functions. You can also use the sam local invoke command to test individual Lambda functions. The SAM CLI can also be integrated with DynamoDB Local.",
    optionExplanations: [
      "Correct: Using the AWS SAM CLI allows serverless applications to be efficiently tested in a local environment.",
      "Incorrect: The Lambda console test feature is useful but not suitable for local environment testing. It also cannot test API Gateway integrations.",
      "Incorrect: Using Docker Compose is possible but the SAM CLI is simpler and already integrated with SAM templates.",
      "Incorrect: CloudFormation ChangeSets are used to preview changes before deployment and are not suitable for local testing."
    ]
  },
  {
    id: "dva-020",
    question: "A developer is building an application that processes real-time data using an Amazon Kinesis data stream. Multiple consumers must independently read data from the same data stream. Each consumer must process all records.\n\nWhich approach should the developer take to meet these requirements?",
    options: [
      "Create a different Kinesis data stream for each consumer.",
      "Use an Amazon SQS queue to deliver data from the Kinesis data stream.",
      "Configure each consumer to read data using the same shard iterator.",
      "Use the enhanced fan-out feature of Kinesis Data Streams to provide dedicated throughput to each consumer."
    ],
    correctAnswer: 3,
    category: "Application Integration",
    explanation: "The enhanced fan-out feature of Kinesis Data Streams allows multiple consumers to independently read data from the same data stream. Each consumer gets dedicated throughput of 2 MB/second per shard and is not affected by other consumers. This enables multiple applications to process data from the same stream in real time.",
    optionExplanations: [
      "Incorrect: Creating a different stream for each consumer leads to data duplication and increased cost.",
      "Incorrect: Using an SQS queue is possible, but the Kinesis enhanced fan-out feature is better suited for real-time processing.",
      "Incorrect: Using the same shard iterator causes throughput to be shared among consumers, degrading performance.",
      "Correct: Using enhanced fan-out allows multiple consumers to independently read data and each receive dedicated throughput."
    ]
  },
  {
    id: "dva-021",
    question: "A developer is building a file processing application using an AWS Lambda function. The Lambda function encounters out-of-memory errors when processing large files. The developer wants to optimize the Lambda function's performance and reduce memory usage.\n\nWhich approaches should the developer take to meet these requirements? (Choose TWO.)",
    options: [
      "Increase the memory configuration of the Lambda function. Increasing memory also increases CPU power.",
      "Process files using streaming to reduce the amount of data loaded into memory at one time.",
      undefined,
      "Split files into smaller chunks and run multiple Lambda functions in parallel.",
      "Convert the Lambda function code to a compiled binary."
    ],
    correctAnswer: 2,
    category: "Compute",
    explanation: "There are two main approaches to resolving out-of-memory issues in a Lambda function. First, increase the memory configuration of the Lambda function. In Lambda, increasing memory proportionally increases CPU power, which also improves processing speed. Second, process files using streaming to reduce the amount of data loaded into memory at one time. This allows large files to be processed in a memory-efficient way.",
    optionExplanations: [
      "Correct: Increasing the Lambda function's memory allows more data to be processed and increases CPU power, improving processing speed.",
      "Correct: Using streaming processing allows files to be processed efficiently without loading the entire file into memory.",
      undefined,
      "Incorrect: Splitting files and running parallel processing is effective but is not a direct solution to this problem and adds complexity.",
      "Incorrect: Converting to a compiled binary does not significantly reduce memory usage."
    ]
  },
  {
    id: "dva-022",
    question: "A developer is building an application that uses an Amazon RDS for PostgreSQL database. The application must manage database connections efficiently and use connection pooling to improve performance.\n\nWhich service should the developer use to meet these requirements?",
    options: [
      "Create RDS read replicas to distribute read traffic.",
      "Use a connection pooling library inside the AWS Lambda function.",
      "Use Amazon ElastiCache to cache database query results.",
      "Use Amazon RDS Proxy to manage database connections."
    ],
    correctAnswer: 3,
    category: "Database",
    explanation: "Amazon RDS Proxy is a fully managed service that manages connections between your application and an RDS database. RDS Proxy pools and reuses database connections, reducing connection overhead and improving application scalability. For serverless applications in particular (such as Lambda functions), RDS Proxy prevents connection count spikes and maintains database stability.",
    optionExplanations: [
      "Incorrect: Read replicas are effective for distributing read traffic but do not resolve connection management issues.",
      "Incorrect: Implementing connection pooling inside a Lambda function is difficult. Lambda functions are short-lived and cannot fully benefit from connection pooling.",
      "Incorrect: ElastiCache is effective for caching query results but is not used for managing database connections.",
      "Correct: RDS Proxy is a managed service that efficiently manages database connections and provides connection pooling."
    ]
  },
  {
    id: "dva-023",
    question: "A developer is implementing a complex workflow using AWS Step Functions. If one step of the workflow fails, the developer wants to automatically retry it, and if it still fails, execute an alternative path.\n\nWhich feature should the developer use to meet these requirements?",
    options: [
      "Use the Step Functions retry policy and Catch block.",
      "Implement a try-catch block inside the AWS Lambda function.",
      "Use an Amazon SQS dead-letter queue to handle failed messages.",
      "Use Amazon CloudWatch Alarms to detect failures and start a separate workflow."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "AWS Step Functions provides built-in features for error handling. The Retry policy automatically retries a step when it fails. The Catch block executes an alternative path when retries are exhausted and the step still fails. Combining these features allows robust error handling to be implemented declaratively.",
    optionExplanations: [
      "Correct: Using the Step Functions retry policy and Catch block allows error handling to be implemented declaratively.",
      "Incorrect: Implementing error handling inside a Lambda function is possible, but using Step Functions' built-in features is easier to manage and improves visibility across the entire workflow.",
      "Incorrect: SQS dead-letter queues are suitable for message queue error handling but do not apply directly to Step Functions workflows.",
      "Incorrect: Using CloudWatch Alarms is possible but Step Functions' built-in features are simpler and more efficient."
    ]
  },
  {
    id: "dva-024",
    question: "A developer is building a REST API using Amazon API Gateway. The API must handle requests from different client applications (web, mobile, and partner). The developer wants to apply different rate limits to each client type.\n\nWhich feature should the developer use to meet these requirements?",
    options: [
      "Use AWS WAF to apply rate limits based on client IP addresses.",
      "Use API Gateway usage plans and API keys to configure per-client rate limits.",
      "Implement custom rate-limiting logic inside the Lambda function.",
      "Use the rate-limiting feature of Amazon CloudFront."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "Using API Gateway usage plans and API keys allows you to configure different rate limits and quotas for each client. A usage plan defines the request rate (requests per second), burst limit, and monthly quota. By issuing an API key to each client and associating it with the appropriate usage plan, you can implement fine-grained access control.",
    optionExplanations: [
      "Incorrect: AWS WAF is effective for security protection, but API Gateway usage plans are better suited for fine-grained rate limit management per client.",
      "Correct: Using API Gateway usage plans and API keys makes it easy to implement different rate limits for each client.",
      "Incorrect: Implementing rate limiting inside a Lambda function is possible but less efficient than using API Gateway's built-in features.",
      "Incorrect: CloudFront is suitable for content delivery but does not replace API Gateway usage plans."
    ]
  },
  {
    id: "dva-025",
    question: "A developer is deploying an application to Amazon EC2 instances using AWS CodeDeploy. The developer wants to minimize application downtime during deployments and automatically roll back if a problem occurs.\n\nWhich deployment configuration should the developer use to meet these requirements?",
    options: [
      "Use the AllAtOnce deployment configuration to deploy to all instances simultaneously.",
      "Use a Blue/Green deployment to deploy to a new environment and then shift traffic.",
      "Use the HalfAtATime deployment configuration to deploy to half of the instances at a time.",
      "Use the OneAtATime deployment configuration to deploy to one instance at a time."
    ],
    correctAnswer: 1,
    category: "Deployment",
    explanation: "A Blue/Green deployment is the best approach for minimizing downtime and enabling safe rollback. In a Blue/Green deployment, the new version of the application is deployed to a new environment (Green), and once testing is complete, traffic is shifted from the old environment (Blue) to the new one. If a problem occurs, traffic can be immediately shifted back to the original environment.",
    optionExplanations: [
      "Incorrect: AllAtOnce deploys to all instances simultaneously, causing downtime and making rollback difficult.",
      "Correct: Blue/Green deployment minimizes downtime and enables safe, rapid rollback.",
      "Incorrect: HalfAtATime can reduce downtime but is not as safe as Blue/Green deployment.",
      "Incorrect: OneAtATime can reduce downtime but takes longer to deploy and is not as safe as Blue/Green deployment."
    ]
  },
  {
    id: "dva-026",
    question: "A developer needs to encrypt sensitive data stored in an Amazon S3 bucket. The developer wants full control over the encryption keys and wants to automate key rotation.\n\nWhich encryption option should the developer use to meet these requirements?",
    options: [
      "Use S3-managed encryption keys (SSE-S3).",
      "Use client-side encryption to encrypt the data before uploading it to S3.",
      "Use customer-provided encryption keys (SSE-C).",
      "Use AWS KMS-managed encryption keys (SSE-KMS)."
    ],
    correctAnswer: 3,
    category: "Security",
    explanation: "Using AWS KMS-managed encryption keys (SSE-KMS) provides full control over the encryption keys and allows key rotation to be automated. With KMS, you can create a customer managed key (CMK) and control access using key policies. KMS also supports automatic key rotation, which rotates the key material once a year. In addition, KMS logs all key usage in CloudTrail, which satisfies audit requirements.",
    optionExplanations: [
      "Incorrect: SSE-S3 is easy to use, but it does not provide full control over the encryption keys. The keys are managed by AWS.",
      "Incorrect: With client-side encryption, you must manage the encryption keys yourself, and automatic rotation is not supported.",
      "Incorrect: With SSE-C, you must manage the encryption keys yourself, and automatic rotation is not supported. Key management also becomes more complex.",
      "Correct: Using SSE-KMS provides full control over encryption keys and allows automatic key rotation to be enabled."
    ]
  },
  {
    id: "dva-027",
    question: "A developer is building an event-driven application using an AWS Lambda function. The Lambda function processes events from Amazon DynamoDB Streams. The developer wants to automatically retry records that fail processing and, if they still fail, send them to a separate queue.\n\nWhich feature should the developer use to meet these requirements?",
    options: [
      "Use Step Functions to process DynamoDB Streams events.",
      "Configure a retry policy in the DynamoDB Streams settings.",
      "Implement a try-catch block inside the Lambda function and send failed records to SQS.",
      "Configure the Lambda function's retry behavior and specify an SQS queue as the on-failure destination."
    ],
    correctAnswer: 3,
    category: "Application Integration",
    explanation: "AWS Lambda provides retry behavior and on-failure destination features for event source mappings. When using DynamoDB Streams as an event source, Lambda automatically retries failed records and, after the maximum number of retries is reached, sends the failed records to a specified destination (such as an SQS queue, SNS topic, or another Lambda function). This allows error handling to be implemented declaratively.",
    optionExplanations: [
      "Incorrect: Using Step Functions is possible, but Lambda's built-in features are sufficient for this requirement.",
      "Incorrect: DynamoDB Streams itself does not have a retry policy setting. Retries are configured on the Lambda side.",
      "Incorrect: Implementing error handling inside a Lambda function is possible, but using Lambda's built-in features is easier to manage.",
      "Correct: Using Lambda's retry behavior and on-failure destination feature makes it easy to implement error handling."
    ]
  },
  {
    id: "dva-028",
    question: "A developer is running a containerized application using Amazon ECS (Elastic Container Service). The application needs to use sensitive information such as database passwords and API keys. The developer wants to manage this sensitive information securely.\n\nWhich approach should the developer take to meet these requirements?",
    options: [
      "Embed the sensitive information in the Docker image.",
      "Define the sensitive information as environment variables in the ECS task definition.",
      "Store the sensitive information in AWS Secrets Manager and reference the secrets in the ECS task definition.",
      "Store the sensitive information in an S3 bucket and download it when the container starts."
    ],
    correctAnswer: 2,
    category: "Security",
    explanation: "Storing sensitive information in AWS Secrets Manager and referencing the secrets in the ECS task definition is the most secure and recommended approach. ECS natively supports integration with Secrets Manager. By specifying the secret ARN in the task definition, the secret is automatically retrieved and injected as an environment variable when the container starts. This separates sensitive information from code and images, enabling centralized management.",
    optionExplanations: [
      "Incorrect: Embedding sensitive information in a Docker image is a serious security risk. If the image is exposed, the sensitive information is also exposed.",
      "Incorrect: Defining sensitive information as environment variables in an ECS task definition is possible, but the information is stored in plain text, posing a security risk.",
      "Correct: Using Secrets Manager allows sensitive information to be managed securely and automatically injected into ECS tasks.",
      "Incorrect: Using an S3 bucket is possible, but Secrets Manager is purpose-built for managing sensitive information and is more secure."
    ]
  },
  {
    id: "dva-029",
    question: "A developer is managing infrastructure as code using AWS CloudFormation. The developer wants to review the changes before they are applied when updating a CloudFormation stack.\n\nWhich feature should the developer use to meet these requirements?",
    options: [
      "Use CloudFormation Drift to detect changes to the stack.",
      "Use a CloudFormation Stack Policy to restrict changes.",
      "Use AWS Config to monitor stack changes.",
      "Create a CloudFormation ChangeSet to preview the changes."
    ],
    correctAnswer: 3,
    category: "Deployment",
    explanation: "A CloudFormation ChangeSet allows you to preview changes before executing a stack update. When you create a ChangeSet, CloudFormation analyzes the proposed changes and shows which resources will be added, modified, or deleted. This prevents unintended changes and allows you to understand the impact of an update in advance. After reviewing the ChangeSet, you can choose to execute it or discard it.",
    optionExplanations: [
      "Incorrect: CloudFormation Drift detects differences between the actual state of a stack and the template, but it is not used to preview changes before an update.",
      "Incorrect: A Stack Policy protects specific resources during a stack update, but it is not used to preview changes.",
      "Incorrect: AWS Config tracks configuration changes to resources, but it is not used to preview CloudFormation stack updates.",
      "Correct: Using a CloudFormation ChangeSet allows you to safely preview changes before updating the stack."
    ]
  },
  {
    id: "dva-030",
    question: "A developer is building a REST API using Amazon API Gateway. The API must integrate with multiple backend services (Lambda functions, HTTP endpoints, and AWS services). The developer wants to transform the requests and responses to and from each backend service.\n\nWhich feature should the developer use to meet these requirements?",
    options: [
      "Use API Gateway mapping templates to transform requests and responses.",
      "Use a Lambda function to transform requests and responses.",
      "Use AWS Step Functions to integrate multiple backend services.",
      "Use Amazon EventBridge to route requests."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "API Gateway mapping templates are a powerful feature for transforming request and response data. Mapping templates are written using the Velocity Template Language (VTL) and can transform requests from clients into the format expected by backend services, and transform responses from backend services into the format expected by clients. This allows flexible control over the API's input and output formats without modifying the backend services.",
    optionExplanations: [
      "Correct: Using API Gateway mapping templates allows requests and responses to be transformed efficiently.",
      "Incorrect: Using a Lambda function for data transformation is possible, but using API Gateway mapping templates avoids additional cost and latency.",
      "Incorrect: Step Functions is suitable for complex workflows, but API Gateway mapping templates are sufficient for simple data transformation.",
      "Incorrect: EventBridge is suitable for event-driven architectures but is not used for API Gateway request/response transformation."
    ]
  },
  {
    id: "dva-031",
    question: "A developer is building an event-driven architecture using Amazon EventBridge (CloudWatch Events). The developer wants to process events from multiple AWS accounts on a single event bus.\n\nHow should the developer configure this to meet these requirements?",
    options: [
      "Configure a cross-account event bus policy to receive events from other accounts.",
      "Create an EventBridge event bus in each AWS account and manually forward events.",
      "Use an AWS Lambda function to collect events from each account.",
      "Use an Amazon SNS topic to aggregate events from each account."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "Amazon EventBridge natively supports cross-account event delivery. By configuring a resource-based policy on an event bus, you can receive events from other AWS accounts. In the sending account, you only need to specify the event bus in the other account as the target to send events. This allows events from multiple accounts to be centrally managed on a single event bus.",
    optionExplanations: [
      "Correct: Using an EventBridge cross-account event bus policy allows events to be received from multiple accounts.",
      "Incorrect: Manually forwarding events is inefficient. Using EventBridge's cross-account feature is simpler.",
      "Incorrect: Using a Lambda function is possible, but using EventBridge's native feature is more efficient.",
      "Incorrect: Using an SNS topic is possible, but EventBridge's cross-account feature is better suited for event-driven architectures."
    ]
  },
  {
    id: "dva-032",
    question: "A developer is building a GraphQL API using AWS AppSync. The API must retrieve data from an Amazon DynamoDB table and deliver real-time updates to clients.\n\nWhich features should the developer use to meet these requirements?",
    options: [
      "Use AppSync resolvers and a DynamoDB data source. Manually implement WebSocket for real-time updates.",
      "Use the API Gateway WebSocket API to implement real-time updates.",
      "Use a Lambda function to retrieve data from DynamoDB and use Amazon SNS to notify clients.",
      "Use AppSync resolvers, a DynamoDB data source, and subscriptions."
    ],
    correctAnswer: 3,
    category: "Application Integration",
    explanation: "AWS AppSync natively supports GraphQL subscriptions, making it easy to implement real-time updates. By using AppSync resolvers to connect to a DynamoDB data source, updates can be automatically delivered to clients via subscriptions whenever a mutation (data change) occurs. AppSync automatically manages WebSocket connections, so there is no need to implement WebSocket manually.",
    optionExplanations: [
      "Incorrect: AppSync automatically manages WebSocket connections, so there is no need to implement WebSocket manually.",
      "Incorrect: Using the API Gateway WebSocket API is possible, but AppSync is better suited for GraphQL APIs.",
      "Incorrect: Using a Lambda function and SNS is possible, but using AppSync's native features is simpler and more efficient.",
      "Correct: Using AppSync resolvers, a DynamoDB data source, and subscriptions makes it easy to implement real-time updates."
    ]
  },
  {
    id: "dva-033",
    question: "A developer is managing software packages using AWS CodeArtifact. The developer wants to cache packages from public repositories (such as npm, PyPI, and Maven) to speed up the build process.\n\nHow should the developer configure this to meet these requirements?",
    options: [
      "Use an S3 bucket to cache packages from public repositories.",
      "Use a Lambda function to download packages from public repositories and upload them to CodeArtifact.",
      "Configure an external connection on the CodeArtifact repository to automatically cache packages from public repositories.",
      "Use Amazon ElastiCache to cache package metadata."
    ],
    correctAnswer: 2,
    category: "Deployment",
    explanation: "AWS CodeArtifact provides an external connection feature that allows packages to be automatically cached from public repositories such as npm, PyPI, and Maven Central. When an external connection is configured on a CodeArtifact repository, the package is retrieved from the public repository the first time it is requested and cached in CodeArtifact. Subsequent requests use the cached package, speeding up the build process.",
    optionExplanations: [
      "Incorrect: Using an S3 bucket is possible, but CodeArtifact is purpose-built for package management and is more appropriate.",
      "Incorrect: Using a Lambda function is possible, but using CodeArtifact's external connection feature is simpler and more efficient.",
      "Correct: Using CodeArtifact's external connection feature allows packages from public repositories to be automatically cached.",
      "Incorrect: ElastiCache is suitable for data caching, but CodeArtifact is more appropriate for package management."
    ]
  },
  {
    id: "dva-034",
    question: "A developer is implementing user authentication using an Amazon Cognito user pool. The developer wants to perform additional validation steps when a user signs up (for example, verifying a corporate email domain or validating user information against an external API).\n\nWhich feature should the developer use to meet these requirements?",
    options: [
      "Use the Cognito pre sign-up trigger to implement custom validation logic in a Lambda function.",
      "Use the Cognito post confirmation trigger to implement custom validation logic in a Lambda function.",
      "Use API Gateway to intercept sign-up requests and perform validation.",
      "Use AWS WAF to filter sign-up requests."
    ],
    correctAnswer: 0,
    category: "Security",
    explanation: "The Amazon Cognito pre sign-up trigger is a Lambda function that runs custom logic before a user signs up. This trigger can be used to verify a corporate email domain, validate user information against an external API, or add custom attributes. If validation fails, the sign-up can be rejected. This gives you control over which users are registered in the user pool.",
    optionExplanations: [
      "Correct: Using the Cognito pre sign-up trigger allows custom validation logic to be implemented before sign-up.",
      "Incorrect: The post confirmation trigger runs after the user confirms their email address, so it is not suitable for validation at sign-up time.",
      "Incorrect: Using API Gateway is possible, but using Cognito triggers is more integrated and easier to manage.",
      "Incorrect: AWS WAF is effective for security protection but is not suitable for custom business logic validation."
    ]
  },
  {
    id: "dva-035",
    question: "A developer is running a containerized application using AWS Fargate. The application requires shared storage across multiple containers. The developer wants to ensure data is persisted even if a container restarts.\n\nWhich storage option should the developer use to meet these requirements?",
    options: [
      "Mount Amazon EFS (Elastic File System) to the Fargate task.",
      "Attach an Amazon EBS (Elastic Block Store) volume to the Fargate task.",
      "Use Docker volumes to share data between containers.",
      "Use an Amazon S3 bucket to store the data."
    ],
    correctAnswer: 0,
    category: "Compute",
    explanation: "Amazon EFS (Elastic File System) is the persistent shared storage option that can be mounted to AWS Fargate tasks. With EFS, a file system can be shared across multiple containers, and data persists even if the container restarts. EFS is configured as a volume in the Fargate task definition, and a mount point is specified for the container.",
    optionExplanations: [
      "Correct: Mounting Amazon EFS to a Fargate task provides persistent shared storage.",
      "Incorrect: EBS volumes cannot be directly attached to Fargate tasks. EBS is for EC2 instances.",
      "Incorrect: Docker volumes can share data between containers within the same task, but the data is lost when the task ends.",
      "Incorrect: Using an S3 bucket is possible, but EFS is more appropriate for mounting as a file system."
    ]
  },
  {
    id: "dva-036",
    question: "A developer is building an application that uses an Amazon DynamoDB table. The application needs to retrieve multiple items at once and wants to optimize read throughput.\n\nWhich API operation should the developer use to meet these requirements?",
    options: [
      "Call the GetItem API multiple times to retrieve each item individually.",
      "Use the BatchGetItem API to retrieve multiple items at once.",
      "Use the Query API to retrieve items based on a partition key.",
      "Use the Scan API to scan the entire table."
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "The DynamoDB BatchGetItem API is an efficient way to retrieve up to 100 items at once. BatchGetItem combines multiple GetItem requests into a single API call, reducing network overhead and improving throughput. BatchGetItem can also retrieve items from multiple tables.",
    optionExplanations: [
      "Incorrect: Calling GetItem multiple times is inefficient and increases network overhead. Using BatchGetItem is more efficient.",
      "Correct: Using the BatchGetItem API allows multiple items to be retrieved efficiently in a single call.",
      "Incorrect: The Query API is suitable for retrieving items based on a partition key, but BatchGetItem is more appropriate when retrieving specific items.",
      "Incorrect: The Scan API scans the entire table, which is inefficient and costly. It should not be used when retrieving specific items."
    ]
  },
  {
    id: "dva-037",
    question: "A developer is managing application configuration using AWS Systems Manager Parameter Store. The developer wants to track parameter changes and automatically take action when a change occurs.\n\nWhich services should the developer use to meet these requirements?",
    options: [
      "Use Amazon CloudWatch Logs to monitor changes to Parameter Store.",
      "Use AWS Config to track changes to Parameter Store.",
      "Use AWS CloudTrail to log changes to Parameter Store and use Amazon EventBridge to process the events.",
      "Use AWS X-Ray to trace changes to Parameter Store."
    ],
    correctAnswer: 2,
    category: "Monitoring",
    explanation: "AWS CloudTrail logs all API calls to Parameter Store, including parameter creation, updates, and deletion. By sending CloudTrail events to Amazon EventBridge, you can automatically take actions (such as invoking a Lambda function or sending an SNS notification) when a parameter change occurs. This allows you to track parameter changes and implement automated workflows.",
    optionExplanations: [
      "Incorrect: CloudWatch Logs is suitable for storing and analyzing logs, but it does not have the ability to automatically detect Parameter Store changes.",
      "Incorrect: AWS Config is a service for tracking configuration changes to resources, but it does not directly track Parameter Store changes.",
      "Correct: Combining CloudTrail and EventBridge allows you to track Parameter Store changes and automatically take action.",
      "Incorrect: X-Ray is suitable for application tracing but is not used to track Parameter Store changes."
    ]
  },
  {
    id: "dva-038",
    question: "A developer is building a data processing application using an AWS Lambda function. The Lambda function needs to download and process large files from an Amazon S3 bucket. The developer wants to avoid exceeding the Lambda function's /tmp directory capacity limit (512 MB).\n\nWhich approach should the developer take to meet these requirements?",
    options: [
      "Increase the Lambda function's memory configuration to increase the /tmp directory capacity.",
      "Mount Amazon EFS to the Lambda function to store large files.",
      "Use the S3 Select API to retrieve only the required portions of the file.",
      "Download the file to an Amazon EBS volume."
    ],
    correctAnswer: 2,
    category: "Compute",
    explanation: "Amazon S3 Select is a feature that allows you to retrieve only the data you need from an S3 object. Using SQL-like queries, you can extract specific rows or columns from CSV, JSON, and Parquet files. This allows you to process only the required data without downloading the entire file, avoiding the Lambda function's /tmp directory capacity limit. It also reduces data transfer volume, lowering costs.",
    optionExplanations: [
      "Incorrect: Increasing the Lambda function's memory does not increase the /tmp directory capacity, which remains at 512 MB (configurable up to 10 GB since 2020, but still limited).",
      "Incorrect: Mounting EFS is possible, but using S3 Select is simpler and also reduces data transfer volume.",
      "Correct: Using the S3 Select API allows you to retrieve only the required portions of a file and avoid the /tmp directory capacity limit.",
      "Incorrect: EBS volumes cannot be directly attached to Lambda functions."
    ]
  },
  {
    id: "dva-039",
    question: "A developer is building a REST API using Amazon API Gateway. The API must return a response to the client before the backend Lambda function completes processing (asynchronous processing).\n\nHow should the developer configure this to meet these requirements?",
    options: [
      "Set the API Gateway Lambda integration type to Lambda non-proxy integration and configure the Lambda function to be invoked asynchronously.",
      "Set the API Gateway Lambda integration type to Lambda proxy integration.",
      "Send a message to an Amazon SQS queue inside the Lambda function and return an immediate response.",
      "Use Step Functions to implement an asynchronous workflow."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "In API Gateway, you can invoke a Lambda function asynchronously by setting the Lambda integration type to Lambda non-proxy integration and setting the invocation type to Event (asynchronous). With this configuration, API Gateway immediately returns a response to the client (typically 202 Accepted), and the Lambda function runs in the background. This allows long-running processing to proceed without making the client wait.",
    optionExplanations: [
      "Correct: Configuring an asynchronous invocation with Lambda non-proxy integration allows processing to run without making the client wait.",
      "Incorrect: Lambda proxy integration passes the Lambda function's response directly to the client, so it is not suitable for asynchronous processing.",
      "Incorrect: Using an SQS queue is possible, but using API Gateway's asynchronous Lambda invocation is simpler.",
      "Incorrect: Using Step Functions is possible, but API Gateway's built-in capability is sufficient for simple asynchronous processing."
    ]
  },
  {
    id: "dva-040",
    question: "A developer is building an application using AWS CodeBuild. The build process needs to retrieve source code from a private Git repository. The developer wants to manage the GitHub personal access token securely.\n\nHow should the developer configure this to meet these requirements?",
    options: [
      "Store the personal access token in AWS Secrets Manager and reference it in the CodeBuild project.",
      "Define the personal access token as an environment variable in the CodeBuild project.",
      "Hardcode the personal access token in the buildspec.yml file.",
      "Store the personal access token in an S3 bucket and download it at build time."
    ],
    correctAnswer: 0,
    category: "Security",
    explanation: "Storing the personal access token in AWS Secrets Manager and referencing it in the CodeBuild project is the most secure and recommended approach. CodeBuild natively supports integration with Secrets Manager and can reference secrets as environment variables. In the buildspec.yml file, you only need to specify the Secrets Manager ARN as the value of an environment variable, and the secret is automatically retrieved at build time. This separates sensitive information from code and project configuration, enabling centralized management.",
    optionExplanations: [
      "Correct: Using Secrets Manager allows the personal access token to be managed securely and referenced in the CodeBuild project.",
      "Incorrect: Defining it as an environment variable is possible, but sensitive information is stored in plain text, posing a security risk.",
      "Incorrect: Hardcoding in the buildspec.yml file is a serious security risk.",
      "Incorrect: Using an S3 bucket is possible, but Secrets Manager is purpose-built for managing sensitive information and is more secure."
    ]
  },
  {
    id: "dva-041",
    question: "A developer is building an application that uses an Amazon DynamoDB table. The application needs to perform a conditional write to create a new item only if the item does not already exist.\n\nWhich API parameter should the developer use to meet these requirements?",
    options: [
      "Use the ConditionExpression parameter with the PutItem API and specify the attribute_not_exists condition.",
      "Use the ConditionExpression parameter with the UpdateItem API and specify the attribute_exists condition.",
      "Use the Expected parameter with the PutItem API to check for the item's existence.",
      "Use the TransactWriteItems API to check for the item's existence within a transaction."
    ],
    correctAnswer: 0,
    category: "Database",
    explanation: "Using the ConditionExpression parameter with the DynamoDB PutItem API and specifying the attribute_not_exists function allows a new item to be created only if the item does not already exist. If the condition is not met (that is, the item already exists), the PutItem operation fails and a ConditionalCheckFailedException is returned. This prevents race conditions and maintains data integrity.",
    optionExplanations: [
      "Correct: Using ConditionExpression with the attribute_not_exists function on the PutItem API allows an item to be created only if it does not already exist.",
      "Incorrect: The UpdateItem API is for updating existing items, and the attribute_exists condition performs the update when the item exists.",
      "Incorrect: The Expected parameter is a legacy condition expression syntax. Using ConditionExpression is recommended.",
      "Incorrect: Using TransactWriteItems is possible, but PutItem is sufficient for simple conditional writes."
    ]
  },
  {
    id: "dva-042",
    question: "A developer is building an image processing application using an AWS Lambda function. The Lambda function needs to access multiple AWS services (S3, DynamoDB, SNS, etc.). The developer wants to configure IAM policies following the principle of least privilege.\n\nWhich approaches should the developer take to meet these requirements? (Choose TWO.)",
    options: [
      "Create a custom IAM policy that includes only the permissions needed to access each AWS service required by the Lambda function.",
      "Attach the AdministratorAccess managed policy to the Lambda function.",
      "Specify resource ARNs in the IAM policy to allow access only to specific S3 buckets and DynamoDB tables.",
      undefined,
      "Use a wildcard (*) to grant full access to all AWS services."
    ],
    correctAnswer: 3,
    category: "Security",
    explanation: "To follow the principle of least privilege, you must create a custom IAM policy that allows only the operations and resource access the Lambda function requires. Specifically, create a policy that includes only the permissions needed for the required AWS services, and specify resource ARNs to allow access only to specific resources (S3 buckets, DynamoDB tables, etc.). This minimizes the impact if the Lambda function is compromised.",
    optionExplanations: [
      "Correct: Creating a custom policy that includes only the permissions needed for required services follows the principle of least privilege.",
      "Incorrect: AdministratorAccess grants full access to all AWS services, which violates the principle of least privilege.",
      "Correct: Specifying resource ARNs allows access only to specific resources, achieving least privilege.",
      undefined,
      "Incorrect: Using a wildcard grants access to all resources, which violates the principle of least privilege."
    ]
  },
  {
    id: "dva-043",
    question: "A developer is building a REST API using Amazon API Gateway. The API must enable CORS to accept requests from different domains.\n\nHow should the developer configure this to meet these requirements?",
    options: [
      "Use AWS WAF to filter CORS requests.",
      "Add CORS headers to responses inside the Lambda function.",
      "Use a CloudFront distribution to add CORS headers.",
      "Enable CORS in the API Gateway console and configure the allowed origins, methods, and headers."
    ],
    correctAnswer: 3,
    category: "Application Integration",
    explanation: "The simplest way to enable CORS in API Gateway is to use the Enable CORS option in the API Gateway console. This causes API Gateway to automatically create an OPTIONS method and add the appropriate CORS headers (such as Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers) to responses. By specifying the allowed origins, methods, and headers, you can accept cross-origin requests while maintaining security.",
    optionExplanations: [
      "Incorrect: AWS WAF is effective for security protection but is not used to configure CORS.",
      "Incorrect: Adding CORS headers inside the Lambda function is possible, but using API Gateway's CORS feature is simpler and also automatically handles OPTIONS preflight requests.",
      "Incorrect: Using CloudFront is possible, but using API Gateway's CORS feature is more direct and efficient.",
      "Correct: Enabling CORS in the API Gateway console is the simplest and most recommended approach."
    ]
  },
  {
    id: "dva-044",
    question: "A developer is building a CI/CD pipeline using AWS CodePipeline. The pipeline must deploy an application to multiple environments (development, staging, and production). The developer wants to use different configuration values for each environment.\n\nWhich approach should the developer take to meet these requirements?",
    options: [
      "Use the CodePipeline variables feature to define different values for each environment.",
      "Store per-environment configuration values in AWS Systems Manager Parameter Store and retrieve them at deployment time.",
      "Create a separate CodePipeline for each environment.",
      "Hardcode configuration values in the CloudFormation template."
    ],
    correctAnswer: 1,
    category: "Deployment",
    explanation: "Storing per-environment configuration values in AWS Systems Manager Parameter Store and retrieving them at deployment time is the most flexible and manageable approach. In Parameter Store, you can manage different values per environment by using the environment name as a prefix in the parameter name (for example, /dev/database/url and /prod/database/url). By retrieving the appropriate parameter based on the environment name in deployment scripts or CloudFormation templates, a single pipeline can support multiple environments.",
    optionExplanations: [
      "Incorrect: The CodePipeline variables feature is useful, but using Parameter Store makes centralized management and change tracking of configuration values easier.",
      "Correct: Using Parameter Store allows per-environment configuration values to be centrally managed and a single pipeline to support multiple environments.",
      "Incorrect: Creating a separate pipeline for each environment increases management complexity and causes code duplication.",
      "Incorrect: Hardcoding configuration values is inflexible and poses a security risk."
    ]
  },
  {
    id: "dva-045",
    question: "A developer is building an application that processes messages from an Amazon SQS queue. The application must guarantee the order in which messages are processed.\n\nWhich type of SQS queue should the developer use to meet these requirements?",
    options: [
      "Use a FIFO queue.",
      "Use a standard queue.",
      "Use a dead-letter queue.",
      "Use a delay queue."
    ],
    correctAnswer: 0,
    category: "Application Integration",
    explanation: "Amazon SQS FIFO queues guarantee the order in which messages are processed and prevent duplicates. With a FIFO queue, messages are processed exactly once in the order they were sent. Using a message group ID, related messages can be grouped and order within the group is guaranteed. This makes FIFO queues suitable for order-sensitive applications such as order processing and financial transactions.",
    optionExplanations: [
      "Correct: A FIFO queue guarantees message processing order and prevents duplicates, making it ideal for this requirement.",
      "Incorrect: Standard queues provide best-effort ordering but do not guarantee strict ordering. Duplicate messages can also occur.",
      "Incorrect: A dead-letter queue is a feature for storing messages that failed processing and is not related to ordering guarantees.",
      "Incorrect: A delay queue is a feature for delaying message delivery and is not related to ordering guarantees."
    ]
  },
  {
    id: "dva-046",
    question: "A developer is building a data processing application using an AWS Lambda function. The Lambda function needs to call an external API, but rate limiting on the API occasionally causes errors. The developer wants to automatically retry when an error occurs.\n\nWhich approach should the developer take to meet these requirements?",
    options: [
      "Implement a try-catch block inside the Lambda function and run retry logic when an error occurs.",
      "Configure the retry settings for asynchronous invocation of the Lambda function.",
      "Use Step Functions to implement retry logic.",
      "Use an Amazon SQS queue to reprocess failed requests."
    ],
    correctAnswer: 1,
    category: "Compute",
    explanation: "AWS Lambda's asynchronous invocation has a built-in feature that automatically retries when an error occurs. In the Lambda function configuration, you can specify the maximum number of retries (0–2) and the maximum event age (1 minute to 6 hours). You can also configure an on-failure destination so that events that still fail after retries are sent to an SQS queue or SNS topic. This eliminates the need to implement complex retry logic inside the Lambda function.",
    optionExplanations: [
      "Incorrect: Implementing retry logic inside the Lambda function is possible, but using Lambda's built-in retry feature is simpler and keeps the code concise.",
      "Correct: Configuring the retry settings for Lambda's asynchronous invocation allows automatic retries to be implemented.",
      "Incorrect: Using Step Functions is possible, but Lambda's built-in feature is sufficient for simple retries.",
      "Incorrect: Using an SQS queue is possible, but Lambda's retry feature is more direct and efficient."
    ]
  },
  {
    id: "dva-047",
    question: "A developer is delivering a web application using Amazon CloudFront. The application must display different content based on the user's geographic location.\n\nWhich feature should the developer use to meet these requirements?",
    options: [
      "Use CloudFront's geographic restriction feature to block access from specific countries.",
      "Use Lambda@Edge to customize content based on the user's geographic location.",
      "Use CloudFront's custom header feature to forward the user's country information to the origin.",
      "Use AWS WAF to filter requests based on the user's geographic location."
    ],
    correctAnswer: 1,
    category: "Compute",
    explanation: "Using Lambda@Edge allows Lambda functions to run at CloudFront edge locations and customize content based on the user's geographic location. CloudFront automatically adds information such as the user's country, region, and city to request headers. Lambda@Edge functions can read these headers and return different content or route requests to different origins based on the user's location.",
    optionExplanations: [
      "Incorrect: The geographic restriction feature is for blocking access from specific countries and is not used to customize content.",
      "Correct: Using Lambda@Edge allows content to be dynamically customized based on the user's geographic location.",
      "Incorrect: Using custom headers is possible, but Lambda@Edge allows content to be customized at edge locations with lower latency.",
      "Incorrect: AWS WAF is effective for security protection but is not suitable for content customization."
    ]
  },
  {
    id: "dva-048",
    question: "A developer is building an application that uses an Amazon DynamoDB table. The application needs to write multiple items at once, and all writes must either all succeed or all fail (transaction).\n\nWhich API operation should the developer use to meet these requirements?",
    options: [
      "Use the BatchWriteItem API to write multiple items at once.",
      "Use the TransactWriteItems API to write multiple items within a transaction.",
      "Call the PutItem API multiple times to write each item individually.",
      "Use the UpdateItem API to update multiple items."
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "The DynamoDB TransactWriteItems API supports ACID (Atomicity, Consistency, Isolation, Durability) transactions, guaranteeing that write operations on multiple items either all succeed or all fail. TransactWriteItems can perform Put, Update, Delete, and ConditionCheck operations on up to 25 items. If any operation fails, the entire transaction is rolled back.",
    optionExplanations: [
      "Incorrect: BatchWriteItem can write multiple items efficiently, but it does not provide transaction guarantees. Some writes may succeed while others fail.",
      "Correct: Using the TransactWriteItems API implements ACID transactions, guaranteeing that all writes either succeed or fail together.",
      "Incorrect: Calling PutItem multiple times is inefficient and provides no transaction guarantees.",
      "Incorrect: UpdateItem is for updating existing items and is not suitable for transactional writes across multiple items."
    ]
  },
  {
    id: "dva-049",
    question: "A developer is building a mobile application backend using AWS Amplify. The application must allow users to work with data while offline and automatically sync when they come back online.\n\nWhich Amplify feature should the developer use to meet these requirements?",
    options: [
      "Use Amplify Storage to save files to S3.",
      "Use Amplify DataStore to implement offline data synchronization.",
      "Use Amplify API to call a GraphQL API.",
      "Use Amplify Auth to implement user authentication."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "AWS Amplify DataStore is a library that provides offline-first data synchronization. With DataStore, the application stores data in a local database and can read and write data while offline. When the device comes back online, DataStore automatically synchronizes local changes with the cloud (AppSync GraphQL API) and handles conflict resolution automatically. This provides a seamless offline experience.",
    optionExplanations: [
      "Incorrect: Amplify Storage is suitable for storing files but is not appropriate for offline synchronization of structured data.",
      "Correct: Using Amplify DataStore makes it easy to implement offline data synchronization.",
      "Incorrect: Amplify API is suitable for calling GraphQL APIs but does not provide offline synchronization functionality.",
      "Incorrect: Amplify Auth is suitable for user authentication but is not used for data synchronization."
    ]
  },
  {
    id: "dva-050",
    question: "A developer is managing source code using an AWS CodeCommit repository. The developer wants to restrict pushes to specific branches and require pull request review and approval.\n\nWhich feature should the developer use to meet these requirements?",
    options: [
      "Use an AWS Lambda function to monitor push events and block unauthorized pushes.",
      "Use IAM policies to restrict pushes to specific branches.",
      "Use CodeCommit approval rule templates to require pull request approval.",
      "Use AWS Config to monitor branch protection rules."
    ],
    correctAnswer: 2,
    category: "Deployment",
    explanation: "Using AWS CodeCommit approval rule templates allows pull request review and approval to be made mandatory. In an approval rule template, you can define the required number of approvers, the IAM users or roles that can approve, and the approval pool. You can also restrict direct pushes to specific branches (for example, the main branch) and require changes to be merged only through pull requests. This enforces the code review process and improves code quality.",
    optionExplanations: [
      "Incorrect: Using a Lambda function is possible, but using CodeCommit's built-in feature is simpler and more efficient.",
      "Incorrect: Using IAM policies to restrict branch access is possible, but using approval rule templates is more integrated with the pull request workflow and easier to manage.",
      "Correct: Using CodeCommit approval rule templates allows pull request approval to be required and branch protection to be implemented.",
      "Incorrect: AWS Config is a service for tracking configuration changes to resources and is not used to implement branch protection."
    ]
  },
  {
    id: "dva-051",
    question: "A developer is building a new application that converts text files to .pdf files. A separate application writes text files to a source Amazon S3 bucket. The new application must read files as they arrive in Amazon S3 and use an AWS Lambda function to convert the files to .pdf files. The developer has created an IAM policy that grants access to Amazon S3 and Amazon CloudWatch Logs.\n\nWhat should the developer do to ensure that the Lambda function has the correct permissions?",
    options: [
      "Use AWS Identity and Access Management (IAM) to create a Lambda execution user. Attach the IAM policy to the user. Store the IAM user credentials as environment variables on the Lambda function.",
      "Use AWS Identity and Access Management (IAM) to create a Lambda execution user. Attach the IAM policy to the user. Assign the Lambda execution user to the Lambda function.",
      "Use AWS Identity and Access Management (IAM) to create a Lambda execution role. Attach the IAM policy to the role. Store the IAM role as an environment variable on the Lambda function.",
      "Use AWS Identity and Access Management (IAM) to create a Lambda execution role. Attach the IAM policy to the role. Assign the Lambda execution role to the Lambda function."
    ],
    correctAnswer: 3,
    category: "Security",
    explanation: "An execution role for an AWS Lambda function grants the function the permissions it needs to access AWS services and resources. You specify this role when you create the function, and Lambda assumes the role when the function is invoked. Using an execution role allows secure access to AWS resources without hardcoding credentials. Using an IAM role rather than an IAM user is the best practice for Lambda functions.",
    optionExplanations: [
      "Incorrect: Storing IAM user credentials as environment variables poses a security risk and is not a best practice.",
      "Incorrect: Lambda functions require an IAM role, not an IAM user. IAM users are for humans or applications, not for Lambda functions.",
      "Incorrect: An IAM role cannot be stored as an environment variable. The role must be assigned directly in the function's configuration.",
      "Correct: Creating a Lambda execution role, attaching the required policy, and assigning it to the function is the secure best practice for accessing AWS resources."
    ]
  },
  {
    id: "dva-052",
    question: "A developer is working on an application that stores highly sensitive data in a database. The developer must use AWS Key Management Service (AWS KMS) with envelope encryption to protect the data.\n\nHow should the developer configure the data encryption to meet these requirements?",
    options: [
      "Use a KMS key to encrypt the data. Store the encrypted data in the database.",
      "Use a generated data key to encrypt the data. Store the encrypted data in the database.",
      "Use a generated data key to encrypt the data. Store both the encrypted data and the encrypted data key in the database.",
      "Use a generated data key to encrypt the data. Store the encrypted data and the data key ID in the database."
    ],
    correctAnswer: 2,
    category: "Security",
    explanation: "Envelope encryption is the practice of encrypting plaintext data with a data key, and then encrypting that data key under another key (the KMS key). You must store the encrypted form of the data key so that you can later decrypt the encrypted data in the database. At decryption time, first use KMS to decrypt the data key, then use the data key to decrypt the data. This approach allows large amounts of data to be encrypted efficiently, and the KMS key is never used to directly encrypt the data.",
    optionExplanations: [
      "Incorrect: Using a KMS key to directly encrypt data is inefficient for large amounts of data. Envelope encryption uses a data key for this purpose.",
      "Incorrect: Without storing the encrypted data key, you cannot decrypt the data later.",
      "Correct: In envelope encryption, data is encrypted with a data key, and both the encrypted data and the encrypted data key are stored.",
      "Incorrect: The data key ID alone is not sufficient. You must store the encrypted data key itself."
    ]
  },
  {
    id: "dva-053",
    question: "A developer is adding Amazon ElastiCache for Memcached to a company's existing record storage application. The developer has decided to use lazy loading based on an analysis of common record access patterns.\n\nWhich pseudocode example correctly implements lazy loading?",
    options: [
      "record_value = db.query(\"UPDATE Records SET Details = {1} WHERE ID == {0}\", record_key, record_value)\ncache.set(record_key, record_value)",
      "record_value = cache.get(record_key)\nif (record_value == NULL)\n    record_value = db.query(\"SELECT Details FROM Records WHERE ID == {0}\", record_key)\n    cache.set(record_key, record_value)",
      "record_value = cache.get(record_key)\ndb.query(\"UPDATE Records SET Details = {1} WHERE ID == {0}\", record_key, record_value)",
      "record_value = db.query(\"SELECT Details FROM Records WHERE ID == {0}\", record_key)\nif (record_value != NULL)\n    cache.set(record_key, record_value)"
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "Lazy loading is a caching strategy in which records are not loaded until they are needed. When lazy loading is implemented, the application first checks the cache for the record. If the record does not exist (a cache miss), the application retrieves it from the database and stores it in the cache. The next time the same record is requested, it can be retrieved directly from the cache, eliminating the need to access the database and improving performance.",
    optionExplanations: [
      "Incorrect: This is an UPDATE operation, not a read operation. Lazy loading is a pattern for read operations.",
      "Correct: This checks the cache first and only retrieves from the database when data is absent, then stores it in the cache — the correct lazy loading pattern.",
      "Incorrect: This retrieves from the cache and then performs an UPDATE operation, which is not the lazy loading pattern.",
      "Incorrect: This always reads from the database and does not check the cache first, so the benefits of lazy loading are not realized."
    ]
  },
  {
    id: "dva-054",
    question: "A developer is building a web application that uses Amazon API Gateway. The developer wants to maintain separate environments for development (dev) and production (prod) workloads. The API is backed by an AWS Lambda function that has two aliases: one for dev and one for prod.\n\nHow can the developer maintain these environments with the least amount of configuration?",
    options: [
      "Create a REST API for each environment. Integrate the APIs with the corresponding dev and prod aliases of the Lambda function. Deploy each API to its respective stage. Access the APIs using the stage URLs.",
      "Create one REST API. Integrate the API with the prod alias of the Lambda function. Deploy the API to the prod environment. Configure a canary release deployment for the dev environment where the canary integrates with the Lambda dev alias.",
      "Create one REST API. Integrate the API with the dev alias of the Lambda function. Deploy the API to the dev environment. Configure a canary release deployment for the prod environment where the canary integrates with the Lambda prod alias.",
      "Create one REST API. Use a stage variable instead of an alias to integrate the API with the Lambda function. Deploy the API to two different stages for dev and prod. Create a stage variable in each stage with a different alias as the value. Access the APIs using different stage URLs."
    ],
    correctAnswer: 3,
    category: "Deployment",
    explanation: "Amazon API Gateway deployment stages let you manage multiple release stages for each API. You can configure stage variables so that the API deployment stage can interact with different backend endpoints. Using API Gateway stage variables, you can reference a single AWS Lambda function with multiple versions and aliases. This approach allows you to create one API and use stage variables to manage different environments (dev, prod), minimizing configuration.",
    optionExplanations: [
      "Incorrect: Creating a separate API for each environment is possible but increases complexity and does not meet the least-configuration requirement.",
      "Incorrect: This misuses canary releases, which are not appropriate for separating dev and prod environments.",
      "Incorrect: Canary releases are used for gradual deployments and are not suited for the purpose of separating dev and prod environments.",
      "Correct: Using one API with stage variables allows multiple environments to be managed with minimal configuration. Each stage can reference a different Lambda alias."
    ]
  },
  {
    id: "dva-055",
    question: "A developer wants to track the performance of an application running on a fleet of Amazon EC2 instances. The developer wants to view and track statistics such as average request latency and maximum request latency across the fleet. The developer wants to receive an immediate notification when the average response time exceeds a threshold.\n\nWhich solution meets these requirements?",
    options: [
      "Configure a cron job on each EC2 instance to measure response times and update a log file stored in an Amazon S3 bucket every minute. Use Amazon S3 event notifications to invoke an AWS Lambda function that reads the log file and writes new entries to an Amazon OpenSearch Service cluster. Visualize the results in an OpenSearch dashboard. Configure OpenSearch Service to send an alert to an Amazon Simple Notification Service (Amazon SNS) topic when response time exceeds the threshold.",
      "Configure the application to write response times to a system log. Install and configure the Amazon Inspector agent on the EC2 instances to continuously read the logs and send response times to Amazon EventBridge (Amazon CloudWatch Events). View a graph of the metrics in the EventBridge (CloudWatch Events) console. Configure a custom EventBridge (CloudWatch Events) rule to send an Amazon Simple Notification Service (Amazon SNS) notification when the average of the response time metric exceeds the threshold.",
      "Install and configure the AWS Systems Manager Agent (SSM Agent) on the EC2 instances to monitor response times and send them to Amazon CloudWatch as a custom metric. View a graph of the metrics in Amazon QuickSight. Create a CloudWatch alarm to send an Amazon Simple Notification Service (Amazon SNS) notification when the average of the response time metric exceeds the threshold.",
      "Configure the application to write response times to a log file. Install and configure the Amazon CloudWatch agent on the EC2 instances to stream the application logs to CloudWatch Logs. Create a metric filter for response time from the logs. View a graph of the metrics in the CloudWatch console. Create a CloudWatch alarm to send an Amazon Simple Notification Service (Amazon SNS) notification when the average of the response time metric exceeds the threshold."
    ],
    correctAnswer: 3,
    category: "Monitoring",
    explanation: "You can configure the Amazon CloudWatch agent to stream logs and metrics to CloudWatch. You can also create metric filters from logs stored in CloudWatch Logs. Metric filters allow you to search log data for specific patterns and convert them into CloudWatch metrics. You can then configure CloudWatch alarms to receive notifications when a metric exceeds a threshold. This is the standard and efficient approach for monitoring performance across an EC2 fleet.",
    optionExplanations: [
      "Incorrect: Using S3 and OpenSearch Service is overly complex and excessive for meeting these requirements. Using CloudWatch is simpler and more efficient.",
      "Incorrect: Amazon Inspector is a security assessment service and is not used for monitoring application performance.",
      "Incorrect: SSM Agent is primarily used for system management and is not optimal for monitoring application performance. QuickSight is a business intelligence tool and is not suitable for real-time monitoring.",
      "Correct: Using the CloudWatch agent, metric filters, and CloudWatch alarms allows performance to be monitored efficiently and notifications to be received."
    ]
  },
  {
    id: "dva-056",
    question: "A developer tested an application locally and deployed it to an AWS Lambda function. To avoid exceeding the deployment package size quota, the developer did not include dependencies in the deployment file. When the developer tests the application remotely, the Lambda function does not run because of missing dependencies.\n\nWhich solution resolves this issue?",
    options: [
      "Use the Lambda console editor to update the code and include the missing dependencies.",
      "Create an additional .zip file that contains the missing dependencies. Include the .zip file in the original Lambda deployment package.",
      "Create a layer that contains the missing dependencies. Attach the layer to the Lambda function.",
      "Add a reference to the missing dependencies in the Lambda function's environment variables."
    ],
    correctAnswer: 2,
    category: "Deployment",
    explanation: "You can configure an AWS Lambda function to pull in additional code and content in the form of layers. A layer is a .zip file archive that can contain libraries, a custom runtime, or other dependencies. Using layers allows Lambda functions to use libraries without including them in the deployment package. This keeps the deployment package small and allows the same dependencies to be shared across multiple functions. Up to five layers can be attached to a function, and each layer can be up to 50 MB.",
    optionExplanations: [
      "Incorrect: The console editor has limitations and is not suitable for adding large dependencies. It also does not resolve the deployment package size issue.",
      "Incorrect: Including dependencies in the deployment package increases its size and may cause it to exceed the quota.",
      "Correct: Using a Lambda layer allows dependencies to be managed separately and keeps the deployment package small.",
      "Incorrect: Environment variables are for storing configuration values and cannot contain dependency code."
    ]
  },
  {
    id: "dva-057",
    question: "A company uses Amazon API Gateway for a REST API in one AWS account. A developer wants to grant access to the API only to IAM users from a different AWS account.\n\nWhich combination of steps should the developer take to meet these requirements? (Choose TWO.)",
    options: [
      undefined,
      "Create an Amazon Cognito user pool. Add each IAM user to the user pool. Set the API method authorization type to COGNITO_USER_POOLS. Authenticate using IAM credentials in Amazon Cognito. Add the ID token to the request header.",
      "Create an Amazon Cognito identity pool. Add each IAM user to the identity pool. Set the API method authorization type to COGNITO_USER_POOLS. Authenticate using IAM credentials in Amazon Cognito. Add the access token to the request header.",
      "Create a resource policy for the API that grants access only to each IAM user.",
      "Create an Amazon Cognito authorizer for the API to grant access only to each IAM user. Set the API method authorization type to COGNITO_USER_POOLS."
    ],
    correctAnswer: 0,
    category: "Security",
    explanation: "A resource policy can grant API access in one AWS account to users in a different AWS account using the Signature Version 4 (SigV4) protocol. By attaching an IAM permission policy to each IAM user and setting the API method authorization type to AWS_IAM, cross-account access can be achieved. A resource policy on the API can also be used to allow access only to IAM users from a specific AWS account. Combining both approaches achieves secure cross-account API access.",
    optionExplanations: [
      undefined,
      "Incorrect: Cognito user pools are used to authenticate application users, not IAM users.",
      "Incorrect: Cognito identity pools are used incorrectly here; IAM users cannot be directly added to an identity pool in this way.",
      "Correct: A resource policy can be used to grant API access only to IAM users from a specific AWS account.",
      "Incorrect: Cognito authorizers are used to authenticate Cognito user pool users, not IAM users."
    ]
  },
  {
    id: "dva-058",
    question: "A developer is building a CI/CD pipeline using AWS CodePipeline. The pipeline retrieves source code from AWS CodeCommit, builds it with AWS CodeBuild, and deploys it to Amazon EC2 instances using AWS CodeDeploy. The developer wants to add a manual approval step before deploying to the production environment.\n\nWhat should the developer do to meet this requirement?",
    options: [
      "Create an AWS Step Functions state machine to manage the approval workflow. Invoke Step Functions from CodePipeline.",
      "Create an AWS Lambda function to check for approval before deployment. Add the Lambda function as a custom action in CodePipeline.",
      "Add a manual approval action to CodePipeline. Create an Amazon SNS topic and configure it to send notifications to approvers.",
      "Create an Amazon EventBridge rule to monitor deployment events. Pause the deployment when approval is required."
    ],
    correctAnswer: 2,
    category: "Deployment",
    explanation: "AWS CodePipeline natively supports manual approval actions. When a manual approval action is added to a pipeline, the pipeline execution pauses at that stage and waits until an approver approves or rejects it. By configuring an Amazon SNS topic, approvers can be automatically notified when approval is needed. Approvers can approve or reject using the CodePipeline console or API. This approach is simple and efficient, requiring no additional services or custom code.",
    optionExplanations: [
      "Incorrect: Using Step Functions is possible but is excessive for a simple approval workflow. CodePipeline's built-in feature is sufficient.",
      "Incorrect: Using a Lambda function is possible but CodePipeline's built-in manual approval feature is simpler and more efficient.",
      "Correct: Using CodePipeline's manual approval action with SNS notifications allows the approval workflow to be implemented simply.",
      "Incorrect: EventBridge is used for event-driven architectures and is not suitable for a manual approval workflow."
    ]
  },
  {
    id: "dva-059",
    question: "A developer is building a serverless application that uses an Amazon DynamoDB table. The application must handle high traffic, and read operations will significantly outnumber write operations. The developer wants to ensure consistent performance while optimizing costs.\n\nWhich DynamoDB feature should the developer use to meet these requirements?",
    options: [
      "Use DynamoDB on-demand capacity mode.",
      "Use DynamoDB provisioned capacity mode with Auto Scaling enabled.",
      "Use DynamoDB Accelerator (DAX) to improve read performance.",
      "Create a DynamoDB Global Secondary Index (GSI) to improve read performance."
    ],
    correctAnswer: 2,
    category: "Database",
    explanation: "Amazon DynamoDB Accelerator (DAX) is a fully managed in-memory cache for DynamoDB. DAX provides microsecond response times for read-intensive workloads. Using DAX allows read performance on DynamoDB tables to be significantly improved without changing application code. By caching frequently accessed data, DAX reduces read requests to DynamoDB and optimizes costs. When read operations significantly outnumber write operations, DAX is the optimal solution.",
    optionExplanations: [
      "Incorrect: On-demand mode is suitable for unpredictable workloads but does not specifically improve read performance.",
      "Incorrect: Provisioned mode with Auto Scaling helps with capacity management but does not significantly improve read performance.",
      "Correct: DAX is optimal for read-intensive workloads, providing microsecond response times and optimizing costs.",
      "Incorrect: GSIs are used to optimize query patterns but do not significantly improve read performance on their own."
    ]
  },
  {
    id: "dva-060",
    question: "A developer is tracing a microservices application using AWS X-Ray. The application consists of multiple AWS Lambda functions and Amazon API Gateway. The developer notices that a particular Lambda function has a long execution time and wants to analyze the performance of specific code segments within that function in detail.\n\nWhat should the developer do to meet this requirement?",
    options: [
      "Increase the memory size of the Lambda function to improve performance.",
      "Use the X-Ray SDK to create custom subsegments inside the Lambda function.",
      "Use CloudWatch Logs to record the execution time of the Lambda function.",
      "Use AWS CloudTrail to track Lambda function invocations."
    ],
    correctAnswer: 1,
    category: "Monitoring",
    explanation: "Using the AWS X-Ray SDK allows custom subsegments to be created inside a Lambda function. Subsegments enable detailed analysis of the performance of specific code segments within the function, such as database queries, external API calls, or particular processing logic. Each subsegment includes information such as start time, end time, metadata, and annotations. By viewing the service map and traces in the X-Ray console, you can identify which code segments are bottlenecks and optimize them.",
    optionExplanations: [
      "Incorrect: Increasing memory size may improve performance in some cases, but it does not help with detailed analysis of specific code segments.",
      "Correct: Using custom subsegments with the X-Ray SDK allows detailed performance analysis of specific code segments inside the function.",
      "Incorrect: CloudWatch Logs can record execution times, but it does not provide the detailed trace information or visualization that X-Ray offers.",
      "Incorrect: CloudTrail is a service for recording API calls and is not used for application performance analysis."
    ]
  },
  {
    id: "dva-061",  // eslint-disable-line
    question: "A developer is writing code to access Amazon DynamoDB from an AWS Lambda function. What is the best practice for granting the Lambda function access to DynamoDB without hardcoding AWS access keys and secret keys in the function code?",
    options: [
      "Set the access key and secret key as environment variables on the Lambda function.",
      "Attach an execution role (IAM role) to the Lambda function and grant it access to DynamoDB.",
      "Hardcode the access key and secret key in the Lambda function code.",
      "Store the access key in AWS Secrets Manager and retrieve it when the Lambda function starts."
    ],
    correctAnswer: 1,
    category: "Security",
    explanation: "Attaching an IAM execution role to an AWS Lambda function is the best practice for granting access to AWS resources. When the Lambda function runs, temporary credentials are automatically obtained through AWS STS, allowing the code to access DynamoDB using the AWS SDK. Hardcoding access keys or storing them in environment variables poses a security risk and should be avoided.",
    optionExplanations: [
      "Incorrect: Storing access keys in environment variables is an improvement over hardcoding, but using an IAM role is more secure. Roles automatically rotate temporary credentials.",
      "Correct: Attaching an IAM execution role to Lambda is the most secure best practice. Temporary credentials are managed automatically, and there is no need to manage long-term access keys.",
      "Incorrect: Hardcoding in the code is the most dangerous approach. Credentials are exposed if the source code is leaked.",
      "Incorrect: Using Secrets Manager is a valid approach, but when an IAM role is available, using an IAM role is simpler and recommended."
    ]
  },
  {
    id: "dva-062",
    question: "A developer is building an application that processes messages from an Amazon SQS queue. When message processing fails, the developer wants to move the message to a separate queue for later investigation.\n\nHow should the developer configure this to meet this requirement?",
    options: [
      "Manually forward the message to another queue using error handling in the Lambda function.",
      "Configure a dead-letter queue (DLQ) on the SQS queue to automatically transfer messages that exceed the maximum receive count.",
      "Use CloudWatch Alarms to detect failed messages and move them to another queue.",
      "Use the SQS message timer to delay failed messages."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "The Amazon SQS dead-letter queue (DLQ) is a feature that automatically moves messages that could not be processed successfully to a separate queue. By setting a maximum receive count (maxReceiveCount) on the source queue, messages that fail processing more than that number of times are automatically transferred to the DLQ. By investigating and reprocessing messages accumulated in the DLQ, you can prevent message loss and identify the root cause of issues.",
    optionExplanations: [
      "Incorrect: Manual forwarding adds complexity and mixes error handling logic into the code. Using a DLQ is simpler and more reliable.",
      "Correct: A DLQ is a native SQS feature that makes it easy to implement automatic transfer and storage of failed messages.",
      "Incorrect: CloudWatch Alarms are used for monitoring metrics and do not have a message forwarding capability.",
      "Incorrect: A message timer delays delivery and is not a feature for moving failed messages to another queue."
    ]
  },
  {
    id: "dva-063",
    question: "A developer is deploying a web application using AWS Elastic Beanstalk. When deploying a new version, the developer wants to keep the application running during deployment by updating a subset of instances at a time, rather than updating all instances to the new version at once before removing the old version.\n\nWhich deployment policy best suits this requirement?",
    options: [
      "All at once",
      "Rolling",
      "Immutable",
      "Blue/Green"
    ],
    correctAnswer: 1,
    category: "Deployment",
    explanation: "The Elastic Beanstalk Rolling deployment policy updates instances in batches one at a time. While instances in each batch are being updated to the new version, the remaining instances continue to run the old version, minimizing application downtime during deployment. All at once updates all instances simultaneously and causes downtime. Immutable creates a new set of instances, and Blue/Green prepares a separate environment and switches traffic.",
    optionExplanations: [
      "Incorrect: All at once updates all instances simultaneously, causing downtime during deployment.",
      "Correct: Rolling deployment updates a subset of instances at a time in sequence, so the application keeps running during deployment.",
      "Incorrect: Immutable creates a separate new set of instances before switching, which is safer but incurs higher resource costs.",
      "Incorrect: Blue/Green prepares a completely separate environment and switches at the DNS level — the safest approach but the most costly."
    ]
  },
  {
    id: "dva-064",
    question: "A developer is building a REST API using Amazon API Gateway and AWS Lambda. To reduce API response time, the developer wants to cache responses for frequently accessed requests with the same parameters.\n\nWhich feature should the developer use to meet this requirement?",
    options: [
      "Use Amazon ElastiCache inside the Lambda function to cache responses.",
      "Enable caching at the API Gateway stage and configure a TTL.",
      "Place a CloudFront distribution in front of API Gateway to cache responses.",
      "Increase the reserved concurrency of the Lambda function to improve response time."
    ],
    correctAnswer: 1,
    category: "Development",
    explanation: "Amazon API Gateway has a native feature for caching API responses. By enabling caching at the stage level and setting a TTL (Time To Live), cached responses can be returned for identical requests without invoking Lambda. This reduces the number of backend calls, simultaneously decreasing response time and lowering costs.",
    optionExplanations: [
      "Incorrect: ElastiCache is effective for application-level caching, but API Gateway's native caching feature is simpler to implement.",
      "Correct: Using API Gateway's caching feature allows cached responses to be returned without invoking Lambda.",
      "Incorrect: CloudFront is also an effective caching option, but API Gateway's native caching is a more direct solution.",
      "Incorrect: Reserved concurrency helps mitigate cold starts but is different from reducing response time through caching."
    ]
  },
  {
    id: "dva-065",
    question: "A developer is managing infrastructure as code using AWS CloudFormation. The developer wants to protect a specific resource (an Amazon RDS instance) from being accidentally deleted during a stack update.\n\nHow should the developer configure this to meet this requirement?",
    options: [
      "Set DeletionPolicy: Retain on the RDS resource in the CloudFormation template.",
      "Apply an IAM policy to the RDS instance to prohibit deletion.",
      "Configure a stack policy on the CloudFormation stack to deny updates and deletions of specific resources.",
      "Enable automatic backups on the RDS instance."
    ],
    correctAnswer: 2,
    category: "Deployment",
    explanation: "A CloudFormation stack policy is a JSON document that prevents unintended changes to specific resources during stack update operations. By setting a Deny action in the stack policy, you can prohibit updates, replacements, and deletions of specified resources. DeletionPolicy: Retain preserves a resource when the stack is deleted, but a stack policy is the appropriate mechanism for protection during stack updates.",
    optionExplanations: [
      "Incorrect: DeletionPolicy: Retain preserves the resource when the entire stack is deleted, but it does not prevent resource changes during a stack update.",
      "Incorrect: IAM policies are used for access control on users and roles, but a stack policy is appropriate for controlling CloudFormation update operations.",
      "Correct: Using a stack policy allows updates and deletions of specific resources to be denied during stack updates.",
      "Incorrect: Automatic backups are effective for data protection but do not prevent resource deletion by CloudFormation."
    ]
  },
  {
    id: "dva-066",
    question: "A developer is designing an Amazon DynamoDB table. The application needs to retrieve order data associated with a specific user ID in order of newest order date. The developer also wants to efficiently filter only orders within a specific time period.\n\nWhich table design most efficiently meets these requirements?",
    options: [
      "Set the user ID as the partition key and the order date as the sort key, and retrieve data using the Query API.",
      "Set the order ID as the partition key and filter by user ID and date using the Scan API.",
      "Set the user ID as the partition key only, and sort the results on the application side after retrieval.",
      "Set the order date as the partition key and the user ID as the sort key."
    ],
    correctAnswer: 0,
    category: "Database",
    explanation: "In DynamoDB, the partition key efficiently localizes data for a specific user, and the sort key allows range queries (such as between and begins_with). By designing the table with the user ID as the partition key and the order date as the sort key, the Query API can be used to retrieve a specific user's orders in date order, and KeyConditionExpression can efficiently specify a time range. The Scan API performs a full-table scan and is inefficient.",
    optionExplanations: [
      "Correct: The partition key (user ID) localizes data, and the sort key (order date) enables range filtering and ordering during Query operations.",
      "Incorrect: The Scan API scans the entire table, which becomes inefficient and costly as data volume grows.",
      "Incorrect: Sorting on the application side requires retrieving all items, which becomes increasingly inefficient as the table grows.",
      "Incorrect: Using the order date as the partition key creates a hot partition problem and makes retrieving all orders for a specific user inefficient."
    ]
  },
  {
    id: "dva-067",
    question: "A developer wants to reduce the cold start time of an AWS Lambda function. The Lambda function is implemented in Java and takes a long time on its first invocation.\n\nWhich best practices are appropriate for mitigating cold starts? (Choose TWO.)",
    options: [
      "Increase the memory size of the Lambda function.",
      "Enable Lambda SnapStart (Java 11 and later).",
      "Increase the timeout value of the Lambda function.",
      "Minimize the Lambda function's code size and remove unnecessary dependency libraries.",
      "Place the Lambda function inside a VPC."
    ],
    correctAnswer: 3,
    category: "Compute",
    explanation: "Two main approaches are effective for mitigating Java cold starts. First, Lambda SnapStart (supported for Java 11 and later) significantly reduces cold start time by launching the function from a pre-initialized snapshot. Second, minimizing the deployment package size reduces class loading time. Removing unnecessary dependency libraries and leveraging Lambda Layers shortens initialization time. Increasing memory also proportionally increases CPU and processing speed, but it is not the highest-priority fundamental solution for cold start mitigation.",
    optionExplanations: [
      "Incorrect: Increasing memory size proportionally increases CPU and processing speed, but it is not a fundamental solution to cold starts.",
      "Correct: Lambda SnapStart significantly reduces cold start time by reusing a Java initialization snapshot.",
      "Incorrect: Increasing the timeout value has no effect on reducing cold start time.",
      "Correct: Reducing the deployment package size decreases the time required for class loading and JVM startup.",
      "Incorrect: Placing the function inside a VPC adds network initialization overhead and may actually worsen cold starts."
    ]
  },
  {
    id: "dva-068",
    question: "A developer is building an application that processes real-time clickstream data using Amazon Kinesis Data Streams. A processing error occurs in the application, and the developer wants to reprocess specific records.\n\nWhich characteristic of Kinesis Data Streams enables reprocessing?",
    options: [
      "Kinesis records are automatically deleted after processing, so reprocessing is not possible.",
      "Kinesis records are retained for 24 hours by default (up to 365 days), so they can be re-read using a shard iterator.",
      "Kinesis records are moved to a dead-letter queue after processing, from which they can be reprocessed.",
      "Kinesis records are automatically backed up to S3 after processing, so they can be reprocessed from S3."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "Amazon Kinesis Data Streams retains records for 24 hours by default (up to 365 days with extended retention), so even records that have already been processed by a consumer can be re-read as long as they are within the retention period. By using shard iterator types such as AT_TIMESTAMP (from a specific time) or AT_SEQUENCE_NUMBER (from a specific sequence number), records can be re-read from any position for reprocessing. This is one of the key differences from SQS.",
    optionExplanations: [
      "Incorrect: Kinesis records are not deleted when a consumer processes them; they can be read any number of times within the retention period.",
      "Correct: Because Kinesis does not delete records during the retention period, they can be re-read from any position using a shard iterator.",
      "Incorrect: Kinesis does not have a dead-letter queue feature like SQS.",
      "Incorrect: Kinesis does not automatically back up records to S3. Kinesis Data Firehose can be used to deliver records to S3 separately."
    ]
  },
  {
    id: "dva-069",
    question: "A developer is building a CI/CD pipeline using AWS CodePipeline. Source code is stored in AWS CodeCommit, AWS CodeBuild is used for testing, and AWS CodeDeploy is used for deployment. What is the correct behavior when a test fails in the CodeBuild build stage?",
    options: [
      "The pipeline continues even if the test fails, and the deploy stage is executed.",
      "When a test fails, that stage fails and the pipeline stops without executing subsequent deploy stages.",
      "When a test fails, a retry is automatically attempted 3 times, and the pipeline stops only if all retries fail.",
      "When a test fails, only an SNS notification is sent and the deploy stage runs as normal."
    ],
    correctAnswer: 1,
    category: "Deployment",
    explanation: "In AWS CodePipeline, when a stage fails, the pipeline execution stops at that stage and subsequent stages are not executed. If a failure occurs in the CodeBuild build and test stage, the CodeDeploy deployment stage is not executed. This prevents code that failed testing from being deployed to the production environment. The pipeline status becomes Failed, and the failure can be detected via CloudWatch events or SNS notifications.",
    optionExplanations: [
      "Incorrect: CodePipeline does not execute subsequent stages when a stage fails. This is an important characteristic of CI/CD.",
      "Correct: A stage failure stops the pipeline and automatically prevents code that did not pass testing from being deployed.",
      "Incorrect: By default, CodePipeline does not automatically retry on stage failure (manual retry is possible).",
      "Incorrect: When a test fails, the deploy stage is never executed."
    ]
  },
  {
    id: "dva-070",
    question: "A developer is troubleshooting a performance issue with an application running on Amazon EC2 instances. The application intermittently experiences slow response times, but CPU and memory utilization shown in CloudWatch are within normal ranges. The developer wants to analyze the application's internal processing flow in detail to identify the root cause of the problem.\n\nWhich AWS service is best suited for this purpose?",
    options: [
      "Use Amazon CloudWatch Logs Insights to analyze logs.",
      "Use AWS X-Ray to collect and analyze application traces.",
      "Use AWS CloudTrail to analyze API calls.",
      "Use Amazon Inspector to assess application vulnerabilities."
    ],
    correctAnswer: 1,
    category: "Troubleshooting",
    explanation: "AWS X-Ray is a service for tracing the internal processing flow of an application. By integrating the X-Ray SDK into the application, the execution time of each component (such as database queries, external API calls, and internal service calls) as the request is processed is recorded as segments and subsegments. Bottlenecks can be visually identified in the service map, making it ideal for identifying the cause of intermittent response delays. It can identify internal application problems that are difficult to see with CloudWatch Metrics or Logs alone.",
    optionExplanations: [
      "Incorrect: CloudWatch Logs Insights is effective for searching and analyzing logs, but X-Ray is more appropriate for tracing the internal processing flow of an application.",
      "Correct: X-Ray traces the execution time of each processing step in an application and is best for identifying the root cause of intermittent performance issues.",
      "Incorrect: CloudTrail is a service for recording calls to AWS APIs and is not used for analyzing internal application performance.",
      "Incorrect: Amazon Inspector is used for assessing security vulnerabilities and is not used for troubleshooting performance issues."
    ]
  },
  {
    id: "dva-071",
    question: "A developer is building a serverless application using AWS SAM (Serverless Application Model). Which command should the developer use to test the Lambda function locally?",
    options: [
      "sam build",
      "sam local invoke",
      "sam deploy",
      "sam validate"
    ],
    correctAnswer: 1,
    category: "Development",
    explanation: "The `sam local invoke` command from the AWS SAM CLI allows you to run and test Lambda functions locally. It uses Docker to emulate the Lambda runtime environment and lets you pass event data to verify function behavior. `sam build` builds the deployment package, `sam deploy` deploys to AWS, and `sam validate` checks the template syntax.",
    optionExplanations: [
      "Incorrect: `sam build` is used to build the deployment package and is not used for local testing.",
      "Correct: `sam local invoke` is the command for running and testing Lambda functions in a local environment.",
      "Incorrect: `sam deploy` deploys a built application to AWS.",
      "Incorrect: `sam validate` performs a syntax check on the SAM template."
    ]
  },
  {
    id: "dva-072",
    question: "A developer is working on an application that uses Amazon DynamoDB and needs to handle a read-heavy workload. The developer wants to improve read throughput on the DynamoDB table and reduce costs.\n\nWhich service should the developer use to meet this requirement?",
    options: [
      "Place Amazon ElastiCache for Redis in front of DynamoDB for caching.",
      "Place Amazon DynamoDB Accelerator (DAX) in front of DynamoDB.",
      "Increase the provisioned capacity of DynamoDB.",
      "Use DynamoDB global tables to create read replicas."
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "Amazon DynamoDB Accelerator (DAX) is an in-memory cache service purpose-built for DynamoDB. Because DAX is fully compatible with the DynamoDB API, you can improve read performance to microseconds with minimal code changes. ElastiCache is also effective but requires implementing caching logic in the application. DAX integrates seamlessly with DynamoDB and is the optimal choice for a DynamoDB-specific cache.",
    optionExplanations: [
      "Incorrect: ElastiCache can be used as a front-end cache for DynamoDB, but it requires implementing caching logic in the application code and is more complex than DAX.",
      "Correct: DAX is compatible with the DynamoDB API and improves read performance to microsecond-level with minimal code changes.",
      "Incorrect: Increasing capacity improves throughput but does not reduce costs.",
      "Incorrect: Global tables are for multi-region replication and are not suitable for read caching within a single region."
    ]
  },
  {
    id: "dva-073",
    question: "A developer needs to temporarily grant access to objects stored in an Amazon S3 bucket. The developer wants unauthenticated external users to download a specific object for a limited time.\n\nWhich feature should the developer use to meet this requirement?",
    options: [
      "Set the S3 bucket ACL to public to expose the object.",
      "Allow access with IP address restrictions via an S3 bucket policy.",
      "Generate an S3 Presigned URL and provide it to the external user.",
      "Configure Amazon CloudFront with an OAI (Origin Access Identity)."
    ],
    correctAnswer: 2,
    category: "Security",
    explanation: "Amazon S3 Presigned URLs provide temporary access to a specific object. The URL includes an expiration time, allowing access without authentication as long as the URL is valid. They can be generated using the AWS SDK, with the expiration specified in seconds. This approach does not require making the entire bucket public and follows the principle of least privilege.",
    optionExplanations: [
      "Incorrect: Setting the bucket ACL to public permanently exposes all objects, creating a security risk.",
      "Incorrect: IP address restrictions are not suitable for granting temporary access to specific users and add management complexity.",
      "Correct: A Presigned URL provides time-limited temporary access and allows secure sharing of a specific object.",
      "Incorrect: CloudFront OAI is used to control access through CloudFront and is not appropriate for granting temporary direct access to external users."
    ]
  },
  {
    id: "dva-074",
    question: "A developer is building an application that uses AWS Lambda functions to process data. The Lambda functions need to share a common business logic library across multiple functions. The developer wants to minimize the deployment package size of each Lambda function.\n\nWhich feature should the developer use to meet this requirement?",
    options: [
      "Create a base image containing the common library and use it for all Lambda functions.",
      "Use AWS Lambda Layers to package the common library separately and share it.",
      "Store the common library in Amazon S3 and download it at Lambda startup.",
      "Include the common library in each Lambda function's deployment package."
    ],
    correctAnswer: 1,
    category: "Development",
    explanation: "AWS Lambda Layers provide a mechanism to share common code, libraries, and configuration across Lambda functions. By packaging and registering the common library as a Layer once, multiple Lambda functions can reference it. This eliminates the need to include the library in each function's deployment package, significantly reducing package size. Up to 5 layers can be attached to a function, and versioning is supported.",
    optionExplanations: [
      "Incorrect: Using a container image is also valid, but Lambda Layers are simpler for sharing code with existing zip deployments.",
      "Correct: Lambda Layers allow sharing a common library without bundling it into each function's package, reducing deployment package size.",
      "Incorrect: Downloading from S3 at startup is complex to implement and increases cold start time.",
      "Incorrect: Including the same library in every function increases package size and requires redeploying all functions when the library is updated."
    ]
  },
  {
    id: "dva-075",
    question: "A developer wants to allow requests to Amazon API Gateway only from specific IP addresses and block all other requests.\n\nHow should the developer configure this requirement?",
    options: [
      "Configure IP address-based allow rules in the API Gateway resource policy.",
      "Use a Lambda authorizer to validate the IP address of the request.",
      "Attach a WAF web ACL to the API Gateway stage and configure an IP set rule.",
      "Configure a usage plan and API key on the API Gateway method."
    ],
    correctAnswer: 2,
    category: "Security",
    explanation: "By attaching AWS WAF (Web Application Firewall) to an API Gateway stage and configuring an IP set rule, you can allow or block requests from specific IP addresses. WAF excels at managing IP address allow lists and block lists and supports control at the CIDR block level. While IP restriction is also possible with resource policies, WAF provides more flexible rule management and detailed logging.",
    optionExplanations: [
      "Incorrect: IP restriction via a resource policy is possible, but WAF offers more flexible rule management, rate limiting, and logging.",
      "Incorrect: Lambda authorizers are used to implement custom authentication logic; WAF is more appropriate for IP-based restrictions.",
      "Correct: WAF IP set rules allow you to efficiently allow or block requests from specific IP addresses.",
      "Incorrect: Usage plans and API keys are used for API usage throttling and authentication, not for IP address-based access control."
    ]
  },
  {
    id: "dva-076",
    question: "A developer is implementing an order processing workflow using AWS Step Functions. One step in the workflow calls an external API, and the developer wants to automatically retry on transient errors (such as timeouts or 503 errors).\n\nWhich field is used to configure retries in Step Functions?",
    options: [
      "Use the ErrorEquals and RetryPolicy fields in the state machine definition.",
      "Add a Retry field to the state definition and specify ErrorEquals and MaxAttempts.",
      "Use try-catch in the Lambda function to re-invoke itself on error.",
      "Use CloudWatch Events to periodically re-run failed workflows."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "In AWS Step Functions, you can configure automatic retries by adding a `Retry` field to a state definition. Use `ErrorEquals` to specify the target error types, `MaxAttempts` for the number of retries, `IntervalSeconds` for the initial wait time, and `BackoffRate` for the backoff multiplier. This allows declarative configuration of retries with exponential backoff for transient errors, without needing to implement retry logic in the Lambda function.",
    optionExplanations: [
      "Incorrect: There is no field called `RetryPolicy`. The correct field to use is `Retry`.",
      "Correct: By configuring the `Retry` field with `ErrorEquals`, `MaxAttempts`, and other properties, automatic retries can be implemented declaratively.",
      "Incorrect: Implementing retries inside the Lambda function is possible, but using Step Functions' retry feature is easier to manage at the workflow level.",
      "Incorrect: Periodic re-runs via CloudWatch Events are scheduled executions, not immediate retries on error."
    ]
  },
  {
    id: "dva-077",
    question: "A developer wants to send application logs from an Amazon EC2 instance to Amazon CloudWatch Logs.\n\nHow should the developer configure this?",
    options: [
      "Modify the application code to call the CloudWatch Logs API directly.",
      "Install and configure the CloudWatch Logs agent (CloudWatch Agent or the legacy awslogs agent) on the EC2 instance.",
      "Enable CloudTrail to automatically collect application logs.",
      "Use Amazon Kinesis Data Firehose to forward logs to CloudWatch Logs."
    ],
    correctAnswer: 1,
    category: "Monitoring",
    explanation: "The standard approach to sending application logs from an EC2 instance to CloudWatch Logs is to install and configure the CloudWatch Agent on the instance. In the agent configuration file, specify the log file paths, log group names, and log stream names to collect. The instance requires an IAM role with write permissions to CloudWatch Logs. Any log file can be collected without modifying the application code.",
    optionExplanations: [
      "Incorrect: Calling the API directly is possible but requires modifying the application code; using the CloudWatch Agent is more versatile.",
      "Correct: The CloudWatch Agent can collect log files and send them to CloudWatch Logs without any application changes.",
      "Incorrect: CloudTrail is used to record AWS API calls and is not used for collecting application logs.",
      "Incorrect: Kinesis Data Firehose delivers streaming data to destinations such as S3 and Redshift; the CloudWatch Agent is the appropriate solution for collecting EC2 logs."
    ]
  },
  {
    id: "dva-078",
    question: "A developer wants to grant users authenticated through an Amazon Cognito User Pool direct access to AWS resources (such as an S3 bucket).\n\nWhich service should the developer use to meet this requirement?",
    options: [
      "Directly attach an IAM role to an Amazon Cognito User Pool group.",
      "Use Amazon Cognito Identity Pool (Federated Identities) to issue temporary AWS credentials to authenticated users.",
      "Create an IAM user for each user and grant access to AWS resources.",
      "Proxy all AWS resource access through API Gateway."
    ],
    correctAnswer: 1,
    category: "Security",
    explanation: "By using Amazon Cognito Identity Pool (Federated Identities), you can issue temporary AWS credentials (via an IAM role) to users authenticated through a Cognito User Pool. Users can use these temporary credentials to directly access AWS resources such as S3 and DynamoDB. Creating an IAM user for every user becomes unmanageable as the user base grows and should be avoided.",
    optionExplanations: [
      "Incorrect: IAM roles linked to Cognito User Pool groups are used in combination with an Identity Pool; an Identity Pool is required to grant direct AWS resource access.",
      "Correct: Using a Cognito Identity Pool allows temporary AWS credentials to be securely issued to authenticated users.",
      "Incorrect: Creating an IAM user per user lacks scalability and goes against AWS best practices.",
      "Incorrect: Proxying through API Gateway is a valid architecture, but an Identity Pool is the appropriate solution when direct client access to AWS resources is required."
    ]
  },
  {
    id: "dva-079",
    question: "A developer is automating application deployments to Amazon EC2 instances using AWS CodeDeploy. When an error is detected after deploying a new version, the developer wants to quickly revert to the previous version.\n\nWhich CodeDeploy feature meets this requirement?",
    options: [
      "Manually run a new deployment using the previous application revision.",
      "Use CodeDeploy's rollback feature to automatically revert to the previous version on deployment failure or when a specified CloudWatch alarm threshold is breached.",
      "Launch a new instance from an EC2 instance AMI snapshot to replace it.",
      "Migrate to AWS Elastic Beanstalk and use its built-in rollback feature."
    ],
    correctAnswer: 1,
    category: "Deployment",
    explanation: "AWS CodeDeploy has an automatic rollback feature. You can enable automatic rollback in the deployment group settings and configure triggers such as 'deployment failure' or 'a specified CloudWatch alarm threshold is breached'. When automatic rollback is triggered, CodeDeploy redeploys the last successful revision to revert to the previous version, automating the recovery from error detection.",
    optionExplanations: [
      "Incorrect: Manual redeployment is possible, but using the automatic rollback feature is faster and more reliable.",
      "Correct: Configuring CodeDeploy's automatic rollback feature allows automatic reversion to the previous version on deployment failure or alarm trigger.",
      "Incorrect: Launching an instance from an AMI snapshot is independent of CodeDeploy and is not appropriate for rollback.",
      "Incorrect: Migrating to Elastic Beanstalk requires significant changes; CodeDeploy's automatic rollback feature can satisfy the requirement."
    ]
  },
  {
    id: "dva-080",
    question: "A developer is building an application that sends and receives messages using Amazon SQS. After a consumer receives and starts processing a message, the developer wants to prevent other consumers from processing the same message. The message will be deleted once processing is complete.\n\nWhich SQS feature enables this behavior?",
    options: [
      "Use an SQS FIFO queue to prevent duplicate message delivery.",
      "Configure an appropriate SQS Visibility Timeout.",
      "Set a short message retention period for the SQS queue.",
      "Use SQS long polling to receive messages efficiently."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "The SQS Visibility Timeout hides a message from other consumers from the moment a consumer receives it until processing is complete and the message is deleted. If the receiving consumer completes processing and deletes the message within the timeout, no other consumer will process the same message. If processing fails and the timeout expires, the message becomes visible again and can be processed by another consumer.",
    optionExplanations: [
      "Incorrect: FIFO queues are used for message ordering and deduplication; the feature that hides a message from other consumers during processing is Visibility Timeout.",
      "Correct: Setting the Visibility Timeout longer than the processing time prevents a message being processed from being visible to other consumers.",
      "Incorrect: Message retention period is the maximum time a message is kept in the queue and is unrelated to preventing concurrent processing.",
      "Incorrect: Long polling is a feature for efficient message retrieval and is unrelated to preventing concurrent processing."
    ]
  },
  {
    id: "dva-081",
    question: "A developer has placed an AWS Lambda function inside an Amazon VPC. The Lambda function needs to call an external API on the internet but is unable to connect.\n\nHow should the developer configure this to resolve the issue?",
    options: [
      "Increase the Lambda function's timeout value.",
      "Assign an Elastic IP address to the Lambda function.",
      "Create a NAT gateway in the VPC and place the Lambda function in a private subnet.",
      "Increase the Lambda function's memory size."
    ],
    correctAnswer: 2,
    category: "Troubleshooting",
    explanation: "A Lambda function placed inside a VPC requires a NAT gateway (or NAT instance) to access the internet. Place the Lambda function in a private subnet and configure the subnet's route table to direct internet-bound traffic to the NAT gateway, which is placed in a public subnet. An Elastic IP cannot be directly assigned to a Lambda function.",
    optionExplanations: [
      "Incorrect: Changing the timeout value does not resolve network connectivity issues.",
      "Incorrect: An Elastic IP cannot be directly assigned to a Lambda function.",
      "Correct: A Lambda function inside a VPC requires routing through a NAT gateway to access the internet.",
      "Incorrect: Changing the memory size does not resolve network connectivity issues."
    ]
  },
  {
    id: "dva-082",
    question: "A developer is implementing write operations to an Amazon DynamoDB table. When writing an item with multiple attributes, the developer wants the write to succeed only if a specified condition is met (for example, create a new item only if an item with the same partition key does not exist).\n\nWhich DynamoDB feature should the developer use to meet this requirement?",
    options: [
      "Use TransactWriteItems to write within a transaction.",
      "Specify a ConditionExpression in the PutItem API to perform a conditional write.",
      "Use BatchWriteItem to write multiple items in bulk.",
      "Use UpdateItem to update only existing items."
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "DynamoDB's ConditionExpression adds a condition to PutItem, UpdateItem, and DeleteItem operations. By specifying a condition such as `attribute_not_exists(pk)`, the write is executed only if no item with that partition key exists. If the condition is not met, a ConditionalCheckFailedException is thrown. This also enables the optimistic locking pattern to prevent race conditions.",
    optionExplanations: [
      "Incorrect: TransactWriteItems is used for ACID transactions across multiple tables, but ConditionExpression is more appropriate for a simple conditional write.",
      "Correct: Using ConditionExpression allows you to execute a write only when a specified condition is satisfied.",
      "Incorrect: BatchWriteItem is used for bulk writes of multiple items but does not support conditional writes.",
      "Incorrect: UpdateItem is used to update existing items; PutItem with a ConditionExpression is appropriate for duplicate checks on new item creation."
    ]
  },
  {
    id: "dva-083",
    question: "A developer is exposing an API using Amazon API Gateway and wants to limit the request rate to a specific endpoint to prevent overloading the backend.\n\nWhich feature is used to limit the request rate in API Gateway?",
    options: [
      "Configure rate limiting in the API Gateway resource policy.",
      "Set default throttling and burst limits at the API Gateway stage level, and override at the method level as needed.",
      "Use a Lambda authorizer to validate request frequency.",
      "Reduce the number of requests using Amazon CloudFront cache settings."
    ],
    correctAnswer: 1,
    category: "Development",
    explanation: "API Gateway's throttling settings allow you to limit the request rate to an API. Set default rate limits (requests per second) and burst limits (maximum concurrent requests) at the stage level, and optionally override them at the method level. Requests that exceed the limit receive a 429 Too Many Requests response. Combining usage plans with API keys also allows per-client limits.",
    optionExplanations: [
      "Incorrect: Resource policies are used to control access by IP address or VPC and are not used for rate limiting.",
      "Correct: API Gateway throttling settings allow stage- and method-level rate limits to be configured.",
      "Incorrect: Lambda authorizers are used for authentication and authorization, not rate limiting.",
      "Incorrect: CloudFront caching helps reduce the number of requests but is not API Gateway-level throttling."
    ]
  },
  {
    id: "dva-084",
    question: "A developer is using AWS CodeBuild to build an application. The developer wants to run unit tests during the build and display the test result report in AWS CodeBuild.\n\nHow should the developer configure this?",
    options: [
      "Upload the test results to an Amazon S3 bucket and review them in the management console.",
      "Specify the test report output location and file format in the reports section of buildspec.yml.",
      "Log test results to CloudWatch Logs and aggregate them with Logs Insights.",
      "Send test results to an SNS topic for notification."
    ],
    correctAnswer: 1,
    category: "Deployment",
    explanation: "To use AWS CodeBuild's test report feature, specify the report group name, the path to the test result file, and the file format (JUnit XML, Cucumber JSON, etc.) in the `reports` section of buildspec.yml. After the build runs, you can review the pass/fail count, execution time, and details of failed test cases in the Test Reports tab of the CodeBuild console.",
    optionExplanations: [
      "Incorrect: Uploading to S3 is possible, but using CodeBuild's test report feature allows you to review results directly in the console.",
      "Correct: Configuring the reports section of buildspec.yml enables test results to be viewed in the CodeBuild console.",
      "Incorrect: Logging to CloudWatch Logs is useful for debugging but is not suitable for test report visualization.",
      "Incorrect: SNS notifications are used for build completion alerts and do not support detailed test result reports."
    ]
  },
  {
    id: "dva-085",
    question: "A developer is building an architecture that triggers an AWS Lambda function when an object is uploaded to Amazon S3. The S3 bucket and Lambda function are in the same AWS account.\n\nWhich configuration is required to invoke Lambda from S3?",
    options: [
      "Add a policy to the Lambda IAM execution role that allows invocation from S3.",
      "Allow Lambda function execution in the S3 bucket policy.",
      "Allow invocation from the S3 bucket in the Lambda function's resource-based policy, and specify Lambda in the S3 bucket's event notification.",
      "Only create an EventBridge rule to forward S3 events to Lambda."
    ],
    correctAnswer: 2,
    category: "Development",
    explanation: "Two configurations are required to directly invoke Lambda from S3 event notifications. ① Allow invocation from the S3 service principal (s3.amazonaws.com) in the Lambda function's resource-based policy (permissions). ② In the S3 bucket's event notification settings, specify the target event (e.g., s3:ObjectCreated:*) and the destination Lambda function. When you add an S3 trigger in the console, the resource-based policy is configured automatically.",
    optionExplanations: [
      "Incorrect: The Lambda execution role grants permissions for Lambda to call other AWS services; it is separate from the permission for S3 to invoke Lambda.",
      "Incorrect: An S3 bucket policy controls access to S3 objects; the permission for Lambda invocation is configured in Lambda's resource-based policy.",
      "Correct: You need to allow invocation from S3 in the Lambda resource-based policy and configure the event notification on the S3 side.",
      "Incorrect: Integration via EventBridge is also possible, but using S3's native event notification to invoke Lambda directly is simpler."
    ]
  },
  {
    id: "dva-086",
    question: "A developer is deciding whether to use AWS Systems Manager Parameter Store or AWS Secrets Manager. The developer needs to store a database password and automatically rotate it every 90 days.\n\nWhich service is most appropriate for this requirement?",
    options: [
      "Use AWS Systems Manager Parameter Store (Standard parameter).",
      "Use AWS Systems Manager Parameter Store (SecureString) and implement rotation with a Lambda function.",
      "Use AWS Secrets Manager and configure automatic rotation.",
      "Store encrypted in Amazon S3 and update periodically with a Lambda function."
    ],
    correctAnswer: 2,
    category: "Security",
    explanation: "AWS Secrets Manager provides an integrated service for storing, retrieving, and automatically rotating secrets. For passwords for RDS, Redshift, and DocumentDB, it has a built-in rotation feature that automatically creates a Lambda function and performs rotation at a configured interval (e.g., 90 days). Parameter Store does not natively support automatic SecureString rotation, so Secrets Manager is the best choice when automatic rotation is a requirement.",
    optionExplanations: [
      "Incorrect: Standard parameters are not encrypted and are not suitable for storing passwords.",
      "Incorrect: Parameter Store SecureString is encrypted, but automatic rotation is not natively supported.",
      "Correct: Secrets Manager provides built-in automatic rotation and is the best fit for this requirement.",
      "Incorrect: Storing in S3 adds complexity to security management and is not a best practice compared to Secrets Manager."
    ]
  },
  {
    id: "dva-087",
    question: "A developer is building an application that processes messages using an Amazon SQS FIFO queue. Messages in the same group must be processed in order and must not be processed more than once.\n\nWhich configuration is required to enable message deduplication on a FIFO queue?",
    options: [
      "Set a long Visibility Timeout on the queue.",
      "Specify MessageGroupId and MessageDeduplicationId when sending messages (or enable content-based deduplication).",
      "Configure a dead-letter queue to filter out duplicate messages.",
      "Enable SQS long polling."
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "To achieve deduplication on an SQS FIFO queue, specify ① `MessageGroupId` (for ordering within a group) and ② `MessageDeduplicationId` (deduplication ID). Messages with the same MessageDeduplicationId sent within the 5-minute deduplication interval are delivered only once. Alternatively, enabling 'content-based deduplication' on the queue automatically uses a SHA-256 hash of the message body as the DeduplicationId.",
    optionExplanations: [
      "Incorrect: Visibility Timeout is used to hide messages being processed and is unrelated to deduplication.",
      "Correct: Specifying MessageGroupId and MessageDeduplicationId (or enabling content-based deduplication) achieves FIFO queue deduplication.",
      "Incorrect: A dead-letter queue is used to manage failed messages and is not used for deduplication.",
      "Incorrect: Long polling is a feature for efficient message retrieval and is unrelated to deduplication."
    ]
  },
  {
    id: "dva-088",
    question: "A developer wants to deploy the same resource configuration to multiple regions using an AWS CloudFormation template. A different AMI ID must be used per region. The developer wants to handle this without modifying the template for each region.\n\nWhich feature should the developer use to meet this requirement?",
    options: [
      "Define the AMI ID as an input parameter in the template's Parameters section and specify it at deploy time.",
      "Define a region-to-AMI-ID mapping table in the template's Mappings section and reference it using the Fn::FindInMap function.",
      "Create a separate template file for each region and hard-code the AMI ID.",
      "Use a Lambda-backed Custom Resource to dynamically retrieve the AMI ID at deploy time."
    ],
    correctAnswer: 1,
    category: "Deployment",
    explanation: "The CloudFormation Mappings section defines a key-value mapping table. By mapping region names to AMI IDs and combining the `Fn::FindInMap` function with the `AWS::Region` pseudo parameter, the appropriate AMI ID for the deployment region is automatically resolved. This allows deploying to multiple regions without modifying the template.",
    optionExplanations: [
      "Incorrect: Defining in Parameters is possible, but it requires entering the correct AMI ID at every deployment, which is error-prone.",
      "Correct: Using the Mappings section with Fn::FindInMap allows the AMI ID to be automatically resolved per region.",
      "Incorrect: Creating a separate template per region adds management complexity and increases the number of places to update on changes.",
      "Incorrect: A Custom Resource is possible but using Mappings is simpler and more reliable."
    ]
  },
  {
    id: "dva-089",
    question: "A developer is monitoring errors in an AWS Lambda function. When the Lambda function exceeds a specific error rate, the developer wants to send an email notification to the development team.\n\nWhat is the most appropriate configuration to meet this requirement?",
    options: [
      "Catch errors in the Lambda function code and send an email directly using Amazon SES.",
      "Create an alarm on the Lambda Errors metric in Amazon CloudWatch Metrics and configure email notification via an Amazon SNS topic when the alarm is triggered.",
      "Monitor Lambda execution logs with AWS CloudTrail to detect errors.",
      "Detect Lambda failure events with an Amazon EventBridge rule and send an SNS notification."
    ],
    correctAnswer: 1,
    category: "Monitoring",
    explanation: "Amazon CloudWatch automatically collects Lambda function execution metrics (Errors, Invocations, Duration, Throttles, etc.). You can create a CloudWatch Alarm on the Errors metric to set a threshold and configure an action to publish to an Amazon SNS topic when the alarm state is triggered. By subscribing an email address to the SNS topic, automatic email notifications are sent when the error rate is exceeded.",
    optionExplanations: [
      "Incorrect: Sending email directly via SES from code is possible, but using a CloudWatch alarm allows monitoring without code changes.",
      "Correct: CloudWatch Metrics Errors alarm + SNS email notification is the standard pattern for Lambda function error monitoring.",
      "Incorrect: CloudTrail is used to record API calls and is not appropriate for monitoring Lambda function error rates.",
      "Incorrect: Detecting Lambda failures via EventBridge is possible, but CloudWatch alarms are the right tool for metrics-based error rate monitoring."
    ]
  },
  {
    id: "dva-090",
    question: "A developer is building a microservices architecture and wants to implement request tracing across multiple services. When one service calls another, the developer wants to propagate the trace context to achieve distributed tracing.\n\nWhich configuration is required to enable distributed tracing with AWS X-Ray?",
    options: [
      "Manually log the trace ID to CloudWatch Logs in each service and correlate them with Logs Insights.",
      "Integrate the X-Ray SDK into each service to automatically add and propagate the X-Ray trace header (X-Amzn-Trace-Id) to outbound requests.",
      "Enable AWS CloudTrail to automatically trace all service API calls.",
      "Use Amazon CloudWatch Synthetics to monitor each service's endpoint."
    ],
    correctAnswer: 1,
    category: "Troubleshooting",
    explanation: "AWS X-Ray distributed tracing is achieved through the trace header (X-Amzn-Trace-Id) automatically managed by the X-Ray SDK. When the X-Ray SDK is integrated into each service, it retrieves the trace ID from inbound requests and automatically adds and propagates the same trace ID to outbound requests (HTTP/HTTPS, AWS SDK calls, etc.). This allows the flow of requests spanning multiple services to be visualized as a service map.",
    optionExplanations: [
      "Incorrect: Manual log output is complex to manage and error-prone, and is incomplete compared to the X-Ray SDK's automatic propagation.",
      "Correct: Integrating the X-Ray SDK into each service enables distributed tracing through automatic trace header addition and propagation.",
      "Incorrect: CloudTrail is an audit log of AWS API calls and is not used for distributed tracing within applications.",
      "Incorrect: CloudWatch Synthetics is used for endpoint availability monitoring and is different from distributed tracing."
    ]
  },
  {
    id: "dva-091",
    question: "A developer wants to detect data changes in an Amazon DynamoDB table in real time and forward the changes to another service. The developer needs to capture and process events for item creation, updates, and deletions.\n\nWhich feature should the developer use to meet this requirement?",
    options: [
      "Periodically export the DynamoDB table to Amazon S3 to detect changes.",
      "Enable DynamoDB Streams and configure an AWS Lambda function as a trigger.",
      "Monitor DynamoDB write counts with Amazon CloudWatch metrics and invoke Lambda.",
      "Use an Amazon SQS queue to send change events from the application side."
    ],
    correctAnswer: 1,
    category: "Database",
    explanation: "DynamoDB Streams captures data changes (INSERT, MODIFY, REMOVE) to a DynamoDB table in real time. Changes are retained as stream records, including before and after values, for up to 24 hours. By configuring a Lambda function as an event source for DynamoDB Streams, Lambda is automatically invoked whenever a change is detected, allowing the changes to be forwarded to another service or data store.",
    optionExplanations: [
      "Incorrect: Periodic exports are batch processing, not real-time detection, and do not meet the requirement.",
      "Correct: The combination of DynamoDB Streams and a Lambda trigger allows change events to be processed in real time.",
      "Incorrect: CloudWatch metrics can monitor write counts but cannot retrieve the content of individual item changes.",
      "Incorrect: Using SQS requires modifying the application side and is more complex than using DynamoDB Streams' native feature."
    ]
  },
  {
    id: "dva-092",
    question: "A developer wants to manage environment-specific configuration values (development, staging, production) for an AWS Lambda function. What is the simplest way to apply different configurations per environment without changing the code?",
    options: [
      "Hard-code the configuration values for each environment using if statements in the Lambda function code.",
      "Define configuration values as Lambda function environment variables and reference them from the code.",
      "Store configuration values in an Amazon S3 bucket and download them on each Lambda invocation.",
      "Use Lambda function aliases to manage different configurations per version."
    ],
    correctAnswer: 1,
    category: "Development",
    explanation: "Using Lambda function environment variables allows you to manage different configuration values per environment without changing code. Define environment variables in the function's deployment configuration and reference them in code using `process.env.VARIABLE_NAME` (Node.js) or equivalent. By setting different environment variables on different Lambda functions (or different aliases of the same function) per environment, you can reuse code while managing environment differences. Sensitive values can also be encrypted with KMS.",
    optionExplanations: [
      "Incorrect: Hard-coding values in code means you cannot change configuration without modifying code, which does not meet the requirement.",
      "Correct: Environment variables are a native Lambda feature and the simplest way to apply per-environment configuration without code changes.",
      "Incorrect: Downloading from S3 is also possible but adds latency and cost on every invocation, making it more complex than environment variables.",
      "Incorrect: Aliases are used for version management and traffic splitting; environment variables are more appropriate for configuration management."
    ]
  },
  {
    id: "dva-093",
    question: "A developer wants to implement OAuth 2.0 JWT token-based authentication for an API exposed via Amazon API Gateway. What is the simplest way to validate tokens issued by an Amazon Cognito User Pool?",
    options: [
      "Create a Lambda authorizer to manually validate the JWT token signature.",
      "Configure a Cognito User Pool authorizer in API Gateway.",
      "Set rules in the API Gateway resource policy to validate the token.",
      "Call the Cognito API inside the Lambda function to validate the token."
    ],
    correctAnswer: 1,
    category: "Security",
    explanation: "Amazon API Gateway supports native integration with Cognito User Pools. By simply specifying a Cognito User Pool as the authorizer, JWT token validation is performed automatically. API Gateway automatically validates the token in the request's Authorization header and forwards the request to the backend only if the token is valid. No Lambda authorizer needs to be created, making this the simplest implementation.",
    optionExplanations: [
      "Incorrect: Manual validation with a Lambda authorizer is possible but Cognito authorizer requires no code implementation and is simpler.",
      "Correct: The Cognito User Pool authorizer is a native API Gateway Cognito integration and is the simplest way to implement JWT validation.",
      "Incorrect: Resource policies are used for access control by IP address or VPC and are not used for JWT validation.",
      "Incorrect: Validation inside a Lambda function is possible but mixes authentication logic into application code, adding management complexity."
    ]
  },
  {
    id: "dva-094",
    question: "A developer is deploying a new version of an AWS Lambda function using AWS CodeDeploy. Rather than switching all traffic to the new version at once, the developer wants to gradually shift traffic over 10 minutes and automatically roll back if an issue is detected.\n\nWhich CodeDeploy deployment configuration is most appropriate for this requirement?",
    options: [
      "CodeDeployDeploymentConfig: CodeDeployDefault.LambdaAllAtOnce",
      "CodeDeployDeploymentConfig: CodeDeployDefault.LambdaLinear10PercentEvery1Minute",
      "CodeDeployDeploymentConfig: CodeDeployDefault.LambdaCanary10Percent10Minutes",
      "CodeDeployDeploymentConfig: CodeDeployDefault.LambdaLinear10PercentEvery10Minutes"
    ],
    correctAnswer: 2,
    category: "Deployment",
    explanation: "The CodeDeploy Lambda deployment configuration \"LambdaCanary10Percent10Minutes\" is a canary deployment that shifts 10% of traffic to the new version first, and if no issues are found after 10 minutes, switches the remaining 90% all at once. Combined with CloudWatch alarms, an automatic rollback is triggered if an issue is detected during the 10-minute observation period. Linear configurations increase traffic in equal increments.",
    optionExplanations: [
      "Incorrect: AllAtOnce switches all traffic to the new version at once and does not meet the requirement for gradual migration.",
      "Incorrect: Linear10PercentEvery1Minute increases by 10% every minute and completes in 10 minutes, but this differs from the 'over 10 minutes' requirement.",
      "Correct: Canary10Percent10Minutes is a canary approach that shifts 10% first, then switches the rest 10 minutes later, which best fits the requirement.",
      "Incorrect: Linear10PercentEvery10Minutes increases by 10% every 10 minutes, taking 100 minutes for a full switchover."
    ]
  },
  {
    id: "dva-095",
    question: "A developer is estimating the number of shards for Amazon Kinesis Data Streams. 500 records are written per second, and the average size of each record is 2 KB. What is the minimum number of shards required based on write throughput?",
    options: [
      "1 shard",
      "2 shards",
      "3 shards",
      "5 shards"
    ],
    correctAnswer: 1,
    category: "Application Integration",
    explanation: "The write limit per shard in Kinesis Data Streams is 1,000 records per second or 1 MB/sec, whichever is lower. In this case: record count: 500/sec (within the 1,000/sec per-shard limit), data volume: 500 × 2 KB = 1,000 KB ≈ 1 MB/sec (nearly at the 1 MB/sec per-shard limit). Because the data volume could slightly exceed 1 MB, 2 shards is appropriate for safety. Both record count and data volume limits must be considered.",
    optionExplanations: [
      "Incorrect: The write limit per shard is 1 MB/sec, but 500 × 2 KB = 1 MB/sec is nearly at the limit, leaving no room for safety.",
      "Correct: Since the data volume almost reaches the per-shard limit (1 MB/sec), 2 shards is the minimum safe configuration.",
      "Incorrect: 3 shards provides headroom but is excessive as the 'minimum number of shards'.",
      "Incorrect: 5 shards is an over-provisioned configuration."
    ]
  },
  {
    id: "dva-096",
    question: "A developer wants to review changes before deploying a stack using AWS CloudFormation. How can the developer preview which resources will be added, modified, or deleted without actually changing any resources?",
    options: [
      "Deploy the stack once and then roll it back.",
      "Create a CloudFormation Change Set and review the contents.",
      "Deploy the same template to a separate test account to verify.",
      "Use AWS Config to analyze changes to the template."
    ],
    correctAnswer: 1,
    category: "Deployment",
    explanation: "AWS CloudFormation Change Sets allow you to preview which resources will change before updating a stack. When you create a change set, CloudFormation compares the current stack state with the new template and displays a list of resources to be added, modified, or deleted. No actual resource changes are made, so you can safely review the changes before deciding to execute. This is especially useful for verifying changes before applying them to a production environment.",
    optionExplanations: [
      "Incorrect: Deploying and then rolling back actually changes resources, defeating the purpose of previewing changes.",
      "Correct: Using a Change Set allows you to preview changes without making any actual resource modifications.",
      "Incorrect: Deploying to a separate account is an incomplete verification method and incurs additional cost.",
      "Incorrect: AWS Config is used to track changes to resource configurations and is not used to predict CloudFormation changes."
    ]
  },
  {
    id: "dva-097",
    question: "A developer is processing object uploads using Amazon S3 event notifications. When a large number of uploads occur to the same bucket, the Lambda function's concurrent executions spike and reach the account concurrency limit.\n\nHow should the developer configure this to limit the Lambda function's concurrent executions?",
    options: [
      "Disable the S3 bucket event notification and switch to batch processing.",
      "Set Reserved Concurrency on the Lambda function to limit the maximum number of concurrent executions.",
      "Shorten the Lambda function's timeout value to complete processing faster.",
      "Monitor Lambda concurrency with a CloudWatch alarm and manually scale down."
    ],
    correctAnswer: 1,
    category: "Compute",
    explanation: "Setting Reserved Concurrency on a Lambda function limits the maximum number of concurrent executions that function can use. Once Reserved Concurrency is set, requests exceeding that number are throttled (429 error), preventing impact on other functions. This prevents the account-wide concurrency limit from being reached during sudden traffic spikes and ensures capacity for other critical functions.",
    optionExplanations: [
      "Incorrect: Disabling event notifications would stop upload events from being processed, failing to meet the requirement.",
      "Correct: Setting Reserved Concurrency limits the maximum concurrent executions of the Lambda function and prevents impact on the account limit.",
      "Incorrect: Shortening the timeout risks incomplete processing and does not limit concurrency.",
      "Incorrect: Manual scale-down lacks immediacy and is not automated, increasing operational burden."
    ]
  },
  {
    id: "dva-098",
    question: "A developer is building an application that connects from AWS Lambda functions to an Amazon RDS database. When Lambda scales out, a large number of database connections are created, reaching the RDS maximum connection limit.\n\nWhich service should the developer use to resolve this issue?",
    options: [
      "Increase Lambda function memory to speed up processing and reduce connection time.",
      "Upgrade the RDS instance size to increase the maximum number of connections.",
      "Use Amazon RDS Proxy to pool database connections.",
      "Limit the Lambda function's Reserved Concurrency to below the maximum connection count."
    ],
    correctAnswer: 2,
    category: "Database",
    explanation: "Amazon RDS Proxy is a fully managed database proxy that resolves connection explosion from serverless environments like Lambda to RDS. Because RDS Proxy pools and reuses connections from the application, it significantly reduces the number of connections actually created to RDS. Even when Lambda scales out massively, RDS Proxy keeps the number of RDS connections within a controlled range. It can be introduced with minimal application code changes.",
    optionExplanations: [
      "Incorrect: Increasing memory helps speed up processing but does not resolve the concurrent connection issue.",
      "Incorrect: Upgrading the RDS instance increases the maximum connections but does not solve the root cause of connection explosion and also increases cost.",
      "Correct: RDS Proxy uses connection pooling to keep RDS connections within an appropriate range even when Lambda scales out.",
      "Incorrect: Limiting Reserved Concurrency reduces Lambda throughput and is not an appropriate solution for connection management."
    ]
  },
  {
    id: "dva-099",
    question: "A developer wants to apply custom configuration changes (such as modifying Nginx configuration or installing packages) to an AWS Elastic Beanstalk application. How can the developer automatically apply configurations not supported by Elastic Beanstalk's standard settings at deploy time?",
    options: [
      "Manually SSH into the EC2 instance to make configuration changes.",
      "Place configuration files (.config) in the application's .ebextensions directory.",
      "Set shell commands in Elastic Beanstalk environment variables.",
      "Use AWS Systems Manager Run Command to apply configuration to the EC2 instance."
    ],
    correctAnswer: 1,
    category: "Deployment",
    explanation: "AWS Elastic Beanstalk's `.ebextensions` is a mechanism for automatically applying custom configurations when an application is deployed. By creating a `.ebextensions` directory in the application source code root and placing YAML-format `.config` files in it, you can declaratively define various customizations such as installing packages, creating files, running commands, and configuring services. Because it is automatically applied on every deployment, infrastructure configuration can be managed as code.",
    optionExplanations: [
      "Incorrect: Manual SSH configuration changes may be overwritten by the next deployment and are not reproducible.",
      "Correct: Using .ebextensions allows custom configuration to be automatically applied on every deployment.",
      "Incorrect: Environment variables are used for passing configuration values to the application, not for running system configuration commands.",
      "Incorrect: Systems Manager Run Command can be used for manual or periodic operations, but .ebextensions is appropriate for automatic configuration at deploy time."
    ]
  },
  {
    id: "dva-100",
    question: "A developer is operating a serverless application composed of multiple AWS services (Lambda, DynamoDB, S3, API Gateway). When a request is processed across multiple services, an error occurs, but the developer cannot identify which service and which process caused the error.\n\nWhat is the most effective approach the developer should take to resolve this issue?",
    options: [
      "Review the CloudWatch Logs of each service individually and manually correlate the error messages.",
      "Enable AWS X-Ray tracing on all services and use the service map and traces to identify where the error occurred.",
      "Add try-catch to each Lambda function and implement code to send SNS notifications on error.",
      "Create an Amazon CloudWatch Dashboard to view metrics for all services on a single screen."
    ],
    correctAnswer: 1,
    category: "Troubleshooting",
    explanation: "AWS X-Ray is the ideal service for distributed tracing in microservices and serverless architectures. AWS services such as Lambda, API Gateway, DynamoDB, and S3 have native integration with X-Ray, so trace data is automatically collected by simply enabling X-Ray on each service. The X-Ray console service map visualizes the request flow, and the trace detail view allows you to identify at a glance which service and which segment the error occurred in.",
    optionExplanations: [
      "Incorrect: Reviewing individual CloudWatch Logs manually is time-consuming and makes it difficult to trace requests across multiple services.",
      "Correct: X-Ray distributed tracing visualizes request flow across multiple services and allows efficient identification of where errors occur.",
      "Incorrect: Adding SNS notifications is useful for error detection but is insufficient for tracing to identify which service and process caused the error.",
      "Incorrect: CloudWatch Dashboard is effective for monitoring metrics but X-Ray is appropriate for tracing specific requests across services."
    ]
  }
];
