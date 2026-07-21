// AWS AI Practitioner 予想問題データ
const awsAIFQuestions = [
  {
    id: 1,
    question: "A company wants to build a customer support chatbot that understands natural language and generates appropriate responses. Which AWS service should they use?",
    options: [
      "Amazon Polly",
      "Amazon Transcribe",
      "Amazon Lex",
      "Amazon Translate"
    ],
    correctAnswer: 2,
    category: "AWS AI/ML Services",
    explanation: "Amazon Lex is a service for building conversational interfaces using voice and text. It provides Natural Language Understanding (NLU) and Automatic Speech Recognition (ASR) capabilities, making it ideal for building chatbots. It uses the same technology that powers Amazon Alexa.",
    optionExplanations: [
      "Amazon Polly converts text to speech and is not suitable as the primary response generation engine for a chatbot.",
      "Amazon Transcribe converts speech to text and can be used as part of a chatbot's input processing, but is insufficient on its own.",
      "✓ Correct: Amazon Lex is purpose-built for conversational interface development, providing natural language understanding and dialog management.",
      "Amazon Translate is a language translation service useful for multilingual support, but it is not the core function of a chatbot."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lex/latest/dg/what-is.html", title: "What is Amazon Lex?" }
    ]
  },
  {
    id: 2,
    question: "When training machine learning models with data that contains personal information, which measure is most important from a responsible AI perspective?",
    options: [
      "Reduce the model size",
      "Maximize model accuracy",
      "Improve training speed",
      "Implement data anonymization and encryption"
    ],
    correctAnswer: 3,
    category: "Responsible AI",
    explanation: "In responsible AI practice, protecting personal information is the top priority. Anonymizing data prevents individuals from being identified, while encryption protects against unauthorized access. This allows model training while safeguarding privacy.",
    optionExplanations: [
      "Reducing model size is useful for efficiency but is not directly related to personal data protection.",
      "Improving model accuracy is important, but it has lower priority than protecting personal information.",
      "Improving training speed is a technical optimization and is a secondary concern from a responsible AI perspective.",
      "✓ Correct: Data anonymization and encryption are fundamental measures for personal information protection and are required to comply with regulations such as GDPR."
    ],
    references: [
      { url: "https://aws.amazon.com/machine-learning/responsible-ai/", title: "Responsible AI" }
    ]
  },
  {
    id: 3,
    question: "When training a machine learning model with Amazon SageMaker, which component executes the training job?",
    options: [
      "Model Registry",
      "Endpoint",
      "Notebook Instance",
      "Training Job"
    ],
    correctAnswer: 3,
    category: "AWS AI/ML Services",
    explanation: "Amazon SageMaker's Training Job is the component that trains a model using a specified algorithm and data. Once training is complete, model artifacts are saved to Amazon S3.",
    optionExplanations: [
      "Model Registry manages model versions and does not execute training itself.",
      "Endpoint deploys a trained model and performs inference; it does not run training jobs.",
      "Notebook Instance is a development environment and is not the execution environment for training jobs.",
      "✓ Correct: Training Job is the dedicated component in SageMaker for executing model training."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-training.html", title: "Train a Model with Amazon SageMaker" }
    ]
  },
  {
    id: 4,
    question: "When using a generative AI model, which measure is most effective for mitigating the risk of the model generating inappropriate or harmful content?",
    options: [
      "Increase the number of model parameters",
      "Implement content filtering and guardrails",
      "Expand the size of training data",
      "Improve inference speed"
    ],
    correctAnswer: 1,
    category: "Responsible AI",
    explanation: "For responsible use of generative AI, implementing content filtering and guardrails is essential. Services such as Amazon Bedrock provide features to detect and block harmful content, helping build safe AI applications.",
    optionExplanations: [
      "Increasing the number of parameters can improve performance but does not directly mitigate the risk of generating harmful content.",
      "✓ Correct: Content filtering and guardrails prevent inappropriate outputs and enable safe AI usage.",
      "Expanding training data is useful, but without proper filtering, the risk of harmful content remains.",
      "Improving inference speed is useful for efficiency but is unrelated to content safety."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html", title: "Guardrails for Amazon Bedrock" }
    ]
  },
  {
    id: 5,
    question: "What is the main difference between supervised learning and unsupervised learning?",
    options: [
      "Supervised learning is inexpensive; unsupervised learning is expensive",
      "Supervised learning is fast; unsupervised learning is slow",
      "Supervised learning runs in the cloud; unsupervised learning runs on-premises",
      "Supervised learning uses labeled data; unsupervised learning uses unlabeled data"
    ],
    correctAnswer: 3,
    category: "AI/ML Fundamentals",
    explanation: "Supervised learning trains a model using input data paired with correct labels (training labels). Unsupervised learning, on the other hand, discovers patterns and structures from data without labels. Classification and regression are typical examples of supervised learning; clustering and dimensionality reduction are typical examples of unsupervised learning.",
    optionExplanations: [
      "Cost depends on the resources used, not the learning method.",
      "Speed depends on data size and the algorithm, not the learning method.",
      "The execution environment is unrelated to the type of learning method.",
      "✓ Correct: The presence or absence of labels is the fundamental difference between supervised and unsupervised learning."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/machine-learning/latest/dg/types-of-ml-models.html", title: "Types of ML Models" }
    ]
  },
  {
    id: 6,
    question: "When using Amazon Rekognition to detect faces in an image and perform sentiment analysis, which feature should you use?",
    options: [
      "DetectFaces API",
      "DetectText API",
      "DetectLabels API",
      "SearchFaces API"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "The Amazon Rekognition DetectFaces API detects faces in an image and analyzes attributes such as age range, gender, emotions (happiness, sadness, anger, etc.), face orientation, and whether glasses are worn. It is ideal for comprehensive facial analysis including sentiment detection.",
    optionExplanations: [
      "✓ Correct: The DetectFaces API provides comprehensive facial attribute analysis, including face detection and emotion analysis.",
      "The DetectText API detects text within images and cannot be used for facial analysis.",
      "The DetectLabels API detects objects, scenes, and activities in images but does not perform detailed facial analysis.",
      "The SearchFaces API searches for similar faces within a face collection and does not perform emotion analysis."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/rekognition/latest/dg/faces.html", title: "Detecting and Analyzing Faces with Amazon Rekognition" }
    ]
  },
  {
    id: 7,
    question: "When using a large language model (LLM), what is the most important principle in prompt engineering?",
    options: [
      "Always use the same format",
      "Provide clear and specific instructions",
      "Avoid technical terminology",
      "Keep the prompt as short as possible"
    ],
    correctAnswer: 1,
    category: "Generative AI",
    explanation: "In prompt engineering, providing clear and specific instructions is the most important principle. By explicitly specifying the task objective, expected output format, and constraints, an LLM can generate more accurate and useful responses. Ambiguous instructions can lead to unexpected results.",
    optionExplanations: [
      "The optimal format varies by task, so flexibility is more important than consistency.",
      "✓ Correct: Clear and specific instructions enable the LLM to accurately understand intent and produce the expected output.",
      "Technical terminology should be used appropriately based on context; it does not need to be avoided universally.",
      "Clarity matters more than prompt length. Necessary information should not be omitted."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html", title: "Prompt Engineering Guidelines" }
    ]
  },
  {
    id: 8,
    question: "When evaluating the fairness of a machine learning model, which metric is most important?",
    options: [
      "Model size",
      "Overall model accuracy",
      "Consistency of model performance across different groups",
      "Short training time"
    ],
    correctAnswer: 2,
    category: "Responsible AI",
    explanation: "In responsible AI practice, model fairness is a critical element. Evaluating whether model performance is consistent across different demographic groups (age, gender, race, etc.) helps prevent bias and discriminatory outcomes. Tools such as Amazon SageMaker Clarify support this evaluation.",
    optionExplanations: [
      "Model size is an implementation consideration and is not related to fairness evaluation.",
      "High overall accuracy does not rule out fairness issues if performance is poor for specific groups.",
      "✓ Correct: Consistency of performance across groups is the most important metric for evaluating model fairness.",
      "Training time is an efficiency metric and is not directly related to fairness."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-fairness-and-explainability.html", title: "Fairness and Explainability with Amazon SageMaker Clarify" }
    ]
  },
  {
    id: 9,
    question: "What is the main advantage of using Foundation Models in Amazon Bedrock?",
    options: [
      "No programming knowledge is required",
      "Models must be trained entirely from scratch",
      "Can only run on-premises",
      "Pre-trained models can be easily customized and used"
    ],
    correctAnswer: 3,
    category: "Generative AI",
    explanation: "Amazon Bedrock provides access to pre-trained foundation models from leading AI companies such as Anthropic, AI21 Labs, and Stability AI. These models can be customized for specific use cases through fine-tuning and prompt engineering. Because there is no need to train from scratch, development time and costs are significantly reduced.",
    optionExplanations: [
      "Basic programming knowledge is required to use the API.",
      "The purpose of Bedrock is to avoid training from scratch and to leverage existing models.",
      "Bedrock is an AWS managed service and runs in the cloud.",
      "✓ Correct: The main advantage of Bedrock is the ability to easily customize and use high-quality pre-trained models."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html", title: "What is Amazon Bedrock?" }
    ]
  },
  {
    id: 10,
    question: "What is the most effective technique for preventing overfitting in a machine learning model?",
    options: [
      "Simply adding more training data",
      "Increasing the learning rate",
      "Maximizing model complexity",
      "Using regularization and cross-validation"
    ],
    correctAnswer: 3,
    category: "AI/ML Fundamentals",
    explanation: "Overfitting occurs when a model becomes too closely fitted to the training data, degrading its ability to generalize to new data. Regularization (L1/L2 regularization, dropout, etc.) controls model complexity, and cross-validation evaluates model performance across different datasets, together effectively preventing overfitting.",
    optionExplanations: [
      "Adding more data is useful but needs to be combined with techniques such as regularization.",
      "Adjusting the learning rate affects convergence speed but is not a direct countermeasure against overfitting.",
      "Maximizing model complexity increases the risk of overfitting.",
      "✓ Correct: Regularization and cross-validation are standard and effective techniques for preventing overfitting."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/machine-learning/latest/dg/model-fit-underfitting-vs-overfitting.html", title: "Model Fit: Underfitting vs. Overfitting" }
    ]
  },
  {
    id: 11,
    question: "Which of the following tasks CANNOT be performed by Amazon Rekognition?",
    options: [
      "Object detection in images",
      "Facial recognition and emotion analysis",
      "Text-to-speech conversion",
      "Inappropriate content detection"
    ],
    correctAnswer: 2,
    category: "AWS AI/ML Services",
    explanation: "Amazon Rekognition is an image and video analysis service capable of object detection, facial recognition, emotion analysis, and inappropriate content detection. Text-to-speech conversion is a feature of Amazon Polly.",
    optionExplanations: [
      "Object detection in images: This is one of Rekognition's core features. It can detect thousands of objects and scenes.",
      "Facial recognition and emotion analysis: This is one of Rekognition's core features. It supports face detection, comparison, and emotion analysis.",
      "✓ Correct: Text-to-speech conversion is a feature of Amazon Polly. Rekognition specializes in image and video analysis.",
      "Inappropriate content detection: This is one of Rekognition's core features. It can detect violent and adult content."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html", title: "What is Amazon Rekognition?" }
    ]
  },
  {
    id: 12,
    question: "In prompt engineering, what is few-shot learning?",
    options: [
      "Reducing model parameters",
      "Having the model perform a task without providing any examples",
      "Completely retraining the model",
      "Having the model perform a task by providing a small number of examples"
    ],
    correctAnswer: 3,
    category: "Generative AI",
    explanation: "Few-shot learning is a technique that includes a small number of examples (typically 2–5) in the prompt to help the model understand the task pattern. It achieves higher accuracy than zero-shot (no examples) and is easier to implement than fine-tuning (full retraining).",
    optionExplanations: [
      "Reducing parameters is a model compression technique and is different from few-shot learning.",
      "Providing no examples at all is zero-shot learning. Few-shot uses a small number of examples.",
      "Full retraining is fine-tuning. Few-shot relies on the prompt alone.",
      "✓ Correct: Few-shot learning is an effective technique that includes roughly 2–5 examples in the prompt to help the model understand the task."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html", title: "Prompt Engineering Guidelines" }
    ]
  },
  {
    id: 13,
    question: "What is the primary function of Amazon Comprehend?",
    options: [
      "Image recognition",
      "Video editing",
      "Speech synthesis",
      "Natural language processing and text analysis"
    ],
    correctAnswer: 3,
    category: "AWS AI/ML Services",
    explanation: "Amazon Comprehend is a service that uses natural language processing (NLP) to extract insights from text. It provides features such as sentiment analysis, entity recognition, key phrase extraction, and language detection.",
    optionExplanations: [
      "Image recognition is a feature of Amazon Rekognition. Comprehend specializes in text analysis.",
      "Video editing is in the domain of media processing services and is not a Comprehend feature.",
      "Speech synthesis is a feature of Amazon Polly. Comprehend focuses on text understanding.",
      "✓ Correct: Comprehend provides NLP features including sentiment analysis, entity recognition, and topic modeling."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html", title: "What is Amazon Comprehend?" }
    ]
  },
  {
    id: 14,
    question: "What is the main advantage of a RAG (Retrieval-Augmented Generation) architecture?",
    options: [
      "Reduces model training costs",
      "Improves inference speed by 10x",
      "Significantly reduces model size",
      "Leverages an external knowledge base to provide up-to-date information"
    ],
    correctAnswer: 3,
    category: "Generative AI",
    explanation: "RAG is an architecture that combines a generative AI model with an external knowledge base (such as a vector database). It allows the model to leverage the latest information and domain expertise without retraining, reduces hallucinations, and produces more accurate and reliable answers.",
    optionExplanations: [
      "RAG may increase inference costs, but it can reduce retraining costs.",
      "Because RAG adds a knowledge retrieval step, inference speed typically decreases.",
      "RAG does not reduce the model size itself; it is a mechanism for leveraging external knowledge.",
      "✓ Correct: RAG retrieves relevant information from an external knowledge base and uses it to generate answers, enabling access to up-to-date and specialized knowledge."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-customize-rag.html", title: "Customizing Foundation Models with RAG" }
    ]
  },
  {
    id: 15,
    question: "What is the primary feature of Amazon SageMaker Autopilot?",
    options: [
      "Manually tuning hyperparameters",
      "Automatically building, training, and tuning machine learning models",
      "Automating database backups",
      "Automating network configuration"
    ],
    correctAnswer: 1,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Autopilot is an AutoML (automated machine learning) service. Simply provide your data, and it automatically selects the optimal algorithm, performs feature engineering, and tunes hyperparameters to produce the best model.",
    optionExplanations: [
      "Autopilot is designed for automation and eliminates the need for manual tuning.",
      "✓ Correct: Autopilot can automatically build high-quality machine learning models even without data science expertise.",
      "Database backups are a feature of AWS Backup and are unrelated to Autopilot.",
      "Network configuration is in the domain of VPC and networking services."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-automate-model-development.html", title: "Automate Model Development with SageMaker Autopilot" }
    ]
  },
  {
    id: 16,
    question: "Which Amazon SageMaker feature can be used to detect and mitigate bias in machine learning models?",
    options: [
      "SageMaker Neo",
      "SageMaker Pipelines",
      "SageMaker Edge Manager",
      "SageMaker Clarify"
    ],
    correctAnswer: 3,
    category: "Responsible AI",
    explanation: "SageMaker Clarify is a tool that provides bias detection and explainability for machine learning models. It identifies bias in training data and model predictions, and provides insights to improve fairness.",
    optionExplanations: [
      "SageMaker Neo is a service for optimizing and compiling models.",
      "SageMaker Pipelines is a tool for automating ML workflows.",
      "SageMaker Edge Manager is a service for managing models on edge devices.",
      "✓ Correct: SageMaker Clarify provides bias detection, model explainability, and feature importance analysis."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-fairness-and-explainability.html", title: "Fairness and Explainability with SageMaker Clarify" }
    ]
  },
  {
    id: 17,
    question: "What is the primary use case for Amazon Textract?",
    options: [
      "Text translation",
      "Text sentiment analysis",
      "Text-to-speech",
      "Extracting text and data from documents"
    ],
    correctAnswer: 3,
    category: "AWS AI/ML Services",
    explanation: "Amazon Textract is a machine learning service that automatically extracts text, handwriting, tables, and form data from scanned documents, PDFs, and images. It goes beyond OCR (optical character recognition) to also understand the structure of documents.",
    optionExplanations: [
      "Text translation is a feature of Amazon Translate.",
      "Text sentiment analysis is a feature of Amazon Comprehend.",
      "Text-to-speech is a feature of Amazon Polly.",
      "✓ Correct: Textract automatically extracts text and data from invoices, receipts, forms, and other documents, outputting structured data."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/textract/latest/dg/what-is.html", title: "What is Amazon Textract?" }
    ]
  },
  {
    id: 18,
    question: "What is the effect of setting the Temperature parameter high in a generative AI model?",
    options: [
      "Output becomes more deterministic and predictable",
      "Model size is reduced",
      "Inference speed improves",
      "Output becomes more random and creative"
    ],
    correctAnswer: 3,
    category: "Generative AI",
    explanation: "The temperature parameter controls the diversity of a generative AI model's output. Setting it high causes the model to produce more varied and random output, increasing creativity. Setting it low produces more deterministic and predictable output.",
    optionExplanations: [
      "Setting temperature low makes output deterministic. Setting it high has the opposite effect.",
      "The temperature parameter has no effect on model size.",
      "The temperature parameter does not affect inference speed. It only controls output diversity.",
      "✓ Correct: A high temperature causes the model to generate more diverse and creative output, though consistency may decrease."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html", title: "Model Parameters" }
    ]
  },
  {
    id: 19,
    question: "What is the primary use case for Amazon Forecast?",
    options: [
      "Time-series forecasting",
      "Speech recognition",
      "Text generation",
      "Image classification"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "Amazon Forecast is a fully managed service that uses machine learning to deliver highly accurate time-series forecasts. It is optimized for business use cases such as demand forecasting, inventory planning, and resource planning.",
    optionExplanations: [
      "✓ Correct: Forecast specializes in predicting time-series data for use cases such as sales forecasting, demand planning, and resource scheduling.",
      "Speech recognition is a feature of Amazon Transcribe.",
      "Text generation is a feature of generative AI models (Bedrock, SageMaker, etc.).",
      "Image classification is a feature of Amazon Rekognition."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/forecast/latest/dg/what-is-forecast.html", title: "What is Amazon Forecast?" }
    ]
  },
  {
    id: 20,
    question: "Compared to fine-tuning, what is the main advantage of prompt engineering?",
    options: [
      "Fast to implement and no model retraining required",
      "Model accuracy is always higher",
      "Compute cost is always lower",
      "Optimal for every task"
    ],
    correctAnswer: 0,
    category: "Generative AI",
    explanation: "Prompt engineering allows tasks to be performed through prompt design alone without retraining the model, enabling rapid implementation at lower cost. Fine-tuning is effective when high accuracy is required but takes more time and cost.",
    optionExplanations: [
      "✓ Correct: The key advantage of prompt engineering is that it requires no model retraining and allows tasks to be implemented quickly.",
      "Prompt engineering is fast, but accuracy may be lower than fine-tuning.",
      "Complex prompts or high-volume inference can also lead to higher costs.",
      "Depending on the task, fine-tuning may be more appropriate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering.html", title: "Prompt Engineering" }
    ]
  },
  {
    id: 21,
    question: "What is the primary use case for Amazon Personalize?",
    options: [
      "Building personalized recommendation systems",
      "Image recognition",
      "Speech synthesis",
      "Database management"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "Amazon Personalize is a fully managed service that uses machine learning to deliver personalized recommendations. It leverages the same technology used on Amazon.com and can be applied to product recommendations, content recommendations, and marketing personalization.",
    optionExplanations: [
      "✓ Correct: Personalize delivers personalized product and content recommendations based on user behavioral history.",
      "Image recognition is a feature of Amazon Rekognition.",
      "Speech synthesis is a feature of Amazon Polly.",
      "Database management is in the domain of RDS and DynamoDB."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html", title: "What is Amazon Personalize?" }
    ]
  },
  {
    id: 22,
    question: "What does \"hallucination\" refer to in the context of machine learning models?",
    options: [
      "A phenomenon where the model generates information that is not factual",
      "A state in which the model is overfitting",
      "A state in which the model's training speed is slow",
      "A state in which the model size is too large"
    ],
    correctAnswer: 0,
    category: "Generative AI",
    explanation: "Hallucination is a phenomenon in which a generative AI model confidently generates information that is not grounded in fact or is simply incorrect. It can be mitigated using RAG (Retrieval-Augmented Generation) and fact-checking capabilities.",
    optionExplanations: [
      "✓ Correct: Hallucination is the phenomenon where a model generates non-existent facts or incorrect information, and is one of the key challenges of generative AI.",
      "Overfitting is a separate problem where the model fits too closely to the training data.",
      "Slow training speed is a technical issue unrelated to hallucination.",
      "Model size is not a direct cause of hallucination."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html", title: "Knowledge Bases for Amazon Bedrock" }
    ]
  },
  {
    id: 23,
    question: "What is the primary feature of Amazon Kendra?",
    options: [
      "Image search",
      "Video editing",
      "Intelligent enterprise search service",
      "Database queries"
    ],
    correctAnswer: 2,
    category: "AWS AI/ML Services",
    explanation: "Amazon Kendra is an intelligent enterprise search service powered by machine learning. It understands natural language queries and delivers highly relevant answers from documents, FAQs, and knowledge bases.",
    optionExplanations: [
      "Image search is a feature of Amazon Rekognition.",
      "Video editing is in the domain of media processing services.",
      "✓ Correct: Kendra uses natural language processing to find accurate answers from enterprise documents and data.",
      "Database queries are in the domain of RDS and Athena."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html", title: "What is Amazon Kendra?" }
    ]
  },
  {
    id: 24,
    question: "What is the primary purpose of Amazon SageMaker Data Wrangler?",
    options: [
      "Model deployment",
      "Model monitoring",
      "Data preparation and feature engineering",
      "Cost optimization"
    ],
    correctAnswer: 2,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Data Wrangler is a visual tool that simplifies data preparation for machine learning. It allows you to import, transform, and engineer features, and analyze data quality — all without writing code.",
    optionExplanations: [
      "Model deployment is a feature of SageMaker Endpoints.",
      "Model monitoring is a feature of SageMaker Model Monitor.",
      "✓ Correct: Data Wrangler is a tool for visually performing data cleaning, transformation, and feature engineering.",
      "Cost optimization is in the domain of Cost Explorer and Trusted Advisor."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html", title: "Prepare Data with SageMaker Data Wrangler" }
    ]
  },
  {
    id: 25,
    question: "In the context of generative AI models, what does a \"token\" refer to?",
    options: [
      "A security authentication key",
      "A database record",
      "A model version number",
      "The smallest unit of text (a word or part of a word)"
    ],
    correctAnswer: 3,
    category: "Generative AI",
    explanation: "A token is the basic unit by which a generative AI model processes text. It is represented as a word, part of a word, or a character. Model input and output are measured in token counts, and costs and limits are calculated based on the number of tokens.",
    optionExplanations: [
      "A security authentication key is a different concept used for API access.",
      "A database record is a concept unrelated to tokens.",
      "A model version number is unrelated to tokens.",
      "✓ Correct: A token is the fundamental unit for a model to understand and generate text — typically about 4 characters in English or 1–2 characters in Japanese."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html", title: "Model Parameters" }
    ]
  },
  {
    id: 26,
    question: "What is the primary purpose of Amazon SageMaker Feature Store?",
    options: [
      "Storing, sharing, and managing features",
      "Cost analysis",
      "Data visualization",
      "Model training"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Feature Store is a centralized repository for managing machine learning features. It enables storing, versioning, sharing, and reusing features, ensuring consistent features are used for both training and inference.",
    optionExplanations: [
      "✓ Correct: Feature Store enables feature reuse and consistency across teams through centralized feature management.",
      "Cost analysis is a feature of Cost Explorer.",
      "Data visualization is a feature of QuickSight and SageMaker Studio.",
      "Model training is a feature of SageMaker Training Jobs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html", title: "SageMaker Feature Store" }
    ]
  },
  {
    id: 27,
    question: "In the context of machine learning, what does \"embedding\" refer to?",
    options: [
      "Integrating a model into an application",
      "Converting data into a low-dimensional vector representation",
      "Compressing a model",
      "Encrypting data"
    ],
    correctAnswer: 1,
    category: "AI/ML Fundamentals",
    explanation: "An embedding is a technique that converts high-dimensional data such as text, images, or audio into a low-dimensional vector representation that preserves semantic relationships. It is widely used in similarity search, recommendation systems, and RAG.",
    optionExplanations: [
      "Integrating a model into an application is a deployment concept.",
      "✓ Correct: An embedding converts data into a numerical vector, making it easier for machine learning models to process.",
      "Model compression is a separate technique for reducing model size.",
      "Data encryption is a security concept."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/embeddings.html", title: "Embedding Models" }
    ]
  },
  {
    id: 28,
    question: "What is the primary use case for Amazon Fraud Detector?",
    options: [
      "Detecting fraud in images",
      "Detecting online fraud and account takeover",
      "Detecting network intrusions",
      "Detecting code vulnerabilities"
    ],
    correctAnswer: 1,
    category: "AWS AI/ML Services",
    explanation: "Amazon Fraud Detector is a fully managed service that uses machine learning to detect online fraud. It automatically identifies fraudulent account creation, payment fraud, fake reviews, and more.",
    optionExplanations: [
      "Detecting fraud in images is a feature of Amazon Rekognition.",
      "✓ Correct: Fraud Detector detects fraudulent activity in online transactions, account registrations, guest checkouts, and more.",
      "Detecting network intrusions is a feature of GuardDuty.",
      "Detecting code vulnerabilities is a feature of CodeGuru."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/frauddetector/latest/ug/what-is-frauddetector.html", title: "What is Amazon Fraud Detector?" }
    ]
  },
  {
    id: 29,
    question: "In the context of generative AI models, what does \"context window\" refer to?",
    options: [
      "The maximum number of tokens a model can process at one time",
      "The model's training time",
      "The model's memory size",
      "The model's accuracy"
    ],
    correctAnswer: 0,
    category: "Generative AI",
    explanation: "The context window is the maximum total number of input and output tokens that a generative AI model can process at one time. It varies by model — for example, Claude 3 has a 200K-token context window and GPT-4 has a 128K-token context window.",
    optionExplanations: [
      "✓ Correct: The context window determines how much information a model can \"remember\" at once and affects its ability to process long documents.",
      "Training time is the time required to train the model and is different from the context window.",
      "Memory size relates to the number of model parameters but is a separate concept from the context window.",
      "Accuracy is a model performance metric and is different from the context window."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html", title: "Model Parameters" }
    ]
  },
  {
    id: 30,
    question: "What is the primary feature of Amazon CodeWhisperer?",
    options: [
      "Automated code review",
      "Code deployment",
      "AI-powered code completion and generation",
      "Code version control"
    ],
    correctAnswer: 2,
    category: "AWS AI/ML Services",
    explanation: "Amazon CodeWhisperer is an AI-powered coding assistant that suggests and generates code based on comments and existing code. It also provides security scanning to help developers write safer code.",
    optionExplanations: [
      "Code review is a feature of CodeGuru.",
      "Code deployment is a feature of CodeDeploy.",
      "✓ Correct: CodeWhisperer provides real-time code suggestions and completions to improve developer productivity.",
      "Version control is a feature of CodeCommit and Git."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codewhisperer/latest/userguide/what-is-cwspr.html", title: "What is Amazon CodeWhisperer?" }
    ]
  },
  {
    id: 31,
    question: "What is the primary purpose of Amazon SageMaker Model Monitor?",
    options: [
      "Model training",
      "Monitoring model performance and data quality in production",
      "Model deployment",
      "Data collection"
    ],
    correctAnswer: 1,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Model Monitor continuously monitors deployed models in production and detects data quality issues and model drift (performance degradation). When an issue is detected, it automatically sends an alert.",
    optionExplanations: [
      "Model training is a feature of SageMaker Training Jobs.",
      "✓ Correct: Model Monitor detects data drift, model drift, bias drift, and feature anomalies to maintain model quality.",
      "Model deployment is a feature of SageMaker Endpoints.",
      "Data collection is the role of data pipelines and ETL tools."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html", title: "Amazon SageMaker Model Monitor" }
    ]
  },
  {
    id: 32,
    question: "What is Chain-of-Thought (CoT) prompting?",
    options: [
      "A technique for chaining multiple models together",
      "A technique for compressing a model",
      "A technique for accelerating a model",
      "A technique for having a model produce step-by-step reasoning"
    ],
    correctAnswer: 3,
    category: "Generative AI",
    explanation: "Chain-of-Thought prompting is a technique that improves a model's ability to solve complex problems by having it generate intermediate reasoning steps. It involves instructions such as \"Think step by step.\"",
    optionExplanations: [
      "Chaining multiple models together is model chaining or ensemble learning.",
      "Model compression involves techniques such as distillation and pruning.",
      "Model acceleration involves optimization techniques such as quantization and pruning.",
      "✓ Correct: CoT prompting improves accuracy on mathematical problems and logical reasoning by having the model explicitly show its reasoning process."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html", title: "Prompt Engineering Guidelines" }
    ]
  },
  {
    id: 33,
    question: "What is the primary use case for Amazon Augmented AI (A2I)?",
    options: [
      "Automated model training",
      "Automated model deployment",
      "Automated data collection",
      "Incorporating human review into machine learning predictions"
    ],
    correctAnswer: 3,
    category: "AWS AI/ML Services",
    explanation: "Amazon A2I is a service that makes it easy to incorporate human review into machine learning predictions. It allows you to build workflows that require human confirmation for low-confidence predictions or critical decisions.",
    optionExplanations: [
      "Automated model training is a feature of SageMaker Autopilot.",
      "Automated model deployment is a feature of SageMaker Pipelines.",
      "Automated data collection is the role of data pipelines.",
      "✓ Correct: A2I enables Human-in-the-Loop (HITL) machine learning, leveraging human expertise for important decisions."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/a2i-use-augmented-ai-a2i-human-review-loops.html", title: "Amazon Augmented AI" }
    ]
  },
  {
    id: 34,
    question: "What is the primary use case for a vector database?",
    options: [
      "Storing relational data",
      "Storing logs",
      "Transaction processing",
      "Storing embeddings and performing similarity search"
    ],
    correctAnswer: 3,
    category: "AI/ML Fundamentals",
    explanation: "A vector database is a database optimized for efficiently storing embeddings (vector representations) and executing similarity searches at high speed. It is used in RAG, recommendation systems, and semantic search.",
    optionExplanations: [
      "Storing relational data is a use case for RDS and Aurora.",
      "Storing logs is a use case for CloudWatch Logs and S3.",
      "Transaction processing is a primary function of relational database management systems (RDBMS).",
      "✓ Correct: A vector database performs fast similarity searches over high-dimensional vectors to find semantically related content."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html", title: "Knowledge Bases for Amazon Bedrock" }
    ]
  },
  {
    id: 35,
    question: "What is the primary feature of Amazon DevOps Guru?",
    options: [
      "ML-powered operational anomaly detection",
      "Database management",
      "Automated code generation",
      "Network configuration"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "Amazon DevOps Guru is a service that uses machine learning to automatically detect operational issues in applications and provide recommended remediation actions. It identifies anomalous metrics and log patterns.",
    optionExplanations: [
      "✓ Correct: DevOps Guru analyzes CloudWatch metrics, AWS X-Ray, and CloudFormation stacks to proactively detect operational issues.",
      "Database management is in the domain of RDS and DynamoDB.",
      "Automated code generation is a feature of CodeWhisperer.",
      "Network configuration is in the domain of VPC and networking services."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/devops-guru/latest/userguide/welcome.html", title: "What is Amazon DevOps Guru?" }
    ]
  },
  {
    id: 36,
    question: "What does \"inference\" refer to in the context of machine learning models?",
    options: [
      "The model training process",
      "Using a trained model to make predictions",
      "Evaluating a model",
      "Preprocessing data"
    ],
    correctAnswer: 1,
    category: "AI/ML Fundamentals",
    explanation: "Inference is the process of using a trained machine learning model to make predictions or classifications on new data. Unlike training, model parameters are not updated during inference.",
    optionExplanations: [
      "Model training is the process of learning patterns from data.",
      "✓ Correct: Inference is the process of using a trained model in production to generate predictions in real time or in batch.",
      "Model evaluation is the process of measuring model performance on test data.",
      "Data preprocessing is the step of preparing data before it is fed into a model."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html", title: "Deploy a Model and Perform Inference" }
    ]
  },
  {
    id: 37,
    question: "What is the primary use case for Amazon Lookout for Metrics?",
    options: [
      "Image recognition",
      "Anomaly detection in time-series data",
      "Text analysis",
      "Speech recognition"
    ],
    correctAnswer: 1,
    category: "AWS AI/ML Services",
    explanation: "Amazon Lookout for Metrics is a service that uses machine learning to automatically detect anomalies in business metrics and identify root causes. It is used to monitor sales, web traffic, KPIs, and more.",
    optionExplanations: [
      "Image recognition is a feature of Amazon Rekognition.",
      "✓ Correct: Lookout for Metrics detects anomalous patterns in business metrics and identifies the affected dimensions.",
      "Text analysis is a feature of Amazon Comprehend.",
      "Speech recognition is a feature of Amazon Transcribe."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lookoutmetrics/latest/dev/what-is-lookout-for-metrics.html", title: "What is Amazon Lookout for Metrics?" }
    ]
  },
  {
    id: 38,
    question: "What is a prompt injection attack?",
    options: [
      "An attack that inserts malicious instructions into a prompt to manipulate model behavior",
      "An attack that tampers with model training data",
      "An attack that steals model parameters",
      "An attack that intercepts network traffic"
    ],
    correctAnswer: 0,
    category: "Responsible AI",
    explanation: "Prompt injection is an attack technique against generative AI models in which malicious instructions are inserted into a prompt to cause the model to behave in unintended ways. It can be mitigated using guardrails and content filtering.",
    optionExplanations: [
      "✓ Correct: Prompt injection illegitimately manipulates model behavior through user input and is an important security concern.",
      "Tampering with training data is a data poisoning attack.",
      "Stealing model parameters is a model extraction attack.",
      "Intercepting network traffic is a man-in-the-middle attack."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html", title: "Guardrails for Amazon Bedrock" }
    ]
  },
  {
    id: 39,
    question: "What is the primary purpose of Amazon SageMaker Pipelines?",
    options: [
      "Data visualization",
      "Automating and orchestrating machine learning workflows",
      "Model monitoring",
      "Cost analysis"
    ],
    correctAnswer: 1,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Pipelines is a CI/CD service for automating machine learning workflows (data preparation, training, evaluation, and deployment) and building reproducible ML pipelines.",
    optionExplanations: [
      "Data visualization is a feature of QuickSight and SageMaker Studio.",
      "✓ Correct: Pipelines defines and automates each step of the ML workflow, improving the speed and quality of model development.",
      "Model monitoring is a feature of SageMaker Model Monitor.",
      "Cost analysis is a feature of Cost Explorer."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines.html", title: "SageMaker Pipelines" }
    ]
  },
  {
    id: 40,
    question: "What is zero-shot learning?",
    options: [
      "A learning method that uses no data",
      "A technique for completely retraining a model",
      "A technique for having a model perform a task with no examples provided",
      "A technique for setting all model parameters to zero"
    ],
    correctAnswer: 2,
    category: "Generative AI",
    explanation: "Zero-shot learning is a technique in which a model performs a task based on instructions alone, without any task-specific examples. Large language models can perform a wide variety of tasks zero-shot thanks to pre-training.",
    optionExplanations: [
      "Even in zero-shot settings, the model uses knowledge from pre-training data.",
      "Complete retraining is fine-tuning. Zero-shot requires no retraining.",
      "✓ Correct: Zero-shot learning has the model perform tasks from instructions alone, making it faster than few-shot (a few examples) or fine-tuning (retraining).",
      "Setting parameters to zero refers to model initialization or pruning concepts."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html", title: "Prompt Engineering Guidelines" }
    ]
  },
  {
    id: 41,
    question: "What is the primary feature of Amazon Translate?",
    options: [
      "Image recognition",
      "Speech synthesis",
      "Text analysis",
      "Neural machine translation"
    ],
    correctAnswer: 3,
    category: "AWS AI/ML Services",
    explanation: "Amazon Translate is a service that uses neural machine translation to deliver high-quality, natural translations. It supports more than 75 languages and enables both real-time and batch translation.",
    optionExplanations: [
      "Image recognition is a feature of Amazon Rekognition.",
      "Speech synthesis is a feature of Amazon Polly.",
      "Text analysis is a feature of Amazon Comprehend.",
      "✓ Correct: Translate uses neural network-based machine translation to produce natural, context-aware translations."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/translate/latest/dg/what-is.html", title: "What is Amazon Translate?" }
    ]
  },
  {
    id: 42,
    question: "What is the primary purpose of model quantization?",
    options: [
      "Improving model accuracy",
      "Improving model training speed",
      "Optimizing model size and inference speed",
      "Reducing model bias"
    ],
    correctAnswer: 2,
    category: "AI/ML Fundamentals",
    explanation: "Quantization is a technique that converts model parameters to lower-precision numeric representations (e.g., from 32-bit to 8-bit), reducing model size and improving inference speed. The loss in accuracy is kept to a minimum.",
    optionExplanations: [
      "Quantization typically sacrifices a small amount of accuracy in exchange for significant efficiency gains.",
      "Quantization is an inference optimization and does not directly affect training speed.",
      "✓ Correct: Quantization reduces model memory usage, improves inference speed, and makes it possible to run models on edge devices.",
      "Bias reduction is achieved through improvements to data and algorithms."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/neo.html", title: "Optimize Models with SageMaker Neo" }
    ]
  },
  {
    id: 43,
    question: "What is the primary feature of Amazon Polly?",
    options: [
      "Text-to-speech conversion",
      "Image recognition",
      "Speech recognition",
      "Language translation"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "Amazon Polly is a text-to-speech (TTS) service that converts text into natural-sounding speech. Using neural TTS technology, it generates human-like natural speech and supports more than 60 languages and voices.",
    optionExplanations: [
      "✓ Correct: Polly converts text into natural, expressive speech, allowing you to add voice capabilities to your applications.",
      "Image recognition is a feature of Amazon Rekognition.",
      "Speech recognition is a feature of Amazon Transcribe.",
      "Language translation is a feature of Amazon Translate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/polly/latest/dg/what-is.html", title: "What is Amazon Polly?" }
    ]
  },
  {
    id: 44,
    question: "What is the primary purpose of data augmentation in machine learning?",
    options: [
      "Generating new training samples from existing data to prevent overfitting",
      "Deleting data",
      "Physically increasing the amount of data",
      "Encrypting data"
    ],
    correctAnswer: 0,
    category: "AI/ML Fundamentals",
    explanation: "Data augmentation is a technique that applies transformations (rotation, flipping, adding noise, etc.) to existing training data to generate new samples. This improves the model's generalization ability and helps prevent overfitting.",
    optionExplanations: [
      "✓ Correct: Data augmentation generates diverse training samples from limited data, improving model robustness.",
      "Deleting data is part of data cleaning, but it is not augmentation.",
      "Data augmentation increases the diversity of training samples, not the physical amount of data.",
      "Data encryption is a security measure, not augmentation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-data-insights.html", title: "Data Insights" }
    ]
  },
  {
    id: 45,
    question: "What is the primary use case for Amazon SageMaker Ground Truth?",
    options: [
      "Labeling high-quality training data",
      "Data visualization",
      "Model deployment",
      "Model training"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Ground Truth is a data labeling service for building high-quality training datasets for machine learning. It combines human labelers with machine learning to label data efficiently.",
    optionExplanations: [
      "✓ Correct: Ground Truth supports labeling tasks such as image classification, object detection, semantic segmentation, and text classification.",
      "Data visualization is a feature of QuickSight and SageMaker Studio.",
      "Model deployment is a feature of SageMaker Endpoints.",
      "Model training is a feature of SageMaker Training Jobs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/sms.html", title: "SageMaker Ground Truth" }
    ]
  },
  {
    id: 46,
    question: "What is the main advantage of transfer learning?",
    options: [
      "Improving inference speed",
      "Improving data transfer speed",
      "Reducing model size",
      "Reducing training time and data requirements by leveraging pre-trained models"
    ],
    correctAnswer: 3,
    category: "AI/ML Fundamentals",
    explanation: "Transfer learning is a technique that applies a model pre-trained on a large dataset to a new task. It enables building high-accuracy models with less data and shorter training time.",
    optionExplanations: [
      "Improving inference speed is the goal of optimization techniques.",
      "Data transfer speed is a network and storage concern.",
      "Reducing model size is the goal of quantization and pruning.",
      "✓ Correct: Transfer learning leverages models already trained on datasets such as ImageNet to build high-accuracy models with minimal data."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/transfer-learning.html", title: "Transfer Learning" }
    ]
  },
  {
    id: 47,
    question: "What is the primary feature of Amazon Transcribe?",
    options: [
      "Text-to-speech conversion",
      "Image recognition",
      "Automatic speech-to-text conversion",
      "Language translation"
    ],
    correctAnswer: 2,
    category: "AWS AI/ML Services",
    explanation: "Amazon Transcribe is a speech recognition service that automatically converts audio to text. It supports real-time and batch transcription, and provides features such as speaker identification, custom vocabularies, and automatic punctuation.",
    optionExplanations: [
      "Text-to-speech conversion is a feature of Amazon Polly.",
      "Image recognition is a feature of Amazon Rekognition.",
      "✓ Correct: Transcribe is used for meeting transcription, subtitle generation, call center analytics, and more.",
      "Language translation is a feature of Amazon Translate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html", title: "What is Amazon Transcribe?" }
    ]
  },
  {
    id: 48,
    question: "What is ensemble learning?",
    options: [
      "A technique for compressing data",
      "A technique for accelerating a model",
      "A technique for combining multiple models to improve prediction accuracy",
      "A technique for encrypting a model"
    ],
    correctAnswer: 2,
    category: "AI/ML Fundamentals",
    explanation: "Ensemble learning is a technique that combines predictions from multiple machine learning models to achieve higher accuracy and stability than any single model. Common approaches include bagging, boosting, and stacking.",
    optionExplanations: [
      "Data compression is an optimization for storage and networks.",
      "Model acceleration is the goal of quantization and optimization.",
      "✓ Correct: Ensemble learning is used in random forests, XGBoost, voting classifiers, and more to compensate for the weaknesses of individual models.",
      "Model encryption is a security measure."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-model-support.html", title: "Autopilot Model Support" }
    ]
  },
  {
    id: 49,
    question: "What is the primary feature of Amazon SageMaker JumpStart?",
    options: [
      "Access to pre-trained models and solution templates",
      "Database management",
      "Network configuration",
      "Cost analysis"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "SageMaker JumpStart is a hub that provides pre-trained machine learning models, solution templates, and sample notebooks. Models can be deployed and customized in just a few clicks.",
    optionExplanations: [
      "✓ Correct: JumpStart provides ready-to-use models and solutions for common use cases such as image classification, object detection, and text generation.",
      "Database management is in the domain of RDS and DynamoDB.",
      "Network configuration is in the domain of VPC and networking services.",
      "Cost analysis is a feature of Cost Explorer."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/studio-jumpstart.html", title: "SageMaker JumpStart" }
    ]
  },
  {
    id: 50,
    question: "What does \"model drift\" refer to?",
    options: [
      "An increase in model size",
      "A phenomenon where model prediction accuracy degrades over time",
      "A decrease in model training speed",
      "An increase in model cost"
    ],
    correctAnswer: 1,
    category: "AI/ML Fundamentals",
    explanation: "Model drift is a phenomenon where a model's prediction accuracy degrades over time because the data distribution in production diverges from the data used during training. It can be detected and addressed using SageMaker Model Monitor.",
    optionExplanations: [
      "An increase in model size is a separate issue from drift.",
      "✓ Correct: Model drift is caused by data drift (changes in input data) or concept drift (changes in the relationship between input and target variables).",
      "A decrease in training speed is a separate technical issue from drift.",
      "An increase in cost is not a direct consequence of drift."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality.html", title: "Monitor Model Quality" }
    ]
  },
  {
    id: 51,
    question: "Which of the following is NOT a foundation model available in Amazon Bedrock?",
    options: [
      "Anthropic Claude",
      "Amazon Titan",
      "Amazon RDS",
      "Meta Llama"
    ],
    correctAnswer: 2,
    category: "Generative AI",
    explanation: "Amazon Bedrock provides access to foundation models including Anthropic Claude, Amazon Titan, Meta Llama, Cohere, and AI21 Labs. Amazon RDS is a database service, not a foundation model.",
    optionExplanations: [
      "Anthropic Claude is a high-performance conversational AI model available in Bedrock.",
      "Amazon Titan is a foundation model developed by AWS that supports text generation and embeddings.",
      "✓ Correct: Amazon RDS is a relational database service and is not a generative AI foundation model.",
      "Meta Llama is an open-source large language model developed by Meta and is available in Bedrock."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", title: "Supported Foundation Models" }
    ]
  },
  {
    id: 52,
    question: "What is the main difference between batch inference and real-time inference in machine learning?",
    options: [
      "Batch inference is always cheaper; real-time inference is always more expensive",
      "Batch inference is faster; real-time inference is slower",
      "Batch inference processes large amounts of data at once; real-time inference responds instantly to individual requests",
      "There is no difference"
    ],
    correctAnswer: 2,
    category: "AI/ML Fundamentals",
    explanation: "Batch inference processes a large volume of data all at once and retrieves results later. Real-time inference returns predictions instantly in response to individual requests. The choice depends on the use case.",
    optionExplanations: [
      "Cost varies by data volume and frequency and cannot be generalized.",
      "Speed differs by processing method; batch is not always faster.",
      "✓ Correct: Batch inference is suited for overnight processing and periodic reports; real-time inference is suited for web applications and chatbots.",
      "There are clear differences; the choice depends on the use case."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-deployment.html", title: "Deploy a Model" }
    ]
  },
  {
    id: 53,
    question: "What is the primary purpose of Amazon SageMaker Neo?",
    options: [
      "Data collection",
      "Optimizing and compiling machine learning models",
      "Model training",
      "Data visualization"
    ],
    correctAnswer: 1,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Neo is a compiler that optimizes machine learning models for specific hardware platforms, improving inference performance by up to 2x. It enables efficient inference on edge devices and in the cloud.",
    optionExplanations: [
      "Data collection is the role of data pipelines and ETL tools.",
      "✓ Correct: Neo optimizes models trained with TensorFlow, PyTorch, MXNet, and other frameworks for processors such as ARM, Intel, and NVIDIA.",
      "Model training is a feature of SageMaker Training Jobs.",
      "Data visualization is a feature of QuickSight and SageMaker Studio."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/neo.html", title: "SageMaker Neo" }
    ]
  },
  {
    id: 54,
    question: "What does \"pruning\" refer to in machine learning model optimization?",
    options: [
      "Encrypting data",
      "Cleaning data",
      "Improving model training speed",
      "Removing low-importance parameters to reduce model size"
    ],
    correctAnswer: 3,
    category: "AI/ML Fundamentals",
    explanation: "Pruning is a technique that removes low-importance parameters (weights or neurons) from a model, reducing model size and improving inference speed while keeping the loss in accuracy to a minimum.",
    optionExplanations: [
      "Data encryption is a security measure and is unrelated to pruning.",
      "Data cleaning is part of preprocessing and is different from pruning.",
      "Improving training speed is not the direct goal of pruning.",
      "✓ Correct: Pruning reduces model memory usage and makes it possible to run models on edge devices."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/neo.html", title: "Model Optimization" }
    ]
  },
  {
    id: 55,
    question: "What is the primary use case for Amazon Lookout for Vision?",
    options: [
      "Text analysis",
      "Detecting manufacturing defects using computer vision",
      "Speech recognition",
      "Language translation"
    ],
    correctAnswer: 1,
    category: "AWS AI/ML Services",
    explanation: "Amazon Lookout for Vision is a service that uses computer vision to automatically detect defects and anomalies in products and components on manufacturing lines. High-accuracy models can be built from as few as 30 images.",
    optionExplanations: [
      "Text analysis is a feature of Amazon Comprehend.",
      "✓ Correct: Lookout for Vision automates quality control in manufacturing and improves the accuracy of defect detection.",
      "Speech recognition is a feature of Amazon Transcribe.",
      "Language translation is a feature of Amazon Translate."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lookout-for-vision/latest/developer-guide/what-is.html", title: "What is Amazon Lookout for Vision?" }
    ]
  },
  {
    id: 56,
    question: "What is knowledge distillation?",
    options: [
      "A technique for transferring knowledge from a large model to a smaller model",
      "Extracting data from a database",
      "Compressing data",
      "Encrypting a model"
    ],
    correctAnswer: 0,
    category: "AI/ML Fundamentals",
    explanation: "Knowledge distillation is a technique that transfers the knowledge of a large, high-accuracy \"teacher model\" to a small, fast \"student model\". The student model learns from the teacher model's outputs, achieving high performance with fewer parameters.",
    optionExplanations: [
      "✓ Correct: Knowledge distillation creates a compact model deployable on edge devices while preserving the performance of the large model.",
      "Extracting data from a database is an ETL process.",
      "Data compression is a storage optimization technique.",
      "Model encryption is a security measure."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-compression.html", title: "Model Compression" }
    ]
  },
  {
    id: 57,
    question: "What is the primary characteristic of Amazon SageMaker Canvas?",
    options: [
      "A tool that requires advanced programming skills",
      "A no-code tool for building machine learning models without writing code",
      "A database management tool",
      "A network configuration tool"
    ],
    correctAnswer: 1,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Canvas is a no-code tool that enables business analysts and non-data-scientists to build, train, and deploy machine learning models without writing any code.",
    optionExplanations: [
      "Canvas is designed to make ML accessible without programming.",
      "✓ Correct: Canvas uses a visual interface to easily import data, build models, and generate predictions.",
      "Database management is in the domain of RDS and DynamoDB.",
      "Network configuration is in the domain of VPC and networking services."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/canvas.html", title: "SageMaker Canvas" }
    ]
  },
  {
    id: 58,
    question: "What does \"multimodal AI\" refer to?",
    options: [
      "Running multiple models simultaneously",
      "AI that supports multiple languages",
      "AI that can process multiple types of data such as text, images, and audio",
      "AI that runs across multiple data centers"
    ],
    correctAnswer: 2,
    category: "AI/ML Fundamentals",
    explanation: "Multimodal AI is an AI system that can integratively understand and generate different types (modalities) of data — text, images, audio, video, and more. Examples include generating a caption from an image, or generating an image from text.",
    optionExplanations: [
      "Running multiple models simultaneously is ensemble learning or model chaining.",
      "Supporting multiple languages is multilingual AI.",
      "✓ Correct: Multimodal AI learns relationships across different types of data to achieve richer understanding and generation.",
      "Running across multiple data centers is distributed computing."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", title: "Multimodal Models" }
    ]
  },
  {
    id: 59,
    question: "What is the primary use case for Amazon HealthLake?",
    options: [
      "Speech synthesis",
      "General data analysis",
      "Image recognition",
      "Storing, transforming, and analyzing health data"
    ],
    correctAnswer: 3,
    category: "AWS AI/ML Services",
    explanation: "Amazon HealthLake is a HIPAA-eligible service for storing, transforming, querying, and analyzing health data in FHIR (Fast Healthcare Interoperability Resources) format. It uses machine learning to extract insights from medical data.",
    optionExplanations: [
      "Speech synthesis is a feature of Amazon Polly.",
      "General data analysis is a use case for Athena and QuickSight.",
      "Image recognition is a feature of Amazon Rekognition.",
      "✓ Correct: HealthLake structures and makes analyzable unstructured data such as electronic health records, clinical notes, and medical images."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/healthlake/latest/devguide/what-is-amazon-health-lake.html", title: "What is Amazon HealthLake?" }
    ]
  },
  {
    id: 60,
    question: "What does \"edge AI\" refer to?",
    options: [
      "Machine learning inference executed locally on a device",
      "Fast AI",
      "AI that runs only in the cloud",
      "Inexpensive AI"
    ],
    correctAnswer: 0,
    category: "AI/ML Fundamentals",
    explanation: "Edge AI refers to running machine learning inference locally on edge devices — such as smartphones, IoT devices, and industrial equipment — without connecting to the cloud. It enables low latency, privacy protection, and offline operation.",
    optionExplanations: [
      "✓ Correct: Edge AI uses SageMaker Neo and Edge Manager to deploy optimized models to edge devices for real-time inference.",
      "Speed is one benefit, but it is not the definition of edge AI.",
      "Running only in the cloud describes traditional cloud AI.",
      "Cost varies by situation and is not the definition of edge AI."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/edge.html", title: "SageMaker Edge Manager" }
    ]
  },
  {
    id: 61,
    question: "What is the primary feature of Amazon SageMaker Debugger?",
    options: [
      "Database debugging",
      "Code debugging",
      "Network debugging",
      "Automatically detecting and diagnosing issues during model training"
    ],
    correctAnswer: 3,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Debugger is a tool that automatically detects and diagnoses issues such as vanishing gradients, overfitting, and convergence problems during machine learning model training. It monitors training metrics and tensors in real time.",
    optionExplanations: [
      "Database debugging is in the domain of RDS Performance Insights and CloudWatch.",
      "Code debugging is a feature of IDEs and debuggers.",
      "Network debugging is in the domain of VPC Flow Logs and CloudWatch.",
      "✓ Correct: Debugger identifies training job issues early, saving time and cost."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/train-debugger.html", title: "SageMaker Debugger" }
    ]
  },
  {
    id: 62,
    question: "What is the main characteristic of reinforcement learning?",
    options: [
      "Learning from labeled data",
      "Performing dimensionality reduction on data",
      "Clustering data",
      "An agent interacts with an environment and learns to maximize rewards"
    ],
    correctAnswer: 3,
    category: "AI/ML Fundamentals",
    explanation: "Reinforcement learning is a machine learning approach in which an agent takes actions in an environment and learns the optimal action strategy based on the rewards (or penalties) it receives. It is used in game AI, robot control, autonomous driving, and more.",
    optionExplanations: [
      "Learning from labeled data is supervised learning.",
      "Dimensionality reduction is performed using methods such as PCA.",
      "Data clustering is a type of unsupervised learning.",
      "✓ Correct: Reinforcement learning learns optimal actions through trial and error, with notable successes such as AlphaGo."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/reinforcement-learning.html", title: "Reinforcement Learning" }
    ]
  },
  {
    id: 63,
    question: "What is the primary feature of Amazon CodeGuru?",
    options: [
      "ML-powered code reviews and performance recommendations",
      "Automated code generation",
      "Code deployment",
      "Code version control"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "Amazon CodeGuru is a service that uses machine learning to automatically detect code quality issues, security vulnerabilities, and performance bottlenecks, and provides improvement recommendations.",
    optionExplanations: [
      "✓ Correct: CodeGuru provides two components: Reviewer (code review) and Profiler (performance analysis).",
      "Automated code generation is a feature of CodeWhisperer.",
      "Code deployment is a feature of CodeDeploy.",
      "Version control is a feature of CodeCommit and Git."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/welcome.html", title: "Amazon CodeGuru Reviewer" }
    ]
  },
  {
    id: 64,
    question: "What is the primary purpose of hyperparameter tuning?",
    options: [
      "Adding more data",
      "Finding the optimal hyperparameters for a model to improve performance",
      "Reducing model size",
      "Encrypting data"
    ],
    correctAnswer: 1,
    category: "AI/ML Fundamentals",
    explanation: "Hyperparameter tuning is the process of searching for the optimal combination of hyperparameters — such as learning rate, batch size, and number of layers — to maximize model performance. It can be automated with SageMaker Automatic Model Tuning.",
    optionExplanations: [
      "Adding more data is the goal of data augmentation and data collection.",
      "✓ Correct: Hyperparameter tuning is performed using methods such as grid search, random search, and Bayesian optimization.",
      "Reducing model size is the goal of quantization and pruning.",
      "Data encryption is a security measure."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning.html", title: "Automatic Model Tuning" }
    ]
  },
  {
    id: 65,
    question: "What is the primary use case for Amazon Monitron?",
    options: [
      "Network monitoring",
      "Database monitoring",
      "Predictive maintenance for industrial equipment",
      "Application monitoring"
    ],
    correctAnswer: 2,
    category: "AWS AI/ML Services",
    explanation: "Amazon Monitron is a predictive maintenance service that monitors the vibration and temperature of industrial equipment, uses machine learning to detect anomalies, and predicts failures. It is an end-to-end solution integrating sensors, gateways, and cloud analytics.",
    optionExplanations: [
      "Network monitoring is in the domain of CloudWatch and VPC Flow Logs.",
      "Database monitoring is in the domain of RDS Performance Insights and CloudWatch.",
      "✓ Correct: Monitron optimizes equipment maintenance in manufacturing and reduces unexpected downtime.",
      "Application monitoring is in the domain of CloudWatch and X-Ray."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/Monitron/latest/admin-guide/what-is-monitron.html", title: "What is Amazon Monitron?" }
    ]
  },
  {
    id: 66,
    question: "What is the primary purpose of cross-validation?",
    options: [
      "Encrypting data",
      "Increasing the amount of data",
      "Accelerating a model",
      "Evaluating a model's generalization performance and detecting overfitting"
    ],
    correctAnswer: 3,
    category: "AI/ML Fundamentals",
    explanation: "Cross-validation is a technique that divides data into multiple splits (folds) and uses each split in turn as the test set, allowing reliable evaluation of a model's generalization performance. k-fold cross-validation is the most common approach.",
    optionExplanations: [
      "Data encryption is a security measure.",
      "Increasing data is the goal of data augmentation.",
      "Model acceleration is the goal of optimization techniques.",
      "✓ Correct: Cross-validation enables accurate evaluation of model performance even with limited data and helps prevent overfitting."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/machine-learning/latest/dg/cross-validation.html", title: "Cross-Validation" }
    ]
  },
  {
    id: 67,
    question: "What is the primary use case for Amazon Panorama?",
    options: [
      "Speech recognition",
      "Text analysis",
      "Computer vision applications at the edge",
      "Database management"
    ],
    correctAnswer: 2,
    category: "AWS AI/ML Services",
    explanation: "Amazon Panorama is a service that adds computer vision capabilities to existing IP cameras and runs real-time image analysis at the edge. It is used in industries such as manufacturing, retail, and construction.",
    optionExplanations: [
      "Speech recognition is a feature of Amazon Transcribe.",
      "Text analysis is a feature of Amazon Comprehend.",
      "✓ Correct: Panorama runs computer vision tasks such as object detection, people counting, and safety equipment verification at the edge.",
      "Database management is in the domain of RDS and DynamoDB."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/panorama/latest/dev/panorama-welcome.html", title: "What is AWS Panorama?" }
    ]
  },
  {
    id: 68,
    question: "What is feature engineering?",
    options: [
      "Model monitoring",
      "Model deployment",
      "The process of creating and selecting useful features from raw data for machine learning",
      "Data encryption"
    ],
    correctAnswer: 2,
    category: "AI/ML Fundamentals",
    explanation: "Feature engineering is the process of transforming, combining, and selecting raw data to create features that improve machine learning model performance. It is an important step that has a large impact on model accuracy.",
    optionExplanations: [
      "Model monitoring is the tracking of model performance in production.",
      "Model deployment is the process of placing a trained model in a production environment.",
      "✓ Correct: Feature engineering includes normalization, encoding, feature combination, dimensionality reduction, and more.",
      "Data encryption is a security measure."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html", title: "Feature Engineering" }
    ]
  },
  {
    id: 69,
    question: "What is the primary use case when using machine learning with Amazon Neptune?",
    options: [
      "Image classification",
      "Speech recognition",
      "Predictions on graph data (link prediction, node classification, etc.)",
      "Text generation"
    ],
    correctAnswer: 2,
    category: "AWS AI/ML Services",
    explanation: "Amazon Neptune ML runs machine learning on a graph database to perform tasks such as link prediction, node classification, and graph classification. It is used in social network analysis, recommendation systems, and fraud detection.",
    optionExplanations: [
      "Image classification is a use case for Rekognition and SageMaker.",
      "Speech recognition is a feature of Amazon Transcribe.",
      "✓ Correct: Neptune ML uses graph neural networks (GNNs) to extract insights from graph-structured data.",
      "Text generation is a feature of generative AI models."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/neptune/latest/userguide/machine-learning.html", title: "Neptune ML" }
    ]
  },
  {
    id: 70,
    question: "What is a confusion matrix used to evaluate in machine learning models?",
    options: [
      "The prediction accuracy of a classification model (true positives, false positives, true negatives, false negatives)",
      "Model size",
      "Model training speed",
      "Model cost"
    ],
    correctAnswer: 0,
    category: "AI/ML Fundamentals",
    explanation: "A confusion matrix is a tool for evaluating the performance of a classification model. It displays prediction results across four categories: true positives (TP), false positives (FP), true negatives (TN), and false negatives (FN). It can be used to calculate metrics such as accuracy, recall, and F1 score.",
    optionExplanations: [
      "✓ Correct: A confusion matrix shows in detail how a model predicted each class, helping to identify biases and weaknesses.",
      "Model size is measured by the number of parameters or memory usage.",
      "Training speed is measured by time per epoch or number of iterations.",
      "Model cost refers to the expense of training and inference."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/machine-learning/latest/dg/evaluating-model-accuracy.html", title: "Evaluating Model Accuracy" }
    ]
  },
  {
    id: 71,
    question: "What is the difference between accuracy and recall?",
    options: [
      "Accuracy is the proportion of correct predictions out of all predictions; recall is the proportion of actual positives correctly identified",
      "Accuracy and recall mean the same thing",
      "Accuracy is training speed; recall is model size",
      "Accuracy is cost; recall is speed"
    ],
    correctAnswer: 0,
    category: "AI/ML Fundamentals",
    explanation: "Accuracy is the proportion of correct predictions out of all predictions. Recall is the proportion of actual positive samples that the model correctly predicted as positive. With imbalanced data, accuracy alone is insufficient; recall and F1 score are also important.",
    optionExplanations: [
      "✓ Correct: Accuracy = (TP+TN)/(TP+TN+FP+FN); Recall = TP/(TP+FN). Recall is critical in scenarios where missed detections are serious, such as medical diagnosis.",
      "Accuracy and recall are different metrics that evaluate different aspects of performance.",
      "These are performance metrics and are unrelated to training speed or model size.",
      "These are prediction performance metrics and are different from cost or speed."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/machine-learning/latest/dg/evaluating-model-accuracy.html", title: "Evaluating Model Accuracy" }
    ]
  },
  {
    id: 72,
    question: "What is the primary use case for Amazon Omics?",
    options: [
      "Image recognition",
      "Text generation",
      "Speech recognition",
      "Storing, analyzing, and sharing genomics data"
    ],
    correctAnswer: 3,
    category: "AWS AI/ML Services",
    explanation: "Amazon Omics is a fully managed service for storing, querying, and analyzing genomics, transcriptomics, and other omics data at scale. It is used by research institutions and healthcare organizations for precision medicine.",
    optionExplanations: [
      "Image recognition is a feature of Amazon Rekognition.",
      "Text generation is a feature of generative AI models.",
      "Speech recognition is a feature of Amazon Transcribe.",
      "✓ Correct: Omics efficiently processes petabyte-scale genomic data and runs bioinformatics workflows."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/omics/latest/dev/what-is-service.html", title: "What is Amazon Omics?" }
    ]
  },
  {
    id: 73,
    question: "What is gradient descent?",
    options: [
      "A technique for deleting data",
      "A technique for encrypting data",
      "A technique for compressing a model",
      "An optimization algorithm that updates model parameters to minimize the loss function"
    ],
    correctAnswer: 3,
    category: "AI/ML Fundamentals",
    explanation: "Gradient descent is an optimization algorithm that computes the gradient (derivative) of the loss function and updates parameters in the opposite direction of the gradient to minimize the loss. It is the fundamental technique for training machine learning models.",
    optionExplanations: [
      "Deleting data is part of data cleaning.",
      "Data encryption is a security measure.",
      "Model compression involves techniques such as quantization and pruning.",
      "✓ Correct: Variants of gradient descent include batch gradient descent, stochastic gradient descent (SGD), and mini-batch gradient descent."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-training.html", title: "Train a Model" }
    ]
  },
  {
    id: 74,
    question: "What is the primary purpose of the Knowledge Bases feature in Amazon Bedrock?",
    options: [
      "Database management",
      "Cost analysis",
      "Network configuration",
      "Easily implementing RAG architecture and extending foundation models with proprietary data"
    ],
    correctAnswer: 3,
    category: "Generative AI",
    explanation: "Knowledge Bases in Bedrock is a feature that connects proprietary data sources (S3, SharePoint, etc.) to foundation models, enabling easy implementation of RAG (Retrieval-Augmented Generation). Integration with vector databases is also automated.",
    optionExplanations: [
      "Database management is in the domain of RDS and DynamoDB.",
      "Cost analysis is a feature of Cost Explorer.",
      "Network configuration is in the domain of VPC and networking services.",
      "✓ Correct: Knowledge Bases integrates enterprise internal documents and domain expertise into foundation models to generate more accurate and relevant answers."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html", title: "Knowledge Bases for Amazon Bedrock" }
    ]
  },
  {
    id: 75,
    question: "What is the primary purpose of batch normalization?",
    options: [
      "Compressing a model",
      "Deleting data",
      "Stabilizing training and accelerating convergence",
      "Encrypting data"
    ],
    correctAnswer: 2,
    category: "AI/ML Fundamentals",
    explanation: "Batch normalization is a technique that normalizes the inputs of each layer to stabilize training and accelerate convergence. It reduces internal covariate shift and allows the use of higher learning rates.",
    optionExplanations: [
      "Model compression involves techniques such as quantization and pruning.",
      "Deleting data is part of data cleaning.",
      "✓ Correct: Batch normalization makes it easier to train deep neural networks and also reduces overfitting.",
      "Data encryption is a security measure."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/deep-learning.html", title: "Deep Learning" }
    ]
  },
  {
    id: 76,
    question: "What is the primary feature of Amazon Q Developer?",
    options: [
      "AI assistant-powered coding support and troubleshooting",
      "Database management",
      "Network monitoring",
      "Cost optimization"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "Amazon Q Developer is a generative AI-powered assistant for developers that provides code generation, code explanation, bug fixes, test case creation, and answers to questions about AWS services.",
    optionExplanations: [
      "✓ Correct: Q Developer works directly inside IDEs and improves developer productivity. It is the successor to CodeWhisperer.",
      "Database management is in the domain of RDS and DynamoDB.",
      "Network monitoring is in the domain of CloudWatch and VPC Flow Logs.",
      "Cost optimization is a feature of Cost Explorer and Trusted Advisor."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html", title: "What is Amazon Q Developer?" }
    ]
  },
  {
    id: 77,
    question: "What does \"dropout\" refer to in a neural network?",
    options: [
      "Compressing a model",
      "Deleting data",
      "A regularization technique that randomly deactivates neurons during training to prevent overfitting",
      "Stopping training"
    ],
    correctAnswer: 2,
    category: "AI/ML Fundamentals",
    explanation: "Dropout is a regularization technique that temporarily deactivates randomly selected neurons during training, preventing co-adaptation between neurons and reducing overfitting. All neurons are used during inference.",
    optionExplanations: [
      "Model compression involves techniques such as quantization and pruning.",
      "Deleting data is part of data cleaning.",
      "✓ Correct: Dropout causes the model to learn more generalizable features, improving performance on test data.",
      "Stopping training is a separate technique such as early stopping."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/deep-learning.html", title: "Deep Learning" }
    ]
  },
  {
    id: 78,
    question: "What is the primary purpose of the Agents feature in Amazon Bedrock?",
    options: [
      "Automating complex tasks by executing multiple steps and calling APIs",
      "Database backup",
      "Network configuration",
      "Cost reduction"
    ],
    correctAnswer: 0,
    category: "Generative AI",
    explanation: "Bedrock Agents use foundation models to understand user requests, decompose tasks, call APIs, and execute multiple steps to automatically complete complex tasks.",
    optionExplanations: [
      "✓ Correct: Agents can automate multi-step tasks such as reservation systems, inventory management, and customer support.",
      "Database backup is a feature of AWS Backup and RDS.",
      "Network configuration is in the domain of VPC and networking services.",
      "Cost reduction is a feature of Cost Explorer and Trusted Advisor."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html", title: "Agents for Amazon Bedrock" }
    ]
  },
  {
    id: 79,
    question: "What is the primary role of an activation function?",
    options: [
      "Compressing a model",
      "Deleting data",
      "Introducing non-linearity into a neural network to enable learning of complex patterns",
      "Encrypting data"
    ],
    correctAnswer: 2,
    category: "AI/ML Fundamentals",
    explanation: "An activation function applies a non-linear transformation to the output of each neuron in a neural network, enabling the network to learn complex non-linear patterns. Common examples include ReLU, Sigmoid, and Tanh.",
    optionExplanations: [
      "Model compression involves techniques such as quantization and pruning.",
      "Deleting data is part of data cleaning.",
      "✓ Correct: Without activation functions, a neural network would be just a combination of linear transformations and could not learn complex patterns.",
      "Data encryption is a security measure."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/deep-learning.html", title: "Deep Learning" }
    ]
  },
  {
    id: 80,
    question: "What is the primary purpose of the model evaluation feature in Amazon Bedrock?",
    options: [
      "Calculating costs",
      "Comparing the performance of different foundation models and selecting the best one",
      "Network monitoring",
      "Database management"
    ],
    correctAnswer: 1,
    category: "Generative AI",
    explanation: "Bedrock's model evaluation feature allows you to evaluate multiple foundation models against the same dataset and compare metrics such as accuracy, latency, and cost to select the best model for your use case.",
    optionExplanations: [
      "Calculating costs is a feature of Cost Explorer.",
      "✓ Correct: Model evaluation lets you test models with a custom dataset and select the optimal model considering the balance of quality, performance, and cost.",
      "Network monitoring is in the domain of CloudWatch and VPC Flow Logs.",
      "Database management is in the domain of RDS and DynamoDB."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html", title: "Model Evaluation" }
    ]
  },
  {
    id: 81,
    question: "What does the F1 score measure?",
    options: [
      "Model training speed",
      "The harmonic mean of precision and recall",
      "Model size",
      "Inference speed"
    ],
    correctAnswer: 1,
    category: "AI/ML Fundamentals",
    explanation: "The F1 score is the harmonic mean of precision and recall, providing an evaluation metric that balances both. It is especially useful when evaluating models on imbalanced datasets.",
    optionExplanations: [
      "Training speed is measured by time per epoch.",
      "✓ Correct: F1 score = 2 * (Precision * Recall) / (Precision + Recall), ranging from 0 to 1. Closer to 1 is better.",
      "Model size is measured by the number of parameters or memory usage.",
      "Inference speed is measured by the time required to make a prediction."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/machine-learning/latest/dg/evaluating-model-accuracy.html", title: "Evaluating Model Accuracy" }
    ]
  },
  {
    id: 82,
    question: "What is the primary feature of Amazon SageMaker Studio?",
    options: [
      "An integrated development environment (IDE) for machine learning",
      "Network configuration",
      "Database management",
      "Cost analysis"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Studio is an integrated development environment that allows you to manage the entire machine learning lifecycle — data preparation, model building, training, deployment, and monitoring — in a single web-based IDE.",
    optionExplanations: [
      "✓ Correct: SageMaker Studio integrates Jupyter Notebooks, experiment management, model registry, pipelines, and Debugger into a single IDE.",
      "Network configuration is in the domain of VPC and networking services.",
      "Database management is in the domain of RDS and DynamoDB.",
      "Cost analysis is a feature of Cost Explorer."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/studio.html", title: "Amazon SageMaker Studio" }
    ]
  },
  {
    id: 83,
    question: "What does the learning rate control in machine learning?",
    options: [
      "Data loading speed",
      "The step size for parameter updates",
      "Model size",
      "Batch size"
    ],
    correctAnswer: 1,
    category: "AI/ML Fundamentals",
    explanation: "The learning rate is a hyperparameter that controls the step size when updating parameters in gradient descent. Too large a value prevents convergence; too small a value slows down training.",
    optionExplanations: [
      "Data loading speed is related to I/O performance.",
      "✓ Correct: The learning rate is a critical hyperparameter that greatly affects the convergence speed and final performance of a model. Adaptive learning rate methods such as Adam and RMSprop are also widely used.",
      "Model size is determined by the number of layers and neurons.",
      "Batch size is the number of samples processed at one time."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning.html", title: "Hyperparameter Tuning" }
    ]
  },
  {
    id: 84,
    question: "What is the primary purpose of the custom model import feature in Amazon Bedrock?",
    options: [
      "Using a custom fine-tuned model in Bedrock",
      "Importing cost settings",
      "Importing network settings",
      "Importing a database"
    ],
    correctAnswer: 0,
    category: "Generative AI",
    explanation: "Bedrock's custom model import feature allows you to import models fine-tuned with SageMaker or other tools into Bedrock, enabling you to leverage Bedrock's inference API, guardrails, and other capabilities.",
    optionExplanations: [
      "✓ Correct: Custom model import lets you run models fine-tuned on your own data on Bedrock's managed infrastructure.",
      "Importing cost settings is a feature of Cost Explorer.",
      "Importing network settings is in the domain of VPC and networking services.",
      "Importing a database is a feature of DMS and RDS."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization.html", title: "Model Customization" }
    ]
  },
  {
    id: 85,
    question: "What does \"epoch\" refer to in machine learning training?",
    options: [
      "A model version",
      "The number of batches",
      "One complete pass through the entire training dataset",
      "The value of the learning rate"
    ],
    correctAnswer: 2,
    category: "AI/ML Fundamentals",
    explanation: "An epoch refers to one complete pass of the entire training dataset through the model. Multiple epochs are typically run to train the model.",
    optionExplanations: [
      "Model versions are managed in the Model Registry.",
      "The number of batches is determined by the dataset size and batch size.",
      "✓ Correct: For example, training for 10 epochs means the model learns from the entire dataset 10 times.",
      "The learning rate is a hyperparameter that controls the step size for parameter updates."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-training.html", title: "Train a Model" }
    ]
  },
  {
    id: 86,
    question: "What is the primary use case for Amazon Lookout for Equipment?",
    options: [
      "Anomaly detection and predictive maintenance for industrial equipment",
      "Managing database equipment",
      "Monitoring network equipment",
      "Optimizing storage equipment"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "Amazon Lookout for Equipment is a machine learning service that analyzes sensor data to detect anomalies in industrial equipment and predict failures. It is used for predictive maintenance in manufacturing and energy industries.",
    optionExplanations: [
      "✓ Correct: Lookout for Equipment learns anomalous patterns from sensor data such as temperature, pressure, and vibration to predict failures in advance.",
      "Managing database equipment is in the domain of RDS Performance Insights.",
      "Monitoring network equipment is in the domain of CloudWatch and VPC Flow Logs.",
      "Optimizing storage equipment is a feature of S3 and EBS."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/lookout-for-equipment/latest/ug/what-is.html", title: "What is Amazon Lookout for Equipment?" }
    ]
  },
  {
    id: 87,
    question: "What problem do oversampling and undersampling address?",
    options: [
      "A model being too large",
      "Class imbalance (imbalanced data)",
      "Slow training speed",
      "Slow inference speed"
    ],
    correctAnswer: 1,
    category: "AI/ML Fundamentals",
    explanation: "Oversampling and undersampling are techniques for addressing class-imbalanced datasets, where the number of samples in the minority and majority classes differs greatly. Oversampling increases the minority class; undersampling reduces the majority class.",
    optionExplanations: [
      "Model size issues are addressed with quantization and pruning.",
      "✓ Correct: Class imbalance is common in tasks such as fraud detection and medical diagnosis where positive samples are rare. Techniques like SMOTE (Synthetic Minority Over-sampling Technique) are also used.",
      "Training speed issues are addressed through hardware optimization and distributed training.",
      "Inference speed issues are addressed through model optimization and hardware selection."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-data-insights.html", title: "Data Insights" }
    ]
  },
  {
    id: 88,
    question: "What is the main advantage of Provisioned Throughput in Amazon Bedrock?",
    options: [
      "Cost is always lower",
      "Predictable performance and dedicated capacity",
      "Model accuracy improves",
      "Data encryption is strengthened"
    ],
    correctAnswer: 1,
    category: "Generative AI",
    explanation: "Provisioned Throughput secures dedicated model capacity and delivers predictable performance with consistent latency. It is suitable for high-traffic applications.",
    optionExplanations: [
      "Cost varies by usage and may be higher than on-demand.",
      "✓ Correct: Provisioned Throughput guarantees performance at peak times and is not affected by other users.",
      "Model accuracy does not change with Provisioned Throughput.",
      "Data encryption is unrelated to Provisioned Throughput."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html", title: "Provisioned Throughput" }
    ]
  },
  {
    id: 89,
    question: "What is the vanishing gradient problem?",
    options: [
      "A problem where data disappears",
      "A problem where model size grows",
      "A problem in deep neural networks where gradients become extremely small during backpropagation, preventing learning",
      "A problem where inference speed decreases"
    ],
    correctAnswer: 2,
    category: "AI/ML Fundamentals",
    explanation: "The vanishing gradient problem occurs in deep neural networks when gradients become exponentially smaller as they propagate back through layers during backpropagation, causing early-layer parameters to stop updating. It can be mitigated with ReLU activation functions and batch normalization.",
    optionExplanations: [
      "Data disappearance is a data management issue.",
      "Model size growth is a separate issue.",
      "✓ Correct: The vanishing gradient problem is particularly prominent in RNNs (recurrent neural networks) and is addressed by LSTM (Long Short-Term Memory) and GRU.",
      "A decrease in inference speed is a separate issue."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/deep-learning.html", title: "Deep Learning" }
    ]
  },
  {
    id: 90,
    question: "What is the primary purpose of Amazon SageMaker Experiments?",
    options: [
      "Tracking, comparing, and managing machine learning experiments",
      "Network experiments",
      "Database experiments",
      "Cost experiments"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Experiments is a tool that automatically tracks machine learning experiments (training runs with different hyperparameters, algorithms, and datasets), compares results, and helps find the best model.",
    optionExplanations: [
      "✓ Correct: Experiments automatically records training job parameters, metrics, and artifacts, and lets you visualize and compare them.",
      "Network experiments are in the domain of VPC and networking services.",
      "Database experiments are in the domain of RDS and DynamoDB.",
      "Cost experiments are a feature of Cost Explorer."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/experiments.html", title: "SageMaker Experiments" }
    ]
  },
  {
    id: 91,
    question: "What are the ROC curve (Receiver Operating Characteristic Curve) and AUC (Area Under the Curve) used to evaluate?",
    options: [
      "Model training speed",
      "The performance of a binary classification model and its relationship to thresholds",
      "Model size",
      "Inference speed"
    ],
    correctAnswer: 1,
    category: "AI/ML Fundamentals",
    explanation: "The ROC curve plots the relationship between the true positive rate (TPR) and false positive rate (FPR) at different thresholds. The AUC is the area under the ROC curve and represents the model's overall classification performance. An AUC closer to 1 indicates a better model.",
    optionExplanations: [
      "Training speed is measured by time per epoch.",
      "✓ Correct: The ROC curve and AUC are especially useful for evaluating binary classification models on imbalanced datasets, providing a threshold-independent performance metric.",
      "Model size is measured by the number of parameters or memory usage.",
      "Inference speed is measured by the time required to make a prediction."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/machine-learning/latest/dg/evaluating-model-accuracy.html", title: "Evaluating Model Accuracy" }
    ]
  },
  {
    id: 92,
    question: "What is the primary purpose of Amazon SageMaker Model Registry?",
    options: [
      "Database registration",
      "Version control and deployment management for machine learning models",
      "Network registration",
      "User registration"
    ],
    correctAnswer: 1,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Model Registry is a service that manages machine learning model versions and controls model deployments through an approval workflow. It tracks model metadata, metrics, and approval status.",
    optionExplanations: [
      "Database registration is in the domain of RDS and DynamoDB.",
      "✓ Correct: Model Registry simplifies model lifecycle management and automates the approval process before deployment to production.",
      "Network registration is in the domain of VPC and networking services.",
      "User registration is a feature of IAM and Cognito."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html", title: "SageMaker Model Registry" }
    ]
  },
  {
    id: 93,
    question: "What does backpropagation do in a neural network?",
    options: [
      "Processes data in reverse order",
      "Computes the gradient of the loss function and updates parameters",
      "Compresses a model",
      "Encrypts data"
    ],
    correctAnswer: 1,
    category: "AI/ML Fundamentals",
    explanation: "Backpropagation is an algorithm that computes the gradient of the loss function from the output layer back to the input layer of a neural network and updates each layer's parameters. It is the foundational technique for training deep learning models.",
    optionExplanations: [
      "Processing data in reverse order is different from backpropagation.",
      "✓ Correct: Backpropagation uses the chain rule to efficiently compute gradients and, combined with gradient descent, optimizes parameters.",
      "Model compression involves techniques such as quantization and pruning.",
      "Data encryption is a security measure."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/deep-learning.html", title: "Deep Learning" }
    ]
  },
  {
    id: 94,
    question: "What is the main advantage of the fine-tuning feature in Amazon Bedrock?",
    options: [
      "Cost is always lower",
      "Inference speed is always faster",
      "Customizing a model with proprietary data to improve performance on specific tasks",
      "Model size becomes smaller"
    ],
    correctAnswer: 2,
    category: "Generative AI",
    explanation: "Bedrock's fine-tuning allows you to further train a foundation model on your own data to achieve specialized performance for a specific domain or task. It produces more accurate results than prompt engineering alone.",
    optionExplanations: [
      "Fine-tuning incurs additional costs.",
      "Inference speed does not change with fine-tuning.",
      "✓ Correct: Fine-tuning incorporates company-specific terminology, style, and knowledge into the model to generate more accurate and relevant outputs.",
      "Model size does not change with fine-tuning."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html", title: "Custom Models" }
    ]
  },
  {
    id: 95,
    question: "What is the primary purpose of regularization?",
    options: [
      "Improving training speed",
      "Preventing overfitting and improving model generalization",
      "Increasing model size",
      "Increasing data"
    ],
    correctAnswer: 1,
    category: "AI/ML Fundamentals",
    explanation: "Regularization is a technique that penalizes model complexity to prevent overfitting and improve generalization to unseen data. Examples include L1 regularization, L2 regularization, and dropout.",
    optionExplanations: [
      "Improving training speed is not the primary purpose of regularization.",
      "✓ Correct: Regularization prevents a model from overfitting to training data and enables good performance on test data as well.",
      "Increasing model size is not the purpose of regularization.",
      "Increasing data is the purpose of data augmentation."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/machine-learning/latest/dg/model-fit-underfitting-vs-overfitting.html", title: "Overfitting vs. Underfitting" }
    ]
  },
  {
    id: 96,
    question: "What is the primary use of Amazon SageMaker Processing Jobs?",
    options: [
      "Data pre-processing and post-processing",
      "Cost analysis",
      "Model deployment",
      "Model training"
    ],
    correctAnswer: 0,
    category: "AWS AI/ML Services",
    explanation: "SageMaker Processing Jobs is a fully managed service for executing data pre-processing (feature engineering, data cleaning) and post-processing (model evaluation, batch transformation) tasks in machine learning workflows.",
    optionExplanations: [
      "✓ Correct: Processing Jobs can run large-scale data processing tasks using Spark, scikit-learn, or custom containers.",
      "Cost analysis is a function of Cost Explorer.",
      "Model deployment is a function of SageMaker Endpoints.",
      "Model training is a function of SageMaker Training Jobs."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/processing-job.html", title: "Processing Jobs" }
    ]
  },
  {
    id: 97,
    question: "Which task is a Convolutional Neural Network (CNN) particularly good at?",
    options: [
      "Time-series forecasting",
      "Image recognition and processing",
      "Text generation",
      "Speech synthesis"
    ],
    correctAnswer: 1,
    category: "AI/ML Fundamentals",
    explanation: "CNNs have convolutional layers that efficiently extract spatial features from images, making them especially well-suited for image processing tasks such as image classification, object detection, and semantic segmentation.",
    optionExplanations: [
      "Time-series forecasting is a task at which RNNs and LSTMs excel.",
      "✓ Correct: CNNs learn local patterns hierarchically and possess translational invariance, making them optimal for image recognition.",
      "Text generation is a task at which Transformers and large language models excel.",
      "Speech synthesis typically uses dedicated models such as WaveNet."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/image-classification.html", title: "Image Classification" }
    ]
  },
  {
    id: 98,
    question: "What is the primary benefit of Amazon Bedrock's streaming response feature?",
    options: [
      "Model accuracy is improved",
      "Costs are reduced",
      "Generated text can be received incrementally in real time",
      "Data is encrypted"
    ],
    correctAnswer: 2,
    category: "Generative AI",
    explanation: "Streaming responses allow you to receive the output of a generative AI model incrementally before it is fully generated. This improves the user experience and enables you to build highly responsive applications.",
    optionExplanations: [
      "Model accuracy does not change with streaming.",
      "Cost is the same whether streaming or non-streaming.",
      "✓ Correct: Streaming responses reduce perceived latency in chatbots and interactive applications, making users less aware of wait times.",
      "Data encryption is unrelated to streaming."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-invoke.html", title: "Invoke a model" }
    ]
  },
  {
    id: 99,
    question: "Which task is a Recurrent Neural Network (RNN) particularly good at?",
    options: [
      "Image classification",
      "Database management",
      "Time-series data and natural language processing",
      "Network configuration"
    ],
    correctAnswer: 2,
    category: "AI/ML Fundamentals",
    explanation: "RNNs have a recursive structure that retains information from previous time steps, making them well-suited for processing sequential data such as time-series data (stock price forecasting, speech recognition) and natural language processing (machine translation, text generation).",
    optionExplanations: [
      "Image classification is a task at which CNNs excel.",
      "Database management is the domain of RDS and DynamoDB.",
      "✓ Correct: Improved variants of RNNs such as LSTM (Long Short-Term Memory) and GRU (Gated Recurrent Unit) are widely used and can learn long-term dependencies.",
      "Network configuration is the domain of VPC and networking services."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/sagemaker/latest/dg/seq-2-seq.html", title: "Sequence to Sequence" }
    ]
  },
  {
    id: 100,
    question: "Which of the following is NOT included among the filters that can be configured in Amazon Bedrock Guardrails?",
    options: [
      "Harmful content filter",
      "Database query filter",
      "Personally Identifiable Information (PII) filter",
      "Topic filter"
    ],
    correctAnswer: 1,
    category: "Responsible AI",
    explanation: "Bedrock Guardrails can be configured with filters for harmful content, personally identifiable information, denied topics, sensitive information, and words, but database query filtering is not included.",
    optionExplanations: [
      "The harmful content filter is one of the core features of Guardrails. It detects violence, hate speech, sexual content, and similar material.",
      "✓ Correct: Database query filtering is not a feature of Bedrock Guardrails. It must be implemented at the application level.",
      "The PII filter is one of the core features of Guardrails. It detects and masks names, addresses, credit card numbers, and similar information.",
      "The topic filter is one of the core features of Guardrails. It can deny questions and responses related to specific topics."
    ],
    references: [
      { url: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html", title: "Amazon Bedrock Guardrails" }
    ]
  }
];
