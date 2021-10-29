import createTrend from 'trendline';

export const getIR_Red = (values: { id: number; value: string }[]) => {
  const result = values.map((v) => {
    const [red, ir] = v.value.split('-');

    return {
      id: v.id,
      ir: parseInt(ir),
      red: parseInt(red),
    };
  });

  return result;
};

export const getRatio = (data: { id: number; ir: number; red: number }[]) => {
  const trendIR = createTrend(data, 'id', 'ir');
  const trendRed = createTrend(data, 'id', 'red');

  const withoutTrend = data.map(({ id, ir, red }) => ({
    id,
    ir: ir - trendIR.calcY(id),
    red: red - trendRed.calcY(id),
  }));

  // const ir = withoutTrend.map((v) => v.ir);

  // const red = withoutTrend.map((v) => v.red);

  const calcRatio = (start, end) => {
    const red =
      (data[end].red - data[start].red) /
      (data[end].id - data[start].id) /
      trendRed.calcY((data[end].id + data[start].id) / 2);

    const ir =
      (data[end].ir - data[start].ir) /
      (data[end].id - data[start].id) /
      trendIR.calcY((data[end].id + data[start].id) / 2);

    return red / ir;
  };

  const ratio = calcRatio(4, 7);

  return ratio;
};

export const getSpo2 = (data) => {
  const ratio = getRatio(data);

  const spo2 = -45.06 * ratio * ratio + 30.354 * ratio + 94.845;

  return spo2;
};
