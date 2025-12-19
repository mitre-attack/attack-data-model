import React, { useState, useRef, useEffect } from 'react';
import { Network, Database, Shield, Users, Zap, FileText, Target, Search, Activity, Maximize2, X } from 'lucide-react';
import styles from './styles.module.css';

const AttackStixArchitecture = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightedConnections, setHighlightedConnections] = useState([]);
  const [draggingNode, setDraggingNode] = useState(null);
  const [panningCanvas, setPanningCanvas] = useState(false);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [nodePositions, setNodePositions] = useState({
    matrix: { x: 15, y: 10 },
    tactic: { x: 50, y: 10 },
    technique: { x: 50, y: 30 },
    subtechnique: { x: 85, y: 30 },
    asset: { x: 15, y: 30 },
    mitigation: { x: 15, y: 50 },
    detectionStrategy: { x: 85, y: 50 },
    analytic: { x: 85, y: 70 },
    dataComponent: { x: 85, y: 95 },
    dataSource: { x: 45, y: 95 },
    group: { x: 15, y: 70 },
    campaign: { x: 15, y: 95 },
    software: { x: 50, y: 70 }
  });
  const [showPanHint, setShowPanHint] = useState(false);
  const [panHintTimeout, setPanHintTimeout] = useState(null);
  const [nodeLongPressActive, setNodeLongPressActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  const containerRef = useRef(null);
  const fullscreenRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const longPressTimer = useRef(null);
  const nodeLongPressTimer = useRef(null);

  useEffect(() => {
    const checkOrientation = () => {
      const mobile = window.innerWidth <= 1024;
      const portrait = window.innerHeight > window.innerWidth;
      setIsMobile(mobile);
      setIsPortrait(mobile && portrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

  useEffect(() => {
    const preventScroll = (e) => {
      if (panningCanvas) {
        e.preventDefault();
      }
    };

    if (panningCanvas) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [panningCanvas]);

  const nodes = {
    matrix: { id: 'matrix', name: 'Matrix', stixType: 'x-mitre-matrix', icon: Network, color: '#3b82f6' },
    tactic: { id: 'tactic', name: 'Tactic', stixType: 'x-mitre-tactic', icon: Target, color: '#3b82f6' },
    technique: { id: 'technique', name: 'Technique', stixType: 'attack-pattern', icon: Zap, color: '#ef4444' },
    subtechnique: { id: 'subtechnique', name: 'Sub-technique', stixType: 'attack-pattern', icon: Zap, color: '#f87171' },
    mitigation: { id: 'mitigation', name: 'Mitigation', stixType: 'course-of-action', icon: Shield, color: '#22c55e' },
    detectionStrategy: { id: 'detectionStrategy', name: 'Detection Strategy', stixType: 'x-mitre-detection-strategy', icon: Search, color: '#eab308' },
    analytic: { id: 'analytic', name: 'Analytic', stixType: 'x-mitre-analytic', icon: Activity, color: '#eab308' },
    dataComponent: { id: 'dataComponent', name: 'Data Component', stixType: 'x-mitre-data-component', icon: Database, color: '#ca8a04' },
    dataSource: { id: 'dataSource', name: 'Data Source (deprecated)', stixType: 'x-mitre-data-source', icon: Database, color: '#92400e' },
    group: { id: 'group', name: 'Group', stixType: 'intrusion-set', icon: Users, color: '#f97316' },
    campaign: { id: 'campaign', name: 'Campaign', stixType: 'campaign', icon: Target, color: '#f97316' },
    software: { id: 'software', name: 'Software', stixType: 'malware/tool', icon: FileText, color: '#ea580c' },
    asset: { id: 'asset', name: 'Asset', stixType: 'x-mitre-asset', icon: Database, color: '#a855f7' }
  };

  const connections = [
    { from: 'matrix', to: 'tactic', label: 'tactic_refs', type: 'property', color: '#60a5fa' },
    { from: 'technique', to: 'tactic', label: 'kill_chain_phases', type: 'property', color: '#60a5fa' },
    { from: 'subtechnique', to: 'technique', label: 'subtechnique-of', type: 'relationship', color: '#f87171' },
    { from: 'group', to: 'technique', label: 'uses', type: 'relationship', color: '#fb923c' },
    { from: 'software', to: 'technique', label: 'uses', type: 'relationship', color: '#fb923c' },
    { from: 'campaign', to: 'technique', label: 'uses', type: 'relationship', color: '#fb923c' },
    { from: 'group', to: 'software', label: 'uses', type: 'relationship', color: '#fb923c' },
    { from: 'campaign', to: 'software', label: 'uses', type: 'relationship', color: '#fb923c' },
    { from: 'campaign', to: 'group', label: 'attributed-to', type: 'relationship', color: '#fb923c' },
    { from: 'mitigation', to: 'technique', label: 'mitigates', type: 'relationship', color: '#4ade80' },
    { from: 'detectionStrategy', to: 'technique', label: 'detects', type: 'relationship', color: '#facc15' },
    { from: 'detectionStrategy', to: 'analytic', label: 'analytic_refs', type: 'property', color: '#facc15' },
    { from: 'analytic', to: 'dataComponent', label: 'log_source_refs', type: 'property', color: '#facc15' },
    { from: 'dataComponent', to: 'dataSource', label: 'x_mitre_data_source_ref (deprecated)', type: 'property', color: '#92400e', dashed: true },
    { from: 'dataComponent', to: 'technique', label: 'detects (deprecated)', type: 'relationship', color: '#facc15', dashed: true },
    { from: 'technique', to: 'asset', label: 'targets', type: 'relationship', color: '#c084fc' }
  ];

  const handleNodeClick = (nodeId, e) => {
    e.stopPropagation();
    if (draggingNode) return;

    if (selectedNode === nodeId) {
      setSelectedNode(null);
      setHighlightedConnections([]);
    } else {
      setSelectedNode(nodeId);
      const related = connections.filter(c => c.from === nodeId || c.to === nodeId);
      setHighlightedConnections(related);
    }
  };

  const handleMouseDown = (nodeId, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const nodePos = nodePositions[nodeId];

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const nodeCenterX = rect.left + (nodePos.x / 100) * rect.width;
    const nodeCenterY = rect.top + (nodePos.y / 100) * rect.height;

    dragOffset.current = {
      x: clientX - nodeCenterX,
      y: clientY - nodeCenterY
    };

    if (e.touches) {
      nodeLongPressTimer.current = setTimeout(() => {
        setNodeLongPressActive(true);
        setDraggingNode(nodeId);
      }, 500);
    } else {
      setDraggingNode(nodeId);
    }
  };

  const handleMouseMove = (e) => {
    if (draggingNode && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const newX = ((clientX - rect.left - dragOffset.current.x) / rect.width) * 100;
      const newY = ((clientY - rect.top - dragOffset.current.y) / rect.height) * 100;

      const clampedX = Math.max(5, Math.min(95, newX));
      const clampedY = Math.max(5, Math.min(95, newY));

      setNodePositions(prev => ({
        ...prev,
        [draggingNode]: { x: clampedX, y: clampedY }
      }));
    } else if (panningCanvas) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - panStart.current.x;
      const deltaY = clientY - panStart.current.y;

      setCanvasOffset({
        x: canvasOffset.x + deltaX,
        y: canvasOffset.y + deltaY
      });

      panStart.current = { x: clientX, y: clientY };
    }
  };

  const handleMouseUp = () => {
    setDraggingNode(null);
    setPanningCanvas(false);
    setNodeLongPressActive(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (nodeLongPressTimer.current) {
      clearTimeout(nodeLongPressTimer.current);
      nodeLongPressTimer.current = null;
    }
  };

  const handleNodeTouchEnd = (nodeId, e) => {
    if (nodeLongPressTimer.current) {
      clearTimeout(nodeLongPressTimer.current);
      nodeLongPressTimer.current = null;
    }

    if (!nodeLongPressActive && !draggingNode) {
      e.preventDefault();
      e.stopPropagation();
      handleNodeClick(nodeId, e);
    }

    setNodeLongPressActive(false);
    setDraggingNode(null);
  };

  const handleCanvasMouseDown = (e) => {
    if (e.target === e.currentTarget || e.target.tagName === 'svg') {
      if (e.type === 'mousedown') {
        setPanningCanvas(true);
        panStart.current = { x: e.clientX, y: e.clientY };
      } else if (e.type === 'touchstart') {
        const touch = e.touches[0];
        panStart.current = { x: touch.clientX, y: touch.clientY };

        setShowPanHint(true);
        if (panHintTimeout) clearTimeout(panHintTimeout);

        longPressTimer.current = setTimeout(() => {
          setPanningCanvas(true);
          setShowPanHint(false);
        }, 500);
      }
    }
  };

  const handleCanvasTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    if (panHintTimeout) clearTimeout(panHintTimeout);

    const timeout = setTimeout(() => setShowPanHint(false), 1000);
    setPanHintTimeout(timeout);
  };

  const handleCanvasClick = (e) => {
    if (!panningCanvas && (e.target === e.currentTarget || e.target.tagName === 'svg')) {
      setSelectedNode(null);
      setHighlightedConnections([]);
    }
  };

  const isConnectionHighlighted = (connection) => {
    if (highlightedConnections.length === 0) return true;
    return highlightedConnections.some(c => c.from === connection.from && c.to === connection.to);
  };

  const isNodeHighlighted = (nodeId) => {
    if (highlightedConnections.length === 0) return true;
    return highlightedConnections.some(c => c.from === nodeId || c.to === nodeId) || nodeId === selectedNode;
  };

  const getNodeDetails = (nodeId) => {
    const node = nodes[nodeId];
    const inbound = connections.filter(c => c.to === nodeId);
    const outbound = connections.filter(c => c.from === nodeId);
    return { node, inbound, outbound };
  };

  const details = selectedNode ? getNodeDetails(selectedNode) : null;

  if (isPortrait) {
    return (
      <div className={styles.rotatePrompt}>
        <div className={styles.rotatePromptContent}>
          <div className={styles.rotateIcon}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
          </div>
          <div>
            <h2 className={styles.rotatePromptTitle}>
              Please Rotate Your Device
            </h2>
            <p className={styles.rotatePromptText}>
              This visualization is best viewed in landscape mode for optimal viewing experience.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const mainContent = (
    <div className={`${styles.container} ${isFullscreen ? styles.containerFullscreen : ''}`}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>ATT&CK STIX Architecture</h1>
          <p>Click nodes to explore relationships • Drag nodes to rearrange • Drag canvas to pan</p>
        </div>
        {!isMobile && (
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={styles.fullscreenButton}
            title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Enter fullscreen'}
          >
            {isFullscreen ? <X size={24} /> : <Maximize2 size={24} />}
          </button>
        )}
      </div>

      <div className={styles.contentWrapper}>
        <div
          ref={containerRef}
          className={`${styles.canvasContainer} ${isFullscreen ? styles.canvasContainerFullscreen : ''} ${
            draggingNode ? styles.canvasGrabbing : panningCanvas ? styles.canvasGrabbing : styles.canvasGrab
          }`}
          style={{
            touchAction: panningCanvas || draggingNode ? 'none' : 'pan-y'
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseDown={handleCanvasMouseDown}
          onClick={handleCanvasClick}
          onTouchStart={handleCanvasMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={(e) => {
            handleCanvasTouchEnd();
            handleMouseUp();
          }}
        >
          <div
            className={`${styles.canvasInner} ${panningCanvas ? styles.canvasInnerPanning : ''}`}
            style={{
              transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px)`
            }}
          >
            {showPanHint && (
              <div className={styles.panHint}>
                Tap and hold to pan the canvas
              </div>
            )}
            <svg className={styles.svg}>
              <defs>
                {connections.map((conn, idx) => (
                  <marker
                    key={idx}
                    id={`arrowhead-${idx}`}
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 6 3, 0 6" fill={conn.color} />
                  </marker>
                ))}
              </defs>
              {connections.map((conn, idx) => {
                const fromPos = nodePositions[conn.from];
                const toPos = nodePositions[conn.to];
                const highlighted = isConnectionHighlighted(conn);

                const dx = toPos.x - fromPos.x;
                const dy = toPos.y - fromPos.y;
                const angle = Math.atan2(dy, dx);

                const nodeRadius = 5;

                const startX = fromPos.x + (nodeRadius * Math.cos(angle));
                const startY = fromPos.y + (nodeRadius * Math.sin(angle));
                const endX = toPos.x - (nodeRadius * Math.cos(angle));
                const endY = toPos.y - (nodeRadius * Math.sin(angle));

                return (
                  <g key={idx} opacity={highlighted ? 1 : 0.2}>
                    <line
                      x1={`${startX}%`}
                      y1={`${startY}%`}
                      x2={`${endX}%`}
                      y2={`${endY}%`}
                      stroke={conn.color}
                      strokeWidth={highlighted ? 3 : 2}
                      strokeDasharray={conn.dashed ? "5,5" : "0"}
                      markerEnd={`url(#arrowhead-${idx})`}
                      className={styles.connection}
                    />
                    {highlighted && (
                      <text
                        x={`${(fromPos.x + toPos.x) / 2}%`}
                        y={`${(fromPos.y + toPos.y) / 2}%`}
                        className={styles.connectionLabel}
                        textAnchor="middle"
                        dy="-5"
                      >
                        {conn.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {Object.entries(nodes).map(([key, node]) => {
              const Icon = node.icon;
              const highlighted = isNodeHighlighted(key);
              const isActive = key === selectedNode;
              const isDragging = key === draggingNode;
              const pos = nodePositions[key];

              const nodeClasses = [
                styles.node,
                !highlighted && styles.nodeDimmed,
                isActive && styles.nodeActive,
                isDragging && styles.nodeDragging,
                !isDragging && styles.nodeGrab
              ].filter(Boolean).join(' ');

              return (
                <div
                  key={key}
                  className={nodeClasses}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    backgroundColor: node.color,
                    zIndex: isDragging ? 30 : isActive ? 20 : 10
                  }}
                  onMouseDown={(e) => handleMouseDown(key, e)}
                  onClick={(e) => !draggingNode && handleNodeClick(key, e)}
                  onTouchStart={(e) => handleMouseDown(key, e)}
                  onTouchEnd={(e) => handleNodeTouchEnd(key, e)}
                >
                  <Icon className={styles.nodeIcon} />
                  <div className={styles.nodeName}>
                    {node.name}
                  </div>
                  <div className={styles.nodeType}>
                    {node.stixType}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.detailsPanel}>
          {details ? (
            <div>
              <div className={styles.detailsHeader}>
                {React.createElement(details.node.icon, {
                  className: styles.detailsIconWrapper,
                  style: { backgroundColor: details.node.color }
                })}
                <div>
                  <h2 className={styles.detailsTitle}>
                    {details.node.name}
                  </h2>
                  <code className={styles.detailsStixType}>
                    {details.node.stixType}
                  </code>
                </div>
              </div>

              {details.outbound.length > 0 && (
                <div className={styles.connectionsSection}>
                  <h3 className={styles.sectionHeader}>
                    <span className={`${styles.sectionDot} ${styles.sectionDotGreen}`}></span>
                    Outgoing Connections ({details.outbound.length})
                  </h3>
                  <div className={styles.connectionsList}>
                    {details.outbound.map((conn, idx) => {
                      const labelParts = conn.label.match(/^(.+?)(\s*\([^)]+\))?\s*$/);
                      const mainLabel = labelParts ? labelParts[1] : conn.label;
                      const subLabel = labelParts && labelParts[2] ? labelParts[2].trim() : null;

                      return (
                        <div key={idx} className={`${styles.connectionItem} ${styles.connectionItemOutbound}`}>
                          <div className={styles.connectionHeader}>
                            <span className={styles.connectionLabel}>
                              {mainLabel}
                              {subLabel && <><br /><span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{subLabel}</span></>}
                            </span>
                            <span className={`${styles.connectionType} ${styles.connectionTypeOutbound}`}>
                              {conn.type}
                            </span>
                          </div>
                          <div className={styles.connectionTarget}>
                            → {nodes[conn.to].name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {details.inbound.length > 0 && (
                <div className={styles.connectionsSection}>
                  <h3 className={styles.sectionHeader}>
                    <span className={`${styles.sectionDot} ${styles.sectionDotBlue}`}></span>
                    Incoming Connections ({details.inbound.length})
                  </h3>
                  <div className={styles.connectionsList}>
                    {details.inbound.map((conn, idx) => {
                      const labelParts = conn.label.match(/^(.+?)(\s*\([^)]+\))?\s*$/);
                      const mainLabel = labelParts ? labelParts[1] : conn.label;
                      const subLabel = labelParts && labelParts[2] ? labelParts[2].trim() : null;

                      return (
                        <div key={idx} className={`${styles.connectionItem} ${styles.connectionItemInbound}`}>
                          <div className={styles.connectionHeader}>
                            <span className={styles.connectionLabel}>
                              {mainLabel}
                              {subLabel && <><br /><span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{subLabel}</span></>}
                            </span>
                            <span className={`${styles.connectionType} ${styles.connectionTypeInbound}`}>
                              {conn.type}
                            </span>
                          </div>
                          <div className={styles.connectionTarget}>
                            ← {nodes[conn.from].name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {details.inbound.length === 0 && details.outbound.length === 0 && (
                <div className={styles.emptyState}>
                  <p>No direct connections</p>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.defaultState}>
              <Network className={styles.defaultStateIcon} />
              <p className={styles.defaultStateText}>
                Click on any node to see its connections
              </p>
              <div className={styles.legendGrid}>
                {[
                  { color: '#3b82f6', label: 'Structure' },
                  { color: '#ef4444', label: 'Attack Patterns' },
                  { color: '#f97316', label: 'Actors & Tools' },
                  { color: '#22c55e', label: 'Defense' },
                  { color: '#eab308', label: 'Detection' },
                  { color: '#a855f7', label: 'Targets' }
                ].map((item, idx) => (
                  <div key={idx} className={styles.legendItem}>
                    <div className={styles.legendColor} style={{ backgroundColor: item.color }}></div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return isFullscreen ? (
    <div
      ref={fullscreenRef}
      className={styles.fullscreenOverlay}
      onClick={(e) => {
        if (e.target === fullscreenRef.current) {
          setIsFullscreen(false);
        }
      }}
    >
      {mainContent}
    </div>
  ) : (
    mainContent
  );
};

export default AttackStixArchitecture;