

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed!');

  const mediaQuery = window.matchMedia('(max-width: 768px)');

  //Panzoom container
  if (mediaQuery.matches) {
    const img = document.getElementById('panZoomContent');
    const panzoom = Panzoom(img, {
      // contain: false,
      maxScale: 3,
      minScale: 1,
    })

    // Enable zoom with mouse wheel
    img.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

    // Lock vertical panning
    img.addEventListener('panzoompan', (event) => {
      const pan = panzoom.getPan();
      panzoom.pan(pan.x, 0); // lock Y to 0, allow X to move
    });

    // // Prevent panning beyond the edge
    // const limitPanX = (x) => {
    //   const maxPan = 500;
    //   return Math.max(Math.min(x, maxPan), 0);
    // };

    // img.addEventListener('panzoompan', (event) => {
    //   const pan = panzoom.getPan();
    //   panzoom.pan(limitPanX(pan.x), 0);
    // });
  };

  // Fetch SVG
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
          modal.classList.add('show-modal');
          interactiveContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        });

        closeModal.addEventListener('click', () => {
          modal.classList.remove('show-modal');
        });

        window.addEventListener('click', (event) => {
          if (event.target == modal) {
            modal.classList.remove('show-modal');
          }
        });
      })
    })
    .catch(error => {
      console.error('Error loading SVG:', error);
    });
});