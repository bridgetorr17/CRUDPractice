import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongodb from 'mongodb';

const app = express();
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const MongoClient = mongodb.MongoClient;
const connectionString = 'mongodb+srv://bridgetorr:coder7846@cluster0.f9ny5di.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

MongoClient.connect(connectionString)
    .then(client => {
        console.log('connected to db');
        const db = client.db('harry-potter-quotes');
        const quotesCollection = db.collection('quotes');

        // =================
        // Middlewares
        // =================
        app.use(express.urlencoded({ extended: true }));
        

        // =================
        // Routes
        // =================

        app.get('/', (req, res) => {
            res.sendFile(__dirName + '/index.html');
            db.collection('quotes')
                .find()
                .toArray()
                .then(results => {
                    console.log(results)
                })
                .catch(error => console.log(error))
        });
        

        app.post('/quotes', (req, res) => {
            quotesCollection
                .insertOne(req.body)
                .then(result => {
                    res.redirect('/');
                    console.log('here');
                })
                .catch(error => console.error(error))
        });


        // =================
        // Listen
        // =================
        app.listen(3000, function(){
            console.log('listening on 3000');
        });
    })
    .catch(err => console.error(err));