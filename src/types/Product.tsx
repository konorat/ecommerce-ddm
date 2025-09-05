export interface Product {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    un: string;
    img: string;
    codigo: string;
    ativo: boolean;
    idCategoria: number;
    createdAt: string; // or Date if you prefer
    updatedAt: string; // or Date if you prefer
}