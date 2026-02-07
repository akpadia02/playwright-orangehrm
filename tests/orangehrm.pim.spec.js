/**
 * ========================================================================
 * OBJECTIVE: Automate PIM Add Employee Process for OrangeHRM Demo
 * ========================================================================
 * 
 * DESCRIPTION:
 * This test file automates the complete process of adding a new employee
 * in the OrangeHRM PIM (Personnel Information Management) module. It 
 * demonstrates:
 * - User authentication/login
 * - Navigation to the PIM module
 * - Accessing the Add Employee form
 * - Entering employee details (First Name and Last Name)
 * - Saving the employee record
 * - Verifying successful creation through URL and UI elements
 * - Taking screenshots for validation
 * 
 * WEBSITE: https://opensource-demo.orangehrmlive.com/
 * CREDENTIALS: Username: Admin, Password: admin123
 * 
 * KEY ASSERTIONS:
 * - Profile icon visibility (confirms logged-in state)
 * - Add button visibility in PIM module
 * - First Name input field visibility on Add Employee form
 * - URL change to personal details page (confirms employee creation)
 * - Side panel visibility (confirms UI fully loaded)
 * 
 * TECHNOLOGIES:
 * - Playwright (Browser Automation)
 * - JavaScript
 * ========================================================================
 */

// Import Playwright test framework and expect assertion library
const { test, expect } = require('@playwright/test');

// Define a test case for adding an employee in the PIM module
test('OrangeHRM PIM Add Employee Test', async ({ page }) => {

    // Set a timeout of 90 seconds for this test to allow for slower operations
    test.setTimeout(90000);

    // Log visual separator and test start message to console
    console.log('==============================');
    // Indicate that the PIM test is beginning execution
    console.log('PIM TEST STARTED');
    // Log visual separator for clarity in console output
    console.log('==============================');

    // Wrap entire test in try-catch block for error handling and failure screenshots
    try {

        // ===============================
        // 1. Login
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
        // 2. Verify Login
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
        // 3. Open PIM
        // ===============================

        // Log that the test is about to navigate to the PIM module
        console.log('Opening PIM module...');

        // Click the PIM module link using a CSS selector that matches href containing "viewPimModule"
        await page.click('a[href*="viewPimModule"]');


        // ===============================
        // 4. Click Add
        // ===============================

        // Log that the test is about to click the Add button
        console.log('Clicking Add button...');

        // Locate the Add button using Playwright's accessible role getter (getByRole)
        // This is a more robust way to find buttons by their visible label
        const addButton =
            page.getByRole('button', { name: 'Add' });

        // Use explicit wait to verify that the Add button is visible within 30 seconds
        await expect(addButton)
            .toBeVisible({ timeout: 30000 });

        // Click the Add button to initiate the add employee process
        await addButton.click();


        // ===============================
        // 5. Wait for Add Employee Form
        // ===============================

        // Log that the test is waiting for the Add Employee form to appear
        console.log('Waiting for Add Employee form...');

        // Locate the first name input field using CSS selector for input with name="firstName"
        const firstNameInput =
            page.locator('input[name="firstName"]');

        // Use explicit wait to verify that the first name input field is visible within 30 seconds
        // This confirms that the Add Employee form has fully loaded
        await expect(firstNameInput)
            .toBeVisible({ timeout: 30000 });

        // Log confirmation that the Add Employee form page has loaded successfully
        console.log('Add Employee page loaded');


        // ===============================
        // 6. Enter Details
        // ===============================

        // Define the first name value to be entered
        const firstName = 'Akshay';
        // Define the last name value to be entered
        const lastName = 'Tester';

        // Log that the test is about to enter the first name value
        console.log('Entering First Name:', firstName);
        // Fill the first name input field with the defined first name value
        await firstNameInput.fill(firstName);

        // Log that the test is about to enter the last name value
        console.log('Entering Last Name:', lastName);
        // Locate the last name input field and fill it with the defined last name value
        await page.locator('input[name="lastName"]').fill(lastName);


        // ===============================
        // 7. Save
        // ===============================

        // Log that the test is about to click the Save button
        console.log('Clicking Save...');

        // Locate and click the Save button using Playwright's getByRole for accessible element selection
        await page.getByRole('button', { name: 'Save' }).click();


        // ===============================
        // 8. Verify by URL (STABLE)
        // ===============================

        // Log that the test is waiting for the URL to change to the personal details page
        console.log('Waiting for Personal Details URL...');

        // Use waitForURL() to verify that the page navigates to the personal details URL
        // The pattern '**/pim/viewPersonalDetails/**' matches any URL containing this path
        // This is a stable assertion as URL changes confirm successful employee creation
        await page.waitForURL('**/pim/viewPersonalDetails/**', {
            timeout: 30000  // Wait up to 30 seconds for the URL to match the pattern
        });

        // Log confirmation that the employee has been created and URL has changed
        console.log('Employee created - URL verified');


        // ===============================
        // 9. Wait for UI + Screenshot
        // ===============================

        // Log that the test is waiting for the side panel to appear before taking screenshot
        console.log('Waiting for sidebar before screenshot...');

        // Locate the side panel element using CSS class selector
        const sidePanel =
            page.locator('.oxd-sidepanel');

        // Use explicit wait to verify that the side panel is visible within 20 seconds
        // This ensures the UI has fully rendered before capturing the screenshot
        await expect(sidePanel)
            .toBeVisible({ timeout: 20000 });

        // Log that the UI is fully loaded and screenshot is about to be taken
        console.log('UI loaded, taking screenshot...');

        // Capture a full-page screenshot showing the employee details page
        await page.screenshot({
            path: 'pim_add_employee_success.png',  // Save screenshot to this file name
            fullPage: true                         // Capture the entire page including off-screen portions
        });



    } catch (error) {

        // Log visual separator
        console.log('==============================');
        // Log that the PIM test has failed
        console.log('PIM TEST FAILED');
        // Log visual separator for clarity in console output
        console.log('==============================');

        // Log the error message to help with debugging
        console.log('Error:', error.message);

        // Check if the page is still open before taking a failure screenshot
        if (!page.isClosed()) {
            // Capture a full-page screenshot of the failure state for debugging
            await page.screenshot({
                path: 'pim_add_employee_failed.png',  // Save failure screenshot to this file name
                fullPage: true                         // Capture the entire page
            });
        }

        // Re-throw the error to mark the test as failed
        throw error;
    }

  // End of test case
});
