export default () => ({
    awsS3AccessKey: process.env.AWS_S3_ACCESS_KEY || '',
    awsS3Name: process.env.AWS_S3_NAME || '',
    awsS3region: process.env.AWS_S3_REGION || 'http://localhost:',
    awsS3secretKey: process.env.AWS_S3_SECRET_KEY || 'sdsda',
})