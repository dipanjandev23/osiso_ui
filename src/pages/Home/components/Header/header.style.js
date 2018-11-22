import styled from 'styled-components';
import MainBg from '../../../../assets/mainbg.jpeg';

export const Wrapper = styled.div`

    height: 565.98px;
    padding: 0;
    margin: 0;

    background: -moz-linear-gradient(top, rgba(0, 0, 0,0.2) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.4) 100%), url(${MainBg}) no-repeat;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(59%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0.65))), url(${MainBg}) no-repeat;
    background: -webkit-linear-gradient(top, rgba(0, 0, 0,0.2) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.4) 100%), url(${MainBg}) no-repeat;
    background: -o-linear-gradient(top, rgba(0, 0, 0,0.2) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.4) 100%), url(${MainBg}) no-repeat;
    background: -ms-linear-gradient(top, rgba(0, 0, 0,0.2) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.4) 100%), url(${MainBg}) no-repeat;
    background: linear-gradient(to top, rgba(0, 0, 0,0.2) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.4) 100%), url(${MainBg}) no-repeat;
    
    background-position: top !important;
    background-size: cover !important;
    background-repeat: none !important;

    .content {
        margin-top: 80px;
        padding: 0px 100px;
        color: white;
        box-sizing: border-box;
        
        .lead {
            max-width: 500px;
            font-size: 18px;
        }

        .btn {
            width: 225px;
            padding: 0;
        }
    }

    @media screen and (max-width:995px) {
        .content {
            padding-top: 30px !important;
        }
    }
    @media screen and (max-width:520px) {
        .content {
            padding-left: 30px !important;
            padding-right: 30px !important;
        }
    }
`