import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, X, ExternalLink } from 'lucide-react';

const featuredProjects = [
    {
        title: "Neural Speech Tracking",
        category: "Research / BCI",
        status: "Ongoing",
        description: "Fusion of Speech and EEG signals for neural speech tracking. Research-driven project exploring the intersection of neuroscience and signal processing for next-generation human-computer interfaces.",
        longDescription: "This Final Year Project explores the cutting-edge fusion of speech and EEG (electroencephalogram) signals for neural speech tracking. By combining neuroscience with advanced signal processing techniques, we aim to decode neural patterns associated with speech production and perception. This research has applications in brain-computer interfaces, assistive technologies, and understanding the neural basis of human communication.",
        year: "2024",
        tech: ["EEG", "Signal Processing", "Deep Learning", "Python", "MATLAB", "Brain-Computer Interface"],
        color: "#06b6d4",
        bgGradient: "from-cyan-900/40 via-blue-900/30 to-black",
        highlights: ["Research-driven innovation", "Neuroscience + AI fusion", "Real-time signal processing"],
        image: "/eeg_cap.png"
    },
    {
        title: "BioSense-AI",
        category: "Health Tech / IoT",
        status: "Completed",
        description: "Portable health monitoring device with advanced ECG technology for precise diagnostics. Connected to a mobile app for real-time health insights using ML to classify conditions like asthma and heart failure.",
        longDescription: "BioSense-AI is a portable health monitoring device featuring advanced ECG technology for precise cardiac diagnostics. The system connects to a companion mobile application providing real-time health insights. Using machine learning algorithms, it accurately classifies conditions like asthma and heart failure.",
        year: "2023",
        tech: ["ECG", "PPG", "Machine Learning", "Mobile App", "IoT", "TensorFlow"],
        color: "#10b981",
        bgGradient: "from-emerald-900/40 via-teal-900/30 to-black",
        highlights: ["Portable diagnostics", "ML-powered classification", "Real-time monitoring"],
        image: "/biosense.png"
    },
    {
        title: "GGUF Model Converter",
        category: "AI Tools / Open Source",
        status: "Active",
        description: "Python toolkit automating the full pipeline for LLaMA models: clone llama.cpp, convert HF models to GGUF format, quantize with precision options, and upload to Hugging Face Hub.",
        longDescription: "llama-tools-aisee is an open-source Python toolkit that automates the complete pipeline for preparing Hugging Face LLaMA models for llama.cpp. It provides both CLI and Python API interfaces.",
        year: "2024",
        tech: ["Python", "llama.cpp", "GGUF", "Hugging Face", "CLI", "PyPI"],
        github: "https://github.com/aisee-ai/gguf-converter-huggingface",
        color: "#a855f7",
        bgGradient: "from-purple-900/40 via-indigo-900/30 to-black",
        highlights: ["Open source", "PyPI package", "Full automation pipeline"],
        image: "/gguf.png"
    },
    {
        title: "AiSee LLaMa SDK",
        category: "Mobile AI / SDK",
        status: "Active",
        description: "Android SDK for searching and retrieving .gguf LLaMA models from Hugging Face, with on-device inference and streamed responses. Private, efficient, mobile-friendly AI.",
        longDescription: "The AiSee LLaMa Android SDK enables mobile developers to integrate on-device LLM inference into Android applications with no cloud dependency.",
        year: "2024",
        tech: ["Android", "Kotlin", "GGUF", "On-Device AI", "JitPack", "LLaMA"],
        github: "https://github.com/aisee-ai/gguf-models-android",
        color: "#f97316",
        bgGradient: "from-orange-900/40 via-red-900/30 to-black",
        highlights: ["On-device inference", "No cloud dependency", "Streamed responses"],
        image: "/llama.png"
    },
    {
        title: "Industrial End Effector",
        category: "Robotics / Automation",
        status: "Completed",
        description: "Industrial end effector with vacuum gripper for automated pick-and-place robots. Integrates four ToF sensors for precise box yaw and pitch angle measurement.",
        longDescription: "This industrial automation project features an advanced end effector designed for automated pick-and-place robot systems with Modbus protocol communication.",
        year: "2024",
        tech: ["ToF Sensors", "Modbus", "Automation", "Embedded", "Industrial Robotics"],
        color: "#64748b",
        bgGradient: "from-slate-800/40 via-gray-900/30 to-black",
        highlights: ["High precision sensing", "Industrial-grade", "Modbus integration"],
        image: "/endeff.png"
    },
    {
        title: "Hodi — Sinhala OCR",
        category: "OCR / Deep Learning",
        status: "Ongoing",
        description: "Mobile app using OCR technology to identify both handwritten and printed Sinhala letters. Leveraging deep learning for accurate text extraction and recognition.",
        longDescription: "Hodi is a mobile application that leverages OCR technology to identify both handwritten and printed Sinhala letters using deep learning models.",
        year: "2024",
        tech: ["OCR", "Dart", "Flutter", "Deep Learning", "TensorFlow Lite"],
        github: "https://github.com/jaliyanimanthako/Hodi-Sinhala-OCR-Project-",
        color: "#06b6d4",
        bgGradient: "from-cyan-900/40 via-blue-900/30 to-black",
        highlights: ["Handwritten recognition", "Cross-platform", "Sinhala language support"],
        image: "/hodi.png"
    }
];

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
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
                        className="fixed inset-4 md:inset-10 lg:inset-16 z-[201] overflow-hidden rounded-2xl bg-black border border-white/10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
                        >
                            <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <div className="h-full overflow-y-auto">
                            {/* Hero Section */}
                            <div className={`relative h-[40vh] bg-gradient-to-br ${project.bgGradient} flex items-end`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                <div className="relative z-10 p-8 md:p-12 lg:p-16">
                                    <span className="text-white/60 text-sm tracking-widest uppercase mb-4 block">
                                        {project.category}
                                    </span>
                                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-none">
                                        {project.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-12 lg:p-16 space-y-10">
                                <div className="max-w-3xl">
                                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Rebirth-style Project Card Component
const ProjectCard = ({ project, index, onClick }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [10, -10]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

    // Image fold-up animation transforms
    const imageRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
    const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onClick={onClick}
            className="group relative cursor-pointer"
        >
            {/* Card Container */}
            <div className={`relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-gradient-to-br ${project.bgGradient} border border-white/5 group-hover:border-white/20 transition-all duration-700`}>

                {/* Project Image with Fold-Up Animation */}
                {project.image ? (
                    <motion.div
                        className="absolute inset-0 overflow-hidden"
                        style={{
                            perspective: '1000px',
                        }}
                    >
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                                rotateX: imageRotateX,
                                scale: imageScale,
                                y: imageY,
                                transformOrigin: 'center center',
                            }}
                        />
                        {/* Dark overlay on image */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
                    </motion.div>
                ) : (
                    /* Abstract Background Pattern for cards without images */
                    <div className="absolute inset-0 opacity-30">
                        <div
                            className="absolute top-1/4 right-1/4 w-[60%] h-[60%] rounded-full blur-[100px]"
                            style={{ backgroundColor: project.color }}
                        />
                        <div
                            className="absolute bottom-0 left-1/3 w-[40%] h-[40%] rounded-full blur-[80px] opacity-50"
                            style={{ backgroundColor: project.color }}
                        />
                    </div>
                )}

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />

                {/* Bottom Gradient for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                    {/* Category and Status */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-white/50 text-xs md:text-sm tracking-widest uppercase">
                            {project.category}
                        </span>
                        {(project.status === "Ongoing" || project.status === "Active") && (
                            <span className={`px-2 py-0.5 text-xs rounded-full ${project.status === "Ongoing" ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                {project.status}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <motion.h3
                        style={{ y }}
                        className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-none mb-4 group-hover:translate-x-4 transition-transform duration-500"
                    >
                        {project.title}
                    </motion.h3>

                    {/* Description - appears on hover */}
                    <p className="text-gray-400 text-sm md:text-base max-w-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        {project.description}
                    </p>

                    {/* Year and arrow */}
                    <div className="flex items-center justify-between mt-6">
                        <span className="text-white/30 font-mono text-sm">{project.year}</span>
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:border-white transition-all duration-300"
                        >
                            <ArrowUpRight
                                size={20}
                                className="text-white/50 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>

                {/* Hover Border Glow */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        boxShadow: `inset 0 0 60px ${project.color}20, 0 0 40px ${project.color}10`
                    }}
                />
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <>
            <section id="projects" className="py-20 md:py-32 bg-black relative overflow-hidden">
                {/* Subtle Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="container relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-16 md:mb-24"
                    >
                        <span className="text-white/40 text-sm tracking-[0.3em] uppercase block mb-6">Selected Works</span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none">
                            FEATURED <br />
                            <span className="text-white/20">PROJECTS</span>
                        </h2>
                    </motion.div>

                    {/* Projects Stack - Rebirth Style */}
                    <div className="space-y-6 md:space-y-8">
                        {featuredProjects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                project={project}
                                index={index}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>

                    {/* Explore All Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-20 flex justify-center"
                    >
                        <a
                            href="https://github.com/jaliyanimanthako"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-4 px-10 py-5 border border-white/20 rounded-full text-white font-display text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-500"
                        >
                            <span>Explore All Projects</span>
                            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject || featuredProjects[0]}
                isOpen={selectedProject !== null}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
};

export default Projects;
