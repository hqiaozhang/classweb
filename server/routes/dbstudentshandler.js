let mongo = require("mongodb");
let MongoClient = mongo.MongoClient;
let assert = require('assert');
let guid  = require('./utils')
let url = require('url');
let host = "localhost";
let port = "27017";
let Urls = 'mongodb://localhost:27017/classweb';
// classweb  ===> 自动创建一个
 
/**
* @description 查找用户列表
* @param {Object} {db} 已经连接的数据库
* @param {String} {collections} 集合
* @param {Object} {selector} 查询字段
* @param {Function} {fn} 回调方法
*/
let page = function (db, collections, selector, fn) {
  let collection = db.collection(collections);
  let count = 0;
  collection.count({}, function (err1, count1) {
    try {
      assert.equal(err1, null);
    } catch (e) {
      console.log(e);
    }
    count = count1;
  });
  collection.find(selector[0], selector[1]).toArray(function (err, result) {
    try {
      assert.equal(err, null);
    } catch (e) {
      console.log(e);
      result = [];
    }

    fn(result, count); //回掉函数可接收两个参数，查询的数据 和 总数据条数
    db.close();
  });
}

//add 新增
let add = function (db, collections, selector, fn) {
  let collection = db.collection(collections);
  selector.id = guid()
  collection.insertMany([selector], function (err, result) {
    try {
      assert.equal(err, null)
    } catch (e) {
      console.log(e);
      result = [];
    };

    fn(result);
    db.close();
  });
}


//delete(删除用户)
let deletes = function (db, collections, selector, fn) {
  let collection = db.collection(collections);
  collection.deleteOne({ id: selector.id }, function (err, result) {
    try {
      assert.equal(err, null);
      assert.notStrictEqual(0, result.result.n);
    } catch (e) {
      result.result = "";
    };
    fn(result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
    db.close();
  })
};
  
let methodType = { 
  page: page,
  add: add,
  delete: deletes,
};

//主逻辑    服务器  ， 请求    --》 
// req.route.path ==》 防止前端的请求 直接操作你的数据库
/**
* @description 创建连接
* @param {Object} {req} 请求
* @param {Object} {res} 响应
* @param {String} {collections} 集合
* @param {Object} {selector} 查询字段
* @param {Function} {fn} 回调方法
*/
module.exports = function (req, res, collections, selector, fn) {
  MongoClient.connect(Urls, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    // 根据 请求的地址来确定是什么操作  （为了安全，避免前端直接通过请求url操作数据库）
    methodType[req.route.path.substr(1)](db, collections, selector, fn);
    db.close();
  });

};

