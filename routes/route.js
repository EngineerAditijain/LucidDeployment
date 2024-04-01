import express from 'express';
import { createRecordSet, deleteRecordSet, getAllRecordSets, updateRecordSet } from '../controller/records-controller.js';
import { login, register } from '../controller/auth-controller.js';
import verifyToken from '../middleware/auth-middleware.js';
// import upload from '../utils/upload.js';

const route = express.Router();



route.post('/addrecord' ,verifyToken, createRecordSet);
route.delete('/deleteRecord' ,verifyToken, deleteRecordSet);
route.put('/updateRecordSet' , verifyToken,updateRecordSet);
route.get('/getAllRecordSets' ,verifyToken, getAllRecordSets);
route.post('/register' , register);
route.post('/login' , login);



export default route;