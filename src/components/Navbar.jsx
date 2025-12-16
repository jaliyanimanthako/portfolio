import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navVariants = {
        hidden: { y: -100 },
        visible: {
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const links = [
        { title: "Home", href: "#" },
        { title: "About Me", href: "#about" },
        { title: "Projects", href: "#projects" },
        { title: "Expertise", href: "#expertise" },
        { title: "Experience", href: "#experience" },
        { title: "Contact", href: "#contact" }
    ];

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 text-white ${scrolled ? 'py-4 backdrop-blur-md bg-black/50' : 'py-8'}`}
            initial="hidden"
            animate="visible"
            variants={navVariants}
        >
            <div className="container flex justify-between items-center">
                <a href="#" className="text-2xl font-bold font-display tracking-tight hover:opacity-75 transition-opacity">
                    JALIYA NIMANTHA
                </a>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="text-sm uppercase tracking-widest font-medium hover:opacity-75 transition-opacity"
                        >
                            {link.title}
                        </a>
                    ))}
                </div>

                {/* Mobile menu button - optional */}
                <button className="md:hidden p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
