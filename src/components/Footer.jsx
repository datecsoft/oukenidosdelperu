import React from 'react';
import { Link } from 'react-router-dom';
import { IconBrandYoutube, IconBrandInstagram, IconBrandTiktok, IconBrandDiscord } from '@tabler/icons-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-brand-darker relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-heading font-black tracking-tighter inline-block mb-6">
              <span className="text-brand-primary">#OUKE</span>
              <span className="text-red-600">NIDOS</span>
              <span className="text-white">DEL</span>
              <span className="text-red-600">PERÚ</span>
            </Link>
            <p className="text-gray-400 max-w-md mb-8">
              Comunidad no oficial de la roro network, contenido amateur como te gusta.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.youtube.com/@LaRoroNetworkOficial" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-black transition-all duration-300 text-gray-400">
                <IconBrandYoutube stroke={1.5} size={20} />
              </a>
              <a href="https://www.instagram.com/laroronetworkoficial/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-black transition-all duration-300 text-gray-400">
                <IconBrandInstagram stroke={1.5} size={20} />
              </a>
              <a href="https://www.tiktok.com/@laroronetwork" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-black transition-all duration-300 text-gray-400">
                <IconBrandTiktok stroke={1.5} size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">NAVEGACIÓN</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-brand-primary transition-colors">Lista Negra</Link></li>
              <li><Link to="/admin" className="text-gray-400 hover:text-brand-primary transition-colors">Administrar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">LEGAL</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-brand-primary transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-primary transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2026 Oukenidos del Perú. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-sm font-heading font-medium tracking-widest">
            HECHO CON FUEGO EN PERÚ
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
