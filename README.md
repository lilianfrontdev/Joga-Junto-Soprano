# ⚽ Joga Junto Soprano – Copa 2026

O **Joga Junto Soprano** é um álbum de figurinhas digital interativo e sistema de palpites desenvolvido para o time de Marketing e Negócios Digitais da Soprano, celebrando o clima da Copa do Mundo de 2026.

O projeto transforma os colaboradores em figurinhas colecionáveis e conecta todo o departamento a um banco de dados centralizado na nuvem, permitindo que todos interajam, registrem seus palpites e acompanhem as apostas dos colegas em tempo real.

---

## 🚀 Funcionalidades Principais e Fluxo de UX

1. **Álbum de Figurinhas Persistente:** O grid inicial renderiza os cards de forma opaca (cinza). Ao clicar em **⚡ Revelar Próxima**, o sistema dispara uma animação de abertura de pacotes com um pop-up centralizado e explosão de confetes.
2. **Revelação Única:** O progresso do álbum é salvo no `localStorage`. Assim que o usuário revela todos os membros do time, o painel de revelação se oculta automaticamente ao atualizar a página, mantendo o álbum completo visível permanentemente.
3. **Palpites Interativos (Bolão):** Ao clicar em qualquer figurinha já revelada no grid, um modal dinâmico se abre exibindo os confrontos da Copa. O colaborador pode inserir ou atualizar seus placares facilmente.
4. **Painel Geral em Tempo Real:** Substituindo o antigo armazenamento local, o botão **📊 Ver Palpites Gerais** faz uma requisição ao banco de dados na nuvem e monta tabelas comparativas para cada confronto, permitindo o acompanhamento coletivo das apostas.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando desenvolvimento web padrão (Vanilla Web Techs), focando em performance e zero uso de frameworks pesados:

* **HTML5:** Estruturação semântica de layouts responsivos, overlays e containers de modais.
* **CSS3:** Organização em sistemas Flexbox/Grid, variáveis globais (`:root`) para alinhamento com a identidade visual da marca e animações avançadas (`@keyframes`) com transições suavizadas por curvas `cubic-bezier`.
* **JavaScrip:** Gerenciamento de estado assíncrono, manipulação dinâmica do DOM e motor de renderização de confetes.
* **Banco de Dados na Nuvem:** Integração com o **Google Sheets** consumido através da **API do SheetDB** para comunicação rápida e compartilhada entre múltiplos acessos.
