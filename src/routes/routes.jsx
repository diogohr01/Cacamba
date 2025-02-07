import React from "react";
import { AiFillEdit, AiFillHome, AiOutlineForm, AiOutlinePieChart, AiOutlineWindows } from 'react-icons/ai';
import { roles } from '../helpers/roles';
import DragAndDropForm from "../pages/Home/formBuilder";
import { HiBuildingOffice } from "react-icons/hi2";
import { IoIosPricetag, IoMdPeople } from "react-icons/io";
import { GiSkills } from "react-icons/gi";
import { colors } from "../styles/colors";
import ProjetoView from '../pages/Home/Projeto/ProjetoView';
import { FaFileAlt } from "react-icons/fa";

// Carregamento preguiçoso (lazy loading) das páginas
const Cliente = React.lazy(() => import('../pages/Home/Cliente'));
const Empresa = React.lazy(() => import('../pages/Home/Empresa'));
const Habilidade = React.lazy(() => import('../pages/Home/Habilidade'));
const Tag = React.lazy(() => import('../pages/Home/Tag'));
const Projeto = React.lazy(() => import('../pages/Home/Projeto/Projeto'));

const Home = React.lazy(() => import('../pages/Home'));
const Form = React.lazy(() => import('../pages/Home/form'));
const ModalExample = React.lazy(() => import('../pages/Home/modal'));
const Charts = React.lazy(() => import('../pages/Home/charts'));

// Rotas dinâmicas (pode ser carregado de uma API)
export const defaultRoutes = [
    { key: '/cliente', icon: <IoMdPeople style={{ color: colors.cinzaIcone }} />, label: <span style={{ color: colors.cinzaIcone }}>Cliente</span>, element: Cliente, roles: [roles.roleAdmin] },
    { key: '/empresa', icon: <HiBuildingOffice style={{ color: colors.cinzaIcone }} />, label: <span style={{ color: colors.cinzaIcone }}>Empresa</span>, element: Empresa, roles: [roles.roleAdmin]},
    { key: '/habilidade', icon: <GiSkills style={{ color: colors.cinzaIcone }}/>, label: <span style={{ color: colors.cinzaIcone }}>Habilidade</span>, element: Habilidade, roles: [roles.roleAdmin] },
    { key: '/tag', icon: <IoIosPricetag style={{ color: colors.cinzaIcone }}/>, label: <span style={{ color: colors.cinzaIcone }}>Tag</span>, element: Tag, roles: [roles.roleAdmin] },
    { key: '/projeto', icon: <FaFileAlt style={{ color: colors.cinzaIcone }}/>, label: <span style={{ color: colors.cinzaIcone }}>Projeto</span>, element: Projeto, roles: [roles.roleAdmin] },
    { key: '/projeto/:id', icon: <IoIosPricetag style={{ color: colors.cinzaIcone }} />, label: <span style={{ color: colors.cinzaIcone }}>Projeto Detalhado</span>, element: ProjetoView, roles: [roles.roleAdmin], hidden: true },

    { key: '/', icon: <AiFillHome style={{ color: colors.cinzaIcone }}/>, label: 'Home', element: Home, roles: [roles.roleAdmin] },
    { key: '/form', icon: <AiFillEdit style={{ color: colors.cinzaIcone }}/>, label: 'Formulário - Exemplo', element: Form, roles: [roles.roleAdmin] },
    { key: '/formbuilder', icon: <AiOutlineForm style={{ color: colors.cinzaIcone }}/>, label: 'Gerador de Form', element: DragAndDropForm, roles: [roles.roleAdmin] },
    { key: '/modal', icon: <AiOutlineWindows style={{ color: colors.cinzaIcone }}/>, label: 'Modal - Exemplo', element: ModalExample, roles: [roles.roleAdmin] },
    { key: '/charts', icon: <AiOutlinePieChart style={{ color: colors.cinzaIcone }}/>, label: 'Charts - Exemplo', element: Charts, roles: [roles.roleAdmin] },
];