export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    let BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    let CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // In local development, if process.env was not loaded by CLI, read from .env / .env.local
    if (!BOT_TOKEN || !CHAT_ID) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const envCandidates = [
          path.resolve(process.cwd(), '.env.local'),
          path.resolve(process.cwd(), '.env'),
          path.resolve(process.cwd(), 'alif', '.env.local'),
          path.resolve(process.cwd(), 'alif', '.env')
        ];

        for (const filePath of envCandidates) {
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const tokenMatch = content.match(/TELEGRAM_BOT_TOKEN\s*=\s*(.+)/);
            const chatMatch = content.match(/TELEGRAM_CHAT_ID\s*=\s*(.+)/);
            if (tokenMatch && !BOT_TOKEN) BOT_TOKEN = tokenMatch[1].trim();
            if (chatMatch && !CHAT_ID) CHAT_ID = chatMatch[1].trim();
          }
        }
      } catch (err) {
        console.warn('Could not read local env file:', err.message);
      }
    }

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ error: 'Telegram environment variables (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID) are missing' });
    }

    const escapeHTML = (text) => {
      if (!text) return '';
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    };

    const currentTime = new Date().toLocaleString('en-BD', {
      timeZone: 'Asia/Dhaka',
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const telegramMessage = `
<b>🚀 NEW PORTFOLIO MESSAGE</b>

━━━━━━━━━━━━━━━━━━

<b>👤 Sender:</b> <code>${escapeHTML(name)}</code>

<b>📧 Email:</b> <code>${escapeHTML(email)}</code>

<b>📝 Subject:</b> <code>${escapeHTML(subject)}</code>

<b>💬 Message:</b>
${escapeHTML(message)}

<b>🕒 Received:</b>
<code>${currentTime}</code>

━━━━━━━━━━━━━━━━━━
`;

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.description || 'Telegram API call failed');
    }

    return res.status(200).json({ success: true, message: 'Telegram notification sent successfully' });
  } catch (error) {
    console.error('Telegram Serverless Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
