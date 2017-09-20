function verifyEdit(id){
  var role = Roles_Authorization.findOne({ "_id" : id });
  return role == undefined;
}
function verifyDelete(id){
  var role = Roles_Authorization.findOne({ "_id" : id+"#D" });
  return role == undefined;
}
function authorize(role){
  if(role._id.indexOf("#") > 0){
    role._id = role._id.replace("#D", "");
  }
  var roleX = Roles_Live.findOne({ "_id" : role._id });
  // entry validated and new entry
  if(roleX != undefined && role.status == "INAU"){
    role.status = "LIVE";
    role.authorizer = Session.get("UserLogged")._id;
    role.dateTime = getDateNow();
    roleX.status = 'HIS';
    roleX.dateTime = getDateNow();
    roleX.currentNumber=role.currentNumber;
    roleX._id = role._id+"#"+(role.currentNumber-1);
    Roles_History.insert(roleX);
    Roles_Live.remove(role._id);
    Roles_Live.insert(role);
    Roles_Authorization.remove(role._id);
  // edit a role in live
  }else if(roleX !== undefined && role.status == "RNAU"){
    role.authorizer = Session.get("UserLogged")._id;
    role.status = 'DEL';
    role.dateTime = getDateNow();
    Roles_History.insert(role);
    Roles_Live.remove(roleX._id);
    Roles_Authorization.remove(role._id);
    Roles_Authorization.remove(role._id+"#D");
  }else{
    role.status = "LIVE";
    role.authorizer = Session.get("UserLogged")._id;
    role.dateTime = getDateNow();
    Roles_Live.insert(role);
    Roles_Authorization.remove(role._id);
  }
}
function getValuesFromFormForAdd(){
  if (document.getElementById('roleName') != null) {
    var roleName = document.getElementById("roleName").value;
  }else {
    var roleName = null;
  }
  //  GET Accounts VALUES
  if( $('input[name="accountAdd"]:checked').val() == "YES"){
    var accountAdd = true;
  }else if( $('input[name="accountAdd"]:checked').val() == "NO"){
    var accountAdd = false;
  }else {
    var accountAdd = null;
  }
  if( $('input[name="accountUpdate"]:checked').val() == "YES"){
    var accountUpdate = true;
  }else if( $('input[name="accountUpdate"]:checked').val() == "NO"){
    var accountUpdate = false;
  }else {
    var accountUpdate = null;
  }
  if( $('input[name="accountDelete"]:checked').val() == "YES"){
    var accountDelete = true;
  }else if( $('input[name="accountDelete"]:checked').val() == "NO"){
    var accountDelete = false;
  }else {
    var accountDelete = null;
  }
  if( $('input[name="accountDisplay"]:checked').val() == "YES"){
    var accountDisplay = true;
  }else if( $('input[name="accountDisplay"]:checked').val() == "NO"){
    var accountDisplay = false;
  }else {
    var accountDisplay = null;
  }
  if( $('input[name="accountPrint"]:checked').val() == "YES"){
    var accountPrint = true;
  }else if( $('input[name="accountPrint"]:checked').val() == "NO"){
    var accountPrint = false;
  }else {
    var accountPrint = null;
  }
  if( $('input[name="accountAuthorize"]:checked').val() == "YES"){
    var accountAuthorize = true;
  }else if( $('input[name="accountAuthorize"]:checked').val() == "NO"){
    var accountAuthorize = false;
  }else {
    var accountAuthorize = null;
  }
  if( $('input[name="accountDetails"]:checked').val() == "YES"){
    var accountDetails = true;
  }else if( $('input[name="accountDetails"]:checked').val() == "NO"){
    var accountDetails = false;
  }else {
    var accountDetails = null;
  }
  //  Get Contracts values
  if( $('input[name="contractAdd"]:checked').val() == "YES"){
    var contractAdd = true;
  }else if( $('input[name="contractAdd"]:checked').val() == "NO"){
    var contractAdd = false;
  }else {
    var contractAdd = null;
  }
  if( $('input[name="contractUpdate"]:checked').val() == "YES"){
    var contractUpdate = true;
  }else if( $('input[name="contractUpdate"]:checked').val() == "NO"){
    var contractUpdate = false;
  }else {
    var contractUpdate = null;
  }
  if( $('input[name="contractDelete"]:checked').val() == "YES"){
    var contractDelete = true;
  }else if( $('input[name="contractDelete"]:checked').val() == "NO"){
    var contractDelete = false;
  }else {
    var contractDelete = null;
  }
  if( $('input[name="contractDisplay"]:checked').val() == "YES"){
    var contractDisplay = true;
  }else if( $('input[name="contractDisplay"]:checked').val() == "NO"){
    var contractDisplay = false;
  }else {
    var contractDisplay = null;
  }
  if( $('input[name="contractPrint"]:checked').val() == "YES"){
    var contractPrint = true;
  }else if( $('input[name="contractPrint"]:checked').val() == "NO"){
    var contractPrint = false;
  }else {
    var contractPrint = null;
  }
  if( $('input[name="contractAuthorize"]:checked').val() == "YES"){
    var contractAuthorize = true;
  }else if( $('input[name="contractAuthorize"]:checked').val() == "NO"){
    var contractAuthorize = false;
  }else {
    var contractAuthorize = null;
  }
  if( $('input[name="contractDetails"]:checked').val() == "YES"){
    var contractDetails = true;
  }else if( $('input[name="contractDetails"]:checked').val() == "NO"){
    var contractDetails = false;
  }else {
    var contractDetails = null;
  }
  //  Get Invoices values
  if( $('input[name="invoiceAdd"]:checked').val() == "YES"){
    var invoiceAdd = true;
  }else if( $('input[name="invoiceAdd"]:checked').val() == "NO"){
    var invoiceAdd = false;
  }else {
    var invoiceAdd = null;
  }
  if( $('input[name="invoiceUpdate"]:checked').val() == "YES"){
    var invoiceUpdate = true;
  }else if( $('input[name="invoiceUpdate"]:checked').val() == "NO"){
    var invoiceUpdate = false;
  }else {
    var invoiceUpdate = null;
  }
  if( $('input[name="invoiceDelete"]:checked').val() == "YES"){
    var invoiceDelete = true;
  }else if( $('input[name="invoiceDelete"]:checked').val() == "NO"){
    var invoiceDelete = false;
  }else {
    var invoiceDelete = null;
  }
  if( $('input[name="invoiceDisplay"]:checked').val() == "YES"){
    var invoiceDisplay = true;
  }else if( $('input[name="invoiceDisplay"]:checked').val() == "NO"){
    var invoiceDisplay = false;
  }else {
    var invoiceDisplay = null;
  }
  if( $('input[name="invoicePrint"]:checked').val() == "YES"){
    var invoicePrint = true;
  }else if( $('input[name="invoicePrint"]:checked').val() == "NO"){
    var invoicePrint = false;
  }else {
    var invoicePrint = null;
  }
  if( $('input[name="invoiceAuthorize"]:checked').val() == "YES"){
    var invoiceAuthorize = true;
  }else if( $('input[name="invoiceAuthorize"]:checked').val() == "NO"){
    var invoiceAuthorize = false;
  }else {
    var invoiceAuthorize = null;
  }
  if( $('input[name="invoiceDetails"]:checked').val() == "YES"){
    var invoiceDetails = true;
  }else if( $('input[name="invoiceDetails"]:checked').val() == "NO"){
    var invoiceDetails = false;
  }else {
    var invoiceDetails = null;
  }
  //  Get Roles values
  if( $('input[name="roleAdd"]:checked').val() == "YES"){
    var roleAdd = true;
  }else if( $('input[name="roleAdd"]:checked').val() == "NO"){
    var roleAdd = false;
  }else {
    var roleAdd = null;
  }
  if( $('input[name="roleUpdate"]:checked').val() == "YES"){
    var roleUpdate = true;
  }else if( $('input[name="roleUpdate"]:checked').val() == "NO"){
    var roleUpdate = false;
  }else {
    var roleUpdate = null;
  }
  if( $('input[name="roleDelete"]:checked').val() == "YES"){
    var roleDelete = true;
  }else if( $('input[name="roleDelete"]:checked').val() == "NO"){
    var roleDelete = false;
  }else {
    var roleDelete = null;
  }
  if( $('input[name="roleDisplay"]:checked').val() == "YES"){
    var roleDisplay = true;
  }else if( $('input[name="roleDisplay"]:checked').val() == "NO"){
    var roleDisplay = false;
  }else {
    var roleDisplay = null;
  }
  if( $('input[name="rolePrint"]:checked').val() == "YES"){
    var rolePrint = true;
  }else if( $('input[name="rolePrint"]:checked').val() == "NO"){
    var rolePrint = false;
  }else {
    var rolePrint = null;
  }
  if( $('input[name="roleAuthorize"]:checked').val() == "YES"){
    var roleAuthorize = true;
  }else if( $('input[name="roleAuthorize"]:checked').val() == "NO"){
    var roleAuthorize = false;
  }else {
    var roleAuthorize = null;
  }
  if( $('input[name="roleDetails"]:checked').val() == "YES"){
    var roleDetails = true;
  }else if( $('input[name="roleDetails"]:checked').val() == "NO"){
    var roleDetails = false;
  }else {
    var roleDetails = null;
  }
  //  Get Articles values
  if( $('input[name="articleAdd"]:checked').val() == "YES"){
    var articleAdd = true;
  }else if( $('input[name="articleAdd"]:checked').val() == "NO"){
    var articleAdd = false;
  }else {
    var articleAdd = null;
  }
  if( $('input[name="articleUpdate"]:checked').val() == "YES"){
    var articleUpdate = true;
  }else if( $('input[name="articleUpdate"]:checked').val() == "NO"){
    var articleUpdate = false;
  }else {
    var articleUpdate = null;
  }
  if( $('input[name="articleDelete"]:checked').val() == "YES"){
    var articleDelete = true;
  }else if( $('input[name="articleDelete"]:checked').val() == "NO"){
    var articleDelete = false;
  }else {
    var articleDelete = null;
  }
  if( $('input[name="articleDisplay"]:checked').val() == "YES"){
    var articleDisplay = true;
  }else if( $('input[name="articleDisplay"]:checked').val() == "NO"){
    var articleDisplay = false;
  }else {
    var articleDisplay = null;
  }
  if( $('input[name="articlePrint"]:checked').val() == "YES"){
    var articlePrint = true;
  }else if( $('input[name="articlePrint"]:checked').val() == "NO"){
    var articlePrint = false;
  }else {
    var articlePrint = null;
  }
  if( $('input[name="articleAuthorize"]:checked').val() == "YES"){
    var articleAuthorize = true;
  }else if( $('input[name="articleAuthorize"]:checked').val() == "NO"){
    var articleAuthorize = false;
  }else {
    var articleAuthorize = null;
  }
  if( $('input[name="articleDetails"]:checked').val() == "YES"){
    var articleDetails = true;
  }else if( $('input[name="articleDetails"]:checked').val() == "NO"){
    var articleDetails = false;
  }else {
    var articleDetails = null;
  }
  if( $('input[name="articleOptions"]:checked').val() == "YES"){
    var articleOptions = true;
  }else if( $('input[name="articleOptions"]:checked').val() == "NO"){
    var articleOptions = false;
  }else {
    var articleOptions = null;
  }
  //  Get Modules values
  if( $('input[name="moduleAdd"]:checked').val() == "YES"){
    var moduleAdd = true;
  }else if( $('input[name="moduleAdd"]:checked').val() == "NO"){
    var moduleAdd = false;
  }else {
    var moduleAdd = null;
  }
  if( $('input[name="moduleUpdate"]:checked').val() == "YES"){
    var moduleUpdate = true;
  }else if( $('input[name="moduleUpdate"]:checked').val() == "NO"){
    var moduleUpdate = false;
  }else {
    var moduleUpdate = null;
  }
  if( $('input[name="moduleDelete"]:checked').val() == "YES"){
    var moduleDelete = true;
  }else if( $('input[name="moduleDelete"]:checked').val() == "NO"){
    var moduleDelete = false;
  }else {
    var moduleDelete = null;
  }
  if( $('input[name="moduleDisplay"]:checked').val() == "YES"){
    var moduleDisplay = true;
  }else if( $('input[name="moduleDisplay"]:checked').val() == "NO"){
    var moduleDisplay = false;
  }else {
    var moduleDisplay = null;
  }
  if( $('input[name="modulePrint"]:checked').val() == "YES"){
    var modulePrint = true;
  }else if( $('input[name="modulePrint"]:checked').val() == "NO"){
    var modulePrint = false;
  }else {
    var modulePrint = null;
  }
  if( $('input[name="moduleAuthorize"]:checked').val() == "YES"){
    var moduleAuthorize = true;
  }else if( $('input[name="moduleAuthorize"]:checked').val() == "NO"){
    var moduleAuthorize = false;
  }else {
    var moduleAuthorize = null;
  }
  if( $('input[name="moduleDetails"]:checked').val() == "YES"){
    var moduleDetails = true;
  }else if( $('input[name="moduleDetails"]:checked').val() == "NO"){
    var moduleDetails = false;
  }else {
    var moduleDetails = null;
  }
  //  Get Currencies values
  if( $('input[name="currencyAdd"]:checked').val() == "YES"){
    var currencyAdd = true;
  }else if( $('input[name="currencyAdd"]:checked').val() == "NO"){
    var currencyAdd = false;
  }else {
    var currencyAdd = null;
  }
  if( $('input[name="currencyUpdate"]:checked').val() == "YES"){
    var currencyUpdate = true;
  }else if( $('input[name="currencyUpdate"]:checked').val() == "NO"){
    var currencyUpdate = false;
  }else {
    var currencyUpdate = null;
  }
  if( $('input[name="currencyDelete"]:checked').val() == "YES"){
    var currencyDelete = true;
  }else if( $('input[name="currencyDelete"]:checked').val() == "NO"){
    var currencyDelete = false;
  }else {
    var currencyDelete = null;
  }
  if( $('input[name="currencyDisplay"]:checked').val() == "YES"){
    var currencyDisplay = true;
  }else if( $('input[name="currencyDisplay"]:checked').val() == "NO"){
    var currencyDisplay = false;
  }else {
    var currencyDisplay = null;
  }
  if( $('input[name="currencyPrint"]:checked').val() == "YES"){
    var currencyPrint = true;
  }else if( $('input[name="currencyPrint"]:checked').val() == "NO"){
    var currencyPrint = false;
  }else {
    var currencyPrint = null;
  }
  if( $('input[name="currencyAuthorize"]:checked').val() == "YES"){
    var currencyAuthorize = true;
  }else if( $('input[name="currencyAuthorize"]:checked').val() == "NO"){
    var currencyAuthorize = false;
  }else {
    var currencyAuthorize = null;
  }
  if( $('input[name="currencyDetails"]:checked').val() == "YES"){
    var currencyDetails = true;
  }else if( $('input[name="currencyDetails"]:checked').val() == "NO"){
    var currencyDetails = false;
  }else {
    var currencyDetails = null;
  }
  //  Get Segments values
  if( $('input[name="segmentAdd"]:checked').val() == "YES"){
    var segmentAdd = true;
  }else if( $('input[name="segmentAdd"]:checked').val() == "NO"){
    var segmentAdd = false;
  }else {
    var segmentAdd = null;
  }
  if( $('input[name="segmentUpdate"]:checked').val() == "YES"){
    var segmentUpdate = true;
  }else if( $('input[name="segmentUpdate"]:checked').val() == "NO"){
    var segmentUpdate = false;
  }else {
    var segmentUpdate = null;
  }
  if( $('input[name="segmentDelete"]:checked').val() == "YES"){
    var segmentDelete = true;
  }else if( $('input[name="segmentDelete"]:checked').val() == "NO"){
    var segmentDelete = false;
  }else {
    var segmentDelete = null;
  }
  if( $('input[name="segmentDisplay"]:checked').val() == "YES"){
    var segmentDisplay = true;
  }else if( $('input[name="segmentDisplay"]:checked').val() == "NO"){
    var segmentDisplay = false;
  }else {
    var segmentDisplay = null;
  }
  if( $('input[name="segmentPrint"]:checked').val() == "YES"){
    var segmentPrint = true;
  }else if( $('input[name="segmentPrint"]:checked').val() == "NO"){
    var segmentPrint = false;
  }else {
    var segmentPrint = null;
  }
  if( $('input[name="segmentAuthorize"]:checked').val() == "YES"){
    var segmentAuthorize = true;
  }else if( $('input[name="segmentAuthorize"]:checked').val() == "NO"){
    var segmentAuthorize = false;
  }else {
    var segmentAuthorize = null;
  }
  if( $('input[name="segmentDetails"]:checked').val() == "YES"){
    var segmentDetails = true;
  }else if( $('input[name="segmentDetails"]:checked').val() == "NO"){
    var segmentDetails = false;
  }else {
    var segmentDetails = null;
  }
  //  Get Plannings values
  if( $('input[name="planningAdd"]:checked').val() == "YES"){
    var planningAdd = true;
  }else if( $('input[name="planningAdd"]:checked').val() == "NO"){
    var planningAdd = false;
  }else {
    var planningAdd = null;
  }
  if( $('input[name="planningDisplay"]:checked').val() == "YES"){
    var planningDisplay = true;
  }else if( $('input[name="planningDisplay"]:checked').val() == "NO"){
    var planningDisplay = false;
  }else {
    var planningDisplay = null;
  }
  if( $('input[name="planningPrint"]:checked').val() == "YES"){
    var planningPrint = true;
  }else if( $('input[name="planningPrint"]:checked').val() == "NO"){
    var planningPrint = false;
  }else {
    var planningPrint = null;
  }
  if( $('input[name="planningAuthorize"]:checked').val() == "YES"){
    var planningAuthorize = true;
  }else if( $('input[name="planningAuthorize"]:checked').val() == "NO"){
    var planningAuthorize = false;
  }else {
    var planningAuthorize = null;
  }
  if( $('input[name="planningDetails"]:checked').val() == "YES"){
    var planningDetails = true;
  }else if( $('input[name="planningDetails"]:checked').val() == "NO"){
    var planningDetails = false;
  }else {
    var planningDetails = null;
  }
  //  Get Bookings values
  if( $('input[name="bookingAdd"]:checked').val() == "YES"){
    var bookingAdd = true;
  }else if( $('input[name="bookingAdd"]:checked').val() == "NO"){
    var bookingAdd = false;
  }else {
    var bookingAdd = null;
  }
  if( $('input[name="bookingUpdate"]:checked').val() == "YES"){
    var bookingUpdate = true;
  }else if( $('input[name="bookingUpdate"]:checked').val() == "NO"){
    var bookingUpdate = false;
  }else {
    var bookingUpdate = null;
  }
  if( $('input[name="bookingDelete"]:checked').val() == "YES"){
    var bookingDelete = true;
  }else if( $('input[name="bookingDelete"]:checked').val() == "NO"){
    var bookingDelete = false;
  }else {
    var bookingDelete = null;
  }
  if( $('input[name="bookingDisplay"]:checked').val() == "YES"){
    var bookingDisplay = true;
  }else if( $('input[name="bookingDisplay"]:checked').val() == "NO"){
    var bookingDisplay = false;
  }else {
    var bookingDisplay = null;
  }
  if( $('input[name="bookingPrint"]:checked').val() == "YES"){
    var bookingPrint = true;
  }else if( $('input[name="bookingPrint"]:checked').val() == "NO"){
    var bookingPrint = false;
  }else {
    var bookingPrint = null;
  }
  if( $('input[name="bookingAuthorize"]:checked').val() == "YES"){
    var bookingAuthorize = true;
  }else if( $('input[name="bookingAuthorize"]:checked').val() == "NO"){
    var bookingAuthorize = false;
  }else {
    var bookingAuthorize = null;
  }
  if( $('input[name="bookingDetails"]:checked').val() == "YES"){
    var bookingDetails = true;
  }else if( $('input[name="bookingDetails"]:checked').val() == "NO"){
    var bookingDetails = false;
  }else {
    var bookingDetails = null;
  }
  //  Get Contents values
  if( $('input[name="contentAdd"]:checked').val() == "YES"){
    var contentAdd = true;
  }else if( $('input[name="contentAdd"]:checked').val() == "NO"){
    var contentAdd = false;
  }else {
    var contentAdd = null;
  }
  if( $('input[name="contentDelete"]:checked').val() == "YES"){
    var contentDelete = true;
  }else if( $('input[name="contentDelete"]:checked').val() == "NO"){
    var contentDelete = false;
  }else {
    var contentDelete = null;
  }
  if( $('input[name="contentDisplay"]:checked').val() == "YES"){
    var contentDisplay = true;
  }else if( $('input[name="contentDisplay"]:checked').val() == "NO"){
    var contentDisplay = false;
  }else {
    var contentDisplay = null;
  }
  if( $('input[name="contentPrint"]:checked').val() == "YES"){
    var contentPrint = true;
  }else if( $('input[name="contentPrint"]:checked').val() == "NO"){
    var contentPrint = false;
  }else {
    var contentPrint = null;
  }
  if( $('input[name="contentAuthorize"]:checked').val() == "YES"){
    var contentAuthorize = true;
  }else if( $('input[name="contentAuthorize"]:checked').val() == "NO"){
    var contentAuthorize = false;
  }else {
    var contentAuthorize = null;
  }
  if( $('input[name="contentDetails"]:checked').val() == "YES"){
    var contentDetails = true;
  }else if( $('input[name="contentDetails"]:checked').val() == "NO"){
    var contentDetails = false;
  }else {
    var contentDetails = null;
  }
  //  Get Firmwares values
  if( $('input[name="firmwareAdd"]:checked').val() == "YES"){
    var firmwareAdd = true;
  }else if( $('input[name="firmwareAdd"]:checked').val() == "NO"){
    var firmwareAdd = false;
  }else {
    var firmwareAdd = null;
  }
  if( $('input[name="firmwareUpdate"]:checked').val() == "YES"){
    var firmwareUpdate = true;
  }else if( $('input[name="firmwareUpdate"]:checked').val() == "NO"){
    var firmwareUpdate = false;
  }else {
    var firmwareUpdate = null;
  }
  if( $('input[name="firmwareDelete"]:checked').val() == "YES"){
    var firmwareDelete = true;
  }else if( $('input[name="firmwareDelete"]:checked').val() == "NO"){
    var firmwareDelete = false;
  }else {
    var firmwareDelete = null;
  }
  if( $('input[name="firmwareDisplay"]:checked').val() == "YES"){
    var firmwareDisplay = true;
  }else if( $('input[name="firmwareDisplay"]:checked').val() == "NO"){
    var firmwareDisplay = false;
  }else {
    var firmwareDisplay = null;
  }
  if( $('input[name="firmwarePrint"]:checked').val() == "YES"){
    var firmwarePrint = true;
  }else if( $('input[name="firmwarePrint"]:checked').val() == "NO"){
    var firmwarePrint = false;
  }else {
    var firmwarePrint = null;
  }
  if( $('input[name="firmwareAuthorize"]:checked').val() == "YES"){
    var firmwareAuthorize = true;
  }else if( $('input[name="firmwareAuthorize"]:checked').val() == "NO"){
    var firmwareAuthorize = false;
  }else {
    var firmwareAuthorize = null;
  }
  if( $('input[name="firmwareDetails"]:checked').val() == "YES"){
    var firmwareDetails = true;
  }else if( $('input[name="firmwareDetails"]:checked').val() == "NO"){
    var firmwareDetails = false;
  }else {
    var firmwareDetails = null;
  }
  //  Get Signatures values
  if( $('input[name="signatureAdd"]:checked').val() == "YES"){
    var signatureAdd = true;
  }else if( $('input[name="signatureAdd"]:checked').val() == "NO"){
    var signatureAdd = false;
  }else {
    var signatureAdd = null;
  }
  if( $('input[name="signatureDelete"]:checked').val() == "YES"){
    var signatureDelete = true;
  }else if( $('input[name="signatureDelete"]:checked').val() == "NO"){
    var signatureDelete = false;
  }else {
    var signatureDelete = null;
  }
  if( $('input[name="signatureDisplay"]:checked').val() == "YES"){
    var signatureDisplay = true;
  }else if( $('input[name="signatureDisplay"]:checked').val() == "NO"){
    var signatureDisplay = false;
  }else {
    var signatureDisplay = null;
  }
  if( $('input[name="signaturePrint"]:checked').val() == "YES"){
    var signaturePrint = true;
  }else if( $('input[name="signaturePrint"]:checked').val() == "NO"){
    var signaturePrint = false;
  }else {
    var signaturePrint = null;
  }
  //  Get Tariffs values
  if( $('input[name="tariffAdd"]:checked').val() == "YES"){
    var tariffAdd = true;
  }else if( $('input[name="tariffAdd"]:checked').val() == "NO"){
    var tariffAdd = false;
  }else {
    var tariffAdd = null;
  }
  if( $('input[name="tariffUpdate"]:checked').val() == "YES"){
    var tariffUpdate = true;
  }else if( $('input[name="tariffUpdate"]:checked').val() == "NO"){
    var tariffUpdate = false;
  }else {
    var tariffUpdate = null;
  }
  if( $('input[name="tariffDelete"]:checked').val() == "YES"){
    var tariffDelete = true;
  }else if( $('input[name="tariffDelete"]:checked').val() == "NO"){
    var tariffDelete = false;
  }else {
    var tariffDelete = null;
  }
  if( $('input[name="tariffDisplay"]:checked').val() == "YES"){
    var tariffDisplay = true;
  }else if( $('input[name="tariffDisplay"]:checked').val() == "NO"){
    var tariffDisplay = false;
  }else {
    var tariffDisplay = null;
  }
  if( $('input[name="tariffPrint"]:checked').val() == "YES"){
    var tariffPrint = true;
  }else if( $('input[name="tariffPrint"]:checked').val() == "NO"){
    var tariffPrint = false;
  }else {
    var tariffPrint = null;
  }
  if( $('input[name="tariffAuthorize"]:checked').val() == "YES"){
    var tariffAuthorize = true;
  }else if( $('input[name="tariffAuthorize"]:checked').val() == "NO"){
    var tariffAuthorize = false;
  }else {
    var tariffAuthorize = null;
  }
  if( $('input[name="tariffDetails"]:checked').val() == "YES"){
    var tariffDetails = true;
  }else if( $('input[name="tariffDetails"]:checked').val() == "NO"){
    var tariffDetails = false;
  }else {
    var tariffDetails = null;
  }
  //  Get Clients values
  if( $('input[name="clientAdd"]:checked').val() == "YES"){
    var clientAdd = true;
  }else if( $('input[name="clientAdd"]:checked').val() == "NO"){
    var clientAdd = false;
  }else {
    var clientAdd = null;
  }
  if( $('input[name="clientUpdate"]:checked').val() == "YES"){
    var clientUpdate = true;
  }else if( $('input[name="clientUpdate"]:checked').val() == "NO"){
    var clientUpdate = false;
  }else {
    var clientUpdate = null;
  }
  if( $('input[name="clientDelete"]:checked').val() == "YES"){
    var clientDelete = true;
  }else if( $('input[name="clientDelete"]:checked').val() == "NO"){
    var clientDelete = false;
  }else {
    var clientDelete = null;
  }
  if( $('input[name="clientDisplay"]:checked').val() == "YES"){
    var clientDisplay = true;
  }else if( $('input[name="clientDisplay"]:checked').val() == "NO"){
    var clientDisplay = false;
  }else {
    var clientDisplay = null;
  }
  if( $('input[name="clientPrint"]:checked').val() == "YES"){
    var clientPrint = true;
  }else if( $('input[name="clientPrint"]:checked').val() == "NO"){
    var clientPrint = false;
  }else {
    var clientPrint = null;
  }
  if( $('input[name="clientAuthorize"]:checked').val() == "YES"){
    var clientAuthorize = true;
  }else if( $('input[name="clientAuthorize"]:checked').val() == "NO"){
    var clientAuthorize = false;
  }else {
    var clientAuthorize = null;
  }
  if( $('input[name="clientDetails"]:checked').val() == "YES"){
    var clientDetails = true;
  }else if( $('input[name="clientDetails"]:checked').val() == "NO"){
    var clientDetails = false;
  }else {
    var clientDetails = null;
  }
  if( $('input[name="clientInvoices"]:checked').val() == "YES"){
    var clientInvoices = true;
  }else if( $('input[name="clientInvoices"]:checked').val() == "NO"){
    var clientInvoices = false;
  }else {
    var clientInvoices = null;
  }
  if( $('input[name="clientRoles"]:checked').val() == "YES"){
    var clientRoles = true;
  }else if( $('input[name="clientRoles"]:checked').val() == "NO"){
    var clientRoles = false;
  }else {
    var clientRoles = null;
  }
  if( $('input[name="clientUsers"]:checked').val() == "YES"){
    var clientUsers = true;
  }else if( $('input[name="clientUsers"]:checked').val() == "NO"){
    var clientUsers = false;
  }else {
    var clientUsers = null;
  }
  if( $('input[name="clientBookings"]:checked').val() == "YES"){
    var clientBookings = true;
  }else if( $('input[name="clientBookings"]:checked').val() == "NO"){
    var clientBookings = false;
  }else {
    var clientBookings = null;
  }
  if( $('input[name="clientContracts"]:checked').val() == "YES"){
    var clientContracts = true;
  }else if( $('input[name="clientContracts"]:checked').val() == "NO"){
    var clientContracts = false;
  }else {
    var clientContracts = null;
  }
  if( $('input[name="clientContents"]:checked').val() == "YES"){
    var clientContents = true;
  }else if( $('input[name="clientContents"]:checked').val() == "NO"){
    var clientContents = false;
  }else {
    var clientContents = null;
  }
  //  Get Companies values
  if( $('input[name="companyAdd"]:checked').val() == "YES"){
    var companyAdd = true;
  }else if( $('input[name="companyAdd"]:checked').val() == "NO"){
    var companyAdd = false;
  }else {
    var companyAdd = null;
  }
  if( $('input[name="companyUpdate"]:checked').val() == "YES"){
    var companyUpdate = true;
  }else if( $('input[name="companyUpdate"]:checked').val() == "NO"){
    var companyUpdate = false;
  }else {
    var companyUpdate = null;
  }
  if( $('input[name="companyDelete"]:checked').val() == "YES"){
    var companyDelete = true;
  }else if( $('input[name="companyDelete"]:checked').val() == "NO"){
    var companyDelete = false;
  }else {
    var companyDelete = null;
  }
  if( $('input[name="companyDisplay"]:checked').val() == "YES"){
    var companyDisplay = true;
  }else if( $('input[name="companyDisplay"]:checked').val() == "NO"){
    var companyDisplay = false;
  }else {
    var companyDisplay = null;
  }
  if( $('input[name="companyPrint"]:checked').val() == "YES"){
    var companyPrint = true;
  }else if( $('input[name="companyPrint"]:checked').val() == "NO"){
    var companyPrint = false;
  }else {
    var companyPrint = null;
  }
  if( $('input[name="companyAuthorize"]:checked').val() == "YES"){
    var companyAuthorize = true;
  }else if( $('input[name="companyAuthorize"]:checked').val() == "NO"){
    var companyAuthorize = false;
  }else {
    var companyAuthorize = null;
  }
  if( $('input[name="companyDetails"]:checked').val() == "YES"){
    var companyDetails = true;
  }else if( $('input[name="companyDetails"]:checked').val() == "NO"){
    var companyDetails = false;
  }else {
    var companyDetails = null;
  }
  if( $('input[name="companyRoles"]:checked').val() == "YES"){
    var companyRoles = true;
  }else if( $('input[name="companyRoles"]:checked').val() == "NO"){
    var companyRoles = false;
  }else {
    var companyRoles = null;
  }
  if( $('input[name="companyUsers"]:checked').val() == "YES"){
    var companyUsers = true;
  }else if( $('input[name="companyUsers"]:checked').val() == "NO"){
    var companyUsers = false;
  }else {
    var companyUsers = null;
  }
  if( $('input[name="companySegments"]:checked').val() == "YES"){
    var companySegments = true;
  }else if( $('input[name="companySegments"]:checked').val() == "NO"){
    var companySegments = false;
  }else {
    var companySegments = null;
  }
  if( $('input[name="companyContracts"]:checked').val() == "YES"){
    var companyContracts = true;
  }else if( $('input[name="companyContracts"]:checked').val() == "NO"){
    var companyContracts = false;
  }else {
    var companyContracts = null;
  }
  if( $('input[name="companyInvoices"]:checked').val() == "YES"){
    var companyInvoices = true;
  }else if( $('input[name="companyInvoices"]:checked').val() == "NO"){
    var companyInvoices = false;
  }else {
    var companyInvoices = null;
  }
  if( $('input[name="companyScreens"]:checked').val() == "YES"){
    var companyScreens = true;
  }else if( $('input[name="companyScreens"]:checked').val() == "NO"){
    var companyScreens = false;
  }else {
    var companyScreens = null;
  }
  if( $('input[name="companyCurrencies"]:checked').val() == "YES"){
    var companyCurrencies = true;
  }else if( $('input[name="companyCurrencies"]:checked').val() == "NO"){
    var companyCurrencies = false;
  }else {
    var companyCurrencies = null;
  }
  if( $('input[name="companyClients"]:checked').val() == "YES"){
    var companyClients = true;
  }else if( $('input[name="companyClients"]:checked').val() == "NO"){
    var companyClients = false;
  }else {
    var companyClients = null;
  }
  if( $('input[name="companyBookings"]:checked').val() == "YES"){
    var companyBookings = true;
  }else if( $('input[name="companyBookings"]:checked').val() == "NO"){
    var companyBookings = false;
  }else {
    var companyBookings = null;
  }
  if( $('input[name="companyContents"]:checked').val() == "YES"){
    var companyContents = true;
  }else if( $('input[name="companyContents"]:checked').val() == "NO"){
    var companyContents = false;
  }else {
    var companyContents = null;
  }
  if( $('input[name="companyTariffs"]:checked').val() == "YES"){
    var companyTariffs = true;
  }else if( $('input[name="companyTariffs"]:checked').val() == "NO"){
    var companyTariffs = false;
  }else {
    var companyTariffs = null;
  }
  if( $('input[name="companyFirmwares"]:checked').val() == "YES"){
    var companyFirmwares = true;
  }else if( $('input[name="companyFirmwares"]:checked').val() == "NO"){
    var companyFirmwares = false;
  }else {
    var companyFirmwares = null;
  }
  if( $('input[name="companyArticles"]:checked').val() == "YES"){
    var companyArticles = true;
  }else if( $('input[name="companyArticles"]:checked').val() == "NO"){
    var companyArticles = false;
  }else {
    var companyArticles = null;
  }
  //  Get Screens values
  if( $('input[name="screenAdd"]:checked').val() == "YES"){
    var screenAdd = true;
  }else if( $('input[name="screenAdd"]:checked').val() == "NO"){
    var screenAdd = false;
  }else {
    var screenAdd = null;
  }
  if( $('input[name="screenUpdate"]:checked').val() == "YES"){
    var screenUpdate = true;
  }else if( $('input[name="screenUpdate"]:checked').val() == "NO"){
    var screenUpdate = false;
  }else {
    var screenUpdate = null;
  }
  if( $('input[name="screenDelete"]:checked').val() == "YES"){
    var screenDelete = true;
  }else if( $('input[name="screenDelete"]:checked').val() == "NO"){
    var screenDelete = false;
  }else {
    var screenDelete = null;
  }
  if( $('input[name="screenDisplay"]:checked').val() == "YES"){
    var screenDisplay = true;
  }else if( $('input[name="screenDisplay"]:checked').val() == "NO"){
    var screenDisplay = false;
  }else {
    var screenDisplay = null;
  }
  if( $('input[name="screenPrint"]:checked').val() == "YES"){
    var screenPrint = true;
  }else if( $('input[name="screenPrint"]:checked').val() == "NO"){
    var screenPrint = false;
  }else {
    var screenPrint = null;
  }
  if( $('input[name="screenAuthorize"]:checked').val() == "YES"){
    var screenAuthorize = true;
  }else if( $('input[name="screenAuthorize"]:checked').val() == "NO"){
    var screenAuthorize = false;
  }else {
    var screenAuthorize = null;
  }
  if( $('input[name="screenDetails"]:checked').val() == "YES"){
    var screenDetails = true;
  }else if( $('input[name="screenDetails"]:checked').val() == "NO"){
    var screenDetails = false;
  }else {
    var screenDetails = null;
  }
  if( $('input[name="screenShow"]:checked').val() == "YES"){
    var screenShow = true;
  }else if( $('input[name="screenShow"]:checked').val() == "NO"){
    var screenShow = false;
  }else {
    var screenShow = null;
  }
  if( $('input[name="screenSystem"]:checked').val() == "YES"){
    var screenSystem = true;
  }else if( $('input[name="screenSystem"]:checked').val() == "NO"){
    var screenSystem = false;
  }else {
    var screenSystem = null;
  }
  if( $('input[name="screenClear"]:checked').val() == "YES"){
    var screenClear = true;
  }else if( $('input[name="screenClear"]:checked').val() == "NO"){
    var screenClear = false;
  }else {
    var screenClear = null;
  }
  if( $('input[name="screenMonitor"]:checked').val() == "YES"){
    var screenMonitor = true;
  }else if( $('input[name="screenMonitor"]:checked').val() == "NO"){
    var screenMonitor = false;
  }else {
    var screenMonitor = null;
  }
  if( $('input[name="screenActivate"]:checked').val() == "YES"){
    var screenActivate = true;
  }else if( $('input[name="screenActivate"]:checked').val() == "NO"){
    var screenActivate = false;
  }else {
    var screenActivate = null;
  }
  if( $('input[name="screenOn/Off"]:checked').val() == "YES"){
    var screenOnOff = true;
  }else if( $('input[name="screenOn/Off"]:checked').val() == "NO"){
    var screenOnOff = false;
  }else {
    var screenOnOff = null;
  }
  if (Session.get("UserLogged").codeCompany != "swallow-labs") {
    // Company user would adding a role
    var codeCompany = Session.get("UserLogged").codeCompany;
  }else {
    // swallow-labs or company user would adding a role
    var codeCompany = Session.get("COMPANY_CODE");
  }
  var role =
    {
      'roleName': roleName,
      'currentNumber': 0,
      'status': "HLD",
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'code': Session.get("CLIENT_CODE_X"),
      'codeCompany' : codeCompany,
      'accountAdd': accountAdd,
      'accountUpdate': accountUpdate,
      'accountDelete': accountDelete,
      'accountDisplay': accountDisplay,
      'accountPrint': accountPrint,
      'accountAuthorize': accountAuthorize,
      'accountDetails': accountDetails,
      'contractAdd': contractAdd,
      'contractUpdate': contractUpdate,
      'contractDelete': contractDelete,
      'contractDisplay': contractDisplay,
      'contractPrint': contractPrint,
      'contractAuthorize': contractAuthorize,
      'contractDetails': contractDetails,
      'articleAdd': articleAdd,
      'articleUpdate': articleUpdate,
      'articleDelete': articleDelete,
      'articleDisplay': articleDisplay,
      'articlePrint': articlePrint,
      'articleAuthorize': articleAuthorize,
      'articleDetails': articleDetails,
      'articleOptions': articleOptions,
      'invoiceAdd': invoiceAdd,
      'invoiceUpdate': invoiceUpdate,
      'invoiceDelete': invoiceDelete,
      'invoiceDisplay': invoiceDisplay,
      'invoicePrint': invoicePrint,
      'invoiceAuthorize': invoiceAuthorize,
      'invoiceDetails': invoiceDetails,
      'clientAdd': clientAdd,
      'clientUpdate': clientUpdate,
      'clientDelete': clientDelete,
      'clientDisplay': clientDisplay,
      'clientPrint': clientPrint,
      'clientAuthorize': clientAuthorize,
      'clientDetails': clientDetails,
      'clientInvoices': clientInvoices,
      'clientRoles': clientRoles,
      'clientUsers': clientUsers,
      'clientBookings': clientBookings,
      'clientContracts': clientContracts,
      'clientContents': clientContents,
      'currencyAdd': currencyAdd,
      'currencyUpdate': currencyUpdate,
      'currencyDelete': currencyDelete,
      'currencyDisplay': currencyDisplay,
      'currencyPrint': currencyPrint,
      'currencyAuthorize': currencyAuthorize,
      'currencyDetails': currencyDetails,
      'moduleAdd': moduleAdd,
      'moduleUpdate': moduleUpdate,
      'moduleDisplay': moduleDisplay,
      'moduleDelete': moduleDelete,
      'modulePrint': modulePrint,
      'moduleAuthorize': moduleAuthorize,
      'moduleDetails': moduleDetails,
      'screenAdd': screenAdd,
      'screenUpdate': screenUpdate,
      'screenDelete': screenDelete,
      'screenDisplay': screenDisplay,
      'screenPrint': screenPrint,
      'screenAuthorize': screenAuthorize,
      'screenDetails': screenDetails,
      'screenShow': screenShow,
      'screenSystem': screenSystem,
      'screenClear': screenClear,
      'screenMonitor': screenMonitor,
      'screenActivate': screenActivate,
      'screenOnOff': screenOnOff,
      'segmentAdd': segmentAdd,
      'segmentUpdate': segmentUpdate,
      'segmentDelete': segmentDelete,
      'segmentDisplay': segmentDisplay,
      'segmentPrint': segmentPrint,
      'segmentAuthorize': segmentAuthorize,
      'segmentDetails': segmentDetails,
      'planningAdd': planningAdd,
      'planningDisplay': planningDisplay,
      'planningPrint': planningPrint,
      'planningAuthorize': planningAuthorize,
      'planningDetails': planningDetails,
      'tariffAdd': tariffAdd,
      'tariffUpdate': tariffUpdate,
      'tariffDelete': tariffDelete,
      'tariffDisplay': tariffDisplay,
      'tariffPrint': tariffPrint,
      'tariffAuthorize': bookingAuthorize,
      'tariffDetails': bookingDetails,
      'bookingAdd': bookingAdd,
      'bookingUpdate': bookingUpdate,
      'bookingDelete': bookingDelete,
      'bookingDisplay': bookingDisplay,
      'bookingPrint': bookingPrint,
      'bookingAuthorize': bookingAuthorize,
      'bookingDetails': bookingDetails,
      'contentAdd': contentAdd,
      'contentDelete': contentDelete,
      'contentDisplay': contentDisplay,
      'contentAuthorize': contentAuthorize,
      'contentDetails': contentDetails,
      'contentPrint': contentPrint,
      'roleAdd': roleAdd,
      'roleUpdate': roleUpdate,
      'roleDelete': roleDelete,
      'roleDisplay': roleDisplay,
      'rolePrint': rolePrint,
      'roleAuthorize': roleAuthorize,
      'roleDetails': roleDetails,
      'firmwareAdd': firmwareAdd,
      'firmwareUpdate': firmwareUpdate,
      'firmwareDelete': firmwareDelete,
      'firmwareDisplay': firmwareDisplay,
      'firmwarePrint': firmwarePrint,
      'firmwareAuthorize': firmwareAuthorize,
      'firmwareDetails': firmwareDetails,
      'signatureAdd': signatureAdd,
      'signatureDelete': signatureDelete,
      'signatureDisplay': signatureDisplay,
      'signaturePrint': signaturePrint,
      'tariffAdd': tariffAdd,
      'tariffUpdate': tariffUpdate,
      'tariffDelete': tariffDelete,
      'tariffDisplay': tariffDisplay,
      'tariffPrint': tariffPrint,
      'tariffAuthorize': tariffAuthorize,
      'tariffDetails': tariffDetails,
      'companyAdd': companyAdd,
      'companyUpdate': companyUpdate,
      'companyDelete': companyDelete,
      'companyDisplay': companyDisplay,
      'companyPrint': companyPrint,
      'companyAuthorize': companyAuthorize,
      'companyDetails': companyDetails,
      'companyInvoices': companyInvoices,
      'companyRoles': companyRoles,
      'companyUsers': companyUsers,
      'companySegments': companySegments,
      'companyContracts': companyContracts,
      'companyArticles': companyArticles,
      'companyScreens': companyScreens,
      'companyBookings': companyBookings,
      'companyContents': companyContents,
      'companyCurrencies': companyCurrencies,
      'companyClients': companyClients,
      'companyTariffs': companyTariffs,
      'companyFirmwares': companyFirmwares
    };
  return role;
}
function getValuesFromFormForEdit(){
  if (document.getElementById('roleName1') != null) {
    var roleName = document.getElementById("roleName1").value;
  }else {
    var roleName = null;
  }
  //  GET Accounts VALUES
  if( $('input[name="accountAdd1"]:checked').val() == "YES"){
    var accountAdd = true;
  }else if( $('input[name="accountAdd1"]:checked').val() == "NO"){
    var accountAdd = false;
  }else {
    var accountAdd = null;
  }
  if( $('input[name="accountUpdate1"]:checked').val() == "YES"){
    var accountUpdate = true;
  }else if( $('input[name="accountUpdate1"]:checked').val() == "NO"){
    var accountUpdate = false;
  }else {
    var accountUpdate = null;
  }
  if( $('input[name="accountDelete1"]:checked').val() == "YES"){
    var accountDelete = true;
  }else if( $('input[name="accountDelete1"]:checked').val() == "NO"){
    var accountDelete = false;
  }else {
    var accountDelete = null;
  }
  if( $('input[name="accountDisplay1"]:checked').val() == "YES"){
    var accountDisplay = true;
  }else if( $('input[name="accountDisplay1"]:checked').val() == "NO"){
    var accountDisplay = false;
  }else {
    var accountDisplay = null;
  }
  if( $('input[name="accountPrint1"]:checked').val() == "YES"){
    var accountPrint = true;
  }else if( $('input[name="accountPrint1"]:checked').val() == "NO"){
    var accountPrint = false;
  }else {
    var accountPrint = null;
  }
  if( $('input[name="accountAuthorize1"]:checked').val() == "YES"){
    var accountAuthorize = true;
  }else if( $('input[name="accountAuthorize1"]:checked').val() == "NO"){
    var accountAuthorize = false;
  }else {
    var accountAuthorize = null;
  }
  if( $('input[name="accountDetails1"]:checked').val() == "YES"){
    var accountDetails = true;
  }else if( $('input[name="accountDetails1"]:checked').val() == "NO"){
    var accountDetails = false;
  }else {
    var accountDetails = null;
  }
  //  Get Contracts values
  if( $('input[name="contractAdd1"]:checked').val() == "YES"){
    var contractAdd = true;
  }else if( $('input[name="contractAdd1"]:checked').val() == "NO"){
    var contractAdd = false;
  }else {
    var contractAdd = null;
  }
  if( $('input[name="contractUpdate1"]:checked').val() == "YES"){
    var contractUpdate = true;
  }else if( $('input[name="contractUpdate1"]:checked').val() == "NO"){
    var contractUpdate = false;
  }else {
    var contractUpdate = null;
  }
  if( $('input[name="contractDelete1"]:checked').val() == "YES"){
    var contractDelete = true;
  }else if( $('input[name="contractDelete1"]:checked').val() == "NO"){
    var contractDelete = false;
  }else {
    var contractDelete = null;
  }
  if( $('input[name="contractDisplay1"]:checked').val() == "YES"){
    var contractDisplay = true;
  }else if( $('input[name="contractDisplay1"]:checked').val() == "NO"){
    var contractDisplay = false;
  }else {
    var contractDisplay = null;
  }
  if( $('input[name="contractPrint1"]:checked').val() == "YES"){
    var contractPrint = true;
  }else if( $('input[name="contractPrint1"]:checked').val() == "NO"){
    var contractPrint = false;
  }else {
    var contractPrint = null;
  }
  if( $('input[name="contractAuthorize1"]:checked').val() == "YES"){
    var contractAuthorize = true;
  }else if( $('input[name="contractAuthorize1"]:checked').val() == "NO"){
    var contractAuthorize = false;
  }else {
    var contractAuthorize = null;
  }
  if( $('input[name="contractDetails1"]:checked').val() == "YES"){
    var contractDetails = true;
  }else if( $('input[name="contractDetails1"]:checked').val() == "NO"){
    var contractDetails = false;
  }else {
    var contractDetails = null;
  }
  //  Get Invoices values
  if( $('input[name="invoiceAdd1"]:checked').val() == "YES"){
    var invoiceAdd = true;
  }else if( $('input[name="invoiceAdd1"]:checked').val() == "NO"){
    var invoiceAdd = false;
  }else {
    var invoiceAdd = null;
  }
  if( $('input[name="invoiceUpdate1"]:checked').val() == "YES"){
    var invoiceUpdate = true;
  }else if( $('input[name="invoiceUpdate1"]:checked').val() == "NO"){
    var invoiceUpdate = false;
  }else {
    var invoiceUpdate = null;
  }
  if( $('input[name="invoiceDelete1"]:checked').val() == "YES"){
    var invoiceDelete = true;
  }else if( $('input[name="invoiceDelete1"]:checked').val() == "NO"){
    var invoiceDelete = false;
  }else {
    var invoiceDelete = null;
  }
  if( $('input[name="invoiceDisplay1"]:checked').val() == "YES"){
    var invoiceDisplay = true;
  }else if( $('input[name="invoiceDisplay1"]:checked').val() == "NO"){
    var invoiceDisplay = false;
  }else {
    var invoiceDisplay = null;
  }
  if( $('input[name="invoicePrint1"]:checked').val() == "YES"){
    var invoicePrint = true;
  }else if( $('input[name="invoicePrint1"]:checked').val() == "NO"){
    var invoicePrint = false;
  }else {
    var invoicePrint = null;
  }
  if( $('input[name="invoiceAuthorize1"]:checked').val() == "YES"){
    var invoiceAuthorize = true;
  }else if( $('input[name="invoiceAuthorize1"]:checked').val() == "NO"){
    var invoiceAuthorize = false;
  }else {
    var invoiceAuthorize = null;
  }
  if( $('input[name="invoiceDetails1"]:checked').val() == "YES"){
    var invoiceDetails = true;
  }else if( $('input[name="invoiceDetails1"]:checked').val() == "NO"){
    var invoiceDetails = false;
  }else {
    var invoiceDetails = null;
  }
  //  Get Roles values
  if( $('input[name="roleAdd1"]:checked').val() == "YES"){
    var roleAdd = true;
  }else if( $('input[name="roleAdd1"]:checked').val() == "NO"){
    var roleAdd = false;
  }else {
    var roleAdd = null;
  }
  if( $('input[name="roleUpdate1"]:checked').val() == "YES"){
    var roleUpdate = true;
  }else if( $('input[name="roleUpdate1"]:checked').val() == "NO"){
    var roleUpdate = false;
  }else {
    var roleUpdate = null;
  }
  if( $('input[name="roleDelete1"]:checked').val() == "YES"){
    var roleDelete = true;
  }else if( $('input[name="roleDelete1"]:checked').val() == "NO"){
    var roleDelete = false;
  }else {
    var roleDelete = null;
  }
  if( $('input[name="roleDisplay1"]:checked').val() == "YES"){
    var roleDisplay = true;
  }else if( $('input[name="roleDisplay1"]:checked').val() == "NO"){
    var roleDisplay = false;
  }else {
    var roleDisplay = null;
  }
  if( $('input[name="rolePrint1"]:checked').val() == "YES"){
    var rolePrint = true;
  }else if( $('input[name="rolePrint1"]:checked').val() == "NO"){
    var rolePrint = false;
  }else {
    var rolePrint = null;
  }
  if( $('input[name="roleAuthorize1"]:checked').val() == "YES"){
    var roleAuthorize = true;
  }else if( $('input[name="roleAuthorize1"]:checked').val() == "NO"){
    var roleAuthorize = false;
  }else {
    var roleAuthorize = null;
  }
  if( $('input[name="roleDetails1"]:checked').val() == "YES"){
    var roleDetails = true;
  }else if( $('input[name="roleDetails1"]:checked').val() == "NO"){
    var roleDetails = false;
  }else {
    var roleDetails = null;
  }
  //  Get Articles values
  if( $('input[name="articleAdd1"]:checked').val() == "YES"){
    var articleAdd = true;
  }else if( $('input[name="articleAdd1"]:checked').val() == "NO"){
    var articleAdd = false;
  }else {
    var articleAdd = null;
  }
  if( $('input[name="articleUpdate1"]:checked').val() == "YES"){
    var articleUpdate = true;
  }else if( $('input[name="articleUpdate1"]:checked').val() == "NO"){
    var articleUpdate = false;
  }else {
    var articleUpdate = null;
  }
  if( $('input[name="articleDelete1"]:checked').val() == "YES"){
    var articleDelete = true;
  }else if( $('input[name="articleDelete1"]:checked').val() == "NO"){
    var articleDelete = false;
  }else {
    var articleDelete = null;
  }
  if( $('input[name="articleDisplay1"]:checked').val() == "YES"){
    var articleDisplay = true;
  }else if( $('input[name="articleDisplay1"]:checked').val() == "NO"){
    var articleDisplay = false;
  }else {
    var articleDisplay = null;
  }
  if( $('input[name="articlePrint1"]:checked').val() == "YES"){
    var articlePrint = true;
  }else if( $('input[name="articlePrint1"]:checked').val() == "NO"){
    var articlePrint = false;
  }else {
    var articlePrint = null;
  }
  if( $('input[name="articleAuthorize1"]:checked').val() == "YES"){
    var articleAuthorize = true;
  }else if( $('input[name="articleAuthorize1"]:checked').val() == "NO"){
    var articleAuthorize = false;
  }else {
    var articleAuthorize = null;
  }
  if( $('input[name="articleDetails1"]:checked').val() == "YES"){
    var articleDetails = true;
  }else if( $('input[name="articleDetails1"]:checked').val() == "NO"){
    var articleDetails = false;
  }else {
    var articleDetails = null;
  }
  if( $('input[name="articleOptions1"]:checked').val() == "YES"){
    var articleOptions = true;
  }else if( $('input[name="articleOptions1"]:checked').val() == "NO"){
    var articleOptions = false;
  }else {
    var articleOptions = null;
  }
  //  Get Modules values
  if( $('input[name="moduleAdd1"]:checked').val() == "YES"){
    var moduleAdd = true;
  }else if( $('input[name="moduleAdd1"]:checked').val() == "NO"){
    var moduleAdd = false;
  }else {
    var moduleAdd = null;
  }
  if( $('input[name="moduleUpdate1"]:checked').val() == "YES"){
    var moduleUpdate = true;
  }else if( $('input[name="moduleUpdate1"]:checked').val() == "NO"){
    var moduleUpdate = false;
  }else {
    var moduleUpdate = null;
  }
  if( $('input[name="moduleDelete1"]:checked').val() == "YES"){
    var moduleDelete = true;
  }else if( $('input[name="moduleDelete1"]:checked').val() == "NO"){
    var moduleDelete = false;
  }else {
    var moduleDelete = null;
  }
  if( $('input[name="moduleDisplay1"]:checked').val() == "YES"){
    var moduleDisplay = true;
  }else if( $('input[name="moduleDisplay1"]:checked').val() == "NO"){
    var moduleDisplay = false;
  }else {
    var moduleDisplay = null;
  }
  if( $('input[name="modulePrint1"]:checked').val() == "YES"){
    var modulePrint = true;
  }else if( $('input[name="modulePrint1"]:checked').val() == "NO"){
    var modulePrint = false;
  }else {
    var modulePrint = null;
  }
  if( $('input[name="moduleAuthorize1"]:checked').val() == "YES"){
    var moduleAuthorize = true;
  }else if( $('input[name="moduleAuthorize1"]:checked').val() == "NO"){
    var moduleAuthorize = false;
  }else {
    var moduleAuthorize = null;
  }
  if( $('input[name="moduleDetails1"]:checked').val() == "YES"){
    var moduleDetails = true;
  }else if( $('input[name="moduleDetails1"]:checked').val() == "NO"){
    var moduleDetails = false;
  }else {
    var moduleDetails = null;
  }
  //  Get Currencies values
  if( $('input[name="currencyAdd1"]:checked').val() == "YES"){
    var currencyAdd = true;
  }else if( $('input[name="currencyAdd1"]:checked').val() == "NO"){
    var currencyAdd = false;
  }else {
    var currencyAdd = null;
  }
  if( $('input[name="currencyUpdate1"]:checked').val() == "YES"){
    var currencyUpdate = true;
  }else if( $('input[name="currencyUpdate1"]:checked').val() == "NO"){
    var currencyUpdate = false;
  }else {
    var currencyUpdate = null;
  }
  if( $('input[name="currencyDelete1"]:checked').val() == "YES"){
    var currencyDelete = true;
  }else if( $('input[name="currencyDelete1"]:checked').val() == "NO"){
    var currencyDelete = false;
  }else {
    var currencyDelete = null;
  }
  if( $('input[name="currencyDisplay1"]:checked').val() == "YES"){
    var currencyDisplay = true;
  }else if( $('input[name="currencyDisplay1"]:checked').val() == "NO"){
    var currencyDisplay = false;
  }else {
    var currencyDisplay = null;
  }
  if( $('input[name="currencyPrint1"]:checked').val() == "YES"){
    var currencyPrint = true;
  }else if( $('input[name="currencyPrint1"]:checked').val() == "NO"){
    var currencyPrint = false;
  }else {
    var currencyPrint = null;
  }
  if( $('input[name="currencyAuthorize1"]:checked').val() == "YES"){
    var currencyAuthorize = true;
  }else if( $('input[name="currencyAuthorize1"]:checked').val() == "NO"){
    var currencyAuthorize = false;
  }else {
    var currencyAuthorize = null;
  }
  if( $('input[name="currencyDetails1"]:checked').val() == "YES"){
    var currencyDetails = true;
  }else if( $('input[name="currencyDetails1"]:checked').val() == "NO"){
    var currencyDetails = false;
  }else {
    var currencyDetails = null;
  }
  //  Get Segments values
  if( $('input[name="segmentAdd1"]:checked').val() == "YES"){
    var segmentAdd = true;
  }else if( $('input[name="segmentAdd1"]:checked').val() == "NO"){
    var segmentAdd = false;
  }else {
    var segmentAdd = null;
  }
  if( $('input[name="segmentUpdate1"]:checked').val() == "YES"){
    var segmentUpdate = true;
  }else if( $('input[name="segmentUpdate1"]:checked').val() == "NO"){
    var segmentUpdate = false;
  }else {
    var segmentUpdate = null;
  }
  if( $('input[name="segmentDelete1"]:checked').val() == "YES"){
    var segmentDelete = true;
  }else if( $('input[name="segmentDelete1"]:checked').val() == "NO"){
    var segmentDelete = false;
  }else {
    var segmentDelete = null;
  }
  if( $('input[name="segmentDisplay1"]:checked').val() == "YES"){
    var segmentDisplay = true;
  }else if( $('input[name="segmentDisplay1"]:checked').val() == "NO"){
    var segmentDisplay = false;
  }else {
    var segmentDisplay = null;
  }
  if( $('input[name="segmentPrint1"]:checked').val() == "YES"){
    var segmentPrint = true;
  }else if( $('input[name="segmentPrint1"]:checked').val() == "NO"){
    var segmentPrint = false;
  }else {
    var segmentPrint = null;
  }
  if( $('input[name="segmentAuthorize1"]:checked').val() == "YES"){
    var segmentAuthorize = true;
  }else if( $('input[name="segmentAuthorize1"]:checked').val() == "NO"){
    var segmentAuthorize = false;
  }else {
    var segmentAuthorize = null;
  }
  if( $('input[name="segmentDetails1"]:checked').val() == "YES"){
    var segmentDetails = true;
  }else if( $('input[name="segmentDetails1"]:checked').val() == "NO"){
    var segmentDetails = false;
  }else {
    var segmentDetails = null;
  }
  //  Get Plannings values
  if( $('input[name="planningAdd1"]:checked').val() == "YES"){
    var planningAdd = true;
  }else if( $('input[name="planningAdd1"]:checked').val() == "NO"){
    var planningAdd = false;
  }else {
    var planningAdd = null;
  }
  if( $('input[name="planningDisplay1"]:checked').val() == "YES"){
    var planningDisplay = true;
  }else if( $('input[name="planningDisplay1"]:checked').val() == "NO"){
    var planningDisplay = false;
  }else {
    var planningDisplay = null;
  }
  if( $('input[name="planningPrint1"]:checked').val() == "YES"){
    var planningPrint = true;
  }else if( $('input[name="planningPrint1"]:checked').val() == "NO"){
    var planningPrint = false;
  }else {
    var planningPrint = null;
  }
  if( $('input[name="planningAuthorize1"]:checked').val() == "YES"){
    var planningAuthorize = true;
  }else if( $('input[name="planningAuthorize1"]:checked').val() == "NO"){
    var planningAuthorize = false;
  }else {
    var planningAuthorize = null;
  }
  if( $('input[name="planningDetails1"]:checked').val() == "YES"){
    var planningDetails = true;
  }else if( $('input[name="planningDetails1"]:checked').val() == "NO"){
    var planningDetails = false;
  }else {
    var planningDetails = null;
  }
  //  Get Bookings values
  if( $('input[name="bookingAdd1"]:checked').val() == "YES"){
    var bookingAdd = true;
  }else if( $('input[name="bookingAdd1"]:checked').val() == "NO"){
    var bookingAdd = false;
  }else {
    var bookingAdd = null;
  }
  if( $('input[name="bookingUpdate1"]:checked').val() == "YES"){
    var bookingUpdate = true;
  }else if( $('input[name="bookingUpdate1"]:checked').val() == "NO"){
    var bookingUpdate = false;
  }else {
    var bookingUpdate = null;
  }
  if( $('input[name="bookingDelete1"]:checked').val() == "YES"){
    var bookingDelete = true;
  }else if( $('input[name="bookingDelete1"]:checked').val() == "NO"){
    var bookingDelete = false;
  }else {
    var bookingDelete = null;
  }
  if( $('input[name="bookingDisplay1"]:checked').val() == "YES"){
    var bookingDisplay = true;
  }else if( $('input[name="bookingDisplay1"]:checked').val() == "NO"){
    var bookingDisplay = false;
  }else {
    var bookingDisplay = null;
  }
  if( $('input[name="bookingPrint1"]:checked').val() == "YES"){
    var bookingPrint = true;
  }else if( $('input[name="bookingPrint1"]:checked').val() == "NO"){
    var bookingPrint = false;
  }else {
    var bookingPrint = null;
  }
  if( $('input[name="bookingAuthorize1"]:checked').val() == "YES"){
    var bookingAuthorize = true;
  }else if( $('input[name="bookingAuthorize1"]:checked').val() == "NO"){
    var bookingAuthorize = false;
  }else {
    var bookingAuthorize = null;
  }
  if( $('input[name="bookingDetails1"]:checked').val() == "YES"){
    var bookingDetails = true;
  }else if( $('input[name="bookingDetails1"]:checked').val() == "NO"){
    var bookingDetails = false;
  }else {
    var bookingDetails = null;
  }
  //  Get Contents values
  if( $('input[name="contentAdd1"]:checked').val() == "YES"){
    var contentAdd = true;
  }else if( $('input[name="contentAdd1"]:checked').val() == "NO"){
    var contentAdd = false;
  }else {
    var contentAdd = null;
  }
  if( $('input[name="contentDelete1"]:checked').val() == "YES"){
    var contentDelete = true;
  }else if( $('input[name="contentDelete1"]:checked').val() == "NO"){
    var contentDelete = false;
  }else {
    var contentDelete = null;
  }
  if( $('input[name="contentDisplay1"]:checked').val() == "YES"){
    var contentDisplay = true;
  }else if( $('input[name="contentDisplay1"]:checked').val() == "NO"){
    var contentDisplay = false;
  }else {
    var contentDisplay = null;
  }
  if( $('input[name="contentPrint1"]:checked').val() == "YES"){
    var contentPrint = true;
  }else if( $('input[name="contentPrint1"]:checked').val() == "NO"){
    var contentPrint = false;
  }else {
    var contentPrint = null;
  }
  if( $('input[name="contentAuthorize1"]:checked').val() == "YES"){
    var contentAuthorize = true;
  }else if( $('input[name="contentAuthorize1"]:checked').val() == "NO"){
    var contentAuthorize = false;
  }else {
    var contentAuthorize = null;
  }
  if( $('input[name="contentDetails1"]:checked').val() == "YES"){
    var contentDetails = true;
  }else if( $('input[name="contentDetails1"]:checked').val() == "NO"){
    var contentDetails = false;
  }else {
    var contentDetails = null;
  }
  //  Get Firmwares values
  if( $('input[name="firmwareAdd1"]:checked').val() == "YES"){
    var firmwareAdd = true;
  }else if( $('input[name="firmwareAdd1"]:checked').val() == "NO"){
    var firmwareAdd = false;
  }else {
    var firmwareAdd = null;
  }
  if( $('input[name="firmwareUpdate1"]:checked').val() == "YES"){
    var firmwareUpdate = true;
  }else if( $('input[name="firmwareUpdate1"]:checked').val() == "NO"){
    var firmwareUpdate = false;
  }else {
    var firmwareUpdate = null;
  }
  if( $('input[name="firmwareDelete1"]:checked').val() == "YES"){
    var firmwareDelete = true;
  }else if( $('input[name="firmwareDelete1"]:checked').val() == "NO"){
    var firmwareDelete = false;
  }else {
    var firmwareDelete = null;
  }
  if( $('input[name="firmwareDisplay1"]:checked').val() == "YES"){
    var firmwareDisplay = true;
  }else if( $('input[name="firmwareDisplay1"]:checked').val() == "NO"){
    var firmwareDisplay = false;
  }else {
    var firmwareDisplay = null;
  }
  if( $('input[name="firmwarePrint1"]:checked').val() == "YES"){
    var firmwarePrint = true;
  }else if( $('input[name="firmwarePrint1"]:checked').val() == "NO"){
    var firmwarePrint = false;
  }else {
    var firmwarePrint = null;
  }
  if( $('input[name="firmwareAuthorize1"]:checked').val() == "YES"){
    var firmwareAuthorize = true;
  }else if( $('input[name="firmwareAuthorize1"]:checked').val() == "NO"){
    var firmwareAuthorize = false;
  }else {
    var firmwareAuthorize = null;
  }
  if( $('input[name="firmwareDetails1"]:checked').val() == "YES"){
    var firmwareDetails = true;
  }else if( $('input[name="firmwareDetails1"]:checked').val() == "NO"){
    var firmwareDetails = false;
  }else {
    var firmwareDetails = null;
  }
  //  Get Signatures values
  if( $('input[name="signatureAdd1"]:checked').val() == "YES"){
    var signatureAdd = true;
  }else if( $('input[name="signatureAdd1"]:checked').val() == "NO"){
    var signatureAdd = false;
  }else {
    var signatureAdd = null;
  }
  if( $('input[name="signatureDelete1"]:checked').val() == "YES"){
    var signatureDelete = true;
  }else if( $('input[name="signatureDelete1"]:checked').val() == "NO"){
    var signatureDelete = false;
  }else {
    var signatureDelete = null;
  }
  if( $('input[name="signatureDisplay1"]:checked').val() == "YES"){
    var signatureDisplay = true;
  }else if( $('input[name="signatureDisplay1"]:checked').val() == "NO"){
    var signatureDisplay = false;
  }else {
    var signatureDisplay = null;
  }
  if( $('input[name="signaturePrint1"]:checked').val() == "YES"){
    var signaturePrint = true;
  }else if( $('input[name="signaturePrint1"]:checked').val() == "NO"){
    var signaturePrint = false;
  }else {
    var signaturePrint = null;
  }
  //  Get Tariffs values
  if( $('input[name="tariffAdd1"]:checked').val() == "YES"){
    var tariffAdd = true;
  }else if( $('input[name="tariffAdd1"]:checked').val() == "NO"){
    var tariffAdd = false;
  }else {
    var tariffAdd = null;
  }
  if( $('input[name="tariffUpdate1"]:checked').val() == "YES"){
    var tariffUpdate = true;
  }else if( $('input[name="tariffUpdate1"]:checked').val() == "NO"){
    var tariffUpdate = false;
  }else {
    var tariffUpdate = null;
  }
  if( $('input[name="tariffDelete1"]:checked').val() == "YES"){
    var tariffDelete = true;
  }else if( $('input[name="tariffDelete1"]:checked').val() == "NO"){
    var tariffDelete = false;
  }else {
    var tariffDelete = null;
  }
  if( $('input[name="tariffDisplay1"]:checked').val() == "YES"){
    var tariffDisplay = true;
  }else if( $('input[name="tariffDisplay1"]:checked').val() == "NO"){
    var tariffDisplay = false;
  }else {
    var tariffDisplay = null;
  }
  if( $('input[name="tariffPrint1"]:checked').val() == "YES"){
    var tariffPrint = true;
  }else if( $('input[name="tariffPrint1"]:checked').val() == "NO"){
    var tariffPrint = false;
  }else {
    var tariffPrint = null;
  }
  if( $('input[name="tariffAuthorize1"]:checked').val() == "YES"){
    var tariffAuthorize = true;
  }else if( $('input[name="tariffAuthorize1"]:checked').val() == "NO"){
    var tariffAuthorize = false;
  }else {
    var tariffAuthorize = null;
  }
  if( $('input[name="tariffDetails1"]:checked').val() == "YES"){
    var tariffDetails = true;
  }else if( $('input[name="tariffDetails1"]:checked').val() == "NO"){
    var tariffDetails = false;
  }else {
    var tariffDetails = null;
  }
  //  Get Clients values
  if( $('input[name="clientAdd1"]:checked').val() == "YES"){
    var clientAdd = true;
  }else if( $('input[name="clientAdd1"]:checked').val() == "NO"){
    var clientAdd = false;
  }else {
    var clientAdd = null;
  }
  if( $('input[name="clientUpdate1"]:checked').val() == "YES"){
    var clientUpdate = true;
  }else if( $('input[name="clientUpdate1"]:checked').val() == "NO"){
    var clientUpdate = false;
  }else {
    var clientUpdate = null;
  }
  if( $('input[name="clientDelete1"]:checked').val() == "YES"){
    var clientDelete = true;
  }else if( $('input[name="clientDelete1"]:checked').val() == "NO"){
    var clientDelete = false;
  }else {
    var clientDelete = null;
  }
  if( $('input[name="clientDisplay1"]:checked').val() == "YES"){
    var clientDisplay = true;
  }else if( $('input[name="clientDisplay1"]:checked').val() == "NO"){
    var clientDisplay = false;
  }else {
    var clientDisplay = null;
  }
  if( $('input[name="clientPrint1"]:checked').val() == "YES"){
    var clientPrint = true;
  }else if( $('input[name="clientPrint1"]:checked').val() == "NO"){
    var clientPrint = false;
  }else {
    var clientPrint = null;
  }
  if( $('input[name="clientAuthorize1"]:checked').val() == "YES"){
    var clientAuthorize = true;
  }else if( $('input[name="clientAuthorize1"]:checked').val() == "NO"){
    var clientAuthorize = false;
  }else {
    var clientAuthorize = null;
  }
  if( $('input[name="clientDetails1"]:checked').val() == "YES"){
    var clientDetails = true;
  }else if( $('input[name="clientDetails1"]:checked').val() == "NO"){
    var clientDetails = false;
  }else {
    var clientDetails = null;
  }
  if( $('input[name="clientInvoices1"]:checked').val() == "YES"){
    var clientInvoices = true;
  }else if( $('input[name="clientInvoices1"]:checked').val() == "NO"){
    var clientInvoices = false;
  }else {
    var clientInvoices = null;
  }
  if( $('input[name="clientRoles1"]:checked').val() == "YES"){
    var clientRoles = true;
  }else if( $('input[name="clientRoles1"]:checked').val() == "NO"){
    var clientRoles = false;
  }else {
    var clientRoles = null;
  }
  if( $('input[name="clientUsers1"]:checked').val() == "YES"){
    var clientUsers = true;
  }else if( $('input[name="clientUsers1"]:checked').val() == "NO"){
    var clientUsers = false;
  }else {
    var clientUsers = null;
  }
  if( $('input[name="clientBookings1"]:checked').val() == "YES"){
    var clientBookings = true;
  }else if( $('input[name="clientBookings1"]:checked').val() == "NO"){
    var clientBookings = false;
  }else {
    var clientBookings = null;
  }
  if( $('input[name="clientContracts1"]:checked').val() == "YES"){
    var clientContracts = true;
  }else if( $('input[name="clientContracts1"]:checked').val() == "NO"){
    var clientContracts = false;
  }else {
    var clientContracts = null;
  }
  if( $('input[name="clientContents1"]:checked').val() == "YES"){
    var clientContents = true;
  }else if( $('input[name="clientContents1"]:checked').val() == "NO"){
    var clientContents = false;
  }else {
    var clientContents = null;
  }
  //  Get Companies values
  if( $('input[name="companyAdd1"]:checked').val() == "YES"){
    var companyAdd = true;
  }else if( $('input[name="companyAdd1"]:checked').val() == "NO"){
    var companyAdd = false;
  }else {
    var companyAdd = null;
  }
  if( $('input[name="companyUpdate1"]:checked').val() == "YES"){
    var companyUpdate = true;
  }else if( $('input[name="companyUpdate1"]:checked').val() == "NO"){
    var companyUpdate = false;
  }else {
    var companyUpdate = null;
  }
  if( $('input[name="companyDelete1"]:checked').val() == "YES"){
    var companyDelete = true;
  }else if( $('input[name="companyDelete1"]:checked').val() == "NO"){
    var companyDelete = false;
  }else {
    var companyDelete = null;
  }
  if( $('input[name="companyDisplay1"]:checked').val() == "YES"){
    var companyDisplay = true;
  }else if( $('input[name="companyDisplay1"]:checked').val() == "NO"){
    var companyDisplay = false;
  }else {
    var companyDisplay = null;
  }
  if( $('input[name="companyPrint1"]:checked').val() == "YES"){
    var companyPrint = true;
  }else if( $('input[name="companyPrint1"]:checked').val() == "NO"){
    var companyPrint = false;
  }else {
    var companyPrint = null;
  }
  if( $('input[name="companyAuthorize1"]:checked').val() == "YES"){
    var companyAuthorize = true;
  }else if( $('input[name="companyAuthorize1"]:checked').val() == "NO"){
    var companyAuthorize = false;
  }else {
    var companyAuthorize = null;
  }
  if( $('input[name="companyDetails1"]:checked').val() == "YES"){
    var companyDetails = true;
  }else if( $('input[name="companyDetails1"]:checked').val() == "NO"){
    var companyDetails = false;
  }else {
    var companyDetails = null;
  }
  if( $('input[name="companyInvoices1"]:checked').val() == "YES"){
    var companyInvoices = true;
  }else if( $('input[name="companyInvoices1"]:checked').val() == "NO"){
    var companyInvoices = false;
  }else {
    var companyInvoices = null;
  }
  if( $('input[name="companyRoles1"]:checked').val() == "YES"){
    var companyRoles = true;
  }else if( $('input[name="companyRoles1"]:checked').val() == "NO"){
    var companyRoles = false;
  }else {
    var companyRoles = null;
  }
  if( $('input[name="companyUsers1"]:checked').val() == "YES"){
    var companyUsers = true;
  }else if( $('input[name="companyUsers1"]:checked').val() == "NO"){
    var companyUsers = false;
  }else {
    var companyUsers = null;
  }
  if( $('input[name="companySegments1"]:checked').val() == "YES"){
    var companySegments = true;
  }else if( $('input[name="companySegments1"]:checked').val() == "NO"){
    var companySegments = false;
  }else {
    var companySegments = null;
  }
  if( $('input[name="companyContracts1"]:checked').val() == "YES"){
    var companyContracts = true;
  }else if( $('input[name="companyContracts1"]:checked').val() == "NO"){
    var companyContracts = false;
  }else {
    var companyContracts = null;
  }
  if( $('input[name="companyScreens1"]:checked').val() == "YES"){
    var companyScreens = true;
  }else if( $('input[name="companyScreens1"]:checked').val() == "NO"){
    var companyScreens = false;
  }else {
    var companyScreens = null;
  }
  if( $('input[name="companyCurrencies1"]:checked').val() == "YES"){
    var companyCurrencies = true;
  }else if( $('input[name="companyCurrencies1"]:checked').val() == "NO"){
    var companyCurrencies = false;
  }else {
    var companyCurrencies = null;
  }
  if( $('input[name="companyClients1"]:checked').val() == "YES"){
    var companyClients = true;
  }else if( $('input[name="companyClients1"]:checked').val() == "NO"){
    var companyClients = false;
  }else {
    var companyClients = null;
  }
  if( $('input[name="companyBookings1"]:checked').val() == "YES"){
    var companyBookings = true;
  }else if( $('input[name="companyBookings1"]:checked').val() == "NO"){
    var companyBookings = false;
  }else {
    var companyBookings = null;
  }
  if( $('input[name="companyContents1"]:checked').val() == "YES"){
    var companyContents = true;
  }else if( $('input[name="companyContents1"]:checked').val() == "NO"){
    var companyContents = false;
  }else {
    var companyContents = null;
  }
  if( $('input[name="companyTariffs1"]:checked').val() == "YES"){
    var companyTariffs = true;
  }else if( $('input[name="companyTariffs1"]:checked').val() == "NO"){
    var companyTariffs = false;
  }else {
    var companyTariffs = null;
  }
  if( $('input[name="companyFirmwares1"]:checked').val() == "YES"){
    var companyFirmwares = true;
  }else if( $('input[name="companyFirmwares1"]:checked').val() == "NO"){
    var companyFirmwares = false;
  }else {
    var companyFirmwares = null;
  }
  if( $('input[name="companyArticles1"]:checked').val() == "YES"){
    var companyArticles = true;
  }else if( $('input[name="companyArticles1"]:checked').val() == "NO"){
    var companyArticles = false;
  }else {
    var companyArticles = null;
  }
  //  Get Screens values
  if( $('input[name="screenAdd1"]:checked').val() == "YES"){
    var screenAdd = true;
  }else if( $('input[name="screenAdd1"]:checked').val() == "NO"){
    var screenAdd = false;
  }else {
    var screenAdd = null;
  }
  if( $('input[name="screenUpdate1"]:checked').val() == "YES"){
    var screenUpdate = true;
  }else if( $('input[name="screenUpdate1"]:checked').val() == "NO"){
    var screenUpdate = false;
  }else {
    var screenUpdate = null;
  }
  if( $('input[name="screenDelete1"]:checked').val() == "YES"){
    var screenDelete = true;
  }else if( $('input[name="screenDelete1"]:checked').val() == "NO"){
    var screenDelete = false;
  }else {
    var screenDelete = null;
  }
  if( $('input[name="screenDisplay1"]:checked').val() == "YES"){
    var screenDisplay = true;
  }else if( $('input[name="screenDisplay1"]:checked').val() == "NO"){
    var screenDisplay = false;
  }else {
    var screenDisplay = null;
  }
  if( $('input[name="screenPrint1"]:checked').val() == "YES"){
    var screenPrint = true;
  }else if( $('input[name="screenPrint1"]:checked').val() == "NO"){
    var screenPrint = false;
  }else {
    var screenPrint = null;
  }
  if( $('input[name="screenAuthorize1"]:checked').val() == "YES"){
    var screenAuthorize = true;
  }else if( $('input[name="screenAuthorize1"]:checked').val() == "NO"){
    var screenAuthorize = false;
  }else {
    var screenAuthorize = null;
  }
  if( $('input[name="screenDetails1"]:checked').val() == "YES"){
    var screenDetails = true;
  }else if( $('input[name="screenDetails1"]:checked').val() == "NO"){
    var screenDetails = false;
  }else {
    var screenDetails = null;
  }
  if( $('input[name="screenShow1"]:checked').val() == "YES"){
    var screenShow = true;
  }else if( $('input[name="screenShow1"]:checked').val() == "NO"){
    var screenShow = false;
  }else {
    var screenShow = null;
  }
  if( $('input[name="screenSystem1"]:checked').val() == "YES"){
    var screenSystem = true;
  }else if( $('input[name="screenSystem1"]:checked').val() == "NO"){
    var screenSystem = false;
  }else {
    var screenSystem = null;
  }
  if( $('input[name="screenClear1"]:checked').val() == "YES"){
    var screenClear = true;
  }else if( $('input[name="screenClear1"]:checked').val() == "NO"){
    var screenClear = false;
  }else {
    var screenClear = null;
  }
  if( $('input[name="screenMonitor1"]:checked').val() == "YES"){
    var screenMonitor = true;
  }else if( $('input[name="screenMonitor1"]:checked').val() == "NO"){
    var screenMonitor = false;
  }else {
    var screenMonitor = null;
  }
  if( $('input[name="screenActivate1"]:checked').val() == "YES"){
    var screenActivate = true;
  }else if( $('input[name="screenActivate1"]:checked').val() == "NO"){
    var screenActivate = false;
  }else {
    var screenActivate = null;
  }
  if( $('input[name="screenOn/Off1"]:checked').val() == "YES"){
    var screenOnOff = true;
  }else if( $('input[name="screenOn/Off1"]:checked').val() == "NO"){
    var screenOnOff = false;
  }else {
    var screenOnOff = null;
  }
  var role =
    {
      'roleName': roleName,
      'currentNumber': 0,
      'status': "HLD",
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'code': Session.get("roleSelected").code,
      'codeCompany' : Session.get("roleSelected").codeCompany,
      'accountAdd': accountAdd,
      'accountUpdate': accountUpdate,
      'accountDelete': accountDelete,
      'accountDisplay': accountDisplay,
      'accountPrint': accountPrint,
      'accountAuthorize': accountAuthorize,
      'accountDetails': accountDetails,
      'contractAdd': contractAdd,
      'contractUpdate': contractUpdate,
      'contractDelete': contractDelete,
      'contractDisplay': contractDisplay,
      'contractPrint': contractPrint,
      'contractAuthorize': contractAuthorize,
      'contractDetails': contractDetails,
      'articleAdd': articleAdd,
      'articleUpdate': articleUpdate,
      'articleDelete': articleDelete,
      'articleDisplay': articleDisplay,
      'articlePrint': articlePrint,
      'articleAuthorize': articleAuthorize,
      'articleDetails': articleDetails,
      'articleOptions': articleOptions,
      'invoiceAdd': invoiceAdd,
      'invoiceUpdate': invoiceUpdate,
      'invoiceDelete': invoiceDelete,
      'invoiceDisplay': invoiceDisplay,
      'invoicePrint': invoicePrint,
      'invoiceAuthorize': invoiceAuthorize,
      'invoiceDetails': invoiceDetails,
      'clientAdd': clientAdd,
      'clientUpdate': clientUpdate,
      'clientDelete': clientDelete,
      'clientDisplay': clientDisplay,
      'clientPrint': clientPrint,
      'clientAuthorize': clientAuthorize,
      'clientDetails': clientDetails,
      'clientInvoices': clientInvoices,
      'clientRoles': clientRoles,
      'clientUsers': clientUsers,
      'clientBookings': clientBookings,
      'clientContracts': clientContracts,
      'clientContents': clientContents,
      'currencyAdd': currencyAdd,
      'currencyUpdate': currencyUpdate,
      'currencyDelete': currencyDelete,
      'currencyDisplay': currencyDisplay,
      'currencyPrint': currencyPrint,
      'currencyAuthorize': currencyAuthorize,
      'currencyDetails': currencyDetails,
      'moduleAdd': moduleAdd,
      'moduleUpdate': moduleUpdate,
      'moduleDisplay': moduleDisplay,
      'moduleDelete': moduleDelete,
      'modulePrint': modulePrint,
      'moduleAuthorize': moduleAuthorize,
      'moduleDetails': moduleDetails,
      'screenAdd': screenAdd,
      'screenUpdate': screenUpdate,
      'screenDelete': screenDelete,
      'screenDisplay': screenDisplay,
      'screenPrint': screenPrint,
      'screenAuthorize': screenAuthorize,
      'screenDetails': screenDetails,
      'screenShow': screenShow,
      'screenSystem': screenSystem,
      'screenClear': screenClear,
      'screenMonitor': screenMonitor,
      'screenActivate': screenActivate,
      'screenOnOff': screenOnOff,
      'segmentAdd': segmentAdd,
      'segmentUpdate': segmentUpdate,
      'segmentDelete': segmentDelete,
      'segmentDisplay': segmentDisplay,
      'segmentPrint': segmentPrint,
      'segmentAuthorize': segmentAuthorize,
      'segmentDetails': segmentDetails,
      'planningAdd': planningAdd,
      'planningDisplay': planningDisplay,
      'planningPrint': planningPrint,
      'planningAuthorize': planningAuthorize,
      'planningDetails': planningDetails,
      'tariffAdd': tariffAdd,
      'tariffUpdate': tariffUpdate,
      'tariffDelete': tariffDelete,
      'tariffDisplay': tariffDisplay,
      'tariffPrint': tariffPrint,
      'tariffAuthorize': bookingAuthorize,
      'tariffDetails': bookingDetails,
      'bookingAdd': bookingAdd,
      'bookingUpdate': bookingUpdate,
      'bookingDelete': bookingDelete,
      'bookingDisplay': bookingDisplay,
      'bookingPrint': bookingPrint,
      'bookingAuthorize': bookingAuthorize,
      'bookingDetails': bookingDetails,
      'contentAdd': contentAdd,
      'contentDelete': contentDelete,
      'contentDisplay': contentDisplay,
      'contentAuthorize': contentAuthorize,
      'contentDetails': contentDetails,
      'contentPrint': contentPrint,
      'roleAdd': roleAdd,
      'roleUpdate': roleUpdate,
      'roleDelete': roleDelete,
      'roleDisplay': roleDisplay,
      'rolePrint': rolePrint,
      'roleAuthorize': roleAuthorize,
      'roleDetails': roleDetails,
      'firmwareAdd': firmwareAdd,
      'firmwareUpdate': firmwareUpdate,
      'firmwareDelete': firmwareDelete,
      'firmwareDisplay': firmwareDisplay,
      'firmwarePrint': firmwarePrint,
      'firmwareAuthorize': firmwareAuthorize,
      'firmwareDetails': firmwareDetails,
      'signatureAdd': signatureAdd,
      'signatureDelete': signatureDelete,
      'signatureDisplay': signatureDisplay,
      'signaturePrint': signaturePrint,
      'tariffAdd': tariffAdd,
      'tariffUpdate': tariffUpdate,
      'tariffDelete': tariffDelete,
      'tariffDisplay': tariffDisplay,
      'tariffPrint': tariffPrint,
      'tariffAuthorize': tariffAuthorize,
      'tariffDetails': tariffDetails,
      'companyAdd': companyAdd,
      'companyUpdate': companyUpdate,
      'companyDelete': companyDelete,
      'companyDisplay': companyDisplay,
      'companyPrint': companyPrint,
      'companyAuthorize': companyAuthorize,
      'companyDetails': companyDetails,
      'companyInvoices': companyInvoices,
      'companyRoles': companyRoles,
      'companyUsers': companyUsers,
      'companySegments': companySegments,
      'companyContracts': companyContracts,
      'companyArticles': companyArticles,
      'companyScreens': companyScreens,
      'companyBookings': companyBookings,
      'companyContents': companyContents,
      'companyCurrencies': companyCurrencies,
      'companyClients': companyClients,
      'companyTariffs': companyTariffs,
      'companyFirmwares': companyFirmwares
    };
  return role;
}
function getValuesFromFormForEditAu(){
  if (document.getElementById('roleName2') != null) {
    var roleName = document.getElementById("roleName2").value;
  }else {
    var roleName = null;
  }
  //  GET Accounts VALUES
  if( $('input[name="accountAdd2"]:checked').val() == "YES"){
    var accountAdd = true;
  }else if( $('input[name="accountAdd2"]:checked').val() == "NO"){
    var accountAdd = false;
  }else {
    var accountAdd = null;
  }
  if( $('input[name="accountUpdate2"]:checked').val() == "YES"){
    var accountUpdate = true;
  }else if( $('input[name="accountUpdate2"]:checked').val() == "NO"){
    var accountUpdate = false;
  }else {
    var accountUpdate = null;
  }
  if( $('input[name="accountDelete2"]:checked').val() == "YES"){
    var accountDelete = true;
  }else if( $('input[name="accountDelete2"]:checked').val() == "NO"){
    var accountDelete = false;
  }else {
    var accountDelete = null;
  }
  if( $('input[name="accountDisplay2"]:checked').val() == "YES"){
    var accountDisplay = true;
  }else if( $('input[name="accountDisplay2"]:checked').val() == "NO"){
    var accountDisplay = false;
  }else {
    var accountDisplay = null;
  }
  if( $('input[name="accountPrint2"]:checked').val() == "YES"){
    var accountPrint = true;
  }else if( $('input[name="accountPrint2"]:checked').val() == "NO"){
    var accountPrint = false;
  }else {
    var accountPrint = null;
  }
  if( $('input[name="accountAuthorize2"]:checked').val() == "YES"){
    var accountAuthorize = true;
  }else if( $('input[name="accountAuthorize2"]:checked').val() == "NO"){
    var accountAuthorize = false;
  }else {
    var accountAuthorize = null;
  }
  if( $('input[name="accountDetails2"]:checked').val() == "YES"){
    var accountDetails = true;
  }else if( $('input[name="accountDetails2"]:checked').val() == "NO"){
    var accountDetails = false;
  }else {
    var accountDetails = null;
  }
  //  Get Contracts values
  if( $('input[name="contractAdd2"]:checked').val() == "YES"){
    var contractAdd = true;
  }else if( $('input[name="contractAdd2"]:checked').val() == "NO"){
    var contractAdd = false;
  }else {
    var contractAdd = null;
  }
  if( $('input[name="contractUpdate2"]:checked').val() == "YES"){
    var contractUpdate = true;
  }else if( $('input[name="contractUpdate2"]:checked').val() == "NO"){
    var contractUpdate = false;
  }else {
    var contractUpdate = null;
  }
  if( $('input[name="contractDelete2"]:checked').val() == "YES"){
    var contractDelete = true;
  }else if( $('input[name="contractDelete2"]:checked').val() == "NO"){
    var contractDelete = false;
  }else {
    var contractDelete = null;
  }
  if( $('input[name="contractDisplay2"]:checked').val() == "YES"){
    var contractDisplay = true;
  }else if( $('input[name="contractDisplay2"]:checked').val() == "NO"){
    var contractDisplay = false;
  }else {
    var contractDisplay = null;
  }
  if( $('input[name="contractPrint2"]:checked').val() == "YES"){
    var contractPrint = true;
  }else if( $('input[name="contractPrint2"]:checked').val() == "NO"){
    var contractPrint = false;
  }else {
    var contractPrint = null;
  }
  if( $('input[name="contractAuthorize2"]:checked').val() == "YES"){
    var contractAuthorize = true;
  }else if( $('input[name="contractAuthorize2"]:checked').val() == "NO"){
    var contractAuthorize = false;
  }else {
    var contractAuthorize = null;
  }
  if( $('input[name="contractDetails2"]:checked').val() == "YES"){
    var contractDetails = true;
  }else if( $('input[name="contractDetails2"]:checked').val() == "NO"){
    var contractDetails = false;
  }else {
    var contractDetails = null;
  }
  //  Get Invoices values
  if( $('input[name="invoiceAdd2"]:checked').val() == "YES"){
    var invoiceAdd = true;
  }else if( $('input[name="invoiceAdd2"]:checked').val() == "NO"){
    var invoiceAdd = false;
  }else {
    var invoiceAdd = null;
  }
  if( $('input[name="invoiceUpdate2"]:checked').val() == "YES"){
    var invoiceUpdate = true;
  }else if( $('input[name="invoiceUpdate2"]:checked').val() == "NO"){
    var invoiceUpdate = false;
  }else {
    var invoiceUpdate = null;
  }
  if( $('input[name="invoiceDelete2"]:checked').val() == "YES"){
    var invoiceDelete = true;
  }else if( $('input[name="invoiceDelete2"]:checked').val() == "NO"){
    var invoiceDelete = false;
  }else {
    var invoiceDelete = null;
  }
  if( $('input[name="invoiceDisplay2"]:checked').val() == "YES"){
    var invoiceDisplay = true;
  }else if( $('input[name="invoiceDisplay2"]:checked').val() == "NO"){
    var invoiceDisplay = false;
  }else {
    var invoiceDisplay = null;
  }
  if( $('input[name="invoicePrint2"]:checked').val() == "YES"){
    var invoicePrint = true;
  }else if( $('input[name="invoicePrint2"]:checked').val() == "NO"){
    var invoicePrint = false;
  }else {
    var invoicePrint = null;
  }
  if( $('input[name="invoiceAuthorize2"]:checked').val() == "YES"){
    var invoiceAuthorize = true;
  }else if( $('input[name="invoiceAuthorize2"]:checked').val() == "NO"){
    var invoiceAuthorize = false;
  }else {
    var invoiceAuthorize = null;
  }
  if( $('input[name="invoiceDetails2"]:checked').val() == "YES"){
    var invoiceDetails = true;
  }else if( $('input[name="invoiceDetails2"]:checked').val() == "NO"){
    var invoiceDetails = false;
  }else {
    var invoiceDetails = null;
  }
  //  Get Roles values
  if( $('input[name="roleAdd2"]:checked').val() == "YES"){
    var roleAdd = true;
  }else if( $('input[name="roleAdd2"]:checked').val() == "NO"){
    var roleAdd = false;
  }else {
    var roleAdd = null;
  }
  if( $('input[name="roleUpdate2"]:checked').val() == "YES"){
    var roleUpdate = true;
  }else if( $('input[name="roleUpdate2"]:checked').val() == "NO"){
    var roleUpdate = false;
  }else {
    var roleUpdate = null;
  }
  if( $('input[name="roleDelete2"]:checked').val() == "YES"){
    var roleDelete = true;
  }else if( $('input[name="roleDelete2"]:checked').val() == "NO"){
    var roleDelete = false;
  }else {
    var roleDelete = null;
  }
  if( $('input[name="roleDisplay2"]:checked').val() == "YES"){
    var roleDisplay = true;
  }else if( $('input[name="roleDisplay2"]:checked').val() == "NO"){
    var roleDisplay = false;
  }else {
    var roleDisplay = null;
  }
  if( $('input[name="rolePrint2"]:checked').val() == "YES"){
    var rolePrint = true;
  }else if( $('input[name="rolePrint2"]:checked').val() == "NO"){
    var rolePrint = false;
  }else {
    var rolePrint = null;
  }
  if( $('input[name="roleAuthorize2"]:checked').val() == "YES"){
    var roleAuthorize = true;
  }else if( $('input[name="roleAuthorize2"]:checked').val() == "NO"){
    var roleAuthorize = false;
  }else {
    var roleAuthorize = null;
  }
  if( $('input[name="roleDetails2"]:checked').val() == "YES"){
    var roleDetails = true;
  }else if( $('input[name="roleDetails2"]:checked').val() == "NO"){
    var roleDetails = false;
  }else {
    var roleDetails = null;
  }
  //  Get Articles values
  if( $('input[name="articleAdd2"]:checked').val() == "YES"){
    var articleAdd = true;
  }else if( $('input[name="articleAdd2"]:checked').val() == "NO"){
    var articleAdd = false;
  }else {
    var articleAdd = null;
  }
  if( $('input[name="articleUpdate2"]:checked').val() == "YES"){
    var articleUpdate = true;
  }else if( $('input[name="articleUpdate2"]:checked').val() == "NO"){
    var articleUpdate = false;
  }else {
    var articleUpdate = null;
  }
  if( $('input[name="articleDelete2"]:checked').val() == "YES"){
    var articleDelete = true;
  }else if( $('input[name="articleDelete2"]:checked').val() == "NO"){
    var articleDelete = false;
  }else {
    var articleDelete = null;
  }
  if( $('input[name="articleDisplay2"]:checked').val() == "YES"){
    var articleDisplay = true;
  }else if( $('input[name="articleDisplay2"]:checked').val() == "NO"){
    var articleDisplay = false;
  }else {
    var articleDisplay = null;
  }
  if( $('input[name="articlePrint2"]:checked').val() == "YES"){
    var articlePrint = true;
  }else if( $('input[name="articlePrint2"]:checked').val() == "NO"){
    var articlePrint = false;
  }else {
    var articlePrint = null;
  }
  if( $('input[name="articleAuthorize2"]:checked').val() == "YES"){
    var articleAuthorize = true;
  }else if( $('input[name="articleAuthorize2"]:checked').val() == "NO"){
    var articleAuthorize = false;
  }else {
    var articleAuthorize = null;
  }
  if( $('input[name="articleDetails2"]:checked').val() == "YES"){
    var articleDetails = true;
  }else if( $('input[name="articleDetails2"]:checked').val() == "NO"){
    var articleDetails = false;
  }else {
    var articleDetails = null;
  }
  if( $('input[name="articleOptions2"]:checked').val() == "YES"){
    var articleOptions = true;
  }else if( $('input[name="articleOptions2"]:checked').val() == "NO"){
    var articleOptions = false;
  }else {
    var articleOptions = null;
  }
  //  Get Modules values
  if( $('input[name="moduleAdd2"]:checked').val() == "YES"){
    var moduleAdd = true;
  }else if( $('input[name="moduleAdd2"]:checked').val() == "NO"){
    var moduleAdd = false;
  }else {
    var moduleAdd = null;
  }
  if( $('input[name="moduleUpdate2"]:checked').val() == "YES"){
    var moduleUpdate = true;
  }else if( $('input[name="moduleUpdate2"]:checked').val() == "NO"){
    var moduleUpdate = false;
  }else {
    var moduleUpdate = null;
  }
  if( $('input[name="moduleDelete2"]:checked').val() == "YES"){
    var moduleDelete = true;
  }else if( $('input[name="moduleDelete2"]:checked').val() == "NO"){
    var moduleDelete = false;
  }else {
    var moduleDelete = null;
  }
  if( $('input[name="moduleDisplay2"]:checked').val() == "YES"){
    var moduleDisplay = true;
  }else if( $('input[name="moduleDisplay2"]:checked').val() == "NO"){
    var moduleDisplay = false;
  }else {
    var moduleDisplay = null;
  }
  if( $('input[name="modulePrint2"]:checked').val() == "YES"){
    var modulePrint = true;
  }else if( $('input[name="modulePrint2"]:checked').val() == "NO"){
    var modulePrint = false;
  }else {
    var modulePrint = null;
  }
  if( $('input[name="moduleAuthorize2"]:checked').val() == "YES"){
    var moduleAuthorize = true;
  }else if( $('input[name="moduleAuthorize2"]:checked').val() == "NO"){
    var moduleAuthorize = false;
  }else {
    var moduleAuthorize = null;
  }
  if( $('input[name="moduleDetails2"]:checked').val() == "YES"){
    var moduleDetails = true;
  }else if( $('input[name="moduleDetails2"]:checked').val() == "NO"){
    var moduleDetails = false;
  }else {
    var moduleDetails = null;
  }
  //  Get Currencies values
  if( $('input[name="currencyAdd2"]:checked').val() == "YES"){
    var currencyAdd = true;
  }else if( $('input[name="currencyAdd2"]:checked').val() == "NO"){
    var currencyAdd = false;
  }else {
    var currencyAdd = null;
  }
  if( $('input[name="currencyUpdate2"]:checked').val() == "YES"){
    var currencyUpdate = true;
  }else if( $('input[name="currencyUpdate2"]:checked').val() == "NO"){
    var currencyUpdate = false;
  }else {
    var currencyUpdate = null;
  }
  if( $('input[name="currencyDelete2"]:checked').val() == "YES"){
    var currencyDelete = true;
  }else if( $('input[name="currencyDelete2"]:checked').val() == "NO"){
    var currencyDelete = false;
  }else {
    var currencyDelete = null;
  }
  if( $('input[name="currencyDisplay2"]:checked').val() == "YES"){
    var currencyDisplay = true;
  }else if( $('input[name="currencyDisplay2"]:checked').val() == "NO"){
    var currencyDisplay = false;
  }else {
    var currencyDisplay = null;
  }
  if( $('input[name="currencyPrint2"]:checked').val() == "YES"){
    var currencyPrint = true;
  }else if( $('input[name="currencyPrint2"]:checked').val() == "NO"){
    var currencyPrint = false;
  }else {
    var currencyPrint = null;
  }
  if( $('input[name="currencyAuthorize2"]:checked').val() == "YES"){
    var currencyAuthorize = true;
  }else if( $('input[name="currencyAuthorize2"]:checked').val() == "NO"){
    var currencyAuthorize = false;
  }else {
    var currencyAuthorize = null;
  }
  if( $('input[name="currencyDetails2"]:checked').val() == "YES"){
    var currencyDetails = true;
  }else if( $('input[name="currencyDetails2"]:checked').val() == "NO"){
    var currencyDetails = false;
  }else {
    var currencyDetails = null;
  }
  //  Get Segments values
  if( $('input[name="segmentAdd2"]:checked').val() == "YES"){
    var segmentAdd = true;
  }else if( $('input[name="segmentAdd2"]:checked').val() == "NO"){
    var segmentAdd = false;
  }else {
    var segmentAdd = null;
  }
  if( $('input[name="segmentUpdate2"]:checked').val() == "YES"){
    var segmentUpdate = true;
  }else if( $('input[name="segmentUpdate2"]:checked').val() == "NO"){
    var segmentUpdate = false;
  }else {
    var segmentUpdate = null;
  }
  if( $('input[name="segmentDelete2"]:checked').val() == "YES"){
    var segmentDelete = true;
  }else if( $('input[name="segmentDelete2"]:checked').val() == "NO"){
    var segmentDelete = false;
  }else {
    var segmentDelete = null;
  }
  if( $('input[name="segmentDisplay2"]:checked').val() == "YES"){
    var segmentDisplay = true;
  }else if( $('input[name="segmentDisplay2"]:checked').val() == "NO"){
    var segmentDisplay = false;
  }else {
    var segmentDisplay = null;
  }
  if( $('input[name="segmentPrint2"]:checked').val() == "YES"){
    var segmentPrint = true;
  }else if( $('input[name="segmentPrint2"]:checked').val() == "NO"){
    var segmentPrint = false;
  }else {
    var segmentPrint = null;
  }
  if( $('input[name="segmentAuthorize2"]:checked').val() == "YES"){
    var segmentAuthorize = true;
  }else if( $('input[name="segmentAuthorize2"]:checked').val() == "NO"){
    var segmentAuthorize = false;
  }else {
    var segmentAuthorize = null;
  }
  if( $('input[name="segmentDetails2"]:checked').val() == "YES"){
    var segmentDetails = true;
  }else if( $('input[name="segmentDetails2"]:checked').val() == "NO"){
    var segmentDetails = false;
  }else {
    var segmentDetails = null;
  }
  //  Get Plannings values
  if( $('input[name="planningAdd2"]:checked').val() == "YES"){
    var planningAdd = true;
  }else if( $('input[name="planningAdd2"]:checked').val() == "NO"){
    var planningAdd = false;
  }else {
    var planningAdd = null;
  }
  if( $('input[name="planningDisplay2"]:checked').val() == "YES"){
    var planningDisplay = true;
  }else if( $('input[name="planningDisplay2"]:checked').val() == "NO"){
    var planningDisplay = false;
  }else {
    var planningDisplay = null;
  }
  if( $('input[name="planningPrint2"]:checked').val() == "YES"){
    var planningPrint = true;
  }else if( $('input[name="planningPrint2"]:checked').val() == "NO"){
    var planningPrint = false;
  }else {
    var planningPrint = null;
  }
  if( $('input[name="planningAuthorize2"]:checked').val() == "YES"){
    var planningAuthorize = true;
  }else if( $('input[name="planningAuthorize2"]:checked').val() == "NO"){
    var planningAuthorize = false;
  }else {
    var planningAuthorize = null;
  }
  if( $('input[name="planningDetails2"]:checked').val() == "YES"){
    var planningDetails = true;
  }else if( $('input[name="planningDetails2"]:checked').val() == "NO"){
    var planningDetails = false;
  }else {
    var planningDetails = null;
  }
  //  Get Bookings values
  if( $('input[name="bookingAdd2"]:checked').val() == "YES"){
    var bookingAdd = true;
  }else if( $('input[name="bookingAdd2"]:checked').val() == "NO"){
    var bookingAdd = false;
  }else {
    var bookingAdd = null;
  }
  if( $('input[name="bookingUpdate2"]:checked').val() == "YES"){
    var bookingUpdate = true;
  }else if( $('input[name="bookingUpdate2"]:checked').val() == "NO"){
    var bookingUpdate = false;
  }else {
    var bookingUpdate = null;
  }
  if( $('input[name="bookingDelete2"]:checked').val() == "YES"){
    var bookingDelete = true;
  }else if( $('input[name="bookingDelete2"]:checked').val() == "NO"){
    var bookingDelete = false;
  }else {
    var bookingDelete = null;
  }
  if( $('input[name="bookingDisplay2"]:checked').val() == "YES"){
    var bookingDisplay = true;
  }else if( $('input[name="bookingDisplay2"]:checked').val() == "NO"){
    var bookingDisplay = false;
  }else {
    var bookingDisplay = null;
  }
  if( $('input[name="bookingPrint2"]:checked').val() == "YES"){
    var bookingPrint = true;
  }else if( $('input[name="bookingPrint2"]:checked').val() == "NO"){
    var bookingPrint = false;
  }else {
    var bookingPrint = null;
  }
  if( $('input[name="bookingAuthorize2"]:checked').val() == "YES"){
    var bookingAuthorize = true;
  }else if( $('input[name="bookingAuthorize2"]:checked').val() == "NO"){
    var bookingAuthorize = false;
  }else {
    var bookingAuthorize = null;
  }
  if( $('input[name="bookingDetails2"]:checked').val() == "YES"){
    var bookingDetails = true;
  }else if( $('input[name="bookingDetails2"]:checked').val() == "NO"){
    var bookingDetails = false;
  }else {
    var bookingDetails = null;
  }
  //  Get Contents values
  if( $('input[name="contentAdd2"]:checked').val() == "YES"){
    var contentAdd = true;
  }else if( $('input[name="contentAdd2"]:checked').val() == "NO"){
    var contentAdd = false;
  }else {
    var contentAdd = null;
  }
  if( $('input[name="contentDelete2"]:checked').val() == "YES"){
    var contentDelete = true;
  }else if( $('input[name="contentDelete2"]:checked').val() == "NO"){
    var contentDelete = false;
  }else {
    var contentDelete = null;
  }
  if( $('input[name="contentDisplay2"]:checked').val() == "YES"){
    var contentDisplay = true;
  }else if( $('input[name="contentDisplay2"]:checked').val() == "NO"){
    var contentDisplay = false;
  }else {
    var contentDisplay = null;
  }
  if( $('input[name="contentPrint2"]:checked').val() == "YES"){
    var contentPrint = true;
  }else if( $('input[name="contentPrint2"]:checked').val() == "NO"){
    var contentPrint = false;
  }else {
    var contentPrint = null;
  }
  if( $('input[name="contentAuthorize2"]:checked').val() == "YES"){
    var contentAuthorize = true;
  }else if( $('input[name="contentAuthorize2"]:checked').val() == "NO"){
    var contentAuthorize = false;
  }else {
    var contentAuthorize = null;
  }
  if( $('input[name="contentDetails2"]:checked').val() == "YES"){
    var contentDetails = true;
  }else if( $('input[name="contentDetails2"]:checked').val() == "NO"){
    var contentDetails = false;
  }else {
    var contentDetails = null;
  }
  //  Get Firmwares values
  if( $('input[name="firmwareAdd2"]:checked').val() == "YES"){
    var firmwareAdd = true;
  }else if( $('input[name="firmwareAdd2"]:checked').val() == "NO"){
    var firmwareAdd = false;
  }else {
    var firmwareAdd = null;
  }
  if( $('input[name="firmwareUpdate2"]:checked').val() == "YES"){
    var firmwareUpdate = true;
  }else if( $('input[name="firmwareUpdate2"]:checked').val() == "NO"){
    var firmwareUpdate = false;
  }else {
    var firmwareUpdate = null;
  }
  if( $('input[name="firmwareDelete2"]:checked').val() == "YES"){
    var firmwareDelete = true;
  }else if( $('input[name="firmwareDelete2"]:checked').val() == "NO"){
    var firmwareDelete = false;
  }else {
    var firmwareDelete = null;
  }
  if( $('input[name="firmwareDisplay2"]:checked').val() == "YES"){
    var firmwareDisplay = true;
  }else if( $('input[name="firmwareDisplay2"]:checked').val() == "NO"){
    var firmwareDisplay = false;
  }else {
    var firmwareDisplay = null;
  }
  if( $('input[name="firmwarePrint2"]:checked').val() == "YES"){
    var firmwarePrint = true;
  }else if( $('input[name="firmwarePrint2"]:checked').val() == "NO"){
    var firmwarePrint = false;
  }else {
    var firmwarePrint = null;
  }
  if( $('input[name="firmwareAuthorize2"]:checked').val() == "YES"){
    var firmwareAuthorize = true;
  }else if( $('input[name="firmwareAuthorize2"]:checked').val() == "NO"){
    var firmwareAuthorize = false;
  }else {
    var firmwareAuthorize = null;
  }
  if( $('input[name="firmwareDetails2"]:checked').val() == "YES"){
    var firmwareDetails = true;
  }else if( $('input[name="firmwareDetails2"]:checked').val() == "NO"){
    var firmwareDetails = false;
  }else {
    var firmwareDetails = null;
  }
  //  Get Signatures values
  if( $('input[name="signatureAdd2"]:checked').val() == "YES"){
    var signatureAdd = true;
  }else if( $('input[name="signatureAdd2"]:checked').val() == "NO"){
    var signatureAdd = false;
  }else {
    var signatureAdd = null;
  }
  if( $('input[name="signatureDelete2"]:checked').val() == "YES"){
    var signatureDelete = true;
  }else if( $('input[name="signatureDelete2"]:checked').val() == "NO"){
    var signatureDelete = false;
  }else {
    var signatureDelete = null;
  }
  if( $('input[name="signatureDisplay2"]:checked').val() == "YES"){
    var signatureDisplay = true;
  }else if( $('input[name="signatureDisplay2"]:checked').val() == "NO"){
    var signatureDisplay = false;
  }else {
    var signatureDisplay = null;
  }
  if( $('input[name="signaturePrint2"]:checked').val() == "YES"){
    var signaturePrint = true;
  }else if( $('input[name="signaturePrint2"]:checked').val() == "NO"){
    var signaturePrint = false;
  }else {
    var signaturePrint = null;
  }
  //  Get Tariffs values
  if( $('input[name="tariffAdd2"]:checked').val() == "YES"){
    var tariffAdd = true;
  }else if( $('input[name="tariffAdd2"]:checked').val() == "NO"){
    var tariffAdd = false;
  }else {
    var tariffAdd = null;
  }
  if( $('input[name="tariffUpdate2"]:checked').val() == "YES"){
    var tariffUpdate = true;
  }else if( $('input[name="tariffUpdate2"]:checked').val() == "NO"){
    var tariffUpdate = false;
  }else {
    var tariffUpdate = null;
  }
  if( $('input[name="tariffDelete2"]:checked').val() == "YES"){
    var tariffDelete = true;
  }else if( $('input[name="tariffDelete2"]:checked').val() == "NO"){
    var tariffDelete = false;
  }else {
    var tariffDelete = null;
  }
  if( $('input[name="tariffDisplay2"]:checked').val() == "YES"){
    var tariffDisplay = true;
  }else if( $('input[name="tariffDisplay2"]:checked').val() == "NO"){
    var tariffDisplay = false;
  }else {
    var tariffDisplay = null;
  }
  if( $('input[name="tariffPrint2"]:checked').val() == "YES"){
    var tariffPrint = true;
  }else if( $('input[name="tariffPrint2"]:checked').val() == "NO"){
    var tariffPrint = false;
  }else {
    var tariffPrint = null;
  }
  if( $('input[name="tariffAuthorize2"]:checked').val() == "YES"){
    var tariffAuthorize = true;
  }else if( $('input[name="tariffAuthorize2"]:checked').val() == "NO"){
    var tariffAuthorize = false;
  }else {
    var tariffAuthorize = null;
  }
  if( $('input[name="tariffDetails2"]:checked').val() == "YES"){
    var tariffDetails = true;
  }else if( $('input[name="tariffDetails2"]:checked').val() == "NO"){
    var tariffDetails = false;
  }else {
    var tariffDetails = null;
  }
  //  Get Clients values
  if( $('input[name="clientAdd2"]:checked').val() == "YES"){
    var clientAdd = true;
  }else if( $('input[name="clientAdd2"]:checked').val() == "NO"){
    var clientAdd = false;
  }else {
    var clientAdd = null;
  }
  if( $('input[name="clientUpdate2"]:checked').val() == "YES"){
    var clientUpdate = true;
  }else if( $('input[name="clientUpdate2"]:checked').val() == "NO"){
    var clientUpdate = false;
  }else {
    var clientUpdate = null;
  }
  if( $('input[name="clientDelete2"]:checked').val() == "YES"){
    var clientDelete = true;
  }else if( $('input[name="clientDelete2"]:checked').val() == "NO"){
    var clientDelete = false;
  }else {
    var clientDelete = null;
  }
  if( $('input[name="clientDisplay2"]:checked').val() == "YES"){
    var clientDisplay = true;
  }else if( $('input[name="clientDisplay2"]:checked').val() == "NO"){
    var clientDisplay = false;
  }else {
    var clientDisplay = null;
  }
  if( $('input[name="clientPrint2"]:checked').val() == "YES"){
    var clientPrint = true;
  }else if( $('input[name="clientPrint2"]:checked').val() == "NO"){
    var clientPrint = false;
  }else {
    var clientPrint = null;
  }
  if( $('input[name="clientAuthorize2"]:checked').val() == "YES"){
    var clientAuthorize = true;
  }else if( $('input[name="clientAuthorize2"]:checked').val() == "NO"){
    var clientAuthorize = false;
  }else {
    var clientAuthorize = null;
  }
  if( $('input[name="clientDetails2"]:checked').val() == "YES"){
    var clientDetails = true;
  }else if( $('input[name="clientDetails2"]:checked').val() == "NO"){
    var clientDetails = false;
  }else {
    var clientDetails = null;
  }
  if( $('input[name="clientInvoices2"]:checked').val() == "YES"){
    var clientInvoices = true;
  }else if( $('input[name="clientInvoices2"]:checked').val() == "NO"){
    var clientInvoices = false;
  }else {
    var clientInvoices = null;
  }
  if( $('input[name="clientRoles2"]:checked').val() == "YES"){
    var clientRoles = true;
  }else if( $('input[name="clientRoles2"]:checked').val() == "NO"){
    var clientRoles = false;
  }else {
    var clientRoles = null;
  }
  if( $('input[name="clientUsers2"]:checked').val() == "YES"){
    var clientUsers = true;
  }else if( $('input[name="clientUsers2"]:checked').val() == "NO"){
    var clientUsers = false;
  }else {
    var clientUsers = null;
  }
  if( $('input[name="clientBookings2"]:checked').val() == "YES"){
    var clientBookings = true;
  }else if( $('input[name="clientBookings2"]:checked').val() == "NO"){
    var clientBookings = false;
  }else {
    var clientBookings = null;
  }
  if( $('input[name="clientContracts2"]:checked').val() == "YES"){
    var clientContracts = true;
  }else if( $('input[name="clientContracts2"]:checked').val() == "NO"){
    var clientContracts = false;
  }else {
    var clientContracts = null;
  }
  if( $('input[name="clientContents2"]:checked').val() == "YES"){
    var clientContents = true;
  }else if( $('input[name="clientContents2"]:checked').val() == "NO"){
    var clientContents = false;
  }else {
    var clientContents = null;
  }
  //  Get Companies values
  if( $('input[name="companyAdd2"]:checked').val() == "YES"){
    var companyAdd = true;
  }else if( $('input[name="companyAdd2"]:checked').val() == "NO"){
    var companyAdd = false;
  }else {
    var companyAdd = null;
  }
  if( $('input[name="companyUpdate2"]:checked').val() == "YES"){
    var companyUpdate = true;
  }else if( $('input[name="companyUpdate2"]:checked').val() == "NO"){
    var companyUpdate = false;
  }else {
    var companyUpdate = null;
  }
  if( $('input[name="companyDelete2"]:checked').val() == "YES"){
    var companyDelete = true;
  }else if( $('input[name="companyDelete2"]:checked').val() == "NO"){
    var companyDelete = false;
  }else {
    var companyDelete = null;
  }
  if( $('input[name="companyDisplay2"]:checked').val() == "YES"){
    var companyDisplay = true;
  }else if( $('input[name="companyDisplay2"]:checked').val() == "NO"){
    var companyDisplay = false;
  }else {
    var companyDisplay = null;
  }
  if( $('input[name="companyPrint2"]:checked').val() == "YES"){
    var companyPrint = true;
  }else if( $('input[name="companyPrint2"]:checked').val() == "NO"){
    var companyPrint = false;
  }else {
    var companyPrint = null;
  }
  if( $('input[name="companyAuthorize2"]:checked').val() == "YES"){
    var companyAuthorize = true;
  }else if( $('input[name="companyAuthorize2"]:checked').val() == "NO"){
    var companyAuthorize = false;
  }else {
    var companyAuthorize = null;
  }
  if( $('input[name="companyDetails2"]:checked').val() == "YES"){
    var companyDetails = true;
  }else if( $('input[name="companyDetails2"]:checked').val() == "NO"){
    var companyDetails = false;
  }else {
    var companyDetails = null;
  }
  if( $('input[name="companyInvoices2"]:checked').val() == "YES"){
    var companyInvoices = true;
  }else if( $('input[name="companyInvoices2"]:checked').val() == "NO"){
    var companyInvoices = false;
  }else {
    var companyInvoices = null;
  }
  if( $('input[name="companyRoles2"]:checked').val() == "YES"){
    var companyRoles = true;
  }else if( $('input[name="companyRoles2"]:checked').val() == "NO"){
    var companyRoles = false;
  }else {
    var companyRoles = null;
  }
  if( $('input[name="companyUsers2"]:checked').val() == "YES"){
    var companyUsers = true;
  }else if( $('input[name="companyUsers2"]:checked').val() == "NO"){
    var companyUsers = false;
  }else {
    var companyUsers = null;
  }
  if( $('input[name="companySegments2"]:checked').val() == "YES"){
    var companySegments = true;
  }else if( $('input[name="companySegments2"]:checked').val() == "NO"){
    var companySegments = false;
  }else {
    var companySegments = null;
  }
  if( $('input[name="companyContracts2"]:checked').val() == "YES"){
    var companyContracts = true;
  }else if( $('input[name="companyContracts2"]:checked').val() == "NO"){
    var companyContracts = false;
  }else {
    var companyContracts = null;
  }
  if( $('input[name="companyScreens2"]:checked').val() == "YES"){
    var companyScreens = true;
  }else if( $('input[name="companyScreens2"]:checked').val() == "NO"){
    var companyScreens = false;
  }else {
    var companyScreens = null;
  }
  if( $('input[name="companyCurrencies2"]:checked').val() == "YES"){
    var companyCurrencies = true;
  }else if( $('input[name="companyCurrencies2"]:checked').val() == "NO"){
    var companyCurrencies = false;
  }else {
    var companyCurrencies = null;
  }
  if( $('input[name="companyClients2"]:checked').val() == "YES"){
    var companyClients = true;
  }else if( $('input[name="companyClients2"]:checked').val() == "NO"){
    var companyClients = false;
  }else {
    var companyClients = null;
  }
  if( $('input[name="companyBookings2"]:checked').val() == "YES"){
    var companyBookings = true;
  }else if( $('input[name="companyBookings2"]:checked').val() == "NO"){
    var companyBookings = false;
  }else {
    var companyBookings = null;
  }
  if( $('input[name="companyContents2"]:checked').val() == "YES"){
    var companyContents = true;
  }else if( $('input[name="companyContents2"]:checked').val() == "NO"){
    var companyContents = false;
  }else {
    var companyContents = null;
  }
  if( $('input[name="companyTariffs2"]:checked').val() == "YES"){
    var companyTariffs = true;
  }else if( $('input[name="companyTariffs2"]:checked').val() == "NO"){
    var companyTariffs = false;
  }else {
    var companyTariffs = null;
  }
  if( $('input[name="companyFirmwares2"]:checked').val() == "YES"){
    var companyFirmwares = true;
  }else if( $('input[name="companyFirmwares2"]:checked').val() == "NO"){
    var companyFirmwares = false;
  }else {
    var companyFirmwares = null;
  }
  if( $('input[name="companyArticles2"]:checked').val() == "YES"){
    var companyArticles = true;
  }else if( $('input[name="companyArticles2"]:checked').val() == "NO"){
    var companyArticles = false;
  }else {
    var companyArticles = null;
  }
  //  Get Screens values
  if( $('input[name="screenAdd2"]:checked').val() == "YES"){
    var screenAdd = true;
  }else if( $('input[name="screenAdd2"]:checked').val() == "NO"){
    var screenAdd = false;
  }else {
    var screenAdd = null;
  }
  if( $('input[name="screenUpdate2"]:checked').val() == "YES"){
    var screenUpdate = true;
  }else if( $('input[name="screenUpdate2"]:checked').val() == "NO"){
    var screenUpdate = false;
  }else {
    var screenUpdate = null;
  }
  if( $('input[name="screenDelete2"]:checked').val() == "YES"){
    var screenDelete = true;
  }else if( $('input[name="screenDelete2"]:checked').val() == "NO"){
    var screenDelete = false;
  }else {
    var screenDelete = null;
  }
  if( $('input[name="screenDisplay2"]:checked').val() == "YES"){
    var screenDisplay = true;
  }else if( $('input[name="screenDisplay2"]:checked').val() == "NO"){
    var screenDisplay = false;
  }else {
    var screenDisplay = null;
  }
  if( $('input[name="screenPrint2"]:checked').val() == "YES"){
    var screenPrint = true;
  }else if( $('input[name="screenPrint2"]:checked').val() == "NO"){
    var screenPrint = false;
  }else {
    var screenPrint = null;
  }
  if( $('input[name="screenAuthorize2"]:checked').val() == "YES"){
    var screenAuthorize = true;
  }else if( $('input[name="screenAuthorize2"]:checked').val() == "NO"){
    var screenAuthorize = false;
  }else {
    var screenAuthorize = null;
  }
  if( $('input[name="screenDetails2"]:checked').val() == "YES"){
    var screenDetails = true;
  }else if( $('input[name="screenDetails2"]:checked').val() == "NO"){
    var screenDetails = false;
  }else {
    var screenDetails = null;
  }
  if( $('input[name="screenShow2"]:checked').val() == "YES"){
    var screenShow = true;
  }else if( $('input[name="screenShow2"]:checked').val() == "NO"){
    var screenShow = false;
  }else {
    var screenShow = null;
  }
  if( $('input[name="screenSystem2"]:checked').val() == "YES"){
    var screenSystem = true;
  }else if( $('input[name="screenSystem2"]:checked').val() == "NO"){
    var screenSystem = false;
  }else {
    var screenSystem = null;
  }
  if( $('input[name="screenClear2"]:checked').val() == "YES"){
    var screenClear = true;
  }else if( $('input[name="screenClear2"]:checked').val() == "NO"){
    var screenClear = false;
  }else {
    var screenClear = null;
  }
  if( $('input[name="screenMonitor2"]:checked').val() == "YES"){
    var screenMonitor = true;
  }else if( $('input[name="screenMonitor2"]:checked').val() == "NO"){
    var screenMonitor = false;
  }else {
    var screenMonitor = null;
  }
  if( $('input[name="screenActivate2"]:checked').val() == "YES"){
    var screenActivate = true;
  }else if( $('input[name="screenActivate2"]:checked').val() == "NO"){
    var screenActivate = false;
  }else {
    var screenActivate = null;
  }
  if( $('input[name="screenOn/Off2"]:checked').val() == "YES"){
    var screenOnOff = true;
  }else if( $('input[name="screenOn/Off2"]:checked').val() == "NO"){
    var screenOnOff = false;
  }else {
    var screenOnOff = null;
  }
  var role =
    {
      'roleName': roleName,
      'currentNumber': 0,
      'status': "HLD",
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow(),
      'code': Session.get("roleSelectedAu").code,
      'codeCompany' : Session.get("roleSelectedAu").codeCompany,
      'accountAdd': accountAdd,
      'accountUpdate': accountUpdate,
      'accountDelete': accountDelete,
      'accountDisplay': accountDisplay,
      'accountPrint': accountPrint,
      'accountAuthorize': accountAuthorize,
      'accountDetails': accountDetails,
      'contractAdd': contractAdd,
      'contractUpdate': contractUpdate,
      'contractDelete': contractDelete,
      'contractDisplay': contractDisplay,
      'contractPrint': contractPrint,
      'contractAuthorize': contractAuthorize,
      'contractDetails': contractDetails,
      'articleAdd': articleAdd,
      'articleUpdate': articleUpdate,
      'articleDelete': articleDelete,
      'articleDisplay': articleDisplay,
      'articlePrint': articlePrint,
      'articleAuthorize': articleAuthorize,
      'articleDetails': articleDetails,
      'articleOptions': articleOptions,
      'invoiceAdd': invoiceAdd,
      'invoiceUpdate': invoiceUpdate,
      'invoiceDelete': invoiceDelete,
      'invoiceDisplay': invoiceDisplay,
      'invoicePrint': invoicePrint,
      'invoiceAuthorize': invoiceAuthorize,
      'invoiceDetails': invoiceDetails,
      'clientAdd': clientAdd,
      'clientUpdate': clientUpdate,
      'clientDelete': clientDelete,
      'clientDisplay': clientDisplay,
      'clientPrint': clientPrint,
      'clientAuthorize': clientAuthorize,
      'clientDetails': clientDetails,
      'clientInvoices': clientInvoices,
      'clientRoles': clientRoles,
      'clientUsers': clientUsers,
      'clientBookings': clientBookings,
      'clientContracts': clientContracts,
      'clientContents': clientContents,
      'currencyAdd': currencyAdd,
      'currencyUpdate': currencyUpdate,
      'currencyDelete': currencyDelete,
      'currencyDisplay': currencyDisplay,
      'currencyPrint': currencyPrint,
      'currencyAuthorize': currencyAuthorize,
      'currencyDetails': currencyDetails,
      'moduleAdd': moduleAdd,
      'moduleUpdate': moduleUpdate,
      'moduleDisplay': moduleDisplay,
      'moduleDelete': moduleDelete,
      'modulePrint': modulePrint,
      'moduleAuthorize': moduleAuthorize,
      'moduleDetails': moduleDetails,
      'screenAdd': screenAdd,
      'screenUpdate': screenUpdate,
      'screenDelete': screenDelete,
      'screenDisplay': screenDisplay,
      'screenPrint': screenPrint,
      'screenAuthorize': screenAuthorize,
      'screenDetails': screenDetails,
      'screenShow': screenShow,
      'screenSystem': screenSystem,
      'screenClear': screenClear,
      'screenMonitor': screenMonitor,
      'screenActivate': screenActivate,
      'screenOnOff': screenOnOff,
      'segmentAdd': segmentAdd,
      'segmentUpdate': segmentUpdate,
      'segmentDelete': segmentDelete,
      'segmentDisplay': segmentDisplay,
      'segmentPrint': segmentPrint,
      'segmentAuthorize': segmentAuthorize,
      'segmentDetails': segmentDetails,
      'planningAdd': planningAdd,
      'planningDisplay': planningDisplay,
      'planningPrint': planningPrint,
      'planningAuthorize': planningAuthorize,
      'planningDetails': planningDetails,
      'tariffAdd': tariffAdd,
      'tariffUpdate': tariffUpdate,
      'tariffDelete': tariffDelete,
      'tariffDisplay': tariffDisplay,
      'tariffPrint': tariffPrint,
      'tariffAuthorize': bookingAuthorize,
      'tariffDetails': bookingDetails,
      'bookingAdd': bookingAdd,
      'bookingUpdate': bookingUpdate,
      'bookingDelete': bookingDelete,
      'bookingDisplay': bookingDisplay,
      'bookingPrint': bookingPrint,
      'bookingAuthorize': bookingAuthorize,
      'bookingDetails': bookingDetails,
      'contentAdd': contentAdd,
      'contentDelete': contentDelete,
      'contentDisplay': contentDisplay,
      'contentAuthorize': contentAuthorize,
      'contentDetails': contentDetails,
      'contentPrint': contentPrint,
      'roleAdd': roleAdd,
      'roleUpdate': roleUpdate,
      'roleDelete': roleDelete,
      'roleDisplay': roleDisplay,
      'rolePrint': rolePrint,
      'roleAuthorize': roleAuthorize,
      'roleDetails': roleDetails,
      'firmwareAdd': firmwareAdd,
      'firmwareUpdate': firmwareUpdate,
      'firmwareDelete': firmwareDelete,
      'firmwareDisplay': firmwareDisplay,
      'firmwarePrint': firmwarePrint,
      'firmwareAuthorize': firmwareAuthorize,
      'firmwareDetails': firmwareDetails,
      'signatureAdd': signatureAdd,
      'signatureDelete': signatureDelete,
      'signatureDisplay': signatureDisplay,
      'signaturePrint': signaturePrint,
      'tariffAdd': tariffAdd,
      'tariffUpdate': tariffUpdate,
      'tariffDelete': tariffDelete,
      'tariffDisplay': tariffDisplay,
      'tariffPrint': tariffPrint,
      'tariffAuthorize': tariffAuthorize,
      'tariffDetails': tariffDetails,
      'companyAdd': companyAdd,
      'companyUpdate': companyUpdate,
      'companyDelete': companyDelete,
      'companyDisplay': companyDisplay,
      'companyPrint': companyPrint,
      'companyAuthorize': companyAuthorize,
      'companyDetails': companyDetails,
      'companyInvoices': companyInvoices,
      'companyRoles': companyRoles,
      'companyUsers': companyUsers,
      'companySegments': companySegments,
      'companyContracts': companyContracts,
      'companyArticles': companyArticles,
      'companyScreens': companyScreens,
      'companyBookings': companyBookings,
      'companyContents': companyContents,
      'companyCurrencies': companyCurrencies,
      'companyClients': companyClients,
      'companyTariffs': companyTariffs,
      'companyFirmwares': companyFirmwares
    };
  return role;
}
Template.allClientsRoles.rendered = function(){
  checkSession();
  settingLanguage();
  var userLogged = Session.get("UserLogged");
  console.log(Session.get("USER_ROLE_XX"));
  // Initialize fooTable
  $('.footable').footable();
  $('.footable2').footable();
  // Initialize i-check plugin
  $('.i-checks').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green'
  });
  $('#warning').hide();
  $('#summary').hide();
};
Template.allClientsRoles.events({
  'click .newRole'() {
    $('#warning').hide();
    $('#summary').hide();
    settingLanguage();
    $('#addRolePopup').modal();
  },
  //            Live events          //
  'click .saveAdd'() {
    var roleAdded = getValuesFromFormForAdd();
    if(roleAdded.roleName.length == 0){
      $('#warning').show();
    }else {
      $('#addRolePopup').modal('hide');
      roleAdded.currentNumber = roleAdded.currentNumber + 1 ;
      Roles_Authorization.insert(roleAdded);
      toastrSaveDone();
    }
  },
  'click .validateAdd'() {
    var roleAdded = getValuesFromFormForAdd();
    if(roleAdded.roleName.length == 0){
      $('#warning').show();
    }else {
      $('#addRolePopup').modal('hide');
      roleAdded.currentNumber = roleAdded.currentNumber + 1 ;
      roleAdded.status = 'INAU';
      Roles_Authorization.insert(roleAdded);
      toastrValidatonDone();
    }
  },
  'click .btn-edit'() {
    settingLanguage();
    var role = Roles_Live.findOne({ "_id" : this._id });
    if (verifyEdit(role._id)){
      Session.set("roleSelected", role);
      $('#updateRolePopup').modal();
    }else{
      $('#edictState').modal();
    }
  },
  'click .saveUpdate'() {
    var roleUpdated = getValuesFromFormForEdit();
    var role = Session.get("roleSelected");
    var array = nextState(role.status);
    hideShowButtons(array);
    roleUpdated.inputter = Session.get("UserLogged")._id;
    roleUpdated.currentNumber = role.currentNumber + 1;
    roleUpdated._id = role._id;
    Roles_Authorization.insert(roleUpdated);
    toastrModificationSaved();
  },
  'click .validateUpdate'() {
    var roleUpdated = getValuesFromFormForEdit();
    var role = Session.get("roleSelected");
    var array = nextState(role.status);
    hideShowButtons(array);
    roleUpdated.inputter = Session.get("UserLogged")._id;
    roleUpdated.currentNumber = role.currentNumber + 1
    roleUpdated._id = role._id;
    roleUpdated.status = "INAU";
    Roles_Authorization.insert(roleUpdated);
    toastrModificationValidated();
  },
  'click .btn-delete'() {
    var role = Roles_Live.findOne({ "_id" : this._id });
    if (verifyDelete(role._id)){
      $('#checkDeleting').modal();
      Session.set("deleteRoleLive",role);
    }else{
      $('#deletionState').modal();
    }
  },
  //          Authorization events        //
  'click .editAu'() {
    var role = Roles_Authorization.findOne({ "_id" : this._id });
    if (userAuthorized(role.inputter)) {
      settingLanguage();
      Session.set("roleSelectedAu", role);
      $('#updateAuRolePopup').modal();
    }else {
      toastrWarningAccessDenied();
    }
  },
  'click .saveUpdateAu'() {
    var roleUpdated = getValuesFromFormForEditAu();
    var role = Session.get("roleSelectedAu");
    roleUpdated.inputter = Session.get("UserLogged")._id;
    roleUpdated._id = role._id;
    Roles_Authorization.remove(role._id);
    Roles_Authorization.insert(roleUpdated);
    toastrModificationSaved();
  },
  'click .validateUpdateAu'() {
    var roleUpdated = getValuesFromFormForEditAu();
    var role = Session.get("roleSelectedAu");
    roleUpdated.status = "INAU";
    roleUpdated.inputter = Session.get("UserLogged")._id;
    roleUpdated._id = role._id;
    Roles_Authorization.remove(role._id);
    Roles_Authorization.insert(roleUpdated);
    toastrModificationValidated();
  },
  'click .validateAu'() {
    Roles_Authorization.update({ "_id" : this._id }, {'$set':{ 'status' : 'INAU', 'inputter' : Session.get("UserLogged")._id , 'dateTime' : getDateNow() }});
  },
  'click .BtnDelete'() {
    var role = Session.get("deleteRoleLive");
    role._id = role._id+"#D";
    role.status = "RNAU";
    role.inputter = Session.get("UserLogged")._id;
    role.dateTime = getDateNow();
    role.authorizer = null;
    Roles_Authorization.insert(role);
    toastrSuppression();
  },
  'click .cancelAu'() {
    var role = Roles_Authorization.findOne({ "_id" : this._id });
    if (userAuthorized(role.inputter)) {
      Session.set("deleteRoleAu", role);
      $('#checkCancel').modal();
    }else {
      toastrWarningAccessDenied();
    }
  },
  'click .BtnCancel'() {
    var role = Session.get("deleteRoleAu");
    Roles_Authorization.remove(role._id);
    toastrSuppression();
  },
  'click .btn-details'() {
    var role = Roles_Live.findOne({ "_id" : this._id });
    var inputter = Users_Live.findOne({ "_id" : role.inputter });
    role.inputter = inputter.fname+" "+inputter.surname;
    var authorizer = Users_Live.findOne({ "_id" : role.authorizer });
    role.authorizer = authorizer.fname+" "+authorizer.surname;
    Session.set("RoleDetails",role);
    settingLanguage();
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
    Session.set("RoleAuthorized", newRole);
    Session.set("OLD_ROLE", oldRole);
    if(oldRole == undefined){
      Session.set("OLD_ROLE", null);
    }else {
      var inputter = Users_Live.findOne({ "_id" : oldRole.inputter });
      oldRole.inputter = inputter.fname+" "+inputter.surname;
      var authorizer = Users_Live.findOne({ "_id" : oldRole.authorizer });
      oldRole.authorizer = authorizer.fname+" "+authorizer.surname;
      Session.set("OLD_ROLE", oldRole);
    }
    var inputter = Users_Live.findOne({ "_id" : newRole.inputter });
    newRole.inputter = inputter.fname+" "+inputter.surname;
    Session.set("NEW_ROLE", newRole);
    settingLanguage();
    $('#checkAuthorising').modal();
  },
  'click .BtnAuthorize'() {
    var role = Session.get("RoleAuthorized");
    authorize(role);
  },
  'click .summary'() {
    var itemsArray = getItemSelected();
    if (itemsArray.length > 0) {
      Session.set("RECAP", itemsArray);
      $('#summary').show();
    }
  },
});
Template.allClientsRoles.helpers({
  roles_live() {
    if (Session.get("UserLogged").codeCompany != "swallow-labs") {
      var codeCompany = Session.get("UserLogged").codeCompany;
    }else {
      var codeCompany = Session.get("COMPANY_CODE");
    }
    return Roles_Live.find({ "codeCompany": codeCompany, "code" : Session.get("CLIENT_CODE_X") });
  },
  roles_authorization() {
    if (Session.get("UserLogged").codeCompany != "swallow-labs") {
      var codeCompany = Session.get("UserLogged").codeCompany;
    }else {
      var codeCompany = Session.get("COMPANY_CODE");
    }
    var roles = Roles_Authorization.find({ "codeCompany": codeCompany, "code" : Session.get("CLIENT_CODE_X") });
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
          'buttonValidate' : button.validateAu,
          'buttonAuthorize' : button.authorizeAu,
          'buttonDetail' : buttonDetails
        };
      rolesAuthorization.push(role);
    });
    return rolesAuthorization;
  },
  recap() {
    return Session.get("RECAP");;
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
  client(){
    return Session.get("CLIENT_NAME_X");
  },
  role(){
    return Session.get("USER_ROLE_XX");
  },
  roleCompare() {
    return Session.get("RoleCompare");
  },
  client(){
    return Session.get("CLIENT_NAME");
  },
  equals: function(v1, v2) {
    return (v1 == v2);
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
