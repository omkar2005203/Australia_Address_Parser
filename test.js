var parser = require('./node_modules/australia-address-parser/parser'); 
//var parser = require('./node_modules/australia-address-parser/australiaAddressParser.min'); 
var data = parser.parseLocation('C/- SIRAGUSA & CO PTY LTD P0 BOX 434 RESERVOIR VIC 3073 AUSTRALIA');
console.log(data);