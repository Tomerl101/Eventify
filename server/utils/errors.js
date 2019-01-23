class ApiError extends Error {
  constructor(message) {
    super();
    this.message = message;
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

  get ServerError() {
    return {
      name: 'SERVER ERROR',
      message: this.message,
      status: 500
    }
  }
}

module.exports = ApiError;