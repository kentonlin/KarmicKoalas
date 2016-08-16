// var http = require("https");
//
//
// var options = {
//   "method": "GET",
//   "hostname": "maps.googleapis.com",
//   "port": null,
//   "path": "/maps/api/geocode/json?latlng=40.714224%2C-73.961452&key=AIzaSyDPR_rluVMdgqvM4JBorRSJa3Q2Mo_rUXU",
//   "headers": {
//     "content-type": "application/json",
//     "cache-control": "no-cache",
//     "postman-token": "b71c4aae-9293-7afb-211f-1225c3314573"
//   }
// };
//
// var req = http.request(options, function (res) {
//   var chunks = [];
//
//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });
//
//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });










var http = require("https");

//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyDPR_rluVMdgqvM4JBorRSJa3Q2Mo_rUXU

// const getAddress = (start, end, callback) => {
//    var StartAddress = getLoc(start)
//    console.log("startAddress:", StartAddress);
//    var EndAddress = getLoc(end)
//    callback({start:StartAddress, end:EndAddress})
//  }
 function getAddress(loc, cb){
   console.log('getloc', loc)
   var locString = loc.split(",").join("%2C")
   console.log(locString);
   var options = {
            "method": "GET",
            "hostname": "maps.googleapis.com",
            "port": null,
            "path": "/maps/api/geocode/json?latlng=" + loc + "&key=AIzaSyDPR_rluVMdgqvM4JBorRSJa3Q2Mo_rUXU",
            "headers": {
              "content-type": "application/json",
              "cache-control": "no-cache",
              "postman-token": "2a345e43-8982-8909-5e33-b51770a63de2"
            }
          };
      var req = http.request(options, function (res) {
        var chunks = [];
        var body = "";

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          body += Buffer.concat(chunks);
          //  console.log("body.toString:", body.toString());
          var result = [];
          var json = JSON.parse(body);
          // console.log("body.formattedAddress:", body.formattedAddress)
          // result = body.formattedAddress
          // result.push({
          //   latitude: json.routes[0].legs[0].start_location.lat,
          //   longitude: json.routes[0].legs[0].start_location.lng
          // });
          // // json.routes[0].legs[0].start_location
          // json.routes[0].legs[0].steps.forEach(function(step){
          //   result.push({
          //     latitude: step.end_location.lat,
          //     longitude: step.end_location.lng
          //   })
          // })
          // console.log(json.routes[0].legs[0]);
          console.log("json:", json.results);
          // console.log("formatted address:", json.formatted_address);
          cb(json.results[0].formatted_address);
        });
      });

  //  req.write("{\n    \"userId\": 1,\n    \"data\": {\n        \"routes\": \"[1,2,3]\"\n    }\n}");
    req.end();
}
module.exports = getAddress;
