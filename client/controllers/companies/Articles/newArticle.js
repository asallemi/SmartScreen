Meteor.subscribe('articlesLive');
Meteor.subscribe('articlesAuthorization');

function getValuesFromForm(){
  var array = Session.get("LANGUAGES_SELECTED");
  var listOfTitles = "";
  var listOfContents = "";
  var titlePivot = "";
  var contentPivot = "";
  for (var i = 0; i < array.length; i++) {
    // if language is a pivot, so we'll get the title and the content into "titlePivot" and "contentPivot"
    if (array[i].isPivot == true) {
      titlePivot = document.getElementById("title"+array[i]._id).value;
      contentPivot = document.getElementById("content"+array[i]._id).value
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
  if (document.getElementById('optionArticle') != null) {
    var optionArticle = document.getElementById("optionArticle").value;
  }else {
    var optionArticle = "";
  }
  var activated = $('input[name="activation"]:checked').val();
  var article =
    {
      'languagePivot': Session.get("LANGUAGE_PIVOT"),
      'titlePivot' : titlePivot,
      'contentPivot' : contentPivot,
      'languageSelected': Session.get("LIST_LANGUAGES"),
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
      'codeCompany': Session.get("COMPANY_CODE")
    };
  return article;
}

Template.newArticle.rendered = function(){
  checkSession();
  settingLanguage();
  $('#select').hide();
  $('#warning1').hide();
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
  var languages = Languages_Live.find();
  languages.forEach(function(doc){
    if (doc.isPivot == true ) {
      Session.set("LANGUAGE_PIVOT", doc._id);
    }
  });
};
Template.newArticle.events({
  'click .save'() {
    $('#warning1').hide();
    var article = getValuesFromForm();
    if (article.titlePivot.length == 0){
      $('#warning1').show();
    }else {
      Articles_Authorization.insert(article);
      toastrSaveDone();
      Router.go('companyArticles');
    }
  },
  'click .validate'() {
    $('#warning1').hide();
    var article = getValuesFromForm();
    if (article.titlePivot.length == 0){
      $('#warning1').show();
    }else {
      article.status = "INAU";
      Articles_Authorization.insert(article);
      toastrValidatonDone();
      Router.go('companyArticles');
    }
  },
});
Template.newArticle.helpers({
  articles(){
    // list of articles without subSection (just article list, subsection not included)
    return Session.get("Articles");
  },
  languages (){
    return Session.get("LANGUAGES_SELECTED");
  },
  options (){
    return Articles_Options_Live.find({ "codeCompany": Session.get("COMPANY_CODE") });
  },
  equals: function(v1, v2) {
    return (v1 == v2);
  },
});
