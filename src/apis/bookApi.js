
//외부파일에서 선언한 변수 및 함수를 사용하기 위해서는
//export(내보내기)와 import(가져오기)를 적절히 사용해야 함.

import axios from "axios"

//첫번째 방식(export default)
//export default는 파일당 하나만 사용 가능
//edxport default로 내보낸 데이터는 사용 할때 이름을 변경해서 받을 수 있음

//두번째 방식
//변수나 함수 앞에 export키워드만 붙여서 내보내기 가능
//export default와 달리 필요하면 여러번 사용 가능
//export로 내보내진 데이터는 사용 시 반드시 이름 동일하게만 사용 가능
//export로 내보내진 데이터는 import 시 중괄호에 데이터 이름을 가져간다.

//----------------------------------------------------------------

//해당 파일에 도서 카테고리와 도서 관련 axios 기능을 모아놓음

/**
 * 카테고리 목록 조회
 */
export const getCategoryList = () => {
  const response = axios.get('/api/categories'); 

  return response;
}

/**
 * 카테고리 등록
 * param : 신규 등록되는 카테고리명(문자열)
 */
export const insertCategory = (newCateName) => {
  const response = axios.post('/api/categories', 
                              {cateName : newCateName});

  return response;
}

/**
 * 도서 등록
 * param : 등록할 도서 데이터(객체)
 * {
    cateCode : 1,
    bookName : '',
    bookPrice : 0,
    publisher : '',
    bookInfo : ''
  }
 */
export const insertBook = (bookData) => {
  const response = axios.post('/api/books', bookData);
  return response;
}