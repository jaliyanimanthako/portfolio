import { Linkedin, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-black border-t border-white/5">
            {/* Main Footer Content */}
            <div className="container py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                    {/* Brand Column */}
                    <div className="md:col-span-5 space-y-6">
                        <h3 className="text-3xl md:text-4xl font-display font-bold">
                            JALIYA<br />NIMANTHA
                        </h3>
                        <p className="text-gray-400 max-w-md leading-relaxed">
                            Final year Electronic & Telecommunication Engineering student at University of Moratuwa.
                            Passionate about creating innovative solutions at the intersection of hardware and intelligence.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Linkedin, href: "https://linkedin.com/in/jaliya-nimantha-8924b7219/" },
                                { icon: Github, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Mail, href: "mailto:jaliya@example.com" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3 space-y-4">
                        <h4 className="text-white font-semibold uppercase tracking-wider text-sm">Navigation</h4>
                        <ul className="space-y-3">
                            {['Home', 'Projects', 'Expertise', 'Experience', 'Contact'].map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Expertise */}
                    <div className="md:col-span-4 space-y-4">
                        <h4 className="text-white font-semibold uppercase tracking-wider text-sm">Expertise</h4>
                        <ul className="space-y-3">
                            {[
                                'Embedded Systems',
                                'Robotics & Automation',
                                'Machine Learning',
                                'Deep Learning',
                                'IoT Solutions'
                            ].map((skill, i) => (
                                <li key={i} className="text-gray-400">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="container py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                        <p>
                            &copy; {currentYear} Jaliya Nimantha. All rights reserved.
                        </p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
