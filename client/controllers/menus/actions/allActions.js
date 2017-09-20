Meteor.subscribe('actions');
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
  var action =
    {
      'name' : name,
      'description': description,
      'inputter': Session.get("UserLogged")._id,
      'dateTime': getDateNow()
    };
  return action;
}
function getValuesFromFormUpdate(){
  if (document.getElementById('name_') != null) {
    var name = document.getElementById("name_").value;
  }else {
    var name = null;
  }
  if (document.getElementById('description_') != null) {
    var description = document.getElementById("description_").value;
  }else {
    var description = null;
  }
  var action =
    {
      'name' : name,
      'description': description,
      'inputter': Session.get("UserLogged")._id,
      'dateTime': getDateNow()
    };
  return action;
}
Template.allActions.rendered = function(){
  settingLanguage();
  // Initialize fooTable
  $('.footable').footable();
  $('#warning').hide();
};
Template.allActions.events({
  'click .newAction'() {
    // To empty all inputs
    $('#name').val("");
    $('#description').val("");
    $('#newAction').modal();
  },
  'click .save'() {
    var action = getValuesFromForm();
    if (action.name.length == 0){
      $('#warning').show();
    }else {
      $('#newAction').modal('hide');
      Actions.insert(action);
      toastrSaveDone();
    }
  },
  'click .btn-delete'() {
    $('#checkDeleting').modal();
    Session.set("Id_Action", this._id);
  },
  'click .BtnDelete'() {
    Actions.remove(Session.get("Id_Action"));
    toastrSuppression();
  },
  'click .btn-edit'() {
    var action = Actions.findOne({ "_id" : this._id });
    Session.set("ActionToUpdate", action);
    $('#editAction').modal();
  },
  'click .update'() {
    var action = getValuesFromFormUpdate();
    var act = Session.get("ActionToUpdate");
    action._id = act._id;
    Actions.remove(act._id);
    Actions.insert(action);
    $('#editAction').modal('hide');
    toastrModificationSaved();
  },
  'click .btn-details'() {
    var action = Actions.findOne({ "_id" : this._id });
    var inputter = Users_Live.findOne({ "_id" : action.inputter });
    action.inputter = inputter.fname+" "+inputter.surname;
    Session.set("ActionDetails", action);
    $('#ActionDetails').modal();
  },
});
Template.allActions.helpers({
  actions (){
    return Actions.find();
  },
  ActionToUpdate (){
    return Session.get("ActionToUpdate");
  },
  ActionDetails (){
    return Session.get("ActionDetails");
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
