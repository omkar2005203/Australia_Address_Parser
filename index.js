var parser = require('./node_modules/australia-address-parser/parser'); 

var http=require('http');
var fs=require('fs');
var url=require('url');
var queryString=require('querystring');
var ServerPort=8000

try{
var server=http.createServer(function(req,res){

    if(req.url==="/form"){
        res.writeHead(200,{"Content-Type":"text/html"});
        fs.createReadStream("./veiws/form.html","UTF-8").pipe(res);

    }
    if(req.method==="GET"){
        console.log("In Get Method");
        var q=url.parse(req.url,true).query;
        console.log(q);

    }
    else if(req.method==='POST'){
        var data="";
        req.on("data",function(chunk){
            data+=chunk;
     });
     
        req.on("end",function(chunk){
            try{
            var formdata=queryString.parse(data);
            var dataNew = parser.parseLocation(formdata.address);
            console.log(dataNew);
            res.write("suburb : "+dataNew.suburb+'\n');
            res.write("\n");
            res.write("state : "+dataNew.state+'\n');
            res.write("\n");
            res.write("propertyName : "+dataNew.propertyName+'\n');
            res.write("\n");
            res.write("street : "+dataNew.street+'\n');
            res.write("\n");
            res.write("street1 : "+dataNew.street1+'\n');
            res.write("\n");
            res.write("street2 : "+dataNew.street2+'\n');

            //combine address
            res.write("\n");
            res.write("unitType: : "+dataNew.unitType+'\n');
            res.write("\n");
            res.write("unitNumber : "+dataNew.unitNumber+'\n');
            res.write("\n");
            res.write("streetNumber : "+dataNew.streetNumber+'\n');
            res.write("\n");
            res.write("streetName : "+dataNew.streetName+'\n');
            res.write("\n");
            res.write("streetType : "+dataNew.streetType+'\n');
            res.write("\n");
            

         
            res.write("Post Code : "+dataNew.postcode+'\n');
        
   
            res.end();
            }catch(c){
                return new Error("Please Check address ! Not in proper format!");

            }

        });


    }

    
});

server.listen(ServerPort,()=>{
    console.log('Sever is runnnig at port: '+ServerPort);
});

}catch(e){
    return new Error("Error !");
}
