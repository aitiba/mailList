/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

var User = {

  // identity: 'user',
  connection: 'someMysqlServer',

  attributes: {
    name: 'string',
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 6,
      // required: true
    },
  
    // one-to-one association
    // list: {
    //   model: 'List'
    // }
    
    // one-to-many association
    // lists: {
    //   collection: 'list',
    //   via: 'owner'
    // }
    
    // many-to-many association
    lists: {
      collection: 'list',
      via: 'members',
      dominant: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }
};

module.exports = User;