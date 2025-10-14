// Sem mudanças neste arquivo, ele já está pronto para receber os caminhos das imagens.
import React from 'react';
import Image from 'next/image'
import './Apoiador-BoxStyles.css';

interface Apoiador {
    logo: string; // Caminho para a imagem da logo (agora sua pixel art)
    nome: string; // Texto que aparecerá embaixo da logo
}

interface ApoiadoresProps {
    titulo: string;
    listaApoiadores: Apoiador[];
}

const Apoiadores: React.FC<ApoiadoresProps> = ({ titulo, listaApoiadores }) => {
    return (
        <div className="apoiadores-container">
            <h2 className="apoiadores-titulo">{titulo}</h2>
            <div className="logos-grid">
                {listaApoiadores.map((apoiador, index) => (
                    <div key={index} className="logo-item">
                        <div className="logo-box">
                            {/* O elemento img carregará sua pixel art */}
                            <Image src={apoiador.logo} alt={`Logo ${apoiador.nome}`} className="logo-imagem" width={200} height={200} />
                        </div>
                        <p className="logo-texto">{apoiador.nome}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Apoiadores;