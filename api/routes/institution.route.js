const Institution = require("../controllers/institution.controller");
const {verifyToken} = require("../middleware/verifyToken.module");
const {Router} = require("express");

const router = Router();
router.use(verifyToken);

router.get("/:id", Institution.get); // can accept all as id (e.g /all) to indicate interest to get all the institutions
router.post("/", Institution.create);
router.put("/", Institution.modify);
router.delete("/:id", Institution.delete);

module.exports = router;