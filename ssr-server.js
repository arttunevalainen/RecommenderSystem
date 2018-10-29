const express = require('express');
const next = require('next');
    
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const axios = require('axios');


app.prepare().then(() => {
    //Start Express
    const server = express();



    /** ROUTING */

    //Rooting like this you can access localhost:3000/about which renders ./pages/about.js
    server.get('/about', (req, res) => {
        //console.error() is good for debugging
        console.error("about requested");
        return app.render(req, res, '/about', req.query);
    });
        
    //Index.js
    server.get('*', (req, res) => {
        return handle(req, res);
    });
    
    /** ROUTING END */



    //Server will be online in https://localhost:3000
    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000');
    });

})
.catch((exception) => {
    console.error(exception.stack)
    process.exit(1)
});

