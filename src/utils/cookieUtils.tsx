export async function getIdentificacaoFromCookie(): Promise<{
    nome: string;
    telefone: string;
    cep: string;
    numero: string;
    complemento: string;
} | null> {
    try {
        const response = await fetch('http://localhost:5000/api/identificacao', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log('No identification cookie found or invalid');
            return null;
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (!data.success || !data.data?.identificacao) {
            return null;
        }

        const identificacao = data.data.identificacao;

        if (!identificacao.nome || !identificacao.telefone) {
            return null;
        }


        const result = {
            nome: identificacao.nome || '',
            telefone: identificacao.telefone || '',
            cep: identificacao.cep || '',
            numero: identificacao.numero || '',
            complemento: identificacao.complemento || ''
        };

        console.log('Returning identification:', result);
        return result;
    } catch (error) {
        console.error('Error fetching identification from API:', error);
        return null;
    }
}
