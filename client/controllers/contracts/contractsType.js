Meteor.subscribe('articlesOptionsLive');
Meteor.subscribe('articlesOptionsAuthorization');

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
      var optionValue = document.getElementById("value2").value;
    }else {
      var optionValue = null;
    }
  }
  var d = new Date().toString();
  var res = d.split(" ");
  var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var option =
    {
      'title' : optionTitle,
      'type': type,
      'value' : optionValue,
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow()
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
    optionoption.status = "LIVE";
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
  var article = Articles_Authorization.findOne({ "_id" : id+"#D" });
  if( article == undefined ){
    return true;
  }
  return false;
}
function verifyEdit(id){
  var article = Articles_Authorization.findOne({ "_id" : id });
  if(article == undefined){
    return true;
  }
  return false;
}

Template.contractsType.rendered = function(){
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
      step: 1,
      postfix: '€'
  });
  $('#percentValue').hide();
};
Template.contractsType.events({
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
      if(Session.get("UserLogged").language == "en"){
        toastr.success('With success','Saving done !');
      }else {
        toastr.success('Avec succès','Enregistrement fait !');
      }
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
      if(Session.get("UserLogged").language == "en"){
        toastr.success('With success','Validating done !');
      }else {
        toastr.success('Avec succès','Validation fait !');
      }
    }
  },
  'click .validateAu'() {
    var option = Articles_Options_Authorization.findOne({ "_id" : this._id });
    Articles_Options_Authorization.update({'_id' : option._id }, {'$set':{ 'status' : 'INAU', 'inputter' : Session.get("UserLogged")._id , 'dateTime' : new Date() }});
  },
  'click .authorizeAu'() {
    var oldOption = Articles_Options_Live.findOne({ "_id" : this._id });
    var newOption = Articles_Options_Authorization.findOne({ "_id" : this._id });
    if(oldOption == undefined){
      Session.set("OldOption",null);
    }else {
      Session.set("OldOption", oldOption);
    }
    Session.set("NewOption", newOption);
    $('#checkAuthorising').modal();
  },
  'click .BtnAuthorize'() {
    authorize(Session.get("NewOption"));
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Authorization done !');
    }else {
      toastr.success('Avec succès','Autorisation fait !');
    }
  },
  'click .btn-delete'() {
    var article = Articles_Live.findOne({ "_id" : this._id });
    if (verifyDelete(article._id)){
      $('#checkDeleting').modal();
      Session.set("ArticleForDelete", article);
    }else{
      $('#deletionState').modal();
    }
  },
  'click .btn-edit'() {
    Session.set("LIVE_OR_AUTH", "LIVE");
    getOnlyArticles(this._id);
    var article = Articles_Live.findOne({ "_id" : this._id });
    if (verifyEdit(this._id)){
      var subSectionTitle = null;
      if(article.subSection.length > 0){
        var art = Articles_Live.findOne({ "_id" : article.subSection });
        subSectionTitle = art.title;
      }
      article.subSection = subSectionTitle;
      Session.set("articleSelected", article);
      Router.go('editArticle');
    }else{
      $('#edictState').modal();
    }
  },
  'click .detailsAu'() {
    var article = Articles_Authorization.findOne({ "_id" : this._id });
    var artTitle = "";
    if(this.subSection.length > 0){
      var optionX = Articles_Live.findOne({ "_id" : this.subSection });
      artTitle = optionX.title;
    }
    var usr1 = Users_Live.findOne({ "_id" : this.inputter });
    var art =
      {
        'title' : article.title,
        'content' : article.content,
        'language' : article.language,
        'option' : article.option,
        'subSection': artTitle,
        'inputter': usr1.fname+" "+usr1.surname,
        'authorizer': " ",
        'dateTime': article.dateTime
      };
    Session.set("ArticleDetails", art);
    $('#ArticleDetails').modal();
  },
  'click .editAu'() {
    Session.set("LIVE_OR_AUTH", "AUTH");
    getOnlyArticles(this._id);
    var article = Articles_Authorization.findOne({ "_id" : this._id });
    var subSectionTitle = null;
    if(article.subSection.length > 0){
      var art = Articles_Live.findOne({ "_id" : article.subSection });
      subSectionTitle = art.title;
    }
    article.subSection = subSectionTitle;
    Session.set("articleSelected", article);
    Router.go('editArticle');
  },
  'click .cancelAu'() {
    var option = Articles_Options_Authorization.findOne({ "_id" : this._id });
    Session.set("optionDeletingAuth", option);
    $('#checkCancel').modal();
  },
  'click .BtnCancel'() {
    var option = Session.get("optionDeletingAuth");
    Articles_Options_Authorization.remove(option._id);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Deletion operation done !');
    }else {
      toastr.success('Avec succès','Suppression fait !');
    }
  },
  'click .btn-details'() {
    var article = Articles_Live.findOne({ "_id" : this._id });
    var artTitle = null;
    if(article.subSection.length > 0){
      var optionX = Articles_Live.findOne({ "_id" : this.subSection });
      artTitle = optionX.title;
    }
    var usr1 = Users_Live.findOne({ "_id" : this.inputter });
    var usr2 = Users_Live.findOne({ "_id" : this.authorizer });
    var art =
      {
        'title' : article.title,
        'content' : article.content,
        'language' : article.language,
        'option' : article.option,
        'subSection': artTitle,
        'inputter': usr1.fname+" "+usr1.surname,
        'authorizer': usr2.fname+" "+usr2.surname,
        'dateTime': article.dateTime
      };
    Session.set("ArticleDetails", art);
    $('#ArticleDetails').modal();
  },
  'click .BtnDelete'() {
    var article = Session.get("ArticleForDelete");
    article._id = article._id+"#D"
    article.status = "RNAU";
    article.inputter = Session.get("UserLogged")._id;
    article.dateTime = new Date();
    article.authorizer = null;
    Articles_Authorization.insert(article);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Deletion done !');
    }else {
      toastr.success('Avec succès','Suppression fait !');
    }
  },
});
Template.contractsType.helpers({
  optionsLive (){
    return Articles_Options_Live.find();
  },
  optionsAuthorization (){
    var options = Articles_Options_Authorization.find();
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
  articleDetails(){
    return Session.get("ArticleDetails");
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
});
