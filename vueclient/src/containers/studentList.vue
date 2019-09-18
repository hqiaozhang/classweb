<template>
  <div class="student_container main_container">
     <div class="fs14_title">
			用户列表
				<div class="right_buttons">
					<button class="add_button" @click="dialogVisible = true">添加学员</button>
				</div> 
		</div>

    <el-table :data="listData"
						stripe
              style="width: 100%">
      <el-table-column width="100"
                       type="index"
                       label="序号">
      </el-table-column>
      <el-table-column prop="name"
                       label="用户名">
      </el-table-column>
      <el-table-column prop="phone"
                       label="手机号">
      </el-table-column>
      <el-table-column prop="learning"
                       label="学习进度">
      </el-table-column>
      <el-table-column prop="teacher"
                       label="学习顾问">
      </el-table-column>
			<el-table-column prop="" label="操作" class-name="operation blue_color">>
				<div slot-scope="scope">
					<a @click="editInfo(scope.row)">编辑</a>
					<a @click="requestDeleteUser(scope.row)">删除</a>
				</div>
      </el-table-column>
    </el-table>

    <el-dialog
      title="新增学员"
      :visible.sync="dialogVisible"
      width="450px"
      :before-close="handleClose">
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
  <el-form-item label="姓名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="phone">
    <el-input v-model="ruleForm.phone"></el-input>
  </el-form-item>
  <el-form-item label="学习顾问" prop="teacher">
    <el-select v-model="ruleForm.teacher" placeholder="请选择学习顾问">
      <el-option v-for="item in adminList" :key="item.id" :label="item.fullName" :value="item.fullName"></el-option>
       
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </el-dialog>

  </div>
</template>

<script>
import { fetch } from "@/util/request";
export default {
  name: 'studentList',
  data() {
    return {
      dialogVisible: false,
      adminList: [],
      listData: [],
      ruleForm: {
          name: '',
          phone: '',
          teacher: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          teacher: [
            { required: true, message: '请选择学习顾问', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入电话', trigger: 'blur' }
          ],
        }
    }
  },
  mounted() {
    this.requestUserList()
    this.requestStudentList()
  },
  methods: {
     // 查询列表
    requestUserList(page) {
      fetch("fetchAadminList", data => {
        this.adminList = data.data;
      });
    },
    // 查询学员
    requestStudentList(page) {
     fetch("fetchStudentList", data => {
        this.listData = data.data; 
      });
    },
    // 新增学员
    requestAddStudent() {
      fetch('fetchStudentAdd', this.ruleForm, data => {
        if(data.code == 200) {
          this.requestStudentList()
        }
      })
    },
    // 删除
    requestDeleteUser(item) {
       fetch('fetchStudentDelete', item, data => {
        if(data.code == 200) {
          this.requestStudentList()
        }
      })
    },
    // 提交表单(新增)
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.requestAddStudent()
            this.handleClose()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      editInfo() {

      },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style>
</style>