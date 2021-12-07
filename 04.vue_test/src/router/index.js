// 该文件用于创建整个应用的路由器
import VueRouter from "vue-router" 

// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
export default new VueRouter({
  routes:[
    {
      name:'guanyu',
      path:'/about',
      component:About
    },
    {
      path:'/home',
      component:Home,
      redirect:'/home/news',
      // 通过children配置子级路由
      children:[ 
        {
          path:'news', //此处一定不要写/news 底层已经处理好 子路由不要/
          component:News
        },
        { 
          path:'message',
          component:Message,
          children:[
            {
              name:'xiangqing', //命名路由 简化路由跳转的路径 用name代替path
              // path: 'detail/:id/:title',
              path: 'detail',
              component:Detail,

              // 1.props的第一种写法，值为对象，该对象中的内容都会以props的形式传递给Detail组件
              // props:{a:1,b:'hello'}

              // 2.props的第二种写法，值为布尔值，会把该路由组件所收到的所有*params*参数，以props传给Detail组件
              // props:true

              // 3.props的第三种写法，值为函数
              props($route){
                console.log($route,'$route')
                return{
                  id: $route.query.id,
                  title:$route.query.title
                }
              }
            }
          ]
        }
      ]
    }
  ]
})
