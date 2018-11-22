import styled from 'styled-components';
import Colors from '../../colors';

export const Wrapper = styled.div`
    width: 100vw;
    overflow: hidden;
    padding: 55px;
    box-sizing: border-box;
    background: linear-gradient(105.03deg, #2B99D8 0%, #1174AC 100%);
    .footer {
        .fot {
            margin-bottom: 25px;
            li {
                color: ${Colors.colorWhite};
                list-style: none;
                margin-bottom: 10px;
                span {
                    margin-right: 10px;
                }
            }
            .head {
                font-weight: bolder;
            }
        }
    }
`