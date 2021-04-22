import firebase, {
  auth,
  signInWithGitHub,
  signInWithGoogle,
} from '../firebase';

const LOCALSTORAGE_AUTHORIZED_USER = 'authorized_user';

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
    await auth.sendPasswordResetEmail(email);
    return null;
  } catch (error) {
    return error.message;
  }
};

let user: firebase.User | null = (() => {
  const value = localStorage.getItem(LOCALSTORAGE_AUTHORIZED_USER);
  if (!value) {
    return null;
  }
  return JSON.parse(value);
})();

auth.onAuthStateChanged(newUser => {
  if (newUser && !newUser.emailVerified) {
    newUser.sendEmailVerification();
    logout();
    return;
  }
  user = newUser;
  localStorage.setItem(LOCALSTORAGE_AUTHORIZED_USER, JSON.stringify(user));
});

export const isAuthenticated = (): boolean => !!user;

export const getUser = (): firebase.User | null => user;
