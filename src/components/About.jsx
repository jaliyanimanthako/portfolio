import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Subtle parallax for quote (scrolls slower)
    const quoteY = useTransform(scrollYProgress, [0, 1], [60, -60]);

    // Background gradient shift
    const gradientOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.15, 0.05]);

    const skills = [
        "Deep Learning", "Computer Vision", "Machine Learning",
        "Signal Processing", "Embedded Systems", "Python / C++",
        "TensorFlow / PyTorch", "HCI / BCI", "Circuit Design"
    ];

    // Animation variants
    const fadeUpVariant = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const paragraphVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const paragraphItem = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const chipContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3
            }
        }
    };

    const chipVariant = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }
    };

    // Highlighted keyword component with glow effect
    const Highlight = ({ children }) => (
        <motion.strong
            initial={{ opacity: 0.7, textShadow: "0 0 0px rgba(6, 182, 212, 0)" }}
            whileInView={{
                opacity: 1,
                textShadow: ["0 0 0px rgba(6, 182, 212, 0)", "0 0 20px rgba(6, 182, 212, 0.5)", "0 0 0px rgba(6, 182, 212, 0)"]
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-white font-semibold"
        >
            {children}
        </motion.strong>
    );

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-32 bg-[#0a0a0a] overflow-hidden"
        >
            {/* Animated Background Gradient */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: gradientOpacity }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-cyan-900/30 rounded-full blur-[150px]" />
            </motion.div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                    {/* Left Column - Quote with Parallax */}
                    <motion.div
                        style={{ y: quoteY }}
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-cyan-400 text-sm tracking-[0.2em] uppercase block mb-8"
                        >
                            About Me
                        </motion.span>

                        <motion.h2
                            variants={fadeUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-white"
                        >
                            "The best AI doesn't replace human understanding. It amplifies it."
                        </motion.h2>

                        {/* Technical Arsenal - Under Quote */}
                        <motion.div
                            className="pt-12"
                            variants={chipContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.h3
                                variants={fadeUpVariant}
                                className="text-white font-bold mb-6 text-xl"
                            >
                                Technical Arsenal
                            </motion.h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <motion.span
                                        key={index}
                                        variants={chipVariant}
                                        whileHover={{
                                            scale: 1.05,
                                            borderColor: "rgba(6, 182, 212, 0.5)",
                                            boxShadow: "0 0 15px rgba(6, 182, 212, 0.2)"
                                        }}
                                        className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 hover:text-cyan-400 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Paragraphs with Staggered Reveal */}
                    <motion.div
                        className="space-y-8"
                        variants={paragraphVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <motion.p
                            variants={paragraphItem}
                            className="text-lg md:text-xl text-gray-400 leading-relaxed"
                        >
                            I'm a third-year undergraduate at the <Highlight>University of Moratuwa, Sri Lanka</Highlight>, where I'm diving deep into Electronic and Telecommunication Engineering. My passion lies at the intersection of <Highlight>deep learning, computer vision, and artificial intelligence</Highlight>, where algorithms meet real-world impact.
                        </motion.p>

                        <motion.p
                            variants={paragraphItem}
                            className="text-lg md:text-xl text-gray-400 leading-relaxed"
                        >
                            From signal processing to embedded systems, from circuit design to <Highlight>Brain–Computer Interfaces</Highlight>, I love exploring the full spectrum of technology. I'm particularly fascinated by <Highlight>Human–Computer Interaction</Highlight> and <Highlight>Explainable AI</Highlight>, because I believe technology should be understood, not just used.
                        </motion.p>

                        <motion.p
                            variants={paragraphItem}
                            className="text-lg md:text-xl text-gray-400 leading-relaxed"
                        >
                            Currently, I'm working on assistive technologies for the visually impaired, experimenting with AI agents, and pushing the boundaries of controllable language models. My ultimate goal is building <Highlight>interpretable, human-centered AI solutions</Highlight> that bridge cutting-edge algorithms with transparency, usability, and meaningful engineering impact.
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
