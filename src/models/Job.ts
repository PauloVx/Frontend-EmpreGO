import { User } from './User';
export interface Job {
    id: number,
    titulo: string,
    descricao: string,
    cep: string,
    uf: string,
    cidade: string,
    bairro: string,
    logradouro: string,
    situacao: string,
    dataCriacao: string,
    criadorUsuario: User,
    id_usuario_candidatado: null
}