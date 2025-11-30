const container = document.getElementById("assets-grid");

const assets = Array.from({ length: 10 }).map((_, i) => ({
    name: `3D Asset ${i + 1}`,
    code: `downloads/asset${i + 1}-code.zip`,
    model: `downloads/asset${i + 1}-model.glb`
}));

// Create 10 cards
assets.forEach((asset, index) => {
    const card = document.createElement("div");
    card.className = "asset-card";

    card.innerHTML = `
        <div class="canvas-container" id="canvas-${index}"></div>
        <div class="asset-name">${asset.name}</div>
        <div class="asset-buttons">
            <a href="${asset.code}" download>Download Code</a>
            <a href="${asset.model}" download>Download 3D Model</a>
        </div>
    `;

    container.appendChild(card);

    // ---- 3D Cube Animation ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(260, 200);

    document.getElementById(`canvas-${index}`).appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00aaff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Lights
    const light1 = new THREE.PointLight(0xffffff, 1);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(light2);

    // Animate
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.015;
        cube.rotation.y += 0.015;
        renderer.render(scene, camera);
    }
    animate();
});
