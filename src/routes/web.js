import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.post('/setup-profile', homeController.setupProfile);
    router.post('/setup-persistent-menu', homeController.setupPersistentMenu);
    router.post('/webhook', homeController.postWebhook);
    router.get('/webhook', homeController.getWebhook);
    router.get('/datlich', homeController.handleDatlich);
    router.post('/datlich-ajax', homeController.handleDatlichAjax);
    return app.use('/', router);
}

module.exports = initWebRoutes;
