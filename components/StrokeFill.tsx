import React from "react";
import { motion } from "framer-motion";

export const StrokeFill = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-zinc-950 overflow-hidden">
            <svg viewBox="0 0 800 200" className="w-full max-w-4xl h-auto">
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="1.5"
                    className="font-[900] text-8xl uppercase tracking-widest stroke-zinc-100 fill-transparent"
                    initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                    animate={{
                        strokeDashoffset: 0,
                        fill: "#ffffff",
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        fill: { delay: 2, duration: 1, ease: "easeIn" },
                    }}
                >
                    Who is Al-Saad
                </motion.text>
            </svg>
        </div>
    );
};
