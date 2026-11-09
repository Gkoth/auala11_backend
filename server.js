require('dotenv').config();
const express = require('express');
const supabase = require('./scr/config/supabaseClient');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/livros', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('livros_acervo')
      .select('*')
      .order('ano_publicacao', { ascending: false });

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao ordenar catálogo' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
  console.log(`📡 Endpoints disponíveis: http://localhost:${PORT}/livros`);
});