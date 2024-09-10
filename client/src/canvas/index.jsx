import { Canvas } from "@react-three/fiber"
import { Environment, Center } from "@react-three/drei"
import Shirt from "./Shirt"
import Backdrop from "./Backdrop"
import CameraRig from "./CameraRig"
import useWindowSize from "../hooks/useWindowSize"

const CanvasModel = () => {
    const { width } = useWindowSize();

    const fov = width < 768 ? 40 : 30;
    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 0], fov }}
            gl={{ preserveDrawingBuffer: true }}
            className="w-full h-full max-w-full transition-all ease-in"
        >
            <ambientLight intensity={0.4} />
            <Environment preset="city" />

            <CameraRig>
                <Center>
                    <Shirt />
                </Center>
            </CameraRig>
        </Canvas>
    )
}

export default CanvasModel