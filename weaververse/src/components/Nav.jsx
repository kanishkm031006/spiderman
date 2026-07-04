import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingBag, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext.jsx';

export default function Nav({ wishlistCount = 0, cartCount = 0 }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[var(--obsidian)]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/customer" className="font-display text-xl tracking-wide">
          SPIDER<span className="text-[var(--crimson)]">MAN</span>
        </Link>
        <nav className="hidden md:flex gap-8 font-mono text-xs tracking-widest text-[var(--ash)]">
          <a href="#story" className="hover:text-[var(--silk)] transition-colors">ORIGIN</a>
          <a href="#powers" className="hover:text-[var(--silk)] transition-colors">POWERS</a>
          <a href="#books" className="hover:text-[var(--silk)] transition-colors">CATALOG</a>
        </nav>
        <div className="flex items-center gap-5">
          <button className="relative text-[var(--silk)]/80 hover:text-[var(--crimson)] transition-colors">
            <FaHeart />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] bg-[var(--crimson)] rounded-full w-4 h-4 flex items-center justify-center">{wishlistCount}</span>
            )}
          </button>
          <button className="relative text-[var(--silk)]/80 hover:text-[var(--cyan)] transition-colors">
            <FaShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] bg-[var(--cyan)] text-black rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-4 border-l border-white/10 pl-4">
              <span className="font-mono text-xs text-[var(--silk)] flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <FaUser className={user.role === 'shopkeeper' ? 'text-[var(--crimson)]' : 'text-[var(--cyan)]'} />
                <span className="max-w-[100px] truncate">{user.username}</span>
                <span className="text-[8px] font-mono opacity-60 bg-white/10 px-1 rounded uppercase">{user.role}</span>
              </span>
              <button 
                onClick={logout} 
                className="text-[var(--ash)] hover:text-[var(--crimson)] transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
                title="Log Out"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="flex items-center border-l border-white/10 pl-4">
              <Link 
                to="/login" 
                className="font-mono text-xs text-[var(--silk)] hover:text-[var(--cyan)] border border-white/15 hover:border-[var(--cyan)] px-4 py-1.5 rounded-full transition-all"
              >
                SIGN IN
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

