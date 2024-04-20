<template>
  <div class="container">
    <div id="case_list">
      <div>
        <Case_group v-for="item in category" :key="item.id" :disease_group="item.name" :disease_groupid="item.id"
          :disease_data="disease_data" />
      </div>
      <div>
        <div style="padding-left: 10px; margin-top: 20px;">
          <el-card style="width: 280px;">
            <h1>病例管理</h1><br>
            <p style="padding-bottom: 10px;">
              这里显示的是各种病类下的病例，您可以对病例进行相关操作。
            </p>
            <p style="padding-bottom: 30px;">
              请确保必要的病类与疾病存在，才可以添加相应的病例。<br>
              如果当前不存在任何病类，您看到的将是一片空白。<br>
              如果某个疾病的病类被删除了，那么它将被更新至【待定】病类。
            </p>
            <p style="padding-bottom: 30px;">
              如需对病类或疾病进行管理，请跳转至【病类与疾病管理】界面。
            </p>
          </el-card>
        </div>

        <div style="padding-left: 10px; margin-top: 20px;">
          <el-card style="width: 280px;">
            <h1>统计数据</h1><br>
            <el-row style="font-size: 15px;">
              <el-col :span="6">
                <el-statistic group-separator="," :precision="0" decimal-separator="." :value="category.length"
                  title="病类数量">
                  <template slot="prefix">
                    <i class="el-icon-s-flag" style="color: red"></i>
                  </template>
                </el-statistic>
              </el-col>
              <el-col :span="3">&nbsp;&nbsp;</el-col>
              <el-col :span="6">
                <el-statistic group-separator="," :precision="0" decimal-separator="." :value="disease_data.length"
                  title="疾病数量">
                  <template slot="prefix">
                    <i class="el-icon-s-flag" style="color: blue"></i>
                  </template>
                </el-statistic>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>

      <el-dialog title="添加疾病" :visible.sync="addVisible2" width="30%" :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible2 = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm2()">确定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import Case_group from '@/component/Case_group.vue';
import { NetLoader } from '@/net';
export default {
  name: "Case_list",
  data() {
    return {
      category: [],
      token: 0,
      loader: new NetLoader("test"),
      disease_data: [],
      addVisible2: false,
      form2: {},
      rules2: {},
    };
  },
  methods: {
    init() {
      this.category = [];
      this.disease_data = [];
      this.token = window.sessionStorage.getItem("token")
      this.loader.get("/category/findAllCategories").then((val) => {
        let res = val.data.data;
        console.log(res);
        for (let item of res) {
          this.category.push(item);
        }
      });
      this.loader.get("/disease/findAllDiseases").then((val) => {
        let res = val.data.data;
        console.log(res);
        for (let item of res) {
          this.disease_data.push(item);
        }
      });
    },
    add_disease() {
      this.addVisible2 = true;
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
    handleConfirm2() {
      this.addVisible2 = false;
    },
  },
  created() {
    this.init();
  },
  components: { Case_group },
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  justify-content: center;
}

#case_list {
  display: flex;
  width: 100vh;
  height: wrap-content;
  margin: 0;
  margin-left: 2%;
  margin-top: 30px;

  .case_list-container {
    display: flex;
  }
}

#header {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>