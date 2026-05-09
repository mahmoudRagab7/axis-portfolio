import { useState } from 'react';
import { useResults } from '../../hooks/useResults';
import { useMarkets } from '../../hooks/useMarkets';
import { addResult, updateResult, deleteResult } from '../../services/resultService';
import ResultModal from '../../components/admin/ResultModal';
import Button from '../../components/common/Button';

const Results = () => {
  const [filterMarket, setFilterMarket] = useState('all');
  const { results, loading: resultsLoading, error: resultsError, refetch: refetchResults } = useResults(filterMarket);
  const { markets, loading: marketsLoading } = useMarkets();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState(null);

  const handleOpenModal = (result = null) => {
    setEditingResult(result);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingResult(null);
  };

  const handleSaveResult = async (resultData) => {
    if (editingResult) {
      await updateResult(editingResult.id, resultData);
    } else {
      await addResult(resultData);
    }
    await refetchResults();
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete this result? This action cannot be undone.`)) {
      try {
        await deleteResult(id);
        await refetchResults();
      } catch (err) {
        console.error(err);
        alert("Failed to delete result.");
      }
    }
  };

  if (resultsLoading || marketsLoading) {
    return <div className="text-text-secondary animate-pulse p-4">Loading results...</div>;
  }

  if (resultsError) {
    return <div className="text-accent-red p-4">Error loading results: {resultsError}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Manage Results</h1>
          <p className="text-text-secondary mt-1 text-sm md:text-base">Upload and manage your successful trading predictions.</p>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          + Upload New Result
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-bg-secondary p-4 rounded-xl border border-border flex items-center gap-4">
        <label className="text-sm font-medium text-text-secondary whitespace-nowrap">Filter by Market:</label>
        <select
          value={filterMarket}
          onChange={(e) => setFilterMarket(e.target.value)}
          className="px-4 py-2 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold min-w-[200px]"
        >
          <option value="all">All Markets</option>
          {markets.map(m => (
            <option key={m.id} value={m.slug}>{m.icon} {m.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden shadow-lg overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-bg-tertiary border-b border-border">
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider w-32">Screenshot</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider w-40">Market</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">Description</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider w-32">Date</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider text-right w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {results.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-12 text-center text-text-secondary">
                  <div className="text-4xl mb-3">📈</div>
                  <p className="font-medium">No results found.</p>
                  <p className="text-sm mt-1 text-text-muted">Upload your first trading prediction to see it here.</p>
                </td>
              </tr>
            ) : (
              results.map((result) => {
                const marketData = markets.find(m => m.slug === result.market);
                const date = result.createdAt ? new Date(result.createdAt.seconds * 1000).toLocaleDateString() : 'Just now';
                
                return (
                  <tr key={result.id} className="hover:bg-bg-tertiary/50 transition-colors">
                    <td className="p-4">
                      <div className="w-24 h-16 rounded border border-border overflow-hidden bg-bg-primary flex items-center justify-center">
                        {result.imageUrl ? (
                          <img src={result.imageUrl} alt="Result Thumbnail" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-text-muted text-xs">No Image</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {marketData ? (
                        <div className="flex items-center gap-2">
                          <span>{marketData.icon}</span>
                          <span className="font-medium text-text-primary text-sm">{marketData.name}</span>
                        </div>
                      ) : (
                        <span className="text-text-muted italic text-sm">Unknown Market ({result.market})</span>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="text-text-secondary text-sm line-clamp-2 max-w-md">
                        {result.description}
                      </p>
                    </td>
                    <td className="p-4 text-text-muted text-sm">{date}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(result)}
                          className="p-2 text-text-secondary hover:text-accent-gold transition-colors"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDelete(result.id)}
                          className="p-2 text-text-secondary hover:text-accent-red transition-colors"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <ResultModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveResult}
        result={editingResult}
        markets={markets}
      />
    </div>
  );
};

export default Results;
