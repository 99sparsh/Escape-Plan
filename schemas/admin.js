const Joi = require('joi');

exports.question = Joi.object({
	body: Joi.object({
		qno: Joi.number().integer().required(),
		body: Joi.string().required(),
	    answer: Joi.string().required(),
		hint: Joi.string()
	})
	.required()
});