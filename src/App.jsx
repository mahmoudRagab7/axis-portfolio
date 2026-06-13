import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { useLanguage } from './hooks/useLanguage';

function App() {
  // Initialize and sync global language and RTL direction
  useLanguage();

  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-bg-primary text-text-primary font-inter transition-colors duration-300">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
