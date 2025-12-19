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

// Timeline Section Component - Same style as Experience
const TimelineSection = ({ education, index, isLast }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const cardY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
    const yearOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.2, 0.2, 0]);

    // Always year on left, card on right (no alternating)
    return (
        <div ref={sectionRef} className="relative min-h-[50vh] flex items-center py-8">
            {/* Accent Year on the left side */}
            <motion.div
                style={{ opacity: yearOpacity }}
                className="absolute top-1/2 -translate-y-1/2 z-10 hidden md:block left-4 md:left-10"
            >
                <span className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                    {education.mainYear}
                </span>
            </motion.div>

            {/* Education Card - always on the right */}
            <motion.div
                style={{ opacity: cardOpacity, y: cardY }}
                className="relative z-20 w-full px-4 md:px-0 md:w-[75%] lg:w-[70%] md:ml-auto md:pr-10"
            >
                <div className="relative group">
                    {/* Main card - Same style as Experience */}
                    <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden hover:border-white/20 transition-all duration-500">
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Content */}
                        <div className="relative z-10 space-y-6">
                            {/* Header with Logo */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2 flex-1">
                                    <h3 className="text-2xl md:text-4xl font-display font-bold text-white">
                                        {education.institution}
                                    </h3>
                                    <p className="text-xl md:text-2xl text-white/60 font-semibold">
                                        {education.degree}
                                    </p>
                                </div>
                                {/* Logos - Positioned at top right with full opacity */}
                                {(education.logos || education.logo) && (
                                    <div className="flex items-center gap-4 flex-shrink-0">
                                        {education.logos ? (
                                            education.logos.map((logo, i) => (
                                                <img
                                                    key={i}
                                                    src={logo}
                                                    alt={education.institution}
                                                    className="w-20 h-20 md:w-32 md:h-32 object-contain"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            ))
                                        ) : (
                                            <img
                                                src={education.logo}
                                                alt={education.institution}
                                                className="w-20 h-20 md:w-32 md:h-32 object-contain"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Meta info */}
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm flex items-center gap-2 text-white/70">
                                    <Calendar size={16} className="text-white/50" />
                                    {education.period}
                                </span>
                                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm flex items-center gap-2 text-white/70">
                                    <MapPin size={16} className="text-white/50" />
                                    {education.location}
                                </span>
                            </div>

                            {/* Field of Study */}
                            {education.field && (
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-400 leading-relaxed text-lg">{education.field}</p>
                                </div>
                            )}

                            {/* Achievements */}
                            <div className="flex flex-wrap gap-2 pt-4">
                                {education.achievements.map((achievement, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 flex items-center gap-2 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
                                    >
                                        <Award size={14} className="text-cyan-400" />
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
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section ref={sectionRef} id="education" className="relative py-32 bg-black overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-900/5 rounded-full blur-[200px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[200px]" />

            <div className="container relative z-10">
                {/* Section Header - Same style as Experience */}
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

                {/* Timeline Sections */}
                <div className="relative">
                    {educationData.map((education, index) => (
                        <TimelineSection
                            key={index}
                            education={education}
                            index={index}
                            isLast={index === educationData.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
