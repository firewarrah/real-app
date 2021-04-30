import { Link } from "react-router-dom";

const Card = ({
  card: { _id, bizName, bizDescription, bizAddress, bizPhone, bizImage },
}) => {
  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card">
        <img className="p-2" src={bizImage} height="175px" alt={bizName} />
        <div className="card-body">
          <h5 className="card-title">{bizName}</h5>
          <p className="card-text">{bizDescription}</p>

          <p className="card-text border-top pt-2">
            <a href={"Tel:" + bizPhone}>{bizPhone} </a>
          </p>
          <address className="card-text">{bizAddress}</address>
          <div className="border-top pt-2"></div>
          <Link to={`/my-cards/edit/${_id}`}>Edit</Link>
          <Link className="text-danger ml-4" to={`/my-cards/delete/${_id}`}>
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
