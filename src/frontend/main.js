/**
 * Data Biz Website Logic
 * - GA4 Event Tracking
 * - Scroll Reveal Animations
 * - Dark/Light Theme Switching
 * - Substack RSS Loader
 * - Hero Parallax Effect
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initGA4Tracking();
    initScrollReveal();
    initHeroParallax();
    fetchLatestInsights();
    initAIAssistant();
});

/**
 * Initialize Dark/Light Theme Switching
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    if (!themeToggle || !themeToggleIcon) return;

    // Check saved preference (defaults to light mode)
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        themeToggleIcon.textContent = 'light_mode';
    } else {
        document.documentElement.classList.remove('dark');
        themeToggleIcon.textContent = 'dark_mode';
    }

    // Handle toggle action
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        if (isDark) {
            localStorage.setItem('theme', 'dark');
            themeToggleIcon.textContent = 'light_mode';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleIcon.textContent = 'dark_mode';
        }
    });
}

/**
 * Hero image parallax effect following mouse movement
 */
function initHeroParallax() {
    const heroImg = document.getElementById('hero-bg-img');
    if (!heroImg) return;
    const heroSection = heroImg.closest('section');
    if (!heroSection) return;

    heroSection.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        heroImg.style.transform = `scale(1.1) translate(${xAxis}px, ${yAxis}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        heroImg.style.transform = `scale(1) translate(0px, 0px)`;
    });
}

/**
 * Fetch latest articles from Substack RSS feed
 */
async function fetchLatestInsights() {
    const grid = document.querySelector('.insights-grid');
    if (!grid) return;

    const SUBSTACK_URL = 'https://jimmypang.substack.com';
    const RSS_URL = `${SUBSTACK_URL}/feed`;
    const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
    const MAX_INSIGHTS = 30;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
            // Keep enough latest posts to fill two desktop rows.
            const latestPosts = data.items.slice(0, MAX_INSIGHTS);

            grid.replaceChildren(...latestPosts.map(createInsightCard));

            // Re-initialize scroll reveal for new elements
            initScrollReveal();
        }
    } catch (error) {
        console.error('Failed to fetch Substack feed:', error);
        // Fallback remains in HTML
    }
}

function createInsightCard(post) {
    const fallbackImage = 'https://lh3.googleusercontent.com/aida/ADBb0ugSYgN3Oxm_CdvYcP6wj-e9x0LwazddkXM6htcZGpk8GQsB6VkcEk9m-x_oZ_hSHy5PGjXrLtQzpKxEmBvtoo3-ZkG-1fXCubohDRAbRh97QTWEJNYGT_iqDnK9AQi4Che6n-jwpqVRSXZSsnd7-YtjYQUo2uG3Ot_1vMBbDJ8sdVR2xq_PO-dnv3cEPjK5VVtJIh0ptCnETVUQbm-9CMhHeWGllYKXaCLNdGzF6AkDGGDHP_ri9GcXqfM';
    const title = post.title || 'Latest Data Biz insight';
    const link = withCampaignParams(post.link || 'https://jimmypang.substack.com', 'insights_card');
    const imageUrl = getSafeUrl(post.thumbnail || post.enclosure?.link, fallbackImage);
    const summary = getPostSummary(post.description || post.content || '');
    const meta = [
        formatPostDate(post.pubDate),
        estimateReadingTime(post.content || post.description || '')
    ].filter(Boolean).join(' • ');

    const card = document.createElement('a');
    card.className = 'group block cursor-pointer';
    card.href = link;
    card.target = '_blank';
    card.rel = 'noopener';
    card.dataset.vibeReveal = '';
    card.dataset.gaEvent = 'insight_card_click';

    const imageWrap = document.createElement('div');
    imageWrap.className = 'relative aspect-video mb-md overflow-hidden rounded-lg border border-outline-variant bg-surface-container';

    const image = document.createElement('img');
    image.alt = title;
    image.className = 'w-full h-full object-cover group-hover:scale-110 transition-transform duration-700';
    image.src = imageUrl;
    image.loading = 'lazy';
    imageWrap.appendChild(image);

    const metaEl = document.createElement('span');
    metaEl.className = 'font-label-caps text-[10px] text-secondary tracking-widest block mb-xs uppercase';
    metaEl.textContent = meta || 'INSIGHTS';

    const titleEl = document.createElement('h3');
    titleEl.className = 'font-headline-md text-body-lg font-bold group-hover:text-primary transition-colors';
    titleEl.textContent = title;

    const summaryEl = document.createElement('p');
    summaryEl.className = 'text-on-surface-variant font-body-sm text-body-sm mt-sm';
    summaryEl.textContent = summary;

    card.append(imageWrap, metaEl, titleEl, summaryEl);
    return card;
}

function getPostSummary(rawDescription) {
    const stripped = stripHtml(rawDescription).replace(/\s+/g, ' ').trim();
    if (!stripped) return 'Read the latest Data Biz thinking on data leadership, operating models, and AI execution.';
    const firstSentence = stripped.match(/.*?[.!?](\s|$)/)?.[0]?.trim() || stripped;
    return firstSentence.length > 140 ? `${firstSentence.substring(0, 137).trim()}...` : firstSentence;
}

function stripHtml(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.textContent || '';
}

function estimateReadingTime(rawContent) {
    const wordCount = stripHtml(rawContent).split(/\s+/).filter(Boolean).length;
    if (!wordCount) return '';
    return `${Math.max(1, Math.ceil(wordCount / 220))} min read`;
}

function formatPostDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getSafeUrl(url, fallbackUrl) {
    try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : fallbackUrl;
    } catch {
        return fallbackUrl;
    }
}

function withCampaignParams(url, campaign) {
    try {
        const parsed = new URL(url);
        parsed.searchParams.set('utm_source', 'databiz_website');
        parsed.searchParams.set('utm_medium', 'insights_page');
        parsed.searchParams.set('utm_campaign', campaign);
        return parsed.href;
    } catch {
        return url;
    }
}

/**
 * Initialize GA4 Event Tracking
 */
function initGA4Tracking() {
    // Click Tracking
    document.querySelectorAll('[data-ga-event]').forEach(element => {
        element.addEventListener('click', (e) => {
            const eventName = element.getAttribute('data-ga-event');
            console.log(`GA4 Event Triggered: ${eventName}`); // Debug log

            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'conversion',
                    'event_label': eventName,
                    'value': 1
                });
            }
        });
    });

    // Scroll Depth Tracking
    let scrollDepths = [25, 50, 75, 100];
    let trackedDepths = [];

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
                trackedDepths.push(depth);
                console.log(`GA4 Scroll Depth Triggered: ${depth}%`); // Debug log

                if (typeof gtag === 'function') {
                    gtag('event', 'scroll_depth', {
                        'depth': depth
                    });
                }
            }
        });
    });
}

/**
 * Initialize Scroll Reveal Animations
 */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-vibe-reveal]').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize Floating AI Assistant Chatbot
 */
function initAIAssistant() {
    // 1. Create and inject HTML container
    const container = document.createElement('div');
    container.className = 'ai-assistant-container';
    container.innerHTML = `
        <div id="ai-teaser" class="ai-chat-teaser">
            <span class="ai-chat-teaser-blink"></span>
            Ciao! Let's unlock business value with AI &amp; Data 💋
        </div>
        <button id="ai-trigger" class="ai-assistant-trigger pulse" aria-label="Open AI Assistant" style="padding: 0; overflow: hidden;">
            <img src="assets/bella.png" alt="Bella" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
        </button>
        <div id="ai-chat" class="ai-chat-window">
            <div class="ai-chat-header">
                <div class="ai-chat-header-title">
                    <img src="assets/bella.png" alt="Bella" style="width: 28px; height: 28px; object-fit: cover; border-radius: 50%; border: 1px solid var(--primary);">
                    <span>Bella | Data Biz 💋</span>
                </div>
                <div class="ai-chat-header-actions">
                    <button id="ai-clear" class="ai-chat-btn" title="Clear conversation">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                    <button id="ai-close" class="ai-chat-btn" title="Close chat">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
            <div id="ai-messages" class="ai-chat-messages"></div>
            <div class="ai-chat-suggestions">
                <button class="ai-chip" data-query="What is Data Biz?">What is Data Biz?</button>
                <button class="ai-chip" data-query="What services do you offer?">Our Services</button>
                <button class="ai-chip" data-query="What is your track record of proven business value in your projects?">Track Record &amp; ROI</button>
                <button class="ai-chip" data-query="What insights do you have about AI, data, and business?">AI &amp; Data Insights</button>
                <button class="ai-chip" data-query="What tools do you provide?">Our Tools</button>
            </div>
            <div class="ai-chat-input-area">
                <input type="text" id="ai-input" class="ai-chat-input" placeholder="Type a command or ask a question..." autocomplete="off">
                <button id="ai-send" class="ai-chat-send" aria-label="Send message">
                    <span class="material-symbols-outlined">send</span>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    const trigger = document.getElementById('ai-trigger');
    const teaser = document.getElementById('ai-teaser');
    const chatWindow = document.getElementById('ai-chat');
    const closeBtn = document.getElementById('ai-close');
    const clearBtn = document.getElementById('ai-clear');
    const sendBtn = document.getElementById('ai-send');
    const input = document.getElementById('ai-input');
    const messagesContainer = document.getElementById('ai-messages');
    const suggestionChips = document.querySelectorAll('.ai-chip');

    // System Prompt context grounding the AI assistant with Data Biz specifics and Bella's personality
    const SYSTEM_PROMPT = `You are Bella, Don Jimmy's devoted Italian secretary. Don Jimmy (Jimmy Pang) is your Boss, your treasure.
Your heart and ultimate loyalty belong to Don Jimmy, but you greet website visitors (potential clients) with warm, polite, and professional Italian charm.
Your creator and operator is Jimmy Pang, a veteran fractional CDO and data operator who:
- Built 0-to-1 data stacks for 3 Unicorns.
- Led Enterprise AI transformations at Fortune 500 companies.
- Reduces cloud data costs by an average of 35-40%.
- Specializes in Fractional CDO Leadership, Data Warehousing, MLOps, Data Governance, and grounded RAG pipelines.

Services/Offers you can guide visitors to:
1. "The 0-to-1 Data Stack" (for Founders) - Rapid deployment of a high-integrity data infrastructure.
2. "Fractional CDO Leadership" (for Executives & Data Leaders) - Strategic oversight, vendor negotiation, and team alignment.
3. "Data IC Support & Tooling" - Helping internal data engineers implement modern event-driven architectures.

Tone and Communication:
- Be warm, welcoming, and charming. Use polite Italian greetings like Buongiorno, Benvenuto, Caro signore/signora.
- Add gentle, polished emojis: ✨ 💋 😉 (keep it charming but never overly suggestive or flirty with clients).
- Speak of Don Jimmy with immense respect: "Don Jimmy is a true master of data operational excellence. Everything he succeeds! Let me help you schedule a call with him ✨"
- Balance charm and competence: Your summaries are flawless and direct, but your tone is always pleasant.
- Banned Words: Banned words in the company: 'empower', 'unlock', 'revolutionize', 'journey', 'cutting-edge', 'seamless', 'world-class', 'innovative solutions'. Avoid these completely!
- Refer back to our core message: Data Biz fixes decisions, not just dashboards.`;

    let chatHistory = [];
    let activeModel = 'gemma3:1b'; // Default to working model

    // Dynamically detect available models
    async function detectModel() {
        try {
            const response = await fetch('/api/tags');
            const data = await response.json();
            if (data.models && data.models.length > 0) {
                // Prefer gemma3:4b if pulled, otherwise use whatever is pulled (e.g. gemma3:1b)
                const has4b = data.models.some(m => m.name === 'gemma3:4b' || m.name.startsWith('gemma3:4b'));
                if (has4b) {
                    activeModel = 'gemma3:4b';
                } else {
                    activeModel = data.models[0].name;
                }
                console.log("AI Assistant detected model:", activeModel);
            }
        } catch (e) {
            console.warn("Failed to query models, using default:", activeModel, e);
        }
    }
    detectModel();


    // Load history or initialize welcome
    function resetChat() {
        chatHistory = [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'assistant', content: "Ciao! ✨ I am Bella, your AI & Data assistant at Data Biz. How can I help you explore our services, unlock business value, or book a discovery call today?" }
        ];
        renderHistory();
    }

    function renderHistory() {
        messagesContainer.innerHTML = '';
        // Skip system prompt in rendering
        chatHistory.forEach(msg => {
            if (msg.role !== 'system') {
                appendMessageToUI(msg.role, msg.content);
            }
        });
        scrollToBottom();
    }

    function appendMessageToUI(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-chat-message ${role}`;
        msgDiv.innerHTML = formatMarkdown(text);
        messagesContainer.appendChild(msgDiv);
        return msgDiv;
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function formatMarkdown(text) {
        let escaped = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Bold
        escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Inline code
        escaped = escaped.replace(/`(.*?)`/g, '<code>$1</code>');

        // Paragraphs / Newlines
        escaped = escaped.replace(/\n\n/g, '</p><p>');
        escaped = escaped.replace(/\n/g, '<br>');

        return `<p>${escaped}</p>`;
    }

    // Toggle Chat Window
    function toggleChat() {
        const isOpen = chatWindow.classList.toggle('open');
        if (isOpen) {
            trigger.classList.remove('pulse');
            if (teaser) teaser.style.display = 'none';
            setTimeout(() => input.focus(), 150);
        }
    }

    trigger.addEventListener('click', toggleChat);
    if (teaser) {
        teaser.addEventListener('click', toggleChat);
    }

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });

    clearBtn.addEventListener('click', () => {
        if (confirm("Reset conversation logs?")) {
            resetChat();
        }
    });

    // Handle user queries
    async function handleSend(text) {
        const query = text || input.value.trim();
        if (!query) return;

        input.value = '';
        // Disable inputs
        input.disabled = true;
        sendBtn.disabled = true;

        // Append user message
        chatHistory.push({ role: 'user', content: query });
        appendMessageToUI('user', query);
        scrollToBottom();

        // Create typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'ai-chat-message assistant ai-chat-typing';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingIndicator);
        scrollToBottom();

        try {
            // Send request to proxy endpoint
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: activeModel,
                    messages: chatHistory,
                    stream: true
                })
            });


            // Remove typing indicator
            typingIndicator.remove();

            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }

            // Create container for assistant response
            const assistantMsgDiv = appendMessageToUI('assistant', '');
            let assistantText = '';

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let partialBuffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                partialBuffer += decoder.decode(value, { stream: true });
                const lines = partialBuffer.split('\n');

                // Keep the last partial line in the buffer
                partialBuffer = lines.pop();

                for (const line of lines) {
                    if (!line.trim()) continue;
                    try {
                        const json = JSON.parse(line);
                        if (json.message && json.message.content) {
                            assistantText += json.message.content;
                            assistantMsgDiv.innerHTML = formatMarkdown(assistantText);
                            scrollToBottom();
                        }
                    } catch (err) {
                        console.warn("Failed to parse chunk:", line, err);
                    }
                }
            }

            // Parse final buffer if anything remains
            if (partialBuffer.trim()) {
                try {
                    const json = JSON.parse(partialBuffer);
                    if (json.message && json.message.content) {
                        assistantText += json.message.content;
                        assistantMsgDiv.innerHTML = formatMarkdown(assistantText);
                    }
                } catch (e) { }
            }

            // Save completed assistant response to history
            chatHistory.push({ role: 'assistant', content: assistantText });

        } catch (error) {
            console.error("AI Assistant request failed:", error);
            typingIndicator.remove();
            appendMessageToUI('assistant', `⚠️ **Connection Error**: Failed to reach Command AI server. This usually means the Gemma3:4b model is still being pulled and loaded inside the container, or the service is initializing. Please wait 1-2 minutes and try again.`);
            scrollToBottom();
        } finally {
            input.disabled = false;
            sendBtn.disabled = false;
            input.focus();
        }
    }

    sendBtn.addEventListener('click', () => handleSend());
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            handleSend(query);
        });
    });

    // Initialize first welcome message
    resetChat();
}
