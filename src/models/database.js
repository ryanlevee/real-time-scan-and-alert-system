import dotenv from 'dotenv';
import sql from 'mssql';
import { Utl } from '../common/utility.js';
import { DatabaseError } from '../errors/classes/database.js';
import { DataStore } from '../storage/stores.js';
import { schemas } from './schemas.js';
dotenv.config({ path: import.meta.dirname + '/../config/.env' });


class DatabaseConfig {
    setConfig() {
        return {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            server: process.env.DB_SERVER,
            database: process.env.DB_DATABASE,
            connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT),
            requestTimeout: parseInt(process.env.DB_REQUEST_TIMEOUT),
            options: {
                encrypt: process.env.DB_ENCRYPT === 'true',
                trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
            },
            pool: {
                max: parseInt(process.env.DB_POOL_MAX),
                min: parseInt(process.env.DB_POOL_MIN),
                idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT),
            },
        };
    }
}

class DatabaseQueries {
    setQueries() {
        return {
            insertLogProc: `${process.env.DB_LOG_PROC}`,
        };
    }
}

class Database {
    static #config = new DatabaseConfig().setConfig();
    static #pool;
    static #isInstantiated;
    static #count = 5;
    static #queries = new DatabaseQueries().setQueries();

    static async closePool() {
        if (!Database.#isInstantiated) {
            console.log("Cannot close pool, db isn't connected");
            return false;
        };
        await Database.#pool.close();
        Database.#isInstantiated = false;
        console.log('Disconnected from MSSQL\n');
    }

    async startPool() {
        try {
            Database.#pool = await new sql.ConnectionPool(Database.#config).connect();
            console.log('Connected to MSSQL');
            Database.#isInstantiated = true;
        } catch (error) {
            console.error('Database Connection Error:', error);
            await this.#retryConnection();
        }
    }

    async #retryConnection(retries = 5, delay = 5) {
        let err;
        for (let i = 0; i < retries; i++) {
            try {
                console.log(`Retrying database connection (${i + 1}/${retries})...`);
                await new Promise(resolve => setTimeout(resolve, delay * 1000));
                Database.#pool = await new sql.ConnectionPool(Database.#config).connect();
                console.log('Connected to MSSQL');
                Database.#isInstantiated = true;
                return;
            } catch (error) {
                console.error('Retry failed:', error);
                err = error;
            }
        }
        console.error('All retries failed. Exiting process.');
        throw new sql.ConnectionError(err);

    }

    static async #confirmDatabaseConnection() {
        if (Database.#isInstantiated) {
            console.log('\nDatabase already instantiated');
            return true;
        };
        const db = new Database();
        await db.startPool();
    }

    static async runProcedureArr(sqlArr) {
        await this.#confirmDatabaseConnection();
        return await Promise.all(sqlArr.map(async sqlObj => await this.runProcedure(sqlObj)));
    }

    static async runProcedure(sqlObj) {
        const request = await Database.#pool.request();
        this.#consoleLogParams(sqlObj, Object.keys(sqlObj)[0]);
        this.#setParameters(request, Object.keys(sqlObj)[0], Object.values(sqlObj)[0]);
        return await this.#execProc(request, Database.#queries.insertLogProc);
    }

    static #consoleLogParams(sqlObj, type) {
        console.log(`\n${new Date().toLocaleString()}\nDatabase #consoleLogParams sqlObj (${type}):`);
        Object.values(sqlObj).forEach(v => console.log(v));
    }

    static #setParameters(request, type, payload) {
        const schema = Object.entries(schemas).find(([k]) => k === type)[1];

        const sqlObj = Object.entries(payload).reduce((obj, [pKey, pVal]) => (
            Object.entries(schema).forEach(([sKey, sVal]) => (
                sKey == pKey && (obj[pKey] = [sVal, pVal])
            )), obj
        ), {});

        request.input('TableName', sql.NVarChar(50), type);
        Object.entries(sqlObj).forEach(([k, v]) => request.input(k, v[0], v[1]));
    }

    static async #execProc(request, proc) {
        DataStore.startCount = this.#count;

        await Utl.waitSec(1);

        const [sqlResponse] = (await request.execute(proc)).recordset;
        Utl.cLog(sqlResponse, 'SQL Response');

        if (sqlResponse.ErrorMessage)
            throw new DatabaseError(`Database Error ${sqlResponse.ErrorCode}: ${sqlResponse.ErrorMessage}`);

        return sqlResponse;
    }
}

export { Database };
