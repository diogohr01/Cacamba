import React from "react";
import { AiFillEdit, AiFillHome, AiOutlineForm, AiOutlinePieChart, AiOutlineWindows } from 'react-icons/ai';
import { roles } from '../helpers/roles';
import DragAndDropForm from "../pages/Home/formBuilder";
import { HiBuildingOffice } from "react-icons/hi2";
import { IoIosPricetag, IoMdMove, IoMdPeople } from "react-icons/io";
import { GiSkills } from "react-icons/gi";
import { colors } from "../styles/colors";
import ProjetoView from '../pages/Home/Projeto/ProjetoView';
import { FaFileAlt } from "react-icons/fa";
import { FaChartGantt } from "react-icons/fa6";

// Carregamento preguiçoso (lazy loading) das páginas
const Cliente = React.lazy(() => import('../pages/Home/Cliente'));
const Empresa = React.lazy(() => import('../pages/Home/Empresa'));
const Habilidade = React.lazy(() => import('../pages/Home/Habilidade'));
const Tag = React.lazy(() => import('../pages/Home/Tag'));
const Projeto = React.lazy(() => import('../pages/Home/Projeto/Projeto'));
const Kanban = React.lazy(() => import('../pages/Home/Kanban/Kanban'));
const Gantt = React.lazy(() => import('../pages/Home/Gantt/Gantt'));

const Home = React.lazy(() => import('../pages/Home'));
const Form = React.lazy(() => import('../pages/Home/form'));
const ModalExample = React.lazy(() => import('../pages/Home/modal'));
const Charts = React.lazy(() => import('../pages/Home/charts'));

// Rotas dinâmicas (pode ser carregado de uma API)
export const defaultRoutes = [
    { key: '/Gantt', icon: <FaChartGantt style={{ color: colors.white }}/>, label: <span style={{ color: colors.white }}>Projeto</span>, element: Gantt, roles: [roles.roleAdmin] },
    { key: '/cliente', icon: <IoMdPeople style={{ color: colors.white }} />, label: <span style={{ color: colors.white }}>Cliente</span>, element: Cliente, roles: [roles.roleAdmin] },
    { key: '/empresa', icon: <HiBuildingOffice style={{ color: colors.white }} />, label: <span style={{ color: colors.white }}>Empresa</span>, element: Empresa, roles: [roles.roleAdmin]},
    { key: '/habilidade', icon: <GiSkills style={{ color: colors.white }}/>, label: <span style={{ color: colors.white }}>Habilidade</span>, element: Habilidade, roles: [roles.roleAdmin] },
    { key: '/tag', icon: <IoIosPricetag style={{ color: colors.white }}/>, label: <span style={{ color: colors.white }}>Tag</span>, element: Tag, roles: [roles.roleAdmin] },
    { key: '/projeto', icon: <FaFileAlt style={{ color: colors.white }}/>, label: <span style={{ color: colors.white }}>Projeto</span>, element: Projeto, roles: [roles.roleAdmin] },
    { key: '/projeto/:id', icon: <IoIosPricetag style={{ color: colors.white }} />, label: <span style={{ color: colors.white }}>Projeto Detalhado</span>, element: ProjetoView, roles: [roles.roleAdmin], hidden: true },
    { key: '/Kanban', icon: <IoMdMove  style={{ color: colors.white }}/>, label: <span style={{ color: colors.white }}>Projeto</span>, element: Kanban, roles: [roles.roleAdmin] },

    { key: '/', icon: <AiFillHome style={{ color: colors.white }}/>, label: 'Home', element: Home, roles: [roles.roleAdmin] },
    { key: '/form', icon: <AiFillEdit style={{ color: colors.white }}/>, label: 'Formulário - Exemplo', element: Form, roles: [roles.roleAdmin] },
    { key: '/formbuilder', icon: <AiOutlineForm style={{ color: colors.white }}/>, label: 'Gerador de Form', element: DragAndDropForm, roles: [roles.roleAdmin] },
    { key: '/modal', icon: <AiOutlineWindows style={{ color: colors.white }}/>, label: 'Modal - Exemplo', element: ModalExample, roles: [roles.roleAdmin] },
    { key: '/charts', icon: <AiOutlinePieChart style={{ color: colors.white }}/>, label: 'Charts - Exemplo', element: Charts, roles: [roles.roleAdmin] },
];