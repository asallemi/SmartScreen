Meteor.subscribe('firmwaresLive');
Meteor.subscribe('firmwaresAuthorization');
let handle = Meteor.subscribe('screensLive');

function getValuesFromFormForAdd(){
  if (document.getElementById('packageName') != null) {
    var name = document.getElementById("packageName").value;
  }else {
    var name = null;
  }
  if (document.getElementById('packageDescription') != null) {
    var description = document.getElementById("packageDescription").value;
  }else {
    var description = null;
  }
  var firmware =
    {
      'name' : name,
      'description' : description,
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany': Session.get("UserLogged").codeCompany
    };
  return firmware;
}
function getValuesFromFormForEdit(){
  if (document.getElementById('packageNameEdict') != null) {
    var name = document.getElementById("packageNameEdict").value;
  }else {
    var name = null;
  }
  if (document.getElementById('packageDescriptionEdict') != null) {
    var description = document.getElementById("packageDescriptionEdict").value;
  }else {
    var description = null;
  }
  var package =
    {
      'name' : name,
      'description' : description,
      'currentNumber': 1,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany': Session.get("UserLogged").codeCompany
    };
  return package;
}
function authorize(firmware){
  if(firmware._id.indexOf("#") > 0){
    firmware._id = firmware._id.replace("#D", "");
  }
  var firmwareX = Firmwares_Live.findOne({ "_id" : firmware._id });
  // entry validated and new entry
  if(firmwareX !== undefined && firmware.status == "INAU"){
    firmware.status = "LIVE";
    firmware.authorizer = Session.get("UserLogged")._id;
    firmware.dateTime = getDateNow();
    firmwareX.status = 'HIS';
    firmwareX.dateTime = getDateNow();
    firmwareX.currentNumber = firmware.currentNumber;
    firmwareX._id = firmware._id+"#"+(firmware.currentNumber-1);
    Firmwares_History.insert(firmwareX);
    Firmwares_Live.remove(firmware._id);
    Firmwares_Live.insert(firmware);
    Firmwares_Authorization.remove(firmware._id);
  // Authorise deleting firmware
  }else if(firmwareX !== undefined && firmware.status == "RNAU"){
    firmware.authorizer= Session.get("UserLogged")._id;
    firmware.status = 'DEL';
    firmware.dateTime = getDateNow();
    Firmwares_History.insert(firmware);
    Firmwares_Live.remove(firmwareX._id);
    Firmwares_Authorization.remove(firmware._id);
    Firmwares_Authorization.remove(firmware._id+"#D");
    Meteor.call('deletePackage', firmware.name);
  }else{
    firmware.status = "LIVE";
    firmware.authorizer = Session.get("UserLogged")._id;
    firmware.dateTime = getDateNow();
    Firmwares_Live.insert(firmware);
    Firmwares_Authorization.remove(firmware._id);
  }
}
function verifyDelete(id){
  var firmware = Firmwares_Authorization.findOne({ "_id" : id+"#D" });
  return firmware == undefined;
}
function verifyEdit(id){
  var firmware = Firmwares_Authorization.findOne({ "_id" : id });
  return firmware == undefined;
}
Template.allFirmwares.onCreated(function () {
});
Template.allFirmwares.rendered = function(){
  checkSession();
  settingLanguage();
  $('.footable').footable();
  $('.footable2').footable();
};
Template.allFirmwares.events({
  'click .upload'() {
    $('#upload').modal();
    Meteor.call('newPackage', "/home/akrem/packages", Session.get("UserLogged")._id, Session.get("UserLogged").codeCompany, function(error, result){
      if (result == 0) {
        toastrPackageUploadedProblem();
      }else {
        toastrPackageUploaded();
      }
    });
  },
  'click .btn-details'() {
    var firmware = Firmwares_Live.findOne({ "_id" : this._id });
    var inputter = Users_Live.findOne({ "_id" : firmware.inputter });
    firmware.inputter = inputter.fname+" "+inputter.surname;
    Session.set("FirmwareDetails", firmware);
    $('#firmwareDetailsPopUp').modal();
  },
  'click .saveAdd'(){
    var firmware = getValuesFromFormForAdd();
    Firmwares_Authorization.insert(firmware);
    toastrSaveDone();
  },
  'click .validateAdd'(){
    var firmware = getValuesFromFormForAdd();
    firmware.status = "INAU";
    Firmwares_Authorization.insert(firmware);
    toastrValidatonDone();
  },
  'click .btn-edit'() {
    var firmware = Firmwares_Live.findOne({ "_id" : this._id });
    if (verifyEdit(firmware._id)){
      Session.set("TypeEdict", "LIVE");
      Session.set("FirmwareForEdit", firmware);
      // Set all screens in an array
      var screens = Screens_Live.find({});
      var arrayOfObjects = [];
      screens.forEach(function(doc){
        // Verify if the COMPANY_CODE exist in the list of companies code
        if( doc.codeCompanies.indexOf(Session.get("UserLogged").codeCompany) > -1 ){
          var screen = {
            'name': doc.screenAddress,
            'selected': false
          }
          arrayOfObjects.push(screen);
        }
      });
      // set in the session list of screens assigned to this firmware
      var list = firmware.screensID.split("#");
      var screens = [];
      if(firmware.screensID.length > 0){
        for(var i=0; i < list.length; i++){
          for(var j=0; j < arrayOfObjects.length; j++){
            if(list[i] == arrayOfObjects[j].name){
              arrayOfObjects[j].selected = true;
            }
          }
        }
        Session.set("ScreensList", arrayOfObjects);
      }else {
        Session.set("ScreensList", arrayOfObjects);
      }
      Router.go('firmware');
    }else{
      $('#edictState').modal();
    }
  },
  'click .btn-delete'() {
    var firmware = Firmwares_Live.findOne({ "_id" : this._id });
    if (verifyDelete(firmware._id)){
      $('#checkDeleting').modal();
      Session.set("FirmwareForDelete",firmware);
    }else{
      $('#deletionState').modal();
    }
  },
  'click .BtnDelete'() {
    var firmware = Session.get("FirmwareForDelete");
    firmware._id = firmware._id+"#D"
    firmware.status = "RNAU";
    firmware.inputter = Session.get("UserLogged")._id;
    firmware.dateTime = getDateNow();
    firmware.authorizer = null;
    Firmwares_Authorization.insert(firmware);
    toastrSuppression();
  },
  'click .detailsAu'() {
    var firmware = Firmwares_Authorization.findOne({ "_id" : this._id });
    var listOfScreens = firmware.screensID.split("#");
    var allScreens = "";
    for (var i = 0; i < listOfScreens.length; i++) {
      allScreens = allScreens + listOfScreens[i]+'\n';
    }
    Session.set("SCREENS_ASSIGNED_TO_FIRMWARE", allScreens);
    var inputter = Users_Live.findOne({ "_id" : firmware.inputter });
    firmware.inputter = inputter.fname+" "+inputter.surname;
    Session.set("FirmwareDetails", firmware);
    $('#firmwareDetailsPopUp').modal();
  },
  'click .validateAu'() {
    var firmware = Firmwares_Authorization.findOne({ "_id" : this._id });
    if (userAuthorized(firmware.inputter)) {
      Firmwares_Authorization.update({'_id' : firmware._id }, {'$set':{ 'status' : 'INAU', 'inputter' :  Session.get("UserLogged")._id, 'dateTime' : getDateNow() }});
    }else {
      toastrWarningAccessDenied();
    }
  },
  'click .authorizeAu'() {
    settingLanguage();
    var oldFirmware = Firmwares_Live.findOne({ "_id" : this._id });
    var newFirmware = Firmwares_Authorization.findOne({ "_id" : this._id });
    Session.set("FirmwareAuthorized", newFirmware);
    if(oldFirmware == undefined){
      Session.set("OldFirmware", null);
    }else {
      var inputter = Users_Live.findOne({ "_id" : oldFirmware.inputter });
      oldFirmware.inputter = inputter.fname+" "+inputter.surname;
      var authorizer = Users_Live.findOne({ "_id" : oldFirmware.authorizer });
      oldFirmware.authorizer = authorizer.fname+" "+authorizer.surname;
      var listOfScreens = oldFirmware.screensID.split("#");
      var allScreens = "";
      for (var i = 0; i < listOfScreens.length; i++) {
        allScreens = allScreens + listOfScreens[i]+'\n';
      }
      Session.set("SCREENS_ASSIGNED_TO_OLD_FIRMWARE", allScreens);
      Session.set("OldFirmware", oldFirmware);
    }
    var listOfScreens = newFirmware.screensID.split("#");
    var allScreens = "";
    for (var i = 0; i < listOfScreens.length; i++) {
      allScreens = allScreens + listOfScreens[i]+'\n';
    }
    Session.set("SCREENS_ASSIGNED_TO_NEW_FIRMWARE", allScreens);
    var inputter = Users_Live.findOne({ "_id" : newFirmware.inputter });
    newFirmware.inputter = inputter.fname+" "+inputter.surname;
    Session.set("NewFirmware", newFirmware);
    $('#checkAuthorising').modal();
  },
  'click .BtnAuthorize'() {
    if(Session.get("FirmwareAuthorized").screensID.length > 0){
      authorize(Session.get("FirmwareAuthorized"));
      Meteor.call('createRepo', Session.get("FirmwareAuthorized").name);
    }else {
      toastrFirmwareAuthorized();
    }

  },
  'click .cancelAu'() {
    var firmware = Firmwares_Authorization.findOne({ "_id" : this._id });
    if (userAuthorized(firmware.inputter)) {
      Session.set("firmwareUserAu", firmware);
      $('#checkCancel').modal();
    }else {
      toastrWarningAccessDenied();
    }
  },
  'click .editAu'() {
    Session.set("TypeEdict", "AUTH");
    var firmware = Firmwares_Authorization.findOne({ "_id" : this._id });
    if (userAuthorized(firmware.inputter)) {
      Session.set("FirmwareForEdit", firmware);
      // Set all screens in an array
      var screens = Screens_Live.find({});
      var arrayOfObjects = [];
      screens.forEach(function(doc){
        // Verify if the COMPANY_CODE exist in the list of companies code
        if( doc.codeCompanies.indexOf(Session.get("UserLogged").codeCompany) > -1 ){
          var screen = {
            'name': doc.screenAddress,
            'selected': false
          }
          arrayOfObjects.push(screen);
        }
      });
      // set in the session list of screens assigned to this firmware
      var list = firmware.screensID.split("#");
      var screens = [];
      if(firmware.screensID.length > 0){
        for(var i=0; i < list.length; i++){
          for(var j=0; j < arrayOfObjects.length; j++){
            if(list[i] == arrayOfObjects[j].name){
              arrayOfObjects[j].selected = true;
            }
          }
        }
        Session.set("ScreensList", arrayOfObjects);
      }else {
        Session.set("ScreensList", arrayOfObjects);
      }
    }else {
      toastrWarningAccessDenied();
    }
  },
  'click .BtnCancel'() {
    var firmware = Session.get("firmwareUserAu");
    Firmwares_Authorization.remove(firmware._id);
    Meteor.call('deletePackage', firmware.name);
    toastrSuppression();
  },
});
Template.allFirmwares.helpers({
  firmwaresLive (){
    return Firmwares_Live.find({ 'codeCompany': Session.get("UserLogged").codeCompany });
  },
  firmwaresAuthorization (){
    var firmwares = Firmwares_Authorization.find({ 'codeCompany': Session.get("UserLogged").codeCompany });
    var firmwaresAuthorization = [];
    firmwares.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var firmware =
        {
          '_id' : doc._id,
          'name': doc.name,
          'description': doc.description,
          'currentNumber': doc.currentNumber,
          'status': doc.status,
          'inputter': doc.inputter,
          'authorizer': doc.authorizer,
          'dateTime': doc.dateTime,
          'buttonEdit' : button.editAu,
          'buttonValidate' : button.validateAu,
          'buttonAuthorize' : button.authorizeAu,
          'buttonDetail' : buttonDetails
        };
      firmwaresAuthorization.push(firmware);
    });
    return firmwaresAuthorization;
  },
  firmwareDetails(){
    return Session.get("FirmwareDetails");
  },
  newFirmware() {
    return Session.get("NewFirmware");
  },
  oldFirmware() {
    return Session.get("OldFirmware");;
  },
  role(){
    return Session.get("USER_ROLE_XX");
  },
  listOfScreens(){
    return Session.get("SCREENS_ASSIGNED_TO_FIRMWARE");
  },
  listOfScreensOld(){
    return Session.get("SCREENS_ASSIGNED_TO_OLD_FIRMWARE");
  },
  listOfScreensNew(){
    return Session.get("SCREENS_ASSIGNED_TO_NEW_FIRMWARE");
  },
  equals: function(v1, v2) {
    return (v1 == v2);
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
