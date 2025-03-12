
// ./ -> 현재 위치
// ../ -> 상위 폴더에서

import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import styles from './CateManage.module.css'
import * as bookApi from '../apis/bookApi'

const CateManage = () => {
  //카테고리 목록 데이터를 저장할 변수]
  const [cateList, setCateList] = useState([]);

  //입력한 카테고리명을 저장할 변수
  const [newCateName, setNewCateName] = useState('');

  //카테고리 목록 재조회 실행을 위한 변수
  const [categoryTrigger, setCategoryTrigger] = useState({});

  //오류 메세지를 저장할 변수
  const [errorMsg, setErrorMsg] = useState('')

  //카테고리 목록 조회
  useEffect(() => {
    bookApi.getCategoryList()
    .then(res => setCateList(res.data))
    .catch(error => console.log(error));
  }, [categoryTrigger]);

  //카테고리 등록 버튼 클릭 시 실행하는 함수
  const insertCategory = () => {
    //카테고리명 입력안했으면 중지
    if(newCateName === ''){
      setErrorMsg('카테고리명은 최소 한 글자 이상입니다.');
      return;
    }

    bookApi.insertCategory(newCateName)
    .then(res => {
      //등록 여부에 따라 다른 코드 진행
      if(res.data === 1){
        alert('등록 성공');
        //카테고리 목록을 다시 조회
        setCategoryTrigger({});
        //input 태그의 값을 초기화
        setNewCateName('')
        setErrorMsg('')
      }
      else{
        setErrorMsg('이미 등록된 카테고리명입니다');
      }
    })
    .catch();
  }

  return (
    <div className='cate-manage-container'>
      <h3>카테고리 관리</h3>
      <div>
        <h4>카테고리 등록</h4>
        <div>
          <input type="text" 
            value={newCateName}
            onChange={(e) => {
              setNewCateName(e.target.value);
            }}
            onKeyDown={(e) => {
              //키보드 엔터를 누르면...
              if(e.key === 'Enter'){
                insertCategory()
              }
            }}
          />
          <button type='button' onClick={e => insertCategory()}>카테고리 등록</button>
          {
            errorMsg && 
            <p className={styles.error_p}>
              {errorMsg}
            </p>
          }
        </div>
      </div>
      <div>
        <h4>카테고리 목록</h4>
        <table border={1}>
          <thead>
            <tr>
              <td>No</td>
              <td>카테고리 코드</td>
              <td>카테고리명</td>
              
            </tr>
          </thead>
          <tbody>
            {
              cateList.map((cate, i) => {
                return (
                  <tr key={i}>
                    <td>{cateList.length - i}</td>
                    <td>{cate.cateCode}</td>
                    <td>
                      <input type='text' value={cate.cateName}/>
                    </td>
                    <td>
                      <button type='button'>수정</button>
                    </td>
                    <td>
                      <button type='button'>삭제</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CateManage