import * as React from 'react';
import * as style from './style.css';
import { select } from 'd3-selection';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';

export interface BarChartProps {
  width: number;
  height: number;
  data: Array<number>;
}

export class BarChart extends React.Component<BarChartProps> {
  private node: SVGSVGElement;

  public componentDidMount() {
    this.createChart();
  }

  public componentDidUpdate() {
    this.createChart();
  }

  private createChart() {
    const node = this.node;
    const dataMax = max(this.props.data);

    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.height]);

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect');

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove();

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .attr('class', style.bar)
      .attr('x', (d, i) => ((25 + 10) * i))
      .attr('y', (d) => this.props.height - yScale(d))
      .attr('height', (d) => yScale(d))
      .attr('width', 25);

  }

  public render() {
    return (
      <svg ref={(node) => this.node = node} width={this.props.width} height={this.props.height} />
    );
  }
}
