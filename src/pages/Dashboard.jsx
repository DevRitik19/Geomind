import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../services/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Trash2, Edit2, Check, X } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [stats, setStats] = useState({ gamesPlayed: 0, wins: 0, streak: 0 });
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");

  useEffect(() => {
    if (!user) return;
    
    // Listen to Favorites
    const qFavs = query(collection(db, `users/${user.uid}/favorites`), orderBy("savedAt", "desc"));
    const unsubFavs = onSnapshot(qFavs, (snapshot) => {
      const favs = [];
      snapshot.forEach((d) => favs.push({ ...d.data(), docId: d.id }));
      setFavorites(favs);
    }, (error) => {
      console.error("Snapshot Error (Favs):", error);
      if(favorites.length === 0) alert("Dashboard Sync Error: " + error.message);
    });

    // Listen to Base User Stats
    const userRef = doc(db, "users", user.uid);
    const unsubStats = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStats({
          gamesPlayed: data.gamesPlayed || 0,
          wins: data.wins || 0,
          streak: data.streak || 0
        });
      }
    }, (error) => {
      console.error("Snapshot Error (Stats):", error);
    });

    return () => {
      unsubFavs();
      unsubStats();
    };
  }, [user]);

  const handleDelete = async (docId) => {
    if (window.confirm("Remove this country from favorites?")) {
      await deleteDoc(doc(db, `users/${user.uid}/favorites`, docId));
    }
  };

  const handleEdit = (fav) => {
    setEditingId(fav.docId);
    setEditNote(fav.note || "");
  };

  const saveEdit = async (docId) => {
    await updateDoc(doc(db, `users/${user.uid}/favorites`, docId), {
      note: editNote
    });
    setEditingId(null);
  };

  const accuracy = stats.gamesPlayed > 0 ? Math.round((stats.wins / stats.gamesPlayed) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto py-5 sm:py-8 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-8 transition-colors">Dashboard</h1>
      
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 mb-5 sm:mb-8 transition-colors">
        <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-white">Welcome, {user?.displayName || 'Explorer'}!</h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Here you can see your progress, streaks, and favorite countries.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-10">
        <div className="bg-blue-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 p-4 rounded-xl transition-colors">
          <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Total Games</div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.gamesPlayed}</div>
        </div>
        <div className="bg-green-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 p-4 rounded-xl transition-colors">
          <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">Accuracy</div>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">{accuracy}%</div>
        </div>
        <div className="bg-orange-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 p-4 rounded-xl transition-colors">
          <div className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-1">Current Streak</div>
          <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{stats.streak}</div>
        </div>
        <div className="bg-purple-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 p-4 rounded-xl transition-colors">
          <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">Saved Countries</div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{favorites.length}</div>
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 transition-colors">Your Favorites & Notes</h3>
      
      {favorites.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-slate-800 text-yellow-800 dark:text-yellow-400 p-6 rounded-xl border border-yellow-200 dark:border-yellow-700 transition-colors">
          You haven't saved any countries yet. Win a round and save a country to see it here!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {favorites.map(fav => (
            <div key={fav.docId} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-left p-5 rounded-2xl shadow-sm flex flex-col relative w-full transition-colors">
              <button onClick={() => handleDelete(fav.docId)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors focus:outline-none">
                <Trash2 className="w-5 h-5"/>
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <img src={fav.flag} alt={`${fav.name} flag`} className="w-16 h-10 object-cover rounded shadow-sm border border-gray-100 dark:border-slate-700" />
                <h4 className="font-bold text-xl text-gray-900 dark:text-white">{fav.name}</h4>
              </div>

              {editingId === fav.docId ? (
                <div className="mt-2 text-left">
                  <textarea 
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    className="w-full text-sm p-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-primary outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                    rows={3}
                    placeholder="Write a note to remember..."
                  ></textarea>
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={() => setEditingId(null)} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
                      <X className="w-4 h-4"/>
                    </button>
                    <button onClick={() => saveEdit(fav.docId)} className="p-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
                      <Check className="w-4 h-4"/>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-left bg-gray-50 dark:bg-slate-900/50 border border-transparent dark:border-slate-700/50 p-4 rounded-xl flex justify-between items-start group transition-colors">
                  <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-wrap">{fav.note || <span className="italic text-gray-400 dark:text-gray-500">No notes added. Click to add.</span>}</p>
                  <button onClick={() => handleEdit(fav)} className="text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 hover:text-primary dark:hover:text-primary transition-opacity focus:outline-none">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
