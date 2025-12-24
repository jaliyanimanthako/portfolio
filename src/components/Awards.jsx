import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Trophy, Award, Medal, Star, GraduationCap, Shield } from 'lucide-react';

const awardsData = [
    {
        title: "Semi-Finalists - Meta Llama Incubator Programme",
        organization: "Meta AI",
        description: "AiSee - Visual Intelligence Platform for the Blind and Visually Impaired using Llama 3.2 3B with on-device AI",
        year: "2025",
        image: "/ai.webp",
        imagePosition: "center top",
        mobileImagePosition: "left top",
        icon: Star,
        color: "from-blue-600 to-indigo-700"
    },
    {
        title: "Finalists - Brainstorm 2024",
        organization: "IEEE EMBS Students Chapter, University of Moratuwa",
        description: "Biomedical Engineering Competition",
        year: "2024",
        image: "/brain.webp",
        imagePosition: "center 50%",
        icon: Trophy,
        color: "from-cyan-500 to-blue-600"
    },
    {
        title: "Finalists & Best Pitch",
        organization: "ICE 2024",
        description: "Entrepreneurship Hackathon",
        year: "2024",
        image: "/ice.webp",
        icon: Star,
        color: "from-yellow-500 to-orange-500"
    },
    {
        title: "3rd Place - MECHA 2023",
        organization: "Faculty of Medicine, University of Colombo",
        description: "Medical Device Hackathon, hosted by the Department of Medical Technology",
        year: "2023",
        image: "/MEcha.webp",
        icon: Medal,
        color: "from-amber-600 to-yellow-500"
    },
    {
        title: "School Colours Award",
        organization: "Bandaranayake College",
        description: "For exceptional academic achievements, President Scout Award, and service as a troop leader",
        year: "2019",
        image: "/colurs.webp",
        imagePosition: "center 30%",
        icon: Award,
        color: "from-emerald-500 to-teal-600"
    },
    {
        title: "President Scout Award",
        organization: "Sri Lanka Scout Association",
        description: "The highest rank achievable in the Sri Lanka Scout Association",
        year: "2019",
        image: "/president-scout.jpg", // Add your image
        icon: Shield,
        color: "from-red-500 to-rose-600"
    }
];

const AwardCard = ({ award, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });
    const Icon = award.icon;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
        >
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                {/* Image at Top */}
                <div className="relative h-80 overflow-hidden">
                    {/* Fallback gradient with icon - behind image */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${award.color} flex items-center justify-center`}>
                        <Icon size={64} className="text-white/30" />
                    </div>
                    {/* Main image - on top */}
                    {/* Mobile image (hidden on md+) */}
                    <img
                        src={award.image}
                        alt={award.title}
                        className="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 md:hidden"
                        style={{ objectPosition: award.mobileImagePosition || award.imagePosition || 'center 70%' }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    {/* Desktop image (hidden on mobile) */}
                    <img
                        src={award.image}
                        alt={award.title}
                        className="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 hidden md:block"
                        style={{ objectPosition: award.imagePosition || 'center 70%' }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Year badge */}
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white font-medium">
                        {award.year}
                    </span>
                </div>


                {/* Content */}
                <div className="relative z-10 p-6 flex-1 flex flex-col mt-auto">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                        {award.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-3">
                        {award.organization}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mt-auto">
                        {award.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const Awards = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} id="awards" className="relative py-32 bg-black overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-900/5 rounded-full blur-[200px]" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[200px]" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                    transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="mb-16 md:mb-20"
                >
                    <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase block mb-6">Recognition</span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none">
                        AWARDS &<br />
                        SCHOLARSHIPS
                    </h2>
                </motion.div>

                {/* Awards Grid - 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {awardsData.map((award, index) => (
                        <AwardCard key={index} award={award} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;
