var env = process.env.NODE_ENV || 'development';
var mongo_port = process.env.MONGO_PORT || 27017;
var mongo_host = process.env.MONGO_HOST || 'localhost';

console.log("MONGO HOST and PORT: ", mongo_host, mongo_port);

            // - name: MONGO_USER
            //   value: mongo
            // - name: MONGO_HOST
            //   value: mongo-cluster-ip-service
            // - name: MONGO_PORT
            //   value: '27017'
            // - name: MONGO_DATABASE
            //   value: leChatAPI

if(env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = `mongodb://${mongo_host}:${mongo_port}/LeChatAPI`;
} else if(env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = `mongodb://${mongo_host}:${mongo_port}/LeChatAPITest`;
}
