import Database from './config.js';

const initDb = {
  init: async () => {
    const db = await Database();

    await db.exec(`create table profile ( 
      id integer primary key autoincrement,
      name text,
      avatar text,
      monthly_budget integer,
      hours_per_day integer,
      days_per_week integer,
      vacation_per_year integer,
      hour_value integer
      )`);

    await db.exec(`create table jobs ( 
        id integer primary key autoincrement,
        name text,
        daily_hours integer,
        total_hours integer,
        created_at datetime
        )`);

    await db.run(`insert into profile (
      name, 
      avatar, 
      monthly_budget, 
      hours_per_day, 
      days_per_week, 
      vacation_per_year,
      hour_value
      ) values (
        "Felipe",
        "https://github.com/coutinho04.png",
        3000,
        5,
        5,
        4,
        75
      );`);

    await db.run(`insert into jobs (
      name, 
      daily_hours, 
      total_hours, 
      created_at
      ) values (
        "Pizzaria Guloso",
        2,
        60,
        1617911002911
      );`);

    await db.run(`insert into jobs (
      name, 
      daily_hours, 
      total_hours, 
      created_at
      ) values (
        "OneTwo Project",
        3,
        1,
        1617911002911
      );`);

    await db.close();
  },
};

initDb.init();
