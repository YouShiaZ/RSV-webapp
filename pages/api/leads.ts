import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface LeadData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  propertyId?: string;
  propertyTitle?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, message, propertyId, propertyTitle }: LeadData = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Get environment variables
    const ownerEmail = process.env.RSV_OWNER_EMAIL;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Check if SMTP is configured
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.warn('SMTP not configured. Skipping email notification.');
      return res.status(200).json({ 
        success: true, 
        message: 'Lead saved (email not configured)' 
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: parseInt(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Build email content
    const emailSubject = propertyTitle
      ? `New Lead: ${name} is interested in ${propertyTitle}`
      : `New Contact: Message from ${name}`;

    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #14b8a6; margin-bottom: 20px;">
            ${propertyTitle ? '🏠 New Property Lead' : '📧 New Contact Message'}
          </h2>
          
          <div style="background-color: #f0fdfa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0d9488; margin-top: 0;">Contact Information</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            ${phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #14b8a6; text-decoration: none;">${phone}</a></p>` : ''}
            ${email ? `<p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #14b8a6; text-decoration: none;">${email}</a></p>` : ''}
          </div>
          
          ${propertyTitle ? `
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #92400e; margin-top: 0;">Property Details</h3>
              <p style="margin: 8px 0;"><strong>Property:</strong> ${propertyTitle}</p>
              ${propertyId ? `<p style="margin: 8px 0;"><strong>Property ID:</strong> ${propertyId}</p>` : ''}
            </div>
          ` : ''}
          
          ${message ? `
            <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1e40af; margin-top: 0;">Message</h3>
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 8px 0;">
              Received: ${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 8px 0;">
              ${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #14b8a6; text-decoration: none; font-weight: bold;">💬 Open WhatsApp</a>` : ''}
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
          <p>Red Sea Valley Real Estate</p>
          <p>Premium Properties • Hurghada • El Gouna • Sahl Hasheesh • Soma Bay</p>
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Red Sea Valley" <${smtpUser}>`,
      to: ownerEmail || smtpUser,
      subject: emailSubject,
      html: emailBody,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Lead submitted and email sent successfully' 
    });
  } catch (error) {
    console.error('Error processing lead:', error);
    return res.status(500).json({ 
      error: 'Failed to process lead',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
