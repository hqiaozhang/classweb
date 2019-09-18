/*
 * @Author: zhanghongqiao
 * @Date: 2018-07-05 15:10:36
 * @Email: 991034150@qq.com
 * @Description: 时间类工具
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-04-26 22:05:08
 */

 /**
 *
 * TODO //对Date的扩展，将 Date 转化为指定格式的String //月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用
 * 1-2 个占位符， //年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) //例子： //(new
 * Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 //(new
 * Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18 Date
 * 2015年6月23日下午1:31:48 Author liuylong
 */
export function formatDate (date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "H+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds()
        // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  };

  export function timeFormat(fmt, sourceDate, h) {
      var curDate = new Date(sourceDate);
      // 加上一小时
      var date = new Date(curDate.getTime() + 3600000 * h)
      var o = {
          "M+": date.getMonth() + 1,                 //月份
          "d+": date.getDate(),                    //日
          "h+": date.getHours(),                   //小时
          "m+": date.getMinutes(),                 //分
          "s+": date.getSeconds(),                 //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds()             //毫秒
      };
      if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
      }
      return fmt
  }


  export  function dateFormat(fmt, t, sourceDate) {
      var date
      switch (t) {
          case 0:  // 减一天
              var curDate = !sourceDate ? new Date() : new Date(sourceDate);
              date = new Date(curDate.getTime() - 24 * 60 * 60 * 1000)
           break;
          case 1:  // 加一天
              var curDate = !sourceDate ? new Date() : new Date(sourceDate);
              date = new Date(curDate.getTime() + 24 * 60 * 60 * 1000)
              break;
          case 2: // 传入的时间
              date = sourceDate
              break
          default:
              date = new Date()
           break
      }

      var o = {
          "M+": date.getMonth() + 1,                 //月份
          "d+": date.getDate(),                    //日
          "h+": date.getHours(),                   //小时
          "m+": date.getMinutes(),                 //分
          "s+": date.getSeconds(),                 //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds()             //毫秒
      };
      if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
      }
      return fmt;
  };

  /**
   * 判断是否是今天
   * @param dateStr 时间字符
   * @param type 1表示判断是否今天 2判断是否是昨天 3判断是否是今年
   * @returns {boolean}
   */
  export function isDateByType(dateStr, type) {
      let d = new Date(dateStr);
      let nowDate = new Date();
      d.setHours(0, 0, 0, 0);
      nowDate.setHours(0, 0, 0, 0);
      let flag = false
      switch (type) {
          case 1:
              flag = (d.getTime() === nowDate.getTime());
              break;
          case 2:
              var yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              yesterday.setHours(0, 0, 0, 0);
              flag = (d.getTime() >= yesterday.getTime() && d.getTime() < nowDate.getTime())
              break;
          case 3:
              flag = (d.getFullYear() === nowDate.getFullYear());
              break;
          default:
              // 默认去年
              flag = (d.getFullYear() < nowDate.getFullYear());
      }
      return flag;
  }


/**
 * 计算两个时间的差值,并判断不能超过一定的界限
 * @param start
 * @param end
 * @param type
 * @returns {boolean}
 */
export function calcDateInterval(start, end, type) {
    let Nstart = start,
        Nend = end;
    let dateStart = new Date(Nstart),
        dateEnd = new Date(Nend);
    console.log(dateStart + '-------' + dateEnd)
    let start_year = dateStart.getFullYear(),
        start_month = dateStart.getMonth() + 1,
        start_day = dateStart.getDate(),
        start_hour = dateStart.getHours(),
        end_year = dateEnd.getFullYear(),
        end_month = dateEnd.getMonth() + 1,
        end_day = dateEnd.getDate(),
        end_hour = dateEnd.getHours();
    let d_value_year = end_year - start_year, //年的差值
        d_value_month = end_month - start_month, //月的差值
        d_value_day = end_day - start_day, //天的差值
        d_value_hour = end_hour - start_hour; //小时的差值
    switch (type) {
        case '1month_hh': {
            if (d_value_year == 0) { //一年内的时间判断
                if (d_value_month > 1) {
                    // layer.msg("查询时间不能超过一个月！");
                    return false;
                } else if (d_value_month == 1) {
                    if (d_value_day >= 1) {
                        // layer.msg("查询时间不能超过一个月");
                        return false;
                    } else if (d_value_day == 0) {
                        if (d_value_hour >= 1) {
                            // layer.msg("查询时间不能超过一个月");
                            return false;
                        }
                    }
                }
            } else if (d_value_year == 1) { //跨年 12月 -1月
                if (d_value_month == -11) {
                    if (d_value_day >= 1) {
                        // layer.msg("查询时间不能超过一个月");
                        return false;
                    } else if (d_value_day == 0) {
                        if (d_value_hour >= 1) {
                            // layer.msg("查询时间不能超过一个月");
                            return false;
                        }
                    }
                } else {
                    // layer.msg("查询时间不能超过一个月");
                    return false;
                }
            } else {
                // layer.msg("查询时间不能超过一个月！");
                return false;
            }
        }
            break;
        case '30day': {
            let daynum = 30;
            let get_s_time = new Date(end),
                get_e_time = new Date(start);
            if ((get_s_time - get_e_time) > 1000 * 60 * 60 * 24 * daynum) {
                // layer.msg('查询时间不得大于' + daynum + '天！');
                return false;
            }
        }
            break;
        case '1day': {
            let daynum = 1;
            let get_s_time = new Date(end),
                get_e_time = new Date(start);
            if ((get_s_time - get_e_time) > 1000 * 60 * 60 * 24 * daynum) {
                // layer.msg('查询时间不得大于' + daynum + '天！');
                return false;
            }
        }
            break;
        case '3day': {
            let daynum = 3;
            let get_s_time = new Date(end),
                get_e_time = new Date(start);
            if ((get_s_time - get_e_time) > 1000 * 60 * 60 * 24 * daynum) {
                // layer.msg('查询时间不得大于' + daynum + '天！');
                return false;
            }
            break;
        }
        case '92day': {
            let daynum = 92;
            let get_s_time = new Date(end), get_e_time = new Date(start);
            if ((get_s_time - get_e_time) > 1000 * 60 * 60 * 24 * daynum) {
                // layer.open({
                //     content: '查询时间不得大于3个月！'
                // });
                return false;
            }
            break;
        }
        case '366day': {
            let daynum = 366;
            let get_s_time = new Date(end), get_e_time = new Date(start);
            if ((get_s_time - get_e_time) > 1000 * 60 * 60 * 24 * daynum) {
                // layer.open({
                //     content: '查询时间不得大于1年！'
                // });
                return false;
            }
            break;
        }
        case '1month': {
            if (d_value_year == 0) { //一年内的时间判断
                if (d_value_month > 1) {
                    // layer.msg("查询时间不能超过一个月！");
                    return false;
                } else if (d_value_month == 1) {
                    if (d_value_day >= 1) {
                        // layer.msg("查询时间不能超过一个月");
                        return false;
                    }
                }
            } else if (d_value_year == 1) { //跨年 12月 -1月
                if (d_value_month == -11) {
                    if (d_value_day >= 1) {
                        // layer.msg("查询时间不能超过一个月");
                        return false;
                    }
                } else {
                    // layer.msg("查询时间不能超过一个月");
                    return false;
                }
            } else {
                // layer.msg("查询时间不能超过一个月！");
                return false;
            }
        }
            break;
        case '3month': {
            if (d_value_year == 0) { //一年内的时间判断
                if (d_value_month > 3) {
                    // layer.msg("查询时间不能超过三个月！");
                    return false;
                } else if (d_value_month == 3) {
                    if (d_value_day >= 1) {
                        // layer.msg("查询时间不能超过三个月");
                        return false;
                    }
                }
            } else if (d_value_year == 1) { //跨年 12月 -1月
                //跨年，月份差重新计算
                d_value_month = d_value_month + 12;
                if (d_value_month > 3) {
                    // layer.msg("查询时间不能超过三个月！");
                    return false;
                } else if (d_value_month == 3) {
                    if (d_value_day >= 1) {
                        // layer.msg("查询时间不能超过三个月");
                        return false;
                    }
                }
            } else {
                // layer.msg("查询时间不能超过三个月！");
                return false;
            }
        }
            break;
        case 'year': {
            if (d_value_year == 1) {
                if (d_value_month >= 1) {
                    // layer.msg("查询时间不能超过一年！");
                    return false;
                } else if (d_value_month == 0) {
                    if (d_value_day > 1) {
                        // layer.msg("查询时间不能超过一年");
                        return false;
                    }
                }
            } else if (d_value_year > 1) {
                // layer.msg("查询时间不能超过一年");
                return false;
            }
        }
            break;
    }
    return true;
}
