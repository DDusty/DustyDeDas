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
        return '<div class="item"><span>'+ Project.projectName +'</span><button id="' + Project.projectName + '" style="background-color: red">Delete</button><button id="' + Project.projectName + '">Edit</button></div>';
    }
 
    const displayProjects = (data)=>{
        data.forEach((Project)=> {
            let ids = buildIDS(Project);
            $('#display').append(buildTemplate(Project, ids));
        })
    }
   

    const deleteProject = (Project, projectName)=>{
        ('#$projectName').click(() => {
            fetch('/${Project.projectName}', {
                method: "delete"
            }).then((response) => {
                return response.json();
            });
        });
    }
 })
 