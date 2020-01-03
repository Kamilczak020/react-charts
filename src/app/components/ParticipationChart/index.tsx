import * as React from 'react';
import * as style from './style.css';
import { min as minDate, max as maxDate, eachWeekOfInterval, eachDayOfInterval, addDays, getDay, isEqual } from 'date-fns';
import { select } from 'd3-selection';
import { quantize, interpolateRgb } from 'd3-interpolate';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';

export interface ParticipationChartProps {
  size: number;
  data: Array<{ date: Date, count: number }>;
}

export class ParticipationChart extends React.Component<ParticipationChartProps> {
  private node: SVGSVGElement;

  public componentDidMount() {
    this.createChart();
  }

  public componentDidUpdate() {
    this.createChart();
  }

  private createChart() {
    const startDate = minDate(this.props.data.map((dataPoint) => dataPoint.date));
    const endDate = maxDate(this.props.data.map((dataPoint) => dataPoint.date));
    const minCount = min(this.props.data.map((dataPoint) => dataPoint.count));
    const maxCount = max(this.props.data.map((dataPoint) => dataPoint.count));
    const sundays = eachWeekOfInterval({ start: startDate, end: endDate });
    const dataGroupedByWeeks = sundays.map((sunday) => {
      return eachDayOfInterval({ start: sunday, end: addDays(sunday, 6) })
        .map((day) => this.props.data.find((datapoint) => isEqual(datapoint.date, day)))
        .filter((day) => day !== undefined);
    });

    const gapSize = Math.ceil(this.props.size / 300);
    const rectSize = Math.ceil((this.props.size - (gapSize * sundays.length - 1)) / sundays.length);

    const yScale = scaleLinear()
      .domain([minCount, maxCount])
      .range([0, 9]);

    const svg = select(this.node)
      .attr('width', this.props.size)
      .attr('height', rectSize * 7 + gapSize * 6);

    const groups = svg.selectAll('g.week')
      .data(dataGroupedByWeeks)
      .enter().append('g')
      .attr('class', style.week)
      .attr('transform', (d, i) => `translate(${(rectSize + gapSize) * i}, 0)`);

    groups.selectAll('rect')
      .data((d) => { return d; })
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d) => getDay(d.date) * (rectSize + gapSize))
      .attr('width', rectSize)
      .attr('height', rectSize)
      .attr('fill', (d) => quantize(interpolateRgb('#ebedf0', '#2c9c00'), 10)[Math.floor(yScale(d.count))]);
  }

  public render() {
    return (
      <svg ref={(node) => this.node = node} />
    );
  }
}