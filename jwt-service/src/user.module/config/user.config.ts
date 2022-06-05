export default () => ({
  refreshJwtSecret: process.env.REFRESH_JWT_SECRET || 'secret',
  accessJwtSecret: process.env.ACCESS_JWT_SECRET || 'accSecret',
  refreshJwtExpIn: process.env.REFRESH_TOKEN_EXP_IN || '5h',
  accessJwtExpIn: process.env.ACCESS_TOKEN_EXP_IN || '3h',
  serviceHost: process.env.SERVICE_HOST || 'http://localhost:',
  servicePort: process.env.SERVICE_PORT || '3000',
  hostDomainGlobalPrefix: process.env.GLOBAL_PREFIX || 'jwt-api',
});
