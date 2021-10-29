export const getFluxoMaximo = (values) => {
  const peak = Math.max(...values);
  return peak;
};

export const getPontoMaximo = (data: { value: number; index: number }[]) => {
  const values = data.map((d) => d.value);
  const peakValue = Math.max(...values);
  const peakIndex = data[values.indexOf(peakValue)].index;

  return {
    value: peakValue,
    index: peakIndex,
  };
};

export const converterFluxoParaVolume = (data) => {
  // integral do fluxo em relação ao tempo
  let volume = 0;
  const volumeData = data.map((d) => {
    volume += d.value * 0.002;
    return {
      index: d.index,
      value: volume,
    };
  });

  return volumeData;
};

export const getVef1 = (fluxo, limiar = 0.1, frequenciaDeAmostragem = 500) => {
  let start = 0,
    end;

  const intervalo = fluxo.filter((fluxo, indice) => {
    if (start === 0) {
      if (fluxo.value > limiar) {
        start = indice;
        end = start + frequenciaDeAmostragem;
        return true;
      }
    }

    return indice < end;
  });

  const volume = converterFluxoParaVolume(intervalo);
  return volume[volume.length - 1].value;
};
