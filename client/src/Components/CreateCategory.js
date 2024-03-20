import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Adminmenu from "./Adminmenu";
import axios from "axios";
import "./CSS/createcategory.css";
import Spinner from "../Components/Spinner";
import { useAuth } from "./Context/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateCategory = () => {
  const [auth] = useAuth();
  let [category, setCategory] = useState([]);
  let [addcategshow, setAddcategoryshow] = useState(false);
  let [categoryname, setCategoryname] = useState("");
  let [showerror, setShowerror] = useState("none");
  let [edit, setEdit] = useState([]);
  function deletecategory(id) {
    let check = window.confirm("Are You Sure You Wan To delete category!");

    if (check) {
      axios
        .delete(
          process.env.REACT_APP_url +
            `/api/deletecategory/${id}/${auth?.user?.email}`,
          { email: auth?.user?.email },
          { headers: { Authorization: auth?.token } }
        )
        .then((resp) => {
          // console.log("then case run");
          toast.success("Delete Category Successfully!");
          getdata();
        })
        .catch((err) => {
          // console.log(err);
          toast.error("Something Went Wrong!");
        });
    }
  }
  function handlecategoryshow() {
    setAddcategoryshow((prev) => (prev ? false : true));
  }
  function handlecreate(e) {
    // console.log();
    e.preventDefault();
    setShowerror("none");
    if (categoryname !== "") {
      axios
        .post(
          process.env.REACT_APP_url + "/api/createcategory/",
          { name: categoryname, email: auth?.user?.email },
          { headers: { Authorization: auth?.token } }
        )
        .then((resp) => {
          // console.log("dot then case Run");
          // console.log(resp);
          toast.success("Category Added Successfully!");
          setAddcategoryshow(false);
          getdata();
          setCategoryname("");
        })
        .catch((error) => {
          // console.log("catch case Run");

          toast.error("Something Went Wrong!");
          // console.log(error);
        });
      return;
    }
    setShowerror("block");
  }
  async function getdata() {
    axios
      .get(process.env.REACT_APP_url + "/api/getcategory")
      .then((resp) => {
        if (!resp) {
          // console.log("Resp not properly recieved");
        }
        // resp = JSON.parse(resp);
        const data = resp.data.resp;
        // console.log(data);
        for (let index = 0; index < data.length; index++) {
          setEdit((prev) => {
            return [...prev, false];
          });
        }
        setCategory([...data]);
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  async function updatecategory(index, update = false, id = "") {
    if (update && id) {
      // console.log("if condition run!");
      axios
        .put(
          process.env.REACT_APP_url + `/api/updatecategory/${id}`,
          { email: auth?.user?.email, name: categoryname },
          { headers: { Authorization: auth?.token } }
        )
        .then((resp) => {
          // console.log("then condition run!");

          if (!resp) {
            toast.error("Something Went Wrong");
            return;
          }
          toast.success("Updated Successfully!");
          setEdit((prev) => {
            return prev.map((value, i) => (i === index ? false : false));
          });
          getdata();
          // console.log(resp);
        })
        .catch((err) => {
          // console.log("catch case run");
          toast.error("Something Went Wrong");
          // console.log(err);
        });
      // console.log("if condition run!", id, index);
      return;
    }
    // console.log(index);

    setEdit((prev) => {
      return prev.map((value, i) => (i === index ? true : false));
    });
    // console.log(edit);

    // console.log(index);
  }
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
            <div className="d-flex flex-column ">
              {category == [] ? (
                auth?.user?.role == 0 ? (
                  <Spinner path="/dashboard/user" />
                ) : (
                  <Spinner path="/dashboard/Admin" />
                )
              ) : (
                category.map((value, index) => {
                  return (
                    <div
                      className=" d-flex category-list-item my-2"
                      key={value._id}
                    >
                      <div
                        className="title-of-product bold"
                        style={{ display: `${edit[index] ? "none" : "flex"}` }}
                      >
                        {value.name}
                      </div>
                      <input
                        type="text"
                        className="form-control my-1"
                        style={{ display: `${edit[index] ? "block" : "none"}` }}
                        placeholder="set Update Value"
                        value={categoryname}
                        onChange={(e) => setCategoryname(e.target.value)}
                      />
                      <div className="icon-about-product d-flex ">
                        <button
                          className="btn btn-primary "
                          onClick={() => updatecategory(index)}
                          id={index}
                          style={{
                            display: `${edit[index] ? "none" : "flex"}`,
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-warning "
                          onClick={() => updatecategory(index, true, value._id)}
                          id={index}
                          style={{
                            display: `${edit[index] ? "block" : "none"}`,
                          }}
                        >
                          Update
                        </button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          className="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                          id={index}
                          onClick={() => deletecategory(value._id)}
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            {addcategshow ? (
              <form
                style={{
                  width: "80%",
                  border: "0.7px solid",
                  borderRadius: "10px",
                  position: "relative",
                }}
                className="my-2 p-2"
              >
                <ToastContainer />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="bi bi-x-circle-fill close-icon"
                  viewBox="0 0 16 16"
                  onClick={() => setAddcategoryshow(false)}
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
                <div className="mb-3">
                  <label htmlFor="exampleInputname" className="form-label">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputname"
                    aria-describedby="emailHelp"
                    value={categoryname}
                    onChange={(e) => setCategoryname(e.target.value)}
                  />
                  <p className=" text-danger" style={{ display: showerror }}>
                    Write The category Name before ADD!
                  </p>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  onClick={handlecreate}
                >
                  ADD
                </button>
              </form>
            ) : (
              ""
            )}
            <button
              className="btn btn-success my-2"
              onClick={handlecategoryshow}
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
