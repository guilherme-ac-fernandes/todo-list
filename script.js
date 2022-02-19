/* eslint-disable sonarjs/no-duplicate-string */
// Função para criar uma lista ordenada
function criarListaOrdenada() {
  const header = document.getElementById('header');
  const listaOrdenda = document.createElement('ol');
  listaOrdenda.id = 'lista-tarefas';
  header.appendChild(listaOrdenda);
}
criarListaOrdenada();

// Criar função para adcionar tarefa na lista ordenada e limpar o input
const listaPosicao = document.getElementById('lista-tarefas');
const inputPosicao = document.getElementById('texto-tarefa');
const botaoPosicao = document.getElementById('criar-tarefa');
botaoPosicao.addEventListener('click', () => {
  const tarefa = document.createElement('li');
  tarefa.innerText = inputPosicao.value;
  tarefa.classList.add('tarefa');
  listaPosicao.appendChild(tarefa);
  inputPosicao.value = '';
});

// Ao clicar em alguem item da lista a cor de fundo deve mudar para cinza
listaPosicao.addEventListener('click', (event) => {
  const tarefas = listaPosicao.children;
  for (let i = 0; i < tarefas.length; i += 1) {
    tarefas[i].classList.remove('selecionado');
  }
  event.target.classList.add('selecionado');
});

// Clicar duas vezes em um elemento faz com ele seja riscado (deve ser possível remover ao clicar duas vezes novamente)
listaPosicao.addEventListener('dblclick', (event) => {
  // a funcionalidade do .toggle está presente no link em sequência
  // source: https://www.digitalocean.com/community/tutorials/js-classlist
  // Explicação: Quando não tem a class especificada ele adiciona, mas se tiver ele remove
  event.target.classList.toggle('completed');
});

// Criar botão capaz de limpar as informações adicionadas na lista
const botaoLimparLista = document.getElementById('apaga-tudo');
botaoLimparLista.addEventListener('click', () => {
  const listaOrdenda = document.querySelector('#lista-tarefas');
  const listasRemover = document.querySelectorAll('.tarefa');
  for (let d = 0; d < listasRemover.length; d += 1) {
    const listaRemover = listasRemover[d];
    listaOrdenda.removeChild(listaRemover);
  }
});

// Criar botão capaz de remover os itens completos (com a class 'completed')
const botaoLimparFinalizados = document.getElementById('remover-finalizados');
botaoLimparFinalizados.addEventListener('click', () => {
  const listaOrdenda = document.querySelector('#lista-tarefas');
  const tarefasCompletas = document.querySelectorAll('.completed');
  for (let j = 0; j < tarefasCompletas.length; j += 1) {
    const completos = tarefasCompletas[j];
    listaOrdenda.removeChild(completos);
  }
});

// Criar botão que salva o conteúdo da lista no localStorage com as configurações
const botaoSalvaLista = document.getElementById('salvar-tarefas');
botaoSalvaLista.addEventListener('click', () => {
  const linhas = document.getElementById('lista-tarefas').children;
  for (let k = 0; k < linhas.length; k += 1) {
    const string = k.toString();
    const informacao = linhas[k].innerText;
    localStorage.setItem(string, informacao);
  }
  for (let l = 0; l < linhas.length; l += 1) {
    const stringClass = `class${l.toString()}`;
    const classes = linhas[l].className;
    localStorage.setItem(stringClass, classes);
  }
});

// Renderização da lista
function renderizarLista() {
  const tamanho = localStorage.length / 2;
  for (let w = 0; w < tamanho; w += 1) {
    const numero = w.toString();
    const elemento = localStorage.getItem(numero);
    const classeNumero = `class${w.toString()}`;
    const elementoClass = localStorage.getItem(classeNumero);
    const linha = document.createElement('li');
    linha.innerText = elemento;
    linha.className = elementoClass;
    listaPosicao.appendChild(linha);
  }
}
renderizarLista();

// Criar função para movimentar os itens na lista

// PROBLEMA
function checagemCima() {
  const posicao = document.querySelector('.selecionado');
  if (posicao === null) {
    // alert('Nada foi selecionado');
    console.log(false);
    return false;
  } if (posicao.previousSibling === null) {
    // alert('Movimento inválido');
    console.log(false);
    return false;
  }
  console.log(true);
  return true;
}

function checagemBaixo() {
  const posicao = document.querySelector('.selecionado');
  if (posicao === null) {
    // alert('Nada foi selecionado');
    console.log(false);
    return false;
  } if (posicao.nextSibling === null) {
    // alert('Movimento inválido');
    console.log(false);
    return false;
  }
  console.log(true);
  return true;
}

const botaoCima = document.querySelector('#mover-cima');
botaoCima.addEventListener('click', () => {
  const posicaoAtual = document.querySelector('.selecionado');
  if (checagemCima() === true) {
    const posicaoSuperior = document.querySelector('.selecionado').previousSibling;
    const classSuperior = posicaoSuperior.className;
    const classAtual = posicaoAtual.className;
    let superiorText = posicaoSuperior.innerText;
    let atualText = posicaoAtual.innerText;
    const auxiliar = superiorText;
    superiorText = atualText;
    atualText = auxiliar;
    posicaoAtual.innerText = atualText;
    posicaoSuperior.innerText = superiorText;
    posicaoAtual.className = classSuperior;
    posicaoSuperior.className = classAtual;
  }
});

const botaoBaixo = document.querySelector('#mover-baixo');
botaoBaixo.addEventListener('click', () => {
  const posicaoAtual = document.querySelector('.selecionado');
  if (checagemBaixo() === true) {
    const posicaoInferior = document.querySelector('.selecionado').nextSibling;
    const classAtual = posicaoAtual.className;
    const classInferior = posicaoInferior.className;
    let atualText = posicaoAtual.innerText;
    let inferiorText = posicaoInferior.innerText;
    const auxiliar = inferiorText;
    inferiorText = atualText;
    atualText = auxiliar;
    posicaoAtual.innerText = atualText;
    posicaoInferior.innerText = inferiorText;
    posicaoAtual.className = classInferior;
    posicaoInferior.className = classAtual;
  }
});

// Criar função de remover apenas um item da lista
const botaoRemoverItem = document.getElementById('remover-selecionado');
botaoRemoverItem.addEventListener('click', () => {
  const atualPosicao = document.querySelector('.selecionado');
  listaPosicao.removeChild(atualPosicao);
});
