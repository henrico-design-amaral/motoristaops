import React, {useState,useEffect,useRef} from 'react';
import {LocaleProvider,useLocale,LanguageSelector} from './Locale.jsx';
import {createTranslator} from './i18n.mjs';
import {SiteMenu} from './SiteMenu.jsx';
import {Privacy} from './Privacy.jsx';
import {TripForm} from './TripForm.jsx';
import {usePageMotion,ProcessFlow,CrossfadeImage,AnimatedFAQ,FloatingContact} from './Motion.jsx';
import {animateElement,MOTION} from './motion.mjs';
import {ArrowRight,ArrowLeft,ArrowUpRight,Clock3,UserRound,Route,LockKeyhole,Plane,BriefcaseBusiness,HeartHandshake,Building2,CalendarDays,MapPinned,Timer,Accessibility,MessageCircle,Check,X,Expand,Phone,Star,Plus} from 'lucide-react';
const A='/assets/',GOOGLE='https://maps.app.goo.gl/aCAXYqSYsQDSt7teA';
const wa=(text,locale='pt')=>'https://wa.me/5511988329725?text='+encodeURIComponent(text||createTranslator(locale)("Olá, Henrico! Gostaria de solicitar um orçamento para um trajeto particular."));
const asset=name=>(typeof window!=='undefined'&&window.MOTORISTAOPS_ASSETS?.[name])||A+name;
const I=({as:C,...p})=><C aria-hidden="true" strokeWidth={1.75} {...p}/>;
const Brand=({name})=><img className="brand-icon" src={asset(name+'.svg')} alt="" aria-hidden="true"/>;
const Ext=({href,children,...p})=><a href={href} target="_blank" rel="noopener noreferrer" {...p}>{children}</a>;
function WA({children,text,className=''}){const {t:_,locale}=useLocale();return <Ext href={wa(text,locale)} className={'button primary '+className}><Brand name="whatsapp"/><span>{children||_('Solicitar orçamento')}</span><I as={ArrowRight}/></Ext>}
function Socials(){const {t:_}=useLocale();return <div className="social-links" aria-label={_("Canais MotoristaOPS")}>{[['google',_("Ver avaliações"),GOOGLE],['instagram','Instagram','https://www.instagram.com/motoristaops/'],['tiktok','TikTok','https://www.tiktok.com/@motoristaops']].map(([n,t,u])=><Ext key={n} href={u}><Brand name={n}/><span>{t}</span><I as={ArrowUpRight}/></Ext>)}</div>}
function Heading({label,title,children,id}){return <div className="section-heading"><div><p className="eyebrow">{label}</p><h2 id={id}>{title}</h2></div>{children}</div>}
export function App({locale='pt'}){return <LocaleProvider locale={locale}><Landing/></LocaleProvider>}
function Landing(){
 const {t:_,locale}=useLocale();
const services=[
 [Plane,_("Aeroportos e rodoviárias"),'airport.webp',_("Embarque com planejamento"),_("Congonhas, Guarulhos, Viracopos e terminais rodoviários. Combinamos horário, ponto de encontro, passageiros e bagagem antes da saída."),_("Planejar meu transfer")],
 [BriefcaseBusiness,_("Reuniões e compromissos"),'corporate.webp',_("Seu tempo bem cuidado"),_("Deslocamentos profissionais com hora marcada, discrição e rota planejada. Para chegar à reunião com tranquilidade e atenção ao que importa."),_("Agendar meu compromisso")],
 [CalendarDays,_("Eventos corporativos e sociais"),'events.webp',_("A chegada e a volta combinadas"),_("Feiras, congressos, shows, festivais e encontros. Planejamos os acessos, o embarque e a saída, incluindo retorno quando solicitado."),_("Organizar meu evento")],
 [Building2,_("Hotel · evento · aeroporto"),'corporate.webp',_("Uma agenda, vários destinos"),_("Transporte entre hospedagem, eventos e aeroportos. Atendimento para visitantes e profissionais, com os trechos e horários alinhados."),_("Combinar meus traslados")],
 [HeartHandshake,_("Consultas e exames"),'care.webp',_("Cuidado também no trajeto"),_("Deslocamento com atenção ao seu ritmo, aos horários e ao embarque. Podemos combinar espera ou retorno conforme a necessidade."),_("Agendar minha consulta")],
 [MapPinned,_("Viagens e passeios"),'travel.webp',_("Além da rotina"),_("Viagens intermunicipais e roteiros em São Paulo. Definimos percurso, paradas, tempo de espera e condições antes de confirmar."),_("Planejar minha viagem")],
 [Timer,_("À disposição por hora"),'corporate.webp',_("Flexibilidade com organização"),_("Um motorista disponível durante o período contratado. Para múltiplos compromissos, reuniões, compras ou uma agenda que pede continuidade."),_("Consultar disponibilidade")],
 [Accessibility,_("Idosos e acompanhamento"),'care.webp',_("Mais tempo e atenção"),_("Atenção ao embarque, desembarque e comunicação com a família, quando combinado. Informe antecipadamente as necessidades de mobilidade."),_("Combinar o acompanhamento")]
];
const gallery=[
 ['omoda-front.webp',_("Vista dianteira")],
 ['omoda-rear.webp',_("Design traseiro")],
 ['omoda-light.webp',_("Detalhe dos faróis")],
 ['omoda-luxury-cabin.webp',_("Painel e cabine"),_("Tecnologia integrada ao seu trajeto.")],
 ['omoda-luxury-front-seats.webp',_("Bancos dianteiros"),_("Tecido e material premium sintético.")],
 ['omoda-luxury-rear-seats.webp',_("Banco traseiro"),_("Um espaço para viajar com conforto.")],
 ['omoda-luxury-sunroof.webp',_("Teto solar"),_("Luz natural a bordo.")]
];
const faq=[
 [_("Como solicito um orçamento?"),_("Envie pelo WhatsApp a data, o horário, os endereços completos de origem e destino, o número de passageiros e a quantidade de bagagens. Informe também se precisa de paradas, espera ou retorno.")],
 [_("Com quanto tempo de antecedência devo agendar?"),_("Entre em contato assim que tiver a data do compromisso. O atendimento depende da disponibilidade da agenda, que será confirmada diretamente na conversa.")],
 [_("Como funciona o atendimento em aeroportos?"),_("Alinhamos aeroporto, terminal, horário, passageiros, bagagens e ponto de encontro. Se houver voo, envie seus dados para organizarmos os detalhes do desembarque.")],
 [_("Posso combinar espera e retorno?"),_("Sim. A espera e o retorno devem ser informados na solicitação, para que o período e as condições sejam incluídos no orçamento.")],
 [_("É possível fazer paradas adicionais?"),_("Sim. Informe as paradas previstas antes de confirmar. Mudanças durante o atendimento dependem da agenda e podem alterar o valor combinado.")],
 [_("Como funciona o serviço por hora?"),_("Definimos um período, o roteiro estimado e as necessidades da sua agenda. O orçamento considera o tempo de disponibilidade e as condições alinhadas previamente.")],
 [_("Vocês fazem viagens para outras cidades?"),_("Sim. Atendo São Paulo e região e realizo deslocamentos intermunicipais mediante planejamento e disponibilidade. Envie o itinerário para consultar.")],
 [_("Como planejar passageiros e bagagem?"),_("O Omoda acomoda até quatro passageiros. Para grupos maiores, informe o total de pessoas e as malas para consultarmos um veículo parceiro.")],
 [_("Como são combinados valor e pagamento?"),_("O valor, a forma de pagamento e as condições de reserva são informados diretamente no orçamento, antes da confirmação do atendimento.")],
 [_("O atendimento inclui assistência médica?"),_("O serviço é de transporte particular. Para idosos ou pessoas com mobilidade reduzida, alinhamos previamente o apoio no embarque e a necessidade de acompanhante. Não inclui atendimento médico ou veículo adaptado.")]
];

 const [selected,setSelected]=useState(0),[zoom,setZoom]=useState(false),[modalMotion,setModalMotion]=useState(false),[contactVisible,setContactVisible]=useState(false);
 const close=useRef(),trigger=useRef(),dialog=useRef(),page=useRef(),exiting=useRef();
 const [galleryMotion,setGalleryMotion]=useState(false);
 usePageMotion(page);
 const openVehicleImage=(index,event)=>{trigger.current=event.currentTarget;setSelected(index);setGalleryMotion(false);setModalMotion(event.detail>0);setZoom(true);};
 const requestClose=(pointer=false)=>{
   const node=dialog.current;
   if(!pointer||!node){setZoom(false);return;}
   if(exiting.current?.playState==='running')return;
   const a=animateElement(node,[{opacity:1},{opacity:0}],{duration:MOTION.exit});
   exiting.current=a;
   const figure=node.querySelector('figure');
   animateElement(figure,[{transform:'scale(1)'},{transform:'scale(.99)'}],{duration:MOTION.exit});
   const finish=()=>{if(dialog.current===node)setZoom(false);};
   if(a)a.finished.then(finish,finish);else finish();
 };
 useEffect(()=>{const section=document.getElementById('orcamento');if(!section||!window.IntersectionObserver)return;const observer=new IntersectionObserver(([entry])=>setContactVisible(entry.isIntersecting));observer.observe(section);return()=>observer.disconnect();},[]);
 useEffect(()=>{
   if(!zoom)return;
   const old=document.body.style.overflow;document.body.style.overflow='hidden';close.current?.focus();
   const entrance=modalMotion?animateElement(dialog.current,[{opacity:0},{opacity:1}],{duration:180}):null;
   const onkey=e=>{
     if(e.key==='Escape'){e.preventDefault();setZoom(false);}
     if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();setGalleryMotion(false);setSelected(n=>(n+(e.key==='ArrowRight'?1:gallery.length-1))%gallery.length);}
     if(e.key==='Tab'){
       const buttons=[...dialog.current.querySelectorAll('button')];const first=buttons[0],last=buttons.at(-1);
       if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
       else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
     }
   };
   document.addEventListener('keydown',onkey);
   return()=>{entrance?.cancel();exiting.current?.cancel();exiting.current=null;document.body.style.overflow=old;document.removeEventListener('keydown',onkey);trigger.current?.focus();};
 },[zoom]);
 return <><div ref={page} className="page-shell" data-motion-system="native-2026-10-26" inert={zoom || undefined}><a className="skip" href="#conteudo">{_("Pular para o conteúdo")}</a>
 <header className="header" data-header-revision="2026-11-20-nav"><div className="container header-inner"><div className="header-brand"><a className="header-logo-link" href="#inicio" aria-label={_("MotoristaOPS — início")}><img className="header-logo" src={asset('logo-horizontal.webp')} alt={_("MotoristaOPS por Henrico Amaral")} width="908" height="246"/></a><span className="header-location">{_("São Paulo e Região")}</span></div><SiteMenu/><div className="header-language"><LanguageSelector/></div></div></header>
 <main id="conteudo"><section className="hero" id="inicio" aria-labelledby="hero-title"><img className="hero-image" src={asset('hero-v4-3.webp')} srcSet={asset('hero-v4-3-small.webp')+' 800w, '+asset('hero-v4-3-large.webp')+' 1672w'} sizes="100vw" alt={_("Composição de Henrico Amaral com jaqueta de couro, gravata e suspensórios pretos junto ao Omoda 5 cinza em São Paulo à noite.")} width="1672" height="941" fetchPriority="high"/><div className="container hero-content"><p className="eyebrow">{_("Chauffeur & Transporte Executivo")}</p><h1 id="hero-title"><span className="hero-line">{_("Sua agenda merece")}</span>{' '}<span className="hero-line hero-line-accent">{_("uma condução à altura.")}</span></h1><p className="hero-description">{_("Transporte executivo em São Paulo para aeroportos, compromissos e viagens programadas. Combine seu trajeto diretamente com Henrico Amaral.")}</p><a className="button primary" href="#orcamento">{_('Solicitar orçamento')}<I as={ArrowRight}/></a></div><span className="hero-note">{_("Composição visual da marca")}</span></section>
 <div className="trust-strip"><div className="container trust-inner">{[[Clock3,_("Hora marcada"),_("Seu horário no planejamento")],[UserRound,_("Atendimento direto"),_("Do contato ao desembarque")],[Route,_("Rota planejada"),_("O trajeto começa antes")],[LockKeyhole,_("Discrição"),_("Respeito à sua privacidade")]].map(([ic,t,s])=><div key={t}><I as={ic}/><p><strong>{t}</strong><span>{s}</span></p></div>)}</div></div>
 <section className="section light services" id="servicos" aria-labelledby="services-title"><div className="container"><Heading id="services-title" label={_("O que fazemos")} title={<>{_("Para cada compromisso,")}<br/>{_("um trajeto bem cuidado.")}</>}><p>{_("Há mais por trás de uma corrida. Horário, contexto, bagagem e preferências entram no planejamento desde o primeiro contato.")}</p></Heading><div className="services-grid">{services.map(([ic,t,img,tag,body,action],i)=><article className="service" key={t}><Ext href={wa(_('Olá, Henrico! Gostaria de um orçamento para {service}.',{service:t.toLowerCase()}),locale)} className="service-image-link" aria-label={action}><img src={asset(img)} alt="" loading="lazy" className={'service-image service-image-'+i} width="480" height="300"/><span><I as={ArrowUpRight}/></span></Ext><div className="service-title"><I as={ic}/><h3>{t}</h3></div><p className="service-tag">{tag}</p><p>{body}</p><Ext className="text-link" href={wa(_('Olá, Henrico! Gostaria de um orçamento para {service}.',{service:t.toLowerCase()}),locale)}>{action}<I as={ArrowRight}/></Ext></article>)}</div><p className="media-note">{_("Imagens de contexto dos serviços são ilustrativas.")}</p></div></section>
 <section className="section vehicle dark" id="veiculos" aria-labelledby="vehicle-title">
  <div className="container" id="o-carro">
   <Heading id="vehicle-title" label={_("Veículos")} title={_("Veículos para o seu trajeto.")}><p>{_("O número de passageiros e a bagagem orientam a escolha. Antes do embarque, você recebe a confirmação do veículo e de quem vai dirigir.")}</p></Heading>
   <div className="fleet-layout">
    <button className="car-main" onClick={e=>openVehicleImage(0,e)} aria-label={_("Ampliar vista dianteira do Omoda 5 Luxury")}><img src={asset('omoda-front.webp')} alt={_("Vista dianteira do Omoda 5 Luxury cinza.")} width="866" height="490" loading="lazy"/><span className="expand"><I as={Expand}/>{_("Ver em detalhe")}</span></button>
    <div className="fleet-copy">
     <div><p className="eyebrow">{_("SUV da operação")}</p><h3>Omoda 5 Luxury</h3><p>{_("Até quatro passageiros. Informe o tamanho e a quantidade das malas para combinarmos o embarque.")}</p></div>
     <div><h3>{_("Veículos de parceiros")}</h3><p>{_("Precisa de um sedã executivo, sedã premium, minivan ou van? Henrico consulta os parceiros e confirma a categoria, os lugares e o espaço para malas no orçamento.")}</p><a className="text-link" href="#orcamento">{_("Consultar um veículo")}<I as={ArrowRight}/></a></div>
    </div>
   </div>
  </div>
 </section>
 <section id="processo" className="section process light" aria-labelledby="process-title"><div className="container"><Heading id="process-title" label={_("Como o atendimento acontece")} title={<>{_("Simples no contato.")}<br/>{_("Cuidadoso em cada etapa.")}</>}><p>{_("Você conta o que precisa. Eu organizo os detalhes para o trajeto acontecer com clareza, do início ao fim.")}</p></Heading><ProcessFlow>{[[MessageCircle,_("Você me chama"),_("Envie data, horário, origem, destino, passageiros e bagagens.")],[Route,_("Alinhamos os detalhes"),_("Combinamos roteiro, espera, paradas, valor e condições.")],[CalendarDays,_("Confirmamos a reserva"),_("Com a disponibilidade verificada, confirmamos o atendimento.")],[Check,_("Eu cuido do trajeto"),_("No dia combinado, atendimento do embarque ao desembarque.")]].map(([ic,t,b],i)=><article className="step" key={t}><div className="step-top"><span>0{i+1}</span><I as={ic}/></div><h3>{t}</h3><p>{b}</p></article>)}</ProcessFlow></div></section>
 <section id="quem-dirige" className="section about dark" aria-labelledby="about-title"><div className="container about-grid"><figure className="portrait"><img src={asset('henrico-original.webp')} alt={_("Retrato original de Henrico Amaral, com cabeça raspada e barba grisalha, vestindo camisa preta.")} width="848" height="1264" loading="lazy"/><figcaption>{_("Henrico Amaral · MotoristaOPS")}</figcaption></figure><div className="about-copy"><p className="eyebrow">{_("Quem atende")}</p><h2 id="about-title">Henrico Amaral.</h2><p className="about-lead">{_("O serviço leva meu nome.")}<br/>{_("A responsabilidade também.")}</p><p>{_("Você combina o trajeto diretamente comigo. Organizo o atendimento com o veículo da MotoristaOPS ou com um motorista parceiro, conforme a sua agenda e a disponibilidade.")}</p><p>{_("Do primeiro contato ao destino, você sabe com quem está falando. Seu horário, suas preferências e o contexto do seu compromisso fazem parte do meu trabalho.")}</p><div className="personal-points"><span><I as={UserRound}/>{_("Contato direto comigo")}</span><span><I as={LockKeyhole}/>{_("Discrição no atendimento")}</span></div><p className="brand-phrase">{_("Levando pessoas. Cuidando de histórias.")}</p></div></div></section>
 <section id="avaliacoes" className="section proof dark" aria-labelledby="proof-title"><div className="container"><Heading id="proof-title" label={_("A experiência de quem já foi")} title={<>{_("Confiança construída")}<br/>{_("em cada trajeto.")}</>}><Ext className="google-evidence" href={GOOGLE}><Brand name="google"/><span>{_("Leia as avaliações")}<br/><strong>{_("no Google")}</strong></span><I as={ArrowUpRight}/></Ext></Heading><div className="reviews">{[['Thaís Barbosa',_("Bom atendimento, cordialidade e pontualidade, super recomendo de olhos fechados.")],['Fernanda Josias',_("Excelente profissional, super pontual e cuidadoso no trânsito.")]].map(([n,q])=><figure className="review" key={n}><div className="stars" aria-label={_("5 estrelas")}>{[0,1,2,3,4].map(i=><Star key={i} size={16} fill="currentColor" strokeWidth={0}/>)}</div><blockquote>“{q}”</blockquote><figcaption><span><strong>{n}</strong><small>{_("Avaliação no Google")}</small></span><Ext href={GOOGLE} aria-label={_('Ver avaliações no Google, incluindo {name}',{name:n})}><I as={ArrowUpRight}/></Ext></figcaption></figure>)}</div>{locale!=='pt'&&<p className="media-note review-translation">{_('Avaliações traduzidas do português.')}</p>}</div></section>
 <section id="duvidas" className="section faq light" aria-labelledby="faq-title"><div className="container"><Heading id="faq-title" label={_("Antes de embarcar")} title={_("Perguntas frequentes.")}><p>{_("Informação clara para planejar melhor. Se a sua dúvida não estiver aqui, é só falar comigo pelo WhatsApp.")}</p></Heading><div className="faq-grid">{faq.map(([q,a])=><AnimatedFAQ key={q} question={q} answer={a} icon={<span className="faq-plus"><I as={Plus}/></span>}/>)}</div></div></section>
 <section className="section final dark" id="orcamento" aria-labelledby="final-title"><img src={asset('city.webp')} alt="" className="final-bg" loading="lazy"/><div className="container final-grid"><div className="final-copy"><p className="eyebrow">{_("Vamos seguir juntos")}</p><h2 id="final-title">{_("Seu próximo trajeto")}<br/>{_("começa com")}<br/><span>{_("uma boa conversa.")}</span></h2><p>{_("Conte comigo para chegar ao seu compromisso com planejamento, conforto e atenção.")}</p><WA>{_("Falar no WhatsApp")}</WA><a className="phone-link" href="tel:+5511988329725"><I as={Phone}/>{_("Prefere ligar? (11) 98832-9725")}</a><Socials/></div><TripForm getAsset={asset}/></div></section></main>
 <footer className="footer"><div className="container footer-top"><img src={asset('logo-horizontal.webp')} alt={_("MotoristaOPS por Henrico Amaral")} width="250" height="68"/><p>{_("Levando pessoas.")}<br/>{_("Cuidando de histórias.")}</p><div><span>{_("Chauffeur & Transporte Executivo")}</span><strong>{_("São Paulo e região")}</strong></div><Socials/></div><Privacy/><div className="container footer-bottom"><p>{_("© 2026 MotoristaOPS · Henrico Amaral")}</p><p>{_("Atendimento com hora marcada · CNPJ 69.099.839/0001-25")}</p><Ext href="https://henrico.works/">{_("por henrico.works")}<I as={ArrowUpRight}/></Ext></div></footer><FloatingContact locale={locale} visible={!contactVisible} href={wa(undefined,locale)} icon={<Brand name="whatsapp"/>}/>
 </div>
 {zoom&&<div ref={dialog} className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" data-motion={modalMotion?'true':'false'} onClick={e=>requestClose(e.detail>0)}>
   <button ref={close} className="close-lightbox" onClick={e=>{e.stopPropagation();requestClose(e.detail>0)}} aria-label={_("Fechar imagem")}><I as={X}/></button>
   <button className="lightbox-nav lightbox-prev" onClick={e=>{e.stopPropagation();setGalleryMotion(e.detail>0);setSelected(n=>(n+gallery.length-1)%gallery.length)}} aria-label={_("Imagem anterior")}><I as={ArrowLeft}/></button>
   <figure onClick={e=>e.stopPropagation()}><div className="gallery-frame"><CrossfadeImage motion={galleryMotion} src={asset(gallery[selected][0])} alt={_('{title} do Omoda 5 Luxury.',{title:gallery[selected][1]})}/></div><figcaption id="lightbox-title" aria-live="polite">{gallery[selected][1]} · {_('{current} de {total}',{current:selected+1,total:gallery.length})}</figcaption></figure>
   <button className="lightbox-nav lightbox-next" onClick={e=>{e.stopPropagation();setGalleryMotion(e.detail>0);setSelected(n=>(n+1)%gallery.length)}} aria-label={_("Próxima imagem")}><I as={ArrowRight}/></button>
 </div>}</>;
}
