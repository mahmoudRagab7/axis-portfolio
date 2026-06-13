import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { useLanguage } from './hooks/useLanguage';
import { Toaster } from 'react-hot-toast';

function App() {
  // Initialize and sync global language and RTL direction
  useLanguage();

  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-bg-primary text-text-primary font-inter transition-colors duration-300">
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1A1D24', // bg-secondary approx
              color: '#F0B90B', // accent-gold approx
              border: '1px solid #2B3139'
            },
          }} 
        />
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
