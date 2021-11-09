export const VEHICLE_TYPE_KEY = 'vehicle_type';
export const NEW_VEHICLES_KEY = 'new_vehicles';
export const USED_VEHICLES_KEY = 'used_vehicles';
export const CITY_ID_KEY = 'city_id';
export const RADIUS_KEY = 'radius';
export const BRAND_ID_KEY = 'brand_id';
export const MODEL_ID_KEY = 'model_id';
export const YEAR_KEY = 'year';
export const PRICE_KEY = 'price';
export const VERSION_ID_KEY = 'version_id';

export const CARS_TAB = 'carros';
export const MOTORCYCLES_TAB = 'motos';

export const cities = [
  { id: 1, name: 'São Paulo - SP' },
  { id: 2, name: 'Rio de Janeiro - RJ' },
  { id: 3, name: 'Belo Horizonte - MG' },
  { id: 4, name: 'Goiânia - GO' },
  { id: 5, name: 'Cuiabá - MT' },
  { id: 6, name: 'Curitiba - PR' },
  { id: 7, name: 'Florianópolis - SC' },
  { id: 8, name: 'Porto Alegre - RS' },
  { id: 9, name: 'Fortaleza - CE' },
  { id: 10, name: 'Natal - RN' },
  { id: 11, name: 'Salvador - BA' },
  { id: 12, name: 'Vitória - ES' },
  { id: 13, name: 'Campo Grande - MS' },
  { id: 14, name: 'São Luís - MA' },
  { id: 15, name: 'Palmas - TO' },
  { id: 16, name: 'Belém - PA' },
  { id: 17, name: 'Manaus - AM' },
  { id: 18, name: 'Maceió - AL' },
  { id: 19, name: 'Aracaju - SE' },
  { id: 20, name: 'Porto Velho - RO' },
  { id: 21, name: 'Boa Vista - RR' },
  { id: 22, name: 'Recife - PE' },
  { id: 23, name: 'Rio Branco - AC' },
  { id: 24, name: 'Teresina - PI' },
  { id: 25, name: 'Macapá - AM' },
  { id: 26, name: 'Brasília - DF' },
  { id: 27, name: 'João Pessoa - PB' },
];

export const radiusOptions = [
  { value: 50, label: '50km' },
  { value: 100, label: '100km' },
  { value: 150, label: '150km' },
  { value: 200, label: '200km' },
];

export const allBrandsOption = { id: 0, name: 'Todas' };
export const allModelsOption = { id: 0, name: 'Todos' };
export const allVersionsOption = { id: 0, name: 'Todas' };

export const years = [
  { value: 2000, label: '2000' },
  { value: 2001, label: '2001' },
  { value: 2002, label: '2002' },
  { value: 2003, label: '2003' },
  { value: 2004, label: '2004' },
  { value: 2005, label: '2005' },
  { value: 2006, label: '2006' },
  { value: 2007, label: '2007' },
  { value: 2008, label: '2008' },
  { value: 2009, label: '2009' },
  { value: 2010, label: '2010' },
  { value: 2011, label: '2011' },
  { value: 2012, label: '2012' },
  { value: 2013, label: '2013' },
  { value: 2014, label: '2014' },
  { value: 2015, label: '2015' },
  { value: 2016, label: '2016' },
  { value: 2017, label: '2017' },
  { value: 2018, label: '2018' },
  { value: 2019, label: '2019' },
  { value: 2020, label: '2020' },
  { value: 2021, label: '2021' },
];

export const prices = [
  {
    id: 1, label: 'Até R$10000,00', min: 0, max: 10000,
  },
  {
    id: 2, label: 'De R$10.000,00 até R$15.000,00', min: 10000, max: 15000,
  },
  {
    id: 3, label: 'De R$15.000,00 até R$25.000,00', min: 15000, max: 25000,
  },
  {
    id: 4, label: 'De R$25.000,00 até R$50.000,00', min: 25000, max: 50000,
  },
  {
    id: 5, label: 'De R$50.000,00 até R$100.000,00', min: 50000, max: 100000,
  },
  { id: 6, label: 'Acima de R$100.000,00', min: 100000 },
];
