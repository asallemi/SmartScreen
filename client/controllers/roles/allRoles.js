Roles_Live = new Mongo.Collection('roles_live');
let rolesLive = Meteor.subscribe('roles');

Roles_Authorization = new Mongo.Collection('roles_authorization');
let rolesAuthorization = Meteor.subscribe('roles_authorization');

Roles_History = new Mongo.Collection('roles_history');

Matrix = new Mongo.Collection('matrix');
let matrixHandle = Meteor.subscribe('matrix');

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
function verifyEdit(id){
  var role = Roles_Authorization.findOne({ "_id" : id });
  if(role == undefined){
    return true;
  }
  return false;
}
function verifyDelete(id){
  var role1 = Roles_Authorization.findOne({ "_id" : id+"#D" });
  if( role1 == undefined ){
    return true;
  }
  return false;
}
function input(role){
  if ( role._id == null ){
    role._id = Random.id([10]);
    role.currentNumber = 0;
    role.code = "1002"
  }
  $('#rolePopup').modal();
  Session.set("roleSelected", role);

  role.currentNumber = role.currentNumber + 1 ;
  role.status = 'HLD';
  role.inputter = "Med Saleh";
  role.authorizer = null;

  var array = nextState(role.status);
  hideShowButtons(array);

  $("#save").click(function() {
    var roleName = document.getElementById("roleName").value;
    if(roleName.length > 0){
      var roleAdded = getValuesFromForm();
      roleAdded._id = role._id;
      roleAdded.currentNumber = role.currentNumber;
      roleAdded.status = role.status;
      roleAdded.inputter = role.inputter;
      roleAdded.authorizer = role.authorizer;
      roleAdded.dateTime = new Date();
      Roles_Authorization.insert(roleAdded);
      location.reload();
    }else{
      swal({
        title: "This field cannot be left blank",
        text: "Please enter the role name !",
        type: "warning",
        closeOnConfirm: true
      });
    }

  });
  $("#validate").click(function() {
    var roleName = document.getElementById("roleName").value;
    if(roleName.length > 0){
      var roleAdded = getValuesFromForm();
      roleAdded._id = role._id;
      roleAdded.currentNumber = role.currentNumber;
      roleAdded.status = 'INAU';
      roleAdded.inputter = role.inputter;
      roleAdded.authorizer = role.authorizer;
      roleAdded.dateTime = new Date();
      Roles_Authorization.insert(roleAdded);
      location.reload();
    }else{
      swal({
        title: "This field cannot be left blank",
        text: "Please enter the role name !",
        type: "warning",
        closeOnConfirm: true
      });
    }
  });
}
function updateRole(role){
  $('#rolePopup').modal();
  Session.set("roleSelected", role);
  role.inputter = "User X";
  var array = nextState(role.status);
  for(var i=0; i< array.length; i++){
    console.log("Array :",array[i]);
  }
  hideShowButtons(array);
  $("#save").click(function() {
    var roleUpdated = getValuesFromForm();
    roleUpdated._id = role._id;
    roleUpdated.currentNumber = role.currentNumber;
    roleUpdated.status = role.status;
    roleUpdated.inputter = role.inputter;
    roleUpdated.authorizer = role.authorizer;
    roleUpdated.dateTime = new Date();
    Roles_Authorization.remove(role._id)
    Roles_Authorization.insert(roleUpdated);
    location.reload();
  });
  $("#validate").click(function() {
    var roleUpdated = getValuesFromForm();
    roleUpdated._id = role._id;
    roleUpdated.currentNumber = role.currentNumber;
    roleUpdated.status = 'INAU';
    roleUpdated.inputter = role.inputter;
    roleUpdated.authorizer = role.authorizer;
    roleUpdated.dateTime = new Date();
    Roles_Authorization.remove(role._id)
    Roles_Authorization.insert(roleUpdated);
    location.reload();
  });
}
function cancelRole(id){
  //console.log("ID :",id);
  Roles_Authorization.remove(id);
}
function validate(role){
  Roles_Authorization.update({'_id' : role._id }, {'$set':{ 'status' : 'INAU', 'inputter' : 'Ali Tounsi' , 'dateTime' : new Date() }});
}
function authorize(role){
  if(role._id.indexOf("#") > 0){
    role._id = role._id.replace("#D", "");
  }
  var roleX = Roles_Live.findOne({ "_id" : role._id });
  // entry validated and new entry
  if(roleX !== undefined && role.status == "INAU"){
    role.status = "LIVE";
    role.authorizer = "Akrem Sallemi";
    role.dateTime = new Date();
    roleX.status = 'HIS';
    roleX.dateTime = new Date();
    roleX.currentNumber=role.currentNumber;
    roleX._id = role._id+"#"+(role.currentNumber-1);
    Roles_History.insert(roleX);
    Roles_Live.remove(role._id);
    Roles_Live.insert(role);
    Roles_Authorization.remove(role._id);
    console.log("IF one");
  // edit a role in live
  }else if(roleX !== undefined && role.status == "RNAU"){
    role.authorizer= "3am ali";
    role.status = 'DEL';
    role.dateTime = new Date();
    Roles_History.insert(role);
    Roles_Live.remove(roleX._id);
    Roles_Authorization.remove(role._id);
    Roles_Authorization.remove(role._id+"#D");
    console.log("IF two");
  }else{
    role.status = "LIVE";
    role.authorizer = "Akrem Sallemi";
    role.dateTime = new Date();
    Roles_Live.insert(role);
    Roles_Authorization.remove(role._id);
    console.log("IF one");
  }
}
function deleteRole(role){
  role._id = role._id+"#D"
  role.status = "RNAU";
  role.inputter = "HEDI";
  role.dateTime = new Date();
  role.authorizer = null;
  Roles_Authorization.insert(role);
}
function getValuesFromForm(){
  var roleName = document.getElementById("roleName").value;
  var currentNumber = 0;
  var status = "";
  var inputter = "";
  var authorizer = "";
  var dateTime = "";
  var code = "";
  var accountAdd = null;
  var accountUpdate = null;
  var accountDelete = null;
  var accountDisplay = null;
  var accountPrint = null;
  var accountValidate = null;
  var contractAdd = null;
  var contractUpdate = null;
  var contractDelete = null;
  var contractDisplay = null;
  var contractPrint = null;
  var contractValidate = null;
  var contractSign = null;
  var articleAdd = null;
  var articleUpdate = null;
  var articleDelete = null;
  var articleDisplay = null;
  var articlePrint = null;
  var articleValidate = null;
  var invoiceAdd = null;
  var invoiceUpdate = null;
  var invoiceDelete = null;
  var invoiceDisplay = null;
  var invoicePrint = null;
  var invoiceValidate = null;
  var clientAdd = null;
  var clientUpdate = null;
  var clientDelete = null;
  var clientDisplay = null;
  var clientPrint = null;
  var clientValidate = null;
  var clientAccountManagement = null;
  var screenUpdate = null;
  var screenDelete = null;
  var screenDisplay = null;
  var screenPrint = null;
  var screenValidate = null;
  var screenShow = null;
  var screenUpdateSystem = null;
  var screenClear = null;
  var screenMonitor = null;
  var screenActivate = null;
  var screenOnOff = null;
  var segmentUpdate = null;
  var segmentDelete = null;
  var segmentDisplay = null;
  var segmentPrint = null;
  var segmentAffect = null;
  var segmentValidate = null;
  var tariffAdd = null;
  var tariffUpdate = null;
  var tariffDelete = null;
  var tariffDisplay = null;
  var tariffPrint = null;
  var tariffAffect = null;
  var tariffValidate = null;
  var bookingAdd = null;
  var bookingUpdate = null;
  var bookingDelete = null;
  var bookingDisplay = null;
  var bookingPrint = null;
  var bookingValidate = null;
  var contentAdd = null;
  var contentDelete = null;
  var contentDisplay = null;
  var contentValidate = null;
  var roleAdd = null;
  var roleUpdate = null;
  var roleDelete = null;
  var roleDisplay = null;
  var rolePrint = null;
  var roleAffect = null;
  var roleValidate = null;
  var signatureAdd = null;
  if( $('input[name="accountAdd"]:checked').val() == "YES"){
    accountAdd = true;
  }else if( $('input[name="accountAdd"]:checked').val() == "YES"){
    accountAdd = false;
  }else {
    accountAdd = null;
  }
  if( $('input[name="accountUpdate"]:checked').val() == "YES"){
    accountUpdate = true;
  }else if( $('input[name="accountUpdate"]:checked').val() == "NO"){
    accountUpdate = false;
  }else {
    accountUpdate = null;
  }
  if( $('input[name="accountDelete"]:checked').val() == "YES"){
    accountDelete = true;
  }else if( $('input[name="accountDelete"]:checked').val() == "NO"){
    accountDelete = false;
  }else {
    accountDelete = null;
  }
  if( $('input[name="accountDisplay"]:checked').val() == "YES"){
    accountDisplay = true;
  }else if( $('input[name="accountDisplay"]:checked').val() == "NO"){
    accountDisplay = false;
  }else {
    accountDisplay = null;
  }
  if( $('input[name="accountPrint"]:checked').val() == "YES"){
    accountPrint = true;
  }else if( $('input[name="accountPrint"]:checked').val() == "NO"){
    accountPrint = false;
  }else {
    accountPrint = null;
  }
  if( $('input[name="accountValidate"]:checked').val() == "YES"){
    accountValidate = true;
  }else if( $('input[name="accountValidate"]:checked').val() == "NO"){
    accountValidate = false;
  }else {
    accountValidate = null;
  }
  if( $('input[name="contractAdd"]:checked').val() == "YES"){
    contractAdd = true;
  }else if( $('input[name="contractAdd"]:checked').val() == "NO"){
    contractAdd = false;
  }else {
    contractAdd = null;
  }
  if( $('input[name="contractUpdate"]:checked').val() == "YES"){
    contractUpdate = true;
  }else if( $('input[name="contractUpdate"]:checked').val() == "NO"){
    contractUpdate = false;
  }else {
    contractUpdate = null;
  }
  if( $('input[name="contractDelete"]:checked').val() == "YES"){
    contractDelete = true;
  }else if( $('input[name="contractDelete"]:checked').val() == "NO"){
    contractDelete = false;
  }else {
    contractDelete = null;
  }
  if( $('input[name="contractDisplay"]:checked').val() == "YES"){
    contractDisplay = true;
  }else if( $('input[name="contractDisplay"]:checked').val() == "NO"){
    contractDisplay = false;
  }else {
    contractDisplay = null;
  }
  if( $('input[name="contractPrint"]:checked').val() == "YES"){
    contractPrint = true;
  }else if( $('input[name="contractPrint"]:checked').val() == "NO"){
    contractPrint = false;
  }else {
    contractPrint = null;
  }
  if( $('input[name="contractValidate"]:checked').val() == "YES"){
    contractValidate = true;
  }else if( $('input[name="contractValidate"]:checked').val() == "NO"){
    contractValidate = false;
  }else {
    contractValidate = null;
  }
  if( $('input[name="contractSign"]:checked').val() == "YES"){
    contractSign = true;
  }else if( $('input[name="contractSign"]:checked').val() == "NO"){
    contractSign = false;
  }else{
    contractSign = null;
  }
  if( $('input[name="articleAdd"]:checked').val() == "YES"){
    articleAdd = true;
  }else if ($('input[name="articleAdd"]:checked').val() == "NO") {
    articleAdd = false;
  }else{
    articleAdd = null;
  }
  if( $('input[name="articleUpdate"]:checked').val() == "YES"){
    articleUpdate = true;
  }else if ($('input[name="articleUpdate"]:checked').val() == "NO") {
    articleUpdate = false;
  }else{
    articleUpdate = null;
  }
  if( $('input[name="articleDelete"]:checked').val() == "YES"){
    articleDelete = true;
  }else if ($('input[name="articleDelete"]:checked').val() == "NO") {
    articleDelete = false;
  }else{
    articleDelete = null;
  }
  if( $('input[name="articleDisplay"]:checked').val() == "YES"){
    articleDisplay = true;
  }else if ($('input[name="articleDisplay"]:checked').val() == "NO") {
    articleDisplay = false;
  }else{
    articleDisplay = null;
  }
  if( $('input[name="articlePrint"]:checked').val() == "YES"){
    articlePrint = true;
  }else if ($('input[name="articlePrint"]:checked').val() == "NO") {
    articlePrint = false;
  }else{
    articlePrint = null;
  }
  if( $('input[name="articleValidate"]:checked').val() == "YES"){
    articleValidate = true;
  }else if ($('input[name="articleValidate"]:checked').val() == "NO") {
    articleValidate = false;
  }else{
    articleValidate = null;
  }
  if( $('input[name="invoiceAdd"]:checked').val() == "YES"){
    invoiceAdd = true;
  }else if ($('input[name="invoiceAdd"]:checked').val() == "NO") {
    invoiceAdd = false;
  }else{
    invoiceAdd = null;
  }
  if( $('input[name="invoiceUpdate"]:checked').val() == "YES"){
    invoiceUpdate = true;
  }else if ($('input[name="invoiceUpdate"]:checked').val() == "NO") {
    invoiceUpdate = false;
  }else{
    invoiceUpdate = null;
  }
  if( $('input[name="invoiceDelete"]:checked').val() == "YES"){
    invoiceDelete = true;
  }else if ($('input[name="invoiceDelete"]:checked').val() == "NO") {
    invoiceDelete = false;
  }else{
    invoiceDelete = null;
  }
  if( $('input[name="invoiceDisplay"]:checked').val() == "YES"){
    invoiceDisplay = true;
  }else if ($('input[name="invoiceDisplay"]:checked').val() == "NO") {
    invoiceDisplay = false;
  }else{
    invoiceDisplay = null;
  }
  if( $('input[name="invoicePrint"]:checked').val() == "YES"){
    invoicePrint = true;
  }else if ($('input[name="invoicePrint"]:checked').val() == "NO") {
    invoicePrint = false;
  }else{
    invoicePrint = null;
  }
  if( $('input[name="invoiceValidate"]:checked').val() == "YES"){
    invoiceValidate = true;
  }else if ($('input[name="invoiceValidate"]:checked').val() == "NO") {
    invoiceValidate = false;
  }else{
    invoiceValidate = null;
  }
  if( $('input[name="clientAdd"]:checked').val() == "YES"){
    clientAdd = true;
  }else if ($('input[name="clientAdd"]:checked').val() == "NO") {
    clientAdd = false;
  }else{
    clientAdd = null;
  }
  if( $('input[name="clientUpdate"]:checked').val() == "YES"){
    clientUpdate = true;
  }else if ($('input[name="clientUpdate"]:checked').val() == "NO") {
    clientUpdate = false;
  }else{
    clientUpdate = null;
  }
  if( $('input[name="clientDelete"]:checked').val() == "YES"){
    clientDelete = true;
  }else if ($('input[name="clientDelete"]:checked').val() == "NO") {
    clientDelete = false;
  }else{
    clientDelete = null;
  }
  if( $('input[name="clientDisplay"]:checked').val() == "YES"){
    clientDisplay = true;
  }else if ($('input[name="clientDisplay"]:checked').val() == "NO") {
    clientDisplay = false;
  }else{
    clientDisplay = null;
  }
  if( $('input[name="clientPrint"]:checked').val() == "YES"){
    clientPrint = true;
  }else if ($('input[name="clientPrint"]:checked').val() == "NO") {
    clientPrint = false;
  }else{
    clientPrint = null;
  }
  if( $('input[name="clientValidate"]:checked').val() == "YES"){
    clientValidate = true;
  }else if ($('input[name="clientValidate"]:checked').val() == "NO") {
    clientValidate = false;
  }else{
    clientValidate = null;
  }
  if( $('input[name="clientAccountManagement"]:checked').val() == "YES"){
    clientAccountManagement = true;
  }else if ($('input[name="clientAccountManagement"]:checked').val() == "NO") {
    clientAccountManagement = false;
  }else{
    clientAccountManagement = null;
  }
  if( $('input[name="screenUpdate"]:checked').val() == "YES"){
    screenUpdate = true;
  }else if ($('input[name="screenUpdate"]:checked').val() == "NO") {
    screenUpdate = false;
  }else{
    screenUpdate = null;
  }
  if( $('input[name="screenDelete"]:checked').val() == "YES"){
    screenDelete = true;
  }else if ($('input[name="screenDelete"]:checked').val() == "NO") {
    screenDelete = false;
  }else{
    screenDelete = null;
  }
  if( $('input[name="screenDisplay"]:checked').val() == "YES"){
    screenDisplay = true;
  }else if ($('input[name="screenDisplay"]:checked').val() == "NO") {
    screenDisplay = false;
  }else{
    screenDisplay = null;
  }
  if( $('input[name="screenPrint"]:checked').val() == "YES"){
    screenPrint = true;
  }else if ($('input[name="screenPrint"]:checked').val() == "NO") {
    screenPrint = false;
  }else{
    screenPrint = null;
  }
  if( $('input[name="screenValidate"]:checked').val() == "YES"){
    screenValidate = true;
  }else if ($('input[name="screenValidate"]:checked').val() == "NO") {
    screenValidate = false;
  }else{
    screenValidate = null;
  }
  if( $('input[name="screenShow"]:checked').val() == "YES"){
    screenShow = true;
  }else if ($('input[name="screenShow"]:checked').val() == "NO") {
    screenShow = false;
  }else{
    screenShow = null;
  }
  if( $('input[name="screenUpdateSystem"]:checked').val() == "YES"){
    screenUpdateSystem = true;
  }else if ($('input[name="screenUpdateSystem"]:checked').val() == "NO") {
    screenUpdateSystem = false;
  }else{
    screenUpdateSystem = null;
  }
  if( $('input[name="screenClear"]:checked').val() == "YES"){
    screenClear = true;
  }else if ($('input[name="screenClear"]:checked').val() == "NO") {
    screenClear = false;
  }else{
    screenClear = null;
  }
  if( $('input[name="screenMonitor"]:checked').val() == "YES"){
    screenMonitor = true;
  }else if ($('input[name="screenMonitor"]:checked').val() == "NO") {
    screenMonitor = false;
  }else{
    screenMonitor = null;
  }
  if( $('input[name="screenActivate"]:checked').val() == "YES"){
    screenActivate = true;
  }else if ($('input[name="screenActivate"]:checked').val() == "NO") {
    screenActivate = false;
  }else{
    screenActivate = null;
  }
  if( $('input[name="screenOnOff"]:checked').val() == "YES"){
    screenOnOff = true;
  }else if ($('input[name="screenOnOff"]:checked').val() == "NO") {
    screenOnOff = false;
  }else{
    screenOnOff = null;
  }
  if( $('input[name="segmentUpdate"]:checked').val() == "YES"){
    segmentUpdate = true;
  }else if ($('input[name="segmentUpdate"]:checked').val() == "NO") {
    segmentUpdate = false;
  }else{
    segmentUpdate = null;
  }
  if( $('input[name="segmentDelete"]:checked').val() == "YES"){
    segmentDelete = true;
  }else if ($('input[name="segmentDelete"]:checked').val() == "NO") {
    segmentDelete = false;
  }else{
    segmentDelete = null;
  }
  if( $('input[name="segmentDisplay"]:checked').val() == "YES"){
    segmentDisplay = true;
  }else if ($('input[name="segmentDisplay"]:checked').val() == "NO") {
    segmentDisplay = false;
  }else{
    segmentDisplay = null;
  }
  if( $('input[name="segmentPrint"]:checked').val() == "YES"){
    segmentPrint = true;
  }else if ($('input[name="segmentPrint"]:checked').val() == "NO") {
    segmentPrint = false;
  }else{
    segmentPrint = null;
  }
  if( $('input[name="segmentAffect"]:checked').val() == "YES"){
    segmentAffect = true;
  }else if ($('input[name="segmentAffect"]:checked').val() == "NO") {
    segmentAffect = false;
  }else{
    segmentAffect = null;
  }
  if( $('input[name="segmentValidate"]:checked').val() == "YES"){
    segmentValidate = true;
  }else if ($('input[name="segmentValidate"]:checked').val() == "NO") {
    segmentValidate = false;
  }else{
    segmentValidate = null;
  }
  if( $('input[name="tariffAdd"]:checked').val() == "YES"){
    tariffAdd = true;
  }else if ($('input[name="tariffAdd"]:checked').val() == "NO") {
    tariffAdd = false;
  }else{
    tariffAdd = null;
  }
  if( $('input[name="tariffUpdate"]:checked').val() == "YES"){
    tariffUpdate = true;
  }else if ($('input[name="tariffUpdate"]:checked').val() == "NO") {
    tariffUpdate = false;
  }else{
    tariffUpdate = null;
  }
  if( $('input[name="tariffDelete"]:checked').val() == "YES"){
    tariffDelete = true;
  }else if ($('input[name="tariffDelete"]:checked').val() == "NO") {
    tariffDelete = false;
  }else{
    tariffDelete = null;
  }
  if( $('input[name="tariffDisplay"]:checked').val() == "YES"){
    tariffDisplay = true;
  }else if ($('input[name="tariffDisplay"]:checked').val() == "NO") {
    tariffDisplay = false;
  }else{
    tariffDisplay = null;
  }
  if( $('input[name="tariffPrint"]:checked').val() == "YES"){
    tariffPrint = true;
  }else if ($('input[name="tariffPrint"]:checked').val() == "NO") {
    tariffPrint = false;
  }else{
    tariffPrint = null;
  }
  if( $('input[name="tariffAffect"]:checked').val() == "YES"){
    tariffAffect = true;
  }else if ($('input[name="tariffAffect"]:checked').val() == "NO") {
    tariffAffect = false;
  }else{
    tariffAffect = null;
  }
  if( $('input[name="tariffValidate"]:checked').val() == "YES"){
    tariffValidate = true;
  }else if ($('input[name="tariffValidate"]:checked').val() == "NO") {
    tariffValidate = false;
  }else{
    tariffValidate = null;
  }
  if( $('input[name="bookingAdd"]:checked').val() == "YES"){
    bookingAdd = true;
  }else if ($('input[name="bookingAdd"]:checked').val() == "NO") {
    bookingAdd = false;
  }else{
    bookingAdd = null;
  }
  if( $('input[name="bookingUpdate"]:checked').val() == "YES"){
    bookingUpdate = true;
  }else if ($('input[name="bookingUpdate"]:checked').val() == "NO") {
    bookingUpdate = false;
  }else{
    bookingUpdate = null;
  }
  if( $('input[name="bookingDisplay"]:checked').val() == "YES"){
    bookingDisplay = true;
  }else if ($('input[name="bookingDisplay"]:checked').val() == "NO") {
    bookingDisplay = false;
  }else{
    bookingDisplay = null;
  }
  if( $('input[name="bookingPrint"]:checked').val() == "YES"){
    bookingPrint = true;
  }else if ($('input[name="bookingPrint"]:checked').val() == "NO") {
    bookingPrint = false;
  }else{
    bookingPrint = null;
  }
  if( $('input[name="bookingValidate"]:checked').val() == "YES"){
    bookingValidate = true;
  }else if ($('input[name="bookingValidate"]:checked').val() == "NO") {
    bookingValidate = false;
  }else{
    bookingValidate = null;
  }
  if( $('input[name="contentAdd"]:checked').val() == "YES"){
    contentAdd = true;
  }else if ($('input[name="contentAdd"]:checked').val() == "NO") {
    contentAdd = false;
  }else{
    contentAdd = null;
  }
  if( $('input[name="contentDelete"]:checked').val() == "YES"){
    contentDelete = true;
  }else if ($('input[name="contentDelete"]:checked').val() == "NO") {
    contentDelete = false;
  }else{
    contentDelete = null;
  }
  if( $('input[name="contentDisplay"]:checked').val() == "YES"){
    contentDisplay = true;
  }else if ($('input[name="contentDisplay"]:checked').val() == "NO") {
    contentDisplay = false;
  }else{
    contentDisplay = null;
  }
  if( $('input[name="contentValidate"]:checked').val() == "YES"){
    contentValidate = true;
  }else if ($('input[name="contentValidate"]:checked').val() == "NO") {
    contentValidate = false;
  }else{
    contentValidate = null;
  }
  if( $('input[name="roleAdd"]:checked').val() == "YES"){
    roleAdd = true;
  }else if ($('input[name="roleAdd"]:checked').val() == "NO") {
    roleAdd = false;
  }else{
    roleAdd = null;
  }
  if( $('input[name="roleUpdate"]:checked').val() == "YES"){
    roleUpdate = true;
  }else if ($('input[name="roleUpdate"]:checked').val() == "NO") {
    roleUpdate = false;
  }else{
    roleUpdate = null;
  }
  if( $('input[name="roleDelete"]:checked').val() == "YES"){
    roleDelete = true;
  }else if ($('input[name="roleDelete"]:checked').val() == "NO") {
    roleDelete = false;
  }else{
    roleDelete = null;
  }
  if( $('input[name="roleDisplay"]:checked').val() == "YES"){
    roleDisplay = true;
  }else if ($('input[name="roleDisplay"]:checked').val() == "NO") {
    roleDisplay = false;
  }else{
    roleDisplay = null;
  }
  if( $('input[name="rolePrint"]:checked').val() == "YES"){
    rolePrint = true;
  }else if ($('input[name="rolePrint"]:checked').val() == "NO") {
    rolePrint = false;
  }else{
    rolePrint = null;
  }
  if( $('input[name="roleAffect"]:checked').val() == "YES"){
    roleAffect = true;
  }else if ($('input[name="roleAffect"]:checked').val() == "NO") {
    roleAffect = false;
  }else{
    roleAffect = null;
  }
  if( $('input[name="roleValidate"]:checked').val() == "YES"){
    roleValidate = true;
  }else if ($('input[name="roleValidate1"]:checked').val() == "NO") {
    roleValidate = false;
  }else{
    roleValidate = null;
  }
  if( $('input[name="signatureAdd"]:checked').val() == "YES"){
    signatureAdd = true;
  }else if ($('input[name="signatureAdd"]:checked').val() == "NO") {
    signatureAdd = false;
  }else{
    signatureAdd = null;
  }
  var role =
    {
      'roleName': roleName,
      'accountAdd': accountAdd,
      'accountUpdate': accountUpdate,
      'accountDelete': accountDelete,
      'accountDisplay': accountDisplay,
      'accountPrint': accountPrint,
      'accountValidate': accountValidate,
      'contractAdd': contractAdd,
      'contractUpdate': contractUpdate,
      'contractDelete': contractDelete,
      'contractDisplay': contractDisplay,
      'contractPrint': contractPrint,
      'contractValidate': contractValidate,
      'contractSign': contractSign,
      'articleAdd': articleAdd,
      'articleUpdate': articleUpdate,
      'articleDelete': articleDelete,
      'articleDisplay': articleDisplay,
      'articlePrint': articlePrint,
      'articleValidate': articleValidate,
      'invoiceAdd': invoiceAdd,
      'invoiceUpdate': invoiceUpdate,
      'invoiceDelete': invoiceDelete,
      'invoiceDisplay': invoiceDisplay,
      'invoicePrint': invoicePrint,
      'invoiceValidate': invoiceValidate,
      'clientAdd': clientAdd,
      'clientUpdate': clientUpdate,
      'clientDelete': clientDelete,
      'clientDisplay': clientDisplay,
      'clientPrint': clientPrint,
      'clientValidate': clientValidate,
      'clientAccountManagement': clientAccountManagement,
      'screenUpdate': screenUpdate,
      'screenDelete': screenDelete,
      'screenDisplay': screenDisplay,
      'screenPrint': screenPrint,
      'screenValidate': screenValidate,
      'screenShow': screenShow,
      'screenUpdateSystem': screenUpdateSystem,
      'screenClear': screenClear,
      'screenMonitor': screenMonitor,
      'screenActivate': screenActivate,
      'screenOnOff': screenOnOff,
      'segmentUpdate': segmentUpdate,
      'segmentDelete': segmentDelete,
      'segmentDisplay': segmentDisplay,
      'segmentPrint': segmentPrint,
      'segmentAffect': segmentAffect,
      'segmentValidate': segmentValidate,
      'tariffAdd': tariffAdd,
      'tariffUpdate': tariffUpdate,
      'tariffDelete': tariffDelete,
      'tariffDisplay': tariffDisplay,
      'tariffPrint': tariffPrint,
      'tariffAffect': tariffAffect,
      'tariffValidate': tariffValidate,
      'bookingAdd': bookingAdd,
      'bookingUpdate': bookingUpdate,
      'bookingDelete': bookingDelete,
      'bookingDisplay': bookingDisplay,
      'bookingPrint': bookingPrint,
      'bookingValidate': bookingValidate,
      'contentAdd': contentAdd,
      'contentDelete': contentDelete,
      'contentDisplay': contentDisplay,
      'contentValidate': contentValidate,
      'roleAdd': roleAdd,
      'roleUpdate': roleUpdate,
      'roleDelete': roleDelete,
      'roleDisplay': roleDisplay,
      'rolePrint': rolePrint,
      'roleAffect': roleAffect,
      'roleValidate': roleValidate,
      'signatureAdd': signatureAdd
    };
  return role;
}
function getItemSelected(){
  var accountAdd = null;
  var accountUpdate = null;
  var accountDelete = null;
  var accountDisplay = null;
  var accountPrint = null;
  var accountValidate = null;
  var contractAdd = null;
  var contractUpdate = null;
  var contractDelete = null;
  var contractDisplay = null;
  var contractPrint = null;
  var contractValidate = null;
  var contractSign = null;
  var articleAdd = null;
  var articleUpdate = null;
  var articleDelete = null;
  var articleDisplay = null;
  var articlePrint = null;
  var articleValidate = null;
  var invoiceAdd = null;
  var invoiceUpdate = null;
  var invoiceDelete = null;
  var invoiceDisplay = null;
  var invoicePrint = null;
  var invoiceValidate = null;
  var clientAdd = null;
  var clientUpdate = null;
  var clientDelete = null;
  var clientDisplay = null;
  var clientPrint = null;
  var clientValidate = null;
  var clientAccountManagement = null;
  var screenUpdate = null;
  var screenDelete = null;
  var screenDisplay = null;
  var screenPrint = null;
  var screenValidate = null;
  var screenShow = null;
  var screenUpdateSystem = null;
  var screenClear = null;
  var screenMonitor = null;
  var screenActivate = null;
  var screenOnOff = null;
  var segmentUpdate = null;
  var segmentDelete = null;
  var segmentDisplay = null;
  var segmentPrint = null;
  var segmentAffect = null;
  var segmentValidate = null;
  var tariffAdd = null;
  var tariffUpdate = null;
  var tariffDelete = null;
  var tariffDisplay = null;
  var tariffPrint = null;
  var tariffAffect = null;
  var tariffValidate = null;
  var bookingAdd = null;
  var bookingUpdate = null;
  var bookingDelete = null;
  var bookingDisplay = null;
  var bookingPrint = null;
  var bookingValidate = null;
  var contentAdd = null;
  var contentDelete = null;
  var contentDisplay = null;
  var contentValidate = null;
  var roleAdd = null;
  var roleUpdate = null;
  var roleDelete = null;
  var roleDisplay = null;
  var rolePrint = null;
  var roleAffect = null;
  var roleValidate = null;
  var signatureAdd = null;
  var account = false;
  var contract = false;
  var article = false;
  var invoice = false;
  var client = false;
  var screen = false;
  var segment = false;
  var tariff = false;
  var booking = false;
  var content = false;
  var role = false;
  var signature = false;

  if( $('input[name="accountAdd"]:checked').val() == "YES"){
    accountAdd = true;
    account = true;
  }else if( $('input[name="accountAdd"]:checked').val() == "NO"){
    accountAdd = false;
    account = true;
  }else {
    accountAdd = null;
  }
  if( $('input[name="accountUpdate"]:checked').val() == "YES"){
    accountUpdate = true;
    account = true;
  }else if( $('input[name="accountUpdate"]:checked').val() == "NO"){
    accountUpdate = false;
    account = true;
  }else {
    accountUpdate = null;
  }
  if( $('input[name="accountDelete"]:checked').val() == "YES"){
    accountDelete = true;
    account = true;
  }else if( $('input[name="accountDelete"]:checked').val() == "NO"){
    accountDelete = false;
    account = true;
  }else {
    accountDelete = null;
  }
  if( $('input[name="accountDisplay"]:checked').val() == "YES"){
    accountDisplay = true;
    account = true;
  }else if( $('input[name="accountDisplay"]:checked').val() == "NO"){
    accountDisplay = false;
    account = true;
  }else {
    accountDisplay = null;
  }
  if( $('input[name="accountPrint"]:checked').val() == "YES"){
    accountPrint = true;
    account = true;
  }else if( $('input[name="accountPrint"]:checked').val() == "NO"){
    accountPrint = false;
    account = true;
  }else {
    accountPrint = null;
  }
  if( $('input[name="accountValidate"]:checked').val() == "YES"){
    accountValidate = true;
    account = true;
  }else if( $('input[name="accountValidate"]:checked').val() == "NO"){
    accountValidate = false;
    account = true;
  }else {
    accountValidate = null;
  }
  if( $('input[name="contractAdd"]:checked').val() == "YES"){
    contractAdd = true;
    contract = true;
  }else if( $('input[name="contractAdd"]:checked').val() == "NO"){
    contractAdd = false;
    contract = true;
  }else {
    contractAdd = null;
  }
  if( $('input[name="contractUpdate"]:checked').val() == "YES"){
    contractUpdate = true;
    contract = true;
  }else if( $('input[name="contractUpdate"]:checked').val() == "NO"){
    contractUpdate = false;
    contract = true;
  }else {
    contractUpdate = null;
  }
  if( $('input[name="contractDelete"]:checked').val() == "YES"){
    contractDelete = true;
    contract = true;
  }else if( $('input[name="contractDelete"]:checked').val() == "NO"){
    contractDelete = false;
    contract = true;
  }else {
    contractDelete = null;
  }
  if( $('input[name="contractDisplay"]:checked').val() == "YES"){
    contractDisplay = true;
    contract = true;
  }else if( $('input[name="contractDisplay"]:checked').val() == "NO"){
    contractDisplay = false;
    contract = true;
  }else {
    contractDisplay = null;
  }
  if( $('input[name="contractPrint"]:checked').val() == "YES"){
    contractPrint = true;
    contract = true;
  }else if( $('input[name="contractPrint"]:checked').val() == "NO"){
    contractPrint = false;
    contract = true;
  }else {
    contractPrint = null;
  }
  if( $('input[name="contractValidate"]:checked').val() == "YES"){
    contractValidate = true;
    contract = true;
  }else if( $('input[name="contractValidate"]:checked').val() == "NO"){
    contractValidate = false;
    contract = true;
  }else {
    contractValidate = null;
  }
  if( $('input[name="contractSign"]:checked').val() == "YES"){
    contractSign = true;
    contract = true;
  }else if( $('input[name="contractSign"]:checked').val() == "NO"){
    contractSign = false;
    contract = true;
  }else{
    contractSign = null;
  }
  if( $('input[name="articleAdd"]:checked').val() == "YES"){
    articleAdd = true;
    article = true;
  }else if ($('input[name="articleAdd"]:checked').val() == "NO") {
    articleAdd = false;
    article = true;
  }else{
    articleAdd = null;
  }
  if( $('input[name="articleUpdate"]:checked').val() == "YES"){
    articleUpdate = true;
    article = true;
  }else if ($('input[name="articleUpdate"]:checked').val() == "NO") {
    articleUpdate = false;
    article = true;
  }else{
    articleUpdate = null;
  }
  if( $('input[name="articleDelete"]:checked').val() == "YES"){
    articleDelete = true;
    article = true;
  }else if ($('input[name="articleDelete"]:checked').val() == "NO") {
    articleDelete = false;
    article = true;
  }else{
    articleDelete = null;
  }
  if( $('input[name="articleDisplay"]:checked').val() == "YES"){
    articleDisplay = true;
    article = true;
  }else if ($('input[name="articleDisplay"]:checked').val() == "NO") {
    articleDisplay = false;
    article = true;
  }else{
    articleDisplay = null;
  }
  if( $('input[name="articlePrint"]:checked').val() == "YES"){
    articlePrint = true;
    article = true;
  }else if ($('input[name="articlePrint"]:checked').val() == "NO") {
    articlePrint = false;
    article = true;
  }else{
    articlePrint = null;
  }
  if( $('input[name="articleValidate"]:checked').val() == "YES"){
    articleValidate = true;
    article = true;
  }else if ($('input[name="articleValidate"]:checked').val() == "NO") {
    articleValidate = false;
    article = true;
  }else{
    articleValidate = null;
  }
  if( $('input[name="invoiceAdd"]:checked').val() == "YES"){
    invoiceAdd = true;
    invoice = true;
  }else if ($('input[name="invoiceAdd"]:checked').val() == "NO") {
    invoiceAdd = false;
    invoice = true;
  }else{
    invoiceAdd = null;
  }
  if( $('input[name="invoiceUpdate"]:checked').val() == "YES"){
    invoiceUpdate = true;
    invoice = true;
  }else if ($('input[name="invoiceUpdate"]:checked').val() == "NO") {
    invoiceUpdate = false;
    invoice = true;
  }else{
    invoiceUpdate = null;
  }
  if( $('input[name="invoiceDelete"]:checked').val() == "YES"){
    invoiceDelete = true;
    invoice = true;
  }else if ($('input[name="invoiceDelete"]:checked').val() == "NO") {
    invoiceDelete = false;
    invoice = true;
  }else{
    invoiceDelete = null;
  }
  if( $('input[name="invoiceDisplay"]:checked').val() == "YES"){
    invoiceDisplay = true;
    invoice = true;
  }else if ($('input[name="invoiceDisplay"]:checked').val() == "NO") {
    invoiceDisplay = false;
    invoice = true;
  }else{
    invoiceDisplay = null;
  }
  if( $('input[name="invoicePrint"]:checked').val() == "YES"){
    invoicePrint = true;
    invoice = true;
  }else if ($('input[name="invoicePrint"]:checked').val() == "NO") {
    invoicePrint = false;
    invoice = true;
  }else{
    invoicePrint = null;
  }
  if( $('input[name="invoiceValidate"]:checked').val() == "YES"){
    invoiceValidate = true;
    invoice = true;
  }else if ($('input[name="invoiceValidate"]:checked').val() == "NO") {
    invoiceValidate = false;
    invoice = true;
  }else{
    invoiceValidate = null;
  }
  if( $('input[name="clientAdd"]:checked').val() == "YES"){
    clientAdd = true;
    client = true;
  }else if ($('input[name="clientAdd"]:checked').val() == "NO") {
    clientAdd = false;
    client = true;
  }else{
    clientAdd = null;
  }
  if( $('input[name="clientUpdate"]:checked').val() == "YES"){
    clientUpdate = true;
    client = true;
  }else if ($('input[name="clientUpdate"]:checked').val() == "NO") {
    clientUpdate = false;
    client = true;
  }else{
    clientUpdate = null;
  }
  if( $('input[name="clientDelete"]:checked').val() == "YES"){
    clientDelete = true;
    client = true;
  }else if ($('input[name="clientDelete"]:checked').val() == "NO") {
    clientDelete = false;
    client = true;
  }else{
    clientDelete = null;
  }
  if( $('input[name="clientDisplay"]:checked').val() == "YES"){
    clientDisplay = true;
    client = true;
  }else if ($('input[name="clientDisplay"]:checked').val() == "NO") {
    clientDisplay = false;
    client = true;
  }else{
    clientDisplay = null;
  }
  if( $('input[name="clientPrint"]:checked').val() == "YES"){
    clientPrint = true;
    client = true;
  }else if ($('input[name="clientPrint"]:checked').val() == "NO") {
    clientPrint = false;
    client = true;
  }else{
    clientPrint = null;
  }
  if( $('input[name="clientValidate"]:checked').val() == "YES"){
    clientValidate = true;
    client = true;
  }else if ($('input[name="clientValidate"]:checked').val() == "NO") {
    clientValidate = false;
    client = true;
  }else{
    clientValidate = null;
  }
  if( $('input[name="clientAccountManagement"]:checked').val() == "YES"){
    clientAccountManagement = true;
    client = true;
  }else if ($('input[name="clientAccountManagement"]:checked').val() == "NO") {
    clientAccountManagement = false;
    client = true;
  }else{
    clientAccountManagement = null;
  }
  if( $('input[name="screenUpdate"]:checked').val() == "YES"){
    screenUpdate = true;
    screen = true;
  }else if ($('input[name="screenUpdate"]:checked').val() == "NO") {
    screenUpdate = false;
    screen = true;
  }else{
    screenUpdate = null;
  }
  if( $('input[name="screenDelete"]:checked').val() == "YES"){
    screenDelete = true;
    screen = true;
  }else if ($('input[name="screenDelete"]:checked').val() == "NO") {
    screenDelete = false;
    screen = true;
  }else{
    screenDelete = null;
  }
  if( $('input[name="screenDisplay"]:checked').val() == "YES"){
    screenDisplay = true;
    screen = true;
  }else if ($('input[name="screenDisplay"]:checked').val() == "NO") {
    screenDisplay = false;
    screen = true;
  }else{
    screenDisplay = null;
  }
  if( $('input[name="screenPrint"]:checked').val() == "YES"){
    screenPrint = true;
    screen = true;
  }else if ($('input[name="screenPrint"]:checked').val() == "NO") {
    screenPrint = false;
    screen = true;
  }else{
    screenPrint = null;
  }
  if( $('input[name="screenValidate"]:checked').val() == "YES"){
    screenValidate = true;
    screen = true;
  }else if ($('input[name="screenValidate"]:checked').val() == "NO") {
    screenValidate = false;
    screen = true;
  }else{
    screenValidate = null;
  }
  if( $('input[name="screenShow"]:checked').val() == "YES"){
    screenShow = true;
    screen = true;
  }else if ($('input[name="screenShow"]:checked').val() == "NO") {
    screenShow = false;
    screen = true;
  }else{
    screenShow = null;
  }
  if( $('input[name="screenUpdateSystem"]:checked').val() == "YES"){
    screenUpdateSystem = true;
    screen = true;
  }else if ($('input[name="screenUpdateSystem"]:checked').val() == "NO") {
    screenUpdateSystem = false;
    screen = true;
  }else{
    screenUpdateSystem = null;
  }
  if( $('input[name="screenClear"]:checked').val() == "YES"){
    screenClear = true;
    screen = true;
  }else if ($('input[name="screenClear"]:checked').val() == "NO") {
    screenClear = false;
    screen = true;
  }else{
    screenClear = null;
  }
  if( $('input[name="screenMonitor"]:checked').val() == "YES"){
    screenMonitor = true;
    screen = true;
  }else if ($('input[name="screenMonitor"]:checked').val() == "NO") {
    screenMonitor = false;
    screen = true;
  }else{
    screenMonitor = null;
  }
  if( $('input[name="screenActivate"]:checked').val() == "YES"){
    screenActivate = true;
    screen = true;
  }else if ($('input[name="screenActivate"]:checked').val() == "NO") {
    screenActivate = false;
    screen = true;
  }else{
    screenActivate = null;
  }
  if( $('input[name="screenOnOff"]:checked').val() == "YES"){
    screenOnOff = true;
    screen = true;
  }else if ($('input[name="screenOnOff"]:checked').val() == "NO") {
    screenOnOff = false;
    screen = true;
  }else{
    screenOnOff = null;
  }
  if( $('input[name="segmentUpdate"]:checked').val() == "YES"){
    segmentUpdate = true;
    segment = true;
  }else if ($('input[name="segmentUpdate"]:checked').val() == "NO") {
    segmentUpdate = false;
    segment = true;
  }else{
    segmentUpdate = null;
  }
  if( $('input[name="segmentDelete"]:checked').val() == "YES"){
    segmentDelete = true;
    segment = true;
  }else if ($('input[name="segmentDelete"]:checked').val() == "NO") {
    segmentDelete = false;
    segment = true;
  }else{
    segmentDelete = null;
  }
  if( $('input[name="segmentDisplay"]:checked').val() == "YES"){
    segmentDisplay = true;
    segment = true;
  }else if ($('input[name="segmentDisplay"]:checked').val() == "NO") {
    segmentDisplay = false;
    segment = true;
  }else{
    segmentDisplay = null;
  }
  if( $('input[name="segmentPrint"]:checked').val() == "YES"){
    segmentPrint = true;
    segment = true;
  }else if ($('input[name="segmentPrint"]:checked').val() == "NO") {
    segmentPrint = false;
    segment = true;
  }else{
    segmentPrint = null;
  }
  if( $('input[name="segmentAffect"]:checked').val() == "YES"){
    segmentAffect = true;
    segment = true;
  }else if ($('input[name="segmentAffect"]:checked').val() == "NO") {
    segmentAffect = false;
    segment = true;
  }else{
    segmentAffect = null;
  }
  if( $('input[name="segmentValidate"]:checked').val() == "YES"){
    segmentValidate = true;
    segment = true;
  }else if ($('input[name="segmentValidate"]:checked').val() == "NO") {
    segmentValidate = false;
    segment = true;
  }else{
    segmentValidate = null;
  }
  if( $('input[name="tariffAdd"]:checked').val() == "YES"){
    tariffAdd = true;
    tariff = true;
  }else if ($('input[name="tariffAdd"]:checked').val() == "NO") {
    tariffAdd = false;
    tariff = true;
  }else{
    tariffAdd = null;
  }
  if( $('input[name="tariffUpdate"]:checked').val() == "YES"){
    tariffUpdate = true;
    tariff = true;
  }else if ($('input[name="tariffUpdate"]:checked').val() == "NO") {
    tariffUpdate = false;
    tariff = true;
  }else{
    tariffUpdate = null;
  }
  if( $('input[name="tariffDelete"]:checked').val() == "YES"){
    tariffDelete = true;
    tariff = true;
  }else if ($('input[name="tariffDelete"]:checked').val() == "NO") {
    tariffDelete = false;
    tariff = true;
  }else{
    tariffDelete = null;
  }
  if( $('input[name="tariffDisplay"]:checked').val() == "YES"){
    tariffDisplay = true;
    tariff = true;
  }else if ($('input[name="tariffDisplay"]:checked').val() == "NO") {
    tariffDisplay = false;
    tariff = true;
  }else{
    tariffDisplay = null;
  }
  if( $('input[name="tariffPrint"]:checked').val() == "YES"){
    tariffPrint = true;
    tariff = true;
  }else if ($('input[name="tariffPrint"]:checked').val() == "NO") {
    tariffPrint = false;
    tariff = true;
  }else{
    tariffPrint = null;
  }
  if( $('input[name="tariffAffect"]:checked').val() == "YES"){
    tariffAffect = true;
    tariff = true;
  }else if ($('input[name="tariffAffect"]:checked').val() == "NO") {
    tariffAffect = false;
    tariff = true;
  }else{
    tariffAffect = null;
  }
  if( $('input[name="tariffValidate"]:checked').val() == "YES"){
    tariffValidate = true;
    tariff = true;
  }else if ($('input[name="tariffValidate"]:checked').val() == "NO") {
    tariffValidate = false;
    tariff = true;
  }else{
    tariffValidate = null;
  }
  if( $('input[name="bookingAdd"]:checked').val() == "YES"){
    bookingAdd = true;
    booking = true;
  }else if ($('input[name="bookingAdd"]:checked').val() == "NO") {
    bookingAdd = false;
    booking = true;
  }else{
    bookingAdd = null;
  }
  if( $('input[name="bookingUpdate"]:checked').val() == "YES"){
    bookingUpdate = true;
    booking = true;
  }else if ($('input[name="bookingUpdate"]:checked').val() == "NO") {
    bookingUpdate = false;
    booking = true;
  }else{
    bookingUpdate = null;
  }
  if( $('input[name="bookingDisplay"]:checked').val() == "YES"){
    bookingDisplay = true;
    booking = true;
  }else if ($('input[name="bookingDisplay"]:checked').val() == "NO") {
    bookingDisplay = false;
    booking = true;
  }else{
    bookingDisplay = null;
  }
  if( $('input[name="bookingPrint"]:checked').val() == "YES"){
    bookingPrint = true;
    booking = true;
  }else if ($('input[name="bookingPrint"]:checked').val() == "NO") {
    bookingPrint = false;
    booking = true;
  }else{
    bookingPrint = null;
  }
  if( $('input[name="bookingValidate"]:checked').val() == "YES"){
    bookingValidate = true;
    booking = true;
  }else if ($('input[name="bookingValidate"]:checked').val() == "NO") {
    bookingValidate = false;
    booking = true;
  }else{
    bookingValidate = null;
  }
  if( $('input[name="contentAdd"]:checked').val() == "YES"){
    contentAdd = true;
    content = true;
  }else if ($('input[name="contentAdd"]:checked').val() == "NO") {
    contentAdd = false;
    content = true;
  }else{
    contentAdd = null;
  }
  if( $('input[name="contentDelete"]:checked').val() == "YES"){
    contentDelete = true;
    content = true;
  }else if ($('input[name="contentDelete"]:checked').val() == "NO") {
    contentDelete = false;
    content = true;
  }else{
    contentDelete = null;
  }
  if( $('input[name="contentDisplay"]:checked').val() == "YES"){
    contentDisplay = true;
    content = true;
  }else if ($('input[name="contentDisplay"]:checked').val() == "NO") {
    contentDisplay = false;
    content = true;
  }else{
    contentDisplay = null;
  }
  if( $('input[name="contentValidate"]:checked').val() == "YES"){
    contentValidate = true;
    content = true;
  }else if ($('input[name="contentValidate"]:checked').val() == "NO") {
    contentValidate = false;
    content = true;
  }else{
    contentValidate = null;
  }
  if( $('input[name="roleAdd"]:checked').val() == "YES"){
    roleAdd = true;
    role = true;
  }else if ($('input[name="roleAdd"]:checked').val() == "NO") {
    roleAdd = false;
    role = true;
  }else{
    roleAdd = null;
  }
  if( $('input[name="roleUpdate"]:checked').val() == "YES"){
    roleUpdate = true;
    role = true;
  }else if ($('input[name="roleUpdate"]:checked').val() == "NO") {
    roleUpdate = false;
    role = true;
  }else{
    roleUpdate = null;
  }
  if( $('input[name="roleDelete"]:checked').val() == "YES"){
    roleDelete = true;
    role = true;
  }else if ($('input[name="roleDelete"]:checked').val() == "NO") {
    roleDelete = false;
    role = true;
  }else{
    roleDelete = null;
  }
  if( $('input[name="roleDisplay"]:checked').val() == "YES"){
    roleDisplay = true;
    role = true;
  }else if ($('input[name="roleDisplay"]:checked').val() == "NO") {
    roleDisplay = false;
    role = true;
  }else{
    roleDisplay = null;
  }
  if( $('input[name="rolePrint"]:checked').val() == "YES"){
    rolePrint = true;
    role = true;
  }else if ($('input[name="rolePrint"]:checked').val() == "NO") {
    rolePrint = false;
    role = true;
  }else{
    rolePrint = null;
  }
  if( $('input[name="roleAffect"]:checked').val() == "YES"){
    roleAffect = true;
    role = true;
  }else if ($('input[name="roleAffect"]:checked').val() == "NO") {
    roleAffect = false;
    role = true;
  }else{
    roleAffect = null;
  }
  if( $('input[name="roleValidate"]:checked').val() == "YES"){
    roleValidate = true;
    role = true;
  }else if ($('input[name="roleValidate1"]:checked').val() == "NO") {
    roleValidate = false;
    role = true;
  }else{
    roleValidate = null;
  }
  if( $('input[name="signatureAdd"]:checked').val() == "YES"){
    signatureAdd = true;
    signature = true;
  }else if ($('input[name="signatureAdd"]:checked').val() == "NO") {
    signatureAdd = false;
    signature = true;
  }else{
    signatureAdd = null;
  }
  var array = [];
  if( account == true){
    var obj = {
      'item': "Accounts"
    };
    array.push(obj);
  }
  if( contract == true){
    var obj = {
      'item': "Contracts"
    };
    array.push(obj);
  }
  if( article == true){
    var obj = {
      'item': "Articles"
    };
    array.push(obj);
  }
  if( invoice == true){
    var obj = {
      'item': "Invoices"
    };
    array.push(obj);
  }
  if( client == true){
    var obj = {
      'item': "Clients"
    };
    array.push(obj);
  }
  if( screen == true){
    var obj = {
      'item': "Screens"
    };
    array.push(obj);
  }
  if( tariff == true){
    var obj = {
      'item': "Tariffs"
    };
    array.push(obj);
  }
  if( booking == true){
    var obj = {
      'item': "Bookings"
    };
    array.push(obj);
  }
  if( content == true){
    var obj = {
      'item': "Contents"
    };
    array.push(obj);
  }
  if( role == true){
    var obj = {
      'item': "Roles"
    };
    array.push(obj);
  }
  if( signature == true){
    var obj = {
      'item': "Signatures"
    };
    array.push(obj);
  }
  return array;
}
Template.allRoles.rendered = function(){
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
    $(newRole).click(function(){
      var role =
        {
          '_id': null,
          'roleName': '',
          'currentNumber': 0,
          'status': '',
          'inputter': '',
          'authorizer': '',
          'dateTime': '',
          'code': '',
          'accountAdd': null,
          'accountUpdate': null,
          'accountDelete': null,
          'accountDisplay': null,
          'accountPrint': null,
          'accountValidate': null,
          'contractAdd': null,
          'contractUpdate': null,
          'contractDelete': null,
          'contractDisplay': null,
          'articleAdd': null,
          'articleUpdate': null,
          'articleDelete': null,
          'articleDisplay': null,
          'articlePrint': null,
          'articleValidate': null,
          'invoiceAdd': null,
          'invoiceUpdate': null,
          'invoiceDelete': null,
          'invoiceDisplay': null,
          'invoicePrint': null,
          'invoiceValidate': null,
          'clientAdd': null,
          'clientUpdate': null,
          'clientDelete': null,
          'clientDisplay': null,
          'clientPrint': null,
          'clientValidate': null,
          'clientAccountManagement': null,
          'screenUpdate': null,
          'screenDelete': null,
          'screenDisplay': null,
          'screenPrint': null,
          'screenValidate': null,
          'screenShow': null,
          'screenUpdateSystem': null,
          'screenClear': null,
          'screenMonitor': null,
          'screenActivate': null,
          'screenOnOff': null,
          'segmentUpdate': null,
          'segmentDelete': null,
          'segmentDisplay': null,
          'segmentPrint': null,
          'segmentAffect': null,
          'segmentValidate': null,
          'tariffAdd': null,
          'tariffUpdate': null,
          'tariffDelete': null,
          'tariffDisplay': null,
          'tariffPrint': null,
          'tariffAffect': null,
          'tariffValidate': null,
          'bookingAdd': null,
          'bookingUpdate': null,
          'bookingDelete': null,
          'bookingDisplay': null,
          'bookingPrint': null,
          'bookingValidate': null,
          'contentAdd': null,
          'contentDelete': null,
          'contentDisplay': null,
          'contentValidate': null,
          'roleAdd': null,
          'roleUpdate': null,
          'roleDelete': null,
          'roleDisplay': null,
          'rolePrint': null,
          'roleAffect': null,
          'roleValidate': null,
          'signatureAdd': null
        };
       input(role);
    });
    // Initialize i-check plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

};
Template.allRoles.events({
  'click .btn-edit'() {
    var role = Roles_Live.findOne({ "_id" : this._id });
    if (verifyEdit(role._id)){
      input(role);
    }else{
      swal({
        title: "Access denied",
        text: "Edit operation is already in authorization state !",
        type: "warning",
        closeOnConfirm: true
      });
    }
  },
  'click .editAu'() {
    var role = Roles_Authorization.findOne({ "_id" : this._id });
    //console.log("Role name :",role.roleName);
    updateRole(role);
  },
  'click .validateAu'() {
    var role = Roles_Authorization.findOne({ "_id" : this._id });
    validate(role);
  },

  'click .btn-delete'() {
    var role = Roles_Live.findOne({ "_id" : this._id });
    if (verifyDelete(role._id)){
      $('#checkDeleting').modal();
      $("#BtnDelete").click(function(){
        deleteRole(role);
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
  'click .authorizeAu'() {
    $('#checkAuthorising').modal();
    var role = Roles_Authorization.findOne({ "_id" : this._id });
    Session.set("RoleAuthorized",role);
  },
  'click .BtnAuthorize'() {
    authorize(Session.get("RoleAuthorized"));
  },
  'click .cancelAu'() {
    cancelRole(this._id);
  },
  'click .btn-details'() {
    var role = Roles_Live.findOne({ "_id" : this._id });
    Session.set("RoleDetails",role);
    $('#roleDetails').modal();
  },
  'click .detailsAu'() {
    var role = Roles_Authorization.findOne({ "_id" : this._id });
    Session.set("RoleDetails",role);
    $('#roleDetails').modal();
  },
  'click .compare'() {
    var role = Roles_Live.findOne({ "_id" : this._id });
    var role1 = Roles_Authorization.findOne({ "_id" : this._id });
    Session.set("RoleDetails",role);
    Session.set("RoleCompare",role1);
    $('#rolesCompare').modal();
  },
  'click .recap'() {
    $('#recapitulative').modal();
    Session.set("RECAP",getItemSelected());
  },
});
Template.allRoles.helpers({
  roles_live() {
    return Roles_Live.find();
  },
  recap() {
    return Session.get("RECAP");;
  },
  roles_authorization() {
    var roles = Roles_Authorization.find();
    var rolesAuthorization = [];
    roles.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var role =
        {
          '_id' : doc._id,
          'roleName': doc.roleName,
          'currentNumber': doc.currentNumber,
          'status': doc.status,
          'inputter': doc.inputter,
          'authorizer': doc.authorizer,
          'dateTime': doc.dateTime,
          'code': doc.code,
          'accountAdd': doc.accountAdd,
          'accountUpdate': doc.accountUpdate,
          'accountDelete': doc.accountDelete,
          'accountDisplay': doc.accountDisplay,
          'accountPrint': doc.accountPrint,
          'accountValidate': doc.accountValidate,
          'contractAdd': doc.contractAdd,
          'contractUpdate': doc.contractUpdate,
          'contractDelete': doc.contractDelete,
          'contractDisplay': doc.contractDisplay,
          'contractPrint': doc.contractPrint,
          'contractValidate': doc.contractValidate,
          'contractSign': doc.contractSign,
          'articleAdd': doc.articleAdd,
          'articleUpdate': doc.articleUpdate,
          'articleDelete': doc.articleDelete,
          'articleDisplay': doc.articleDisplay,
          'articlePrint': doc.articlePrint,
          'articleValidate': doc.articleValidate,
          'invoiceAdd': doc.invoiceAdd,
          'invoiceUpdate': doc.invoiceUpdate,
          'invoiceDelete': doc.invoiceDelete,
          'invoiceDisplay': doc.invoiceDisplay,
          'invoicePrint': doc.invoicePrint,
          'invoiceValidate': doc.invoiceValidate,
          'clientAdd': doc.clientAdd,
          'clientUpdate': doc.clientUpdate,
          'clientDelete': doc.clientDelete,
          'clientDisplay': doc.clientDisplay,
          'clientPrint': doc.clientPrint,
          'clientValidate': doc.clientValidate,
          'clientAccountManagement': doc.clientAccountManagement,
          'screenUpdate': doc.screenUpdate,
          'screenDelete': doc.screenDelete,
          'screenDisplay': doc.screenDisplay,
          'screenPrint': doc.screenPrint,
          'screenValidate': doc.screenValidate,
          'screenShow': doc.screenShow,
          'screenUpdateSystem': doc.screenUpdateSystem,
          'screenClear': doc.screenClear,
          'screenMonitor': doc.screenMonitor,
          'screenActivate': doc.screenActivate,
          'screenOnOff': doc.screenOnOff,
          'segmentUpdate': doc.segmentUpdate,
          'segmentDelete': doc.segmentDelete,
          'segmentDisplay': doc.segmentDisplay,
          'segmentPrint': doc.segmentPrint,
          'segmentAffect': doc.segmentAffect,
          'segmentValidate': doc.segmentValidate,
          'tariffAdd': doc.tariffAdd,
          'tariffUpdate': doc.tariffUpdate,
          'tariffDelete': doc.tariffDelete,
          'tariffDisplay': doc.tariffDisplay,
          'tariffPrint': doc.tariffPrint,
          'tariffAffect': doc.tariffAffect,
          'tariffValidate': doc.tariffValidate,
          'bookingAdd': doc.bookingAdd,
          'bookingUpdate': doc.bookingUpdate,
          'bookingDelete': doc.bookingDelete,
          'bookingDisplay': doc.bookingDisplay,
          'bookingPrint': doc.bookingPrint,
          'bookingValidate': doc.bookingValidate,
          'contentAdd': doc.contentAdd,
          'contentDelete': doc.contentDelete,
          'contentDisplay': doc.contentDisplay,
          'contentValidate': doc.contentValidate,
          'roleAdd': doc.roleAdd,
          'roleUpdate': doc.roleUpdate,
          'roleDelete': doc.roleDelete,
          'roleDisplay': doc.roleDisplay,
          'rolePrint': doc.rolePrint,
          'roleAffect': doc.roleAffect,
          'roleValidate': doc.roleValidate,
          'signatureAdd': doc.signatureAdd,
          'buttonEdit' : button.editAu,
          'buttonValidate' : button.validateAu,
          'buttonAuthorize' : button.authorizeAu,
          'buttonDetail' : buttonDetails
        };
      rolesAuthorization.push(role);
    });
    return rolesAuthorization;
  },
  roleSelected() {
    return Session.get("roleSelected");
  },
  roleDetail() {
    return Session.get("RoleDetails");
  },
  roleCompare() {
    return Session.get("RoleCompare");
  },
  equals: function(v1, v2) {
    return (v1 === v2);
  }
});
