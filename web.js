const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
var bodyParser = require('body-parser');
var ip = require('ip');
var url = require('url');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {

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
});



app.get('/get', (req, res) => {
  console.log(req.path);
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
});

app.post('/', (req, res) => {
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
  // fs.writeFile(`data/${title}.json`, description, 'utf8', function(err) {
  //   if (err) {
  //     console.log(err);
  //     res.send("data 저장 실패");
  //   }
  //   console.log("data 저장 성공");
  // })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
