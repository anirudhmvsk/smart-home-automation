const fastify = require('fastify')({ logger: true })
const smartlife = require('./smartlife/index');
global.userInfo = {};

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

fastify.get('/login', async (request, reply) => {
    smartlife.login().then(res => {
        reply.send(res);
    }).catch(err => {
        reply.send(err);
    })
})

fastify.post('/login', async (request, reply) => {
    let {username, password, region} = request.body;
    if(username==undefined || password==undefined || region==undefined){
        reply.send({"error": "missing necessary params"});
        return;
    }
    smartlife.login(username, password, region).then(res => {
        reply.send(res);
    }).catch(err => {
        reply.send(err);
    })
})

fastify.get('/userInfo', async (request, reply) => {
    reply.send(userInfo);
})


fastify.get('/deviceList', async (request, reply) => {
    smartlife.getDeviceList().then(res => {
        reply.send(res);
    }).catch(err => {
        reply.send(err);
    })
})

fastify.post('/deviceOnOff', async (request, reply) => {
    let {deviceId, state} = request.body;
    if(deviceId==undefined || state==undefined){
        reply.send({"error": "missing necessary params"});
        return;
    }
    smartlife.changeDeviceState(deviceId, state).then(res => {
        reply.send(res);
    }).catch(err => {
        reply.send(err);
    })
})

const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()