import styled from "styled-components";

export const StyledHeader= {
    Body: styled.div `
    display: flex;
    width: 100%;
    
        
        `,
    Img: styled.img `
    width: 100%;
        
    `,
    MenuBody: styled.div `
    height: 500px;
        display: block;
        color: #1E90FF;
        justify-content: center;
        //text-decoration: none;
       //width: 15%;
       margin-right: 30px;
       width: 190px;
       margin-top: 37px;
       background: #DC4E41;
       padding: 0 25px;
       
        
    `,
    MenuDiv: styled.div`
        
    `,
    Menu1: styled.div `
    &:hover{
        background: #43CD80;
        .color{color: #FFFF00;}
       }
      
    .color{
        color: white;
        font-weight: 500;
    }
    
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #E8E8E8;
        span{
            padding-left: 8px;
        }
        
        a {
            text-decoration: none;
        }
        
    `,
    
    Menu2: styled.div `
        
    `,
    Menu3: styled.div `
        
    `,
    Menu4: styled.div `
        
    `,
    Menu5: styled.div `
        
    `,
    Menu6: styled.div `
        
    `,
}