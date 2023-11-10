# 🦁멋쟁이 사자처럼 Front-End School ➕Plus 1기: Typescript 미니 프로젝트(TODO App)

🗓️ 기획 기간 : 2023.11.05 ~ 2023.11.06

🗓️ 개발 기간 : 2023.11.06

## 팀원 소개

| [우경석](https://github.com/5647kr) | [신명화](https://github.com/MyoungHwaShin) | [서진만](https://github.com/seojinman) |
| :-----------------------------------: | :---------------------------------------: | :-----------------------------------: |
| <img width="200" height="150" src="https://github.com/uzoolove/FESP01-JS-Project/assets/117728530/5ef613c1-2d11-420a-a479-e56e9eab0dfe" /> | <img width="200" height="150" src="https://github.com/uzoolove/FESP01-JS-Project/assets/117728530/a8545de1-8f31-4b60-ad7e-1a57b78a468e" /> | <img width="200" height="150" src="https://github.com/FRONTENDSCHOOL6/ready-act/assets/117728530/31348309-ad72-439f-9420-e4d7f26f8673"/> |


## 🛠️기술 스택

 <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
 <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
 <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">  
 <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black">  
<br/>

### 🧰Tools

<img src="https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

## 📁디렉터리 트리

```
📦src
 ┣ 📂layout
 ┃ ┣ 📜Footer.js
 ┃ ┗ 📜Header.js
 ┣ 📂pages
 ┃ ┣ 📂errors
 ┃ ┃ ┗ 📜Error404.ts
 ┃ ┣ 📂info
 ┃ ┃ ┣ 📜TodoInfo.ts
 ┃ ┃ ┗ 📜TodoInfoApi.js
 ┃ ┣ 📂list
 ┃ ┃ ┣ 📜TodoList.ts
 ┃ ┃ ┗ 📜TodoListApi.js
 ┃ ┣ 📂regist
 ┃ ┃ ┣ 📜TodoRegist.ts
 ┃ ┃ ┗ 📜TodoRegistApi.js
 ┃ ┗ 📂update
 ┃ ┃ ┗ 📜TodoUpdate.ts
 ┣ 📂utils
 ┃ ┗ 📜utils.js
 ┣ 📜App.ts
 ┣ 📜index.css
 ┣ 📜index.ts
 ┣ 📜Router.ts
 ┣ 📜todoapp.d.ts
 ┗ 📜vite-env.d.ts
```


## 🙊미니프로젝트 todolist 회고

 <table>
  <tr>
    <th>우경석</th>
    <td>서툰 조장임에도 불구하고 팀원분들 모두 잘 따라와주시고 부족한 부분은 서로 알려주며 성장하는 5조여서 좋았습니다 팀원분들 모두 열심히 해주셔서 감사합니다</td>
    </tr>
      <tr>
    <th>신명화</th>
     <td>처음으로 타입스크립트를 프로젝트에 적용해 보면서 부족한 점이 있었으나 좋은 팀원들을 만나 부족한 점을 함께 채워가며 성장할 수 있는 좋은 계기가 되었습니다. 5조 화이팅</td>
      </tr>
   <str>
    <th>서진만</th>
     <td>저번에 했던 js프로젝트를 ts로 변환하는 리팩토링 과정을 진행 하면서 아직 ts에 대하여 부족하다는 점을 많이 느끼게 되었습니다. 그리고 팀원분들과 상의를 하면서 코드를 수정해 나아가다보니 좋은 결과를 얻을 수 있었던것 같아 기분이 좋습니다. 5조 화이팅~~</td>
      </str>
  </table>
<br>

## 👀서버 구동

- 프로젝트 루트에서 실행
<!-- * -s 옵션: 라우터를 추가할 경우 클라이언트가 요청한 모든 URL에 대해서 index.html을 응답하도록 설정 -->

```
cd 02.typescript/todoapp
npm i
mpu run dev
```

<!-- * -s 옵션: 라우터를 추가할 경우 클라이언트가 요청한 모든 URL에 대해서 index.html을 응답하도록 설정
```
cd 01.javascript
npx serve -s .
``` -->

- http://localhost:3000 접속

  - 이미 3000 포트가 사용중일 경우 콘솔 안내 메세지에 따라서 접속

## 👀api 서버 구동

```
cd api
npm i
npm start
```

- api 서버 사용방법: http://localhost:33088/apidocs
