let clientsLive = Meteor.subscribe('clientsLive');
let rolesLive = Meteor.subscribe('roles');
Template.navigation.onCreated(function () {
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
    "language" : "en",
    "codeCompany" : user.codeCompany,
    "code" : user.code
  };
  Session.set("UserLogged", user);
  console.log("User ->", user );
  var role = JSON.parse(localStorage.getItem("Role"));
  var roleX = {
    'accountAdd': role.accountAdd,
    'accountUpdate': role.accountUpdate,
    'accountDelete': role.accountDelete,
    'accountDisplay': role.accountDisplay,
    'accountPrint': role.accountPrint,
    'accountAuthorize': role.accountAuthorize,
    'accountDetails': role.accountDetails,
    'contractAdd': role.contractAdd,
    'contractUpdate': role.contractUpdate,
    'contractDelete': role.contractDelete,
    'contractDisplay': role.contractDisplay,
    'contractPrint': role.contractPrint,
    'contractAuthorize': role.contractAuthorize,
    'contractDetails': role.contractDetails,
    'articleAdd': role.articleAdd,
    'articleUpdate': role.articleUpdate,
    'articleDelete': role.articleDelete,
    'articleDisplay': role.articleDisplay,
    'articlePrint': role.articlePrint,
    'articleAuthorize': role.articleAuthorize,
    'articleDetails': role.articleDetails,
    'articleOptions': role.articleOptions,
    'invoiceAdd': role.invoiceAdd,
    'invoiceUpdate': role.invoiceUpdate,
    'invoiceDelete': role.invoiceDelete,
    'invoiceDisplay': role.invoiceDisplay,
    'invoicePrint': role.invoicePrint,
    'invoiceAuthorize': role.invoiceAuthorize,
    'invoiceDetails': role.invoiceDetails,
    'clientAdd': role.clientAdd,
    'clientUpdate': role.clientUpdate,
    'clientDelete': role.clientDelete,
    'clientDisplay': role.clientDisplay,
    'clientPrint': role.clientPrint,
    'clientAuthorize': role.clientAuthorize,
    'clientDetails': role.clientDetails,
    'clientInvoices': role.clientInvoices,
    'clientRoles': role.clientRoles,
    'clientUsers': role.clientUsers,
    'clientBookings': role.clientBookings,
    'clientContracts': role.clientContracts,
    'clientContents': role.clientContents,
    'currencyAdd': role.currencyAdd,
    'currencyUpdate': role.currencyUpdate,
    'currencyDelete': role.currencyDelete,
    'currencyDisplay': role.currencyDisplay,
    'currencyPrint': role.currencyPrint,
    'currencyAuthorize': role.currencyAuthorize,
    'currencyDetails': role.currencyDetails,
    'moduleAdd': role.moduleAdd,
    'moduleUpdate': role.moduleUpdate,
    'moduleDisplay': role.moduleDisplay,
    'moduleDelete': role.moduleDelete,
    'modulePrint': role.modulePrint,
    'moduleAuthorize': role.moduleAuthorize,
    'moduleDetails': role.moduleDetails,
    'screenAdd': role.screenAdd,
    'screenUpdate': role.screenUpdate,
    'screenDelete': role.screenDelete,
    'screenDisplay': role.screenDisplay,
    'screenPrint': role.screenPrint,
    'screenAuthorize': role.screenAuthorize,
    'screenDetails': role.screenDetails,
    'screenShow': role.screenShow,
    'screenSystem': role.screenSystem,
    'screenClear': role.screenClear,
    'screenMonitor': role.screenMonitor,
    'screenActivate': role.screenActivate,
    'screenOnOff': role.screenOnOff,
    'segmentUpdate': role.segmentUpdate,
    'segmentDelete': role.segmentDelete,
    'segmentDisplay': role.segmentDisplay,
    'segmentPrint': role.segmentPrint,
    'segmentAuthorize': role.segmentAuthorize,
    'segmentDetails': role.segmentDetails,
    'planningAdd': role.planningAdd,
    'planningDisplay': role.planningDisplay,
    'planningPrint': role.planningPrint,
    'planningAuthorize': role.planningAuthorize,
    'planningDetails': role.planningDetails,
    'tariffAdd': role.tariffAdd,
    'tariffUpdate': role.tariffUpdate,
    'tariffDelete': role.tariffDelete,
    'tariffDisplay': role.tariffDisplay,
    'tariffPrint': role.tariffPrint,
    'tariffAuthorize': role.bookingAuthorize,
    'tariffDetails': role.bookingDetails,
    'bookingAdd': role.bookingAdd,
    'bookingUpdate': role.bookingUpdate,
    'bookingDelete': role.bookingDelete,
    'bookingDisplay': role.bookingDisplay,
    'bookingPrint': role.bookingPrint,
    'bookingAuthorize': role.bookingAuthorize,
    'bookingDetails': role.bookingDetails,
    'contentAdd': role.contentAdd,
    'contentDelete': role.contentDelete,
    'contentDisplay': role.contentDisplay,
    'contentAuthorize': role.contentAuthorize,
    'contentDetails': role.contentDetails,
    'contentPrint': role.contentPrint,
    'roleAdd': role.roleAdd,
    'roleUpdate': role.roleUpdate,
    'roleDelete': role.roleDelete,
    'roleDisplay': role.roleDisplay,
    'rolePrint': role.rolePrint,
    'roleAuthorize': role.roleAuthorize,
    'roleDetails': role.roleDetails,
    'firmwareAdd': role.firmwareAdd,
    'firmwareUpdate': role.firmwareUpdate,
    'firmwareDelete': role.firmwareDelete,
    'firmwareDisplay': role.firmwareDisplay,
    'firmwarePrint': role.firmwarePrint,
    'firmwareAuthorize': role.firmwareAuthorize,
    'firmwareDetails': role.firmwareDetails,
    'signatureAdd': role.signatureAdd,
    'signatureDelete': role.signatureDelete,
    'signatureDisplay': role.signatureDisplay,
    'signaturePrint': role.signaturePrint,
    'tariffAdd': role.tariffAdd,
    'tariffUpdate': role.tariffUpdate,
    'tariffDelete': role.tariffDelete,
    'tariffDisplay': role.tariffDisplay,
    'tariffPrint': role.tariffPrint,
    'tariffAuthorize': role.tariffAuthorize,
    'tariffDetails': role.tariffDetails,
    'companyAdd': role.companyAdd,
    'companyUpdate': role.companyUpdate,
    'companyDelete': role.companyDelete,
    'companyDisplay': role.companyDisplay,
    'companyPrint': role.companyPrint,
    'companyAuthorize': role.companyAuthorize,
    'companyDetails': role.companyDetails,
    'companyInvoices': role.companyInvoices,
    'companyRoles': role.companyRoles,
    'companyUsers': role.companyUsers,
    'companySegments': role.companySegments,
    'companyContracts': role.companyContracts,
    'companyArticles': role.companyArticles,
    'companyScreens': role.companyScreens,
    'companyBookings': role.companyBookings,
    'companyContents': role.companyContents,
    'companyCurrencies': role.companyCurrencies,
    'companyClients': role.companyClients,
    'companyTariffs': role.companyTariffs,
    'companyFirmwares': role.companyFirmwares
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
    return whoIsConnected();
  },
  userName(){
    return Session.get("UserLogged").fname+" "+Session.get("UserLogged").surname;
  },
  equals: function(v1, v2) {
    return (v1 == v2);
  },
});
