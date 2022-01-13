import { $ } from "./utils/dom.js";
import store from "./store/index.js";

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 갯수, 메뉴명
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [], // 각각의 속성
  };
  this.currentCategory = "espresso";
  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
    initEventListeners();
  };
  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
        return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name ${
            menuItem.soldOut ? "sold-out" : ""
          }">${menuItem.name}</span>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">품절</button>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
        </li>`;
      })
      .join("");
    $("#menu-list").innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;

    $(".menu-count").innerText = `총 ${menuCount}개`;
  };
  const addMenuName = () => {
    if ($("#menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }
    const menuName = $("#menu-name").value;
    this.menu[this.currentCategory].push({ name: menuName });
    store.setLocalStorage(this.menu);
    render();
    $("#menu-name").value = "";
  };
  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    //closest : 상위 부모 해당하는 태그값을 가져온다?
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    render();
  };
  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      render();
    }
  };
  const soldOutMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    // 처음 값을 정해주지 않았기에 undefinde로 나오는데 그 때 반대는 true값으로 반환이 된다.
    //만약 다시 한번 클릭시 true에서 false로 변환이 된다.
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    render();
  };

  const initEventListeners = () => {
    $("#menu-list").addEventListener("click", (e) => {
      // if문이 여러개일 경우 그 뒤의 함수는 굳이 실행을 할 필요가 없는 경우라
      // if문이 끝난 후에 retrun을 넣어주는 것이 좋다.
      // 즉 해다하는 if문만 연산을 진행하고 불필요한 과정을 생략할 수 있다.
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        return;
      }
      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }
      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });
    $("#menu-form").addEventListener("submit", (e) => {
      // 현재 엔터키 입력시 새로고침이 되는 이유 : form형태로 되는 경우 자동으로 전송기능을 하기 때문에 리프레시가 발생한다.
      // 그래서 form태그가 자동으로 전송되는 것을 막아줘야 한다.
      e.preventDefault();
    });

    $("#menu-submit-button").addEventListener("click", addMenuName);
    // 메뉴의 이름을 입력받기
    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        return;
      }
      addMenuName();
    });

    $("nav").addEventListener("click", (e) => {
      const isCategorButton = e.target.classList.contains("cafe-category-name");
      if (isCategorButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
        render();
      }
    });
  };
}
const app = new App();
// 구현으로 완료를 하게 되면 재사용함수와 따로 나누어 정리할 것
app.init();
