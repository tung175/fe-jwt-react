import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "./Users.scss";
import { createNewUser, fetchGroup, updateCurrentUser } from "../../services/userService";
import _ from "lodash";
const ModalUser = (props) => {
  const { show, onHide, actions, dataModalUser } = props;

  const defaultUserData = {
    email: "",
    phone: "",
    password: "",
    username: "",
    address: "",
    sex: "",
    group: "",
  };

  const validInputDefault = {
    email: true,
    phone: true,
    password: true,
    username: true,
    address: true,
    sex: true,
    group: true,
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [validInputs, setValidInputs] = useState(validInputDefault);

  const [userGroup, setUserGroup] = useState([]);

  useEffect(() => {
    getGroup();
  }, []);

  useEffect(() => {
    if (actions === "UPDATE") {
      setUserData({
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
    }
    console.log(444, userData);
  }, [dataModalUser]);

  useEffect(() => {
    if (actions === "CREATE") {
      if (userGroup && userGroup.length > 0) {
        setUserData({ ...userData, group: userGroup[0].id });
      }
    }
  }, [actions]);

  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && res.data && res.data.EC === 0) {
      setUserGroup(res.data.DT);
      toast.success(res.data.EM);
      if (res.data.DT && res.data.DT.length > 0) {
        let groups = res.data.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.data.EM);
    }
  };

  const handleOnchangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const validateInputs = () => {
    if (actions === "UPDATE") {
      return true;
    }
    setValidInputs(validInputDefault);

    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);

        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleConfirmUser = async () => {
    let check = validateInputs();
    if (check === true) {
      let res =
        actions === "CREATE"
          ? await createNewUser({
              ...userData,
              groupId: userData["group"],
            })
          : await updateCurrentUser({
              ...userData,
              groupId: userData["group"],
            });
      if (res && res.data && res.data.EC === 0) {
        onHide();
        setUserData({ ...defaultUserData, group: userGroup && userGroup.length > 0 ? userGroup[0].id  : ''});
      } else {
        toast.error(res.data.EM);
        let _validInputs = _.cloneDeep(validInputDefault);
        _validInputs[res.data.DT] = false;
        setValidInputs(_validInputs);
      }
    }
  };

  const handleCloseModalUser = () => {
    onHide();
    setUserData(defaultUserData);
    setValidInputs(validInputDefault);
  };

  console.log(5555, userData);
  return (
    <>
      <Modal
        size="lg"
        className="modal-user"
        show={show}
        onHide={() => handleCloseModalUser()}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              {actions === "CREATE" ? "Create new user" : "Edit a user"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email ( <span className="red">*</span> ) :
              </label>
              <input
                disabled={actions === "CREATE" ? false : true}
                className={
                  validInputs.email ? "form-control" : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "email")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red">*</span>) :
              </label>
              <input
                disabled={actions === "CREATE" ? false : true}
                value={userData.phone}
                className={
                  validInputs.phone ? "form-control" : "form-control is-invalid"
                }
                type="text"
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "phone")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Username (<span className="red">*</span>) :
              </label>
              <input
                value={userData.username}
                className={
                  validInputs.username
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "username")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              {actions === "CREATE" && (
                <>
                  <label>
                    Password (<span className="red">*</span>) :
                  </label>
                  <input
                    className={
                      validInputs.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    type="password"
                    onChange={(event) =>
                      handleOnchangeInput(event.target.value, "password")
                    }
                  />
                </>
              )}
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>
                Address (<span className="red">*</span>) :
              </label>
              <input
                value={userData.address}
                className={
                  validInputs.address
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "address")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Gender: (<span className="red">*</span>) :
              </label>
              <select
                value={userData.sex}
                className={
                  validInputs.sex ? "form-select" : "form-select is-invalid"
                }
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "sex")
                }
              >
                <option defaultValue="Male">Male</option>
                <option value="Male">Female</option>
                <option value="Male">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group (<span className="red">*</span>) :
              </label>
              <select
                value={userData.group}
                className={
                  validInputs.group ? "form-select" : "form-select is-invalid"
                }
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "group")
                }
              >
                {userGroup &&
                  userGroup.length > 0 &&
                  userGroup.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalUser()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            {actions === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
