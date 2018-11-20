const express = require('express');
const next = require('next');
    
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();



app.prepare().then(() => {
    //Start Express
    const server = express();

    /** ROUTING */

    //Route for boardgames by ids
    server.get('/boardgame/:id', (req, res) => {
        return app.render(req, res, '/boardgamepage', { id: req.params.id })
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

