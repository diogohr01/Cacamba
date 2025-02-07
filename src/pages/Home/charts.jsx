import React from 'react';
import { Card, Col, Row, Layout, Statistic, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';
import { colors } from '../../styles/colors';

const { Content } = Layout;

const Charts = () => {
    // Configuração para o gráfico de linhas (Vendas por Mês)
    const lineChartOptions = {
        chart: {
            id: 'basic-line',
            toolbar: { show: false },
            dropShadow: {
                enabled: true,
                top: 3,
                left: 3,
                blur: 3,
                color: colors.primary,
                opacity: 0.5,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        colors: [colors.primary],
        xaxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
            labels: { style: { colors: colors.primary, fontSize: '14px' } },
        },
        yaxis: { labels: { style: { colors: colors.primary, fontSize: '14px' } } },
        tooltip: { theme: 'dark' },
    };

    const lineChartSeries = [{ name: 'Vendas', data: [30, 40, 45, 50, 49, 60, 70] }];

    // Configuração para o gráfico de barras (Receita por Trimestre)
    const barChartOptions = {
        chart: {
            id: 'basic-bar',
            toolbar: { show: false },
            dropShadow: {
                enabled: true,
                top: 2,
                left: 2,
                blur: 4,
                color: colors.primary,
                opacity: 0.4,
            },
        },
        colors: [colors.primary],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
            },
        },
        xaxis: {
            categories: ['Q1', 'Q2', 'Q3', 'Q4'],
            labels: { style: { colors: colors.primary, fontSize: '14px' } },
        },
        yaxis: { labels: { style: { colors: colors.primary, fontSize: '14px' } } },
        tooltip: { theme: 'dark' },
    };

    const barChartSeries = [{ name: 'Receita', data: [400, 430, 448, 470] }];

    return (
        <Layout>
            <Content>
                {/* Linha de Cards com Métricas Rápidas */}
                <Row gutter={[16, 16]} justify="space-between">
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Total de Vendas"
                                value={112893}
                                precision={0}
                                valueStyle={{ color: colors.primary }}
                                prefix={<ArrowUpOutlined />}
                                suffix="Unidades"
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Receita Total"
                                value={245300}
                                precision={2}
                                valueStyle={{ color: colors.primary }}
                                prefix={<ArrowDownOutlined />}
                                suffix="USD"
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Crescimento de Clientes"
                                value={45.8}
                                precision={1}
                                valueStyle={{ color: colors.primary }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Taxa de Cancelamento"
                                value={3.2}
                                precision={1}
                                valueStyle={{ color: colors.primary }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>

                <Divider />

                {/* Linha de Gráficos */}
                <Row gutter={[16, 16]}>
                    {/* Gráfico de Linhas */}
                    <Col span={12}>
                        <Card
                            title="Vendas Mensais"
                            bordered={false}
                        >
                            <ReactApexChart
                                options={lineChartOptions}
                                series={lineChartSeries}
                                type="line"
                                height={300}
                            />
                        </Card>
                    </Col>

                    {/* Gráfico de Barras */}
                    <Col span={12}>
                        <Card
                            title="Receita Trimestral"
                            bordered={false}
                        >
                            <ReactApexChart
                                options={barChartOptions}
                                series={barChartSeries}
                                type="bar"
                                height={300}
                            />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Charts;
