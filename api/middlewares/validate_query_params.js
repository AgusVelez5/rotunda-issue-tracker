const Joi = require('joi')

const validate = (schema, values) =>
  Joi.object(schema).unknown(true).validate(values)

const validate_order = (param, values) => {
  const schema = {
    [param]: Joi.string().valid('asc', 'desc'),
  }

  return validate(schema, values)
}

const validate_sortBy = (param, values) => {
  // Common object keys will only have letters or maybe numbers
  const schema = {
    [param]: Joi.string().alphanum(),
  }

  return validate(schema, values)
}

const validate_github_username = (param, values) => {
  // Github usernames can only contain alphanumeric characters and dashes
  // Cannot have multiple consecutive dashes
  // Cannot begin or end with a dash
  // Max length is 39 characters
  const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i
  const schema = {
    [param]: Joi.string().pattern(GITHUB_USERNAME_REGEX),
  }

  return validate(schema, values)
}

const VALIDATORS = [
  {
    validate: validate_order,
    affected_params: ['order'],
  },
  {
    validate: validate_sortBy,
    affected_params: ['sortBy'],
  },
  {
    validate: validate_github_username,
    affected_params: ['who'],
  },
]

module.exports = (allowed_params) => {
  return (req, _, next) => {
    // Only validate params that are allowed
    const query_params = allowed_params.reduce(
      (output, param) => ({ ...output, [param]: req.query[param] }),
      {}
    )

    // Go through all validators 
    for (const validator of VALIDATORS) {

      // If any of the affected params are in the query params
      if (validator.affected_params.some((p) => allowed_params.includes(p))) {

        // Validate all affected params
        for (const param of validator.affected_params) {

          // If param is not in query params, skip
          if (!query_params[param]) 
            continue

          const { error } = validator.validate(param, query_params)
          if (error) 
            return next({ status: 400, msg: error.details[0].message })
        }
      }
    }

    req.query = query_params
    next()
  }
}
