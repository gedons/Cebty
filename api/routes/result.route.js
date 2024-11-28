const Result = require('../controllers/result.controller');
const {verifyToken} = require("../middleware/verifyToken.module");
const {Router} = require('express');
const router = Router();

router.use(verifyToken);

router.get('/:testId', Result.get);

module.exports = router;