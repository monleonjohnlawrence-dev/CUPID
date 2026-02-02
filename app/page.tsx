"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [sadGifIndex, setSadGifIndex] = useState(0);

  const sadGifs = [

    "https://media.tenor.com/QezgGvvyBWYAAAAi/peachcat-crying.gif",
    "https://media.tenor.com/cG5-wSuBxCsAAAAi/peach-cat.gif"
  ];

  const floatingGifs = [
    "https://media.tenor.com/dEN66mMlhB8AAAAi/i-love-you.gif",
    
  ];

  const moveButton = () => {
    if (typeof window !== 'undefined') {
      // Dynamic button size estimation
      const btnWidth = 120; 
      const btnHeight = 60;
      
      const maxX = window.innerWidth - btnWidth;
      const maxY = window.innerHeight - btnHeight;

      // Ensure button stays within visible bounds
      const newX = Math.max(10, Math.random() * maxX);
      const newY = Math.max(10, Math.random() * maxY);

      if (!isFixed) setIsFixed(true);
      setNoButtonPos({ x: newX, y: newY });
      setSadGifIndex((prev) => (prev + 1) % sadGifs.length);
    }
  };

  const handleYes = () => {
    setIsAccepted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f43f5e', '#fb7185']
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-900 font-sans overflow-hidden">
      
      {/* Celebration Layer */}
      <AnimatePresence>
        {isAccepted && (
          <div className="pointer-events-none absolute inset-0 z-0">
            {/* Floating Hearts Animation */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
                animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
                transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * i * 0.2 }}
                className="absolute text-pink-400"
              >
                <Heart fill="currentColor" size={Math.random() * 30 + 20} />
              </motion.div>
            ))}

            {/* Floating PeachCat GIFs */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`float-gif-${i}`}
                initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
                animate={{ y: "-20vh", opacity: [0, 1, 1, 0] }}
                transition={{ duration: Math.random() * 5 + 7, repeat: Infinity, delay: Math.random() * 5 }}
                className="absolute w-24 h-24"
              >
                <img 
                  src={floatingGifs[i % floatingGifs.length]} 
                  className="w-full h-full object-contain" 
                  alt="" 
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <main className="z-10 flex flex-col items-center gap-8 p-8 text-center">
        <AnimatePresence mode="wait">
          {!isAccepted ? (
            <motion.div 
              key="question" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.8 }} 
              className="flex flex-col items-center gap-6"
            >
              {/* Conditional Main GIF */}
              <div className="w-64 h-64 overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={isFixed ? sadGifs[sadGifIndex] : "https://media1.tenor.com/m/zRPXgiYCMIgAAAAC/love-you.gif"} 
                  alt="Valentine Cat" 
                  className="w-full h-full object-contain" 
                />
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Will you be my Valentine my Leanne?
              </h1>

              <div className="relative mt-4 flex items-center justify-center gap-4 w-full h-32">
                <button 
                  onClick={handleYes} 
                  className="z-10 flex h-14 items-center justify-center gap-2 rounded-full bg-pink-500 px-8 text-lg font-bold text-white transition-all hover:scale-110 active:scale-95 shadow-lg hover:bg-pink-400"
                >
                  YES! 
                </button>
                
                <motion.button
                  style={isFixed ? { position: 'fixed', top: 0, left: 0, zIndex: 50 } : { position: 'relative' }}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  onClick={moveButton}
                  className="flex h-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 px-8 text-lg font-medium text-zinc-300 shadow-sm hover:bg-zinc-700"
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="accepted" 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="flex flex-col items-center gap-6"
            >
              <div className="w-64 h-64 overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://media1.tenor.com/m/zJ0x_tBWdrEAAAAC/fofo-cute.gif" 
                  alt="Happy Valentine Cat" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <h1 className="text-5xl font-extrabold text-pink-400">YAY I KNEW IT!</h1>
              <p className="text-xl text-zinc-300">I LOVE YOU SO MUCH! HAPPY VALENTINE'S DAY! </p>
              
              <div className="flex gap-4 mt-4">
                <Heart className="fill-pink-500 text-pink-500 animate-bounce" size={32} />
                <Heart className="fill-pink-500 text-pink-500 animate-bounce delay-75" size={32} />
                <Heart className="fill-pink-500 text-pink-500 animate-bounce delay-150" size={32} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}