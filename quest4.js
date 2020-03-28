const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');
var ip = require('ip');
var url = require('url');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use(function(req, res) {
  var methodType = req.method;
  if (methodType == 'GET') {
    //url 속성을 이용한 경로 구분
    var pathname = url.parse(req.url).pathname;
    if (pathname == '/') { // 'http://localhost:8000/' 호출시
      var obj = {};
      for (let [key, value] of Object.entries(req.query)) {
        obj[key] = value;
      }
      let time = new Date();

      obj.email = 'walcoll72@gmail.com';
      obj.stuno = '20141514';
      obj.time = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDay() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
      require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.log('addr: ' + add);
        obj.ip = add;
        const jdata = JSON.stringify(obj);
        res.send(jdata);
      });
    } else if (pathname == '/get') { // 'http://localhost:8000/otherpage' 호출시
      var obj = {};
      for (let [key, value] of Object.entries(req.query)) {
        obj[key] = value;
      }
      let time = new Date();
      obj.email = 'walcoll72@gmail.com';
      obj.stuno = '20141514';
      obj.time = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDay() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
      require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.log('addr: ' + add);
        obj.ip = add;
        const jdata = JSON.stringify(obj);
        res.send(jdata);
      });
    } else {
      var array = pathname.split('/');
      var obj = {};
      obj.a = array[1];
      obj.b = array[2];
      for (let [key, value] of Object.entries(req.query)) {
        obj[key] = value;
      }
      let time = new Date();
      obj.email = 'walcoll72@gmail.com';
      obj.stuno = '20141514';
      obj.time = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDay() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
      require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.log('addr: ' + add);
        obj.ip = add;
        const jdata = JSON.stringify(obj);
        res.send(jdata);
      });

    }
  } else if (methodType == 'POST') {
    var obj = {};
    for (let [key, value] of Object.entries(req.body)) {
      obj[key] = value;
    }
    let time = new Date();
    obj.email = 'walcoll72@gmail.com';
    obj.stuno = '20141514';
    obj.time = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDay() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
      console.log('addr: ' + add);
      obj.ip = add;
      const jdata = JSON.stringify(obj);
      res.send(jdata);
    });
  }
});



http.createServer(app).listen(8000, function() { //8000번 포트로 웹서버 실행
  console.log('Server Running at http://localhost:8000');
});
