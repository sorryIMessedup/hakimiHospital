<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div style="">
    <div style="height:100%; width:100%;">
      <el-table border
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 80vw; margin-top: 10px;" max-height="400">
        <!-- eslint-disable-next-line vue/valid-v-for -->
        <el-table-column align="center" v-for="item in mmap" :label="item.label" :prop="item.key"
          :width="item.width"></el-table-column>
        <el-table-column align="right" fixed="right" width="180">
          <template v-if="tableData.length !== 0" slot="header">
            <el-input v-model="search" size="mini" placeholder="输入检索信息" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" icon="el-icon-plus" style="width:80vw" size="small" @click="handleAdd()"></el-button>
      <PopUpDialog ref="child" :select-data="selectData" :labels="labels" :keys="keyslist"
        :base_url="this.$props.base_url" :get_data="this.get_data" :config="this.$props.config"
        :updateById_url="this.$props.update_url"></PopUpDialog>
      <PopUpDialogForAdd ref="child2" :labels="labels.slice(1)" :keys="keyslist.slice(1)"
        :base_url="this.$props.base_url" :get_data="this.get_data" :config="configs.slice(1)" :add_url="add_url">
      </PopUpDialogForAdd>
    </div>
  </div>
</template>

<script>
import PopUpDialog from './PopUpDialog.vue';
import PopUpDialogForAdd from './PopUpDialogForAdd.vue';
import { NetLoader } from '@/net';

export default {
  data() {
    return {
      labels: this.$props.label,
      keyss: this.$props.keys,
      tableData: [],
      widthlist: this.$props.width,
      keyslist: this.$props.keys,
      selectData: {},
      search: "",
      mmap: [],
      configs: this.$props.config
    };
  },
  methods: {
    handleEdit(index, row) {
      this.selectData = Object.assign({}, row)
      this.$refs.child.dialogFormVisible = true
    },
    handleAdd() {
      this.$refs.child2.dialogFormVisible = true
    },
    handleDelete() {
      let loader = new NetLoader("test")
      this.$confirm('这将会永久删除数据，确定继续删除吗？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = this.$props.base_url + this.$props.delete_url;
        loader.get(url).then(() => {
          this.get_data()
          this.$message({
            message: '删除成功',
            type: "success"
          });
        })
      }).catch(() => {
      });
    },
    get_data() {
      this.tableData = []
      let url = this.$props.base_url + this.$props.getAll_url;
      let loader = new NetLoader("test")
      loader.get(url).then((value) => {
        let res = value.data.data;
        console.log(res);
        console.log("Labels:", this.labels);
        console.log("Table Data:", this.tableData);
        console.log("Keys:", this.keyss);
        for (let i = 0; i < this.labels.length; i++) {
          this.mmap.push({ label: this.labels[i], key: this.keyss[i], width: this.widthlist[i] });
        }
        console.log(this.mmap);
        console.log("Width List:", this.widthlist);
        for (let index in res) {
          let count = 0
          for (let key in res[index]) {
            if (this.configs[count] == 'date') {
              value.data[index][key] = this.formatDate(new Date(value.data[index][key]))
            }
            count = count + 1
          }
          this.tableData.push(res[index])
        }
      })
    },
    switch_label: function (label) {
      let res = "";
      if (this.tableData.length > 0) {
        // 创建一个从 label 到 key 的映射
        const labelToKeyMap = this.labels.reduce((map, currentLabel, index) => {
          const key = Object.keys(this.tableData[0])[index];
          map[currentLabel] = key;
          return map;
        }, {});
        // 使用映射来找到对应的 key
        res = labelToKeyMap[label] || "";
      }
      return res;
    },

    switch_width: function (label) {
      const index = this.labels.indexOf(label);
      return index !== -1 && index < this.widthlist.length ? this.widthlist[index] : 0;
    },

    formatDate: function (date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    }
  },
  props: {
    label: Array,
    width: Array,
    keys: Array,
    base_url: String,
    add_url: String,
    delete_url: String,
    getAll_url: String,
    getById_url: String,
    searchByName_url: String,
    update_url: String,
    uploadPic_url: String,
    config: Array
  },
  components: { PopUpDialog, PopUpDialogForAdd },
  created() {
    this.get_data()
  }
}
</script>

<style scoped lang="less">
#table {
  width: wrap-content;
  height: wrap-content;
  margin-top: 10px;
  margin-left: 10px;
  //background: rgb(175, 240, 211);
  padding: 0;
  margin: 0;
  background-color: aliceblue;
}
</style>