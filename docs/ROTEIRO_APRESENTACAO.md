# ROTEIRO DE APRESENTAÇÃO E DEFESA ORAL DO PROJETO
## Observatório de Vulnerabilidade Socioenergética de Salvador
**Professor:** Celso Barreto &bull; **Curso:** Engenharia de Computação &bull; **Disciplina:** Full Stack &bull; **AV3 Parcial**  
**Instituição:** SENAI CIMATEC  
**Tempo Sugerido:** 10 a 15 minutos

---

### Slide 1: Introdução e Apresentação da Equipe (1 min)
- Nome do projeto: *Observatório de Vulnerabilidade Socioenergética de Salvador*.
- Equipe de 4 desenvolvedores:
  - **Membro 1 (Heitor Barreto):** Engenharia de Dados & Pipeline ETL (IBGE, IPEA, EPE).
  - **Membro 2 (Átila Leite):** Modelagem PostgreSQL/Supabase, RLS, Deploy Vercel e Infraestrutura.
  - **Membro 3 (Maria Fernanda Ribeiro):** Frontend Core Dashboard, Gráficos Recharts e Telas Comparativas.
  - **Membro 4 (Camila Rocha):** Visualização Cartográfica Geoespacial (Leaflet), Metodologia e Desafio Analítico IEVS.
- Problema central: Como integrar dados públicos do IBGE, IPEA e EPE para mapear e mitigar a vulnerabilidade socioenergética em Beiru e Pernambués?

---

### Slide 2: Arquitetura e Engenharia de Dados (2 min)
- Demonstração do fluxo de dados:
  `Dados Oficiais (Censo 2022, IPEA, EPE) -> ETL (Python/Node) -> Supabase PostgreSQL (com RLS) -> React Dashboard -> Vercel`.
- Mostrar a estrita observância metodológica: a escala estadual da EPE não foi confundida com valores de bairro.
- Apresentação das 4 tabelas relacionais (`territories`, `fontes`, `indicadores`, `observacoes`).

---

### Slide 3: Demonstração Prática do Sistema Web (5 min)
1. **Tela 1 - Visão Geral:**
   - Seleção interativa do bairro Beiru e Pernambués.
   - Destaque para fontes, anos e classificação explícita dos cards (*Dado observado*, *Derivado*, *Proxy*).
2. **Tela 2 - Comparativo Territorial:**
   - Exibição dos gráficos de barras duplas com Recharts.
   - Demonstração da tabela de diferença absoluta ($\Delta$) e variação percentual ($\%\Delta$).
3. **Tela 3 - Mapa de Vulnerabilidade:**
   - Apresentação do mapa interativo Leaflet com os polígonos GeoJSON dos bairros.
   - Alternância entre as camadas coropléticas de IEVS, Renda, Esgoto e Iluminação Pública.
4. **Tela 4 - Análise Energética:**
   - Mostrar os gráficos da série temporal EPE (2018 a 2023) na Bahia.
   - Destaque ao aviso metodológico de escala e ao conceito de fardo energético.
5. **Tela 5 - Metodologia e Fontes:**
   - Dicionário dinâmico de indicadores com busca textual e filtros de classificação.

---

### Slide 4: O Desafio Analítico e a Proposta do IEVS (3 min)
- Síntese das 8 respostas do edital.
- Apresentação da fórmula do **IEVS** (Índice Exploratório de Vulnerabilidade Socioenergética):
  $\text{IEVS} = (0.40 \cdot I_{\text{Renda}}) + (0.35 \cdot I_{\text{Habitacao}}) + (0.25 \cdot I_{\text{Urbano}})$.
- Demonstração do simulador interativo na tela onde os pesos podem ser alterados para testar sensibilidade estatística.

---

### Slide 5: Propostas de Intervenção e Conclusão (2 min)
- Curto prazo: Busca ativa para a Tarifa Social de Energia Elétrica (TSEE).
- Médio prazo: Regularização de redes de baixa tensão e iluminação pública nos becos.
- Longo prazo: Eficiência energética comunitária e telhados reflexivos (*Cool Roofs*).
- Espaço aberto para perguntas do professor Celso Barreto.
