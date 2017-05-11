 // 初始化echarts实例
var radarChart = echarts.init(document.getElementById('radarChart'));
 // 配置项和数据
radarOption = {
    
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
        ]
    },
    series: [{
        name: '掌握技能',
        type: 'radar',
        data : [
            {
                value : [80, 79, 78, 72, 72, 70],
                name : '技能'
            }
        ]
    }]
};
 // 使用配置项和数据显示图表。
radarChart.setOption(radarOption);