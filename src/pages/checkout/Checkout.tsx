import React, { useState, useEffect } from 'react';
import Kyc from './components/Kyc';
import DeliveryInfo from './components/DeliveryInfo';
import ItemsInfo from './components/ItemsInfo';
import { useCookieContext } from '../../context/CookieContext';

const Checkout: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [pagamento, setPagamento] = useState('');
    const [trocoPara, setTrocoPara] = useState('');
    const { identificacao, setIdentificacao } = useCookieContext();

    useEffect(() => {
        if (identificacao) {

        }
    }, [identificacao]);

    console.log(typeof setIdentificacao);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(typeof setIdentificacao);
        if (typeof setIdentificacao === 'function') {
            setIdentificacao((prev: any) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto mt-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-[#AA2B56]">Obrigado pelo seu pedido!</h2>
                <p className="text-gray-700">Seu pedido foi realizado com sucesso.</p>
            </div>
        );
    }

    if (!identificacao) {
        return <Kyc />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-start mt-8 w-full max-w-5xl mx-auto">
            </div>
            <h1 className="text-2xl font-bold mb-6 text-[#AA2B56] text-center mt-8">Revise seu pedido!</h1>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-start mt-8 w-full max-w-5xl mx-auto">
                <DeliveryInfo handleChange={handleChange} />
                <ItemsInfo />

            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto mt-8">
                <h3 className="text-lg font-semibold mb-4 text-[#4A7C82]">Selecione a forma de pagamento</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="pagamento"
                            value="pix"
                            checked={pagamento === 'pix'}
                            onChange={e => setPagamento(e.target.value)}
                            required
                            className="accent-[#AA2B56]"
                        />
                        <span className="font-medium">Pix</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="pagamento"
                            value="dinheiro"
                            checked={pagamento === 'dinheiro'}
                            onChange={e => setPagamento(e.target.value)}
                            required
                            className="accent-[#AA2B56]"
                        />
                        <span className="font-medium">Dinheiro</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="pagamento"
                            value="maquininha_credito"
                            checked={pagamento === 'maquininha_credito'}
                            onChange={e => setPagamento(e.target.value)}
                            className="accent-[#AA2B56]"
                        />
                        <span className="font-medium">Maquininha (Crédito)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="pagamento"
                            value="maquininha_debito"
                            checked={pagamento === 'maquininha_debito'}
                            onChange={e => setPagamento(e.target.value)}
                            className="accent-[#AA2B56]"
                        />
                        <span className="font-medium">Maquininha (Débito)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="pagamento"
                            value="pix_maquininha"
                            checked={pagamento === 'pix_maquininha'}
                            onChange={e => setPagamento(e.target.value)}
                            className="accent-[#AA2B56]"
                        />
                        <span className="font-medium">Pix na Maquininha</span>
                    </label>
                </div>
                {pagamento === 'pix' && (
                    <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-[#AA2B56]">
                        <p className="font-semibold text-[#AA2B56] mb-2">Chave Pix:</p>
                        <p className="text-gray-800 mb-2 select-all">padaria@maria.com.br</p>
                        <p className="text-gray-700">
                            Após o pagamento, envie o comprovante para o WhatsApp da padaria:<br />
                            <a
                                href="https://wa.me/5511999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#4A7C82] underline"
                            >
                                (11) 99999-9999
                            </a>
                        </p>
                    </div>
                )}


                {pagamento === 'dinheiro' && (
                    <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-[#AA2B56]">
                        <label className="font-semibold text-[#AA2B56] mb-2 block">
                            Troco para quanto?
                            <input
                                type="number"
                                min="0"
                                placeholder="Informe o valor"
                                value={trocoPara}
                                onChange={e => setTrocoPara(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-[#AA2B56] text-gray-800 w-full"
                            />
                        </label>
                    </div>
                )}
            </div>
            <div className="flex justify-center mt-8">
                <button
                    type="submit"
                    className="bg-[#AA2B56] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#4A7C82] transition-colors duration-200"
                >
                    Realizar Pedido
                </button>
            </div>
        </form>
    );
};

export default Checkout;