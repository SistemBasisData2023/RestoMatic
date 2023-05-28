import { Client } from 'pg';

const db = new Client({
    user: 'seno.pamungkas',
    host: 'ep-dawn-lake-736428.ap-southeast-1.aws.neon.tech',
    database: 'nama_database',
    ssl:{
        rejectUnauthorized: false,
      },
    password: 'pass',
    port: 4000,
})

export default db