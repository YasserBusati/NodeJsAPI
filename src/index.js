import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './domain/response.js';


dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());

app.get('/', (req, res) => res.send(new Response(200, 'OK', 'patient APP')));
console.log(process.env);
app.listen(PORT, () => console.log("Server runing on:"+ ip.address()+":"+PORT));

