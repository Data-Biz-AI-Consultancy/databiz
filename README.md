# 💼 DataBiz AI & Data Consulting

> A premium, highly interactive multi-page web application and AI assistant portal showcasing elite Data & AI operational excellence. Led by Don Jimmy (Jimmy Pang).

---

## 🌟 Key Features

*   **🤖 Bella AI Assistant:** Warm, competent Italian concierge (`Ollama` + `Gemma 3`) guiding visitors to book calls.
*   **🌓 Dual-Theme Engine:** Toggle between Light (Warm Neutral) and Dark (Modern Data Command) modes.
*   **✨ Parallax Hero Banner:** Sleek cursor-driven visual depth effect on the homepage hero.
*   **📊 Dynamic Insights Feed:** Live Substack RSS integration displaying latest consulting articles.
*   **🛠️ Tooling Portal:** Interactive demonstrations of core data utilities.
*   **🔒 Secure Topology:** Docker & Caddy setup with HSTS, asset caching, and SSE stream proxying.
*   **🧪 Test Coverage:** Unit testing (Vitest + JSDOM) and End-to-End browser tests (Playwright).

---

## 📁 Repository Structure

```
databiz/
├── .github/                  # CI/CD Workflows
├── src/
│   ├── frontend/             # Frontend Application
│   │   ├── assets/           # Brand assets, logos, banners, and Bella avatar
│   │   ├── index.html        # Landing page with Parallax Hero & Client Testimonials
│   │   ├── about.html        # Corporate values, team profile, & mission
│   │   ├── offers.html       # Service catalog, consulting packages & tiers
│   │   ├── insights.html     # Substack RSS feed integration
│   │   ├── toolings.html     # Interactive data utility demonstrations
│   │   ├── case-study.html   # Showcasing client success stories and metrics
│   │   ├── main.js           # Core JS logic: Theme engine, Parallax, RSS, Bella chat UI
│   │   └── style.css         # Custom responsive design system & glassmorphism components
│   └── ai/
│       └── bella.md          # Persona grounding and LLM system prompts for Ollama
├── tests/
│   ├── frontend/
│   │   ├── main.test.js      # Vitest JSDOM frontend logic unit tests
│   │   ├── navigation.spec.js # Playwright E2E navigation & interaction tests
│   │   └── vitest.config.js  # Vitest configuration
│   └── playwright.config.js  # Playwright browser automation config
├── Caddyfile                 # Production reverse-proxy & HTTPS config
├── nginx.conf                # Nginx web server config for Docker frontend container
├── Dockerfile                # Nginx container definition
├── docker-compose.yml        # Orchestration for Frontend & Ollama services
└── package.json              # Node dev dependencies and runner scripts
```

---

## 🛠️ Local Development Setup

To preview and develop on the website locally:

```bash
docker compose up -d --build
```

Open `http://localhost:8080` in your browser to view the application.

---

## 🐋 Production Deployment (Docker & Caddy)

DataBiz runs inside a containerized topology designed for high availability and reverse proxy security.

### Docker Composition (`docker-compose.yml`)
The setup spins up two primary services:
1.  **`frontend`**: Built on `nginx:alpine`, serving the static files and proxying API endpoints.
2.  **`ollama`**: The LLM engine hosting the Gemma 3 model for the Bella AI assistant.

To launch the stack locally/production:
```bash
docker compose up -d --build
```

### Caddy Reverse Proxy Configuration (`Caddyfile`)
Caddy manages automatic SSL certificate generation, domain routing, security headers (HSTS, frame options, sniffing protection), and handles:
-   **SSE & WebSockets** optimization for chat responses (disables flush interval).
-   Proxying requests from the frontend to Ollama backend APIs on `/api/*`.

---

## 👩‍💼 Bella AI Assistant Persona

Bella is grounded inside `/src/ai/bella.md` and uses `Ollama (Gemma 3)`. 

*   **Role:** Web Portal Concierge & Assistant.
*   **Tone:** Professional Italian elegance, high competence, warm, respectful.
*   **Primary Objective:** Maintain a polite and helpful demeanor with clients while guiding them to book a discovery call on Don Jimmy's calendar.
