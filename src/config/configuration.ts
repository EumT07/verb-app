export default () => ({
    port: parseInt(process.env.PORT, 10) || 8000,
    jwtSecret: process.env.JWT_SECRET,
    jwtRecoverySecret: process.env.JWT_RRECOVERY_PASSWORD_SECRET,
    nodemailer_host: process.env.NODEMAILER_HOST,
    nodemailer_user: process.env.NODEMAILER_USER,
    nodemailer_password: process.env.NODEMAILER_PASSWORD,
    nodemailer_email_from: process.env.NODEMAILER_EMAIL_FROM,
    api_key: process.env.API_KEY,
    api_base_url: process.env.API_BASE_URL
})