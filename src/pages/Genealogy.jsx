import icons from "../assets/icons/icons";
import { useEffect, useState} from "react";

import {Barcode, Box, Box1, Category, Cd, FormatSquare, Grid8, Hashtag, HashtagSquare, Health, Notepad2, Scan} from 'iconsax-react';

import Stepper from '@keyvaluesystems/react-vertical-stepper';

import GraphicHistory from "../partials/paletization/GraphicHistory";

function GenealogyDashboard() {

    const [currentStepIndex, setCurrentStepIndex] = useState(1);

    var stepsArray = [{
        label: 'Prueba eléctrica',
        description: 'Aprobada, sin errores, finalizada hace 14 minutos.',
        status: 'visited'
    },{
        label: 'Prueba de vacío',
        description: 'En proceso, iniciada el 9/05/2023 a las 12:30 PM.',
        status: 'visited'
    },{
        label: 'Inyección de nitrógeno',
        description: 'No iniciada',
        status: 'unvisited'
    }];

    const stylesOverride = {
        LabelTitle: (step, stepIndex) => ({marginLeft:"8px", fontSize:15}),
        ActiveLabelTitle: (step, stepIndex) => ({marginLeft:"0px", fontSize:15}),
        LabelDescription: (step, stepIndex) => ({marginLeft:"8px", fontSize:13}),
        ActiveLabelDescription: (step, stepIndex) => ({marginLeft:"0px", fontSize:13}),
        LineSeparator: (step, stepIndex) => ({borderRight:"2px solid #dfdff2"}),
        InactiveLineSeparator: (step, stepIndex) => ({borderRight:"2px solid #dfdff2"}),
        Bubble: (step, stepIndex) => ({width: "40px", height: "40px", backgroundColor: "#15B053", color: "#fff"}),
        ActiveBubble: (step, stepIndex) => ({width: "40px", height: "40px", backgroundColor: "#15B053",  color: "#fff" , background:"#15B053", border: "7px solid #A1DFBA"}),
        InActiveBubble: (step, stepIndex) => ({width: "40px", height: "40px", backgroundColor: "#F0F1F3", color: "#000000" }),
      };
  // useEffect(() => {
  //   setTimeout(() => {
  //     localStorage.removeItem("b-gantt-trial-start");
  //     window.location.reload();
  //   }, 60000);
   
  // }, []);

  const treeData = [
    {
      id: 1,
      label: '515300139',
      children: [
        {
          id: 2,
          label: '513301723Q',
          
        }
      ],
    },
    
  ];


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
          className={`tree-node__label ${hasChildNodes ? 'tree-node__label--clickable' : ''}`}
          onClick={() => hasChildNodes && toggleNode(node.id)}
        >
          {hasChildNodes && (
            <span className={`tree-node__icon ${isNodeExpanded ? 'tree-node__icon--expanded' : 'tree-node__icon--collapsed'}`}>
            </span>
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
    <div className='mt-6 px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto'>
    <header>
        <div className="sm:px-4 lg:px-4">
          <div className="flex items-center justify-between h-16 -mb-px">
              <h3 className="text-black text-2xl capitalize font-semibold text-gray-400 tracking-tight">
               Genealogía
              </h3>
            {/* Header: Right side */}
            <div className="flex items-center space-x-3">
            
                    <button className='border border-slate-300 rounded w-64 h-12 text-base flex justify-center font-semibold mr-2'>
                    <Scan className="mr-2 my-auto ml-4 bg-transparent" color="black" size={20} />
                    <span className='my-auto text-black font-semibold'>Escanear producto</span>
                    </button>

                    <button
                    onClick={(e) => {
                    }}
                    className='w-64 h-12 bg-primary rounded text-white text-base flex justify-center hover:bg-green-500'
                    // disabled={notFound || orders?.length === 0 ? true : false}
                  >
                    <Barcode className="mr-2 my-auto ml-4 bg-transparent" color="#ffff" size={20} />
                    <span className='bg-transparent my-auto text-white font-semibold hover:bg-green-500'>Imprimir etiqueta</span>
                  </button>
            
            </div>
          </div>
        </div>
      </header>

        <div className='max-w-full mx-4 py-0 sm:mx-auto sm:px-6 lg:px-4'>
            <div className='sm:flex sm:space-x-4'>
                <section className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/4 sm:my-4'>
                    <div className='bg-white p-5'>
                        <div className='sm:flex sm:items-start bg-white'>
                            <div className='bg-white text-center sm:mt-0 sm:ml-2 sm:text-left'>
                                <div className='flex items-center'>
                                    <Notepad2 className="mr-2" color="#A0A2A6" size={20} />
                                    <h3 className='bg-white text-md font-medium text-gray'>
                                    Órden
                                    </h3>
                                </div>
                               
                                <p className='bg-white text-3xl font-bold text-black'>
                                #100032345
                                </p>
                            </div>
                            </div>
                        </div>
                </section>

                <section className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/4 sm:my-4'>
                    <div className='bg-white p-5'>
                        <div className='sm:flex sm:items-start bg-white'>
                            <div className='bg-white text-center sm:mt-0 sm:ml-2 sm:text-left'>
                                <div className='flex items-center'>
                                    <Box1 variant="Outline" className="mr-2" color="#A0A2A6" size={20} />
                                    <h3 className='bg-white text-md font-medium text-gray'>
                                    Producto
                                    </h3>
                                </div>
                               
                                <p className='bg-white text-3xl font-bold text-black'>
                                #PROD-2223040
                                </p>
                            </div>
                            </div>
                        </div>
                </section>

                <section className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/4 sm:my-4'>
                    <div className='bg-white p-5'>
                        <div className='sm:flex sm:items-start bg-white'>
                            <div className='bg-white text-center sm:mt-0 sm:ml-2 sm:text-left'>
                                <div className='flex items-center'>
                                    <Cd className="mr-2" color="#A0A2A6" size={20} />
                                    <h3 className='bg-white text-md font-medium text-gray'>
                                    Componente
                                    </h3>
                                </div>
                               
                                <p className='bg-white text-3xl font-bold text-black'>
                                5312134-C3EFE
                                </p>
                            </div>
                            </div>
                        </div>
                </section>

                <section className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/4 sm:my-4'>
                    <div className='bg-white p-5'>
                        <div className='sm:flex sm:items-start bg-white'>
                            <div className='bg-white text-center sm:mt-0 sm:ml-2 sm:text-left'>
                                <div className='flex items-center'>
                                    <Category className="mr-2" color="#A0A2A6" size={20} />
                                    <h3 className='bg-white text-md font-medium text-gray'>
                                    Número de lote actual
                                    </h3>
                                </div>
                               
                                <p className='bg-white text-3xl font-bold text-black'>
                                3000
                                </p>
                            </div>
                            </div>
                        </div>
                </section>

                
            </div>
        </div>

        <div className='max-w-full mx-4 py-0 sm:mx-auto sm:px-6 lg:px-4'>
            <div className='sm:flex sm:space-x-4'>
                <section styles={{ height: '500px', overflowY: 'scroll', whitespace: 'nowrap' }} className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/3 sm:my-4'>
                    <div className='bg-white p-5'>
                    </div>
                </section>

                <section className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/3 sm:my-4'>
                    <div className='bg-white p-5'>
                        <h3 className='bg-white text-md font-medium text-gray'>
                        Semáforo
                        </h3>
                        <h3 className='bg-white text-2xl font-semibold text-black'>
                        Estado global: <span className='text-primary'>OK</span>
                        </h3>
                       <div className="flex grid justify-start" style={{marginLeft: "-10px"}}>
                       <Stepper
                            className='!ml-0'
                            steps={stepsArray}
                            currentStepIndex={currentStepIndex}
                            styles={stylesOverride}
                        />
                        <div></div>
                       </div>
                    </div>
                </section>

                <section className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/3 sm:my-4'>
                    <div className='bg-white p-5'>
                        <h3 className='bg-white text-md font-medium text-gray'>
                        Lista de materiales
                        </h3>
                        <div className="tree-view">
                            {treeData.map((node) => renderNode(node))}
                        </div>
                    </div>
                </section>
            </div>

            <hr class="solid"/>

        <header>
        <div className="mt-8">
          <div className="flex items-center justify-between h-16 -mb-px">
              <h3 className="text-black text-2xl capitalize font-semibold text-gray-400 tracking-tight">
               Paletización
              </h3>
            {/* Header: Right side */}
            <div className="flex items-center space-x-3">
            
                    <button className='border border-slate-300 rounded w-64 h-12 text-base flex justify-center font-semibold mr-2'>
                    <span className='my-auto text-black font-semibold'>Re-procesamiento</span>
                    </button>

                    <button
                    onClick={(e) => {
                    }}
                    className='w-64 h-12 bg-primary rounded text-white text-base flex justify-center hover:bg-green-500'
                    // disabled={notFound || orders?.length === 0 ? true : false}
                  >
                    <span className='bg-transparent my-auto text-white font-semibold hover:bg-green-500'>Listar</span>
                  </button>
            
            </div>
            </div>
            </div>
        </header>
        <div className='max-w-full mx-4 py-0 sm:mx-auto'>
            <div className='sm:flex sm:space-x-4'>
                <section className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/4 sm:my-4'>
                    <div className='bg-white p-5'>
                        <div className='sm:flex sm:items-start bg-white'>
                            <div className='bg-white text-center sm:mt-0 sm:ml-2 sm:text-left'>
                                <div className='flex items-center'>
                                    <Grid8 className="mr-2" color="#A0A2A6" size={20} />
                                    <h3 className='bg-white text-md font-medium text-gray'>
                                    Pallet
                                    </h3>
                                </div>
                               
                                <p className='bg-white text-3xl font-bold text-black'>
                                PAL3220400
                                </p>
                            </div>
                            </div>
                        </div>
                </section>

                <section className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/4 sm:my-4'>
                    <div className='bg-white p-5'>
                        <div className='sm:flex sm:items-start bg-white'>
                            <div className='bg-white text-center sm:mt-0 sm:ml-2 sm:text-left'>
                                <div className='flex items-center'>
                                    <HashtagSquare variant="Outline" className="mr-2" color="#A0A2A6" size={20} />
                                    <h3 className='bg-white text-md font-medium text-gray'>
                                    Cantidad pallet
                                    </h3>
                                </div>
                               
                                <p className='bg-white text-3xl font-bold text-black'>
                                18
                                </p>
                            </div>
                            </div>
                        </div>
                </section>

                <section className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/4 sm:my-4'>
                    <div className='bg-white p-5'>
                        <div className='sm:flex sm:items-start bg-white'>
                            <div className='bg-white text-center sm:mt-0 sm:ml-2 sm:text-left'>
                                <div className='flex items-center'>
                                    <FormatSquare className="mr-2" color="#A0A2A6" size={20} />
                                    <h3 className='bg-white text-md font-medium text-gray'>
                                    Cantidad niveles
                                    </h3>
                                </div>
                               
                                <p className='bg-white text-3xl font-bold text-black'>
                                9
                                </p>
                            </div>
                            </div>
                        </div>
                </section>

                <section className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/4 sm:my-4'>
                    <div className='bg-white p-5'>
                        <div className='sm:flex sm:items-start bg-white'>
                            <div className='bg-white text-center sm:mt-0 sm:ml-2 sm:text-left'>
                                <div className='flex items-center'>
                                    <Health className="mr-2" color="#A0A2A6" size={20} />
                                    <h3 className='bg-white text-md font-medium text-gray'>
                                    Planeado vs realizado
                                    </h3>
                                </div>
                               
                                <p className='bg-white text-3xl font-bold text-black'>
                                1 de 2
                                </p>
                            </div>
                            </div>
                        </div>
                </section>
            
                
            </div>

            <div className='sm:flex sm:space-x-4'>
                <section styles={{ height: '500px', overflowY: 'scroll', whitespace: 'nowrap' }} className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:w-1/3 sm:my-4'>
                    <div className='bg-white p-5'>
                    </div>
                </section>

                <section className='inline-block align-bottom rounded-lg border border-slate-200 text-left overflow-hidden mb-4 w-full sm:my-4'>
                    <div className='bg-white p-5'>
                        <h3 className='bg-white text-md font-medium text-gray'>
                        Historial
                        </h3>
                       <div className="flex grid justify-start" style={{marginLeft: "-10px"}}>
                       <GraphicHistory/>
                        <div></div>
                       </div>
                    </div>
                </section>

            </div>
        </div>
        
        </div>

        
    </div>
    </>
  );
}

export default GenealogyDashboard;