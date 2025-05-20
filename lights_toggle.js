document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed!');

  fetch('/cover.svg')
    .then(response => response.text())
    .then(svgText => {
      const container = document.getElementById('svgContainer');
      container.innerHTML = svgText;

      const rects = container.querySelectorAll('svg rect');
      let totalRects = rects.length;

      // Function to get random indices
      function getRandomIndices(numRects) {
        const indices = [];
        while (indices.length < numRects) {
          const randIndex = Math.floor(Math.random() * totalRects);
          if (!indices.includes(randIndex)) {
            indices.push(randIndex);
          }
        }
        return indices;
      }

      // Function to change color of a set of rectangles one by one
      function changeColorOfRectangles(indices) {
        let currentIndex = 0;
        const orderOfChanges = [];  // To store the order in which we change color

        function colorNext() {
          if (currentIndex < indices.length) {
            const rectIndex = indices[currentIndex];
            rects[rectIndex].setAttribute('fill', 'white');
            orderOfChanges.push(rectIndex); // Record the order of changes

            // Revert color after 5 seconds
            setTimeout(() => {
              rects[rectIndex].setAttribute('fill', 'black');
              currentIndex++;
              colorNext(); // Continue with the next rectangle
            }, 8000); // 5000 ms = 5 seconds
          } else {
            // After changing all rectangles, revert in the same order after a pause
            setTimeout(() => revertColorsInOrder(orderOfChanges), 2000); // Pause before reverting
          }
        }

        colorNext(); // Start the process
      }

      // Function to revert the colors back in the same order
      function revertColorsInOrder(orderOfChanges) {
        let currentIndex = 0;

        function revertNext() {
          if (currentIndex < orderOfChanges.length) {
            const rectIndex = orderOfChanges[currentIndex];
            rects[rectIndex].setAttribute('fill', 'black');
            currentIndex++;
            revertNext(); // Continue with the next rectangle
          }
        }

        revertNext(); // Start the reversion
      }

      // Function to control the timing between sets
      function startChangingColors() {
        // Get a random set of rectangles (e.g., change 3 rectangles at once)
        const randomIndices = getRandomIndices(3);  // You can change '3' to any number you like
        console.log('Changing colors for rectangles:', randomIndices);

        changeColorOfRectangles(randomIndices); // Start the color changes for this set

        // Pause for 7 seconds before selecting another random set
        setTimeout(startChangingColors, 10000); // 7000 ms = 7 seconds
      }

      // Start the color changing sequence
      // startChangingColors();

    })
    .catch(error => {
      console.error('Error loading SVG:', error);
    });
});
