Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});

//
// Dashboards routes
//
Router.route('/dashboard1',{  name: 'dashboard1' });
Router.route('/dashboard2',{  name: 'dashboard2' });
Router.route('/dashboard3',{  name: 'dashboard3' });
Router.route('/dashboard4',{  name: 'dashboard4l' });
Router.route('/dashboard5',{  name: 'dashboard5' });
//
// Booking
//
Router.route('/newBooking',{  name: 'newBooking' });
Router.route('/allBookings',{  name: 'allBookings' });
//
// Graphs routes
//
Router.route('/graphFlot',{  name: 'graphFlot' });
Router.route('/graphRickshaw',{  name: 'graphRickshaw' });
Router.route('/graphChartJs',{  name: 'graphChartJs' });
Router.route('/graphChartist',{  name: 'graphChartist' });
Router.route('/c3charts',{  name: 'c3charts' });
Router.route('/graphPeity',{  name: 'graphPeity' });
Router.route('/graphSparkline',{  name: 'graphSparkline'});
//
// Mailbox
//
Router.route('/mailbox',{  name: 'mailbox' });
Router.route('/emailView',{  name: 'emailView' });
Router.route('/emailCompose',{  name: 'emailCompose' });
Router.route('/emailTemplates',{  name: 'emailTemplates' });
//
// Widgets
//
Router.route('/widgets',{  name: 'widgets' });
//
// Metrics
//

Router.route('/metrics',{  name: 'metrics' });
//
// Forms
//
Router.route('/newClient',{  name: 'newClient' });
Router.route('/formAdvanced',{  name: 'formAdvanced' });
Router.route('/formWizard',{  name: 'formWizard' });
Router.route('/formUpload',{  name: 'formUpload' });
Router.route('/textEditor',{  name: 'textEditor' });
Router.route('/markdown',{  name: 'markdown' });
//
// App Views
//
Router.route('/contacts',{  name: 'contacts' });
Router.route('/profile',{ name: 'profile' });
Router.route('/profile2',{  name: 'profile2' });
Router.route('/contacts2',{  name: 'contacts2' });
Router.route('/projects',{  name: 'projects' });
Router.route('/projectDetail',{  name: 'projectDetail' });
Router.route('/teamsBoard',{  name: 'teamsBoard' });
Router.route('/socialFeed',{ name: 'socialFeed' });
Router.route('/clients',{  name: 'clients' });
Router.route('/fullHeight',{  name: 'fullHeight' });
Router.route('/offCanvas',{ name: 'offCanvas' });
Router.route('/voteList',{ name: 'voteList' });
Router.route('/fileManager',{ name: 'fileManager' });
Router.route('/calendar',{ name: 'calendar' });
Router.route('/issueTracker',{ name: 'issueTracker' });
Router.route('/blog',{ name: 'blog' });
Router.route('/article',{  name: 'article' });
Router.route('/faq',{ name: 'faq' });
Router.route('/timelineOne',{ name: 'timelineOne' });
Router.route('/pinBoard',{ name: 'pinBoard' });
//
// Other pages
//
Router.route('/searchResult',{ name: 'searchResult' });
Router.route('/lockScreen', {  name: 'lockScreen' });
Router.route('/invoice', {  name: 'invoice' });
Router.route('/invoicePrint',{  name: 'invoicePrint' });
Router.route('/login', {  name: 'login' });
Router.route('/loginTwo',{  name: 'loginTwo' });
Router.route('/forgotPassword',{  name: 'forgotPassword' });
Router.route('/register',{ name: 'register' });
Router.route('/errorOne',{  name: 'errorOne' });
Router.route('/errorTwo',{  name: 'errorTwo' });
Router.route('/emptyPage',{  name: 'emptyPage' });
//
// Miscellaneous
//
Router.route('/toastrNotification',{  name: 'toastrNotification' });
Router.route('/nestableList',{  name: 'nestableList' });
Router.route('/agileBoard',{  name: 'agileBoard' });
Router.route('/timelineTwo',{  name: 'timelineTwo' });
Router.route('/diff',{  name: 'diff' });
Router.route('/i18support',{  name: 'i18support'});
Router.route('/sweetAlert',{  name: 'sweetAlert' });
Router.route('/idleTimer',{  name: 'idleTimer' });
Router.route('/truncate',{ name: 'truncate' });
Router.route('/spinners',{ name: 'spinners' });
Router.route('/liveFavicon',{  name: 'liveFavicon' });
Router.route('/home',{ name: 'home' });
Router.route('/codeEditor',{  name: 'codeEditor' });
Router.route('/modalWindow',{  name: 'modalWindow' });
Router.route('/clipboard',{ name: 'clipboard' });
Router.route('/forumView',{  name: 'forumView' });
Router.route('/forumDetail',{ name: 'forumDetail' });
Router.route('/validation',{  name: 'validation' });
Router.route('/treeView',{ name: 'treeView' });
Router.route('/loadingButtons',{  name: 'loadingButtons' });
Router.route('/chatView',{  name: 'chatView' });
Router.route('/masonry',{  name: 'masonry' });
Router.route('/tour',{  name: 'tour' });
//
// UI Elements
//
Router.route('/typography', function () {  name: 'typography' });
Router.route('/icons', {  name: 'icons' });
Router.route('/draggablePanels',{ name: 'draggablePanels' });
Router.route('/resizeablePanels',{  name: 'resizeablePanels' });
Router.route('/buttons',{  name: 'buttons' });
Router.route('/video',{  name: 'video' });
Router.route('/tabsPanels',{  name: 'tabsPanels' });
Router.route('/tabs',{  name: 'tabs' });
Router.route('/notifications',{  name: 'notifications' });
Router.route('/badgesLabels',{  name: 'badgesLabels' });
//
// Grid Options
//
Router.route('/gridOptions',{  name: 'gridOptions' });
//
// Tables
//
Router.route('/tableStatic',{  name: 'tableStatic' });
Router.route('/allclients',{  name: 'allclients' });
Router.route('/fooTables',{  name: 'fooTables' });
//
// E-commerce
//
Router.route('/productsGrid',{  name: 'productsGrid' });
Router.route('/productsList',{  name: 'productsList' });
Router.route('/productEdit',{  name: 'productEdit' });
Router.route('/shopingCart',{  name: 'shopingCart' });
Router.route('/orders',{   name: 'orders' });
Router.route('/productDetail',{  name: 'productDetail' });
Router.route('/payments',{  name: 'payments' });
//
// Gallery
//
Router.route('/gallery',{  name: 'gallery' });
Router.route('/carusela',{  name: 'carusela' });
Router.route('/slick',{  name: 'slick' });
//
// CSS Animations
//
Router.route('/cssAnimations',{  name: 'cssAnimations' });
//
// Landing page
//
Router.route('/landing',{  name: 'blankLayout' });
//
// Other pages routes
//
Router.route('/notFound', function () {  name: 'notFound' });
// Default route
// You can use direct name: ('template')
// We use Router.go method because dashboard1 is our nested view in menu
Router.route('/', function () {
    Router.go('home');
});
