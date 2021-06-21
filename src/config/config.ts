
export const API_HOST = process.env.API_URL || '192.168.0.7'
export const API_PORT = process.env.API_PORT || 3000


export const API_URL = `http://${API_HOST}:${API_PORT}`
export const API_CADASTRO_ENDPOINT = `cadastrar`;
export const API_LOGIN_ENDPOINT = `/login`;
export const API_PERFIL_ENDPOINT = `/perfil`;
export const API_CREATE_JOB_ENDPOINT = '/trabalho-adicionar';
export const API_GET_ALL_JOBS = '/trabalhos';
export const API_GET_JOB_DETAILS = '/trabalho';
export const API_CANDIDATAR_TRABALHO = '/trabalhos/aceitar';
export const API_JOBS_I_CREATED = '/perfil/meus-trabalhos-criados';
export const API_MINHAS_CANDIDATURAS = '/perfil/meus-trabalhos';

//TODO add dotenv