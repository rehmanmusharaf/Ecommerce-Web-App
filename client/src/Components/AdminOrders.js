import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Adminmenu from "./Adminmenu";
import axios from "axios";
import { useAuth } from "./Context/Auth";
const AdminOrders = () => {
  let [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  async function getOrdersdetail() {
    // console.log("get Orders Detail Funtion Run");
    const id = auth?.user?.id;
    // console.log(id);
    axios
      .post(process.env.REACT_APP_url + `/api/getallorders/${id}`, {
        email: auth?.user?.email,
        token: auth?.token,
      })
      .then((resp) => {
        // console.log(resp);
        if (resp?.data?.success) {
          // console.log("response set Successfully!");
          // console.log(resp);
          setOrders([...resp?.data?.result]);
          return;
        }
        // console.log("Something went Wrong with response");
        return;
      })
      .catch((error) => {
        // console.log("Something Went Wrong Client side : ", error);
      });
  }
  useEffect(() => {
    getOrdersdetail();
  }, []);

  return (
    <Layout>
      <div style={{ marginTop: "10px" }}>
        <div className="d-flex justify-content-evenly  ">
          <div style={{ width: "25%" }}>
            <Adminmenu />
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
                      <React.Fragment>
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{value.status}</td>
                          <td>{value.buyer.name}</td>
                          <td>{new Date(value.createdAt).toDateString()}</td>
                          <td>{value.payment.success ? "Success" : "False"}</td>
                          <td>{value?.products.length}</td>
                        </tr>
                        <tr>
                          {value.products.map((value2, index) => {
                            return (
                              <td colSpan="6">
                                <div className="d-flex ">
                                  <div className="w-25">
                                    <img
                                      src={`${process.env.REACT_APP_url}/api/product-photo/${value2?._id}`}
                                      alt="product img here"
                                      height="100px"
                                      width="auto"
                                    />
                                  </div>
                                  <div className=" w-75">
                                    <h4>{value2.name}</h4>
                                    <p>{value2.description}</p>
                                    <p className=" fs-4 text-success ">
                                      ${value2.price}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      </React.Fragment>
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

export default AdminOrders;
