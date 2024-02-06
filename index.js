let Tasks=JSON.parse(localStorage.getItem("Tasks"));
let Users=JSON.parse(localStorage.getItem("Users"));
let Sort=document.getElementById("Sort");
(()=>{
    let Sign_in=sessionStorage.getItem("Signed_in");
    if(!Sign_in){
        window.location.replace("./Sign_in.html")
    }else{
        let Users=JSON.parse(localStorage.getItem("Users"));  
        let User_Name="";  
        Users.forEach(element=>{
            if(element.User_Id===Sign_in){
                User_Name=element.Name;
            }
        });
        document.getElementById("User_Name").innerHTML=User_Name;
    }
})();
(()=>{
    Sort_By_Assigned_To();
})();
function Color_Code(){
    let Priority=document.getElementsByClassName("Priority");
    let Status=  document.getElementsByClassName("Status");
    
    for(let element of Priority)
    {
        if(element.innerHTML==="Low")
        {
            element.setAttribute("style","background-color:#2bb400; color:#fff");

        }else if(element.innerHTML==="Medium"){
            element.setAttribute("style","background-color:#f7a200;");

        }else{
            element.setAttribute("style","background-color:#f70000; color:#fff");
        }
    }
    for(let element of Status)
    {
        if(element.innerHTML==="Not Started")
        {
            element.setAttribute("style","background-color:#f70000; color:#fff");
        }else if(element.innerHTML==="Pending"){
            element.setAttribute("style","background-color:#f7a200;");
        }else{
            element.setAttribute("style","background-color:#2bb400; color:#fff");
        }
    }
}
Sort.onchange=()=>{
    if(Sort.value==="Priority"){Sort_By_Priority()}
    if(Sort.value==="Status"){Sort_By_Status()}
    if(Sort.value==="Assigned To Me"){Sort_By_Assigned_To()}
};
function Table_Setter(Task_1,Task_2,Task_3){
    document.getElementById("Table_Body").innerHTML="";
    if(Task_1)
    {
        Task_1.forEach(element => {
            let Table="<tr>";
            Table+=`<td>${element.Task_Title}</td><td>${element.Assigned_To}</td><td>${element.Due_Date}</td><td  class="Priority">${element.Priority}</td><td class="Status">${element.Status}</td><td><a href="./Task_View.html#${element.Task_ID}">Open</a></td></tr>`;
            document.getElementById("Table_Body").innerHTML+=Table;
        });
    }
    if(Task_2)
    {
        Task_2.forEach(element => {
            let Table="<tr>";
            Table+=`<td>${element.Task_Title}</td><td>${element.Assigned_To}</td><td>${element.Due_Date}</td><td  class="Priority">${element.Priority}</td><td class="Status">${element.Status}</td><td><a href="./Task_View.html#${element.Task_ID}">Open</a></td></tr>`;
            document.getElementById("Table_Body").innerHTML+=Table;
        });
    }
    if(Task_3)
    {
        Task_3.forEach(element => {
            let Table="<tr>";
            Table+=`<td>${element.Task_Title}</td><td>${element.Assigned_To}</td><td>${element.Due_Date}</td><td  class="Priority">${element.Priority}</td><td class="Status">${element.Status}</td><td><a href="./Task_View.html#${element.Task_ID}">Open</a></td></tr>`;
            document.getElementById("Table_Body").innerHTML+=Table;
        });
        
    }
    Color_Code();
}
function Sort_By_Priority()
{
    let High_Priority=[];
    let Medium_Priority=[];
    let Low_Priority=[];
    Tasks.filter((value)=>{
        if(value.Priority==="High")
        {
            High_Priority.push(value);
        }else if(value.Priority==="Medium"){
            Medium_Priority.push(value);
        }else{
            Low_Priority.push(value);
        }
    });
    Table_Setter(High_Priority,Medium_Priority,Low_Priority);
}
function Sort_By_Status()
{
    let Not_Started=[];
    let Pending=[];
    let Complete=[];
    Tasks.filter((value)=>{
        if(value.Status==="Not Started")
        {
            Not_Started.push(value);
        }else if(value.Status==="Pending")
        {
            Pending.push(value);
        }else if(value.Status==="Complete")
        {
            Complete.push(value);
        }
    });
    Table_Setter(Not_Started,Pending,Complete);   

}
function Sort_By_Assigned_To()
{
    let Sign_in_User=sessionStorage.getItem("Signed_in");
    Users.forEach((element)=>{
        if(element.User_Id===Sign_in_User){Sign_in_User=element.Name}
    });
    let Assigned_to_Signin=[];
    let Not_Assigned_to_Signin=[];
    Tasks.filter((value)=>{
        if(value.Assigned_To===Sign_in_User)
        {
            Assigned_to_Signin.push(value);
        }else if(value.Assigned_To!==Sign_in_User)
        {
            Not_Assigned_to_Signin.push(value);
        }
    });
    Table_Setter(Assigned_to_Signin,Not_Assigned_to_Signin);
}
function Logout()
{
    sessionStorage.removeItem("Signed_in");
    sessionStorage.removeItem("Manager");
    window.location.reload();
}