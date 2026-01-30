"use client";

import React from "react";
import { motion } from "framer-motion";
import { Fingerprint } from "lucide-react";
import type { ClayGridFeature } from "@/types";

/**
 * ClayGrid — display only. All cards are defined in clayGridConstants.tsx.
 * To add, remove, or edit grid items, edit only clayGridConstants.tsx.
 */
interface ClayGridProps {
  content: Omit<ClayGridFeature, "source">[];
  backgroundColor?: string;
  mergeWithBackground?: boolean;
}

const ClayGrid: React.FC<ClayGridProps> = ({
  content,
  backgroundColor = "#0a0a0a",
  mergeWithBackground = true,
}) => {

  const cardBg = mergeWithBackground ? "#0a0a0a" : backgroundColor;
  const isDark = cardBg === "#0a0a0a" || cardBg === "#000000";
  const cardShadow = isDark ? "20px 20px 60px #000000, -20px -20px 60px #1a1a1a" : "20px 20px 60px #bec3c9, -20px -20px 60px #ffffff";
  const insetShadow = isDark ? "inset 10px 10px 20px #000000, inset -10px -10px 20px #1a1a1a" : "inset 10px 10px 20px #bec3c9, inset -10px -10px 20px #ffffff";

  return (
    <div
      className={mergeWithBackground ? "py-12 md:py-16" : "min-h-screen p-8 md:p-16"}
      style={mergeWithBackground ? undefined : { backgroundColor }}
    >
      {/* Mobile: horizontal scroll — fixed height, swipe through cards. Desktop: 3-col grid. */}
      <div
        className="flex md:grid overflow-x-auto md:overflow-visible snap-x md:snap-none snap-mandatory gap-4 md:gap-12 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto md:grid-cols-3 md:grid-auto-rows-[minmax(260px,1fr)] [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {content.slice(0, 9).map((item, i) => {
          const isLarge = item.span?.includes("col-span-2");
          return (
          <motion.div
            key={item.id ?? i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className={`flex-shrink-0 snap-center rounded-[3rem] p-3
              ${isLarge ? "md:col-span-2" : ""}
              md:min-h-0 md:w-auto md:h-full
              ${isLarge
                ? "w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] aspect-video h-auto min-h-[180px] md:aspect-auto md:min-h-0 md:max-w-none"
                : "h-[75vh] w-[42vh] min-h-[320px] min-w-[180px] md:min-h-0 md:min-w-0"}`}
            style={{ backgroundColor: cardBg, boxShadow: cardShadow }}
          >
            <div className="w-full h-full min-h-0 rounded-[2.5rem] overflow-hidden relative group cursor-pointer">
              {item.type === "img" ? (
                <>
                  <motion.img
                    src={item.src}
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </>
              ) : (
                <div className="h-full flex items-center justify-center p-8 min-h-[120px]" style={{ backgroundColor: cardBg, boxShadow: insetShadow }}>
                  <span className={`font-serif italic text-2xl ${isDark ? "text-stone-400" : "text-slate-500"}`}>{item.text}</span>
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className={`absolute top-6 right-6 backdrop-blur-md p-3 rounded-full shadow-lg ${isDark ? "bg-white/10 text-stone-300" : "bg-white/50 text-slate-700"}`}
              >
                <Fingerprint size={20} />
              </motion.div>
            </div>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ClayGrid;
