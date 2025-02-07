import { Card, Col, Layout, Row, Typography } from 'antd';
import React, { useState } from 'react';
import DynamicForm from '../../components/Form';

const { Content } = Layout;
const { Text } = Typography;

const Form = () => {
  const [form, setForm] = useState({});

  const submitForm = async (values) => {
    console.log('Formulário submetido:', values);
  };

  return (
    <Layout>
      <Content>
        <Row gutter={[16, 16]}>
          {/* Seção: Textos */}
          <Col span={12}>
            <Card title="Textos" bordered={false}>
              <DynamicForm
                formConfig={[
                  {
                    columns: 1,
                    questions: [
                      { type: 'text', id: 'text', required: true, placeholder: 'Digite aqui um texto', label: 'Campo de texto' },
                      { type: 'textarea', id: 'textarea', required: false, placeholder: 'Digite aqui um texto longo', label: 'Campo de texto longo' },
                    ],
                  },
                ]}
                values={form}
                setValues={setForm}
                onSubmit={submitForm}
              />
            </Card>
          </Col>

          {/* Seção: Senha */}
          <Col span={12}>
            <Card title="Senha" bordered={false}>
              <DynamicForm
                formConfig={[
                  {
                    columns: 1,
                    questions: [
                      { type: 'password', id: 'password', required: true, placeholder: 'Digite aqui uma senha', label: 'Campo de senha' },
                    ],
                  },
                ]}
                values={form}
                setValues={setForm}
                onSubmit={submitForm}
              />
            </Card>
          </Col>

          {/* Seção: Números */}
          <Col span={24}>
            <Card title="Números" bordered={false}>
              <DynamicForm
                formConfig={[
                  {
                    columns: 3,
                    questions: [
                      { type: 'integer', id: 'integer', required: true, placeholder: 'Digite aqui um número inteiro', label: 'Campo numérico inteiro' },
                      { type: 'decimal', id: 'decimal', required: true, placeholder: 'Digite aqui um número decimal', label: 'Campo numérico decimal', precision: 2 },
                      { type: 'currency', id: 'currency', required: true, placeholder: 'Digite aqui um valor monetário', label: 'Campo de moeda', left: 'R$', precision: 2, step: 0.01 },
                    ],
                  },
                ]}
                values={form}
                setValues={setForm}
                onSubmit={submitForm}
              />
            </Card>
          </Col>

          {/* Seção: Datas */}
          <Col span={24}>
            <Card title="Datas" bordered={false}>
              <DynamicForm
                formConfig={[
                  {
                    columns: 4,
                    questions: [
                      { type: 'datetime', id: 'datetime', required: true, placeholder: 'Selecione aqui uma data e hora', label: 'Campo de data e hora', format: 'DD/MM/YYYY HH:mm' },
                      { type: 'date', id: 'date', required: true, placeholder: 'Selecione aqui uma data', label: 'Campo de data', format: 'DD/MM/YYYY' },
                      { type: 'time', id: 'time', required: true, placeholder: 'Selecione aqui um horário', label: 'Campo de horário', format: 'HH:mm' },
                      { type: 'range-date', id: 'periodo', required: true, placeholder: 'Selecione o intervalo', label: 'Escolha o período', format: 'DD/MM/YYYY' },
                    ],
                  },
                ]}
                values={form}
                setValues={setForm}
                onSubmit={submitForm}
              />
            </Card>
          </Col>

          {/* Seção: Seletores */}
          <Col span={24}>
            <Card title="Seletores" bordered={false}>
              <DynamicForm
                formConfig={[
                  {
                    columns: 2,
                    questions: [
                      {
                        type: 'select',
                        id: 'select',
                        required: true,
                        placeholder: 'Selecione uma opção',
                        label: 'Campo de seleção única',
                        options: [
                          { label: 'Vermelho', value: 'vermelho' },
                          { label: 'Azul', value: 'azul' },
                          { label: 'Verde', value: 'verde' },
                        ],
                      },
                      {
                        type: 'multiselect',
                        id: 'multiselect',
                        required: false,
                        placeholder: 'Selecione múltiplas opções',
                        label: 'Campo de seleção múltipla',
                        options: [
                          { label: 'Ler', value: 'ler' },
                          { label: 'Correr', value: 'correr' },
                          { label: 'Viajar', value: 'viajar' },
                        ],
                      },
                      { type: 'images', id: 'images', label: 'Upload de Fotos' },
                      { type: 'files', id: 'files', label: 'Upload de Imagens' },
                    ],
                  },
                ]}
                values={form}
                setValues={setForm}
                onSubmit={submitForm}
              />
            </Card>
          </Col>

          {/* Seção: Contato e Preferências */}
          <Col span={24}>
            <Card title="Contato e Preferências" bordered={false}>
              <DynamicForm
                formConfig={[
                  {
                    columns: 4,
                    questions: [
                      { type: 'cpf', id: 'cpf', required: true, placeholder: 'Digite seu CPF', label: 'CPF' },
                      { type: 'cnpj', id: 'cnpj', required: true, placeholder: 'Digite seu CNPJ', label: 'CNPJ' },
                      { type: 'phone', id: 'phone', required: true, placeholder: 'Digite seu telefone', label: 'Telefone' },
                      { type: 'email', id: 'email', required: true, placeholder: 'Digite seu email', label: 'Email' },
                      { type: 'checkbox', id: 'terms', placeholder: 'Checkbox', label: 'Checkbox' },
                      {
                        type: 'checkbox-group',
                        id: 'checkbox-group',
                        required: true,
                        label: 'Combo Checkbox',
                        options: [
                          { label: 'Opção 1', value: 'opcao1' },
                          { label: 'Opção 2', value: 'opcao2' },
                          { label: 'Opção 3', value: 'opcao3' },
                        ],
                      },
                      {
                        type: 'radio',
                        id: 'gender',
                        required: true,
                        label: 'Radio Button',
                        options: [
                          { label: 'Masculino', value: 'male' },
                          { label: 'Feminino', value: 'female' },
                        ],
                      },
                      {
                        type: 'tree-select',
                        id: 'categorias',
                        placeholder: 'Selecione categorias',
                        label: 'Categorias',
                        treeData: [
                          {
                            title: 'Eletrônicos',
                            value: 'eletronicos',
                            children: [
                              {
                                title: 'Celulares',
                                value: 'celulares',
                              },
                              {
                                title: 'Computadores',
                                value: 'computadores',
                              },
                            ],
                          },
                          {
                            title: 'Roupas',
                            value: 'roupas',
                            children: [
                              {
                                title: 'Masculinas',
                                value: 'masculinas',
                              },
                              {
                                title: 'Femininas',
                                value: 'femininas',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ]}
                values={form}
                setValues={setForm}
                onSubmit={submitForm}
              />
            </Card>
          </Col>

          {/* Visualização do Objeto de Formulário */}
          <Col span={24}>
            <Card title="Resumo do Formulário" bordered={false}>
              <Text>Objeto:</Text>
              <pre>{JSON.stringify(form, null, 2)}</pre>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Form;