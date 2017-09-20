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
      'name' : name,
      'description' : description,
      'listOfActions': actions.substring(0, actions.length-1),
      'concerned': concerned.substring(0, concerned.length-1),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': getDateNow()
    };
  return module;
}
Template.newModule.rendered = function(){
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
Template.newModule.events({
  'click .save'() {
    var module = getValuesFromForm();
    Modules_Authorization.insert(module);
    toastrSaveDone();
    Router.go('allModules');
  },
  'click .validate'() {
    var module = getValuesFromForm();
    module.status = "INAU";
    Modules_Authorization.insert(module);
    toastrValidatonDone();
    Router.go('allModules');
  },
});
Template.newModule.helpers({
  actions(){
    return Actions.find();
  },
  screens(){
    return Session.get("ScreensList");
  },
  equals: function(v1, v2) {
    return (v1 == v2);
  },
});
