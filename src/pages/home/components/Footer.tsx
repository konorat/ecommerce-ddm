import { Instagram, Facebook, Mail, Phone, MessageCircle } from "lucide-react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
    return (
        <footer className="bg-[#AA2B56] text-white">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo */}
                <div className="flex flex-col items-center md:items-start">
                    <img
                        src="images/LOGOOFICIAL.png"
                        alt="Logo"
                        className="w-40 h-auto mb-4 rounded-full"
                    />
                    <p className="text-sm opacity-80">
                        Sua melhor escolha em doces artesanais.
                    </p>
                </div>

                {/* Links úteis */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-lg font-semibold mb-3">Links Úteis</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:underline">Início</a></li>
                        <li><a href="/produtos" className="hover:underline">Produtos</a></li>
                        <li><a href="/sobre" className="hover:underline">Sobre Nós</a></li>
                        <li><a href="/contato" className="hover:underline">Contato</a></li>
                    </ul>
                </div>

                {/* Contato e redes sociais */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-lg font-semibold mb-3">Fale Conosco</h3>
                    <p className="text-sm flex items-center gap-2">
                        <Mail size={16} /> contato@mariassweet.com
                    </p>
                    <p className="text-sm flex items-center gap-2">
                        <Phone size={16} /> (31) 99999-9999
                    </p>

                    <div className="flex gap-4 mt-4">
                        <a href="https://www.instagram.com/docedemariajoinville/" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon className="hover:scale-110 transition" />
                        </a>
                        <a href="https://wa.me/554730333909" target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="hover:scale-110 transition" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="bg-[#8A2046] text-center py-4 text-sm opacity-80">
                © {new Date().getFullYear()} Maria’s Sweet. Todos os direitos reservados.
            </div>
        </footer>
    );
}
