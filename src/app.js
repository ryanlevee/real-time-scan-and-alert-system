import dotenv from 'dotenv';
import express from 'express';
import * as bookend from './bookends/index.js';
import * as extend from './extenders/index.js';
import * as routes from './routes/index.js';
dotenv.config({ path: import.meta.dirname + '/config/.env' });


const app = express();
const port = process.env.PORT || 3000;

app.use(bookend.Begin.prog);
app.use(express.json());
app.use(extend.middleware);

app.use('/livescan', routes.liveScan);
app.use('/livealert', routes.liveAlert);

app.use(extend.errors);
app.use(bookend.End.prog);

app.listen(port, () => {
    console.log(`\nDRN app listening on port ${port}!`);
});

app.on('error', (error) => {
    console.error('Server failed to start:', error);
    process.exit(1);
});
