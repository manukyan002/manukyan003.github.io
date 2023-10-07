const root = document.getElementById("root");

function TodoForm (add){
    const container = document.createElement("form");
    container.innerHTML = `
    <input type = "text" >
    <button>Add</button>
    `;

    container.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = container.querySelector("input").value;
        add(value);  
    });
    
    return container;
}

function ListItem (todo, onChange){
    const container = document.createElement("div");
    todo.completed;
    container.innerHTML=`
    <label>
        <input type = "checkbox" ${todo.completed ? "checked" : ""} />
        ${todo.label}
    <label>
    
    `;  
    const input = container.querySelector("input");
    input.addEventListener("change", (e) => {
        onChange(e.target.checked);
    })
    return container;
}

function TodoFooter(todoes ,onChange ) {

    const container = document.createElement("div"); 
    const completed = todoes.filter(todo => todo.completed === true).length;
    container.innerHTML= `
        <span>${completed }/${todoes.length} Completed</span>
        <button>Clear</button>
    `;

    const btn = container.querySelector("button");
    btn.addEventListener("click", () => {
        onChange(todoes.filter((todo) => todo.completed === false));
    });
    return container;
    
}

function List (todoes, onChange){
    const container = document.createElement("div");

    todoes.map( todo => {
        return ListItem(todo, (change) => {
            todo.completed = change;
            onChange();
        });
    }).forEach(el => {
       container.appendChild(el); 
    });

    return container;
}

function App (){

  

   let todoes = [
    {label : "learn css" , completed : false },
    {label : "learn node" , completed : false },
    {label : "learn js" , completed : false },
   ];

    const container = document.createElement("div");

    function render() {
        container.innerHTML= "";
    container.appendChild(TodoForm(function (newText){
        todoes.push({
            completed:false,
            label:newText
        });
        render();
    }));
    container.appendChild(List(todoes, ()=>{
        render();
    }));
    container.appendChild(TodoFooter(todoes, (newTodoes) => {
       todoes = newTodoes ;
       render();
    }));
    
    }
    render();

    return container;
    
}
root.appendChild(App());