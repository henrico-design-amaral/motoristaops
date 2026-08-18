export const currentClosings = [
  {date:'2026-08-02',dateBR:'02/08/2026',day:'Dom',shift:'Não informado',platform:'Uber',hoursOnline:2.6667,hoursInRide:null,kmTotal:49,kmPassenger:null,tripsUber:13,trips99:0,tripsPrivate:0,tripsTotal:13,revenueUber:141.52,revenue99:0,revenuePrivate:0,extras:0,grossRevenue:141.52,fuelCost:22.75,foodCost:0,washCost:35,operationalExpense:57.75,operationalProfit:83.77,notes:'Uber R$ 141,52 em 13 viagens; 2h40 trabalhadas; 49 km; consumo 7,0 km/L; etanol R$ 3,25/L. Lavagem R$ 35,00. Abastecimento registrado separadamente no caixa.'},
  {date:'2026-08-03',dateBR:'03/08/2026',day:'Seg',shift:'Misto',platform:'Uber + Particular',hoursOnline:9.5,hoursInRide:null,kmTotal:181.6,kmPassenger:null,tripsUber:17,trips99:0,tripsPrivate:2,tripsTotal:19,revenueUber:321.97,revenue99:0,revenuePrivate:65,extras:0,grossRevenue:386.97,fuelCost:74.71,foodCost:0,washCost:0,operationalExpense:74.71,operationalProfit:312.26,notes:'Uber R$ 321,97 em 17 viagens + transporte escolar particular ida e volta R$ 65,00. Abastecimento de 23,55 L recebido gratuitamente e não contabilizado como saída de caixa.'},
  {date:'2026-08-04',dateBR:'04/08/2026',day:'Ter',shift:'Misto',platform:'Uber + 99 + Particular',hoursOnline:8.45,hoursInRide:null,kmTotal:157.7,kmPassenger:null,tripsUber:12,trips99:2,tripsPrivate:2,tripsTotal:16,revenueUber:290.26,revenue99:31.58,revenuePrivate:65,extras:0,grossRevenue:386.84,fuelCost:75.79,foodCost:0,washCost:0,operationalExpense:75.79,operationalProfit:311.05,notes:'Uber R$ 290,26; 99 R$ 31,58; particular R$ 65,00. 8h27 trabalhadas, 157,7 km. Abastecimento pago de R$ 69,68.'},
  {date:'2026-08-05',dateBR:'05/08/2026',day:'Qua',shift:'Misto',platform:'Uber + 99 + Particular',hoursOnline:12.55,hoursInRide:null,kmTotal:187.37,kmPassenger:null,tripsUber:11,trips99:5,tripsPrivate:2,tripsTotal:18,revenueUber:191.56,revenue99:85.77,revenuePrivate:65,extras:0,grossRevenue:342.33,fuelCost:75.42,foodCost:0,washCost:0,operationalExpense:75.42,operationalProfit:266.91,notes:'Fechamento final consolidado. 12h33 estimadas, 187,37 km, consumo 8 km/L, abastecimento pago de R$ 75,44.'},
  {date:'2026-08-10',dateBR:'10/08/2026',day:'Seg',shift:'Misto',platform:'Uber + Particular',hoursOnline:10.1667,hoursInRide:8.1167,kmTotal:207.1,kmPassenger:150.54,tripsUber:14,trips99:0,tripsPrivate:2,tripsTotal:16,revenueUber:333.58,revenue99:0,revenuePrivate:65,extras:0,grossRevenue:398.58,fuelCost:74.93,foodCost:0,washCost:0,operationalExpense:74.93,operationalProfit:323.65,notes:'10h10 trabalhadas, 207,1 km, 14 viagens Uber + 2 particulares. Abastecimento R$ 76,99 por 23,91 L; odômetro final 92.427 km.'},
  {date:'2026-08-11',dateBR:'11/08/2026',day:'Ter',shift:'Misto',platform:'Uber + Particular',hoursOnline:7.7667,hoursInRide:6.9667,kmTotal:104.1,kmPassenger:71.28,tripsUber:17,trips99:0,tripsPrivate:2,tripsTotal:19,revenueUber:266.33,revenue99:0,revenuePrivate:65,extras:0,grossRevenue:331.33,fuelCost:48.56,foodCost:0,washCost:0,operationalExpense:48.56,operationalProfit:282.77,notes:'7h46 trabalhadas, 104,1 km, 17 viagens Uber + 2 particulares. Manutenção preventiva de R$ 660,00 registrada separadamente como investimento.'}
] as const;

export const currentVehicleExpenses = [
  {date:'2026-08-02',dateBR:'02/08/2026',category:'Lavagem',nature:'Lavagem do carro',description:'Lavagem do carro',value:35},
  {date:'2026-08-11',dateBR:'11/08/2026',category:'Manutenção preventiva',nature:'Investimento',description:'Par LED pingo T10 cerâmica',value:60},
  {date:'2026-08-11',dateBR:'11/08/2026',category:'Manutenção preventiva',nature:'Investimento',description:'Kit lâmpada LED H4',value:280},
  {date:'2026-08-11',dateBR:'11/08/2026',category:'Manutenção preventiva',nature:'Investimento',description:'DRL LED com seta',value:320}
] as const;

export const currentFuelings = [
  {date:'2026-07-27',dateBR:'27/07/2026',fuel:'Etanol',liters:27.29,pricePerLiter:3.34,totalPaid:91.15,consumptionKmL:8.8,notes:'Abastecimento informado no fechamento de 27/07.'},
  {date:'2026-08-03',dateBR:'03/08/2026',fuel:'Etanol',liters:23.55,pricePerLiter:3.25,totalPaid:0,consumptionKmL:null,notes:'Abastecimento cortesia; valor nominal R$ 76,54, sem saída de caixa.'},
  {date:'2026-08-04',dateBR:'04/08/2026',fuel:'Etanol',liters:21.65,pricePerLiter:3.22,totalPaid:69.68,consumptionKmL:null,notes:'Abastecimento pago.'},
  {date:'2026-08-05',dateBR:'05/08/2026',fuel:'Etanol',liters:23.43,pricePerLiter:3.22,totalPaid:75.44,consumptionKmL:null,notes:'Abastecimento pago.'},
  {date:'2026-08-10',dateBR:'10/08/2026',fuel:'Etanol',liters:23.91,pricePerLiter:3.22,totalPaid:76.99,consumptionKmL:8.9,notes:'Odômetro final 92.427 km.'}
] as const;

export const personalMonthlyExpenses = [
  ['Aluguel',1250],['Condomínio',460.48],['Faculdade Melissa',1200],['Acordos condomínio',781.53],['IPTU',120],['Acordos IPTU',150],['Telefone',170],['Luz',200],['Água',80],['Gás',15],['Cartão de crédito',600],['Mercado Livre',300],['Prime Video',40],['Extras',300]
] as const;

export const vehicleProfile = {
  vehicle:'Hyundai HB20 2019', fuel:'Etanol', referenceFuelPrice:3.22, recentOdometerKm:92542, privateRatePerKm:4.5
} as const;
