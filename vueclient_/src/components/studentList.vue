<template>
  <div class="student_container common_container">
    <div class="right_buttons">
      <span>新增学员</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'studentList',
  data() {
    return {

    }
  },
  mounted() {
    this.requestStudentList(1)
  },
  methods: {
    requestStudentList(page) {
      	this.$reqs.post('/students/page',{
					page:page
				}).then((res) => { 
					 console.log(res)
				}).catch(function (error) {
					//失败
			    	console.log(error)
				});
    }
  }
}
</script>

<style>
</style>