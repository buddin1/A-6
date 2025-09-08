
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(result => {
      const categories = result.categories;
      const list = document.getElementById("categories");
      list.innerHTML = "";
      categories.forEach((category) => {
        const li = document.createElement("li");
        li.textContent = category.category_name;
        li.className = "hover:text-white hover:bg-green-600 p-7";
        list.appendChild(li);
      });
    });
};
loadCategories();


const allPlantsCard = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
      const cards = data.plants;
      const div = document.getElementById("all-cards");
      div.innerHTML = "";
      cards.forEach((card) => {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `   
          <div class="card bg-base-200 w-71 h-100 shadow-sm rounded-lg">
            <figure class="h-28 ">
              <img class="object-contain"
                src="${card.image}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
            <h2 onclick="openModal('${card.id}')" class="card-title font-bold ">
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

const openModal = (id)=>{
  
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)

    .then(res => res.json())
    .then(data => {
      const details = data.plants;
      console.log(details.name);
      const detailsBox = document.getElementById("details-container")
      // detailsBox.innerHTML=`hi you are ok right`
      detailsBox.innerHTML=` <div class="w-full bg-base-200  shadow-sm rounded-lg">
            <h2 class=" font-bold pl-5 pb-5 ">
              ${details.name}
            </h2>
            
              <div class="flex items-center justify-center bg-gray-50"><img class="w-50 object-contain" src="${details.image}" alt="Shoes" /></div>
            
            <div class="card-body space-y-5">
             <p class="font-semibold">Category: ${details.category}</p>
             <p class="font-semibold">Price: ৳${details.price}</p>
             <p class="font-semibold">Description: ${details.description}</p>
            </div>
        </div>`
      document.getElementById("my_modal_5").showModal()
    });
};