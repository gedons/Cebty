const Answer = require("../controllers/answer.controller");
const {verifyToken} = require("../middleware/verifyToken.module");

const {Router} = require("express");
const router = Router();

router.use(verifyToken);

// router.get("/all", Answer.all);
router.get("/test/:test_id", Answer.getForTest);
router.get("/:questionId", Answer.getForQuestion);
router.post("/", Answer.create);
router.put("/", Answer.editAnswer);
router.delete("/:id", Answer.deleteAnswer);
router.post("/set_as_right_answer/:id", Answer.setRightAnswer);

module.exports = router;