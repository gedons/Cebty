const Candidate = require("../controllers/candidate.controller");
const {verifyToken} = require("../middleware/verifyToken.module");

const {Router} = require("express");
const router = Router();

router.use(verifyToken);

router.post("/", Candidate.create);
router.post("/score", Candidate.score);
router.get("/total/:institutionId", Candidate.total);
router.get('/details/:candidateId', Candidate.details);

module.exports = router;