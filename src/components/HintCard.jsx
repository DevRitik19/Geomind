import { ArrowUp, ArrowUpRight, ArrowRight, ArrowDownRight, ArrowDown, ArrowDownLeft, ArrowLeft, ArrowUpLeft, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const getDirectionIcon = (direction) => {
  const props = { className: "w-5 h-5 md:w-6 md:h-6 drop-shadow-md" };
  switch (direction) {
    case 'N': return <ArrowUp {...props} />;
    case 'NE': return <ArrowUpRight {...props} />;
    case 'E': return <ArrowRight {...props} />;
    case 'SE': return <ArrowDownRight {...props} />;
    case 'S': return <ArrowDown {...props} />;
    case 'SW': return <ArrowDownLeft {...props} />;
    case 'W': return <ArrowLeft {...props} />;
    case 'NW': return <ArrowUpLeft {...props} />;
    default: return <MapPin {...props} />;
  }
};

const HintCard = ({ guess, index = 0 }) => {
  const { name, distance, direction, flag } = guess;
  
  let containerClass = "bg-accent/10 border-accent/20 text-slate-200";
  let iconClass = "bg-accent/20 text-accent border border-accent/30 shadow-[0_0_10px_rgba(244,63,94,0.3)]";
  
  if (distance === 0) {
    containerClass = "bg-success/20 border-success/40 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]";
    iconClass = "bg-success/30 text-success border border-success/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]";
  } else if (distance < 1000) {
    containerClass = "bg-success/10 border-success/20 text-slate-100";
    iconClass = "bg-success/20 text-success border border-success/30 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
  } else if (distance < 3000) {
    containerClass = "bg-warning/10 border-warning/20 text-slate-200";
    iconClass = "bg-warning/20 text-warning border border-warning/30 shadow-[0_0_10px_rgba(245,158,11,0.3)]";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`p-3 md:p-4 rounded-xl border flex items-center justify-between backdrop-blur-md ${containerClass}`}
    >
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-8 h-6 md:w-10 md:h-7 rounded overflow-hidden shadow-md border border-white/10 shrink-0">
           <img src={flag} alt="flag" className="w-full h-full object-cover" />
        </div>
        <span className="font-bold text-base md:text-lg tracking-wide">{name}</span>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-1 font-mono font-semibold text-sm md:text-base opacity-90">
          {distance.toLocaleString()} km
        </div>
        
        {distance > 0 ? (
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${iconClass}`}>
            {getDirectionIcon(direction)}
          </div>
        ) : (
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 animate-pulse ${iconClass}`}>
             <MapPin className="w-5 h-5 md:w-6 md:h-6 drop-shadow-md" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HintCard;
