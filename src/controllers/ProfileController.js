import Profile from '../models/Profile.js';

export default {
  index: async (req, res) => {
    return res.render('profile', { profile: await Profile.get() });
  },

  update: async (req, res) => {
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

    const profile = await Profile.get();
    await Profile.update({
      ...profile,
      ...data,
      'hour-value': hourValue,
    });

    return res.redirect('/profile');
  },
};
