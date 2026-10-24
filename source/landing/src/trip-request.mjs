export function localToday(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

export function prepareTripRequest(values, today = localToday()) {
  const clean = value => String(value || '').replace(/\s+/g,' ').trim();
  const origem = clean(values.origem), destino = clean(values.destino);
  const data = clean(values.data), horario = clean(values.horario);
  const passageiros = clean(values.passageiros || '1');
  const detalhes = String(values.detalhes || '').trim();
  const errors = {};
  if (!origem) errors.origem = 'Informe o endereço de partida.';
  if (!destino) errors.destino = 'Informe o endereço de destino.';
  if (origem.length > 220) errors.origem = 'Use até 220 caracteres para a origem.';
  if (destino.length > 220) errors.destino = 'Use até 220 caracteres para o destino.';
  if (data) {
    const parsed = new Date(`${data}T12:00:00`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data) || Number.isNaN(parsed.getTime()) || localToday(parsed) !== data) errors.data = 'Confira a data do trajeto.';
    else if (data < today) errors.data = 'Escolha hoje ou uma data futura.';
  }
  if (horario && !/^([01]\d|2[0-3]):[0-5]\d$/.test(horario)) errors.horario = 'Informe um horário válido.';
  if (!['1','2','3','4'].includes(passageiros)) errors.passageiros = 'Selecione de 1 a 4 passageiros.';
  if (detalhes.length > 800) errors.detalhes = 'Use até 800 caracteres nos detalhes.';
  if (Object.keys(errors).length) return {errors};
  const formattedDate = data ? data.split('-').reverse().join('/') : 'A combinar';
  const message = `Olá, Henrico! Gostaria de solicitar um orçamento.\nOrigem: ${origem}\nDestino: ${destino}\nData: ${formattedDate}\nHorário: ${horario || 'A combinar'}\nPassageiros: ${passageiros}\nDetalhes: ${detalhes || 'A combinar'}`;
  return {errors, message, href:`https://wa.me/5511988329725?text=${encodeURIComponent(message)}`, summary:{origem,destino,data:formattedDate,horario:horario || 'A combinar',passageiros,detalhes}};
}
