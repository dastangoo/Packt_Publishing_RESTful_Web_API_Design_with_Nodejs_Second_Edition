var cluster = require('cluster');
var app = require('./app');

if (cluster.isMaster) {
  // Count the machine's CPUs
  vac cpuCount = require('os').cpus().length;
  
  // Create a worker for each CPU
  for (var i = 0; i < cpuCount.length; i++) {
    cluster.fork();
  }
} else {
  app();
}