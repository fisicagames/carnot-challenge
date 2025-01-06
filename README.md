# Carnot Game

## Descrição

Carnot Game é um jogo interativo baseado no Ciclo de Carnot, onde o jogador deve alternar entre três fontes térmicas (quente, isolante e fria) para maximizar o trabalho realizado no pistão de um cilindro. O objetivo é manter o pistão operando no ciclo ideal de Carnot, fazendo as trocas de fontes de maneira precisa para evitar a explosão do cilindro ou o seu congelamento. Quanto mais próximo do ciclo de Carnot, maior a pontuação e o progresso do jogador.

### Objetivo

O jogador deve clicar no botão para alternar entre as fontes térmicas do sistema, lembrando-se de manter as transições no momento certo para evitar que o pistão trave ou o cilindro exploda. O ciclo de Carnot é composto por quatro processos termodinâmicos: Expansão isotérmica, Expansão adiabática, Compressão isotérmica e Compressão adiabática.

## Funcionalidades

* **Troca de Fontes Térmicas** : O jogo permite alternar entre a fonte quente, a fonte fria e o isolante com um único botão.
* **Pontuação baseada no Ciclo de Carnot** : Quanto mais preciso for o jogador ao executar as trocas térmicas, mais trabalho é gerado e maior a pontuação.
* **Efeitos Visuais de Temperatura**: As partículas exibem variações de cor (vermelho a azul) e velocidade, refletindo as mudanças de temperatura e a movimentação das partículas no cilindro.
* **Efeitos Visuais de Pressão** : O pistão vibra conforme a pressão interna do cilindro aumenta, que é influenciada pelas colisões reais das partículas.
* **Níveis e Pontuação** : A pontuação do jogador se classifica em diferentes níveis com base na precisão do ciclo, como 'Iniciante', 'Estudante Curioso', até 'Nicolas Léonard Sadi Carnot' para os jogadores mais habilidosos.
* **Limitação de Trocas** : O jogador pode fazer apenas 9 trocas de fontes térmicas, com a última troca resultando em uma explosão caso seja a fonte quente.

## Pontuações e Níveis

* 499-: **Iniciante** 🐣
* 500 - 539: **Estudante Curioso** 🧐
* 540 - 579: **Estudante Aplicado** 📘
* 580 - 619: **Universitário Iniciante** ✏️
* 620 - 659: **Universitário Dedicado** 📚
* 660 - 699: **Professor de Física** 🧑‍🏫
* 700 - 709: **Professor de Termodinâmica** 🔥
* 710 - 719: **Gênio da Física** 🧠
* 720+: **Nicolas Léonard Sadi Carnot** ⚙️

## Tecnologias Utilizadas

* **TypeScript** : Linguagem de programação.
* **Babylon.js** : Motor gráfico para a renderização 3D.
* **Havok** : Motor de física (para interações físicas realistas).
* **Vite.js** : Ferramenta para build e desenvolvimento.
* **VS Code** : Editor de código.
* **GitHub** : Plataforma para controle de versão e colaboração.
* **Arquitetura MVC** : Utilizada para organizar o código com eventos baseados em acessos por interfaces e retornos por callbacks.

## Instalação

1. **Pré-requisitos** :

* Node.js
* Babylon.js
* Havok
* Vite.js

1. **Instalação** :
   Clone o repositório ou copie o código para o seu ambiente local.
   No terminal, execute:

<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">bash</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center select-none py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar código</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">npm install
   </code></div></div></pre>

1. **Rodando o projeto localmente** :
   Para iniciar o servidor de desenvolvimento:

<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">bash</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center select-none py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar código</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">npm run dev
   </code></div></div></pre>

   Para gerar os arquivos de distribuição:

<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">bash</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center select-none py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar código</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">npm run build
   </code></div></div></pre>

## Como Jogar

#### Objetivo:

Realizar as trocas de fontes térmicas (quente, fria e isolante) de maneira eficiente para maximizar o trabalho gerado e evitar que o pistão trave ou o cilindro exploda.

#### Controles:

O jogo é controlado por um único botão para alternar entre as fontes térmicas.

#### Desafios:

* **Troca de Fontes** : O jogador pode realizar até 9 trocas de fontes térmicas, com a última troca resultando em uma explosão do cilindro se for feita com a fonte quente.
* **Emperramento do Pistão** : O pistão pode emperrar nos limites de volume máximo ou mínimo se o tempo de troca não for adequado.
* **Pontuação** : O jogador é recompensado com pontos com base em quão perto o ciclo chega do ciclo ideal de Carnot.

# **Alterar Idioma**

 Você pode mudar entre os idiomas **Português** e **Inglês** clicando no botão no canto superior direito.

# Telas do Jogo

![1736179748201](image/README/1736179748201.png) ![1736179767389](image/README/1736179767389.png) ![1736179798065](image/README/1736179798065.png) ![1736179831530](image/README/1736179831530.png)

## Contribuindo

Este projeto ainda está privado. No entanto, se você deseja contribuir, fique à vontade para seguir os seguintes passos quando o repositório for aberto:

1. Clone o repositório.
2. Crie uma nova branch:
   <pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">bash</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center select-none py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar código</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">git checkout -b nome-da-sua-branch
   </code></div></div></pre>
3. Realize as alterações.
4. Envie um pull request para revisão.

## Licença

Este projeto é protegido por direitos autorais e está sob  **licença proprietária** . Não está disponível para distribuição, modificação ou uso comercial sem a permissão explícita do autor.

**Copyright** (c) 2024 Rafael João Ribeiro.

### Aviso sobre Bibliotecas de Terceiros

Este projeto utiliza as seguintes bibliotecas de terceiros, cujas licenças devem ser respeitadas:

* **Babylon.js** : Licenciado sob a [Licença Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).
* **Havok** : Licenciado conforme os termos do fornecedor.
* **Vite.js** : Licenciado sob a [Licença MIT]().

Certifique-se de consultar as licenças de bibliotecas de terceiros para garantir conformidade com os termos de uso.

Por enquanto, este projeto não está disponível com uma licença pública.

## Autor

Este projeto foi desenvolvido por:

* **Prof. Dr. Rafael João Ribeiro**
  Instituto Federal do Paraná (IFPR)
  [www.fisicagames.com.br](https://www.fisicagames.com.br)
