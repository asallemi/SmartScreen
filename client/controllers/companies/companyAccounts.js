function verifyEdit(id){
  var user = Users_Authorization.findOne({ "_id" : id });
  return user == undefined;
}
function verifyDelete(id){
  var user = Users_Authorization.findOne({ "_id" : id+"#D" });
  return user == undefined;
}
function authorize(user){
  if(user._id.indexOf("#") > 0){
    user._id = user._id.replace("#D", "");
  }
  var userX = Users_Live.findOne({ "_id" : user._id });
  // entry validated and new entry
  if(userX !== undefined && user.status == "INAU"){
    user.status = "LIVE";
    user.authorizer = Session.get("UserLogged")._id;
    user.dateTime = getDateNow();
    userX.status = 'HIS';
    userX.dateTime = getDateNow();
    userX.currentNumber = user.currentNumber;
    userX._id = user._id+"#"+(user.currentNumber-1);
    Users_History.insert(userX);
    Users_Live.remove(user._id);
    Users_Live.insert(user);
    Users_Authorization.remove(user._id);
  // Authorise deleting user
  }else if(userX !== undefined && user.status == "RNAU"){
    user.authorizer= Session.get("UserLogged")._id;
    user.status = 'DEL';
    user.dateTime = getDateNow();
    Users_History.insert(user);
    Users_Live.remove(userX._id);
    Users_Authorization.remove(user._id);
    Users_Authorization.remove(user._id+"#D");
  }else{
    user.status = "LIVE";
    user.authorizer = Session.get("UserLogged")._id;
    user.dateTime = getDateNow();
    Users_Live.insert(user);
    Users_Authorization.remove(user._id);
  }
}
function getValuesFromFormForAdd(){
  var roles = Roles_Live.find({ "codeCompany": Session.get("COMPANY_CODE"), "code": null });
  var arrayIDs = [];
  roles.forEach(function(doc){
    arrayIDs.push(doc._id);
  });
  var rolesID = '';
  for( var i=0; i < arrayIDs.length; i++){
    var x = arrayIDs[i];
    if( document.getElementById(x).checked ) {
      rolesID = rolesID + arrayIDs[i]+"*";
    }
  }
  if (document.getElementById('fname') != null) {
    var fname = document.getElementById("fname").value;
  }else {
    var fname = null;
  }
  if (document.getElementById('surname') != null) {
    var surname = document.getElementById("surname").value;
  }else {
    var surname = null;
  }
  if (document.getElementById('legalIdentifier') != null) {
    var legalIdentifier = document.getElementById("legalIdentifier").value;
  }else {
    var legalIdentifier = null;
  }
  if (document.getElementById('dateOfBirth') != null) {
    var dateOfBirth = document.getElementById("dateOfBirth").value;
  }else {
    var dateOfBirth = null;
  }
  if (document.getElementById('phone') != null) {
    var phone = document.getElementById("phone").value;
  }else {
    var phone = null;
  }
  if (document.getElementById('address') != null) {
    var address = document.getElementById("address").value;
  }else {
    var address = null;
  }
  if (document.getElementById('mail') != null) {
    var email = document.getElementById("mail").value;
  }else {
    var email = null;
  }
  if (document.getElementById('pass1') != null) {
    var pass1 = document.getElementById("pass1").value;
  }else {
    var pass1 = null;
  }
  //console.log(" rolesID :",rolesID);
  var user =
    {
      'fname' : fname,
      'surname' : surname,
      'legalIdentifier' : legalIdentifier,
      'dateOfBirth' : dateOfBirth,
      'phone' : phone,
      'address' : address,
      'email' : email,
      'password' : encryptPassword(pass1),
      'photo' : '/public/upload/users/1001',
      'roles': rolesID.slice(0, rolesID.length-1),
      'code': Session.get("UserLogged").code,
      'codeCompany': Session.get("COMPANY_CODE"),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow()
    };
  return user;
}
function getValuesFromFormForEditAu(){
  var roles = Roles_Live.find({ "codeCompany": Session.get("COMPANY_CODE"), "code": null });
  var arrayIDs = [];
  roles.forEach(function(doc){
    arrayIDs.push(doc._id);
  });
  var rolesID = '';
  for( var i=0; i < arrayIDs.length; i++){
    var x = arrayIDs[i];
    if( document.getElementById(x+"##").checked ) {
      rolesID = rolesID + arrayIDs[i]+"*";
    }
  }
  if (document.getElementById('fnameEdit1') != null) {
    var fname = document.getElementById("fnameEdit1").value;
  }else {
    var fname = null;
  }
  if (document.getElementById('surnameEdit1') != null) {
    var surname = document.getElementById("surnameEdit1").value;
  }else {
    var surname = null;
  }
  if (document.getElementById('legalIdentifierEdit1') != null) {
    var legalIdentifier = document.getElementById("legalIdentifierEdit1").value;
  }else {
    var legalIdentifier = null;
  }
  if (document.getElementById('dateOfBirthEdit1') != null) {
    var dateOfBirth = document.getElementById("dateOfBirthEdit1").value;
  }else {
    var dateOfBirth = null;
  }
  if (document.getElementById('phoneEdit1') != null) {
    var phone = document.getElementById("phoneEdit1").value;
  }else {
    var phone = null;
  }
  if (document.getElementById('addressEdit1') != null) {
    var address = document.getElementById("addressEdit1").value;
  }else {
    var address = null;
  }
  if (document.getElementById('mailEdit1') != null) {
    var email = document.getElementById("mailEdit1").value;
  }else {
    var email = null;
  }
  if (document.getElementById('newPassword1') != null) {
    var newPassword = document.getElementById("newPassword1").value;
  }else {
    var newPassword = null;
  }
  var user =
    {
      'fname' : fname,
      'surname' : surname,
      'legalIdentifier' : legalIdentifier,
      'dateOfBirth' : dateOfBirth,
      'phone' : phone,
      'address' : address,
      'email' : email,
      'password' : newPassword,
      'photo' : '/public/upload/users/',
      'roles': rolesID.slice(0, rolesID.length-1),
      'code': Session.get("UserLogged").code,
      'codeCompany': Session.get("COMPANY_CODE"),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow()
    };
  return user;
}
function getValuesFromFormForEdit(){
  var roles = Roles_Live.find({ "codeCompany": Session.get("COMPANY_CODE"), "code": null });
  var arrayIDs = [];
  roles.forEach(function(doc){
    arrayIDs.push(doc._id);
  });
  var rolesID = '';
  for( var i=0; i < arrayIDs.length; i++){
    var x = arrayIDs[i];
    if( document.getElementById(x+"#").checked ) {
      rolesID = rolesID + arrayIDs[i]+"*";
    }
  }
  if (document.getElementById('fnameEdit') != null) {
    var fname = document.getElementById("fnameEdit").value;
  }else {
    var fname = null;
  }
  if (document.getElementById('surnameEdit') != null) {
    var surname = document.getElementById("surnameEdit").value;
  }else {
    var surname = null;
  }
  if (document.getElementById('legalIdentifierEdit') != null) {
    var legalIdentifier = document.getElementById("legalIdentifierEdit").value;
  }else {
    var legalIdentifier = null;
  }
  if (document.getElementById('dateOfBirthEdit') != null) {
    var dateOfBirth = document.getElementById("dateOfBirthEdit").value;
  }else {
    var dateOfBirth = null;
  }
  if (document.getElementById('phoneEdit') != null) {
    var phone = document.getElementById("phoneEdit").value;
  }else {
    var phone = null;
  }
  if (document.getElementById('addressEdit') != null) {
    var address = document.getElementById("addressEdit").value;
  }else {
    var address = null;
  }
  if (document.getElementById('mailEdit') != null) {
    var email = document.getElementById("mailEdit").value;
  }else {
    var email = null;
  }
  if (document.getElementById('newPassword') != null) {
    var newPassword = document.getElementById("newPassword").value;
  }else {
    var newPassword = null;
  }
  var user =
    {
      'fname' : fname,
      'surname' : surname,
      'legalIdentifier' : legalIdentifier,
      'dateOfBirth' : dateOfBirth,
      'phone' : phone,
      'address' : address,
      'email' : email,
      'password' : newPassword,
      'photo' : '/public/upload/users/1001',
      'roles': rolesID.slice(0, rolesID.length-1),
      'code': Session.get("UserLogged").code,
      'codeCompany': Session.get("COMPANY_CODE"),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow()
    };
  return user;
}
function sendCapsule(user, state){
  var companyCode = Session.get("COMPANY_CODE");
  var d = new Date().toString();
  var res = d.split(" ");
  var date = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var capsule = {
    'id_sender': 20,
    'id_receiver': 50,
    'sort': null,
    'priority': 1,
    'payload': null,
    'type': 'PAYLOAD',
    'sending_date': date,
    'receiving_date': null,
    'status_capsule': "NO",
    'tts': 10,
    'ACK': "NO"
  };
  var res = user.roles.split("*");
  var role;
  if( res.length == 1){
    role = Roles_Live.findOne({ "_id" : user.roles });
  }else{
    var listRoles = [];
    for(var i=0; i < res.length; i++){
      var role = Roles_Live.findOne({ "_id" : res[i] });
      listRoles.push(role);
    }
    role = getFinalRole(listRoles);
  }
  if(state == "add" ){
    var payload = {
      'att': ['dn', 'objectClass', 'AFirstName', 'ALastName', 'AAdress', 'pwd', 'AEmail','APhone', 'ADateOfBirth', 'ACIN',
      'ContractAdd','ContractUpdate','ContractDelete','ContractDisplay','ContractPrint','ContractAuthorize','ContractDetail',
      'AccountAdd','AccountUpdate','AccountDelete','AccountDisplay','AccountPrint','AccountAuthorize','AccountDetail',
      'InvoiceAdd','InvoiceUpdate','InvoiceDelete','InvoiceDisplay','InvoicePrint','InvoiceAuthorize','InvoiceDetail',
      'SegmentUpdate','SegmentDelete','SegmentPrint','SegmentDisplay','SegmentAuthorize','SegmentDetail',
      'TariffAdd','TariffUpdate','TariffDelete','TariffPrint','TariffDisplay','TariffAuthorize','TariffDetail',
      'BookingAdd','BookingUpdate','BookingDelete','BookingDisplay','BookingPrint','BookingAuthorize','BookingDetail',
      'ContentAdd','ContentDelete','ContentPrint','ContentDisplay','ContentAuthorize','ContentDetail',
      'RoleAdd','RoleDelete','RoleUpdate','RoleDisplay','RolePrint','RoleAuthorize','Roledetail',
      'ArticleAdd','ArticleUpdate','ArticleDelete','ArticleDisplay','ArticlePrint','ArticleDetail','ArticleAuthorize','ArticleOptions',
      'SignatureAdd','SignatureDelete','SignatureDisplay','SignaturePrint',
      'FirmwareAdd','FirmwareUpdate','FirmwareDelete','FirmwareDisplay','FirmwarePrint','FirmwareAuthorize','FirmwareDetail',
      'ClientAdd','ClientUpdate','ClientDelete','ClientDisplay','ClientPrint','ClientAuthorize','ClientDetail','ClientUsers','ClientRoles',
      'ClientBookings','ClientContents','ClientContracts','ClientInvoices',
      'ScreenAdd','ScreenUpdate','ScreenDelete','ScreenDisplay','ScreenPrint','ScreenAuthorize','ScreenDetail','ScreenActivation',
      'ScreenONOFF','ScreenClear','ScreenMonitoring','ScreenShow','ScreenUpdateSystem',
      'CurrencyAdd','CurrencyUpdate','CurrencyDelete','CurrencyDisplay','CurrencyPrint','CurrencyDetail','CurrencyAuthorize',
      'PlanningAdd','PlanningPrint','PlanningDisplay','PlanningDetail','PlanningAuthorize'],
      'dn': 'AEmail='+user.email+',o=Admin,CpCode='+companyCode+',o=Company,o=WebApp,dc=swallow,dc=tn',
      'objectClass':['top','AppAdministrator', 'ContractManagment', 'AccountManagment','InvoiceManagment', 'ClientManagment', 'ScreenManagment', 'SegmentManagment',
      'TariffManagment', 'BookingManagment', 'ContentManagment', 'RoleManagment','ArticleManagment', 'SignatureManagment', 'FirmwareManagment',
       'CurrencyManagment','PlanningManagment'],
      'AFirstName': user.fname,
      'ALastName': user.surname,
      'AAdress': user.address,
      'pwd': user.password,
      'AEmail': user.email,
      'APhone': user.phone,
      'ADateOfBirth': user.dateOfBirth,
      'APicture': user.photo,
      'ACIN': user.legalIdentifier,
      'ContractAdd': role.contractAdd,
      'ContractUpdate': role.contractUpdate,
      'ContractDelete': role.contractDelete,
      'ContractDisplay': role.contractDisplay,
      'ContractPrint': role.contractPrint,
      'ContractAuthorize': role.contractAuthorize,
      'ContractDetail': role.contractDetails,
      'AccountAdd': role.accountAdd,
      'AccountUpdate': role.accountUpdate,
      'AccountDelete': role.accountDelete,
      'AccountDisplay': role.accountDisplay,
      'AccountPrint': role.accountPrint,
      'AccountAuthorize': role.accountAuthorize,
      'AccountDetail': role.accountDetails,
      'InvoiceAdd': role.invoiceAdd,
      'InvoiceUpdate': role.invoiceUpdate,
      'InvoiceDelete': role.invoiceDelete,
      'InvoiceDisplay': role.invoiceDisplay,
      'InvoicePrint': role.invoicePrint,
      'InvoiceAuthorize': role.invoiceAuthorize,
      'InvoiceDetail': role.invoiceDetails,
      'SegmentUpdate': role.segmentUpdate,
      'SegmentDelete': role.segmentDelete,
      'SegmentPrint': role.segmentPrint,
      'SegmentDisplay': role.segmentDisplay,
      'SegmentAuthorize': role.segmentAuthorize,
      'SegmentDetail': role.segmentDetails,
      'TariffAdd': role.tariffAdd,
      'TariffUpdate': role.tariffUpdate,
      'TariffDelete': role.tariffDelete,
      'TariffPrint': role.tariffPrint,
      'TariffDisplay': role.tariffDisplay,
      'TariffAuthorize': role.tariffAuthorize,
      'TariffDetail': role.tariffDetails,
      'BookingAdd': role.bookingAdd,
      'BookingUpdate': role.bookingUpdate,
      'BookingDelete': role.bookingDelete,
      'BookingDisplay': role.bookingDisplay,
      'BookingPrint': role.bookingPrint,
      'BookingAuthorize': role.bookingAuthorize,
      'BookingDetail': role.bookingDetails,
      'ContentAdd': role.contentAdd,
      'ContentDelete': role.contentDelete,
      'ContentPrint': role.contentPrint,
      'ContentDisplay': role.contentDisplay,
      'ContentAuthorize': role.contentAuthorize,
      'ContentDetail': role.contentDetails,
      'RoleAdd': role.roleAdd,
      'RoleDelete': role.roleDelete,
      'RoleUpdate': role.roleUpdate,
      'RoleDisplay': role.roleDisplay,
      'RolePrint': role.rolePrint,
      'RoleAuthorize': role.roleAuthorize,
      'Roledetail': role.roleDetails,
      'ArticleAdd': role.articleAdd,
      'ArticleUpdate': role.articleUpdate,
      'ArticleDelete': role.articleDelete,
      'ArticleDisplay': role.articleDisplay,
      'ArticlePrint': role.articlePrint,
      'ArticleDetail': role.articleDetails,
      'ArticleAuthorize': role.articleAuthorize,
      'ArticleOptions': role.articleOptions,
      'SignatureAdd': role.signatureAdd,
      'SignatureDelete': role.signatureDelete,
      'SignatureDisplay': role.signatureDisplay,
      'SignaturePrint': role.signaturePrint,
      'FirmwareAdd': role.firmwareAdd,
      'FirmwareUpdate': role.firmwareUpdate,
      'FirmwareDelete': role.firmwareDelete,
      'FirmwareDisplay': role.firmwareDisplay,
      'FirmwarePrint': role.firmwarePrint,
      'FirmwareAuthorize': role.firmwareAuthorize,
      'FirmwareDetail': role.firmwareDetails,
      'ClientAdd': role.clientAdd,
      'ClientUpdate': role.clientUpdate,
      'ClientDelete': role.clientDelete,
      'ClientDisplay': role.clientDisplay,
      'ClientPrint': role.clientPrint,
      'ClientAuthorize': role.clientAuthorize,
      'ClientDetail': role.clientDetails,
      'ClientUsers': role.clientUsers,
      'ClientRoles': role.clientRoles,
      'ClientBookings': role.clientBookings,
      'ClientContents': role.clientContents,
      'ClientContracts': role.clientContracts,
      'ClientInvoices': role.clientInvoices,
      'ScreenAdd': role.screenAdd,
      'ScreenUpdate': role.screenUpdate,
      'ScreenDelete': role.screenDelete,
      'ScreenDisplay': role.screenDisplay,
      'ScreenPrint': role.screenPrint,
      'ScreenAuthorize': role.screenAuthorize,
      'ScreenDetail': role.screenDetails,
      'ScreenActivation': role.screenActivate,
      'ScreenONOFF': role.screenOnOff,
      'ScreenClear': role.screenClear,
      'ScreenMonitoring': role.screenMonitor,
      'ScreenShow': role.screenShow,
      'ScreenUpdateSystem': role.screenSystem,
      'CurrencyAdd': role.currencyAdd,
      'CurrencyUpdate': role.currencyUpdate,
      'CurrencyDelete': role.currencyDelete,
      'CurrencyDisplay': role.currencyDisplay,
      'CurrencyPrint': role.currencyPrint,
      'CurrencyDetail': role.currencyDetails,
      'CurrencyAuthorize': role.currencyAuthorize,
      'PlanningAdd': role.planningAdd,
      'PlanningPrint': role.planningPrint,
      'PlanningDisplay': role.planningDisplay,
      'PlanningDetail': role.planningDetails,
      'PlanningAuthorize': role.planningAuthorize
    };
    capsule.sort = "LDAP_ADD_MSG";
    capsule.payload = payload;
  }else if( state == "edit"){
      var payload = {
        'att':['dn','changetype','replace'],
        'dn': 'AEmail='+user.email+',o=Admin,'+'CpCode='+companyCode+',o=Company,o=WebApp,dc=swallow,dc=tn',
        'changetype': 'modify',
        'replace': ['AFirstName','ALastName','AAdress','pwd','APhone','ADateOfBirth','APicture','ACIN','ContractAdd',
        'ContractUpdate', 'ContractDelete', 'ContractDisplay', 'ContractPrint', 'ContractSign',
        'ContractValidator', 'AccountAdd', 'AccountUpdate', 'AccountDelete',
        'AccountDisplay', 'AccountPrint', 'AccountValidator', 'InvoiceAdd',
        'InvoiceUpdate', 'InvoiceDelete', 'InvoiceDisplay', 'InvoicePrint', 'InvoiceSign',
        'InvoiceValidator', 'ClientAdd', 'ClientUpdate', 'ClientDelete',
        'ClientDisplay', 'ClientPrint', 'ClientAccountManagment', 'ClientValidator',
        'ScreenActivation', 'ScreenDelete', 'ScreenDisplay', 'ScreenPrint',
        'ScreenONOFF', 'ScreenClear', 'ScreenMonitoring', 'ScreenValidator',
        'ScreenUpdate', 'ScreenShow', 'ScreenUpdateSystem', 'SegmentAffect', 'SegmentUpdate',
        'SegmentDelete', 'SegmentPrint', 'SegmentDisplay', 'SegmentValidator',
        'TariffAdd', 'TariffUpdate', 'TariffDelete', 'TariffPrint', 'TariffAffect',
        'TariffValidator', 'BookingAdd', 'BookingUpdate', 'BookingDelete',
        'BookingDisplay', 'BookingPrint', 'BookingValidator', 'ContentAdd',
        'ContentDelete', 'ContentDisplay', 'ContentValidator', 'RoleAdd',
        'RoleDelete', 'RoleUpdate', 'RoleDisplay', 'RolePrint', 'RoleValidator',
        'ArticleAdd', 'ArticleUpdate', 'ArticleDelete', 'ArticleDisplay', 'ArticlePrint',
        'ArticleAffect', 'ArticleValidator', 'SignatureAdd', 'SignatureValidator',
        'FirmwareAdd', 'FirmwareUpdate', 'FirmwareDelete', 'FirmwareDisplay',
        'FirmwarePrint', 'FirmwareValidator'] ,
        'AFirstName': user.fname,
        'ALastName': user.surname,
        'AAdress': user.address,
        'pwd': user.password,
        'APhone': user.phone,
        'ADateOfBirth': user.dateOfBirth,
        'APicture': user.photo,
        'ACIN': user.legalIdentifier,
        'ContractAdd': role.contractAdd,
        'ContractUpdate': role.contractUpdate,
        'ContractDelete': role.contractDelete,
        'ContractDisplay': role.contractDisplay,
        'ContractPrint': role.contractPrint,
        'ContractSign': role.contractSign,
        'ContractValidator': role.contractValidate,
        'AccountAdd': role.accountAdd,
        'AccountUpdate': role.accountUpdate,
        'AccountDelete': role.accountDelete,
        'AccountDisplay': role.accountDisplay,
        'AccountPrint': role.accountPrint,
        'AccountValidator': role.accountValidate,
        'InvoiceAdd': role.invoiceAdd,
        'InvoiceUpdate': role.invoiceUpdate,
        'InvoiceDelete': role.invoiceDelete,
        'InvoiceDisplay': role.invoiceDisplay,
        'InvoicePrint': role.invoicePrint,
        'InvoiceSign': null,
        'InvoiceValidator': role.invoiceValidate,
        'ClientAdd': role.clientAdd,
        'ClientUpdate': role.clientUpdate,
        'ClientDelete': role.clientDelete,
        'ClientDisplay': role.clientDisplay,
        'ClientPrint': role.clientPrint,
        'ClientAccountManagment': role.clientAccountManagement,
        'ClientValidator': role.clientValidate,
        'ScreenActivation': role.screenActivate,
        'ScreenDelete': role.screenDelete,
        'ScreenDisplay': role.screenDisplay,
        'ScreenPrint': role.screenPrint,
        'ScreenONOFF': role.screenOnOff,
        'ScreenClear': role.screenClear,
        'ScreenMonitoring': role.screenMonitor,
        'ScreenValidator': role.screenValidate,
        'ScreenUpdate': role.screenUpdate,
        'ScreenShow': role.screenShow,
        'ScreenUpdateSystem': role.screenUpdateSystem,
        'SegmentAffect': role.segmentAffect,
        'SegmentUpdate': role.segmentUpdate,
        'SegmentDelete': role.segmentDelete,
        'SegmentPrint': role.segmentPrint,
        'SegmentDisplay': role.segmentDisplay,
        'SegmentValidator': role.segmentValidate,
        'TariffAdd': role.tariffAdd,
        'TariffUpdate': role.tariffUpdate,
        'TariffDelete': role.tariffDelete,
        'TariffPrint': role.tariffPrint,
        'TariffAffect': role.tariffAffect,
        'TariffValidator': role.tariffValidate,
        'BookingAdd': role.bookingAdd,
        'BookingUpdate': role.bookingUpdate,
        'BookingDelete': role.bookingDelete,
        'BookingDisplay': role.bookingDisplay,
        'BookingPrint': role.bookingPrint,
        'BookingValidator': role.bookingValidate,
        'ContentAdd': role.contentAdd,
        'ContentDelete': role.contentDelete,
        'ContentDisplay': role.contentDisplay,
        'ContentValidator': role.contentValidate,
        'RoleAdd': role.roleAdd,
        'RoleDelete': role.roleDelete,
        'RoleUpdate': role.roleUpdate,
        'RoleDisplay': role.roleDisplay,
        'RolePrint': role.rolePrint,
        'RoleValidator': role.roleValidate,
        'ArticleAdd': role.articleAdd,
        'ArticleUpdate': role.articleUpdate,
        'ArticleDelete': role.articleDelete,
        'ArticleDisplay': role.articleDisplay,
        'ArticlePrint': role.articlePrint,
        'ArticleAffect': null,
        'ArticleValidator': role.articleValidate,
        'SignatureAdd': role.signatureAdd,
        'SignatureValidator': null,
        'FirmwareAdd': role.firmwareAdd,
        'FirmwareUpdate': role.firmwareUpdate,
        'FirmwareDelete': role.firmwareDelete,
        'FirmwareDisplay': role.firmwareDisplay,
        'FirmwarePrint': role.firmwarePrint,
        'FirmwareValidator': role.firmwareValidate
      };
      capsule.sort = "LDAP_MOD_MSG";
      capsule.payload = payload;
  }else{
      //case "delete"
      var payload = {'dn': 'AEmail='+user.email+',o=Admin,'+'CpCode='+companyCode+',o=Company,o=WebApp,dc=swallow,dc=tn' };
      capsule.sort = "LDAP_DEL_MSG";
      capsule.payload = payload;
  }
  Meteor.call('sendCapsule', capsule, function(error){
    if(error){
      alert('Error');
    }else{
      toastrAuthorizationDone();
    }
  });
}
Template.companyAccounts.rendered = function(){
    checkSession();
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
    console.log("USER ROLE : ", Session.get("USER_ROLE_XX"));
    settingLanguage();
    $("[data-toggle=tooltip]").tooltip();
    $('#warning').hide();
};
Template.companyAccounts.events({
  'click .newUser'() {
    $('#newUserPopup').modal();
  },
  'click .saveAdd'() {
    var userAdded = getValuesFromFormForAdd();
    if(userAdded.password.length == 0 && userAdded.email.length == 0){
      $('#enterEmailPwd').modal();
    }else {
      Users_Authorization.insert(userAdded);
      toastrSaveDone();
    }
  },
  'click .validateAdd'() {
    var userAdded = getValuesFromFormForAdd();
    if(userAdded.password.length == 0 && userAdded.email.length == 0){
      $('#enterEmailPwd').modal();
    }else {
      userAdded.status = "INAU";
      Users_Authorization.insert(userAdded);
      toastrValidatonDone()
    }
  },
  //         LIVE events         //
  'click .btn-edit'() {
    var user = Users_Live.findOne({ "_id" : this._id });
    //sendCapsule(user);
    if (verifyEdit(user._id)){
      Session.set("userSelected", user);
      var res = user.roles.split("*");
      var roles = Roles_Live.find({ "codeCompany": Session.get("COMPANY_CODE"), "code": null });
      var rolesList = [];
      roles.forEach(function(doc){
        var obj = {};
        if( res.indexOf(doc._id) > -1 ){
          obj.id = doc._id;
          obj.roleName = doc.roleName;
          obj.status = true;
          rolesList.push(obj);
        }else{
          obj.id = doc._id;
          obj.roleName = doc.roleName;
          obj.status = false;
          rolesList.push(obj);
        }
      });
      Session.set("RoleList", rolesList);
      $('#editUserPopUp').modal();
    }else{
      $('#edictState').modal();
    }
  },
  'click .saveEditLive'() {
    var userUpdated = getValuesFromFormForEdit();
    var user = Session.get("userSelected");
    if( document.getElementById("newPassword").value != ""){
      if ( checkConfirmPassword() ){
        if ( checkOldPassword(user._id, document.getElementById("oldPassword").value )) {
          userUpdated._id = user._id;
          userUpdated.password = encryptPassword(document.getElementById("newPassword").value);
          userUpdated.currentNumber = user.currentNumber + 1;
          Users_Authorization.remove(user._id);
          Users_Authorization.insert(userUpdated);
          toastrModificationSaved();
        }else{
          $('#rightOldPwd').modal();
        }
      }else{
        $('#samePasswordTwice').modal();
      }
    }else{
      userUpdated._id = user._id;
      userUpdated.password = user.password;
      userUpdated.currentNumber = user.currentNumber + 1;
      Users_Authorization.insert(userUpdated);
      toastrModificationSaved();
    }
  },
  'click .validateEditLive'() {
    var userUpdated = getValuesFromFormForEdit();
    var user = Session.get("userSelected");
    if( document.getElementById("newPassword").value != ""){
      if ( checkConfirmPassword() ){
        if ( checkOldPassword(user._id, document.getElementById("oldPassword").value )) {
          userUpdated._id = user._id;
          userUpdated.password = encryptPassword(document.getElementById("newPassword").value);
          userUpdated.currentNumber = user.currentNumber + 1;
          userUpdated.status = "INAU";
          Users_Authorization.remove(user._id);
          Users_Authorization.insert(userUpdated);
          toastrModificationValidated();
        }else{
          $('#rightOldPwd').modal();
        }
      }else{
        $('#samePasswordTwice').modal();
      }
    }else{
      userUpdated._id = user._id;
      userUpdated.password = user.password;
      userUpdated.status = "INAU";
      userUpdated.currentNumber = user.currentNumber + 1;
      Users_Authorization.insert(userUpdated);
      toastrModificationValidated();
    }
  },
  'click .btn-details'() {
    var user = Users_Live.findOne({ "_id" : this._id });
    var inputter = Users_Live.findOne({ "_id" : user.inputter });
    user.inputter = inputter.fname+" "+inputter.surname;
    var authorizer = Users_Live.findOne({ "_id" : user.authorizer });
    user.authorizer = authorizer.fname+" "+authorizer.surname;
    Session.set("UserDetails",user);
    var roles = user.roles.split("*");
    Session.set("RoleList", roles);
    $('#userDetailsPopUp').modal();
  },
  'click .btn-delete'() {
    var user = Users_Live.findOne({ "_id" : this._id });
    if (verifyDelete(user._id)){
      $('#checkDeleting').modal();
      Session.set("deleteUserLive",user);
    }else{
      $('#deletionState').modal();
    }
  },
  'click .BtnDelete'() {
    var user = Session.get("deleteUserLive");
    user._id = user._id+"#D"
    user.status = "RNAU";
    user.inputter = "HEDI";
    user.dateTime = new Date();
    user.authorizer = null;
    Users_Authorization.insert(user);
  },
  //        Authorization events        //
  'click .authorizeAu'() {
    var oldUser = Users_Live.findOne({ "_id" : this._id });
    var newUser = Users_Authorization.findOne({ "_id" : this._id });
    // test User have minimum one role
    if(newUser.roles.length > 0 ){
      Session.set("UserAuthorized", newUser);
      if(oldUser == undefined){
        Session.set("OldUser", null);
      }else {
        var inputter = Users_Live.findOne({ "_id" : oldUser.inputter });
        oldUser.inputter = inputter.fname+" "+inputter.surname;
        var authorizer = Users_Live.findOne({ "_id" : oldUser.authorizer });
        oldUser.authorizer = authorizer.fname+" "+authorizer.surname;
        Session.set("OldUser", oldUser);
      }
      var inputter = Users_Live.findOne({ "_id" : newUser.inputter });
      newUser.inputter = inputter.fname+" "+inputter.surname;
      Session.set("NewUser", newUser);
      settingLanguage();
      $('#checkAuthorising').modal();
    }else{
      $('#minOneRole').modal();
    }
  },
  'click .BtnAuthorize'() {
    var user = Session.get("UserAuthorized");
    var query = Users_Live.findOne({ "_id": user._id });
    console.log("Query :", query);
    if(query != undefined){
      // Update case
      // USer exist in LIVE TABLE
      sendCapsule(user, "edit");
      console.log("edit");
    }
    var query2 = Users_Authorization.findOne({ "_id": user._id });
    if(query == undefined && query2._id.indexOf("#D") < 0){
      sendCapsule(user, "add");
      console.log("add");
    }
    if(query2._id.indexOf("#D") > 0){
      sendCapsule(user, "delete");
      console.log("delete");
    }
    authorize(user);
  },
  'click .validateAu'() {
    var user = Users_Authorization.findOne({ "_id" : this._id });
    Users_Authorization.update({'_id' : user._id }, {'$set':{ 'status' : 'INAU', 'inputter' : Session.get("UserLogged")._id , 'dateTime' : getDateNow() }});
  },

  'click .editAu'() {
    var user = Users_Authorization.findOne({ "_id" : this._id });
    Session.set("userSelected", user);
    var res = user.roles.split("*");
    var roles = Roles_Live.find({ "codeCompany": Session.get("COMPANY_CODE"), "code": null });
    var rolesList = [];
    roles.forEach(function(doc){
      var obj = {};
      if( res.indexOf(doc._id) > -1 ){
        obj.id = doc._id;
        obj.roleName = doc.roleName;
        obj.status = true;
        rolesList.push(obj);
      }else{
        obj.id = doc._id;
        obj.roleName = doc.roleName;
        obj.status = false;
        rolesList.push(obj);
      }
    });
    Session.set("RoleList", rolesList);
    $('#editUserPopUpAu').modal();
  },
  'click .saveEditAu'() {
    var userUpdated = getValuesFromFormForEditAu();
    var user = Session.get("userSelected");
    if( document.getElementById("newPassword1").value != ""){
      if ( checkConfirmPassword() ){
        if ( checkOldPassword(user._id, document.getElementById("oldPassword1").value )) {
          userUpdated._id = user._id;
          userUpdated.password = encryptPassword(document.getElementById("newPassword1").value);
          Users_Authorization.remove(user._id);
          Users_Authorization.insert(userUpdated);
          toastrModificationSaved();
        }else{
          $('#rightOldPwd').modal();
        }
      }else{
        $('#samePasswordTwice').modal();
      }
    }else{
      userUpdated._id = user._id;
      userUpdated.password = user.password;
      Users_Authorization.remove(user._id);
      Users_Authorization.insert(userUpdated);
      toastrModificationSaved();
    }
  },
  'click .validateEditAu'() {
    var userUpdated = getValuesFromFormForEditAu();
    var user = Session.get("userSelected");
    if( document.getElementById("newPassword1").value != ""){
      if ( checkConfirmPassword() ){
        if ( checkOldPassword(user._id, document.getElementById("oldPassword1").value )) {
          userUpdated._id = user._id;
          userUpdated.password = encryptPassword(document.getElementById("newPassword1").value);
          userUpdated.status = "INAU";
          Users_Authorization.remove(user._id);
          Users_Authorization.insert(userUpdated);
          toastrModificationValidated();
        }else{
          $('#rightOldPwd').modal();
        }
      }else{
        $('#samePasswordTwice').modal();
      }
    }else{
      userUpdated._id = user._id;
      userUpdated.password = user.password;
      userUpdated.status = "INAU";
      Users_Authorization.remove(user._id);
      Users_Authorization.insert(userUpdated);
      toastrModificationValidated();
    }
  },
  'click .cancelAu'() {
    var user = Users_Authorization.findOne({ "_id" : this._id });
    Session.set("deleteUserAu",user);
    $('#checkCancel').modal();
  },
  'click .BtnCancel'() {
    var user = Session.get("deleteUserAu");
    Users_Authorization.remove(user._id);
    toastrSuppression();
  },
  'click .detailsAu'() {
    var user = Users_Live.findOne({ "_id" : this._id });
    var inputter = Users_Live.findOne({ "_id" : user.inputter });
    user.inputter = inputter.fname+" "+inputter.surname;
    var authorizer = Users_Live.findOne({ "_id" : user.authorizer });
    user.authorizer = authorizer.fname+" "+authorizer.surname;
    Session.set("UserDetails",user);
    var roles = user.roles.split("*");
    Session.set("RoleList", roles);
    $('#userDetailsPopUp').modal();
  },

});
Template.companyAccounts.helpers({
  role(){
    return Session.get("USER_ROLE_XX");
  },
  userLive: function() {
    return Users_Live.find({ "codeCompany": Session.get("COMPANY_CODE"), "code": null });
  },
  userAuthorization(){
    var users = Users_Authorization.find({ "codeCompany": Session.get("COMPANY_CODE"), "code": null});
    var usersAuthorization = [];
    users.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var user =
        {
          '_id' : doc._id,
          'fname' : doc.fname,
          'surname' : doc.surname,
          'legalIdentifier' : doc.legalIdentifier,
          'dateOfBirth' : doc.dateOfBirth,
          'phone' : doc.phone,
          'address' : doc.address,
          'email' : doc.email,
          'password' : doc.password,
          'photo' : doc.photo,
          'roles': doc.roles,
          'currentNumber': doc.currentNumber,
          'status': doc.status,
          'inputter': doc.inputter,
          'authorizer': doc.authorizer,
          'dateTime': doc.dateTime,
          'code': doc._id,
          'buttonEdit' : button.editAu,
          'buttonValidate' : button.validateAu,
          'buttonAuthorize' : button.authorizeAu,
          'buttonDetail' : buttonDetails
        };
      usersAuthorization.push(user);
    });
    return usersAuthorization;
  },
  userDetails(){
    var user = Session.get("userDetails");
    return user;
  },
  userSelected(){
    var user = Session.get("userSelected");
    return user;
  },
  roles(){
    return Roles_Live.find({ "codeCompany": Session.get("COMPANY_CODE"), "code": null });
  },
  allRoles(){
    return Roles_Live.find({ "codeCompany": Session.get("COMPANY_CODE") });
  },
  userDetail() {
    return Session.get("UserDetails");
  },
  rolesList() {
    return Session.get("RoleList");
  },
  newUser() {
    return Session.get("NewUser");
  },
  oldUser() {
    return Session.get("OldUser");
  },
  warnings (){
    return Session.get("Warnings");
  },
  company(){
    return Session.get("COMPANY_NAME");
  },
  equals: function(v1, v2) {
    return (v1 === v2);
  },
  notEquals: function(v1, v2) {
    return (v1 != v2);
  },
  exist: function(v1) {
    var array = Session.get("RoleList");
    if (array != undefined){
      if( array.indexOf(v1) == -1 ){
        //console.log("IndexOF :", array.indexOf(v1));
        return false;
      }
      return true;
    }
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
