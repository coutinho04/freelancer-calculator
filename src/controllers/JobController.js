import Job from '../models/Job.js';
import JobUtils from '../utils/JobUtils.js';
import Profile from '../models/Profile.js';

export default {
  create: (req, res) => {
    return res.render('job');
  },

  save: async (req, res) => {
    await Job.create({
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      createdAt: Date.now(),
    });

    return res.redirect('/');
  },

  show: async (req, res) => {
    const jobs = await Job.get();
    const profile = await Profile.get();
    const jobId = req.params.id;

    const job = jobs.find((job) => +job.id === +jobId);

    if (!job) {
      return res.send('Job not found!');
    }

    job.budget = JobUtils.calculateBudget(job, profile['hour-value']);

    return res.render('job-edit', { job });
  },

  update: async (req, res) => {
    const jobId = req.params.id;

    const updatedJob = {
      name: req.body.name,
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours'],
    };

    await Job.update(updatedJob, jobId);

    res.redirect(`/job/${jobId}`);
  },

  delete: async (req, res) => {
    const jobId = req.params.id;

    await Job.delete(jobId);

    res.redirect('/');
  },
};
