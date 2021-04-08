import { auth, signInWithGitHub, signInWithGoogle } from '../firebase';

export const isAuthenticated = (): boolean => !!auth.currentUser;

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return null;
  } catch (error) {
    return error.message;
  }
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

export const sendPasswordResetEmail = async (
  email: string
): Promise<string | null> => {
  try {
    auth.sendPasswordResetEmail(email);
    return null;
  } catch (error) {
    return error.message;
  }
};
