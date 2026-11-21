import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { VisaoGeral } from './pages/VisaoGeral';
import { Comparativo } from './pages/Comparativo';
import { MapaVulnerabilidade } from './pages/MapaVulnerabilidade';
import { AnaliseEnergetica } from './pages/AnaliseEnergetica';
import { Metodologia } from './pages/Metodologia';
import { RelatorioIEVS } from './pages/RelatorioIEVS';

export function App() {
  const [activeTab, setActiveTab] = useState('visao-geral');

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'visao-geral':
        return <VisaoGeral />;
      case 'comparativo':
        return <Comparativo />;
      case 'mapa':
        return <MapaVulnerabilidade />;
      case 'energia':
        return <AnaliseEnergetica />;
      case 'metodologia':
        return <Metodologia />;
      case 'relatorio-analitico':
        return <RelatorioIEVS />;
      default:
        return <VisaoGeral />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Navbar activeTab={activeTab} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Mobile Navigation Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 border-t border-slate-800 flex justify-around p-2 text-[10px] text-slate-400">
          <button 
            onClick={() => setActiveTab('visao-geral')} 
            className={`flex flex-col items-center py-1 ${activeTab === 'visao-geral' ? 'text-emerald-400 font-bold' : ''}`}
          >
            <span>Visão</span>
          </button>
          <button 
            onClick={() => setActiveTab('comparativo')} 
            className={`flex flex-col items-center py-1 ${activeTab === 'comparativo' ? 'text-emerald-400 font-bold' : ''}`}
          >
            <span>Comparar</span>
          </button>
          <button 
            onClick={() => setActiveTab('mapa')} 
            className={`flex flex-col items-center py-1 ${activeTab === 'mapa' ? 'text-emerald-400 font-bold' : ''}`}
          >
            <span>Mapa</span>
          </button>
          <button 
            onClick={() => setActiveTab('energia')} 
            className={`flex flex-col items-center py-1 ${activeTab === 'energia' ? 'text-emerald-400 font-bold' : ''}`}
          >
            <span>Energia</span>
          </button>
          <button 
            onClick={() => setActiveTab('metodologia')} 
            className={`flex flex-col items-center py-1 ${activeTab === 'metodologia' ? 'text-emerald-400 font-bold' : ''}`}
          >
            <span>Fontes</span>
          </button>
          <button 
            onClick={() => setActiveTab('relatorio-analitico')} 
            className={`flex flex-col items-center py-1 ${activeTab === 'relatorio-analitico' ? 'text-emerald-400 font-bold' : ''}`}
          >
            <span>IEVS</span>
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveScreen()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
