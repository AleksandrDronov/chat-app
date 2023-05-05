import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import Dropzone from "react-dropzone";

const MessageFormUI = ({
  setAttachment,
  message,
  handleChange,
  handleSubmit,
}) => {
  const [preview, setPreview] = useState("");

  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            className="message-form-preview-image"
            src={preview}
            alt="message-form-preview"
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment("");
            }}
          />
        </div>
      )}
      <form
        className="message-form"
        onSubmit={(e) => {
          e.preventDefault();
          setPreview("");
          handleSubmit();
        }}
      >
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            value={message}
            type="text"
            onChange={handleChange}
            placeholder="Send a message..."
          />
        </div>
        <div className="message-form-icons">
          <Dropzone
            accept={{
              "image/png": [],
              "image/jpeg": [],
            }}
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>
          <hr className="vertical-line" />
          <button
            type="submit"
            style={{ backgroundColor: "#051926", border: "none" }}
          >
            <PaperAirplaneIcon className="message-form-icon-airplane" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageFormUI;
