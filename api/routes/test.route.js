const Test = require('../controllers/test.controller');
const {verifyToken} = require("../middleware/verifyToken.module");
const {Router} = require('express');
const router = Router();

router.use(verifyToken);

router.get('/', (req, res)=>{
    res.send("Test module is working");
})
router.get('/institution/:institution_id', Test.getByInstitution);
router.get('/id/:id', Test.get);
router.post('/', Test.create);
router.put('/', Test.edit);
router.delete('/:id', Test.delete);
router.post('/start', Test.start);
router.post('/stop', Test.stop);
router.get('/validate', Test.validate);
router.post('/excel', Test.excel);

module.exports = router;