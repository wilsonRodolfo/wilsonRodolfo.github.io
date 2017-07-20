
var CarrinhoDAO = {

    list: [],
    NEW: 1,
    UPDATE: 2,
    ERRO: -1,

    save: function (DB_KEY, idProduto) {
        CarrinhoDAO.unserializeAndParse(DB_KEY);
        let retorno = CarrinhoDAO.ERRO;

        var list = CarrinhoDAO.list, index = CarrinhoDAO.getIndex(idProduto);

        if (index > -1) {
            list[index].quantidade = String(parseInt(list[index].quantidade) + 1);
            console.log("Produto já existe... Add mais uma unidade");
            retorno = CarrinhoDAO.UPDATE;
        }
        else {
            let produto = ProdutoDAO.get(idProduto);
            produto.quantidade = '1';
            list.push(produto);
            retorno = CarrinhoDAO.NEW;
        }
        CarrinhoDAO.serializeAndSave(DB_KEY);
        return retorno;
    },
    
    getIndex: function (id) {
        var list = CarrinhoDAO.list,
            item = {};

        for (var i = 0; i < list.length; i++) {
            item = list[i];
            if (item.id == id) {
                return i;
            }
        }

        return -1;
    },

    retrieve: function () {
        let cliente = sessao.checkAndGetUser();
        if (cliente) {
            DB_KEY = cliente.email;
            CarrinhoDAO.unserializeAndParse(DB_KEY);
            var list = CarrinhoDAO.list;
            if (list && list.length > 0) {
                return list;
            }
        }
        return null;
    },

    getQuant: function () {
        let cliente = sessao.checkAndGetUser();
        if (cliente) {
            DB_KEY = cliente.email;
            CarrinhoDAO.unserializeAndParse(DB_KEY);
            return CarrinhoDAO.list.length;
        }
    },

    unserializeAndParse: function (DB_KEY) {
        var json = window.localStorage.getItem(DB_KEY);
        if (json) {
            CarrinhoDAO.list = JSON.parse(json);
        }
        else {
            CarrinhoDAO.list = [];
        }
    },

    serializeAndSave: function (DB_KEY) {
        var list = CarrinhoDAO.list;
        if (list && list.length > 0) {
            var json = JSON.stringify(CarrinhoDAO.list);
            window.localStorage.setItem(DB_KEY, json);
        }
    },
};