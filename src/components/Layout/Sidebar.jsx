import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdInventory, MdPeople, MdAssessment, MdIntegrationInstructions, MdSettings, MdLogout } from 'react-icons/md'

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: <MdDashboard />, label: 'Dashboard' },
     { path: '/carga', icon: <MdDashboard />, label: 'Carga' },
    {path: '/maquinas', icon: <MdInventory  />, label:'Maquinas'},
    { path: '/orders', icon: '📋', label: 'Orders' },
    { path: '/products', icon: '🛒', label: 'Products' },
    
    { path: '/reports', icon: '📊', label: 'Reports' },
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

      </ul>

   

      {/* Settings y Sign out */}
      <hr />
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <Link to="/settings" className="nav-link text-dark">
            <span className="me-2">⚙️</span>
            configuracion
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
