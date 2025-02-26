import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
   body {  
      margin: 0;
      padding: 0;
      font-family: 'Noto Sans TC', sans-serif;
      background: #f5f5f5;
   }
   a {
      text-decoration: none;
      color: inherit;
   }
   * {
      box-sizing: border-box;
   }
   button {
      cursor: pointer;
   }
   h1, h2, h3, h4, h5, h6 {
      margin: 0;
      font-weight: normal;
   }
   p {
      margin: 0;
      line-height: 1.5;
   }
`

export default GlobalStyle
