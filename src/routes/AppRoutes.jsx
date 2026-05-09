import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import SeedData from '../pages/SeedData';

import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import Markets from '../pages/admin/Markets';
import Results from '../pages/admin/Results';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/seed" element={<SeedData />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/markets" element={<Markets />} />
            <Route path="/admin/results" element={<Results />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
