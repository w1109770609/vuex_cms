# 项目总结

 1. 1 这是一个用vue以及用vue-router和elementui框架开发的一个后台管理系统电信通的项目

 2. 2 项目中路由搭建的思路,项目中最多用到了三级路由,大部分是二级路由

    a. 2.1

        routes:{
          {
            path: '/home',
            name: 'home',
            component: Home,
            children: [
              {
                name: 'business',
                path: 'business',
                component: Business,
                children:[
                  {
                    name: 'BusinessChild',
                    path: '/business/:id',
                    component: BusinessChild
                  }
                ]
              }
            ]
          }
        }

 3. 1 做项目终于到的bug,及解决的方案

      a. 3.1

        1. 在首次登录判断权限时,

        router.beforeEach ((to, from, next) => {
          if (to.name === 'login') {
            这一步判断不好可能会形成闭环,解决方案就是用全局导航守卫首次去判断他是否在登录页面,如果在就让他继续向下next()      (小坑)
            ***
            next ();
          } else {
            if (sessionStorage.getItem ('login')) {
              next ();
            } else {
              next ('/login');
            }
          }
        })

        2. 在使用elementui组件时,其组件样式及封装与页面功能样式有偏差,所以有对样式进行了修改以及对组件进行了重新封装.

        3. ...

 4. 1 代表性功能模块

    a. 4.1

    1. 项目中elementUI table组件居多,其结合了elementUI input组件实现过滤筛选,还有loading

 5. sasdfd
