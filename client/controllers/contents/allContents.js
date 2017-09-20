// Create handlers and subscribers
//let contentsAuthorization = Meteor.subscribe('contentsAuthorization');
//let contentsLive = Meteor.subscribe('contentsLive');
function authorize(content){
  if(content._id.indexOf("#") > 0){
    content._id = content._id.replace("#D", "");
  }
  var contentX = Contents_Live.findOne({ "_id" : content._id });
  // entry validated and new entry
  if(contentX != undefined && content.status == "INAU"){
    content.status = "LIVE";
    content.authorizer = Session.get("UserLogged")._id;
    content.dateTime = getDateNow();
    contentX.status = 'HIS';
    contentX.dateTime = getDateNow();
    contentX.currentNumber = content.currentNumber;
    contentX._id = content._id+"#"+(content.currentNumber-1);
    Contents_History.insert(contentX);
    Contents_Live.remove(content._id);
    Contents_Live.insert(content);
    Contents_Authorization.remove(content._id);
  // Authorise deleting content
  }else if(contentX != undefined && content.status == "RNAU"){
    content.authorizer = Session.get("UserLogged")._id;
    content.status = 'DEL';
    content.dateTime = getDateNow();
    Contents_History.insert(content);
    Contents_Live.remove(contentX._id);
    Contents_Authorization.remove(content._id);
    Contents_Authorization.remove(content._id+"#D");
    Meteor.call('deleteFile', Session.get("UserLogged").code, content.contentName, function(error, result){
      if(result == 1){
        toastrContentDeleted();
      }
    });
  }else{
    content.status = "LIVE";
    content.authorizer = Session.get("UserLogged")._id;
    content.dateTime = getDateNow();
    Contents_Live.insert(content);
    Contents_Authorization.remove(content._id);
    Meteor.call('moveContent', content.contentName, content.code, content.codeCompany, function(error, result){
      if(result == 1){
        toastrContentAuthorized();
      }
    });
  }
}
function verifyDelete(id){
  var content = Contents_Authorization.findOne({ "_id" : id+"#D" });
  return content == undefined;
}
// A function which test if the content wanted deleting is assigned to any reservation
function checkContent(id){
  var b1 = Bookings_Authorization.findOne({ 'video' : id });
  var b2 = Bookings_Authorization.findOne({ 'image' : id });
  var b3 = Bookings_Live.findOne({ 'video' : id });
  var b4 = Bookings_Live.findOne({ 'image' : id });
  if(b1 != undefined || b2 != undefined || b3 != undefined || b4 != undefined){
    return false; // content not assigned in any reservation
  }
  return true;
}
Template.allContents.onCreated(function() {
    Session.set("URL", "/home/akrem/sshfs/tmp/");
    var self = this;
    self.autorun(function() {
      self.subscribe('contentsLive');
      self.subscribe('contentsAuthorization');
    });
});
Template.allContents.rendered = function(){
    checkSession();
    settingLanguage();
    console.log(Session.get("UserLogged").language);
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
};
Template.allContents.events({
  'click .newContent'() {
    $('#upload').modal();
    Meteor.call('newContent', Session.get("URL"), Session.get("UserLogged").code, Session.get("UserLogged").codeCompany, Session.get("UserLogged")._id);

  },
  'click .authorizeAu'() {
    var newContent = Contents_Authorization.findOne({ "_id" : this._id });
    $('#checkAuthorising').modal();
    Session.set("ContentAuthorized",newContent);
  },
  'click .BtnAuthorize'() {
    authorize(Session.get("ContentAuthorized"));
  },
  'click .validateAu'() {
    var content = Contents_Authorization.findOne({ "_id" : this._id });
    if (userAuthorized(content.inputter)) {
      Contents_Authorization.update({'_id' : content._id }, {'$set':{ 'status' : 'INAU', 'inputter' : Session.get("UserLogged")._id , 'dateTime' : getDateNow() }});
    }else {
      toastrWarningAccessDenied();
    }
  },
  'click .cancelAu'() {
    if (userAuthorized(content.inputter)) {
      if(this._id.indexOf("#D") > 0){
        Contents_Authorization.remove(this._id);
      }else {
        Contents_Authorization.remove(this._id);
        Meteor.call('deleteFileTmp', Session.get("UserLogged").code+"#"+this.contentName, this.code, function(error, result){
          if(result == 1){
            toastrSuppression();
          }
        });
      }
    }else {
      toastrWarningAccessDenied();
    }
  },
  'click .btn-delete'() {
    var content = Contents_Live.findOne({ "_id" : this._id });
    if(checkContent(this._id)){
      if (verifyDelete(content._id)){
        $('#checkDeleting').modal();
        Session.set("deleteContentLive",content);
      }else{
        $('#deletionState').modal();
      }
    }else {
      $('#warning').modal();
    }
  },
  'click .BtnDelete'() {
    var content = Session.get("deleteContentLive");
    content._id = content._id+"#D"
    content.status = "RNAU";
    content.inputter = Session.get("UserLogged")._id;
    content.dateTime = new Date();
    content.authorizer = null;
    Contents_Authorization.insert(content);
    toastrSuppression();
    Meteor.call('synchronizeContents');
  },
});
Template.allContents.helpers({
  contentsLive() {
    return Contents_Live.find({ "code": Session.get("UserLogged").code });
  },
  contentsAuthorization(){
    var contents = Contents_Authorization.find({ "code": Session.get("UserLogged").code });
    var contentsAuthorization = [];
    contents.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var content =
        {
          '_id' : doc._id,
          'contentName': doc.contentName,
          'contentSize': doc.contentSize,
          'contentType': doc.contentType,
          'contentDuration': doc.contentDuration,
          'uploadedDate': doc.uploadedDate,
          'inputter': doc.inputter,
          'authorizer': doc.authorizer,
          'dateTime': doc.dateTime,
          'code': doc.code,
          'buttonEdit' : button.editAu,
          'buttonValidate' : button.validateAu,
          'buttonAuthorize' : button.authorizeAu,
          'buttonDetail' : buttonDetails
        };
      contentsAuthorization.push(content);
    });
    return contentsAuthorization;
  },
  role(){
    return Session.get("USER_ROLE_XX");
  },
  url: function () {
    return Session.get("URL");
  },
  equals: function(v1, v2) {
    return (v1 === v2);
  },
  notEquals: function(v1, v2) {
    return (v1 !== v2);
  },
  updateTitle(){
    return updateTitle();
  },
  deleteTitle(){
    return deleteTitle();
  },
  validateTitle(){
    return validateTitle();
  },
  authorizeTitle(){
    return authorizeTitle();
  },
  detailsTitle(){
    return detailsTitle();
  },
});
