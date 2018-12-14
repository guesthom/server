var _ = require('lodash');
var async = require('async');
var passport = require('passport');
var mongoose = require("mongoose");
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');
var pug = require('pug');
var smtpTransport = require('nodemailer-smtp-transport');
var auth = require('../../auth/auth.service');
var config = require('../../config/local.env');
var request = require("request");
var path = require('path'),
    templatesDir = path.join(__dirname, '../../templates');

exports.addFlat = function (req, res) {
    var FlatModel = mongoose.model('Flat');
    var data = req.body;
    
    FlatModel.create(data, function (err, user) {
        if (err) {
            res.send(send_response(null, true, err));
        } else {
            res.send(send_response(null, true, "Flat Added successfully"));
        }
    });
};


exports.getAllFlats = function(req,res){
    var FlatModel = mongoose.model('Flat');
    FlatModel.find({},function(err,flatList){
        if(err){
            res.send(send_response(null,true,err));
        } else {
            res.send(send_response(flatList));
        }
    })
}

exports.UpdateFlat = function(req, res){
    var FlatModel = mongoose.model('Flat');
    FlatModel.findOne({"_id":req.body._id}, function (err, flat) {
        if (err) {
            res.send(send_response(null, true, "ERROR_USER_NOT_FOUND"));
        } else {
            delete req.body._id;
            var tempArray = [];
            tempArray = req.body.homeamenities;
            flat.homeamenities = tempArray;
            
            var updated_flat = _.assign(flat, req.body);
            updated_flat.save(function (err) {
                if (err) {
                    res.send(send_response(null, true, parse_error(err)));
                } else {
                    res.json({data: flat, is_error: false, message: 'Updated successfully'});
                }
            });
        }
    });
};