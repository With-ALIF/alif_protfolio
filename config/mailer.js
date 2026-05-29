import { CONFIG } from "./config.js";

function validateForm(formData) {
  const errors = [];

  if (!formData.name.trim()) {
    errors.push('Name is required');
  }

  if (!formData.email.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Please enter a valid email');
  }

  if (!formData.subject.trim()) {
    errors.push('Subject is required');
  }

  if (!formData.message.trim()) {
    errors.push('Message is required');
  }

  return errors;
}

function showAlert(message, type = 'success') {
  const alertDiv = document.createElement('div');

  alertDiv.className = `form-alert form-alert-${type}`;
  alertDiv.textContent = message;

  alertDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 14px 18px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    color: #fff;
    backdrop-filter: blur(10px);
    animation: slideIn .3s ease;
    box-shadow: 0 10px 30px rgba(0,0,0,.2);
    background: ${
      type === 'success'
        ? 'linear-gradient(135deg,#10b981,#059669)'
        : 'linear-gradient(135deg,#ef4444,#dc2626)'
    };
  `;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.style.opacity = '0';
    alertDiv.style.transform = 'translateX(40px)';

    setTimeout(() => {
      alertDiv.remove();
    }, 300);
  }, 4000);
}

function initializeEmailJS() {
  if (window.emailjs && typeof window.emailjs.init === 'function') {
    window.emailjs.init(CONFIG.emailjs.PUBLIC_KEY);
  } else {
    setTimeout(initializeEmailJS, 100);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEmailJS);
} else {
  initializeEmailJS();
}

async function sendEmailJS(formData) {
  const templateParams = {
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
    time: new Date().toLocaleString()
  };

  const response = await window.emailjs.send(
    CONFIG.emailjs.SERVICE_ID,
    CONFIG.emailjs.TEMPLATE_ID,
    templateParams
  );

  if (!response || response.status !== 200) {
    throw new Error('EmailJS failed');
  }

  return true;
}

function escapeHTML(text) {
  if (!text) return '';

  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatTelegramMessage(formData) {
  const name = escapeHTML(formData.name);
  const email = escapeHTML(formData.email);
  const subject = escapeHTML(formData.subject);
  const message = escapeHTML(formData.message);

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

  return `
<b>🚀 NEW PORTFOLIO MESSAGE</b>

━━━━━━━━━━━━━━━━━━

<b>👤 Sender</b>: <code>${name}</code>\n

<b>📧 Email: </b> <code>${email}</code> \n

<b>📝 Subject:</b> <code>${subject}</code>\n\n

<b>💬 Message</b>
${message}  \n\n

<b>🕒 Received:</b>
<code>${currentTime}</code>

━━━━━━━━━━━━━━━━━━
`;
}

async function sendTelegramNotification(formData) {
  try {
    const telegramMessage = formatTelegramMessage(formData);

    const response = await fetch(
      `https://api.telegram.org/bot${CONFIG.telegram.BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          chat_id: CONFIG.telegram.CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok || !data.ok) {
      throw new Error(data.description || 'Telegram failed');
    }

    return true;
  } catch (error) {
    console.error('Telegram Error:', error);
    return false;
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;

  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const subjectInput = form.querySelector('#subject');
  const messageInput = form.querySelector('#message');

  const submitBtn = form.querySelector('button[type="submit"]');

  const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    subject: subjectInput.value.trim(),
    message: messageInput.value.trim()
  };

  const errors = validateForm(formData);

  if (errors.length > 0) {
    errors.forEach(error => showAlert(error, 'error'));
    return;
  }

  const originalText = submitBtn.innerHTML;

  submitBtn.disabled = true;

  submitBtn.innerHTML = 'Sending...';

  try {
    await sendEmailJS(formData);

    await sendTelegramNotification(formData);

    showAlert(
      'Message sent successfully!',
      'success'
    );

    form.reset();
  } catch (error) {
    console.error(error);

    showAlert(
      'Failed to send message.',
      'error'
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

export function initializeContactForm() {
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

