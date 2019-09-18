<template>
  <div class="adminList main">
    <div class="input_box">
			<input v-model="userInfo.name" autocomplete="off" class="myinput" type="text" placeholder="用户名" />
			<input v-model="userInfo.phone" autocomplete="off" class="myinput" type="text" placeholder="手机号" />
			<input v-if="!editAdminObj" autocomplete="off" v-model="userInfo.password" class="myinput" type="password" placeholder="密码" />
			<button v-if="!editAdminObj" class="btn" @click="requestaddUser()"><i class="fa fa-plus" aria-hidden="true"></i>添加</button>
			<button v-if="editAdminObj" class="btn" @click="requestsaveEditUser()"><i class="fa fa-save" aria-hidden="true"></i>保存</button>
			<button style="opacity: 0.8;" v-if="editAdminObj" class="btn" @click="cancelEditAdmin()"><i class="fa fa fa-times-circle-o" aria-hidden="true"></i>取消</button>
		</div>
		<grid 
			:listData="listData"
			:theadData="theadData"
			:ifEdit="true"
			:ifDelete="true"
			:ifpage="true"
			:pageInfo="pageInfo"
			@on-delete="deleteAdmin"
			@on-edit="editAdmin"
			@on-gopage="gopage"
		></grid>
  </div>
</template>

<script>
	var theadData = [
		{
			title:"用户名",
			keyname:"name"
		},{
			title:"手机号",
			keyname:"phone"
		}
	];
	import grid from './grid.vue'
	export default {
		name: 'adminList',
		data () {
			return {
				listData:[],
				theadData:theadData,
				userInfo:{ //用户信息
					name:"",
					phone:"",
					password:"",
				},
				editAdminObj:null,  //用于存放正在编辑的用户
				pageInfo:{}
			}
		},
		mounted:function(){
		
			this.requestUserList(1);
		},
		methods:{
			// 查询列表
			requestUserList(page){
				this.$reqs.post('/users/page',{
					page:page
				}).then((res) => { 
					//成功
	 
					this.listData = res.data.result.data;
					this.pageInfo.allpage = Math.ceil( res.data.result.total/5 );
				}).catch(function (error) {
					//失败
			    	console.log(error)
				});
			},
			//添加用户
			requestaddUser(){ 
				if(!this.userInfo.name || !this.userInfo.phone || !this.userInfo.password){
					alert("不能为空");
					return false;
				}
				this.$reqs.post('/users/add',this.userInfo)
				.then((res)=>{
					//成功
					this.requestUserList();
					this.emptyAdmin();
				}).catch(function (error) {
					//失败
			    console.log(error)
				});
				
			},
			editAdmin(item){ //编辑用户
				this.editAdminObj = item;
				this.userInfo = JSON.parse(JSON.stringify(item));
			},
			requestsaveEditUser(){
				if(!this.userInfo.name || !this.userInfo.phone){
					alert("不能为空");
					return false;
				}
				this.$reqs.post('/users/update', this.userInfo)
				.then((res)=>{
					//成功
					this.gopage(this.pageInfo.current);
				
					this.editAdminObj = null;
					this.emptyAdmin();
				}).catch(function (error) {
					//失败
			    console.log(error)
				});
			},
			cancelEditAdmin(){
				this.editAdminObj = null;
				this.emptyAdmin();
			},
			emptyAdmin(){ //清空输入框
				this.userInfo.name = "";
				this.userInfo.phone = "";
				this.userInfo.password = "";
			},
			// 删除用户
			deleteAdmin(item){
				 
				this.$reqs.post('/users/delete', item)
				.then((res)=>{
					//成功
					this.gopage(this.pageInfo.current);
					this.emptyAdmin();
				}).catch(function (error) {
					//失败
			    console.log(error)
				});
			},
			gopage(index){
				this.pageInfo.current = index;
				//查询用户数据
				this.requestUserList(index)
			}
		},
		components:{grid}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.main{
		border-radius: 4px;
		background: #fff;
		margin-top: 10px;
	}
	.input_box{
		padding: 0 10px;
	}
	.input_box .myinput{
		width: 25%;
	}
</style>
