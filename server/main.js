if (Meteor.isServer) {
  Meteor.startup(function () {
    // Mount FTP server
    /*const child_process = Npm.require('child_process');
    const exec = child_process.exec;
    exec('sshfs device@10.10.10.2:/home/device /home/akrem/sshfs/ -o IdentityFile=/home/akrem/Akrem/Projects/SmartScreen/public/id_rsa', function (error, stdout, stderr) {
      //console.log("STDOUT"+stdout);
      console.log("ERROR"+error);
    });*/

    // Sending mail in OTP authentication
    var fs = Npm.require('fs');
    var obj;
    Future = Npm.require('fibers/future');
    var myFuture = new Future();
    fs.readFile('/home/akrem/Akrem/Projects/SmartScreen/server/configuration.json', 'utf8', function (err, data) {
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
  });
}
