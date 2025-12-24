import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download, ArrowRight } from 'lucide-react';

const Hero = () => {
    const { scrollY } = useScroll();
    const portraitY = useTransform(scrollY, [0, 500], [0, 150]);
    const portraitScale = useTransform(scrollY, [0, 500], [1, 1.1]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    };

    const item = {
        hidden: { y: 100, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section className="hero-section relative min-h-screen w-full overflow-hidden bg-black">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 -z-10">
                <div className="absolute bottom-[-30%] right-[-20%] w-[100vw] h-[100vw] bg-blue-900/20 rounded-full blur-[200px] animate-pulse"></div>
            </div>

            {/* Portrait Image - Renders immediately, no animation delay */}
            <motion.div
                className="absolute inset-0 z-[1] flex items-center justify-end pointer-events-none"
                style={{ y: portraitY, scale: portraitScale }}
                initial={false}
            >
                <div className="relative w-full md:w-[120%] h-full md:translate-x-[25%]">
                    <img
                        src="/hero-portrait.webp"
                        alt="Jaliya Nimantha"
                        fetchPriority="high"
                        loading="eager"
                        decoding="sync"
                        className="w-full h-full object-cover object-top opacity-50"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/80"></div>
                </div>
            </motion.div>

            {/* Main Content Container */}
            <div className="container relative z-[50] flex flex-col min-h-screen justify-center py-20 md:py-0 md:-mt-16">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Identity Labels - Top */}
                    <motion.div
                        variants={item}
                        className="flex items-center gap-6 mb-8 text-xs text-gray-500 uppercase tracking-[0.2em]"
                    >
                        <span>2026</span>
                        <span className="w-px h-3 bg-gray-700"></span>
                        <span>Sri Lanka</span>
                        <span className="w-px h-3 bg-gray-700"></span>
                        <span>Electronics · AI · IoT</span>
                    </motion.div>

                    {/* Main Name Typography */}
                    <div className="space-y-[-1.5vw] md:space-y-[-2vw] mb-6">
                        <div className="overflow-hidden">
                            <motion.h1
                                variants={item}
                                className="text-[11vw] sm:text-[12vw] md:text-[11vw] lg:text-[10vw] font-display font-bold leading-none tracking-tighter text-white"
                            >
                                JALIYA
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden">
                            <motion.h1
                                variants={item}
                                className="text-[11vw] sm:text-[12vw] md:text-[11vw] lg:text-[10vw] font-display font-bold leading-none tracking-tighter text-white pl-[3vw] md:pl-[5vw]"
                            >
                                NIMANTHA
                            </motion.h1>
                        </div>
                    </div>

                    {/* Degree and Passion Statement - Under Name */}
                    <motion.div
                        variants={item}
                        className="max-w-xl mb-8 md:mb-10 space-y-3 mt-8 md:mt-16"
                    >
                        <p className="text-base md:text-lg font-bold text-white uppercase tracking-wide">
                            Electronic & Telecommunication Engineering Undergraduate
                        </p>
                        <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                            Passionate about novel ideas and solving real-world problems with creativity and impact.
                        </p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        variants={item}
                        className="flex flex-wrap items-center gap-4"
                    >
                        {/* Download Resume Button */}
                        <a
                            href="/CV.pdf"
                            download
                            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-display font-bold uppercase tracking-wide text-sm rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                        >
                            <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                            <span>Download Resume</span>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Bottom Identity Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-8 md:bottom-12 left-0 right-0"
                >
                    <div className="container flex justify-end items-end">
                        {/* Scroll Indicator */}
                        <a href="#projects" className="hidden md:flex items-center gap-4 group cursor-pointer">
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                <ArrowDown size={20} className="animate-bounce" />
                            </div>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Vertical Text Element */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 z-[60]"
            >
                <p className="text-xs text-gray-600 uppercase tracking-[0.3em] [writing-mode:vertical-lr]">
                    / Engineering Portfolio
                </p>
            </motion.div>

            {/* Scroll Indicator Line */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="hidden md:block absolute right-8 bottom-32 w-px h-24 bg-gradient-to-b from-transparent via-white/30 to-transparent origin-top"
            />

            {/* Bottom White Gradient Strip */}
            <div className="absolute bottom-0 left-0 right-0 h-40 z-[60] bg-gradient-to-t from-white/20 via-white/10 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
