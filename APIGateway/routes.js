const httpProxy = require('express-http-proxy');

const authServiceProxy = httpProxy(process.env.AUTH_SERVICE_URL);
const productServiceProxy = httpProxy(process.env.PRODUCT_SERVICE_URL);
const userServiceProxy = httpProxy(process.env.USER_SERVICE_URL);

class Routes {
  constructor(app) {
    this.app = app;
  }

  /* creating app Routes starts */
  appRoutes() {
    this.app.post('/register', (req, res) => {
      authServiceProxy(req, res);
    });

    this.app.post('/login', (req, res) => {
      authServiceProxy(req, res);
    });

    this.app.get('/product/:id', (req, res) => {
      productServiceProxy(req, res);
    });

    this.app.post('/product', (req, res) => {
      productServiceProxy(req, res);
    });


    this.app.get('/user', (req, res) => {
      userServiceProxy(req, res);
    });

    this.app.get('/user/:id', (req, res) => {
      userServiceProxy(req, res);
    });
  }

  routesConfig() {
    this.appRoutes();
  }
}

module.exports = Routes;
