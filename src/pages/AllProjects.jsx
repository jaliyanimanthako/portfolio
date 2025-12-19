import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ArrowLeft, X } from 'lucide-react';

const allProjects = [
    // Featured Projects
    {
        title: "Neural Speech Tracking",
        category: "Final Year Project",
        status: "Ongoing",
        description: "Fusion of Speech and EEG signals for neural speech tracking. Research-driven project exploring the intersection of neuroscience and signal processing.",
        longDescription: "This Final Year Project explores the cutting-edge fusion of speech and EEG (electroencephalogram) signals for neural speech tracking. By combining neuroscience with advanced signal processing techniques, we aim to decode neural patterns associated with speech production and perception. This research has applications in brain-computer interfaces, assistive technologies, and understanding the neural basis of human communication.",
        year: "2024",
        tech: ["EEG", "Signal Processing", "Deep Learning", "Python", "MATLAB", "Brain-Computer Interface"],
        color: "from-cyan-500 to-blue-600"
    },
    {
        title: "BioSense-AI",
        category: "Health Tech / IoT",
        status: "Completed",
        description: "Portable health monitoring device with advanced ECG technology for precise diagnostics. Connected to a mobile app for real-time health insights using ML to classify conditions.",
        longDescription: "BioSense-AI is a portable health monitoring device featuring advanced ECG technology for precise cardiac diagnostics. The system connects to a companion mobile application providing real-time health insights. Using machine learning algorithms, it accurately classifies conditions like asthma and heart failure.",
        year: "Aug 2023",
        tech: ["ECG", "PPG", "Machine Learning", "Mobile App", "IoT", "TensorFlow"],
        color: "from-emerald-500 to-teal-600"
    },
    {
        title: "GGUF Model Converter",
        category: "AI Tools / Open Source",
        status: "Active",
        description: "Python toolkit automating the full pipeline for LLaMA models: clone llama.cpp, convert HF models to GGUF format, quantize with precision options, and upload to Hugging Face Hub.",
        longDescription: "llama-tools-aisee is an open-source Python toolkit that automates the complete pipeline for preparing Hugging Face LLaMA models for llama.cpp. It provides both CLI and Python API interfaces for seamless model conversion and deployment.",
        year: "2024",
        tech: ["Python", "llama.cpp", "GGUF", "Hugging Face", "CLI", "PyPI"],
        github: "https://github.com/aisee-ai/gguf-converter-huggingface",
        color: "from-purple-500 to-indigo-600"
    },
    {
        title: "AiSee LLaMa Android SDK",
        category: "Mobile AI / SDK",
        status: "Active",
        description: "Android SDK for searching .gguf LLaMA models from Hugging Face with on-device inference. Designed for private, efficient, mobile-friendly AI deployments.",
        longDescription: "The AiSee LLaMa Android SDK enables mobile developers to integrate on-device LLM inference into Android applications with no cloud dependency. It supports searching and retrieving .gguf models from Hugging Face with streamed responses.",
        year: "2024",
        tech: ["Android", "Kotlin", "GGUF", "On-Device AI", "JitPack", "LLaMA"],
        github: "https://github.com/aisee-ai/gguf-models-android",
        color: "from-orange-500 to-red-600"
    },
    {
        title: "Industrial End Effector",
        category: "Robotics / Automation",
        status: "Completed",
        description: "Industrial end effector with vacuum gripper for automated pick-and-place robots. Uses ToF sensors for precise angle measurement with Modbus protocol.",
        longDescription: "This industrial automation project features an advanced end effector designed for automated pick-and-place robot systems. It integrates four ToF sensors for precise box yaw and pitch angle measurement with Modbus protocol communication.",
        year: "May 2024",
        tech: ["ToF Sensors", "Modbus", "Automation", "Embedded", "Industrial Robotics"],
        color: "from-slate-500 to-gray-600"
    },
    {
        title: "Hodi (Sinhala OCR)",
        category: "OCR / Deep Learning",
        status: "Ongoing",
        description: "Mobile app using OCR technology to identify both handwritten and printed Sinhala letters for text extraction.",
        longDescription: "Hodi is a mobile application that leverages OCR technology to identify both handwritten and printed Sinhala letters. Using deep learning models and TensorFlow Lite, it provides accurate text extraction and recognition for the Sinhala language.",
        year: "2024",
        tech: ["OCR", "Dart", "Flutter", "Deep Learning", "TensorFlow Lite"],
        github: "https://github.com/jaliyanimanthako/Hodi-Sinhala-OCR-Project-",
        color: "from-cyan-500 to-blue-600"
    },
    // Deep Learning / AI Projects
    {
        title: "Sign Language Recognition",
        category: "Wearable AI",
        status: "Ongoing",
        description: "Wearable device for real-time hand sign recognition using sEMG and IMU sensors. Converts gestures into audible speech through deep learning.",
        longDescription: "A wearable device designed for real-time hand sign recognition using surface electromyography (sEMG) and IMU sensors. The system converts gestures into audible speech through advanced deep learning algorithms.",
        year: "2024",
        tech: ["sEMG", "IMU", "Deep Learning", "Embedded", "Signal Processing"],
        color: "from-purple-500 to-indigo-600"
    },
    {
        title: "Campus Yamu",
        category: "AI / Web Application",
        status: "Completed",
        description: "AI-powered web app helping Sri Lankan students discover university programs based on Z-scores using RAG, LangChain, and OpenAI.",
        longDescription: "Campus Yamu is an AI-powered web application designed to help Sri Lankan students discover university programs based on their Z-scores. It leverages RAG (Retrieval-Augmented Generation), LangChain, and OpenAI to provide intelligent recommendations.",
        year: "Aug 2024",
        tech: ["RAG", "LangChain", "OpenAI", "Web Dev", "Python"],
        color: "from-orange-500 to-red-600"
    },
    {
        title: "Facial Expression Recognition",
        category: "Computer Vision",
        status: "Completed",
        description: "Semi-supervised contrastive learning model classifying 8 expression classes with multi-modal features for real-world robustness.",
        longDescription: "A semi-supervised contrastive learning model for facial expression recognition that classifies 8 expression classes. Uses multi-modal features for enhanced robustness in real-world scenarios.",
        year: "Oct 2024",
        tech: ["Contrastive Learning", "CNN", "PyTorch", "Computer Vision"],
        color: "from-pink-500 to-rose-600"
    },
    {
        title: "TumorVision",
        category: "Medical AI",
        status: "Completed",
        description: "Web application for brain tumor detection using deep learning. Identifies glioma, meningioma, pituitary tumors.",
        longDescription: "TumorVision is a web application for brain tumor detection using deep learning. It can identify and classify glioma, meningioma, and pituitary tumors from MRI scans with high accuracy.",
        year: "April 2024",
        tech: ["Deep Learning", "Medical Imaging", "Web App", "PyTorch"],
        color: "from-red-500 to-pink-600"
    },
    {
        title: "GOYAMA",
        category: "Agriculture AI",
        status: "Completed",
        description: "PyTorch model identifying rice leaf diseases with ~98% accuracy on test sets.",
        longDescription: "GOYAMA is a PyTorch-based deep learning model for identifying rice leaf diseases. Achieves approximately 98% accuracy on test sets, helping farmers detect and manage crop diseases early.",
        year: "June 2024",
        tech: ["PyTorch", "CNN", "Agriculture", "Image Classification"],
        color: "from-green-500 to-emerald-600"
    },
    {
        title: "Vehicle Detection (YOLOv8)",
        category: "Computer Vision",
        status: "Completed",
        description: "Vehicle detection using YOLOv8 and KITTI dataset for road safety with real-time monitoring.",
        longDescription: "Real-time vehicle detection system using YOLOv8 trained on the KITTI dataset. Designed for road safety applications with efficient real-time monitoring capabilities.",
        year: "June 2024",
        tech: ["YOLOv8", "KITTI", "Object Detection", "Python"],
        color: "from-blue-500 to-indigo-600"
    },
    {
        title: "U-Net Image Segmentation",
        category: "Deep Learning",
        status: "Completed",
        description: "U-Net architecture in TensorFlow/Keras for semantic segmentation on CARLA self-driving dataset.",
        longDescription: "Implementation of U-Net architecture in TensorFlow/Keras for semantic segmentation. Trained on the CARLA self-driving car simulator dataset for autonomous vehicle applications.",
        year: "May 2024",
        tech: ["U-Net", "TensorFlow", "Keras", "CARLA", "Semantic Segmentation"],
        color: "from-violet-500 to-purple-600"
    },
    {
        title: "NextWordPredictor",
        category: "NLP",
        status: "Ongoing",
        description: "Next-word prediction model using TensorFlow/Keras with LSTM neural networks.",
        longDescription: "A next-word prediction model built using TensorFlow/Keras with LSTM neural networks. Capable of predicting the next word in a sequence based on context.",
        year: "2024",
        tech: ["LSTM", "TensorFlow", "NLP", "Python", "Keras"],
        color: "from-amber-500 to-orange-600"
    },
    // Robotics / Embedded
    {
        title: "Line-Following Robot (PID)",
        category: "Robotics",
        status: "Completed",
        description: "Robotic system for line following and obstacle avoidance using PID control with Arduino.",
        longDescription: "A robotic system designed for line following and obstacle avoidance using PID control algorithms. Built with Arduino, IR sensors for line detection, and ultrasonic sensors for obstacle detection.",
        year: "Nov 2023",
        tech: ["Arduino", "PID", "IR Sensors", "Ultrasonic", "C++"],
        color: "from-teal-500 to-cyan-600"
    },
    {
        title: "NutriTech Pot",
        category: "IoT / Smart Agriculture",
        status: "Completed",
        description: "Smart plant care system that automatically waters plants based on soil moisture with remote monitoring.",
        longDescription: "NutriTech Pot is a smart plant care system that automatically waters plants based on soil moisture levels. Features remote monitoring capabilities through a connected mobile application.",
        year: "Aug 2023",
        tech: ["IoT", "Sensors", "Mobile App", "Arduino", "ESP32"],
        color: "from-lime-500 to-green-600"
    }
];

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[200]"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-4 md:inset-10 lg:inset-16 z-[201] overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0a0a] via-[#0f0f1a] to-[#0a0a0a] border border-white/10"
                    >
                        {/* Background gradient effects */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-900/15 rounded-full blur-[120px] pointer-events-none" />

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
                        >
                            <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <div className="h-full overflow-y-auto p-8 md:p-12 lg:p-16">
                            {/* Header */}
                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-cyan-400 text-sm tracking-widest uppercase">
                                        {project.category}
                                    </span>
                                    {(project.status === "Ongoing" || project.status === "Active") && (
                                        <span className={`px-3 py-1 text-xs rounded-full ${project.status === "Ongoing" ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                            {project.status}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-none mb-6">
                                    {project.title}
                                </h2>
                                <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl">
                                    {project.longDescription || project.description}
                                </p>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div>
                                    <h3 className="text-white/40 text-sm uppercase tracking-widest mb-4">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="px-4 py-2 rounded-full bg-white/5 text-white border border-white/10 text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-white/40 text-sm uppercase tracking-widest mb-4">Year</h3>
                                    <p className="text-white text-2xl font-display">{project.year}</p>
                                </div>
                            </div>

                            {/* GitHub Link */}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-cyan-400 transition-colors"
                                >
                                    <Github size={20} />
                                    View on GitHub
                                    <ArrowUpRight size={18} />
                                </a>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const ProjectCard = ({ project, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5 }}
            onClick={onClick}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer"
        >
            <div className="p-5 space-y-3">
                <div className="flex justify-between items-start gap-2">
                    <span className="text-cyan-400 text-xs tracking-widest uppercase font-medium">
                        {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                        {(project.status === "Ongoing" || project.status === "Active") && (
                            <span className={`px-2 py-0.5 text-xs rounded-full border ${project.status === "Ongoing" ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
                                {project.status}
                            </span>
                        )}
                        <span className="text-white/40 font-mono text-xs">{project.year}</span>
                    </div>
                </div>

                <h3 className="text-lg font-display font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                    {project.tech.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded-full bg-white/5 text-gray-500 border border-white/10">
                            {tech}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-white/5 text-gray-600">+{project.tech.length - 3}</span>
                    )}
                </div>

                {project.github && (
                    <div className="inline-flex items-center gap-1.5 text-gray-500 text-sm pt-2">
                        <Github size={14} />
                        <span>GitHub</span>
                    </div>
                )}
            </div>

            {/* Arrow indicator */}
            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight size={14} className="text-white/50" />
            </div>

            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
        </motion.div>
    );
};

const AllProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <>
            <div className="min-h-screen bg-black text-white">
                {/* Header */}
                <div className="container py-8">
                    <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={18} />
                        <span>Back to Home</span>
                    </a>
                </div>

                <section className="py-12 md:py-20">
                    <div className="container">
                        {/* Page Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 md:mb-16"
                        >
                            <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase block mb-4">Complete Portfolio</span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-none mb-6">
                                ALL PROJECTS
                            </h1>
                            <p className="max-w-2xl text-gray-400 text-lg">
                                A comprehensive collection of my work in deep learning, computer vision, embedded systems, robotics, and AI applications.
                            </p>
                        </motion.div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {allProjects.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    project={project}
                                    index={index}
                                    onClick={() => setSelectedProject(project)}
                                />
                            ))}
                        </div>

                        {/* GitHub CTA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mt-16 text-center"
                        >
                            <a
                                href="https://github.com/jaliyanimanthako"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-display font-bold uppercase tracking-wide text-sm rounded-full hover:bg-white hover:text-black transition-all duration-300"
                            >
                                <Github size={18} />
                                <span>View GitHub Profile</span>
                                <ArrowUpRight size={18} />
                            </a>
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={selectedProject !== null}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
};

export default AllProjectsPage;
