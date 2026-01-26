import React, { useState, useEffect } from 'react';
import SearchBar from './components/Search/SearchBar';
import ResultCard from './components/Results/ResultCard';
import { searchPerson } from './services/api';
import { Sun, Moon, Linkedin, Facebook, Twitter, Search, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingOverlay from './components/UI/LoadingOverlay';

function App() {
  const [results, setResults] = useState({ linkedin: [], facebook: [], twitter: [] });
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [theme, setTheme] = useState('light');
  const [showAbout, setShowAbout] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Initialize theme
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearch = async (params) => {
    if (!params.query) return;
    setLoading(true);
    setSearched(true);
    setErrorMsg(null);

    // Reset results
    setResults({ linkedin: [], facebook: [], twitter: [] });

    try {
      const data = await searchPerson(params);

      // 🛡️ Basic Error Checking (Customize based on your API)
      if (data && data.message && data.message.includes('limit')) {
        throw new Error("API Limit Reached");
      }

      // Categorize results
      const categorized = {
        linkedin: data.filter(r => r.source === 'LinkedIn'),
        facebook: data.filter(r => r.source === 'Facebook'),
        twitter: data.filter(r => r.source === 'Twitter')
      };
      setResults(categorized);

    } catch (error) {
      console.error("Search failed:", error);

      // 🛠️ Friendly Error Messages
      if (error.message === "API Limit Reached") {
        setErrorMsg("⚠️ Search limit reached. Please try again tomorrow.");
      } else if (error.message === "Request Timeout") {
        setErrorMsg("🐢 Internet is too slow. The request timed out. Please try again.");
      } else if (error.message === "Network/CORS Error") {
        setErrorMsg("🌐 Connection failed. Please check your internet connection.");
      } else if (error.message === "Service Not Found (404)") {
        setErrorMsg("🚫 Search service is offline. Please check N8N workflow status.");
      } else {
        setErrorMsg("❌ An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-500 relative overflow-hidden">

      {/* Dynamic Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-primary/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" />
        <div className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-purple-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-pink-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="fixed w-full border-b border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-xl z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Search className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              PersonFinder
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAbout(true)}
              className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground transition-all duration-300 hover:rotate-12"
              title="About Project"
            >
              <Info className="w-5 h-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground transition-all duration-300 hover:rotate-12"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-20">

        <div className="mb-20 text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent drop-shadow-sm">
            Find anyone, anywhere.
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            Advanced OSINT intelligence across social networks. <br className="hidden md:block" />
            <span className="font-medium text-foreground">Fast. Accurate. Comprehensive.</span>
          </p>
          <div className="pt-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {/* Global Error Message */}
        {errorMsg && (
          <div className="max-w-md mx-auto mb-10 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center text-center animate-fade-in">
            {errorMsg}
          </div>
        )}

        {loading ? (
          <LoadingOverlay />
        ) : searched && !errorMsg && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
            {/* LinkedIn Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-primary/10">
                <div className="p-2 bg-blue-600/10 rounded-lg"><Linkedin className="w-5 h-5 text-blue-600" /></div>
                <h2 className="font-bold text-xl">LinkedIn</h2>
                <span className="text-xs font-bold bg-blue-600/10 text-blue-600 px-2.5 py-1 rounded-full ml-auto">{results.linkedin.length}</span>
              </div>
              <div className="flex flex-col gap-5">
                {results.linkedin.length > 0 ? results.linkedin.map((r, i) => <ResultCard key={i} result={r} />) : <div className="p-6 text-center border border-dashed border-border rounded-xl text-muted-foreground bg-card/30">No results found</div>}
              </div>
            </div>
            {/* Facebook Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-blue-500/10">
                <div className="p-2 bg-blue-500/10 rounded-lg"><Facebook className="w-5 h-5 text-blue-500" /></div>
                <h2 className="font-bold text-xl">Facebook</h2>
                <span className="text-xs font-bold bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-full ml-auto">{results.facebook.length}</span>
              </div>
              <div className="flex flex-col gap-5">
                {results.facebook.length > 0 ? results.facebook.map((r, i) => <ResultCard key={i} result={r} />) : <div className="p-6 text-center border border-dashed border-border rounded-xl text-muted-foreground bg-card/30">No results found</div>}
              </div>
            </div>
            {/* Twitter Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-sky-500/10">
                <div className="p-2 bg-sky-500/10 rounded-lg"><Twitter className="w-5 h-5 text-sky-500" /></div>
                <h2 className="font-bold text-xl">Twitter / X</h2>
                <span className="text-xs font-bold bg-sky-500/10 text-sky-500 px-2.5 py-1 rounded-full ml-auto">{results.twitter.length}</span>
              </div>
              <div className="flex flex-col gap-5">
                {results.twitter.length > 0 ? results.twitter.map((r, i) => <ResultCard key={i} result={r} />) : <div className="p-6 text-center border border-dashed border-border rounded-xl text-muted-foreground bg-card/30">No results found</div>}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* About Modal */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowAbout(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary/20 to-purple-600/20 z-0" />
              <button onClick={() => setShowAbout(false)} className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full z-20 transition-colors">
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 p-8 pt-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-tr from-primary to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-xl mx-auto mb-6 text-3xl font-bold">
                  P
                </div>
                <h2 className="text-2xl font-bold mb-2">FYP Project</h2>
                <p className="text-primary font-medium mb-6">University of Sindh, Batch 2k22-IT</p>

                <div className="bg-secondary/50 rounded-2xl p-6 text-left space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Group Members</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">A</div>
                      <span className="font-medium">Asadullah Jamali</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">W</div>
                      <span className="font-medium">Wajid Bhatti</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">A</div>
                      <span className="font-medium">Abdul Manan</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-xs text-muted-foreground">
                  © 2026 PersonFinder Project. All rights reserved.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
