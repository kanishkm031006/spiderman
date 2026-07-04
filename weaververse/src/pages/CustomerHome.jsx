import { useState } from 'react';
import Nav from '../components/Nav.jsx';
import ThreadProgress from '../components/ThreadProgress.jsx';
import Hero from '../components/Hero.jsx';
import StorySection from '../components/StorySection.jsx';
import PowersSection from '../components/PowersSection.jsx';
import BooksSection from '../components/BooksSection.jsx';

export default function CustomerHome() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const addToCart = (id) => {
    setCart((prev) => [...prev, id]);
  };

  return (
    <div className="bg-[var(--obsidian)] min-h-screen">
      <Nav wishlistCount={wishlist.length} cartCount={cart.length} />
      <ThreadProgress />
      <Hero />
      <StorySection />
      <PowersSection />
      <BooksSection wishlist={wishlist} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} />

      <footer className="py-10 px-6 border-t border-white/10 text-center">
        <p className="font-mono text-[10px] text-[var(--ash)] tracking-widest">WEAVERVERSE BOOK STORE · AN ORIGINAL SERIES · NOT AFFILIATED WITH ANY EXISTING COMIC PUBLISHER</p>
      </footer>
    </div>
  );
}
