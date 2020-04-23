<template>
  <div ref="dom" class="charts chart-map"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
// import { on, off } from '@/utils/tools'
import 'echarts/map/js/china.js';
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartMap',
  props: {
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null,
      listData:[]
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    initial: function (list) {

       this.listData = list;
       this.layoutPieData();
    },
    layoutPieData:function(){

        this.$nextTick(() => {
          let option = {
            title: {
              text: this.text,
              subtext: this.subtext,
              x: 'center'
            },

            tooltip: {
                    formatter:function(params,ticket, callback){

                      let valueStr = "0";
                      if (!isNaN(params.value)) {
                        valueStr = params.value.toFixed(2);
                        if(valueStr.indexOf(".00") > 0){
                          valueStr = valueStr.replace(".00","");
                        }
                      }

                        return params.seriesName+'<br />'+params.name+'：'+valueStr +"元"
                    }
            },
            visualMap: {
                min: 0,
                max: 1500,
                left: 'left',
                top: 'bottom',
                text: ['高','低'],
                inRange: {
                    color: ['#e0ffff', '#006edd']
                },
                show:false
            },
            geo: {
                map: 'china',
                roam: false,
                zoom:1.23,
                label: {
                    normal: {
                        show: true,
                        fontSize:'10',
                        color: 'rgba(0,0,0,0.7)'
                    }
                },
                itemStyle: {
                    normal:{
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    emphasis:{
                        areaColor: '#F3B329',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            series : [
                {
                    name: '订单总金额',
                    type: 'map',
                    geoIndex: 0,
                    data:this.listData
                }
            ],
          };
          this.dom = echarts.init(this.$refs.dom, 'tdTheme');
          this.dom.setOption(option);
          // on(window, 'resize', this.resize);
        })
    }
  },
  mounted () {
  
    // this.initial([]);
  },

  beforeDestroy () {
    // off(window, 'resize', this.resize)
  }
}
</script>
