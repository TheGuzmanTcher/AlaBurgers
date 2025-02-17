let cart = [];
let total = 0;

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const item = event.target.closest(".item");
        const name = item.querySelector(".item-info span").textContent;
        const price = parseFloat(item.getAttribute("data-price"));

        cart.push({ name, price });
        total += price;

        updateCart();
    });
});

function updateCart() {
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");

    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;

        // Botón de eliminar
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Eliminar";
        removeBtn.style.marginLeft = "10px";
        removeBtn.style.cursor = "pointer";
        removeBtn.addEventListener("click", () => {
            removeFromCart(index);
        });

        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });

    totalPrice.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    total -= cart[index].price; // Restar el precio del total
    cart.splice(index, 1); // Eliminar el elemento del carrito
    updateCart(); // Actualizar la vista
}

document.getElementById("send-order").addEventListener("click", () => {
    const phoneNumber = "9342622029"

    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let message = "Hola, quiero hacer un pedido:\n\n";
    cart.forEach(item => {
        message += `- ${item.name} - $${item.price}\n`;
    });

    message += `\nTotal: $${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
});

const menuToggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".links");

menuToggle.addEventListener("click", () => {
    links.classList.toggle("active");
    
    // Cambia el color del ícono cuando el menú esté activo
    if (links.classList.contains("active")) {
        menuToggle.style.color = "white";
    } else {
        menuToggle.style.color = "black";
    }
});