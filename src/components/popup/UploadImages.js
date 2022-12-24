import React, { useState } from "react";
import { RMIUploader } from "react-multiple-image-uploader";

const UploadImages = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    console.log("Upload files", data);
    setData(data);
  };
  const onSelect = (data) => {
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
  };

  return (
    <div>
      <RMIUploader
        isOpen={visible}
        hideModal={hideModal}
        onSelect={onSelect}
        onUpload={onUpload}
        onRemove={onRemove}
        dataSources={data}
      />
    </div>
  );
};

export default UploadImages;
