const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// google sign in
const GOOGLE_CLIENT_ID = '221196949367-9jpu0k22ikpd1pv44kt8gp472i58j011.apps.googleusercontent.com';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// Load User model
const User = require("../../models/User");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post('/signin', function(req, res){
    User.findOne({email: req.body.email})
        .exec()
        .then(function(user) {
          console.log(user);
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                if(result) {
                    const JWTToken = jwt.sign({
                            email: user.email,
                            _id: user._id
                        },
                        'secret',
                        {
                            expiresIn: '2h'
                        });
                    return res.status(200).json({
                        success: 'Authenticated',
                        token: JWTToken,
                        user
                    });
                }
                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error.response
            });
        });
});

router.post('/signInThirdParty', function(req, res){
	verifyGoogle(req.body.token)
		.then(data => {
			User.findOne({email: data.email})
				.exec()
				.then(function(user) {
					const JWTToken = jwt.sign({
							email: user.email,
							_id: user._id
						},
						'secret',
						{
							expiresIn: '2h'
						});
					return res.status(200).json({
						success: 'Authenticated',
						token: JWTToken,
						user
					});
				});
		})
		.catch(error => {
			res.status(401).json({
				error: error.response
			});
		});
});

async function verifyGoogle(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	// const userid = payload['sub'];
	// If request specified a G Suite domain:
	//const domain = payload['hd'];
    return ticket.getPayload();
}

module.exports = router;
