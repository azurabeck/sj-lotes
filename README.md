## Getting Started
* First, run the development server:

```bash
npm run dev | yarn dev | pnpm dev | bun dev
```
* Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Files Structure

src/
│
├── app/                 # Roteamento do Next.js, baseado no App Router
│   ├── layout.tsx       # Layout global da aplicação
│   ├── page.tsx         # Página inicial
│   └── ...              # Outras rotas da aplicação
│
├── components/          # Componentes reutilizáveis
│   ├── Button.tsx       # Exemplo de componente de botão
│   └── ...              # Outros componentes
│
├── styles/              # Arquivos de estilos globais e Tailwind
│   ├── globals.css      # Estilos globais incluindo diretivas do Tailwind
│   └── tailwind.css     # Arquivo base do Tailwind (pode ser usado opcionalmente)
│
├── utils/               # Funções utilitárias e helpers
│   └── api.ts           # Funções de requisições para APIs
│
├── hooks/               # Custom hooks
│   └── useAuth.ts       # Exemplo de hook de autenticação
│
├── services/            # Integrações de serviços (ex: APIs)
│   └── apiService.ts    # Exemplo de serviço de API
│
└── types/               # Definições de tipos TypeScript
    └── index.ts         # Tipos globais ou específicos



## Deploy on Vercel

