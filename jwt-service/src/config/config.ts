
export default () => ({
  hostDomain: process.env.SERVICE_HOST || 'http://localhost:3000/',
  hostDomainGlobalPrefix: process.env.GLOBAL_PREFIX || 'jwt-api',
  database: {
    type: process.env.TYPEORM_CONNECTION,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    entities: ['dist/**/*.entity(.ts,.js)'],
    synchronize: true,
    autoLoadEntities: true,
    logging: false,
  },
});
