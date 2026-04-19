import { createContext, useState, useEffect, useCallback } from 'react';
import { fetchCountries } from '../services/api';
import { auth, db } from '../services/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [targetCountry, setTargetCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  // Stats / state
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [guesses, setGuesses] = useState([]);
  const [initialHint, setInitialHint] = useState("");
  const [error, setError] = useState(null);
  const MAX_GUESSES = 6;

  useEffect(() => {
    const loadCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
      if (data.length > 0) {
        // Pick random target
        startNewGame(data);
      }
      setLoading(false);
    };
    loadCountries();
  }, []);

  const startNewGame = useCallback((data = countries) => {
    const randomIdx = Math.floor(Math.random() * data.length);
    const selected = data[randomIdx];
    setTargetCountry(selected);
    setGuesses([]);
    setGameState('playing');
    
    const hints = [
      `It has a population of roughly ${(selected.population / 1000000).toFixed(1)} million people.`,
      selected.subregion && selected.subregion !== 'Unknown' ? `This territory is located in the ${selected.subregion} subregion.` : null,
      selected.languages && Object.keys(selected.languages).length > 0 ? `A major language spoken here is ${Object.values(selected.languages)[0]}.` : null,
      selected.currencies && Object.keys(selected.currencies).length > 0 ? `The local currency is the ${Object.values(selected.currencies)[0].name}.` : null
    ].filter(Boolean);
    
    // Fallback if somehow empty
    if (hints.length === 0) hints.push(`It is a fascinating place to explore.`);
    
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    setInitialHint(`Located in ${selected.region}. ${randomHint}`);
    setError(null);
  }, [countries]);

  const saveGameStats = useCallback(async (isWin) => {
    try {
      if (!auth.currentUser) {
        console.error("No active user to save stats to.");
        return;
      }
      
      const userRef = doc(db, "users", auth.currentUser.uid);
      
      const updateData = {
        gamesPlayed: increment(1)
      };
      
      if (isWin) {
        updateData.wins = increment(1);
        updateData.streak = increment(1);
      } else {
        updateData.streak = 0;
      }

      await setDoc(userRef, updateData, { merge: true });
      console.log("Analytics saved effectively.");
    } catch (err) {
      console.error("Failed to save analytics:", err);
      setError("Database Synchronization Error: " + err.message);
      setTimeout(() => setError(null), 5000);
    }
  }, []);

  const addGuess = useCallback(async (guessItem) => {
    if (gameState !== 'playing') return;
    
    const newGuesses = [...guesses, guessItem];
    setGuesses(newGuesses);

    let finalState = 'playing';
    if (guessItem.id === targetCountry.id) {
      finalState = 'won';
    } else if (newGuesses.length >= MAX_GUESSES) {
      finalState = 'lost';
    }
    
    if(finalState !== 'playing') {
      setGameState(finalState);
      await saveGameStats(finalState === 'won');
    }
  }, [gameState, guesses, targetCountry, saveGameStats]);

  const value = {
    countries,
    targetCountry,
    loading,
    gameState,
    guesses,
    initialHint,
    error,
    MAX_GUESSES,
    addGuess,
    startNewGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
