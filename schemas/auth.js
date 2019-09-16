const Joi = require('joi');

exports.register = Joi.object({
	body: Joi.object({
		name: Joi.string().min(3).max(255).required(),
		username: Joi.string().required(),
	    email: Joi.string().email().required(),
		regno: Joi.string().required(),
        password: Joi.string().min(8).required(),
		password2: Joi.string().min(8).required(),
		phone: Joi.string()
            
	})
	.required()
});

exports.login=Joi.object({
	body:Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})
	.required()
});


exports.forgot=Joi.object({
	body: Joi.object({
		email: Joi.string().email().required()
	})
	.required()
});
