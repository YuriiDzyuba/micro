export default () => ({
    redisUrl : process.env.REDIS_URL || 'redis://redis:6379',
    sourceEmailService : process.env.SOURCE_EMAIL_SERVICE || 'gmail',
    sourceEmail : process.env.SOURCE_EMAIL || 'qwer@gmail.com',
    sourceEmailPassword : process.env.SOURCE_EMAIL_PASSWORD || 'wdwdwdw',
    sourceEmailDefaultFrom : 'No Reply EAIL-SERVICE@example.com>',
    appName : 'new Instagram',
})



