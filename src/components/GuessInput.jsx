import { useState, useContext, useEffect, useRef } from 'react';
import { GameContext } from '../context/GameContext';
import { calculateDistance, calculateDirection } from '../utils/geometry';
import { Search, Send } from 'lucide-react';

const GuessInput = () => {
  const { countries, targetCountry, addGuess, gameState } = useContext(GameContext);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    
    if (val.length > 0) {
      const filtered = countries.filter(c => 
        c.name.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const submitGuess = (countryObj) => {
    if (gameState !== 'playing') return;
    
    const distance = calculateDistance(countryObj.lat, countryObj.lng, targetCountry.lat, targetCountry.lng);
    const direction = calculateDirection(countryObj.lat, countryObj.lng, targetCountry.lat, targetCountry.lng);

    addGuess({
      ...countryObj,
      distance,
      direction
    });

    setInput('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0 && gameState === 'playing') {
      submitGuess(suggestions[0]);
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative flex items-center group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={gameState !== 'playing'}
          placeholder={gameState === 'playing' ? "Enter coordinates..." : "Scan completed"}
          className="w-full pl-12 pr-12 py-4 bg-slate-900/50 border border-white/10 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-slate-900/20 disabled:border-transparent disabled:cursor-not-allowed transition-all text-lg text-white placeholder-slate-500 backdrop-blur-md font-mono"
        />
        <button 
          onClick={() => {
            if (suggestions.length > 0) submitGuess(suggestions[0]);
          }}
          disabled={gameState !== 'playing' || input.length === 0}
          className="absolute right-2 px-3 py-2 bg-primary/20 text-primary border border-primary/30 font-medium rounded-xl hover:bg-primary hover:text-white disabled:opacity-0 transition-all flex items-center justify-center transform group-focus-within:scale-100"
          aria-label="Submit Guess"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-h-60 overflow-auto divide-y divide-white/5 custom-scrollbar">
          {suggestions.map((country, index) => (
            <li
              key={country.id}
              onClick={() => submitGuess(country)}
              className={`px-4 py-3 hover:bg-slate-700/50 cursor-pointer flex items-center gap-4 transition-colors ${index === 0 ? 'bg-slate-700/30' : ''}`}
            >
              <div className="w-8 h-6 rounded overflow-hidden shadow-sm border border-black/20 shrink-0">
                 <img src={country.flag} alt={`${country.name} flag`} className="w-full h-full object-cover" />
              </div>
              <span className="font-medium text-slate-200 tracking-wide">{country.name}</span>
              {index === 0 && (
                <span className="ml-auto text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded-md font-mono">&crarr; Enter</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuessInput;
