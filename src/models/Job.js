import Database from '../db/config.js';

export default {
  async get() {
    const db = await Database();
    const data = await db.all(`select * from jobs`);
    await db.close();
    return data.map((job) => ({
      id: job.id,
      name: job.name,
      'daily-hours': job.daily_hours,
      'total-hours': job.total_hours,
      createdAt: job.created_at,
    }));
  },

  async update(updatedJob, jobId) {
    const db = await Database();
    await db.run(`update jobs set
      name = "${updatedJob.name}",
      daily_hours = ${updatedJob['daily-hours']},
      total_hours = ${updatedJob['total-hours']}
      where id = ${jobId}
    `);
    await db.close();
  },

  async delete(id) {
    const db = await Database();
    await db.run(`delete from jobs where id = ${id}`);
    await db.close();
  },

  async create(newJob) {
    const db = await Database();
    await db.run(`insert into jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) values (
      "${newJob.name}",
      ${newJob['daily-hours']},
      ${newJob['total-hours']},
      ${newJob.createdAt}
    );`);
    await db.close();
  },
};
