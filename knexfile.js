const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
    client: 'pg',
    migrations: {
        directory: './db/migrations'
    },
    seeds: {
        directory: './db/seeds'
    }
}

const customConfig = {
    development: {
        connection: {
            database: "simpsons_data"
        }
    },
    test: {
        connection: {
            database: 'simpsons_data_test'
        }
    }
};

module.exports = {...customConfig[ENV], ...baseConfig};