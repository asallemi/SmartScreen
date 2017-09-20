Meteor.subscribe('contractsTypeLive');
Meteor.subscribe('contractsTypeAuthorization');

function getValuesFromForm(){
  if (document.getElementById('name') != null) {
    var name = document.getElementById("name").value;
  }else {
    var name = null;
  }
  if (document.getElementById('description') != null) {
    var description = document.getElementById("description").value;
  }else {
    var description = null;
  }
  var type =
    {
      'name' : name,
      'description': description,
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany': Session.get("UserLogged").codeCompany
    };
  return type;
}
function getValuesFromFormForEdit(){
  if (document.getElementById('name1') != null) {
    var name = document.getElementById("name1").value;
  }else {
    var name = null;
  }
  if (document.getElementById('description1') != null) {
    var description = document.getElementById("description1").value;
  }else {
    var description = null;
  }
  var type =
    {
      'name' : name,
      'description': description,
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany': Session.get("UserLogged").codeCompany
    };
  return type;
}
function getValuesFromFormForEditAu(){
  if (document.getElementById('name2') != null) {
    var name = document.getElementById("name2").value;
  }else {
    var name = null;
  }
  if (document.getElementById('description2') != null) {
    var description = document.getElementById("description2").value;
  }else {
    var description = null;
  }
  var type =
    {
      'name' : name,
      'description': description,
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany': Session.get("UserLogged").codeCompany
    };
  return type;
}
function authorize(option){
  if(option._id.indexOf("#") > 0){
    option._id = option._id.replace("#D", "");
  }
  var optionX = Contracts_Type_Live.findOne({ "_id" : option._id });
  var d = new Date().toString();
  var res = d.split(" ");
  var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  // entry validated and new entry
  if(optionX !== undefined && option.status == "INAU"){
    optionoption.status = "LIVE";
    option.authorizer = Session.get("UserLogged")._id;
    option.dateTime = getDateNow();
    optionX.status = 'HIS';
    optionX.dateTime = getDateNow();
    optionX.currentNumber = option.currentNumber;
    optionX._id = option._id+"#"+(option.currentNumber-1);
    Contracts_Type_History.insert(optionX);
    Contracts_Type_Live.remove(option._id);
    Contracts_Type_Live.insert(option);
    Contracts_Type_Authorization.remove(option._id);
  // Authorise deleting type
  }else if(optionX !== undefined && option.status == "RNAU"){
    option.authorizer= Session.get("UserLogged")._id;
    option.status = 'DEL';
    option.dateTime = getDateNow();
    Contracts_Type_History.insert(option);
    Contracts_Type_Live.remove(optionX._id);
    Contracts_Type_Authorization.remove(option._id);
    Contracts_Type_Authorization.remove(option._id+"#D");
  }else{
    option.status = "LIVE";
    option.authorizer = Session.get("UserLogged")._id;
    option.dateTime = getDateNow();
    Contracts_Type_Live.insert(option);
    Contracts_Type_Authorization.remove(option._id);
  }
}
function verifyDelete(id){
  var type = Contracts_Type_Authorization.findOne({ "_id" : id+"#D" });
  return type == undefined;
}
function verifyEdit(id){
  var type = Contracts_Type_Authorization.findOne({ "_id" : id });
  return type == undefined;
}
Template.contractsType.rendered = function(){
  checkSession();
  settingLanguage();
  $('.footable').footable();
  $('.footable2').footable();
  $('#warning').hide();
  $('#warning1').hide();
  $('#warning2').hide();
};
Template.contractsType.events({
  'click .newType'() {
    $('#name').val("");
    $('#description').val("");
    $('#newContractType').modal();
  },
  'click .save'() {
    var type = getValuesFromForm();
    if (type.name.length == 0){
      $('#warning').show();
    }else {
      $('#newContractType').modal('hide');
      Contracts_Type_Authorization.insert(type);
      toastrSaveDone();
    }
  },
  'click .validate'() {
    var type = getValuesFromForm();
    if (type.name.length == 0){
      $('#warning').show();
    }else {
      $('#newContractType').modal('hide');
      type.status = "INAU";
      Contracts_Type_Authorization.insert(type);
      toastrValidatonDone();
    }
  },
  'click .saveUpdateLive'() {
    var typeUpdated = getValuesFromFormForEdit();
    if (typeUpdated.name.length == 0){
      $('#warning1').show();
    }else {
      var type = Session.get("typeSelected");
      typeUpdated._id = type._id;
      typeUpdated.currentNumber = type.currentNumber + 1;
      Contracts_Type_Authorization.insert(typeUpdated);
      toastrModificationSaved();
    }
  },
  'click .validateUpdateLive'() {
    var typeUpdated = getValuesFromFormForEdit();
    if (typeUpdated.name.length == 0){
      $('#warning1').show();
    }else {
      $('#editTypeLive').modal('hide');
      var type = Session.get("typeSelected");
      typeUpdated._id = type._id;
      typeUpdated.currentNumber = type.currentNumber + 1
      typeUpdated.status = "INAU";
      Contracts_Type_Authorization.insert(typeUpdated);
      toastrModificationValidated();
    }
  },
  'click .saveUpdateAu'() {
    var typeUpdated = getValuesFromFormForEditAu();
    if (typeUpdated.name.length == 0){
      $('#warning1').show();
    }else {
      var type = Session.get("typeSelected");
      typeUpdated._id = type._id;
      Contracts_Type_Authorization.remove(type._id);
      Contracts_Type_Authorization.insert(typeUpdated);
      toastrModificationSaved();
    }
  },
  'click .validateUpdateAu'() {
    var typeUpdated = getValuesFromFormForEditAu();
    if (typeUpdated.name.length == 0){
      $('#warning1').show();
    }else {
      $('#editTypeAu').modal('hide');
      var type = Session.get("typeSelected");
      typeUpdated._id = type._id;
      typeUpdated.status = "INAU";
      Contracts_Type_Authorization.remove(type._id);
      Contracts_Type_Authorization.insert(typeUpdated);
      toastrModificationValidated();
    }
  },
  'click .validateAu'() {
    var type = Contracts_Type_Authorization.findOne({ "_id" : this._id });
    Contracts_Type_Authorization.update({'_id' : type._id }, {'$set':{ 'status' : 'INAU', 'inputter' : Session.get("UserLogged")._id , 'dateTime' : getDateNow() }});
  },
  'click .authorizeAu'() {
    settingLanguage();
    var oldType = Contracts_Type_Live.findOne({ "_id" : this._id });
    var newType = Contracts_Type_Authorization.findOne({ "_id" : this._id });
    Session.set("TypeAuthorized", newType);
    if(oldType == undefined){
      Session.set("OldType", null);
    }else {
      var inputter = Users_Live.findOne({ "_id" : oldType.inputter });
      oldType.inputter = inputter.fname+" "+inputter.surname;
      var authorizer = Users_Live.findOne({ "_id" : oldType.authorizer });
      oldType.authorizer = authorizer.fname+" "+authorizer.surname;
      Session.set("OldType", oldType);
    }
    var inputter = Users_Live.findOne({ "_id" : newType.inputter });
    newType.inputter = inputter.fname+" "+inputter.surname;
    Session.set("NewType", newType);
    $('#checkAuthorising').modal();
  },
  'click .BtnAuthorize'() {
    authorize(Session.get("TypeAuthorized"));
    toastrAuthorizationDone();
  },
  'click .btn-delete'() {
    var type = Contracts_Type_Live.findOne({ "_id" : this._id });
    if (verifyDelete(type._id)){
      $('#checkDeleting').modal();
      Session.set("TypeForDelete", type);
    }else{
      $('#deletionState').modal();
    }
  },
  'click .BtnDelete'() {
    var type = Session.get("TypeForDelete");
    type._id = type._id+"#D"
    type.status = "RNAU";
    type.inputter = Session.get("UserLogged")._id;
    type.dateTime = getDateNow();
    type.authorizer = null;
    Contracts_Type_Authorization.insert(type);
    toastrSuppression();
  },
  'click .btn-edit'() {
    var type = Contracts_Type_Live.findOne({ "_id" : this._id });
    if (verifyEdit(this._id)){
      Session.set("typeSelected", type);
      $('#editTypeLive').modal();
    }else{
      $('#edictState').modal();
    }
  },
  'click .detailsAu'() {
    var type = Contracts_Type_Authorization.findOne({ "_id" : this._id });
    var usr = Users_Live.findOne({ "_id" : type.inputter });
    type.inputter = usr.fname+" "+usr.surname;
    Session.set("TypeDetails", type);
    $('#TypeDetailsAu').modal();
  },
  'click .editAu'() {
    Session.set("typeSelected", Contracts_Type_Authorization.findOne({ "_id" : this._id }));
    $('#editTypeAu').modal();
  },
  'click .cancelAu'() {
    var type = Contracts_Type_Authorization.findOne({ "_id" : this._id });
    Session.set("typeDeletingAuth", type);
    $('#checkCancel').modal();
  },
  'click .BtnCancel'() {
    var type = Session.get("typeDeletingAuth");
    Contracts_Type_Authorization.remove(type._id);
    toastrSuppression();
  },
  'click .btn-details'() {
    var type = Contracts_Type_Live.findOne({ "_id" : this._id });
    var usr = Users_Live.findOne({ "_id" : type.inputter });
    type.inputter = usr.fname+" "+usr.surname;
    var usr_ = Users_Live.findOne({ "_id" : type.authorizer });
    type.authorizer = usr_.fname+" "+usr_.surname;
    Session.set("TypeDetails", type);
    $('#TypeDetailsLive').modal();
  },
});
Template.contractsType.helpers({
  typesLive (){
    return Contracts_Type_Live.find({ "codeCompany": Session.get("UserLogged").codeCompany });
  },
  typesAuthorization (){
    var types = Contracts_Type_Authorization.find({ "codeCompany": Session.get("UserLogged").codeCompany });
    var typesAuthorization = [];
    types.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var type =
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
      typesAuthorization.push(type);
    });
    return typesAuthorization;
  },
  typeSelectedLive(){
    return Session.get("typeSelected");
  },
  typeSelectedAu(){
    return Session.get("typeSelected");
  },
  typeDetails(){
    return Session.get("TypeDetails");
  },
  newType() {
    return Session.get("NewType");
  },
  oldType() {
    return Session.get("OldType");;
  },
  role(){
    return Session.get("USER_ROLE_XX");
  },
  equals: function(v1, v2) {
    return (v1 == v2);
  },
  notEquals: function(v1, v2) {
    return (v1 != v2);
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
