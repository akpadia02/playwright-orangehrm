# Playwright OrangeHRM Tests

Automated end-to-end testing for OrangeHRM using Playwright with Chromium browser.

## Overview

This project contains automated test suites for OrangeHRM application covering:
- **Login Test** - Validates successful user authentication
- **Admin Module Test** - Verifies Admin section functionality
- **PIM Module Test** - Tests employee creation in the PIM module

## Features

- Cross-browser testing with Chromium
- Headless and headed execution modes
- Detailed console logging for debugging
- **Output Screenshots** - Success screenshots are captured after page load completion:
  - `login_success.png` - Dashboard after successful login
  - `admin_success.png` - Admin module with loaded table
  - `pim_add_employee_success.png` - Employee details page after creation

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run specific test file:
```bash
npx playwright test orangehrm.spec.js
npx playwright test orangehrm.admin.spec.js
npx playwright test orangehrm.pim.spec.js
```

Run with headed browser:
```bash
npx playwright test --headed
```

Run with specific project:
```bash
npx playwright test --project=chromium
```

## Test Reports

After running tests, view the Playwright report:
```bash
npx playwright show-report
```

## Project Structure

```
playwright-orangehrm/
├── tests/
│   ├── orangehrm.spec.js        # Login test
│   ├── orangehrm.admin.spec.js  # Admin module test
│   └── orangehrm.pim.spec.js    # PIM employee creation test
├── playwright.config.js
├── package.json
└── Screenshots/
    ├── login_success.png
    ├── admin_success.png
    └── pim_add_employee_success.png
```

## Configuration

Edit `playwright.config.js` to modify:
- Base URL
- Timeouts
- Browser options
- Test parameters
