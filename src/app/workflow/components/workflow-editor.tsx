"use client";
import WorkflowTrigger from "./workflow-trigger";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  MarkerType,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { BottomToolbar, CustomNode } from "./custom-node";
import Controls from "./controls";
import Header from "./header";
import SidebarTest from "./sidebar-test";
import { workflowbackend } from "@/json/work-flow/workflow";
import Sidebar from "./sidebar";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const { getViewport, screenToFlowPosition, zoomIn, zoomOut, setViewport } =
    useReactFlow();
  const [openSelectBox, setOpenSelectBox] = useState(false);

  const updateConnectedHandles = useCallback(
    (edge: Edge | Connection) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const targetNode = nodes.find((n) => n.id === edge.target);

      if (sourceNode && targetNode) {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === sourceNode.id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  connectedHandles: {
                    ...node.data.connectedHandles,
                    [edge.sourceHandle || ""]: "source",
                  },
                },
              };
            }
            if (node.id === targetNode.id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  connectedHandles: {
                    ...node.data.connectedHandles,
                    [edge.targetHandle || ""]: "target",
                  },
                },
              };
            }
            return node;
          })
        );
      }
    },
    [nodes, setNodes]
  );

  const handleZoomIn = useCallback(() => {
    zoomIn();
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut();
  }, [zoomOut]);

  const handleReset = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 200 });
  }, [setViewport]);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((currentEdges) => {
        // Check if connection already exists
        const connectionExists = currentEdges.some(
          edge => 
            (edge.source === params.source && edge.target === params.target) ||
            (edge.target === params.source && edge.source === params.target)
        );
  
        if (!connectionExists) {
          const uniqueEdgeId = `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const edge = {
            ...params,
            id: uniqueEdgeId,
            style: {
              stroke: "#7b809a",
              strokeWidth: 1,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#7b809a",
            },
          };
          updateConnectedHandles(edge);
          return addEdge(edge, currentEdges);
        }
  
        return currentEdges;
      });
    },
    [setEdges, updateConnectedHandles]
  );

  const onAddNode = useCallback(
    (type: string) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const centerX = viewportWidth / 2;
      const centerY = viewportHeight / 2;
      const position = screenToFlowPosition({
        x: centerX,
        y: centerY,
      });
  
      const newNodeId = `${type}-${Date.now()}`;
      const newNode: Node = {
        id: newNodeId,
        type: "custom",
        position,
        data: {
          label: type,
          nodeType: type,
          connectedHandles: {},
          updateNodeType: updateNodeType,
          onAddNode: onAddNode,
          setOpenSelectBox: setOpenSelectBox,
        },
      };
  
      setNodes((currentNodes) => {
        let updatedNodes;
        if (currentNodes.length === 0) {
          updatedNodes = [newNode];
        } else if (type !== "defalt") {
          const nodesWithoutDefault = currentNodes.filter(
            node => !node.id.startsWith("defalt-")
          );
          updatedNodes = [...nodesWithoutDefault, newNode];
        } else if (type === "defalt" && currentNodes.length > 0) {
          updatedNodes = currentNodes;
        } else {
          updatedNodes = [...currentNodes, newNode];
        }
  
        // Create edge if there's a selected node
        if (selectedNode && type !== "defalt" && type !== "start-flow") {
          // Check if an edge already exists between these nodes
          setEdges((currentEdges) => {
            const existingEdge = currentEdges.find(
              (edge) => 
                (edge.source === selectedNode && edge.target === newNodeId) ||
                (edge.target === selectedNode && edge.source === newNodeId)
            );
  
            if (!existingEdge) {
              // Generate a unique edge ID using timestamp and random number
              const uniqueEdgeId = `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
              
              const newEdge: Edge = {
                id: uniqueEdgeId,
                source: selectedNode,
                target: newNodeId,
                sourceHandle: 'right',
                targetHandle: 'left',
                type: 'default',
                style: {
                  stroke: "#7b809a",
                  strokeWidth: 1,
                },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color: "#7b809a",
                },
              };
  
              return [...currentEdges, newEdge];
            }
  
            return currentEdges;
          });
  
          // Update connected handles for both nodes
          const sourceNode = currentNodes.find(n => n.id === selectedNode);
          if (sourceNode) {
            sourceNode.data.connectedHandles = {
              ...sourceNode.data.connectedHandles,
              right: "source"
            };
          }
  
          newNode.data.connectedHandles = {
            ...newNode.data.connectedHandles,
            left: "target"
          };
        }
  
        return updatedNodes;
      });
  
      // Set the newly added node as selected
      setSelectedNode(newNodeId);
    },
    [setNodes, screenToFlowPosition, selectedNode, setEdges]
  );

  

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  }, []);

  useEffect(() => {
    if (nodes.length === 0) {
      onAddNode("defalt");
    }
  }, [nodes.length, onAddNode]);

  const updateNodeType = useCallback(
    (nodeId: string, newType: string) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                nodeType: newType,
                label: newType,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  return (
    <>
      <div className="flex flex-wrap h-screen bg-[#f0f2f5]">
        <div className="p-4 fixed top-0 left-0 z-50 h-full">
          <SidebarTest onAddNode={onAddNode}/>
        </div>
        <div className="w-full flex flex-wrap">
          <div className="flex-grow relative">
            <div className="absolute flex top-0 w-full z-50 pt-4 pl-[280px]">
              <Header />
            </div>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              proOptions={{ hideAttribution: true }}
              fitView
              panOnDrag
              defaultViewport={{ x: 0, y: 0, zoom: 1 }}
              nodeDragThreshold={0}
              connectOnClick
            >
              <Controls
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onReset={handleReset}
              />
              <Background className="bg-[#f0f2f5]" gap={12} size={1} />
              <BottomToolbar
                selectedNode={selectedNode}
                selectedNodeType={
                  nodes.find((n) => n.id === selectedNode)?.data.nodeType
                }
                onUpdateNodeType={updateNodeType}
              />
            </ReactFlow>
          </div>
        </div>
      </div>

      {openSelectBox && (
        <div className="fixed right-0 top-0 w-1/4 h-screen pb-4">
          <WorkflowTrigger onAddNode={onAddNode} workflowbackend={workflowbackend}/>
        </div>
      )}
    </>
  );
}

export default function WorkflowEditor() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}