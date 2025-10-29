import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="flex-grow-1 p-4 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
