const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use api routes
app.use('/api', apiRoutes);

// Not Found response for unmatched routes
app.use((req, res) => {
    res.status(404).end();
});

// start server after db conneciton 
db.connect(err => {
    if (err) throw err; 
    console.log('Database.connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
