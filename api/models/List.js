/**
* List.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var List = {

  // Identity is a unique name for this model and must be in lower case
  identity: 'list',
    
  // A named connection which will be used to read/write to the datastore
  connection: 'someMysqlServer',

  attributes: {
    name: 'string',
    email: 'string',
    // users: { collection: 'User' }
  
    // one-to-one asocciation
    // user: {
    //   model: 'user'
    // }
    
    // one-to-one asocciation
    // owner: {
    //   model: 'user'
    // }
    

    //many-to-many asocciation
    members: {
      collection: 'user',
      via: 'lists'
    }

  }
};

module.exports = List;
