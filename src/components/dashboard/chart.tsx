import ReactECharts from "echarts-for-react";
import { TypeChartsLine } from "../../types/components/dashboard";

type Props = {
  data: TypeChartsLine;
};

export const ChartsLineComponent = ({ data }: Props) => {
  const option = {
    title: {
      text: "Your sales for the last 7 days",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataZoom: {},
        restore: {},
      },
    },
    tooltip: {},
    legend: {},
    xAxis: {
      data: data.labels,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: "line",
        data: data.values,
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      style={{ height: 400 }}
    />
  );
};
