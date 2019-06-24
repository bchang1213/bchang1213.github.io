function setProjects(data){
    //set pagelist
    var pageList = $('.pageList');
    pageList.html("Page "+ data.page + " of " + data.last_page);

    //set viewlist
    var viewList = $('.viewList');
    viewList.html("Viewing " + data.per_page + " out of " + data.total);

    //projects is an array containing objects.
    var projects = data.projects;
    var projectsContainer =$('#projectsContainer');

    for(var i=0;i<projects.length;i++){
        //begin for loop
        var project = projects[i];

        //Create the outer Project container
        var projectHTML = `
            <fieldset>
                <legend class="projectTitle">
                    <a href= "/projects/${project.id}"> ${project.name}</a>
                </legend>
                <ul class="projectRow${i}">

                </ul>
            </fieldset>
        `;
        projectsContainer.append(projectHTML);

        //Create each metadata field in each container
        for(var key in project){
            var projectRow = $('.projectRow'+i);
            var metaDataHTML = `
                <li class="metaKey ${key}Info${i}">
                    ${key}: <span class="metaData">${project[key]}</span>
                </li>
            `;
            projectRow.append(metaDataHTML);

            //after appending the li element, add additional li element for owner
            if(key === 'owner_id'){
                var ownerID = project[key];
                setOwnerToolTips(ownerID, i);
            }
        }
    }
}

//set Project Owner Tooltip
function setOwnerToolTips(owner_id, index){
    var url='/getUser?userID=' + owner_id;
    var ownerIDInfoTag = $('.owner_idInfo'+ index);
    $.get( url , function( data ) {
        var metaDataHTML = `
            <li class="metaKey ${data.username}info">
                UserName: <a href="#" class="${data.username}metaData has-tooltip">
                    ${data.username}
                    <span class="${data.username}tooltips tooltip tooltip-with-border" role="tooltip">
                        USER INFO
                        <p>"id": ${data.id}</p>
                        <p>"url": ${data.url}</p>
                        <p>"username": ${data.username}</p>
                        <p>"screen_name": ${data.screen_name}</p>
                        <p>"rank": ${data.rank}</p>
                        <p>"image_url": ${data.image_url}</p>
                        <p>"followers": ${data.followers}</p>
                        <p>"following": ${data.following}</p>
                        <p>"projects": ${data.projects}</p>
                        <p>"skulls": ${data.skulls}</p>
                        <p>"location": ${data.location}</p>
                        <p>"about_me": ${data.about_me.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                        <p>"who_am_i": ${data.who_am_i}</p>
                        <p>"what_i_have_done": ${data.what_i_have_done}</p>
                        <p>"what_i_would_like_to_do": ${data.what_i_would_like_to_do.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                        <p>"created": ${data.created}</p>
                        <p>"tags": ${data.tags}</p>
                    </span>
                </a>
            </li>
        `;
        ownerIDInfoTag.after(metaDataHTML);
    });
};

function nextPage(){
    var projectsContainer =$('#projectsContainer');
    pageCount++;
    var url = '/getProjects' + '?page=' + pageCount;
    $.get( url , function( data ) {
        var stateObj = {};
        history.pushState(stateObj, "", "/projects?page=" + pageCount);
        projectsContainer.empty();
        setProjects(data);
    });
}

function previousPage(){
    var projectsContainer =$('#projectsContainer');
    pageCount--;
    var url = '/getProjects' + '?page=' + pageCount;
    $.get( url , function( data ) {
        var stateObj = {};
        history.pushState(stateObj, "", "/projects?page=" + pageCount);
        projectsContainer.empty();
        setProjects(data);
    });   
}

function getReccs(event, thisElement){
    var projectsContainer =$('#projectsContainer');
    var tag = $(thisElement);
    var tagText = tag[0].innerText;
    var url = '/getRecommendedProjects' + '?tag=' + tagText;
    $.get( url , function( data ) {
        projectsContainer.empty();
        setProjects(data);
    });       
}