import request from './request';
import { objToParams } from './mini_utils';
import config from '../config';

export function query() {
  return request('/api/users');
}

export function read(params) {
	const { id, model } = params;
	return request(config.host + '/' + model + '/read?id=' + id, {
		method: 'get'
	});
}
