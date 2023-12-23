import { useEffect } from "react";
import "./Modal.css";

const Modal = (setModalOpen, contract) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const optoins = addressList;

      for (let i = 0; i < optoins.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, []);
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">
            <div className="body">
              <input
                type="text"
                className="address"
                placeholder="Enter Address"
              ></input>
            </div>
            <form id="myForm">
              <select id="selectNumber">
                <option className="address">People with access</option>
              </select>
            </form>
            <div className="footer">
              <button onClick={setModalOpen(false)} id="cancelBtn">
                Cancel
              </button>
              <button onClick={() => sharing()}>Share</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
