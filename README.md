# nmapdd
[![NPM](https://nodei.co/npm/nmapdd.png)](https://nodei.co/npm/nmapdd/)

Simple nmap to node.js wrapper.
It makes a scan via `nmap -sn 192.168.1.1/24` and gets the live hosts in a JSON format.

## Installation
```npm install nmapdd```

## Basic example
```
var scan = require("nmapdd");
scan().then(hosts => console.log(hosts)).catch(err => console.error(err));

```
