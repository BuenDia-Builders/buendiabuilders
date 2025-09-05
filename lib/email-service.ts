export type EmailType = 'builders' | 'empresas' | 'blockchains' | 'cities';

export interface BuildersEmailData {
  fullName: string;
  email: string;
  hasAccessCode: boolean;
  technicalExperience: string;
  whyWeb3: string;
}

export interface EmpresasEmailData {
  name: string;
  company: string;
  email: string;
  role: string;
  needs: string;
}

export interface BlockchainsEmailData {
  name: string;
  protocol: string;
  email: string;
  role: string;
  goals: string;
  budget?: string | null;
}

export interface CitiesEmailData {
  email: string;
  city: string;
}

export type EmailData = BuildersEmailData | EmpresasEmailData | BlockchainsEmailData | CitiesEmailData;

export async function sendEmail(type: EmailType, data: EmailData) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error;
  }
}