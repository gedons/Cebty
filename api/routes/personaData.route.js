const PersonaData = require("../controllers/personaData.controller");
const {verifyToken} = require("../middleware/verifyToken.module");

const {Router} = require("express");
const router = Router();

router.use(verifyToken);

router.get("/:test_id", PersonaData.all);
router.post("/", PersonaData.create);
router.put("/", PersonaData.edit);
router.delete("/:id", PersonaData.delete)

module.exports = router;