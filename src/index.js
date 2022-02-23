import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './domain/response.js';
import logger from './log/logger.js';
import HttpStatus from './helper/httpStatus.js';
import patientRoutes from './routes/patient.route.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());

app.use('/patients', patientRoutes);
app.get('/', (req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'patient APP, v1.0.0 ')));
app.all('*', (req, res) => res.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist on server')));
app.listen(PORT, () => logger.info("Server running on:"+ ip.address()+":"+PORT));

