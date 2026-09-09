import express from 'express';
import cors from 'cors'
import router from './routes/routes.js';

const app = express();

app.use(express.json());
app.use(cors())

app.use('/carpinteria', router);


app.get('/', (req, res) => {
    return res.json({ message: "API Carpintería funcionando" })
});

export default app;