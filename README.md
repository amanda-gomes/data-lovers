# Data Lovers

## Índice

* [Descrição](#resumo-do-projeto)
* [Parte opcional](#parte-opcional-hacker-edition)
* [Considerações técnicas](#considerações-técnicas)
* [Primeiros passos](#primeiros-passos)
* [Conteúdo de referência](#conteúdo-de-referência)
* [Checklist](#checklist)

***

## Resumo do projeto

Neste projeto **desenvolvemos uma _página web_ para visualizar um
_conjunto (set) de dados_** que se adeque ao que seu usuário necessita.
Área de interesse escolhida:

* [Indicadores de desenvolvimento](src/data/worldbank/worldbank.json):
  Indicadores de desenvolvimento do Banco Mundial de alguns países (Brasil, Chile, México e Peru). Estes dados incluim indicadores

Com esses dados, criamos uma página web que permite **visualizar os dados,
filtrá-los e fazer algum cálculo agregado**. 

### Definição do produto

#### Persona:
- Um grupo de invetidores que deseja investir em startups sociais no Brasil, Perú e Chile.

#### Objetivo da persona:
- Investidores que possuem uma vasta carteira de investimento na América do Norte e Europa com investimentos em startups e iniciativas sociais.

#### Solução do problema:
- Os investimentos serão realizados conforme os indicadores de desenvolvimento destes países. Foi solicitado pelo usuário uma aplicação web na qual seja possível analisar de forma comparativa entre os 3 países cada indicador e o valor de cada indicador nos anos de 2015 à 2017 em cada país.


### Desenho da interface de usuário

#### Protótipo
- O protótipo foi desenvolvido utilizando o aplicativo Marvel:

[Protótipo Marvel](https://marvelapp.com/4f85cje/screen/53773929)


1. Primeiro gráfico:

![Página_Inicial_-_clicando_no_país_`Brasil`](src/img/inicial_1.jpg)

![Página Brasil - clicando no setor `Saúde`](src/img/brasil_1.png)

![Página Setor Saúde no Brasil](src/img/indicador_por_pais.png)


2. Segundo gráfico:

![Página Inicial - clicando no país `Brasil`](src/img/inicial_1.png)

![Página Brasil - selecionando o período `2010`](src/img/brasil_2.png)

![Página por Período no Brasil](src/img/indicadores_pais_por_ano.png)


3. Terceiro gráfico:

![Página Inicial - clicando no setor `Saúde`](src/img/inicial_2.png)

![Página Setor Saúde Geral](src/img/indicador_de_todos_os_paises.png)


4. Quarto gráfico:

![Página Inicial - selecionando o período `2010`](src/img/inicial_3.png)

![Página por Período Geral](src/img/indicador_de_todos_os_paises_por_ano.png)

#### Testes de usabilidade

Durante o desafio você deverá realizar testes de usabilidade com diversos
usuários. Com base nos resultados dos testes, você deverá reorganizar seu
protótipo. Documente as diversas iterações para ter ideia da evolução e para
conseguir resgatar ideias mais tarde.

### Implementação de Interface de Usuário (HTML/CSS/JS)

Logo após desenhar sua interface de usuário você deverá trabalhar em sua
implementação. Como mencionamos, **não** é necessário que desenvolva uma
interface tal como a desenhou. Você terá um tempo limitado para codar, então,
deverá priorizar. Como mínimo, sua implementação deve:

1. Mostrar os dados em uma interface: pode ser um card, uma tabela, uma
   lista, etc.
2. Permitir ao usuário filtrar e ordenar os dados.
3. Calcular estatísticas como média aritmética, máximo e/ou mínimo de algum
   atributo numérico, ou contar quantas vezes aparece um determinado valor,
   por exemplo.

## Parte Opcional (Hacker edition)

Features/características extras sugeridas:
* No lugar de consumir os dados de forma estática, você pode trabalhar com
  eles de forma dinâmica, carregando um arquivo JSON por meio de um `fetch`.
  A pasta `src/data` contém  uma versão `.js` e uma `.json` de cada set
  de dados.
* Agregar em sua interface de usuário visualizações gráficas. Para isso,
  recomendamos explorar bibliotecas de gráficos como [Chart.js](https://www.chartjs.org/) ou [Google Charts](https://developers.google.com/chart/).

[Vídeo do Dani usando o HighCharts](https://www.youtube.com/watch?v=MTXoCp2D7Ps)
[Vídeo da Ju usando o Google Charts](https://youtu.be/ueixcpZ65oc)

## Considerações técnicas

A lógica do projeto deve estar implementada completamente em JavaScript
(ES6), HTML e CSS. Neste projeto NÃO está permitido usar bibliotecas ou
frameworks, somente [vanilla JavaScript](https://medium.com/laboratoria-how-to/vanillajs-vs-jquery-31e623bbd46e), com exceção das
bibliotecas para fazer gráficos (charts).
Você não deve utilizar a _pseudo-variable_ `this`.
O _boilerplate_ contém uma estrutura de arquivos como ponto de partida
assim como toda configuração de dependências:

```text
.
├── README.md
└──src
    ├── data
    │   ├── injuries
    │   │   ├── injuries.js
    │   │   └── injuries.json
    │   ├── lol
    │   │   ├── lol.js
    │   │   └── lol.json
    │   ├── pokemon
    │   │   ├── pokemon.js
    │   │   └── pokemon.json
    │   ├── steam
    │   │   ├── steam.js
    │   │   └── steam.json
    │   └── worldbank
    │       ├── worldbank.js
    │       └── worldbank.json
    ├── index.html
    ├── main.js
    └── style.css

8 directories, 16 files
```

### `src/index.html`

Assim como no projeto anterior, existe um arquivo `index.html`. Como
você já sabe, aqui vai a página que se mostrará ao usuário. Também nos serve para indicar que scripts serão usados e unir tudo que fizemos.

Neste arquivo você encontrará uma série de _etiquetas_ (_tags_) `<script>`
_comentadas_. Para _carregar_ as diferentes fontes de dados você terá que
_descomentar_ estas _tags_. Cada um destes scripts vai atribuir uma
variável global com os dados correspondentes a essa fonte de dados.

Por exemplo, se descomentamos a seguinte linha:

```html
<!-- <script src="./data/worldbank/worldbank.js"></script> -->
```

A linha ficaria assiim:

```html
<script src="./data/worldbank/worldbank.js"></script>
```

E agora teríamos a variável global `WORLDBANK` disponível em nossos
outros scripts (como `src/data.js` ou `src/main.js`).

### `src/main.js`

Recomendamos usar `src/main.js` para toda a parte do seu código destinada
a mostrar dados na tela. Com isto nos referimos basicamente as manipulações de DOM: operações como criação de nós, registro de manipuladores de eventos (_event listeners_ o _event handlers_), etc.

Esta não é a única forma de dividir seu código. Você pode usar mais arquivos e pastas para que sua estrutura fique clara para suas companheiras.

### `src/data`

Nesta pasta estão os dados das diferentes fontes. Você encontrará uma pasta para cada fonte e dentro de cada pasta dois arquivos: um com a extensão `.js` e outro `.json`. Ambos arquivos contêm os mesmos dados; a diferença é que o `.js` usaremos através de uma tag `<script>`, enquanto
que o `.json` está aí para que você possa, caso queira, carregar os dados de forma assíncrona com [`fetch()`](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API).

## Avaliação

Te aconselhamos revisar [a rúbrica](https://docs.google.com/spreadsheets/d/1hwyBoJWbA0MHGEMDLKqftIv64IhA1uKe2kmJhYpir4s/edit#gid=2045120301)
para ver a descrição detalhada de cada _habilidade_ e cada _nível_.

Esta é uma lista de todas as habilidades que avaliaremos ao final deste projeto:

### Tech

**CS**
Lógica
Arquitetura
Padrões/Paradigmas
**SCM**
Git
GitHub
**JavaScript**
Nomenclatura/semântica
Funções/modularidade
Estruturas de dados
**HTML**
Validação
Semântica
**CSS**
DRY

***

## Dicas de como começar a trabalhar no projeto

Antes de começar a escrever o código, você deve definir o que será feito
com base nos conhecimentos que você possa obter dos usuários do seu
produto. Essas perguntas podem te ajudar:

* Quem são os principais usuários de seu produto?
* Quais são os objetivos de seu usuário com relação ao seu produto?
* Quais os dados mais importantes que eles querem ver em sua interface?
* Quando utilizam ou utilizariam seu produto?

Quando já estiver pronta para codar, te recomendamos começar desta forma:

1. Uma das integrantes da dupla deve realizar um :fork_and_knife:
   [fork](https://help.github.com/articles/fork-a-repo/) do repositório.
   Seus _mentores_ compartilharão um _link_ que te dará acesso ao repo.
   A outra integrante deve fazer um **fork do repositório de sua companheira**
   e trabalharem juntas.
2. :arrow_down: [Clone](https://help.github.com/articles/cloning-a-repository/)
   seu _fork_ para seu computador (cópia local).
3. Let's code! :rocket:

***

## Conteúdo de referência

### Experiência de Usuário (UX Design)

* Entrevistas com usuários
* Princípios de usabilidade

### Desenvolvimento Front-end

* Unidade de arrays no curso de JavaScript no LMS.
* Unidade de objetos no curso de JavaScript no LMS.
* Unidade de funções no curso de JavaScript no LMS.
* Unidade de DOM no curso de Browser JavaScript no LMS.
* [Array no MDN](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Referencia/Objetos_globales/Array)
* [Array.sort no MDN](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Referencia/Objetos_globales/Array/sort)
* [Array.map no MDN](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Referencia/Objetos_globales/Array/map)
* [Array.filter no MDN](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Referencia/Objetos_globales/Array/filter)
* [Array.reduce no MDN](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Referencia/Objetos_globales/Array/reduce)
* [Array.forEach no MDN](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach)
* [Object.keys no MDN](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Referencia/Objetos_globales/Object/keys)
* [Object.entries no MDN](https://developer.mozilla.org/pt-br/docs/Web/JavaScript/Referencia/Objetos_globales/Object/entries)
* [Fetch API no MDN](https://developer.mozilla.org/pt-br/docs/Web/API/Fetch_API)
* [json.org](https://json.org/json-pt.html)

***

## Checklist

* [ ] Usar VanillaJS.
* [ ] Inclui _Definição de produto_ clara e informativa no `README.md`.
* [ ] Inclui esboço da solução (protótipo de baixa fidelidade e de alta fidelidade, se houver) no
  `README.md`.
* [ ] Inclui a lista de problema detectados através dos testes de usabilidade
  no `README.md`.
* [ ] UI: Mostra lista e/ou tabela com dados e/ou indicadores.
* [ ] UI: Permite ordenar os dados por meio de um ou mais campos
  (asc e desc).
* [ ] UI: Permite filtrar os dados com base em uma condição.