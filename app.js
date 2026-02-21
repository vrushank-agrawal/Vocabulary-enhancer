import { words } from './words.js';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const recipients = process.env.RECIPIENTS.split(',');

// Use days since epoch for continuous cycling through words
// Send 3 words per day
const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
const startIndex = (daysSinceEpoch * 3) % words.length;
const todaysWords = [
  words[startIndex],
  words[(startIndex + 1) % words.length],
  words[(startIndex + 2) % words.length]
];

if (!RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is required');
}
if (recipients.length === 0 || recipients[0] === '') {
  throw new Error('RECIPIENTS environment variable is required');
}

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px;
      text-align: center;
    }
    .header-title {
      color: #ffffff;
      font-size: 16px;
      font-weight: 500;
      margin: 0;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .header-date {
      color: rgba(255, 255, 255, 0.8);
      font-size: 13px;
      margin: 8px 0 0 0;
    }
    .content {
      padding: 40px 30px;
    }
    .word-section {
      margin-bottom: 20px;
    }
    .word-divider {
      border: none;
      border-top: 2px solid #e2e8f0;
      margin: 40px 0;
    }
    .word-main {
      text-align: center;
      margin-bottom: 30px;
    }
    .word-english {
      font-size: 48px;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 12px 0;
      line-height: 1.2;
    }
    .word-hindi {
      font-size: 28px;
      color: #667eea;
      font-weight: 600;
      margin: 0;
    }
    .meaning-box {
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      border-radius: 12px;
      padding: 24px;
      margin: 30px 0;
      border: 2px solid #e2e8f0;
    }
    .meaning-label {
      font-size: 11px;
      font-weight: 700;
      color: #667eea;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 0 8px 0;
    }
    .meaning-text {
      font-size: 17px;
      color: #1a202c;
      margin: 0 0 16px 0;
      line-height: 1.6;
      font-weight: 500;
    }
    .meaning-text:last-child {
      margin-bottom: 0;
    }
    .section {
      margin: 25px 0;
      padding: 20px;
      background-color: #f7fafc;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    .section-title {
      font-size: 12px;
      font-weight: 700;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 10px 0;
    }
    .section-content {
      font-size: 16px;
      color: #2d3748;
      margin: 0;
      line-height: 1.6;
    }
    .synonyms {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 10px 0 0 0;
    }
    .synonym-tag {
      background-color: #edf2f7;
      color: #4a5568;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }
    .synonym-subsection {
      margin-bottom: 16px;
    }
    .synonym-subsection:last-child {
      margin-bottom: 0;
    }
    .example-box {
      background-color: #fff;
      border-left: 4px solid #48bb78;
      padding: 20px;
      border-radius: 8px;
      margin: 25px 0 0 0;
    }
    .example-label {
      font-size: 11px;
      font-weight: 700;
      color: #48bb78;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 0 8px 0;
    }
    .example-text {
      font-size: 16px;
      font-style: italic;
      color: #2d3748;
      margin: 0 0 16px 0;
      line-height: 1.7;
    }
    .example-text:last-child {
      margin-bottom: 0;
    }
    .footer {
      background-color: #f7fafc;
      padding: 20px 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .footer-text {
      color: #718096;
      font-size: 12px;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 class="header-title">📚 Daily Vocabulary - 3 Words</h2>
      <p class="header-date">${new Date().toDateString()}</p>
    </div>

    <div class="content">
      ${todaysWords.map((word, index) => `
        ${index > 0 ? '<hr class="word-divider">' : ''}
        <div class="word-section">
          <div class="word-main">
            <h1 class="word-english">${word.english}</h1>
            <p class="word-hindi">${word.hindi}</p>
          </div>

          <div class="meaning-box">
            <p class="meaning-label">📖 Definition</p>
            <p class="meaning-text">${word.meaning_en}</p>
            <p class="meaning-label">हिंदी अर्थ</p>
            <p class="meaning-text">${word.meaning_hi}</p>
          </div>

          <div class="section">
            <p class="section-title">Synonyms</p>
            <div class="synonym-subsection">
              <div class="synonyms">
                ${word.synonyms_en.map(syn => `<span class="synonym-tag">${syn}</span>`).join('')}
              </div>
            </div>
            <div class="synonym-subsection">
              <div class="synonyms">
                ${word.synonyms_hi.map(syn => `<span class="synonym-tag">${syn}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="example-box">
            <p class="example-label">💬 Example</p>
            <p class="example-text">"${word.example_en}"</p>
            <p class="example-label">उदाहरण</p>
            <p class="example-text">"${word.example_hi}"</p>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="footer">
      <p class="footer-text">Keep learning, one word at a time! 🚀</p>
    </div>
  </div>
</body>
</html>
`;

// Send emails using Resend REST API
for (const to of recipients) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Vocab Enhancer <onboarding@resend.dev>',
      to: to.trim(),
      subject: `Daily Vocab: ${todaysWords.map(w => w.english).join(', ')}`,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Failed to send to ${to}:`, error);
  } else {
    const result = await response.json();
    console.log(`✓ Sent to ${to} (ID: ${result.id})`);
  }
}

console.log(`\nCompleted: Sent to ${recipients.length} recipient(s)`);
