import styled from "styled-components";
import Bg from '../../assets/bg.jpg';
import Colors from "../../colors";

export const Container = styled.div`
    background: ${Colors.colorAccent} !important;
    width:100vw;
    min-height: 100vh;
    overflow: hidden;

    .immediate {
        padding: 0 180px;
        box-sizing: border-box;
        margin-top: -50px;
        .Box {
            background: ${Colors.colorWhite};
            padding: 0;
            box-shadow: ${Colors.shadow};
            border-radius: 8px;
            overflow: hidden;
            .header {
                padding:12px 50px;
                box-sizing: border-box;
                img {
                    width: 15px;
                    height: 24px;
                }
                span {
                    vertical-align: middle
                }
            }
            hr {
                margin: 0;
            }
            span {
                font-size: 18px;
                font-weight: 600;
                margin-left: 30px;
            }
            .content {
                padding: 20px 46px;
                box-sizing: border-box;
                img {
                    vertical-align: middle;
                    margin-top: 25px;
                }
                span {
                    margin-left: 0px;
                }
            }
            .estimate {
                p {
                    font-size: 21px;
                    font-weight: 600;
                }

                span {
                    margin-left: 10px;
                    color: ${Colors.primary};
                }
            }
        }
    }

    .seehow {
        padding: 100px;
        box-sizing: border-box;
        padding-top: 20px;
        padding-bottom: 20px;
        .top {
            text-align: center;
            margin-bottom: 50px;
            p {
                font-size: 18px;
                margin-top: 20px;
                margin-bottom: 50px;
            }
            .normal {
                padding: 10px 32px;
                background-color: ${Colors.colorWhite};
                color: ${Colors.colorBlack};
                font-size: 18px;
                border: none;
                box-sizing: border-box;
                outline: none !important;
                box-shadow: none !important;
            }
            .active {
                color: ${Colors.colorWhite};
                background-color: ${Colors.primary};
            }
        }
        .boxes {
            .box {
                margin-bottom: 20px;
                padding: 0 5px;
                box-sizing: border-box;
            }
            .colbox {
                text-align: center;
                padding: 40px 50px;
                background-color: white;
                box-sizing: border-box;
                border-radius: 5px;
                // height: 330px;
                height:275px;
                overflow:hidden;

                img {
                    width: 100%;
                    height: 130px;
                }
                p { 
                    margin-top: 40px;
                    font-size: 16px;
                    font-weight: 600;
                }
            }
        }
    }

    .main_pack {
        padding: 0;
        .packages {
            padding: 77px 100px;
            background: url(${Bg});
            .top {
                text-align: center;
                margin-bottom: 40px;
                p {
                    font-size: 18px;
                    margin-top: 20px;
                    margin-bottom: 50px;
                }
            }
            .pack_box {
                text-align: center;
                background-color: ${Colors.colorWhite};
                // margin-top: 50px;
                padding: 40px 30px;
                box-sizing: border-box;
                border-radius: 5px;
                height: 700px;
                overflow:hidden;
                box-shadow: ${Colors.shadow};
                div {
                    h1 {
                        font-family: 'Oswald', san-serif;
                        font-size: 21px;
                        margin-top: 30px;
                    }
                    h2 {
                        font-size: 24px;
                        margin-bottom: 30px;
                    }
                    .blue {
                        color: #2D9CDB;
                    }
                    .orange {
                        color: #F18E00;
                    }
                    .red {
                        color: #EB5757;
                    }
                    .green {
                        color: #8AF86F;
                    }
                    .features {
                        height: 350px;
                    }
                    p {
                        font-size: 18px;
                        margin-top: 10px;
                    }
                    .b1,.b2,.b3 {
                        border-right: 1px solid rgba(171, 171, 171, 0.4);
                    }
                    .b1,.b2,.b3,.b4 {
                        padding: 10px;
                    }
                    .btn {
                        padding: 0 20px;
                        box-sizing:border-box;
                        margin-bottom: 40px;
                    }
                }
            }
            .video {
                height: 600px;
                margin-top: 100px;
                background-color: lightgray;
            }
        }
    }
    .cus_con {
        padding: 0;
        .customers {
            padding: 40px 100px;
            text-align: center;
        }
        .swiper-container {
            height: 300px;
            margin-bottom: 70px;
        }

        img{
            max-width: 100%;
            height: auto;
            display: block;
        }
    }
    .create_main {
        padding: 30px;
        box-sizing: border-box;
        background: ${Colors.primary};
        .create_box {
            background: white;
            // max-width: 1100px;
            max-width:1045px;
            min-height:150px;
            margin: 0 auto;
            padding: 42px 30px;
            box-shadow: ${Colors.shadow};
            border-radius: 8px;
            box-sizing: border-box;
            overflow: hidden;

            h1 {
                font-size: 24px;
                font-weight: 600;
                margin-top: 10px;
            }
            .creatAccH1
            {
                font-size:22px !important;
            }
        }
    }

    @media screen and (max-width: 1024px) and (min-width: 768px) {
        input,select {
            font-size: 11px! important;
        }
        .pack_box {
            height: auto !important;
            overflow: auto !important;
            .b2 {
                border: none !important;
            }
        }
    }
    @media screen and (min-width:768px) and (max-width: 993px) {
        .create_box {
            text-align: center !important;
        }
        .pack_box {
            height: auto !important;
            overflow: auto !important;
            .b2 {
                border: none !important;
            }
        }
    }

    @media screen and (max-width:995px) {
        .immediate {
            padding: 0 100px;
        }
        .pack_box {
            height: auto !important;
            overflow: auto !important;
            .b2 {
                border: none !important;
            }
            .b1,.b2,.b3 {
                border: none !important;
            }
        }
        .video {
            height: 300px !important;
        }
    }
    @media screen and (max-width:520px) {
        body {
            background: rgb(233, 233, 233) !important;
        }
        .header span {
            font-size: 15px !important;
        }
        .HomeContent,.immediate,.seehow,.packages,.create {
            padding-left: 30px !important;
            padding-right: 30px !important;
        }
        .pack_box {
            height: auto !important;
            overflow: auto !important;
            .b1,.b2,.b3 {
                border: none !important;
            }
            .features {
                height: 200px !important;
            }
            .b3,.b4 {
                .features {
                    height: 280px !important;
                }
            }
            .col {
                margin-bottom: 50px !important;
            }
        }
        .video {
            height: 200px !important;
        }
    }
`