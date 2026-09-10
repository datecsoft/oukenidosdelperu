import React from 'react';
import { Link } from 'react-router-dom';
import { IconBrandYoutube, IconBrandInstagram, IconBrandTiktok } from '@tabler/icons-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Nombre */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-heading font-black tracking-tighter text-white">
              Oukénidos <span className="text-brand-primary">del Perú</span>
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="text-white hover:text-brand-primary transition-colors text-sm font-bold tracking-wide">
                  LISTA NEGRA
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-400 hover:text-brand-primary transition-colors text-sm font-bold tracking-wide">
                  ADMINISTRAR
                </Link>
              </li>
            </ul>
          </nav>

          {/* Redes */}
          <div className="flex items-center space-x-4">
            <div className="flex space-x-3 text-gray-400">
              <a href="https://www.youtube.com/@LaRoroNetworkOficial" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">
                <IconBrandYoutube stroke={1.5} />
              </a>
              <a href="https://www.instagram.com/laroronetworkoficial/" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">
                <IconBrandInstagram stroke={1.5} />
              </a>
              <a href="https://www.tiktok.com/@laroronetwork" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">
                <IconBrandTiktok stroke={1.5} />
              </a>
            </div>
            
            {/* Menú móvil (simplificado) */}
            <div className="md:hidden flex gap-4 ml-2">
              <Link to="/" className="text-white text-xs font-bold border border-white/20 px-2 py-1 rounded">LISTA</Link>
              <Link to="/admin" className="text-white text-xs font-bold border border-white/20 px-2 py-1 rounded">ADMIN</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
