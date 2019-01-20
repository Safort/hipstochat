async function request(reqMethod, url, otherData = {}, auth = false) {
  const method = reqMethod || 'GET';
  const body = otherData.body || null;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(otherData.headers || {}),
  };
  const requestConfig = {
    method,
    headers,
    credentials: 'include',
  };

  if (body !== null) {
    requestConfig.body = JSON.stringify(body);
  }

  return fetch(url, requestConfig).then(responseHandler);
}

function responseHandler(res) {
  const contentType = res.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return res.json();
  }

  return res;
}

function get(url, otherData, auth) {
  return request('GET', url, otherData, auth);
}

function post(url, otherData, auth) {
  return request('POST', url, otherData, auth);
}

function put(url, otherData, auth) {
  return request('PUT', url, otherData, auth);
}

function remove(url, otherData, auth) {
  return request('DELETE', url, otherData, auth);
}

export default request;
export { get, post, put, remove };
