import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    name: "Empty",
    meta: {
      title: "404",
    },
    component: (resolve) => require(["../views/404.vue"], resolve)
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: "登录",
    },
    component: (resolve) => require(["../views/login.vue"], resolve)
  },

  {
    path: '/all-rules-test',
    name: 'all-rules-test',
    meta: {
      title: "项目全过规则",
    },
    component: (resolve) => require(["../views/all-rules-test.vue"], resolve)
  },


  // {
  //   path: '/test-project',
  //   name: 'test-project',
  //   meta: {
  //     title: "项目测试",
  //   },
  //   component: (resolve) => require(["../views/test-project.vue"], resolve)
  // },
  // {
  //   path: '/test-history',
  //   name: 'test-history',
  //   meta: {
  //     title: "历史单据测试",
  //   },
  //   component: (resolve) => require(["../views/test-history.vue"], resolve)
  // },
  // {
  //   path: '/test-rule',
  //   name: 'test-rule',
  //   meta: {
  //     title: "规则测试",
  //   },
  //   component: (resolve) => require(["../views/test-rule.vue"], resolve)
  // },


  {
    path: '/',
    name: 'Index',
    component: (resolve) => require(["../views/index.vue"], resolve),
    redirect: { name: 'message' },
    children: [
      {
        path: '/message',
        name: 'message',
        meta: {
          title: "欢迎登陆",
        },
        component: (resolve) => require(["../views/message.vue"], resolve)
      },
      {
        path: '/personal-edit',
        name: 'personal-edit',
        meta: {
          title: "个人资料",
        },
        component: (resolve) => require(["../views/personal-edit.vue"], resolve)
      },
      {
        path: '/personal-password',
        name: 'personal-password',
        meta: {
          title: "修改密码",
        },
        component: (resolve) => require(["../views/personal-password.vue"], resolve)
      },




      // {
      //   path: '/example-table',
      //   name: 'example-table',
      //   meta: {
      //     title: "表格",
      //   },
      //   component: (resolve) => require(["../views/example-table.vue"], resolve)
      // },
      // {
      //   path: '/example-form',
      //   name: 'example-form',
      //   meta: {
      //     title: "表单",
      //   },
      //   component: (resolve) => require(["../views/example-form.vue"], resolve)
      // },
      // {
      //   path: '/other-01',
      //   name: 'other-01',
      //   component: (resolve) => require(["../views/example-form.vue"], resolve)
      // },




      {
        path: '/project-audit',
        name: 'project-audit',
        meta: {
          title: "项目审核",
        },
        component: (resolve) => require(["../views/project-audit.vue"], resolve)
      },
      {
        path: '/project-list',
        name: 'project-list',
        meta: {
          title: "项目管理",
        },
        component: (resolve) => require(["../views/project-list.vue"], resolve)
      },
      {
        path: '/project',
        name: 'project',
        meta: {
          title: "项目管理",
        },
        redirect: { name: 'project-list' },
      },


      {
        path: '/project-data',
        name: 'project-data',
        meta: {
          title: "项目管理 - 数据字典",
        },
        component: (resolve) => require(["../views/project-data.vue"], resolve)
      },
      {
        path: '/project-version',
        name: 'project-version',
        meta: {
          title: "项目管理 - 版本管理",
        },
        component: (resolve) => require(["../views/project-version.vue"], resolve)
      },
      {
        path: '/project-version-audit',
        name: 'project-version-audit',
        meta: {
          title: "项目管理 - 版本审核",
        },
        component: (resolve) => require(["../views/project-version-audit.vue"], resolve)
      },
      {
        path: '/project-version-scene',
        name: 'project-version-scene',
        meta: {
          title: "项目管理 - 版本审核 - 场景管理",
        },
        component: (resolve) => require(["../views/project-version-scene.vue"], resolve)
      },
      {
        path: '/project-version-scene-rule',
        name: 'project-version-scene-rule',
        meta: {
          title: "项目管理 - 版本审核 - 场景管理 - 规则管理",
        },
        component: (resolve) => require(["../views/project-version-scene-rule.vue"], resolve)
      },


      {
        path: '/project-rule',
        name: 'project-rule',
        meta: {
          title: "项目管理 - 规则配置",
        },
        component: (resolve) => require(["../views/project-rule.vue"], resolve)
      },

      {
        path: '/auth-menu',
        name: 'auth-menu',
        meta: {
          title: "权限管理 - 权限菜单",
        },
        component: (resolve) => require(["../views/auth-menu.vue"], resolve)
      },
      {
        path: '/auth-duties-list',
        name: 'auth-duties-list',
        meta: {
          title: "权限管理 - 职务管理",
        },
        component: (resolve) => require(["../views/auth-duties-list.vue"], resolve)
      },
      {
        path: '/auth-duties-setting',
        name: 'auth-duties-setting',
        meta: {
          title: "权限管理 - 职务管理 - 权限配置",
        },
        component: (resolve) => require(["../views/auth-duties-setting.vue"], resolve)
      },
      {
        path: '/auth-people-list',
        name: 'auth-people-list',
        meta: {
          title: "权限管理 - 人员管理",
        },
        component: (resolve) => require(["../views/auth-people-list.vue"], resolve)
      },
      {
        path: '/auth-func',
        name: 'auth-func',
        meta: {
          title: "权限管理 - 函数管理",
        },
        component: (resolve) => require(["../views/auth-func.vue"], resolve)
      },

      {
        path: '/log-handle-list',
        name: 'log-handle-list',
        meta: {
          title: "日志管理 - 操作日志",
        },
        component: (resolve) => require(["../views/log-handle-list.vue"], resolve)
      },
      {
        path: '/log-approval-list',
        name: 'log-approval-list',
        meta: {
          title: "日志管理 - 审批日志",
        },
        component: (resolve) => require(["../views/log-approval-list.vue"], resolve)
      },

      {
        path: '/history-doc',
        name: 'history-doc',
        meta: {
          title: "历史单据",
        },
        component: (resolve) => require(["../views/history-doc.vue"], resolve)
      },
    ]
  },
]

const router = new VueRouter({
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
