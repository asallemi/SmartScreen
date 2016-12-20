Bookings_Live.allow({
  insert: function (doc) {
    return true;
  }
});
Bookings_Authorization.allow({
  insert: function (doc) {
    return true;
  }
});
Bookings_History.allow({
  insert: function (doc) {
    return true;
  }
});
Roles_Live.allow({
  insert: function (doc) {
    return true;
  },
  remove: function (doc) {
    return true;
  }
});
Roles_Authorization.allow({
  insert: function (doc) {
    return true;
  },
  update: function (doc) {
    return true;
  },
  remove: function (doc) {
    return true;
  }
});
Roles_History.allow({
  insert: function (doc) {
    return true;
  }
});
Contents_Live.allow({
  remove: function (doc) {
    return true;
  }
});
Contents_Authorization.allow({
  remove: function (doc) {
    return true;
  }
});
Contents_History.allow({
  remove: function (doc) {
    return true;
  }
});
Segments_Live.allow({
  update: function (doc) {
    return true;
  }
});
Segments_Authorization.allow({
  update: function (doc) {
    return true;
  }
});
Segments_History.allow({
  update: function (doc) {
    return true;
  }
});
if (Meteor.isServer) {

  Meteor.publish('screens', function(){
        return Screens_Live.find({});
  });
  Meteor.publish('segments', function(){
        return Segments_Live.find({});
  });
  Meteor.publish('bookings', function(){
        return Bookings_Live.find({});
  });
  Meteor.publish('contents', function(){
        return Contents_Live.find({});
  });
  Meteor.publish('roles', function(){
        return Roles_Live.find({});
  });
  Meteor.publish('roles_authorization', function(){
        return Roles_Authorization.find({});
  });
  Meteor.publish('matrix', function(){
        return Matrix.find({});
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
          Contents_Live.insert(content);
      }
    });

  });
}
