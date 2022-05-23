const router = require('express').Router();
const {clientController, clientMonthWiseInsights, saveDataController} = require('../controllers/clientController');
router.get('/clients', clientController);
router.post('/clients', saveDataController)
router.get('/monthwise', clientMonthWiseInsights);

router.all('*', (req,res) => {
    res.status(403).send('Router not found');
})
module.exports = router;