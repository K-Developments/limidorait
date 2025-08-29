
"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { WorkProcessStep } from "@/services/firestore";
import Image from "next/image";

/* -------------------- */
/* MOBILE COMPONENTS    */
/* -------------------- */

const MobileProgressIndicator = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const progressWidth = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);
  const progressOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.15, 0.85, 0.95],
    [0, 1, 1, 0]
  );

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

const MobileCircle = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  const scale = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.7, 1, 1, 1.2]);
  const opacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);
  const pathLength = useTransform(smoothProgress, [0.05, 0.95], [0, 1]);
  const dashOffset = useTransform(pathLength, [0, 1], [942, 0]); // Smaller circle circumference

  return (
    <motion.div
      style={{ scale, opacity }}
      className="sticky top-1/3 w-64 h-64 mx-auto"
    >
      <motion.svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <motion.circle
          cx="160"
          cy="160"
          r="145"
          stroke="hsl(var(--border))"
          strokeWidth="1.5"
          strokeDasharray="3 6"
          fill="none"
          opacity={0.3}
        />

        <motion.circle
          cx="160"
          cy="160"
          r="145"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="911"
          style={{
            strokeDashoffset: dashOffset,
            rotate: -90,
            transformOrigin: "center",
          }}
          className="drop-shadow-lg"
        />

        {[0, 1].map((ring, index) => (
          <motion.circle
            key={ring}
            cx="160"
            cy="160"
            r={110 - index * 20}
            stroke="hsl(var(--primary))"
            strokeWidth="0.8"
            fill="none"
            opacity={0.1}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
};

const MobileStep = ({ step, index, totalSteps }: { step: WorkProcessStep; index: number; totalSteps: number }) => {
  const ref = useRef(null);
  const isLastStep = index === totalSteps - 1;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.1"],
  });

  const opacity = useTransform(
    scrollYProgress,
    isLastStep ? [0.1, 0.4, 1] : [0.1, 0.4, 0.6, 0.9],
    isLastStep ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    isLastStep ? [0.1, 0.4, 1] : [0.1, 0.4, 0.6, 0.9],
    isLastStep ? ["30px", "0px", "0px"] : ["30px", "0px", "0px", "-30px"]
  );
  const scale = useTransform(
    scrollYProgress,
    isLastStep ? [0.1, 0.4, 1] : [0.1, 0.4, 0.6, 0.9],
    isLastStep ? [0.9, 1, 1] : [0.9, 1, 1, 0.95]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="w-full max-w-xs mx-auto flex flex-col items-center text-center group cursor-pointer relative z-10 mb-8"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div className="mb-4">
        <motion.div
          className="bg-muted p-4 rounded-xl w-fit mx-auto relative overflow-hidden group-hover:shadow-lg transition-shadow duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <div className="relative h-7 w-7">
            <Image src={step.iconUrl} alt={step.title} fill className="object-contain" />
          </div>
        </motion.div>
      </motion.div>

      <motion.h3 className="text-lg font-semibold mb-3 group-hover:text-foreground/90 transition-colors duration-300">
        {step.title}
      </motion.h3>
      
      <motion.p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 leading-relaxed">
        {step.description}
      </motion.p>
    </motion.div>
  );
};

/* -------------------- */
/* DESKTOP COMPONENTS   */
/* -------------------- */

const ProgressIndicator = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const progressWidth = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const progressOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.8, 0.9],
    [0, 1, 1, 0]
  );

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

const Circle = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

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
            transformOrigin: "center",
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
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.7,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
};

const DesktopStep = ({ step, index, totalSteps }: { step: WorkProcessStep; index: number; totalSteps: number; }) => {
  const ref = useRef(null);
  const isLastStep = index === totalSteps - 1;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const opacity = useTransform(
    scrollYProgress, 
    isLastStep ? [0.1, 0.3, 1] : [0.1, 0.3, 0.7, 0.9], 
    isLastStep ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress, 
    isLastStep ? [0.1, 0.3, 1] : [0.1, 0.3, 0.7, 0.9], 
    isLastStep ? ["50px", "0px", "0px"] : ["50px", "0px", "0px", "-50px"]
  );
  const scale = useTransform(
    scrollYProgress, 
    isLastStep ? [0.1, 0.3, 1] : [0.1, 0.3, 0.7, 0.9], 
    isLastStep ? [0.9, 1, 1] : [0.9, 1, 1, 0.95]
  );

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
          <div className="relative h-6 w-6">
            <Image src={step.iconUrl} alt={step.title} fill className="object-contain" />
          </div>
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

/* -------------------- */
/* MAIN COMPONENT       */
/* -------------------- */
export const WorkProcess = ({ steps }: { steps?: WorkProcessStep[] }) => {
  const containerRef = useRef(null);
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
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!steps || steps.length === 0) {
    return null;
  }

  const sectionHeightClass = isMobile ? `min-h-[${steps.length * 20}rem]` : `min-h-[${steps.length * 15}rem]`;

  return (
    <section
      ref={containerRef}
      id="work-process"
      className={cn(
        "relative py-12 sm:py-16 md:py-20 lg:py-28 bg-background overflow-x-hidden",
        sectionHeightClass
      )}
    >
      {/* Mobile overlays */}
      {isMobile && (
        <MobileProgressIndicator scrollYProgress={scrollYProgress} />
      )}

      {/* Desktop overlays */}
      {!isMobile && (
        <ProgressIndicator scrollYProgress={scrollYProgress} />
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

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4 font-body">
            Our Workflow
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground">
            We follow a structured and collaborative process to ensure every
            project is a success, from initial concept to final launch.
          </p>
        </motion.div>

        {/* Mobile Layout */}
        {isMobile && (
          <div className="relative flex flex-col items-center">
            <MobileCircle scrollYProgress={scrollYProgress} />
            
            <div className="absolute inset-0 flex flex-col items-center justify-around mt-8">
              {steps.map((step, index) => (
                <MobileStep key={step.id || index} step={step} index={index} totalSteps={steps.length} />
              ))}
            </div>
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

            <div className="absolute inset-0 flex flex-col items-center justify-around gap-12 md:gap-0 mt-8 md:mt-0">
              {steps.map((step, index) => (
                <DesktopStep key={step.id || index} step={step} index={index} totalSteps={steps.length}/>
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
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Add any background decorative elements here */}
      </motion.div>
    </section>
  );
};
