
$(document).ready(()=> {

   const getData = ()=>{
       fetch('/get-data', {method: "get"}).then((response) => {
           return response.json();
       }).then((data)=>{
           console.log(data);
           displayProjects(data);
       });
   }
   
   getData();

   const buildIDS = (Project)=>{
       return {
           projectName: Project.projectName,
           description: Project.description,
           github: Project.githubLink,
           imageLink: Project.imageLink
       }
   }

   const buildTemplate = (Project, ids)=>{
       return '<div class="item fade"><img src="'+ Project.imageLink +'"></div><div class="item-text fade" ><h1>' + Project.projectName + 
       '</h1><p>'+ Project.description +'</p><a target="blank" href="https://www.'+ Project.githubLink +'">zie de github -></a></div>';
   }

   const displayProjects = (data)=>{
       data.forEach((Project)=> {
           let ids = buildIDS(Project);
           $('#display').append(buildTemplate(Project, ids));
           // to set the first so it doesn't get stacked on eachother
           plusSlides(0);
       })
   }
  
})
