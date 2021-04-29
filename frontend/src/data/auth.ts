import firebase, {
  auth,
  signInWithGitHub,
  signInWithGoogle,
} from '../firebase';

const LOCALSTORAGE_AUTHORIZED_USER = 'authorized_user';

export const loginWithEmail = (
  email: string,
  password: string
): Promise<string | null> =>
  executeAsyncFunctionIfErrReturnMessage(() =>
    auth.signInWithEmailAndPassword(email, password)
  );

export const loginWithGithub = (): Promise<string | null> =>
  executeAsyncFunctionIfErrReturnMessage(signInWithGitHub);

export const loginWithGoogle = (): Promise<string | null> =>
  executeAsyncFunctionIfErrReturnMessage(signInWithGoogle);

export const logout = (): Promise<void> => auth.signOut();

export const registerEmail = (
  email: string,
  password: string
): Promise<string | null> =>
  executeAsyncFunctionIfErrReturnMessage(() =>
    auth.createUserWithEmailAndPassword(email, password)
  );

export const sendPasswordResetEmail = (email: string): Promise<string | null> =>
  executeAsyncFunctionIfErrReturnMessage(() =>
    auth.sendPasswordResetEmail(email)
  );

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

export async function executeAsyncFunctionIfErrReturnMessage(
  inputFunction: () => Promise<firebase.auth.UserCredential | void>
): Promise<string | null> {
  try {
    await inputFunction();
    return null;
  } catch (error) {
    return error.message;
  }
}
