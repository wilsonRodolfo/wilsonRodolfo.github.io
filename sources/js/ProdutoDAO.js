/* JavaScript Document */

var ProdutoDAO = {

    DB_KEY: "produtos",
    NEW: 1,
    UPDATE: 2,

    list: [
        {
            "id": "1",
            "descricao": "Painel Frozen",
            "caminhoImg": "../../images/painel-frozen.jpg",
            "preco": "19,90"
        },
        {
            "id": "2",
            "descricao": "Painel Homem Aranha",
            "caminhoImg": "../../images/painel-homemaranha.jpg",
            "preco": "19,90"
        },
        {
            "id": "3",
            "descricao": "Painel Carros",
            "caminhoImg": "../../images/painel-carros.jpg",
            "preco": "19,90"
        }
    ],

    save: function (produto) {
        var list = ProdutoDAO.list, index = ProdutoDAO.getIndex(produto);

        if (index > -1) {
            list[index] = produto;
            console.log("produto já existe... Atualizando");
            return ProdutoDAO.UPDATE;
        }
        else {
            list.push(produto);
        }

        ProdutoDAO.serializeAndSave();

        return ProdutoDAO.NEW;
    },

    retrieve: function () {
        var list = ProdutoDAO.list;
        if (list && list.length > 0) {
            return list;
        }
        return null;
    },

    get: function (id) {
        var list = ProdutoDAO.list,
            index = ProdutoDAO.getIndex({ 'id': id });

        if (index > -1) {
            var produto = list[index];
            return produto;
        }

        return null;
    },

    getIndex: function (produto) {
        var list = ProdutoDAO.list,
            item = {};

        for (var i = 0; i < list.length; i++) {
            item = list[i];
            if (item.id == produto.id) {
                return i;
            }
        }

        return -1;
    },

    delete: function (id) {
        var list = ProdutoDAO.list,
            index = ProdutoDAO.getIndex({ 'id': id });

        if (index > -1) {
            //https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice
            list.splice(index, 1);
            return true;
        }

        return false;
    },

    serializeAndSave: function () {
        var list = ProdutoDAO.list;
        if (list && list.length > 0) {
            var json = JSON.stringify(ProdutoDAO.list);
            window.localStorage.setItem(ProdutoDAO.DB_KEY, json);
        }
    },

    unserializeAndParse: function () {
        var json = window.localStorage.getItem(ProdutoDAO.DB_KEY);
        if (json) {
            ProdutoDAO.list = JSON.parse(json);
        }
        else {
            ProdutoDAO.list = [];
        }
    }

};
