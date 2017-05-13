Meteor.subscribe('companiesLive');
Meteor.subscribe('companiesAuthorization');

function authorize(company){
  if(company._id.indexOf("#") > 0){
    company._id = company._id.replace("#D", "");
  }
  var companyX = Companies_Live.findOne({ "_id" : company._id });
  // entry validated and new entry
  if(companyX !== undefined && company.status == "INAU"){
    company.status = "LIVE";
    company.authorizer = Session.get("UserLogged")._id;
    company.dateTime = getDateNow();
    companyX.status = 'HIS';
    companyX.dateTime = getDateNow();
    companyX.currentNumber = company.currentNumber;
    companyX._id = company._id+"#"+(company.currentNumber-1);
    Companies_History.insert(companyX);
    Companies_Live.remove(company._id);
    Companies_Live.insert(company);
    Companies_Authorization.remove(company._id);
  // Authorise deleting company
  }else if(companyX !== undefined && company.status == "RNAU"){
    company.authorizer= Session.get("UserLogged")._id;
    company.status = 'DEL';
    company.dateTime = getDateNow();
    Companies_History.insert(company);
    Companies_Live.remove(companyX._id);
    Companies_Authorization.remove(company._id);
    Companies_Authorization.remove(company._id+"#D");
  }else{
    company.status = "LIVE";
    company.authorizer = Session.get("UserLogged")._id;
    company.dateTime = getDateNow();
    Companies_Live.insert(company);
    Companies_Authorization.remove(company._id);
    // If company authorized, the app will create a directory inside /home/akrem/sshfs/display named "code" of the company
    //Meteor.call('createClientDirectory', client.code);
  }
}
function verifyDelete(id){
  var company = Companies_Authorization.findOne({ "_id" : id+"#D" });
  return company == undefined;
}
function verifyEdit(id){
  var company = Companies_Authorization.findOne({ "_id" : id });
  return company == undefined;
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
  var currency = document.getElementById('currency').value;
  var company =
    {
      '_id': country.substring(0,3)+"-"+Random.id(13),
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
      'pivotCurrency' : currency,
      'logo' : '',
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow()
    };
  return company;
}
function getValuesFromFormForEdit(){
  if (document.getElementById('name1') != null) {
    var name = document.getElementById("name1").value;
  }else {
    var name = null;
  }
  if (document.getElementById('shortName1') != null) {
    var shortName = document.getElementById("shortName1").value;
  }else {
    var shortName = null;
  }
  if (document.getElementById('sector1') != null) {
    var sector = document.getElementById("sector1").value;
  }else {
    var sector = null;
  }
  if (document.getElementById('code1') != null) {
    var code = document.getElementById("code1").value;
  }else {
    var code = null;
  }
  if (document.getElementById('email1') != null) {
    var email = document.getElementById("email1").value;
  }else {
    var email = null;
  }
  if (document.getElementById('phone1') != null) {
    var phone = document.getElementById("phone1").value;
  }else {
    var phone = null;
  }
  if (document.getElementById('fax1') != null) {
    var fax = document.getElementById("fax1").value;
  }else {
    var fax = null;
  }
  if (document.getElementById('street1') != null) {
    var street = document.getElementById("street1").value;
  }else {
    var street = null;
  }
  if (document.getElementById('codePostal1') != null) {
    var codePostal = document.getElementById("codePostal1").value;
  }else {
    var codePostal = null;
  }
  if (document.getElementById('province1') != null) {
    var province = document.getElementById("province1").value;
  }else {
    var province = null;
  }
  if (document.getElementById('city1') != null) {
    var city = document.getElementById("city1").value;
  }else {
    var city = null;
  }
  if (document.getElementById('country1') != null) {
    var country = document.getElementById("country1").value;
  }else {
    var country = null;
  }
  if (document.getElementById('currency1').value.length > 0) {
    var currency = document.getElementById('currency1').value;
  }else {
    var currency = Session.get("companySelectedLive").pivotCurrencyID;
  }

  var company =
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
      'pivotCurrency' : currency,
      'logo' : '',
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow()
    };
  return company;
}
function getValuesFromFormForEditAu(){
  if (document.getElementById('name2') != null) {
    var name = document.getElementById("name2").value;
  }else {
    var name = null;
  }
  if (document.getElementById('shortName2') != null) {
    var shortName = document.getElementById("shortName2").value;
  }else {
    var shortName = null;
  }
  if (document.getElementById('sector2') != null) {
    var sector = document.getElementById("sector2").value;
  }else {
    var sector = null;
  }
  if (document.getElementById('code2') != null) {
    var code = document.getElementById("code2").value;
  }else {
    var code = null;
  }
  if (document.getElementById('email') != null) {
    var email = document.getElementById("email2").value;
  }else {
    var email = null;
  }
  if (document.getElementById('phone') != null) {
    var phone = document.getElementById("phone2").value;
  }else {
    var phone = null;
  }
  if (document.getElementById('fax2') != null) {
    var fax = document.getElementById("fax2").value;
  }else {
    var fax = null;
  }
  if (document.getElementById('street2') != null) {
    var street = document.getElementById("street2").value;
  }else {
    var street = null;
  }
  if (document.getElementById('codePostal2') != null) {
    var codePostal = document.getElementById("codePostal2").value;
  }else {
    var codePostal = null;
  }
  if (document.getElementById('province2') != null) {
    var province = document.getElementById("province2").value;
  }else {
    var province = null;
  }
  if (document.getElementById('city2') != null) {
    var city = document.getElementById("city2").value;
  }else {
    var city = null;
  }
  if (document.getElementById('country2') != null) {
    var country = document.getElementById("country2").value;
  }else {
    var country = null;
  }
  if (document.getElementById('currency2').value.length > 0) {
    var currency = document.getElementById('currency2').value;
  }else {
    var currency = Session.get("companySelectedForUpdate").pivotCurrencyID;
  }

  var company =
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
      'pivotCurrency' : currency,
      'logo' : '',
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow()
    };
  return company;
}
function createCompanyAdminBranch(company){
  var d = new Date().toString();
  var res = d.split(" ");
  var date = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var capsule = {
    'id_sender': 20,
    'id_receiver': 50,
    'sort': null,
    'priority': 3,
    'payload': null,
    'type': 'PAYLOAD',
    'sending_date': date,
    'receiving_date': null,
    'status_capsule': "NO",
    'tts': 10,
    'ACK': "NO"
  };
  var payload = {
    'att':['dn','objectClass'],
    'dn': 'o=Admin,CpCode='+company.code+',o=Company,o=WebApp,dc=swallow,dc=tn',
    'objectClass': ['top','organization']
  };
  capsule.sort = "LDAP_ADD_MSG";
  capsule.payload = payload;
  Meteor.call('sendCapsule', capsule, function(error){
    if(error){
      alert('Send Capsule didnt work');
    }else{
      console.log("OK");
    }
  });
}
function createCompanyEstablishmentBranch(company){
  var d = new Date().toString();
  var res = d.split(" ");
  var date = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var capsule = {
    'id_sender': 20,
    'id_receiver': 50,
    'sort': null,
    'priority': 3,
    'payload': null,
    'type': 'PAYLOAD',
    'sending_date': date,
    'receiving_date': null,
    'status_capsule': "NO",
    'tts': 10,
    'ACK': "NO"
  };
  var payload = {
    'att':['dn','objectClass'],
    'dn': 'o=Establishment,CpCode='+company.code+',o=Company,o=WebApp,dc=swallow,dc=tn',
    'objectClass': ['top','organization']
  };
  capsule.sort = "LDAP_ADD_MSG";
  capsule.payload = payload;
  Meteor.call('sendCapsule', capsule, function(error){
    if(error){
      alert('Send Capsule didnt work');
    }else{
      console.log("OK");
    }
  });
}
//
function sendCapsule(company, state){
  // get currency name
  var currency = Currencies_Live.findOne({ "_id" : company.pivotCurrency });
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
      'att':['dn','objectClass','CpName','CpShortName','CpSector','CpCode','CpStreet','CpCodePostal','CpProvince','CpCity','CpCountry','CpCurrency','CpEmail','CpFax', 'CpPhone'],
      'dn': 'CpCode='+company.code+',o=Company,o=WebApp,dc=swallow,dc=tn',
      'objectClass': ['top','Company'],
      'CpProvince': company.province,
      'CpSector': company.sector,
      'CpShortName': company.shortName,
      'CpStreet': company.street,
      'CpCity': company.city,
      'CpCode': company.code,
      'CpCodePostal': company.codePostal,
      'CpCountry': company.country,
      'CpCurrency': currency.currencyName,
      'CpEmail': company.email,
      'CpFax': company.fax,
      'CpName': company.name,
      'CpPhone': company.phone
    };
    capsule.sort = "LDAP_ADD_MSG";
    capsule.payload = payload;
  }else if( state == "edit"){
    var payload = {
      'att':['dn','changetype','replace'],
      'dn': 'CpCode='+company.code+',o=Company,o=WebApp,dc=swallow,dc=tn','changetype': 'modify',
      'replace': ['CpName','CpShortName','CpSector','CpCode','CpStreet','CpCodePostal','CpProvince','CpCity','CpCountry','CpCurrency','CpEmail','CpFax', 'CpPhone'] ,
      'CpProvince': company.province,
      'CpSector': company.sector,
      'CpShortName': company.shortName,
      'CpStreet': company.street,
      'CpCity': company.city,
      'CpCode': company.code,
      'CpCodePostal': company.codePostal,
      'CpCountry': company.country,
      'CpCurrency': currency.currencyName,
      'CpEmail': company.email,
      'CpFax': company.fax,
      'CpName': company.name,
      'CpPhone': company.phone
    };
    capsule.sort = "LDAP_MOD_MSG";
    capsule.payload = payload;
  }else{
    //case "delete"
    var payload = {'dn': 'CpCode='+company.code+',o=Company,o=WebApp,dc=swallow,dc=tn' };
    capsule.sort = "LDAP_DEL_MSG";
    capsule.payload = payload;
  }
  Meteor.call('sendCapsule', capsule, function(error){
    if(error){
      alert('Send Capsule didnt work');
    }else{
      if(Session.get("UserLogged").language == "en"){
        toastr.success('With success','Authorization done ');
      }else {
        toastr.success('Avec succès','Autorisation fait !');
      }

      console.log("OK");
    }
  });
  setTimeout(function () {
    createCompanyEstablishmentBranch(company);
    createCompanyAdminBranch(company);
  }, 10000);
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
// A function which returns an array of currencies
function getCurrencies(id){
  var currencies = Currencies_Live.find();
  var arrayOfCurrencies = [];
  currencies.forEach(function(doc){
    if(doc._id == id){
      var currency =
        {
          '_id' : doc._id,
          'currencyName' : doc.currencyName,
          'currencyCode': doc.currencyCode,
          'status': true
        };
      arrayOfCurrencies.push(currency);
    }else {
      var currency =
        {
          '_id' : doc._id,
          'currencyName' : doc.currencyName,
          'currencyCode': doc.currencyCode,
          'status': false
        };
      arrayOfCurrencies.push(currency);
    }
  });
  return arrayOfCurrencies;
}
Template.allCompanies.onRendered(function(){
  settingLanguage();
  // Initialize the COMPANY_NAME session
  Session.set("COMPANY_NAME", null);
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
   $('#warning').hide();
   $('#warning_').hide();
});
Template.allCompanies.events({
  //              LIVE events            //
  'click .btnRoles'(){
    var company = Companies_Live.findOne({ "_id" : this._id });
    Session.set("COMPANY_ID", company._id);
    Session.set("COMPANY_NAME", company.name);
    Session.set("COMPANY_CODE", company.code);
  },
  'click .btnClients'(){
    //Meteor.call('getClientsByIDCompany', this._id);
    var company = Companies_Live.findOne({ "_id" : this._id });
    Session.set("COMPANY_ID", company._id);
    Session.set("COMPANY_NAME", company.name);
    Session.set("COMPANY_CODE", company.code);
  },
  'click .btnUsers'(){
    var company = Companies_Live.findOne({ "_id" : this._id });
    Session.set("COMPANY_ID", company._id);
    Session.set("COMPANY_NAME", company.name);
    Session.set("COMPANY_CODE", company.code);
  },
  'click .btnContrats'(){
    var company = Companies_Live.findOne({ "_id" : this._id });
    Session.set("COMPANY_ID", company._id);
    Session.set("COMPANY_NAME", company.name);
    Session.set("COMPANY_CODE", company.code);
  },
  'click .btnScreens'(){
    var company = Companies_Live.findOne({ "_id" : this._id });
    Session.set("COMPANY_ID", company._id);
    Session.set("COMPANY_NAME", company.name);
    Session.set("COMPANY_CODE", company.code);
  },
  'click .btnCurrencies'(){
    var company = Companies_Live.findOne({ "_id" : this._id });
    Session.set("COMPANY_ID", company._id);
    Session.set("COMPANY_NAME", company.name);
  },
  'click .newCompany'(){
    //Empty all inputs
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
    // Popup display
    $('#newCompany').modal();
  },
  'click .save'(){
    var company = getValuesFromFormForAdd();
    if (company.name.length == 0){
      $('#warning').show();
    }else {
      $('#newCompany').modal('hide');
      Companies_Authorization.insert(company);
      if(Session.get("UserLogged").language == "en"){
        toastr.success('With success','Save done !');
      }else {
        toastr.success('Avec succès','Enregistrer fait !');
      }
    }
     var client =
       {
         'name' : "name",
         'shortName' : "shortName"
       };
     _client_authorizationTable.insert(client);
  },
  'click .validate'(){
    var company = getValuesFromFormForAdd();
    if (company.name.length == 0){
      $('#warning').show();
    }else {
      $('#newCompany').modal('hide');
      company.status = "INAU";
      Companies_Authorization.insert(company);
      if(Session.get("UserLogged").language == "en"){
        toastr.success('With success','Validation done !');
      }else {
        toastr.success('Avec succès','Validation fait !');
      }
    }
  },
  'click .btn-edit'() {
    var company = Companies_Live.findOne({ "_id" : this._id });
    if (verifyEdit(company._id)){
      Session.set("CurrenciesList", getCurrencies(company.pivotCurrency));
      Session.set("companySelectedLive", company);
      $('#editCompanyLive').modal();
    }else{
      $('#edictState').modal();
    }
  },
  'click .saveUpdateLive'() {
    var companyUpdated = getValuesFromFormForEdit();
    var company = Session.get("companySelectedLive");
    companyUpdated._id = company._id;
    companyUpdated.currentNumber = company.currentNumber + 1;
    Companies_Authorization.insert(companyUpdated);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Update done !');
    }else {
      toastr.success('Avec succès','Modification fait !');
    }
  },
  'click .validateUpdateLive'() {
    var companyUpdated = getValuesFromFormForEdit();
    var company = Session.get("companySelectedLive");
    companyUpdated._id = company._id;
    companyUpdated.currentNumber = company.currentNumber + 1
    companyUpdated.status = "INAU";
    Companies_Authorization.insert(companyUpdated);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Update done !');
    }else {
      toastr.success('Avec succès','Modification fait !');
    }
  },
  'click .btn-details'() {
    var company = Companies_Live.findOne({ "_id" : this._id });
    var inputter = Users_Live.findOne({ "_id" : company.inputter });
    company.inputter = inputter.fname+" "+inputter.surname;
    var authorizer = Users_Live.findOne({ "_id" : company.authorizer });
    company.authorizer = authorizer.fname+" "+authorizer.surname;
    var currency = Currencies_Live.findOne({ "_id" : company.pivotCurrency });
    company.pivotCurrency = currency.currencyName;
    Session.set("CompanyDetails", company);
    $('#CompanyDetails').modal();
  },
  'click .btn-delete'() {
    var company = Companies_Live.findOne({ "_id" : this._id });
    if (verifyDelete(company._id)){
      $('#checkDeleting').modal();
      Session.set("CompanyForDelete", company);
    }else{
      $('#deletionState').modal();
    }
  },
  'click .BtnDelete'() {
    var company = Session.get("CompanyForDelete");
    company._id = company._id+"#D"
    company.status = "RNAU";
    company.inputter = Session.get("UserLogged")._id;
    company.dateTime = getDateNow();
    company.authorizer = null;
    Companies_Authorization.insert(company);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Deletion done !');
    }else {
      toastr.success('Avec succès','Suppression fait !');
    }
  },
  'click .upload'(){
    $('#uploadPopup').modal();
  },
  //          Authorization events            //
  'click .authorizeAu'() {
    settingLanguage();
    var oldCompany = Companies_Live.findOne({ "_id" : this._id });
    var newCompany = Companies_Authorization.findOne({ "_id" : this._id });
    Session.set("CompanyAuthorized", newCompany);
    if(oldCompany == undefined){
      console.log("NULL");
      Session.set("OldCompany", null);
    }else {
      var inputter = Users_Live.findOne({ "_id" : oldCompany.inputter });
      oldCompany.inputter = inputter.fname+" "+inputter.surname;
      var authorizer = Users_Live.findOne({ "_id" : oldCompany.authorizer });
      oldCompany.authorizer = authorizer.fname+" "+authorizer.surname;
      var currency = Currencies_Live.findOne({ "_id" : oldCompany.pivotCurrency });
      oldCompany.pivotCurrency = currency.currencyName;
      Session.set("OldCompany", oldCompany);
    }
    var currency = Currencies_Live.findOne({ "_id" : newCompany.pivotCurrency });
    newCompany.pivotCurrency = currency.currencyName;
    var inputter = Users_Live.findOne({ "_id" : newCompany.inputter });
    newCompany.inputter = inputter.fname+" "+inputter.surname;
    Session.set("NewCompany", newCompany);

    $('#checkAuthorising').modal();
  },
  'click .BtnAuthorize'() {
    var company = Session.get("CompanyAuthorized");
    var query = Companies_Live.findOne({ "_id": company._id });
    console.log("Query :", query);
    if(query != undefined){
      // Update case
      // client exist in LIVE TABLE
      sendCapsule(company, "edit");
      console.log("edit");
    }
    var query2 = Companies_Authorization.findOne({ "_id": company._id });
    if(query == undefined && query2._id.indexOf("#D") < 0){
      sendCapsule(company, "add");
      console.log("add");
    }
    if(query2._id.indexOf("#D") > 0){
      sendCapsule(company, "delete");
      console.log("delete");
    }
    authorize(company);
  },
  'click .validateAu'() {
    var company = Companies_Authorization.findOne({ "_id" : this._id });
    Companies_Authorization.update({'_id' : company._id }, {'$set':{ 'status' : 'INAU', 'inputter' : Session.get("UserLogged")._id , 'dateTime' : getDateNow() }});
  },
  'click .editAu'() {
    var company = Companies_Authorization.findOne({ "_id" : this._id });
    Session.set("CurrenciesList", getCurrencies(company.pivotCurrency));
    Session.set("companySelectedForUpdate", company);
    $('#editCompanyAuthorization').modal();
  },
  'click .saveUpdateAuthorization'() {
    var companyUpdated = getValuesFromFormForEditAu();
    var company = Session.get("companySelectedForUpdate");
    companyUpdated._id = company._id;
    Companies_Authorization.remove(company._id);
    Companies_Authorization.insert(companyUpdated);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Edict done !');
    }else {
      toastr.success('Avec succès','Modification fait !');
    }
  },
  'click .validateUpdateAuthorization'() {
    var companyUpdated = getValuesFromFormForEditAu();
    var company = Session.get("companySelectedForUpdate");
    companyUpdated.status = "INAU";
    companyUpdated._id = company._id;
    Companies_Authorization.remove(company._id);
    Companies_Authorization.insert(companyUpdated);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Edict done !');
    }else {
      toastr.success('Avec succès','Modification fait !');
    }
  },
  'click .cancelAu'() {
    var company = Companies_Authorization.findOne({ "_id" : this._id });
    Session.set("companyDeletingAuth", company);
    $('#checkCancel').modal();
  },
  'click .BtnCancel'() {
    var company = Session.get("companyDeletingAuth");
    Companies_Authorization.remove(company._id);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Deletion operation done ');
    }else {
      toastr.success('Avec succès','Suppression fait !');
    }
  },
  'click .detailsAu'() {
    var company = Companies_Authorization.findOne({ "_id" : this._id });
    var inputter = Users_Live.findOne({ "_id" : company.inputter });
    company.inputter = inputter.fname+" "+inputter.surname;
    var currency = Currencies_Live.findOne({ "_id" : company.pivotCurrency });
    company.pivotCurrency = currency.currencyName;
    Session.set("CompanyDetails", company);
    $('#CompanyDetails').modal();
  },
});
Template.allCompanies.helpers({
  companiesLive(){
    return Companies_Live.find({});
  },
  companiesAuthorization(){
    var companies = Companies_Authorization.find({});
    var companiesAuthorization = [];
    companies.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var company =
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
          'currencyPivot' : doc.country,
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
      companiesAuthorization.push(company);
    });
    return companiesAuthorization;
  },
  currencies(){
    return Currencies_Live.find();
  },
  role(){
    return Session.get("USER_ROLE_XX");
  },
  companyDetails(){
    return Session.get("CompanyDetails");
  },
  clientSelected(){
    return Session.get("clientSelected");
  },
  companySelectedLive(){
    return Session.get("companySelectedLive");
  },
  companySelectedAu(){
    return Session.get("companySelectedForUpdate");
  },
  currenciesSelected(){
    return Session.get("CurrenciesList");
  },
  newCompany() {
    return Session.get("NewCompany");
  },
  oldCompany() {
    return Session.get("OldCompany");;
  },
  equals: function(v1, v2) {
    return (v1 === v2);
  },
  notEquals: function(v1, v2) {
    return (v1 != v2);
  },
});
