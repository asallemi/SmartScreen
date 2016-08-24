//Layout Configuration
Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'
});
Router.configure({
      layoutTemplate:"loginLayout",
      notFoundTemplate: 'notFound'
});
// END Layout Configuration

//Simple Routes Config.
Router.route('/login',  {
      layoutTemplate: 'loginLayout'
});

Router.route('/home', {
      layoutTemplate: 'mainLayout'
});

//Login page
Router.route('/login',{
      name: 'login'
});
//Home page
Router.route('/home',{
      name: 'home'
});
// Booking
Router.route('/newBooking',{
      name: 'newBooking'
});
Router.route('/allBookings',{
      name: 'allBookings'
});
// client
Router.route('/newClient',{
      name: 'newClient'
 });
// Landing page
Router.route('/landing',{
      name: 'blankLayout'
});
// Other pages routes
Router.route('/notFound',{
      name: 'notFound'
});
// Default route
// You can use direct name: ('template')
// We use Router.go method because dashboard1 is our nested view in menu
Router.route('/', function () {
    Router.go('login');
});
