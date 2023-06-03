import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import Nav from "./components/Nav";
import { useEffect } from "react";
import { useState } from "react";
import image from "./storage.gif";
import { useStorageUpload } from "@thirdweb-dev/react";
import { Spinner } from "react-bootstrap";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useContractWrite } from "@thirdweb-dev/react";
import Footer from "./components/Footer";
export default function Home() {
  const iconForOthers =
    "ipfs://QmQyCjuizVxVeyvMrdc8zF9KKoMhtxxDhw3duFm4m5zE9P/4380884.png";
  const iconForZip =
    "ipfs://QmTvvWWDs1cGm8E1vLNL7reK4fBSzDnppBDrdpsYtjvukV/unnamed.png";

  const iconForExe =
    "ipfs://Qmf1c3kUjsy7Fjt16JgUbfPGM7RrfbGBsSZpFijw21MSLZ/exe-file.jpg";

  const iconForPdf =
    "ipfs://QmTFZ5YYDpLWSjAQTj5riXuqbfHyt1TSk7U879MB5CJ9uD/337946.png";

  const iconForAudio =
    "ipfs://QmTFZ5YYDpLWSjAQTj5riXuqbfHyt1TSk7U879MB5CJ9uD/337946.png";

  const {
    mutateAsync: upload,
    isLoading,
    isSuccess,
    isError,
  } = useStorageUpload();
  const [files, setFiles] = useState("");
  const [fileToUpload, setFileToUpload] = useState("");
  const [cidd, setCid] = useState("");
  const address = useAddress();
  const { contract } = useContract(
    "0x2f8d69a858BEf8528AcF91a08ad22AEC0879c3D4",

    [
      {
        inputs: [
          {
            internalType: "string",
            name: "_file",
            type: "string",
          },
          {
            internalType: "address",
            name: "_addr",
            type: "address",
          },
        ],
        name: "setter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_addr",
            type: "address",
          },
        ],
        name: "getter",
        outputs: [
          {
            internalType: "string[]",
            name: "",
            type: "string[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ]
  );
  const { data, loading, error } = useContractRead(contract, "getter", [
    address,
  ]);
  const getFiles = async () => {
    setFiles(data);
    console.log(files);
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileToUpload(file);
  };

  const { mutateAsync: deploy, isLoading: isDeploying } = useContractWrite(
    contract,
    "setter"
  );

  async function handleDeploy() {
    const filee = fileToUpload;
    const cid = await upload({
      data: [filee],
    })
      .catch((err) => {
        console.log(err);
      })
      .then(async (res) => {
        console.log(res);
        console.log(res.toString());
        setCid(res.toString());
        await deploy({ args: [res.toString(), address] }).then((res) => {
          setCid("");
          setSelectedFile(null);
          setFileToUpload("");
          window.location.reload();
        });
      });

    // console.log(cid.toString());
    // setCid(cid.toString());
    // if it is is success then we will deploy the contract
  }
  useEffect(() => {
    getFiles();
  }, [data]);
  return (
    <div>
      <Nav />
      {/* header which says Welcome to PolyCloud in react bootstrap */}
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Welcome to PolyCloud</h1>
          </div>
          <div className="col-md-12">
            <h6 className="text-center text-primary">
              PolyCloud is a decentralized cloud storage platform built on the
              Polygon blockchain. It allows users to upload files to the IPFS
              and retrieve them later. The best part is, it's free!
            </h6>
          </div>
        </div>
      </div>
      {/* HUGE upload file image which has hovering and when I click that image,it opens computer to select files */}
      <div className="container mt-2" id="upload">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <img
                src={image}
                className="card-img-top"
                alt="..."
                height={250}
                width={50}
              />

              {!isLoading && (
                <div className="card-body text-center align-center">
                  <h5 className="card-title">Upload your files</h5>
                  <p className="card-text">
                    Click the image to upload your files to the IPFS.
                  </p>
                  <input
                    type="file"
                    id="file-input"
                    onChange={address ? handleFileChange : null}
                    style={{ display: "none" }}
                  />
                  <label
                    className="btn btn-primary"
                    htmlFor="file-input"
                    onClick={() => {
                      if (!address) {
                        alert(
                          "Please connect your wallet first to upload files"
                        );
                        window.location.reload();
                      }
                    }}
                  >
                    Upload
                  </label>
                  <span className="text-muted"> {fileToUpload.name}</span>
                  {/* save button ONLY when file is selected else not shown with red background ALSO AT THE CENTER LIKE UPLOAD BUTTON*/}
                  {fileToUpload && (
                    <div className="mt-2">
                      <button
                        className="btn btn-success"
                        onClick={handleDeploy}
                      >
                        Save to PolyCloud
                      </button>
                    </div>
                  )}
                </div>
              )}
              {isLoading && (
                <div className="card-body text-center align-center">
                  <h3 className="card-title">Uploading Please Wait...</h3>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* a div flex direction column, card which is responsive also */}
      <div className="container mt-2">
        <div className="row">
          {files &&
            files.map((s) => (
              <div className="col-md-4 col-xl-3 text-center align-center col-xs-12 ">
                <div className="card">
                  <a href={s} download>
                    <MediaRenderer
                      src={
                        s.slice(-3) === "png" ||
                        s.slice(-3) === "jpg" ||
                        s.slice(-4) === "jpeg" ||
                        s.slice(-3) === "gif" ||
                        s.slice(-3) === "svg"
                          ? s
                          : //  write all docs type
                          s.slice(-3) === "pdf" ||
                            s.slice(-4) === "docx" ||
                            s.slice(-4) === "pptx" ||
                            s.slice(-4) === "xlsx" ||
                            s.slice(-3) === "txt"
                          ? iconForPdf
                          : s.slice(-3) === "mp4" ||
                            s.slice(-3) === "avi" ||
                            s.slice(-3) === "mov" ||
                            s.slice(-3) === "wmv" ||
                            s.slice(-3) === "mkv"
                          ? s
                          : s.slice(-3) === "mp3" ||
                            s.slice(-3) === "wav" ||
                            s.slice(-3) === "flac" ||
                            s.slice(-3) === "aac" ||
                            s.slice(-3) === "ogg"
                          ? s
                          : s.slice(-3) === "zip" || s.slice(-3) === "rar"
                          ? iconForZip
                          : s.slice(-3) === "exe" ||
                            s.slice(-3) === "dmg" ||
                            s.slice(-3) === "app" ||
                            s.slice(-3) === "deb" ||
                            s.slice(-3) === "rpm"
                          ? iconForExe
                          : iconForOthers
                      }
                    />
                    {/* remove % from the name if any, print entire name after the last / and remove % if any and limit the length to 10 characters */}
                    <div>
                      {
                        s.length > 20
                          ? s
                              .slice(s.lastIndexOf("/") + 1) // get the last part of the url
                              .replace(/%20/g, " ") // replace %20 with space
                              .slice(0, 20) // limit to 10 characters
                          : s.slice(s.lastIndexOf("/") + 1) // get the last part of the url
                      }
                    </div>
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
      {files ? (
        <div className="">
          <Footer />
        </div>
      ) : (
        <div className="fixed-bottom">
          <Footer />
        </div>
      )}
    </div>
  );
}
