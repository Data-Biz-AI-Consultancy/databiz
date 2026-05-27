import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

const mainJsContent = fs.readFileSync(path.resolve(__dirname, '../../main.js'), 'utf8');

describe('main.js unit tests', () => {
  beforeEach(() => {
    // Reset DOM
    document.documentElement.innerHTML = `
      <html>
        <head>
          <button id="theme-toggle">
            <span id="theme-toggle-icon">light_mode</span>
          </button>
          <div class="insights-grid"></div>
          <section>
            <img id="hero-bg-img" />
          </section>
        </head>
        <body>
          <button data-ga-event="test-button">Click Me</button>
        </body>
      </html>
    `;
    // Mock localStorage
    const storage = {};
    global.localStorage = {
      getItem: vi.fn((key) => storage[key] || null),
      setItem: vi.fn((key, value) => { storage[key] = value; }),
      clear: vi.fn(() => { for (const key in storage) delete storage[key]; })
    };
    
    // Mock global window objects
    global.gtag = vi.fn();
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    // Mock fetch for RSS feeds
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          status: 'ok',
          items: [
            {
              title: 'Test Article',
              description: 'This is a test description.',
              link: 'https://example.com/test',
              thumbnail: 'https://example.com/thumb.png'
            }
          ]
        })
      })
    );
  });

  it('initializes theme toggle correctly and handles click', () => {
    // Run main.js logic by executing the script content
    new Function(mainJsContent)();
    
    // Trigger DOMContentLoaded manually
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    
    // Default theme is light (no class 'dark')
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(themeToggleIcon.textContent).toBe('dark_mode');
    
    // Click to toggle
    themeToggle.click();
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(themeToggleIcon.textContent).toBe('light_mode');
    expect(localStorage.getItem('theme')).toBe('dark');

    // Click again to toggle back
    themeToggle.click();
    
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(themeToggleIcon.textContent).toBe('dark_mode');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('triggers GA4 event tracking on click', () => {
    new Function(mainJsContent)();
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const button = document.querySelector('[data-ga-event]');
    button.click();

    expect(global.gtag).toHaveBeenCalledWith('event', 'click', {
      'event_category': 'conversion',
      'event_label': 'test-button',
      'value': 1
    });
  });

  it('fetches Substack feed and populates DOM', async () => {
    new Function(mainJsContent)();
    document.dispatchEvent(new Event('DOMContentLoaded'));

    // Wait for the async fetch function to execute and update the DOM
    await new Promise(resolve => setTimeout(resolve, 50));

    const grid = document.querySelector('.insights-grid');
    expect(grid.innerHTML).toContain('Test Article');
    expect(grid.innerHTML).toContain('This is a test description.');
  });
});
