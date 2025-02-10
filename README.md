# KYC Frontend Application

A Vue.js frontend application for managing KYC (Know Your Customer) requests.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Running backend API server (default: http://localhost:3000)

## Setup Instructions

1. Install dependencies:

```bash
npm install
# or
yarn
```

2. Configure environment variables:

   - Copy `.env` file to `.env.local` (if you need to customize)
   - Update `VITE_API_URL` if your backend runs on a different URL

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

## Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia (State Management)
- TailwindCSS
- Vue Query
- Vee-validate + Yup
