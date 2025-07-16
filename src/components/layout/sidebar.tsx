
"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

interface SidebarProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ navItems, isOpen, onClose }: SidebarProps) {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={onClose}
        >
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-background p-6 shadow-2xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }} // Smoother ease-out curve
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-end mb-8'>
                <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
                    <X className="h-6 w-6" />
                </Button>
            </div>
            <nav className="flex flex-col items-start gap-y-2">
                {navItems.map((item, index) => (
                   <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.2, duration: 0.5, ease: 'easeOut' }}
                    className="w-full"
                   >
                     <Link
                      href={item.href}
                      onClick={onClose}
                      className="block py-4 text-3xl font-semibold text-foreground transition-colors hover:text-primary w-full border-b"
                    >
                      {item.name}
                    </Link>
                   </motion.div>
                ))}
            </nav>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ease: 'easeOut' }}
                className='mt-12 flex flex-col gap-4'
            >
                <Button asChild size="lg" className="w-full" onClick={onClose}>
                    <Link href="/contact">Get in Touch</Link>
                </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
