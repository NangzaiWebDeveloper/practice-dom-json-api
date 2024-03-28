const loadAllProducts =async(query)=>{
    document.getElementById('loading-container').style.display = 'block'
  // console.log(query);
    const response = await fetch(`https://fakestoreapi.com/products${query}`)
    const data = await response.json();

    if(!data.length){
        document.getElementById('not-found').style.display = 'block'
        document.getElementById('loading-container').style.display = 'none'
    }

    if(data.length>0){
      document.getElementById('loading-container').style.display = 'none'
      document.getElementById('not-found').style.display = 'none'
    }

    const productContainer = document.getElementById('cart-container')
    productContainer.innerHTML = ""

    data.forEach(product => {
        // console.log(product);
        const div = document.createElement('div')
        div.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl', 'mb-4')
        div.innerHTML = `
        <figure class="px-10 pt-10">
        <img class="w-32" src="${product.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${product.title}</h2>
        <div class="flex gap-9 font-bold">
          <p>Price: <span>${product.price}</span>$</p>
          <p>${product.category}</p>
        </div>
        <div class="card-actions gap-9">
          <div class="font-semibold text-gray-600 flex justify-center items-center text-lg gap-3">
              <i class="fa-regular fa-eye"></i>
              <p>1,568</p>
          </div>
          <button onclick = "addToCart('${product.title}', ${product.price})" class="btn btn-primary">Buy Now</button>
        </div>
      </div>
        `
        productContainer.appendChild(div)
    });
}


const evenHandler=()=>{
  const getUserText = document.getElementById('userInput').value
  loadAllProducts(`/category/${getUserText}`)
}


const addToCart =(title, price)=>{
  const getAddContainer = document.getElementById('add-cart');
  const div = document.createElement('div');
  div.classList.add('flex', 'text-lg', 'font-bold', 'justify-evenly', 'border-b-2', 'border-gray-600')
  div.innerHTML = `
  <h5>${title}</h5>
  <h5>${price}</h5>
  `
  getAddContainer.appendChild(div)
}




loadAllProducts("")