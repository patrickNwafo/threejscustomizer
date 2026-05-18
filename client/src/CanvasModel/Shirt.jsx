
import { useEffect } from "react"
import { easing } from "maath"
import { useSnapshot } from "valtio"
import { useFrame } from "@react-three/fiber"
import { Decal, useGLTF, useTexture } from "@react-three/drei"

import state from "../store";
import MODELS from "../config/models";

const Shirt = () => {
    const snap = useSnapshot(state);
    const modelCfg = MODELS[snap.activeModel] || MODELS.shirt;
    const isGroup = modelCfg.type === "group";

    const { nodes, materials } = useGLTF(modelCfg.file);

    // Hooks always called (React rules)
    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    const rootNode = nodes[modelCfg.node];
    const singleMaterial = !isGroup ? materials[modelCfg.material] : null;

    // Enable shadows on all children of group models
    useEffect(() => {
        if (isGroup && rootNode) {
            rootNode.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    // Clone materials so we can mutate color without affecting other instances
                    if (child.material && !child.material.__cloned) {
                        child.material = child.material.clone();
                        child.material.__cloned = true;
                    }
                }
            });
        }
    }, [isGroup, rootNode]);

    useFrame((_, delta) => {
        // Color animation
        if (!isGroup && singleMaterial?.color) {
            easing.dampC(singleMaterial.color, snap.color, 0.25, delta);
        } else if (isGroup && rootNode) {
            rootNode.traverse((child) => {
                if (child.isMesh && child.material?.color) {
                    easing.dampC(child.material.color, snap.color, 0.25, delta);
                }
            });
        }
        // Note: no local auto-rotation here — CameraRig handles all rotation
        // so mouse tracking works cleanly on both shirt and cassette
    });

    if (!rootNode) return null;

    // Find the first child mesh of a group (for logo decal target)
    let firstChildMesh = null;
    if (isGroup) {
        rootNode.traverse((child) => {
            if (!firstChildMesh && child.isMesh) firstChildMesh = child;
        });
    }

    const stateString = JSON.stringify({ m: snap.activeModel, l: snap.logoDecal, f: snap.fullDecal });

    // ── Group model (e.g. cassette) ──────────────────────────────
    if (isGroup) {
        return (
            <group key={stateString}>
                <primitive object={rootNode} />
                {/* Logo sticker — a flat plane overlaid on the model surface */}
                {snap.isLogoTexture && (
                    <mesh
                        position={modelCfg.logo.position}
                        rotation={modelCfg.logo.rotation}
                        scale={[modelCfg.logo.scale, modelCfg.logo.scale, 0.001]}
                    >
                        <planeGeometry args={[1, 1]} />
                        <meshBasicMaterial
                            map={logoTexture}
                            transparent
                            alphaTest={0.05}
                            depthWrite={false}
                        />
                    </mesh>
                )}
            </group>
        );
    }

    // ── Single-mesh model (e.g. shirt) ───────────────────────────
    return (
        <group key={stateString}>
            <mesh
                castShadow
                geometry={rootNode.geometry}
                material={singleMaterial}
                material-roughness={1}
                dispose={null}
            >
                {snap.isFullTexture && (
                    <Decal
                        position={modelCfg.full.position}
                        rotation={modelCfg.full.rotation}
                        scale={modelCfg.full.scale}
                        map={fullTexture}
                    />
                )}
                {snap.isLogoTexture && (
                    <Decal
                        position={modelCfg.logo.position}
                        rotation={modelCfg.logo.rotation}
                        scale={modelCfg.logo.scale}
                        map={logoTexture}
                        mapAnisotropy={16}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
            </mesh>
        </group>
    );
}

Object.values(MODELS).forEach((m) => useGLTF.preload(m.file));

export default Shirt