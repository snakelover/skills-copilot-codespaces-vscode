// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var User = require('../models/user');
var Post = require('../models/post');
var mongoose = require('mongoose');

// Add comment
router.post('/', function(req, res) {
  var comment = new Comment({
    content: req.body.content,
    post: req.body.post,
