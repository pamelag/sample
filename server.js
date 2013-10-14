var express = require('express')
    , routes = require('./routes')

    , http = require('http')
    , path = require('path')
    ,   _ = require('underscore')
    , cons = require('consolidate');

var app = express();

app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view options', {layout: false});
app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.post('/login', function(req, res, next) {
    var username = req.param('username',null);
    var password = req.param('password',null);

    res.render('workspace');
});

app.get('/tokbox', function(req, res, next) {
    res.render('tok');
});

app.get('/orders', function(req,res, next) {
    res.json({"project":"demo","newOrders":"91", "approvedOrders":"1", "pendingOrders":"123"});
});

app.use(function(err, req, res, next) {
    res.send(500, { error: err });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));

});