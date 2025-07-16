
"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  name: string;
  href?: string;
}

interface SidebarProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ navItems, isOpen, onClose }: SidebarProps) {
  const [menu, setMenu] = useState<'main' | 'solutions'>('main');

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const menuContainerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' }
  };

  const menuVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  };

  const solutionsVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  };
  
  const solutionsNavItems = [
      { name: 'Web Developments', href: '/solutions/web-development'},
      { name: 'Mobile App Developments', href: '/solutions/mobile-apps'},
      { name: 'Software Developments', href: '/solutions/software'},
      { name: 'Web App Developments', href: '/solutions/web-apps'},
      { name: 'Need Help?', href: '/contact'}
  ]

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
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-background p-6 shadow-2xl overflow-x-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuContainerVariants}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-end mb-8'>
                <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
                    <X className="h-6 w-6" />
                </Button>
            </div>
             <AnimatePresence initial={false}>
                {menu === 'main' && (
                    <motion.div
                        key="main"
                        variants={menuVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="h-full"
                    >
                        <nav className="flex flex-col items-start gap-y-2">
                            {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index + 0.2, duration: 0.5, ease: 'easeOut' }}
                                className="w-full"
                            >
                                {item.name === 'Solutions' ? (
                                    <button onClick={() => setMenu('solutions')} className="flex justify-between items-center py-4 text-3xl font-semibold text-foreground transition-colors hover:text-primary w-full border-b text-left">
                                        {item.name}
                                        <ChevronRight className="h-7 w-7" />
                                    </button>
                                ) : (
                                    <Link
                                    href={item.href || '#'}
                                    onClick={onClose}
                                    className="block py-4 text-3xl font-semibold text-foreground transition-colors hover:text-primary w-full border-b"
                                    >
                                    {item.name}
                                    </Link>
                                )}
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
                )}

                {menu === 'solutions' && (
                    <motion.div
                        key="solutions"
                        variants={solutionsVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="h-full"
                    >
                        <Button variant="ghost" onClick={() => setMenu('main')} className="mb-4 font-semibold text-lg pl-0 hover:bg-transparent">
                            <ChevronLeft className="mr-2 h-5 w-5"/> Back
                        </Button>
                        <nav className="flex flex-col items-start gap-y-2">
                            {solutionsNavItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.5, ease: 'easeOut' }}
                                    className="w-full"
                                >
                                    <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="block py-4 text-2xl font-semibold text-foreground transition-colors hover:text-primary w-full border-b"
                                    >
                                    {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
             </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
