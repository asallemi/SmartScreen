Template.allclients.rendered = function(){

    // Initialize dataTables
    $('.dataTables-example').DataTable();
    /*$('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

        ]

    });*/
    $(newClient).click(function(){
      $('#newClientPopUp').modal();
    });

};
