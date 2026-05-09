import { useState, useEffect } from 'react';
import Button from '../common/Button';

const MarketModal = ({ isOpen, onClose, onSave, market = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: '',
    order: 1,
    isActive: true
  });

  const [loading, setLoading] = useState(false);

  // Populate form when editing an existing market
  useEffect(() => {
    if (market) {
      setFormData(market);
    } else {
      setFormData({ name: '', slug: '', icon: '📈', order: 1, isActive: true });
    }
  }, [market, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Auto-generate slug from name if slug is empty
  const handleNameBlur = () => {
    if (!formData.slug && formData.name) {
      const generatedSlug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save market. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/80 backdrop-blur-sm">
      <div className="bg-bg-secondary w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-bold text-text-primary">
            {market ? 'Edit Market' : 'Add New Market'}
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-accent-red transition-colors">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Market Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleNameBlur}
              required
              className="w-full px-4 py-2 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              placeholder="e.g. US Stock Market"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              URL Slug <span className="text-xs font-normal text-text-muted">(Must be unique)</span>
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              disabled={!!market} // Don't allow changing slug on edit as it's the document ID
              className="w-full px-4 py-2 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold disabled:opacity-50"
              placeholder="e.g. us-stocks"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Icon (Emoji/Text)</label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                placeholder="e.g. 🇺🇸"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Display Order</label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 accent-accent-gold"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-text-primary">
              Active (Visible on public site)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-border">
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Market'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarketModal;
