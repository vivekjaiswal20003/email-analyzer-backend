export function detectEspType(parsedEmail: any): string {
  const receivedHeaders = parsedEmail.headerLines.filter(h => h.key === 'received').map(h => h.line.toLowerCase());
  const messageId = parsedEmail.messageId ? parsedEmail.messageId.toLowerCase() : '';
  const from = parsedEmail.from && parsedEmail.from.value[0] ? parsedEmail.from.value[0].address.toLowerCase() : '';

  // Common ESP patterns in Received headers
  if (receivedHeaders.some(line => line.includes('google.com') || line.includes('gmail.com'))) {
    return 'Gmail';
  }
  if (receivedHeaders.some(line => line.includes('outlook.com') || line.includes('hotmail.com') || line.includes('live.com'))) {
    return 'Outlook/Hotmail';
  }
  if (receivedHeaders.some(line => line.includes('yahoo.com'))) {
    return 'Yahoo Mail';
  }
  if (receivedHeaders.some(line => line.includes('mail.ru'))) {
    return 'Mail.ru';
  }
  if (receivedHeaders.some(line => line.includes('aol.com'))) {
    return 'AOL Mail';
  }
  if (receivedHeaders.some(line => line.includes('yandex.ru'))) {
    return 'Yandex Mail';
  }
  if (receivedHeaders.some(line => line.includes('protonmail.com'))) {
    return 'ProtonMail';
  }
  if (receivedHeaders.some(line => line.includes('zoho.com'))) {
    return 'Zoho Mail';
  }
  if (receivedHeaders.some(line => line.includes('amazon.com') && line.includes('ses'))) {
    return 'Amazon SES';
  }
  if (receivedHeaders.some(line => line.includes('sendgrid.net'))) {
    return 'SendGrid';
  }
  if (receivedHeaders.some(line => line.includes('mailgun.org'))) {
    return 'Mailgun';
  }
  if (receivedHeaders.some(line => line.includes('microsoft.com') && line.includes('protection.outlook.com'))) {
    return 'Microsoft 365 (Exchange Online)';
  }
  if (receivedHeaders.some(line => line.includes('secureserver.net') || line.includes('godaddy.com'))) {
    return 'GoDaddy Mail';
  }
  if (receivedHeaders.some(line => line.includes('fastmail.com'))) {
    return 'FastMail';
  }
  if (receivedHeaders.some(line => line.includes('icloud.com'))) {
    return 'iCloud Mail';
  }

  // Patterns in Message-ID or From address for specific services
  if (messageId.includes('linkedin.com')) {
    return 'LinkedIn';
  }
  if (from.includes('noreply@github.com')) {
    return 'GitHub';
  }
  if (from.includes('noreply@twitter.com')) {
    return 'Twitter';
  }
  if (from.includes('notifications@facebookmail.com')) {
    return 'Facebook';
  }

  return 'Unknown';
}
