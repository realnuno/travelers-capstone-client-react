import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { deletePost } from "../actions/fetch-data";
import {GOOGLE_MAP_API} from '../config'

class List extends Component {
    constructor(props) {
        super(props);
		
        this.clickControl = this.clickControl.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    };


    clickControl(e){
        e.stopPropagation();
        return false
    }


    onDeleteClick(e) {

        const { id } = this.props;
		this.props.deletePost(id);
		window.location.reload();
		this.props.history.push("/mylist");
		window.scrollTo(0, 0)
    }


    render() {

        const lat = Number(this.props.lat);
        const lng = Number(this.props.lng);

//    ================= GoogleMap =====================

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap defaultZoom={14} defaultCenter={{ lat, lng }} >
            <Marker position={{ lat, lng }} />
            </GoogleMap>
        ));

//    ==================================================


        return(
            <div className="row displayMylist">
                    <div className="col-12">
                        <h2 id="mylist-venue-name">{this.props.venueName}</h2>
                    </div>
                    <div className="col-6 outer-detail-photo-map-section">
                        <div className="detail-photo-map-section">
                            <img alt={this.props.venueName} src={this.props.photo1} height="400" width="400" />
                            <img alt={this.props.venueName} src={this.props.photo2} height="400" width="400" />
                            <MapWithAMarker
                          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API}&v=3.exp&libraries=geometry,drawing,places`}
                          loadingElement={<div style={{ height: `100%` }} />}
                          containerElement={<div style={{ height: `400px` }} />}
                          mapElement={<div style={{ height: `100%` }} />}
                    />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="information-section">
                            <p className='added-time'>{this.props.creationDate}</p>
                            <p className='result-category'>category : <span className='what-place'>{this.props.category}</span></p>
                            <p className='result-description'>description : {this.props.description}</p>
                            <p className='result-phone-number'>phone : {this.props.phoneNumber}</p>
                            <p className='result-website'>website : {this.props.website}</p>
                            <p className='result-address'>address : {this.props.address}</p>
                            <p className='result-memo'>note : <span className='memo-display'>{this.props.memo}</span></p>
                        </div>
                    </div>
                    <div className="col-12 mylist-buttons">
                        <Link to={`/edit-item/${this.props.id}`}>
                            <button onClick={this.clickControl.bind(this)} id="edit-button" className="button edit-button" >edit note</button>
                        </Link>
                        <br/>
						
                        <button onClick={this.onDeleteClick} id="delete-button" className="button delete-button" >delete</button>
						
                    </div>
                </div>
        )
    };
}

export default withRouter(connect(null, { deletePost })(List));

