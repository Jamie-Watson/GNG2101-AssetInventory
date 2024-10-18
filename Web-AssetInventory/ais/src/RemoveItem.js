import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';

export default function RemoveItem(){
    return(<div className="row">
        <div className="col-lg-6 px-5 pb-5 align-items-center">
            <div className="container searchBox d-flex px-5 align-items-center justify-content-center" style={{flexDirection:"column"}}>
                <div className="row pt-4 w-100">
                    <h6 className="display-6 text-center removeItemLabel">
                        <strong>You are Removing an Asset</strong>
                    </h6>
                </div>
                <div className="row pt-2 w-100">
                    <div className="col-12 mb-2"> 
                        <p className="mb-0">
                            Asset Name: 
                            <input
                                type="text"
                                className="form-control d-inline-block"
                                placeholder='Enter Asset To Be Removed'
                            />        
                        </p>
                    </div>
                    <div className="col-12 mb-2"> 
                        <p className="mb-0">
                            Asset Item Code: 
                            <input
                                type="text"
                                className="form-control d-inline-block"
                                placeholder='Enter Asset Code'
                            />        
                        </p>
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary lightBlueButton my-3" href="#" >Confirm</button>
                </div>
            </div>
        </div>


    </div>)
}