<template>
  <div class="app-container">
    <div style="margin: 20px;"></div>
    <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
      <el-form-item label="模型名称" prop="model_name">
        <el-select v-model="form.model_name" placeholder="请选择">
            <el-option
              v-for="item in choose"
              :key="item.model_name"
              :label="item.model_name"
              :value="item.model_name">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="模型文件" prop='fileList'>
        <div style="font-size: 14px;color: #606266;"><svg-icon icon-class="tip" style="margin-right: 10px;"/>
        请上传数据文件</div>
        <el-upload
          class="upload-demo"
          :action="['http://127.0.0.1:8000/upload_data/?model_name=' + this.form.model_name]"
          :on-change="handleChange"
		  multiple
          :limit="1"
		  :on-success="handleUpload"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :before-remove="beforeRemove"
          :file-list="form.fileList"
		  :data="type"
          style="width: 50%;">
          <el-button :disabled="isDisabled()" size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
	  <el-form-item>
		  <el-button :disabled="finished" @click="toResult" >完成</el-button>		  
	  </el-form-item>
    </el-form>
<!-- 	<el-card style="display: flex; margin-top: 20px; height: 300px;width: 800px;" class="box-card" v-show="finished">
	  <div slot="header" class="clearfix">
	    <span>运算结果</span>
	  </div>	
	  <div>
		  <img src='~@/assets/5.png' class="image" height="200">
	  </div>
	  <div margin="20"></div>
	  <div>
	  	  <el-tag type="info">模型名称：</el-tag>{{form.model_name}}
	  </div>
	  <div>
		  运算时间：0.37 s
	  </div>
	  <div>
	  	  运算开销：195 MB
	  </div>
	  <div>
	  	  计算结果：5
	  </div>
	</el-card> -->
	  <div>
	    <el-button>运算结果</el-button>
	
	    <div style="display: flex; margin-top: 20px; height: 100px;">
		  <div>
		  	<img src='~@/assets/9_3542.jpg' class="image" height="300">
		  </div>
		  <div>
			  <transition>
			  	<div class="transition-box" style="font-weight: bold;">模型名称：图像识别VGG16</div>
			  </transition>
			  <transition name="el-fade-in-linear">
				<div class="transition-box" style="font-weight: bold;">运算时间：0.59s</div>
				<div>hello</div>
			  </transition>
			  <transition name="el-fade-in">
				<div class="transition-box" style="font-weight: bold;">运算开销：207 MB</div>
			  </transition>
			  <transition>
			  	<div class="transition-bob" style="font-weight: bold;">计算结果：货车</div>
			  </transition>
		  </div>
	    </div>
	  </div>
  </div>
</template>

<script>
import { judge_apply } from '@/api/judge'
import {choose_models} from '@/api/model'
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
	  filename:'',
	  finished:false,
	  value:new Date(),
	  disabled: true,
      loading: false,
	  computeResult:{
		  time:0,
		  result:'10',
	  },
      form:{
		model_name:'',  
        fileList: []
      },
	  choose:[],
      formRules: {
        model_name: [{required: true, message:'请选择模型名称',trigger:'blur'}],
        fileList: [{required: true, validator:validatefileList, trigger:'blur'}],
      }
    }
  },
  created(){
  	this.getlist()
  },
  methods:{
	toResult(){
		this.finished=true
	},
	isDisabled(){
		if(this.form.model_name != ''){
			return this.disabled=false
		}
		else{
			return this.disabled=true
		}
	},  
	getlist(){
	  choose_models().then(response => {
		console.log(response)
		this.choose = response.data 
	  })		
	},  
	handleUpload(file, fileList) {
		this.finished=true
		this.filename=file.url
		console.log(this.filename)
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
	  .text {
	    font-size: 14px;
	  }
	
	  .item {
	    padding: 18px 0;
	  }
	
	  .box-card {
	    width: 480px;
	  }
	.transition-box {
	      margin-bottom: 15px;
	      width: 300px;
	      height: 34px;
	      border-radius: 4px;
	      background-color: #d7ffd0;
	      text-align: start;
	      color: #000000;
	      padding: 8px 10px;
	      box-sizing: border-box;
	      margin-right: 20px;
		  margin-left: 20px;
		  text-emphasis-style: bold;
	    }
		.transition-bob {
		      margin-bottom: 15px;
		      width: 300px;
		      height: 34px;
		      border-radius: 4px;
		      background-color: #d7ffd0;
		      text-align: start;
		      color: #000000;
		      padding: 8px 10px;
		      box-sizing: border-box;
		      margin-right: 20px;
			  margin-left: 20px;
			  text-emphasis-style: bold;
			  word-break: normal;
			  word-wrap: break-word;
		    }
</style>
