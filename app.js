const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const productosRouter = require('./rutas/productosRouter');
app.use('/api/1.0', productosRouter);

app.use('/static', express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = 3020;
app.listen(PORT, console.log('Express está escuchando en el puerto: ' + PORT));
