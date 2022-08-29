<template>
  <div class="app-container">
    <el-row class="header" style="margin-top: 15px">
      <el-button type="primary" @click="addSons()">+添加子部门</el-button>
      <el-dialog
        title="新增部门"
        :visible.sync="dialogFormAddSonsVisible"
        width="500px"
        top="200px"
      >
        <el-form
          :model="ruleFormAdd"
          :rules="rules"
          ref="ruleFormAdd"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="上级部门名称"
            prop="region"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="ruleFormAdd.region"
              :placeholder="frontOrgan"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="部门名称"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="ruleFormAdd.name"
              placeholder="请输入部门"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
            <el-radio-group v-model="ruleFormAdd.type">
              <el-radio label="1">城市</el-radio>
              <el-radio label="2">小学</el-radio>
              <el-radio label="3">年级</el-radio>
              <el-radio label="4">班级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序值" prop="num" :label-width="formLabelWidth">
            <el-input-number
              v-model="ruleFormAdd.num"
              :min="0"
              :max="4"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="是否启用"
            prop="delivery"
            :label-width="formLabelWidth"
          >
            <el-switch v-model="ruleFormAdd.delivery">ON</el-switch>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-button type="primary" @click="confirmAdd()">添加并保存</el-button>
            <el-button @click="resetForm('ruleFormAdd')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-button @click="addFirst()">+添加一级部门</el-button>
      <el-dialog
        title="新增一级部门"
        :visible.sync="dialogFormAddFirstVisible"
        width="500px"
        top="200px"
      >
        <el-form
          :model="ruleFormFirst"
          :rules="rules"
          ref="ruleFormFirst"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="部门名称"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="ruleFormFirst.name"
              placeholder="请输入部门"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
            <el-radio-group v-model="ruleFormFirst.type">
              <el-radio label="1">城市</el-radio>
              <el-radio label="2">小学</el-radio>
              <el-radio label="3">年级</el-radio>
              <el-radio label="4">班级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序值" prop="num" :label-width="formLabelWidth">
            <el-input-number
              v-model="ruleFormFirst.num"
              :min="0"
              :max="4"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="是否启用"
            prop="delivery"
            :label-width="formLabelWidth"
          >
            <el-switch v-model="ruleFormFirst.delivery">ON</el-switch>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-button type="primary" @click="consfirmAddFirst()">添加并保存</el-button>
            <el-button @click="resetForm('ruleFormFirst')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-button @click="deleteAll()">批量删除</el-button>
      <el-button @click="fresh()">刷新</el-button>
    </el-row>
    <div class="main">
      <div class="left">
        <div style="padding: 10px 10px">当前选择编辑:</div>
        <el-input placeholder="请输入部门名称搜索" v-model="filterText">
        </el-input>
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          @check-change="handleClick"
          show-checkbox
          node-key="id"
          default-expand-all
          highlight-current
          :filter-node-method="filterNode"
          :check-strictly="true"
          ref="tree"
        >
        </el-tree>
      </div>
      <div class="right">
        <div style="padding: 10px 10px">部门编辑</div>
        <el-form
          :model="ruleFormEdit"
          :rules="rules"
          ref="ruleFormEdit"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="上级部门名称"
            prop="region"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="ruleFormEdit.region"
              :placeholder="frontOrgan"
              disabled="disabled"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="部门名称"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="ruleFormEdit.name"
              placeholder="请输入部门"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
            <el-radio-group v-model="ruleFormEdit.type">
              <el-radio label="1">城市</el-radio>
              <el-radio label="2">小学</el-radio>
              <el-radio label="3">年级</el-radio>
              <el-radio label="4">班级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序值" prop="num" :label-width="formLabelWidth">
            <el-input-number
              v-model="ruleFormEdit.num"
              :min="0"
              :max="4"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="是否启用"
            prop="delivery"
            :label-width="formLabelWidth"
          >
            <el-switch v-model="ruleFormEdit.delivery">ON</el-switch>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-button type="primary" @click="editForm()">修改并保存</el-button>
            <el-button @click="resetForm('ruleFormEdit')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteOrgan, getOrgans, postOrgan, postOrganFirst, putOrgan } from "@/api/form";
export default {
  name: "Form",
  data() {
    return {
      select: "",
      index: "",
      frontOrgan: "上级部门",
      formLabelWidth: "120px",
      dialogFormAddSonsVisible: false,
      dialogFormAddFirstVisible: false,

      filterText: "",
      data: [],
      defaultProps: {
        id:"id",
        children: "children",
        label: "org_name",
      },

      ruleFormAdd: {
        region: "",
        name: "",
        type: "",
        num: 0,
        delivery: false,
      },
      ruleFormFirst: {
        region: "",
        name: "",
        type: "",
        num: 0,
        delivery: false,
      },
      ruleFormEdit: {
        region: "",
        name: "",
        type: "",
        num: 0,
        delivery: false,
      },
      rules: {
        region: [
          // { required: true, message: "请输入上级部门", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
      },
    };
  },

  methods: {
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    fresh() {
      this.$router.go(0);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.org_name.indexOf(value) !== -1;
    },
    //     deepFilter(list) {
    //     // 使用filter 过滤当前层的数组
    //       return this.data.filter(item => {
    //         // filter其实也是遍历
    //         // 把当前遍历的节点的children 也调用一次 deepFilter 函数，返回过滤后的数组重新赋值
    //         item.children = this.deepFilter(item.children)
    //         // 最后判断当前节点是否符合过滤要求
    //         return this.$refs.tree.getCheckedNodes().some(p=>p.id!==item.id)
    //     })
    // },
    // this.data=this.data.filter(i=>this.$refs.tree.getCheckedNodes().some(p=>p.id!==i.id));
    // let newArr = this.deepFilter(this.data);
    handleClick(data, checked, node) {
      if (checked) {
        this.frontOrgan = this.$refs.tree.getCheckedNodes()[0].org_name;
      console.log(this.$refs.tree.getCheckedKeys())
      }
    },
    addSons() {
      if (this.$refs.tree.getCheckedNodes().length == 0) {
        alert("请先选中部门");
      } else {
        this.dialogFormAddSonsVisible = true;
      }
    },
    confirmAdd() {
      this.$refs.ruleFormAdd.validate((valid) => {
        if (valid) {
          postOrgan(this.$refs.tree.getCheckedKeys().toString(), {
            orgName: this.ruleFormAdd.name,
            orderNum:this.ruleFormAdd.num
          })
            .then((res) => {
              this.getOrgan();
            })
            .catch((err) => {
              console.log(err);
            });
          this.dialogFormAddSonsVisible = false;
          this.$refs.ruleFormAdd.resetFields();
        }
      });
    },
    addFirst() {
      this.dialogFormAddFirstVisible = true;
    },
    consfirmAddFirst() {
      this.$refs["ruleFormFirst"].validate((valid) => {
        if (valid) {
          postOrganFirst({
            orgName:this.ruleFormFirst.name,
            orderNum:0
          }).then((res) => {
            this.getOrgan();
          });
          this.dialogFormAddFirstVisible = false;
          this.$refs.ruleFormFirst.resetFields();
        }
      });
    },
    deleteAll() {
    this.$confirm("确认删除吗？",{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
        deleteOrgan(this.$refs.tree.getCheckedKeys().toString())
          .then((res) => {
            this.getOrgan();
            
          })
          .catch((err) => {
            console.log(err);
          });
      })
    },
    editForm() {
      this.$refs["ruleFormEdit"].validate((valid) => {
        if (valid) {
          putOrgan(this.$refs.tree.getCheckedKeys(), {
            orgName: this.ruleFormEdit.name,
            orderNum: 0,
          })
            .then((res) => {
              this.getOrgan();
              this.$refs.ruleFormEdit.resetFields();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

      //   let obj={id:this.ruleFormAdd.id,name:this.ruleFormAdd.name,label:this.ruleFormAdd.region};
      //   console.log(obj);
      //   this.data=this.data.map(item=>{
      //   return this.ruleFormAdd.id==item.id? obj:item;
      // })
      // } else {
      //   console.log("error submit!!");
      //   return false;
      // }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getOrgan() {
      getOrgans()
        .then((res) => {
          this.data = res.data;
          // this.$store.commit('user/SAVE_ORGAN',this.data)
          // console.log(this.$store.state)
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getOrgan();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  border: solid 1px rgb(224, 218, 218);
  border-radius: 2px;
  padding: 10px 0;
}
.main {
  margin-top: 15px;
  height: 800px;
  width: 100%;
  .left {
    float: left;
    width: 35%;
    border: solid 1px rgb(224, 218, 218);
    border-radius: 2px;
    margin-right: 40px;
  }
  .right {
    float: left;
    width: 35%;
    border: solid 1px rgb(224, 218, 218);
    border-radius: 2px;
  }
}
</style>

