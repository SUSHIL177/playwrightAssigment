Playwright Test Automation Framework

This repository contains an end-to-end (E2E) test automation suite built using Playwright, TypeScript, and the Page Object Model (POM) pattern.

Tests are completely data-driven and dynamically adjust their execution behavior, target URLs, and datasets based on the specified environment runtime flag (QA vs Staging).

🛠️ Prerequisites

Before executing tests, ensure your local environment contains the following system runtimes:

Node.js: v18.x.x or higher installed. Check using:

node -v


npm: v9.x.x or higher installed. Check using:

npm -v


📦 System Installation & Setup

Follow these steps sequentially to install project dependencies and provision automated browser engines.

1. Clone and Navigate to Root Folder

Open your local terminal and navigate into the root of this project repository:

cd path/to/playwrightAssigment


2. Install Package Dependencies

Install core framework engines, runtime utilities, and OS cross-compilers (cross-env):

npm install


3. Fetch Localized Automated Browser Binaries

Provision framework-controlled instances of Chromium, Firefox, and WebKit browser wrappers along with their system-level dependencies:

npx playwright install --with-deps


4. Create the Local Environment Pointer (.env)

Create a file named exactly .env in the absolute root directory of this repository (the same folder where your package.json resides). Add your default runtime environment keyword:

ENV=qa


💡 Note: To target staging operations instead, simply toggle this value to ENV=stage.

🏃 Execution Command Center

The suite leverages custom environment variables paired with Playwright's native Grep tag orchestration toolset to run isolated execution tracks across platforms (Windows PowerShell, macOS Terminal, Linux).

Execute these commands from your root terminal:

1. Running Specific Suite Tags Against QA

Run Regression Suite:

npm run test:qa:regression


Run Catalog Component Suite Only:

npm run test:qa:catalog


2. Running Specific Suite Targets Against Staging

Run Regression Suite:

npm run test:stage:regression


Run Catalog Component Suite Only:

npm run test:stage:catalog


3. Utility Tools & Local Sandboxes

Run All Tests (Standard Multi-Browser Configuration):

npm run test


Launch Playwright Interactive UI Debugger Mode:

npm run test:ui
