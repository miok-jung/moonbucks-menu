// TODO 카테고리별 메뉴판 관리
// [] 에스프레소 메뉴판을 관리
// [] 프라푸치노 메뉴판을 관리
// [] 블렌디드 메뉴판을 관리
// [] 티바나 메뉴판을 관리
// [] 디저트 메뉴판을 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// [] 페이지에 최초로 접근할 때는 localStorage에서 에스프레소 메뉴를 불러온다.
// [] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// [] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// [] 품절 상태 메뉴를 추가한다.
// [] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// [] 클릭이벤트에서 가장 가까운 li 태그의 class 속성 값에 sold-out을 추가한다.

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    return localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};
function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 갯수, 메뉴명
  this.menu = [];
  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
    }
    render();
  };
  const render = () => {
    const template = this.menu
      .map((menuItem, index) => {
        return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
        </li>`;
      })
      .join("");
    $("#espresso-menu-list").innerHTML = template;
    updateMenuCount();
  };

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
    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    render();
    $("#espresso-menu-name").value = "";
  };
  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    //closest : 상위 부모 해당하는 태그값을 가져온다?
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    this.menu[menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };
  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu.splice(menuId, 1);
      store.setLocalStorage(this.menu);
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });
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
const app = new App();
// 구현으로 완료를 하게 되면 재사용함수와 따로 나누어 정리할 것
app.init();
