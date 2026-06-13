/**
 * Map Firebase error codes to translation keys
 * @param {object|string|Error} error - The error object or string returned from Firebase
 * @param {function} t - The translation function (useTranslation)
 * @returns {string} - The localized error message
 */
export const getLocalizedError = (error, t) => {
  if (!error) return t('errors.generic');

  const errorCode = typeof error === 'string' 
    ? error 
    : (error.code || error.message || '');

  console.log("Mapping error code:", errorCode);

  switch (errorCode) {
    case 'auth/invalid-email':
    case 'auth/invalid-email-address':
      return t('errors.auth_invalid_email');
    case 'auth/user-disabled':
      return t('errors.auth_user_disabled');
    case 'auth/user-not-found':
      return t('errors.auth_user_not_found');
    case 'auth/wrong-password':
      return t('errors.auth_wrong_password');
    case 'auth/invalid-credential':
      return t('errors.auth_invalid_credential', 'Invalid email or password. Access denied.');
    case 'auth/too-many-requests':
      return t('errors.auth_too_many_requests');
    case 'auth/network-request-failed':
      return t('errors.network_error');
    case 'upload_failed':
      return t('errors.upload_failed');
    default:
      // Fallback searches
      if (errorCode.includes('wrong-password') || errorCode.includes('invalid-credential')) {
        return t('errors.auth_invalid_credential', 'Invalid email or password. Access denied.');
      }
      if (errorCode.includes('user-not-found')) {
        return t('errors.auth_user_not_found');
      }
      if (errorCode.includes('network')) {
        return t('errors.network_error');
      }
      return t('errors.generic');
  }
};
