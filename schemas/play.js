const Joi = require('joi');

exports.answer = Joi.object({
	body: Joi.object({
	    answer: Joi.string().required()
	})
	.required(),
	query: Joi.object({
		id: Joi.number().required()
	})
	.required()
});