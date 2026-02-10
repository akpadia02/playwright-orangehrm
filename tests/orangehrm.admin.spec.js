/**
 * ========================================================================
 * OBJECTIVE: Automate Admin Module Navigation and Table Verification
 * ========================================================================
 * 
 * DESCRIPTION:
 * This test file automates the process of accessing the Admin module
 * and verifying the presence of the admin table on the OrangeHRM demo
 * application. It demonstrates:
 * - User authentication/login
 * - Navigation to the Admin module
 * - Verification of admin table header presence
 * - Screenshot capture for successful test completion
 * 
 * WEBSITE: https://opensource-demo.orangehrmlive.com/
 * CREDENTIALS: Username: Admin, Password: admin123
 * 
 * KEY ASSERTIONS:
 * - Profile icon visibility (confirms logged-in state)
 * - Admin table header visibility (confirms Admin module is loaded)
 * 
 * TECHNOLOGIES:
 * - Playwright (Browser Automation)
 * - JavaScript
 * ========================================================================
 */

// Import Playwright test framework and expect assertion library
const { test, expect } = require('@playwright/test');

// Define a test case for verifying the Admin module and table
test('OrangeHRM Admin Test', async ({ page }) => {

  // Set a timeout of 60 seconds for this test to handle slower browser operations
  test.setTimeout(120000);

  // Log visual separator and test start message to console
  console.log('==============================');
  // Indicate that the Admin test is beginning execution
  console.log('ADMIN TEST STARTED');
  // Log visual separator for clarity in console output
  console.log('==============================');

  // Wrap entire test in try-catch block for error handling and failure screenshots
  try {

    // ===============================
    // Login
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

    // Use explicit wait to verify that the username input field is visible within 20 seconds
    await expect(page.locator('input[name="username"]'))
      .toBeVisible({ timeout: 20000 });

    // Log confirmation that the login page has finished loading
    console.log('Login page loaded');

    // Fill the username input field with the value "Admin" using CSS selector
    await page.fill('input[name="username"]', 'Admin');
    // Fill the password input field with the value "admin123" using CSS selector
    await page.fill('input[name="password"]', 'admin123');

    // Log that the test is about to click the login button
    console.log('Clicking login...');
    // Click the submit button to perform the login action
    await page.click('button[type="submit"]');


    // ===============================
    // Verify Login
    // ===============================

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
    // Open Admin
    // ===============================

    // Log that the test is about to navigate to the Admin module
    console.log('Opening Admin page...');
    // Click the Admin module link using a CSS selector that matches href containing "viewAdminModule"
    await page.click('a[href*="viewAdminModule"]');


    // ===============================
    // Assertion (Stable)
    // ===============================

    // Log that the test is waiting for the Admin table to appear
    console.log('Waiting for Admin table...');

    // Locate the admin table header element using CSS class selector
    const adminTable =
      page.locator('.oxd-table-header');

    // Use explicit wait to verify that the admin table is visible within 30 seconds
    // This confirms that the Admin module has loaded successfully
    await expect(adminTable)
      .toBeVisible({ timeout: 30000 });

    // Log confirmation that the admin table has been verified
    console.log('Admin table verified');


    // ===============================
    // Screenshot
    // ===============================

    // Capture a full-page screenshot showing the Admin module with the table
    await page.screenshot({
      path: 'admin_success.png',  // Save screenshot to the file named 'admin_success.png'
      fullPage: true              // Capture the entire page including off-screen portions
    });

    // Log confirmation that the screenshot has been saved
    console.log('Screenshot saved');


    // Log visual separator
    console.log('==============================');
    // Log that the Admin test has passed all assertions
    console.log('ADMIN TEST PASSED');
    // Log visual separator for clarity in console output
    console.log('==============================');


  } catch (error) {

    // Log confirmation that the Admin test has failed
    console.log('ADMIN TEST FAILED');
    // Log the error message to help with debugging
    console.log(error.message);

    // Check if the page is still open before taking a failure screenshot
    if (!page.isClosed()) {
      // Capture a full-page screenshot of the failure state for debugging
      await page.screenshot({
        path: 'admin_failed.png',  // Save failure screenshot to 'admin_failed.png'
        fullPage: true             // Capture the entire page
      });
    }

    // Re-throw the error to mark the test as failed
    throw error;

    throw error;
  }

  // End of test case
});
