const fs = require("fs");
const fastify = require("fastify")();
const {coinCount} = require("./p3-module.js");

fastify.get("/", (request, reply) => {
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
        console.log(data);
    if(data == undefined) {
        reply
            .code(500)
            .header("Content-Type", "text/html; charset=utf-8")
            .send("There was an error.");
    }
    else {
        reply
            .code(200)
            .header("Content-Type", "text/html; charset=utf-8")
            .send(data);
    }
    });
});

fastify.get("/coin", (request, reply) => {
    const {denom = 0, count = 0} = request.query;
    let coinValue = coinCount({denom, count});
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2>
      <br /><a href="/">Home</a>`);
  });

  fastify.get("/coins", (request, reply) => {
    const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
    const {option} = request.query;
    switch(`${option}`) {
        case '1': 
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
            break;
        
        case '2':
            coinValue = coinCount(...coins);
            break;

        //Extra Credit
        case '3':
            coinValue = coinCount(coins);
            break;
    }
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<h2>Option ${option} value is ${coinValue}</h2>
      <br /><a href="/">Home</a>`);
  });



const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});