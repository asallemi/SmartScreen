Meteor.subscribe('actions');
Meteor.subscribe('modulesLive');
Meteor.subscribe('modulesAuthorization');

authorize = function (module){
  if(module._id.indexOf("#") > 0){
    module._id = module._id.replace("#D", "");
  }
  var moduleX = Modules_Live.findOne({ "_id" : module._id });
  // entry validated and new entry
  if(moduleX !== undefined && module.status == "INAU"){
    module.status = "LIVE";
    module.authorizer = Session.get("UserLogged")._id;
    module.dateTime = getDateNow();
    moduleX.status = 'HIS';
    moduleX.dateTime = getDateNow();
    moduleX.currentNumber = module.currentNumber;
    moduleX._id = module._id+"#"+(module.currentNumber-1);
    Modules_History.insert(moduleX);
    Modules_Live.remove(module._id);
    Modules_Live.insert(module);
    Modules_Authorization.remove(module._id);
  // Authorise deleting module
  }else if(moduleX !== undefined && module.status == "RNAU"){
    module.authorizer= Session.get("UserLogged")._id;
    module.status = 'DEL';
    module.dateTime = getDateNow();
    Modules_History.insert(module);
    Modules_Live.remove(moduleX._id);
    Modules_Authorization.remove(module._id);
    Modules_Authorization.remove(module._id+"#D");
  }else{
    module.status = "LIVE";
    module.authorizer = Session.get("UserLogged")._id;
    module.dateTime = getDateNow();
    Modules_Live.insert(module);
    Modules_Authorization.remove(module._id);
  }
}
function verifyDelete(id){
  var module = Modules_Authorization.findOne({ "_id" : id+"#D" });
  return module == undefined;
}
function verifyEdit(id){
  var module = Modules_Authorization.findOne({ "_id" : id });
  return module == undefined;
}
// A function which returns an array of all actions
function getAllActions(listOfActions){
  var arrayOfActions = listOfActions.split("#");
  var allActions = Actions.find().fetch();
  for (var i = 0; i < allActions.length; i++) {
    allActions[i] = allActions[i].name;
  }
  var arrayOfSelectedActions = [];
  for (var i = 0; i < allActions.length; i++) {
    if (arrayOfActions.indexOf(allActions[i]) > -1) { // action exist in the array of actions
      var action = {
        'name': allActions[i],
        'status': true
      }
    }else {
      var action = {
        'name': allActions[i],
        'status': false
      }
    }
    arrayOfSelectedActions.push(action);
  }
  return arrayOfSelectedActions;
}
// A function which returns an array of concerned users
function getAllConcernedUsers(concerned){
  var allConcerned = concerned.split("#");
  var arrayOfConcerned = ["swallow-labs", "company", "client"];
  var concernedUsers = [];
  for (var i = 0; i < arrayOfConcerned.length; i++) {
    if (allConcerned.indexOf(arrayOfConcerned[i]) > -1) {
      var user = {
        'name': arrayOfConcerned[i],
        'status': true
      }
    }else {
      var user = {
        'name': arrayOfConcerned[i],
        'status': false
      }
    }
    concernedUsers.push(user);
  }
  return concernedUsers;
}
Template.allModules.rendered = function(){
  settingLanguage();
  // Initialize fooTable
  $('.footable').footable();
  $('.footable2').footable();
};
Template.allModules.events({
  'click .newAction'() {
    Router.go('allActions');
  },
  'click .newModule'() {
    Router.go('newModule');
  },
  'click .validateAu'() {
    var module = Modules_Authorization.findOne({ "_id" : this._id });
    Modules_Authorization.update({'_id' : module._id }, {'$set':{ 'status': 'INAU', 'inputter':  Session.get("UserLogged")._id, 'dateTime': getDateNow() }});
  },
  'click .editAu'() {
    var module = Modules_Authorization.findOne({ "_id" : this._id });
    // The session "TYPE_UPDATE" specify the type of update (from live or from authorization state)
    Session.set("TYPE_UPDATE", "AUTH");
    Session.set("ARRAY_OF_CONCERNED", getAllConcernedUsers(module.concerned));
    Session.set("ARRAY_OF_ACTIONS", getAllActions(module.listOfActions));
    Session.set("ModuleSelected", module);
    Router.go('updateModule');
  },
  'click .authorizeAu'() {
    settingLanguage();
    var oldModule = Modules_Live.findOne({ "_id" : this._id });
    var newModule = Modules_Authorization.findOne({ "_id" : this._id });
    Session.set("ModuleAuthorized", newModule);
    if(oldModule == undefined){
      Session.set("OldModule", null);
    }else {
      var inputter = Users_Live.findOne({ "_id" : oldModule.inputter });
      oldModule.inputter = inputter.fname+" "+inputter.surname;
      var authorizer = Users_Live.findOne({ "_id" : oldModule.authorizer });
      oldModule.authorizer = authorizer.fname+" "+authorizer.surname;
      Session.set("OldModule", oldModule);
    }
    var inputter = Users_Live.findOne({ "_id" : newModule.inputter });
    newModule.inputter = inputter.fname+" "+inputter.surname;
    newModule.listOfActions = newModule.listOfActions.replace("#", " ")
    Session.set("NewModule", newModule);
    $('#checkAuthorising').modal();
  },
  'click .BtnAuthorize'() {
    var module = Session.get("ModuleAuthorized");
    authorize(module);
    toastrAuthorizationDone();
  },
  'click .cancelAu'() {
    var module = Modules_Authorization.findOne({ "_id" : this._id });
    Session.set("moduleDeletingAuth", module);
    $('#checkCancel').modal();
  },
  'click .BtnCancel'() {
    var module = Session.get("moduleDeletingAuth");
    Modules_Authorization.remove(module._id);
    toastrSuppression();
  },
  'click .detailsAu'() {
    var module = Modules_Authorization.findOne({ "_id" : this._id });
    var inputter = Users_Live.findOne({ "_id" : module.inputter });
    module.inputter = inputter.fname+" "+inputter.surname;
    Session.set("ModuleDetails", module);
    $('#ModuleDetails').modal();
  },
  'click .btn-details'() {
    var module = Modules_Live.findOne({ "_id" : this._id });
    var inputter = Users_Live.findOne({ "_id" : module.inputter });
    module.inputter = inputter.fname+" "+inputter.surname;
    var authorizer = Users_Live.findOne({ "_id" : module.authorizer });
    module.authorizer = authorizer.fname+" "+authorizer.surname;
    var actions = module.listOfActions.split("#");
    var listOfActions = "";
    for (var i = 0; i < actions.length; i++) {
      listOfActions = actions[i]+"|"+listOfActions;
    }

    module.listOfActions = listOfActions.substring(0, listOfActions.length-1);
    var list = module.concerned.split("#");
    var concerned = "";
    for (var i = 0; i < list.length; i++) {
      concerned = list[i]+"|"+concerned;
    }
    module.concerned = concerned.substring(0, concerned.length-1);
    Session.set("ModuleDetails", module);
    $('#ModuleDetails').modal();
  },
  'click .btn-edit'() {
    var module = Modules_Live.findOne({ "_id" : this._id });
    if (verifyEdit(module._id)){
      Session.set("TYPE_UPDATE", "LIVE");
      Session.set("ModuleSelected", module);
      Session.set("ARRAY_OF_CONCERNED", getAllConcernedUsers(module.concerned));
      Session.set("ARRAY_OF_ACTIONS", getAllActions(module.listOfActions));
      Router.go('updateModule');
    }else{
      $('#edictState').modal();
    }
  },
  'click .btn-delete'() {
    var module = Modules_Live.findOne({ "_id" : this._id });
    if (verifyDelete(module._id)){
      $('#checkDeleting').modal();
      Session.set("ModuleForDelete", module);
    }else{
      $('#deletionState').modal();
    }
  },
  'click .BtnDelete'() {
    var module = Session.get("ModuleForDelete");
    module._id = module._id+"#D"
    module.status = "RNAU";
    module.inputter = Session.get("UserLogged")._id;
    module.dateTime = getDateNow();
    module.authorizer = null;
    Modules_Authorization.insert(module);
    toastrSuppression();
  },
});
Template.allModules.helpers({
  modulesLive (){
    return Modules_Live.find();
    /*var modules = Modules_Live.find();
    var modulesLive = [];
    modules.forEach(function(doc){
      var actions = doc.listOfActions.split("#");
      var listOfActions = "";
      for (var i = 0; i < actions.length; i++) {
        listOfActions = actions[i]+"|"+listOfActions;
      }
      var list = doc.concerned.split("#");
      var concerned = "";
      for (var i = 0; i < list.length; i++) {
        concerned = list[i]+"|"+concerned;
      }
      var module = {
          '_id' : doc._id,
          'name' : doc.name,
          'description' : doc.description,
          'listOfActions': listOfActions.substring(0, listOfActions.length-1),
          'concerned': concerned.substring(0, concerned.length-1),
          'currentNumber': doc.currentNumber,
          'status': doc.status,
          'inputter': doc.inputter,
          'authorizer': doc.authorizer,
          'dateTime': doc.dateTime
      };
      modulesLive.push(module);
    });
    return modulesLive;*/
  },
  modulesAuthorization (){
    var modules = Modules_Authorization.find();
    var modulesAuthorization = [];
    modules.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var actions = doc.listOfActions.split("#");
      var listOfActions = "";
      for (var i = 0; i < actions.length; i++) {
        listOfActions = actions[i]+"|"+listOfActions;
      }
      var list = doc.concerned.split("#");
      var concerned = "";
      for (var i = 0; i < list.length; i++) {
        concerned = list[i]+"|"+concerned;
      }
      var module = {
          '_id' : doc._id,
          'name' : doc.name,
          'description' : doc.description,
          'listOfActions': listOfActions.substring(0, listOfActions.length-1),
          'concerned': concerned.substring(0, concerned.length-1),
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
      modulesAuthorization.push(module);
    });
    return modulesAuthorization;
  },
  newModule() {
    return Session.get("NewModule");
  },
  oldModule() {
    return Session.get("OldModule");;
  },
  moduleDetails(){
    return Session.get("ModuleDetails");
  },
  role(){
    return Session.get("USER_ROLE_XX");
  },
  equals: function(v1, v2) {
    return (v1 == v2);
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
});
