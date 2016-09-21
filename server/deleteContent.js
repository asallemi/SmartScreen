Meteor.methods({
    'deleteFile': function(fileName) {

      var fs = Npm.require('fs');
      fs.unlink('/home/akrem/Akrem/Projects/Web application/SmartScreen/public/uploads/'+fileName, (err) => {
        if (err) {
          return 0;
        }
        return 1;
        
      });
    }
});
