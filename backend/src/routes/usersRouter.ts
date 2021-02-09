import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', function (_req, res) {
  res.send('respond with a resource huh');
});

export default router;
