  <template>
	<el-card height="600px">
		<el-table
		  :data="tableData"
		  style="width: 100%">
		  <el-table-column
			prop="model_name"
			label="模型名称"
			width="180">
		  </el-table-column>
		  <el-table-column
			prop="model_url"
			label="模型内容"s
			width="540">
		  </el-table-column>
		  <el-table-column
			prop="model_p"
			label="进行计算">
			<template slot-scope="scope">
			  <el-tooltip content="点击开始" placement="top">
			    <a href="javascript:;" @click="todetail">开始隐私计算</a>
			  </el-tooltip>
			</template>
		  </el-table-column>
		</el-table>
	</el-card>
  </template>

<script>
import  {all_models} from '@/api/model'
    export default {
      data() {
        return {
          tableData: []
        }
      },
	  created(){
		this.getlist()  
	  },
	  methods: {
		getlist(){
	      all_models().then(response => {
			console.log(response)
			this.tableData = response.data 
		  })		
		},
		todetail() {
		  this.$router.push({ path:'/upload_data/' })
		},  
	  },
    }
  </script>