"use client";
import WorkflowTrigger from "@/app/work-flow/_components/workflow-trigger";
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
import { BottomToolbar, CustomNode } from "./CustomNode";
import Controls from "./controls";
import Header from "./header";
import SidebarTest from "./sidebar-test";

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
  // const [isLocked, setIsLocked] = useState(false);
  const [openSelectBox, setOpenSelectBox] = useState(false);

  // Track connected handles for each node
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

  // Handle zoom and view controls
  const handleZoomIn = useCallback(() => {
    zoomIn();
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut();
  }, [zoomOut]);

  const handleReset = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 200 });
  }, [setViewport]);

  // const handleLockChange = useCallback((locked: boolean) => {
  //   setIsLocked(locked);
  // }, []);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const edge = {
        ...params,
        // type: "smoothstep",
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
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges, updateConnectedHandles]
  );

  const onAddNode = useCallback(
    (type: string) => {
      if (type != "defalt") {
        setNodes(() => []);
      }

      // Get the dimensions of the viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate the center position in screen coordinates
      const centerX = viewportWidth / 2;
      const centerY = viewportHeight / 2;

      // Convert screen coordinates to flow coordinates
      const position = screenToFlowPosition({
        x: centerX,
        y: centerY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
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
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, getViewport, screenToFlowPosition]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  }, []);
  useEffect(() => {
    onAddNode("defalt");
  }, []);

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
          <SidebarTest />
          {/* <Sidebar onAddNode={onAddNode} /> */}
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
                // onLockChange={handleLockChange}
              />
              {/* <MiniMap /> */}
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
        <div className="fixed right-0 top-0 w-1/4 h-screen pb-4 flex flex-wrap">
          <WorkflowTrigger onAddNode={onAddNode} />
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
