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
        app.set('view engine', 'ejs');
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static('public'));
        app.use(express.json());

        // =================
        // Routes
        // =================

        app.get('/', (req, res) => {
            db.collection('quotes')
                .find()
                .toArray()
                .then(results => {
                    res.render('index.ejs', { quotes: results});
                })
                .catch(error => console.log(error));
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

        app.put('/quotes', (req, res) => {
            quotesCollection
                .findOneAndUpdate(
                    {
                        name: 'Neville Longbottom'
                    }, 
                    {
                        $set: {
                            name: req.body.name,
                            quote: req.body.quote
                        }
                    },
                    {
                        upsert: true
                    })
                .then(result => {
                    res.json('Success');
                })
                .catch(error => console.error(error));
        });

        // =================
        // Listen
        // =================
        app.listen(3000, function(){
            console.log('listening on 3000');
        });
    })
    .catch(err => console.error(err));