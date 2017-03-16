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
function authorize(role){
  if(role._id.indexOf("#") > 0){
    role._id = role._id.replace("#D", "");
  }
  var roleX = Roles_Live.findOne({ "_id" : role._id });
  // entry validated and new entry
  if(roleX !== undefined && role.status == "INAU"){
    role.status = "LIVE";
    //role.authorizer = Session.get("UserLogged")._id;
    role.authorizer = "Vvvv";
    role.dateTime = new Date();
    roleX.status = 'HIS';
    roleX.dateTime = new Date();
    roleX.currentNumber=role.currentNumber;
    roleX._id = role._id+"#"+(role.currentNumber-1);
    Roles_History.insert(roleX);
    Roles_Live.remove(role._id);
    Roles_Live.insert(role);
    Roles_Authorization.remove(role._id);
    //console.log("IF one");
  // edit a role in live
  }else if(roleX !== undefined && role.status == "RNAU"){
    //role.authorizer= Session.get("UserLogged")._id;
    role.authorizer = "Vvvv";
    role.status = 'DEL';
    role.dateTime = new Date();
    Roles_History.insert(role);
    Roles_Live.remove(roleX._id);
    Roles_Authorization.remove(role._id);
    Roles_Authorization.remove(role._id+"#D");
    //console.log("IF two");
  }else{
    role.status = "LIVE";
    //role.authorizer = Session.get("UserLogged")._id;
    role.authorizer = "Vvvv";
    role.dateTime = new Date();
    Roles_Live.insert(role);
    Roles_Authorization.remove(role._id);
    //console.log("IF one");
  }
}
function getValuesFromFormForAdd(){
  if (document.getElementById('roleName') != null) {
    var roleName = document.getElementById("roleName").value;
  }else {
    var roleName = null;
  }
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
  var invoiceSign = null;
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
  var firmwareAdd = null;
  var firmwareUpdate = null;
  var firmwareDelete = null;
  var firmwareDisplay = null;
  var firmwarePrint = null;
  var firmwareValidate = null;
  var signatureAdd = null;
  var signatureValidate = null;
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
  if( $('input[name="invoiceSign"]:checked').val() == "YES"){
    invoiceSign = true;
  }else if ($('input[name="invoiceSign"]:checked').val() == "NO") {
    invoiceSign = false;
  }else{
    invoiceSign = null;
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
  }else if ($('input[name="roleValidate"]:checked').val() == "NO") {
    roleValidate = false;
  }else{
    roleValidate = null;
  }
  if( $('input[name="firmwareAdd"]:checked').val() == "YES"){
    firmwareAdd = true;
  }else if ($('input[name="firmwareAdd"]:checked').val() == "NO") {
    firmwareAdd = false;
  }else{
    firmwareAdd = null;
  }
  if( $('input[name="firmwareUpdate"]:checked').val() == "YES"){
    firmwareUpdate = true;
  }else if ($('input[name="firmwareUpdate"]:checked').val() == "NO") {
    firmwareUpdate = false;
  }else{
    firmwareUpdate = null;
  }
  if( $('input[name="firmwareDelete"]:checked').val() == "YES"){
    firmwareDelete = true;
  }else if ($('input[name="firmwareDelete"]:checked').val() == "NO") {
    firmwareDelete = false;
  }else{
    firmwareDelete = null;
  }
  if( $('input[name="firmwareDisplay"]:checked').val() == "YES"){
    firmwareDisplay = true;
  }else if ($('input[name="firmwareDisplay"]:checked').val() == "NO") {
    firmwareDisplay = false;
  }else{
    firmwareDisplay = null;
  }
  if( $('input[name="firmwarePrint"]:checked').val() == "YES"){
    firmwarePrint = true;
  }else if ($('input[name="firmwarePrint"]:checked').val() == "NO") {
    firmwarePrint = false;
  }else{
    firmwarePrint = null;
  }
  if( $('input[name="firmwareValidate"]:checked').val() == "YES"){
    firmwareValidate = true;
  }else if ($('input[name="firmwareValidate1"]:checked').val() == "NO") {
    firmwareValidate = false;
  }else{
    firmwareValidate = null;
  }
  if( $('input[name="signatureAdd"]:checked').val() == "YES"){
    signatureAdd = true;
  }else if ($('input[name="signatureAdd"]:checked').val() == "NO") {
    signatureAdd = false;
  }else{
    signatureAdd = null;
  }
  if( $('input[name="signatureValidate"]:checked').val() == "YES"){
    signatureValidate = true;
  }else if ($('input[name="signatureValidate"]:checked').val() == "NO") {
    signatureValidate = false;
  }else{
    signatureValidate = null;
  }
  var role =
    {
      'roleName': roleName,
      'currentNumber': 0,
      'status': "HLD",
      //'inputter': Session.get("UserLogged"),
      //'authorizer': Session.get("UserLogged"),
      'inputter': null,
      'authorizer': null,
      'dateTime': new Date(),
      'code': Session.get("CLIENT_CODE_X"),
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
      'invoiceSign': invoiceSign,
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
      'firmwareAdd': firmwareAdd,
      'firmwareUpdate': firmwareUpdate,
      'firmwareDelete': firmwareDelete,
      'firmwareDisplay': firmwareDisplay,
      'firmwarePrint': firmwarePrint,
      'firmwareValidate': firmwareValidate,
      'signatureAdd': signatureAdd,
      'signatureValidate': signatureValidate
    };
  return role;
}
function getValuesFromFormForEdit(){
  if (document.getElementById('roleName1') != null) {
    var roleName = document.getElementById("roleName1").value;
  }else {
    var roleName = null;
  }
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
  var invoiceSign = null;
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
  var firmwareAdd = null;
  var firmwareUpdate = null;
  var firmwareDelete = null;
  var firmwareDisplay = null;
  var firmwarePrint = null;
  var firmwareValidate = null;
  var signatureAdd = null;
  var signatureValidate = null;
  if( $('input[name="accountAdd1"]:checked').val() == "YES"){
    accountAdd = true;
  }else if( $('input[name="accountAdd1"]:checked').val() == "YES"){
    accountAdd = false;
  }else {
    accountAdd = null;
  }
  if( $('input[name="accountUpdate1"]:checked').val() == "YES"){
    accountUpdate = true;
  }else if( $('input[name="accountUpdate1"]:checked').val() == "NO"){
    accountUpdate = false;
  }else {
    accountUpdate = null;
  }
  if( $('input[name="accountDelete1"]:checked').val() == "YES"){
    accountDelete = true;
  }else if( $('input[name="accountDelete1"]:checked').val() == "NO"){
    accountDelete = false;
  }else {
    accountDelete = null;
  }
  if( $('input[name="accountDisplay1"]:checked').val() == "YES"){
    accountDisplay = true;
  }else if( $('input[name="accountDisplay1"]:checked').val() == "NO"){
    accountDisplay = false;
  }else {
    accountDisplay = null;
  }
  if( $('input[name="accountPrint1"]:checked').val() == "YES"){
    accountPrint = true;
  }else if( $('input[name="accountPrint1"]:checked').val() == "NO"){
    accountPrint = false;
  }else {
    accountPrint = null;
  }
  if( $('input[name="accountValidate1"]:checked').val() == "YES"){
    accountValidate = true;
  }else if( $('input[name="accountValidate1"]:checked').val() == "NO"){
    accountValidate = false;
  }else {
    accountValidate = null;
  }
  if( $('input[name="contractAdd1"]:checked').val() == "YES"){
    contractAdd = true;
  }else if( $('input[name="contractAdd1"]:checked').val() == "NO"){
    contractAdd = false;
  }else {
    contractAdd = null;
  }
  if( $('input[name="contractUpdate1"]:checked').val() == "YES"){
    contractUpdate = true;
  }else if( $('input[name="contractUpdate1"]:checked').val() == "NO"){
    contractUpdate = false;
  }else {
    contractUpdate = null;
  }
  if( $('input[name="contractDelete1"]:checked').val() == "YES"){
    contractDelete = true;
  }else if( $('input[name="contractDelete1"]:checked').val() == "NO"){
    contractDelete = false;
  }else {
    contractDelete = null;
  }
  if( $('input[name="contractDisplay1"]:checked').val() == "YES"){
    contractDisplay = true;
  }else if( $('input[name="contractDisplay1"]:checked').val() == "NO"){
    contractDisplay = false;
  }else {
    contractDisplay = null;
  }
  if( $('input[name="contractPrint1"]:checked').val() == "YES"){
    contractPrint = true;
  }else if( $('input[name="contractPrint1"]:checked').val() == "NO"){
    contractPrint = false;
  }else {
    contractPrint = null;
  }
  if( $('input[name="contractValidate1"]:checked').val() == "YES"){
    contractValidate = true;
  }else if( $('input[name="contractValidate1"]:checked').val() == "NO"){
    contractValidate = false;
  }else {
    contractValidate = null;
  }
  if( $('input[name="contractSign1"]:checked').val() == "YES"){
    contractSign = true;
  }else if( $('input[name="contractSign1"]:checked').val() == "NO"){
    contractSign = false;
  }else{
    contractSign = null;
  }
  if( $('input[name="articleAdd1"]:checked').val() == "YES"){
    articleAdd = true;
  }else if ($('input[name="articleAdd1"]:checked').val() == "NO") {
    articleAdd = false;
  }else{
    articleAdd = null;
  }
  if( $('input[name="articleUpdate1"]:checked').val() == "YES"){
    articleUpdate = true;
  }else if ($('input[name="articleUpdate1"]:checked').val() == "NO") {
    articleUpdate = false;
  }else{
    articleUpdate = null;
  }
  if( $('input[name="articleDelete1"]:checked').val() == "YES"){
    articleDelete = true;
  }else if ($('input[name="articleDelete1"]:checked').val() == "NO") {
    articleDelete = false;
  }else{
    articleDelete = null;
  }
  if( $('input[name="articleDisplay1"]:checked').val() == "YES"){
    articleDisplay = true;
  }else if ($('input[name="articleDisplay1"]:checked').val() == "NO") {
    articleDisplay = false;
  }else{
    articleDisplay = null;
  }
  if( $('input[name="articlePrint1"]:checked').val() == "YES"){
    articlePrint = true;
  }else if ($('input[name="articlePrint1"]:checked').val() == "NO") {
    articlePrint = false;
  }else{
    articlePrint = null;
  }
  if( $('input[name="articleValidate1"]:checked').val() == "YES"){
    articleValidate = true;
  }else if ($('input[name="articleValidate1"]:checked').val() == "NO") {
    articleValidate = false;
  }else{
    articleValidate = null;
  }
  if( $('input[name="invoiceAdd1"]:checked').val() == "YES"){
    invoiceAdd = true;
  }else if ($('input[name="invoiceAdd1"]:checked').val() == "NO") {
    invoiceAdd = false;
  }else{
    invoiceAdd = null;
  }
  if( $('input[name="invoiceUpdate1"]:checked').val() == "YES"){
    invoiceUpdate = true;
  }else if ($('input[name="invoiceUpdate1"]:checked').val() == "NO") {
    invoiceUpdate = false;
  }else{
    invoiceUpdate = null;
  }
  if( $('input[name="invoiceDelete1"]:checked').val() == "YES"){
    invoiceDelete = true;
  }else if ($('input[name="invoiceDelete1"]:checked').val() == "NO") {
    invoiceDelete = false;
  }else{
    invoiceDelete = null;
  }
  if( $('input[name="invoiceDisplay1"]:checked').val() == "YES"){
    invoiceDisplay = true;
  }else if ($('input[name="invoiceDisplay1"]:checked').val() == "NO") {
    invoiceDisplay = false;
  }else{
    invoiceDisplay = null;
  }
  if( $('input[name="invoicePrint1"]:checked').val() == "YES"){
    invoicePrint = true;
  }else if ($('input[name="invoicePrint1"]:checked').val() == "NO") {
    invoicePrint = false;
  }else{
    invoicePrint = null;
  }
  if( $('input[name="invoiceSign1"]:checked').val() == "YES"){
    invoiceSign = true;
  }else if ($('input[name="invoiceSign1"]:checked').val() == "NO") {
    invoiceSign = false;
  }else{
    invoiceSign = null;
  }
  if( $('input[name="invoiceValidate1"]:checked').val() == "YES"){
    invoiceValidate = true;
  }else if ($('input[name="invoiceValidate1"]:checked').val() == "NO") {
    invoiceValidate = false;
  }else{
    invoiceValidate = null;
  }
  if( $('input[name="clientAdd1"]:checked').val() == "YES"){
    clientAdd = true;
  }else if ($('input[name="clientAdd1"]:checked').val() == "NO") {
    clientAdd = false;
  }else{
    clientAdd = null;
  }
  if( $('input[name="clientUpdate1"]:checked').val() == "YES"){
    clientUpdate = true;
  }else if ($('input[name="clientUpdate1"]:checked').val() == "NO") {
    clientUpdate = false;
  }else{
    clientUpdate = null;
  }
  if( $('input[name="clientDelete1"]:checked').val() == "YES"){
    clientDelete = true;
  }else if ($('input[name="clientDelete1"]:checked').val() == "NO") {
    clientDelete = false;
  }else{
    clientDelete = null;
  }
  if( $('input[name="clientDisplay1"]:checked').val() == "YES"){
    clientDisplay = true;
  }else if ($('input[name="clientDisplay1"]:checked').val() == "NO") {
    clientDisplay = false;
  }else{
    clientDisplay = null;
  }
  if( $('input[name="clientPrint1"]:checked').val() == "YES"){
    clientPrint = true;
  }else if ($('input[name="clientPrint1"]:checked').val() == "NO") {
    clientPrint = false;
  }else{
    clientPrint = null;
  }
  if( $('input[name="clientValidate1"]:checked').val() == "YES"){
    clientValidate = true;
  }else if ($('input[name="clientValidate1"]:checked').val() == "NO") {
    clientValidate = false;
  }else{
    clientValidate = null;
  }
  if( $('input[name="clientAccountManagement1"]:checked').val() == "YES"){
    clientAccountManagement = true;
  }else if ($('input[name="clientAccountManagement1"]:checked').val() == "NO") {
    clientAccountManagement = false;
  }else{
    clientAccountManagement = null;
  }
  if( $('input[name="screenUpdate1"]:checked').val() == "YES"){
    screenUpdate = true;
  }else if ($('input[name="screenUpdate1"]:checked').val() == "NO") {
    screenUpdate = false;
  }else{
    screenUpdate = null;
  }
  if( $('input[name="screenDelete1"]:checked').val() == "YES"){
    screenDelete = true;
  }else if ($('input[name="screenDelete1"]:checked').val() == "NO") {
    screenDelete = false;
  }else{
    screenDelete = null;
  }
  if( $('input[name="screenDisplay1"]:checked').val() == "YES"){
    screenDisplay = true;
  }else if ($('input[name="screenDisplay1"]:checked').val() == "NO") {
    screenDisplay = false;
  }else{
    screenDisplay = null;
  }
  if( $('input[name="screenPrint1"]:checked').val() == "YES"){
    screenPrint = true;
  }else if ($('input[name="screenPrint1"]:checked').val() == "NO") {
    screenPrint = false;
  }else{
    screenPrint = null;
  }
  if( $('input[name="screenValidate1"]:checked').val() == "YES"){
    screenValidate = true;
  }else if ($('input[name="screenValidate1"]:checked').val() == "NO") {
    screenValidate = false;
  }else{
    screenValidate = null;
  }
  if( $('input[name="screenShow1"]:checked').val() == "YES"){
    screenShow = true;
  }else if ($('input[name="screenShow1"]:checked').val() == "NO") {
    screenShow = false;
  }else{
    screenShow = null;
  }
  if( $('input[name="screenUpdateSystem1"]:checked').val() == "YES"){
    screenUpdateSystem = true;
  }else if ($('input[name="screenUpdateSystem1"]:checked').val() == "NO") {
    screenUpdateSystem = false;
  }else{
    screenUpdateSystem = null;
  }
  if( $('input[name="screenClear1"]:checked').val() == "YES"){
    screenClear = true;
  }else if ($('input[name="screenClear1"]:checked').val() == "NO") {
    screenClear = false;
  }else{
    screenClear = null;
  }
  if( $('input[name="screenMonitor1"]:checked').val() == "YES"){
    screenMonitor = true;
  }else if ($('input[name="screenMonitor1"]:checked').val() == "NO") {
    screenMonitor = false;
  }else{
    screenMonitor = null;
  }
  if( $('input[name="screenActivate1"]:checked').val() == "YES"){
    screenActivate = true;
  }else if ($('input[name="screenActivate1"]:checked').val() == "NO") {
    screenActivate = false;
  }else{
    screenActivate = null;
  }
  if( $('input[name="screenOnOff1"]:checked').val() == "YES"){
    screenOnOff = true;
  }else if ($('input[name="screenOnOff1"]:checked').val() == "NO") {
    screenOnOff = false;
  }else{
    screenOnOff = null;
  }
  if( $('input[name="segmentUpdate1"]:checked').val() == "YES"){
    segmentUpdate = true;
  }else if ($('input[name="segmentUpdate1"]:checked').val() == "NO") {
    segmentUpdate = false;
  }else{
    segmentUpdate = null;
  }
  if( $('input[name="segmentDelete1"]:checked').val() == "YES"){
    segmentDelete = true;
  }else if ($('input[name="segmentDelete1"]:checked').val() == "NO") {
    segmentDelete = false;
  }else{
    segmentDelete = null;
  }
  if( $('input[name="segmentDisplay1"]:checked').val() == "YES"){
    segmentDisplay = true;
  }else if ($('input[name="segmentDisplay1"]:checked').val() == "NO") {
    segmentDisplay = false;
  }else{
    segmentDisplay = null;
  }
  if( $('input[name="segmentPrint1"]:checked').val() == "YES"){
    segmentPrint = true;
  }else if ($('input[name="segmentPrint1"]:checked').val() == "NO") {
    segmentPrint = false;
  }else{
    segmentPrint = null;
  }
  if( $('input[name="segmentAffect1"]:checked').val() == "YES"){
    segmentAffect = true;
  }else if ($('input[name="segmentAffect1"]:checked').val() == "NO") {
    segmentAffect = false;
  }else{
    segmentAffect = null;
  }
  if( $('input[name="segmentValidate1"]:checked').val() == "YES"){
    segmentValidate = true;
  }else if ($('input[name="segmentValidate1"]:checked').val() == "NO") {
    segmentValidate = false;
  }else{
    segmentValidate = null;
  }
  if( $('input[name="tariffAdd1"]:checked').val() == "YES"){
    tariffAdd = true;
  }else if ($('input[name="tariffAdd1"]:checked').val() == "NO") {
    tariffAdd = false;
  }else{
    tariffAdd = null;
  }
  if( $('input[name="tariffUpdate1"]:checked').val() == "YES"){
    tariffUpdate = true;
  }else if ($('input[name="tariffUpdate1"]:checked').val() == "NO") {
    tariffUpdate = false;
  }else{
    tariffUpdate = null;
  }
  if( $('input[name="tariffDelete1"]:checked').val() == "YES"){
    tariffDelete = true;
  }else if ($('input[name="tariffDelete1"]:checked').val() == "NO") {
    tariffDelete = false;
  }else{
    tariffDelete = null;
  }
  if( $('input[name="tariffDisplay1"]:checked').val() == "YES"){
    tariffDisplay = true;
  }else if ($('input[name="tariffDisplay1"]:checked').val() == "NO") {
    tariffDisplay = false;
  }else{
    tariffDisplay = null;
  }
  if( $('input[name="tariffPrint1"]:checked').val() == "YES"){
    tariffPrint = true;
  }else if ($('input[name="tariffPrint1"]:checked').val() == "NO") {
    tariffPrint = false;
  }else{
    tariffPrint = null;
  }
  if( $('input[name="tariffAffect1"]:checked').val() == "YES"){
    tariffAffect = true;
  }else if ($('input[name="tariffAffect1"]:checked').val() == "NO") {
    tariffAffect = false;
  }else{
    tariffAffect = null;
  }
  if( $('input[name="tariffValidate1"]:checked').val() == "YES"){
    tariffValidate = true;
  }else if ($('input[name="tariffValidate1"]:checked').val() == "NO") {
    tariffValidate = false;
  }else{
    tariffValidate = null;
  }
  if( $('input[name="bookingAdd1"]:checked').val() == "YES"){
    bookingAdd = true;
  }else if ($('input[name="bookingAdd1"]:checked').val() == "NO") {
    bookingAdd = false;
  }else{
    bookingAdd = null;
  }
  if( $('input[name="bookingUpdate1"]:checked').val() == "YES"){
    bookingUpdate = true;
  }else if ($('input[name="bookingUpdate1"]:checked').val() == "NO") {
    bookingUpdate = false;
  }else{
    bookingUpdate = null;
  }
  if( $('input[name="bookingDisplay1"]:checked').val() == "YES"){
    bookingDisplay = true;
  }else if ($('input[name="bookingDisplay1"]:checked').val() == "NO") {
    bookingDisplay = false;
  }else{
    bookingDisplay = null;
  }
  if( $('input[name="bookingPrint1"]:checked').val() == "YES"){
    bookingPrint = true;
  }else if ($('input[name="bookingPrint1"]:checked').val() == "NO") {
    bookingPrint = false;
  }else{
    bookingPrint = null;
  }
  if( $('input[name="bookingValidate1"]:checked').val() == "YES"){
    bookingValidate = true;
  }else if ($('input[name="bookingValidate1"]:checked').val() == "NO") {
    bookingValidate = false;
  }else{
    bookingValidate = null;
  }
  if( $('input[name="contentAdd1"]:checked').val() == "YES"){
    contentAdd = true;
  }else if ($('input[name="contentAdd1"]:checked').val() == "NO") {
    contentAdd = false;
  }else{
    contentAdd = null;
  }
  if( $('input[name="contentDelete1"]:checked').val() == "YES"){
    contentDelete = true;
  }else if ($('input[name="contentDelete1"]:checked').val() == "NO") {
    contentDelete = false;
  }else{
    contentDelete = null;
  }
  if( $('input[name="contentDisplay1"]:checked').val() == "YES"){
    contentDisplay = true;
  }else if ($('input[name="contentDisplay1"]:checked').val() == "NO") {
    contentDisplay = false;
  }else{
    contentDisplay = null;
  }
  if( $('input[name="contentValidate1"]:checked').val() == "YES"){
    contentValidate = true;
  }else if ($('input[name="contentValidate1"]:checked').val() == "NO") {
    contentValidate = false;
  }else{
    contentValidate = null;
  }
  if( $('input[name="roleAdd1"]:checked').val() == "YES"){
    roleAdd = true;
  }else if ($('input[name="roleAdd1"]:checked').val() == "NO") {
    roleAdd = false;
  }else{
    roleAdd = null;
  }
  if( $('input[name="roleUpdate1"]:checked').val() == "YES"){
    roleUpdate = true;
  }else if ($('input[name="roleUpdate1"]:checked').val() == "NO") {
    roleUpdate = false;
  }else{
    roleUpdate = null;
  }
  if( $('input[name="roleDelete1"]:checked').val() == "YES"){
    roleDelete = true;
  }else if ($('input[name="roleDelete1"]:checked').val() == "NO") {
    roleDelete = false;
  }else{
    roleDelete = null;
  }
  if( $('input[name="roleDisplay1"]:checked').val() == "YES"){
    roleDisplay = true;
  }else if ($('input[name="roleDisplay1"]:checked').val() == "NO") {
    roleDisplay = false;
  }else{
    roleDisplay = null;
  }
  if( $('input[name="rolePrint1"]:checked').val() == "YES"){
    rolePrint = true;
  }else if ($('input[name="rolePrint1"]:checked').val() == "NO") {
    rolePrint = false;
  }else{
    rolePrint = null;
  }
  if( $('input[name="roleAffect1"]:checked').val() == "YES"){
    roleAffect = true;
  }else if ($('input[name="roleAffect1"]:checked').val() == "NO") {
    roleAffect = false;
  }else{
    roleAffect = null;
  }
  if( $('input[name="roleValidate1"]:checked').val() == "YES"){
    roleValidate = true;
  }else if ($('input[name="roleValidate1"]:checked').val() == "NO") {
    roleValidate = false;
  }else{
    roleValidate = null;
  }
  if( $('input[name="firmwareAdd1"]:checked').val() == "YES"){
    firmwareAdd = true;
  }else if ($('input[name="firmwareAdd1"]:checked').val() == "NO") {
    firmwareAdd = false;
  }else{
    firmwareAdd = null;
  }
  if( $('input[name="firmwareUpdate1"]:checked').val() == "YES"){
    firmwareUpdate = true;
  }else if ($('input[name="firmwareUpdate1"]:checked').val() == "NO") {
    firmwareUpdate = false;
  }else{
    firmwareUpdate = null;
  }
  if( $('input[name="firmwareDelete1"]:checked').val() == "YES"){
    firmwareDelete = true;
  }else if ($('input[name="firmwareDelete1"]:checked').val() == "NO") {
    firmwareDelete = false;
  }else{
    firmwareDelete = null;
  }
  if( $('input[name="firmwareDisplay1"]:checked').val() == "YES"){
    firmwareDisplay = true;
  }else if ($('input[name="firmwareDisplay1"]:checked').val() == "NO") {
    firmwareDisplay = false;
  }else{
    firmwareDisplay = null;
  }
  if( $('input[name="firmwarePrint1"]:checked').val() == "YES"){
    firmwarePrint = true;
  }else if ($('input[name="firmwarePrint1"]:checked').val() == "NO") {
    firmwarePrint = false;
  }else{
    firmwarePrint = null;
  }
  if( $('input[name="firmwareValidate1"]:checked').val() == "YES"){
    firmwareValidate = true;
  }else if ($('input[name="firmwareValidate11"]:checked').val() == "NO") {
    firmwareValidate = false;
  }else{
    firmwareValidate = null;
  }
  if( $('input[name="signatureAdd1"]:checked').val() == "YES"){
    signatureAdd = true;
  }else if ($('input[name="signatureAdd1"]:checked').val() == "NO") {
    signatureAdd = false;
  }else{
    signatureAdd = null;
  }
  if( $('input[name="signatureValidate1"]:checked').val() == "YES"){
    signatureValidate = true;
  }else if ($('input[name="signatureValidate1"]:checked').val() == "NO") {
    signatureValidate = false;
  }else{
    signatureValidate = null;
  }
  var role =
    {
      'roleName': roleName,
      'currentNumber': 0,
      'status': "HLD",
      //'inputter': Session.get("UserLogged"),
      //'authorizer': Session.get("UserLogged"),
      'inputter': null,
      'authorizer': null,
      'dateTime': new Date(),
      'code': Session.get("CLIENT_CODE_X"),
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
      'invoiceSign': invoiceSign,
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
      'firmwareAdd': firmwareAdd,
      'firmwareUpdate': firmwareUpdate,
      'firmwareDelete': firmwareDelete,
      'firmwareDisplay': firmwareDisplay,
      'firmwarePrint': firmwarePrint,
      'firmwareValidate': firmwareValidate,
      'signatureAdd': signatureAdd,
      'signatureValidate': signatureValidate
    };
  return role;
}
function getValuesFromFormForEditAu(){
  if (document.getElementById('roleName2') != null) {
    var roleName = document.getElementById("roleName2").value;
  }else {
    var roleName = null;
  }
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
  var invoiceSign = null;
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
  var firmwareAdd = null;
  var firmwareUpdate = null;
  var firmwareDelete = null;
  var firmwareDisplay = null;
  var firmwarePrint = null;
  var firmwareValidate = null;
  var signatureAdd = null;
  var signatureValidate = null;
  if( $('input[name="accountAdd2"]:checked').val() == "YES"){
    accountAdd = true;
  }else if( $('input[name="accountAdd2"]:checked').val() == "YES"){
    accountAdd = false;
  }else {
    accountAdd = null;
  }
  if( $('input[name="accountUpdate2"]:checked').val() == "YES"){
    accountUpdate = true;
  }else if( $('input[name="accountUpdate2"]:checked').val() == "NO"){
    accountUpdate = false;
  }else {
    accountUpdate = null;
  }
  if( $('input[name="accountDelete2"]:checked').val() == "YES"){
    accountDelete = true;
  }else if( $('input[name="accountDelete2"]:checked').val() == "NO"){
    accountDelete = false;
  }else {
    accountDelete = null;
  }
  if( $('input[name="accountDisplay2"]:checked').val() == "YES"){
    accountDisplay = true;
  }else if( $('input[name="accountDisplay2"]:checked').val() == "NO"){
    accountDisplay = false;
  }else {
    accountDisplay = null;
  }
  if( $('input[name="accountPrint2"]:checked').val() == "YES"){
    accountPrint = true;
  }else if( $('input[name="accountPrint2"]:checked').val() == "NO"){
    accountPrint = false;
  }else {
    accountPrint = null;
  }
  if( $('input[name="accountValidate2"]:checked').val() == "YES"){
    accountValidate = true;
  }else if( $('input[name="accountValidate2"]:checked').val() == "NO"){
    accountValidate = false;
  }else {
    accountValidate = null;
  }
  if( $('input[name="contractAdd2"]:checked').val() == "YES"){
    contractAdd = true;
  }else if( $('input[name="contractAdd2"]:checked').val() == "NO"){
    contractAdd = false;
  }else {
    contractAdd = null;
  }
  if( $('input[name="contractUpdate2"]:checked').val() == "YES"){
    contractUpdate = true;
  }else if( $('input[name="contractUpdate2"]:checked').val() == "NO"){
    contractUpdate = false;
  }else {
    contractUpdate = null;
  }
  if( $('input[name="contractDelete2"]:checked').val() == "YES"){
    contractDelete = true;
  }else if( $('input[name="contractDelete2"]:checked').val() == "NO"){
    contractDelete = false;
  }else {
    contractDelete = null;
  }
  if( $('input[name="contractDisplay2"]:checked').val() == "YES"){
    contractDisplay = true;
  }else if( $('input[name="contractDisplay2"]:checked').val() == "NO"){
    contractDisplay = false;
  }else {
    contractDisplay = null;
  }
  if( $('input[name="contractPrint2"]:checked').val() == "YES"){
    contractPrint = true;
  }else if( $('input[name="contractPrint2"]:checked').val() == "NO"){
    contractPrint = false;
  }else {
    contractPrint = null;
  }
  if( $('input[name="contractValidate2"]:checked').val() == "YES"){
    contractValidate = true;
  }else if( $('input[name="contractValidate2"]:checked').val() == "NO"){
    contractValidate = false;
  }else {
    contractValidate = null;
  }
  if( $('input[name="contractSign2"]:checked').val() == "YES"){
    contractSign = true;
  }else if( $('input[name="contractSign2"]:checked').val() == "NO"){
    contractSign = false;
  }else{
    contractSign = null;
  }
  if( $('input[name="articleAdd2"]:checked').val() == "YES"){
    articleAdd = true;
  }else if ($('input[name="articleAdd2"]:checked').val() == "NO") {
    articleAdd = false;
  }else{
    articleAdd = null;
  }
  if( $('input[name="articleUpdate2"]:checked').val() == "YES"){
    articleUpdate = true;
  }else if ($('input[name="articleUpdate2"]:checked').val() == "NO") {
    articleUpdate = false;
  }else{
    articleUpdate = null;
  }
  if( $('input[name="articleDelete2"]:checked').val() == "YES"){
    articleDelete = true;
  }else if ($('input[name="articleDelete2"]:checked').val() == "NO") {
    articleDelete = false;
  }else{
    articleDelete = null;
  }
  if( $('input[name="articleDisplay2"]:checked').val() == "YES"){
    articleDisplay = true;
  }else if ($('input[name="articleDisplay2"]:checked').val() == "NO") {
    articleDisplay = false;
  }else{
    articleDisplay = null;
  }
  if( $('input[name="articlePrint2"]:checked').val() == "YES"){
    articlePrint = true;
  }else if ($('input[name="articlePrint2"]:checked').val() == "NO") {
    articlePrint = false;
  }else{
    articlePrint = null;
  }
  if( $('input[name="articleValidate2"]:checked').val() == "YES"){
    articleValidate = true;
  }else if ($('input[name="articleValidate2"]:checked').val() == "NO") {
    articleValidate = false;
  }else{
    articleValidate = null;
  }
  if( $('input[name="invoiceAdd2"]:checked').val() == "YES"){
    invoiceAdd = true;
  }else if ($('input[name="invoiceAdd2"]:checked').val() == "NO") {
    invoiceAdd = false;
  }else{
    invoiceAdd = null;
  }
  if( $('input[name="invoiceUpdate2"]:checked').val() == "YES"){
    invoiceUpdate = true;
  }else if ($('input[name="invoiceUpdate2"]:checked').val() == "NO") {
    invoiceUpdate = false;
  }else{
    invoiceUpdate = null;
  }
  if( $('input[name="invoiceDelete2"]:checked').val() == "YES"){
    invoiceDelete = true;
  }else if ($('input[name="invoiceDelete2"]:checked').val() == "NO") {
    invoiceDelete = false;
  }else{
    invoiceDelete = null;
  }
  if( $('input[name="invoiceDisplay2"]:checked').val() == "YES"){
    invoiceDisplay = true;
  }else if ($('input[name="invoiceDisplay2"]:checked').val() == "NO") {
    invoiceDisplay = false;
  }else{
    invoiceDisplay = null;
  }
  if( $('input[name="invoicePrint2"]:checked').val() == "YES"){
    invoicePrint = true;
  }else if ($('input[name="invoicePrint2"]:checked').val() == "NO") {
    invoicePrint = false;
  }else{
    invoicePrint = null;
  }
  if( $('input[name="invoiceSign2"]:checked').val() == "YES"){
    invoiceSign = true;
  }else if ($('input[name="invoiceSign2"]:checked').val() == "NO") {
    invoiceSign = false;
  }else{
    invoiceSign = null;
  }
  if( $('input[name="invoiceValidate2"]:checked').val() == "YES"){
    invoiceValidate = true;
  }else if ($('input[name="invoiceValidate2"]:checked').val() == "NO") {
    invoiceValidate = false;
  }else{
    invoiceValidate = null;
  }
  if( $('input[name="clientAdd2"]:checked').val() == "YES"){
    clientAdd = true;
  }else if ($('input[name="clientAdd2"]:checked').val() == "NO") {
    clientAdd = false;
  }else{
    clientAdd = null;
  }
  if( $('input[name="clientUpdate2"]:checked').val() == "YES"){
    clientUpdate = true;
  }else if ($('input[name="clientUpdate2"]:checked').val() == "NO") {
    clientUpdate = false;
  }else{
    clientUpdate = null;
  }
  if( $('input[name="clientDelete2"]:checked').val() == "YES"){
    clientDelete = true;
  }else if ($('input[name="clientDelete2"]:checked').val() == "NO") {
    clientDelete = false;
  }else{
    clientDelete = null;
  }
  if( $('input[name="clientDisplay2"]:checked').val() == "YES"){
    clientDisplay = true;
  }else if ($('input[name="clientDisplay2"]:checked').val() == "NO") {
    clientDisplay = false;
  }else{
    clientDisplay = null;
  }
  if( $('input[name="clientPrint2"]:checked').val() == "YES"){
    clientPrint = true;
  }else if ($('input[name="clientPrint2"]:checked').val() == "NO") {
    clientPrint = false;
  }else{
    clientPrint = null;
  }
  if( $('input[name="clientValidate2"]:checked').val() == "YES"){
    clientValidate = true;
  }else if ($('input[name="clientValidate2"]:checked').val() == "NO") {
    clientValidate = false;
  }else{
    clientValidate = null;
  }
  if( $('input[name="clientAccountManagement2"]:checked').val() == "YES"){
    clientAccountManagement = true;
  }else if ($('input[name="clientAccountManagement2"]:checked').val() == "NO") {
    clientAccountManagement = false;
  }else{
    clientAccountManagement = null;
  }
  if( $('input[name="screenUpdate2"]:checked').val() == "YES"){
    screenUpdate = true;
  }else if ($('input[name="screenUpdate2"]:checked').val() == "NO") {
    screenUpdate = false;
  }else{
    screenUpdate = null;
  }
  if( $('input[name="screenDelete2"]:checked').val() == "YES"){
    screenDelete = true;
  }else if ($('input[name="screenDelete2"]:checked').val() == "NO") {
    screenDelete = false;
  }else{
    screenDelete = null;
  }
  if( $('input[name="screenDisplay2"]:checked').val() == "YES"){
    screenDisplay = true;
  }else if ($('input[name="screenDisplay2"]:checked').val() == "NO") {
    screenDisplay = false;
  }else{
    screenDisplay = null;
  }
  if( $('input[name="screenPrint2"]:checked').val() == "YES"){
    screenPrint = true;
  }else if ($('input[name="screenPrint2"]:checked').val() == "NO") {
    screenPrint = false;
  }else{
    screenPrint = null;
  }
  if( $('input[name="screenValidate2"]:checked').val() == "YES"){
    screenValidate = true;
  }else if ($('input[name="screenValidate2"]:checked').val() == "NO") {
    screenValidate = false;
  }else{
    screenValidate = null;
  }
  if( $('input[name="screenShow2"]:checked').val() == "YES"){
    screenShow = true;
  }else if ($('input[name="screenShow2"]:checked').val() == "NO") {
    screenShow = false;
  }else{
    screenShow = null;
  }
  if( $('input[name="screenUpdateSystem2"]:checked').val() == "YES"){
    screenUpdateSystem = true;
  }else if ($('input[name="screenUpdateSystem2"]:checked').val() == "NO") {
    screenUpdateSystem = false;
  }else{
    screenUpdateSystem = null;
  }
  if( $('input[name="screenClear2"]:checked').val() == "YES"){
    screenClear = true;
  }else if ($('input[name="screenClear2"]:checked').val() == "NO") {
    screenClear = false;
  }else{
    screenClear = null;
  }
  if( $('input[name="screenMonitor2"]:checked').val() == "YES"){
    screenMonitor = true;
  }else if ($('input[name="screenMonitor2"]:checked').val() == "NO") {
    screenMonitor = false;
  }else{
    screenMonitor = null;
  }
  if( $('input[name="screenActivate2"]:checked').val() == "YES"){
    screenActivate = true;
  }else if ($('input[name="screenActivate2"]:checked').val() == "NO") {
    screenActivate = false;
  }else{
    screenActivate = null;
  }
  if( $('input[name="screenOnOff2"]:checked').val() == "YES"){
    screenOnOff = true;
  }else if ($('input[name="screenOnOff2"]:checked').val() == "NO") {
    screenOnOff = false;
  }else{
    screenOnOff = null;
  }
  if( $('input[name="segmentUpdate2"]:checked').val() == "YES"){
    segmentUpdate = true;
  }else if ($('input[name="segmentUpdate2"]:checked').val() == "NO") {
    segmentUpdate = false;
  }else{
    segmentUpdate = null;
  }
  if( $('input[name="segmentDelete2"]:checked').val() == "YES"){
    segmentDelete = true;
  }else if ($('input[name="segmentDelete2"]:checked').val() == "NO") {
    segmentDelete = false;
  }else{
    segmentDelete = null;
  }
  if( $('input[name="segmentDisplay2"]:checked').val() == "YES"){
    segmentDisplay = true;
  }else if ($('input[name="segmentDisplay2"]:checked').val() == "NO") {
    segmentDisplay = false;
  }else{
    segmentDisplay = null;
  }
  if( $('input[name="segmentPrint2"]:checked').val() == "YES"){
    segmentPrint = true;
  }else if ($('input[name="segmentPrint2"]:checked').val() == "NO") {
    segmentPrint = false;
  }else{
    segmentPrint = null;
  }
  if( $('input[name="segmentAffect2"]:checked').val() == "YES"){
    segmentAffect = true;
  }else if ($('input[name="segmentAffect2"]:checked').val() == "NO") {
    segmentAffect = false;
  }else{
    segmentAffect = null;
  }
  if( $('input[name="segmentValidate2"]:checked').val() == "YES"){
    segmentValidate = true;
  }else if ($('input[name="segmentValidate2"]:checked').val() == "NO") {
    segmentValidate = false;
  }else{
    segmentValidate = null;
  }
  if( $('input[name="tariffAdd2"]:checked').val() == "YES"){
    tariffAdd = true;
  }else if ($('input[name="tariffAdd2"]:checked').val() == "NO") {
    tariffAdd = false;
  }else{
    tariffAdd = null;
  }
  if( $('input[name="tariffUpdate2"]:checked').val() == "YES"){
    tariffUpdate = true;
  }else if ($('input[name="tariffUpdate2"]:checked').val() == "NO") {
    tariffUpdate = false;
  }else{
    tariffUpdate = null;
  }
  if( $('input[name="tariffDelete2"]:checked').val() == "YES"){
    tariffDelete = true;
  }else if ($('input[name="tariffDelete2"]:checked').val() == "NO") {
    tariffDelete = false;
  }else{
    tariffDelete = null;
  }
  if( $('input[name="tariffDisplay2"]:checked').val() == "YES"){
    tariffDisplay = true;
  }else if ($('input[name="tariffDisplay2"]:checked').val() == "NO") {
    tariffDisplay = false;
  }else{
    tariffDisplay = null;
  }
  if( $('input[name="tariffPrint2"]:checked').val() == "YES"){
    tariffPrint = true;
  }else if ($('input[name="tariffPrint2"]:checked').val() == "NO") {
    tariffPrint = false;
  }else{
    tariffPrint = null;
  }
  if( $('input[name="tariffAffect2"]:checked').val() == "YES"){
    tariffAffect = true;
  }else if ($('input[name="tariffAffect2"]:checked').val() == "NO") {
    tariffAffect = false;
  }else{
    tariffAffect = null;
  }
  if( $('input[name="tariffValidate2"]:checked').val() == "YES"){
    tariffValidate = true;
  }else if ($('input[name="tariffValidate2"]:checked').val() == "NO") {
    tariffValidate = false;
  }else{
    tariffValidate = null;
  }
  if( $('input[name="bookingAdd2"]:checked').val() == "YES"){
    bookingAdd = true;
  }else if ($('input[name="bookingAdd2"]:checked').val() == "NO") {
    bookingAdd = false;
  }else{
    bookingAdd = null;
  }
  if( $('input[name="bookingUpdate2"]:checked').val() == "YES"){
    bookingUpdate = true;
  }else if ($('input[name="bookingUpdate2"]:checked').val() == "NO") {
    bookingUpdate = false;
  }else{
    bookingUpdate = null;
  }
  if( $('input[name="bookingDisplay2"]:checked').val() == "YES"){
    bookingDisplay = true;
  }else if ($('input[name="bookingDisplay2"]:checked').val() == "NO") {
    bookingDisplay = false;
  }else{
    bookingDisplay = null;
  }
  if( $('input[name="bookingPrint2"]:checked').val() == "YES"){
    bookingPrint = true;
  }else if ($('input[name="bookingPrint2"]:checked').val() == "NO") {
    bookingPrint = false;
  }else{
    bookingPrint = null;
  }
  if( $('input[name="bookingValidate2"]:checked').val() == "YES"){
    bookingValidate = true;
  }else if ($('input[name="bookingValidate2"]:checked').val() == "NO") {
    bookingValidate = false;
  }else{
    bookingValidate = null;
  }
  if( $('input[name="contentAdd2"]:checked').val() == "YES"){
    contentAdd = true;
  }else if ($('input[name="contentAdd2"]:checked').val() == "NO") {
    contentAdd = false;
  }else{
    contentAdd = null;
  }
  if( $('input[name="contentDelete2"]:checked').val() == "YES"){
    contentDelete = true;
  }else if ($('input[name="contentDelete2"]:checked').val() == "NO") {
    contentDelete = false;
  }else{
    contentDelete = null;
  }
  if( $('input[name="contentDisplay2"]:checked').val() == "YES"){
    contentDisplay = true;
  }else if ($('input[name="contentDisplay2"]:checked').val() == "NO") {
    contentDisplay = false;
  }else{
    contentDisplay = null;
  }
  if( $('input[name="contentValidate2"]:checked').val() == "YES"){
    contentValidate = true;
  }else if ($('input[name="contentValidate2"]:checked').val() == "NO") {
    contentValidate = false;
  }else{
    contentValidate = null;
  }
  if( $('input[name="roleAdd2"]:checked').val() == "YES"){
    roleAdd = true;
  }else if ($('input[name="roleAdd2"]:checked').val() == "NO") {
    roleAdd = false;
  }else{
    roleAdd = null;
  }
  if( $('input[name="roleUpdate2"]:checked').val() == "YES"){
    roleUpdate = true;
  }else if ($('input[name="roleUpdate2"]:checked').val() == "NO") {
    roleUpdate = false;
  }else{
    roleUpdate = null;
  }
  if( $('input[name="roleDelete2"]:checked').val() == "YES"){
    roleDelete = true;
  }else if ($('input[name="roleDelete2"]:checked').val() == "NO") {
    roleDelete = false;
  }else{
    roleDelete = null;
  }
  if( $('input[name="roleDisplay2"]:checked').val() == "YES"){
    roleDisplay = true;
  }else if ($('input[name="roleDisplay2"]:checked').val() == "NO") {
    roleDisplay = false;
  }else{
    roleDisplay = null;
  }
  if( $('input[name="rolePrint2"]:checked').val() == "YES"){
    rolePrint = true;
  }else if ($('input[name="rolePrint2"]:checked').val() == "NO") {
    rolePrint = false;
  }else{
    rolePrint = null;
  }
  if( $('input[name="roleAffect2"]:checked').val() == "YES"){
    roleAffect = true;
  }else if ($('input[name="roleAffect2"]:checked').val() == "NO") {
    roleAffect = false;
  }else{
    roleAffect = null;
  }
  if( $('input[name="roleValidate2"]:checked').val() == "YES"){
    roleValidate = true;
  }else if ($('input[name="roleValidate2"]:checked').val() == "NO") {
    roleValidate = false;
  }else{
    roleValidate = null;
  }
  if( $('input[name="firmwareAdd2"]:checked').val() == "YES"){
    firmwareAdd = true;
  }else if ($('input[name="firmwareAdd2"]:checked').val() == "NO") {
    firmwareAdd = false;
  }else{
    firmwareAdd = null;
  }
  if( $('input[name="firmwareUpdate2"]:checked').val() == "YES"){
    firmwareUpdate = true;
  }else if ($('input[name="firmwareUpdate2"]:checked').val() == "NO") {
    firmwareUpdate = false;
  }else{
    firmwareUpdate = null;
  }
  if( $('input[name="firmwareDelete2"]:checked').val() == "YES"){
    firmwareDelete = true;
  }else if ($('input[name="firmwareDelete2"]:checked').val() == "NO") {
    firmwareDelete = false;
  }else{
    firmwareDelete = null;
  }
  if( $('input[name="firmwareDisplay2"]:checked').val() == "YES"){
    firmwareDisplay = true;
  }else if ($('input[name="firmwareDisplay2"]:checked').val() == "NO") {
    firmwareDisplay = false;
  }else{
    firmwareDisplay = null;
  }
  if( $('input[name="firmwarePrint2"]:checked').val() == "YES"){
    firmwarePrint = true;
  }else if ($('input[name="firmwarePrint2"]:checked').val() == "NO") {
    firmwarePrint = false;
  }else{
    firmwarePrint = null;
  }
  if( $('input[name="firmwareValidate2"]:checked').val() == "YES"){
    firmwareValidate = true;
  }else if ($('input[name="firmwareValidate12"]:checked').val() == "NO") {
    firmwareValidate = false;
  }else{
    firmwareValidate = null;
  }
  if( $('input[name="signatureAdd2"]:checked').val() == "YES"){
    signatureAdd = true;
  }else if ($('input[name="signatureAdd2"]:checked').val() == "NO") {
    signatureAdd = false;
  }else{
    signatureAdd = null;
  }
  if( $('input[name="signatureValidate2"]:checked').val() == "YES"){
    signatureValidate = true;
  }else if ($('input[name="signatureValidate2"]:checked').val() == "NO") {
    signatureValidate = false;
  }else{
    signatureValidate = null;
  }
  var role =
    {
      'roleName': roleName,
      'currentNumber': 0,
      'status': "HLD",
      //'inputter': Session.get("UserLogged"),
      //'authorizer': Session.get("UserLogged"),
      'inputter': null,
      'authorizer': null,
      'dateTime': new Date(),
      'code': Session.get("CLIENT_CODE_X"),
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
      'invoiceSign': invoiceSign,
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
      'firmwareAdd': firmwareAdd,
      'firmwareUpdate': firmwareUpdate,
      'firmwareDelete': firmwareDelete,
      'firmwareDisplay': firmwareDisplay,
      'firmwarePrint': firmwarePrint,
      'firmwareValidate': firmwareValidate,
      'signatureAdd': signatureAdd,
      'signatureValidate': signatureValidate
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
  var firmwareAdd = null;
  var firmwareUpdate = null;
  var firmwareDelete = null;
  var firmwareDisplay = null;
  var firmwarePrint = null;
  var firmwareValidate = null;
  var signatureAdd = null;
  var signatureValidate = null;
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
  var firmware = false;
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
  }else if ($('input[name="roleValidate"]:checked').val() == "NO") {
    roleValidate = false;
    role = true;
  }else{
    roleValidate = null;
  }
  if( $('input[name="firmwareAdd"]:checked').val() == "YES"){
    firmwareAdd = true;
    firmware = true;
  }else if ($('input[name="firmwareAdd"]:checked').val() == "NO") {
    firmwareAdd = false;
    firmware = true;
  }else{
    firmwareAdd = null;
  }
  if( $('input[name="firmwareUpdate"]:checked').val() == "YES"){
    firmwareUpdate = true;
    firmware = true;
  }else if ($('input[name="firmwareUpdate"]:checked').val() == "NO") {
    firmwareUpdate = false;
    firmware = true;
  }else{
    firmwareUpdate = null;
  }
  if( $('input[name="firmwareDelete"]:checked').val() == "YES"){
    firmwareDelete = true;
    firmware = true;
  }else if ($('input[name="firmwareDelete"]:checked').val() == "NO") {
    firmwareDelete = false;
    firmware = true;
  }else{
    firmwareDelete = null;
  }
  if( $('input[name="firmwareDisplay"]:checked').val() == "YES"){
    firmwareDisplay = true;
    firmware = true;
  }else if ($('input[name="firmwareDisplay"]:checked').val() == "NO") {
    firmwareDisplay = false;
    firmware = true;
  }else{
    firmwareDisplay = null;
  }
  if( $('input[name="firmwarePrint"]:checked').val() == "YES"){
    firmwarePrint = true;
    firmware = true;
  }else if ($('input[name="firmwarePrint"]:checked').val() == "NO") {
    firmwarePrint = false;
    firmware = true;
  }else{
    firmwarePrint = null;
  }
  if( $('input[name="firmwareValidate"]:checked').val() == "YES"){
    firmwareValidate = true;
    firmware = true;
  }else if ($('input[name="firmwareValidate"]:checked').val() == "NO") {
    firmwareValidate = false;
    firmware = true;
  }else{
    firmwareValidate = null;
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
  if( $('input[name="signatureValidate"]:checked').val() == "YES"){
    signatureValidate = true;
    signature = true;
  }else if ($('input[name="signatureValidate"]:checked').val() == "NO") {
    signatureValidate = false;
    signature = true;
  }else{
    signatureValidate = null;
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
Template.allClientsRoles.rendered = function(){
    //var userLogged = Session.get("UserLogged");
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
    // Initialize i-check plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

};
Template.allClientsRoles.events({
  'click .newRole'() {
    $('#addRolePopup').modal();
  },
  //            Live events          //
  'click .saveAdd'() {
    var roleAdded = getValuesFromFormForAdd();
    if(roleAdded.roleName == null){
      swal({ title: "Alert !",text: "Please enter role name !",type: "warning",closeOnConfirm: true });
    }else {
      roleAdded.currentNumber = roleAdded.currentNumber + 1 ;
      Roles_Authorization.insert(roleAdded);
      toastr.success('With success','Addition done !');
    }
  },
  'click .validateAdd'() {
    var roleAdded = getValuesFromFormForAdd();
    if(roleAdded.roleName == null){
      swal({ title: "Alert !",text: "Please enter role name !",type: "warning",closeOnConfirm: true });
    }else {
      roleAdded.currentNumber = roleAdded.currentNumber + 1 ;
      roleAdded.status = 'INAU';
      Roles_Authorization.insert(roleAdded);
      toastr.success('With success','Addition done !');
    }
  },
  'click .btn-edit'() {
    var role = Roles_Live.findOne({ "_id" : this._id });
    if (verifyEdit(role._id)){
      Session.set("roleSelected", role);
      $('#updateRolePopup').modal();
    }else{
      swal({
        title: "Access denied",
        text: "Edit operation is already in authorization state !",
        type: "warning",
        closeOnConfirm: true
      });
    }
  },
  'click .saveUpdate'() {
    var roleUpdated = getValuesFromFormForEdit();
    var role = Session.get("roleSelected");
    var array = nextState(role.status);
    hideShowButtons(array);
    roleUpdated.inputter = "Saver LIVE ";
    roleUpdated.currentNumber = role.currentNumber + 1;
    roleUpdated._id = role._id;
    Roles_Authorization.insert(roleUpdated);
    toastr.success('With success','Edict done !');
  },
  'click .validateUpdate'() {
    var roleUpdated = getValuesFromFormForEdit();
    var role = Session.get("roleSelected");
    var array = nextState(role.status);
    hideShowButtons(array);
    roleUpdated.inputter = "Saver LIVE ";
    roleUpdated.currentNumber = role.currentNumber + 1
    roleUpdated._id = role._id;
    roleUpdated.status = "INAU";
    Roles_Authorization.insert(roleUpdated);
    toastr.success('With success','Edict done !');
  },
  'click .btn-delete'() {
    var role = Roles_Live.findOne({ "_id" : this._id });
    if (verifyDelete(role._id)){
      $('#checkDeleting').modal();
      Session.set("deleteRoleLive",role);
    }else{
      swal({
        title: "Access denied",
        text: "Delete operation is already in authorization state !",
        type: "warning",
        closeOnConfirm: true
      });
    }
  },
  //          Authorization events        //
  'click .editAu'() {
    var role = Roles_Authorization.findOne({ "_id" : this._id });
    Session.set("roleSelectedAu", role);
    $('#updateAuRolePopup').modal();
  },
  'click .saveUpdateAu'() {
    var roleUpdated = getValuesFromFormForEditAu();
    console.log("New role : ", roleUpdated.roleName);
    var role = Session.get("roleSelectedAu");
    console.log("OLD role : ", role.roleName);
    roleUpdated.inputter = "Saver AUTH";
    roleUpdated._id = role._id;
    Roles_Authorization.remove(role._id);
    Roles_Authorization.insert(roleUpdated);
    toastr.success('With success','Edict done !');
  },
  'click .validateUpdateAu'() {
    var roleUpdated = getValuesFromFormForEditAu();
    var role = Session.get("roleSelectedAu");
    roleUpdated.status = "INAU";
    roleUpdated.inputter = "Saver AUTH";
    roleUpdated._id = role._id;
    Roles_Authorization.remove(role._id);
    Roles_Authorization.insert(roleUpdated);
    toastr.success('With success','Edict done !');
  },
  'click .validateAu'() {
    console.log("ID :", this._id);
    Roles_Authorization.update({ "_id" : this._id }, {'$set':{ 'status' : 'INAU', 'inputter' : "xxx" , 'dateTime' : new Date() }});
  },
  'click .BtnDelete'() {
    var role = Session.get("deleteRoleLive");
    role._id = role._id+"#D"
    role.status = "RNAU";
    role.inputter = "Deleter";
    role.dateTime = new Date();
    role.authorizer = null;
    Roles_Authorization.insert(role);
  },
  'click .cancelAu'() {
    var role = Roles_Authorization.findOne({ "_id" : this._id });
    Session.set("deleteRoleAu",role);
    $('#checkCancel').modal();
  },
  'click .BtnCancel'() {
    var role = Session.get("deleteRoleAu");
    Roles_Authorization.remove(role._id);
    toastr.success('With success','Deleting operation done ');
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
  'click .authorizeAu'() {
    var oldRole = Roles_Live.findOne({ "_id" : this._id });
    var newRole = Roles_Authorization.findOne({ "_id" : this._id });
    console.log("New role name :", newRole.roleName);
    Session.set("OLD_ROLE",oldRole);
    Session.set("NEW_ROLE",newRole);
    $('#checkAuthorising').modal();
  },
  'click .BtnAuthorize'() {
    var role = Session.get("NEW_ROLE");
    authorize(role);
  },
  'click .recap'() {
    $('#recapitulative').modal();
    Session.set("RECAP",getItemSelected());
  },
});
Template.allClientsRoles.helpers({
  clients(){
    return Clients_Live.find();
  },
  client(){
    return Session.get("CLIENT_NAME_X");
  },
  roles_live() {
    return Roles_Live.find({ "code" : Session.get("CLIENT_CODE_X") });
  },
  recap() {
    return Session.get("RECAP");;
  },
  roles_authorization() {
    var roles = Roles_Authorization.find({ "code" : Session.get("CLIENT_CODE_X") });
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
          'firmwareAdd': doc.firmwareAdd,
          'firmwareUpdate': doc.firmwareUpdate,
          'firmwareDelete': doc.firmwareDelete,
          'firmwareDisplay': doc.firmwareDisplay,
          'firmwarePrint': doc.firmwarePrint,
          'firmwareValidate': doc.firmwareValidate,
          'signatureAdd': doc.signatureAdd,
          'signatureValidate': doc.signatureValidate,
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
  newRole() {
    return Session.get("NEW_ROLE");
  },
  oldRole() {
    return Session.get("OLD_ROLE");
  },
  roleSelectedAu() {
    return Session.get("roleSelectedAu");
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
