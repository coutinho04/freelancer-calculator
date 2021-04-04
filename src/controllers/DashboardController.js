import Job from '../models/Job.js';
import JobUtils from '../utils/JobUtils.js';
import Profile from '../models/Profile.js';

export default {
  index: (req, res) => {
    const jobs = Job.get();
    const profile = Profile.get();

    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    let jobTotalHours = 0;

    // atualizar jobs com dias restantes, status e valor total
    // atualiza status do dashboard
    const updatedJobs = jobs.map((job) => {
      const remainingDays = JobUtils.remainingDays(job);
      const status = remainingDays <= 0 ? 'done' : 'progress';

      // calcular status
      // statusCount[done ou progress] += 1;
      statusCount[status] += 1;

      // calcular total de hora/dia de job em progresso
      jobTotalHours = status === 'progress' ? jobTotalHours + +job['daily-hours'] : jobTotalHours;

      return {
        ...job,
        remainingDays,
        status,
        budget: JobUtils.calculateBudget(job, profile['hour-value']),
      };
    });

    const freeHours = profile['hours-per-day'] - jobTotalHours;

    return res.render('index', { jobs: updatedJobs, profile, status: statusCount, freeHours });
  },
};
