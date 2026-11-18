import React from 'react';
import { Database, ShieldCheck, Github, ExternalLink, Zap } from 'lucide-react';
import { isUsingMock } from '../../services/supabase';

interface NavbarProps {
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-900/90 px-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <Zap className="h-5 w-5 animate-pulse text-emerald-400" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-white tracking-wide">
            Observatório de Vulnerabilidade Socioenergética
          </h1>
          <p className="text-xs text-slate-400">
            Salvador/BA &bull; Beiru/Tancredo Neves vs Pernambués
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Status da Conexão / Mock */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-slate-700 bg-slate-800/80">
          {isUsingMock ? (
            <>
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-amber-300">Dados Oficiais (Modo Local)</span>
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-emerald-300">Supabase PostgreSQL Conectado</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/atilario/av3Fullstack"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg transition"
          >
            <Github className="h-4 w-4" />
            <span className="hidden md:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
