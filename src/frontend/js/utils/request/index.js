function request(reqMethod, url, otherData = {}) {
  const method = reqMethod || 'GET';
  const headers = otherData.headers || {};
  const body = otherData.body || null;
  /* eslint quote-props: 0 */
  const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };

  const requestConfig = {
    method,
    credentials: 'include',
    headers: defaultHeaders,
  };

  if (body !== null) {
    requestConfig.body = JSON.stringify(body);
  }

  return fetch(url, requestConfig).then(
    (res) => {
      const contentType = res.headers.get('content-type');

      if (contentType && contentType.indexOf('application/json') !== -1) {
        return res.json();
      }

      return res;
    }
  );
}


function get(url, otherData) {
  return request('GET', url, otherData);
}

function post(url, otherData) {
  return request('POST', url, otherData);
}

function put(url, otherData) {
  return request('PUT', url, otherData);
}

function remove(url, otherData) {
  return request('DELETE', url, otherData);
}


export default request;
export { get, post, put, remove };
