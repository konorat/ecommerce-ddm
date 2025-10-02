import axios from 'axios';
import type { Category } from '../../types/Category';

export async function fetchCategories(): Promise<{ success: boolean; data: Category[]; message?: string }> {
  try {
    const response = await axios.get('http://localhost:5000/api/categories');

    if (response.status === 200 || response.status === 304) {
      const rawData = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      const categories = rawData.map((item: any): Category => ({
        id: item.id,
        name: item.name,
        desc: item.desc,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));

      return {
        success: true,
        data: categories,
        message: "Categorias carregadas com sucesso"
      };
    } else {
      return {
        success: false,
        data: [],
        message: `Falha ao buscar Categorias. Status: ${response.status}`
      };
    }
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error || "Erro ao buscar Categorias"
    };
  }
}