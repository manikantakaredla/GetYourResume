'use client';

import { motion } from 'framer-motion';

export default function BackgroundGeometry() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Soft gradient ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 dark:from-blue-600/10 dark:to-indigo-600/10 blur-[130px] opacity-70" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-600/10 dark:to-pink-600/10 blur-[130px] opacity-70" />
      
      {/* Full-screen SVG Grid and Coordinates */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.25] dark:opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Subtle dot matrix grid */}
          <pattern id="dot-matrix" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="fill-neutral-400 dark:fill-neutral-800" />
          </pattern>
        </defs>
        
        {/* Full-screen dot grid overlay */}
        <rect width="100%" height="100%" fill="url(#dot-matrix)" />
      </svg>
      
      {/* Rotating Circle Orbits */}
      <div className="absolute top-[-100px] right-[-100px] md:top-[-200px] md:right-[-200px] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-full border border-dashed border-neutral-300/40 dark:border-neutral-800/20 rounded-full flex items-center justify-center"
        >
          {/* Sub-orbit ring */}
          <div className="w-[85%] h-[85%] border border-neutral-200/30 dark:border-neutral-800/10 rounded-full" />
          {/* Orbit marker */}
          <div className="absolute w-2 h-2 bg-blue-500/30 dark:bg-blue-400/20 rounded-full top-[10%] left-[10%]" />
        </motion.div>
      </div>

      <div className="absolute bottom-[-150px] left-[-150px] md:bottom-[-300px] md:left-[-300px] w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full flex items-center justify-center">
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-full border border-dashed border-neutral-300/40 dark:border-neutral-800/20 rounded-full flex items-center justify-center"
        >
          <div className="w-[80%] h-[80%] border border-neutral-200/30 dark:border-neutral-800/15 rounded-full" />
          <div className="absolute w-2.5 h-2.5 bg-purple-500/20 dark:bg-purple-400/15 rounded-full bottom-[15%] right-[15%]" />
        </motion.div>
      </div>

      {/* Crosshair grids */}
      <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-200/50 dark:via-neutral-800/20 to-transparent" />
      <div className="absolute top-[75%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-200/50 dark:via-neutral-800/20 to-transparent" />
      <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-neutral-200/50 dark:via-neutral-800/20 to-transparent" />
      <div className="absolute left-[80%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-neutral-200/50 dark:via-neutral-800/20 to-transparent" />

      {/* Geometric ticks / indicators */}
      <div className="absolute top-[20%] left-[20%] w-3 h-3 border-t border-l border-neutral-300/60 dark:border-neutral-700/30 translate-x-[-50%] translate-y-[-50%]" />
      <div className="absolute top-[20%] right-[20%] w-3 h-3 border-t border-r border-neutral-300/60 dark:border-neutral-700/30 translate-x-[50%] translate-y-[-50%]" />
      <div className="absolute bottom-[25%] left-[20%] w-3 h-3 border-b border-l border-neutral-300/60 dark:border-neutral-700/30 translate-x-[-50%] translate-y-[50%]" />
      <div className="absolute bottom-[25%] right-[20%] w-3 h-3 border-b border-r border-neutral-300/60 dark:border-neutral-700/30 translate-x-[50%] translate-y-[50%]" />

      {/* Floating high-tech coordinate tags */}
      <div className="absolute top-[18%] left-[22%] flex gap-2 items-center opacity-30 dark:opacity-50 text-[9px] text-neutral-450 dark:text-neutral-600 font-mono">
        <span className="w-1 h-1 rounded-full bg-blue-500" />
        <span>SYS.LOC // 20.31.02</span>
      </div>
      
      <div className="absolute bottom-[27%] right-[22%] flex gap-2 items-center opacity-30 dark:opacity-50 text-[9px] text-neutral-450 dark:text-neutral-600 font-mono">
        <span className="w-1 h-1 rounded-full bg-purple-500" />
        <span>GRID.SEC // RF-99</span>
      </div>
    </div>
  );
}
