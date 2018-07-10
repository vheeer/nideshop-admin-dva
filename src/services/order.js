import request from '../utils/request';
import { objToParams } from '../utils/mini_utils';
import config from '../config';

export function query() {
  return request('/api/users');
}

export function read() {
  return request(config.host + '/order', {
    method: 'options',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  });
}
