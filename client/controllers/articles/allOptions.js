Meteor.subscribe('articlesOptionsLive');
Meteor.subscribe('articlesOptionsAuthorization');

function getValuesFromFormEditLive(){
  if (Session.get("OptionSelected").type == "Amount") {
    if (document.getElementById('amountX') != null) {
      var optionValue = document.getElementById("amountX").value;
    }else {
      var optionValue = null;
    }
  }else {
    if (document.getElementById('percentX') != null) {
      var optionValue = document.getElementById("percentX").value;
    }else {
      var optionValue = null;
    }
  }
  console.log('value', optionValue);
  var option =
    {
      'title' : Session.get("OptionSelected").title,
      'type': Session.get("OptionSelected").type,
      'value' : parseFloat(optionValue),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany': Session.get("UserLogged").codeCompany
    };
  return option;
}
function getValuesFromForm(){
  if (document.getElementById('optionTitle') != null) {
    var optionTitle = document.getElementById("optionTitle").value;
  }else {
    var optionTitle = null;
  }
  var type = "";
  if(document.getElementById('amount').checked) {
    type = "Amount";
    if (document.getElementById('value1') != null) {
      var optionValue = document.getElementById("value1").value;
    }else {
      var optionValue = null;
    }
  }else {
    type = "Percent";
    if (document.getElementById('value2') != null) {
      var optionValue = document.getElementById("value2").value.trim();
    }else {
      var optionValue = null;
    }
  }
  var option =
    {
      'title' : optionTitle.trim(),
      'type': type.trim(),
      'value' : parseFloat(optionValue),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany': Session.get("UserLogged").codeCompany
    };
  return option;
}
function getValuesFromFormEditAuth(){
  if (Session.get("OptionSelected").type == "Amount") {
    if (document.getElementById('amount_') != null) {
      var optionValue = document.getElementById("amount_").value;
    }else {
      var optionValue = null;
    }
  }else {
    if (document.getElementById('percent_') != null) {
      var optionValue = document.getElementById("percent_").value;
    }else {
      var optionValue = null;
    }
  }
  console.log('value', optionValue);
  var option =
    {
      'title' : Session.get("OptionSelected").title,
      'type': Session.get("OptionSelected").type,
      'value' : parseFloat(optionValue),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany': Session.get("UserLogged").codeCompany
    };
  return option;
}
function authorize(option){
  if(option._id.indexOf("#") > 0){
    option._id = option._id.replace("#D", "");
  }
  var optionX = Articles_Options_Live.findOne({ "_id" : option._id });
  var d = new Date().toString();
  var res = d.split(" ");
  var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  // entry validated and new entry
  if(optionX !== undefined && option.status == "INAU"){
    option.status = "LIVE";
    option.authorizer = Session.get("UserLogged")._id;
    option.dateTime = getDateNow();
    optionX.status = 'HIS';
    optionX.dateTime = getDateNow();
    optionX.currentNumber = option.currentNumber;
    optionX._id = option._id+"#"+(option.currentNumber-1);
    Articles_Options_History.insert(optionX);
    Articles_Options_Live.remove(option._id);
    Articles_Options_Live.insert(option);
    Articles_Options_Authorization.remove(option._id);
  // Authorise deleting option
  }else if(optionX !== undefined && option.status == "RNAU"){
    option.authorizer= Session.get("UserLogged")._id;
    option.status = 'DEL';
    option.dateTime = getDateNow();
    Articles_Options_History.insert(option);
    Articles_Options_Live.remove(optionX._id);
    Articles_Options_Authorization.remove(option._id);
    Articles_Options_Authorization.remove(option._id+"#D");
  }else{
    option.status = "LIVE";
    option.authorizer = Session.get("UserLogged")._id;
    option.dateTime = getDateNow();
    Articles_Options_Live.insert(option);
    Articles_Options_Authorization.remove(option._id);
  }
}
function verifyDelete(id){
  var option = Articles_Options_Authorization.findOne({ "_id" : id+"#D" });
  return option == undefined;
}
function verifyEdit(id){
  var option = Articles_Options_Authorization.findOne({ "_id" : id });
  return option == undefined;
}

//This function return true if the option counted (amount or percent) when an contract is waiting an authorization
//(User can delete an option when other user is ready to construct a new contract)
function verifyOptionCanBeDeleted(optionID){
  var articles = Articles_Live.find({ "codeCompany": Session.get("UserLogged").codeCompany, "option": optionID });
  var contracts = Contracts_Authorization.find({ "codeCompany": Session.get("UserLogged").codeCompany });
  // arrayArticlesID will contain all articles Id (not duplicated IDs)
  var arrayArticlesID = [];
  contracts.forEach(function(contract){
    if (contract.articlesList.length > 0) {
      var array = contract.articlesList.split("#");
      for (var i = 0; i < array.length; i++) {
        if (arrayArticlesID.indexOf(array[i]) == -1) {
          arrayArticlesID.push(array[i]);
        }
      }
    }
  });
  //console.log("ALL "+articles.fetch());
  //console.log("ArrayArticlesID "+arrayArticlesID);
  //check if article Id exist in the array of all articles ID of all not authorized contracts
  articles.forEach(function(article){
    //console.log("Article._id "+ article._id);
    if(arrayArticlesID.indexOf(article._id) > 0){
      return true;
    }
  });
  return false;
}
// A function which returns list of articles affected by the option (puted in the param)
function getListOfArticles(optionID){
  var listOfArticles = "";
  var articles = Articles_Live.find({ "codeCompany": Session.get("UserLogged").codeCompany, "option": optionID });
  if (articles != undefined) {
    articles.forEach(function(article){
      listOfArticles = listOfArticles+" "+ article.titlePivot;
    });
    return listOfArticles;
  }else {
    return 0;
  }
}

Template.allOptions.rendered = function(){
  checkSession();
  settingLanguage();
  $('.footable').footable();
  $('.footable2').footable();
  $('#warning').hide();
  $(".touchspin2").TouchSpin({
      min: 0,
      max: 100,
      step: 0.1,
      decimals: 2,
      boostat: 5,
      maxboostedstep: 10,
      postfix: '%',
      buttondown_class: 'btn btn-white',
      buttonup_class: 'btn btn-white'
  });
  $(".touchspin1").TouchSpin({
      min: 0,
      max: 100000000000,
      step: 0.1,
      decimals: 2,
      postfix: ''
  });
  $('#percentValue').hide();
};
Template.allOptions.events({
  'click #amount' : function () {
    $('#percentValue').hide();
    $('#amountValue').show();
  },
  'click #percent' : function () {
    $('#amountValue').hide();
    $('#percentValue').show();
  },
  'click .newOption'() {
    $('#optionTitle').val("");
    $('#value1').val("");
    $('#value2').val("");
    $('#newOption').modal();
  },
  'click .save'() {
    var option = getValuesFromForm();
    if (option.title.length == 0){
      $('#warning').show();
    }else {
      $('#newOption').modal('hide');
      Articles_Options_Authorization.insert(option);
      toastrSaveDone();
    }
  },
  'click .validate'() {
    var option = getValuesFromForm();
    if (option.title.length == 0){
      $('#warning').show();
    }else {
      $('#newOption').modal('hide');
      option.status = "INAU";
      Articles_Options_Authorization.insert(option);
      toastrValidatonDone();
    }
  },
  'click .validateAu'() {
    var option = Articles_Options_Authorization.findOne({ "_id" : this._id });
    Articles_Options_Authorization.update({'_id' : option._id }, {'$set':{ 'status' : 'INAU', 'inputter' : Session.get("UserLogged")._id , 'dateTime' : new Date() }});
  },
  'click .authorizeAu'() {
    settingLanguage();
    var oldOption = Articles_Options_Live.findOne({ "_id" : this._id });
    var newOption = Articles_Options_Authorization.findOne({ "_id" : this._id });
    Session.set("Option_Authorization", newOption);
    if(oldOption == undefined){
      Session.set("OldOption",null);
    }else {
      var usr1 = Users_Live.findOne({ "_id" : oldOption.inputter });
      var usr2 = Users_Live.findOne({ "_id" : oldOption.authorizer });
      oldOption.inputter = usr1.fname+" "+usr1.surname;
      oldOption.authorizer = usr2.fname+" "+usr2.surname;
      Session.set("OldOption", oldOption);
    }
    var usr = Users_Live.findOne({ "_id" : newOption.inputter });
    newOption.inputter = usr.fname+" "+usr.surname;
    Session.set("NewOption", newOption);
    $('#checkAuthorising').modal();
  },
  'click .BtnAuthorize'() {
    authorize(Session.get("Option_Authorization"));
    toastrAuthorizationDone();
  },
  'click .btn-delete'() {
    var option = Articles_Options_Live.findOne({ "_id" : this._id });
    //if (!verifyOptionCanBeDeleted(option._id)) {
      if (verifyDelete(option._id)){
        $('#checkDeleting').modal();
        Session.set("OptionForDelete", option);
      }else{
        $('#deletionState').modal();
      }
    /*}else {
      toastrOptionInUse();
    }*/
  },
  'click .BtnDelete'() {
    var option = Session.get("OptionForDelete");
    option._id = option._id+"#D"
    option.status = "RNAU";
    option.inputter = Session.get("UserLogged")._id;
    option.dateTime = getDateNow();
    option.authorizer = null;
    Articles_Options_Authorization.insert(option);
    toastrSuppression();
  },
  'click .btn-edit'() {
    var option = Articles_Options_Live.findOne({ "_id" : this._id });
    if (verifyEdit(option._id)){
      Session.set("OptionSelected", option);
      $('#editOption').modal();
    }else{
      $('#edictState').modal();
    }
  },
  'click .saveUpdateLive'() {
    var option = getValuesFromFormEditLive();
    var opt = Session.get("OptionSelected");
    option._id = opt._id;
    option.currentNumber = opt.currentNumber + 1;
    option.dateTime = getDateNow();
    Articles_Options_Authorization.insert(option);
    toastrModificationSaved();
  },
  'click .validateUpdateLive'() {
    var option = getValuesFromFormEditLive();
    var opt = Session.get("OptionSelected");
    option._id = opt._id;
    option.status = "INAU";
    option.currentNumber = opt.currentNumber + 1;
    option.dateTime = getDateNow();
    Articles_Options_Authorization.insert(option);
    toastrModificationValidated();
  },
  'click .detailsAu'() {
    var option = Articles_Options_Authorization.findOne({ "_id" : this._id });
    var usr1 = Users_Live.findOne({ "_id" : option.inputter });
    var usr2 = Users_Live.findOne({ "_id" : option.authorizer });
    var opt =
      {
        'title' : option.title,
        'type': option.type,
        'value' : option.value,
        'inputter': usr1.fname+" "+usr1.surname,
        'dateTime': option.dateTime
    };
    Session.set("OptionDetails", opt);
    $('#optionDetails').modal();
  },
  'click .editAu'() {
    var option = Articles_Options_Authorization.findOne({ "_id" : this._id });
    Session.set("OptionSelected", option);
    $('#editOptionAuth').modal();
  },
  'click .saveUpdateAuth'() {
    var option = getValuesFromFormEditAuth();
    var opt = Session.get("OptionSelected");
    Articles_Options_Authorization.remove(opt._id);
    option._id = opt._id;
    option.dateTime = getDateNow();
    Articles_Options_Authorization.insert(option);
    toastrModificationSaved();
  },
  'click .validateUpdateAuth'() {
    var option = getValuesFromFormEditAuth();
    var opt = Session.get("OptionSelected");
    Articles_Options_Authorization.remove(opt._id);
    option._id = opt._id;
    option.status = "INAU";
    option.dateTime = getDateNow();
    Articles_Options_Authorization.insert(option);
    toastrModificationValidated();
  },
  'click .cancelAu'() {
    var option = Articles_Options_Authorization.findOne({ "_id" : this._id });
    Session.set("optionDeletingAuth", option);
    $('#checkCancel').modal();
  },
  'click .BtnCancel'() {
    var option = Session.get("optionDeletingAuth");
    Articles_Options_Authorization.remove(option._id);
    toastrSuppression();
  },
  'click .btn-details'() {
    var option = Articles_Options_Live.findOne({ "_id" : this._id });
    var usr1 = Users_Live.findOne({ "_id" : option.inputter });
    var usr2 = Users_Live.findOne({ "_id" : option.authorizer });
    var opt = {
        'title' : option.title,
        'type': option.type,
        'value' : option.value,
        'inputter': usr1.fname+" "+usr1.surname,
        'authorizer': usr2.fname+" "+usr2.surname,
        'dateTime': option.dateTime
    };
    opt.listOfArticles = getListOfArticles(option._id);
    Session.set("OptionDetails", opt);
    $('#optionDetails').modal();
  },
});
Template.allOptions.helpers({
  optionsLive (){
    return Articles_Options_Live.find({ "codeCompany": Session.get("UserLogged").codeCompany });
  },
  optionsAuthorization (){
    var options = Articles_Options_Authorization.find({ "codeCompany": Session.get("UserLogged").codeCompany });
    var optionsAuthorization = [];
    options.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);

      var option =
        {
          '_id' : doc._id,
          'title': doc.title,
          'type': doc.type,
          'value': doc.value,
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
      optionsAuthorization.push(option);
    });
    return optionsAuthorization;
  },
  optionSelected(){
    return Session.get("OptionSelected");
  },
  optionDetails(){
    return Session.get("OptionDetails");
  },
  newOption() {
    return Session.get("NewOption");
  },
  oldOption() {
    return Session.get("OldOption");;
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
