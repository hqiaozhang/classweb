var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});



// 登录
router.post('/login', function (req, res, next) {
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	handler(req, res, "user", { name: req.body.username }, function (data) {
		// 返回结果
		let result = {
			msg: '',
			code: 500
		}
		if (data.length === 0) {
			result.msg = "抱歉，系统中并无该用户，如有需要，请向管理员申请"
			res.end(JSON.stringify(result))
		} else if (data[0].password !== password) {
			result.msg = "密码不正确"
			res.end(JSON.stringify(result))
		} else if (data.length !== 0 && data[0].password === password) {
			req.session.username = req.body.username; //存session
			req.session.password = password;
			// 返回结果
			result.msg = ""
			result.success = true
			result.code = 200
			result.result = {
				username: ''
			}
			res.end(JSON.stringify(result))
		}
	});
});

// 退出登录
router.post('/logout', function (req, res, next) {
	res.end('{"success":"true"}');
});

// 查询管理员列表
router.post('/page', function (req, res, next) {
	handler(req, res, "user", { page: req.body.page }, function (data) {
			// 返回结果
			let result = {
				msg: 'error',
				code: 500,
				result: {
					data: []
				}
			}
		// 失败 
		if (data.length === 0) {
			result.msg = 'error'
			result.result = {
				username: ''
			}
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
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	req.body.password = password
	
	handler(req, res, "user", req.body, function (data) {
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

// 修改用户
router.post('/update', function (req, res, next) {
	handler(req, res, "user", req.body, function (data) {
		// 返回结果
		let result = {
			msg: '修改失败',
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
	handler(req, res, "user", req.body, function (data) {
		let result = {
			msg: 'error',
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


module.exports = router;
