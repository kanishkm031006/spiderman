import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Book from './models/Book.js';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/spiderman';
const JWT_SECRET = process.env.JWT_SECRET || 'spidey-web-secret-key-1962';

let isMongoConnected = false;
const inMemoryUsers = []; // Fallback storage if MongoDB is down

// Classic initial Spider-Man books to seed
const initialBooks = [
  {
    id: 1,
    title: 'Amazing Fantasy #15: Spider-Man!',
    seriesId: 'af15',
    series: 'Amazing Fantasy',
    issue: 15,
    year: 1962,
    author: 'Stan Lee',
    artist: 'Steve Ditko',
    publisher: 'Marvel Comics',
    description: 'Peter Parker is bitten by a radioactive spider, gaining spider-like strength, speed, and wall-crawling abilities. When tragedy strikes his Uncle Ben, Peter learns that with great power must also come great responsibility.',
    rating: 5.0,
    price: 15.99,
    stock: 5,
    available: true,
    isbn: '978-0-7851-5613-2',
    villain: 'The Burglar',
    coverHue: 10,
  },
  {
    id: 2,
    title: 'The Amazing Spider-Man #1: The Chameleon',
    seriesId: 'asm_classic',
    series: 'Amazing Spider-Man Vol. 1',
    issue: 1,
    year: 1963,
    author: 'Stan Lee',
    artist: 'Steve Ditko',
    publisher: 'Marvel Comics',
    description: 'Spider-Man begins his solo monthly adventures! Spidey saves an astronaut\'s capsule, attempts to join the Fantastic Four to earn a living, and runs afoul of the master of disguise, the Chameleon!',
    rating: 4.9,
    price: 12.99,
    stock: 8,
    available: true,
    isbn: '978-0-7851-5614-9',
    villain: 'The Chameleon',
    coverHue: 205,
  },
  {
    id: 3,
    title: 'The Amazing Spider-Man #50: Spider-Man No More!',
    seriesId: 'asm_classic',
    series: 'Amazing Spider-Man Vol. 1',
    issue: 50,
    year: 1967,
    author: 'Stan Lee',
    artist: 'John Romita Sr.',
    publisher: 'Marvel Comics',
    description: 'Feeling overwhelmed by the double-life of being Peter Parker and Spider-Man, Peter throws his costume in a garbage can and decides to quit! Meanwhile, the Kingpin makes his debut to take over the crime underworld.',
    rating: 4.9,
    price: 9.99,
    stock: 12,
    available: true,
    isbn: '978-0-7851-5617-0',
    villain: 'The Kingpin',
    coverHue: 355,
  },
  {
    id: 4,
    title: 'The Amazing Spider-Man #121: The Night Gwen Stacy Died',
    seriesId: 'asm_classic',
    series: 'Amazing Spider-Man Vol. 1',
    issue: 121,
    year: 1973,
    author: 'Gerry Conway',
    artist: 'Gil Kane',
    publisher: 'Marvel Comics',
    description: 'One of the most defining and shocking issues in comic book history. The Green Goblin kidnaps Gwen Stacy and takes her to the Brooklyn Bridge. In the ensuing struggle, a tragic event changes Spider-Man\'s life forever.',
    rating: 5.0,
    price: 14.50,
    stock: 4,
    available: true,
    isbn: '978-0-7851-5620-0',
    villain: 'Green Goblin',
    coverHue: 110,
  },
  {
    id: 5,
    title: 'The Amazing Spider-Man #122: The Goblin\'s Last Stand!',
    seriesId: 'asm_classic',
    series: 'Amazing Spider-Man Vol. 1',
    issue: 122,
    year: 1973,
    author: 'Gerry Conway',
    artist: 'Gil Kane',
    publisher: 'Marvel Comics',
    description: 'In the wake of Gwen Stacy\'s death, an enraged Spider-Man hunts down the Green Goblin for a final confrontation. The battle ends in a deadly glider accident.',
    rating: 4.8,
    price: 8.99,
    stock: 3,
    available: true,
    isbn: '978-0-7851-5621-7',
    villain: 'Green Goblin',
    coverHue: 280,
  },
  {
    id: 6,
    title: 'The Amazing Spider-Man #300: Venom!',
    seriesId: 'asm_classic',
    series: 'Amazing Spider-Man Vol. 1',
    issue: 300,
    year: 1988,
    author: 'David Michelinie',
    artist: 'Todd McFarlane',
    publisher: 'Marvel Comics',
    description: 'The landmark 300th issue featuring the first full appearance of Venom! Eddie Brock merges with the alien symbiote that Peter Parker discarded, creating Spider-Man\'s most lethal and terrifying nightmare.',
    rating: 5.0,
    price: 19.99,
    stock: 2,
    available: true,
    isbn: '978-0-7851-5625-5',
    villain: 'Venom',
    coverHue: 250,
  },
  {
    id: 7,
    title: 'Ultimate Spider-Man #1: Power & Responsibility',
    seriesId: 'usm',
    series: 'Ultimate Spider-Man',
    issue: 1,
    year: 2000,
    author: 'Brian Michael Bendis',
    artist: 'Mark Bagley',
    publisher: 'Marvel Comics',
    description: 'A fresh modern origin for Peter Parker. High-schooler Peter Parker goes on a field trip to Osborn Industries, where he is bitten by an experimental genetically altered spider, launching a brand new universe.',
    rating: 4.7,
    price: 7.99,
    stock: 15,
    available: true,
    isbn: '978-0-7851-0940-2',
    villain: 'Norman Osborn',
    coverHue: 40,
  },
  {
    id: 8,
    title: 'Spider-Verse #9: Spider-Verse Part 1',
    seriesId: 'sv',
    series: 'Spider-Verse',
    issue: 9,
    year: 2014,
    author: 'Dan Slott',
    artist: 'Olivier Coipel',
    publisher: 'Marvel Comics',
    description: 'The Spider-Verse event begins! Morlun and his family of Inheritors are hunting spider-totems across dimensions. Spidey must unite with Spider-Gwen, Spider-Man Noir, Miles Morales, and every spider-hero to survive!',
    rating: 4.8,
    price: 11.99,
    stock: 7,
    available: true,
    isbn: '978-0-7851-9036-3',
    villain: 'Morlun',
    coverHue: 170,
  }
];

const inMemoryBooks = [...initialBooks]; // Fallback storage if MongoDB is down

console.log(`Connecting to MongoDB at: ${MONGO_URI}`);
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Successfully connected to MongoDB at:', MONGO_URI);
    isMongoConnected = true;
    
    // Seed initial books if the collection is empty
    try {
      const bookCount = await Book.countDocuments();
      if (bookCount === 0) {
        console.log('Seeding initial Spider-Man books into MongoDB...');
        await Book.insertMany(initialBooks);
        console.log('Seeding completed!');
      }
    } catch (seedErr) {
      console.error('Seeding books failed:', seedErr);
    }
  })
  .catch((err) => {
    console.warn('\n======================================================');
    console.warn('WARNING: MongoDB is not running locally.');
    console.warn(`Could not connect to: ${MONGO_URI}`);
    console.warn('Reason:', err.message);
    console.warn('Server will run using in-memory mock fallback.');
    console.warn('======================================================\n');
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: isMongoConnected ? 'mongodb' : 'in-memory-fallback',
    uptime: process.uptime()
  });
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const normalizedEmail = email.toLowerCase();
    const userRole = role === 'shopkeeper' ? 'shopkeeper' : 'customer';

    const hashedPassword = await bcrypt.hash(password, 10);

    if (isMongoConnected) {
      const existingUser = await User.findOne({ 
        $or: [{ username }, { email: normalizedEmail }] 
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists.' });
      }

      const newUser = new User({
        username,
        email: normalizedEmail,
        password: hashedPassword,
        role: userRole
      });
      await newUser.save();
      
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '24h' });
      return res.status(201).json({
        token,
        user: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role }
      });
    } else {
      const existingUser = inMemoryUsers.find(u => u.username === username || u.email === normalizedEmail);
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists.' });
      }

      const newUser = {
        _id: String(Date.now()),
        username,
        email: normalizedEmail,
        password: hashedPassword,
        role: userRole,
        createdAt: new Date()
      };
      inMemoryUsers.push(newUser);

      const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '24h' });
      return res.status(201).json({
        token,
        user: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role }
      });
    }
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server registration error.' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: 'Username/email and password are required.' });
    }

    let user = null;

    if (isMongoConnected) {
      user = await User.findOne({
        $or: [
          { username: usernameOrEmail },
          { email: usernameOrEmail.toLowerCase() }
        ]
      });
    } else {
      user = inMemoryUsers.find(u => 
        u.username === usernameOrEmail || 
        u.email === usernameOrEmail.toLowerCase()
      );
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server login error.' });
  }
});

// Get all users (for Shopkeeper Dashboard)
app.get('/api/users', async (req, res) => {
  try {
    if (isMongoConnected) {
      const users = await User.find({}, '-password');
      res.json(users);
    } else {
      const usersWithoutPassword = inMemoryUsers.map(u => {
        const { password, ...rest } = u;
        return rest;
      });
      res.json(usersWithoutPassword);
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error retrieving users.' });
  }
});

// --- BOOKS CRUD API ---

// 1. Get all books
app.get('/api/books', async (req, res) => {
  try {
    if (isMongoConnected) {
      const books = await Book.find({}).sort({ id: 1 });
      res.json(books);
    } else {
      res.json(inMemoryBooks);
    }
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Error fetching books.' });
  }
});

// 2. Add a new book
app.post('/api/books', async (req, res) => {
  try {
    const bookData = req.body;
    
    // Validate required fields
    const required = ['title', 'seriesId', 'series', 'issue', 'year', 'author', 'artist', 'publisher', 'description', 'price', 'isbn', 'villain'];
    for (const field of required) {
      if (bookData[field] === undefined || bookData[field] === '') {
        return res.status(400).json({ message: `Field '${field}' is required.` });
      }
    }

    let nextId = 1;
    if (isMongoConnected) {
      const lastBook = await Book.findOne().sort({ id: -1 });
      if (lastBook) nextId = lastBook.id + 1;

      const newBook = new Book({
        id: nextId,
        ...bookData,
        available: bookData.stock > 0
      });
      await newBook.save();
      res.status(201).json(newBook);
    } else {
      const maxId = inMemoryBooks.reduce((max, b) => b.id > max ? b.id : max, 0);
      nextId = maxId + 1;

      const newBook = {
        id: nextId,
        ...bookData,
        available: bookData.stock > 0
      };
      inMemoryBooks.push(newBook);
      res.status(201).json(newBook);
    }
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ message: 'Error adding book.' });
  }
});

// 3. Delete a book
app.delete('/api/books/:id', async (req, res) => {
  try {
    const bookId = Number(req.params.id);
    
    if (isMongoConnected) {
      const result = await Book.deleteOne({ id: bookId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Book not found.' });
      }
      res.json({ message: 'Book deleted successfully.', id: bookId });
    } else {
      const index = inMemoryBooks.findIndex(b => b.id === bookId);
      if (index === -1) {
        return res.status(404).json({ message: 'Book not found.' });
      }
      inMemoryBooks.splice(index, 1);
      res.json({ message: 'Book deleted successfully.', id: bookId });
    }
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ message: 'Error deleting book.' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
