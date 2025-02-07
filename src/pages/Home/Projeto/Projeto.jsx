import { Button, Card, Col, Layout, Modal, Row, message } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai';
import DynamicForm from '../../../components/Form';
import Loading from '../../../components/Loading';
import PaginatedTable from '../../../components/PaginatedTable';
import Api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;
const { Content } = Layout;

const Table = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('list');
  const [editingRecord, setEditingRecord] = useState(null);

  const [formValues, setFormValues] = useState({});
  const [formConfig] = useState([
    {
      columns: 2,
      questions: [
        { type: "text", id: "Nome", required: true, placeholder: "Nome do Projeto", label: "Nome do Projeto" },
        { type: "colorPicker", id: "cor", required: true, label: "Cor de identificação" },
      ],
    },
    {
      columns: 2,
      questions: [
        { type: "select", id: "empresa", required: true, placeholder: "Empresa Responsavel", label: "Empresa Responsavel" },
        { type: "select", id: "cliente", required: true, placeholder: "Cliente", label: "Cliente" },
      ],
    },
    {
      columns: 2,
      questions: [
        { type: "integer", id: "orcamentoInicial", required: true, placeholder: "Orçamento ", label: "Orçamento " },
        { type: "integer", id: "horasEstimadas", required: true, placeholder: "Horas Estimadas", label: "Horas Estimadas" },
      ],
    },
    {
      columns: 2,
      questions: [
        { type: "date", id: "dataInicio", required: true, placeholder: "Data de Inicio", label: "Data de Inicio" },
        { type: "date", id: "dataFim", required: true, placeholder: "Data de Finalização", label: "Data de Finalização" },
      ],
    },
    {
      columns: 1,
      questions: [
        { type: "textarea", id: "descrticao", required: true, placeholder: "Descrição...", label: "Descrição" },
      ],
    },

  ]);

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
          type: "text",
          id: "idCliente",
          required: false,
          placeholder: "Digite o nome de um cliente para filtrar",
          label: "Filtrar por Cliente"
        }, {
          type: "text",
          id: "status",
          required: false,
          placeholder: "Digite um status para filtrar",
          label: "Filtrar por Status"
        }, {
          type: "select",
          id: "projetoConcluido",
          required: false,
          placeholder: "Digite um Nome para filtrar",
          label: "Filtrar por Nome"
        },
      ],
    },
  ]);

  const tableRef = useRef(null);

  // Atualiza o fetchData para incluir os filtros
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

  const handleAdd = useCallback(() => {
    setEditingRecord(null);
    setFormValues({});
    setView('form');
  }, []);

  const handleEdit = useCallback(async (record) => {
    setLoading(true);
    try {
      const result = await Api.get(`/crud/getById/${record.id}`);
      const fetchedRecord = result.data.response;
      const deserializedRecord = {
        ...fetchedRecord,
        files: fetchedRecord.files ? JSON.parse(fetchedRecord.files) : [],
        multiSelect: fetchedRecord.multiSelect ? JSON.parse(fetchedRecord.multiSelect) : [],
      };
      setEditingRecord(fetchedRecord);
      setFormValues(deserializedRecord);
      setView('form');
    } catch (error) {
      message.error('Erro ao buscar o registro.');
      console.error('Erro ao buscar registro:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback((record) => {
    confirm({
      title: 'Confirmar exclusão',
      content: 'Tem certeza de que deseja excluir este registro?',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk: async () => {
        setLoading(true);
        try {
          await Api.delete(`/crud/${record.id}`);
          message.success('Registro excluído com sucesso!');
          if (tableRef.current) {
            tableRef.current.reloadTable();
          }
        } catch (error) {
          message.error('Erro ao excluir registro.');
          console.error('Erro ao excluir registro:', error);
        } finally {
          setLoading(false);
        }
      },
    });
  }, []);

  const handleSave = useCallback(
    async (values) => {
      setLoading(true);
      try {
        const serializedValues = {
          ...values,
          files: JSON.stringify(values.files || []),
          multiSelect: JSON.stringify(values.multiSelect || []),
        };

        await Api.post('/crud/upsert', { ...serializedValues, id: editingRecord?.id });
        message.success(editingRecord ? 'Registro atualizado com sucesso!' : 'Registro adicionado com sucesso!');
        setView('list');
        if (tableRef.current) {
          tableRef.current.reloadTable();
        }
      } catch (error) {
        message.error('Erro ao salvar registro.');
        console.error('Erro ao salvar registro:', error);
      } finally {
        setLoading(false);
      }
    },
    [editingRecord]
  );

  const handleCancel = useCallback(() => {
    setView('list');
  }, []);

  const navigate = useNavigate();

  const handleItemClick = (record) => {
    navigate(`/projeto/${record.id}`);
  };


  const handleFilter = (values) => {
    setFilters(values); // Atualiza os filtros
    if (tableRef.current) {
      tableRef.current.reloadTable(); // Recarrega a tabela com os novos filtros
    }
  };

  const columns = [
    { title: '', dataIndex: 'cor', key: 'cor', width: 20 },
    { title: 'Nome', dataIndex: 'text', key: 'nome', render: (text) => <strong>{text}</strong> },
    { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Ativo/Concluido', dataIndex: 'projetoConcluido', key: 'projetoConcluido', width: 180 },
    {
      title: 'Ações',
      key: 'actions',
      width: 110,
      render: (_, record) => (
        <Row gutter={8}>
          <Col>
            <Button onClick={(e) => { e.stopPropagation(); handleEdit(record); }} icon={<AiFillEdit />} disabled={loading} />
          </Col>
          <Col>
            <Button danger onClick={(e) => { e.stopPropagation(); handleDelete(record); }} icon={<AiFillDelete />} disabled={loading} />
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Layout>
      <Content>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              title="Projetos"
              bordered={false}
              extra={
                view === 'list' ? (
                  <Button type="primary" icon={<AiOutlinePlus />} onClick={handleAdd} disabled={loading}>
                    Adicionar Projeto
                  </Button>
                ) : view === 'form' ? (
                  <Button type="primary" icon={<AiOutlineArrowLeft />} onClick={handleCancel} disabled={loading}>
                    Voltar para a Lista
                  </Button>
                ) : null
              }
            >
              {view === 'list' ? (
                <>
                  <DynamicForm formConfig={filterFormConfig} values={filters} submitOnSide setValues={setFilters} onSubmit={handleFilter} />
                  <PaginatedTable
                    ref={tableRef}
                    disabled={loading}
                    fetchData={fetchData}
                    initialPageSize={5}
                    columns={columns}
                    onRow={(record) => ({
                      onClick: () => handleItemClick(record),
                      style: { cursor: 'pointer' },
                    })}
                  />
                </>
              ) : (
                <div>
                  {loading ? <Loading /> : <DynamicForm formConfig={formConfig} values={formValues} setValues={setFormValues} onSubmit={handleSave} onClose={handleCancel} />}
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Table;