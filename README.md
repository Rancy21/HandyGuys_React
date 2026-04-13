# HandyGuys

A React-based web application for a handyman service platform built with Vite.

## Tech Stack

- **Frontend**: React 18 + Vite
- **State Management**: Redux Toolkit + Redux Persist
- **Routing**: React Router v7
- **UI Framework**: Material UI (MUI) + Emotion
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Validation**: ESLint

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── admin pages/       # Admin dashboard pages
│   ├── Helpers.jsx
│   └── Users.jsx
├── components/       # Reusable components
│   ├── AdminSide.jsx
│   ├── Helper.jsx
│   ├── HelperCard.jsx
│   └── Sidebar.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   ├── ResetPassword.jsx
│   ├── Review.jsx
│   ├── ReviewsList.jsx
│   └── SignUp.jsx
├── store/           # Redux store
│   ├── store.jsx
│   └── userSlice.jsx
├── css/             # Component-specific CSS
├── App.jsx           # Root component
├── main.jsx         # Entry point
└── routes.tsx       # Route definitions
```

## Features

- User authentication (Login/SignUp)
- Profile management
- Service reviews and ratings
- Admin dashboard for managing helpers and users