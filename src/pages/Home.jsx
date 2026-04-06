import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto text-center py-8 sm:py-16 px-2">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 sm:mb-6 transition-colors leading-tight">
        Master Geography with <span className="text-primary">GeoGuesser</span>
      </h1>
      <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto transition-colors">
        Test your knowledge of countries around the world. Guess the secret country using distance and direction hints in our interactive gamified learning platform.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-16">
        <div className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
          <div className="w-12 h-12 bg-blue-100 dark:bg-slate-900 text-blue-600 dark:text-primary rounded-xl flex items-center justify-center mb-4 mx-auto text-2xl font-bold transition-colors">1</div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 transition-colors">Guess a Country</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base transition-colors">Type in any country name to start narrowing down your options.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
          <div className="w-12 h-12 bg-green-100 dark:bg-slate-900 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-4 mx-auto text-2xl font-bold transition-colors">2</div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 transition-colors">Analyze Hints</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base transition-colors">Use the distance and compass direction given after each guess to locate the target.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-slate-900 text-yellow-600 dark:text-yellow-400 rounded-xl flex items-center justify-center mb-4 mx-auto text-2xl font-bold transition-colors">3</div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 transition-colors">Learn & Track</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base transition-colors">Discover new facts about countries you win and track your progress over time.</p>
        </div>
      </div>

      <Link
        to="/game"
        className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-lg text-base sm:text-lg"
      >
        Start Playing →
      </Link>
    </div>
  )
}

export default Home;

