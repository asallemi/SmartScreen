// A function which configure the internationalization
settingLanguage = function(){
  if(Session.get("UserLogged").language != "en" && Session.get("UserLogged").language != "fr" ){
  // First access to the app, language will be "english"
    $.i18n.init({
        resGetPath: 'locales/__lng__.json',
        load: 'unspecific',
        fallbackLng: false,
        lng: 'en'
    }, function (t){
        $('.i18container').i18n();
        $('#side-menu').i18n();
        $('.navbar-top-links').i18n();
        $('.wrapper').i18n();
        $('.modal').i18n();
        $('.center').i18n();
        $('.modal-body').i18n();
        $('.radio').i18n();
        $('.checkbox').i18n();
    });
  }else {
    $.i18n.init({
        resGetPath: 'locales/__lng__.json',
        load: 'unspecific',
        fallbackLng: false,
        lng: Session.get("UserLogged").language
    }, function (t){
        $('.i18container').i18n();
        $('#side-menu').i18n();
        $('.navbar-top-links').i18n();
        $('.wrapper').i18n();
        $('.modal').i18n();
        $('.center').i18n();
        $('.modal-body').i18n();
        $('.radio').i18n();
        $('.checkbox').i18n();
    });
  }
  $('.set_en').on('click', function (){
      i18n.setLng('en', function(){
          $('.i18container').i18n();
          $('#side-menu').i18n();
          $('.navbar-top-links').i18n();
          $('.wrapper').i18n();
          $('.modal').i18n();
          $('.center').i18n();
          $('.modal-body').i18n();
          $('.radio').i18n();
          $('.checkbox').i18n();

          $('.set_en').addClass('active');
          $('.set_fr').removeClass('active');
      });
  });

  $('.set_fr').on('click', function (){
      i18n.setLng('fr', function(){
          $('.i18container').i18n();
          $('#side-menu').i18n();
          $('.navbar-top-links').i18n();
          $('.wrapper').i18n();
          $('.modal').i18n();
          $('.center').i18n();
          $('.modal-body').i18n();
          $('.radio').i18n();
          $('.checkbox').i18n();

          $('.set_fr').addClass('active');
          $('.set_en').removeClass('active');
      });
  });
}
// A function which return true if the date entred in the parameter is greater than the date of now (dateToVerify = yyyy-mm-dd)
checkDate = function(dateToVerify){
  var q = new Date();
  var m = q.getMonth();
  var d = q.getDate();
  var y = q.getFullYear();
  var date = new Date(y,m,d);
  // formating the date to verify in this format yyyy-mm-dd
  var array = dateToVerify.split("/");
  var dateX = array[2]+"-"+array[1]+"-"+array[0];
  mydate = new Date(dateX);
  if (mydate >= date) {
    return true;
  }else {
    return false;
  }
}
// A function which return true if the date entred in the parameter 1 is smaller than the date in param 2  (datesToVerify = yyyy-mm-dd)
checkTwoDates = function(date1 ,date2){
  var array1 = date1.split("/");
  var dateOne = array1[2]+"-"+array1[1]+"-"+array1[0];

  var array2 = date2.split("/");
  var dateTwo = array2[2]+"-"+array2[1]+"-"+array2[0];

  d1 = new Date(dateOne);
  d2 = new Date(dateTwo);
  if (d1 >= d2) {
    return false;
  }else {
    return true;
  }
}
// A function which check the Session
checkSession = function (){
  if(Session.get("SESSION_LOGIN") == null){
    Router.go('login');
  }
}
// Welcome user : dispaly a toastr when user connecte
welcomeUser = function(){
  if(Session.get("Welcome") != null){
    toastr.success(Session.get("UserLogged").fname+" "+Session.get("UserLogged").surname,'Welcome to Smart Screen solution');
    Session.set("Welcome", null);
  }
}
// A function which returns who is connected to the app
whoIsConnected = function (){
  if (Session.get("UserLogged").codeCompany == "swallow-labs") {
    return "swallow-labs";
  }else if (Session.get("UserLogged").codeCompany != "swallow-labs" && Session.get("UserLogged").code == null) {
    return "company";
  }else {
    return "client";
  }
}
nextState = function (status){
  var matrix = Matrix.find({ "state" : status});
  // Array contains all next state of "status"
  var array = [];
  matrix.forEach(function(doc){
    for( var i = 0; i < doc.nextState.length; i++){
      array.push(doc.nextState[i]);
    }
  });
  return array;
}
hideShowButtons = function (array){
  if (array.indexOf("HLD") < 0 ){
    $("#save").hide();
  }
  if (array.indexOf("INAU") < 0 ){
    $("#validate").hide();
  }
  if (array.indexOf("LIVE") < 0 ){
    $("#authorize").hide();
  }
  if (array.indexOf("RNAU") < 0 ){
    $("#delete").hide();
  }
  if (array.indexOf("HLD") >=0 ){
    $("#save").show();
  }
  if (array.indexOf("INAU") >=0 ){
    $("#validate").show();
  }
  if (array.indexOf("LIVE") >=0 ){
    $("#authorize").show();
  }
  if (array.indexOf("RNAU") >=0 ){
    $("#delete").show();
  }
}
getButtonsAu = function (array){
  var button = {
    'validateAu' :false,
    'authorizeAu' :false
  };
  if (array.indexOf("HLD") >= 0 ){
    button.editAu = true;
  }
  if (array.indexOf("INAU") >= 0 ){
    button.validateAu = true;
  }
  if (array.indexOf("LIVE") >= 0 ){
    button.authorizeAu = true;
  }
  if (array.indexOf("RNAU") >= 0 ){
    button.authorizeAu = true;
  }
  if (array.indexOf("HIS") >= 0 ){
    button.authorizeAu = true;
  }
  return button;
}
userAuthorized = function(inputter){
  return Session.get("UserLogged")._id == inputter;
}
encryptPassword = function(password){
  //encrypt/decrypt data with AES using Crypto-JS
  return CryptoJS.AES.encrypt(password, 'SmartScreen').toString();
}
decryptPassword = function (password){
  //encrypt/decrypt data with AES using Crypto-JS
  return CryptoJS.AES.decrypt(password, 'SmartScreen').toString(CryptoJS.enc.Utf8);
}
// A function which returns a boolean value
compare = function(val1, val2){
  if (val1 == true && val1 == true){
    return true;
  }
  if (val1 == true && val1 == false){
    return false;
  }
  if (val1 == true && val1 == null){
    return true;
  }
  if (val1 == false && val1 == true){
    return false;
  }
  if (val1 == false && val1 == false){
    return false;
  }
  if (val1 == false && val1 == null){
    return false;
  }
  if (val1 == null && val1 == true){
    return true;
  }
  if (val1 == null && val1 == false){
    return false;
  }
  if (val1 == null && val1 == null){
    return null;
  }
}
// A function which get in parmameter an array of roles and return a role object
getFinalRole = function(listRoles){
  var role = {
    'accountAdd': listRoles[0].accountAdd,
    'accountUpdate': listRoles[0].accountUpdate,
    'accountDelete': listRoles[0].accountDelete,
    'accountDisplay': listRoles[0].accountDisplay,
    'accountPrint': listRoles[0].accountPrint,
    'accountAuthorize': listRoles[0].accountAuthorize,
    'accountDetails': listRoles[0].accountDetails,
    'contractAdd': listRoles[0].contractAdd,
    'contractUpdate': listRoles[0].contractUpdate,
    'contractDelete': listRoles[0].contractDelete,
    'contractDisplay': listRoles[0].contractDisplay,
    'contractPrint': listRoles[0].contractPrint,
    'contractAuthorize': listRoles[0].contractAuthorize,
    'contractDetails': listRoles[0].contractDetails,
    'articleAdd': listRoles[0].articleAdd,
    'articleUpdate': listRoles[0].articleUpdate,
    'articleDelete': listRoles[0].articleDelete,
    'articleDisplay': listRoles[0].articleDisplay,
    'articlePrint': listRoles[0].articlePrint,
    'articleAuthorize': listRoles[0].articleAuthorize,
    'articleDetails': listRoles[0].articleDetails,
    'articleOptions': listRoles[0].articleOptions,
    'invoiceAdd': listRoles[0].invoiceAdd,
    'invoiceUpdate': listRoles[0].invoiceUpdate,
    'invoiceDelete': listRoles[0].invoiceDelete,
    'invoiceDisplay': listRoles[0].invoiceDisplay,
    'invoicePrint': listRoles[0].invoicePrint,
    'invoiceAuthorize': listRoles[0].invoiceAuthorize,
    'invoiceDetails': listRoles[0].invoiceDetails,
    'clientAdd': listRoles[0].clientAdd,
    'clientUpdate': listRoles[0].clientUpdate,
    'clientDelete': listRoles[0].clientDelete,
    'clientDisplay': listRoles[0].clientDisplay,
    'clientPrint': listRoles[0].clientPrint,
    'clientAuthorize': listRoles[0].clientAuthorize,
    'clientDetails': listRoles[0].clientDetails,
    'clientInvoices': listRoles[0].clientInvoices,
    'clientRoles': listRoles[0].clientRoles,
    'clientUsers': listRoles[0].clientUsers,
    'clientBookings': listRoles[0].clientBookings,
    'clientContracts': listRoles[0].clientContracts,
    'clientContents': listRoles[0].clientContents,
    'currencyAdd': listRoles[0].currencyAdd,
    'currencyUpdate': listRoles[0].currencyUpdate,
    'currencyDelete': listRoles[0].currencyDelete,
    'currencyDisplay': listRoles[0].currencyDisplay,
    'currencyPrint': listRoles[0].currencyPrint,
    'currencyAuthorize': listRoles[0].currencyAuthorize,
    'currencyDetails': listRoles[0].currencyDetails,
    'moduleAdd': listRoles[0].moduleAdd,
    'moduleUpdate': listRoles[0].moduleUpdate,
    'moduleDisplay': listRoles[0].moduleDisplay,
    'moduleDelete': listRoles[0].moduleDelete,
    'modulePrint': listRoles[0].modulePrint,
    'moduleAuthorize': listRoles[0].moduleAuthorize,
    'moduleDetails': listRoles[0].moduleDetails,
    'screenAdd': listRoles[0].screenAdd,
    'screenUpdate': listRoles[0].screenUpdate,
    'screenDelete': listRoles[0].screenDelete,
    'screenDisplay': listRoles[0].screenDisplay,
    'screenPrint': listRoles[0].screenPrint,
    'screenAuthorize': listRoles[0].screenAuthorize,
    'screenDetails': listRoles[0].screenDetails,
    'screenShow': listRoles[0].screenShow,
    'screenSystem': listRoles[0].screenSystem,
    'screenClear': listRoles[0].screenClear,
    'screenMonitor': listRoles[0].screenMonitor,
    'screenActivate': listRoles[0].screenActivate,
    'screenOnOff': listRoles[0].screenOnOff,
    'segmentUpdate': listRoles[0].segmentUpdate,
    'segmentDelete': listRoles[0].segmentDelete,
    'segmentDisplay': listRoles[0].segmentDisplay,
    'segmentPrint': listRoles[0].segmentPrint,
    'segmentAuthorize': listRoles[0].segmentAuthorize,
    'segmentDetails': listRoles[0].segmentDetails,
    'planningAdd': listRoles[0].planningAdd,
    'planningDisplay': listRoles[0].planningDisplay,
    'planningPrint': listRoles[0].planningPrint,
    'planningAuthorize': listRoles[0].planningAuthorize,
    'planningDetails': listRoles[0].planningDetails,
    'tariffAdd': listRoles[0].tariffAdd,
    'tariffUpdate': listRoles[0].tariffUpdate,
    'tariffDelete': listRoles[0].tariffDelete,
    'tariffDisplay': listRoles[0].tariffDisplay,
    'tariffPrint': listRoles[0].tariffPrint,
    'tariffAuthorize': listRoles[0].bookingAuthorize,
    'tariffDetails': listRoles[0].bookingDetails,
    'bookingAdd': listRoles[0].bookingAdd,
    'bookingUpdate': listRoles[0].bookingUpdate,
    'bookingDelete': listRoles[0].bookingDelete,
    'bookingDisplay': listRoles[0].bookingDisplay,
    'bookingPrint': listRoles[0].bookingPrint,
    'bookingAuthorize': listRoles[0].bookingAuthorize,
    'bookingDetails': listRoles[0].bookingDetails,
    'contentAdd': listRoles[0].contentAdd,
    'contentDelete': listRoles[0].contentDelete,
    'contentDisplay': listRoles[0].contentDisplay,
    'contentAuthorize': listRoles[0].contentAuthorize,
    'contentDetails': listRoles[0].contentDetails,
    'contentPrint': listRoles[0].contentPrint,
    'roleAdd': listRoles[0].roleAdd,
    'roleUpdate': listRoles[0].roleUpdate,
    'roleDelete': listRoles[0].roleDelete,
    'roleDisplay': listRoles[0].roleDisplay,
    'rolePrint': listRoles[0].rolePrint,
    'roleAuthorize': listRoles[0].roleAuthorize,
    'roleDetails': listRoles[0].roleDetails,
    'firmwareAdd': listRoles[0].firmwareAdd,
    'firmwareUpdate': listRoles[0].firmwareUpdate,
    'firmwareDelete': listRoles[0].firmwareDelete,
    'firmwareDisplay': listRoles[0].firmwareDisplay,
    'firmwarePrint': listRoles[0].firmwarePrint,
    'firmwareAuthorize': listRoles[0].firmwareAuthorize,
    'firmwareDetails': listRoles[0].firmwareDetails,
    'signatureAdd': listRoles[0].signatureAdd,
    'signatureDelete': listRoles[0].signatureDelete,
    'signatureDisplay': listRoles[0].signatureDisplay,
    'signaturePrint': listRoles[0].signaturePrint,
    'tariffAdd': listRoles[0].tariffAdd,
    'tariffUpdate': listRoles[0].tariffUpdate,
    'tariffDelete': listRoles[0].tariffDelete,
    'tariffDisplay': listRoles[0].tariffDisplay,
    'tariffPrint': listRoles[0].tariffPrint,
    'tariffAuthorize': listRoles[0].tariffAuthorize,
    'tariffDetails': listRoles[0].tariffDetails,
    'companyAdd': listRoles[0].companyAdd,
    'companyUpdate': listRoles[0].companyUpdate,
    'companyDelete': listRoles[0].companyDelete,
    'companyDisplay': listRoles[0].companyDisplay,
    'companyPrint': listRoles[0].companyPrint,
    'companyAuthorize': listRoles[0].companyAuthorize,
    'companyDetails': listRoles[0].companyDetails,
    'companyInvoices': listRoles[0].companyInvoices,
    'companyRoles': listRoles[0].companyRoles,
    'companyUsers': listRoles[0].companyUsers,
    'companySegments': listRoles[0].companySegments,
    'companyContracts': listRoles[0].companyContracts,
    'companyScreens': listRoles[0].companyScreens,
    'companyBookings': listRoles[0].companyBookings,
    'companyContents': listRoles[0].companyContents,
    'companyCurrencies': listRoles[0].companyCurrencies,
    'companyClients': listRoles[0].companyClients,
    'companyTariffs': listRoles[0].companyTariffs,
    'companyFirmwares': listRoles[0].companyFirmwares
  };
  for(var i=1; i<listRoles.length; i++){
    var role = {
      'accountAdd': compare(listRoles[i].accountAdd ,accountAdd),
      'accountUpdate': compare(listRoles[i].accountUpdate, accountUpdate),
      'accountDelete': compare(listRoles[i]. accountDelete, accountDelete),
      'accountDisplay': compare(listRoles[i].accountDisplay, accountDisplay),
      'accountPrint': compare(listRoles[i].accountPrint, accountPrint),
      'accountAuthorize': compare(listRoles[i].accountAuthorize, accountAuthorize),
      'accountDetails': compare(listRoles[i].accountDetails, accountDetails),
      'contractAdd': compare(listRoles[i].contractAdd, contractAdd),
      'contractUpdate': compare(listRoles[i].contractUpdate, contractUpdate),
      'contractDelete': compare(listRoles[i].contractDelete, contractDelete),
      'contractDisplay': compare(listRoles[i].contractDisplay, contractDisplay),
      'contractPrint': compare(listRoles[i].contractPrint, contractPrint),
      'contractAuthorize': compare(listRoles[i].contractAuthorize, contractAuthorize),
      'contractDetails': compare(listRoles[i].contractDetails, contractDetails),
      'articleAdd': compare(listRoles[i].articleAdd, articleAdd),
      'articleUpdate': compare(listRoles[i].articleUpdate, articleUpdate),
      'articleDelete': compare(listRoles[i].articleDelete, articleDelete),
      'articleDisplay': compare(listRoles[i].articleDisplay, articleDisplay),
      'articlePrint': compare(listRoles[i].articlePrint, articlePrint),
      'articleAuthorize': compare(listRoles[i].articleAuthorize, articleAuthorize),
      'articleDetails': compare(listRoles[i].articleDetails, articleDetails),
      'articleOptions': compare(listRoles[i].articleOptions, articleOptions),
      'invoiceAdd': compare(listRoles[i].invoiceAdd, invoiceAdd),
      'invoiceUpdate': compare(listRoles[i].invoiceUpdate, invoiceUpdate),
      'invoiceDelete': compare(listRoles[i].invoiceDelete, invoiceDelete),
      'invoiceDisplay': compare(listRoles[i].invoiceDisplay, invoiceDisplay),
      'invoicePrint': compare(listRoles[i].invoicePrint, invoicePrint),
      'invoiceAuthorize': compare(listRoles[i].invoiceAuthorize, invoiceAuthorize),
      'invoiceDetails': compare(listRoles[i].invoiceDetails, invoiceDetails),
      'clientAdd': compare(listRoles[i].clientAdd, clientAdd),
      'clientUpdate': compare(listRoles[i].clientUpdate, clientUpdate),
      'clientDelete': compare(listRoles[i].clientDelete, clientDelete),
      'clientDisplay': compare(listRoles[i].clientDisplay, clientDisplay),
      'clientPrint': compare(listRoles[i].clientPrint, clientPrint),
      'clientAuthorize': compare(listRoles[i].clientAuthorize, clientAuthorize),
      'clientDetails': compare(listRoles[i].clientDetails, clientDetails),
      'clientInvoices': compare(listRoles[i].clientInvoices, clientInvoices),
      'clientRoles': compare(listRoles[i].clientRoles, clientRoles),
      'clientUsers': compare(listRoles[i].clientUsers, clientUsers),
      'clientBookings': compare(listRoles[i].clientBookings, clientBookings),
      'clientContracts': compare(listRoles[i].clientContracts, clientContracts),
      'clientContents': compare(listRoles[i].clientContents, clientContents),
      'currencyAdd': compare(listRoles[i].currencyAdd, currencyAdd),
      'currencyUpdate': compare(listRoles[i].currencyUpdate, currencyUpdate),
      'currencyDelete': compare(listRoles[i].currencyDelete, currencyDelete),
      'currencyDisplay': compare(listRoles[i].currencyDisplay, currencyDisplay),
      'currencyPrint': compare(listRoles[i].currencyPrint, currencyPrint),
      'currencyAuthorize': compare(listRoles[i].currencyAuthorize, currencyAuthorize),
      'currencyDetails': compare(listRoles[i].currencyDetails, currencyDetails),
      'moduleAdd': compare(listRoles[i].moduleAdd, moduleAdd),
      'moduleUpdate': compare(listRoles[i].moduleUpdate, moduleUpdate),
      'moduleDisplay': compare(listRoles[i].moduleDisplay, moduleDisplay),
      'moduleDelete': compare(listRoles[i].moduleDelete, moduleDelete),
      'modulePrint': compare(listRoles[i].modulePrint, modulePrint),
      'moduleAuthorize': compare(listRoles[i].moduleAuthorize, moduleAuthorize),
      'moduleDetails': compare(listRoles[i].moduleDetails, moduleDetails),
      'screenAdd': compare(listRoles[i].screenAdd, screenAdd),
      'screenUpdate': compare(listRoles[i].screenUpdate, screenUpdate),
      'screenDelete': compare(listRoles[i].screenDelete, screenDelete),
      'screenDisplay': compare(listRoles[i].screenDisplay, screenDisplay),
      'screenPrint': compare(listRoles[i].screenPrint, screenPrint),
      'screenAuthorize': compare(listRoles[i].screenAuthorize, screenAuthorize),
      'screenDetails': compare(listRoles[i].screenDetails, screenDetails),
      'screenShow': compare(listRoles[i].screenShow, screenShow),
      'screenSystem': compare(listRoles[i].screenSystem, screenSystem),
      'screenClear': compare(listRoles[i].screenClear, screenClear),
      'screenMonitor': compare(listRoles[i].screenMonitor, screenMonitor),
      'screenActivate': compare(listRoles[i].screenActivate, screenActivate),
      'screenOnOff': compare(listRoles[i].screenOnOff, screenOnOff),
      'segmentUpdate': compare(listRoles[i].segmentUpdate, segmentUpdate),
      'segmentDelete': compare(listRoles[i].segmentDelete, segmentDelete),
      'segmentDisplay': compare(listRoles[i].segmentDisplay, segmentDisplay),
      'segmentPrint': compare(listRoles[i].segmentPrint, segmentPrint),
      'segmentAuthorize': compare(listRoles[i].segmentAuthorize, segmentAuthorize),
      'segmentDetails': compare(listRoles[i].segmentDetails, segmentDetails),
      'planningAdd': compare(listRoles[i].planningAdd, planningAdd),
      'planningDisplay': compare(listRoles[i].planningDisplay, planningDisplay),
      'planningPrint': compare(listRoles[i].planningPrint, planningPrint),
      'planningAuthorize': compare(listRoles[i].planningAuthorize, planningAuthorize),
      'planningDetails': compare(listRoles[i].planningDetails, planningDetails),
      'tariffAdd': compare(listRoles[i].tariffAdd, tariffAdd),
      'tariffUpdate': compare(listRoles[i].tariffUpdate, tariffUpdate),
      'tariffDelete': compare(listRoles[i].tariffDelete, tariffDelete),
      'tariffDisplay': compare(listRoles[i].tariffDisplay, tariffDisplay),
      'tariffPrint': compare(listRoles[i].tariffPrint, tariffPrint),
      'tariffAuthorize': compare(listRoles[i].bookingAuthorize, bookingAuthorize),
      'tariffDetails': compare(listRoles[i].bookingDetails, bookingDetails),
      'bookingAdd': compare(listRoles[i].bookingAdd, bookingAdd),
      'bookingUpdate': compare(listRoles[i].bookingUpdate, bookingUpdate),
      'bookingDelete': compare(listRoles[i].bookingDelete, bookingDelete),
      'bookingDisplay': compare(listRoles[i].bookingDisplay, bookingDisplay),
      'bookingPrint': compare(listRoles[i].bookingPrint, bookingPrint),
      'bookingAuthorize': compare(listRoles[i].bookingAuthorize, bookingAuthorize),
      'bookingDetails': compare(listRoles[i].bookingDetails, bookingDetails),
      'contentAdd': compare(listRoles[i].contentAdd, contentAdd),
      'contentDelete': compare(listRoles[i].contentDelete, contentDelete),
      'contentDisplay': compare(listRoles[i].contentDisplay, contentDisplay),
      'contentAuthorize': compare(listRoles[i].contentAuthorize, contentAuthorize),
      'contentDetails': compare(listRoles[i].contentDetails, contentDetails),
      'contentPrint': compare(listRoles[i].contentPrint, contentPrint),
      'roleAdd': compare(listRoles[i].roleAdd, roleAdd),
      'roleUpdate': compare(listRoles[i].roleUpdate, roleUpdate),
      'roleDelete': compare(listRoles[i].roleDelete, roleDelete),
      'roleDisplay': compare(listRoles[i].roleDisplay, roleDisplay),
      'rolePrint': compare(listRoles[i].rolePrint, rolePrint),
      'roleAuthorize': compare(listRoles[i].roleAuthorize, roleAuthorize),
      'roleDetails': compare(listRoles[i].roleDetails, roleDetails),
      'firmwareAdd': compare(listRoles[i].firmwareAdd, firmwareAdd),
      'firmwareUpdate': compare(listRoles[i].firmwareUpdate, firmwareUpdate),
      'firmwareDelete': compare(listRoles[i].firmwareDelete, firmwareDelete),
      'firmwareDisplay': compare(listRoles[i].firmwareDisplay, firmwareDisplay),
      'firmwarePrint': compare(listRoles[i].firmwarePrint, firmwarePrint),
      'firmwareAuthorize': compare(listRoles[i].firmwareAuthorize, firmwareAuthorize),
      'firmwareDetails': compare(listRoles[i].firmwareDetails, firmwareDetails),
      'signatureAdd': compare(listRoles[i].signatureAdd, signatureAdd),
      'signatureDelete': compare(listRoles[i].signatureDelete, signatureDelete),
      'signatureDisplay': compare(listRoles[i].signatureDisplay, signatureDisplay),
      'signaturePrint': compare(listRoles[i].signaturePrint, signaturePrint),
      'tariffAdd': compare(listRoles[i].tariffAdd, tariffAdd),
      'tariffUpdate': compare(listRoles[i].tariffUpdate, tariffUpdate),
      'tariffDelete': compare(listRoles[i].tariffDelete, tariffDelete),
      'tariffDisplay': compare(listRoles[i].tariffDisplay, tariffDisplay),
      'tariffPrint': compare(listRoles[i].tariffPrint, tariffPrint),
      'tariffAuthorize': compare(listRoles[i].tariffAuthorize, tariffAuthorize),
      'tariffDetails': compare(listRoles[i].tariffDetails, tariffDetails),
      'companyAdd': compare(listRoles[i].companyAdd, companyAdd),
      'companyUpdate': compare(listRoles[i].companyUpdate, companyUpdate),
      'companyDelete': compare(listRoles[i].companyDelete, companyDelete),
      'companyDisplay': compare(listRoles[i].companyDisplay, companyDisplay),
      'companyPrint': compare(listRoles[i].companyPrint, companyPrint),
      'companyAuthorize': compare(listRoles[i].companyAuthorize, companyAuthorize),
      'companyDetails': compare(listRoles[i].companyDetails, companyDetails),
      'companyInvoices': compare(listRoles[i].companyInvoices, companyInvoices),
      'companyRoles': compare(listRoles[i].companyRoles, companyRoles),
      'companyUsers': compare(listRoles[i].companyUsers, companyUsers),
      'companySegments': compare(listRoles[i].companySegments, companySegments),
      'companyContracts': compare(listRoles[i].companyContracts, companyContracts),
      'companyScreens': compare(listRoles[i].companyScreens, companyScreens),
      'companyBookings': compare(listRoles[i].companyBookings, companyBookings),
      'companyContents': compare(listRoles[i].companyContents, companyContents),
      'companyCurrencies': compare(listRoles[i].companyCurrencies, companyCurrencies),
      'companyClients': compare(listRoles[i].companyClients, companyClients),
      'companyTariffs': compare(listRoles[i].companyTariffs, companyTariffs),
      'companyFirmwares': compare(listRoles[i].companyFirmwares, companyFirmwares)
     };
   }
  return role;
}
// A function which get in parmameter a user role (can be separated by "#" in case the user have more than role) and return an array of roles
getListOfRoles = function(roles){
  var res = roles.split("*");
  var role;
  var listRoles = [];
  if( res.length == 1){
    role = Roles_Live.findOne({ "_id" : roles });
    listRoles.push(role);
  }else{
    for(var i=0; i < res.length; i++){
      var role = Roles_Live.findOne({ "_id" : res[i] });
      listRoles.push(role);
    }
  }
  return listRoles;
}
// Function verify two boolean value (used in testRoles())
verify = function (val1 , val2){
  if( (val1 == true && val2 == false) || (val2 == true && val1 == false)){
    return false
  }
  return true;
}
// A function which returns true if the combined roles hasn't a problem
testRoles = function (roles){
  var actions = [ 'accountAdd', 'accountUpdate', 'accountDelete','accountDisplay', 'accountPrint', 'accountValidate', 'invoiceAdd',
  'invoiceUpdate', 'invoiceDelete', 'invoiceDisplay', 'invoicePrint','invoiceValidate', 'clientAdd', 'clientUpdate', 'clientDelete',
  'clientDisplay', 'clientPrint', 'clientAccountManagment', 'clientValidate', 'screenActivation', 'screenDelete', 'screenDisplay', 'screenPrint',
  'screenONOFF', 'screenClear', 'screenMonitoring', 'screenValidator', 'screenUpdate', 'screenShow', 'screenUpdateSystem', 'segmentAffect', 'segmentUpdate',
  'segmentDelete', 'segmentPrint', 'segmentDisplay', 'segmentValidate', 'tariffAdd', 'tariffUpdate', 'tariffDelete', 'tariffPrint', 'tariffAffect',
  'tariffValidator', 'bookingAdd', 'bookingUpdate', 'bookingDelete','bookingDisplay', 'bookingPrint', 'bookingValidate', 'contentAdd',
  'contentDelete', 'contentDisplay', 'contentValidate', 'roleAdd', 'roleDelete', 'roleUpdate', 'roleDisplay', 'rolePrint', 'roleValidate',
  'articleAdd', 'articleUpdate', 'articleDelete', 'articleDisplay', 'articlePrint', 'articleAffect', 'articleValidate','signatureAdd', 'signatureValidate',
  'firmwareAdd', 'firmwareUpdate', 'firmwareDelete', 'firmwareDisplay', 'firmwarePrint', 'firmwareValidate'];
  var actionArray = [ 'Account Add', 'Account Update', 'Account Delete','Account Display', 'Account Print', 'Account Validate', 'Invoice Add',
  'Invoice Update', 'Invoice Delete', 'Invoice Display', 'Invoice Print', 'Invoice Sign', 'Invoice Validate', 'Client Add', 'Client Update', 'Client Delete',
  'Client Display', 'Client Print', 'Client Account Managment', 'Client Validate', 'Screen Activation', 'Screen Delete', 'Screen Display', 'Screen Print',
  'Screen ON/OFF', 'Screen Clear', 'Screen Monitoring', 'Screen Validator', 'Screen Update', 'Screen Show', 'Screen Update System', 'Segment Affect', 'Segment Update',
  'Segment Delete', 'Segment Print', 'Segment Display', 'Segment Validate', 'Tariff Add', 'Tariff Update', 'Tariff Delete', 'Tariff Print', 'Tariff Affect',
  'Tariff Validator', 'Booking Add', 'Booking Update', 'Booking Delete','Booking Display', 'Booking Print', 'Booking Validate', 'Content Add',
  'Content Delete', 'Content Display', 'Content Validate', 'Role Add', 'Role Delete', 'Role Update', 'Role Display', 'Role Print', 'Role Validate',
  'Article Add', 'Article Update', 'Article Delete', 'Article Display', 'Article Print', 'Article Affect', 'Article Validate','Signature Add', 'Signature Validate',
  'Firmware Add', 'Firmware Update', 'Firmware Delete', 'Firmware Display', 'Firmware Print', 'Firmware Validate'];
  var roles = getListOfRoles(roles);
  var warnings = [];
  for(var x=0; x < roles.length; x++){
    var role = roles[x];
    for(var i=x+1; i < roles.length; i++){
      var nextRole = roles[i];
      for(var j=0; j < actions.length; j++){
        if( ! verify(role[actions[j]], nextRole[actions[j]]) ){
          var obj = {};
          obj.message = actionArray[j];
          warnings.push(obj);
        }
      }
    }
  }
  if(warnings.length > 0){
    Session.set("Warnings",warnings)
    return false;
  }
  return true;
}
// return the date of now (used when we need to add/update/delete an entry)
getDateNow = function(){
  var date = new Date();
  date.setHours(date.getHours()+1);
  return date.toISOString().slice(0,19).replace("T"," ");
}
// return an ID in date format + random string
generateDateID = function(){
  var array = getDateNow().split(/[- :]/);
  return array[0]+array[1]+array[2]+array[3]+array[4]+array[5]+Random.id(2);
}
// returns the value of BUTTON Title according to the language of user connected
updateTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Update";
  }else {
    return "Modifier";
  }
}
deleteTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Delete";
  }else {
    return "Supprimer";
  }
}
validateTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Validate";
  }else {
    return "Valider";
  }
}
authorizeTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Authorize";
  }else {
    return "Autoriser";
  }
}
detailsTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Details";
  }else {
    return "Détails";
  }
}
printTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Print";
  }else {
    return "Imprimer";
  }
}
rolesTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Roles";
  }else {
    return "Rôles";
  }
}
usersTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Users";
  }else {
    return "Utilisateurs";
  }
}
clientsTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Clients";
  }else {
    return "Clients";
  }
}
contractsTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Contracts";
  }else {
    return "Contrats";
  }
}
articlesTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Articles";
  }else {
    return "Articles";
  }
}
screensTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Screens";
  }else {
    return "Ecrans";
  }
}
currenciesTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Currencies";
  }else {
    return "Devises";
  }
}
contentsTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Contents";
  }else {
    return "Contenus";
  }
}
bookingsTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Bookings";
  }else {
    return "Réservations";
  }
}
segmentsTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Segments";
  }else {
    return "Créneaux";
  }
}
firmwaresTitle = function(){
  if(Session.get("UserLogged").language == "en"){
    return "Firmwares";
  }else {
    return "Firmwares";
  }
}
