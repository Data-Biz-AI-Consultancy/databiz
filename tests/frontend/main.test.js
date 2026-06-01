import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

const mainJsContent = fs.readFileSync(path.resolve(__dirname, '../../src/frontend/main.js'), 'utf8');

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

    // Mock fetch for RSS feeds and Ollama APIs
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('rss2json')) {
        return Promise.resolve({
          json: () => Promise.resolve({
            status: 'ok',
            items: [
              {
                title: 'Test Article',
                description: 'This is a test description. More detail follows.',
                pubDate: 'Wed, 13 May 2026 13:01:38 GMT',
                link: 'https://example.com/test',
                thumbnail: 'https://example.com/thumb.png'
              },
              {
                title: '<img src=x onerror=alert(1)>',
                description: '<strong>Safe summary.</strong>',
                pubDate: 'Thu, 14 May 2026 13:01:38 GMT',
                link: 'https://example.com/no-enclosure'
              },
              {
                title: 'Third Article',
                description: 'Third summary.',
                pubDate: 'Fri, 15 May 2026 13:01:38 GMT',
                link: 'https://example.com/third'
              },
              {
                title: 'Fourth Article',
                description: 'Fourth summary.',
                pubDate: 'Sat, 16 May 2026 13:01:38 GMT',
                link: 'https://example.com/fourth'
              },
              {
                title: 'Fifth Article',
                description: 'Fifth summary.',
                pubDate: 'Sun, 17 May 2026 13:01:38 GMT',
                link: 'https://example.com/fifth'
              },
              {
                title: 'Sixth Article',
                description: 'Sixth summary.',
                pubDate: 'Mon, 18 May 2026 13:01:38 GMT',
                link: 'https://example.com/sixth'
              },
              {
                title: 'Seventh Article',
                description: 'Seventh summary.',
                pubDate: 'Tue, 19 May 2026 13:01:38 GMT',
                link: 'https://example.com/seventh'
              }
            ]
          })
        });
      } else if (url.includes('/api/tags')) {
        return Promise.resolve({
          json: () => Promise.resolve({
            models: [{ name: 'gemma3:1b' }]
          })
        });
      } else if (url.includes('/api/chat')) {
        const mockStream = new ReadableStream({
          start(controller) {
            const encoder = new TextEncoder();
            controller.enqueue(encoder.encode(JSON.stringify({ message: { content: 'Ciao, I am Bella!' } }) + '\n'));
            controller.close();
          }
        });
        return Promise.resolve({
          ok: true,
          body: mockStream
        });
      }
      return Promise.reject(new Error('Unknown url'));
    });
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
    expect(grid.innerHTML).toContain('May 13, 2026');
    expect(grid.innerHTML).toContain('1 min read');

    const firstCard = grid.querySelector('a');
    expect(firstCard.href).toContain('utm_source=databiz_website');
    expect(firstCard.href).toContain('utm_campaign=insights_card');
    expect(firstCard.target).toBe('_blank');
    expect(firstCard.rel).toBe('noopener');
    expect(firstCard.dataset.gaEvent).toBe('insight_card_click');

    const cards = grid.querySelectorAll('a');
    expect(cards).toHaveLength(7);
    expect(grid.innerHTML).toContain('Sixth Article');
    expect(grid.innerHTML).toContain('Seventh Article');
    expect(cards[1].textContent).toContain('<img src=x onerror=alert(1)>');
    expect(cards[1].querySelectorAll('img')).toHaveLength(1);
    expect(cards[1].querySelector('h3 img')).toBeNull();
    expect(cards[1].querySelector('img').getAttribute('onerror')).toBeNull();
  });

  it('initializes and injects AI assistant widget into DOM', () => {
    new Function(mainJsContent)();
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const trigger = document.getElementById('ai-trigger');
    const chatWindow = document.getElementById('ai-chat');
    expect(trigger).not.toBeNull();
    expect(chatWindow).not.toBeNull();

    const triggerImg = trigger.querySelector('img');
    expect(triggerImg.src).toContain('assets/bella.png');
  });

  it('toggles chat window visibility on trigger click', () => {
    new Function(mainJsContent)();
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const trigger = document.getElementById('ai-trigger');
    const chatWindow = document.getElementById('ai-chat');

    expect(chatWindow.classList.contains('open')).toBe(false);
    trigger.click();
    expect(chatWindow.classList.contains('open')).toBe(true);

    const closeBtn = document.getElementById('ai-close');
    closeBtn.click();
    expect(chatWindow.classList.contains('open')).toBe(false);
  });

  it('formats markdown links and strips tracking tags in chat messages', async () => {
    // Override fetch to return text with markdown links and GA4 event tags
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('/api/chat')) {
        const mockStream = new ReadableStream({
          start(controller) {
            const encoder = new TextEncoder();
            controller.enqueue(encoder.encode(JSON.stringify({ message: { content: 'Hello! [Our Services](/offers.html) [GA4_EVENT: bella_lead_submitted]' } }) + '\n'));
            controller.close();
          }
        });
        return Promise.resolve({ ok: true, body: mockStream });
      }
      return Promise.resolve({ json: () => Promise.resolve({ models: [{ name: 'gemma3:1b' }] }) });
    });

    new Function(mainJsContent)();
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const input = document.getElementById('ai-input');
    const sendBtn = document.getElementById('ai-send');

    input.value = 'My name is Bob and I run a retail store.';
    sendBtn.click();

    // Wait for stream to finish processing
    await new Promise(resolve => setTimeout(resolve, 50));

    const messages = document.getElementById('ai-messages');
    const assistantMessages = messages.querySelectorAll('.ai-chat-message.assistant');
    const assistantMessage = assistantMessages[assistantMessages.length - 1];
    
    // Check that link is formatted to an anchor tag
    const anchor = assistantMessage.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor.getAttribute('href')).toBe('/offers.html');
    expect(anchor.textContent).toBe('Our Services');

    // Check that tracking tag is stripped from text representation
    expect(assistantMessage.innerHTML).not.toContain('[GA4_EVENT');

    // Check that GA4 lead submission event was triggered
    expect(global.gtag).toHaveBeenCalledWith('event', 'bella_lead_submitted', expect.objectContaining({
      'event_category': 'chat_assistant'
    }));
  });

  it('triggers GA4 events on open, close, clear, and link click actions', async () => {
    new Function(mainJsContent)();
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const trigger = document.getElementById('ai-trigger');
    const closeBtn = document.getElementById('ai-close');
    const clearBtn = document.getElementById('ai-clear');

    // Test Open
    trigger.click();
    expect(global.gtag).toHaveBeenCalledWith('event', 'bella_chat_open', expect.objectContaining({
      'event_category': 'chat_assistant'
    }));

    // Test Close
    closeBtn.click();
    expect(global.gtag).toHaveBeenCalledWith('event', 'bella_chat_close', expect.objectContaining({
      'event_category': 'chat_assistant'
    }));

    // Mock confirm dialog for clear button
    global.confirm = vi.fn().mockReturnValue(true);
    clearBtn.click();
    expect(global.gtag).toHaveBeenCalledWith('event', 'bella_chat_clear', expect.objectContaining({
      'event_category': 'chat_assistant'
    }));

    // Test Link Clicks inside messages
    const messages = document.getElementById('ai-messages');
    messages.innerHTML = '<p><a href="/toolings.html" id="test-chat-link">Developer Toolings</a></p>';
    const chatLink = document.getElementById('test-chat-link');
    chatLink.click();

    expect(global.gtag).toHaveBeenCalledWith('event', 'bella_link_click', expect.objectContaining({
      'event_category': 'chat_assistant',
      'event_label': 'Developer Toolings',
      'link_url': '/toolings.html'
    }));
  });
});

