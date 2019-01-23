class ApiError extends Error {
  constructor() {
    super()
  }

  static get NotFoundError() {
    return {
      name: 'NOT FOUND',
      message: 'not found',
      status: 404
    }
  }

  static get NotAuthoraize() {
    return {
      name: 'NO AUTHORIZED',
      message: 'User is not authorized',
      status: 401
    }
  }

  static get ServerError() {
    return {
      name: 'SERVER ERROR',
      message: 'Internal error',
      status: 500
    }
  }
}

module.exports = ApiError;