import request from '../utils/request';
import { objToParams } from '../utils/mini_utils';
import config from '../config';

export function query() {
  return request('/api/users');
}

  /**
   * read request
   * params { select_description: { id, page, offset, order }, model }
   * @return {Promise} []
   */
export function read({ model, ...params }) {
	const params_str = objToParams(params);

	let url = config.host + '/' + model + '/read?' + params_str;

	return request(url, {
		method: 'get',
		headers: {
	      'withCredentials': true
	    },
	});
}
  /**
   * readColumn request
   * params readDesc
   * @return {Promise} []
   */
export function readColumn({ model, ...params }) {
	const params_str = objToParams(params);

	let url = config.host + '/' + model + '/readcolumn';

	return request(url, {
		method: 'get'
	});
}

  /**
   * create request
   * params { values, model }
   * @return {Promise} []
   */
export function create({ model, ...params }) {
	const params_str = objToParams(params);

	let url = config.host + '/' + model + '/create';

	return request(url, {
		method: 'post',
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	    },
		body: params_str
	});
}

  /**
   * update request
   * params { values, model }
   * @return {Promise} []
   */
export function update({ model, ...params }) {
	const params_str = objToParams(params);

	let url = config.host + '/' + model + '/update';

	return request(url, {
		method: 'post',
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	    },
		body: params_str
	});
}


  /**
   * delete request
   * params { values, model }
   * @return {Promise} []
   */
export function delete_row({ model, id }) {
	const params_str = objToParams({ id });

	let url = config.host + '/' + model + '/delete';

	return request(url, {
		method: 'post',
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	    },
		body: params_str
	});
}
