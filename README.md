# Vocabulary Enhancer 📚

A GitHub Actions-powered daily vocabulary service that sends beautifully formatted English-Hindi word emails to help enhance your vocabulary.

## Features

- 📧 Daily vocabulary emails with English-Hindi translations
- 🎨 Beautiful, responsive HTML email design
- 🔄 Automated delivery via GitHub Actions (daily at 7 AM IST)
- 📝 Includes synonyms and practical examples
- ⚡ Zero dependencies - uses native Node.js fetch API
- 🔁 Smart word cycling - ensures all words are used over time

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Vocabulary-enhancer.git
   cd Vocabulary-enhancer
   ```

2. **Set up Resend API**
   - Sign up at [resend.com](https://resend.com)
   - Get your API key
   - Verify your domain (or use the resend.dev test domain)

3. **Configure GitHub Secrets**
   - Go to your repo Settings → Secrets and variables → Actions
   - Add these secrets:
     - `RESEND_API_KEY`: Your Resend API key
     - `RECIPIENTS`: Comma-separated email addresses (e.g., `email1@example.com,email2@example.com`)

4. **Test locally** (optional)
   ```bash
   # Set environment variables and run
   RESEND_API_KEY=your_key_here RECIPIENTS=your@email.com node app.js
   ```

## How It Works

- The workflow runs daily at 1:00 AM UTC (7:00 AM IST)
- Selects a word using days-since-epoch modulo word count (ensures all words are eventually sent, regardless of array size)
- Sends a styled email with the word, Hindi translation, synonyms, and an example
- Uses Resend's REST API directly via native fetch (no external dependencies)

## Customization

- **Add more words**: Edit `words.js`
- **Change schedule**: Edit `.github/workflows/daily.yaml` (cron syntax)
- **Modify email design**: Edit the HTML template in `app.js`

## Tech Stack

- Node.js 20+ with native fetch API (zero dependencies!)
- [Resend REST API](https://resend.com) for email delivery
- GitHub Actions for automation

## License

MIT
