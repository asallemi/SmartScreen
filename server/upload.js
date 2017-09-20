Meteor.methods({
    'newContent': function(url, code, codeCompany, inputter){
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
          // format the date
          var date = new Date();
          date.setHours(date.getHours()+1);
          date = date.toISOString().slice(0,19).replace("T"," ");
          // For exapmle the file.name = POL5002411#pub_samsung_drole.mp4, we need just the real name "pub_samsung_drole.mp4"= contentName
          var name = file.name.split("#");
          var contentName = name[1];
          var content =
            {
              'contentName': contentName,
              'contentSize': file.size,
              'contentType': file.type,
              'contentDuration': duration,
              'currentNumber': 1,
              'status': 'HLD',
              'inputter': inputter,
              'authorizer': null,
              'dateTime': date,
              'code': code,
              'codeCompany': codeCompany
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
    'moveContent': function(fileName, code, codeCompany) {
      const child_process = Npm.require('child_process');
      const exec = child_process.exec;
      var cmd = 'mv -f /home/akrem/sshfs/tmp/'+code+'#'+fileName+' /home/akrem/sshfs/display/'+codeCompany+'/'+code+'/'+fileName;
      exec(cmd, {shell: '/bin/bash'},function (error, stdout, stderr) {
        //console.log("STDOUT"+stdout);
        console.log("ERROR"+error);
      });
      return 1;
    },
    'createCompanyDirectory': function(codeCompany) {
      const child_process = Npm.require('child_process');
      const exec = child_process.exec;
      var cmd = 'mkdir /home/akrem/sshfs/display/'+codeCompany;
      exec(cmd, {shell: '/bin/bash'},function (error, stdout, stderr) {
        //console.log("STDOUT"+stdout);
        console.log("ERROR"+error);
      });
    },
    'createClientDirectory': function(codeClient, codeCompany) {
      const child_process = Npm.require('child_process');
      const exec = child_process.exec;
      var cmd = 'mkdir /home/akrem/sshfs/display/'+codeCompany+'/'+codeClient;
      exec(cmd, {shell: '/bin/bash'},function (error, stdout, stderr) {
        //console.log("STDOUT"+stdout);
        console.log("ERROR"+error);
      });
    },
    'newPackage': function(url, inputter, codeCompany){
      // Dropzone uploading
      var getDuration = Npm.require('get-video-duration');
      // Future help us to return the result of newPackage function (0 or 1) 1 = positif & 0 = nagative
      Future = Npm.require('fibers/future');
      var future = new Future();
      const child_process = Npm.require('child_process');
      const exec = child_process.exec;
      UploadServer.init({
        tmpDir: '/home/akrem/packages',
        uploadDir: '/home/akrem/packages/',
        checkCreateDirectories: true,
        uploadUrl: url,
        finished: function(file, formData){
          console.log("File name : "+file.name);
          //var realName = file.name.replace(".noarch.rpm", "");
          //console.log("File saved with name ", realName);
          var firmwareLive = Firmwares_Live.findOne({ "codeCompany": codeCompany, "name": file.name });
          var firmwareAuth = Firmwares_Authorization.findOne({ "codeCompany": codeCompany, "name": file.name });
          if (firmwareLive != undefined || firmwareAuth != undefined || file.name.indexOf(" ") > 0) {
            future.return(0);
          }else {
            // format the date
            var date = new Date();
            date.setHours(date.getHours()+1);
            date = date.toISOString().slice(0,19).replace("T"," ");
            var firmware =
              {
                'name' : file.name,
                'description' : "",
                'screensID': "",
                'currentNumber': 0,
                'status': 'HLD',
                'inputter': inputter,
                'authorizer': null,
                'dateTime': date,
                'codeCompany': codeCompany
              };
            Firmwares_Authorization.insert(firmware);
            future.return(1);
          }
        }
      });
      return future.wait();
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
    'deletePackage': function(fileName) {
      const child_process = Npm.require('child_process');
      const exec = child_process.exec;
      var cmd = "rm -r /home/akrem/packages/"+fileName;
      // We installed "apt-get install createrepo"
      exec(cmd , function (error, stdout, stderr) {
        //console.log("STDOUT"+stdout);
        console.log("ERROR"+error);
      });
    },
    // This function remove all packages uploded by the users which contain un space ( the app don't allow uploading packges with space)
    'cleanPackages': function() {
      const child_process = Npm.require('child_process');
      const exec = child_process.exec;
      var cmd = "cd /home/akrem/packages;find . -regex '.* .*' -delete";
      exec(cmd , function (error, stdout, stderr) {
        //console.log("STDOUT"+stdout);
        //console.log("ERROR"+error);
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
