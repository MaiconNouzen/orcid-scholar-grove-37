
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  User, 
  FileText, 
  Briefcase, 
  Search as SearchIcon, 
  Settings, 
  LogIn
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/profile', label: 'Perfil', icon: User },
    { path: '/publications', label: 'Publicações', icon: FileText },
    { path: '/projects', label: 'Projetos', icon: Briefcase },
    { path: '/search', label: 'Buscar', icon: SearchIcon },
    { path: '/edit-profile', label: 'Editar Perfil', icon: Settings },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-blue-600 text-white p-1 rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-8a1 1 0 0 0 2 0V7a1 1 0 0 0-2 0v5zm1-8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" fill="currentColor"/>
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-blue-800">ORCID++</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-1" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          
          <div className="flex items-center">
            <Link 
              to="/login" 
              className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <LogIn className="h-4 w-4 mr-1" />
              Login
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="grid grid-cols-6 gap-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span className="text-xs mt-1 text-center leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
