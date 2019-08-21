export default {
    api_hostname : process.env.API_HOSTNAME || "http://localhost",
    api_port : process.env.API_PORT || 3000,
    client_hostname : process.env.CLIENT_HOSTNAME || "http://localhost",
    client_port : process.env.CLIENT_PORT || 8080,
}