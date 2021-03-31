import express from 'express';
import path from 'path';

const router = express.Router();

const __dirname = path.resolve();
const basePath = path.join(__dirname, '/src/views');

const profile = {
  name: 'Felipe Coutinho',
  avatar: 'https://avatars.githubusercontent.com/u/73666973?v=4',
  'monthly-budget': 3000,
  'hours-per-day': 5,
  'days-per-week': 5,
  'vacation-per-year': 4,
};

router.get('/', (req, res) => res.render(`${basePath}/index`));
router.get('/job', (req, res) => res.render(`${basePath}/job`));
router.get('/job/edit', (req, res) => res.render(`${basePath}/job-edit`));
router.get('/profile', (req, res) => res.render(`${basePath}/profile`, { profile }));

export default router;
