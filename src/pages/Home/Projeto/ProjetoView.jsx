import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Button, message, Row, Col } from 'antd';
import Api from '../../../services/api';
import DynamicForm from '../../../components/Form';
import PaginatedTable from '../../../components/PaginatedTable';
import { colors } from '../../../styles/colors';

const ProjetoView = () => {
  const { id } = useParams(); // Recupera o "id" passado na URL
  const navigate = useNavigate();
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({ text: '', integer: '' }); // Estado para armazenar os filtros
  const [filterFormConfig] = useState([
    {
      columns: 4,
      questions: [
        {
          type: "text",
          id: "nome",
          required: false,
          placeholder: "Digite um Nome para filtrar",
          label: "Filtrar por Nome"
        },
        {
          type: "range-date",
          id: "dataInicio",
          required: false,
          placeholder: "",
          label: "Filtrar por Periodo"
        }, {
          type: "text",
          id: "status",
          required: false,
          placeholder: "Digite um status para filtrar",
          label: "Filtrar por Periodo"
        },
        {
          type: "select",
          id: "status",
          required: false,
          placeholder: "Selecione um status para filtrar",
          label: "Filtrar por Status"
        },
      ],
    },
  ]);

  useEffect(() => {
    async function fetchProjeto() {
      setLoading(true);
      try {
        // Altere a URL conforme sua API; aqui, usamos o endpoint de busca por id
        const response = await Api.get(`/crud/getById/${id}`);
        // Supondo que o retorno seja o objeto do projeto
        setProjeto(response.data.response);
      } catch (error) {
        message.error('Erro ao buscar os detalhes do projeto');
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjeto();
  }, [id]);

  const fetchData = useCallback(
    async (page, pageSize, sorterField, sortOrder) => {
      setLoading(true);
      try {
        const response = await Api.post('/crud/getAll', {
          page,
          pageSize,
          sorterField,
          sortOrder,
          ...filters, // Inclui os filtros no request
        });
        return { data: response.data.response.data, total: response.data.response.recordsTotal };
      } catch (error) {
        message.error('Erro ao buscar dados.');
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  const tableRef = useRef(null);

  const handleFilter = (values) => {
    setFilters(values); // Atualiza os filtros
    if (tableRef.current) {
      tableRef.current.reloadTable(); // Recarrega a tabela com os novos filtros
    }
  };

  const columns = [ //Atividade Pai
    { title: 'Nome', dataIndex: 'text', key: 'nome', render: (text) => <strong>{text}</strong> },
    { title: 'Horas Estimadas', dataIndex: 'horasEstimadas', key: 'horasEstimadas' },
    { title: 'Horas Atuais', dataIndex: '', key: '' }, //Calcular as horas cobradas e não cobradas
    { title: 'Progresso', dataIndex: '', key: '',}, //Calcular a partir da porcentagem das atividades filho
  ];

  if (loading) {
    return <Spin />;
  }

  if (!projeto) {
    return <div>Projeto não encontrado.</div>;
  }

  return (
    <Card title={`${projeto.Nome}`}>
      {/* Botões abaixo do título */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <Button onClick={() => navigate(-1)} style={{marginRight: 8, backgroundColor: colors.background}} >
          <p style={{ color: "#fff "}}>Atividades</p>
        </Button>
        <Button  onClick={() => navigate(-1)} style={{marginRight: 8}}>
          Acesso
        </Button>
        <Button  onClick={() => navigate(-1)} style={{marginRight: 8}}>
          Informaçoes
        </Button>
      </div>

      <div>
        <DynamicForm formConfig={filterFormConfig} values={filters} submitOnSide setValues={setFilters} onSubmit={handleFilter} /> 
        <PaginatedTable ref={tableRef} disabled={loading} fetchData={fetchData} initialPageSize={5} columns={columns} // Adaptar o PaginatedTable para o tipo de requisição que sera recebida do AtividadePai/getall
        /> 
      </div>
    </Card>
  );
};

export default ProjetoView;
