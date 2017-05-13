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
//Accounts
Router.route('/accounts', {
  layoutTemplate: 'mainLayout',
  name: 'allAccounts'
});
Router.route('/companyAccounts', {
  layoutTemplate: 'mainLayout',
  name: 'companyAccounts'
});
//Roles
Router.route('/roles', {
  layoutTemplate: 'mainLayout',
  name: 'allRoles'
});
Router.route('/companyRoles', {
  layoutTemplate: 'mainLayout',
  name: 'companyRoles'
});

// Contracts
Router.route('/contract',{
    layoutTemplate: 'mainLayout',
    name: 'contract'
});
Router.route('/editContract',{
    layoutTemplate: 'mainLayout',
    name: 'editContract'
});
Router.route('/allContracts',{
   layoutTemplate: 'mainLayout',
   name: 'allContracts'
});
Router.route('/currencies',{
   layoutTemplate: 'mainLayout',
   name: 'currencies'
});
// Contract types
Router.route('/contractsType',{
    layoutTemplate: 'mainLayout',
    name: 'contractsType'
});
// Articles
Router.route('/article',{
    layoutTemplate: 'mainLayout',
    name: 'article'
});
Router.route('/editArticle',{
    layoutTemplate: 'mainLayout',
    name: 'editArticle'
});
Router.route('/articles',{
   layoutTemplate: 'mainLayout',
   name: 'allArticles'
});
// Articles Option
Router.route('/allOptions',{
    layoutTemplate: 'mainLayout',
    name: 'allOptions'
});
// Screens
Router.route('/Screens',{
  layoutTemplate: 'mainLayout',
  name: 'allScreens'
});
// Segment
Router.route('/Segment',{
  layoutTemplate: 'mainLayout',
  name: 'segment'
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
// Companies
Router.route('/companies',{
  layoutTemplate: 'mainLayout',
  name: 'allCompanies'
 });
// client
Router.route('/clients',{
  layoutTemplate: 'mainLayout',
  name: 'allClients'
 });
 Router.route('/clientsUsers',{
   layoutTemplate: 'mainLayout',
   name: 'allClientsUsers'
  });
 Router.route('/clientsRoles',{
   layoutTemplate: 'mainLayout',
   name: 'allClientsRoles'
 });
// Firmware
Router.route('/firmware',{
    layoutTemplate: 'mainLayout',
    name: 'firmware'
   });
 Router.route('/firmwares',{
   layoutTemplate: 'mainLayout',
   name: 'allFirmwares'
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
