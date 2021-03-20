import {
  isAuthenticated,
  loginWithEmail,
  loginWithGoogle,
  logout,
  registerEmail,
  LOCAL_STORAGE_EMAIL_KEY,
  loginWithGithub,
  sendPasswordResetEmail,
} from '../auth';

afterEach(() => {
  logout();
  localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, '{}');
});

it('test is client authenticated', () => {
  expect(isAuthenticated()).toBeFalsy();
  loginWithGoogle();
  expect(isAuthenticated).toBeTruthy();
});
const exampleEmail = 'smb@gmail.com';
it('test register with email', () => {
  expect(registerEmail(exampleEmail, 'qwerty')).toBeTruthy();
  expect(isAuthenticated()).toBeTruthy();

  logout();

  expect(registerEmail(exampleEmail, '12345')).toBeFalsy();
  expect(isAuthenticated()).toBeFalsy();
});

it('test login with email', () => {
  localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, '');
  expect(loginWithEmail(exampleEmail, 'qwerty')).toBeFalsy();

  registerEmail(exampleEmail, 'qwerty');
  logout();
  // Incorrect password
  expect(loginWithEmail(exampleEmail, '12345')).toBeFalsy();
  expect(isAuthenticated()).toBeFalsy();
  // email incorrect
  expect(loginWithEmail('s' + exampleEmail, 'qwerty')).toBeFalsy();
  expect(isAuthenticated()).toBeFalsy();
  // All right
  expect(loginWithEmail(exampleEmail, 'qwerty')).toBeTruthy();
  expect(isAuthenticated()).toBeTruthy();
});

it('login with GOOGLE', () => {
  expect(loginWithGoogle()).toBeTruthy();
  expect(isAuthenticated()).toBeTruthy();
});

it('login with GitHub', () => {
  expect(loginWithGithub()).toBeTruthy();
  expect(isAuthenticated()).toBeTruthy();
});

it('reset password', () => {
  localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, '');
  expect(sendPasswordResetEmail(exampleEmail)).toBeFalsy();
  registerEmail(exampleEmail, 'qwerty');
  expect(sendPasswordResetEmail(exampleEmail)).toBeTruthy();

  expect(sendPasswordResetEmail('m' + exampleEmail)).toBeFalsy();
});
