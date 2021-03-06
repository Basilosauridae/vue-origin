/* 该文件用于创建整个应用的路由器 */
import VueRouter from "vue-router" 

/* 引入组件 */
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

/* 创建并一个路由器 */
const router = new VueRouter({
  routes:[
    {
      name:'guanyu',
      path:'/about',
      component:About,
      meta: { isAuth: true,title:'关于'}
    },
    {
      path:'/home',
      component:Home,
      meta: { title:'主页'},
      // 通过children配置子级路由
      children:[ 
        {
          path:'news', //此处一定不要写/news 底层已经处理好 子路由不要/
          component:News,
          meta: { isAuth: true,title:'新闻' },
          /* 3.独享路由守卫 */
          /* beforeEnter:(to,from,next)=>{
            // console.log('路由独享守卫‘,to,from)
            if (to.meta.isAuth){
              if(localStorage.getItem('school')==='hm'){
                next()
              }else{
                alert('学校名不对 无权限查看')
              }
            }else{
              next()
            }
          } */
        },
        { 
          path:'message',
          component:Message,
          meta: { isAuth: true,title:'消息' },
          children:[
            {
              name:'xiangqing', //命名路由 简化路由跳转的路径 用name代替path
              // path: 'detail/:id/:title',
              meta: { isAuth: true,title:'详情'},
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
/* 1.全局前置路由守卫(路由初始化和每一次切换之前调用) */
/* router.beforeEach((to,from,next)=>{
  // console.log('路由前置守卫被调用了',to,from)
  // if (to.path === '/home/news' || to.path === '/home/message') {  //写法一 有点麻烦 
  if (to.meta.isAuth) { //2.写法二 判断是否需要鉴权 路由配置项中添加meta
    if(localStorage.getItem('school') === 'hm'){
      // document.title = to.meta.title || '狸猫系统'            
      next()
    }else{
      alert('学校名不对 无权限查看')
    }
  }else{
    // document.title = to.meta.title || '狸猫系统'
    next()
  }
}) */

/* 2.全局后置路由守卫(路由初始化调用和每一次切换之后调用) */
/* router.afterEach((to,from)=>{
  console.log('路由后置守卫被调用了',to,from)
  document.title = to.meta.title || '狸猫系统' //如果写在前置 逻辑要写多次
}) */

/*  路由暴露 */
export default router
