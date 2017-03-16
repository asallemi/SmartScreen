Clients_Live.allow({
  insert: function (doc) {
    return true;
  },
  remove: function (doc) {
    return true;
  }
});
Clients_Authorization.allow({
  insert: function (doc) {
    return true;
  },
  update: function (doc) {
    return true;
  },
  remove: function (doc) {
    return true;
  }
});
Clients_History.allow({
  insert: function (doc) {
    return true;
  }
});
