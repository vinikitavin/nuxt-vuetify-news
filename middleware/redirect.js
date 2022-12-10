export const routes = {
  main: '/',
  news: '/news'
}

const myServerMiddleware = (req, res, next) => {
  const redirect = routes.main === req.url
  if (redirect) {
    res.writeHead(301, { Location: routes.news })
    res.end()
  } else {
    next()
  }
}
export default myServerMiddleware
