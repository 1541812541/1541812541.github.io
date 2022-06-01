//自己写的，所有echarts配置放这
//使用立即执行函数（function()）{函数内容}();防止变量污染
/* 步骤
    三.初始化echarts实例对象
      1.<script>
        var myChart= echarts.init(document.querySelector(".dom容器名"));
        比如var myChart= echarts.init(document.querySelector(".box"));
      </script>
    四.指定配置项和数据（option）
       复制官方 var option 并进行修改
      1.title:图表标题
      2.tooltip:鼠标放上提示信息的触发方式，折线图为axis(坐标轴),其他为item
      3.legend:展示每条数据线的含义
      4.toolbox:工具箱组件，设置能否保存图片
      5.grid:网格配置 控制图表大小（距离dom容器的距离，显示刻度）
      6.xAxis:x轴配置 type,类型：category-类目（横坐标文字）value-数值（横坐标数据）
              boundaryGap,图与左侧坐标轴有没有缝隙
               data,x轴显示的数据
      7.series:数组(真正的数据地,xAxis yAxis只是轴刻度数据)，每个对象代表一条线，里面的data是数据决定了走向
                name-每条线的名字,type-类型，stake-数据堆叠，此条显示数据=前n组数据+本组数据
      8.color: []-数组，设置每条线的颜色 
      9.itemStyle: 柱子样式修改        

    五.将配置项给echarts实例对象
       1.myChart.setOption(option);
    六.图表自适应大小   */ 
//** 柱状图纵向--放在左侧第一个盒子bar里面的chart盒子**
      (function(){
           //3.实例化对象（第一步在html最下方）
    var myChart = echarts.init(document.querySelector(".bar .chart"));
           //4.指定配置项和数据
    var option = {
        //改柱子颜色
            color: ["#2f89cf"],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
        // 修改图表大小
            grid: {
              left: '0%',
              top: '10px',
              right: '0%',
              bottom: '4%',
              containLabel: true
            },
        //修改x轴信息    
            xAxis: [
              {
                type: 'category',
                //修改X轴数据
                data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                axisTick: {
                  alignWithLabel: true
                },
               //修改x轴标签axisLabel（标签颜色、字体大小、）
                 axisLabel: {
                     color: "rgba(255,255,255,.6)",
                     fontSize: "12",
                 },  
                //不显示x坐标轴的样式
                  axisLine: {
                      show: false
                  }
              }
            ],
        //修改y轴信息    
            yAxis: [
              {
                type: 'value',
                //修改y轴标签axisLabel（标签颜色、字体大小、）
                axisLabel: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: "12",
              },
              //设置y轴线条的线条样式(2像素的rgb(255,255,255,.1)边框)
                axisLine: {
                      lineStyle: {
                          color: "rgba(255,255,255,.1)",
                          width: 2,
                      }
                  },
                //   y轴分割线的颜色splitLine
                splitLine: {
                         lineStyle:{
                             color: "rgba(255,255,255,.1)"
                         }
                }
                }
            ],
            series: [
              {
                name: 'series的名字',
                type: 'bar',
                //修改柱子宽度35%
                barWidth: '35%',
                //修改柱子圆角 itemStyle里的BorderRadius
                itemStyle: {
                         barBorderRadius: 5
                },
                //修改y轴的数据
                data: [10, 52, 200, 334, 390, 330, 220]
              }
            ]
          };
            //5.配置项给实例对象
     myChart.setOption(option); 
            //6.图表大小跟随页面自适应
      window.addEventListener('resize',function(){
          myChart.resize();
      })            
})();
//** 柱状图横向--放在右侧第一个盒子bar2里的chart盒子里**
      (function(){
          var myColor = ['#1089E7','#F57474','#56D0E3','#F8B448','#8B78F6'];
            //3.实例化对象(还是echarts.min.js)
        var myChart=echarts.init(document.querySelector('.bar2 .chart'));
            //4.修改配置和数据
        var option = {
          //不要标题
            /* title: {
              text: 'World Population'
            },
            */
          //不要提示信息 
            /* tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            }, */
          // 不要图例组件 
            // legend: {},
          //修改图表大小  
            grid: {
              top: '10%',
              left: '22%',
              bottom: '10%',
              // containLabel: true表示grid大小包含左侧的label
            },
          //不显示x轴相关信息
            xAxis: {
              // type: 'value',
              // boundaryGap: [0, 0.01]
              show: false
            },
          //不显示y轴线和相关刻度,修改y轴文字颜色
          //由于右侧还有数据，所以需要再加一组y轴刻度标签，用数组yAxis: []  
                      
            yAxis: [
            //左侧刻度 
              {
              //inverse: true,代表刻度从上到下排列即(A-E),默认从下到上
              type: 'category',
              data: [ 'A', 'B', 'C', 'D', 'E'],
              //不显示y轴线
              axisLine: {
                show: false
              },
              //不显示y轴刻度
              axisTick: {
                show: false
              },
              //修改y轴文字颜色为白色
              axisLabel: {
                color: '#fff'
              },
             },
            //右侧刻度
               {
                show: true,
                data: [ 100, 200, 300, 400, 500],
                //不显示y轴线
                axisLine: {
                  show: false
                },
                //不显示y轴刻度
                axisTick: {
                  show: false
                },
                //修改y轴文字颜色为白色
                axisLabel: {
                  color: '#fff'
                },
               } ,    
                  ],
          //进度条制作，两组柱子，第二组柱子改为圆框框住第一组柱子  
            series: [
              //进度条%的数据为第一组柱子里的series数据,yAxis里的第二个刻度数据可以写具体数据，第二组柱子里的series数据必须是100(因为代表长度)
                /* 让第二组柱子压在第一组柱子上
                1.第一组柱子yAxisIndex: 0,
                 2.第二组柱子yAxisIndex：1,*/
              {//第一组柱子
                yAxisIndex: 0,
                name: '2011',//第一组柱子的名字
                type: 'bar',//柱子类型（条状）
                data: [ 10, 20, 30, 40, 50],
                //柱子改为圆角，并给每个柱子不同颜色
                itemStyle: {
                  barBorderRadius: 20,
                  // 给每个柱子不同颜色
                  //实例化对象时定义数组 var myColor = ['#1089E7','#F57474','#56D0E3','#F8B448','#8B78F6'];
                  color: function(params){
                      return myColor[params.dataIndex];
                  },

                },
                //修改柱子的宽度
                barWidth: 10,
                //修改柱子之间的距离,通过修改可以让第二组与第一组重合
                barCategoryGap: 30,
                //设置第一组柱子内百分比显示数据
                //显示图形上的文本标签
                label: {
                  normal: {
                    show: true,
                    position: "inside",//图形内显示标签
                    formatter: "{c}%",//文字显示格式：数据%,数据为第一组的data
                  }
                },

              },
              { //第二组柱子
                yAxisIndex: 1,
                name: '2012',
                type: 'bar',
                data: [ 100, 100, 100, 100, 100],
                //修改柱子的宽度
                barWidth: 15,
                //修改柱子之间的距离
                barCategoryGap: 50,
                 //柱子改为圆角，框状(柱子颜色去掉,设置柱子边框颜色即可)
                itemStyle: {
                  barBorderRadius: 15,
                  color: "none",
                  borderColor: "#00c1de",//设置边框颜色必须有边框宽度
                   borderWidth: 3,
                  // 给每个柱子不同颜色
                  //实例化对象时定义数组 var myColor = ['#1089E7','#F57474','#56D0E3','#F8B448','#8B78F6'];
                  
                  },
              },
            ]
          };
          //5.配置给实例对象
        myChart.setOption(option);
          //6.图表大小跟随页面自适应
      window.addEventListener('resize',function(){
        myChart.resize();
    })            
})();
//** 标准折线图--放在左侧第二个盒子line里的chart盒子里**
      (function(){
        //3.实例化对象(还是echarts.min.js)
        var myChart = echarts.init(document.querySelector('.line .chart'));
        //4.修改配置和数据
        var option = {
          /* title: {
            text: 'Stacked Line'
          }, */
          //修改三条线的颜色(名字必须是color)
          color: ['#00f2f1','#ed3f35','#8B78F6'],
          tooltip: {
            trigger: 'axis'
          },
          //修改图例组件文字颜色(文字表示每条线含义):textStyle
          legend: {
          // legend里data一定要和series里的name保持一致，不然无法显示
            data: ['A', 'B', 'C'],
            //修改图例组件文字颜色
            textStyle:{
              color: '#4c9bfd'
            },
            //修改图例组件的位置 
            right: '10%',//距离右边10%
          },
          //显示边框设置边框颜色
          grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            show: true,//显示边框
            borderColor: '#012f4a',//边框颜色

          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          /* 去除刻度线axisTick，改变刻度标签axisLabel字体颜色，
          去除轴线axisLine，轴两端不需要内间距boundaryGap */
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisTick: {
               show: false //去除刻度线
            },
            axisLabel: {
              color: '#4c9bfd'//刻度标签字体颜色
            },
            axisLine: {
              show: false//去除轴线
            },
            boundaryGap: false//轴两端不需要内间距

          },
          /* 去除刻度线axisTick，改变刻度标签axisLabel字体颜色，
          去除轴线axisLine，轴两端不需要内间距boundaryGap 
           修改y轴分割线的线条样式颜色splitLine-lineStyle-color*/
          yAxis: {
            type: 'value',
            axisTick: {
              show: false //去除刻度线
           },
           axisLabel: {
             color: '#4c9bfd'//刻度标签字体颜色
           },
           axisLine: {
             show: false//去除轴线
           },
           boundaryGap: false,//轴两端不需要内间距
           splitLine: {
             lineStyle: {
               color: '#012f4a',
             }
           }, 
          },
         /* 1. 修改三条线的颜色
          在option里的第一行定义一个数组color: ['#00f2f1','#ed3f35','#8B78F6']
           2.曲线平滑处理*/
          series: [
            { 
              name: 'A',
              type: 'line',
              // stack: 'Total',不要叠加
              data: [120, 132, 101, 134, 90, 230, 210],
              //曲线平滑处理
              smooth: true,
            },
            {
              name: 'B',
              type: 'line',
              // stack: 'Total',不要叠加
              data: [220, 182, 191, 234, 290, 330, 310],
              //曲线平滑处理
              smooth: true,
            },
            {
              name: 'C',
              type: 'line',
              // stack: 'Total',不要叠加
              data: [150, 232, 201, 154, 190, 330, 410],
              //曲线平滑处理
              smooth: true,
            },
   
          ]
        };   
        //5.配置给实例对象
        myChart.setOption(option);
        //6.图表大小跟随页面自适应
        window.addEventListener('resize',function(){
          myChart.resize();
      })     
})();  
//** 填充式折线图--放在右侧第二个盒子line2里的chart盒子里**
      (function(){
        //3.实例化对象(还是echarts.min.js)
        var myChart = echarts.init(document.querySelector('.line2 .chart'));
        //4.修改配置和数据
        var option = {
         /*  title: {
            text: 'Stacked Area Chart'
          }, */
          tooltip: {
            trigger: 'axis',
      /*       axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            } */
          },
        //更换图例组件位置，文字颜色,文字大小
        // legend里data一定要和series里的name保持一致，不然无法显示
          legend: {
            data: ['A', 'B', 'C'],
            top: '0%',//更换图例组件位置
            textStyle: {
              color: "rgba(255,255,255,.5)",//图例文字颜色
              fontSize: '12'//图例文字大小
          }
        },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
        //更改图表大小  
          grid: {
            top: '30',
            left: '10',
            right: '10',
            bottom: '10',
            containLabel: true
          },
          //修改刻度标签文本颜色，文字大小，轴线颜色
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
              axisLabel: {
                textStyle: {
                color: '#4c9bfd',//刻度标签字体颜色
                fontSize: 12      //刻度标签字体大小
              }
            },
              axisLine: {
                 lineStyle: {
                  // 轴线颜色
                   color: "rgba(255,255,255,.2)"
                 } 
                
              },
            }
          ],
          yAxis: [
            {
              type: 'value',
            //不显示刻度线  
              axisTick: { show: false },
            //轴线颜色修改  
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          },
        },
        //修改刻度标签上(轴上)文本颜色和文字大小
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12,
          },
        },
        //修改y轴分割线颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          },
        },
            }
          ],
          //每一组代表一条数据
          //修改线条圆滑smooth,线条样式linrStyle
          //修改填充颜色areaStyle(渐变)，设置拐点形状symbol
          //修改拐点大小symbolSize,拐点颜色和边框itemStyle
          //开始不显示拐点,鼠标经过在显示showSymbol
          series: [
            { //第一条
              smooth: true,//修改线条圆滑 
              lineStyle: {//线条样式
                  color: '#0184d5',
                  width: 2,  
              },
              name: 'A',
              type: 'line',
              // stack: 'Total',
              areaStyle: {//修改填充颜色，直接复制
                
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                 //渐变色的起始颜色(线条样式的color转换成rgb修改透明度就可以)
                        color: "rgba(1, 132, 213, 0.4)",
                      },
                      {
                        offset: 0.8,
                        //渐变色的结束颜色
                        color: "rgba(1, 132, 213, 0.1)",
                      },
                    ],
                    false
                  ), 
                  shadowColor: "rgba(0, 0, 0, 0.1)"
            },
            symbol: 'circle',//设置拐点形状
            symbolSize: 8,//修改拐点大小
            itemStyle: {//拐点颜色和边框
                color: "#0184d5",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
            }, 
            showSymbol: false,
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            { //第二条
              smooth: true,//修改线条圆滑
              name: 'B',
              type: 'line',
              // stack: 'Total',
              //与第一条一样
              lineStyle: {//线条样式(颜色，粗细)
                color: '#00d887',
                width: 2,  
            },
              areaStyle: {//修改填充颜色，直接复制
                
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      //渐变色的起始颜色
                      color: "rgba(0, 216, 135, 0.4)",
                    },
                    {
                      offset: 0.8,
                      //渐变色的结束颜色
                      color: "rgba(0, 216, 135, 0.1)",
                    },
                  ],
                  false
                ), 
                shadowColor: "rgba(0, 0, 0, 0.1)"
          },
          symbol: 'circle',//设置拐点形状
          symbolSize: 5,//修改拐点大小
          itemStyle: {//拐点颜色和边框
              color: "#00d887",
              borderColor: "rgba(221, 220, 107, .1)",
              borderWidth: 12,
          }, 
          showSymbol: false,
              
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            { //第三条
              smooth: true,//修改线条圆滑
              name: 'C',
              type: 'line',
              // stack: 'Total',
              //与第一条一样
              lineStyle: {//线条样式(颜色，粗细)
                color: '#8B78F6',
                width: 2,  
            },
              areaStyle: {//修改填充颜色，直接复制
                
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      //渐变色的起始颜色
                      color: "rgba(139, 120, 246, 0.4)",
                    },
                    {
                      offset: 0.8,
                      //渐变色的结束颜色
                      color: "rgba(139, 120, 246, 0.1)",
                    },
                  ],
                  false
                ), 
                shadowColor: "rgba(0, 0, 0, 0.1)"
          },
          symbol: 'circle',//设置拐点形状
          symbolSize: 5,//修改拐点大小
          itemStyle: {//拐点颜色和边框
              color: "#8B78F6",
              borderColor: "rgba(139, 120, 246, .1)",
              borderWidth: 12,
          }, 
          showSymbol: false,
              
              data: [150, 232, 201, 154, 190, 330, 410]
            },
         
          ]
          
        };
        //5.配置给实例对象
        myChart.setOption(option);
        //6.图表大小跟随页面自适应
        window.addEventListener('resize',function(){
                myChart.resize();
       })  
})(); 
//**标准饼形图--放在左侧第三个盒子pie里的chart盒子里**
      (function(){
        //3.实例化对象(还是echarts.min.js)
        var myChart = echarts.init(document.querySelector('.pie .chart'));
        //4.修改配置和数据
       var option = {
          tooltip: {
            trigger: 'item',
            //提示信息显示格式
      //a-series里的name、b-series里data的name
      //c-series里data的value、d-自动计算出的饼形占比
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
      //修改图例组件位置在底部,居中显示
      //修改每个图标宽度高度itemWidth/itemHeight
      //修改图例组件文字颜色和大小    
          legend: {
            bottom: '0%',
            left: 'center',
            //修改每个图标宽度高度
            itemWidth: 10,
            itemHeight: 10,
          //修改图例组件文字颜色和大小 
            textStyle: {
              color: "rgba(255,255,255,.5)",
              fontSize: 12,
            },
          },
          //修改饼形图大小radius(内圆半径，外圆半径)
          //修改饼形图位置center，饼形图颜色
          series: [
            { 
             // 修改饼形图颜色
              color: [
                "#065aab",
                "#066eab",
                "#0682ab",
                "#0696ab",
                "#06a0ab",
                "#06b4ab",
                "#06c8ab",
                "#06dcab",
                "#06f0ab",
              ],
              name: 'series的名字',
              type: 'pie',
            //修改饼形图大小
              radius: ['40%', '60%'],
            //修改饼形图位置(水平，垂直)
              center: ['50%','45%'],  
              avoidLabelOverlap: false,
            //图形上的文字显示位置  
              label: {
                show: false,
                position: 'center'
              },
              //饼形图中间显示内容
              emphasis: {
                label: {
                  show: true,
                  fontSize: '10',
                  fontWeight: 'bold'
                }
              },
              //使图形上文字显示在图外且有线连接
              /* 1.label: {
                show: true,}, 
                2. labelLine: {
                show: true
              },*/
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: 'A' },
                { value: 735, name: 'B' },
                { value: 580, name: 'C' },
                { value: 484, name: 'D' },
                { value: 300, name: 'E' }
              ],
 
            }
          ]
        };
        //5.配置给实例对象
        myChart.setOption(option);
        //6.图表大小跟随页面自适应
        window.addEventListener('resize',function(){
            myChart.resize();
       })  
})();
//**玫瑰饼形图--放在右侧第三个盒子pie2里的chart盒子里** 
       (function(){
      //3.实例化对象(还是echarts.min.js)
      var myChart = echarts.init(document.querySelector('.pie2 .chart'));
      //4.修改配置和数据
      var option = {
        // title: {
        //   text: 'Nightingale Chart',
        //   subtext: 'Fake Data',
        //   left: 'center'
        // },
          //提示信息显示格式
      //a-series里的name、b-series里data的name
      //c-series里data的value、d-自动计算出的饼形占比
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
      //修改图例组件位置在底部,居中显示
      //修改每个图标宽度高度itemWidth/itemHeight
      //修改图例组件文字颜色和大小textStyle      
        legend: {
          left: 'center',
          bottom: '0%',
          //修改每个图标宽度高度
          itemWidth: 10,
          itemHeight: 10,
        //修改图例组件文字颜色和大小 
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: 12,
          } 
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
       // 修改饼形图颜色,大小(radius)
       //修改饼形图位置center:左，上
       //修改图形文字标签的字体大小label
       //修改连接图形和文字的线条长短labelLine
        series: [
          
          {// 修改饼形图颜色
            color: [
              "#006cff",
              "#60cda0",
              "#ed8884",
              "#ff9f7f",
              "#0096ff",
              "#9fe6b8",
              "#32c5e9",
              "#1d9dff",
            ],
           //修改图形文字标签的字体大小label
            label: {
              fontSize: 10
            },
           //修改连接图形和文字的线条(引导线)长短labelLine
           //labelLine（连接图形的线，连接文字的线）
            labelLine: {
              length: 6,
              length2: 8
            },
            name: 'series名字',
            type: 'pie',
            radius: ['10%', '70%'],
            center: ['50%', '50%'],
            //两种模式，半径(radius)模式和面积(area)模式
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5
            },
            data: [
              { value: 30, name: 'A' },
              { value: 28, name: 'B' },
              { value: 26, name: 'C' },
              { value: 24, name: 'D' },
              { value: 22, name: 'E' },
              { value: 20, name: 'F' },
              { value: 18, name: 'G' },
              { value: 16, name: 'H' }
            ]
          }
        ]
      };
       //5.配置给实例对象
       myChart.setOption(option);
       //6.图表大小跟随页面自适应
       window.addEventListener('resize',function(){
           myChart.resize();
      })  
})();  
//**时钟图 --放在中间第二个盒子map里的map1盒子里**
       (function(){
        //3.实例化对象(还是echarts.min.js)
        var myChart = echarts.init(document.querySelector('.map .map1'));
        //4.修改配置和数据
        /** 引用Cool_LYPMEN 模拟时钟修改汉字星期
 * 代码584-690为添加处
*/

option = { 
  tooltip: { 
      // formatter: "{a}：{c}"
      backgroundColor: '#fff',
      borderColor: '#f60',
      borderWidth: '1px',
      textStyle: {
          color: '#333'
      },
      formatter: function(param) {
          var time = Math.floor(param.value);
          if(param.seriesIndex === 0){
            return '<em style="color:' + param.color + ';">当前小时:' + time + '</em>' 
          }
          if(param.seriesIndex === 1){
            return '<em style="color:' + param.color + ';">当前星期:' + time + '</em>' 
          }
          if(param.seriesIndex === 2){
            return '<em style="color:' + param.color + ';">当前月份:' + time + '</em>' 
          }
          if(param.seriesIndex === 4){
            return '<em style="color:' + param.color + ';">当前小时:' + time + '</em>' 
          }
          if(param.seriesIndex === 5){
            return '<em style="color:' + param.color + ';">当前分钟:' + time + '</em>' 
          }
          if(param.seriesIndex === 6){
            return '<em style="color:' + param.color + ';">当前秒:' + time + '</em>' 
          }
      }
  },
  backgroundColor: "rgba(0,0,0,0.1)",
  /////////////////////////////////////////////////小表盘24小时
  series: [{ //小表盘24小时
      name: '小时',
      type: 'gauge',
      center: ['40%', '50%'], // 默认全局居中
      radius: '24%', //仪表盘半径
      min: 0,
      max: 24,
      startAngle: 90,
      endAngle: -269.9999,
      splitNumber: 24,
      animation: 0,
      pointer: { //仪表盘指针
          show: 1,
          length: '90%',
          width: 3
      },
      itemStyle: { //仪表盘指针样式
          normal: {
              color: '#00b0b0',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
          }
      },
      axisLine: { //仪表盘轴线样式 
          lineStyle: {
              color: [
                  [1, '#337ab7']
              ],
              width: 6
          }
      },
      splitLine: { //分割线样式 
          length: 6,
          lineStyle: {
              width: 1
          }
      },
      axisTick: { //仪表盘刻度样式
          show: 0,
          splitNumber: 5, //分隔线之间分割的刻度数
          length: 5, //刻度线长
          lineStyle: {
              color: ['#ffffff']
          }
      },
      axisLabel: { //刻度标签
          show: 1,
          distance: 2, //标签与刻度线的距离
          textStyle: {
              color: '#0000ff'
          },
          formatter: function(t) {
              switch (t + '') {
                  case '0':
                      return '';
                  case '1':
                      return '';
                  case '2':
                      return '';
                  case '3':
                      return '3';
                  case '4':
                      return '';
                  case '5':
                      return '';
                  case '6':
                      return '6';
                  case '7':
                      return '';
                  case '8':
                      return '';
                  case '9':
                      return '9';
                  case '10':
                      return '';
                  case '11':
                      return '';
                  case '12':
                      return '12';
                  case '13':
                      return '';
                  case '14':
                      return '';
                  case '15':
                      return '15';
                  case '16':
                      return '';
                  case '17':
                      return '';
                  case '18':
                      return '18';
                  case '19':
                      return '';
                  case '20':
                      return '';
                  case '21':
                      return '21';
                  case '22':
                      return '';
                  case '23':
                      return '';
                  case '24':
                      return '24';
              }
          }
      },
      title: { /////////////////////////////////////仪表盘标题
          show: 1,
          offsetCenter: ['200%', '-240%'],
          textStyle: {
              color: '#ffffff',
              fontSize: 15,
              fontWeight: 'bold'
          }
      },
      detail: { //仪表盘显示数据
          show: 0,
          formatter: '{value}',
          offsetCenter: [0, '60%']
      },
      data: [{
          name: '当前时间:\n'
      }]
  },{ ///////////////////////////////////////////////小表盘星期
      name: '星期',
      type: 'gauge',
      center: ['60%', '50%'], // 默认全局居中
      radius: '22%', //仪表盘半径
      min: 0,
      max: 7,
      startAngle: 90,
      endAngle: -269.9999,
      splitNumber: 7,
      animation: 0,
      pointer: { //仪表盘指针
          show: true,
          length: '80%',
          width: 3
      },
      itemStyle: { //仪表盘指针样式
          normal: {
              color: '#00b0b0',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
          }
      },
      axisLine: { //仪表盘轴线样式 
          lineStyle: {
              color: [
                  [0.07, 'rgba(139, 120, 246, 0.5)'],
                  [0.21, 'rgba(139, 120, 246, 0.5)'],
                  [0.35, 'rgba(139, 120, 246, 0.5)'],
                  [0.50, 'rgba(139, 120, 246, 0.5)'],
                  [0.64, 'rgba(139, 120, 246, 0.5)'],
                  [0.78, 'rgba(139, 120, 246, 0.5)'],
                  [0.93, 'rgba(139, 120, 246, 0.5)'],
                  [1, 'rgba(139, 120, 246, 0.5)']
              ],
              width: 18
          }
      },
      splitLine: { //分割线样式 
          show: 0,
          length: 18,
          lineStyle: {
              width: 1
          }
      },
      axisTick: {
          show: 0
      }, //仪表盘刻度样式
      axisLabel: { //刻度标签
          show: 1,
          distance: -15, //标签与刻度线的距离
          textStyle: {
              color: '#ffffff'
          },
          formatter: function(t) {
              return ''
              // switch (t + '') {
              //     case '0':
              //         return '7';
              //     case '1':
              //         return '1';
              //     case '2':
              //         return '2';
              //     case '3':
              //         return '3';
              //     case '4':
              //         return '4';
              //     case '5':
              //         return '5';
              //     case '6':
              //         return '6';
              //     case '0':
              //         return '{w0|星期日}';
              //     case '1':
              //         return '星期一';
              //     case '2':
              //         return '星期二';
              //     case '3':
              //         return '星期三';
              //     case '4':
              //         return '星期四';
              //     case '5':
              //         return '星期五';
              //     case '6':
              //         return '星期六';    //这里的汉字怎么随着这个圆的弧度显示而不是水平显示
              // }
          },
          // rich: {
          //     w0: {
          //         transtion: 'rotate(30deg)'
          //     }
          // }
      },
      title: {
          show: 0
      }, //仪表盘标题
      detail: {
          show: 0
      }, //仪表盘显示数据
      data: [{}],
      z: 0
  }, { ///////////////////////////////////////////////小表盘月
      name: '月份',
      type: 'gauge',
      center: ['50%', '72%'], // 默认全局居中
      radius: '22%', //仪表盘半径
      min: 0,
      max: 12,
      startAngle: 90,
      endAngle: -269.9999,
      splitNumber: 12,
      animation: 0,
      pointer: { //仪表盘指针
          show: 1,
          length: '90%',
          width: 3
      },
      itemStyle: { //仪表盘指针样式
          normal: {
              color: '#00b0b0',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
          }
      },
      axisLine: { //仪表盘轴线样式 
          lineStyle: {
              color: [
                  [1, '#337ab7']
              ],
              width: 6
          }
      },
      splitLine: { //分割线样式 
          show: 1,
          length: 6,
          lineStyle: {
              width: 1
          }
      },
      axisTick: {
          show: 0
      }, //仪表盘刻度样式
      axisLabel: { //刻度标签
          show: 1,
          distance: 1, //标签与刻度线的距离
          textStyle: {
              color: '#0000ff',
              fontFamily: '宋体',
             
          },
          formatter: function(t) {
              switch (t + '') {
                  case '2':
                      return '2';
                  case '4':
                      return '4';
                  case '6':
                      return '6';
                  case '8':
                      return '8';
                  case '10':
                      return '10';
                  case '12':
                      return '12';
              }
          }
      },
      detail: {
          show: 0
      }, //仪表盘显示数据
      data: [{}]
  }, { ///////////////////////////////////////////////小表盘日
      type: 'gauge',
      center: ['52%', '72%'], // 默认全局居中
      radius: '22%', //仪表盘半径
      animation: 0,
      pointer: {
          width: 0
      }, //仪表盘指针
      axisLine: { //仪表盘轴线样式 
          lineStyle: {
              show: 0,
              width: 0
          }
      },
      splitLine: {
          show: 0
      }, //分割线样式 
      axisTick: {
          show: 0
      }, //仪表盘刻度样式
      axisLabel: {
          show: 0
      }, //刻度标签
      detail: { //仪表盘显示数据
          show: 1,
          formatter: function(e) {
              if (e < 10)
                  e = '0' + e;
              return e;
          },
          offsetCenter: ['160%', 0],
          borderWidth: 2,
          borderColor: '#337ab7',
          backgroundColor: '#fff',
          height: 20,
          width: 28,
          textStyle: {
              color: '#f60',
              fontSize: 16,
              fontWeight: 'bold'
          },
      },
      data: [{}]
  }, { ///////////////////////////////////////////////大表盘时针
      name: '小时',
      type: 'gauge',
      radius: '90%', //仪表盘半径
      min: 0,
      max: 12,
      startAngle: 90,
      endAngle: -269.9999,
      splitNumber: 12,
      animation: 0,
      pointer: { //仪表盘指针
          length: '70%',
          width: 6
      },
      itemStyle: { //仪表盘指针样式
          normal: {
              color: '#109A39',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
          }
      },
      axisLine: { //仪表盘轴线样式 
          show: 0,
          lineStyle: {
              color: [
                  [1, '#337ab7']
              ],
              width: 10,
              shadowColor: 'rgba(0, 0, 0, 0.8)',
              shadowBlur: 12,
              shadowOffsetX: 3,
              shadowOffsetY: 3
          }
      },
      splitLine: { //分割线样式 
          length: 10,
          lineStyle: {
              width: 2
          }
      },
      axisTick: { //仪表盘刻度样式
          show: true,
          splitNumber: 5, //分隔线之间分割的刻度数
          length: 5, //刻度线长
          lineStyle: {
              color: ['#ffffff']
          }
      },
      axisLabel: {
          show: 0
      }, //刻度标签
      title: {
          show: 0
      }, //仪表盘标题
      detail: {
          show: 0
      }, //仪表盘显示数据
      data: [{}]
  }, { ///////////////////////////////////////////////大表盘分针
      name: '分钟',
      type: 'gauge',
      radius: '90%', //仪表盘半径
      min: 0,
      max: 60,
      startAngle: 90,
      endAngle: -269.9999,
      splitNumber: 12,
      animation: 0,
      pointer: { //仪表盘指针
          length: '85%',
          width: 6
      },
      itemStyle: { //仪表盘指针样式
          normal: {
              color: '#ca8622',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
          }
      },
      axisLine: { //仪表盘轴线样式 
          show: 0,
          lineStyle: {
              width: 0
          }
      },
      splitLine: { //分割线样式 
          length: 10,
          lineStyle: {
              width: 2
          }
      },
      axisTick: { //仪表盘刻度样式
          show: true,
          splitNumber: 5, //分隔线之间分割的刻度数
          length: 5, //刻度线长
          lineStyle: {
              color: ['#ffffff']
          }
      },
      axisLabel: {
          show: 0
      }, //刻度标签
      title: {
          show: 0
      }, //仪表盘标题
      detail: {
          show: 0
      }, //仪表盘显示数据
      data: [{}]
  }, { ///////////////////////////////////////////////大表盘秒针
      name: '秒',
      type: 'gauge',
      radius: '90%', //仪表盘半径
      min: 0,
      max: 60,
      startAngle: 90,
      endAngle: -269.9999,
      splitNumber: 12,
      animation: 0,
      pointer: { //仪表盘指针
          show: true,
          length: '95%',
          width: 4
      },
      itemStyle: { //仪表盘指针样式
          normal: {
              color: '#00b0b0',
              shadowColor: 'rgba(0, 0, 0, 0.8)',
              shadowBlur: 10,
              shadowOffsetX: 4,
              shadowOffsetY: 4
          }
      },
      axisLine: { //仪表盘轴线样式 
          lineStyle: {
              color: [
                  [1, '#337ab7']
              ],
              width: 10
          }
      },
      splitLine: { //分割线样式 
          length: 10,
          lineStyle: {
              width: 2
          }
      },
      axisTick: { //仪表盘刻度样式
          show: 1,
          splitNumber: 5, //分隔线之间分割的刻度数
          length: 5, //刻度线长
          lineStyle: {
              color: ['#fff']
          }
      },
      axisLabel: { //刻度标签
          show: 1,
          distance: 6, //标签与刻度线的距离
          textStyle: {
              fontWeight: 'bold',
              fontSize: 16
          },
          formatter: function(t) {
              switch (t + '') {
                  case '0':
                      return '';
                  case '5':
                      return '1';
                  case '10':
                      return '2';
                  case '15':
                      return '3';
                  case '20':
                      return '4';
                  case '25':
                      return '5';
                  case '30':
                      return '6';
                  case '35':
                      return '7';
                  case '40':
                      return '8';
                  case '45':
                      return '9';
                  case '50':
                      return '10';
                  case '55':
                      return '11';
                  case '60':
                      return '12';
              }
          }
      },
      title: {
          show: 0,
         
      }, //仪表盘标题
      detail: { //仪表盘显示数据
          show: 0,
          formatter: '{value}',
          offsetCenter: [0, '60%']
      },
      data: [{}]
  },
  { //////// 汉字星期标注
      name: '汉字星期',
      type: 'pie',
      hoverAnimation: false,
      center: ['60%', '50%'],
      radius: ['15%', '22.5%'],
      startAngle: 64.28,
      label: {
          normal: {
              show: false,
              position: 'inside'
          }
      },
      labelLine: {
          normal: {
              show: false
          }
      },
      markPoint: {
          symbolSize: 1,
          label: {
              normal: {
                  show: true,
                  formatter: function(t){
                      return t.name
                  }
              }
          },
          data: [
              {
                  name: 'sun',
                  x: '60%',
                  y: '41%'
              },
              {
                  name: 'mon',
                  x: '63%',
                  y: '44.5%',
                  label: {
                      normal: {
                          rotate: -51.42
                      }
                  }
              },
              {
                  name: 'tue',
                  x: '63.7%',
                  y: '52%',
                  label: {
                      normal: {
                          rotate: -102.84
                      }
                  }
              },
              {
                  name: 'wed',
                  x: '61.7%',
                  y: '58.5%',
                  label: {
                      normal: {
                          rotate: -154.28
                      }
                  }
              },
              {
                  name: 'thu',
                  x: '58%',
                  y: '58.5%',
                  label: {
                      normal: {
                          rotate: -205.7
                      }
                  }
              },
              {
                  name: 'fri',
                  x: '56%',
                  y: '52%',
                  label: {
                      normal: {
                          rotate: -257.12
                      }
                  }
              },
              {
                  name: 'sat',
                  x: '57%',
                  y: '44.2%',
                  label: {
                      normal: {
                          rotate: 51.46
                      }
                  }
              }
          ]
      },
      data: [
          {name: '星期日', value: 1},
          {name: '星期一', value: 1},
          {name: '星期二', value: 1},
          {name: '星期三', value: 1},
          {name: '星期四', value: 1},
          {name: '星期五', value: 1},
          {name: '星期六', value: 1},
      ],
      z: 1
  }
  ]
};
// myChart.setOption(option);
clearInterval(timeTicket);
var timeTicket = setInterval(function() {
  var datetime = new Date();
  var year = datetime.getFullYear();
  var month = datetime.getMonth() + 1;
  var date = datetime.getDate();
  var h = datetime.getHours();
  var m = datetime.getMinutes();
  var s = datetime.getSeconds();
  var week = datetime.getDay();
  var ms = datetime.getMilliseconds();
  var minutes = m + s / 60;
  var hours_24 = h + m / 60;
  var hours_12;
  if (hours_24 > 12){
      hours_12 = hours_24 - 12;
  }
  else{
      hours_12 = hours_24;
  }
  var seconds = s + ms / 1000;
  var cur_mon = new Date(year, month, 0);
  var cur_mon_count = cur_mon.getDate(); //当前月份总天数
  var month = month + date / cur_mon_count;
  if (month > 12){
      month = month - 12;
  }
  var strmonth = datetime.getMonth() + 1;    
  var str = year + "-" + checktime(strmonth) + "-" + checktime(date) + " "+ checktime(h) + ":" + checktime(m) + ":" + checktime(s); 
  option.series[0].data[0].name = '当前时间:\n' + str;
  option.series[0].data[0].value = (hours_24).toFixed(2);
  option.series[1].data[0].value = (week).toFixed(0);
  option.series[2].data[0].value = (month).toFixed(2);
  option.series[3].data[0].value = (date).toFixed(0);
  option.series[4].data[0].value = (hours_12).toFixed(2);
  option.series[5].data[0].value = (minutes).toFixed(2);
  option.series[6].data[0].value = (seconds).toFixed(2);
  myChart.setOption(option, true);
}, 100);
function checktime(str){
  if(str < 10){
      return '0' + str;
  }
return str;
}

        //5.配置给实例对象
       myChart.setOption(option);
       //6.图表大小跟随页面自适应
       window.addEventListener('resize',function(){
           myChart.resize();
      })  
})();
//**倒计时图--放在中间第二个盒子map里的map2盒子里**
   
       (function(){
         //时间获取
        var t = null;
        t = setTimeout(time, 1000); //開始运行
        function time() {
          clearTimeout(t); //清除定时器
          dt = new Date();
          var y = dt.getFullYear();
          var mt = dt.getMonth() + 1;//当前月
          var mt1= 12-mt;
          var day = dt.getDate();
          var day1=25-day;
          var h =  dt.getHours(); //获取时
          var h1 = 8-h
          var m = dt.getMinutes(); //获取分
          var m1 =30 -m
          var s = dt.getSeconds(); //获取秒
          // // //获取某年某月的天数//2024，2--29
          function mGetDate(year,month){
             var d = new Date(year,month,0);
             return d.getDate();
          };
          // 获取当前月到12月(考研月)的天数//错的
          //  function countdown_day(){
        
//////////////////////////倒计时天数            
            var mt2= 12-mt+1;//第二部分的起始月
            var day_count=0;//倒计时总天数
              
              var a=mt;//a用来算某月的天数的第二个参数
              var totalDay1 = mGetDate(y,a);
              var day28=0;
              var day29=0;
              var day30=0;
              var day31=0;
              var a1= totalDay1-day;//第一部分,起始月剩余的天数
              while(mt2<12){
              var totalDay = mGetDate(y,mt2);
               if(totalDay==28)
               day28++;
               else if(totalDay==29)
               day29++;
               else if(totalDay==30)
               day30++;
               else if(totalDay==31)
               day31++;
              mt2++;
            }
            //第二部分天数
            var a2=(day28*28)+(day29*29)+(day30*30)+(day31*31)
            var a3=25;//第三部分(考研12月中的天数)
             
          // var totalDay = mGetDate(2022,6);获取2022年6月的天数
         day_count=a1+a2+a3;//倒计时总天数
/////////////////倒计时周数
          var week_count=0;//倒计时周
          var week_count1=0;//倒计时周余的天数
          week_count=Math.trunc(day_count/7);
          week_count1=day_count%7;
          document.querySelector(".map .countdown1").innerHTML =
          
         "距离" +
            y +
            "年" + "考研还有" +
            mt1 +
            "月" + 
            day1 + "天" +
            "-" +
            h1 +
            "小时" +
            m1 +
            "分" +
            s +
            "秒" ;
            document.querySelector(".map .countdown3").innerHTML =
          
         "距离" +
            y +
            "年" + "考研还有" +
            week_count +
            "周" + 
            week_count1 + "天" +
            "----" +"共计"+
            day_count +
            "天" ;
          
        //3.实例化对象(还是echarts.min.js)
        var myChart = echarts.init(document.querySelector('.map .countdown2'));
        //4.修改配置和数据
        let angle = 0; //角度，用来做简单的动画效果的
        var value = day_count ;
        var timerId;
        var option = {
          backgroundColor: "",
          title: {
            text: "{a|" + value + "}{c|天}",
            x: "center",
            y: "center",
            textStyle: {
              rich: {
                a: {
                  fontSize: 35,
                  color: "#29EEF3",
                },
        
                c: {
                  fontSize: 30,
                  color: "#29EEF3",
                  // padding: [5,0]
                },
              },
            },
          },
        
          series: [
            // 紫色
            {
              name: "ring5",
              type: "custom",
              coordinateSystem: "none",
              renderItem: function (params, api) {
                return {
                  type: "arc",
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                    startAngle: ((0 + angle) * Math.PI) / 180,
                    endAngle: ((90 + angle) * Math.PI) / 180,
                  },
                  style: {
                    stroke: "#8383FA",
                    fill: "transparent",
                    lineWidth: 1.5,
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            {
              name: "ring5", //紫点
              type: "custom",
              coordinateSystem: "none",
              renderItem: function (params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
                let point = getCirlPoint(x0, y0, r, 90 + angle);
                return {
                  type: "circle",
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4,
                  },
                  style: {
                    stroke: "#8450F9", //绿
                    fill: "#8450F9",
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            // 蓝色
        
            {
              name: "ring5",
              type: "custom",
              coordinateSystem: "none",
              renderItem: function (params, api) {
                return {
                  type: "arc",
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                    startAngle: ((180 + angle) * Math.PI) / 180,
                    endAngle: ((270 + angle) * Math.PI) / 180,
                  },
                  style: {
                    stroke: "#4386FA",
                    fill: "transparent",
                    lineWidth: 1.5,
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            {
              name: "ring5", // 蓝色
              type: "custom",
              coordinateSystem: "none",
              renderItem: function (params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
                let point = getCirlPoint(x0, y0, r, 180 + angle);
                return {
                  type: "circle",
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4,
                  },
                  style: {
                    stroke: "#4386FA", //绿
                    fill: "#4386FA",
                  },
                  silent: true,
                };
              },
              data: [0],
            },
        
            {
              name: "ring5",
              type: "custom",
              coordinateSystem: "none",
              renderItem: function (params, api) {
                return {
                  type: "arc",
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                    startAngle: ((270 + -angle) * Math.PI) / 180,
                    endAngle: ((40 + -angle) * Math.PI) / 180,
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5,
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            // 橘色
        
            {
              name: "ring5",
              type: "custom",
              coordinateSystem: "none",
              renderItem: function (params, api) {
                return {
                  type: "arc",
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                    startAngle: ((90 + -angle) * Math.PI) / 180,
                    endAngle: ((220 + -angle) * Math.PI) / 180,
                  },
                  style: {
                    stroke: "#FF8E89",
                    fill: "transparent",
                    lineWidth: 1.5,
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            {
              name: "ring5",
              type: "custom",
              coordinateSystem: "none",
              renderItem: function (params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
                let point = getCirlPoint(x0, y0, r, 90 + -angle);
                return {
                  type: "circle",
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4,
                  },
                  style: {
                    stroke: "#FF8E89", //粉
                    fill: "#FF8E89",
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            {
              name: "ring5", //绿点
              type: "custom",
              coordinateSystem: "none",
              renderItem: function (params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
                let point = getCirlPoint(x0, y0, r, 270 + -angle);
                return {
                  type: "circle",
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4,
                  },
                  style: {
                    stroke: "#0CD3DB", //绿
                    fill: "#0CD3DB",
                  },
                  silent: true,
                };
              },
              data: [0],
            },
            {
              name: "吃猪肉频率",
              type: "pie",
              radius: ["52%", "40%"],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: "center",
                },
              },
              data: [
                {
                  value: value,
                  name: "",
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: "#A098FC", // 0% 处的颜色
                          },
                          {
                            offset: 0.3,
                            color: "#4386FA", // 0% 处的颜色
                          },
                          {
                            offset: 0.6,
                            color: "#4FADFD", // 0% 处的颜色
                          },
                          {
                            offset: 0.8,
                            color: "#0CD3DB", // 100% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#646CF9", // 100% 处的颜色
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  value: 100 - value,
                  name: "",
                  label: {
                    normal: {
                      show: false,
                    },
                  },
                  itemStyle: {
                    normal: {
                      color: "#173164",
                    },
                  },
                },
              ],
            },
            {
              name: "吃猪肉频率",
              type: "pie",
              radius: ["32%", "35%"],
              silent: true,
              clockwise: true,
              startAngle: 270,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: "center",
                },
              },
              data: [
                {
                  value: value,
                  name: "",
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: "#00EDF3", // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#646CF9", // 100% 处的颜色
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  value: 100 - value,
                  name: "",
                  label: {
                    normal: {
                      show: false,
                    },
                  },
                  itemStyle: {
                    normal: {
                      color: "#173164",
                    },
                  },
                },
              ],
            },
          ],
        };
        
        //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
        function getCirlPoint(x0, y0, r, angle) {
          let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
          let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
          return {
            x: x1,
            y: y1,
          };
        }
        
        function draw() {
          angle = angle + 3;
          myChart.setOption(option, true);
          //6.图表大小跟随页面自适应
        window.addEventListener('resize',function(){
                myChart.resize();
        })
          //window.requestAnimationFrame(draw);
        }
        if (timerId) {
          clearInterval(timerId);
        }
        timerId = setInterval(function () {
          //用setInterval做动画感觉有问题
          draw();
        }, 100);
        
        //5.配置给实例对象
        myChart.setOption(option);
/////////////这句是时间循环结束，所以写到最后        
        t = setTimeout(time, 1000); //设定定时器，循环运行
        }
        //6.图表大小跟随页面自适应
        window.addEventListener('resize',function(){
                myChart.resize();
       })  
})();
