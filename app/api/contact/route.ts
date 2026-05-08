import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { nombre, empresa, email, servicio, mensaje } = data;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // Debug logging (masking sensitive data)
    console.log('SMTP Attempt:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      hasUser: !!process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS,
      receiver: process.env.CONTACT_RECEIVER_EMAIL
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `"Acerta Web" <${process.env.CONTACT_RECEIVER_EMAIL || 'contacto@acentraperu.com'}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || 'contacto@acentraperu.com',
      replyTo: email,
      subject: `Nueva solicitud de diagnóstico de ${nombre} - ${empresa || 'Empresa no especificada'}`,
      text: `
        Has recibido un nuevo mensaje desde el formulario de contacto de Acerta.
        
        Detalles del prospecto:
        - Nombre: ${nombre}
        - Empresa: ${empresa || 'No especificada'}
        - Email: ${email}
        - Servicio de interés: ${servicio}
        
        Mensaje:
        ${mensaje}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #102C57; color: #fff; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Nuevo Lead - Acerta</h2>
          </div>
          <div style="padding: 20px;">
            <p>Has recibido un nuevo mensaje desde el formulario de contacto web.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Nombre:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Empresa:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${empresa || '<em>No especificada</em>'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Servicio:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${servicio || '<em>No especificado</em>'}</td>
              </tr>
            </table>
            <h3 style="margin-top: 30px; border-bottom: 1px solid #1679AB; padding-bottom: 5px; color: #1679AB;">Mensaje / Requerimiento</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #102C57; white-space: pre-wrap;">${mensaje}</div>
          </div>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
            Este correo fue generado automáticamente por el sitio web de Acerta.
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ success: true, message: 'Email enviado correctamente' }, { status: 200 });
  } catch (error: any) {
    console.error('Error enviando email:', error);
    return NextResponse.json({
      error: 'Error al enviar el email',
      message: error.message || 'Error desconocido'
    }, { status: 500 });
  }
}
