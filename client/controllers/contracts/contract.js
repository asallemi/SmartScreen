let handle = Meteor.subscribe('clientsLive');
// A function which returns the amount converted to the currency puted in arguments
calculAmount = function(articles, currency, rate, codeCompany){
  var sumOfAmounts = 0;
  var sumOfPercents = 0;
  for (var i = 0; i < articles.length; i++) {
    var article = Articles_Live.findOne({ "_id" : articles[i] });
    var option = Articles_Options_Live.findOne({ "_id" : article.option });
    // Summit the amounts and the discounts
    if (article.option.length > 0) {
      if (option.type == "Amount") {
        sumOfAmounts = sumOfAmounts + parseFloat(option.value);
      }
      if (option.type == "Percent") {
        sumOfPercents = sumOfPercents + parseFloat(option.value);
      }
    }
  }
  var finalSum = 0;
  if (sumOfPercents > 0) {
    //console.log("FINAL SUM WITH % ", finalSum);
    finalSum = sumOfAmounts-(sumOfAmounts*sumOfPercents/100);
  }else {
    finalSum = sumOfAmounts;
  }
  //console.log("FINAL SUM -> ", finalSum, "  FROM  ", getPivotCurrency(codeCompany).currencyCode, "TO  ",currency, " RATE  ", rate);
  if(currency == getPivotCurrency(codeCompany).currencyCode){
    return finalSum;
  }else {
    // exchangeAmount is an global function put in currencies.js file
    return exchangeAmount(getPivotCurrency(codeCompany).currencyCode, finalSum, currency, null, getPivotCurrency(codeCompany).currencyCode, rate)
  }
}
function getValuesFromForm(){
  var clientsID = "";
  if(Session.get("CLIENT_NUMBER") == 1){
    if (document.getElementById(1+'XXX') != null) {
      var ID = document.getElementById(1+'XXX').value;
    }else {
      var ID = "";
    }
    clientsID = ID;
  }else {
    for (var i = 1; i <= Session.get("CLIENT_NUMBER"); i++) {
      var ID = document.getElementById(i+'XXX').value;
      clientsID = clientsID+ID+"#";
    }
  }
  if (document.getElementById('typeContract') != null) {
    var typeContractID = document.getElementById("typeContract").value;
  }else {
    var typeContractID = "";
  }
  if (document.getElementById('startDate') != null) {
    var startDate = document.getElementById("startDate").value;
  }else {
    var startDate = "";
  }
  if (document.getElementById('endDate') != null) {
    var endDate = document.getElementById("endDate").value;
  }else {
    var endDate = "";
  }
  // The user can force the exchangeRate by entering a specific rate from the form.
  var rate = null;
  if ( Session.get("RATE").length > 0 ) {
    rate = parseFloat(Session.get("RATE"));
  }
  // Convert the JSON to an array and concatenate all selected articles IDs
  var array = JSON.parse(Session.get("SELECTED"));
  var amount = 0;
  var articlesID = "";
  if (array.length > 0) {
    amount = calculAmount(array, Session.get("CONTRACT_CURRENCY"), rate, Session.get("UserLogged").codeCompany);
    for (var i = 0; i < array.length; i++) {
      articlesID = articlesID + array[i]+"#";
    }
  }
  var responsibles = Session.get("LIST_RESPONSIBLE");
  if (responsibles.length > 17) {
    responsibles = responsibles.substring(0, responsibles.length-1)
  }
  if (clientsID.length > 17) {
    clientsID = clientsID.substring(0, clientsID.length-1)
  }

  var contract =
    {
      '_id': generateDateID(),
      'client' : clientsID,
      'responsibles' : responsibles,
      'typeContract' : typeContractID,
      'startDate': startDate,
      'endDate': endDate,
      'language': Session.get("LANGUAGE"),
      'amount': amount,
      'currency': Session.get("CONTRACT_CURRENCY"),
      'rateExchange': rate,
      'clientNumber': Session.get("CLIENT_NUMBER"),
      'articlesList': articlesID.substring(0, articlesID.length-1),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany': Session.get("UserLogged").codeCompany
    };
  return contract;
}

/*function CurrencyConvetor(amount, from, to) {
  var result = '';
  var url = "https://www.google.com/finance/converter?a=" + amount + "&from=" + from + "&to=" + to;
  $.ajaxSetup({async: false});
  $.get(url,
      function (data) {
          var startPos = data.search('<div id=currency_converter_result>');
          var endPos = data.search('<input type=submit value="Convert">');
          if (startPos > 0) {
              result = data.substring(startPos, endPos);
              result = result.replace('<div id=currency_converter_result>', '');
              result = result.replace('<span class=bld>', '');
              result = result.replace('</span>', '');
          }
  })
  return result;
}*/
function hasDuplicatesClientsID(array) {
    var valuesSoFar = [];
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (valuesSoFar.indexOf(value) !== -1) {
            return true;
        }
        valuesSoFar.push(value);
    }
    return false;
}
Template.contract.rendered = function(){
  checkSession();
  Session.set("LANGUAGE", Session.get("CONFIGURATION").language);
  Session.set("CONTRACT_CURRENCY", Session.get("CONFIGURATION").currency);
  Session.set("CLIENT_NUMBER", Session.get("CONFIGURATION").clientsNumber);
  Session.set("RATE", Session.get("CONFIGURATION").rate);
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
  toastr.options = {
    "closeButton": true
  };
  $(document).ready(function () {
    $('#check').change(function () {
      if (!this.checked){
        $('#select1').show();
        $('#select2').hide();
      }else {
        $('#select2').show();
        $('#select1').hide();
      }
    });
  });
  //$(".select2_demo_2").select2();
  $(".select2_demo_2").select2();
  $(".select2_demo_1").select2();
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
  // initialize the session (else a problem in the helper will be generated)
  Session.set("USER_RESPONSIBLE", null);
  // This session will contains all responsibles of client when the admin select them
  Session.set("LIST_RESPONSIBLE", "");
  // Display users in each client selection
  $('.select').on('change', function() {
    var client = Clients_Live.findOne({ "_id": this.value }); // this.value contains Client ID
    if (client != undefined) {
      var users = Users_Live.find({ "code": client.code });

      if (users.count() == 0) {
        Session.set("USER_RESPONSIBLE", null);
        $('#warning').modal();
      }else {
        $('#selectUser').modal();
        var usersList = [];
        users.forEach(function(doc){
          var user = {
            '_id': doc._id,
            'fname': doc._id,
            'fname': doc.fname,
            'surname': doc.surname
          };
          usersList.push(user);
        });
        Session.set("USER_RESPONSIBLE", usersList);
      }
      Session.set("CLIENT_SELECTED", client.name);
    }
  });
};

Template.contract.events({
  'click .validateResponsable'() {
    var listOfRes = Session.get("LIST_RESPONSIBLE");
    var ID = $('input[name="user"]:checked').val();
    listOfRes = listOfRes+"#"+ID;
    Session.set("LIST_RESPONSIBLE", listOfRes);
  },
  'click .save'() {
    //alert(CurrencyConvetor(222, "EUR", "USD"));
    var contract = getValuesFromForm();
    var result = 0;
    var array = contract.client.split("#");
    for (var i = 0; i < array.length; i++) {
      if (array[i].length > 0) {
        result++;
      }
    }
    if (result < Session.get("CLIENT_NUMBER")){
      toastrStillClientNotSelected();
    }else {
      Contracts_Authorization.insert(contract);
      toastrValidatonDone();
      Router.go('allContracts');
    }
  },
  'click .validate'() {
    var contract = getValuesFromForm();
    var result = 0;
    var array = contract.client.split("#");
    for (var i = 0; i < array.length; i++) {
      if (array[i].length > 0) {
        result++;
      }
    }
    if (result < Session.get("CLIENT_NUMBER")){
      toastrStillClientNotSelected();
    }else if (hasDuplicatesClientsID(array)) {
      toastrContractClientRepeated();
    }else {
      contract.status = "INAU";
      Contracts_Authorization.insert(contract);
      toastrValidatonDone();
      Router.go('allContracts');
    }
  },
});
Template.contract.helpers({
  articles(){
    // list of articles without subSection (just article list, subsection not included)
    var articles = Articles_Live.find({ "codeCompany": Session.get("UserLogged").codeCompany }).fetch();
    var articlesLive = [];
    for (var i = 0; i < articles.length; i++) {
      if (articles[i].subSection.length == 0 && articles[i].activated == true){
        var article = {
            '_id' : articles[i]._id,
            'title': articles[i].titlePivot,
          };
        articlesLive.push(article);
      }
    }
    return articlesLive;
  },
  numberOfArticles(){
    return Session.get("NumberOfArticles");
  },
  users(){
    return Session.get("USER_RESPONSIBLE");
  },
  clientSelected(){
    return Session.get("CLIENT_SELECTED");
  },
  clients(){
    return Clients_Live.find({ "codeCompany": Session.get("UserLogged").codeCompany });
  },
  configuration(){
    return Session.get("CONFIGURATION");
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
