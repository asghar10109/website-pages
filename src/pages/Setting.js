
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCardList, getTCAndPP } from '../store/featureActions'

const Setting = () => {
    const dispatch = useDispatch()
    const [termsAndConditions, setTermsAndConditions] = useState("")
    const [privacyPolicy, setPrivacyPolicy] = useState("")

    const getTermsAndConditions = async () => {
        try {
            let payload = {
                body: false,
                params: "terms_and_conditions"

            }
            const response = await dispatch(getTCAndPP(payload)).unwrap()
            setTermsAndConditions(response?.data?.data?.termCondition)
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    const getPrivacyPolicy = async () => {
        try {
            let payload = {
                body: false,
                params: "privacy_policy"

            }
            const response = await dispatch(getTCAndPP(payload)).unwrap()
            setPrivacyPolicy(response?.data?.data?.termCondition)
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    const getAllCards = async () => {
        try {
            let payload = {
                body: false,
                params: false
            }
            const response = await dispatch(getCardList(payload)).unwrap()
            console.log(response?.data?.data?.termCondition)
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    useEffect(() => {
        getTermsAndConditions()
        getPrivacyPolicy()
        getAllCards()
    }, [])

    return (
        <div>
            <section className="content-section">
                <div className="titleSect d_flexSpacebetween">
                    <h3>Settings</h3>
                </div>
                <div className="setting_wrapper term_condition_sect">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-MyAccount-tab" data-bs-toggle="pill" data-bs-target="#pills-MyAccount" type="button" role="tab" aria-controls="pills-MyAccount" aria-selected="true">Terms &amp; Conditions</button>
                        </li>
                
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-PrivacyPolicy-tab" data-bs-toggle="pill" data-bs-target="#pills-PrivacyPolicy" type="button" role="tab" aria-controls="pills-PrivacyPolicy" aria-selected="false">Privacy Policy</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-MyAccount" role="tabpanel" aria-labelledby="pills-MyAccount-tab">
                            <div className="descPara">
                                <p className="paragraph mb-3">{termsAndConditions || "-"}</p>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="pills-PrivacyPolicy" role="tabpanel" aria-labelledby="pills-PrivacyPolicy-tab">
                            <div className="descPara">
                                <p className="paragraph mb-3">{privacyPolicy || "-"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Setting