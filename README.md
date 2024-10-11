Here is an updated `README.md` file to reflect the new details based on the provided `package.json` configuration:

```markdown
# Netflix GPT

A React-based web application that uses GPT technology to provide enhanced features related to Netflix content. This project is built using Vite, TypeScript, Tailwind CSS, and is deployed on Vercel.

## Project Overview

Netflix GPT aims to enhance the user's experience by integrating GPT-based functionalities to explore and interact with Netflix content in a more engaging way.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Code Quality**: ESLint, Prettier
- **Deployment**: Vercel
- **Git Hooks**: Husky, lint-staged

## Features

- **React (18.x)**: For building the user interface.
- **TypeScript**: Provides static type checking.
- **Vite**: For fast development and build processes.
- **Tailwind CSS**: For styling.
- **GPT Integration**: Uses GPT models to provide interactive content-related features.
- **Code Quality Tools**:
  - **ESLint** for linting.
  - **Prettier** for code formatting.
  - **Husky** for managing Git hooks.
  - **lint-staged** for running linters on staged Git files.

## Getting Started
# Features

- Login/Sign Up
   - Sign In / Sign Up Form
   - redirect to Browe Page

- Browser (After authentication)
  - Header
  - Main Movie
    - Tailer in Background
    - Title $ Decription
    - Movie Suggestions
      - MovieLists into N
  - Use Layout to render children

- Neflix GPt
   - Search Bar
   - Movie Suggestions

    

### Prerequisites

Make sure you have the following installed:

- **Node.js** (>= 14.x)
- **npm** (>= 6.x) or **yarn**

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/brij1728/netflix-gpt.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd netflix-gpt
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

   or if you're using yarn:

   ```bash
   yarn install
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

or with yarn:

```bash
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the project for production, use:

```bash
npm run build
```

or with yarn:

```bash
yarn build
```

### Previewing the Production Build

To preview the built production version:

```bash
npm run preview
```

or with yarn:

```bash
yarn preview
```

### Linting

To lint the codebase, run:

```bash
npm run lint
```

### Git Hooks

This project uses Husky and lint-staged for managing Git hooks:

- **Husky**: Automatically runs pre-commit hooks.
- **lint-staged**: Runs ESLint and Prettier on staged files to ensure code quality.

To install the Git hooks, run:

```bash
npm run prepare
```

## Deployment

The project is deployed on Vercel and can be accessed live at: [Netflix GPT Live](https://netflixgpt-olive-ten.vercel.app/)

## Project Structure

```
src/
├─ assets/              # Static assets like images
├─ components/          # Reusable components
├─ App.tsx              # Main App component
├─ main.tsx             # Application entry point
├─ index.css            # Global styles including Tailwind CSS imports
public/
├─ index.html           # HTML entry file
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bug fixes or feature requests.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Links

- **GitHub Repository**: [https://github.com/brij1728/netflix-gpt](https://github.com/brij1728/netflix-gpt)
- **Live Demo**: [https://netflixgpt-olive-ten.vercel.app/](https://netflixgpt-olive-ten.vercel.app/)

```

This `README.md` file now includes all relevant information based on your updated project configuration, including scripts, dependencies, and features. Let me know if you'd like any further customizations!
