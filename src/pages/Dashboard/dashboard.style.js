import styled from "styled-components";

export const Wrapper = styled.div`
    overflow: hidden;
    width: 100%;
    min-height: 100vh;
    background: #F5F5F5;
    * {
        box-sizing: border-box;
    }
    .b {
        button {
            background-color: #2D9CDB;
            border: none;
            font-size: 18px !important;
            padding: 15px;
        }
    }
    .inner {
        padding: 0 5px;
    }
    .hidden {
        display: none;
    }
    .show {
        display: block;
    }
    .space {
        padding: 40px !important;
        box-sizing: border-box;
    }
    .onHover{
        cursor:pointer;
    }
    .onHoverUnder{
        cursor:pointer;
        text-decoration:underline;
    }
    .onHoverComplain{
        cursor:pointer;
        color:#EB5757 !important;
        font-weight:600;
    }
    
    .profile-header{
        padding: 30px;
        color: #999a9b;
        font-weight: 600;
        font-size: 18px;
    }
    .btn-profile{
        background: #2D9CDB;
        border: none;
        font-size: 14px !important;
        padding: 14px;
    }
    .img-profile{
        height: 150px;
        padding: 20px 50px;
        display: table;
        float: none;
        margin: 0 auto;
    }
    .header {
        .logo {
            background-color: #2D9CDB;
            padding: 25px 80px;
            .text {
                color: white;
                font-size: 35px;
                padding: 10px 0px;
                line-height: 0 !important;
                vertical-align: middle; 
            }
            .btn {
                line-height: 0 !important;
                a {
                    color: white;
                    text-decoration: none;
                    font-size: 12px;
                    box-sizing: border-box;
                    border-radius: 4px;
                    padding: 10px 20px;
                    background-color: #F18E00;
                }
            }
            .right {
                text-align: right;
            }
        }
        .nav {
            padding: 20px 110px;
            background: white;
            font-size:14px !important;
            text-align:center;
            span {
                margin-left: 10px;
                vertical-align: middle;
            }
            a {
                color: black !important;
                text-decoration: none !important;
            }
            select {
                width: 100%;
                height: 50px;
                padding: 10px;
                border-radius: 4px;
            }        
            @media screen and (max-width: 650px) {
                padding: 20px 40px !important;
            }
        }
    }
    .content {
        padding: 50px 110px;
        .top {
            margin-bottom: 20px;
            button {
                color: white;
                font-size: 10px;
            }
        }
        .shadow {
            border: 1px solid #F5F5F5;
            border-radius: 4px;
            box-shadow: none !important;
            .head {
                label {
                    color: #2D9CDB;
                    font-weight: 700;
                }
                padding: 20px 30px !important;
                margin: 0 !important;
            }
            .content {
                padding: 10px 30px !important;
            }
        }
        .box {
            padding:0;
            margin:0;
            background: white;
            min-height: 270px;
            overflow: hidden;
            hr {
                margin:0;
                padding:0;
            }
            .head {
                padding: 30px;
                img {
                    width: 24px;
                    height: 24px;
                }
                p {
                    text-align: left !important;
                    line-height:0;
                    margin:0;
                    padding:0;
                }
                .well {
                    background-color: #F5F5F5;
                    padding: 5px;
                    box-sizing: border-box;
                    border-radius: 4px;
                    font-size: 12px;
                    .active {
                        color: #2D9CDB;
                    }
                }

                .add-fund-btn {
                    width: auto;
                    float: right;
                    height: 35px;
                    margin-top: -15px;
                    font-size: 14px;
                    background: #2D9CDB;
                }
            }
            .field {
                input {
                    background-color: #FAFAFA;
                    padding: 15px;
                }
            }
            .badge-style{
                width: 100%;
                white-space: normal;
                word-break: break-all;
            }
            .content {
                padding: 30px;
                font-size:15px;
                .ref {
                    text-align:center;
                    h1 {
                        color: #2D9CDB;
                    }
                }
                .cards {
                    min-height: 100px;
                    .del {
                        img {
                            vertical-align: middle;
                        }
                    }
                    .inner {
                        height: 100%;
                        img {
                            text-align: right;
                        }
                        .atm {
                            border-radius: 5px;
                            height: 100%;
                            padding: 5px 15px;
                            box-shadow: 2px 2px 10px 0 rgb(0,0,0,0.2);
                            background: linear-gradient(#0D98C9, #005387);
                            .mc {
                                text-align: right;
                                img {
                                    
                                }
                            }
                            .chip {
                                img {
                                    width: 40px;
                                    height: 40px;
                                }
                            }
                            div .acctNum {
                                color: white;
                                font-weight:300;
                                text-shadow: 2px 2px black;
                            }
                            div .name {
                                font-weight:600;
                                font-size: 10px;
                                color: #F5F5F5;
                                text-shadow: 2px 2px black;
                            }
                        }

                        // .minibox {
                        //     margin-bottom: 40px !important;
                        //     background: white;
                        //     margin: 0 auto;
                        //     padding: 30px;
                        //     box-sizing: border-box;
                        //     text-align: center;
                        //     box-shadow: 2px 2px 14px 0 rgba(0,0,0,0.06);
                        //     border-radius: 8px;
                        //     height: 155px;
                        //     overflow: hidden;
                        //     cursor:pointer;
                        // }

                    }
                }
                .border {
                    border: none !important;
                    border-right: 2px solid rgba(171, 171, 171, 0.4) !important;
                }
                .text {
                    text-align: center;
                    button {
                        padding: 10px 30px !important;
                        background: #2D9CDB;
                        border: none;
                        font-size: 15px;
                    }
                    p {
                        font-size: 25px;
                        // text-align: left;
                    }
                }

                .row-pad{
                    padding: 0 0px 15px 0px !important;
                }
                .form {
                        .btngroup {
                            button {
                                border-radius: 0;
                                background-color: white;
                                border: 1px solid #F5F5F5;
                                color: #ABABAB;
                            }
                            .active {
                                background-color:#2D9CDB ;
                                color: white;
                            }
                        }
                        button {
                            background: #2D9CDB;
                            border: none;
                            font-size: 14px;
                            padding: 14px;
                            font-weight:600;
                        }
                        input {
                           // color: #ABABAB !important;
                            font-size: 14px;
                            // width: 100%;
                           // padding: 14px;
                           // height: 51px;
                        }
                        .check {
                            width: auto !important;
                            padding: 0 !important;
                            height: auto !important;
                        }
                        input::placeholder {
                            color: #ABABAB !important;
                        }
                        .txtarea {
                            height: 120px;
                            color: #ABABAB !important;
                            font-size: 14px;
                            width: 100%;
                            padding: 14px;
                        }
                        .bgOrange {
                            background-color: #F18E00;
                            padding: 10px 20px;
                        }
                        select {
                           // color: #ABABAB !important;
                            -webkit-appearance: none !important;
                            -moz-appearance: none;
                            appearance: none;
                            font-size: 14px;
                            height: 51px !important;
                           // padding: 14px;
                        }
                    }

                    .boxin {
                        margin-bottom: 50px !important;
                        background: #2D9CDB;
                        margin: 0 auto;
                        padding: 10px 20px;
                        box-sizing: border-box;
                        border-radius: 8px;
                        overflow: hidden;
                        label {
                            color: white;
                            font-weight: 600;
                        }
                        p {
                            color: white;
                            font-size: 14px;
                            font-weight: 400;
                            img {
                                width: 14px;
                                height: 14px;
                                cursor: pointer;
                            }
                        }
                    }
                    

                    .scheduleBtn {
                        margin: 0 auto;
                        display: table;
                        float: none;
                        font-weight:600;
                        font-size:14px;
                    }


                    .checkbox input[type="checkbox"] {
                        opacity: 0;
                        //height:auto;
                        display:none;
                    }
                    
                    .checkbox label {
                        position: relative;
                        display: inline-block;
                        
                        /*16px width of fake checkbox + 6px distance between fake checkbox and text*/
                        padding-left: 22px;
                    }
                    
                    .checkbox label::before,
                    .checkbox label::after {
                        position: absolute;
                        content: "";
                        
                        /*Needed for the line-height to take effect*/
                        display: inline-block;
                    }
                    
                    /*Outer box of the fake checkbox*/
                    .checkbox label::before{
                        height: 16px;
                        width: 16px;
                        
                        border: 1px solid;
                        left: 0px;
                        
                        /*(24px line-height - 16px height of fake checkbox) / 2 - 1px for the border
                         *to vertically center it.
                         */
                        top: 3px;
                    }
                    
                    /*Checkmark of the fake checkbox*/
                    .checkbox label::after {
                        height: 5px;
                        width: 9px;
                        border-left: 2px solid;
                        border-bottom: 2px solid;
                        
                        transform: rotate(-45deg);
                        
                        left: 4px;
                        top: 7px;
                    }
                    
                    /*Hide the checkmark by default*/
                    .checkbox input[type="checkbox"] + label::after {
                        content: none;
                    }
                    
                    /*Unhide on the checked state*/
                    .checkbox input[type="checkbox"]:checked + label::after {
                        content: "";
                    }
                    
                    /*Adding focus styles on the outer-box of the fake checkbox*/
                    .checkbox input[type="checkbox"]:focus + label::before {
                        outline: rgb(59, 153, 252) auto 5px;
                    }
                
                    /***************END**************/
                   
                    
            }

            .dv-star-rating 
            {
                padding: 20px 30px;
                margin-left: 35px;

                label{
                    font-size:22px !important;
                    
                }
            } 
            
           
        }

        .minibox {
            margin-bottom: 40px !important;
            background: white;
            margin: 0 auto;
            padding: 30px;
            box-sizing: border-box;
            text-align: center;
            box-shadow: 2px 2px 14px 0 rgba(0,0,0,0.06);
            border-radius: 8px;
            height: 155px;
            overflow: hidden;
            cursor:pointer;
        }

        .box-resize {
            margin: 0 auto;
            display: table;
            float: none;

            h2{
                font-size: 1.5rem;
                color: grey;
            }
        }
        .badge{
            font-size:100% !important;
        }

        .box-payment {
            margin-bottom: 50px !important;
            background: white;
            margin: 0 auto;
            padding: 10px 20px;
            box-sizing: border-box;
            // box-shadow: 2px 2px 14px 0 rgba(0,0,0,0.06);
            border-radius: 8px;
            overflow: hidden;
            .inner {
                padding: 30px;
                box-sizing: border-box;
                .send p {
                    width: 60%;
                }
                img {
                    width: 50px;
                    height: 50px;
                    margin-bottom: 10px;
                }
                h3 {
                    color: #2D9CDB;
                    font-size:1rem;
                }
    
                h4{
                    font-size:1.2rem !important;
                }
    
                p{
                    margin-bottom: 0.5rem;
                }
            }
            .bgBlue {
                background-color: #2D9CDB;
            }
            .bgOrange {
                background-color: #F18E00;
            }
            .noBottomSpace {
                margin-bottom: 5px !important
            }
            button {
                color: white;
                padding: 14px 20px;
                box-sizing: border-box;
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 20px;
                border: none;
                box-shadow: none;
            }
            .butFullWidth {
                width: 100% !important;
            }
            button a {
                color: white;
            }
            .right {
                text-align: right;
            }
            .header {
                label{            
                    color: #2D9CDB;
                    font-weight: 700;
                    margin-bottom: 20px;
                }
                img {
                    width: 24px;
                    height: 24px;
                    cursor:pointer;
                    
                }
            }
            .check {
                width: auto !important;
                padding: 0 !important;
                height: auto !important;
            }
    
            .center-div{
                float: none;
                margin: 0 auto;
            }
        }

        .box-heading-review {
            font-size: 1.5rem;
            padding: 25px;
            color: grey;
        }

        

        .review-box {
            margin-bottom: 50px !important;
            background: white;
            margin: 0 auto;
            padding: 10px 20px;
            box-sizing: border-box;
            /* box-shadow: 2px 2px 14px 0 rgba(0,0,0,0.06); */
            border-radius: 8px;
            overflow: hidden;

            .bgBlue {
                background-color: #2D9CDB;
            }
            .bgOrange {
                background-color: #F18E00;
            }
            hr{
                margin-top: 1rem;
                margin-bottom: 1rem;
                border: 0;
                border-top: 1px solid rgba(0,0,0,.1);
            }
            .inner img {
                width: 50px;
                height: 50px;
                margin-bottom: 10px;
            }

            button {
                color: white;
                padding: 14px 20px;
                box-sizing: border-box;
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 20px;
                border: none;
                box-shadow: none;
            }
           
        }
        @media screen and (max-width: 650px) {
            padding: 20px !important;
        }

    }

    @media screen and (max-width: 767px) {
         .header .logo .text{
            font-size:18px;
        }

    }

`