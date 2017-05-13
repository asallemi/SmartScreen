Meteor.methods({
    'newContent': function(url, code, inputter){
    // Dropzone uploading
      Future = Npm.require('fibers/future');
      var getDuration = Npm.require('get-video-duration');
      var future = new Future();
      UploadServer.init({
        tmpDir: '/home/akrem/sshfs/tmp',
        uploadDir: '/home/akrem/sshfs/tmp',
        checkCreateDirectories: true,
        uploadUrl: url,
        getFileName: function (fileInfo, formData) {
          return code + '#' + fileInfo.name;
        },
        finished: function(file, formData){
          console.log("File name : "+file.name);
          console.log("File size : "+file.size);
          console.log("File type : "+file.type);
          console.log("File extension : "+file.name.substring(file.name.lastIndexOf(".") +1));
          if( file.name.substring(file.name.lastIndexOf(".") +1) == 'mp4'){
            getDuration('/home/akrem/sshfs/tmp/'+file.name).then(function (duration) {
              console.log("Duration    :"+duration);
              future.return(duration);
            });
            var duration = future.wait();
          }else{
            var duration = '-';
          }
          var name = file.name.split("#");
          var contentName = name[1];
          var content =
            {
              'contentName': contentName,
              'contentSize': file.size,
              'contentType': file.type,
              'contentDuration': duration,
              'uploadedDate': new Date(),
              'currentNumber': 1,
              'status': 'HLD',
              'inputter': inputter,
              'authorizer': null,
              'dateTime': new Date(),
              'code': code
            };
            Contents_Authorization.insert(content);
            console.log("Content added !");
        }
      });
      return 1;
    },
    // fileName = code#fileName
    'deleteFile': function(code, fileName) {
      var fs = Npm.require('fs');
      fs.unlink('/home/akrem/sshfs/display/'+code+'/'+fileName, (err) => {
        if (err) throw err;
        console.log('successfully file deleted from /home/akrem/sshfs/display/'+code);
      });
      return 1;
    },
    'deleteFileTmp': function(fileName) {
      var fs = Npm.require('fs');
      fs.unlink('/home/akrem/sshfs/tmp/'+fileName, (err) => {
        if (err) throw err;
        console.log('successfully file deleted from /home/akrem/sshfs/tmp/');
      });
      return 1;
    },
    'moveContent': function(fileName, code) {
      const child_process = Npm.require('child_process');
      const exec = child_process.exec;
      var cmd = 'mv -f /home/akrem/sshfs/tmp/'+code+'#'+fileName+' /home/akrem/sshfs/display/'+code+'/'+fileName;
      exec(cmd, {shell: '/bin/bash'},function (error, stdout, stderr) {
        //console.log("STDOUT"+stdout);
        console.log("ERROR"+error);
      });
      return 1;
    },
    'createClientDirectory': function(code) {
      const child_process = Npm.require('child_process');
      const exec = child_process.exec;
      var cmd = 'mkdir /home/akrem/sshfs/display/'+code;
      exec(cmd, {shell: '/bin/bash'},function (error, stdout, stderr) {
        //console.log("STDOUT"+stdout);
        console.log("ERROR"+error);
      });
    },
    'newPackage': function(url, id){
    // Dropzone uploading
      Future = Npm.require('fibers/future');
      var getDuration = Npm.require('get-video-duration');
      var future = new Future();
      UploadServer.init({
        tmpDir: '/home/akrem/packages',
        uploadDir: '/home/akrem/packages/',
        checkCreateDirectories: true,
        uploadUrl: url,
        finished: function(file, formData){
          console.log("File name : "+file.name);
          var realName = file.name.replace(".noarch.rpm", "");
          console.log("File saved with name ", realName);
          var d = new Date().toString();
          var res = d.split(" ");
          var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
          var firmware =
            {
              'name' : realName,
              'description' : "",
              'screensID': "",
              'currentNumber': 0,
              'status': 'HLD',
              'inputter': id,
              'authorizer': null,
              'dateTime': dat.toString()
            };
          Firmwares_Authorization.insert(firmware);
        }
      });
    },
    'createRepo': function(fileName) {
      const child_process = Npm.require('child_process');
      const exec = child_process.exec;
      var cmd = "chmod 777 /home/akrem/packages/"+fileName+"; createrepo --update /home/akrem/packages"
      // We installed "apt-get install createrepo"
      exec(cmd , function (error, stdout, stderr) {
        //console.log("STDOUT"+stdout);
        console.log("ERROR"+error);
      });
    },
    // A function which the responsable of synchronization of contents between Web Server and FTP server. This function executed when the user authorize the content.
    // Certificate should be with 500 permession(chmod)
    'synchronizeContents': function(){
      /*const child_process = Npm.require('child_process');
      const exec = child_process.exec;
      exec('rsync -rave "ssh -i /home/akrem/Akrem/Projects/SmartScreen/public/id_rsa" /home/akrem/Akrem/Projects/SmartScreen/public/uploads/ device@10.10.10.2:/home/device/contenus', function (error, stdout, stderr) {
        console.log("ERROR"+error);
      });
      var rsync = Npm.require("rsyncwrapper");
      rsync({
          src: "/home/akrem/Akrem/Projects/SmartScreen/public/uploads/",
          dest: "device@10.10.10.2:/home/device/display",
          ssh: true,
          privateKey: "/home/akrem/Akrem/Projects/SmartScreen/public/id_rsa",
          recursive: true,
          deleteAll: true // Careful, this could cause data loss
      },function (error,stdout,stderr,cmd) {
          if ( error ) {
              console.log(error.message);
          } else {
              console.log("Synchronization done!");
          }
      });*/
    },
  });
