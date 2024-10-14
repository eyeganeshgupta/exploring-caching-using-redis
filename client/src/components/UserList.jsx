import PropTypes from "prop-types";
import { useState } from "react";

const UserCard = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className="col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`card h-100 border-0 shadow-lg transition-all duration-300 ${
          isHovered ? "transform -translate-y-2" : ""
        }`}
        style={{
          background: `linear-gradient(45deg, ${randomColor}, white)`,
        }}
      >
        <div className="card-body d-flex flex-column p-4">
          <div className="d-flex align-items-center mb-3">
            <div
              className="rounded-circle p-3 me-3 text-white font-weight-bold"
              style={{
                background: randomColor,
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {user.fullName
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </div>
            <h5 className="card-title m-0 text-dark">{user.fullName}</h5>
          </div>
          <p className="card-text text-muted mb-3">{"User"}</p>
          <div className="mt-auto">
            <a
              href={`mailto:${user.email}`}
              className={`btn btn-lg btn-block w-100 transition-all duration-300 ${
                isHovered ? "btn-dark" : "btn-outline-dark"
              }`}
            >
              <i className="fas fa-envelope me-2"></i>
              {user.email}
            </a>
          </div>
        </div>
        {isHovered && (
          <div className="position-absolute top-0 end-0 m-2">
            <i className="fas fa-star text-warning fa-2x fa-beat"></i>
          </div>
        )}
      </div>
    </div>
  );
};

const UserList = ({ users }) => (
  <div className="container my-5">
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
      {users && users.map((user) => <UserCard key={user.email} user={user} />)}
    </div>
  </div>
);

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserList;
