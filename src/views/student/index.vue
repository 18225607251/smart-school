<template>
  <div class="app-container">
    <div class="header">
      <div class="header-top">
        <div class="form-query">
          <span class="txt">学生姓名:</span
          ><el-input
            v-model="inputName"
            placeholder="请输入学生姓名"
            class="form-input"
          ></el-input>
        </div>
        <div class="form-query">
          <span class="txt">学号:</span
          ><el-input
            v-model="inputNumber"
            placeholder="请输入学号"
            class="form-input"
          ></el-input>
        </div>
        <div class="form-query">
          <span class="txt">模组号:</span
          ><el-input
            v-model="inputMozu"
            placeholder="请输入模组号"
            class="form-input"
          ></el-input>
        </div>
      </div>
      <div class="header-middle">
        <div class="form-query">
          <span class="txt" id="middle-left">身份证:</span
          ><el-input
            v-model="inputId"
            placeholder="请输入身份证"
            class="form-input"
          ></el-input>
        </div>
        <div class="form-query">
          <span class="txt" id="middle-middle">归属部门:</span>
          <el-input
            v-model="inputOrgan"
            placeholder="请选择部门"
            class="form-input"
          ></el-input>
        </div>
        <div class="form-query">
          <span class="txt" id="middle-right">开始时间:</span
          ><el-input
            v-model="inputStartTime"
            placeholder="请输入时间"
            class="form-input"
          ></el-input>
        </div>
      </div>
      <div class="header-bottom">
        <div class="header-bottom-left">
          <span class="txt">结束时间:</span
          ><el-input
            v-model="inputEndTime"
            placeholder="请输入时间"
            class="form-input"
          ></el-input>
        </div>
        <el-row class="header-bottom-right">
          <el-button type="primary" @click="query()">查询</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-row>
      </div>
    </div>

    <el-row class="but">
      <el-button type="primary" @click="addData">录入信息</el-button>
      <el-button type="primary" @click="editData">编辑信息</el-button>
      <el-button type="primary" @click="editConfig">终端配置</el-button>
      <el-button type="danger" @click="deleteData">数据删除</el-button>
      <el-button type="primary" @click="importData">数据导入</el-button>
      <el-button type="primary" @click="exportData">数据导出</el-button>
    </el-row>

    <div class="main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="90" align="center">
        </el-table-column>
        <el-table-column prop="username" label="学号" width="90" align="center">
        </el-table-column>
        <el-table-column
          prop="username"
          label="身份证"
          width="90"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="username" label="班级" width="90" align="center">
        </el-table-column>

        <el-table-column
          prop="realname"
          label="学校"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="监护人姓名"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="roleId"
          label="监护人手机号"
          width="130"
          align="center"
        >
        </el-table-column>
        <!-- <el-table-column prop="organName" label="部门" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column
          prop="className"
          label="监护人身份证"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createUser"
          label="模组号"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="班主任"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="开通时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog
      title="录入信息"
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
          <el-input v-model="form1.roleId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="归属部门"
          :label-width="formLabelWidth"
          prop="organName"
        >
          <el-input v-model="form1.organName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="班级"
          :label-width="formLabelWidth"
          prop="className"
        >
          <el-input v-model="form1.className" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="创建人"
          :label-width="formLabelWidth"
          prop="createUser"
        >
          <el-input v-model="form1.createUser" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="创建时间"
          :label-width="formLabelWidth"
          prop="createTime"
        >
          <el-input v-model="form1.createTime" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog
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
          <el-input v-model="form2.roleId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="部门"
          :label-width="formLabelWidth"
          prop="organName"
        >
          <el-input v-model="form2.organName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="班级"
          :label-width="formLabelWidth"
          prop="className"
        >
          <el-input v-model="form2.className" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="创建人"
          :label-width="formLabelWidth"
          prop="createUser"
        >
          <el-input v-model="form2.createUser" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="创建时间"
          :label-width="formLabelWidth"
          prop="createTime"
        >
          <el-input v-model="form2.createTime" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm2Visible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      rules: {
        // id: [{ required: true, message: "请输入内容", trigger: "blur" }],
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
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        organName: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        className: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        createUser: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        createTime: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      inputName:"",
      inputNumber:"",
      inputMozu:"",
      inputId:"",
      inputOrgan:"",
      inputStartTime:"",
      inputEndTime:"",

      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,

      select: "",
      formLabelWidth: "80px",
      dialogForm1Visible: false,
      dialogForm2Visible: false,

      form1: {
        // id: "",
        username: "",
        realname: "",
        phoneNumber: "",
        roleId: "",
        organName: "",
        className: "",
        createUser: "",
        createTime: "",
      },
      form2: {
        // id: "",
        username: "",
        realname: "",
        phoneNumber: "",
        roleId: "",
        organName: "",
        className: "",
        createUser: "",
        createTime: "",
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
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    addData() {
      this.dialogForm1Visible = true;
    },
    handleSave(){
     this.dialogForm1Visible = false;
    },
    editData() {
      this.dialogForm1Visible = true;
    },
    editConfig() {
      this.dialogForm1Visible = true;
    },
    deleteData() {
      this.dialogForm1Visible = true;
    },
    importData() {
      this.dialogForm1Visible = true;
    },
    exportData() {
      this.dialogForm1Visible = true;
    },
    
  },
};
</script>

<style lang="scss" scoped>
.header {
  border: solid 1px rgb(224, 218, 218);
  border-radius: 2px;
  .header-top,
  .header-middle {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // background-color: green;
    .form-input {
      width: 300px;
    }
    .txt {
      margin-right: 8px;
    }
    .form-query {
      #middle-left {
        margin-left: 10px;
        margin-right: 13px;
      }
      #middle-middle {
        margin-left: -27px;
      }
      #middle-right {
        margin-left: -15px;
      }
    }
  }

  .header-bottom {
    margin-top: 20px;
    padding-bottom: 20px;
    position: relative;
    .header-bottom-left {
      margin-left: 30px;
    }
    .header-bottom-right {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
    .txt {
      margin-right: 8px;
    }
    .form-input {
      width: 24%;
      margin-right: 30px;
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
