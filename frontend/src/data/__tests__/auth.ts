import {
  registerEmail,
  isAuthenticated,
  loginWithEmail,
  executeAsyncFunctionIfErrReturnMessage,
  logout,
  getUser,
  sendPasswordResetEmail,
} from '../auth';
jest.mock('../../firebase.ts');

const email = 'smb@gmail.com';
const password = '1qaz2wsx3edc';

interface Code {
  email: string;
  requestType: string;
  oobCode: string;
  oobLink: string;
}

interface OutOfBandVerification {
  oobCodes: Code[];
}

describe('test auth.ts', () => {
  afterAll(
    async (): Promise<boolean> => {
      await fetch(
        'http://localhost:9099/emulator/v1/projects/kpi-student/accounts',
        { method: 'DELETE' }
      );

      return true;
    }
  );

  test('register email', async () => {
    expect(await registerEmail(email, password)).toBeNull();
    expect(isAuthenticated()).toBeFalsy();
    expect(await registerEmail(email, password)).toBe(
      'The email address is already in use by another account.'
    );
  });

  test('login with email', async () => {
    const answer = await fetch(
      'http://localhost:9099/emulator/v1/projects/kpi-student/oobCodes'
    );
    const body = (await answer.json()) as OutOfBandVerification;
    const code = body.oobCodes[body.oobCodes.length - 1];
    expect(code.email).toBe(email);
    await fetch(code.oobLink);

    expect(isAuthenticated()).toBeFalsy();
    expect(await loginWithEmail(email, password)).toBeNull();
    expect(isAuthenticated()).toBeTruthy();
  });

  test('executeAsyncFunctionIfErrReturnMessage', async () => {
    let isOk = false;
    await executeAsyncFunctionIfErrReturnMessage(async () => {
      isOk = true;
    });

    expect(isOk).toBeTruthy();

    const errorMessage = 'Oops!';
    expect(
      await executeAsyncFunctionIfErrReturnMessage(async () => {
        throw new Error(errorMessage);
      })
    ).toBe(errorMessage);
  });

  test('logout', async () => {
    expect(isAuthenticated()).toBeTruthy();
    await logout();
    expect(isAuthenticated()).toBeFalsy();
  });

  test('getUser', async () => {
    expect(getUser()).toBeNull();
    await loginWithEmail(email, password);
    expect(getUser()).toBeTruthy();
  });

  test('sendPasswordResetEmail', async () => {
    expect(await sendPasswordResetEmail('not-valid@gmail.com')).toBe(
      'There is no user record corresponding to this identifier. The user may have been deleted.'
    );
    expect(await sendPasswordResetEmail(email)).toBeNull();
  });
});
