import icons from "../assets/icons/icons";
import { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";

import {
  Barcode,
  Box,
  Box1,
  Category,
  Cd,
  FormatSquare,
  Grid8,
  Hashtag,
  HashtagSquare,
  Health,
  Notepad2,
  Scan,
} from "iconsax-react";

import Stepper from "@keyvaluesystems/react-vertical-stepper";

import GraphicHistory from "../partials/paletization/GraphicHistory";

import useScanDetection from "use-scan-detection";

import { useSelector, useDispatch } from "react-redux";

import {
  selectOrderSelected,
  metadataOrderSelected,
} from "../store/slice/orderSelectedSlice";

import { selectEventsLog, addEvent } from "../store/slice/eventsLogSlice";
import {
  getTestResults,
  selectTestResults,
  selectGlobalStatus,
} from "../store/slice/testResultSlice";
import LabelPrinting from "../partials/genealogy/LabelPrinting";

function PaletizationView() {
  const testResultsList = useSelector(selectTestResults);
  const globalStatus = useSelector(selectGlobalStatus);
  const orderSelected = useSelector(selectOrderSelected);
  const metadata = useSelector(metadataOrderSelected);
  const eventsLog = useSelector(selectEventsLog);

  const [barcodeProduct, setBarcodeProduct] = useState("Escanea un código");

  const [treeData, setTreeData] = useState([]);

  const dispatch = useDispatch();

  const labelRef = useRef();

  useScanDetection({
    onComplete: (code) => {
      console.log(code);
      const codeScannedEvent = {
        text: "Producto escaneado: " + code.replace(/Shift/g, ""),
        timestamp: new Date().toISOString(),
      };
      setBarcodeProduct(code.replace(/Shift/g, ""));
      dispatch(addEvent(codeScannedEvent));
      dispatch(getTestResults(code.replace(/Shift/g, "")));

      const getTestResultsEvent = {
        text:
          "Consultando resultados de prueba de producto: " +
          code.replace(/Shift/g, ""),
        timestamp: new Date().toISOString(),
      };

      dispatch(addEvent(getTestResultsEvent));
    },
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  var stepsArray = [
    {
      label: "Prueba eléctrica",
      description: "Aprobada, sin errores, finalizada hace 14 minutos.",
      status: "visited",
    },
    {
      label: "Prueba de vacío",
      description: "En proceso, iniciada el 9/05/2023 a las 12:30 PM.",
      status: "unvisited",
    },
  ];

  function formatTimestampToDDMMYYYYHHMMSS(timestamp) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  const stylesOverride = {
    LabelTitle: (step, stepIndex) => ({ marginLeft: "8px", fontSize: 15 }),
    ActiveLabelTitle: (step, stepIndex) => ({
      marginLeft: "0px",
      fontSize: 15,
    }),
    LabelDescription: (step, stepIndex) => ({
      marginLeft: "8px",
      fontSize: 13,
    }),
    ActiveLabelDescription: (step, stepIndex) => ({
      marginLeft: "0px",
      fontSize: 13,
    }),
    LineSeparator: (step, stepIndex) => ({ borderRight: "2px solid #dfdff2" }),
    InactiveLineSeparator: (step, stepIndex) => ({
      borderRight: "2px solid #dfdff2",
    }),
    Bubble: (step, stepIndex) => (
      console.log(stepIndex === currentStepIndex),
      console.log(step.status),
      {
        width: "40px",
        height: "40px",
        backgroundColor: step.status === "skipped" ? "red" : "#15B053",
        color: "#fff",
      }
    ),
    ActiveBubble: (step, stepIndex) => ({
      width: "40px",
      height: "40px",
      backgroundColor: step.status === "skipped" ? "red" : "#15B053",
      color: "#fff",
      background: "#15B053",
      border:
        step.status === "skipped" ? "7px solid #ee9090" : "7px solid #A1DFBA",
    }),
    InActiveBubble: (step, stepIndex) => ({
      width: "40px",
      height: "40px",
      backgroundColor: "#F0F1F3",
      color: "#000000",
    }),
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     localStorage.removeItem("b-gantt-trial-start");
  //     window.location.reload();
  //   }, 60000);

  // }, []);

  function buildTreeData(obj) {
    if (typeof obj === "undefined" || Object.keys(obj).length === 0) {
      console.log("Boom undefined");
      return [];
    } else {
      const treeData = [];
      const mainMatnr = obj.matnr.slice(-9); // Obtener los últimos 9 caracteres de matnr

      const parentNode = {
        id: 1,
        label: mainMatnr,
        children: [],
      };

      const childNode = {
        id: 2,
        label: obj.components[0]?.matnr ?? "",
      };

      parentNode.children.push(childNode);
      treeData.push(parentNode);

      return treeData;
    }
  }

  const [expandedNodes, setExpandedNodes] = useState([]);

  const toggleNode = (nodeId) => {
    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(expandedNodes.filter((id) => id !== nodeId));
    } else {
      setExpandedNodes([...expandedNodes, nodeId]);
    }
  };

  const renderNode = (node) => {
    const isNodeExpanded = expandedNodes.includes(node.id);
    const hasChildNodes = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="tree-node">
        <div
          className={`tree-node__label ${
            hasChildNodes ? "tree-node__label--clickable" : ""
          }`}
          onClick={() => hasChildNodes && toggleNode(node.id)}
        >
          {hasChildNodes && (
            <span
              className={`tree-node__icon ${
                isNodeExpanded
                  ? "tree-node__icon--expanded"
                  : "tree-node__icon--collapsed"
              }`}
            ></span>
          )}
          {node.label}
        </div>
        {isNodeExpanded && hasChildNodes && (
          <div className="tree-node__children">
            {node.children.map((childNode) => renderNode(childNode))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">
        <div className="max-w-full mx-4 py-0 sm:mx-auto sm:px-6 lg:px-4">
          <header>
            <div className="mt-8">
              <div className="flex items-center justify-between h-16 -mb-px">
                <h3 className="text-black text-2xl capitalize font-semibold text-gray-400 tracking-tight">
                  Paletización
                </h3>
                {/* Header: Right side */}
                <div className="flex items-center space-x-3">
                  <button className="border border-slate-300 rounded w-64 h-12 text-base flex justify-center font-semibold mr-2">
                    <span className="my-auto text-black font-semibold">
                      Re-procesamiento
                    </span>
                  </button>

                  <button
                    onClick={(e) => {}}
                    className="w-64 h-12 bg-primary rounded text-white text-base flex justify-center hover:bg-green-500"
                    // disabled={notFound || orders?.length === 0 ? true : false}
                  >
                    <span className="bg-transparent my-auto text-white font-semibold hover:bg-green-500">
                      Listar
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </header>
          <div className="max-w-full mx-4 py-0 sm:mx-auto">
            <div className="sm:flex sm:space-x-4">
              <section className="inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/4 sm:my-4">
                <div className="bg-white p-5">
                  <div className="sm:flex sm:items-start bg-white">
                    <div className="bg-white text-center sm:mt-0 sm:ml-2 sm:text-left">
                      <div className="flex items-center">
                        <Grid8 className="mr-2" color="#A0A2A6" size={20} />
                        <h3 className="bg-white text-md font-medium text-gray">
                          Pallet
                        </h3>
                      </div>

                      <p className="bg-white text-3xl font-bold text-black">
                        PAL3220400
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/4 sm:my-4">
                <div className="bg-white p-5">
                  <div className="sm:flex sm:items-start bg-white">
                    <div className="bg-white text-center sm:mt-0 sm:ml-2 sm:text-left">
                      <div className="flex items-center">
                        <Category className="mr-2" color="#A0A2A6" size={20} />
                        <h3 className="bg-white text-md font-medium text-gray">
                          Número serial actual
                        </h3>
                      </div>

                      <p className="bg-white text-3xl font-bold text-black">
                        {Object.keys(orderSelected).length === 0
                          ? "--------"
                          : barcodeProduct}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/4 sm:my-4">
                <div className="bg-white p-5">
                  <div className="sm:flex sm:items-start bg-white">
                    <div className="bg-white text-center sm:mt-0 sm:ml-2 sm:text-left">
                      <div className="flex items-center">
                        <HashtagSquare
                          variant="Outline"
                          className="mr-2"
                          color="#A0A2A6"
                          size={20}
                        />
                        <h3 className="bg-white text-md font-medium text-gray">
                          Cantidad pallet
                        </h3>
                      </div>

                      <p className="bg-white text-3xl font-bold text-black">
                        {Array.isArray(metadata) && metadata.length > 0
                          ? metadata.find(
                              (obj) => obj.ID_CARACTMATERIAL === 185
                            )?.DE_VALORCARACTMAT
                          : "Selecciona órden"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/4 sm:my-4">
                <div className="bg-white p-5">
                  <div className="sm:flex sm:items-start bg-white">
                    <div className="bg-white text-center sm:mt-0 sm:ml-2 sm:text-left">
                      <div className="flex items-center">
                        <Health className="mr-2" color="#A0A2A6" size={20} />
                        <h3 className="bg-white text-md font-medium text-gray">
                          Planeado vs realizado
                        </h3>
                      </div>

                      <p className="bg-white text-3xl font-bold text-black">
                        1 de 2
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="sm:flex sm:space-x-4">
              <div
                className="flex flex-col w-1/4"
                style={{ paddingRight: "7px" }}
              >
                <section className="inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:my-4">
                  <div className="bg-white p-5">
                    <div className="sm:flex sm:items-start bg-white">
                      <div className="bg-white text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <div className="flex items-center">
                          <Notepad2
                            className="mr-2"
                            color="#A0A2A6"
                            size={20}
                          />
                          <h3 className="bg-white text-md font-medium text-gray">
                            Órden
                          </h3>
                        </div>
                        <p className="bg-white text-3xl font-bold text-black">
                          {Object.keys(orderSelected).length === 0
                            ? "Selecciona órden"
                            : orderSelected.aufnr}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:my-4">
                  <div className="bg-white p-5">
                    <div className="sm:flex sm:items-start bg-white">
                      <div className="bg-white text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <div className="flex items-center">
                          <Box1
                            variant="Outline"
                            className="mr-2"
                            color="#A0A2A6"
                            size={20}
                          />
                          <h3 className="bg-white text-md font-medium text-gray">
                            Producto
                          </h3>
                        </div>
                        <p className="bg-white text-3xl font-bold text-black">
                          {Object.keys(orderSelected).length === 0
                            ? "--------"
                            : orderSelected.matnr.slice(-9)}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <section className="inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:my-4 w-3/4">
                <div className="bg-white p-5">
                  <h3 className="bg-white text-md font-medium text-gray">
                    Historial
                  </h3>
                  <div
                    className="flex grid justify-start"
                    style={{ marginLeft: "-10px" }}
                  >
                    <GraphicHistory />
                    <div></div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <hr class="solid" />
        <div className="mt-8 flex">
        <h3 className="text-black text-2xl capitalize font-semibold text-gray-400 tracking-tight">
                  Información adicional
                </h3>
        </div>
          

          
          <div className="sm:flex sm:space-x-4 mt-4">
            <section
              style={{ height: "245px", overflowY: "scroll" }}
              className="inline-block align-bottom rounded-lg border border-slate-200 text-left mb-4 w-full sm:w-1/3 sm:my-4"
            >
              <div className="bg-white p-5">
                <h3 className="bg-white text-md font-medium text-gray">
                  Log de eventos
                </h3>
                <div
                  className="bg-white text-sm text-black"
                  style={{ maxHeight: "450px", overflowY: "auto" }}
                >
                  {eventsLog
                    .slice()
                    .reverse()
                    .map((event, index) => (
                      <p key={index}>
                        {" "}
                        <span style={{ color: "green" }}>
                          {formatTimestampToDDMMYYYYHHMMSS(event.timestamp)}
                        </span>{" "}
                        - {event.text}{" "}
                      </p>
                    ))}
                </div>
              </div>
            </section>

            <section className="inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/3 sm:my-4">
              <div className="bg-white p-5">
                <h3 className="bg-white text-md font-medium text-gray">
                  Semáforo
                </h3>
                <h3 className="bg-white text-2xl font-semibold text-black">
                  {testResultsList && testResultsList.length > 0 ? (
                    <div>
                      Estado global:{" "}
                      <span
                        className={
                          globalStatus === 1 ? "text-primary" : "text-red-500"
                        }
                      >
                        {globalStatus === 1 ? "OK" : "Error"}
                      </span>
                      {/* Muestra los detalles de los resultados de prueba aquí si es necesario */}
                    </div>
                  ) : (
                    <p className="text-black">
                      Resultados de pruebas no disponibles.
                    </p>
                  )}
                </h3>
                <div
                  className="flex grid justify-start"
                  style={{ marginLeft: "-10px", marginTop: "10px" }}
                >
                  {testResultsList && testResultsList.length > 0 ? (
                    <div>
                      <Stepper
                        className="!ml-0"
                        steps={testResultsList}
                        currentStepIndex={2}
                        styles={stylesOverride}
                      />

                      {/* Muestra los detalles de los resultados de prueba aquí si es necesario */}
                    </div>
                  ) : (
                    <p className="text-black ml-3"></p>
                  )}
                  <div></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaletizationView;
