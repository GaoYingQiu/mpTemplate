<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
// import { on, off } from '@/utils/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartPie',
  props: {
    // listData: Array,
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

      // var arr = [{ value: 335, name: '直接访问1' },
      // { value: 310, name: '邮件营销1' },
      // { value: 234, name: '联盟广告1' },
      // { value: 135, name: '视频广告1' },
      // { value: 1548, name: '搜索引擎1' }];

       this.listData = list;
       this.layoutPieData();
    },
    layoutPieData:function(){

        this.$nextTick(() => {
          let legend = this.listData.map(_ => _.name)
          let option = {
            title: {
              text: this.text,
              subtext: this.subtext,
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} :{c} (占比{d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: legend
            },
            series: [
              {
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                  label: {
                          show: true,
                          fontSize: '28',
                          fontWeight: 'normal'
                      }
                },
                type: 'pie',
                // radius: '55%',
                radius: ['50%', '70%'],
                // center: ['50%', '60%'],
                data: this.listData,
                labelLine:{
                  show:false
                },
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
          this.dom = echarts.init(this.$refs.dom, 'tdTheme')
          this.dom.setOption(option)
          // on(window, 'resize', this.resize)
        })
    }
  },
  mounted () {

  },

  beforeDestroy () {
    // off(window, 'resize', this.resize)
  }
}
</script>
