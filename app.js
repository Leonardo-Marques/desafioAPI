const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let contatos = [];

const MAX_CONTATOS = 30;

app.get('/contatos', (req, res) => {
  res.json(contatos);
});

app.post('/contatos', (req, res) => {
    const { nome, telefone, email, cpf } = req.body;
  
    if (contatos.length >= MAX_CONTATOS) {
      return res.status(400).json({ message: 'Limite de 30 contatos atingido.' });
    }
  
    if (!nome || !telefone || !email || !cpf) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
  
    const camposRequeridos = ['nome', 'telefone', 'email', 'cpf'];
    const camposRecebidos = Object.keys(req.body);
  
    if (camposRecebidos.some(campo => !camposRequeridos.includes(campo))) {
      return res.status(400).json({ message: 'Campos extras não são permitidos.' });
    }
  
    if (contatos.some(contato => contato.cpf === cpf)) {
      return res.status(400).json({ message: 'CPF já cadastrado.' });
    }
  
    const novoContato = { nome, telefone, email, cpf };
    contatos.push(novoContato);
    res.status(201).json(novoContato);
  });
  

app.put('/contatos/:cpf', (req, res) => {
  const { cpf } = req.params;
  const { nome, telefone, email } = req.body;

  const contatoIndex = contatos.findIndex(contato => contato.cpf === cpf);

  if (contatoIndex === -1) {
    return res.status(404).json({ message: 'Contato não encontrado.' });
  }

  contatos[contatoIndex] = { ...contatos[contatoIndex], nome, telefone, email };
  res.json(contatos[contatoIndex]);
});

app.delete('/contatos/:cpf', (req, res) => {
  const { cpf } = req.params;
  const contatoIndex = contatos.findIndex(contato => contato.cpf === cpf);

  if (contatoIndex === -1) {
    return res.status(404).json({ message: 'Contato não encontrado.' });
  }

  contatos.splice(contatoIndex, 1);
  res.status(204).send();
});

app.delete('/contatos', (req, res) => {
  contatos = [];
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
