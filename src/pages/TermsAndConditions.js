import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getTCAndPP } from '../store/featureActions/index'

const TermsAndConditions = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState()

  const getTermsAndCondition = async () => {
    try {
      let payload = {
        body: false,
        params: `terms_and_conditions`

      };
      const response = await dispatch(getTCAndPP(payload)).unwrap();
      setData(response?.data?.data?.termCondition)

    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }

  useEffect(() => {
    getTermsAndCondition()
  }, [])

  return (
    <>
      <section className="content-section">
        <div className="titleSect d_flexSpacebetween">
          <h3>Terms &amp; Conditions</h3>
        </div>
        <div className="term_condition_sect">
          <ul>
            <li>
              <Link to="/store/terms-and-conditions" className="cta">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to="/store/privacy-policy" className="cta cta_bgWhite">Privacy Policy</Link>
            </li>
          </ul>
          <div className="descPara">
            <p className="paragraph mb-3"></p>
            <p className="paragraph mb-3">{data}</p>
            
          </div>
        </div>
      </section>
    </>
  )
}

export default TermsAndConditions

// src={`${process.env.REACT_APP_APIURL}${element?.product_image[0]}`}