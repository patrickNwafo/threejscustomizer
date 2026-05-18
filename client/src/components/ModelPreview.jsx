import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";

const RotatingMesh = ({ file, nodeName, color }) => {
    const groupRef = useRef();
    const { nodes } = useGLTF(file);

    // Clone deeply so this preview is independent from the main canvas
    const cloned = useMemo(() => {
        const n = nodes[nodeName];
        if (!n) return null;
        const c = n.clone(true);
        // Apply color to all meshes in clone
        c.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material = child.material.clone();
                child.material.color?.set(color);
            }
        });
        return c;
    }, [nodes, nodeName, color]);

    useFrame((_, delta) => {
        if (groupRef.current) groupRef.current.rotation.y += delta * 0.6;
    });

    if (!cloned) return null;

    return (
        <group ref={groupRef} scale={0.8} position={[0, -0.1, 0]}>
            <primitive object={cloned} />
        </group>
    );
};

const ModelPreview = ({ modelConfig, color = "#888" }) => (
    <Canvas
        camera={{ position: [0, 0, 3.5], fov: 25 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
    >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Environment preset="city" />
        <Suspense fallback={null}>
            <RotatingMesh file={modelConfig.file} nodeName={modelConfig.node} color={color} />
        </Suspense>
    </Canvas>
);

export default ModelPreview;
