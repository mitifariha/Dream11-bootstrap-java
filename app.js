fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=a`)
    .then(res => res.json())
    .then(data => loadPlayer(data.player))


const loadPlayer = (player) => {
    const container = document.getElementById("card-container")
    player.forEach(p => {
        const div = document.createElement("div")
        div.innerHTML =

            `<div id="card-container-cart " class="card " style="width: 18rem;">
     <img src="${p?.strThumb ? p.strThumb : 'https://e7.pngegg.com/pngimages/196/305/png-clipart-man-playing-soccer-professional-sports-athlete-injury-football-player-footballer-miscellaneous-sport.png'}" class="card-img-top" alt="no image">
     <div class="card-body">
       <h5 class="card-title p-1">${p.strPlayer} <small> <a href="${p?.strFacebook}"><i class="fa-brands fa-facebook p-1"></i></a>
       <a href="${p?.strTwitter}"><i class="fa-brands fa-twitter p-1"></i></a> <a href="${p?.strInstagram}"><i class="fa-brands fa-instagram p-1"></i></a></small></h5>
       
     </div>
     <ul class="list-group list-group-flush">
       <li class="list-group-item"><strong>Name:</strong> ${p?.strPlayer}</li>
       <li class="list-group-item"><strong>Nationality:</strong> ${p?.strNationality}</li>
       <li class="list-group-item"><strong>Date of birth:</strong> ${p?.dateBorn}</li>
       <li class="list-group-item"><strong>Description:</strong> ${p?.strDescriptionEN.slice(0,60)}</li>
     </ul>
     <div class="card-body">
     <button type="button" class="btn btn-primary" onclick="showPlayerDetails('${p.idPlayer}')">Details</button>
     <button type="button" class="btn btn-info" onclick="handleAddcart('${p.strPlayer}')">Add to team</button>
     </div>
    </div>`;
        container.appendChild(div);

    });

}

const show = () => {

    const inputvalue = document.getElementById("search-place").value;
    console.log(inputvalue);

    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputvalue}`)
        .then(res => res.json())
        .then(data => displayPlayer(data.player))


    const container = document.getElementById("card-container")
    container.innerHTML = "";
    const displayPlayer = (player) => {



        player.forEach(p => {
            const div = document.createElement("div")
            div.innerHTML =
                `<div id="card-container-cart " class="card " style="width: 18rem;">
             <img src="${p?.strThumb ? p.strThumb : 'https://e7.pngegg.com/pngimages/196/305/png-clipart-man-playing-soccer-professional-sports-athlete-injury-football-player-footballer-miscellaneous-sport.png'}" class="card-img-top" alt="no image">
             <div class="card-body">
             <h5 class="card-title p-1">${p.strPlayer} <small> <a href="${p?.strFacebook}"><i class="fa-brands fa-facebook p-1"></i></a>
             <a href="${p?.strTwitter}"><i class="fa-brands fa-twitter p-1"></i></a> <a href="${p?.strInstagram}"><i class="fa-brands fa-instagram p-1"></i></a></small></h5>
            
             </div>
             <ul class="list-group list-group-flush">
             <li class="list-group-item"><strong>Name:</strong> ${p?.strPlayer}</li>
             <li class="list-group-item"><strong>Nationality:</strong> ${p?.strNationality}</li>
             <li class="list-group-item"><strong>Date of birth:</strong> ${p?.dateBorn}</li>
             <li class="list-group-item"><strong>Description:</strong> ${p?.strDescriptionEN ? p.strDescriptionEN.slice(0,60) : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, provident?"}</li>
             </ul>
             <div class="card-body">
             <button type="button" class="btn btn-primary" onclick="showPlayerDetails('${p.idPlayer}')">Details</button>
             <button type="button" class="btn btn-info" onclick="handleAddcart('${p.strPlayer}')">Add to team</button>
             </div>
            </div>`;
            container.appendChild(div);


        });

    }


}

const handleAddcart = (name) => {
    const cartcount = document.getElementById("count").innerText;
    let convertcount = parseInt(cartcount);
    if (convertcount < 11) {
        convertcount += 1;
        document.getElementById("count").innerText = convertcount;
        const cardcontainer = document.getElementById("cart-container")
        const li = document.createElement("li")
        li.innerHTML = `
        ${name}
        `
        cardcontainer.appendChild(li);

    } else {
        alert("You can not add more than 11 players.")
    }


}

const showPlayerDetails = (playerId) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`)
        .then(res => res.json())
        .then(data => {
            const player = data.players[0];
            const playerDetails = `
                <h5>${player.strPlayer}</h5>
                <img src="${player.strThumb }" class="img-fluid" alt="Player image">
                <p><strong>Nationality:</strong> ${player.strNationality}</p>
                <p><strong>Team:</strong> ${player.strTeam}</p>
                <p><strong>Date of Birth:</strong> ${player.dateBorn}</p>
                <p><strong>Description:</strong> ${player?.strDescriptionEN ? player.strDescriptionEN : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, provident?"}</p>
            `;
            document.getElementById("player-details").innerHTML = playerDetails;
            new bootstrap.Modal(document.getElementById('playerModal')).show();
        });
}