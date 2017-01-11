if (Meteor.isServer) {
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
