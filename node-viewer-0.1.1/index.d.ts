import { Deck, MapView, OrbitView, OrthographicView, FilterContext, DeckProps, OrbitViewState } from '@deck.gl/core/typed';
import { NodePropsMap, NodeProps, ParametricCube, Appearance, UpdateTriggers, EdgeProps, Edge, Node } from '@paramountric/graph';
import { ViewStateChangeParameters } from '@deck.gl/core/typed/controllers/controller';
import { BoardLayout, ConnectionHandle, ResizeHandle } from '@paramountric/layout';
import { Timeline } from '@paramountric/animation';

interface Event {
    type: string;
    data?: any;
}
type Listener = (evt: Event) => any;
type ListenerRegistry = {
    [type: string]: Listener[];
};
/**
 * An event source can emit events and register event listeners
 */
declare class EventSource {
    _listeners: ListenerRegistry;
    _onceListeners: ListenerRegistry;
    /**
     * Adds a listener to a event type.
     */
    on(type: string, listener: Listener): void;
    /**
     * Adds a listener that will be called only once to a event type.
     */
    once(type: string, listener: Listener): void;
    /**
     * Removes a previously registered event listener.
     */
    off(type: string, listener: Listener): void;
    emit(eventOrType: string | Event, data?: any): void;
    /**
     * Returns true if we have a listener for the event type.
     */
    private _listens;
}

declare class NodeViewer$1 extends EventSource {
    props: NodeViewerProps;
    deck: Deck | null;
    canvas: HTMLCanvasElement;
    boardLayout: BoardLayout;
    nodeViewLayouts: {
        [nodeUri: string]: any;
    };
    nodes: NodePropsMap;
    projectNode: NodeProps;
    timeline: Timeline;
    interactionManager: InteractionManager;
    interactionMode: InteractionMode;
    shouldAnimate: boolean;
    videoCapture: any;
    presenting: boolean;
    cubeCache: Map<string, ParametricCube[]>;
    selectedVersionUriCache: string[];
    constructor(viewportProps: NodeViewerProps);
    dispose(): void;
    onLoad(): void;
    boardIsTilted(): boolean;
    getBoardZoom(): number;
    getViews(): (MapView | OrbitView | OrthographicView)[];
    getViewStates(): {
        [viewId: string]: Appearance;
    };
    snapRotation(currentRotationOrbit: number): number;
    setBoardCameraFrame(viewState: Appearance, viewId: any): void;
    onViewStateChange({ viewState, viewId, interactionState, oldViewState, }: ViewStateChangeParameters & {
        viewId: string;
    }): void;
    updateNodeViewFromUserInteraction(nodeProps: NodeProps, viewState: Appearance): void;
    deactivateViews(): void;
    activateView(nodeProps: NodeProps): void;
    nodeViewerIsActive(nodeProps: NodeProps): any;
    emitSnapshot: (...args: any[]) => void;
    snapshot(nodeUri?: string): void;
    layerFilter({ layer, viewport }: FilterContext): boolean;
    getLayers(): any[];
    getNodeFrame(nodeProps: NodeProps): Appearance;
    getFile(node: any, callback: any): Promise<void>;
    getProps({ onNextFrame, extraProps }?: {
        onNextFrame?: any;
        extraProps?: any;
    }): DeckProps;
    getZoom(): number;
    getProjectNode(): NodeProps;
    setInteractionMode(mode: InteractionMode): void;
    pixelToCartesian(x: number, y: number): number[] | null;
    cartesianToPixel(x: number, y: number): number[] | null;
    update(updateTriggers?: UpdateTriggers): void;
    getNodePixels(nodeProps: NodeProps, boardViewport?: any): {
        viewX: number;
        viewY: number;
        width: number;
        height: number;
    };
    setTime(timing: number): void;
    setInsightCursor(timing: number | null): void;
    setAnimationProps(): void;
    record({ formatConfigs, filename, timecode, onStopped, onSave, onComplete, }: {
        formatConfigs?: {};
        filename?: any;
        timecode?: {
            start: number;
            end: number;
            framerate: number;
        };
        onStopped?: any;
        onSave?: any;
        onComplete?: any;
    }): void;
    stopRecording({ onStopped, onSave, onComplete, abort }: {
        onStopped: any;
        onSave: any;
        onComplete: any;
        abort: any;
    }): void;
    seek({ timeMs }: {
        timeMs: any;
    }): void;
    onAfterRender(setAnimationProps: any, readyToCapture?: boolean): void;
    downloadNodes: (fileName: string, nodeProps: NodeProps[], fileType?: 'json' | 'csv', keysToInclude?: string[]) => void;
    getNodeInteractionState(nodeUri: string): NodeInteractionState;
    setNodeInteractionState(nodeUri: string, state: NodeInteractionState): void;
    getEdgeInteractionState(edgeId: string): EdgeInteractionState;
    setEdgeInteractionState(edgeId: string, state: EdgeInteractionState): void;
    getDefaultNodeSize(): number;
    getFullTriggers(): {
        nodePositionChange: number;
        nodeSizeChange: number;
        nodeExtrusionChange: number;
        nodeScaleChange: number;
        nodeRotateChange: number;
        nodeFillColorChange: number;
        nodeStrokeColorChange: number;
    };
    updatePolygons(): void;
    nodeHasSeparateLayoutParent(child: NodeProps, allNodes: NodePropsMap): boolean;
    updateNodeProps({ nodes, // use for layout "latest" nodes
    changedNodeProps, updateTriggers, }: {
        nodes: NodePropsMap;
        changedNodeProps: NodeProps[];
        updateTriggers?: UpdateTriggers;
    }): void;
    getCubeCache(nodeProps: NodeProps): void;
    createNodeViewer(nodeProps: NodeProps): void;
    updateEdgeProps({ changedEdgeProps }: {
        changedEdgeProps: any;
    }): void;
    updateMySelection(versionUris: string[]): void;
    updateMyEdgeSelection(edgeIds: string[]): void;
    updateSelectedNodeBox(versionUris: string[]): void;
    setResizeNode(nodeProps: NodeProps | null): void;
    setConnectionNode(nodeProps: NodeProps | null): void;
    setSelectionColors(nodeUriToColors: Record<string, [number, number, number]>): void;
    createEdgeId(sourceUri: string, relationKey: string, targetUri: string): string;
    pickBoardLayout(pixel: Pixel, dim3?: boolean): any | null;
    pick(pixel: Pixel, dim3?: boolean): any | null;
    setResizeHandles(versionUris: string[]): void;
    setNodeType(versionUri: string, type: string): void;
    runAutoLayout(nodeProps: NodeProps, overrideChildren?: NodeProps[]): NodeProps[];
}

type ViewportCoordinate = [number, number, number];
type Pixel = [number, number];
type NodeInteractionState = 'default' | 'hover' | 'dragging' | 'inside' | 'outside' | 'focus';
type EdgeInteractionState = 'default' | 'hover' | 'focus';
type InteractionMode = 'panning' | 'inserting' | 'picking' | 'multiselect' | 'dragging' | 'rotating' | 'resizing' | 'connecting';
type ViewportInteractionState = 'selecting' | 'drawing' | 'dragging' | 'start-dragging' | 'connecting' | 'resizing' | null;
declare class InteractionManager {
    viewport: NodeViewer$1;
    viewportInteractionState: ViewportInteractionState;
    disableController: boolean;
    nodeSelectionColors: Record<string, [number, number, number]>;
    edgeSelectionColors: Record<string, [number, number, number]>;
    nodeInteractionStates: Record<string, NodeInteractionState>;
    edgeInteractionStates: Record<string, EdgeInteractionState>;
    preventClickFlag: boolean;
    doubleClickTimeout: any;
    dragNode: NodeProps | null;
    lastDragNodeCoord: [number, number] | null;
    hoverNode: NodeProps | null;
    hoverEdge: EdgeProps | null;
    connectionStartNode: NodeProps | null;
    initialConnectionHandles: ConnectionHandle[];
    sourceConnectionHandles: ConnectionHandle[];
    targetNodeConnectionHandles: ConnectionHandle[];
    mouseConnectionHandle: ConnectionHandle | null;
    dragConnectionHandle: ConnectionHandle | null;
    connectionHandleDragInfo: any | null;
    temporaryEdge: ConnectionHandle[];
    temporaryConnectionEdgeHandles: ConnectionHandle[];
    temporaryConnectionEdgeType: 'curve' | 'line';
    hasPotentialConnection: boolean;
    resizeNode: NodeProps | null;
    resizePolygon: any | null;
    hoverResizeHandle: ResizeHandle;
    constructor({ viewport }: {
        viewport: any;
    });
    setResizeNode(nodeProps: NodeProps | null): void;
    setConnectionNode(nodeProps: NodeProps | null): void;
    setNodeSelectionColors(versionUriToColors: Record<string, [number, number, number]>): void;
    setEdgeSelectionColors(edgeIdToColors: Record<string, [number, number, number]>): void;
    getCursor({ isDragging, isHovering }: {
        isDragging: any;
        isHovering: any;
    }): "nesw-resize" | "nwse-resize" | "grabbing" | "pointer" | "grab";
    getNodeInteractionState(versionUri: string): NodeInteractionState;
    setNodeInteractionState(versionUri: string, state: NodeInteractionState): void;
    setEdgeInteractionState(edgeId: string, state: EdgeInteractionState): void;
    disableViewportInteraction: () => void;
    enableViewportInteraction: () => void;
    onNodeEnter(node: NodeProps): boolean;
    onNodeLeave(): boolean;
    onNodeDragStart: (coord: [number, number], node: NodeProps) => boolean;
    onNodeDrag: (coordinate: [number, number], pixel: [number, number]) => void;
    onNodeDragEnd: () => void;
    onNodeClick: (node: NodeProps) => void;
    onEdgeEnter(edge: EdgeProps): boolean;
    onEdgeLeave(): boolean;
    onEdgeClick: (edge: Edge) => void;
    onResizeHandleEnter(handle: ResizeHandle): boolean;
    onResizeHandleLeave(): boolean;
    onResizeHandleDragStart: (coord: [number, number], handle: ResizeHandle) => boolean;
    onResizeHandleDrag: ({ coordinate, resizeHandle, }: {
        coordinate: ViewportCoordinate;
        resizeHandle: ResizeHandle;
    }) => void;
    onResizeHandleDragEnd: () => void;
    getConnectionHandles(): ConnectionHandle[];
    createInitialConnectionHandles: () => void;
    onConnectionHandleDragStart: (coord: [number, number], startConnectionHandle: ConnectionHandle) => boolean;
    onConnectionHandleDrag: (coordinate: [number, number], pixel: [number, number]) => void;
    onConnectionHandleDragEnd: (ignoreEmit?: boolean) => void;
    createNodePropsConnectionHandles: (nodeProps: NodeProps, type?: 'initial-handle' | 'source-handle' | 'target-handle') => ConnectionHandle[];
    createTargetConnectionHandles: (startNodeProps?: NodeProps) => ConnectionHandle[];
    findNearestConnectionHandle: (x: number, y: number, snapDistance: any) => ConnectionHandle | null;
}

type SelectionStyle = {
    fillColor?: [number, number, number, number];
    strokeColor?: [number, number, number, number];
    strokeWidth?: number;
    filled?: boolean;
    stroked?: boolean;
};
type NodeViewerProps = {
    projectNode: NodeProps;
    presenting?: boolean;
    debug?: boolean;
    insights?: Appearance[];
    assetUrl?: string;
    baseMapConfig?: {
        [mapSetting: string]: string;
    };
    interactionMode?: InteractionMode;
    onContextLost?: (event: any) => void;
    offline?: boolean;
    token?: string;
    projectName?: string;
    namespace?: string;
    nodesUrl?: string;
    hubUrl?: string;
    speckleUrl?: string;
    activeProjectIds?: {
        [projectId: string]: boolean;
    };
    typeNodes?: Node[];
    propertyNodes?: Node[];
    initialPortalLayout?: any;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    nodes?: Node[];
    zoom?: number;
    target?: [number, number, number];
    rotationX?: number;
    rotationOrbit?: number;
    minZoom?: number;
    maxZoom?: number;
    backgroundColor?: number[];
    darkMode?: boolean;
    darkModeBackgroundColor?: number[];
    lightModeBackgroundColor?: number[];
    viewX?: number;
    viewY?: number;
    viewWidth?: number;
    viewHeight?: number;
    flyTo?: OrbitViewState;
    flyToDuration?: number;
    orthographic?: boolean;
    disableController?: boolean;
    disableController2?: boolean;
    animate?: boolean;
    animateNodes?: boolean;
    graph?: Node;
    typeToAsset?: {
        [type: string]: string;
    };
    hideGrid?: boolean;
    hideViewportLayers?: boolean;
    showNodeBorders?: boolean;
    showTimeline?: boolean;
    timelineStart?: Date;
    timelineEnd?: Date;
    timelineCursor?: Date;
    timelineSpeed?: number;
    timelineState?: 'play' | 'pause' | 'stop';
    focusNode?: Node;
    focusNodeWidth?: number;
    focusNodeHeight?: number;
    selectionStyle?: SelectionStyle;
    resizeStyle?: SelectionStyle;
    awsAccessKeyId?: string;
    awsSecretAccessKey?: string;
    presenters?: any;
    relationKeys?: string[];
    propertyKey?: string;
    propertyKeys?: string[];
    showCarrierNodesByType?: {
        [type: string]: boolean;
    };
    edgeType?: 'straight' | 'bezier';
    enableDragging?: boolean;
    metadataLevels?: number;
    autoGroupLimit?: number;
    showTypeNodes?: boolean;
    unlockOutgoingNodesOnDrag?: boolean;
    lockNodesOnLayoutDone?: boolean;
    stopForceLayoutAfterSeconds?: number;
    showCircles?: boolean;
    showEdgeLabels?: boolean;
    longitude?: number;
    latitude?: number;
    bearing?: number;
    pitch?: number;
    parent?: HTMLDivElement;
    canvas?: HTMLCanvasElement | string;
    meshData?: any;
    mesh?: any;
    meshes?: any;
    useLightingEffects?: boolean;
    postProcessEffects?: any;
    onClick?: (info: any, e: any) => void;
    transitions?: {
        [propertyKey: string]: any;
    };
    disableTransitions?: boolean;
    glOptions?: any;
    ignoreDisconnectedNodes?: boolean;
    collisionRadius?: number;
    alpha?: number;
    resumeAlpha?: number;
    nBodyStrength?: number;
    nBodyDistanceMin?: number;
    nBodyDistanceMax?: number;
    sankeyWidth?: number;
    sankeyHeight?: number;
    sankeyNodeWidth?: number;
    sankeyNodePadding?: number;
    sankeyHorizontalDistanceBetweenNodes?: number;
    sankeyAutoSize?: boolean;
    sankeyAlignment?: 'left' | 'right' | 'center' | 'justify';
    useSankeyHeights?: boolean;
    classes?: any;
    functions?: any;
    enumerations?: any;
    constants?: any;
} & Omit<DeckProps, 'views'>;

declare class NodeViewer extends EventSource {
    props: NodeViewerProps;
    deck: Deck | null;
    canvas: HTMLCanvasElement;
    nodeViewLayouts: {
        [nodeUri: string]: any;
    };
    nodes: NodePropsMap;
    projectNode: NodeProps;
    timeline: Timeline;
    interactionManager: InteractionManager;
    interactionMode: InteractionMode;
    shouldAnimate: boolean;
    videoCapture: any;
    presenting: boolean;
    cubeCache: Map<string, ParametricCube[]>;
    selectedVersionUriCache: string[];
    blob: Blob;
    mimeType: string;
    quality: number;
    constructor(viewportProps: NodeViewerProps);
}

export { NodeViewer, NodeViewerProps };
