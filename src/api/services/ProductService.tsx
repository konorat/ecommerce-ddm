import axios from 'axios';
import type { Product } from '../../types/Product';

export async function fetchProducts(): Promise<{ success: boolean; data: Product[]; message?: string }> {
    try {
        const response = await axios.get('http://localhost:5000/api/produtos');

        if (response.status === 200 || response.status === 304) {
            const rawData = Array.isArray(response.data)
                ? response.data
                : response.data.data;

            const producuts = rawData.map((item: any): Product => ({
                id: item.id,
                nome: item.nome,
                descricao: item.descricao,
                preco: item.preco,
                un: item.un,
                img: item.img,
                codigo: item.codigo,
                ativo: item.ativo,
                idCategoria: item.idCategoria,
                createdAt: item.createdAt, // or new Date(item.createdAt) if you prefer Date
                updatedAt: item.updatedAt,
            }));

            return {
                success: true,
                data: producuts,
                message: "Produtos carregadas com sucesso"
            };
        } else {
            return {
                success: false,
                data: [],
                message: `Falha ao buscar Produtos. Status: ${response.status}`
            };
        }
    } catch (error: any) {
        return {
            success: false,
            data: [],
            message: error || "Erro ao buscar Produtos"
        };
    }
}