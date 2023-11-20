const express=require('express');
const app=express();
const cors = require('cors');
const PORT = 3020;
const path = require ('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb)=> {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(upload.single('foto'));


const productosRouter = require('./rutas/productosRouter');
app.use(cors());
app.use('/api/1.0/productos', productosRouter);




//middelwares
//app.use(multer({
//    storage,
//    dest: './public/uploads'
//}).single('image'))


//Subir Foto
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/subirFoto', (req, res)=>{
    res.render('index');
})

app.post('/upload', upload.single('foto'), (req, res) =>{
    console.log(req.file);
    res.send('Se subio Correctamente la foto!');
})



app.listen(PORT, console.log('Express está escuchando en el puerto: ' + PORT));