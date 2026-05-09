import { useState, useEffect } from 'react';
import { useStatistics } from '../../hooks/useStatistics';
import { updateStatistics } from '../../services/statisticsService';
import Button from '../../components/common/Button';

const Dashboard = () => {
  const { statistics, loading, error, refetch } = useStatistics();
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Sync formData when statistics loads
  useEffect(() => {
    if (statistics) {
      setFormData(statistics);
    }
  }, [statistics]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value) // All stats are numbers
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Remove id from payload if it exists
      const { id, createdAt, updatedAt, ...cleanData } = formData;
      await updateStatistics(cleanData);
      await refetch();
      setSaveMessage('Statistics updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000); // Clear message after 3 seconds
    } catch (err) {
      console.error(err);
      setSaveMessage('Error updating statistics. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="text-text-secondary animate-pulse p-4">Loading dashboard...</div>;
  if (error) return <div className="text-accent-red p-4">Error loading dashboard: {error}</div>;

  const statCards = [
    { label: 'Total Trades', value: statistics.totalTrades, icon: '📊' },
    { label: 'Success Rate (%)', value: `${statistics.successRate}%`, icon: '🎯' },
    { label: 'Active Markets', value: statistics.marketsCount, icon: '🌍' },
    { label: 'Happy Clients', value: statistics.happyClients, icon: '🤝' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Dashboard Overview</h1>
        <p className="text-text-secondary mt-1 text-sm md:text-base">Welcome to your control center. Here is a snapshot of your current public metrics.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-bg-secondary p-6 rounded-2xl border border-border shadow-lg flex items-center gap-4 hover:border-accent-gold/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-bg-primary flex items-center justify-center text-2xl border border-border">
              {stat.icon}
            </div>
            <div>
              <p className="text-text-muted text-xs uppercase tracking-wider font-semibold">{stat.label}</p>
              <p className="text-2xl font-bold text-text-primary font-space">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Editor */}
      <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden shadow-lg mt-8">
        <div className="p-6 border-b border-border bg-bg-tertiary/50">
          <h2 className="text-lg font-bold text-text-primary">Edit Public Statistics</h2>
          <p className="text-text-secondary text-sm mt-1">These numbers are displayed prominently on the public landing page.</p>
        </div>
        
        <form onSubmit={handleSave} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Total Trades Executed</label>
              <input
                type="number"
                name="totalTrades"
                value={formData.totalTrades || 0}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-4 py-2 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Success Rate (%)</label>
              <input
                type="number"
                name="successRate"
                value={formData.successRate || 0}
                onChange={handleChange}
                min="0"
                max="100"
                required
                className="w-full px-4 py-2 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Active Markets Tracked</label>
              <input
                type="number"
                name="marketsCount"
                value={formData.marketsCount || 0}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-4 py-2 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Happy Clients</label>
              <input
                type="number"
                name="happyClients"
                value={formData.happyClients || 0}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-4 py-2 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Years Active</label>
              <input
                type="number"
                name="yearsActive"
                value={formData.yearsActive || 0}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-4 py-2 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

          </div>

          <div className="mt-8 flex items-center justify-end gap-4 border-t border-border pt-6">
            {saveMessage && (
              <span className={`text-sm font-medium ${saveMessage.includes('Error') ? 'text-accent-red' : 'text-accent-green'}`}>
                {saveMessage}
              </span>
            )}
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Update Statistics'}
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Dashboard;
