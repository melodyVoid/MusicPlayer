import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?'
  const params = {
    ...commonParams,
    ...{
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      pagesize: 100,
      pagenum: 1,
      loginUin: 0,
      hostUin: 0,
      platform: 'yqq',
      needNewCode: 0
    }
  }
  return jsonp(url, params, options)
}

// 获取歌手详情
export function getSingerDetails(singermid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?'
  const params = {
    ...commonParams,
    ...{
      loginUin: 0,
      hostUin: 0,
      platform: 'yqq',
      needNewCode: 0,
      order: 'listen',
      begin: 0,
      num: 100,
      songStatus: 1,
      singermid
    }
  }
  return jsonp(url, params, options)
}
