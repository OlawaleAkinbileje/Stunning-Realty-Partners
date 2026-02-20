
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
// import GeminiAssistant from './components/GeminiAssistant';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Listings from './pages/Listings';
import PropertyDetails from './pages/PropertyDetails';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetails';
import { User } from './types';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('srp_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuth = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('srp_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('srp_user');
    }
  };

  const toggleFavorite = (propertyId: string) => {
    if (!currentUser) return;
    const newFavorites = currentUser.favorites.includes(propertyId)
      ? currentUser.favorites.filter(id => id !== propertyId)
      : [...currentUser.favorites, propertyId];
    
    const updatedUser = { ...currentUser, favorites: newFavorites };
    handleAuth(updatedUser);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header currentUser={currentUser} onLogout={() => handleAuth(null)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/listings" element={<Listings toggleFavorite={toggleFavorite} currentUser={currentUser} />} />
            <Route path="/property/:id" element={<PropertyDetails toggleFavorite={toggleFavorite} currentUser={currentUser} />} />
            <Route path="/auth" element={<Auth onAuth={handleAuth} />} />
            <Route path="/profile" element={<Profile currentUser={currentUser} onUpdateUser={handleAuth} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </main>
        <Footer />
        {/* <GeminiAssistant /> */}
      </div>
    </Router>
  );
};

export default App;
