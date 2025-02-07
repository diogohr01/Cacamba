import { Button, Card, Col, Divider, Layout, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Content>
        <Row gutter={[8, 8]}>
          {/* Card para o CRUD */}
          <Col span={24}>
            <Card title="Crud - Exemplo" bordered={false}>
              <Typography.Text>
                Este exemplo de CRUD possui todas as funcionalidades de um sistema completo, incluindo:
                <ul>
                  <li>
                    <strong>Tabela Paginada</strong>: Lista registros com paginação, suporte a ordenação e filtros dinâmicos.
                  </li>
                  <li>
                    <strong>Formulário Dinâmico</strong>: Permite adicionar e editar registros com um formulário completo.
                  </li>
                  <li>
                    <strong>Integração com API C#</strong>: Totalmente integrado com uma API backend para salvar e buscar dados.
                  </li>
                  <li>
                    <strong>Ações de Edição e Exclusão</strong>: Botões para editar e excluir cada registro, com confirmação antes de excluir.
                  </li>
                </ul>
              </Typography.Text>
              <Divider />
              <Button type="primary" onClick={() => navigate("/table")}>Ver</Button>
            </Card>
          </Col>

          {/* Card para o Formulário */}
          <Col span={6}>
            <Card title="Formulário - Exemplo" bordered={false}>
              <Typography.Text>
                Exemplo de um formulário dinâmico que inclui todos os tipos de campos disponíveis:
                <ul>
                  <li>Campos de texto e textarea para entrada de informações.</li>
                  <li>Inputs numéricos para valores inteiros e decimais.</li>
                  <li>Selects, multiselects e radio buttons para opções de escolha.</li>
                  <li>Upload de arquivos e imagens.</li>
                  <li>Validação dinâmica e customizada para cada campo.</li>
                  <li>Suporte a campos de data e hora com formatação específica.</li>
                </ul>
              </Typography.Text>
              <Divider />
              <Button type="primary" onClick={() => navigate("/form")}>Ver</Button>
            </Card>
          </Col>

          {/* Card para o Modal */}
          <Col span={6}>
            <Card title="Gerador de Form" bordered={false}>
              <Typography.Text>
                Gerador de Form
              </Typography.Text>
              <Divider />
              <Button type="primary" onClick={() => navigate("/formbuilder")}>Ver</Button>
            </Card>
          </Col>

          {/* Card para o Modal */}
          <Col span={6}>
            <Card title="Modal - Exemplo" bordered={false}>
              <Typography.Text>
                Exemplo básico de uso de modais, com funcionalidade de exibir e ocultar janelas modais usando componentes do Ant Design e React.
              </Typography.Text>
              <Divider />
              <Button type="primary" onClick={() => navigate("/modal")}>Ver</Button>
            </Card>
          </Col>

          {/* Card para Charts */}
          <Col span={6}>
            <Card title="Charts - Exemplo" bordered={false}>
              <Typography.Text>
                Exemplo de gráficos interativos utilizando a biblioteca `ApexCharts`. Inclui configurações básicas para gráficos de linha, barra e outros tipos visuais.
              </Typography.Text>
              <Divider />
              <Button type="primary" onClick={() => navigate("/charts")}>Ver</Button>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
