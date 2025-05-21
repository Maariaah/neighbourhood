

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed!');


  const img = document.getElementById('imagesContainer');
  const panzoom = Panzoom(img, {
    maxScale: 2,
    minScale: 1,
    contain: "outside",
  })

  // Enable zoom with mouse wheel
  img.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

  fetch('cover.svg')
    .then(response => response.text())
    .then(svgText => {
      const container = document.getElementById('svgContainer');
      container.innerHTML = svgText;
      const rects = container.querySelectorAll('svg rect');

      rects.forEach((rect, index) => {
        const modal = document.getElementById("myModal");
        const closeModal = document.getElementById("closeModal");
        const modalTitle = document.getElementById("modalTitle");
        const modalDescription = document.getElementById("modalDescription");
        const modalImage = document.getElementById("modalImage");
        const modalLinkManifold = document.getElementById("modalLinkManifold");
        const modalLinkEthscan = document.getElementById("modalLinkEthscan");
        const modalLinkContract = document.getElementById("modalLinkContract");
        const imagePath = `./img/${index + 1}.jpg`;
        const interactiveContainer = document.getElementById("interactiveContainer");
        rect.addEventListener('mouseenter', () => {
          rect.style.stroke = 'red';
          rect.style.strokeWidth = '10px';
          rect.style.cursor = 'hand';
        });

        rect.addEventListener('mouseleave', () => {
          rect.style.stroke = 'none';
        });

        rect.addEventListener('click', () => {
          rect.style.stroke = 'red';
          rect.style.strokeWidth = '10px';
          rect.style.cursor = 'pointer';
          modalDescription.textContent = descriptions[index] || "No description available.";
          modalTitle.textContent = titles[index] ? `Scene ${index + 1}` + ": " + titles[index] : "No title available.";
          modalImage.src = imagePath;
          modalImage.loading = "lazy";
          modalImage.onerror = () => {
            modalImage.src = "./img/placeholder.jpg";
          };
          modalLinkManifold.href = linksManifold[index] || "#";
          modalLinkEthscan.href = linksEtherscan[index] || "#";
          modalLinkContract.href = linksContract || "#";
          modal.style.display = "block";
          interactiveContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        });

        closeModal.addEventListener('click', () => {
          modal.style.display = "none";
        });

        window.addEventListener('click', (event) => {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        });
      })
    })
    .catch(error => {
      console.error('Error loading SVG:', error);
    });
});