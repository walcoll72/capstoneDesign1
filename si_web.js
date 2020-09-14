var express = require('express');
var app = express();
const axios=require('axios');
const cheerio = require("cheerio");
const data = "data";

mysql = require('mysql');
var rss = 'http://web.kma.go.kr/wid/queryDFSRSS.jsp?zone=117405700';
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'mypassword',
  database: 'weather'

})

connection.connect();

function insert_sensor(date, hour, TEMP) {
  obj = {};
  obj.date = date;
  obj.hour = hour;
  obj.TEMP = TEMP;


  var query = connection.query('insert into wd set?', obj, function(err, rows, cols) {

    if (err) throw err;
    console.log("database insertion ok=%j", obj);


  });

}

app.get('/', function(req, res) {
  res.end('nice to meet you');
});

app.get('/log', function(req, res) {
  const getHtml = () => {
    try {
      return axios.get(rss);
    } catch (error) {
      console.error(error);
    }
  };

  getHtml()
    .then(html => {
      //let utfHtml=iconv.convert(html.data,'utf-8').toString();
      let ulList = {};
      const $ = cheerio.load(html);
      const date = $('header').children('tm').text();
      const hour = $("body:nth-child(2)").find('hour').text();
      const temp = $("body:nth-child(2)").find('temp').text();
      ulList.date = date;
      ulList.hour = hour;
      ulList.TEMP = temp;
      return ulList;
    })
    .then(result => {
      insert_sensor(result.date, result.hour, result.TEMP);
      res.end('ok:' + JSON.stringify(result));
    });

});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);

})
