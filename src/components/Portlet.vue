<template>
  <div ref="portlet" >
    <!-- {{ config }} -->
    <!-- Portlet rect: {{ portletRect }}, type: {{ type }},
    series: {{ series }}, <br/>
    chartConfig {{ chartConfig }}, <br/>
    orientation: {{ orientation }},<br/>
    chartRect: {{ d3sel }}, minHeight: {{ minHeight }}, innerHeight: {{ innerHeight }}, chartContainer: {{ chartContainer }} -->
      <div ref="chart" ></div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import roiCharts from '@/components/roi-charts'
  export default {
    props: {
      type: {
        type: String,
        default: 'barChart'
      },
      series: {
        type: Array
      },
      height: {
        type: String | Number,
        default: 100
      },
      width: {
        type: String | Number,
        default: 200
      },
      minHeight: {
        type: String,
        default: '90'
      },
      config: {
        type: Object
        // default: {}
      }
    },
    watch: {
      height: function (newheight, oldheight) {
        this.$refs.portlet.style = `height: ${newheight}px; width: ${this.width}px;`
        this.$refs.chart.style = `height: ${newheight}px; width: ${this.width}px;`
        console.log('height watcher', `height: ${newheight}px; width: ${this.width}px;`, newheight, oldheight, this.$refs.portlet)
        this.divSize.y = newheight
        this.renderChart()
        // this.onResize()
      },
      width: function (newwidth, oldwidth) {
        this.$refs.portlet.style = `width: ${newwidth}px; height: ${this.height}px;`
        this.$refs.chart.style = `width: ${newwidth}px; height: ${this.height}px;`
        console.log('width watcher', `width: ${newwidth}px; height: ${this.height}px;`, newwidth, oldwidth, this.$refs.portlet)
        this.divSize.x = newwidth
        this.renderChart()
        // this.onResize()
      }
    },
    name: 'portlet',
    data: () => ({
      divSize: {
        x: 0,
        y: 0
      },
      innerHeight: 100,
      portletRect: {},
      d3sel: {},
      portletConfig: ['categoriesKey', 'valuesKey', 'categoriesLabel', 'valuesLabel', 'orientation'],
      chartContainer: null,
      chartConfig:
        {
          // barChart properties
          categoriesKey: 'month',
          valuesKey: 'temp',
          categoriesLabel: 'Month',
          valuesLabel: 'Fahrenheit',
          orientation: 'vertical',
          barWidth: 50,
          mainDataColor: 'grey',
          forecastStart: 'June',
          forecastOpacity: 34,
          insetBarsColor: 'black',
          insetBarWidth: 75,
          dataLabelsOverBars: true,
          dataLabelsMargin: 6,
          dataLabelsSize: 12,
          dataOuterPadding: 20,
          // dotChart properties
          dotMaxDiameter: 10,
          // bulletChart properties
          bulletBarWidth: 12,
          bulletBarsColor: 'maroon',
        },
    }),

    computed: {
      // width: () => (window.innerWidth * 0.8),
      // height: () => (window.innerHeight * 0.5)
    },

    created: function () {
    },

    mounted () {
      console.log('***** mounted roi-chart component ******', this.$refs, this.series)
      this.chartContainer = this.$refs.chart
      this.chartContainer.style = 'height:' + (window.innerHeight * this.minHeight / 100) + 'px;'
      this.portletRect = this.$refs.portlet.getBoundingClientRect()
      this.d3sel = this.chartContainer.getBoundingClientRect()

      console.log('***rect of chartContainer', this.d3sel)
      // this.onResize()
      // this.divSize = { x: window.innerWidth, y: window.innerHeight }
      // this.renderChart()
      // let bulletChartContainer = document.querySelector('#bullet-chart');
    },
    methods: {
      renderChart: function () {
        if (this.config) {
          for (var cf in this.config) {
            // console.log('copy conf', cf, this.portletConfig.some((e => e === cf)))
            if (this.portletConfig.some(e => e === cf) && this.config.hasOwnProperty(cf)) {
              this.chartConfig[cf] = this.config[cf]
              // console.log('copy config', cf, this.config[cf], this.chartConfig[cf])
            }
          }
        }
        this.chartConfig['width'] = this.divSize.x // total chart width
        this.chartConfig['height'] = this.divSize.y // total chart height
        this.chartConfig['container'] = this.$refs.chart
        // console.log('renderChart', this.series)
        // if (Array.isArray(this.series)) {
        //   if (!this.series[0].data || !Array.isArray(this.series[0].data)) {
        //     this.chartConfig['data'] = this.series // simple single series
        //   } else {
        //     for (var i = 0; i < this.series.length; i++) {
        //       let stype = this.series[i].type || 'default'
        //       console.log('Series of type', stype)
        //       switch (stype) {
        //         case 'default':
        //           this.chartConfig['data'] = this.series[i].data
        //           break
        //         case 'inset':
        //           this.chartConfig['insetData'] = this.series[i].data
        //           break
        //         case 'bullet':
        //           this.chartConfig['bulletData'] = this.series[i].data
        //           break
        //         default:
        //           console.log('Portlet: Unknown series type:', stype)
        //       }
        //       console.log('renderChart config', this.chartConfig)
        //     }
        //   }
        // } else {
        //   console.log('Portlet: Series must be array or array of series. got', typeof this.series, this.series)
        //   return
        // }
        // this.chartConfig['orientation'] = this.orientation
        console.log('chartConfig', this.chartConfig)
        console.log('series', this.series)
        this.chartConfig['series'] = this.series
        return roiCharts.chart(this.chartConfig)
        // switch (this.type) {
        //   case 'barChart':
        //
        //   case 'dotChart':
        //     return roiCharts.chart(this.chartConfig)
        //   case 'bulletChart':
        //     return roiCharts.chart(this.chartConfig)
        //   default:
        //   console.log('Portlet: unknown charttype:', this.type)
        // }
      },
      onChartResize () {
        console.log('onChartResize', this.$refs.chart.clientWidth, this.$refs.chart.clientHeight)
      },
      onResize () {

        ///// TODO: fix resizing window
        this.innerHeight = window.innerHeight
        this.$refs.chart.style = 'height:' + (window.innerHeight * this.minHeight / 100) + 'px'
        this.divSize = { x: this.$refs.chart.clientWidth, y: this.$refs.chart.clientHeight }
        this.portletRect = this.$refs.portlet.getBoundingClientRect()
        this.onChartResize()
        this.renderChart()

        console.log("refs resize", this.$refs)
        console.log("Portlet div resize", this.type, this.divSize.x, this.divSize.y)
        console.log("Portlet boundaries", this.portletRect)
        // this.svgwidth = this.divSize.x * 0.8
        // this.svgheight = this.divSize.y * 0.5
        // if (this.initialx !== 0) this.scalex = this.svgwidth / this.initialx
        // if (this.initialy !== 0) this.scaley = this.svgheight / this.initialy
        // let scale = Math.min(this.scalex, this.scaley)
        // this.transform = 'translate(' + this.svgwidth / 2 + ',' + this.svgheight / 2 + ') ' +
        //   'scale(' + scale + ', ' + scale + ')'
        // if (this.g) this.g.attr('transform', this.transform)
      }
    }
  }
</script>

<style scoped>

</style>
