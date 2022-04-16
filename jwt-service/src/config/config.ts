export const mongoDbUrl =
  process.env.MONGO_URL || 'mongodb://localhost:27017/jwt-api';
export const redisUrl =
  process.env.REDIS_URL || 'redis://redis:6379';
export const mongoDbUser =
  process.env.MONGO_INITDB_ROOT_USERNAME || 'mongoUserName';
export const mongoDbPassword =
  process.env.MONGO_INITDB_ROOT_PASSWORD || 'mongoPassword';
