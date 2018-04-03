import request from '../utils/request';
import config from '../config';

export function query() {
  return request('/api/users');
}

export function category(data) {
  return request(config.host + '/category', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  });
}

export function getGoodsByFirstCategory(data) {
  return request("https://www.dapingkeji.com/nide/admin/goods/getGoodsByCategory?category_id=" + data.category_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  });
}

export function getGalleryByGood(data) {
  return request("https://www.dapingkeji.com/nide/admin/goods/getGalleryByGood?goods_id=" + data.goods_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  });
}