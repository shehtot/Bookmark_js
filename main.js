

var nameinput=document.getElementById('siteName');
var urlinput=document.getElementById('siteUrl');
var input=document.querySelectorAll('.selectedInput');
var fixedBox = document.querySelector('#fixedBox')
var closeBtn = document.querySelector('.close-icon')


database=[];
if(localStorage.getItem('all')!=null){
    database=JSON.parse(localStorage.getItem('all'));
    display()
};
function getvalue(){
    contain={
        name:nameinput.value,
        url:urlinput.value,
    };
  if(validation(nameinput.id,nameinput.value)==true&&validation(urlinput.id,urlinput.value)==true&&prevent(database,contain)==true){

database.unshift(contain);
localStorage.setItem('all',JSON.stringify(database));
clearall()
display();
}
else{
    fixedBox.classList.replace('d-none','d-flex')
  
  }
  
}

closeBtn.addEventListener('click',function(){
    fixedBox.classList.replace('d-flex','d-none')
  })
function display(){
   var cartona=""
    for(let i=0;i<database.length;i++){
        cartona+=`
        <tr>
        <td>${i+1}</td>
            <td class="text-capitalize">${database[i].name}</td>
            <td><button class="btn btn-primary " onclick="setvalue(${i})"><i class="fa fa-edit pe-2"></i>updata</button></td>
            <td><button class="btn btn-success "   ><a href="${database[i].url}" class="text-light"><i class="fa fa-edit pe-2"></i>visit</a></button></td>
            <td><button class="btn btn-danger "  onclick="deleteinput(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
         </tr>
        `
    }
    document.getElementById('demo').innerHTML=cartona;

}


function deleteinput(index){
   
        database.splice(index,1)
        localStorage.setItem('all',JSON.stringify(database))
        display()
        
       


}
let superindex;

function setvalue(index){
    superindex=index;
    document.getElementById('updata').style.display='block';
    document.getElementById('submit').style.display='none';
    nameinput.value=database[index].name;
    urlinput.value=database[index].url;
    
}

function updatavalue(){

    document.getElementById('updata').style.display='none';
    document.getElementById('submit').style.display='block';
   database[superindex].name=nameinput.value;
    database[superindex].url=urlinput.value;
    localStorage.setItem('all',JSON.stringify(database))
    display();
    clearall();
}

function clearall(){
    nameinput.value="";
    urlinput.value="";
    nameinput.classList.remove('is-valid');
    urlinput.classList.remove('is-valid');
}
function search(input){
    var  cartona="";
    for(let i=0; i<database.length ; i++){
if(database[i].name.toLowerCase().includes(input.value.toLowerCase())){
        cartona+=`
       
        <tr>
        <td>${i+1}</td>
            <td class="text-capitalize">${database[i].name}</td>
            <td><button class="btn btn-primary " onclick="setvalue(${i})"><i class="fa fa-edit pe-2"></i>updata</button></td>
            <td><button class="btn btn-success "   ><a href="${database[i].url}"  target =_blank class="text-light"><i class="fa fa-edit pe-2"></i>visit</a></button></td>
            <td><button class="btn btn-danger "  onclick="deleteinput(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
         </tr>
        `
    }}
    document.getElementById('demo').innerHTML=cartona;
    console.log()


}


/*validation*/
let main=document.getElementById('main');
main.addEventListener('input',function(e){
   

    if(e.target.tagName=='INPUT'){
        let inputid=e.target.id
        let inputvalue=e.target.value
        validation(inputid,inputvalue)
    }
    
})

function validation(id,value){
    let regex={
        siteName:/^[a-z]{3,20}/i,
        siteUrl:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }
    let ele=document.getElementById(id);
    let error=document.getElementById(id+'Error');
    console.log(regex[id].test(value))
    if(regex[id].test(value)==true){
        ele.classList.add('is-valid')
        ele.classList.remove('is-invalid')
        error.innerHTML='';
        return true;
    }
    else{
        ele.classList.add('is-invalid');
        ele.classList.remove('is-valid');
  error.innerHTML=(id=='siteName'?'Site name must contain at least 3 characters':'Site URL must be a valid one')
        return false;
    }


}


function prevent(arr,newObj){
    for(var i=0;i<arr.length;i++){
      if(arr[i].siteName==newObj.siteName||arr[i].siteUrl==newObj.siteUrl){  
    
        return false;
      }
      
    }
    return true;}