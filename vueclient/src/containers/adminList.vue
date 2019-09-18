<template>
  <div class="adminList main_container">
    <!-- <div class="fs14_title">
			用户列表
				<div class="right_buttons">
					<button class="add_button">新建</button>
				</div> 
		</div> -->
    <div class="add_user">
      <el-form :model="userInfo"
               :rules="rules"
               ref="userInfo"
               label-width="0">
					<el-form-item label="" v-if="!editAdminObj" prop="userName">
						<el-input prop="name" placeholder="登录名" v-model="userInfo.userName"></el-input>
					</el-form-item>
          <el-form-item label="" prop="fullName">
						<el-input prop="name" placeholder="姓名" v-model="userInfo.fullName"></el-input>
					</el-form-item>
					<el-form-item label="" prop="phone">
        		<el-input placeholder="手机" v-model="userInfo.phone"></el-input>
					</el-form-item>	
					<el-form-item  v-if="!editAdminObj" label="" prop="password">
        		<el-input type="password" placeholder="密码" v-model="userInfo.password"></el-input>
					</el-form-item>	
      </el-form>

      <button v-if="!editAdminObj" class="btn" @click="handleAdd()"><i class="fa fa-plus" aria-hidden="true"></i>添加</button>
			<button v-if="editAdminObj" class="btn" @click="handleAdd(1)"><i class="fa fa-save" aria-hidden="true"></i>保存</button>
			<button style="opacity: 0.8;" v-if="editAdminObj" class="btn" @click="cancelEditAdmin()"><i class="fa fa fa-times-circle-o" aria-hidden="true"></i>取消</button>

    </div>

    <el-table :data="listData"
						stripe
              style="width: 100%">
      <el-table-column width="100"
                       type="index"
                       label="序号">
      </el-table-column>
      <el-table-column prop="fullName"
                       label="姓名">
      </el-table-column>
       <el-table-column prop="userName"
                       label="登录名">
      </el-table-column>
      <el-table-column prop="phone"
                       label="手机号">
      </el-table-column>
      <el-table-column prop="student"
                       label="学员管理">
      </el-table-column>
			<el-table-column prop="" label="操作" class-name="operation blue_color">>
				<div slot-scope="scope">
					<a @click="editAdmin(scope.row)">编辑</a>
					<a @click="deleteAdmin(scope.row)">删除</a>
				</div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetch } from "@/util/request";
import { messagePopup } from "@/util/util";
import { checkPhone} from "@/util/regular";
import grid from "./grid.vue";
export default {
  name: "adminList",
  data() {
    return {
      listData: [],
      userInfo: {
        //用户信息
        userName: "",
        phone: "",
        password: "",
        fullName: '',
      },
      editAdminObj: null, //用于存放正在编辑的用户
      pageInfo: {},
      rules: {
        userName: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
         fullName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
				phone: [{ required: true, message: "请输入手机号", trigger: "blur" },
				{
              pattern: checkPhone(),
              message: "请输入有效的手机号",
              trigger: "blur"
            }]
      }
    };
  },
  mounted: function() {
    this.requestUserList();
  },
  methods: {
    // 查询列表
    requestUserList(page) {
      fetch("fetchAadminList", data => {
        this.listData = data.data;
      });
    },

    //添加用户
    requestaddUser() {
      fetch("fetchAadminAdd", this.userInfo, data => {
        if (data.code == 200) {
          this.requestUserList();
          this.emptyAdmin();
        }
      });
    },
    handleAdd(type = 0) {
      this.$refs["userInfo"].validate(valid => {
        if (valid) {
					// 1是编辑，0是新增
					if(type == 1) {
						this.requestsaveEditUser()
					}else {
						this.requestaddUser()
					}
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editAdmin(item) {
			//编辑用户
			this.$refs["userInfo"].resetFields()
      this.editAdminObj = item;
      this.userInfo = JSON.parse(JSON.stringify(item));
		},
		// 编辑
    requestsaveEditUser() {
     	fetch("fetchAadminUpdate", this.userInfo, data => {
        if (data.code == 200) {
					messagePopup( data.msg || '修改成功')
          //成功
          this.gopage(this.pageInfo.current);
          this.editAdminObj = null;
          this.emptyAdmin();
        }
      });
    },
    cancelEditAdmin() {
      this.editAdminObj = null;
      this.emptyAdmin();
    },
    emptyAdmin() {
      //清空输入框
      this.userInfo.fullName = "";
      this.userInfo.userName = ""
      this.userInfo.phone = "";
      this.userInfo.password = "";
    },
    // 删除用户
    deleteAdmin(item) {
			fetch('fetchAadminDelete', item, data =>{
				if(data.code) {
					messagePopup( data.msg || '修改成功')
					this.gopage(this.pageInfo.current);
          this.emptyAdmin();
				}
			})
    },
    gopage(index) {
      this.pageInfo.current = index;
      //查询用户数据
      this.requestUserList(index);
    }
  },
  components: { grid }
};
</script>


 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.main_container {
  .add_user {
    padding: 16px;
		display: flex;
		.el-form {
      display: flex;
      width: calc(100% - 200px);
    }
    .el-form-item,
    .el-form-item__content {
      width: 100%;
    }
    .el-input {
      margin-right: 10px;
      width: 98%;
		}
		.el-button {
			height: 32px;
			line-height: 32px;
			padding: 0 20px;
		}
  }
 
}
.input_box {
  padding: 0 10px;
}
.input_box .myinput {
  width: 25%;
}
</style>
