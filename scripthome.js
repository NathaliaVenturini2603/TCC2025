
        document.querySelector("button").addEventListener("click", () => {
            alert("Em breve disponível na Play Store e App Store!");
        });
      
//  SCRIPT PARA MOSTRAR PRODUTORES 
       
            const produtoresPorCidade = {
                cidade1: [
                    { nome: "João da Horta", contato: "(17) 91234-5678" },
                    { nome: "Maria do Leite", contato: "(17) 99876-5432" }
                ],
                cidade2: [
                    { nome: "Carlos dos Ovos", contato: "(17) 91111-2222" },
                    { nome: "Ana da Fruta", contato: "(17) 93333-4444" }
                ],
                cidade3: [
                    { nome: "Pedro da Fazenda", contato: "(17) 95555-6666" }
                ]
            };
    
            const selectCidade = document.getElementById("select-cidade");
            const listaProdutores = document.getElementById("lista-produtores");
    
            selectCidade.addEventListener("change", () => {
                const cidadeSelecionada = selectCidade.value;
                listaProdutores.innerHTML = ""; // limpa a lista
    
                if (cidadeSelecionada && produtoresPorCidade[cidadeSelecionada]) {
                    produtoresPorCidade[cidadeSelecionada].forEach(produtor => {
                        const div = document.createElement("div");
                        div.innerHTML = `<strong>${produtor.nome}</strong><br>📞 ${produtor.contato}<hr>`;
                        listaProdutores.appendChild(div);
                    });
                } else {
                    listaProdutores.innerHTML = "<p>Nenhum produtor encontrado para esta cidade.</p>";
                }
            });
        