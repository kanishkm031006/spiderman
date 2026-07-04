import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LandingChooser from './pages/LandingChooser.jsx'
import CustomerHome from './pages/CustomerHome.jsx'
import BookDetails from './pages/BookDetails.jsx'
import ShopkeeperDashboard from './pages/ShopkeeperDashboard.jsx'
import Login from './pages/Login.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--obsidian)] text-[var(--silk)] flex items-center justify-center font-mono text-xs tracking-widest">
        LOADING SPIDEY SENSES...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/choose" element={<LandingChooser />} />
        <Route 
          path="/customer" 
          element={
            <ProtectedRoute allowedRoles={['customer', 'shopkeeper']}>
              <CustomerHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/customer/book/:id" 
          element={
            <ProtectedRoute allowedRoles={['customer', 'shopkeeper']}>
              <BookDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/shopkeeper" 
          element={
            <ProtectedRoute allowedRoles={['shopkeeper']}>
              <ShopkeeperDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
