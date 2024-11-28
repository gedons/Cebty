const User = require("../controllers/user.controller");
const { Router } = require("express");
const router = Router();
const {verifyToken} = require("../middleware/verifyToken.module");

router.use(verifyToken);

router.post('/exists/', User.exists);
router.get('/:institutionId', User.all);
router.put('/', User.edit);
router.delete('/:userId', User.delete);
router.post('/', User.create);

module.exports = router;