import { db, auth } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Users, Building2, Map as MapIcon, Coins, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const CountryCard = ({ country, onNextGame }) => {
  if (!country) return null;

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-success/30 w-full max-w-sm mx-auto shrink-0 pb-2"
    >
      <div className="bg-gradient-to-br from-success/20 to-emerald-600/20 px-6 py-8 text-center relative border-b border-success/20">
        <div className="absolute top-4 right-4 bg-success/20 text-success rounded-full p-2 backdrop-blur-md border border-success/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="w-32 h-20 mx-auto rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] mb-4 border border-white/20 overflow-hidden bg-black/50">
          <img 
            src={country.flag} 
            alt={`${country.name} flag`} 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">{country.name}</h2>
        <p className="text-success-400 text-lg mt-1 font-medium tracking-wide opacity-80">{country.region}</p>
      </div>
      
      <div className="p-6">
        <h3 className="text-white font-bold text-lg mb-4 border-b border-white/10 pb-2 uppercase tracking-wider text-sm opacity-80 mt-2">Data Profile</h3>
        <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-8">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Capital</div>
              <div className="font-medium text-slate-100">{country.capital}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Population</div>
              <div className="font-medium text-slate-100">{country.population.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapIcon className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Region</div>
              <div className="font-medium text-slate-100">{country.region}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Coins className="w-5 h-5 text-secondary mt-0.5" />
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Currency</div>
              <div className="font-medium text-slate-100">
                {country.currencies && Object.keys(country.currencies).length > 0
                  ? Object.values(country.currencies)[0].name
                  : 'Classified'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            type="button"
            onClick={async () => {
              try {
                if (!auth.currentUser) {
                  return alert("You must be logged in to save favorites.");
                }
                
                await addDoc(collection(db, `users/${auth.currentUser.uid}/favorites`), {
                  countryId: country.id || `unknown-${Math.random()}`,
                  name: country.name || 'Unknown Location',
                  flag: country.flag || '',
                  note: "",
                  savedAt: new Date()
                });
                
                alert('Successfully saved to your Dashboard!');
              } catch (error) {
                console.error("Firebase DB Error:", error);
                alert(`Error saving: ${error.message}`);
              }
            }}
            className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Bookmark className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CountryCard;
