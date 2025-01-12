import sequelize from './instance';
import Seminary from './models/Seminary';
import Users from './models/Users'
import Task from './models/Task'
import Channels from './models/Channels'

async function authDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function migration() {
  await Users.sync();
  await Channels.sync();
  await Seminary.sync();
  await Task.sync();
}

async function migrateForce() {
  await Users.sync({ force: true });
  await Channels.sync({ force: true });
  await Seminary.sync({ force: true });
  await Task.sync({ force: true });
}

// If param is dbcheck program only runs connexion function
// Otherwise runs connexion and migration functions
if (process.argv[2] === 'dbcheck') {
  authDatabase();
} else if (process.argv[2] === '-f'){
  authDatabase();
  migrateForce();
} else {
  authDatabase();
  migration();
}
