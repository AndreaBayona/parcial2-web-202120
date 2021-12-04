import * as React from "react";
import {useIntl} from "react-intl";
import * as d3 from 'd3';

export const Chart = ({ width = 600, height = 770, data }) => {
  const [show, setShow] = React.useState(false);
  const [tooltipPosition, setTooltipPosition] = React.useState({x: 0, y:0});
  const [tooltipContent, setTooltipContent] = React.useState();
  const barChart = React.useRef();
  const intl = useIntl();

  const showDetail = (event, data) => {
    setShow(true);
    const {clientX, clientY} = event;
    setTooltipContent(data.name);
    setTooltipPosition({x: clientX, y:clientY});
  };

  React.useEffect(() => {
    const margin = { top: 10, left: 50, bottom: 160, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    if (barChart.current) {d3.select("g").remove()}

    const svg = d3.select(barChart.current);
    svg.attr('width', width);
    svg.attr('height', height);

    let g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear()
        .domain([0, 500])
        .range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(data);

    bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "blue")
        .attr("x", d => x(d.name))
        .attr("y", d => y(Number.parseFloat(d.stock)))
        .attr("height", d => iheight - y(Number.parseFloat(d.stock)))
        .attr("width", x.bandwidth())
        .on("mouseover",  (_event, d) => {
          showDetail(_event, d);
        })
        .on("mouseleave", () => setShow(false));

    g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (-35) + "," + ((height / 2) - 50) + ")rotate(-90)")
        .text(intl.formatMessage({id: "units"}));

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + ((width / 2) - 50) + "," + (5) + ")")
        .text(intl.formatMessage({id: "products"}));

  }, [intl, intl.locale, data, height, width]);

  return (
    <div id='chartArea'>
      <svg ref={barChart}/>
      {show &&
      <div
          style={{
            position: "absolute",
            zIndex: "100",
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            background: "lightblue",
          }}
      >
        {tooltipContent}
      </div>}
    </div>
  );
};

