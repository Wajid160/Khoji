import React, { useState, useEffect } from 'react';
import SearchBar from './components/Search/SearchBar';
import ResultCard from './components/Results/ResultCard';
import PersonDetailModal from './components/Results/PersonDetailModal';
import LoginModal from './components/Auth/LoginModal';
import SignupModal from './components/Auth/SignupModal';
import { searchPerson } from './services/api';
import { Sun, Moon, Linkedin, Facebook, Twitter, Search, X, LogIn, UserPlus, LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingOverlay from './components/UI/LoadingOverlay';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, logout, isAuthenticated } = useAuth();
  const [results, setResults] = useState({ linkedin: [], facebook: [], twitter: [] });
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [theme, setTheme] = useState('light');

  const [errorMsg, setErrorMsg] = useState(null);

  // Modal states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showPersonDetail, setShowPersonDetail] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  // Handle person card click
  const handlePersonClick = (person) => {
    setSelectedPerson(person);
    setShowPersonDetail(true);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
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
              Khoji
            </span>
          </div>

          <div className="flex items-center space-x-3">


            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground transition-all duration-300 hover:rotate-12"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Auth Buttons or User Menu */}
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground transition-all duration-300 font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Up</span>
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline font-medium">{user?.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-white/10">
                        <p className="font-semibold truncate">{user?.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-20">

        {/* Hero Section with Background Image */}
        <div className="mb-20 text-center max-w-3xl mx-auto space-y-6 relative">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 -mx-6 -mt-10 -mb-20 rounded-3xl overflow-hidden"
            style={{ zIndex: -1 }}
          >
            {/* Actual Background Image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(/bkg_image.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            {/* Gradient Overlay - can adjust opacity here */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
          </div>
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
                {results.linkedin.length > 0 ? results.linkedin.map((r, i) => <ResultCard key={i} result={r} onClick={() => handlePersonClick(r)} />) : <div className="p-6 text-center border border-dashed border-border rounded-xl text-muted-foreground bg-card/30">No results found</div>}
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
                {results.facebook.length > 0 ? results.facebook.map((r, i) => <ResultCard key={i} result={r} onClick={() => handlePersonClick(r)} />) : <div className="p-6 text-center border border-dashed border-border rounded-xl text-muted-foreground bg-card/30">No results found</div>}
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
                {results.twitter.length > 0 ? results.twitter.map((r, i) => <ResultCard key={i} result={r} onClick={() => handlePersonClick(r)} />) : <div className="p-6 text-center border border-dashed border-border rounded-xl text-muted-foreground bg-card/30">No results found</div>}
              </div>
            </div>
          </div>
        )}
      </main>



      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />

      {/* Person Detail Modal */}
      <PersonDetailModal
        isOpen={showPersonDetail}
        onClose={() => setShowPersonDetail(false)}
        person={selectedPerson}
      />

    </div>
  );
}

export default App;
