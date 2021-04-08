import { auth, signInWithGitHub, signInWithGoogle } from '../firebase';

export const LOCAL_STORAGE_EMAIL_KEY = 'email-credentials';
export const LOCAL_STORAGE_IS_AUTHENTICATED = 'isAuthenticated';

export const isAuthenticated = (): boolean => !!auth.currentUser;

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

export const loginWithGithub = async (): Promise<string | null> => {
  try {
    await signInWithGitHub();
    return null;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const loginWithGoogle = async (): Promise<string | null> => {
  try {
    await signInWithGoogle();
    return null;
  } catch (error) {
    return error.message;
  }
};

export const logout = async (): Promise<void> => await auth.signOut();

export const registerEmail = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    return null;
  } catch (error) {
    return error.message;
  }
};

export const sendPasswordResetEmail = (email: string): boolean => {
  const credentials = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);
  if (!credentials) {
    return false;
  }
  const emailPairs = JSON.parse(credentials);
  return emailPairs[email];
};
