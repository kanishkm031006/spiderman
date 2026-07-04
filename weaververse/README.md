# WeaverVerse Book Store — Frontend (Phase 1)

An original web-slinging superhero universe ("Weaver" / Alex Reyes) built as a comic bookstore front-end. Not affiliated with any existing comic publisher or character.

## What's included this phase
- Landing chooser (Customer / Shopkeeper)
- Customer home: animated hero (parallax skyline + GSAP silk-thread swing), origin story dossier, powers grid, searchable/filterable catalog (100 sample books across 9 original series)
- Book details page with similar-issues rail
- Shopkeeper dashboard: stat preview scaffold (full admin build is next phase)
- Signature "thread" scroll-progress element tying the page together, built with Framer Motion
- Fully responsive, dark theme, custom type system (Anton / Inter / IBM Plex Mono)

## Stack
React 19 + Vite, Tailwind CSS v4, Framer Motion, GSAP, React Router, React Icons.

## Run it
```bash
npm install
npm run dev
```

## Project structure
```
src/
  components/   Nav, Hero, StorySection, PowersSection, BooksSection, BookCard, BookCover, ThreadProgress
  pages/        LandingChooser, CustomerHome, BookDetails, ShopkeeperDashboard
  data/         books.js - seeded sample catalog generator (100+ books)
```

## Next phases (not yet built)
- Express + MongoDB backend (JWT auth, books/orders/cart/wishlist persistence, real image uploads)
- Full shopkeeper admin (inventory CRUD, order pipeline, analytics charts, customer management)
- Customer profile page, real checkout flow, reviews
