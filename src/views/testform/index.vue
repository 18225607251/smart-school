<template>
  <div class="app-container">
    <el-row class="header" style="margin-top: 15px">
      <el-button type="primary" @click="addAddress()">+添加子部门</el-button>
      <el-button @click="addAddress()">+添加一级部门</el-button>
      <el-dialog
        title="部门编辑"
        :visible.sync="dialogFormVisible"
        width="500px"
        top="200px"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
        <el-form-item
            label="id"
            prop="id"
            :label-width="formLabelWidth">
            <el-input v-model="ruleForm.id"></el-input>
          </el-form-item>
          <el-form-item
            label="部门名称"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item
            label="上级部门名称"
            prop="region"
            :label-width="formLabelWidth">
            <el-select v-model="ruleForm.region" placeholder="请选择学校">
              <el-option label="我的小学" value="我的小学"></el-option>
              <el-option label="阳光小学" value="阳光小学"></el-option>
              <el-option label="希望小学" value="希望小学"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="类型"
            prop="resource"
            :label-width="formLabelWidth"
          >
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="部门"></el-radio>
              <el-radio label="班级"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="是否启用"
            prop="delivery"
            :label-width="formLabelWidth"
          >
            <el-switch v-model="ruleForm.delivery">ON</el-switch>
          </el-form-item>
          <el-form-item label="活动时间" required :label-width="formLabelWidth">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.date1"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">--</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="ruleForm.date2"
                  style="width: 100%"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item> -->
          <el-form-item :label-width="formLabelWidth">
            <el-button type="primary" @click="confirm()"
              >添加并保存</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
          show-checkbox
          node-key="id"
          default-expand-all
           highlight-current
          :filter-node-method="filterNode"
          ref="tree"
        >
        </el-tree>
        <div class="buttons">
           <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="setCheckedNodes">通过 node 设置</el-button>
            <!-- <el-button @click="getCheckedKeys">通过 key 获取</el-button>
            <el-button @click="setCheckedKeys">通过 key 设置</el-button> -->
            <el-button @click="resetChecked">清空</el-button>
        </div>
      </div>
      <div class="right">
        <div style="padding: 10px 10px">部门编辑</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item
            label="id"
            prop="id"
            :label-width="formLabelWidth">
            <el-input v-model="ruleForm.id"></el-input>
          </el-form-item>
           <el-form-item
            label="上级部门名称"
            prop="region"
            :label-width="formLabelWidth">
            <el-select v-model="ruleForm.region" placeholder="请选择学校">
              <el-option label="成都附属小学" value="成都附属小学"></el-option>
              <el-option label="阳光小学" value="阳光小学"></el-option>
              <el-option label="希望小学" value="希望小学"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="部门名称"
            prop="name"
            :label-width="formLabelWidth">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
         
          <el-form-item
            label="类型"
            prop="resource"
            :label-width="formLabelWidth">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="部门"></el-radio>
              <el-radio label="班级"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="是否启用"
            prop="delivery"
            :label-width="formLabelWidth">
            <el-switch v-model="ruleForm.delivery">ON</el-switch>
          </el-form-item>
          <el-form-item label="活动时间" required :label-width="formLabelWidth">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.date1"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">--</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="ruleForm.date2"
                  style="width: 100%"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item> -->
          <el-form-item :label-width="formLabelWidth">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >修改并保存</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Testform",

  data() {
    return {
      respond:"",
      select: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      filterText: "",
      data: [   
        {
          id: 1,
          label: "成都师范附属小学",
          children: [
            {
              id: 4,
              label: "一年级",
              children: [
                {
                  id: 11,
                  label: "一(1)班",
                },
                {
                  id: 12,
                  label: "一(2)班",
                },
              ],
            },
            {
              id: 5,
              label: "二年级",
              children: [
                {
                  id: 13,
                  label: "一(1)班",
                },
                {
                  id: 14,
                  label: "一(2)班",
                },
              ],
            },
            {
              id: 6,
              label: "三年级",
              children: [
                {
                  id: 15,
                  label: "一(1)班",
                },
                {
                  id: 16,
                  label: "一(2)班",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "阳光小学",
          children: [
            {
              id: 7,
              label: "一年级",
            },
            {
              id: 8,
              label: "二年级",
            },
          ],
        },
         {
          id: 3,
          label: "希望小学",
          // children: [
          //   {
          //     id: 9,
          //     label: "二级 3-1",
          //   },
          //   {
          //     id: 10,
          //     label: "二级 3-2",
          //   },
          // ],
        },   
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },

      ruleForm: {
        id:"",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        // type: [],
        resource: "",
        // desc: "",
      },
      rules: {
        id:[
          { required: true, message: "请输入名称", trigger: "blur" }],
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择学校", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
    getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
    setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 1,
          label: '二级 2-1'
        }, {
          id: 3,
          label: '三级 1-1-1'
        }]);
      },
    // getCheckedKeys() {
    //     console.log(this.$refs.tree.getCheckedKeys());
    //   },
    // setCheckedKeys() {
    //     this.$refs.tree.setCheckedKeys([3]);
    //   },
    resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },

    addAddress() {
      this.dialogFormVisible=true;
    },
    confirm(){
      let obj={id:this.ruleForm.id,name:this.ruleForm.name,label:this.ruleForm.region};
      this.data.push(obj);
      this.dialogFormVisible=false;
    },
    fresh() {
      this.$router.go(0);
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
      
    deleteAll() {
      console.log("删除");
      let arr = this.$refs.tree.getCheckedNodes();
      arr.map((val)=>{
        this.$refs.tree.remove(val);
      })
    },     

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // let obj={id:this.ruleForm.id,name:this.ruleForm.name,label:this.ruleForm.region};
         // this.data.push(obj);
          let obj={id:this.ruleForm.id,name:this.ruleForm.name,label:this.ruleForm.region};
          console.log(obj);
          this.data=this.data.map(item=>{
          return this.ruleForm.id==item.id? obj:item;
        })
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

  mounted() {
     axios.get('http://42.192.5.249:8080/v1/organ')
     .then(res => {

      console.log(res);
    }).catch(err => {
        console.log(err);
      })
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

