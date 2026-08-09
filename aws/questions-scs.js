// AWS Certified Security - Specialty (SCS-C02) Practice Questions
const awsSCSQuestions = [
  {
    id: 1,
    question: "A security engineer is investigating an alert from Amazon GuardDuty that indicates an IAM role in the company's AWS account is communicating with an external IP address known for cryptocurrency mining. The role is attached to an Amazon EC2 instance used by the development team.\n\nWhat should the security engineer do FIRST to contain the threat?",
    options: [
      "Delete the IAM role immediately to revoke all active sessions associated with it.",
      "Isolate the EC2 instance by modifying its security group to deny all inbound and outbound traffic, and then revoke the IAM role's active sessions using AWS STS.",
      "Terminate the EC2 instance to stop the malicious activity immediately.",
      "Rotate the access keys for the IAM role and update the instance's application configuration."
    ],
    correctAnswer: 1,
    category: "Threat Detection and Incident Response",
    explanation: "The correct containment approach is to isolate the instance by restricting network traffic (to preserve forensic evidence) and then revoke active STS sessions for the role. Deleting the IAM role may disrupt legitimate operations and does not immediately stop the active session. Terminating the instance destroys forensic evidence. Rotating access keys is useful but does not address the active compromised session.",
    optionExplanations: [
      "Deleting the IAM role would revoke future credential issuance but would not immediately invalidate existing STS tokens already in use by the compromised instance. It also disrupts legitimate services using that role.",
      "✓ Correct: Isolating the instance via security group changes stops network communication without destroying forensic data. Revoking active sessions via 'Revoke active sessions' on the IAM role denies all STS tokens issued before the revocation time, effectively neutralizing the compromised credential.",
      "Terminating the instance stops the malicious activity but permanently destroys memory, disk evidence, and logs that are critical for root cause analysis and incident response.",
      "Rotating access keys helps prevent future misuse of static credentials but does not terminate the currently active STS temporary credential used by the instance metadata service."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_revoke-sessions.html", title: "Revoking IAM role temporary security credentials" },
      { url: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html", title: "Remediating potentially compromised Amazon EC2 instances" }
    ]
  },
  {
    id: 2,
    question: "A company stores sensitive financial data in Amazon S3. A compliance audit requires that all data must be encrypted at rest using customer-managed keys, and the encryption keys must be rotated automatically every year. The company must also be able to demonstrate that access to the keys is limited to authorized applications only.\n\nWhich solution meets ALL of these requirements?",
    options: [
      "Enable SSE-S3 (AES-256) on all S3 buckets. Enable S3 object-level logging in AWS CloudTrail.",
      "Create an AWS KMS customer managed key (CMK) with automatic key rotation enabled. Apply a KMS key policy restricting key usage to authorized IAM roles. Configure S3 default encryption using SSE-KMS with the CMK.",
      "Create an AWS KMS AWS managed key. Enable automatic rotation. Use SSE-KMS with the AWS managed key for S3 default encryption.",
      "Use AWS CloudHSM to generate AES-256 keys. Manually upload the keys to AWS KMS as imported key material. Configure S3 default encryption using SSE-KMS."
    ],
    correctAnswer: 1,
    category: "Data Protection",
    explanation: "A KMS customer managed key (CMK) supports automatic annual rotation, allows customizable key policies to restrict usage to specific IAM principals, and can be used with S3 SSE-KMS. AWS managed keys rotate every 3 years and do not support custom key policies. SSE-S3 keys are managed entirely by AWS with no customer control. Imported key material does not support automatic rotation.",
    optionExplanations: [
      "SSE-S3 uses AWS-managed AES-256 keys. There is no customer control over the key policy, and automatic rotation is handled opaquely by AWS without customer-defined policies restricting access to specific roles.",
      "✓ Correct: A KMS CMK meets all requirements: automatic annual rotation, granular key policy to limit access to authorized IAM principals, and S3 SSE-KMS integration for encryption at rest.",
      "AWS managed keys (aws/s3) rotate every 3 years, not annually, and do not support custom key policies. The company cannot limit key access to specific IAM principals using AWS managed keys.",
      "Imported key material (BYOK) to KMS does not support automatic rotation. Manual rotation requires creating a new key and migrating data, which does not satisfy the automatic rotation requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html", title: "Rotating AWS KMS keys" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html", title: "Protecting data using server-side encryption with AWS KMS" }
    ]
  },
  {
    id: 3,
    question: "A company has multiple AWS accounts organized in AWS Organizations. The security team needs to ensure that Amazon GuardDuty findings from all member accounts are aggregated in a centralized security account. The solution must automatically enroll new member accounts in GuardDuty and send all findings to the central account.\n\nWhich combination of steps should the security engineer implement? (Choose TWO.)",
    options: [
      "In the central security account, enable GuardDuty and designate it as the GuardDuty delegated administrator for the organization.",
      "In each member account, manually enable GuardDuty and configure it to publish findings to an S3 bucket in the central account.",
      "In the Organizations management account, delegate GuardDuty administration to the central security account.",
      "Create an Amazon EventBridge rule in each member account to forward GuardDuty findings to the central account's event bus.",
      "Enable GuardDuty auto-enable in the delegated administrator account so that new member accounts are automatically enrolled."
    ],
    correctAnswer: [0, 2],
    category: "Security Logging and Monitoring",
    explanation: "Delegating GuardDuty administration at the Organizations level and enabling GuardDuty in the designated delegated administrator account allows centralized management. The delegated administrator can view and aggregate findings from all member accounts. The auto-enable setting ensures new accounts are enrolled automatically. The correct steps are: (1) delegate admin in the management account, and (2) enable GuardDuty in the security account (the delegated admin), then enable auto-enable.",
    optionExplanations: [
      "✓ Correct: Enabling GuardDuty in the central security account and designating it as the delegated administrator allows it to manage GuardDuty across all member accounts and aggregate findings centrally.",
      "Manually configuring each member account does not scale and does not automatically enroll new accounts. S3-based publishing requires additional configuration and is not the standard aggregation mechanism.",
      "✓ Correct: Delegating GuardDuty administration from the management account to the central security account is required before the security account can manage GuardDuty organization-wide.",
      "EventBridge cross-account event forwarding can work but is not the native GuardDuty Organizations integration pattern. It requires per-account configuration and additional IAM permissions.",
      "Auto-enable is a setting in the delegated administrator account, not a standalone step. It must be configured after the delegation is established, making it dependent on the other steps."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html", title: "Managing GuardDuty accounts with AWS Organizations" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html", title: "AWS services integrated with AWS Organizations" }
    ]
  },
  {
    id: 4,
    question: "A security engineer reviews VPC flow logs and notices that a large volume of traffic on port 3389 (RDP) is originating from an unknown external IP address and targeting multiple EC2 instances in a private subnet. The EC2 instances should only be accessible from the corporate network via an on-premises VPN connection.\n\nWhat is the MOST likely cause, and what is the BEST immediate remediation?",
    options: [
      "The security groups allow inbound RDP from 0.0.0.0/0. Update the security groups to restrict RDP access to the corporate VPN CIDR range only.",
      "The Network ACL for the private subnet is missing an outbound deny rule for port 3389. Add a DENY rule for outbound traffic on port 3389.",
      "The NAT Gateway is incorrectly forwarding external RDP traffic to the private instances. Replace the NAT Gateway with a Transit Gateway.",
      "The EC2 instances have Elastic IP addresses assigned, which exposes them directly to the internet. Remove the Elastic IP addresses."
    ],
    correctAnswer: 0,
    category: "Infrastructure Security",
    explanation: "If private subnet EC2 instances are receiving external RDP traffic, the most likely cause is that the security group allows inbound port 3389 from a broad CIDR range (e.g., 0.0.0.0/0). Security groups are the primary stateful firewall for EC2 instances, and restricting the RDP inbound rule to the corporate VPN CIDR is the most effective and immediate remediation. NAT Gateways do not forward inbound connections from the internet to private instances.",
    optionExplanations: [
      "✓ Correct: Security groups control which traffic can reach EC2 instances. If the inbound rule for port 3389 allows 0.0.0.0/0, external traffic can reach the instances. Restricting the rule to the VPN CIDR immediately blocks unauthorized access.",
      "Network ACLs are stateless and apply at the subnet level. Adding an outbound deny for port 3389 would block outbound RDP traffic from the instances, not inbound traffic from external sources. The problem is inbound traffic.",
      "NAT Gateways provide outbound internet access for private instances but do not perform inbound port forwarding. External traffic on port 3389 cannot reach private instances through a NAT Gateway.",
      "Elastic IP addresses assigned to instances in a private subnet would allow direct internet access, but instances in a private subnet typically don't have Elastic IPs. The more likely issue is a permissive security group rule."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html", title: "Control traffic to resources using security groups" },
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html", title: "Control traffic to subnets using network ACLs" }
    ]
  },
  {
    id: 5,
    question: "A company uses AWS CloudTrail to log all API activity across all AWS Regions and accounts. A security requirement mandates that CloudTrail logs must be immutable and protected from accidental or malicious deletion for 7 years. The logs must be available for analysis within 90 days and moved to lower-cost storage afterward.\n\nWhich solution satisfies BOTH the immutability and cost requirements?",
    options: [
      "Store CloudTrail logs in an S3 bucket with S3 Object Lock in Governance mode with a 7-year retention period. Configure an S3 Lifecycle policy to transition logs to S3 Glacier after 90 days.",
      "Store CloudTrail logs in an S3 bucket with versioning enabled. Configure S3 Glacier as the archival storage. Set up a bucket policy denying s3:DeleteObject.",
      "Store CloudTrail logs in an S3 bucket with S3 Object Lock in Compliance mode with a 7-year retention period. Configure an S3 Lifecycle policy to transition logs to S3 Glacier Deep Archive after 90 days.",
      "Enable CloudTrail log file integrity validation. Store logs in an S3 bucket with MFA Delete enabled and set a bucket policy to deny DeleteObject."
    ],
    correctAnswer: 2,
    category: "Data Protection",
    explanation: "S3 Object Lock in Compliance mode prevents ANY user, including the root account, from deleting or modifying objects before the retention period expires. Governance mode allows users with special IAM permissions to override the retention settings. Compliance mode provides the strongest immutability guarantee required for regulatory compliance. The Lifecycle policy to transition to Glacier Deep Archive after 90 days satisfies the cost optimization requirement.",
    optionExplanations: [
      "S3 Object Lock in Governance mode can be overridden by a user with the s3:BypassGovernanceRetention permission. For regulatory requirements mandating true immutability, Governance mode does not provide sufficient protection.",
      "Versioning and bucket policies can be modified or removed by administrators. MFA Delete requires MFA but can still be bypassed by root account users. This does not provide the same level of protection as Object Lock in Compliance mode.",
      "✓ Correct: S3 Object Lock in Compliance mode ensures no user (including root) can delete or alter logs during the retention period. Transitioning to S3 Glacier Deep Archive after 90 days reduces storage costs for older logs while maintaining the immutability guarantee.",
      "CloudTrail log file integrity validation detects tampering but does not prevent deletion. MFA Delete requires MFA for deletion but can be disabled by the root account. This combination does not guarantee true immutability."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html", title: "Using S3 Object Lock" },
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html", title: "Validating CloudTrail log file integrity" }
    ]
  },
  {
    id: 6,
    question: "A company's application running on Amazon EC2 instances needs to retrieve database credentials stored in AWS Secrets Manager. A security engineer must design the most secure method to grant the application access to the secret without using long-term access keys.\n\nWhich approach should the security engineer implement?",
    options: [
      "Create an IAM user with an inline policy allowing secretsmanager:GetSecretValue. Store the user's access key and secret key in an environment variable on the EC2 instance.",
      "Create an IAM role with a policy allowing secretsmanager:GetSecretValue on the specific secret ARN. Attach the role to the EC2 instances as an instance profile.",
      "Embed the Secrets Manager secret ARN directly in the application code. Use the default AWS SDK credential chain to retrieve the secret.",
      "Store the database credentials in an encrypted S3 bucket. Grant the EC2 instances an IAM role that allows s3:GetObject on that bucket."
    ],
    correctAnswer: 1,
    category: "Identity and Access Management",
    explanation: "IAM roles attached to EC2 instances as instance profiles provide temporary, automatically rotated credentials via the EC2 metadata service. This eliminates the need for long-term access keys. The role's policy should follow least privilege by restricting secretsmanager:GetSecretValue to the specific secret ARN. This is the AWS-recommended pattern for credential-free access to AWS services.",
    optionExplanations: [
      "Using an IAM user with long-term access keys stored in environment variables violates the requirement to avoid long-term credentials. Environment variables can be exposed through application vulnerabilities or inadvertent logging.",
      "✓ Correct: An IAM role attached as an instance profile provides the EC2 instance with temporary STS credentials via the metadata service. The credentials rotate automatically, eliminating long-term key management. Restricting the policy to the specific secret ARN follows least privilege.",
      "Embedding the secret ARN in application code alone does not grant access — the application still needs valid AWS credentials to call the Secrets Manager API. The default SDK credential chain would need an instance profile or other credential source.",
      "Storing credentials in S3, even encrypted, introduces an additional access pattern. Secrets Manager is purpose-built for credentials, provides automatic rotation, and should be used directly rather than wrapping credentials in S3."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_iam-policies.html", title: "Authentication and access control for AWS Secrets Manager" },
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html", title: "Using instance profiles" }
    ]
  },
  {
    id: 7,
    question: "A company's web application is frequently targeted by SQL injection and cross-site scripting (XSS) attacks. The application is served through Amazon CloudFront backed by an Application Load Balancer (ALB). The security team wants to automatically block these attacks without modifying the application code.\n\nWhich solution provides the MOST effective protection with the LEAST operational overhead?",
    options: [
      "Deploy an Amazon Inspector agent on each web server EC2 instance to detect and block malicious traffic at the host level.",
      "Associate an AWS WAF Web ACL with the CloudFront distribution. Enable the AWS Managed Rules for SQL database and the Known Bad Inputs rule group.",
      "Configure AWS Shield Advanced on the CloudFront distribution to protect against application-layer attacks.",
      "Create a Network Firewall policy with Suricata-compatible rules to detect SQL injection patterns and associate it with the VPC."
    ],
    correctAnswer: 1,
    category: "Infrastructure Security",
    explanation: "AWS WAF with AWS Managed Rules provides pre-built, continuously updated rule groups that block common web exploits including SQL injection and XSS. Associating the Web ACL with CloudFront applies protection at the edge before traffic reaches origin servers. AWS Managed Rules have minimal operational overhead since AWS maintains the rule signatures. This is the most direct solution for the described attack types.",
    optionExplanations: [
      "Amazon Inspector is a vulnerability assessment service for EC2 instances and container images. It does not inspect or block web traffic in real time. It cannot prevent SQL injection or XSS attacks.",
      "✓ Correct: AWS WAF at the CloudFront level inspects every HTTP/HTTPS request before it reaches the origin. The AWS Managed Rules for SQL database and Known Bad Inputs (XSS) rule groups provide automated, maintained protection with minimal operational overhead.",
      "AWS Shield Advanced protects against DDoS attacks at network and transport layers (and has some L7 DDoS mitigations). It does not provide granular SQL injection or XSS filtering. Shield Advanced is complementary to WAF, not a replacement.",
      "AWS Network Firewall operates at the VPC perimeter (L3/L4/L7 with Suricata rules) but requires custom rule creation and maintenance. It also applies after traffic enters the VPC, not at the CloudFront edge layer."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-list.html", title: "AWS Managed Rules rule groups list" },
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/cloudfront-features.html", title: "How AWS WAF works with Amazon CloudFront features" }
    ]
  },
  {
    id: 8,
    question: "A security engineer needs to ensure that all Amazon EC2 instances in a production environment are patched with the latest OS security updates within 48 hours of a patch being released. The environment has hundreds of instances across multiple AWS Regions. The engineer needs a solution that applies patches automatically with minimal manual intervention.\n\nWhich solution meets these requirements?",
    options: [
      "Create an AWS Lambda function that calls the SSM RunCommand API to run the patch manager command on all EC2 instances every 24 hours.",
      "Configure AWS Systems Manager Patch Manager with a patch baseline that approves critical and security patches automatically after 0 days. Create a maintenance window that runs the AWS-RunPatchBaseline document every 24 hours across all Regions.",
      "Use AWS Config to detect non-compliant instances and trigger an Amazon SNS notification so administrators can manually apply patches within 48 hours.",
      "Create an Amazon EventBridge rule that triggers when AWS Security Hub reports a finding related to missing patches. Invoke a Lambda function to apply patches to affected instances."
    ],
    correctAnswer: 1,
    category: "Infrastructure Security",
    explanation: "AWS Systems Manager Patch Manager is purpose-built for automated patch management at scale across multiple Regions and accounts. A patch baseline with 0-day auto-approval for critical/security patches combined with a 24-hour maintenance window ensures patches are applied within 24 hours of release, well within the 48-hour SLA. This is fully automated with no manual intervention.",
    optionExplanations: [
      "A custom Lambda function calling SSM RunCommand can work but introduces unnecessary operational overhead. SSM Patch Manager already provides this functionality natively with maintenance windows, compliance reporting, and multi-Region support.",
      "✓ Correct: Patch Manager with a 0-day auto-approval patch baseline ensures that released security patches are immediately approved. A 24-hour maintenance window guarantees all instances are patched within 24 hours of approval, meeting the 48-hour requirement with a buffer.",
      "AWS Config detects configuration drift but does not remediate it automatically in this configuration. Relying on manual administrator action cannot guarantee the 48-hour patching window.",
      "Security Hub findings for missing patches are not generated in real time and are not the primary mechanism for patch compliance. This approach would require additional custom integration and may not detect all missing patches promptly."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-patch.html", title: "AWS Systems Manager Patch Manager" },
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-patch-baselines.html", title: "About predefined and custom patch baselines" }
    ]
  },
  {
    id: 9,
    question: "A company wants to implement a multi-account AWS environment using AWS Organizations. The security team must ensure that no member account can disable AWS CloudTrail logging in their account, and that logs from all accounts are stored in a centralized S3 bucket in the security account. Member accounts must not be able to modify or delete the S3 bucket or its contents.\n\nWhich combination of controls should the security engineer implement? (Choose THREE.)",
    options: [
      "Create an SCP that denies cloudtrail:StopLogging and cloudtrail:DeleteTrail for all member accounts. Attach it to the root of the organization.",
      "Enable AWS Config in each member account and create a rule to detect when CloudTrail is disabled.",
      "Create an organization trail in the management account that applies to all member accounts. Configure it to deliver logs to the centralized S3 bucket in the security account.",
      "Add a bucket policy to the centralized S3 bucket that denies s3:DeleteBucket, s3:DeleteObject, and s3:PutBucketPolicy from all principals except the CloudTrail service.",
      "Enable S3 Object Lock on the centralized S3 bucket in Governance mode to prevent deletion of log files."
    ],
    correctAnswer: [0, 2, 3],
    category: "Management and Security Governance",
    explanation: "Three controls are needed: (1) An SCP to prevent member accounts from disabling CloudTrail, (2) an organization trail to centralize logs from all accounts to the security account's S3 bucket, and (3) a restrictive bucket policy on the centralized S3 bucket to prevent modification or deletion by member accounts. AWS Config detection alone does not prevent the action. Governance mode Object Lock can be bypassed.",
    optionExplanations: [
      "✓ Correct: An SCP denying cloudtrail:StopLogging and cloudtrail:DeleteTrail prevents any principal in member accounts from disabling CloudTrail, regardless of their IAM permissions.",
      "AWS Config rules detect policy violations after the fact but cannot prevent the action from occurring. This is a detective control, not a preventive one.",
      "✓ Correct: An organization trail created in the management account automatically applies to all member accounts and can be configured to deliver logs to a centralized S3 bucket in the security account.",
      "✓ Correct: A bucket policy that denies destructive actions (DeleteBucket, DeleteObject, PutBucketPolicy) from all principals except the CloudTrail service prevents member accounts and even administrators from tampering with the centralized logs.",
      "S3 Object Lock in Governance mode can be bypassed by users with the s3:BypassGovernanceRetention permission. For cross-account protection, a restrictive bucket policy is more reliable."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html", title: "Creating a trail for an organization" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" }
    ]
  },
  {
    id: 10,
    question: "A financial company is required by a compliance framework to ensure that all data stored in Amazon RDS databases is encrypted at rest using a key that the company controls. Additionally, the key must not be accessible to AWS employees, and all cryptographic operations must be logged for audit purposes.\n\nWhich solution meets these requirements?",
    options: [
      "Enable RDS encryption using an AWS managed key (aws/rds). Enable AWS CloudTrail to log KMS API calls.",
      "Enable RDS encryption using an AWS KMS customer managed key (CMK). Enable CloudTrail and configure it to include KMS data events.",
      "Deploy AWS CloudHSM in a dedicated cluster. Use the CloudHSM key store in AWS KMS to create a CMK backed by CloudHSM. Enable RDS encryption using this CMK and enable CloudTrail.",
      "Use RDS Transparent Data Encryption (TDE) with a customer-provided key. Store the key in AWS Secrets Manager with rotation enabled."
    ],
    correctAnswer: 2,
    category: "Data Protection",
    explanation: "AWS CloudHSM is a hardware security module that the customer exclusively controls. When a KMS custom key store is backed by a dedicated CloudHSM cluster, the key material never leaves the HSM in plaintext, and AWS employees cannot access the key material. CloudTrail logs all KMS API calls, providing the required audit trail. Standard KMS CMKs are managed within AWS-controlled HSMs, meaning AWS could theoretically access key material under legal compulsion.",
    optionExplanations: [
      "AWS managed keys (aws/rds) are controlled by AWS, not the customer. AWS employees could access the key material under legal or operational circumstances. This does not satisfy the 'no AWS employee access' requirement.",
      "A standard KMS CMK provides customer control over key policy and usage, but the key material is stored in AWS-managed HSMs. AWS employees could access key material under legal compulsion. CloudTrail logging of KMS data events is correct but insufficient alone.",
      "✓ Correct: A CloudHSM-backed KMS custom key store keeps key material inside a customer-dedicated CloudHSM cluster. AWS has no access to CloudHSM key material. All cryptographic operations via KMS are logged by CloudTrail, satisfying the audit requirement.",
      "RDS TDE with a customer-provided key is supported for specific RDS engines (Oracle, SQL Server) but requires key management outside AWS KMS. Storing keys in Secrets Manager does not provide HSM-level protection or the same audit capabilities as KMS with CloudTrail."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/custom-key-store-overview.html", title: "Custom key stores in AWS KMS" },
      { url: "https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html", title: "What is AWS CloudHSM?" }
    ]
  },
  {
    id: 11,
    question: "A company uses Amazon Cognito user pools to authenticate users for a web application. A security review found that some users have not enabled multi-factor authentication (MFA). The security team wants to enforce MFA for all users and ensure that new users cannot complete sign-in without setting up MFA.\n\nWhich Cognito configuration should the security engineer apply?",
    options: [
      "Set the MFA configuration on the user pool to 'Required'. Choose TOTP or SMS as the MFA method.",
      "Create an AWS Lambda Pre-Authentication trigger that checks whether the user has MFA enabled and returns an error if they do not.",
      "Enable adaptive authentication in the user pool and set the risk level for all sign-ins to 'High' to force MFA challenges.",
      "Create an IAM policy that denies all API actions unless the condition aws:MultiFactorAuthPresent is true and attach it to the Cognito-authenticated role."
    ],
    correctAnswer: 0,
    category: "Identity and Access Management",
    explanation: "Setting the Cognito user pool MFA configuration to 'Required' enforces MFA for all users. Existing users who have not set up MFA will be required to enroll during their next sign-in. New users must complete MFA enrollment during the sign-up flow. This is the native, built-in mechanism for mandatory MFA in Cognito.",
    optionExplanations: [
      "✓ Correct: The 'Required' MFA setting on the Cognito user pool natively enforces MFA for every user on every sign-in. Users without MFA configured are prompted to set it up before completing authentication.",
      "A Lambda Pre-Authentication trigger can check MFA status but cannot force the user to enroll MFA within the Cognito authentication flow. It can only block sign-in, not redirect to enrollment.",
      "Adaptive authentication adjusts MFA challenges based on risk signals but does not mandate MFA for all sign-ins regardless of risk score. Setting all risk to 'High' is a workaround, not the correct mechanism.",
      "An IAM condition on the Cognito-authenticated role restricts access to AWS resources but does not enforce MFA at the Cognito sign-in layer. Users could still complete Cognito authentication without MFA."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-mfa.html", title: "Adding MFA to a user pool" },
      { url: "https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow.html", title: "User pool authentication flow" }
    ]
  },
  {
    id: 12,
    question: "A security engineer is reviewing an AWS Lambda function that processes customer orders. The function's execution role has the following policy attached:\n\n{ \"Effect\": \"Allow\", \"Action\": \"*\", \"Resource\": \"*\" }\n\nThe security engineer needs to replace this with a least-privilege policy. The function only reads from a specific DynamoDB table and writes logs to CloudWatch Logs.\n\nWhich policy replacement BEST satisfies least privilege?",
    options: [
      "{ \"Effect\": \"Allow\", \"Action\": [\"dynamodb:*\", \"logs:*\"], \"Resource\": \"*\" }",
      "{ \"Effect\": \"Allow\", \"Action\": [\"dynamodb:GetItem\", \"dynamodb:Query\", \"dynamodb:Scan\", \"logs:CreateLogGroup\", \"logs:CreateLogStream\", \"logs:PutLogEvents\"], \"Resource\": [\"arn:aws:dynamodb:us-east-1:123456789012:table/Orders\", \"arn:aws:logs:*:123456789012:*\"] }",
      "{ \"Effect\": \"Allow\", \"Action\": [\"dynamodb:GetItem\", \"dynamodb:Query\"], \"Resource\": \"*\" }",
      "{ \"Effect\": \"Allow\", \"Action\": \"lambda:InvokeFunction\", \"Resource\": \"*\" }"
    ],
    correctAnswer: 1,
    category: "Identity and Access Management",
    explanation: "Least privilege requires restricting both actions and resources to only what is necessary. The Lambda function needs DynamoDB read actions (GetItem, Query, Scan) on the specific Orders table ARN and CloudWatch Logs actions to write logs. Scoping both actions and resources to the minimum required set is the correct least-privilege approach.",
    optionExplanations: [
      "Using dynamodb:* and logs:* with Resource:* grants far more permissions than necessary. It allows all DynamoDB operations on all tables and all CloudWatch Logs operations, violating least privilege.",
      "✓ Correct: This policy grants only the specific DynamoDB read actions required on the specific table ARN, plus the minimal CloudWatch Logs permissions needed for Lambda logging. Both actions and resources are scoped to the minimum necessary.",
      "Restricting actions to GetItem and Query but using Resource:* allows these actions on any DynamoDB table in any account. The resource should be scoped to the specific Orders table ARN.",
      "lambda:InvokeFunction is unrelated to DynamoDB reads or CloudWatch Logs writes. This policy does not grant the permissions the function actually needs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege", title: "Apply least-privilege permissions" },
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html", title: "Lambda execution role" }
    ]
  },
  {
    id: 13,
    question: "A company's security team wants to receive real-time alerts whenever an IAM root user in any AWS account within the organization performs any API action. The solution must cover all Regions and all existing and future member accounts automatically.\n\nWhich solution meets these requirements?",
    options: [
      "In each member account, create an Amazon CloudWatch metric filter on CloudTrail logs for root user activity. Create a CloudWatch alarm and subscribe an SNS topic.",
      "Create an organization-level AWS CloudTrail trail. In the management account, create an Amazon EventBridge rule that matches the event pattern { \"userIdentity\": { \"type\": \"Root\" } } and routes to an SNS topic.",
      "Enable Amazon GuardDuty in all accounts and configure it to generate findings for root account usage.",
      "Create an AWS Config rule in each account that detects root user login events and triggers an SNS notification."
    ],
    correctAnswer: 1,
    category: "Security Logging and Monitoring",
    explanation: "An organization-level CloudTrail trail automatically captures events from all existing and future member accounts across all Regions. An EventBridge rule in the management account matching Root user identity events provides real-time routing to SNS. This is fully automated and requires no per-account configuration for new accounts.",
    optionExplanations: [
      "Creating a per-account CloudWatch metric filter and alarm requires manual setup in each account and does not automatically cover new accounts. It also requires CloudWatch Logs integration with CloudTrail in each account.",
      "✓ Correct: An organization trail captures all API events from all member accounts automatically. The EventBridge rule filters for Root user type events and triggers SNS notifications in real time, covering all Regions and all current and future accounts.",
      "GuardDuty can generate findings for root account usage but is not designed as a real-time alerting mechanism for every root API call. GuardDuty findings have some processing latency and are not guaranteed to fire on every root action.",
      "AWS Config rules detect configuration compliance states, not real-time API call events. Config cannot trigger alerts on individual API calls such as root user actions."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html", title: "Creating a trail for an organization" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html", title: "CloudTrail events in EventBridge" }
    ]
  },
  {
    id: 14,
    question: "A company hosts a public-facing REST API on Amazon API Gateway backed by AWS Lambda. A penetration test revealed that the API is vulnerable to a slowloris-style DDoS attack that exhausts the available Lambda concurrency. The security team wants to rate-limit requests per client IP address and throttle abusive clients automatically.\n\nWhich solution should the security engineer implement?",
    options: [
      "Enable API Gateway usage plans and API keys. Distribute API keys to clients and set a per-key throttle rate.",
      "Associate an AWS WAF Web ACL with the API Gateway stage. Enable the AWS WAF rate-based rule to limit requests per IP address. Set the rate limit to the desired threshold.",
      "Increase the Lambda function's reserved concurrency to absorb the additional traffic from the attack.",
      "Enable Amazon CloudFront in front of API Gateway and configure CloudFront's built-in IP reputation list."
    ],
    correctAnswer: 1,
    category: "Infrastructure Security",
    explanation: "AWS WAF rate-based rules count requests from each source IP address over a 5-minute window and automatically block IPs that exceed the configured threshold. Associating the WAF Web ACL with the API Gateway stage applies this protection at the edge before Lambda is invoked, directly addressing the concurrency exhaustion attack vector.",
    optionExplanations: [
      "API Gateway usage plans and API keys provide per-client throttling but require clients to include an API key in requests. This does not protect against unauthenticated or forged-key requests and is not suitable for a public API.",
      "✓ Correct: AWS WAF rate-based rules automatically track and block source IPs exceeding the request rate threshold. This directly prevents slowloris and volumetric DDoS attacks from exhausting Lambda concurrency without manual intervention.",
      "Increasing Lambda concurrency allows the function to absorb more requests but does not block the attack. The attacker can simply scale up the attack to exhaust the higher concurrency limit, increasing costs without improving security.",
      "CloudFront with an IP reputation list blocks known malicious IPs but does not rate-limit individual IPs dynamically. It does not address the specific per-IP rate limiting requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based.html", title: "Rate-based rule statement" },
      { url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-aws-waf.html", title: "Use AWS WAF to protect your API Gateway API" }
    ]
  },
  {
    id: 15,
    question: "A company stores sensitive personally identifiable information (PII) in Amazon S3 buckets across multiple AWS accounts. The security team needs to continuously discover and classify all PII data, receive alerts when new PII is found in unexpected buckets, and produce a monthly compliance report.\n\nWhich service and configuration should the security engineer use?",
    options: [
      "Enable Amazon Inspector in all accounts and configure it to scan S3 buckets for sensitive data patterns.",
      "Enable Amazon Macie in all accounts using AWS Organizations delegated administration. Configure Macie to run automated discovery jobs on all S3 buckets. Set up EventBridge rules to forward sensitive data findings to SNS for alerting.",
      "Create AWS Lambda functions that scan S3 objects using Amazon Comprehend for PII detection. Schedule the functions to run monthly.",
      "Enable AWS Config with the s3-bucket-public-read-prohibited rule and configure an SNS notification for non-compliant buckets."
    ],
    correctAnswer: 1,
    category: "Management and Security Governance",
    explanation: "Amazon Macie is purpose-built for discovering and classifying sensitive data in S3, including PII. Enabling Macie via Organizations delegated administration covers all accounts centrally. Automated discovery jobs continuously evaluate S3 buckets. EventBridge rules route Macie findings to SNS for real-time alerts. Macie also generates compliance reports on sensitive data findings.",
    optionExplanations: [
      "Amazon Inspector assesses EC2 instances and container images for vulnerabilities. It does not scan S3 objects for PII or sensitive data classification.",
      "✓ Correct: Amazon Macie is the native AWS service for S3 sensitive data discovery and classification. Organization-level Macie with delegated administration covers all accounts. Automated discovery provides continuous coverage, EventBridge + SNS provides alerts, and Macie's findings dashboard supports compliance reporting.",
      "A custom Lambda + Amazon Comprehend solution requires significant engineering effort, ongoing maintenance, and cost management. It duplicates functionality already provided by Amazon Macie.",
      "The s3-bucket-public-read-prohibited Config rule detects publicly accessible buckets but does not discover or classify sensitive data content within S3 objects."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/macie/latest/user/getting-started.html", title: "Getting started with Amazon Macie" },
      { url: "https://docs.aws.amazon.com/macie/latest/user/data-classification.html", title: "Classifying data with Amazon Macie" }
    ]
  },
  {
    id: 16,
    question: "A security engineer needs to ensure that Amazon EC2 instances in a private subnet can communicate with AWS KMS endpoints without traversing the public internet. The company's security policy prohibits any outbound internet access from the private subnet.\n\nWhich solution meets these requirements?",
    options: [
      "Create a NAT Gateway in a public subnet and configure the private subnet route table to send KMS traffic through the NAT Gateway.",
      "Create an interface VPC endpoint for AWS KMS (com.amazonaws.region.kms) in the VPC. Update the private subnet's security group to allow HTTPS outbound to the endpoint.",
      "Configure a VPN connection between the VPC and the AWS backbone network to route KMS traffic.",
      "Assign Elastic IP addresses to the EC2 instances so they can access the public KMS endpoint directly."
    ],
    correctAnswer: 1,
    category: "Infrastructure Security",
    explanation: "An interface VPC endpoint for AWS KMS creates a private connection between the VPC and KMS using AWS PrivateLink. Traffic never leaves the AWS network and does not require a NAT Gateway, internet gateway, or public IP address. This satisfies the requirement for private subnet communication with KMS without internet access.",
    optionExplanations: [
      "A NAT Gateway provides outbound internet access via a public subnet, which violates the security policy prohibiting internet access from the private subnet.",
      "✓ Correct: An interface VPC endpoint for AWS KMS (powered by AWS PrivateLink) enables EC2 instances in the private subnet to reach KMS via a private IP address within the VPC. No internet gateway or NAT Gateway is required, satisfying the no-internet-access requirement.",
      "AWS Site-to-Site VPN connects on-premises networks to AWS. It does not provide a mechanism to route VPC traffic to AWS service endpoints without internet access.",
      "Assigning Elastic IP addresses exposes the instances directly to the internet, violating the security policy. EIPs also require an internet gateway in the VPC, which introduces internet access."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/kms-vpc-endpoint.html", title: "Connecting to AWS KMS through a VPC endpoint" },
      { url: "https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html", title: "Access AWS services through AWS PrivateLink" }
    ]
  },
  {
    id: 17,
    question: "A company is using AWS Organizations with multiple member accounts. The security team discovers that a member account's administrator has created an IAM role with AdministratorAccess and shared the role ARN with an external third party. The security team wants to prevent any member account from creating IAM roles that can be assumed by principals outside the organization.\n\nWhich control should the security engineer implement?",
    options: [
      "Enable AWS IAM Access Analyzer in each member account and configure it to alert when roles with external trust are created.",
      "Create an SCP that denies iam:CreateRole when the trust policy condition aws:PrincipalOrgID does not match the organization ID. Attach it to the organization root.",
      "Create an SCP that denies iam:CreateRole for all member accounts. Require all role creation to go through the management account.",
      "Enable AWS Config with the iam-no-inline-policy-check rule in all accounts to detect overly permissive roles."
    ],
    correctAnswer: 1,
    category: "Management and Security Governance",
    explanation: "An SCP using a condition that checks aws:PrincipalOrgID can prevent the creation of IAM roles whose trust policy allows principals outside the organization. When a CreateRole API call is made with a trust policy that does not restrict the principal to organization members, the SCP denies the action. This is a preventive control applied across all member accounts.",
    optionExplanations: [
      "IAM Access Analyzer detects existing roles with external trust relationships but is a detective control. It alerts after the role is created and does not prevent the creation of externally trusted roles.",
      "✓ Correct: An SCP with a condition on aws:PrincipalOrgID in the trust policy context prevents member accounts from creating roles that external principals (outside the organization) can assume. This is a preventive, organization-wide guardrail.",
      "Denying all iam:CreateRole for member accounts is overly restrictive and would break legitimate operations. Centralizing all role creation in the management account creates an operational bottleneck.",
      "The iam-no-inline-policy-check Config rule detects inline policies but does not evaluate trust policy conditions or cross-account trust relationships."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples_iam.html", title: "SCP examples for IAM" },
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_analyzer_what-is-access-analyzer.html", title: "What is AWS IAM Access Analyzer?" }
    ]
  },
  {
    id: 18,
    question: "A company's AWS environment generates a large volume of VPC Flow Logs stored in Amazon S3. The security team needs to query these logs to identify all source IP addresses that have attempted to connect to port 22 (SSH) on EC2 instances in the production VPC over the past 30 days. The solution must return results within minutes.\n\nWhich approach should the security engineer use?",
    options: [
      "Download all flow log files from S3 to a local workstation and run grep commands to search for port 22 traffic.",
      "Use Amazon Athena to query the S3-stored flow logs with a SQL query filtering on dstport = 22 and the production VPC CIDR range.",
      "Enable Amazon Detective and use its network traffic analysis to find SSH connection attempts.",
      "Write an AWS Lambda function to read each flow log file from S3 and filter records where the destination port is 22."
    ],
    correctAnswer: 1,
    category: "Security Logging and Monitoring",
    explanation: "Amazon Athena can query VPC Flow Logs stored in S3 directly using standard SQL without moving data. A targeted SQL query filtering on dstport = 22 returns results within seconds to minutes even for large datasets by leveraging S3 partitioning and columnar format optimizations. This is the standard AWS pattern for ad-hoc log analysis at scale.",
    optionExplanations: [
      "Downloading large volumes of flow log files to a local workstation is impractical for 30 days of production traffic. It is slow, requires significant local storage, and does not scale.",
      "✓ Correct: Amazon Athena executes SQL queries directly against S3-stored flow logs using a serverless query engine. A simple WHERE dstport = 22 filter returns all matching records from 30 days of logs within minutes, with no infrastructure to manage.",
      "Amazon Detective is designed for security investigation and threat hunting using pre-built visualizations. It does not support arbitrary SQL queries on raw VPC Flow Log data and may not return results in the required format.",
      "A Lambda function reading individual S3 objects serially is slow for large datasets and requires significant engineering effort. Lambda has execution time limits that make processing 30 days of flow logs impractical."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/vpc-flow-logs.html", title: "Querying Amazon VPC flow logs in Athena" },
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html", title: "Publishing flow logs to Amazon S3" }
    ]
  },
  {
    id: 19,
    question: "A company wants to implement a secrets management solution for its containerized applications running on Amazon EKS. Application pods need to retrieve database credentials stored in AWS Secrets Manager at startup. The credentials must never be stored in environment variables or ConfigMaps in plaintext within the Kubernetes cluster.\n\nWhich solution should the security engineer implement?",
    options: [
      "Store the database credentials as Kubernetes Secrets base64-encoded. Mount them as environment variables in the pod spec.",
      "Use the AWS Secrets and Configuration Provider (ASCP) with the Kubernetes Secrets Store CSI Driver. Mount secrets from Secrets Manager directly as files in the pod's filesystem using an IAM role for service accounts (IRSA).",
      "Create an init container that calls the AWS CLI to retrieve the secret from Secrets Manager and writes it to a shared volume before the main container starts.",
      "Encode the credentials using a custom encryption script and store them in a Kubernetes ConfigMap. Decode them in the application startup script."
    ],
    correctAnswer: 1,
    category: "Data Protection",
    explanation: "The AWS Secrets and Configuration Provider (ASCP) with the Secrets Store CSI Driver is the recommended AWS pattern for mounting Secrets Manager secrets into EKS pods. Secrets are fetched directly from Secrets Manager at pod startup using IRSA (no long-term credentials), mounted as files in the pod's filesystem (not environment variables), and are never stored in Kubernetes etcd. This fully satisfies the no-plaintext requirement.",
    optionExplanations: [
      "Kubernetes Secrets are only base64-encoded (not encrypted by default in etcd unless etcd encryption is configured). Mounting them as environment variables exposes them in the pod's environment, violating the no-plaintext requirement.",
      "✓ Correct: ASCP with the Secrets Store CSI Driver fetches secrets from Secrets Manager directly into the pod's filesystem using IRSA for authentication. Secrets are never stored in Kubernetes etcd as plaintext and are not exposed as environment variables.",
      "An init container writing secrets to a shared volume still stores the secret in plaintext on the pod's volume, which may be accessible to other containers or through volume inspection. It also requires the init container to have AWS credentials.",
      "Encoding credentials in a ConfigMap with a custom script provides no real security — encoding is not encryption. The credentials are effectively stored in plaintext and are accessible to anyone with access to the ConfigMap."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/integrating_csi_driver.html", title: "Use AWS Secrets Manager secrets in Amazon EKS" },
      { url: "https://secrets-store-csi-driver.sigs.k8s.io/concepts.html", title: "Secrets Store CSI Driver concepts" }
    ]
  },
  {
    id: 20,
    question: "A company recently migrated to AWS and wants to establish a security baseline across all accounts. The CISO requires evidence that the environment meets CIS AWS Foundations Benchmark controls. The security team wants a single dashboard showing compliance status across all accounts and the ability to generate compliance reports for auditors.\n\nWhich AWS service combination should the security engineer use?",
    options: [
      "Enable AWS Config in each account. Write custom Config rules for each CIS control. Export results to Amazon S3 and use Amazon QuickSight to build a compliance dashboard.",
      "Enable AWS Security Hub with the CIS AWS Foundations Benchmark standard enabled. Use the Security Hub aggregator to collect findings from all accounts into a central account. Use AWS Audit Manager with the CIS framework to generate audit-ready reports.",
      "Run the AWS Trusted Advisor CIS compliance check weekly and export the results to a spreadsheet for auditors.",
      "Enable Amazon Inspector in all accounts to scan for CIS benchmark deviations on EC2 instances. Use Inspector findings as the compliance evidence."
    ],
    correctAnswer: 1,
    category: "Management and Security Governance",
    explanation: "AWS Security Hub provides built-in support for the CIS AWS Foundations Benchmark standard, which automatically evaluates controls across accounts and Regions. The Security Hub cross-Region aggregator consolidates findings into a single central dashboard. AWS Audit Manager maps Security Hub findings to CIS controls and generates audit-ready evidence reports, addressing all stated requirements.",
    optionExplanations: [
      "Custom Config rules and QuickSight dashboards can work but require significant engineering effort to implement CIS controls as individual rules and build visualizations. Security Hub already provides this natively.",
      "✓ Correct: Security Hub's CIS AWS Foundations Benchmark standard provides automated, continuous compliance checks. The aggregator provides a single multi-account dashboard. Audit Manager generates formatted compliance reports mapped to CIS controls for auditors.",
      "AWS Trusted Advisor provides some best practice checks but does not cover the full CIS AWS Foundations Benchmark. Weekly batch reports are not continuous monitoring and are insufficient for audit evidence.",
      "Amazon Inspector assesses EC2 instances for OS-level vulnerabilities and network exposure. It does not evaluate AWS account-level CIS Benchmark controls such as IAM password policy, CloudTrail configuration, or S3 bucket policies."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/securityhub/latest/userguide/cis-aws-foundations-benchmark.html", title: "CIS AWS Foundations Benchmark standard" },
      { url: "https://docs.aws.amazon.com/audit-manager/latest/userguide/what-is.html", title: "What is AWS Audit Manager?" }
    ]
  },
  {
    id: 21,
    question: "A security engineer is responding to an incident where an attacker has obtained valid AWS credentials from a compromised CI/CD pipeline and has been making API calls for several hours. The engineer has identified the IAM role used by the pipeline and needs to immediately stop all ongoing unauthorized API activity using those credentials without permanently disrupting the pipeline.\n\nWhat is the MOST effective immediate action?",
    options: [
      "Delete the IAM role to immediately invalidate all credentials associated with it.",
      "Navigate to the IAM role, choose 'Revoke active sessions', and add a policy that denies all actions with a condition based on the token issue time before the revocation timestamp.",
      "Change the trust policy of the IAM role to deny AssumeRole from all principals.",
      "Detach all permission policies from the IAM role to remove its privileges."
    ],
    correctAnswer: 1,
    category: "Threat Detection and Incident Response",
    explanation: "The 'Revoke active sessions' feature in IAM adds an inline deny policy (AWSRevokeOlderSessions) to the role with a condition that denies all actions if the token was issued before the revocation time. This immediately invalidates all existing STS tokens without deleting the role or permanently breaking the pipeline. The pipeline can re-assume the role to obtain new valid credentials after the incident is contained.",
    optionExplanations: [
      "Deleting the IAM role permanently removes it, breaking the CI/CD pipeline and requiring manual reconstruction of the role and its permission policies. This causes unnecessary service disruption.",
      "✓ Correct: 'Revoke active sessions' adds a time-conditioned deny policy that invalidates all STS tokens issued before the revocation time. New tokens obtained after revocation are not affected, allowing the pipeline to resume once the compromise is remediated.",
      "Modifying the trust policy stops new AssumeRole calls but does not invalidate existing STS temporary credentials already in the attacker's possession. The attacker can continue using current tokens until they expire.",
      "Detaching permission policies removes privileges but can take time and may miss permissions granted through other mechanisms. It also disrupts legitimate pipeline operations and does not invalidate already-issued STS tokens."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_revoke-sessions.html", title: "Revoking IAM role temporary security credentials" },
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_aws_deny-ip.html", title: "AWS: Denies access based on the source IP" }
    ]
  },
  {
    id: 22,
    question: "A company must ensure that all Amazon EBS volumes attached to EC2 instances in a specific AWS account are encrypted. The company wants to prevent any new unencrypted EBS volumes or snapshots from being created in the account, including volumes created from unencrypted AMIs.\n\nWhich solution enforces this requirement with the LEAST operational overhead?",
    options: [
      "Create an AWS Config rule that checks for unencrypted EBS volumes and triggers an AWS Systems Manager Automation document to encrypt non-compliant volumes.",
      "Enable EBS encryption by default at the account level in each AWS Region. This automatically encrypts all new EBS volumes, snapshots, and copied snapshots.",
      "Attach an SCP to the account that denies ec2:CreateVolume when the Encrypted condition is false.",
      "Create an AWS Lambda function triggered by an EventBridge rule that detects CreateVolume events and immediately deletes unencrypted volumes."
    ],
    correctAnswer: 1,
    category: "Data Protection",
    explanation: "Enabling EBS encryption by default at the account level is a single setting per Region that automatically encrypts all new EBS volumes, snapshots, and volumes created from unencrypted snapshots or AMIs using the specified KMS key. This requires no additional automation, Lambda functions, or SCPs and has zero operational overhead after initial configuration.",
    optionExplanations: [
      "An AWS Config rule with an SSM Automation remediation detects and remediates non-compliant volumes after creation, but there is a window of time where unencrypted volumes exist. Encrypting an existing EBS volume requires creating a new encrypted snapshot and restoring, which is complex.",
      "✓ Correct: The EBS encryption by default setting is the simplest and most effective solution. Once enabled per Region, every new EBS volume, snapshot, and copy is automatically encrypted with the default KMS key. No existing volumes are affected, and no additional automation is required.",
      "An SCP can deny unencrypted volume creation, but SCPs apply at the Organizations level and require careful policy crafting to avoid blocking other legitimate operations. The account-level EBS default encryption setting is simpler and purpose-built for this requirement.",
      "Detecting and deleting unencrypted volumes via Lambda adds operational complexity, incurs cost, and can cause data loss if a volume is deleted before data is migrated. It does not prevent the volume from being created in the first place."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ebs/latest/userguide/encryption-by-default.html", title: "Enable Amazon EBS encryption by default" },
      { url: "https://docs.aws.amazon.com/ebs/latest/userguide/EBSEncryption.html", title: "Amazon EBS encryption" }
    ]
  },
  {
    id: 23,
    question: "A company's security policy requires that all API calls to AWS services must be logged and that any calls made without MFA by IAM users must generate an alert. The solution must work across all accounts in the organization with minimal per-account configuration.\n\nWhich solution should the security engineer implement?",
    options: [
      "In each account, create a CloudWatch metric filter for CloudTrail logs that detects API calls where MultiFactorAuthentication is absent. Create a CloudWatch alarm for each account.",
      "Create an organization-level CloudTrail trail. In the central security account, create an Amazon EventBridge rule that matches CloudTrail API events where userIdentity.sessionContext.attributes.mfaAuthenticated is false and routes to Amazon SNS.",
      "Enable AWS Config in all accounts with the mfa-enabled-for-iam-console-access rule and configure SNS notifications.",
      "Use Amazon GuardDuty to detect IAM users operating without MFA and generate a finding for each occurrence."
    ],
    correctAnswer: 1,
    category: "Security Logging and Monitoring",
    explanation: "An organization-level CloudTrail trail captures all API events from all member accounts. An EventBridge rule in the central account that matches events where mfaAuthenticated is false provides real-time, cross-account alerting with no per-account setup required. New accounts joining the organization are automatically covered by the organization trail.",
    optionExplanations: [
      "Per-account CloudWatch metric filters and alarms require manual setup in each account and do not automatically cover new accounts. This approach has high operational overhead at scale.",
      "✓ Correct: The organization trail ensures all API events are captured centrally. The EventBridge rule with the mfaAuthenticated condition filter provides real-time detection of non-MFA API calls across all accounts from a single configuration point.",
      "The mfa-enabled-for-iam-console-access Config rule checks whether IAM users have MFA enabled for console access — it does not alert on individual API calls made without MFA. This is a compliance check, not a real-time event alert.",
      "GuardDuty does not generate findings specifically for every API call made without MFA. Its threat detection is behavior-based and would not reliably alert on all non-MFA API calls."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-user-identity.html", title: "CloudTrail userIdentity element" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html", title: "CloudTrail events in EventBridge" }
    ]
  },
  {
    id: 24,
    question: "A company runs a multi-tier web application on AWS. The front-end tier is hosted on EC2 instances in a public subnet, and the database tier runs Amazon RDS in a private subnet. A security audit found that the RDS security group allows inbound traffic on port 3306 from 0.0.0.0/0.\n\nWhat is the MOST secure remediation that maintains application functionality?",
    options: [
      "Modify the RDS security group to allow inbound port 3306 from the VPC CIDR block only.",
      "Modify the RDS security group to allow inbound port 3306 only from the security group ID of the front-end EC2 instances.",
      "Deploy an AWS Network Firewall between the public and private subnets and create rules allowing port 3306 from the front-end instances.",
      "Enable RDS encryption and set up SSL/TLS for database connections to protect data in transit."
    ],
    correctAnswer: 1,
    category: "Infrastructure Security",
    explanation: "Referencing the front-end EC2 instance security group ID (rather than CIDR ranges) in the RDS security group is the most precise access control. Only instances belonging to the referenced security group can connect on port 3306, regardless of IP address changes or scaling events. This is the AWS best practice for service-to-service access control within a VPC.",
    optionExplanations: [
      "Allowing traffic from the entire VPC CIDR permits any resource in the VPC (including unrelated resources) to connect to the database. This is broader than necessary and violates least privilege.",
      "✓ Correct: Security group referencing creates a precise, dynamic allow list. Only instances associated with the front-end security group can reach the database port, regardless of IP address or auto-scaling changes. This is the most secure and operationally simple approach.",
      "AWS Network Firewall adds significant cost and operational complexity for a use case that security groups already handle natively. It is better suited for VPC perimeter protection than intra-VPC service-to-service filtering.",
      "Encryption in transit protects data confidentiality but does not restrict which sources can attempt to connect to the database. It does not address the over-permissive security group rule."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html", title: "Security group rules" },
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.RDSSecurityGroups.html", title: "Controlling access with security groups" }
    ]
  },
  {
    id: 25,
    question: "A company wants to grant a third-party auditing firm read-only access to specific AWS resources in their account. The auditors should not need to manage AWS credentials. The access should expire automatically after 90 days and must be limited to CloudTrail logs in S3 and CloudWatch Logs.\n\nWhich approach should the security engineer implement?",
    options: [
      "Create an IAM user for each auditor. Attach a read-only policy scoped to the required resources. Share the access keys via a secure channel. Manually delete the users after 90 days.",
      "Create an IAM role with a read-only policy scoped to the CloudTrail S3 bucket and CloudWatch Logs. Set the trust policy to allow the auditing firm's AWS account to assume the role. Configure a permissions boundary with a validity condition using aws:CurrentTime.",
      "Create an IAM role with the required read-only policy. Set the trust policy to allow the auditing firm's AWS account to assume the role. Communicate the role ARN to the auditing firm and schedule a reminder to delete the role after 90 days.",
      "Generate pre-signed S3 URLs for the CloudTrail log files with a 90-day expiration. Share the URLs with the auditing firm."
    ],
    correctAnswer: 2,
    category: "Identity and Access Management",
    explanation: "Cross-account IAM role assumption is the AWS-recommended approach for granting third-party access. The auditing firm uses their own AWS credentials to assume the role in the company's account, eliminating the need to manage credentials for external users. The role ARN is shared, and the company retains full control by deleting the role after 90 days. IAM condition keys for time-based expiry are not natively available in role trust policies in this way.",
    optionExplanations: [
      "Creating IAM users with long-term access keys requires credential management and secure distribution. Manual deletion after 90 days relies on human processes and carries risk of oversight. Long-term credentials are not preferred.",
      "Permissions boundaries limit the maximum permissions of an identity but cannot enforce time-based expiry natively with aws:CurrentTime in a way that automatically invalidates the role. The cross-account role assumption approach in option C is simpler and more standard.",
      "✓ Correct: A cross-account IAM role with a trust policy for the auditor's AWS account is the cleanest solution. No credentials are shared — auditors use their own AWS identity. The role can be deleted after 90 days, revoking access completely. The policy is scoped to only the required resources.",
      "Pre-signed S3 URLs provide temporary access to specific S3 objects but have a maximum expiration of 7 days (12 hours for IAM role-signed URLs in practice). They cannot cover CloudWatch Logs and are not suitable for structured audit access."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html", title: "Providing access to third parties" },
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html", title: "IAM tutorial: Delegate access across AWS accounts" }
    ]
  },
  {
    id: 26,
    question: "A company's AWS environment is monitored by Amazon GuardDuty, which has generated a finding of type UnauthorizedAccess:EC2/SSHBruteForce targeting multiple EC2 instances. The security team wants to automatically block the source IP addresses identified in GuardDuty findings and prevent future attacks without manual intervention.\n\nWhich automated solution should the security engineer implement?",
    options: [
      "Configure GuardDuty to export findings to Amazon S3. Create a daily batch job that parses the findings and updates security group rules.",
      "Create an Amazon EventBridge rule that triggers when GuardDuty generates a finding. Invoke an AWS Lambda function that reads the source IP from the finding and adds a DENY rule to the relevant VPC Network ACL.",
      "Enable AWS Shield Advanced and configure automatic DDoS response to block brute-force source IPs.",
      "In the GuardDuty console, manually add each attacking IP to the GuardDuty threat list to suppress future findings."
    ],
    correctAnswer: 1,
    category: "Threat Detection and Incident Response",
    explanation: "EventBridge + Lambda provides real-time automated response to GuardDuty findings. When a brute-force finding is generated, the Lambda function extracts the source IP and adds a DENY rule to the Network ACL covering the targeted subnet. Network ACLs are stateless and apply to the entire subnet, making them effective for blocking malicious IPs at the VPC level. This is the standard AWS security automation pattern.",
    optionExplanations: [
      "Daily batch processing introduces up to 24 hours of delay before blocking an attacking IP. During this window, the brute-force attack continues unimpeded. Security group updates are instance-specific and don't scale well for multi-instance protection.",
      "✓ Correct: EventBridge provides near-real-time triggering on GuardDuty findings. The Lambda function can extract the attacker's IP from the finding detail and insert a DENY rule at the lowest available rule number in the Network ACL, blocking the IP across the entire subnet immediately.",
      "AWS Shield Advanced protects against volumetric DDoS attacks, not SSH brute-force attacks, which are application-layer credential stuffing attacks. Shield Advanced cannot add granular IP block rules based on GuardDuty findings.",
      "Adding IPs to a GuardDuty threat list causes GuardDuty to generate findings for traffic involving those IPs but does not block the traffic. It is not a blocking mechanism."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html", title: "Remediating security issues discovered by GuardDuty" },
      { url: "https://aws.amazon.com/blogs/security/how-to-use-amazon-guardduty-and-aws-web-application-firewall-to-automatically-block-suspicious-hosts/", title: "Automatically block suspicious hosts using GuardDuty and WAF" }
    ]
  },
  {
    id: 27,
    question: "A company must implement a solution to detect and alert on any changes made to AWS IAM policies, roles, and users across all accounts in AWS Organizations. The solution must retain all change events for 1 year for forensic purposes and generate real-time alerts to the security team.\n\nWhich combination of services should the security engineer use? (Choose TWO.)",
    options: [
      "Enable AWS Config across all accounts with the iam-policy-no-statements-with-admin-access rule.",
      "Create an organization-level CloudTrail trail delivering logs to a centralized S3 bucket. Enable log file integrity validation.",
      "Create an Amazon EventBridge rule in the central account matching IAM write events (CreatePolicy, AttachRolePolicy, CreateUser, etc.) from all accounts and route to Amazon SNS.",
      "Enable Amazon Detective to analyze IAM activity patterns and generate behavioral anomaly alerts.",
      "Enable AWS Security Hub and activate the AWS Foundational Security Best Practices standard."
    ],
    correctAnswer: [1, 2],
    category: "Security Logging and Monitoring",
    explanation: "An organization-level CloudTrail trail with log file integrity validation provides a tamper-evident, 1-year-retention record of all IAM change events across all accounts. An EventBridge rule matching IAM management events (CreatePolicy, AttachRolePolicy, etc.) in the central account provides real-time SNS alerts without per-account configuration. Together they satisfy both retention and real-time alerting requirements.",
    optionExplanations: [
      "AWS Config rules evaluate the state of IAM policies but are not optimized for real-time change event alerting. The iam-policy-no-statements-with-admin-access rule detects specific policy content violations, not all IAM changes.",
      "✓ Correct: An organization trail captures all IAM API events from all accounts centrally. Log file integrity validation ensures events cannot be tampered with, satisfying the 1-year forensic retention requirement.",
      "✓ Correct: EventBridge rules matching IAM write event names provide real-time, actionable alerts. Routing to SNS notifies the security team immediately when IAM changes occur across any account in the organization.",
      "Amazon Detective analyzes behavior patterns over time but is not designed for real-time alerting on individual IAM change events. It provides investigation capabilities, not proactive change monitoring.",
      "Security Hub aggregates findings but does not generate real-time alerts for every IAM change event. It focuses on compliance standards and security findings, not operational change notifications."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html", title: "Creating a trail for an organization" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html", title: "CloudTrail events in EventBridge" }
    ]
  },
  {
    id: 28,
    question: "A company has enabled AWS Config and receives a finding that an S3 bucket has server access logging disabled. The security team wants to automatically remediate all current and future non-compliant buckets without manual intervention.\n\nWhich approach should the security engineer implement?",
    options: [
      "Create an Amazon EventBridge rule that triggers when Config generates a non-compliant finding and invokes a Lambda function to enable access logging on the bucket.",
      "Configure an AWS Config remediation action on the s3-bucket-logging-enabled rule using the AWS-EnableS3BucketLogging SSM Automation document with auto-remediation enabled.",
      "Create an SCP that denies s3:PutBucketLogging when the value is set to disabled.",
      "Enable AWS Security Hub and activate the S3 logging control. Configure Security Hub to auto-remediate findings."
    ],
    correctAnswer: 1,
    category: "Management and Security Governance",
    explanation: "AWS Config supports native remediation actions that can be triggered automatically when a rule finds non-compliant resources. The AWS-EnableS3BucketLogging Systems Manager Automation document is a pre-built remediation that enables server access logging on an S3 bucket. Enabling auto-remediation on the Config rule ensures both existing and future non-compliant buckets are remediated without manual intervention.",
    optionExplanations: [
      "EventBridge + Lambda can accomplish the remediation but introduces custom code that must be maintained. AWS Config's native remediation using SSM Automation documents is purpose-built for this use case and requires no custom Lambda code.",
      "✓ Correct: Config's built-in remediation with the AWS-EnableS3BucketLogging SSM Automation document and auto-remediation enabled provides fully automated, codeless remediation. Every time a bucket is found non-compliant (at creation or during re-evaluation), it is automatically remediated.",
      "SCPs cannot enforce a specific configuration value on existing or new resources — they only allow or deny API actions. This approach would prevent legitimate logging configuration changes.",
      "Security Hub aggregates Config findings but does not natively auto-remediate them. Remediation in Security Hub requires custom response and remediation playbooks."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/remediation.html", title: "Remediating Noncompliant AWS Resources with AWS Config Rules" },
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-documents-reference-details.html", title: "AWS Systems Manager Automation runbook reference" }
    ]
  },
  {
    id: 29,
    question: "A company has a production VPC and a development VPC connected via VPC peering. A security engineer discovers that a developer accidentally opened a security group rule in the development VPC that allows all inbound traffic from the production VPC CIDR. The engineer needs to detect and prevent similar overly permissive security group rules from being created in the future across all accounts.\n\nWhich solution provides continuous PREVENTIVE and DETECTIVE controls?",
    options: [
      "Train developers on security group best practices and require code reviews for all infrastructure changes.",
      "Enable AWS Config with the restricted-common-ports and vpc-sg-open-only-to-authorized-ports rules for detective control. Create an SCP denying ec2:AuthorizeSecurityGroupIngress when the source is a broad CIDR range (0.0.0.0/0 or the production CIDR).",
      "Enable Amazon Inspector on all EC2 instances to detect network exposure from overly permissive security groups.",
      "Create a Lambda function triggered by EC2 security group change events that reverts unauthorized changes within 5 minutes."
      ],
    correctAnswer: 1,
    category: "Infrastructure Security",
    explanation: "A combination of AWS Config rules (detective) and SCPs (preventive) provides defense in depth. Config rules continuously evaluate security group rules and flag violations. SCPs at the organization level prevent the creation of overly broad ingress rules before they take effect, enforcing least privilege across all accounts proactively.",
    optionExplanations: [
      "Training and code reviews are important but are process controls, not technical controls. They cannot reliably prevent all misconfigurations at scale and provide no automated detection or enforcement.",
      "✓ Correct: AWS Config rules provide continuous detective monitoring of security group configurations. SCPs provide preventive enforcement at the API level, blocking overly permissive rules before they are created. This combination addresses both current violations (Config) and future attempts (SCP).",
      "Amazon Inspector detects network reachability issues but is focused on EC2 vulnerability assessment. It does not provide preventive controls or enforce security group rule policies.",
      "Lambda-based reversion adds a remediation delay (up to minutes) during which the overly permissive rule is active. It is a reactive control, not a preventive one, and introduces operational complexity."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html", title: "List of AWS Config Managed Rules" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples_vpc.html", title: "SCP examples for VPC" }
    ]
  },
  {
    id: 30,
    question: "A company is building a serverless application using AWS Lambda and Amazon API Gateway. The application processes sensitive healthcare data subject to HIPAA compliance. A security review requires that the Lambda function's environment variables containing database connection strings must be encrypted, and all function logs must be retained for 6 years.\n\nWhich configuration satisfies BOTH requirements with the LEAST operational overhead?",
    options: [
      "Encrypt environment variables manually using the AWS CLI before setting them. Store the encrypted values as environment variables. Write Lambda code to decrypt using KMS at runtime. Create a CloudWatch Logs log group with a 6-year retention policy.",
      "In the Lambda function configuration, enable encryption helpers for environment variables using a KMS customer managed key. Create a CloudWatch Logs log group for the function with a retention period of 2192 days (6 years). Attach a resource policy to the log group denying log deletion.",
      "Store connection strings in AWS Secrets Manager. Retrieve them in the Lambda function code at runtime. Enable CloudWatch Logs export to S3 with a 6-year S3 lifecycle policy.",
      "Store connection strings in AWS Systems Manager Parameter Store as SecureString parameters. Set CloudWatch Logs retention to 6 years."
    ],
    correctAnswer: 1,
    category: "Data Protection",
    explanation: "Lambda's built-in encryption helpers allow environment variables to be encrypted at rest using a KMS CMK with minimal configuration — no custom encryption code is needed. CloudWatch Logs supports retention periods up to 10 years (3653 days), and 2192 days equals 6 years. Adding a resource policy denying log deletion provides tamper protection for HIPAA audit trails. This approach minimizes operational overhead while satisfying both requirements.",
    optionExplanations: [
      "Manually encrypting environment variables via CLI requires custom decryption code in the Lambda function and additional KMS API calls at each invocation. Lambda's built-in encryption helpers provide the same security with less operational overhead.",
      "✓ Correct: Lambda encryption helpers natively encrypt environment variables with a KMS CMK without code changes. Setting CloudWatch Logs retention to 2192 days (6 years) and adding a deletion-deny resource policy satisfies the HIPAA 6-year retention requirement with minimal overhead.",
      "Secrets Manager is a valid alternative for connection string storage with automatic rotation support, but the requirement specifically asks about environment variables. CloudWatch Logs export to S3 adds complexity compared to native log retention settings.",
      "Parameter Store SecureString is a valid secrets storage approach but also sidesteps the environment variable encryption requirement. Both options C and D solve the secrets storage problem but not the environment variable encryption requirement stated in the question."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars-encryption.html", title: "Encrypting Lambda environment variables" },
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html", title: "Working with CloudWatch Logs log groups" }
    ]
  }
];
