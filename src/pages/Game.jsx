import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import GuessInput from '../components/GuessInput';
import HintCard from '../components/HintCard';
import CountryCard from '../components/CountryCard';
import GlobeMap from '../components/GlobeMap';
import { Globe2, RefreshCw, Lightbulb, Target } from 'lucide-react';

const Game = () => {
  const { 
    countries,
    loading, 
    gameState, 
    guesses, 
    initialHint,
    MAX_GUESSES, 
    targetCountry, 
    startNewGame 
  } = useContext(GameContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto w-full relative h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-6 md:gap-8"
    >
      
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 max-w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Main Content Area: 3D GLOBE */}
      <div className="lg:w-2/3 h-full flex flex-col relative order-2 lg:order-1">
        
        {/* Game Title Dropdown */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glassmorphism rounded-2xl p-4 mb-4 flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 neon-text-blue">
              <Globe2 className="w-6 h-6 text-primary" />
              GeoMind Explorer
            </h1>
            <p className="text-sm text-slate-300 ml-8 font-light">Locate the hidden territory</p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-xl border border-white/5">
            <Target className="w-5 h-5 text-accent" />
            <span className="text-xl font-bold">
              <span className="text-white">{guesses.length}</span>
              <span className="text-slate-500"> / {MAX_GUESSES}</span>
            </span>
          </div>
        </motion.div>

        {/* The 3D Globe */}
        <div className="flex-1 relative w-full h-full min-h-[400px]">
           <GlobeMap countries={countries} guesses={guesses} targetCountry={targetCountry} gameState={gameState} />
        </div>

        {/* Hint Layer at the Top - Floats over Globe on Mobile */}
        {gameState === 'playing' && initialHint && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 w-11/12 max-w-md glassmorphism border border-primary/30 p-3 rounded-2xl flex items-center justify-center gap-3 shadow-lg z-20 neon-shadow-blue"
          >
            <Lightbulb className="w-5 h-5 text-primary" />
            <span className="font-medium text-slate-200 tracking-wide text-center">{initialHint}</span>
          </motion.div>
        )}

      </div>

      {/* Sidebar: Guessing & History */}
      <div className="lg:w-1/3 flex flex-col gap-4 h-full order-1 lg:order-2">
         {gameState === 'playing' ? (
           <motion.div 
             initial={{ x: 20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             className="glassmorphism rounded-3xl p-6 flex flex-col h-full border border-white/10"
           >
             <div className="mb-6">
                <GuessInput />
             </div>
             
             <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                <AnimatePresence>
                  {guesses.map((guess, idx) => (
                    <HintCard key={idx} guess={guess} index={idx} />
                  ))}
                  
                  {/* Empty Placeholders */}
                  {Array.from({ length: MAX_GUESSES - guesses.length }).map((_, i) => (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={`empty-${i}`} 
                      className="bg-slate-800/30 border border-slate-700/50 rounded-xl h-[74px] flex items-center justify-center text-slate-500/50 backdrop-blur-sm"
                    >
                      <span className="font-medium text-sm tracking-wider uppercase">Signal {guesses.length + i + 1}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
             </div>
           </motion.div>
         ) : (
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="glassmorphism rounded-3xl p-6 h-full flex flex-col items-center text-center justify-start border-white/20 overflow-y-auto custom-scrollbar"
           >
              {gameState === 'won' ? (
                <div className="mb-8 p-6 bg-success/10 border border-success/30 rounded-2xl w-full">
                  <h2 className="text-3xl font-bold text-success mb-2 drop-shadow-md">Verified!</h2>
                  <p className="text-slate-300">Target localized successfully.</p>
                </div>
              ) : (
                <div className="mb-8 p-6 bg-accent/10 border border-accent/30 rounded-2xl w-full">
                  <h2 className="text-3xl font-bold text-accent mb-2 drop-shadow-md">Signal Lost</h2>
                  <p className="text-slate-300">Out of tracking attempts.</p>
                  <p className="mt-2 text-sm text-slate-400">Target was: <strong className="text-white">{targetCountry.name}</strong></p>
                </div>
              )}

              {/* Show the country card data */}
              {gameState === 'won' && <CountryCard country={targetCountry} onNextGame={() => startNewGame()} />}

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startNewGame()}
                className="mt-8 w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 neon-shadow-blue"
              >
                <RefreshCw className="w-5 h-5" /> RE-SCAN SECTOR
              </motion.button>
           </motion.div>
         )}
      </div>

    </motion.div>
  );
};

export default Game;
