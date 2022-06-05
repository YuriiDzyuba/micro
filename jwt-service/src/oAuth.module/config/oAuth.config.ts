export default () => ({
  hostDomainGlobalPrefix: process.env.GLOBAL_PREFIX || 'jwt-api',
  googleClientId:
    process.env.GOOGLE_CLIENT_ID ||
    '171883628540-nndmtavj68f93jj40btiob7begicinm5.apps.googleusercontent.com',
  googleClientSecret:
    process.env.GOOGLE_CLIENT_SECRET || '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',
});
