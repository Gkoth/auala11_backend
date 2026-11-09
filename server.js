require('dotenv').config();
const express = require('express');
const supabase = require('./scr/config/supabaseClient');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/livros', async (req, res) => {
  const { data, error } = await supabase
    .from('livros_acervo')
    .select('*')
    .order('ano_publicacao', { ascending: false });
  res.json(data);
});

app.get('/livros/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('livros_acervo')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error?.code === 'PGRST116' || !data) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    if (error) {
      return res.status(500).json({ erro: 'Erro ao consultar o catálogo' });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ erro: 'Falha interna no servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
  console.log(`📡 Endpoints disponíveis: http://localhost:${PORT}/livros`);
});