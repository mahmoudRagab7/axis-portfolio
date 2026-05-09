import { useEffect, useState } from 'react';
import { addMarket } from '../services/marketService';
import { updateStatistics } from '../services/statisticsService';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import Button from '../components/common/Button';

const SeedData = () => {
  const [status, setStatus] = useState('Idle');
  const [email, setEmail] = useState('mahmoud.ragab187@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const defaultMarkets = [
    { name: "US Stock Market", slug: "us", icon: "🇺🇸", order: 1, isActive: true },
    { name: "Egyptian Exchange", slug: "egypt", icon: "🇪🇬", order: 2, isActive: true },
    { name: "Saudi Market (Tadawul)", slug: "saudi", icon: "🇸🇦", order: 3, isActive: true },
    { name: "Cryptocurrencies", slug: "crypto", icon: "₿", order: 4, isActive: true },
    { name: "Forex Trading", slug: "forex", icon: "💱", order: 5, isActive: true },
  ];

  const defaultStats = {
    totalTrades: 1500,
    successRate: 89,
    marketsCount: 5,
    yearsActive: 4,
    happyClients: 300
  };

  const seedDatabase = async (e) => {
    e.preventDefault();
    setStatus('Authenticating...');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      setStatus('Seeding Markets...');
      for (const market of defaultMarkets) {
        await addMarket(market);
      }
      
      setStatus('Seeding Statistics...');
      await updateStatistics(defaultStats);
      
      setStatus('Success! Database seeded. You can close this page.');
    } catch (error) {
      console.error(error);
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12 bg-bg-primary">
      <div className="bg-bg-secondary p-8 rounded-2xl border border-border max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 text-text-primary">Database Seeder</h1>
        <p className="text-sm text-text-secondary mb-6">You must log in as admin to write to the database due to security rules.</p>
        
        <form onSubmit={seedDatabase} className="flex flex-col gap-4">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
            placeholder="Admin Email"
            required
          />
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              placeholder="Admin Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            </button>
          </div>
          
          <Button type="submit" variant="primary" className="mt-2 w-full">
            Authenticate & Seed Database
          </Button>
        </form>
        <p className="mt-6 text-sm font-mono text-accent-gold text-center">{status}</p>
      </div>
    </div>
  );
};

export default SeedData;
