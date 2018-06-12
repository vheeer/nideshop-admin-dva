// import fetch from 'dva/fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    //这里是可以读取到这些信息的. 但是我不会重新包装. 
    console.log(response.headers.get('x-pagination-page-count')); //35
    console.log(response.headers.get('x-pagination-total-count')); //411
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {

  return response.json();
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  if(!options)
    options = {};
  options.credentials = 'include';
  // options["a"] = "b";
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data)=>({data}))
    .catch((err) => ({ err }));
}