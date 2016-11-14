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

//login
Router.route('/login',  {
  layoutTemplate: 'loginLayout',
  name : 'login'
});
//OTP
Router.route('/otp',  {
  layoutTemplate: 'loginLayout',
  name : 'otp'
});
//home
Router.route('/home', {
  layoutTemplate: 'mainLayout',
  name: 'home'
});
//home
Router.route('/accounts', {
  layoutTemplate: 'mainLayout',
  name: 'allAccounts'
});
// Segment
Router.route('/Segment',{
  layoutTemplate: 'mainLayout',
  name: 'segment'
});
// Booking
Router.route('/newBooking',{
  layoutTemplate: 'mainLayout',
  name: 'newBooking'
});
Router.route('/allBookings',{
  layoutTemplate: 'mainLayout',
  name: 'allBookings'
});
// Content
Router.route('/newContent',{
  layoutTemplate: 'mainLayout',
  name: 'newContent'
});
Router.route('/allContents',{
  layoutTemplate: 'mainLayout',
  name: 'allContents'
});
// client
Router.route('/client',{
  layoutTemplate: 'mainLayout',
  name: 'allclients'
 });
// Landing page
Router.route('/landing',{
  layoutTemplate: 'mainLayout',
  name: 'blankLayout'
});
// Other pages routes
Router.route('/notFound',{
  layoutTemplate: 'mainLayout',
  name: 'notFound'
});
// Default route
// You can use direct name: ('template')
// We use Router.go method because dashboard1 is our nested view in menu
Router.route('/', function () {
    Router.go('login');
});
