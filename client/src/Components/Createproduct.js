import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Adminmenu from "./Adminmenu";
import axios from "axios";
import "./CSS/createproduct.css";
import Appproduct from "./Product/Addproduct";
import { Link } from "react-router-dom";
import { useAuth } from "./Context/Auth";
// import { Buffer } from "buffer";

const Createproduct = () => {
  let [auth] = useAuth();
  let [addproduct, setAddproduct] = useState(false);
  let [product, setProduct] = useState([]);
  let [img, setImg] = useState("");
  let [edit, setEdit] = useState(false);
  let [editable_id, setEditable_id] = useState(null);

  const [imageData, setImageData] = useState(null); //test
  function deleteproduct(id) {
    let check = window.confirm("Do you Want To delete That Product");
    if (check) {
      axios
        .delete(
          process.env.REACT_APP_url + `/api/product/${id}/${auth?.user?.email}`,
          { email: auth?.user?.email },
          { headers: { Authorization: auth?.token } }
        )
        .then((resp) => {
          if (!resp) {
            // console.log("somethin went wrong" + resp);
            return;
          }
          // console.log(resp);
          getdata();
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }
  function editproduct(id) {
    // setAddproduct((prev) => (prev ? false : true));
    setEditable_id(id);
    setEdit((prev) => (prev ? false : true));
  }
  function getdata() {
    axios
      .get(process.env.REACT_APP_url + "/api/getproduct")
      .then((resp) => {
        let data = resp.data.resp;
        // console.log(data);
        setProduct([...data]);
      })
      .catch((err) => {
        // console.log("Catch Case Run!");
        // console.log(err);
      });
  }
  async function getphoto(id) {}
  useEffect(() => {
    getdata();
  }, []);
  return (
    <Layout>
      <div style={{ marginTop: "10px" }}>
        <div className="d-flex justify-content-evenly  ">
          <div style={{ width: "25%" }}>
            <Adminmenu />
          </div>
          <div style={{ width: "70%" }}>
            <div className="d-flex flex-wrap ">
              {/* card Start  */}
              {product.map((value, index) => {
                return (
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={index}
                  >
                    <img
                      src={`${process.env.REACT_APP_url}/api/product-photo/${value._id}`}
                      alt="img here"
                      style={{
                        height: " 134px",
                        width: "auto",
                        display: "block",
                        margin: "auto",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{value.name}</h5>
                      <p className="card-text">{value.description}</p>
                      <p className="text-success fs-5 ">
                        Price : {value.price}
                      </p>
                      <button
                        className="btn btn-primary px-4"
                        onClick={() => editproduct(value._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger px-4 mx-2"
                        onClick={() => deleteproduct(value._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* card end  */}
            </div>
            {addproduct ? (
              <Appproduct hideaddproduct={setAddproduct} editable={edit} />
            ) : (
              ""
            )}
            {edit && editable_id ? (
              <Appproduct
                hideaddproduct={setAddproduct}
                editable={edit}
                editable_id={editable_id}
                setEditable_id={setEditable_id}
                setEdit={setEdit}
              />
            ) : (
              ""
            )}
            <button
              className="btn btn-success mx-2"
              onClick={() =>
                setAddproduct((prev) => {
                  return prev ? false : true;
                })
              }
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Createproduct;
