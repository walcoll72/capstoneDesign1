var express = require('express');
var app = express();
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

var date = moment().format('YYYY-MM-DD HH:mm:ss');

mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'mypassword',
  databse: 'weather'
})
connection.connect();

function insert_sensor(device, value, seq) {
  obj = {};
  obj.seq = seq;
  obj.device_id = device;
  obj.value = value;

  //console.log(obj);

  var query = connection.query('INSERT INTO weather.temp SET ?', obj, function(err, rows, cols) {
    if (err) throw err;
    console.log("database insertion ok= %j", obj);
  });
}

app.get('/', function(req, res) {
  res.end('Nice to meet you');
});

app.get('/record_temp', function(req, res) {
  r = req.query;
  console.log("GET %j", r);

  var info = {
    "device_id": r.device_id,
    "status": "ok",
    "time": date
  }

  insert_sensor(r.device_id, r.temperature_value, r.sequence_number);
  res.send(info);
  res.end('OK:' + JSON.stringify(req.query));
});

app.get('/show_temp', function(req, res) {
  r = req.query;
  var device_id = r.device_id;
  var r_length = 0;
  if (device_id == '') {
    var query = connection.query('SELECT * FROM weather.temp', function(err, result) {
      if (err) throw err;
      res.send(result);
      console.log('well done');
    });

  } else {
    var query = connection.query('SELECT * FROM weather.temp WHERE device_id = ?', device_id, function(err, result) {
      if (err) throw err;
      res.send(result);
      console.log('well done');
    });

  }

});

var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
