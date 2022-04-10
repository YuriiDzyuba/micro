export const mongoDbUrl =
  process.env.MONGO_URL || 'mongodb://localhost:27017/jwt-api';
export const mongoDbUser =
  process.env.MONGO_INITDB_ROOT_USERNAME || 'mongoUserName';
export const mongoDbPassword =
  process.env.MONGO_INITDB_ROOT_PASSWORD || 'mongoPassword';
