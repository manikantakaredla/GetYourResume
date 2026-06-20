'use client';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 animate-pulse border border-neutral-200 dark:border-neutral-800" />;
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="relative w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-850 text-neutral-800 dark:text-neutral-200 overflow-hidden shadow-sm hover:scale-105 active:scale-95 transition-all"
      title={`Theme: ${theme}. Click to change.`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' && (
          <motion.div
            key="light"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <Sun className="w-[18px] h-[18px] text-amber-500" />
          </motion.div>
        )}
        {theme === 'dark' && (
          <motion.div
            key="dark"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <Moon className="w-[18px] h-[18px] text-indigo-400" />
          </motion.div>
        )}
        {theme === 'system' && (
          <motion.div
            key="system"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <Monitor className="w-[18px] h-[18px] text-emerald-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
