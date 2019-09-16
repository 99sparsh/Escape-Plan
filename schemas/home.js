const Joi = require('joi');

exports.question = Joi.object({
	body: Joi.object({
	    answer: Joi.string().required(),
	})
	.required()
});