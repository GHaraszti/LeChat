var env = process.env.NODE_ENV || 'development';
var mongo_port = process.env.MONGO_PORT || 27017;
var mongo_host = process.env.MONGO_HOST || 'localhost';

if(env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = `mongodb://${mongo_host}:${mongo_port}/LeChatAPI`;
} else if(env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = `mongodb://${mongo_host}:${mongo_port}LeChatAPITest`;
}
