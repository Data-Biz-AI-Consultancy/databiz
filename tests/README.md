# 🧪 DataBiz Test Suite

This directory contains the automated test suites for the DataBiz web application, split into unit/DOM integration tests and End-to-End (E2E) browser automation tests.

---

## 📁 Directory Structure

```
tests/
├── frontend/
│   ├── main.test.js       # Vitest unit & DOM integration tests (JSDOM)
│   ├── navigation.spec.js  # Playwright E2E browser navigation & flow tests
│   └── vitest.config.js   # Vitest runtime configuration
└── playwright.config.js   # Playwright automation configuration
```

---

## ⚡ Quick Start

Before running tests, ensure you have installed the project's dependencies:

```bash
npm install
```

### 1. Unit & Integration Tests (Vitest + JSDOM)

These tests validate frontend logic (theme switcher state, GA4 event analytics, dynamic RSS rendering, and the conversational state of the Bella AI Assistant) inside a mock browser environment (JSDOM) without requiring a real browser or active HTTP servers.

*   **Run Once:**
    ```bash
    npm run test
    ```
*   **Watch Mode (for active development):**
    ```bash
    npm run test:watch
    ```

### 2. End-to-End Browser Tests (Playwright)

These tests load the application in chromium, firefox, and webkit browsers to verify visual rendering, multi-page routing, layout consistency, and interactive states.

*   **Install Playwright Browsers (Required first time):**
    ```bash
    npx playwright install
    ```
*   **Run E2E Suite:**
    ```bash
    npm run test:e2e
    ```
