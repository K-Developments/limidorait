
"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSidebar } from './sidebar-provider';
import { Separator } from '../ui/separator';

export function Sidebar() {
  const { isOpen, setOpen, navItems, services } = useSidebar();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isOpen]);

  const onClose = () => setOpen(false);

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
  
  const featuredServices = services.slice(0, 4);
  const mainNavItems = navItems.filter(item => item.name !== 'Services');

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
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-background p-6 shadow-2xl overflow-y-auto"
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
            
            <nav aria-label="Main Navigation">
              <h3 className="px-4 py-2 text-sm font-semibold text-muted-foreground">Services</h3>
              <div className="grid grid-cols-2 gap-2 p-2">
                {featuredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4, ease: 'easeOut' }}
                  >
                    <Link href={service.link} onClick={onClose} className="block p-3 rounded-md text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                      {service.title}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <Separator className="my-4" />

              <ul className="flex flex-col items-start">
                  {mainNavItems.map((item, index) => (
                  <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index + 0.2, duration: 0.5, ease: 'easeOut' }}
                      className="w-full"
                  >
                      <Link
                        href={item.href || '#'}
                        onClick={onClose}
                        className="block py-4 text-xl font-semibold text-foreground transition-colors hover:text-accent-foreground hover:bg-accent w-full border-b"
                      >
                        {item.name}
                      </Link>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
