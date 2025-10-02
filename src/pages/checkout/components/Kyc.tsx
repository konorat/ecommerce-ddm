import React, { useState } from "react";
import axios from "axios";
import { useCookieContext } from '../../../context/CookieContext';

const Kyc: React.FC = () => {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [cep, setCep] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const { identificacao, atualizarIdentificacao } = useCookieContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:5000/api/identificacao",
                { nome, telefone, cep, numero, complemento },
                { withCredentials: true }
            );
            setSucesso(true);
            atualizarIdentificacao();
        } catch (err) {
            alert("Erro ao identificar");
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6 text-[#AA2B56] text-center">Identifique-se</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Nome completo"
                    value={nome || identificacao?.nome || ""}
                    onChange={e => setNome(e.target.value)}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AA2B56] text-gray-800"
                />
                <input
                    type="tel"
                    placeholder="Telefone"
                    value={telefone || identificacao?.telefone || ""}
                    onChange={e => setTelefone(e.target.value)}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AA2B56] text-gray-800"
                />
                <input
                    type="text"
                    placeholder="Cep"
                    value={cep || identificacao?.cep || ""}
                    onChange={e => setCep(e.target.value)}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AA2B56] text-gray-800"
                />
                <input
                    type="text"
                    placeholder="Número"
                    value={numero || identificacao?.numero || ""}
                    onChange={e => setNumero(e.target.value)}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AA2B56] text-gray-800"
                />
                <input
                    type="text"
                    placeholder="Complemento"
                    value={complemento || identificacao?.complemento || ""}
                    onChange={e => setComplemento(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AA2B56] text-gray-800"
                />
                <button
                    type="submit"
                    className="mt-4 bg-[#AA2B56] text-white font-semibold py-2 rounded-lg hover:bg-[#4A7C82] transition-colors duration-200"
                >
                    Identificar
                </button>
                {sucesso && <p className="text-green-600 text-center mt-2">Identificação realizada com sucesso!</p>}
            </form>
        </div>
    );
};

export default Kyc;