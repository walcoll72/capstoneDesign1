
var express = require('express')
var app = express()
fs = require('fs');
mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'mypassword',
  database: 'weather'
})
connection.connect();


app.get('/graph', function(req, res) {
  console.log('got app.get(graph)');
  var html = fs.readFile('./graph.html', function(err, html) {
    html = " " + html
    console.log('read file');

    var qstr = 'select * from wd ';
    connection.query(qstr, function(err, rows, cols) {
      if (err) throw err;

      var data = "";
      var comma = ""
      for (var i = 0; i < rows.length; i++) {
        r = rows[i];
	var a=String(r.time).substr(16,17);
	//console.log("sdsdsdsdsd");
	//console.log(`ddd:${a} sss:${r.TEMP}
	var a=r.date;
	console.log(a.substr(0,4)+'d:'+String(a).substr(4,8)+'a:'+a.substr(8,12));
        data += comma + `[${r.id},${r.TEMP}]`;
        comma = ",";
      }
      var header = "data.addColumn('number', 'Date/Time');"
      header += "data.addColumn('number', 'Temp');"
      html = html.replace("<%HEADER%>", header);
      html = html.replace("<%DATA%>", data);

      res.writeHeader(200, {
        "Content-Type": "text/html"
      });
      res.write(html);
      res.end();
    });
  });
})

var server = app.listen(8082, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
