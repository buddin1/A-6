
// catagory part 

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(result => {
      const categories = result.categories;
       
      const list = document.getElementById("categories");
        
      list.innerHTML = "";
      categories.forEach((category) => {
        
        const li = document.createElement("li");
        
        li.innerHTML = `<p  onclick="clickCategory('${category.id}')" class="hover:text-white hover:bg-green-600 p-7 category-clicked ">${category.category_name}</p>`;
      
       li.querySelector("p").addEventListener("click", function() {
          removeActive();          
          this.classList.add("active"); 
         
          
        });
        list.appendChild(li);
      });
      

      
    });
};

loadCategories();

const removeActive = () => {
  const clickedCategory = document.querySelectorAll(".category-clicked");
  
  clickedCategory.forEach((category) => category.classList.remove("active"));
};

// click category and display plant part 

const clickCategory=(id)=>{
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => { console.log(data)
     
      const cards = data.plants;
      const div = document.getElementById("all-cards")
      
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
                  <div><button onclick="addToCart('${card.id}')"  class="btn btn-success w-full rounded-full text-black">Add to cart</button></div>
             </div>
          </div>`
            div.appendChild(newDiv)
        })


    })
}







// main plant display part

const allPlantsCard = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => allPlantsCardDisplay(data.plants))}
      
      
const allPlantsCardDisplay=(cards)=>{
      
      const div = document.getElementById("all-cards")
      div.innerHTML = "";
      cards.forEach((card) => {
        const newDiv = document.createElement("div")
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
                  <button onclick="addToCart('${card.id}')"   class="btn btn-success w-full rounded-full text-black">
                        Add to cart
                  </button>

             </div>
          </div>`
            div.appendChild(newDiv)
        })


    }

allPlantsCard()

const openModal = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => {
      const details = data.plants;
      console.log(details.name);
      const detailsBox = document.getElementById("details-container");
      detailsBox.innerHTML = ` <div class="w-full bg-base-200  shadow-sm rounded-lg">
            <h2 class=" font-bold pl-5 pb-5 ">
              ${details.name}
            </h2>
              <div class="flex items-center justify-center bg-gray-50"><img class="w-50 object-contain" src="${details.image}" alt="Shoes" /></div>
            <div class="card-body space-y-5">
             <p class="font-semibold">Category: ${details.category}</p>
             <p class="font-semibold">Price: ৳${details.price}</p>
             <p class="font-semibold">Description: ${details.description}</p>
            </div>
        </div>`;
      document.getElementById("my_modal_5").showModal();
    });
};


// add cart part 



const addToCart = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => {
      const plant = data.plants
      

      const cartContainer = document.getElementById("cart-items");
      const div = document.createElement("div");
      div.className = "flex justify-between items-center bg-white p-2 rounded shadow w-full";
      div.innerHTML = `<div>
        <h2 class="font-bold">${plant.name} </h2> 
        <p> ৳${plant.price}</p></div>
        <div onclick="removeFromCart('${plant.price}')" id="cross"  >
        <button  class="text-red-500 pl-10">❌</button>
        </div>
      `;
      cartContainer.appendChild(div);

      totalPrice += parseInt(plant.price) ;
      document.getElementById("cart-total").textContent = totalPrice;
    });
};
let totalPrice = 0; 
function removeFromCart(price) {

  document.getElementById(`cross`).parentElement.remove();

  totalPrice = totalPrice - parseInt(price);
  document.getElementById("cart-total").innerText = totalPrice;
}

