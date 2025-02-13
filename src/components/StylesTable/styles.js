import styled from "styled-components";
import { Table, Pagination, Select } from "antd";
import { colors } from "../../styles/colors";

export const StyledTable = styled(Table)`
  overflow: hidden; /* Garante que o border-radius seja aplicado corretamente */

  .custom-row {
    background-color: ${colors.cinzaTabela};
    transition: background 0.3s;
  }

  .custom-row:hover {
    background-color: ${colors.linha};
  }

  .custom-header-cell {
    background-color: ${colors.cinzaTabelaHeader} !important;
    color: ${colors.cinzaIcone} !important;
    padding: 14px 16px !important; /* Espaçamento interno do cabeçalho */
    border-bottom: 1px solid ${colors.cinzaTabelaHeader} !important;
  }

  .custom-cell {
    border-bottom: 1px solid ${colors.cinzaTabelaHeader} !important;
    padding: 12px 16px !important; /* Espaçamento interno das células */
    color: ${colors.cinzaIcone} !important;
  }

  /* Adiciona espaçamento entre as colunas */
  .ant-table-cell {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
`;

export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center; /* Centraliza os itens verticalmente */
  padding: 16px;

  .ant-pagination-item {
    background-color: ${colors.cinzaTabela};
    border: 1px solid ${colors.cinzaTabelaHeader};
    margin: 0 8px; /* Aumenta o espaçamento entre os números da paginação */
    transition: all 0.3s ease;
  }

  .ant-pagination-item a {
    color: ${colors.cinzaIcone};
  }

  .ant-pagination-item-active {
    background-color: ${colors.linha} !important;
    border-color: ${colors.linha} !important;
  }

  .ant-pagination-item-active a {
    color: white !important;
    font-weight: bold;
  }

  .ant-pagination-item:hover {
    background-color: ${colors.linha};
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    background-color: ${colors.cinzaTabela};
    border: 1px solid ${colors.cinzaTabelaHeader};
    margin: 0 8px; /* Aumenta o espaçamento dos botões de navegação */
  }

  .ant-pagination-prev a,
  .ant-pagination-next a {
    color: ${colors.cinzaIcone};
  }

  .ant-pagination-prev:hover,
  .ant-pagination-next:hover {
    background-color: ${colors.linha};
    border-color: ${colors.linha};
  }

  .ant-pagination-disabled {
    background-color: ${colors.cinzaTabela} !important;
    border-color: ${colors.cinzaTabelaHeader} !important;
  }

  .ant-pagination-disabled a {
    color: ${colors.cinzaIcone} !important;
  }

  /* Estilo para o seletor de páginas */
  .ant-select-selector {
    background-color: ${colors.cinzaTabela} !important;
    border: 1px solid ${colors.cinzaTabelaHeader} !important;
    border-radius: 4px !important;
    color: ${colors.cinzaIcone} !important;
    padding: 0 8px !important;
  }

  .ant-select-arrow {
    color: ${colors.cinzaIcone} !important;
  }

  .ant-select-dropdown {
    background-color: ${colors.cinzaTabela} !important;
    border: 1px solid ${colors.cinzaTabelaHeader} !important;
  }

  .ant-select-item {
    color: ${colors.cinzaIcone} !important;
  }

  .ant-select-item-option-selected {
    background-color: ${colors.linha} !important;
    color: white !important;
  }

  .ant-select-item-option-active {
    background-color: ${colors.linha} !important;
    color: white !important;
  }
`;