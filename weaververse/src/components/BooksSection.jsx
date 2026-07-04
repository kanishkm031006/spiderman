import { useMemo, useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SERIES } from '../data/books.js';
import BookCard from './BookCard.jsx';

const SORTS = [
  { id: 'newest', label: 'Newest' },
  { id: 'oldest', label: 'Oldest' },
  { id: 'rated', label: 'Highest Rated' },
  { id: 'price', label: 'Lowest Price' },
];

export default function BooksSection({ wishlist, onToggleWishlist, onAddToCart }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeSeries, setActiveSeries] = useState('all');
  const [sort, setSort] = useState('newest');
  const [visible, setVisible] = useState(24);

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let list = books;
    if (activeSeries !== 'all') list = list.filter((b) => b.seriesId === activeSeries);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.series.toLowerCase().includes(q) ||
        String(b.year).includes(q)
      );
    }
    const sorted = [...list];
    if (sort === 'newest') sorted.sort((a, b) => b.year - a.year);
    if (sort === 'oldest') sorted.sort((a, b) => a.year - b.year);
    if (sort === 'rated') sorted.sort((a, b) => b.rating - a.rating);
    if (sort === 'price') sorted.sort((a, b) => a.price - b.price);
    return sorted;
  }, [books, query, activeSeries, sort]);

  if (loading) {
    return (
      <section id="books" className="py-20 text-center bg-[var(--obsidian)] font-mono text-xs text-[var(--ash)]">
        LOADING SPIDEY ISSUES...
      </section>
    );
  }

  return (
    <section id="books" className="relative py-28 px-6 bg-[var(--obsidian)]">

      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs tracking-[0.4em] text-[var(--crimson)] mb-3">CATALOG</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <h2 className="font-display text-4xl sm:text-5xl">{filtered.length} ISSUES ON THE SHELF</h2>
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ash)] text-sm" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisible(24); }}
              placeholder="Search title, author, year…"
              className="w-full bg-[var(--carbon)] border border-white/10 rounded-full pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[var(--crimson)] transition-colors"
            />
          </div>
        </div>

        {/* series tabs */}
        <div className="flex gap-2 overflow-x-auto thin-scroll pb-2 mb-4">
          <button
            onClick={() => { setActiveSeries('all'); setVisible(24); }}
            className={`shrink-0 font-mono text-xs px-4 py-2 rounded-full border transition-colors ${activeSeries === 'all' ? 'bg-[var(--crimson)] border-[var(--crimson)]' : 'border-white/15 text-[var(--ash)] hover:text-[var(--silk)]'}`}
          >
            ALL SERIES
          </button>
          {SERIES.map((s) => (
            <button
              key={s.id}
              onClick={() => { setActiveSeries(s.id); setVisible(24); }}
              className={`shrink-0 font-mono text-xs px-4 py-2 rounded-full border transition-colors ${activeSeries === s.id ? 'bg-[var(--crimson)] border-[var(--crimson)]' : 'border-white/15 text-[var(--ash)] hover:text-[var(--silk)]'}`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* sort */}
        <div className="flex gap-2 mb-10">
          {SORTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSort(s.id)}
              className={`text-xs font-mono px-3 py-1.5 rounded-full transition-colors ${sort === s.id ? 'text-[var(--cyan)]' : 'text-[var(--ash)] hover:text-[var(--silk)]'}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filtered.slice(0, visible).map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isWishlisted={wishlist.includes(book.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-[var(--ash)] text-center py-20 font-mono text-sm">No issues match that search. Try another title, author, or year.</p>
        )}

        {visible < filtered.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisible((v) => v + 24)}
              className="font-mono text-xs px-6 py-3 rounded-full border border-white/15 hover:border-[var(--crimson)] transition-colors"
            >
              LOAD MORE
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
