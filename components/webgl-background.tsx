"use client"

import { useEffect, useRef } from 'react';

export const WebGLBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Get WebGL context
    const gl = canvas.getContext('webgl');
    if (!gl) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Vertex shader program
    const vsSource = `
      attribute vec4 aVertexPosition;
      varying vec2 vUv;
      void main() {
        gl_Position = aVertexPosition;
        vUv = aVertexPosition.xy * 0.5 + 0.5;
      }
    `;
    
    // Fragment shader program
    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float uTime;
      
      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Create a flowing gradient effect
        float noise1 = snoise(vec2(uv.x * 2.0, uv.y * 2.0 - uTime * 0.1)) * 0.5 + 0.5;
        float noise2 = snoise(vec2(uv.x * 3.0 + 30.0, uv.y * 3.0 - uTime * 0.15)) * 0.5 + 0.5;
        
        // Create a darker gradient at the top and brighter at the bottom
        float gradientY = 1.0 - uv.y;
        
        // Purple to blue gradient with noise
        vec3 color1 = vec3(0.2, 0.0, 0.4); // Dark purple
        vec3 color2 = vec3(0.0, 0.2, 0.5); // Dark blue
        vec3 color3 = vec3(0.0, 0.4, 0.6); // Cyan blue
        
        // Mix based on noise
        vec3 finalColor = mix(
          mix(color1, color2, noise1),
          color3,
          noise2 * gradientY
        );
        
        // Add some subtle dark gradient vignette
        float vignetteStrength = 1.2;
        float vignette = length(uv - 0.5) * vignetteStrength;
        finalColor *= 1.0 - vignette * 0.7;
        
        // Create subtle "stars" or bright spots
        float stars = pow(noise2, 16.0) * 0.8;
        finalColor += stars * vec3(0.6, 0.8, 1.0);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;
    
    // Create and compile shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);
    
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);
    
    // Create shader program
    const shaderProgram = gl.createProgram()!;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    
    // Create buffer for full-screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    // Get attribute/uniform locations
    const programInfo = {
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        time: gl.getUniformLocation(shaderProgram, 'uTime'),
      },
    };
    
    // Animation loop
    let startTime = Date.now();
    let animationFrameId: number;
    
    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000; // time in seconds
      
      // Clear the canvas
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // Set up shader program
      gl.useProgram(shaderProgram);
      
      // Set time uniform
      gl.uniform1f(programInfo.uniformLocations.time, currentTime);
      
      // Set up buffer for vertex positions
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        2, // 2 components per vertex
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
      
      // Draw the full-screen quad
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      // Request next frame
      animationFrameId = requestAnimationFrame(render);
    };
    
    // Start the animation
    render();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ opacity: 0.9 }}
    />
  );
};