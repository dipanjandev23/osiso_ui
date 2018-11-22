import styled from 'styled-components';
import Colors from '../../colors';

export const Wrapper = styled.div`
    height: 80px;
    width: 100vw;
    background: ${props=>props.bgcolor};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 120px;
    box-sizing: border-box;
    position: ${props=>props.width > 1024 ? `relative` : `fixed`};
    z-index: 9999999999;

    .fullnav {
        text-align: right;
        span {
            margin-left: 25px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            font-size: 16px;
            a {
                color: ${props=>props.color} !important;
                text-decoration: none !important;
            }
            .link {
                margin-right: 10px;
            }
        }

        .cp{
            cursor:pointer;
        }
        .userDisplay{
            color:white;
            font-weight:600;
        }
    }
    .shortnav {
        display: none;
        span {
            margin-left: 25px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            font-size: 16px;
            a {
                color: ${props=>props.color} !important;
            }

            .link {
                margin-right: 10px;
            }
        }
        .social {
            text-align: right;
            float: right;
        }
        .menu {
            text-align: left;
            float: left;
            img {
                width: 24px;
                height: 24px;
            }
        }
    }

    .smlBtn{
        button.close {
            width: 10% !important;
        }
    }

    @media screen and (max-width:1024px) {
        padding: 0 30px;
        .shortnav {
            display: block;
        }
        .fullnav {
            display: none;
        }
    }
`

export const ShortNavContent = styled.div `
    height: 100vh;
    width: 100vw;
    background: #d1e8ef;
    position: fixed;
    z-index: 999;
    margin-top: 80px;

    div {
        margin-top: 40px;
        text-align: center;
        p {
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            font-size: 18px;
            margin-bottom: 40px;
            a {
                color: black !important;
                text-decoration: none !important;
            }
        } 
    }
`

export const ValidationContent = styled.div `
    color: ${Colors.colorRed};
    font-weight:500;
    font-size:14px;
 
`
