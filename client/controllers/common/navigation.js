let clientsLive = Meteor.subscribe('clientsLive');
let rolesLive = Meteor.subscribe('roles');
Template.navigation.onCreated(function () {
  /*var user =
  {
    "_id" : "iEhwLMXKYuscmz948",
    "fname" : "Akrem",
    "surname" : "Sallemi",
    "legalIdentifier" : "11860468",
    "dateOfBirth" : "13/11/1991",
    "phone" : "+21620710978",
    "address" : "Sfax centre",
    "email" : "akrem.sallemi@administration.com",
    "password" : "U2FsdGVkX19z0xuVAlFgiaTYheSlr3kjxuhKMcRmB2s=",
    "photo" : "/public/upload/users/1001",
    "language": "fr",
    "roles" : "iRQTEZLRoM",
    "currentNumber" : 0,
    "status" : "LIVE",
    "inputter" : "test",
    "authorizer" : "Akrem Sallemi",
    "code" : "0000"
  };
  Session.set("UserLogged", user);
  ///        a static role for testing         //
  var role = {
      'accountAdd': true,
      'accountUpdate':  true,
      'accountDelete':  true,
      'accountDisplay':  true,
      'accountPrint':  true,
      'accountValidate':  true,
      'contractAdd':  true,
      'contractUpdate':  true,
      'contractDelete':  true,
      'contractDisplay':  true,
      'contractPrint':  true,
      'contractValidate':  true,
      'contractSign':  true,
      'articleAdd':  true,
      'articleUpdate':  true,
      'articleDelete':  true,
      'articleDisplay':  true,
      'articlePrint':  true,
      'articleValidate':  true,
      'invoiceAdd':  true,
      'invoiceUpdate':  true,
      'invoiceDelete':  true,
      'invoiceDisplay':  true,
      'invoicePrint':  true,
      'invoiceValidate':  true,
      'clientAdd':  true,
      'clientUpdate':  true,
      'clientDelete':  true,
      'clientDisplay':  true,
      'clientPrint':  true,
      'clientValidate': true,
      'clientAccountManagement': true,
      'screenUpdate':  true,
      'screenDelete':  true,
      'screenDisplay':  true,
      'screenPrint':  true,
      'screenValidate':  true,
      'screenShow':  true,
      'screenUpdateSystem':  true,
      'screenClear':  true,
      'screenMonitor':  true,
      'screenActivate':  true,
      'screenOnOff':  true,
      'segmentUpdate':  true,
      'segmentDelete':  true,
      'segmentDisplay':  true,
      'segmentPrint':  true,
      'segmentAffect':  true,
      'segmentValidate':  true,
      'tariffAdd':  true,
      'tariffUpdate':  true,
      'tariffDelete':  true,
      'tariffDisplay':  true,
      'tariffPrint':  true,
      'tariffAffect':  true,
      'tariffValidate':  true,
      'bookingAdd':  true,
      'bookingUpdate':  true,
      'bookingDelete':  true,
      'bookingDisplay':  true,
      'bookingPrint':  true,
      'bookingValidate':  true,
      'contentAdd':  true,
      'contentDelete':  true,
      'contentDisplay':  true,
      'roleUpdate':  true,
      'roleDelete':  true,
      'roleDisplay':  true,
      'rolePrint':  true,
      'roleAffect':  true,
      'roleValidate':  true,
      'firmwareAdd':  true,
      'firmwareUpdate':  true,
      'firmwareDelete':  true,
      'firmwareDisplay':  true,
      'firmwarePrint':  true,
      'firmwareAffect':  true,
      'firmwareValidate':  true,
      'signatureAdd':  true,
      'signatureValidate':  true
    };
  Session.set("USER_ROLE_XX",role);*/

  console.log(localStorage.getItem("User"));
  var user = JSON.parse(localStorage.getItem("User"));
  var user =
  {
    "_id" : user._id,
    "fname" : user.fname,
    "surname" : user.surname,
    "legalIdentifier" : user.legalIdentifier,
    "email" : user.email,
    "password" : user.password,
    "photo" : user.photo,
    "language" : user.language,
    "codeCompany" : user.codeCompany,
    "code" : user.code
  };
  Session.set("UserLogged", user);
  console.log("User ->", user );
  var role = JSON.parse(localStorage.getItem("Role"));
  var roleX = {
      'accountAdd': role.accountAdd,
      'accountUpdate':  role.accountUpdate,
      'accountDelete':  role.accountDelete,
      'accountDisplay':  role.accountDisplay,
      'accountPrint':  role.accountPrint,
      'accountValidate':  role.accountValidate,
      'contractAdd':  role.contractAdd,
      'contractUpdate':  role.contractUpdate,
      'contractDelete':  role.contractDelete,
      'contractDisplay':  role.contractDisplay,
      'contractPrint':  role.contractPrint,
      'contractValidate':  role.contractValidate,
      'contractSign':  role.contractSign,
      'articleAdd':  role.articleAdd,
      'articleUpdate':  role.articleUpdate,
      'articleDelete':  role.articleDelete,
      'articleDisplay':  role.articleDisplay,
      'articlePrint':  role.articlePrint,
      'articleValidate':  role.articleValidate,
      'invoiceAdd':  role.invoiceAdd,
      'invoiceUpdate':  role.invoiceUpdate,
      'invoiceDelete':  role.invoiceDelete,
      'invoiceDisplay':  role.invoiceDisplay,
      'invoicePrint':  role.invoicePrint,
      'invoiceValidate':  role.invoiceValidate,
      'clientAdd':  role.clientAdd,
      'clientUpdate':  role.clientUpdate,
      'clientDelete':  role.clientDelete,
      'clientDisplay':  role.clientDisplay,
      'clientPrint':  role.clientPrint,
      'clientValidate': role.clientValidate,
      'clientAccountManagement': role.clientAccountManagement,
      'screenUpdate':  role.screenUpdate,
      'screenDelete':  role.screenDelete,
      'screenDisplay':  role.screenDisplay,
      'screenPrint':  role.screenPrint,
      'screenValidate':  role.screenValidate,
      'screenShow':  role.screenShow,
      'screenUpdateSystem':  role.screenUpdateSystem,
      'screenClear':  role.screenClear,
      'screenMonitor':  role.screenMonitor,
      'screenActivate':  role.screenActivate,
      'screenOnOff':  role.screenOnOff,
      'segmentUpdate':  role.segmentUpdate,
      'segmentDelete':  role.segmentDelete,
      'segmentDisplay':  role.segmentDisplay,
      'segmentPrint':  role.segmentPrint,
      'segmentAffect':  role.segmentAffect,
      'segmentValidate':  role.segmentValidate,
      'tariffAdd':  role.tariffAdd,
      'tariffUpdate':  role.tariffUpdate,
      'tariffDelete':  role.tariffDelete,
      'tariffDisplay':  role.tariffDisplay,
      'tariffPrint':  role.tariffPrint,
      'tariffAffect':  role.tariffAffect,
      'tariffValidate':  role.tariffValidate,
      'bookingAdd':  role.bookingAdd,
      'bookingUpdate':  role.bookingUpdate,
      'bookingDelete':  role.bookingDelete,
      'bookingDisplay':  role.bookingDisplay,
      'bookingPrint':  role.bookingPrint,
      'bookingValidate':  role.bookingValidate,
      'contentAdd':  role.contentAdd,
      'contentDelete':  role.contentDelete,
      'contentDisplay':  role.contentDisplay,
      'roleUpdate':  role.roleUpdate,
      'roleDelete':  role.roleDelete,
      'roleDisplay':  role.roleDisplay,
      'rolePrint':  role.rolePrint,
      'roleAffect':  role.roleAffect,
      'roleValidate':  role.roleValidate,
      'firmwareAdd':  role.firmwareAdd,
      'firmwareUpdate':  role.firmwareUpdate,
      'firmwareDelete':  role.firmwareDelete,
      'firmwareDisplay':  role.firmwareDisplay,
      'firmwarePrint':  role.firmwarePrint,
      'firmwareAffect':  role.firmwareAffect,
      'firmwareValidate':  role.firmwareValidate,
      'signatureAdd':  role.signatureAdd,
      'signatureValidate':  role.signatureValidate
    };
  console.log("ROLE -> ",roleX);
  Session.set("USER_ROLE_XX",roleX);
});
Template.navigation.rendered = function(){
    // Initialize metisMenu
    $('#side-menu').metisMenu();
    $('body').toggleClass("mini-navbar");
    //              Profil loading                 //
};
// Used only on OffCanvas layout
Template.navigation.events({
    'click .close-canvas-menu' : function(){
        $('body').toggleClass("mini-navbar");
    }
});
Template.navigation.helpers({
  role(){
    return Session.get("USER_ROLE_XX");
  },
  status(){
    return Session.get("UserLogged").codeCompany;
  },
  userName(){
    return Session.get("UserLogged").fname+" "+Session.get("UserLogged").surname;
  },
  equals: function(v1, v2) {
    return (v1 == v2);
  },
});
