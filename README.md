# 🌍 GeoMind: The Interactive 3D Geographic Discovery Platform

GeoMind is a production-ready, interactive web application built with **React** that transforms geographic education into an engaging, gamified experience. Users act as "Explorers", tracking down hidden territories on a stunning 3D interactive globe through dynamic, programmatic hints.

## 🧠 Problem Statement

**Who is the user?** 
Students, geography enthusiasts, and trivia gamers looking for a highly visual and interactive way to learn about the globe.

**What problem are we solving?**
Traditional geographic education is static, text-heavy, and frankly boring. Standard map quizzes force users to memorize outlines or static 2D maps, leading to low retention and poor engagement. Furthermore, geography apps rarely teach users about the *cultures* or *demographics* of nations.

**Why does this problem matter?**
Global awareness is increasingly important. By gamifying data like population, currency, subregions, and languages into a 3D discovery puzzle, GeoMind turns rote memorization into active, analytical learning, massively boosting knowledge retention and user curiosity. 

---

## ✨ Features

- **Interactive 3D Globe Render:** Powered by `react-globe.gl` and `three.js`. Features smooth camera tracking, glowing geographic targets, drag-to-explore, and toggleable interactive country labels.
- **Dynamic Procedural Hints:** Instead of generic clues, the app dynamically analyzes live REST API data to generate non-obvious hints based on a region's population, currency name, subregion, and primary spoken languages.
- **Full Backend Integration (Serverless):** Completely powered by **Firebase**. Features robust, secure Authentication (Sign up, Log in, Password Reset) and Real-time persistent Firestore databases for user analytics and game state saving.
- **Dashboard & Analytics:** Keeps track of lifetime games played, win rate, and active win streaks locally and on the cloud.
- **Responsive & "Premium" Design Architecture:** Designed with sleek glassmorphism, responsive Tailwind utilities, Framer Motion staggered animations, and dynamic error banners—built for both Desktop and Mobile ecosystems.

---

## 🛠️ Tech Stack

**Frontend Architecture:**
- React 18 (Vite)
- Tailwind CSS (Utility-First Styling)
- Framer Motion (Page Transitions & Micro-animations)
- React Router DOM (Declarative Routing & Route Protection)

**Data & 3D Rendering:**
- `react-globe.gl` & `three` (WebGL 3D Rendering)
- REST Countries API (Dynamic Data Sourcing)
- Lucide React (Scalable SVG Icons)

**Backend as a Service (BaaS):**
- Firebase Auth (Authentication & Session Management)
- Firebase Firestore (NoSQL Database for User State & Analytics)

---

## 🏗️ Core React Concepts Demonstrated

- **Context API (`useContext`):** Completely decoupled global state management for the Game Logic (`GameContext.jsx`) and Authentication (`AuthContext.jsx`).
- **Hook Optimization (`useCallback` / `useEffect`):** Prevented memory leaks and unnecessary tree re-renders ensuring buttery-smooth 60FPS 3D WebGL performance.
- **Code Splitting & Lazy Loading (`Suspense`):** Implemented lazy loading for major page routes to reduce initial bundle size and speed up Time-To-Interactive.
- **Conditional Rendering & Route Protection:** Safe `ProtectedRoute` wrappers that seamlessly redirect unauthenticated users without breaking UI flow.

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/DevRitik19/Geomind.git
   cd geomind
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file at the root of the project with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open** `http://localhost:5173` **in your browser and start exploring!**
