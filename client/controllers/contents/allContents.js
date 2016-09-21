// Connection to collections
Contents = new Mongo.Collection('contents');
// Create handlers and subscribers
let handle = Meteor.subscribe('contents');

Template.allContents.rendered = function(){

    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
    $(uploadFile).click(function(){
      $('#upload').modal();
    });
};
Template.allContents.events({
  'click .btn-delete'() {
    Contents.remove(this._id);
    Meteor.call('deleteFile', this.contentName, function(error, result){
      if(result === 1){
        swal("Operation success!", "Your file deleted !", "success");
      }
    });
  },
});
Template.allContents.helpers({
  contents() {
    return Contents.find({});
  },
});
