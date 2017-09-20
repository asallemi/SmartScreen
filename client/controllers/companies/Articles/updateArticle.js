Meteor.subscribe('articlesLive');
Meteor.subscribe('articlesAuthorization');

function getValuesFromForm(){
  var array = Session.get("LANG");
  var listOfTitles = "";
  var listOfContents = "";
  var titlePivot = "";
  var contentPivot = "";
  var languageSelected = "";
  for (var i = 0; i < array.length; i++) {
    // if language is a pivot, so we'll get the title and the content into "titlePivot" and "contentPivot"
    if (array[i].isPivot == true) {
      titlePivot = document.getElementById("title"+array[i]._id).value;
      contentPivot = document.getElementById("content"+array[i]._id).value;

    }else {
      var title = "null";
      if (document.getElementById('title'+array[i]._id).value !== null) {
        title = document.getElementById("title"+array[i]._id).value;
      }
      listOfTitles = title+"#"+listOfTitles;
      var content = "null";
      if (document.getElementById('content'+array[i]._id).value !== null) {
        content = document.getElementById("content"+array[i]._id).value;
      }
      listOfContents = content+"#"+listOfContents;
      languageSelected = array[i]._id+"#"+languageSelected;
    }
  }
  if(document.getElementById('check').checked) {
    if (document.getElementById('subSection') != null) {
      var articleID = document.getElementById("subSection").value;
    }else {
      var articleID = "";
    }
  }else {
    var articleID = "";
  }
  if (document.getElementById('optionArticle').value != "NULL") {
    var optionArticle = document.getElementById("optionArticle").value;
  }else {
    var optionArticle = Session.get("articleSelected").option;
  }
  var activated = $('input[name="activation"]:checked').val();
  var article =
    {
      'languagePivot': Session.get("articleSelected").languagePivot,
      'titlePivot' : titlePivot,
      'contentPivot' : contentPivot,
      'languageSelected': languageSelected.substring(0, languageSelected.length-1),
      'titles' : listOfTitles.substring(0, listOfTitles.length-1),
      'contents' : listOfContents.substring(0, listOfContents.length-1),
      'option': optionArticle,
      'activated': activated,
      'subSection': articleID,
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany': Session.get("articleSelected").codeCompany
    };
  return article;
}

Template.updateArticle.rendered = function(){
  checkSession();
  settingLanguage();
  $('#select').hide();
  $('#warning1').hide();
  $('#warning2').hide();
  $('.i-checks').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green'
  });
  $(document).ready(function () {
    $('#check').change(function () {
        if (!this.checked)
           $('#select').hide();
        else
            $('#select').show();
    });
  });
  //$(".select2_demo_2").select2();
  $(".select2_demo_2").select2();
  $(".select2_demo_1").select2();
};
Template.updateArticle.events({
  'click .save'() {
    var article = getValuesFromForm();
    // Edit an article who's in live state
    if(Session.get("LIVE_OR_AUTH") == "LIVE"){
      if (article.titlePivot == null){
        $('#warning1').show();
      }else {
        var art = Session.get("articleSelected");
        article.inputter = Session.get("UserLogged")._id;
        article._id = art._id;
        article.currentNumber = art.currentNumber+1;
        Articles_Authorization.insert(article);
        toastrModificationSaved();
        Router.go('companyArticles');
      }
    }
    // Edit an article who's in authorization state
    if(Session.get("LIVE_OR_AUTH") == "AUTH"){
      if (article.titlePivot == null){
        $('#warning1').show();
      }else {
        var art = Session.get("articleSelected");
        article.inputter = Session.get("UserLogged")._id;
        article._id = art._id;
        article.currentNumber = art.currentNumber+1;
        Articles_Authorization.remove(art._id);
        Articles_Authorization.insert(article);
        toastrModificationSaved();
        Router.go('companyArticles');
      }
    }
  },
  'click .validate'() {
    var article = getValuesFromForm();
    // Edit an article who's in live state
    if(Session.get("LIVE_OR_AUTH") == "LIVE"){
      if (article.titlePivot == null){
        $('#warning1').show();
      }else {
        var art = Session.get("articleSelected");
        article.inputter = Session.get("UserLogged")._id;
        article._id = art._id;
        article.status = "INAU";
        article.currentNumber = art.currentNumber+1;
        Articles_Authorization.insert(article);
        toastrModificationValidated();
        Router.go('companyArticles');
      }
    }
    // Edit an article who's in authorization state
    if(Session.get("LIVE_OR_AUTH") == "AUTH"){
      if (article.titlePivot == null){
        $('#warning1').show();
      }else {
        var art = Session.get("articleSelected");
        article.inputter = Session.get("UserLogged")._id;
        article._id = art._id;
        article.status = "INAU";
        article.currentNumber = art.currentNumber+1;
        Articles_Authorization.remove(art._id);
        Articles_Authorization.insert(article);
        toastrModificationValidated();
        Router.go('companyArticles');
      }
    }
  },
});
Template.updateArticle.helpers({
  articles(){
    // list of articles without subSection (just article list, subsection not included)
    return Session.get("Articles");
  },
  articleEdit (){
    return Session.get("articleSelected");
  },
  languages (){
    return Session.get("LANG");
  },
  options (){
    return Articles_Options_Live.find();
  },
  equals: function(v1, v2) {
    return (v1 == v2);
  },
  notEquals: function(v1, v2) {
    return (v1 != v2);
  },
});
