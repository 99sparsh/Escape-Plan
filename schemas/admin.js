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

exports.hint = Joi.object({
	body: Joi.object({
		qid: Joi.number().integer().required(),
		body: Joi.string().required()
	})
	.required()
})