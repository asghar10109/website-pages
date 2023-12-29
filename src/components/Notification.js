import React from 'react'

const Notification = () => {
    return (

        <>
            <div className="modal fade addProduct_Modal" id="notificationModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Notification</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="notification_wrapper">
                                <div className="notifications">
                                    <div className="d_flexSpacebetween">
                                        <p className="prod_name">lorem ipsum dollar set</p>
                                        <p className="price"><small>2 hrs ago</small></p>
                                    </div>
                                    <p className="prodDesc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, dolores blanditiis tenetur aliquam ab nemo. Beatae magni impedit error fuga.</p>
                                </div>
                                <div className="notifications">
                                    <div className="d_flexSpacebetween">
                                        <p className="prod_name">lorem ipsum dollar set</p>
                                        <p className="price"><small>2 hrs ago</small></p>
                                    </div>
                                    <p className="prodDesc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, dolores blanditiis tenetur aliquam ab nemo. Beatae magni impedit error fuga.</p>
                                </div>
                                <div className="notifications">
                                    <div className="d_flexSpacebetween">
                                        <p className="prod_name">lorem ipsum dollar set</p>
                                        <p className="price"><small>2 hrs ago</small></p>
                                    </div>
                                    <p className="prodDesc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, dolores blanditiis tenetur aliquam ab nemo. Beatae magni impedit error fuga.</p>
                                </div>
                                <div className="notifications">
                                    <div className="d_flexSpacebetween">
                                        <p className="prod_name">lorem ipsum dollar set</p>
                                        <p className="price"><small>2 hrs ago</small></p>
                                    </div>
                                    <p className="prodDesc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, dolores blanditiis tenetur aliquam ab nemo. Beatae magni impedit error fuga.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Notification