Segments_Live.allow({
  insert: function (doc) {
    return true;
  },
  remove: function (doc) {
    return true;
  }
});
Segments_Authorization.allow({
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
Segments_History.allow({
  insert: function (doc) {
    return true;
  }
});
