import { useHistory } from "react-router-dom";
import "./Users.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteUser,
  fetchAllUser,
  fetchAllUserWithPaginate,
} from "../../services/userService";
import ReactPaginate from "react-paginate";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

const Users = () => {
  const [listUsers, setListUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  //modal delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  //modal update/create
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("CREATE");
  const [dataModalUser, setDataModalUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    // let res = await fetchAllUser(currentPage, currentLimit);
    let res = await fetchAllUserWithPaginate(currentPage, currentLimit);

    if (res && res.data && res.data.EC === 0) {
      setTotalPages(res.data.DT.totalPages);
      setListUsers(res.data.DT.users);
      toast.success(res.data.EM);
    } else {
      toast.error(res.data.EM);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };

  const handleDeleteUser = async (user) => {
    setDataModal(user);
    console.log(333, dataModal);
    setIsShowModalDelete(true);
  };

  const handleConfirmDelete = async () => {
    let res = await deleteUser(dataModal);
    if (res && res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      await fetchUsers();
      setIsShowModalDelete(false);
    } else {
      toast.error(res.data.EM);
    }
  };

  const onHideModalUser = async () => {
    setIsShowModalUser(false);
    setDataModalUser({});
    await fetchUsers();
  };

  const handleEditUser = async (user) => {
    setDataModalUser(user);
    setActionModalUser("UPDATE");
    setIsShowModalUser(true);
  };

  const handleRefresh = async () => {
    await fetchUsers();
  };

  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title mt-3">
              <h3>Manage Users</h3>
            </div>
            <div className="actions my-3">
              <button
                className="btn btn-success refresh"
                onClick={() => handleRefresh()}
              >
                <i className="fa fa-refresh"></i>Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModalUser(true);
                  setActionModalUser("CREATE");
                }}
              >
                <i className="fa fa-plus-circle"></i>
                Add new user
              </button>
            </div>
          </div>
          <div className="user-body">
            <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Group</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>
                            <span
                              title="Edit"
                              className="edit"
                              onClick={() => handleEditUser(item)}
                            >
                              <i className="fa fa-pencil"></i>
                              
                            </span>
                            <span
                            title="Delete"
                              className="delete"
                              onClick={() => handleDeleteUser(item)}
                            >
                              <i className="fa fa-trash-o"></i>
                              
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Not found users</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={4}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={handleConfirmDelete}
        dataModal={dataModal}
      />
      <ModalUser
        onHide={onHideModalUser}
        show={isShowModalUser}
        actions={actionModalUser}
        dataModalUser={dataModalUser}
      />
    </>
  );
};

export default Users;
