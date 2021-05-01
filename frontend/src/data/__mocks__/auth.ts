let isLogin = false;

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<string | null> => {
  isLogin = true;
  return null;
};

export const loginWithGithub = async (): Promise<string | null> => {
  isLogin = true;
  return null;
};
export const loginWithGoogle = async (): Promise<string | null> => {
  isLogin = true;
  return null;
};

export const logout = async (): Promise<void> => {
  isLogin = false;
};

export const registerEmail = async (
  email: string,
  password: string
): Promise<string | null> => null;

export const sendPasswordResetEmail = async (
  email: string
): Promise<string | null> => null;

interface User {
  emailVerified: boolean;
  uid: string;
  displayName: string | null;
  isAnonymous: boolean;
  photoURL: string | null;
}

const user: User = {
  emailVerified: true,
  uid: 'tye2u3e23e73t2e7237e7',
  displayName: 'Vasyl',
  isAnonymous: false,
  photoURL: null,
};

export const isAuthenticated = (): boolean => isLogin;

export const getUser = (): User | null => (isLogin ? user : null);
