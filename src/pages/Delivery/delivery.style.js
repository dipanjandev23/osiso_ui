import styled from "styled-components";

export const Wrapper = styled.div`
    margin-top: 30px;
    padding: 0 100px;
    box-sizing: border-box;

    h2 {
        color: #EB5757;
        text-align: center;
        font-size: 28px;
        margin-bottom: 50px;
        font-weight: normal;
    }

    .hidden {
        display: none;
    }

    .top {
        margin-bottom: 50px;
        .nav_box {
            border: 1px solid lightgray;
            box-sizing: border-box;
            padding: 10px;
            .navs {
                margin: 0 !important;
                color: #292929;
                opacity: .3 !important;
                text-align: center !important;
                text-decoration: none !important;
            }
            .active p{
                font-weight: 600;
                opacity: 1 !important;
            }
        }
        .f, .l {
            border-left: none;
            border-right: none;
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
    .space {
        padding: 40px !important;
        box-sizing: border-box;
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
    .box {
        margin-bottom: 50px !important;
        background: white;
        margin: 0 auto;
        padding: 10px 20px;
        box-sizing: border-box;
        box-shadow: 2px 2px 14px 0 rgba(0,0,0,0.06);
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
    .primary {
        font-size: 18px;
        background: #2D9CDB;
        width: 224.82px;
        height: 55px;
        border-radius: 4px;
        font-weight: 600;
        border: none;
        box-shadow: none;
    }
    @media screen and (max-width: 750px) {
        .hidden {
            display: block;
        }
        padding: 0 50px;
        .show {
            display: none;
        }
        .right {
            text-align: left !important;
        }
    }

    @media screen and (max-width: 600px) {
        .box .inner{
          padding: 0 !important;
        }
     .box button {
        color: white;
        padding: 14px 12px;
        box-sizing: border-box;
        font-size: 13px;
        font-weight: 600;
        }
      }

    
    .rButton {
        width: 35px;
        height: 25px;
        vertical-align: middle;
    }

    .rtext{
        font-style: normal;
        font-weight: normal;
        line-height: normal;
        font-size: 14px;
        color: #292929;
    }

    .divText{
        height:42px;
        color:#17a2b8;
    }


    // New Design
    .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 14px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    
    /* Hide the browser's default radio button */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }
    
    /* Create a custom radio button */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 50%;
    }
    
    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #ccc;
    }
    
    /* When the radio button is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: #2196F3;
    }
    
    /* Create the indicator (the dot/circle - hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    
    /* Show the indicator (dot/circle) when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }
    
    /* Style the indicator (dot/circle) */
    .container .checkmark:after {
         top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
    }
    
`