/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  
  show: function (req, res, next) {

    user.findOne(req.param('id'), function foundUsers (err, user) {
      if (err) return  next(err);
      if (!user) return next();


      res.view({
        user: user
      });
    });
   
  },

  index: function (req, res, next) {
    user.find(function foundUsers (err, users) {
      if (err) return  next(err);
      
      res.view({
        users: users
      });
    });

    
  },

  // new
  
  // create
    create: function(req, res, next) {

        var params = req.params.all();

        user.create(params, function(err, user) {

            if (err) return next(err);

            res.status(201);

            res.json(user);
            // res.redirect("/sleep/");
        });

    },
  edit: function (req, res, next) {
    user.findOne(req.param('id'), function foundUser (err, user) {
      if (err) return  next(err);
      if (!user) return next();

      res.view({
        user: user
      });
    })
  },

  update: function (req, res, next) {
    user.publishUpdate( req.param('id'), req.params.all() );
    user.update(req.param('id'), req.params.all(), function userUpdated (err, user) {
      if (err)  {
        return res.redirect('user/edit/' + req.param('id'));
      }

      res.redirect('/user/show/' + req.param('id'));

    });
  },

  destroy: function (req, res, next) {
    user.findOne(req.param('id'), function foundUser (err, user) {
      if (err) return next(err);

      if(!user) return next('User doesn\'t exist.');

      user.destroy(req.param('id'), function userDestroyed(err) {
        if(err) return next(err);
      });

      res.redirect("/user");

    });
  },

  associate: function (req, res) {

    // one-to-one asocciation
    // sails.models.list.create({
    //   name: 'fido',
    //   email: 'fido@dido.com',

    //   // Set the User's Primary Key to associate the Pet with the User.
    //   user: 1
    // }).exec(function(err, list) { if (err) { res.negotiate(err); } else { res.ok(list); } });

    
    // one-to-many asocciation
    // sails.models.list.create({
    //   name: 'fido',
    //   email: 'fido@dido.com',

    //   // Set the User's Primary Key to associate the Pet with the User.
    //   owner: 1
    // }).exec(function(err, list) { if (err) { res.negotiate(err); } else { res.ok(list); } });
    
    sails.models.list.findOne(1).exec(function(err, list) {
     // console.log("dentro");

     if(err) console.log("error");

       //console.log(list);

       // Queue up a record to be inserted into the join table
       list.owners.add(1);

       // // Save the user, creating the new associations in the join table
       list.save(function(err) {});

       res.ok(list);
     });
  },

  lists: function (req, res) {
  	
    // one-to-one association
    // // all lists with user. one-to-one.
    // sails.models.list.find().populate('user').exec(function(err, list) { if (err) { res.negotiate(err); } else { res.ok(list); } }) 
    
    // // all users with list. one-to-one.
    // sails.models.user.find().populate('list').exec(function(err, user) { if (err) { res.negotiate(err); } else { res.ok(user); } })
    
    // one-to-many association
    // all users with list. one-to-many.
    // sails.models.user.find().populate('lists').exec(function(err, user) { if (err) { res.negotiate(err); } else { res.ok(user); } }) 
    
    // all lists with user. one-to-many.
    // sails.models.list.find().populate('owner').exec(function(err, list) { if (err) { res.negotiate(err); } else { res.ok(list); } })
    
    // many-to-many association
    // all users with list. many-to-many.
    // sails.models.user.find().populate('lists').exec(function(err, user) { if (err) { res.negotiate(err); } else { res.ok(user); } }) 
    // all users with list. many-to-many.
    sails.models.list.find(1).populate('members').exec(function(err, list) { if (err) { res.negotiate(err); } else { res.ok(list); } }) 
  }
};

