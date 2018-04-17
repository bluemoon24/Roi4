import{select,axisBottom,axisLeft,scaleLinear,scaleBand}from"d3";var generateBars=function(t,a){return t.append("g").classed("bar-container",!0).selectAll("rect.bar").data(a).enter().append("rect").classed("bar",!0)};function calculateLabelWidth(t,a){var e=select(t.container).insert("svg"),r=e.append("text").style("font-size",t.dataLabelsSize).text(a),n=r.node().getComputedTextLength();return r.remove(),e.remove(),n}var defaults={margin:{top:5,right:25,bottom:50,left:10},orientation:"vertical",mainDataColor:"grey",bulletBarsColor:"brown",insetBarsColor:"black",barWidth:.35,bulletBarWidth:.82,xTickExtension:12,horizontalLabelMargin:36,verticalLabelMargin:36,labelCharMaxWidth:9,minChartLeftMargin:50,horizontalTicksTextTop:9,axesLabelsSize:14,forecastOpacity:30,insetBarWidth:70,dataLabelsMargin:6,dataLabelsSize:12,dotMaxDiameter:10,dataOuterPadding:.3},countChartLeftMargin=function(t){var a=t.reduce(function(t,a){return t.toString().length>a.toString().length?t:a}).toString().length*defaults.labelCharMaxWidth;return a>defaults.minChartLeftMargin?a:defaults.minChartLeftMargin},extendHorizontalChartOverflowingXTicks$$1=function(t,a,e){var r=t.ticks().length-1,n=select("g.x.axis path.domain").node().getBBox().width,i=r>0?n/r:0,l=a.tickSize(),s=defaults.xTickExtension;return{overflowingXTicksExtended:extendOverflowingXTicks(e,i,l,s),xTickExtension:s}},extendOverflowingXTicks=function(t,a,e,r){if(t.selectAll("g.tick").filter(function(){return select(this).node().getBBox().width>a}).size())return t.selectAll("g.tick line").attr("y2",function(t,a){return a%2==0?e:e+r}),t.selectAll("g.tick text").attr("y",function(t,a){return a%2==0?defaults.horizontalTicksTextTop:defaults.horizontalTicksTextTop+r}),!0},extendVerticalChartOverflowingXTicks$$1=function(t,a,e){var r=t.step(),n=a.tickSize(),i=defaults.xTickExtension;return{overflowingXTicksExtended:extendOverflowingXTicks(e,r,n,i),xTickExtension:i}},generateAxes$$1=function(t,a,e,r){var n=axisBottom(e),i=generateXAxisElement(t,n,a),l=axisLeft(r);return{xAxis:n,xAxisEl:i,yAxis:l,yAxisEl:generateYAxisElement(t,l)}},generateHorizontalChartAxesLabels$$1=function(t,a,e,r,n,i,l,s){t.valuesLabel&&generateXAxisLabel(n,a.chartWidth).attr("dy",defaults.horizontalLabelMargin+(l?s:0)).text(t.valuesLabel),t.categoriesLabel&&generateYAxisLabel(i,a.chartHeight,a.leftMarginForLabels).text(t.categoriesLabel)},_extends=Object.assign||function(t){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t};function calculateXMaxDomain(t,a,e){var r=scaleLinear().domain(e.x).nice().domain()[1],n=calculateLabelWidth(t,a.maxValue),i=a.chartWidth/r,l=t.dataLabelsMargin+n,s=(r-a.maxValue)*i;return l>s?r+(l-s)/i:r}function generateHorizontalChartScales$$1(t,a,e,r){var n=r?_extends({},e,{x:[0,calculateXMaxDomain(t,a,e)]}):e,i=scaleLinear().domain(n.x).range(a.ranges.x);return r||i.nice(),{domains:n,xScale:i,yScale:scaleBand().domain(n.y).range(a.ranges.y).paddingOuter(t.dataOuterPadding).paddingInner(a.dataPadding)}}function generateLabelsOverDataHorizontal(t,a,e){e.each(function(e){var r=t.append("text").style("fill","black").style("font-size",a.dataLabelsSize).attr("dominant-baseline","central").text(e[a.valuesKey]),n=select(this).node().getBBox(),i=n.x+n.width+a.dataLabelsMargin,l=n.y+n.height/2;r.attr("transform","translate("+i+", "+l+")")})}function generateLabelsOverDataVertical(t,a,e){e.each(function(e){var r=t.append("text").style("fill","black").style("font-size",a.dataLabelsSize).text(e[a.valuesKey]),n=r.node().getBBox(),i=select(this).node().getBBox(),l=i.x+i.width/2-n.width/2,s=i.y-a.dataLabelsMargin;r.attr("transform","translate("+l+", "+s+")")})}var generateVerticalChartAxesLabels$$1=function(t,a,e,r,n,i,l,s){t.categoriesLabel&&generateXAxisLabel(n,a.chartWidth).attr("dy",defaults.verticalLabelMargin+(l?s:0)).text(t.categoriesLabel),t.valuesLabel&&generateYAxisLabel(i,a.chartHeight,a.leftMarginForLabels).text(t.valuesLabel)};function calculateYMaxDomain(t,a,e){var r=scaleLinear().domain(e.y).nice().domain()[1],n=a.chartHeight/r,i=t.dataLabelsMargin+t.dataLabelsSize,l=(r-a.maxValue)*n;return i>l?r+(i-l)/n:r}function generateVerticalChartScales(t,a,e,r){var n=r?_extends({},e,{y:[0,calculateYMaxDomain(t,a,e)]}):e,i=scaleBand().domain(n.x).range(a.ranges.x).paddingOuter(t.dataOuterPadding).paddingInner(a.dataPadding),l=scaleLinear().domain(n.y).range(a.ranges.y);return r||l.nice(),{domains:n,xScale:i,yScale:l}}var generateXAxisElement=function(t,a,e){return t.append("g").classed("x axis",!0).call(a).attr("transform","translate(0, "+e+")")},generateXAxisLabel=function(t,a){return t.append("text").attr("transform","translate("+a/2+")").style("fill","black").style("font-size",defaults.axesLabelsSize)},generateYAxisElement=function(t,a){return t.append("g").classed("y axis",!0).call(a)},generateYAxisLabel=function(t,a,e){return t.append("text").attr("transform","rotate(-90) translate(-"+a/2+")").style("text-anchor","middle").style("fill","black").attr("dy",14-e).style("font-size",defaults.axesLabelsSize)},prepareChartDataAndContainer$$1=function(t){t.categoriesKey=t.categoriesKey||Object.keys(t.data[0])[0],t.valuesKey=t.valuesKey||Object.keys(t.data[0])[1],t.orientation=t.orientation||defaults.orientation,t.mainDataColor=t.mainDataColor||defaults.mainDataColor,t.bulletBarsColor=t.bulletBarsColor||defaults.bulletBarsColor,t.forecastOpacity=t.forecastOpacity||defaults.forecastOpacity,t.insetBarsColor=t.insetBarsColor||defaults.insetBarsColor,t.insetBarWidth=t.insetBarWidth||defaults.insetBarWidth,t.dataLabelsMargin=t.dataLabelsMargin||defaults.dataLabelsMargin,t.dataLabelsSize=t.dataLabelsSize||defaults.dataLabelsSize,t.dotMaxDiameter=t.dotMaxDiameter||defaults.dotMaxDiameter,t.dataOuterPadding=t.dataOuterPadding?t.dataOuterPadding/100:defaults.dataOuterPadding;var a=t.data.map(function(a){return a[t.categoriesKey]}),e=(t.bulletData?[].concat(t.data,t.bulletData):t.data).map(function(a){return a[t.valuesKey]}),r=Math.max.apply(Math,e),n=_extends({},defaults.margin,t.margin),i=countChartLeftMargin("vertical"===t.orientation?e:a);n.left=n.left+i;var l=t.width-n.right-n.left,s=t.height-n.top-n.bottom,o={chartWidth:l,chartHeight:s,leftMarginForLabels:i,dataPadding:t.barWidth?1-t.barWidth/100:defaults.barWidth,bulletBarPadding:t.bulletBarWidth?1-t.bulletBarWidth/100:defaults.bulletBarWidth,ranges:{x:[0,l],y:[s,0]},maxValue:r},c=select(t.container);return c.selectAll("*").remove(),{svg:c.append("svg").attr("width",t.width).attr("height",t.height).append("g").attr("transform","translate("+n.left+", "+n.top+")"),config:t,dimensions:o,labels:a}},setForecast=function(t,a,e){var r=a.indexOf(t.forecastStart),n=function(e){return a.indexOf(e[t.categoriesKey])>=r};e.map(function(a){return a.filter(n).style("opacity",t.forecastOpacity/100)})};function barChartHorizontal(t){var a=t.svg,e=t.config,r=t.dimensions,n=t.labels,i={x:[0,r.maxValue],y:n.reverse()},l=generateHorizontalChartScales$$1(e,r,i,e.dataLabelsOverBars),s=l.xScale,o=l.yScale,c=generateAxes$$1(a,r.chartHeight,s,o),d=c.xAxis,u=c.xAxisEl,g=c.yAxisEl,x=extendHorizontalChartOverflowingXTicks$$1(s,d,u),h=x.overflowingXTicksExtended,f=x.xTickExtension;generateHorizontalChartAxesLabels$$1(e,r,s,d,u,g,h,f);var b=o.bandwidth(),v={};if(v.data=generateBars(a,e.data).attr("x",0).attr("y",function(t){return o(t[e.categoriesKey])}).attr("width",function(t){return s(t[e.valuesKey])}).attr("height",b).attr("fill",e.mainDataColor),e.dataLabelsOverBars&&generateLabelsOverDataHorizontal(a,e,v.data),e.insetData){var y=b*e.insetBarWidth/100,m=(b-y)/2;v.inset=generateBars(a,e.insetData).attr("x",0).attr("y",function(t){return o(t[e.categoriesKey])+m}).attr("width",function(t){return s(t[e.valuesKey])}).attr("height",y).attr("fill",e.insetBarsColor)}return{bars:v}}function barChartVertical(t){var a=t.svg,e=t.config,r=t.dimensions,n={x:t.labels,y:[0,r.maxValue]},i=generateVerticalChartScales(e,r,n,e.dataLabelsOverBars),l=i.xScale,s=i.yScale,o=generateAxes$$1(a,r.chartHeight,l,s),c=o.xAxis,d=o.xAxisEl,u=o.yAxisEl,g=extendVerticalChartOverflowingXTicks$$1(l,c,d),x=g.overflowingXTicksExtended,h=g.xTickExtension;generateVerticalChartAxesLabels$$1(e,r,l,c,d,u,x,h);var f=l.bandwidth(),b={};if(b.data=generateBars(a,e.data).attr("x",function(t){return l(t[e.categoriesKey])}).attr("y",function(t){return s(t[e.valuesKey])}).attr("width",f).attr("height",function(t){return r.chartHeight-s(t[e.valuesKey])}).attr("fill",e.mainDataColor),e.dataLabelsOverBars&&generateLabelsOverDataVertical(a,e,b.data),e.insetData){var v=f*e.insetBarWidth/100,y=(f-v)/2;b.inset=generateBars(a,e.insetData).attr("x",function(t){return l(t[e.categoriesKey])+y}).attr("y",function(t){return s(t[e.valuesKey])}).attr("width",v).attr("height",function(t){return r.chartHeight-s(t[e.valuesKey])}).attr("fill",e.insetBarsColor)}return{bars:b}}function barChart(t){var a=prepareChartDataAndContainer$$1(t),e=("vertical"===t.orientation?barChartVertical:barChartHorizontal)(a).bars;if(t.forecastStart){var r=a.labels;setForecast(t,"vertical"===t.orientation?r:r.reverse(),Object.values(e))}}function bulletChartHorizontal(t){var a=t.svg,e=t.config,r=t.dimensions,n=t.labels,i={x:[0,r.maxValue],y:n.reverse()},l=generateHorizontalChartScales$$1(e,r,i,e.dataLabelsOverBars),s=l.domains,o=l.xScale,c=l.yScale,d=generateAxes$$1(a,r.chartHeight,o,c),u=d.xAxis,g=d.xAxisEl,x=d.yAxisEl,h=extendHorizontalChartOverflowingXTicks$$1(o,u,g),f=h.overflowingXTicksExtended,b=h.xTickExtension;generateHorizontalChartAxesLabels$$1(e,r,o,u,g,x,f,b);var v=scaleBand().domain(s.y).range(r.ranges.y).padding(r.bulletBarPadding),y=c.bandwidth(),m=v.bandwidth(),C=y/2-m/2,L={};if(L.data=generateBars(a,e.data).attr("x",0).attr("y",function(t){return c(t[e.categoriesKey])}).attr("width",function(t){return o(t[e.valuesKey])}).attr("height",y).attr("fill",e.mainDataColor),e.dataLabelsOverBars&&generateLabelsOverDataHorizontal(a,e,L.data),e.insetData){var p=y*e.insetBarWidth/100,B=(y-p)/2;L.inset=generateBars(a,e.insetData).attr("x",0).attr("y",function(t){return c(t[e.categoriesKey])+B}).attr("width",function(t){return o(t[e.valuesKey])}).attr("height",p).attr("fill",e.insetBarsColor)}return L.bullet=generateBars(a,e.bulletData).attr("x",0).attr("y",function(t){return c(t[e.categoriesKey])+C}).attr("width",function(t){return o(t[e.valuesKey])}).attr("height",m).attr("fill",e.bulletBarsColor),{bars:L}}function bulletChartVertical(t){var a=t.svg,e=t.config,r=t.dimensions,n={x:t.labels,y:[0,r.maxValue]},i=generateVerticalChartScales(e,r,n,e.dataLabelsOverBars),l=i.domains,s=i.xScale,o=i.yScale,c=generateAxes$$1(a,r.chartHeight,s,o),d=c.xAxis,u=c.xAxisEl,g=c.yAxisEl,x=extendVerticalChartOverflowingXTicks$$1(s,d,u),h=x.overflowingXTicksExtended,f=x.xTickExtension;generateVerticalChartAxesLabels$$1(e,r,s,d,u,g,h,f);var b=scaleBand().domain(l.x).range(r.ranges.x).padding(r.bulletBarPadding),v=s.bandwidth(),y=b.bandwidth(),m=v/2-y/2,C={};if(C.data=generateBars(a,e.data).attr("x",function(t){return s(t[e.categoriesKey])}).attr("y",function(t){return o(t[e.valuesKey])}).attr("width",v).attr("height",function(t){return r.chartHeight-o(t[e.valuesKey])}).attr("fill",e.mainDataColor),e.dataLabelsOverBars&&generateLabelsOverDataVertical(a,e,C.data),e.insetData){var L=v*e.insetBarWidth/100,p=(v-L)/2;C.inset=generateBars(a,e.insetData).attr("x",function(t){return s(t[e.categoriesKey])+p}).attr("y",function(t){return o(t[e.valuesKey])}).attr("width",L).attr("height",function(t){return r.chartHeight-o(t[e.valuesKey])}).attr("fill",e.insetBarsColor)}return C.bullet=generateBars(a,e.bulletData).attr("x",function(t){return s(t[e.categoriesKey])+m}).attr("y",function(t){return o(t[e.valuesKey])}).attr("width",y).attr("height",function(t){return r.chartHeight-o(t[e.valuesKey])}).attr("fill",e.bulletBarsColor),{bars:C}}function bulletChart(t){var a=prepareChartDataAndContainer$$1(t),e=("vertical"===t.orientation?bulletChartVertical:bulletChartHorizontal)(a).bars;if(t.forecastStart){var r=a.labels;setForecast(t,"vertical"===t.orientation?r:r.reverse(),Object.values(e))}}var generateDots=function(t,a){return t.append("g").classed("dot-container",!0).selectAll("circle.dot").data(a).enter().append("circle").classed("dot",!0)};function dotChartVertical(t){var a=t.svg,e=t.config,r=t.dimensions,n={x:t.labels,y:[0,r.maxValue]},i=generateVerticalChartScales(e,r,n,e.dataLabelsOverDots),l=i.xScale,s=i.yScale,o=generateAxes$$1(a,r.chartHeight,l,s),c=o.xAxis,d=o.xAxisEl,u=o.yAxisEl,g=extendVerticalChartOverflowingXTicks$$1(l,c,d),x=g.overflowingXTicksExtended,h=g.xTickExtension;generateVerticalChartAxesLabels$$1(e,r,l,c,d,u,x,h);var f=l.bandwidth(),b=(e.dotMaxDiameter>f?f:e.dotMaxDiameter)/2,v=generateDots(a,e.data).attr("cx",function(t){return l(t[e.categoriesKey])+f/2}).attr("cy",function(t){return s(t[e.valuesKey])}).attr("r",b).attr("fill",e.mainDataColor);return e.dataLabelsOverDots&&generateLabelsOverDataVertical(a,e,v),v}function dotChartHorizontal(t){var a=t.svg,e=t.config,r=t.dimensions,n=t.labels,i={x:[0,r.maxValue],y:n.reverse()},l=generateHorizontalChartScales$$1(e,r,i,e.dataLabelsOverDots),s=l.xScale,o=l.yScale,c=generateAxes$$1(a,r.chartHeight,s,o),d=c.xAxis,u=c.xAxisEl,g=c.yAxisEl,x=extendHorizontalChartOverflowingXTicks$$1(s,d,u),h=x.overflowingXTicksExtended,f=x.xTickExtension;generateHorizontalChartAxesLabels$$1(e,r,s,d,u,g,h,f);var b=o.bandwidth(),v=(e.dotMaxDiameter>b?b:e.dotMaxDiameter)/2,y=generateDots(a,e.data).attr("cx",function(t){return s(t[e.valuesKey])}).attr("cy",function(t){return o(t[e.categoriesKey])+b/2}).attr("r",v).attr("fill",e.mainDataColor);return e.dataLabelsOverDots&&generateLabelsOverDataHorizontal(a,e,y),y}function dotChart(t){var a=prepareChartDataAndContainer$$1(t),e=("vertical"===t.orientation?dotChartVertical:dotChartHorizontal)(a);if(t.forecastStart){var r=a.labels;setForecast(t,"vertical"===t.orientation?r:r.reverse(),[e])}}var index={barChart:barChart,bulletChart:bulletChart,dotChart:dotChart};export default index;
