module.exports = {
    api_domain : process.env.API_HOSTNAME || "http://localhost",
    api_port : process.env.API_PORT || 3000,
    client_domain : process.env.CLIENT_HOSTNAME || "http://localhost",
    client_port : process.env.CLIENT_PORT || 8080,
    mongodb_domain: process.env.MONGODB_HOSTNAME || "mongodb://localhost",
    mongodb_port : process.env.MONGODB_PORT || 27017,
    secret : process.env.SECRET || "There is no secret"
}