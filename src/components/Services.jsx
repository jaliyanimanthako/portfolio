import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
    {
        number: '01',
        title: 'AI & Edge Intelligence',
        description: 'Specializing in on-device machine learning and large language models (LLMs). Deploying efficient, privacy-preserving AI solutions on resource-constrained edge devices without relying on cloud computation.',
        skills: ['PyTorch', 'TinyML', 'MediaPipe', 'llama.cpp', 'On-device AI', 'TensorFlow Lite']
    },
    {
        number: '02',
        title: 'HCI Research & Wearable Technology',
        description: 'Pioneering human-computer interaction research at the intersection of AI and hardware. Designing smart wearables and assistive interfaces that augment human capabilities and enhance accessibility.',
        skills: ['User-Centered Design', 'Hardware Prototyping', 'Multimodal Interaction', 'Physiological Sensing']
    },
    {
        number: '03',
        title: 'Agentic AI & Autonomous Systems',
        description: 'Architecting autonomous agentic frameworks that can plan, reason, and execute complex tasks. Leveraging multi-agent systems and LangGraph to build resilient, self-directed intelligent applications.',
        skills: ['LangGraph', 'Magentic One', 'Agentic Patterns', 'Multi-Agent Systems']
    },
    {
        number: '04',
        title: 'Embedded Systems & Robotics',
        description: 'Bridging the gap between software and the physical world. Developing robust firmware for IoT devices, integrating sensors, and designing control systems for industrial robotics and smart environments.',
        skills: ['Firmware Development', 'ESP32/Arduino', 'Signal Processing', 'Industrial Automation']
    },
    {
        number: '05',
        title: 'Mobile Development',
        description: 'Developing high-performance native and cross-platform mobile applications. Specializing in integrating on-device AI, complex sensor data processing, and creating intuitive mobile user experiences.',
        skills: ['Kotlin', 'Android', 'React Native', 'Mobile UI/UX']
    }
];

const Services = () => {
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
                    className="mb-20"
                >
                    <h2 className="text-6xl md:text-8xl font-display font-bold mb-6">
                        creative expertise
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl">
                        A comprehensive skill set spanning artificial intelligence, robotics, and modern software development.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="space-y-24">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.number}
                            initial={{ opacity: 0, y: 60 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.1,
                                ease: [0.6, 0.05, 0.01, 0.9]
                            }}
                            className="grid md:grid-cols-12 gap-8 items-start"
                        >
                            {/* Number */}
                            <div className="md:col-span-2">
                                <span className="text-6xl font-display font-bold text-white/20">
                                    {service.number}
                                </span>
                                <div className="h-px bg-gradient-to-r from-cyan-400 to-transparent mt-4" />
                            </div>

                            {/* Content */}
                            <div className="md:col-span-10">
                                <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
                                    {service.title}
                                </h3>
                                <p className="text-lg text-white/70 mb-8 max-w-3xl leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-3">
                                    {service.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-4 py-2 bg-white/5 border border-cyan-400/30 rounded-full text-sm text-cyan-400"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Quote Section */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                    transition={{
                        duration: 0.8,
                        delay: services.length * 0.1,
                        ease: [0.6, 0.05, 0.01, 0.9]
                    }}
                    className="mt-32 text-center"
                >
                    <blockquote className="text-3xl md:text-5xl font-display font-medium leading-tight max-w-4xl mx-auto">
                        "Design is not just what it looks like and feels like. Design is how it works."
                    </blockquote>
                    <p className="text-xl text-white/50 mt-6">— Steve Jobs</p>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
