import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3307,
  username: process.env.DB_USERNAME || 'root',
  database: process.env.DB_NAME || 'test',
  password: process.env.DB_PASSWORD || '123456',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  logging: true,
  // synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
