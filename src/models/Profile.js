let data = {
  name: 'Felipe Coutinho',
  avatar: 'https://github.com/coutinho04.png',
  'monthly-budget': 3000,
  'hours-per-day': 5,
  'days-per-week': 5,
  'vacation-per-year': 4,
  'hour-value': 75,
};

export default {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
};
