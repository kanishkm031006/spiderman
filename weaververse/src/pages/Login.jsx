import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaMask, FaSpider, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('customer'); // 'customer' or 'shopkeeper'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, isAuthenticated, login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect immediately to their portal
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'shopkeeper' ? '/shopkeeper' : '/customer', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Redirect path
  const from = location.state?.from?.pathname || (role === 'shopkeeper' ? '/shopkeeper' : '/customer');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login(usernameOrEmail, password);
        navigate(from, { replace: true });
      } else {
        await register(username, email, password, role);
        navigate(role === 'shopkeeper' ? '/shopkeeper' : '/customer');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--obsidian)] text-[var(--silk)] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Dynamic Animated Webs Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="20%" stroke="var(--crimson)" strokeWidth="1" fill="none" strokeDasharray="5,5" />
          <circle cx="50%" cy="50%" r="40%" stroke="var(--cyan)" strokeWidth="1" fill="none" strokeDasharray="5,5" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--crimson)" strokeWidth="0.5" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--cyan)" strokeWidth="0.5" />
          <line x1="15%" y1="15%" x2="85%" y2="85%" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
          <line x1="85%" y1="15%" x2="15%" y2="85%" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
        </svg>
      </div>

      {/* Floating back button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 font-mono text-xs text-[var(--ash)] hover:text-[var(--silk)] transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-full"
      >
        <FaArrowLeft /> HOME
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md bg-[var(--carbon)]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 z-10 shadow-2xl relative"
      >
        {/* Glow Effects */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--crimson)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--cyan)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--crimson)]/20 border border-[var(--crimson)]/40 text-[var(--crimson)] text-2xl mb-4 animate-pulse">
            <FaSpider />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl tracking-wide uppercase">
            SPIDER<span className="text-[var(--cyan)]">MAN</span> ARCADE
          </h2>
          <p className="text-[var(--ash)] text-xs font-mono mt-2 uppercase tracking-widest">
            {isLogin ? 'Sign in to access your comics' : 'Create an account to join the web'}
          </p>
        </div>

        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-5 p-3 rounded-lg bg-[var(--crimson)]/20 border border-[var(--crimson)]/40 text-xs font-mono text-[var(--silk)]"
          >
            {errorMsg}
          </motion.div>
        )}

        {/* Auth Mode Toggle */}
        <div className="grid grid-cols-2 bg-black/40 p-1 rounded-xl mb-6 border border-white/5">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setErrorMsg(''); }}
            className={`py-2 text-xs font-mono rounded-lg transition-all ${isLogin ? 'bg-[var(--crimson)] text-white shadow' : 'text-[var(--ash)] hover:text-white'}`}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setErrorMsg(''); }}
            className={`py-2 text-xs font-mono rounded-lg transition-all ${!isLogin ? 'bg-[var(--crimson)] text-white shadow' : 'text-[var(--ash)] hover:text-white'}`}
          >
            REGISTER
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {!isLogin ? (
              <motion.div
                key="register-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {/* Username */}
                <div>
                  <label className="block text-[10px] font-mono text-[var(--ash)] uppercase tracking-wider mb-1">Username</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[var(--ash)]">
                      <FaUser size={13} />
                    </span>
                    <input
                      type="text"
                      required={!isLogin}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="peterparker"
                      className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[var(--cyan)] transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-mono text-[var(--ash)] uppercase tracking-wider mb-1">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[var(--ash)]">
                      <FaEnvelope size={13} />
                    </span>
                    <input
                      type="email"
                      required={!isLogin}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="peter.parker@dailybugle.com"
                      className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[var(--cyan)] transition-colors font-mono"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {/* Username or Email */}
                <div>
                  <label className="block text-[10px] font-mono text-[var(--ash)] uppercase tracking-wider mb-1">Username or Email</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[var(--ash)]">
                      <FaUser size={13} />
                    </span>
                    <input
                      type="text"
                      required={isLogin}
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      placeholder="peterparker or email"
                      className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[var(--cyan)] transition-colors font-mono"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-mono text-[var(--ash)] uppercase tracking-wider mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[var(--ash)]">
                <FaLock size={13} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[var(--cyan)] transition-colors font-mono"
              />
            </div>
          </div>

          {/* Role selector (Only for register or always visible, let's keep it visible so they choose what they log in as, or select role on signup) */}
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-mono text-[var(--ash)] uppercase tracking-wider mb-1.5">Select Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`py-2 px-3 border rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-all ${role === 'customer' ? 'border-[var(--cyan)] bg-[var(--cyan)]/10 text-[var(--cyan)]' : 'border-white/10 text-[var(--ash)] hover:bg-white/5'}`}
                >
                  <FaMask /> CUSTOMER
                </button>
                <button
                  type="button"
                  onClick={() => setRole('shopkeeper')}
                  className={`py-2 px-3 border rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-all ${role === 'shopkeeper' ? 'border-[var(--crimson)] bg-[var(--crimson)]/10 text-[var(--crimson)]' : 'border-white/10 text-[var(--ash)] hover:bg-white/5'}`}
                >
                  <FaSpider /> SHOPKEEPER
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[var(--crimson)] hover:bg-[var(--crimson-dim)] disabled:bg-white/10 disabled:text-[var(--ash)] rounded-xl font-mono text-sm tracking-widest text-white shadow-lg transition-colors mt-6 uppercase flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'PULLING THREADS...' : (isLogin ? 'ENTER ARCADE' : 'JOIN THE WEB')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
