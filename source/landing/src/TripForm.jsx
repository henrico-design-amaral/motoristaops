import React, {useState,useRef,useEffect} from 'react';
import {useLocale} from './Locale.jsx';
import {ArrowRight,Check} from 'lucide-react';
import {useMessageMotion} from './Motion.jsx';
import {prepareTripRequest,localToday} from './trip-request.mjs';

export function TripForm({getAsset}) {
  const {t:_,locale}=useLocale();
  const [today,setToday] = useState(undefined);
  useEffect(()=>setToday(localToday()),[]);
  const [errors,setErrors] = useState({});
  const [prepared,setPrepared] = useState(null);
  const readyHeading = useRef(null),readyCard=useRef(null);
  useMessageMotion(readyCard,prepared);
  useEffect(()=>{if(prepared)readyHeading.current?.focus();},[prepared]);
  const prepare = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const result = prepareTripRequest(Object.fromEntries(new FormData(form)),undefined,locale);
    for (const name of ['data','horario']) if (form.elements[name].validity.badInput) result.errors[name] = _(name==='data'?'Confira a data do trajeto.':'Confira o horário do trajeto.');
    setErrors(result.errors);
    if (Object.keys(result.errors).length) {
      setPrepared(null);
      form.elements[Object.keys(result.errors)[0]]?.focus();
      return;
    }
    setPrepared(result);
  };
  const changed = event => {
    setPrepared(null);
    const name = event.target.name;
    setErrors(current => {if(!current[name])return current;const next={...current};delete next[name];return next;});
  };
  const a11y = name => ({'aria-invalid':errors[name] ? 'true' : undefined,'aria-describedby':errors[name] ? `${name}-error` : undefined});
  const error = name => errors[name] && <p className="field-error" id={`${name}-error`}>{errors[name]}</p>;
  return <form className="trip-form" onSubmit={prepare} onChange={changed} noValidate>
    <p className="eyebrow">{_("Adiante os detalhes")}</p>
    <h3>{_("Vamos planejar seu trajeto?")}</h3>
    <p>{_("Prepare a mensagem e revise os detalhes antes de abrir o WhatsApp.")}</p>
    <p className="required-note">{_("* Campos obrigatórios")}</p>
    <div className="form-field"><label htmlFor="origem">{_("Origem")} <span aria-hidden="true">*</span></label><input id="origem" name="origem" placeholder={_("Endereço completo de partida")} required maxLength="220" enterKeyHint="next" {...a11y('origem')}/>{error('origem')}</div>
    <div className="form-field"><label htmlFor="destino">{_("Destino")} <span aria-hidden="true">*</span></label><input id="destino" name="destino" placeholder={_("Endereço completo de chegada")} required maxLength="220" enterKeyHint="next" {...a11y('destino')}/>{error('destino')}</div>
    <div className="form-row"><div className="form-field"><label htmlFor="data">{_("Data")} <span>{_("(opcional)")}</span></label><input id="data" type="date" name="data" min={today} {...a11y('data')}/>{error('data')}</div><div className="form-field"><label htmlFor="horario">{_("Horário")} <span>{_("(opcional)")}</span></label><input id="horario" name="horario" type="time" {...a11y('horario')}/>{error('horario')}</div></div>
    <div className="form-field"><label htmlFor="passageiros">{_("Passageiros")}</label><select id="passageiros" name="passageiros" defaultValue="1" {...a11y('passageiros')}>{[1,2,3,4].map(n=><option key={n}>{n}</option>)}</select>{error('passageiros')}</div>
    <div className="form-field"><label htmlFor="detalhes">{_("Mais detalhes")} <span>{_("(opcional)")}</span></label><textarea id="detalhes" name="detalhes" placeholder={_("Malas, paradas, espera ou retorno")} maxLength="800" rows="2" {...a11y('detalhes')}/>{error('detalhes')}</div>
    {Object.keys(errors).length>0 && <p className="form-feedback" role="alert">{_("Confira os campos indicados para continuar.")}</p>}
    <button className="button primary" type="submit"><img className="brand-icon" src={getAsset('whatsapp.svg')} alt=""/><span>{prepared?_("Atualizar mensagem"):_("Preparar mensagem")}</span><ArrowRight aria-hidden="true" size={20} strokeWidth={1.75}/></button>
    {prepared && <section ref={readyCard} className="message-ready" aria-labelledby="message-ready-title"><h4 ref={readyHeading} id="message-ready-title" tabIndex="-1"><Check aria-hidden="true" size={20}/>{_("Mensagem preparada")}</h4><dl>{[[_("Origem"),prepared.summary.origem],[_("Destino"),prepared.summary.destino],[_("Data"),prepared.summary.data],[_("Horário"),prepared.summary.horario],[_("Passageiros"),prepared.summary.passageiros],...(prepared.summary.detalhes?[[_("Detalhes"),prepared.summary.detalhes]]:[])].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><a className="button primary" href={prepared.href} target="_blank" rel="noopener noreferrer"><img className="brand-icon" src={getAsset('whatsapp.svg')} alt=""/><span>{_("Abrir conversa no WhatsApp")}</span><ArrowRight aria-hidden="true" size={20} strokeWidth={1.75}/></a></section>}
    <p className="form-note">{_("Nada é enviado automaticamente. O atendimento só é reservado após confirmação.")}</p>
  </form>;
}
