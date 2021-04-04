export default {
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
};
