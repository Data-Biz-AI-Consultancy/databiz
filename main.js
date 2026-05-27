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
});

/**
 * Initialize Dark/Light Theme Switching
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    if (!themeToggle || !themeToggleIcon) return;

    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
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

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
            // Keep the latest 3 items
            const latestPosts = data.items.slice(0, 3);
            
            let html = '';
            latestPosts.forEach((post, index) => {
                // Clean up the description
                let summary = post.description.replace(/<[^>]*>?/gm, '').split('.')[0] + '.';
                if (summary.length > 120) summary = summary.substring(0, 117) + '...';

                // Use post thumbnail or a default image if not present
                const thumbnail = post.thumbnail || post.enclosure.link || 'https://lh3.googleusercontent.com/aida/ADBb0ugSYgN3Oxm_CdvYcP6wj-e9x0LwazddkXM6htcZGpk8GQsB6VkcEk9m-x_oZ_hSHy5PGjXrLtQzpKxEmBvtoo3-ZkG-1fXCubohDRAbRh97QTWEJNYGT_iqDnK9AQi4Che6n-jwpqVRSXZSsnd7-YtjYQUo2uG3Ot_1vMBbDJ8sdVR2xq_PO-dnv3cEPjK5VVtJIh0ptCnETVUQbm-9CMhHeWGllYKXaCLNdGzF6AkDGGDHP_ri9GcXqfM';

                html += `
                    <div class="group cursor-pointer" data-vibe-reveal onclick="window.open('${post.link}', '_blank')">
                        <div class="relative aspect-video mb-md overflow-hidden rounded-lg border border-outline-variant">
                            <img alt="${post.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="${thumbnail}">
                        </div>
                        <span class="font-label-caps text-[10px] text-secondary tracking-widest block mb-xs">INSIGHTS • 5 MIN READ</span>
                        <h3 class="font-headline-md text-body-lg font-bold group-hover:text-primary transition-colors">${post.title}</h3>
                        <p class="text-on-surface-variant font-body-sm text-body-sm mt-sm">${summary}</p>
                    </div>
                `;
            });

            grid.innerHTML = html;

            // Re-initialize scroll reveal for new elements
            initScrollReveal();
        }
    } catch (error) {
        console.error('Failed to fetch Substack feed:', error);
        // Fallback remains in HTML
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
