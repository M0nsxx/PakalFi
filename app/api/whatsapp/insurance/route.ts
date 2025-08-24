import { NextRequest, NextResponse } from 'next/server';
import { Twilio } from 'twilio';
import { ZeroXInsuranceIntegration } from '@/lib/integrations/0xProtocol';
import { ParaInsuranceIntegration } from '@/lib/integrations/paraInsurance';
import { getContracts } from '@/config/contracts';

// Initialize Twilio client
const twilio = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// Initialize partner integrations
const zeroX = new ZeroXInsuranceIntegration();
const para = new ParaInsuranceIntegration();

// Get deployed contracts
const contracts = getContracts(10143); // Monad testnet

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const from = body.get('From') as string;
    const message = body.get('Body') as string;
    const messageId = body.get('MessageSid') as string;

    console.log(`WhatsApp message from ${from}: ${message}`);

    // Process insurance command
    const response = await processInsuranceCommand(from, message);
    
    // Send WhatsApp response
    await sendWhatsAppMessage(from, response);
    
    // Log interaction for analytics
    await logWhatsAppInteraction({
      from,
      message,
      response,
      messageId,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('WhatsApp API error:', error);
    return NextResponse.json(
      { error: 'Failed to process WhatsApp message' },
      { status: 500 }
    );
  }
}

async function processInsuranceCommand(from: string, message: string): Promise<string> {
  const commands = {
    '/seguro': buyInsurance,
    '/claim': fileClaim,
    '/status': checkPolicyStatus,
    '/pagar': payPremium,
    '/cobertura': checkCoverage,
    '/precio': getQuote,
    '/appclip': createAppClip,
    '/gasless': gaslessPayment,
    '/savings': createSavingsGoal,
    '/help': showHelp
  };

  const command = message.toLowerCase().split(' ')[0];
  const handler = commands[command] || showHelp;
  
  return handler(from, message);
}

async function buyInsurance(from: string, message: string): Promise<string> {
  try {
    // Parse insurance type from message
    const parts = message.split(' ');
    const insuranceType = parts[1] || 'health';
    const amount = parts[2] || '50';

    // Create insurance policy
    const policy = await createPolicy({
      userPhone: from,
      insuranceType,
      amount: parseFloat(amount),
      contracts: contracts
    });

    return `✅ Seguro ${insuranceType} creado exitosamente!\n\n📋 Política: #${policy.id}\n💰 Prima: $${amount} MXN\n🛡️ Cobertura: $${policy.coverage} MXN\n\nPara pagar: /pagar ${policy.id}`;
  } catch (error) {
    console.error('Error buying insurance:', error);
    return '❌ Error al crear el seguro. Intenta de nuevo.';
  }
}

async function fileClaim(from: string, message: string): Promise<string> {
  const claimTypes = `
📋 *Tipos de Reclamo:*

1️⃣ *Salud* - Emergencia médica
2️⃣ *Clima* - Daño por clima
3️⃣ *Seguridad* - Robo/asalto
4️⃣ *Movilidad* - Accidente

Responde con el número del tipo de reclamo.

*Proceso automático:*
✅ Sin papeleo
✅ Pago instantáneo
✅ Verificación automática
  `;

  return claimTypes;
}

async function checkPolicyStatus(from: string, message: string): Promise<string> {
  // Mock policy status - in production, fetch from database
  const status = `
📊 *Estado de tu Póliza:*

🔸 *Micro-Health*
   Estado: ✅ Activa
   Cobertura: $15,000 USD
   Próximo pago: 15 días
   Reclamos: 0

🔸 *Micro-Climate*
   Estado: ✅ Activa
   Cobertura: $10,000 USD
   Próximo pago: 8 días
   Reclamos: 1 (pagado)

💰 *Total ahorrado:* $45 USD
📈 *Próximo descuento:* 10% por pago anual
  `;

  return status;
}

async function payPremium(from: string, message: string): Promise<string> {
  const paymentOptions = `
💳 *Opciones de Pago:*

1️⃣ *Gasless (Recomendado)*
   ✅ Sin gas fees
   ✅ Pago instantáneo
   ✅ 0x Protocol
   💰 Ahorro: $2-5 USD

2️⃣ *App Clip*
   ✅ Compra con Face ID
   ✅ QR Code instantáneo
   ✅ Para Wallet
   📱 Escanea y paga

3️⃣ *Ahorros Automáticos*
   ✅ Deposito mensual
   ✅ Conversión automática
   ✅ Para Savings
   🎯 Meta: $120 USD

Responde con el número de tu opción preferida.
  `;

  return paymentOptions;
}

async function checkCoverage(from: string, message: string): Promise<string> {
  const coverage = `
🛡️ *Tu Cobertura Actual:*

🏥 *Micro-Health*
   • Hospitalización: $500 USD/día
   • Medicamentos: $200 USD/mes
   • Telemedicina: Ilimitado
   • Emergencias: $5,000 USD

🌦️ *Micro-Climate*
   • Sequía: $3,000 USD
   • Inundación: $5,000 USD
   • Tormentas: $2,000 USD
   • Cosecha: $8,000 USD

🛡️ *Micro-Security*
   • Robo: $1,500 USD
   • Asalto: $3,000 USD
   • Fraude: $2,000 USD
   • Legal: $1,000 USD

🚗 *Micro-Mobility*
   • Accidente: $5,000 USD
   • Uber: $2,000 USD
   • Transporte: $1,500 USD
   • Delivery: $3,000 USD

*Total de cobertura:* $45,200 USD
  `;

  return coverage;
}

async function getQuote(from: string, message: string): Promise<string> {
  const quote = `
💰 *Cotización Personalizada:*

👤 *Perfil:* Adulto, 30 años
📍 *Ubicación:* México
💼 *Ocupación:* Empleado

📊 *Precios Mensuales:*

🏥 *Micro-Health*
   Básico: $2 USD
   Estándar: $5 USD
   Premium: $10 USD

🌦️ *Micro-Climate*
   Básico: $1 USD
   Estándar: $3 USD
   Premium: $8 USD

🛡️ *Micro-Security*
   Básico: $1 USD
   Estándar: $2 USD
   Premium: $5 USD

🚗 *Micro-Mobility*
   Básico: $2 USD
   Estándar: $4 USD
   Premium: $8 USD

💡 *Recomendación:* Paquete Estándar
💰 *Total mensual:* $14 USD
🎯 *Ahorro anual:* $168 USD

Responde "SI" para contratar ahora.
  `;

  return quote;
}

async function createAppClip(from: string, message: string): Promise<string> {
  try {
    // Create App Clip for instant insurance purchase
    const appClip = await para.createInsuranceAppClip({
      coverageType: 'health',
      premium: 5,
      duration: '1 month'
    });

    const response = `
📱 *App Clip Creado*

🎯 *Micro-Health - $5 USD/mes*
📱 *Escanea el QR para comprar:*

${appClip.qrCode}

✅ *Beneficios:*
• Compra con Face ID
• Sin registro
• Pago instantáneo
• Cobertura inmediata

🔗 *O abre directamente:*
${appClip.appClipUrl}

*Válido por 24 horas*
  `;

    return response;
  } catch (error) {
    console.error('Error creating app clip:', error);
    return '❌ Error al crear App Clip. Intenta con otro método de pago.';
  }
}

async function gaslessPayment(from: string, message: string): Promise<string> {
  try {
    // Process gasless premium payment
    const result = await zeroX.executeGaslessPremiumPayment({
      policyHolder: from,
      premiumAmount: '5',
      insuranceType: 'health',
      currency: 'USD'
    });

    const response = `
⚡ *Pago Gasless Exitoso*

✅ *Micro-Health activado*
💰 *Pago:* $5 USD
⛽ *Gas ahorrado:* $2.50 USD
⚡ *Tiempo:* 3 segundos

📊 *Detalles:*
• Póliza: #POL-${Date.now()}
• Cobertura: $15,000 USD
• Duración: 1 mes
• Próximo pago: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}

🎉 *¡Tu cobertura está activa!*

Para verificar: /status
Para reportar reclamo: /claim
  `;

    return response;
  } catch (error) {
    console.error('Error processing gasless payment:', error);
    return '❌ Error en pago gasless. Intenta con otro método.';
  }
}

async function createSavingsGoal(from: string, message: string): Promise<string> {
  try {
    // Create insurance savings goal
    const goal = await para.createInsuranceSavingsGoal({
      userId: from,
      targetCoverage: 'health',
      monthlyAmount: 10,
      targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    });

    const response = `
🎯 *Meta de Ahorros Creada*

💰 *Objetivo:* Micro-Health Premium
📅 *Meta:* ${goal.goal.deadline.toLocaleDateString()}
💵 *Depósito mensual:* $10 USD
🎯 *Meta total:* $120 USD

📊 *Progreso:*
• Actual: $0 USD
• Meta: $120 USD
• Progreso: 0%

✅ *Beneficios:*
• Ahorro automático
• Conversión automática
• Sin comisiones
• Interés del 5% anual

🔗 *Gestiona tu meta:*
https://microinsurance.global/savings

Para ver progreso: /savings
  `;

    return response;
  } catch (error) {
    console.error('Error creating savings goal:', error);
    return '❌ Error al crear meta de ahorros. Intenta más tarde.';
  }
}

async function showHelp(from: string, message: string): Promise<string> {
  const help = `
🤖 *MicroInsurance Bot - Comandos*

🛡️ *Seguros:*
/seguro - Comprar seguro
/cobertura - Ver cobertura
/precio - Obtener cotización

💰 *Pagos:*
/pagar - Opciones de pago
/gasless - Pago sin gas fees
/appclip - Compra instantánea

📋 *Gestión:*
/status - Estado de pólizas
/claim - Reportar reclamo
/savings - Meta de ahorros

❓ *Ayuda:*
/help - Mostrar comandos

💡 *Consejos:*
• Usa /gasless para ahorrar en fees
• /appclip para compra rápida
• /savings para ahorro automático

🌍 *Cobertura global:* 15+ países
⚡ *Pagos instantáneos:* 1 segundo
💰 *Desde:* $0.50 USD/mes
  `;

  return help;
}

async function sendWhatsAppMessage(to: string, message: string): Promise<void> {
  try {
    await twilio.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`
    });

    console.log(`WhatsApp message sent to ${to}`);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}

async function logWhatsAppInteraction(data: {
  from: string;
  message: string;
  response: string;
  messageId: string;
  timestamp: string;
}): Promise<void> {
  try {
    // Log to analytics service
    await fetch('/api/analytics/whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Error logging WhatsApp interaction:', error);
  }
}

async function createPolicy(params: {
  userPhone: string;
  insuranceType: string;
  amount: number;
  contracts: any;
}): Promise<any> {
  try {
    const response = await fetch('/api/policies/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userPhone: params.userPhone,
        insuranceType: params.insuranceType,
        premium: params.amount,
        contracts: params.contracts
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create policy');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating policy:', error);
    throw error;
  }
}

// GET endpoint for webhook verification
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Verify webhook
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('WhatsApp webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}
