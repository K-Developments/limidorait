
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
  const [menu, setMenu] = useState<'main' | 'services'>('main');

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

  const servicesVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  };
  
  const servicesNavItems = [
      { name: 'Web Developments', href: '/services'},
      { name: 'Mobile App Developments', href: '/services'},
      { name: 'Software Developments', href: '/services'},
      { name: 'Web App Developments', href: '/services'},
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
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-background p-6 shadow-2xl overflow-x-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuContainerVariants}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-end mb-8'>
                <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu" className="bg-black text-white hover:bg-zinc-800">
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
                        <nav aria-label="Main Navigation">
                          <ul className="flex flex-col items-start gap-y-2">
                              {navItems.map((item, index) => (
                              <motion.li
                                  key={item.name}
                                  initial={{ opacity: 0, x: 50 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * index + 0.2, duration: 0.5, ease: 'easeOut' }}
                                  className="w-full"
                              >
                                  {item.name === 'Services' ? (
                                      <button onClick={() => setMenu('services')} className="flex justify-between items-center py-4 text-2xl font-semibold text-foreground transition-colors hover:text-primary w-full border-b text-left">
                                          {item.name}
                                          <ChevronRight className="h-7 w-7" />
                                      </button>
                                  ) : (
                                      <Link
                                      href={item.href || '#'}
                                      onClick={onClose}
                                      className="block py-4 text-2xl font-semibold text-foreground transition-colors hover:text-primary w-full border-b"
                                      >
                                      {item.name}
                                      </Link>
                                  )}
                              </motion.li>
                              ))}
                          </ul>
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

                {menu === 'services' && (
                    <motion.div
                        key="services"
                        variants={servicesVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="h-full"
                    >
                        <Button variant="ghost" onClick={() => setMenu('main')} className="mb-4 font-semibold text-lg pl-0 hover:bg-transparent">
                            <ChevronLeft className="mr-2 h-5 w-5"/> Back to Main Menu
                        </Button>
                        <nav aria-label="Services Navigation">
                          <ul className="flex flex-col items-start gap-y-2">
                              {servicesNavItems.map((item, index) => (
                                  <motion.li
                                      key={item.name}
                                      initial={{ opacity: 0, x: 50 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.1 * index, duration: 0.5, ease: 'easeOut' }}
                                      className="w-full"
                                  >
                                      <Link
                                      href={item.href}
                                      onClick={onClose}
                                      className="block py-4 text-xl font-semibold text-foreground transition-colors hover:text-primary w-full border-b"
                                      >
                                      {item.name}
                                      </Link>
                                  </motion.li>
                              ))}
                          </ul>
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
