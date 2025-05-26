import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useAnimation } from 'framer-motion';
import {
    Menu,
    X,
    Dumbbell,
    Users,
    Clock,
    Star,
    MapPin,
    Phone,
    Mail,
    Facebook,
    Instagram,
    Twitter,
    Play,
    CheckCircle,
    ArrowRight,
    Calendar,
    Award,
    ChevronDown,
    HeartPulse,
    Activity,
    Gem,
    Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Custom hook for scroll animations
const useScrollAnimation = (ref, start = 0, end = 1) => {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.5]);
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return { opacity, y };
};

// Smooth scrolling component with animation
const SmoothScrollLink = ({ children, to, className, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault();
        const element = document.getElementById(to);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        if (onClick) onClick();
    };

    return (
        <motion.a
            href={`#${to}`}
            onClick={handleClick}
            className={className}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.a>
    );
};

// Loading screen component
const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 5; // Changed to fixed increment for more reliable completion
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // Add this effect to handle the hide transition
    useEffect(() => {
        if (progress >= 100) {
            const timer = setTimeout(() => setShowLoader(false), 500);
            return () => clearTimeout(timer);
        }
    }, [progress]);

    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {showLoader && (
                <motion.div
                    className="fixed inset-0 bg-gray-950 z-50 flex flex-col items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="relative mb-8"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "mirror",
                            duration: 1.5,
                            ease: "easeInOut"
                        }}
                    >
                        <Dumbbell className="h-16 w-16 text-red-500" />
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "linear"
                            }}
                        />
                    </motion.div>

                    <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                        <motion.div
                            className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <motion.p
                        className="text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Loading {Math.min(progress, 100).toFixed(0)}%
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Header Component with advanced animations
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            const shouldScrolled = window.scrollY > 50;
            setIsScrolled(shouldScrolled);

            if (shouldScrolled) {
                controls.start("visible");
            } else {
                controls.start("hidden");
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [controls]);

    const navItems = ['Home', 'About', 'Classes', 'Trainers', 'Pricing', 'Contact'];

    return (
        <motion.header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-xl' : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.8 }}
                    >
                        <Dumbbell className="h-8 w-8 text-red-500 animate-pulse" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                            FitFusion
                        </span>
                    </motion.div>

                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 1.8 + index * 0.1 }}
                            >
                                <SmoothScrollLink
                                    to={item.toLowerCase()}
                                    className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
                                >
                                    {item}
                                    <motion.span
                                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: '100%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </SmoothScrollLink>
                            </motion.div>
                        ))}
                    </nav>

                    <motion.div
                        className="hidden md:flex space-x-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 2.2 }}
                    >
                        <motion.button
                            className="relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-6 py-2 rounded-full transition-all duration-300 group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span onClick={()=>{navigate("/register")}} className="relative z-10">Join Now</span>
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-600"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>
                    </motion.div>

                    <motion.button
                        className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden mt-4 pb-4"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <nav className="flex flex-col space-y-4">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.1 }}
                                    >
                                        <SmoothScrollLink
                                            to={item.toLowerCase()}
                                            className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300 block"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item}
                                        </SmoothScrollLink>
                                    </motion.div>
                                ))}
                                <motion.button
                                    className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-6 py-3 rounded-full transition-all duration-300 w-full"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: navItems.length * 0.1 }}
                                    onClick={() => { navigate("/register") }}
                                >
                                    Join Now
                                </motion.button>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
};

// Hero Component with 3D parallax effect
const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            id="home"
            ref={ref}
            className="relative h-screen flex items-center justify-center bg-gray-950 overflow-hidden"
        >
            {/* Background layers with parallax */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
                style={{ y: yBg }}
            />

            <motion.div
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-20"
                style={{
                    y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
                    scale: useTransform(scrollYProgress, [0, 1], [1, 1.1])
                }}
            />

            {/* Floating dumbbells */}
            <motion.div
                className="absolute top-1/4 left-1/4"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            >
                <Dumbbell className="h-12 w-12 text-red-500 opacity-50" />
            </motion.div>

            <motion.div
                className="absolute bottom-1/3 right-1/4"
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            >
                <Dumbbell className="h-16 w-16 text-orange-500 opacity-50" />
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center max-w-4xl mx-auto px-4"
                style={{ y: yText, opacity: opacityText }}
            >
                <motion.div
                    className="mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 2.5
                    }}
                >
                    <Dumbbell className="h-16 w-16 text-red-500 mx-auto" />
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.8 }}
                >
                    Transform Your
                    <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 3.0 }}
                    >
                        Body & Mind
                    </motion.span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 3.2 }}
                >
                    Join FitFusion and discover the strongest version of yourself with our premium equipment and expert trainers.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 3.4 }}
                >
                    <motion.button
                        className="relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center space-x-2 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">Start Your Journey</span>
                        <motion.div
                            className="relative z-10"
                            animate={{
                                x: [0, 5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                        >
                            <ArrowRight className="h-5 w-5" />
                        </motion.div>
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-600"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>

                    <motion.button
                        className="relative overflow-hidden border-2 border-white text-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.span
                            className="absolute inset-0 bg-white"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">Watch Our Story</span>
                        <Play className="h-5 w-5 relative z-10" />
                    </motion.button>
                </motion.div>
            </motion.div>

            <SmoothScrollLink
                to="about"
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <motion.div
                    className="w-10 h-16 flex flex-col items-center"
                    animate={{
                        y: [0, 10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                >
                    <ChevronDown className="h-6 w-6 text-white" />
                    <div className="w-px h-8 bg-gradient-to-t from-white to-transparent mt-2"></div>
                </motion.div>
            </SmoothScrollLink>

            {/* Particle background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-red-500"
                        style={{
                            width: Math.random() * 10 + 5 + 'px',
                            height: Math.random() * 10 + 5 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, (Math.random() - 0.5) * 100],
                            x: [0, (Math.random() - 0.5) * 100],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

// About Component with scroll-triggered animations
const About = () => {
    const ref = useRef(null);
    const { opacity, y } = useScrollAnimation(ref);

    const features = [
        { icon: Award, title: "10+ Years Experience", desc: "Decade of fitness excellence" },
        { icon: Users, title: "5000+ Members", desc: "Growing fitness community" },
        { icon: Dumbbell, title: "Premium Equipment", desc: "Latest fitness technology" },
        { icon: Clock, title: "24/7 Access", desc: "Workout on your schedule" }
    ];

    return (
        <section id="about" ref={ref} className="py-20 bg-gray-950 relative overflow-hidden">
            {/* Floating abstract shapes */}
            <motion.div
                className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-red-500 to-orange-500 opacity-10 blur-3xl"
                animate={{
                    x: [0, 20, 0],
                    y: [0, 30, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            <motion.div
                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 opacity-10 blur-3xl"
                animate={{
                    x: [0, -20, 0],
                    y: [0, -30, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    style={{ opacity, y }}
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">FitFusion</span>?
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        We're more than just a gym. We're your partners in achieving the fitness goals you've always dreamed of.
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h3
                            className="text-3xl font-bold text-white mb-6"
                            whileInView={{
                                backgroundPosition: ['0% 50%', '100% 50%'],
                                backgroundSize: ['200% 200%', '200% 200%']
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 2,
                                ease: "linear",
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            style={{
                                backgroundImage: 'linear-gradient(90deg, #ffffff, #ef4444, #f97316, #ffffff)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Your Fitness Journey Starts Here
                        </motion.h3>
                        <motion.p
                            className="text-gray-400 mb-6 text-lg leading-relaxed"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            At FitFusion, we believe fitness is not just about physical transformation—it's about building confidence,
                            discipline, and a lifestyle that empowers you to be your best self every day.
                        </motion.p>
                        <motion.ul
                            className="space-y-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {[
                                "State-of-the-art equipment and facilities",
                                "Certified personal trainers and nutritionists",
                                "Diverse group classes for all fitness levels",
                                "Supportive community environment"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-center space-x-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <CheckCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                                    </motion.div>
                                    <span className="text-gray-300">{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    <motion.div
                        className="relative group"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                        <motion.div
                            className="relative bg-gray-900 rounded-2xl p-8 text-white hover:shadow-xl transition-shadow duration-300"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 backdrop-blur-sm border border-gray-800">
                                <motion.h4
                                    className="text-2xl font-bold mb-4"
                                    whileInView={{
                                        backgroundPosition: ['0% 50%', '100% 50%'],
                                        backgroundSize: ['200% 200%', '200% 200%']
                                    }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 3,
                                        ease: "linear",
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                    style={{
                                        backgroundImage: 'linear-gradient(90deg, #ffffff, #ef4444, #f97316, #ffffff)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        color: 'transparent',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    Free Trial Week
                                </motion.h4>
                                <motion.p
                                    className="text-gray-300 mb-4"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    Experience everything FitFusion has to offer with our complimentary 7-day trial membership.
                                </motion.p>
                                <motion.button
                                    className="relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 group-inner"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    <span className="relative z-10">Claim Your Trial</span>
                                    <motion.span
                                        className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-600"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="relative group p-6 bg-gray-900 rounded-xl hover:shadow-xl transition-all duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            />
                            <div className="relative z-10">
                                <motion.div
                                    className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-4"
                                    whileHover={{ rotate: 15, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <feature.icon className="h-8 w-8 text-white" />
                                </motion.div>
                                <motion.h4
                                    className="text-xl font-bold text-white mb-2"
                                    whileHover={{
                                        backgroundPosition: ['0% 50%', '100% 50%'],
                                        backgroundSize: ['200% 200%', '200% 200%']
                                    }}
                                    transition={{
                                        duration: 2,
                                        ease: "linear",
                                    }}
                                    style={{
                                        backgroundImage: 'linear-gradient(90deg, #ffffff, #ef4444, #f97316, #ffffff)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        color: 'transparent',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundSize: '200% 200%',
                                        backgroundPosition: '0% 50%'
                                    }}
                                >
                                    {feature.title}
                                </motion.h4>
                                <motion.p
                                    className="text-gray-400"
                                    whileHover={{ color: '#ffffff' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {feature.desc}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Classes Component with card flip animations
const Classes = () => {
    const classes = [
        {
            name: "HIIT Training",
            instructor: "Sarah Johnson",
            time: "Mon, Wed, Fri - 6:00 AM",
            duration: "45 min",
            intensity: "High",
            gradient: "from-red-600 to-orange-500",
            icon: Activity
        },
        {
            name: "Yoga Flow",
            instructor: "Michael Chen",
            time: "Tue, Thu - 7:00 AM",
            duration: "60 min",
            intensity: "Low",
            gradient: "from-green-600 to-teal-500",
            icon: HeartPulse
        },
        {
            name: "Strength Training",
            instructor: "David Rodriguez",
            time: "Mon-Fri - 5:00 PM",
            duration: "50 min",
            intensity: "Medium",
            gradient: "from-blue-600 to-purple-500",
            icon: Dumbbell
        },
        {
            name: "Cardio Blast",
            instructor: "Emma Thompson",
            time: "Sat, Sun - 9:00 AM",
            duration: "40 min",
            intensity: "High",
            gradient: "from-pink-600 to-rose-500",
            icon: Activity
        },
        {
            name: "Pilates Core",
            instructor: "Lisa Park",
            time: "Daily - 12:00 PM",
            duration: "45 min",
            intensity: "Medium",
            gradient: "from-indigo-600 to-blue-500",
            icon: HeartPulse
        },
        {
            name: "Boxing Fitness",
            instructor: "Tony Martinez",
            time: "Tue, Thu, Sat - 8:00 PM",
            duration: "55 min",
            intensity: "High",
            gradient: "from-yellow-600 to-orange-500",
            icon: Shield
        }
    ];

    return (
        <section id="classes" className="py-20 bg-gray-900 text-white relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-red-500"
                        style={{
                            width: Math.random() * 20 + 10 + 'px',
                            height: Math.random() * 20 + 10 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, (Math.random() - 0.5) * 100],
                            x: [0, (Math.random() - 0.5) * 100],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 15 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-4"
                        whileInView={{
                            backgroundPosition: ['0% 50%', '100% 50%'],
                            backgroundSize: ['200% 200%', '200% 200%']
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 3,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        style={{
                            backgroundImage: 'linear-gradient(90deg, #ffffff, #ef4444, #f97316, #ffffff)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Fitness <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Classes</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        From high-intensity workouts to mindful movement, find the perfect class to match your fitness goals.
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {classes.map((cls, index) => (
                        <motion.div
                            key={index}
                            className="group relative overflow-hidden rounded-xl"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <motion.div
                                className={`h-48 bg-gradient-to-br ${cls.gradient} flex items-center justify-center relative overflow-hidden`}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"
                                    initial={{ opacity: 0.2 }}
                                    whileHover={{ opacity: 0.4 }}
                                />
                                <motion.div
                                    className="relative z-10 text-center"
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <cls.icon className="h-12 w-12 text-white mx-auto mb-2 opacity-80" />
                                    <motion.h3
                                        className="text-2xl font-bold text-white"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {cls.name}
                                    </motion.h3>
                                </motion.div>
                            </motion.div>
                            <motion.div
                                className="p-6 bg-gray-800"
                                initial={{ y: 0 }}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="flex items-center space-x-2 mb-3"
                                    whileHover={{ x: 5 }}
                                >
                                    <Users className="h-4 w-4 text-red-500" />
                                    <span className="text-gray-300">{cls.instructor}</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center space-x-2 mb-3"
                                    whileHover={{ x: 5 }}
                                >
                                    <Clock className="h-4 w-4 text-red-500" />
                                    <span className="text-gray-300">{cls.time}</span>
                                </motion.div>
                                <motion.div
                                    className="flex justify-between items-center mb-4"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <span className="text-sm text-gray-400">Duration: {cls.duration}</span>
                                    <motion.span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${cls.intensity === 'High' ? 'bg-red-500 text-white' :
                                                cls.intensity === 'Medium' ? 'bg-yellow-500 text-black' :
                                                    'bg-green-500 text-white'
                                            }`}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {cls.intensity}
                                    </motion.span>
                                </motion.div>
                                <motion.button
                                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Book Class
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Trainers Component with hover animations
const Trainers = () => {
    const trainers = [
        {
            name: "Sarah Johnson",
            specialty: "HIIT & Cardio Specialist",
            experience: "8 Years",
            bio: "Certified personal trainer specializing in high-intensity workouts and cardiovascular health.",
            rating: 4.9
        },
        {
            name: "Michael Chen",
            specialty: "Yoga & Mindfulness",
            experience: "12 Years",
            bio: "RYT-500 certified yoga instructor focused on mind-body connection and flexibility training.",
            rating: 5.0
        },
        {
            name: "David Rodriguez",
            specialty: "Strength & Conditioning",
            experience: "10 Years",
            bio: "Former competitive athlete now helping others build strength and achieve their fitness goals.",
            rating: 4.8
        },
        {
            name: "Emma Thompson",
            specialty: "Nutrition & Wellness",
            experience: "6 Years",
            bio: "Registered dietitian and fitness coach combining nutrition science with practical fitness.",
            rating: 4.9
        }
    ];

    return (
        <section id="trainers" className="py-20 bg-gray-950 relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full opacity-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-br from-red-500 to-orange-500"
                        style={{
                            width: Math.random() * 300 + 100 + 'px',
                            height: Math.random() * 300 + 100 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            filter: 'blur(40px)'
                        }}
                        animate={{
                            x: [0, (Math.random() - 0.5) * 100],
                            y: [0, (Math.random() - 0.5) * 100],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        whileInView={{
                            backgroundPosition: ['0% 50%', '100% 50%'],
                            backgroundSize: ['200% 200%', '200% 200%']
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 3,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        style={{
                            backgroundImage: 'linear-gradient(90deg, #ffffff, #ef4444, #f97316, #ffffff)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Trainers</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Our certified professionals are here to guide you every step of the way toward your fitness goals.
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trainers.map((trainer, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-900 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            />

                            <motion.div
                                className="relative w-24 h-24 mx-auto mb-4"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-full blur opacity-70 group-hover:opacity-90 group-hover:blur-md transition-all duration-300"
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 15,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                                <motion.div
                                    className="relative flex items-center justify-center w-full h-full bg-gray-800 rounded-full"
                                    whileHover={{ rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <span className="text-2xl font-bold text-white">{trainer.name.split(' ').map(n => n[0]).join('')}</span>
                                </motion.div>
                            </motion.div>

                            <motion.h3
                                className="text-xl font-bold text-white mb-2"
                                whileHover={{
                                    backgroundPosition: ['0% 50%', '100% 50%'],
                                    backgroundSize: ['200% 200%', '200% 200%']
                                }}
                                transition={{
                                    duration: 2,
                                    ease: "linear",
                                }}
                                style={{
                                    backgroundImage: 'linear-gradient(90deg, #ffffff, #ef4444, #f97316, #ffffff)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundSize: '200% 200%',
                                    backgroundPosition: '0% 50%'
                                }}
                            >
                                {trainer.name}
                            </motion.h3>

                            <motion.p
                                className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 font-semibold mb-2"
                                whileHover={{ scale: 1.05 }}
                            >
                                {trainer.specialty}
                            </motion.p>

                            <motion.p
                                className="text-gray-400 text-sm mb-3"
                                whileHover={{ color: '#ffffff' }}
                            >
                                {trainer.bio}
                            </motion.p>

                            <motion.div
                                className="flex items-center justify-center space-x-4 mb-4"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-sm text-gray-500">{trainer.experience}</span>
                                <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-sm font-semibold text-white">{trainer.rating}</span>
                                </div>
                            </motion.div>

                            <motion.button
                                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-6 py-2 rounded-full transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book Session
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Pricing Component with interactive animations
const Pricing = () => {
    const plans = [
        {
            name: "Basic",
            price: "$29",
            period: "/month",
            features: [
                "Access to gym equipment",
                "Locker room access",
                "Basic fitness assessment",
                "Mobile app access"
            ],
            popular: false
        },
        {
            name: "Premium",
            price: "$59",
            period: "/month",
            features: [
                "Everything in Basic",
                "Unlimited group classes",
                "2 personal training sessions",
                "Nutrition consultation",
                "Guest pass (2/month)"
            ],
            popular: true
        },
        {
            name: "Elite",
            price: "$99",
            period: "/month",
            features: [
                "Everything in Premium",
                "Unlimited personal training",
                "Custom meal planning",
                "Recovery services",
                "VIP locker access",
                "Unlimited guest passes"
            ],
            popular: false
        }
    ];

    return (
        <section id="pricing" className="py-20 bg-gray-900 relative overflow-hidden">
            {/* Floating gradient circles */}
            <motion.div
                className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-red-500 to-orange-500 opacity-10 blur-3xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            <motion.div
                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 opacity-10 blur-3xl"
                animate={{
                    x: [0, -50, 0],
                    y: [0, -30, 0]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        whileInView={{
                            backgroundPosition: ['0% 50%', '100% 50%'],
                            backgroundSize: ['200% 200%', '200% 200%']
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 3,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        style={{
                            backgroundImage: 'linear-gradient(90deg, #ffffff, #ef4444, #f97316, #ffffff)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Plan</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Flexible membership options designed to fit your lifestyle and budget.
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`relative bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'border-2 border-red-500' : 'border border-gray-700'
                                }`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            {plan.popular && (
                                <motion.div
                                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                                        Most Popular
                                    </span>
                                </motion.div>
                            )}

                            <motion.div
                                className="text-center mb-8"
                                whileHover={{ scale: 1.02 }}
                            >
                                <motion.h3
                                    className="text-2xl font-bold text-white mb-2"
                                    whileHover={{
                                        backgroundPosition: ['0% 50%', '100% 50%'],
                                        backgroundSize: ['200% 200%', '200% 200%']
                                    }}
                                    transition={{
                                        duration: 2,
                                        ease: "linear",
                                    }}
                                    style={{
                                        backgroundImage: 'linear-gradient(90deg, #ffffff, #ef4444, #f97316, #ffffff)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        color: 'transparent',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundSize: '200% 200%',
                                        backgroundPosition: '0% 50%'
                                    }}
                                >
                                    {plan.name}
                                </motion.h3>
                                <div className="flex items-baseline justify-center">
                                    <motion.span
                                        className="text-5xl font-bold text-white"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {plan.price}
                                    </motion.span>
                                    <span className="text-gray-400 ml-1">{plan.period}</span>
                                </div>
                            </motion.div>

                            <motion.ul
                                className="space-y-4 mb-8"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {plan.features.map((feature, featureIndex) => (
                                    <motion.li
                                        key={featureIndex}
                                        className="flex items-center space-x-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.2 + featureIndex * 0.1 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                        </motion.div>
                                        <span className="text-gray-300">{feature}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.button
                                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${plan.popular
                                        ? 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white'
                                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Get Started
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.p
                        className="text-gray-400 mb-4"
                        whileHover={{ scale: 1.02 }}
                    >
                        All plans include a 7-day free trial • No setup fees • Cancel anytime
                    </motion.p>
                    <motion.button
                        className="text-red-500 hover:text-orange-500 font-semibold transition-colors duration-300 flex items-center justify-center mx-auto"
                        whileHover={{ x: 5 }}
                    >
                        Compare all features <ArrowRight className="h-4 w-4 ml-1" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

// Contact Component with form animations
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="py-20 bg-gray-950 text-white relative overflow-hidden">
            {/* Floating gradient elements */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full opacity-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-br from-red-500 to-orange-500"
                        style={{
                            width: Math.random() * 200 + 50 + 'px',
                            height: Math.random() * 200 + 50 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            filter: 'blur(30px)'
                        }}
                        animate={{
                            x: [0, (Math.random() - 0.5) * 100],
                            y: [0, (Math.random() - 0.5) * 100],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-4"
                        whileInView={{
                            backgroundPosition: ['0% 50%', '100% 50%'],
                            backgroundSize: ['200% 200%', '200% 200%']
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 3,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        style={{
                            backgroundImage: 'linear-gradient(90deg, #ffffff, #ef4444, #f97316, #ffffff)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Touch</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Ready to start your fitness journey? Contact us today for a free consultation.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h3
                            className="text-2xl font-bold mb-6"
                            whileInView={{
                                backgroundPosition: ['0% 50%', '100% 50%'],
                                backgroundSize: ['200% 200%', '200% 200%']
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 3,
                                ease: "linear",
                            }}
                            style={{
                                backgroundImage: 'linear-gradient(90deg, #ffffff, #ef4444, #f97316, #ffffff)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Contact Information
                        </motion.h3>

                        <div className="space-y-6">
                            <motion.div
                                className="flex items-start space-x-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg"
                                    whileHover={{ rotate: 15, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <MapPin className="h-5 w-5 text-white" />
                                </motion.div>
                                <div>
                                    <h4 className="font-semibold mb-1">Address</h4>
                                    <p className="text-gray-400">123 Fitness Street<br />Gym City, GC 12345</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex items-start space-x-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg"
                                    whileHover={{ rotate: 15, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <Phone className="h-5 w-5 text-white" />
                                </motion.div>
                                <div>
                                    <h4 className="font-semibold mb-1">Phone</h4>
                                    <p className="text-gray-400">(555) 123-4567</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex items-start space-x-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg"
                                    whileHover={{ rotate: 15, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <Mail className="h-5 w-5 text-white" />
                                </motion.div>
                                <div>
                                    <h4 className="font-semibold mb-1">Email</h4>
                                    <p className="text-gray-400">info@fitfusion.com</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex items-start space-x-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg"
                                    whileHover={{ rotate: 15, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                    <Clock className="h-5 w-5 text-white" />
                                </motion.div>
                                <div>
                                    <h4 className="font-semibold mb-1">Hours</h4>
                                    <p className="text-gray-400">
                                        Mon-Fri: 5:00 AM - 11:00 PM<br />
                                        Sat-Sun: 6:00 AM - 10:00 PM
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="mt-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <h4 className="font-semibold mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                <motion.div
                                    className="p-2 bg-gray-800 rounded-lg hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500 transition-all duration-300 cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Facebook className="h-5 w-5" />
                                </motion.div>
                                <motion.div
                                    className="p-2 bg-gray-800 rounded-lg hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500 transition-all duration-300 cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Instagram className="h-5 w-5" />
                                </motion.div>
                                <motion.div
                                    className="p-2 bg-gray-800 rounded-lg hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500 transition-all duration-300 cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Twitter className="h-5 w-5" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:shadow-xl transition-shadow duration-300"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ y: -5 }}
                    >
                        <motion.h3
                            className="text-2xl font-bold mb-6"
                            whileInView={{
                                backgroundPosition: ['0% 50%', '100% 50%'],
                                backgroundSize: ['200% 200%', '200% 200%']
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 3,
                                ease: "linear",
                            }}
                            style={{
                                backgroundImage: 'linear-gradient(90deg, #ffffff, #ef4444, #f97316, #ffffff)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Send us a Message
                        </motion.h3>

                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="grid md:grid-cols-2 gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                                    <motion.input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white transition-all duration-300"
                                        required
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                                    <motion.input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white transition-all duration-300"
                                        required
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-300">Phone</label>
                                <motion.input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white transition-all duration-300"
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                                <motion.textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white transition-all duration-300"
                                    required
                                    whileFocus={{ scale: 1.02 }}
                                ></motion.textarea>
                            </motion.div>

                            <motion.button
                                type="submit"
                                className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                Send Message
                                <motion.span
                                    className="inline-block ml-2"
                                    animate={{
                                        x: [0, 5, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                    }}
                                >
                                    <ArrowRight className="h-5 w-5 inline" />
                                </motion.span>
                            </motion.button>
                        </motion.form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center space-x-2 mb-4">
                            <Dumbbell className="h-8 w-8 text-red-500" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                                FitFusion
                            </span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Transform your body and mind with our premium fitness programs and expert trainers.
                        </p>
                        <div className="flex space-x-4">
                            <motion.a
                                href="#"
                                className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                                whileHover={{ y: -3 }}
                            >
                                <Facebook className="h-5 w-5" />
                            </motion.a>
                            <motion.a
                                href="#"
                                className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                                whileHover={{ y: -3 }}
                            >
                                <Instagram className="h-5 w-5" />
                            </motion.a>
                            <motion.a
                                href="#"
                                className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                                whileHover={{ y: -3 }}
                            >
                                <Twitter className="h-5 w-5" />
                            </motion.a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Home', 'About', 'Classes', 'Trainers', 'Pricing', 'Contact' ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <SmoothScrollLink
                                        to={item.toLowerCase()}
                                        className="text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {item}
                                    </SmoothScrollLink>
                                </motion.li>
                            ))}
                        </ul>
                        <h3 className="text-sm font-semibold mb-4 mt-4 cursor-pointer" onClick={()=>{
                            useNavigate("/login");
                        }}>Owner</h3>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex justify-between">
                                <span>Monday - Friday</span>
                                <span>5:00 AM - 11:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Saturday</span>
                                <span>6:00 AM - 10:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span>6:00 AM - 10:00 PM</span>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">
                            Subscribe to our newsletter for the latest updates and offers.
                        </p>
                        <motion.form className="flex"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                                required
                            />
                            <motion.button
                                type="submit"
                                className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-r-lg font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => { navigate("/register") }}
                            >
                                Join
                            </motion.button>
                        </motion.form>
                    </motion.div>
                </div>

                <motion.div
                    className="pt-8 border-t border-gray-800 text-center text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p>© {new Date().getFullYear()} FitFusion. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
};

// Main App Component
const HomeWebsite = () => {
    return (
        <div className="bg-gray-950 text-white">
            <LoadingScreen />
            <Header />
            <Hero />
            <About />
            <Classes />
            <Trainers />
            <Pricing />
            <Contact />
            <Footer />
        </div>
    );
};

export default HomeWebsite;