const Question = require("../controllers/question.controller");
const {verifyToken} = require("../middleware/verifyToken.module");

const {Router} = require("express");
const router = Router();

router.use(verifyToken);

router.get("/:testId", Question.getForTest);
router.post("/", Question.create);
router.put("/", Question.editQuestion);
router.delete("/:id", Question.deleteQuestion);

module.exports = router;