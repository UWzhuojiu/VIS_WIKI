let data = null;
let data_file = "../data/newpoints_all_processed.json";

let datax = []
let datay = []
d3.json(data_file).then(function (DATA) {
    data = DATA;
    for (var i = 0; i < data.length; i++ )
    {
        if (data[i] == []) {
            continue;
        };
        for (var j = 0; j < data[i].length; j++) { 
            var point = []
            point.push(data[i][j][1])
            point.push(data[i][j][4])
            point.push(data[i][j][5])
            point.push(data[i][j][0])
            point.push(data[i][j][6])
            datax.push(point)
        };
    }

    var dom = document.getElementById("left_panel");
    matrixChart = echarts.init(dom);
    var myChart = matrixChart;
    var app = {};

    var COLOR_ALL = [
        '#FF474A',
        '#6AF07A'
      ];

    var option;
    option = {
        tooltip: {
                trigger: 'item',
                formatter: function (datas) {
                    var res = '编辑者: ' + datas.data[4]+ '<br/>';
                    res += '编辑时间:  ' + datas.data[0] + '<br/>'
                    res += '版本号:  ' + datas.data[3] + '<br/>'
                    return res
                },
                axisPointer: {
                    show: true,
                    type: 'cross',
                    lineStyle: {
                        type: 'dashed',
                        width: 1
                    }
                }
        },
        dataZoom: [
            {
                type: 'inside'
            },
            {
                show: false,
                type: 'slider',
                showDataShadow:false,
                filterMode:'empty'
            }
        ],
        xAxis: {
            type: "time",
            scale: true,
            axisLabel: {
                formatter: '{yyyy}-{MM}-{dd} {hh}:{mm}' ,
                hideOverlap: true
            },
        },
        // yAxis: {
        //     type: "value",
        //     scale: true,
        //     // axisLabel: {
        //     //     formatter: '{yyyy}-{MM}-{dd}' ,
        //     //     hideOverlap: true
        //     // },
        // },
        yAxis: {
            "show" : false,
            // data: [1000,3000,7000,7050,8000],
            axisLabel:{
                formatter: function (value) {
                    var texts = [];
                    if(value==1000){
                    texts.push('woo');
                    }
                    else{
                    texts.push('2');
                    }
                    return texts;
                }
            }
        },
        brush: {
            removeOnClick :true,
            // throttleType: 'debounce',
            // throttleDelay: Numeric = 10000,
            brushLink: 'all',
            inBrush: {
                // opacity: 1
            }
        },
        series: [
            {
                name:'matrix',
                data: datax,
                type: 'scatter',
                // large: true,
                symbolSize: 5,
                symbol: 'circle',
                emphasis:{
                    itemStyle:{
                        // color:"#f1c40f",
                        shadowColor: 'rgba(0, 0, 0, 0.8)',
                        // shadowBlur: 10,
                        // borderColor:"#f1c40f",
                        borderWidth:3,
                        opacity:1
                    },
                    focus:'item',
                    blurScope:'global'
                },
                itemStyle: {
                    color: function (d) {
                        if (d.data[2] == 1) return '#FF474A';
                        else return '#6AF07A';
                    },
                    opacity: 0.5
                },
                blur:{
                    itemStyle:{
                        color:'rgb(0,0,0,0.3)'
                    }
                },
                markLine: {
                    symbol: ['none', 'none'],//去掉箭头
                    silent: true,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                // type: 'solid',
                                color:'black'
                            }
                        },
                        label: {
                            show: true,
                            formatter:'123'
                        }
                    },
                    data: [{
                            name: '-20%',
                            yAxis: 3979
                    },
                    {
                            name: '-10%',
                            yAxis: 3468
                    },
                    {
                            name: '0%',
                            yAxis: 3010
                    },
                    {
                            name: '10%',
                            yAxis: 2596
                    },
                    {
                            name: '20%',
                            yAxis: 2218
                    },
                    {
                            name: '30%',
                            yAxis: 1871
                    },
                    {
                            name: '40%',
                            yAxis: 1549
                    },
                    {
                            name: '50%',
                            yAxis: 1249
                    },
                    {
                            name: '60%',
                            yAxis: 0969
                    },
                    ]
                }
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
        myChart.on('datazoom', function(params){
            
        })
        myChart.on('brushSelected', function (params) {
            var brushComponent = params.batch[0];
        
            var minVersion = 1e8;
            var maxVersion = -1e8;
            var minSentence = 1e8;
            var maxSentence = -1e8;
            var startDate = "";
            var endDate = "";
            var times = 0;
        
            for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
                // 对于每个 series：
                var dataIndices = brushComponent.selected[sIdx].dataIndex;
        
                for (var i = 0; i < dataIndices.length; i++) {
                    times++;
                    var dataIndex = dataIndices[i];
                    if (minVersion > datax[dataIndex][3]){
                        minVersion = datax[dataIndex][3];
                        endDate = datax[dataIndex][0]
                    }
                    if (maxVersion < datax[dataIndex][3]){
                        maxVersion = datax[dataIndex][3];
                        startDate = datax[dataIndex][0]
                    } 
                    if (minSentence > datax[dataIndex][1]) minSentence = datax[dataIndex][1];
                    if (maxSentence < datax[dataIndex][1]) maxSentence = datax[dataIndex][1];
                }
            }
            if (times == 0){
                var getlength = datax.length;
                for (var i = 0; i < getlength; i++) {
                    times++;
                    if (minVersion > datax[i][3]){
                        minVersion = datax[i][3];
                        startDate = datax[i][0]
                    }
                    if (maxVersion < datax[i][3]){
                        maxVersion = datax[i][3];
                        endDate = datax[i][0]
                    } 
                    if (minSentence > datax[i][1]) minSentence = datax[i][1];
                    if (maxSentence < datax[i][1]) maxSentence = datax[i][1];
                }
            }
            console.log("brush res");
            console.log(minVersion);
            console.log(maxVersion);
            console.log(minSentence);
            console.log(maxSentence);
            update_and_renew(startDate, endDate, undefined, String(times));
            nGenerateDataFromRange(minVersion, maxVersion, minSentence, maxSentence).then(graph=>{
                networkChart.setOption({
                    series:[
                        {
                            data:graph.nodes,
                            links:graph.edges
                        }
                    ]
                })

            });
        });
    }
});

function mFindVersionFromAuthor(authorList){
    return new Promise((resolve, reject)=>{
        mFindVersionFromAuthorAsync(authorList, data=>{resolve(data)})
    })
}

function mFindVersionFromAuthorAsync(authorList, resolve){
    // sample
    // console.log('find');
    focus_list = []
    var getlength = datax.length;
    for (var i = 0; i < getlength; i++) {
        if (authorList.indexOf(datax[i][4]) > -1){
            console.log("find it")
            // should highlight
            focus_list.push(i)
        }
    }
    resolve(focus_list);//[1001,1002,1003,1004,1005,1006,1007,1008];
}
