function change(x){
  if(x === "TRUE"){
    return 1;
  }
  else{
    return 0;
  }
};
/*Meteor.startup(function () {
  // Run mini broker
  const child_process = Npm.require('child_process');
  const exec = child_process.exec;
  exec('export PYTHONPATH=/home/akrem/Akrem/Projects/ChanelProject;cd /home/akrem/Akrem/Projects/ChanelProject/org/swallow_labs/test; python3.5 T00.5.1-RunClientTest.py', function (error, stdout, stderr) {
    console.log("STDOUT"+stdout);
    console.log("ERROR"+error);
  });

});*/
Meteor.methods({
    'sendLoginInfo': function(login, password){
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
        url: 'ldap://10.10.10.2:389'
      });
      client.bind('cn=directory manager', 'salmenF03', function(err) {
        var opts = {
          //filter: '(uid=admin)',
          scope: 'sub',
          //attributes: ['dn', 'sn', 'cn', 'uid']
        };
        client.search('CUserEmail='+login+',ou='+entreprise+',o=Establishments,o=WebApp,dc=swallow,dc=tn', opts, function(err, res) {
          res.on('error', function(err) {
            result = 0;
            myFuture.return(result);
            console.log("Denied");
          });
          res.on('searchEntry', function(entry) {
            var jsonEntry = JSON.parse(JSON.stringify(entry.object));
            console.log('Json entry: ' + JSON.stringify(entry.object));
            console.log('Json entry login : ' + jsonEntry.CUserLogin);
            console.log('Json entry Password : ' + jsonEntry.userPassword);
            if( login === jsonEntry.CUserEmail && ssha.verify(password, jsonEntry.userPassword)){
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
      });
      console.log("result :"+myFuture.wait());
      return myFuture.wait();
    },
    'getAdminUsers': function(){
      //console.log("Get all accounts button clicked");
      var ldap = Npm.require('ldapjs');
      var ssha = Npm.require("ssha");
      Future = Npm.require('fibers/future');
      var myFuture = new Future();
      var secondFuture = new Future();

      var client = ldap.createClient({
        url: 'ldap://10.10.10.2:389'
      });

      client.bind('cn=directory manager', 'salmenF03', function(err) {
        //console.log("BINDING DONE");
        var opts = {
          //filter: '(objectclass='AppAdministrators')',
          scope: 'sub',
          attributes: ['AEmail','AFirstName','ALastName','AAdress','userPassword','APhone','ADateOfBirth','APicture','ACIN','AAssigningContent','ADashboradGA','AInvoiceGA','AContartGA','AClientGA','AScreensGA','ASegmentGA','ABookingGA','AAccountGA']
        };
        var allUsers = [];
        var id = 0;
        client.search('o=Administrators,o=WebApp,dc=swallow,dc=tn', opts, function(err, res) {
              res.on('error', function(err) {
                console.error('error: ' + err.message);
              });
              //console.log("Get all accounts button clicked");
              res.on('searchEntry', function(entry) {
                jsonEntry = JSON.parse(JSON.stringify(entry.object));
                //console.log('entry: ' + JSON.stringify(entry.object));
                if( typeof entry.object.AEmail != 'undefined'){
                  //console.log('Json entry email: ' + JSON.stringify(entry.object.AEmail));
                  id = id + 1;
                  allUsers.push({
                    'userId' : id,
                    'userEmail' : entry.object.AEmail,
                    'userPassword' : entry.object.userPassword,
                    'userLastName' : entry.object.ALastName,
                    'userFirstName' : entry.object.AFirstName,
                    'userAddress' : entry.object.AAdress,
                    'userPhone' : entry.object.APhone,
                    'userDateOfBirth' : entry.object.ADateOfBirth,
                    'userPicture' : entry.object.APicture,
                    'userCIN' : entry.object.ACIN,
                    'assigningContentMenu' : change(entry.object.AAssigningContent),
                    'dashboradMenu' : change(entry.object.ADashboradGA),
                    'invoicesMenu' : change(entry.object.AInvoiceGA),
                    'contartsMenu' : change(entry.object.AContartGA),
                    'screensMenu' : change(entry.object.AScreensGA),
                    'segmentsMenu' : change(entry.object.ASegmentGA),
                    'bookingsMenu' : change(entry.object.ABookingGA),
                    'accountsMenu' : change(entry.object.AAccountGA),
                    'clientsMenu' : change(entry.object.AClientGA)
                  });
                  //console.log('USER PUSHED in the ARRAY');
                }
              });
              res.on('end', function(result) {
                //console.log("Array length :"+ allUsers.length);
                myFuture.return(allUsers);
              });
        }); //end clent.search
      });
      //console.log("Array length :"+ myFuture.wait().length);
      return myFuture.wait();
    },
    'addUser': function(dn, userType, email, password, fname, surname, cin, dateOfBirth, phone, address, AAssigningContent, ADashboradGA, AInvoiceGA, AContartGA, AClientGA, AScreensGA, ASegmentGA, ABookingGA, AAccountGA){
      const child_process = Npm.require('child_process');
      const exec = child_process.exec;
      Future = Npm.require('fibers/future');
      var myFuture = new Future();
      // We passed by a problem when we sent a string(for exemple address) "Rue de tunis km4.5"
      // the object received by the script pushCapsuleLDAP contains just "Rue" it ignore the rest of the string sented even there is other data after the address
      var payload = "add*"+dn+"*"+userType+"*"+AAssigningContent+"*"+ADashboradGA+"*"+AInvoiceGA+"*"+AContartGA+"*"+AClientGA+"*"+AScreensGA+"*"+ASegmentGA+"*"+ABookingGA+"*"+AAccountGA+"*"+email+"*"+password+"*"+fname.split(' ').join('-')+"*"+surname.split(' ').join('-')+"*"+cin+"*"+dateOfBirth+"*"+phone+"*"+address.split(' ').join('-');
      exec('python3.5 /home/akrem/Akrem/Projects/ChanelProjectMeteor/org/swallow_labs/test/pushCapsuleLDAP.py '+payload+' ', function (error, stdout, stderr) {
          //console.log("STDOUT"+stdout);
          //console.log("ERROR"+error);
          if(error){
            myFuture.return(0);
          }else{
            myFuture.return(1);
          }
      });
      return myFuture.wait();
    },
    'sendCapsuleLDAP': function(dn){
      const child_process = Npm.require('child_process');
      const exec = child_process.exec;
      Future = Npm.require('fibers/future');
      var myFuture = new Future();
      exec('python3.5 /home/akrem/Akrem/Projects/ChanelProjectMeteor/org/swallow_labs/test/pushCapsuleLDAP.py '+dn+' ', function (error, stdout, stderr) {
          //console.log("STDOUT"+stdout);
          //console.log("ERROR"+error);
          if(error){
            myFuture.return(0);
          }else{
            myFuture.return(1);
          }
      });
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
