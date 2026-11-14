// index — listar registros ou itens.
// show — consultar um registro específico.
// store — criar um registro ou adicionar um item.
// update — atualizar um registro ou item.
// destroy — excluir um registro ou item.
// clear — esvaziar uma coleção, como o carrinho.
// login — autenticar um usuário.
// logout — encerrar a sessão.
// me — consultar os dados do usuário autenticado.
// forgotPassword — iniciar a recuperação de senha.
// resetPassword — redefinir a senha.
// cancel — cancelar uma operação, como um pedido.
// updateStatus — alterar o status de um registro, como um pedido.


// 200 OK — deu certo; resposta normalmente inclui dados.
// 201 Created — algo foi criado com sucesso, como um novo produto.
// 204 No Content — deu certo, mas sem conteúdo na resposta; comum ao excluir ou atualizar.
// 400 Bad Request — a requisição está inválida ou faltam dados.
// 401 Unauthorized — falta autenticação ou ela é inválida.
// 403 Forbidden — autenticado, mas sem permissão.
// 404 Not Found — recurso ou rota não encontrado.
// 409 Conflict — conflito, por exemplo, tentar cadastrar algo que já existe.
// 422 Unprocessable Content — os dados chegaram, mas não passaram pela validação.
// 500 Internal Server Error — erro inesperado no servidor.
// 502 Bad Gateway — um servidor intermediário recebeu uma resposta inválida de outro servidor.
// 503 Service Unavailable — serviço temporariamente indisponível