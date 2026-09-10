import React from 'react';
import { IconSkull } from '@tabler/icons-react';
import { useBlacklist } from '../hooks/useBlacklist';

const PublicList = () => {
  const { members } = useBlacklist();

  return (
    <main className="min-h-screen relative overflow-hidden bg-brand-darker pb-24">
      {/* Banner Principal */}
      <div className="relative w-full h-[50vh] md:h-[60vh] mt-20">
        <img 
          src="https://pbs.twimg.com/media/G_6xZLlWwAAiSuq.jpg" 
          alt="Patozco" 
          className="w-full h-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/60 to-transparent flex flex-col justify-end pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight mb-4 text-white drop-shadow-2xl">
              LA LISTA NEGRA
            </h1>
            <p className="text-xl md:text-2xl text-brand-primary font-bold max-w-3xl mx-auto drop-shadow-lg">
              Gente que no será invitada a la Roro network porque patozco les puso la cruz
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary via-brand-darker to-brand-darker z-0 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Grilla Grande (Cards Enormes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <div 
              key={member.id} 
              className="bg-black/40 border border-white/10 rounded-3xl p-6 hover:bg-black/60 hover:border-brand-primary/50 transition-all duration-500 group flex flex-col items-center text-center relative overflow-hidden glass-card"
            >
              <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center -z-0 pointer-events-none">
                <IconSkull size={200} className="text-brand-primary/10" />
              </div>

              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-brand-primary rounded-full blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-brand-primary/30 shadow-[0_0_30px_rgba(255,209,19,0.3)] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    style={{ objectPosition: member.photoPosition || 'center' }}
                  />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black font-heading text-white mb-4 group-hover:text-brand-primary transition-colors">
                  {member.name}
                </h3>
                
                <div className="bg-black/60 p-4 rounded-2xl border border-white/5 mt-auto w-full shadow-inner">
                  <p className="text-xs text-brand-primary font-bold mb-2 uppercase tracking-widest flex items-center justify-center gap-1">
                    <IconSkull size={14} /> Causa del Veto
                  </p>
                  <p className="text-gray-300 text-base italic break-words leading-relaxed font-light">
                    "{member.reason}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {members.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            <IconSkull size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-2xl">La lista está vacía. Por ahora...</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default PublicList;
