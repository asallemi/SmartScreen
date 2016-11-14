Screens = new Mongo.Collection('screens');
Clients = new Mongo.Collection('clients');
Segments = new Mongo.Collection('segments');
Bookings = new Mongo.Collection('bookings');
Contents = new Mongo.Collection('contents');

Bookings.allow({
  insert: function (userId, doc) {
    return true;
  }
});
Contents.allow({
  remove: function (doc) {
    return true;
  }
});
Segments.allow({
  update: function (userId, doc) {
    return true;
  }
});
if (Meteor.isServer) {

  Meteor.publish('screens', function(){
        return Screens.find({});
  });
  Meteor.publish('segments', function(){
        return Segments.find({});
  });
  Meteor.publish('bookings', function(){
        return Bookings.find({});
  });
  Meteor.publish('contents', function(){
        return Contents.find({});
  });
  Meteor.startup(function () {
    // Sending mail in OTP authentication
    var fs = Npm.require('fs');
    var obj;
    Future = Npm.require('fibers/future');
    var myFuture = new Future();
    fs.readFile('/home/akrem/Akrem/Projects/Web application/SmartScreen/server/configuration.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      myFuture.return(obj);
    });
    var otp_conf = myFuture.wait();
    Meteor.methods({
      sendEmailContent: function () {
        console.log("Email content :"+ otp_conf.otp_conf.username);
        return otp_conf;
      }
    });
    process.env.MAIL_URL = 'smtp://'+otp_conf.otp_conf.username+':'+otp_conf.otp_conf.password+'@'+otp_conf.otp_conf.server+':'+otp_conf.otp_conf.port+'/';
    // Dropzone uploading
    var getDuration = Npm.require('get-video-duration');
    var future = new Future();
    UploadServer.init({
      tmpDir: process.env.PWD + '/public/uploads',
      uploadDir: process.env.PWD + '/public/uploads',
      checkCreateDirectories: true,
      uploadUrl: '/upload',
      finished: function(file, formData){
        console.log("File name : "+file.name);
        console.log("File size : "+file.size);
        console.log("File type : "+file.type);
        console.log("File extension : "+file.name.substring(file.name.lastIndexOf(".") +1));
        if( file.name.substring(file.name.lastIndexOf(".") +1) === 'mp4'){
          getDuration('/home/akrem/Akrem/Projects/Web application/SmartScreen/public/uploads/'+file.name).then(function (duration) {
            console.log("Duration    :"+duration);
              future.return(duration);
          });
          var duration = future.wait();
        }else{
          var duration = '-';
        }
        var content =
          {
            'contentName': file.name,
            'contentSize': file.size,
            'contentType': file.type,
            'contentDuration': duration,
            'contentClientID': '10010',
            'uploadedDate': new Date()
          };
          Contents.insert(content);
      }
    });
    if (Screens.find().count() === 0) {
      var screen =
      {
          'screenLatitude': 49.0388900,
          'screenLongitude': 2.0770400,
          'screenDimension': '150x100',
          'screenDescription': 'second screen of smart screen solution',
          'screenAddedAt': new Date(),
          'screenStatus': 1,
          'screenAddress':'xxx'
      };
      Screens.insert(screen);
    }
    if (Clients.find().count() === 0) {
        var client =
          {
            'clientShortName': 'ARTI',
            'clientName': 'ARTI',
            'clientCode': 123456,
            'clientDescription': 'Azzzzzzzzzzerttttttttttty',
            'clientSector': 'Alimentation',
            'clientBalance': 2000,
            'clientType':'Corporate'
          };
        Clients.insert(client);
    }
    if (Segments.find().count() === 0) {
        var segment =
          {
            'segmentDate': '30/07/2016',
            'segmentStartTime': '9:30',
            'segmentEndTime': '9:40',
            'segmentDescription': 'Nothing to add',
            'segmentAvailability': 1,
            'segmentFile': '/home/akrem/pic.png',
            'segmentScreenID':'uWhymNmycA8pqSENR'
          };
        Segments.insert(segment);
    }

    if (Bookings.find().count() === 0) {
        var booking1 =
          {
            'segmentID': '1001',
            'screenID': '1005',
            'bookingStatus': 0,
            'contentID' : 'GQYyHzRhE949M9j7F',
            'clientID' : '10010',
            'contentPath' : '/home/device/'
        };
        var booking2 =
            {
              'segmentID': '1002',
              'screenID': '1005',
              'bookingStatus': 1,
              'contentID' : 'gjEcDZAmovhujZiSF',
              'clientID' : '10010',
              'contentPath' : '/home/device/'
        };
        var booking3 =
          {
            'segmentID': '1003',
            'screenID': '1003',
            'bookingStatus': 0,
            'contentID' : 'GQYyHzRhE949M9j7F',
            'clientID' : '10010',
            'contentPath' : '/home/device/'
        };
        var booking4 =
          {
            'segmentID': '1004',
            'screenID': '1004',
            'bookingStatus': 0,
            'contentID' : 'GQYyHzRhE949M9j7F',
            'clientID' : '10010',
            'contentPath' : '/home/device/'
        };
        var booking5 =
          {
            'segmentID': '1005',
            'screenID': '1004',
            'bookingStatus': 0,
            'contentID' : 'GQYyHzRhE949M9j7F',
            'clientID' : '10010',
            'contentPath' : '/home/device/'
        };
        var booking6 =
          {
            'segmentID': '1006',
            'screenID': '1009',
            'bookingStatus': 0,
            'contentID' : 'GQYyHzRhE949M9j7F',
            'clientID' : '10010',
            'contentPath' : '/home/device/'
        };
        var booking7 =
          {
            'segmentID': '1007',
            'screenID': '1005',
            'bookingStatus': 0,
            'contentID' : 'GQYyHzRhE949M9j7F',
            'clientID' : '10010',
            'contentPath' : '/home/device/'
        };
        Bookings.insert(booking1);
        Bookings.insert(booking2);
        Bookings.insert(booking3);
        Bookings.insert(booking4);
        Bookings.insert(booking5);
        Bookings.insert(booking6);
        Bookings.insert(booking7);
    }
    if (Contents.find().count() === 0) {
        var content =
          {
            'contentName': 'test',
            'contentSize': 'test',
            'contentType': 'test',
            'contentDuration': 'test',
            'contentClientID': '10010',
            'uploadedDate': new Date(),
          };
        Contents.insert(content);
    }
  });
  //*************************************************************************************************************
  /*const child_process = Npm.require('child_process');
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
  }*/

}
