/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Promise = require('bluebird');

module.exports = {
  index: function (req, res, next) {
    list.find(function foundLists (err, lists) {
      if (err) return  next(err);
      
      res.view({
        lists: lists
      });
    });
  },

  members: function (req, res, next) {
    var members = '';

    sails.models.list.find(req.param('id')).populate('members').exec(
      function(err, list) { 
        if (err) { 
          res.negotiate(err); 
        } else { 
          // res.ok(list);
          res.view( {
            members: list
          });
        } 
    })
  },

  addMembers: function (req, res, next) {
    sails.models.list.findOne(req.param('id')).exec(function(err, list) {
     
      if(err) console.log("error");
      
      var users = req.param('users');
      users = users.split(",");
      // console.log(users);
      _.each(users, function(member) {
        member = member.split(":");
        // quitar espacios en blanco de principio y fin de member[0] y member[1]
        // console.log(member[0]);

          // var res =sails.models.user.findOne({'email': 'nikola@tesla.eus'}).populate('lists', {
          //   where: { id: 1 }
          // }).exec(function(err, exist) {
          //   console.log(exist);
          // });
          


        var membersYet = [];
        user.findOne({'email': member[1].trim()}, function foundUser (err, user) {
          // si hay una cuenta con ese email.
          var listid = req.param('listID');
          if(typeof user != 'undefined') {

            // Meter en listMember();
            
             var listUser = new Promise(function (resolve, reject) {            
                sails.models.user.query("select COUNT(*) as member from list_members__user_lists where list_members = " + listid + " and user_lists = "+ user.id, function (err,data) {

                if (err) return console.log(err);
                else {
                  console.log(data[0].member);
                  // 'ya es miembro'
                  if (data[0].member == 1) {
                    console.log("YET");
                    // membersYet.push('hia@hi.com');
                    membersYet = Promise.resolve(membersYet.push('hia@hi.com'));
                  } else {
                    sails.models.list.findOne(listid).exec(function(err, list) {
                      list.members.add(user.id);
                      list.save(function(err) {});
                    });
                  }
                }
                console.log("AAAAAAAAAAAAAAA");
                console.log(membersYet);
              });
              // End listMember();
                  })
                 
                  listUser.then(function(response){
                          cb(response)
                  })
        
           
          // si no hay una cuenta con ese email. 
          } else {
              // console.log("crear usuario");

              var password = Math.random().toString(36).slice(-8);

              var params = {name: member[0].trim(), email: member[1].trim(), password: password};
              sails.models.user.create(params, function(err, user) {

                  if (err) return next(err);

                  // TODO: mandarle email con url + user + pass.

                  sails.models.list.findOne(listid).exec(function(err, list) {
                    list.members.add(user.id);
                    list.save(function(err) {});
                  });
                  
              });


          }
        console.log(membersYet);
        });
        
        
        // res.redirect("/list/" + listid + "/members");

      });

     });
  
  }

};

