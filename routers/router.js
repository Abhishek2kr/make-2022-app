const router = require('express').Router();
const {registerMetaController, fetchMetaController} = require('../controllers/meta.Controller');

router.post('/meta', registerMetaController);
router.get('/meta', fetchMetaController);


router.all('*', (req,res) => {
    res.status(403).send('Router not found');
})

module.exports = router;