
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserStatus, signinUser } from "../store/slices/userSlice"
import {
    useNavigate,
    useHistory
} from "react-router-dom";
import Logo from "../../src/assets/images/logo.png"
import emailLogo from "../assets/images/email.png"
import passwordLogo from "../assets/images/password.png"
import Spinner from '../components/Spinner'
import { Link, useLocation } from 'react-router-dom'
import { addProduct, getTable } from '../store/featureActions';
import { getProfile } from "../store/slices/userSlice"
import Select from 'react-select'
import moment from 'moment';
import { handleNumberInput } from '../utils/helper';

const Restaurant = () => {
    const [starttime, setStartdate] = useState("")
    const [endtime, setenddate] = useState("")
    const [rules, setRule] = useState("")
    const [date, setDate] = useState("")
    const [slottime, setSlot] = useState('')
    const [price, setPrice] = useState('')
    const [tables, settable] = useState('')
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const profile = useSelector(getProfile)
    const storeid = profile?._id

    function emptystate() {
        setStartdate("")
        setenddate("")
        setRule("")
        setDate("")
        setSlot(0)
        setPrice(0)
        settable(0)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        emptystate()
        try {
            let payload = {
                body: { storeid, starttime, endtime, rules, date: moment(date).format("DD-MMM-YYYY"), slottime: slottime?.value, price, tables },
                params: false,
                isToast: true,
            };
            const response = await dispatch(addProduct(payload)).unwrap();
            resetForm()
            getData()

        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
        console.log("function called");
    }

    const getData = async (e) => {
        try {
            let payload = {
                body: false,
                params: profile._id,

            };
            const response = await dispatch(getTable(payload)).unwrap();
            setData(response?.data?.data[0]?.menu)

        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    const addCard = async (e) => {
        e.preventDefault();
        console.log("addcard function called");
        window.location.reload()
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

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {/* <div className="modal fade addProduct_Modal" id="accoutDetailModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Account Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                    <div className="modal-body">
                            <form onSubmit={addCard} className="user-desc">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="userInputs">
                                            <input type="text" defaultValue placeholder="Card Holder Name" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="userInputs">
                                            <input type="text" defaultValue placeholder="Card Number" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="userInputs">
                                            <input type="text" defaultValue placeholder="Exp Date" />
                                            <span><img className="calendar" src="../assets/images/calendar.png" alt="" /></span>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="userInputs">
                                            <input type="text" defaultValue placeholder="CVV" />
                                        </div>
                                    </div>
                                </div>
                                <button type='submit' className="cta">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}


            <div className="modal fade addProduct_Modal" id="AddRestaurantServiceModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Restaurant Services</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} className="addProduct_ModalForm">
                                <div className="row">
                                    <div className="col-12 mb-2">
                                        <div className="addProduct_Field">
                                            <label >Date</label>
                                            <input value={date} type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} />
                                        </div>
                                    </div>
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
                                                onChange={(value) => setSlot(value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="addProduct_Field">
                                            <input value={price} type="text" placeholder="Price of Book a Table" onKeyDown={handleNumberInput} onChange={(e) => setPrice(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="addProduct_Field">
                                            <input value={tables} type="text" placeholder="Number of Tables" onKeyDown={handleNumberInput} onChange={(e) => settable(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="addProduct_Field">
                                            <textarea value={rules} placeholder="Rules & Regulation" defaultValue={""} onChange={(e) => setRule(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <button type='submit' className="cta" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#accoutDetailModal">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <section className="content-section">
                    <div className="titleSect d_flexSpacebetween">
                        <h3>Hello Martin!</h3>
                        <div className="categorySelect d_flexSpacebetweenGap">
                            <a className="cta" data-bs-toggle="modal" data-bs-target="#AddRestaurantServiceModal">Add Restaurant Service</a>
                            <select className='text-center' >
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
                                    <th scope="col">No Of Tables</th>
                                    <th scope="col">Price of Book a Table</th>
                                    <th scope="col">Day</th>
                                    <th scope="col">Time</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((element, index) => {
                                        return (<tr key={index}>
                                            {console.log(element)}
                                            <th>{element?.tables}</th>
                                            <td><p className="price">${element?.price}</p></td>
                                            <td>{element?.day}</td>
                                            <td>{element?.starttime} To {element?.endtime}</td>
                                            <td>
                                                <a onClick={(e) => { navigate(`/store/restaurant-detail/${element?.table_id}`, { state: { data: element } }) }} className="price">View Details</a>
                                            </td>
                                        </tr>
                                        )
                                    })
                                }



                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>

    )
}

export default Restaurant