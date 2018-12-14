'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var autopopulate = require('mongoose-autopopulate');

var FlatSchemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var FlatSchema = new Schema({
    name: {type: String, default: ''},
    owner_id: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true},
    length: {type: Number, default: ''},
    type: {type: String, default: '0'},
    furnitured: {type: Boolean, default: false}, 
    rent: {type: Number, default: ''},
    mentanace: {type: Number, default: ''},
    deposite: {type: Number, default: ''},
    area: {type: String, default: ''},
    dishtv:{type: Boolean, default: ''},
    intenetconnection:{type: Boolean, default: ''},
    sofa:{type: Boolean, default: ''},
    tv:{type: Boolean, default: ''},
    washingmachine:{type: Boolean, default: ''},
    diningtable:{type: Boolean, default: ''},
    attachedbathroom:{type: Boolean, default: ''},
    geyser:{type: Boolean, default: ''},
    westerntoilet:{type: Boolean, default: ''},
    fridge:{type: Boolean, default: ''},
    gasconnection:{type: Boolean, default: ''},
    waterfilter:{type: Boolean, default: ''},
    cupboard:{type: Boolean, default: ''},
    lift:{type: Boolean, default: ''},
    security:{type: Boolean, default: ''},
    latitude: {type: Number, default: ''},
    longtitude: {type: Number, default: ''},
    is_deleted: {type: Boolean, default: false},
    for_whom: {type: String, default: ''},
    dateAdded: { type: Date, default: Date.now }
}, FlatSchemaOptions);

FlatSchema.plugin(autopopulate);

module.exports = mongoose.model('Flat', FlatSchema);