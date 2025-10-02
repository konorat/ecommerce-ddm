import React from 'react';
import { useCookieContext } from '../../../context/CookieContext';

interface DeliveryInfoProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ handleChange }) => {
    const { identificacao } = useCookieContext();

    if (!identificacao) return null;

    return (
        < div className="bg-white rounded-xl shadow-lg p-8 w-full md:w-1/2" >
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold mb-2 text-[#4A7C82]">Indicações de entrega</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                    value={identificacao.nome}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AA2B56] text-gray-800 bg-gray-100"
                    readOnly
                />
                <input
                    type="tel"
                    name="telefone"
                    placeholder="Telefone"
                    value={identificacao.telefone}
                    readOnly
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AA2B56] text-gray-800 bg-gray-100"
                />
                <input
                    type="text"
                    name="cep"
                    placeholder="CEP"
                    value={identificacao.cep}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AA2B56] text-gray-800"
                />
                <input
                    type="number"
                    name="numero"
                    placeholder="Número"
                    value={identificacao.numero}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AA2B56] text-gray-800"
                />
                <input
                    type="text"
                    name="complemento"
                    placeholder="Complemento"
                    value={identificacao.complemento}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AA2B56] text-gray-800"
                />
            </div>
        </div >

    );
};

export default DeliveryInfo;