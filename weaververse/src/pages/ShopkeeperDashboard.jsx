import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaDatabase, FaUsers, FaClock, FaUser, FaPlus, FaTrash, FaBook } from 'react-icons/fa';
import { SERIES } from '../data/books.js';

const SERIES_MAP = {
  af15: 'Amazing Fantasy',
  asm_classic: 'Amazing Spider-Man Vol. 1',
  usm: 'Ultimate Spider-Man',
  sv: 'Spider-Verse',
};

export default function ShopkeeperDashboard() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [dbStatus, setDbStatus] = useState('Checking...');
  const [loadingBooks, setLoadingBooks] = useState(true);

  // Form State for Adding Books
  const [formData, setFormData] = useState({
    title: '',
    seriesId: 'asm_classic',
    issue: '',
    year: '',
    author: '',
    artist: '',
    publisher: 'Marvel Comics',
    description: '',
    price: '',
    stock: '',
    villain: '',
    coverHue: 180,
  });

  const fetchUsers = () => {
    fetch('/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
      })
      .catch((err) => console.error('Error fetching users:', err));
  };

  const fetchBooks = () => {
    setLoadingBooks(true);
    fetch('/api/books')
      .then((res) => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setBooks(data);
        setLoadingBooks(false);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setLoadingBooks(false);
      });
  };

  const checkHealth = () => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setDbStatus(data.database === 'mongodb' ? 'Connected (MongoDB Local)' : 'Fallback (In-Memory)');
      })
      .catch(() => {
        setDbStatus('Error Connecting Backend');
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchBooks();
    checkHealth();
  }, []);

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this comic book from the database?')) return;

    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchBooks();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete book.');
      }
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      series: SERIES_MAP[formData.seriesId],
      issue: Number(formData.issue),
      year: Number(formData.year),
      price: Number(formData.price),
      stock: Number(formData.stock),
      coverHue: Number(formData.coverHue),
      isbn: `978-0-7851-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(Math.random() * 10)}`,
    };

    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchBooks();
        // Reset form
        setFormData({
          title: '',
          seriesId: 'asm_classic',
          issue: '',
          year: '',
          author: '',
          artist: '',
          publisher: 'Marvel Comics',
          description: '',
          price: '',
          stock: '',
          villain: '',
          coverHue: 180,
        });
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to add book.');
      }
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--obsidian)] text-[var(--silk)] px-6 py-10 relative">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-[var(--ash)] hover:text-[var(--silk)] mb-8">
          <FaArrowLeft /> SIGN OUT
        </Link>
        <h1 className="font-display text-4xl mb-2">SHOPKEEPER PORTAL</h1>
        <p className="text-[var(--ash)] font-mono text-xs mb-10">ADMIN CONTROL PANEL · MANAGE INVENTORY, INCOMING USERS, AND LIVE DATABASE CHANNELS</p>

        {/* Database Control Section */}
        <div className="bg-[var(--carbon)] border border-white/10 rounded-xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--cyan)]/5 rounded-full blur-2xl pointer-events-none" />
          <h2 className="font-display text-lg mb-2 flex items-center gap-2 text-[var(--cyan)]">
            <FaDatabase /> MONGODB CONNECTION
          </h2>
          <p className="text-xs text-[var(--ash)] mb-4 max-w-2xl font-mono leading-relaxed">
            Your data is stored in the local MongoDB server. Click the connection URI link below to open it directly in your local desktop client (such as MongoDB Compass).
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-black/40 p-4 border border-white/5 rounded-lg">
            <div>
              <p className="text-[9px] font-mono text-[var(--ash)] uppercase tracking-wider mb-1">Target Connection Link</p>
              <a
                href="mongodb://localhost:27017/spiderman"
                className="font-mono text-sm text-[var(--cyan)] hover:text-[var(--silk)] underline break-all flex items-center gap-1.5 transition-colors"
                title="Click to launch in MongoDB Compass"
              >
                mongodb://localhost:27017/spiderman
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-3 py-1 rounded text-[var(--ash)]">
                DB STATUS: <span className="text-[var(--cyan)] font-bold">{dbStatus}</span>
              </span>
              <a
                href="mongodb://localhost:27017/spiderman"
                className="text-xs font-mono font-bold bg-[var(--cyan)] hover:bg-[var(--cyan)]/80 text-black px-4 py-2.5 rounded-lg transition-colors shadow"
              >
                OPEN MONGODB APP
              </a>
            </div>
          </div>
        </div>

        {/* Top metrics bar */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'TOTAL BOOKS IN DB', value: loadingBooks ? '...' : books.length },
            { label: 'SERIES', value: SERIES.length },
            { label: 'REGISTERED USERS', value: users.length },
            { label: 'DB INSTANCE', value: 'spiderman' },
          ].map((s) => (
            <div key={s.label} className="bg-[var(--carbon)] border border-white/10 rounded-xl p-6">
              <p className="font-mono text-[10px] text-[var(--ash)] tracking-widest mb-2">{s.label}</p>
              <p className="font-display text-2xl">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Books Management Grid */}
        <div className="grid lg:grid-cols-[1.2fr_1.8fr] gap-8 mb-8">
          {/* Add a Book Form */}
          <div className="bg-[var(--carbon)] border border-white/10 rounded-xl p-6 h-fit">
            <h2 className="font-display text-lg mb-4 flex items-center gap-2 text-[var(--cyan)]">
              <FaPlus /> ADD NEW COMIC ISSUE
            </h2>
            <form onSubmit={handleAddBook} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[10px] text-[var(--ash)] uppercase tracking-wider mb-1">Comic Title</label>
                <input
                  type="text"
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. The Amazing Spider-Man #300: Venom"
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[var(--cyan)] transition-colors text-[var(--silk)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-[var(--ash)] uppercase tracking-wider mb-1">Series</label>
                  <select
                    name="seriesId"
                    value={formData.seriesId}
                    onChange={handleInputChange}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[var(--cyan)] transition-colors text-[var(--silk)]"
                  >
                    {Object.entries(SERIES_MAP).map(([id, name]) => (
                      <option key={id} value={id} className="bg-[var(--carbon)] text-white">
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-[var(--ash)] uppercase tracking-wider mb-1">Issue #</label>
                  <input
                    type="number"
                    required
                    name="issue"
                    value={formData.issue}
                    onChange={handleInputChange}
                    placeholder="300"
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[var(--cyan)] transition-colors text-[var(--silk)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-[var(--ash)] uppercase tracking-wider mb-1">Release Year</label>
                  <input
                    type="number"
                    required
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="1988"
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[var(--cyan)] transition-colors text-[var(--silk)]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[var(--ash)] uppercase tracking-wider mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="19.99"
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[var(--cyan)] transition-colors text-[var(--silk)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-[var(--ash)] uppercase tracking-wider mb-1">Author</label>
                  <input
                    type="text"
                    required
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="David Michelinie"
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[var(--cyan)] transition-colors text-[var(--silk)]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[var(--ash)] uppercase tracking-wider mb-1">Artist</label>
                  <input
                    type="text"
                    required
                    name="artist"
                    value={formData.artist}
                    onChange={handleInputChange}
                    placeholder="Todd McFarlane"
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[var(--cyan)] transition-colors text-[var(--silk)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-[var(--ash)] uppercase tracking-wider mb-1">Stock Qty</label>
                  <input
                    type="number"
                    required
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="5"
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[var(--cyan)] transition-colors text-[var(--silk)]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[var(--ash)] uppercase tracking-wider mb-1">Villain</label>
                  <input
                    type="text"
                    required
                    name="villain"
                    value={formData.villain}
                    onChange={handleInputChange}
                    placeholder="Venom"
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[var(--cyan)] transition-colors text-[var(--silk)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-[var(--ash)] uppercase tracking-wider mb-1">Cover Hue (0-360)</label>
                  <input
                    type="number"
                    min="0"
                    max="360"
                    required
                    name="coverHue"
                    value={formData.coverHue}
                    onChange={handleInputChange}
                    placeholder="250"
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[var(--cyan)] transition-colors text-[var(--silk)]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[var(--ash)] uppercase tracking-wider mb-1">Publisher</label>
                  <input
                    type="text"
                    required
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    placeholder="Marvel Comics"
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[var(--cyan)] transition-colors text-[var(--silk)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-[var(--ash)] uppercase tracking-wider mb-1">Description</label>
                <textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Describe the comic details and events..."
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-[var(--cyan)] transition-colors text-[var(--silk)] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[var(--cyan)] hover:bg-[var(--cyan)]/85 text-black rounded-lg font-bold transition-colors uppercase cursor-pointer"
              >
                ADD TO INVENTORY
              </button>
            </form>
          </div>

          {/* Live Inventory List */}
          <div className="bg-[var(--carbon)] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-lg mb-4 flex items-center gap-2 text-[var(--crimson)]">
                <FaBook /> LIVE INVENTORY LIST
              </h2>
              {loadingBooks ? (
                <p className="text-xs font-mono text-[var(--ash)] py-6 text-center">Loading comic books database...</p>
              ) : books.length === 0 ? (
                <p className="text-xs font-mono text-[var(--ash)] py-6 text-center">No books in database inventory.</p>
              ) : (
                <div className="overflow-y-auto max-h-[460px] pr-2 thin-scroll">
                  <table className="w-full text-left font-mono text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[var(--ash)] sticky top-0 bg-[var(--carbon)] z-10">
                        <th className="pb-3 pr-2">ID</th>
                        <th className="pb-3 pr-2">TITLE</th>
                        <th className="pb-3 pr-2">STOCK</th>
                        <th className="pb-3 pr-2">PRICE</th>
                        <th className="pb-3 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((b) => (
                        <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-2.5 pr-2 font-bold text-[var(--cyan)]">#{b.id}</td>
                          <td className="py-2.5 pr-2 text-[var(--silk)] font-semibold line-clamp-1 max-w-[200px]" title={b.title}>
                            {b.title}
                          </td>
                          <td className="py-2.5 pr-2">
                            <span className={`px-1.5 py-0.5 rounded font-bold ${b.stock > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                              {b.stock} copies
                            </span>
                          </td>
                          <td className="py-2.5 pr-2 text-[var(--silk)] font-bold">${b.price.toFixed(2)}</td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => handleDeleteBook(b.id)}
                              className="text-[var(--ash)] hover:text-[var(--crimson)] transition-colors p-1.5 hover:bg-white/5 rounded"
                              title="Delete Book"
                            >
                              <FaTrash size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Data Table */}
        <div className="bg-[var(--carbon)] border border-white/10 rounded-xl p-6">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2 text-[var(--crimson)]">
            <FaUsers /> REGISTERED USERS IN MONGODB
          </h2>
          {users.length === 0 ? (
            <p className="text-xs font-mono text-[var(--ash)] py-6 text-center">No users registered in the database yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[var(--ash)]">
                    <th className="pb-3 pr-2">USERNAME</th>
                    <th className="pb-3 pr-2">EMAIL</th>
                    <th className="pb-3 pr-2">ROLE</th>
                    <th className="pb-3 text-right">DATE JOINED</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u._id || i} className="border-b border-white/5 py-3 hover:bg-white/5 transition-colors">
                      <td className="py-3 pr-2 font-bold text-[var(--silk)] flex items-center gap-1.5">
                        <FaUser className="text-[10px] text-[var(--cyan)]" /> {u.username}
                      </td>
                      <td className="py-3 pr-2 text-[var(--ash)]">{u.email}</td>
                      <td className="py-3 pr-2">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${u.role === 'shopkeeper' ? 'bg-[var(--crimson)]/20 text-[var(--crimson)]' : 'bg-[var(--cyan)]/20 text-[var(--cyan)]'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 text-[var(--ash)] text-right flex items-center justify-end gap-1">
                        <FaClock className="text-[10px]" />
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Today'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
