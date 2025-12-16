import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

const metrics = [
    {
        category: 'Projects Completed',
        stats: [
            { label: 'AI/ML Projects', value: 8 },
            { label: 'Robotics Systems', value: 4 },
            { label: 'IoT Devices', value: 6 },
            { label: 'Web Applications', value: 12 }
        ]
    },
    {
        category: 'Academic Excellence',
        stats: [
            { label: 'Research Publications', value: 8 },
            { label: 'Conference Presentations', value: 5 },
            { label: 'Awards & Honors', value: 7 },
            { label: 'GPA', value: 3.8, suffix: '/4.0' }
        ]
    }
];

const Counter = ({ value, suffix = '', duration = 2 }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, value, { duration, ease: "easeOut" });
            return controls.stop;
        }
    }, [isInView, value, duration, count]);

    return (
        <span ref={ref}>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
};

const Metrics = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-32 bg-black overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400 rounded-full blur-[200px]" />
            </div>

            <div className="container relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                    transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-6xl md:text-8xl font-display font-bold mb-6">
                        Metric marvels
                    </h2>
                    <p className="text-xl text-white/60">
                        Numbers that tell the story of innovation and excellence
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
                    {metrics.map((category, categoryIndex) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 60 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                            transition={{
                                duration: 0.8,
                                delay: categoryIndex * 0.2,
                                ease: [0.6, 0.05, 0.01, 0.9]
                            }}
                            className="space-y-8"
                        >
                            {/* Category Title */}
                            <h3 className="text-2xl font-display font-semibold text-cyan-400 mb-8">
                                {category.category}
                            </h3>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-8">
                                {category.stats.map((stat, statIndex) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: categoryIndex * 0.2 + statIndex * 0.1,
                                            ease: [0.6, 0.05, 0.01, 0.9]
                                        }}
                                        className="glass-panel p-6 text-center hover:bg-white/10 transition-colors duration-300"
                                    >
                                        <div className="text-5xl font-display font-bold text-gradient mb-3">
                                            <Counter value={stat.value} suffix={stat.suffix} />
                                        </div>
                                        <div className="text-sm text-white/60 font-medium">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Overall Satisfaction */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.6,
                        ease: [0.6, 0.05, 0.01, 0.9]
                    }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block glass-panel px-12 py-8">
                        <div className="text-7xl font-display font-bold text-gradient mb-2">
                            <Counter value={100} suffix="%" duration={2.5} />
                        </div>
                        <div className="text-xl text-white/70">
                            Client Satisfaction Rate
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Metrics;
