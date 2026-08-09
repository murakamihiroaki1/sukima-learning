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
  },
  {
    id: 31,
    question: "A company uses AWS Certificate Manager (ACM) to provision TLS certificates for its public-facing Application Load Balancers. A security engineer needs to ensure that all certificates are renewed before expiration and that any certificate expiring within 30 days generates an alert to the security team.\n\nWhich solution requires the LEAST operational overhead?",
    options: [
      "Write a daily Lambda function that calls ACM ListCertificates and checks expiration dates. Send an SNS notification for certificates expiring within 30 days.",
      "Create an Amazon EventBridge rule that matches ACM certificate expiration events (ACM Certificate Approaching Expiration) and routes them to an SNS topic. ACM automatically renews managed certificates before expiration.",
      "Enable AWS Config with the acm-certificate-expiration-check rule set to a 30-day threshold and configure an SNS notification for non-compliant resources.",
      "Use AWS Health to monitor ACM certificate expiration events and configure Health event notifications via Amazon CloudWatch Events."
    ],
    correctAnswer: 1,
    category: "Infrastructure Security",
    explanation: "ACM automatically renews public certificates that are associated with AWS services like ALB before expiration (typically 60 days before). EventBridge natively receives ACM certificate expiration approach events and can route them to SNS with no custom code. This combination provides automated renewal and alerting with zero operational overhead.",
    optionExplanations: [
      "A custom Lambda function duplicates functionality already provided natively by ACM and EventBridge. It requires ongoing maintenance and incurs Lambda execution costs.",
      "✓ Correct: ACM automatically attempts to renew certificates used with ALBs. EventBridge receives the ACM 'Certificate Approaching Expiration' event and routes it to SNS, providing automated alerting. No custom code or infrastructure management is required.",
      "AWS Config's acm-certificate-expiration-check rule evaluates certificate expiration compliance but introduces a polling delay. EventBridge provides near-real-time event-driven alerting for the same use case.",
      "AWS Health does publish ACM expiration events, but EventBridge directly integrating with ACM's native events is the more straightforward and standard approach for this use case."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html", title: "Managed renewal for ACM certificates" },
      { url: "https://docs.aws.amazon.com/acm/latest/userguide/acm-eventbridge.html", title: "Using EventBridge with ACM" }
    ]
  },
  {
    id: 32,
    question: "A financial services company stores customer transaction data in Amazon DynamoDB. A compliance requirement mandates that any modification to the data must be logged with the before and after values, and these logs must be retained for 5 years. The solution must not impact DynamoDB write performance.\n\nWhich solution meets ALL requirements?",
    options: [
      "Enable AWS CloudTrail data events for DynamoDB to capture all API calls. Store CloudTrail logs in S3 with a 5-year retention lifecycle policy.",
      "Enable DynamoDB Streams on the table. Create an AWS Lambda function triggered by the stream to capture before and after images of changed items and write them to an S3 bucket with a 5-year lifecycle policy.",
      "Enable DynamoDB point-in-time recovery (PITR). Use PITR snapshots as the audit log for compliance purposes.",
      "Create an application-layer audit log that records every write operation before and after values. Store logs in Amazon RDS with a 5-year retention policy."
    ],
    correctAnswer: 1,
    category: "Security Logging and Monitoring",
    explanation: "DynamoDB Streams captures a time-ordered sequence of item-level modifications with both the before (OLD_IMAGE) and after (NEW_IMAGE) values. Lambda triggered by the stream asynchronously processes records without impacting DynamoDB write latency. Writing to S3 with a lifecycle policy satisfies the 5-year retention requirement. This is the standard AWS pattern for DynamoDB change data capture.",
    optionExplanations: [
      "CloudTrail data events for DynamoDB capture API calls (PutItem, UpdateItem, DeleteItem) but do not include the actual before and after data values of the items. CloudTrail records the API call metadata, not the item content.",
      "✓ Correct: DynamoDB Streams with BOTH_OLD_AND_NEW_IMAGES stream view type captures the complete before and after state of each modified item. Lambda processes records asynchronously, causing no additional latency on DynamoDB write operations. S3 with lifecycle policy satisfies 5-year retention.",
      "PITR allows restoration of the table to any point in time but is not an audit log. It does not provide a queryable record of individual changes with before/after values and cannot be retained independently for 5 years.",
      "An application-layer audit log requires modifying all write paths in the application, creating a maintenance burden. It is also subject to bypass if direct DynamoDB access occurs outside the application."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html", title: "Change data capture for DynamoDB Streams" },
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.html", title: "Using AWS Lambda with DynamoDB Streams" }
    ]
  },
  {
    id: 33,
    question: "A company is using AWS IAM Identity Center (formerly AWS SSO) to manage access to multiple AWS accounts. A security engineer needs to ensure that any user who has not logged in for 90 days has their account automatically disabled, and an alert is sent to the security team.\n\nWhich solution should the security engineer implement?",
    options: [
      "Manually review IAM Identity Center user activity reports monthly and disable inactive accounts.",
      "Create an Amazon EventBridge scheduled rule that triggers a Lambda function daily. The function queries IAM Identity Center using the IdentityStore API to find users whose last login exceeds 90 days, disables them, and sends an SNS notification.",
      "Enable AWS Config with the iam-user-unused-credentials-check rule set to 90 days to detect inactive IAM Identity Center users.",
      "Set an IAM password policy requiring password changes every 90 days. Users who do not log in will have expired passwords and be unable to sign in."
    ],
    correctAnswer: 1,
    category: "Identity and Access Management",
    explanation: "IAM Identity Center does not have a native built-in inactive user detection and auto-disable feature. A scheduled EventBridge rule triggering a Lambda function that queries the IdentityStore API for user last login timestamps, disables inactive users, and sends SNS notifications is the recommended automated approach.",
    optionExplanations: [
      "Manual monthly reviews cannot guarantee 90-day enforcement and rely on human processes that are error-prone. This does not meet an automated enforcement requirement.",
      "✓ Correct: EventBridge scheduling with Lambda provides automated, daily enforcement. The Lambda function uses the IdentityStore API (ListUsers, DescribeUser) and IAM Identity Center APIs to check last authentication times and disable users exceeding the 90-day threshold, then notifies via SNS.",
      "The iam-user-unused-credentials-check Config rule evaluates standard IAM users, not IAM Identity Center identities. These are separate identity stores and the Config rule does not apply to Identity Center users.",
      "Password expiration policies apply to IAM user console passwords, not IAM Identity Center users. Identity Center users authenticate through the Identity Center portal, not standard IAM password policies."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html", title: "What is IAM Identity Center?" },
      { url: "https://docs.aws.amazon.com/singlesignon/latest/IdentityStoreAPIReference/welcome.html", title: "IAM Identity Store API Reference" }
    ]
  },
  {
    id: 34,
    question: "A company's application stores sensitive data in Amazon S3. A security engineer discovers that one of the S3 buckets has a bucket policy that allows public read access (Principal: \"*\"). The engineer needs to immediately prevent public access to ALL S3 buckets in the account, including future buckets, and ensure this setting cannot be overridden by bucket-level policies.\n\nWhich action should the security engineer take?",
    options: [
      "Update each bucket policy to remove the public access statement and add a Deny for s3:GetObject from Principal: \"*\".",
      "Enable S3 Block Public Access at the account level with all four settings enabled (BlockPublicAcls, IgnorePublicAcls, BlockPublicPolicy, RestrictPublicBuckets).",
      "Create an SCP that denies s3:PutBucketPolicy when the policy contains Principal: \"*\" and attach it to the account.",
      "Enable Amazon Macie to detect publicly accessible buckets and trigger automatic remediation."
    ],
    correctAnswer: 1,
    category: "Data Protection",
    explanation: "S3 Block Public Access at the account level applies to all existing and future buckets. When all four settings are enabled, AWS ignores any bucket or object ACLs that grant public access and blocks any bucket policies that allow public access. This is the single, account-wide control that overrides individual bucket configurations and cannot be bypassed by bucket policies.",
    optionExplanations: [
      "Updating each bucket policy individually is operationally intensive and does not cover future buckets. New buckets with permissive policies would require manual remediation each time.",
      "✓ Correct: S3 Block Public Access at the account level is the definitive control for preventing public S3 access. All four settings together ensure existing ACLs and policies granting public access are ignored and new ones are blocked, regardless of individual bucket configurations.",
      "An SCP preventing public bucket policies is a useful preventive control but does not address existing public bucket policies or ACLs. It also requires careful crafting to avoid blocking legitimate policy updates.",
      "Amazon Macie detects publicly accessible buckets as findings but does not provide automated remediation. It is a detective control, not a preventive one, and cannot block public access directly."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html", title: "Blocking public access to your Amazon S3 storage" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/configuring-block-public-access-account.html", title: "Configuring block public access settings for your account" }
    ]
  },
  {
    id: 35,
    question: "A security engineer is conducting a forensic investigation of a potentially compromised Amazon EC2 instance. The engineer needs to preserve the instance's current state for forensic analysis while ensuring the investigation does not interfere with the running production environment.\n\nWhich steps should the engineer take? (Choose THREE.)",
    options: [
      "Terminate the EC2 instance immediately to stop further damage.",
      "Create an EBS snapshot of all volumes attached to the instance while it is still running.",
      "Isolate the instance by modifying its security group to deny all inbound and outbound traffic except from the forensic workstation.",
      "Enable VPC Flow Logs on the VPC if not already enabled to capture network activity.",
      "Detach the IAM role from the instance to prevent further AWS API calls from the potentially compromised instance."
    ],
    correctAnswer: [1, 2, 4],
    category: "Threat Detection and Incident Response",
    explanation: "Forensic best practice requires preserving evidence, isolating the threat, and limiting further damage without destroying data. Taking EBS snapshots preserves disk state, isolating the instance stops network-based attack propagation, and detaching the IAM role prevents the instance from making further AWS API calls. Termination destroys volatile memory and disk evidence.",
    optionExplanations: [
      "Terminating the instance destroys all volatile memory, running processes, and temporary files that may contain critical forensic evidence such as malware artifacts, attacker tools, or lateral movement traces.",
      "✓ Correct: EBS snapshots capture the disk state at the time of snapshot creation, preserving filesystem artifacts, malware, configuration changes, and log files for offline forensic analysis without affecting the running instance.",
      "✓ Correct: Isolating the instance by restricting its security group to allow only forensic workstation access stops the attacker from continuing operations (C2 communication, data exfiltration) while keeping the instance running for memory analysis.",
      "VPC Flow Logs capture network traffic metadata but enabling them after the incident only captures future traffic. They do not preserve already-occurred network activity unless they were pre-enabled.",
      "✓ Correct: Detaching the IAM role prevents the potentially compromised instance from making further AWS API calls (creating resources, accessing other services, exfiltrating data via AWS APIs) while preserving the instance for forensic analysis."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/whitepapers/latest/aws-security-incident-response-guide/containment.html", title: "AWS Security Incident Response Guide - Containment" },
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-creating-snapshot.html", title: "Create Amazon EBS snapshots" }
    ]
  },
  {
    id: 36,
    question: "A company wants to enforce that all Amazon RDS instances in its AWS accounts are not publicly accessible and are always encrypted at rest. These requirements must be enforced preventively so that non-compliant RDS instances can never be launched.\n\nWhich solution enforces BOTH requirements preventively across all member accounts in AWS Organizations?",
    options: [
      "Enable AWS Config with the rds-instance-public-access-check and rds-storage-encrypted rules in all accounts.",
      "Create an SCP with two deny statements: one denying rds:CreateDBInstance when the PubliclyAccessible attribute is true, and another denying rds:CreateDBInstance when StorageEncrypted is false. Attach the SCP to the organization root.",
      "Enable Amazon GuardDuty RDS Protection across all accounts to detect publicly accessible or unencrypted RDS instances.",
      "Create an AWS Lambda function triggered by CloudTrail events for rds:CreateDBInstance. If the instance is public or unencrypted, the function immediately deletes it."
    ],
    correctAnswer: 1,
    category: "Management and Security Governance",
    explanation: "SCPs at the organization root level apply to all member accounts and provide preventive enforcement at the API level. Denying rds:CreateDBInstance when PubliclyAccessible=true or StorageEncrypted=false prevents non-compliant instances from ever being created, regardless of account-level IAM permissions.",
    optionExplanations: [
      "AWS Config rules are detective controls that identify non-compliant resources after they are created. They do not prevent the creation of publicly accessible or unencrypted RDS instances.",
      "✓ Correct: SCPs with conditions on the rds:CreateDBInstance API call parameters enforce preventive controls at the API level. The management account and other excluded principals can still create instances as needed. This applies organization-wide with no per-account configuration.",
      "GuardDuty RDS Protection detects anomalous login activity and threats to RDS databases. It does not enforce configuration requirements like public accessibility or encryption settings.",
      "Lambda-based deletion creates a window where a non-compliant instance exists before being deleted. CloudTrail event processing latency can allow the instance to be briefly active. This is a reactive control, not preventive."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" },
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.html", title: "Security in Amazon RDS" }
    ]
  },
  {
    id: 37,
    question: "A company uses Amazon Route 53 for DNS management. A security engineer is concerned about DNS hijacking attacks where an attacker could modify DNS records to redirect traffic to malicious infrastructure. The engineer wants to implement a solution to detect unauthorized DNS changes in real time.\n\nWhich solution should the security engineer implement?",
    options: [
      "Enable DNSSEC signing on the Route 53 hosted zone to prevent DNS record tampering.",
      "Create an Amazon EventBridge rule that matches Route 53 ChangeResourceRecordSets API calls recorded by CloudTrail and routes them to an SNS topic for real-time alerting.",
      "Enable Amazon GuardDuty DNS logs analysis to detect DNS hijacking attempts.",
      "Configure Route 53 health checks on all DNS records and set up CloudWatch alarms for health check failures."
    ],
    correctAnswer: 1,
    category: "Security Logging and Monitoring",
    explanation: "CloudTrail records all Route 53 ChangeResourceRecordSets API calls. An EventBridge rule that matches these events provides real-time notification whenever a DNS record is modified. This allows the security team to immediately investigate whether a change was authorized. This is the standard pattern for real-time DNS change detection.",
    optionExplanations: [
      "DNSSEC prevents resolvers from accepting forged DNS responses (cache poisoning) but does not prevent an authenticated AWS user or compromised credentials from modifying Route 53 records via the API. It does not detect unauthorized API-level changes.",
      "✓ Correct: CloudTrail captures every Route 53 DNS change via ChangeResourceRecordSets. EventBridge provides near-real-time event routing to SNS, alerting the security team immediately when any DNS record change occurs regardless of whether it is authorized or not.",
      "GuardDuty DNS logs analysis detects anomalous DNS query patterns (e.g., DNS tunneling, communication with known malicious domains) but does not monitor or detect changes to Route 53 hosted zone records.",
      "Route 53 health checks monitor endpoint availability but do not detect DNS record changes. A health check failure indicates an endpoint is unreachable but may not reveal that a DNS record was modified to point to malicious infrastructure."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/logging-using-cloudtrail.html", title: "Logging Amazon Route 53 API calls with AWS CloudTrail" },
      { url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring-dnssec.html", title: "Configuring DNSSEC signing in Amazon Route 53" }
    ]
  },
  {
    id: 38,
    question: "A company runs a microservices application on Amazon ECS with tasks using the awsvpc network mode. Each microservice needs to call specific AWS APIs (e.g., DynamoDB, S3). A security engineer must ensure each microservice has only the minimum required permissions and that credentials are not shared between services.\n\nWhich approach should the security engineer implement?",
    options: [
      "Create a single IAM role with all required permissions for all microservices and attach it to the ECS cluster.",
      "Create a separate IAM task role for each microservice with only the permissions that service requires. Assign each task definition its own task role.",
      "Create an IAM user for each microservice, generate access keys, and inject them as environment variables in the task definition.",
      "Use the EC2 instance profile of the underlying EC2 instances to grant permissions to all ECS tasks running on those instances."
    ],
    correctAnswer: 1,
    category: "Identity and Access Management",
    explanation: "ECS task roles allow granular IAM permissions per task definition. Each microservice gets a dedicated IAM role with only the permissions it needs, following least privilege. The credentials are provided via the ECS task metadata endpoint (not stored as environment variables) and are automatically rotated. This ensures complete credential isolation between services.",
    optionExplanations: [
      "A single shared IAM role for all microservices violates least privilege. If one service is compromised, the attacker gains the permissions of all other services. There is no isolation between service permissions.",
      "✓ Correct: ECS task roles are the purpose-built mechanism for per-task IAM permissions. Each task receives temporary credentials via the task metadata service, scoped only to the task's assigned role. This provides least privilege and complete credential isolation between microservices.",
      "IAM user access keys are long-term credentials that require manual rotation, secure storage, and distribution. Injecting them as environment variables exposes them in task definitions and CloudWatch Logs. This is explicitly an anti-pattern for ECS.",
      "EC2 instance profile credentials are shared by all tasks running on the instance, regardless of which microservice is running. This provides no isolation and is not recommended when task-level isolation is required."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html", title: "IAM roles for tasks in Amazon ECS" },
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/security-iam-roles.html", title: "IAM roles for ECS best practices" }
    ]
  },
  {
    id: 39,
    question: "A company must comply with a regulation requiring all network traffic between its on-premises data center and AWS to be encrypted in transit using AES-256. The connection must provide consistent throughput of at least 1 Gbps. The company already has an AWS Direct Connect connection.\n\nWhich solution meets BOTH the encryption and throughput requirements?",
    options: [
      "Use AWS Direct Connect with a public VIF. Configure IPsec VPN over the Direct Connect connection using AWS Site-to-Site VPN.",
      "Use AWS Direct Connect with a private VIF. Enable MACsec encryption on the Direct Connect connection.",
      "Use an AWS Site-to-Site VPN over the public internet with AES-256 encryption. Increase bandwidth by adding multiple VPN tunnels.",
      "Use AWS Direct Connect with a transit VIF and enable TLS 1.3 for all application-level communication."
    ],
    correctAnswer: 1,
    category: "Infrastructure Security",
    explanation: "MACsec (IEEE 802.1AE) is a Layer 2 encryption standard supported on AWS Direct Connect dedicated connections (10 Gbps and 100 Gbps). It provides wire-speed AES-256 encryption on the Direct Connect link without introducing VPN overhead or latency. This maintains the full bandwidth of the Direct Connect connection while satisfying the AES-256 encryption requirement.",
    optionExplanations: [
      "IPsec VPN over Direct Connect (a.k.a. Direct Connect + VPN) provides AES-256 encryption and uses the Direct Connect bandwidth, but VPN processing overhead reduces effective throughput and adds latency. For 1 Gbps+ consistent throughput, MACsec is preferred.",
      "✓ Correct: MACsec on Direct Connect provides hardware-accelerated AES-256 GCM encryption at Layer 2, operating at line rate (1 Gbps, 10 Gbps, or 100 Gbps depending on connection speed) with negligible overhead. It requires a dedicated Direct Connect connection (not hosted connections) and a MACsec-capable router.",
      "Site-to-Site VPN over the public internet cannot guarantee consistent 1 Gbps throughput due to internet routing variability and VPN bandwidth limits (each tunnel is capped at 1.25 Gbps aggregate). The company already has Direct Connect, making VPN over the internet suboptimal.",
      "TLS provides application-layer encryption for specific protocols but does not encrypt all network traffic at the transport layer. Network-level traffic such as ICMP, routing protocols, or non-TLS applications would remain unencrypted."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/MACsec.html", title: "MACsec encryption in AWS Direct Connect" },
      { url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/encryption-in-transit.html", title: "Encryption in AWS Direct Connect" }
    ]
  },
  {
    id: 40,
    question: "A security engineer is reviewing the AWS Organizations structure. The management account currently has all production workloads deployed directly in it. The security team wants to implement a security baseline that prevents any IAM user or role in the management account from being denied actions by SCPs, ensuring the management account cannot be accidentally locked out.\n\nWhat should the security engineer understand about this situation?",
    options: [
      "SCPs apply to the management account just like all other member accounts. The engineer must carefully craft SCPs to include an exception for the management account's root user.",
      "SCPs never apply to the management account regardless of where they are attached. Moving workloads to member accounts and using SCPs for governance is the recommended approach.",
      "SCPs apply to all accounts except when the root user is performing actions. The engineer should use the root user for all sensitive management account operations.",
      "The engineer can attach a special 'management account exclusion' SCP at the root level to exempt the management account from all other SCPs."
    ],
    correctAnswer: 1,
    category: "Management and Security Governance",
    explanation: "This is a fundamental AWS Organizations design principle: SCPs do NOT apply to the management account, even if attached at the root OU level. This is by design to prevent accidental lockout of the account that manages the organization. However, this means that the management account cannot be governed by SCPs, which is why AWS strongly recommends NOT running production workloads in the management account.",
    optionExplanations: [
      "This is incorrect. SCPs do not apply to the management account at all, so there is no need to craft exceptions. The management account is inherently exempt from all SCPs, which is a fixed AWS behavior.",
      "✓ Correct: SCPs never apply to the management account, regardless of SCP configuration. This is an AWS Organizations fundamental design constraint. AWS best practice is to keep the management account free of workloads and use dedicated member accounts governed by SCPs for all production environments.",
      "While root user actions have some special behaviors, the key point is that SCPs as a whole do not apply to the management account — not just root user actions. All IAM principals in the management account are exempt from SCPs.",
      "There is no 'management account exclusion' SCP mechanism. The exemption is hardcoded AWS behavior, not a configurable SCP. Creating such an SCP is neither possible nor necessary."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#scp-effects-on-permissions", title: "SCP effects on permissions" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_best-practices_mgmt-acct.html", title: "Best practices for the management account" }
    ]
  },
  {
    id: 41,
    question: "A company uses Amazon S3 to store confidential documents. A security requirement states that uploads to a specific bucket must be encrypted with a particular customer managed AWS KMS key, and uploads that use SSE-S3 or a different KMS key must be rejected.\n\nWhich solution should the security engineer implement?",
    options: [
      "Configure default bucket encryption with SSE-S3 and rely on application teams to choose the correct KMS key when needed.",
      "Add an S3 bucket policy that denies s3:PutObject unless the request includes s3:x-amz-server-side-encryption = aws:kms and s3:x-amz-server-side-encryption-aws-kms-key-id equal to the required KMS key ARN.",
      "Create an SCP that denies s3:PutObject for all buckets unless the aws:SecureTransport condition is true.",
      "Enable S3 Block Public Access for the account and configure the bucket with versioning enabled."
    ],
    correctAnswer: 1,
    category: "Data Protection",
    explanation: "An S3 bucket policy can enforce both the encryption type and the exact KMS key used for uploads. By denying PutObject unless the request specifies aws:kms and the required KMS key ARN, the bucket rejects uploads using SSE-S3, SSE-C, or any other KMS key. This is the most direct way to enforce the requirement at the bucket boundary.",
    optionExplanations: [
      "Default bucket encryption helps when clients omit encryption headers, but it does not reliably reject uploads that explicitly request SSE-S3 or a different KMS key. The requirement is to reject non-compliant uploads, not just apply a default.",
      "✓ Correct: A bucket policy using condition keys for s3:x-amz-server-side-encryption and s3:x-amz-server-side-encryption-aws-kms-key-id enforces both SSE-KMS and the exact customer managed key required for every object upload.",
      "An SCP with aws:SecureTransport enforces TLS in transit, not the server-side encryption settings or the specific KMS key used for S3 object uploads.",
      "Block Public Access and versioning are useful controls, but they do not enforce server-side encryption with a specific KMS key for uploaded objects."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html", title: "Protecting data using server-side encryption with AWS KMS" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html", title: "Amazon S3 bucket policy examples" }
    ]
  },
  {
    id: 42,
    question: "A company uses Amazon ECR to store container images for production workloads running on Amazon ECS. The security team needs to ensure that images are scanned for vulnerabilities automatically when they are pushed, and any image with critical findings must not be deployed.\n\nWhich solution provides the MOST secure implementation with the LEAST custom code?",
    options: [
      "Enable basic or enhanced image scanning on the ECR repository, and add a CI/CD pipeline step that checks the scan findings and blocks deployment when critical vulnerabilities are present.",
      "Run Amazon Inspector agents on ECS tasks so the containers are scanned after deployment. Terminate tasks with critical vulnerabilities.",
      "Export ECR images to Amazon S3 and run a custom Lambda function to inspect each image layer for known CVEs.",
      "Use AWS Config to detect whether the ECR repository has image scanning enabled, and manually review the findings before each deployment."
    ],
    correctAnswer: 0,
    category: "Infrastructure Security",
    explanation: "Amazon ECR natively supports automatic image vulnerability scanning on push. The cleanest implementation is to enable scanning and enforce a deployment gate in the CI/CD pipeline that queries the scan results and blocks promotion when critical findings exist. This uses native AWS capabilities with only minimal pipeline logic and avoids post-deployment exposure.",
    optionExplanations: [
      "✓ Correct: ECR native image scanning automatically scans pushed images, and a CI/CD gate can stop vulnerable images from reaching production. This prevents deployment rather than detecting issues only after runtime.",
      "Amazon Inspector for runtime environments is valuable, but scanning only after deployment does not meet the requirement to prevent vulnerable images from being deployed in the first place.",
      "Exporting images to S3 and building a custom vulnerability scanner duplicates functionality already provided by ECR and Inspector, adding unnecessary complexity and maintenance.",
      "AWS Config can detect whether scanning is enabled, but it does not evaluate the actual vulnerability findings or prevent deployment of images with critical CVEs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html", title: "Amazon ECR image scanning" },
      { url: "https://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html", title: "Scanning Amazon ECR container images with Amazon Inspector" }
    ]
  },
  {
    id: 43,
    question: "A company has an AWS Site-to-Site VPN connection to its on-premises network. A security engineer must ensure that only the on-premises network 10.50.0.0/16 can access an application subnet in AWS, and all other inbound traffic from the VPN must be blocked before it reaches the EC2 instances.\n\nWhich control should the engineer use?",
    options: [
      "Add inbound rules to the EC2 instances' security group allowing the required ports only from 10.50.0.0/16.",
      "Create a Network ACL for the application subnet that allows required inbound traffic from 10.50.0.0/16 and denies all other inbound traffic.",
      "Attach an IAM policy to the VPN connection restricting packets from other CIDR ranges.",
      "Create an AWS WAF Web ACL and associate it with the application subnet."
    ],
    correctAnswer: 1,
    category: "Infrastructure Security",
    explanation: "The requirement is to block unauthorized inbound VPN traffic before it reaches the EC2 instances. Network ACLs operate at the subnet boundary, so they evaluate traffic before it is delivered to instances. A subnet NACL that allows the approved on-premises CIDR and denies other inbound traffic best satisfies this requirement.",
    optionExplanations: [
      "Security groups are stateful instance-level firewalls and are an important control, but traffic still reaches the instance's ENI for security group evaluation. The question specifically asks to block traffic before it reaches the EC2 instances.",
      "✓ Correct: Network ACLs are stateless subnet-level filters that can explicitly allow traffic from 10.50.0.0/16 and deny other inbound sources, stopping unauthorized VPN traffic at the subnet boundary.",
      "IAM policies control AWS API permissions and do not filter network packets traversing a Site-to-Site VPN connection.",
      "AWS WAF protects HTTP/HTTPS applications at supported Layer 7 integrations such as CloudFront, ALB, and API Gateway. It cannot be attached to a subnet to filter VPN network traffic."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html", title: "Control traffic to subnets using network ACLs" },
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/working-with-aws-managed-prefix-lists.html", title: "Managed prefix lists" }
    ]
  },
  {
    id: 44,
    question: "A company wants to centralize AWS Config findings from all accounts and Regions into a single security account. The solution must automatically include new AWS accounts added to AWS Organizations and allow the security team to review compliance posture centrally.\n\nWhich solution should the security engineer implement?",
    options: [
      "In each member account, export AWS Config findings daily to Amazon S3 in the security account and build a custom dashboard.",
      "Create an AWS Config aggregator in the security account and authorize organization-wide data aggregation using AWS Organizations.",
      "Enable AWS Security Hub in all accounts and rely only on Security Hub findings instead of AWS Config.",
      "Create cross-account IAM roles in every member account and have administrators manually query Config in each Region."
    ],
    correctAnswer: 1,
    category: "Management and Security Governance",
    explanation: "AWS Config aggregators are purpose-built to collect configuration and compliance data from multiple accounts and Regions into one place. When configured with AWS Organizations integration, new accounts are included automatically, which meets the requirement for centralized, low-overhead compliance visibility.",
    optionExplanations: [
      "Daily S3 exports require custom code or processes, do not provide near-real-time centralized visibility, and add unnecessary operational overhead compared to native Config aggregation.",
      "✓ Correct: An organization-wide AWS Config aggregator centralizes compliance results across accounts and Regions in a designated account and automatically includes newly added organization accounts.",
      "Security Hub is valuable for aggregating security findings, but the question specifically asks for centralizing AWS Config findings and compliance posture. Config aggregator is the native answer.",
      "Manual cross-account querying is operationally heavy and does not automatically include new accounts or provide a consolidated compliance view."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html", title: "Aggregating AWS Config data" },
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/aggregated-view.html", title: "Multi-account multi-Region data aggregation" }
    ]
  },
  {
    id: 45,
    question: "A security engineer needs to ensure that Amazon CloudWatch Logs log groups containing audit logs are encrypted at rest with a customer managed AWS KMS key and that the same key cannot be scheduled for deletion by application administrators.\n\nWhich combination of controls should the engineer implement? (Choose TWO.)",
    options: [
      "Associate the CloudWatch Logs log groups with a customer managed KMS key.",
      "Use an AWS managed key for CloudWatch Logs and rely on CloudTrail for auditing key deletion attempts.",
      "Add a key policy or IAM policy that denies kms:ScheduleKeyDeletion except for a dedicated security administrator role.",
      "Enable CloudWatch Logs data protection to mask sensitive fields in log events.",
      "Store audit logs in an unencrypted log group and export them daily to an encrypted S3 bucket."
    ],
    correctAnswer: [0, 2],
    category: "Data Protection",
    explanation: "To meet the requirement, the log groups must use a customer managed KMS key for encryption, and permissions around that key must prevent application administrators from scheduling deletion. Restricting kms:ScheduleKeyDeletion to a dedicated security role ensures key lifecycle control remains separated from application administration.",
    optionExplanations: [
      "✓ Correct: CloudWatch Logs supports encryption at rest using a customer managed KMS key, which satisfies the customer-control requirement for log group encryption.",
      "AWS managed keys cannot be administered with custom deletion restrictions by the customer. This does not satisfy the requirement to prevent application administrators from scheduling deletion of the key.",
      "✓ Correct: Denying kms:ScheduleKeyDeletion except for a dedicated security administrator role prevents application administrators from deleting the key, preserving access to the audit logs.",
      "CloudWatch Logs data protection helps identify and mask sensitive data patterns in logs, but it does not enforce encryption with a customer managed key or protect the KMS key from deletion.",
      "Leaving the log group unencrypted does not meet the stated requirement, and daily export adds delay and operational overhead."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html", title: "Encrypt log data in CloudWatch Logs using AWS KMS" },
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys-scheduling-key-deletion.html", title: "Scheduling key deletion" }
    ]
  },
  {
    id: 46,
    question: "A company wants to ensure that all IAM users in an AWS account rotate their console passwords every 90 days and that any user whose password is older than 90 days is prevented from signing in until the password is changed.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create an EventBridge scheduled rule and Lambda function that deletes IAM users whose passwords are older than 90 days.",
      "Configure the account IAM password policy with a maximum password age of 90 days.",
      "Enable AWS Config with the iam-user-unused-credentials-check rule set to 90 days.",
      "Require all IAM users to use access keys only and disable console access."
    ],
    correctAnswer: 1,
    category: "Identity and Access Management",
    explanation: "IAM account password policies natively support maximum password age. Setting the maximum password age to 90 days forces IAM users to change expired console passwords before they can complete sign-in. This is the direct built-in control for the requirement and has minimal operational overhead.",
    optionExplanations: [
      "Deleting users is overly destructive and unnecessary. The requirement is to force password rotation and block sign-in until the password is changed, not remove user identities entirely.",
      "✓ Correct: The IAM account password policy supports a maximum password age setting. When set to 90 days, IAM users with expired passwords must reset them before they can continue signing in.",
      "The iam-user-unused-credentials-check rule identifies unused credentials for IAM users, but it does not enforce console password rotation or block sign-in based on password age.",
      "Disabling console access changes the authentication model entirely and does not satisfy the requirement to rotate console passwords every 90 days."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html", title: "Setting an account password policy for IAM users" },
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_admin-change-user.html", title: "Managing passwords for IAM users" }
    ]
  },
  {
    id: 47,
    question: "A company uses Amazon EventBridge to route security events to a central account. The security team wants to ensure that member accounts can send events to the central event bus, but they must not be able to put events onto any other event bus in the organization.\n\nWhich approach should the security engineer implement?",
    options: [
      "In each member account, attach AdministratorAccess to the role that sends EventBridge events.",
      "On the central event bus, add a resource policy that allows events:PutEvents only from specific member account IDs or the AWS Organizations ID. In member accounts, grant the sender role permission only for events:PutEvents to the central event bus ARN.",
      "Create an SCP that denies all EventBridge actions in member accounts, including events:PutEvents.",
      "Use Amazon SNS topics instead of EventBridge because SNS automatically restricts cross-account publishing."
    ],
    correctAnswer: 1,
    category: "Security Logging and Monitoring",
    explanation: "Cross-account EventBridge delivery requires both a receiving bus resource policy and sender-side IAM permissions. Restricting the sender role to the central bus ARN enforces least privilege, while the central event bus resource policy explicitly limits which accounts or organization members can publish. Together these controls prevent publishing to unauthorized buses.",
    optionExplanations: [
      "AdministratorAccess grants far more permissions than necessary and does not restrict publishing to a single approved event bus. This violates least privilege.",
      "✓ Correct: A resource policy on the central event bus controls who may publish, and a narrowly scoped sender IAM policy in member accounts restricts events:PutEvents to only the approved central event bus ARN.",
      "Denying all EventBridge actions would also block the required delivery of security events to the central account, so it does not satisfy the business requirement.",
      "SNS can support cross-account publishing, but it does not inherently solve the EventBridge-specific requirement and would require redesigning the event routing architecture."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus-perms.html", title: "Permissions for event buses in Amazon EventBridge" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html", title: "Sending and receiving events between AWS accounts" }
    ]
  },
  {
    id: 48,
    question: "A security engineer needs to investigate whether any Amazon EC2 instances in an AWS account were launched without the required tag Owner during the last 7 days. The company already stores CloudTrail management events in Amazon S3. The engineer wants a serverless solution that can query historical events quickly.\n\nWhich solution should the engineer use?",
    options: [
      "Use Amazon Athena to query the CloudTrail logs in S3 for RunInstances events where the request parameters do not include the Owner tag.",
      "Use AWS Config advanced queries because they show all historical API request parameters for the last 7 days.",
      "Create a Lambda function that replays all CloudTrail logs into DynamoDB and then query the table.",
      "Use Amazon Inspector to scan the EC2 instances and identify which ones were created without tags."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "CloudTrail management events stored in S3 can be queried serverlessly with Amazon Athena. By filtering RunInstances events and examining tag specifications in the request parameters, the engineer can quickly identify instance launches missing the required Owner tag over a historical window. This avoids building any custom ingestion pipeline.",
    optionExplanations: [
      "✓ Correct: Athena is the standard serverless query engine for CloudTrail logs in S3 and is well suited for quickly searching historical RunInstances events and their request parameters.",
      "AWS Config advanced queries operate on current and recorded resource configuration state, not the full historical CloudTrail API request payloads needed to determine whether the Owner tag was present at launch time.",
      "Replaying logs into DynamoDB adds unnecessary custom infrastructure and maintenance when Athena can query the existing CloudTrail data directly.",
      "Amazon Inspector evaluates vulnerabilities and exposure of running workloads, not historical EC2 launch event metadata or missing tags at creation time."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html", title: "Query AWS CloudTrail logs" },
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html", title: "What is AWS CloudTrail?" }
    ]
  },
  {
    id: 49,
    question: "A company runs applications on Amazon EC2 instances in private subnets and wants to allow outbound access only to Amazon S3 without using the internet. The security team also wants to ensure that traffic to S3 stays on the AWS network and that instances cannot reach other public AWS service endpoints.\n\nWhich solution should the security engineer implement?",
    options: [
      "Deploy a NAT Gateway in a public subnet and add an IAM policy denying access to unwanted AWS services.",
      "Create an S3 gateway VPC endpoint and update the private subnet route tables to send S3 traffic through the endpoint. Remove the default route to the NAT Gateway for those subnets.",
      "Create an interface VPC endpoint for Amazon S3 and allow outbound HTTPS to all 0.0.0.0/0 destinations.",
      "Assign Elastic IP addresses to the EC2 instances and restrict S3 access with bucket policies only."
    ],
    correctAnswer: 1,
    category: "Infrastructure Security",
    explanation: "An S3 gateway endpoint lets instances in private subnets reach Amazon S3 privately over the AWS network without requiring internet access. Removing the NAT route ensures the subnets cannot access arbitrary public endpoints, so outbound access is effectively limited to S3 (subject to additional route and policy controls). This is the native pattern for private S3 access from VPC subnets.",
    optionExplanations: [
      "A NAT Gateway still provides general internet egress and does not keep traffic to S3 fully private. IAM policies also do not restrict raw network reachability to public endpoints.",
      "✓ Correct: A gateway VPC endpoint for S3 provides private connectivity over the AWS backbone, and removing the NAT route from those private subnets prevents internet egress to other public service endpoints.",
      "S3 primarily uses a gateway endpoint pattern in VPCs. Allowing outbound HTTPS to 0.0.0.0/0 would still permit access to other public destinations and would not meet the requirement.",
      "Elastic IPs expose the instances to internet routing and do not keep S3 traffic private. Bucket policies alone do not restrict the instances' general outbound network access."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html", title: "Gateway endpoints for Amazon S3" },
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/route-table-options.html", title: "Routing to a gateway endpoint" }
    ]
  },
  {
    id: 50,
    question: "A company wants to ensure that no IAM policies granting wildcard actions on wildcard resources can be attached to roles in member accounts, except for a small break-glass administrator role managed by the security team. The control must be preventive and applied across AWS Organizations.\n\nWhich solution should the security engineer implement?",
    options: [
      "Enable IAM Access Analyzer in every account to detect policies with Action: * and Resource: * after they are attached.",
      "Create an SCP that denies iam:AttachRolePolicy and iam:PutRolePolicy when the target role is not the approved break-glass role and the policy document contains Action: * and Resource: *.",
      "Use AWS Config managed rules to evaluate IAM policies daily and send findings to SNS.",
      "Require developers to submit all IAM changes through a manual change approval board."
    ],
    correctAnswer: 1,
    category: "Management and Security Governance",
    explanation: "The requirement is explicitly preventive and organization-wide. An SCP is the correct control layer for preventing attachment or creation of overly permissive role policies in member accounts. By carving out only the approved break-glass role as an exception, the organization can enforce the restriction consistently across accounts.",
    optionExplanations: [
      "IAM Access Analyzer is a detective control. It identifies overly broad access after the policy exists, but it does not stop the policy from being attached.",
      "✓ Correct: An SCP can prevent the attachment or inline creation of wildcard-on-wildcard policies on roles across member accounts, while allowing an explicit exception for the designated break-glass role.",
      "AWS Config provides continuous evaluation, but it is still detective and potentially delayed. It does not prevent the attachment of the non-compliant policy.",
      "Manual approval is a process control and cannot guarantee prevention at the AWS API level across all member accounts."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" },
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-reference-policy-checks.html", title: "IAM Access Analyzer policy checks" }
    ]
  },
  {
    id: 51,
    question: "A company stores highly sensitive backups in Amazon S3 and must ensure that no object version can be deleted or overwritten by any user, including the root user, until a 3-year retention period expires.\n\nWhich solution should the security engineer implement?",
    options: [
      "Enable S3 Versioning and add a bucket policy that denies s3:DeleteObject for all principals.",
      "Enable S3 Object Lock in Governance mode with a 3-year retention period.",
      "Enable S3 Object Lock in Compliance mode with a 3-year retention period.",
      "Store the objects in S3 Glacier Deep Archive and deny s3:DeleteBucket in the bucket policy."
    ],
    correctAnswer: 2,
    category: "Data Protection",
    explanation: "S3 Object Lock in Compliance mode prevents object versions from being overwritten or deleted until the retention period expires, and this protection applies even to the root user. This directly satisfies the requirement for immutable backups with a fixed 3-year retention period.",
    optionExplanations: [
      "Versioning preserves prior versions, but an authorized principal can still delete object versions unless additional immutable retention controls are used. This does not satisfy the requirement against deletion by any user, including root.",
      "Governance mode provides strong protection, but users with the s3:BypassGovernanceRetention permission can still override retention settings. That does not meet the requirement for absolute protection.",
      "✓ Correct: Compliance mode is the strongest S3 immutability control. No user, including the root user, can overwrite or delete protected object versions before the retention period ends.",
      "S3 Glacier Deep Archive is a storage class, not an immutability control by itself. Without Object Lock, objects can still be deleted by authorized users."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html", title: "Using S3 Object Lock" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops-retention-date.html", title: "Setting retention periods with S3 Object Lock" }
    ]
  },
  {
    id: 52,
    question: "A company wants to ensure that Amazon EC2 instances launched in a specific account can only use approved Amazon Machine Images (AMIs) that are tagged with Approved=true. The control must prevent the launch of instances from any unapproved AMI.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create an AWS Config rule that checks whether running instances were launched from approved AMIs and automatically terminates non-compliant instances.",
      "Create an SCP that denies ec2:RunInstances unless the AMI used in the request has the required Approved=true tag.",
      "Create an EventBridge rule for RunInstances and invoke a Lambda function to stop instances launched from unapproved AMIs.",
      "Use IAM Access Analyzer to detect when unapproved AMIs are used to launch instances."
    ],
    correctAnswer: 1,
    category: "Management and Security Governance",
    explanation: "An SCP is the preventive control layer for AWS Organizations. By denying ec2:RunInstances unless the AMI in the request has the Approved=true tag, the organization prevents non-compliant launches before the instances are created.",
    optionExplanations: [
      "AWS Config plus termination is reactive and allows the non-compliant instance to exist temporarily. The requirement is explicitly preventive.",
      "✓ Correct: An SCP can enforce an organization-wide preventive rule on ec2:RunInstances based on conditions tied to the AMI used in the launch request, blocking unapproved AMIs before launch.",
      "EventBridge and Lambda are reactive controls. Even if the instance is stopped quickly, the launch has already occurred.",
      "IAM Access Analyzer is a detective analysis service and does not enforce runtime prevention of unapproved AMI launches."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" },
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ExamplePolicies_EC2.html", title: "Example policies for Amazon EC2" }
    ]
  },
  {
    id: 53,
    question: "A security engineer needs to ensure that all secrets stored in AWS Secrets Manager are rotated automatically every 30 days. The databases already support native credential rotation through Secrets Manager. The team wants the simplest scalable solution.\n\nWhich solution should the engineer implement?",
    options: [
      "Create a scheduled Lambda function that lists all secrets and updates them every 30 days.",
      "Enable automatic rotation for each secret in Secrets Manager using the appropriate AWS-provided rotation template and set the rotation schedule to 30 days.",
      "Store the secrets in AWS Systems Manager Parameter Store SecureString parameters instead and rotate them with an EventBridge rule.",
      "Use AWS Config to detect secrets older than 30 days and notify administrators to rotate them manually."
    ],
    correctAnswer: 1,
    category: "Data Protection",
    explanation: "AWS Secrets Manager natively supports automatic rotation on a schedule using integrated Lambda rotation functions and AWS-provided templates for supported databases. Setting the rotation interval to 30 days gives the simplest scalable implementation with minimal custom code.",
    optionExplanations: [
      "A custom scheduled Lambda duplicates built-in Secrets Manager rotation capabilities and adds unnecessary maintenance overhead.",
      "✓ Correct: Secrets Manager automatic rotation is the native, scalable solution. It supports a 30-day schedule and integrates directly with supported database engines using standard rotation workflows.",
      "Parameter Store SecureString is not the native managed secret rotation solution for databases. It would require more custom orchestration than Secrets Manager.",
      "AWS Config notification is only detective and manual. It does not perform the required automatic 30-day rotation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html", title: "Rotate AWS Secrets Manager secrets" },
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/reference_available-rotation-templates.html", title: "Available rotation function templates" }
    ]
  },
  {
    id: 54,
    question: "A company uses Amazon CloudFront to distribute a public website backed by an Application Load Balancer. The security team wants to block requests from a list of known malicious IP addresses globally before the traffic reaches the application.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create AWS WAF IP set containing the malicious IP addresses and reference it in a rule in a Web ACL associated with the CloudFront distribution.",
      "Add inbound deny rules for the malicious IP addresses to the ALB security group.",
      "Create an Amazon Route 53 Resolver DNS Firewall rule group that blocks the malicious client IP addresses.",
      "Enable AWS Shield Standard and upload the malicious IP list to Shield."
    ],
    correctAnswer: 0,
    category: "Infrastructure Security",
    explanation: "AWS WAF associated with CloudFront evaluates requests at the edge before they reach the origin. An IP set-based rule is the standard way to block known malicious client IP addresses globally with minimal latency and operational overhead.",
    optionExplanations: [
      "✓ Correct: A WAF IP set allows centralized management of malicious source IP addresses, and associating the Web ACL with CloudFront blocks those requests at the edge before they hit the ALB or backend application.",
      "Security groups on an ALB are not the ideal control for globally distributed edge filtering. The request would already traverse CloudFront and reach the origin layer before being evaluated.",
      "Route 53 Resolver DNS Firewall controls outbound DNS queries from VPC resources. It does not filter inbound client HTTP requests to CloudFront.",
      "AWS Shield Standard provides automatic DDoS protections but does not offer a customer-managed malicious IP block list feature like AWS WAF IP sets."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-ipset-match.html", title: "IP set match rule statement" },
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/classic-web-acl-associating-cloudfront-distribution.html", title: "Associating a web ACL with a CloudFront distribution" }
    ]
  },
  {
    id: 55,
    question: "A company wants to identify all security groups in an AWS account that allow inbound access from 0.0.0.0/0 to TCP port 22. The security engineer needs a solution that can query the current configuration across the account without building a custom inventory system.\n\nWhich solution should the engineer use?",
    options: [
      "Use AWS Config advanced queries to search configuration items for security groups that have ingress rules allowing 0.0.0.0/0 on port 22.",
      "Use Amazon Athena to query CloudTrail logs for AuthorizeSecurityGroupIngress events involving port 22.",
      "Use Amazon Inspector to list all security groups with SSH access open to the internet.",
      "Enable VPC Flow Logs and search for accepted connections on port 22 from public IP addresses."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "AWS Config advanced queries are designed for querying current resource configuration state across an account or aggregator. This is ideal for finding all security groups currently configured with SSH access from 0.0.0.0/0 without building custom inventory tooling.",
    optionExplanations: [
      "✓ Correct: Config advanced queries provide SQL-like access to current recorded configurations, making them a direct fit for identifying security groups with internet-open SSH ingress rules.",
      "Athena on CloudTrail shows historical API activity, not necessarily the current effective configuration state. Rules may have been modified after the logged event.",
      "Amazon Inspector focuses on vulnerabilities and some exposure findings, but Config advanced queries are the native configuration search tool for this exact requirement.",
      "VPC Flow Logs only show actual traffic metadata, not all current security group rules. A rule could exist even if no traffic has yet used it."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/query-components.html", title: "AWS Config advanced query components" },
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/querying-AWS-resources.html", title: "Querying resource configuration data" }
    ]
  },
  {
    id: 56,
    question: "A company needs to ensure that all API calls made within its AWS accounts can be attributed to individual users from the corporate identity provider, rather than shared IAM users. The company already uses an external SAML 2.0 identity provider.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create a shared IAM user for each team and require team members to sign in with that user's credentials.",
      "Federate users from the external SAML identity provider into AWS and require them to assume roles with their individual federated identities.",
      "Create long-term IAM access keys for each employee and store them in the corporate password vault.",
      "Use the AWS account root user for all administrative actions because CloudTrail records root activity separately."
    ],
    correctAnswer: 1,
    category: "Identity and Access Management",
    explanation: "Federation from a SAML 2.0 identity provider into AWS allows each user to authenticate with their own corporate identity and assume AWS roles individually. CloudTrail records the federated user context, enabling accountability without shared IAM users or long-term AWS credentials.",
    optionExplanations: [
      "Shared IAM users break individual accountability and make attribution impossible because multiple people use the same identity.",
      "✓ Correct: SAML federation maps each corporate identity to an AWS role session, preserving individual attribution in CloudTrail while avoiding shared users and long-term AWS credentials.",
      "Long-term IAM access keys create operational and security risk and do not leverage the existing enterprise identity provider.",
      "The root user must not be used for routine operations. It also does not provide per-individual accountability across administrators."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html", title: "About SAML 2.0-based federation" },
      { url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html", title: "What is IAM Identity Center?" }
    ]
  },
  {
    id: 57,
    question: "A security engineer wants to detect when an AWS KMS key's policy is modified in any account in the organization and immediately alert the security team. The company already uses an organization trail.\n\nWhich solution should the engineer implement?",
    options: [
      "Create an EventBridge rule in the central account that matches CloudTrail events for kms:PutKeyPolicy and route matching events to an SNS topic.",
      "Enable AWS Config with a rule that checks whether KMS keys have the correct policy and wait for the next evaluation cycle.",
      "Enable Amazon GuardDuty KMS Protection and review findings daily.",
      "Create an AWS Lambda function that polls the KMS API every hour and compares policies against a baseline."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "CloudTrail records KMS policy modification API calls such as PutKeyPolicy. EventBridge can match these events in near real time and route them to SNS for immediate alerting, which is the most direct solution when an organization trail is already in place.",
    optionExplanations: [
      "✓ Correct: EventBridge on top of CloudTrail management events provides near-real-time alerting for KMS key policy changes across the organization with minimal overhead.",
      "AWS Config is useful for compliance state checks, but it is not the best mechanism for immediate alerting on every policy modification event.",
      "GuardDuty does not provide a dedicated KMS policy change alerting capability for every PutKeyPolicy event.",
      "Polling hourly introduces delay and unnecessary custom code when the event is already available from CloudTrail and EventBridge."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/ct-policies.html", title: "Logging AWS KMS API calls with CloudTrail" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html", title: "CloudTrail events in EventBridge" }
    ]
  },
  {
    id: 58,
    question: "A company wants to ensure that Amazon RDS database snapshots shared outside the AWS Organization are detected and blocked from being created in member accounts. The solution should be preventive wherever possible.\n\nWhich solution should the security engineer implement?",
    options: [
      "Use AWS Config to detect publicly shared or externally shared RDS snapshots and send an SNS notification.",
      "Create an SCP that denies the API actions used to modify RDS snapshot attributes for sharing outside the organization, and use AWS Config as a detective control for existing snapshots.",
      "Enable Amazon GuardDuty RDS Protection to block snapshot sharing outside the organization.",
      "Create a scheduled Lambda function that removes unauthorized shared snapshot permissions every night."
    ],
    correctAnswer: 1,
    category: "Management and Security Governance",
    explanation: "The preventive requirement is best met with an SCP that denies the relevant RDS snapshot sharing actions in member accounts. AWS Config can complement this with detective visibility for any existing non-compliant snapshots or edge cases, providing defense in depth.",
    optionExplanations: [
      "AWS Config alone is detective and cannot prevent the external sharing action from occurring.",
      "✓ Correct: SCPs are the right preventive organization-wide control, and Config adds detective coverage for existing resources or compliance reporting.",
      "GuardDuty RDS Protection focuses on database threat detections, not governance over snapshot sharing permissions.",
      "A nightly Lambda remediation job is reactive and leaves a window where the snapshot may be shared externally."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" },
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/share-encrypted-snapshot.html", title: "Sharing a DB snapshot" }
    ]
  },
  {
    id: 59,
    question: "A company uses Amazon EKS and wants to restrict Kubernetes service accounts so that pods can access only the specific AWS resources they need, without exposing the worker node IAM role credentials to every pod on the node.\n\nWhich solution should the security engineer implement?",
    options: [
      "Attach all required permissions to the worker node IAM role so every pod can use them through the node metadata service.",
      "Create an IAM role for service accounts (IRSA) for each Kubernetes service account and attach least-privilege IAM policies to those roles.",
      "Create IAM users for each application and store their access keys as Kubernetes Secrets.",
      "Use Amazon Cognito user pools to authenticate pods to AWS services."
    ],
    correctAnswer: 1,
    category: "Identity and Access Management",
    explanation: "IAM roles for service accounts (IRSA) let individual Kubernetes service accounts assume distinct IAM roles, so pods receive only the permissions they need. This avoids broad permissions on the worker node role and prevents sharing node-level credentials across all pods.",
    optionExplanations: [
      "Using the worker node IAM role exposes those broad permissions to all pods on the node and violates least privilege.",
      "✓ Correct: IRSA is the AWS-recommended mechanism for assigning fine-grained AWS permissions to pods in EKS using service-account-to-IAM-role mapping.",
      "IAM user access keys are long-term credentials and are not the recommended way to authorize EKS workloads to AWS services.",
      "Amazon Cognito is for end-user authentication and does not replace IAM-based workload access to AWS services from pods."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html", title: "IAM roles for service accounts" },
      { url: "https://docs.aws.amazon.com/eks/latest/best-practices/identity-and-access-management.html", title: "EKS IAM best practices" }
    ]
  },
  {
    id: 60,
    question: "A company wants to analyze VPC Flow Logs centrally from multiple AWS accounts and Regions with minimal operational overhead. The security team needs to run ad hoc SQL queries against the logs and keep the raw data in low-cost object storage.\n\nWhich solution should the security engineer implement?",
    options: [
      "Configure VPC Flow Logs to publish to CloudWatch Logs in each account and search them manually with CloudWatch Logs Insights.",
      "Configure VPC Flow Logs to deliver to a centralized Amazon S3 bucket and use Amazon Athena with the appropriate table definitions to query the logs.",
      "Stream all VPC Flow Logs into Amazon OpenSearch Service domains in every Region for querying.",
      "Create a custom fleet of EC2 instances that download and index the flow logs into a relational database."
    ],
    correctAnswer: 1,
    category: "Security Logging and Monitoring",
    explanation: "Publishing VPC Flow Logs to a centralized S3 bucket keeps the raw data in low-cost object storage and avoids managing log indexing infrastructure. Amazon Athena can query the logs directly with SQL, making this the standard low-overhead architecture for centralized ad hoc analysis.",
    optionExplanations: [
      "CloudWatch Logs Insights works, but centralizing and retaining large volumes of multi-account, multi-Region flow logs in CloudWatch Logs is generally more expensive and less aligned with the low-cost object storage requirement.",
      "✓ Correct: S3 plus Athena is the native serverless pattern for centralized, low-cost retention and SQL-based ad hoc analysis of VPC Flow Logs.",
      "OpenSearch can support search and analytics, but it introduces significantly more operational and cost overhead than S3 plus Athena for this requirement.",
      "A custom EC2-based indexing fleet is unnecessary and adds substantial infrastructure management overhead."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/vpc-flow-logs.html", title: "Querying Amazon VPC flow logs in Athena" },
      { url: "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html", title: "Publish flow logs to Amazon S3" }
    ]
  },
  {
    id: 61,
    question: "A company uses AWS Organizations and wants to ensure that member accounts cannot disable Amazon GuardDuty in their accounts. The security team manages GuardDuty centrally from a delegated administrator account.\n\nWhich control should the security engineer implement?",
    options: [
      "Create an SCP that denies guardduty:DeleteDetector and guardduty:UpdateDetector in member accounts, with an exception only for the delegated security administrator workflow if needed.",
      "Enable AWS Config and use a managed rule to detect when GuardDuty is disabled, then notify the security team.",
      "Create an EventBridge rule to re-enable GuardDuty after it is disabled in a member account.",
      "Use IAM Access Analyzer to prevent changes to GuardDuty configuration."
    ],
    correctAnswer: 0,
    category: "Management and Security Governance",
    explanation: "The requirement is preventive. An SCP is the right organization-wide control to deny member accounts from disabling GuardDuty by blocking the relevant GuardDuty API actions. Detective controls like Config or EventBridge re-enablement act only after the service has already been changed.",
    optionExplanations: [
      "✓ Correct: SCPs provide preventive governance across member accounts. Denying GuardDuty disablement APIs prevents local administrators from turning off or weakening GuardDuty in their accounts.",
      "AWS Config is a detective control and would only identify the issue after GuardDuty had already been disabled.",
      "Automatically re-enabling GuardDuty is reactive and leaves a window of reduced visibility. It does not prevent the disable action itself.",
      "IAM Access Analyzer analyzes access policies and external access exposure. It does not enforce GuardDuty service configuration changes."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" },
      { url: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html", title: "Managing GuardDuty accounts with AWS Organizations" }
    ]
  },
  {
    id: 62,
    question: "A company runs an application on Amazon EC2 instances and wants to ensure that only approved outbound destinations are reachable from a sensitive subnet. The team needs a managed network firewall service with centrally managed rule groups and domain-based filtering capabilities.\n\nWhich solution should the security engineer implement?",
    options: [
      "Use security groups with outbound rules listing approved domain names.",
      "Deploy AWS Network Firewall with stateful rule groups and domain list rule groups, and route subnet traffic through the firewall endpoints.",
      "Create an S3 bucket policy listing approved domains and attach it to the VPC.",
      "Use Amazon GuardDuty to block traffic to unapproved destinations."
    ],
    correctAnswer: 1,
    category: "Infrastructure Security",
    explanation: "AWS Network Firewall is the managed network firewall service for VPCs and supports centralized rule management, stateful inspection, and domain list filtering. Routing subnet traffic through firewall endpoints lets the organization enforce egress controls for sensitive subnets using managed rule groups.",
    optionExplanations: [
      "Security groups do not support outbound filtering by domain name. They work with IPs, CIDRs, ports, and referenced security groups.",
      "✓ Correct: AWS Network Firewall provides the required managed firewall capabilities, including centralized rule groups and domain-based filtering, when traffic is routed through its endpoints.",
      "An S3 bucket policy applies to S3 resources and cannot control general outbound network access from EC2 instances or VPC subnets.",
      "GuardDuty is a threat detection service, not a preventive network firewall that blocks arbitrary outbound destinations."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html", title: "What is AWS Network Firewall?" },
      { url: "https://docs.aws.amazon.com/network-firewall/latest/developerguide/stateful-rule-groups-domain-names.html", title: "Matching traffic against domain names" }
    ]
  },
  {
    id: 63,
    question: "A security engineer needs to ensure that Amazon EBS snapshots copied to another Region remain encrypted with a customer managed KMS key in the destination Region.\n\nWhich approach should the engineer use?",
    options: [
      "Copy the snapshot to the destination Region and specify the destination Region customer managed KMS key during the copy operation.",
      "Disable encryption before copying the snapshot, then re-encrypt it after the copy completes.",
      "Use the same KMS key ARN from the source Region because KMS keys are global.",
      "Store the snapshot in Amazon S3 first, then import it into EBS with SSE-S3."
    ],
    correctAnswer: 0,
    category: "Data Protection",
    explanation: "KMS keys are Regional. When copying an encrypted EBS snapshot to another Region, the destination copy must use a KMS key in the destination Region. Specifying the destination Region CMK during the copy operation keeps the snapshot encrypted and under customer control in that Region.",
    optionExplanations: [
      "✓ Correct: Cross-Region snapshot copy supports specifying a destination Region KMS key so the copied snapshot remains encrypted under a customer managed key in that Region.",
      "Disabling encryption is neither required nor desirable. It weakens security and is not the standard AWS workflow for encrypted snapshot copies.",
      "KMS keys are not global resources. A key ARN from one Region cannot be used directly in another Region for snapshot encryption.",
      "EBS snapshot copy is natively supported by EBS and KMS. Exporting to S3 with SSE-S3 does not meet the requirement for a destination Region customer managed KMS key."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-copy-snapshot.html", title: "Copy an Amazon EBS snapshot" },
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#regionality", title: "AWS KMS keys are Regional resources" }
    ]
  },
  {
    id: 64,
    question: "A company wants real-time alerts whenever an Amazon S3 bucket policy is changed in any account in the organization. The company already has an organization trail that logs management events.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create an EventBridge rule in the central account that matches CloudTrail events for PutBucketPolicy and DeleteBucketPolicy, then route matches to Amazon SNS.",
      "Use AWS Config to periodically evaluate S3 bucket policies and email a report every week.",
      "Enable Amazon Macie and review findings for bucket policy changes.",
      "Use S3 server access logging to detect bucket policy changes."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "CloudTrail records S3 bucket policy management API calls. EventBridge can match these management events in near real time and forward them to SNS, giving the security team immediate notification whenever a bucket policy is changed or removed in any organization account covered by the organization trail.",
    optionExplanations: [
      "✓ Correct: EventBridge on CloudTrail management events is the native low-overhead way to alert in real time on S3 bucket policy changes across the organization.",
      "AWS Config is useful for compliance evaluation, but a weekly report does not satisfy the real-time alerting requirement.",
      "Amazon Macie focuses on sensitive data discovery and some S3 security posture findings, not immediate alerts for every bucket policy management API call.",
      "S3 server access logging records requests to objects and bucket operations, but CloudTrail is the authoritative service for management API event alerting."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/cloudtrail-logging-s3-info.html", title: "Logging Amazon S3 API calls using AWS CloudTrail" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html", title: "CloudTrail events in EventBridge" }
    ]
  },
  {
    id: 65,
    question: "A company uses AWS IAM Identity Center to grant workforce access to AWS accounts. The security team must ensure that users can access accounts only from devices enrolled in the company's device management system.\n\nWhich feature should the security engineer use?",
    options: [
      "IAM Identity Center trusted identity propagation.",
      "IAM Identity Center attribute-based access control (ABAC) with session tags only.",
      "IAM Identity Center device trust policies integrated with the supported identity source and device posture signals.",
      "Amazon Cognito adaptive authentication."
    ],
    correctAnswer: 2,
    category: "Identity and Access Management",
    explanation: "The requirement is to restrict workforce access based on device enrollment or trust status. IAM Identity Center device trust capabilities are designed for this use case by integrating user authentication with device posture or enrollment information from supported providers, allowing access only from managed devices.",
    optionExplanations: [
      "Trusted identity propagation is used for propagating workforce identity context to applications and services, not specifically for restricting access to managed devices.",
      "ABAC with session tags can authorize based on user or session attributes, but by itself it does not provide the device enrollment enforcement capability requested.",
      "✓ Correct: Device trust in IAM Identity Center addresses conditional access based on managed or trusted device state, which directly matches the requirement.",
      "Amazon Cognito is aimed at application user authentication and does not control workforce sign-in to AWS accounts through IAM Identity Center."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html", title: "What is IAM Identity Center?" },
      { url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-considerations.html", title: "Identity source considerations" }
    ]
  },
  {
    id: 66,
    question: "A company wants to ensure that all new Amazon SQS queues are encrypted at rest with a customer managed AWS KMS key. If a developer creates an unencrypted queue, it must be prevented immediately.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create an SCP that denies sqs:CreateQueue unless the request includes server-side encryption using the required customer managed KMS key.",
      "Use AWS Config to detect unencrypted SQS queues and delete them automatically.",
      "Enable Amazon Inspector for SQS encryption findings.",
      "Create an EventBridge rule that updates any new queue to use SSE after creation."
    ],
    correctAnswer: 0,
    category: "Management and Security Governance",
    explanation: "The requirement is preventive. An SCP can deny the CreateQueue API call unless the queue is created with server-side encryption using the required customer managed KMS key, ensuring non-compliant queues are never created in member accounts.",
    optionExplanations: [
      "✓ Correct: SCPs provide API-level prevention and can enforce the required encryption settings at queue creation time across accounts.",
      "AWS Config is detective and remediation after creation is too late for a requirement that the queue creation be blocked immediately.",
      "Amazon Inspector does not govern SQS queue encryption settings as a preventive control.",
      "Updating the queue after creation is reactive and leaves a window where the queue is unencrypted."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" },
      { url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html", title: "Encryption at rest in Amazon SQS" }
    ]
  },
  {
    id: 67,
    question: "A security engineer needs to provide a third-party SaaS vendor limited access to read objects from a single Amazon S3 bucket in the company's account. The vendor has its own AWS account and should use temporary credentials rather than long-term access keys.\n\nWhich approach should the engineer implement?",
    options: [
      "Create an IAM user in the company account, generate access keys, and send them to the vendor.",
      "Create a cross-account IAM role with a policy scoped to the S3 bucket and allow the vendor's AWS account to assume the role.",
      "Generate a single long-lived pre-signed URL for the entire bucket.",
      "Attach AmazonS3ReadOnlyAccess to the company account root user and share the root credentials with the vendor."
    ],
    correctAnswer: 1,
    category: "Identity and Access Management",
    explanation: "A cross-account IAM role is the AWS-recommended way to grant third parties limited access using temporary credentials. The vendor uses its own AWS identity to assume the role, and the role policy can be tightly scoped to the single bucket or specific prefixes as needed.",
    optionExplanations: [
      "IAM user access keys are long-term credentials and are not the preferred secure pattern for third-party AWS-to-AWS access.",
      "✓ Correct: A cross-account role provides temporary credentials, least-privilege access, and avoids sharing long-term credentials with the vendor.",
      "Pre-signed URLs are object-specific and temporary; they are not an account-to-account access model for controlled read access to a bucket over time.",
      "Sharing root credentials is never acceptable and violates core AWS security best practices."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html", title: "Providing access to AWS accounts owned by third parties" },
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html", title: "Delegate access across AWS accounts using IAM roles" }
    ]
  },
  {
    id: 68,
    question: "A company wants to collect and centralize AWS CloudTrail logs from all accounts into an S3 bucket in a log archive account. The security team must ensure that member accounts cannot read the centralized logs stored in that bucket.\n\nWhich control should the security engineer use?",
    options: [
      "Add a bucket policy to the centralized S3 bucket that allows only the CloudTrail service principal to write and only designated security principals in the log archive account to read the logs.",
      "Enable S3 Transfer Acceleration on the centralized bucket and block public access.",
      "Allow each member account to manage its own CloudTrail bucket policy and replicate logs to the archive account later.",
      "Store CloudTrail logs in Amazon EFS in the archive account and mount it across accounts."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "A restrictive S3 bucket policy in the log archive account is the key control. It can permit CloudTrail to write logs while allowing read access only to specific security principals in the archive account, thereby preventing member accounts from reading the centralized logs.",
    optionExplanations: [
      "✓ Correct: The bucket policy is the authoritative access control for the centralized log bucket and can explicitly restrict reads to only the designated security team principals.",
      "Transfer Acceleration has nothing to do with cross-account read restrictions for CloudTrail logs.",
      "Letting member accounts manage their own bucket policies weakens central control and does not ensure the archive bucket remains unreadable to member accounts.",
      "Amazon EFS is not the standard service for centralized CloudTrail log storage and is not appropriate for this requirement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create-s3-bucket-policy-for-cloudtrail.html", title: "Amazon S3 bucket policy for CloudTrail" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html", title: "Bucket policy examples" }
    ]
  },
  {
    id: 69,
    question: "A company wants to enforce MFA for all users who sign in to the AWS Management Console through IAM users. In addition, API calls made by IAM users without MFA should be denied except for the actions required to set up a virtual MFA device.\n\nWhich solution should the security engineer implement?",
    options: [
      "Attach an IAM policy that denies all actions when aws:MultiFactorAuthPresent is false, except the minimum IAM actions needed to create and enable an MFA device.",
      "Enable AWS Config with the mfa-enabled-for-iam-console-access rule and notify users who are non-compliant.",
      "Rotate IAM user access keys every 30 days.",
      "Use AWS Shield Advanced to require MFA before API calls are accepted."
    ],
    correctAnswer: 0,
    category: "Identity and Access Management",
    explanation: "An IAM policy using the aws:MultiFactorAuthPresent condition can deny access when MFA is not used, while explicitly allowing the small set of IAM actions required for users to enroll an MFA device. This is the standard pattern for enforcing MFA for IAM users at the API authorization layer.",
    optionExplanations: [
      "✓ Correct: This condition-based deny policy is the native AWS mechanism for requiring MFA while still permitting self-service MFA enrollment actions.",
      "AWS Config is only a detective control and does not deny non-MFA API calls in real time.",
      "Access key rotation does not enforce MFA for console sign-in or API authorization.",
      "AWS Shield Advanced is unrelated to IAM MFA enforcement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_aws_my-sec-creds-self-manage.html", title: "AWS: Allows MFA-authenticated IAM users to manage their own credentials" },
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-mfa-present", title: "aws:MultiFactorAuthPresent" }
    ]
  },
  {
    id: 70,
    question: "A company stores regulated data in Amazon Aurora and needs evidence of database login attempts and SQL activity for audits. The security team wants a managed AWS capability that integrates with CloudWatch Logs with minimal custom development.\n\nWhich solution should the security engineer implement?",
    options: [
      "Enable the relevant Aurora database logs, such as audit or general logs depending on the engine, and publish them to Amazon CloudWatch Logs.",
      "Install a custom host agent on the Aurora underlying instances to tail log files and upload them to Amazon S3.",
      "Use Amazon GuardDuty to capture every SQL statement executed against Aurora.",
      "Rely only on AWS CloudTrail management events for all SQL activity visibility."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "Aurora supports publishing database engine logs, such as audit, general, or slow query logs depending on the engine, to CloudWatch Logs. This provides a managed, low-overhead way to capture login attempts and SQL-related audit information for compliance and security reviews.",
    optionExplanations: [
      "✓ Correct: Native Aurora log exports to CloudWatch Logs are the managed AWS approach and require minimal custom development while providing centralized retention and analysis options.",
      "Customers do not manage the underlying Aurora hosts, so installing custom agents is not the correct model.",
      "GuardDuty does not capture every SQL statement executed on Aurora databases.",
      "CloudTrail management events record control plane API activity, not detailed in-database login attempts or SQL statements."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_LogAccess.html", title: "Monitoring Amazon Aurora log files" },
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_LogAccess.Procedural.UploadtoCloudWatch.html", title: "Publishing Aurora logs to CloudWatch Logs" }
    ]
  },
  {
    id: 71,
    question: "A company wants to ensure that Amazon EFS file systems used for regulated workloads are encrypted at rest with a customer managed AWS KMS key at the time they are created. Unencrypted file systems must be prevented from being created in member accounts.\n\nWhich solution should the security engineer implement?",
    options: [
      "Use AWS Config to detect unencrypted EFS file systems and trigger a remediation workflow.",
      "Create an SCP that denies elasticfilesystem:CreateFileSystem unless encryption is enabled and the required customer managed KMS key is specified.",
      "Create an EventBridge rule that deletes any unencrypted EFS file system immediately after creation.",
      "Enable EFS lifecycle management to transition data to lower-cost storage classes."
    ],
    correctAnswer: 1,
    category: "Management and Security Governance",
    explanation: "The requirement is preventive and must apply at creation time. An SCP can deny the CreateFileSystem API call unless the request includes encryption and the expected customer managed KMS key, ensuring non-compliant EFS file systems are never created in member accounts.",
    optionExplanations: [
      "AWS Config is detective and would find the issue only after the file system already exists.",
      "✓ Correct: An SCP provides organization-wide preventive control and can enforce encryption requirements during EFS file system creation.",
      "EventBridge deletion is reactive and leaves a window where an unencrypted file system exists.",
      "EFS lifecycle management controls storage tiering, not encryption enforcement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/efs/latest/ug/encryption-at-rest.html", title: "Data encryption at rest in Amazon EFS" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" }
    ]
  },
  {
    id: 72,
    question: "A security engineer needs to investigate which IAM principals changed security group rules during the last 14 days across multiple AWS accounts. The company already stores organization CloudTrail logs in Amazon S3. The team wants a serverless query solution.\n\nWhich solution should the engineer use?",
    options: [
      "Use Amazon Athena to query the CloudTrail logs in S3 for AuthorizeSecurityGroupIngress, AuthorizeSecurityGroupEgress, RevokeSecurityGroupIngress, and RevokeSecurityGroupEgress events.",
      "Use AWS Config advanced queries to search for current security group rules and infer which user changed them.",
      "Use Amazon Inspector to list exposed security groups and then contact account administrators for change history.",
      "Export VPC Flow Logs to Amazon OpenSearch Service and search for rule change events."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "CloudTrail contains the historical management API activity, including which IAM principal made each security group rule change. Amazon Athena is the standard serverless way to query those CloudTrail logs in S3 across accounts and time ranges without building custom ingestion pipelines.",
    optionExplanations: [
      "✓ Correct: Athena can directly query CloudTrail management events in S3 and return the principals, event names, timestamps, and request details for security group rule changes over the last 14 days.",
      "AWS Config advanced queries show current recorded configuration state, not authoritative historical actor-level API event details for the full time window.",
      "Amazon Inspector can help identify exposure, but it does not provide a historical audit trail of who changed security group rules.",
      "VPC Flow Logs contain network traffic metadata, not CloudTrail management events about security group configuration changes."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html", title: "Query AWS CloudTrail logs" },
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html", title: "CloudTrail record contents" }
    ]
  },
  {
    id: 73,
    question: "A company wants to require that all Amazon SNS topics used by application teams are encrypted at rest with a customer managed AWS KMS key. The control must block creation of unencrypted topics in member accounts.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create an SCP that denies sns:CreateTopic unless the request specifies the required customer managed KMS key for topic encryption.",
      "Use AWS Config to find unencrypted SNS topics and notify administrators.",
      "Create an EventBridge rule that enables encryption on every new SNS topic after creation.",
      "Enable CloudTrail log file validation for all Regions."
    ],
    correctAnswer: 0,
    category: "Management and Security Governance",
    explanation: "The requirement is preventive and organization-wide. An SCP can deny SNS topic creation unless the request includes the required KMS key for server-side encryption, preventing non-compliant topics from being created in member accounts.",
    optionExplanations: [
      "✓ Correct: SCPs are the right preventive control for blocking creation of SNS topics that do not use the required customer managed KMS key.",
      "AWS Config is detective and does not stop the creation of unencrypted topics.",
      "Post-creation encryption is reactive and leaves a window where the topic is not compliant.",
      "CloudTrail validation helps detect tampering of logs, not enforce SNS topic encryption settings."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html", title: "Amazon SNS key management" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" }
    ]
  },
  {
    id: 74,
    question: "A company has public APIs on Amazon API Gateway and wants to protect them from common web exploits such as SQL injection and cross-site scripting, while also centrally reusing the same rules across multiple APIs and accounts.\n\nWhich solution should the security engineer implement?",
    options: [
      "Associate AWS WAF Web ACLs containing managed rule groups with the API Gateway stages, and use AWS Firewall Manager to centrally manage the WAF policies across accounts.",
      "Enable AWS Shield Standard and rely on it to block all application-layer attacks.",
      "Deploy AWS Network Firewall in each VPC and route API Gateway traffic through it.",
      "Use IAM permission boundaries to restrict API requests that contain malicious payloads."
    ],
    correctAnswer: 0,
    category: "Infrastructure Security",
    explanation: "AWS WAF is the native service for protecting API Gateway from common web exploits such as SQL injection and XSS. AWS Firewall Manager can centrally manage and enforce WAF policies across multiple accounts, which matches the requirement for centralized reuse and governance.",
    optionExplanations: [
      "✓ Correct: AWS WAF with managed rule groups protects API Gateway at Layer 7, and Firewall Manager adds the required centralized multi-account policy management.",
      "Shield Standard is valuable for DDoS protection but does not provide the detailed application-layer filtering capabilities of AWS WAF for SQL injection and XSS.",
      "API Gateway traffic does not traverse a customer VPC in a way that makes Network Firewall the right control for this use case.",
      "IAM permission boundaries govern AWS API permissions for identities, not inspection of web request payloads to API Gateway."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-aws-waf.html", title: "Use AWS WAF to protect your API Gateway API" },
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html", title: "Using AWS Firewall Manager with AWS WAF" }
    ]
  },
  {
    id: 75,
    question: "A security engineer wants to ensure that developers cannot create internet-facing Application Load Balancers in member accounts unless the load balancer is explicitly tagged with an approved exception tag. The control must be preventive across AWS Organizations.\n\nWhich solution should the engineer implement?",
    options: [
      "Create an SCP that denies elasticloadbalancing:CreateLoadBalancer when the scheme is internet-facing and the required exception tag is absent or incorrect.",
      "Use AWS Config to detect internet-facing load balancers and send findings to Security Hub.",
      "Create an EventBridge rule that deletes any internet-facing load balancer without the exception tag.",
      "Use Amazon Inspector to scan load balancers for public exposure."
    ],
    correctAnswer: 0,
    category: "Management and Security Governance",
    explanation: "Because the requirement is preventive and organization-wide, an SCP is the correct guardrail. It can deny CreateLoadBalancer requests based on the scheme and required request tag values, allowing only explicitly approved exceptions.",
    optionExplanations: [
      "✓ Correct: An SCP can prevent creation of internet-facing load balancers unless the approved exception tag is included, enforcing the control before deployment.",
      "AWS Config is detective and would identify the issue only after the load balancer exists.",
      "Deleting the load balancer afterward is reactive and leaves a window of exposure.",
      "Amazon Inspector is not the preventive governance control for ALB creation requests."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_CreateLoadBalancer.html", title: "CreateLoadBalancer API" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" }
    ]
  },
  {
    id: 76,
    question: "A company wants to automatically detect when an AWS KMS key is scheduled for deletion in any account and immediately alert the security team. The company already has an organization trail.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create an EventBridge rule in the central account that matches CloudTrail events for kms:ScheduleKeyDeletion and routes them to Amazon SNS.",
      "Use AWS Config to evaluate KMS keys weekly and send a compliance report.",
      "Enable Amazon Macie to detect key deletion risk.",
      "Create a nightly Lambda job that lists pending-deletion keys and writes a CSV report."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "CloudTrail records ScheduleKeyDeletion API calls, and EventBridge can match those events in near real time. Routing matching events to SNS provides immediate notification with minimal custom code or operational overhead.",
    optionExplanations: [
      "✓ Correct: EventBridge on top of organization CloudTrail events is the most direct and timely way to alert on KMS key deletion scheduling across accounts.",
      "Weekly Config evaluations do not satisfy the immediate alerting requirement.",
      "Macie is for data discovery and S3-related security analysis, not KMS key deletion event alerting.",
      "A nightly Lambda report introduces unnecessary delay and custom polling logic."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys-adding-permission.html", title: "Allowing users to schedule key deletion" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html", title: "CloudTrail events in EventBridge" }
    ]
  },
  {
    id: 77,
    question: "A company runs containerized workloads on Amazon ECS with tasks in private subnets. The workloads must pull images from Amazon ECR and write application logs to CloudWatch Logs without internet access.\n\nWhich combination of VPC endpoints should the security engineer configure? (Choose THREE.)",
    options: [
      "An interface VPC endpoint for com.amazonaws.region.ecr.api.",
      "An interface VPC endpoint for com.amazonaws.region.ecr.dkr.",
      "A gateway VPC endpoint for Amazon S3.",
      "An interface VPC endpoint for com.amazonaws.region.logs.",
      "A gateway VPC endpoint for Amazon DynamoDB."
    ],
    correctAnswer: [0, 1, 3],
    category: "Infrastructure Security",
    explanation: "ECS tasks pulling from ECR without internet access require the ECR API endpoint and the ECR Docker registry endpoint. Sending logs to CloudWatch Logs privately requires the CloudWatch Logs interface endpoint. These endpoints allow the workloads to interact with the required services over the AWS network without using a NAT gateway or internet gateway.",
    optionExplanations: [
      "✓ Correct: The ECR API interface endpoint is required for Amazon ECR API operations such as authorization and image metadata retrieval.",
      "✓ Correct: The ECR Docker registry interface endpoint is required for pulling container image layers from ECR.",
      "An S3 gateway endpoint can be useful in some architectures, but for the requirement stated here, the direct required services are ECR API, ECR DKR, and CloudWatch Logs. The core answer focuses on the explicitly requested functions.",
      "✓ Correct: The CloudWatch Logs interface endpoint allows application logs to be sent privately to CloudWatch Logs.",
      "A DynamoDB gateway endpoint is unrelated to pulling ECR images or writing logs to CloudWatch Logs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html", title: "Amazon ECR interface VPC endpoints" },
      { url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/cloudwatch-logs-and-interface-VPC.html", title: "Using CloudWatch Logs with interface VPC endpoints" }
    ]
  },
  {
    id: 78,
    question: "A company wants to find all IAM roles in an account that trust principals from outside the AWS Organization. The security team needs a native AWS service that continuously analyzes resource-based policies and trust relationships.\n\nWhich service should the security engineer use?",
    options: [
      "AWS IAM Access Analyzer.",
      "Amazon GuardDuty.",
      "AWS Trusted Advisor.",
      "Amazon Detective."
    ],
    correctAnswer: 0,
    category: "Identity and Access Management",
    explanation: "IAM Access Analyzer is designed to analyze resource policies and trust policies to identify resources and roles that grant access outside the account or organization. This directly matches the requirement to continuously find IAM roles trusted by external principals.",
    optionExplanations: [
      "✓ Correct: IAM Access Analyzer continuously evaluates external access from resource-based and trust policies and is the native service for this requirement.",
      "GuardDuty detects threats and suspicious behavior, not broad static external trust analysis for IAM roles.",
      "Trusted Advisor offers best practice checks, but IAM Access Analyzer is the purpose-built service for external access analysis.",
      "Detective helps investigate security findings and behavior relationships, not perform continuous trust policy analysis."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html", title: "What is IAM Access Analyzer?" },
      { url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-findings-view.html", title: "Viewing IAM Access Analyzer findings" }
    ]
  },
  {
    id: 79,
    question: "A company wants to ensure that all Amazon Redshift clusters are encrypted at rest and that audit logs are centrally stored in Amazon S3. The security team prefers native service features with minimal custom code.\n\nWhich solution should the security engineer implement?",
    options: [
      "Enable Redshift encryption with AWS KMS during cluster creation and configure Redshift audit logging to a centralized S3 bucket.",
      "Install a custom encryption agent on each Redshift node and stream audit logs to Amazon EC2 instances for aggregation.",
      "Use Amazon GuardDuty to encrypt Redshift data and collect query audit logs.",
      "Export Redshift data nightly to encrypted EBS volumes and manually copy audit files to S3."
    ],
    correctAnswer: 0,
    category: "Data Protection",
    explanation: "Amazon Redshift natively supports encryption at rest using AWS KMS and can export audit logs to Amazon S3. Using these built-in capabilities satisfies the encryption and centralized audit logging requirements with minimal custom development and operational overhead.",
    optionExplanations: [
      "✓ Correct: Redshift native encryption and audit logging are the intended low-overhead AWS features for this requirement.",
      "Customers do not install host agents on managed Redshift nodes for this purpose, and this adds unnecessary complexity.",
      "GuardDuty does not provide Redshift at-rest encryption or collect all Redshift audit logs as a replacement for native logging.",
      "Manual export and copy workflows add unnecessary operational burden and do not use the managed native features."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-db-encryption.html", title: "Amazon Redshift database encryption" },
      { url: "https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing.html", title: "Database audit logging in Amazon Redshift" }
    ]
  },
  {
    id: 80,
    question: "A company wants a central security account to receive findings from AWS Security Hub across all organization accounts and Regions, and it wants new accounts to be included automatically.\n\nWhich solution should the security engineer implement?",
    options: [
      "Designate the security account as the Security Hub delegated administrator and enable organization configuration with auto-enable for new accounts and Regions as required.",
      "Create custom Lambda functions in each account to export Security Hub findings to Amazon S3 every day.",
      "Use AWS Config aggregators instead of Security Hub because they automatically include all new findings.",
      "Create cross-account IAM roles and require administrators to log in to each account to review Security Hub findings manually."
    ],
    correctAnswer: 0,
    category: "Management and Security Governance",
    explanation: "Security Hub natively supports delegated administration through AWS Organizations. By designating a delegated administrator and enabling organization-wide configuration and auto-enable behavior, the security account can centrally receive findings from member accounts and automatically include new accounts with minimal operational effort.",
    optionExplanations: [
      "✓ Correct: Security Hub delegated administration with organization auto-enable is the native and scalable approach for centralized multi-account findings aggregation.",
      "Custom daily export functions add unnecessary complexity and do not provide the same near-real-time centralized operating model.",
      "AWS Config aggregators centralize Config data, not Security Hub findings. They are complementary, not a replacement.",
      "Manual cross-account review does not scale and does not automatically include new accounts."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-accounts-orgs.html", title: "Managing Security Hub accounts with AWS Organizations" },
      { url: "https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-auto-enabled-standards.html", title: "Automatically enabling accounts and standards" }
    ]
  },
  {
    id: 81,
    question: "A company wants to ensure that all AWS Lambda function URLs are protected so that no function URL can be created with public unauthenticated access in member accounts unless an approved exception tag is present. The control must be preventive across AWS Organizations.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create an SCP that denies lambda:CreateFunctionUrlConfig when AuthType is NONE unless the request includes the approved exception tag.",
      "Use AWS Config to detect Lambda function URLs with AuthType set to NONE and notify the security team.",
      "Create an EventBridge rule that deletes any public function URL after it is created.",
      "Enable Amazon Inspector to scan Lambda function URLs for public exposure."
    ],
    correctAnswer: 0,
    category: "Management and Security Governance",
    explanation: "The requirement is preventive and organization-wide. An SCP can deny CreateFunctionUrlConfig requests when the function URL is configured for unauthenticated public access unless an approved exception tag is present, preventing non-compliant public Lambda function URLs from being created in member accounts.",
    optionExplanations: [
      "✓ Correct: An SCP is the right preventive guardrail for AWS Organizations and can block unauthenticated public Lambda function URLs unless an approved exception is explicitly tagged.",
      "AWS Config is detective and would identify the issue only after the public function URL already exists.",
      "Deleting the public function URL afterward is reactive and leaves a window of exposure.",
      "Amazon Inspector is not the service used to prevent creation of public Lambda function URLs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html", title: "Control access to Lambda function URLs" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" }
    ]
  },
  {
    id: 82,
    question: "A security engineer needs to identify all Amazon S3 buckets across multiple AWS accounts that currently allow public access through a bucket policy or ACL. The company already records configuration history centrally.\n\nWhich solution should the engineer use?",
    options: [
      "Use AWS Config advanced queries against the aggregated configuration data to find S3 buckets with public access settings or policies.",
      "Use Amazon Athena to query VPC Flow Logs for public S3 traffic.",
      "Use Amazon GuardDuty to list all public S3 buckets.",
      "Use AWS Trusted Advisor in each account and manually combine the results."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "Because the company already records configuration history centrally, AWS Config advanced queries are the most direct native way to search current aggregated S3 bucket configurations and identify buckets with public ACLs, public policies, or related public access posture issues.",
    optionExplanations: [
      "✓ Correct: Config advanced queries over aggregated configuration data are designed for centralized searches of current resource posture such as public S3 exposure.",
      "VPC Flow Logs do not describe S3 bucket policies or ACLs and cannot authoritatively identify which buckets are publicly accessible.",
      "GuardDuty can produce certain S3-related findings, but it is not the native inventory query tool for enumerating all currently public buckets.",
      "Trusted Advisor can help identify issues, but manually aggregating results from multiple accounts is less scalable and less direct than Config aggregation and advanced queries."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/querying-AWS-resources.html", title: "Querying AWS resource configurations" },
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html", title: "Aggregating AWS Config data" }
    ]
  },
  {
    id: 83,
    question: "A company wants to ensure that Amazon EC2 instances in private subnets can access AWS Systems Manager Session Manager without requiring outbound internet access. The instances must also be manageable with Systems Manager Run Command.\n\nWhich VPC endpoints should the security engineer configure? (Choose THREE.)",
    options: [
      "An interface VPC endpoint for com.amazonaws.region.ssm.",
      "An interface VPC endpoint for com.amazonaws.region.ssmmessages.",
      "An interface VPC endpoint for com.amazonaws.region.ec2messages.",
      "A gateway VPC endpoint for Amazon S3.",
      "An interface VPC endpoint for com.amazonaws.region.sts."
    ],
    correctAnswer: [0, 1, 2],
    category: "Infrastructure Security",
    explanation: "Systems Manager access from private subnets without internet requires the SSM, SSMMessages, and EC2Messages endpoints. Together these interface endpoints allow Session Manager and Run Command traffic to stay on the AWS network without a NAT gateway or internet gateway.",
    optionExplanations: [
      "✓ Correct: The SSM endpoint is required for core Systems Manager API communication from managed instances.",
      "✓ Correct: The SSMMessages endpoint is required for Session Manager and other bidirectional message channels.",
      "✓ Correct: The EC2Messages endpoint is required for Systems Manager agent message delivery and command processing.",
      "An S3 gateway endpoint can be useful for some Systems Manager features, but it is not one of the three core endpoints required for Session Manager and Run Command connectivity.",
      "STS can be useful in some architectures, but it is not the core required endpoint set for Session Manager and Run Command connectivity from private subnets."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html", title: "Create VPC endpoints for Systems Manager" },
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-getting-started-privatelink.html", title: "Use Session Manager with AWS PrivateLink" }
    ]
  },
  {
    id: 84,
    question: "A company needs to ensure that all new Amazon DynamoDB tables are encrypted using a customer managed AWS KMS key rather than the default AWS owned encryption. Creation of tables without the required key must be blocked in member accounts.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create an SCP that denies dynamodb:CreateTable unless the request specifies server-side encryption with the required customer managed KMS key.",
      "Use AWS Config to detect tables not encrypted with the approved key and delete them.",
      "Enable Amazon Inspector DynamoDB encryption findings.",
      "Create an EventBridge rule that updates encryption settings after the table is created."
    ],
    correctAnswer: 0,
    category: "Management and Security Governance",
    explanation: "The requirement is preventive. An SCP can deny DynamoDB table creation unless the request uses server-side encryption with the approved customer managed KMS key, ensuring non-compliant tables cannot be created in member accounts.",
    optionExplanations: [
      "✓ Correct: SCPs provide preventive API-level governance and can enforce customer managed KMS key usage during DynamoDB table creation.",
      "AWS Config is detective and would identify the issue only after the table exists.",
      "Amazon Inspector is not the service used to enforce DynamoDB encryption settings at creation time.",
      "Changing settings after creation is reactive and does not satisfy the requirement to block non-compliant table creation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/encryption.usagenotes.html", title: "Encryption at rest in DynamoDB" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" }
    ]
  },
  {
    id: 85,
    question: "A company wants to receive a near-real-time alert whenever an AWS CloudTrail trail is stopped or deleted in any member account. The organization already uses an organization trail and Amazon SNS for security notifications.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create an EventBridge rule in the central account that matches CloudTrail management events for StopLogging and DeleteTrail, and route matches to Amazon SNS.",
      "Use AWS Config to evaluate CloudTrail once per day and email a compliance summary.",
      "Enable Amazon Macie to detect CloudTrail tampering.",
      "Use VPC Flow Logs to identify when CloudTrail is disabled."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "CloudTrail management API calls such as StopLogging and DeleteTrail are themselves recorded and can be matched by EventBridge. Routing those events to SNS provides near-real-time alerting whenever someone attempts to stop or delete a trail in a member account.",
    optionExplanations: [
      "✓ Correct: EventBridge is the native event-driven way to alert quickly on trail stop or deletion API activity captured by CloudTrail.",
      "Daily Config checks do not satisfy the near-real-time requirement.",
      "Macie is not used to alert on CloudTrail trail lifecycle API events.",
      "VPC Flow Logs record network traffic metadata, not CloudTrail service configuration changes."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-events-with-cloudtrail.html", title: "Logging management events with CloudTrail" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html", title: "CloudTrail events in EventBridge" }
    ]
  },
  {
    id: 86,
    question: "A company hosts a static website in Amazon S3 behind Amazon CloudFront. The security team wants to ensure that users can access the content only through CloudFront and not directly from the S3 bucket endpoint.\n\nWhich solution should the security engineer implement?",
    options: [
      "Configure CloudFront to use Origin Access Control (OAC) or Origin Access Identity (OAI) and update the S3 bucket policy to allow reads only from CloudFront.",
      "Enable S3 Transfer Acceleration and block public access at the account level.",
      "Use Amazon GuardDuty to detect direct bucket access and block the source IPs.",
      "Make the bucket public and rely on CloudFront caching to reduce direct S3 access."
    ],
    correctAnswer: 0,
    category: "Infrastructure Security",
    explanation: "The standard way to restrict access to an S3-backed CloudFront origin is to configure CloudFront with OAC or OAI and then scope the S3 bucket policy so only CloudFront can read the objects. This prevents direct access from the public S3 endpoint while still allowing CloudFront delivery.",
    optionExplanations: [
      "✓ Correct: OAC or OAI with a restrictive bucket policy is the native AWS design for ensuring content is served only through CloudFront.",
      "Transfer Acceleration is unrelated to restricting origin access through CloudFront.",
      "GuardDuty can detect threats, but it is not the primary enforcement mechanism for restricting S3 origin access to CloudFront only.",
      "Making the bucket public directly contradicts the requirement to prevent direct S3 endpoint access."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html", title: "Restrict access to an Amazon S3 origin" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html", title: "Bucket policy examples" }
    ]
  },
  {
    id: 87,
    question: "A company wants to ensure that no Amazon EC2 instance in member accounts can be launched with an instance profile that grants AdministratorAccess, except for a designated break-glass role. The control must be preventive across AWS Organizations.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create an SCP that denies ec2:RunInstances when the requested IAM instance profile or associated role matches the disallowed administrative profile, except for the approved break-glass case.",
      "Use AWS Config to detect instances launched with administrative profiles and terminate them.",
      "Create an EventBridge rule that detaches the instance profile after launch.",
      "Use Amazon Inspector to identify instances with powerful IAM roles."
    ],
    correctAnswer: 0,
    category: "Management and Security Governance",
    explanation: "The requirement is preventive. An SCP can deny RunInstances requests when a disallowed instance profile or role is requested, thereby preventing EC2 instances from launching with overly permissive administrative access except in the approved break-glass scenario.",
    optionExplanations: [
      "✓ Correct: SCPs are the correct preventive organization-wide guardrail and can block EC2 launches using prohibited instance profiles or roles.",
      "AWS Config plus termination is reactive and allows the non-compliant instance to exist temporarily.",
      "Detaching the profile after launch is reactive and leaves a window during which the instance has elevated permissions.",
      "Amazon Inspector is not the preventive API-layer control for blocking EC2 launches with disallowed instance profiles."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html", title: "IAM roles for Amazon EC2" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" }
    ]
  },
  {
    id: 88,
    question: "A company wants to store custom application secrets in AWS Secrets Manager and allow only one specific Amazon ECS task role to retrieve a given secret. The security team wants least privilege and minimal credential exposure.\n\nWhich solution should the security engineer implement?",
    options: [
      "Attach a resource-based policy to the secret and an IAM policy to the specific ECS task role so that only that role can call secretsmanager:GetSecretValue for the secret.",
      "Store the secret in a plaintext environment variable in the ECS task definition.",
      "Create an IAM user with access keys for the application and embed those keys in the container image.",
      "Allow the ECS container instance role to access all secrets in the account."
    ],
    correctAnswer: 0,
    category: "Identity and Access Management",
    explanation: "Least privilege is achieved by scoping access to the specific ECS task role and specific secret. Using the ECS task role avoids long-term credentials and credential sharing, while a resource-based policy and IAM policy together tightly limit which principal can retrieve the secret.",
    optionExplanations: [
      "✓ Correct: The combination of a scoped ECS task role and secret access policy is the least-privilege, temporary-credential approach for controlled Secrets Manager access.",
      "Plaintext environment variables expose the secret broadly and do not provide secure retrieval controls.",
      "Embedding IAM user access keys in a container image is a long-term credential anti-pattern.",
      "Granting the container instance role access to all secrets is overly broad and violates least privilege."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access.html", title: "Authentication and access control in AWS Secrets Manager" },
      { url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html", title: "IAM roles for tasks in Amazon ECS" }
    ]
  },
  {
    id: 89,
    question: "A company needs to retain AWS WAF logs for long-term analysis in low-cost storage and run occasional SQL queries on them without managing servers.\n\nWhich solution should the security engineer implement?",
    options: [
      "Configure AWS WAF logging to Amazon S3 through Kinesis Data Firehose and query the stored logs using Amazon Athena.",
      "Stream AWS WAF logs directly to Amazon EC2 instances running a custom parser.",
      "Send WAF logs only to CloudWatch Logs and keep them there indefinitely regardless of cost.",
      "Use Amazon GuardDuty to store WAF request logs for later SQL analysis."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "Publishing AWS WAF logs to Amazon S3 through Kinesis Data Firehose keeps the data in low-cost object storage, and Athena provides the required serverless SQL query capability. This is the native low-overhead pattern for long-term log retention and ad hoc analysis.",
    optionExplanations: [
      "✓ Correct: Firehose to S3 plus Athena is the standard serverless analytics pattern for long-term WAF log retention and occasional SQL queries.",
      "A custom EC2-based parser introduces unnecessary infrastructure and maintenance overhead.",
      "CloudWatch Logs can work for analysis, but indefinite long-term retention there is generally less cost-efficient than storing large log volumes in S3.",
      "GuardDuty is not a long-term log store for raw AWS WAF request logs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/waf/latest/developerguide/logging-kinesis.html", title: "Logging AWS WAF traffic information" },
      { url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html", title: "What is Amazon Athena?" }
    ]
  },
  {
    id: 90,
    question: "A company wants to ensure that all findings from Amazon GuardDuty, AWS Security Hub, and Amazon Inspector are centrally visible in one account for investigation and triage. New organization accounts should be enrolled automatically whenever possible.\n\nWhich high-level approach should the security engineer implement?",
    options: [
      "Use AWS Organizations delegated administrator features for GuardDuty, Security Hub, and Inspector where supported, and configure organization auto-enable settings so the central security account aggregates findings from member accounts.",
      "Require each account owner to email CSV exports of findings to the security team every week.",
      "Use only AWS Config aggregators because they replace all finding aggregation services.",
      "Create a separate SIEM in every account and avoid centralization."
    ],
    correctAnswer: 0,
    category: "Management and Security Governance",
    explanation: "GuardDuty, Security Hub, and Inspector support organization-aware centralized administration and findings aggregation patterns. Using the central security account as delegated administrator with auto-enable where available provides the most native, scalable multi-account visibility model with minimal ongoing operational overhead.",
    optionExplanations: [
      "✓ Correct: Delegated administration and auto-enable settings provide the native AWS multi-account model for centrally aggregating findings from these security services.",
      "Manual CSV export is operationally heavy, delayed, and not scalable.",
      "AWS Config aggregators centralize configuration and compliance data, but they do not replace native findings aggregation for GuardDuty, Security Hub, and Inspector.",
      "Running separate siloed tooling in every account defeats the central visibility and operational efficiency requirements."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html", title: "Managing GuardDuty accounts with AWS Organizations" },
      { url: "https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-accounts-orgs.html", title: "Managing Security Hub accounts with AWS Organizations" },
      { url: "https://docs.aws.amazon.com/inspector/latest/user/managing-multiple-accounts.html", title: "Managing multiple accounts in Amazon Inspector" }
    ]
  },
  {
    id: 91,
    question: "A company uses AWS Organizations and wants to ensure that member accounts cannot disable AWS Security Hub standards that the central security team has mandated. The control must be preventive.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create an SCP that denies the relevant Security Hub disable or update actions in member accounts, except where explicitly required for the delegated administrator workflow.",
      "Use AWS Config to detect when a Security Hub standard is disabled and send an SNS notification.",
      "Create an EventBridge rule that re-enables disabled standards after they are turned off.",
      "Use Amazon Inspector to verify that Security Hub standards remain enabled."
    ],
    correctAnswer: 0,
    category: "Management and Security Governance",
    explanation: "Because the requirement is preventive, an SCP is the correct organization-wide control. It can deny member account administrators from disabling or weakening centrally mandated Security Hub standards, rather than only detecting or remediating the change after it occurs.",
    optionExplanations: [
      "✓ Correct: SCPs provide API-level preventive control across AWS Organizations and are the right mechanism to stop member accounts from disabling required Security Hub standards.",
      "AWS Config is detective and would identify the issue only after the standard had already been disabled.",
      "Automatically re-enabling a standard is reactive and leaves a window where required controls are not enforced.",
      "Amazon Inspector is unrelated to governing Security Hub standards configuration."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-accounts-orgs.html", title: "Managing Security Hub accounts with AWS Organizations" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" }
    ]
  },
  {
    id: 92,
    question: "A security engineer needs to find which IAM user or role changed an Amazon S3 bucket policy 3 days ago. The company stores CloudTrail logs in Amazon S3 and wants a serverless way to query the historical event details.\n\nWhich solution should the engineer use?",
    options: [
      "Use Amazon Athena to query the CloudTrail logs in S3 for PutBucketPolicy and DeleteBucketPolicy events for the bucket.",
      "Use AWS Config advanced queries to determine which user changed the bucket policy.",
      "Use Amazon Macie to inspect S3 bucket policy history.",
      "Use VPC Flow Logs to identify the principal that modified the bucket policy."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "CloudTrail records the API activity for S3 bucket policy changes, including the actor identity, timestamp, and request parameters. Amazon Athena is the standard serverless tool for querying historical CloudTrail logs stored in S3 without building custom infrastructure.",
    optionExplanations: [
      "✓ Correct: Athena can query CloudTrail logs for PutBucketPolicy and DeleteBucketPolicy events and reveal the IAM principal, event time, and request details for the change.",
      "AWS Config advanced queries focus on recorded configuration state, not authoritative historical API event actor details for specific management actions.",
      "Amazon Macie is a data security and classification service, not the primary source for S3 bucket policy change history.",
      "VPC Flow Logs record network traffic metadata and do not contain S3 management API event actor information."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html", title: "Query AWS CloudTrail logs" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/cloudtrail-logging-s3-info.html", title: "Logging Amazon S3 API calls using AWS CloudTrail" }
    ]
  },
  {
    id: 93,
    question: "A company wants to ensure that new Amazon RDS DB instances in member accounts cannot be created from public snapshots. The control must be preventive across AWS Organizations.\n\nWhich solution should the security engineer implement?",
    options: [
      "Create an SCP that denies rds:RestoreDBInstanceFromDBSnapshot when the source snapshot is public or not approved.",
      "Use AWS Config to detect DB instances restored from public snapshots and delete them.",
      "Create an EventBridge rule to stop DB instances after they are restored from public snapshots.",
      "Use Amazon GuardDuty to block restores from public RDS snapshots."
    ],
    correctAnswer: 0,
    category: "Management and Security Governance",
    explanation: "The requirement is explicitly preventive. An SCP can deny the restore API call when the snapshot source does not meet the organization's conditions, preventing DB instances from being created from public or otherwise unapproved snapshots.",
    optionExplanations: [
      "✓ Correct: An SCP is the preventive organization-wide guardrail that can stop restores from public or unapproved DB snapshots before the DB instance is created.",
      "AWS Config is detective and would identify the issue only after the DB instance already exists.",
      "Stopping the DB instance after restore is reactive and leaves a window where the non-compliant resource exists.",
      "GuardDuty is a threat detection service and is not the preventive control for blocking RDS restore actions."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html", title: "Restoring from a DB snapshot" },
      { url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", title: "Service control policies (SCPs)" }
    ]
  },
  {
    id: 94,
    question: "A company wants to inspect all HTTPS traffic leaving a sensitive subnet for malicious domains and known bad patterns, while preserving centralized rule management and minimizing undifferentiated heavy lifting.\n\nWhich service should the security engineer choose as the primary control?",
    options: [
      "AWS Network Firewall with TLS inspection and centrally managed rule groups.",
      "Security groups with outbound domain allow lists.",
      "Amazon GuardDuty with malware protection for EBS volumes.",
      "AWS Trusted Advisor with weekly network exposure reports."
    ],
    correctAnswer: 0,
    category: "Infrastructure Security",
    explanation: "AWS Network Firewall is the managed network security service designed for VPC traffic inspection and centralized policy management. It can inspect egress traffic using managed rule groups and features such as domain filtering and, where designed, TLS inspection, making it the appropriate primary control for this use case.",
    optionExplanations: [
      "✓ Correct: AWS Network Firewall is purpose-built for managed VPC traffic inspection with centralized rule administration and advanced filtering capabilities.",
      "Security groups cannot filter outbound traffic by domain name or inspect HTTPS payloads for malicious patterns.",
      "GuardDuty is a detection service and does not act as the primary inline inspection and blocking control for outbound subnet traffic.",
      "Trusted Advisor provides advisory checks, not inline traffic inspection or enforcement."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html", title: "What is AWS Network Firewall?" },
      { url: "https://docs.aws.amazon.com/network-firewall/latest/developerguide/tls-inspection.html", title: "TLS inspection in AWS Network Firewall" }
    ]
  },
  {
    id: 95,
    question: "A security engineer needs to ensure that Amazon EC2 instances in private subnets can retrieve parameters stored as SecureString in AWS Systems Manager Parameter Store without traversing the public internet.\n\nWhich solution should the engineer implement?",
    options: [
      "Create interface VPC endpoints for Systems Manager and, if required by the workload path, the related Systems Manager messaging services used by the instance, then allow the instance role to call ssm:GetParameter.",
      "Create a NAT Gateway so the instances can reach the public Systems Manager endpoint.",
      "Assign Elastic IP addresses to the private instances and restrict access with security groups.",
      "Store the parameters in a public Amazon S3 bucket instead."
    ],
    correctAnswer: 0,
    category: "Infrastructure Security",
    explanation: "Accessing Parameter Store privately from EC2 instances should use Systems Manager interface VPC endpoints so traffic remains on the AWS network. The instance role can then call GetParameter or GetParameters without requiring a NAT gateway or public internet path.",
    optionExplanations: [
      "✓ Correct: PrivateLink-based Systems Manager endpoints allow EC2 instances in private subnets to access Parameter Store APIs without internet access, which is the intended secure design.",
      "A NAT Gateway would provide internet-based egress and does not satisfy the requirement to avoid traversing the public internet.",
      "Assigning Elastic IPs exposes instances to public routing and contradicts the private subnet design goal.",
      "A public S3 bucket would weaken security and is not an appropriate substitute for SecureString parameter storage."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html", title: "Create VPC endpoints for Systems Manager" },
      { url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html", title: "AWS Systems Manager Parameter Store" }
    ]
  },
  {
    id: 96,
    question: "A company wants to enforce that all new AWS KMS keys created in member accounts have automatic key rotation enabled whenever supported. The security team wants a preventive guardrail if possible and a detective control otherwise.\n\nWhich approach BEST meets the requirement?",
    options: [
      "Use AWS Config to evaluate KMS keys for rotation status and combine it with an SCP or permission strategy that restricts creation workflows to approved automation that enables rotation immediately.",
      "Use Amazon GuardDuty to detect keys without rotation and disable them.",
      "Use VPC Flow Logs to identify KMS keys without rotation.",
      "Enable CloudTrail log file validation for all Regions."
    ],
    correctAnswer: 0,
    category: "Management and Security Governance",
    explanation: "KMS key rotation settings are best monitored with AWS Config detective controls. Where direct SCP enforcement of the exact post-create property is not practical, the best organization-level pattern is to funnel creation through approved automation or tightly controlled permissions that immediately enables rotation, while Config continuously validates compliance.",
    optionExplanations: [
      "✓ Correct: This combines governance and compliance monitoring appropriately: controlled creation workflows for prevention where possible, plus Config for continuous detective assurance.",
      "GuardDuty does not evaluate KMS key rotation compliance or disable non-rotating keys as a governance feature.",
      "VPC Flow Logs contain network metadata and are unrelated to KMS key rotation settings.",
      "CloudTrail log validation protects log integrity, not KMS rotation compliance."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html", title: "Rotating AWS KMS keys" },
      { url: "https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html", title: "List of AWS Config Managed Rules" }
    ]
  },
  {
    id: 97,
    question: "A company wants to ensure that only approved AWS accounts inside the organization can publish events to a centralized Amazon EventBridge event bus in the security account. The security team also wants to avoid granting publisher roles permission to send events to any other event bus.\n\nWhich solution should the security engineer implement?",
    options: [
      "Configure a resource policy on the central event bus to allow PutEvents only from the approved accounts or organization, and scope the sender IAM policies to only that event bus ARN.",
      "Grant AdministratorAccess to the publisher roles and rely on the event bus name to limit access.",
      "Use Amazon SNS instead of EventBridge because it does not need resource policies.",
      "Create an S3 bucket policy that lists the approved event publishers."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "Cross-account EventBridge publishing requires both a receiving event bus resource policy and sender-side IAM permissions. Restricting the event bus resource policy to approved accounts or the organization and scoping sender roles to a single bus ARN enforces least privilege and prevents use of other event buses.",
    optionExplanations: [
      "✓ Correct: This combination is the native least-privilege pattern for controlled cross-account EventBridge publishing.",
      "AdministratorAccess is overly broad and does not prevent publishers from sending events to other destinations.",
      "SNS is a different service and does not answer the EventBridge-specific centralized bus requirement.",
      "S3 bucket policies do not control EventBridge publishing permissions."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus-perms.html", title: "Permissions for event buses in Amazon EventBridge" },
      { url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html", title: "Sending and receiving events between AWS accounts" }
    ]
  },
  {
    id: 98,
    question: "A company needs to ensure that Amazon S3 objects uploaded to a specific bucket are always encrypted with a particular customer managed AWS KMS key, and uploads that use any other encryption setting must be rejected.\n\nWhich solution should the security engineer implement?",
    options: [
      "Add an S3 bucket policy that denies PutObject unless the request specifies aws:kms and the required KMS key ID in the encryption headers.",
      "Enable default bucket encryption and assume all clients will comply.",
      "Enable S3 Versioning and MFA Delete on the bucket.",
      "Use Amazon Macie to detect incorrectly encrypted objects after upload."
    ],
    correctAnswer: 0,
    category: "Data Protection",
    explanation: "A bucket policy can enforce both the required encryption mode and the exact KMS key ID at upload time. By denying non-compliant PutObject requests, the bucket rejects uploads that use the wrong KMS key, SSE-S3, or no encryption header at all.",
    optionExplanations: [
      "✓ Correct: Bucket policy conditions on the S3 encryption headers are the direct preventive mechanism for enforcing a specific customer managed KMS key on uploads.",
      "Default encryption is useful, but by itself it does not guarantee rejection of all explicitly non-compliant client-side encryption choices.",
      "Versioning and MFA Delete do not enforce the required KMS key for new object uploads.",
      "Macie is detective and would identify issues only after objects were already uploaded incorrectly."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html", title: "Protecting data using server-side encryption with AWS KMS" },
      { url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html", title: "Amazon S3 bucket policy examples" }
    ]
  },
  {
    id: 99,
    question: "A company wants to centrally query 30 days of AWS CloudTrail management events across all organization accounts without building custom ETL pipelines. The logs are already stored in Amazon S3.\n\nWhich solution should the security engineer implement?",
    options: [
      "Use Amazon Athena with the appropriate table definitions to query the CloudTrail logs directly in S3.",
      "Load all logs into an on-premises database every night for analysis.",
      "Use VPC Flow Logs because they contain CloudTrail management events.",
      "Use Amazon Inspector to search historical control plane logs."
    ],
    correctAnswer: 0,
    category: "Security Logging and Monitoring",
    explanation: "Athena is the standard serverless query engine for analyzing CloudTrail logs stored in Amazon S3. It allows SQL-based queries over historical management events across accounts without the need to build and operate ETL infrastructure.",
    optionExplanations: [
      "✓ Correct: Athena provides direct serverless SQL querying of CloudTrail logs in S3 and is the native low-overhead approach.",
      "Exporting logs nightly to an on-premises database adds unnecessary complexity, infrastructure, and data movement.",
      "VPC Flow Logs contain network traffic metadata, not CloudTrail management events.",
      "Amazon Inspector does not function as a query engine for historical CloudTrail logs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html", title: "Query AWS CloudTrail logs" },
      { url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events-console.html", title: "Viewing CloudTrail events" }
    ]
  },
  {
    id: 100,
    question: "A company wants to ensure that all Amazon ECR repositories used by development teams have image scanning enabled and that critical findings can be centrally reviewed by the security team across accounts. The organization wants the most native AWS approach with minimal custom code.\n\nWhich solution should the security engineer implement?",
    options: [
      "Enable Amazon Inspector enhanced scanning for Amazon ECR repositories and centralize the resulting findings in the delegated administrator security account.",
      "Export all container images to Amazon S3 and run custom vulnerability scanning scripts nightly.",
      "Use AWS Config only to detect whether scanning is enabled and ignore the actual findings.",
      "Require developers to manually scan images on their laptops before every push."
    ],
    correctAnswer: 0,
    category: "Threat Detection and Incident Response",
    explanation: "Amazon Inspector enhanced scanning for ECR is the native AWS service for continuous container vulnerability assessment, and its findings can be centrally managed through delegated administration patterns. This gives the security team centralized visibility into critical image vulnerabilities with minimal custom code.",
    optionExplanations: [
      "✓ Correct: Inspector enhanced scanning is the native continuous image vulnerability assessment solution for ECR and supports centralized operational visibility through multi-account administration.",
      "Custom nightly scripts duplicate managed AWS scanning capabilities and increase operational burden.",
      "Config can help detect whether scanning is enabled, but it does not provide vulnerability findings analysis.",
      "Manual laptop scanning is inconsistent, not scalable, and not a centralized native AWS approach."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html", title: "Scanning Amazon ECR container images with Amazon Inspector" },
      { url: "https://docs.aws.amazon.com/inspector/latest/user/managing-multiple-accounts.html", title: "Managing multiple accounts in Amazon Inspector" }
    ]
  }
];
