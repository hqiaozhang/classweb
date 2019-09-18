/*
 * @Author: zhanghongqiao 
 * @Date: 2019-09-18 09:37:22 
 * @Email: 991034150@qq.com 
 * @Description: 学员信息查询
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-18 17:28:50
 */

var express = require('express');
var router = express.Router();
var handler = require('./dbstudentshandler.js');
var crypto = require('crypto');


// 查询管理员列表
router.post('/page', function (req, res, next) {
	handler(req, res, "students", { page: req.body.page }, function (data) {
			// 返回结果
			let result = {
				msg: 'error',
				code: 500,
				result: {
					data: [],
					total: 0,
				}
			}
		if (data.length === 0) {
			result.msg = 'success'
			result.code = 200
			res.end(JSON.stringify(result))
		} else {
			// 成功 
			result.msg = 'success'
			result.code = 200
			result.result = {
				data: data,
				total: data.length
			}
			res.end(JSON.stringify(result))
		}
	});
});


// 新增用户
router.post('/add', function (req, res, next) {
	handler(req, res, "students", req.body, function (data) {
		// 返回结果
		let result = {
			msg: '新增失败',
			code: 500
		}
		if (data.length === 0) {
			res.end(JSON.stringify(result))
		} else {
			result.msg = 'success'
			result.code = 200
			result.result = true
			res.end(JSON.stringify(result))
		}
	});
});

// 删除用户
router.post('/delete', function (req, res, next) {
	handler(req, res, "students", req.body, function (data) {
		let result = {
			msg: '删除失败',
			code: 500
		}
		if (data.length === 0) {
			res.end(JSON.stringify(result))
		} else {
			result.msg = '删除成功'
			result.code = 200
			result.result = true
			res.end(JSON.stringify(result))
		}
	});
});

module.exports = router;