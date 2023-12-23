import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `9456318716f4b4d9c435`,
            pinata_secret_api_key: `
            c10ea2edc4434af04de09a95bfafed797140d11b1317cccf341dbacf2b06f71d`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        //const signer = contract.connect(provider.getSigner());
        contract.add(account, ImgHash);
        alert("Successfully added the image file");
        setFileName("No image uploaded");
        setFile(null);
      } catch (e) {
        alert("Unable to upload the image file to pinata");
      }
    }
    alert("Successfully uploaded the image file to pinata");
    setFileName("No Image selected");
    setFile(null);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of the image files object
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    //after the entire file has been read by the system
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
