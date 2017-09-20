let handle = Meteor.subscribe('clientsLive');

function getValuesFromForm(){
  console.log(document.getElementById("typeContract").value.length);
  if (document.getElementById('typeContract') != null && document.getElementById("typeContract").value.length>1) {
    var typeContractID = document.getElementById("typeContract").value;
  }else {
    var typeContractID = Session.get("contractSelected").typeContract;
  }
  if (document.getElementById('startDate') != null) {
    var startDate = document.getElementById("startDate").value;
  }else {
    var startDate = Session.get("contractSelected").startDate;
  }
  if (document.getElementById('endDate') != null) {
    var endDate = document.getElementById("endDate").value;
  }else {
    var endDate = Session.get("contractSelected").endDate;
  }
  if (document.getElementById('amount') != null) {
    var amount = document.getElementById("amount").value;
  }else {
    var amount = 0;
  }
  // Convert the JSON to an array and concatenate all selected articles IDs
  if (Session.get("SELECTED") != undefined) {
    var array = JSON.parse(Session.get("SELECTED"));
    var amount = 0;
    var articlesID = "";
    if (array.length > 0) {
      amount = calculAmount(array, Session.get("contractSelected").currency, Session.get("contractSelected").rateExchange, Session.get("UserLogged").codeCompany);
      for (var i = 0; i < array.length; i++) {
        articlesID = articlesID + array[i]+"#";
      }
    }
  }else {
    var amount = Session.get("contractSelected").amount;
  }

  var d = new Date().toString();
  var res = d.split(" ");
  var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var contract =
    {
      '_id': Session.get("contractSelected")._id,
      'client' : Session.get("contractSelected").client,
      'responsibles' : Session.get("contractSelected").responsibles,
      'typeContract' : typeContractID,
      'startDate': startDate,
      'endDate': endDate,
      'articlesList': articlesID,
      'language': Session.get("contractSelected").language,
      'amount': amount,
      'currency': Session.get("contractSelected").currency,
      'rateExchange': Session.get("contractSelected").rateExchange,
      'clientNumber': Session.get("contractSelected").clientNumber,
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany': Session.get("UserLogged").codeCompany
    };
  return contract;
}
// A function wich fills "SELECT" session (to get all articles selected by the user)
function getSelectedArticles(){
  var notSelected = [];
  var selected = [];
  $("#notSelected, #selected").sortable({
      connectWith: ".connectList",
      update: function( event, ui ) {
          notSelected = $( "#notSelected" ).sortable( "toArray" );
          selected = $( "#selected" ).sortable( "toArray" );
          $('.output').html("ToDo: " + window.JSON.stringify(notSelected) + "<br/>" + "In Progress: " + window.JSON.stringify(selected) + "<br/>");
          Session.set("SELECTED", window.JSON.stringify(selected));
      }
  }).disableSelection();
}
Template.editContract.rendered = function(){
  checkSession();
  settingLanguage();
  $('#warning1').hide();
  $('#select2').hide();
  $('#data_1 .input-group.date').datepicker({
      todayBtn: "linked",
      format: "dd/mm/yyyy",
      keyboardNavigation: false,
      forceParse: false,
      calendarWeeks: true,
      autoclose: true
  });
  //$(".select2_demo_2").select2();
  $(".select2_demo_2").select2();
  $(".select2_demo_1").select2();
  getSelectedArticles();
};
Template.editContract.events({
  'click .articleDetails'() {
    console.log(this._id);
  },
  'click .save'() {
    var contract = getValuesFromForm();
    Contracts_Authorization.remove(contract._id);
    Contracts_Authorization.insert(contract);
    toastrSaveDone();
    Router.go('allContracts');
  },
  'click .validate'() {
    var contract = getValuesFromForm();
    Contracts_Authorization.remove(contract._id);
    contract.status = "INAU";
    Contracts_Authorization.insert(contract);
    toastrValidatonDone();
    Router.go('allContracts');
  },
});
Template.editContract.helpers({
  articles(){
    // list of articles without subSection (just article list, subsection not included)
    return Session.get("Articles");
  },
  contractEdit (){
    return Session.get("contractSelected");
  },
  numberOfArticles(){
    return Session.get("NumberOfArticles");
  },
  clts(){
    return Session.get("CLIENTS");
  },
  selectedArticles(){
    return Session.get("ARTICLES_SELECTED");
  },
  notSelectedArticles(){
    return Session.get("ARTICLES_NOT_SELECTED");
  },
  equals: function(v1, v2) {
    return (v1 == v2);
  },
  verify: function(v1, v2) {
    return (v1 == 0);
  },
  loopCount: function(count){
    var countArr = [];
    for (var i=1; i<=count; i++){
      countArr.push({index: i});
    }
    return countArr;
  },
});
