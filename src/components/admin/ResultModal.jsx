import { useState, useEffect, useRef } from 'react';
import Button from '../common/Button';
import { uploadImage } from '../../services/cloudinaryService';

const ResultModal = ({ isOpen, onClose, onSave, result = null, markets = [] }) => {
  const [formData, setFormData] = useState({
    market: '',
    description: '',
    imageUrl: ''
  });
  
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Populate form on open/edit
  useEffect(() => {
    if (result) {
      setFormData(result);
      setPreviewUrl(result.imageUrl || '');
      setFile(null);
    } else {
      setFormData({
        market: markets.length > 0 ? markets[0].slug : '',
        description: '',
        imageUrl: ''
      });
      setPreviewUrl('');
      setFile(null);
    }
  }, [result, isOpen, markets]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create local preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.market) {
      alert("Please select a market.");
      return;
    }
    if (!formData.description) {
      alert("Please enter a description.");
      return;
    }
    if (!file && !formData.imageUrl) {
      alert("Please select an image to upload.");
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = formData.imageUrl;
      
      // If there's a new file, upload it to Cloudinary first
      if (file) {
        finalImageUrl = await uploadImage(file);
      }

      // Save to Firestore
      const finalData = {
        ...formData,
        imageUrl: finalImageUrl
      };
      
      await onSave(finalData);
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to save result. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-bg-secondary w-full max-w-2xl rounded-2xl border border-border shadow-2xl overflow-hidden my-8">
        <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-bg-secondary z-10">
          <h2 className="text-xl font-bold text-text-primary">
            {result ? 'Edit Trading Result' : 'Upload Trading Result'}
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-accent-red transition-colors">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload Area */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Result Screenshot (Before & After)</label>
            
            <div 
              onClick={triggerFileInput}
              className={`w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-colors ${
                previewUrl ? 'border-accent-gold/50 bg-bg-primary' : 'border-border hover:border-accent-gold/50 hover:bg-bg-tertiary h-48'
              }`}
            >
              {previewUrl ? (
                <div className="relative w-full">
                  <img src={previewUrl} alt="Preview" className="w-full h-auto object-contain max-h-96" />
                  <div className="absolute inset-0 bg-bg-primary/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-bg-secondary px-4 py-2 rounded-full text-sm font-bold border border-border">Click to change image</span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6">
                  <span className="text-4xl mb-2 block">📸</span>
                  <p className="text-text-primary font-medium">Click to upload image</p>
                  <p className="text-text-muted text-sm mt-1">Supports JPG, PNG, WebP (Max 10MB)</p>
                </div>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Market Category</label>
              <select
                name="market"
                value={formData.market}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              >
                <option value="" disabled>Select a market...</option>
                {markets.map(m => (
                  <option key={m.id} value={m.slug}>{m.icon} {m.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Prediction Description & Outcome</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold resize-y"
                placeholder="Describe the technical setup, entry/exit points, and the final outcome of the trade..."
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-border">
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Uploading & Saving...' : (result ? 'Save Changes' : 'Upload Result')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultModal;
