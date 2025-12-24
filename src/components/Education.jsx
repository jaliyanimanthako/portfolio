import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Award, MapPin, Calendar } from 'lucide-react';

const educationData = [
    {
        institution: "University of Moratuwa",
        degree: "B.Sc. Engineering (Hons.)",
        field: "Electronic and Telecommunication Engineering",
        location: "Moratuwa, Sri Lanka",
        period: "2022 – Present",
        mainYear: "2026",
        achievements: ["CGPA: 3.55/4.00", "Dean's List: Sem 1 & 6"],
        logos: ["/UOM.webp", "/entc.webp"]
    },
    {
        institution: "Bandaranayake College",
        degree: "GCE Advanced Level",
        field: "Physical Science Stream",
        location: "Gampaha, Sri Lanka",
        period: "2017 – 2019",
        mainYear: "2019",
        achievements: ["Z-Score: 2.3605", "3 A's", "Rank 287 Island"],
        logo: "/bc.webp"
    },
    {
        institution: "Bandaranayake College",
        degree: "GCE Ordinary Level",
        field: "",
        location: "Gampaha, Sri Lanka",
        period: "2011 – 2016",
        mainYear: "2016",
        achievements: ["9 A's"],
        logo: "/bc.webp"
    }
];

// Timeline Node Component
const TimelineNode = ({ isActive, index }) => {
    return (
        <div className="relative">
            {/* Outer glow ring */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    boxShadow: isActive
                        ? '0 0 20px 4px rgba(34, 211, 238, 0.4), 0 0 40px 8px rgba(34, 211, 238, 0.2)'
                        : '0 0 0px 0px rgba(34, 211, 238, 0)'
                }}
                transition={{ duration: 0.5 }}
            />
            {/* Main node */}
            <motion.div
                className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 relative z-10"
                animate={{
                    backgroundColor: isActive ? 'rgb(34, 211, 238)' : 'rgb(0, 0, 0)',
                    borderColor: isActive ? 'rgb(34, 211, 238)' : 'rgba(255, 255, 255, 0.3)',
                    scale: isActive ? 1.2 : 1
                }}
                transition={{ duration: 0.3 }}
            />
            {/* Inner pulse for active state */}
            {isActive && (
                <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-400"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            )}
        </div>
    );
};

// Timeline Section Component with connector
const TimelineSection = ({ education, index, isLast, totalItems }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const cardY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
    const yearOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.15, 0.15, 0]);

    // Node becomes active when card is visible
    const nodeActive = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

    return (
        <div ref={sectionRef} className="relative min-h-[50vh] flex items-center py-8">
            {/* Timeline Node - positioned on the timeline */}
            <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30">
                <motion.div style={{ opacity: cardOpacity }}>
                    <TimelineNode isActive={true} index={index} />
                </motion.div>
            </div>

            {/* Horizontal connector line from node to card */}
            <motion.div
                style={{ opacity: cardOpacity }}
                className="absolute left-10 md:left-16 top-1/2 h-[2px] w-8 md:w-16 z-20"
            >
                <div className="h-full w-full bg-gradient-to-r from-cyan-400/80 to-cyan-400/0" />
            </motion.div>

            {/* Accent Year - positioned after the connector */}
            <motion.div
                style={{ opacity: yearOpacity }}
                className="absolute top-1/2 -translate-y-1/2 z-10 hidden md:block left-24 md:left-36"
            >
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                    {education.mainYear}
                </span>
            </motion.div>

            {/* Education Card */}
            <motion.div
                style={{ opacity: cardOpacity, y: cardY }}
                className="relative z-20 w-full pl-20 pr-4 md:pl-0 md:px-0 md:w-[70%] lg:w-[65%] md:ml-auto md:pr-10"
            >
                <div className="relative group">
                    {/* Main card */}
                    <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-10 overflow-hidden hover:border-cyan-500/30 transition-all duration-500">
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Content */}
                        <div className="relative z-10 space-y-5">
                            {/* Header with Logo */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2 flex-1">
                                    <h3 className="text-xl md:text-3xl font-display font-bold text-white">
                                        {education.institution}
                                    </h3>
                                    <p className="text-lg md:text-xl text-white/60 font-semibold">
                                        {education.degree}
                                    </p>
                                </div>
                                {/* Logos */}
                                {(education.logos || education.logo) && (
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        {education.logos ? (
                                            education.logos.map((logo, i) => (
                                                <img
                                                    key={i}
                                                    src={logo}
                                                    alt={education.institution}
                                                    className="w-16 h-16 md:w-24 md:h-24 object-contain"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            ))
                                        ) : (
                                            <img
                                                src={education.logo}
                                                alt={education.institution}
                                                className="w-16 h-16 md:w-24 md:h-24 object-contain"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Meta info */}
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm flex items-center gap-2 text-white/70">
                                    <Calendar size={14} className="text-cyan-400/70" />
                                    {education.period}
                                </span>
                                <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm flex items-center gap-2 text-white/70">
                                    <MapPin size={14} className="text-cyan-400/70" />
                                    {education.location}
                                </span>
                            </div>

                            {/* Field of Study */}
                            {education.field && (
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-400 leading-relaxed text-base">{education.field}</p>
                                </div>
                            )}

                            {/* Achievements */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {education.achievements.map((achievement, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm text-white/70 flex items-center gap-2 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
                                    >
                                        <Award size={12} className="text-cyan-400" />
                                        {achievement}
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

const Education = () => {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    // Scroll progress for the entire timeline
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start end", "end start"]
    });

    // Timeline fill progress
    const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={sectionRef} id="education" className="relative py-32 bg-black overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-900/5 rounded-full blur-[200px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[200px]" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                    transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="mb-20"
                >
                    <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase block mb-6">Academic Journey</span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none">
                        EDUCATION
                    </h2>
                </motion.div>

                {/* Timeline Container */}
                <div ref={timelineRef} className="relative">
                    {/* Vertical Timeline Line - Background */}
                    <div className="absolute left-8 md:left-14 top-0 bottom-0 w-[2px] bg-white/10 z-10" />

                    {/* Vertical Timeline Line - Animated Fill */}
                    <motion.div
                        className="absolute left-8 md:left-14 top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-cyan-400 to-cyan-400/50 z-10 origin-top"
                        style={{ height: timelineHeight }}
                    />

                    {/* Glow effect on the timeline */}
                    <motion.div
                        className="absolute left-8 md:left-14 top-0 w-[2px] z-10 origin-top"
                        style={{
                            height: timelineHeight,
                            boxShadow: '0 0 10px 2px rgba(34, 211, 238, 0.3), 0 0 20px 4px rgba(34, 211, 238, 0.1)'
                        }}
                    />

                    {/* Timeline Sections */}
                    {educationData.map((education, index) => (
                        <TimelineSection
                            key={index}
                            education={education}
                            index={index}
                            isLast={index === educationData.length - 1}
                            totalItems={educationData.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
