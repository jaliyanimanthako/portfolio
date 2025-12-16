import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
    {
        quote: "Jaliya consistently demonstrated exceptional performance and commitment as a Research Engineer Intern. He exhibited strong work ethics and made significant contributions to our research projects. His professionalism, skills, and positive attitude made him an invaluable asset to our organization.",
        name: "A/Prof Suranga Nanayakkara",
        title: "Principal Investigator, Augmented Human Lab"
    }
];

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-32 bg-black overflow-hidden">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                    transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-6xl md:text-8xl font-display font-bold mb-6">
                        Applause Corner
                    </h2>
                    <p className="text-xl text-white/60">
                        Recognition from mentors and collaborators
                    </p>
                </motion.div>

                {/* Testimonials Display */}
                <div className="max-w-4xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="glass-panel p-10 md:p-14 border border-white/10 hover:border-white/20 transition-all duration-300 relative rounded-3xl bg-white/5"
                        >
                            {/* Decorative Quote Icon */}
                            <div className="absolute top-8 left-8 text-cyan-400/20">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                                </svg>
                            </div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light italic mb-8 max-w-3xl">
                                    "{testimonial.quote}"
                                </p>

                                <div className="mt-4">
                                    <h4 className="text-2xl font-display font-bold text-white mb-2">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-cyan-400 font-medium tracking-wide text-sm uppercase">
                                        {testimonial.title}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
