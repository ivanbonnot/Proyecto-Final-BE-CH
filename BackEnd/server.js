const morgan = require('morgan');
const express = require('express');
const compression = require('compression')
const logger = require('./log/log4js')
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { config } = require('./config/enviroment')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

require('dotenv').config()


const baseProcces = () => {

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Process ${worker.process.pid} failure!`)
        cluster.fork()
    })

    const { Server: HTTPServer } = require('http');
    const { Server: IOServer } = require('socket.io');

    const infoRouter = require('./routes/api/info')
    const productsRouter = require("./routes/api/product");
    const authWebRouter = require('./routes/web/auth')
    const homeWebRouter = require('./routes/web/home')
    const cartRouter = require("./routes/api/cartRouter")

    const connectToDb = require("./config/connectToDB");

    const app = express();

    const httpServer = new HTTPServer(app);
    const io = new IOServer(httpServer);

    const { addChatController, getAllChatsController} = require('./controllers/chatsController')

    //Settings
    app.set('port', process.env.PORT || 8080)
    app.set('json spaces', 2)

    //Middlewares
    app.use(compression())
    app.use(morgan('dev'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    //app.use(express.static(staticFiles))
    app.use(express.static('./public'))


    app.use(session({
        store: MongoStore.create({ mongoUrl: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.xvejx.gcp.mongodb.net/test` }),
        secret: '123456',
        resave: true,
        saveUninitialized: true,
        rolling: true,
        cookie: {
            maxAge: 600000 //tiempo de sesion en ms (10min)
        }
    }))


    const PORT = 8080
    const server = httpServer.listen(PORT, () => {
        connectToDb("mongo")
        logger.info(`Servidor http escuchando en el puerto ${server.address().port}`)
    })
    server.on('error', error => logger.error(`Error en servidor ${error}`))

    
    //Routes
    app.use("/info", infoRouter)
    app.use("/api/products", productsRouter)
    app.use("/api/carrito", cartRouter)

    //--- Ruta inexistente
    /*
    app.get('*', (req, res) => {
        logger.warn(`Ruta: ${req.url}, metodo: ${req.method} no existe`)
        res.send(`Ruta: ${req.url}, metodo: ${req.method} no existe`)
    })
    */

    //__ WebServ Routes __//
    app.use("/", authWebRouter)
    app.use("/", homeWebRouter)


    //websocket
    io.on('connection', async socket => {
        logger.info('Nuevo cliente conectado!');
        // carga inicial de mensajes
        socket.emit('mensajes', await getAllChatsController());

        // actualizacion de mensajes
        socket.on('nuevoMensaje', async mensaje => {
            mensaje.date = new Date().toLocaleString()
            addChatController(mensaje)
            io.sockets.emit('mensajes', await getAllChatsController());
        })
    });

}


if (config.mode != 'CLUSTER') {

    //-- Servidor FORK
    logger.info('Server en modo FORK')
    logger.info('-------------------')
    baseProcces()
} else {

    //-- Servidor CLUSTER   
    if (cluster.isPrimary) {
        logger.info('Server en modo CLUSTER')
        logger.info('----------------------')
        for (let i = 0; i < numCPUs; i++) { // creo tantos procesos como cpus tengo
            cluster.fork()
        }
    } else {
        baseProcces()
    }
}


