// Item.js

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


// Define collection and schema for Event
var Team = new Schema({
  teamId: {
    type: String
  },
  teamName: {
    type: String
  },
  teamMembers: [{
    participantName: {
        type: String
      },
    participantEmail: {
        type: String
      },
  }]

});

// Define collection and schema for Event
var Event = new Schema({
  eventId: {
    type: String
  },
  eventName: {
    type: String
  },
  eventDate: {
    type: String
  },
  datePosted: {
    type: Date, default: Date.now
  },
  location: {
    type: String
  },
  eventDesc: {
    type: String
  },
  eventDept: {
    type: String
  },
  eventPrize:{
    type: String
  },
  teams:[Team],
  cancelled: {type: Boolean, default: false}

},{
    collection: 'events'
});

module.exports = mongoose.model('Event', Event);