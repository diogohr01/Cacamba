import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Dropdown, Layout, Menu, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo-Photoroom.png';
import { useAuth } from '../../../hooks/auth';
import { defaultRoutes } from '../../../routes/routes';
import { colors } from '../../../styles/colors';

const { Header, Content, Sider } = Layout;
const { Text, Title } = Typography;

// Componente para o Card de Perfil do Usuário
const UserProfileCard = ({ userName, userRole, appVersion = '1.0.0' }) => {
    const { signOut } = useAuth();

    return (
        <Card
            style={{
                width: 300,
                borderRadius: '10px',
                backgroundColor: colors.cinzaTabela
            }}
        >
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <Avatar size={60} icon={<UserOutlined />} />
                <Title level={4} style={{ color: 'white' }}>{userName}</Title>
                <Button type="primary" onClick={() => signOut()}>
                    Sair
                </Button>
            </Space>
        </Card>
    );
};

// Função para gerar itens do Menu dinamicamente
const generateMenuItems = (routes) => {
    return routes
        .filter((route) => !route.hidden)
        .map((route) => {
            if (route.children) {
                return {
                    key: route.key,
                    icon: route.icon,
                    label: route.label,
                    children: generateMenuItems(route.children),
                    style: { marginTop: '10px' }, // Adiciona padding nos submenus
                };
            }
            return {
                key: route.key,
                icon: route.icon,
                label: route.label,
                style: { marginTop: '10px' }, // Adiciona padding nos itens do menu
            };
        });
};

const Authorized = ({ children, userName }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(true);
    const [routes] = useState(defaultRoutes);
    const [openKeys, setOpenKeys] = useState([]);

    useEffect(() => {
        const segments = location.pathname.split('/').filter(Boolean);
        const rootSubmenuKeys = defaultRoutes.map((x) => x.key);
        let newOpenKeys = [];

        if (segments.length === 0) {
            newOpenKeys = ['/main'];
        } else {
            const firstSegment = `/${segments[0]}`;
            if (rootSubmenuKeys.includes(firstSegment)) {
                newOpenKeys = [firstSegment];
            } else {
                newOpenKeys = ['/main'];
            }
        }

        setOpenKeys(newOpenKeys);
    }, [location]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleMenuClick = ({ key }) => {
        navigate(key);
    };

    // Primeiro item da barra lateral (Logo)
    const logoItem = {
        key: 'logo',
        label: (
            <div
                onClick={() => navigate('/')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    padding: '8px',
                    cursor: 'pointer',
                    marginBotom: 11,
                }}
            >
                <img src={logo} alt="Logo" style={{ height: 32 }} />
                {!collapsed && (
                    <span style={{ marginLeft: '10px', fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>
                        MyTask
                    </span>
                )}
            </div>
        ),
        disabled: true, // Evita que o usuário clique e selecione o item
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: colors.background }}>
            <Sider
                collapsed={collapsed}
                trigger={null}
                collapsible
                width={200}
                style={{
                    position: 'fixed', // Fixa a barra lateral
                    height: '100vh',
                    overflow: 'hidden', // Impede que role junto com a página
                    left: 0,
                    backgroundColor: colors.primary,

                }}
            >
                <div style={{ height: '100vh', overflowY: 'auto' }}> {/* Apenas este div rola */}
                    <Menu
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        openKeys={openKeys}
                        style={{ borderRight: 0, backgroundColor: colors.primary }}
                        onClick={handleMenuClick}
                        items={[logoItem, ...generateMenuItems(routes)]}
                    />
                </div>
            </Sider>

            <Layout
                style={{
                    marginLeft: collapsed ? 80 : 200, // Ajuste para acompanhar o colapse do sidebar
                    transition: 'margin-left 0.5s ease', // Adiciona animação suave ao expandir/recolher
                }}
            >
                <Header
                    style={{
                        backgroundColor: colors.background,
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        padding: '0 16px',
                        width: '100%',
                        height: 60
                    }}
                >
                    <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                        <Col>
                            <Button
                                type="text"
                                onClick={toggleCollapsed}
                                style={{
                                    marginLeft: "9px",
                                    color: '#fff',
                                    fontSize: '16px',
                                    display: 'flex',
                                    alignItems: 'center', // Mantém alinhado
                                }}
                                icon={
                                    collapsed
                                        ? <MenuUnfoldOutlined style={{ color: colors.cinzaIcone, fontSize: '18px', paddingTop: '-20px' }} />
                                        : <MenuFoldOutlined style={{ color: colors.cinzaIcone, fontSize: '18px', paddingTop: '-20px' }} />
                                }
                            />
                        </Col>
                        <Col>
                            <Dropdown overlay={<UserProfileCard userName={'Teste'} userRole={'Admin'} />} trigger={['click']} placement="bottomRight">
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                        <Avatar
                                            size={30} // Aumentei um pouco para melhor proporção
                                            icon={
                                                <UserOutlined
                                                    style={{
                                                        color: colors.cinzaIcone,
                                                        fontSize: '18px',
                                                        padding: '5px', // Adiciona padding interno ao ícone
                                                        backgroundColor: 'transparent',
                                                        borderRadius: '50%' // Garante um visual consistente
                                                    }}
                                                />
                                            }
                                            style={{
                                                backgroundColor: colors.avatarBg, // Mantém a cor de fundo caso precise
                                                padding: '4px' // Padding no Avatar também ajuda a centralizar melhor
                                            }}
                                        />
                                        {!collapsed && (
                                            <Text style={{ color: '#fff', fontSize: '16px', marginLeft: '8px' }}>Admin</Text>
                                        )}
                                        <DownOutlined style={{ color: colors.cinzaIcone, fontSize: '16px', marginLeft: '4px' }} />
                                    </Space>
                                </a>
                            </Dropdown>
                        </Col>

                    </Row>
                </Header>

                <Content style={{ padding: '8px', margin: 0, minHeight: 280, background: colors.background }}>
                    <main role="main" >{children}</main>
                </Content>
            </Layout>

        </Layout>
    );
};

export default Authorized;
