import express from 'express';
import path from 'path';

const router = express.Router();

const __dirname = path.resolve();
const basePath = path.join(__dirname, '/src/views');

const Profile = {
  data: {
    name: 'Felipe Coutinho',
    avatar: 'https://github.com/coutinho04.png',
    'monthly-budget': 3000,
    'hours-per-day': 5,
    'days-per-week': 5,
    'vacation-per-year': 4,
    'hour-value': 75,
  },

  controllers: {
    index: (req, res) => {
      return res.render(`${basePath}/profile`, { profile: Profile.data });
    },

    update: (req, res) => {
      const data = req.body;

      const weeksPerYear = 52;
      // weeksPerMonth = semanas util por mes (total de semanas no ano - semanas de ferias)
      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;

      // weeksTotalHours = horas semanais disponiveis (horas por dia * dias por semana)
      const weeksTotalHours = data['hours-per-day'] * data['days-per-week'];

      // monthlyTotalHours = total de horas no mes (horas semanais disponiveis * semanas util por mes)
      const monthlyTotalHours = weeksTotalHours * weeksPerMonth;

      // hourValue = valor da hora (valor mensal a receber / total de horas no mes)
      const hourValue = data['monthly-budget'] / monthlyTotalHours;

      Profile.data = {
        ...data,
        'hour-value': hourValue,
      };

      return res.redirect('/profile');
    },
  },
};

const Job = {
  data: [
    {
      id: 1,
      name: 'Pizzaria Guloso',
      'daily-hours': 2,
      'total-hours': 60,
      createdAt: Date.now(),
    },
    {
      id: 2,
      name: 'OneTwo Project',
      'daily-hours': 3,
      'total-hours': 1,
      createdAt: Date.now(),
    },
  ],

  controllers: {
    index: (req, res) => {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data['hour-value']),
        };
      });
      return res.render(`${basePath}/index`, { jobs: updatedJobs });
    },

    create: (req, res) => {
      return res.render(`${basePath}/job`);
    },

    save: (req, res) => {
      const lastId = Job.data[Job.data.length - 1]?.id || 0;

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        createdAt: Date.now(),
      });
      return res.redirect('/');
    },

    show: (req, res) => {
      const jobId = req.params.id;

      const job = Job.data.find((job) => +job.id === +jobId);

      if (!job) {
        return res.send('Job not found!');
      }

      job.budget = Job.services.calculateBudget(job, Profile.data['hour-value']);

      return res.render(`${basePath}/job-edit`, { job });
    },

    update: (req, res) => {
      const jobId = req.params.id;

      const job = Job.data.find((job) => +job.id === +jobId);

      if (!job) {
        return res.send('Job not found!');
      }

      const updatedJob = {
        ...job,
        name: req.body.name,
        'total-hours': req.body['total-hours'],
        'daily-hours': req.body['daily-hours'],
      };

      Job.data = Job.data.map((job) => {
        if (+job.id === +jobId) {
          job = updatedJob;
        }

        return job;
      });

      res.redirect(`/job/${jobId}`);
    },

    delete: (req, res) => {
      const jobId = req.params.id;

      Job.data = Job.data.filter((job) => +job.id !== +jobId);

      res.redirect('/');
    },
  },

  services: {
    remainingDays: (job) => {
      // workDays = total de hora do projeto / horas a trabalhar por dia
      const workDays = (job['total-hours'] / job['daily-hours']).toFixed();

      // createdDate = data da criaçao do job
      const createdDate = new Date(job.createdAt);

      // dueDay = dia do vencimento (dia da criaçao do job + dias de trabalho)
      const dueDay = createdDate.getDate() + Number(workDays);

      // dueDateInMs = atualiza data da criaçao do job com data do vencimento em ms
      const dueDateInMs = createdDate.setDate(dueDay);

      // timeDiffInMs = data do vencimento em ms - data atual em ms
      const timeDiffInMs = dueDateInMs - Date.now();

      // dayInMs = total de ms em um dia
      const dayInMs = 1000 * 60 * 60 * 24;

      // dayDiff = data do vencimento em ms / total de ms em um dia
      const dayDiff = Math.floor(timeDiffInMs / dayInMs);

      // restam x dias
      return dayDiff;
    },

    calculateBudget: (job, hourValue) => hourValue * job['total-hours'],
  },
};

router.get('/', Job.controllers.index);
router.get('/job', Job.controllers.create);
router.post('/job', Job.controllers.save);
router.get('/job/:id', Job.controllers.show);
router.post('/job/:id', Job.controllers.update);
router.post('/job/delete/:id', Job.controllers.delete);
router.get('/profile', Profile.controllers.index);
router.post('/profile', Profile.controllers.update);

export default router;
