import { createContext, useState, useEffect } from 'react';
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

  const startNewGame = (data = countries) => {
    const randomIdx = Math.floor(Math.random() * data.length);
    const selected = data[randomIdx];
    setTargetCountry(selected);
    setGuesses([]);
    setGameState('playing');
    setInitialHint(`This country is located in ${selected.region}.`);
  };

  const addGuess = async (guessItem) => {
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
  };

  const saveGameStats = async (isWin) => {
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
      alert("Database Synchronization Error: " + err.message);
    }
  };

  const value = {
    countries,
    targetCountry,
    loading,
    gameState,
    guesses,
    initialHint,
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
