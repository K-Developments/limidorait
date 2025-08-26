"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { GanttChartSquare, PencilRuler, Code, Rocket, ArrowDown, Lightbulb, Users, Target, Zap } from 'lucide-react';

const processSteps = [
  {
    icon: GanttChartSquare,
    title: '1. Discovery & Strategy',
    description: "We start by understanding your goals, audience, and challenges to create a tailored roadmap for success.",
    storyTitle: "Every Great Journey Begins...",
    storyDescription: "With understanding your vision and mapping the path to success",
    storyIcon: Lightbulb,
  },
  {
    icon: PencilRuler,
    title: '2. Design & Prototyping',
    description: "Our team designs intuitive UI/UX and creates interactive prototypes to visualize the end product.",
    storyTitle: "Bringing Ideas to Life",
    storyDescription: "Where creativity meets functionality in perfect harmony",
    storyIcon: Users,
  },
  {
    icon: Code,
    title: '3. Development & Testing',
    description: "We write clean, efficient code and rigorously test every feature to ensure a flawless final product.",
    storyTitle: "Crafting Excellence",
    storyDescription: "Building robust solutions with precision and care",
    storyIcon: Target,
  },
  {
    icon: Rocket,
    title: '4. Launch & Optimization',
    description: "After a successful launch, we monitor performance and provide ongoing support to ensure continued growth.",
    storyTitle: "Ready for Takeoff",
    storyDescription: "Launching your success story into the world",
    storyIcon: Zap,
  },
];

// Mobile Step Component
const MobileStep = ({ step, index, isActive, onComplete }: { 
  step: any; 
  index: number; 
  isActive: boolean;
  onComplete: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3 });

  useEffect(() => {
    if (isInView && isActive) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView, isActive, onComplete]);

  return (
    <motion.div
      ref={ref}
      className="w-full mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Story Section */}
      {isActive && (
        <motion.div
          className="text-center mb-8 p-6 bg-card/50 backdrop-blur-sm rounded-lg border"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "linear" }}
          >
            <step.storyIcon className="w-8 h-8 text-primary" />
          </motion.div>
          
          <motion.h3
            className="text-xl sm:text-2xl font-bold text-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {step.storyTitle}
          </motion.h3>
          
          <motion.p
            className="text-sm sm:text-base text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {step.storyDescription}
          </motion.p>
        </motion.div>
      )}

      {/* Process Step */}
      <motion.div
        className="flex items-start gap-4 p-4 sm:p-6 bg-background/80 backdrop-blur-sm rounded-lg border shadow-sm"
        whileHover={{ scale: 1.02, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
          animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
        >
          <step.icon className="w-6 h-6 text-primary" />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
            {step.title}
          </h4>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Desktop Components
const StoryOverlay = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const overlayOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [0, 1, 1, 0]);
  
  return (
    <motion.div
      style={{ opacity: overlayOpacity }}
      className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center"
    >
      <div className="text-center max-w-2xl mx-auto px-4">
        {processSteps.map((step, index) => {
          const isLastStep = index === processSteps.length - 1;
          
          const stepOpacity = useTransform(
            scrollYProgress, 
            isLastStep 
              ? [0.15 + index * 0.15, 0.25 + index * 0.15, 1] 
              : [0.15 + index * 0.15, 0.25 + index * 0.15, 0.35 + index * 0.15, 0.45 + index * 0.15], 
            isLastStep 
              ? [0, 1, 1] 
              : [0, 1, 1, 0]
          );
          
          const stepY = useTransform(
            scrollYProgress, 
            isLastStep 
              ? [0.15 + index * 0.15, 0.25 + index * 0.15, 1] 
              : [0.15 + index * 0.15, 0.25 + index * 0.15, 0.35 + index * 0.15, 0.45 + index * 0.15], 
            isLastStep 
              ? ["30px", "0px", "0px"] 
              : ["30px", "0px", "0px", "-30px"]
          );

          return (
            <motion.div
              key={step.storyTitle}
              style={{ opacity: stepOpacity, y: stepY }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <motion.div
                className="mb-6"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <div className="bg-background/90 backdrop-blur-sm p-4 rounded-full border shadow-xl">
                  <step.storyIcon className="h-10 w-10 text-foreground" />
                </div>
              </motion.div>
              
              <motion.h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-center">
                {step.storyTitle}
              </motion.h3>
              
              <motion.p className="text-lg md:text-xl text-muted-foreground text-center font-light max-w-lg">
                {step.storyDescription}
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

const ProgressIndicator = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const progressWidth = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const progressOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);
  
  return (
    <motion.div
      style={{ opacity: progressOpacity }}
      className="fixed top-0 left-0 right-0 z-30 h-1 bg-border/30"
    >
      <motion.div
        style={{ width: progressWidth }}
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary"
      />
    </motion.div>
  );
};

const ScrollIndicator = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  return (
    <motion.div
      style={{ opacity: indicatorOpacity }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <p className="text-sm text-muted-foreground hidden sm:block">Scroll to begin the journey</p>
        <ArrowDown className="h-5 w-5 text-foreground" />
      </motion.div>
    </motion.div>
  );
};

const Circle = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const scale = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 1.1]);
  const opacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);
  const pathLength = useTransform(smoothProgress, [0.1, 0.9], [0, 1]);
  const dashOffset = useTransform(pathLength, [0, 1], [1570, 0]);
  
  return (
    <motion.div
      style={{ scale, opacity }}
      className="sticky top-1/4 w-full max-w-md lg:max-w-lg aspect-square mx-auto"
    >
      <motion.svg 
        viewBox="0 0 500 500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
      >
        <motion.circle
          cx="250"
          cy="250"
          r="240"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          strokeDasharray="4 8"
          fill="none"
          opacity={0.3}
        />
        
        <motion.circle
          cx="250"
          cy="250"
          r="240"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1507"
          style={{ 
            strokeDashoffset: dashOffset,
            rotate: -90,
            transformOrigin: "center"
          }}
          className="drop-shadow-lg"
        />
        
        {[0, 1, 2].map((ring, index) => (
          <motion.circle
            key={ring}
            cx="250"
            cy="250"
            r={180 - index * 30}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            fill="none"
            opacity={0.1}
            animate={{ 
              scale: [0.8, 1.1, 0.8],
              opacity: [0, 0.2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.7,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
};

const DesktopStep = ({ step, index }: { step: any; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], ["50px", "0px", "0px", "-50px"]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0.9, 1, 1, 0.95]);
  
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={cn(
        "w-full md:w-1/2 flex gap-4 group cursor-pointer relative z-10",
        isEven ? "md:self-start md:pr-8" : "md:self-end md:pl-8 md:text-right"
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div className={cn("mt-1", isEven ? "" : "md:order-2")}>
        <motion.div 
          className="bg-muted p-3 rounded-md w-fit mx-auto relative overflow-hidden group-hover:shadow-lg transition-shadow duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <step.icon className="h-6 w-6 text-foreground relative z-10" />
        </motion.div>
      </motion.div>
      
      <motion.div className={cn(isEven ? "" : "md:order-1")}>
        <motion.h3 className="text-xl font-semibold mb-2 group-hover:text-foreground/90 transition-colors duration-300">
          {step.title}
        </motion.h3>
        <motion.p className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
          {step.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export const WorkProcess = () => {
  const containerRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleStepComplete = () => {
    if (currentStep < processSteps.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 500);
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="work-process" 
      className={cn(
        "relative py-12 sm:py-16 md:py-20 lg:py-28 bg-background overflow-x-hidden",
        isMobile ? "min-h-screen" : "min-h-[400vh]"
      )}
    >
      {/* Desktop-only overlays */}
      {!isMobile && (
        <>
          <ProgressIndicator scrollYProgress={scrollYProgress} />
          <StoryOverlay scrollYProgress={scrollYProgress} />
          <ScrollIndicator scrollYProgress={scrollYProgress} />
        </>
      )}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto relative z-10"
        >
          <Badge variant="outline" className="mb-4">
            Our Approach
          </Badge>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-4 font-body uppercase">
            Our Workflow
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground">
            We follow a structured and collaborative process to ensure every project is a success, from initial concept to final launch.
          </p>
        </motion.div>

        {/* Mobile Layout */}
        {isMobile && (
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <MobileStep
                key={step.title}
                step={step}
                index={index}
                isActive={index === currentStep}
                onComplete={handleStepComplete}
              />
            ))}
          </div>
        )}

        {/* Desktop Layout */}
        {!isMobile && (
          <div className="relative flex flex-col items-center">
            {/* Center line */}
            <motion.div 
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent"
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            <Circle scrollYProgress={scrollYProgress} />
            
            <div className="md:absolute md:inset-0 flex flex-col items-center justify-around gap-12 md:gap-0 mt-8 md:mt-0">
              {processSteps.map((step, index) => (
                <DesktopStep key={step.title} step={step} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </motion.div>
    </section>
  );
};