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
        subject = '¡Bienvenida al programa Builders de BdB! 🚀';
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
        ul { padding-left: 20px; }
        li { margin: 8px 0; }
        h3 { color: #374151; margin-top: 25px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>¡Bienvenida ${data.fullName}!</h1>
          <p>Tu aplicación al programa Builders ha sido recibida exitosamente</p>
        </div>
        
        <div class="content">
          <h2>¿Qué sigue ahora?</h2>
          <p>Hemos recibido tu aplicación y nuestro equipo la revisará en las próximas 48 horas.</p>
          
          <h3>Timeline del proceso:</h3>
          <ul>
            <li><strong>Hoy:</strong> Aplicación recibida ✅</li>
            <li><strong>2-3 días:</strong> Revisión de perfil</li>
            <li><strong>5-7 días:</strong> Entrevista técnica (si calificas)</li>
            <li><strong>2 semanas:</strong> Decisión final</li>
          </ul>

          ${data.hasAccessCode ? 
            '<div class="highlight-box"><strong>🎯 Código de acceso detectado:</strong> Tu aplicación tiene prioridad en el proceso de selección.</div>' 
            : ''}

          <h3>Mientras esperas:</h3>
          <p>Te recomendamos revisar nuestros recursos preparatorios:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="#" class="button">Recursos Web3 📚</a>
            <a href="#" class="button">Únete a Discord 💬</a>
          </div>
        </div>

        <div class="footer">
          <p>¿Preguntas? Responde este email o escríbenos a builders@bdb.com</p>
          <p><strong>Builders de Blockchain</strong> - Formando el futuro Web3 de LATAM</p>
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
          <p><strong>Builders de Blockchain</strong> - Tu socio estratégico Web3</p>
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
          <p><strong>Builders de Blockchain</strong> - Acelerando protocolos en LATAM</p>
        </div>
      </div>
    </body>
    </html>
  `;
}