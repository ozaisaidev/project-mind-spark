
import { Link, useLocation } from "react-router-dom"
import { LogOut } from "lucide-react";

export function TopNavigation() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  
  const isActive = (path: string) => {
    if (path === '/projects' && location.pathname.startsWith('/project/')) {
      return true;
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Simulate logout, in production you would clear tokens/session etc.
    window.location.href = "/login";
  };

  return (
    <div className="bg-zinc-900 border-b border-zinc-800 py-4">
      <div className="container mx-auto px-4 flex items-center justify-center relative">
        <nav className="flex flex-1 justify-center">
          <div className="flex space-x-16">
            <NavLink to="/projects" isActive={isActive('/projects')}>
              Projects
            </NavLink>
            <NavLink to="/" isActive={isActive('/')}>
              Learnings
            </NavLink>
            <NavLink to="/todos" isActive={isActive('/todos')}>
              To-dos
            </NavLink>
          </div>
        </nav>
        {!isLogin && (
          <button
            onClick={handleLogout}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="text-zinc-300 hover:text-orange-400" size={24} />
          </button>
        )}
      </div>
    </div>
  )
}

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavLink({ to, isActive, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`relative font-mono text-xl ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
    >
      <div className="flex flex-col items-center">
        <span>{children}</span>
        <div className="flex mt-1 space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className={`h-1 w-1 rounded-full ${isActive ? 'bg-white' : 'bg-transparent'}`}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
