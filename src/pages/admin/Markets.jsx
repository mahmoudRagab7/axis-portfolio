import { useState } from 'react';
import { useMarkets } from '../../hooks/useMarkets';
import { addMarket, updateMarket, deleteMarket } from '../../services/marketService';
import MarketModal from '../../components/admin/MarketModal';
import Button from '../../components/common/Button';

const Markets = () => {
  const { markets, loading, error, refetch } = useMarkets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMarket, setEditingMarket] = useState(null);

  const handleOpenModal = (market = null) => {
    setEditingMarket(market);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMarket(null);
  };

  const handleSaveMarket = async (marketData) => {
    if (editingMarket) {
      await updateMarket(marketData.slug, marketData);
    } else {
      await addMarket(marketData);
    }
    await refetch();
  };

  const handleDelete = async (slug, name) => {
    if (window.confirm(`Are you sure you want to delete the market "${name}"? This action cannot be undone.`)) {
      try {
        await deleteMarket(slug);
        await refetch();
      } catch (err) {
        console.error(err);
        alert("Failed to delete market.");
      }
    }
  };

  const handleToggleActive = async (market) => {
    try {
      await updateMarket(market.slug, { isActive: !market.isActive });
      await refetch();
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  if (loading) {
    return <div className="text-text-secondary animate-pulse p-4">Loading markets...</div>;
  }

  if (error) {
    return <div className="text-accent-red p-4">Error loading markets: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Manage Markets</h1>
          <p className="text-text-secondary mt-1 text-sm md:text-base">Configure the financial markets covered in your portfolio.</p>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          + Add New Market
        </Button>
      </div>

      <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden shadow-lg overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-bg-tertiary border-b border-border">
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">Icon & Name</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">Slug</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">Order</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">Status</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {markets.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-text-secondary">
                  No markets found. Add one to get started.
                </td>
              </tr>
            ) : (
              markets.map((market) => (
                <tr key={market.id} className="hover:bg-bg-tertiary/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded bg-bg-primary border border-border flex items-center justify-center text-xl">
                        {market.icon}
                      </span>
                      <span className="font-medium text-text-primary">{market.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-text-muted font-mono text-sm">{market.slug}</td>
                  <td className="p-4 text-text-secondary">{market.order}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleToggleActive(market)}
                      className={`px-3 py-1 text-xs font-bold rounded-full border cursor-pointer transition-colors ${
                        market.isActive 
                          ? 'bg-accent-green/10 text-accent-green border-accent-green/30 hover:bg-accent-green/20' 
                          : 'bg-text-muted/10 text-text-muted border-text-muted/30 hover:bg-text-muted/20'
                      }`}
                    >
                      {market.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(market)}
                        className="p-2 text-text-secondary hover:text-accent-gold transition-colors"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(market.slug, market.name)}
                        className="p-2 text-text-secondary hover:text-accent-red transition-colors"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <MarketModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveMarket}
        market={editingMarket}
      />
    </div>
  );
};

export default Markets;
