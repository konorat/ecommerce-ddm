import React, { createContext, useContext, useEffect, useState } from 'react';
import { getIdentificacaoFromCookie } from '../utils/cookieUtils';

export interface Identificacao {
    nome: string;
    telefone: string;
    cep: string;
    numero: string;
    complemento: string;
}

interface CookieContextType {
    identificacao: Identificacao | null;
    atualizarIdentificacao: () => Promise<void>;
    setIdentificacao?: React.Dispatch<React.SetStateAction<Identificacao | null>>;
}

const CookieContext = createContext<CookieContextType>({
    identificacao: null,
    atualizarIdentificacao: async () => { },
    setIdentificacao: () => { },
});

export const useCookieContext = () => useContext(CookieContext);

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [identificacao, setIdentificacao] = useState<Identificacao | null>(null);

    const atualizarIdentificacao = async () => {
        try {
            const id = await getIdentificacaoFromCookie();
            console.log('atualizarIdentificacao called, got:', id);
            if (id) {
                setIdentificacao(id as Identificacao);
            } else {
                setIdentificacao(null);
            }
        } catch (error) {
            console.error('Error updating identification:', error);
            setIdentificacao(null);
        }
    };

    useEffect(() => {
        atualizarIdentificacao();
    }, []);

    return (
        <CookieContext.Provider value={{ identificacao, atualizarIdentificacao, setIdentificacao }}>
            {children}
        </CookieContext.Provider>
    );
};
