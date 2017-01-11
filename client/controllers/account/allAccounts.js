Users_Live = new Mongo.Collection('users_live');
let rolesLive = Meteor.subscribe('usersLive');

Users_Authorization = new Mongo.Collection('users_authorization');
let UsersAuthorization = Meteor.subscribe('usersAuthorization');

Users_History = new Mongo.Collection('users_history');

function nextState(status){
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
function hideShowButtons(array){
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
function verifyEdit(id){
  var user = Users_Authorization.findOne({ "_id" : id });
  if(user == undefined){
    return true;
  }
  return false;
}
function verifyDelete(id){
  var user = Users_Authorization.findOne({ "_id" : id+"#D" });
  if( user == undefined ){
    return true;
  }
  return false;
}
function getButtonsAu(array){
  var button = {
    'editAu' :false,
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
function input(user){
  // situation == true ---> Edit user case else Add user case
  var situation = true;
  if ( user._id == null ){
    user._id = Random.id([17]);
    user.currentNumber = 0;
    user.code = "1002";
    $('#newUserPopup').modal();
    situation = false;
  }else{
    $('#editUserPopUp').modal();
    Session.set("userSelected", user);
    var res = user.roles.split("*");
    var roles = Roles_Live.find();
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
  }
  user.currentNumber = user.currentNumber + 1 ;
  user.status = 'HLD';
  user.inputter = "Med Saleh";
  user.authorizer = null;
  var array = nextState(user.status);
  hideShowButtons(array);
  $("#save").click(function() {
    console.log("Save");
    if( situation == false){
      console.log("Add case");
      var userAdded = getValuesFromFormForAdd();
      userAdded._id = user._id;
      userAdded.currentNumber = user.currentNumber;
      userAdded.status = user.status;
      userAdded.inputter = user.inputter;
      userAdded.authorizer = user.authorizer;
      userAdded.dateTime = new Date();
      Users_Authorization.insert(userAdded);
      location.reload();
    }else{
      console.log("Edit case");
      var userAdded = getValuesFromFormForEdit();
      if( document.getElementById("newPassword").value != ""){ // The case where the user want change password
        if ( checkConfirmPassword() ){
          if ( checkOldPassword(user._id, document.getElementById("oldPassword").value )) {
            userAdded._id = user._id;
            userUpdated.password = encryptPassword(document.getElementById("newPassword").value);
            userAdded.currentNumber = user.currentNumber;
            userAdded.status = user.status;
            userAdded.inputter = user.inputter;
            userAdded.authorizer = user.authorizer;
            userAdded.dateTime = new Date();
            Users_Authorization.insert(userAdded);
            location.reload();
          }else{
            swal({ title: "Alert !",text: "You need to enter the right old password !",type: "warning",closeOnConfirm: true });
          }
        }else{
          swal({ title: "Alert !",text: "You need to enter the same password twice !",type: "warning",closeOnConfirm: true});
        }
      }else{
        userAdded._id = user._id;
        userAdded.currentNumber = user.currentNumber;
        userAdded.password = user.password;
        userAdded.status = user.status;
        userAdded.inputter = user.inputter;
        userAdded.authorizer = user.authorizer;
        userAdded.dateTime = new Date();
        Users_Authorization.insert(userAdded);
        location.reload();
      }
    }
  });
  $("#validate").click(function() {
    if( situation == false){
      var userAdded = getValuesFromFormForAdd();
      userAdded._id = user._id;
      userAdded.currentNumber = user.currentNumber;
      userAdded.status = 'INAU';
      userAdded.inputter = user.inputter;
      userAdded.authorizer = user.authorizer;
      userAdded.dateTime = new Date();
      Users_Authorization.insert(userAdded);
      location.reload();
    }else{
      var userAdded = getValuesFromFormForEdit();
      if( document.getElementById("newPassword").value != ""){
         // The case where the user will change password
        if ( checkConfirmPassword() ){
          if ( checkOldPassword(user._id, document.getElementById("oldPassword").value)) {
            userAdded._id = user._id;
            userUpdated.password = encryptPassword(document.getElementById("newPassword").value);
            userAdded.currentNumber = user.currentNumber;
            userAdded.status = 'INAU';
            userAdded.inputter = user.inputter;
            userAdded.authorizer = user.authorizer;
            userAdded.dateTime = new Date();
            Users_Authorization.insert(userAdded);
            location.reload();
          }else{
            swal({ title: "Alert !",text: "You need to enter the right old password !",type: "warning",closeOnConfirm: true });
          }
        }else{
          swal({ title: "Alert !",text: "You need to enter the same password twice !",type: "warning",closeOnConfirm: true});
        }
      }else{
        userAdded._id = user._id;
        userAdded.currentNumber = user.currentNumber;
        userAdded.password = user.password;
        userAdded.status = 'INAU';
        userAdded.inputter = user.inputter;
        userAdded.authorizer = user.authorizer;
        userAdded.dateTime = new Date();
        Users_Authorization.insert(userAdded);
        location.reload();
      }
    }
  });
  $("#saveAdd").click(function() {
    if( situation == false){
      var userAdded = getValuesFromFormForAdd();
    }else{
      var userAdded = getValuesFromFormForEdit();
    }
    if(testRoles(userAdded.roles) == false){
      console.log("Warning");
      $('#warning').modal();
    }else{
      userAdded._id = user._id;
      userAdded.currentNumber = user.currentNumber;
      userAdded.status = user.status;
      userAdded.inputter = user.inputter;
      userAdded.authorizer = user.authorizer;
      userAdded.dateTime = new Date();
      Users_Authorization.insert(userAdded);
      location.reload();
    }
  });
  $("#validateAdd").click(function() {
    if( situation == false){
      var userAdded = getValuesFromFormForAdd();
    }else{
      var userAdded = getValuesFromFormForEdit();
    }
    if(testRoles(userAdded.roles) == false){
      console.log("Warning");
      $('#warning').modal();
    }else{
      userAdded._id = user._id;
      userAdded.currentNumber = user.currentNumber;
      userAdded.status = 'INAU';
      userAdded.inputter = user.inputter;
      userAdded.authorizer = user.authorizer;
      userAdded.dateTime = new Date();
      Users_Authorization.insert(userAdded);
      location.reload();
    }
  });
}
function updateUser(user){
  $('#editUserPopUp').modal();
  Session.set("userSelected", user);
  var res = user.roles.split("*");
  var roles = Roles_Live.find();
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
  user.inputter = "User X";
  var array = nextState(user.status);
  hideShowButtons(array);
  $("#save").click(function() {
    var userUpdated = getValuesFromFormForEdit();
    console.log("user roles: ", userUpdated.roles);
    if( document.getElementById("newPassword").value != ""){
      // The case where the user will change the password
      if ( checkConfirmPassword() ){
        if ( checkOldPassword(user._id, document.getElementById("oldPassword").value )) {
          userUpdated._id = user._id;
          userUpdated.currentNumber = user.currentNumber;
          userUpdated.status = user.status;
          userUpdated.password = encryptPassword(document.getElementById("newPassword").value);
          userUpdated.inputter = user.inputter;
          userUpdated.authorizer = user.authorizer;
          userUpdated.dateTime = new Date();
          Users_Authorization.remove(user._id);
          Users_Authorization.insert(userUpdated);
          location.reload();
        }else{
          swal({ title: "Alert !",text: "You need to enter the right old password !",type: "warning",closeOnConfirm: true });
        }
      }else{
        swal({ title: "Alert !",text: "You need to enter the same password twice !",type: "warning",closeOnConfirm: true});
      }
    }else{
      // The case where the user wont change the password
      userUpdated._id = user._id;
      userUpdated.currentNumber = user.currentNumber;
      userUpdated.status = user.status;
      userUpdated.inputter = user.inputter;
      userUpdated.password = user.password;
      userUpdated.authorizer = user.authorizer;
      userUpdated.dateTime = new Date();
      Users_Authorization.remove(user._id);
      Users_Authorization.insert(userUpdated);
      location.reload();
    }
  });
  $("#validate").click(function() {
    var userUpdated = getValuesFromFormForEdit();
    if( document.getElementById("newPassword").value != ""){ // The case where the user want change password
      if ( checkConfirmPassword() ){
        if ( checkOldPassword(user._id, document.getElementById("oldPassword").value)) {
          userUpdated._id = user._id;
          userUpdated.password = encryptPassword(document.getElementById("newPassword").value);
          userUpdated.currentNumber = user.currentNumber;
          userUpdated.status = 'INAU';
          userUpdated.inputter = user.inputter;
          userUpdated.authorizer = user.authorizer;
          userUpdated.dateTime = new Date();
          Users_Authorization.remove(user._id);
          Users_Authorization.insert(userUpdated);
          location.reload();
        }else{
          swal({ title: "Alert !",text: "You need to enter the right old password !",type: "warning",closeOnConfirm: true });
        }
      }else{
        swal({ title: "Alert !",text: "You need to enter the same password twice !",type: "warning",closeOnConfirm: true});
      }
    }else{
      userUpdated._id = user._id;
      userUpdated.currentNumber = user.currentNumber;
      userUpdated.status = 'INAU';
      userUpdated.inputter = user.inputter;
      userUpdated.password = user.password;
      userUpdated.authorizer = user.authorizer;
      userUpdated.dateTime = new Date();
      Users_Authorization.remove(user._id);
      Users_Authorization.insert(userUpdated);
      location.reload();
    }
  });
}
function authorize(user){
  if(user._id.indexOf("#") > 0){
    user._id = user._id.replace("#D", "");
  }
  var userX = Users_Live.findOne({ "_id" : user._id });
  // entry validated and new entry
  if(userX !== undefined && user.status == "INAU"){
    user.status = "LIVE";
    user.authorizer = "Akrem Sallemi";
    user.dateTime = new Date();
    userX.status = 'HIS';
    userX.dateTime = new Date();
    userX.currentNumber = user.currentNumber;
    userX._id = user._id+"#"+(user.currentNumber-1);
    Users_History.insert(userX);
    Users_Live.remove(user._id);
    Users_Live.insert(user);
    Users_Authorization.remove(user._id);
  // Authorise deleting user
  }else if(userX !== undefined && user.status == "RNAU"){
    user.authorizer= "3am ali";
    user.status = 'DEL';
    user.dateTime = new Date();
    Users_History.insert(user);
    Users_Live.remove(userX._id);
    Users_Authorization.remove(user._id);
    Users_Authorization.remove(user._id+"#D");
  }else{
    user.status = "LIVE";
    user.authorizer = "Akrem Sallemi";
    user.dateTime = new Date();
    Users_Live.insert(user);
    Users_Authorization.remove(user._id);
  }
}
function encryptPassword(password){
  //encrypt/decrypt data with AES using Crypto-JS
  return CryptoJS.AES.encrypt(password, 'SmartScreen').toString();
}
function decryptPassword(password){
  //encrypt/decrypt data with AES using Crypto-JS
  return CryptoJS.AES.decrypt(password, 'SmartScreen').toString(CryptoJS.enc.Utf8);
}
function getValuesFromFormForAdd(){
  var roles = Roles_Live.find();
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
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': 'test',
      'authorizer': null,
      'dateTime': new Date(),
      'code': '10002'
    };
  return user;
}

function getValuesFromFormForEdit(){
  var roles = Roles_Live.find();
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
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': 'test',
      'authorizer': null,
      'dateTime': new Date(),
      'code': '10002'
    };
  return user;
}
function checkOldPassword(id, oldPassword){
  var user = Users_Live.findOne({ "_id" : id });
  if(user == undefined){
    user = Users_Authorization.findOne({ "_id" : id });
  }
  console.log("oldPassword from Form:", oldPassword);
  console.log("decrypted oldPassword from DB:", user.password);
  console.log("decrypted oldPassword from DB:", decryptPassword(user.password));
  if( decryptPassword(user.password) == oldPassword ){
    return true;
  }
  return false;
}
function validate(user){
  Users_Authorization.update({'_id' : user._id }, {'$set':{ 'status' : 'INAU', 'inputter' : 'Ali Tounsi' , 'dateTime' : new Date() }});
}
function deleteUser(user){
  user._id = user._id+"#D"
  user.status = "RNAU";
  user.inputter = "HEDI";
  user.dateTime = new Date();
  user.authorizer = null;
  Users_Authorization.insert(user);
}
function checkConfirmPassword(){
  var pass1 = document.getElementById("newPassword").value;
  var pass2 = document.getElementById("confirmPassword").value;
  if( pass1 == pass2 ){
    return true;
  }
  return false
}
function cancelUser(id){
  //console.log("ID :",id);
  Users_Authorization.remove(id);
}
function compare(val1, val2){
  //console.log("Val",i," : ",val1, "Val :",val2);
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
function getFinalRole(listRoles){
  var role = {
      'accountAdd': listRoles[0].accountAdd,
      'accountUpdate': listRoles[0].accountUpdate,
      'accountDelete': listRoles[0].accountDelete,
      'accountDisplay': listRoles[0].accountDisplay,
      'accountPrint': listRoles[0].accountPrint,
      'accountValidate': listRoles[0].accountValidate,
      'contractAdd': listRoles[0].contractAdd,
      'contractUpdate': listRoles[0].contractUpdate,
      'contractDelete': listRoles[0].contractDelete,
      'contractDisplay': listRoles[0].contractDisplay,
      'contractPrint': listRoles[0].contractPrint,
      'contractValidate': listRoles[0].contractValidate,
      'contractSign': listRoles[0].contractSign,
      'articleAdd': listRoles[0].articleAdd,
      'articleUpdate': listRoles[0].articleUpdate,
      'articleDelete': listRoles[0].articleDelete,
      'articleDisplay': listRoles[0].articleDisplay,
      'articlePrint': listRoles[0].articlePrint,
      'articleValidate': listRoles[0].articleValidate,
      'invoiceAdd': listRoles[0].invoiceAdd,
      'invoiceUpdate': listRoles[0].invoiceUpdate,
      'invoiceDelete': listRoles[0].invoiceDelete,
      'invoiceDisplay': listRoles[0].invoiceDisplay,
      'invoicePrint': listRoles[0].invoicePrint,
      'invoiceValidate': listRoles[0].invoiceValidate,
      'clientAdd': listRoles[0].clientAdd,
      'clientUpdate': listRoles[0].clientUpdate,
      'clientDelete': listRoles[0].clientDelete,
      'clientDisplay': listRoles[0].clientDisplay,
      'clientPrint': listRoles[0].clientPrint,
      'clientValidate': listRoles[0].clientValidate,
      'clientAccountManagement': listRoles[0].clientAccountManagement,
      'screenUpdate': listRoles[0].screenUpdate,
      'screenDelete': listRoles[0].screenDelete,
      'screenDisplay': listRoles[0].screenDisplay,
      'screenPrint': listRoles[0].screenPrint,
      'screenValidate': listRoles[0].screenValidate,
      'screenShow': listRoles[0].screenShow,
      'screenUpdateSystem': listRoles[0].screenUpdateSystem,
      'screenClear': listRoles[0].screenClear,
      'screenMonitor': listRoles[0].screenMonitor,
      'screenActivate': listRoles[0].screenActivate,
      'screenOnOff': listRoles[0].screenOnOff,
      'segmentUpdate': listRoles[0].segmentUpdate,
      'segmentDelete': listRoles[0].segmentDelete,
      'segmentDisplay': listRoles[0].segmentDisplay,
      'segmentPrint': listRoles[0].segmentPrint,
      'segmentAffect': listRoles[0].segmentAffect,
      'segmentValidate': listRoles[0].segmentValidate,
      'tariffAdd': listRoles[0].tariffAdd,
      'tariffUpdate': listRoles[0].tariffUpdate,
      'tariffDelete': listRoles[0].tariffDelete,
      'tariffDisplay': listRoles[0].tariffDisplay,
      'tariffPrint': listRoles[0].tariffPrint,
      'tariffAffect': listRoles[0].tariffAffect,
      'tariffValidate': listRoles[0].tariffValidate,
      'bookingAdd': listRoles[0].bookingAdd,
      'bookingUpdate': listRoles[0].bookingUpdate,
      'bookingDelete': listRoles[0].bookingDelete,
      'bookingDisplay': listRoles[0].bookingDisplay,
      'bookingPrint': listRoles[0].bookingPrint,
      'bookingValidate': listRoles[0].bookingValidate,
      'contentAdd': listRoles[0].contentAdd,
      'contentDelete': listRoles[0].contentDelete,
      'contentDisplay': listRoles[0].contentDisplay,
      'contentValidate': listRoles[0].contentValidate,
      'roleAdd': listRoles[0].roleAdd,
      'roleUpdate': listRoles[0].roleUpdate,
      'roleDelete': listRoles[0].roleDelete,
      'roleDisplay': listRoles[0].roleDisplay,
      'rolePrint': listRoles[0].rolePrint,
      'roleAffect': listRoles[0].roleAffect,
      'roleValidate': listRoles[0].roleValidate,
      'firmwareAdd': listRoles[0].firmwareAdd,
      'firmwareUpdate': listRoles[0].firmwareUpdate,
      'firmwareDelete': listRoles[0].firmwareDelete,
      'firmwareDisplay': listRoles[0].firmwareDisplay,
      'firmwarePrint': listRoles[0].firmwarePrint,
      'firmwareAffect': listRoles[0].firmwareAffect,
      'firmwareValidate': listRoles[0].firmwareValidate,
      'signatureAdd': listRoles[0].signatureAdd
    };
  for(var i=1; i<listRoles.length; i++){
    var role = {
      'accountAdd': compare(listRoles[i].accountAdd, role.accountAdd),
      'accountUpdate': compare(listRoles[i].accountUpdate, role.accountUpdate),
      'accountDelete': compare(listRoles[i].accountDelete, role.accountDelete),
      'accountDisplay': compare(listRoles[i].accountDisplay, role.accountDisplay),
      'accountPrint': compare(listRoles[i].accountPrint, role.accountPrint),
      'accountValidate': compare(listRoles[i].accountValidate, role.accountValidate),
      'contractAdd': compare(listRoles[i].contractAdd, role.contractAdd),
      'contractUpdate': compare(listRoles[i].contractUpdate, role.contractUpdate),
      'contractDelete': compare(listRoles[i].contractDelete, role.contractDelete),
      'contractDisplay': compare(listRoles[i].contractDisplay, role.contractDisplay),
      'contractPrint': compare(listRoles[i].contractPrint, role.contractPrint),
      'contractValidate': compare(listRoles[i].contractValidate, role.contractValidate),
      'contractSign': compare(listRoles[i].contractSign, role.contractSign),
      'articleAdd': compare(listRoles[i].articleAdd, role.articleAdd),
      'articleUpdate': compare(listRoles[i].articleUpdate, role.articleUpdate),
      'articleDelete': compare(listRoles[i].articleDelete, role.articleDelete),
      'articleDisplay': compare(listRoles[i].articleDisplay, role.articleDisplay),
      'articlePrint': compare(listRoles[i].articlePrint, role.articlePrint),
      'articleValidate': compare(listRoles[i].articleValidate, role.articleValidate),
      'invoiceAdd': compare(listRoles[i].invoiceAdd, role.invoiceAdd),
      'invoiceUpdate': compare(listRoles[i].invoiceUpdate, role.invoiceUpdate),
      'invoiceDelete': compare(listRoles[i].invoiceDelete, role.invoiceDelete),
      'invoiceDisplay': compare(listRoles[i].invoiceDisplay, role.invoiceDisplay),
      'invoicePrint': compare(listRoles[i].invoicePrint, role.invoicePrint),
      'invoiceValidate': compare(listRoles[i].invoiceValidate, role.invoiceValidate),
      'clientAdd': compare(listRoles[i].clientAdd, role.clientAdd),
      'clientUpdate': compare(listRoles[i].clientUpdate, role.clientUpdate),
      'clientDelete': compare(listRoles[i].clientDelete, role.clientDelete),
      'clientDisplay': compare(listRoles[i].clientDisplay, role.clientDisplay),
      'clientPrint': compare(listRoles[i].clientPrint, role.clientPrint),
      'clientValidate': compare(listRoles[i].clientValidate, role.clientValidate),
      'clientAccountManagement': compare(listRoles[i].clientAccountManagement, role.clientAccountManagement),
      'screenUpdate': compare(listRoles[i].screenUpdate, role.screenUpdate),
      'screenDelete': compare(listRoles[i].screenDelete, role.screenDelete),
      'screenDisplay': compare(listRoles[i].screenDisplay, role.screenDisplay),
      'screenPrint': compare(listRoles[i].screenPrint, role.screenPrint),
      'screenValidate': compare(listRoles[i].screenValidate, role.screenValidate),
      'screenShow': compare(listRoles[i].screenShow, role.screenShow),
      'screenUpdateSystem': compare(listRoles[i].screenUpdateSystem, role.screenUpdateSystem),
      'screenClear': compare(listRoles[i].screenClear, role.screenClear),
      'screenMonitor': compare(listRoles[i].screenMonitor, role.screenMonitor),
      'screenActivate': compare(listRoles[i].accountAdd, role.accountAdd),
      'screenOnOff': compare(listRoles[i].screenOnOff, role.screenOnOff),
      'segmentUpdate': compare(listRoles[i].segmentUpdate, role.segmentUpdate),
      'segmentDelete': compare(listRoles[i].segmentDelete, role.segmentDelete),
      'segmentDisplay': compare(listRoles[i].segmentDisplay, role.segmentDisplay),
      'segmentPrint': compare(listRoles[i].segmentPrint, role.segmentPrint),
      'segmentAffect': compare(listRoles[i].segmentAffect, role.segmentAffect),
      'segmentValidate': compare(listRoles[i].segmentValidate, role.segmentValidate),
      'tariffAdd': compare(listRoles[i].tariffAdd, role.tariffAdd),
      'tariffUpdate': compare(listRoles[i].tariffUpdate, role.tariffUpdate),
      'tariffDelete': compare(listRoles[i].tariffDelete, role.tariffDelete),
      'tariffDisplay': compare(listRoles[i].tariffDisplay, role.tariffDisplay),
      'tariffPrint': compare(listRoles[i].tariffPrint, role.tariffPrint),
      'tariffAffect': compare(listRoles[i].tariffAffect, role.tariffAffect),
      'tariffValidate': compare(listRoles[i].tariffValidate, role.tariffValidate),
      'bookingAdd': compare(listRoles[i].bookingAdd, role.bookingAdd),
      'bookingUpdate': compare(listRoles[i].bookingUpdate, role.bookingUpdate),
      'bookingDelete': compare(listRoles[i].bookingDelete, role.bookingDelete),
      'bookingDisplay': compare(listRoles[i].bookingDisplay, role.bookingDisplay),
      'bookingPrint': compare(listRoles[i].bookingPrint, role.bookingPrint),
      'bookingValidate': compare(listRoles[i].bookingValidate, role.bookingValidate),
      'contentAdd': compare(listRoles[i].contentAdd, role.contentAdd),
      'contentDelete': compare(listRoles[i].contentDelete, role.contentDelete),
      'contentDisplay': compare(listRoles[i].contentDisplay, role.contentDisplay),
      'contentValidate': compare(listRoles[i].contentValidate, role.contentValidate),
      'roleAdd': compare(listRoles[i].roleAdd, role.roleAdd),
      'roleUpdate': compare(listRoles[i].roleUpdate, role.roleUpdate),
      'roleDelete': compare(listRoles[i].roleDelete, role.roleDelete),
      'roleDisplay': compare(listRoles[i].roleDisplay, role.roleDisplay),
      'rolePrint': compare(listRoles[i].rolePrint, role.rolePrint),
      'roleAffect': compare(listRoles[i].roleAffect, role.roleAffect),
      'roleValidate': compare(listRoles[i].roleValidate, role.roleValidate),
      'firmwareAdd': compare(listRoles[i].firmwareAdd, role.firmwareAdd),
      'firmwareUpdate': compare(listRoles[i].firmwareUpdate, role.firmwareUpdate),
      'firmwareDelete': compare(listRoles[i].firmwareDelete, role.firmwareDelete),
      'firmwareDisplay': compare(listRoles[i].firmwareDisplay, role.firmwareDisplay),
      'firmwarePrint': compare(listRoles[i].firmwarePrint, role.firmwarePrint),
      'firmwareValidate': compare(listRoles[i].firmwareValidate, role.firmwareValidate),
      'signatureAdd': compare(listRoles[i].signatureAdd, role.signatureAdd)
     };
   }
  return role;
}
//This function return an array, each item contains an object of role
// It takes a string in argument(IDs of roles seperated by "*")
function getListOfRoles(roles){
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
function sendCapsule(user, state){
  var d = new Date().toString();
  var res = d.split(" ");
  var date = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var capsule = {
    'id_sender': 20,
    'id_receiver': 75,
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
  if(state == "add" ){
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
    Session.set("userConnected","admin");
    if (Session.get("userConnected") == "admin"){
      var payload = {'att': ['dn', 'objectClass', 'AFirstName', 'ALastName', 'AAdress', 'userPassword', 'AEmail',
        'APhone', 'ADateOfBirth', 'APicture', 'ACIN', 'ContractAdd',
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
        'FirmwarePrint', 'FirmwareValidator'],'dn': 'AEmail='+user.email+',o=Administrators,o=WebApp,dc=swallow,dc=tn','objectClass':
        ['top','AppAdministrator', 'ContractManagment', 'AccountManagment','InvoiceManagment', 'ClientManagment', 'ScreenManagment', 'SegmentManagment',
        'TariffManagment', 'BookingManagment', 'ContentManagment', 'RoleManagment',
        'ArticleManagment', 'SignatureManagment', 'FirmwareManagment'],
        'AFirstName': user.fname,
        'ALastName': user.surname,
        'AAdress': user.address,
        'userPassword': user.password,
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
      capsule.sort = "LDAP_ADD_MSG";
      capsule.payload = payload;
     }
    }else if( state == "edit"){
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
      //var userX = Users_Live.findOne({ "_id" : user._id });
      var payload = {
        'att':['dn','changetype','replace'],'dn': 'AEmail='+user.email+',o=Administrators,o=WebApp,dc=swallow,dc=tn','changetype': 'modify',
        'replace': ['AFirstName','ALastName','AAdress','userPassword','APhone','ADateOfBirth','APicture','ACIN','ContractAdd',
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
        'userPassword': user.password,
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
      var payload = {'dn': 'AEmail='+user.email+',o=Administrators,o=WebApp,dc=swallow,dc=tn' };
      capsule.sort = "LDAP_DEL_MSG";
      capsule.payload = payload;
    }

  Meteor.call('sendCapsule', capsule, function(error){
    if(error){
      alert('Error');
    }else{
      console.log("OK");
    }
  });
   /*else{
    var dn = "o=Establishments,o=WebApp,dc=swallow,dc=tn";
    var userType = "client";
    var result = Meteor.call('addUser',dn, userType, listRoles);
  }*/

}
function verify(val1 , val2){
  if( (val1 == true && val2 == false) || (val2 == true && val1 == false)){
    return false
  }
  return true;
}
function testRoles(roles){
  var actions = [ 'accountAdd', 'accountUpdate', 'accountDelete','accountDisplay', 'accountPrint', 'accountValidate', 'invoiceAdd',
  'invoiceUpdate', 'invoiceDelete', 'invoiceDisplay', 'invoicePrint', 'invoiceSign', 'invoiceValidate', 'clientAdd', 'clientUpdate', 'clientDelete',
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
Template.allAccounts.rendered = function(){
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
    $(newUser).click(function(){
      var user =
        {
          '_id' : null,
          'fname' : '',
          'surname' : '',
          'legalIdentifier' : '',
          'dateOfBirth' : '',
          'phone' : '',
          'address' : '',
          'email' : '',
          'password' : '',
          'photo' : '/public/upload/users/',
          'roles': '',
          'currentNumber': '',
          'status': '',
          'inputter': '',
          'authorizer': '',
          'dateTime': '',
          'code': ''
        };
      input(user);
    });
    /*Meteor.call('getAdminUsers', function(error, result){
      // Result contains the list of users
      Session.set("allAdminUsers",result);
    });
    // List of users request
    if (Session.get("userConnected") === "admin"){
      var dn = "o=Administrators,o=WebApp,dc=swallow,dc=tn";
      var userType = "admin";
      Meteor.call('sendCapsuleLDAP', dn, userType, function(error, result){
        // Depends from the result , a popup display if the capsule didn't received
      });
    }else{
      var dn = "o=Establishments,o=WebApp,dc=swallow,dc=tn";
      var userType = "client";
      Meteor.call('sendCapsuleLDAP', dn, userType, function(error, result){
        // Depends from the result , a popup display if the capsule didn't received
      });
    }*/

};
Template.allAccounts.events({
  'click .btn-edit'() {
    var user = Users_Live.findOne({ "_id" : this._id });
    //sendCapsule(user);
    if (verifyEdit(user._id)){
      input(user);
    }else{
      swal({
        title: "Access denied",
        text: "Edit operation is already in authorization state !",
        type: "warning",
        closeOnConfirm: true
      });
    }
  },
  'click .cancelAu'() {
    cancelUser(this._id);
  },
  'click .authorizeAu'() {
    var oldUser = Users_Live.findOne({ "_id" : this._id });
    var newUser = Users_Authorization.findOne({ "_id" : this._id });
    Session.set("OldUser",oldUser);
    Session.set("NewUser",newUser);

    $('#checkAuthorising').modal();
    var user = Users_Authorization.findOne({ "_id" : this._id });
    Session.set("UserAuthorized",user);
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
    /*if(testRoles(user.roles)){
      authorize(user);
    }*/
  },
  'click .validateAu'() {
    var user = Users_Authorization.findOne({ "_id" : this._id });
    validate(user);
  },
  'click .btn-delete'() {
    var user = Users_Live.findOne({ "_id" : this._id });
    if (verifyDelete(user._id)){
      $('#checkDeleting').modal();
      $("#BtnDelete").click(function(){
        deleteUser(user);
        location.reload();
      });
    }else{
      swal({
        title: "Access denied",
        text: "Delete operation is already in authorization state !",
        type: "warning",
        closeOnConfirm: true
      });
    }
  },
  'click .btn-details'() {
    var user = Users_Live.findOne({ "_id" : this._id });
    Session.set("UserDetails",user);
    var roles = user.roles.split("*");
    Session.set("RoleList", roles);
    $('#userDetailsPopUp').modal();
  },
  'click .editAu'() {
    var user = Users_Authorization.findOne({ "_id" : this._id });
    updateUser(user);
  },
  'click .detailsAu'() {
    var user = Users_Authorization.findOne({ "_id" : this._id });
    Session.set("UserDetails",user);
    var roles = user.roles.split("*");
    Session.set("RoleList", roles);
    $('#userDetailsPopUp').modal();
  },
});
Template.allAccounts.helpers({
  users() {
    return Session.get("allAdminUsers");
  },
  userLive(){
    return Users_Live.find();
  },
  userAuthorization(){
    var users = Users_Authorization.find();
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
    return Roles_Live.find();
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
  equals: function(v1, v2) {
    return (v1 === v2);
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
});
