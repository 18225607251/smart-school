<template>
  <div class="dashboard-container">
    <el-row>
      <el-button type="primary" @click="addItem">+新增角色</el-button>
    </el-row>

    <el-table
      :data="tableData"
      border
      :header-cell-style="{
        background: '#eef1f6',
        color: '#606266',
        width: '100%',
      }"
    >
      <el-table-column
        prop="name"
        label="角色名称"
        style="width: 33%"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="info"
        label="备注"
        style="width: 33%"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="todo"
        label="操作"
        style="width: 33%"
        align="center"
      >
        <template slot-scope="scope">
          <el-button @click="updateItem(scope)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            @click="deleteItem(scope)"
            type="text"
            size="small"
            class="delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增角色"
      :visible.sync="dialogFormAddVisible"
      width="500px"
      top="200px"
    >
      <el-form :model="formAdd" :rules="rules" ref="formAdd">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="formAdd.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="菜单功能"
          :label-width="formLabelWidth"
          prop="permissions"
        >
          <div class="block">
               <el-cascader
                 v-model="formAdd.permissionsId"
                 :options="options"
                 :props="defaultProps"
                 :key="cascaderKey"
                 collapse-tags
                 clearable
                 placeholder="请选择部门"
                 style="width:100%"></el-cascader>
          </div>
        </el-form-item>
        <el-form-item 
        label="备注" 
        :label-width="formLabelWidth" 
        prop="info">
          <el-input v-model="formAdd.info" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑角色"
      :visible.sync="dialogFormEditVisible"
      width="500px"
      top="200px"
    >
      <el-form :model="formEdit" :rules="rules" ref="formEdit">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="formEdit.name" auto-complete="off" :placeholder="currentName"></el-input>
        </el-form-item>
        <el-form-item
          label="菜单功能"
          :label-width="formLabelWidth"
          prop="permissions"
        >
           <div class="block">
               <el-cascader
                 v-model="formEdit.permissionsId"
                 :options="options"
                 :props="defaultProps"
                 
                 :key="cascaderKey"
                 collapse-tags
                 clearable
                 :placeholder="currentPermissions"
                 style="width:100%"></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="formEdit.info" auto-complete="off" :placeholder="currentInfo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { getRoles, getRolesAllPermission,getRolesPermission,postRole, deletetRole, putRole } from "@/api/role";
export default {
  name: "Role",
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        info: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        permissionsId: [
          { required: true, message: "请选择功能", trigger: "change" },
        ],
      },
      cascaderKey:0,
      // props: { multiple: true },
      defaultProps:{
        multiple: true,
        value:"id",
        label:"name",
        children:"permissions"
      },
      options:[],
      currentName:"",
      currentInfo:"",
      currentId: "",
      currentPermissions:"",

      dialogFormEditVisible: false,
      dialogFormAddVisible: false,
      formLabelWidth: "80px",
      formAdd: {
        name: "",
        permissionsId: [],
        info: "",
      },
      formEdit: {
        name: "",
        permissionsId: [],
        info: "",
      },
      
      tableData: [],
    };
  },
  // computed: {
     // ...mapGetters(["name"]),
  // },
  watch:{
         //切换数据源
         options(newVal,oldVal) {           
            this.cascaderKey++
        }
  },
  methods: {
    addItem() {
      this.dialogFormAddVisible = true;
      getRolesAllPermission().then(res => {
        this.options = res.data
      }).catch(err => {
        console.log(err);
      });

    },   
    confirmAdd() {
      var addPermissions=[]
      this.formAdd.permissionsId.map(val=>{
        //permissionsId一共两层，每个数组只有两个元素一个父，一个子
        console.log(val)
        addPermissions.push(val[1])
      })
      this.$refs["formAdd"].validate((valid) => {
        if (valid) {
          postRole({
            name: this.formAdd.name,
            permissions:addPermissions,
            info: this.formAdd.info,
          })
            .then((res) => {
              this.getRole();
            })
            .catch((error) => {
              console.log(error);
            });
          this.$refs.formAdd.resetFields();
          this.dialogFormAddVisible = false;
          
        }
      });
    },
    deleteItem(scope) {
      // console.log(scope.row.id);
       this.$confirm("确认删除吗？",{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then (()=>{
        deletetRole(scope.row.id)
          .then((res) => {
            this.getRole();
          })
          .catch((err) => {
            console.log(err);
          });
      })
    },

    updateItem(scope) {
      this.currentId = scope.row.id;
      this.currentName = scope.row.name;
      this.currentInfo = scope.row.info;
      this.dialogFormEditVisible = true;
      console.log(scope.row.id)

      getRolesPermission(this.currentId).then(res => {
        this.options = res.data
        var arrPermission=[]
        res.data.map(item => {
          item.permissions.map(i=>{
             if(i.has==true){
              arrPermission.push(i.name)
            }
          })
        })
        this.currentPermissions=arrPermission.toString();
    
      }).catch(err => {
        console.log(err);
      })
  
    },
    confirmEdit() {
     var editPermissions=[]
      this.formEdit.permissionsId.map(val=>{
        //每个数组只有两个元素一个父，一个子
        editPermissions.push(val[1])
      })
      this.$refs["formEdit"].validate((valid) => {
        if (valid) {
          putRole(this.currentId, {
            name: this.formEdit.name,
            permissions: editPermissions,
            info: this.formEdit.info,
          })
            .then((res) => {
              this.getRole();
              // console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          this.dialogFormEditVisible = false;
        }
      });
    },
 
    getRole() {
      getRoles().then(res => {
        this.tableData = res.data;
      })
      
    },
  },
  mounted() {
    this.getRole();
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.delete {
  color: red;
}
</style>
