import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Lab projects for 2025 experience
const labProjects = [
    {
        id: 'aisee',
        name: 'AiSee',
        shortDescription: 'Assistive device to enable people with visual impairments to independently access information while on the go.',
        fullDescription: 'AiSee is an innovative assistive device designed to empower visually impaired individuals to independently access information in real-time. The project combines cutting-edge AI with wearable technology.',
        contributions: [
            'Implementing the Agentic Framework for autonomous interaction',
            'Leading On-Device AI Execution using TensorFlow Lite and MediaPipe',
            'Addressing Core User Needs through user-centered design'
        ],
        deliverables: [
            'On-Device running Handshake Detection model',
            'A Functional On-Device LLM Prototype',
            'Hardware Design Requirements for AiSee v3',
            'End-to-End Deployment SDKs (Python and Android)'
        ],
        tech: ['TensorFlow Lite', 'MediaPipe', 'Kotlin', 'LLaMA.cpp', 'Android'],
        thumbnail: '/aisee.webp',
        modalImage: '/aise.webp',
        images: []
    },
    {
        id: 'gutio',
        name: 'GutIO',
        shortDescription: 'Investigating the Potential of Abdominal Sounds for Sensing and Influencing Perception of Gut Feelings.',
        fullDescription: 'GutIO explores the novel application of abdominal sounds for sensing emotional states and providing haptic feedback based on gut feelings. This research combines physiological sensing with emotion prediction.',
        contributions: [
            'Data Preprocessing: Preparing E4 data by extracting and processing physiological metrics like inter-beat interval (IBI), electrodermal activity (EDA), and heart rate',
            'Emotion Prediction Model: Built a model to predict emotions using the processed physiological data'
        ],
        deliverables: [],
        tech: ['Python', 'E4 Wearable', 'Signal Processing', 'Machine Learning'],
        thumbnail: '/gut.webp',
        modalImage: '/Industrial.webp',
        images: []
    },
    {
        id: 'itiles',
        name: 'iTiles',
        shortDescription: 'Assistive playware device that utilizes game-based learning to maintain and improve the functional and cognitive abilities of its users.',
        fullDescription: 'iTiles is an assistive playware device designed to enhance cognitive and functional abilities through engaging game-based learning experiences. The project combines hardware design with mobile app development.',
        contributions: [
            'Collaborated with the development team to finalize the mobile app dashboard',
            'Collaborated on hardware and firmware tasks, including modifying properties and adding debugging modes'
        ],
        deliverables: [],
        tech: ['Mobile App', 'Hardware', 'Firmware', 'Game-based Learning'],
        // Add your images here: e.g., '/itiles.png'
        thumbnail: '/it.webp',
        modalImage: '/itiel.jpeg',
        images: []
    }
];

const experiences = [
    {
        year: "2025",
        title: "Research Engineer Intern",
        company: "Augmented Human Lab",
        location: "Singapore",
        period: "Dec 2024 - June 2025",
        type: "Current",
        description: [],
        tech: ['TinyML', 'MediaPipe', 'llama.cpp', 'LangGraph', 'Edge AI', 'Python'],
        logos: ['/NUS.webp', '/ah.webp'],
        projects: labProjects
    },
    {
        year: "2024",
        title: "Research Attachment",
        company: "Augmented Human Lab",
        location: "Remote",
        period: "Aug 2024 - Dec 2024",
        type: "Completed",
        description: [
            "Worked on fine-tuning Vision-Language Models (VLMs) for textbook-based contextual understanding, enhancing educational accessibility for visually impaired individuals in the Singaporean education system.",
            "Focused on optimizing multi-modal learning pipelines and developing an agentic framework for autonomous interaction.",
            "Contributed to model optimization and deployment at Magentic One, ensuring scalable real-world applications."
        ],
        tech: ['VLMs', 'Multi-modal AI', 'Python', 'Agentic AI', 'Magentic One', 'Deep Learning'],
        logos: ['/ah.webp']
    }
];

// Project Detail Modal
const ProjectDetailModal = ({ project, isOpen, onClose }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Stop touch and wheel events from propagating
    const handleTouchMove = (e) => e.stopPropagation();
    const handleWheel = (e) => e.stopPropagation();

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

                        <div
                            className="h-full overflow-y-scroll p-8 md:p-12 lg:p-16"
                            onTouchMove={handleTouchMove}
                            onWheel={handleWheel}
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Left Column: Content */}
                                <div>
                                    {/* Header */}
                                    <div className="mb-10">
                                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-none mb-4">
                                            {project.name}
                                        </h2>
                                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                                            {project.fullDescription}
                                        </p>
                                    </div>

                                    {/* Contributions */}
                                    {project.contributions.length > 0 && (
                                        <div className="mb-10">
                                            <h3 className="text-xl font-display font-bold text-white mb-6">My Primary Contributions</h3>
                                            <div className="space-y-4">
                                                {project.contributions.map((contribution, i) => (
                                                    <div key={i} className="flex items-start gap-4">
                                                        <span className="text-white/60 font-mono text-sm mt-1">{i + 1}.</span>
                                                        <p className="text-gray-400 leading-relaxed">{contribution}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Deliverables */}
                                    {project.deliverables && project.deliverables.length > 0 && (
                                        <div className="mb-10">
                                            <h3 className="text-xl font-display font-bold text-white mb-6">Final Deliverables</h3>
                                            <div className="space-y-4">
                                                {project.deliverables.map((deliverable, i) => (
                                                    <div key={i} className="flex items-start gap-4">
                                                        <span className="text-white/60 font-mono text-sm mt-1">{i + 1}.</span>
                                                        <p className="text-gray-400 leading-relaxed">{deliverable}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tech Stack */}
                                    <div>
                                        <h3 className="text-xl font-display font-bold text-white mb-4">Technologies</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, i) => (
                                                <span key={i} className="px-4 py-2 rounded-full bg-white/5 text-white/70 border border-white/10 text-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Image */}
                                {project.modalImage && (
                                    <div className="hidden lg:flex items-center justify-center">
                                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={project.modalImage}
                                                alt={project.name}
                                                className="absolute inset-0 w-full h-full object-contain bg-white"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Mini Project Card for inside experience card
const MiniProjectCard = ({ project, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
        >
            {project.thumbnail ? (
                // Card with thumbnail image
                <div className="relative aspect-[4/3]">
                    <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                        <h4 className="text-lg font-display font-bold text-white">
                            {project.name}
                        </h4>
                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center bg-black/50 group-hover:bg-white group-hover:border-white transition-all">
                            <ArrowUpRight size={14} className="text-white group-hover:text-black transition-colors" />
                        </div>
                    </div>
                </div>
            ) : (
                // Card with text description
                <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                            <h4 className="text-lg font-display font-bold text-white group-hover:text-white/90 mb-1">
                                {project.name}
                            </h4>
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {project.shortDescription}
                            </p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                            <ArrowUpRight size={14} className="text-white/50 group-hover:text-black transition-colors" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Year Section with scroll-based animation
const YearSection = ({ experience, index, onProjectClick }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Year text animations
    const yearOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.8], [0, 1, 1, 0]);
    const yearScale = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.8], [0.8, 1, 1, 0.9]);
    const yearY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

    // Card animations
    const cardOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [0, 1, 1, 0]);
    const cardY = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [60, 0, 0, -60]);

    // Alternate layout: even index = year left, card right | odd index = card left, year right
    const isFlipped = index % 2 === 1;

    return (
        <div ref={sectionRef} className="min-h-[60vh] md:min-h-[80vh] relative flex flex-col justify-center py-10">
            {/* Large Year Display */}
            <motion.div
                style={{ opacity: yearOpacity, scale: yearScale, y: yearY }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
                <span className="text-[20vw] md:text-[25vw] font-display font-bold text-white/[0.03] select-none">
                    {experience.year}
                </span>
            </motion.div>

            {/* Accent Year on the side - position based on isFlipped */}
            <motion.div
                style={{ opacity: yearOpacity }}
                className={`experience-year-accent absolute top-1/2 -translate-y-1/2 z-10 hidden md:block ${isFlipped ? 'right-4 md:right-10' : 'left-4 md:left-10'}`}
            >
                <span className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                    {experience.year}
                </span>
            </motion.div>

            {/* Experience Card - position based on isFlipped */}
            <motion.div
                style={{ opacity: cardOpacity, y: cardY }}
                className={`relative z-20 w-full px-4 md:px-0 md:w-[75%] lg:w-[70%] ${isFlipped ? 'md:mr-auto md:pl-10' : 'md:ml-auto md:pr-10'}`}
            >
                <div className="relative group">
                    {/* Main card */}
                    <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden hover:border-white/20 transition-all duration-500">
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>



                        {/* Content */}
                        <div className="relative z-10 space-y-6">
                            {/* Header with Logos */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2 flex-1">
                                    <h3 className="text-2xl md:text-4xl font-display font-bold text-white">
                                        {experience.title}
                                    </h3>
                                    <p className="text-xl md:text-2xl text-white/60 font-semibold">
                                        {experience.company}
                                    </p>
                                </div>
                                {/* Logos - Positioned at top right */}
                                {experience.logos && (
                                    <div className="flex items-center gap-4 flex-shrink-0">
                                        {experience.logos.map((logo, i) => (
                                            <img key={i} src={logo} alt="Logo" className="w-20 h-20 md:w-32 md:h-32 object-contain" />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Meta info */}
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm flex items-center gap-2 text-white/70">
                                    <Calendar size={16} className="text-white/50" />
                                    {experience.period}
                                </span>
                                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm flex items-center gap-2 text-white/70">
                                    <MapPin size={16} className="text-white/50" />
                                    {experience.location}
                                </span>
                            </div>

                            {/* Description points */}
                            <div className="space-y-4 max-w-4xl">
                                {experience.description.map((point, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-400 leading-relaxed">{point}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Projects Section - Only for 2025 */}
                            {experience.projects && experience.projects.length > 0 && (
                                <div className="pt-6 border-t border-white/10">
                                    <h4 className="text-sm text-white/40 uppercase tracking-widest mb-4">Projects Worked On</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {experience.projects.map((project, i) => (
                                            <MiniProjectCard
                                                key={i}
                                                project={project}
                                                onClick={() => onProjectClick(project)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2 pt-4">
                                {experience.tech.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Interactive Gallery with auto-scroll and manual controls
const InteractiveGallery = ({ photos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);

    // Auto-scroll effect
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % photos.length);
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(interval);
    }, [isPaused, photos.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 8000);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 8000);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 8000);
    };

    const handleDragStart = (e) => {
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        setDragStartX(clientX);
    };

    const handleDragEnd = (e) => {
        const clientX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const diff = dragStartX - clientX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrevious();
            }
        }
    };

    // Get indices for visible slides (previous, current, next) with wrapping
    const getSlideIndex = (offset) => {
        return (currentIndex + offset + photos.length) % photos.length;
    };

    const prevIndex = getSlideIndex(-1);
    const nextIndex = getSlideIndex(1);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Main Carousel Container */}
            <div
                className="relative h-[220px] md:h-[320px] overflow-hidden rounded-2xl"
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
            >
                {/* 3-slide view: Previous, Current, Next */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Previous Image (Left side, low opacity) */}
                    <motion.div
                        key={`prev-${prevIndex}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 0.3, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute left-0 h-full w-1/4 flex items-center justify-end pr-2"
                    >
                        <img
                            src={photos[prevIndex]}
                            alt={`Gallery ${prevIndex + 1}`}
                            className="h-[70%] w-auto object-contain rounded-2xl opacity-40 scale-90"
                            draggable={false}
                        />
                    </motion.div>

                    {/* Current Image (Center, full opacity) */}
                    <motion.div
                        key={`current-${currentIndex}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="relative z-10 h-full w-1/2 flex items-center justify-center cursor-grab active:cursor-grabbing"
                    >
                        <img
                            src={photos[currentIndex]}
                            alt={`Gallery ${currentIndex + 1}`}
                            className="h-full w-auto max-w-full object-contain rounded-2xl shadow-2xl"
                            draggable={false}
                        />
                    </motion.div>

                    {/* Next Image (Right side, low opacity) */}
                    <motion.div
                        key={`next-${nextIndex}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 0.3, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute right-0 h-full w-1/4 flex items-center justify-start pl-2"
                    >
                        <img
                            src={photos[nextIndex]}
                            alt={`Gallery ${nextIndex + 1}`}
                            className="h-[70%] w-auto object-contain rounded-2xl opacity-40 scale-90"
                            draggable={false}
                        />
                    </motion.div>
                </div>

                {/* Gradient overlays */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent pointer-events-none z-20" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent pointer-events-none z-20" />

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-cyan-500 border border-white/20 hover:border-cyan-500 flex items-center justify-center transition-all duration-300 group"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={20} className="text-white group-hover:text-white" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-cyan-500 border border-white/20 hover:border-cyan-500 flex items-center justify-center transition-all duration-300 group"
                    aria-label="Next slide"
                >
                    <ChevronRight size={20} className="text-white group-hover:text-white" />
                </button>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center items-center gap-2 mt-4">
                {photos.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`transition-all duration-300 rounded-full ${i === currentIndex
                            ? 'w-8 h-2 bg-cyan-400'
                            : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    // Gallery photos - add your images here
    const galleryPhotos = [
        '/1.webp', // Replace with your image paths
        '/2.webp',
        '/3.webp',
        '/4.webp',
        '/5.webp'
    ];

    return (
        <>
            <section id="experience" className="bg-[#0a0a0a] relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[150px]"></div>

                <div className="container relative z-10">
                    {/* Section Header with Photo Gallery */}
                    <div className="pt-20 md:pt-32 pb-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left: Title */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase block mb-6">Experience</span>
                                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none">
                                    WORKING <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800">EXPERIENCE</span>
                                </h2>
                            </motion.div>

                            {/* Right: Interactive Photo Gallery Carousel */}
                            <InteractiveGallery photos={galleryPhotos} />
                        </div>
                    </div>

                    {/* Timeline Sections */}
                    {experiences.map((experience, index) => (
                        <YearSection
                            key={index}
                            experience={experience}
                            index={index}
                            onProjectClick={setSelectedProject}
                        />
                    ))}
                </div>
            </section>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                isOpen={selectedProject !== null}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
};

export default Experience;
