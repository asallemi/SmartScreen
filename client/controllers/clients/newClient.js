Clients = new Mongo.Collection('clients');

Template.newClient.events({
  'submit .form-horizontal'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const shortname = target.shortname.value;
    const name = target.name.value;
    const code = target.code.value;
    const description = target.description.value;
    const balance = target.balance.value;
    //const type = template.find('input:radio[name=type]:checked');

    // Insert a task into the collection
    Clients.insert({
      shortname,
      name,
      code,
      description,
      balance,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.shortname.value = '';
    target.name.value = '';
    target.code.value = '';
    target.description.value = '';
    target.balance.value = '';
  },
});

Template.newClient.rendered = function(){

    // Initialize i-check plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body");

};
