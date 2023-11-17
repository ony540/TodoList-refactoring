# 🦁 FESP01 미니 프로젝트 - 개인 리팩토링 (TODO App)

<br>

## 목표 🎯

- 데이터를 redux로 다뤄 전역 상태 관리해보자!
- search와 sorting 기능을 구현하자!

<br>

## 프로젝트 소개

- 프로젝트 구성은 `vite` 를 사용해 TypeScript를 적용하였습니다.

- `Styled Components` 라이브러리를 이용하여 사용자 UI 디자인을 변경하였습니다.

- react-router-dom에 내장되어 있는 `BrowserRouter` 컴포넌트를 통해 라우터 기능을 구현하였습니다.

- `Axios` 통한 데이터 CRUD 작업을 진행하고 `Redux`를 사용하여 데이터를 관리하였습니다.

- `Prettier` 설정을 통해 포맷팅을 지원하였습니다.

<br>

## 시작 가이드

### api 서버 구동 🌐

- 프로젝트 루트에서 실행

```
$ cd api
$ npm i
$ npm start
```

- api 서버 사용방법: http://localhost:33088/apidocs

### todo 웹 실행 💻

- 프로젝트 루트에서 실행

```
$ cd react
$ npm i
$ npm run dev
```

- 출력된 접속 정보 확인해서 개발 서버 접속
  - 기본 포트는 5173으로 구동되고 해당 포트가 사용중일 경우 번호가 하나씩 증가
  - http://localhost:5173/
- HMR (Hot Module Replacement) 지원됨

<br>

## Stacks 🐈

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Config

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Development

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![styledcomponents](https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white) <br>
![reactrouter](https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white)
![axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)

<br>

## 주요 기능 ⚙️

### 1. 메인페이지

- todolist 조회
- todolist 완료/미완료 체크
- todolist 수정
- todolist 삭제
- todolist 검색

### 2. 등록페이지

- todolist 생성

<br>

[⬆️ 상단으로 이동](#🦁-fesp01-미니-프로젝트---개인-리팩토링-todo-app)
