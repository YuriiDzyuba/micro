export default () => ({
  accessJwtSecret: process.env.ACCESS_JWT_SECRET || 'accSecret',
  database: {
    type: process.env.TYPEORM_CONNECTION,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    entities: ['dist/**/*.entity(.ts,.js)'],
    synchronize: true,
    autoLoadEntities: true,
    logging: false,
  },
});
