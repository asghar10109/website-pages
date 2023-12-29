import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../store/slices/userSlice"
import moment from 'moment'
import { useNavigate } from "react-router-dom"
import { addProduct, getServies } from "../store/featureActions"
import Select from 'react-select'
import { handleNumberInput } from "../utils/helper"

const Home = () => {
  const dispatch = useDispatch()
  const [title, settitle] = useState("")
  const [servicesImage, setservicesImage] = useState([])
  const [servicestartdate, setservicestartdate] = useState("")
  const [serviceenddate, setserviceenddate] = useState("")
  const [starttime, setstarttime] = useState("")
  const [endtime, setendtime] = useState("")
  const [category, setcategory] = useState([])
  const [slottime, setslottime] = useState(null)
  const [service_description, setservice_description] = useState("")
  const [service_price, setservice_price] = useState("")
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const profile = useSelector(getProfile)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("servicestartdate", moment(servicestartdate).format('DD-MMM-YYYY'));
      data.append("serviceenddate", moment(serviceenddate).format('DD-MMM-YYYY'));
      data.append("starttime", starttime);
      data.append("endtime", endtime);
      data.append("category", JSON.stringify(category?.map((item) => item?.value)));
      data.append("slottime", slottime?.value);
      data.append("service_description", service_description);
      data.append("service_price", service_price);
      servicesImage.forEach((item) => {
        data.append("servicesImage", item);
      });
      let payload = {
        body: data,
        params: false,
        isToast: true,
      };
      await dispatch(addProduct(payload)).unwrap();
      await getServices()
      settitle("");
      setservicesImage([]);
      setservicestartdate("");
      setserviceenddate("");
      setstarttime("");
      setendtime("");
      setcategory([]);
      setslottime(null);
      setservice_description("");
      setservice_price("");
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }

  const onFileChange = (e) => {
    console.log(e);
    const selectedImages = e.target.files;
    const imagesArray = [];

    for (let i = 0; i < selectedImages.length; i++) {
      imagesArray.push(selectedImages[i]);
    }
    setservicesImage(servicesImage.concat(imagesArray));
  }

  const handleImageRemove = (e, index) => {
    e.preventDefault()
    const updatedImages = [...servicesImage]
    updatedImages.splice(index, 1)
    setservicesImage(updatedImages)
  }

  const getServices = async () => {
    try {
      let payload = {
        params: profile?._id,
        body: false,
      };
      const response = await dispatch(getServies(payload)).unwrap();

      setData(response?.data?.data[0]?.services)

    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }

  const disabledButton = () => {
    if (!servicestartdate || !serviceenddate || !starttime || !endtime || !category || !slottime || !service_price || !title) {
      return true
    }
    else {
      return false
    }
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <>
      {/* <div
        className="modal fade addProduct_Modal"
        id="accoutDetailModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Account Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className="user-desc">
                <div className="row">
                  <div className="col-12">
                    <div className="userInputs">
                      <input
                        type="text"
                        defaultValue
                        placeholder="Card Holder Name"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="userInputs">
                      <input
                        type="text"
                        defaultValue
                        placeholder="Card Number"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="userInputs">
                      <input type="text" defaultValue placeholder="Exp Date" />
                      <span>
                        <img
                          className="calendar"
                          src="../assets/images/calendar.png"
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="userInputs">
                      <input type="text" defaultValue placeholder="CVV" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="cta">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="modal fade addProduct_Modal"
        id="AddServiceModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Service
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="custom-calender calendar" id="calendar" />
                  </div>
                  <div className="col-12">
                    <div className="addProperty_image">
                      <div className="upload_box">
                        <p className="smallPara">Upload Image</p>
                      </div>
                      <div className="form-group">
                        <label htmlFor="image" />
                        <input
                          type="file"
                          onChange={onFileChange}
                          className="upload-img form-control"
                          name="images[]"
                          multiple
                        />
                      </div>
                    </div>
                    <div className="img-thumbs img-thumbs-hidden img-preview" />
                    {servicesImage?.map((image, index) => (
                      <div
                        style={{
                          display: "inline",
                          position: "relative",
                        }}
                        key={index}
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index}`}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "20px",
                            marginBottom: "10px",
                            marginRight: "50px",
                          }}
                        />
                        <button
                          style={{
                            borderRadius: "100%",
                            position: "absolute",
                            right: "67px",
                            marginTop: "10px",
                          }}
                          onClick={(e) => handleImageRemove(e, index)}
                        >
                          <i
                            style={{
                              color: "white",
                              backgroundColor: "black",
                            }}
                            className="fas fa-trash-alt"
                          ></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="col-6">
                    <div className="addProduct_Field">
                      <label htmlFor="startDate">Start Date</label>
                      <input
                        type="date"
                        value={servicestartdate}
                        onChange={(e) => setservicestartdate(e.target.value)}
                        placeholder="Start Date"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="addProduct_Field">
                      <label htmlFor="endDate">End Date</label>
                      <input type="date" value={serviceenddate}
                        onChange={(e) => setserviceenddate(e.target.value)} min={servicestartdate} placeholder="End Date" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="addProduct_Field">
                      <label htmlFor="startTime">Start Time</label>
                      <input
                        type="time"
                        value={starttime}
                        onChange={(e) => setstarttime(e.target.value)}
                        placeholder="Start Time"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="addProduct_Field">
                      <label htmlFor="endTime">End Time</label>
                      <input type="time" value={endtime}
                        onChange={(e) => setendtime(e.target.value)} placeholder="End Time" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="addProduct_Field">
                      <label htmlFor="slotTime">Slot Time</label>
                      <Select
                        isSearchable={false}
                        className="theme-select"
                        classNamePrefix="react-select"
                        placeholder="Slot time"
                        closeMenuOnSelect={false}
                        options={[
                          { label: "30", value: "30" },
                          { label: "60", value: "60" },
                          { label: "90", value: "90" },
                          { label: "120", value: "120" }
                        ]}
                        onChange={(value) => setslottime(value)}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="addProduct_Field">
                      <label htmlFor="category">Category</label>
                      <Select
                        className="theme-select"
                        classNamePrefix="react-select"
                        placeholder="Select category"
                        closeMenuOnSelect={false}
                        isMulti
                        options={[
                          {
                            label: "category 1",
                            value: "category 1"
                          },
                          { label: "category 2", value: "category 2" },
                          { label: "category 3", value: "category 3" },
                          { label: "category 4", value: "category 4" }
                        ]}
                        onChange={(value) => setcategory(value)}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="addProduct_Field">
                      <label htmlFor="price">Price</label>
                      <input
                        className="mb-20"
                        type="text"
                        value={service_price}
                        onKeyDown={handleNumberInput}
                        maxLength={6}
                        onChange={(e) => setservice_price(e.target.value)} placeholder="Price" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="addProduct_Field">
                      <label htmlFor="title">Title</label>
                      <input
                        className="mb-20"
                        type="text"
                        value={title}
                        maxLength={30}
                        onChange={(e) => settitle(e.target.value)} placeholder="Title" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="addProduct_Field">
                      <textarea
                        placeholder="Description"
                        value={service_description}
                        onChange={(e) => setservice_description(e.target.value)}
                        maxLength={300}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="cta"
                  data-bs-dismiss="modal"
                  data-bs-toggle="modal"
                  data-bs-target="#accoutDetailModal"
                  disabled={disabledButton()}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* <section className="content-section">
                    <div className="titleSect d_flexSpacebetween">
                        <h3>Hello Martin!</h3>
                        <div className="categorySelect d_flexSpacebetweenGap">
                            <a className="cta" data-bs-toggle="modal" data-bs-target="#AddRestaurantServiceModal">Add Restaurant Service</a>
                            <select  >
                                <option value={0}>Today</option>
                                <option value={1}>Previous day</option>
                                <option value={2}>Previous Week</option>
                            </select>
                        </div>
                    </div>
                    <div className="hotel-categorySect table-responsive mt-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Tables</th>
                                    <th scope="col">Price of Book a Table</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>01</th>
                                    <td><p className="price">$50.00</p></td>
                                    <td>01-02-2023</td>
                                    <td>10 AM To 10 PM</td>
                                    <td>
                                        <a onClick={(e)=>{navigate('/store/service-detail')}} className="price">View Details</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>02</th>
                                    <td><p className="price">$50.00</p></td>
                                    <td>01-02-2023</td>
                                    <td>10 AM To 10 PM</td>
                                    <td>
                                        <a onClick={(e)=>{navigate('/store/service-detail')}} className="price">View Details</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>03</th>
                                    <td><p className="price">$50.00</p></td>
                                    <td>01-02-2023</td>
                                    <td>10 AM To 10 PM</td>
                                    <td>
                                        <a onClick={(e)=>{navigate('/store/service-detail')}} className="price">View Details</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>04</th>
                                    <td><p className="price">$50.00</p></td>
                                    <td>01-02-2023</td>
                                    <td>10 AM To 10 PM</td>
                                    <td>
                                        <a onClick={(e)=>{navigate('/store/service-detail')}} className="price">View Details</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>05</th>
                                    <td><p className="price">$50.00</p></td>
                                    <td>01-02-2023</td>
                                    <td>10 AM To 10 PM</td>
                                    <td>
                                        <a onClick={(e)=>{navigate('/store/service-detail')}} className="price">View Details</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>06</th>
                                    <td><p className="price">$50.00</p></td>
                                    <td>01-02-2023</td>
                                    <td>10 AM To 10 PM</td>
                                    <td>
                                        <a onClick={(e)=>{navigate('/store/service-detail')}} className="price">View Details</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section> */}

        <section className="content-section">
          <div className="titleSect d_flexSpacebetween">
            <h3>Hello {profile?.firstname + " " + profile?.lastname}!</h3>
            <div className="categorySelect d_flexSpacebetweenGap">
              <a
                className="cta"
                data-bs-toggle="modal"
                data-bs-target="#AddServiceModal"
              >
                Add Service
              </a>
              <select>
                <option value={0}>Select Category</option>
                <option value={1}>Select Category</option>
                <option value={2}>Select Category</option>
              </select>
            </div>
          </div>
          <div className="hotel-categorySect mt-5">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Service Price</th>
                  <th scope="col">Categories</th>
                  <th scope="col">Time</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {
                  data?.map((item, index) => (
                    <tr key={index}>
                      <th>{item?.service_name}</th>
                      <td>
                        <p className="price">${item?.service_price}</p>
                      </td>
                      <td>{item?.service_description}</td>
                      <td>{item?.service_starttime} to {item?.service_endtime}</td>
                      <td>
                        <a
                          onClick={(e) => {
                            console.log(item)
                            navigate(`/store/service-detail/${item?.service_id}`);
                          }}
                          className="price"
                        >
                          View Details
                        </a>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
