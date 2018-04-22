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
export function read(params) {
	const { select_description, model } = params;
	const params_str = objToParams(select_description);

	let url = config.host + '/' + model + '/read?' + params_str;

	return request(url, {
		method: 'get'
	});
}

  /**
   * create request
   * params { values, model }
   * @return {Promise} []
   */
export function create(params) {
	const { insert_values, model } = params;
	const params_str = objToParams(insert_values);

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
export function update(params) {
	const { update_values, model } = params;
	const params_str = objToParams(update_values);

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
export function delete_row(params) {
	const { id, model } = params;
	const params_str = objToParams({ id }, { auto_delete_id: false });
	console.log("params_str", params_str);

	let url = config.host + '/' + model + '/delete';

	return request(url, {
		method: 'post',
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	    },
		body: params_str
	});
}
