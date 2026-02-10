# Automation Test Store - Playwright E2E Testing Framework

A comprehensive end-to-end testing framework for [Automation Test Store](https://automationteststore.com) built with Playwright and TypeScript.

##  Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)

##  Overview

This project provides automated UI testing for the Automation Test Store e-commerce website. It covers critical user functionalities including user registration, login, product search, cart management, and checkout processes.

## Features

-  **User Authentication** - Registration and login test automation
-  **Product Search** - Search functionality testing
-  **Cart Management** - Add/remove products from cart
-  **Checkout Flow** - Complete purchase workflow testing
-  **HTML Reports** - Comprehensive test execution reports
-  **Video Recording** - Test execution videos for debugging
-  **Screenshots** - Automatic screenshot capture
-  **CI/CD Ready** - GitHub Actions workflow included
-  **Data-Driven** - External test data management via JSON fixtures



## Tech Stack

- **Playwright** v1.48.0 - Modern web automation framework
- **TypeScript** - Type-safe test development
- **Node.js** - Runtime environment
- **dotenv** - Environment variable management



## Prerequisites

- **Node.js** (v18 or higher)
- **npm**
- **Git**


##  Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ApurbaSubedi/automation-test-store-playwright.git
   cd automation-test-store-playwright
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install --with-deps
   ```


##  Configuration

### Environment Variables

Create a `.env` file in the root directory for test credentials:

```env
TEST_EMAIL=your_test_username
TEST_PASSWORD=your_test_password
```

### Playwright Configuration
The `playwright.config.ts` includes:

| Setting | Value | Description |
|---------|-------|-------------|
| `baseURL` | `https://automationteststore.com` | Target application URL |
| `screenshot` | `on` | Always capture screenshots |
| `video` | `on` | Always record videos |
| `trace` | `retain-on-failure` | Capture trace on failures |

## Running Tests

```bash
# Run all tests (headless)
npx playwright test

# Run tests with browser visible
npx playwright test --headed

# Run a specific test file 
npx playwright test 01-register-login.spec.ts

```

##  Test Scenarios

### 1. Registration and Login Tests (`01-register-login.spec.ts`)

| Test Case | Description |
|-----------|-------------|
| Register new user | Complete user registration with form validation |

### 2. Search and Cart Management Tests (`02-search-add-delete-cart.spec.ts`)

| Test Case | Description |
|-----------|-------------|
| Search products | Search and navigate to product pages |
| Add to cart | Add multiple products to shopping cart |
| Delete from cart | Remove products from cart |
| Checkout | Complete the purchase workflow |
| Logout | User logout verification |

```

