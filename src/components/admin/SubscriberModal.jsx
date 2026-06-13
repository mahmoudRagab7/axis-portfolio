import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { usePlans } from '../../hooks/usePlans';

const SubscriberModal = ({ isOpen, onClose, onSave, subscriber = null }) => {
  const { t } = useTranslation();
  const { plans } = usePlans();
  
  const generateToken = () => {
    return 'ax_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36).substr(4, 4);
  };

  const defaultFormData = {
    phone: '',
    planId: '',
    planNameEn: '',
    planNameAr: '',
    token: '',
    expiresAt: '', // yyyy-mm-dd
    note: '',
    isActive: true
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExpiry, setHasExpiry] = useState(false);

  useEffect(() => {
    if (subscriber) {
      let expiryDate = '';
      if (subscriber.expiresAt) {
        // Convert to yyyy-mm-dd
        const dateObj = subscriber.expiresAt.toMillis ? new Date(subscriber.expiresAt.toMillis()) : new Date(subscriber.expiresAt);
        expiryDate = dateObj.toISOString().split('T')[0];
        setHasExpiry(true);
      } else {
        setHasExpiry(false);
      }

      setFormData({
        ...defaultFormData,
        ...subscriber,
        expiresAt: expiryDate
      });
    } else {
      setFormData({
        ...defaultFormData,
        token: generateToken()
      });
      setHasExpiry(false);
    }
  }, [subscriber, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'planId') {
      const selectedPlan = plans.find(p => p.id === value);
      setFormData(prev => ({
        ...prev,
        planId: value,
        planNameEn: selectedPlan ? selectedPlan.nameEn : '',
        planNameAr: selectedPlan ? selectedPlan.nameAr : ''
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const dataToSave = {
        ...formData,
        expiresAt: hasExpiry && formData.expiresAt ? new Date(formData.expiresAt).getTime() : null
      };
      await onSave(dataToSave);
      toast.success(subscriber ? t('admin.subscribers.success_edit', 'Subscriber updated successfully!') : t('admin.subscribers.success_add', 'Subscriber added successfully!'));
      onClose();
    } catch (error) {
      console.error('SubscriberModal submit error:', error);
      toast.error(error.message || t('errors.generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(formData.token);
    toast.success(t('admin.subscribers.token_copied'));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-base/80 backdrop-blur-sm">
      <div className="bg-bg-secondary w-full max-w-2xl rounded-2xl border border-border shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-bold text-text-primary">
            {subscriber ? 'Edit Subscriber' : t('admin.subscribers.add_new')}
          </h2>
          <button 
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <form id="subscriber-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.subscribers.phone')}</label>
                <input required type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1234567890" className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.subscribers.plan')}</label>
                <select required name="planId" value={formData.planId} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold">
                  <option value="" disabled>Select a plan...</option>
                  {plans.map(p => (
                    <option key={p.id} value={p.id}>{p.nameEn}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.subscribers.token')}</label>
              <div className="flex gap-2">
                <input readOnly type="text" name="token" value={formData.token} className="flex-1 bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-accent-gold font-mono focus:outline-none" dir="ltr" />
                <button type="button" onClick={handleCopyToken} className="px-4 py-2 bg-bg-tertiary border border-border rounded-xl hover:bg-bg-hover text-text-primary font-medium transition-colors">
                  Copy
                </button>
                {!subscriber && (
                  <button type="button" onClick={() => setFormData(p => ({...p, token: generateToken()}))} className="px-4 py-2 bg-bg-tertiary border border-border rounded-xl hover:bg-bg-hover text-text-primary font-medium transition-colors">
                    Generate
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={hasExpiry} onChange={(e) => setHasExpiry(e.target.checked)} className="w-5 h-5 accent-accent-gold rounded cursor-pointer" />
                <span className="text-text-primary font-medium">{t('admin.subscribers.set_expiry')}</span>
              </label>

              {hasExpiry && (
                <div>
                  <input type="date" name="expiresAt" value={formData.expiresAt} onChange={handleChange} required={hasExpiry} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold dark:[color-scheme:dark]" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.subscribers.note')}</label>
              <textarea rows="2" name="note" value={formData.note} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold"></textarea>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 border-t border-border">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 accent-accent-gold rounded cursor-pointer" />
                <span className="text-text-primary font-medium">Is Active (Token Valid)</span>
              </label>
            </div>

          </form>
        </div>
        
        <div className="p-6 border-t border-border flex justify-end gap-4 bg-bg-secondary rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
          >
            {t('admin.plans.cancel')}
          </button>
          <button
            type="submit"
            form="subscriber-form"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl font-bold bg-accent-gold text-black hover:bg-yellow-500 transition-colors shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? t('common.loading') : 'Save Subscriber'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriberModal;
