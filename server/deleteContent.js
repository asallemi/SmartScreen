Meteor.methods({
    'deleteFile': function(fileName) {

      var fs = Npm.require('fs');
      fs.unlink('/home/akrem/Akrem/Projects/Web application/SmartScreen/public/uploads/'+fileName, (err) => {
        if (err) throw err;
        console.log('successfully file deleted');
      });
      return 1;
    }
});
