var alugaCarro = angular.module("aluguelCarro", []);
enderecoURL = "http://localhost:8080/ws_locadora/";


alugaCarro.controller("aluguelCarroCtrl", function($scope, $http) {
    $scope.nomeAplicacao = "Aluguel de Carros - Versão AngularJS";

    //Função de tratamento de erros
    var trata_erro = function (nome_tabela, codigo) {
       
        if (codigo == 400) {
            erro = "Erro na recuperação dos dados da tabela [" + nome_tabela + "]! 400 requisição inválida";
        }
        else if (codigo == 401) {
            erro = "Erro na recuperação dos dados da tabela [" + nome_tabela + "]! 401 não autorizado";
        }
        else if (codigo == 403) {
            erro = "Erro na recuperação dos dados da tabela [" + nome_tabela + "]! 403 proibido";
        }
        else  if (codigo == 404) {
            erro = "Erro na recuperação dos dados da tabela [" + nome_tabela + "]! 404 página não encontrada";
        }
        else if (codigo == 405) {
            erro = "Erro na recuperação dos dados da tabela [" + nome_tabela + "]! 405 método não permitido";
        }
        else if (codigo == 500) {
            erro = "Erro na recuperação dos dados da tabela [" + nome_tabela + "]! 500 erro interno do servidor";
        }
        else if (codigo == 502) {
            erro = "Erro na recuperação dos dados da tabela [" + nome_tabela + "]! 502 bad gateway";
        }
        else if (codigo == 503) {
            erro = "Erro na recuperação dos dados da tabela [" + nome_tabela + "]! 503 gateway time-out";
        }
        else if (codigo == 504) {
            erro = "Erro na recuperação dos dados da tabela [" + nome_tabela + "]! 504 página não encontrada";
        }
        else {
            erro = "Erro indefinido!";
        }
    }

    //Carrega as marcas dos veículos
    $http.get(enderecoURL + "lista_dados.php?tabela=marca").then(function (resposta) {
        $scope.listaMarcas = resposta.data.marcas;
    }, function (resposta) {
        trata_erro("marca", resposta.status);
        $scope.mensagem = erro;
    });

    //Carrega os modelos dos veículos
    $http.get(enderecoURL + "lista_dados.php?tabela=modelo").then(function (resposta) {
            $scope.listaModelos = resposta.data.modelos;
    }, function (resposta) {
        trata_erro("modelo", resposta.status);
        $scope.mensagem = erro;
    });

    //Carrega os tipos de veículos
    $http.get(enderecoURL + "lista_dados.php?tabela=tipo_veiculo").then(function (resposta) {
        $scope.listaTipos = resposta.data.tipos;
    }, function (resposta) {
        trata_erro("tipo_veiculo", resposta.status);
        $scope.mensagem = erro;
    });

    //Carrega as cores
    $http.get(enderecoURL + "lista_dados.php?tabela=cor_veiculo").then(function (resposta) {
        $scope.listaCores = resposta.data.cores;
    }, function (resposta) {
        trata_erro("cor_veiculo", resposta.status);
        $scope.mensagem = erro;
    });

    //Carrega os tipos de combustíveis
    $http.get(enderecoURL + "lista_dados.php?tabela=combustivel").then(function (resposta) {
            $scope.listaCombustiveis = resposta.data.combustiveis;
    }, function (resposta) {
        trata_erro("combustivel", resposta.status);
        $scope.mensagem = erro;
    });

    //Carrega a lista de veículos
    var carregarVeiculos = function() {
        $http.get(enderecoURL + "lista_dados.php?tabela=veiculo").then(function(resposta) {
            $scope.listaVeiculos = resposta.data.veiculos;
        }, function (resposta) {
            trata_erro("veiculo", resposta.status);
            $scope.mensagem = erro;
        });
    }

    carregarVeiculos();

    $scope.adicionarCarro = function (carro) {
        veiculo = '{"marca":"' + carro.Marca["CodigoMarca"] + 
                  '","modelo":"' + carro.Modelo["CodigoModelo"] +
                  '","placa":"' + carro.Placa +
                  '","tipo":"' + carro.Tipo["CodigoTipo"] +
                  '","cor":"' + carro.Cor["CodigoCor"] +
                  '","ano_modelo":"' + carro.AnoModelo +
                  '","combustivel":"' + carro.Combustivel["CodigoCombustivel"] +
                  '","diaria":"' + carro.Diaria + '"}';

        $http.post(enderecoURL + "adiciona_veiculo.php", veiculo).then(function (resposta) {
            console.log(resposta)
            carregarVeiculos();
            delete $scope.carro;
            $scope.CadastroVeiculo.$setPristine();
        }, function (resposta) {
            trata_erro("veiculo", resposta.status);
            $scope.mensagem = erro;
        });
    };
});