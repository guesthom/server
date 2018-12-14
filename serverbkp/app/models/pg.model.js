'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var autopopulate = require('mongoose-autopopulate');

var PgSchemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var PgSchema = new Schema({
    name: {type: String, default: ''},
    owner_id: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    total_space: {type: Number, default: ''},
    available_space_room: {type: Number, default: '0'},
    available_space_hall: {type: Number, default: '0'},
    ac: {type: Boolean, default: false}, 
    food: {type: Boolean, default: false}, 
    wifi: {type: Boolean, default: false}, 
    veg: {type: Boolean, default: false}, 
    rent: {type: Number, default: ''},
    deposite: {type: Number, default: ''},
    area: {type: String, default: ''},
    latitude: {type: Number, default: ''},
    longtitude: {type: Number, default: ''},
    is_deleted: {type: Boolean, default: false},
    for_whom: {type: String, default: ''},
    dateAdded: { type: Date, default: Date.now }
}, PgSchemaOptions);

PgSchema.plugin(autopopulate);

module.exports = mongoose.model('Pg', PgSchema);