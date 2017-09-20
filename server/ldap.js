// Read from configuration file
var fs = Npm.require('fs');
var obj;
Future = Npm.require('fibers/future');
var myFuture = new Future();
fs.readFile('/home/akrem/Akrem/Projects/SmartScreen/server/configuration.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  myFuture.return(obj);
});
var json = myFuture.wait();


function change(x){
  if(x == "TRUE"){
    return 1;
  }
  return 0;
}
Meteor.methods({
    'sendLoginInfo': function(login, password, codeCompany, code){
      var name   = login.substring(0, login.lastIndexOf("@"));
      var domain = login.substring(login.lastIndexOf("@") +1);
      var entreprise = domain.substring(0, domain.lastIndexOf("."));
      console.log("LOGIN :"+login);
      console.log("NAME :"+name);
      console.log("PASSWORD :"+password);
      console.log("ENTREPRISE :"+entreprise);
      //console.log("RANDOM"+Math.random().toString(36).substring(7));
      var ldap = Npm.require('ldapjs');
      var ssha = Npm.require("ssha");
      Future = Npm.require('fibers/future');
      var myFuture = new Future();
      var result = 0 ;
      var client = ldap.createClient({
        url: 'ldap://'+json.ldap.address+':'+json.ldap.port
      });
      client.bind('cn=directory manager', 'salmenF03', function(err) {
        var opts = {
          //filter: '(uid=admin)',
          scope: 'sub',
          //attributes: ['dn', 'sn', 'cn', 'uid']
        };
        //  Company case
        if(entreprise.indexOf("company") > -1 ){
          console.log("Company case");
          client.search('AEmail='+login+',o=Admin,'+'CpCode='+codeCompany+',o=Company,o=WebApp,dc=swallow,dc=tn', opts, function(err, res) {
            res.on('error', function(err) {
              result = 0;
              myFuture.return(result);
              console.log("Denied ***");
            });
            res.on('searchEntry', function(entry) {
              var jsonEntry = JSON.parse(JSON.stringify(entry.object));
              console.log('Json entry: ' + JSON.stringify(entry.object));
              console.log('Json entry login : ' + jsonEntry.AEmail);
              console.log('Json entry Password : ' + jsonEntry.pwd);
              var pwd = CryptoJS.AES.decrypt(jsonEntry.pwd, 'SmartScreen').toString(CryptoJS.enc.Utf8);
              console.log("Compared password :", pwd);
              if( login == jsonEntry.AEmail && pwd == password ){
                console.log("Success");
                result = 1;
                myFuture.return(result);
              }else{
                result = 0;
                myFuture.return(result);
                console.log("Denied");
              }
            });
          });
        }
        // Swallow Labs Administrator
        if(entreprise == "administration"){
          console.log("Admin case");
          client.search('AEmail='+login+',o=Administrators,o=WebApp,dc=swallow,dc=tn', opts, function(err, res) {
            res.on('error', function(err) {
              result = 0;
              myFuture.return(result);
              console.log("Denied ***");
            });
            res.on('searchEntry', function(entry) {
              var jsonEntry = JSON.parse(JSON.stringify(entry.object));
              console.log('Json entry: ' + JSON.stringify(entry.object));
              console.log('Json entry login : ' + jsonEntry.AEmail);
              console.log('Json entry Password : ' + jsonEntry.pwd);
              var pwd = CryptoJS.AES.decrypt(jsonEntry.pwd, 'SmartScreen').toString(CryptoJS.enc.Utf8);
              console.log("Compared password :", pwd);
              if( login == jsonEntry.AEmail && pwd == password ){
                console.log("Success");
                result = 1;
                myFuture.return(result);
              }else{
                result = 0;
                myFuture.return(result);
                console.log("Denied");
              }
            });
          });
        }
        // Client of company case
        if(entreprise != "administration" && entreprise.indexOf("company") < 0 ){
          console.log("Client of company case");
          if(code != null){
            console.log("Code != null");
            client.search('AEmail='+login+',ECode='+code+',o=Establishment,CpCode='+codeCompany+',o=Company,o=WebApp,dc=swallow,dc=tn', opts, function(err, res) {
              res.on('error', function(err) {
                result = 0;
                myFuture.return(result);
                console.log("Denied");
              });
              res.on('searchEntry', function(entry) {
                var jsonEntry = JSON.parse(JSON.stringify(entry.object));
                console.log('Json entry: ' + JSON.stringify(entry.object));
                console.log('Json entry email : ' + jsonEntry.AEmail);
                console.log('Json entry Password : ' + jsonEntry.pwd);
                var pwd = CryptoJS.AES.decrypt(jsonEntry.pwd, 'SmartScreen').toString(CryptoJS.enc.Utf8);
                console.log("Compared password :", pwd);
                if( login == jsonEntry.AEmail && pwd == password ){
                  console.log("Success");
                  result = 1;
                  myFuture.return(result);
                }else{
                  result = 0;
                  myFuture.return(result);
                  console.log("Denied");
                }
              });
            });
          }else {
            myFuture.return(0);
          }
        }
      });
      console.log("result :"+myFuture.wait());
      return myFuture.wait();
    },
    'getScreenGeolocation': function(){
      const child_process = Npm.require('child_process');
      const exec = child_process.exec;

      Future = Npm.require('fibers/future');
      var myFuture = new Future();

      console.log("I am server");
      var jsonArray =[];
      exec('python3.5 /home/akrem/Akrem/Projects/ChanelProjectMeteor/org/swallow_labs/test/T001.3.3-TestClient2Pull.py', function (error, stdout, stderr) {
          console.log("STDOUT"+stdout);
          console.log("ERROR"+error);
          jsonArray = JSON.parse(stdout);
          if(error){
            myFuture.throw(error);
          }else{
            myFuture.return(jsonArray);
          }
      });
      var array = myFuture.wait();
      if(array.length >1){
        for(i=0 ; i< array.length; i++){
          console.log("JSONARRAY[i]"+ array[i].type);
          var screen = {
              '_id': array[i].id_sender.toString(),
              'screenLatitude': array[i].payload.latitude,
              'screenLongitude': array[i].payload.longitude,
              'screenDimension': '150x100',
              'screenDescription': 'Screen added by broker',
              'screenAddedAt': new Date(),
              'screenStatus': 1,
              'screenAddress':'Allahou a3lam'
          };
          if(array[i].type === 'GPS_MESSAGE'){
            Screens.insert(screen);
          }

        }
      }else{
        var screen = {
          '_id': array[i].id_sender,
          'screenLatitude': array[0].payload.latitude,
          'screenLongitude': array[0].payload.longitude,
          'screenDimension': '150x100',
          'screenDescription': 'Screen added by broker',
          'screenAddedAt': new Date(),
          'screenStatus': 1,
          'screenAddress':'Allahou a3lam'
        };
        Screens.insert(array);
      }
    },
});
