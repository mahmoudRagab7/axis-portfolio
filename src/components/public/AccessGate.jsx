import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscriber } from '../../hooks/useSubscriber';
import { Lock, Key, Loader2, ArrowRight } from 'lucide-react';

const AccessGate = ({ onClose }) => {
  const { t } = useTranslation();
  const { login, loading: authLoading } = useSubscriber();
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const result = await login(token.trim());
      if (result.success) {
        setSuccess(true);
        // The isSubscribed state will update globally and hide this overlay
      } else {
        setError(t('access_gate.token_error'));
        setToken('');
      }
    } catch (err) {
      setError(t('access_gate.token_error'));
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    // Note: If inside full-screen overlay, the user can click this and scroll, but we might want to close the overlay.
    // We'll let the user manually close the overlay or we could pass an onClose prop.
  };

  return (
    <div className="bg-bg-secondary p-8 rounded-2xl w-full shadow-2xl border border-border text-center transform transition-all relative">
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-8 h-8 flex items-center justify-center rounded-full bg-bg-primary border border-border text-text-muted hover:text-text-primary hover:border-accent-gold/50 transition-all"
          aria-label="Close"
        >
          ✕
        </button>
      )}
        <div className="w-16 h-16 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-accent-gold/30">
          <Lock className="w-8 h-8 text-accent-gold" />
        </div>
        
        <h3 className="text-2xl font-bold text-text-primary mb-2">
          {t('access_gate.locked_title')}
        </h3>
        <p className="text-text-secondary mb-8">
          {t('access_gate.locked_desc')}
        </p>

        {success ? (
          <div className="bg-green-500/20 text-green-400 p-4 rounded-xl font-medium border border-green-500/30">
            {t('access_gate.token_success')}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left pointer-events-auto">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                {t('access_gate.token_label')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder={t('access_gate.token_placeholder')}
                  className={`w-full pl-10 pr-4 py-3 bg-bg-primary border ${error ? 'border-red-500' : 'border-border'} rounded-xl text-text-primary focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors`}
                  dir="ltr"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting || !token.trim() || authLoading}
              className="w-full bg-accent-gold hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting || authLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                t('access_gate.token_submit')
              )}
            </button>
            
            <button
              type="button"
              onClick={scrollToPricing}
              className="w-full bg-bg-primary hover:bg-bg-hover text-text-primary border border-border py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              {t('access_gate.view_plans')} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
  );
};

export default AccessGate;
