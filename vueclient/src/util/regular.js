export function checkPhone() {
  // return /^1[12345789]\d{9}$/
  return /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
}

export function checkEmail() {
  return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
}

// // 登录名由字母、数字、下划线组成，且首字符不能为数字。
// export function checkUserName() {
//   return /^[a-zA-Z0-9_]{1,}$/
// }


// 登录名由字母、数字、下划线组成，且首字符不能为数字。
export function checkUserName() {
  return /^[a-zA-Z_][a-zA-Z0-9_]{0,}$/
}
// 经度
export function checkLocLng() {
  return /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
}

// 纬度
export function checkLocLat() {
  return /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
}

// 偏移量
export function checkLeftTopPx() {
  return /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/
}

