import { Sequelize } from 'sequelize';
import config from '../../config.json';

// Interface defining the shape of our database object
export interface Database {
  sequelize: Sequelize;
  User: ReturnType<typeof import('../users/user.model').default>;
}

// Initialize as partial then cast — will be fully populated in initialize()
const db = {} as Database;

export { db };

export async function initialize(): Promise<void> {
  const { host, port, user, password, database } = config.database;

  const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
  });

  // Test the connection
  await sequelize.authenticate();
  console.log('✅ Database connection established successfully.');

  // Attach sequelize instance to db object
  db.sequelize = sequelize;

  // Import and initialize models
  const { default: userModel } = await import('../users/user.model');
  db.User = userModel(sequelize);

  // Sync all models with database (creates tables if they don't exist)
  await sequelize.sync({ alter: true });
  console.log('✅ Database synchronized successfully.');
}