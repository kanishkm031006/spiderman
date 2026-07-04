import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import BookCover from './BookCover.jsx';

export default function BookCard({ book, onToggleWishlist, onAddToCart, isWishlisted }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-[var(--carbon)] border border-white/10 rounded-xl overflow-hidden flex flex-col"
    >
      <Link to={`/customer/book/${book.id}`} className="block relative">
        <BookCover book={book} className="w-full aspect-[300/440] object-cover" />
        <button
          onClick={(e) => { e.preventDefault(); onToggleWishlist(book.id); }}
          className="absolute top-2 right-2 bg-black/50 backdrop-blur rounded-full p-2 hover:scale-110 transition-transform"
          aria-label="Toggle wishlist"
        >
          {isWishlisted ? <FaHeart className="text-[var(--crimson)]" /> : <FaRegHeart className="text-white" />}
        </button>
        {!book.available && (
          <span className="absolute bottom-2 left-2 bg-black/70 text-[10px] font-mono px-2 py-1 rounded">OUT OF STOCK</span>
        )}
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="font-mono text-[10px] text-[var(--ash)] tracking-wide">{book.series} · {book.year}</p>
        <Link to={`/customer/book/${book.id}`} className="font-display text-sm leading-snug hover:text-[var(--crimson)] transition-colors line-clamp-2">
          {book.title}
        </Link>
        <p className="text-xs text-[var(--ash)]">by {book.author}</p>
        <div className="flex items-center gap-1 text-xs text-[var(--cyan)]">
          <FaStar /> {book.rating.toFixed(1)}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono text-sm">${book.price.toFixed(2)}</span>
          <button
            disabled={!book.available}
            onClick={() => onAddToCart(book.id)}
            className="text-xs font-mono px-3 py-1.5 rounded-full bg-[var(--crimson)] disabled:bg-white/10 disabled:text-[var(--ash)] hover:bg-[var(--crimson-dim)] transition-colors"
          >
            {book.available ? 'BUY' : 'N/A'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
