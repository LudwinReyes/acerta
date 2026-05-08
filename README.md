# Acerta Landing Page

Landing page moderna para Acerta, construida con Next.js, Framer Motion y Tailwind CSS.

## Características

- **Diseño Premium**: Estética minimalista y corporativa con micro-animaciones.
- **Secciones especializadas**: Contabilidad, RRHH, Software y Nosotros.
- **Formulario de contacto**: Integrado con SMTP (Brevo) para recepción de leads.
- **Totalmente Responsive**: Optimizado para dispositivos móviles y escritorio.

## Requisitos Previos

- Node.js 18+
- npm o yarn

## Configuración

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno. Copia el archivo `.env.example` a un nuevo archivo `.env`:
   ```bash
   cp .env.example .env
   ```
4. Completa las credenciales en el archivo `.env`:
   - `GEMINI_API_KEY`: Tu llave de API de Google Gemini (opcional para IA).
   - `SMTP_USER`: Tu usuario de SMTP (ej. Brevo).
   - `SMTP_PASS`: Tu contraseña de SMTP.
   - `CONTACT_RECEIVER_EMAIL`: Email donde recibirás las notificaciones del formulario.

## Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Despliegue

Este proyecto está optimizado para desplegarse en **Vercel**:

1. Sube el código a GitHub.
2. Conecta tu repositorio en Vercel.
3. Asegúrate de configurar todas las variables de entorno definidas en `.env.example` en el panel de Vercel.

---
© 2026 Acerta. Todos los derechos reservados.
