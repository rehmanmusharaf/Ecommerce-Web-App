import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import Usermenu from "../../Components/Usermenu";
import axios from "axios";
import { useAuth } from "../../Components/Context/Auth";
// import moment from "moment";
const Orders = () => {
  let [auth] = useAuth();
  let [orders, setOrders] = useState([]);
  async function getorderdata() {
    try {
      const id = auth?.user?.id;
      axios
        .get(process.env.REACT_APP_url + `/api/getorders/${id}`)
        .then((resp) => {
          // console.log(resp);
          if (!resp.data.success) {
            console.log("Something Went Wrong With Response!");
            return;
          }
          const result = resp.data.result;
          console.log(result);
          setOrders([...result]);
          return;
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    } catch (error) {
      console.log("something Went Wrong!", error);
      return;
    }
  }
  useEffect(() => {
    getorderdata();
  }, []);
  return (
    <Layout
      title="Orders- Ecommerce-app"
      description="Ecommerce site to buy Home Essentials"
      author="Muhammad Rehman"
      keywords="html, css, js, reactjs, nodejs, express"
    >
      <div style={{ marginTop: "10px" }}>
        <div className="d-flex justify-content-evenly  ">
          <div style={{ width: "25%" }}>
            <Usermenu />
          </div>
          <div style={{ width: "70%" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Date</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((value, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{value.status}</td>
                        <td>{value.buyer.name}</td>
                        <td>{new Date(value.createdAt).toDateString()}</td>
                        <td>{value.payment.success ? "Success" : "False"}</td>
                        <td>{value?.products.length}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    {" "}
                    <th colSpan={6}> No Order Exist</th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
