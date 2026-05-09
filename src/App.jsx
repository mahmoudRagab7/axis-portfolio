import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-bg-primary text-text-primary font-inter transition-colors duration-300">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
