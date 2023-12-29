
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import { deleteServiceById, editServiceById, getServiceById } from '../store/featureActions'
import PlaceholderImage from '../assets/images/placeholder.jpg'
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import Select from 'react-select'
import { handleNumberInput } from '../utils/helper'
import { getProfile } from '../store/slices/userSlice'

const ServiceDetails = () => {
  const dispatch = useDispatch()
  const { id: serviceId } = useParams()
  const [data, setData] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const getService = async () => {
    try {
      let payload = {
        params: serviceId,
        body: false,
      };
      const response = await dispatch(getServiceById(payload)).unwrap();
      setData(response?.data?.data)
    }
    catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }

  useEffect(() => {
    getService()
  }, [])

  return (
    <>
      <section className="content-section">
        <div className="titleSect d_flexSpacebetween">
          <h3>Service Detail</h3>
        </div>
        <div className="roomDetail-sect">
          <div className="row">
            <div className="col-12 col-lg-6 col-md-6">
              <div className="user-desc">
                <div className="row">
                  <div className="col-12">
                    <div className="userInputs">
                      <label>Title</label>
                      <input readOnly type="text" value={data?.title || "-"} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="userInputs">
                      <label>Price</label>
                      <input readOnly type="text" value={data?.price || "-"} />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="userInputs">
                      <label>Date</label>
                      <input readOnly type="text" value={data?.startdate + " to " + data?.enddate} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="userInputs">
                      <label>Time</label>
                      <input readOnly type="text" value={data?.starttime + " to " + data?.endtime} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="userInputs">
                      <label>Slot Time</label>
                      <input readOnly type="text" value={data?.slottime} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="userInputs">
                      <label>Categories</label>
                      <input readOnly type="text" value={data?.category?.map((item) => item + " ")} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="userInputs">
                      <label>Description</label>
                      <textarea readOnly value={data?.description || '-'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-md-6">
              <div className="d_flexSpacebetween mb-2">
                <p className="paraTitle">Images</p>
                <div className="edit-delSect">
                  <a className="edit-icon" data-bs-toggle="modal" data-bs-target="#deleteProductModal" onClick={() => setDeleteModal(true)}><img src={require("../assets/images/trash.png")} alt="" /></a>
                  <a className="edit-icon" data-bs-toggle="modal" data-bs-target="#AddRestaurantServiceModal" onClick={() => setEditModal(true)}><img src={require("../assets/images/edit.png")} alt="" /></a>
                </div>
              </div>
              <div className="row">
                {
                  data?.servicesImage?.map((item, index) => (
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="room_images">
                        <img src={`${process.env.REACT_APP_APIURL}${item}`} alt="" onError={(e) => e.target.src = PlaceholderImage} />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} serviceId={serviceId} data={data} />
      <EditModal editModal={editModal} setEditModal={setEditModal} serviceId={serviceId} data={data} getService={getService} />
    </>
  )
}

const DeleteModal = ({ deleteModal, setDeleteModal, serviceId, data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteItem = async (e) => {
    try {
      let payload = {
        params: serviceId,
        body: false,
        isToast: true,
      };
      const response = await dispatch(deleteServiceById(payload)).unwrap();
      setDeleteModal(false)
      navigate("/store/services")
    }
    catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }

  return (
    <Modal
      show={deleteModal}
      centered
      onHide={() => setDeleteModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Service Detail</Modal.Title>
        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" /> */}
      </Modal.Header>

      <Modal.Body>
        <div className="Product_modalDetail">
          <div className="Product_modalDetail_sect1 mb-3 d-flex flex-column align-items-center justify-content-center">
            <div className="ProdImg mb-3" style={{ width: "150px", height: "150px", borderRadius: '50%', overflow: "hidden" }}>
              <img className='h-100 w-100' style={{ objectFit: "cover", objectPosition: "center", borderRadius: '50%' }} src={`${process.env.REACT_APP_APIURL}${data?.servicesImage[0]}`} alt="" onError={(e) => e.target.src = PlaceholderImage} />
            </div>
            <p className="prod_name mb-2">{data?.title || '-'}</p>
            <p className="price mb-2">${data?.price || '-'}</p>
          </div>
          <p className="prodDesc">{data?.description || '-'}</p>
          <div className="modal_btnSect">
            <button className="cta">Edit</button>
            <button onClick={deleteItem} className="cta ctaDel">Delete</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

const EditModal = ({ editModal, setEditModal, serviceId, data, getService }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, settitle] = useState("");
  const [servicesImage, setservicesImage] = useState([]);
  const [servicestartdate, setservicestartdate] = useState("");
  const [serviceenddate, setserviceenddate] = useState("");
  const [starttime, setstarttime] = useState("");
  const [endtime, setendtime] = useState("");
  const [category, setcategory] = useState([]);
  const [slottime, setslottime] = useState(null);
  const [service_description, setservice_description] = useState("");
  const [service_price, setservice_price] = useState("");
  const profile = useSelector(getProfile);

  const onFileChange = (e) => {
    console.log(e);
    const selectedImages = e.target.files;
    const imagesArray = [];

    for (let i = 0; i < selectedImages.length; i++) {
      imagesArray.push(selectedImages[i]);
    }
    setservicesImage(servicesImage.concat(imagesArray));
  };

  const handleImageRemove = (e, index) => {
    e.preventDefault();
    console.log("workingggg");
    const updatedImages = [...servicesImage];
    updatedImages.splice(index, 1);

    setservicesImage(updatedImages);
  };

  const disabledButton = () => {
    if (!servicestartdate || !serviceenddate || !starttime || !endtime || !category || !slottime || !service_price || !title) {
      return true
    }
    else {
      return false
    }
  }

  const resetForm = () => {
    settitle("");
    setservicestartdate("");
    setserviceenddate("");
    setstarttime("");
    setendtime("");
    setcategory([]);
    setslottime(null);
    setservice_description("");
    setservice_price("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      data.append("_id", serviceId);
      data.append("storeid", profile?._id);

      servicesImage.forEach((item) => {
        console.log(item)
        data.append("servicesImage", item);
      });

      let payload = {
        body: data,
        params: false,
        isToast: true,
      };

      await dispatch(editServiceById(payload)).unwrap();
      await getService()
      setEditModal(false)
      resetForm()
    }
    catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }


  }

  useEffect(() => {
    settitle(data?.title);
    setservicestartdate(moment(data?.startdate, 'DD MMM YYYY').format('YYYY-MM-DD'));
    setserviceenddate(moment(data?.enddate, 'DD MMM YYYY').format('YYYY-MM-DD'));
    setstarttime(moment(data?.starttime, 'hh:mm A').format('HH:mm'));
    setendtime(moment(data?.endtime, 'hh:mm A').format('HH:mm'));
    setcategory(data?.category?.map((item) => ({
      label: item,
      value: item
    })));
    setslottime({ label: data?.slottime, value: data?.slottime });
    setservice_description(data?.description);
    setservice_price(data?.price);
  }, [data])

  return (
    <Modal
      show={editModal}
      centered
      onHide={() => setEditModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Restaurant Service</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
                  value={slottime}
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
                  value={category}
                  className="theme-select"
                  classNamePrefix="react-select"
                  placeholder="Select category"
                  closeMenuOnSelect={false}
                  isMulti
                  options={[
                    { label: "category 1", value: "category 1" },
                    { label: "category 2", value: "category 2" },
                    { label: "category 3", value: "category 3" },
                    { label: "category 4", value: "category 4" }
                  ]}
                  onChange={(value) => {
                    setcategory(value)
                  }}
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
            // data-bs-dismiss="modal"
            // data-bs-toggle="modal"
            // data-bs-target="#accoutDetailModal"
            disabled={disabledButton()}
          >
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>

    // <div className="modal fade addProduct_Modal" id="deleteProductModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    //   <div className="modal-dialog modal-dialog-centered">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title" id="exampleModalLabel">Service Detail</h5>
    //         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
    //       </div>
    //       <div className="modal-body">
    //         <div className="Product_modalDetail">
    //           <div className="Product_modalDetail_sect1 mb-3 d-flex flex-column align-items-center justify-content-center">
    //             <div className="ProdImg mb-3" style={{ width: "150px", height: "150px", borderRadius: '50%', overflow: "hidden" }}>
    //               <img className='h-100 w-100' style={{ objectFit: "cover", objectPosition: "center", borderRadius: '50%' }} src={`${process.env.REACT_APP_APIURL}${data?.servicesImage[0]}`} alt="" onError={(e) => e.target.src = PlaceholderImage} />
    //             </div>
    //             <p className="prod_name mb-2">{data?.title || '-'}</p>
    //             <p className="price mb-2">${data?.price || '-'}</p>
    //           </div>
    //           <p className="prodDesc">{data?.description || '-'}</p>
    //           <div className="modal_btnSect">
    //             <button className="cta">Edit</button>
    //             <button onClick={deleteItem} className="cta ctaDel">Delete</button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default ServiceDetails