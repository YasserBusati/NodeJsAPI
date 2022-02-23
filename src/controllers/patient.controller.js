import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../log/logger.js';
import QUERY from '../query/patient.query.js';
import HttpStatus from '../helper/httpStatus.js';

export const getPatients =(req, res) => {
    logger.info(`${req.method} ${req.originalurl} fetching patients`);
    database.query(QUERY.SELECT_PATIENT, (error, results) => {
        if(!results){
            res.status(HttpStatus.NO_CONTENT.code)
                .send(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, 'No Patients Found'));
        } else {
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patients retcieved', {patients: results}));
        }
    })
};

export const createPatient =(req, res) => {
    logger.info(`${req.method} ${req.originalurl} creating patient`);
    database.query(QUERY.CREATE_PATIENT, Object.values(req.body), (error, results) => {
        if(!results){
            logger.error(error.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Error Occurred'));
        } else {
            const patient = {id: results.insertedId, ...req.body, created_at: new Date()};
            res.status(HttpStatus.CREATED.code)
                .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Patient created', {patient}));
        }
    })
};


export const getPatient =(req, res) => {
    logger.info(`${req.method} ${req.originalurl} creating patient`);
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
        if(!results[0]){
            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `patient by id ${req.params.id} was not found`));
        } else {
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patient retrieved', results[0]));
        }
    })
};

export const updatePatient =(req, res) => {
    logger.info(`${req.method} ${req.originalurl} updating patient`);
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
        if(!results[0]){
            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `patient by id ${req.params.id} was not found`));
        } else {
            logger.info(`${req.method} ${req.originalurl} Updating  patient`);
            database.query(QUERY.UPDATE_PATIENT, [...Object.values(req.body), req.params.id], (error, results) => {
                if(!error){
                    res.status(HttpStatus.OK.code)
                        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patient updated', {id: req.params.id, ...req.body}));
                } else{
                    logger.error(error.message);
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occured`));
                }
            });
        }
    }); 
};
export const deletePatient =(req, res) => {
    logger.info(`${req.method} ${req.originalurl} deleting patient`);
    database.query(QUERY.DELETE_PATIENT, [req.params.id], (error, results) => {
        if(results.affectedRows > 0){
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Patient deleted', results[0]));
        } else {
            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `patient by id ${req.params.id} was not found`));
        }
    })
};