import React, { useEffect, useState } from "react";
import "../CSS/createcategory.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/Auth";
const Addcategory = (props) => {
  let [auth] = useAuth();
  let [category, setCategory] = useState([]);

  let [photo, setPhoto] = useState(null);
  let [name, setName] = useState("");
  let [desc, setDesc] = useState("");
  let [cat, setCat] = useState("");
  let [price, setPrice] = useState(0);
  let [quant, setQuant] = useState(1);
  let [prevpic, setPrevpic] = useState(true);

  function updateproduct(e) {
    e.preventDefault();
    // console.log(props.editable_id);
    const productdata = new FormData();
    productdata.append("name", name);
    // if(photo)
    if (!prevpic) {
      productdata.append("photo", photo);
    }
    productdata.append("description", desc);
    productdata.append("category", cat);
    productdata.append("price", price);
    productdata.append("quantity", quant);
    productdata.append("email", auth?.user?.email);
    axios
      .put(
        process.env.REACT_APP_url + `/api/updateproduct/${props.editable_id}`,
        productdata,
        { headers: { Authorization: auth?.token } }
      )
      .then((resp) => {
        if (!resp.data.success) {
          toast.error("Something Went Wrong!");
          return;
        }
        // console.log(resp);
        toast.success("Product Updated Successully");
        // props.hideaddproduct(false);
        hideform();
        return;
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
      });
  }
  function uploadphoto(e) {
    setPhoto(e.target.files[0]);
    setPrevpic(false);
  }

  function hideform() {
    console.log("Hide Form Run!");
    props.hideaddproduct(false);
    if (props.editable) {
      // console.log("if Condition Run");
      props.setEditable_id(null);
      props.setEdit(false);
    }
  }
  function createproduct(e) {
    try {
      // if (auth) {
      // console.log(process.env.REACT_APP_url + "/api/createproduct");
      // console.log(cat);
      // }
      e.preventDefault();
      const productdata = new FormData();
      productdata.append("name", name);
      productdata.append("photo", photo);
      productdata.append("description", desc);
      productdata.append("category", cat);
      productdata.append("price", price);
      productdata.append("quantity", quant);
      productdata.append("email", auth?.user?.email);
      // console.log(productdata);
      axios
        .post(
          process.env.REACT_APP_url + "/api/createproduct",
          productdata,
          // { name, photo, desc, cat, price, quant, email: auth?.user?.email },
          { headers: { Authorization: auth?.token } }
        )
        .then((resp) => {
          if (!resp) {
            toast.error("Something Went Wrong!");
            // console.log(resp);
            return;
          }
          toast.success("Product Created Successfully!");
          hideform();
          // console.log(resp);
        })
        .catch((error) => {
          toast.error("Something Went Wrong!");
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function getcategory() {
    // console.log(props.editable, props.editable_id);
    if (props.editable && props.editable_id) {
      axios
        .get(process.env.REACT_APP_url + `/api/getproduct/${props.editable_id}`)
        .then((resp) => {
          if (!resp.data.success) {
            // console.log(resp);
            // console.log("Product Doesnt Exist With this ID");
            toast.error("Something Went Wrong!");
          }
          setName(resp.data.resp[0].name);
          setDesc(resp.data.resp[0].description);
          setCat(resp.data.resp[0].category);
          setPrice(resp.data.resp[0].price);
          setQuant(resp.data.resp[0].quantity);
          setPhoto(
            process.env.REACT_APP_url +
              `/api/product-photo/${props.editable_id}`
          );
        })
        .catch((err) => {
          toast.error("Something Wen Wrong");
        });
    }
    axios
      .get(process.env.REACT_APP_url + "/api/getcategory")
      .then((resp) => {
        if (!resp) {
          console.log("Somethin Wen Wrong in resp");
        }
        const data = resp.data.resp;
        setCategory([...data]);
      })
      .catch((error) => {
        toast.error("Something Went Wrong with category");
        console.log(error);
      });
  }

  useEffect(() => {
    getcategory();
    // console.log(category);
  }, []);
  return (
    <div>
      <div className="overlay"></div>
      <div className="add-category-container">
        <div className="add-category-child">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-x-circle-fill close-icon"
            viewBox="0 0 16 16"
            onClick={() => {
              hideform();
            }}
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
          </svg>
          <form
            className="w-75 mx-auto"
            onSubmit={props.editable ? updateproduct : createproduct}
          >
            <div className="mb-3 d-flex ">
              <label
                htmlFor="exampleInputname"
                className="form-label w-25 fs-5 "
              >
                Name
              </label>
              <input
                type="text"
                className="form-control w-75"
                id="exampleInputname"
                aria-describedby="emailHelp"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 d-flex align-items-center ">
              <label
                htmlFor="exampleInputdesc"
                className="form-label w-25  fs-5 "
              >
                Category
              </label>
              <select
                className="form-select w-75"
                onChange={(e) => setCat(e.target.value)}
                value={cat}
              >
                <option value="" disabled hidden>
                  Select an option
                </option>
                {category && category.length > 0
                  ? category.map((value, index) => {
                      return (
                        <option value={value._id} key={index}>
                          {value.name}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </div>
            <div className="mb-3 d-flex  ">
              <label
                htmlFor="exampleInputdesc"
                className="form-label w-25 fs-5"
              >
                Decsription
              </label>
              <input
                type="text"
                className="form-control w-75"
                id="exampleInputdesc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="mb-3 d-flex ">
              <label
                htmlFor="exampleInputprice"
                className="form-label w-25 fs-5"
              >
                Price
              </label>
              <input
                type="Number"
                className="form-control w-75"
                id="exampleInputprice"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3 d-flex ">
              <label
                htmlFor="exampleInputquant"
                className="form-label w-25 fs-5"
              >
                Quantity
              </label>
              <input
                type="text"
                className="form-control w-75"
                id="exampleInputquant"
                value={quant}
                onChange={(e) => setQuant(e.target.value)}
              />
            </div>
            <div className="mb-1 d-flex ">
              <label
                htmlFor="exampleInputpic"
                className="form-label btn btn-outline-dark w-auto  fs-5"
              >
                {photo
                  ? photo.name == undefined
                    ? "change Photo"
                    : photo.name
                  : "upload Photo"}
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="exampleInputpic"
                onChange={uploadphoto}
                hidden
              />
            </div>
            {/* {photo && <img src={photo} alt="previous pic" />} */}
            <div>
              {prevpic
                ? photo && (
                    <img
                      src={photo}
                      alt="previous pic"
                      height={"100px"}
                      width={"auto"}
                    />
                  )
                : photo && (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="pic"
                      height={"100px"}
                      width={"auto"}
                    />
                  )}
            </div>
            <button type="submit" className="mt-1 btn btn-success px-5">
              Submit
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addcategory;
