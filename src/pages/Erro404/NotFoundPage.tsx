import { Nav } from "../../Components/Nav/Nav";
import IdentidadeVisual from "../../icons figma/ANU - Apresentação Identidade Visual (10).png";
import "./NotFoundPage.module.css";


export default function NotFoundPage() {
  return (
    <div className="NotFoundPageWapper">
      <Nav />

      <main className="notfound-container">
        <section className="notfound-top">
          <h1>Ops! Alguma coisa não está certa...</h1>
        </section>

        <section className="notfound-content">
          <div className="notfound-text">
            <p>
              A página que você está tentando acessar não existe.
              <br />
              <br />
              Não se preocupe, isso acontece! Você pode ter digitado o endereço
              errado, ou a página foi movida para uma nova localização.
              <br />
              <br />
              Enquanto resolvemos essa pequena confusão de endereço, que tal
              tentar voltar para a página inicial?
              <br />
              <br />
              Se você acredita que isso é um erro da nossa parte, por favor,
              entre em contato com o suporte. Assim, podemos colocar as coisas
              de volta nos trilhos!
            </p>
            <button className="btn-voltar">Voltar para página inicial</button>
          </div>

          <div className="imagem-direita">
            <img src={IdentidadeVisual} alt="Erro 404" />
          </div>
        </section>
      </main>
    </div>
  )
}

