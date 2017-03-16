Users_Live.allow({
  insert: function (doc) {
    return true;
  },
  remove: function (doc) {
    return true;
  },
  update: function (doc) {
    return true;
  },
});
Users_Authorization.allow({
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
Users_History.allow({
  insert: function (doc) {
    return true;
  }
});
