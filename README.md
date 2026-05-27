# Data Biz

One-page POC website for Data & AI consultancy.

## Setup & Local Preview

Run a local HTTP server in the root directory to preview the site:

```bash
# Using Node.js
npx http-server ./

# Using Python
python -m http.server 8000
```

Open `http://localhost:8080` (or `8000`) in your browser to verify:
- **Theme Toggle:** Switch between Light (Warm Neutral) and Dark (Modern Data Command) modes in the navbar.
- **Hero Parallax:** Move cursor over the hero banner image.
- **Insights:** The dynamic Substack RSS feed loads successfully.
- **Tracking:** Check the console for GA4 click and scroll depth event logs.
