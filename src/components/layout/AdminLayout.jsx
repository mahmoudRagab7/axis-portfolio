import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import ThemeToggle from '../common/ThemeToggle';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Manage Results', path: '/admin/results', icon: '📈' },
    { name: 'Manage Markets', path: '/admin/markets', icon: '🌍' },
  ];

  return (
    <div className="flex h-screen bg-bg-primary overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-secondary border-r border-border flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <div className="w-8 h-8 rounded bg-accent-gold flex items-center justify-center font-bold text-bg-primary text-xl">
            A
          </div>
          <span className="font-bold text-xl tracking-wide text-text-primary">Admin Portal</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/20' 
                    : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary border border-transparent'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border flex flex-col gap-2">
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm font-medium text-text-secondary">Theme</span>
            <ThemeToggle />
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-text-muted hover:text-accent-red hover:bg-accent-red/10 rounded-xl transition-all duration-300 cursor-pointer"
          >
            <span>🚪</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-bg-secondary border-b border-border">
          <span className="font-bold text-lg text-text-primary">Admin Portal</span>
          <button onClick={handleLogout} className="text-sm text-accent-red font-medium">Sign Out</button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
