import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from './config';

export default new DataSource(typeOrmConfig as DataSourceOptions);
