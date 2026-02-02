import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, User, MapPin } from 'lucide-react';

const ResultCard = ({ result, onClick }) => {
    const { name, title, link, description, location } = result;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            className="group relative h-full bg-card/60 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
        >
            {/* Gradient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Header Section */}
            <div className="relative flex items-start space-x-4 z-10">
                <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/10">
                        <User className="w-7 h-7" />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground leading-tight truncate group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    <p className="text-sm text-primary font-medium truncate mt-1">
                        {title}
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative flex-1 mt-4 z-10">
                {location && (
                    <div className="flex items-center text-xs text-muted-foreground mb-3 font-medium">
                        <MapPin className="w-3.5 h-3.5 mr-1.5" />
                        {location}
                    </div>
                )}

                <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-3">
                    {description || "No detailed description available."}
                </p>
            </div>

            {/* Footer Action */}
            <div className="relative mt-5 z-10 pt-4 border-t border-white/10 dark:border-white/5">
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl font-semibold text-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20"
                >
                    <span>View Profile</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                </a>
            </div>
        </motion.div>
    );
};

export default ResultCard;
