const axios = require('axios');

const forwardHeaders = (req, user) => ({
  authorization: req.headers.authorization,
  'content-type': req.headers['content-type'] || 'application/json',
  'x-user-id': user?.id ? String(user.id) : undefined,
  'x-user-name': user?.name,
  'x-user-email': user?.email
});

const proxyRequest = async ({ req, res, targetUrl, user }) => {
  const response = await axios({
    method: req.method,
    url: targetUrl,
    params: req.query,
    data: req.body,
    headers: forwardHeaders(req, user),
    validateStatus: () => true
  });

  return res.status(response.status).json(response.data);
};

module.exports = {
  proxyRequest
};