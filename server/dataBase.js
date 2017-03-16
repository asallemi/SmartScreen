if (Meteor.isServer) {

  /*if (Screens_Live.find().count() === 0) {
    var screen =
    {
        'screenLatitude': 49.0388900,
        'screenLongitude': 2.0770400,
        'screenDimension': '150x100',
        'screenDescription': 'second screen of smart screen solution',
        'screenAddedAt': new Date(),
        'screenStatus': 1,
        'screenAddress':'xxx',
        'highPrice': 100,
        'lowPrice': 50,
    };
    Screens_Live.insert(screen);
  }
  if (Clients_Live.find().count() === 0) {
      var client =
        {
          'clientShortName': 'ARTI',
          'clientName': 'ARTI',
          'clientCode': 123456,
          'clientDescription': 'Azzzzzzzzzzerttttttttttty',
          'clientSector': 'Alimentation',
          'clientBalance': 2000,
          'clientType':'Corporate'
        };
      Clients_Live.insert(client);
  }
  if (Segments_Live.find().count() === 0) {
      var segment =
        {
          'segmentDate': '30/07/2016',
          'segmentStartTime': '9:30',
          'segmentEndTime': '9:40',
          'segmentDescription': 'Nothing to add',
          'segmentAvailability': 1,
          'segmentFile': '/home/akrem/pic.png',
          'segmentScreenID':'uWhymNmycA8pqSENR'
        };
      Segments_Live.insert(segment);
  }

  if (Bookings_Live.find().count() === 0) {
      var booking1 =
        {
          'segmentID': '1001',
          'screenID': '1005',
          'bookingStatus': 0,
          'contentID' : 'GQYyHzRhE949M9j7F',
          'clientID' : '10010',
          'contentPath' : '/home/device/'
      };
      var booking2 =
          {
            'segmentID': '1002',
            'screenID': '1005',
            'bookingStatus': 1,
            'contentID' : 'gjEcDZAmovhujZiSF',
            'clientID' : '10010',
            'contentPath' : '/home/device/'
      };
      var booking3 =
        {
          'segmentID': '1003',
          'screenID': '1003',
          'bookingStatus': 0,
          'contentID' : 'GQYyHzRhE949M9j7F',
          'clientID' : '10010',
          'contentPath' : '/home/device/'
      };
      var booking4 =
        {
          'segmentID': '1004',
          'screenID': '1004',
          'bookingStatus': 0,
          'contentID' : 'GQYyHzRhE949M9j7F',
          'clientID' : '10010',
          'contentPath' : '/home/device/'
      };
      var booking5 =
        {
          'segmentID': '1005',
          'screenID': '1004',
          'bookingStatus': 0,
          'contentID' : 'GQYyHzRhE949M9j7F',
          'clientID' : '10010',
          'contentPath' : '/home/device/'
      };
      var booking6 =
        {
          'segmentID': '1006',
          'screenID': '1009',
          'bookingStatus': 0,
          'contentID' : 'GQYyHzRhE949M9j7F',
          'clientID' : '10010',
          'contentPath' : '/home/device/'
      };
      var booking7 =
        {
          'segmentID': '1007',
          'screenID': '1005',
          'bookingStatus': 0,
          'contentID' : 'GQYyHzRhE949M9j7F',
          'clientID' : '10010',
          'contentPath' : '/home/device/'
      };
      Bookings_Live.insert(booking1);
      Bookings_Live.insert(booking2);
      Bookings_Live.insert(booking3);
      Bookings_Live.insert(booking4);
      Bookings_Live.insert(booking5);
      Bookings_Live.insert(booking6);
      Bookings_Live.insert(booking7);
  }
  if (Contents_Live.find().count() === 0) {
      var content =
        {
          'contentName': 'test',
          'contentSize': 'test',
          'contentType': 'test',
          'contentDuration': 'test',
          'contentClientID': '10010',
          'uploadedDate': new Date(),
        };
      Contents_Live.insert(content);
  }*/
  if (Users_Live.find().count() === 0) {
      var user =
        {
          'fname' : 'Akrem',
          'surname' : 'Sallemi',
          'legalIdentifier' : 11860468,
          'dateOfBirth' : '13/11/1991',
          'phone' : '+21620710978',
          'address' : 'Sfax Tunisia',
          'email' : 'asallemi@swallow_labs.com',
          'password' : 'akrem',
          'photo' : '/public/upload/users/1001',
          'roles': 'rXyBusbuQS',
          'currentNumber': 0,
          'status': 'LIVE',
          'inputter': 'test',
          'authorizer': 'test',
          'dateTime': '01/01/2017 10:00',
          'code': '1005000PM'
        };
      Users_Live.insert(user);
  }
  /*if (Clients_Live.find().count() === 0) {
      var client =
        {
          'name' : 'Swallow_labs',
          'shortName' : 'SL',
          'code' : '10XF20065',
          'sector' : 'Computer engineering',
          'email' : 'administration@swallow_labs.com',
          'phone' : '+21674704201',
          'fax' : '+21674704201',
          'street' : 'Route de Tunis',
          'codePostal' : 3000,
          'province' : 'Sakkiet Ezzit',
          'city' : 'Sfax',
          'country' : 'Tunisia',
          'balance' : 0,
          'accountNumber' : 5,
          'logo' : '/home/clients/',
          'currentNumber': 0,
          'status': 'LIVE',
          'inputter': 'Ali',
          'authorizer': 'Med',
          'dateTime': ''
        };
      Clients_Live.insert(client);
  }
  if (Clients_Authorization.find().count() === 0) {
      var client =
        {
          'name' : 'Swallow_labs',
          'shortName' : 'SL',
          'code' : '10XF20065',
          'sector' : 'Computer engineering',
          'email' : 'administration@swallow_labs.com',
          'phone' : '+21674704201',
          'fax' : '+21674704201',
          'address' : 'Sfax centre',
          'balance' : 0,
          'accountNumber' : 5,
          'logo' : '/home/clients/',
          'currentNumber': 0,
          'status': 'LIVE',
          'inputter': 'Ali',
          'authorizer': 'Med',
          'dateTime': ''
        };
      Clients_Authorization.insert(client);
  }*/
  if (Roles_Live.find().count() === 0) {
      var role =
        {
          'roleName': 'Test Role',
          'currentNumber': 0,
          'status': 'LIVE',
          'inputter': 'test',
          'authorizer': 'test',
          'dateTime': '01/01/2017 10:00',
          'code': '#1000',
          'accountAdd': null,
          'accountUpdate': false,
          'accountDelete': false,
          'accountDisplay': false,
          'accountPrint': false,
          'accountValidate': false,
          'contractAdd': null,
          'contractUpdate': false,
          'contractDelete': false,
          'contractDisplay': false,
          'contractPrint': false,
          'contractValidate': false,
          'contractSign': false,
          'articleAdd': false,
          'articleUpdate': false,
          'articleDelete': false,
          'articleDisplay': false,
          'articlePrint': false,
          'articleValidate': false,
          'invoiceAdd': false,
          'invoiceUpdate': false,
          'invoiceDelete': false,
          'invoiceDisplay': false,
          'invoicePrint': false,
          'invoiceValidate': false,
          'clientAdd': false,
          'clientUpdate': false,
          'clientDelete': false,
          'clientDisplay': false,
          'clientPrint': false,
          'clientValidate': false,
          'clientAccountManagement': false,
          'screenUpdate': false,
          'screenDelete': false,
          'screenDisplay': false,
          'screenPrint': false,
          'screenValidate': false,
          'screenShow': false,
          'screenUpdateSystem': false,
          'screenClear': false,
          'screenMonitor': false,
          'screenActivate': false,
          'screenOnOff': false,
          'segmentUpdate': false,
          'segmentDelete': false,
          'segmentDisplay': false,
          'segmentPrint': false,
          'segmentAffect': false,
          'segmentValidate': false,
          'tariffAdd': false,
          'tariffUpdate': false,
          'tariffDelete': false,
          'tariffDisplay': false,
          'tariffPrint': false,
          'tariffAffect': false,
          'tariffValidate': false,
          'bookingAdd': false,
          'bookingUpdate': false,
          'bookingDelete': false,
          'bookingDisplay': false,
          'bookingPrint': false,
          'bookingValidate': false,
          'contentAdd': false,
          'contentDelete': false,
          'contentDisplay': false,
          'contentValidate': false,
          'roleAdd': false,
          'roleUpdate': false,
          'roleDelete': false,
          'roleDisplay': false,
          'rolePrint': false,
          'roleAffect': false,
          'roleValidate': false,
          'signatureAdd': false
        };
      Roles_Live.insert(role);
  }
  if (Matrix.find().count() === 0) {
      var row1 =
      {
        'state': 'HLD',
        'transition': 'input',
        'nextState': ['HLD']
      };
      var row2 =
      {
        'state': 'HLD',
        'transition': 'validate',
        'nextState': ['INAU']
      };
      var row3 =
      {
        'state': 'INAU',
        'transition': 'input',
        'nextState': ['HLD']
      };
      var row4 =
      {
        'state': 'INAU',
        'transition': 'authorize',
        'nextState': ['LIVE']
      };
      var row5 =
      {
        'state': 'LIVE',
        'transition': 'input',
        'nextState': ['HLD']
      };
      var row6 =
      {
        'state': 'LIVE',
        'transition': 'delete',
        'nextState': ['RNAU']
      };
      var row7 =
      {
        'state': 'RNAU',
        'transition': 'delete',
        'nextState': ['HIS']
      };
      var row8 =
      {
        'state': 'RNAU',
        'transition': 'authorize',
        'nextState': ['HIS']
      };
      Matrix.insert(row1);
      Matrix.insert(row2);
      Matrix.insert(row3);
      Matrix.insert(row4);
      Matrix.insert(row5);
      Matrix.insert(row6);
      Matrix.insert(row7);
      Matrix.insert(row8);
  }
}
