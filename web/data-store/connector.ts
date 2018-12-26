import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import config from 'config';

import { User } from '../entities/user';
import { saveUser } from '../services/user.service';


const minOpt: ConnectionOptions = {
    ...config.get('mysql'),
    type: 'mysql'
};

const opt: ConnectionOptions = {
    ...minOpt,
    database: 'test',
    synchronize: true,
    entities: [User],
    logging: ['info', 'log']
};

export const connect = (): Promise<Connection> =>
    createConnection(opt)
        .catch(async err => {
            if (err.code === 'ER_BAD_DB_ERROR') {
                console.log(err.message);
                const connection = await createConnection({...minOpt, name: 'temp'});
                const queryRunner = connection.createQueryRunner();
                await queryRunner.createDatabase('test', true);
                const dbConnection = await createConnection(opt);
                console.log('Db connection created');
                const user: User = {
                    ...config.get('admin')
                };
                await saveUser(user);
                console.log('Default user created');
                return dbConnection;
            }
            throw err;
        });
