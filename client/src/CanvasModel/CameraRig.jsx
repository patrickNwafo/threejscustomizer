import { useFrame } from "@react-three/fiber"
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../store";
import { useRef } from "react";

const CameraRig = ({ children }) => {
    const group = useRef();
    const snap = useSnapshot(state);

    useFrame((rfState, delta) => {
        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        // Camera position
        let targetPosition = [-0.3, 0, 2];
        if (snap.intro) {
            if (isBreakpoint) targetPosition = [0, 0, 4];
            if (isMobile) targetPosition = [0, 0.2, 2.5];
        } else {
            if (isMobile) targetPosition = [0, 0, 2.5];
            else targetPosition = [0, 0, 2];
        }
        easing.damp3(rfState.camera.position, targetPosition, 0.25, delta);

        // Mouse-driven rotation — significantly increased range for strong 3D feel
        // X tilt: pointer.y / 3  → ±18.9°
        // Y turn: pointer.x / 2  → ±28.6°
        // Z roll: subtle counter-tilt for depth cue
        const targetRotX = rfState.pointer.y / 3;
        const targetRotY = -rfState.pointer.x / 2;
        const targetRotZ = rfState.pointer.x / 14;

        easing.dampE(
            group.current.rotation,
            [targetRotX, targetRotY, targetRotZ],
            0.1,   // was 0.25 — much snappier now
            delta
        );

        // Subtle floating bob — adds depth without being distracting
        group.current.position.y = Math.sin(rfState.clock.elapsedTime * 0.6) * 0.03;
    });

    return (
        <group ref={group}>
            {children}
        </group>
    )
}

export default CameraRig