import { motion } from 'framer-motion';

const Marquee = () => {
    return (
        <div className="w-full overflow-hidden py-4 border-y border-white/10 bg-black/50 backdrop-blur-sm z-30 relative">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20
                }}
            >
                {[...Array(6)].map((_, i) => (
                    <span key={i} className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mx-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700 opacity-50">
                        Embedded • Robotics • Deep Learning • Innovation •
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
