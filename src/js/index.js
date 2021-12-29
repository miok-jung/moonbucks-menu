// TODO 2. 메뉴 수정
// [O] 메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.
// [O] 메뉴 수정시 브라우저에서 제공하는 `prompt` 인터페이스를 활용한다.
// [O] 자바스크립트 DOM Element를 가져올 때 달러표시를 관용적으로 많이 사용한다.
const $ = (selector) => document.querySelector(selector);
function App() {
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };
  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (espressoMenuName) => {
      return ` 
          <li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
          </li>`;
    };
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );
    updateMenuCount();
    $("#espresso-menu-name").value = "";
  };
  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    //closest : 상위 부모 해당하는 태그값을 가져온다?
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  };
  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    // TODO 메뉴 삭제
    // 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
    // 확인 버튼을 클릭하면 메뉴가 삭제된다.
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });
  // TODO 1. 메뉴 추가
  // [O] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
  // [O] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가한다.
  // [O] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
  // [O] 총 메뉴 갯수를 count하여 상단에 보여준다.
  // [O] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
  // [O] 사용자 입력값이 빈 값이라면 추가되지 않는다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    // 현재 엔터키 입력시 새로고침이 되는 이유 : form형태로 되는 경우 자동으로 전송기능을 하기 때문에 리프레시가 발생한다.
    // 그래서 form태그가 자동으로 전송되는 것을 막아줘야 한다.
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);
  // 메뉴의 이름을 입력받기
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}
App();
// 구현으로 완료를 하게 되면 재사용함수와 따로 나누어 정리할 것
