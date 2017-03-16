Plans_Live.allow({
  insert: function (doc) {
    return true;
  },
  remove: function (doc) {
    return true;
  }
});
Plans_Authorization.allow({
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
Plans_History.allow({
  update: function (doc) {
    return true;
  }
});
