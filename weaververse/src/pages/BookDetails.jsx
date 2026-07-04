import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaStar, FaHeart, FaSpider, FaBookOpen } from 'react-icons/fa';
import BookCover from '../components/BookCover.jsx';
import Nav from '../components/Nav.jsx';
import ComicPreviewModal from '../components/ComicPreviewModal.jsx';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const found = data.find((b) => b.id === Number(id));
          if (found) {
            setBook(found);
            const sim = data.filter((b) => b.seriesId === found.seriesId && b.id !== found.id).slice(0, 4);
            setSimilar(sim);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching book details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--obsidian)] text-[var(--silk)] flex items-center justify-center font-mono text-xs tracking-widest">
        LOADING SPIDEY FILE...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[var(--obsidian)] text-[var(--silk)] flex flex-col items-center justify-center gap-4">
        <p className="font-mono text-[var(--ash)]">That issue isn't on the shelf.</p>
        <Link to="/customer" className="text-[var(--crimson)] font-mono text-sm">← Back to catalog</Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[var(--obsidian)] text-[var(--silk)] relative">
      <Nav />
      
      {/* floating corner spider accent */}
      <motion.div
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--crimson)]/20 border border-[var(--crimson)]/40 backdrop-blur flex items-center justify-center z-30"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FaSpider className="text-[var(--crimson)] text-xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/customer" className="inline-flex items-center gap-2 text-xs font-mono text-[var(--ash)] hover:text-[var(--silk)] mb-8">
          <FaArrowLeft /> BACK TO CATALOG
        </Link>

        <div className="grid md:grid-cols-[320px_1fr] gap-10">
          <div>
            <BookCover book={book} className="w-full rounded-xl border border-white/10 shadow-2xl" />
            <div className="grid grid-cols-2 gap-2 mt-3">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  onClick={() => setIsPreviewOpen(true)}
                  className="aspect-square rounded-lg bg-[var(--carbon)] hover:bg-[var(--carbon-light)] border border-white/10 flex flex-col items-center justify-center text-[10px] font-mono text-[var(--ash)] hover:text-[var(--cyan)] cursor-pointer transition-colors"
                >
                  <FaBookOpen className="text-lg mb-2 text-[var(--crimson)]" />
                  PREVIEW PANEL {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs text-[var(--cyan)] tracking-widest mb-2">{book.series.toUpperCase()} · ISSUE #{book.issue}</p>
            <h1 className="font-display text-3xl sm:text-5xl mb-4">{book.title}</h1>
            <div className="flex items-center gap-4 text-sm text-[var(--ash)] mb-6">
              <span className="flex items-center gap-1 text-[var(--cyan)]"><FaStar /> {book.rating.toFixed(1)}</span>
              <span>{book.year}</span>
              <span>{book.publisher}</span>
            </div>

            <p className="text-[var(--ash)] leading-relaxed mb-8 max-w-2xl">{book.description} Written by {book.author}, illustrated by {book.artist}.</p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <span className="font-mono text-2xl">${book.price.toFixed(2)}</span>
              
              <button 
                onClick={() => setIsPreviewOpen(true)}
                className="bg-transparent border border-[var(--cyan)] text-[var(--cyan)] hover:bg-[var(--cyan)] hover:text-black px-6 py-3 rounded-full font-mono text-sm transition-colors cursor-pointer flex items-center gap-2"
              >
                <FaBookOpen /> PREVIEW ISSUE
              </button>

              <button disabled={!book.available} className="bg-[var(--crimson)] disabled:bg-white/10 disabled:text-[var(--ash)] px-6 py-3 rounded-full font-mono text-sm hover:bg-[var(--crimson-dim)] transition-colors cursor-pointer">
                {book.available ? 'ADD TO CART' : 'OUT OF STOCK'}
              </button>

              <button className="border border-white/15 px-4 py-3 rounded-full hover:border-[var(--crimson)] transition-colors cursor-pointer">
                <FaHeart className="text-[var(--ash)]" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div>
                <h3 className="font-display text-sm text-[var(--cyan)] mb-2">CHARACTERS</h3>
                <p className="text-sm text-[var(--ash)]">Spider-Man (Peter Parker), Aunt May, Uncle Ben, and the classic supporting cast.</p>
              </div>
              <div>
                <h3 className="font-display text-sm text-[var(--crimson)] mb-2">VILLAIN</h3>
                <p className="text-sm text-[var(--ash)]">{book.villain}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-[var(--ash)] border-t border-white/10 pt-6">
              <div><p className="text-[var(--silk)]">ISBN</p><p>{book.isbn}</p></div>
              <div><p className="text-[var(--silk)]">PUBLISHED</p><p>{book.year}</p></div>
              <div><p className="text-[var(--silk)]">PUBLISHER</p><p>{book.publisher}</p></div>
              <div><p className="text-[var(--silk)]">STOCK</p><p>{book.stock} copies</p></div>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl mb-6">MORE FROM {book.series.toUpperCase()}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {similar.map((b) => (
                <Link key={b.id} to={`/customer/book/${b.id}`} className="group">
                  <BookCover book={b} className="w-full rounded-lg border border-white/10 group-hover:border-[var(--crimson)]/50 transition-colors" />
                  <p className="text-xs mt-2 line-clamp-2 group-hover:text-[var(--crimson)] transition-colors">{b.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comic Book Reader Modal */}
      <ComicPreviewModal 
        book={book} 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
      />
    </div>
  );
}
