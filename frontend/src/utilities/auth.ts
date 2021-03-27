export const LOCAL_STORAGE_EMAIL_KEY = 'email-credentials';
export const LOCAL_STORAGE_IS_AUTHENTICATED = 'isAuthenticated';

export const isAuthenticated = (): boolean =>
  localStorage.getItem(LOCAL_STORAGE_IS_AUTHENTICATED) === 'true';

export const loginWithEmail = (email: string, password: string): boolean => {
  const credentials = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);
  if (!credentials) {
    return false;
  }
  const emailPairs = JSON.parse(credentials);

  if (emailPairs[email] === password) {
    localStorage.setItem(LOCAL_STORAGE_IS_AUTHENTICATED, 'true');
    return true;
  }
  return false;
};

function loginWithServiceProvider(): boolean {
  localStorage.setItem(LOCAL_STORAGE_IS_AUTHENTICATED, 'true');
  return true;
}

export {
  loginWithServiceProvider as loginWithGoogle,
  loginWithServiceProvider as loginWithGithub,
};

export const logout = (): void => {
  localStorage.setItem(LOCAL_STORAGE_IS_AUTHENTICATED, 'false');
};

export const registerEmail = (email: string, password: string): boolean => {
  const credentials = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);
  const emailPairs = credentials ? JSON.parse(credentials) : {};
  if (emailPairs[email]) {
    return false;
  }
  emailPairs[email] = password;
  localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, JSON.stringify(emailPairs));
  localStorage.setItem(LOCAL_STORAGE_IS_AUTHENTICATED, 'true');
  return true;
};

export const sendPasswordResetEmail = (email: string): boolean => {
  const credentials = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);
  if (!credentials) {
    return false;
  }
  const emailPairs = JSON.parse(credentials);
  return emailPairs[email];
};
