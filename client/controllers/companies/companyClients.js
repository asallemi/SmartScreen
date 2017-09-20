let clientsAuthorization = Meteor.subscribe('clientsAuthorization');
function authorize(client){
  if(client._id.indexOf("#") > 0){
    client._id = client._id.replace("#D", "");
  }
  var clientX = Clients_Live.findOne({ "_id" : client._id });
  // entry validated and new entry
  if(clientX !== undefined && client.status == "INAU"){
    client.status = "LIVE";
    client.authorizer = Session.get("UserLogged")._id;
    client.dateTime = getDateNow();
    clientX.status = 'HIS';
    clientX.dateTime = getDateNow();
    clientX.currentNumber = client.currentNumber;
    clientX._id = client._id+"#"+(client.currentNumber-1);
    Clients_History.insert(clientX);
    Clients_Live.remove(client._id);
    Clients_Live.insert(client);
    Clients_Authorization.remove(client._id);
  // Authorise deleting client
  }else if(clientX !== undefined && client.status == "RNAU"){
    client.authorizer= Session.get("UserLogged")._id;
    client.status = 'DEL';
    client.dateTime = getDateNow();
    Clients_History.insert(client);
    Clients_Live.remove(clientX._id);
    Clients_Authorization.remove(client._id);
    Clients_Authorization.remove(client._id+"#D");
  }else{
    client.status = "LIVE";
    client.authorizer = Session.get("UserLogged")._id;
    client.dateTime = getDateNow();
    Clients_Live.insert(client);
    Clients_Authorization.remove(client._id);
    // If client authorized, the app will create a directory inside /home/akrem/sshfs/display named "code" of the client
    Meteor.call('createClientDirectory', client.code, client.codeCompany);
  }
}
function verifyDelete(id){
  var client = Clients_Authorization.findOne({ "_id" : id+"#D" });
  return client == undefined;
}
function verifyEdit(id){
  var client = Clients_Authorization.findOne({ "_id" : id });
  return client == undefined;
}
function getValuesFromFormForAdd(){
  if (document.getElementById('name') != null) {
    var name = document.getElementById("name").value;
  }else {
    var name = null;
  }
  if (document.getElementById('shortName') != null) {
    var shortName = document.getElementById("shortName").value;
  }else {
    var shortName = null;
  }
  if (document.getElementById('sector') != null) {
    var sector = document.getElementById("sector").value;
  }else {
    var sector = null;
  }
  if (document.getElementById('code') != null) {
    var code = document.getElementById("code").value;
  }else {
    var code = null;
  }
  if (document.getElementById('email') != null) {
    var email = document.getElementById("email").value;
  }else {
    var email = null;
  }
  if (document.getElementById('phone') != null) {
    var phone = document.getElementById("phone").value;
  }else {
    var phone = null;
  }
  if (document.getElementById('fax') != null) {
    var fax = document.getElementById("fax").value;
  }else {
    var fax = null;
  }
  if (document.getElementById('street') != null) {
    var street = document.getElementById("street").value;
  }else {
    var street = null;
  }
  if (document.getElementById('codePostal') != null) {
    var codePostal = document.getElementById("codePostal").value;
  }else {
    var codePostal = null;
  }
  if (document.getElementById('province') != null) {
    var province = document.getElementById("province").value;
  }else {
    var province = null;
  }
  if (document.getElementById('city') != null) {
    var city = document.getElementById("city").value;
  }else {
    var city = null;
  }
  if (document.getElementById('country') != null) {
    var country = document.getElementById("country").value;
  }else {
    var country = null;
  }
  if(document.getElementById("accountNumber").value != null){
    var accountNumber = document.getElementById("accountNumber").value;
  }else{
    var accountNumber = 1;
  }
  var client =
    {
      'name' : name,
      'shortName' : shortName,
      'sector' : sector,
      'code' : code,
      'email' : email,
      'phone' : phone,
      'fax' : fax,
      'street' : street,
      'codePostal' : codePostal,
      'province' : province,
      'city' : city,
      'country' : country,
      'balance' : 0,
      'accountNumber' : accountNumber,
      'codeCompany' : Session.get("COMPANY_CODE"),
      'logo' : "/home",
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow()
    };
  return client;
}
function getValuesFromFormForEdit(){
  if (document.getElementById('name1') != null) {
    var name1 = document.getElementById("name1").value;
  }else {
    var name1 = null;
  }
  if (document.getElementById('shortName1') != null) {
    var shortName1 = document.getElementById("shortName1").value;
  }else {
    var shortName1 = null;
  }
  if (document.getElementById('sector1') != null) {
    var sector1 = document.getElementById("sector1").value;
  }else {
    var sector1 = null;
  }
  if (document.getElementById('code1') != null) {
    var code1 = document.getElementById("code1").value;
  }else {
    var code1 = null;
  }
  if (document.getElementById('email1') != null) {
    var email1 = document.getElementById("email1").value;
  }else {
    var email1 = null;
  }
  if (document.getElementById('balance') != null) {
    var balance = document.getElementById("balance").value;
  }else {
    var balance = null;
  }
  if (document.getElementById('phone1') != null) {
    var phone1 = document.getElementById("phone1").value;
  }else {
    var phone1 = null;
  }
  if (document.getElementById('fax1') != null) {
    var fax1 = document.getElementById("fax1").value;
  }else {
    var fax1 = null;
  }
  if (document.getElementById('street1') != null) {
    var street1 = document.getElementById("street1").value;
  }else {
    var street1 = null;
  }
  if (document.getElementById('codePostal1') != null) {
    var codePostal1 = document.getElementById("codePostal1").value;
  }else {
    var codePostal1 = null;
  }
  if (document.getElementById('province1') != null) {
    var province1 = document.getElementById("province1").value;
  }else {
    var province1 = null;
  }
  if (document.getElementById('city1') != null) {
    var city1 = document.getElementById("city1").value;
  }else {
    var city1 = null;
  }
  if (document.getElementById('country1') != null) {
    var country1 = document.getElementById("country1").value;
  }else {
    var country1 = null;
  }
  if(document.getElementById("accountNumber1").value != null){
    var accountNumber1 = document.getElementById("accountNumber1").value;
  }else{
    var accountNumber1 = null;
  }
  var client =
    {
      'name' : name1,
      'shortName' : shortName1,
      'sector' : sector1,
      'code' : code1,
      'email' : email1,
      'phone' : phone1,
      'fax' : fax1,
      'street' : street1,
      'codePostal' : codePostal1,
      'province' : province1,
      'city' : city1,
      'country' : country1,
      'balance' : balance,
      'accountNumber' : accountNumber1,
      'codeCompany' : Session.get("COMPANY_CODE"),
      'logo' : '/home',
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow()
    };
  return client;
}
function getValuesFromFormForEditAu(){
  if (document.getElementById('name2') != null) {
    var name2 = document.getElementById("name2").value;
  }else {
    var name2 = null;
  }
  if (document.getElementById('shortName2') != null) {
    var shortName2 = document.getElementById("shortName2").value;
  }else {
    var shortName2 = null;
  }
  if (document.getElementById('sector2') != null) {
    var sector2 = document.getElementById("sector2").value;
  }else {
    var sector2 = null;
  }
  if (document.getElementById('code2') != null) {
    var code2 = document.getElementById("code2").value;
  }else {
    var code2 = null;
  }
  if (document.getElementById('email2') != null) {
    var email2 = document.getElementById("email2").value;
  }else {
    var email2 = null;
  }
  if (document.getElementById('balance1') != null) {
    var balance1 = document.getElementById("balance1").value;
  }else {
    var balance1 = null;
  }
  if (document.getElementById('phone2') != null) {
    var phone2 = document.getElementById("phone2").value;
  }else {
    var phone2 = null;
  }
  if (document.getElementById('fax2') != null) {
    var fax2 = document.getElementById("fax2").value;
  }else {
    var fax2 = null;
  }
  if (document.getElementById('street2') != null) {
    var street2 = document.getElementById("street2").value;
  }else {
    var street2 = null;
  }
  if (document.getElementById('codePostal2') != null) {
    var codePostal2 = document.getElementById("codePostal2").value;
  }else {
    var codePostal2 = null;
  }
  if (document.getElementById('province2') != null) {
    var province2 = document.getElementById("province2").value;
  }else {
    var province2 = null;
  }
  if (document.getElementById('city2') != null) {
    var city2 = document.getElementById("city2").value;
  }else {
    var city2 = null;
  }
  if (document.getElementById('country2') != null) {
    var country2 = document.getElementById("country2").value;
  }else {
    var country2 = null;
  }
  if(document.getElementById("accountNumber2").value != null){
    var accountNumber2 = document.getElementById("accountNumber2").value;
  }else{
    var accountNumber2 = null;
  }
  var client =
    {
      'name' : name2,
      'shortName' : shortName2,
      'sector' : sector2,
      'code' : code2,
      'email' : email2,
      'phone' : phone2,
      'fax' : fax2,
      'street' : street2,
      'codePostal' : codePostal2,
      'province' : province2,
      'city' : city2,
      'country' : country2,
      'balance' : balance1,
      'accountNumber' : accountNumber2,
      'codeCompany' : Session.get("COMPANY_CODE"),
      'logo' : '/home',
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow()
    };
  return client;
}
function sendCapsule(client, state){
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
  if(state == "add" ){
    var payload = {
      'att':['dn','objectClass','Eadress','Ebalance','ECode','EEmail','Efax','Ename','Ephone','ESector','EShortName','EuserAccountNum', 'Elogo'],
      'dn': 'ECode='+client.code+',o=Establishment,'+'CpCode='+companyCode+',o=Company,o=WebApp,dc=swallow,dc=tn',
      'objectClass': ['top','ClientEstablishment'],
      'Eadress': client.street+" "+client.codePostal+" "+client.province+" "+client.city+" "+client.country,
      'Ebalance': client.balance,
      'ECode': client.code,
      'EEmail': client.email,
      'Efax': client.fax,
      'Ename': client.name,
      'Ephone': client.phone,
      'ESector': client.sector,
      'EShortName': client.shortName,
      'EuserAccountNum': client.accountNumber,
      'Elogo': client.logo
    };
    capsule.sort = "LDAP_ADD_MSG";
    capsule.payload = payload;
  }else if( state == "edit"){
      var payload = {
        'att':['dn','changetype','replace'],
        'dn': 'ECode='+client.code+',o=Establishment,'+'CpCode='+companyCode+',o=Company,o=WebApp,dc=swallow,dc=tn','changetype': 'modify',
        'replace': ['Eadress','Ebalance','ECode','EEmail','Efax','Ename','Ephone','ESector','EShortName','EuserAccountNum', 'Elogo'] ,
        'Eadress': client.street+" "+client.codePostal+" "+client.province+" "+client.city+" "+client.country,
        'Ebalance': client.balance,
        'ECode': client.code,
        'EEmail': client.email,
        'Efax': client.fax,
        'Ename': client.name,
        'Ephone': client.phone,
        'ESector': client.sector,
        'EShortName': client.shortName,
        'EuserAccountNum': client.accountNumber,
        'Elogo': client.logo
      };
      capsule.sort = "LDAP_MOD_MSG";
      capsule.payload = payload;
  }else{
      //case "delete"
      var payload = {'dn': 'ECode='+client.code+',o=Establishment,'+'CpCode='+companyCode+',o=Company,o=WebApp,dc=swallow,dc=tn' };
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
function addAuthorised(code){
  var client = Clients_Live.findOne({ "code" : code });
  var users = Users_Live.find({ "code" : code });
  var usersNumber = users.count();
  console.log("Account Number :",client.accountNumber);
  console.log("Users Number: ",usersNumber);
  if((client.accountNumber - usersNumber) > 0){
    return true;
  }
  return false;
}
Template.companyClients.onCreated(function() {
  let clientsLive = Meteor.subscribe('clientsLive');
  /*console.log("CODE , ", Session.get("UserLogged").code);
  console.log(Session.get("COMPANY_ID"));
  if (Session.get("UserLogged").code == "0000") {// swallowlabs user
    var companyID = Session.get("COMPANY_ID");
    var table = companyID+'_clients_authorization';
    console.log(table);
    Clients_Authorization = new Mongo.Collection(table.toString());
    //Clients_Live = new Mongo.Collection(Session.get("COMPANY_ID")+'clients_live');
    //Clients_Authorization = new Mongo.Collection(Session.get("COMPANY_ID")+'clients_authorization');
    //Clients_History = new Mongo.Collection(Session.get("COMPANY_ID")+'clients_history');
  }else {
    Clients_Live = new Mongo.Collection(Session.get("UserLogged").code+'_clients_live');
    Clients_Authorization = new Mongo.Collection(Session.get("UserLogged").code+'_clients_authorization');
    Clients_History = new Mongo.Collection(Session.get("UserLogged").code+'_clients_history');
  }*/
});
Template.companyClients.onRendered(function(){
    checkSession();
    settingLanguage();
    var userLogged = Session.get("UserLogged");
    console.log("User logged (client) : ",userLogged);
    // Initialize dataTables
    $('.footable').footable();
    $('.footable2').footable();
    //$('body').append('<script type="text/javascript" src="client/plugins/dataTables/datatables.min.js"></script>');
    $(document).ready(function() {
       $('input[type="radio"]').click(function() {
           if($(this).attr('id') == 'radioX') {
              $('#show-me').show();
           }else {
              $('#show-me').hide();
           }
       });
     });
});
Template.companyClients.events({
  //              LIVE events            //
  'click .btnUsers'(){
    var client = Clients_Live.findOne({ "_id" : this._id });
    Session.set("CLIENT_CODE", client.code);
    Session.set("CLIENT_NAME", client.name);
  },
  'click .btnRoles'(){
    var client = Clients_Live.findOne({ "_id" : this._id });
    Session.set("CLIENT_CODE_X", client.code);
    Session.set("CLIENT_NAME_X", client.name);
  },
  'click .btnContents'(){
    var client = Clients_Live.findOne({ "_id" : this._id });
    Session.set("CLIENT_CODE", client.code);
    Session.set("CLIENT_NAME", client.name);
  },
  'click .newClient'(){
    $('#name').val("");
    $('#shortName').val("");
    $('#sector').val("");
    $('#code').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#fax').val("");
    $('#street').val("");
    $('#codePostal').val("");
    $('#province').val("");
    $('#city').val("");
    $('#country').val("");
    $('#newClientPopUp').modal();
  },
  'click .save'(){
    var client = getValuesFromFormForAdd();
    Clients_Authorization.insert(client);
    toastrSaveDone();
  },
  'click .validate'(){
    var client = getValuesFromFormForAdd();
    client.status = "INAU";
    Clients_Authorization.insert(client);
    toastrValidatonDone();
  },
  'click .btn-edit'() {
    var client = Clients_Live.findOne({ "_id" : this._id });
    if (verifyEdit(client._id)){
      Session.set("clientSelectedLive", client);
      $('#editClientPopUp').modal();
    }else{
      $('#edictState').modal();
    }
  },
  'click .saveUpdate'() {
    var clientUpdated = getValuesFromFormForEdit();
    var client = Session.get("clientSelectedLive");
    clientUpdated._id = client._id;
    clientUpdated.currentNumber = client.currentNumber + 1;
    Clients_Authorization.insert(clientUpdated);
    toastrModificationSaved();
  },
  'click .validateUpdate'() {
    var clientUpdated = getValuesFromFormForEdit();
    var client = Session.get("clientSelectedLive");
    clientUpdated._id = client._id;
    clientUpdated.currentNumber = client.currentNumber + 1
    clientUpdated.status = "INAU";
    Clients_Authorization.insert(clientUpdated);
    toastrModificationValidated();
  },
  'click .btn-details'() {
    var client = Clients_Live.findOne({ "_id" : this._id });
    var inputter = Users_Live.findOne({ "_id" : client.inputter });
    client.inputter = inputter.fname+" "+inputter.surname;
    var authorizer = Users_Live.findOne({ "_id" : client.authorizer });
    client.authorizer = authorizer.fname+" "+authorizer.surname;
    Session.set("ClientDetails",client);
    $('#clientDetailsPopUp').modal();
  },
  'click .btn-delete'() {
    var client = Clients_Live.findOne({ "_id" : this._id });
    if (verifyDelete(client._id)){
      $('#checkDeleting').modal();
      Session.set("ClientForDelete",client);
    }else{
      $('#deletionState').modal();
    }
  },
  'click .BtnDelete'() {
    var client = Session.get("ClientForDelete");
    client._id = client._id+"#D"
    client.status = "RNAU";
    client.inputter = Session.get("UserLogged")._id;
    client.dateTime = getDateNow();
    client.authorizer = null;
    Clients_Authorization.insert(client);
    toastrSuppression();
  },
  //          Authorization events            //
  'click .authorizeAu'() {
    settingLanguage();
    var oldClient = Clients_Live.findOne({ "_id" : this._id });
    var newClient = Clients_Authorization.findOne({ "_id" : this._id });
    Session.set("ClientAuthorized", newClient);
    if(oldClient == undefined){
      Session.set("OldClient", null);
    }else {
      var inputter = Users_Live.findOne({ "_id" : oldClient.inputter });
      oldClient.inputter = inputter.fname+" "+inputter.surname;
      var authorizer = Users_Live.findOne({ "_id" : oldClient.authorizer });
      oldClient.authorizer = authorizer.fname+" "+authorizer.surname;
      Session.set("OldClient", oldClient);
    }
    var inputter = Users_Live.findOne({ "_id" : newClient.inputter });
    newClient.inputter = inputter.fname+" "+inputter.surname;
    Session.set("NewClient", newClient);
    $('#checkAuthorising').modal();
  },
  'click .BtnAuthorize'() {
    var client = Session.get("ClientAuthorized");
    var query = Clients_Live.findOne({ "_id": client._id });
    console.log("Query :", query);
    if(query != undefined){
      // Update case
      // client exist in LIVE TABLE
      sendCapsule(client, "edit");
      console.log("edit");
    }
    var query2 = Clients_Authorization.findOne({ "_id": client._id });
    if(query == undefined && query2._id.indexOf("#D") < 0){
      sendCapsule(client, "add");
      console.log("add");
    }
    if(query2._id.indexOf("#D") > 0){
      sendCapsule(client, "delete");
      console.log("delete");
    }
    authorize(client);

  },
  'click .validateAu'() {
    var client = Clients_Authorization.findOne({ "_id" : this._id });
    Clients_Authorization.update({'_id' : client._id }, {'$set':{ 'status' : 'INAU', 'inputter' : Session.get("UserLogged")._id , 'dateTime' : getDateNow() }});
  },
  'click .editAu'() {
    var client = Clients_Authorization.findOne({ "_id" : this._id });
    Session.set("clientSelectedForUpdate", client);
    $('#editClientAuthorization').modal();
  },
  'click .saveUpdateAuthorization'() {
    var clientUpdated = getValuesFromFormForEditAu();
    var client = Session.get("clientSelectedForUpdate");
    clientUpdated._id = client._id;
    Clients_Authorization.remove(client._id);
    Clients_Authorization.insert(clientUpdated);
    toastrModificationSaved();
  },
  'click .validateUpdateAuthorization'() {
    var clientUpdated = getValuesFromFormForEditAu();
    var client = Session.get("clientSelectedForUpdate");
    clientUpdated.status = "INAU";
    clientUpdated._id = client._id;
    Clients_Authorization.remove(client._id);
    Clients_Authorization.insert(clientUpdated);
    toastrModificationValidated();
  },
  'click .cancelAu'() {
    Clients_Authorization.remove(this._id);
    toastrSuppression();
  },
  'click .detailsAu'() {
    var client = Clients_Authorization.findOne({ "_id" : this._id });
    var inputter = Users_Live.findOne({ "_id" : client.inputter });
    client.inputter = inputter.fname+" "+inputter.surname;
    var authorizer = Users_Live.findOne({ "_id" : client.authorizer });
    client.authorizer = authorizer.fname+" "+authorizer.surname;
    Session.set("ClientDetails", client);
    $('#clientDetailsPopUp').modal();
  },
});
Template.companyClients.helpers({
  role(){
    return Session.get("USER_ROLE_XX");
  },
  clientsLive(){
    return Clients_Live.find({ "codeCompany": Session.get("COMPANY_CODE") });
  },
  clientAuthorization(){
    var clients = Clients_Authorization.find({ "codeCompany": Session.get("COMPANY_CODE") });
    var clientsAuthorization = [];
    clients.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var client =
        {
          '_id' : doc._id,
          'name' : doc.name,
          'shortName' : doc.shortName,
          'code' : doc.code,
          'sector' : doc.sector,
          'email' : doc.email,
          'phone' : doc.phone,
          'fax' : doc.fax,
          'street' : doc.street,
          'codePostal' : doc.codePostal,
          'province' : doc.province,
          'city' : doc.city,
          'country' : doc.country,
          'balance' : doc.balance,
          'accountNumber' : doc.accountNumber,
          'logo' : doc.logo,
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
      clientsAuthorization.push(client);
    });
    return clientsAuthorization;
  },
  clientDetails(){
    return Session.get("ClientDetails");
  },
  clientSelected(){
    return Session.get("clientSelected");
  },
  clientSelectedLive(){
    return Session.get("clientSelectedLive");
  },
  clientSelectedAu(){
    return Session.get("clientSelectedForUpdate");
  },
  newClient() {
    return Session.get("NewClient");
  },
  oldClient() {
    return Session.get("OldClient");;
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
  rolesTitle(){
    return rolesTitle();
  },
  usersTitle(){
    return usersTitle();
  },
  contentsTitle(){
    return contentsTitle();
  },
  bookingsTitle(){
    return bookingsTitle();
  },
});
