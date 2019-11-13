import express from 'express';
const router = express.Router();

router.get('/profile', (req, res, next) => {
    res.send('Bullshit for now');
})

router.post('/signup', (req, res, next) => {
    console.log(req);
    res.send('jwttoken123');
});

export default router;