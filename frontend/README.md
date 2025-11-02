# Recipe Application

A modern, full-featured recipe browsing application built with React, TypeScript, and Tailwind CSS. This application allows users to discover, search, and explore recipes from around the world with an intuitive interface and powerful filtering capabilities.

## Features

### 🔐 Authentication
- **User Registration**: Create a new account with email and password
- **User Login**: Secure login system with form validation
- **Protected Routes**: All recipe pages require authentication to access
- **Session Persistence**: User sessions are maintained across page refreshes

### 🔍 Recipe Discovery
- **Recipe Browsing**: Browse through a collection of recipes with beautiful cards
- **Advanced Search**: Search recipes by name, cuisine, ingredients, tags, or difficulty
- **Multiple Filters**: Filter recipes by:
  - Tags (multiple selection)
  - Difficulty level
  - Cuisine type
  - Meal type
- **Sorting**: Sort recipes by cook time (ascending/descending)
- **Pagination**: Navigate through recipes with pagination controls

### 📱 Recipe Details
- **Detailed View**: View complete recipe information including:
  - High-quality recipe images
  - Ingredients list
  - Step-by-step instructions
  - Prep and cook times
  - Serving information
  - Nutritional information (calories)
  - Ratings and reviews
  - Tags and meal types

### 🎨 User Interface
- **Modern Design**: Built with shadcn/ui components for a polished look
- **Responsive Layout**: Fully responsive design that works on all devices
- **Loading States**: Smooth loading indicators during data fetching
- **Error Handling**: User-friendly error messages

## Tech Stack

### Core Technologies
- **React 18.3**: Modern React with hooks and functional components
- **TypeScript 5.8**: Type-safe development
- **Vite 5.4**: Fast build tool and dev server
- **React Router 6.30**: Client-side routing

### UI & Styling
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **shadcn/ui**: High-quality React component library
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

### State Management & Forms
- **React Hook Form 7.61**: Performant form handling
- **Zod 3.25**: Schema validation
- **TanStack Query 5.83**: Server state management

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **SWC**: Fast compilation

## Project Structure

```
frontend/
├── public/              # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/      # Reusable components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Pagination.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── RecipeCard.tsx
│   │   ├── RecipeFilters.tsx
│   │   └── SearchBar.tsx
│   ├── contexts/        # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useRecipes.ts
│   ├── lib/             # Utility functions
│   │   └── utils.ts
│   ├── pages/           # Page components
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── RecipeDetail.tsx
│   │   └── Signup.tsx
│   ├── types/           # TypeScript types
│   │   └── recipe.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # App entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **bun** package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
# or
yarn build
# or
bun build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
bun preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication

The application includes a complete authentication system:

1. **Sign Up**: Visit `/signup` to create a new account
   - Full name validation (minimum 2 characters)
   - Email validation
   - Password validation (minimum 6 characters)
   - Password confirmation matching

2. **Login**: Visit `/login` to sign in
   - Email validation
   - Password required

3. **Protected Routes**: All recipe pages (`/` and `/recipe/:id`) require authentication
   - Unauthenticated users are automatically redirected to `/login`

## API Integration

The application currently uses the DummyJSON API for recipe data:
- **Base URL**: `https://dummyjson.com/recipes`
- **Features**: Fetch recipes, recipe details

**Note**: In a production environment, you should replace the authentication logic and API endpoints with your own backend service.

## Customization

### Environment Variables

You can customize the API endpoints and other configuration by creating a `.env` file:

```env
VITE_API_URL=https://your-api-url.com
VITE_API_PORT=3000
```

### Styling

The application uses Tailwind CSS. Customize colors, spacing, and other design tokens in `tailwind.config.ts`.

### Components

The UI components are built with shadcn/ui. You can customize them in the `src/components/ui/` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For issues, questions, or contributions, please open an issue in the repository.

---

Built with ❤️ using React, TypeScript, and modern web technologies.

