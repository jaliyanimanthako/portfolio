import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const increment = Math.floor(Math.random() * 10) + 1;
                return Math.min(prev + increment, 100);
            });
        }, 120);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (count === 100) {
            setTimeout(() => {
                onComplete();
            }, 800);
        }
    }, [count, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            {/* Animated GIF - Larger Size */}
            <div className="relative w-96 h-96 flex items-center justify-center">
                <img
                    src="/preloader.gif"
                    alt="Loading"
                    className="w-full h-full object-contain"
                />
            </div>
        </motion.div>
    );
};

export default Preloader;
