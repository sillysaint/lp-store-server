const express = require('express');
const cartRoutes = require('./cart-routing');
const data = require('./data-models');
var cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

// Enabling CORS
app.use(cors());

let plates = data.plates;

function logErrors(err ,req, res, next){
    console.error(err);
    res.status(404).send('Nothing to see here');
}

app.use('/data', (req, resp) => resp.send(plates));
app.use('/states', (req, resp) => resp.send(data.states));
app.use('/rates', (req, resp) => resp.send({'EUR': 1.14, 'GBP': 1.31}));
app.use('/checkout', (req, resp) => resp.send({status: 'OK'}));
app.use('/login', (req, resp) => resp.send({token: '1abcd21atsampletoken21'}));
app.use('/weather', (req, resp) => {
    if (req.query.zipcode == '95742') {
        resp.send({"coord":{"lon":-121.22,"lat":38.6},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":78.28,"feels_like":72.46,"temp_min":75.99,"temp_max":80.01,"pressure":1014,"humidity":27},"visibility":16093,"wind":{"speed":6.93,"deg":300},"clouds":{"all":5},"dt":1592342174,"sys":{"type":1,"id":4887,"country":"US","sunrise":1592311204,"sunset":1592364687},"timezone":-25200,"id":0,"name":"Rancho Cordova","cod":200});
    } else if (req.query.zipcode == '33101') {
        resp.send({"coord":{"lon":-80.2,"lat":25.78},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"stations","main":{"temp":85.78,"feels_like":82.74,"temp_min":84.99,"temp_max":86,"pressure":1017,"humidity":48},"visibility":16093,"wind":{"speed":13.87,"deg":80},"clouds":{"all":40},"dt":1592342315,"sys":{"type":1,"id":4896,"country":"US","sunrise":1592303361,"sunset":1592352837},"timezone":-14400,"id":0,"name":"Miami","cod":200});
    } else {
        resp.send({"coord":{"lon":-74,"lat":40.75},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":75.04,"feels_like":71.37,"temp_min":71.01,"temp_max":78.8,"pressure":1027,"humidity":53},"visibility":16093,"wind":{"speed":10.29,"deg":130},"clouds":{"all":1},"dt":1592342158,"sys":{"type":1,"id":4610,"country":"US","sunrise":1592299454,"sunset":1592353768},"timezone":-14400,"id":0,"name":"New York","cod":200});
    }
});

app.use('/cart', cartRoutes);

// We serve our store UI statically
app.use('/', express.static('./lp-store-ui'));

// Middleware for error handling
app.use(logErrors);

app.listen(port, (err) => {
    console.log(`License Plate server listening on ${port}`)
});
