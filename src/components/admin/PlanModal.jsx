import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

const PlanModal = ({ isOpen, onClose, onSave, plan = null }) => {
  const { t } = useTranslation();
  
  const defaultFormData = {
    nameEn: '',
    nameAr: '',
    price: '',
    currency: 'USD',
    billingPeriodEn: '/ month',
    billingPeriodAr: '/ شهر',
    featuresEn: '',
    featuresAr: '',
    whatsappNumber: '',
    whatsappMessageEn: "Hi, I'm interested in the premium plan.",
    whatsappMessageAr: "مرحباً، أنا مهتم بالخطة المميزة.",
    isHighlighted: false,
    isActive: true,
    order: 0
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (plan) {
      setFormData({
        ...defaultFormData,
        ...plan,
        featuresEn: plan.featuresEn?.join('\n') || '',
        featuresAr: plan.featuresAr?.join('\n') || ''
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [plan, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const dataToSave = {
        ...formData,
        featuresEn: formData.featuresEn.split('\n').filter(f => f.trim() !== ''),
        featuresAr: formData.featuresAr.split('\n').filter(f => f.trim() !== ''),
      };
      await onSave(dataToSave);
      toast.success(plan ? t('admin.plans.success_edit', 'Plan updated successfully!') : t('admin.plans.success_add', 'Plan added successfully!'));
      onClose();
    } catch (error) {
      console.error('PlanModal submit error:', error);
      toast.error(error.message || t('errors.generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-base/80 backdrop-blur-sm">
      <div className="bg-bg-secondary w-full max-w-3xl rounded-2xl border border-border shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-bold text-text-primary">
            {plan ? t('admin.plans.edit_plan') : t('admin.plans.add_new')}
          </h2>
          <button 
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <form id="plan-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.plans.name')}</label>
                <input required type="text" name="nameEn" value={formData.nameEn} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.plans.name_ar')}</label>
                <input type="text" name="nameAr" value={formData.nameAr} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold" dir="rtl" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.plans.price')}</label>
                <input required type="text" name="price" value={formData.price} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.plans.currency')}</label>
                <input required type="text" name="currency" value={formData.currency} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.plans.order')}</label>
                <input required type="number" name="order" value={formData.order} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold" dir="ltr" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.plans.billing_period')}</label>
                <input required type="text" name="billingPeriodEn" value={formData.billingPeriodEn} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.plans.billing_period_ar')}</label>
                <input type="text" name="billingPeriodAr" value={formData.billingPeriodAr} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold" dir="rtl" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.plans.features')}</label>
                <textarea rows="5" name="featuresEn" value={formData.featuresEn} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold whitespace-pre-wrap" dir="ltr"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.plans.features_ar')}</label>
                <textarea rows="5" name="featuresAr" value={formData.featuresAr} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold whitespace-pre-wrap" dir="rtl"></textarea>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.plans.whatsapp')}</label>
              <input required type="text" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} placeholder="+1234567890" className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold" dir="ltr" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.plans.whatsapp_msg')}</label>
                <textarea rows="2" name="whatsappMessageEn" value={formData.whatsappMessageEn} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold" dir="ltr"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">{t('admin.plans.whatsapp_msg_ar')}</label>
                <textarea rows="2" name="whatsappMessageAr" value={formData.whatsappMessageAr} onChange={handleChange} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-gold" dir="rtl"></textarea>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 border-t border-border">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="isHighlighted" checked={formData.isHighlighted} onChange={handleChange} className="w-5 h-5 accent-accent-gold rounded cursor-pointer" />
                <span className="text-text-primary font-medium">{t('admin.plans.highlighted')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 accent-accent-gold rounded cursor-pointer" />
                <span className="text-text-primary font-medium">{t('admin.plans.is_active')}</span>
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
            form="plan-form"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl font-bold bg-accent-gold text-black hover:bg-yellow-500 transition-colors shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? t('common.loading') : t('admin.plans.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
