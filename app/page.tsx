import Image from "next/image";
import StatusBox from '@/app/props/StatusBox';
import ServerStatusBox from "@/app/props/ServerStatusBox";
import Apoiadores from '@/app/props/Apoiador-Box';

// Apoiadores
import LunaImg from '@/app/resources/imgs/luna_figure2.png';
import GuiImg from '@/app/resources/imgs/Gui_figure2.png';
import JanieImg from '@/app/resources/imgs/Janie_figure2.png';
import GertulioImg from '@/app/resources/imgs/Gertulio_figure2.png';
import LaoImg from '@/app/resources/imgs/Lao_figure2.png';
import LawImg from '@/app/resources/imgs/Law_figure2.png';
import PaxImg from '@/app/resources/imgs/Pax_figure2.png';
import PhilImg from '@/app/resources/imgs/Phil_figure2.png';
import PodroImg from '@/app/resources/imgs/Podro_figure2.png';
import RonaldoImg from '@/app/resources/imgs/ronaldo_figure2.png';
import WellsImg from '@/app/resources/imgs/wells_figure2.png';


export default function Home() {
    const meusApoiadores = [
        { logo: GertulioImg.src, nome: 'Gertulio Quietude'},
        { logo: GuiImg.src, nome: 'Guilherme Carneiro Mendes'},
        { logo: JanieImg.src, nome: 'Janie Smith Coelho da Silva'},
        { logo: LaoImg.src, nome: 'Lao Tsung'},
        { logo: LunaImg.src, nome: 'Lunara Gooben'},
        { logo: LawImg.src, nome: 'Law Law'},
        { logo: PaxImg.src, nome: 'Pax Kally'},
        { logo: PhilImg.src, nome: 'Phil-Mal'},
        { logo: PodroImg.src, nome: 'Podro Coelho da Silva'},
        { logo: RonaldoImg.src, nome: 'Renomado Ronaldo Raimundo'},
        { logo: WellsImg.src, nome: 'Wells Chaplon'},
    ];
  return (
      <div className="wrap">
          <header>
              <div className="logo">
                  <div className="logo-mark">LOGO</div>
                  <div>
                      <div className="logo-name">Bem-vindo(a)</div>
                      <div className="small">Você parece legal • Olá</div>
                  </div>
              </div>
              <nav>
                  <a className="small" href="#">Entrar</a>
              </nav>
          </header>

          <main className="main">
              <div>
                  <h1 className="title" data-text="ESTAÇÃO ANDRÔMEDA">ESTAÇÃO ANDRÔMEDA</h1>
                  <p className="subtitle"> BR | MRP+ | Para quem de fato gosta de Roleplay</p>

                  <div className="panel">
                      <div className="info">
                          <div className="ip">ss14://estacaoandromeda.xyz:1212</div>
                          <a className="btn btn-join">Jogar</a>
                          <a className="btn btn-ghost" target='_blank' href='https://discord.com/invite/FPq47bAZup' >Discord</a>
                      </div>
                      <p className="small" style={{marginTop: 12}}>Dica: use <span>Ahelp</span> para chamar a staff.</p>
                  </div>
              </div>

              <aside className="side">
                  <ServerStatusBox />

                  <StatusBox
                      title="Próximo evento"
                      content="Circo Day — 2/nov • 14:00"
                  />
                  <a href="https://wiki.estacaoandromeda.xyz">
                  <StatusBox
                      title="Wiki"
                      content="Veja a nossa Wiki e aprenda mais sobre o jogo."
                  />
                  </a>
              </aside>
          </main>

          <Apoiadores titulo="Apoiadores" listaApoiadores={meusApoiadores} />

          <footer>
              © Estação Andrômeda e comunidade - 2025 • versão alpha
          </footer>
      </div>
  );
}
