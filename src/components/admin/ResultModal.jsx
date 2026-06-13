import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import Button from '../common/Button';
import { uploadImage } from '../../services/cloudinaryService';
import { useLanguage } from '../../hooks/useLanguage';

const ResultModal = ({ isOpen, onClose, onSave, result = null, markets = [] }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    market: '',
    description: '',
    descriptionAr: '',
    imageUrl: '',
    isFree: false
  });
  
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Populate form on open/edit
  useEffect(() => {
    if (result) {
      setFormData({
        market: result.market || '',
        description: result.description || '',
        descriptionAr: result.descriptionAr || '',
        imageUrl: result.imageUrl || '',
        isFree: result.isFree === true
      });
      setPreviewUrl(result.imageUrl || '');
      setFile(null);
    } else {
      setFormData({
        market: markets.length > 0 ? markets[0].slug : '',
        description: '',
        descriptionAr: '',
        imageUrl: '',
        isFree: false
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
    
    // Validation — each failure shows a specific, clear message
    if (!formData.market) {
      toast.error(t('errors.validation_market'));
      return;
    }
    if (!formData.description.trim()) {
      toast.error(t('errors.validation_description_en'));
      return;
    }
    if (!formData.descriptionAr.trim()) {
      toast.error(t('errors.validation_description_ar'));
      return;
    }
    if (!file && !formData.imageUrl) {
      toast.error(t('errors.validation_image'));
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
      toast.success(t('admin.results.saved', 'Result saved successfully!'));
      onClose();
    } catch (error) {
      console.error('ResultModal error:', error);
      toast.error(error.message || t('errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-bg-secondary w-full max-w-2xl rounded-2xl border border-border shadow-2xl overflow-hidden my-8">
        <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-bg-secondary z-10">
          <h2 className="text-xl font-bold text-text-primary">
            {result ? t('admin.results.edit_result') : t('admin.results.add_new')}
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-accent-red transition-colors">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload Area */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">{t('admin.results.before_image')}</label>
            
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
                    <span className="bg-bg-secondary px-4 py-2 rounded-full text-sm font-bold border border-border">{t('admin.results.click_to_change')}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6">
                  <span className="text-4xl mb-2 block">📸</span>
                  <p className="text-text-primary font-medium">{t('admin.results.click_to_upload')}</p>
                  <p className="text-text-muted text-sm mt-1">{t('admin.results.upload_hint')}</p>
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
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('admin.results.market')}</label>
              <select
                name="market"
                value={formData.market}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              >
                <option value="" disabled>{t('admin.results.select_market')}</option>
                {markets.map(m => (
                  <option key={m.id} value={m.slug}>
                    {m.icon} {language === 'ar' ? (m.nameAr || m.name) : m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('admin.results.description')} (English)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold resize-y"
                placeholder="Describe the technical setup, entry/exit points, and the final outcome of the trade..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('admin.results.description')} (Arabic)</label>
              <textarea
                name="descriptionAr"
                value={formData.descriptionAr}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-gold resize-y"
                placeholder="صف تفاصيل الصفقة، نقاط الدخول والخروج، والنتيجة النهائية باللغة العربية..."
                dir="rtl"
              ></textarea>
            </div>
          </div>

          {/* Free / Premium Toggle */}
          <div className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
            formData.isFree
              ? 'border-green-500/40 bg-green-500/5'
              : 'border-accent-gold/30 bg-accent-gold/5'
          }`}
            onClick={() => setFormData(prev => ({ ...prev, isFree: !prev.isFree }))}
          >
            <div className={`mt-0.5 w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${formData.isFree ? 'bg-green-500' : 'bg-accent-gold/40'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${formData.isFree ? 'left-6' : 'left-0.5'}`} />
            </div>
            <div>
              <p className={`font-bold text-sm ${formData.isFree ? 'text-green-400' : 'text-accent-gold'}`}>
                {formData.isFree ? `🔓 ${t('admin.results.free_result', 'Free Result')}` : `🔒 ${t('admin.results.premium_result', 'Premium Result')}`}
              </p>
              <p className="text-text-muted text-xs mt-0.5">
                {formData.isFree
                  ? t('admin.results.free_desc', 'Visible to all visitors without a subscription')
                  : t('admin.results.premium_desc', 'Blurred for non-subscribers — requires access token')
                }
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-border">
            <Button variant="secondary" onClick={onClose} type="button">
              {t('admin.results.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? t('admin.results.uploading') : (result ? t('admin.results.save') : t('admin.results.add_new'))}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultModal;
