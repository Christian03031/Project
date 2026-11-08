# Pechehod — Restaurant Ordering App

A responsive restaurant ordering web application built with **React**, allowing users to browse meals, search for dishes, manage their shopping cart and place orders.

## Features

- **Meal browsing:** Explore meals by category and view detailed information.
- **Search & pagination:** Search for dishes with debounce and navigate through paginated results.
- **Shopping cart:** Add, remove and update meal quantities.
- **Order management:** Create and manage orders.
- **Data persistence:** Store cart and order information using localStorage.
- **User experience:** Responsive design, loading skeletons, modals and animations.

## Tech Stack

- React
- JavaScript (ES6+)
- React Router
- Context API & useReducer
- CSS3
- Motion
- Lucide React
- Vite
- TheMealDB API
- Vite

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Christian03031/Project.git
cd Project
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── basket/
│   ├── content/
│   │   ├── banner/
│   │   ├── dishes/
│   │   └── filter/
│   ├── items/
│   ├── navbar/
│   ├── order/
│   └── orders-list/
├── context/
├── App.jsx
└── main.jsx
```

## Future Improvements

- Improve API error handling and form validation.
- Add automated tests.
- Migrate to TypeScript.
- Integrate a backend and database.
- Implement user authentication and persistent order management.

## Demo live

[christian03031.github.io/Project/]()
