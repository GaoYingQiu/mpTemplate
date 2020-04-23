<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBar',
  props: {
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null,
      mapData: null,
    }
  },
  methods: {
	
    initial: function (dataObj) {

       this.mapData = dataObj;
       this.layoutChartBar();
    },
    layoutChartBar:function(){
	  // let autoBarHeight = Object.keys(this.mapData).length * 80 + 50;
	 
      this.$nextTick(() => {
        let xAxisData = Object.keys(this.mapData)
        let seriesData = Object.values(this.mapData)
        let option = {
          title: {
            text: this.text,
            subtext: this.subtext,
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter:function(datas) {
              let valueStr = datas.value.toFixed(2);
              if(valueStr.indexOf(".00") > 0){
                valueStr = valueStr.replace(".00","");
              }
              return datas.name +": "+ valueStr +"元";
            }
          },
          grid: {
                  left: '3%',
                  right: '9%',
                  bottom: '3%',
                  containLabel: true
          },
          xAxis: {
            type: 'value',
			splitLine: {
				show: true,
			   lineStyle:{
			       color: ['#f7f7f7'],
			       width: 1,
			       type: 'solid',
			   }
			}
          },
          yAxis: {
            type: 'category',
            data: xAxisData,
            scale: true,
            axisLabel: {
              margin: 2,
              interval: 0,
              formatter: function(value) {
                  if (value.length > 6) {
                    return value.substring(0, 6) + "...";
                  } else {
                    return value;
                  }
              }
            },
			 splitLine: {
				show: true,
			    lineStyle:{
		            color: ['#f7f7f7'],
		            width: 1,
		            type: 'solid',
			    }
			 }
          },
          series: [{
            data: seriesData,
            type: 'bar',
			barWidth:13,
			itemStyle:{
			  normal:{
			     label:{
			       show:true ,
			       position:'right',
			       textStyle:{
			          color:'gray',
			          fontSize:12
			       },
			       formatter:function(datas) {
			         let valueStr = datas.value.toFixed(2);
			         if(valueStr.indexOf(".00") > 0){
			           valueStr = valueStr.replace(".00","");
			         }
			         return  valueStr;
			       }
			     }
			  }
			}
          }]
        }
        this.dom = echarts.init(this.$refs.dom, 'tdTheme');
        this.dom.setOption(option);
      })
	  // this.dom.resize({height:autoBarHeight});
    }
  },
  mounted () {

  },
  beforeDestroy () {
 
  }
}
</script>
