
// $(document).ready(()=> {
   
   $("#left-arrow").click(function(){
       console.log('ccc');
        $.ajax({
            url: '/get-data',
            type: 'GET',
            dataType: 'json',
            succes: (data) => {
                console.log('ajax succes', data);
            }
        });
   });

   const display = ('#display');

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
           github: Project.githubLink
       }
   }

   const buildTemplate = (Project, ids)=>{
       return '<div class="item fade"><img src="assets/img/monitoreweb.jpg"></div><div class="item-text fade" ><h1>' + Project.projectName + 
       '</h1><p>'+ Project.description +'</p><a target="blank" href="'+ Project.githubLink +'">zie de github -></a></div>';
   }

   const displayProjects = (data)=>{
       data.forEach((Project)=> {
           let ids = buildIDS(Project);
           $('#display').append(buildTemplate(Project, ids));
           // to set the first so it doesn't get stacked on eachother
           plusSlides(0);
       })
   }
  
// })
