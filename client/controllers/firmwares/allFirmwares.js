Meteor.subscribe('firmwaresLive');
Meteor.subscribe('firmwaresAuthorization');
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
  var d = new Date().toString();
  var res = d.split(" ");
  var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var firmware =
    {
      'name' : name,
      'description' : description,
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': dat.toString()
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
  var d = new Date().toString();
  var res = d.split(" ");
  var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var package =
    {
      'name' : name,
      'description' : description,
      'currentNumber': 1,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': dat.toString()
    };
  return package;
}
function authorize(firmware){
  if(firmware._id.indexOf("#") > 0){
    firmware._id = firmware._id.replace("#D", "");
  }
  var firmwareX = Firmwares_Live.findOne({ "_id" : firmware._id });
  var d = new Date().toString();
  var res = d.split(" ");
  var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  // entry validated and new entry
  if(firmwareX !== undefined && firmware.status == "INAU"){
    firmware.status = "LIVE";
    firmware.authorizer = Session.get("UserLogged")._id;
    firmware.dateTime = dat.toString();
    firmwareX.status = 'HIS';
    firmwareX.dateTime = dat.toString();
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
    firmware.dateTime = dat.toString();
    Firmwares_History.insert(firmware);
    Firmwares_Live.remove(firmwareX._id);
    Firmwares_Authorization.remove(firmware._id);
    Firmwares_Authorization.remove(firmware._id+"#D");
  }else{
    firmware.status = "LIVE";
    firmware.authorizer = Session.get("UserLogged")._id;
    firmware.dateTime = dat.toString();
    Firmwares_Live.insert(firmware);
    Firmwares_Authorization.remove(firmware._id);
  }
}
function verifyDelete(id){
  var firmware = Firmwares_Authorization.findOne({ "_id" : id+"#D" });
  if( firmware == undefined ){
    return true;
  }
  return false;
}
function verifyEdit(id){
  var firmware = Firmwares_Authorization.findOne({ "_id" : id });
  if(firmware == undefined){
    return true;
  }
  return false;
}
Template.allFirmwares.onCreated(function () {

});
Template.allFirmwares.rendered = function(){
  settingLanguage();
  $('.footable').footable();
  $('.footable2').footable();
};
Template.allFirmwares.events({
  'click .newPackage'() {
    $('#packageName').val("");
    $('#packageDescription').val("");
    $('#newPackagePopup').modal();
  },
  'click .btn-details'() {
    var firmware = Firmwares_Live.findOne({ "_id" : this._id });
    Session.set("FirmwareDetails", firmware);
    $('#firmwareDetailsPopUp').modal();
  },
  'click .saveAdd'(){
    var firmware = getValuesFromFormForAdd();
    Firmwares_Authorization.insert(firmware);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Save done !');
    }else {
      toastr.success('Avec succès','Enregistrer fait !');
    }
  },
  'click .validateAdd'(){
    var firmware = getValuesFromFormForAdd();
    firmware.status = "INAU";
    Firmwares_Authorization.insert(firmware);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Validation done !');
    }else {
      toastr.success('Avec succès','Validation fait !');
    }
  },
  'click .btn-edit'() {
    var firmware = Firmwares_Live.findOne({ "_id" : this._id });
    if (verifyEdit(firmware._id)){
      Session.set("FirmwareDetails", firmware);
      $('#editFirmwarePopUp').modal();
    }else{
      $('#edictState').modal();
    }
  },
  'click .saveUpdate'() {
    var firmwareUpdated = getValuesFromFormForEdit();
    var firmware = Session.get("firmwareSelectedLive");
    firmwareUpdated.inputter = Session.get("UserLogged")._id;
    firmwareUpdated._id = firmware._id;
    firmwareUpdated.currentNumber = firmware.currentNumber + 1;
    Firmwares_Authorization.insert(firmwareUpdated);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Edict done !');
    }else {
      toastr.success('Avec succès','Modification fait !');
    }
  },
  'click .validateUpdate'() {
    var firmwareUpdated = getValuesFromFormForEdit();
    var firmware = Session.get("firmwareSelectedLive");
    firmwareUpdated.inputter = Session.get("UserLogged")._id;
    firmwareUpdated._id = firmware._id;
    firmwareUpdated.status = "INAU";
    firmwareUpdated.currentNumber = firmware.currentNumber + 1;
    Firmwares_Authorization.insert(firmwareUpdated);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Edict done !');
    }else {
      toastr.success('Avec succès','Modification fait !');
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
    firmware.dateTime = new Date();
    firmware.authorizer = null;
    Firmwares_Authorization.insert(firmware);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Deletion done !');
    }else {
      toastr.success('Avec succès','Suppression fait !');
    }
  },
  'click .detailsAu'() {
    Session.set("FirmwareDetails", Firmwares_Authorization.findOne({ "_id" : this._id }));
    $('#firmwareDetailsPopUp').modal();
  },
  'click .validateAu'() {
    var firmware = Firmwares_Authorization.findOne({ "_id" : this._id });
    Firmwares_Authorization.update({'_id' : firmware._id }, {'$set':{ 'status' : 'INAU', 'inputter' :  Session.get("UserLogged")._id, 'dateTime' : new Date() }});
  },
  'click .authorizeAu'() {
    var oldFirmware = Firmwares_Live.findOne({ "_id" : this._id });
    var newFirmware = Firmwares_Authorization.findOne({ "_id" : this._id });
    if(oldFirmware == undefined){
      Session.set("OldFirmware",null);
    }else {
      Session.set("OldFirmware",oldFirmware);
    }
    Session.set("NewFirmware",newFirmware);
    $('#checkAuthorising').modal();
    Session.set("FirmwareAuthorized", Firmwares_Authorization.findOne({ "_id" : this._id }));
  },
  'click .BtnAuthorize'() {
    authorize(Session.get("FirmwareAuthorized"));
  },
  'click .cancelAu'() {
    Session.set("firmwareUserAu", Firmwares_Authorization.findOne({ "_id" : this._id }));
    $('#checkCancel').modal();
  },
  'click .BtnCancel'() {
    var firmware = Session.get("firmwareUserAu");
    Firmwares_Authorization.remove(firmware._id);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Deletion operation done ');
    }else {
      toastr.success('Avec succès','Suppression fait !');
    }

  },
});
Template.allFirmwares.helpers({
  firmwaresLive (){
    return Firmwares_Live.find();
  },
  firmwaresAuthorization (){
    var firmwares = Firmwares_Authorization.find();
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
  equals: function(v1, v2) {
    return (v1 == v2);
  },
});
