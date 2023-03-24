const express = require("express");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const multer = require("multer");
const User = require("./user.js");
const Products = require("./product");
// const fileType = require("file-type ");
var fs = require("fs");
const app = express();
const user = new Array();
const products = new Array();
const port = 3000;

products.push(
    new Products(
      "1",
      "áo 1",
      "149000",
     "https://cf.shopee.vn/file/1895d6c9310fb46e43db0e39516e884b"
    )
  );
  products.push(
    new Products(
      "2",
      "áo2",
      "350000",
      "https://cf.shopee.vn/file/1895d6c9310fb46e43db0e39516e884b"
    )
  );
  products.push(
    new Products(
      "3",
      "áo3",
      "260000",
      "https://cf.shopee.vn/file/1895d6c9310fb46e43db0e39516e884b"
    )
  );
  products.push(
    new Products(
      "4",
      "áo4",
      "100000",
      "https://cf.shopee.vn/file/1895d6c9310fb46e43db0e39516e884b"
    )
  );
  products.push(
    new Products(
      "5",
      "áo5",
      "300000",
      "https://cf.shopee.vn/file/1895d6c9310fb46e43db0e39516e884b")
  );

app.engine('.hbs', expressHbs.engine({
    extname: "hbs",
    defaultLayout: 'home',
}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('home', {
        layout: 'chon',
    })
});

app.get('/dangky', (req, res) => {
  
   
    res.render('defaultView', {
        layout: 'dangky',
    })
    
});
app.get('/dangnhap', (req, res) => {
    var fullname =req.query.fullname;
    var email =req.query.email;
    var pass =req.query.pass;

    res.render('defaultView', {
        layout: 'dangnhap',email,pass
    })
    // console.log(email+""+pass);
});
app.get('/trangchu', (req, res) => {
    var email =req.query.email;
    var emaillg =req.query.emaillg;
    var pass =req.query.pass;
    var passlg =req.query.passlg;
    if(emaillg=="abc@gmail.com" && passlg=="123"){
        res.render('defaultView', {
            layout: 'trangchu',
        })
       
       
    }else{
        // res.send("Sai tài khoản hoặc mật khẩu")
        res.render('defaultView', {
          layout: 'trangchu',
      })
    }
   
});
app.post("/trangchu/add-user", (req, res) => {
    const email = req.body.email;
    const id = req.body.id;
    const password = req.body.password;
    const img = req.body.img;
    if (email == "" || id == "" || password == "" || img == "") {
      res.status(400).json({ error: "Add user failed" });
    } else {
      user.push(new User(id, email, password, img));
    }
    res.redirect("/trangchu");
  });
  app.post("/products/add-products", (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    const price = req.body.price;
    const img = req.body.img;
    if (name == "" || id == "" || price == "" || img == "") {
      res.status(400).json({ error: "Add products failed" });
    } else {
      products.push(new Products(id, name, price, img));
    }
    res.redirect("/products");
  });
  app.get("/products", (req, res, next) => {
    res.render("defaultView", { layout: "layoutProducts", products: products });
  });
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});