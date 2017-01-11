Users_Live.allow({
  insert: function (doc) {
    return true;
  },
  remove: function (doc) {
    return true;
  }
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
Bookings_Live.allow({
  insert: function (doc) {
    return true;
  }
});
Bookings_Authorization.allow({
  insert: function (doc) {
    return true;
  }
});
Bookings_History.allow({
  insert: function (doc) {
    return true;
  }
});
Roles_Live.allow({
  insert: function (doc) {
    return true;
  },
  remove: function (doc) {
    return true;
  }
});
Roles_Authorization.allow({
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
Roles_History.allow({
  insert: function (doc) {
    return true;
  }
});
Contents_Live.allow({
  remove: function (doc) {
    return true;
  }
});
Contents_Authorization.allow({
  remove: function (doc) {
    return true;
  }
});
Contents_History.allow({
  remove: function (doc) {
    return true;
  }
});
Segments_Live.allow({
  update: function (doc) {
    return true;
  }
});
Segments_Authorization.allow({
  update: function (doc) {
    return true;
  }
});
Segments_History.allow({
  update: function (doc) {
    return true;
  }
});
