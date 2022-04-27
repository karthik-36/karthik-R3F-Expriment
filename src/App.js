import React, { Suspense, useRef, useState } from "react";
//R3F
import { Canvas, useFrame } from "react-three-fiber";
// Deai - R3F

import { MeshReflectorMaterial } from "@react-three/drei";
import { softShadows, MeshWobbleMaterial, OrbitControls, Box } from '@react-three/drei';

// Styles
import "./App.scss";

import { DoubleSide } from "three";


// React Spring
import { useSpring, a } from '@react-spring/three';
import { Ground } from "./Ground";


import { useGLTF, Effects } from "@react-three/drei";
import * as THREE from "three";
import bowl from "./bowl.mp4";
import swing from "./swing.mp4";
import fire from "./fire.mp4";
import beat from "./beat.mp4";

import left from "./images/left.png";
import right from "./images/right.png";


const TV = (prp) => {
  const { nodes } = useGLTF("tv.gltf");

  console.log(prp.video);
  console.log(bowl);

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = prp.video;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  return (
    <group scale={[2.2, 2.2, 2.2]} position={prp.position} rotation={prp.rotation}>
      <mesh geometry={nodes.TV.geometry}>
        <meshStandardMaterial color={prp.color} />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[0, 0, 1.1]}>
        <planeGeometry args={[3.2, 1.9]} />
        <meshStandardMaterial emissive={"purple"} side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
};

function KarthikShow(props) {

  return (<>
    <ambientLight intensity={0.1} />
    <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
    <perspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
    <mesh position={[1, -10, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial opacity={0.1} color={"blue"} />
      <MeshReflectorMaterial


        envMapIntensity={0}
        normalScale={[0.15, 0.15]}
        dithering={true}
        color={[0.015, 0.015, 1]}
        roughness={0.7}
        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
        mixStrength={80} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        debug={0}
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>

    <color args={[0, 0, 0]} attach="background" />
    {/* [1, 0.25 , 0.7] */}
    <pointLight
      color={[0.6, 0.6, 1]}
      intensity={3.5}
      angle={0.6}
      penumbra={0.5}
      position={[25, 1.7, -19]}
      castShadow
      shadow-bias={-0.0001}
    />

    <directionalLight
      color={[0.6, 0.6, 1]}
      intensity={2.5}
      angle={0.6}
      penumbra={0.5}
      position={[5, 5, 0]}
      castShadow
      shadow-bias={-0.0001}
    />

    {/* <spotLight
      color = {[0.6,0.6 , 1]}
      intensity = {1.5}
      angle = {200}
      penumbra = {0.5}
      position = {[-5 , 5, 0]}
      castShadow
      shadow-bias = {-0.0001}
    /> */}

    <TV video={swing} position={[25, 6.7 , -19]}  rotation={[Math.PI * 0.1, Math.PI * 1.2, Math.PI * 0.05]} color={"red"} />
    <TV video={bowl} position={[-19, 6.7, -19]} rotation={[Math.PI * 0.1, Math.PI * 1.2, Math.PI * 0.05]} color={"purple"} />
    <TV video={fire} position={[25, 6.7, 30]} rotation={[Math.PI * 0.1, Math.PI * 1.2, Math.PI * 0.05]} color={"orange"} />
    <TV video={beat} position={[-20, 6.7, 30]} rotation={[Math.PI * 0.1, Math.PI * 1.2, Math.PI * 0.05]} color={"blue"} />
    <Ground />
    <gridHelper />
  </>
  )

}



const App = () => {

  const [count, setCount] = useState(0);

  const arrowClick = (direction) => {
    if (direction === "left") {
      console.log("left");
      if (count === 0) {
        setCount(3);
      } else {
        setCount(count - 1);
      }

    } else {
      console.log("right");
      if (count === 3) {
        setCount(0);
      } else {
        setCount(count + 1);
      }
    }
  }




  return (
    <>


      <Suspense fallback={null}>
        <Canvas>

          <KarthikShow  scene={count} />

        </Canvas>
      </Suspense>



      <div class="modal">
        <img class="left" src={left} onClick={() => arrowClick("left")} />
        hi, try changing scenes by clicking on the left or right arrows.
        <img class="right" src={right} onClick={() => arrowClick("right")} />
      </div>


    </>
  );
};

export default App;