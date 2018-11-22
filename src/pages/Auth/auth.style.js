import styled from "styled-components";
import AuthBg from "../../assets/welcomebg.png";
import Colors from "../../colors";

export const Container = styled.div`
    background: url(${AuthBg});
    min-height: 100vh;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center; 
    padding: 20px;
    box-sizing: border-box;

    .box {
        margin: 0 auto;
        height: auto;
        overflow: hidden;
        background: white;
        box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.08);
        border-radius: 8px;
        padding: 32px 61px;
        max-width: 573.63px;
        box-sizing: border-box;
        h1 {
            text-align: center;
            font-style: normal;
            font-weight: normal;
            line-height: normal;
            font-size: 22px;
            margin-bottom: 26px;
            color: ${Colors.headerColor};
        }
    }

    h2{
        font-size:1.2rem;
    }

    .signupMsg
    {
        margin-left: 44%;
        margin-bottom: 20px;
    }

    p{
        font-size: 20px;
    }

    .confirmMail
    {
        padding: 70px 62px !important;
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
        height: 190px;
        overflow: hidden;
        cursor:pointer;
    }

    .minibox-new {
        margin-bottom: 40px !important;
        background: white;
        margin: 0 auto;
        padding: 16px;
        box-sizing: border-box;
        text-align: center;
        box-shadow: 2px 2px 14px 0 rgba(0,0,0,0.06);
        border-radius: 8px;
        height: 190px;
        overflow: hidden;
        cursor:pointer;
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
`