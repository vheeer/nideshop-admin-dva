import request from '../utils/request';
import config from '../config';

export function login(data) {
  console.log("service: data ", JSON.stringify(data));
  return request(config.host + '/user_login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //'Content-Type': 'application/json',
    },
    body: JSON.stringify(data).replace('\'','"'),
  });
}
export function register(data) {
  console.log("service: data ", JSON.stringify(data));
  return request(config.host + '/user_register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //'Content-Type': 'application/json',
    },
    body: JSON.stringify(data).replace('\'','"'),
  });
}
export function logout(data) {
  console.log("service: data ", JSON.stringify(data));
  return request(config.host + '/user_logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //'Content-Type': 'application/json',
    },
  });
}
export function changePSD(data) {
  console.log("service: data ", JSON.stringify(data));
  return request(config.host + '/user_changePSD', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //'Content-Type': 'application/json',
    },
    body: JSON.stringify(data).replace('\'','"'),
  });
}