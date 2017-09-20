Meteor.subscribe('articlesLive');
Meteor.subscribe('articlesAuthorization');
Meteor.subscribe('languagesLive');

function authorize(article){
  if(article._id.indexOf("#") > 0){
    article._id = article._id.replace("#D", "");
  }
  var articleX = Articles_Live.findOne({ "_id" : article._id });
  var d = new Date().toString();
  var res = d.split(" ");
  var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  // entry validated and new entry
  if(articleX !== undefined && article.status == "INAU"){
    article.status = "LIVE";
    article.authorizer = Session.get("UserLogged")._id;
    article.dateTime = getDateNow();
    articleX.status = 'HIS';
    articleX.dateTime = getDateNow();
    articleX.currentNumber = article.currentNumber;
    articleX._id = article._id+"#"+(article.currentNumber-1);
    Articles_History.insert(articleX);
    Articles_Live.remove(article._id);
    Articles_Live.insert(article);
    Articles_Authorization.remove(article._id);
  // Authorise deleting article
  }else if(articleX !== undefined && article.status == "RNAU"){
    article.authorizer= Session.get("UserLogged")._id;
    article.status = 'DEL';
    article.dateTime = getDateNow();
    Articles_History.insert(article);
    Articles_Live.remove(articleX._id);
    Articles_Authorization.remove(article._id);
    Articles_Authorization.remove(article._id+"#D");
  }else{
    article.status = "LIVE";
    article.authorizer = Session.get("UserLogged")._id;
    article.dateTime = getDateNow();
    Articles_Live.insert(article);
    Articles_Authorization.remove(article._id);
  }
}
function verifyDelete(id){
  var article = Articles_Authorization.findOne({ "_id" : id+"#D" });
  return article == undefined;
}
function verifyEdit(id){
  var article = Articles_Authorization.findOne({ "_id" : id });
  return article == undefined;
}
// A function which set in the Articles session all articles which are level one
function getOnlyArticles(id){
  var articles = Articles_Live.find({ "codeCompany": Session.get("COMPANY_CODE") });
  var articlesLive = [];
  if(id != null){
    articles.forEach(function(doc){
      if (doc.subSection.length == 0 && doc._id != id){
        var article =
          {
            '_id' : doc._id,
            'title': doc.title,
          };
        articlesLive.push(article);
      }
    });
  }else {
    articles.forEach(function(doc){
      if (doc.subSection.length == 0 ){
        var article =
          {
            '_id' : doc._id,
            'title': doc.title,
          };
        articlesLive.push(article);
      }
    });
  }
  // list of articles without subSection (just article list, subsection not included)
  Session.set("Articles", articlesLive);
}
// A function which returns true if the a language is a pivot
function checkIsPivot(id){
  var languagePivot = Languages_Live.findOne({ "_id": id });
  return languagePivot.isPivot == true;
}
// A function which return an array of languages selected (used to determinate the UI)
function getLanguagesSelected(){
  var languages = Languages_Live.find();

  var languagesSelected = "";
  var listOfLanguages = [];
  languages.forEach(function(doc){
    if(document.getElementById(doc._id).checked) {
      if(!checkIsPivot(doc._id)){
        languagesSelected = document.getElementById(doc._id).value+"#"+languagesSelected ;
      }
      var lang = {
        "_id": doc._id,
        "languageName" : doc.languageName,
        "languageCode" : doc.languageCode,
        "isPivot" : doc.isPivot
      };
      listOfLanguages.push(lang)
    }
  });
  // To remove the last caracter "#"
  languagesSelected = languagesSelected.substring(0, languagesSelected.length-1);
  Session.set("LANGUAGES_SELECTED", listOfLanguages);
  return languagesSelected;
}

Template.companyArticles.rendered = function(){
  checkSession();
  settingLanguage();
  $('.footable').footable();
  $('.footable2').footable();
};
Template.companyArticles.events({
  'click .options'() {
    Router.go('articleOptions');
  },
  'click .newArticle'() {
    $('#choosingLanguages').modal();
    settingLanguage();
  },
  'click .confirm'() {
    Session.set("LIST_LANGUAGES", getLanguagesSelected());
    getOnlyArticles(null);
    Router.go('newArticle');
  },
  'click .validateAu'() {
    var article = Articles_Authorization.findOne({ "_id" : this._id });
    Articles_Authorization.update({'_id' : article._id }, {'$set':{ 'status' : 'INAU', 'inputter' : Session.get("UserLogged")._id , 'dateTime' : getDateNow() }});
  },
  'click .authorizeAu'() {
    settingLanguage();
    var oldArticle = Articles_Live.findOne({ "_id" : this._id });
    var newArticle = Articles_Authorization.findOne({ "_id" : this._id });
    console.log(newArticle.dateTime);
    Session.set("ArticleAuthorized", newArticle);
    if(oldArticle == undefined){
      Session.set("OldArticle",null);
    }else {
      var subSectionTitle = null;
      if(oldArticle.subSection.length > 0){
        var art = Articles_Live.findOne({ "_id" : oldArticle.subSection });
        subSectionTitle = art.title;
      }
      oldArticle.subSection = subSectionTitle;
      var optionX = null;
      if(oldArticle.option.length > 0){
        var optX = Articles_Options_Live.findOne({ "_id" : oldArticle.option });
        optionX = optX.title;
      }
      oldArticle.option = optionX;
      var usr1 = Users_Live.findOne({ "_id" : oldArticle.inputter });
      var usr2 = Users_Live.findOne({ "_id" : oldArticle.authorizer });
      oldArticle.inputter = usr1.fname+" "+usr1.surname;
      oldArticle.authorizer = usr2.fname+" "+usr2.surname;
      //////////////////////////////////////////////
      var arrayLang = [];
      var listLanguages = oldArticle.languageSelected.split("#");
      var arrayTitles = oldArticle.titles.split("#");
      var arrayContents = oldArticle.contents.split("#");
      var lang = Languages_Live.findOne({ "_id": oldArticle.languagePivot });
      var obj = {
        '_id': lang._id,
        'languageName': lang.languageName,
        'isPivot': true,
        'title': oldArticle.titlePivot,
        'content': oldArticle.contentPivot
      };
      arrayLang.push(obj);
      for (var i = 0; i < listLanguages.length; i++) {
        if (oldArticle.languagePivot != listLanguages[i]) {
          var lang = Languages_Live.findOne({ "_id": listLanguages[i] });
          var obj = {
            '_id': listLanguages[i],
            'languageName': lang.languageName,
            'isPivot': false,
            'title': arrayTitles[i],
            'content': arrayContents[i]
          };
          arrayLang.push(obj);
        }
      }
      console.log(array);
      Session.set("LANG_OLD_ARTICLE", arrayLang); // this session contains an array of obj, the first obj is pivot language
      Session.set("OldArticle", oldArticle);
    }
    // Prepare the new article object
    var title = null;
    if(newArticle.subSection.length > 0){
      var artX = Articles_Live.findOne({ "_id" : newArticle.subSection });
      title = artX.title;
    }
    newArticle.subSection = title;
    var option = null;
    if(newArticle.option.length > 0){
      var opt = Articles_Options_Live.findOne({ "_id" : newArticle.option });
      option = opt.title;
    }
    newArticle.option = option;
    var usr3 = Users_Live.findOne({ "_id" : newArticle.inputter });
    newArticle.inputter = usr3.fname+" "+usr3.surname;
    ///////////////////
    var array = [];
    var listLanguages = newArticle.languageSelected.split("#");
    var arrayTitles = newArticle.titles.split("#");
    var arrayContents = newArticle.contents.split("#");
    var lang = Languages_Live.findOne({ "_id": newArticle.languagePivot });
    var obj = {
      '_id': lang._id,
      'languageName': lang.languageName,
      'isPivot': true,
      'title': newArticle.titlePivot,
      'content': newArticle.contentPivot
    };
    array.push(obj);
    for (var i = 0; i < listLanguages.length; i++) {
      if (newArticle.languagePivot != listLanguages[i]) {
        var lang = Languages_Live.findOne({ "_id": listLanguages[i] });
        var obj = {
          '_id': listLanguages[i],
          'languageName': lang.languageName,
          'isPivot': false,
          'title': arrayTitles[i],
          'content': arrayContents[i]
        };
        array.push(obj);
      }
    }
    console.log(array);
    Session.set("LANG_NEW_ARTICLE", array); // this session contains an array of obj, the first obj is pivot language
    Session.set("NewArticle", newArticle);
    $('#checkAuthorising').modal();

  },
  'click .BtnAuthorize'() {
    var article = Session.get("ArticleAuthorized");
    if(article.contentPivot.length == 0){
      toastrWarningArticleAuthorization(article.title);
    }else {
      authorize(Session.get("ArticleAuthorized"));
      toastrAuthorizationDone();
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
      var option = null;
      if(article.option.length > 0){
        var opt = Articles_Options_Live.findOne({ "_id" : article.option });
        option = opt.title;
      }
      article.optionTitle = option;
      ////////////////////////////////////////////////////////////////
      var array = [];
      var listLanguages = article.languageSelected.split("#");
      var arrayTitles = article.titles.split("#");
      var arrayContents = article.contents.split("#");
      console.log("listLanguages -> ", listLanguages);
      console.log("arrayTitles -> ", arrayTitles);
      console.log("arrayContents -> ", arrayContents);
      var lang = Languages_Live.findOne({ "_id": article.languagePivot });
      var obj = {
        '_id': lang._id,
        'languageName': lang.languageName,
        'isPivot': true,
        'title': article.titlePivot,
        'content': article.contentPivot
      };
      array.push(obj);
      for (var i = 0; i < listLanguages.length; i++) {
        if (article.languagePivot != listLanguages[i]) {
          var lang = Languages_Live.findOne({ "_id": listLanguages[i] });
          var obj = {
            '_id': listLanguages[i],
            'languageName': lang.languageName,
            'isPivot': false,
            'title': arrayTitles[i],
            'content': arrayContents[i]
          };
          array.push(obj);
        }
      }
      console.log(array);
      Session.set("LANG", array); // this session contains an array of obj, the first obj is pivot language
      Session.set("articleSelected", article);
      Router.go('updateArticle');
    }else{
      $('#edictState').modal();
    }
  },
  'click .detailsAu'() {
    var article = Articles_Authorization.findOne({ "_id" : this._id });
    var artTitle = "";
    if(this.subSection.length > 0){
      var articleX = Articles_Live.findOne({ "_id" : this.subSection });
      artTitle = articleX.title;
    }
    var option = Articles_Options_Live.findOne({ "_id": article.option});
    var usr1 = Users_Live.findOne({ "_id" : this.inputter });
    var art =
      {
        'title' : article.title,
        'content' : article.content,
        'language' : article.language,
        'option' : option.title,
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
    var option = null;
    if(article.option.length > 0){
      var opt = Articles_Options_Live.findOne({ "_id" : article.option });
      option = opt.title;
    }
    article.optionTitle = option;
    ////////////////////////////////////////////////////////////////
    var array = [];
    var listLanguages = article.languageSelected.split("#");
    var arrayTitles = article.titles.split("#");
    var arrayContents = article.contents.split("#");
    console.log("listLanguages -> ", listLanguages);
    console.log("arrayTitles -> ", arrayTitles);
    console.log("arrayContents -> ", arrayContents);
    var lang = Languages_Live.findOne({ "_id": article.languagePivot });
    var obj = {
      '_id': lang._id,
      'languageName': lang.languageName,
      'isPivot': true,
      'title': article.titlePivot,
      'content': article.contentPivot
    };
    array.push(obj);
    for (var i = 0; i < listLanguages.length; i++) {
      if (article.languagePivot != listLanguages[i]) {
        var lang = Languages_Live.findOne({ "_id": listLanguages[i] });
        var obj = {
          '_id': listLanguages[i],
          'languageName': lang.languageName,
          'isPivot': false,
          'title': arrayTitles[i],
          'content': arrayContents[i]
        };
        array.push(obj);
      }
    }
    console.log(array);
    Session.set("LANG", array); // this session contains an array of obj, the first obj is pivot language
    Session.set("articleSelected", article);
    Router.go('editArticle');
  },
  'click .cancelAu'() {
    var article = Articles_Authorization.findOne({ "_id" : this._id });
    Session.set("articleDeletingAuth",article);
    $('#checkCancel').modal();
  },
  'click .BtnCancel'() {
    var article = Session.get("articleDeletingAuth");
    Articles_Authorization.remove(article._id);
    toastrSuppression();
  },
  'click .btn-details'() {
    var article = Articles_Live.findOne({ "_id" : this._id });
    var artTitle = null;
    if(article.subSection.length > 0){
      var articleX = Articles_Live.findOne({ "_id" : this.subSection });
      artTitle = articleX.title;
    }
    var optionTitle = "";
    if (article.option.length > 0) {
      var option = Articles_Options_Live.findOne({ "_id": article.option});
      optionTitle = option.title;
    }
    var usr1 = Users_Live.findOne({ "_id" : this.inputter });
    var usr2 = Users_Live.findOne({ "_id" : this.authorizer });
    var lang = Languages_Live.findOne({ "_id": article.languagePivot });
    var languageSelected = lang.languageName;
    var res = article.languageSelected.split("#");
    for (var i = 0; i < res.length; i++) {
      var lang = Languages_Live.findOne({ "_id": res[i] });
      languageSelected = languageSelected+" "+lang.languageName;
    }
    var art = {
        'titlePivot' : article.titlePivot,
        'contentPivot' : article.contentPivot,
        'languageSelected': languageSelected,
        'option' : optionTitle,
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
    toastrSuppression();
  },
});
Template.companyArticles.helpers({
  languagesLive (){
    return Languages_Live.find();
  },
  articlesLive (){
    return Articles_Live.find({ "codeCompany": Session.get("COMPANY_CODE") });
  },
  articlesAuthorization (){
    var articles = Articles_Authorization.find({ "codeCompany": Session.get("COMPANY_CODE") });
    var articlesAuthorization = [];
    articles.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var art = Articles_Live.findOne({ "_id": doc._id });
      var subSection = "";
      if( art != undefined){
        subSection = art.subSection;
      }
      var article =
        {
          '_id' : doc._id,
          'languagePivot': doc.languagePivot,
          'titlePivot' : doc.titlePivot,
          'contentPivot' : doc.contentPivot,
          'languageSelected': doc.languageSelected,
          'titles': doc.title,
          'contents': doc.content,
          'option': doc.option,
          'subSection': subSection,
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
      articlesAuthorization.push(article);
    });
    return articlesAuthorization;
  },
  articleDetails(){
    return Session.get("ArticleDetails");
  },
  newArticle() {
    return Session.get("NewArticle");
  },
  oldArticle() {
    return Session.get("OldArticle");;
  },
  languagesNewArticle() {
    return Session.get("LANG_NEW_ARTICLE");
  },
  languagesOldArticle() {
    return Session.get("LANG_OLD_ARTICLE");
  },
  role(){
    return Session.get("USER_ROLE_XX");
  },
  company(){
    return Session.get("COMPANY_NAME");
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
