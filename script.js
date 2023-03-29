// Load font
let font;
let loader = new THREE.FontLoader();
loader.load('https://cdn.jsdelivr.net/npm/three@0.117.0/examples/fonts/helvetiker_regular.typeface.json', function(response) {
  font = response;
  createAsciiArt();
});

// Get input and button elements
const input = document.getElementById('input');
const button = document.getElementById('button');

// Create ASCII art when button is clicked
button.addEventListener('click', function() {
  createAsciiArt(input.value);
});

// Create ASCII art
function createAsciiArt(text) {
  // Set up scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setSize(500, 500);

  // Create group for ASCII characters
  let group = new THREE.Group();

  // Create ASCII characters and add to group
  for (let i = 0; i < 100; i++) {
    let material = new THREE.MeshBasicMaterial({ color: Math.random() < 0.5 ? 0xff0000 : 0x00ff00 });
    let geometry = new THREE.TextGeometry(text, {
      font: font,
      size: Math.floor(Math.random() * 50),
      height: Math.floor(Math.random() * 10)
    });
    let mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = (Math.random() - 0.5) * 500;
    mesh.position.y = (Math.random() - 0.5) * 500;
    mesh.position.z = (Math.random() - 0.5) * 500;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    group.add(mesh);
  }

  // Add group to scene
  scene.add(group);

  // Position camera
  camera.position.z = 500;

  // Animate ASCII art
  function animate() {
    requestAnimationFrame(animate);
    group.rotation.x += 0.01;
    group.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
}