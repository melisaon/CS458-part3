import { browser, $, expect } from '@wdio/globals';

declare const describe: (name: string, suite: () => void) => void;
declare const it: (name: string, test: () => Promise<void>) => void;
declare const before: (hook: () => Promise<void>) => void;
declare const after: (hook: () => Promise<void>) => void;

describe('Login Page Test Case', () => {
  before(async () => {
    await browser.url('http://localhost:5173'); // Adjust this URL if needed
  });

  it('should redirect to survey screen', async () => {
    //* Getting input fields email, password and login button 
    //  from login.ts using direct selectors instead of PageObject */

    const emailInput = await $('#input-email'); // input-email is id from LoginPage.tsx
    const passwordInput = await $('#input-password'); // input-password is id from LoginPage.tsx
    const loginButton = await $('#login-button'); // login-button is id from LoginPage.tsx

    // this method is used to create re-usable standard to fill credentials
    // replaced with direct actions below (no PageObject used now)
    await emailInput.setValue('test123@yopmail.com');
    await passwordInput.setValue('pass123');
    await loginButton.click();

    const surveyHeader = await $('#survey-header'); // survey-header is id from SurveyPage.tsx
    await surveyHeader.waitForDisplayed({ timeout: 15000 });
    await expect(surveyHeader).toBeDisplayed();
  });

  after(async () => {
    await browser.reloadSession(); // Optional cleanup
  });
});
