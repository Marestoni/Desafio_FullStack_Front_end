Meu Projeto React + Vite
Um projeto moderno desenvolvido com React 19, Vite, TypeScript e Tailwind CSS, seguindo as melhores práticas de desenvolvimento para uma aplicação fullstack.

🚀 Recursos Implementados
Tecnologias e Ferramentas
React 19 - Última versão do React com recursos avançados

Vite - Build tool rápida e eficiente

TypeScript - Tipagem estática para JavaScript

Tailwind CSS - Framework CSS utilitário

React Router DOM - Roteamento para aplicações single-page

Zustand - Gerenciamento de estado leve e simples

TanStack Query - Gerenciamento de estado do servidor e cache

ESLint - Linter para manter a qualidade do código

Estrutura do Projeto
text
src/
├── components/          # Componentes reutilizáveis
│   ├── layout/         # Componentes de layout (Header, Sidebar, Layout)
│   └── ui/             # Componentes de UI (Button, Input, StatCard)
├── hooks/              # Custom hooks (useAuth)
├── pages/              # Páginas da aplicação
│   ├── Dashboard/      # Página do dashboard
│   ├── Home/           # Página inicial
│   ├── Login/          # Página de login
│   ├── UserDetail/     # Detalhes do usuário
│   └── Users/          # Lista de usuários
├── providers/          # Providers React (QueryProvider)
├── routes/             # Configuração de rotas (AppRoutes)
├── services/           # Serviços API (api, auth, events, sync, users)
├── store/              # Gerenciamento de estado (auth.store)
├── types/              # Definições TypeScript (auth.types, user.types)
└── utils/              # Utilitários (constants)
Funcionalidades Principais
⚡️ Desenvolvimento rápido com HMR (Hot Module Replacement)

🎨 Estilização avançada com Tailwind CSS

📱 Design responsivo para todos os dispositivos

🔒 Sistema de autenticação com gerenciamento de estado

👥 Gestão de usuários com listagem e detalhes

📊 Dashboard com métricas e estatísticas

🔄 Sincronização de dados em tempo real

🎯 TypeScript para type safety completo

📦 Build otimizado para produção

Configurações da API
O projeto está configurado para se conectar com uma API backend:

typescript
// utils/constants.ts
export const API_CONFIG = {
  BASE_URL: 'https://localhost:7000/api',  // URL da API backend
  STALE_TIME: 5 * 60 * 1000,               // 5 minutos para dados considerados frescos
  CACHE_TIME: 10 * 60 * 1000,              // 10 minutos de cache
};

export const QUERY_KEYS = {
  USERS: 'users',
  USER: 'user',
  EVENTS: 'events',
  AUTH: 'auth',
} as const;
Páginas e Rotas
Home - Página inicial da aplicação

Login - Autenticação de usuários

Dashboard - Painel administrativo com métricas

Users - Listagem de usuários

UserDetail - Detalhes e edição de usuário

🛠 Como Rodar o Projeto
Pré-requisitos
Node.js v24.11.1 ou superior

npm ou yarn

Backend API rodando em https://localhost:7000

Instalação e Execução
Clone o repositório

bash
git clone <url-do-repositorio>
cd desafio_fullstack_front_end
Instale as dependências

bash
npm install
# ou
yarn install
Certifique-se que o backend está rodando

bash
# O backend deve estar rodando em https://localhost:7000
# para que as chamadas API funcionem corretamente
Execute em modo de desenvolvimento

bash
npm run dev
# ou
yarn dev
Acesse a aplicação
Abra http://localhost:5173 no seu navegador.

Configuração do Backend
Para que a aplicação funcione corretamente, você precisa:

Iniciar o servidor backend na porta 7000 com HTTPS

Configurar CORS no backend para aceitar requisições do frontend

Certificar que os endpoints da API estão disponíveis em https://localhost:7000/api

Comandos Disponíveis
bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build de produção

# Qualidade de código
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas automaticamente

📦 Scripts do package.json
json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit"
  }
}

🔧 Configurações Especiais
TypeScript
Configuração estrita habilitada

Path mapping para imports absolutos

Tipagem completa para todas as funcionalidades

Tailwind CSS
Configuração customizada

Design system consistente

Classes utilitárias otimizadas

Vite
Build otimizado para produção

Code splitting automático

Asset handling eficiente

TanStack Query
Cache configurado com stale time de 5 minutos

Cache time de 10 minutos

Query keys centralizadas para melhor manutenção

🚀 Deploy
Build para Produção
bash
npm run build
Preview do Build
bash
npm run preview
Configuração para Produção
Para deploy em produção, atualize a API_CONFIG.BASE_URL no arquivo utils/constants.ts para apontar para a URL da API em produção.

O build de produção será gerado na pasta dist/ e estará pronto para deploy em qualquer servidor web estático ou plataforma como Vercel, Netlify, etc.

Desenvolvido com React 19 + Vite + TypeScript + Tailwind CSS