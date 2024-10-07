import { Link } from 'react-router-dom';

const CampgroundsList = ({ campgrounds }) => {
    return (
        <div>
            {campgrounds.map(campground => (
                <div className="row" key={campground._id}> {/* Assuming campground._id is a unique identifier */}
                    <div className="col-md-4">
                        {campground.images.length ? (
                            <img className="img-fluid" alt={campground.title} src={campground.images[0].url} />
                        ) : (
                            <img className="img-fluid" alt="No image available" src="" /> 
                        )}
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                {campground.title}
                            </h5>
                            <p className="card-text">{campground.description}</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    {campground.location}
                                </small>
                            </p>
                            <Link to= {`/campgrounds/${campground._id}`}
                                    // {/* pass a campground to this link */}
                                    className="btn btn-primary"> 
                                View
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default CampgroundsList;