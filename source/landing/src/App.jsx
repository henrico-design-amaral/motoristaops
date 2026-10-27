import React, {useState,useEffect,useRef} from 'react';
import {TripForm} from './TripForm.jsx';
import {usePageMotion,ProcessFlow,CrossfadeImage,AnimatedFAQ,FloatingContact} from './Motion.jsx';
import {animateElement,MOTION} from './motion.mjs';
import {ArrowRight,ArrowLeft,ArrowUpRight,Clock3,UserRound,Route,LockKeyhole,Plane,BriefcaseBusiness,HeartHandshake,Building2,CalendarDays,MapPinned,Timer,Accessibility,Snowflake,Armchair,Usb,ShieldCheck,Sun,Luggage,MessageCircle,Check,X,Expand,Phone,Star,Plus,Layers,Sparkles,Shield} from 'lucide-react';
const A='/assets/',GOOGLE='https://maps.app.goo.gl/aCAXYqSYsQDSt7teA';
const wa=(t='Olá, Henrico! Gostaria de solicitar um orçamento para um trajeto particular.')=>'https://wa.me/5511988329725?text='+encodeURIComponent(t);
const asset=name=>(typeof window!=='undefined'&&window.MOTORISTAOPS_ASSETS?.[name])||A+name;
const I=({as:C,...p})=><C aria-hidden="true" strokeWidth={1.75} {...p}/>;
const Brand=({name})=><img className="brand-icon" src={asset(name+'.svg')} alt="" aria-hidden="true"/>;
const Ext=({href,children,...p})=><a href={href} target="_blank" rel="noopener noreferrer" {...p}>{children}</a>;
function WA({children='Solicitar orçamento',text,className=''}){return <Ext href={wa(text)} className={'button primary '+className}><Brand name="whatsapp"/><span>{children}</span><I as={ArrowRight}/></Ext>}
function Socials(){return <div className="social-links" aria-label="Canais MotoristaOPS">{[['google','Ver avaliações',GOOGLE],['instagram','Instagram','https://www.instagram.com/motoristaops/'],['tiktok','TikTok','https://www.tiktok.com/@motoristaops']].map(([n,t,u])=><Ext key={n} href={u}><Brand name={n}/><span>{t}</span><I as={ArrowUpRight}/></Ext>)}</div>}
const services=[
 [Plane,'Aeroportos e rodoviárias','airport.webp','Embarque com planejamento','Congonhas, Guarulhos, Viracopos e terminais rodoviários. Combinamos horário, ponto de encontro, passageiros e bagagem antes da saída.','Planejar meu transfer'],
 [BriefcaseBusiness,'Reuniões e compromissos','corporate.webp','Seu tempo bem cuidado','Deslocamentos profissionais com hora marcada, discrição e rota planejada. Para chegar à reunião com tranquilidade e atenção ao que importa.','Agendar meu compromisso'],
 [CalendarDays,'Eventos corporativos e sociais','events.webp','A chegada e a volta combinadas','Feiras, congressos, shows, festivais e encontros. Planejamos os acessos, o embarque e a saída, incluindo retorno quando solicitado.','Organizar meu evento'],
 [Building2,'Hotel · evento · aeroporto','corporate.webp','Uma agenda, vários destinos','Transporte entre hospedagem, eventos e aeroportos. Atendimento para visitantes e profissionais, com os trechos e horários alinhados.','Combinar meus traslados'],
 [HeartHandshake,'Consultas e exames','care.webp','Cuidado também no trajeto','Deslocamento com atenção ao seu ritmo, aos horários e ao embarque. Podemos combinar espera ou retorno conforme a necessidade.','Agendar minha consulta'],
 [MapPinned,'Viagens e passeios','travel.webp','Além da rotina','Viagens intermunicipais e roteiros em São Paulo. Definimos percurso, paradas, tempo de espera e condições antes de confirmar.','Planejar minha viagem'],
 [Timer,'À disposição por hora','corporate.webp','Flexibilidade com organização','Um motorista disponível durante o período contratado. Para múltiplos compromissos, reuniões, compras ou uma agenda que pede continuidade.','Consultar disponibilidade'],
 [Accessibility,'Idosos e acompanhamento','care.webp','Mais tempo e atenção','Atenção ao embarque, desembarque e comunicação com a família, quando combinado. Informe antecipadamente as necessidades de mobilidade.','Combinar o acompanhamento']
];
const features=[
 [Snowflake,'Clima do seu jeito','Ar digital Dual Zone e saída de ar para o banco traseiro.'],
 [Armchair,'Conforto no interior','Bancos em tecido e material premium sintético.'],
 [Usb,'Conectividade a bordo','Quatro portas USB para os seus dispositivos.'],
 [ShieldCheck,'Segurança e tecnologia','Sete airbags, câmera 360° e sensores de estacionamento.'],
 [Sun,'Mais luz, mais conforto','Teto solar elétrico e vidros dianteiros com isolamento acústico.'],
 [Luggage,'Bagagem bem planejada','Porta-malas de 372 litros. Alinhamos as malas na reserva.']
];
const gallery=[
 ['omoda-front.webp','Vista dianteira'],
 ['omoda-rear.webp','Design traseiro'],
 ['omoda-light.webp','Detalhe dos faróis'],
 ['omoda-luxury-cabin.webp','Painel e cabine','Tecnologia integrada ao seu trajeto.'],
 ['omoda-luxury-front-seats.webp','Bancos dianteiros','Tecido e material premium sintético.'],
 ['omoda-luxury-rear-seats.webp','Banco traseiro','Um espaço para viajar com conforto.'],
 ['omoda-luxury-sunroof.webp','Teto solar','Luz natural a bordo.']
];
const protections=[
 [Layers,'PPF Full','Interno e externo · brilhante','Proteção das superfícies contra riscos e desgastes do dia a dia.'],
 [ShieldCheck,'Película antivandalismo','PS20','Maior resistência dos vidros a impactos e retenção de estilhaços em caso de quebra.'],
 [Sun,'Nano cerâmica','G5 / G20','Privacidade e proteção solar para mais conforto a bordo.'],
 [Sparkles,'Vitrificação Full','Acabamento preservado','Proteção para couros, bancos, plásticos e rodas, facilitando a manutenção.'],
 [Shield,'Anti-Trinco','Cuidado com o para-brisa','Proteção adicional para ajudar a prevenir danos no para-brisa.']
];
const faq=[
 ['Como solicito um orçamento?','Envie pelo WhatsApp a data, o horário, os endereços completos de origem e destino, o número de passageiros e a quantidade de bagagens. Informe também se precisa de paradas, espera ou retorno.'],
 ['Com quanto tempo de antecedência devo agendar?','Entre em contato assim que tiver a data do compromisso. O atendimento depende da disponibilidade da agenda, que será confirmada diretamente na conversa.'],
 ['Como funciona o atendimento em aeroportos?','Alinhamos aeroporto, terminal, horário, passageiros, bagagens e ponto de encontro. Se houver voo, envie seus dados para organizarmos os detalhes do desembarque.'],
 ['Posso combinar espera e retorno?','Sim. A espera e o retorno devem ser informados na solicitação, para que o período e as condições sejam incluídos no orçamento.'],
 ['É possível fazer paradas adicionais?','Sim. Informe as paradas previstas antes de confirmar. Mudanças durante o atendimento dependem da agenda e podem alterar o valor combinado.'],
 ['Como funciona o serviço por hora?','Definimos um período, o roteiro estimado e as necessidades da sua agenda. O orçamento considera o tempo de disponibilidade e as condições alinhadas previamente.'],
 ['Vocês fazem viagens para outras cidades?','Sim. Atendo São Paulo e região e realizo deslocamentos intermunicipais mediante planejamento e disponibilidade. Envie o itinerário para consultar.'],
 ['Como planejar passageiros e bagagem?','O veículo tem até quatro lugares para passageiros. Informe quantas pessoas viajam e os tamanhos das malas. A acomodação da bagagem deve ser avaliada antes da confirmação.'],
 ['Como são combinados valor e pagamento?','O valor, a forma de pagamento e as condições de reserva são informados diretamente no orçamento, antes da confirmação do atendimento.'],
 ['O atendimento inclui assistência médica?','O serviço é de transporte particular. Para idosos ou pessoas com mobilidade reduzida, alinhamos previamente o apoio no embarque e a necessidade de acompanhante. Não inclui atendimento médico ou veículo adaptado.']
];
function Heading({label,title,children,id}){return <div className="section-heading"><div><p className="eyebrow">{label}</p><h2 id={id}>{title}</h2></div>{children}</div>}
export function App(){
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
 return <><div ref={page} className="page-shell" data-motion-system="native-2026-10-26" inert={zoom || undefined}><a className="skip" href="#conteudo">Pular para o conteúdo</a>
 <header className="header"><div className="container header-inner"><a href="#inicio" aria-label="MotoristaOPS — início"><img className="header-logo" src={asset('logo-horizontal.webp')} alt="MotoristaOPS por Henrico Amaral" width="270" height="74"/></a><div className="header-location"><I as={MapPinned}/>São Paulo e região</div></div></header>
 <main id="conteudo"><section className="hero" id="inicio" aria-labelledby="hero-title"><img className="hero-image" src={asset('hero-v4-3.webp')} alt="Composição de Henrico Amaral com jaqueta de couro, gravata e suspensórios pretos junto ao Omoda 5 cinza em São Paulo à noite." width="1672" height="941" fetchPriority="high"/><div className="container hero-content"><p className="eyebrow">Motorista particular · São Paulo</p><h1 id="hero-title"><span className="hero-line">Seu compromisso</span><br/><span className="hero-line">começa antes</span><br/><span className="hero-line hero-line-accent">do destino.</span></h1><p className="hero-description">Do aeroporto à sua rotina, atendimento direto, planejamento e cuidado em cada trajeto.</p><Socials/></div><span className="hero-note">Composição visual da marca</span></section>
 <div className="trust-strip"><div className="container trust-inner">{[[Clock3,'Hora marcada','Seu horário no planejamento'],[UserRound,'Atendimento direto','Do contato ao desembarque'],[Route,'Rota planejada','O trajeto começa antes'],[LockKeyhole,'Discrição','Respeito à sua privacidade']].map(([ic,t,s])=><div key={t}><I as={ic}/><p><strong>{t}</strong><span>{s}</span></p></div>)}</div></div>
 <section className="section light services" id="servicos" aria-labelledby="services-title"><div className="container"><Heading id="services-title" label="O que fazemos" title={<>Para cada compromisso,<br/>um trajeto bem cuidado.</>}><p>Há mais por trás de uma corrida. Horário, contexto, bagagem e preferências entram no planejamento desde o primeiro contato.</p></Heading><div className="services-grid">{services.map(([ic,t,img,tag,body,action],i)=><article className="service" key={t}><Ext href={wa('Olá, Henrico! Gostaria de um orçamento para '+t.toLowerCase()+'.')} className="service-image-link" aria-label={action}><img src={asset(img)} alt="" loading="lazy" className={'service-image service-image-'+i} width="480" height="300"/><span><I as={ArrowUpRight}/></span></Ext><div className="service-title"><I as={ic}/><h3>{t}</h3></div><p className="service-tag">{tag}</p><p>{body}</p><Ext className="text-link" href={wa('Olá, Henrico! Gostaria de um orçamento para '+t.toLowerCase()+'.')}>{action}<I as={ArrowRight}/></Ext></article>)}</div><p className="media-note">Imagens de contexto dos serviços são ilustrativas.</p></div></section>
 <section className="section vehicle dark" id="o-carro" aria-labelledby="vehicle-title" data-vehicle-revision="2026-10-27">
  <div className="container">
   <Heading id="vehicle-title" label="O carro faz parte da experiência" title={<>Omoda 5 Luxury.<br/><span>Seu conforto, em detalhe.</span></>}><p>Um SUV cinza, adquirido zero quilômetro e preparado com cuidados extras para acompanhar você em cada trajeto.</p></Heading>
   <div className="car-layout">
    <div className="car-gallery"><button className="car-main" onClick={e=>openVehicleImage(0,e)} aria-label="Ampliar vista dianteira do Omoda 5 Luxury"><img src={asset('omoda-front.webp')} alt="Vista dianteira do Omoda 5 Luxury cinza." width="866" height="490" loading="lazy"/><span className="expand"><I as={Expand}/><span>Ver em detalhe</span></span></button></div>
    <div className="car-features">{features.map(([ic,t,b])=><div className="feature" key={t}><I as={ic}/><h3>{t}</h3><p>{b}</p></div>)}</div>
   </div>
   <div className="vehicle-interiors" role="group" aria-labelledby="vehicle-interior-title">
    <div className="vehicle-subheading"><h3 id="vehicle-interior-title">Conheça o conforto por dentro.</h3><p>Cabine, bancos e detalhes que fazem parte<br className="desktop-break"/> da sua experiência a bordo.</p></div>
    <div className="vehicle-interior-grid">{gallery.slice(3).map(([src,title,description],i)=><figure key={src}><button className="vehicle-interior-image" onClick={e=>openVehicleImage(i+3,e)} aria-label={'Ampliar '+title.toLowerCase()+' do Omoda 5 Luxury'}><img src={asset(src)} alt={title+' do Omoda 5 Luxury, com acabamento interno preto.'} width="1000" height="750" loading="lazy"/></button><figcaption><strong>{title}</strong><p>{description}</p></figcaption></figure>)}</div>
   </div>
   <div className="vehicle-protection" role="group" aria-labelledby="vehicle-protection-title">
    <div className="vehicle-protection-heading"><div><p className="eyebrow">Proteções já aplicadas</p><h3 id="vehicle-protection-title">Mais cuidado, por dentro e por fora.</h3></div><p>Cinco melhorias realizadas para preservar<br className="desktop-break"/> o veículo e cuidar do ambiente a bordo.</p></div>
    <div className="vehicle-protection-grid">{protections.map(([ic,title,detail,description])=><article className="vehicle-protection-card" key={title}><div className="vehicle-protection-icon"><I as={ic}/><span className="vehicle-applied"><I as={Check}/>Aplicado</span></div><h4>{title}</h4><div className="vehicle-protection-detail">{detail}</div><p>{description}</p></article>)}</div>
   </div>
   <div className="vehicle-hospitality"><I as={HeartHandshake}/><p><strong>Seu jeito de viajar.</strong><span>Água a bordo. Bebidas e snacks personalizados mediante alinhamento.</span></p></div>
  </div>
 </section>
 <section className="section process light" aria-labelledby="process-title"><div className="container"><Heading id="process-title" label="Como o atendimento acontece" title={<>Simples no contato.<br/>Cuidadoso em cada etapa.</>}><p>Você conta o que precisa. Eu organizo os detalhes para o trajeto acontecer com clareza, do início ao fim.</p></Heading><ProcessFlow>{[[MessageCircle,'Você me chama','Envie data, horário, origem, destino, passageiros e bagagens.'],[Route,'Alinhamos os detalhes','Combinamos roteiro, espera, paradas, valor e condições.'],[CalendarDays,'Confirmamos a reserva','Com a disponibilidade verificada, confirmamos o atendimento.'],[Check,'Eu cuido do trajeto','No dia combinado, atendimento do embarque ao desembarque.']].map(([ic,t,b],i)=><article className="step" key={t}><div className="step-top"><span>0{i+1}</span><I as={ic}/></div><h3>{t}</h3><p>{b}</p></article>)}</ProcessFlow></div></section>
 <section id="quem-dirige" className="section about dark" aria-labelledby="about-title"><div className="container about-grid"><figure className="portrait"><img src={asset('henrico-original.webp')} alt="Retrato original de Henrico Amaral, com cabeça raspada e barba grisalha, vestindo camisa preta." width="848" height="1264" loading="lazy"/><figcaption>Henrico Amaral · Motorista particular</figcaption></figure><div className="about-copy"><p className="eyebrow">Quem dirige</p><h2 id="about-title">Henrico Amaral.</h2><p className="about-lead">O serviço leva meu nome.<br/>A responsabilidade também.</p><p>Sou Henrico, motorista particular em São Paulo e região. Atendo pessoalmente cada trajeto, com planejamento, pontualidade, discrição e atenção aos detalhes que fazem diferença para você.</p><p>Do primeiro contato ao destino, você sabe com quem está falando. Seu horário, suas preferências e o contexto do seu compromisso fazem parte do meu trabalho.</p><div className="personal-points"><span><I as={UserRound}/>Contato direto comigo</span><span><I as={LockKeyhole}/>Discrição no atendimento</span></div><p className="brand-phrase">Levando pessoas. Cuidando de histórias.</p></div></div></section>
 <section className="section proof dark" aria-labelledby="proof-title"><div className="container"><Heading id="proof-title" label="A experiência de quem já foi" title={<>Confiança construída<br/>em cada trajeto.</>}><Ext className="google-evidence" href={GOOGLE}><Brand name="google"/><span>Leia as avaliações<br/><strong>no Google</strong></span><I as={ArrowUpRight}/></Ext></Heading><div className="reviews">{[['Thaís Barbosa','Bom atendimento, cordialidade e pontualidade, super recomendo de olhos fechados.'],['Fernanda Josias','Excelente profissional, super pontual e cuidadoso no trânsito.']].map(([n,q])=><figure className="review" key={n}><div className="stars" aria-label="5 estrelas">{[0,1,2,3,4].map(i=><Star key={i} size={16} fill="currentColor" strokeWidth={0}/>)}</div><blockquote>“{q}”</blockquote><figcaption><span><strong>{n}</strong><small>Avaliação no Google</small></span><Ext href={GOOGLE} aria-label={'Ver avaliações no Google, incluindo '+n}><I as={ArrowUpRight}/></Ext></figcaption></figure>)}</div></div></section>
 <section className="section faq light" aria-labelledby="faq-title"><div className="container"><Heading id="faq-title" label="Antes de embarcar" title="Perguntas frequentes."><p>Informação clara para planejar melhor. Se a sua dúvida não estiver aqui, é só falar comigo pelo WhatsApp.</p></Heading><div className="faq-grid">{faq.map(([q,a])=><AnimatedFAQ key={q} question={q} answer={a} icon={<span className="faq-plus"><I as={Plus}/></span>}/>)}</div></div></section>
 <section className="section final dark" id="orcamento" aria-labelledby="final-title"><img src={asset('city.webp')} alt="" className="final-bg" loading="lazy"/><div className="container final-grid"><div className="final-copy"><p className="eyebrow">Vamos seguir juntos</p><h2 id="final-title">Seu próximo trajeto<br/>começa com<br/><span>uma boa conversa.</span></h2><p>Conte comigo para chegar ao seu compromisso com planejamento, conforto e atenção.</p><WA>Falar no WhatsApp</WA><a className="phone-link" href="tel:+5511988329725"><I as={Phone}/>Prefere ligar? (11) 98832-9725</a><Socials/></div><TripForm getAsset={asset}/></div></section></main>
 <footer className="footer"><div className="container footer-top"><img src={asset('logo-horizontal.webp')} alt="MotoristaOPS por Henrico Amaral" width="250" height="68"/><p>Levando pessoas.<br/>Cuidando de histórias.</p><div><span>Motorista particular</span><strong>São Paulo e região</strong></div><Socials/></div><div className="container footer-bottom"><p>© 2026 MotoristaOPS · Henrico Amaral</p><p>Atendimento com hora marcada · CNPJ 69.099.839/0001-25</p><Ext href="https://henrico.works/">por henrico.works<I as={ArrowUpRight}/></Ext></div></footer><FloatingContact visible={!contactVisible} href={wa()} icon={<Brand name="whatsapp"/>}/>
 </div>
 {zoom&&<div ref={dialog} className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" data-motion={modalMotion?'true':'false'} onClick={e=>requestClose(e.detail>0)}>
   <button ref={close} className="close-lightbox" onClick={e=>{e.stopPropagation();requestClose(e.detail>0)}} aria-label="Fechar imagem"><I as={X}/></button>
   <button className="lightbox-nav lightbox-prev" onClick={e=>{e.stopPropagation();setGalleryMotion(e.detail>0);setSelected(n=>(n+gallery.length-1)%gallery.length)}} aria-label="Imagem anterior"><I as={ArrowLeft}/></button>
   <figure onClick={e=>e.stopPropagation()}><div className="gallery-frame"><CrossfadeImage motion={galleryMotion} src={asset(gallery[selected][0])} alt={gallery[selected][1]+' do Omoda 5 Luxury.'}/></div><figcaption id="lightbox-title" aria-live="polite">{gallery[selected][1]} · {selected+1} de {gallery.length}</figcaption></figure>
   <button className="lightbox-nav lightbox-next" onClick={e=>{e.stopPropagation();setGalleryMotion(e.detail>0);setSelected(n=>(n+1)%gallery.length)}} aria-label="Próxima imagem"><I as={ArrowRight}/></button>
 </div>}</>;
}
