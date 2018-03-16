# b2w-desafio



<h1>Instruções</h1>

<ul>
<li>Comando para instalar as dependências do projeto: <b>npm install</b></li>
<li>Comando para rodar o servidor: <b>npm start</b></li>
<li>Comando para rodar os testes automatizados: <b>npm test</b></li>
</ul>

Para facilitar a execução do projeto, os arquivos de configuração estão dentro da pasta config, foram criados três arquivos,
um para cada ambiente, são eles: 

<ul>
<li>development.yml</li>
<li>test.yml</li>
<li>production.yml</li>
</ul>

O ambiente é determinado com base no valor da variável de ambiente NODE_ENV, podendo ser development, production ou test. 
Caso nenhum valor seja configurado para essa variável, o ambiente development será assumido.

<b>obs:</b> Por padrão o comando <b>npm test</b> configura automaticamente a variável NODE_ENV para o ambiente de teste.



