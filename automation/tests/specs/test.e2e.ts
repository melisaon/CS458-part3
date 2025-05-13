import type { Browser as WebdriverBrowser } from 'webdriverio';
import { browser, $, expect } from '@wdio/globals'; // Added explicit expect
import LoginPage from '../pageObjects/login.page'
import SurveyPage from '../pageObjects/survey.test'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        // Open web-browser url
        await browser.url('http://localhost:5173')  // URL should be updated as current project's.
        // Valid user information
        await LoginPage.submitLoginForm('test123@yopmail.com', 'pass123')

        // Header check after successful login
        const surveyHeader = await $('#heading-survey') 
        await expect(surveyHeader).toBeDisplayed()
    })
})
