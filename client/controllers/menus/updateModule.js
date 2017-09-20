function getValuesFromForm(){
  if (document.getElementById('name') != null) {
    var name = document.getElementById("name").value;
  }else {
    var name = null;
  }
  if (document.getElementById('description') != null) {
    var description = document.getElementById("description").value;
  }else {
    var description = null;
  }
  var actions = "";
  var myOpts = $('#selectBox option:selected');
  if(myOpts.length > 0){
    for(var i=0; i < myOpts.length; i++){
      actions += myOpts[i].value+"#";
    }
  }
  var concerned = "";
  var myOpts = $('#selectBox_ option:selected');
  if(myOpts.length > 0){
    for(var i=0; i < myOpts.length; i++){
      concerned += myOpts[i].value+"#";
    }
  }
  var module =
    {
      '_id': Session.get("ModuleSelected")._id,
      'name' : name,
      'description' : description,
      'listOfActions': actions.substring(0, actions.length-1),
      'concerned': concerned.substring(0, concerned.length-1),
      'currentNumber': Session.get("ModuleSelected").currentNumber,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow()
    };
  return module;
}
Template.updateModule.rendered = function(){
  settingLanguage();
  $(document).ready(function () {
    $('#check').change(function () {
        if (!this.checked)
           $('#select').show();
        else
            $('#select').hide();
      });
  });
  $('#warning').hide();
  $(".select2_demo_2").select2();
};
Template.updateModule.events({
  'click .save'() {
    if(Session.get("TYPE_UPDATE") == "LIVE"){
      var module = getValuesFromForm();
      module.currentNumber = module.currentNumber+1;
      Modules_Authorization.insert(module);
      toastrModificationSaved();
      Router.go('allModules');
    }else {
      var module = getValuesFromForm();
      module.currentNumber = 0;
      Modules_Authorization.remove(module._id);
      Modules_Authorization.insert(module);
      toastrModificationSaved();
      Router.go('allModules');
    }
  },
  'click .validate'() {
    if(Session.get("TYPE_UPDATE") == "LIVE"){
      var module = getValuesFromForm();
      module.status = "INAU";
      module.currentNumber = module.currentNumber+1;
      Modules_Authorization.insert(module);
      toastrModificationValidated();
      Router.go('allModules');
    }else {
      var module = getValuesFromForm();
      module.status = "INAU";
      module.currentNumber = 0;
      Modules_Authorization.remove(module._id);
      Modules_Authorization.insert(module);
      toastrModificationValidated();
      Router.go('allModules');
    }
  },
});
Template.updateModule.helpers({
  moduleSelected(){
    return Session.get("ModuleSelected");
  },
  actions(){
    return Actions.find();
  },
  actionsSelected(){
    return Session.get("ARRAY_OF_ACTIONS");
  },
  usersSelected(){
    return Session.get("ARRAY_OF_CONCERNED");
  },
  equals: function(v1, v2) {
    return (v1 == v2);
  },
});
