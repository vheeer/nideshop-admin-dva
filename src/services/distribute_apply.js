import request from '../utils/request';
import config from '../config';

export function accept(data) {
  console.log("service: data ", JSON.stringify(data));
  return request(config.host + '/distribute_apply/accept', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'withCredentials': true
    },
    body: "id=" + data
  });
}
