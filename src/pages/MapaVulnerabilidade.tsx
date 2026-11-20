import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import { Layers, MapPin, AlertCircle, Info, Eye } from 'lucide-react';
import geojsonData from '../assets/geo/salvador_bairros.json';
import { Card } from '../components/ui/Card';

type LayerType = 'ievs' | 'renda' | 'esgoto' | 'iluminacao';

export const MapaVulnerabilidade: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<LayerType>('ievs');
  const [selectedFeature, setSelectedFeature] = useState<any>(geojsonData.features[0].properties);

  // Centro de Salvador / Miolo
  const center: [number, number] = [-12.9600, -38.4550];

  const getColor = (val: number, type: LayerType) => {
    if (type === 'ievs') {
      return val > 0.65 ? '#ef4444' : val > 0.50 ? '#f59e0b' : val > 0.35 ? '#3b82f6' : '#10b981';
    }
    if (type === 'renda') {
      return val < 1200 ? '#ef4444' : val < 1500 ? '#f59e0b' : '#10b981';
    }
    if (type === 'esgoto') {
      return val > 25 ? '#ef4444' : val > 18 ? '#f59e0b' : '#10b981';
    }
    if (type === 'iluminacao') {
      return val > 15 ? '#ef4444' : val > 10 ? '#f59e0b' : '#10b981';
    }
    return '#10b981';
  };

  const styleFeature = (feature: any) => {
    const props = feature.properties;
    let val = 0;
    if (activeLayer === 'ievs') val = props.ievs;
    if (activeLayer === 'renda') val = props.renda_media;
    if (activeLayer === 'esgoto') val = props.taxa_esgoto_inadequado;
    if (activeLayer === 'iluminacao') val = props.taxa_ilum_inadequada;

    const fillColor = getColor(val, activeLayer);

    const isSelected = selectedFeature?.id === props.id;

    return {
      fillColor,
      weight: isSelected ? 3 : 1.5,
      opacity: 1,
      color: isSelected ? '#ffffff' : '#475569',
      dashArray: props.tipo === 'Municipio' ? '4' : '',
      fillOpacity: props.tipo === 'Municipio' ? 0.15 : 0.65
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        setSelectedFeature(feature.properties);
      },
      mouseover: (e: any) => {
        const l = e.target;
        l.setStyle({ weight: 3, color: '#38bdf8' });
      },
      mouseout: (e: any) => {
        const l = e.target;
        l.setStyle(styleFeature(feature));
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Tela 3 &bull; Mapa de Vulnerabilidade
          </span>
          <span className="text-xs text-slate-400">Cartografia Digital Leaflet &bull; Censo 2022</span>
        </div>
        <h2 className="text-xl font-bold text-white mt-1">
          Distribuição Espacial da Vulnerabilidade Socioenergética
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Visualização cartográfica com camadas coropléticas oficiais dos limites de Beiru/Tancredo Neves e Pernambués em Salvador.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Painel Lateral de Controle de Camadas e Detalhes */}
        <div className="space-y-4 lg:col-span-1">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-emerald-400" />
              Camadas Temáticas
            </h3>

            <div className="space-y-1.5">
              {[
                { id: 'ievs', label: 'Índice IEVS (Composto)', desc: 'Renda + Saneamento + Iluminação' },
                { id: 'renda', label: 'Rendimento per Capita', desc: 'R$ médio domiciliar' },
                { id: 'esgoto', label: 'Esgoto Inadequado (%)', desc: 'Sem ligação formal' },
                { id: 'iluminacao', label: 'Sem Iluminação Pública (%)', desc: 'Face sem luminárias' }
              ].map(layer => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id as LayerType)}
                  className={`w-full text-left p-2.5 rounded-lg border transition text-xs ${
                    activeLayer === layer.id
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-white font-medium'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-slate-200">{layer.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{layer.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Cartão de Detalhe da Área Clicada */}
          {selectedFeature && (
            <Card
              title={selectedFeature.nome}
              subtitle={`Código IBGE: ${selectedFeature.codigo_ibge}`}
              badge={selectedFeature.grau_vulnerabilidade || 'Referência'}
              badgeColor={selectedFeature.grau_vulnerabilidade === 'Alta' ? 'amber' : 'emerald'}
              icon={<MapPin className="h-4 w-4 text-emerald-400" />}
            >
              <div className="space-y-2 text-xs text-slate-300 mt-2">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">População:</span>
                  <span className="font-semibold text-white">
                    {selectedFeature.populacao.toLocaleString('pt-BR')} hab
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Renda Média:</span>
                  <span className="font-semibold text-white">
                    R$ {selectedFeature.renda_media.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Esgoto Inadequado:</span>
                  <span className="font-semibold text-amber-400">
                    {selectedFeature.taxa_esgoto_inadequado}%
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Sem Iluminação:</span>
                  <span className="font-semibold text-amber-300">
                    {selectedFeature.taxa_ilum_inadequada}%
                  </span>
                </div>
                <div className="flex justify-between py-1 pt-2">
                  <span className="text-slate-400 font-medium">Índice IEVS:</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {selectedFeature.ievs.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          )}

          {/* Legenda do Mapa */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs space-y-2">
            <h4 className="font-semibold text-slate-300">Legenda de Cores</h4>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-red-500 inline-block" />
                <span>Vulnerabilidade Crítica / Alta</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-amber-500 inline-block" />
                <span>Vulnerabilidade Intermediária / Média-Alta</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-emerald-500 inline-block" />
                <span>Vulnerabilidade Baixa / Média</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded border border-dashed border-slate-400 inline-block" />
                <span>Limite Municipal de Salvador</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualizador Leaflet */}
        <div className="lg:col-span-3 rounded-xl border border-slate-800 overflow-hidden relative min-h-[520px] bg-slate-950 flex flex-col">
          <div className="absolute top-3 right-3 z-20 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300 backdrop-blur shadow-md flex items-center gap-2">
            <Eye className="h-3.5 w-3.5 text-emerald-400" />
            <span>Clique nos polígonos para carregar o resumo detalhado</span>
          </div>

          <div className="flex-1 w-full h-[520px]">
            <MapContainer
              center={center}
              zoom={12}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              <GeoJSON
                key={activeLayer}
                data={geojsonData as any}
                style={styleFeature}
                onEachFeature={onEachFeature}
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
