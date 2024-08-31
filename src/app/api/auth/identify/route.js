import { NextResponse } from 'next/server';
import connectDB from '@/libs/mongodb';
import * as brevo from '@getbrevo/brevo';
import User from '@/models/user';
import jwt from 'jsonwebtoken';

// Conectar a la base de datos
connectDB();

// Plantilla de correo electrónico
const createEmailTemplate = (user, resetLink) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      background-color: #ffffff;
      padding: 20px;
      text-align: center;
      max-width: 600px;
      margin: auto;
    }
    .button {
      background-color: #1F883D;
      color: #ffffff;
      padding: 15px 20px;
      text-decoration: none;
      border-radius: 10px;
      display: inline-block;
      margin-top: 15px;
    }
    .button:visited {
      color: #ffffff !important;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Restablece tu contraseña de GES-EPIS</h2>
    <p>Estimado ${user},</p>
    <p>Ha solicitado restablecer su contraseña. Haga clic en el botón que aparece a continuación para restablecer su contraseña. Este enlace caducará en 30 minutos.</p>
    <a href="${resetLink}" class="button">Restablecer contraseña</a>
    <p>Si no solicitó un restablecimiento de contraseña, ignore este correo electrónico.</p>
    <p>Gracias,<br><b>GES-EPIS</b></p>
  </div>
</body>
</html>
`;

// Función para generar un token JWT
const generateToken = (userData) => {
  return jwt.sign(
    { data: userData },
    process.env.JWT_SECRET,
    { expiresIn: '30m' }
  );
};

// Función para enviar correo electrónico
const sendEmail = async (toEmail, userName, resetLink) => {
  const apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY,
  );

  const smtpEmail = new brevo.SendSmtpEmail();
  smtpEmail.subject = 'Recupera tu cuenta';
  smtpEmail.to = [{ email: toEmail, name: userName }];
  smtpEmail.htmlContent = createEmailTemplate(userName, resetLink);
  smtpEmail.sender = {
    name: 'NEXUS FLOW',
    email: 'kenedpalomino@gmail.com',
  };

  return await apiInstance.sendTransacEmail(smtpEmail);
};

// Controlador de la solicitud POST
export async function POST(req) {
  try {
    const data = await req.json();

    // Validar datos de entrada
    if (!data.email) {
      return NextResponse.json({ message: 'Ingrese un correo' }, { status: 400 });
    }

    // Verificar existencia de usuario
    const userFound = await User.findOne({ email: data.email }).exec();
    if (!userFound) {
      return NextResponse.json({ message: 'No existe un usuario asociado a este correo.' }, { status: 400 });
    }

    // Generar token JWT
    const tokenData = { email: data.email, id: userFound._id };
    const token = generateToken(tokenData);
    const resetLink = `${process.env.GES_EPIS_URL}/auth/reset-password?token=${token}`;

    // Enviar correo de restablecimiento de contraseña
    await sendEmail(data.email, userFound.name, resetLink);
    return NextResponse.json({ message: 'Se ha enviado los pasos a su correo electrónico.' }, { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Ocurrió un error al procesar la solicitud.' }, { status: 500 });
  }
}
