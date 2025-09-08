
const loadCategories = () => {
fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(result => {
        
        const categories = result.categories;
          const list = document.getElementById("categories");
          list.innerHTML = "";
          
          categories.forEach((category) => {
            const li = document.createElement("li");
            li.innerHTML = `<li class="hover:text-white hover:bg-green-600 p-7">${category.category_name}</li>` ;
            list.appendChild(li);
          });

    })

}
loadCategories()


const allPlantsCard = ()=> {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res=> res.json())
    .then(data => {
        const cards= data.plants
        const div =document.getElementById("all-cards")
        div.innerHTML="";
        cards.forEach((card)=>{
            const newDiv = document.createElement("div");
            
            newDiv.innerHTML=`   
             <div class="card bg-base-200 w-71 h-100 shadow-sm rounded-lg">
            <figure class="h-28 ">
              <img class=" object-contain"
              src="${card.image}"
              alt="Shoes" />
            </figure>
            <div class="card-body">
            <h2 class="card-title font-bold ">
              ${card.name}
            </h2>
            <p>${card.description}</p>
              <div class="card-actions justify-between">
                  <div class="badge bg-[#DCFCE7] rounded-full font-semibold">${card.category}</div>
                  <div class="badge font-semibold">৳${card.price}</div>
              </div>
                  <div><button class="btn btn-success w-full rounded-full text-black">Success</button></div>
             </div>
          </div>`
            div.appendChild(newDiv)
        })


    })
}
allPlantsCard()