import React, { useEffect, useState } from "react";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost/api/myOrderdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
        }),
      });

      const data = await response.json();
      setOrderData(data.mydata);
    } catch (error) {
      console.error("Error fetching my order:", error.message);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {orderData && orderData.order_data
            ? orderData.order_data.map((orderGroup) => {
                return orderGroup.map((orderItem) => {
                  return orderItem.order_date ? (
                    <div className="m-auto mt-5" key={orderItem.order_date}>
                      {orderItem.order_date}
                      <hr />
                    </div>
                  ) : (
                    <div className="col-12 col-md-6 col-lg-3" key={orderItem.id}>
                      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                        <img
                          src={orderItem.img}
                          className="card-img-top"
                          alt="..."
                          style={{ height: "120px", objectFit: "fill" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{orderItem.name}</h5>
                          <div className="container w-100 p-0" style={{ height: "38px" }}>
                            <span className="m-1">{orderItem.qnty}</span>
                            <span className="m-1">{orderItem.size}</span>
                            <span className="m-1">{orderItem.order_date}</span>
                            <div className="d-inline ms-2 h-100 w-20 fs-5">
                              ₹{orderItem.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })
            : ""}
        </div>
      </div>

      <Footer />
    </div>
  );
}
