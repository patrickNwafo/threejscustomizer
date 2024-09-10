
import { easing } from "maath"
import { useSnapshot } from "valtio"
import { useFrame } from "@react-three/fiber"
import { Decal, useGLTF, useTexture } from "@react-three/drei"

import state from "../store";


const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/disk.glb');


    const logoTexture = useTexture(snap.logoDecal)
    const fullTexture = useTexture(snap.fullDecal)

    // useFrame((state, delta) => easing.dampC(materials['Material.007'].color, snap.color, 0.25, delta))

    // Smoothly transition the colors
    useFrame((_, delta) => {
        // Apply color to each material smoothly
        Object.keys(snap.materials).forEach((materialKey) => {
            const material = materials[materialKey];
            const color = snap.materials[materialKey];

            if (material && color) {
                easing.dampC(material.color, color, 0.25, delta);
            }
        });
    });

    const stateString = JSON.stringify(snap);
    return (
        <group
            key={stateString}
            position={[-0.15, -0.522, 0.074]}
            rotation={[1.453, 0.033, 1.38]}
            scale={[0.002, 0.002, 0.002]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.model_4001.geometry}
                material={materials['Material.001']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.model_4001_1.geometry}
                material={materials['Material.003']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.model_4001_2.geometry}
                material={materials['Material.002']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.model_4001_3.geometry}
                material={materials['Material.007']}
            >
                {snap.isFullTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={0.2}
                        map={fullTexture}
                    />
                )}

                {snap.isLogoTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={0.2}
                        map={logoTexture}
                        mapAnisotropy={16}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
            </mesh>

        </group>

    )
}

export default Shirt