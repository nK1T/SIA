
import React from 'react'
import { PacmanLoader, SyncLoader } from "react-spinners";

const Loader = ({height}) => {
    return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: height,
          }}
        >
          <SyncLoader color="#892cdc" />
        </div>
      );
}

export default Loader;
