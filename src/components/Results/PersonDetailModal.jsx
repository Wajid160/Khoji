import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, ExternalLink, Linkedin, Facebook, Twitter, Mail, Briefcase } from 'lucide-react';

const PersonDetailModal = ({ isOpen, onClose, person }) => {
    if (!isOpen || !person) return null;

    // Get icon based on source
    const getSourceIcon = (source) => {
        switch (source?.toLowerCase()) {
            case 'linkedin':
                return <Linkedin className="w-5 h-5 text-blue-600" />;
            case 'facebook':
                return <Facebook className="w-5 h-5 text-blue-500" />;
            case 'twitter':
                return <Twitter className="w-5 h-5 text-sky-500" />;
            default:
                return <User className="w-5 h-5" />;
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-card w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative max-h-[90vh] overflow-y-auto"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 rounded-full z-20 transition-colors backdrop-blur-sm"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Header Section with Gradient */}
                    <div className="relative bg-gradient-to-br from-primary/20 to-purple-600/20 p-8 pb-20">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card opacity-50" />

                        <div className="relative flex flex-col items-center text-center">
                            {/* Avatar */}
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-purple-600/30 flex items-center justify-center text-primary shadow-xl mb-4 border-4 border-white/20">
                                <User className="w-12 h-12" />
                            </div>

                            {/* Name */}
                            <h2 className="text-3xl font-bold mb-2">{person.name}</h2>

                            {/* Title/Position */}
                            {person.title && (
                                <div className="flex items-center gap-2 text-lg text-muted-foreground mb-3">
                                    <Briefcase className="w-5 h-5" />
                                    <p>{person.title}</p>
                                </div>
                            )}

                            {/* Source Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                {getSourceIcon(person.source)}
                                <span className="font-medium text-sm">{person.source}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 -mt-12 relative z-10">
                        {/* Info Cards */}
                        <div className="space-y-4">
                            {/* Location */}
                            {person.location && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-secondary/50 rounded-2xl p-5 border border-white/10"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <MapPin className="w-5 h-5 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-lg">Location</h3>
                                    </div>
                                    <p className="text-muted-foreground ml-11">{person.location}</p>
                                </motion.div>
                            )}

                            {/* Description */}
                            {person.description && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-secondary/50 rounded-2xl p-5 border border-white/10"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <User className="w-5 h-5 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-lg">About</h3>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed ml-11">{person.description}</p>
                                </motion.div>
                            )}

                            {/* Profile Link */}
                            {person.link && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-secondary/50 rounded-2xl p-5 border border-white/10"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <ExternalLink className="w-5 h-5 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-lg">Profile Link</h3>
                                    </div>
                                    <a
                                        href={person.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-11 text-primary hover:underline break-all text-sm"
                                    >
                                        {person.link}
                                    </a>
                                </motion.div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 flex gap-3"
                        >
                            <a
                                href={person.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-3 px-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                            >
                                <span>View Full Profile</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-secondary/50 hover:bg-secondary rounded-xl font-semibold transition-all border border-border"
                            >
                                Close
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PersonDetailModal;
