import express from 'express';
import ProfileController from './controllers/ProfileController.js';
import JobController from './controllers/JobController.js';
import DashboardController from './controllers/DashboardController.js';

const router = express.Router();

router.get('/', DashboardController.index);
router.get('/job', JobController.create);
router.post('/job', JobController.save);
router.get('/job/:id', JobController.show);
router.post('/job/:id', JobController.update);
router.post('/job/delete/:id', JobController.delete);
router.get('/profile', ProfileController.index);
router.post('/profile', ProfileController.update);

export default router;
