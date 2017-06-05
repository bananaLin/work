$(function(){
       
       /*vue组件通信*/  
       $(document).on('click', '#communicate', function(){
        $("#main #projects").empty();
             $("#main #article").empty().html(communicate);
       });

       /*原型链*/  
       $(document).on('click', '#proto', function(){
        $("#main #projects").empty();
             $("#main #article").empty().html(proto);
       });

       /*跨域*/  
       $(document).on('click', '#domain', function(){
        $("#main #projects").empty();
             $("#main #article").empty().html(domain);
       });

        /*vue组件通信*/ proto
       $(document).on('click', '#index', function(){
        $("#main #projects").empty();
             $("#main #article").empty().html(communicate);
       });
       
       /*项目projects*/
      $(document).on('click', '#project', function(){
             $("#main #article").empty();
             $("#main #projects").empty().html(projects);
       });

       /*关于我*/
       $(document).on('click', '#aboutMe', function(){
         $("#main #projects").empty(); 
              $("#main #article").empty().html(aboutMe);
              // 初始化echarts实例
        var radarChart = echarts.init(document.getElementById('radarChart'));
         // 配置项和数据
        radarOption = {
            //color:{['#6e7074']},
            tooltip: {},
            legend: {
                data: ['技术栈（skill）']
            },
            radar: {
            // shape: 'circle',
                indicator: [
                   { name: 'java', max: 100},
                   { name: 'jQuery', max: 100},
                   { name: 'css(3)', max: 100},
                   { name: 'html(5)', max: 100},
                   { name: 'vue.js', max: 100},
                   { name: 'node.js', max: 100}
                ]},
            series: [{
                name: '掌握技能',
                type: 'radar',
                data : [
                    {
                        value : [70, 69, 68, 62, 62, 60],
                        name : '技术栈（skill）'
                    }
                ]
            }]
         };
         // 使用配置项和数据显示图表。
        radarChart.setOption(radarOption);
       });

       $('#communicate').click();

});

var communicate =               "<div class='title'>Vue.js组件之间的通信</div>"
communicate +=                        "<div class='text'>"
communicate +=                              "<p>vue组件的关系不外乎两种，“父子”、“兄弟”。</p>"
communicate +=                              "<p>先说父子组件间如何通信,首先把子组件引进父组件,并在components属性中声明它。像这样:</p>"
communicate +=                              "<div class='code'>"
communicate +=                                    "<div class='top'>"
communicate +=                                          "<div class='red'></div><div class='orange'></div><div class='green'></div>"
communicate +=                                    "</div>"
communicate +=                                    "<p>import header from 'components/header/header.vue';//引进header.vue组件</p>"
communicate +=                                    "<p> ...</p>"
communicate +=                                    "<p>components: {</p>"
communicate +=                                    "<p>&nbsp;&nbsp;'v-header': header//header是关键字所以取名为v-header</p>"
communicate +=                                    "<p>}</p>"
communicate +=                                    "<p>...</p>"
communicate +=                              "</div>"
communicate +=                              "<p>准备工作做好后,在component中,绑定一个属性。像这样:</p>"
communicate +=                              "<div class='code'>"
communicate +=                                    "<div class='top'>"
communicate +=                                          "<div class='red'></div><div class='orange'></div><div class='green'></div>"
communicate +=                                   "</div>"
communicate +=                                    "<p>< v-header :seller='seller'>< / v-header ></p>"
communicate +=                              "</div>"
communicate +=                              "<p>最后一步,到在子组件中做接收工作了。很简单，你只需这样:</p>"
communicate +=                              "<div class='code'>"
communicate +=                                    "<div class='top'>"
communicate +=                                          "<div class='red'></div><div class='orange'></div><div class='green'></div>"
communicate +=                                    "</div>"
communicate +=                                     "<p>props: {</p>"
communicate +=                                     "<p>&nbsp;&nbsp;seller: {</p>"
communicate +=                                     "<p>&nbsp;&nbsp;&nbsp;&nbsp;type: Object</p>"
communicate +=                                     "<p>&nbsp;&nbsp;}</p>"
communicate +=                                     "<p>}</p>"
communicate +=                              "</div>"
communicate +=                              "<p>这样你绑定在名叫seller的属性上的对象，在子组件就可以直接用了。</p>"
communicate +=                              "<p>接下来,我们说一说兄弟组件之间的通信,也有人说“平行组件”,whatever。</p>"
communicate +=                              "<p>那么这次就要用到event bus,第一步,创建一个Bus.js文件,里面只需要这样写:</p>"
communicate +=                              "<div class='code'>"
communicate +=                                    "<div class='top'>"
communicate +=                                          "<div class='red'></div><div class='orange'></div><div class='green'></div>"
communicate +=                                    "</div>"
communicate +=                                    "<p>export default new Vue();//创建实例并导出</p>"
communicate +=                              "</div>"
communicate +=                              "<p>在兄弟A组件里引入这个Bus.js文件。并</p>"
communicate +=                              "<div class='code'>"
communicate +=                                    "<div class='top'>"
communicate +=                                          "<div class='red'></div><div class='orange'></div><div class='green'></div>"
communicate +=                                    "</div>"
communicate +=                                    "<p>import Bus from 'common/js/Bus.js';</p>"
communicate +=                                    "<p>...</p>"
communicate +=                                    "<p>methods: {</p>"  
communicate +=                                    "<p>&nbsp;&nbsp;addCart(event) {</p>"  
communicate +=                                    "<p>&nbsp;&nbsp;&nbsp;&nbsp;Bus.$emit('getTarget', event.target);</p>"   
communicate +=                                    "<p>&nbsp;&nbsp;}</p>"  
communicate +=                                    "<p>}</p>"
communicate +=                                    "<p>...</p>"       
communicate +=                              "</div>"                           
communicate +=                              "<p>在兄弟B组件里也要引入这个Bus.js文件。</p>"
communicate +=                              "<div class='code'>"
communicate +=                                    "<div class='top'>"
communicate +=                                          "<div class='red'></div><div class='orange'></div><div class='green'></div>"
communicate +=                                    "</div>"
communicate +=                                    "<p>import Bus from 'common/js/Bus.js';</p>"
communicate +=                                    "<p>...</p>"
communicate +=                                    "<p>Bus.$on('getTarget', target => { </p>" 
communicate +=                                    "<p>&nbsp;&nbsp;console.log(target);</p>"  
communicate +=                                    "<p>});</p>" 
communicate +=                                    "<p>...</p>"       
communicate +=                              "</div>"
communicate +=                              "<p class='last'>像这样通过一个监听某个事件，一个来触发事件。来达成兄弟（平行）组件之间的通信</p>"
communicate +=                        "</div>"

//var mail = "<div class='title'>Java实现邮箱发送邮件(可带附件)</div>";

var projects =                               "<div class='box'>"
projects +=                                     "<div class='top'>"
projects +=                                           "<div class='red'></div><div class='orange'></div><div class='green'></div>"
projects +=                                           "<a href='./pay/pay.html' class='url'><i class='layui-icon' style='color:#fff;'>&#xe64c;</i> 项目演示地址</a>"   
projects +=                                      "</div>"
projects +=                                      "<div class='text'>"
projects +=                                            "<p class='name'>美识美业——购物模块</p>"
projects +=                                            "<p class='skill'>基于java + jQuery + html + css</p>"
projects +=                                            "<p class='desc'>&nbsp;&nbsp;&nbsp;&nbsp;现公司前端运用到的JS库是jQuery,它虽然年龄比较大,但是现在大多数公司还在用。因为它的社区有很多很多大牛为它写很实用的插件。我这个项目就运用到一个第三方插件,artTemplate。另外这一个小项目还有一个亮点,就是总的下拉框与各个子下拉框有联动性。选购完模块后，到了扫码页面，为了兼容IE8，支付二维码我是用java后端生成的，虽然有个jQuery插件可以画出二维码，但那个插件底层是用html5 的canvas画的，所以兼容不了IE8。独立完成这个模块后,得到了前端组长的认可。</p>"
projects +=                                      "</div>"
projects +=                                  "</div>"  
projects +=                                  "<div class='box'>"
projects +=                                      "<div class='top'>"
projects +=                                           "<div class='red'></div><div class='orange'></div><div class='green'></div>"
projects +=                                           "<a href='./responsive/index.html' class='url'><i class='layui-icon' style='color:#fff;'>&#xe64c;</i> 项目演示地址</a>" 
projects +=                                      "</div>"
projects +=                                      "<div class='text'>"
projects +=                                            "<p class='name'>理财宝(个人练习项目) </p>"
projects +=                                            "<p class='skill'>基于html + css3 + js</p>"
projects +=                                            "<p class='desc'>&nbsp;&nbsp;&nbsp;&nbsp;这是一个自适应页面,无论pc端、移动端,它的样式都不会被压“坏”。因为我运用了@media和百分比来实现一套样式适配多种设备。在这个项目中还用到了常见的css3属性,比如:transition、box-shadow、border-radius等等。</p>"
projects +=                                      "</div>"
projects +=                                   "</div>"
projects +=                                   "<div class='box'>"
projects +=                                      "<div class='top'>"
projects +=                                           "<div class='red'></div><div class='orange'></div><div class='green'></div>"
projects +=                                           "<a href='./tour/page.html'  class='url'><i class='layui-icon' style='color:#fff;'>&#xe64c;</i> 项目演示地址</a>" 
projects +=                                      "</div>"
projects +=                                      "<div class='text'>"
projects +=                                            "<p class='name'>携程首页(个人练习项目) </p>"
projects +=                                            "<p class='skill'>基于html + css3 + js</p>"
projects +=                                            "<p class='desc'>&nbsp;&nbsp;&nbsp;&nbsp;这个静态页面是我利用工作之余时间做的,为了熟练前端技术,更好掌握布局,position的relative跟absolute。当然还用到“扣图”,有空都会练习前端工程师的基本功</p>"
projects +=                                      "</div>"
projects +=                                   "</div>"

var aboutMe =                     "<img src='img/pic.jpg' alt='头像' class='picture' />"
aboutMe +=                              "<div id='radarChart'></div>"

var domain =             "<div class='title'>前端懂得多一点之跨域</div>"
domain +=                    "<div class='text'>"
domain +=                       "<p>我学东西，都要弄清楚三个问题——什么是XX？怎样才算XX？XX能干什么？那今天我就按着这个思路来讲一跨域。</p>"
domain +=                       "<p>跨域是什么？跨域是指不同域名之间相互访问，这跟我们生活中出入境有点相似。</p>"
domain +=                       "<p>怎样才算是跨域？域名、端口、协议，这三个条件中有一个不一样的话就是跨域。</p>"
domain +=                       "<p>跨域能干什么？很明显就是请求不同域名的服务嘛。那说了一大堆。代码怎么写？</p>"
domain +=                   "<div class='code'>"
domain +=                   "<div class='top'>"
domain +=                           "<div class='red'></div><div class='orange'></div><div class='green'></div>"
domain +=                       "</div>"
domain +=                 "<p>$.ajax({</p>"
domain +=                 "<p>&nbsp;&nbsp;url:'http://run.plnkr.co/plunks/v8xyYN64V4nqCshgjKms/data-2.json',</p>"
domain +=                 "<p>&nbsp;&nbsp;dataType:'jsonp',  //通常是json,跨域的话，这里要改成jsonp</p>"
domain +=                 "<p>&nbsp;&nbsp;jsonpCallback: 'jsonCallback',</p>"
domain +=                 "<p>&nbsp;&nbsp;success: function(data){</p>"
domain +=                       "<p>&nbsp;&nbsp;&nbsp;&nbsp;data = data.sites;</p>"
domain +=                       "<p>&nbsp;&nbsp;&nbsp;&nbsp;console.log(data);</p>"
domain +=                 "<p>&nbsp;&nbsp;}</p>"
domain +=                 "<p>});</p>"
domain +=            "</div>"
domain +=            "<img class='result'  src='img/result.png' alt='结果'>"
domain +=            "<p class='last'>是不是发现其实跨域没有那么神奇。</p>"


var proto =                      "<div class='title'>深入学习JavaScript之原型链</div>"
proto +=                              "<div class='text'>"
proto +=                                    "<p>要说原型链，就先搞懂原型先吧。官方的解释是说:每个对象都有一个内部链接到另一个对象，称为它的原型 prototype。还给出了这样的例子:（<a href='https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain'>点击这里查看原文</a>）</p>"
proto +=                                    "<div class='code'>"
proto +=                                          "<div class='top'>"
proto +=                                                "<div class='red'></div><div class='orange'></div><div class='green'></div>"
proto +=                                          "</div>"
proto +=                                          "<p>// 让我们假设我们有一个对象 o, 其有自己的属性 a 和 b：</p>"
proto +=                                          "<p>// {a: 1, b: 2}</p>"
proto +=                                          "<p>// o 的原型 o.__proto__有属性 b 和 c：</p>"
proto +=                                          "<p>// {b: 3, c: 4}</p>"
proto +=                                          "<p>// 最后, o.__proto__.__proto__ 是 null.</p>"
proto +=                                          "<p>// 这就是原型链的末尾，即 null，</p>"
proto +=                                          "<p>// 根据定义，null 没有__proto__.</p>"
proto +=                                          "<p>// 综上，整个原型链如下: </p>"
proto +=                                          "<p>// {a:1, b:2} ---> {b:3, c:4} ---> null</p>"
proto +=                                          "<p>console.log(o.a); // 1</p>"
proto +=                                          "<p>// a是o的自身属性吗？是的，该属性的值为1</p>"
proto +=                                          "<p>console.log(o.b); // 2</p>"
proto +=                                          "<p>// b是o的自身属性吗？是的，该属性的值为2</p>"
proto +=                                          "<p>// o.__proto__上还有一个'b'属性,但是它不会被访问到.这种情况称为'属性遮蔽 (property shadowing)'.</p>"
proto +=                                          "<p>console.log(o.c); // 4</p>"
proto +=                                          "<p>// c是o的自身属性吗？不是，那看看o.__proto__上有没有.</p>"
proto +=                                          "<p>// c是o.__proto__的自身属性吗？是的,该属性的值为4</p>"
proto +=                                          "<p>console.log(o.d); // undefined</p>"
proto +=                                          "<p>// d是o的自身属性吗？不是,那看看o.__proto__上有没有.</p>"
proto +=                                          "<p>// d是o.__proto__的自身属性吗？不是，那看看o.__proto__.__proto__上有没有.</p>"
proto +=                                          "<p>// o.__proto__.__proto__为null，停止搜索，</p>"
proto +=                                          "<p>// 没有d属性，返回undefined</p>"
proto +=                                    "</div>"
proto +=                                    "<p>看到这里，通俗来讲“原型”，不就是模板的意思嘛。比如说，摩托车的原型就是自行车、手机的原型就是电话...</p>"
proto +=                                    "<p>那么接下来，让我们来理解什么是原型链吧。还是用上面的例子，每个实例内部都有一个连接到另外一个对象的链，这样的一个抽象的东西被我们称为原型链，而且这条链的终端是null。</p>"
proto +=                              "</div>"