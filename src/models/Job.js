let data = [
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
];

export default {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
  delete(id) {
    data = data.filter((job) => +job.id !== +id);
  },
};
