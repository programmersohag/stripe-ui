import React, {useState, useEffect} from "react";
import "./App.css";
import axios from "axios";

function callRedirectUrl() {
    axios.post("http://localhost:8080/create-checkout-session", {}).then(res => {
        window.location.href = res.data;
    })
}

function createCustomer() {
    axios.post("http://localhost:8080/customer/create", {}).then(res => {
        console.log(res)
    })
}

const ProductDisplay = () => (
    <section>
        <div className="product">
            <div className="description">
                <h3>Product Price</h3>
                <h5>$100.00</h5>
            </div>
        </div>
        <button type="button" onClick={callRedirectUrl}>
            Checkout
        </button>
        <button type="button" onClick={createCustomer}>
            Add a customer
        </button>
    </section>
);

const Message = ({message}) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return message ? (
        <Message message={message}/>
    ) : (
        <ProductDisplay/>
    );
}
