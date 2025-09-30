import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import type { EmailType, BuildersEmailData, EmpresasEmailData, BlockchainsEmailData } from '@/lib/email-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data }: { type: EmailType; data: any } = body;

    if (!type || !data) {
      return NextResponse.json({ error: 'Tipo y data son requeridos' }, { status: 400 });
    }

    let emailContent: string;
    let subject: string;
    let to: string;

    switch (type) {
      case 'builders':
        emailContent = generateBuildersEmail(data as BuildersEmailData);
        subject = '¡Bienvenida a Código Futura! 🚀';
        to = data.email;
        break;

      case 'empresas':
        emailContent = generateEmpresasEmail(data as EmpresasEmailData);
        subject = 'Gracias por tu interés - Próximos pasos';
        to = data.email;
        break;

      case 'blockchains':
        emailContent = generateBlockchainsEmail(data as BlockchainsEmailData);
        subject = 'Partnership BdB - Siguiente paso';
        to = data.email;
        break;

      default:
        return NextResponse.json({ error: 'Tipo de email inválido' }, { status: 400 });
    }

    const { data: emailResult, error } = await resend.emails.send({
      from: 'Buen Dia Builders <noreply@buendiabuilders.com>',
      to: [to],
      subject: subject,
      html: emailContent,
    });

    if (error) {
      console.error('Error enviando email:', error);
      return NextResponse.json({ error: 'Error enviando email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: emailResult?.id });

  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// Templates de emails
function generateBuildersEmail(data: BuildersEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0;
          padding: 0;
        }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
          background: linear-gradient(135deg, #3b82f6, #8b5cf6); 
          padding: 30px 20px; 
          text-align: center; 
          color: white; 
          border-radius: 12px; 
          margin-bottom: 20px;
        }
        .header h1 { margin: 0 0 10px 0; font-size: 28px; }
        .stellar-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          margin-top: 10px;
          display: inline-block;
        }
        .content { 
          padding: 30px; 
          background: #f9fafb; 
          border-radius: 12px; 
          margin: 20px 0; 
          border: 1px solid #e5e7eb;
        }
        .button { 
          display: inline-block; 
          background: linear-gradient(135deg, #3b82f6, #8b5cf6); 
          color: white; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 8px; 
          margin: 10px 5px; 
          font-weight: 500;
        }
        .footer { 
          text-align: center; 
          color: #6b7280; 
          font-size: 14px; 
          margin-top: 30px; 
          padding: 20px;
        }
        .highlight-box {
          background: #dcfce7; 
          padding: 20px; 
          border-radius: 8px; 
          border-left: 4px solid #16a34a;
          margin: 20px 0;
        }
        .schedule-box {
          background: #dbeafe;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
          margin: 20px 0;
        }
        .dates-box {
          background: #fef3c7;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
          margin: 20px 0;
        }
        ul { padding-left: 20px; }
        li { margin: 8px 0; }
        h3 { color: #374151; margin-top: 25px; }
        .timeline-item {
          padding: 12px;
          margin: 8px 0;
          background: white;
          border-radius: 6px;
          border-left: 3px solid #8b5cf6;
        }
        .timeline-item strong {
          color: #8b5cf6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>¡Bienvenida ${data.fullName}! 🎉</h1>
          <p style="font-size: 18px; margin: 10px 0;">Tu aplicación a <strong>Código Futura</strong> ha sido recibida</p>
          <div class="stellar-badge">
            ✨ Con apoyo de Stellar a través de The BAF Network
          </div>
        </div>
        
        <div class="content">
          <h2>🚀 Sobre Código Futura</h2>
          <p>Nuestro programa intensivo y <strong>gratuito</strong> que te transforma de <strong>Programadora Web2 a Programadora Web3</strong>, con el respaldo de Stellar a través de The BAF Network.</p>
          
          <div class="highlight-box">
            <strong>📅 La semana que viene te llegará la confirmación de acceso al programa si quedaste seleccionada.</strong>
          </div>

          <h3>📆 Fechas clave del programa:</h3>
          <div class="dates-box">
            <div class="timeline-item">
              <strong>7 Oct - 13 Nov:</strong> Código Futura (programa principal - 7 semanas) ONLINE para toda LATAM
            </div>
            <div class="timeline-item">
              <strong>16 - 23 Nov:</strong> Casa Builder / Builder Retreat (solo con beca) PRESENCIAL en Buenos Aires, Argentina
            </div>
            <div class="timeline-item">
              <strong>17 - 19 Nov:</strong> Bootcamp intensivo (opcional) PRESENCIAL en Buenos Aires, Argentina
            </div>
            <div class="timeline-item">
              <strong>20 - 22 Nov:</strong> Hackathon Final (obligatorio) PRESENCIAL en Buenos Aires, Argentina🎯
            </div>
          </div>

          <h3>🕐 Horarios de clases:</h3>
          <div class="schedule-box">
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>Martes y Jueves:</strong> 18:30 - 20:00 hs</li>
              <li><strong>Sábados:</strong> Sesiones de refuerzo</li>
              <li><strong>Duración total:</strong> 7 semanas de formación intensiva</li>
            </ul>
          </div>

          <h3>¿Qué sigue ahora?</h3>
          <p>Hemos recibido tu aplicación y ahora comienza nuestro proceso de selección:</p>
          
          <ul>
            <li><strong>Esta semana:</strong> Revisión técnica de tu GitHub y perfil</li>
            <li><strong>Próxima semana:</strong> Decisión final y notificación por email</li>
            <li><strong>Si quedas seleccionada:</strong> Onboarding completo + acceso al programa + grupo de Telegram</li>
          </ul>

          <h3>💎 Lo que aprenderás:</h3>
          <ul>
            <li>Fundamentos de blockchain y la red Stellar</li>
            <li>Emitir activos y realizar transacciones en Stellar</li>
            <li>Smart contracts con Soroban (Rust)</li>
            <li>Frontend con React + integración de wallets</li>
            <li>Crear una dApp funcional completa</li>
            <li>Preparación para hackathons internacionales</li>
          </ul>

          <h3>Mientras esperas:</h3>
          <p>Te recomendamos seguir nuestras redes sociales para mantenerte al día con novedades del programa:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://x.com/buendiabuilders" class="button">Síguenos en X 🐦</a>
            <a href="https://www.linkedin.com/company/buen-dia-builders" class="button">LinkedIn 💼</a>
            <a href="https://www.instagram.com/buendia_builders/" class="button">Instagram 📸</a>
          </div>

          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; text-align: center; color: #0369a1;">
              <strong>🌟 Recuerda:</strong> El hackathon del 20-22 de noviembre es obligatorio para todas las builders seleccionadas.
            </p>
          </div>
        </div>

        <div class="footer">
          <p>¿Preguntas? Responde este email o escríbenos a builders@buendiabuilders.com</p>
          <p><strong>Buen Dia Builders</strong> - Formando el futuro Web3 de LATAM 🌎</p>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
            Código Futura es posible gracias al apoyo de Stellar a través de The BAF Network
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateEmpresasEmail(data: EmpresasEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0;
          padding: 0;
        }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
          background: linear-gradient(135deg, #8b5cf6, #3b82f6); 
          padding: 30px 20px; 
          text-align: center; 
          color: white; 
          border-radius: 12px; 
          margin-bottom: 20px;
        }
        .header h1 { margin: 0 0 10px 0; font-size: 28px; }
        .content { 
          padding: 30px; 
          background: #f9fafb; 
          border-radius: 12px; 
          margin: 20px 0; 
          border: 1px solid #e5e7eb;
        }
        .button { 
          display: inline-block; 
          background: linear-gradient(135deg, #8b5cf6, #3b82f6); 
          color: white; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 8px; 
          margin: 10px 0; 
          font-weight: 500;
        }
        .footer { 
          text-align: center; 
          color: #6b7280; 
          font-size: 14px; 
          margin-top: 30px; 
          padding: 20px;
        }
        .highlight { 
          background: #e0e7ff; 
          padding: 20px; 
          border-radius: 8px; 
          border-left: 4px solid #6366f1; 
          margin: 20px 0;
        }
        ol { padding-left: 20px; }
        li { margin: 8px 0; }
        h3 { color: #374151; margin-top: 25px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Gracias ${data.name}</h1>
          <p>Hemos recibido tu solicitud de ${data.company}</p>
        </div>
        
        <div class="content">
          <h2>Tu consulta ha sido registrada</h2>
          <p>Estimado ${data.name}, hemos recibido tu solicitud para explorar cómo BdB puede ayudar a ${data.company} con sus necesidades Web3.</p>
          
          <div class="highlight">
            <h3>Resumen de tu solicitud:</h3>
            <p><strong>Empresa:</strong> ${data.company}</p>
            <p><strong>Tu rol:</strong> ${data.role}</p>
            <p><strong>Necesidades:</strong> ${data.needs}</p>
          </div>

          <h3>Próximos pasos:</h3>
          <ol>
            <li>Nuestro equipo comercial revisará tu solicitud en 24 horas</li>
            <li>Te contactaremos para agendar una llamada de descubrimiento</li>
            <li>Prepararemos una propuesta customizada para ${data.company}</li>
          </ol>

          <p>Mientras tanto, puedes agendar directamente en nuestro calendario:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://calendar.app.google/XqUmUcgMq8ozc8dD9" class="button">Agendar llamada 📅</a>
          </div>
        </div>

        <div class="footer">
          <p>¿Urgente? Escríbenos a enterprise@bdb.com</p>
          <p><strong>Buen Dia Builders</strong> - Tu socio estratégico Web3</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateBlockchainsEmail(data: BlockchainsEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0;
          padding: 0;
        }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
          background: linear-gradient(135deg, #14b8a6, #3b82f6); 
          padding: 30px 20px; 
          text-align: center; 
          color: white; 
          border-radius: 12px; 
          margin-bottom: 20px;
        }
        .header h1 { margin: 0 0 10px 0; font-size: 28px; }
        .content { 
          padding: 30px; 
          background: #f9fafb; 
          border-radius: 12px; 
          margin: 20px 0; 
          border: 1px solid #e5e7eb;
        }
        .button { 
          display: inline-block; 
          background: linear-gradient(135deg, #14b8a6, #3b82f6); 
          color: white; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 8px; 
          margin: 10px 5px; 
          font-weight: 500;
        }
        .footer { 
          text-align: center; 
          color: #6b7280; 
          font-size: 14px; 
          margin-top: 30px; 
          padding: 20px;
        }
        .protocol-box { 
          background: #ecfdf5; 
          padding: 20px; 
          border-radius: 8px; 
          border-left: 4px solid #10b981; 
          margin: 20px 0;
        }
        ul { padding-left: 20px; }
        li { margin: 8px 0; }
        h3 { color: #374151; margin-top: 25px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Partnership con ${data.protocol}</h1>
          <p>Gracias ${data.name} por explorar nuestra alianza</p>
        </div>
        
        <div class="content">
          <h2>¡Excelente! Hablemos de la expansión LATAM</h2>
          <p>Hemos recibido tu interés en desarrollar ${data.protocol} en América Latina junto a BdB.</p>
          
          <div class="protocol-box">
            <h3>Detalles de tu consulta:</h3>
            <p><strong>Protocolo:</strong> ${data.protocol}</p>
            <p><strong>Tu rol:</strong> ${data.role}</p>
            <p><strong>Objetivos:</strong> ${data.goals}</p>
            ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
          </div>

          <h3>Nuestro proceso de partnership:</h3>
          <ul>
            <li><strong>Análisis técnico:</strong> Deep dive en tu protocolo (2 sem)</li>
            <li><strong>Propuesta customizada:</strong> Programa específico para LATAM</li>
            <li><strong>Pilot program:</strong> Ejecución inicial con métricas</li>
            <li><strong>Scale-up:</strong> Expansión basada en resultados</li>
          </ul>

          <p>Un miembro de nuestro equipo de partnerships te contactará en las próximas 48 horas.</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="#" class="button">Ver case studies 📊</a>
            <a href="#" class="button">Agenda una llamada 📞</a>
          </div>
        </div>

        <div class="footer">
          <p>¿Preguntas inmediatas? partnerships@bdb.com</p>
          <p><strong>Buen Dia Builders</strong> - Acelerando protocolos en LATAM</p>
        </div>
      </div>
    </body>
    </html>
  `;
}