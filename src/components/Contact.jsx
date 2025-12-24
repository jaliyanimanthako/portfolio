import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-32 md:py-48 bg-black relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="container text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-5xl mx-auto space-y-12"
                >
                    <div className="space-y-6">
                        <p className="text-cyan-400 text-sm tracking-[0.2em] uppercase">Get in Touch</p>
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none">
                            LET'S CREATE<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                                TOGETHER
                            </span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Ready to collaborate on innovative projects in embedded systems, robotics, or AI?
                            Let's build something extraordinary.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8">
                        <motion.a
                            href="mailto:jaliya@example.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-10 py-5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-full font-bold uppercase tracking-wider overflow-hidden flex items-center gap-3 text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-shadow duration-300"
                        >
                            <Mail size={24} />
                            <span>Send Email</span>
                        </motion.a>

                        <motion.a
                            href="https://linkedin.com/in/jaliya-nimantha-8924b7219/"
                            target="_blank"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-10 py-5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-full font-bold uppercase tracking-wider overflow-hidden flex items-center gap-3 text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-shadow duration-300"
                        >
                            <Linkedin size={24} />
                            <span>LinkedIn</span>
                        </motion.a>
                    </div>

                    {/* Social Links */}
                    <div className="pt-16">
                        <p className="text-gray-500 text-sm uppercase tracking-widest mb-6">Connect With Me</p>
                        <div className="flex justify-center gap-6">
                            {[
                                { icon: Linkedin, href: "https://linkedin.com/in/jaliya-nimantha-8924b7219/", label: "LinkedIn" },
                                { icon: Github, href: "#", label: "GitHub" },
                                { icon: Twitter, href: "#", label: "Twitter" },
                                { icon: Mail, href: "mailto:jaliya@example.com", label: "Email" }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    whileHover={{ y: -5 }}
                                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
