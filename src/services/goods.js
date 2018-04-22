import request from '../utils/request';
import { objToParams } from '../utils/mini_utils';
import config from '../config';

export function query() {
  return request('/api/users');
}

export function category() {
  return request(config.host + '/category', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  });
}

export function getGoodsByFirstCategory({ category_id }) {
  return request(config.host + "/goods/getGoodsByCategory?category_id=" + category_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  });
}

export function getGalleryByGood({ goods_id }) {
  return request(config.host + "/goods/getGalleryByGood?goods_id=" + goods_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  });
}

export function postCategoryValues({ values }) {
  return request(config.host + "/category/postCategoryValues", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: objToParams(values)
  });
}

export function postGoodsValues({ values }) {
  return request(config.host + "/goods/postGoodsValues", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: objToParams(values)
  });
}

export function addCategory({ parent_id }) {
  const body = parent_id?("parent_id=" + parent_id):"";
  return request(config.host + "/category/addCategory", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body
  });
}

export function addGoods({ category_id }) {
  const body = "category_id=" + category_id;
  return request(config.host + "/goods/addGoods", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body
  });
}
export function deleteGallery({ galleryId }) {
  const body = "galleryId=" + galleryId;
  return request(config.host + "/goods/deleteGallery", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body
  });
}
