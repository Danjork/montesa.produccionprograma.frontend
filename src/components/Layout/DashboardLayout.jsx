import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Header fijo en la parte superior */}
      <Header />
      
      {/* Contenedor con Sidebar y contenido */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar fijo a la izquierda */}
        <Sidebar />
        
        {/* Área de contenido con scroll */}
        <main 
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            backgroundColor: '#f8f9fa',
            padding: 0
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
