import Job from '../models/Job.js';
import JobUtils from '../utils/JobUtils.js';
import Profile from '../models/Profile.js';

export default {
  create: (req, res) => {
    return res.render('job');
  },

  save: (req, res) => {
    const jobs = Job.get();
    const lastId = jobs[jobs.length - 1]?.id || 0;

    jobs.push({
      id: lastId + 1,
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      createdAt: Date.now(),
    });

    return res.redirect('/');
  },

  show: (req, res) => {
    const jobs = Job.get();
    const profile = Profile.get();
    const jobId = req.params.id;

    const job = jobs.find((job) => +job.id === +jobId);

    if (!job) {
      return res.send('Job not found!');
    }

    job.budget = JobUtils.calculateBudget(job, profile['hour-value']);

    return res.render('job-edit', { job });
  },

  update: (req, res) => {
    const jobs = Job.get();
    const jobId = req.params.id;

    const job = jobs.find((job) => +job.id === +jobId);

    if (!job) {
      return res.send('Job not found!');
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours'],
    };

    const newJob = jobs.map((job) => {
      if (+job.id === +jobId) {
        job = updatedJob;
      }

      return job;
    });

    Job.update(newJob);

    res.redirect(`/job/${jobId}`);
  },

  delete: (req, res) => {
    const jobId = req.params.id;

    Job.delete(jobId);

    res.redirect('/');
  },
};
