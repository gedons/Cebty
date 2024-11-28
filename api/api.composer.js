// Express and router initialization
const express = require("express");
const router = express.Router();

// Router modules for different routes
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const institutionRouter = require("./routes/institution.route");
const testRouter = require("./routes/test.route");
const questionRouter = require("./routes/question.route");
const answerRouter = require("./routes/answer.route");
const personaDataRouter = require("./routes/personaData.route");
const candidateRouter = require("./routes/candidate.route");
const resultRouter = require("./routes/result.route");
const certificateRouter = require('./routes/certificate.route');


// Using the imported routes with router
router.use("/user", userRouter);
router.use('/auth', authRouter);
router.use('/institution', institutionRouter);
router.use('/test', testRouter);
router.use('/question', questionRouter);
router.use('/answer', answerRouter);
router.use('/persona_data', personaDataRouter);
router.use('/candidate', candidateRouter)
router.use('/result', resultRouter);
router.use('/certificate', certificateRouter);

module.exports = router;