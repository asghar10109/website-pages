
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, setAllProducts, setProducts } from "../store/slices/userSlice"
import { useNavigate } from "react-router-dom"
import { Modal } from 'react-bootstrap'
import { addProduct, getProducts, deleteProduct } from '../store/featureActions'
import toast from 'react-hot-toast'
import { role_type } from '../constants/app-constants'

const ReadMore = ({ children }) => {
    const text = children
    const [isReadMore, setIsReadMore] = useState(true)

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    return (
        <p className="text">
            {isReadMore ? text.slice(0, 50) : text}
            <span onClick={toggleReadMore} >
                {text.length > 50 ? (
                    isReadMore ? (
                        <>
                            <p style={{ fontWeight: "bold" }}>...Read more</p>{" "}
                        </>
                    ) : (
                        <>
                            <p style={{ fontWeight: "bold" }}>Show less</p>
                        </>
                    )
                ) : (
                    <></>
                )}
            </span>
        </p>
    )
}

const Product = () => {
    const [selectdata, setSelectdata] = useState()
    const [userDetail, setUserDetail] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const profile = useSelector(getProfile)
    const { products } = useSelector((state) => state.users)
    const [description, setDescription] = useState("")
    const [product_name, setProduct_name] = useState("")
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState([])
    const [data, setData] = useState([])

    const [editdescription, setEditDescription] = useState("")
    const [editproduct_name, setEditProduct_name] = useState("")
    const [editprice, setEditPrice] = useState(0)
    const [editfile, setEditFile] = useState([])
    const [isDisabled, setIsDisabled] = useState(false)

    function viewModal(item, type) {
        setIsOpen(true);
        setModalType(type)

        if (type == "userDetail") {
            setUserDetail(item)
        }
        else if (type == "deleteProduct") {
            setSelectdata(item)
        }
        else if (type == "addProduct") {

        }
        else if (type == "editProduct") {
            setSelectdata(item)
            populateForm(item)
        }

    }

    function closeModal() {
        console.log("close modal");
        setIsOpen(false);
        setModalType("")
        setDescription("")
        setPrice("")
        setProduct_name("")
        setFile([])
    }

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newFiles = [...file, ...selectedFiles];
        setFile(newFiles);
    };

    const handleDelete = (index) => {
        const updatedFiles = [...file];
        updatedFiles.splice(index, 1);
        setFile(updatedFiles);
    };

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
    };

    const addproduct = async (e) => {
        e.preventDefault()

        var formData = new FormData();
        formData.append("storeid", profile._id);
        formData.append("product_name", product_name);
        formData.append("description", description);
        formData.append("price", price);

        file?.map((item, i) => {
            formData.append("productImage", item);
        });
        try {
            let payload = {
                body: formData,
                params: false,
                isToast: true,
            };
            setIsDisabled(true)
            await dispatch(addProduct(payload)).unwrap();
            resetForm()
            setModalType("")
            await getProduct()
            setIsDisabled(false)
        }
        catch (rejectedValueOrSerializedError) {
            setIsDisabled(false)
            console.log(rejectedValueOrSerializedError);
        }
    }

    const getProduct = async () => {
        try {
            let payload = {
                body: false,
                params: profile._id,

            };
            const response = await dispatch(getProducts(payload)).unwrap();
            dispatch(setProducts(response?.data?.data[0]?.products || []))
            dispatch(setAllProducts(response?.data?.data[0]?.products))


        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    const dltProduct = async (id) => {
        try {
            let payload = {
                body: false,
                params: id,
                isToast: true,
            };
            setIsDisabled(true)
            const response = await dispatch(deleteProduct(payload)).unwrap();
            setModalType("")
            await getProduct()
            setIsDisabled(false)
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
            setIsDisabled(false)
        }
    }

    const editProduct = async (e, id) => {
        e.preventDefault()
        var formData = new FormData();
        formData.append("p_id", id);
        formData.append("product_name", editproduct_name);
        formData.append("description", editdescription);
        formData.append("price", editprice);

        file?.map((item, i) => {
            formData.append("productImage", item);
        });

        try {
            if (!editproduct_name && !editdescription && !editprice) {
                toast.error('Atleast fill one field for update');
            }
            else {
                let payload = {
                    body: formData,
                    params: false,
                    isToast: true,
                };
                setIsDisabled(true)
                await dispatch(addProduct(payload)).unwrap();
                setModalType("")
                await getProduct()
                resetForm()
                setIsDisabled(false)
            }

        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
            setIsDisabled(false)
        }
    }

    const resetForm = () => {
        setDescription("")
        setProduct_name("")
        setPrice(0)
        setEditDescription("")
        setEditProduct_name("")
        setEditPrice("")
        setEditFile("")
        setFile([])
    }

    const populateForm = (product) => {
        setEditDescription(product?.product_description)
        setEditProduct_name(product?.product_name)
        setEditPrice(product?.product_price)
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <div>
                {
                    modalType == "userDetail" ?
                        <>
                            <p className="pass-text">Sound Detail</p>
                            <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            <div className="modal-body">

                            </div>
                        </> :

                        modalType == "deleteProduct" ?
                            <>

                                <Modal
                                    show={true}
                                    onHide={() => setModalType("")}
                                    backdrop="static"
                                    keyboard={false}
                                    className=' addProduct_Modal'
                                >
                                    <Modal.Header >
                                        <h5 className="modal-title" id="exampleModalLabel">{profile?.role_type == role_type?.store ? "Product Detail" : "Menu Detail"}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} />
                                    </Modal.Header>

                                    <Modal.Body>
                                        <div className="Product_modalDetail">

                                            <div className="Product_modalDetail_sect1 mb-3">
                                                <div className="ProdImg mb-3 prod">
                                                    <img src={`${process.env.REACT_APP_APIURL}${selectdata?.product_image[0]}`} alt="" />
                                                </div>
                                                <p className="prod_name mb-2">Product: {selectdata?.product_name}</p>
                                                <p className="price mb-2">Price: ${selectdata?.product_price}</p>

                                            </div>
                                            <p className="prodDesc">Description: {selectdata?.product_description}</p>
                                            <div className="modal_btnSect">
                                                {/* <button className="cta" onClick={() => viewModal(null, "editProduct")}>Edit</button> */}
                                                <button disabled={isDisabled} className="cta ctaDel" onClick={() => { dltProduct(selectdata?.product_id) }}>Delete</button>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                </Modal>

                            </> :

                            modalType == "addProduct" ?
                                <>
                                    <Modal
                                        show={true}
                                        onHide={() => setModalType("")}
                                        backdrop="static"
                                        keyboard={false}
                                        className=' addProduct_Modal'
                                    >
                                        <Modal.Header>
                                            <h5 className="modal-title" id="addProductModal">
                                                {
                                                    profile?.role_type == role_type.store ? "Add Product" : "Add Menu"

                                                }

                                            </h5>
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
                                                                <label />
                                                                <input accept=".png, .jpg, .jpeg" type="file" className="upload-img form-control" name="images[]" multiple onChange={handleFileChange} />
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
                                                        <div className="img-thumbs img-thumbs-hidden img-preview" />

                                                    </div>
                                                    <div className="col-12">
                                                        <div className="addProduct_Field">
                                                            <input type="text" maxLength={30} placeholder="Product Name" onChange={(e) => setProduct_name(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="addProduct_Field">
                                                            <input type="text" placeholder="Price" maxLength={6} onKeyDown={handleKeyDown} onChange={(e) => setPrice(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="addProduct_Field">
                                                            <textarea placeholder="Description" maxLength={275} onChange={(e) => setDescription(e.target.value)} defaultValue={""} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="cta" type="submit" disabled={isDisabled} >Submit</button>
                                            </form>
                                        </Modal.Body>
                                    </Modal>

                                </> :

                                modalType == "editProduct" ?
                                    <>

                                        <Modal
                                            show={true}
                                            onHide={() => setModalType("")}
                                            backdrop="static"
                                            keyboard={false}
                                            className=' addProduct_Modal'
                                        >
                                            <Modal.Header>
                                                <h5 className="modal-title" id="exampleModalLabel">{profile?.role_type == role_type?.store ? "Edit Product" : "Edit Menu"}</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} />
                                            </Modal.Header>

                                            <Modal.Body>

                                                <form onSubmit={(e) => editProduct(e, selectdata?.product_id)} action className="addProduct_ModalForm">
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
                                                                    <label />
                                                                    <input  accept=".png, .jpg, .jpeg" type="file" className="form-control upload-img" name="images[]" multiple onChange={handleFileChange} />
                                                                </div>
                                                            </div>

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
                                                            <div className="img-thumbs img-thumbs-hidden img-preview" />
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="addProduct_Field">
                                                                <input type="text" value={editproduct_name} maxLength={30} placeholder="Product Name" onChange={(e) => setEditProduct_name(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="addProduct_Field">
                                                                <input type="text" value={editprice} maxLength={6} onKeyDown={handleKeyDown} placeholder="Price" onChange={(e) => setEditPrice(e.target.value)} />
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <div className="addProduct_Field">
                                                                <textarea placeholder="Description" value={editdescription} maxLength={275} onChange={(e) => setEditDescription(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <a href="index.php" className="cta">Save</a> */}
                                                    <button disabled={isDisabled} className="cta" type="submit">Save</button>
                                                </form>
                                            </Modal.Body>
                                        </Modal>
                                    </> :

                                    <></>
                }

            </div>


            <div>

                <section className="content-section">
                    <div className="titleSect d_flexSpacebetween">
                        <h3>Products</h3>
                        <div>
                            <button className="cta" data-bs-toggle="modal" data-bs-target="#addProductModal" onClick={() => viewModal(null, "addProduct")}>
                                {profile?.role_type == role_type?.store ? "Add Product" : "Add Menu"}
                            </button>
                        </div>
                    </div>
                    <div className="row mt-5">
                        {
                            products?.length <= 0 ?
                                <p>No product available</p>
                                :
                                products?.map((element, index) => {
                                    return (<div key={index} className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 mb-3">
                                        <div className="productCard">
                                            <div className="prodImg">
                                                <img src={`${process.env.REACT_APP_APIURL}${element?.product_image[0]}`} alt="" />
                                            </div>
                                            <div className="prodDetail">
                                                <p className="prod_name">{element.product_name}</p>
                                                <p className="prodDesc">
                                                    <ReadMore>{element.product_description}</ReadMore>
                                                </p>

                                                <p className="price">Price: ${element.product_price}</p>
                                            </div>
                                            <div className="edit-delSect">
                                                <a className="edit-icon" data-bs-toggle="modal" data-bs-target="#deleteProductModal" onClick={() => viewModal(element, "deleteProduct")}><img src={require("../assets/images/trash.png")} alt="" /></a>
                                                <a className="edit-icon" data-bs-toggle="modal" data-bs-target="#editProductModal" onClick={() => viewModal(element, "editProduct")} ><img src={require("../assets/images/edit.png")} alt="" /></a>
                                            </div>
                                        </div>
                                    </div>)
                                })
                        }


                    </div>
                </section>
            </div>
        </>
    )
}

export default Product