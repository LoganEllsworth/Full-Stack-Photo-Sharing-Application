const express = require('express');
const router = require('./router');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json({
    type: ['application/json', 'text/pain']
}));

app.use(cors());

app.use('/api/user', router);

app.listen(port, () => console.log(`App listening on port ${port}`));