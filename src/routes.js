const express = require("express");
const validate = require("express-validation");
const routes = express.Router();
const Controllers = require("./app/controllers");
const AuthMiddleware = require("./app/middlewares/auth");
const validators = require("./app/validators");
const handle = require("express-async-handler");


routes.post(
	"/users",
	validate(validators.User),
	handle(Controllers.UserController.store)
);
routes.post(
	"/session",
	validate(validators.Session),
	handle(Controllers.SessionController.store)
);

//toda a rota que estiver daqui para baixo só funciona com o usuario autenticado.
routes.use(AuthMiddleware);

// Ads
routes.get("/ads", handle(Controllers.AdController.index));
routes.get("/ads/:id", handle(Controllers.AdController.show));
routes.post(
	"/ads",
	validate(validators.Ad),
	handle(Controllers.AdController.store)
);
routes.put(
	"/ads/:id",
	validate(validators.Ad),
	handle(Controllers.AdController.update)
);
routes.delete("/ads/:id", handle(Controllers.AdController.destroy));

//purchases
routes.post(
	"/purchase",
	validate(validators.Purchase),
	handle(Controllers.PurchaseController.store)
);

module.exports = routes;
