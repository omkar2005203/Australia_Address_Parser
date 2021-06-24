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
                
                res.writeHead(200,{"Content-Type":"text/html"});
                var html="<html>";
                html+="<head>";
                html+='<style>.container {width: 500px; clear: both;}.container input {width: 100%;clear: both;}</style>';
                html+="<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x' crossorigin='anonymous'><title>MMC-Mercer</title>";
                html+="<script>function myFunction() {document.getElementById('Result').reset();}</script>"
                
                html+="</head>";
                html+="<body>";
                html+="Parsed Data is as Follows <br>";
                html+="<div class='container'>";
                html+="<form id='Result'>"
                html+="<lable style='margin:15px;'>suburb :</lable> ";
                html+='<input type="text" value='+dataNew.suburb+" "+'/><br/>';
                html+="<lable style='margin:15px;'>state :</lable> ";
                html+='<input type="text" value='+dataNew.state+" "+'/><br/>';
                html+="<lable style='margin:15px;'>Property Name :</lable> ";
                html+='<input type="text" value='+dataNew.propertyName+" "+'/><br/>';
                html+="<lable style='margin:15px;'>Street :</lable> ";
                html+='<input type="text" value='+dataNew.street+" "+'/><br/>';
                html+="<lable style='margin:15px;'>Street 1 :</lable> ";
                html+='<input type="text" value='+dataNew.street1+" "+'/><br/>';
                html+="<lable style='margin:15px;'>Street 2 :</lable> ";
                html+='<input type="text" value='+dataNew.street2+" "+'/><br/>';
                html+="<lable style='margin:15px;'>Unit Type :</lable> ";
                html+='<input type="text" value='+dataNew.unitType+" "+'/><br/>';
                html+="<lable style='margin:15px;'>Unit Number :</lable> ";
                html+='<input type="text" value='+dataNew.unitNumber+" "+'/><br/>';
                html+="<lable style='margin:15px;'>Street Number :</lable> ";
                html+='<input type="text" value='+dataNew.streetNumber+" "+'/><br/>';
                html+="<lable style='margin:15px;'>Street Name :</lable> ";
                html+='<input type="text" value='+dataNew.streetName+" "+'/><br/>';
                html+="<lable style='margin:15px;'>Street Type :</lable> ";
                html+='<input type="text" value='+dataNew.streetType+" "+'/><br/>';
                html+="<lable style='margin:15px;'>Post Code :</lable> ";
                html+='<input type="text" value='+dataNew.postcode+" "+'/><br/>';
        
                html+="</form>";
                html+="<div>";
                html+="</body>";
                html+="</html>";
                res.write(html);            
            
            // var formdata=queryString.parse(data);
            // var dataNew = parser.parseLocation(formdata.address);
            // console.log(dataNew);
            //res.write("suburb : "+dataNew.suburb+'\n');
            // res.write("\n");
            // res.write("state : "+dataNew.state+'\n');
            // res.write("\n");
            // res.write("propertyName : "+dataNew.propertyName+'\n');
            // res.write("\n");
            // res.write("street : "+dataNew.street+'\n');
            // res.write("\n");
            // res.write("street1 : "+dataNew.street1+'\n');
            // res.write("\n");
            // res.write("street2 : "+dataNew.street2+'\n');

            // //combine address
            // res.write("\n");
            // res.write("unitType: : "+dataNew.unitType+'\n');
            // res.write("\n");
            // res.write("unitNumber : "+dataNew.unitNumber+'\n');
            // res.write("\n");
            // res.write("streetNumber : "+dataNew.streetNumber+'\n');
            // res.write("\n");
            // res.write("streetName : "+dataNew.streetName+'\n');
            // res.write("\n");
            // res.write("streetType : "+dataNew.streetType+'\n');
            // res.write("\n");
            

         
            // res.write("Post Code : "+dataNew.postcode+'\n');
        
   
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
