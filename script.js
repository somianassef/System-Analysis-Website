function getCart(){
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart){
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount(){
  const total = getCart().reduce((s,i)=>s+i.qty,0);
  document.getElementById('cart-count').innerText = total;
}

function changeImg(src){
  document.getElementById('main-img').src = src;
}

document.addEventListener('DOMContentLoaded',()=>{
  updateCartCount();

  document.getElementById('add-to-cart').onclick = ()=>{
    const cart = getCart();
    cart.push({
      title:'Golden Glow',
      price:85,
      qty:+document.getElementById('qty-input').value,
      img:document.getElementById('main-img').src
    });
    saveCart(cart);
    alert('Added to cart ✅');
  };

  document.getElementById('cart-button').onclick = ()=>{
    location.href='cart.html';
  };
});
