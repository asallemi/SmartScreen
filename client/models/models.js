Companies_Live = new Mongo.Collection('companies_live');
Companies_Authorization = new Mongo.Collection('companies_authorization');
Companies_History = new Mongo.Collection('companies_history');

Screens_Live = new Mongo.Collection('screens_live');
Screens_Authorization = new Mongo.Collection('screens_authorization');
Screens_History = new Mongo.Collection('screens_history');

Users_Live = new Mongo.Collection('users_live');
Users_Authorization = new Mongo.Collection('users_authorization');
Users_History = new Mongo.Collection('users_history');

Clients_Live = new Mongo.Collection('clients_live');
Clients_Authorization = new Mongo.Collection('clients_authorization');
Clients_History = new Mongo.Collection('clients_history');
/*if (Session.get("UserLogged").code == "0000") {
  Clients_Authorization = new Mongo.Collection(Session.get("UserLogged").code+'_clients_authorization');
}else {
  Clients_Live = new Mongo.Collection('clients_live');
  Clients_Authorization = new Mongo.Collection('clients_authorization');
  Clients_History = new Mongo.Collection('clients_history');
}*/

Plans_Live = new Mongo.Collection('plans_live');
Plans_Authorization = new Mongo.Collection('plans_authorization');
Plans_History = new Mongo.Collection('plans_history');

Segments_Live = new Mongo.Collection('segments_live');
Segments_Authorization = new Mongo.Collection('segments_authorization');
Segments_History = new Mongo.Collection('segments_history');

Bookings_Live = new Mongo.Collection('bookings_live');
Bookings_Authorization = new Mongo.Collection('bookings_authorization');
Bookings_History = new Mongo.Collection('bookings_history');

Contents_Live = new Mongo.Collection('contents_live');
Contents_Authorization = new Mongo.Collection('contents_authorization');
Contents_History = new Mongo.Collection('contents_history');

Roles_Live = new Mongo.Collection('roles_live');
Roles_Authorization = new Mongo.Collection('roles_authorization');
Roles_History = new Mongo.Collection('roles_history');

Firmwares_Live = new Mongo.Collection('firmwares_live');
Firmwares_Authorization = new Mongo.Collection('firmwares_authorization');
Firmwares_History = new Mongo.Collection('firmwares_history');

Articles_Live = new Mongo.Collection('articles_live');
Articles_Authorization = new Mongo.Collection('articles_authorization');
Articles_History = new Mongo.Collection('articles_history');

Articles_Options_Live = new Mongo.Collection('articles_options_live');
Articles_Options_Authorization = new Mongo.Collection('articles_options_authorization');
Articles_Options_History = new Mongo.Collection('articles_options_history');

Contracts_Live = new Mongo.Collection('contracts_live');
Contracts_Authorization = new Mongo.Collection('contracts_authorization');
Contracts_History = new Mongo.Collection('contracts_history');

Contracts_Type_Live = new Mongo.Collection('contracts_type_live');
Contracts_Type_Authorization = new Mongo.Collection('contracts_type_authorization');
Contracts_Type_History = new Mongo.Collection('contracts_type_history');

Firmwares_Screens_Live = new Mongo.Collection('firmwares_screens_live');
Firmwares_Screens_Authorization = new Mongo.Collection('firmwares_screens_authorization');
Firmwares_Screens_History = new Mongo.Collection('firmwares_screens_history');

Currencies_Live = new Mongo.Collection('currencies_live');
Currencies_Authorization = new Mongo.Collection('currencies_authorization');
Currencies_History = new Mongo.Collection('currencies_history');

Modules_Live = new Mongo.Collection('modules_live');
Modules_Authorization = new Mongo.Collection('modules_authorization');
Modules_History = new Mongo.Collection('modules_history');

Actions = new Mongo.Collection('actions');

Matrix = new Mongo.Collection('matrix');

Languages_Live = new Mongo.Collection('languages_live');
