import express from "express";
import {getPatients, getPatient, createPatient, updatePatient, deletePatient} from '../controllers/patient.controller.js';

const patientRoutes = express.Router();

patientRoutes.route('/')
    .get(getPatients)
    .post(createPatient);

patientRoutes.route('/:id')
    .get(getPatient)
    .put(updatePatient)
    .delete(deletePatient);

export default patientRoutes;