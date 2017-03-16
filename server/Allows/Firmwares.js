Firmwares_Live.allow({
  insert: function (doc) {
    return true;
  },
  remove: function (doc) {
    return true;
  }
});
Firmwares_Authorization.allow({
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
Firmwares_History.allow({
  insert: function (doc) {
    return true;
  }
});
