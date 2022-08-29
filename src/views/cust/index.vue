<template>
  <div class="app-container">
    <div class="header">
      <div class="h-top">
        <span id="suo" class="txt">用户名:</span
        ><el-input
          v-model="inputUserName"
          placeholder="请输入用户名"
          class="inp"
        ></el-input>
        <span class="txt">姓名:</span
        ><el-input
          v-model="inputName"
          placeholder="请输入姓名"
          class="inp"
        ></el-input>
        <span class="txt">手机号:</span
        ><el-input
          v-model="inputPhoneNumber"
          placeholder="请输入手机号"
          class="inp"
        ></el-input>
      </div>
      <div class="h-bottom">
        <div class="lef">
          <span>归属部门:</span>
          <!-- <el-select v-model="inputOrganName" placeholder="请选择部门" class="sel">
          </el-select> -->
          <el-cascader :options="options"  :props="defaultProps"  v-model="inputOrganName"
          :show-all-levels="false" class="sel" placeholder="请选择部门"></el-cascader>
        </div>
        <el-row class="bot-but">
          <el-button type="primary" @click="query()">查询</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-row>
      </div>
    </div>

    <el-row class="but">
      <el-button type="primary" @click="addColumn">新增用户</el-button>
      <el-button type="primary" @click="edit">编辑用户</el-button>
      <el-button type="danger" @click="deleteColumn">删除用户</el-button>
    </el-row>

    <div class="main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="username" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="realname" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="150">
        </el-table-column>
        <el-table-column prop="roleId" label="角色" width="150">
        </el-table-column>
        <el-table-column prop="organName" label="部门" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="className" label="班级" width="120">
        </el-table-column>
        <el-table-column prop="createUser" label="创建人" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200">
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>

    <el-dialog
      title="新增用户"
      :visible.sync="dialogForm1Visible"
      width="500px"
      top="200px"
    >
      <el-form :model="form1" :rules="rules" ref="form1">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="form1.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="realname"
        >
          <el-input v-model="form1.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="phoneNumber"
        >
          <el-input v-model="form1.phoneNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
          <el-select v-model="form1.roleId" placeholder="请选择角色" style="width:100%">
           <el-option label="系统管理员" value="admin"></el-option>
           <el-option label="校长" value="principal"></el-option>
           <el-option label="班主任" value="teacher"></el-option>
           <el-option label="家长" value="parent"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属部门" :label-width="formLabelWidth" prop="organName">
          <!-- <el-select v-model="form1.organName" placeholder="请选择部门" style="width:100%">
          </el-select> -->
          <el-cascader :options="options"  :props="defaultProps" v-model="form1.organName"
          :show-all-levels="false" placeholder="请选择部门" style="width:100%"></el-cascader>
        </el-form-item>
        <el-form-item
          label="班级"
          :label-width="formLabelWidth"
          prop="className"
        >
          <el-input v-model="form1.className" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogForm2Visible"
      width="500px"
      top="200px"
    >
      <el-form :model="form2" :rules="rules" ref="form2">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="form2.username"
            auto-complete="off"
            :placeholder="currentUsername"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="realname"
        >
          <el-input
            v-model="form2.realname"
            auto-complete="off"
            :placeholder="currentRealname"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="phoneNumber"
        >
          <el-input
            v-model="form2.phoneNumber"
            auto-complete="off"
            :placeholder="currentPhoneNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
          <el-select v-model="form2.roleId" placeholder="请选择角色" style="width:100%">
           <el-option label="系统管理员" value="admin"></el-option>
           <el-option label="校长" value="principal"></el-option>
           <el-option label="班主任" value="teacher"></el-option>
           <el-option label="家长" value="parent"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属部门" :label-width="formLabelWidth" prop="organName">
          <!-- <el-select v-model="form2.organName" placeholder="请选择部门" style="width:100%">
          </el-select> -->
           <el-cascader :options="options"  :props="defaultProps" v-model="form2.organName"
          :show-all-levels="false"  placeholder="请选择部门" style="width:100%"></el-cascader>
        </el-form-item>
        <el-form-item
          label="班级"
          :label-width="formLabelWidth"
          prop="className"
        >
          <el-input v-model="form2.className" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deletetUser, getUsers, postUser, putUser } from "@/api/cust";
import {getOrgans} from "@/api/form";
export default {
  name: "Cust",
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        realname: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        phoneNumber: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        roleId: [
          { required: true, message: "请输入内容", trigger: "blur" },
          
        ],
        organName: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        className: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ]
      },
      options:[],
      defaultProps:{
        value:"organId",
        label: "organName",
       children: "children"
      },
      inputOrganName:"",
      inputUserName: "",
      inputName: "",
      inputPhoneNumber: "",
      
      tableItem1: {},
      currentUsername:"",
      currentRealname:"",
      currentPhoneNumber:"",
      formLabelWidth: "80px",
      dialogForm1Visible: false,
      dialogForm2Visible: false,
      
      form1: {
        username: "",
        realname: "",
        phoneNumber: "",
        roleId: "",
        organName: "",
        className: ""
      },
      form2: {
        username: "",
        realname: "",
        phoneNumber: "",
        roleId: "",
        organName: "",
        className: ""
      },
      tableData: [],
      tableDat: [],
      multipleSelection: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.length = this.multipleSelection.length;
      console.log(val);
    },
    reset() {
      this.inputUserName = undefined;
      this.inputName = undefined;
      this.inputPhoneNumber = undefined;
      this.inputOrganName = undefined;
     
      this.tableData = this.tableDat;
      console.log("已重置");
    },
    query() { 
      if (!!this.inputUserName)
        this.tableData = this.tableData.filter(
          (e) => e.username == this.inputUserName
        );
      if (!!this.inputName)
        this.tableData = this.tableData.filter(
          (e) => e.realname == this.inputName
        );
      if (!!this.inputPhoneNumber)
        this.tableData = this.tableData.filter(
          (e) => e.phoneNumber == this.inputPhoneNumber
        );
      if (!!this.inputOrganName)
        this.tableData = this.tableData.filter(
          (e) => e.organName == this.inputOrganName
        );
      console.log("查询成功");
    },
    cancel1() {
    this.dialogForm1Visible = false;
     this.$refs.form1.resetFields();
    // this.$refs[form1].resetFields();
    },
    cancel2(){
    this.dialogForm2Visible = false;
    },

    addColumn() {
      this.dialogForm1Visible = true;
    },
    handleSave() {
      this.$refs["form1"].validate((valid) => {
        if (valid) {
          postUser({
            username: this.form1.username,
            realname: this.form1.realname,
            phoneNumber: this.form1.phoneNumber,
            roleId: 0,
            organId: "string",
            password: "123456",
            confirmedPassword: "123456",
          })
            .then((res) => {
              this.getUser();
            })
            .catch((err) => {
              console.log(err);
            });
            this.$refs.form1.resetFields();
          this.dialogForm1Visible = false;
        }
      });
      // axios({
      //   method: "post",
      //   url: "http://42.192.5.249:8080/v1/user",
      //   data: {
      //     username: this.form1.username,
      //     realname: this.form1.realname,
      //     phoneNumber: this.form1.phoneNumber,
      //     roleId: 0,
      //     organId: "string",
      //     password: "123456",
      //     confirmedPassword: "123456",
      //   },
      // }).then((res) => {
      //       this.getUser()
      // });
      // console.log("增加成功");

      // this.tableItem1 = {
      //   id: nanoid(),
      //   username: this.form1.username,
      //   realname: this.form1.realname,
      //   phoneNumber: this.form1.phoneNumber,
      //   roleId: this.form1.roleId,
      //   organName: this.form1.organName,
      //   className: this.form1.className
      // };
      // this.tableData.push(this.tableItem1);
    },
    deleteColumn() {
      var len = this.multipleSelection.length;
      this.$confirm("确认删除吗？",{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        for(let i = 0; i < len; i++){
          deletetUser(this.multipleSelection[i].id)
          .then((res) => {
            this.getUser();
          })
          .catch((err) => {
            console.log(err);
          });
        }
      })
 // axios({
      //   method: "delete",
      //   url: `http://42.192.5.249:8080/v1/user/${this.multipleSelection[0].id}`,
      // })
      // if (confirm("确定删除此用户吗？") == false) {
      //   return false;
      // } else {
      //   deletetUser(this.multipleSelection[0].id)
      //     .then((res) => {
      //       this.getUser();
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }

      // if (this.length > 0) console.log(this.tableData);
      // console.log(this.multipleSelection);
      // this.tableData = this.tableData.filter((p) => {
      //   return !this.multipleSelection.some((e) => {
      //     return p.id === e.id;
      //   });
      // });
      // console.log("删除成功");
    },

    edit() {
      if(this.multipleSelection.length == 0){
        alert("请先选择需要编辑的用户");
      }else{
      this.dialogForm2Visible = true;
      this.currentUsername = this.multipleSelection[0].username;
      this.currentRealname = this.multipleSelection[0].realname;
      this.currentPhoneNumber = this.multipleSelection[0].phoneNumber;
      }
    },
    handleUpdate() {
      // axios({
      //   method: "put",
      //   url: `http://42.192.5.249:8080/v1/user/${this.multipleSelection[0].id}`,
      //   data: {
      this.$refs["form2"].validate((valid) => {
        if (valid) {
          putUser(this.multipleSelection[0].id, {
            username: this.form2.username,
            realname: this.form2.realname,
            phoneNumber: this.form2.phoneNumber,
            roleId: 0,
            organId: this.form2.organName,
            password: "123456",
            confirmedPassword: "123456",
          })
            .then((res) => {
              this.getUser();
            })
            .catch((err) => {
              console.log(err);
            });
          this.$refs.form2.resetFields();
          this.dialogForm2Visible = false;
        }
      });
      // this.newObj = {
      //   // id: this.form2.id,
      //   username: this.form2.username,
      //   realname: this.form2.realname,
      //   phoneNumber: this.form2.phoneNumber,
      //   roleId: this.form2.roleId,
      //   organName: this.form2.organName,
      //   className: this.form2.className,
      // };
      // console.log(this.newObj);
      // this.tableData = this.tableData.map((t) => {
      //   return t.id === this.multipleSelection[0].id ? this.newObj : t;
      // });
      // console.log("更新成功");
    },
    // traversalTree(organdata, options) {
    //     organdata.map((item, index) => {
    //       options.push({
    //         value: item.organId,
    //         label: item.organName,
    //         children: [],
    //       })
         
    //     if (item.children.length !== 0) {
    //       this.traversalTree(item.children, options[index].children)
    //       console.log(options[index])
    //      }
    //    })
    // },
    getUser() {
      // axios.get("http://42.192.5.249:8080/v1/user?pageNo=1&pageSize=10")
       getOrgans()
        .then((res) => {
          this.options = res.data
          console.log(this.data)
          // this.$store.commit('user/SAVE_ORGAN',this.data)
        })
        .catch((err) => {
          console.log(err);
        });
      
      getUsers()
        .then((res) => {
          this.tableDat = res.data;
          this.tableData = res.data;
          // this.traversalTree(this.$store.state.user.organData,this.options);
        })
        .catch((err) => {
          console.log(err);
        });
    },
 
  },
  mounted() {
  this.getUser();
  //  this.traversalTree(this.$store.state.user.organData,this.options);
  // console.log(this.$store.state.user.organData)
  },
};
</script>
 
<style lang="scss" scoped>
.header {
  width: 100%;
  border: solid 1px rgb(224, 218, 218);
  border-radius: 2px;
  .h-top {
    padding-top: 20px;
    margin-left: 20px;
    .inp {
      width: 27%;
      margin-right: 20px;
    }
    .txt {
      margin-top: 10px;
      margin-left: 5px;
    }
    #suo {
      margin-left: 16px;
    }
  }
  .h-bottom {
    margin-top: 15px;
    padding-bottom: 20px;
    position: relative;
    .lef {
      margin-left: 20px;
    }
    .sel {
      width: 27%;
    }
    .bot-but {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
  }
}
.but {
  margin-top: 20px;
}
.main {
  width: 100%;
  margin-top: 20px;
  border-radius: 2px;
  border: solid 1px rgb(197, 187, 187);
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

 
</style>
