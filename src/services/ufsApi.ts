import axios from 'axios';

export const ufsApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
  timeout: 8000 //8 Segundos timeout
})