import styled from "styled-components";

export const StyledSemester= {
    Flex: styled.div`
        display: flex;
        .flexFile{
            width:100%;
            display: flex;
            justify-content: center;
           
        }
        .nameFile{
            font-size: 22px;
            margin-right: 20px;
        }
        .iconDown{
            font-size: 28px;
            color: #00008B;
        }
        .divFile{
            //margin-top: 85px;
            display: flex;
            justify-content:center;

        }
        .FolderFile{
            width:40%;
        }
        .iconFile{
            color: #2E8B57;
            font-size: 30px;
            margin-right: 10px;
        }
        .bodyFile{
            display: flex;
            margin-bottom: 15px;
        }
        .Body{
            width: 86%;
    display: flex;
    justify-content: center;
        }
    `,
    ButtonAdd: styled.button`
        background: #66CDAA;
        padding: 10px;
        border: none;
        border-radius: 5px;
    `,
    Body: styled.div`
        .folderIcon{
            margin-right: 10px;
            font-size: 27px;
        }
        .folder{
            display: flex;
            font-size: 20px;
        }
    
        table , td, th {
            border: 1px solid #ddd;
            text-align: center;
        };
        table {
            border-collapse: collapse;
            width: 100%;

        }
        th, td {
            padding: 15px 5px;
    }
    .luu{
        display: flex;
            justify-content: flex-end;
            padding-bottom: 10px;
    }
    `,
    Div: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    See: styled.button`
        background: #4682B4;
        padding: 10px;
        border: none;
        color: white;
        border-radius: 5px;
        a {
            text-decoration: none;
            color: white;
        }
    `,
    Delete: styled.button`
        background: red;
        padding: 10px;
        border: none;
        color: white;
        border-radius: 5px;
    `,
    Save: styled.button`
        background: #32CD32	;
        padding: 10px;
        border: none;
        float: right;
        width: 80px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
    `,

    Popup: styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  

  @-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}
table {
    padding: 20px;
}


    `,
    PopupTitle: styled.div`
        display: flex;
        
    `,
    Popuptext: styled.h1`
        flex: 95%;
        text-align: center;
`,


    PopupContent: styled.div`
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 80%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s;
        .Divpopup{
            padding: 0 40px 40px;
        }
        .save{
            display: flex;
            justify-content: flex-end;
            padding-bottom: 10px;
        }
        .scroll-table {
        height: 450px;
        overflow-y: auto;
}
.wrap table {
  table-layout: fixed;
  width: 100%;
}
     `,
     PopupContent1: styled.div`
     h1{
        text-align: center;
    font-size: 29px;
    color: #006699;
     };
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 35%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s
        
     `,
     DivInput: styled.div`
     display: flex;
    flex-direction: column;
    align-items: center;
    

    input, select{
        margin-bottom: 20px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid white;
        background: #F5F5F5;
        &::placeholder{
            padding-left: 15px;
            font-size: 15px;
            
        }
        &:focus{
            border: 1px hidden #C8C8C8;
            background: white;
        }
    }

     `,
     DivLable:styled.div`
     width: 70%;
     display: flex;
     flex-direction: column;
    
     label{
        margin: 0 0 10px 15px;
     }
     
     `,
     DivSpan: styled.div`
     display: flex;
     justify-content: flex-end;
     span{
        font-size: 25px;
    margin: 0 20px -28px 0;
    font-weight: 900;
    cursor: pointer;
     }

     `,
     DivButton: styled.div`
        margin-bottom: 25px;
        button{
            margin: 0 15px;
            cursor: pointer;
        }
     `,

     Close: styled.span`
        flex: 5%;
        text-align: center;
        font-size: 28px;
        font-weight: bold;

        &:hover, &:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
     `,
     LoginDiv: styled.div`
    
        display: flex;
        height: 500px;
        justify-content: center;
        align-items: center;
        `,
     Login: styled.div`
     background-color: #F0F0F0;
    width: 35%;
    height: 400px;
    .button, p{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h1{
        text-align: center;
        color: #00008B;
    }
    button{
        margin-top: 10px;
    width: 25%;
    height: 38px;
    color: white;
    background: #008080;
    border: none;
    font-weight: bold;
    }

        
     `,
     Form: styled.form`
    
        display: flex;
        justify-content: center;
        align-items: center;

        input{
            margin: 15px 0;
            width: 250px;
            height: 30px;
            border-radius: 8px;
            border: 1px solid #4682B4;
        }
        `,
}