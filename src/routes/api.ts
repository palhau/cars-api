const router = require('express-promise-router')();
const ApiController = require('@Controllers/api');

router.route('/:entity/listCars').get(ApiController.listCars);

router.route('/:entity/createCar').patch(ApiController.createCar);

router.route('/:entity/logs').patch(ApiController.logs);

module.exports = router;
