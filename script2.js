let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;

let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  //funkcja pobiera elemnty html/css i przypisuje je do zmiennych
  todoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todolist ul");

  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
  //funkcja dodaje nasłuchiwanie (addEventListener) na dany event np. onClick (click) i wywołuje tym eventem funckje np. addNewTodo
  addBtn.addEventListener("click", addNewTodo);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", changeTodoText);
  todoInput.addEventListener("keyup", enterKeyCheck);
};

const addNewTodo = () => {
  //Funkcja dodaje nowego 'todosa' do naszej ulList
  if (todoInput.value !== "") {
    //jeżeli wpisana wartość todoInput jest różna (!==) niż pusty string ""
    newTodo = document.createElement("li"); //stwórz element li do zmiennej newTodo
    newTodo.textContent = todoInput.value; //niech content inputu będzie równy wpisanej/zadeklarowanej wartośći z inputu
    createTools(); //tworzymy panel z narzędziami
    ulList.append(newTodo); //dodaj newTodo, nowo stworzonego 'todosa' do naszej listy zadań (ulList)

    todoInput.value = ""; //zresetuj wartość inputu
    errorInfo.textContent = ""; //zresetuj wartość errorInfo
  } else {
    errorInfo.textContent = "Wpisz treść zadania!";
  }
};

const createTools = () => {
  //funkcja tworzy narzędzia odznacz edit oraz delete do naszego nowego 'todosa' (newTodo) i jest zaimplementowana w funkcji addNewTodo
  const toolsPanel = document.createElement("div"); //stwórz element 'div' do zmiennej toolsPanel

  toolsPanel.classList.add("tools"); //dodajemy klase do stworzonego elementu div pod zmienna toolsPanel
  newTodo.append(toolsPanel); //dodajemy  toolsPanel do nowego todosa (newTodo)

  const completeBtn = document.createElement("button"); //tworzymy element button
  completeBtn.classList.add("complete"); // dodajemy do niego klase
  completeBtn.innerHTML = '<i class="fas fa-check"></i>'; //dodajeme element/span <i> z klasą
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "EDIT";
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  toolsPanel.append(completeBtn, editBtn, deleteBtn); //dodajemy elementy do naszego toolsPanel/ diva z klasą tools
};

const checkClick = (e) => {
  //funkcja sprawdza co zostało kliknięte
  if (e.target.matches(".complete")) {
    //jezeli klikniety został element z clasą .complete
    e.target.closest("li").classList.toggle("completed"); // targetujemy najblizsze li oraz zmieniamy jego klase na completed
  } else if (e.target.matches(".edit")) {
    editTodo(e);
  } else if (e.target.matches(".delete")) {
    deleteTodo(e);
  }
};

const editTodo = (e) => {
  //funkcja wyświetla popup edit
  todoToEdit = e.target.closest("li"); //targetujemy najbliższe li
  //ustawiamy wartośc inputu w popupie na aktualną wartość todosa czyli firstChild naszego li

  popup.style.display = "flex"; //ustawiamy styl display na flex dla naszego popupa
};

const changeTodoText = () => {
  // funkcja zmienia tekst w naszym todosie
  if (popupInput.value !== "") {
    //jezeli wartość popupInput rózni sięod zera
    todoToEdit.firstChild.textContent = popupInput.value; // zawartość tekstowa firstChild todoToEdit'a = wartość popupInput

    popupInfo.textContent = "";
    closePopup();
  } else {
    popupInfo.textContent = "Wpisz treść zadania!";
  }
};

const closePopup = () => {
  //funkcja zamyka popup edit
  popup.style.display = "none";

  popupInfo.textContent = "";
};

const deleteTodo = (e) => {
  //funkcja usuwa todosa
  e.target.closest("li").remove(); // targetuj najblizsze li następnie usuń

  const allTodos = ulList.querySelectorAll("li"); // wybieramy wszystkie todosy i przypisujemy je do zmiennej allTodos

  if (allTodos.length === 0) {
    // jezeli wartość allTodos będzie równa zeru (querySelectorAll tworzy obiekty tablico podobne dlatego metoda .length)
    errorInfo.textContent = "Brak zadań na liście!!!";
  } else {
    errorInfo.textContent = "";
  }
};

const enterKeyCheck = (e) => {
  //funkcja dodaje todosa po kliknieciu klawisza enter
  if (e.key === "Enter") {
    //jezeli event key równa się warości Enter
    addNewTodo();
  }
};

document.addEventListener("DOMContentLoaded", main);
