Roles = new Mongo.Collection('roles');
let rolesHandle = Meteor.subscribe('roles');
Template.allRoles.rendered = function(){
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
    $(newRole).click(function(){
      $('#newRolePopup').modal();
    });
    // Initialize i-check plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
};
Template.allRoles.events({
  'submit .form'(event) {
    event.preventDefault();
    const target = event.target;
    const roleName = target.roleName.value;
    var role =
      {
        'roleName': roleName,
        'accountAdd': $('input[name="accountAdd"]:checked').val(),
        'accountUpdate': $('input[name="accountUpdate"]:checked').val(),
        'accountDelete': $('input[name="accountDelete"]:checked').val(),
        'accountDisplay': $('input[name="accountDisplay"]:checked').val(),
        'accountPrint': $('input[name="accountPrint"]:checked').val(),
        'accountValidate': $('input[name="accountValidate"]:checked').val(),
        'contractAdd': $('input[name="contractAdd"]:checked').val(),
        'contractUpdate': $('input[name="contractUpdate"]:checked').val(),
        'contractDelete': $('input[name="contractDelete"]:checked').val(),
        'contractDisplay': $('input[name="contractDisplay"]:checked').val(),
        'contractPrint': $('input[name="contractPrint"]:checked').val(),
        'contractValidate': $('input[name="contractValidate"]:checked').val(),
        'contractSign': $('input[name="contractSign"]:checked').val(),
        'articleAdd': $('input[name="articleAdd"]:checked').val(),
        'articleUpdate': $('input[name="articleUpdate"]:checked').val(),
        'articleDelete': $('input[name="articleDelete"]:checked').val(),
        'articleDisplay': $('input[name="articleDisplay"]:checked').val(),
        'articlePrint': $('input[name="articlePrint"]:checked').val(),
        'articleValidate': $('input[name="articleValidate"]:checked').val(),
        'invoiceAdd': $('input[name="invoiceAdd"]:checked').val(),
        'invoiceUpdate': $('input[name="invoiceUpdate"]:checked').val(),
        'invoiceDelete': $('input[name="invoiceDelete"]:checked').val(),
        'invoiceDisplay': $('input[name="invoiceDisplay"]:checked').val(),
        'invoicePrint': $('input[name="invoicePrint"]:checked').val(),
        'invoiceValidate': $('input[name="invoiceValidate"]:checked').val(),
        'clientAdd': $('input[name="clientAdd"]:checked').val(),
        'clientUpdate': $('input[name="clientUpdate"]:checked').val(),
        'clientDelete': $('input[name="clientDelete"]:checked').val(),
        'clientDisplay': $('input[name="clientDisplay"]:checked').val(),
        'clientPrint': $('input[name="clientPrint"]:checked').val(),
        'clientValidate': $('input[name="clientValidate"]:checked').val(),
        'clientAccountManagement': $('input[name="clientAccountManagement"]:checked').val(),
        'screenUpdate': $('input[name="screenUpdate"]:checked').val(),
        'screenDelete': $('input[name="screenDelete"]:checked').val(),
        'screenDisplay': $('input[name="screenDisplay"]:checked').val(),
        'screenPrint': $('input[name="screenPrint"]:checked').val(),
        'screenValidate': $('input[name="screenValidate"]:checked').val(),
        'screenShow': $('input[name="screenShow"]:checked').val(),
        'screenUpdateSystem': $('input[name="screenUpdateSystem"]:checked').val(),
        'screenClear': $('input[name="screenClear"]:checked').val(),
        'screenMonitor': $('input[name="screenMonitor"]:checked').val(),
        'screenActivate': $('input[name="screenActivate"]:checked').val(),
        'screenOnOff': $('input[name="screenOnOff"]:checked').val(),
        'segmentUpdate': $('input[name="segmentUpdate"]:checked').val(),
        'segmentDelete': $('input[name="segmentDelete"]:checked').val(),
        'segmentDisplay': $('input[name="segmentDisplay"]:checked').val(),
        'segmentPrint': $('input[name="segmentPrint"]:checked').val(),
        'segmentAffect': $('input[name="segmentAffect"]:checked').val(),
        'segmentValidate': $('input[name="segmentValidate"]:checked').val(),
        'tariffAdd': $('input[name="tariffAdd"]:checked').val(),
        'tariffUpdate': $('input[name="tariffUpdate"]:checked').val(),
        'tariffDelete': $('input[name="tariffDelete"]:checked').val(),
        'tariffDisplay': $('input[name="tariffDisplay"]:checked').val(),
        'tariffPrint': $('input[name="tariffPrint"]:checked').val(),
        'tariffAffect': $('input[name="tariffAffect"]:checked').val(),
        'tariffValidate': $('input[name="tariffValidate"]:checked').val(),
        'bookingAdd': $('input[name="bookingAdd"]:checked').val(),
        'bookingUpdate': $('input[name="bookingUpdate"]:checked').val(),
        'bookingDelete': $('input[name="bookingDelete"]:checked').val(),
        'bookingDisplay': $('input[name="bookingDisplay"]:checked').val(),
        'bookingPrint': $('input[name="bookingPrint"]:checked').val(),
        'bookingValidate': $('input[name="bookingValidate"]:checked').val(),
        'contentAdd': $('input[name="contentAdd"]:checked').val(),
        'contentDelete': $('input[name="contentDelete"]:checked').val(),
        'contentDisplay': $('input[name="contentDisplay"]:checked').val(),
        'contentValidate': $('input[name="contentValidate"]:checked').val(),
        'roleAdd': $('input[name="roleAdd"]:checked').val(),
        'roleUpdate': $('input[name="roleUpdate"]:checked').val(),
        'roleDelete': $('input[name="roleDelete"]:checked').val(),
        'roleDisplay': $('input[name="roleDisplay"]:checked').val(),
        'rolePrint': $('input[name="rolePrint"]:checked').val(),
        'roleAffect': $('input[name="roleAffect"]:checked').val(),
        'roleValidate': $('input[name="roleValidate"]:checked').val(),
        'signatureAdd': $('input[name="signatureAdd"]:checked').val()
      };
    Roles.insert(role);
    swal("Success !", "Role saved with success", "success");
    target.roleName.value = '';
    Session.set("AllRoles",Roles.find());
    location.reload();
  },
  'click .btn-edit'() {
    var role = Roles.findOne({ "_id" : this._id });
    console.log("Role name :",role.roleName);
    Session.set("roleSelected", role);
    $('#editRolePopup').modal();
  },
});
Template.allRoles.helpers({
  roles() {
    return Roles.find();
  },
  roleSelected() {
    return Session.get("roleSelected");
  },
});
