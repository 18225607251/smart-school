<template>
  <div>
     <el-button @click="addItem">+添加</el-button>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="link" label="链接"> </el-table-column>
      <el-table-column prop="sort" label="排序" width="180"> </el-table-column>
      <el-table-column prop="permissions" label="权限标识"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >添加下一级</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
     <el-dialog
      :visible.sync="dialogForm1Visible"
      width="500px"
      top="200px"
    >
      <el-form :model="form1"  ref="form1" :rules="rules">
        <el-form-item label="上级菜单" :label-width="formLabelWidth" >
          <el-input v-model="form1.menu" auto-complete="off"></el-input>          
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form1.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth" prop="link">
          <el-input v-model="form1.link" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
          <el-input v-model="form1.sort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="form1.icon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="permissionsType" :label-width="formLabelWidth">
            <el-radio-group v-model="form1.permissionsType">
              <el-radio label="1">菜单权限</el-radio>
              <el-radio label="2">操作权限</el-radio>
            </el-radio-group>
          </el-form-item>
        <el-form-item label="权限标识" :label-width="formLabelWidth" prop="permissions">
          <el-input v-model="form1.permissions" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动形式" prop="description">
          <el-input type="textarea" v-model="form1.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
        <el-button type="primary" @click="confirm1()">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog
      :visible.sync="dialogForm2Visible"
      width="500px"
      top="200px"
    >
      <el-form :model="form2"  ref="form2" :rules="rules">
        <el-form-item label="上级菜单" :label-width="formLabelWidth" >
          <el-input v-model="form2.menu" auto-complete="off"></el-input>          
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form2.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth" prop="link">
          <el-input v-model="form2.link" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
          <el-input v-model="form2.sort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="form2.icon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="permissionsType" :label-width="formLabelWidth">
            <el-radio-group v-model="form2.permissionsType">
              <el-radio label="1">菜单权限</el-radio>
              <el-radio label="2">操作权限</el-radio>
            </el-radio-group>
          </el-form-item>
        <el-form-item label="权限标识" :label-width="formLabelWidth" prop="permissions">
          <el-input v-model="form2.permissions" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动形式" prop="description">
          <el-input type="textarea" v-model="form2.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm2Visible = false">取 消</el-button>
        <el-button type="primary" @click="confirm2()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
     // :fullscreen="dialogFull"
       
      dialogFull:false,
      dialogForm1Visible: false,
      dialogForm2Visible: false,
      formLabelWidth: "80px",

      form1: {
        name: "",
        link: "",
        sort:"",
        permissionsType:"",
        permissions:"",
        description: "",
        menu:"",
        icon:""
      },
      form2: {
        name: "",
        link: "",
        sort:"",
        permissionsType:"",
        permissions:"",
        description: "",
        menu:"",
        icon:""
      },
      rules: {
        name: [{ required: true, message: "请输入内容", trigger: "blur" }],
        sort: [{ required: true, message: "请输入内容", trigger: "blur" }],
        permissionsType: [{ required: true, message: "请输入内容", trigger: "blur" }],
        permissions: [{ required: true, message: "请输入内容", trigger: "blur" }],
        description: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      tableData: [
        {
          id: 1,
          name: "系统管理",
          link: "",
          sort: "1",
          permissions: "",
          children: [
            {
              id: 11,
              name: "菜单管理",
              link: "",
              sort: "2",
              permissions: "",
               children: [
                {
                  id: 111,
                  name: "添加",
                  link: "",
                  sort: "3",
                  permissions: "",
                },
                {
                  id: 112,
                  name: "修改",
                  link: "",
                  sort: "3",
                  permissions: "",
                },
                {
                  id: 113,
                  name: "删除",
                  link: "",
                  sort: "3",
                  permissions: "",
                }
              ],
            },
            {
              id: 12,
              name: "组织架构",
              link: "",
              sort: "2",
              permissions: "",
            },
            {
              id: 13,
              name: "角色管理",
              link: "",
              sort: "2",
              permissions: "",
              children: [
                {
                  id: 131,
                  name: "添加",
                  link: "",
                  sort: "3",
                  permissions: "",
                },
                {
                  id: 132,
                  name: "修改",
                  link: "",
                  sort: "3",
                  permissions: "",
                },
                {
                  id: 133,
                  name: "删除",
                  link: "",
                  sort: "3",
                  permissions: "",
                }
              ]
            },
            {
              id: 14,
              name: "时间段设置",
              link: "",
              sort: "2",
              permissions: "",
            },
            {
              id: 15,
              name: "用户管理",
              link: "",
              sort: "2",
              permissions: "",
              children: [
                {
                  id: 151,
                  name: "新增",
                  link: "",
                  sort: "3",
                  permissions: "",
                },
                {
                  id: 152,
                  name: "修改",
                  link: "",
                  sort: "3",
                  permissions: "",
                },
                {
                  id: 153,
                  name: "删除",
                  link: "",
                  sort: "3",
                  permissions: "",
                },
                  {
                  id: 154,
                  name: "导出",
                  link: "",
                  sort: "3",
                  permissions: "",
                }
              ]
            }],
        },
        {
          id: 2,
          name: "系统管理",
          link: "",
          sort: "1",
          permissions: "",
          children:[

          ]
        }
      ],
    };
  },
  methods: {
    addItem() {
      this.dialogForm2Visible = true;
      console.log("添加");
      console.log(this.$store.state);

    },
    handleEdit(index, row) {
      // this.dialogFull = true;
      this.dialogForm2Visible = true;
      console.log(index, row);
    },
    confirm1() {
      this.dialogForm2Visible = false;
    },
     confirm2() {
       this.dialogForm2Visible = false;
       
      // this.tableData[this.index].name = this.form2.name;
      // this.tableData[this.index].permissions = this.form2.permissions;
      // this.tableData[this.index].description = this.form2.description;
      // axios({
      //   method:'put',
      //   url:`http://42.192.5.249:8080/v1/role/${this.id}`,
      //   data:{
      //     name: this.form2.name,
      //     permissions: this.form2.permissions,
      //     description: this.form2.description
      //     },
      // }).then((res) => {
      //    if(res.data.message == "操作成功")
      //    this.getRole();
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            sort: "01",
            name: "虎",
            permissions: "无",
          },
          {
            id: 32,
            sort: "01",
            name: "虎",
            permissions: "无",
          },
        ]);
      }, 1000);
    },
  },
  
};
</script>

<style>

</style>