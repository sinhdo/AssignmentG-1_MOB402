const express = require('express')
const app = express()
const port = 3000


const expressHbs = require('express-handlebars');

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
        res.send("Sai tài khoản hoặc mật khẩu")
    }
   
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});