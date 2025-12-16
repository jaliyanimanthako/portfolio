import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MenuOverlay = ({ isOpen, onClose }) => {
    const links = [
        { title: "Home", href: "#" },
        { title: "Projects", href: "#projects" },
        { title: "Expertise", href: "#about" },
        { title: "Experience", href: "#experience" },
        { title: "Contact", href: "#contact" }
    ];

    const menuVars = {
        initial: { scaleY: 0 },
        animate: {
            scaleY: 1,
            transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] }
        },
        exit: {
            scaleY: 0,
            transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const containerVars = {
        initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
        open: {
            transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 }
        }
    };

    const linkVars = {
        initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
        open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={menuVars}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="fixed inset-0 bg-cyan-500 origin-top z-[200] flex flex-col justify-center items-center"
                >
                    <div className="absolute top-8 right-8 cursor-pointer text-black" onClick={onClose}>
                        <X size={48} />
                    </div>

                    <motion.div
                        variants={containerVars}
                        initial="initial"
                        animate="open"
                        exit="initial"
                        className="flex flex-col gap-6 text-center"
                    >
                        {links.map((link, index) => (
                            <div key={index} className="overflow-hidden">
                                <motion.a
                                    href={link.href}
                                    variants={linkVars}
                                    className="block text-6xl md:text-8xl font-display font-bold uppercase text-black hover:text-white transition-colors tracking-tighter"
                                    onClick={onClose}
                                >
                                    {link.title}
                                </motion.a>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MenuOverlay;
