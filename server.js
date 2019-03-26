var express = require("express");
var mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'practice',
    multipleStatements: true,
    debug: false
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('db connection successs');
    } else {
        console.log('db connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});


var app = express();
var bodyparser = require('body-parser');

// app.use(app.router);
// app.use(express.static(path.join(__dirname, '/views')));
// app.use('/views', express.static(__dirname + '/views'));
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.set(process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0");
// app.set('port', process.env.PORT || 3004); // set port
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(express.cookieParser('02fnvnwt43fgj93fqmkmmm'));
// app.use(express.session());
app.use(express.static(__dirname + "/Projects"));
app.use(bodyparser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    //res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000','http://localhost:3201']);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// CATEGORY
app.get('/api/category/getAllCategories', (req, res) => {
    mysqlConnection.query('SELECT * FROM category ORDER BY id DESC', (err, rows, fields) => {
        if (!err) {
            let data = {
                message: "success",
                data: rows
            }
            res.send(data);
        } else
            console.log(err);
    });
});

app.get('/api/category/getCategory/:id', (req, res) => {
    var query = "SELECT * FROM category WHERE id = ?";
    mysqlConnection.query(query, [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

app.delete('/api/category/deleteCategory/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM category WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            let retData = {
                message: "success",
                data: rows
            };
            res.send(retData);
        } else {
            console.log(err);
            let resError = {
                message: "error",
                error: err
            };
            res.json(resError);
        }
    });
});

app.post('/api/category/insertCategory', (req, res) => {
    let cate = req.body.data;
    var sql = 'INSERT INTO category (category_name, description, status, create_time, update_time) VALUES (?,?,?,?,?)';
    var category = [cate.category_name, cate.description, cate.status,
    cate.create_time ? new Date(cate.create_time) : cate.create_time,
    cate.update_time];
    mysqlConnection.query(sql, category, (err, rows, fields) => {
        if (!err) {
            let retData = {
                message: "success",
                data: rows
            };
            res.send(retData);
        } else {
            console.log(err);
            let resError = {
                message: "error",
                error: err
            };
            res.json(resError);
        }
    });
});

app.put('/api/category/updateCategory', (req, res) => {
    let cate = req.body.data;
    var sql = 'UPDATE category SET category_name =  ? ,' +
        'description = ? , status = ? , ' +
        'create_time = ? , update_time = ? WHERE id = ?';

    var category = [cate.category_name, cate.description, cate.status,
    cate.create_time ? new Date(cate.create_time) : cate.create_time,
    cate.update_time ? new Date(cate.update_time) : cate.update_time, cate.id]
    mysqlConnection.query(sql, category, (err, rows, fields) => {
        if (!err) {
            let retData = {
                message: "success",
                data: rows
            };
            res.send(retData);
        } else {
            console.log(err);
            let resError = {
                message: "error",
                error: err
            };
            res.json(resError);
        }
    });
});
// END CATEGORY

// PRODUCT

app.post('/api/product/getAllProducts', (req, res) => {
    let dataPage = req.body.data;
    let currentPage = dataPage.currentPage;
    let pageSize = dataPage.pageSize;
    let locationFrom = (currentPage - 1) * pageSize;
    let quantity = pageSize;
    let limit = [locationFrom, quantity];
    let sql = 'SELECT a.*,b.category_name,(SELECT COUNT(*) FROM product) AS amount FROM product a, category b WHERE a.category = b.id ORDER BY id DESC LIMIT ?,?';
    mysqlConnection.query(sql, limit, (err, rows, fields) => {
        if (!err) {
            let data = {
                message: "success",
                data: rows
            }
            res.send(data);
        } else
            console.log(err);
    });
});

app.get('/api/product/getProduct/:id', (req, res) => {
    var query = "SELECT * FROM product WHERE id = ?";
    mysqlConnection.query(query, [req.params.id], (err, rows, fields) => {
        if (!err) {
            let data = {
                message: "success",
                data: rows
            }
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

app.delete('/api/product/deleteProduct/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM product WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            let retData = {
                message: "success",
                data: rows
            };
            res.send(retData);
        } else {
            console.log(err);
            let resError = {
                message: "error",
                error: err
            };
            res.json(resError);
        }
    });
});

app.post('/api/product/insertProduct', (req, res) => {
    let prod = req.body.data;
    var sql = 'INSERT INTO product (product_name,price,category,image,' +
        'description, status, create_time, update_time) VALUES (?,?,?,?,?,?,?,?)';
    var product = [prod.product_name, prod.price, prod.category, prod.image, prod.description,
    prod.status, prod.create_time ? new Date(prod.create_time) : prod.create_time,
    prod.update_time];
    mysqlConnection.query(sql, product, (err, rows, fields) => {
        if (!err) {
            let retData = {
                message: "success",
                data: rows
            };
            res.send(retData);
        } else {
            console.log(err);
            let resError = {
                message: "error",
                error: err
            };
            res.json(resError);
        }
    });
});

app.put('/api/product/updateproduct', (req, res) => {
    let prod = req.body.data;
    var sql = 'UPDATE product SET product_name =  ? ,' +
        'price = ? , category = ? , image = ? ,' +
        'description = ? , status = ? , ' +
        'update_time = ? WHERE id = ?';

    var product = [prod.product_name, prod.price, prod.category, prod.image, prod.description,
    prod.status,prod.update_time ? new Date(prod.update_time) : prod.update_time, prod.id]
    mysqlConnection.query(sql, product, (err, rows, fields) => {
        if (!err) {
            let retData = {
                message: "success",
                data: rows
            };
            res.send(retData);
        } else {
            console.log(err);
            let resError = {
                message: "error",
                error: err
            };
            res.json(resError);
        }
    });
});
// END PRODUCT
app.listen(3000, () => {
    console.log('Express Running with port 3000');
});