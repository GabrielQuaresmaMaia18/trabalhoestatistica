function calcularEstatisticas() {
    var dadosInput = document.getElementById('dados');
    var resultadosDiv = document.getElementById('resultados');
    var histogramaDiv = document.getElementById('histograma');
    var resultadosCombinatoriosDiv = document.getElementById('resultadosCombinatorios');

    var dados = dadosInput.value.split(',').map(function (item) {
        return parseFloat(item.trim());
    });

    var media = calcularMedia(dados);
    var mediana = calcularMediana(dados);
    var moda = calcularModa(dados);
    var variancia = calcularVariancia(dados);
    var desvioPadrao = calcularDesvioPadrao(dados);
    var coefVariacao = calcularCoefVariacao(media, desvioPadrao);

    resultadosDiv.innerHTML = `
        <p>Média: ${media}</p>
        <p>Mediana: ${mediana}</p>
        <p>Moda: ${moda}</p>
        <p>Variância: ${variancia}</p>
        <p>Desvio Padrão: ${desvioPadrao}</p>
        <p>Coeficiente de Variação: ${coefVariacao}%</p>
    `;

    gerarHistograma(dados, histogramaDiv);

    // Cálculos de Permutação, Arranjo e Combinação
    var n = dados.length; // Número de elementos
    var r = 3; // Valor de r para os cálculos (pode ser ajustado)

    var permutacaoResult = permutacao(n, r);
    var arranjoResult = arranjo(n, r);
    var combinacaoResult = combinacao(n, r);

    var permutacaoRepResult = permutacaoComRepeticao(n, r);
    var arranjoRepResult = arranjoComRepeticao(n, r);
    var combinacaoRepResult = combinacaoComRepeticao(n, r);

    resultadosCombinatoriosDiv.innerHTML = `
        <p>Permutação: ${permutacaoResult}</p>
        <p>Arranjo: ${arranjoResult}</p>
        <p>Combinação: ${combinacaoResult}</p>
        <p>Permutação com Repetição: ${permutacaoRepResult}</p>
        <p>Arranjo com Repetição: ${arranjoRepResult}</p>
        <p>Combinação com Repetição: ${combinacaoRepResult}</p>
    `;
}

// Funções de Cálculos Estatísticos
function calcularMedia(dados) {
    return dados.reduce((acc, curr) => acc + curr, 0) / dados.length;
}

function calcularMediana(dados) {
    var sorted = dados.slice().sort((a, b) => a - b);
    var meio = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[meio - 1] + sorted[meio]) / 2;
    } else {
        return sorted[meio];
    }
}

function calcularModa(dados) {
    var contagem = {};
    dados.forEach(function (numero) {
        contagem[numero] = (contagem[numero] || 0) + 1;
    });

    var moda = [];
    var maxContagem = 0;
    for (var numero in contagem) {
        if (contagem.hasOwnProperty(numero)) {
            if (contagem[numero] > maxContagem) {
                moda = [numero];
                maxContagem = contagem[numero];
            } else if (contagem[numero] === maxContagem) {
                moda.push(numero);
            }
        }
    }

    return moda.join(', ');
}

function calcularVariancia(dados) {
    var media = calcularMedia(dados);
    var somaDiferencasQuadradas = dados.reduce((acc, curr) => acc + Math.pow(curr - media, 2), 0);
    return somaDiferencasQuadradas / dados.length;
}

function calcularDesvioPadrao(dados) {
    return Math.sqrt(calcularVariancia(dados));
}

function calcularCoefVariacao(media, desvioPadrao) {
    return (desvioPadrao / media) * 100;
}

function gerarHistograma(dados, histogramaDiv) {
    histogramaDiv.innerHTML = ''; // Limpar o conteúdo anterior

    var trace = {
        x: dados,
        type: 'histogram',
        marker: {
            color: 'rgba(100, 149, 237, 0.6)',
        },
    };

    var layout = {
        title: 'Histograma de Frequência',
        xaxis: { title: 'Valor' },
        yaxis: { title: 'Frequência' },
    };

    Plotly.newPlot(histogramaDiv, [trace], layout);
}

// Funções para cálculos de Permutação, Arranjo e Combinação (simples)
function fatorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * fatorial(n - 1);
    }
}

function permutacao(n, r) {
    return fatorial(n) / fatorial(n - r);
}

function arranjo(n, r) {
    return fatorial(n) / fatorial(n - r);
}

function combinacao(n, r) {
    return fatorial(n) / (fatorial(r) * fatorial(n - r));
}

// Funções para cálculos de Permutação, Arranjo e Combinação com Repetição
function permutacaoComRepeticao(n, r) {
    return Math.pow(n, r);
}

function arranjoComRepeticao(n, r) {
    return Math.pow(n, r);
}

function combinacaoComRepeticao(n, r) {
    return combinacao(n + r - 1, r);
}
