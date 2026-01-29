"use client";

import React from "react";
import { motion } from "framer-motion";
import { Fingerprint } from "lucide-react";

interface ContentItem {
    id?: string;
    type: "img" | "text";
    src?: string;
    title?: string;
    text?: string;
    span?: string;
}

interface ClayGridProps {
    images?: string[];
    content?: ContentItem[];
    backgroundColor?: string;
    /** When true, outer wrapper has no background and no min-height so it merges with the page */
    mergeWithBackground?: boolean;
}

const ClayGrid: React.FC<ClayGridProps> = ({
    images = [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1000&auto=format&fit=crop",
    ],
    content,
    backgroundColor = "#0a0a0a",
    mergeWithBackground = true,
}) => {
    const defaultContent: ContentItem[] = content || [
        { type: "img", src: images[0], span: "col-span-1 row-span-1" },
        { type: "text", title: "RAW DATA", text: "Visualizing the unseen currents.", span: "col-span-1 row-span-1" },
        { type: "img", src: images[1], span: "col-span-1 row-span-2" },
        { type: "img", src: images[2], span: "col-span-2 row-span-1" },
        { type: "text", title: "SYSTEM", text: "Architecture of the mind.", span: "col-span-1 row-span-1" },
        { type: "img", src: images[3], span: "col-span-1 row-span-1" },
        { type: "img", src: images[7], span: "col-span-1 row-span-1" },
        { type: "img", src: images[4], span: "col-span-1 row-span-2" },
        { type: "img", src: images[5], span: "col-span-2 row-span-2" },
        { type: "img", src: images[6], span: "col-span-1 row-span-1" },
    ];

    const cardBg = mergeWithBackground ? "#0a0a0a" : backgroundColor;
    const isDark = cardBg === "#0a0a0a" || cardBg === "#000000";
    const cardShadow = isDark ? "20px 20px 60px #000000, -20px -20px 60px #1a1a1a" : "20px 20px 60px #bec3c9, -20px -20px 60px #ffffff";
    const insetShadow = isDark ? "inset 10px 10px 20px #000000, inset -10px -10px 20px #1a1a1a" : "inset 10px 10px 20px #bec3c9, inset -10px -10px 20px #ffffff";

    return (
        <div
            className={mergeWithBackground ? "py-12 md:py-16" : "min-h-screen p-8 md:p-16"}
            style={mergeWithBackground ? undefined : { backgroundColor }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
                {defaultContent.slice(0, 8).map((item, i) => (
                    <motion.div
                        key={item.id ?? i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                        className={`rounded-[3rem] p-3 ${item.span?.includes("col-span-2") ? "md:col-span-2" : ""}`}
                        style={{ backgroundColor: cardBg, boxShadow: cardShadow }}
                    >
                        <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative group cursor-pointer">
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
                ))}
            </div>
        </div>
    );
};

export default ClayGrid;
