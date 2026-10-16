export const allProjects = [
    // Featured Projects
    {
        title: "Neural Speech Tracking",
        image: "/eeg_cap.webp",
        category: "Final Year Project",
        status: "Ongoing",
        description: "Fusion of Speech and EEG signals for neural speech tracking. Research-driven project exploring the intersection of neuroscience and signal processing.",
        longDescription: "This Final Year Project explores the cutting-edge fusion of speech and EEG (electroencephalogram) signals for neural speech tracking. By combining neuroscience with advanced signal processing techniques, we aim to decode neural patterns associated with speech production and perception. This research has applications in brain-computer interfaces, assistive technologies, and understanding the neural basis of human communication.",
        year: "2024",
        tech: ["EEG", "Signal Processing", "Deep Learning", "Python", "MATLAB", "Brain-Computer Interface"],
        color: "from-surface-alt to-surface"
    },
    {
        title: "BioSense-AI",
        image: "/biosense.webp",
        category: "Health Tech / IoT",
        status: "Completed",
        description: "Portable health monitoring device with advanced ECG technology for precise diagnostics. Connected to a mobile app for real-time health insights using ML to classify conditions.",
        longDescription: "BioSense-AI is a portable health monitoring device featuring advanced ECG technology for precise cardiac diagnostics. The system connects to a companion mobile application providing real-time health insights. Using machine learning algorithms, it accurately classifies conditions like asthma and heart failure.",
        year: "Aug 2023",
        tech: ["ECG", "PPG", "Machine Learning", "Mobile App", "IoT", "TensorFlow"],
        color: "from-surface-alt to-surface"
    },
    {
        title: "GGUF Model Converter",
        image: "/gguf.webp",
        category: "AI Tools / Open Source",
        status: "Active",
        description: "Python toolkit automating the full pipeline for LLaMA models: clone llama.cpp, convert HF models to GGUF format, quantize with precision options, and upload to Hugging Face Hub.",
        longDescription: "llama-tools-aisee is an open-source Python toolkit that automates the complete pipeline for preparing Hugging Face LLaMA models for llama.cpp. It provides both CLI and Python API interfaces for seamless model conversion and deployment.",
        year: "2024",
        tech: ["Python", "llama.cpp", "GGUF", "Hugging Face", "CLI", "PyPI"],
        github: "https://github.com/aisee-ai/gguf-converter-huggingface",
        color: "from-surface-alt to-surface"
    },
    {
        title: "AiSee LLaMa Android SDK",
        image: "/llama.webp",
        category: "Mobile AI / SDK",
        status: "Active",
        description: "Android SDK for searching .gguf LLaMA models from Hugging Face with on-device inference. Designed for private, efficient, mobile-friendly AI deployments.",
        longDescription: "The AiSee LLaMa Android SDK enables mobile developers to integrate on-device LLM inference into Android applications with no cloud dependency. It supports searching and retrieving .gguf models from Hugging Face with streamed responses.",
        year: "2024",
        tech: ["Android", "Kotlin", "GGUF", "On-Device AI", "JitPack", "LLaMA"],
        github: "https://github.com/aisee-ai/gguf-models-android",
        color: "from-surface-alt to-surface"
    },
    {
        title: "Industrial End Effector",
        image: "/endeff.webp",
        category: "Robotics / Automation",
        status: "Completed",
        description: "Industrial end effector with vacuum gripper for automated pick-and-place robots. Uses ToF sensors for precise angle measurement with Modbus protocol.",
        longDescription: "This industrial automation project features an advanced end effector designed for automated pick-and-place robot systems. It integrates four ToF sensors for precise box yaw and pitch angle measurement with Modbus protocol communication.",
        year: "May 2024",
        tech: ["ToF Sensors", "Modbus", "Automation", "Embedded", "Industrial Robotics", "C++"],
        color: "from-slate-500 to-gray-600"
    },
    {
        title: "Hodi (Sinhala OCR)",
        image: "/hodi.webp",
        category: "OCR / Deep Learning",
        status: "Ongoing",
        description: "Mobile app using OCR technology to identify both handwritten and printed Sinhala letters for text extraction.",
        longDescription: "Hodi is a mobile application that leverages OCR technology to identify both handwritten and printed Sinhala letters. Using deep learning models and TensorFlow Lite, it provides accurate text extraction and recognition for the Sinhala language.",
        year: "2024",
        tech: ["OCR", "Dart", "Flutter", "Deep Learning", "TensorFlow Lite"],
        github: "https://github.com/jaliyanimanthako/Hodi-Sinhala-OCR-Project-",
        color: "from-surface-alt to-surface"
    },
    // Deep Learning / AI Projects
    {
        title: "Sign Language Recognition",
        image: "/sign-language.webp",
        category: "Wearable AI",
        status: "Ongoing",
        description: "Wearable device for real-time hand sign recognition using sEMG and IMU sensors. Converts gestures into audible speech through deep learning.",
        longDescription: "A wearable device designed for real-time hand sign recognition using surface electromyography (sEMG) and IMU sensors. The system converts gestures into audible speech through advanced deep learning algorithms.",
        year: "2024",
        tech: ["sEMG", "IMU", "Deep Learning", "Embedded", "Signal Processing", "Python", "TensorFlow", "OpenCV"],
        color: "from-surface-alt to-surface"
    },
    {
        title: "Campus Yamu",
        image: "/campus-yamu.jpeg",
        category: "AI / Web Application",
        status: "Completed",
        description: "AI-powered web app helping Sri Lankan students discover university programs based on Z-scores using RAG, LangChain, and OpenAI.",
        longDescription: "Campus Yamu is an AI-powered web application designed to help Sri Lankan students discover university programs based on their Z-scores. It leverages RAG (Retrieval-Augmented Generation), LangChain, and OpenAI to provide intelligent recommendations.",
        year: "Aug 2024",
        tech: ["RAG", "LangChain", "OpenAI", "Web Dev", "Python"],
        color: "from-surface-alt to-surface"
    },
    {
        title: "Facial Expression Recognition",
        image: "/facial-expression.png",
        category: "Computer Vision",
        status: "Completed",
        description: "Semi-supervised contrastive learning model classifying 8 expression classes with multi-modal features for real-world robustness.",
        longDescription: "A semi-supervised contrastive learning model for facial expression recognition that classifies 8 expression classes. Uses multi-modal features for enhanced robustness in real-world scenarios.",
        year: "Oct 2024",
        tech: ["Contrastive Learning", "CNN", "PyTorch", "Computer Vision"],
        color: "from-surface-alt to-surface"
    },
    {
        title: "TumorVision",
        image: "/tumorvision.png",
        category: "Medical AI",
        status: "Completed",
        description: "Web application for brain tumor detection using deep learning. Identifies glioma, meningioma, pituitary tumors.",
        longDescription: "TumorVision is a web application for brain tumor detection using deep learning. It can identify and classify glioma, meningioma, and pituitary tumors from MRI scans with high accuracy.",
        year: "April 2024",
        tech: ["Deep Learning", "Medical Imaging", "Web App", "PyTorch"],
        color: "from-surface-alt to-surface"
    },
    {
        title: "GOYAMA",
        image: "/goyama.jpeg",
        category: "Agriculture AI",
        status: "Completed",
        description: "PyTorch model identifying rice leaf diseases with ~98% accuracy on test sets.",
        longDescription: "GOYAMA is a PyTorch-based deep learning model for identifying rice leaf diseases. Achieves approximately 98% accuracy on test sets, helping farmers detect and manage crop diseases early.",
        year: "June 2024",
        tech: ["PyTorch", "CNN", "Agriculture", "Image Classification"],
        color: "from-surface-alt to-surface"
    },
    {
        title: "Vehicle Detection (YOLOv8)",
        image: "/vehicle-detection.png",
        category: "Computer Vision",
        status: "Completed",
        description: "Vehicle detection using YOLOv8 and KITTI dataset for road safety with real-time monitoring.",
        longDescription: "Real-time vehicle detection system using YOLOv8 trained on the KITTI dataset. Designed for road safety applications with efficient real-time monitoring capabilities.",
        year: "June 2024",
        tech: ["YOLOv8", "KITTI", "Object Detection", "Python"],
        color: "from-surface-alt to-surface"
    },
    {
        title: "U-Net Image Segmentation",
        image: "/unet-segmentation.webp",
        category: "Deep Learning",
        status: "Completed",
        description: "U-Net architecture in TensorFlow/Keras for semantic segmentation on CARLA self-driving dataset.",
        longDescription: "Implementation of U-Net architecture in TensorFlow/Keras for semantic segmentation. Trained on the CARLA self-driving car simulator dataset for autonomous vehicle applications.",
        year: "May 2024",
        tech: ["U-Net", "TensorFlow", "Keras", "CARLA", "Semantic Segmentation"],
        color: "from-surface-alt to-surface"
    },
    {
        title: "NextWordPredictor",
        image: "/next-word-predictor.jpeg",
        category: "NLP",
        status: "Ongoing",
        description: "Next-word prediction model using TensorFlow/Keras with LSTM neural networks.",
        longDescription: "A next-word prediction model built using TensorFlow/Keras with LSTM neural networks. Capable of predicting the next word in a sequence based on context.",
        year: "2024",
        tech: ["LSTM", "TensorFlow", "NLP", "Python", "Keras"],
        color: "from-surface-alt to-surface"
    },
    // Robotics / Embedded
    {
        title: "Line-Following Robot (PID)",
        image: "/line-following-robot.jpeg",
        category: "Robotics",
        status: "Completed",
        description: "Robotic system for line following and obstacle avoidance using PID control with Arduino.",
        longDescription: "A robotic system designed for line following and obstacle avoidance using PID control algorithms. Built with Arduino, IR sensors for line detection, and ultrasonic sensors for obstacle detection.",
        year: "Nov 2023",
        tech: ["Arduino", "PID", "IR Sensors", "Ultrasonic", "C++"],
        color: "from-surface-alt to-surface"
    },
    {
        title: "NutriTech Pot",
        image: "/nutritech-pot.jpeg",
        category: "IoT / Smart Agriculture",
        status: "Completed",
        description: "Smart plant care system that automatically waters plants based on soil moisture with remote monitoring.",
        longDescription: "NutriTech Pot is a smart plant care system that automatically waters plants based on soil moisture levels. Features remote monitoring capabilities through a connected mobile application.",
        year: "Aug 2023",
        tech: ["IoT", "Sensors", "Mobile App", "Arduino", "ESP32"],
        color: "from-surface-alt to-surface"
    }
];
