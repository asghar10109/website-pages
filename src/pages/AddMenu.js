import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import { getProfile } from "../store/slices/userSlice"
import { addProduct ,addMenu } from '../store/featureActions';
import { role_type } from '../constants/app-constants';

const AddMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const profile = useSelector(getProfile)
    const [modalType, setModalType] = useState()
    const [description, setDescription] = useState("")
    const [product_name, setProduct_name] = useState("")
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState([])

    function viewModal(item, type) {
        setModalType(type)
        if (type == "addProduct") {
        }
    }

    function closeModal() {
        console.log("close modal");
        setModalType("")
        setDescription("")
        setPrice("")
        setProduct_name("")
        setFile([])
    }

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        setFile(Array.from(selectedFiles));
    }

    const addproduct = async (e) => {
        e.preventDefault()

        var formData = new FormData();
        formData.append("storeid", profile._id);
        formData.append("menu_name", product_name);
        formData.append("description", description);
        formData.append("price", price);

        file?.map((item, i) => {
            formData.append("menuImage", item);
        });

        try {
            let payload = {
                body: formData,
                params: false,
                isToast: true,
            };
            await dispatch(addMenu(payload)).unwrap();
            setModalType("")
            navigate('/store/menus')

        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    const handleKeyDown = (e) => {
        const regex = /^[0-9]*\.?[0-9]*$/; // Regular expression to allow only numbers and decimal
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (e.key === '.' && e.target.value.includes('.')) {
            // Prevent entering more than one decimal point
            e.preventDefault();
        }
        if (!regex.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    }

    const handleDelete = (index) => {
        const updatedFiles = [...file];
        updatedFiles.splice(index, 1);
        setFile(updatedFiles);
    }

    return (

        <>
            <div>
                {
                    modalType == "addProduct" ?
                        <>
                            <Modal
                                show={true}
                                onHide={() => setModalType("")}
                                backdrop="static"
                                keyboard={false}
                                centered
                                className=' addProduct_Modal'
                            >
                                <Modal.Header>
                                    <h5 className="modal-title" id="addProductModal">Add {profile?.role_type == role_type?.store ? "Product" : "Menu"}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} />
                                </Modal.Header>

                                <Modal.Body>
                                    <form onSubmit={addproduct} className="addProduct_ModalForm">

                                        <div className="row">
                                            <div className="col-12">
                                                <div className="addProperty_image">
                                                    <div className="upload_box">
                                                        <a >
                                                            <img src={require("../assets/images/upload-blue.png")} alt="" />
                                                        </a>
                                                        <p className="smallPara">Upload Image</p>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor />
                                                        <input type="file" className="upload-img form-control" name="images[]" multiple onChange={handleFileChange} />
                                                    </div>
                                                </div>
                                                <div className="image-row">
                                                    {file?.map((e, index) => (
                                                        <div key={index} className="image-container">
                                                            <img
                                                                src={URL.createObjectURL(e)}
                                                                alt={`File ${index + 1}`}
                                                                className="small-image"
                                                            />
                                                            <span
                                                                className="delete-icon"
                                                                onClick={() => handleDelete(index)}
                                                            >
                                                                &#10006;
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="addProduct_Field">
                                                    <input type="text" maxLength={30} placeholder={profile?.role_type == role_type?.store ? "Product Name" : "Menu Name"} onChange={(e) => setProduct_name(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="addProduct_Field">
                                                    <input type="text" maxLength={6} onKeyDown={handleKeyDown} placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="addProduct_Field">
                                                    <textarea placeholder="Description" maxLength={275} onChange={(e) => setDescription(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="cta" type="submit">Submit</button>
                                    </form>
                                </Modal.Body>
                            </Modal>

                        </> :
                        <></>
                }

            </div>

            <div>
                <section className="content-section">
                    <div className='d-flex justify-content-between'>
                        <div className="titleSect ">
                            <h3>{profile?.firstname} {profile?.lastname}</h3>
                        </div>
                        <div className="">
                            <button style={{ height: '55px', borderRadius: '50px' }} className="cta" data-bs-toggle="modal" data-bs-target="#addProductModal" onClick={() => viewModal(null, "addProduct")}>
                                {profile?.role_type == role_type?.store ? "Add Products"  :"Add Menu"}
                                </button>
                        </div>
                    </div>

                </section>
            </div>
        </>
    )
}

export default AddMenu