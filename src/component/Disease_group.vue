<template>
  <div id="disease_group">
    <el-card class="box-card" style="margin-top: -10px;">
      <div slot="header" class="clearfix">
        <span style="font-size: 25px; font-weight: normal; padding-left: 5px;">
          病类&nbsp;
        </span>
        <span style="font-size: 25px; font-weight: bold; padding-left: 0px;">
          {{ disease_group }}
        </span>
        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="add_disease">添加疾病</el-button>
      </div>
      <el-table :data="this.list" style="width: 100%" border>
        <el-table-column fixed width="200" prop="name" label="疾病名" align="center" />
        <el-table-column prop="info" width="300" label="描述" align="center" />
        <el-table-column fixed="right" width="230">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">查看</el-button>
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-card>

    <el-dialog title="添加疾病" :visible.sync="addVisible2" width="30%" :before-close="handleClose">
      <span>病类：{{ disease_group }}</span>
      
      <el-form :rules="rules2" :model="form2">
				<el-form-item label="疾病名" prop="name">
          <el-input v-model="form2.name" placeholder="请输入疾病名"></el-input>
				</el-form-item>
        <el-form-item label="疾病描述" prop="info">
          <el-input v-model="form2.info" placeholder="请输入疾病描述"></el-input>
				</el-form-item>
			</el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible2 = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm2()">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { NetLoader } from '@/net';
export default {
  name: "Disease_group",
  data() {
    return {
      currentPage4: 4,
      search: "",
      list: [],
      loader: new NetLoader("test"),
      list2: [],
      addVisible2: false,
      form2: { name:'', info: '' },
      rules2: { name: [{ required: true, message: '请输入疾病名', trigger: 'blur' }],
                info :[{ required: true, message: '请输入疾病描述', trigger: 'blur' }] }
    };
  },
  methods: {
    add_disease() {
			this.addVisible2 = true;
		},
    handleConfirm2() {
			this.addVisible2 = false;
      this.loader.post("/disease/addDisease", {
        category: {id : this.$props.disease_groupid, name: this.$props.disease_group},
				name: this.form2.name,
        info: this.form2.info
			}).then(val => {
				if (val.status == 200) {
					this.$message.success('添加疾病成功');
          this.list = [];
					this.get_data();
				} else {
					this.$message.error(val.data.data.message);
				}
			}, err => {
				this.$message.error(err.response.data.message);
				console.log(err);
			})
		},
    get_data() {
      this.loader.get("/disease/findAllDiseases").then((val) => {
        this.list = [];
        let res = val.data.data;
        for (let item of res)
          this.list2.push(item);
        this.list = this.list2;
      }).then(() => {
        let target = this.$props.disease_groupid;
        var res = [];
        for (let item of this.list) {
          if (item.category.id == target)
            res.push(item);
        }
        console.log(res);
        this.list = res;
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该病例, 是否继续?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger'
      }).then(() => {
        this.loader.delete("/disease/deleteDisease", { id: row.id }).then(val => {
          console.log(val);
          this.list = [];
          this.get_data();
        }, err => {
          this.$message({ type: 'warning', message: err.response.data.message });
          console.log(err);
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange(val) {
      // @TODO
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // @TODO
      console.log(`当前页: ${val}`);
    },
    handleClose(done) {
			this.$confirm('确认关闭？')
				// eslint-disable-next-line no-unused-vars
				.then(_ => {
					done();
				})
				// eslint-disable-next-line no-unused-vars
				.catch(_ => { });
		},
    handleEdit(row) {
      console.log(row);
      window.sessionStorage.setItem('rowIdToEdit', row.id);
      window.sessionStorage.setItem('rowNameToEdit', row.name);
      this.$router.push('/admin/edit_disease');
    }
  },
  created() {
    this.get_data();
  },
  props: {
    disease_group: String,
    disease_groupid: String
  }
}
</script>

<style scoped lang="less">
#disease_group {
  width: 100%;
  height: wrap-content;
  //background: rgb(227, 81, 171);
  padding: 0;
  margin: 0;
  margin-top: 30px;
}

#header {
  display: flex;
  flex-direction: row;
  justify-content: left;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
}
</style>