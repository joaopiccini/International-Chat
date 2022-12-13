const session = require('express-session')
const redis = require('redis')
let RedisStore = require("connect-redis")(session)

const redisClient = redis.createClient()

const sessionInit = (app) => {
    app.use(
        session({
            name: session,
            secret:'gJ3VvqEESyMdQR3EKG8VQrLn',
            store: new RedisStore({ client: redisClient }),
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false, maxAge: 2000000 }
        })
    )
}

module.exports = { sessionInit, redisClient }