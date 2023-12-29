
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import { deleteTable, editTable, getTable } from '../store/featureActions'
import { getProfile } from "../store/slices/userSlice"
import Select from 'react-select'
import moment from 'moment';

const RestaurantDetails = () => {
    const [starttime, setStartdate] = useState("")
    const [endtime, setenddate] = useState("")
    const [rules, setRule] = useState("")
    const [date, setDate] = useState("")
    const [slottime, setSlot] = useState(0)
    const [price, setPrice] = useState(0)
    const [tables, settable] = useState(0)
    const [selectdata, setSelectdata] = useState()
    const [modalType, setModalType] = useState()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const profile = useSelector(getProfile)
    const location = useLocation();
    const { data } = location.state
    const storeid = profile?._id

    function viewModal(item, type) {
        console.log(item, type);
        setModalType(type)


        if (type == "deleteProduct") {
            setSelectdata(item)
        }

        else if (type == "editProduct") {
            console.log("edit menu modal ", item);
            setSelectdata(item)
            populateFields(item)
        }

    }

    function closeModal() {
        setModalType('');
        resetForm()
    }

    const deleteItem = async (id) => {

        console.log("deleteItem function called", id);
        try {
            let payload = {
                body: false,
                params: id,
                isToast: true,
            };
            const response = await dispatch(deleteTable(payload)).unwrap();
            setModalType("")
            navigate('/store/restaurant')
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    const editService = async (e, _id) => {
        e.preventDefault();

        try {
            let payload = {
                body: { _id, storeid, starttime, endtime, rules, slottime: slottime?.value, price, tables },
                params: false,
                isToast: true,
            };
            const response = await dispatch(editTable(payload)).unwrap();
            resetForm()
            navigate('/store/restaurant')
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
        console.log("function called");
    }

    const resetForm = () => {
        setStartdate('')
        setenddate('')
        setRule('')
        setDate('')
        setSlot('')
        setPrice('')
        settable('')
    }

    const populateFields = (data) => {
        setStartdate(moment(data?.starttime, ['h:mm A']).format('HH:mm'))
        setenddate(moment(data?.endtime, ['h:mm A']).format('HH:mm'))
        setRule(data?.rules)
        setSlot({ label: data?.slot, value: data?.slot })
        setPrice(data?.price)
        settable(data?.tables)
    }

    return (
        <>
            <div>
                {
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
                                    <h5 className="modal-title" id="exampleModalLabel">Table Detail</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} />
                                </Modal.Header>

                                <Modal.Body>
                                    <div className="Product_modalDetail">

                                        <div className="Product_modalDetail_sect1 mb-3">
                                            <p className="prod_name mb-2">Day: {data?.day}</p>
                                            <p className="price mb-2">Time: {data?.starttime} To {data?.endtime}</p>
                                            <p className="prod_name mb-2">Tables: {data?.tables}</p>
                                            <p className="price mb-2">Price: {data?.price}</p>
                                            <p className="prodDesc">Rules: {data?.rules}</p>
                                        </div>
                                        {/* <p className="prodDesc">Rules: {data?.rules}</p> */}
                                        <div className="modal_btnSect">
                                            <a className="cta" onClick={() => viewModal(null, "editProduct")}>Edit</a>
                                            <a className="cta ctaDel" onClick={() => { deleteItem(data?.table_id) }}>Delete</a>
                                        </div>
                                    </div>
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
                                    className=' addProduct_Modal editProduct'
                                >
                                    <Modal.Header>
                                        <h5 className="modal-title" id="exampleModalLabel">Edit Menu</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} />
                                    </Modal.Header>

                                    <Modal.Body>

                                        <form onSubmit={(e) => editService(e, data?.table_id)} className="addProduct_ModalForm">
                                            <div className="row">
                                                {/* <div className="col-12 mb-2">
                                                    <div className="addProduct_Field">
                                                        <label >Date</label>
                                                        <input value={date} type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} />
                                                    </div>
                                                </div> */}
                                                <div className="col-6">
                                                    <div className="addProduct_Field">
                                                        <label >Start Time</label>
                                                        <input value={starttime} type="time" placeholder="Start Time" onChange={(e) => setStartdate(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="addProduct_Field">
                                                        <label >End Time</label>
                                                        <input value={endtime} type="time" placeholder="End Time" onChange={(e) => setenddate(e.target.value)} />
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
                                                            value={slottime}
                                                            onChange={(value) => setSlot(value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="addProduct_Field">
                                                        <input value={price} type="text" placeholder="Price of Book a Table" onChange={(e) => setPrice(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="addProduct_Field">
                                                        <input value={tables} type="text" placeholder="Number of Tables" onChange={(e) => settable(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="addProduct_Field">
                                                        <textarea value={rules} name placeholder="Rules & Regulation" onChange={(e) => setRule(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <button type='submit' className="cta" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#accoutDetailModal">Submit</button>
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
                        <h3>Service Detail</h3>
                    </div>
                    <div className="serviceDetail-sect roomDetail-sect ">
                        <div className="row">
                            <div className="col-12">
                                <div className="editIcon_delIcon mb-2">
                                    <div className="edit-delSect">
                                        <a className="edit-icon" data-bs-toggle="modal" data-bs-target="#deleteProductModal"><img src={require("../assets/images/trash.png")} onClick={() => viewModal(data, "deleteProduct")} alt="" /></a>
                                        <a className="edit-icon" data-bs-toggle="modal" data-bs-target="#AddRestaurantServiceModal"><img src={require("../assets/images/edit.png")} onClick={() => viewModal(data, "editProduct")} alt="" /></a>
                                    </div>
                                </div>
                                <form className="user-desc">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label >Table</label>
                                                <input readOnly type="text" defaultValue={data?.tables} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label >Price of Book a Table</label>
                                                <input readOnly type="text" defaultValue={data?.price} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label >Day</label>
                                                <input readOnly type="text" defaultValue={data?.day} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label >Time</label>
                                                <input readOnly type="text" defaultValue={`${data.starttime} To ${data.endtime}`} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label >Rule &amp; Regulation</label>
                                                <textarea readOnly name defaultValue={data?.rules} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default RestaurantDetails