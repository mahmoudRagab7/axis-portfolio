import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { getSubscribers, addSubscriber, updateSubscriber, deleteSubscriber } from '../../services/subscriberService';
import SubscriberModal from '../../components/admin/SubscriberModal';
import Button from '../../components/common/Button';
import { useLanguage } from '../../hooks/useLanguage';

const Subscribers = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState(null);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const data = await getSubscribers();
      setSubscribers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleOpenModal = (sub = null) => {
    setEditingSubscriber(sub);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSubscriber(null);
  };

  const handleSaveSubscriber = async (subData) => {
    if (editingSubscriber) {
      await updateSubscriber(editingSubscriber.id, subData);
    } else {
      await addSubscriber(subData);
    }
    await fetchSubscribers();
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('admin.subscribers.delete_confirm'))) {
      try {
        await deleteSubscriber(id);
        toast.success(t('admin.subscribers.success_delete', 'Subscriber deleted successfully!'));
        await fetchSubscribers();
      } catch (err) {
        console.error(err);
        toast.error(err.message || t('errors.generic'));
      }
    }
  };

  const handleRevoke = async (sub) => {
    if (window.confirm(t('admin.subscribers.revoke_confirm'))) {
      try {
        await updateSubscriber(sub.id, { isActive: false });
        toast.success(t('admin.subscribers.success_revoke', 'Token revoked successfully!'));
        await fetchSubscribers();
      } catch (err) {
        console.error(err);
        toast.error(err.message || t('errors.generic'));
      }
    }
  };

  const copyToken = (token) => {
    navigator.clipboard.writeText(token);
    toast.success(t('admin.subscribers.token_copied'));
  };

  if (loading) {
    return <div className="text-text-secondary animate-pulse p-4">{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{t('admin.subscribers.title')}</h1>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          + {t('admin.subscribers.add_new')}
        </Button>
      </div>

      <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden shadow-lg overflow-x-auto">
        <table className="w-full text-left rtl:text-right border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-bg-tertiary border-b border-border">
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">{t('admin.subscribers.phone')}</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">{t('admin.subscribers.plan')}</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">{t('admin.subscribers.token')}</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider">{t('admin.subscribers.status')}</th>
              <th className="p-4 font-semibold text-text-muted uppercase text-xs tracking-wider text-right rtl:text-left">{t('admin.subscribers.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-text-secondary">
                  {t('common.no_results')}
                </td>
              </tr>
            ) : (
              subscribers.map((sub) => {
                let statusText = sub.isActive ? t('admin.subscribers.status_active') : t('admin.subscribers.status_revoked');
                let statusClass = sub.isActive ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10';
                
                if (sub.isActive && sub.expiresAt) {
                  const expiryTime = sub.expiresAt.toMillis ? sub.expiresAt.toMillis() : (typeof sub.expiresAt === 'number' ? sub.expiresAt : new Date(sub.expiresAt).getTime());
                  if (Date.now() > expiryTime) {
                    statusText = t('admin.subscribers.status_expired');
                    statusClass = 'text-yellow-500 bg-yellow-500/10';
                  }
                }

                return (
                  <tr key={sub.id} className="hover:bg-bg-tertiary/50 transition-colors">
                    <td className="p-4 font-medium text-text-primary" dir="ltr">
                      {sub.phone}
                    </td>
                    <td className="p-4 text-text-secondary">
                      {language === 'ar' ? sub.planNameAr || sub.planNameEn : sub.planNameEn}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2" dir="ltr">
                        <span className="font-mono text-sm text-accent-gold">{sub.token}</span>
                        <button onClick={() => copyToken(sub.token)} className="text-text-muted hover:text-text-primary" title="Copy Token">
                          📋
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusClass}`}>
                        {statusText}
                      </span>
                    </td>
                    <td className="p-4 text-right rtl:text-left space-x-3 rtl:space-x-reverse">
                      <button 
                        onClick={() => handleOpenModal(sub)}
                        className="text-text-secondary hover:text-accent-gold transition-colors font-medium text-sm"
                      >
                        Edit
                      </button>
                      {sub.isActive && (
                        <button 
                          onClick={() => handleRevoke(sub)}
                          className="text-text-secondary hover:text-yellow-500 transition-colors font-medium text-sm"
                        >
                          {t('admin.subscribers.revoke')}
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(sub.id)}
                        className="text-text-secondary hover:text-accent-red transition-colors font-medium text-sm"
                      >
                        {t('admin.subscribers.delete')}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <SubscriberModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSubscriber}
        subscriber={editingSubscriber}
      />
    </div>
  );
};

export default Subscribers;
