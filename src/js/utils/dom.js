// dom과 관련되어 여러곳에 쓰일 수 있기에 utils > dom.js로 파일명을 정리함
// export를 통해서 외부에서도 사용할 수 있게 설정, import를 통해 쓸 수 있다.
export const $ = (selector) => document.querySelector(selector);
