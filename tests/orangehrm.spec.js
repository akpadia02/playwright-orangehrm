/**
 * ========================================================================
 * OBJECTIVE: Automate Login Flow for OrangeHRM Demo Application
 * ========================================================================
 * 
 * DESCRIPTION:
 * This test file automates the login process for the OrangeHRM demo
 * application and verifies that the login is successful. It demonstrates
 * proper UI automation practices including:
 * - Opening the application in a browser
 * - Maximizing the browser window
 * - Using proper explicit waits
 * - Entering credentials
 * - Asserting successful login
 * - Capturing screenshots
 * 
 * WEBSITE: https://opensource-demo.orangehrmlive.com/
 * CREDENTIALS: Username: Admin, Password: admin123
 * 
 * KEY ASSERTIONS:
 * - Profile icon visibility (confirms dashboard access after login)
 * 
 * TECHNOLOGIES:
 * - Playwright (Browser Automation)
 * - JavaScript
 * ========================================================================
 */

// Import Playwright test framework and expect assertion library
const { test, expect } = require('@playwright/test');

// Define a test case for the login functionality
test('OrangeHRM Login Only Test', async ({ page }) => {

  // Set a timeout of 60 seconds for this test to handle slower browser operations
  test.setTimeout(60000);

  // Log visual separator and test start message to console
  console.log('==============================');
  // Indicate that the login test is beginning execution
  console.log('LOGIN TEST STARTED');
  // Log visual separator for clarity in console output
  console.log('==============================');

  // Wrap entire test in try-catch block for error handling and failure screenshots
  try {

    // ===============================
    // 1. Open Website
    // ===============================

    // Log that the test is attempting to navigate to the website
    console.log('Opening website...');

    // Use page.goto() to navigate to the OrangeHRM demo application URL
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // Set the viewport size to 1920x1080 pixels to maximize the virtual browser window
    await page.setViewportSize({
      width: 1920,  // Set width to 1920 pixels
      height: 1080  // Set height to 1080 pixels
    });

    // Log confirmation that the website has been opened successfully
    console.log('Website opened');


    // ===============================
    // 2. Wait for Login Page
    // ===============================

    // Log that the test is waiting for the login form to appear
    console.log('Waiting for login form...');

    // Locate the username input field using CSS selector for the input element with name="username"
    const usernameInput = page.locator('input[name="username"]');

    // Use explicit wait to verify that the username input field is visible within 20 seconds
    // This avoids hardcoding waits and ensures the page is fully loaded
    await expect(usernameInput)
      .toBeVisible({ timeout: 20000 });

    // Log confirmation that the login page has finished loading
    console.log('Login page loaded');


    // ===============================
    // 3. Enter Credentials
    // ===============================

    // Log that the test is about to enter the username
    console.log('Typing username...');
    // Fill the username input field with the value "Admin"
    await usernameInput.fill('Admin');

    // Log that the test is about to enter the password
    console.log('Typing password...');
    // Locate the password input field and fill it with the value "admin123"
    await page.locator('input[name="password"]').fill('admin123');

    // Log that the test is about to click the login button
    console.log('Clicking login button...');
    // Locate and click the submit button to perform the login action
    await page.locator('button[type="submit"]').click();


    // ===============================
    // 4. Verify Login Success
    // ===============================

    // Log that the test is waiting for confirmation that login was successful
    console.log('Waiting for profile icon...');

    // Locate the profile icon element which appears after successful login
    const profileIcon =
      page.locator('span.oxd-userdropdown-tab');

    // Use explicit wait to verify that the profile icon is visible within 30 seconds
    // This confirms that login was successful as the profile icon only appears on the dashboard
    await expect(profileIcon)
      .toBeVisible({ timeout: 30000 });

    // Log confirmation that login was successful
    console.log('Login successful');


    // ===============================
    // 5. Screenshot
    // ===============================

    // Log that the test is about to capture a screenshot of the successful login
    console.log('Taking success screenshot...');

    // Capture a full-page screenshot of the dashboard after successful login
    await page.screenshot({
      path: 'login_success.png',  // Save screenshot to the file named 'login_success.png'
      fullPage: true              // Capture the entire page including off-screen portions
    });

    // Log confirmation that the screenshot has been saved
    console.log('Screenshot saved');


    // Log visual separator
    console.log('==============================');
    // Log that the login test has passed all assertions
    console.log('LOGIN TEST PASSED');
    // Log visual separator for clarity in console output
    console.log('==============================');

  } catch (error) {

    // Log visual separator
    console.log('==============================');
    // Log that the login test has failed
    console.log('LOGIN TEST FAILED');
    // Log visual separator for clarity in console output
    console.log('==============================');

    // Log the error message to help with debugging
    console.log('Error:', error.message);

    // Check if the page is still open before taking a failure screenshot
    if (!page.isClosed()) {
      // Capture a full-page screenshot of the failure state for debugging
      await page.screenshot({
        path: 'login_failed.png',  // Save failure screenshot to 'login_failed.png'
        fullPage: true             // Capture the entire page
      });

      // Log confirmation that the failure screenshot has been captured
      console.log('Failure screenshot saved');
    }

    // Re-throw the error to mark the test as failed
    throw error;
  }

  // End of test case
});
