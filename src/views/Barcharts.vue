<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6>
      <portlet min-height=50 type='barChart' :config="{orientation: 'vertical'}" :series="series" />
    </v-flex>
    <v-flex xs12 sm6>
      <portlet min-height=100 type='bulletChart' :config="{orientation: 'horizontal'}" :series="series" />
    </v-flex>
    <v-flex xs12 sm6>
      <portlet min-height=50 type='dotChart' :series="series" />
    </v-flex>
  </v-layout>
</div>
</template>

<script>

import Portlet from '@/components/Portlet.vue'

export default {
  components: {
    Portlet
  },
  computed: {
    series: function () {
      return [this.series1, this.series2, this.series3]
    }
  },
  data: () => ({
    series1: {
      // type: 'default' // intentionally left out
      data: [
        { temp: 32, month: 'January' },
        { temp: 38, month: 'February' },
        { temp: 47, month: 'March' },
        { temp: 59, month: 'April' },
        { temp: 70, month: 'May' },
        { temp: 80, month: 'June' },
        { temp: 88, month: 'July' },
        { temp: 83, month: 'August' },
        { temp: 76, month: 'September' },
        { temp: 64, month: 'October' },
        { temp: 49, month: 'November' },
        { temp: 37, month: 'December' }
      ]
    },
    series2: {
      type: 'bullet',
      data: [
        { temp: 22, month: 'January' },
        { temp: 18, month: 'February' },
        { temp: 27, month: 'March' },
        { temp: 45, month: 'April' },
        { temp: 20, month: 'May' },
        { temp: 10, month: 'June' },
        { temp: 72, month: 'July' },
        { temp: 53, month: 'August' },
        { temp: 36, month: 'September' },
        { temp: 64, month: 'October' },
        { temp: 30, month: 'November' },
        { temp: 37, month: 'December' },
      ],
    },
    series3: {
      type: 'inset',
      data: [
        { temp: 20, month: 'April' },
        { temp: 55, month: 'May' },
        { temp: 70, month: 'September' },
        { temp: 20, month: 'November' },
      ]
    },
  })
}
</script>
