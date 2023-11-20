const express = require ('express');
const productosRouter = express.Router();
const mysql = require('mysql2');
const path = require('path');
const multer = require ('multer');


// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: "root",
    database: 'bd_catalogo',
    connectTimeout: 60000,
});

// Conecta a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida');
});



productosRouter.use(express.json());
productosRouter.use(express.text());

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: './public/uploads', // Ruta donde se almacenarán las imágenes
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

class Producto {
    constructor(cod, nom, des, pre, mar, sto, foto) {
        this.codigo = cod;
        this.nombre = nom;
        this.descripcion = des;
        this.precio = pre;
        this.marca = mar;
        this.stock = sto;
        this.foto = foto;
    }
}

productosRouter.get('/', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, rows) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.send('Error interno del servidor.');
        } else {
            console.log(rows);
            res.json(rows)
        }
    });
})

productosRouter.get('/:id', (req, res) => {
    let idProducto = req.params.id;
    console.log(idProducto);
    const sql = 'SELECT * FROM productos where idProducto=?';

    const arrayVacio = (arr) => !Array.isArray(arr) || arr.length === 0;


    db.query(sql, idProducto, (err, rows) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.send('Error interno del servidor.');
        } else {
            if (arrayVacio(rows)) {

                console.log(rows);
                res.json([{ mensaje: 'No existe el contacto solicitado' }])
            } else {
                res.json(rows)
                console.log(rows);
            }

        }
    });
})

productosRouter.post('/nuevo', (req, res) => {

    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let marca = req.body.marca;
    let stock = req.body.stock;
    let foto = req.file ? req.file.filename: null; // Obtén el nombre del archivo si se ha subido


    const sql = 'INSERT INTO productos (nombre, descripcion, precio, marca, stock, foto_path) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [nombre, descripcion, precio, marca, stock, foto];
    const nuevoProducto = new Producto(nombre, descripcion, precio, marca, stock, foto);

    db.query(sql, values, (err, rows) => {
        if (err) {
            console.error('Error al agregar en la base de datos:', err);
            res.send('La informacion no se pudo agregar en la base de datos');
        } else {
            res.send('El producto :' + JSON.stringify(nuevoProducto.nombre) + ' se agregó correctamente');
        }
    });

})
productosRouter.put('/modificar', (req, res) => {
    let idProducto = req.body.idProducto;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let marca = req.body.marca;
    let stock = req.body.stock;
    const sql = 'UPDATE productos SET nombre=?,descripcion=?,precio=?,marca=?,stock=? where idProducto= ?';
    const values = [nombre, descripcion, precio, marca, stock, idProducto];
    const productoActualizado = new Producto (nombre, descripcion, precio, marca, stock);
    db.query(sql, values, (err, rows) => {
        if (err) {
            console.error('Error al modificar en la base de datos:', err);
            res.send('La informacion no se pudo modificar en la base de datos');
        } else {
            res.send('Se modificaron los datos del producto ' + JSON.stringify(productoActualizado.nombre));
        }
    });
})

productosRouter.delete('/:id', (req, res) => {
    let idProducto = req.params.id;
    const sql = 'DELETE FROM productos where idProducto=' + idProducto;
    db.query(sql, (err, rows) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.send('Error interno del servidor.');
        } else {
            res.send('Se eliminó el producto cuyo id es ' + idProducto);
        }
    });
})





module.exports = productosRouter;