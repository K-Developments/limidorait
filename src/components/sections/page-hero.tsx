"use client";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

// Animated Cells Background Component
function AnimatedCells() {
  const [cells, setCells] = React.useState<any[]>([]);

  React.useEffect(() => {
    // This function can't be memoized easily with Math.random, but for this use case it's fine.
    const generatedCells = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1000 + 40,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setCells(generatedCells);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {cells.map((cell) => (
        <motion.div
          key={cell.id}
          className="absolute rounded-full"
          style={{
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            width: `${cell.size}px`,
            height: `${cell.size}px`,
            background: `radial-gradient(circle, hsl(180 18% 54% / 0.15) 0%, hsl(180 18% 54% / 0.05) 50%, transparent 100%)`,
            filter: 'blur(1px)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.3, 0.6, 0.2, 0.4],
          }}
          transition={{
            duration: cell.duration,
            delay: cell.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Additional floating particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: 'hsl(180 18% 54% / 0.3)',
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}


export function PageHero({ title, subtitle }: PageHeroProps) {
  const isLoading = !title && !subtitle;

  return (
    <section
      aria-labelledby="page-hero-title"
      className="relative flex md:flex-row flex-col items-center justify-center w-full min-h-[50vh] text-gray-800 overflow-hidden hero-section"
      style={{
        background: `linear-gradient(135deg, 
          hsl(0 0% 98%) 0%, 
          hsl(0 0% 94.1%) 30%, 
          hsl(180 18% 54% / 0.1) 70%, 
          hsl(0 0% 96%) 100%)`
      }}
    >
      {/* Animated Cells Background */}
      <AnimatedCells />
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/20" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 p-8 md:p-12 flex items-center justify-center w-full h-[50vh]"
      >
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-gray-300/20 to-transparent" />
          <div className="absolute top-0 left-2/4 h-full w-[1px] bg-gradient-to-b from-transparent via-gray-300/20 to-transparent" />
          <div className="absolute top-0 left-3/4 h-full w-[1px] bg-gradient-to-b from-transparent via-gray-300/20 to-transparent" />
          <div className="absolute right-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300/20 to-transparent" />
          <div className="absolute right-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300/20 to-transparent" />
        </div>

        <div className="relative text-center">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-3/4 mx-auto bg-gray-300/30" />
              <Skeleton className="h-8 w-full max-w-lg mx-auto bg-gray-300/30" />
            </div>
          ) : (
            <>
              <motion.h1 
                id="page-hero-title" 
                className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase mb-4 font-headline bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
                style={{lineHeight: 1.2}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {title}
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl max-w-3xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {subtitle}
              </motion.p>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
