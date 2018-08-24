import * as d3 from 'd3';

export function lineChart(element, data) {
    const days = data.data;

    if (element.innerHTML) {
        element.innerHTML = '';
    }

    const width = element.clientWidth;
    const height = element.clientHeight;

    const margin = {top: 20, bottom: 30, left: 8 * 5, right: 16};
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    const firstDay = days[1];
    const lastDay = days[days.length - 1];

    const maxClose = d3.max(days, (d) => d.close);

    const x = d3.scaleTime()
        .domain([new Date(firstDay.date), new Date(lastDay.date)])
        .range([0, svgWidth]);

    const y = d3.scaleLinear()
        .domain([0, maxClose])
        .range([svgHeight, 0]);

    const line = d3.line()
        .x(function (d) {
            const date = new Date(d.date);
            return x(date);
        })
        .y(function (d) {
            return y(d.close);
        });

    const xAxis = d3.axisBottom(x)
        .ticks(4);

    const yAxis = d3.axisLeft(y);

    const svg = d3.select(element)
        .append('svg')
        .attr('class', 'line-chart')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${svgHeight})`)
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

    svg.append("path")
        .datum(days)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    console.log(data);

}