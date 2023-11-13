import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTodoForm } from '@pages/Regist/TodoRegist.hooks';
import { useTodoSubmit } from '@pages/Regist/TodoRegist.hooks';

export default function TodoRegist() {
  const { titleInput, handleTitleChange, contentInput, handleContentChange } = useTodoForm();
  const handleSubmitForm = useTodoSubmit();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitForm(titleInput, contentInput);
  };

  const navigate = useNavigate();

  const handleToHome = () => {
    navigate('/');
  };

  return (
    <>
      <PageStyle id="page">
        <h1>TODO 등록</h1>
        <button onClick={handleToHome} style={{ marginBottom: '50px', padding: '20px' }}>
          HOME
        </button>

        <form className="regist-form" onSubmit={handleSubmit}>
          <div className="regist-title-container">
            <label htmlFor="regist-title">TITLE</label>
            <input
              type="text"
              id="regist-title"
              placeholder="20자 이내"
              maxLength={20}
              value={titleInput}
              onChange={handleTitleChange}
            />
          </div>

          <div className="regist-content-container">
            <label htmlFor="regist-content">CONTENT</label>
            <textarea
              id="regist-content"
              className="regist-content"
              placeholder="내용을 작성해주세요."
              value={contentInput}
              onChange={handleContentChange}
            />
          </div>

          <button className="create-btn">ADD</button>
        </form>
      </PageStyle>
    </>
  );
}

const PageStyle = styled.div`
  .regist-form {
    background-color: #fff;
    width: 500px;
    max-width: calc(100% - 110px);
    height: 740px;
    border-radius: 20px;
    padding: 30px;
    margin: 0 auto;
    text-align: center;
    box-sizing: border-box;
  }

  label {
    display: block;
    margin-bottom: 8px;
  }

  .regist-title-container {
    margin-bottom: 10px;
  }

  .regist-title-container input {
    font-size: 20px;
    padding: 10px 0;
    text-align: center;
    width: 100%;
    border: solid 0.5px;
    border-radius: 10px;
  }

  .regist-content-container {
    margin-bottom: 10px;
  }
  .regist-content-container textarea {
    padding: 20px 30px;
    font-family: inherit;
    font-size: 18px;
    line-height: 1.6;
    resize: none;
    width: 100%;
    min-height: 40vh;
    border: solid 0.5px;
    border-radius: 10px;
  }

  .create-btn {
    width: 50%;
    margin-top: 30px;
    padding: 20px 0;
    text-align: center;
    font-size: 20px;
    box-sizing: border-box;
  }
  .create-btn:hover {
    border: 1px solid #2d77af;
    background-color: white;
    color: #2d77af;
  }
`;
