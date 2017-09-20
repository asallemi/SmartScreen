Meteor.subscribe('currenciesLive');
Meteor.subscribe('currenciesAuthorization');

// This function returns the amount converted from currencyBuy to currencySell
exchangeAmount = function(ccyBuy, buyAmount, ccySell, sellAmount, ccyBase, exchangeRate){
  // exchangeRate == null that's mean we get the exchangeRate from the table Currencies
  if (exchangeRate == null ) {
    if(sellAmount == null){
      var ccy = Currencies_Live.findOne({ "currencyCode": ccySell });
      return (buyAmount * parseFloat(ccy.buyRate)).toFixed(parseInt(ccy.numberOfDecimal));
    }
    if(buyAmount == null){
      var ccy = Currencies_Live.findOne({ "currencyCode": ccyBuy });
      return (sellAmount * parseFloat(ccy.sellRate)).toFixed(parseInt(ccy.numberOfDecimal));
    }
  }else {
    return buyAmount * exchangeRate;
  }
}
function getValuesFromForm(){
  if (document.getElementById('currencyName') != null) {
    var currencyName = document.getElementById("currencyName").value;
  }else {
    var currencyName = null;
  }
  if (document.getElementById('currencyCode') != null) {
    var currencyCode = document.getElementById("currencyCode").value;
  }else {
    var currencyCode = null;
  }
  if (document.getElementById('numericCurrencyCode') != null) {
    var numericCurrencyCode = document.getElementById("numericCurrencyCode").value;
  }else {
    var numericCurrencyCode = null;
  }
  if (document.getElementById('numberOfDecimal') != null) {
    var numberOfDecimal = document.getElementById("numberOfDecimal").value;
  }else {
    var numberOfDecimal = null;
  }
  if (document.getElementById('sellRate') != null) {
    var sellRate = document.getElementById("sellRate").value;
  }else {
    var sellRate = null;
  }
  if (document.getElementById('buyRate') != null) {
    var buyRate = document.getElementById("buyRate").value;
  }else {
    var buyRate = null;
  }
  var isPivot = ($('input[name="isPivot"]:checked').val() == "true");
  var currency =
    {
      'currencyName' : currencyName,
      'currencyCode': currencyCode,
      'isPivot': isPivot,
      'numericCurrencyCode' : numericCurrencyCode,
      'numberOfDecimal': numberOfDecimal,
      'sellRate' : sellRate,
      'buyRate' : buyRate,
      'middleRate' : Math.abs(parseInt(sellRate)+parseInt(buyRate)/2),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany' : Session.get("UserLogged").codeCompany
    };
  return currency;
}
function getValuesFromFormEdit(){
  if (document.getElementById('_currencyName') != null) {
    var currencyName = document.getElementById("_currencyName").value;
  }else {
    var currencyName = null;
  }
  if (document.getElementById('_currencyCode') != null) {
    var currencyCode = document.getElementById("_currencyCode").value;
  }else {
    var currencyCode = null;
  }
  if (document.getElementById('_numericCurrencyCode') != null) {
    var numericCurrencyCode = document.getElementById("_numericCurrencyCode").value;
  }else {
    var numericCurrencyCode = null;
  }
  if (document.getElementById('_numberOfDecimal') != null) {
    var numberOfDecimal = document.getElementById("_numberOfDecimal").value;
  }else {
    var numberOfDecimal = null;
  }
  if (document.getElementById('_sellRate') != null) {
    var sellRate = document.getElementById("_sellRate").value;
  }else {
    var sellRate = null;
  }
  if (document.getElementById('_buyRate') != null) {
    var buyRate = document.getElementById("_buyRate").value;
  }else {
    var buyRate = null;
  }
  var isPivot = ($('input[name="_isPivot"]:checked').val() == "true");
  var currency =
    {
      'currencyName' : currencyName,
      'currencyCode': currencyCode,
      'isPivot': isPivot,
      'numericCurrencyCode' : numericCurrencyCode,
      'numberOfDecimal': numberOfDecimal,
      'sellRate' : sellRate,
      'buyRate' : buyRate,
      'middleRate' : Math.abs(parseInt(sellRate)+parseInt(buyRate)/2),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'codeCompany' : Session.get("UserLogged").codeCompany
    };
  return currency;
}
function getValuesFromFormEditLive(){
  if (document.getElementById('currencyCode_') != null) {
    var currencyCode = document.getElementById("currencyCode_").value;
  }else {
    var currencyCode = null;
  }
  if (document.getElementById('numericCurrencyCode_') != null) {
    var numericCurrencyCode = document.getElementById("numericCurrencyCode_").value;
  }else {
    var numericCurrencyCode = null;
  }
  if (document.getElementById('numberOfDecimal_') != null) {
    var numberOfDecimal = document.getElementById("numberOfDecimal_").value;
  }else {
    var numberOfDecimal = null;
  }
  if (document.getElementById('sellRate_') != null) {
    var sellRate = document.getElementById("sellRate_").value;
  }else {
    var sellRate = null;
  }
  if (document.getElementById('buyRate_') != null) {
    var buyRate = document.getElementById("buyRate_").value;
  }else {
    var buyRate = null;
  }
  var isPivot = ($('input[name="isPivot_"]:checked').val() == "true");
  var currency =
    {
      'currencyName' : Session.get("CurrencySelected").currencyName,
      'currencyCode': currencyCode,
      'isPivot': isPivot,
      'numericCurrencyCode' : numericCurrencyCode,
      'numberOfDecimal': numberOfDecimal,
      'sellRate' : sellRate,
      'buyRate' : buyRate,
      'middleRate' : Math.abs(parseInt(sellRate)+parseInt(buyRate)/2),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': Session.get("CurrencySelected").authorizer,
      'dateTime': getDateNow(),
      'codeCompany' : Session.get("UserLogged").codeCompany
    };
  return currency;
}
function authorize(currency){
  if(currency._id.indexOf("#") > 0){
    currency._id = currency._id.replace("#D", "");
  }
  var currencyX = Currencies_Live.findOne({ "_id" : currency._id });
  // entry validated and new entry
  if(currencyX !== undefined && currency.status == "INAU"){
    currency.status = "LIVE";
    currency.authorizer = Session.get("UserLogged")._id;
    currency.dateTime = getDateNow();
    currencyX.status = 'HIS';
    currencyX.dateTime = getDateNow();
    currencyX.currentNumber = currency.currentNumber;
    currencyX._id = currency._id+"#"+(currency.currentNumber-1);
    Currencies_History.insert(currencyX);
    Currencies_Live.remove(currency._id);
    Currencies_Live.insert(currency);
    Currencies_Authorization.remove(currency._id);
  // Authorise deleting currency
  }else if(currencyX !== undefined && currency.status == "RNAU"){
    currency.authorizer= Session.get("UserLogged")._id;
    currency.status = 'DEL';
    currency.dateTime = getDateNow();
    Currencies_History.insert(currency);
    Currencies_Live.remove(currencyX._id);
    Currencies_Authorization.remove(currency._id);
    Currencies_Authorization.remove(currency._id+"#D");
  }else{
    currency.status = "LIVE";
    currency.authorizer = Session.get("UserLogged")._id;
    currency.dateTime = getDateNow();
    Currencies_Live.insert(currency);
    Currencies_Authorization.remove(currency._id);
  }
}
function verifyDelete(id){
  var currency = Currencies_Authorization.findOne({ "_id" : id+"#D" });
  return currency == undefined;
}
function verifyEdit(id){
  var currency = Currencies_Authorization.findOne({ "_id" : id });
  return currency == undefined;
}
// A global function which returns the pivot currency
getPivotCurrency = function(code){
  return Currencies_Live.findOne({ "codeCompany": code, "isPivot": true });
}
function verifyPivotCurrency(codeCompany){
  var cur = Currencies_Live.findOne({ "codeCompany": codeCompany, "isPivot": true });
  if (cur == undefined) {
    return false;
  }
  return true;
}
// This function updates Company currency pivot when the user fix a pivot currency (this entry should be in authorization state)
function updateCompanyCurrency(currencyId){
  var company = Companies_Live.findOne({ "code": Session.get("UserLogged").codeCompany });
  company.pivotCurrency = currencyId;
  Companies_Authorization.insert(company);
}
Template.currencies.rendered = function(){
  checkSession();
  settingLanguage();
  // Initialize fooTable
  $('.footable').footable();
  $('.footable2').footable();
  $('#warning').hide();
  $('#_warning').hide();
  setTimeout(function () {
    console.log(exchangeAmount("USD", 40, "TND"));
  }, 5000);

};
Template.currencies.events({
  'click .newCurrency'() {
    // To empty all inputs
    $('#currencyName').val("");
    $('#currencyCode').val("");
    $('#numericCurrencyCode').val("");
    $('#numberOfDecimal').val("");
    $('#sellRate').val("");
    $('#buyRate').val("");
    //*******************
    settingLanguage();
    $('#newCurrency').modal();
  },
  'click .save'() {
    var currency = getValuesFromForm();
    if (currency.currencyName.length == 0){
      $('#warning').show();
    }else {
      $('#newCurrency').modal('hide');
      Currencies_Authorization.insert(currency);
      toastrSaveDone();
    }
  },
  'click .validate'() {
    var currency = getValuesFromForm();
    if (currency.currencyName.length == 0){
      $('#warning').show();
    }else {
      $('#newCurrency').modal('hide');
      currency.status = "INAU";
      Currencies_Authorization.insert(currency);
      toastrValidatonDone();
    }
  },
  'click .editAu'() {
    settingLanguage();
    var currency = Currencies_Authorization.findOne({ "_id" : this._id });
    if (userAuthorized(currency.inputter)) {
      Session.set("CurrencySelected", currency);
      $('#editCurrency').modal();
    }else {
      toastrWarningAccessDenied();
    }
  },
  'click .saveUpdate'() {
    var currency = getValuesFromFormEdit();
    if (currency.currencyName.length == 0){
      $('#_warning').show();
    }else {
      $('#editCurrency').modal('hide');
      var ccy = Session.get("CurrencySelected");
      Currencies_Authorization.remove(ccy._id);
      currency._id = ccy._id;
      currency.dateTime = getDateNow();
      Currencies_Authorization.insert(currency);
      toastrModificationSaved();
    }
  },
  'click .validateUpdate'() {
    var currency = getValuesFromFormEdit();
    if (currency.currencyName.length == 0){
      $('#_warning').show();
    }else {
      $('#editCurrency').modal('hide');
      var ccy = Session.get("CurrencySelected");
      Currencies_Authorization.remove(ccy._id);
      currency.status = "INAU";
      currency._id = ccy._id;
      currency.dateTime = getDateNow();
      Currencies_Authorization.insert(currency);
      toastrModificationValidated();
    }
  },
  'click .btn-edit'() {
    var currency = Currencies_Live.findOne({ "_id" : this._id });
    if (verifyEdit(currency._id)){
      settingLanguage();
      Session.set("CurrencySelected", currency);
      $('#editCurrencyLive').modal();
    }else{
      $('#edictState').modal();
    }
  },
  'click .saveUpdateLive'() {
    var currency = getValuesFromFormEditLive();
    var ccy = Session.get("CurrencySelected");
    currency._id = ccy._id;
    currency.currentNumber = ccy.currentNumber + 1;
    currency.dateTime = getDateNow();
    Currencies_Authorization.insert(currency);
    toastrModificationSaved();
  },
  'click .validateUpdateLive'() {
    var currency = getValuesFromFormEditLive();
    var ccy = Session.get("CurrencySelected");
    currency._id = ccy._id;
    currency.currentNumber = ccy.currentNumber + 1;
    currency.status = "INAU";
    currency.dateTime = getDateNow();
    Currencies_Authorization.insert(currency);
    toastrModificationValidated();
  },
  'click .cancelAu'() {
    var currency = Currencies_Authorization.findOne({ "_id" : this._id });
    if (userAuthorized(currency.inputter)) {
      Session.set("deletedCurrencyAu", currency);
      $('#checkCancel').modal();
    }else {
      toastrWarningAccessDenied();
    }
  },
  'click .BtnCancel'() {
    var currency = Session.get("deletedCurrencyAu");
    Currencies_Authorization.remove(currency._id);
    toastrSuppression();
  },
  'click .btn-delete'() {
    var currency = Currencies_Live.findOne({ "_id" : this._id });
    if (verifyDelete(currency._id)){
      $('#checkDeleting').modal();
      Session.set("CurrencyForDelete", currency);
    }else{
      $('#deletionState').modal();
    }
  },
  'click .BtnDelete'() {
    var currency = Session.get("CurrencyForDelete");
    currency._id = currency._id+"#D"
    currency.status = "RNAU";
    currency.inputter = Session.get("UserLogged")._id;
    currency.dateTime = getDateNow();
    currency.authorizer = null;
    Currencies_Authorization.insert(currency);
    toastrSuppression();
  },
  'click .detailsAu'() {
    var currency = Currencies_Authorization.findOne({ "_id" : this._id });
    var usr1 = Users_Live.findOne({ "_id" : currency.inputter });
    var ccy =
      {
        'currencyName' : currency.currencyName,
        'currencyCode': currency.currencyCode,
        'numericCurrencyCode' : currency.numericCurrencyCode,
        'numberOfDecimal': currency.numberOfDecimal,
        'sellRate' : currency.sellRate,
        'buyRate' : currency.buyRate,
        'middleRate' : currency.middleRate,
        'currentNumber': currency.currentNumber,
        'status': currency.status,
        'inputter': usr1.fname+" "+usr1.surname,
        'authorizer': "",
        'dateTime': currency.dateTime,
    };
    Session.set("CurrencyDetails", ccy);
    $('#CurrencyDetails').modal();
  },
  'click .validateAu'() {
    var currency = Currencies_Authorization.findOne({ "_id" : this._id });
    if (userAuthorized(currency.inputter)) {
      Currencies_Authorization.update({'_id' : currency._id }, {'$set':{ 'status' : 'INAU', 'inputter' :  Session.get("UserLogged")._id, 'dateTime' : getDateNow() } });
    }else {
      toastrWarningAccessDenied();
    }
  },
  'click .authorizeAu'() {
    settingLanguage();
    var oldCurrency = Currencies_Live.findOne({ "_id" : this._id });
    var newCurrency = Currencies_Authorization.findOne({ "_id" : this._id });
    if (newCurrency.isPivot == true && verifyPivotCurrency(Session.get("UserLogged").codeCompany) == true && newCurrency._id.indexOf("#D") < 0) {
      toastrCurrencyPivotAlreadyExist();
    }else {
      Session.set("CurrencyAuthorized", newCurrency);
      if(oldCurrency == undefined){
        Session.set("OldCurrency",null);
      }else {
        var inputter = Users_Live.findOne({ "_id" : oldCurrency.inputter });
        oldCurrency.inputter = inputter.fname+" "+inputter.surname;
        var authorizer = Users_Live.findOne({ "_id" : oldCurrency.authorizer });
        oldCurrency.authorizer = authorizer.fname+" "+authorizer.surname;
        Session.set("OldCurrency", oldCurrency);
      }
      var inputter = Users_Live.findOne({ "_id" : newCurrency.inputter });
      newCurrency.inputter = inputter.fname+" "+inputter.surname;
      Session.set("NewCurrency", newCurrency);
      $('#checkAuthorising').modal();
    }
  },
  'click .BtnAuthorize'() {
    var currency = Session.get("CurrencyAuthorized");
    if (currency.isPivot == true) {
      updateCompanyCurrency(currency._id);
    }
    authorize(currency);
    toastrAuthorizationDone();
  },
  'click .btn-details'() {
    var currency = Currencies_Live.findOne({ "_id" : this._id });
    var usr1 = Users_Live.findOne({ "_id" : currency.inputter });
    var usr2 = Users_Live.findOne({ "_id" : currency.authorizer });
    var ccy =
      {
        'currencyName' : currency.currencyName,
        'currencyCode': currency.currencyCode,
        'numericCurrencyCode' : currency.numericCurrencyCode,
        'numberOfDecimal': currency.numberOfDecimal,
        'sellRate' : currency.sellRate,
        'buyRate' : currency.buyRate,
        'middleRate' : currency.middleRate,
        'currentNumber': currency.currentNumber,
        'status': currency.status,
        'inputter': usr1.fname+" "+usr1.surname,
        'authorizer': usr2.fname+" "+usr2.surname,
        'dateTime': currency.dateTime,
    };
    Session.set("CurrencyDetails", ccy);
    $('#CurrencyDetails').modal();
  },
});
Template.currencies.helpers({
  currenciesLive (){
    return Currencies_Live.find({ "codeCompany": Session.get("UserLogged").codeCompany });
  },
  currenciesAuthorization (){
    var currencies = Currencies_Authorization.find({ "codeCompany": Session.get("UserLogged").codeCompany });
    var currenciesAuthorization = [];
    currencies.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var currency =
        {
          '_id' : doc._id,
          'currencyName' : doc.currencyName,
          'currencyCode': doc.currencyCode,
          'isPivot': doc.isPivot,
          'numericCurrencyCode' : doc.numericCurrencyCode,
          'numberOfDecimal': doc.numberOfDecimal,
          'sellRate' : doc.sellRate,
          'buyRate' : doc.buyRate,
          'middleRate' : doc.middleRate,
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
      currenciesAuthorization.push(currency);
    });
    return currenciesAuthorization;
  },
  pivotCurrency (){
    return getPivotCurrency(Session.get("UserLogged").codeCompany);
  },
  currencyDetails(){
    return Session.get("CurrencyDetails");
  },
  currencySelected(){
    return Session.get("CurrencySelected");
  },
  newCurrency() {
    return Session.get("NewCurrency");
  },
  oldCurrency() {
    return Session.get("OldCurrency");;
  },
  company(){
    return Session.get("COMPANY_NAME");
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
