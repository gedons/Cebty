const Certificate = require("../controllers/certificate.controller");
const {verifyToken} = require("../middleware/verifyToken.module");

const {Router} = require("express");
const router = Router();

router.use(verifyToken);

router.post("/", Certificate.create);
router.put("/", Certificate.edit);
router.get("/:testId", Certificate.all);
router.delete('/:id', Certificate.delete);

module.exports = router;