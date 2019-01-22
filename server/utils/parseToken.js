export const parseToken = token => {
  if (token.split(' ')[0] === 'Bearer') {
    return token.split(' ')[1];
  }
}