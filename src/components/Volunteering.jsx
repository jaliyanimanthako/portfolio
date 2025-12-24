import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Users, Calendar, MapPin, ArrowUpRight } from 'lucide-react';

const volunteeringData = [
    {
        role: "Vice President (Main Branch)",
        organization: "Electronic Club, University of Moratuwa",
        period: "2023 – Present",
        images: ["/ec.webp", "/ec1.webp", "/ec2.webp"],
        hasTimeline: true,
        timeline: [
            { role: "Vice President - Main Branch", period: "2025 – Present" },
            { role: "Head of Operations", period: "2024 – 2025" },
            { role: "Committee Member", period: "2023 – 2024" }
        ],
        description: "Led the organization of key events such as Abhina, Shuttle Fest, Tronic Awurudu, Industry Envoyage, and Career Fair. Also contributed to community initiatives like SLRC and E-Care.",
        color: "from-cyan-500 to-blue-600"
    },
    {
        role: "Workshop Mentor",
        organization: "ICE 2025 - AI Innovation Workshop",
        period: "2025",
        images: ["/ice1.webp", "/ice2.webp", "/ice3.webp"],
        link: "https://ice2025.com/",
        description: "Mentored 30 participants in Sri Lanka's premier AI innovation workshop, guiding teams to build breakthrough prototypes within three days.",
        color: "from-violet-500 to-purple-600"
    },
    {
        role: "President Scout Awardee",
        organization: "Scout Troop, Bandaranayake College",
        period: "2008 – 2019",
        images: ["/sct.webp", "/sct1.webp", "/sct2.webp", "/sct3.webp"],
        imagePositions: ["center 30%", "center 30%", "center 30%", "center 70%"],
        hasTimeline: true,
        timeline: [
            { role: "President Scout Award", period: "2019" },
            { role: "Troop Leader", period: "2018 – 2019" }
        ],
        description: "Led a troop of over 600 scouts, organizing national-level events including an all-island hiking competition with multiple championship wins. Played a key role in centenary celebration projects.",
        color: "from-emerald-500 to-teal-600"
    },
    {
        role: "Program Host",
        organization: "Leadership & Personality Development Program, Kotugoda Sri Rahula College",
        period: "Nov 2023",
        images: ["/programme.webp", "/programm1.webp"],
        description: "Collaborated with Scout Master Rasanga Rupasinghe to lead a transformative 'Beyond Boundaries' program for 50+ students, facilitating discussions on balancing academics with extracurriculars and personal development strategies.",
        color: "from-amber-500 to-yellow-600"
    },
    {
        role: "Department Facilitator",
        organization: "EXMO 2023, University of Moratuwa",
        period: "Jul 2023",
        hideImage: true,
        description: "Contributed to the successful execution of the University of Moratuwa's flagship engineering exhibition, showcasing innovative student projects and promoting technological awareness.",
        color: "from-purple-500 to-indigo-600"
    },
    {
        role: "Committee Member",
        organization: "Rotaract Club, University of Moratuwa",
        period: "Dec 2022",
        hideImage: true,
        description: "Involved in organizing several events with the Rotaract Club. Additionally, worked as a video editor for events such as Data Storm, El Talento, and Rota Spark.",
        color: "from-orange-500 to-red-500"
    }
];


const VolunteerCard = ({ volunteer, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-rotate images if multiple images exist
    useEffect(() => {
        if (volunteer.images && volunteer.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % volunteer.images.length);
            }, 3000); // Change every 3 seconds
            return () => clearInterval(interval);
        }
    }, [volunteer.images]);

    // Get current image source and position
    const imageSrc = volunteer.images
        ? volunteer.images[currentImageIndex]
        : volunteer.image;

    const imagePosition = volunteer.imagePositions
        ? volunteer.imagePositions[currentImageIndex]
        : 'center 30%';

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
        >
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                {/* Image at Top - conditionally rendered */}
                {!volunteer.hideImage && (
                    <div className="relative h-80 overflow-hidden">
                        {/* Fallback gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${volunteer.color} flex items-center justify-center`}>
                            <Users size={64} className="text-white/30" />
                        </div>
                        {/* Main image with crossfade dissolve transition */}
                        <AnimatePresence>
                            <motion.img
                                key={currentImageIndex}
                                src={imageSrc}
                                alt={volunteer.organization}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                                className="absolute inset-0 z-10 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                style={{ objectPosition: imagePosition }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </AnimatePresence>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />

                        {/* Period badge */}
                        <div className="absolute top-4 right-4 z-30">
                            <span className="px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white font-medium">
                                {volunteer.period}
                            </span>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-6 flex-1 flex flex-col">
                    {/* Organization */}
                    <p className="text-white/60 text-sm mb-3 flex items-center gap-2">
                        <Users size={14} className="text-white/40" />
                        {volunteer.link ? (
                            <a
                                href={volunteer.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-cyan-400 transition-colors duration-300 underline underline-offset-2"
                            >
                                {volunteer.organization}
                            </a>
                        ) : (
                            volunteer.organization
                        )}
                    </p>


                    {/* Timeline tree if hasTimeline */}
                    {volunteer.hasTimeline && volunteer.timeline ? (
                        <div className="mb-4">
                            <div className="relative">
                                {volunteer.timeline.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 mb-3 last:mb-0">
                                        {/* Timeline line and dot */}
                                        <div className="flex flex-col items-center">
                                            <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-cyan-400' : 'bg-white/30'} flex-shrink-0`} />
                                            {i < volunteer.timeline.length - 1 && (
                                                <div className="w-0.5 h-8 bg-white/20" />
                                            )}
                                        </div>
                                        {/* Role and period */}
                                        <div className="flex-1 -mt-1">
                                            <h4 className={`text-lg md:text-xl font-display font-bold ${i === 0 ? 'text-white' : 'text-white/70'}`}>
                                                {item.role}
                                            </h4>
                                            <span className="text-sm text-white/50">{item.period}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Regular role display */
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                                {volunteer.role}
                            </h3>
                            {/* Link button - only show if link exists */}
                            {volunteer.link && (
                                <a
                                    href={volunteer.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border border-white/20 hover:bg-white hover:border-white transition-all duration-300 group/btn"
                                >
                                    <ArrowUpRight size={20} className="text-white/50 group-hover/btn:text-black group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all duration-300" />
                                </a>
                            )}
                        </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mt-auto">
                        {volunteer.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const Volunteering = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} id="volunteering" className="relative py-32 bg-black overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-900/5 rounded-full blur-[200px]" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-900/5 rounded-full blur-[200px]" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                    transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="mb-16 md:mb-20"
                >
                    <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase block mb-6">Community</span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none">
                        VOLUNTEERING &<br />
                        LEADERSHIP
                    </h2>
                </motion.div>

                {/* Volunteering Grid - 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {volunteeringData.map((volunteer, index) => (
                        <VolunteerCard key={index} volunteer={volunteer} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Volunteering;
