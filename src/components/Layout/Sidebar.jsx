import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/orders', icon: '📋', label: 'Orders' },
    { path: '/products', icon: '🛒', label: 'Products' },
    { path: '/customers', icon: '👥', label: 'Customers' },
    { path: '/reports', icon: '📊', label: 'Reports' },
  ];

  const savedReports = [
    { path: '/reports/current-month', icon: '📄', label: 'Current month' },
    { path: '/reports/last-quarter', icon: '📄', label: 'Last quarter' },
    { path: '/reports/social-engagement', icon: '📄', label: 'Social engagement' },
    { path: '/reports/year-end-sale', icon: '📄', label: 'Year-end sale' },
  ];

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '250px', minHeight: '100vh' }}>
      {/* Menu principal */}
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : 'text-dark'}`}
            >
              <span className="me-2">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}

        <li className="nav-item">
          <Link to="/integrations" className="nav-link text-dark">
            <span className="me-2">🔗</span>
            Integrations
          </Link>
        </li>
      </ul>

      {/* Reportes guardados */}
      <hr />
      <div>
        <h6 className="sidebar-heading px-3 mt-4 mb-1 text-muted text-uppercase">
          <span>Saved Reports</span>
        </h6>
        
      </div>

      {/* Settings y Sign out */}
      <hr />
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <Link to="/settings" className="nav-link text-dark">
            <span className="me-2">⚙️</span>
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signout" className="nav-link text-dark">
            <span className="me-2">🚪</span>
            Sign out
          </Link>
        </li>
      </ul>
    </div>
  );
}
