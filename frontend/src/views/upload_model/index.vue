<template>
  <div class="app-container">
    <div style="margin: 20px;"></div>
    <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
      <el-form-item label="模型名称" prop="hash">
        <el-input v-model="form.hash" placeholder="请输入模型名称" style="width: 50%;"></el-input>
      </el-form-item>
      <el-form-item label="模型文件" prop='fileList'>
        <div style="font-size: 14px;color: #606266;"><svg-icon icon-class="tip" style="margin-right: 10px;"/>
        请上传.pth或.pt文件</div>
        <el-upload
          class="upload-demo"
          :action="['http://127.0.0.1:8000/upload/model/?model_name=' + this.form.hash]"
          :on-change="handleChange"
          accept=".pt, .pth"
		  multiple
          :limit="1"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :before-remove="beforeRemove"
          :file-list="form.fileList"
		  :data="type"
          style="width: 50%;">
          <el-button size="large" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { judge_apply } from '@/api/judge'
export default {
  data(){
    const validatefileList = (rule, value, callback) => {
      if(value == '' && this.type == 1){
        callback(new Error('请先上传模型'))
      }else{
        callback()
      }
    }
    return {
      type: 0,
      loading: false,
      form:{
        hash:'',
        api: '',
        fileList: []
      },
      formRules: {
        hash: [{required: true, message:'请输入模型名称',trigger:'blur'}],
        fileList: [{required: true, validator:validatefileList, trigger:'blur'}],
      }
    }
  },
  created(){
  	this.getfill()
  },
  methods:{
    getfill() {
      if(this.$route.params.hash !== ':hash') {
        this.form.hash = this.$route.params.hash
        this.type = this.$route.params.type === '黑盒' ? 0 : 1
      }
    },
    judge_apply(){
      this.$refs.form.validate(valid => {
        if(valid){
          this.loading = true
          judge_apply(this.form).then(response => {
            console.log(response.message)
            if(response.message == 'success') {
              this.$message({
                message: '模型提交成功',
              	type: 'success',
              	showClose: true,
              	duration: 2 * 1000
              })
              this.loading = false
            }
          }).catch(() => {
              this.loading = false
            })
        }else{
          return false
        }
      })
    },
    handleChange(file, fileList) {
      this.form.fileList = fileList.slice(-3)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.form.fileList = fileList.slice(-3)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style>
</style>
