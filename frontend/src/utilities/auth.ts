export const LOCAL_STORAGE_EMAIL_KEY = 'email-credentials';

let isUserAuthenticated = false;
export const isAuthenticated = (): boolean => isUserAuthenticated;

export const loginWithEmail = (email: string, password: string): boolean => {
  const credentials = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);
  if (!credentials) {
    return false;
  }
  const emailPairs = JSON.parse(credentials);

  if (emailPairs[email] === password) {
    isUserAuthenticated = true;
    return true;
  }
  return false;
};

function loginWithServiceProvider(): boolean {
  isUserAuthenticated = true;
  return true;
}

export {
  loginWithServiceProvider as loginWithGoogle,
  loginWithServiceProvider as loginWithGithub,
};

export const logout = (): void => {
  isUserAuthenticated = false;
};

export const registerEmail = (email: string, password: string): boolean => {
  const credentials = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);
  const emailPairs = credentials ? JSON.parse(credentials) : {};
  if (emailPairs[email]) {
    return false;
  }
  emailPairs[email] = password;
  localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, JSON.stringify(emailPairs));
  isUserAuthenticated = true;
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
