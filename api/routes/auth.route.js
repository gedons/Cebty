const {signUp, signIn, candidateToken} = require("../controllers/auth.controller");
// const {verifyToken} = require("../middleware/verifyToken.module");
const {Router} = require("express");
const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/candidate_token', candidateToken);

module.exports = router;