import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { usePlans } from '../../hooks/usePlans';
import { addPlan, updatePlan, deletePlan } from '../../services/planService';
import PlanModal from '../../components/admin/PlanModal';
import Button from '../../components/common/Button';
import { useLanguage } from '../../hooks/useLanguage';

const Plans = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { plans, loading, error, refetch } = usePlans();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleOpenModal = (plan = null) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handleSavePlan = async (planData) => {
    if (editingPlan) {
      await updatePlan(editingPlan.id, planData);
    } else {
      await addPlan(planData);
    }
    await refetch();
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('admin.plans.delete_confirm'))) {
      try {
        await deletePlan(id);
        toast.success(t('admin.plans.success_delete', 'Plan deleted successfully!'));
        await refetch();
      } catch (err) {
        console.error(err);
        toast.error(err.message || t('errors.generic'));
      }
    }
  };

  const handleToggleActive = async (plan) => {
    try {
      await updatePlan(plan.id, { isActive: !plan.isActive });
      toast.success(t('admin.plans.success_edit', 'Plan updated successfully!'));
      await refetch();
    } catch (err) {
      console.error(err);
      toast.error(err.message || t('errors.generic'));
    }
  };

  if (loading) {
    return <div className="text-text-secondary animate-pulse p-4">{t('common.loading')}</div>;
  }

  if (error) {
    return <div className="text-accent-red p-4">{t('errors.generic')}: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{t('admin.plans.title')}</h1>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          + {t('admin.plans.add_new')}
        </Button>
      </div>

      <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden shadow-lg overflow-x-auto">
        <table className="w-full text-left rtl:text-right border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-bg-tertiary border-b border-border">
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">{t('admin.plans.name')}</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">{t('admin.plans.price')}</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">{t('admin.plans.order')}</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">Status</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider text-right rtl:text-left">{t('admin.plans.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {plans.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-text-secondary">
                  {t('common.no_results')}
                </td>
              </tr>
            ) : (
              plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-bg-tertiary/50 transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-text-primary">{language === 'ar' ? plan.nameAr || plan.nameEn : plan.nameEn}</span>
                      {plan.isHighlighted && <span className="text-xs text-accent-gold font-medium mt-1">⭐ {t('admin.plans.highlighted')}</span>}
                    </div>
                  </td>
                  <td className="p-4 text-text-secondary">
                    {plan.price} {plan.currency} <span className="text-xs text-text-muted">{language === 'ar' ? plan.billingPeriodAr || plan.billingPeriodEn : plan.billingPeriodEn}</span>
                  </td>
                  <td className="p-4 text-text-secondary">
                    {plan.order}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(plan)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${plan.isActive ? 'bg-accent-gold' : 'bg-bg-tertiary border border-border'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${plan.isActive ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'}`} />
                    </button>
                  </td>
                  <td className="p-4 text-right rtl:text-left space-x-3 rtl:space-x-reverse">
                    <button 
                      onClick={() => handleOpenModal(plan)}
                      className="text-text-secondary hover:text-accent-gold transition-colors font-medium text-sm"
                    >
                      {t('admin.plans.edit_plan')}
                    </button>
                    <button 
                      onClick={() => handleDelete(plan.id)}
                      className="text-text-secondary hover:text-accent-red transition-colors font-medium text-sm"
                    >
                      {t('admin.results.delete')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PlanModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePlan}
        plan={editingPlan}
      />
    </div>
  );
};

export default Plans;
