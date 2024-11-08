export default async function preview(req, res) {
  try {
    const { id, post_type } = req.query

    let baseRoute = 'insight'

    if (post_type === 'post') {
      baseRoute = 'news'
    } else {
      baseRoute = post_type
    }

    // Redirect to post dynamic route.
    res.redirect(`/${baseRoute}/${id}`)
  } catch (error) {
    return res.status(error?.status || 401).json({
      message:
        error?.message ||
        'An error occurred while attempting to view post preview',
    })
  }
}
