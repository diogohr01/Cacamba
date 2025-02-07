import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export default createGlobalStyle`
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: rgb(38, 50, 56);
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${colors.primary};
        border-radius: 20px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${colors.primary}30;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: rgb(38, 50, 56);
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${colors.primary}75;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${colors.primary}75;
    }

    body{
        margin: 0px !important;
        background-color: rgb(38, 50, 56) !important;
        transition: all 250ms linear 0s;
    }

    * {
        font-family: 'Montserrat', sans-serif !important;
    }

    html {
        font-size: 14px;
        position: relative;
        min-height: 100%;
    }
    
    .ant-form-item {
        margin-bottom: 10px !important;
    }
`;