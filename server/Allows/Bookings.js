Bookings_Live.allow({
  insert: function (doc) {
    return true;
  },
  remove: function (doc) {
    return true;
  }
});
Bookings_Authorization.allow({
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
Bookings_History.allow({
  insert: function (doc) {
    return true;
  },
});
