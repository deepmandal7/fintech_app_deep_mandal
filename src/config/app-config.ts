export default () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.APP_PORT) || 5000,
    log_level: process.env.LOG_LEVEL,
    jwt_secret: process.env.JWT_SECRET,
    aws_access_key: process.env.AWS_ACCESS_KEY,
    aws_secret_key: process.env.AWS_SECRET_KEY,
    aws_bucket: process.env.AWS_BUCKET,
    google_api_key: process.env.GOOGLE_API_KEY,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL,
    twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
    twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
    twilio_verification_service_sid: process.env.TWILIO_VERIFICATION_SERVICE_SID,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    stripe_status_webhook_secret: process.env.STRIPE_STATUS_WEBHOOK_SECRET,
    stripe_checkout_webhook_secret: process.env.STRIPE_CHECKOUT_WEBHOOK_SECRET,
    mail_credentials: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  