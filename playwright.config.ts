  import { defineConfig, devices } from '@playwright/test';
  import dotenv from 'dotenv';

  dotenv.config();

  export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    retries: 0,
    workers: 1,
    
    // Always generate reports
  reporter: [['html', { open: 'always' }]], // 'always' instead of default 'on-failure'

    
    use: {
      baseURL: 'https://automationteststore.com',
      trace: 'retain-on-failure',  // Change to 'on' to always record trace
      screenshot: 'on',              // Change to 'on' to always take screenshots
      video: 'on',                   // Change to 'on' to always record video
      headless: false,
      
      // Bypass automation detection
      launchOptions: {
        args: [
          '--disable-blink-features=AutomationControlled'
        ]
      }
    },
    
    projects: [
      {
        name: 'chromium',
        use: { 
          ...devices['Desktop Chrome']
        },
      },
    ],
    
    timeout: 60000,
    expect: {
      timeout: 10000
    }
  });
