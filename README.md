
# API de Contatos

API simples para gerenciar contatos com operações de CRUD em memória.

## Link Railway(tst)
https://desafioapi-production-3190.up.railway.app/
## Endpoints

### 1. Adicionar Contato

- **URL**: `/contatos`
- **Método**: `POST`
- **Descrição**: Adiciona um novo contato.
- **Headers**:
  - `Content-Type: application/json`
- **Body**:

  ```json
  {
    "nome": "João Silva",
    "telefone": "(11) 91234-5678",
    "email": "joao.silva@example.com",
    "cpf": "12345678901"
  }
  ```

- **Respostas**:
  - `201 Created`: Contato adicionado com sucesso.
  - `400 Bad Request`: Erro de validação (ex: campos obrigatórios faltando, CPF já cadastrado ou limite de 30 contatos atingido).

### 2. Listar Contatos

- **URL**: `/contatos`
- **Método**: `GET`
- **Descrição**: Retorna a lista de todos os contatos.

- **Respostas**:
  - `200 OK`: Lista de contatos no formato JSON.

### 3. Excluir Contato

- **URL**: `/contatos/:cpf`
- **Método**: `DELETE`
- **Descrição**: Exclui um contato específico pelo CPF.

- **Parâmetro de URL**:
  - `cpf`: CPF do contato a ser excluído.
  
- **Respostas**:
  - `200 OK`: Contato excluído com sucesso.
  - `404 Not Found`: Contato não encontrado.

### 4. Excluir Todos os Contatos

- **URL**: `/contatos`
- **Método**: `DELETE`
- **Descrição**: Exclui todos os contatos da lista.

- **Respostas**:
  - `200 OK`: Todos os contatos foram excluídos.

## Validações

1. Limite de contatos: A API permite um máximo de 30 contatos.
2. Campos obrigatórios: `nome`, `telefone`, `email`, `cpf`.
3. CPF único: Cada CPF deve ser único na lista de contatos.
4. Campos extras: A API rejeita requisições com campos além dos necessários (`nome`, `telefone`, `email`, `cpf`).

## Exemplo de Requisição

### Adicionar Contato

```bash
curl -X POST http://localhost:3000/contatos -H "Content-Type: application/json" -d '{
  "nome": "João Silva",
  "telefone": "(11) 91234-5678",
  "email": "joao.silva@example.com",
  "cpf": "12345678901"
}'
```
