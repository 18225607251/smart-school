<template>
  <div class="app-container">
    <div class="header" style="margin-top: 15px">
      <div class="lef">
        <span id="txt">归属部门:</span>
        <el-select
          class="sel"
          id="re"
          v-model="select"
          slot="prepend"
          placeholder="请选择"
        >
          <el-option label="组织部" value="组织部"></el-option>
          <el-option label="项目部" value="项目部"></el-option>
          <el-option label="宣传部" value="宣传部"></el-option>
        </el-select>
      </div>
      <el-row class="bot-but">
        <el-button type="primary" @click="query()">查询</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-row>
    </div>

    <el-row class="but">
      <el-button type="primary" @click="addColumn">新增</el-button>
      <el-button type="primary" @click="edit">编辑</el-button>
      <el-button type="danger" @click="deleteColumn">删除</el-button>
    </el-row>
    <el-dialog
      title="数据上报设置(增加）"
      :visible.sync="dialogForm1Visible"
      width="500px"
      top="200px"
    >
      <el-form :model="form1">
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="form1.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人" :label-width="formLabelWidth">
          <el-input v-model="form1.men" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" :label-width="formLabelWidth">
          <el-input v-model="form1.time" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="dialogForm2Visible"
      width="500px"
      top="200px"
    >
      <el-form :model="form2">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form2.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="form2.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人" :label-width="formLabelWidth">
          <el-input v-model="form2.men" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" :label-width="formLabelWidth">
          <el-input v-model="form2.time" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm2Visible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <div class="main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <!-- @row-click = "onRowClick" :row-class-name="rowClassNameFn"-->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="address" label="部门" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="men" label="创建人" style="width: 33%">
        </el-table-column>
        <el-table-column prop="time" label="更新时间" style="width: 33%">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "Data",
  data() {
    return {
      select: "",
      multipleSelection: [],
      length: "",
      dialogForm1Visible: false, //增加弹出层默认为关闭
      dialogForm2Visible: false, //编辑弹出层默认为关闭
      newObj: {},
      //弹出层中的表单
      form1: {
        id: "",
        address: "",
        men: "",
        time: "",
      },
      form2: {
        id: "",
        address: "",
        men: "",
        time: "",
      },
      formLabelWidth: "70px",
      tableItem1: "",
      // tableItem2:'',
      tableData: [
        {
          id: 1,
          address: "组织部",
          men: "系统管理员",
          time: "2020-6-22 13:38:11",
        },
        {
          id: 2,
          address: "宣传部",
          men: "系统管理员",
          time: "2020-6-22 13:38:11",
        },
        {
          id: 3,
          address: "项目部",
          men: "系统管理员",
          time: "2020-6-22 13:38:11",
        },
      ],
       tableData2: [
        {
          id: 1,
          address: "组织部",
          men: "系统管理员",
          time: "2020-6-22 13:38:11",
        },
        {
          id: 2,
          address: "宣传部",
          men: "系统管理员",
          time: "2020-6-22 13:38:11",
        },
        {
          id: 3,
          address: "项目部",
          men: "系统管理员",
          time: "2020-6-22 13:38:11",
        },
      ],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },
    // rowClassNameFn({ row, rowIndex }) {
    //   把每一行的索引放进row
    //   row.index = rowIndex;
    //    console.log(row);
    // },
    //  onRowClick(row, event, column) {
    //   this.currentRowIndex = row.index;
    //   console.log(row, this.currentRowIndex);
    // },
    query(){
      console.log(this.select);
      this.tableData=this.tableData.filter(e=>e.address===this.select)
       console.log("查询成功");
    },
    reset() {
      var x = document.getElementById("re");
      x.value = "";
      console.log("已重置");
      this.tableData=this.tableData2;
    },

    deleteColumn() {
      let len=this.multipleSelection.length;
     if(len>0){
        this.tableData = this.tableData.filter((p) =>
        !this.multipleSelection.some((e) => p.id === e.id)  
      );
     }
      console.log("删除成功");
    },
    edit() {
      this.dialogForm2Visible = true;
    },
    handleUpdate() {
      this.newObj = {
        id: this.form2.id,
        address: this.form2.address,
        men: this.form2.men,
        time: this.form2.time,
      };
      this.tableData = this.tableData.map((t) => {
        return t.id === this.multipleSelection[0].id ? this.newObj : t;
      });
      console.log("更新成功");
      this.dialogForm2Visible = false;
    },

    addColumn() {
      this.dialogForm1Visible = true;
    },
    handleSave() {
      this.tableItem1 = {
        id: nanoid(),
        address: this.form1.address,
        men: this.form1.men,
        time: this.form1.time,
      };
      this.tableData.push(this.tableItem1);
      console.log("增加成功");
      this.dialogForm1Visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  border: solid 1px rgb(224, 218, 218);
  border-radius: 2px;
  padding: 10px 0;
  position: relative;
  .lef {
    margin-left: 20px;
  }
  .sel {
    width: 27%;
  }
  .bot-but {
    position: absolute;
    left: 480px;
    bottom: 10px;
  }
}
.but {
  margin-top: 20px;
}
</style>