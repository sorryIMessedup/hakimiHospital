<template>
	<div id="case_list">
		<div>
			<Disease_group v-for="item in category" :key="item.id" :disease_group="item.name" :disease_groupid="item.id"
				:disease_data="disease_data" />
		</div>
		<div style="padding-left: 10px; margin-top: 20px;">
			<el-card style="width: 280px;">
				<h1>病类与疾病管理</h1><br>
				<p style="padding-bottom: 10px;">
					这里显示的是各种病类下的疾病，您可以添加病类或疾病。
				</p>
				<p style="padding-bottom: 30px;">
					请确保必要的病类存在，才可以在该病类下添加疾病。<br>
					如果当前不存在任何病类，您看到的将是一片空白。<br>
					如果某个疾病的病类被删除了，那么它将被更新至【待定】病类。
				</p>
				<el-button type="primary" size="medium" @click="add_category()">
					&nbsp;&nbsp;添加病类&nbsp;&nbsp;</el-button>
				<el-button type="danger" size="medium" @click="delete_category()">
					&nbsp;&nbsp;删除病类&nbsp;&nbsp;</el-button> <br><br>
			</el-card>
		</div>

		<el-dialog title="添加病类" :visible.sync="addVisible1" width="30%" :before-close="handleClose">
			<el-form :rules="rules1" :model="form1">
				<el-form-item label="病类名" prop="name">
					<el-input v-model="form1.name" placeholder="请输入病类名"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible1 = false">取消</el-button>
				<el-button type="primary" @click="handleConfirm1()">确定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="添加疾病" :visible.sync="addVisible2" width="30%" :before-close="handleClose">
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible2 = false">取消</el-button>
				<el-button type="primary" @click="handleConfirm2()">确定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="删除病类" :visible.sync="addVisible3" width="30%" :before-close="handleClose">
			<span>请注意，你正在尝试删除一个病类。<br>
				所有该病类下的疾病的病类将被指定为“待定”。
			</span><br><br>
			<el-form :rules="rules3" :model="form3">
				<el-form-item label="病类名：" prop="toDelete">
					<el-select v-model="form3.toDelete" placeholder="请选择密保问题">
						<el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible3 = false">取消</el-button>
				<el-button type="danger" @click="handleConfirm3()">确定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
import Disease_group from '@/component/Disease_group.vue';
import { NetLoader } from '@/net';
export default {
	name: "Case_list",
	data() {
		return {
			category: [],
			token: 0,
			loader: new NetLoader("test"),
			disease_data: [],
			addVisible1: false,
			addVisible2: false,
			addVisible3: false,
			form1: { name: '' },
			form2: {},
			form3: { toDelete: '' },
			rules1: { name: [{ required: true, message: '请输入病类名', trigger: 'blur' }] },
			rules2: {},
			rules3: { toDelete: [{ required: true, message: '请输入病类名', trigger: 'blur' }] }
		};
	},
	methods: {
		navigate: function () {
			this.$router.replace('/home/disease_simulator')
		},
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
		add_category() {
			this.addVisible1 = true;
		},
		add_disease() {
			this.addVisible2 = true;
		},
		delete_category() {
			this.addVisible3 = true;
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
		handleConfirm1() {
			this.addVisible1 = false;
			this.loader.post("/category/addCategory", {
				name: this.form1.name
			}).then(val => {
				console.log(val);
				if (val.status == 200) {
					this.$message.success('添加病类成功');
					this.init();
				} else {
					this.$message.error(val.data.data.message);
				}
			}, err => {
				this.$message.error(err.response.data.message);
				console.log(err);
			})
		},
		handleConfirm2() {
			this.addVisible2 = false;
		},
		handleConfirm3() {
			this.addVisible3 = false;
			this.loader.delete("/category/deleteCategory", {
				id: this.form3.toDelete
			}).then(val => {
				console.log(val);
				if (val.status == 200) {
					this.$message.success('添加病类成功');
					this.init();
				} else {
					this.$message.error(val.data.data.message);
				}
			}, err => {
				this.$message.error(err.response.data.message);
				console.log(err);
			})
		}
	},
	created() {
		this.init();
	},
	components: { Disease_group },
}
</script>

<style scoped lang="less">
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