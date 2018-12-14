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

exports.addPg = function (req, res) {
    var PgModel = mongoose.model('Pg');
    var data = req.body;
    data.owner_id = req.user._id;
    PgModel.create(data, function (err, user) {
        if (err) {
            res.send(send_response(null, true, err));
        } else {
            res.send(send_response(null, true, "Pg Inserted successfully"));
        }
    });
};

exports.getAllPgs = function(req,res){
    var PgModel = mongoose.model('Pg');
    PgModel.find({},function(err,userList){
        if(err){
            res.send(send_response(null,true,err));
        } else {
            res.send(send_response(userList));
        }
    })
}

exports.getHomeListByGender = function(req,res){
    var PgModel = mongoose.model('Pg');
    var FlatModel = mongoose.model('Flat');
    var whom = req.params.whom;
    var areaListArry = [];

    async.waterfall([
        function(callback){
            FlatModel.find({for_whom: whom},function(err,areaListFlat){
                if(err){
                    callback(null,err);
                } else {
                    areaListFlat.forEach(function(item) { 
                        areaListArry.push(item);
                    })
                    callback(null,areaListArry);
                }
            })
        },function(areaListArry,callback){
            PgModel.find({for_whom: whom},function(err,areaListFlat){
                if(err){
                    callback(null,err);
                } else {
                    areaListFlat.forEach(function(item) { 
                        areaListArry.push(item);
                    })
                    callback(null,areaListArry);
                }
            })
        }
    ],function(error,result){
        if(error){
           res.send(send_response(null,true,error)); 
       } else {
        res.send(send_response(result,false,"Success"));
       }
    })

}

exports.getHomeListByArea = function(req,res){
    var PgModel = mongoose.model('Pg');
    var FlatModel = mongoose.model('Flat');
    var area = req.params.area;
    var areaListArry = [];

    async.waterfall([
        function(callback){
            FlatModel.find({area: area},function(err,areaListFlat){
                if(err){
                    callback(null,err);
                } else {
                    areaListFlat.forEach(function(item) { 
                        areaListArry.push(item);
                    })
                    callback(null,areaListArry);
                }
            })
        },function(areaListArry,callback){
            PgModel.find({area: area},function(err,areaListFlat){
                if(err){
                    callback(null,err);
                } else {
                    areaListFlat.forEach(function(item) { 
                        areaListArry.push(item);
                    })
                    callback(null,areaListArry);
                }
            })
        }
    ],function(error,result){
        if(error){
           res.send(send_response(null,true,error)); 
       } else {
        res.send(send_response(result,false,"Success"));
       }
    })

}

exports.UpdatePg = function(req, res){
    var PgModel = mongoose.model('Pg');
    PgModel.findOne({"_id":req.body._id}, function (err, pg) {
        if (err) {
            res.send(send_response(null, true, "ERROR_USER_NOT_FOUND"));
        } else {
            var updated_pg = _.assign(pg, req.body);
            updated_pg.save(function (err) {
                if (err) {
                    res.send(send_response(null, true, parse_error(err)));
                } else {
                    res.json({data: pg, is_error: false, message: 'Updated successfully'});
                }
            });
        }
    });
};

