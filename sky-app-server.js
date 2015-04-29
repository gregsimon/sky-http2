// Http2 Server for Sky "applications"

var fs = require('fs');
var path = require('path');
var http2 = require('http2');

// When a request comes in at the root of an application, 
// we'll use server push to push down everything the application
// needs. We'll

var kServerRoot = 'www';

// The callback to handle requests
function onRequest(request, response) {
  var filename = path.join(path.join(__dirname, kServerRoot), request.url);

  // Is this a request for an 'app'? Check to see if there is a pubspec.yaml
  var yamlFile = path.join(filename, 'pubspec.yaml');
  if (fs.existsSync(yamlFile) && fs.statSync(yamlFile).isFile()) {
    // Yes this is a Sky app!
    
    // gather up all the resources and push down
    list = results = walk(filename);

    // TODO : we probably  want to cache this on the server side

    list.forEach(function(filename, index, arry) {
      console.log('pushing '+filename);
      if (response.push) {
        var push = response.push(filename);
        push.writeHead(200);
        fs.createReadStream(filename).pipe(push);
      }
    });

    // TODO : send the yaml?
    response.end('fin.');

  } 
  else 
  {
    // Just serving a regular (single) file
    if ((filename.indexOf(__dirname) === 0) && fs.existsSync(filename) && fs.statSync(filename).isFile()) 
    {
      response.writeHead(200);
      fs.createReadStream(filename).pipe(response);
    }
    else 
    {
      // Otherwise responding with 404.
      response.writeHead(404);
      response.end();
    }
  }

  console.log('socket complete');
}


function walk (dir) {
  console.log('walk('+dir+')');
  var results = [];
  
  list = fs.readdirSync(dir);

  list.forEach(function(file, index, arry) {
    file = dir + '/' + file;
    stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
        new_results = walk(file);
        results = results.concat(new_results);
    } else {
      results.push(file);
    }
  });

  return results;
}


// Creating a bunyan logger (optional)
var log; // = require('../test/util').createLogger('server');

// Creating the server in plain (non-TLS mode)
var server = http2.raw.createServer({
    log: log
  }, onRequest);

server.listen(process.env.HTTP2_PORT || 8080);
