import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as THREE from 'three';
import Typed from 'typed.js';
@Component({
  selector: 'app-three-scene',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './three-scene.component.html',
  styleUrls: ['./three-scene.component.css']
})
export class ThreeSceneComponent implements OnInit {
 @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.initThreeJS();
  }

  private initThreeJS(): void {
    //Creamos la escena
    const scene = new THREE.Scene();
    //FONDO
    scene.background = new THREE.Color(0xffffff); 
    //Crear una camara donde vamos a estar moviendonos para visualizar el contenido
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //Renderiza los objetos en el navegador 
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    //Dimensión
    renderer.setSize(window.innerWidth, window.innerHeight);
    //Apuntamos al div 
    this.canvasContainer.nativeElement.appendChild(renderer.domElement);


    // Crear la geometría con parámetros personalizados
    const radius = 10; // Radio del torus
    const tube = 4; // Radio del tubo
    const radialSegments = 50; // Segmentos radiales
    const tubularSegments = 10; // Segmentos del tubo
    const p = 2; // Número de torsiones alrededor del eje
    const q = 2; 
    //3d
    const geometry = new THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q);
    //aspecto visual de la geometria
    const material = new THREE.MeshBasicMaterial({ color: 0x5AC8C8, wireframe: true});
    //animaciones
    const cube = new THREE.Mesh(geometry, material); 
    //Añadir nuestro diseño a nuestra escena
    scene.add(cube);

    // Generar una textura de patrón para el lateral
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#004a59'; // Color de fondo
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = '#027184'; // Color de las líneas
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(canvas.width, canvas.height);
      context.moveTo(canvas.width, 0);
      context.lineTo(0, canvas.height);
      context.stroke();
    }
     const texture = new THREE.CanvasTexture(canvas);
    
    camera.position.z = 20;

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotar la figura
      cube.rotation.x += 0.001;
      cube.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  }



//Texto animado
   ngAfterViewInit(): void {
    const options = {
      strings: ["Developer and Designer."],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 9000,
      loop: true
    };

    new Typed('#typed', options);
  }
}
