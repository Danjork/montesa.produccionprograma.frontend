import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from './components/Layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';

import Reports from './pages/Reports';


function App() {
  return (
 <Routes>
       <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        
        <Route path="reports" element={<Reports />} />
        <Route path="reports/:reportId" element={<Reports />} />
      </Route>
    </Routes>
  );
}

export default App;