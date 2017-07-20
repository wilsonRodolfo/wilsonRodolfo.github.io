
var Carrinho = {
    
    setTable: function () {
        var table = document.getElementById('tb-carrinho');
        TableController.setTable(table);
    },

    listaCarrinho: function () {
        Carrinho.setTable();
        var produtos = CarrinhoDAO.retrieve();
        if (produtos && produtos.length) {
            TableController.addListCarrinho(produtos, Carrinho.remove);
        }
    },

    add: function (id) {
        let cliente = sessao.checkAndGetUser();
        if (cliente) {
            DB_KEY = cliente.email;
            if (CarrinhoDAO.save(DB_KEY, id) == -1) {
                window.alert("Ocorreu algum erro, não foi possivel add o produto no carrinho!");
                return;
            }
            document.getElementById('quantCarrinho').textContent = CarrinhoDAO.getQuant();
        } else {
            window.location.href = "login.html";
        }
    },

    remove: function (productID) {

		/*if(confirm("Are you sure about to remove " + email)) {
			var subscriber = SubscriberDAO.get(email);
			if (subscriber) {
				if(SubscriberDAO.delete(email)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}*/
    }
};