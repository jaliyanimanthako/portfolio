import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ArrowLeft } from 'lucide-react';

const allProjects = [
    // Featured Projects
    {
        title: "Neural Speech Tracking",
        category: "Final Year Project",
        status: "Ongoing",
        description: "Fusion of Speech and EEG signals for neural speech tracking. Research-driven project exploring the intersection of neuroscience and signal processing.",
        year: "2024",
        tech: ["EEG", "Signal Processing", "Deep Learning", "Python"],
        color: "from-cyan-500 to-blue-600"
    },
    {
        title: "BioSense-AI",
        category: "Health Tech / IoT",
        status: "Completed",
        description: "Portable health monitoring device with advanced ECG technology for precise diagnostics. Connected to a mobile app for real-time health insights using ML to classify conditions.",
        year: "Aug 2023",
        tech: ["ECG", "PPG", "Machine Learning", "Mobile App"],
        color: "from-emerald-500 to-teal-600"
    },
    {
        title: "GGUF Model Converter",
        category: "AI Tools / Open Source",
        status: "Active",
        description: "Python toolkit automating the full pipeline for LLaMA models: clone llama.cpp, convert HF models to GGUF format, quantize with precision options, and upload to Hugging Face Hub.",
        year: "2024",
        tech: ["Python", "llama.cpp", "GGUF", "Hugging Face"],
        github: "https://github.com/aisee-ai/gguf-converter-huggingface",
        color: "from-purple-500 to-indigo-600"
    },
    {
        title: "AiSee LLaMa Android SDK",
        category: "Mobile AI / SDK",
        status: "Active",
        description: "Android SDK for searching .gguf LLaMA models from Hugging Face with on-device inference. Designed for private, efficient, mobile-friendly AI deployments.",
        year: "2024",
        tech: ["Android", "Kotlin", "GGUF", "On-Device AI"],
        github: "https://github.com/aisee-ai/gguf-models-android",
        color: "from-orange-500 to-red-600"
    },
    {
        title: "Industrial End Effector",
        category: "Robotics / Automation",
        status: "Completed",
        description: "Industrial end effector with vacuum gripper for automated pick-and-place robots. Uses ToF sensors for precise angle measurement with Modbus protocol.",
        year: "May 2024",
        tech: ["ToF Sensors", "Modbus", "Automation", "Embedded"],
        color: "from-slate-500 to-gray-600"
    },
    {
        title: "Hodi (Sinhala OCR)",
        category: "OCR / Deep Learning",
        status: "Ongoing",
        description: "Mobile app using OCR technology to identify both handwritten and printed Sinhala letters for text extraction.",
        year: "2024",
        tech: ["OCR", "Dart", "Flutter", "Deep Learning"],
        github: "https://github.com/jaliyanimanthako/Hodi-Sinhala-OCR-Project-",
        color: "from-cyan-500 to-blue-600"
    },
    // Deep Learning / AI Projects
    {
        title: "Sign Language Recognition",
        category: "Wearable AI",
        status: "Ongoing",
        description: "Wearable device for real-time hand sign recognition using sEMG and IMU sensors. Converts gestures into audible speech through deep learning.",
        year: "2024",
        tech: ["sEMG", "IMU", "Deep Learning", "Embedded"],
        color: "from-purple-500 to-indigo-600"
    },
    {
        title: "Campus Yamu",
        category: "AI / Web Application",
        status: "Completed",
        description: "AI-powered web app helping Sri Lankan students discover university programs based on Z-scores using RAG, LangChain, and OpenAI.",
        year: "Aug 2024",
        tech: ["RAG", "LangChain", "OpenAI", "Web Dev"],
        color: "from-orange-500 to-red-600"
    },
    {
        title: "Facial Expression Recognition",
        category: "Computer Vision",
        status: "Completed",
        description: "Semi-supervised contrastive learning model classifying 8 expression classes with multi-modal features for real-world robustness.",
        year: "Oct 2024",
        tech: ["Contrastive Learning", "CNN", "PyTorch"],
        color: "from-pink-500 to-rose-600"
    },
    {
        title: "TumorVision",
        category: "Medical AI",
        status: "Completed",
        description: "Web application for brain tumor detection using deep learning. Identifies glioma, meningioma, pituitary tumors.",
        year: "April 2024",
        tech: ["Deep Learning", "Medical Imaging", "Web App"],
        color: "from-red-500 to-pink-600"
    },
    {
        title: "GOYAMA",
        category: "Agriculture AI",
        status: "Completed",
        description: "PyTorch model identifying rice leaf diseases with ~98% accuracy on test sets.",
        year: "June 2024",
        tech: ["PyTorch", "CNN", "Agriculture"],
        color: "from-green-500 to-emerald-600"
    },
    {
        title: "Vehicle Detection (YOLOv8)",
        category: "Computer Vision",
        status: "Completed",
        description: "Vehicle detection using YOLOv8 and KITTI dataset for road safety with real-time monitoring.",
        year: "June 2024",
        tech: ["YOLOv8", "KITTI", "Object Detection"],
        color: "from-blue-500 to-indigo-600"
    },
    {
        title: "U-Net Image Segmentation",
        category: "Deep Learning",
        status: "Completed",
        description: "U-Net architecture in TensorFlow/Keras for semantic segmentation on CARLA self-driving dataset.",
        year: "May 2024",
        tech: ["U-Net", "TensorFlow", "Keras", "CARLA"],
        color: "from-violet-500 to-purple-600"
    },
    {
        title: "NextWordPredictor",
        category: "NLP",
        status: "Ongoing",
        description: "Next-word prediction model using TensorFlow/Keras with LSTM neural networks.",
        year: "2024",
        tech: ["LSTM", "TensorFlow", "NLP", "Python"],
        color: "from-amber-500 to-orange-600"
    },
    // Robotics / Embedded
    {
        title: "Line-Following Robot (PID)",
        category: "Robotics",
        status: "Completed",
        description: "Robotic system for line following and obstacle avoidance using PID control with Arduino.",
        year: "Nov 2023",
        tech: ["Arduino", "PID", "IR Sensors", "Ultrasonic"],
        color: "from-teal-500 to-cyan-600"
    },
    {
        title: "NutriTech Pot",
        category: "IoT / Smart Agriculture",
        status: "Completed",
        description: "Smart plant care system that automatically waters plants based on soil moisture with remote monitoring.",
        year: "Aug 2023",
        tech: ["IoT", "Sensors", "Mobile App", "Arduino"],
        color: "from-lime-500 to-green-600"
    }
];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5 }}
            className="group relative bg-gradient-to-br from-gray-900/80 to-black border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
        >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

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
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-cyan-400 transition-colors text-sm pt-2">
                        <Github size={14} />
                        <span>GitHub</span>
                    </a>
                )}
            </div>

            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
        </motion.div>
    );
};

const AllProjectsPage = () => {
    return (
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
                            <ProjectCard key={index} project={project} index={index} />
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
    );
};

export default AllProjectsPage;
